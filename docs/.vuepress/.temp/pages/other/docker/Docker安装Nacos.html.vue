<template><h1 id="docker-安装nacos" tabindex="-1"><a class="header-anchor" href="#docker-安装nacos" aria-hidden="true">#</a> Docker 安装Nacos</h1>
<h1 id="一、拉取镜像" tabindex="-1"><a class="header-anchor" href="#一、拉取镜像" aria-hidden="true">#</a> 一、拉取镜像</h1>
<p>docker 查询最新Nacos 版本<br /><a href="https://hub.docker.com/r/nacos/nacos-server/tags" target="_blank" rel="noopener noreferrer">https://hub.docker.com/r/nacos/nacos-server/tags<ExternalLinkIcon/></a></p>
<hr>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>docker pull nacos/nacos-server:1<span class="token punctuation">.</span>4<span class="token punctuation">.</span>0
docker images
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h1 id="二、创建本地映射目录和文件" tabindex="-1"><a class="header-anchor" href="#二、创建本地映射目录和文件" aria-hidden="true">#</a> 二、创建本地映射目录和文件</h1>
<h2 id="_1、创建目录" tabindex="-1"><a class="header-anchor" href="#_1、创建目录" aria-hidden="true">#</a> 1、创建目录</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir -p /opt/docker/nacos/logs/   # 新建logs目录
mkdir -p /opt/docker/nacos/init.d/  
vim /mydata/nacos/init.d/custom.properties # 修改配置文件

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_2、修改custom-properties文件" tabindex="-1"><a class="header-anchor" href="#_2、修改custom-properties文件" aria-hidden="true">#</a> 2、修改custom.properties文件</h2>
<blockquote>
<p>要配置mysql，查看MySQL账号和地址</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>erver.contextPath=/nacos
server.servlet.contextPath=/nacos
server.port=8848
spring.datasource.platform=mysql
db.num=1
# 这里要对应ip，以及对应的数据库
db.url.0=jdbc:mysql://172.18.0.10:3306/nacos?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h1 id="三、启动docker容器" tabindex="-1"><a class="header-anchor" href="#三、启动docker容器" aria-hidden="true">#</a> 三、启动docker容器</h1>
<p>前提条件做好后，就可以下运行命令</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker  run --name nacos -p 8848:8848   \
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>docker  run --name nacos -p 8848:8848   \
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>然后就可以查看nacos是否启动，就可以进行访问，ip:8848/nacos，账号密码一般都是默认，nacos/nacos，这个要根据对应的数据库。另外，若没有sql命令，可参考一下官方给出的数据库样例<a href="https://github.com/alibaba/nacos/blob/master/config/src/main/resources/META-INF/nacos-db.sql" target="_blank" rel="noopener noreferrer">nacos-db.sql<ExternalLinkIcon/></a></p>
<p>GRANT ALL PRIVILEGES ON <em>.</em>  TO 'nacos'@'%' IDENTIFIED BY 'nacos' WITH GRANT OPTION;</p>
</template>
