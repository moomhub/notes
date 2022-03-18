# Ubuntu 设置远程登陆

## 检查ssh服务

判断是否安装ssh服务，可以通过如下命令进行：

```bash
ps -e| grep ssh
```


输出如下：表示已经安装了ssh

```bash
root@moom:~# ps -e| grep ssh
    879 ?        00:00:00 sshd
   2302 ?        00:00:00 sshd
   2314 ?        00:00:00 sshd
```

## 安装 和开启ssh服务

### 安装

如果你用的是**redhat，fedora，centos** 等系列linux发行版，那么敲入以下命令：

```bash
sudo yum install sshd
```


如果你使用的是**debian，ubuntu，linux mint** 等系列的linux发行版，那么敲入以下命令：

```bash
sudo apt-get install sshd
or
sudo apt-get install openssh-server
```


### 开启

开启ssh服务

```bash
sudo service sshd start
```

出现错误  `sshd: no hostkeys available -- exiting.`

输入  `ssh-keygen -A`

```shell
root@LAPTOP-DDEOSP8K:/etc/ssh# service ssh start
sshd: no hostkeys available -- exiting.
root@LAPTOP-DDEOSP8K:/etc/ssh# ssh-keygen -A
ssh-keygen: generating new host keys: RSA DSA ECDSA ED25519
root@LAPTOP-DDEOSP8K:/etc/ssh# service ssh start
```

### 开机自启

设置开机自启动

```纯文本
sudo systemctl enable ssh
```


关闭ssh开机自动启动命令

```纯文本
sudo systemctl disable ssh
```

## 卸载ssh服务

如果你用的是redhat，fedora，centos等系列linux发行版，那么敲入以下命令：

```bash
sudo yum remove sshd
```


如果你使用的是debian，ubuntu，linux mint等系列的linux发行版，那么敲入以下命令：

```bash
sudo apt-get –purge remove sshd
```


然后就会提示卸载完成。

## Linux 远程密码模式登陆

> 在wsl中执行sudo /etc/init.d/ssh start<br />可能会出现sshd: no hostkeys available -- exiting的报错，<br />在 /etc/ssh 路径下执行sudo ssh-keygen -A可以解决。


改名sshd_config 配置文件

```bash
# 备份文件
cp /etc/ssh/sshd_config /etc/ssh/sshd_config_backup
# 编辑文件
vim /etc/ssh/sshd_config
```


修改以下内容然后保存

```纯文本
Port 22
ListenAddress 0.0.0.0
PasswordAuthentication yes # 允许用户名密码方式登录

#开启Root 用户使用密码登录
PermitRootLogin yes
```


重启ssh服务

```bash
sudo systemctl restart ssh
#或者
service ssh restart
```


## Linux 远程密钥模式登陆

> 在Linux 服务器上进行创建密钥时，进行当前用户登陆是已当前用户创建的，进行远程登陆时，可输入当前用户的名称可直接进行登陆。但是输入其他用户时，会爆拒绝访问，同时要求输入密码进行登陆。（当禁止密码进行登陆时就只 允许当前用户进行登陆）


### 制作密钥对

```纯文本
首先在服务器上制作密钥对。首先用密码登录到你打算使用密钥登录的账户，然后执行以下命令：

[root@host ~]$ ssh-keygen  <== 建立密钥对
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): <== 按 Enter
Created directory '/root/.ssh'.
Enter passphrase (empty for no passphrase): <== 输入密钥锁码，或直接按 Enter 留空
Enter same passphrase again: <== 再输入一遍密钥锁码

Your identification has been saved in /root/.ssh/id_rsa. <== 私钥
Your public key has been saved in /root/.ssh/id_rsa.pub. <== 公钥

The key fingerprint is:
0f:d3:e7:1a:1c:bd:5c:03:f1:19:f1:22:df:9b:cc:08 root@host
密钥锁码在使用私钥时必须输入，这样就可以保护私钥不被盗用。当然，也可以留空，实现无密码登录。

现在，在 root 用户的家目录中生成了一个 .ssh 的隐藏目录，内含两个密钥文件。id_rsa 为私钥，id_rsa.pub 为公钥。
```


### 在服务器上安装公钥

```纯文本
键入以下命令，在服务器上安装公钥：

[root@host ~]$ cd .ssh
[root@host .ssh]$ cat id_rsa.pub >> authorized_keys
如此便完成了公钥的安装。为了确保连接成功，请保证以下文件权限正确：
[root@host .ssh]$ chmod 600 authorized_keys
[root@host .ssh]$ chmod 700 ~/.ssh
```


### 设置 SSH，打开密钥登录功能

编辑 /etc/ssh/sshd_config 文件，进行如下设置：

```bash
vim /etc/ssh/sshd_config 

RSAAuthentication yes
PubkeyAuthentication yes
#另外，请留意 root 用户能否通过 SSH 登录：
PermitRootLogin yes


#当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录：
PasswordAuthentication no
#最后，重启 SSH 服务：

[root@host .ssh]$ service sshd restart
```

