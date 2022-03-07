<template><h1 id="doker安装redis" tabindex="-1"><a class="header-anchor" href="#doker安装redis" aria-hidden="true">#</a> Doker安装Redis</h1>
<h1 id="一、使用docker安装redis" tabindex="-1"><a class="header-anchor" href="#一、使用docker安装redis" aria-hidden="true">#</a> 一、使用docker安装redis</h1>
<p>访问==&gt; <a href="https://hub.docker.com/_/redis?tab=tags" target="_blank" rel="noopener noreferrer">https://hub.docker.com/_/redis?tab=tags<ExternalLinkIcon/></a> 查看最新的版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 拉取镜像 安装好之后使用docker images即可查看</span>
<span class="token function">docker</span> pull redis

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h1 id="二、获取redis的配置文件" tabindex="-1"><a class="header-anchor" href="#二、获取redis的配置文件" aria-hidden="true">#</a> 二、获取redis的配置文件</h1>
<p>下载Redis配置文件<br />redis中文官方网站：<a href="http://www.redis.cn/download.html" target="_blank" rel="noopener noreferrer">http://www.redis.cn/download.html<ExternalLinkIcon/></a><br />下载后解压出来：这个redis.conf文件就是咱们需要的<br />修改redis.conf配置文件： 主要配置的如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">bind</span> <span class="token number">127.0</span>.0.1 <span class="token comment">#注释掉这部分，使redis可以外部访问</span>
daemonize no<span class="token comment">#用守护线程的方式启动</span>
requirepass 你的密码<span class="token comment">#给redis设置密码 </span>
appendonly <span class="token function">yes</span><span class="token comment">#redis持久化　　默认是no </span>
tcp-keepalive <span class="token number">300</span> <span class="token comment">#防止出现远程主机强迫关闭了一个现有的连接的错误 默认是300</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h1 id="三、创建本地映射目录" tabindex="-1"><a class="header-anchor" href="#三、创建本地映射目录" aria-hidden="true">#</a> 三、创建本地映射目录</h1>
<p>创建本地存放redis的位置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> -p /opt/docker/redis/conf
<span class="token function">mkdir</span> -p /opt/docker/redis/data
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上传之前下载的<code>redis.conf</code>文件到conf目录</p>
<h2 id="四、启动redis" tabindex="-1"><a class="header-anchor" href="#四、启动redis" aria-hidden="true">#</a> 四、启动Redis</h2>
<blockquote>
<p>redis-server /etc/redis/redis.conf：这个是关键配置，让redis不是无配置启动，而是按照这个redis.conf的配置启动<br />appendonly yes：redis启动后数据持久化</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -p <span class="token number">6379</span>:6379 <span class="token punctuation">\</span>
--name redis <span class="token punctuation">\</span>
--restart<span class="token operator">=</span>always <span class="token punctuation">\</span>
-v /opt/docker/redis/conf/redis.conf:/etc/redis/redis.conf <span class="token punctuation">\</span>
-v /opt/docker/redis/data:/data <span class="token punctuation">\</span>
-d redis redis-server /etc/redis/redis.conf <span class="token punctuation">\</span>
--appendonly <span class="token function">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>测试连接完成安装</p>
</template>
