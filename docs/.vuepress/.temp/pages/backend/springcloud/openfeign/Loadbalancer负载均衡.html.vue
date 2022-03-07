<template><h1 id="spring-cloud-loadbalancer" tabindex="-1"><a class="header-anchor" href="#spring-cloud-loadbalancer" aria-hidden="true">#</a> Spring Cloud LoadBalancer</h1>
<h2 id="_1-什么是spring-cloud-loadbalancer" tabindex="-1"><a class="header-anchor" href="#_1-什么是spring-cloud-loadbalancer" aria-hidden="true">#</a> 1.什么是Spring Cloud LoadBalancer</h2>
<p>Spring Cloud LoadBalancer是Spring Cloud官方自己提供的客户端负载均衡器,用来替代Ribbon。
Spring官方提供了两种负载均衡的客户端:
RestTemplate
RestTrenplate是Sping提供的用于访问Res瑕破务的客户端，RestTempate提供了多种便捷访问远程t服务的方法，能够大大提高客户揩的编写效率。默认情况下，Restrerplate默认依数北的HTP连接I具，WebClient
WebCient是从srnglVesu 5 05f本开始提供的一个非狂塞的基于瑜应式编的进行tmi请求的客户扰工具。它的响应式牌的基于Recto的,weCNlent中提供了标淮to靖请求方式对寸诚的gpt,post、 put dee等方法，可以用来发起相应的请求。</p>
<h2 id="_2-resttemplate整合loadbalancer" tabindex="-1"><a class="header-anchor" href="#_2-resttemplate整合loadbalancer" aria-hidden="true">#</a> 2.RestTemplate整合LoadBalancer</h2>
<blockquote>
<p>默认的方法；轮询： RoundRobinLoadBalancer</p>
</blockquote>
<p>注入loadbalancer依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-loadbalancer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>spring 注入RestTemplate</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">getRestTemplate</span><span class="token punctuation">(</span><span class="token class-name">RestTemplateBuilder</span> builder<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>由于Spring Cloud 2021版本中禁用相关不推荐的如 Security 和Ribbon</p>
<p>如果是Spring Cloud 2021之前的版本则需要在yaml文件中禁用相关配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
  	<span class="token key atrule">loadbalancer</span><span class="token punctuation">:</span>
  	  <span class="token key atrule">ribbon</span><span class="token punctuation">:</span>
  	  	<span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  		 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>同时排除<code>pom.xml</code> 文件中<code>ribbon</code> 依赖</p>
<h2 id="_3-自定义loadbalance-算法" tabindex="-1"><a class="header-anchor" href="#_3-自定义loadbalance-算法" aria-hidden="true">#</a> 3.自定义Loadbalance 算法</h2>
<h2 id="参考官方链接" tabindex="-1"><a class="header-anchor" href="#参考官方链接" aria-hidden="true">#</a> 参考官方链接</h2>
<p><a href="https://docs.spring.io/spring-cloud-commons/docs/3.1.0-SNAPSHOT/reference/html/#switching-between-the-load-balancing-algorithms" target="_blank" rel="noopener noreferrer">Loadbalance 默认算法说明<ExternalLinkIcon/></a></p>
<p><a href="https://docs.spring.io/spring-cloud-commons/docs/3.1.0-SNAPSHOT/reference/html/#custom-loadbalancer-configuration" target="_blank" rel="noopener noreferrer">Loadbalance 自定义算法<ExternalLinkIcon/></a></p>
</template>
