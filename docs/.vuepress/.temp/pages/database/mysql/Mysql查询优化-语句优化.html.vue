<template><h1 id="mysql-语句优化" tabindex="-1"><a class="header-anchor" href="#mysql-语句优化" aria-hidden="true">#</a> Mysql 语句优化</h1>
<blockquote>
<p>使用MySQL 官网提供的测试数据库来进行演示（DVD租赁公司）</p>
</blockquote>
<h2 id="where-查询过慢" tabindex="-1"><a class="header-anchor" href="#where-查询过慢" aria-hidden="true">#</a> where 查询过慢</h2>
<p>使用索引覆盖进行优化where语句。</p>
<p>覆盖索引指的是:查询语句从执行到返回结果均使用同一个索引，覆盖索引可以有效减少回表</p>
<blockquote>
<p>覆盖索引通过取消回表操作，提升查询效率，若数据的查询不只使用了一个索引，则不是覆盖索引，可以通过优化SQL语句或优化联合索引，来使用覆盖索引</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SHOW CREATE TABLE inventory;
# 创建表
CREATE TABLE `inventory_1` (
  `inventory_id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `film_id` SMALLINT UNSIGNED NOT NULL,
  `store_id` TINYINT UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  KEY `idx_fk_film_id` (`film_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

#复制数据
INSERT INTO inventory_1 SELECT * FROM inventory;

SELECT store_id, film_id FROM sakila.inventory WHERE store_id = 1;

SELECT store_id, film_id FROM sakila.inventory_1 WHERE store_id = 1;

EXPLAIN SELECT store_id, film_id FROM sakila.inventory WHERE store_id = 1;

EXPLAIN SELECT store_id, film_id FROM sakila.inventory_1 WHERE store_id = 1;

#索引覆盖
EXPLAIN SELECT inventory_id, store_id, film_id FROM sakila.inventory WHERE store_id = 1;
#回滚数据表 (减少不必要的字段) （查询中的字段中使用了last_update字段，该字段在数据库中并无索引）
EXPLAIN SELECT inventory_id, store_id, film_id,last_update FROM sakila.inventory WHERE store_id = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="如何确定合适的索引" tabindex="-1"><a class="header-anchor" href="#如何确定合适的索引" aria-hidden="true">#</a> 如何确定合适的索引</h3>
<p>如何确定用哪条索引</p>
<p>MySQL在选取索引时，会参考索引的基数(Cardinality)、基数是MySQL估算的，反映这个字段有多少种取值</p>
<blockquote>
<p>如果数据量过大，MySQL会自动选取几个页算出取值的平均值，再乘以页数，即为基数</p>
</blockquote>
<p>参考</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>#创建测试表并插入数据
CREATE TABLE `city_1` ( `city` VARCHAR(50) NOT NULL) ;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
# 打乱排序
UPDATE city_1 SET city =(SELECT city FROM city ORDER BY RAND() LIMIT 1);


#通过取前缀索引来划分相关的基数
ALTER TABLE sakila.city_1 ADD key (city(1));
ALTER TABLE sakila.city_1 ADD key (city(2));
ALTER TABLE sakila.city_1 ADD key (city(3));
ALTER TABLE sakila.city_1 ADD key (city(4));
ALTER TABLE sakila.city_1 ADD key (city(5));
ALTER TABLE sakila.city_1 ADD key (city(6));
ALTER TABLE sakila.city_1 ADD key (city(7));
ALTER TABLE sakila.city_1 ADD key (city(8));

SHOW INDEX FROM city_1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><img src="https://i.loli.net/2021/09/03/gawfzdjZroSep2h.png" alt="image-20210901161152550"></p>
<h3 id="重新计数" tabindex="-1"><a class="header-anchor" href="#重新计数" aria-hidden="true">#</a> 重新计数</h3>
<blockquote>
<p>analyze table 可以重新统计索引信息重新统计索引信息时，会重新计算索引的基数</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>analyze table city_1;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="强制使用某个索引" tabindex="-1"><a class="header-anchor" href="#强制使用某个索引" aria-hidden="true">#</a> 强制使用某个索引</h3>
<blockquote>
<p>关键字:  force index('xxx')</p>
</blockquote>
<p>例子</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT * FROM city_1 FORCE INDEX ('xxx') where xxx
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="count-计数优化" tabindex="-1"><a class="header-anchor" href="#count-计数优化" aria-hidden="true">#</a> count() 计数优化</h2>
<p>MySQL count()函数用来统计结果集中不为null的数据个数</p>
<ol>
<li>首先存储引擎查询出结果集</li>
<li>server层逐个结果判断是否为null，不为null则加1</li>
</ol>
<p><strong>理论上：count(非索引字段) &lt; count(索引字段) &lt; count(1) &lt; count(*)</strong></p>
<h3 id="count-非索引字段" tabindex="-1"><a class="header-anchor" href="#count-非索引字段" aria-hidden="true">#</a> count(非索引字段)</h3>
<p>count(非索引字段)时，server层需要判断每个数据是否为null</p>
<h3 id="count-索引字段" tabindex="-1"><a class="header-anchor" href="#count-索引字段" aria-hidden="true">#</a> count(索引字段)</h3>
<p>count(索引字段)，可以覆盖，依然需要每次判断字段是否为null，count(主键)，同理</p>
<h3 id="count-1" tabindex="-1"><a class="header-anchor" href="#count-1" aria-hidden="true">#</a> count(1)</h3>
<p>count(1)只有扫描索引树，没有解析数据行的过程，理论更快，但Server层依然每次需要判断“1是否为null&quot;</p>
<h3 id="count" tabindex="-1"><a class="header-anchor" href="#count" aria-hidden="true">#</a> count(*)</h3>
<p><code>count(*)</code>一般用来返回数据表行数
MylSAM的<code>count(*)</code>直接返回数据库中记录的数据表行数，由于InnoDB支持事务，数据库中不记录数据表行数
MySQL专门优化了count(*)函数直接返回索引树中数据的个数</p>
<h2 id="order-by-优化" tabindex="-1"><a class="header-anchor" href="#order-by-优化" aria-hidden="true">#</a> order by 优化</h2>
<h3 id="order-by步骤原理" tabindex="-1"><a class="header-anchor" href="#order-by步骤原理" aria-hidden="true">#</a> ORDER BY步骤原理</h3>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT * FROM `film` WHERE film_id &gt; 80 ORDER BY title;
#执行步骤
#1、查询where 语句
SELECT * FROM `film` WHERE film_id &gt; 80
#2、进行order排序
ORDER BY title
#3、回表生成完整结果集（若需要)
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="优化-order-by-中间结果集" tabindex="-1"><a class="header-anchor" href="#优化-order-by-中间结果集" aria-hidden="true">#</a> 优化 order by 中间结果集</h3>
<blockquote>
<p>原理：中间表较小时,会直接防止内存中，较大 <strong>sort_buffer_size</strong> 时 放在硬盘中。</p>
</blockquote>
<p>优化内存占用 :减少sort_buffer_size  减少内存 直接走硬盘数据(不推荐)</p>
<p>增大 sort_buffer_size (推荐)</p>
<h3 id="优化-order-by-回表生成完整结果集" tabindex="-1"><a class="header-anchor" href="#优化-order-by-回表生成完整结果集" aria-hidden="true">#</a> 优化 order by 回表生成完整结果集</h3>
<blockquote>
<p>当行小于max_length_for_sort_data时，生成全字段中间表</p>
</blockquote>
<p>大于阈值时，只生成排序字段＋主键中间表，需要回表，调大阈值并不一定改善效率，因为太大的结果集排序效率低</p>
<h3 id="order-by-进行索引覆盖" tabindex="-1"><a class="header-anchor" href="#order-by-进行索引覆盖" aria-hidden="true">#</a> order by 进行索引覆盖</h3>
<p>通过对中间进行索引</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>#ORDER字段需要有索引(或在联合索引左侧)\其他相关字段(条件、输出)均在上述的索引中
SELECT film_id, title FROM `film` ORDER BY title;

#如果需要添加where 只能对索引进行where 处理
SELECT film_id, title FROM`film` where title like 'M%' ORDER BY title
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="order-by-rand-优化-随机取法进行优化" tabindex="-1"><a class="header-anchor" href="#order-by-rand-优化-随机取法进行优化" aria-hidden="true">#</a> order by rand() 优化(随机取法进行优化)</h2>
<h3 id="order-by-rand-原理" tabindex="-1"><a class="header-anchor" href="#order-by-rand-原理" aria-hidden="true">#</a> ORDER BY RAND()原理</h3>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT title, description FROM `film`ORDER BY RAND()LIMIT 1;
# 执行顺序
1.创建一个临时表，临时表的字段为rand . title、description

2.从表中取出一行，调用RAND()，将结果和数据放入临时表，以此类推

3.针对临时表，将rand字段+行位置（主键)放入sort buffer
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>执行顺序</p>
<p><img src="https://i.loli.net/2021/09/03/4MeCskRzG7bcyIF.png" alt="image-20210901175007507"></p>
<p><img src="https://i.loli.net/2021/09/03/mtKfisCzeRYONVI.png" alt="image-20210901175017031"></p>
<p><img src="https://i.loli.net/2021/09/03/UxFpEtMRC2vP5Iq.png" alt="image-20210901175052299"></p>
<p><img src="https://i.loli.net/2021/09/03/ahtgmer4YiQFcEN.png" alt="image-20210901175208423"></p>
<h3 id="为什么会慢" tabindex="-1"><a class="header-anchor" href="#为什么会慢" aria-hidden="true">#</a> 为什么会慢?</h3>
<p>SQL执行过程中出现了两次中间结果，都是全长度的、仅需要一个随机结果，缺经历了不必要的排序（虽然优化过)，调用了很多次RAND()。</p>
<h3 id="解决方法-临时优化方法" tabindex="-1"><a class="header-anchor" href="#解决方法-临时优化方法" aria-hidden="true">#</a> 解决方法-临时优化方法</h3>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select max(film_id),min(film_id) into @M,@N from film ;
set @X= floor((@M-@N+1)*rand() +@N);
select title, description from film where film_id &gt;= @X limit 1;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="解决方法-业务方案-推荐" tabindex="-1"><a class="header-anchor" href="#解决方法-业务方案-推荐" aria-hidden="true">#</a> 解决方法-业务方案（推荐）</h3>
<p>解决方法-业务方案
查询数据表总数total（总数）
total范围内，随机选取一个数字r执行以下SQL:</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select count(*) from film;
# 业务层进行随机取值，然后在执行相关语句
select title, description from film limit r, 1
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="优化联合查询" tabindex="-1"><a class="header-anchor" href="#优化联合查询" aria-hidden="true">#</a> 优化联合查询</h2>
<h3 id="索引下推-version-5-6" tabindex="-1"><a class="header-anchor" href="#索引下推-version-5-6" aria-hidden="true">#</a> 索引下推（Version&lt;=5.6）</h3>
<p>用下列方式建表:</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>CREATE TABLE `inventory_3`(
    `inventory_id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `film_id` SMALLINT UNSIGNED NOT NULL,
    `store_id` TINYINT UNSIGNED NOT NULL,
    `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`inventory_id`),
    KEY `idx_store_id_film_id` (`store_id`, `film_id`)
)ENGINE=INNODB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
INSERT INTO inventory_3 SELECT * FROM inventory
#索引下推SELECT 
# 先查询的 store_id 结果是乱序的  
# 再执行  film_id 去查询  (因为之前已经查询了store_id  就可以根据 film_id 来查询 而不是再去走inventory_id)
SELECT * FROM`inventory_3` WHERE store_id in (1, 2) and film_id = 3;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><img src="http://cdn.oboom.top/doc/image-20210916145631423.png" alt="image-20210916145631423"></p>
<h2 id="索引左侧用法" tabindex="-1"><a class="header-anchor" href="#索引左侧用法" aria-hidden="true">#</a> 索引左侧用法</h2>
<h3 id="联合索引" tabindex="-1"><a class="header-anchor" href="#联合索引" aria-hidden="true">#</a> 联合索引</h3>
<p>使用两个或以上字段生成的索引，联合索引也可以加速“最左前缀”的查询联合索引可以代替最左侧字段的单独索引</p>
<blockquote>
<p>非常重要： “带头大哥不能死，中间兄弟不能丢。”（必须要全查或者只查左边的值）</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>参考有：A\B\C 联合索引三个字段，进行`where`查询时

