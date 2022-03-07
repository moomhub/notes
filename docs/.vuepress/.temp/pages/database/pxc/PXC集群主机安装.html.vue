<template><h1 id="pxc集群安装" tabindex="-1"><a class="header-anchor" href="#pxc集群安装" aria-hidden="true">#</a> PXC集群安装</h1>
<blockquote>
<p>PXC是基于Percona 而来的</p>
<p>PXC集群只支持InnoDB引擎只有InnoDB引擎的数据才会被同步</p>
</blockquote>
<p><strong>PXC集群要使用四个端口,所以防火墙要放行这些端口端口描述</strong></p>
<table>
<thead>
<tr>
<th style="text-align:center">端口</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">3306</td>
<td style="text-align:center">MySQL服务端口</td>
</tr>
<tr>
<td style="text-align:center">4444</td>
<td style="text-align:center">请求全量同步(SST)端口</td>
</tr>
<tr>
<td style="text-align:center">4567</td>
<td style="text-align:center">数据库节点之间通信端口</td>
</tr>
<tr>
<td style="text-align:center">4568</td>
<td style="text-align:center">请求增量同步(IST)端口</td>
</tr>
</tbody>
</table>
<h2 id="_1、linux-主机安装" tabindex="-1"><a class="header-anchor" href="#_1、linux-主机安装" aria-hidden="true">#</a> 1、Linux 主机安装</h2>
<h3 id="_1-删除mariadb程序包" tabindex="-1"><a class="header-anchor" href="#_1-删除mariadb程序包" aria-hidden="true">#</a> 1. 删除MariaDB程序包</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum -y remove mari*
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-开放防火墙端口" tabindex="-1"><a class="header-anchor" href="#_2-开放防火墙端口" aria-hidden="true">#</a> 2. 开放防火墙端口</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --zone<span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">3306</span>/tcp --permanent
firewall-cmd --zone<span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">4444</span>/tcp --permanent
firewall-cmd --zone<span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">4567</span>/tcp --permanent
firewall-cmd --zone<span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">4568</span>/tcp --permanent
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_3-关闭selinux" tabindex="-1"><a class="header-anchor" href="#_3-关闭selinux" aria-hidden="true">#</a> 3. 关闭SELINUX</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vi</span> /etc/selinux/config
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>把SELINUX属性值设置成disabled</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_4-离线安装pxc" tabindex="-1"><a class="header-anchor" href="#_4-离线安装pxc" aria-hidden="true">#</a> 4. 离线安装PXC</h3>
<ul>
<li>
<p>进入RPM文件目录，执行安装命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum localinstall *.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>参考第一章内容，修改MySQL配置文件、创建账户等操作</p>
</li>
</ul>
<h3 id="_5-创建pxc集群" tabindex="-1"><a class="header-anchor" href="#_5-创建pxc集群" aria-hidden="true">#</a> 5. 创建PXC集群</h3>
<ul>
<li>
<p>停止MySQL服务</p>
</li>
<li>
<p>修改每个PXC节点的/etc/my.cnf文件（在不同节点上，注意调整文件内容）</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token key attr-name">server-id</span><span class="token punctuation">=</span><span class="token value attr-value">1  #PXC集群中MySQL实例的唯一ID，不能重复，必须是数字</span>
<span class="token key attr-name">wsrep_provider</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/lib64/galera3/libgalera_smm.so</span>
<span class="token key attr-name">wsrep_cluster_name</span><span class="token punctuation">=</span><span class="token value attr-value">pxc-cluster  #PXC集群的名称</span>
<span class="token key attr-name">wsrep_cluster_address</span><span class="token punctuation">=</span><span class="token value attr-value">gcomm://192.168.99.151,192.168.99.159,192.168.99.215</span>
<span class="token key attr-name">wsrep_node_name</span><span class="token punctuation">=</span><span class="token value attr-value">pxc1  #当前节点的名称</span>
<span class="token key attr-name">wsrep_node_address</span><span class="token punctuation">=</span><span class="token value attr-value">192.168.99.151  #当前节点的IP</span>
<span class="token key attr-name">wsrep_sst_method</span><span class="token punctuation">=</span><span class="token value attr-value">xtrabackup-v2  #同步方法（mysqldump、rsync、xtrabackup）</span>
<span class="token key attr-name">wsrep_sst_auth</span><span class="token punctuation">=</span> <span class="token value attr-value">admin:Abc_123456  #同步使用的帐户</span>
<span class="token key attr-name">pxc_strict_mode</span><span class="token punctuation">=</span><span class="token value attr-value">ENFORCING  #同步严厉模式</span>
<span class="token key attr-name">binlog_format</span><span class="token punctuation">=</span><span class="token value attr-value">ROW  #基于ROW复制（安全可靠）</span>
<span class="token key attr-name">default_storage_engine</span><span class="token punctuation">=</span><span class="token value attr-value">InnoDB  #默认引擎</span>
<span class="token key attr-name">innodb_autoinc_lock_mode</span><span class="token punctuation">=</span><span class="token value attr-value">2  #主键自增长不锁表</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></li>
<li>
<p>主节点的管理命令（第一个启动的PXC节点）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start mysql@bootstrap.service
systemctl stop mysql@bootstrap.service
systemctl restart mysql@bootstrap.service
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>非主节点的管理命令（非第一个启动的PXC节点）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">service</span> start mysql
<span class="token function">service</span> stop mysql
<span class="token function">service</span> restart mysql
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>查看PXC集群状态信息</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>show status like 'wsrep_cluster%' ;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p><strong>按照上述配置方法，创建两组PXC集群</strong></p>
</li>
</ul>
<h3 id="_6-pxc节点启动与关闭" tabindex="-1"><a class="header-anchor" href="#_6-pxc节点启动与关闭" aria-hidden="true">#</a> 6. PXC节点启动与关闭</h3>
<ul>
<li>如果最后关闭的PXC节点是安全退出的，那么下次启动要最先启动这个节点，而且要以主节点启动</li>
<li>如果最后关闭的PXC节点不是安全退出的，那么要先修改<code>/var/lib/mysql/grastate.dat</code> 文件，把其中的<code>safe_to_bootstrap</code>属性值设置为1，再安装主节点启动</li>
</ul>
<h2 id="_2、docker-安装" tabindex="-1"><a class="header-anchor" href="#_2、docker-安装" aria-hidden="true">#</a> 2、Docker 安装</h2>
<h3 id="_1-拉取镜像" tabindex="-1"><a class="header-anchor" href="#_1-拉取镜像" aria-hidden="true">#</a> 1.拉取镜像</h3>
<p>在docker中选择你要拉取的镜像 https://registry.hub.docker.com/r/percona/percona-xtradb-cluster</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull percona/percona-xtradb-cluster:5.7.30-31.43
<span class="token function">docker</span> pull percona/percona-xtradb-cluster:8.0.19-10.1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_2-直接启动版-傻瓜操作" tabindex="-1"><a class="header-anchor" href="#_2-直接启动版-傻瓜操作" aria-hidden="true">#</a> 2.直接启动版（傻瓜操作）</h3>
<p>名称解释</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>MYSQL_ROOT_PASSWORD</td>
<td>数据库root密码</td>
</tr>
<tr>
<td>CLUSTER_NAME</td>
<td>集群名称</td>
</tr>
<tr>
<td>CLUSTER_JOIN</td>
<td>加入的节点</td>
</tr>
</tbody>
</table>
<blockquote>
<p>一定要先创建并开启节点1不然之后节点会报错</p>
</blockquote>
<p>直接按照顺序输入如下命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name pxc1 <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-e <span class="token assign-left variable">CLUSTER_NAME</span><span class="token operator">=</span>pxc-server <span class="token punctuation">\</span>
-p <span class="token number">3331</span>:3306 <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.11 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:5.7.30-31.43

