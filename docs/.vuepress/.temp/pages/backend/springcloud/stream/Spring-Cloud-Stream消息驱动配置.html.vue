<template><h1 id="spring-cloud-stream-配置说明" tabindex="-1"><a class="header-anchor" href="#spring-cloud-stream-配置说明" aria-hidden="true">#</a> Spring Cloud Stream 配置说明</h1>
<h2 id="通用属性" tabindex="-1"><a class="header-anchor" href="#通用属性" aria-hidden="true">#</a> 通用属性</h2>
<p>以下绑定属性仅可用于Stream 通用的属性</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>spring.cloud.stream

<span class="token comment">#或者。。</span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="instance-count" tabindex="-1"><a class="header-anchor" href="#instance-count" aria-hidden="true">#</a> instance-count</h3>
<p>应用程序已部署实例的数量。必须为生产者端的分区设置。如果 autoRebalanceEnabled=false，则在使用 RabbitMQ 和 Kafka 时必须在消费者端设置。 默认值：1。</p>
<h3 id="instance-index" tabindex="-1"><a class="header-anchor" href="#instance-index" aria-hidden="true">#</a> instance-index</h3>
<p>应用程序的实例索引：从 0 到 instanceCount - 1 的数字。如果 autoRebalanceEnabled=false，则用于与 RabbitMQ 和 Kafka 进行分区。在 Cloud Foundry 中自动设置以匹配应用程序的实例索引。</p>
<h3 id="dynamic-destinations" tabindex="-1"><a class="header-anchor" href="#dynamic-destinations" aria-hidden="true">#</a> dynamic-destinations</h3>
<p>可以动态绑定的目的地列表（例如，在动态路由方案中）。如果设置，则只能绑定列出的目的地。 默认值：空（允许绑定任何目的地）。</p>
<h3 id="default-binder" tabindex="-1"><a class="header-anchor" href="#default-binder" aria-hidden="true">#</a> default-binder</h3>
<p>如果配置了多个绑定中间件，则使用默认绑定器。请参阅类路径上的多个绑定器。 默认值：空。</p>
<h3 id="override-cloud-connectors" tabindex="-1"><a class="header-anchor" href="#override-cloud-connectors" aria-hidden="true">#</a> override-cloud-connectors</h3>
<p>此属性仅在云配置文件处于活动状态且 Spring Cloud 连接器随应用程序一起提供时适用。如果该属性为 false（默认值），则绑定器会检测到合适的绑定服务（例如，在 Cloud Foundry 中为 RabbitMQ 绑定器绑定的 RabbitMQ 服务）并使用它来创建连接（通常通过 Spring Cloud 连接器）。当设置为 true 时，该属性指示绑定器完全忽略绑定服务并依赖 Spring Boot 属性（例如，依赖环境中为 RabbitMQ 绑定器提供的 spring.rabbitmq.* 属性）。此属性的典型用法是在连接到多个系统时嵌套在自定义环境中。 默认值：假。</p>
<h3 id="binding-retry-interval" tabindex="-1"><a class="header-anchor" href="#binding-retry-interval" aria-hidden="true">#</a> binding-retry-interval</h3>
<p>例如，当绑定中间件不支持后期绑定并且代理（例如，Apache Kafka）关闭时，重试绑定创建之间的间隔（以秒为单位）。将其设置为零以将此类情况视为致命情况，从而阻止应用程序启动。 默认值：30</p>
<h2 id="绑定通道通用属性" tabindex="-1"><a class="header-anchor" href="#绑定通道通用属性" aria-hidden="true">#</a> 绑定通道通用属性</h2>
<p>binding 通用属性</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>spring.cloud.stream.bindings.&lt;bindingName<span class="token punctuation">></span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        &lt;bindingName<span class="token punctuation">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="destination" tabindex="-1"><a class="header-anchor" href="#destination" aria-hidden="true">#</a> destination</h3>
<p>绑定中间件上绑定的目标目的地（例如，RabbitMQ 交换或 Kafka 主题）。 如果绑定表示消费者绑定（输入），则它可以绑定到多个目的地，并且可以将目的地名称指定为逗号分隔的字符串值。 如果不是，则使用实际的绑定名称。 此属性的默认值不能被覆盖。</p>
<h3 id="group" tabindex="-1"><a class="header-anchor" href="#group" aria-hidden="true">#</a> group</h3>
<p>绑定的消费者组。 仅适用于入站绑定。 请参阅消费者组。 默认值：null（表示匿名消费者）。</p>
<h3 id="content-type" tabindex="-1"><a class="header-anchor" href="#content-type" aria-hidden="true">#</a> content-type</h3>
<p>此绑定的内容类型。 请参阅内容类型协商。 默认值：application/json。或者text/plain</p>
<h3 id="binder" tabindex="-1"><a class="header-anchor" href="#binder" aria-hidden="true">#</a> binder</h3>
<p>此绑定使用的绑定器。 有关详细信息，请参阅类路径上的多个绑定器。 默认值：null（使用默认绑定器，如果存在的话）。</p>
<p><strong>binders</strong></p>
<h2 id="消费者属性通用属性" tabindex="-1"><a class="header-anchor" href="#消费者属性通用属性" aria-hidden="true">#</a> 消费者属性通用属性</h2>
<h4 id="consumer-properties" tabindex="-1"><a class="header-anchor" href="#consumer-properties" aria-hidden="true">#</a> <a href="https://docs.spring.io/spring-cloud-stream/docs/3.1.3/reference/html/spring-cloud-stream.html#_consumer_properties" target="_blank" rel="noopener noreferrer">Consumer Properties<ExternalLinkIcon/></a></h4>
<p>这些属性通过 org.springframework.cloud.stream.binder.ConsumerProperties 公开 以下绑定属性仅可用于输入绑定，并且必须以 spring.cloud.stream.bindings..consumer 为前缀。 （例如，spring.cloud.stream.bindings.input.consumer.concurrency=3）。 可以使用 spring.cloud.stream.default.consumer 前缀（例如 spring.cloud.stream.default.consumer.headerMode=none）设置默认值。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>spring.cloud.stream.bindings.&lt;bindingName<span class="token punctuation">></span>