where 查询 A
where 查询 A|B
where 查询 A|B|C
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="字符串前缀索引" tabindex="-1"><a class="header-anchor" href="#字符串前缀索引" aria-hidden="true">#</a> 字符串前缀索引</h3>
<p>如果需要查询的字段太长导致索引查询也会变慢，如果数据都有某些相同的特性可以使用前缀索引</p>
<blockquote>
<p>某些业务场景下可以使用前缀索引（某县城的身份证查询业务）
取邮箱字段的前6位</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>alter table user add index index2(email(6))
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>字符串的前缀索引
如果前缀区分度太小，可以考虑两种变通方法:</p>
<h4 id="倒序存储" tabindex="-1"><a class="header-anchor" href="#倒序存储" aria-hidden="true">#</a> 倒序存储</h4>
<p>新建一个 hash_crc 字段代替原本字段进行查询 ，该hash字段需要索引</p>
<p>通过倒序来存储相关字段</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT REVERSE('http://www.mysql.com');
#参考实现
select * from table_test where hash_crc = REVERSE('123123@qq.com');
#或者业务层实现
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="新增hash字段-推荐" tabindex="-1"><a class="header-anchor" href="#新增hash字段-推荐" aria-hidden="true">#</a> 新增hash字段（推荐）</h4>
<p>新增hash crc 字段用来校验相关参数</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT crc32('http://www.mysql.com');
SELECT crc64('http://www.mysql.com');
#参考实现
select * from table_test where hash_crc = crc32('178989123123');
#或者业务层实现
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="字符串like只支持右模糊" tabindex="-1"><a class="header-anchor" href="#字符串like只支持右模糊" aria-hidden="true">#</a> 字符串like只支持右模糊</h3>
<p>会使索引失效</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>like %关键字% and like %关键字
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>右模糊才可以使用索引</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>like 关键字%  
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="is-null优化" tabindex="-1"><a class="header-anchor" href="#is-null优化" aria-hidden="true">#</a> IS NULL优化</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT ename FROM t_emp WHERE comm IS NULL; #不使用索引
SELECT ename FROM t_emp WHERE comm =-1;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="尽量少用-运算符" tabindex="-1"><a class="header-anchor" href="#尽量少用-运算符" aria-hidden="true">#</a> 尽量少用 != 运算符</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT ename FROM t_emp WHERE deptno!=20; #不使用索引
SELECT ename FROM t_emp WHERE deptno&lt;20 AND deptno&gt;20;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="尽量少用-in-和-not-in-运算符" tabindex="-1"><a class="header-anchor" href="#尽量少用-in-和-not-in-运算符" aria-hidden="true">#</a> 尽量少用 IN 和 NOT IN 运算符</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT ename FROM t_emp WHERE deptno IN (20,30); #不使用索引
SELECT ename FROM t_emp WHERE deptno=20 
UNION ALL
SELECT ename FROM t_emp WHERE deptno=30;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="在表达式左侧使用运算符和函数都会让索引失效" tabindex="-1"><a class="header-anchor" href="#在表达式左侧使用运算符和函数都会让索引失效" aria-hidden="true">#</a> 在表达式左侧使用运算符和函数都会让索引失效</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>#不使用索引
SELECT ename FROM t_emp WHERE salary*12&gt;=100000; 

