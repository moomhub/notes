# MyCat 学习

## MyCat 安装和配置

> Mycat 集群解决方案

![image-20200924104156260](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/QtrzJfdehqGElxb.png)

### 1、MyCat 安装（Linux）

#### 1.1、Java 环境安装

Linux 软件下载地址：链接: http://caiyun.feixin.10086.cn/dl/105CpmHq3NuN8 提取码:B7JT

1. 创建 JAVA 目录

   在`/usr/local`目录下创建`java`目录，

   ```shell
   mkdir /usr/local/java
   cd /usr/local/java
   ```

2. 把下载的文件放在/usr/local/java/目录下，然后解压。

   ```shell
   tar -zxvf jdk-8u151-linux-x64.tar.gz
   ```

#### 1.2、MyCat 安装

创建 JAVA 目录

上传文件到`/usr/local`

```shell
# 解压文件
tar -zxvf 安装包名称
# 新增用户
adduser mycat
# 修改文件夹的所属用户
chown mycat:mycat -R mycat
# 切换用户
su - mycat
# 查看文件夹的所属用户
ls -lh
```

#### 1.3、MyCat 和 java 环境配置

修改 **vi /etc/profile**

在 profile 文件中添加如下内容并保存：

```sh
# JAVA_HOME
set java environment
JAVA_HOME=/usr/local/java/jdk1.8
JRE_HOME=/usr/local/java/jdk1.8/jre
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
export JAVA_HOME JRE_HOME CLASS_PATH PATH
#Mycat_HOME
MYCAT_HOME=/usr/local/mycat
export MYCAT_HOME
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin:$MYCAT_HOME/bin

# By default, we want umask to get set. This sets it for login shell
```

注意：其中 JAVA_HOME， JRE_HOME 和 MYCAT_HOME 请根据自己的实际安装路径及 JDK 版本配置。

```shell
# 让修改生效
source /etc/profile
# 验证是否安装
java -version
```

### 2、MyCat 安装（Docker）

#### 1、编写 Dockerfile 构建 Mycat 镜像

下载 Mycat 安装包和拉取 openjdk 8 的环境然后编写下面的内容

```sh
docker pull openjdk:8
```

```dockerfile
FROM openjdk:8
ADD Mycat-1.6.7.4.tar.gz /usr/local
VOLUME /usr/local/mycat/conf
ENV MYCAT_HOME=/usr/local/mycat
EXPOSE 8066 9066
CMD ["/usr/local/mycat/bin/mycat", "console","&"]
```

然后在 Linux 命令行中输入

> 后面有一个点不要忘记了

```sh
docker build -t mycat-1.6.7.4 .
```

#### 2、运行 docker 容器

把 Mycat 包 conf 文件目录下载复制到本地将要映射的文件，不然会启动失败

```sh
docker run -d --name mycat1 \
-p 8200:8066 \
-p 8201:9066 \
-v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf \
--network mynetwork --ip 172.18.0.21 \
mycat-1.6.7.4:latest

docker run -d --name mycat2 \
-p 8202:8066 \
-p 8203:9066 \
-v /opt/docker/mycats/mycat2/conf:/usr/local/mycat/conf \
--network mynetwork --ip 172.18.0.22 \
mycat-1.6.7.4:latest
```

然后修改配置完成对 PXC 的配置

### 3、可能会遇见的问题的

mycat 运行失败 可能是内存不足的原因停掉某些不必要的 docker 服务

修改**Server.xml**文件

## Mycat 初始配置

修改 conf/wrapper.conf 文件

```nginx
vi conf/wrapper.conf

# Java Application
wrapper.java.command-/usr/local/java/idk1.8/bin/iava # 设置为Java 路径下的地址
wrapper.working.dir=..

# .....
# 设置运行内存 默认的可能会导致内存不足而无法启动
wrapper.java.additional.10=-Xmx256M
wrapper.java.additional.11=-Xms256M
```

### Mycat 设置为开机启动

制作 /etc/init.d/mycat

### 设置 Mycat 软路由

```shell
 ln -s /usr/local/mycat/bin/mycat /etc/init.d/mycat
```

成功后就可以使用命令参考：**service mycat start | stop | restart | console**

service mycat start 启动查看效果，结果能正常启动了

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/20191116121127936.png)

### 设置开机自启

chkconfig --add mycat 加入开机服务

```shell
chkconfig --add mycat
```

重启查看效果

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/20191116121143883.png)

### 脚本开机启动

1. 修改脚本文件 rc.local：vim /etc/rc.d/rc.local

这个脚本是使用者自定的开机启动程序，可以在里面添加想在系统启动之后执行的脚本或者脚本执行命令

2. 添加如下内容：

   ```sh
   export JAVA_HOME=/usr/java/jdk1.7.0_80              //java路径根据自己实际情况填写
   /usr/local/mycat/bin/mycat start
   ```

3. esc 退出编辑，:wq 保存修改

