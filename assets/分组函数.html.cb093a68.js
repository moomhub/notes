import{_ as e,o as s,c as i,a}from"./app.4a9c1875.js";const l={},n=a(`<h1 id="\u5206\u7EC4\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u5206\u7EC4\u51FD\u6570" aria-hidden="true">#</a> \u5206\u7EC4\u51FD\u6570</h1><p>\u7528\u4F5C\u7EDF\u8BA1\u4F7F\u7528\uFF0C\u53C8\u79F0\u4E3A\u805A\u5408\u51FD\u6570\u6216\u7EDF\u8BA1\u51FD\u6570\u6216\u7EC4\u51FD\u6570</p><h2 id="sum-expression" tabindex="-1"><a class="header-anchor" href="#sum-expression" aria-hidden="true">#</a> SUM(expression)</h2><p>\u200B \u6C42\u548C</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT SUM(salary) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="avg-expression" tabindex="-1"><a class="header-anchor" href="#avg-expression" aria-hidden="true">#</a> AVG(expression)</h2><p>\u200B \u5E73\u5747\u503C</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT AVG(salary) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="max-expression" tabindex="-1"><a class="header-anchor" href="#max-expression" aria-hidden="true">#</a> MAX(expression)</h2><p>\u200B \u6700\u5927\u503C</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT MAX(salary) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="min-expression" tabindex="-1"><a class="header-anchor" href="#min-expression" aria-hidden="true">#</a> MIN(expression)</h2><p>\u200B \u6700\u5C0F\u503C</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT MIN(salary) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="count-expression" tabindex="-1"><a class="header-anchor" href="#count-expression" aria-hidden="true">#</a> COUNT(expression)</h2><p>\u200B \u8BA1\u7B97\u4E2A\u6570</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT COUNT(salary) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT COUNT(*) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT COUNT(1) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6548\u7387\uFF1A <code>MYISAM</code>\u5B58\u50A8\u5F15\u64CE\u4E0B \uFF0CCOUNT(<em>)\u7684\u6548\u7387\u9AD8 <code>INNODB</code>\u5B58\u50A8\u5F15\u64CE\u4E0B\uFF0CCOUNT(</em>)\u548CCOUNT(1)\u7684\u6548\u7387\u5DEE\u4E0D\u591A\uFF0C\u6BD4COUNT(\u5B57\u6BB5)\u8981\u9AD8\u4E00\u4E9B</p><hr><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	SUM( salary ) \u548C,
	AVG( salary ) \u5E73\u5747,
	MAX( salary ) \u6700\u9AD8,
	MIN( salary ) \u6700\u4F4E,
	COUNT( salary ) \u4E2A\u6570 
FROM
	employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5E73\u5747\u5DE5\u8D44\u4FDD\u7559\u4E24\u4F4D\u5C0F\u6570(\u56DB\u820D\u4E94\u5165)</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	SUM( salary ) \u548C,
	ROUND( AVG( salary ), 2 ) \u5E73\u5747,
	MAX( salary ) \u6700\u9AD8,
	MIN( salary ) \u6700\u4F4E,
	COUNT( salary ) \u4E2A\u6570 
FROM
	employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u6570\u652F\u6301\u54EA\u4E9B\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u652F\u6301\u54EA\u4E9B\u7C7B\u578B" aria-hidden="true">#</a> \u53C2\u6570\u652F\u6301\u54EA\u4E9B\u7C7B\u578B</h2><h3 id="\u5B57\u7B26" tabindex="-1"><a class="header-anchor" href="#\u5B57\u7B26" aria-hidden="true">#</a> \u5B57\u7B26</h3><p>\u5148\u8BD5\u56FE\u5C06\u5B57\u7B26\u8F6C\u6362\u6210\u6570\u503C\uFF0C\u5982\u679C\u8F6C\u6362\u6210\u529F\uFF0C\u5219\u7EE7\u7EED\u8FD0\u7B97\uFF1B\u5426\u5219\u8F6C\u6362\u62100\uFF0C\u518D\u505A\u8FD0\u7B97</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	SUM( last_name ),
	AVG( last_name ) 
FROM
	employees;
	
--&gt; 0,0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0E\u6392\u5E8F\u5DEE\u4E0D\u591A</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	MAX( last_name ),
	MIN( last_name ) 
FROM
	employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u65E5\u671F" tabindex="-1"><a class="header-anchor" href="#\u65E5\u671F" aria-hidden="true">#</a> \u65E5\u671F</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT SUM(hiredate) ,AVG(hiredate) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT MAX(hiredate),MIN(hiredate) FROM employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u7279\u70B9" tabindex="-1"><a class="header-anchor" href="#\u7279\u70B9" aria-hidden="true">#</a> \u7279\u70B9</h2><ol><li><p>sum\u3001avg\u4E00\u822C\u7528\u4E8E\u5904\u7406\u6570\u503C\u578B</p></li><li><p>max\u3001min\u3001count\u53EF\u4EE5\u5904\u7406\u4EFB\u4F55\u7C7B\u578B</p></li><li><p>\u4EE5\u4E0A\u5206\u7EC4\u51FD\u6570\u90FD\u5FFD\u7565null\u503C</p></li><li><p>\u53EF\u4EE5\u548Cdistinct\u642D\u914D\u5B9E\u73B0\u53BB\u91CD\u7684\u8FD0\u7B97</p></li><li><p>\u4E00\u822C\u4F7F\u7528count(*)\u7528\u4F5C\u7EDF\u8BA1\u884C\u6570</p></li><li><p>\u548C\u5206\u7EC4\u51FD\u6570\u4E00\u540C\u67E5\u8BE2\u7684\u5B57\u6BB5\u8981\u6C42\u662Fgroup by\u540E\u7684\u5B57\u6BB5</p></li></ol><h2 id="\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B" aria-hidden="true">#</a> \u6848\u4F8B</h2><ol><li><p>\u67E5\u8BE2\u5458\u5DE5\u8868\u4E2D\u7684\u6700\u5927\u5165\u804C\u65F6\u95F4\u548C\u6700\u5C0F\u5165\u804C\u65F6\u95F4\u7684\u76F8\u5DEE\u5929\u6570 \uFF08DIFFRENCE\uFF09</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	MAX( hiredate ) \u6700\u5927,
	MIN( hiredate ) \u6700\u5C0F,
	(MAX( hiredate )- MIN( hiredate ))/ 1000 / 3600 / 24 DIFFRENCE 
FROM
	employees;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528DATEDIFF(d1,d2)\u51FD\u6570\uFF0C\u8BA1\u7B97\u65E5\u671F d1\uFF5Ed2 \u4E4B\u95F4\u76F8\u9694\u7684\u5929\u6570</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT DATEDIFF(MAX(hiredate),MIN(hiredate)) DIFFRENCE;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u90E8\u95E8\u7F16\u53F7\u4E3A90\u7684\u5458\u5DE5\u4E2A\u6570</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	COUNT(*) 
FROM
	employees 
WHERE
	department_id = 90;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,37),d=[n];function r(m,c){return s(),i("div",null,d)}var u=e(l,[["render",r],["__file","\u5206\u7EC4\u51FD\u6570.html.vue"]]);export{u as default};
