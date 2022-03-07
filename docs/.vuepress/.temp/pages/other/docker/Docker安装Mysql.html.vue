<template><h1 id="docker-安装mysql" tabindex="-1"><a class="header-anchor" href="#docker-安装mysql" aria-hidden="true">#</a> <strong>docker 安装mysql</strong></h1>
<h2 id="下载mysql镜像" tabindex="-1"><a class="header-anchor" href="#下载mysql镜像" aria-hidden="true">#</a> <strong>下载Mysql镜像</strong></h2>
<p><strong><code>命令：</code>docker pull mysql</strong></p>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117101907475-1388871070.png" alt="img"></strong></p>
<p><strong>查看镜像</strong></p>
<p><strong><code>命令：</code>docker images</strong></p>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117101920800-1067185475.png" alt="img"></strong></p>
<p><strong>在opt下创建文件夹</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cd /opt/
mkdir mysql_docker
cd mysql_docker/
echo $PWD
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117101933202-1072982636.png" alt="img"></strong></p>
<p><strong>5、启动mysql容器，在var/lib/docker/containers/下查看容器</strong></p>
<p><strong><code>命令：</code></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name mysql-master -v <span class="token environment constant">$PWD</span>/conf:/etc/mysql/conf.d -v <span class="token environment constant">$PWD</span>/logs:/logs -v <span class="token environment constant">$PWD</span>/data:/var/lib/mysql -e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> -d -i -p <span class="token number">3307</span>:3306 mysql:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name mysql-slave -v <span class="token environment constant">$PWD</span>/conf:/etc/mysql/conf.d -v <span class="token environment constant">$PWD</span>/logs:/logs -v <span class="token environment constant">$PWD</span>/data:/var/lib/mysql -e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> -d -i -p <span class="token number">3308</span>:3306 mysql:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117101951542-1388225438.png" alt="img"></strong></p>
<p><strong><code>命令：</code>cd /var/lib/docker/containers/</strong></p>
<p><strong>6、查看mysql进程</strong></p>
<p><strong><code>命令：</code>docker ps -a</strong></p>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102003235-1426406656.png" alt="img"></strong></p>
<p><strong>7、进入mysql容器，并登陆mysql</strong></p>
<p><strong><code>命令：</code></strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker exec -it mysql-master bash
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>命令：`mysql -uroot -p</strong></p>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102011980-2122252374.png" alt="img"></strong></p>
<p><strong>8、开启远程访问权限</strong></p>
<p><strong><code>命令：</code>use mysql;</strong>
<strong><code>命令：</code>select host,user from user;</strong>
<strong><code>命令：</code>ALTER USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY '123456';</strong>
<strong><code>命令：</code>flush privileges;</strong></p>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102022439-1012036839.png" alt="img"></strong></p>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102030619-917697046.png" alt="img"></strong></p>
<p><strong>镜像里面 root用户已经有远程连接权限在里面，所以不需要去设置，只是模式不一样才导致无法连接，把root用户的密码改成 mysql_native_password 模式，即可远程连接</strong></p>
<h2 id="查看docker日志" tabindex="-1"><a class="header-anchor" href="#查看docker日志" aria-hidden="true">#</a> <strong>查看docker日志</strong></h2>
<p><strong><code>命令：</code>docker logs -f --tail 10 a4dac74d48f7</strong></p>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102048856-1273275706.png" alt="img"></strong></p>
<h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> <strong>常用命令</strong></h2>
<ul>
<li><strong>查看进程</strong></li>
</ul>
<p><strong><code>命令：</code>docker ps -a</strong></p>
<ul>
<li><strong>关闭docker中mysql容器</strong></li>
</ul>
<p><strong><code>命令：</code>docker stop mysqlserver</strong></p>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102059917-479100535.png" alt="img"></strong></p>
<ul>
<li><strong>重启docker中mysql重启</strong></li>
</ul>
<p><strong><img src="https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102109562-1174307222.png" alt="img"></strong></p>
<ul>
<li><strong>重启docker</strong></li>
</ul>
<p><strong><code>命令：</code>systemctl restart docker</strong></p>
<ul>
<li><strong>关闭docker</strong></li>
</ul>
<p><strong><code>命令：</code>systemctl stop docker</strong></p>
<h2 id="mysql-主从分离-docker" tabindex="-1"><a class="header-anchor" href="#mysql-主从分离-docker" aria-hidden="true">#</a> Mysql 主从分离（Docker）</h2>
<h3 id="创建配置文件" tabindex="-1"><a class="header-anchor" href="#创建配置文件" aria-hidden="true">#</a> 创建配置文件</h3>
<p>默认docker数据目录：/opt/docker/mysql/</p>
<p>主数据库（master）配置文件/usr/local/mysql/master/conf/my.cnf:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
og-bin<span class="token operator">=</span>mysql-bin
server-id<span class="token operator">=</span><span class="token number">1</span>   <span class="token comment">#注意这个id>0且要唯一</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>从数据库（slave）配置文件/usr/local/mysql/slave/my.cnf:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
log-bin<span class="token operator">=</span>mysql-bin
server-id<span class="token operator">=</span><span class="token number">2</span>   <span class="token comment">#注意这个id>0且要唯一</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>注意：我是在容器外部进行的配置，喜欢进入容器内部配置 路径 /etc/mysql/my.cnf</p>
<h3 id="master-主库" tabindex="-1"><a class="header-anchor" href="#master-主库" aria-hidden="true">#</a> Master 主库</h3>
<p>创建Master 主库</p>
<p>docker 运行 挂载相关文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name mysql-master  <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/mysqls/conf/my.cnf,dst<span class="token operator">=</span>/etc/mysql/my.cnf <span class="token punctuation">\</span>
-v <span class="token environment constant">$PWD</span>/conf:/etc/mysql/conf.d <span class="token punctuation">\</span>
-v <span class="token environment constant">$PWD</span>/logs:/logs <span class="token punctuation">\</span>
-v <span class="token environment constant">$PWD</span>/data:/var/lib/mysql <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.2 <span class="token punctuation">\</span>
--dns <span class="token number">8.8</span>.8.8 --dns <span class="token number">114.114</span>.114.114 <span class="token punctuation">\</span>
-d -i -p <span class="token number">3307</span>:3306 mysql:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Master主库设置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#进入主库</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it mysql-master <span class="token function">bash</span>
<span class="token comment">#进入mysql</span>
mysql -u root -p

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>创建MySQL从库用户</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>> 172.17.0.10 为从库在docker 中的IP
> 查看IP :
> 1、内部查看 cat /etc/hosts
> 2、docker 命令查看 `docker inspect --format='{{.NetworkSettings.IPAddress}}' `容器名称|容器id
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>CREATE USER 'slave'@'172.17.0.10' IDENTIFIED BY 'slave123';
# 设置权限
GRANT ALL  ON *.* TO 'slave'@'172.17.0.10';
# 修改认证认证方式
ALTER USER 'slave' IDENTIFIED WITH mysql_native_password BY 'slave123';
FLUSH PRIVILEGES;
# 显示主库信息 master状态
SHOW MASTER STATUS;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote>
<p>从库连接到主库时 报错：----&gt;mysql Authentication plugin 'caching_sha2_password' is not supported问题处理</p>
<p>使用mysql8.0版本，登录失败，提示 Authentication plugin 'caching_sha2_password' is not supported。
原因是在MySQL 8.0以后，默认的密码加密方式是caching_sha2_password而不是mysql_native_password。</p>
<p>解决方法：</p>
<p>2.更新身份认证方式 ALTER USER '你的用户名' IDENTIFIED WITH mysql_native_password BY '你的用户密码';</p>
</blockquote>
<h3 id="slave主库" tabindex="-1"><a class="header-anchor" href="#slave主库" aria-hidden="true">#</a> Slave主库</h3>
<p>创建Slave主库</p>
<p>Docker 运行 挂载相关文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name mysql-slave  <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/mysqls/conf/my.cnf,dst<span class="token operator">=</span>/etc/mysql/my.cnf <span class="token punctuation">\</span>
-v <span class="token environment constant">$PWD</span>/conf:/etc/mysql/conf.d <span class="token punctuation">\</span>
-v <span class="token environment constant">$PWD</span>/logs:/logs <span class="token punctuation">\</span>
-v <span class="token environment constant">$PWD</span>/data:/var/lib/mysql <span class="token punctuation">\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.2 <span class="token punctuation">\</span>
--dns <span class="token number">8.8</span>.8.8 --dns <span class="token number">114.114</span>.114.114 <span class="token punctuation">\</span>
-d -i -p <span class="token number">3308</span>:3306 mysql:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Slave从库设置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#进入主库</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it mysql-slave <span class="token function">bash</span>
<span class="token comment">#进入mysql</span>
mysql -u root -p
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Mysql Slave从库设置</p>
<blockquote>
<p>172.17.0.9  ----  主库IP
slave ----- 用户名
slave123 ----- 密码
mysql-bin.000003 -----主库信息</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code># 停止从库
stop slave;
# 设置主库信息
CHANGE MASTER TO MASTER_HOST='172.17.0.9', MASTER_USER='slave', MASTER_PASSWORD='slave123', MASTER_LOG_FILE='mysql-bin.000003';
# 开始从库
start slave;
# 查看连接状态
show slave status \G;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>CHANGE MASTER TO MASTER_HOST='172.17.0.9', \
MASTER_USER='slave’', \
MASTER_PASSWORD='slave’123', \
MASTER_LOG_FILE='mysql-bin.000004', \
MASTER_LOG_POS=892;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>成功后</p>
<p>Master Slave 常见配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token comment">#mysqld字段增加如下信息</span>
log-bin<span class="token operator">=</span>mysql-bin   <span class="token comment">#开启log bin</span>
<span class="token assign-left variable">binlog_format</span><span class="token operator">=</span>mixed <span class="token comment">#日志格式</span>
server-id   <span class="token operator">=</span> <span class="token number">1</span>     <span class="token comment">#server id,跟slave配置不同server-id,例这里写1,slave可以写1除外2.3.4...</span>
expire_logs_days <span class="token operator">=</span> <span class="token number">10</span> <span class="token comment">#日志保存时间</span>
binlog-ignore-db<span class="token operator">=</span>information_schema <span class="token comment">#这是mysql默认的数据库,忽略掉</span>
binlog-ignore-db<span class="token operator">=</span>mysql              <span class="token comment">#这是mysql默认的数据库,忽略掉</span>
binlog-ignore-db<span class="token operator">=</span>performance_schema <span class="token comment">#这是mysql默认的数据库,忽略掉</span>
binlog-do-db<span class="token operator">=</span>testOrderDb    <span class="token comment">#需要同步的数据库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="从库设置为只读" tabindex="-1"><a class="header-anchor" href="#从库设置为只读" aria-hidden="true">#</a> 从库设置为只读</h3>
<p>mysql主从复制，slave从库只读配置对于需要保证master-slave主从同步的salve库，如果要设置为只读状态，需要执行的命令为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>set global read_only=1;  对于非root用户，切换到root用户后还是可以进行增删改查的哦。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>read_only=1只读模式，可以限定普通用户进行数据修改的操作，但不会限定具有super权限的用户（如超级管理员root用户）的数据修改操作。</p>
<h3 id="docker-里面mysql-默认的配置信息" tabindex="-1"><a class="header-anchor" href="#docker-里面mysql-默认的配置信息" aria-hidden="true">#</a> Docker 里面MySql 默认的配置信息</h3>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code># docker 里面默认的配置信息
[mysqld]
server-id=2
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL

# Custom config should go here
!includedir /etc/mysql/conf.d/

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="docker-复制命令" tabindex="-1"><a class="header-anchor" href="#docker-复制命令" aria-hidden="true">#</a> docker 复制命令</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">cp</span> mysql-master:/etc/mysql/my.cnf /opt/a
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="设置docker开机自启动如下" tabindex="-1"><a class="header-anchor" href="#设置docker开机自启动如下" aria-hidden="true">#</a> 设置docker开机自启动如下：</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl enable docker
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>which mysqld</p>
<p>/usr/sbin/mysqld --verbose --help | grep -A 1 'Default options'</p>
</template>
