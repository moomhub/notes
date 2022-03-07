<template><h1 id="spring-boot-拦截器" tabindex="-1"><a class="header-anchor" href="#spring-boot-拦截器" aria-hidden="true">#</a> Spring Boot 拦截器</h1>
<p>传统的Spring MVC 拦截器</p>
<p>实现 <code>HandlerInterceptor</code> 接口</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>logging<span class="token punctuation">.</span></span><span class="token class-name">Log</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>logging<span class="token punctuation">.</span></span><span class="token class-name">LogFactory</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">HandlerInterceptor</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ModelAndView</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletResponse</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LogHandlerInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">HandlerInterceptor</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">final</span> <span class="token class-name">Log</span> log <span class="token operator">=</span> <span class="token class-name">LogFactory</span><span class="token punctuation">.</span><span class="token function">getLog</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 请求方法执行之前
     * 返回true则通过
     *
     * <span class="token keyword">@param</span> <span class="token parameter">request</span> - 请求
     * <span class="token keyword">@param</span> <span class="token parameter">response</span> - 响应
     * <span class="token keyword">@param</span> <span class="token parameter">handler</span> - 处理
     * <span class="token keyword">@return</span> true 为放行 false 为拦截
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">StringBuffer</span> requestURL <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getRequestURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"preHandle请求URL："</span> <span class="token operator">+</span> requestURL<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回modelAndView之前执行
     * <span class="token keyword">@param</span> <span class="token parameter">request</span> - 请求
     * <span class="token keyword">@param</span> <span class="token parameter">response</span> - 响应
     * <span class="token keyword">@param</span> <span class="token parameter">handler</span> - 处理
     * <span class="token keyword">@param</span> <span class="token parameter">modelAndView</span>  - 请求的响应的视图
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span>
                           <span class="token class-name">ModelAndView</span> modelAndView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"postHandle返回modelAndView之前"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 执行Handler完成执行此方法
     * <span class="token keyword">@param</span> <span class="token parameter">request</span> - 请求
     * <span class="token keyword">@param</span> <span class="token parameter">response</span> - 响应
     * <span class="token keyword">@param</span> <span class="token parameter">handler</span> - 处理
     * <span class="token keyword">@param</span> <span class="token parameter">ex</span> 错误
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterCompletion</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span> <span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"afterCompletion执行完请求方法完全返回之后"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><p>注入SpringMvcConfig 中</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebMvcConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 自定义JSON转换器
     *
     * <span class="token keyword">@param</span> <span class="token parameter">converters</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configureMessageConverters</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HttpMessageConverter</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span><span class="token punctuation">></span></span> converters<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();</span>
