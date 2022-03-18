# Hystrixs（断路由）使用

## 为什么需要服务降级

### 服务雪崩

多个微服务之间调用的时候，假设微服务A调用微服务B和微服务C，微服务B和微服务C又调用其它的微服务．这就是所谓的“**扇出** ”。如果扇出的链路上某个微服务的调用响应时间过长或者不可用，对微服务A的调用就会占用越来越多的系统资源，进而引起系统崩溃，所谓的“雪崩效应”.<br />对于高流量的应用来说，单一的后端依赖可能会导致所有服务器上的所有资源都在几秒钟内饱和。比失败更糟糕的是，这些应用程序还可能导致服务之间的延迟增加，备份队列，线程和其他系统资源紧张，导致整个系统发生更多的级联故障。这些都表示需要对故障和延迟进行隔离和管理，以便单个依赖关系的失败，不能取消整个应用程序或系统。<br />所以，<br />通常当你发现一个模块下的某个实例失败后，这时候这个模块依然还会接收流量，然后这个有问题的模块还调用了其他的模块，这样就会发生级联故障，或者叫雪崩。

### Hystrix

Hystrix是一个用于处理分布式系统的**延迟和容错** 的开源库，在分布式系统里，许多依赖不可避免的会调用失败，比如超时、异常等，Hystrix能够保证在一个依赖出问题的情况下，**不会导致整体服务失败，避免级联故障，以提高分布式系统的弹性** 。<br />"断路器”本身是一种开关装置，当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝)，**向调用方返回一个符合预期的、可处理的备选响应(FallBack)，而不是长时间的等待或者抛出调用方无法处理的异常** ，这样就保证了服务调用方的线程不会被长时间、不必要地占用，从而避免了故障在分布式系统中的蔓延，乃至雪崩。

## hystrix中的重要概念:

服务降级：比如当某个服务繁忙,不能让客户端的请求一直等待,应该立刻返回给客户端一个备选方案

服务熔断：当某个服务出现问题,卡死了,不能让用户一直等待,需要关闭所有对此服务的访问 然后调用服务降级

服务限流：限流,比如秒杀场景,不能访问用户瞬间都访问服务器,限制一次只可以有多少请求

## 服务降级

### pom

pom文件引入

```xml
    <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!--hystrix-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
```


### 添加注解

> 这两个注解都是激活hystrix的功能，只需要在服务启动类加入@EnableHystrix注解即可，无须增加@EnableCircuitBreaker注解，本身@EnableHystrix注解已经涵盖了EnableCircuitBreaker的功能。


开启限流：**[@EnableHystrix ](/EnableHystrix) **（直接使用这个）

[@EnableCircuitBreaker ](/EnableCircuitBreaker) 开启断路器

### 在Feign上使用熔断器

`Feign` 是自带 **断路器**  的，不过需要在 **配置文件**  中开启 `hystrix` 的配置。

```YAML
Copyfeign:
  hystrix:
    enabled: true
```


### Service

添加远程调用Service 用于远程调用

通过设置 `fallback` 属性为实现 **降级回退**  的 **类** ，来启用 `@FeignClient` 的 **失败降级** 。

```java
@Component
@FeignClient(value = "CLOUD-PROVIDER-HYSTRIX-PAYMENT" ,fallback = PaymentFallbackService.class)
public interface PaymentHystrixService
{
    @GetMapping("/payment/hystrix/ok/{id}")
    public String paymentInfo_OK(@PathVariable("id") Integer id);

    @GetMapping("/payment/hystrix/timeout/{id}")
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id);
}
```


### Controller

使用[@HystrixCommand ](/HystrixCommand) 开启短路由功能

```java
@Slf4j
@RestController
public class OrderHystirxController{
    
    @Resource
    private PaymentHystrixService paymentHystrixService;

    @GetMapping("/consumer/payment/hystrix/ok/{id}")
    @HystrixCommand
    public String paymentInfo_OK(@PathVariable("id") Integer id){
        String result = paymentHystrixService.paymentInfo_OK(id);
        return result;
    }
}
```


## 服务降级异常处理

### 通用接口异常（推荐）

实现远程调用接口来设置异常处理。

