# PXC集群安装



> PXC是基于Percona 而来的
>
> PXC集群只支持InnoDB引擎只有InnoDB引擎的数据才会被同步

**PXC集群要使用四个端口,所以防火墙要放行这些端口端口描述**

| 端口 |          描述          |
| :--: | :--------------------: |
| 3306 |     MySQL服务端口      |
| 4444 | 请求全量同步(SST)端口  |
| 4567 | 数据库节点之间通信端口 |
| 4568 | 请求增量同步(IST)端口  |



## 1、Linux 主机安装

### 1. 删除MariaDB程序包

```shell
yum -y remove mari*
```

### 2. 开放防火墙端口

```shell
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --zone=public --add-port=4444/tcp --permanent
firewall-cmd --zone=public --add-port=4567/tcp --permanent
firewall-cmd --zone=public --add-port=4568/tcp --permanent
```

### 3. 关闭SELINUX

```shell
vi /etc/selinux/config
```

把SELINUX属性值设置成disabled

```shell
reboot
```

### 4. 离线安装PXC

* 进入RPM文件目录，执行安装命令

  ```shell
  yum localinstall *.rpm
  ```

* 参考第一章内容，修改MySQL配置文件、创建账户等操作

### 5. 创建PXC集群

* 停止MySQL服务

* 修改每个PXC节点的/etc/my.cnf文件（在不同节点上，注意调整文件内容）

  ```ini
  server-id=1  #PXC集群中MySQL实例的唯一ID，不能重复，必须是数字
  wsrep_provider=/usr/lib64/galera3/libgalera_smm.so
  wsrep_cluster_name=pxc-cluster  #PXC集群的名称
  wsrep_cluster_address=gcomm://192.168.99.151,192.168.99.159,192.168.99.215
  wsrep_node_name=pxc1  #当前节点的名称
  wsrep_node_address=192.168.99.151  #当前节点的IP
  wsrep_sst_method=xtrabackup-v2  #同步方法（mysqldump、rsync、xtrabackup）
  wsrep_sst_auth= admin:Abc_123456  #同步使用的帐户
  pxc_strict_mode=ENFORCING  #同步严厉模式
  binlog_format=ROW  #基于ROW复制（安全可靠）
  default_storage_engine=InnoDB  #默认引擎
  innodb_autoinc_lock_mode=2  #主键自增长不锁表
  ```

* 主节点的管理命令（第一个启动的PXC节点）

  ```shell
  systemctl start mysql@bootstrap.service
  systemctl stop mysql@bootstrap.service
  systemctl restart mysql@bootstrap.service
  ```

* 非主节点的管理命令（非第一个启动的PXC节点）

  ```shell
  service start mysql
  service stop mysql
  service restart mysql
  ```

* 查看PXC集群状态信息

  ```mysql
  show status like 'wsrep_cluster%' ;
  ```

* **按照上述配置方法，创建两组PXC集群**

### 6. PXC节点启动与关闭

* 如果最后关闭的PXC节点是安全退出的，那么下次启动要最先启动这个节点，而且要以主节点启动
* 如果最后关闭的PXC节点不是安全退出的，那么要先修改`/var/lib/mysql/grastate.dat` 文件，把其中的`safe_to_bootstrap`属性值设置为1，再安装主节点启动

## 2、Docker 安装

### 1.拉取镜像

在docker中选择你要拉取的镜像 https://registry.hub.docker.com/r/percona/percona-xtradb-cluster

```sh
docker pull percona/percona-xtradb-cluster:5.7.30-31.43
docker pull percona/percona-xtradb-cluster:8.0.19-10.1
```

### 2.直接启动版（傻瓜操作）

名称解释

| 名称                | 解释           |
| ------------------- | -------------- |
| MYSQL_ROOT_PASSWORD | 数据库root密码 |
| CLUSTER_NAME        | 集群名称       |
| CLUSTER_JOIN        | 加入的节点     |

> 一定要先创建并开启节点1不然之后节点会报错 

直接按照顺序输入如下命令

