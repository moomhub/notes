# Spring Cloud Stream 配置说明


## 通用属性

以下绑定属性仅可用于Stream 通用的属性

```yaml
spring.cloud.stream

#或者。。

spring:
  cloud:
    stream:
```


### instance-count

应用程序已部署实例的数量。必须为生产者端的分区设置。如果 autoRebalanceEnabled=false，则在使用 RabbitMQ 和 Kafka 时必须在消费者端设置。 默认值：1。

### instance-index

应用程序的实例索引：从 0 到 instanceCount - 1 的数字。如果 autoRebalanceEnabled=false，则用于与 RabbitMQ 和 Kafka 进行分区。在 Cloud Foundry 中自动设置以匹配应用程序的实例索引。

### dynamic-destinations

可以动态绑定的目的地列表（例如，在动态路由方案中）。如果设置，则只能绑定列出的目的地。 默认值：空（允许绑定任何目的地）。

### default-binder

如果配置了多个绑定中间件，则使用默认绑定器。请参阅类路径上的多个绑定器。 默认值：空。

### override-cloud-connectors

此属性仅在云配置文件处于活动状态且 Spring Cloud 连接器随应用程序一起提供时适用。如果该属性为 false（默认值），则绑定器会检测到合适的绑定服务（例如，在 Cloud Foundry 中为 RabbitMQ 绑定器绑定的 RabbitMQ 服务）并使用它来创建连接（通常通过 Spring Cloud 连接器）。当设置为 true 时，该属性指示绑定器完全忽略绑定服务并依赖 Spring Boot 属性（例如，依赖环境中为 RabbitMQ 绑定器提供的 spring.rabbitmq.* 属性）。此属性的典型用法是在连接到多个系统时嵌套在自定义环境中。 默认值：假。

### binding-retry-interval

例如，当绑定中间件不支持后期绑定并且代理（例如，Apache Kafka）关闭时，重试绑定创建之间的间隔（以秒为单位）。将其设置为零以将此类情况视为致命情况，从而阻止应用程序启动。 默认值：30

## 绑定通道通用属性

binding 通用属性

```yaml
spring.cloud.stream.bindings.<bindingName>

spring:
  cloud:
    stream:
      bindings:
        <bindingName>
```


### destination

绑定中间件上绑定的目标目的地（例如，RabbitMQ 交换或 Kafka 主题）。 如果绑定表示消费者绑定（输入），则它可以绑定到多个目的地，并且可以将目的地名称指定为逗号分隔的字符串值。 如果不是，则使用实际的绑定名称。 此属性的默认值不能被覆盖。

### group

绑定的消费者组。 仅适用于入站绑定。 请参阅消费者组。 默认值：null（表示匿名消费者）。

### content-type

此绑定的内容类型。 请参阅内容类型协商。 默认值：application/json。或者text/plain

### binder

此绑定使用的绑定器。 有关详细信息，请参阅类路径上的多个绑定器。 默认值：null（使用默认绑定器，如果存在的话）。

**binders** 

## 消费者属性通用属性

