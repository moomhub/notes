import{_ as e,o as d,c as i,a}from"./app.4a9c1875.js";const n={},s=a(`<h1 id="mysql-\u6570\u636E\u5E93\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#mysql-\u6570\u636E\u5E93\u8BBE\u8BA1" aria-hidden="true">#</a> Mysql \u6570\u636E\u5E93\u8BBE\u8BA1</h1><blockquote><p>\u786E\u5B9A\u76F8\u5173\u7684\u6570\u636E\u6A21\u578B\u548C\u6570\u636E\u4E1A\u52A1\uFF0C\u6839\u636E\u56F4\u7ED5\u7684\u4E1A\u52A1\u6765\u8FDB\u884C\u8BBE\u8BA1</p><ol><li>\u9700\u6C42\u5206\u6790:\u6839\u636E\u7528\u6237\u7684\u9700\u6C42\uFF0C\u5206\u6790\u51FA\u9700\u8981\u8BB0\u5F55\u7684\u6570\u636E</li><li>\u6982\u8981\u8BBE\u8BA1:\u6839\u636E\u5206\u6790\u51FA\u7684\u6570\u636E\uFF0C\u8BBE\u8BA1 ER \u56FE</li><li>\u8BE6\u7EC6\u8BBE\u8BA1:\u5C06 ER \u56FE\u8F6C\u6362\u6210\u6570\u636E\u5E93\u6A21\u578B\u56FE\u548C\u6570\u636E\u8868</li></ol></blockquote><h2 id="\u6570\u636E\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u6A21\u578B" aria-hidden="true">#</a> \u6570\u636E\u6A21\u578B</h2><h3 id="\u7011\u5E03\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u7011\u5E03\u6A21\u578B" aria-hidden="true">#</a> \u7011\u5E03\u6A21\u578B</h3><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913095243953.png" alt="image-20210913095243953"></p><h3 id="\u87BA\u65CB\u6A21\u578B" tabindex="-1"><a class="header-anchor" href="#\u87BA\u65CB\u6A21\u578B" aria-hidden="true">#</a> \u87BA\u65CB\u6A21\u578B</h3><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913095326810.png" alt="image-20210913095326810"></p><h3 id="\u4F7F\u7528-visio-\u56FE\u5236\u5B9A-er-\u56FE" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-visio-\u56FE\u5236\u5B9A-er-\u56FE" aria-hidden="true">#</a> \u4F7F\u7528 visio \u56FE\u5236\u5B9A ER \u56FE</h3><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913100910944.png" alt="image-20210913100910944"></p><h3 id="\u6570\u636E\u5E93\u6A21\u578B\u56FE" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u6A21\u578B\u56FE" aria-hidden="true">#</a> \u6570\u636E\u5E93\u6A21\u578B\u56FE</h3><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913100917851.png" alt="image-20210913100917851"></p><h2 id="\u6570\u636E\u5E93\u5F15\u64CE" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u5F15\u64CE" aria-hidden="true">#</a> \u6570\u636E\u5E93\u5F15\u64CE</h2><p>TokuDB \u5F15\u64CE\uFF08\uFF08\u8FC7\u671F\u6570\u636E\u5B58\u50A8\uFF09\u5F52\u6863\u6570\u636E\u8868\uFF09&gt; InnoDB \u5F15\u64CE&gt;MyISAM \u5F15\u64CE</p><h2 id="\u6570\u636E\u5E93\u5E38\u7528\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u5E38\u7528\u64CD\u4F5C" aria-hidden="true">#</a> \u6570\u636E\u5E93\u5E38\u7528\u64CD\u4F5C</h2><h3 id="\u5FFD\u7565\u9519\u8BEF-\u7EE7\u7EED\u6267\u884C" tabindex="-1"><a class="header-anchor" href="#\u5FFD\u7565\u9519\u8BEF-\u7EE7\u7EED\u6267\u884C" aria-hidden="true">#</a> \u5FFD\u7565\u9519\u8BEF\uFF0C\u7EE7\u7EED\u6267\u884C</h3><blockquote><p>IGNORE \u5173\u952E\u5B57</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>INSERT IGNORE  xxx () value ();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5B58\u5728\u5C31\u66F4\u65B0-\u4E0D\u5B58\u5728\u5219\u63D2\u5165" tabindex="-1"><a class="header-anchor" href="#\u5B58\u5728\u5C31\u66F4\u65B0-\u4E0D\u5B58\u5728\u5219\u63D2\u5165" aria-hidden="true">#</a> \u5B58\u5728\u5C31\u66F4\u65B0\uFF0C\u4E0D\u5B58\u5728\u5219\u63D2\u5165</h3><blockquote><p>ON DUPLICATE KEY UPDATE ip=VALUES(ip);</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>INSERT INTO t_emp_ip (id,  empno, ip) VALUES
(5, 8004, &quot;192.168.99.44&quot;),
(6, 8005, &quot;192.168.99.45&quot;),
(7, 8006, &quot;192.168.99.46&quot;),
(8, 8001, &quot;192.168.99.47&quot;)
ON DUPLICATE KEY UPDATE ip=VALUES(ip);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8981\u4E0D\u8981\u4F7F\u7528\u5B50\u67E5\u8BE2</p><p>\u56E0\u4E3A MyBatis \u7B49\u6301\u4E45\u5C42\u6846\u67B6\u5F00\u542F\u4E86\u7F13\u5B58\u529F\u80FD\uFF0C\u5176\u4E2D\u4E00\u7EA7\u7F13\u5B58\u5C31\u4F1A\u4FDD\u5B58\u5B50\u67E5\u8BE2\u7684\u7ED3\u679C\uFF0C\u6240\u4EE5\u53EF\u4EE5\u53EF\u653E\u5FC3\u4F7F\u7528\u5B50\u67E5\u8BE2 \u7ED3\u8BBA: SQL \u63A7\u5236\u53F0\u4E0D\u8981\u4F7F\u7528\u5B50\u67E5\u8BE2\uFF0C\u5728\u6301\u4E45\u5C42\u6846\u67B6\u4E2D\u5219\u53EF\u4EE5\u4F7F\u7528</p><p>\u5982\u4F55\u4EE3\u66FF\u5B50\u67E5\u8BE2</p><p>from \u5B50\u67E5\u8BE2 \u4EE3\u66FF where \u5B50\u67E5\u8BE2</p><blockquote><p>from \u5B50\u67E5\u8BE2 \u6267\u884C\u4E00\u6B21</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>select * from temp t
join (xxx) a on a.aa&gt; t.xx and xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5916\u8FDE\u63A5</p><blockquote><p>\u5185\u8FDE\u63A5\u91CC\uFF0C\u67E5\u8BE2\u6761\u4EF6\u5199\u5728 ON \u5B50\u53E5\u6216\u8005 WHERE \u5B50\u53E5\uFF0C\u6548\u679C\u76F8\u540C</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT e.ename, d.dname
FROM t_emp e
JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;
# \u76F8\u540C
SELECT e.ename, d.dnameFROM t_emp e
JOIN t_dept d ON e.deptno = d.deptno
WHERE d.deptno=10;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5916\u8FDE\u63A5\u4E0D\u884C</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno
where d.deptno=10;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u8FDE\u63A5\u4FEE\u6539</p><p>\u66F4\u65B0</p><blockquote><p>\u4FEE\u6539 SALES \u90E8\u95E8\u7684\u540D\u79F0 \u540C\u65F6\u4FEE\u6539\u6539\u90E8\u95E8\u5458\u5DE5\u7684\u5E95\u85AA\u4E3A 10000 \u5143</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>UPDATE t_emp e JOIN t_dept d oN e.deptno = d.deptnoAND d.dname= &#39;SALES&#39;
SET e.sal=10000,d.dname=&quot;\u9500\u552E\u90E8&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5220\u9664</p><blockquote><p>\u5220\u9664\u90E8\u95E8\u4E3A\u9500\u552E\u90E8\u548C\u90E8\u95E8\u5458\u5DE5\u5220\u9664</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>DELETE e,d JOIN t_dept d oN e.deptno = d.deptno AND d.dname= &#39;\u9500\u552E\u90E8&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,38),l=[s];function r(t,m){return d(),i("div",null,l)}var c=e(n,[["render",r],["__file","Mysql\u9879\u76EE-\u7A0B\u5E8F\u8BBE\u8BA1.html.vue"]]);export{c as default};
