# Stream 整合 Rocketmq 实现事务消息（三）


## 什么是事务性消息

通过场景来看：

生成订单记录 -> MQ -> 增加积分,我们需要保证消息的发送与订单数据的插入要么都成功，要么都失败。

在这里插入图片描述

我们是应该先创建订单，还是先发送MQ消息？

1、先发送MQ消息：如果消息发送成功，而订单创建失败，没办法把消息收回来。

2、先创建订单：如果订单创建成功后MQ消息发送失败，抛出异常，因为两个操作在一个事务代码块中，所以订单数据会回滚。

但是网络是不稳定的，如果MQ端确实收到了这条消息，只是返回给客户端的响应丢失了，就出现跟1一样的问题。

## 配置文件

```yaml
spring:
  cloud:
    stream:
      rocketmq:
        binder:
          name-server: 127.0.0.1:9876
          enable-msg-trace: true
        bindings:
          transactional_message_output:
            producer:
              # 同步发送消息
              sync: true
              group: transactional_stream_group
              # 开启事务支持
              transactional: true
      bindings:
        transactional_message_output:
          destination: message-stream-topic4 # 相当于 rocketmq 的 topic
          content-type: application/json # 设置消息类型，本次为对象json，如果是文本则设置“text/plain”
```


## 事务消息生产者

```纯文本
  @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean sendTransactionalMessage(HashMap<String, Object> headers, Object object) {
    //      。。。数据库事务   保存或添加
        log.info("保存数据到本地完成，开始发送事务消息！");
        String transaction_id = UUID.randomUUID().toString().replaceAll("-", "");
        MessageBuilder<Object> builder = MessageBuilder.withPayload(object);
        headers.put(RocketMQHeaders.TRANSACTION_ID, transaction_id);
        builder.copyHeaders(headers);
        Message<Object> transactionMessage = builder.build();
        MessageChannel delayMessageChannel = this.messageSendChannel.transactional_output();
        boolean delay_ok = delayMessageChannel.send(transactionMessage);
        log.info("事务消息发送发送状态： [{}]", delay_ok);
        return delay_ok;
    }
```


## RocketMQ事务监听

```java
@RocketMQTransactionListener(txProducerGroup = "transactional_stream_group")
public class RocketMQMessageTransactionListener implements RocketMQLocalTransactionListener {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    /**
     * 执行本地事务
     * ①事务执行成功，commit
     * ②事务执行失败，rollback
     * ③回查发送消息，unknown
     *
     * @param message
     * @param o
     * @return
     */
    @Override
    public RocketMQLocalTransactionState executeLocalTransaction(Message message, Object o) {
        /**
         * 查询之前的消息是否已经添加数据数据库
         * */
        return RocketMQLocalTransactionState.ROLLBACK;
//        try {
//            // 获取前面生成的事务ID
//            String transactionId = (String) message.getHeaders().get(RocketMQHeaders.TRANSACTION_ID);
//            // 以事务ID为主键，执行本地事务
////            Order order = (Order) message.getPayload();
//            boolean result = this.saveOrder(new Stream(), transactionId);
//            return result ? RocketMQLocalTransactionState.COMMIT : RocketMQLocalTransactionState.ROLLBACK;
//        } catch (Exception e) {
//            return RocketMQLocalTransactionState.ROLLBACK;
//        }
    }

//    private boolean saveOrder(Stream order, String transactionId) {
//        // 将事务ID设置为唯一键
//        // 调用数据库Insert into 订单表
//        return true;
//    }


    /**
     * 执行本地事务回查，当状态为 UNKNOW 会执行这个方法，回查间隔时间差不多一分钟。
     * <p>
     * 业务代码用来检查事务当前状态，是否执行完成，如果完成就执行 COMMIT
     *
     * @param message
     * @return
     */
    @Override
    public RocketMQLocalTransactionState checkLocalTransaction(Message message) {
        log.info("判断远程消息是否完成、完成就提交");
        String transactionId = (String) message.getHeaders().get(RocketMQHeaders.TRANSACTION_ID);
        // 以事务ID为主键，查询本地事务执行情况
        if (isSuccess(transactionId)) {
            return RocketMQLocalTransactionState.COMMIT;
        }
        return RocketMQLocalTransactionState.ROLLBACK;

    }

    private boolean isSuccess(String transactionId) {
        // 查询数据库 select from 订单表
        return true;
    }
}
```


@RocketMQTransactionListener 注解，声明监听器的是生产者分组是 "transactional_stream_group" 的 Producer 发送的事务消息。因为 RocketMQ 是回查（请求）指定指定生产分组下的 Producer，从而获得事务消息的状态，所以一定要正确设置。

注意，这是一个模板方法。在调用这个方法之前，Spring Cloud Alibaba Stream RocketMQ 已经使用 Producer 发送了一条事务消息，本方法里面我们使用消息内容进行本地数据库事务操作。然后根据该方法执行的返回的 RocketMQLocalTransactionState 结果，提交还是回滚该事务消息。

实现 #executeLocalTransaction(...) 方法，检查本地事务(或者在此提交相关的事务)，通过相关结果的判断是提交还是回滚事务消息。

一般来说，有两种方式实现本地事务回查时，返回事务消息的状态。

第一种，通过 msg 消息，获得某个业务上的标识或者编号，然后去数据库中查询业务记录，从而判断该事务消息的状态是提交还是回滚。

第二种，记录 msg 的事务编号，与事务状态到数据库中。

第一步，在 #executeLocalTransaction(...) 方法中，先存储一条 id 为 msg 的事务编号，状态为 RocketMQLocalTransactionState.UNKNOWN 的记录。

第二步，调用带有事务的业务 Service 的方法。在该 Service 方法中，在逻辑都执行成功的情况下，更新 id 为 msg 的事务编号，状态变更为 RocketMQLocalTransactionState.COMMIT 。这样，我们就可以伴随这个事务的提交，更新 id 为 msg 的事务编号的记录的状为 RocketMQLocalTransactionState.COMMIT ，美滋滋。。

第三步，要以 try-catch 的方式，调用业务 Service 的方法。如此，如果发生异常，回滚事务的时候，可以在 catch 中，更新 id 为 msg 的事务编号的记录的状态为 RocketMQLocalTransactionState.ROLLBACK 。😭 极端情况下，可能更新失败，则打印 error 日志，告警知道，人工介入。

如此三步之后，我们在 #executeLocalTransaction(...) 方法中，就可以通过查找数据库，id 为 msg 的事务编号的记录的状态，然后返回。

相比来说，倾向第一种，实现更加简单通用，对于业务开发者，更加友好。和有几个朋友沟通了下，但他们是采用第二种。

