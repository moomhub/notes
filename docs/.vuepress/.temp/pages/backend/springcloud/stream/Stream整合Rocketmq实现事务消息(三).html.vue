<template><h1 id="stream-整合-rocketmq-实现事务消息-三" tabindex="-1"><a class="header-anchor" href="#stream-整合-rocketmq-实现事务消息-三" aria-hidden="true">#</a> Stream 整合 Rocketmq 实现事务消息（三）</h1>
<h1 id="什么是事务性消息" tabindex="-1"><a class="header-anchor" href="#什么是事务性消息" aria-hidden="true">#</a> 什么是事务性消息</h1>
<p>通过场景来看：</p>
<p>生成订单记录 -&gt; MQ -&gt; 增加积分,我们需要保证消息的发送与订单数据的插入要么都成功，要么都失败。</p>
<p>在这里插入图片描述</p>
<p>我们是应该先创建订单，还是先发送MQ消息？</p>
<p>1、先发送MQ消息：如果消息发送成功，而订单创建失败，没办法把消息收回来。</p>
<p>2、先创建订单：如果订单创建成功后MQ消息发送失败，抛出异常，因为两个操作在一个事务代码块中，所以订单数据会回滚。</p>
<p>但是网络是不稳定的，如果MQ端确实收到了这条消息，只是返回给客户端的响应丢失了，就出现跟1一样的问题。</p>
<h1 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h1>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">9876</span>
          <span class="token key atrule">enable-msg-trace</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">transactional_message_output</span><span class="token punctuation">:</span>
            <span class="token key atrule">producer</span><span class="token punctuation">:</span>
              <span class="token comment"># 同步发送消息</span>
              <span class="token key atrule">sync</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
              <span class="token key atrule">group</span><span class="token punctuation">:</span> transactional_stream_group
              <span class="token comment"># 开启事务支持</span>
              <span class="token key atrule">transactional</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">transactional_message_output</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> message<span class="token punctuation">-</span>stream<span class="token punctuation">-</span>topic4 <span class="token comment"># 相当于 rocketmq 的 topic</span>
          <span class="token key atrule">content-type</span><span class="token punctuation">:</span> application/json <span class="token comment"># 设置消息类型，本次为对象json，如果是文本则设置“text/plain”</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h1 id="事务消息生产者" tabindex="-1"><a class="header-anchor" href="#事务消息生产者" aria-hidden="true">#</a> 事务消息生产者</h1>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>  @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean sendTransactionalMessage(HashMap&lt;String, Object> headers, Object object) {
    //      。。。数据库事务   保存或添加
        log.info("保存数据到本地完成，开始发送事务消息！");
        String transaction_id = UUID.randomUUID().toString().replaceAll("-", "");
        MessageBuilder&lt;Object> builder = MessageBuilder.withPayload(object);
        headers.put(RocketMQHeaders.TRANSACTION_ID, transaction_id);
        builder.copyHeaders(headers);
        Message&lt;Object> transactionMessage = builder.build();
        MessageChannel delayMessageChannel = this.messageSendChannel.transactional_output();
        boolean delay_ok = delayMessageChannel.send(transactionMessage);
        log.info("事务消息发送发送状态： [{}]", delay_ok);
        return delay_ok;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h1 id="rocketmq事务监听" tabindex="-1"><a class="header-anchor" href="#rocketmq事务监听" aria-hidden="true">#</a> RocketMQ事务监听</h1>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RocketMQTransactionListener</span><span class="token punctuation">(</span>txProducerGroup <span class="token operator">=</span> <span class="token string">"transactional_stream_group"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RocketMQMessageTransactionListener</span> <span class="token keyword">implements</span> <span class="token class-name">RocketMQLocalTransactionListener</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 执行本地事务
     * ①事务执行成功，commit
     * ②事务执行失败，rollback
     * ③回查发送消息，unknown
     *
     * <span class="token keyword">@param</span> <span class="token parameter">message</span>
     * <span class="token keyword">@param</span> <span class="token parameter">o</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">RocketMQLocalTransactionState</span> <span class="token function">executeLocalTransaction</span><span class="token punctuation">(</span><span class="token class-name">Message</span> message<span class="token punctuation">,</span> <span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 查询之前的消息是否已经添加数据数据库
         * */</span>
        <span class="token keyword">return</span> <span class="token class-name">RocketMQLocalTransactionState</span><span class="token punctuation">.</span>ROLLBACK<span class="token punctuation">;</span>
