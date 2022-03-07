<template><h1 id="安装percona数据库" tabindex="-1"><a class="header-anchor" href="#安装percona数据库" aria-hidden="true">#</a> 安装Percona数据库</h1>
<h2 id="_1、本地安装" tabindex="-1"><a class="header-anchor" href="#_1、本地安装" aria-hidden="true">#</a> 1、本地安装</h2>
<h3 id="_1、本地安装-1" tabindex="-1"><a class="header-anchor" href="#_1、本地安装-1" aria-hidden="true">#</a> 1、本地安装</h3>
<h4 id="_1-1、离线安装percona数据库" tabindex="-1"><a class="header-anchor" href="#_1-1、离线安装percona数据库" aria-hidden="true">#</a> 1.1、离线安装Percona数据库</h4>
<p><a href="https://www.percona.com/downloads/" target="_blank" rel="noopener noreferrer">点击下载具体的Mysql的相关的版本<ExternalLinkIcon/></a></p>
<p>进入RPM安装文件目录，执行下面的脚本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum localinstall *.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>管理MySQL服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start mysqld
systemctl stop mysqld
systemctl restart mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="_1-2、在线安装" tabindex="-1"><a class="header-anchor" href="#_1-2、在线安装" aria-hidden="true">#</a> 1.2、在线安装</h4>
<p>使用yum命令安装</p>
<p><a href="https://www.percona.com/downloads/" target="_blank" rel="noopener noreferrer">点击查询具体的Mysql的相关的版本链接<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> http://www.percona.com/downloads/percona-release/redhat/0.1-3/percona-release-0.1-3.noarch.rpm
yum  <span class="token function">install</span>  Percona-Server-server-57
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="_1-3、管理相关的pxc-服务" tabindex="-1"><a class="header-anchor" href="#_1-3、管理相关的pxc-服务" aria-hidden="true">#</a> 1.3、管理相关的PXC 服务</h4>
<p>管理MySQL服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start mysqld
systemctl stop mysqld
systemctl restart mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="_2-开放防火墙端口" tabindex="-1"><a class="header-anchor" href="#_2-开放防火墙端口" aria-hidden="true">#</a> 2. 开放防火墙端口</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --zone<span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">3306</span>/tcp --permanent
firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_3-修改mysql配置文件" tabindex="-1"><a class="header-anchor" href="#_3-修改mysql配置文件" aria-hidden="true">#</a> 3. 修改MySQL配置文件</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vi</span> /etc/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">character_set_server</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf8</span>
<span class="token key attr-name">bind-address</span> <span class="token punctuation">=</span> <span class="token value attr-value">0.0.0.0</span>
<span class="token comment">#跳过DNS解析</span>
skip-name-resolve
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">service</span> mysql restart 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_4-修改数据" tabindex="-1"><a class="header-anchor" href="#_4-修改数据" aria-hidden="true">#</a> 4. 修改数据</h3>
<ul>
<li>
<p>查看MySQL初始密码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /var/log/mysqld.log <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">"A temporary password"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>修改MySQL密码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mysql_secure_installation
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>创建远程管理员账户</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> mysql -u root -p
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token string">'admin'</span><span class="token variable">@'%'</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">'Abc_123456'</span><span class="token punctuation">;</span>
<span class="token keyword">GRANT</span> <span class="token keyword">all</span> <span class="token keyword">privileges</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">'admin'</span><span class="token variable">@'%'</span><span class="token punctuation">;</span>
FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
<h2 id="_2、docker-容器安装-推荐" tabindex="-1"><a class="header-anchor" href="#_2、docker-容器安装-推荐" aria-hidden="true">#</a> 2、Docker 容器安装（推荐）</h2>
<p><a href="https://github.com/percona/percona-docker" target="_blank" rel="noopener noreferrer">Docker 运行参数说明<ExternalLinkIcon/></a></p>
<h3 id="_1-拉起远程镜像" tabindex="-1"><a class="header-anchor" href="#_1-拉起远程镜像" aria-hidden="true">#</a> 1.拉起远程镜像</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#docker 拉起镜像 默认为latest</span>
<span class="token function">docker</span> pull percona/percona-server
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-创建本地挂载的配置文件" tabindex="-1"><a class="header-anchor" href="#_2-创建本地挂载的配置文件" aria-hidden="true">#</a> 2.创建本地挂载的配置文件</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Percona Server template configuration</span>
<span class="token comment">#</span>
<span class="token comment"># For advice on how to change settings please see</span>
<span class="token comment"># http://dev.mysql.com/doc/refman/8.0/en/server-configuration-defaults.html</span>

