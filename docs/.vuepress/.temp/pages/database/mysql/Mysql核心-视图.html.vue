<template><h1 id="视图" tabindex="-1"><a class="header-anchor" href="#视图" aria-hidden="true">#</a> 视图</h1>
<h2 id="如何使用不存在的数据表-视图" tabindex="-1"><a class="header-anchor" href="#如何使用不存在的数据表-视图" aria-hidden="true">#</a> 如何使用不存在的数据表（视图）</h2>
<h3 id="视图view" tabindex="-1"><a class="header-anchor" href="#视图view" aria-hidden="true">#</a> 视图View</h3>
<p>使用视图可以创建不存在的虚拟表，视图的原理是预设一个SELECT语句，SELECT语句的查询结果作为虚拟表的数据。</p>
<p>视图是一种虚拟存在的表，同真实表一样，视图也由列和行构成，但视图并不实际存在于数据库中。行和列的数据来自于定义视图的查询中所使用的表，并且还是在使用视图时动态生成的。</p>
<h3 id="视图用法" tabindex="-1"><a class="header-anchor" href="#视图用法" aria-hidden="true">#</a> 视图用法</h3>
<blockquote>
<ol>
<li>SELECT 语句不能引用系统或用户变量。</li>
<li>SELECT 语句不能包含 FROM 子句中的子查询。</li>
<li>SELECT 语句不能引用预处理语句参数。</li>
<li>对于UNDEFINED，MySQL将选择所要使用的算法。如果可能，它倾向于MERGE而不是TEMPTABLE，这是因为MERGE通常更有效，而且如果使用了临时表，视图是不可更新的。</li>
</ol>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>CREATE VIEW &lt;视图名&gt; AS &lt;SELECT语句&gt;
#算法选择
CREATE ALGORITHM = [UNDEFINED | MERGE | TEMPTABLE] VIEW &lt;视图名&gt; AS &lt;SELECT语句&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="视图算法的选择" tabindex="-1"><a class="header-anchor" href="#视图算法的选择" aria-hidden="true">#</a> 视图算法的选择</h3>
<blockquote>
<p>一般来讲，MERGE的性能优于TEMPTABLE</p>
</blockquote>
<p>MERGE：将视图SQL合并到主查询SQL中
TEMPTABLE：将视图作l临时表（中间结果)来处理</p>
<h3 id="无法使用merge的sql" tabindex="-1"><a class="header-anchor" href="#无法使用merge的sql" aria-hidden="true">#</a> 无法使用MERGE的SQL</h3>
<ul>
<li>聚集函数 (max,min,avg,sum, bit and ,bit or, count...)</li>
<li>DISTINCT</li>
<li>GROUP BY</li>
<li>HAVING</li>
<li>UNION,UNION ALL</li>
<li>子查询</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>视图可以在不改变原有数据的情况下，创建虚拟表
尽量使用MERGE算法，并避免无法使用MERGE的SQL</p>
</template>
