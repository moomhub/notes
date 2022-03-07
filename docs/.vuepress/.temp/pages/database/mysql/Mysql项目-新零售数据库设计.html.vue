<template><h1 id="mysql-数据库设计" tabindex="-1"><a class="header-anchor" href="#mysql-数据库设计" aria-hidden="true">#</a> Mysql 数据库设计</h1>
<blockquote>
<p>确定相关的数据模型和数据业务，根据围绕的业务来进行设计</p>
<ol>
<li>需求分析:根据用户的需求，分析出需要记录的数据</li>
<li>概要设计:根据分析出的数据，设计ER图</li>
<li>详细设计:将ER图转换成数据库模型图和数据表</li>
</ol>
</blockquote>
<h2 id="数据模型" tabindex="-1"><a class="header-anchor" href="#数据模型" aria-hidden="true">#</a> 数据模型</h2>
<h3 id="瀑布模型" tabindex="-1"><a class="header-anchor" href="#瀑布模型" aria-hidden="true">#</a> 瀑布模型</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210913095243953.png" alt="image-20210913095243953"></p>
<h3 id="螺旋模型" tabindex="-1"><a class="header-anchor" href="#螺旋模型" aria-hidden="true">#</a> 螺旋模型</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210913095326810.png" alt="image-20210913095326810"></p>
<h3 id="使用-visio-图制定er图" tabindex="-1"><a class="header-anchor" href="#使用-visio-图制定er图" aria-hidden="true">#</a> 使用 visio 图制定ER图</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210913100910944.png" alt="image-20210913100910944"></p>
<h3 id="数据库模型图" tabindex="-1"><a class="header-anchor" href="#数据库模型图" aria-hidden="true">#</a> 数据库模型图</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210913100917851.png" alt="image-20210913100917851"></p>
<h2 id="数据库引擎" tabindex="-1"><a class="header-anchor" href="#数据库引擎" aria-hidden="true">#</a> 数据库引擎</h2>
<p>TokuDB引擎（（过期数据存储）归档数据表）&gt; InnoDB引擎&gt;MyISAM引擎</p>
<h2 id="数据库常用操作" tabindex="-1"><a class="header-anchor" href="#数据库常用操作" aria-hidden="true">#</a> 数据库常用操作</h2>
<h3 id="忽略错误-继续执行" tabindex="-1"><a class="header-anchor" href="#忽略错误-继续执行" aria-hidden="true">#</a> 忽略错误，继续执行</h3>
<blockquote>
<p>IGNORE 关键字</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>INSERT IGNORE  xxx () value ();
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="存在就更新-不存在则插入" tabindex="-1"><a class="header-anchor" href="#存在就更新-不存在则插入" aria-hidden="true">#</a> 存在就更新，不存在则插入</h3>
<blockquote>
<p>ON DUPLICATE KEY UPDATE ip=VALUES(ip);</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>INSERT INTO t_emp_ip (id,  empno, ip) VALUES 
(5, 8004, &quot;192.168.99.44&quot;),
(6, 8005, &quot;192.168.99.45&quot;),
(7, 8006, &quot;192.168.99.46&quot;),
(8, 8001, &quot;192.168.99.47&quot;)
ON DUPLICATE KEY UPDATE ip=VALUES(ip);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>要不要使用子查询</p>
<p>因为MyBatis等持久层框架开启了缓存功能，其中一级缓存就会保存子查询的结果，所以可以可放心使用子查询
结论: SQL控制台不要使用子查询，在持久层框架中则可以使用</p>
<p>如何代替子查询</p>
<p>from 子查询 代替 where 子查询</p>
<blockquote>
<p>from 子查询 执行一次</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from temp t
join (xxx) a on a.aa&gt; t.xx and xxx
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>外连接</p>
<blockquote>
<p>内连接里，查询条件写在ON子句或者WHERE子句，效果相同</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT e.ename, d.dname
FROM t_emp e
JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;
# 相同
SELECT e.ename, d.dnameFROM t_emp e
JOIN t_dept d ON e.deptno = d.deptno 
WHERE d.deptno=10;

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>外连接不行</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno 
where d.deptno=10;

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>表连接修改</p>
<p>更新</p>
<blockquote>
<p>修改 SALES 部门的名称 同时修改改部门员工的底薪为 10000元</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>UPDATE t_emp e JOIN t_dept d oN e.deptno = d.deptnoAND d.dname= 'SALES'
SET e.sal=10000,d.dname=&quot;销售部&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>删除</p>
<blockquote>
<p>删除部门为销售部和部门员工删除</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>DELETE e,d JOIN t_dept d oN e.deptno = d.deptno AND d.dname= '销售部';
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h1 id="新零售数据库设计" tabindex="-1"><a class="header-anchor" href="#新零售数据库设计" aria-hidden="true">#</a> 新零售数据库设计</h1>
<h2 id="主要概念" tabindex="-1"><a class="header-anchor" href="#主要概念" aria-hidden="true">#</a> 主要概念</h2>
<p>新零售包含：线上--线下</p>
<p>SPU：产品表</p>
<p>SKU：商品信息</p>
<h2 id="sku与权重" tabindex="-1"><a class="header-anchor" href="#sku与权重" aria-hidden="true">#</a> SKU与权重</h2>
<blockquote>
<p>淘宝网的权重，修改商品标题会导致改商品权重下降</p>
</blockquote>
<p>新零售平台主要是B2C的，所以修改SKU对权重的影响不大。但是B2B的平台，修改SKU对商品权重影响很大。</p>
<h2 id="相关设计关系图" tabindex="-1"><a class="header-anchor" href="#相关设计关系图" aria-hidden="true">#</a> 相关设计关系图</h2>
<h3 id="品类和参数绑定" tabindex="-1"><a class="header-anchor" href="#品类和参数绑定" aria-hidden="true">#</a> 品类和参数绑定</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210922101420858.png" alt="image-20210922101420858"></p>
<h3 id="参数和sku-商品-关系" tabindex="-1"><a class="header-anchor" href="#参数和sku-商品-关系" aria-hidden="true">#</a> 参数和SKU(商品)关系</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210922101458402.png" alt="image-20210922101458402"></p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>create database neti;


