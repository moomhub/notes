# Stream 整合 Rocketmq 实现延时消息（二）

RocketMQ 暂时不支持任意的时间精度的延迟，而是固化了 18 个延迟级别。

> s：秒、m：分钟、h：小时、d：天


## RocketMQ内置的延时等级

内置的broker 18个等级

|延迟级别|时间|延迟级别|时间|延迟级别|时间|
|---|---|---|---|---|---|
|1|1s|7m|3|13|9m|
|2|5s|8m|4|14|10m|
|3|10s|9m|5|15|20m|
|4|30s|10m|6|16|30m|
|5|1m|11m|7|17|1h|
|6|2m|12m|8|18|2h|



如果想修改相关的等级对应，可以修改 **bronk.conf**   内 messageDelayLevel 的内容。

```PowerShell
#...
messageDelayLevel=1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
#...
```


## Demo

通过添加头MessageConst.PROPERTY_DELAY_TIME_LEVEL，设置消息的延迟级别，从而发送定时消息。

```java
  HashMap<String, Object> headers = new HashMap<String,Object>();
  Object message = new Object;
  MessageBuilder<Object> builder = MessageBuilder.withPayload(message);
  headers.put(MessageConst.PROPERTY_DELAY_TIME_LEVEL,"3");
  builder.copyHeaders(headers);
```


> 请注意添加消息头按正常异步模式发送消息，是不会正常发送延迟消息的<br />一定要设置 sync： true 开启同步发送消息才能实现延时消息


消息生产者请在配置文件添加异步模式

```yaml
spring:
  cloud:
    stream:
      rocketmq:
        binder:
          name-server: 127.0.0.1:9876 #绑定namesever 地址，可以多个
          enable-msg-trace: true
        bindings:
          delay_message_output:
            producer:
              sync: true # 是否同步发送消息，默认为 false 异步。     
      bindings:
        delay_message_output:
          destination: message-stream-topic3 # 相当于 rocketmq 的 topic
          content-type: application/json # 设置消息类型，本次为对象json，如果是文本则设置“text/plain”
```

