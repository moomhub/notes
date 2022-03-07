<template><h1 id="spring-cloud-链路追踪-sleuth和-zipkin" tabindex="-1"><a class="header-anchor" href="#spring-cloud-链路追踪-sleuth和-zipkin" aria-hidden="true">#</a> Spring Cloud 链路追踪 - Sleuth和 zipkin</h1>
<p>在微服务框架中，一个由客户端发起的请求在后端系统中会经过多个不同的的服务节点调用来协同产生最后的请求结果，每一个前段请求都会形成一条复杂的分布式服务调用链路，链路中的任何一环出现高延时或错误都会引起整个请求最后的失败.<br />而来sleuth就是用于追踪每个请求的整体链路</p>
<p>Spring Cloud Sleuth 为 Spring Cloud 实现了分布式跟踪解决方案。兼容 Zipkin，HTrace 和其他基于日志的追踪系统，例如 ELK（Elasticsearch 、Logstash、 Kibana）。</p>
<p>Spring Cloud Sleuth 提供了以下功能：</p>
<ul>
<li>
<p><code>链路追踪</code>：通过 Sleuth 可以很清楚的看出一个请求都经过了那些服务，可以很方便的理清服务间的调用关系等。</p>
</li>
<li>
<p><code>性能分析</code>：通过 Sleuth 可以很方便的看出每个采样请求的耗时，分析哪些服务调用比较耗时，当服务调用的耗时随着请求量的增大而增大时， 可以对服务的扩容提供一定的提醒。</p>
</li>
<li>
<p><code>数据分析，优化链路</code>：对于频繁调用一个服务，或并行调用等，可以针对业务做一些优化措施。</p>
</li>
<li>
<p><code>可视化错误</code>：对于程序未捕获的异常，可以配合 Zipkin 查看。</p>
</li>
</ul>
<p><a href="https://zipkin.io/" target="_blank" rel="noopener noreferrer">Zipkin<ExternalLinkIcon/></a> 是 Twitter 公司开发贡献的一款开源的分布式实时数据追踪系统（Distributed Tracking System），基于 Google Dapper 的论文设计而来，其主要功能是聚集各个异构系统的实时监控数据。</p>
<p>它可以收集各个服务器上请求链路的跟踪数据，并通过 Rest API 接口来辅助我们查询跟踪数据，实现对分布式系统的实时监控，及时发现系统中出现的延迟升高问题并找出系统性能瓶颈的根源。除了面向开发的 API 接口之外，它还提供了方便的 UI 组件，每个服务向 Zipkin 报告计时数据，Zipkin 会根据调用关系生成依赖关系图，帮助我们直观的搜索跟踪信息和分析请求链路明细。Zipkin 提供了可插拔数据存储方式：In-Memory、MySql、Cassandra 以及 Elasticsearch。</p>
<p>分布式跟踪系统还有其他比较成熟的实现，例如：Naver 的 PinPoint、Apache 的 HTrace、阿里的鹰眼 Tracing、京东的 Hydra、新浪的 Watchman，美团点评的 CAT，Apache 的 SkyWalking 等。</p>
<p>共有四个组件构成了 Zipkin：</p>
<ul>
<li>
<p><code>Collector</code>：收集器组件，处理从外部系统发送过来的跟踪信息，将这些信息转换为 Zipkin 内部处理的 Span 格式，以支持后续的存储、分析、展示等功能。</p>
</li>
<li>
<p><code>Storage</code>：存储组件，处理收集器接收到的跟踪信息，默认将信息存储在内存中，可以修改存储策略使用其他存储组件，支持 MySQL，Elasticsearch 等。</p>
</li>
<li>
<p><code>Web UI</code>：UI 组件，基于 API 组件实现的上层应用，提供 Web 页面，用来展示 Zipkin 中的调用链和系统依赖关系等。</p>
</li>
<li>
<p><code>RESTful API</code>：API 组件，为 Web 界面提供查询存储中数据的接口。</p>
</li>
</ul>
<p>Zipkin 分为两端，一个是 Zipkin 服务端，一个是 Zipkin 客户端，客户端也就是微服务的应用，客户端会配置服务端的 URL 地址，一旦发生服务间的调用的时候，会被配置在微服务里面的 Sleuth 的监听器监听，并生成相应的 Trace 和 Span 信息发送给服务端。发送的方式有两种，一种是消息总线的方式如 RabbitMQ 发送，还有一种是 HTTP 报文的方式发送。</p>
<p>服务端部署</p>
<p>服务端是一个独立的可执行的 jar 包，官方下载地址：<a href="https://search.maven.org/remote_content?g=io.zipkin&amp;a=zipkin-server&amp;v=LATEST&amp;c=exec" target="_blank" rel="noopener noreferrer">https://search.maven.org/remote_content?g=io.zipkin&amp;a=zipkin-server&amp;v=LATEST&amp;c=exec<ExternalLinkIcon/></a>，使用 <code>java -jar zipkin.jar</code> 命令启动，端口默认为 <code>9411</code>。我们下载的 jar 包为：zipkin-server-2.20.1-exec.jar，启动命令如下：</p>
<p><a href="https://search.maven.org/remote_content?g=io.zipkin.java&amp;a=zipkin-server&amp;v=LATEST&amp;c=exec" target="_blank" rel="noopener noreferrer">https://search.maven.org/remote_content?g=io.zipkin.java&amp;a=zipkin-server&amp;v=LATEST&amp;c=exec<ExternalLinkIcon/></a></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>java -jar zipkin-server-2.20.1-exec.jar
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在需要进行链路追踪的项目中（服务网关、商品服务、订单服务）添加 <code>spring-cloud-starter-zipkin</code> 依赖。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;!-- spring cloud zipkin 依赖 -->
&lt;dependency> 
    &lt;groupId>org.springframework.cloud&lt;/groupId>
    &lt;artifactId>spring-cloud-starter-zipkin&lt;/artifactId>
