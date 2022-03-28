# Mysql 数据库设计

> 确定相关的数据模型和数据业务，根据围绕的业务来进行设计
>
> 1.  需求分析:根据用户的需求，分析出需要记录的数据
> 2.  概要设计:根据分析出的数据，设计 ER 图
> 3.  详细设计:将 ER 图转换成数据库模型图和数据表

## 数据模型

### 瀑布模型

![image-20210913095243953](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913095243953.png)

### 螺旋模型

![image-20210913095326810](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913095326810.png)

### 使用 visio 图制定 ER 图

![image-20210913100910944](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913100910944.png)

### 数据库模型图

![image-20210913100917851](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210913100917851.png)

## 数据库引擎

TokuDB 引擎（（过期数据存储）归档数据表）> InnoDB 引擎>MyISAM 引擎

## 数据库常用操作

### 忽略错误，继续执行

> IGNORE 关键字

```mysql
INSERT IGNORE  xxx () value ();
```

### 存在就更新，不存在则插入

> ON DUPLICATE KEY UPDATE ip=VALUES(ip);

```mysql
INSERT INTO t_emp_ip (id,  empno, ip) VALUES
(5, 8004, "192.168.99.44"),
(6, 8005, "192.168.99.45"),
(7, 8006, "192.168.99.46"),
(8, 8001, "192.168.99.47")
ON DUPLICATE KEY UPDATE ip=VALUES(ip);
```

要不要使用子查询

因为 MyBatis 等持久层框架开启了缓存功能，其中一级缓存就会保存子查询的结果，所以可以可放心使用子查询
结论: SQL 控制台不要使用子查询，在持久层框架中则可以使用

如何代替子查询

from 子查询 代替 where 子查询

> from 子查询 执行一次

```mysql
select * from temp t
join (xxx) a on a.aa> t.xx and xxx
```

外连接

> 内连接里，查询条件写在 ON 子句或者 WHERE 子句，效果相同

```mysql
SELECT e.ename, d.dname
FROM t_emp e
JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;
# 相同
SELECT e.ename, d.dnameFROM t_emp e
JOIN t_dept d ON e.deptno = d.deptno
WHERE d.deptno=10;

```

外连接不行

```mysql
SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno
where d.deptno=10;

```

表连接修改

更新

> 修改 SALES 部门的名称 同时修改改部门员工的底薪为 10000 元

```mysql
UPDATE t_emp e JOIN t_dept d oN e.deptno = d.deptnoAND d.dname= 'SALES'
SET e.sal=10000,d.dname="销售部";
```

删除

> 删除部门为销售部和部门员工删除

```mysql
DELETE e,d JOIN t_dept d oN e.deptno = d.deptno AND d.dname= '销售部';
```
