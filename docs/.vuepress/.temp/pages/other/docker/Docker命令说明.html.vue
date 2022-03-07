<template><h1 id="dockers-命令说明" tabindex="-1"><a class="header-anchor" href="#dockers-命令说明" aria-hidden="true">#</a> Dockers 命令说明</h1>
<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2>
<p>启动、停止、重启容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> start <span class="token punctuation">[</span>NAMe<span class="token punctuation">]</span>
<span class="token function">docker</span> stop	 <span class="token punctuation">[</span>NAMe<span class="token punctuation">]</span>
<span class="token function">docker</span> restart <span class="token punctuation">[</span>NAMe<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>进入容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it <span class="token punctuation">[</span>NAME<span class="token punctuation">]</span> /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>root身份进入容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -ti -u root <span class="token punctuation">[</span>NAME<span class="token punctuation">]</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查询镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>删除镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> rmi <span class="token punctuation">[</span>IMAGES<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查询容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> -a
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>删除容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> -f <span class="token punctuation">[</span>NAME<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查询运行日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> logs -t -f <span class="token punctuation">[</span>name<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>列出所有的数据卷</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>删除所有未被使用的卷</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">rm</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> volume <span class="token function">ls</span> -qf <span class="token assign-left variable">dangling</span><span class="token operator">=</span>true<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>输出所有容器</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker rmi -f $(docker images -aq)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>拷贝容器内的文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker exec -it ps cat /etc/my.cnf > /opt/docker/percona-server/conf/my.conf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="docker-命令" tabindex="-1"><a class="header-anchor" href="#docker-命令" aria-hidden="true">#</a> Docker 命令</h2>
<h3 id="docker-日志" tabindex="-1"><a class="header-anchor" href="#docker-日志" aria-hidden="true">#</a> Docker 日志</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker logs [Option] [NAME]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Options说明</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Options:
--details 显示更多的信息
-f, --follow 跟踪实时日志
--since string 显示自某个timestamp之后的日志，或相对时间，如40m（即40分钟）
--tail string 从日志末尾显示多少行日志， 默认是all
-t, --timestamps 显示时间戳
--until string 显示自某个timestamp之前的日志，或相对时间，如40m（即40分钟）
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>例子</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>例：实时查看docker容器名为Logs的最后10行日志
<span class="token function">docker</span> logs -f -t --tail <span class="token number">10</span> Logs
例：查看指定时间后的日志，只显示最后100行：
<span class="token function">docker</span> logs -f -t --since<span class="token operator">=</span><span class="token string">"2018-02-08"</span> --tail<span class="token operator">=</span><span class="token number">100</span> Logs
例：查看最近30分钟的日志:
<span class="token function">docker</span> logs --since 30m Logs
例：查看某时间之后的日志：
<span class="token function">docker</span> logs -t --since<span class="token operator">=</span><span class="token string">"2018-02-08T13:23:37"</span> Logs
例：查看某时间段日志：
<span class="token function">docker</span> logs -t --since<span class="token operator">=</span><span class="token string">"2018-02-08T13:23:37"</span> --until <span class="token string">"2018-02-09T12:23:37"</span> Logs
例：将错误日志写入文件：
<span class="token function">docker</span> logs -f -t --since<span class="token operator">=</span><span class="token string">"2018-02-18"</span> Logs <span class="token operator">|</span> <span class="token function">grep</span> error <span class="token operator">>></span> logs_error.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="docker-卷" tabindex="-1"><a class="header-anchor" href="#docker-卷" aria-hidden="true">#</a> Docker 卷</h3>
<p>列出所有的数据卷</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>使用--filter dangling=true 过滤 不在使用的数据卷</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>   --filter <span class="token assign-left variable">dangling</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2、创建一个数据卷，可以设置，--name，--path，--mode。 也可以不用</p>
<p>拥有一切自动生成的参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volume create
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>3、删除一个数据卷</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">rm</span> <span class="token operator">&lt;</span>volume name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>4、容器正在使用的数据卷不能删除，绑定挂载的无法删除。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>   --filter <span class="token assign-left variable">dangling</span><span class="token operator">=</span>true
<span class="token function">docker</span> volume <span class="token function">ls</span>   --filter <span class="token assign-left variable">dangling</span><span class="token operator">=</span>true <span class="token operator">|</span> <span class="token function">grep</span> <span class="token builtin class-name">local</span> <span class="token operator">|</span><span class="token function">awk</span> <span class="token string">'{print $2}'</span><span class="token operator">|</span><span class="token function">xargs</span> <span class="token function">docker</span> volume <span class="token function">rm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="run-命令" tabindex="-1"><a class="header-anchor" href="#run-命令" aria-hidden="true">#</a> RUN 命令</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> IMAGE <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span> <span class="token punctuation">[</span>ARG<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>OPTIONS说明</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th style="text-align:left">参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>-a</td>
<td>指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项。</td>
<td style="text-align:left">-d</td>
<td>后台运行容器，并返回容器ID</td>
</tr>
<tr>
<td>-e</td>
<td>设置环境变量</td>
<td style="text-align:left">-h</td>
<td>指定容器的hostname</td>
</tr>
<tr>
<td>-i</td>
<td>以交互模式运行容器，通常与 -t 同时使用</td>
<td style="text-align:left">-t</td>
<td>为容器重新分配一个伪输入终端，通常与 -i 同时使用</td>
</tr>
<tr>
<td>-m</td>
<td>设置容器使用内存最大值</td>
<td style="text-align:left">-p</td>
<td>随机端口映射，容器内部端口随机映射到主机的端口</td>
</tr>
<tr>
<td>-v</td>
<td>绑定一个卷</td>
<td style="text-align:left">--cpuset</td>
<td>绑定容器到指定CPU运行</td>
</tr>
<tr>
<td>--dns</td>
<td>指定容器使用的DNS服务器，默认和宿主一致</td>
<td style="text-align:left">--dns-search</td>
<td>指定容器DNS搜索域名，默认和宿主一致</td>
</tr>
<tr>
<td>--env-file</td>
<td>从指定文件读入环境变量</td>
<td style="text-align:left">--expose</td>
<td>开放一个端口或一组端口</td>
</tr>
<tr>
<td>--link</td>
<td>添加链接到另一个容器</td>
<td style="text-align:left">--name</td>
<td>为容器指定一个名称</td>
</tr>
<tr>
<td>--net</td>
<td>指定容器的网络连接类型</td>
<td style="text-align:left"></td>
<td></td>
</tr>
</tbody>
</table>
<p>例子：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name some <span class="token punctuation">\</span>
-v /opt/docker/pxc-server/data:/var/lib/mysql <span class="token punctuation">\</span>
-e <span class="token assign-left variable">INIT_ROCKDB</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--restart<span class="token operator">=</span>always <span class="token punctuation">\</span>
-d -i -t -p <span class="token number">3306</span>:3306 percona/percona-server:8.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run --name ps \
-e MYSQL_ROOT_PASSWORD=123456 \
--privileged=true \
--restart=always \
-d -i -t -p 3306:3306 percona/percona-server:latest

docker exec -it ps cat /etc/my.cnf > /opt/docker/percona-server/conf/my.conf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></template>