[Consumer Properties](https://docs.spring.io/spring-cloud-stream/docs/3.1.3/reference/html/spring-cloud-stream.html#_consumer_properties)

这些属性通过 org.springframework.cloud.stream.binder.ConsumerProperties 公开 以下绑定属性仅可用于输入绑定，并且必须以 spring.cloud.stream.bindings..consumer 为前缀。 （例如，spring.cloud.stream.bindings.input.consumer.concurrency=3）。 可以使用 spring.cloud.stream.default.consumer 前缀（例如 spring.cloud.stream.default.consumer.headerMode=none）设置默认值。

```yaml
spring.cloud.stream.bindings.<bindingName>

spring:
  cloud:
    stream:
      bindings:
        <bindingName>:
          consumer:
```


### auto-startup

如果此消费者需要自动启动，则发出信号 默认值：true。

### concurrency

入站消费者的并发性。 默认值：1。

### partitioned

消费者是否从分区的生产者接收数据。 默认值：false。

### header-mode

设置为 none 时，禁用输入的标头解析。仅对本机不支持消息头并需要头嵌入的消息传递中间件有效。在不支持本机标头时从非 Spring Cloud Stream 应用程序使用数据时，此选项很有用。当设置为 headers 时，它使用中间件的本地 header 机制。当设置为embeddedHeaders 时，它将标头嵌入到消息有效负载中。默认值：取决于绑定器实现。

### max-attempts

如果处理失败，则尝试处理消息的次数（包括第一次）。设置为 1 以禁用重试。默认值：3。

### back-off-initialInterval

重试时的退避初始间隔。 默认值：1000。

### back-off-max-interval

最大退避间隔。 默认值：10000。

### back-off-multiplier

退避乘数。 默认值：2.0。

### default-retryable

未在 retryableExceptions 中列出的侦听器抛出的异常是否可重试。 默认值：true。

### instance-count

当设置为大于等于零的值时，它允许自定义此使用者的实例计数（如果与 spring.cloud.stream.instanceCount 不同）。当设置为负值时，它默认为 spring.cloud.stream.instanceCount。有关更多信息，请参阅实例索引和实例计数。 默认值：-1。

### instance-index

当设置为大于等于零的值时，它允许自定义此使用者的实例索引（如果与 spring.cloud.stream.instanceIndex 不同）。当设置为负值时，它默认为 spring.cloud.stream.instanceIndex。如果提供了 instanceIndexList，则忽略。有关更多信息，请参阅实例索引和实例计数。默认值：-1。

### instance-index-list

与不支持本机分区的绑定器（如RabbitMQ）一起使用；允许一个应用程序实例从多个分区消费。 默认值：空。

### retryable-exceptions

键中的 Throwable 类名称和值中的布尔值的映射。指定将或不会重试的那些异常（和子类）。另请参阅 defaultRetriable。示例：spring.cloud.stream.bindings.input.consumer.retryable-exceptions.java.lang.IllegalStateException=false。 默认值：空

### useNative-decoding

设置为true时，入站消息直接由客户端库反序列化，必须进行相应配置（例如，设置合适的Kafka生产者值反序列化器）。使用此配置时，入站消息解组不基于绑定的 contentType。使用本机解码时，生产者有责任使用适当的编码器（例如，Kafka 生产者值序列化器）来序列化出站消息。此外，当使用本机编码和解码时，headerMode=embeddedHeaders 属性将被忽略，并且消息头不会嵌入到消息中。请参阅生产者属性 useNativeEncoding。 默认值：假。

### multiplex

当设置为 true 时，底层绑定器将在同一输入绑定上本地复用目标。 默认值：false。

## 生产者

producer 生产者配置

[Producer Properties](https://docs.spring.io/spring-cloud-stream/docs/3.1.3/reference/html/spring-cloud-stream.html#_producer_properties)

These properties are exposed via `org.springframework.cloud.stream.binder.ProducerProperties`

以下绑定属性仅可用于输出绑定，并且必须以 spring.cloud.stream.bindings..producer 为前缀。 （例如，spring.cloud.stream.bindings.func-out-0.producer.partitionKeyExpression=payload.id）。

可以使用前缀 spring.cloud.stream.default.producer 设置默认值（例如，spring.cloud.stream.default.producer.partitionKeyExpression=payload.id）。

### auto-startup

如果此消费者需要自动启动，则发出信号 默认值：真。

### partition-key-expression

确定如何对出站数据进行分区的 Spring EL 表达式。如果设置，此绑定上的出站数据将被分区。 partitionCount 必须设置为大于 1 的值才能生效。请参阅分区支持。 默认值：空。

### partitionKeyExtractorName

实现 PartitionKeyExtractorStrategy 的 bean 的名称。用于提取用于计算分区 ID 的键（请参阅“partitionSelector*”）。与'partitionKeyExpression' 互斥。 默认值：空。

### partitionSelectorName

实现 PartitionSelectorStrategy 的 bean 的名称。用于根据分区键确定分区 ID（请参阅“partitionKeyExtractor*”）。与'partitionSelectorExpression' 互斥。 默认值：空。

### partitionSelectorExpression

用于自定义分区选择的 SpEL 表达式。如果两者都没有设置，则分区被选为 hashCode(key) % partitionCount，其中键是通过任一 partitionKeyExpression 计算的。 默认值：空。

### partitionCount

如果启用了分区，则数据的目标分区数。如果生产者已分区，则必须设置为大于 1 的值。在 Kafka 上，它被解释为一个提示。取而代之的是使用此值和目标主题的分区计数中的较大者。 默认值：1。

### requiredGroups

以逗号分隔的组列表，即使它们在创建后开始（例如，通过在 RabbitMQ 中预先创建持久队列），生产者也必须确保消息传递到这些组。 标题模式 设置为 none 时，它会禁用输出中的标头嵌入。它仅对本地不支持消息头且需要头嵌入的消息中间件有效。在不支持本机标头时为非 Spring Cloud Stream 应用程序生成数据时，此选项很有用。当设置为 headers 时，它使用中间件的本地 header 机制。当设置为embeddedHeaders 时，它将标头嵌入到消息有效负载中。 默认值：取决于绑定器实现。

### headerMode

设置为 none 时，它会禁用输出中的标头嵌入。它仅对本地不支持消息头且需要头嵌入的消息中间件有效。在不支持本机标头时为非 Spring Cloud Stream 应用程序生成数据时，此选项很有用。当设置为 headers 时，它使用中间件的本地 header 机制。当设置为embeddedHeaders 时，它将标头嵌入到消息有效负载中。 默认值：取决于绑定器实现。

### useNativeEncoding

当设置为 true 时，出站消息由客户端库直接序列化，必须进行相应配置（例如，设置适当的 Kafka 生产者值序列化器）。使用此配置时，出站消息编组不基于绑定的 contentType。使用本机编码时，消费者有责任使用适当的解码器（例如，Kafka 消费者值反序列化器）对入站消息进行反序列化。此外，当使用本机编码和解码时，headerMode=embeddedHeaders 属性将被忽略，并且消息头不会嵌入到消息中。请参阅消费者属性 useNativeDecoding。

### errorChannelEnabled

设置为 true 时，如果绑定器支持异步发送结果，则发送失败将发送到目标的错误通道。有关更多信息，请参阅错误处理。 默认值：假。

