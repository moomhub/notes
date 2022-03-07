<template><h1 id="番外" tabindex="-1"><a class="header-anchor" href="#番外" aria-hidden="true">#</a> 番外</h1>
<p><img src="https://i.loli.net/2020/09/28/XGAH5WxBs6bYFc7.png" alt="image-20200928115625927"></p>
<h2 id="一、mysql架构" tabindex="-1"><a class="header-anchor" href="#一、mysql架构" aria-hidden="true">#</a> 一、Mysql架构</h2>
<p>一共有5种</p>
<h3 id="_1-mysql-分布式proxy扩展" tabindex="-1"><a class="header-anchor" href="#_1-mysql-分布式proxy扩展" aria-hidden="true">#</a> 1.MySQL+分布式Proxy扩展</h3>
<p>PXC +Proxy 组成相关的配置</p>
<p>构建索引，使用索引进行优化</p>
<p><img src="https://i.loli.net/2020/09/28/yj6tYMeNB7sxR4u.png" alt="image-20200928110416123"></p>
<p>数据拆分的好处</p>
<p><img src="https://i.loli.net/2020/09/28/49aRUHn3oIdivBc.png" alt="image-20200928115116096"></p>
<h3 id="_2-数据归档-冷热数据分离" tabindex="-1"><a class="header-anchor" href="#_2-数据归档-冷热数据分离" aria-hidden="true">#</a> 2.数据归档，冷热数据分离</h3>
<p><img src="https://i.loli.net/2020/09/27/kWDZRhMNqwoHOe3.png" alt="image-20200927173016292"></p>
<h3 id="_3-mysql-缓存-redis-高并发架构" tabindex="-1"><a class="header-anchor" href="#_3-mysql-缓存-redis-高并发架构" aria-hidden="true">#</a> 3.MySQL+缓存(Redis）高并发架构</h3>
<h3 id="_4-mysql-小文件系统" tabindex="-1"><a class="header-anchor" href="#_4-mysql-小文件系统" aria-hidden="true">#</a> 4.MySQL+小文件系统</h3>
<h3 id="_5-mysql-inforbright统计分析架构" tabindex="-1"><a class="header-anchor" href="#_5-mysql-inforbright统计分析架构" aria-hidden="true">#</a> 5.MySQL+Inforbright统计分析架构</h3>
<p>慢 非常耗时！</p>
<p><img src="https://i.loli.net/2020/09/28/J48Ca9LnkuQMvPZ.png" alt="image-20200928124715036"></p>
<p>海量数据导入10W+</p>
<p><img src="https://i.loli.net/2020/09/28/HvRfuU91Ygp5284.png" alt="image-20200928125032913"></p>
<p>修改PXC配置文件
[mysqld]
innodb_flush_log_at_trx_commit= o
innodb_flush_method = O_DIRECT
innodb_buffer_pool_size = 200M</p>
<h2 id="大数据mysql-分页查询加速" tabindex="-1"><a class="header-anchor" href="#大数据mysql-分页查询加速" aria-hidden="true">#</a> 大数据MySql 分页查询加速</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>#原本的Mysql 分页查询
select * from test limit 5000000,100;
# 优化一
select * from test where id&gt;=50000000 limit 100;
# 优化三
select * from test where id&gt;=50000000 and id&lt;=50000000+100;
#不连贯的表怎么优化
#1逻辑删除
#2使用如下方法
SELECT tid, tname FROM t test t JOIN (SELECT id FROM t test LIMIT 5000000, 100) tmp ON tid =tmp.id;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="大数据中重复写入的案例" tabindex="-1"><a class="header-anchor" href="#大数据中重复写入的案例" aria-hidden="true">#</a> 大数据中重复写入的案例</h2>
<p><img src="https://i.loli.net/2020/10/12/p6lFqmKQASehgy2.png" alt="image-20201012143043634"></p>
<p>网络重复请求导致重复发卡导致损失</p>
<p>解决方法</p>
<p>1、前端拦截</p>
<p>2、使用redis 计数器 （redis 加锁）死锁？</p>
<p>3、令牌拦截</p>
<h2 id="数据库高并发访问优化" tabindex="-1"><a class="header-anchor" href="#数据库高并发访问优化" aria-hidden="true">#</a> 数据库高并发访问优化</h2>
<p>不在数据库做运算</p>
<p>CPUi计算务必须移至业务层</p>
<p>控制字段数量(少而精,注意拆分)</p>
<p>平衡范式与冗余(效率优先,可以牺牲范式)</p>
<p>拒绝大sql语句、拒绝大事物、拒绝大批量</p>
<h3 id="mysql数据库设计-字段设计原则" tabindex="-1"><a class="header-anchor" href="#mysql数据库设计-字段设计原则" aria-hidden="true">#</a> MySQL数据库设计:字段设计原则</h3>
<p>用恰当的数据类型·字符转化为数字(节约空间,提高查询性能)</p>
<p>避免使用NULL字段(NULL很难查询优化、索引需要额外空间,而且复合索引无效)·</p>
<p>少用text类型(尽量使用varchar代替text字段);</p>
<h3 id="mysql数据库设计-索引设计原则" tabindex="-1"><a class="header-anchor" href="#mysql数据库设计-索引设计原则" aria-hidden="true">#</a> MySQL数据库设计:索引设计原则</h3>
<p>合理使用索引 (改善查询,减慢更新)</p>
<p>长字符串字段必须建前缀索引</p>
<p>不在索引做列运算</p>
<p>不用外键(使用逻辑外键)</p>
<h3 id="mysql数据库设计-sql设计原则" tabindex="-1"><a class="header-anchor" href="#mysql数据库设计-sql设计原则" aria-hidden="true">#</a> MySQL数据库设计: SQL设计原则</h3>
<p>sQL语句尽可能简单</p>
<p>简单的事务避免使用触发器和存储过程</p>
<p>OR改写成IN</p>
<p>OR写成UNION</p>
<p>MYSQL+REDIS</p>
<p>Canal</p>
<h2 id="大数据归档-冷热数据归档" tabindex="-1"><a class="header-anchor" href="#大数据归档-冷热数据归档" aria-hidden="true">#</a> 大数据归档（冷热数据归档）</h2>
<p>数据归档‘按月、年进行归档</p>
<p><img src="https://i.loli.net/2020/10/13/TU8oSOFVDXlgKb3.png" alt="image-20201013100928540"></p>
<p>不建议InnoDB使用TokuDB</p>
<p>TokuDB引擎的优点</p>
<ol>
<li>高压缩比</li>
<li>高写入性能</li>
<li>在线创建索引和字段</li>
<li>支持事物</li>
<li>支持主从同步</li>
</ol>
<p>安装TokuDB引擎</p>
<p><img src="https://i.loli.net/2020/10/13/NQuClYV9an8gm5h.png" alt="image-20201013134254745"></p>
<p>大数据归档工具</p>
<pre><code>Percona工具包 
pt-online-schema-change 
pt-query-advisor 
pt-archiver 
....
Percona-Toolkit
</code></pre>
<p>pt-archiver的用途</p>
<p>导出线上数据,到线下数据作处理清理过期数据,并把数据归档到本地归档表中,或者远端归档服务器</p>
<h2 id="执行数据归档" tabindex="-1"><a class="header-anchor" href="#执行数据归档" aria-hidden="true">#</a> 执行数据归档</h2>
<ul>
<li>
<p>安装pt-archiver</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> percona-toolkit
pt-archiver --version
pt-archiver --help
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>执行数据归档</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pt-archiver --source <span class="token assign-left variable">h</span><span class="token operator">=</span><span class="token number">192.168</span>.99.102,P<span class="token operator">=</span><span class="token number">8066</span>,u<span class="token operator">=</span>admin,p<span class="token operator">=</span>Abc_123456,D<span class="token operator">=</span>test,t<span class="token operator">=</span>t_purchase --dest <span class="token assign-left variable">h</span><span class="token operator">=</span><span class="token number">192.168</span>.99.102,P<span class="token operator">=</span><span class="token number">3306</span>,u<span class="token operator">=</span>admin,p<span class="token operator">=</span>Abc_123456,D<span class="token operator">=</span>test,t<span class="token operator">=</span>t_purchase --no-check-charset --where <span class="token string">'purchase_date&lt;"2018-09"'</span> --progress <span class="token number">5000</span> --bulk-delete --bulk-insert --limit<span class="token operator">=</span><span class="token number">10000</span> --statistics
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<p>逻辑库文件解析</p>
<p>opt  用来描述字符集和字符集的排序</p>
<p>frm 数据表的定义数据结构信息文件</p>
<p>MyISAM</p>
<p>IBD  可以编译文件</p>
<h2 id="数据库备份" tabindex="-1"><a class="header-anchor" href="#数据库备份" aria-hidden="true">#</a> 数据库备份</h2>
<h3 id="数据库表碎片整理" tabindex="-1"><a class="header-anchor" href="#数据库表碎片整理" aria-hidden="true">#</a> 数据库表碎片整理</h3>
<p>alter table 表名 engine=InnoDB
使用之前要把mysql 配置文件中的conf 给注释掉</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>#log_bin
#log_slave_updates
相关的文件对应的内容
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="数据库联机冷备份" tabindex="-1"><a class="header-anchor" href="#数据库联机冷备份" aria-hidden="true">#</a> 数据库联机冷备份</h3>
<p>通过脚本批量表碎片整理</p>
<p>然后在备份表数据  备份表分区</p>
<h3 id="数据库联机热备份" tabindex="-1"><a class="header-anchor" href="#数据库联机热备份" aria-hidden="true">#</a> 数据库联机热备份</h3>
<p>热备份是在数据库运行的状态下备份数据,也是难度最大的备份</p>
<p>PXC常见的热备份有LVM和XtraBackup两种方案</p>
<p>XtraBackup优势</p>
<p>◆XtraBackup备份过程加读锁，数据可读，但是不可写</p>
<p>◆XtraBackup备份过程不会打断正在执行的事务</p>
<p>全量备份和增量备份</p>
<p>◆全量备份是备份全部数据。备份过程时间长，占用空间大</p>
<p>增量备份是只备份变化的那部分数据。备份时间短，占用空间小</p>
<p>XtraBackup备份原理</p>
<p>XtraBackup是一种物理备份工具，通过协议连接到MySQL服务端，然后读取并复制底层的文件，完成物理备份</p>
<p><img src="https://i.loli.net/2020/10/14/3EQh78BcpAR2eKx.png" alt="image-20201014114458401"></p>
<p>XtraBackup安装</p>
<p>https://www.percona.com/downloads/Percona-XtraBackup-LATEST/</p>
<p>XtraBackup命令种类</p>
<table>
<thead>
<tr>
<th>序号</th>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>xbcrypt</td>
<td>用于加密或解密备份的数据</td>
</tr>
<tr>
<td>2</td>
<td>xbstream</td>
<td>用于压缩或者解压缩xbstream文件</td>
</tr>
<tr>
<td>3</td>
<td>xtrabackup</td>
<td>备份lnnoDB数据表（只备份数据文件，不备份结构文件）</td>
</tr>
<tr>
<td>4</td>
<td>innobackupex</td>
<td>是上面三种命令的perl脚本封装</td>
</tr>
</tbody>
</table>
<p>Xtrabackup 全量热备份</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span> /home/backup
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>备份docker里面的数据库文件时失败时---&gt;  将你容器中的mysql端口映射一个宿主机的端口出来，使用外部的ip 端口</p>
<p>流式备份</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span>  --no-timestamp --stream<span class="token operator">=</span>xbstream -<span class="token operator">></span> /home/backup.xbstream
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>加密备份</p>
<p>使用加密备份</p>
<table>
<thead>
<tr>
<th>序号</th>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>encrypt</td>
<td>用于加密的算法：AES128、AES192、AES256</td>
</tr>
<tr>
<td>2</td>
<td>encrypt-threads</td>
<td>执行加密的线程数</td>
</tr>
<tr>
<td>3</td>
<td>encrypt-chunk-size</td>
<td>加密线程的缓存大小</td>
</tr>
<tr>
<td>4</td>
<td>encrypt-key</td>
<td>密钥字符(24个字符)</td>
</tr>
<tr>
<td>5</td>
<td>encryption-key-file</td>
<td>密钥文件</td>
</tr>
</tbody>
</table>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span> --encrypt<span class="token operator">=</span>AES256 --encrypt-threads<span class="token operator">=</span><span class="token number">10</span> --encrypt-chunk-size <span class="token number">512</span>  --no-timestamp --stream<span class="token operator">=</span>xbstream -<span class="token operator">></span> /home/backup.xbstream
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>脚本脚本进行热备份</p>
<p>Linux Cron 表达式</p>
<p><img src="https://i.loli.net/2020/10/14/M2GQkEZweNdAhyl.png" alt="image-20201014163119898"></p>
<p><img src="https://i.loli.net/2020/10/14/Law9xHYy25vEVWp.png" alt="image-20201014163143017"></p>
<p>Corntab介绍</p>
<p>◆Crontab命令被用来提交和管理用户的需要周期性执行的任务</p>
<p>◆Linux会自动启动Crontab进程，Crontab会每分钟定期检查是否有要执行的任务，如果有，则自动执行</p>
<p>Crontab管理命令</p>
<p>$service crontab start</p>
<p>$ service crontab stop</p>
<p>$service crontab restart</p>
<p>Crontab任务分类</p>
<p>◆Linux系统中任务调度分为系统调度和用户调度</p>
<p>◆系统调度：/etc/crontab</p>
<p>◆用户调度：/var/spool/cron/crontab</p>
<pre><code>CronTab命令
$ crontab参数
-1打印用户任务列表u。
-r删除用户任务列表
-e编辑用户任务列表
</code></pre>
<p>编写sh脚本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">"+%Y-%m-%d %H:%M:%S"</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span><span class="token string">"执行全量热备份 <span class="token variable">${time}</span>"</span>
innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span> --encrypt<span class="token operator">=</span>AES256 --encrypt-threads<span class="token operator">=</span><span class="token number">10</span> --encrypt-key<span class="token operator">=</span><span class="token number">111111111111111111111111</span> --encrypt-chunk-size <span class="token number">512</span>--stream<span class="token operator">=</span>xbstream -<span class="token operator">></span> /home/demol.xbstream
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>chmod -R 777 ./backuMysql.sh</p>
<p>配置Crontab</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">crontab</span> -e 

