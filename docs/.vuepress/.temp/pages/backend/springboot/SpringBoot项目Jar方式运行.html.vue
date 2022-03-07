<template><h1 id="spring-boot-项目-jar-方式运行" tabindex="-1"><a class="header-anchor" href="#spring-boot-项目-jar-方式运行" aria-hidden="true">#</a> Spring boot 项目 Jar 方式运行</h1>
<h2 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h2>
<p>输入命令行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 这个会在关闭窗口是会自动接收相关任务</span>
java -jar myproject.jar
<span class="token comment"># 使用 nohup来运行会后台静默运行，即使关闭窗口也不会接受任务  会输出 nohup.out 配置信息 </span>
<span class="token function">nohup</span> java -jar myproject.jar
<span class="token comment"># 忽略nohup日志输出</span>
<span class="token function">nohup</span> java -jar myproject.jar <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="配置文件放在jar外部" tabindex="-1"><a class="header-anchor" href="#配置文件放在jar外部" aria-hidden="true">#</a> 配置文件放在jar外部</h2>
<p>Spring Boot程序默认从application.properties或者application.yaml读取配置，如何将配置信息外置，方便配置呢？</p>
<blockquote>
<p>优先级关系：application.properties  &gt; application.yaml</p>
</blockquote>
<p>查询官网，可以得到下面的几种方案:</p>
<h3 id="通过命令行指定" tabindex="-1"><a class="header-anchor" href="#通过命令行指定" aria-hidden="true">#</a> 通过命令行指定</h3>
<p>SpringApplication会默认将命令行选项参数转换为配置信息<br />例如，启动时命令参数指定：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>java -jar myproject.jar --server.port <span class="token operator">=</span> <span class="token number">9000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>从命令行指定配置项的优先级最高，不过你可以通过setAddCommandLineProperties来禁用</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">CopySpringApplication</span><span class="token punctuation">.</span><span class="token function">setAddCommandLineProperties</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="外置配置文件" tabindex="-1"><a class="header-anchor" href="#外置配置文件" aria-hidden="true">#</a> 外置配置文件</h3>
<p>Spring程序会按优先级从下面这些路径来加载application.properties配置文件</p>
<blockquote>
<p>/config 需要创建一个文件夹，不然运行会报错</p>
</blockquote>
<ul>
<li>
<p>当前目录下的/config目录</p>
</li>
<li>
<p>当前目录</p>
</li>
<li>
<p>classpath里的/config目录</p>
</li>
<li>
<p>classpath 跟目录</p>
</li>
</ul>
<p>因此，要外置配置文件就很简单了，在jar所在目录新建config文件夹，然后放入配置文件，或者直接放在配置文件在jar目录</p>
<h3 id="自定义配置文件" tabindex="-1"><a class="header-anchor" href="#自定义配置文件" aria-hidden="true">#</a> 自定义配置文件</h3>
<p>如果你不想使用application.properties作为配置文件，怎么办？完全没问题</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>java -jar myproject.jar --spring.config.location=classpath:/default.properties,classpath:/override.properties
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>或者</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>java -jar -Dspring.config.location<span class="token operator">=</span>D:<span class="token punctuation">\</span>config<span class="token punctuation">\</span>config.properties springbootrestdemo-0.0.1-SNAPSHOT.jar
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>当然，还能在代码里指定</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@PropertySource</span><span class="token punctuation">(</span>value<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">"file:config.properties"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringbootrestdemoApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">SpringbootrestdemoApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="按profile不同环境读取不同配置" tabindex="-1"><a class="header-anchor" href="#按profile不同环境读取不同配置" aria-hidden="true">#</a> 按Profile不同环境读取不同配置</h3>
<p>不同环境的配置设置一个配置文件，例如：</p>
<ul>
<li>
<p>dev环境下的配置配置在application-dev.properties中；</p>
</li>
<li>
<p>prod环境下的配置配置在application-prod.properties中。</p>
</li>
</ul>
<p>在application.properties中指定使用哪一个文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>当然，你也可以在运行的时候手动指定：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>java -jar log.jar --spring.profiles.active <span class="token operator">=</span> prod
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="log4j2-xml问题" tabindex="-1"><a class="header-anchor" href="#log4j2-xml问题" aria-hidden="true">#</a> Log4j2.xml问题</h2>
<p>打包时先删除相关文件和配置，通过使用外部文件的方式来配置咯个log4j2.xml文件</p>
</template>
