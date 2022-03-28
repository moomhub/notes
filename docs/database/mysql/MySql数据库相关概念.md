# MySql 数据库

## 数据库函数

### 存储过程

存储过程是一个编译后的 SQL 脚本集合，可以单独调用，但是不能用在 SQL 语句中

### 存储过程的优点

存储过程是编译过的 SQL 脚本，所以执行的速度非常快
实现了 SQL 编程，可以降低锁表的时间和锁表的范围

### 为什么要放弃数据库编程?

在数据库集群场景里，因为存储过程、触发器和自定义函数，都是在本地数据库执行，所以无法兼容集群场景。

## Mysql 读写解决方案

### 系统负载解决的方案

#### 低价值的数据（读多写少）

可以采用 NoSQL 数据库来存储这些数据，NoSQL 没有抛弃了复杂的表结构和约束，数据的写入速度很快

#### 高价值的数据（写多读少）

可以用 TokuDB 来保存，TokuDB 的写入速度的是 lnnoDB 的 9~20 倍

## MySql 读写锁机制

### 什么是锁机制

lnnoDB 采用的是行级锁，删改数据的时候，MySQL 会锁住记录

> 排它锁不允许对数据再另行加锁

共享锁和排它锁

1. 行级锁分为共享锁(S 锁)和排它锁（X 锁)
2. 共享锁和排它锁，都不允许其他事务执行写操作，但是可以读数据

### 共享锁

只有 serializable 事务隔离级别，才会给数据读取添加共享锁

```mysql
SELECT .......FROM .......LOCK IN SHARE MODE;
```

### 排它锁

MySQL 默认会给添加、修改和删除记录，设置排它锁

```mysql
SELECT .......FROM .......FOR UPDATE;
```

### 如何减少并发操作的所冲突?

把复杂的 SQL 语句，拆分成多条简单的 SQL 语句

数据库修改密码编码方式

```mysql
ALTER USER 'root'@'%' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'abc123456';
```

## 数据库事务

避免直接操作数据文件

![image-20210913114826154](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913114826154.png)

#

## XSS 攻击

XSS(跨站脚本)攻击，是让浏览器渲染 DOM 的时候意外的执行了恶意 JS 代码
XSS 攻击的原理是在网页中嵌入一个恶意脚本
img src="null" onerror='alert( document.cookie)'/>

### AntiSamy

AntiSamy 是开源的 Java 类库，可以用来过滤 XSS 恶意代码

```xml
<dependency>
	<groupId>org.owasp.antisamy</groupId>
    <artifactId>antisamy</artifactId>
	<version>1.5.5</version>
</dependency>
```

![image-20210914165918851](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210914165918851.png)

![image-20210914165943393](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210914165943393.png)

### Jsoup（推荐使用）

使用 Jsoup 防止富文本 XSS 攻击

## MySQL 常用工具

### Percona Tookit

#### Download

[Download Percona Toolkit](https://www.percona.com/downloads/percona-toolkit/LATEST/)

解压相关数据包

```bash
tar -zxvf percona-toolkit-3.3.1_x86_64.tar.gz
tar xzvf xxx.tar.gz -C /tmp/xxx
```

进入 /bin 目录

#### 使用

使用 PerconaTookit 工具：Percona 公司提供了维护 MySQL 的 PerconaTookit 工具包
pt-online-schema-change 可以完成在线修改表结构

|    参数    | 实际含义 |   参数    | 实际含义 |
| :--------: | :------: | :-------: | :------: |
|   --host   | IP 地址  |     t     |  数据表  |
|   --user   |  用户名  |  --alter  | 修改语句 |
| --password |   密码   | --execute | 执行修改 |
|   --port   |  端口号  | --dry-run | 测试执行 |
|     D      |  逻辑库  |  --print  | 打印过程 |

数据库语句参考

> 把数据为：neti 数据表为 t_customer_address 收货人字段：name 改成 VARCHAR(20)

```bash

pt-online-schema-change --host=192.168.99.202 --port=3306 --user=root --password=abc123456 --alter "MODIFY name VARCHAR(20) NOT NULL COMMENT '收货人" D=neti, t=t_customer_address --print --execute
```