```sh
docker run -d --name pxc1 \
-e MYSQL_ROOT_PASSWORD=123456 \
-e CLUSTER_NAME=pxc-server \
-p 3331:3306 \
--network mynetwork --ip 172.18.0.11 \
percona/percona-xtradb-cluster:5.7.30-31.43

docker run -d --name pxc2 \
-e MYSQL_ROOT_PASSWORD=123456 \
-e CLUSTER_NAME=pxc-server \
-e CLUSTER_JOIN=pxc1 \
-p 3322:3306 \
--network mynetwork --ip 172.18.0.12 \
percona/percona-xtradb-cluster:5.7.30-31.43

docker run -d --name pxc3 \
-e MYSQL_ROOT_PASSWORD=123456 \
-e CLUSTER_NAME=pxc-server \
-e CLUSTER_JOIN=pxc1 \
-p 3323:3306 \
--network mynetwork --ip 172.18.0.13 \
percona/percona-xtradb-cluster:5.7.30-31.43
```

### 3.挂载配置文件版（推荐）5.7 .30 版本

新建三个PXC 的目录用于存放相关的配置文件和数据

```sh
# 创建相关文件
mkdir /opt/docker/pxc-server
cd /opt/docker/pxc-server
mkdir pxc1 pxc2 pxc3
mkdir pxc1/mysql pxc2/mysql pxc3/mysql
# 创建配置文件 每一个都要不一样
vi pxc1/my.cnf 
cp /opt/docker/pxc-server/pxc1/my.cnf /opt/docker/pxc-server/pxc2/my.cnf
cp /opt/docker/pxc-server/pxc1/my.cnf /opt/docker/pxc-server/pxc3/my.cnf
# 修改文件夹权限
chmod 777 /opt/docker/pxc-server/*
chmod 777 /opt/docker/pxc-server/pxc1/* /opt/docker/pxc-server/pxc2/* /opt/docker/pxc-server/pxc3/*
chmod 664 /opt/docker/pxc-server/pxc1/conf/my.cnf /opt/docker/pxc-server/pxc2/conf/my.cnf /opt/docker/pxc-server/pxc3/conf/my.cnf

chmod 664 /opt/docker/pxc-server/pxc1/my.cnf
```

**my.cnf**配置文件内容

```sh
[mysqld]
# default_authentication_plugin=mysql_native_password
datadir=/var/lib/mysql
skip-host-cache
skip-name-resolve
core-file

# 默认字符集
character_set_server = utf8
bind_address = 0.0.0.0

default_storage_engine=InnoDB
binlog_format=ROW
skip-host-cache
core-file
# 日志保存天数
expire_logs_days=7
#Disabling symbolic-links is recommended to porevent assorted security risks
symbolic-links=0

innodb_flush_log_at_trx_commit  = 0
innodb_flush_method             = O_DIRECT
innodb_file_per_table           = 1
innodb_autoinc_lock_mode=2

#配置文件中PXC相关内容
server-id=1 #PXC集群中MySQL实例的唯一ID，不能重复，必须是数字
wsrep_slave_threads=2
wsrep_node_incoming_address=172.18.0.11:3306
wsrep_provider=/usr/lib64/galera3/libgalera_smm.so
wsrep_cluster_name=pxc-server #PXC集群的名称
wsrep_cluster_address=gcomm://172.18.0.11,172.18.0.12,172.18.0.13
wsrep_node_name=pxc1#当前节点的名称
wsrep_node_address=172.18.0.11#当前节点的IP
wsrep_sst_method=xtrabackup-v2#同步方法(mysqldump、rsync、xtrabackup)
wsrep_sst_auth= root:123456 #同步使用的帐户
pxc_strict_mode=ENFORCING #同步严厉模式
binlog_format=ROW #基于ROW复制(安全可靠)
default_storage_engine=InnoDB #默认引擎
innodb_autoinc_lock_mode=2 #主键自增长不锁表
# 这个只是在导入数据时使用
innodb_flush_log_at_trx_commit= 0
innodb_flush_method= O_DIRECT
innodb_buffer_pool_size= 200M

# 禁用 ssl mysql  8 中开启
# pxc-encrypt-cluster-traffic=OFF
```

运行docker 容器