<span class="token comment">//        try {</span>
<span class="token comment">//            // 获取前面生成的事务ID</span>
<span class="token comment">//            String transactionId = (String) message.getHeaders().get(RocketMQHeaders.TRANSACTION_ID);</span>
<span class="token comment">//            // 以事务ID为主键，执行本地事务</span>
<span class="token comment">////            Order order = (Order) message.getPayload();</span>
<span class="token comment">//            boolean result = this.saveOrder(new Stream(), transactionId);</span>
<span class="token comment">//            return result ? RocketMQLocalTransactionState.COMMIT : RocketMQLocalTransactionState.ROLLBACK;</span>
<span class="token comment">//        } catch (Exception e) {</span>
<span class="token comment">//            return RocketMQLocalTransactionState.ROLLBACK;</span>
<span class="token comment">//        }</span>
    <span class="token punctuation">}</span>

<span class="token comment">//    private boolean saveOrder(Stream order, String transactionId) {</span>
<span class="token comment">//        // 将事务ID设置为唯一键</span>
<span class="token comment">//        // 调用数据库Insert into 订单表</span>
<span class="token comment">//        return true;</span>
<span class="token comment">//    }</span>


    <span class="token doc-comment comment">/**
     * 执行本地事务回查，当状态为 UNKNOW 会执行这个方法，回查间隔时间差不多一分钟。
     * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>
     * 业务代码用来检查事务当前状态，是否执行完成，如果完成就执行 COMMIT
     *
     * <span class="token keyword">@param</span> <span class="token parameter">message</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">RocketMQLocalTransactionState</span> <span class="token function">checkLocalTransaction</span><span class="token punctuation">(</span><span class="token class-name">Message</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"判断远程消息是否完成、完成就提交"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> transactionId <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> message<span class="token punctuation">.</span><span class="token function">getHeaders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">RocketMQHeaders</span><span class="token punctuation">.</span>TRANSACTION_ID<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 以事务ID为主键，查询本地事务执行情况</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isSuccess</span><span class="token punctuation">(</span>transactionId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">RocketMQLocalTransactionState</span><span class="token punctuation">.</span>COMMIT<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">RocketMQLocalTransactionState</span><span class="token punctuation">.</span>ROLLBACK<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isSuccess</span><span class="token punctuation">(</span><span class="token class-name">String</span> transactionId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 查询数据库 select from 订单表</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br></div></div><p>@RocketMQTransactionListener 注解，声明监听器的是生产者分组是 &quot;transactional_stream_group&quot; 的 Producer 发送的事务消息。因为 RocketMQ 是回查（请求）指定指定生产分组下的 Producer，从而获得事务消息的状态，所以一定要正确设置。</p>
<p>注意，这是一个模板方法。在调用这个方法之前，Spring Cloud Alibaba Stream RocketMQ 已经使用 Producer 发送了一条事务消息，本方法里面我们使用消息内容进行本地数据库事务操作。然后根据该方法执行的返回的 RocketMQLocalTransactionState 结果，提交还是回滚该事务消息。</p>
<p>实现 #executeLocalTransaction(...) 方法，检查本地事务(或者在此提交相关的事务)，通过相关结果的判断是提交还是回滚事务消息。</p>
<p>一般来说，有两种方式实现本地事务回查时，返回事务消息的状态。</p>
<p>第一种，通过 msg 消息，获得某个业务上的标识或者编号，然后去数据库中查询业务记录，从而判断该事务消息的状态是提交还是回滚。</p>
<p>第二种，记录 msg 的事务编号，与事务状态到数据库中。</p>
<p>第一步，在 #executeLocalTransaction(...) 方法中，先存储一条 id 为 msg 的事务编号，状态为 RocketMQLocalTransactionState.UNKNOWN 的记录。<br />第二步，调用带有事务的业务 Service 的方法。在该 Service 方法中，在逻辑都执行成功的情况下，更新 id 为 msg 的事务编号，状态变更为 RocketMQLocalTransactionState.COMMIT 。这样，我们就可以伴随这个事务的提交，更新 id 为 msg 的事务编号的记录的状为 RocketMQLocalTransactionState.COMMIT ，美滋滋。。<br />第三步，要以 try-catch 的方式，调用业务 Service 的方法。如此，如果发生异常，回滚事务的时候，可以在 catch 中，更新 id 为 msg 的事务编号的记录的状态为 RocketMQLocalTransactionState.ROLLBACK 。😭 极端情况下，可能更新失败，则打印 error 日志，告警知道，人工介入。<br />如此三步之后，我们在 #executeLocalTransaction(...) 方法中，就可以通过查找数据库，id 为 msg 的事务编号的记录的状态，然后返回。<br />相比来说，倾向第一种，实现更加简单通用，对于业务开发者，更加友好。和有几个朋友沟通了下，但他们是采用第二种。</p>
</template>
