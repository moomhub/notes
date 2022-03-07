<template><h1 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> Docker 安装</h1>
<h1 id="docker-linux平台安装" tabindex="-1"><a class="header-anchor" href="#docker-linux平台安装" aria-hidden="true">#</a> Docker-Linux平台安装</h1>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -fsSL https://get.docker.com <span class="token operator">|</span> <span class="token function">bash</span> -s <span class="token function">docker</span> --mirror Aliyun
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="ubuntu-14-04-16-04-使用apt-get进行安装" tabindex="-1"><a class="header-anchor" href="#ubuntu-14-04-16-04-使用apt-get进行安装" aria-hidden="true">#</a> Ubuntu 14.04 16.04 (使用apt-get进行安装)</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># step 1: 安装必要的一些系统工具</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> -y <span class="token function">install</span> apt-transport-https ca-certificates <span class="token function">curl</span> software-properties-common
<span class="token comment"># step 2: 安装GPG证书</span>
<span class="token function">curl</span> -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token comment"># Step 3: 写入软件源信息</span>
<span class="token function">sudo</span> add-apt-repository <span class="token string">"deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu <span class="token variable"><span class="token variable">$(</span>lsb_release -cs<span class="token variable">)</span></span> stable"</span>
<span class="token comment"># Step 4: 更新并安装 Docker-CE</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> -y update
<span class="token function">sudo</span> <span class="token function">apt-get</span> -y <span class="token function">install</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="centos-7-使用yum进行安装" tabindex="-1"><a class="header-anchor" href="#centos-7-使用yum进行安装" aria-hidden="true">#</a> CentOS 7 (使用yum进行安装)</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># step 1: 安装必要的一些系统工具</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> -y yum-utils device-mapper-persistent-data lvm2
<span class="token comment"># Step 2: 添加软件源信息</span>
<span class="token function">sudo</span> yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
<span class="token comment"># Step 3: 更新并安装 Docker-CE</span>
<span class="token function">sudo</span> yum makecache fast
<span class="token function">sudo</span> yum -y <span class="token function">install</span> docker-ce
<span class="token comment"># Step 4: 开启Docker服务</span>
<span class="token function">sudo</span> <span class="token function">service</span> <span class="token function">docker</span> start
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h1 id="docker-命令说明" tabindex="-1"><a class="header-anchor" href="#docker-命令说明" aria-hidden="true">#</a> Docker 命令说明</h1>
<h2 id="docker基础命令" tabindex="-1"><a class="header-anchor" href="#docker基础命令" aria-hidden="true">#</a> docker基础命令</h2>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>
systemctl start  docker
systemctl stop  docker
systemctl status  docker
docker version  #查查版本
docker info     #查看info
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Docker 设置开机启动</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>systemctl stop  docker
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="修改docker镜像加速" tabindex="-1"><a class="header-anchor" href="#修改docker镜像加速" aria-hidden="true">#</a> 修改docker镜像加速</h2>
<p>修改为网易、阿里、daocloud加速</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>  vi /etc/docker/daemon.json
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>	<span class="token punctuation">{</span>
 <span class="token property">"registry-mirrors"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
     <span class="token string">"http://hub-mirror.c.163.com"</span><span class="token punctuation">,</span>
     <span class="token string">"https://yuj65s1u.mirror.aliyuncs.com"</span><span class="token punctuation">,</span>
     <span class="token string">"http://f1361db2.m.daocloud.io"</span>
 <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>    systemctl restart  docker
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="docker-卸载" tabindex="-1"><a class="header-anchor" href="#docker-卸载" aria-hidden="true">#</a> Docker 卸载</h1>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>apt-get autoremove docker docker-ce docker-engine  docker.io  containerd runc
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>查看是否完全删除</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>dpkg -l | grep docker
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P # 删除无用的相关的配置文件
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>删除相关项</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>apt-get autoremove docker-ce-*
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>删除docker的相关配置&amp;目录</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>rm -rf /etc/systemd/system/docker.service.d
rm -rf /var/lib/docker
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h1 id="docker-加速" tabindex="-1"><a class="header-anchor" href="#docker-加速" aria-hidden="true">#</a> docker 加速</h1>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>sudo mkdir -p /etc/docker

vim /etc/docker/daemon.json
{
  &quot;registry-mirrors&quot;: [
      &quot;https://yuj65s1u.mirror.aliyuncs.com&quot;,
      &quot;https://docker.mirrors.ustc.edu.cn&quot;,
      &quot;https://hub-mirror.c.163.com&quot;
      ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
docker 暴露端口2375
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h1 id="docker开启2375-端口" tabindex="-1"><a class="header-anchor" href="#docker开启2375-端口" aria-hidden="true">#</a> docker开启2375 端口</h1>
<p>开启2375端口实现远程连接</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code># 修改配置文件
vim /lib/systemd/system/docker.service
# 注释原有的 ExecStart 添加以下内容
#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375
# 重新加载配置
systemctl daemon-reload
# 重启 Dcoker
systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></template>