```sh
docker run -d --name pxc1 \
-v /opt/docker/pxc-server/pxc1/mysql:/var/lib/mysql \
--mount type=bind,src=/opt/docker/pxc-server/pxc1/my.cnf,dst=/etc/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3310:3306 \
--privileged=true \
--network mynetwork --ip 172.18.0.10 \
percona/percona-xtradb-cluster:5.7.30-31.43

docker run -d --name pxc1 \
-v /opt/docker/pxc-server/pxc1/mysql:/var/lib/mysql \
--mount type=bind,src=/opt/docker/pxc-server/pxc1/my.cnf,dst=/etc/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3311:3306 \
--privileged=true \
--network mynetwork --ip 172.18.0.11 \
percona/percona-xtradb-cluster:5.7.30-31.43

docker run -d --name pxc2 \
-v /opt/docker/pxc-server/pxc2/mysql:/var/lib/mysql \
--mount type=bind,src=/opt/docker/pxc-server/pxc2/my.cnf,dst=/etc/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3312:3306 \
--privileged=true \
--restart=always \
--network mynetwork --ip 172.18.0.12 \
percona/percona-xtradb-cluster:5.7.30-31.43

docker run -d --name pxc3 \
-v /opt/docker/pxc-server/pxc3/mysql:/var/lib/mysql \
--mount type=bind,src=/opt/docker/pxc-server/pxc3/my.cnf,dst=/etc/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3313:3306 \
--privileged=true \
--restart=always \
--network mynetwork --ip 172.18.0.13 \
percona/percona-xtradb-cluster:5.7.30-31.43
```

添加完成或链接数据库输入以下命令 查看是否安装成功

```mysql
show status like 'wsrep_cluster%';
```





```sh

docker run -d --name pxc1 \
-v /opt/docker/pxc-server/pxc1/mysql:/var/lib/mysql \
--mount type=bind,src=/opt/docker/pxc-server/pxc1/my.cnf,dst=/etc/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3311:3306 \
--privileged=true \
--network mynetwork --ip 172.18.0.11 \
percona/percona-xtradb-cluster:8.0.19-10.1

docker run -d --name pxc2 \
-v /opt/docker/pxc-server/pxc2/mysql:/var/lib/mysql \
--mount type=bind,src=/opt/docker/pxc-server/pxc2/my.cnf,dst=/etc/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3312:3306 \
--privileged=true \
--network mynetwork --ip 172.18.0.12 \
percona/percona-xtradb-cluster:8.0.19-10.1

docker run -d --name pxc3 \
-v /opt/docker/pxc-server/pxc3/mysql:/var/lib/mysql \
--mount type=bind,src=/opt/docker/pxc-server/pxc3/my.cnf,dst=/etc/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3313:3306 \
--privileged=true \
--network mynetwork --ip 172.18.0.13 \
percona/percona-xtradb-cluster:8.0.19-10.1

```

配置文件版

配置文件信息

```sh
[mysqld]

default_authentication_plugin=mysql_native_password
datadir=/var/lib/mysql
socket=/tmp/mysql.sock
skip-host-cache
skip-name-resolve
core-file

character_set_server = utf8
bind_address = 0.0.0.0

default_storage_engine=InnoDB
binlog_format=ROW


expire_logs_days=7
#Disabling symbolic-links is recommended to porevent assorted security risks
symbolic-links=0

innodb_flush_log_at_trx_commit  = 0
innodb_flush_method             = O_DIRECT
innodb_file_per_table           = 1
innodb_autoinc_lock_mode=2

#配置文件中PXC相关内容
server-id=1 #PXC集群中MySQL实例的唯一ID，不能重复，必须是数字
wsrep_slave_threads=2
wsrep_node_incoming_address=172.18.0.11:3306
wsrep_provider=/usr/lib64/galera4/libgalera_smm.so
wsrep_cluster_name=pxc-server #PXC集群的名称
wsrep_cluster_address=gcomm://
wsrep_node_name=test1#当前节点的名称
wsrep_node_address=172.18.0.11#当前节点的IP
wsrep_sst_method=xtrabackup-v2#同步方法(mysqldump、rsync、xtrabackup)
pxc_strict_mode=ENFORCING #同步严厉模式
binlog_format=ROW #基于ROW复制(安全可靠)
default_storage_engine=InnoDB #默认引擎
innodb_autoinc_lock_mode=2 #主键自增长不锁表
# 这个只是在导入数据时使用
innodb_flush_log_at_trx_commit= 0
innodb_flush_method= O_DIRECT
innodb_buffer_pool_size= 200M

pxc-encrypt-cluster-traffic=OFF

[client]
socket=/tmp/mysql.sock

[sst]
progress=/var/lib/mysql/sst_in_progresss
```

PXC集群管理

PXC集群信息