<span class="token comment">////        FastJsonConfig fastJsonConfig = new FastJsonConfig();</span>
<span class="token comment">////        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);</span>
<span class="token comment">////        //日期格式化</span>
<span class="token comment">////        fastJsonConfig.setDateFormat("yyyy-MM-dd HH:mm:ss");</span>
<span class="token comment">////        //处理中文乱码问题</span>
<span class="token comment">////        List&lt;MediaType> fastMediaTypes = new ArrayList&lt;>();</span>
<span class="token comment">////        fastMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);</span>
<span class="token comment">////</span>
<span class="token comment">////        converter.setSupportedMediaTypes(fastMediaTypes);</span>
<span class="token comment">////        converter.setFastJsonConfig(fastJsonConfig);</span>
<span class="token comment">////        converters.add(converter);</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 添加自定义拦截器
     * .addPathPatterns("/**")  拦截的请求路径
     * .excludePathPatterns("/user"); 排除的请求路径
     *
     * <span class="token keyword">@param</span> <span class="token parameter">registry</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LogHandlerInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">excludePathPatterns</span><span class="token punctuation">(</span><span class="token string">"/11"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><p>Spring boot 添加拦截器(可能Spring 2.0 中 已经失效)</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span><span class="token comment">//声明这是一个配置</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyInterceptor</span> <span class="token keyword">extends</span> <span class="token class-name">WebMvcConfigurerAdapter</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token class-name">HandlerInterceptor</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Spring Boot 2.XX 可以集成 WebMvcConfigurationSupport</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>public class MyInterceptor extends WebMvcConfigurationSupport {
    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        super.addInterceptors(registry);
        registry.addInterceptor(HandlerInterceptor);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Spring boot 实现 Filter 过滤器</p>
<p>首先我们需要创建一个类，让它实现 Filter 接口，然后重写接口中的方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>demofilter<span class="token punctuation">.</span>demofilter<span class="token punctuation">.</span>filter</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>core<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Order</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token operator">*</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">WebFilter</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>   <span class="token comment">// 过滤顺序，值越小越先执行</span>
<span class="token annotation punctuation">@WebFilter</span><span class="token punctuation">(</span>urlPatterns <span class="token operator">=</span> <span class="token string">"/demoFilter"</span><span class="token punctuation">,</span> filterName <span class="token operator">=</span> <span class="token string">"filterTest"</span><span class="token punctuation">)</span><span class="token comment">// urlPatterns Url地址匹配   filterName 拦截器名称</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoFilter</span> <span class="token keyword">implements</span> <span class="token class-name">Filter</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">FilterConfig</span> filterConfig<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"filter初始化中..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doFilter</span><span class="token punctuation">(</span><span class="token class-name">ServletRequest</span> servletRequest<span class="token punctuation">,</span> <span class="token class-name">ServletResponse</span> servletResponse<span class="token punctuation">,</span> <span class="token class-name">FilterChain</span> filterChain<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ServletException</span> <span class="token punctuation">{</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"\ndoFilter()开始执行：发往 "</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span><span class="token punctuation">)</span> servletRequest<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRequestURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" 的请求已被拦截"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"检验接口是否被调用，尝试获取contentType如下： "</span> <span class="token operator">+</span> servletResponse<span class="token punctuation">.</span><span class="token function">getContentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// filter的链式调用；将请求转给下一条过滤链</span>
        filterChain<span class="token punctuation">.</span><span class="token function">doFilter</span><span class="token punctuation">(</span>servletRequest<span class="token punctuation">,</span> servletResponse<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"检验接口是否被调用，尝试获取contentType如下： "</span> <span class="token operator">+</span> servletResponse<span class="token punctuation">.</span><span class="token function">getContentType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"doFilter()执行结束。\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"filter销毁中..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>spring boot 自带的拦截器</p>
<p>OncePerRequestFilter  顾名思义，他能够确保在一次请求只通过一次filter，而不需要重复执行。、、 我们在使用过滤器时，通常没必要知道GenericFilterBean、OncePerRequestFilter和AbstractRequestLoggingFilter，但不防碍我们了解这几个类，就上文所述，</p>
<p>AbstractRequestLoggingFilter继承自OncePerRequestFilter，</p>
<p>OncePerRequestFilter继承自GenericFilterBean，</p>
<p>所以我们知道，genericFilterBean是任何类型的过滤器的一个比较方便的超类，</p>
<p>这个类主要实现的就是从web.xml文件中取得init-param中设定的值，然后对Filter进行初始化（当然，其子类可以覆盖init方法）。</p>
<p>OncePerRequestFilter继承自GenericFilterBean，那么它自然知道怎么去获取配置文件中的属性及其值，所以其重点不在于取值，而在于确保在接收到一个request后，每个filter只执行一次，它的子类只需要关注Filter的具体实现即doFilterInternal。</p>
<p>AbstractRequestLoggingFilter是对OncePerRequestFilter的扩展，它除了遗传了其父类及祖先类的所有功能外，还在doFilterInternal中决定了在过滤之前和之后执行的事件，<strong>它的子类关注的是beforeRequest和afterRequest。</strong></p>
<p>总体来说，这三个类分别执行了Filter的某部分功能，当然，具体如何执行由它们的子类规定，若你需要实现自己的过滤器，也可以根据上文所述继承你所需要的类</p>
<p>AbstractRequestLoggingFilter</p>
<p>用于在处理请求之前和之后执行日志记录操作的筛选器的基类。</p>
<p>子类应该重写beforeRequest（HttpServletRequest，String）和afterRequest（HttpServletRequest，String）方法来围绕请求执行实际的日志记录。</p>
<p>在beforeRequest和afterRequest方法中将消息传递给子类以写入日志。默认情况下，只记录请求的URI。但是，将includeQueryString属性设置为true将导致请求的查询字符串也被包括在内；这可以通过includeClientInfo和includeHeaders进一步扩展。请求的有效负载（正文内容）可以通过includePayload标志进行记录：请注意，这将只记录实际读取的有效负载部分，而不一定记录请求的整个正文。</p>
<p>可以使用beforeMessagePrefix、afterMessagePrefix、beforeMessageSuffix和afterMessageSuffix属性配置before和after消息的前缀和后缀。</p>
<p>公共类CharacterEncodingFilter</p>
<p>扩展OncePerRequestFilter</p>
<p>允许为请求指定字符编码的Servlet过滤器。这很有用，因为即使在HTML页面或表单中指定了字符编码，当前浏览器通常也不会设置字符编码。</p>
<p>如果请求尚未指定编码，则此筛选器可以应用其编码，或者在任何情况下强制执行此筛选器的编码（“forceEncoding”=“true”）。在后一种情况下，编码也将作为默认响应编码应用（尽管这通常会被视图中设置的完整内容类型覆盖）。</p>
<h2 id="commonsrequestloggingfilter" tabindex="-1"><a class="header-anchor" href="#commonsrequestloggingfilter" aria-hidden="true">#</a> CommonsRequestLoggingFilter</h2>
<p>扩展AbstractRequestLoggingFilter</p>
<p>简单的请求日志过滤器，将请求URI（以及可选的查询字符串）写入公共日志。</p>
<h2 id="compositefilter" tabindex="-1"><a class="header-anchor" href="#compositefilter" aria-hidden="true">#</a> CompositeFilter</h2>
<p>一种通用的复合servlet过滤器，它只将其行为委托给用户提供的过滤器的链（列表），实现FilterChain的功能，但只使用筛选器实例非常方便。</p>
<p>这对于需要依赖注入的过滤器非常有用，因此可以在Spring应用程序上下文中设置。通常，此组合将与delegtingFilterProxy一起使用，以便在Spring中声明它，但应用于servlet上下文。</p>
<p>CorsFilter</p>
<p>扩展OncePerRequestFilter</p>
<p>过滤以处理CORS飞行前请求，并使用CORS处理器拦截CORS简单和实际请求，并根据通过提供的CORS配置源匹配的策略更新响应，例如使用CORS响应头。</p>
<p>这是在springmvcjavaconfig和springmvcxml命名空间中配置cor的一种替代方法。它对于仅依赖于springweb（而不是springwebmvc）的应用程序或需要在过滤器级别执行CORS检查的安全约束非常有用。</p>
<p>此筛选器可以与DelegatingFilterProxy一起使用，以帮助初始化。</p>
<h2 id="delegatingfilterproxy" tabindex="-1"><a class="header-anchor" href="#delegatingfilterproxy" aria-hidden="true">#</a> DelegatingFilterProxy</h2>
<p>扩展GenericFilterBean</p>
<p>标准Servlet过滤器的代理，委托给实现过滤器接口的Spring管理bean。支持web.xml中的“targetBeanName”过滤器init param，在Spring应用程序上下文中指定目标bean的名称。</p>
<p>xml通常包含DelegatingFilterProxy定义，指定的过滤器名称对应于Spring根应用程序上下文中的bean名称。所有对过滤器代理的调用都将被委托给Spring上下文中的bean，这是实现标准Servlet过滤器接口所必需的。</p>
<p>这种方法对于具有复杂设置需求的过滤器实现特别有用，允许将完整的springbean定义机制应用于过滤器实例。或者，考虑将标准过滤器设置与从Spring根应用程序上下文中查找服务bean结合起来。</p>
<p>注意：Servlet过滤器接口定义的生命周期方法在默认情况下不会委托给目标bean，而是依赖Spring应用程序上下文来管理该bean的生命周期。将“targetFilterLifecycle”filter init参数指定为“true”将强制调用目标bean上的filter.init和filter.destroy生命周期方法，让servlet容器管理过滤器生命周期。</p>
<p>从Spring3.1开始，DelegatingFilterProxy已经更新，当使用Servlet3.0基于实例的过滤器注册方法时，可以选择接受构造函数参数，通常与Spring3.1的WebApplicationInitializer SPI结合使用。这些构造函数允许直接提供委托过滤器bean，或者提供要获取的应用程序上下文和bean名称，避免了从ServletContext中查找应用程序上下文的需要。</p>
<p>这个类最初是受springsecurity的FilterToBeanProxy类的启发，由benalex编写。</p>
<p>FormContentFilter</p>
<p>扩展OncePerRequestFilter</p>
<p>为HTTP PUT、PATCH和DELETE请求解析表单数据并将其作为Servlet请求参数公开的筛选器。默认情况下，Servlet规范仅要求HTTP POST使用此功能。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>GenericFilterBean
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Filter的简单基本实现，它将其配置参数（web.xml中Filter标记中的init param条目）作为bean属性。</p>
<p>一个方便的超类为任何类型的过滤器。配置参数的类型转换是自动的，使用转换后的值调用相应的setter方法。子类也可以指定所需的属性。没有匹配bean属性设置器的参数将被忽略。</p>
<p>这个过滤器将实际的过滤留给子类，子类必须实现filter.doFilter（javax.servlet.ServletRequest，javax.servlet.ServletResponse，javax.servlet.FilterChain）方法。</p>
<p>此泛型筛选器基类不依赖于Spring ApplicationContext概念。过滤器通常不加载自己的上下文，而是从Spring根应用程序上下文访问服务bean，可以通过过滤器的ServletContext进行访问（请参阅WebApplicationContextUtils）。</p>
<p>HiddenHttpMethodFilter</p>
<p>扩展OncePerRequestFilter</p>
<p>将发布的方法参数转换为HTTP方法的筛选器，可通过HttpServletRequest.getMethod（）检索。由于浏览器目前只支持GET和POST，一种常见的技术（例如原型库使用的技术）是使用一个普通的POST和一个额外的隐藏表单字段（\方法）来传递“真正的”HTTP方法。此筛选器读取该参数并相应地更改HttpServletRequestWrapper.getMethod（）返回值。只允许使用“PUT”、“DELETE”和“PATCH”HTTP方法。</p>
<p>请求参数的名称默认为\u method，但可以通过methodParam属性进行调整。</p>
<p>注意：在多部分POST请求的情况下，这个过滤器需要在多部分处理之后运行，因为它内在地需要检查POST主体参数。因此，通常在web.xml过滤器链中的HiddenHttpMethodFilter之前放置一个Spring MultipartFilter。</p>
<p>RelativeRedirectFilter</p>
<p>扩展OncePerRequestFilter</p>
<p>重写HttpServletResponse.sendRedirect（String）并通过设置HTTP状态和“Location”头来处理它，这可以防止Servlet容器将相对重定向url重新写入绝对重定向url。Servlet容器需要这样做，但不符合rfc7231第7.1.2节的建议，而且不一定要考虑“X-Forwarded”头。</p>
<p>注意：虽然RFC中建议使用相对重定向，但在某些使用反向代理的配置下，它们可能无法工作。</p>
<p>RequestContextFilter</p>
<p>扩展OncePerRequestFilter</p>
<p>Servlet过滤器，通过LocaleContextHolder和RequestContextHolder向当前线程公开请求。在web.xml中注册为筛选器。</p>
<p>或者，Spring的RequestContextListener和Spring的org.springframework.web.servlet.DispatcherServlet也向当前线程公开相同的请求上下文。</p>
<p>这个过滤器主要用于第三方servlet，例如JSF FacesServlet。在Spring自己的web支持下，DispatcherServlet的处理就足够了。</p>
<p>ServletContextRequestLoggingFilter</p>
<p>扩展AbstractRequestLoggingFilter</p>
<p>简单的请求日志过滤器，将请求URI（以及可选的查询字符串）写入ServletContext日志。</p>
<p>ServletRequestPathFilter</p>
<p>一个过滤器，用于解析和缓存请求路径，以便在整个过滤器链中进行进一步访问。当解析的路径模式在应用程序中的任何位置使用时，这非常有用，而不是使用PathMatcher进行字符串模式匹配。</p>
<p>请注意，在SpringMVC中，如果DispatcherServlet检测到已为任何HandlerMapping启用了已解析的PathPatterns，则它还将解析和缓存RequestPath，但如果发现ServletRequestPathUtils.PATH\u属性已存在，则它将跳过该操作。</p>
<p>ShallowEtagHeaderFilter</p>
<p>扩展OncePerRequestFilter</p>
<p>基于响应内容生成ETag值的筛选器。此ETag与请求的If None-Match头进行比较。如果这些标头相等，则不发送响应内容，而是发送304“未修改”状态。</p>
<p>因为ETag是基于响应内容的，所以仍然呈现响应（例如org.springframework.web.servlet.View）。因此，此筛选器只节省带宽，而不节省服务器性能。</p>
<p>注意：从SpringFramework5.0开始，这个过滤器使用基于Servlet3.1API构建的请求/响应装饰器。</p>
<p>WebFilter</p>
<p>拦截风格的契约，对Web请求的链式处理，可用于实现横切、应用程序无关的需求，如安全性、超时等。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class WebFluxSecurityCorsFilter implements WebFilter {

    @Override
    @SuppressWarnings("all")
    public Mono&lt;Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        if (CorsUtils.isCorsRequest(request)) {
            ServerHttpResponse response = exchange.getResponse();
            HttpHeaders headers = response.getHeaders();
            headers.add("Access-Control-Allow-Origin", "*");
            headers.add("Access-Control-Allow-Methods", "*");
            headers.add("Access-Control-Max-Age", "3600");
            headers.add("Access-Control-Allow-Headers", "*");
            if (request.getMethod() == HttpMethod.OPTIONS) {
                response.setStatusCode(HttpStatus.OK);
                return Mono.empty();
            }
        }
        return chain.filter(exchange);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div></template>
