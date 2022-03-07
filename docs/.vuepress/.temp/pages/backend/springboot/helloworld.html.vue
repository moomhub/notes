<template><h1 id="spring-boot-入门" tabindex="-1"><a class="header-anchor" href="#spring-boot-入门" aria-hidden="true">#</a> Spring Boot 入门</h1>
<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p><a href="http://t.cn/AirXJZuO" target="_blank" rel="noopener noreferrer">百度百科<ExternalLinkIcon/></a></p>
<p><strong>优点</strong></p>
<blockquote>
<ul>
<li>快速创建独立运行的Spring项目以及与主流框架集成</li>
<li>使用嵌入式的Servlet容器，应用无需打成WAR包</li>
<li>starters自动依赖与版本控制</li>
<li>大量的自动配置，简化开发，也可修改默认值</li>
<li>无需配置XML，无代码生成，开箱即用</li>
<li>准生产环境的运行时应用监控</li>
<li>与云计算的天然集成</li>
</ul>
</blockquote>
<h2 id="微服务" tabindex="-1"><a class="header-anchor" href="#微服务" aria-hidden="true">#</a> 微服务</h2>
<blockquote>
<p>2014，martin fowler</p>
<p>微服务：架构风格（服务微化）</p>
<p>一个应用应该是一组小型服务；可以通过HTTP的方式进行互通；</p>
<p>单体应用：ALL IN ONE</p>
<p>微服务：每一个功能元素最终都是一个可独立替换和独立升级的软件单元；</p>
<p><a href="https://martinfowler.com/articles/microservices.html#MicroservicesAndSoa" target="_blank" rel="noopener noreferrer">详细参照微服务文档<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/qq_37788067/article/details/79250623" target="_blank" rel="noopener noreferrer">集群、分布式、微服务概念和区别<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="环境约束" tabindex="-1"><a class="header-anchor" href="#环境约束" aria-hidden="true">#</a> 环境约束</h2>
<p>–jdk1.8：Spring Boot 推荐jdk1.7及以上；</p>
<p>–maven3.x：maven 3.3以上版本；</p>
<h2 id="maven设置" tabindex="-1"><a class="header-anchor" href="#maven设置" aria-hidden="true">#</a> Maven设置</h2>
<p>给maven 的settings.xml配置文件的profiles标签添加：（设置使用的jdk版本）</p>
<p>开发工具中的maven设置为自己配置的maven</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>profile</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">></span></span>jdk-1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activation</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activeByDefault</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activeByDefault</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>jdk</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>jdk</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activation</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.source</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.source</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.target</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.target</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>maven.compiler.compilerVersion</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>maven.compiler.compilerVersion</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>profile</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="创建一个maven工程" tabindex="-1"><a class="header-anchor" href="#创建一个maven工程" aria-hidden="true">#</a> 创建一个maven工程</h2>
<ol>
<li>
<p>导入spring boot相关的依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.1.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>relativePath</span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></li>
<li>
<p>编写一个主程序；启动Spring Boot应用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>clboy<span class="token punctuation">.</span>springboot</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Author cloudlandboy
 * @Date 2019/11/13 下午2:58
 * @Since 1.0.0
 * springBootApplication：标注一个主程序类，表示这个是一个Springboot应用
 */</span>

<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldMainApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//启动</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">HelloWorldMainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></li>
<li>
<p>编写一个Controller</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>clboy<span class="token punctuation">.</span>springboot<span class="token punctuation">.</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @Author cloudlandboy
 * @Date 2019/11/13 下午3:05
 * @Since 1.0.0
 * RestController：是spring4里的新注解，是@ResponseBody和@Controller的缩写。
 */</span>

<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/hello"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"hello SpringBoot,this is my first Application"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></li>
<li>
<p>运行主程序Main方法测试</p>
</li>
<li>
<p>访问 <a href="http://localhost:8080/hello" target="_blank" rel="noopener noreferrer">localhost:8080/hello<ExternalLinkIcon/></a></p>
</li>
</ol>
<h2 id="简化部署" tabindex="-1"><a class="header-anchor" href="#简化部署" aria-hidden="true">#</a> 简化部署</h2>
<ol>
<li>
<p>添加maven插件</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code> <span class="token comment">&lt;!-- 这个插件，可以将应用打包成一个可执行的jar包；--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li>
<li>
<p>使用mvn package进行打包</p>
</li>
<li>
<p>进入打包好的jar包所在目录</p>
</li>
<li>
<p>使用 <code>java -jar jar包名称</code> 运行</p>
</li>
</ol>
<h2 id="hello-world探究" tabindex="-1"><a class="header-anchor" href="#hello-world探究" aria-hidden="true">#</a> Hello World探究</h2>
<h3 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>	&lt;!--Hello World项目的父工程是org.springframework.boot-->
    &lt;parent>
        &lt;groupId>org.springframework.boot&lt;/groupId>
        &lt;artifactId>spring-boot-starter-parent&lt;/artifactId>
        &lt;version>2.2.1.RELEASE&lt;/version>
        &lt;relativePath/>
    &lt;/parent>

    &lt;!--
        org.springframework.boot他的父项目是spring-boot-dependencies
        他来真正管理Spring Boot应用里面的所有依赖版本；
        Spring Boot的版本仲裁中心；
        以后我们导入依赖默认是不需要写版本；（没有在dependencies里面管理的依赖自然需要声明版本号）
    -->
  &lt;parent>
    &lt;groupId>org.springframework.boot&lt;/groupId>
    &lt;artifactId>spring-boot-dependencies&lt;/artifactId>
    &lt;version>2.2.1.RELEASE&lt;/version>
    &lt;relativePath>../../spring-boot-dependencies&lt;/relativePath>
  &lt;/parent>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="启动器" tabindex="-1"><a class="header-anchor" href="#启动器" aria-hidden="true">#</a> 启动器</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>spring-boot-starter</strong>-<code>web</code>：</p>
