<template><h1 id="ribbon负载均衡服务调用" tabindex="-1"><a class="header-anchor" href="#ribbon负载均衡服务调用" aria-hidden="true">#</a> Ribbon负载均衡服务调用</h1>
<h2 id="ribbon简介" tabindex="-1"><a class="header-anchor" href="#ribbon简介" aria-hidden="true">#</a> Ribbon简介</h2>
<p>Spring Cloud Ribbon 是基于Netflix Ribbon 实现的一套客户端负载均衡的工具。<br />Spring-Cloud-Ribbon 作为微服务框架的负载均衡组件，默认使用RestTemplate接口调用外部服务接口。<br />简单的说，Ribbon 是 Netflix 发布的开源项目，主要功能是提供客户端的软件负载均衡算法，将 Netflix 的中间层服务连接在一起。Ribbon 的客户端组件提供一系列完整的配置项，如：连接超时、重试等。简单的说，就是在配置文件中列出 LoadBalancer (简称LB：负载均衡) 后面所有的及其，Ribbon 会自动的帮助你基于某种规则 (如简单轮询，随机连接等等) 去连接这些机器。我们也容易使用 Ribbon 实现自定义的负载均衡算法</p>
<h2 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h2>
<p>LB，即负载均衡 (LoadBalancer) ，在微服务或分布式集群中经常用的一种应用。</p>
<p>负载均衡简单的说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA (高用)。</p>
<p>常见的负载均衡软件有 Nginx、Lvs 等等。</p>
<p>Dubbo、SpringCloud 中均给我们提供了负载均衡，SpringCloud 的负载均衡算法可以自定义。</p>
<h3 id="负载均衡简单分类" tabindex="-1"><a class="header-anchor" href="#负载均衡简单分类" aria-hidden="true">#</a> 负载均衡简单分类：</h3>
<ul>
<li>集中式LB</li>
</ul>
<p>    - 即在服务的提供方和消费方之间使用独立的LB设施，如Nginx(反向代理服务器)**，客户端所有的请求都会交给 **Nginx,然后由 Nginx实现请求的转发，即负载均衡是由服务器实现的(Nginx)</p>
<ul>
<li>进程式 LB</li>
</ul>
<p>    - 将LB逻辑集成到服务消费者，服务消费者从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选出一个合适的服务器进行调用。</p>
<p>    - Ribbon 就属于进程内LB，它只是一个类库，集成于服务消费者进程，服务消费者通过它来获取到服务提供者的地址！</p>
<p>在调用服务提供者暴露的接口的时候，Ribbon会在注册中心上获取到服务提供者的信息列表(比如：IP地址和端口号等等)，之后再缓存到JVM本地。然后再从这些地址中选出一个合适的服务器进行调用。从而在本地实现HTTP远程调用，默认是30秒刷新一次。</p>
<h2 id="使用ribbon" tabindex="-1"><a class="header-anchor" href="#使用ribbon" aria-hidden="true">#</a> 使用Ribbon</h2>
<p>Ribbon其实就是一个软负载均衡的客户端组件。它可以和其他发起请求的客户端结合使用，和Eureka结合只是其中的一个实例。</p>
<h3 id="ribbon原理图" tabindex="-1"><a class="header-anchor" href="#ribbon原理图" aria-hidden="true">#</a> Ribbon原理图</h3>
<p><img src="https://cdn.nlark.com/yuque/0/2021/png/395018/1624517391827-391f0403-7470-481a-95b3-2baf9083e2c9.png#align=left&amp;display=inline&amp;height=269&amp;margin=[object Object]&amp;name=image.png&amp;originHeight=538&amp;originWidth=1025&amp;size=185251&amp;status=done&amp;style=none&amp;width=512.5" alt="image.png"></p>
<h3 id="ribbon在工作的时候分成两步" tabindex="-1"><a class="header-anchor" href="#ribbon在工作的时候分成两步" aria-hidden="true">#</a> Ribbon在工作的时候分成两步</h3>
<ol>
<li>
<p>第一步先选择Eureka Server(注册中心集群)，它优先选择在同一个区域内负载较少的Server（注册中心）</p>
</li>
<li>
<p>第二步再根据指定的负载均衡策略，在从注册中心取到的服务提供者列表中选择一个地址进行调用。</p>
</li>
</ol>
<p>其中Ribbon提供了多种负载均衡策略：比如轮询、随机和根据响应时间加权</p>
<h3 id="引入依赖" tabindex="-1"><a class="header-anchor" href="#引入依赖" aria-hidden="true">#</a> 引入依赖</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--Ribbon的依赖--></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-netflix-ribbon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="注入resttemplate" tabindex="-1"><a class="header-anchor" href="#注入resttemplate" aria-hidden="true">#</a> 注入RestTemplate</h3>
<blockquote>
<p>官方文档：<a href="https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html" target="_blank" rel="noopener noreferrer">https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html<ExternalLinkIcon/></a><br />@LoadBalanced注解给RestTemplate开启负载均衡的能力。</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span><span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">getRestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="控制层编写" tabindex="-1"><a class="header-anchor" href="#控制层编写" aria-hidden="true">#</a> 控制层编写</h3>
<p>使用RestTemplate进行远程调用</p>
<p><strong>getForObject: 直接进行远程调用</strong></p>
<p><strong>getForEntity：远程调用后返回的相关的参数</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> PAYMENT_URL <span class="token operator">=</span> <span class="token string">"http://consul-provider-payment"</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>
  
  <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/get/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">getPayment</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span>PAYMENT_URL<span class="token operator">+</span><span class="token string">"/payment/get/"</span><span class="token operator">+</span>id<span class="token punctuation">,</span><span class="token class-name">CommonResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/consumer/payment/getForEntity/{id}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">></span></span> <span class="token function">getPayment2</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CommonResult</span><span class="token punctuation">></span></span> entity <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span>PAYMENT_URL<span class="token operator">+</span><span class="token string">"/payment/get/"</span><span class="token operator">+</span>id<span class="token punctuation">,</span><span class="token class-name">CommonResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>entity<span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is2xxSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> entity<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">444</span><span class="token punctuation">,</span><span class="token string">"操作失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="ribbon常用负载均衡算法" tabindex="-1"><a class="header-anchor" href="#ribbon常用负载均衡算法" aria-hidden="true">#</a> Ribbon常用负载均衡算法:</h2>
