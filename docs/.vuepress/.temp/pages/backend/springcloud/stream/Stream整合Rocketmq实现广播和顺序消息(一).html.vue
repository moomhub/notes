<template><h1 id="stream-整合-rocketmq-实现广播和顺序消息-一" tabindex="-1"><a class="header-anchor" href="#stream-整合-rocketmq-实现广播和顺序消息-一" aria-hidden="true">#</a> Stream 整合 Rocketmq 实现广播和顺序消息（一）</h1>
<h1 id="实现广播消息" tabindex="-1"><a class="header-anchor" href="#实现广播消息" aria-hidden="true">#</a> 实现广播消息</h1>
<p>我们看到的都是使用集群消费，也是最常用的消费模式。而在一些场景下，我们需要使用广播消费。<br />广播消费模式下，相同 Consumer Group 的每个 Consumer 实例都接收全量的消息。<br />例如说，在应用中，缓存了数据字典等配置表在内存中，可以通过 RocketMQ 广播消费，实现每个应用节点都消费消息，刷新本地内存的缓存。<br />又例如说，我们基于 WebSocket 实现了 IM 聊天，在我们给用户主动发送消息时，因为我们不知道用户连接的是哪个提供 WebSocket 的应用，所以可以通过 RocketMQ 广播消费，每个应用判断当前用户是否是和自己提供的 WebSocket 服务连接，如果是，则推送消息给用户。</p>
<h2 id="配置文件开启" tabindex="-1"><a class="header-anchor" href="#配置文件开启" aria-hidden="true">#</a> 配置文件开启</h2>
<p>修改 [application.yml]配置文件，只改了一个参数，设置 broadcasting 配置项为 true，开启广播消费的模式。完整配置如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token comment"># Binding 配置项，对应 BindingProperties Map</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">erbadagang-input</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> ERBADAGANG<span class="token punctuation">-</span>TOPIC<span class="token punctuation">-</span><span class="token number">01</span> <span class="token comment"># 目的地。这里使用 RocketMQ Topic</span>
          <span class="token key atrule">content-type</span><span class="token punctuation">:</span> application/json <span class="token comment"># 内容格式。这里使用 JSON</span>
          <span class="token key atrule">group</span><span class="token punctuation">:</span> erbadagang<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>group<span class="token punctuation">-</span>ERBADAGANG<span class="token punctuation">-</span>TOPIC<span class="token punctuation">-</span><span class="token number">01</span> <span class="token comment"># 消费者分组,命名规则：组名+topic名</span>
      <span class="token comment"># Spring Cloud Stream RocketMQ 配置项</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token comment"># RocketMQ Binder 配置项，对应 RocketMQBinderConfigurationProperties 类</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 101.133.227.13<span class="token punctuation">:</span><span class="token number">9876</span> <span class="token comment"># RocketMQ Namesrv 地址</span>
        <span class="token comment"># RocketMQ 自定义 Binding 配置项，对应 RocketMQBindingProperties Map</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">erbadagang-input</span><span class="token punctuation">:</span>
            <span class="token comment"># RocketMQ Consumer 配置项，对应 RocketMQConsumerProperties 类</span>
            <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
              <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否开启消费，默认为 true</span>
              <span class="token key atrule">broadcasting</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否使用广播消费，默认为 false（使用集群消费）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h1 id="rocketmq-提供了两种顺序级别" tabindex="-1"><a class="header-anchor" href="#rocketmq-提供了两种顺序级别" aria-hidden="true">#</a> RocketMQ 提供了两种顺序级别：</h1>
