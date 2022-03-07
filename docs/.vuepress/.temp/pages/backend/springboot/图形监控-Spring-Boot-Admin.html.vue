<template><h1 id="spring-boot-带图形界面的监控-spring-boot-admin" tabindex="-1"><a class="header-anchor" href="#spring-boot-带图形界面的监控-spring-boot-admin" aria-hidden="true">#</a> Spring Boot 带图形界面的监控-Spring Boot Admin</h1>
<p><code>SpringBootAdmin</code>不是Spring官方提供的模块，它包含了<code>Client</code>和<code>Server</code>两部分。server部分提供了用户管理界面，client即为被监控的服务。client需要注册到server端。</p>
<p>SpringBootAdmin提供了很少的几个监控服务端点，需要依赖SpringBootActuator丰富监控功能。</p>
<h2 id="server端配置" tabindex="-1"><a class="header-anchor" href="#server端配置" aria-hidden="true">#</a> server端配置</h2>
<p>server端的配置很简单，无需任何开发。</p>
<p>第一步：引入依赖</p>
<blockquote>
<p>最新依赖地址：<a href="https://mvnrepository.com/artifact/de.codecentric/spring-boot-admin-starter-server" target="_blank" rel="noopener noreferrer">Maven Repository: de.codecentric » spring-boot-admin-starter-server (mvnrepository.com)<ExternalLinkIcon/></a></p>
</blockquote>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>de.codecentric<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-admin-starter-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.4.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>第二步：在启动类上增加@EnableAdminServer注解，开启对spring-boot-admin的支持。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableAdminServer</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringBootAdminApplication</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SpringBootAdminApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>做好以上配置，然后访问<a href="http://ip:port%EF%BC%9B%E6%95%88%E6%9E%9C%E5%A6%82%E4%B8%8B" target="_blank" rel="noopener noreferrer">http://ip:port；效果如下<ExternalLinkIcon/></a><br /><br />目前还没有客户端注册到服务端，所以看不到任何监控的内容，接下来我们创建一个客户端并且注册到服务端后再来看看效果。</p>
<p><img src="https://cdn.nlark.com/yuque/0/2021/png/395018/1623892146828-42e46f76-47a2-4271-a5c1-d6048c9ab485.png#align=left&amp;display=inline&amp;height=107&amp;margin=[object Object]&amp;name=image.png&amp;originHeight=214&amp;originWidth=1183&amp;size=42546&amp;status=done&amp;style=none&amp;width=591.5" alt="image.png"></p>
<h2 id="client端配置" tabindex="-1"><a class="header-anchor" href="#client端配置" aria-hidden="true">#</a> Client端配置</h2>
<p>第一步：引入依赖</p>
<blockquote>
<p>最新版地址<a href="https://mvnrepository.com/artifact/de.codecentric/spring-boot-admin-starter-client" target="_blank" rel="noopener noreferrer">Maven Repository: de.codecentric » spring-boot-admin-starter-client (mvnrepository.com)<ExternalLinkIcon/></a></p>
</blockquote>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>de.codecentric<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-admin-starter-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.4.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>第二部：将客户端注册到服务器端,</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">boot</span><span class="token punctuation">:</span>
    <span class="token key atrule">admin</span><span class="token punctuation">:</span>
      <span class="token key atrule">client</span><span class="token punctuation">:</span>
        <span class="token comment"># 服务端地址</span>
        <span class="token key atrule">url</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">7019</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>效果如下：</p>
<p>为了监控更多的状态信息，我们在客户端引入<code>spring-boot-actuator</code>依赖。</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>由于actuator默认只开启了health和info两个web端口，如果想要在server端页面看到所有的监控信息，需要开启其他接口的web端口。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>现在的效果如下：</p>
<p><img src="https://cdn.nlark.com/yuque/0/2021/png/395018/1623833694428-12811277-a126-4dcb-8383-ea56a022fcc9.png#align=left&amp;display=inline&amp;height=508&amp;margin=[object Object]&amp;originHeight=508&amp;originWidth=1080&amp;size=0&amp;status=done&amp;style=none&amp;width=1080" alt=""></p>
<p>spring-boot-admin的应用就简单介绍完了。spring-boot-admin配合spring-boot-actuator实现多服务监控，不仅能查看提供服务监控信息的ui，而且可以监控更加全面的内容。</p>
</template>
