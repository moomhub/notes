import{_ as e,r as p,o,c as i,b as n,d as l,a as s,e as a}from"./app.4a9c1875.js";const c={},u=s(`<h1 id="ribbon\u8D1F\u8F7D\u5747\u8861\u670D\u52A1\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#ribbon\u8D1F\u8F7D\u5747\u8861\u670D\u52A1\u8C03\u7528" aria-hidden="true">#</a> Ribbon\u8D1F\u8F7D\u5747\u8861\u670D\u52A1\u8C03\u7528</h1><h2 id="ribbon\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#ribbon\u7B80\u4ECB" aria-hidden="true">#</a> Ribbon\u7B80\u4ECB</h2><p>Spring Cloud Ribbon \u662F\u57FA\u4E8ENetflix Ribbon \u5B9E\u73B0\u7684\u4E00\u5957\u5BA2\u6237\u7AEF\u8D1F\u8F7D\u5747\u8861\u7684\u5DE5\u5177\u3002<br>Spring-Cloud-Ribbon \u4F5C\u4E3A\u5FAE\u670D\u52A1\u6846\u67B6\u7684\u8D1F\u8F7D\u5747\u8861\u7EC4\u4EF6\uFF0C\u9ED8\u8BA4\u4F7F\u7528RestTemplate\u63A5\u53E3\u8C03\u7528\u5916\u90E8\u670D\u52A1\u63A5\u53E3\u3002<br>\u7B80\u5355\u7684\u8BF4\uFF0CRibbon \u662F Netflix \u53D1\u5E03\u7684\u5F00\u6E90\u9879\u76EE\uFF0C\u4E3B\u8981\u529F\u80FD\u662F\u63D0\u4F9B\u5BA2\u6237\u7AEF\u7684\u8F6F\u4EF6\u8D1F\u8F7D\u5747\u8861\u7B97\u6CD5\uFF0C\u5C06 Netflix \u7684\u4E2D\u95F4\u5C42\u670D\u52A1\u8FDE\u63A5\u5728\u4E00\u8D77\u3002Ribbon \u7684\u5BA2\u6237\u7AEF\u7EC4\u4EF6\u63D0\u4F9B\u4E00\u7CFB\u5217\u5B8C\u6574\u7684\u914D\u7F6E\u9879\uFF0C\u5982\uFF1A\u8FDE\u63A5\u8D85\u65F6\u3001\u91CD\u8BD5\u7B49\u3002\u7B80\u5355\u7684\u8BF4\uFF0C\u5C31\u662F\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u5217\u51FA LoadBalancer (\u7B80\u79F0LB\uFF1A\u8D1F\u8F7D\u5747\u8861) \u540E\u9762\u6240\u6709\u7684\u53CA\u5176\uFF0CRibbon \u4F1A\u81EA\u52A8\u7684\u5E2E\u52A9\u4F60\u57FA\u4E8E\u67D0\u79CD\u89C4\u5219 (\u5982\u7B80\u5355\u8F6E\u8BE2\uFF0C\u968F\u673A\u8FDE\u63A5\u7B49\u7B49) \u53BB\u8FDE\u63A5\u8FD9\u4E9B\u673A\u5668\u3002\u6211\u4EEC\u4E5F\u5BB9\u6613\u4F7F\u7528 Ribbon \u5B9E\u73B0\u81EA\u5B9A\u4E49\u7684\u8D1F\u8F7D\u5747\u8861\u7B97\u6CD5</p><h2 id="\u8D1F\u8F7D\u5747\u8861" tabindex="-1"><a class="header-anchor" href="#\u8D1F\u8F7D\u5747\u8861" aria-hidden="true">#</a> \u8D1F\u8F7D\u5747\u8861</h2><p>LB\uFF0C\u5373\u8D1F\u8F7D\u5747\u8861 (LoadBalancer) \uFF0C\u5728\u5FAE\u670D\u52A1\u6216\u5206\u5E03\u5F0F\u96C6\u7FA4\u4E2D\u7ECF\u5E38\u7528\u7684\u4E00\u79CD\u5E94\u7528\u3002</p><p>\u8D1F\u8F7D\u5747\u8861\u7B80\u5355\u7684\u8BF4\u5C31\u662F\u5C06\u7528\u6237\u7684\u8BF7\u6C42\u5E73\u644A\u7684\u5206\u914D\u5230\u591A\u4E2A\u670D\u52A1\u4E0A\uFF0C\u4ECE\u800C\u8FBE\u5230\u7CFB\u7EDF\u7684HA (\u9AD8\u7528)\u3002</p><p>\u5E38\u89C1\u7684\u8D1F\u8F7D\u5747\u8861\u8F6F\u4EF6\u6709 Nginx\u3001Lvs \u7B49\u7B49\u3002</p><p>Dubbo\u3001SpringCloud \u4E2D\u5747\u7ED9\u6211\u4EEC\u63D0\u4F9B\u4E86\u8D1F\u8F7D\u5747\u8861\uFF0CSpringCloud \u7684\u8D1F\u8F7D\u5747\u8861\u7B97\u6CD5\u53EF\u4EE5\u81EA\u5B9A\u4E49\u3002</p><h3 id="\u8D1F\u8F7D\u5747\u8861\u7B80\u5355\u5206\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u8D1F\u8F7D\u5747\u8861\u7B80\u5355\u5206\u7C7B" aria-hidden="true">#</a> \u8D1F\u8F7D\u5747\u8861\u7B80\u5355\u5206\u7C7B\uFF1A</h3><ul><li>\u96C6\u4E2D\u5F0FLB</li></ul><p>\u2002\u2002\u2002\u2002- \u5373\u5728\u670D\u52A1\u7684\u63D0\u4F9B\u65B9\u548C\u6D88\u8D39\u65B9\u4E4B\u95F4\u4F7F\u7528\u72EC\u7ACB\u7684LB\u8BBE\u65BD\uFF0C\u5982Nginx(\u53CD\u5411\u4EE3\u7406\u670D\u52A1\u5668)**\uFF0C\u5BA2\u6237\u7AEF\u6240\u6709\u7684\u8BF7\u6C42\u90FD\u4F1A\u4EA4\u7ED9 **Nginx,\u7136\u540E\u7531 Nginx\u5B9E\u73B0\u8BF7\u6C42\u7684\u8F6C\u53D1\uFF0C\u5373\u8D1F\u8F7D\u5747\u8861\u662F\u7531\u670D\u52A1\u5668\u5B9E\u73B0\u7684(Nginx)</p><ul><li>\u8FDB\u7A0B\u5F0F LB</li></ul><p>\u2002\u2002\u2002\u2002- \u5C06LB\u903B\u8F91\u96C6\u6210\u5230\u670D\u52A1\u6D88\u8D39\u8005\uFF0C\u670D\u52A1\u6D88\u8D39\u8005\u4ECE\u670D\u52A1\u6CE8\u518C\u4E2D\u5FC3\u83B7\u77E5\u6709\u54EA\u4E9B\u5730\u5740\u53EF\u7528\uFF0C\u7136\u540E\u81EA\u5DF1\u518D\u4ECE\u8FD9\u4E9B\u5730\u5740\u4E2D\u9009\u51FA\u4E00\u4E2A\u5408\u9002\u7684\u670D\u52A1\u5668\u8FDB\u884C\u8C03\u7528\u3002</p><p>\u2002\u2002\u2002\u2002- Ribbon \u5C31\u5C5E\u4E8E\u8FDB\u7A0B\u5185LB\uFF0C\u5B83\u53EA\u662F\u4E00\u4E2A\u7C7B\u5E93\uFF0C\u96C6\u6210\u4E8E\u670D\u52A1\u6D88\u8D39\u8005\u8FDB\u7A0B\uFF0C\u670D\u52A1\u6D88\u8D39\u8005\u901A\u8FC7\u5B83\u6765\u83B7\u53D6\u5230\u670D\u52A1\u63D0\u4F9B\u8005\u7684\u5730\u5740\uFF01</p><p>\u5728\u8C03\u7528\u670D\u52A1\u63D0\u4F9B\u8005\u66B4\u9732\u7684\u63A5\u53E3\u7684\u65F6\u5019\uFF0CRibbon\u4F1A\u5728\u6CE8\u518C\u4E2D\u5FC3\u4E0A\u83B7\u53D6\u5230\u670D\u52A1\u63D0\u4F9B\u8005\u7684\u4FE1\u606F\u5217\u8868(\u6BD4\u5982\uFF1AIP\u5730\u5740\u548C\u7AEF\u53E3\u53F7\u7B49\u7B49)\uFF0C\u4E4B\u540E\u518D\u7F13\u5B58\u5230JVM\u672C\u5730\u3002\u7136\u540E\u518D\u4ECE\u8FD9\u4E9B\u5730\u5740\u4E2D\u9009\u51FA\u4E00\u4E2A\u5408\u9002\u7684\u670D\u52A1\u5668\u8FDB\u884C\u8C03\u7528\u3002\u4ECE\u800C\u5728\u672C\u5730\u5B9E\u73B0HTTP\u8FDC\u7A0B\u8C03\u7528\uFF0C\u9ED8\u8BA4\u662F30\u79D2\u5237\u65B0\u4E00\u6B21\u3002</p><h2 id="\u4F7F\u7528ribbon" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528ribbon" aria-hidden="true">#</a> \u4F7F\u7528Ribbon</h2><p>Ribbon\u5176\u5B9E\u5C31\u662F\u4E00\u4E2A\u8F6F\u8D1F\u8F7D\u5747\u8861\u7684\u5BA2\u6237\u7AEF\u7EC4\u4EF6\u3002\u5B83\u53EF\u4EE5\u548C\u5176\u4ED6\u53D1\u8D77\u8BF7\u6C42\u7684\u5BA2\u6237\u7AEF\u7ED3\u5408\u4F7F\u7528\uFF0C\u548CEureka\u7ED3\u5408\u53EA\u662F\u5176\u4E2D\u7684\u4E00\u4E2A\u5B9E\u4F8B\u3002</p><h3 id="ribbon\u539F\u7406\u56FE" tabindex="-1"><a class="header-anchor" href="#ribbon\u539F\u7406\u56FE" aria-hidden="true">#</a> Ribbon\u539F\u7406\u56FE</h3><h3 id="ribbon\u5728\u5DE5\u4F5C\u7684\u65F6\u5019\u5206\u6210\u4E24\u6B65" tabindex="-1"><a class="header-anchor" href="#ribbon\u5728\u5DE5\u4F5C\u7684\u65F6\u5019\u5206\u6210\u4E24\u6B65" aria-hidden="true">#</a> Ribbon\u5728\u5DE5\u4F5C\u7684\u65F6\u5019\u5206\u6210\u4E24\u6B65</h3><ol><li><p>\u7B2C\u4E00\u6B65\u5148\u9009\u62E9Eureka Server(\u6CE8\u518C\u4E2D\u5FC3\u96C6\u7FA4)\uFF0C\u5B83\u4F18\u5148\u9009\u62E9\u5728\u540C\u4E00\u4E2A\u533A\u57DF\u5185\u8D1F\u8F7D\u8F83\u5C11\u7684Server\uFF08\u6CE8\u518C\u4E2D\u5FC3\uFF09</p></li><li><p>\u7B2C\u4E8C\u6B65\u518D\u6839\u636E\u6307\u5B9A\u7684\u8D1F\u8F7D\u5747\u8861\u7B56\u7565\uFF0C\u5728\u4ECE\u6CE8\u518C\u4E2D\u5FC3\u53D6\u5230\u7684\u670D\u52A1\u63D0\u4F9B\u8005\u5217\u8868\u4E2D\u9009\u62E9\u4E00\u4E2A\u5730\u5740\u8FDB\u884C\u8C03\u7528\u3002</p></li></ol><p>\u5176\u4E2DRibbon\u63D0\u4F9B\u4E86\u591A\u79CD\u8D1F\u8F7D\u5747\u8861\u7B56\u7565\uFF1A\u6BD4\u5982\u8F6E\u8BE2\u3001\u968F\u673A\u548C\u6839\u636E\u54CD\u5E94\u65F6\u95F4\u52A0\u6743</p><h3 id="\u5F15\u5165\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165\u4F9D\u8D56" aria-hidden="true">#</a> \u5F15\u5165\u4F9D\u8D56</h3><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token comment">&lt;!--Ribbon\u7684\u4F9D\u8D56--&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-ribbon<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6CE8\u5165resttemplate" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u5165resttemplate" aria-hidden="true">#</a> \u6CE8\u5165RestTemplate</h3>`,24),r=a("\u5B98\u65B9\u6587\u6863\uFF1A"),d={href:"https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html",target:"_blank",rel:"noopener noreferrer"},k=a("https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html"),b=n("br",null,null,-1),m=a("@LoadBalanced\u6CE8\u89E3\u7ED9RestTemplate\u5F00\u542F\u8D1F\u8F7D\u5747\u8861\u7684\u80FD\u529B\u3002"),v=s(`<div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ApplicationContextConfig</span><span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@LoadBalanced</span>
    <span class="token keyword">public</span> <span class="token class-name">RestTemplate</span> <span class="token function">getRestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RestTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u63A7\u5236\u5C42\u7F16\u5199" tabindex="-1"><a class="header-anchor" href="#\u63A7\u5236\u5C42\u7F16\u5199" aria-hidden="true">#</a> \u63A7\u5236\u5C42\u7F16\u5199</h3><p>\u4F7F\u7528RestTemplate\u8FDB\u884C\u8FDC\u7A0B\u8C03\u7528</p><p><strong>getForObject: \u76F4\u63A5\u8FDB\u884C\u8FDC\u7A0B\u8C03\u7528</strong></p><p><strong>getForEntity\uFF1A\u8FDC\u7A0B\u8C03\u7528\u540E\u8FD4\u56DE\u7684\u76F8\u5173\u7684\u53C2\u6570</strong></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> PAYMENT_URL <span class="token operator">=</span> <span class="token string">&quot;http://consul-provider-payment&quot;</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">RestTemplate</span> restTemplate<span class="token punctuation">;</span>
  
  <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/consumer/payment/get/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span> <span class="token function">getPayment</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span>PAYMENT_URL<span class="token operator">+</span><span class="token string">&quot;/payment/get/&quot;</span><span class="token operator">+</span>id<span class="token punctuation">,</span><span class="token class-name">CommonResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/consumer/payment/getForEntity/{id}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Payment</span><span class="token punctuation">&gt;</span></span> <span class="token function">getPayment2</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CommonResult</span><span class="token punctuation">&gt;</span></span> entity <span class="token operator">=</span> restTemplate<span class="token punctuation">.</span><span class="token function">getForEntity</span><span class="token punctuation">(</span>PAYMENT_URL<span class="token operator">+</span><span class="token string">&quot;/payment/get/&quot;</span><span class="token operator">+</span>id<span class="token punctuation">,</span><span class="token class-name">CommonResult</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>entity<span class="token punctuation">.</span><span class="token function">getStatusCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is2xxSuccessful</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> entity<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CommonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">444</span><span class="token punctuation">,</span><span class="token string">&quot;\u64CD\u4F5C\u5931\u8D25&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ribbon\u5E38\u7528\u8D1F\u8F7D\u5747\u8861\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#ribbon\u5E38\u7528\u8D1F\u8F7D\u5747\u8861\u7B97\u6CD5" aria-hidden="true">#</a> Ribbon\u5E38\u7528\u8D1F\u8F7D\u5747\u8861\u7B97\u6CD5:</h2><p><strong>IRule\u63A5\u53E3,Riboon\u4F7F\u7528\u8BE5\u63A5\u53E3,\u6839\u636E\u7279\u5B9A\u7B97\u6CD5\u4ECE\u6240\u6709\u670D\u52A1\u4E2D,\u9009\u62E9\u4E00\u4E2A\u670D\u52A1,</strong></p><p><strong>Rule\u63A5\u53E3\u67097\u4E2A\u5B9E\u73B0\u7C7B,\u6BCF\u4E2A\u5B9E\u73B0\u7C7B\u4EE3\u8868\u4E00\u4E2A\u8D1F\u8F7D\u5747\u8861\u7B97\u6CD5</strong></p><table><thead><tr><th>\u7C7B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>com.netflix.loadbalancer.RoundRobinRule</td><td>\u8F6E\u8BE2</td></tr><tr><td>com.netflix.loadbalancer.RandomRule</td><td>\u968F\u673A</td></tr><tr><td>com.netflix.loadbalancer.RetryRule</td><td>\u5148\u6309\u7167RoundRobinRule\u7684\u7B56\u7565\u83B7\u53D6\u670D\u52A1\uFF0C\u5982\u679C\u83B7\u53D6\u670D\u52A1\u5931\u8D25\u5219\u5728\u6307\u5B9A\u65F6\u95F4\u5185\u4F1A\u8FDB\u884C\u91CD\u8BD5\uFF0C\u83B7\u53D6\u53EF\u7528\u7684\u670D\u52A1</td></tr><tr><td>WeightedResponseTimeRule</td><td>\u5BF9RoundRobinRule\u7684\u6269\u5C55\uFF0C\u54CD\u5E94\u901F\u5EA6\u8D8A\u5FEB\u7684\u5B9E\u4F8B\u9009\u62E9\u6743\u91CD\u8D8A\u5927\uFF0C\u8D8A\u5BB9\u6613\u88AB\u9009\u62E9</td></tr><tr><td>BestAvailableRule</td><td>\u4F1A\u5148\u8FC7\u6EE4\u6389\u7531\u4E8E\u591A\u6B21\u8BBF\u95EE\u6545\u969C\u800C\u5904\u4E8E\u65AD\u8DEF\u5668\u8DF3\u95F8\u72B6\u6001\u7684\u670D\u52A1\uFF0C\u7136\u540E\u9009\u62E9\u4E00\u4E2A\u5E76\u53D1\u91CF\u6700\u5C0F\u7684\u670D\u52A1</td></tr><tr><td>AvailabilityFilteringRule</td><td>\u5148\u8FC7\u6EE4\u6389\u6545\u969C\u5B9E\u4F8B\uFF0C\u518D\u9009\u62E9\u5E76\u53D1\u8F83\u5C0F\u7684\u5B9E\u4F8B</td></tr><tr><td>ZoneAvoidanceRule</td><td>\u9ED8\u8BA4\u89C4\u5219,\u590D\u5408\u5224\u65ADserver\u6240\u5728\u533A\u57DF\u7684\u6027\u80FD\u548Cserver\u7684\u53EF\u7528\u6027\u9009\u62E9\u670D\u52A1\u5668</td></tr></tbody></table><h2 id="\u66FF\u6362\u8C03\u9ED8\u8BA4\u7684\u8F6E\u8BE2\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u66FF\u6362\u8C03\u9ED8\u8BA4\u7684\u8F6E\u8BE2\u7B97\u6CD5" aria-hidden="true">#</a> \u66FF\u6362\u8C03\u9ED8\u8BA4\u7684\u8F6E\u8BE2\u7B97\u6CD5</h2><blockquote><p>\u5B98\u65B9\u6587\u6863\u660E\u786E\u7ED9\u51FA\u4E86\u8B66\u544A:<br>\u8FD9\u4E2A\u81EA\u5B9A\u4E49\u914D\u7F6E\u7C7B\u4E0D\u80FD\u653E\u5728@ComponentScan\u6240\u626B\u63CF\u7684\u5F53\u524D\u5305\u4E0B\u4EE5\u53CA\u5B50\u5305\u4E0B\uFF0C<br>\u5426\u5219\u6211\u4EEC\u81EA\u5B9A\u4E49\u7684\u8FD9\u4E2A\u914D\u7F6E\u7C7B\u5C31\u4F1A\u88AB\u6240\u6709\u7684Ribbon\u5BA2\u6237\u7AEF\u6240\u5171\u4EAB\uFF0C\u8FBE\u4E0D\u5230\u7279\u6B8A\u5316\u5B9A\u5236\u7684\u76EE\u7684\u4E86\u3002</p></blockquote><p>Ribbon\u7684\u81EA\u5B9A\u4E49\u914D\u7F6E\u7C7B\u4E0D\u80FD\u653E\u5728 \xA0\u4E3B\u7684\u5305springcloud\u5305\u4E0B\uFF0C\u8981\u5728\u5176\u4ED6\u5305\u5305\u4E0B\u518D\u65B0\u5EFA\u4E00\u4E2Amyrule\u5305\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>\u4E3B\u5305\u4E3A com.springcould.xxx.Application00
\u66FF\u6362\u5305\u4E3A xx  \u533A\u522B\u4E0E\u5176\u4ED6\u5305
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4FEE\u6539\u9ED8\u8BA4\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u9ED8\u8BA4\u7B97\u6CD5" aria-hidden="true">#</a> \u4FEE\u6539\u9ED8\u8BA4\u7B97\u6CD5</h3><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>@Configuration
public class MyselfRule {
  @Bean
  public IRule myRule(){
      return new RandomRule();
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u4E3B\u542F\u52A8\u7C7B\u4E0A\u6DFB\u52A0</p><blockquote><p>name\u4E3A\u6307\u5B9A\u7684\u670D\u52A1\u540D\uFF08\u670D\u52A1\u540D\u5FC5\u987B\u4E0E\u6CE8\u518C\u4E2D\u5FC3\u663E\u793A\u7684\u670D\u52A1\u540D\u5927\u5C0F\u5199\u4E00\u81F4\uFF09<br>configuration\u4E3A\u6307\u5B9A\u670D\u52A1\u4F7F\u7528\u81EA\u5B9A\u4E49\u914D\u7F6E\uFF08\u81EA\u5B9A\u4E49\u8D1F\u8F7D\u5747\u8861\u673A\u5236\uFF09</p></blockquote><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token annotation punctuation">@RibbonClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;CLOUD-PAYMENT-SERVICE&quot;</span><span class="token punctuation">,</span> configuration <span class="token operator">=</span> <span class="token class-name">MySelfRule</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,20);function g(h,R){const t=p("ExternalLinkIcon");return o(),i("div",null,[u,n("blockquote",null,[n("p",null,[r,n("a",d,[k,l(t)]),b,m])]),v])}var x=e(c,[["render",g],["__file","Ribbon\u8D1F\u8F7D\u5747\u8861\u670D\u52A1.html.vue"]]);export{x as default};
