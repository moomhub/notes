<template><h1 id="数据库的备份和恢复-热备份" tabindex="-1"><a class="header-anchor" href="#数据库的备份和恢复-热备份" aria-hidden="true">#</a> 数据库的备份和恢复（热备份）</h1>
<blockquote>
<p>一般来说数据备份分为冷备份和热备份，不同的备份方式都有优缺点</p>
</blockquote>
<h2 id="一、数据库联机热备份" tabindex="-1"><a class="header-anchor" href="#一、数据库联机热备份" aria-hidden="true">#</a> 一、数据库联机热备份</h2>
<p>热备份是在数据库运行的状态下备份数据,也是难度最大的备份</p>
<p>PXC常见的热备份有LVM和XtraBackup两种方案，这边选择XtraBackup来进行热备份</p>
<h2 id="二、xtrabackup优势" tabindex="-1"><a class="header-anchor" href="#二、xtrabackup优势" aria-hidden="true">#</a> 二、XtraBackup优势</h2>
<h3 id="_1、xtrabackup优势" tabindex="-1"><a class="header-anchor" href="#_1、xtrabackup优势" aria-hidden="true">#</a> 1、XtraBackup优势</h3>
<ol>
<li>XtraBackup备份过程加读锁，数据可读，但是不可写</li>
<li>XtraBackup备份过程不会打断正在执行的事务</li>
</ol>
<h3 id="_2、全量备份和增量备份" tabindex="-1"><a class="header-anchor" href="#_2、全量备份和增量备份" aria-hidden="true">#</a> 2、全量备份和增量备份</h3>
<p>全量备份是备份全部数据。备份过程时间长，占用空间大</p>
<p>增量备份是只备份变化的那部分数据。备份时间短，占用空间小</p>
<h3 id="_3、xtrabackup备份原理" tabindex="-1"><a class="header-anchor" href="#_3、xtrabackup备份原理" aria-hidden="true">#</a> 3、XtraBackup备份原理</h3>
<p>XtraBackup是一种物理备份工具，通过协议连接到MySQL服务端，然后读取并复制底层的文件，完成物理备份</p>
<p><img src="https://i.loli.net/2020/10/14/3EQh78BcpAR2eKx.png" alt="image-20201014114458401"></p>
<h2 id="三、xtrabackup安装" tabindex="-1"><a class="header-anchor" href="#三、xtrabackup安装" aria-hidden="true">#</a> 三、XtraBackup安装</h2>
<p>XtraBackup 官网 https://www.percona.com/downloads/Percona-XtraBackup-LATEST/（对应不同的操作系统，有不同的安装方式）</p>
<h2 id="四、xtrabackup命令种类" tabindex="-1"><a class="header-anchor" href="#四、xtrabackup命令种类" aria-hidden="true">#</a> 四、XtraBackup命令种类</h2>
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
<h2 id="五、xtrabackup-全量热备份" tabindex="-1"><a class="header-anchor" href="#五、xtrabackup-全量热备份" aria-hidden="true">#</a> 五、Xtrabackup 全量热备份</h2>
<h3 id="_1、基础全量热备份-不建议这样使用" tabindex="-1"><a class="header-anchor" href="#_1、基础全量热备份-不建议这样使用" aria-hidden="true">#</a> 1、基础全量热备份（不建议这样使用）</h3>
<p>输入如下命令</p>
<blockquote>
<p>/home/backup 是备份的目录
defaults-file 是配置文件地址</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span> /home/backup
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><em>❗❗❗   docker备份docker里面的数据库文件时失败时---&gt;  将你容器中的mysql端口映射一个宿主机的端口出来，使用外部的ip 端口</em></p>
<h3 id="_2、流式全量热备份-推荐使用" tabindex="-1"><a class="header-anchor" href="#_2、流式全量热备份-推荐使用" aria-hidden="true">#</a> 2、流式全量热备份（推荐使用）</h3>
<blockquote>
<p><strong>--no-timestamp 设置不创建时间戳文件夹使用自己定义的路径</strong></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span>  --no-timestamp --stream<span class="token operator">=</span>xbstream -<span class="token operator">></span> /home/backup.xbstream
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_3、流式全量热加密备份" tabindex="-1"><a class="header-anchor" href="#_3、流式全量热加密备份" aria-hidden="true">#</a> 3、流式全量热加密备份</h3>
<p>加密备份参数说明</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_4、使用脚本进行热备份" tabindex="-1"><a class="header-anchor" href="#_4、使用脚本进行热备份" aria-hidden="true">#</a> 4、使用脚本进行热备份</h3>
<p>Linux CronTab表达式（通常是5位）</p>
<p>生成CronTab的在线网站 <strong>https://www.pppet.net/</strong></p>
<p>校验CRON表达式的网站 <strong>https://tool.lu/crontab/</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>0 */12 * * 0,6 这个表达式的是再每周星期天和星期六中的0点和12点中执行
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://i.loli.net/2020/10/14/M2GQkEZweNdAhyl.png" alt="image-20201014163119898"></p>
<p>Corntab介绍</p>
<ol>
<li>Crontab命令被用来提交和管理用户的需要周期性执行的任务</li>
<li>Linux会自动启动Crontab进程，Crontab会每分钟定期检查是否有要执行的任务，如果有，则自动执行</li>
</ol>
<p>Crontab管理命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">service</span> <span class="token function">crontab</span> start
<span class="token function">service</span> <span class="token function">crontab</span> stop 
<span class="token function">service</span> <span class="token function">crontab</span> restart 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Crontab任务分类</p>
<ol>
<li>
<p>Linux系统中任务调度分为系统调度和用户调度</p>
</li>
<li>
<p>系统调度：/etc/crontab</p>
</li>
<li>
<p>用户调度：/var/spool/cron/crontab</p>
<p>crontab [ -u user ] { -l | -r | -e }
-e : 执行文字编辑器来设定时程表
-r : 删除目前的时程表
-l : 列出目前的时程表</p>
</li>
</ol>
<p>编写sh脚本,shell脚本内容如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">"+%Y-%m-%d %H:%M:%S"</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span><span class="token string">"执行全量热备份 <span class="token variable">${time}</span>"</span>
innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span> --encrypt<span class="token operator">=</span>AES256 --encrypt-threads<span class="token operator">=</span><span class="token number">10</span> --encrypt-key<span class="token operator">=</span><span class="token number">111111111111111111111111</span> --encrypt-chunk-size <span class="token number">512</span>--stream<span class="token operator">=</span>xbstream -<span class="token operator">></span> /home/demol.xbstream
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果需要的还需要设置脚本的执行权限 ：chmod -R 777 ./backuMysql.sh</p>
<p>配置Crontab 编写运行脚本的定时命令如下所示</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">crontab</span> -e 

