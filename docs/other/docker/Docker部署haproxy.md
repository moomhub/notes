# Docker部署haproxy

## docker 拉取镜像

haproxy 版本

https://registry.hub.docker.com/_/haproxy?tab=tags

```sh
docker pull haproxy:latest

docker run -d --name mycat1 \
-p 8200:8066 \
-p 8201:9066 \
-v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf \
--network mynetwork --ip 172.18.0.101 \
mycat-1.6.7.4:latest

docker run -d --name mycat2 \
-p 8202:8066 \
-p 8203:9066 \
-v /opt/docker/mycats/mycat2/conf:/usr/local/mycat/conf \
--network mynetwork --ip 172.18.0.102 \
mycat-1.6.7.4:latest

docker run -d --name haproxy1 \
-v /opt/docker/haproxys/haproxy1/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro \
-p 9999:9999 \
-p 3306:3306 \
--privileged \
--dns 8.8.8.8 --dns 114.114.114.114 \
--network mynetwork --ip 172.18.0.199 \
haproxy:latest

docker run -d --name keepalived1 \
--detach \
--network mynetwork --ip 172.18.0.110 \
osixia/keepalived:latest

docker run -d --name keepalived2 \
--mount type=bind,src=/opt/docker/keepaliveds/keepalived1/keepalived.conf,dst=/container/service/keepalived/assets/keepalived.conf \
--network mynetwork --ip 172.18.0.110 \
--privileged \
--detach osixia/keepalived:latest --copy-service

docker run -d --name hk1 \
--mount type=bind,src=/opt/docker/keepaliveds/keepalived1/keepalived.conf,dst=/etc/keepalived/keepalived.conf \
--mount type=bind,src=/opt/docker/haproxys/haproxy1/haproxy.cfg,dst=/etc/haproxy.cfg \
--network mynetwork --ip 172.18.0.111 \
-p 8999:8999 \
-p 5678:5678 \
-p 8001:8001 \
--privileged \
instantlinux/haproxy-keepalived:latest

```

## Haproxy 默认配置文件

```sh
docker run -d --name mycat2 \
-p 8202:8066 \
-p 8203:9066 \
-v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf \
--network mynetwork --ip 172.18.0.102 \
mycat-1.6.7.4:latest

    docker run -d --name mycat1 \
    -p 8200:8066 \
    -p 8201:9066 \
    -v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf \
    --network mynetwork --ip 172.18.0.101 \
    mycat-1.6.7.4:latest

docker run -d --name mycat2 \
-p 8202:8066 \
-p 8203:9066 \
-v /opt/docker/mycats/mycat2/conf:/usr/local/mycat/conf \
--network mynetwork --ip 172.18.0.102 \
mycat-1.6.7.4:latest

docker run -d --name hk1 \
--mount type=bind,src=/opt/docker/haproxy-keepalived/hk1/keepalived.conf,dst=/etc/keepalived/keepalived.conf \
--mount type=bind,src=/opt/docker/haproxy-keepalived/hk1/haproxys.cfg,dst=/etc/haproxy.cfg \
--network mynetwork --ip 172.18.0.111 \
-p 18999:8999 \
-p 13306:3306 \
--privileged \
instantlinux/haproxy-keepalived:latest

docker run -d --name hk2 \
--mount type=bind,src=/opt/docker/haproxy-keepalived/hk2/keepalived.conf,dst=/etc/keepalived/keepalived.conf \
--mount type=bind,src=/opt/docker/haproxy-keepalived/hk2/haproxys.cfg,dst=/etc/haproxy.cfg \
--network mynetwork --ip 172.18.0.112 \
-p 28999:8999 \
-p 23306:3306 \
--privileged \
instantlinux/haproxy-keepalived:latest
```



```properties
global
    log 127.0.0.1 local0 info  # 日志存储到127.0.0.1,以local0输入info级别
    maxconn 4096 # 最大连接数,要考虑到ulimit -n的大小限制
    daemon
    nbproc 2 # 进程数
   

defaults
    log global
    mode tcp # 使用tcp4层代理模式
    option tcplog
    option dontlognull
    retries 3
    # 在使用基于cookie定向时，一旦后端某一server宕机时，会将会话重新定向至某一上游服务器，必须使用的选项
    option redispatch
    maxconn 4096
    timeout connect 5s
    timeout client 60s #客户端空闲超时时间
    timeout server 15s #服务端超时时间

listen rabbitmq_cluster
    bind 0.0.0.0:5678
    mode tcp
    balance roundrobin #采用轮询机制,还可以是其他的负载均衡方式
        #rabbitmq集群节点配置,inter每隔3秒对MQ集群做健康检查,
    server rabbit1 192.168.1.181:5672 check inter 3000 rise 2 fall 2
    server rabbit2 192.168.1.182:5672 check inter 3000 rise 2 fall 2
    
#配置haproxy web监控,查看统计信息
listen stats
    bind 0.0.0.0:8999 #这里得配置内网IP，然后用外网IP访问即可
    mode http
    option httplog
    stats enable
    #设置haproxy监控地址为http://39.101.209.123:8999/rabbitmq-stats
    stats uri /
    stats refresh 3s
    
listen rabbitmq_admin
    bind 0.0.0.0:8001
    server rabbit1 192.168.1.181:15672
    server rabbit2 192.168.1.182:15672
```



## Haproxy配置文件

```properties
listen admin_stats
bind 0.0.0.0:4001
#监控界面的访问的IP和端口
mode http
#访问协议
stats uri /dbs#URI相对地址
stats realm Globall statistics#统计报告格式
stats authadmin:abc123456#登陆帐户信息

listen proxy-mysql
bind0.0.0.0:3306
mode tcp
balance roundrobin
option tcplog #日志格式
server mycat_1 192.168.99.131:8066 check port 8066 weight 1 maxconn 200o
server mycat_2 192.168.99.132:8066 check port 8066 weight 1 maxconn 2000
option tcpka #使用keepalive检测死链

```



## keepalived配置文件

```nginx
vrrp_instance VI_1 {
  # 网卡名称
  interface eth0
  # 规则
  state MASTER
  virtual_router_id 51
  #优先级
  priority 100
  advert_int 1

  virtual_ipaddress {
    172.18.0.240
  }

  authentication {
    auth_type PASS
    auth_pass 123456
  }
}

```


