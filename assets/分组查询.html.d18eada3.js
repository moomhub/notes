import{_ as e,o as i,c as n,a as l}from"./app.4a9c1875.js";const d={},s=l(`<h1 id="\u5206\u7EC4\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u5206\u7EC4\u67E5\u8BE2" aria-hidden="true">#</a> \u5206\u7EC4\u67E5\u8BE2</h1><h2 id="\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u8BED\u6CD5" aria-hidden="true">#</a> \u8BED\u6CD5</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>select \u5206\u7EC4\u51FD\u6570\uFF0C\u5206\u7EC4\u540E\u7684\u5B57\u6BB5
from \u8868
\u3010where \u7B5B\u9009\u6761\u4EF6\u3011
 group by \u5206\u7EC4\u7684\u5B57\u6BB5
\u3010having \u5206\u7EC4\u540E\u7684\u7B5B\u9009\u3011
\u3010order by \u6392\u5E8F\u5217\u8868\u3011
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7279\u70B9" tabindex="-1"><a class="header-anchor" href="#\u7279\u70B9" aria-hidden="true">#</a> \u7279\u70B9</h2><ol><li>\u548C\u5206\u7EC4\u51FD\u6570\u4E00\u540C\u67E5\u8BE2\u7684\u5B57\u6BB5<code>\u5FC5\u987B</code>\u662Fgroup by\u540E\u51FA\u73B0\u7684\u5B57\u6BB5</li><li>\u7B5B\u9009\u5206\u4E3A\u4E24\u7C7B\uFF1A\u5206\u7EC4\u524D\u7B5B\u9009\u548C\u5206\u7EC4\u540E\u7B5B\u9009</li></ol><table><thead><tr><th style="text-align:center;">\u7B5B\u9009</th><th style="text-align:center;">\u9488\u5BF9\u7684\u8868</th><th style="text-align:center;">\u8FDE\u63A5\u7684\u5173\u952E\u5B57</th></tr></thead><tbody><tr><td style="text-align:center;">\u5206\u7EC4\u524D\u7B5B\u9009</td><td style="text-align:center;">\u539F\u59CB\u8868</td><td style="text-align:center;">where</td></tr><tr><td style="text-align:center;">\u5206\u7EC4\u540E\u7B5B\u9009</td><td style="text-align:center;">group by\u540E\u7684\u7ED3\u679C\u96C6</td><td style="text-align:center;">having</td></tr></tbody></table><h2 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898</h2><ol><li><p>\u5206\u7EC4\u51FD\u6570\u505A\u7B5B\u9009\u80FD\u4E0D\u80FD\u653E\u5728where\u540E\u9762</p><p>\u4E0D\u80FD\uFF0C\u539F\u8868\u4E2D\u6CA1\u6709\u5206\u7EC4\u540E\u7684\u6570\u636E</p></li></ol><h2 id="\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B" aria-hidden="true">#</a> \u6848\u4F8B</h2><h3 id="\u7B80\u5355\u7684\u5206\u7EC4" tabindex="-1"><a class="header-anchor" href="#\u7B80\u5355\u7684\u5206\u7EC4" aria-hidden="true">#</a> \u7B80\u5355\u7684\u5206\u7EC4</h3><ol><li><p>\u67E5\u8BE2\u6BCF\u4E2A\u5DE5\u79CD\u7684\u5458\u5DE5\u5E73\u5747\u5DE5\u8D44</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT AVG(salary),job_id
FROM employees
GROUP BY job_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u6BCF\u4E2A\u4F4D\u7F6E\u7684\u90E8\u95E8\u4E2A\u6570</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT COUNT(*),location_id
FROM departments
GROUP BY location_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5206\u7EC4\u524D\u7B5B\u9009" tabindex="-1"><a class="header-anchor" href="#\u5206\u7EC4\u524D\u7B5B\u9009" aria-hidden="true">#</a> \u5206\u7EC4\u524D\u7B5B\u9009</h3><ol><li><p>\u67E5\u8BE2\u90AE\u7BB1\u4E2D\u5305\u542Ba\u5B57\u7B26\u7684 \u6BCF\u4E2A\u90E8\u95E8\u7684\u6700\u9AD8\u5DE5\u8D44</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT MAX(salary),department_id
FROM employees
WHERE email LIKE &#39;%a%&#39;
GROUP BY department_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u6709\u5956\u91D1\u7684\u6BCF\u4E2A\u9886\u5BFC\u624B\u4E0B\u5458\u5DE5\u7684\u5E73\u5747\u5DE5\u8D44</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	AVG( salary ),
	manager_id 
FROM
	employees 
WHERE
	commission_pct IS NOT NULL 
GROUP BY
	manager_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5206\u7EC4\u540E\u7B5B\u9009" tabindex="-1"><a class="header-anchor" href="#\u5206\u7EC4\u540E\u7B5B\u9009" aria-hidden="true">#</a> \u5206\u7EC4\u540E\u7B5B\u9009</h3><ol><li><p>\u67E5\u8BE2\u54EA\u4E2A\u90E8\u95E8\u7684\u5458\u5DE5\u4E2A\u6570&gt;5</p><p>\u2460 \u9996\u5148\u67E5\u8BE2\u6BCF\u4E2A\u90E8\u95E8\u7684\u5458\u5DE5\u4E2A\u6570</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT COUNT(*),department_id
FROM employees
GROUP BY department_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u2461 \u7B5B\u9009\u521A\u624D\u2460\u7ED3\u679C</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT COUNT(*),department_id
FROM employees

GROUP BY department_id

HAVING COUNT(*)&gt;5;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u6BCF\u4E2A\u5DE5\u79CD\u6709\u5956\u91D1\u7684\u5458\u5DE5\u7684\u6700\u9AD8\u5DE5\u8D44&gt;12000\u7684\u5DE5\u79CD\u7F16\u53F7\u548C\u6700\u9AD8\u5DE5\u8D44</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	MAX( salary ) \u6700\u9AD8\u5DE5\u8D44,
	job_id \u5DE5\u79CD\u7F16\u53F7 
FROM
	employees 
WHERE
	commission_pct IS NOT NULL 
GROUP BY
	job_id 
HAVING
	MAX( salary )&gt; 12000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u9886\u5BFC\u7F16\u53F7&gt;102\u7684\u6BCF\u4E2A\u9886\u5BFC\u624B\u4E0B\u7684\u6700\u4F4E\u5DE5\u8D44\u5927\u4E8E5000\u7684\u9886\u5BFC\u7F16\u53F7\u548C\u6700\u4F4E\u5DE5\u8D44</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	manager_id \u9886\u5BFC\u7F16\u53F7,
	MIN( salary ) \u6700\u4F4E\u5DE5\u8D44 
FROM
	employees 
WHERE
	manager_id &gt; 102 
GROUP BY
	manager_id 
HAVING
	MIN( salary )&gt; 5000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u6DFB\u52A0\u6392\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u6DFB\u52A0\u6392\u5E8F" aria-hidden="true">#</a> \u6DFB\u52A0\u6392\u5E8F</h3><ol><li><p>\u6BCF\u4E2A\u5DE5\u79CD\u6709\u5956\u91D1\u7684\u5458\u5DE5\u7684\u6700\u9AD8\u5DE5\u8D44&gt;6000\u7684\u5DE5\u79CD\u7F16\u53F7\u548C\u6700\u9AD8\u5DE5\u8D44,\u6309\u6700\u9AD8\u5DE5\u8D44\u5347\u5E8F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	job_id \u5DE5\u79CD\u7F16\u53F7,
	MAX( salary ) \u6700\u9AD8\u5DE5\u8D44 
FROM
	employees 
WHERE
	commission_pct IS NOT NULL 
GROUP BY
	job_id 
HAVING
	MAX( salary )&gt; 6000 
ORDER BY
	MAX( salary );
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u6309\u591A\u4E2A\u5B57\u6BB5\u5206\u7EC4" tabindex="-1"><a class="header-anchor" href="#\u6309\u591A\u4E2A\u5B57\u6BB5\u5206\u7EC4" aria-hidden="true">#</a> \u6309\u591A\u4E2A\u5B57\u6BB5\u5206\u7EC4</h3><ol><li><p>\u67E5\u8BE2\u6BCF\u4E2A\u5DE5\u79CD\u6BCF\u4E2A\u90E8\u95E8\u7684\u6700\u4F4E\u5DE5\u8D44,\u5E76\u6309\u6700\u4F4E\u5DE5\u8D44\u964D\u5E8F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	MIN( salary ) \u6700\u4F4E\u5DE5\u8D44,
	department_id \u90E8\u95E8,
	job_id \u5DE5\u79CD 
FROM
	employees 
GROUP BY
	department_id,
	job_id 
ORDER BY
	MIN( salary ) DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,19),a=[s];function r(v,t){return i(),n("div",null,a)}var m=e(d,[["render",r],["__file","\u5206\u7EC4\u67E5\u8BE2.html.vue"]]);export{m as default};
