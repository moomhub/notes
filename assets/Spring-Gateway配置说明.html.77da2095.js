import{_ as l,r,o as d,c as t,b as n,d as i,a as s,e}from"./app.4a9c1875.js";const c={},u=s(`<h1 id="spring-gateway-\u914D\u7F6E\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#spring-gateway-\u914D\u7F6E\u8BF4\u660E" aria-hidden="true">#</a> Spring Gateway \u914D\u7F6E\u8BF4\u660E</h1><h2 id="gateway\u5E38\u7528\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#gateway\u5E38\u7528\u914D\u7F6E" aria-hidden="true">#</a> Gateway\u5E38\u7528\u914D\u7F6E</h2><h3 id="_1\u3001after" tabindex="-1"><a class="header-anchor" href="#_1\u3001after" aria-hidden="true">#</a> 1\u3001After</h3><p>\u53EA\u8981\u5F53\u524D\u65F6\u95F4\u5927\u4E8E\u8BBE\u5B9A\u65F6\u95F4\uFF0C\u8DEF\u7531\u624D\u4F1A\u5339\u914D\u8BF7\u6C42 - \u65F6\u95F4\u5339\u914D</p><p>\u8FD9\u4E2A\u8DEF\u7531\u89C4\u5219\u4F1A\u5728\u4E1C8\u533A\u76842018-12-25 14:33:47<strong>\u540E</strong> \uFF0C\u5C06\u8BF7\u6C42\u90FD\u8F6C\u8DF3\u5230<code>baidu</code>\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>  
    <span class="token key atrule">cloud</span><span class="token punctuation">:</span>    
        <span class="token key atrule">gateway</span><span class="token punctuation">:</span>      
            <span class="token key atrule">routes</span><span class="token punctuation">:</span>      
            <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> after_route        
              <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//www.baidu.com        
              <span class="token key atrule">predicates</span><span class="token punctuation">:</span>        
              <span class="token punctuation">-</span> After=2018<span class="token punctuation">-</span>12<span class="token punctuation">-</span>25T14<span class="token punctuation">:</span>33<span class="token punctuation">:</span>47.789+08<span class="token punctuation">:</span><span class="token number">00</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2\u3001before" tabindex="-1"><a class="header-anchor" href="#_2\u3001before" aria-hidden="true">#</a> 2\u3001Before</h3><p>\u53EA\u8981\u5F53\u524D\u65F6\u95F4\u5C0F\u4E8E\u8BBE\u5B9A\u65F6\u95F4\uFF0C\u8DEF\u7531\u624D\u4F1A\u5339\u914D\u8BF7\u6C42 - \u65F6\u95F4\u5339\u914D</p><p>\u8FD9\u4E2A\u8DEF\u7531\u89C4\u5219\u4F1A\u5728\u4E1C8\u533A\u76842018-12-25 14:33:47<strong>\u524D</strong> \uFF0C\u5C06\u8BF7\u6C42\u90FD\u8F6C\u8DF3\u5230google\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>  
    <span class="token key atrule">cloud</span><span class="token punctuation">:</span>    
        <span class="token key atrule">gateway</span><span class="token punctuation">:</span>      
            <span class="token key atrule">routes</span><span class="token punctuation">:</span>      
            <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> before_route        
              <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//www.google.com        
              <span class="token key atrule">predicates</span><span class="token punctuation">:</span>        
              <span class="token punctuation">-</span> Before=2018<span class="token punctuation">-</span>12<span class="token punctuation">-</span>25T14<span class="token punctuation">:</span>33<span class="token punctuation">:</span>47.789+08<span class="token punctuation">:</span><span class="token number">00</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3\u3001between" tabindex="-1"><a class="header-anchor" href="#_3\u3001between" aria-hidden="true">#</a> 3\u3001Between</h3><p>\u53EA\u8981\u5F53\u524D\u65F6\u95F4\u5927\u4E8E\u7B2C\u4E00\u4E2A\u8BBE\u5B9A\u65F6\u95F4\uFF0C\u5E76\u5C0F\u4E8E\u7B2C\u4E8C\u4E2A\u8BBE\u5B9A\u65F6\u95F4\uFF0C\u8DEF\u7531\u624D\u4F1A\u5339\u914D\u8BF7\u6C42 - \u65F6\u95F4\u5339\u914D</p><p>\u8FD9\u4E2A\u8DEF\u7531\u89C4\u5219\u4F1A\u5728\u4E1C8\u533A\u76842018-12-25 14:33:47\u52302018-12-26 14:33:47\u4E4B\u95F4\uFF0C\u5C06\u8BF7\u6C42\u90FD\u8F6C\u8DF3\u5230google\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>  
    <span class="token key atrule">cloud</span><span class="token punctuation">:</span>   
        <span class="token key atrule">gateway</span><span class="token punctuation">:</span>      
            <span class="token key atrule">routes</span><span class="token punctuation">:</span>      
            <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> between_route        
              <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//www.google.com        
              <span class="token key atrule">predicates</span><span class="token punctuation">:</span>        
              <span class="token punctuation">-</span> Between=2018<span class="token punctuation">-</span>12<span class="token punctuation">-</span>25T14<span class="token punctuation">:</span>33<span class="token punctuation">:</span>47.789+08<span class="token punctuation">:</span><span class="token number">00</span><span class="token punctuation">,</span> <span class="token datetime number">2018-12-26T14:33:47.789+08:00</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4\u3001cookie" tabindex="-1"><a class="header-anchor" href="#_4\u3001cookie" aria-hidden="true">#</a> 4\u3001Cookie</h3><p>\u4F7F\u7528\u7684\u662Fcookie\u540D\u5B57\u548C\u6B63\u5219\u8868\u8FBE\u5F0F\u7684value\u4F5C\u4E3A\u4E24\u4E2A\u8F93\u5165\u53C2\u6570\uFF0C\u8BF7\u6C42\u7684cookie\u9700\u8981\u5339\u914Dcookie\u540D\u548C\u7B26\u5408\u5176\u4E2Dvalue\u7684\u6B63\u5219</p><p>\u8DEF\u7531\u5339\u914D\u8BF7\u6C42\u5B58\u5728cookie\u540D\u4E3Acookiename\uFF0Ccookie\u5185\u5BB9\u5339\u914Dcookievalue\u7684\uFF0C\u5C06\u8BF7\u6C42\u8F6C\u53D1\u5230google\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span> 
    <span class="token key atrule">cloud</span><span class="token punctuation">:</span>    
        <span class="token key atrule">gateway</span><span class="token punctuation">:</span>  
            <span class="token key atrule">routes</span><span class="token punctuation">:</span>      
            <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> cookie_route       
              <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//www.google.com        
              <span class="token key atrule">predicates</span><span class="token punctuation">:</span>        
              <span class="token punctuation">-</span> Cookie=cookiename<span class="token punctuation">,</span> cookievalue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5\u3001header" tabindex="-1"><a class="header-anchor" href="#_5\u3001header" aria-hidden="true">#</a> 5\u3001Header</h3><p>\u8DEF\u7531\u5339\u914D\u5B58\u5728\u540D\u4E3AX-Request-Id\uFF0C\u5185\u5BB9\u4E3A\u6570\u5B57\u7684header\u7684\u8BF7\u6C42\uFF0C\u5C06\u8BF7\u6C42\u8F6C\u53D1\u5230google\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:  
    cloud:    
        gateway:     
            routes:      
            - id: header_route        
              uri: http://www.google.com        
              predicates:        
              - Header=X-Request-Id, \\d+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6\u3001host" tabindex="-1"><a class="header-anchor" href="#_6\u3001host" aria-hidden="true">#</a> 6\u3001Host</h3><p>\u4F7F\u7528\u7684\u662Fhost\u7684\u5217\u8868\u4F5C\u4E3A\u53C2\u6570\uFF0Chost\u4F7F\u7528Ant style\u5339\u914D</p>`,23),o=e("\u8DEF\u7531\u4F1A\u5339\u914DHost\u8BF8\u5982\uFF1A"),p={href:"http://www.somehost.org",target:"_blank",rel:"noopener noreferrer"},v=e("www.somehost.org"),m=e(" \u6216 beta.somehost.org\u6216www.anotherhost.org\u7B49\u8BF7\u6C42\u3002"),b=s(`<div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:  
    cloud:    
        gateway:      
            routes:      
            - id: host_route        
              uri: http://www.google.com        
              predicates:        
              - Host=**.somehost.org,**.anotherhost.org
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7\u3001method" tabindex="-1"><a class="header-anchor" href="#_7\u3001method" aria-hidden="true">#</a> 7\u3001Method</h3><p>Method Route Predicate Factory\u662F\u901A\u8FC7HTTP\u7684method\u6765\u5339\u914D\u8DEF\u7531\u3002</p><p>\u8DEF\u7531\u4F1A\u5339\u914D\u5230\u6240\u6709GET\u65B9\u6CD5\u7684\u8BF7\u6C42\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:  
    cloud:    
        gateway:      
            routes:      
            - id: method_route        
              uri: http://www.google.com        
              predicates:        
              - Method=GET
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8\u3001path" tabindex="-1"><a class="header-anchor" href="#_8\u3001path" aria-hidden="true">#</a> 8\u3001Path</h3><p>Path Route Predicate Factory\u4F7F\u7528\u7684\u662Fpath\u5217\u8868\u4F5C\u4E3A\u53C2\u6570\uFF0C\u4F7F\u7528Spring\u7684PathMatcher\u5339\u914Dpath\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u53EF\u9009\u53D8\u91CF\u3002</p><p>\u4E0A\u9762\u8DEF\u7531\u53EF\u4EE5\u5339\u914D\u8BF8\u5982\uFF1A/foo/1 \u6216 /foo/bar \u6216 /bar/baz\u7B49 \u5176\u4E2D\u7684segment\u53D8\u91CF\u53EF\u4EE5\u901A\u8FC7\u4E0B\u9762\u65B9\u5F0F\u83B7\u53D6\uFF1A</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:  
    cloud:    
        gateway:      
            routes:      
            - id: host_route        
              uri: http://www.google.com       
              predicates:        
              - Path=/foo/{segment},/bar/{segment}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9\u3001query" tabindex="-1"><a class="header-anchor" href="#_9\u3001query" aria-hidden="true">#</a> 9\u3001Query</h3><p>Query Route Predicate Factory\u53EF\u4EE5\u901A\u8FC7\u4E00\u4E2A\u6216\u4E24\u4E2A\u53C2\u6570\u6765\u5339\u914D\u8DEF\u7531\uFF0C\u4E00\u4E2A\u662F\u67E5\u8BE2\u7684name\uFF0C\u4E00\u4E2A\u662F\u67E5\u8BE2\u7684\u6B63\u5219value\u3002</p><p>\u8DEF\u7531\u4F1A\u5339\u914D\u6240\u6709\u5305\u542Bbaz\u67E5\u8BE2\u53C2\u6570\u7684\u8BF7\u6C42</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>  
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>    
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>      
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>      
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> query_route        
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//www.google.com        
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>        
        <span class="token punctuation">-</span> Query=baz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>10\u3001RemoteAddr</p><p>RemoteAddr Route Predicate Factory\u901A\u8FC7\u65E0\u7C7B\u522B\u57DF\u95F4\u8DEF\u7531(IPv4 or IPv6)\u5217\u8868\u5339\u914D\u8DEF\u7531\u3002</p><p>\u8DEF\u7531\u5C31\u4F1A\u5339\u914DRemoteAddr\u8BF8\u5982192.168.1.10\u7B49\u8BF7\u6C42\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>  
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>    
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>    
          <span class="token key atrule">routes</span><span class="token punctuation">:</span>      
          <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> remoteaddr_route        
            <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//www.google.com        
            <span class="token key atrule">predicates</span><span class="token punctuation">:</span>        
            <span class="token punctuation">-</span> RemoteAddr=192.168.1.1/24
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E8C\u3001gatewayfilter-\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001gatewayfilter-\u4F7F\u7528" aria-hidden="true">#</a> \u4E8C\u3001GatewayFilter \u4F7F\u7528</h2><p>Route filters\u53EF\u4EE5\u901A\u8FC7\u4E00\u4E9B\u65B9\u5F0F\u4FEE\u6539HTTP\u8BF7\u6C42\u7684\u8F93\u5165\u548C\u8F93\u51FA\uFF0C\u9488\u5BF9\u67D0\u4E9B\u7279\u6B8A\u7684\u573A\u666F\uFF0CSpring Cloud Gateway\u5DF2\u7ECF\u5185\u7F6E\u4E86\u5F88\u591A\u4E0D\u540C\u529F\u80FD\u7684GatewayFilter Factories\u3002</p><h3 id="_1\u3001addrequestheader" tabindex="-1"><a class="header-anchor" href="#_1\u3001addrequestheader" aria-hidden="true">#</a> 1\u3001AddRequestHeader</h3><p>AddRequestHeader GatewayFilter Factory\u901A\u8FC7\u914D\u7F6Ename\u548Cvalue\u53EF\u4EE5\u589E\u52A0\u8BF7\u6C42\u7684header\u3002</p><p>\u5BF9\u5339\u914D\u7684\u8BF7\u6C42\uFF0C\u4F1A\u989D\u5916\u6DFB\u52A0X-Request-Foo:Bar\u7684header\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:  
  cloud:    
    gateway:   
          routes: 
            - id: add_request_header_route  
              uri: http://www.google.com  
              filters:
              - AddRequestHeader=X-Request-Foo, Bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2\u3001addrequestparameter" tabindex="-1"><a class="header-anchor" href="#_2\u3001addrequestparameter" aria-hidden="true">#</a> 2\u3001AddRequestParameter</h3><p>AddRequestParameter GatewayFilter Factory\u901A\u8FC7\u914D\u7F6Ename\u548Cvalue\u53EF\u4EE5\u589E\u52A0\u8BF7\u6C42\u7684\u53C2\u6570</p><p>\u5BF9\u5339\u914D\u7684\u8BF7\u6C42\uFF0C\u4F1A\u989D\u5916\u6DFB\u52A0foo=bar\u7684\u8BF7\u6C42\u53C2\u6570\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:  
  cloud:  
      gateway:   
          routes:      
          - id: add_request_parameter_route     
              uri: http://www.google.com     
              filters:       
              - AddRequestParameter=foo, bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3\u3001addresponseheader" tabindex="-1"><a class="header-anchor" href="#_3\u3001addresponseheader" aria-hidden="true">#</a> 3\u3001AddResponseHeader</h3><p>AddResponseHeader GatewayFilter Factory\u901A\u8FC7\u914D\u7F6Ename\u548Cvalue\u53EF\u4EE5\u589E\u52A0\u54CD\u5E94\u7684header\u3002</p><p>\u5BF9\u5339\u914D\u7684\u8BF7\u6C42\uFF0C\u54CD\u5E94\u8FD4\u56DE\u65F6\u4F1A\u989D\u5916\u6DFB\u52A0X-Response-Foo:Bar\u7684header\u8FD4\u56DE\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:  
  cloud:   
      gateway:  
          routes:      
          - id: add_request_header_route    
              uri: http://www.google.com     
              filters:        
              - AddResponseHeader=X-Response-Foo, Bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4\u3001hystrix" tabindex="-1"><a class="header-anchor" href="#_4\u3001hystrix" aria-hidden="true">#</a> 4\u3001Hystrix</h3><p>Hystrix\u662FNetflix\u5B9E\u73B0\u7684\u65AD\u8DEF\u5668\u6A21\u5F0F\u5DE5\u5177\u5305\uFF0CThe Hystrix GatewayFilter\u5C31\u662F\u5C06\u65AD\u8DEF\u5668\u4F7F\u7528\u5728gateway\u7684\u8DEF\u7531\u4E0A\uFF0C\u76EE\u7684\u662F\u4FDD\u62A4\u4F60\u7684\u670D\u52A1\u907F\u514D\u7EA7\u8054\u6545\u969C\uFF0C\u4EE5\u53CA\u5728\u4E0B\u6E38\u5931\u8D25\u65F6\u53EF\u4EE5\u964D\u7EA7\u8FD4\u56DE\u3002</p><p>\u9879\u76EE\u91CC\u9762\u5F15\u5165spring-cloud-starter-netflix-hystrix\u4F9D\u8D56\uFF0C\u5E76\u63D0\u4F9BHystrixCommand\u7684\u540D\u5B57\uFF0C\u5373\u53EF\u751F\u6548Hystrix GatewayFilter</p><p>Hystrix\u8FC7\u6EE4\u5668\u4E5F\u662F\u901A\u8FC7\u914D\u7F6E\u53EF\u4EE5\u53C2\u6570fallbackUri\uFF0C\u6765\u652F\u6301\u8DEF\u7531\u7194\u65AD\u540E\u7684\u964D\u7EA7\u5904\u7406\uFF0C\u964D\u7EA7\u540E\uFF0C\u8BF7\u6C42\u4F1A\u8DF3\u8FC7fallbackUri\u914D\u7F6E\u7684\u8DEF\u5F84\uFF0C\u76EE\u524D\u53EA\u652F\u6301forward:\u7684URI\u534F\u8BAE</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>  cloud:
    gateway:
      routes:
      - id: hystrix_route
        uri: lb://backing-service:8088
        predicates:
        - Path=/consumingserviceendpoint
        filters:
        - name: Hystrix
          args:
            name: fallbackcmd
            fallbackUri: forward:/incaseoffailureusethis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u751F\u6210\u4E00\u4E2A\u540D\u4E3A<code>**fallbackcmd**</code>\u7684HystrixGatewayFilter \u62E6\u622A\u5668\u3002 Hystrix\u964D\u7EA7\u540E\u5C31\u4F1A\u5C06\u8BF7\u6C42\u8F6C\u53D1\u5230/incaseoffailureusethis\u3002</p>`,37),g=e("\u6574\u4E2A\u6D41\u7A0B\u5176\u5B9E\u662F\u7528fallbackUri\u5C06\u8BF7\u6C42\u8DF3\u8F6C\u5230gateway\u5185\u90E8\u7684controller\u6216\u8005handler\uFF0C\u7136\u800C\u4E5F\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u7684\u65B9\u5F0F\u5C06\u8BF7\u6C42\u8F6C\u53D1\u5230\u5916\u90E8\u7684\u670D\u52A1\uFF1A gateway\u964D\u7EA7\u540E\u5C31\u4F1A\u5C06\u8BF7\u6C42\u8F6C\u53D1\u5230"),h={href:"http://localhost:9994%E3%80%82",target:"_blank",rel:"noopener noreferrer"},k=e("http://localhost:9994\u3002"),y=s(`<div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: ingredients
        uri: lb://ingredients
        predicates:
        - Path=//ingredients/**
        filters:
        - name: Hystrix
          args:
            name: fetchIngredients
            fallbackUri: forward:/fallback
      - id: ingredients-fallback
        uri: http://localhost:9994
        predicates:
        - Path=/fallback
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBE\u7F6E hystrix \u7194\u65AD\u5668\u7684\u8D85\u65F6\u4FE1\u606F</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">hystrix</span><span class="token punctuation">:</span>
  <span class="token key atrule">command</span><span class="token punctuation">:</span>
  <span class="token comment"># \u5168\u5C40\u7684\u8D85\u65F6\u4FE1\u606F</span>
    <span class="token key atrule">default</span><span class="token punctuation">:</span>
      <span class="token key atrule">execution</span><span class="token punctuation">:</span>
        <span class="token key atrule">isolation</span><span class="token punctuation">:</span>
          <span class="token key atrule">thread</span><span class="token punctuation">:</span>
            <span class="token key atrule">timeoutInMilliseconds</span><span class="token punctuation">:</span> <span class="token number">10000</span>
    <span class="token comment"># \u5177\u4F53\u5230\u67D0\u4E00\u4E2A Hystrix filters name\u7684\u8D85\u65F6\u4FE1\u606F</span>
    <span class="token key atrule">socialfallback</span><span class="token punctuation">:</span>
      <span class="token key atrule">execution</span><span class="token punctuation">:</span>
        <span class="token key atrule">isolation</span><span class="token punctuation">:</span>
          <span class="token key atrule">thread</span><span class="token punctuation">:</span>
            <span class="token key atrule">timeoutInMilliseconds</span><span class="token punctuation">:</span> <span class="token number">60000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5\u3001fallbackheaders" tabindex="-1"><a class="header-anchor" href="#_5\u3001fallbackheaders" aria-hidden="true">#</a> 5\u3001FallbackHeaders</h3><p>FallbackHeaders GatewayFilter Factory\u53EF\u4EE5\u5C06Hystrix\u6267\u884C\u7684\u5F02\u5E38\u4FE1\u606F\u6DFB\u52A0\u5230\u5916\u90E8\u8BF7\u6C42\u7684fallbackUriheader\u4E0A\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> ingredients
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//ingredients
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Path=//ingredients/<span class="token important">**</span>
        <span class="token key atrule">filters</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Hystrix
          <span class="token key atrule">args</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> fetchIngredients
            <span class="token key atrule">fallbackUri</span><span class="token punctuation">:</span> forward<span class="token punctuation">:</span>/fallback
      <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> ingredients<span class="token punctuation">-</span>fallback
        <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">9994</span>
        <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> Path=/fallback
        <span class="token key atrule">filters</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> FallbackHeaders
          <span class="token key atrule">args</span><span class="token punctuation">:</span>
            <span class="token key atrule">executionExceptionTypeHeaderName</span><span class="token punctuation">:</span> Test<span class="token punctuation">-</span>Header
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),w=e("\u5728\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\uFF0C\u5F53\u8BF7\u6C42lb://ingredients\u964D\u7EA7\u540E\uFF0CFallbackHeadersfilter\u4F1A\u5C06HystrixCommand\u7684\u5F02\u5E38\u4FE1\u606F\uFF0C\u901A\u8FC7Test-Header\u5E26\u7ED9"),f={href:"http://localhost:9994%E6%9C%8D%E5%8A%A1%E3%80%82",target:"_blank",rel:"noopener noreferrer"},x=e("http://localhost:9994\u670D\u52A1\u3002"),_=s(`<p>\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u9ED8\u8BA4\u7684header\uFF0C\u4E5F\u53EF\u4EE5\u50CF\u4E0A\u9762\u4E00\u4E0B\u914D\u7F6E\u4FEE\u6539header\u7684\u540D\u5B57\uFF1A</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>executionExceptionTypeHeaderName (&quot;Execution-Exception-Type&quot;)

executionExceptionMessageHeaderName (&quot;Execution-Exception-Message&quot;)

rootCauseExceptionTypeHeaderName (&quot;Root-Cause-Exception-Type&quot;)

rootCauseExceptionMessageHeaderName (&quot;Root-Cause-Exception-Message&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6\u3001prefixpath" tabindex="-1"><a class="header-anchor" href="#_6\u3001prefixpath" aria-hidden="true">#</a> 6\u3001PrefixPath</h3><p>PrefixPath GatewayFilter Factor\u901A\u8FC7\u8BBE\u7F6Eprefix\u53C2\u6570\u6765\u8DEF\u5F84\u524D\u7F00\u3002</p><p>\u5982\u679C\u4E00\u4E2A\u8BF7\u6C42\u662F/hello\uFF0C\u901A\u8FC7\u4E0A\u9762\u8DEF\u7531\uFF0C\u5C31\u4F1A\u5C06\u8BF7\u6C42\u4FEE\u6539\u4E3A/mypath/hello\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: prefixpath_route
        uri: http://www.google.com
        filters:
        - PrefixPath=/mypath
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7\u3001preservehostheader" tabindex="-1"><a class="header-anchor" href="#_7\u3001preservehostheader" aria-hidden="true">#</a> 7\u3001PreserveHostHeader</h3><p>PreserveHostHeader GatewayFilter Factory\u4F1A\u4FDD\u7559\u539F\u59CB\u8BF7\u6C42\u7684host\u5934\u4FE1\u606F\uFF0C\u5E76\u539F\u5C01\u4E0D\u52A8\u7684\u8F6C\u53D1\u51FA\u53BB\uFF0C\u800C\u4E0D\u662F\u88ABgateway\u7684http\u5BA2\u6237\u7AEF\u91CD\u7F6E\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: preserve_host_route
        uri: http://www.google.com
        filters:
        - PreserveHostHeader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>8\u3001RequestRateLimiter</p><p>RequestRateLimiter GatewayFilter Factory\u4F7F\u7528RateLimiter\u6765\u51B3\u5B9A\u5F53\u524D\u8BF7\u6C42\u662F\u5426\u5141\u8BB8\u901A\u8FC7\uFF0C\u5982\u679C\u4E0D\u5141\u8BB8\uFF0C\u5219\u9ED8\u8BA4\u8FD4\u56DE\u72B6\u6001\u7801HTTP 429 - Too Many Requests\u3002</p><p>RequestRateLimiter GatewayFilter\u53EF\u4EE5\u4F7F\u7528\u4E00\u4E2A\u53EF\u9009\u53C2\u6570keyResolver\u6765\u505A\u901F\u7387\u9650\u5236\u3002</p><p>keyResolver\u662FKeyResolver\u63A5\u53E3\u7684\u4E00\u4E2A\u5B9E\u73B0bean\uFF0C\u5728\u914D\u7F6E\u91CC\u9762\uFF0C\u901A\u8FC7SpEL\u8868\u8FBE\u5F0F#{@myKeyResolver}\u6765\u7BA1\u7406bean\u7684\u540D\u5B57myKeyResolver</p><h3 id="_9\u3001removenonproxyheaders" tabindex="-1"><a class="header-anchor" href="#_9\u3001removenonproxyheaders" aria-hidden="true">#</a> 9\u3001RemoveNonProxyHeaders</h3><p>RemoveNonProxyHeaders GatewayFilter Factory\u8F6C\u53D1\u8BF7\u6C42\u662F\u4F1A\u6839\u636EIETF\u7684\u5B9A\u4E49\uFF0C\u9ED8\u8BA4\u4F1A\u79FB\u9664\u4E0B\u5217\u7684http\u5934\u4FE1\u606F\uFF1A</p><ol><li><p>Connection</p></li><li><p>Keep-Alive</p></li><li><p>Proxy-Authenticate</p></li><li><p>Proxy-Authorization</p></li><li><p>TE</p></li><li><p>Trailer</p></li><li><p>Transfer-Encoding</p></li><li><p>Upgrade</p></li></ol><p>\u4F60\u4E5F\u53EF\u4EE5\u901A\u8FC7\u914D\u7F6Espring.cloud.gateway.filter.remove-non-proxy-headers.headers\u6765\u66F4\u6539\u9700\u8981\u79FB\u9664\u7684header\u5217\u8868\u3002</p><p>10\u3001RemoveRequestHeader</p><p>RemoveRequestHeader GatewayFilter Factory\u914D\u7F6Eheader\u7684name\uFF0C\u5373\u53EF\u4EE5\u79FB\u9664\u8BF7\u6C42\u7684header\u3002<br>\u8DEF\u7531\u5728\u53D1\u9001\u8BF7\u6C42\u7ED9\u4E0B\u6E38\u65F6\uFF0C\u4F1A\u5C06\u8BF7\u6C42\u4E2D\u7684X-Request-Foo\u5934\u4FE1\u606F\u53BB\u6389\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: removerequestheader_route
        uri: http://www.google.com
        filters:
        - RemoveRequestHeader=X-Request-Foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>11\u3001RemoveResponseHeader</p><p>RemoveResponseHeader GatewayFilter Factory\u901A\u8FC7\u914D\u7F6Eheader\u7684name\uFF0C\u4F1A\u5728\u54CD\u5E94\u8FD4\u56DE\u65F6\u79FB\u9664header\u3002</p><p>\u8DEF\u7531\u4F1A\u5728\u54CD\u5E94\u8FD4\u56DE\u7ED9gateway\u7684\u5BA2\u6237\u7AEF\u65F6\uFF0C\u5C06X-Response-Foo\u54CD\u5E94\u5934\u4FE1\u606F\u53BB\u6389\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: removeresponseheader_route
        uri: http://www.google.com
        filters:
        - RemoveResponseHeader=X-Response-Foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>12\u3001RewritePath</p><p>RewritePath GatewayFilter Factory\u4F7F\u7528\u8DEF\u5F84regexp\u548C\u66FF\u6362\u8DEF\u5F84replacement\u4E24\u4E2A\u53C2\u6570\u505A\u8DEF\u5F84\u91CD\u5199\uFF0C\u4E24\u4E2A\u90FD\u53EF\u4EE5\u7075\u6D3B\u5730\u4F7F\u7528java\u7684\u6B63\u5219\u8868\u8FBE\u5F0F\u3002</p><p>\u5982\u679C\u8BF7\u6C42\u7684\u8DEF\u5F84\u662F/foo/bar\uFF0C\u5219gateway\u4F1A\u5C06\u8BF7\u6C42\u8DEF\u5F84\u6539\u4E3A/bar\u53D1\u9001\u7ED9\u4E0B\u6E38\u3002</p><blockquote><p>\u5728YAML \u7684\u683C\u5F0F\u4E2D\u4F7F\u7528\u3002</p></blockquote><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>  cloud:
    gateway:
      routes:
      - id: rewritepath_route
        uri: http://www.google.com
        predicates:
        - Path=/foo/**
        filters:
        - RewritePath=/foo/(?&lt;segment&gt;.*), /$\\{segment}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>13\u3001RewriteResponseHeader \u3001</p><p>RewriteResponseHeader GatewayFilter Factory\u7684\u4F5C\u7528\u662F\u4FEE\u6539\u54CD\u5E94\u8FD4\u56DE\u7684header\u5185\u5BB9\uFF0C\u9700\u8981\u914D\u7F6E\u54CD\u5E94\u8FD4\u56DE\u7684header\u7684name\uFF0C\u5339\u914D\u89C4\u5219regexp\u548C\u66FF\u6362\u8BCDreplacement\uFF0C\u4E5F\u662F\u652F\u6301java\u7684\u6B63\u5219\u8868\u8FBE\u5F0F\u3002</p><p>\u4E3E\u4E2A\u4F8B\u5B50\uFF0C\u5BF9\u4E8E\u4E0A\u9762\u7684filter\uFF0C\u5982\u679C\u54CD\u5E94\u7684headerX-Response-Foo\u7684\u5185\u5BB9\u662F/42?user=ford&amp;password=omg!what&amp;flag=true\uFF0C\u8FD9\u4E2A\u5185\u5BB9\u4F1A\u4FEE\u6539\u4E3A/42?user=ford&amp;password=***&amp;flag=true\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: rewriteresponseheader_route
        uri: http://www.google.com
        filters:
        - RewriteResponseHeader=X-Response-Foo, , password=[^&amp;]+, password=***
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>14\u3001SaveSession</p><p>SaveSession GatewayFilter Factory\u4F1A\u5728\u8BF7\u6C42\u4E0B\u6E38\u65F6\u5F3A\u5236\u6267\u884CWebSession::save\u65B9\u6CD5\uFF0C\u7528\u5728\u90A3\u79CD\u50CFSpring Session\u5EF6\u8FDF\u6570\u636E\u5B58\u50A8\u7684\uFF0C\u5E76\u5728\u8BF7\u6C42\u8F6C\u53D1\u524D\u786E\u4FDDsession\u72B6\u6001\u4FDD\u5B58\u60C5\u51B5\u3002</p><p>\u5982\u679C\u4F60\u5C06Spring Secutiry\u4E8ESpring Session\u96C6\u6210\u4F7F\u7528\uFF0C\u5E76\u60F3\u786E\u4FDD\u5B89\u5168\u4FE1\u606F\u90FD\u4F20\u5230\u4E0B\u6E38\u673A\u5668\uFF0C\u4F60\u5C31\u9700\u8981\u914D\u7F6E\u8FD9\u4E2Afilter\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>  cloud:
    gateway:
      routes:
      - id: save_session
        uri: http://www.google.com
        predicates:
        - Path=/foo/**
        filters:
        - SaveSession
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>15\u3001SecureHeaders</p><p>SecureHeaders GatewayFilter Factory\u4F1A\u6DFB\u52A0\u5728\u8FD4\u56DE\u54CD\u5E94\u4E2D\u4E00\u7CFB\u5217\u5B89\u5168\u4F5C\u7528\u7684header\uFF0C\u81F3\u4E8E\u4E3A\u4EC0\u4E48\uFF0C\u82F1\u6587\u597D\u7684\u53EF\u4EE5\u770B\u4E00\u4E0B\u8FD9\u7BC7\u535A\u5BA2\u3002</p><p>\u9ED8\u8BA4\u4F1A\u6DFB\u52A0\u8FD9\u4E9B\u5934\u4FE1\u606F\u548C\u9ED8\u8BA4\u5185\u5BB9\uFF1A</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>X-Xss-Protection:1; mode=block

Strict-Transport-Security:max-age=631138519

X-Frame-Options:DENY

X-Content-Type-Options:nosniff

Referrer-Policy:no-referrer

Content-Security-Policy:default-src &#39;self&#39; https:; font-src &#39;self&#39; https: data:; img-src &#39;self&#39; https: data:; object-src &#39;none&#39;; script-src https:; style-src &#39;self&#39; https: &#39;unsafe-inline&#39;

X-Download-Options:noopen

X-Permitted-Cross-Domain-Policies:none
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u4F60\u60F3\u4FEE\u6539\u8FD9\u4E9B\u5934\u4FE1\u606F\u7684\u9ED8\u8BA4\u5185\u5BB9\uFF0C\u53EF\u4EE5\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u6DFB\u52A0\u4E0B\u9762\u7684\u914D\u7F6E\uFF1A</p><p>\u524D\u7F00\uFF1Aspring.cloud.gateway.filter.secure-headers</p><p>\u4E0A\u9762\u7684header\u5BF9\u5E94\u7684\u540E\u7F00\uFF1A</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>xss-protection-header

strict-transport-security

frame-options

content-type-options

referrer-policy

content-security-policy

download-options

permitted-cross-domain-policies
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u524D\u540E\u7F00\u63A5\u8D77\u6765\u5373\u53EF\uFF0C\u5982\uFF1Aspring.cloud.gateway.filter.secure-headers.xss-protection-header</p><p>16\u3001SetPath</p><p>SetPath GatewayFilter Factory\u91C7\u7528\u8DEF\u5F84template\u53C2\u6570\uFF0C\u901A\u8FC7\u8BF7\u6C42\u8DEF\u5F84\u7684\u7247\u6BB5\u7684\u6A21\u677F\u5316\uFF0C\u6765\u8FBE\u5230\u64CD\u4F5C\u4FEE\u6539\u8DEF\u5F84\u7684\u6BCD\u7684\uFF0C\u8FD0\u884C\u591A\u4E2A\u8DEF\u5F84\u7247\u6BB5\u6A21\u677F\u5316</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>  cloud:
    gateway:
      routes:
      - id: setpath_route
        uri: http://www.google.com
        predicates:
        - Path=/foo/{segment}
        filters:
        - SetPath=/{segment}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5BF9\u4E8E\u4E0A\u9762\u7684\u4F8B\u5B50\uFF0C\u5982\u679C\u8DEF\u5F84\u662F/foo/bar\uFF0C\u5219\u5BF9\u4E8E\u4E0B\u6E38\u7684\u8BF7\u6C42\u8DEF\u5F84\u4F1A\u4FEE\u6539\u4E3A/bar\u3002</p><p>17\u3001SetResponseHeader</p><p>SetResponseHeader GatewayFilter Factory\u901A\u8FC7\u8BBE\u7F6Ename\u548Cvalue\u6765\u66FF\u6362\u54CD\u5E94\u5BF9\u4E8E\u7684header</p><p>\u5BF9\u4E8E\u4E0A\u9762\u7684\u4F8B\u5B50\uFF0C\u5982\u679C\u4E0B\u6E38\u7684\u8FD4\u56DE\u5E26\u6709\u5934\u4FE1\u606F\u4E3AX-Response-Foo:1234\uFF0C\u5219\u4F1Agateway\u4F1A\u66FF\u6362\u4E3AX-Response-Foo:Bar\uFF0C\u5728\u8FD4\u56DE\u7ED9\u5BA2\u6237\u7AEF\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:  
   cloud:  
     gateway:        
       routes:      
       - id: setresponseheader_route      
          uri: http://www.google.com      
          filters:      
          - SetResponseHeader=X-Response-Foo, Bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>18\u3001SetStatus</p><p>SetStatus GatewayFilter Factory\u901A\u8FC7\u914D\u7F6E\u6709\u6548\u7684Spring HttpStatus\u679A\u4E3E\u53C2\u6570\uFF0C\u53EF\u4EE5\u662F\u7C7B\u4F3C\u4E8E404\u7684\u8FD9\u4E9B\u6570\u5B57\uFF0C\u4E5F\u53EF\u4EE5\u662F\u679A\u4E3E\u7684name\u5B57\u7B26\u4E32\uFF0C\u6765\u4FEE\u6539\u54CD\u5E94\u7684\u8FD4\u56DE\u7801\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: setresponseheader_route
        uri: http://www.google.com
        filters:
        - SetResponseHeader=X-Response-Foo, Bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>19\u3001StripPrefix</p><p>StripPrefix GatewayFilter Factory\u901A\u8FC7\u914D\u7F6Eparts\u6765\u8868\u793A\u622A\u65AD\u8DEF\u5F84\u524D\u7F00\u7684\u6570\u91CF\u3002</p><p>\u5982\u679C\u8BF7\u6C42\u7684\u8DEF\u5F84\u4E3A/name/bar/foo\uFF0C\u5219\u8DEF\u5F84\u4F1A\u4FEE\u6539\u4E3A/foo\uFF0C\u5373\u5C06\u8DEF\u5F84\u7684\u4E24\u4E2A\u524D\u7F00\u53BB\u6389\u4E86\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: nameRoot
        uri: http://nameservice
        predicates:
        - Path=/name/**
        filters:
        - StripPrefix=2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>20\u3001Retry</p><p>Retry GatewayFilter Factory\u53EF\u4EE5\u914D\u7F6E\u9488\u5BF9\u4E0D\u540C\u7684\u54CD\u5E94\u505A\u8BF7\u6C42\u91CD\u8BD5\uFF0C\u53EF\u4EE5\u914D\u7F6E\u5982\u4E0B\u53C2\u6570\uFF1A</p><ol><li><p>retries: \u91CD\u8BD5\u6B21\u6570</p></li><li><p>statuses: \u9700\u8981\u91CD\u8BD5\u7684\u72B6\u6001\u7801\uFF0C\u9700\u8981\u6839\u636E\u679A\u4E3E org.springframework.http.HttpStatus\u6765\u914D\u7F6E</p></li><li><p>methods: \u9700\u8981\u91CD\u8BD5\u7684\u8BF7\u6C42\u65B9\u6CD5\uFF0C\u9700\u8981\u6839\u636E\u679A\u4E3Eorg.springframework.http.HttpMethod\u6765\u914D\u7F6E</p></li><li><p>series: HTTP\u72B6\u6001\u7801\u7CFB\u5217\uFF0C\u8BE6\u60C5\u89C1\u679A\u4E3Eorg.springframework.http.HttpStatus.Series</p></li></ol><p>\u4E0B\u6E38\u670D\u52A1\u8FD4\u56DE502\u72B6\u6001\u7801\u65F6\uFF0Cgateway\u4F1A\u91CD\u8BD53\u6B21\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: retry_test
        uri: http://localhost:8080/flakey
        predicates:
        - Host=*.retry.com
        filters:
        - name: Retry
          args:
            retries: 3
            statuses: BAD_GATEWAY
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>21\u3001RequestSize</p><p>RequestSize GatewayFilter Factory\u4F1A\u9650\u5236\u5BA2\u6237\u7AEF\u8BF7\u6C42\u5305\u7684\u5927\u5C0F\uFF0C\u901A\u8FC7\u53C2\u6570RequestSize\u6765\u914D\u7F6E\u6700\u5927\u4E0A\u4F20\u5927\u5C0F\uFF0C\u5355\u4F4D\u5B57\u8282\u3002</p><p>\u5982\u679C\u8BF7\u6C42\u5927\u5C0F\u8D85\u8FC75000kb\u9650\u5236\uFF0C\u5219\u4F1A\u8FD4\u56DE\u72B6\u6001\u7801413 Payload Too Large\u3002</p><blockquote><p>\u5982\u679C\u4E0D\u8BBE\u7F6E\u8FD9\u4E2Afilter\uFF0C\u9ED8\u8BA4\u9650\u52365M\u7684\u8BF7\u6C42\u5927\u5C0F\u3002</p></blockquote><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>spring:
  cloud:
    gateway:
      routes:
      - id: request_size_route
      uri: http://localhost:8080/upload
      predicates:
      - Path=/upload
      filters:
      - name: RequestSize
        args:
          maxSize: 5000000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Modify Request Body GatewayFilter Factory</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>\u5B98\u65B9\u8BF4\u8FD9\u4E2Afilter\u76EE\u524D\u53EA\u662Fbeta\u7248\u672C\uFF0CAPI\u4EE5\u540E\u53EF\u80FD\u4F1A\u4FEE\u6539\u3002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Modify Request Body GatewayFilter Factory\u53EF\u4EE5\u4FEE\u6539\u8BF7\u6C42\u4F53\u5185\u5BB9\uFF0C\u8FD9\u4E2A\u53EA\u80FD\u901A\u8FC7java\u6765\u914D\u7F6E\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>@Bean
public RouteLocator routes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route(&quot;rewrite_request_obj&quot;, r -&gt; r.host(&quot;*.rewriterequestobj.org&quot;)
            .filters(f -&gt; f.prefixPath(&quot;/httpbin&quot;)
                .modifyRequestBody(String.class, Hello.class, MediaType.APPLICATION_JSON_VALUE,
                    (exchange, s) -&gt; return Mono.just(new Hello(s.toUpperCase())))).uri(uri))
        .build();
}
 
static class Hello {
    String message;
 
    public Hello() { }
 
    public Hello(String message) {
        this.message = message;
    }
 
    public String getMessage() {
        return message;
    }
 
    public void setMessage(String message) {
        this.message = message;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>Modify Response Body GatewayFilter Factory</li></ol><p>\u5B98\u65B9\u8BF4\u8FD9\u4E2Afilter\u76EE\u524D\u53EA\u662Fbeta\u7248\u672C\uFF0CAPI\u4EE5\u540E\u53EF\u80FD\u4F1A\u4FEE\u6539\u3002</p><p>Modify Response Body GatewayFilter Factory\u7528\u4E8E\u4FEE\u6539\u54CD\u5E94\u8FD4\u56DE\u7684\u5185\u5BB9\uFF0C\u540C\u6837\u53EA\u80FD\u901A\u8FC7java\u914D\u7F6E\u3002</p><div class="language-\u7EAF\u6587\u672C ext-\u7EAF\u6587\u672C line-numbers-mode"><pre class="language-\u7EAF\u6587\u672C"><code>@Bean
public RouteLocator routes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route(&quot;rewrite_response_upper&quot;, r -&gt; r.host(&quot;*.rewriteresponseupper.org&quot;)
            .filters(f -&gt; f.prefixPath(&quot;/httpbin&quot;)
            .modifyResponseBody(String.class, String.class,
                (exchange, s) -&gt; Mono.just(s.toUpperCase()))).uri(uri)
        .build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,79);function R(F,H){const a=r("ExternalLinkIcon");return d(),t("div",null,[u,n("p",null,[o,n("a",p,[v,i(a)]),m]),b,n("p",null,[g,n("a",h,[k,i(a)])]),y,n("p",null,[w,n("a",f,[x,i(a)])]),_])}var P=l(c,[["render",R],["__file","Spring-Gateway\u914D\u7F6E\u8BF4\u660E.html.vue"]]);export{P as default};
