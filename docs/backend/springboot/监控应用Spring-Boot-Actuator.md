# Spring Boot 监控应用 Spring-Boot-Actuator

Spring Boot提供了良好的服务监控模块，只需要通过简单的配置便可以完成服务监控和管理。但是服务监控这块内容往往是最容易被忽略的一块内容，今天我们一起来学习一下使用`spring-boot-actuator`进行服务监控。`spring-boot-actuator`提供了监控端点，这些端点直接返回`JSON字符串`，通过这些端点可以查询服务运行状况，为了防止端点直接暴露，一般情况下会使用安全框架，如Spring Security来管理这些端点的安全性。

## 一、 常用的端点

> 默认情况下，除了`shutdown`，其他端点都是启动状态。


|端点地址|描述|默认启用|
|---|---|---|
|auditevents|获取当前应用暴露的审计事件信息|是|
|beans|获取应用中所有的bean的完整关系列表|是|
|caches|获取公开可以用的缓存|是|
|conditions|获取自动配置条件信息，记录哪些自动配置条件通过和没通过的原因|是|
|configprops|获取所有配置属性，包括默认配置，显示一个所有 @ConfigurationProperties 的整理列版本|是|
|env|获取所有环境变量|是|
|flyway|获取已应用的所有Flyway数据库迁移信息，需要一个或多个 Flyway Bean|是|
|health|获取应用程序健康指标（运行状况信息）|是|
|httptrace|获取HTTP跟踪信息（默认情况下，最近100个HTTP请求-响应交换）。需要 HttpTraceRepository Bean|是|
|info|获取应用程序信息|是|
|integrationgraph|显示 Spring Integration 图。需要依赖 spring-integration-core|是|
|loggers|显示和修改应用程序中日志的配置|是|
|liquibase|获取应用的所有Liquibase数据库迁移。需要一个或多个 Liquibase Bean|是|
|metrics|获取系统度量指标信息|是|
|mappings|显示所有@RequestMapping路径的整理列表|是|
|scheduledtasks|显示应用程序中的计划任务|是|
|sessions|允许从Spring Session支持的会话存储中检索和删除用户会话。需要使用Spring Session的基于Servlet的Web应用程序|是|
|shutdown|关闭应用|否|
|threaddump|获取系统线程转储信息|是|



### 如何使用

pom.xml 文件设置

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```


访问使用

```html
/actuator/端点地址
```


例如想要访问health端点，则访问  [http://ip:port/actuator/health；](http://ip:port/actuator/health；)

### 端点开启/关闭

```yaml
management:
  endpoint:
   # 开启shutdown端点
    shutdown:
      enabled: true
```


启用/禁用所有端点

```yaml
management:
  endpoints:
    enabled-by-default: true
```


### 端点暴露

默认情况下，只有`health`和`info`暴露了http端口，这些端点支持通过`http`和`JMX`访问，如果需要访问具体的端点则需要配置暴露。

暴露`http`端点

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info
```


暴露`JMX`端点

```yaml
management:
  endpoints:
    jmx:
      exposure:
        include: health,info
```


## 二 常用端点解析

### health

`health`包含的健康检查项有`DataSourceHealthIndicator`，`DiskSpaceHealthIndicator`，`MongoHealthIndicator`，`ReidsHealthIndicator`，`CassandraHealthIndicator`。

关闭特定的检查项配置如下，关闭redis检查项：

```yaml
management:
  health:
    redis:
      enabled: false
```


默认情况下health只是简单的展示了`UP`和`DOWN`两种状态，如果想要看详细信息，则需要配置

```yaml
management:
  endpoint:
    health:
      show-details: always
```


### metrics

`metrics`可以使用带PathVariable参数，参数为具体的度量值，如查看cpu大小，[http://localhost:8080/actuator/metrics/system.cpu.count；](http://localhost:8080/actuator/metrics/system.cpu.count；)

### info

`info`使用的时候需要在配置文件中自定义信息，自定义信息以`info`开头。

例如在配置文件中增加如下内容：

```yaml
info:
  person:
    name: Java
    age: 18
```


访问`info`端点显示的是去掉info的一个JSON串：

```yaml
person:
  name: Java
  age: 18
```


`Spring-Boot-acturator`使用起来很方便，但是缺点也很明显，就是没有图形化界面。使用起来也不是很友好。

