# OpenFeign负载均衡服务调用

## OpenFeign的前世今生

### Feign

Feign是一个声明式WebService客户端。使用Feign能让编写Web Service客户端更加简单。 它的使用方法是定义一个服务接口然后在上面添加注解。Feign也支持可拔插式的编码器和解码器。Spring Cloud对Feign进行了封装，使其支持了Spring MVC标准注解和HttpMessageConverters。Feign可以与Eureka和Ribbon组合使用以支持负载均衡

是一个声明式的web客户端,只需要创建一个接口,添加注解即可完成微服务之间的调用

### Feign能干什么

Feign旨在使编写Java Http客户端变得更容易。就是远程调用其他服务 前面在使用Ribbon+RestTemplate时，利用RestTemplate对http请求的封装处理，形成了一套模版化的调用方法。但是在实际开发中，由于对服务依赖的调用可能不止一处，往往一个接口会被多处调用，所以通常都会针对每个微服务自行封装一些客户端类来包装这些依赖服务的调用。所以，Feign在此基础上做了进一步封装，由他来帮助我们定义和实现依赖服务接口的定义。在Feign的实现下，我们只需创建一个接口并使用注解的方式来配置它(以前是Dao接口上面标注Mapper注解,现在是一个微服务接口上面标注一个Feign注解即可)，即可完成对服务提供方的接口绑定，简化了使用Spring cloud Ribbon时，自动封装服务调用客户端的开发量。

### Feign集成了Ribbon

我们可以利用Ribbon+ResttTemplate维护了Payment的服务列表信息，并且通过轮询实现了客户端的负载均衡。而与Ribbon不同的是，通过feign只需要定义服务绑定接口且以声明式的方法，优雅而简单的实现了服务调用

## Feign与OpenFeign区别

| Feign                                                        | OpenFeign                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Feign是Spring Cloud组件中的一个轻量级RESTful的HTTP服务客户端Feign内置了Ribbon，用来做客户端负载均衡，去调用服务注册中心的服务。Feign的使用方式是:使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务 | OpenFeign是Spring Cloud在Feign的基础上支持了SpringMVC的注解，如@RequesMapping等等。OpenFeign的@FeignClient可以解析SpringMVC的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。 |

Feign


```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-feign</artifactId>
</dependency>
```



OpenFeign

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```




## 使用OpenFeign

> 使用服务注册中心进行相关的操作 Feign默认使用ribbon实现负载均衡


### 添加注解

[@EnableFeignClients ](/EnableFeignClients)

```java
@SpringBootApplication
@EnableFeignClients
public class OrderFeignMain80
{
    public static void main(String[] args) {
            SpringApplication.run(OrderFeignMain80.class, args);
    }
}
```


### 定义远程调用服务

@FeignClient设置远程服务名称

```java
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE")
public interface PaymentFeignService{
    @GetMapping(value = "/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id);

    @GetMapping(value = "/payment/feign/timeout")
    public String paymentFeignTimeout();
}
```


## OpenFeign常用设置

### OpenFeign超时机制

OpenFeign默认等待时间是1秒,超过1秒,直接报错,设置超时时间,修改配置文件: 因为openFeign的底层是ribbon进行负载均衡,所以它的超时时间是由ribbon控制

#设置feign客户端超时时间( openFeign默认支持ribbon)

```yaml
ribbon:
  #指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间
  ReadTimeout: 5000
  #指的是建立连接后从服务器读取到可用资源所用的时间
  connectTimeout: 5ood
```


### OpenFeign日志

Feign提供了日志打印功能，我们可以通过配置来调整日志级别，从而了解Feign中 Http请求的细节。说白了就是对Feign接口的调用情况进行监控和输出。 openFeign的日志级别有:

- NONE:默认的，不显示任何日志;

- BASIC:仅记录请求方法、URL、响应状态码及执行时间;

- HEADERS:除了BASIC中定义的信息之外，还有请求和响应的头信息;

- FULL:除了HEADERS中定义的信息之外，还有请求和响应的正文及元数据。

#### 实现在配置类中添加OpenFeign的日志类

```java
@Configuration
public class FeignConfig{
    @Bean
    Logger.Level feignLoggerLevel(){
        return Logger.Level.FULL;
    }
}
```


#### 为指定类设置日志级别

```yaml
logging:
  level:
    # feign日志以什么级别监控哪个接口
    com.xxx.xx.xx.PaymentFeignService: debug
```

