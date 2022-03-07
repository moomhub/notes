<template><h1 id="mysql-数据库" tabindex="-1"><a class="header-anchor" href="#mysql-数据库" aria-hidden="true">#</a> MySql 数据库</h1>
<h2 id="数据库函数" tabindex="-1"><a class="header-anchor" href="#数据库函数" aria-hidden="true">#</a> 数据库函数</h2>
<h3 id="存储过程" tabindex="-1"><a class="header-anchor" href="#存储过程" aria-hidden="true">#</a> 存储过程</h3>
<p>存储过程是一个编译后的SQL脚本集合，可以单独调用，但是不能用在SQL语句中</p>
<h3 id="存储过程的优点" tabindex="-1"><a class="header-anchor" href="#存储过程的优点" aria-hidden="true">#</a> 存储过程的优点</h3>
<p>存储过程是编译过的SQL脚本，所以执行的速度非常快
实现了SQL编程，可以降低锁表的时间和锁表的范围</p>
<h3 id="为什么要放弃数据库编程" tabindex="-1"><a class="header-anchor" href="#为什么要放弃数据库编程" aria-hidden="true">#</a> 为什么要放弃数据库编程?</h3>
<p>在数据库集群场景里，因为存储过程、触发器和自定义函数，都是在本地数据库执行，所以无法兼容集群场景。</p>
<h2 id="mysql-读写解决方案" tabindex="-1"><a class="header-anchor" href="#mysql-读写解决方案" aria-hidden="true">#</a> Mysql 读写解决方案</h2>
<h3 id="系统负载解决的方案" tabindex="-1"><a class="header-anchor" href="#系统负载解决的方案" aria-hidden="true">#</a> 系统负载解决的方案</h3>
<h4 id="低价值的数据-读多写少" tabindex="-1"><a class="header-anchor" href="#低价值的数据-读多写少" aria-hidden="true">#</a> 低价值的数据（读多写少）</h4>
<p>可以采用NoSQL数据库来存储这些数据，NoSQL没有抛弃了复杂的表结构和约束，数据的写入速度很快</p>
<h4 id="高价值的数据-写多读少" tabindex="-1"><a class="header-anchor" href="#高价值的数据-写多读少" aria-hidden="true">#</a> 高价值的数据（写多读少）</h4>
<p>可以用TokuDB来保存，TokuDB的写入速度的是lnnoDB的9~20倍</p>
<h2 id="mysql-读写锁机制" tabindex="-1"><a class="header-anchor" href="#mysql-读写锁机制" aria-hidden="true">#</a> MySql  读写锁机制</h2>
<h3 id="什么是锁机制" tabindex="-1"><a class="header-anchor" href="#什么是锁机制" aria-hidden="true">#</a> 什么是锁机制</h3>
<p>lnnoDB采用的是行级锁，删改数据的时候，MySQL会锁住记录</p>
<blockquote>
<p>排它锁不允许对数据再另行加锁</p>
</blockquote>
<p>共享锁和排它锁</p>
<ol>
<li>行级锁分为共享锁(S锁)和排它锁（X锁)</li>
<li>共享锁和排它锁，都不允许其他事务执行写操作，但是可以读数据</li>
</ol>
<h3 id="共享锁" tabindex="-1"><a class="header-anchor" href="#共享锁" aria-hidden="true">#</a> 共享锁</h3>
<p>只有serializable事务隔离级别，才会给数据读取添加共享锁</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT .......FROM .......LOCK IN SHARE MODE;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="排它锁" tabindex="-1"><a class="header-anchor" href="#排它锁" aria-hidden="true">#</a> 排它锁</h3>
<p>MySQL默认会给添加、修改和删除记录，设置排它锁</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT .......FROM .......FOR UPDATE;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="如何减少并发操作的所冲突" tabindex="-1"><a class="header-anchor" href="#如何减少并发操作的所冲突" aria-hidden="true">#</a> 如何减少并发操作的所冲突?</h3>
<p>把复杂的SQL语句，拆分成多条简单的SQL语句</p>
<p>数据库修改密码编码方式</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>ALTER USER 'root'@'%' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'abc123456';
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="数据库事务" tabindex="-1"><a class="header-anchor" href="#数据库事务" aria-hidden="true">#</a> 数据库事务</h2>
<p>避免直接操作数据文件</p>
<p><img src="http://cdn.oboom.top/doc/image-20210913114826154.png" alt="image-20210913114826154"></p>
<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h1>
<h2 id="xss攻击" tabindex="-1"><a class="header-anchor" href="#xss攻击" aria-hidden="true">#</a> XSS攻击</h2>
<p>XSS(跨站脚本)攻击，是让浏览器渲染DOM的时候意外的执行了恶意JS代码
XSS攻击的原理是在网页中嵌入一个恶意脚本
img src=&quot;null&quot; onerror='alert( document.cookie)'/&gt;</p>
<h3 id="antisamy" tabindex="-1"><a class="header-anchor" href="#antisamy" aria-hidden="true">#</a> AntiSamy</h3>
<p>AntiSamy是开源的Java类库，可以用来过滤XSS恶意代码</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.owasp.antisamy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>antisamy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.5.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><img src="http://cdn.oboom.top/doc/image-20210914165918851.png" alt="image-20210914165918851"></p>
<p><img src="http://cdn.oboom.top/doc/image-20210914165943393.png" alt="image-20210914165943393"></p>
<h3 id="jsoup-推荐使用" tabindex="-1"><a class="header-anchor" href="#jsoup-推荐使用" aria-hidden="true">#</a> Jsoup（推荐使用）</h3>
<p>使用Jsoup防止富文本 XSS 攻击</p>
<h2 id="mysql常用工具" tabindex="-1"><a class="header-anchor" href="#mysql常用工具" aria-hidden="true">#</a> MySQL常用工具</h2>
<h3 id="percona-tookit" tabindex="-1"><a class="header-anchor" href="#percona-tookit" aria-hidden="true">#</a> Percona Tookit</h3>
<h4 id="download" tabindex="-1"><a class="header-anchor" href="#download" aria-hidden="true">#</a> Download</h4>
<p><a href="https://www.percona.com/downloads/percona-toolkit/LATEST/" target="_blank" rel="noopener noreferrer">Download Percona Toolkit<ExternalLinkIcon/></a></p>
<p>解压相关数据包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> -zxvf percona-toolkit-3.3.1_x86_64.tar.gz
<span class="token function">tar</span> xzvf xxx.tar.gz -C /tmp/xxx
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>进入 /bin目录</p>
<h4 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h4>
<p>使用PerconaTookit工具：Percona公司提供了维护MySQL的PerconaTookit工具包
pt-online-schema-change可以完成在线修改表结构</p>
<table>
<thead>
<tr>
<th style="text-align:center">参数</th>
<th style="text-align:center">实际含义</th>
<th style="text-align:center">参数</th>
<th style="text-align:center">实际含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">--host</td>
<td style="text-align:center">IP地址</td>
<td style="text-align:center">t</td>
<td style="text-align:center">数据表</td>
</tr>
<tr>
<td style="text-align:center">--user</td>
<td style="text-align:center">用户名</td>
<td style="text-align:center">--alter</td>
<td style="text-align:center">修改语句</td>
</tr>
<tr>
<td style="text-align:center">--password</td>
<td style="text-align:center">密码</td>
<td style="text-align:center">--execute</td>
<td style="text-align:center">执行修改</td>
</tr>
<tr>
<td style="text-align:center">--port</td>
<td style="text-align:center">端口号</td>
<td style="text-align:center">--dry-run</td>
<td style="text-align:center">测试执行</td>
</tr>
<tr>
<td style="text-align:center">D</td>
<td style="text-align:center">逻辑库</td>
<td style="text-align:center">--print</td>
<td style="text-align:center">打印过程</td>
</tr>
</tbody>
</table>
<p>数据库语句参考</p>
<blockquote>
<p>把数据为：neti 数据表为 t_customer_address 收货人字段：name 改成VARCHAR(20)</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
pt-online-schema-change --host<span class="token operator">=</span><span class="token number">192.168</span>.99.202 --port<span class="token operator">=</span><span class="token number">3306</span> --user<span class="token operator">=</span>root --password<span class="token operator">=</span>abc123456 --alter <span class="token string">"MODIFY name VARCHAR(20) NOT NULL COMMENT '收货人"</span> <span class="token assign-left variable">D</span><span class="token operator">=</span>neti, <span class="token assign-left variable">t</span><span class="token operator">=</span>t_customer_address --print --execute
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
