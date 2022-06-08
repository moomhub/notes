import{_ as e,o as i,c as n,a as l}from"./app.4a9c1875.js";const s={},d=l(`<h1 id="\u8FDE\u63A5\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u63A5\u67E5\u8BE2" aria-hidden="true">#</a> \u8FDE\u63A5\u67E5\u8BE2</h1><h2 id="\u5B50\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u5B50\u67E5\u8BE2" aria-hidden="true">#</a> \u5B50\u67E5\u8BE2</h2><h3 id="\u542B\u4E49" tabindex="-1"><a class="header-anchor" href="#\u542B\u4E49" aria-hidden="true">#</a> \u542B\u4E49</h3><p>\u5D4C\u5957\u5728\u5176\u4ED6\u8BED\u53E5\u5185\u90E8\u7684select\u8BED\u53E5\u79F0\u4E3A\u5B50\u67E5\u8BE2\u6216\u5185\u67E5\u8BE2\uFF0C \u5916\u9762\u7684\u8BED\u53E5\u53EF\u4EE5\u662Finsert\u3001update\u3001delete\u3001select\u7B49\uFF0C\u4E00\u822Cselect\u4F5C\u4E3A\u5916\u9762\u8BED\u53E5\u8F83\u591A \u5916\u9762\u5982\u679C\u4E3Aselect\u8BED\u53E5\uFF0C\u5219\u6B64\u8BED\u53E5\u79F0\u4E3A\u5916\u67E5\u8BE2\u6216\u4E3B\u67E5\u8BE2</p><h3 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898</h3><p>\u89E3\u51B3\u75DB\u70B9\uFF1A\u5B50\u67E5\u8BE2\u5185\u90E8\u6267\u884C\u8BA1\u5212\u5668\u662F\u8FD9\u6837\u6267\u884C\u7684\uFF1A\u5148\u67E5\u5916\u8868\u518D\u5339\u914D\u5185\u8868\uFF0C\u800C\u4E0D\u662F\u5148\u67E5\u8868t2\uFF0C\u5F53\u5916\u8868\u7684\u6570\u636E\u5F88\u5927\u65F6\uFF0C\u67E5\u8BE2\u901F\u5EA6\u4F1A\u975E\u5E38\u6162\u3002</p><p>\u5EFA\u8BAE\u4F7F\u7528\u8FDE\u63A5(JOIN) \u6765\u4EE3\u66FF\u5B50\u67E5\u8BE2\uFF0CMYSQl \u4E0D\u9700\u8981\u5728\u5185\u5B58\u4E2D\u521B\u5EFA\u4E34\u65F6\u8868\u6765\u5B8C\u6210\u8FD9\u4E2A\u903B\u8F91\u4E0A\u9700\u8981\u4E24\u4E2A\u8868\u7684\u67E5\u8BE2\u5DE5\u4F5C\u3002\u53E6\u5916\uFF1A\u5982\u679C\u4F60\u7684\u5E94\u7528\u7A0B\u5E8F\u6709\u5F88\u591AJOIN \u67E5\u8BE2\uFF0C\u4F60\u5E94\u8BE5\u786E\u8BA4JOIN \u7684\u5B57\u6BB5\u662F\u88AB\u5EFA\u7ACB\u8FC7\u7D22\u5F15\u7684\u3002\u8FD9\u6837MYSQL \u5185\u90E8\u4F1A\u542F\u52A8\u4E3A\u4F60\u4F18\u5316JOIN \u7684sql \u8BED\u53E5\u7684\u673A\u5236\u3002\u800C\u4E14\u8FD9\u4E9B\u88AB\u7528\u6765JOIN\u7684\u5B57\u6BB5\uFF0C\u5E94\u8BE5\u662F\u76F8\u540C\u7684\u7C7B\u578B\u7684\u3002\u4F8B\u5982\uFF1A\u5982\u679C\u4F60\u8981\u628ADECIMAL \u5B57\u6BB5\u548C\u4E00\u4E2AINT \u5B57\u6BB5JOIN\u5728\u4E00\u8D77\uFF0CMYSQL \u5C31\u65E0\u6CD5\u4F7F\u7528\u4ED6\u4EEC\u7684\u7D22\u5F15\u3002\u5BF9\u4E8E\u90A3\u4E9BSTRING\u7C7B\u578B\uFF0C\u8FD8\u9700\u8981\u6709\u76F8\u540C\u7684\u5B57\u7B26\u96C6\u624D\u884C\u3002</p><h2 id="\u67E5\u8BE2\u6267\u884C\u539F\u5219" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2\u6267\u884C\u539F\u5219" aria-hidden="true">#</a> \u67E5\u8BE2\u6267\u884C\u539F\u5219</h2><p>\u5C0F\u8868\u9A71\u52A8\u5927\u8868\u7684\u539F\u5219\uFF0C\u5C0F\u8868\u9A71\u52A8\u5927\u8868\u7684\u4E3B\u8981\u76EE\u7684\u662F\u901A\u8FC7\u51CF\u5C11\u8868\u8FDE\u63A5\u521B\u5EFA\u7684\u6B21\u6570\uFF0C\u52A0\u5FEB\u67E5\u8BE2\u901F\u5EA6 \u3002</p><p>\u901A\u8FC7EXPLAIN\u67E5\u770BSQL\u8BED\u53E5\u7684\u6267\u884C\u8BA1\u5212\u53EF\u4EE5\u5224\u65AD\u5728\u8C01\u662F\u9A71\u52A8\u8868\uFF0CEXPLAIN\u8BED\u53E5\u5206\u6790\u51FA\u6765\u7684\u7B2C\u4E00\u884C\u7684\u8868\u5373\u662F\u9A71\u52A8\u8868 ;</p><p><strong>JOIN</strong>\u67E5\u8BE2\u5982\u4F55\u9009\u62E9\u9A71\u52A8\u8868\u4E0E\u88AB\u9A71\u52A8\u8868 ?</p><p>\u5728JOIN\u67E5\u8BE2\u4E2D\u7ECF\u5E38\u7528\u5230\u7684 <strong>inner join\u3001left join\u3001right join</strong></p><ol><li>\u5F53\u4F7F\u7528left join\u65F6\uFF0C\u5DE6\u8868\u662F\u9A71\u52A8\u8868\uFF0C\u53F3\u8868\u662F\u88AB\u9A71\u52A8\u8868 ;</li><li>\u5F53\u4F7F\u7528right join\u65F6\uFF0C\u53F3\u8868\u65F6\u9A71\u52A8\u8868\uFF0C\u5DE6\u8868\u662F\u88AB\u9A71\u52A8\u8868 ;</li><li>\u5F53\u4F7F\u7528inner join\u65F6\uFF0Cmysql\u4F1A\u9009\u62E9\u6570\u636E\u91CF\u6BD4\u8F83\u5C0F\u7684\u8868\u4F5C\u4E3A\u9A71\u52A8\u8868\uFF0C\u5927\u8868\u4F5C\u4E3A\u88AB\u9A71\u52A8\u8868 ;</li></ol><h2 id="\u542B\u4E49-1" tabindex="-1"><a class="header-anchor" href="#\u542B\u4E49-1" aria-hidden="true">#</a> \u542B\u4E49</h2><p>\u53C8\u79F0\u591A\u8868\u67E5\u8BE2\uFF0C\u5F53\u67E5\u8BE2\u7684\u5B57\u6BB5\u6765\u81EA\u4E8E\u591A\u4E2A\u8868\u65F6\uFF0C\u5C31\u4F1A\u7528\u5230\u8FDE\u63A5\u67E5\u8BE2</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>select \u5B57\u6BB51\uFF0C\u5B57\u6BB52

from \u88681\uFF0C\u88682,...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7B1B\u5361\u5C14\u4E58\u79EF\u73B0\u8C61" tabindex="-1"><a class="header-anchor" href="#\u7B1B\u5361\u5C14\u4E58\u79EF\u73B0\u8C61" aria-hidden="true">#</a> \u7B1B\u5361\u5C14\u4E58\u79EF\u73B0\u8C61</h2><p>\u5F53\u67E5\u8BE2\u591A\u4E2A\u8868\u65F6\uFF0C\u6CA1\u6709\u6DFB\u52A0\u6709\u6548\u7684\u8FDE\u63A5\u6761\u4EF6\uFF0C\u5BFC\u81F4\u591A\u4E2A\u8868\u6240\u6709\u884C\u5B9E\u73B0\u5B8C\u5168\u8FDE\u63A5</p><p>\u88681 \u6709m\u884C\uFF0C\u88682\u6709n\u884C\uFF0C\u7ED3\u679C=m*n\u884C</p><p>\u53D1\u751F\u539F\u56E0\uFF1A\u6CA1\u6709\u6709\u6548\u7684\u8FDE\u63A5\u6761\u4EF6 \u5982\u4F55\u907F\u514D\uFF1A\u6DFB\u52A0\u6709\u6548\u7684\u8FDE\u63A5\u6761\u4EF6</p><h2 id="\u5206\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u5206\u7C7B" aria-hidden="true">#</a> \u5206\u7C7B</h2><p>\u6309\u5E74\u4EE3\u5206\u7C7B\uFF1A</p><ol><li>sql92\u6807\u51C6:\u4EC5\u4EC5\u652F\u6301\u5185\u8FDE\u63A5</li><li>sql99\u6807\u51C6\u3010\u63A8\u8350\u3011\uFF1A\u652F\u6301\u5185\u8FDE\u63A5+\u5916\u8FDE\u63A5\uFF08\u5DE6\u5916\u548C\u53F3\u5916\uFF09+\u4EA4\u53C9\u8FDE\u63A5</li></ol><p>\u6309\u529F\u80FD\u5206\u7C7B\uFF1A</p><ol><li>\u5185\u8FDE\u63A5\uFF1A\u7B49\u503C\u8FDE\u63A5\u3001\u975E\u7B49\u503C\u8FDE\u63A5\u3001\u81EA\u8FDE\u63A5</li><li>\u5916\u8FDE\u63A5\uFF1A\u5DE6\u5916\u8FDE\u63A5\u3001\u53F3\u5916\u8FDE\u63A5\u3001\u5916\u8FDE\u63A5\uFF08mysql\u4E0D\u652F\u6301\uFF09</li><li>\u4EA4\u53C9\u8FDE\u63A5</li></ol><h2 id="\u7B49\u503C\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u7B49\u503C\u8FDE\u63A5" aria-hidden="true">#</a> \u7B49\u503C\u8FDE\u63A5</h2><ol><li>\u591A\u8868\u7B49\u503C\u8FDE\u63A5\u7684\u7ED3\u679C\u4E3A\u591A\u8868\u7684\u4EA4\u96C6\u90E8\u5206</li><li>n\u8868\u8FDE\u63A5\uFF0C\u81F3\u5C11\u9700\u8981n-1\u4E2A\u8FDE\u63A5\u6761\u4EF6</li><li>\u8868\u7684\u987A\u5E8F\u6CA1\u6709\u8981\u6C42</li><li>\u4E00\u822C\u9700\u8981\u4E3A\u8868\u8D77\u522B\u540D</li><li>\u53EF\u4EE5\u642D\u914D\u524D\u9762\u4ECB\u7ECD\u7684\u6240\u6709\u5B50\u53E5\u4F7F\u7528\uFF0C\u6BD4\u5982\u6392\u5E8F\u3001\u5206\u7EC4\u3001\u7B5B\u9009</li></ol><h3 id="\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B" aria-hidden="true">#</a> \u6848\u4F8B</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code># \u67E5\u8BE2\u5458\u5DE5\u540D\u548C\u5BF9\u5E94\u7684\u90E8\u95E8\u540D
SELECT
	last_name,
	department_name 
FROM
	employees,
	departments 
WHERE
	employees.\`department_id\` = departments.\`department_id\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4E3A\u8868\u8D77\u522B\u540D" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u8868\u8D77\u522B\u540D" aria-hidden="true">#</a> \u4E3A\u8868\u8D77\u522B\u540D</h3><ol><li>\u63D0\u9AD8\u8BED\u53E5\u7684\u7B80\u6D01\u5EA6</li><li>\u533A\u5206\u591A\u4E2A\u91CD\u540D\u7684\u5B57\u6BB5</li></ol><p><code>\u6CE8\u610F</code>\uFF1A\u5982\u679C\u4E3A\u8868\u8D77\u4E86\u522B\u540D\uFF0C\u5219\u67E5\u8BE2\u7684\u5B57\u6BB5\u5C31\u4E0D\u80FD\u4F7F\u7528\u539F\u6765\u7684\u8868\u540D\u53BB\u9650\u5B9A</p><ol><li><p>\u67E5\u8BE2\u5458\u5DE5\u540D\u3001\u5DE5\u79CD\u53F7\u3001\u5DE5\u79CD\u540D</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.last_name,
	e.job_id,
	j.job_title 
FROM
	employees e,
	jobs j 
WHERE
	e.\`job_id\` = j.\`job_id\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u52A0\u7B5B\u9009\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u52A0\u7B5B\u9009\u6761\u4EF6" aria-hidden="true">#</a> \u52A0\u7B5B\u9009\u6761\u4EF6</h3><ol><li><p>\u67E5\u8BE2\u6709\u5956\u91D1\u7684\u5458\u5DE5\u540D\u3001\u90E8\u95E8\u540D</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	department_name,
	commission_pct 
FROM
	employees e,
	departments d 
WHERE
	e.\`department_id\` = d.\`department_id\` 
	AND e.\`commission_pct\` IS NOT NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u57CE\u5E02\u540D\u4E2D\u7B2C\u4E8C\u4E2A\u5B57\u7B26\u4E3Ao\u7684\u90E8\u95E8\u540D\u548C\u57CE\u5E02\u540D</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	department_name,
	city 
FROM
	departments d,
	locations l 
WHERE
	d.\`location_id\` = l.\`location_id\` 
	AND city LIKE &#39;_o%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u52A0\u5206\u7EC4" tabindex="-1"><a class="header-anchor" href="#\u52A0\u5206\u7EC4" aria-hidden="true">#</a> \u52A0\u5206\u7EC4</h3><ol><li><p>\u67E5\u8BE2\u6BCF\u4E2A\u57CE\u5E02\u7684\u90E8\u95E8\u4E2A\u6570</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	COUNT(*) \u4E2A\u6570,
	city 
FROM
	departments d,
	locations l 
WHERE
	d.\`location_id\` = l.\`location_id\` 
GROUP BY
	city;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u6709\u5956\u91D1\u7684\u6BCF\u4E2A\u90E8\u95E8\u7684\u90E8\u95E8\u540D\u548C\u90E8\u95E8\u7684\u9886\u5BFC\u7F16\u53F7\u548C\u8BE5\u90E8\u95E8\u7684\u6700\u4F4E\u5DE5\u8D44</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	department_name,
	d.\`manager_id\`,
	MIN( salary ) 
FROM
	departments d,
	employees e 
WHERE
	d.\`department_id\` = e.\`department_id\` 
	AND commission_pct IS NOT NULL 
GROUP BY
	department_name,
	d.\`manager_id\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u6BCF\u4E2A\u5DE5\u79CD\u7684\u5DE5\u79CD\u540D\u548C\u5458\u5DE5\u7684\u4E2A\u6570\uFF0C\u5E76\u4E14\u6309\u5458\u5DE5\u4E2A\u6570\u964D\u5E8F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	job_title,
	COUNT(*) 
FROM
	employees e,
	jobs j 
WHERE
	e.\`job_id\` = j.\`job_id\` 
GROUP BY
	job_title 
ORDER BY
	COUNT(*) DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u5458\u5DE5\u540D\u3001\u90E8\u95E8\u540D\u548C\u6240\u5728\u7684\u57CE\u5E02\uFF0C\u5E76\u4E14\u57CE\u5E02\u540D\u4EE5s\u5F00\u5934\uFF0C\u6309\u90E8\u95E8\u540D\u79F0\u964D\u5E8F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.last_name \u5458\u5DE5\u540D,
	d.department_name \u90E8\u95E8\u540D,
	l.city \u57CE\u5E02 
FROM
	employees e,
	departments d,
	locations l 
WHERE
	e.department_id = d.department_id 
	AND d.location_id = l.location_id 
	AND city LIKE &#39;s%&#39; 
ORDER BY
	department_name DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="\u975E\u7B49\u503C\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u975E\u7B49\u503C\u8FDE\u63A5" aria-hidden="true">#</a> \u975E\u7B49\u503C\u8FDE\u63A5</h2><h3 id="\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u8BED\u6CD5" aria-hidden="true">#</a> \u8BED\u6CD5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>   	select \u67E5\u8BE2\u5217\u8868
   	from \u88681 \u522B\u540D,\u88682 \u522B\u540D
   	where \u975E\u7B49\u503C\u7684\u8FDE\u63A5\u6761\u4EF6
   	\u3010and \u7B5B\u9009\u6761\u4EF6\u3011
   	\u3010group by \u5206\u7EC4\u5B57\u6BB5\u3011
   	\u3010having \u5206\u7EC4\u540E\u7684\u7B5B\u9009\u3011
   	\u3010order by \u6392\u5E8F\u5B57\u6BB5\u3011
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6848\u4F8B2" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B2" aria-hidden="true">#</a> \u6848\u4F8B2</h3><ol><li><p>\u67E5\u8BE2\u5458\u5DE5\u7684\u5DE5\u8D44\u548C\u5DE5\u8D44\u7EA7\u522B</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.salary \u5DE5\u8D44,
	j.grade_level \u5DE5\u8D44\u7EA7\u522B 
FROM
	employees e,
	job_grades j 
WHERE
	e.salary BETWEEN j.lowest_sal 
	AND j.highest_sal;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u5458\u5DE5\u7684\u5DE5\u8D44\u548C\u5DE5\u8D44\u7EA7\u522B\u5E76\u7B5B\u9009\u51FA\u7EA7\u522B\u4E3AA\u7684</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.salary \u5DE5\u8D44,
	j.grade_level \u5DE5\u8D44\u7EA7\u522B 
FROM
	employees e,
	job_grades j 
WHERE
	e.salary BETWEEN j.lowest_sal 
	AND j.highest_sal 
	AND j.grade_level = &#39;A&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="\u81EA\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u81EA\u8FDE\u63A5" aria-hidden="true">#</a> \u81EA\u8FDE\u63A5</h2><p>\u8FDE\u63A5\u7684\u76F8\u540C\u7684\u8868</p><h3 id="\u8BED\u6CD5-1" tabindex="-1"><a class="header-anchor" href="#\u8BED\u6CD5-1" aria-hidden="true">#</a> \u8BED\u6CD5</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>	select \u67E5\u8BE2\u5217\u8868
	from \u8868 \u522B\u540D1,\u8868 \u522B\u540D2
	where \u7B49\u503C\u7684\u8FDE\u63A5\u6761\u4EF6
	\u3010and \u7B5B\u9009\u6761\u4EF6\u3011
	\u3010group by \u5206\u7EC4\u5B57\u6BB5\u3011
	\u3010having \u5206\u7EC4\u540E\u7684\u7B5B\u9009\u3011
	\u3010order by \u6392\u5E8F\u5B57\u6BB5\u3011
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><p>\u67E5\u8BE2\u5458\u5DE5\u540D\u548C\u4E0A\u7EA7\u7684\u540D\u79F0</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.last_name \u5458\u5DE5\u540D,
	m.last_name \u4E0A\u7EA7\u540D\u79F0 
FROM
	employees e,
	employees m 
WHERE
	e.manager_id = m.employee_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="sql99\u8BED\u6CD5-\u5185\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#sql99\u8BED\u6CD5-\u5185\u8FDE\u63A5" aria-hidden="true">#</a> SQL99\u8BED\u6CD5-\u5185\u8FDE\u63A5</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>select \u67E5\u8BE2\u5217\u8868
from \u88681 \u522B\u540D
\u3010inner\u3011 join \u88682 \u522B\u540D on \u8FDE\u63A5\u6761\u4EF6
where \u7B5B\u9009\u6761\u4EF6
group by \u5206\u7EC4\u5217\u8868
having \u5206\u7EC4\u540E\u7684\u7B5B\u9009
order by \u6392\u5E8F\u5217\u8868
limit \u5B50\u53E5;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u7279\u70B9" tabindex="-1"><a class="header-anchor" href="#\u7279\u70B9" aria-hidden="true">#</a> \u7279\u70B9</h3><ol><li>\u8868\u7684\u987A\u5E8F\u53EF\u4EE5\u8C03\u6362</li><li>\u5185\u8FDE\u63A5\u7684\u7ED3\u679C=\u591A\u8868\u7684\u4EA4\u96C6</li><li>n\u8868\u8FDE\u63A5\u81F3\u5C11\u9700\u8981n-1\u4E2A\u8FDE\u63A5\u6761\u4EF6</li><li>\u6DFB\u52A0\u6392\u5E8F\u3001\u5206\u7EC4\u3001\u7B5B\u9009</li><li>inner\u53EF\u4EE5\u7701\u7565</li><li>\u7B5B\u9009\u6761\u4EF6\u653E\u5728where\u540E\u9762\uFF0C\u8FDE\u63A5\u6761\u4EF6\u653E\u5728on\u540E\u9762\uFF0C\u63D0\u9AD8\u5206\u79BB\u6027\uFF0C\u4FBF\u4E8E\u9605\u8BFB</li><li>inner join\u8FDE\u63A5\u548Csql92\u8BED\u6CD5\u4E2D\u7684\u7B49\u503C\u8FDE\u63A5\u6548\u679C\u662F\u4E00\u6837\u7684\uFF0C\u90FD\u662F\u67E5\u8BE2\u591A\u8868\u7684\u4EA4\u96C6</li></ol><h3 id="\u5206\u7C7B-1" tabindex="-1"><a class="header-anchor" href="#\u5206\u7C7B-1" aria-hidden="true">#</a> \u5206\u7C7B</h3><ul><li>\u7B49\u503C\u8FDE\u63A5</li><li>\u975E\u7B49\u503C\u8FDE\u63A5</li><li>\u81EA\u8FDE\u63A5</li></ul><h3 id="\u5185\u8FDE\u63A5-\u7B49\u503C\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u5185\u8FDE\u63A5-\u7B49\u503C\u8FDE\u63A5" aria-hidden="true">#</a> \u5185\u8FDE\u63A5-\u7B49\u503C\u8FDE\u63A5</h3><ol><li><p>\u67E5\u8BE2\u5458\u5DE5\u540D\u3001\u90E8\u95E8\u540D</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	department_name 
FROM
	departments d
	INNER JOIN employees e ON e.\`department_id\` = d.\`department_id\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u540D\u5B57\u4E2D\u5305\u542Be\u7684\u5458\u5DE5\u540D\u548C\u5DE5\u79CD\u540D\uFF08\u6DFB\u52A0\u7B5B\u9009\uFF09</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	job_title 
FROM
	employees e
	JOIN jobs j ON e.\`job_id\` = j.\`job_id\` 
WHERE
	e.\`last_name\` LIKE &#39;%e%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u90E8\u95E8\u4E2A\u6570&gt;3\u7684\u57CE\u5E02\u540D\u548C\u90E8\u95E8\u4E2A\u6570\uFF0C\uFF08\u6DFB\u52A0\u5206\u7EC4+\u7B5B\u9009\uFF09</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	COUNT( department_id ) \u90E8\u95E8\u4E2A\u6570,
	city \u57CE\u5E02\u540D 
FROM
	departments d
	JOIN locations l ON d.location_id = l.location_id 
GROUP BY
	l.city 
HAVING
	COUNT( department_id )&gt; 3;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u54EA\u4E2A\u90E8\u95E8\u7684\u5458\u5DE5\u4E2A\u6570&gt;3\u7684\u90E8\u95E8\u540D\u548C\u5458\u5DE5\u4E2A\u6570\uFF0C\u5E76\u6309\u4E2A\u6570\u964D\u5E8F\uFF08\u6DFB\u52A0\u6392\u5E8F\uFF09</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	COUNT(*) \u5458\u5DE5\u4E2A\u6570,
	d.department_name \u90E8\u95E8\u540D\u79F0 
FROM
	departments d
	JOIN employees e ON d.department_id = e.department_id 
GROUP BY
	d.department_id 
HAVING
	COUNT(
	*)&gt; 3 
ORDER BY
	1 DESC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u5458\u5DE5\u540D\u3001\u90E8\u95E8\u540D\u3001\u5DE5\u79CD\u540D\uFF0C\u5E76\u6309\u90E8\u95E8\u540D\u964D\u5E8F\uFF08\u6DFB\u52A0\u4E09\u8868\u8FDE\u63A5\uFF09</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.last_name \u5458\u5DE5\u540D,
	d.department_name \u90E8\u95E8\u53F7,
	j.job_title \u5DE5\u79CD\u540D 
FROM
	employees e
	JOIN departments d ON e.department_id = d.department_id
	JOIN jobs j ON e.job_id = j.job_id 
ORDER BY
	d.department_name DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5185\u8FDE\u63A5-\u975E\u7B49\u503C\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u5185\u8FDE\u63A5-\u975E\u7B49\u503C\u8FDE\u63A5" aria-hidden="true">#</a> \u5185\u8FDE\u63A5-\u975E\u7B49\u503C\u8FDE\u63A5</h3><ol><li><p>\u67E5\u8BE2\u5458\u5DE5\u7684\u5DE5\u8D44\u7EA7\u522B</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.last_name \u5458\u5DE5\u540D,
	e.salary \u85AA\u6C34,
	j.grade_level \u5DE5\u8D44\u7EA7\u522B 
FROM
	employees e
	JOIN job_grades j ON e.salary BETWEEN j.lowest_sal 
	AND j.highest_sal;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u5DE5\u8D44\u7EA7\u522B\u7684\u4E2A\u6570&gt;20\u7684\u4E2A\u6570\uFF0C\u5E76\u4E14\u6309\u5DE5\u8D44\u7EA7\u522B\u964D\u5E8F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	j.grade_level \u5DE5\u8D44\u7EA7\u522B,
	COUNT( * ) \u4E2A\u6570 
FROM
	employees e
	JOIN job_grades j ON e.salary BETWEEN j.lowest_sal 
	AND j.highest_sal 
GROUP BY
	j.grade_level 
HAVING
	COUNT( * ) &gt; 20 
ORDER BY
	2 DESC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5185\u8FDE\u63A5-\u81EA\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u5185\u8FDE\u63A5-\u81EA\u8FDE\u63A5" aria-hidden="true">#</a> \u5185\u8FDE\u63A5-\u81EA\u8FDE\u63A5</h3><ol><li><p>\u67E5\u8BE2\u5458\u5DE5\u7684\u540D\u5B57\u3001\u4E0A\u7EA7\u7684\u540D\u5B57</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.last_name \u5458\u5DE5\u540D,
	m.last_name \u4E0A\u7EA7\u540D 
FROM
	employees e
	JOIN employees m ON e.manager_id = m.employee_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u59D3\u540D\u4E2D\u5305\u542B\u5B57\u7B26k\u7684\u5458\u5DE5\u7684\u540D\u5B57\u3001\u4E0A\u7EA7\u7684\u540D\u5B57</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	e.last_name \u5458\u5DE5\u540D,
	m.last_name \u4E0A\u7EA7\u540D 
FROM
	employees e
	JOIN employees m ON e.manager_id = m.employee_id 
WHERE
	e.last_name LIKE &#39;%k%&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="sql99\u8BED\u6CD5-\u5916\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#sql99\u8BED\u6CD5-\u5916\u8FDE\u63A5" aria-hidden="true">#</a> SQL99\u8BED\u6CD5-\u5916\u8FDE\u63A5</h2><h3 id="\u8BED\u6CD5-2" tabindex="-1"><a class="header-anchor" href="#\u8BED\u6CD5-2" aria-hidden="true">#</a> \u8BED\u6CD5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>select \u67E5\u8BE2\u5217\u8868
from \u88681 \u522B\u540D
left|right|full\u3010outer\u3011 join \u88682 \u522B\u540D on \u8FDE\u63A5\u6761\u4EF6
where \u7B5B\u9009\u6761\u4EF6
group by \u5206\u7EC4\u5217\u8868
having \u5206\u7EC4\u540E\u7684\u7B5B\u9009
order by \u6392\u5E8F\u5217\u8868
limit \u5B50\u53E5;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> \u5E94\u7528\u573A\u666F</h3><p>\u7528\u4E8E\u67E5\u8BE2\u4E00\u4E2A\u8868\u4E2D\u6709\uFF0C\u53E6\u4E00\u4E2A\u8868\u6CA1\u6709\u7684\u8BB0\u5F55</p><h3 id="\u7279\u70B9-1" tabindex="-1"><a class="header-anchor" href="#\u7279\u70B9-1" aria-hidden="true">#</a> \u7279\u70B9</h3><ol><li><p>\u5916\u8FDE\u63A5\u7684\u67E5\u8BE2\u7ED3\u679C\u4E3A\u4E3B\u8868\u4E2D\u7684\u6240\u6709\u8BB0\u5F55</p><p>\u5982\u679C\u4ECE\u8868\u4E2D\u6709\u548C\u5B83\u5339\u914D\u7684\uFF0C\u5219\u663E\u793A\u5339\u914D\u7684\u503C</p><p>\u5982\u679C\u4ECE\u8868\u4E2D\u6CA1\u6709\u548C\u5B83\u5339\u914D\u7684\uFF0C\u5219\u663E\u793Anull</p><p>\u5916\u8FDE\u63A5\u67E5\u8BE2\u7ED3\u679C=\u5185\u8FDE\u63A5\u7ED3\u679C+\u4E3B\u8868\u4E2D\u6709\u800C\u4ECE\u8868\u6CA1\u6709\u7684\u8BB0\u5F55</p></li><li><p>\u5DE6\u5916\u8FDE\u63A5\uFF0C<code>left join</code> \u5DE6\u8FB9\u7684\u662F\u4E3B\u8868</p></li><li><p>\u53F3\u5916\u8FDE\u63A5\uFF0C<code>right join</code> \u53F3\u8FB9\u7684\u662F\u4E3B\u8868</p></li><li><p>\u5DE6\u5916\u548C\u53F3\u5916\u4EA4\u6362\u4E24\u4E2A\u8868\u7684\u987A\u5E8F\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u540C\u6837\u7684\u6548\u679C</p></li><li><p>\u5168\u5916\u8FDE\u63A5=\u5185\u8FDE\u63A5\u7684\u7ED3\u679C+\u88681\u4E2D\u6709\u4F46\u88682\u6CA1\u6709\u7684+\u88682\u4E2D\u6709\u4F46\u88681\u6CA1\u6709\u7684</p></li></ol><h3 id="\u5DE6\u5916\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u5DE6\u5916\u8FDE\u63A5" aria-hidden="true">#</a> \u5DE6\u5916\u8FDE\u63A5</h3><ol><li><p>\u67E5\u8BE2\u54EA\u4E2A\u90E8\u95E8\u6CA1\u6709\u5458\u5DE5</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	d.* 
FROM
	departments d
	LEFT JOIN employees e ON d.department_id = e.department_id 
WHERE
	e.department_id IS NULL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u53F3\u5916\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u53F3\u5916\u8FDE\u63A5" aria-hidden="true">#</a> \u53F3\u5916\u8FDE\u63A5</h3><ol><li><p>\u67E5\u8BE2\u54EA\u4E2A\u90E8\u95E8\u6CA1\u6709\u5458\u5DE5(\u8C03\u6362\u4F4D\u7F6E\u4F7F\u7528RIGHT JOIN)</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	d.* 
FROM
	employees e
	RIGHT JOIN departments d ON d.department_id = e.department_id 
WHERE
	e.department_id IS NULL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5168\u5916\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u5168\u5916\u8FDE\u63A5" aria-hidden="true">#</a> \u5168\u5916\u8FDE\u63A5</h3><p>mysql\u4E0D\u652F\u6301\u5168\u5916\u8FDE\u63A5</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code> <span class="token keyword">USE</span> girls<span class="token punctuation">;</span>
 <span class="token keyword">SELECT</span> b<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span>bo<span class="token punctuation">.</span><span class="token operator">*</span>
 <span class="token keyword">FROM</span> beauty b
 <span class="token keyword">FULL</span> <span class="token keyword">OUTER</span> <span class="token keyword">JOIN</span> boys bo
 <span class="token keyword">ON</span> b<span class="token punctuation">.</span><span class="token identifier"><span class="token punctuation">\`</span>boyfriend_id<span class="token punctuation">\`</span></span> <span class="token operator">=</span> bo<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>beauty\u8868\u4E2D\u6709\u5176\u4ED6\u7684\u6570\u636E\u4E0Eboys\u8868\u6CA1\u6709\u5173\u7CFB(\u5C31\u662F\u8FD9\u4E9B\u5973\u795E\u8FD8\u662F\u5355\u8EAB)\uFF0C\u5C31\u628Aboys\u8868\u7684\u90A3\u90E8\u5206\u5168\u90E8\u663E\u793A\u4E3A\u7A7A\uFF0C</p><p>\u540C\u6837boys\u8868\u6709\u7684beauty\u6CA1\u6709\u7684\u4E5F\u662F\u663E\u793Anull</p><h3 id="\u4EA4\u53C9\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u4EA4\u53C9\u8FDE\u63A5" aria-hidden="true">#</a> \u4EA4\u53C9\u8FDE\u63A5</h3><p>\u4EA4\u53C9\u8054\u63A5\u8FD4\u56DE\u5DE6\u8868\u4E2D\u7684\u6240\u6709\u884C\uFF0C\u5DE6\u8868\u4E2D\u7684\u6BCF\u4E00\u884C\u4E0E\u53F3\u8868\u4E2D\u7684\u6240\u6709\u884C\u7EC4\u5408\u3002\u4EA4\u53C9\u8054\u63A5\u4E5F\u79F0\u4F5C\u7B1B\u5361\u5C14\u79EF\u3002</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code> SELECT b.*,bo.*
 FROM beauty b
 CROSS JOIN boys bo;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,78),a=[d];function r(v,m){return i(),n("div",null,a)}var t=e(s,[["render",r],["__file","\u8FDE\u63A5\u67E5\u8BE2.html.vue"]]);export{t as default};
