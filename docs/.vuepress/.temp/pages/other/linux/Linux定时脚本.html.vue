<template><h1 id="linux-定时脚本" tabindex="-1"><a class="header-anchor" href="#linux-定时脚本" aria-hidden="true">#</a> Linux 定时脚本</h1>
<h1 id="linux下每间隔一段时间执行脚本" tabindex="-1"><a class="header-anchor" href="#linux下每间隔一段时间执行脚本" aria-hidden="true">#</a> linux下每间隔一段时间执行脚本</h1>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>#!/bin/bash
while [ 1 = 1 ]
do
  nohup python run_summarization.py --mode=decode --pointer_gen=False --single_pass=True --data_path=/lab/jinhanqi/my_pointer_data/chunked/test_* --vocab_path=/lab/jinhanqi/my_pointer_data/vocab --log_root=/lab/jinhanqi/basic_seq2seq_attn/log --exp_name=no-pointer &gt;decode.out 2&gt;&amp;1 &amp; 
  sleep 15000;
done
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>每间隔15000s,执行一次该脚本</p>
<h1 id="centos-配置开机启动脚本启动-docker-容器" tabindex="-1"><a class="header-anchor" href="#centos-配置开机启动脚本启动-docker-容器" aria-hidden="true">#</a> Centos 配置开机启动脚本启动 docker 容器</h1>
<p>I我们的 Centos 服务器上部署了好多个 docker 容器，因故重启的时候就会导致还得手动去手动重启这些 docker 容器，为什么不写个脚本自动重启呢，于是就有了这篇文章。</p>
<p>批量启动 Docker 容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Copydocker start <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> -aq<span class="token variable">)</span></span> <span class="token comment"># 启动所有容器</span>
<span class="token function">docker</span> start <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> -aq -f <span class="token assign-left variable">status</span><span class="token operator">=</span>exited<span class="token variable">)</span></span> <span class="token comment"># 启动所有状态为exited 的容器，和上面的命令效果一致</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>对于有 link 有依赖项的需要先把对应的依赖项先启动，比如说我们有一个 identityserver 的 docker  容器（auth-server），别的容器启动的时候会 link 它，这时候就需要先启动 auth-server  再启动其他容器，这时启动脚本则需要稍加修改</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Copydocker start auth-server <span class="token comment"># 先启动 auth-server 容器</span>
<span class="token function">docker</span> start <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> -aq -f <span class="token assign-left variable">status</span><span class="token operator">=</span>exited<span class="token variable">)</span></span> <span class="token comment"># 再启动所有状态为exited 的容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>写个 shell 脚本<a href="https://www.cnblogs.com/weihanli/p/start-docker-containers-with-startup-scripts.html#1061158723" target="_blank" rel="noopener noreferrer">#<ExternalLinkIcon/></a></p>
<p>写一个启动 startup 脚本，在系统启动的时候执行它<br />在一个你想放启动脚本的地方创建一个 startup.sh，我这里创建在了 /usr/local/scripts/startup.sh</p>
<p>文件内容如下：</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>Copy#!/bin/bash
# start docker container
docker start auth-server
docker start $(docker ps -aq -f status=exited)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>设置文件权限：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Copysudo <span class="token function">chmod</span> +x /usr/local/scripts/startup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>设置开机启动<a href="https://www.cnblogs.com/weihanli/p/start-docker-containers-with-startup-scripts.html#388262687" target="_blank" rel="noopener noreferrer">#<ExternalLinkIcon/></a></p>
<p>在 /etc/rc.d/rc.local 文件中添加开机启动执行脚本</p>
<p>sudo vi /etc/rc.d/rc.local 编辑文件，添加自定义的启动脚本</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copy#!/bin/bash
# THIS FILE IS ADDED FOR COMPATIBILITY PURPOSES
#
# It is highly advisable to create own systemd services or udev rules
# to run scripts during boot instead of using this file.
#
# In contrast to previous versions due to parallel execution during boot
# this script will NOT be run after all other services.
#
# Please note that you must run 'chmod +x /etc/rc.d/rc.local' to ensure
# that this script will be executed during boot.

touch /var/lock/subsys/local
/usr/local/scripts/startup.sh # 新增自定义启动脚本
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>设置文件权限</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copychmod +x /etc/rc.d/rc.local
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>重启验证<a href="https://www.cnblogs.com/weihanli/p/start-docker-containers-with-startup-scripts.html#2305985972" target="_blank" rel="noopener noreferrer">#<ExternalLinkIcon/></a></p>
<p>执行 sudo reboot 重启服务器，稍后重新连接，执行 docker ps 查看在运行的 docker 镜像，有 docker 在运行就说明我们的启动脚本正常执行了~~</p>
</template>
