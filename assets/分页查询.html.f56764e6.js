import{_ as e,o as i,c as s,a as n}from"./app.4a9c1875.js";const d={},a=n(`<h1 id="\u5206\u9875\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u5206\u9875\u67E5\u8BE2" aria-hidden="true">#</a> \u5206\u9875\u67E5\u8BE2</h1><h2 id="\u5E94\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528\u573A\u666F" aria-hidden="true">#</a> \u5E94\u7528\u573A\u666F</h2><p>\u5F53\u8981\u663E\u793A\u7684\u6570\u636E\uFF0C\u4E00\u9875\u663E\u793A\u4E0D\u5168\uFF0C\u9700\u8981\u5206\u9875\u63D0\u4EA4sql\u8BF7\u6C42</p><h2 id="\u8BED\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u8BED\u6CD5" aria-hidden="true">#</a> \u8BED\u6CD5</h2><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>	select \u67E5\u8BE2\u5217\u8868
	from \u8868
	\u3010join type\u3011 join \u88682
	on \u8FDE\u63A5\u6761\u4EF6
	where \u7B5B\u9009\u6761\u4EF6
	group by \u5206\u7EC4\u5B57\u6BB5
	having \u5206\u7EC4\u540E\u7684\u7B5B\u9009
	order by \u6392\u5E8F\u7684\u5B57\u6BB5\u3011
	limit \u3010offset,\u3011size;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>offset</code>\u8981\u663E\u793A\u6761\u76EE\u7684\u8D77\u59CB\u7D22\u5F15\uFF08\u8D77\u59CB\u7D22\u5F15\u4ECE0\u5F00\u59CB\uFF09</p><p><code>size</code> \u8981\u663E\u793A\u7684\u6761\u76EE\u4E2A\u6570</p><h2 id="\u5206\u9875\u516C\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u5206\u9875\u516C\u5F0F" aria-hidden="true">#</a> \u5206\u9875\u516C\u5F0F</h2><p><code>(page-1)*size,size</code></p><h2 id="\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B" aria-hidden="true">#</a> \u6848\u4F8B</h2><ol><li><p>\u67E5\u8BE2\u524D\u4E94\u6761\u5458\u5DE5\u4FE1\u606F</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT * FROM  employees LIMIT 0,5;
# \u6216\u8005
SELECT * FROM  employees LIMIT 5;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u67E5\u8BE2\u7B2C11\u6761~\u7B2C25\u6761</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT * FROM  employees LIMIT 10,15;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u6709\u5956\u91D1\u7684\u5458\u5DE5\u4FE1\u606F\uFF0C\u5E76\u4E14\u5DE5\u8D44\u8F83\u9AD8\u7684\u524D10\u540D\u663E\u793A\u51FA\u6765</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT 
    * 
FROM
    employees 
WHERE commission_pct IS NOT NULL 
ORDER BY salary DESC 
LIMIT 10;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,11),l=[a];function r(c,v){return i(),s("div",null,l)}var o=e(d,[["render",r],["__file","\u5206\u9875\u67E5\u8BE2.html.vue"]]);export{o as default};