```java
@Component
public class PaymentFallbackService implements PaymentHystrixService{
    @Override
    public String paymentInfo_OK(Integer id)
    {
        return "-----PaymentFallbackService fall back-paymentInfo_OK ,o(╥﹏╥)o";
    }

    @Override
    public String paymentInfo_TimeOut(Integer id)
    {
        return "-----PaymentFallbackService fall back-paymentInfo_TimeOut ,o(╥﹏╥)o";
    }
}
```


### 接口指定异常

在调用的controller 中具体的调用远程调用的方法中指定异常类

```java
@Slf4j
@RestController
@DefaultProperties(defaultFallback = "payment_Global_FallbackMethod")
public class OrderHystirxController{
    

    @GetMapping("/consumer/payment/hystrix/timeout/{id}")
    @HystrixCommand(fallbackMethod = "paymentTimeOutFallbackMethod",commandProperties = {
            @HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds",value="1500")
    })
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id){
        int age = 10/0;
        String result = paymentHystrixService.paymentInfo_TimeOut(id);
        return result;
    }
    // 指定错误
    public String paymentTimeOutFallbackMethod(@PathVariable("id") Integer id){
        return "我是消费者80,对方支付系统繁忙请10秒钟后再试或者自己运行出错请检查自己,o(╥﹏╥)o";
    }

}
```


### 全局异常

统一在远程调用的接口中定义异常处理

```java
@DefaultProperties(defaultFallback = "payment_Global_FallbackMethod")
public class OrderHystirxController{
    
     //使用默认的全局异常处理
     @GetMapping("/consumer/payment/hystrix/timeout/{id}")
    @HystrixCommand
    public String paymentInfo_TimeOut(@PathVariable("id") Integer id){
        int age = 10/0;
        String result = paymentHystrixService.paymentInfo_TimeOut(id);
        return result;
    }
  // ...
    public String payment_Global_FallbackMethod(){
        return "Global异常处理信息，请稍后再试，/(ㄒoㄒ)/~~";
    }   
}
```


## 服务熔断

### 描述

类比保险丝达到最大服务访问后，直接(拒绝访问)拉闸限电，然后调用服务降级的方法并返回友好提示就是保险丝<br />服务的降级->进而熔断->恢复调用链路

熔断机制是应对雪崩效应的一种微服务链路保护机制。当扇出链路的某个微服务出错不可用或者响应时间太长时，会进行服务的降级，进而熔断该节点微服务的调用，快速返回错误的响应信息。

### 服务熔断代码参考

```java
//服务熔断
@HystrixCommand(fallbackMethod = "paymentCircuitBreaker_fallback",commandProperties = {
        @HystrixProperty(name = "circuitBreaker.enabled",value = "true"),// 是否开启断路器
        @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold",value = "10"),// 请求次数
        @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds",value = "10000"), // 时间窗口期
        @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage",value = "60"),// 失败率达到多少后跳闸 百分值
})
public String paymentCircuitBreaker(@PathVariable("id") Integer id){
    if(id < 0){
        throw new RuntimeException("******id 不能负数");
    }
    String serialNumber = IdUtil.simpleUUID();
    return Thread.currentThread().getName()+"\t"+"调用成功，流水号: " + serialNumber;
}

public String paymentCircuitBreaker_fallback(@PathVariable("id") Integer id){
    return "id 不能负数，请稍后再试，/(ㄒoㄒ)/~~   id: " +id;
}
```


### 断路由

**当检测到该节点微服务调用响应正常后，恢复调用链路。** <br />在Spring Cloud框架里，熔断机制通过Hystrix实现。Hystrix会监控微服务间调用的状况，<br />当失败的调用到一定阈值，缺省是5秒内20次调用失败，就会启动熔断机制。熔断机制的注解是**@HystrixCommand。**

### 熔断工作原理

**工作流程** 

1. 请求进来,首先查询缓存,如果缓存有,直接返回如果缓存没有,--->2

2. 查看断路器是否开启,如果开启的,Hystrix直接将请求转发到降级返回,然后返回

3. 如果断路器是关闭的,判断线程池等资源是否已经满了,

4. 如果已经满了也会走降级方法

