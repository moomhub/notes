# 安装Percona数据库

## 1、本地安装

### 1、本地安装

#### 1.1、离线安装Percona数据库

[点击下载具体的Mysql的相关的版本](https://www.percona.com/downloads/)

进入RPM安装文件目录，执行下面的脚本

```shell
yum localinstall *.rpm
```

管理MySQL服务

```shell
systemctl start mysqld
systemctl stop mysqld
systemctl restart mysqld
```

#### 1.2、在线安装

使用yum命令安装

[点击查询具体的Mysql的相关的版本链接](https://www.percona.com/downloads/)

```shell
yum install http://www.percona.com/downloads/percona-release/redhat/0.1-3/percona-release-0.1-3.noarch.rpm
yum  install  Percona-Server-server-57
```

#### 1.3、管理相关的PXC 服务

管理MySQL服务

```shell
systemctl start mysqld
systemctl stop mysqld
systemctl restart mysqld
```

### 2. 开放防火墙端口

```shell
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload
```

### 3. 修改MySQL配置文件

```shell
vi /etc/my.cnf
```

```ini
[mysqld]
character_set_server = utf8
bind-address = 0.0.0.0
#跳过DNS解析
skip-name-resolve
```

```shell
service mysql restart 
```

### 4. 修改数据

- 查看MySQL初始密码

  ```shell
  cat /var/log/mysqld.log | grep "A temporary password"
  ```

- 修改MySQL密码

  ```shell
  mysql_secure_installation
  ```

- 创建远程管理员账户

   ```shell
    mysql -u root -p
   ```
  
    ```sql
    CREATE USER 'admin'@'%' IDENTIFIED BY 'Abc_123456';
    GRANT all privileges ON *.* TO 'admin'@'%';
    FLUSH PRIVILEGES;
    ```

## 2、Docker 容器安装（推荐）

[Docker 运行参数说明](https://github.com/percona/percona-docker)

### 1.拉起远程镜像

```sh
#docker 拉起镜像 默认为latest
docker pull percona/percona-server
```

### 2.创建本地挂载的配置文件

```sh
# Percona Server template configuration
#
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/8.0/en/server-configuration-defaults.html

[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
#log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
!includedir /etc/my.cnf.d
```

### 3.启动docker

```sh
# docker 运行 PXC 8.0 密码为123456
docker run --name percona-server \
--mount type=bind,src=$PWD/my.cnf,dst=/etc/my.cnf \
-e MYSQL_ROOT_PASSWORD=123456 \
--network mynetwork --ip 172.18.0.1 \
--privileged=true \
--restart=always \
-d -i -p 3300:3306 percona/percona-server:latest
```

TokuDB 具体配置参考：

[Docker 配置说明](https://github.com/percona/percona-docker)

```shell
docker run --name some \
-e MYSQL_ROOT_PASSWORD=root \
-e INIT_TOKUDB=1 \
--privileged=true \
--restart=always \
-d -i -p 3300:3306 percona/percona-server:5.6.28
```



### 4. Mysql 忘记密码

修改本地的挂载的**my.cnf**配置文件

```sh
[mysqld] 
...
# 添加 跳过的验证的代码 
skip-grant-tables
```

然后重启 docker

```sh
# 然后直接输入mysql 直接回车进入mysql
mysql
```

## 3、备注

进入 MySQL 后输入

```mysql
show engines; 
 
show plugins;
```

使用 root 身份进入容器

```shell
docker exec -ti -u root ps bash
```

安装TokuDB

```shell
ps_tokudb_admin --enable -uroot -p
```

点击 RockDB 安装文档，选择安装TokuDB或RockDB(推荐)查看相关命令，然后执行相关命令

[Percona-Server 8.0文档](https://www.percona.com/doc/percona-server/LATEST/index.html)

[Percona-Server 5.7文档](https://www.percona.com/doc/percona-server/5.7/index.html)

[TokuDB废弃说明](https://www.percona.com/blog/2021/05/21/tokudb-support-changes-and-future-removal-from-percona-server-for-mysql-8-0/)



> conf 权限设置为  775
>
> data 权限设置为  777

```shell
docker run --name ps \
-v /opt/docker/percona-server/conf/my.conf:/etc/my.cnf \
-v /opt/docker/percona-server/data:/var/lib/mysql \
-e INIT_ROCKDB=1 \
-e MYSQL_ROOT_PASSWORD=123456 \
--privileged=true \
--restart=always \
-d -i -t -p 3306:3306 percona/percona-server:latest
```











