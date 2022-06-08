import{_ as e,o as d,c as n,a as i}from"./app.4a9c1875.js";const a={},s=i(`<h1 id="\u5E38\u7528\u7684-mysql-\u64CD\u4F5C\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u7684-mysql-\u64CD\u4F5C\u547D\u4EE4" aria-hidden="true">#</a> \u5E38\u7528\u7684 Mysql \u64CD\u4F5C\u547D\u4EE4</h1><h2 id="curd" tabindex="-1"><a class="header-anchor" href="#curd" aria-hidden="true">#</a> CURD</h2><h2 id="\u5FFD\u7565\u9519\u8BEF-\u7EE7\u7EED\u6267\u884C" tabindex="-1"><a class="header-anchor" href="#\u5FFD\u7565\u9519\u8BEF-\u7EE7\u7EED\u6267\u884C" aria-hidden="true">#</a> \u5FFD\u7565\u9519\u8BEF\uFF0C\u7EE7\u7EED\u6267\u884C</h2><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>INSERT IGNORE  xxx () value ();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5B58\u5728\u5C31\u66F4\u65B0-\u4E0D\u5B58\u5728\u5219\u63D2\u5165" tabindex="-1"><a class="header-anchor" href="#\u5B58\u5728\u5C31\u66F4\u65B0-\u4E0D\u5B58\u5728\u5219\u63D2\u5165" aria-hidden="true">#</a> \u5B58\u5728\u5C31\u66F4\u65B0\uFF0C\u4E0D\u5B58\u5728\u5219\u63D2\u5165</h2><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>INSERT INTO t_emp_ip (id,  empno, ip) VALUES
(5, 8004, &quot;192.168.99.44&quot;),
(6, 8005, &quot;192.168.99.45&quot;),
(7, 8006, &quot;192.168.99.46&quot;),
(8, 8001, &quot;192.168.99.47&quot;)
ON DUPLICATE KEY UPDATE ip=VALUES( ip);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5916\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u5916\u8FDE\u63A5" aria-hidden="true">#</a> \u5916\u8FDE\u63A5</h2><blockquote><p>\u5185\u8FDE\u63A5\u91CC\uFF0C\u67E5\u8BE2\u6761\u4EF6\u5199\u5728 ON \u5B50\u53E5\u6216\u8005 WHERE \u5B50\u53E5\uFF0C\u6548\u679C\u76F8\u540C</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT e.ename, d.dname
FROM t_emp e
JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename, d.dnameFROM t_emp e
JOIN t_dept d ON e.deptno = d.deptno
WHERE d.deptno=10;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno
where d.deptno=10;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8868\u8FDE\u63A5\u4FEE\u6539" tabindex="-1"><a class="header-anchor" href="#\u8868\u8FDE\u63A5\u4FEE\u6539" aria-hidden="true">#</a> \u8868\u8FDE\u63A5\u4FEE\u6539</h2><p>\u66F4\u65B0</p><blockquote><p>\u4FEE\u6539 SALES \u90E8\u95E8\u7684\u540D\u79F0 \u540C\u65F6\u4FEE\u6539\u6539\u90E8\u95E8\u5458\u5DE5\u7684\u5E95\u85AA\u4E3A 10000 \u5143</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>UPDATE t_emp e JOIN t_dept d oN e.deptno = d.deptnoAND d.dname= &#39;SALES&#39;
SET e.sal=10000,d.dname=&quot;\u9500\u552E\u90E8&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5220\u9664</p><blockquote><p>\u5220\u9664\u90E8\u95E8\u4E3A\u9500\u552E\u90E8\u548C\u90E8\u95E8\u5458\u5DE5\u5220\u9664</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>DELETE e,d JOIN t_dept d oN e.deptno = d.deptno AND d.dname= &#39;\u9500\u552E\u90E8&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>8.0 \u4FEE\u6539\u5BC6\u7801\u65B9\u5F0F</p><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913175154068.png" alt="image-20210913175154068"></p>`,19),l=[s];function r(t,m){return d(),n("div",null,l)}var u=e(a,[["render",r],["__file","\u5E38\u7528\u7684Mysql\u547D\u4EE4.html.vue"]]);export{u as default};