5. 如果资源没有满,判断我们使用的什么类型的Hystrix,决定调用构造方法还是run方法

6. 然后处理请求

7. 然后Hystrix将本次请求的结果信息汇报给断路器,因为断路器此时可能是开启的(因为断路器开启也是可以接收请求的)

8. 断路器收到信息,判断是否符合开启或关闭断路器的条件,

9. 如果本次请求处理失败,又会进入降级方法

10. 如果处理成功,判断处理是否超时,如果超时了,也进入降级方法

11. 最后,没有超时,则本次请求处理成功,将结果返回给controller

**断路器的打开和关闭** 

1. 并发此时是否达到我们指定的阈值

2. 错误百分比,比如我们配置了60%,那么如果并发请求中,10次有6次是失败的,就开启断路器

3. 上面的条件符合,断路器改变状态为open(开启)

4. 这个服务的断路器开启,所有请求无法访问

5. 在我们的时间窗口期,期间,尝试让一些请求通过(半开状态),如果请求还是失败,证明断路器还是开启状态,服务没有恢复

6. 如果请求成功了,证明服务已经恢复,断路器状态变为close关闭状态

**如果服务熔断了** 

再有请求调用的时候，将不会调用主逻辑，而是直接调用降级fallback.<br />通过断路器，实现了自动地发现错误并将降级逻辑切换为主逻辑，减少响<br />应延迟的效果。<br />**原来的主逻辑要如何恢复呢** ?<br />对于这一问题，hystrix也为我们实现了自动恢复功能。<br />当断路器打开，对主逻辑进行熔断之后，hystrix会启动一个休眠时间窗，在这个时间窗内，降级逻辑是临时的成为主逻辑，<br />当休眠时间窗到期，断路器将进入半开状态，释放一次请求到原来的主逻辑上，如果此次请求正常返回，那么断路器将继续闭合,断路器关闭主逻辑恢复，如果这次请求依然有问题，断路器继续进入打开状态，休眠时间窗重新计时。

## HystrixCommand配置项说明

### 默认配置

- groupKey：命令分组键，可以根据这个分组，统计他的各个指标，默认类名。

- commandKey：命令键，默认方法名。

- threadPoolKey：线程池名，如果没有设置，默认为groupKey。

- fallbackMethod：服务降级调用的方法。

- commandProperties: 服务调用和熔断配置

- threadPoolProperties：配置线程池用的。

```纯文本
 @HystrixCommand(fallbackMethod = "paymentCircuitBreaker_fallback",
         groupKey = "strGroupCommand",
         commandKey = "strCommand",
        threadPoolKey = "strThreadPoo1",
         commandProperties = {...},
         threadPoolProperties = {...},
         )
```


### commandProperties 属性

#### Execution（服务降级）

Execution：**线程隔离** 

|参数|用处|
|---|---|
|execution.isolation.strategy|该属性用来设置HystrixCommand.run()执行的**** **隔离策略** 。默认为THREAD。|
|execution.isolation.thread.timeoutInMilliseconds|该属性用来配置HystrixCommand执行的**** **超时时间** ，单位为毫秒。|
|execution.timeout.enabled|该属性用来配置HystrixCommand.run()的**** **执行是否启用超时时间** 。默认为true。|
|execution.isolation.thread.interruptOnTimeout|该属性用来配置当HystrixCommand.run()执行超时的时候是否要它中断。|
|execution.isolation.thread.interruptOnCancel|该属性用来配置当HystrixCommand.run()执行取消时是否要它中断。|
|execution.isolation.semaphore.maxConcurrentRequests|当HystrixCommand命令的隔离策略使用信号量时，该属性用来配置信号量的大小。**** **当最大并发请求达到该设置值时，后续的请求将被拒绝** |
|fallback.isolation.semaphore.maxConcurrentRequests|该属性用来设置从调用线程中允许HystrixCommand.getFallback()方法执行的最大并发请求数。当达到最大并发请求时，后续的请求将会被拒绝并抛出异常。|
|fallback.enabled|该属性用来设置服务降级策略是否启用，**** **默认是true** 。如果设置为false，当请求失败或者拒绝发生时，将不会调用HystrixCommand.getFallback()来执行服务降级逻辑。|