CREATE TABLE t_spec_group(
 `id` VARCHAR(32) PRIMARY KEY COMMENT &quot;主键&quot;,
 `spg_id` VARCHAR(32) NOT NULL COMMENT &quot;品类编号&quot;,
 `name` VARCHAR(200) NOT NULL COMMENT &quot;名称&quot;,
 UNIQUE KEY unq_spg_id(spg_id),
 UNIQUE KEY unq_spg_name(`name`),
 INDEX idx_spg_id(spg_id)
)COMMENT=&quot;品类表&quot;

CREATE TABLE t_spec_param(
id VARCHAR(32) PRIMARY KEY  COMMENT &quot;主键&quot;, 
spg_id VARCHAR(32) NOT NULL COMMENT &quot;品类编号&quot;,
spp_id VARCHAR(32) NOT NULL COMMENT &quot;参数编号&quot;,
`name` VARCHAR( 280) NOT NULL COMMENT &quot;参数名称&quot;,
`numeric` BOOLEAN NOT NULL COMMENT &quot;是否为数字参数&quot;,
unit VARCHAR(200) COMMENT &quot;单位(量词)&quot;,
generic BOOLEAN NOT NULL COMMENT &quot;是否为通用参数&quot;,
searching BOOLEAN NOT NULL COMMENT &quot;是否用于通用搜索&quot;,
segements VARCHAR( 508) COMMENT&quot;参数值&quot;,
INDEX idx_spg_id(spg_id),
INDEX idx_spp_id(spp_id)
)COMMENT=&quot;参数表&quot;;

