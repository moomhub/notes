import{_ as a,r as e,o as i,c as t,b as n,d as l,a as d,e as c}from"./app.4a9c1875.js";const p={},o=d(`<h1 id="\u65B0\u96F6\u552E\u6570\u636E\u5E93\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#\u65B0\u96F6\u552E\u6570\u636E\u5E93\u8BBE\u8BA1" aria-hidden="true">#</a> \u65B0\u96F6\u552E\u6570\u636E\u5E93\u8BBE\u8BA1</h1><h2 id="\u4E3B\u8981\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u4E3B\u8981\u6982\u5FF5" aria-hidden="true">#</a> \u4E3B\u8981\u6982\u5FF5</h2><p>\u65B0\u96F6\u552E\u5305\u542B\uFF1A\u7EBF\u4E0A--\u7EBF\u4E0B</p><p>SPU\uFF1A\u4EA7\u54C1\u8868</p><p>SKU\uFF1A\u5546\u54C1\u4FE1\u606F</p><h2 id="sku-\u4E0E\u6743\u91CD" tabindex="-1"><a class="header-anchor" href="#sku-\u4E0E\u6743\u91CD" aria-hidden="true">#</a> SKU \u4E0E\u6743\u91CD</h2><blockquote><p>\u6DD8\u5B9D\u7F51\u7684\u6743\u91CD\uFF0C\u4FEE\u6539\u5546\u54C1\u6807\u9898\u4F1A\u5BFC\u81F4\u6539\u5546\u54C1\u6743\u91CD\u4E0B\u964D</p></blockquote><p>\u65B0\u96F6\u552E\u5E73\u53F0\u4E3B\u8981\u662F B2C \u7684\uFF0C\u6240\u4EE5\u4FEE\u6539 SKU \u5BF9\u6743\u91CD\u7684\u5F71\u54CD\u4E0D\u5927\u3002\u4F46\u662F B2B \u7684\u5E73\u53F0\uFF0C\u4FEE\u6539 SKU \u5BF9\u5546\u54C1\u6743\u91CD\u5F71\u54CD\u5F88\u5927\u3002</p><h2 id="\u76F8\u5173\u8BBE\u8BA1\u5173\u7CFB\u56FE" tabindex="-1"><a class="header-anchor" href="#\u76F8\u5173\u8BBE\u8BA1\u5173\u7CFB\u56FE" aria-hidden="true">#</a> \u76F8\u5173\u8BBE\u8BA1\u5173\u7CFB\u56FE</h2><h3 id="\u54C1\u7C7B\u548C\u53C2\u6570\u7ED1\u5B9A" tabindex="-1"><a class="header-anchor" href="#\u54C1\u7C7B\u548C\u53C2\u6570\u7ED1\u5B9A" aria-hidden="true">#</a> \u54C1\u7C7B\u548C\u53C2\u6570\u7ED1\u5B9A</h3><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210922101420858.png" alt="image-20210922101420858"></p><h3 id="\u53C2\u6570\u548C-sku-\u5546\u54C1-\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#\u53C2\u6570\u548C-sku-\u5546\u54C1-\u5173\u7CFB" aria-hidden="true">#</a> \u53C2\u6570\u548C SKU(\u5546\u54C1)\u5173\u7CFB</h3><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210922101458402.png" alt="image-20210922101458402"></p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>create database neti;


CREATE TABLE t_spec_group(
 \`id\` VARCHAR(32) PRIMARY KEY COMMENT &quot;\u4E3B\u952E&quot;,
 \`spg_id\` VARCHAR(32) NOT NULL COMMENT &quot;\u54C1\u7C7B\u7F16\u53F7&quot;,
 \`name\` VARCHAR(200) NOT NULL COMMENT &quot;\u540D\u79F0&quot;,
 UNIQUE KEY unq_spg_id(spg_id),
 UNIQUE KEY unq_spg_name(\`name\`),
 INDEX idx_spg_id(spg_id)
)COMMENT=&quot;\u54C1\u7C7B\u8868&quot;

CREATE TABLE t_spec_param(
id VARCHAR(32) PRIMARY KEY  COMMENT &quot;\u4E3B\u952E&quot;,
spg_id VARCHAR(32) NOT NULL COMMENT &quot;\u54C1\u7C7B\u7F16\u53F7&quot;,
spp_id VARCHAR(32) NOT NULL COMMENT &quot;\u53C2\u6570\u7F16\u53F7&quot;,
\`name\` VARCHAR( 280) NOT NULL COMMENT &quot;\u53C2\u6570\u540D\u79F0&quot;,
\`numeric\` BOOLEAN NOT NULL COMMENT &quot;\u662F\u5426\u4E3A\u6570\u5B57\u53C2\u6570&quot;,
unit VARCHAR(200) COMMENT &quot;\u5355\u4F4D(\u91CF\u8BCD)&quot;,
generic BOOLEAN NOT NULL COMMENT &quot;\u662F\u5426\u4E3A\u901A\u7528\u53C2\u6570&quot;,
searching BOOLEAN NOT NULL COMMENT &quot;\u662F\u5426\u7528\u4E8E\u901A\u7528\u641C\u7D22&quot;,
segements VARCHAR( 508) COMMENT&quot;\u53C2\u6570\u503C&quot;,
INDEX idx_spg_id(spg_id),
INDEX idx_spp_id(spp_id)
)COMMENT=&quot;\u53C2\u6570\u8868&quot;;

CREATE TABLE \`t_brand\` (
  \`id\` varchar(32) NOT NULL COMMENT &#39;\u4E3B\u952E&#39;,
  \`name\` varchar(280) NOT NULL COMMENT &#39;\u540D\u79F0&#39;,
  \`image\` varchar(500) DEFAULT NULL COMMENT &#39;\u56FE\u7247\u7F51\u5740&#39;,
  \`letter\` char(1) NOT NULL COMMENT &#39;\u54C1\u724C\u9996\u5B57\u6BCD&#39;,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`unq_name\` (\`name\`),
  KEY \`idx_letter\` (\`letter\`)
) COMMENT=&#39;\u54C1\u724C\u8868&#39;


CREATE TABLE t_category(
id VARCHAR(32) PRIMARY KEY  COMMENT &quot;\u4E3B\u952E&quot;,
\`name\` VARCHAR( 280) NOT NULL COMMENT &quot;\u5206\u7C7B\u540D\u79F0&quot;,
parent_id VARCHAR(32) COMMENT &quot;\u4E0A\u7EA7\u5206\u7C7B\u83DC\u5355&quot;,
if_parent BOOLEAN NOT NULL COMMENT &quot;\u662F\u5426\u542B\u6709\u4E0B\u7EA7\u5206\u7C7B&quot;,
sort INT UNSIGNED NOT NULL COMMENT &quot;\u6392\u540D\u6307\u6570&quot;,
INDEX idx_parent_id(parent_id),
INDEX idx_sort(sort)
)COMMENT=&quot;\u5546\u54C1\u5206\u7C7B\u8868&quot;;



CREATE TABLE t_category_brand(
category_id VARCHAR(32) COMMENT &quot;\u5206\u7C7B&quot;,
brand_id VARCHAR(32)  COMMENT &quot;\u4E3B\u952E&quot;,
PRIMARY KEY (category_id,brand_id)
)COMMENT=&quot;\u54C1\u724C\u4E0E\u5206\u7C7B\u5173\u8054\u8868&quot;;


CREATE TABLE t_spu(
	id varchar(32) PRIMARY KEY COMMENT&#39;\u4E3B\u952E&#39;,
    title VARCHAR( 200) NOT NULL COMMENT &#39;\u6807\u9898&#39;,
    sub_title VARCHAR( 200) COMMENT&#39;\u526F\u6807\u9898&#39;,
    category_id INT UNSIGNED NOT NULL COMMENT &#39;\u5206\u7C7BID&#39;,
    brand_id INT UNSIGNED COMMENT &#39;\u54C1\u724CID&#39;,
    spg_id INT UNSIGNED NOT NULL COMMENT &#39;\u54C1\u7C7BID&#39;,
    saleable BOOLEAN NOT NULL COMMENT &#39;\u662F\u5426\u4E0A\u67B6&#39;,
    valid BOOLEAN NOT NULL COMMENT &#39;\u662F\u5426\u6709\u6548&#39;,
    create_time TIMESTAMP NOT NULL DEFAULT NOW() COMMENT &#39;\u6DFB\u52A0\u65F6\u95F4&#39;,
    last_update_time TIMESTAMP NOT NULL DEFAULT NOw() COMMENT &#39;\u6700\u540E\u4FEE\u6539\u65F6\u95F4&#39;,
    INDEX idx_brand_id(brand_id),
    INDEX idx_category_id(category_id),
    INDEX idx_spg_id(spg_id),
    INDEX idx_saleable(saleable),
    INDEX idx_valid(valid)
)COMMENT=&quot;\u4EA7\u54C1\u8868&quot;;


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8BA2\u5355\u53F7\u548C\u6D41\u6C34\u53F7\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#\u8BA2\u5355\u53F7\u548C\u6D41\u6C34\u53F7\u7684\u533A\u522B" aria-hidden="true">#</a> \u8BA2\u5355\u53F7\u548C\u6D41\u6C34\u53F7\u7684\u533A\u522B</h2><p>\u8BA2\u5355\u53F7\uFF1A\u8BA2\u5355\u7684\u552F\u4E00\u7F16\u53F7\uFF0C \u800C\u4E14\u7ECF\u5E38\u88AB\u7528\u6765\u68C0\u7D22\uFF0C\u6240\u4EE5\u5E94\u5F53\u662F\u6570\u5B57\u7C7B\u578B\u7684\u4E3B\u952E \u6D41\u6C34\u53F7\uFF1A\u6253\u5370\u5728\u8D2D\u7269\u5355\u636E\u4E0A\u7684\u5B57\u7B26\u4E32\uFF0C\u4FBF\u4E8E\u9605\u8BFB\uFF0C\u4F46\u662F\u4E0D\u7528\u505A\u67E5\u8BE2</p><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20220318141429800.png" alt="image-20220318141429800"></p><h2 id="\u5546\u54C1\u79D2\u6740\u4E1A\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5546\u54C1\u79D2\u6740\u4E1A\u52A1" aria-hidden="true">#</a> \u5546\u54C1\u79D2\u6740\u4E1A\u52A1</h2><p>\u5E93\u5B58\u8D85\u552E\uFF0C\u79D2\u6740\u4E1A\u52A1\u4E0D\u505A\u9650\u5236\u5BFC\u81F4\u51FA\u73B0\u5546\u54C1\u8D85\u552E\u3002</p><p>\u600E\u4E48\u9884\u9632\u6570\u636E\u5E93\u8D85\u552E\u73B0\u8C61?</p><h3 id="\u6570\u636E\u5E93\u4E8B\u52A1\u9694\u79BB\u7EA7\u522B-serializable" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u4E8B\u52A1\u9694\u79BB\u7EA7\u522B-serializable" aria-hidden="true">#</a> \u6570\u636E\u5E93\u4E8B\u52A1\u9694\u79BB\u7EA7\u522B Serializable</h3><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210914110223115.png" alt="image-20210914110223115"></p><h3 id="\u4E50\u89C2\u9501" tabindex="-1"><a class="header-anchor" href="#\u4E50\u89C2\u9501" aria-hidden="true">#</a> \u4E50\u89C2\u9501</h3><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210914110358000.png" alt="image-20210914110358000"></p><h3 id="\u4F7F\u7528-redis-\u5E93\u5B58" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-redis-\u5E93\u5B58" aria-hidden="true">#</a> \u4F7F\u7528 redis \u5E93\u5B58</h3><h4 id="redis-\u4E2D\u7684\u8D85\u552E\u73B0\u8C61" tabindex="-1"><a class="header-anchor" href="#redis-\u4E2D\u7684\u8D85\u552E\u73B0\u8C61" aria-hidden="true">#</a> Redis \u4E2D\u7684\u8D85\u552E\u73B0\u8C61</h4><p>\u56E0\u4E3A Redis \u7684\u5355\u7EBF\u7A0B\u662F\u975E\u963B\u585E\u6267\u884C\u7684\uFF0C\u6240\u4EE5\u5E76\u53D1\u4FEE\u6539\u6570\u636E\u5BB9\u6613\u4EA7\u751F\u8D85\u552E\u7684\u7ED3\u679C</p><h4 id="\u4F7F\u7528-redis-\u4E8B\u52A1\u89E3\u51B3-redis-\u8D85\u552E" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-redis-\u4E8B\u52A1\u89E3\u51B3-redis-\u8D85\u552E" aria-hidden="true">#</a> \u4F7F\u7528 redis \u4E8B\u52A1\u89E3\u51B3 redis \u8D85\u552E</h4><p>Redis \u5F15\u5165\u4E86\u4E8B\u52A1\u673A\u5236(\u6279\u5904\u7406)\uFF0C\u4E00\u6B21\u6027\u628A\u591A\u6761\u547D\u4EE4\u4F20\u9012\u7ED9 Redis \u6267\u884C\uFF0C\u8FD9\u5C31\u907F\u514D\u4E86\u5176\u4ED6\u5BA2\u6237\u7AEF\u4E2D\u95F4\u63D2\u961F\uFF0C\u51FA\u73B0\u8D85\u552E\u7684\u73B0\u8C61\u3002</p><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210914112149311.png" alt="image-20210914112149311"></p><h4 id="\u5982\u4F55\u4FDD\u6301\u4E8B\u52A1\u4E00\u81F4\u6027" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u4FDD\u6301\u4E8B\u52A1\u4E00\u81F4\u6027" aria-hidden="true">#</a> \u5982\u4F55\u4FDD\u6301\u4E8B\u52A1\u4E00\u81F4\u6027?</h4><p>\u4E3A\u4E86\u4FDD\u8BC1\u4E8B\u52A1\u7684\u4E00\u81F4\u6027\uFF0C\u5728\u5F00\u542F\u4E8B\u52A1\u4E4B\u524D\u5FC5\u987B\u8981\u7528 WATCH \u547D\u4EE4\u76D1\u89C6\u8981\u64CD\u4F5C\u7684\u8BB0\u5F55\u3002 redis &gt; WATCH kill_num kill_user</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Redis\u5185\u6267\u884C\u4E8B\u52A1
\u5F00\u542F\u4E8B\u52A1

MULTI

\u5982\u4F55\u5F00\u542F\u4E8B\u52A1?
\u5229\u7528MULTI\u547D\u4EE4\u53EF\u4EE5\u5F00\u542F\u4E00\u4E2A\u4E8B\u52A1

redis &gt; MULTI
\u5F00\u542F\u4E8B\u52A1\u540E\u7684\u6240\u6709\u64CD\u4F5C\u90FD\u4E0D\u4F1A\u7ACB\u5373\u6267\u884C\uFF0C\u53EA\u6709\u6267\u884CEXEC\u547D\u4EE4\u7684\u65F6\u5019\u624D\u4F1A\u6279\u5904\u7406\u6267\u884C
redis &gt; DECR kill_num
redis &gt; RPUSH kill_user 9502
redis &gt; EXEC


#Spring boot

List&lt;Object&gt; txResults = redisTemplate.execute(new SessionCallback&lt;List&lt;Object&gt;&gt;() {
  public List&lt;Object&gt; execute(RedisOperations operations) throws DataAccessException {
    operations.multi();
    operations.opsForSet().add(&quot;key&quot;, &quot;value1&quot;);
    // This will contain the results of all ops in the transaction
    return operations.exec();
  }
});

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6570\u636E\u5E93\u89E3\u51B3\u8D2D\u7269\u7EA0\u7EB7" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u5E93\u89E3\u51B3\u8D2D\u7269\u7EA0\u7EB7" aria-hidden="true">#</a> \u6570\u636E\u5E93\u89E3\u51B3\u8D2D\u7269\u7EA0\u7EB7</h2><h3 id="\u5982\u4F55\u907F\u514D\u7BE1\u6539\u5546\u54C1\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u907F\u514D\u7BE1\u6539\u5546\u54C1\u4FE1\u606F" aria-hidden="true">#</a> \u5982\u4F55\u907F\u514D\u7BE1\u6539\u5546\u54C1\u4FE1\u606F?</h3><p>B2B \u7535\u5546\u5E73\uFF1A\u901A\u5E38\u91C7\u7528\u4FDD\u5B58\u5386\u6B21\u5546\u54C1\u4FEE\u6539\u4FE1\u606F\u3001\u964D\u4F4E\u641C\u7D22\u6392\u540D B2C \u7535\u5546\u5E73\u53F0\uFF1A\u53EA\u9700\u8981\u4FDD\u5B58\u5386\u6B21\u5546\u54C1\u4FEE\u6539\u4FE1\u606F\u5373\u53EF</p><blockquote><p>\u6240\u6709\u6570\u636E\u8868\u8001\u6570\u636E\u6570\u636E\u5F52\u6863\u5904\u7406\uFF0C\u5B9A\u671F\u5C06\u6570\u636E\u5E93\u4E2D\u7684\u903B\u8F91\u5220\u9664\u7684</p></blockquote><p>\u65B0\u589E SPU \u548C SKU old \u8001\u6570\u636E\u5E93\u8BB0\u5F55\u5728\u6848</p><h2 id="\u9632\u6B62-xss-\u653B\u51FB" tabindex="-1"><a class="header-anchor" href="#\u9632\u6B62-xss-\u653B\u51FB" aria-hidden="true">#</a> \u9632\u6B62 XSS \u653B\u51FB</h2><p>XSS(\u8DE8\u7AD9\u811A\u672C)\u653B\u51FB\uFF0C\u662F\u8BA9\u6D4F\u89C8\u5668\u6E32\u67D3 DOM \u7684\u65F6\u5019\u610F\u5916\u7684\u6267\u884C\u4E86\u6076\u610F JS \u4EE3\u7801 XSS \u653B\u51FB\u7684\u539F\u7406\u662F\u5728\u7F51\u9875\u4E2D\u5D4C\u5165\u4E00\u4E2A\u6076\u610F\u811A\u672C</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>null<span class="token punctuation">&quot;</span></span> <span class="token special-attr"><span class="token attr-name">onerror</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value javascript language-javascript"><span class="token function">alert</span><span class="token punctuation">(</span> document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span></span><span class="token punctuation">&quot;</span></span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="antisamy" tabindex="-1"><a class="header-anchor" href="#antisamy" aria-hidden="true">#</a> AntiSamy</h3><p>AntiSamy \u662F\u5F00\u6E90\u7684 Java \u7C7B\u5E93\uFF0C\u53EF\u4EE5\u7528\u6765\u8FC7\u6EE4 XSS \u6076\u610F\u4EE3\u7801</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.owasp.antisamy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>antisamy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.5.5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token class-name">String</span> temp<span class="token operator">=</span><span class="token string">&quot;Helloworld &lt;img src=&#39;nuil&#39; onerror=&#39;alert(1234)&#39;&gt;&quot;</span><span class="token punctuation">;</span>
       <span class="token class-name">String</span> path<span class="token operator">=</span><span class="token class-name">Demo1</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span> <span class="token string">&quot;antisamy.xml&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	   <span class="token keyword">try</span><span class="token punctuation">{</span>
          <span class="token class-name">Policy</span> policy<span class="token operator">=</span><span class="token class-name">Policy</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token class-name">Antisamy</span> samy<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">AntiSamy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		  <span class="token class-name">String</span> result<span class="token operator">=</span>samy<span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span>temp<span class="token punctuation">,</span> policy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getcleanHTML</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jsoup-\u63A8\u8350\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#jsoup-\u63A8\u8350\u4F7F\u7528" aria-hidden="true">#</a> Jsoup\uFF08\u63A8\u8350\u4F7F\u7528\uFF09</h3><p>\u4F7F\u7528 Jsoup \u9632\u6B62\u5BCC\u6587\u672C XSS \u653B\u51FB</p><h2 id="\u8BA2\u5355\u53F7\u548C\u6D41\u6C34\u53F7" tabindex="-1"><a class="header-anchor" href="#\u8BA2\u5355\u53F7\u548C\u6D41\u6C34\u53F7" aria-hidden="true">#</a> \u8BA2\u5355\u53F7\u548C\u6D41\u6C34\u53F7</h2><p>\u8BA2\u5355\u53F7\u548C\u6D41\u6C34\u53F7\u7684\u533A\u522B</p><ul><li>\u8BA2\u5355\u53F7\u65E2\u662F\u8BA2\u5355\u7684\u552F\u4E00\u7F16\u53F7\uFF0C \u800C\u4E14\u7ECF\u5E38\u88AB\u7528\u6765\u68C0\u7D22\uFF0C\u6240\u4EE5\u5E94\u5F53\u662F\u6570\u5B57\u7C7B\u578B\u7684\u4E3B\u952E</li><li>\u6D41\u6C34\u53F7\u662F\u6253\u5370\u5728\u8D2D\u7269\u5355\u636E\u4E0A\u7684\u5B57\u7B26\u4E32\uFF0C\u4FBF\u4E8E\u9605\u8BFB\uFF0C\u4F46\u662F\u4E0D\u7528\u505A\u67E5\u8BE2</li></ul><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913175450421.png" alt="image-20210913175450421"></p><p>\u6570\u636E\u5E93\u7F13\u5B58\u548C\u7A0B\u5E8F\u7F13\u5B58</p><p><img src="https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210915104205886.png" alt="image-20210915104205886"></p><p>\u4E2D\u6587\u5206\u8BCD</p><p>Lucene Apache \u5206\u8BCD\u6280\u672F</p>`,55),u={href:"https://www.hanlp.com/index.html",target:"_blank",rel:"noopener noreferrer"},r=c("HanLP \u5B98\u7F51");function v(m,b){const s=e("ExternalLinkIcon");return i(),t("div",null,[o,n("p",null,[n("a",u,[r,l(s)])])])}var g=a(p,[["render",v],["__file","Mysql\u9879\u76EE-\u65B0\u96F6\u552E\u6570\u636E\u5E93\u8BBE\u8BA1.html.vue"]]);export{g as default};
