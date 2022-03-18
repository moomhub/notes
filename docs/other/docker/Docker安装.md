# Docker 安装

## Docker-Linux平台安装

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```



### Ubuntu 14.04 16.04 (使用apt-get进行安装)

```bash
# step 1: 安装必要的一些系统工具
sudo apt-get update
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
# step 2: 安装GPG证书
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
# Step 3: 写入软件源信息
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
# Step 4: 更新并安装 Docker-CE
sudo apt-get -y update
sudo apt-get -y install docker-ce
```


### CentOS 7 (使用yum进行安装)

```bash
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3: 更新并安装 Docker-CE
sudo yum makecache fast
sudo yum -y install docker-ce
# Step 4: 开启Docker服务
sudo service docker start
```


## Docker 命令说明

### docker基础命令

```PowerShell

systemctl start  docker
systemctl stop  docker
systemctl status  docker
docker version  #查查版本
docker info     #查看info
```

### Docker 设置开机启动

```PowerShell
systemctl stop  docker
```


### 修改docker镜像加速

修改为网易、阿里、daocloud加速

```PowerShell
  vi /etc/docker/daemon.json
```


```json
	{
 "registry-mirrors": [
     "http://hub-mirror.c.163.com",
     "https://yuj65s1u.mirror.aliyuncs.com",
     "http://f1361db2.m.daocloud.io"
 ]
}
```


```PowerShell
    systemctl restart  docker
```


## Docker 卸载

```PowerShell
apt-get autoremove docker docker-ce docker-engine  docker.io  containerd runc
```

### 查看是否完全删除

```PowerShell
dpkg -l | grep docker
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P # 删除无用的相关的配置文件
```

### 删除相关项

```PowerShell
apt-get autoremove docker-ce-*
```

### 删除docker的相关配置&目录

```PowerShell
rm -rf /etc/systemd/system/docker.service.d
rm -rf /var/lib/docker
```


## docker 加速

```PowerShell
sudo mkdir -p /etc/docker

vim /etc/docker/daemon.json
{
  "registry-mirrors": [
      "https://yuj65s1u.mirror.aliyuncs.com",
      "https://docker.mirrors.ustc.edu.cn",
      "https://hub-mirror.c.163.com"
      ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
docker 暴露端口2375
```

## docker开启2375 端口

开启2375端口实现远程连接

```PowerShell
# 修改配置文件
vim /lib/systemd/system/docker.service
# 注释原有的 ExecStart 添加以下内容
#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375
# 重新加载配置
systemctl daemon-reload
# 重启 Dcoker
systemctl restart docker
```

