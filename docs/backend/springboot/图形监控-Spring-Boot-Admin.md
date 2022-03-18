# Spring Boot 带图形界面的监控-Spring Boot Admin

`SpringBootAdmin`不是Spring官方提供的模块，它包含了`Client`和`Server`两部分。server部分提供了用户管理界面，client即为被监控的服务。client需要注册到server端。

SpringBootAdmin提供了很少的几个监控服务端点，需要依赖SpringBootActuator丰富监控功能。

## server端配置

server端的配置很简单，无需任何开发。

第一步：引入依赖

> 最新依赖地址：[Maven Repository: de.codecentric » spring-boot-admin-starter-server (mvnrepository.com)](https://mvnrepository.com/artifact/de.codecentric/spring-boot-admin-starter-server)


```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
    <version>2.4.1</version>
</dependency>
```


第二步：在启动类上增加@EnableAdminServer注解，开启对spring-boot-admin的支持。

```java
@SpringBootApplication
@EnableAdminServer
public class SpringBootAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootAdminApplication.class, args);
    }
}
```

做好以上配置，然后访问[http://ip:port；效果如下](http://ip:port；效果如下)

目前还没有客户端注册到服务端，所以看不到任何监控的内容，接下来我们创建一个客户端并且注册到服务端后再来看看效果。



## Client端配置

第一步：引入依赖

> 最新版地址[Maven Repository: de.codecentric » spring-boot-admin-starter-client (mvnrepository.com)](https://mvnrepository.com/artifact/de.codecentric/spring-boot-admin-starter-client)


```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.4.1</version>
</dependency>
```


第二部：将客户端注册到服务器端,

```yaml
spring:
  boot:
    admin:
      client:
        # 服务端地址
        url: http://localhost:7019
```


效果如下：

为了监控更多的状态信息，我们在客户端引入`spring-boot-actuator`依赖。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```


由于actuator默认只开启了health和info两个web端口，如果想要在server端页面看到所有的监控信息，需要开启其他接口的web端口。

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
```


现在的效果如下：

![](https://gitee.com/moomhub/img/raw/master/1623833694428-12811277-a126-4dcb-8383-ea56a022fcc9.png)

spring-boot-admin的应用就简单介绍完了。spring-boot-admin配合spring-boot-actuator实现多服务监控，不仅能查看提供服务监控信息的ui，而且可以监控更加全面的内容。

