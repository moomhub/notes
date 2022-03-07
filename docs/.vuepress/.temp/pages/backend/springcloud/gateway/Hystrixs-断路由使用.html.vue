<template><h1 id="hystrixs-断路由-使用" tabindex="-1"><a class="header-anchor" href="#hystrixs-断路由-使用" aria-hidden="true">#</a> Hystrixs（断路由）使用</h1>
<h2 id="为什么需要服务降级" tabindex="-1"><a class="header-anchor" href="#为什么需要服务降级" aria-hidden="true">#</a> 为什么需要服务降级</h2>
<h3 id="服务雪崩" tabindex="-1"><a class="header-anchor" href="#服务雪崩" aria-hidden="true">#</a> 服务雪崩</h3>
<p>多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B和微服务C又调用其它的微服务．这就是所谓的“<strong>扇出</strong> ”。如果扇出的链路上某个微服务的调用响应时间过长或者不可用，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所谓的“雪崩效应”.<br />对于高流量的应用来说，单一的后端依赖可能会导致所有服务器上的所有资源都在几秒钟内饱和。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，备份队列，线程和其他系统资源紧张，导致整个系统发生更多的级联故障。这些都表示需要对故障和延迟进行隔离和管理，以便单个依赖关系的失败，不能取消整个应用程序或系统。<br />所以，<br />通常当你发现一个模块下的某个实例失败后，这时候这个模块依然还会接收流量，然后这个有问题的模块还调用了其他的模块，这样就会发生级联故障，或者叫雪崩。</p>
<h3 id="hystrix" tabindex="-1"><a class="header-anchor" href="#hystrix" aria-hidden="true">#</a> Hystrix</h3>
<p>Hystrix是一个用于处理分布式系统的<strong>延迟和容错</strong> 的开源库，在分布式系统里，许多依赖不可避免的会调用失败，比如超时、异常等，Hystrix能够保证在一个依赖出问题的情况下，<strong>不会导致整体服务失败，避免级联故障，以提高分布式系统的弹性</strong> 。<br />&quot;断路器”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝)，<strong>向调用方返回一个符合预期的、可处理的备选响应(FallBack)，而不是长时间的等待或者抛出调用方无法处理的异常</strong> ，这样就保证了服务调用方的线程不会被长时间、不必要地占用，从而避免了故障在分布式系统中的蔓延，乃至雪崩。</p>
<h2 id="hystrix中的重要概念" tabindex="-1"><a class="header-anchor" href="#hystrix中的重要概念" aria-hidden="true">#</a> hystrix中的重要概念:</h2>
<p>服务降级：比如当某个服务繁忙,不能让客户端的请求一直等待,应该立刻返回给客户端一个备选方案</p>
<p>服务熔断：当某个服务出现问题,卡死了,不能让用户一直等待,需要关闭所有对此服务的访问 然后调用服务降级</p>
<p>服务限流：限流,比如秒杀场景,不能访问用户瞬间都访问服务器,限制一次只可以有多少请求</p>
<h2 id="服务降级" tabindex="-1"><a class="header-anchor" href="#服务降级" aria-hidden="true">#</a> 服务降级</h2>
<h3 id="pom" tabindex="-1"><a class="header-anchor" href="#pom" aria-hidden="true">#</a> pom</h3>
<p>pom文件引入</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token comment">&lt;!--openfeign--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--hystrix--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-hystrix<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="添加注解" tabindex="-1"><a class="header-anchor" href="#添加注解" aria-hidden="true">#</a> 添加注解</h3>
<blockquote>
<p>这两个注解都是激活hystrix的功能，只需要在服务启动类加入@EnableHystrix注解即可，无须增加@EnableCircuitBreaker注解，本身@EnableHystrix注解已经涵盖了EnableCircuitBreaker的功能。</p>
</blockquote>
<p>开启限流：**<a href="/EnableHystrix" target="_blank" rel="noopener noreferrer">@EnableHystrix <ExternalLinkIcon/></a> **（直接使用这个）</p>
<p><a href="/EnableCircuitBreaker" target="_blank" rel="noopener noreferrer">@EnableCircuitBreaker <ExternalLinkIcon/></a> 开启断路器</p>
<h3 id="在feign上使用熔断器" tabindex="-1"><a class="header-anchor" href="#在feign上使用熔断器" aria-hidden="true">#</a> 在Feign上使用熔断器</h3>
<p><code>Feign</code> 是自带 <strong>断路器</strong>  的，不过需要在 <strong>配置文件</strong>  中开启 <code>hystrix</code> 的配置。</p>
<div class="language-YAML ext-YAML line-numbers-mode"><pre v-pre class="language-YAML"><code>Copyfeign:
  hystrix:
    enabled: true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h3>
