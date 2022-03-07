# Dockers 命令说明

## 常用命令

启动、停止、重启容器

```shell
docker start [NAMe]
docker stop	 [NAMe]
docker restart [NAMe]
```

进入容器

```shell
docker exec -it [NAME] /bin/bash
```

root身份进入容器

```shell
docker exec -ti -u root [NAME] bash
```

查询镜像

```shell
docker images
```

删除镜像

```shell
 docker rmi [IMAGES]
```

查询容器

```shell
docker ps -a
```

删除容器

```shell
docker rm -f [NAME]
```

查询运行日志

```shell
docker logs -t -f [name]
```

列出所有的数据卷

```shell
docker volume ls
```

删除所有未被使用的卷

```shell
docker volume rm $(docker volume ls -qf dangling=true)
```

输出所有容器

```
docker rmi -f $(docker images -aq)
```

拷贝容器内的文件

```
docker exec -it ps cat /etc/my.cnf > /opt/docker/percona-server/conf/my.conf
```



## Docker 命令

### Docker 日志

```
docker logs [Option] [NAME]
```

Options说明

```shell
Options:
--details 显示更多的信息
-f, --follow 跟踪实时日志
--since string 显示自某个timestamp之后的日志，或相对时间，如40m（即40分钟）
--tail string 从日志末尾显示多少行日志， 默认是all
-t, --timestamps 显示时间戳
--until string 显示自某个timestamp之前的日志，或相对时间，如40m（即40分钟）
```

例子

```shell
例：实时查看docker容器名为Logs的最后10行日志
docker logs -f -t --tail 10 Logs
例：查看指定时间后的日志，只显示最后100行：
docker logs -f -t --since="2018-02-08" --tail=100 Logs
例：查看最近30分钟的日志:
docker logs --since 30m Logs
例：查看某时间之后的日志：
docker logs -t --since="2018-02-08T13:23:37" Logs
例：查看某时间段日志：
docker logs -t --since="2018-02-08T13:23:37" --until "2018-02-09T12:23:37" Logs
例：将错误日志写入文件：
docker logs -f -t --since="2018-02-18" Logs | grep error >> logs_error.txt
```



### Docker 卷

列出所有的数据卷

```shell
docker volume ls
```

使用--filter dangling=true 过滤 不在使用的数据卷

```shell
docker volume ls   --filter dangling=true
```

2、创建一个数据卷，可以设置，--name，--path，--mode。 也可以不用

拥有一切自动生成的参数

```shell
docker volume create
```

3、删除一个数据卷

```shell
docker volume rm <volume name>
```

4、容器正在使用的数据卷不能删除，绑定挂载的无法删除。

```shell
docker volume ls   --filter dangling=true
docker volume ls   --filter dangling=true | grep local |awk '{print $2}'|xargs docker volume rm
```

## RUN 命令

```shell
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

OPTIONS说明

| 参数       | 说明                                                      | 参数         | 说明                                             |
| ---------- | --------------------------------------------------------- | :----------- | ------------------------------------------------ |
| -a         | 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项。 | -d           | 后台运行容器，并返回容器ID                       |
| -e         | 设置环境变量                                              | -h           | 指定容器的hostname                               |
| -i         | 以交互模式运行容器，通常与 -t 同时使用                    | -t           | 为容器重新分配一个伪输入终端，通常与 -i 同时使用 |
| -m         | 设置容器使用内存最大值                                    | -p           | 随机端口映射，容器内部端口随机映射到主机的端口   |
| -v         | 绑定一个卷                                                | --cpuset     | 绑定容器到指定CPU运行                            |
| --dns      | 指定容器使用的DNS服务器，默认和宿主一致                   | --dns-search | 指定容器DNS搜索域名，默认和宿主一致              |
| --env-file | 从指定文件读入环境变量                                    | --expose     | 开放一个端口或一组端口                           |
| --link     | 添加链接到另一个容器                                      | --name       | 为容器指定一个名称                               |
| --net      | 指定容器的网络连接类型                                    |              |                                                  |

例子：

```shell
docker run --name some \
-v /opt/docker/pxc-server/data:/var/lib/mysql \
-e INIT_ROCKDB=1 \
-e MYSQL_ROOT_PASSWORD=123456 \
--privileged=true \
--restart=always \
-d -i -t -p 3306:3306 percona/percona-server:8.0
```

```
docker run --name ps \
-e MYSQL_ROOT_PASSWORD=123456 \
--privileged=true \
--restart=always \
-d -i -t -p 3306:3306 percona/percona-server:latest

docker exec -it ps cat /etc/my.cnf > /opt/docker/percona-server/conf/my.conf
```