&lt;/dependency>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>在需要进行链路追踪的项目中（服务网关、商品服务、订单服务）配置 Zipkin 服务端地址及数据传输方式。默认即如下配置。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">zipkin</span><span class="token punctuation">:</span>
    <span class="token key atrule">base-url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>9411/ <span class="token comment"># 服务端地址</span>
    <span class="token key atrule">sender</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> web                      <span class="token comment"># 数据传输方式，web 表示以 HTTP 报文的形式向服务端发送数据</span>
  <span class="token key atrule">sleuth</span><span class="token punctuation">:</span>
    <span class="token key atrule">sampler</span><span class="token punctuation">:</span>
      <span class="token key atrule">probability</span><span class="token punctuation">:</span> <span class="token number">1.0</span>               <span class="token comment"># 收集数据百分比，默认 0.1（10%）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>术语说明</p>
<p>span</p>
<p>基本工作单位，一次单独的调用链可以称为一个 Span，Dapper 记录的是 Span 的名称，以及每个 Span 的 ID 和父 ID，以重建在一次追踪过程中不同 Span 之间的关系，图中一个矩形框就是一个 Span，前端从发出请求到收到回复就是一个 Span。</p>
<blockquote>
<p>开始跟踪的初始跨度称为<code>root span</code>。该跨度的 ID 的值等于跟踪 ID。</p>
</blockquote>
<p>Dapper 记录了 span 名称，以及每个 span 的 ID 和父 span ID，以重建在一次追踪过程中不同 span 之间的关系。如果一个 span 没有父 ID 被称为 root span。所有 span 都挂在一个特定的 Trace 上，也共用一个 trace id。</p>
<p>一系列 Span 组成的树状结构，一个 Trace 认为是一次完整的链路，内部包含 n 多个 Span。Trace 和 Span 存在一对多的关系，Span 与 Span 之间存在父子关系。</p>
<p>举个例子：客户端调用服务 A 、服务 B 、服务 C 、服务 F，而每个服务例如 C 就是一个 Span，如果在服务 C 中另起线程调用了 D，那么 D 就是 C 的子 Span，如果在服务 D 中另起线程调用了 E，那么 E 就是 D 的子 Span，这个 C -&gt; D -&gt; E 的链路就是一条 Trace。如果链路追踪系统做好了，链路数据有了，借助前端解析和渲染工具，可以达到下图中的效果：</p>
<p>Annotations</p>
<p>用来及时记录一个事件的存在，一些核心 annotations 用来定义一个请求的开始和结束。</p>
<ul>
<li>
<p>cs - Client Sent：客户端发起一个请求，这个 annotation 描述了这个 span 的开始；</p>
</li>
<li>
<p>sr - Server Received：服务端获得请求并准备开始处理它，如果 sr 减去 cs 时间戳便可得到网络延迟；</p>
</li>
<li>
<p>ss - Server Sent：请求处理完成（当请求返回客户端），如果 ss 减去 sr 时间戳便可得到服务端处理请求需要的时间；</p>
</li>
<li>
<p>cr - Client Received：表示 span 结束，客户端成功接收到服务端的回复，如果 cr 减去 cs 时间戳便可得到客户端从服务端获取回复的所有所需时间。</p>
</li>
</ul>
<p>原理</p>
<p>如果想知道一个接口在哪个环节出现了问题，就必须清楚该接口调用了哪些服务，以及调用的顺序，如果把这些服务串起来，看起来就像链条一样，我们称其为调用链。</p>
<p>想要实现调用链，就要为每次调用做个标识，然后将服务按标识大小排列，可以更清晰地看出调用顺序，我们暂且将该标识命名为 spanid</p>
<p>实际场景中，我们需要知道某次请求调用的情况，所以只有 spanid 还不够，得为每次请求做个唯一标识，这样才能根据标识查出本次请求调用的所有服务，而这个标识我们命名为 traceid。</p>
<p>现在根据 spanid 可以轻易地知道被调用服务的先后顺序，但无法体现调用的层级关系，正如下图所示，多个服务可能是逐级调用的链条，也可能是同时被同一个服务调用。</p>
<p>所以应该每次都记录下是谁调用的，我们用 parentid 作为这个标识的名字。</p>
<p>到现在，已经知道调用顺序和层级关系了，但是接口出现问题后，还是不能找到出问题的环节，如果某个服务有问题，那个被调用执行的服务一定耗时很长，要想计算出耗时，上述的三个标识还不够，还需要加上时间戳，时间戳可以更精细一点，精确到微秒级。</p>
<p>只记录发起调用时的时间戳还算不出耗时，要记录下服务返回时的时间戳，有始有终才能算出时间差，既然返回的也记了，就把上述的三个标识都记一下吧，不然区分不出是谁的时间戳。</p>
<p>虽然能计算出从服务调用到服务返回的总耗时，但是这个时间包含了服务的执行时间和网络延迟，有时候我们需要区分出这两类时间以方便做针对性优化。那如何计算网络延迟呢？我们可以把调用和返回的过程分为以下四个事件。</p>
<ul>
<li>
<p>Client Sent 简称 cs，客户端发起调用请求到服务端。</p>
</li>
<li>
<p>Server Received 简称 sr，指服务端接收到了客户端的调用请求。</p>
</li>
<li>
<p>Server Sent 简称 ss，指服务端完成了处理，准备将信息返给客户端。</p>
</li>
<li>
<p>Client Received 简称 cr，指客户端接收到了服务端的返回信息。</p>
</li>
</ul>
<p>如何使用</p>
<p>pom 依赖</p>
<p>在需要进行链路追踪的项目中（服务网关、商品服务、订单服务）添加 <code>spring-cloud-starter-sleuth</code> 依赖。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;!-- spring cloud sleuth 依赖 -->
&lt;dependency>
    &lt;groupId>org.springframework.cloud&lt;/groupId>
    &lt;artifactId>spring-cloud-starter-sleuth&lt;/artifactId>
