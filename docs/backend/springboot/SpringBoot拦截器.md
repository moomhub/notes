# Spring Boot 拦截器

传统的Spring MVC 拦截器

实现 `HandlerInterceptor` 接口

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LogHandlerInterceptor implements HandlerInterceptor {
    protected final Log log = LogFactory.getLog(this.getClass());

    /**
     * 请求方法执行之前
     * 返回true则通过
     *
     * @param request - 请求
     * @param response - 响应
     * @param handler - 处理
     * @return true 为放行 false 为拦截
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        StringBuffer requestURL = request.getRequestURL();
        log.info("preHandle请求URL：" + requestURL.toString());
        return true;
    }

    /**
     * 返回modelAndView之前执行
     * @param request - 请求
     * @param response - 响应
     * @param handler - 处理
     * @param modelAndView  - 请求的响应的视图
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) {
        log.info("postHandle返回modelAndView之前");
    }

    /**
     * 执行Handler完成执行此方法
     * @param request - 请求
     * @param response - 响应
     * @param handler - 处理
     * @param ex 错误
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        log.info("afterCompletion执行完请求方法完全返回之后");
    }
}
```


注入SpringMvcConfig 中

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * 自定义JSON转换器
     *
     * @param converters
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
//        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
////        FastJsonConfig fastJsonConfig = new FastJsonConfig();
////        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
////        //日期格式化
////        fastJsonConfig.setDateFormat("yyyy-MM-dd HH:mm:ss");
////        //处理中文乱码问题
////        List<MediaType> fastMediaTypes = new ArrayList<>();
////        fastMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
////
////        converter.setSupportedMediaTypes(fastMediaTypes);
////        converter.setFastJsonConfig(fastJsonConfig);
////        converters.add(converter);
    }

    /**
     * 添加自定义拦截器
     * .addPathPatterns("/**")  拦截的请求路径
     * .excludePathPatterns("/user"); 排除的请求路径
     *
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogHandlerInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/11");
    }
}
```


Spring boot 添加拦截器(可能Spring 2.0 中 已经失效)

```java
@Configuration//声明这是一个配置
public class MyInterceptor extends WebMvcConfigurerAdapter {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(HandlerInterceptor).addPathPatterns("/**");
    }
}
```


Spring Boot 2.XX 可以集成 WebMvcConfigurationSupport

```纯文本
public class MyInterceptor extends WebMvcConfigurationSupport {
    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        super.addInterceptors(registry);
        registry.addInterceptor(HandlerInterceptor);
    }
}
```


Spring boot 实现 Filter 过滤器

首先我们需要创建一个类，让它实现 Filter 接口，然后重写接口中的方法：

```java

package com.demo.demofilter.demofilter.filter;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@Order(1)   // 过滤顺序，值越小越先执行
@WebFilter(urlPatterns = "/demoFilter", filterName = "filterTest")// urlPatterns Url地址匹配   filterName 拦截器名称
public class DemoFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("filter初始化中...");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        System.out.println("\ndoFilter()开始执行：发往 " + ((HttpServletRequest) servletRequest).getRequestURL().toString() + " 的请求已被拦截");

        System.out.println("检验接口是否被调用，尝试获取contentType如下： " + servletResponse.getContentType());
        // filter的链式调用；将请求转给下一条过滤链
        filterChain.doFilter(servletRequest, servletResponse);
        System.out.println("检验接口是否被调用，尝试获取contentType如下： " + servletResponse.getContentType());

        System.out.println("doFilter()执行结束。\n");
    }

    @Override
    public void destroy() {
        System.out.println("filter销毁中...");
    }
}
```


spring boot 自带的拦截器

OncePerRequestFilter  顾名思义，他能够确保在一次请求只通过一次filter，而不需要重复执行。、、 我们在使用过滤器时，通常没必要知道GenericFilterBean、OncePerRequestFilter和AbstractRequestLoggingFilter，但不防碍我们了解这几个类，就上文所述，

AbstractRequestLoggingFilter继承自OncePerRequestFilter，

OncePerRequestFilter继承自GenericFilterBean，

所以我们知道，genericFilterBean是任何类型的过滤器的一个比较方便的超类，

这个类主要实现的就是从web.xml文件中取得init-param中设定的值，然后对Filter进行初始化（当然，其子类可以覆盖init方法）。

OncePerRequestFilter继承自GenericFilterBean，那么它自然知道怎么去获取配置文件中的属性及其值，所以其重点不在于取值，而在于确保在接收到一个request后，每个filter只执行一次，它的子类只需要关注Filter的具体实现即doFilterInternal。

   AbstractRequestLoggingFilter是对OncePerRequestFilter的扩展，它除了遗传了其父类及祖先类的所有功能外，还在doFilterInternal中决定了在过滤之前和之后执行的事件，**它的子类关注的是beforeRequest和afterRequest。** 

   总体来说，这三个类分别执行了Filter的某部分功能，当然，具体如何执行由它们的子类规定，若你需要实现自己的过滤器，也可以根据上文所述继承你所需要的类

AbstractRequestLoggingFilter

用于在处理请求之前和之后执行日志记录操作的筛选器的基类。

子类应该重写beforeRequest（HttpServletRequest，String）和afterRequest（HttpServletRequest，String）方法来围绕请求执行实际的日志记录。

在beforeRequest和afterRequest方法中将消息传递给子类以写入日志。默认情况下，只记录请求的URI。但是，将includeQueryString属性设置为true将导致请求的查询字符串也被包括在内；这可以通过includeClientInfo和includeHeaders进一步扩展。请求的有效负载（正文内容）可以通过includePayload标志进行记录：请注意，这将只记录实际读取的有效负载部分，而不一定记录请求的整个正文。

可以使用beforeMessagePrefix、afterMessagePrefix、beforeMessageSuffix和afterMessageSuffix属性配置before和after消息的前缀和后缀。

公共类CharacterEncodingFilter

扩展OncePerRequestFilter

允许为请求指定字符编码的Servlet过滤器。这很有用，因为即使在HTML页面或表单中指定了字符编码，当前浏览器通常也不会设置字符编码。

如果请求尚未指定编码，则此筛选器可以应用其编码，或者在任何情况下强制执行此筛选器的编码（“forceEncoding”=“true”）。在后一种情况下，编码也将作为默认响应编码应用（尽管这通常会被视图中设置的完整内容类型覆盖）。

## CommonsRequestLoggingFilter

扩展AbstractRequestLoggingFilter

简单的请求日志过滤器，将请求URI（以及可选的查询字符串）写入公共日志。

## CompositeFilter

一种通用的复合servlet过滤器，它只将其行为委托给用户提供的过滤器的链（列表），实现FilterChain的功能，但只使用筛选器实例非常方便。

这对于需要依赖注入的过滤器非常有用，因此可以在Spring应用程序上下文中设置。通常，此组合将与delegtingFilterProxy一起使用，以便在Spring中声明它，但应用于servlet上下文。

CorsFilter

扩展OncePerRequestFilter

过滤以处理CORS飞行前请求，并使用CORS处理器拦截CORS简单和实际请求，并根据通过提供的CORS配置源匹配的策略更新响应，例如使用CORS响应头。

这是在springmvcjavaconfig和springmvcxml命名空间中配置cor的一种替代方法。它对于仅依赖于springweb（而不是springwebmvc）的应用程序或需要在过滤器级别执行CORS检查的安全约束非常有用。

此筛选器可以与DelegatingFilterProxy一起使用，以帮助初始化。

## DelegatingFilterProxy

扩展GenericFilterBean

标准Servlet过滤器的代理，委托给实现过滤器接口的Spring管理bean。支持web.xml中的“targetBeanName”过滤器init param，在Spring应用程序上下文中指定目标bean的名称。

xml通常包含DelegatingFilterProxy定义，指定的过滤器名称对应于Spring根应用程序上下文中的bean名称。所有对过滤器代理的调用都将被委托给Spring上下文中的bean，这是实现标准Servlet过滤器接口所必需的。

这种方法对于具有复杂设置需求的过滤器实现特别有用，允许将完整的springbean定义机制应用于过滤器实例。或者，考虑将标准过滤器设置与从Spring根应用程序上下文中查找服务bean结合起来。

注意：Servlet过滤器接口定义的生命周期方法在默认情况下不会委托给目标bean，而是依赖Spring应用程序上下文来管理该bean的生命周期。将“targetFilterLifecycle”filter init参数指定为“true”将强制调用目标bean上的filter.init和filter.destroy生命周期方法，让servlet容器管理过滤器生命周期。

从Spring3.1开始，DelegatingFilterProxy已经更新，当使用Servlet3.0基于实例的过滤器注册方法时，可以选择接受构造函数参数，通常与Spring3.1的WebApplicationInitializer SPI结合使用。这些构造函数允许直接提供委托过滤器bean，或者提供要获取的应用程序上下文和bean名称，避免了从ServletContext中查找应用程序上下文的需要。

这个类最初是受springsecurity的FilterToBeanProxy类的启发，由benalex编写。

FormContentFilter

扩展OncePerRequestFilter

为HTTP PUT、PATCH和DELETE请求解析表单数据并将其作为Servlet请求参数公开的筛选器。默认情况下，Servlet规范仅要求HTTP POST使用此功能。

```纯文本
GenericFilterBean
```


Filter的简单基本实现，它将其配置参数（web.xml中Filter标记中的init param条目）作为bean属性。

一个方便的超类为任何类型的过滤器。配置参数的类型转换是自动的，使用转换后的值调用相应的setter方法。子类也可以指定所需的属性。没有匹配bean属性设置器的参数将被忽略。

这个过滤器将实际的过滤留给子类，子类必须实现filter.doFilter（javax.servlet.ServletRequest，javax.servlet.ServletResponse，javax.servlet.FilterChain）方法。

此泛型筛选器基类不依赖于Spring ApplicationContext概念。过滤器通常不加载自己的上下文，而是从Spring根应用程序上下文访问服务bean，可以通过过滤器的ServletContext进行访问（请参阅WebApplicationContextUtils）。

HiddenHttpMethodFilter

扩展OncePerRequestFilter

将发布的方法参数转换为HTTP方法的筛选器，可通过HttpServletRequest.getMethod（）检索。由于浏览器目前只支持GET和POST，一种常见的技术（例如原型库使用的技术）是使用一个普通的POST和一个额外的隐藏表单字段（\方法）来传递“真正的”HTTP方法。此筛选器读取该参数并相应地更改HttpServletRequestWrapper.getMethod（）返回值。只允许使用“PUT”、“DELETE”和“PATCH”HTTP方法。

请求参数的名称默认为\u method，但可以通过methodParam属性进行调整。

注意：在多部分POST请求的情况下，这个过滤器需要在多部分处理之后运行，因为它内在地需要检查POST主体参数。因此，通常在web.xml过滤器链中的HiddenHttpMethodFilter之前放置一个Spring MultipartFilter。

RelativeRedirectFilter

扩展OncePerRequestFilter

重写HttpServletResponse.sendRedirect（String）并通过设置HTTP状态和“Location”头来处理它，这可以防止Servlet容器将相对重定向url重新写入绝对重定向url。Servlet容器需要这样做，但不符合rfc7231第7.1.2节的建议，而且不一定要考虑“X-Forwarded”头。

注意：虽然RFC中建议使用相对重定向，但在某些使用反向代理的配置下，它们可能无法工作。

RequestContextFilter

扩展OncePerRequestFilter

Servlet过滤器，通过LocaleContextHolder和RequestContextHolder向当前线程公开请求。在web.xml中注册为筛选器。

或者，Spring的RequestContextListener和Spring的org.springframework.web.servlet.DispatcherServlet也向当前线程公开相同的请求上下文。

这个过滤器主要用于第三方servlet，例如JSF FacesServlet。在Spring自己的web支持下，DispatcherServlet的处理就足够了。

ServletContextRequestLoggingFilter

扩展AbstractRequestLoggingFilter

简单的请求日志过滤器，将请求URI（以及可选的查询字符串）写入ServletContext日志。

ServletRequestPathFilter

一个过滤器，用于解析和缓存请求路径，以便在整个过滤器链中进行进一步访问。当解析的路径模式在应用程序中的任何位置使用时，这非常有用，而不是使用PathMatcher进行字符串模式匹配。

请注意，在SpringMVC中，如果DispatcherServlet检测到已为任何HandlerMapping启用了已解析的PathPatterns，则它还将解析和缓存RequestPath，但如果发现ServletRequestPathUtils.PATH\u属性已存在，则它将跳过该操作。

ShallowEtagHeaderFilter

扩展OncePerRequestFilter

基于响应内容生成ETag值的筛选器。此ETag与请求的If None-Match头进行比较。如果这些标头相等，则不发送响应内容，而是发送304“未修改”状态。

因为ETag是基于响应内容的，所以仍然呈现响应（例如org.springframework.web.servlet.View）。因此，此筛选器只节省带宽，而不节省服务器性能。

注意：从SpringFramework5.0开始，这个过滤器使用基于Servlet3.1API构建的请求/响应装饰器。

WebFilter

拦截风格的契约，对Web请求的链式处理，可用于实现横切、应用程序无关的需求，如安全性、超时等。

```纯文本
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class WebFluxSecurityCorsFilter implements WebFilter {

    @Override
    @SuppressWarnings("all")
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
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
```


