<template><h1 id="数据库设计" tabindex="-1"><a class="header-anchor" href="#数据库设计" aria-hidden="true">#</a> 数据库设计</h1>
<p>线上+线下=新零售</p>
<h1 id="数据表设计" tabindex="-1"><a class="header-anchor" href="#数据表设计" aria-hidden="true">#</a> 数据表设计</h1>
<h3 id="spu" tabindex="-1"><a class="header-anchor" href="#spu" aria-hidden="true">#</a> SPU</h3>
<p>产品表</p>
<h3 id="sku" tabindex="-1"><a class="header-anchor" href="#sku" aria-hidden="true">#</a> SKU</h3>
<p>商品信息</p>
<p>SKU(Stock Keeping Unit)是库存进出计量的单位，SKU是物理上不可分割的最小存货单元。</p>
<h2 id="商品-sku-与权重" tabindex="-1"><a class="header-anchor" href="#商品-sku-与权重" aria-hidden="true">#</a> 商品（SKU）与权重</h2>
<p>新零售平台主要是B2C的，所以修改SKU对权重的影响不大。但是B2B的平台，修改SKU对商品权重影响很大。</p>
<h2 id="商品-sku-参数绑定" tabindex="-1"><a class="header-anchor" href="#商品-sku-参数绑定" aria-hidden="true">#</a> 商品（SKU） 参数绑定</h2>
<p>商品品类和参数的关系</p>
<p><img src="http://cdn.oboom.top/doc/image-20210913135002982.png" alt="image-20210913135002982"></p>
<p>相关联系</p>
<p><img src="http://cdn.oboom.top/doc/image-20210913135041629.png" alt="image-20210913135041629"></p>
<p>品类表和参数表</p>
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



</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br></div></div><h1 id="商品秒杀业务" tabindex="-1"><a class="header-anchor" href="#商品秒杀业务" aria-hidden="true">#</a> 商品秒杀业务</h1>
<h2 id="库存超售" tabindex="-1"><a class="header-anchor" href="#库存超售" aria-hidden="true">#</a> 库存超售</h2>
<p>怎么预防数据库超售现象?</p>
<h3 id="使用事务隔离" tabindex="-1"><a class="header-anchor" href="#使用事务隔离" aria-hidden="true">#</a> 使用事务隔离</h3>
<p>设置数据库事务的隔离级别Serializable</p>
<p><img src="http://cdn.oboom.top/doc/image-20210914110223115.png" alt="image-20210914110223115"></p>
<h3 id="使用乐观锁实现" tabindex="-1"><a class="header-anchor" href="#使用乐观锁实现" aria-hidden="true">#</a> 使用乐观锁实现</h3>
<p><img src="http://cdn.oboom.top/doc/image-20210914110358000.png" alt="image-20210914110358000"></p>
<h3 id="使用redis-库存" tabindex="-1"><a class="header-anchor" href="#使用redis-库存" aria-hidden="true">#</a> 使用redis 库存</h3>
<h4 id="redis中的超售现象" tabindex="-1"><a class="header-anchor" href="#redis中的超售现象" aria-hidden="true">#</a> Redis中的超售现象</h4>
<p>因为Redis的单线程是非阻塞执行的，所以并发修改数据容易产生超售的结果</p>
<h4 id="redis避免超售现象" tabindex="-1"><a class="header-anchor" href="#redis避免超售现象" aria-hidden="true">#</a> Redis避免超售现象</h4>
<p>Redis引入了事务机制(批处理)，一次性把多条命令传递给Redis执行，这就避免了其他客户端中间插队，出现超售的现象。
<img src="http://cdn.oboom.top/doc/image-20210914112149311.png" alt="image-20210914112149311"></p>
<h4 id="如何保持redis事务一致性" tabindex="-1"><a class="header-anchor" href="#如何保持redis事务一致性" aria-hidden="true">#</a> 如何保持redis事务一致性?</h4>
<p>为了保证事务的一致性，在开启事务之前必须要用WATCH命令监视要操作的记录。
redis &gt; WATCH kill_num kill_user</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>开启事务
MULTI
如何开启事务?
利用MULTI命令可以开启一个事务
redis > MULTI
开启事务后的所有操作都不会立即执行，只有执行EXEC命令的时候才会批处理执行
redis > DECR kill_num
redis > RPUSH kill_user 9502
redis > EXEC
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="spring-boot-实现redis-事务" tabindex="-1"><a class="header-anchor" href="#spring-boot-实现redis-事务" aria-hidden="true">#</a> Spring boot 实现Redis 事务</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> txResults <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SessionCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">RedisOperations</span> operations<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DataAccessException</span> <span class="token punctuation">{</span>
    operations<span class="token punctuation">.</span><span class="token function">multi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    operations<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">,</span> <span class="token string">"value1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// This will contain the results of all ops in the transaction</span>
    <span class="token keyword">return</span> operations<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h1 id="数据库解决购物纠纷" tabindex="-1"><a class="header-anchor" href="#数据库解决购物纠纷" aria-hidden="true">#</a> 数据库解决购物纠纷</h1>
<h2 id="如何避免篡改商品信息" tabindex="-1"><a class="header-anchor" href="#如何避免篡改商品信息" aria-hidden="true">#</a> 如何避免篡改商品信息?</h2>
<p>B2B电商平台，通常采用保存历次商品修改信息、降低搜索排名
B2C电商平台，只需要保存历次商品修改信息即可</p>
<p>新增SPU和SKU old老数据库记录在案</p>
<h1 id="订单号和流水号" tabindex="-1"><a class="header-anchor" href="#订单号和流水号" aria-hidden="true">#</a> 订单号和流水号</h1>
<p>订单号和流水号的区别</p>
<ul>
<li>订单号既是订单的唯一编号， 而且经常被用来检索，所以应当是数字类型的主键</li>
<li>流水号是打印在购物单据上的字符串，便于阅读，但是不用做查询</li>
</ul>
<p><img src="http://cdn.oboom.top/doc/image-20210913175450421.png" alt="image-20210913175450421"></p>
</template>
