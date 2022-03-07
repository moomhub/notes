# Spring Boot 使用Log4j2 日志框架

# Spring boot 接入Log4j2

## POM依赖

springboot默认是用logback的日志框架的，所以需要排除logback，不然会出现jar依赖冲突的报错。

```xml
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-web</artifactId>  
    <exclusions><!-- 去掉springboot默认配置 -->  
        <exclusion>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-starter-logging</artifactId>  
        </exclusion>  
    </exclusions>  
</dependency> 

<dependency> <!-- 引入log4j2依赖 -->  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-log4j2</artifactId>  
</dependency>
```


## Application.yml 添加配置

> xxx为报名，可以指定包名打印的内容


```yaml
logging:
  config: classpath:log4j2.xml
  level: 
    xxx: debug
```


## 新增Log4j2.xml 日志配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--
    8个优先级从高到低依次为：OFF>FATAL>ERROR>WARN>INFO>DEBUG>TRACE> ALL。
    如果设置优先级为WARN，那么OFF、FATAL、ERROR、WARN 4个级别的log能正常输出
    设置为OFF 表示不记录log4j2本身的日志，
 -->
<!-- status : 这个用于设置log4j2自身内部的信息输出,可以不设置,当设置成trace时,会看到log4j2内部各种详细输出  -->
<!-- monitorInterval="60"表示每60秒配置文件会动态加载一次。在程序运行过程中，如果修改配置文件，程序会随之改变。 -->
<configuration status="INFO" monitorInterval="30">
    <!-- 通用配置自己设置属性，后面通过${}来访问 -->
    <properties>
        <property name="SERVER_NAME">log</property>
        <property name="SERVER_VERSION">0.0.1</property>
        <!--日志文件的编码-->
        <property name="LOG_CHARSET">UTF-8</property>
        <!--  日志文件路径${web:rootDir}/logs-->
        <property name="LOG_HOME">logs</property>
        <!--日志格式-->
        <property name="LOG_FORMAT">[%d{yyyy-MM-dd HH:mm:ss.SSS}] %p %t %c[%L] - %m %n</property>
        <property name="WOED">%xwEx</property>
        <property name="FILE_LOG_FORMAT">[%d{yyyy-MM-dd HH:mm:ss.SSS}] %5p ${sys:PID} ---[%t] %class{36}#%M(%L) :
            %m%n%throwable
        </property>
        <property name="LOG_FORMAT_CONSOLE">%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %highlight{%-4level} [%t] %clr{${sys:PID}}{magenta} %highlight{%c{1.}.%M(%L)} : %msg %n %throwable
        </property>
        <!--备份目录- 根据年月建立文件夹 -->
        <property name="BACKUP_HOME">${LOG_HOME}/backup</property>
        <!--备份频率-->
        <property name="BACK_HZ">%d{yyyy-MM-dd-HH-mm}</property>
    </properties>


    <appenders>
        <!--控制台日志-->
        <console name="console" target="SYSTEM_OUT">
            <!--输出日志的格式-->
            <PatternLayout pattern="${LOG_FORMAT_CONSOLE}" disableAnsi="false" noConsoleNoAnsi="false"/>
        </console>

        <!--info级别日志输入到文件-->
        <RollingFile name="infoLog" fileName="${LOG_HOME}/${SERVER_NAME}-info.log"
                     filePattern="${BACKUP_HOME}/info/${SERVER_NAME}-info-${BACK_HZ}-%i.log.gz">
            <PatternLayout pattern="${LOG_FORMAT}"/>
            <Policies>
                <!-- 基于时间的触发策略。该策略主要是完成周期性的log文件封存工作。有两个参数：
                interval，integer型，指定两次封存动作之间的时间间隔。单位:以日志的命名精度来确定单位，
                    比如yyyy-MM-dd-HH 单位为小时，yyyy-MM-dd-HH-mm 单位为分钟
                modulate，boolean型，说明是否对封存时间进行调制。若modulate=true，
                    则封存时间将以0点为边界进行偏移计算。比如，modulate=true，interval=4hours，
                    那么假设上次封存日志的时间为03:00，则下次封存日志的时间为04:00，
                    之后的封存时间依次为08:00，12:00，16:00-->
                <TimeBasedTriggeringPolicy modulate="true" interval="1"/>
                <SizeBasedTriggeringPolicy size="50 MB"/>
            </Policies>
            <!-- 默认的文件大小处理策略，max表示filePattern配置的%i的最大值，即表示当天文件归档的最大数量 -->
            <DefaultRolloverStrategy max="10">
                <!-- 删除处理策略，在配置的路径中搜索，maxDepth表示往下搜索的最大深度 -->
                <Delete basePath="${BACKUP_HOME}/info/" maxDepth="2">
                    <!-- 文件名搜索匹配，支持正则 -->
                    <IfFileName glob="${SERVER_NAME}-info*.log.gz"/>
                    <!-- 最新修改时间超过7d则会被删除 -->
                    <IfLastModified age="7d"/>
                </Delete>
            </DefaultRolloverStrategy>
            <!-- 只保存info日志 -->
            <Filters>
                <ThresholdFilter level="WARN" onMatch="DENY" onMisMatch="NEUTRAL"/>
                <ThresholdFilter level="INFO" onMatch="ACCEPT" onMisMatch="DENY"/>
            </Filters>
        </RollingFile>

        <!--warn级别日志输入到文件-->
        <RollingFile name="warnLog" fileName="${LOG_HOME}/${SERVER_NAME}-warn.log"
                     filePattern="${BACKUP_HOME}/warn/${SERVER_NAME}-warn-${BACK_HZ}-%i.log.gz">
            <PatternLayout pattern="${LOG_FORMAT}"/>
            <Policies>
                <TimeBasedTriggeringPolicy modulate="true" interval="4"/>
                <SizeBasedTriggeringPolicy size="50 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="15">
                <Delete basePath="${BACKUP_HOME}/warn/" maxDepth="1">
                    <IfFileName glob="${SERVER_NAME}-warn*.log.gz"/>
                    <IfLastModified age="7d"/>
                </Delete>
            </DefaultRolloverStrategy>
            <!-- 只保存warn日志 -->
            <Filters>
                <ThresholdFilter level="ERROR" onMatch="DENY" onMisMatch="NEUTRAL"/>
                <ThresholdFilter level="WARN" onMatch="ACCEPT" onMisMatch="DENY"/>
            </Filters>
        </RollingFile>

        <!--error级别日志输入到文件-->
        <RollingFile name="errorLog" fileName="${LOG_HOME}/${SERVER_NAME}-error.log"
                     filePattern="${BACKUP_HOME}/error/${SERVER_NAME}-error-${BACK_HZ}-%i.log.gz">
            <PatternLayout pattern="${LOG_FORMAT}"/>
            <Policies>
                <TimeBasedTriggeringPolicy modulate="true" interval="4"/>
                <SizeBasedTriggeringPolicy size="50 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="15">
                <Delete basePath="${BACKUP_HOME}/error/" maxDepth="1">
                    <IfFileName glob="${SERVER_NAME}-error*.log.gz"/>
                    <IfLastModified age="7d"/>
                </Delete>
            </DefaultRolloverStrategy>
            <!-- 只保存error日志 -->
            <ThresholdFilter level="ERROR"/>
        </RollingFile>

        <Socket name="Logstash" host="127.0.0.1" port="4560" protocol="TCP"> 
            <PatternLayout pattern="${LOG_FORMAT_CONSOLE}"/>
        </Socket>
    </appenders>

    <loggers>

        <!--根日志配置-->
        <root level="info">
            <appender-ref ref="Logstash"/>
            <appender-ref ref="console"/>
            <appender-ref ref="infoLog"/>
            <appender-ref ref="warnLog"/>
            <appender-ref ref="errorLog"/>
        </root>
        <!--若是additivity设为false，则 子Logger 只会在自己的appender里输出，而不会在 父Logger 的appender里输出。-->
        <Logger name="org.example.logging" level="info">
            <AppenderRef ref="Console"/>
        </Logger>
        <logger name="org.example.*" level="debug"></logger>
        <logger name="com.alibaba.nacos.client.config.impl" level="warn"></logger>
        <!--第三方日志配置-->
        <!--<logger name="org.springframework" level="warn"/>
        <logger name="org.springframework.boot.web" level="info"/>
        <logger name="org.quartz" level="warn"/>
        <logger name="org.mybatis" level="warn"/>-->
    </loggers>