4. 将 rc.local 修改为可执行

   ```sh
   chmod 777 /etc/rc.d/rc.local
   ```

## Mycat 连接 SQL 8(默认的是 5)

修改 Mycat 中的连接数据库的 jar 包

jar 包下载地址 https://mvnrepository.com/artifact/mysql/mysql-connector-java

把 mysql-connector-java-5.1.35.jar 替换成 mysql 8 的安装包

同时 **schema.xml** 中连接方式要变成如下配置

```xml
<schema name="USERDB" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn1"></schema>
<dataNode name="dn1" dataHost="db1" database="user_db" />
<dataHost name="db1" maxCon="1000" minCon="10" balance="1"
			writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1"  slaveThreshold="100">
	<heartbeat>select user()</heartbeat>
	<!-- can have multi write hosts -->
	<writeHost host="172.17.0.9" url="jdbc:mysql://172.17.0.9:3306?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF8&amp;serverTimezone=UTC&amp;allowPublicKeyRetrieval=true" user="root" password="123456">
		<readHost host="172.17.0.10" url="jdbc:mysql://172.17.0.10:3306?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF8&amp;serverTimezone=UTC&amp;allowPublicKeyRetrieval=true" user="root" password="123456"/>
	</writeHost>
		<!-- <writeHost host="hostM2" url="localhost:3316" user="root" password="123456"/> -->
</dataHost>
```

## MyCat 配置文件解析

MYCAT 的关键配置文件

1. schema.xml 用于配置逻辑库表及数据节点
2. rule.xml 用于配置表的分片规则
3. server.xml 用于配置服务器权限

### schema.xml

定义逻辑库表

```xml
<schema> <table> </table> </schema>
```

定义数据节点

```xml
<dataNode> </dataNode>
```

定义数据节点的物理数据源

```xml
<dataHost> </dataHost>
```

### rule.xml

定义表使用的分片规则

```xml
<tableRule name= ""></tableRule>
```

定义分片算法

```xml
<function name=""></function>
```

### server.xml

用于定义系统配置

```xml
<system> <property name= ""></property> </system>
```

用于定义连接 MyCAT 的用户

```xml
<user></user>
```

Mycat Server 使用

## Mycat 数据切分

数据切分算法

| 切分算法     | 适用场合                     | 备注         |
| ------------ | ---------------------------- | ------------ |
| 主键求模切分 | 数据增长速度慢，难于增加分片 | 有明确主键值 |
| 枚举值切分   | 归类存储数据，适合大多数业务 |              |
| 主键范围切分 | 数据快速增长，容易增加分片   | 有明确主键值 |
| 日期切分     | 数据快速增长，容易增加分片   |              |

主键求模切分
求模切分适合用在初始数据很大，但是数据增长不快的场景
行政企业 地图产品 数据数据

主键求模切分 （可以根据主键来进行不同数据来进行分片保持）
求模切分的弊病在于扩展新分片难度大，迁移的数据太多

PXC1 121 122 123 （分片一） PXC2 151 159 215 （分片二）

![image-20200924102323872](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/uKvUxtDn7mWyC6M.png)

```xml
<schema name="test" checksQLschema="false" sqlMaxLimit="100">
	<table name="t_user" dataNode="dn1 ,dn2" rule="mod-long"/>
		<table name="t_customer" dataNode="dn1 ,dn2" rule="sharding-customer">
			<childTable name="t_orders" primaryKey="ID" joinKey="customer_id" parentKey="id">
			</childTabie>
		</table>
</ schema>
```

## Mycat 默认文件内容