CREATE TABLE `t_brand` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `name` varchar(280) NOT NULL COMMENT '名称',
  `image` varchar(500) DEFAULT NULL COMMENT '图片网址',
  `letter` char(1) NOT NULL COMMENT '品牌首字母',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_name` (`name`),
  KEY `idx_letter` (`letter`)
) COMMENT='品牌表'


CREATE TABLE t_category(
id VARCHAR(32) PRIMARY KEY  COMMENT &quot;主键&quot;, 	
`name` VARCHAR( 280) NOT NULL COMMENT &quot;分类名称&quot;,
parent_id VARCHAR(32) COMMENT &quot;上级分类菜单&quot;,
if_parent BOOLEAN NOT NULL COMMENT &quot;是否含有下级分类&quot;,
sort INT UNSIGNED NOT NULL COMMENT &quot;排名指数&quot;,
INDEX idx_parent_id(parent_id),
INDEX idx_sort(sort)
)COMMENT=&quot;商品分类表&quot;;



CREATE TABLE t_category_brand(
category_id VARCHAR(32) COMMENT &quot;分类&quot;,
brand_id VARCHAR(32)  COMMENT &quot;主键&quot;,
PRIMARY KEY (category_id,brand_id)
)COMMENT=&quot;品牌与分类关联表&quot;;


CREATE TABLE t_spu(
	id varchar(32) PRIMARY KEY COMMENT'主键',
    title VARCHAR( 200) NOT NULL COMMENT '标题',
    sub_title VARCHAR( 200) COMMENT'副标题',
    category_id INT UNSIGNED NOT NULL COMMENT '分类ID',
    brand_id INT UNSIGNED COMMENT '品牌ID',
    spg_id INT UNSIGNED NOT NULL COMMENT '品类ID',
    saleable BOOLEAN NOT NULL COMMENT '是否上架',
    valid BOOLEAN NOT NULL COMMENT '是否有效',
    create_time TIMESTAMP NOT NULL DEFAULT NOW() COMMENT '添加时间',
    last_update_time TIMESTAMP NOT NULL DEFAULT NOw() COMMENT '最后修改时间',
    INDEX idx_brand_id(brand_id),
    INDEX idx_category_id(category_id),
    INDEX idx_spg_id(spg_id),
    INDEX idx_saleable(saleable),
    INDEX idx_valid(valid)
)COMMENT=&quot;产品表&quot;;



</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br></div></div><h2 id="订单号和流水号的区别" tabindex="-1"><a class="header-anchor" href="#订单号和流水号的区别" aria-hidden="true">#</a> 订单号和流水号的区别</h2>
<p>订单号：订单的唯一编号， 而且经常被用来检索，所以应当是数字类型的主键
流水号：打印在购物单据上的字符串，便于阅读，但是不用做查询</p>
<p><img src="http://cdn.oboom.top/doc/image-20210913175450421.png" alt="流水号生成参考"></p>
<h2 id="商品秒杀业务" tabindex="-1"><a class="header-anchor" href="#商品秒杀业务" aria-hidden="true">#</a> 商品秒杀业务</h2>
<p>库存超售，秒杀业务不做限制导致出现商品超售。</p>
<p>怎么预防数据库超售现象?</p>
<h3 id="数据库事务隔离级别-serializable" tabindex="-1"><a class="header-anchor" href="#数据库事务隔离级别-serializable" aria-hidden="true">#</a> 数据库事务隔离级别 Serializable</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210914110223115.png" alt="image-20210914110223115"></p>
<h3 id="乐观锁" tabindex="-1"><a class="header-anchor" href="#乐观锁" aria-hidden="true">#</a> 乐观锁</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210914110358000.png" alt="image-20210914110358000"></p>
<h3 id="使用redis库存" tabindex="-1"><a class="header-anchor" href="#使用redis库存" aria-hidden="true">#</a> 使用redis库存</h3>
<h4 id="redis中的超售现象" tabindex="-1"><a class="header-anchor" href="#redis中的超售现象" aria-hidden="true">#</a> Redis中的超售现象</h4>
<p>因为Redis的单线程是非阻塞执行的，所以并发修改数据容易产生超售的结果</p>
<h4 id="使用redis事务解决redis-超售" tabindex="-1"><a class="header-anchor" href="#使用redis事务解决redis-超售" aria-hidden="true">#</a> 使用redis事务解决redis 超售</h4>
<p>Redis引入了事务机制(批处理)，一次性把多条命令传递给Redis执行，这就避免了其他客户端中间插队，出现超售的现象。</p>
<p><img src="http://cdn.oboom.top/doc/image-20210914112149311.png" alt="image-20210914112149311"></p>
<h4 id="如何保持事务一致性" tabindex="-1"><a class="header-anchor" href="#如何保持事务一致性" aria-hidden="true">#</a> 如何保持事务一致性?</h4>
<p>为了保证事务的一致性，在开启事务之前必须要用WATCH命令监视要操作的记录。
redis &gt; WATCH kill_num kill_user</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Redis内执行事务
开启事务

MULTI

如何开启事务?
利用MULTI命令可以开启一个事务

redis > MULTI
开启事务后的所有操作都不会立即执行，只有执行EXEC命令的时候才会批处理执行
redis > DECR kill_num
redis > RPUSH kill_user 9502
redis > EXEC


#Spring boot 

List&lt;Object> txResults = redisTemplate.execute(new SessionCallback&lt;List&lt;Object>>() {
  public List&lt;Object> execute(RedisOperations operations) throws DataAccessException {
    operations.multi();
    operations.opsForSet().add("key", "value1");
    // This will contain the results of all ops in the transaction
    return operations.exec();
  }
});

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="数据库解决购物纠纷" tabindex="-1"><a class="header-anchor" href="#数据库解决购物纠纷" aria-hidden="true">#</a> 数据库解决购物纠纷</h2>
<h3 id="如何避免篡改商品信息" tabindex="-1"><a class="header-anchor" href="#如何避免篡改商品信息" aria-hidden="true">#</a> 如何避免篡改商品信息?</h3>
<p>B2B电商平：通常采用保存历次商品修改信息、降低搜索排名
B2C电商平台：只需要保存历次商品修改信息即可</p>
<blockquote>
<p>所有数据表老数据数据归档处理，定期将数据库中的逻辑删除的</p>
</blockquote>
<p>新增SPU和SKU old老数据库记录在案</p>
<h2 id="防止xss攻击" tabindex="-1"><a class="header-anchor" href="#防止xss攻击" aria-hidden="true">#</a> 防止XSS攻击</h2>
<p>XSS(跨站脚本)攻击，是让浏览器渲染DOM的时候意外的执行了恶意JS代码
XSS攻击的原理是在网页中嵌入一个恶意脚本</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>null<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">onerror</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span><span class="token value javascript language-javascript"><span class="token function">alert</span><span class="token punctuation">(</span> document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span></span><span class="token punctuation">'</span></span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="antisamy" tabindex="-1"><a class="header-anchor" href="#antisamy" aria-hidden="true">#</a> AntiSamy</h3>
<p>AntiSamy是开源的Java类库，可以用来过滤XSS恶意代码</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.owasp.antisamy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>antisamy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.5.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token class-name">String</span> temp<span class="token operator">=</span><span class="token string">"Helloworld &lt;img src='nuil' onerror='alert(1234)'>"</span><span class="token punctuation">;</span>
       <span class="token class-name">String</span> path<span class="token operator">=</span><span class="token class-name">Demo1</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span> <span class="token string">"antisamy.xml"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	   <span class="token keyword">try</span><span class="token punctuation">{</span>
          <span class="token class-name">Policy</span> policy<span class="token operator">=</span><span class="token class-name">Policy</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token class-name">Antisamy</span> samy<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">AntiSamy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		  <span class="token class-name">String</span> result<span class="token operator">=</span>samy<span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span>temp<span class="token punctuation">,</span> policy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getcleanHTML</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span> 
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="jsoup-推荐使用" tabindex="-1"><a class="header-anchor" href="#jsoup-推荐使用" aria-hidden="true">#</a> Jsoup（推荐使用）</h3>
<p>使用Jsoup防止富文本 XSS 攻击</p>
<h2 id="订单号和流水号" tabindex="-1"><a class="header-anchor" href="#订单号和流水号" aria-hidden="true">#</a> 订单号和流水号</h2>
<p>订单号和流水号的区别</p>
<ul>
<li>订单号既是订单的唯一编号， 而且经常被用来检索，所以应当是数字类型的主键</li>
<li>流水号是打印在购物单据上的字符串，便于阅读，但是不用做查询</li>
</ul>
<p><img src="http://cdn.oboom.top/doc/image-20210913175450421.png" alt="image-20210913175450421"></p>
<p>数据库缓存和程序缓存</p>
<p><img src="http://cdn.oboom.top/doc/image-20210915104205886.png" alt="image-20210915104205886"></p>
<p>中文分词</p>
<p>Lucene  Apache 分词技术</p>
<p><a href="https://www.hanlp.com/index.html" target="_blank" rel="noopener noreferrer">HanLP官网<ExternalLinkIcon/></a></p>
</template>
