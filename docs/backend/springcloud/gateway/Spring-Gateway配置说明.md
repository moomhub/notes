# Spring Gateway 配置说明


## Gateway常用配置

### 1、After 

只要当前时间大于设定时间，路由才会匹配请求 - 时间匹配

这个路由规则会在东8区的2018-12-25 14:33:47**后** ，将请求都转跳到`baidu`。

```yaml
spring:  
    cloud:    
        gateway:      
            routes:      
            - id: after_route        
              uri: http://www.baidu.com        
              predicates:        
              - After=2018-12-25T14:33:47.789+08:00
```

### 2、Before 

只要当前时间小于设定时间，路由才会匹配请求 - 时间匹配

这个路由规则会在东8区的2018-12-25 14:33:47**前** ，将请求都转跳到google。

```yaml
spring:  
    cloud:    
        gateway:      
            routes:      
            - id: before_route        
              uri: http://www.google.com        
              predicates:        
              - Before=2018-12-25T14:33:47.789+08:00
```

### 3、Between 

只要当前时间大于第一个设定时间，并小于第二个设定时间，路由才会匹配请求 - 时间匹配

这个路由规则会在东8区的2018-12-25 14:33:47到2018-12-26 14:33:47之间，将请求都转跳到google。

```yaml
spring:  
    cloud:   
        gateway:      
            routes:      
            - id: between_route        
              uri: http://www.google.com        
              predicates:        
              - Between=2018-12-25T14:33:47.789+08:00, 2018-12-26T14:33:47.789+08:00
```


### 4、Cookie

使用的是cookie名字和正则表达式的value作为两个输入参数，请求的cookie需要匹配cookie名和符合其中value的正则

路由匹配请求存在cookie名为cookiename，cookie内容匹配cookievalue的，将请求转发到google。

```yaml
spring: 
    cloud:    
        gateway:  
            routes:      
            - id: cookie_route       
              uri: http://www.google.com        
              predicates:        
              - Cookie=cookiename, cookievalue
```


### 5、Header

路由匹配存在名为X-Request-Id，内容为数字的header的请求，将请求转发到google。

```纯文本
spring:  
    cloud:    
        gateway:     
            routes:      
            - id: header_route        
              uri: http://www.google.com        
              predicates:        
              - Header=X-Request-Id, \d+
```


### 6、Host

使用的是host的列表作为参数，host使用Ant style匹配