<p>​	spring-boot-starter：spring-boot场景启动器；帮我们导入了web模块正常运行所依赖的组件；</p>
<p>Spring Boot将所有的功能场景都抽取出来，做成一个个的starters（启动器），只需要在项目里面引入这些starter相关场景的所有依赖都会导入进来。要用什么功能就导入什么场景的启动器</p>
<h3 id="主程序类-主入口类" tabindex="-1"><a class="header-anchor" href="#主程序类-主入口类" aria-hidden="true">#</a> 主程序类，主入口类</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorldMainApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//启动</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">HelloWorldMainApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><code>@SpringBootApplication</code>:    Spring Boot应用标注在某个类上说明这个类是SpringBoot的主配置类，SpringBoot就应该运行这个类的main方法来启动SpringBoot应用；</p>
<p>看一下<code>@SpringBootApplication</code>这个注解类的源码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>TYPE<span class="token punctuation">}</span><span class="token punctuation">)</span>	<span class="token comment">//可以给一个类型进行注解，比如类、接口、枚举</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>	<span class="token comment">//可以保留到程序运行的时候，它会被加载进入到 JVM 中</span>
<span class="token annotation punctuation">@Documented</span>	<span class="token comment">//将注解中的元素包含到 Javadoc 中去。</span>
<span class="token annotation punctuation">@Inherited</span>	<span class="token comment">//继承，比如A类上有该注解，B类继承A类，B类就也拥有该注解</span>

<span class="token annotation punctuation">@SpringBootConfiguration</span>

<span class="token annotation punctuation">@EnableAutoConfiguration</span>

<span class="token comment">/*
*创建一个配置类，在配置类上添加 @ComponentScan 注解。
*该注解默认会扫描该类所在的包下所有的配置类，相当于之前的 &lt;context:component-scan>。
*/</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span>
    excludeFilters <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>
    type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span>CUSTOM<span class="token punctuation">,</span>
    classes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">TypeExcludeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token annotation punctuation">@Filter</span><span class="token punctuation">(</span>
    type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span>CUSTOM<span class="token punctuation">,</span>
    classes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">AutoConfigurationExcludeFilter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SpringBootApplication</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><ul>
<li>
<p><code>@SpringBootConfiguration</code>：Spring Boot的配置类；标注在某个类上，表示这是一个Spring Boot的配置类；</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>TYPE<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SpringBootConfiguration</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>
<p><code>@Configuration</code>：配置类上来标注这个注解；</p>
<p>配置类 -----  配置文件；配置类也是容器中的一个组件；@Component</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>TYPE<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Configuration</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
</ul>
</li>
<li>
<p><code>@EnableAutoConfiguration</code>：开启自动配置功能；</p>
<p>以前我们需要配置的东西，Spring Boot帮我们自动配置；@<strong>EnableAutoConfiguration</strong>告诉SpringBoot开启自动配置功能；这样自动配置才能生效；</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul>
<li>
<p><code>@AutoConfigurationPackage</code>：自动配置包</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span>TYPE<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span>RUNTIME<span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">Registrar</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">AutoConfigurationPackage</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li>
<p><code>@Import</code>：Spring的底层注解@Import，给容器中导入一个组件</p>
<p>导入的组件由<code>org.springframework.boot.autoconfigure.AutoConfigurationPackages.Registrar</code>将主配置类（<mark>@SpringBootApplication标注的类</mark>）的所在包及下面所有子包里面的所有组件扫描到Spring容器；</p>
<p><img src="https://cdn.static.note.zzrfdsn.cn/images/springboot/assets/1573637120233.png" alt="DEBUG"></p>
<p>这里controller包是在主程序所在的包下，所以会被扫描到，我们在springboot包下创建一个test包，把主程序放在test包下，这样启动就只会去扫描test包下的内容而controller包就不会被扫描到，再访问开始的hello就是404</p>
<p><img src="https://cdn.static.note.zzrfdsn.cn/images/springboot/assets/1573637728857.png" alt="DEBUG"></p>
</li>
</ul>
</li>
<li>
<p><code>@Import({AutoConfigurationImportSelector.class})</code></p>
<p><code>AutoConfigurationImportSelector.class</code>将所有需要导入的组件以全类名的方式返回；这些组件就会被添加到容器中；会给容器中导入非常多的自动配置类（xxxAutoConfiguration）；就是给容器中导入这个场景需要的所有组件，并配置好这些组件；</p>
<p>有了自动配置类，免去了我们手动编写配置注入功能组件等的工作；</p>
<p><img src="https://cdn.static.note.zzrfdsn.cn/images/springboot/assets/1573638685562.png" alt="Configuration"></p>
</li>
</ul>
</li>
</ul>
<p>Spring Boot在启动的时候从类路径下的META-INF/spring.factories中获取EnableAutoConfiguration指定的值，将这些值作为自动配置类导入到容器中，自动配置类就生效，帮我们进行自动配置工作；以前我们需要自己配置的东西，自动配置类都帮我们完成了；</p>
</template>
