# **docker 安装mysql**

## **下载Mysql镜像**

**`命令：`docker pull mysql**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117101907475-1388871070.png)**

**查看镜像**

**`命令：`docker images**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117101920800-1067185475.png)**

**在opt下创建文件夹**

```
cd /opt/
mkdir mysql_docker
cd mysql_docker/
echo $PWD
```

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117101933202-1072982636.png)**

**5、启动mysql容器，在var/lib/docker/containers/下查看容器**

**`命令：`**

```shell
docker run --name mysql-master -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d -i -p 3307:3306 mysql:latest
```

```shell
docker run --name mysql-slave -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d -i -p 3308:3306 mysql:latest
```



**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117101951542-1388225438.png)**

**`命令：`cd /var/lib/docker/containers/**

**6、查看mysql进程**

**`命令：`docker ps -a**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102003235-1426406656.png)**

**7、进入mysql容器，并登陆mysql**

**`命令：`**

```
docker exec -it mysql-master bash
```

**命令：`mysql -uroot -p**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102011980-2122252374.png)**

**8、开启远程访问权限**

**`命令：`use mysql;**
**`命令：`select host,user from user;**
**`命令：`ALTER USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY '123456';**
**`命令：`flush privileges;**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102022439-1012036839.png)**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102030619-917697046.png)**

**镜像里面 root用户已经有远程连接权限在里面，所以不需要去设置，只是模式不一样才导致无法连接，把root用户的密码改成 mysql_native_password 模式，即可远程连接**

## **查看docker日志**

**`命令：`docker logs -f --tail 10 a4dac74d48f7**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102048856-1273275706.png)**

## **常用命令**

- **查看进程**

**`命令：`docker ps -a**

- **关闭docker中mysql容器**

**`命令：`docker stop mysqlserver**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102059917-479100535.png)**

- **重启docker中mysql重启**

**![img](https://img2018.cnblogs.com/blog/997646/202001/997646-20200117102109562-1174307222.png)**

- **重启docker**

**`命令：`systemctl restart docker**

- **关闭docker**

**`命令：`systemctl stop docker**





## Mysql 主从分离（Docker）

### 创建配置文件

默认docker数据目录：/opt/docker/mysql/  

主数据库（master）配置文件/usr/local/mysql/master/conf/my.cnf:

```shell
[mysqld]
og-bin=mysql-bin
server-id=1   #注意这个id>0且要唯一
```

从数据库（slave）配置文件/usr/local/mysql/slave/my.cnf:

```shell
[mysqld]
log-bin=mysql-bin
server-id=2   #注意这个id>0且要唯一
```

注意：我是在容器外部进行的配置，喜欢进入容器内部配置 路径 /etc/mysql/my.cnf

### Master 主库

创建Master 主库

docker 运行 挂载相关文件

```shell
docker run --name mysql-master  \
--mount type=bind,src=/opt/docker/mysqls/conf/my.cnf,dst=/etc/mysql/my.cnf \
-v $PWD/conf:/etc/mysql/conf.d \
-v $PWD/logs:/logs \
-v $PWD/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
--network mynetwork --ip 172.18.0.2 \
--dns 8.8.8.8 --dns 114.114.114.114 \
-d -i -p 3307:3306 mysql:latest
```

Master主库设置

```shell
#进入主库
docker exec -it mysql-master bash
#进入mysql
mysql -u root -p

```

创建MySQL从库用户

```
> 172.17.0.10 为从库在docker 中的IP
> 查看IP :
> 1、内部查看 cat /etc/hosts
> 2、docker 命令查看 `docker inspect --format='{{.NetworkSettings.IPAddress}}' `容器名称|容器id
```

```mysql
CREATE USER 'slave'@'172.17.0.10' IDENTIFIED BY 'slave123';
# 设置权限
GRANT ALL  ON *.* TO 'slave'@'172.17.0.10';
# 修改认证认证方式
ALTER USER 'slave' IDENTIFIED WITH mysql_native_password BY 'slave123';
FLUSH PRIVILEGES;
# 显示主库信息 master状态
SHOW MASTER STATUS;
```

> 从库连接到主库时 报错：---->mysql Authentication plugin 'caching_sha2_password' is not supported问题处理        
>
> 使用mysql8.0版本，登录失败，提示 Authentication plugin 'caching_sha2_password' is not supported。
> 原因是在MySQL 8.0以后，默认的密码加密方式是caching_sha2_password而不是mysql_native_password。
>
> 解决方法：
>
> 2.更新身份认证方式 ALTER USER '你的用户名' IDENTIFIED WITH mysql_native_password BY '你的用户密码';

### Slave主库

创建Slave主库

Docker 运行 挂载相关文件

```shell
docker run --name mysql-slave  \
--mount type=bind,src=/opt/docker/mysqls/conf/my.cnf,dst=/etc/mysql/my.cnf \
-v $PWD/conf:/etc/mysql/conf.d \
-v $PWD/logs:/logs \
-v $PWD/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
--network mynetwork --ip 172.18.0.2 \
--dns 8.8.8.8 --dns 114.114.114.114 \
-d -i -p 3308:3306 mysql:latest
```

Slave从库设置

```shell
#进入主库
docker exec -it mysql-slave bash
#进入mysql
mysql -u root -p
```

Mysql Slave从库设置

> 172.17.0.9  ----  主库IP
> slave ----- 用户名
> slave123 ----- 密码
> mysql-bin.000003 -----主库信息

```mysql
# 停止从库
stop slave;
# 设置主库信息
CHANGE MASTER TO MASTER_HOST='172.17.0.9', MASTER_USER='slave', MASTER_PASSWORD='slave123', MASTER_LOG_FILE='mysql-bin.000003';
# 开始从库
start slave;
# 查看连接状态
show slave status \G;
```

```mysql
CHANGE MASTER TO MASTER_HOST='172.17.0.9', \
MASTER_USER='slave’', \
MASTER_PASSWORD='slave’123', \
MASTER_LOG_FILE='mysql-bin.000004', \
MASTER_LOG_POS=892;
```

成功后


Master Slave 常见配置

```bash
[mysqld]
#mysqld字段增加如下信息
log-bin=mysql-bin   #开启log bin
binlog_format=mixed #日志格式
server-id   = 1     #server id,跟slave配置不同server-id,例这里写1,slave可以写1除外2.3.4...
expire_logs_days = 10 #日志保存时间
binlog-ignore-db=information_schema #这是mysql默认的数据库,忽略掉
binlog-ignore-db=mysql              #这是mysql默认的数据库,忽略掉
binlog-ignore-db=performance_schema #这是mysql默认的数据库,忽略掉
binlog-do-db=testOrderDb    #需要同步的数据库
```

### 从库设置为只读

mysql主从复制，slave从库只读配置对于需要保证master-slave主从同步的salve库，如果要设置为只读状态，需要执行的命令为：

```
set global read_only=1;  对于非root用户，切换到root用户后还是可以进行增删改查的哦。
```


 read_only=1只读模式，可以限定普通用户进行数据修改的操作，但不会限定具有super权限的用户（如超级管理员root用户）的数据修改操作。

### Docker 里面MySql 默认的配置信息

```mysql
# docker 里面默认的配置信息
[mysqld]
server-id=2
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL

# Custom config should go here
!includedir /etc/mysql/conf.d/

```

## docker 复制命令

```shell
docker cp mysql-master:/etc/mysql/my.cnf /opt/a
```

## 设置docker开机自启动如下：

```
systemctl enable docker
```

which mysqld

/usr/sbin/mysqld --verbose --help | grep -A 1 'Default options'