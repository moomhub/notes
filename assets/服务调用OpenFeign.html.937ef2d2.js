import{_ as n,o as a,c as s,a as e}from"./app.4a9c1875.js";const t={},p=e(`<h1 id="openfeign\u8D1F\u8F7D\u5747\u8861\u670D\u52A1\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#openfeign\u8D1F\u8F7D\u5747\u8861\u670D\u52A1\u8C03\u7528" aria-hidden="true">#</a> OpenFeign\u8D1F\u8F7D\u5747\u8861\u670D\u52A1\u8C03\u7528</h1><h2 id="openfeign\u7684\u524D\u4E16\u4ECA\u751F" tabindex="-1"><a class="header-anchor" href="#openfeign\u7684\u524D\u4E16\u4ECA\u751F" aria-hidden="true">#</a> OpenFeign\u7684\u524D\u4E16\u4ECA\u751F</h2><h3 id="feign" tabindex="-1"><a class="header-anchor" href="#feign" aria-hidden="true">#</a> Feign</h3><p>Feign\u662F\u4E00\u4E2A\u58F0\u660E\u5F0FWebService\u5BA2\u6237\u7AEF\u3002\u4F7F\u7528Feign\u80FD\u8BA9\u7F16\u5199Web Service\u5BA2\u6237\u7AEF\u66F4\u52A0\u7B80\u5355\u3002 \u5B83\u7684\u4F7F\u7528\u65B9\u6CD5\u662F\u5B9A\u4E49\u4E00\u4E2A\u670D\u52A1\u63A5\u53E3\u7136\u540E\u5728\u4E0A\u9762\u6DFB\u52A0\u6CE8\u89E3\u3002Feign\u4E5F\u652F\u6301\u53EF\u62D4\u63D2\u5F0F\u7684\u7F16\u7801\u5668\u548C\u89E3\u7801\u5668\u3002Spring Cloud\u5BF9Feign\u8FDB\u884C\u4E86\u5C01\u88C5\uFF0C\u4F7F\u5176\u652F\u6301\u4E86Spring MVC\u6807\u51C6\u6CE8\u89E3\u548CHttpMessageConverters\u3002Feign\u53EF\u4EE5\u4E0EEureka\u548CRibbon\u7EC4\u5408\u4F7F\u7528\u4EE5\u652F\u6301\u8D1F\u8F7D\u5747\u8861</p><p>\u662F\u4E00\u4E2A\u58F0\u660E\u5F0F\u7684web\u5BA2\u6237\u7AEF,\u53EA\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u63A5\u53E3,\u6DFB\u52A0\u6CE8\u89E3\u5373\u53EF\u5B8C\u6210\u5FAE\u670D\u52A1\u4E4B\u95F4\u7684\u8C03\u7528</p><h3 id="feign\u80FD\u5E72\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#feign\u80FD\u5E72\u4EC0\u4E48" aria-hidden="true">#</a> Feign\u80FD\u5E72\u4EC0\u4E48</h3><p>Feign\u65E8\u5728\u4F7F\u7F16\u5199Java Http\u5BA2\u6237\u7AEF\u53D8\u5F97\u66F4\u5BB9\u6613\u3002\u5C31\u662F\u8FDC\u7A0B\u8C03\u7528\u5176\u4ED6\u670D\u52A1 \u524D\u9762\u5728\u4F7F\u7528Ribbon+RestTemplate\u65F6\uFF0C\u5229\u7528RestTemplate\u5BF9http\u8BF7\u6C42\u7684\u5C01\u88C5\u5904\u7406\uFF0C\u5F62\u6210\u4E86\u4E00\u5957\u6A21\u7248\u5316\u7684\u8C03\u7528\u65B9\u6CD5\u3002\u4F46\u662F\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\uFF0C\u7531\u4E8E\u5BF9\u670D\u52A1\u4F9D\u8D56\u7684\u8C03\u7528\u53EF\u80FD\u4E0D\u6B62\u4E00\u5904\uFF0C\u5F80\u5F80\u4E00\u4E2A\u63A5\u53E3\u4F1A\u88AB\u591A\u5904\u8C03\u7528\uFF0C\u6240\u4EE5\u901A\u5E38\u90FD\u4F1A\u9488\u5BF9\u6BCF\u4E2A\u5FAE\u670D\u52A1\u81EA\u884C\u5C01\u88C5\u4E00\u4E9B\u5BA2\u6237\u7AEF\u7C7B\u6765\u5305\u88C5\u8FD9\u4E9B\u4F9D\u8D56\u670D\u52A1\u7684\u8C03\u7528\u3002\u6240\u4EE5\uFF0CFeign\u5728\u6B64\u57FA\u7840\u4E0A\u505A\u4E86\u8FDB\u4E00\u6B65\u5C01\u88C5\uFF0C\u7531\u4ED6\u6765\u5E2E\u52A9\u6211\u4EEC\u5B9A\u4E49\u548C\u5B9E\u73B0\u4F9D\u8D56\u670D\u52A1\u63A5\u53E3\u7684\u5B9A\u4E49\u3002\u5728Feign\u7684\u5B9E\u73B0\u4E0B\uFF0C\u6211\u4EEC\u53EA\u9700\u521B\u5EFA\u4E00\u4E2A\u63A5\u53E3\u5E76\u4F7F\u7528\u6CE8\u89E3\u7684\u65B9\u5F0F\u6765\u914D\u7F6E\u5B83(\u4EE5\u524D\u662FDao\u63A5\u53E3\u4E0A\u9762\u6807\u6CE8Mapper\u6CE8\u89E3,\u73B0\u5728\u662F\u4E00\u4E2A\u5FAE\u670D\u52A1\u63A5\u53E3\u4E0A\u9762\u6807\u6CE8\u4E00\u4E2AFeign\u6CE8\u89E3\u5373\u53EF)\uFF0C\u5373\u53EF\u5B8C\u6210\u5BF9\u670D\u52A1\u63D0\u4F9B\u65B9\u7684\u63A5\u53E3\u7ED1\u5B9A\uFF0C\u7B80\u5316\u4E86\u4F7F\u7528Spring cloud Ribbon\u65F6\uFF0C\u81EA\u52A8\u5C01\u88C5\u670D\u52A1\u8C03\u7528\u5BA2\u6237\u7AEF\u7684\u5F00\u53D1\u91CF\u3002</p><h3 id="feign\u96C6\u6210\u4E86ribbon" tabindex="-1"><a class="header-anchor" href="#feign\u96C6\u6210\u4E86ribbon" aria-hidden="true">#</a> Feign\u96C6\u6210\u4E86Ribbon</h3><p>\u6211\u4EEC\u53EF\u4EE5\u5229\u7528Ribbon+ResttTemplate\u7EF4\u62A4\u4E86Payment\u7684\u670D\u52A1\u5217\u8868\u4FE1\u606F\uFF0C\u5E76\u4E14\u901A\u8FC7\u8F6E\u8BE2\u5B9E\u73B0\u4E86\u5BA2\u6237\u7AEF\u7684\u8D1F\u8F7D\u5747\u8861\u3002\u800C\u4E0ERibbon\u4E0D\u540C\u7684\u662F\uFF0C\u901A\u8FC7feign\u53EA\u9700\u8981\u5B9A\u4E49\u670D\u52A1\u7ED1\u5B9A\u63A5\u53E3\u4E14\u4EE5\u58F0\u660E\u5F0F\u7684\u65B9\u6CD5\uFF0C\u4F18\u96C5\u800C\u7B80\u5355\u7684\u5B9E\u73B0\u4E86\u670D\u52A1\u8C03\u7528</p><h2 id="feign\u4E0Eopenfeign\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#feign\u4E0Eopenfeign\u533A\u522B" aria-hidden="true">#</a> Feign\u4E0EOpenFeign\u533A\u522B</h2><table><thead><tr><th>Feign</th><th>OpenFeign</th></tr></thead><tbody><tr><td>Feign\u662FSpring Cloud\u7EC4\u4EF6\u4E2D\u7684\u4E00\u4E2A\u8F7B\u91CF\u7EA7RESTful\u7684HTTP\u670D\u52A1\u5BA2\u6237\u7AEFFeign\u5185\u7F6E\u4E86Ribbon\uFF0C\u7528\u6765\u505A\u5BA2\u6237\u7AEF\u8D1F\u8F7D\u5747\u8861\uFF0C\u53BB\u8C03\u7528\u670D\u52A1\u6CE8\u518C\u4E2D\u5FC3\u7684\u670D\u52A1\u3002Feign\u7684\u4F7F\u7528\u65B9\u5F0F\u662F:\u4F7F\u7528Feign\u7684\u6CE8\u89E3\u5B9A\u4E49\u63A5\u53E3\uFF0C\u8C03\u7528\u8FD9\u4E2A\u63A5\u53E3\uFF0C\u5C31\u53EF\u4EE5\u8C03\u7528\u670D\u52A1\u6CE8\u518C\u4E2D\u5FC3\u7684\u670D\u52A1</td><td>OpenFeign\u662FSpring Cloud\u5728Feign\u7684\u57FA\u7840\u4E0A\u652F\u6301\u4E86SpringMVC\u7684\u6CE8\u89E3\uFF0C\u5982@RequesMapping\u7B49\u7B49\u3002OpenFeign\u7684@FeignClient\u53EF\u4EE5\u89E3\u6790SpringMVC\u7684@RequestMapping\u6CE8\u89E3\u4E0B\u7684\u63A5\u53E3\uFF0C\u5E76\u901A\u8FC7\u52A8\u6001\u4EE3\u7406\u7684\u65B9\u5F0F\u4EA7\u751F\u5B9E\u73B0\u7C7B\uFF0C\u5B9E\u73B0\u7C7B\u4E2D\u505A\u8D1F\u8F7D\u5747\u8861\u5E76\u8C03\u7528\u5176\u4ED6\u670D\u52A1\u3002</td></tr></tbody></table><p>Feign</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-feign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OpenFeign</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4F7F\u7528openfeign" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528openfeign" aria-hidden="true">#</a> \u4F7F\u7528OpenFeign</h2><blockquote><p>\u4F7F\u7528\u670D\u52A1\u6CE8\u518C\u4E2D\u5FC3\u8FDB\u884C\u76F8\u5173\u7684\u64CD\u4F5C Feign\u9ED8\u8BA4\u4F7F\u7528ribbon\u5B9E\u73B0\u8D1F\u8F7D\u5747\u8861</p></blockquote><h3 id="\u6DFB\u52A0\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#\u6DFB\u52A0\u6CE8\u89E3" aria-hidden="true">#</a> \u6DFB\u52A0\u6CE8\u89E3</h3><p><a href="/EnableFeignClients">@EnableFeignClients </a></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderFeignMain80</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">OrderFeignMain80</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5B9A\u4E49\u8FDC\u7A0B\u8C03\u7528\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u4E49\u8FDC\u7A0B\u8C03\u7528\u670D\u52A1" aria-hidden="true">#</a> \u5B9A\u4E49\u8FDC\u7A0B\u8C03\u7528\u670D\u52A1</h3><p>@FeignClient\u8BBE\u7F6E\u8FDC\u7A0B\u670D\u52A1\u540D\u79F0</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;CLOUD-PAYMENT-SERVICE&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PaymentFeignService</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/payment/get/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span> <span class="token function">getPaymentById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/payment/feign/timeout&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">paymentFeignTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="openfeign\u5E38\u7528\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#openfeign\u5E38\u7528\u8BBE\u7F6E" aria-hidden="true">#</a> OpenFeign\u5E38\u7528\u8BBE\u7F6E</h2><h3 id="openfeign\u8D85\u65F6\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#openfeign\u8D85\u65F6\u673A\u5236" aria-hidden="true">#</a> OpenFeign\u8D85\u65F6\u673A\u5236</h3><p>OpenFeign\u9ED8\u8BA4\u7B49\u5F85\u65F6\u95F4\u662F1\u79D2,\u8D85\u8FC71\u79D2,\u76F4\u63A5\u62A5\u9519,\u8BBE\u7F6E\u8D85\u65F6\u65F6\u95F4,\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6: \u56E0\u4E3AopenFeign\u7684\u5E95\u5C42\u662Fribbon\u8FDB\u884C\u8D1F\u8F7D\u5747\u8861,\u6240\u4EE5\u5B83\u7684\u8D85\u65F6\u65F6\u95F4\u662F\u7531ribbon\u63A7\u5236</p><p>#\u8BBE\u7F6Efeign\u5BA2\u6237\u7AEF\u8D85\u65F6\u65F6\u95F4( openFeign\u9ED8\u8BA4\u652F\u6301ribbon)</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">ribbon</span><span class="token punctuation">:</span>
  <span class="token comment">#\u6307\u7684\u662F\u5EFA\u7ACB\u8FDE\u63A5\u6240\u7528\u7684\u65F6\u95F4\uFF0C\u9002\u7528\u4E8E\u7F51\u7EDC\u72B6\u51B5\u6B63\u5E38\u7684\u60C5\u51B5\u4E0B,\u4E24\u7AEF\u8FDE\u63A5\u6240\u7528\u7684\u65F6\u95F4</span>
  <span class="token key atrule">ReadTimeout</span><span class="token punctuation">:</span> <span class="token number">5000</span>
  <span class="token comment">#\u6307\u7684\u662F\u5EFA\u7ACB\u8FDE\u63A5\u540E\u4ECE\u670D\u52A1\u5668\u8BFB\u53D6\u5230\u53EF\u7528\u8D44\u6E90\u6240\u7528\u7684\u65F6\u95F4</span>
  <span class="token key atrule">connectTimeout</span><span class="token punctuation">:</span> 5ood
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="openfeign\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#openfeign\u65E5\u5FD7" aria-hidden="true">#</a> OpenFeign\u65E5\u5FD7</h3><p>Feign\u63D0\u4F9B\u4E86\u65E5\u5FD7\u6253\u5370\u529F\u80FD\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6E\u6765\u8C03\u6574\u65E5\u5FD7\u7EA7\u522B\uFF0C\u4ECE\u800C\u4E86\u89E3Feign\u4E2D Http\u8BF7\u6C42\u7684\u7EC6\u8282\u3002\u8BF4\u767D\u4E86\u5C31\u662F\u5BF9Feign\u63A5\u53E3\u7684\u8C03\u7528\u60C5\u51B5\u8FDB\u884C\u76D1\u63A7\u548C\u8F93\u51FA\u3002 openFeign\u7684\u65E5\u5FD7\u7EA7\u522B\u6709:</p><ul><li><p>NONE:\u9ED8\u8BA4\u7684\uFF0C\u4E0D\u663E\u793A\u4EFB\u4F55\u65E5\u5FD7;</p></li><li><p>BASIC:\u4EC5\u8BB0\u5F55\u8BF7\u6C42\u65B9\u6CD5\u3001URL\u3001\u54CD\u5E94\u72B6\u6001\u7801\u53CA\u6267\u884C\u65F6\u95F4;</p></li><li><p>HEADERS:\u9664\u4E86BASIC\u4E2D\u5B9A\u4E49\u7684\u4FE1\u606F\u4E4B\u5916\uFF0C\u8FD8\u6709\u8BF7\u6C42\u548C\u54CD\u5E94\u7684\u5934\u4FE1\u606F;</p></li><li><p>FULL:\u9664\u4E86HEADERS\u4E2D\u5B9A\u4E49\u7684\u4FE1\u606F\u4E4B\u5916\uFF0C\u8FD8\u6709\u8BF7\u6C42\u548C\u54CD\u5E94\u7684\u6B63\u6587\u53CA\u5143\u6570\u636E\u3002</p></li></ul><h4 id="\u5B9E\u73B0\u5728\u914D\u7F6E\u7C7B\u4E2D\u6DFB\u52A0openfeign\u7684\u65E5\u5FD7\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u5728\u914D\u7F6E\u7C7B\u4E2D\u6DFB\u52A0openfeign\u7684\u65E5\u5FD7\u7C7B" aria-hidden="true">#</a> \u5B9E\u73B0\u5728\u914D\u7F6E\u7C7B\u4E2D\u6DFB\u52A0OpenFeign\u7684\u65E5\u5FD7\u7C7B</h4><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignConfig</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span> <span class="token function">feignLoggerLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span><span class="token punctuation">.</span>FULL<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u4E3A\u6307\u5B9A\u7C7B\u8BBE\u7F6E\u65E5\u5FD7\u7EA7\u522B" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u6307\u5B9A\u7C7B\u8BBE\u7F6E\u65E5\u5FD7\u7EA7\u522B" aria-hidden="true">#</a> \u4E3A\u6307\u5B9A\u7C7B\u8BBE\u7F6E\u65E5\u5FD7\u7EA7\u522B</h4><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token comment"># feign\u65E5\u5FD7\u4EE5\u4EC0\u4E48\u7EA7\u522B\u76D1\u63A7\u54EA\u4E2A\u63A5\u53E3</span>
    <span class="token key atrule">com.xxx.xx.xx.PaymentFeignService</span><span class="token punctuation">:</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),i=[p];function o(c,l){return a(),s("div",null,i)}var d=n(t,[["render",o],["__file","\u670D\u52A1\u8C03\u7528OpenFeign.html.vue"]]);export{d as default};