<span class="token function">docker</span> run -d --name pxc2 <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-e <span class="token assign-left variable">CLUSTER_NAME</span><span class="token operator">=</span>pxc-server <span class="token punctuation">\</span>
-e <span class="token assign-left variable">CLUSTER_JOIN</span><span class="token operator">=</span>pxc1 <span class="token punctuation">\</span>
-p <span class="token number">3322</span>:3306 <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.12 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:5.7.30-31.43

<span class="token function">docker</span> run -d --name pxc3 <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-e <span class="token assign-left variable">CLUSTER_NAME</span><span class="token operator">=</span>pxc-server <span class="token punctuation">\</span>
-e <span class="token assign-left variable">CLUSTER_JOIN</span><span class="token operator">=</span>pxc1 <span class="token punctuation">\</span>
-p <span class="token number">3323</span>:3306 <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.13 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:5.7.30-31.43
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="_3-挂载配置文件版-推荐-5-7-30-版本" tabindex="-1"><a class="header-anchor" href="#_3-挂载配置文件版-推荐-5-7-30-版本" aria-hidden="true">#</a> 3.挂载配置文件版（推荐）5.7 .30 版本</h3>
<p>新建三个PXC 的目录用于存放相关的配置文件和数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建相关文件</span>
<span class="token function">mkdir</span> /opt/docker/pxc-server
<span class="token builtin class-name">cd</span> /opt/docker/pxc-server
<span class="token function">mkdir</span> pxc1 pxc2 pxc3
<span class="token function">mkdir</span> pxc1/mysql pxc2/mysql pxc3/mysql
<span class="token comment"># 创建配置文件 每一个都要不一样</span>
<span class="token function">vi</span> pxc1/my.cnf 
<span class="token function">cp</span> /opt/docker/pxc-server/pxc1/my.cnf /opt/docker/pxc-server/pxc2/my.cnf
<span class="token function">cp</span> /opt/docker/pxc-server/pxc1/my.cnf /opt/docker/pxc-server/pxc3/my.cnf
<span class="token comment"># 修改文件夹权限</span>
<span class="token function">chmod</span> <span class="token number">777</span> /opt/docker/pxc-server/*
<span class="token function">chmod</span> <span class="token number">777</span> /opt/docker/pxc-server/pxc1/* /opt/docker/pxc-server/pxc2/* /opt/docker/pxc-server/pxc3/*
<span class="token function">chmod</span> <span class="token number">664</span> /opt/docker/pxc-server/pxc1/conf/my.cnf /opt/docker/pxc-server/pxc2/conf/my.cnf /opt/docker/pxc-server/pxc3/conf/my.cnf

<span class="token function">chmod</span> <span class="token number">664</span> /opt/docker/pxc-server/pxc1/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>my.cnf</strong>配置文件内容</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token comment"># default_authentication_plugin=mysql_native_password</span>
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/var/lib/mysql
skip-host-cache
skip-name-resolve
core-file

<span class="token comment"># 默认字符集</span>
character_set_server <span class="token operator">=</span> utf8
bind_address <span class="token operator">=</span> <span class="token number">0.0</span>.0.0

<span class="token assign-left variable">default_storage_engine</span><span class="token operator">=</span>InnoDB
<span class="token assign-left variable">binlog_format</span><span class="token operator">=</span>ROW
skip-host-cache
core-file
<span class="token comment"># 日志保存天数</span>
<span class="token assign-left variable">expire_logs_days</span><span class="token operator">=</span><span class="token number">7</span>
<span class="token comment">#Disabling symbolic-links is recommended to porevent assorted security risks</span>
symbolic-links<span class="token operator">=</span><span class="token number">0</span>

innodb_flush_log_at_trx_commit  <span class="token operator">=</span> <span class="token number">0</span>
innodb_flush_method             <span class="token operator">=</span> O_DIRECT
innodb_file_per_table           <span class="token operator">=</span> <span class="token number">1</span>
<span class="token assign-left variable">innodb_autoinc_lock_mode</span><span class="token operator">=</span><span class="token number">2</span>

<span class="token comment">#配置文件中PXC相关内容</span>
server-id<span class="token operator">=</span><span class="token number">1</span> <span class="token comment">#PXC集群中MySQL实例的唯一ID，不能重复，必须是数字</span>
<span class="token assign-left variable">wsrep_slave_threads</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token assign-left variable">wsrep_node_incoming_address</span><span class="token operator">=</span><span class="token number">172.18</span>.0.11:3306
<span class="token assign-left variable">wsrep_provider</span><span class="token operator">=</span>/usr/lib64/galera3/libgalera_smm.so
<span class="token assign-left variable">wsrep_cluster_name</span><span class="token operator">=</span>pxc-server <span class="token comment">#PXC集群的名称</span>
<span class="token assign-left variable">wsrep_cluster_address</span><span class="token operator">=</span>gcomm://172.18.0.11,172.18.0.12,172.18.0.13
<span class="token assign-left variable">wsrep_node_name</span><span class="token operator">=</span>pxc1<span class="token comment">#当前节点的名称</span>
<span class="token assign-left variable">wsrep_node_address</span><span class="token operator">=</span><span class="token number">172.18</span>.0.11<span class="token comment">#当前节点的IP</span>
<span class="token assign-left variable">wsrep_sst_method</span><span class="token operator">=</span>xtrabackup-v2<span class="token comment">#同步方法(mysqldump、rsync、xtrabackup)</span>
<span class="token assign-left variable">wsrep_sst_auth</span><span class="token operator">=</span> root:123456 <span class="token comment">#同步使用的帐户</span>
<span class="token assign-left variable">pxc_strict_mode</span><span class="token operator">=</span>ENFORCING <span class="token comment">#同步严厉模式</span>
<span class="token assign-left variable">binlog_format</span><span class="token operator">=</span>ROW <span class="token comment">#基于ROW复制(安全可靠)</span>
<span class="token assign-left variable">default_storage_engine</span><span class="token operator">=</span>InnoDB <span class="token comment">#默认引擎</span>
<span class="token assign-left variable">innodb_autoinc_lock_mode</span><span class="token operator">=</span><span class="token number">2</span> <span class="token comment">#主键自增长不锁表</span>
<span class="token comment"># 这个只是在导入数据时使用</span>
<span class="token assign-left variable">innodb_flush_log_at_trx_commit</span><span class="token operator">=</span> <span class="token number">0</span>
<span class="token assign-left variable">innodb_flush_method</span><span class="token operator">=</span> O_DIRECT
<span class="token assign-left variable">innodb_buffer_pool_size</span><span class="token operator">=</span> 200M

<span class="token comment"># 禁用 ssl mysql  8 中开启</span>
<span class="token comment"># pxc-encrypt-cluster-traffic=OFF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p>运行docker 容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name pxc1 <span class="token punctuation">\</span>
-v /opt/docker/pxc-server/pxc1/mysql:/var/lib/mysql <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/pxc-server/pxc1/my.cnf,dst<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-p <span class="token number">3310</span>:3306 <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.10 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:5.7.30-31.43

<span class="token function">docker</span> run -d --name pxc1 <span class="token punctuation">\</span>
-v /opt/docker/pxc-server/pxc1/mysql:/var/lib/mysql <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/pxc-server/pxc1/my.cnf,dst<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-p <span class="token number">3311</span>:3306 <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.11 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:5.7.30-31.43

<span class="token function">docker</span> run -d --name pxc2 <span class="token punctuation">\</span>
-v /opt/docker/pxc-server/pxc2/mysql:/var/lib/mysql <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/pxc-server/pxc2/my.cnf,dst<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-p <span class="token number">3312</span>:3306 <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--restart<span class="token operator">=</span>always <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.12 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:5.7.30-31.43

<span class="token function">docker</span> run -d --name pxc3 <span class="token punctuation">\</span>
-v /opt/docker/pxc-server/pxc3/mysql:/var/lib/mysql <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/pxc-server/pxc3/my.cnf,dst<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-p <span class="token number">3313</span>:3306 <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--restart<span class="token operator">=</span>always <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.13 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:5.7.30-31.43
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>添加完成或链接数据库输入以下命令 查看是否安装成功</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>show status like 'wsrep_cluster%';
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
<span class="token function">docker</span> run -d --name pxc1 <span class="token punctuation">\</span>
-v /opt/docker/pxc-server/pxc1/mysql:/var/lib/mysql <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/pxc-server/pxc1/my.cnf,dst<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-p <span class="token number">3311</span>:3306 <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.11 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:8.0.19-10.1

<span class="token function">docker</span> run -d --name pxc2 <span class="token punctuation">\</span>
-v /opt/docker/pxc-server/pxc2/mysql:/var/lib/mysql <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/pxc-server/pxc2/my.cnf,dst<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-p <span class="token number">3312</span>:3306 <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.12 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:8.0.19-10.1

<span class="token function">docker</span> run -d --name pxc3 <span class="token punctuation">\</span>
-v /opt/docker/pxc-server/pxc3/mysql:/var/lib/mysql <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/pxc-server/pxc3/my.cnf,dst<span class="token operator">=</span>/etc/my.cnf <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
-p <span class="token number">3313</span>:3306 <span class="token punctuation">\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.13 <span class="token punctuation">\</span>
percona/percona-xtradb-cluster:8.0.19-10.1

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>配置文件版</p>
<p>配置文件信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>

<span class="token assign-left variable">default_authentication_plugin</span><span class="token operator">=</span>mysql_native_password
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/var/lib/mysql
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/tmp/mysql.sock
skip-host-cache
skip-name-resolve
core-file

character_set_server <span class="token operator">=</span> utf8
bind_address <span class="token operator">=</span> <span class="token number">0.0</span>.0.0

<span class="token assign-left variable">default_storage_engine</span><span class="token operator">=</span>InnoDB
<span class="token assign-left variable">binlog_format</span><span class="token operator">=</span>ROW


<span class="token assign-left variable">expire_logs_days</span><span class="token operator">=</span><span class="token number">7</span>
<span class="token comment">#Disabling symbolic-links is recommended to porevent assorted security risks</span>
symbolic-links<span class="token operator">=</span><span class="token number">0</span>

innodb_flush_log_at_trx_commit  <span class="token operator">=</span> <span class="token number">0</span>
innodb_flush_method             <span class="token operator">=</span> O_DIRECT
innodb_file_per_table           <span class="token operator">=</span> <span class="token number">1</span>
<span class="token assign-left variable">innodb_autoinc_lock_mode</span><span class="token operator">=</span><span class="token number">2</span>

<span class="token comment">#配置文件中PXC相关内容</span>
server-id<span class="token operator">=</span><span class="token number">1</span> <span class="token comment">#PXC集群中MySQL实例的唯一ID，不能重复，必须是数字</span>
<span class="token assign-left variable">wsrep_slave_threads</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token assign-left variable">wsrep_node_incoming_address</span><span class="token operator">=</span><span class="token number">172.18</span>.0.11:3306
<span class="token assign-left variable">wsrep_provider</span><span class="token operator">=</span>/usr/lib64/galera4/libgalera_smm.so
<span class="token assign-left variable">wsrep_cluster_name</span><span class="token operator">=</span>pxc-server <span class="token comment">#PXC集群的名称</span>
<span class="token assign-left variable">wsrep_cluster_address</span><span class="token operator">=</span>gcomm://
<span class="token assign-left variable">wsrep_node_name</span><span class="token operator">=</span>test1<span class="token comment">#当前节点的名称</span>
<span class="token assign-left variable">wsrep_node_address</span><span class="token operator">=</span><span class="token number">172.18</span>.0.11<span class="token comment">#当前节点的IP</span>
<span class="token assign-left variable">wsrep_sst_method</span><span class="token operator">=</span>xtrabackup-v2<span class="token comment">#同步方法(mysqldump、rsync、xtrabackup)</span>
<span class="token assign-left variable">pxc_strict_mode</span><span class="token operator">=</span>ENFORCING <span class="token comment">#同步严厉模式</span>
<span class="token assign-left variable">binlog_format</span><span class="token operator">=</span>ROW <span class="token comment">#基于ROW复制(安全可靠)</span>
<span class="token assign-left variable">default_storage_engine</span><span class="token operator">=</span>InnoDB <span class="token comment">#默认引擎</span>
<span class="token assign-left variable">innodb_autoinc_lock_mode</span><span class="token operator">=</span><span class="token number">2</span> <span class="token comment">#主键自增长不锁表</span>
<span class="token comment"># 这个只是在导入数据时使用</span>
<span class="token assign-left variable">innodb_flush_log_at_trx_commit</span><span class="token operator">=</span> <span class="token number">0</span>
<span class="token assign-left variable">innodb_flush_method</span><span class="token operator">=</span> O_DIRECT
<span class="token assign-left variable">innodb_buffer_pool_size</span><span class="token operator">=</span> 200M

pxc-encrypt-cluster-traffic<span class="token operator">=</span>OFF

<span class="token punctuation">[</span>client<span class="token punctuation">]</span>
<span class="token assign-left variable">socket</span><span class="token operator">=</span>/tmp/mysql.sock

<span class="token punctuation">[</span>sst<span class="token punctuation">]</span>
<span class="token assign-left variable">progress</span><span class="token operator">=</span>/var/lib/mysql/sst_in_progresss
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><p>PXC集群管理</p>
<p>PXC集群信息</p>
<p>PXC集群信息可以分为以下几类:</p>
<p>队列    复制    流控    事物    状态
https://www.percona.com/doc/percona-xtradb-cluster/LATEST/wsrep-status-index.html</p>
<h2 id="_3、pxc-参数说明" tabindex="-1"><a class="header-anchor" href="#_3、pxc-参数说明" aria-hidden="true">#</a> 3、PXC 参数说明</h2>
<p>PXC数据复制相关的信息</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>wsrep_last_applied</td>
<td>同步应用次数</td>
</tr>
<tr>
<td>wsrep_last_committed</td>
<td>事物提交次数</td>
</tr>
<tr>
<td>wsrep_replicated</td>
<td>被其他节点复制的总数</td>
</tr>
<tr>
<td>wsrep_replicated_bytes</td>
<td>被其他节点复制的数据总数</td>
</tr>
<tr>
<td>wsrep_received</td>
<td>从其他节点处收到的写入请求总数</td>
</tr>
<tr>
<td>wsrep_received_bytes</td>
<td>从其他节点处收到的同步数据总数</td>
</tr>
</tbody>
</table>
<p>PXC队列的相关信息</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>wsrep_local_send_queue</strong></td>
<td>发送队列的长度</td>
</tr>
<tr>
<td>wsrep_local_send_queue_max</td>
<td>发送队列的最大长度</td>
</tr>
<tr>
<td>wsrep_local_send_queue_min</td>
<td>发送队列的最小长度</td>
</tr>
<tr>
<td><strong>wsrep_local_send_queue_avg</strong></td>
<td>发送队列的平均长度</td>
</tr>
<tr>
<td><strong>wsrep_local_recv_queue</strong></td>
<td>接收队列的长度</td>
</tr>
<tr>
<td>wsrep_local_recv_queue_max</td>
<td>接收队列的最大长度</td>
</tr>
<tr>
<td>wsrep_local_recv_queue_min</td>
<td>接收队列的最小长度</td>
</tr>
<tr>
<td><strong>wsrep_local_recv_queue_avg</strong></td>
<td>接收队列的平均长度</td>
</tr>
</tbody>
</table>
<p>流量控制的相关信息</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>wsrep_flow_control_paused_ns</td>
<td>流控暂停状态下花费的总时间（纳秒)</td>
</tr>
<tr>
<td><strong>wsrep_flow_control_paused</strong></td>
<td>流量控制暂停时间的占比(0~1)</td>
</tr>
<tr>
<td><strong>wsrep_flow_control_sent</strong></td>
<td>发送的流控暂停事件的数量</td>
</tr>
<tr>
<td><strong>wsrep_flow_control_recv</strong></td>
<td>接收的流控暂停事件的数量</td>
</tr>
<tr>
<td>wsrep_flow_control_interval</td>
<td>流量控制的下限和上限。上限是队列中允许的最大请求数。如果队列达到上限，则拒绝新的请求。当处理现有请求时，队列会减少，—旦到达下限，将再次允许新的请求</td>
</tr>
<tr>
<td><strong>wsrep_flow_control_status</strong></td>
<td>流量控制状态</td>
</tr>
</tbody>
</table>
<p>PXC 状态管理</p>
<p>PXC节点状态</p>
<p><img src="https://i.loli.net/2020/09/22/Fl1VTmzCt7EePHJ.png" alt="image-20200922155642505"></p>
<p>PXC集群状态</p>
<p><img src="https://i.loli.net/2020/09/22/85Z6MenauvrlJtY.png" alt="image-20200922155721122"></p>
<p>节点与集群的相关信息</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>wsrep_local_state_comment</td>
<td>节点状态</td>
</tr>
<tr>
<td>wsrep_cluster_status</td>
<td>集群状态(PRIMARY（正常状态）、NON_PRIMARY（脑裂）、Disconnected（未连接）)</td>
</tr>
<tr>
<td>wsrep_connected</td>
<td>节点是否连接到集群</td>
</tr>
<tr>
<td>wsrep_ready</td>
<td>集群是否正常工作</td>
</tr>
<tr>
<td>wsrep_cluster_size</td>
<td>节点数量</td>
</tr>
<tr>
<td>wsrep_desync_count</td>
<td>延时节点数量</td>
</tr>
<tr>
<td>wsrep_incoming_addresses</td>
<td>集群节点IP地址</td>
</tr>
</tbody>
</table>
<p>事务的相关信息</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>wsrep_cert_deps_distance</td>
<td>事务执行并发数</td>
</tr>
<tr>
<td>wsrep_apply_oooe</td>
<td>接收队列中事务的占比</td>
</tr>
<tr>
<td>wsrep_apply_oool</td>
<td>接收队列中事务乱序执行的频率</td>
</tr>
<tr>
<td>wsrep_apply_window</td>
<td>接收队列中事务的平均数量</td>
</tr>
<tr>
<td>wsrep_commit_oooe</td>
<td>发送队列中事务的占比</td>
</tr>
<tr>
<td>wsrep_commit_oool</td>
<td>无任何意义(不存在本地乱序提交)</td>
</tr>
<tr>
<td>wsrep_commit_window</td>
<td>发送队列中事务的平均数量</td>
</tr>
</tbody>
</table>
<h2 id="_4、pxc节点上线和下线操作-安装环境下" tabindex="-1"><a class="header-anchor" href="#_4、pxc节点上线和下线操作-安装环境下" aria-hidden="true">#</a> 4、PXC节点上线和下线操作（安装环境下）</h2>
<p>如果PXC节点都是安全退出的，先要启动最后退出的节点</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 最后关闭的节点先启动</span>
systemctl start mysql@bootstrap.service
<span class="token comment"># 查看节点是否是最后一个节点  pxc的安装目录</span>
<span class="token function">cat</span> /var/lib/mysql/grastate.dat


<span class="token comment">#  safe_to_bootstrap(默认是0,为1则代表是最后一个节点结束的）</span>

safe_to_bootstrap: <span class="token number">1</span> 设置为1 <span class="token punctuation">(</span>默认是0）
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_5、mysql常用的中间件" tabindex="-1"><a class="header-anchor" href="#_5、mysql常用的中间件" aria-hidden="true">#</a> 5、Mysql常用的中间件</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>MyCat （推荐）
Atlas
OneProxy
Proxy SQL
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>