### Server.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mycat:server SYSTEM "server.dtd">
<mycat:server xmlns:mycat="http://io.mycat/">
	<system>
     <!-- 0为需要密码登陆、1为不需要密码登陆 ,默认为0，设置为1则需要指定默认账户-->
	<property name="nonePasswordLogin">0</property>
     <!-- 0遇上没有实现的报文(Unknown command:),就会报错、1为忽略该报文，返回ok报文。
	在某些mysql客户端存在客户端已经登录的时候还会继续发送登录报文,mycat会报错,该设置可以绕过这个错误-->
	<property name="ignoreUnknownCommand">0</property>
	<property name="useHandshakeV10">1</property>
    <property name="removeGraveAccent">1</property>
	<property name="useSqlStat">0</property>  <!-- 1为开启实时统计、0为关闭 -->
	<property name="useGlobleTableCheck">0</property>  <!-- 1为开启全加班一致性检测、0为关闭 -->
	<property name="sqlExecuteTimeout">300</property>  <!-- SQL 执行超时 单位:秒-->
	<property name="sequenceHandlerType">1</property>
	<!--<property name="sequnceHandlerPattern">(?:(\s*next\s+value\s+for\s*MYCATSEQ_(\w+))(,|\)|\s)*)+</property>
	INSERT INTO `travelrecord` (`id`,user_id) VALUES ('next value for MYCATSEQ_GLOBAL',"xxx");
	-->
	<!--必须带有MYCATSEQ_或者 mycatseq_进入序列匹配流程 注意MYCATSEQ_有空格的情况-->
	<property name="sequnceHandlerPattern">(?:(\s*next\s+value\s+for\s*MYCATSEQ_(\w+))(,|\)|\s)*)+</property>
	<property name="subqueryRelationshipCheck">false</property> <!-- 子查询中存在关联查询的情况下,检查关联字段中是否有分片字段 .默认 false -->
	<property name="sequenceHanlderClass">io.mycat.route.sequence.handler.HttpIncrSequenceHandler</property>
      <!--  <property name="useCompression">1</property>--> <!--1为开启mysql压缩协议-->
        <!--  <property name="fakeMySQLVersion">5.6.20</property>--> <!--设置模拟的MySQL版本号-->
	<!-- <property name="processorBufferChunk">40960</property> -->
	<!--
	<property name="processors">1</property> //mycat进程数量
	<property name="processorExecutor">32</property>
	 -->
        <!--默认为type 0: DirectByteBufferPool | type 1 ByteBufferArena | type 2 NettyBufferPool -->
		<property name="processorBufferPoolType">0</property>
		<!--默认是65535 64K 用于sql解析时最大文本长度 -->
		<!--<property name="maxStringLiteralLength">65535</property>-->
		<!--<property name="sequenceHandlerType">0</property>-->
		<!--<property name="backSocketNoDelay">1</property>-->
		<!--<property name="frontSocketNoDelay">1</property>-->
		<!--<property name="processorExecutor">16</property>-->
		<!--
			<property name="serverPort">8066</property>
			<property name="managerPort">9066</property>
			<property name="idleTimeout">300000</property> // 连接mysql超时(毫秒)
			<property name="bindIp">0.0.0.0</property> //监听IP
			<property name="dataNodeIdleCheckPeriod">300000</property>//5 * 60 * 1000L; //连接空闲检查
			<property name="frontWriteQueueSize">4096</property> // 前端写队列的大小
			<property name="processors">32</property> -->
		<!--分布式事务开关，0为不过滤分布式事务，1为过滤分布式事务（如果分布式事务内只涉及全局表，则不过滤），2为不过滤分布式事务,但是记录分布式事务日志-->
		<property name="handleDistributedTransactions">0</property>
		<!--off heap for merge/order/group/limit      1开启   0关闭-->
		<property name="useOffHeapForMerge">0</property>
		<!--单位为m-->
        <property name="memoryPageSize">64k</property>
		<!--单位为k-->
		<property name="spillsFileBufferSize">1k</property>
		<property name="useStreamOutput">0</property>
		<!--单位为m-->
		<property name="systemReserveMemorySize">384m</property>
		<!--是否采用zookeeper协调切换  -->
		<property name="useZKSwitch">false</property>

		<!-- XA Recovery Log日志路径 -->
		<!--<property name="XARecoveryLogBaseDir">./</property>-->

		<!-- XA Recovery Log日志名称 -->
		<!--<property name="XARecoveryLogBaseName">tmlog</property>-->
		<!--如果为 true的话 严格遵守隔离级别,不会在仅仅只有select语句的时候在事务中切换连接-->
		<property name="strictTxIsolation">false</property>
		<!--如果为0的话,涉及多个DataNode的catlet任务不会跨线程执行-->
		<property name="parallExecute">0</property>
	</system>

	<!-- 全局SQL防火墙设置 -->
	<!--白名单可以使用通配符%或着*-->
	<!--例如<host host="127.0.0.*" user="root"/>-->
	<!--例如<host host="127.0.*" user="root"/>-->
	<!--例如<host host="127.*" user="root"/>-->
	<!--例如<host host="1*7.*" user="root"/>-->
	<!--这些配置情况下对于127.0.0.1都能以root账户登录-->
	<!--
	<firewall>
	   <whitehost>
	      <host host="1*7.0.0.*" user="root"/>
	   </whitehost>
       <blacklist check="false">
       </blacklist>
	</firewall>
	-->

	<user name="root" defaultAccount="true">
		<property name="password">123456</property>
		<property name="schemas">TESTDB</property>
		<property name="defaultSchema">TESTDB</property>
		<!--No MyCAT Database selected 错误前会尝试使用该schema作为schema，不设置则为null,报错 -->

		<!-- 表级 DML 权限设置 -->
		<!--
		<privileges check="false">
			<schema name="TESTDB" dml="0110" >
				<table name="tb01" dml="0000"></table>
				<table name="tb02" dml="1111"></table>
			</schema>
		</privileges>
		 -->
	</user>

	<user name="user">
		<property name="password">user</property>
		<property name="schemas">TESTDB</property>
		<property name="readOnly">true</property>
		<property name="defaultSchema">TESTDB</property>
	</user>

</mycat:server>

```