<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/var/lib/mysql
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/var/lib/mysql/mysql.sock
<span class="token comment">#log-error=/var/log/mysqld.log</span>
pid-file<span class="token operator">=</span>/var/run/mysqld/mysqld.pid
<span class="token operator">!</span>includedir /etc/my.cnf.d
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_3-启动docker" tabindex="-1"><a class="header-anchor" href="#_3-启动docker" aria-hidden="true">#</a> 3.启动docker</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># docker 运行 PXC 8.0 密码为123456</span>
<span class="token function">docker</span> run --name percona-server <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span><span class="token environment constant">$PWD</span>/my.cnf,dst<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.1 <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--restart<span class="token operator">=</span>always <span class="token punctuation">\</span>
-d -i -p <span class="token number">3300</span>:3306 percona/percona-server:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>TokuDB 具体配置参考：</p>
<p><a href="https://github.com/percona/percona-docker" target="_blank" rel="noopener noreferrer">Docker 配置说明<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name some <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>root <span class="token punctuation">\</span>
-e <span class="token assign-left variable">INIT_TOKUDB</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--restart<span class="token operator">=</span>always <span class="token punctuation">\</span>
-d -i -p <span class="token number">3300</span>:3306 percona/percona-server:5.6.28
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_4-mysql-忘记密码" tabindex="-1"><a class="header-anchor" href="#_4-mysql-忘记密码" aria-hidden="true">#</a> 4. Mysql 忘记密码</h3>
<p>修改本地的挂载的<strong>my.cnf</strong>配置文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span> 
<span class="token punctuation">..</span>.
<span class="token comment"># 添加 跳过的验证的代码 </span>
skip-grant-tables
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后重启 docker</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 然后直接输入mysql 直接回车进入mysql</span>
mysql
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_3、备注" tabindex="-1"><a class="header-anchor" href="#_3、备注" aria-hidden="true">#</a> 3、备注</h2>
<p>进入 MySQL 后输入</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>show engines; 
 
show plugins;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>使用 root 身份进入容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -ti -u root <span class="token function">ps</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>安装TokuDB</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ps_tokudb_admin --enable -uroot -p
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>点击 RockDB 安装文档，选择安装TokuDB或RockDB(推荐)查看相关命令，然后执行相关命令</p>
<p><a href="https://www.percona.com/doc/percona-server/LATEST/index.html" target="_blank" rel="noopener noreferrer">Percona-Server 8.0文档<ExternalLinkIcon/></a></p>
<p><a href="https://www.percona.com/doc/percona-server/5.7/index.html" target="_blank" rel="noopener noreferrer">Percona-Server 5.7文档<ExternalLinkIcon/></a></p>
<p><a href="https://www.percona.com/blog/2021/05/21/tokudb-support-changes-and-future-removal-from-percona-server-for-mysql-8-0/" target="_blank" rel="noopener noreferrer">TokuDB废弃说明<ExternalLinkIcon/></a></p>
<blockquote>
<p>conf 权限设置为  775</p>
<p>data 权限设置为  777</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name <span class="token function">ps</span> <span class="token punctuation">\</span>
-v /opt/docker/percona-server/conf/my.conf:/etc/my.cnf <span class="token punctuation">\</span>
-v /opt/docker/percona-server/data:/var/lib/mysql <span class="token punctuation">\</span>
-e <span class="token assign-left variable">INIT_ROCKDB</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--restart<span class="token operator">=</span>always <span class="token punctuation">\</span>
-d -i -t -p <span class="token number">3306</span>:3306 percona/percona-server:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></template>