SELECT ename FROM t_emp WHERE salary&gt;=100000/12;
#不使用索引
SELECT ename FROM t_emp WHERE year(hiredate)&gt;=2000; 
SELECT ename FROM t_emp 
WHERE hiredate&gt;='2000-01-01 00:00:00';
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="为什么扫描行数非常少" tabindex="-1"><a class="header-anchor" href="#为什么扫描行数非常少" aria-hidden="true">#</a> 为什么扫描行数非常少?</h3>
<p>MySQL5.6之前，需要先使用索引查询store_id in (1,2)再全部回表验证film_id = 3，MySQL5.6之后，如果索引中可以判断，直接使用索引过滤。</p>
<h3 id="松散索引扫描-mysql-8-0-才支持" tabindex="-1"><a class="header-anchor" href="#松散索引扫描-mysql-8-0-才支持" aria-hidden="true">#</a> 松散索引扫描（MySql 8.0 才支持）</h3>
<p>Mysql  8.0 才支持</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>#全表扫描
SELECT * FROM `inventory_3` WHERE film_id = 3;
#松散索引扫描
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="索引失效-不走索引" tabindex="-1"><a class="header-anchor" href="#索引失效-不走索引" aria-hidden="true">#</a> 索引失效，不走索引</h2>
<h3 id="字段进行了函数操作" tabindex="-1"><a class="header-anchor" href="#字段进行了函数操作" aria-hidden="true">#</a> 字段进行了函数操作</h3>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT * FROM`inventory` WHERE film_id+1 =100;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="时间函数" tabindex="-1"><a class="header-anchor" href="#时间函数" aria-hidden="true">#</a> 时间函数</h3>
<p>使用month()函数后，无法使用索引</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>EXPLAIN SELECT * FROM `rental` WHERE MONTH(rental_date)= 5
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>解决方案：需要去掉month()函数，换成between</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT * FROM `rental` WHERE rental_date BETWEEN '2005-5-1' AND '2005-6-1' OR rental_date BETWEEN '2006-5-1'AND '2006-6-1'
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="字符串与数字比较" tabindex="-1"><a class="header-anchor" href="#字符串与数字比较" aria-hidden="true">#</a> 字符串与数字比较</h3>
<p>MySQL中若出现字符串与数字比较，会将字符串转换为数字。<strong>字符  数字转字符、数字  字符转数字</strong>，也会出现无法通过索引来查找.</p>
<p>参考</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from t1 where f1=6;
#如果t1表中f1字段为varchar类型，则此SQL相当于:
select* from t1 where CAST(f1 AS signed int)=6;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="隐式字符编码转换" tabindex="-1"><a class="header-anchor" href="#隐式字符编码转换" aria-hidden="true">#</a> 隐式字符编码转换</h3>
<p>MySQL中,utf8与utf8mb4字段比较时，会把utf8转为utf8mb4上一页的SQL相当于:</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select t2.* from t1, t2 where t1.f1=CONVERT(t2.f1 USING utf8mb4) and t1.f2=6;
#解决方法:将查询条件转换为索引字段的编码
select t2.* from t1, t2 where cONVERT(t1.f1 USING utf8)= t2.f1 and t1.f2=6;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="分页查询优化" tabindex="-1"><a class="header-anchor" href="#分页查询优化" aria-hidden="true">#</a> 分页查询优化</h2>
<h3 id="偏移量大时-效率低" tabindex="-1"><a class="header-anchor" href="#偏移量大时-效率低" aria-hidden="true">#</a> 偏移量大时，效率低</h3>
<p>执行顺序</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT film_id, title, description FROM `film` ORDER BY title LIMIT 900,10;
#执行索引
# 1、
SELECT film_id, title, description FROM `film` ORDER BY title;
# 2、
LIMIT 900,10;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="优化sql" tabindex="-1"><a class="header-anchor" href="#优化sql" aria-hidden="true">#</a> 优化SQL</h3>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>得到所需数据的主键
SELECT film_id FROM`film`ORDER BY title LIMIT 900,10;
原表与上面的结果连表，获取最终结果
SELECT f.film_id, f.title, f.description FROM`film`f
INNER JOIN (SELECT film_id FROM `film`ORDER BY title LIMIT 900,10 ) m ON f.film_id = m.film_id;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>排序偏移量大时，会丢弃大量无用数据，导致效率低下，可以采取先索引覆盖，再用最终ID回表的方法，优化效率</p>
<h3 id="要不要使用子查询" tabindex="-1"><a class="header-anchor" href="#要不要使用子查询" aria-hidden="true">#</a> 要不要使用子查询</h3>
<p>因为MyBatis等持久层框架开启了缓存功能，其中一级缓存就会保存子查询的结果，所以可以可放心使用子查询。</p>
<h4 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h4>
<p>SQL控制台不要使用子查询，在持久层框架中则可以使用</p>
<h4 id="如何代替子查询" tabindex="-1"><a class="header-anchor" href="#如何代替子查询" aria-hidden="true">#</a> 如何代替子查询</h4>
<p>from 子查询 代替 where 子查询</p>
<blockquote>
<p>from 子查询只执行一次</p>
</blockquote>
<p>推荐使用：</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from temp t
join (temp_1) t_1 on t_1.aa&gt; t.aa;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>不推荐使用</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from temp t, temp_1 t_1
where t.aa&gt; t_1.aa ;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