<p><strong>IRule接口,Riboon使用该接口,根据特定算法从所有服务中,选择一个服务,</strong></p>
<p><strong>Rule接口有7个实现类,每个实现类代表一个负载均衡算法</strong></p>
<table>
<thead>
<tr>
<th>类</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>com.netflix.loadbalancer.RoundRobinRule</td>
<td>轮询</td>
</tr>
<tr>
<td>com.netflix.loadbalancer.RandomRule</td>
<td>随机</td>
</tr>
<tr>
<td>com.netflix.loadbalancer.RetryRule</td>
<td>先按照RoundRobinRule的策略获取服务，如果获取服务失败则在指定时间内会进行重试，获取可用的服务</td>
</tr>
<tr>
<td>WeightedResponseTimeRule</td>
<td>对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择</td>
</tr>
<tr>
<td>BestAvailableRule</td>
<td>会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务</td>
</tr>
<tr>
<td>AvailabilityFilteringRule</td>
<td>先过滤掉故障实例，再选择并发较小的实例</td>
</tr>
<tr>
<td>ZoneAvoidanceRule</td>
<td>默认规则,复合判断server所在区域的性能和server的可用性选择服务器</td>
</tr>
</tbody>
</table>
<h2 id="替换调默认的轮询算法" tabindex="-1"><a class="header-anchor" href="#替换调默认的轮询算法" aria-hidden="true">#</a> 替换调默认的轮询算法</h2>
<blockquote>
<p>官方文档明确给出了警告:<br />这个自定义配置类不能放在@ComponentScan所扫描的当前包下以及子包下，<br />否则我们自定义的这个配置类就会被所有的Ribbon客户端所共享，达不到特殊化定制的目的了。</p>
</blockquote>
<p>Ribbon的自定义配置类不能放在  主的包springcloud包下，要在其他包包下再新建一个myrule包。</p>
<p>例如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>主包为 com.springcould.xxx.Application00
替换包为 xx  区别与其他包
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="修改默认算法" tabindex="-1"><a class="header-anchor" href="#修改默认算法" aria-hidden="true">#</a> 修改默认算法</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>@Configuration
public class MyselfRule {
  @Bean
  public IRule myRule(){
      return new RandomRule();
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在主启动类上添加</p>
<blockquote>
<p>name为指定的服务名（服务名必须与注册中心显示的服务名大小写一致）<br />configuration为指定服务使用自定义配置（自定义负载均衡机制）</p>
</blockquote>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RibbonClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"CLOUD-PAYMENT-SERVICE"</span><span class="token punctuation">,</span> configuration <span class="token operator">=</span> <span class="token class-name">MySelfRule</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