<span class="token comment"># 以下为编辑状态 xxx 为定时的表达式  2>&amp;1 打印错误和正确的日志</span>
xxxx /home/shell/demo1.sh <span class="token operator">></span> /home/log/demo1.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="六、全量冷还原" tabindex="-1"><a class="header-anchor" href="#六、全量冷还原" aria-hidden="true">#</a> 六、全量冷还原</h2>
<blockquote>
<p>所有的冷还原都需要先停掉Mysql服务</p>
</blockquote>
<h3 id="_1、普通冷还原" tabindex="-1"><a class="header-anchor" href="#_1、普通冷还原" aria-hidden="true">#</a> 1、普通冷还原</h3>
<p>冷还原前的准备工作</p>
<ol>
<li>关闭MySQL，清空数据目录，包括表分区的目录</li>
<li>回滚没有提交的事物，同步已经提交的事务到数据文件</li>
</ol>
<p>1、停掉MySQL
2、删除mysql数据目录
3、清理表分区（如果有的话）
4、执行命令清除事务</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>事务清除指令
innobackupex --apply-log /home/backup/2018-09-12_10-1-1

执行全量冷还原 
innobackupex --defaults-file=/etc/my.cnf --copy-back /home/backup/2018-09-12_10-53-51 
chown -R mysql:mysql /var/lib/mysql/*
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_2、流式加密备份冷还原" tabindex="-1"><a class="header-anchor" href="#_2、流式加密备份冷还原" aria-hidden="true">#</a> 2、流式加密备份冷还原</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建临时目录</span>
<span class="token function">mkdir</span> /home/temp 
<span class="token comment"># 解压文件</span>
xbstream -x <span class="token operator">&lt;</span> /home/backup.xbstream -C /home/temp
<span class="token comment"># 解密</span>
innobackupex --decompress --decrypt<span class="token operator">=</span>AES256 --encrypt-key<span class="token operator">=</span><span class="token number">111111111111111111111111</span> /home/temp
<span class="token comment"># 还原</span>
innobackupex --copy-back --defaults-file<span class="token operator">=</span>/etc/my.cnf /home/temp
<span class="token comment"># 设置解压文件所属用户和权限</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="七、增量热备份" tabindex="-1"><a class="header-anchor" href="#七、增量热备份" aria-hidden="true">#</a> 七、增量热备份</h2>
<blockquote>
<p>在进行增量备份时，首先要进行一次全量备份，第一次增量备份是基于全备的，之后的增量备份是基于上一次的增量备份，以此类推。</p>
</blockquote>
<p>增量热备份的注意事项</p>
<ol>
<li><strong>无论全量热备份使用了流式压缩，还是内容加密，都必须解密解压缩成普通全量热备份</strong>（如果全量备份是加密的，要先解密成普通全量备份然后才能使用增量热备份）</li>
<li>增量热备份可以使用流式压缩或者内容加密</li>
<li>--incremental  关键字</li>
<li>--incremental-basedir 是全量热备份的目录</li>
<li>一样要先有全量热备份文件才行</li>
<li><strong>每次增量热备份都是基于前一次增量热备份的目录进行的也就是每次进行增量热备份时脚本中的--incremental-basedir都是不同的都是基于上次增量热备份的目录来进行备份的</strong></li>
</ol>
<p>增量热备份实例</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span> --incremental-basedir<span class="token operator">=</span>/home/backup/2018-09-12_21-27-50 --incremental /home/backup/increment
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>加密的增量热备份实例</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>innobackupex --defaults-file<span class="token operator">=</span>/etc/my.cnf --host<span class="token operator">=</span><span class="token number">192.168</span>.99.151 --user<span class="token operator">=</span>admin --password<span class="token operator">=</span>Abc_123456 --port<span class="token operator">=</span><span class="token number">3306</span> --incremental-basedir<span class="token operator">=</span>/home/backup/2018-09-12_21-27-50 --incremental /home/backup/increment --compress-threads<span class="token operator">=</span><span class="token number">10</span> --enceypt<span class="token operator">=</span>AES256 --enceypt-threads<span class="token operator">=</span><span class="token number">10</span> --enceypt-key<span class="token operator">=</span><span class="token number">1111111111111111111111111</span> --stream<span class="token operator">=</span>xbstream ./ <span class="token operator">></span> /home/backup/incremental
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://i.loli.net/2020/10/15/B9INuKepihsYrbz.png" alt="image-20201015172304973"></p>
<p>备份原理</p>
<p><img src="https://i.loli.net/2020/10/15/OpjbazmZdJ1U7A6.png" alt="image-20201015171350931"></p>
<p>Java程序来进行增量热备份</p>
<blockquote>
<p>先创建一个记录的日志的文件，然后Java程序读取文件地址开始进行增量热备份</p>
</blockquote>
<p>使用Java定时任务来进行定时增量热备份</p>
<h2 id="八、增量冷恢复" tabindex="-1"><a class="header-anchor" href="#八、增量冷恢复" aria-hidden="true">#</a> 八、增量冷恢复</h2>
<p>增量备份的恢复大体为3个步骤</p>
<ul>
<li>恢复完全备份</li>
<li>恢复增量备份到完全备份（开始恢复的增量备份要添加–redo-only参数，到最后一次增量备份去掉–redo-only参数）</li>
<li>对整体的完全备份进行恢复，回滚那些未提交的数据</li>
</ul>
<p>恢复完全备份（注意这里一定要加–redo-only参数，该参数的意思是只应用xtrabackup日志中已提交的事务数据，不回滚还未提交的数据）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 恢复完全备份</span>
innobackupex -apply-log --redo-only /home/backup/2018-09-1221-27-50
<span class="token comment"># 将增量备份1应用到完全备份（注意恢复最后一个增量备份时需要去掉–redo-only参数，回滚xtrabackup日志中那些还未提交的数据）</span>
innobackupex --apply-log --redo-only /data/backup/full/2014-04-07_23-37-20/ --incremental-dir<span class="token operator">=</span>/data/backup/incremental/2014-04-07_23-42-46/
<span class="token comment"># 把所有合在一起的完全备份整体进行一次apply操作，回滚未提交的数据：</span>
innobackupex --apply-log /data/backup/full/2014-04-07_23-37-20/
<span class="token comment">#关闭数据并且删除数据目录</span>
<span class="token comment"># 把恢复完的备份复制到数据库目录文件中，赋权，然后启动mysql数据库，检测数据正确性</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="九、利用延时同步备份防止误操作" tabindex="-1"><a class="header-anchor" href="#九、利用延时同步备份防止误操作" aria-hidden="true">#</a> 九、利用延时同步备份防止误操作</h2>
<p>主从同步</p>
<p>设置主从同步</p>
<ol>
<li>
<p>主节点必须开启binlog日志，主从节点都要开启server_id</p>
</li>
<li>
<p>主节点的同步账号必须具有reload、super、replication slave权限</p>
</li>
<li>
<p>从节点必须开启relay_log日志</p>
</li>
<li>
<p>主从节点的配置文件都要开启GTID，否则无法利用延时节点找回数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 主节点配置</span>
<span class="token assign-left variable">gtid_mode</span><span class="token operator">=</span>ON
<span class="token assign-left variable">enforce_gtid_consistency</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token comment"># 从节点配置</span>
<span class="token assign-left variable">gtid_mode</span><span class="token operator">=</span>ON
<span class="token assign-left variable">enforce_gtid_consistency</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">relay_log</span><span class="token operator">=</span>relay_bin
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li>
</ol>
<p>从数据库相关的内容</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>
stop slave;
change master to master_host='XXX',master_port=3306,master_user='admin',master_password='11';
# 设置延迟同步时间（秒）
change master to master_delay='300';
start slave;
show slave status;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>主数据查询事务节点</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>show master log;
show binlog events in '日志文件的名字，然后找到误删除的事务的ID'
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>从数据库设置</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>stop slave;
set gtid_next ='查询到的ID'
begin;commit;
set gtid_next ='automatic'
change master to master_delay='0';
start slave;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>恢复主节点误删除故障</p>
<ol>
<li>停止PXC集群的业务操作，不要让业务系统读写数据库</li>
<li>导出从节点的数据，在主节点上创建临时库，导入数据</li>
<li>把主节点上业务表重命名，然后把临时库的业务表迁移到业务库</li>
</ol>
<h2 id="十、日志闪回方案" tabindex="-1"><a class="header-anchor" href="#十、日志闪回方案" aria-hidden="true">#</a> 十、日志闪回方案</h2>
<p>日志闪回方案的优点</p>
<ol>
<li>主从延时同步，一旦延时阶段没有发现问题、解决问题，数据同步之后，将无法利用从节点实现误删除恢复</li>
<li>日志闪回方案只利用当前节点恢复数据，简单易操作</li>
</ol>
<p>使用binlog2sql 来进行日志闪回</p>
</template>
