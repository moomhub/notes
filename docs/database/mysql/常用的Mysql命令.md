# 常用的Mysql操作命令

## CURD 

## 忽略错误，继续执行

```mysql
INSERT IGNORE  xxx () value ();
```

## 存在就更新，不存在则插入

```mysql
INSERT INTO t_emp_ip (id,  empno, ip) VALUES 
(5, 8004, "192.168.99.44"),
(6, 8005, "192.168.99.45"),
(7, 8006, "192.168.99.46"),
(8, 8001, "192.168.99.47")
ON DUPLICATE KEY UPDATE ip=VALUES( ip);
```



## 外连接

> 内连接里，查询条件写在ON子句或者WHERE子句，效果相同

```mysql
SELECT e.ename, d.dname
FROM t_emp e
JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename, d.dnameFROM t_emp e
JOIN t_dept d ON e.deptno = d.deptno 
WHERE d.deptno=10;

```



```mysql
SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno AND d.deptno=10;

SELECT e.ename,d.dnameFROM t_emp e
LEFT JOIN t_dept d ON e.deptno =d.deptno 
where d.deptno=10;

```





## 表连接修改

更新

> 修改 SALES 部门的名称 同时修改改部门员工的底薪为 10000元

```mysql
UPDATE t_emp e JOIN t_dept d oN e.deptno = d.deptnoAND d.dname= 'SALES'
SET e.sal=10000,d.dname="销售部";
```

删除

> 删除部门为销售部和部门员工删除

```mysql
DELETE e,d JOIN t_dept d oN e.deptno = d.deptno AND d.dname= '销售部';
```

8.0 修改密码方式

![image-20210913175154068](https://gitee.com/moomhub/img/raw/master/image-20210913175154068.png)

