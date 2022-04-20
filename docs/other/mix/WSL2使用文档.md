# WSL2常用使用文档

## 1、常用命令集合

### 1.1、查询安装的版本

```shell
wsl -l -v
```

### 1.2、设置WSL的版本

```shell
# 设置默认的wsl 版本
wsl --set-default-version 2
# 指定某个wsl的版本
wsl --set-version Ubuntu-20.04 2
```

### 1.3、关闭、卸载WSL

```shell
# 关闭
wsl --shutdown
#卸载分发版或虚拟机
wsl --unregister Ubuntu-20.04
```

### 1.4、导入和导出

```shell
# 导出
wsl --export Ubuntu-20.04 D:\Ubuntu-20.04.tar
# 导入
wsl --import Ubuntu-20.0WSL:\Ubuntu-20.04.tar
# 导入到指定的目录并设置其版本
wsl --import Ubuntu-20.04 D:\WSL D:\Ubuntu-20.04.tar --version 2
```



## 2、Windows 开机自启

### 2.1、创建vbs或者bat

**wsl-init.vbs** 文件内容

```shell
Set ws = CreateObject("Wscript.Shell")
ws.run "wsl -d Ubuntu-20.04 -u root /etc/init.wsl start", vbhide
```

**wsl-init.bat** 文件内容

```shell
wsl -d Ubuntu-20.04 -u root /etc/init.wsl start
```

### 2.2、WSL 内新建启动脚本

```shell
vim /etc/init.wsl

#! /bin/sh
/etc/init.d/ssh $1
/etc/init.d/docker $1
```

### 2.3、开机启动

```
shell:startup 
```

将vbs放进去

## 3、已经配置好的 Linux 发行版的相关信息

| 名称  | 用户  | 密码   |
| ----- | ----- | ------ |
| Linux | root  | 123456 |
| Linux | moom  | moom   |
| redis |       | 123456 |
| mysql | root  | 123456 |
| nacos | nacos | nacos  |
|       |       |        |
|       |       |        |

