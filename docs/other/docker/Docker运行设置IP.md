# Docker运行设置IP

## 一、Docker 默认网络

Docker安装后，默认会创建下面三种网络类型：

```powershell
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
9781b1f585ae        bridge              bridge              local
1252da701e55        host                host                local
237ea3d5cfbf        none                null                local
```


启动 Docker的时候，用 `--network` 参数，可以指定网络类型，如：

```PowerShell
docker run -itd --name test1 --network bridge --ip 172.17.0.10 centos:latest /bin/bash
```


## 二、docker 网络类型

### bridge：桥接网络

默认情况下启动的Docker容器，都是使用 bridge，Docker安装时创建的桥接网络，每次Docker容器重启时，会按照顺序获取对应的IP地址，这个就导致重启下，Docker的IP地址就变了

### none：无指定网络

使用 `--network=none` ，docker 容器就不会分配局域网的IP

### host： 主机网络

使用 `--network=host`，此时，Docker 容器的网络会附属在主机上，两者是互通的。 例如，在容器中运行一个Web服务，监听8080端口，则主机的8080端口就会自动映射到容器中。

---

## 三、创建自定义网络（设置固定IP）

启动Docker容器的时候，使用默认的网络是不支持指派固定IP的，如下：

```PowerShell
docker run -itd  --network bridge --ip 172.17.0.10 centos:latest /bin/bash
6eb1f228cf308d1c60db30093c126acbfd0cb21d76cb448c678bab0f1a7c0df6
docker: Error response from daemon: User specified IP address is supported on user defined networks only.
```


因此，需要创建自定义网络，下面是具体的步骤：

### 步骤1: 创建自定义网络

> mynetwork 是网络的名称


创建自定义网络，并且指定网段：172.18.0.0/24

```PowerShell
docker network create --subnet=172.0.0.0/16 mynetwork
docker network ls

NETWORK ID          NAME                DRIVER              SCOPE
9781b1f585ae        bridge              bridge              local
1252da701e55        host                host                local
4f11ae9c85de        mynetwork           bridge              local
237ea3d5cfbf        none                null                local
```


### 步骤2: 创建Docker容器

```PowerShell
docker run -itd --name networkTest1 --network mynetwork --ip 172.18.0.2 centos:latest /bin/bash
```


这个时候，创建的Docker容器就会持有 172.18.0.2 这个IP.

```PowerShell
[root@ec8e31938fe7 /]# ifconfig
eth0      Link encap:Ethernet  HWaddr 02:42:AC:12:00:02
          inet addr:172.18.0.2  Bcast:0.0.0.0  Mask:255.255.0.0
          inet6 addr: fe80::42:acff:fe12:2/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:88 errors:0 dropped:0 overruns:0 frame:0
          TX packets:14 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:4056 (3.9 KiB)  TX bytes:1068 (1.0 KiB)
lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 errors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:0 (0.0 b)  TX bytes:0 (0.0 b)
```



```
docker inspect --format='{{.NetworkSettings.IPAddress}}'  XXX
```



