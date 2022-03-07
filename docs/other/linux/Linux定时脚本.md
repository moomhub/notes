# Linux 定时脚本

# linux下每间隔一段时间执行脚本

```PowerShell
#!/bin/bash
while [ 1 = 1 ]
do
  nohup python run_summarization.py --mode=decode --pointer_gen=False --single_pass=True --data_path=/lab/jinhanqi/my_pointer_data/chunked/test_* --vocab_path=/lab/jinhanqi/my_pointer_data/vocab --log_root=/lab/jinhanqi/basic_seq2seq_attn/log --exp_name=no-pointer >decode.out 2>&1 & 
  sleep 15000;
done
```


每间隔15000s,执行一次该脚本

# Centos 配置开机启动脚本启动 docker 容器

I我们的 Centos 服务器上部署了好多个 docker 容器，因故重启的时候就会导致还得手动去手动重启这些 docker 容器，为什么不写个脚本自动重启呢，于是就有了这篇文章。

批量启动 Docker 容器

```bash
Copydocker start $(docker ps -aq) # 启动所有容器
docker start $(docker ps -aq -f status=exited) # 启动所有状态为exited 的容器，和上面的命令效果一致
```


对于有 link 有依赖项的需要先把对应的依赖项先启动，比如说我们有一个 identityserver 的 docker  容器（auth-server），别的容器启动的时候会 link 它，这时候就需要先启动 auth-server  再启动其他容器，这时启动脚本则需要稍加修改

```bash
Copydocker start auth-server # 先启动 auth-server 容器
docker start $(docker ps -aq -f status=exited) # 再启动所有状态为exited 的容器
```


写个 shell 脚本[#](https://www.cnblogs.com/weihanli/p/start-docker-containers-with-startup-scripts.html#1061158723)

写一个启动 startup 脚本，在系统启动的时候执行它<br />在一个你想放启动脚本的地方创建一个 startup.sh，我这里创建在了 /usr/local/scripts/startup.sh

文件内容如下：

```PowerShell
Copy#!/bin/bash
# start docker container
docker start auth-server
docker start $(docker ps -aq -f status=exited)
```


设置文件权限：

```bash
Copysudo chmod +x /usr/local/scripts/startup.sh
```


设置开机启动[#](https://www.cnblogs.com/weihanli/p/start-docker-containers-with-startup-scripts.html#388262687)

在 /etc/rc.d/rc.local 文件中添加开机启动执行脚本

sudo vi /etc/rc.d/rc.local 编辑文件，添加自定义的启动脚本

```纯文本
Copy#!/bin/bash
# THIS FILE IS ADDED FOR COMPATIBILITY PURPOSES
#
# It is highly advisable to create own systemd services or udev rules
# to run scripts during boot instead of using this file.
#
# In contrast to previous versions due to parallel execution during boot
# this script will NOT be run after all other services.
#
# Please note that you must run 'chmod +x /etc/rc.d/rc.local' to ensure
# that this script will be executed during boot.

touch /var/lock/subsys/local
/usr/local/scripts/startup.sh # 新增自定义启动脚本
```


设置文件权限

```纯文本
Copychmod +x /etc/rc.d/rc.local
```


重启验证[#](https://www.cnblogs.com/weihanli/p/start-docker-containers-with-startup-scripts.html#2305985972)

执行 sudo reboot 重启服务器，稍后重新连接，执行 docker ps 查看在运行的 docker 镜像，有 docker 在运行就说明我们的启动脚本正常执行了~~