<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">&lt;bindingName></span><span class="token punctuation">:</span>
          <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="auto-startup" tabindex="-1"><a class="header-anchor" href="#auto-startup" aria-hidden="true">#</a> auto-startup</h3>
<p>如果此消费者需要自动启动，则发出信号 默认值：true。</p>
<h3 id="concurrency" tabindex="-1"><a class="header-anchor" href="#concurrency" aria-hidden="true">#</a> concurrency</h3>
<p>入站消费者的并发性。 默认值：1。</p>
<h3 id="partitioned" tabindex="-1"><a class="header-anchor" href="#partitioned" aria-hidden="true">#</a> partitioned</h3>
<p>消费者是否从分区的生产者接收数据。 默认值：false。</p>
<h3 id="header-mode" tabindex="-1"><a class="header-anchor" href="#header-mode" aria-hidden="true">#</a> header-mode</h3>
<p>设置为 none 时，禁用输入的标头解析。仅对本机不支持消息头并需要头嵌入的消息传递中间件有效。在不支持本机标头时从非 Spring Cloud Stream 应用程序使用数据时，此选项很有用。当设置为 headers 时，它使用中间件的本地 header 机制。当设置为embeddedHeaders 时，它将标头嵌入到消息有效负载中。默认值：取决于绑定器实现。</p>
<h3 id="max-attempts" tabindex="-1"><a class="header-anchor" href="#max-attempts" aria-hidden="true">#</a> max-attempts</h3>
<p>如果处理失败，则尝试处理消息的次数（包括第一次）。设置为 1 以禁用重试。默认值：3。</p>
<h3 id="back-off-initialinterval" tabindex="-1"><a class="header-anchor" href="#back-off-initialinterval" aria-hidden="true">#</a> back-off-initialInterval</h3>
<p>重试时的退避初始间隔。 默认值：1000。</p>
<h3 id="back-off-max-interval" tabindex="-1"><a class="header-anchor" href="#back-off-max-interval" aria-hidden="true">#</a> back-off-max-interval</h3>
<p>最大退避间隔。 默认值：10000。</p>
<h3 id="back-off-multiplier" tabindex="-1"><a class="header-anchor" href="#back-off-multiplier" aria-hidden="true">#</a> back-off-multiplier</h3>
<p>退避乘数。 默认值：2.0。</p>
<h3 id="default-retryable" tabindex="-1"><a class="header-anchor" href="#default-retryable" aria-hidden="true">#</a> default-retryable</h3>
<p>未在 retryableExceptions 中列出的侦听器抛出的异常是否可重试。 默认值：true。</p>
<h3 id="instance-count-1" tabindex="-1"><a class="header-anchor" href="#instance-count-1" aria-hidden="true">#</a> instance-count</h3>
<p>当设置为大于等于零的值时，它允许自定义此使用者的实例计数（如果与 spring.cloud.stream.instanceCount 不同）。当设置为负值时，它默认为 spring.cloud.stream.instanceCount。有关更多信息，请参阅实例索引和实例计数。 默认值：-1。</p>
<h3 id="instance-index-1" tabindex="-1"><a class="header-anchor" href="#instance-index-1" aria-hidden="true">#</a> instance-index</h3>
<p>当设置为大于等于零的值时，它允许自定义此使用者的实例索引（如果与 spring.cloud.stream.instanceIndex 不同）。当设置为负值时，它默认为 spring.cloud.stream.instanceIndex。如果提供了 instanceIndexList，则忽略。有关更多信息，请参阅实例索引和实例计数。默认值：-1。</p>
<h3 id="instance-index-list" tabindex="-1"><a class="header-anchor" href="#instance-index-list" aria-hidden="true">#</a> instance-index-list</h3>
<p>与不支持本机分区的绑定器（如RabbitMQ）一起使用；允许一个应用程序实例从多个分区消费。 默认值：空。</p>
<h3 id="retryable-exceptions" tabindex="-1"><a class="header-anchor" href="#retryable-exceptions" aria-hidden="true">#</a> retryable-exceptions</h3>
<p>键中的 Throwable 类名称和值中的布尔值的映射。指定将或不会重试的那些异常（和子类）。另请参阅 defaultRetriable。示例：spring.cloud.stream.bindings.input.consumer.retryable-exceptions.java.lang.IllegalStateException=false。 默认值：空</p>
<h3 id="usenative-decoding" tabindex="-1"><a class="header-anchor" href="#usenative-decoding" aria-hidden="true">#</a> useNative-decoding</h3>
<p>设置为true时，入站消息直接由客户端库反序列化，必须进行相应配置（例如，设置合适的Kafka生产者值反序列化器）。使用此配置时，入站消息解组不基于绑定的 contentType。使用本机解码时，生产者有责任使用适当的编码器（例如，Kafka 生产者值序列化器）来序列化出站消息。此外，当使用本机编码和解码时，headerMode=embeddedHeaders 属性将被忽略，并且消息头不会嵌入到消息中。请参阅生产者属性 useNativeEncoding。 默认值：假。</p>
<h3 id="multiplex" tabindex="-1"><a class="header-anchor" href="#multiplex" aria-hidden="true">#</a> multiplex</h3>
<p>当设置为 true 时，底层绑定器将在同一输入绑定上本地复用目标。 默认值：false。</p>
<h2 id="生产者" tabindex="-1"><a class="header-anchor" href="#生产者" aria-hidden="true">#</a> 生产者</h2>
<p>producer 生产者配置</p>
<h4 id="producer-properties" tabindex="-1"><a class="header-anchor" href="#producer-properties" aria-hidden="true">#</a> <a href="https://docs.spring.io/spring-cloud-stream/docs/3.1.3/reference/html/spring-cloud-stream.html#_producer_properties" target="_blank" rel="noopener noreferrer">Producer Properties<ExternalLinkIcon/></a></h4>
<p>These properties are exposed via <code>org.springframework.cloud.stream.binder.ProducerProperties</code></p>
<p>以下绑定属性仅可用于输出绑定，并且必须以 spring.cloud.stream.bindings..producer 为前缀。 （例如，spring.cloud.stream.bindings.func-out-0.producer.partitionKeyExpression=payload.id）。</p>
<p>可以使用前缀 spring.cloud.stream.default.producer 设置默认值（例如，spring.cloud.stream.default.producer.partitionKeyExpression=payload.id）。</p>
<h3 id="auto-startup-1" tabindex="-1"><a class="header-anchor" href="#auto-startup-1" aria-hidden="true">#</a> auto-startup</h3>
<p>如果此消费者需要自动启动，则发出信号 默认值：真。</p>
<h3 id="partition-key-expression" tabindex="-1"><a class="header-anchor" href="#partition-key-expression" aria-hidden="true">#</a> partition-key-expression</h3>
<p>确定如何对出站数据进行分区的 Spring EL 表达式。如果设置，此绑定上的出站数据将被分区。 partitionCount 必须设置为大于 1 的值才能生效。请参阅分区支持。 默认值：空。</p>
<h3 id="partitionkeyextractorname" tabindex="-1"><a class="header-anchor" href="#partitionkeyextractorname" aria-hidden="true">#</a> partitionKeyExtractorName</h3>
<p>实现 PartitionKeyExtractorStrategy 的 bean 的名称。用于提取用于计算分区 ID 的键（请参阅“partitionSelector*”）。与'partitionKeyExpression' 互斥。 默认值：空。</p>
<h3 id="partitionselectorname" tabindex="-1"><a class="header-anchor" href="#partitionselectorname" aria-hidden="true">#</a> partitionSelectorName</h3>
<p>实现 PartitionSelectorStrategy 的 bean 的名称。用于根据分区键确定分区 ID（请参阅“partitionKeyExtractor*”）。与'partitionSelectorExpression' 互斥。 默认值：空。</p>
<h3 id="partitionselectorexpression" tabindex="-1"><a class="header-anchor" href="#partitionselectorexpression" aria-hidden="true">#</a> partitionSelectorExpression</h3>
<p>用于自定义分区选择的 SpEL 表达式。如果两者都没有设置，则分区被选为 hashCode(key) % partitionCount，其中键是通过任一 partitionKeyExpression 计算的。 默认值：空。</p>
<h3 id="partitioncount" tabindex="-1"><a class="header-anchor" href="#partitioncount" aria-hidden="true">#</a> partitionCount</h3>
<p>如果启用了分区，则数据的目标分区数。如果生产者已分区，则必须设置为大于 1 的值。在 Kafka 上，它被解释为一个提示。取而代之的是使用此值和目标主题的分区计数中的较大者。 默认值：1。</p>
<h3 id="requiredgroups" tabindex="-1"><a class="header-anchor" href="#requiredgroups" aria-hidden="true">#</a> requiredGroups</h3>
<p>以逗号分隔的组列表，即使它们在创建后开始（例如，通过在 RabbitMQ 中预先创建持久队列），生产者也必须确保消息传递到这些组。 标题模式 设置为 none 时，它会禁用输出中的标头嵌入。它仅对本地不支持消息头且需要头嵌入的消息中间件有效。在不支持本机标头时为非 Spring Cloud Stream 应用程序生成数据时，此选项很有用。当设置为 headers 时，它使用中间件的本地 header 机制。当设置为embeddedHeaders 时，它将标头嵌入到消息有效负载中。 默认值：取决于绑定器实现。</p>
<h3 id="headermode" tabindex="-1"><a class="header-anchor" href="#headermode" aria-hidden="true">#</a> headerMode</h3>
<p>设置为 none 时，它会禁用输出中的标头嵌入。它仅对本地不支持消息头且需要头嵌入的消息中间件有效。在不支持本机标头时为非 Spring Cloud Stream 应用程序生成数据时，此选项很有用。当设置为 headers 时，它使用中间件的本地 header 机制。当设置为embeddedHeaders 时，它将标头嵌入到消息有效负载中。 默认值：取决于绑定器实现。</p>
<h3 id="usenativeencoding" tabindex="-1"><a class="header-anchor" href="#usenativeencoding" aria-hidden="true">#</a> useNativeEncoding</h3>
<p>当设置为 true 时，出站消息由客户端库直接序列化，必须进行相应配置（例如，设置适当的 Kafka 生产者值序列化器）。使用此配置时，出站消息编组不基于绑定的 contentType。使用本机编码时，消费者有责任使用适当的解码器（例如，Kafka 消费者值反序列化器）对入站消息进行反序列化。此外，当使用本机编码和解码时，headerMode=embeddedHeaders 属性将被忽略，并且消息头不会嵌入到消息中。请参阅消费者属性 useNativeDecoding。</p>
<h3 id="errorchannelenabled" tabindex="-1"><a class="header-anchor" href="#errorchannelenabled" aria-hidden="true">#</a> errorChannelEnabled</h3>
<p>设置为 true 时，如果绑定器支持异步发送结果，则发送失败将发送到目标的错误通道。有关更多信息，请参阅错误处理。 默认值：假。</p>
</template>
