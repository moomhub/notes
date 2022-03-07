# 视图
## 如何使用不存在的数据表（视图）

### 视图View

使用视图可以创建不存在的虚拟表，视图的原理是预设一个SELECT语句，SELECT语句的查询结果作为虚拟表的数据。

视图是一种虚拟存在的表，同真实表一样，视图也由列和行构成，但视图并不实际存在于数据库中。行和列的数据来自于定义视图的查询中所使用的表，并且还是在使用视图时动态生成的。

### 视图用法

> 1. SELECT 语句不能引用系统或用户变量。
> 2. SELECT 语句不能包含 FROM 子句中的子查询。
> 3. SELECT 语句不能引用预处理语句参数。
> 4. 对于UNDEFINED，MySQL将选择所要使用的算法。如果可能，它倾向于MERGE而不是TEMPTABLE，这是因为MERGE通常更有效，而且如果使用了临时表，视图是不可更新的。

```mysql
CREATE VIEW <视图名> AS <SELECT语句>
#算法选择
CREATE ALGORITHM = [UNDEFINED | MERGE | TEMPTABLE] VIEW <视图名> AS <SELECT语句>
```



### 视图算法的选择

> 一般来讲，MERGE的性能优于TEMPTABLE

MERGE：将视图SQL合并到主查询SQL中
TEMPTABLE：将视图作l临时表（中间结果)来处理 

### 无法使用MERGE的SQL

- 聚集函数 (max,min,avg,sum, bit and ,bit or, count...)
- DISTINCT
- GROUP BY
- HAVING
- UNION,UNION ALL
- 子查询

### 总结

视图可以在不改变原有数据的情况下，创建虚拟表
尽量使用MERGE算法，并避免无法使用MERGE的SQL
