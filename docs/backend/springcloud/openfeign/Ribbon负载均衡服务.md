# Ribbon负载均衡服务调用

## Ribbon简介

Spring Cloud Ribbon 是基于Netflix Ribbon 实现的一套客户端负载均衡的工具。<br />Spring-Cloud-Ribbon 作为微服务框架的负载均衡组件，默认使用RestTemplate接口调用外部服务接口。<br />简单的说，Ribbon 是 Netflix 发布的开源项目，主要功能是提供客户端的软件负载均衡算法，将 Netflix 的中间层服务连接在一起。Ribbon 的客户端组件提供一系列完整的配置项，如：连接超时、重试等。简单的说，就是在配置文件中列出 LoadBalancer (简称LB：负载均衡) 后面所有的及其，Ribbon 会自动的帮助你基于某种规则 (如简单轮询，随机连接等等) 去连接这些机器。我们也容易使用 Ribbon 实现自定义的负载均衡算法

## 负载均衡

LB，即负载均衡 (LoadBalancer) ，在微服务或分布式集群中经常用的一种应用。

负载均衡简单的说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA (高用)。

常见的负载均衡软件有 Nginx、Lvs 等等。

Dubbo、SpringCloud 中均给我们提供了负载均衡，SpringCloud 的负载均衡算法可以自定义。

### 负载均衡简单分类：

- 集中式LB

&ensp;&ensp;&ensp;&ensp;- 即在服务的提供方和消费方之间使用独立的LB设施，如Nginx(反向代理服务器)**，客户端所有的请求都会交给 **Nginx,然后由 Nginx实现请求的转发，即负载均衡是由服务器实现的(Nginx)

- 进程式 LB

&ensp;&ensp;&ensp;&ensp;- 将LB逻辑集成到服务消费者，服务消费者从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选出一个合适的服务器进行调用。

&ensp;&ensp;&ensp;&ensp;- Ribbon 就属于进程内LB，它只是一个类库，集成于服务消费者进程，服务消费者通过它来获取到服务提供者的地址！

在调用服务提供者暴露的接口的时候，Ribbon会在注册中心上获取到服务提供者的信息列表(比如：IP地址和端口号等等)，之后再缓存到JVM本地。然后再从这些地址中选出一个合适的服务器进行调用。从而在本地实现HTTP远程调用，默认是30秒刷新一次。

## 使用Ribbon

Ribbon其实就是一个软负载均衡的客户端组件。它可以和其他发起请求的客户端结合使用，和Eureka结合只是其中的一个实例。

### Ribbon原理图



### Ribbon在工作的时候分成两步

1. 第一步先选择Eureka Server(注册中心集群)，它优先选择在同一个区域内负载较少的Server（注册中心）

2. 第二步再根据指定的负载均衡策略，在从注册中心取到的服务提供者列表中选择一个地址进行调用。

其中Ribbon提供了多种负载均衡策略：比如轮询、随机和根据响应时间加权

### 引入依赖

```xml
<!--Ribbon的依赖-->
  <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
 </dependency>
```


### 注入RestTemplate

> 官方文档：[https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html](https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html)<br />@LoadBalanced注解给RestTemplate开启负载均衡的能力。


```java
@Configuration
public class ApplicationContextConfig{
    
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
```


### 控制层编写

使用RestTemplate进行远程调用

**getForObject: 直接进行远程调用** 

**getForEntity：远程调用后返回的相关的参数** 

```java
  public static final String PAYMENT_URL = "http://consul-provider-payment";

    @Resource
    private RestTemplate restTemplate;
  
  @GetMapping("/consumer/payment/get/{id}")
    public CommonResult<Payment> getPayment(@PathVariable("id") Long id){
        return restTemplate.getForObject(PAYMENT_URL+"/payment/get/"+id,CommonResult.class);
    }

    @GetMapping("/consumer/payment/getForEntity/{id}")
    public CommonResult<Payment> getPayment2(@PathVariable("id") Long id){
        ResponseEntity<CommonResult> entity = restTemplate.getForEntity(PAYMENT_URL+"/payment/get/"+id,CommonResult.class);

        if(entity.getStatusCode().is2xxSuccessful()){
            return entity.getBody();
        }else{
            return new CommonResult<>(444,"操作失败");
        }
    }
```


## Ribbon常用负载均衡算法:

**IRule接口,Riboon使用该接口,根据特定算法从所有服务中,选择一个服务,** 

**Rule接口有7个实现类,每个实现类代表一个负载均衡算法** 

|类|说明|
|---|---|
|com.netflix.loadbalancer.RoundRobinRule|轮询|
|com.netflix.loadbalancer.RandomRule|随机|
|com.netflix.loadbalancer.RetryRule|先按照RoundRobinRule的策略获取服务，如果获取服务失败则在指定时间内会进行重试，获取可用的服务|
|WeightedResponseTimeRule|对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择|
|BestAvailableRule|会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务|
|AvailabilityFilteringRule|先过滤掉故障实例，再选择并发较小的实例|
|ZoneAvoidanceRule|默认规则,复合判断server所在区域的性能和server的可用性选择服务器|



## 替换调默认的轮询算法

> 官方文档明确给出了警告:<br />这个自定义配置类不能放在@ComponentScan所扫描的当前包下以及子包下，<br />否则我们自定义的这个配置类就会被所有的Ribbon客户端所共享，达不到特殊化定制的目的了。


Ribbon的自定义配置类不能放在  主的包springcloud包下，要在其他包包下再新建一个myrule包。

例如：

```纯文本
主包为 com.springcould.xxx.Application00
替换包为 xx  区别与其他包
```


### 修改默认算法

```纯文本
@Configuration
public class MyselfRule {
  @Bean
  public IRule myRule(){
      return new RandomRule();
  }
}
```


在主启动类上添加

> name为指定的服务名（服务名必须与注册中心显示的服务名大小写一致）<br />configuration为指定服务使用自定义配置（自定义负载均衡机制）


```java
@RibbonClient(name = "CLOUD-PAYMENT-SERVICE", configuration = MySelfRule.class)
```