PXC集群信息可以分为以下几类:

队列    复制    流控    事物    状态
https://www.percona.com/doc/percona-xtradb-cluster/LATEST/wsrep-status-index.html



## 3、PXC 参数说明

PXC数据复制相关的信息

| 参数                   | 说明                           |
| ---------------------- | ------------------------------ |
| wsrep_last_applied     | 同步应用次数                   |
| wsrep_last_committed   | 事物提交次数                   |
| wsrep_replicated       | 被其他节点复制的总数           |
| wsrep_replicated_bytes | 被其他节点复制的数据总数       |
| wsrep_received         | 从其他节点处收到的写入请求总数 |
| wsrep_received_bytes   | 从其他节点处收到的同步数据总数 |

PXC队列的相关信息

| 参数                           | 说明               |
| ------------------------------ | ------------------ |
| **wsrep_local_send_queue**     | 发送队列的长度     |
| wsrep_local_send_queue_max     | 发送队列的最大长度 |
| wsrep_local_send_queue_min     | 发送队列的最小长度 |
| **wsrep_local_send_queue_avg** | 发送队列的平均长度 |
| **wsrep_local_recv_queue**     | 接收队列的长度     |
| wsrep_local_recv_queue_max     | 接收队列的最大长度 |
| wsrep_local_recv_queue_min     | 接收队列的最小长度 |
| **wsrep_local_recv_queue_avg** | 接收队列的平均长度 |



流量控制的相关信息

| 参数                          | 说明                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| wsrep_flow_control_paused_ns  | 流控暂停状态下花费的总时间（纳秒)                            |
| **wsrep_flow_control_paused** | 流量控制暂停时间的占比(0~1)                                  |
| **wsrep_flow_control_sent**   | 发送的流控暂停事件的数量                                     |
| **wsrep_flow_control_recv**   | 接收的流控暂停事件的数量                                     |
| wsrep_flow_control_interval   | 流量控制的下限和上限。上限是队列中允许的最大请求数。如果队列达到上限，则拒绝新的请求。当处理现有请求时，队列会减少，—旦到达下限，将再次允许新的请求 |
| **wsrep_flow_control_status** | 流量控制状态                                                 |






PXC 状态管理

PXC节点状态

![image-20200922155642505](https://gitee.com/moomhub/img/raw/master/Fl1VTmzCt7EePHJ.png)

PXC集群状态

![image-20200922155721122](https://gitee.com/moomhub/img/raw/master/85Z6MenauvrlJtY.png)

节点与集群的相关信息

| 参数                      | 描述                                                         |
| ------------------------- | ------------------------------------------------------------ |
| wsrep_local_state_comment | 节点状态                                                     |
| wsrep_cluster_status      | 集群状态(PRIMARY（正常状态）、NON_PRIMARY（脑裂）、Disconnected（未连接）) |
| wsrep_connected           | 节点是否连接到集群                                           |
| wsrep_ready               | 集群是否正常工作                                             |
| wsrep_cluster_size        | 节点数量                                                     |
| wsrep_desync_count        | 延时节点数量                                                 |
| wsrep_incoming_addresses  | 集群节点IP地址                                               |


事务的相关信息

| 参数                     | 描述                           |
| ------------------------ | ------------------------------ |
| wsrep_cert_deps_distance | 事务执行并发数                 |
| wsrep_apply_oooe         | 接收队列中事务的占比           |
| wsrep_apply_oool         | 接收队列中事务乱序执行的频率   |
| wsrep_apply_window       | 接收队列中事务的平均数量       |
| wsrep_commit_oooe        | 发送队列中事务的占比           |
| wsrep_commit_oool        | 无任何意义(不存在本地乱序提交) |
| wsrep_commit_window      | 发送队列中事务的平均数量       |



## 4、PXC节点上线和下线操作（安装环境下）

如果PXC节点都是安全退出的，先要启动最后退出的节点

```sh
# 最后关闭的节点先启动
systemctl start mysql@bootstrap.service
# 查看节点是否是最后一个节点  pxc的安装目录
cat /var/lib/mysql/grastate.dat


#  safe_to_bootstrap(默认是0,为1则代表是最后一个节点结束的）

safe_to_bootstrap: 1 设置为1 (默认是0）
```

## 5、Mysql常用的中间件 

```
MyCat （推荐）
Atlas
OneProxy
Proxy SQL
```