</configuration>
```


# Log4j 配置说明

## PatternLayout

```纯文本
%d{yyyy-MM-dd HH:mm:ss, SSS} : 日志生产时间,输出到毫秒的时间
%-5level : 输出日志级别，-5表示左对齐并且固定输出5个字符，如果不足在右边补0
%c : logger的名称(%logger)
%t : 输出当前线程名称
%p : 日志输出格式
%m : 日志内容，即 logger.info("message")
%n : 换行符
%C : Java类名(%F)
%L : 行号
%M : 方法名
%l : 输出语句所在的行数, 包括类名、方法名、文件名、行数
hostName : 本地机器名
hostAddress : 本地ip地址
```


# Log4j2配置详解

## Configuration(根节点 )

1. status : 这个用于设置log4j2自身内部的信息输出,可以不设置,当设置成trace时,会看到log4j2内部各种详细输出

2. monitorInterval="60"表示每60秒配置文件会动态加载一次。在程序运行过程中，如果修改配置文件，程序会随之改变。单位是s,最小是5s.

## Appenders(子节点 )

常见的有三种子节点:Console、RollingFile、File

### Console

Console节点用来定义输出到控制台的Appender.

属性

`name`:指定Appender的名字.<br />`target`:SYSTEM_OUT 或 SYSTEM_ERR,一般只设置默认:SYSTEM_OUT.

子属性

PatternLayout:输出格式，不设置默认为:%m%n.

### RollingFile

用来定义超过指定条件自动删除旧的创建新的Appender.

`name`:指定Appender的名字.<br />`fileName`:指定输出日志的目的文件带全路径的文件名.

`filePattern` : 指定当发生Rolling时，文件的转移和重命名规则.

PatternLayout:输出格式，不设置默认为:%m%n.

### Policies

指定滚动日志的策略，就是什么时候进行新建日志文件输出日志.

#### Policies

**TimeBasedTriggeringPolicy** ：基于时间的滚动策略，modulate 参数来开启，interval属性用来指定多久滚动一次，默认是1 hour。

**SizeBasedTriggeringPolicy** ：基于指定文件大小的滚动策略，size属性用来定义每个日志文件的大小. KB、MB、G

**DefaultRolloverStrategy** ：用来指定同一个文件夹下最多有几个日志文件时开始删除最旧的，创建新的(通过max属性)。

**Filters**  日志过滤

### File

File节点用来定义输出到指定位置的文件的Appender.

name:指定Appender的名字.<br />fileName:指定输出日志的目的文件带全路径的文件名.<br />PatternLayout:输出格式，不设置默认为:%m%n.

### 子节点 Loggers

Loggers节点，常见的有两种:Root和Logger.<br />Root节点用来指定项目的根日志，如果没有单独指定Logger，那么就会默认使用该Root日志输出

level:日志输出级别，共有8个级别，按照从低到高为：All < Trace < Debug < Info < Warn < Error < AppenderRef：Root的子节点，用来指定该日志输出到哪个Appender.<br />Logger节点用来单独指定日志的形式，比如要为指定包下的class指定不同的日志级别等。<br />level:日志输出级别，共有8个级别，按照从低到高为：All < Trace < Debug < Info < Warn < Error < Fatal < OFF.<br />name:用来指定该Logger所适用的类或者类所在的包全路径,继承自Root节点.<br />AppenderRef：Logger的子节点，用来指定该日志输出到哪个Appender,如果没有指定，就会默认继承自Root.如果指定了，那么会在指定的这个Appender和Root的Appender中都会输出，此时我们可以设置Logger的additivity="false"只在自定义的Appender中进行输出。

