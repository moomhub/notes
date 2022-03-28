# Spring Boot 带图形界面的监控-Spring Boot Admin

`SpringBootAdmin`不是 Spring 官方提供的模块，它包含了`Client`和`Server`两部分。server 部分提供了用户管理界面，client 即为被监控的服务。client 需要注册到 server 端。

SpringBootAdmin 提供了很少的几个监控服务端点，需要依赖 SpringBootActuator 丰富监控功能。

## server 端配置

server 端的配置很简单，无需任何开发。

第一步：引入依赖

> 最新依赖地址：[Maven Repository: de.codecentric » spring-boot-admin-starter-server (mvnrepository.com)](https://mvnrepository.com/artifact/de.codecentric/spring-boot-admin-starter-server)

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
    <version>2.4.1</version>
</dependency>
```

第二步：在启动类上增加@EnableAdminServer 注解，开启对 spring-boot-admin 的支持。

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

## Client 端配置

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

由于 actuator 默认只开启了 health 和 info 两个 web 端口，如果想要在 server 端页面看到所有的监控信息，需要开启其他接口的 web 端口。

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

现在的效果如下：

![](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1623833694428-12811277-a126-4dcb-8383-ea56a022fcc9.png)

spring-boot-admin 的应用就简单介绍完了。spring-boot-admin 配合 spring-boot-actuator 实现多服务监控，不仅能查看提供服务监控信息的 ui，而且可以监控更加全面的内容。