&lt;/dependency>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>修改日志</p>
<p>在需要链路追踪的项目中添加 <code>logback.xml</code> 日志文件，内容如下（logback 日志的输出级别需要是 DEBUG 级别）：</p>
<p>注意修改 <code>&lt;property name=&quot;log.path&quot; value=&quot;${catalina.base}/gateway-server/logs&quot;/&gt;</code> 中项目名称。</p>
<p>日志核心配置：</p>
<p>%d{yyyy-MM-dd HH:mm:ss.SSS} [${applicationName},%X{X-B3-TraceId:-},%X{X-B3-SpanId:-}] [%thread] %-5level %logger{50} - %msg%n</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token comment">&lt;!-- 日志级别从低到高分为TRACE &lt; DEBUG &lt; INFO &lt; WARN &lt; ERROR &lt; FATAL，如果设置为WARN，则低于WARN的信息都不会输出 --></span>
<span class="token comment">&lt;!-- scan: 当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true --></span>
<span class="token comment">&lt;!-- scanPeriod: 设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。 --></span>
<span class="token comment">&lt;!-- debug: 当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span> <span class="token attr-name">scan</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">scanPeriod</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10 seconds<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 日志上下文名称 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>contextName</span><span class="token punctuation">></span></span>my_logback<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>contextName</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- name的值是变量的名称，value的值是变量定义的值。通过定义的值会被插入到logger上下文中。定义变量后，可以使“${}”来使用变量。 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>log.path<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${catalina.base}/gateway-server/logs<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 加载 Spring 配置文件信息 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>springProperty</span> <span class="token attr-name">scope</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>context<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>applicationName<span class="token punctuation">"</span></span> <span class="token attr-name">source</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>spring.application.name<span class="token punctuation">"</span></span> <span class="token attr-name">defaultValue</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>localhost<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 日志输出格式 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>LOG_PATTERN<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>%d{yyyy-MM-dd HH:mm:ss.SSS} [${applicationName},%X{X-B3-TraceId:-},%X{X-B3-SpanId:-}] [%thread] %-5level %logger{50} - %msg%n<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!--输出到控制台--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>CONSOLE<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.ConsoleAppender<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--此日志appender是为开发使用，只配置最底级别，控制台输出的日志级别是大于或等于此级别的日志信息--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.classic.filter.ThresholdFilter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>level</span><span class="token punctuation">></span></span>DEBUG<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>level</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">></span></span>${LOG_PATTERN}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- 设置字符集 --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>charset</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>charset</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 输出到文件 --></span>
    <span class="token comment">&lt;!-- 时间滚动输出 level为 DEBUG 日志 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DEBUG_FILE<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.RollingFileAppender<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 正在记录的日志文件的路径及文件名 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>file</span><span class="token punctuation">></span></span>${log.path}/log_debug.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>file</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--日志文件输出格式--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">></span></span>${LOG_PATTERN}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>charset</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>charset</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- 设置字符集 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 日志记录器的滚动策略，按日期，按大小记录 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>rollingPolicy</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.TimeBasedRollingPolicy<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- 日志归档 --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>fileNamePattern</span><span class="token punctuation">></span></span>${log.path}/debug/log-debug-%d{yyyy-MM-dd}.%i.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>fileNamePattern</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>timeBasedFileNamingAndTriggeringPolicy</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maxFileSize</span><span class="token punctuation">></span></span>100MB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maxFileSize</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>timeBasedFileNamingAndTriggeringPolicy</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--日志文件保留天数--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maxHistory</span><span class="token punctuation">></span></span>15<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maxHistory</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>rollingPolicy</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 此日志文件只记录debug级别的 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.classic.filter.LevelFilter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>level</span><span class="token punctuation">></span></span>DEBUG<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>level</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>onMatch</span><span class="token punctuation">></span></span>ACCEPT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>onMatch</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>onMismatch</span><span class="token punctuation">></span></span>DENY<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>onMismatch</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 时间滚动输出 level为 INFO 日志 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INFO_FILE<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.RollingFileAppender<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 正在记录的日志文件的路径及文件名 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>file</span><span class="token punctuation">></span></span>${log.path}/log_info.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>file</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--日志文件输出格式--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">></span></span>${LOG_PATTERN}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>charset</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>charset</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 日志记录器的滚动策略，按日期，按大小记录 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>rollingPolicy</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.TimeBasedRollingPolicy<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- 每天日志归档路径以及格式 --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>fileNamePattern</span><span class="token punctuation">></span></span>${log.path}/info/log-info-%d{yyyy-MM-dd}.%i.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>fileNamePattern</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>timeBasedFileNamingAndTriggeringPolicy</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maxFileSize</span><span class="token punctuation">></span></span>100MB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maxFileSize</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>timeBasedFileNamingAndTriggeringPolicy</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--日志文件保留天数--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maxHistory</span><span class="token punctuation">></span></span>15<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maxHistory</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>rollingPolicy</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 此日志文件只记录info级别的 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.classic.filter.LevelFilter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>level</span><span class="token punctuation">></span></span>INFO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>level</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>onMatch</span><span class="token punctuation">></span></span>ACCEPT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>onMatch</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>onMismatch</span><span class="token punctuation">></span></span>DENY<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>onMismatch</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 时间滚动输出 level为 WARN 日志 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>WARN_FILE<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.RollingFileAppender<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 正在记录的日志文件的路径及文件名 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>file</span><span class="token punctuation">></span></span>${log.path}/log_warn.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>file</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--日志文件输出格式--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">></span></span>${LOG_PATTERN}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>charset</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>charset</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- 此处设置字符集 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 日志记录器的滚动策略，按日期，按大小记录 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>rollingPolicy</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.TimeBasedRollingPolicy<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>fileNamePattern</span><span class="token punctuation">></span></span>${log.path}/warn/log-warn-%d{yyyy-MM-dd}.%i.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>fileNamePattern</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- 每个日志文件最大100MB --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>timeBasedFileNamingAndTriggeringPolicy</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maxFileSize</span><span class="token punctuation">></span></span>100MB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maxFileSize</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>timeBasedFileNamingAndTriggeringPolicy</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--日志文件保留天数--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maxHistory</span><span class="token punctuation">></span></span>15<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maxHistory</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>rollingPolicy</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 此日志文件只记录warn级别的 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.classic.filter.LevelFilter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>level</span><span class="token punctuation">></span></span>WARN<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>level</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>onMatch</span><span class="token punctuation">></span></span>ACCEPT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>onMatch</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>onMismatch</span><span class="token punctuation">></span></span>DENY<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>onMismatch</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 时间滚动输出 level为 ERROR 日志 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ERROR_FILE<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.RollingFileAppender<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 正在记录的日志文件的路径及文件名 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>file</span><span class="token punctuation">></span></span>${log.path}/log_error.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>file</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--日志文件输出格式--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoder</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pattern</span><span class="token punctuation">></span></span>${LOG_PATTERN}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pattern</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>charset</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>charset</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- 此处设置字符集 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoder</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 日志记录器的滚动策略，按日期，按大小记录 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>rollingPolicy</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.TimeBasedRollingPolicy<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>fileNamePattern</span><span class="token punctuation">></span></span>${log.path}/error/log-error-%d{yyyy-MM-dd}.%i.log<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>fileNamePattern</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>timeBasedFileNamingAndTriggeringPolicy</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maxFileSize</span><span class="token punctuation">></span></span>100MB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maxFileSize</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>timeBasedFileNamingAndTriggeringPolicy</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!--日志文件保留天数--></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maxHistory</span><span class="token punctuation">></span></span>15<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maxHistory</span><span class="token punctuation">></span></span>
            <span class="token comment">&lt;!-- 日志量最大 10 GB --></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>totalSizeCap</span><span class="token punctuation">></span></span>10GB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>totalSizeCap</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>rollingPolicy</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 此日志文件只记录ERROR级别的 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ch.qos.logback.classic.filter.LevelFilter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>level</span><span class="token punctuation">></span></span>ERROR<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>level</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>onMatch</span><span class="token punctuation">></span></span>ACCEPT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>onMatch</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>onMismatch</span><span class="token punctuation">></span></span>DENY<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>onMismatch</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appender</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 对于类路径以 com.example.logback 开头的Logger,输出级别设置为warn,并且只输出到控制台 --></span>
    <span class="token comment">&lt;!-- 这个logger没有指定appender，它会继承root节点中定义的那些appender --></span>
    <span class="token comment">&lt;!-- &lt;logger name="com.example.logback" level="warn"/> --></span>

    <span class="token comment">&lt;!--通过 LoggerFactory.getLogger("myLog") 可以获取到这个logger--></span>
    <span class="token comment">&lt;!--由于这个logger自动继承了root的appender，root中已经有stdout的appender了，自己这边又引入了stdout的appender--></span>
    <span class="token comment">&lt;!--如果没有设置 additivity="false" ,就会导致一条日志在控制台输出两次的情况--></span>
    <span class="token comment">&lt;!--additivity表示要不要使用rootLogger配置的appender进行输出--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>logger</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>myLog<span class="token punctuation">"</span></span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INFO<span class="token punctuation">"</span></span> <span class="token attr-name">additivity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>CONSOLE<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>logger</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 日志输出级别及方式 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>root</span> <span class="token attr-name">level</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DEBUG<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>CONSOLE<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>DEBUG_FILE<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>INFO_FILE<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>WARN_FILE<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appender-ref</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ERROR_FILE<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>root</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br></div></div></template>