路由会匹配Host诸如：[www.somehost.org](http://www.somehost.org) 或 beta.somehost.org或www.anotherhost.org等请求。

```纯文本
spring:  
    cloud:    
        gateway:      
            routes:      
            - id: host_route        
              uri: http://www.google.com        
              predicates:        
              - Host=**.somehost.org,**.anotherhost.org
```


### 7、Method

Method Route Predicate Factory是通过HTTP的method来匹配路由。

路由会匹配到所有GET方法的请求。

```纯文本
spring:  
    cloud:    
        gateway:      
            routes:      
            - id: method_route        
              uri: http://www.google.com        
              predicates:        
              - Method=GET
```


### 8、Path

Path Route Predicate Factory使用的是path列表作为参数，使用Spring的PathMatcher匹配path，可以设置可选变量。

上面路由可以匹配诸如：/foo/1 或 /foo/bar 或 /bar/baz等 其中的segment变量可以通过下面方式获取：

```纯文本
spring:  
    cloud:    
        gateway:      
            routes:      
            - id: host_route        
              uri: http://www.google.com       
              predicates:        
              - Path=/foo/{segment},/bar/{segment}
```


### 9、Query

Query Route Predicate Factory可以通过一个或两个参数来匹配路由，一个是查询的name，一个是查询的正则value。

路由会匹配所有包含baz查询参数的请求

```yaml
spring:  
  cloud:    
    gateway:      
      routes:      
      - id: query_route        
        uri: http://www.google.com        
        predicates:        
        - Query=baz
```


10、RemoteAddr

RemoteAddr Route Predicate Factory通过无类别域间路由(IPv4 or IPv6)列表匹配路由。

路由就会匹配RemoteAddr诸如192.168.1.10等请求。

```yaml
spring:  
  cloud:    
    gateway:    
          routes:      
          - id: remoteaddr_route        
            uri: http://www.google.com        
            predicates:        
            - RemoteAddr=192.168.1.1/24
```


## 二、GatewayFilter 使用

Route filters可以通过一些方式修改HTTP请求的输入和输出，针对某些特殊的场景，Spring Cloud Gateway已经内置了很多不同功能的GatewayFilter Factories。

### 1、AddRequestHeader

AddRequestHeader GatewayFilter Factory通过配置name和value可以增加请求的header。

对匹配的请求，会额外添加X-Request-Foo:Bar的header。

```纯文本
spring:  
  cloud:    
    gateway:   
          routes: 
            - id: add_request_header_route  
              uri: http://www.google.com  
              filters:
              - AddRequestHeader=X-Request-Foo, Bar
```


### 2、AddRequestParameter

AddRequestParameter GatewayFilter Factory通过配置name和value可以增加请求的参数

对匹配的请求，会额外添加foo=bar的请求参数。

```纯文本
spring:  
  cloud:  
      gateway:   
          routes:      
          - id: add_request_parameter_route     
              uri: http://www.google.com     
              filters:       
              - AddRequestParameter=foo, bar
```


### 3、AddResponseHeader

AddResponseHeader GatewayFilter Factory通过配置name和value可以增加响应的header。

对匹配的请求，响应返回时会额外添加X-Response-Foo:Bar的header返回。

```纯文本
spring:  
  cloud:   
      gateway:  
          routes:      
          - id: add_request_header_route    
              uri: http://www.google.com     
              filters:        
              - AddResponseHeader=X-Response-Foo, Bar
```


### 4、Hystrix

Hystrix是Netflix实现的断路器模式工具包，The Hystrix GatewayFilter就是将断路器使用在gateway的路由上，目的是保护你的服务避免级联故障，以及在下游失败时可以降级返回。

项目里面引入spring-cloud-starter-netflix-hystrix依赖，并提供HystrixCommand的名字，即可生效Hystrix GatewayFilter

Hystrix过滤器也是通过配置可以参数fallbackUri，来支持路由熔断后的降级处理，降级后，请求会跳过fallbackUri配置的路径，目前只支持forward:的URI协议

```纯文本
  cloud:
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
```


生成一个名为`**fallbackcmd**`的HystrixGatewayFilter 拦截器。 Hystrix降级后就会将请求转发到/incaseoffailureusethis。

整个流程其实是用fallbackUri将请求跳转到gateway内部的controller或者handler，然而也可以通过以下的方式将请求转发到外部的服务： gateway降级后就会将请求转发到[http://localhost:9994。](http://localhost:9994。)

```纯文本
spring:
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
```


设置 hystrix 熔断器的超时信息

```yaml
hystrix:
  command:
  # 全局的超时信息
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 10000
    # 具体到某一个 Hystrix filters name的超时信息
    socialfallback:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 60000
```


### 5、FallbackHeaders

FallbackHeaders GatewayFilter Factory可以将Hystrix执行的异常信息添加到外部请求的fallbackUriheader上。

```yaml
spring:
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
        filters:
        - name: FallbackHeaders
          args:
            executionExceptionTypeHeaderName: Test-Header
```


在这个例子中，当请求lb://ingredients降级后，FallbackHeadersfilter会将HystrixCommand的异常信息，通过Test-Header带给[http://localhost:9994服务。](http://localhost:9994服务。)

你也可以使用默认的header，也可以像上面一下配置修改header的名字：

```纯文本
executionExceptionTypeHeaderName ("Execution-Exception-Type")

executionExceptionMessageHeaderName ("Execution-Exception-Message")

rootCauseExceptionTypeHeaderName ("Root-Cause-Exception-Type")

rootCauseExceptionMessageHeaderName ("Root-Cause-Exception-Message")
```


### 6、PrefixPath

PrefixPath GatewayFilter Factor通过设置prefix参数来路径前缀。

如果一个请求是/hello，通过上面路由，就会将请求修改为/mypath/hello。

```纯文本
spring:
  cloud:
    gateway:
      routes:
      - id: prefixpath_route
        uri: http://www.google.com
        filters:
        - PrefixPath=/mypath
```


### 7、PreserveHostHeader

PreserveHostHeader GatewayFilter Factory会保留原始请求的host头信息，并原封不动的转发出去，而不是被gateway的http客户端重置。

```纯文本
spring:
  cloud:
    gateway:
      routes:
      - id: preserve_host_route
        uri: http://www.google.com
        filters:
        - PreserveHostHeader
```


8、RequestRateLimiter

RequestRateLimiter GatewayFilter Factory使用RateLimiter来决定当前请求是否允许通过，如果不允许，则默认返回状态码HTTP 429 - Too Many Requests。

RequestRateLimiter GatewayFilter可以使用一个可选参数keyResolver来做速率限制。

keyResolver是KeyResolver接口的一个实现bean，在配置里面，通过SpEL表达式#{@myKeyResolver}来管理bean的名字myKeyResolver

### 9、RemoveNonProxyHeaders

RemoveNonProxyHeaders GatewayFilter Factory转发请求是会根据IETF的定义，默认会移除下列的http头信息：

1. Connection

2. Keep-Alive

3. Proxy-Authenticate

4. Proxy-Authorization

5. TE

6. Trailer

7. Transfer-Encoding

8. Upgrade

你也可以通过配置spring.cloud.gateway.filter.remove-non-proxy-headers.headers来更改需要移除的header列表。

10、RemoveRequestHeader

RemoveRequestHeader GatewayFilter Factory配置header的name，即可以移除请求的header。<br />路由在发送请求给下游时，会将请求中的X-Request-Foo头信息去掉。

```纯文本
spring:
  cloud:
    gateway:
      routes:
      - id: removerequestheader_route
        uri: http://www.google.com
        filters:
        - RemoveRequestHeader=X-Request-Foo
```


11、RemoveResponseHeader

RemoveResponseHeader GatewayFilter Factory通过配置header的name，会在响应返回时移除header。

路由会在响应返回给gateway的客户端时，将X-Response-Foo响应头信息去掉。

```纯文本
spring:
  cloud:
    gateway:
      routes:
      - id: removeresponseheader_route
        uri: http://www.google.com
        filters:
        - RemoveResponseHeader=X-Response-Foo
```


12、RewritePath

RewritePath GatewayFilter Factory使用路径regexp和替换路径replacement两个参数做路径重写，两个都可以灵活地使用java的正则表达式。

如果请求的路径是/foo/bar，则gateway会将请求路径改为/bar发送给下游。

> 在YAML 的格式中使用。


```纯文本
  cloud:
    gateway:
      routes:
      - id: rewritepath_route
        uri: http://www.google.com
        predicates:
        - Path=/foo/**
        filters:
        - RewritePath=/foo/(?<segment>.*), /$\{segment}
```


13、RewriteResponseHeader 、

RewriteResponseHeader GatewayFilter Factory的作用是修改响应返回的header内容，需要配置响应返回的header的name，匹配规则regexp和替换词replacement，也是支持java的正则表达式。

举个例子，对于上面的filter，如果响应的headerX-Response-Foo的内容是/42?user=ford&password=omg!what&flag=true，这个内容会修改为/42?user=ford&password=***&flag=true。

```纯文本
spring:
  cloud:
    gateway:
      routes:
      - id: rewriteresponseheader_route
        uri: http://www.google.com
        filters:
        - RewriteResponseHeader=X-Response-Foo, , password=[^&]+, password=***
```


14、SaveSession

SaveSession GatewayFilter Factory会在请求下游时强制执行WebSession::save方法，用在那种像Spring Session延迟数据存储的，并在请求转发前确保session状态保存情况。

如果你将Spring Secutiry于Spring Session集成使用，并想确保安全信息都传到下游机器，你就需要配置这个filter。

```纯文本
  cloud:
    gateway:
      routes:
      - id: save_session
        uri: http://www.google.com
        predicates:
        - Path=/foo/**
        filters:
        - SaveSession
```


15、SecureHeaders

SecureHeaders GatewayFilter Factory会添加在返回响应中一系列安全作用的header，至于为什么，英文好的可以看一下这篇博客。

默认会添加这些头信息和默认内容：

```纯文本
X-Xss-Protection:1; mode=block

Strict-Transport-Security:max-age=631138519

X-Frame-Options:DENY

X-Content-Type-Options:nosniff

Referrer-Policy:no-referrer

Content-Security-Policy:default-src 'self' https:; font-src 'self' https: data:; img-src 'self' https: data:; object-src 'none'; script-src https:; style-src 'self' https: 'unsafe-inline'

X-Download-Options:noopen

X-Permitted-Cross-Domain-Policies:none
```


如果你想修改这些头信息的默认内容，可以在配置文件中添加下面的配置：

前缀：spring.cloud.gateway.filter.secure-headers

上面的header对应的后缀：

```纯文本
xss-protection-header

strict-transport-security

frame-options

content-type-options

referrer-policy

content-security-policy

download-options

permitted-cross-domain-policies
```


前后缀接起来即可，如：spring.cloud.gateway.filter.secure-headers.xss-protection-header

16、SetPath

SetPath GatewayFilter Factory采用路径template参数，通过请求路径的片段的模板化，来达到操作修改路径的母的，运行多个路径片段模板化

```纯文本
  cloud:
    gateway:
      routes:
      - id: setpath_route
        uri: http://www.google.com
        predicates:
        - Path=/foo/{segment}
        filters:
        - SetPath=/{segment}
```


对于上面的例子，如果路径是/foo/bar，则对于下游的请求路径会修改为/bar。

17、SetResponseHeader

SetResponseHeader GatewayFilter Factory通过设置name和value来替换响应对于的header

对于上面的例子，如果下游的返回带有头信息为X-Response-Foo:1234，则会gateway会替换为X-Response-Foo:Bar，在返回给客户端。

```纯文本
spring:  
   cloud:  
     gateway:        
       routes:      
       - id: setresponseheader_route      
          uri: http://www.google.com      
          filters:      
          - SetResponseHeader=X-Response-Foo, Bar
```


18、SetStatus

SetStatus GatewayFilter Factory通过配置有效的Spring HttpStatus枚举参数，可以是类似于404的这些数字，也可以是枚举的name字符串，来修改响应的返回码。

```纯文本
spring:
  cloud:
    gateway:
      routes:
      - id: setresponseheader_route
        uri: http://www.google.com
        filters:
        - SetResponseHeader=X-Response-Foo, Bar
```


19、StripPrefix

StripPrefix GatewayFilter Factory通过配置parts来表示截断路径前缀的数量。

如果请求的路径为/name/bar/foo，则路径会修改为/foo，即将路径的两个前缀去掉了。

```纯文本
spring:
  cloud:
    gateway:
      routes:
      - id: nameRoot
        uri: http://nameservice
        predicates:
        - Path=/name/**
        filters:
        - StripPrefix=2
```


20、Retry

Retry GatewayFilter Factory可以配置针对不同的响应做请求重试，可以配置如下参数：

1. retries: 重试次数

2. statuses: 需要重试的状态码，需要根据枚举 org.springframework.http.HttpStatus来配置

3. methods: 需要重试的请求方法，需要根据枚举org.springframework.http.HttpMethod来配置

4. series: HTTP状态码系列，详情见枚举org.springframework.http.HttpStatus.Series

下游服务返回502状态码时，gateway会重试3次。

```纯文本
spring:
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
```


21、RequestSize

RequestSize GatewayFilter Factory会限制客户端请求包的大小，通过参数RequestSize来配置最大上传大小，单位字节。

如果请求大小超过5000kb限制，则会返回状态码413 Payload Too Large。

> 如果不设置这个filter，默认限制5M的请求大小。


```纯文本
spring:
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
```


Modify Request Body GatewayFilter Factory

```纯文本
官方说这个filter目前只是beta版本，API以后可能会修改。
```


Modify Request Body GatewayFilter Factory可以修改请求体内容，这个只能通过java来配置。

```纯文本
@Bean
public RouteLocator routes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("rewrite_request_obj", r -> r.host("*.rewriterequestobj.org")
            .filters(f -> f.prefixPath("/httpbin")
                .modifyRequestBody(String.class, Hello.class, MediaType.APPLICATION_JSON_VALUE,
                    (exchange, s) -> return Mono.just(new Hello(s.toUpperCase())))).uri(uri))
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
```


1. Modify Response Body GatewayFilter Factory

官方说这个filter目前只是beta版本，API以后可能会修改。

Modify Response Body GatewayFilter Factory用于修改响应返回的内容，同样只能通过java配置。

```纯文本
@Bean
public RouteLocator routes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("rewrite_response_upper", r -> r.host("*.rewriteresponseupper.org")
            .filters(f -> f.prefixPath("/httpbin")
            .modifyResponseBody(String.class, String.class,
                (exchange, s) -> Mono.just(s.toUpperCase()))).uri(uri)
        .build();
}
```

