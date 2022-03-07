<template><h1 id="常用的mysql操作命令" tabindex="-1"><a class="header-anchor" href="#常用的mysql操作命令" aria-hidden="true">#</a> 常用的Mysql操作命令</h1>
<h2 id="curd" tabindex="-1"><a class="header-anchor" href="#curd" aria-hidden="true">#</a> CURD</h2>
<h2 id="忽略错误-继续执行" tabindex="-1"><a class="header-anchor" href="#忽略错误-继续执行" aria-hidden="true">#</a> 忽略错误，继续执行</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>INSERT IGNORE  xxx () value ();
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="存在就更新-不存在则插入" tabindex="-1"><a class="header-anchor" href="#存在就更新-不存在则插入" aria-hidden="true">#</a> 存在就更新，不存在则插入</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>INSERT INTO t_emp_ip (id,  empno, ip) VALUES 
(5, 8004, &quot;192.168.99.44&quot;),
(6, 8005, &quot;192.168.99.45&quot;),
(7, 8006, &quot;192.168.99.46&quot;),
(8, 8001, &quot;192.168.99.47&quot;)
ON DUPLICATE KEY UPDATE ip=VALUES( ip);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="外连接" tabindex="-1"><a class="header-anchor" href="#外连接" aria-hidden="true">#</a> 外连接</h2>
<blockquote>
<p>内连接里，查询条件写在ON子句或者WHERE子句，效果相同</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT e.ename, d.dname
FROM t_emp e
JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename, d.dnameFROM t_emp e
JOIN t_dept d ON e.deptno = d.deptno 
WHERE d.deptno=10;

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno 
where d.deptno=10;

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="表连接修改" tabindex="-1"><a class="header-anchor" href="#表连接修改" aria-hidden="true">#</a> 表连接修改</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>8.0 修改密码方式</p>
<p><img src="http://cdn.oboom.top/doc/image-20210913175154068.png" alt="image-20210913175154068"></p>
</template>
