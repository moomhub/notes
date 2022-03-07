<template><h1 id="openfeign负载均衡服务调用" tabindex="-1"><a class="header-anchor" href="#openfeign负载均衡服务调用" aria-hidden="true">#</a> OpenFeign负载均衡服务调用</h1>
<h2 id="openfeign的前世今生" tabindex="-1"><a class="header-anchor" href="#openfeign的前世今生" aria-hidden="true">#</a> OpenFeign的前世今生</h2>
<h3 id="feign" tabindex="-1"><a class="header-anchor" href="#feign" aria-hidden="true">#</a> Feign</h3>
<p>Feign是一个声明式WebService客户端。使用Feign能让编写Web Service客户端更加简单。 它的使用方法是定义一个服务接口然后在上面添加注解。Feign也支持可拔插式的编码器和解码器。Spring Cloud对Feign进行了封装，使其支持了Spring MVC标准注解和HttpMessageConverters。Feign可以与Eureka和Ribbon组合使用以支持负载均衡</p>
<p>是一个声明式的web客户端,只需要创建一个接口,添加注解即可完成微服务之间的调用</p>
<h3 id="feign能干什么" tabindex="-1"><a class="header-anchor" href="#feign能干什么" aria-hidden="true">#</a> Feign能干什么</h3>
<p>Feign旨在使编写Java Http客户端变得更容易。就是远程调用其他服务 前面在使用Ribbon+RestTemplate时，利用RestTemplate对http请求的封装处理，形成了一套模版化的调用方法。但是在实际开发中，由于对服务依赖的调用可能不止一处，往往一个接口会被多处调用，所以通常都会针对每个微服务自行封装一些客户端类来包装这些依赖服务的调用。所以，Feign在此基础上做了进一步封装，由他来帮助我们定义和实现依赖服务接口的定义。在Feign的实现下，我们只需创建一个接口并使用注解的方式来配置它(以前是Dao接口上面标注Mapper注解,现在是一个微服务接口上面标注一个Feign注解即可)，即可完成对服务提供方的接口绑定，简化了使用Spring cloud Ribbon时，自动封装服务调用客户端的开发量。</p>
<h3 id="feign集成了ribbon" tabindex="-1"><a class="header-anchor" href="#feign集成了ribbon" aria-hidden="true">#</a> Feign集成了Ribbon</h3>
<p>我们可以利用Ribbon+ResttTemplate维护了Payment的服务列表信息，并且通过轮询实现了客户端的负载均衡。而与Ribbon不同的是，通过feign只需要定义服务绑定接口且以声明式的方法，优雅而简单的实现了服务调用</p>
<h2 id="feign与openfeign区别" tabindex="-1"><a class="header-anchor" href="#feign与openfeign区别" aria-hidden="true">#</a> Feign与OpenFeign区别</h2>
<table>
<thead>
<tr>
<th>Feign</th>
<th>OpenFeign</th>
</tr>
</thead>
<tbody>
<tr>
<td>Feign是Spring Cloud组件中的一个轻量级RESTful的HTTP服务客户端Feign内置了Ribbon，用来做客户端负载均衡，去调用服务注册中心的服务。Feign的使用方式是:使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务</td>
<td>OpenFeign是Spring Cloud在Feign的基础上支持了SpringMVC的注解，如@RequesMapping等等。OpenFeign的@FeignClient可以解析SpringMVC的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。</td>
</tr>
</tbody>
</table>
<p>Feign</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-feign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>OpenFeign</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="使用openfeign" tabindex="-1"><a class="header-anchor" href="#使用openfeign" aria-hidden="true">#</a> 使用OpenFeign</h2>
<blockquote>
<p>使用服务注册中心进行相关的操作 Feign默认使用ribbon实现负载均衡</p>
</blockquote>
<h3 id="添加注解" tabindex="-1"><a class="header-anchor" href="#添加注解" aria-hidden="true">#</a> 添加注解</h3>
<p><a href="/EnableFeignClients" target="_blank" rel="noopener noreferrer">@EnableFeignClients <ExternalLinkIcon/></a></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderFeignMain80</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">OrderFeignMain80</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="定义远程调用服务" tabindex="-1"><a class="header-anchor" href="#定义远程调用服务" aria-hidden="true">#</a> 定义远程调用服务</h3>
<p>@FeignClient设置远程服务名称</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"CLOUD-PAYMENT-SERVICE"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentFeignService</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/payment/get/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">getPaymentById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"/payment/feign/timeout"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentFeignTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="openfeign常用设置" tabindex="-1"><a class="header-anchor" href="#openfeign常用设置" aria-hidden="true">#</a> OpenFeign常用设置</h2>
<h3 id="openfeign超时机制" tabindex="-1"><a class="header-anchor" href="#openfeign超时机制" aria-hidden="true">#</a> OpenFeign超时机制</h3>
<p>OpenFeign默认等待时间是1秒,超过1秒,直接报错,设置超时时间,修改配置文件: 因为openFeign的底层是ribbon进行负载均衡,所以它的超时时间是由ribbon控制</p>
<p>#设置feign客户端超时时间( openFeign默认支持ribbon)</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">ribbon</span><span class="token punctuation">:</span>
  <span class="token comment">#指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间</span>
  <span class="token key atrule">ReadTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
  <span class="token comment">#指的是建立连接后从服务器读取到可用资源所用的时间</span>
  <span class="token key atrule">connectTimeout</span><span class="token punctuation">:</span> 5ood
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="openfeign日志" tabindex="-1"><a class="header-anchor" href="#openfeign日志" aria-hidden="true">#</a> OpenFeign日志</h3>
<p>Feign提供了日志打印功能，我们可以通过配置来调整日志级别，从而了解Feign中 Http请求的细节。说白了就是对Feign接口的调用情况进行监控和输出。 openFeign的日志级别有:</p>
<ul>
<li>
<p>NONE:默认的，不显示任何日志;</p>
</li>
<li>
<p>BASIC:仅记录请求方法、URL、响应状态码及执行时间;</p>
</li>
<li>
<p>HEADERS:除了BASIC中定义的信息之外，还有请求和响应的头信息;</p>
</li>
<li>
<p>FULL:除了HEADERS中定义的信息之外，还有请求和响应的正文及元数据。</p>
</li>
</ul>
<h4 id="实现在配置类中添加openfeign的日志类" tabindex="-1"><a class="header-anchor" href="#实现在配置类中添加openfeign的日志类" aria-hidden="true">#</a> 实现在配置类中添加OpenFeign的日志类</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignConfig</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span> <span class="token function">feignLoggerLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span><span class="token punctuation">.</span>FULL<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="为指定类设置日志级别" tabindex="-1"><a class="header-anchor" href="#为指定类设置日志级别" aria-hidden="true">#</a> 为指定类设置日志级别</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token comment"># feign日志以什么级别监控哪个接口</span>
    <span class="token key atrule">com.xxx.xx.xx.PaymentFeignService</span><span class="token punctuation">:</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>
