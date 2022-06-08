import{_ as n,o as s,c as a,a as e}from"./app.4a9c1875.js";const t={},p=e(`<h1 id="stream-\u6574\u5408-rocketmq-\u5B9E\u73B0\u5E7F\u64AD\u548C\u987A\u5E8F\u6D88\u606F-\u4E00" tabindex="-1"><a class="header-anchor" href="#stream-\u6574\u5408-rocketmq-\u5B9E\u73B0\u5E7F\u64AD\u548C\u987A\u5E8F\u6D88\u606F-\u4E00" aria-hidden="true">#</a> Stream \u6574\u5408 Rocketmq \u5B9E\u73B0\u5E7F\u64AD\u548C\u987A\u5E8F\u6D88\u606F\uFF08\u4E00\uFF09</h1><h2 id="\u5B9E\u73B0\u5E7F\u64AD\u6D88\u606F" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u5E7F\u64AD\u6D88\u606F" aria-hidden="true">#</a> \u5B9E\u73B0\u5E7F\u64AD\u6D88\u606F</h2><p>\u6211\u4EEC\u770B\u5230\u7684\u90FD\u662F\u4F7F\u7528\u96C6\u7FA4\u6D88\u8D39\uFF0C\u4E5F\u662F\u6700\u5E38\u7528\u7684\u6D88\u8D39\u6A21\u5F0F\u3002\u800C\u5728\u4E00\u4E9B\u573A\u666F\u4E0B\uFF0C\u6211\u4EEC\u9700\u8981\u4F7F\u7528\u5E7F\u64AD\u6D88\u8D39\u3002</p><p>\u5E7F\u64AD\u6D88\u8D39\u6A21\u5F0F\u4E0B\uFF0C\u76F8\u540C Consumer Group \u7684\u6BCF\u4E2A Consumer \u5B9E\u4F8B\u90FD\u63A5\u6536\u5168\u91CF\u7684\u6D88\u606F\u3002</p><p>\u4F8B\u5982\u8BF4\uFF0C\u5728\u5E94\u7528\u4E2D\uFF0C\u7F13\u5B58\u4E86\u6570\u636E\u5B57\u5178\u7B49\u914D\u7F6E\u8868\u5728\u5185\u5B58\u4E2D\uFF0C\u53EF\u4EE5\u901A\u8FC7 RocketMQ \u5E7F\u64AD\u6D88\u8D39\uFF0C\u5B9E\u73B0\u6BCF\u4E2A\u5E94\u7528\u8282\u70B9\u90FD\u6D88\u8D39\u6D88\u606F\uFF0C\u5237\u65B0\u672C\u5730\u5185\u5B58\u7684\u7F13\u5B58\u3002</p><p>\u53C8\u4F8B\u5982\u8BF4\uFF0C\u6211\u4EEC\u57FA\u4E8E WebSocket \u5B9E\u73B0\u4E86 IM \u804A\u5929\uFF0C\u5728\u6211\u4EEC\u7ED9\u7528\u6237\u4E3B\u52A8\u53D1\u9001\u6D88\u606F\u65F6\uFF0C\u56E0\u4E3A\u6211\u4EEC\u4E0D\u77E5\u9053\u7528\u6237\u8FDE\u63A5\u7684\u662F\u54EA\u4E2A\u63D0\u4F9B WebSocket \u7684\u5E94\u7528\uFF0C\u6240\u4EE5\u53EF\u4EE5\u901A\u8FC7 RocketMQ \u5E7F\u64AD\u6D88\u8D39\uFF0C\u6BCF\u4E2A\u5E94\u7528\u5224\u65AD\u5F53\u524D\u7528\u6237\u662F\u5426\u662F\u548C\u81EA\u5DF1\u63D0\u4F9B\u7684 WebSocket \u670D\u52A1\u8FDE\u63A5\uFF0C\u5982\u679C\u662F\uFF0C\u5219\u63A8\u9001\u6D88\u606F\u7ED9\u7528\u6237\u3002</p><h2 id="\u914D\u7F6E\u6587\u4EF6\u5F00\u542F" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6\u5F00\u542F" aria-hidden="true">#</a> \u914D\u7F6E\u6587\u4EF6\u5F00\u542F</h2><p>\u4FEE\u6539 [application.yml]\u914D\u7F6E\u6587\u4EF6\uFF0C\u53EA\u6539\u4E86\u4E00\u4E2A\u53C2\u6570\uFF0C\u8BBE\u7F6E broadcasting \u914D\u7F6E\u9879\u4E3A true\uFF0C\u5F00\u542F\u5E7F\u64AD\u6D88\u8D39\u7684\u6A21\u5F0F\u3002\u5B8C\u6574\u914D\u7F6E\u5982\u4E0B\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token comment"># Binding \u914D\u7F6E\u9879\uFF0C\u5BF9\u5E94 BindingProperties Map</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">erbadagang-input</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> ERBADAGANG<span class="token punctuation">-</span>TOPIC<span class="token punctuation">-</span><span class="token number">01</span> <span class="token comment"># \u76EE\u7684\u5730\u3002\u8FD9\u91CC\u4F7F\u7528 RocketMQ Topic</span>
          <span class="token key atrule">content-type</span><span class="token punctuation">:</span> application/json <span class="token comment"># \u5185\u5BB9\u683C\u5F0F\u3002\u8FD9\u91CC\u4F7F\u7528 JSON</span>
          <span class="token key atrule">group</span><span class="token punctuation">:</span> erbadagang<span class="token punctuation">-</span>consumer<span class="token punctuation">-</span>group<span class="token punctuation">-</span>ERBADAGANG<span class="token punctuation">-</span>TOPIC<span class="token punctuation">-</span><span class="token number">01</span> <span class="token comment"># \u6D88\u8D39\u8005\u5206\u7EC4,\u547D\u540D\u89C4\u5219\uFF1A\u7EC4\u540D+topic\u540D</span>
      <span class="token comment"># Spring Cloud Stream RocketMQ \u914D\u7F6E\u9879</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token comment"># RocketMQ Binder \u914D\u7F6E\u9879\uFF0C\u5BF9\u5E94 RocketMQBinderConfigurationProperties \u7C7B</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 101.133.227.13<span class="token punctuation">:</span><span class="token number">9876</span> <span class="token comment"># RocketMQ Namesrv \u5730\u5740</span>
        <span class="token comment"># RocketMQ \u81EA\u5B9A\u4E49 Binding \u914D\u7F6E\u9879\uFF0C\u5BF9\u5E94 RocketMQBindingProperties Map</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">erbadagang-input</span><span class="token punctuation">:</span>
            <span class="token comment"># RocketMQ Consumer \u914D\u7F6E\u9879\uFF0C\u5BF9\u5E94 RocketMQConsumerProperties \u7C7B</span>
            <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
              <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u662F\u5426\u5F00\u542F\u6D88\u8D39\uFF0C\u9ED8\u8BA4\u4E3A true</span>
              <span class="token key atrule">broadcasting</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u662F\u5426\u4F7F\u7528\u5E7F\u64AD\u6D88\u8D39\uFF0C\u9ED8\u8BA4\u4E3A false\uFF08\u4F7F\u7528\u96C6\u7FA4\u6D88\u8D39\uFF09</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rocketmq-\u63D0\u4F9B\u4E86\u4E24\u79CD\u987A\u5E8F\u7EA7\u522B" tabindex="-1"><a class="header-anchor" href="#rocketmq-\u63D0\u4F9B\u4E86\u4E24\u79CD\u987A\u5E8F\u7EA7\u522B" aria-hidden="true">#</a> RocketMQ \u63D0\u4F9B\u4E86\u4E24\u79CD\u987A\u5E8F\u7EA7\u522B\uFF1A</h2><p>\u666E\u901A\u987A\u5E8F\u6D88\u606F\uFF1AProducer \u5C06\u76F8\u5173\u8054\u7684\u6D88\u606F\u53D1\u9001\u5230\u76F8\u540C\u7684\u6D88\u606F\u961F\u5217\u3002</p><p>\u5B8C\u5168\u4E25\u683C\u987A\u5E8F\uFF1A\u5728\u3010\u666E\u901A\u987A\u5E8F\u6D88\u606F\u3011\u7684\u57FA\u7840\u4E0A\uFF0CConsumer \u4E25\u683C\u987A\u5E8F\u6D88\u8D39\u3002</p><p>\u5B98\u65B9\u6587\u6863\u662F\u8FD9\u4E48\u63CF\u8FF0\u7684\uFF1A</p><blockquote><p>\u6D88\u606F\u6709\u5E8F\uFF0C\u6307\u7684\u662F\u4E00\u7C7B\u6D88\u606F\u6D88\u8D39\u65F6\uFF0C\u80FD\u6309\u7167\u53D1\u9001\u7684\u987A\u5E8F\u6765\u6D88\u8D39\u3002\u4F8B\u5982\uFF1A\u4E00\u4E2A\u8BA2\u5355\u4EA7\u751F\u4E86\u4E09\u6761\u6D88\u606F\u5206\u522B\u662F\u8BA2\u5355\u521B\u5EFA\u3001\u8BA2\u5355\u4ED8\u6B3E\u3001\u8BA2\u5355\u5B8C\u6210\u3002\u6D88\u8D39\u65F6\u8981\u6309\u7167\u8FD9\u4E2A\u987A\u5E8F\u6D88\u8D39\u624D\u80FD\u6709\u610F\u4E49\uFF0C\u4F46\u662F\u540C\u65F6\u8BA2\u5355\u4E4B\u95F4\u662F\u53EF\u4EE5\u5E76\u884C\u6D88\u8D39\u7684\u3002RocketMQ \u53EF\u4EE5\u4E25\u683C\u7684\u4FDD\u8BC1\u6D88\u606F\u6709\u5E8F\u3002<br>\u987A\u5E8F\u6D88\u606F\u5206\u4E3A\u5168\u5C40\u987A\u5E8F\u6D88\u606F\u4E0E\u5206\u533A\u987A\u5E8F\u6D88\u606F\uFF0C\u5168\u5C40\u987A\u5E8F\u662F\u6307\u67D0\u4E2A Topic \u4E0B\u7684\u6240\u6709\u6D88\u606F\u90FD\u8981\u4FDD\u8BC1\u987A\u5E8F\uFF1B\u90E8\u5206\u987A\u5E8F\u6D88\u606F\u53EA\u8981\u4FDD\u8BC1\u6BCF\u4E00\u7EC4\u6D88\u606F\u88AB\u987A\u5E8F\u6D88\u8D39\u5373\u53EF\u3002<br>\u5168\u5C40\u987A\u5E8F\uFF1A\u5BF9\u4E8E\u6307\u5B9A\u7684\u4E00\u4E2A Topic\uFF0C\u6240\u6709\u6D88\u606F\u6309\u7167\u4E25\u683C\u7684\u5148\u5165\u5148\u51FA\uFF08FIFO\uFF09\u7684\u987A\u5E8F\u8FDB\u884C\u53D1\u5E03\u548C\u6D88\u8D39\u3002\u9002\u7528\u573A\u666F\uFF1A\u6027\u80FD\u8981\u6C42\u4E0D\u9AD8\uFF0C\u6240\u6709\u7684\u6D88\u606F\u4E25\u683C\u6309\u7167 FIFO \u539F\u5219\u8FDB\u884C\u6D88\u606F\u53D1\u5E03\u548C\u6D88\u8D39\u7684\u573A\u666F<br>\u5206\u533A\u987A\u5E8F\uFF1A\u5BF9\u4E8E\u6307\u5B9A\u7684\u4E00\u4E2A Topic\uFF0C\u6240\u6709\u6D88\u606F\u6839\u636E Sharding key \u8FDB\u884C\u533A\u5757\u5206\u533A\u3002 \u540C\u4E00\u4E2A\u5206\u533A\u5185\u7684\u6D88\u606F\u6309\u7167\u4E25\u683C\u7684 FIFO \u987A\u5E8F\u8FDB\u884C\u53D1\u5E03\u548C\u6D88\u8D39\u3002Sharding key \u662F\u987A\u5E8F\u6D88\u606F\u4E2D\u7528\u6765\u533A\u5206\u4E0D\u540C\u5206\u533A\u7684\u5173\u952E\u5B57\u6BB5\uFF0C\u548C\u666E\u901A\u6D88\u606F\u7684 Key \u662F\u5B8C\u5168\u4E0D\u540C\u7684\u6982\u5FF5\u3002\u9002\u7528\u573A\u666F\uFF1A\u6027\u80FD\u8981\u6C42\u9AD8\uFF0C\u4EE5 Sharding key \u4F5C\u4E3A\u5206\u533A\u5B57\u6BB5\uFF0C\u5728\u540C\u4E00\u4E2A\u533A\u5757\u4E2D\u4E25\u683C\u7684\u6309\u7167 FIFO \u539F\u5219\u8FDB\u884C\u6D88\u606F\u53D1\u5E03\u548C\u6D88\u8D39\u7684\u573A\u666F\u3002</p></blockquote><h3 id="\u751F\u4EA7\u8005\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u751F\u4EA7\u8005\u914D\u7F6E" aria-hidden="true">#</a> \u751F\u4EA7\u8005\u914D\u7F6E</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">erbadagang-output</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> ERBADAGANG<span class="token punctuation">-</span>TOPIC<span class="token punctuation">-</span><span class="token number">01</span> <span class="token comment"># \u76EE\u7684\u5730\u3002\u8FD9\u91CC\u4F7F\u7528 RocketMQ Topic</span>
          <span class="token key atrule">content-type</span><span class="token punctuation">:</span> application/json <span class="token comment"># \u5185\u5BB9\u683C\u5F0F\u3002\u8FD9\u91CC\u4F7F\u7528 JSON</span>
          <span class="token key atrule">producer</span><span class="token punctuation">:</span>
            <span class="token key atrule">partition-count</span><span class="token punctuation">:</span> <span class="token number">4</span> <span class="token comment"># \u6D88\u606F\u5206\u533A\u7684\u6700\u5927\u6570\uFF08Rocketmq \u5FC5\u987B\u8981\u8BBE\u7F6E\u4E3A4 - \u53C2\u8003Rocketmq \u7684MessageQruees\uFF09</span>
            <span class="token key atrule">partition-key-expression</span><span class="token punctuation">:</span> payload<span class="token punctuation">[</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span> <span class="token comment"># \u5206\u533A key \u8868\u8FBE\u5F0F\u3002\u8BE5\u8868\u8FBE\u5F0F\u57FA\u4E8E Spring EL\uFF0C\u4ECE\u6D88\u606F\u4E2D\u83B7\u5F97\u5206\u533A key\u3002</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token comment"># RocketMQ Binder \u914D\u7F6E\u9879\uFF0C\u5BF9\u5E94 RocketMQBinderConfigurationProperties \u7C7B</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">9876</span> <span class="token comment"># RocketMQ Namesrv \u5730\u5740</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">erbadagang-output</span><span class="token punctuation">:</span>
            <span class="token comment"># RocketMQ Producer \u914D\u7F6E\u9879\uFF0C\u5BF9\u5E94 RocketMQProducerProperties \u7C7B</span>
            <span class="token key atrule">producer</span><span class="token punctuation">:</span>
              <span class="token key atrule">group</span><span class="token punctuation">:</span> test <span class="token comment"># \u751F\u4EA7\u8005\u5206\u7EC4</span>
              <span class="token key atrule">sync</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u662F\u5426\u540C\u6B65\u53D1\u9001\u6D88\u606F\uFF0C\u9ED8\u8BA4\u4E3A false \u5F02\u6B65\u3002</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u2460 partition-key-expression \u914D\u7F6E\u9879\uFF0C\u8BE5\u8868\u8FBE\u5F0F\u57FA\u4E8E Spring EL\uFF0C\u4ECE\u6D88\u606F\u4E2D\u83B7\u5F97 Sharding key\u3002</p><p>\u8FD9\u91CC\uFF0C\u6211\u4EEC\u8BBE\u7F6E\u8BE5\u914D\u7F6E\u9879\u4E3A payload[&#39;id&#39;]\uFF0C\u8868\u793A\u4ECE Spring Message \u7684 payload \u7684 id\u3002\u7A0D\u540E\u6211\u4EEC\u53D1\u9001\u7684\u6D88\u606F\u7684 payload \u4E3A Demo01Message\uFF0C\u90A3\u4E48 id \u5C31\u662F Demo01Message.id\u3002</p><p>\u5982\u679C\u6211\u4EEC\u60F3\u4ECE\u6D88\u606F\u7684 headers \u4E2D\u83B7\u5F97 Sharding key\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u4E3A headers[&#39;partitionKey&#39;]\u3002</p><p>\u2461 Spring Cloud Stream \u4F7F\u7528 PartitionHandler \u8FDB\u884C Sharding key \u7684\u83B7\u5F97\u4E0E\u8BA1\u7B97\uFF0C\u6700\u7EC8 Sharding key \u7684\u7ED3\u679C\u4E3A key.hashCode() % partitionCount\u3002</p><h3 id="\u6D88\u8D39\u8005\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u6D88\u8D39\u8005\u914D\u7F6E" aria-hidden="true">#</a> \u6D88\u8D39\u8005\u914D\u7F6E</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">9876</span>
          <span class="token key atrule">enable-msg-trace</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">sequence_message_input</span><span class="token punctuation">:</span>
            <span class="token comment"># RocketMQ Consumer \u914D\u7F6E\u9879\uFF0C\u5BF9\u5E94 RocketMQConsumerProperties \u7C7B</span>
            <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
              <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u662F\u5426\u5F00\u542F\u6D88\u8D39\uFF0C\u9ED8\u8BA4\u4E3A true</span>
              <span class="token key atrule">broadcasting</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u662F\u5426\u4F7F\u7528\u5E7F\u64AD\u6D88\u8D39\uFF0C\u9ED8\u8BA4\u4E3A false \u4F7F\u7528\u96C6\u7FA4\u6D88\u8D39</span>
              <span class="token key atrule">orderly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u662F\u5426\u987A\u5E8F\u6D88\u8D39\uFF0C\u9ED8\u8BA4\u4E3A false \u5E76\u53D1\u6D88\u8D39\u3002</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">sequence_message_input</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> message<span class="token punctuation">-</span>stream<span class="token punctuation">-</span>topic6
          <span class="token key atrule">group</span><span class="token punctuation">:</span> message<span class="token punctuation">-</span>stream<span class="token punctuation">-</span>group123
          <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
            <span class="token comment"># \u6D88\u8D39\u8005\u662F\u5426\u4ECE\u5206\u533A\u7684\u751F\u4EA7\u8005\u63A5\u6536\u6570\u636E\u3002 \u9ED8\u8BA4\u503C\uFF1Afalse\u3002</span>
            <span class="token key atrule">partitioned</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
            <span class="token comment"># \u6D88\u8D39\u8005\u662F\u5426\u4ECE\u5206\u533A\u5927\u5C0F  </span>
            <span class="token key atrule">partitionCount</span><span class="token punctuation">:</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4ED6\u5982\u751F\u4EA7\u8005\u548C\u6D88\u8D39\u4EE3\u7801\u76F8\u540C</p>`,23),c=[p];function o(i,l){return s(),a("div",null,c)}var r=n(t,[["render",o],["__file","Stream\u6574\u5408Rocketmq\u5B9E\u73B0\u5E7F\u64AD\u548C\u987A\u5E8F\u6D88\u606F(\u4E00).html.vue"]]);export{r as default};