<p>普通顺序消息：Producer 将相关联的消息发送到相同的消息队列。</p>
<p>完全严格顺序：在【普通顺序消息】的基础上，Consumer 严格顺序消费。</p>
<p>官方文档是这么描述的：</p>
<blockquote>
<p>消息有序，指的是一类消息消费时，能按照发送的顺序来消费。例如：一个订单产生了三条消息分别是订单创建、订单付款、订单完成。消费时要按照这个顺序消费才能有意义，但是同时订单之间是可以并行消费的。RocketMQ 可以严格的保证消息有序。<br />顺序消息分为全局顺序消息与分区顺序消息，全局顺序是指某个 Topic 下的所有消息都要保证顺序；部分顺序消息只要保证每一组消息被顺序消费即可。<br />全局顺序：对于指定的一个 Topic，所有消息按照严格的先入先出（FIFO）的顺序进行发布和消费。适用场景：性能要求不高，所有的消息严格按照 FIFO 原则进行消息发布和消费的场景<br />分区顺序：对于指定的一个 Topic，所有消息根据 Sharding key 进行区块分区。 同一个分区内的消息按照严格的 FIFO 顺序进行发布和消费。Sharding key 是顺序消息中用来区分不同分区的关键字段，和普通消息的 Key 是完全不同的概念。适用场景：性能要求高，以 Sharding key 作为分区字段，在同一个区块中严格的按照 FIFO 原则进行消息发布和消费的场景。</p>
</blockquote>
<h2 id="生产者配置" tabindex="-1"><a class="header-anchor" href="#生产者配置" aria-hidden="true">#</a> 生产者配置</h2>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">erbadagang-output</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> ERBADAGANG<span class="token punctuation">-</span>TOPIC<span class="token punctuation">-</span><span class="token number">01</span> <span class="token comment"># 目的地。这里使用 RocketMQ Topic</span>
          <span class="token key atrule">content-type</span><span class="token punctuation">:</span> application/json <span class="token comment"># 内容格式。这里使用 JSON</span>
          <span class="token key atrule">producer</span><span class="token punctuation">:</span>
            <span class="token key atrule">partition-count</span><span class="token punctuation">:</span> <span class="token number">4</span> <span class="token comment"># 消息分区的最大数（Rocketmq 必须要设置为4 - 参考Rocketmq 的MessageQruees）</span>
            <span class="token key atrule">partition-key-expression</span><span class="token punctuation">:</span> payload<span class="token punctuation">[</span><span class="token string">'id'</span><span class="token punctuation">]</span> <span class="token comment"># 分区 key 表达式。该表达式基于 Spring EL，从消息中获得分区 key。</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token comment"># RocketMQ Binder 配置项，对应 RocketMQBinderConfigurationProperties 类</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">9876</span> <span class="token comment"># RocketMQ Namesrv 地址</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">erbadagang-output</span><span class="token punctuation">:</span>
            <span class="token comment"># RocketMQ Producer 配置项，对应 RocketMQProducerProperties 类</span>
            <span class="token key atrule">producer</span><span class="token punctuation">:</span>
              <span class="token key atrule">group</span><span class="token punctuation">:</span> test <span class="token comment"># 生产者分组</span>
              <span class="token key atrule">sync</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否同步发送消息，默认为 false 异步。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>① partition-key-expression 配置项，该表达式基于 Spring EL，从消息中获得 Sharding key。</p>
<p>这里，我们设置该配置项为 payload['id']，表示从 Spring Message 的 payload 的 id。稍后我们发送的消息的 payload 为 Demo01Message，那么 id 就是 Demo01Message.id。</p>
<p>如果我们想从消息的 headers 中获得 Sharding key，可以设置为 headers['partitionKey']。</p>
<p>② Spring Cloud Stream 使用 PartitionHandler 进行 Sharding key 的获得与计算，最终 Sharding key 的结果为 key.hashCode() % partitionCount。</p>
<h2 id="消费者配置" tabindex="-1"><a class="header-anchor" href="#消费者配置" aria-hidden="true">#</a> 消费者配置</h2>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">9876</span>
          <span class="token key atrule">enable-msg-trace</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">sequence_message_input</span><span class="token punctuation">:</span>
            <span class="token comment"># RocketMQ Consumer 配置项，对应 RocketMQConsumerProperties 类</span>
            <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
              <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否开启消费，默认为 true</span>
              <span class="token key atrule">broadcasting</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 是否使用广播消费，默认为 false 使用集群消费</span>
              <span class="token key atrule">orderly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否顺序消费，默认为 false 并发消费。</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">sequence_message_input</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> message<span class="token punctuation">-</span>stream<span class="token punctuation">-</span>topic6
          <span class="token key atrule">group</span><span class="token punctuation">:</span> message<span class="token punctuation">-</span>stream<span class="token punctuation">-</span>group123
          <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
            <span class="token comment"># 消费者是否从分区的生产者接收数据。 默认值：false。</span>
            <span class="token key atrule">partitioned</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token comment"># 消费者是否从分区大小  </span>
            <span class="token key atrule">partitionCount</span><span class="token punctuation">:</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>其他如生产者和消费代码相同</p>
</template>
