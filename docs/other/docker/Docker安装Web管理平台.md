# Docker 安装 Web 管理平台

## 一、拉取相关镜像

```纯文本
docker pull rethinkdb
docker pull microbox/etcd
docker pull shipyard/docker-proxy
docker pull swarm
docker pull dockerclub/shipyard
docker images
```

![](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1609727399794-88a9447a-0ac3-4e07-9b63-c133b21d8191.png)

将原先脚本修改为中文脚本

```纯文本
wget https://raw.githubusercontent.com/shipyard/shipyard-project.com/master/site/themes/shipyard/static/deploy
```

> 解决  raw.githubusercontent.com (raw.githubusercontent.com)|0.0.0.0|:443... 失败：拒绝连接。

```PowerShell
sudo vi /etc/hosts
```

```PowerShell
# GitHub Start
52.74.223.119     github.com
192.30.253.119    gist.github.com
54.169.195.247    api.github.com
185.199.111.153   assets-cdn.github.com
151.101.76.133    raw.githubusercontent.com
151.101.108.133   user-images.githubusercontent.com
151.101.76.133    gist.githubusercontent.com
151.101.76.133    cloud.githubusercontent.com
151.101.76.133    camo.githubusercontent.com
151.101.76.133    avatars0.githubusercontent.com
151.101.76.133    avatars1.githubusercontent.com
151.101.76.133    avatars2.githubusercontent.com
151.101.76.133    avatars3.githubusercontent.com
151.101.76.133    avatars4.githubusercontent.com
151.101.76.133    avatars5.githubusercontent.com
151.101.76.133    avatars6.githubusercontent.com
151.101.76.133    avatars7.githubusercontent.com
151.101.76.133    avatars8.githubusercontent.com
# GitHub End
```

## 二、运行脚本

将官方脚本换成修改为中文版的脚本

```纯文本
grep -n shipyard:latest deploy
sed -i 's/shipyard\/shipyard:latest/dockerclub\/shipyard:latest/g' deploy
```

默认会用到 8080 端口和 2375 端口

如果不想使用这两个端口可以修改

这里我们改成 18080 与 12375 端口

```纯文本
vim deploy
```

![](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1609727399813-68696108-209c-4b5a-a83c-fc410882da7a.png)

运行安装脚本

```纯文本
sh deploy
```

卸载

```纯文本
cat deploy | ACTION=remove bash
```

![](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1609727399795-4ef875c4-a34d-446a-bad2-9d583cdc7584.png)

安装成功 Username: admin Password: shipyard

通过浏览器访问 本机 ip:18080

![](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1609727399755-4ae946e6-36c2-4d99-8f11-59ef8cbb6bf1.png)

![](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1609727399785-375f27c0-9fd2-44fc-8be8-dbd8d51e4df9.png)

安装成功

## **三、集群管理**

增加 docker 集群节点,只需要在节点服务器运行如下语句即可

```shell
curl -sSL https://raw.githubusercontent.com/shipyard/shipyard-project.com/master/site/themes/shipyard/static/deploy | ACTION=n
```
