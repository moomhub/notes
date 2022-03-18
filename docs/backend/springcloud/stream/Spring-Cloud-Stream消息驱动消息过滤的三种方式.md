# Spring Cloud Stream实现消息过滤的三种主要方式


消息过滤是指消费者不希望消费topic里的所有消息，而是只消费部分特定的消息。从topic中挑选出这些特定的消息，就是所谓的消息过滤。通过消息过滤可以实现消息的分流处理，例如生产者生产的消息，header可能都是不尽相同的，这样我们就可以编写两个或多个消费者，对不同header的消息进行针对性的处理。

Spring Cloud Stream实现消息过滤的方式主要有三种。

1. 使用@StreamListener注解的condition属性指定条件表达式，

2. 在消息的header中设置TAGS

3. 使用SQL92语法进行过滤。

## 1、condition（通用所有的MQ）

这种方式适用于所有的MQ，也是最简单易用的方式。首先我们为生产者的消息设置一个header，具体的header名称和值可根据实际业务需求进行设置。这里仅作为示例，具体代码如下：

```java
package com.zj.node.contentcenter.controller.content;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 生产者
 *
 * @author 01
 * @date 2019-08-03
 **/
@RestController
@RequiredArgsConstructor
public class TestProducerController {

    private final Source source;

    @GetMapping("/stream-send-msg")
    public String streamSendMsg(String flagHeader) {
        source.output().send(
                MessageBuilder.withPayload("消息体")
                        // 设置用于过滤消息的header
                        .setHeader("flag-header", flagHeader)
                        .build()
        );

        return "send message success!";
    }
}
```


然后在消费者的@StreamListener注解中指定condition属性，根据具体设置的header编写条件表达式。如下示例：

```java
package com.zj.node.usercenter.rocketmq;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.cloud.stream.messaging.Sink;
import org.springframework.stereotype.Service;

/**
 * 消费者
 *
 * @author 01
 * @date 2019-08-10
 **/
@Slf4j
@Service
public class TestStreamConsumer {

    @StreamListener(
            value = Sink.INPUT,
            // 消息过滤的条件表达式，只有满足该表达式才会进行执行该方法
            condition = "headers['flag-header']=='UP'"
    )
    public void receive(String messageBody) {
        log.info("通过stream收到了消息，messageBody = {}", messageBody);
    }
}
```


现在我们来做个简单的测试，通过生产者投递两个消息，一个消息的flagHeader=UP，另一个消息的flagHeader=DOWN。消费者输出的日志信息如下：

## 2、TAGS

这种方式仅RocketMQ支持，Kafka、RabbitMQ不支持。该方式也需要为生产者生产的消息设置header，只不过这个header稍微有些特殊而已。我们基于上一小节的代码进行修改，修改后的代码如下：

```java
package com.zj.node.contentcenter.controller.content;

import lombok.RequiredArgsConstructor;
import org.apache.rocketmq.spring.support.RocketMQHeaders;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 生产者
 *
 * @author 01
 * @date 2019-08-03
 **/
@RestController
@RequiredArgsConstructor
public class TestProducerController {

    private final Source source;

    @GetMapping("/stream-send-msg")
    public String streamSendMsg() {
        source.output().send(
                MessageBuilder.withPayload("消息体")
                        // tag只能设置一个，不能设置多个
                        .setHeader(RocketMQHeaders.TAGS, "tag-1")
                        .build()
        );

        return "send message success!";
    }
}
```


改造消费者

由于stream默认在Sink接口里只提供了一个input channel，为了更直观地看到不同tag的消息进入不同的channel，所以我们需要使用自定义接口，定义多个”input“，代码如下：<br />public interface MySink {

```java
public interface MySink {

    String T1_INPUT = "t1-input";
    String T2_INPUT = "t2-input";

    @Input(T1_INPUT)
    SubscribableChannel input1();

    @Input(T2_INPUT)
    SubscribableChannel input2();
}
```


}

修改配置文件如下：

```yaml
spring:
  cloud:
    stream:
      rocketmq:
        binder:
          name-server: 192.168.190.129:9876
        bindings:
          t1-input:
            consumer:
              # 表示t1-input仅消费带有tag-1的消息
              tags: tag-1
          t2-input:
            consumer:
              # 表示t2-input可以消费带有tag-2或tag-3的消息（||用于分隔不同的tag）
              tags: tag-2||tag-3
      bindings:
        t1-input:
          destination: stream-test-topic
          group: binder-group1
        t2-input:
          destination: stream-test-topic
          group: binder-group2
```


## 3、SQL92

这种方式仅RocketMQ支持，Kafka、RabbitMQ不支持，若使用该方式，则不要使用TAGS。该方式是使用SQL语法过滤消息，具体可参考官方文档：

```yaml
http://rocketmq.apache.org/rocketmq/filter-messages-by-sql92-in-rocketmq/
```


默认情况下，RocketMQ的SQL过滤支持是关闭的，所以我们需要通过添加一些配置项进行开启。首先进入RocketMQ的安装目录，然后编辑conf/broker.conf文件：

```PowerShell
[root@study-01 ~]# cd /usr/local/rocketmq-4.5.1/
[root@study-01 /usr/local/rocketmq-4.5.1]# vim conf/broker.conf

# 在文件末尾添加如下配置项：
enablePropertyFilter = true

# 注：添加配置后需要重启RocketMQ的Broker才会生效，命令参考：
nohup sh $ROCKETMQ_HOME/bin/mqbroker -n localhost:9876 -c $ROCKETMQ_HOME/conf/broker.conf &

```


改造生产者

同样基于上一小节的代码进行修改，生产者的代码如下：

```java
package com.zj.node.contentcenter.controller.content;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.stream.messaging.Source;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 生产者
 *
 * @author 01
 * @date 2019-08-03
 **/
@RestController
@RequiredArgsConstructor
public class TestProducerController {

    private final Source source;

    @GetMapping("/stream-send-msg")
    public String streamSendMsg() {
        source.output().send(
                MessageBuilder.withPayload("消息体")
                        .setHeader("amount", "100")
                        .build()
        );

        return "send message success!";
    }
}
```


改造消费者

由于有上一小节的铺垫，这里需要改动的就不大了，西安修改消费者的配置文件，如下：

```yaml
spring:
  cloud:
    stream:
      rocketmq:
        binder:
          name-server: 192.168.190.129:9876
        bindings:
          t1-input:
            consumer:
              # 表示t1-input仅消费amount小于等于100的消息
              sql: 'amount <= 100'
          t2-input:
            consumer:
              # 表示t2-input仅消费amount大于100的消息
              sql: 'amount > 100'
      bindings:
        t1-input:
          destination: stream-test-topic
          group: binder-group1
        t2-input:
          destination: stream-test-topic
          group: binder-group2
```


com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQConsumerProperties

