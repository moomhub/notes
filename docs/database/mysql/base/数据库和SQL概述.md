# 数据库和SQL概述

### DML

DML（Data Manipulation Language):数据操纵语句，用于添加、删除、修改、查询数据库记录，并检查数据完整性。包括如下SQL语句等：

- INSERT：添加数据到数据库中
- UPDATE：修改数据库中的数据
- DELETE：删除数据库中的数据
- SELECT：选择（查询）数据（SELECT是SQL语言的基础，最为重要。）

### DDL

DDL（Data Definition Language):数据定义语句，用于库和表的创建、修改、删除。包括如下SQL语句等：

- CREATE TABLE：创建数据库表
- ALTER TABLE：更改表结构、添加、删除、修改列长度
- DROP TABLE：删除表
- CREATE INDEX：在表上建立索引
- DROP INDEX：删除索引

### DCL

DCL（Data Control Language):数据控制语句，用于定义用户的访问权限和安全级别包括如下SQL语句等：

- GRANT：授予访问权限
- REVOKE：撤销访问权限
- COMMIT：提交事务处理
- ROLLBACK：事务处理回退
- SAVEPOINT：设置保存点
- LOCK：对数据库的特定部分进行锁定

### DQL

数据查询语言：简称DQL(Data Query Language)，用来查询数据库中表的记录。关键字：select，from，where等