# Mysql 数据日志

## Mysql 日志

数据库在更新时，会产生 binlog、redo log、undo log
binlog: server 层产生的逻辑日志
redo log: InnoDB 产生的物理日志，保证持久化
undo log: InnoDB 产生的逻辑日志，保证隔离性、原子性

Mysql 日志体系

MySQL 为了满足主从复制、事务等，有复杂的日志体系 Server 层产生 binlog，用来进行数据复制
InnoDB 产生 undo log.redo log，用来实现事务 ACID
MySQL 的日志体系不是主要不是用来看的，而是运行必要的

## binlog 归档日志

Binlog 是 server 层产生的逻辑日志
用来进行数据复制和数据传送
Binlog 完整记录了数据库每次的数据操作，可作为数据闪回手段

记录在专门的文件夹中

## undo log 回滚日志

lnnoDB 自身产生的逻辑日志，用于事务回滚和展示旧版本
对任何数据（缓存)的更新，都先写 undo log
undo log 位于表空间的 undo segment 中
SQL: UPDATE name = 'b’→undo: UPDATE name = 'a'

## redo log 重做日志

重做日志重做日志

lnnoDB 自身产生的物理日志，记录数据页的变化

lnnoDB “日志优先于数据”，记录 redo log 视为数据已经更新
内存中的数据更新后写重做日志，数据被写入硬盘后删除

binlog 储存在 4 个 1GB 文件中，并且循环写入

![image-20210906145624154](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210906145624154.png)

## redo log 刷盘

innodb_flush_log_at_trx_commit 参数控制 redo log 刷盘
0:异步每秒刷盘
1:每 1 个事务刷盘
N:每 N 个事务刷盘
建议设置为 1，保证数据安全

## binlog 刷盘

sync_binlog 参数控制 binlog 刷盘
0∶ 自动控制刷盘
1:每 1 个事务刷盘
N:每 N 个事务刷盘
建议设置为 1，保证数据安全

## 持久化分析

redo log 刷盘前系统崩溃:
数据丢失
redo log 刷盘后系统崩溃:
重启时会对 redo log 进行重放、重写内存中数据页、重写 binlog

## 为什么 redo log 在 binlog 之前

redo log 是系统关键节点，想到于“决断点”
binlog 一旦写入无法撤回，因为可能已经被传送至备库

WAL

MySQL 日志主要有 binlog、undo log、redo log
MySQL 实行日志优先的策略，日志刷盘，数据就不会丢失
