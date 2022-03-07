# Spring Cloud LoadBalancer

## 1.什么是Spring Cloud LoadBalancer

Spring Cloud LoadBalancer是Spring Cloud官方自己提供的客户端负载均衡器,用来替代Ribbon。
Spring官方提供了两种负载均衡的客户端:
RestTemplate
RestTrenplate是Sping提供的用于访问Res瑕破务的客户端，RestTempate提供了多种便捷访问远程t服务的方法，能够大大提高客户揩的编写效率。默认情况下，Restrerplate默认依数北的HTP连接I具，WebClient
WebCient是从srnglVesu 5 05f本开始提供的一个非狂塞的基于瑜应式编的进行tmi请求的客户扰工具。它的响应式牌的基于Recto的,weCNlent中提供了标淮to靖请求方式对寸诚的gpt,post、 put dee等方法，可以用来发起相应的请求。

## 2.RestTemplate整合LoadBalancer

> 默认的方法；轮询： RoundRobinLoadBalancer

注入loadbalancer依赖

```xml
		<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-loadbalancer</artifactId>
        </dependency>
```

spring 注入RestTemplate

```java
@Configuration
public class ApplicationContextConfig{
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(RestTemplateBuilder builder){
        return builder.build();
    }
}
```

由于Spring Cloud 2021版本中禁用相关不推荐的如 Security 和Ribbon 

如果是Spring Cloud 2021之前的版本则需要在yaml文件中禁用相关配置：

```yaml
spring:
  cloud:
  	loadbalancer:
  	  ribbon:
  	  	enable: false
  		 
```

同时排除`pom.xml` 文件中`ribbon` 依赖

## 3.自定义Loadbalance 算法

## 参考官方链接

[Loadbalance 默认算法说明](https://docs.spring.io/spring-cloud-commons/docs/3.1.0-SNAPSHOT/reference/html/#switching-between-the-load-balancing-algorithms)

[Loadbalance 自定义算法](https://docs.spring.io/spring-cloud-commons/docs/3.1.0-SNAPSHOT/reference/html/#custom-loadbalancer-configuration)

