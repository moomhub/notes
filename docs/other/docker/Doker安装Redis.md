# Doker安装Redis

## 一、使用docker安装redis

访问==> [https://hub.docker.com/_/redis?tab=tags](https://hub.docker.com/_/redis?tab=tags) 查看最新的版本

```shell
# 拉取镜像 安装好之后使用docker images即可查看
docker pull redis

```


## 二、获取redis的配置文件

下载Redis配置文件<br />redis中文官方网站：[http://www.redis.cn/download.html](http://www.redis.cn/download.html)<br />下载后解压出来：这个redis.conf文件就是咱们需要的<br />修改redis.conf配置文件： 主要配置的如下：

```bash
bind 127.0.0.1 #注释掉这部分，使redis可以外部访问
daemonize no#用守护线程的方式启动
requirepass 你的密码#给redis设置密码 
appendonly yes#redis持久化　　默认是no 
tcp-keepalive 300 #防止出现远程主机强迫关闭了一个现有的连接的错误 默认是300
```


## 三、创建本地映射目录

创建本地存放redis的位置

```bash
mkdir -p /opt/docker/redis/conf
mkdir -p /opt/docker/redis/data
```


上传之前下载的`redis.conf`文件到conf目录

## 四、启动Redis

> redis-server /etc/redis/redis.conf：这个是关键配置，让redis不是无配置启动，而是按照这个redis.conf的配置启动<br />appendonly yes：redis启动后数据持久化


```bash
docker run -p 6379:6379 \
--name redis \
--restart=always \
-v /opt/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
-v /opt/docker/redis/data:/data \
-d redis redis-server /etc/redis/redis.conf \
--appendonly yes
```


测试连接完成安装