<span class="token comment"># 以下为编辑状态 xxx 为定时的表达式  2>&amp;1 打印错误和正确的日志</span>
xxxx /home/shell/demo1.sh <span class="token operator">></span> /home/log/demo1.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>全量冷还原</p>
<p>冷还原前的准备工作</p>
<p>◆关闭MySQL，清空数据目录，包括表分区的目录</p>
<p>◆回滚没有提交的事物，同步已经提交的事务到数据文件</p>
<p>清除事务指令</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>1、停掉MySQL
2、删除mysql数据目录
3、清理表分区（如果有的话）
4、


innobackupex --apply-log /home/backup/2018-09-12_10-1-1

执行全量冷还原 
innobackupex --defaults-file=/etc/my.cnf --copy-back /home/backup/2018-09-12_10-53-51 
chown -R mysql:mysql /var/lib/mysql/*
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>流式备份文档冷还原</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>创建临时目录
mkdir /home/temp 
解压文件
xbstream -x &lt; /home/backup.xbstream -C /home/temp
解密
innobackupex --decompress --decrypt=AES256 --encrypt-key=111111111111111111111111 /home/temp
还原
innobackupex --copy-back --defaults-file=/etc/my.cnf /home/temp
设置所属用户和权限
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>增量热备份</p>
<p>增量热备份的注意事项</p>
<ol>
<li>无论全量热备份使用了流式压缩，还是内容加密，都必须解密解压缩成普通全量热备份</li>
<li>增量热备份可以使用流式压缩或者内容加密</li>
<li>--incremental  关键字</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc <span class="token number">123456</span> --port<span class="token operator">=</span><span class="token number">3306</span> --incremental-basedir<span class="token operator">=</span>/home/backup/2018-09- 12_21-27-50 --incremental /home/backup/increment
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>加密的</p>
<p><img src="https://i.loli.net/2020/10/15/B9INuKepihsYrbz.png" alt="image-20201015172304973"></p>
<p><img src="https://i.loli.net/2020/10/15/OpjbazmZdJ1U7A6.png" alt="image-20201015171350931"></p>
<p>使用Java定时任务来进行定时增量热备份</p>
<p>增量冷恢复</p>
<p>处理事物日志</p>
<p>innobackupex -apply-log --redo-only /home/backup/2018- 09-1221-27-50</p>
</template>