#### circuitBreaker （熔断器）

fallback: 断路器

|名称|用处|
|---|---|
|circuitBreaker.enabled|是否启动断路器|
|circuitBreaker.requestVolumeThreshold|用来设置在滚动时间窗中，断路器熔断的最小请求数。例如，默认该值为20的时候，如果滚动时间窗（默认10秒）内仅收到19个请求，即使这19个请求都失败了，断路器也不会打开。|
|**circuitBreaker.sleepWindowInMilliseconds** |用来设置当断路器打开之后的休眠时间窗。休眠时间窗结束之后，会将断路器设置为“半开”状态，尝试熔断的请求命令，如果依然时候就将断路器继续设置为“打开”状态，如果成功，就设置为“关闭”状态。|
|**circuitBreaker.errorThresholdPercentage** |该属性用来设置断路器打开的错误百分比条件。默认值为50，表示在滚动时间窗中，在请求值超过requestVolumeThreshold阈值的前提下，如果错误请求数百分比超过50，就把断路器设置为“打开”状态，否则就设置为“关闭”状态 （百分值）|
|circuitBreaker.forceOpen|断路器强制进入“打开”状态|
|circuitBreaker.forceClosed|断路器强制进入“关闭”状态|



#### 统计器(Metrics)

|名称|用法|
|---|---|
|metrics.rollingStats.timeInMilliseconds|该属性用来设置滚动时间窗的长度，单位为毫秒。该时间用于断路器判断健康度时需要收集信息的持续时间。断路器在收集指标信息时会根据设置的时间窗长度拆分成多个桶来累计各度量值，每个桶记录了一段时间的采集指标。例如，当为默认值10000毫秒时，断路器默认将其分成10个桶，每个桶记录1000毫秒内的指标信息。|
|metrics.rollingStats.numBuckets|用来设置滚动时间窗统计指标信息时划分“桶”的数量。默认值为10。|
|metrics.rollingPercentile.enabled|用来设置对命令执行延迟是否使用百分位数来跟踪和计算。默认为true，如果设置为false，那么所有的概要统计都将返回-1。|
|metrics.rollingPercentile.timeInMilliseconds|用来设置百分位统计的滚动窗口的持续时间，单位为毫秒。|
|metrics.rollingPercentile.numBuckets|用来设置百分位统计滚动窗口中使用桶的数量。|
|metrics.rollingPercentile.bucketSize|用来设置每个“桶”中保留的最大执行数。|
|metrics.healthSnapshot.intervalInMilliseconds|用来设置采集影响断路器状态的健康快照的间隔等待时间。|



#### requestCache

requestCache : 请求缓存

|名称|用法|
|---|---|
|requestCache.enabled|用来配置是否开启请求缓存。|
|requestLog.enabled|用来设置HystrixCommand的执行和事件是否打印到日志的HystrixRequestLog中|



### threadPoolProperties属性

线程池的配置

|名称|用法|
|---|---|
|coreSize|该参数用来没置执行命令线程池的核心线程数，该值也就是命令执行的最大并发量|
|maxQueuesize|该参数用来没置线程池的最大队列大小。当设置为-1时，线程池将使用SynchronousQueue 实现的队列，否则将使用LinkedBLockingQueue实现的队列。|
|queueSizeRejectionThreshold|该参数用来为队列没置拒绝阈值。通过该参数，即使队列没有达到最大值也能拒绝请求。|
|该参数主要是对LinkedBLockingQueue队列的补充,因为LinkedBLockingQueue||
|队列不能动态修改它的对象大小，而通过该属性就可以调整拒绝请求的队列大小了。||



## 标签备注

HystrixCommand注解有多个配置的参数，比如：

groupKey：命令分组键，可以根据这个分组，统计他的各个指标，默认类名。
commandKey：命令键，默认方法名。
threadPoolKey：线程池名，如果没有设置，默认为groupKey。
fallbackMethod：服务降级调用的方法。
threadPoolProperties：配置线程池用的。

使用注解 `@HystrixCommand` 标记调用失败时需要熔断的方法，`fallbackMethod` 属性指定 **降级方法**  的 **方法名**  为 `fallback`。

