<template><h1 id="数据的表的优化" tabindex="-1"><a class="header-anchor" href="#数据的表的优化" aria-hidden="true">#</a> 数据的表的优化</h1>
<h2 id="索引组织表-index-organized-table" tabindex="-1"><a class="header-anchor" href="#索引组织表-index-organized-table" aria-hidden="true">#</a> 索引组织表(Index Organized Table)</h2>
<ul>
<li>索引组织表不是一种“组织表”</li>
<li>索引组织表是由索引“组织起来的”表</li>
<li>lnnoDB中，表都是根据<strong>主键顺序</strong>组织存放的</li>
</ul>
<h2 id="索引-index" tabindex="-1"><a class="header-anchor" href="#索引-index" aria-hidden="true">#</a> 索引(Index)</h2>
<p>说明:</p>
<ul>
<li>
<p>索引是数据库中对某一列或多个列的值进行预排序的数据结构</p>
</li>
<li>
<p>参考目录</p>
</li>
<li>
<p>主键是一种特殊的索引</p>
</li>
</ul>
<hr style="height:1px;border:none;border-top:1px dashed #0066CC;" /> 
<p>从逻辑角度</p>
<ul>
<li>普通索引
<ul>
<li>index :加速查找</li>
</ul>
</li>
<li>唯一索引
<ul>
<li>主键索引：primary key ：加速查找+约束（不为空且唯一）</li>
<li>唯一索引：unique：加速查找+约束 （唯一）</li>
</ul>
</li>
<li>联合索引
<ul>
<li>primary key(id,name):联合主键索引</li>
<li>unique(id,name):联合唯一索引</li>
<li>index(id,name):联合普通索引</li>
</ul>
</li>
<li>全文索引fulltext :用于搜索很长一篇文章的时候，效果最好。</li>
<li>空间索引spatial :了解就好，几乎不用</li>
</ul>
<h3 id="建表时创建" tabindex="-1"><a class="header-anchor" href="#建表时创建" aria-hidden="true">#</a> 建表时创建</h3>
<blockquote>
<p>说明：</p>
<p><strong>UNIQUE</strong>:可选。列值不能重复；即索引列值必须是唯一的，但<strong>可以是空值</strong>。
<strong>FULLTEXT</strong>:可选。表示索引为全文索引。
<strong>SPATIAL</strong>:可选。表示索引为空间索引。
<strong>INDEX和KEY</strong>:用于指定字段为索引，两者选择其中之一就可以了，作用是    一样的。
<strong>索引名</strong>:可选。给创建的索引取一个新名称。
<strong>字段名1</strong>:指定索引对应的字段的名称，该字段必须是前面定义好的字段。
<strong>长度</strong>:可选。指索引的长度，必须是字符串类型才可以使用。
<strong>ASC</strong>:可选。表示升序排列。
<strong>DESC</strong>:可选。表示降序排列。</p>
</blockquote>
<div class="language-cjiamysql ext-cjiamysql line-numbers-mode"><pre v-pre class="language-cjiamysql"><code>CREATE TABLE 表名(
	字段名 数据类型 [完整性约束条件],
     .....,
	#[UNIQUE | FULLTEXT | SPATIAL] INDEX | KEY [索引名] (字段名1 [(长度)] [ASC | DESC]) [USING 索引方法]
);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="在建表之后创建" tabindex="-1"><a class="header-anchor" href="#在建表之后创建" aria-hidden="true">#</a> 在建表之后创建</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ALTER TABLE 表名 ADD [UNIQUE | FULLTEXT | SPATIAL]  INDEX | KEY  [索引名] (字段名1 [(长度)] [ASC | DESC]) [USING 索引方法]；

CREATE  [UNIQUE | FULLTEXT | SPATIAL]  INDEX  索引名 ON  表名(字段名) [USING 索引方法]；
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="主键-primary-key-特殊的索引" tabindex="-1"><a class="header-anchor" href="#主键-primary-key-特殊的索引" aria-hidden="true">#</a> 主键(Primary Key) 特殊的索引</h3>
<p><strong>MyISAM</strong>：允许没有任何索引和主键的表存在，索引都是保存行的地址。
<strong>InnoDB</strong>：如果没有设定主键或者非空唯一索引，就会自动生成一个6字节的主键。</p>
<h3 id="常用索引操作" tabindex="-1"><a class="header-anchor" href="#常用索引操作" aria-hidden="true">#</a> 常用索引操作</h3>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>#建表时创建索引
CREATE TABLE `inventory_1` (
  `inventory_id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `film_id` SMALLINT UNSIGNED NOT NULL,
  `store_id` TINYINT UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  KEY `idx_fk_film_id` (`film_id`)
) ENGINE=INNODB AUTO_INCREMENT=4582 DEFAULT CHARSET=utf8;

#新增索引
ALTER TABLE inventory_0001 ADD INDEX `idx_fk_last` (`last_update`);
#删除索引
DROP INDEX idx_fk_last ON inventory_0001;
#删除索引
ALTER TABLE inventory_0001 DROP INDEX idx_fk_last;
# 重命名索引
ALTER INDEX idx_fk_last RENAME TO idx_fk_lasts;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="索引的左侧用法" tabindex="-1"><a class="header-anchor" href="#索引的左侧用法" aria-hidden="true">#</a> 索引的左侧用法</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="新增hash字段" tabindex="-1"><a class="header-anchor" href="#新增hash字段" aria-hidden="true">#</a> 新增hash字段</h4>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
