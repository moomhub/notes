# Docker 安装Nacos

# 一、拉取镜像

docker 查询最新Nacos 版本<br />[https://hub.docker.com/r/nacos/nacos-server/tags](https://hub.docker.com/r/nacos/nacos-server/tags)

---

```powershell
docker pull nacos/nacos-server:1.4.0
docker images
```


# 二、创建本地映射目录和文件

## 1、创建目录

```纯文本
mkdir -p /opt/docker/nacos/logs/   # 新建logs目录
mkdir -p /opt/docker/nacos/init.d/  
vim /mydata/nacos/init.d/custom.properties # 修改配置文件

```


## 2、修改custom.properties文件

> 要配置mysql，查看MySQL账号和地址


```纯文本
erver.contextPath=/nacos
server.servlet.contextPath=/nacos
server.port=8848
spring.datasource.platform=mysql
db.num=1
# 这里要对应ip，以及对应的数据库
db.url.0=jdbc:mysql://172.18.0.10:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
db.user=nacos
db.password=nacos
nacos.cmdb.dumpTaskInterval=3600
nacos.cmdb.eventTaskInterval=10
nacos.cmdb.labelTaskInterval=300
nacos.cmdb.loadDataAtStart=false
management.metrics.export.elastic.enabled=false
management.metrics.export.influx.enabled=false
server.tomcat.accesslog.enabled=true
server.tomcat.accesslog.pattern=%h %l %u %t "%r" %s %b %D %{User-Agent}i
nacos.security.ignore.urls=/,/**/*.css,/**/*.js,/**/*.html,/**/*.map,/**/*.svg,/**/*.png,/**/*.ico,/console-fe/public/**,/v1/auth/login,/v1/console/health/**,/v1/cs/**,/v1/ns/**,/v1/cmdb/**,/actuator/**,/v1/console/server/**
nacos.naming.distro.taskDispatchThreadCount=1
nacos.naming.distro.taskDispatchPeriod=200
nacos.naming.distro.batchSyncKeyCount=1000
nacos.naming.distro.initDataRatio=0.9
nacos.naming.distro.syncRetryDelay=5000
nacos.naming.data.warmup=true
nacos.naming.expireInstance=true
```


# 三、启动docker容器

前提条件做好后，就可以下运行命令

```纯文本
docker  run --name nacos -p 8848:8848   \
--privileged=true \
--network mynetwork --ip 172.18.0.20 \
--restart=always \
-e JVM_XMS=64m \
-e JVM_XMX=64m \
-e JVM_XMN=32m \
-e JVM_MS=64m \
-e JVM_MMS=32m \
-e MODE=standalone \
-e PREFER_HOST_MODE=hostname \
-v /opt/docker/nacos/logs:/home/nacos/logs \
-v /opt/docker/nacos/init.d/custom.properties:/home/nacos/init.d/custom.properties \
-d nacos/nacos-server:latest
```


```PowerShell
docker  run --name nacos -p 8848:8848   \
--privileged=true \
--network mynetwork --ip 172.18.0.20 \
--restart=always \
-e JVM_XMS=64m \
-e JVM_XMX=64m \
-e JVM_XMN=32m \
-e JVM_MS=64m \
-e JVM_MMS=32m \
-e MODE=standalone \
-e PREFER_HOST_MODE=hostname \
-v /opt/docker/nacos/logs:/home/nacos/logs \
-d nacos/nacos-server:latest
```



然后就可以查看nacos是否启动，就可以进行访问，ip:8848/nacos，账号密码一般都是默认，nacos/nacos，这个要根据对应的数据库。另外，若没有sql命令，可参考一下官方给出的数据库样例[nacos-db.sql](https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql)

GRANT ALL PRIVILEGES ON *.*  TO 'nacos'@'%' IDENTIFIED BY 'nacos' WITH GRANT OPTION;

