import{_ as e,o as i,c as n,a as l}from"./app.4a9c1875.js";const s={},d=l(`<h1 id="\u6761\u4EF6\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u6761\u4EF6\u67E5\u8BE2" aria-hidden="true">#</a> \u6761\u4EF6\u67E5\u8BE2</h1><p>\u8FC7\u6EE4\uFF1A\u4F7F\u7528WHERE \u5B50\u53E5\uFF0C\u5C06\u4E0D\u6EE1\u8DB3\u6761\u4EF6\u7684\u884C\u8FC7\u6EE4\u6389\u3002</p><p>\u8BED\u6CD5\uFF1A</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>select \u67E5\u8BE2\u5217\u8868 from \u8868\u540D where \u7B5B\u9009\u6761\u4EF6;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><thead><tr><th>\u6BD4\u8F83\u8FD0\u7B97\u7B26</th><th>&gt;\u3001&lt; \u3001&gt;=\u3001&lt;=\u3001= \u3001&lt;&gt;</th><th>\u5927\u4E8E\u3001\u5C0F\u4E8E\u3001\u5927\u4E8E\u7B49\u4E8E\u3001\u5C0F\u4E8E\u7B49\u4E8E\u3001\u7B49\u4E8E\u3001\u4E0D\u7B49\u4E8E</th></tr></thead><tbody><tr><td></td><td>BETWEEN ...AND...</td><td>\u663E\u793A\u5728\u67D0\u4E00\u533A\u95F4\u7684\u503C(\u542B\u5934\u542B\u5C3E)</td></tr><tr><td></td><td>IN(set)</td><td>\u663E\u793A\u5728in\u5217\u8868\u4E2D\u7684\u503C\uFF0C\u4F8B\uFF1Ain(100,200)</td></tr><tr><td></td><td>LIKE \u901A\u914D\u7B26</td><td>\u6A21\u7CCA\u67E5\u8BE2\uFF0CLike\u8BED\u53E5\u4E2D\u6709\u4E24\u4E2A\u901A\u914D\u7B26\uFF1A% \u7528\u6765\u5339\u914D\u591A\u4E2A\u5B57\u7B26\uFF1B\u4F8Bfirst_name like \u2018a%\u2019\uFF1B_ \u7528\u6765\u5339\u914D\u4E00\u4E2A\u5B57\u7B26\u3002\u4F8Bfirst_name like \u2018a_\u2019;</td></tr><tr><td></td><td>IS NULL</td><td>\u5224\u65AD\u662F\u5426\u4E3A\u7A7Ais null; \u5224\u65AD\u4E3A\u7A7A\uFF1Bis not null; \u5224\u65AD\u4E0D\u4E3A\u7A7A</td></tr><tr><td>\u903B\u8F91\u8FD0\u7B97\u7B26</td><td>and (&amp;&amp;)</td><td>\u591A\u4E2A\u6761\u4EF6\u540C\u65F6\u6210\u7ACB</td></tr><tr><td></td><td>or (||)</td><td>\u591A\u4E2A\u6761\u4EF6\u4EFB\u4E00\u6210\u7ACB</td></tr><tr><td></td><td>not (!)</td><td>\u4E0D\u6210\u7ACB\uFF0C\u4F8B\uFF1Awhere not(salary&gt;100);</td></tr></tbody></table><h2 id="\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B" aria-hidden="true">#</a> \u6848\u4F8B</h2><h3 id="\u6309\u6761\u4EF6\u8868\u8FBE\u5F0F\u7B5B\u9009" tabindex="-1"><a class="header-anchor" href="#\u6309\u6761\u4EF6\u8868\u8FBE\u5F0F\u7B5B\u9009" aria-hidden="true">#</a> \u6309\u6761\u4EF6\u8868\u8FBE\u5F0F\u7B5B\u9009</h3><ol><li><p>\u67E5\u8BE2\u5DE5\u8D44&gt;12000\u7684\u5458\u5DE5\u4FE1\u606F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT 
	*
FROM
	employees
WHERE
	salary&gt;12000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u90E8\u95E8\u7F16\u53F7\u4E0D\u7B49\u4E8E90\u53F7\u7684\u5458\u5DE5\u540D\u548C\u90E8\u95E8\u7F16\u53F7</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT 
	last_name,
	department_id
FROM
	employees
WHERE
	department_id&lt;&gt;90;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u6309\u903B\u8F91\u8868\u8FBE\u5F0F\u7B5B\u9009" tabindex="-1"><a class="header-anchor" href="#\u6309\u903B\u8F91\u8868\u8FBE\u5F0F\u7B5B\u9009" aria-hidden="true">#</a> \u6309\u903B\u8F91\u8868\u8FBE\u5F0F\u7B5B\u9009</h3><ol><li><p>\u67E5\u8BE2\u5DE5\u8D44\u572810000\u523020000\u4E4B\u95F4\u7684\u5458\u5DE5\u540D\u3001\u5DE5\u8D44\u4EE5\u53CA\u5956\u91D1</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	salary,
	commission_pct
FROM
	employees
WHERE
	salary&gt;=10000 AND salary&lt;=20000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6216\u8005</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	salary,
	commission_pct 
FROM
	employees 
WHERE
	salary BETWEEN 10000 
	AND 20000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u90E8\u95E8\u7F16\u53F7\u4E0D\u662F\u572890\u5230110\u4E4B\u95F4\uFF0C\u6216\u8005\u5DE5\u8D44\u9AD8\u4E8E15000\u7684\u5458\u5DE5\u4FE1\u606F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	* 
FROM
	employees 
WHERE
	NOT ( department_id &gt;= 90 AND department_id &lt;= 110 ) 
	OR salary &gt; 15000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6216\u8005</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	* 
FROM
	employees 
WHERE
	NOT ( department_id BETWEEN 90 AND 110 ) 
	OR salary &gt; 15000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u6A21\u7CCA\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u6A21\u7CCA\u67E5\u8BE2" aria-hidden="true">#</a> \u6A21\u7CCA\u67E5\u8BE2</h3><ol><li><p>\u67E5\u8BE2\u5458\u5DE5\u540D\u4E2D\u5305\u542B\u5B57\u7B26a\u7684\u5458\u5DE5\u4FE1\u606F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>select 
	*
from
	employees
where
	last_name like &#39;%a%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u5458\u5DE5\u540D\u4E2D\u7B2C\u4E09\u4E2A\u5B57\u7B26\u4E3Ae\uFF0C\u7B2C\u4E94\u4E2A\u5B57\u7B26\u4E3Aa\u7684\u5458\u5DE5\u540D\u548C\u5DE5\u8D44</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>select
	last_name,
	salary
FROM
	employees
WHERE
	last_name LIKE &#39;__e_a%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u5458\u5DE5\u540D\u4E2D\u7B2C\u4E8C\u4E2A\u5B57\u7B26\u4E3A_\u7684\u5458\u5DE5\u540D</p><p>ESCAPE\uFF1A\u5B9A\u4E49\u8F6C\u4E49\u6807\u8BC6</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name
FROM
	employees
WHERE
	last_name LIKE &#39;_$_%&#39; ESCAPE &#39;$&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="in" tabindex="-1"><a class="header-anchor" href="#in" aria-hidden="true">#</a> IN</h3><p>\u542B\u4E49\uFF1A\u5224\u65AD\u67D0\u5B57\u6BB5\u7684\u503C\u662F\u5426\u5C5E\u4E8Ein\u5217\u8868\u4E2D\u7684\u67D0\u4E00\u9879 \u7279\u70B9\uFF1A</p><ol><li>\u4F7F\u7528in\u63D0\u9AD8\u8BED\u53E5\u7B80\u6D01\u5EA6</li><li>\u5217\u8868\u7684\u503C\u7C7B\u578B\u5FC5\u987B\u4E00\u81F4\u6216\u517C\u5BB9</li><li>\u5217\u8868\u4E2D\u4E0D\u652F\u6301\u901A\u914D\u7B26</li></ol><p>\u67E5\u8BE2\u5458\u5DE5\u7684\u5DE5\u79CD\u7F16\u53F7\u662F IT_PROG\u3001AD_VP\u3001AD_PRES\u4E2D\u7684\u4E00\u4E2A\u5458\u5DE5\u540D\u548C\u5DE5\u79CD\u7F16\u53F7</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	job_id
FROM
	employees
WHERE
	job_id IN( &#39;IT_PROT&#39; ,&#39;AD_VP&#39;,&#39;AD_PRES&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6216\u8005</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	job_id
FROM
	employees
WHERE
	job_id = &#39;IT_PROT&#39; OR job_id = &#39;AD_VP&#39; OR JOB_ID =&#39;AD_PRES&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="is-null" tabindex="-1"><a class="header-anchor" href="#is-null" aria-hidden="true">#</a> IS NULL</h3><p><strong>=\u6216&lt;&gt;\u4E0D\u80FD\u7528\u4E8E\u5224\u65ADnull\u503C</strong> is null\u6216is not null \u53EF\u4EE5\u5224\u65ADnull\u503C</p><ol><li><p>\u67E5\u8BE2\u6CA1\u6709\u5956\u91D1\u7684\u5458\u5DE5\u540D\u548C\u5956\u91D1\u7387</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	commission_pct
FROM
	employees
WHERE
	commission_pct IS NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u6709\u5956\u91D1\u7684\u5458\u5DE5\u540D\u548C\u5956\u91D1\u7387</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	commission_pct
FROM
	employees
WHERE
	commission_pct IS NOT NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="\u5B89\u5168\u7B49\u4E8E" tabindex="-1"><a class="header-anchor" href="#\u5B89\u5168\u7B49\u4E8E" aria-hidden="true">#</a> \u5B89\u5168\u7B49\u4E8E &lt;=&gt;</h3><ol><li><p>\u67E5\u8BE2\u6CA1\u6709\u5956\u91D1\u7684\u5458\u5DE5\u540D\u548C\u5956\u91D1\u7387</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	commission_pct
FROM
	employees
WHERE
	commission_pct &lt;=&gt;NULL;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u5DE5\u8D44\u4E3A12000\u7684\u5458\u5DE5\u4FE1\u606F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	salary
FROM
	employees

WHERE 
	salary &lt;=&gt; 12000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>IS NULL:\u4EC5\u4EC5\u53EF\u4EE5\u5224\u65ADNULL\u503C\uFF0C\u53EF\u8BFB\u6027\u8F83\u9AD8\uFF0C\u5EFA\u8BAE\u4F7F\u7528 &lt;=&gt; :\u65E2\u53EF\u4EE5\u5224\u65ADNULL\u503C\uFF0C\u53C8\u53EF\u4EE5\u5224\u65AD\u666E\u901A\u7684\u6570\u503C\uFF0C\u53EF\u8BFB\u6027\u8F83\u4F4E</p><p><span style="color:red;">\u9519\u8BEF\u7684\u5199\u6CD5\uFF1A</span></p><del><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT
	last_name,
	commission_pct
FROM
	employees

WHERE 
	salary IS 12000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></del>`,27),a=[d];function r(v,m){return i(),n("div",null,a)}var c=e(s,[["render",r],["__file","\u6761\u4EF6\u67E5\u8BE2.html.vue"]]);export{c as default};