<p>添加远程调用Service 用于远程调用</p>
<p>通过设置 <code>fallback</code> 属性为实现 <strong>降级回退</strong>  的 <strong>类</strong> ，来启用 <code>@FeignClient</code> 的 <strong>失败降级</strong> 。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"CLOUD-PROVIDER-HYSTRIX-PAYMENT"</span> <span class="token punctuation">,</span>fallback <span class="token operator">=</span> <span class="token class-name">PaymentFallbackService</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentHystrixService</span>
<span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfo_OK</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/payment/hystrix/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfo_TimeOut</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="controller" tabindex="-1"><a class="header-anchor" href="#controller" aria-hidden="true">#</a> Controller</h3>
<p>使用<a href="/HystrixCommand" target="_blank" rel="noopener noreferrer">@HystrixCommand <ExternalLinkIcon/></a> 开启短路由功能</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderHystirxController</span><span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">PaymentHystrixService</span> paymentHystrixService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/hystrix/ok/{id}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@HystrixCommand</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfo_OK</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> paymentHystrixService<span class="token punctuation">.</span><span class="token function">paymentInfo_OK</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="服务降级异常处理" tabindex="-1"><a class="header-anchor" href="#服务降级异常处理" aria-hidden="true">#</a> 服务降级异常处理</h2>
<h3 id="通用接口异常-推荐" tabindex="-1"><a class="header-anchor" href="#通用接口异常-推荐" aria-hidden="true">#</a> 通用接口异常（推荐）</h3>
<p>实现远程调用接口来设置异常处理。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PaymentFallbackService</span> <span class="token keyword">implements</span> <span class="token class-name">PaymentHystrixService</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfo_OK</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"-----PaymentFallbackService fall back-paymentInfo_OK ,o(╥﹏╥)o"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfo_TimeOut</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> id<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"-----PaymentFallbackService fall back-paymentInfo_TimeOut ,o(╥﹏╥)o"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="接口指定异常" tabindex="-1"><a class="header-anchor" href="#接口指定异常" aria-hidden="true">#</a> 接口指定异常</h3>
<p>在调用的controller 中具体的调用远程调用的方法中指定异常类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@DefaultProperties</span><span class="token punctuation">(</span>defaultFallback <span class="token operator">=</span> <span class="token string">"payment_Global_FallbackMethod"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderHystirxController</span><span class="token punctuation">{</span>
    

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/hystrix/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"paymentTimeOutFallbackMethod"</span><span class="token punctuation">,</span>commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">"execution.isolation.thread.timeoutInMilliseconds"</span><span class="token punctuation">,</span>value<span class="token operator">=</span><span class="token string">"1500"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfo_TimeOut</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">10</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> paymentHystrixService<span class="token punctuation">.</span><span class="token function">paymentInfo_TimeOut</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 指定错误</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentTimeOutFallbackMethod</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"我是消费者80,对方支付系统繁忙请10秒钟后再试或者自己运行出错请检查自己,o(╥﹏╥)o"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="全局异常" tabindex="-1"><a class="header-anchor" href="#全局异常" aria-hidden="true">#</a> 全局异常</h3>
<p>统一在远程调用的接口中定义异常处理</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@DefaultProperties</span><span class="token punctuation">(</span>defaultFallback <span class="token operator">=</span> <span class="token string">"payment_Global_FallbackMethod"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderHystirxController</span><span class="token punctuation">{</span>
    
     <span class="token comment">//使用默认的全局异常处理</span>
     <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/hystrix/timeout/{id}"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@HystrixCommand</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentInfo_TimeOut</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">10</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> paymentHystrixService<span class="token punctuation">.</span><span class="token function">paymentInfo_TimeOut</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">payment_Global_FallbackMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Global异常处理信息，请稍后再试，/(ㄒoㄒ)/~~"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="服务熔断" tabindex="-1"><a class="header-anchor" href="#服务熔断" aria-hidden="true">#</a> 服务熔断</h2>
<h3 id="描述" tabindex="-1"><a class="header-anchor" href="#描述" aria-hidden="true">#</a> 描述</h3>
<p>类比保险丝达到最大服务访问后，直接(拒绝访问)拉闸限电，然后调用服务降级的方法并返回友好提示就是保险丝<br />服务的降级-&gt;进而熔断-&gt;恢复调用链路</p>
<p>熔断机制是应对雪崩效应的一种微服务链路保护机制。当扇出链路的某个微服务出错不可用或者响应时间太长时，会进行服务的降级，进而熔断该节点微服务的调用，快速返回错误的响应信息。</p>
<h3 id="服务熔断代码参考" tabindex="-1"><a class="header-anchor" href="#服务熔断代码参考" aria-hidden="true">#</a> 服务熔断代码参考</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//服务熔断</span>
<span class="token annotation punctuation">@HystrixCommand</span><span class="token punctuation">(</span>fallbackMethod <span class="token operator">=</span> <span class="token string">"paymentCircuitBreaker_fallback"</span><span class="token punctuation">,</span>commandProperties <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.enabled"</span><span class="token punctuation">,</span>value <span class="token operator">=</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// 是否开启断路器</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.requestVolumeThreshold"</span><span class="token punctuation">,</span>value <span class="token operator">=</span> <span class="token string">"10"</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// 请求次数</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.sleepWindowInMilliseconds"</span><span class="token punctuation">,</span>value <span class="token operator">=</span> <span class="token string">"10000"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 时间窗口期</span>
        <span class="token annotation punctuation">@HystrixProperty</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"circuitBreaker.errorThresholdPercentage"</span><span class="token punctuation">,</span>value <span class="token operator">=</span> <span class="token string">"60"</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// 失败率达到多少后跳闸 百分值</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentCircuitBreaker</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>id <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"******id 不能负数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">String</span> serialNumber <span class="token operator">=</span> <span class="token class-name">IdUtil</span><span class="token punctuation">.</span><span class="token function">simpleUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"\t"</span><span class="token operator">+</span><span class="token string">"调用成功，流水号: "</span> <span class="token operator">+</span> serialNumber<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentCircuitBreaker_fallback</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Integer</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"id 不能负数，请稍后再试，/(ㄒoㄒ)/~~   id: "</span> <span class="token operator">+</span>id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="断路由" tabindex="-1"><a class="header-anchor" href="#断路由" aria-hidden="true">#</a> 断路由</h3>
<p><strong>当检测到该节点微服务调用响应正常后，恢复调用链路。</strong> <br />在Spring Cloud框架里，熔断机制通过Hystrix实现。Hystrix会监控微服务间调用的状况，<br />当失败的调用到一定阈值，缺省是5秒内20次调用失败，就会启动熔断机制。熔断机制的注解是**@HystrixCommand。**</p>
<h3 id="熔断工作原理" tabindex="-1"><a class="header-anchor" href="#熔断工作原理" aria-hidden="true">#</a> 熔断工作原理</h3>
<p><strong>工作流程</strong></p>
<ol>
<li>
<p>请求进来,首先查询缓存,如果缓存有,直接返回如果缓存没有,---&gt;2</p>
</li>
<li>
<p>查看断路器是否开启,如果开启的,Hystrix直接将请求转发到降级返回,然后返回</p>
</li>
<li>
<p>如果断路器是关闭的,判断线程池等资源是否已经满了,</p>
</li>
<li>
<p>如果已经满了也会走降级方法</p>
</li>
<li>
<p>如果资源没有满,判断我们使用的什么类型的Hystrix,决定调用构造方法还是run方法</p>
</li>
<li>
<p>然后处理请求</p>
</li>
<li>
<p>然后Hystrix将本次请求的结果信息汇报给断路器,因为断路器此时可能是开启的(因为断路器开启也是可以接收请求的)</p>
</li>
<li>
<p>断路器收到信息,判断是否符合开启或关闭断路器的条件,</p>
</li>
<li>
<p>如果本次请求处理失败,又会进入降级方法</p>
</li>
<li>
<p>如果处理成功,判断处理是否超时,如果超时了,也进入降级方法</p>
</li>
<li>
<p>最后,没有超时,则本次请求处理成功,将结果返回给controller</p>
</li>
</ol>
<p><strong>断路器的打开和关闭</strong></p>
<ol>
<li>
<p>并发此时是否达到我们指定的阈值</p>
</li>
<li>
<p>错误百分比,比如我们配置了60%,那么如果并发请求中,10次有6次是失败的,就开启断路器</p>
</li>
<li>
<p>上面的条件符合,断路器改变状态为open(开启)</p>
</li>
<li>
<p>这个服务的断路器开启,所有请求无法访问</p>
</li>
<li>
<p>在我们的时间窗口期,期间,尝试让一些请求通过(半开状态),如果请求还是失败,证明断路器还是开启状态,服务没有恢复</p>
</li>
<li>
<p>如果请求成功了,证明服务已经恢复,断路器状态变为close关闭状态</p>
</li>
</ol>
<p><strong>如果服务熔断了</strong></p>
<p>再有请求调用的时候，将不会调用主逻辑，而是直接调用降级fallback.<br />通过断路器，实现了自动地发现错误并将降级逻辑切换为主逻辑，减少响<br />应延迟的效果。<br /><strong>原来的主逻辑要如何恢复呢</strong> ?<br />对于这一问题，hystrix也为我们实现了自动恢复功能。<br />当断路器打开，对主逻辑进行熔断之后，hystrix会启动一个休眠时间窗，在这个时间窗内，降级逻辑是临时的成为主逻辑，<br />当休眠时间窗到期，断路器将进入半开状态，释放一次请求到原来的主逻辑上，如果此次请求正常返回，那么断路器将继续闭合,断路器关闭主逻辑恢复，如果这次请求依然有问题，断路器继续进入打开状态，休眠时间窗重新计时。</p>
<h2 id="hystrixcommand配置项说明" tabindex="-1"><a class="header-anchor" href="#hystrixcommand配置项说明" aria-hidden="true">#</a> HystrixCommand配置项说明</h2>
<h3 id="默认配置" tabindex="-1"><a class="header-anchor" href="#默认配置" aria-hidden="true">#</a> 默认配置</h3>
<ul>
<li>
<p>groupKey：命令分组键，可以根据这个分组，统计他的各个指标，默认类名。</p>
</li>
<li>
<p>commandKey：命令键，默认方法名。</p>
</li>
<li>
<p>threadPoolKey：线程池名，如果没有设置，默认为groupKey。</p>
</li>
<li>
<p>fallbackMethod：服务降级调用的方法。</p>
</li>
<li>
<p>commandProperties: 服务调用和熔断配置</p>
</li>
<li>
<p>threadPoolProperties：配置线程池用的。</p>
</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> @HystrixCommand(fallbackMethod = "paymentCircuitBreaker_fallback",
         groupKey = "strGroupCommand",
         commandKey = "strCommand",
        threadPoolKey = "strThreadPoo1",
         commandProperties = {...},
         threadPoolProperties = {...},
         )
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="commandproperties-属性" tabindex="-1"><a class="header-anchor" href="#commandproperties-属性" aria-hidden="true">#</a> commandProperties 属性</h3>
<h4 id="execution-服务降级" tabindex="-1"><a class="header-anchor" href="#execution-服务降级" aria-hidden="true">#</a> Execution（服务降级）</h4>
<p>Execution：<strong>线程隔离</strong></p>
<table>
<thead>
<tr>
<th>参数</th>
<th>用处</th>
</tr>
</thead>
<tbody>
<tr>
<td>execution.isolation.strategy</td>
<td>该属性用来设置HystrixCommand.run()执行的**** <strong>隔离策略</strong> 。默认为THREAD。</td>
</tr>
<tr>
<td>execution.isolation.thread.timeoutInMilliseconds</td>
<td>该属性用来配置HystrixCommand执行的**** <strong>超时时间</strong> ，单位为毫秒。</td>
</tr>
<tr>
<td>execution.timeout.enabled</td>
<td>该属性用来配置HystrixCommand.run()的**** <strong>执行是否启用超时时间</strong> 。默认为true。</td>
</tr>
<tr>
<td>execution.isolation.thread.interruptOnTimeout</td>
<td>该属性用来配置当HystrixCommand.run()执行超时的时候是否要它中断。</td>
</tr>
<tr>
<td>execution.isolation.thread.interruptOnCancel</td>
<td>该属性用来配置当HystrixCommand.run()执行取消时是否要它中断。</td>
</tr>
<tr>
<td>execution.isolation.semaphore.maxConcurrentRequests</td>
<td>当HystrixCommand命令的隔离策略使用信号量时，该属性用来配置信号量的大小。**** <strong>当最大并发请求达到该设置值时，后续的请求将被拒绝</strong></td>
</tr>
<tr>
<td>fallback.isolation.semaphore.maxConcurrentRequests</td>
<td>该属性用来设置从调用线程中允许HystrixCommand.getFallback()方法执行的最大并发请求数。当达到最大并发请求时，后续的请求将会被拒绝并抛出异常。</td>
</tr>
<tr>
<td>fallback.enabled</td>
<td>该属性用来设置服务降级策略是否启用，**** <strong>默认是true</strong> 。如果设置为false，当请求失败或者拒绝发生时，将不会调用HystrixCommand.getFallback()来执行服务降级逻辑。</td>
</tr>
</tbody>
</table>
<h4 id="circuitbreaker-熔断器" tabindex="-1"><a class="header-anchor" href="#circuitbreaker-熔断器" aria-hidden="true">#</a> circuitBreaker （熔断器）</h4>
<p>fallback: 断路器</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>用处</th>
</tr>
</thead>
<tbody>
<tr>
<td>circuitBreaker.enabled</td>
<td>是否启动断路器</td>
</tr>
<tr>
<td>circuitBreaker.requestVolumeThreshold</td>
<td>用来设置在滚动时间窗中，断路器熔断的最小请求数。例如，默认该值为20的时候，如果滚动时间窗（默认10秒）内仅收到19个请求，即使这19个请求都失败了，断路器也不会打开。</td>
</tr>
<tr>
<td>**** <strong>circuitBreaker.sleepWindowInMilliseconds</strong></td>
<td>用来设置当断路器打开之后的休眠时间窗。休眠时间窗结束之后，会将断路器设置为“半开”状态，尝试熔断的请求命令，如果依然时候就将断路器继续设置为“打开”状态，如果成功，就设置为“关闭”状态。</td>
</tr>
<tr>
<td>**** <strong>circuitBreaker.errorThresholdPercentage</strong></td>
<td>该属性用来设置断路器打开的错误百分比条件。默认值为50，表示在滚动时间窗中，在请求值超过requestVolumeThreshold阈值的前提下，如果错误请求数百分比超过50，就把断路器设置为“打开”状态，否则就设置为“关闭”状态 （百分值）</td>
</tr>
<tr>
<td>circuitBreaker.forceOpen</td>
<td>断路器强制进入“打开”状态</td>
</tr>
<tr>
<td>circuitBreaker.forceClosed</td>
<td>断路器强制进入“关闭”状态</td>
</tr>
</tbody>
</table>
<h4 id="统计器-metrics" tabindex="-1"><a class="header-anchor" href="#统计器-metrics" aria-hidden="true">#</a> 统计器(Metrics)</h4>
<table>
<thead>
<tr>
<th>名称</th>
<th>用法</th>
</tr>
</thead>
<tbody>
<tr>
<td>metrics.rollingStats.timeInMilliseconds</td>
<td>该属性用来设置滚动时间窗的长度，单位为毫秒。该时间用于断路器判断健康度时需要收集信息的持续时间。断路器在收集指标信息时会根据设置的时间窗长度拆分成多个桶来累计各度量值，每个桶记录了一段时间的采集指标。例如，当为默认值10000毫秒时，断路器默认将其分成10个桶，每个桶记录1000毫秒内的指标信息。</td>
</tr>
<tr>
<td>metrics.rollingStats.numBuckets</td>
<td>用来设置滚动时间窗统计指标信息时划分“桶”的数量。默认值为10。</td>
</tr>
<tr>
<td>metrics.rollingPercentile.enabled</td>
<td>用来设置对命令执行延迟是否使用百分位数来跟踪和计算。默认为true，如果设置为false，那么所有的概要统计都将返回-1。</td>
</tr>
<tr>
<td>metrics.rollingPercentile.timeInMilliseconds</td>
<td>用来设置百分位统计的滚动窗口的持续时间，单位为毫秒。</td>
</tr>
<tr>
<td>metrics.rollingPercentile.numBuckets</td>
<td>用来设置百分位统计滚动窗口中使用桶的数量。</td>
</tr>
<tr>
<td>metrics.rollingPercentile.bucketSize</td>
<td>用来设置每个“桶”中保留的最大执行数。</td>
</tr>
<tr>
<td>metrics.healthSnapshot.intervalInMilliseconds</td>
<td>用来设置采集影响断路器状态的健康快照的间隔等待时间。</td>
</tr>
</tbody>
</table>
<h4 id="requestcache" tabindex="-1"><a class="header-anchor" href="#requestcache" aria-hidden="true">#</a> requestCache</h4>
<p>requestCache : 请求缓存</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>用法</th>
</tr>
</thead>
<tbody>
<tr>
<td>requestCache.enabled</td>
<td>用来配置是否开启请求缓存。</td>
</tr>
<tr>
<td>requestLog.enabled</td>
<td>用来设置HystrixCommand的执行和事件是否打印到日志的HystrixRequestLog中</td>
</tr>
</tbody>
</table>
<h3 id="threadpoolproperties属性" tabindex="-1"><a class="header-anchor" href="#threadpoolproperties属性" aria-hidden="true">#</a> threadPoolProperties属性</h3>
<p>线程池的配置</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>用法</th>
</tr>
</thead>
<tbody>
<tr>
<td>coreSize</td>
<td>该参数用来没置执行命令线程池的核心线程数，该值也就是命令执行的最大并发量</td>
</tr>
<tr>
<td>maxQueuesize</td>
<td>该参数用来没置线程池的最大队列大小。当设置为-1时，线程池将使用SynchronousQueue 实现的队列，否则将使用LinkedBLockingQueue实现的队列。</td>
</tr>
<tr>
<td>queueSizeRejectionThreshold</td>
<td>该参数用来为队列没置拒绝阈值。通过该参数，即使队列没有达到最大值也能拒绝请求。</td>
</tr>
<tr>
<td>该参数主要是对LinkedBLockingQueue队列的补充,因为LinkedBLockingQueue</td>
<td></td>
</tr>
<tr>
<td>队列不能动态修改它的对象大小，而通过该属性就可以调整拒绝请求的队列大小了。</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="标签备注" tabindex="-1"><a class="header-anchor" href="#标签备注" aria-hidden="true">#</a> 标签备注</h2>
<p>HystrixCommand注解有多个配置的参数，比如：</p>
<p>groupKey：命令分组键，可以根据这个分组，统计他的各个指标，默认类名。<br />commandKey：命令键，默认方法名。<br />threadPoolKey：线程池名，如果没有设置，默认为groupKey。<br />fallbackMethod：服务降级调用的方法。<br />threadPoolProperties：配置线程池用的。</p>
<p>使用注解 <code>@HystrixCommand</code> 标记调用失败时需要熔断的方法，<code>fallbackMethod</code> 属性指定 <strong>降级方法</strong>  的 <strong>方法名</strong>  为 <code>fallback</code>。</p>
</template>
