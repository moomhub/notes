<template><h1 id="ubuntu-设置远程登陆" tabindex="-1"><a class="header-anchor" href="#ubuntu-设置远程登陆" aria-hidden="true">#</a> Ubuntu 设置远程登陆</h1>
<h1 id="检查ssh服务" tabindex="-1"><a class="header-anchor" href="#检查ssh服务" aria-hidden="true">#</a> 检查ssh服务</h1>
<p>判断是否安装ssh服务，可以通过如下命令进行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ps</span> -e<span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">ssh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>输出如下：表示已经安装了ssh</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@moom:~<span class="token comment"># ps -e| grep ssh</span>
    <span class="token number">879</span> ?        00:00:00 sshd
   <span class="token number">2302</span> ?        00:00:00 sshd
   <span class="token number">2314</span> ?        00:00:00 sshd
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="安装-和开启ssh服务" tabindex="-1"><a class="header-anchor" href="#安装-和开启ssh服务" aria-hidden="true">#</a> 安装 和开启ssh服务</h2>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p>如果你用的是<strong>redhat，fedora，centos</strong> 等系列linux发行版，那么敲入以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> sshd
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果你使用的是<strong>debian，ubuntu，linux mint</strong> 等系列的linux发行版，那么敲入以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> sshd
or
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> openssh-server
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="开启" tabindex="-1"><a class="header-anchor" href="#开启" aria-hidden="true">#</a> 开启</h3>
<p>开启ssh服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">service</span> sshd start
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>出现错误  <code>sshd: no hostkeys available -- exiting.</code></p>
<p>输入  <code>ssh-keygen -A</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@LAPTOP-DDEOSP8K:/etc/ssh<span class="token comment"># service ssh start</span>
sshd: no hostkeys available -- exiting.
root@LAPTOP-DDEOSP8K:/etc/ssh<span class="token comment"># ssh-keygen -A</span>
ssh-keygen: generating new <span class="token function">host</span> keys: RSA DSA ECDSA ED25519
root@LAPTOP-DDEOSP8K:/etc/ssh<span class="token comment"># service ssh start</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="开机自启" tabindex="-1"><a class="header-anchor" href="#开机自启" aria-hidden="true">#</a> 开机自启</h3>
<p>设置开机自启动</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo systemctl enable ssh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>关闭ssh开机自动启动命令</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo systemctl disable ssh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="卸载ssh服务" tabindex="-1"><a class="header-anchor" href="#卸载ssh服务" aria-hidden="true">#</a> 卸载ssh服务</h2>
<p>如果你用的是redhat，fedora，centos等系列linux发行版，那么敲入以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum remove sshd
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果你使用的是debian，ubuntu，linux mint等系列的linux发行版，那么敲入以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> –purge remove sshd
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后就会提示卸载完成。</p>
<h1 id="linux-远程密码模式登陆" tabindex="-1"><a class="header-anchor" href="#linux-远程密码模式登陆" aria-hidden="true">#</a> Linux 远程密码模式登陆</h1>
<blockquote>
<p>在wsl中执行sudo /etc/init.d/ssh start<br />可能会出现sshd: no hostkeys available -- exiting的报错，<br />在 /etc/ssh 路径下执行sudo ssh-keygen -A可以解决。</p>
</blockquote>
<p>改名sshd_config 配置文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 备份文件</span>
<span class="token function">cp</span> /etc/ssh/sshd_config /etc/ssh/sshd_config_backup
<span class="token comment"># 编辑文件</span>
<span class="token function">vim</span> /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>修改以下内容然后保存</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Port 22
ListenAddress 0.0.0.0
PasswordAuthentication yes # 允许用户名密码方式登录

#开启Root 用户使用密码登录
PermitRootLogin yes
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>重启ssh服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl restart <span class="token function">ssh</span>
<span class="token comment">#或者</span>
<span class="token function">service</span> <span class="token function">ssh</span> restart
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h1 id="linux-远程密钥模式登陆" tabindex="-1"><a class="header-anchor" href="#linux-远程密钥模式登陆" aria-hidden="true">#</a> Linux 远程密钥模式登陆</h1>
<blockquote>
<p>在Linux 服务器上进行创建密钥时，进行当前用户登陆是已当前用户创建的，进行远程登陆时，可输入当前用户的名称可直接进行登陆。但是输入其他用户时，会爆拒绝访问，同时要求输入密码进行登陆。（当禁止密码进行登陆时就只 允许当前用户进行登陆）</p>
</blockquote>
<h2 id="制作密钥对" tabindex="-1"><a class="header-anchor" href="#制作密钥对" aria-hidden="true">#</a> 制作密钥对</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>首先在服务器上制作密钥对。首先用密码登录到你打算使用密钥登录的账户，然后执行以下命令：

[root@host ~]$ ssh-keygen  &lt;== 建立密钥对
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): &lt;== 按 Enter
Created directory '/root/.ssh'.
Enter passphrase (empty for no passphrase): &lt;== 输入密钥锁码，或直接按 Enter 留空
Enter same passphrase again: &lt;== 再输入一遍密钥锁码

Your identification has been saved in /root/.ssh/id_rsa. &lt;== 私钥
Your public key has been saved in /root/.ssh/id_rsa.pub. &lt;== 公钥

The key fingerprint is:
0f:d3:e7:1a:1c:bd:5c:03:f1:19:f1:22:df:9b:cc:08 root@host
密钥锁码在使用私钥时必须输入，这样就可以保护私钥不被盗用。当然，也可以留空，实现无密码登录。

现在，在 root 用户的家目录中生成了一个 .ssh 的隐藏目录，内含两个密钥文件。id_rsa 为私钥，id_rsa.pub 为公钥。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="在服务器上安装公钥" tabindex="-1"><a class="header-anchor" href="#在服务器上安装公钥" aria-hidden="true">#</a> 在服务器上安装公钥</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>键入以下命令，在服务器上安装公钥：

[root@host ~]$ cd .ssh
[root@host .ssh]$ cat id_rsa.pub >> authorized_keys
如此便完成了公钥的安装。为了确保连接成功，请保证以下文件权限正确：
[root@host .ssh]$ chmod 600 authorized_keys
[root@host .ssh]$ chmod 700 ~/.ssh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="设置-ssh-打开密钥登录功能" tabindex="-1"><a class="header-anchor" href="#设置-ssh-打开密钥登录功能" aria-hidden="true">#</a> 设置 SSH，打开密钥登录功能</h2>
<p>编辑 /etc/ssh/sshd_config 文件，进行如下设置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/ssh/sshd_config 

RSAAuthentication <span class="token function">yes</span>
PubkeyAuthentication <span class="token function">yes</span>
<span class="token comment">#另外，请留意 root 用户能否通过 SSH 登录：</span>
PermitRootLogin <span class="token function">yes</span>


<span class="token comment">#当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录：</span>
PasswordAuthentication no
<span class="token comment">#最后，重启 SSH 服务：</span>

<span class="token punctuation">[</span>root@host .ssh<span class="token punctuation">]</span>$ <span class="token function">service</span> sshd restart
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></template>
