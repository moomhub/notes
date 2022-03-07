<template><h1 id="spring-cloud-stream实现消息过滤的三种主要方式" tabindex="-1"><a class="header-anchor" href="#spring-cloud-stream实现消息过滤的三种主要方式" aria-hidden="true">#</a> Spring Cloud Stream实现消息过滤的三种主要方式</h1>
<p>消息过滤是指消费者不希望消费topic里的所有消息，而是只消费部分特定的消息。从topic中挑选出这些特定的消息，就是所谓的消息过滤。通过消息过滤可以实现消息的分流处理，例如生产者生产的消息，header可能都是不尽相同的，这样我们就可以编写两个或多个消费者，对不同header的消息进行针对性的处理。</p>
<p>Spring Cloud Stream实现消息过滤的方式主要有三种。</p>
<ol>
<li>
<p>使用@StreamListener注解的condition属性指定条件表达式，</p>
</li>
<li>
<p>在消息的header中设置TAGS</p>
</li>
<li>
<p>使用SQL92语法进行过滤。</p>
</li>
</ol>
<h1 id="_1、condition-通用所有的mq" tabindex="-1"><a class="header-anchor" href="#_1、condition-通用所有的mq" aria-hidden="true">#</a> 1、condition（通用所有的MQ）</h1>
<p>这种方式适用于所有的MQ，也是最简单易用的方式。首先我们为生产者的消息设置一个header，具体的header名称和值可根据实际业务需求进行设置。这里仅作为示例，具体代码如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zj<span class="token punctuation">.</span>node<span class="token punctuation">.</span>contentcenter<span class="token punctuation">.</span>controller<span class="token punctuation">.</span>content</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">RequiredArgsConstructor</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>stream<span class="token punctuation">.</span>messaging<span class="token punctuation">.</span></span><span class="token class-name">Source</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>messaging<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">MessageBuilder</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">GetMapping</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 生产者
 *
 * <span class="token keyword">@author</span> 01
 * <span class="token keyword">@date</span> 2019-08-03
 **/</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestProducerController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Source</span> source<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/stream-send-msg"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">streamSendMsg</span><span class="token punctuation">(</span><span class="token class-name">String</span> flagHeader<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        source<span class="token punctuation">.</span><span class="token function">output</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>
                <span class="token class-name">MessageBuilder</span><span class="token punctuation">.</span><span class="token function">withPayload</span><span class="token punctuation">(</span><span class="token string">"消息体"</span><span class="token punctuation">)</span>
                        <span class="token comment">// 设置用于过滤消息的header</span>
                        <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"flag-header"</span><span class="token punctuation">,</span> flagHeader<span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token string">"send message success!"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>然后在消费者的@StreamListener注解中指定condition属性，根据具体设置的header编写条件表达式。如下示例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zj<span class="token punctuation">.</span>node<span class="token punctuation">.</span>usercenter<span class="token punctuation">.</span>rocketmq</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>stream<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">StreamListener</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>stream<span class="token punctuation">.</span>messaging<span class="token punctuation">.</span></span><span class="token class-name">Sink</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 消费者
 *
 * <span class="token keyword">@author</span> 01
 * <span class="token keyword">@date</span> 2019-08-10
 **/</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestStreamConsumer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@StreamListener</span><span class="token punctuation">(</span>
            value <span class="token operator">=</span> <span class="token class-name">Sink</span><span class="token punctuation">.</span>INPUT<span class="token punctuation">,</span>
            <span class="token comment">// 消息过滤的条件表达式，只有满足该表达式才会进行执行该方法</span>
            condition <span class="token operator">=</span> <span class="token string">"headers['flag-header']=='UP'"</span>
    <span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">receive</span><span class="token punctuation">(</span><span class="token class-name">String</span> messageBody<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"通过stream收到了消息，messageBody = {}"</span><span class="token punctuation">,</span> messageBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>现在我们来做个简单的测试，通过生产者投递两个消息，一个消息的flagHeader=UP，另一个消息的flagHeader=DOWN。消费者输出的日志信息如下：</p>
<h1 id="_2、tags" tabindex="-1"><a class="header-anchor" href="#_2、tags" aria-hidden="true">#</a> 2、TAGS</h1>
<p>这种方式仅RocketMQ支持，Kafka、RabbitMQ不支持。该方式也需要为生产者生产的消息设置header，只不过这个header稍微有些特殊而已。我们基于上一小节的代码进行修改，修改后的代码如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zj<span class="token punctuation">.</span>node<span class="token punctuation">.</span>contentcenter<span class="token punctuation">.</span>controller<span class="token punctuation">.</span>content</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">RequiredArgsConstructor</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">RocketMQHeaders</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>stream<span class="token punctuation">.</span>messaging<span class="token punctuation">.</span></span><span class="token class-name">Source</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>messaging<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">MessageBuilder</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">GetMapping</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 生产者
 *
 * <span class="token keyword">@author</span> 01
 * <span class="token keyword">@date</span> 2019-08-03
 **/</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestProducerController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Source</span> source<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/stream-send-msg"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">streamSendMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        source<span class="token punctuation">.</span><span class="token function">output</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>
                <span class="token class-name">MessageBuilder</span><span class="token punctuation">.</span><span class="token function">withPayload</span><span class="token punctuation">(</span><span class="token string">"消息体"</span><span class="token punctuation">)</span>
                        <span class="token comment">// tag只能设置一个，不能设置多个</span>
                        <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token class-name">RocketMQHeaders</span><span class="token punctuation">.</span>TAGS<span class="token punctuation">,</span> <span class="token string">"tag-1"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token string">"send message success!"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>改造消费者</p>
<p>由于stream默认在Sink接口里只提供了一个input channel，为了更直观地看到不同tag的消息进入不同的channel，所以我们需要使用自定义接口，定义多个”input“，代码如下：<br />public interface MySink {</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">MySink</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> T1_INPUT <span class="token operator">=</span> <span class="token string">"t1-input"</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> T2_INPUT <span class="token operator">=</span> <span class="token string">"t2-input"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Input</span><span class="token punctuation">(</span>T1_INPUT<span class="token punctuation">)</span>
    <span class="token class-name">SubscribableChannel</span> <span class="token function">input1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Input</span><span class="token punctuation">(</span>T2_INPUT<span class="token punctuation">)</span>
    <span class="token class-name">SubscribableChannel</span> <span class="token function">input2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>}</p>
<p>修改配置文件如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 192.168.190.129<span class="token punctuation">:</span><span class="token number">9876</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">t1-input</span><span class="token punctuation">:</span>
            <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
              <span class="token comment"># 表示t1-input仅消费带有tag-1的消息</span>
              <span class="token key atrule">tags</span><span class="token punctuation">:</span> tag<span class="token punctuation">-</span><span class="token number">1</span>
          <span class="token key atrule">t2-input</span><span class="token punctuation">:</span>
            <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
              <span class="token comment"># 表示t2-input可以消费带有tag-2或tag-3的消息（||用于分隔不同的tag）</span>
              <span class="token key atrule">tags</span><span class="token punctuation">:</span> tag<span class="token punctuation">-</span>2<span class="token punctuation">|</span><span class="token punctuation">|</span>tag<span class="token punctuation">-</span><span class="token number">3</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">t1-input</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> stream<span class="token punctuation">-</span>test<span class="token punctuation">-</span>topic
          <span class="token key atrule">group</span><span class="token punctuation">:</span> binder<span class="token punctuation">-</span>group1
        <span class="token key atrule">t2-input</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> stream<span class="token punctuation">-</span>test<span class="token punctuation">-</span>topic
          <span class="token key atrule">group</span><span class="token punctuation">:</span> binder<span class="token punctuation">-</span>group2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h1 id="_3、sql92" tabindex="-1"><a class="header-anchor" href="#_3、sql92" aria-hidden="true">#</a> 3、SQL92</h1>
<p>这种方式仅RocketMQ支持，Kafka、RabbitMQ不支持，若使用该方式，则不要使用TAGS。该方式是使用SQL语法过滤消息，具体可参考官方文档：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>http<span class="token punctuation">:</span>//rocketmq.apache.org/rocketmq/filter<span class="token punctuation">-</span>messages<span class="token punctuation">-</span>by<span class="token punctuation">-</span>sql92<span class="token punctuation">-</span>in<span class="token punctuation">-</span>rocketmq/
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>默认情况下，RocketMQ的SQL过滤支持是关闭的，所以我们需要通过添加一些配置项进行开启。首先进入RocketMQ的安装目录，然后编辑conf/broker.conf文件：</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>[root@study-01 ~]# cd /usr/local/rocketmq-4.5.1/
[root@study-01 /usr/local/rocketmq-4.5.1]# vim conf/broker.conf

# 在文件末尾添加如下配置项：
enablePropertyFilter = true

# 注：添加配置后需要重启RocketMQ的Broker才会生效，命令参考：
nohup sh $ROCKETMQ_HOME/bin/mqbroker -n localhost:9876 -c $ROCKETMQ_HOME/conf/broker.conf &amp;

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>改造生产者</p>
<p>同样基于上一小节的代码进行修改，生产者的代码如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>zj<span class="token punctuation">.</span>node<span class="token punctuation">.</span>contentcenter<span class="token punctuation">.</span>controller<span class="token punctuation">.</span>content</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">RequiredArgsConstructor</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>stream<span class="token punctuation">.</span>messaging<span class="token punctuation">.</span></span><span class="token class-name">Source</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>messaging<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">MessageBuilder</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">GetMapping</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 生产者
 *
 * <span class="token keyword">@author</span> 01
 * <span class="token keyword">@date</span> 2019-08-03
 **/</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequiredArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestProducerController</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Source</span> source<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/stream-send-msg"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">streamSendMsg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        source<span class="token punctuation">.</span><span class="token function">output</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>
                <span class="token class-name">MessageBuilder</span><span class="token punctuation">.</span><span class="token function">withPayload</span><span class="token punctuation">(</span><span class="token string">"消息体"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">"amount"</span><span class="token punctuation">,</span> <span class="token string">"100"</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token string">"send message success!"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>改造消费者</p>
<p>由于有上一小节的铺垫，这里需要改动的就不大了，西安修改消费者的配置文件，如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 192.168.190.129<span class="token punctuation">:</span><span class="token number">9876</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">t1-input</span><span class="token punctuation">:</span>
            <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
              <span class="token comment"># 表示t1-input仅消费amount小于等于100的消息</span>
              <span class="token key atrule">sql</span><span class="token punctuation">:</span> <span class="token string">'amount &lt;= 100'</span>
          <span class="token key atrule">t2-input</span><span class="token punctuation">:</span>
            <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
              <span class="token comment"># 表示t2-input仅消费amount大于100的消息</span>
              <span class="token key atrule">sql</span><span class="token punctuation">:</span> <span class="token string">'amount > 100'</span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">t1-input</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> stream<span class="token punctuation">-</span>test<span class="token punctuation">-</span>topic
          <span class="token key atrule">group</span><span class="token punctuation">:</span> binder<span class="token punctuation">-</span>group1
        <span class="token key atrule">t2-input</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> stream<span class="token punctuation">-</span>test<span class="token punctuation">-</span>topic
          <span class="token key atrule">group</span><span class="token punctuation">:</span> binder<span class="token punctuation">-</span>group2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>com.alibaba.cloud.stream.binder.rocketmq.properties.RocketMQConsumerProperties</p>
</template>
