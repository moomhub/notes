# Mysql 语句优化

> 使用 MySQL 官网提供的测试数据库来进行演示（DVD 租赁公司）

## where 查询过慢

使用索引覆盖进行优化 where 语句。

覆盖索引指的是:查询语句从执行到返回结果均使用同一个索引，覆盖索引可以有效减少回表

> 覆盖索引通过取消回表操作，提升查询效率，若数据的查询不只使用了一个索引，则不是覆盖索引，可以通过优化 SQL 语句或优化联合索引，来使用覆盖索引

```mysql
SHOW CREATE TABLE inventory;
# 创建表
CREATE TABLE `inventory_1` (
  `inventory_id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `film_id` SMALLINT UNSIGNED NOT NULL,
  `store_id` TINYINT UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  KEY `idx_fk_film_id` (`film_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

#复制数据
INSERT INTO inventory_1 SELECT * FROM inventory;

SELECT store_id, film_id FROM sakila.inventory WHERE store_id = 1;

SELECT store_id, film_id FROM sakila.inventory_1 WHERE store_id = 1;

EXPLAIN SELECT store_id, film_id FROM sakila.inventory WHERE store_id = 1;

EXPLAIN SELECT store_id, film_id FROM sakila.inventory_1 WHERE store_id = 1;

#索引覆盖
EXPLAIN SELECT inventory_id, store_id, film_id FROM sakila.inventory WHERE store_id = 1;
#回滚数据表 (减少不必要的字段) （查询中的字段中使用了last_update字段，该字段在数据库中并无索引）
EXPLAIN SELECT inventory_id, store_id, film_id,last_update FROM sakila.inventory WHERE store_id = 1;
```

### 如何确定合适的索引

如何确定用哪条索引

MySQL 在选取索引时，会参考索引的基数(Cardinality)、基数是 MySQL 估算的，反映这个字段有多少种取值

> 如果数据量过大，MySQL 会自动选取几个页算出取值的平均值，再乘以页数，即为基数

参考

```mysql
#创建测试表并插入数据
CREATE TABLE `city_1` ( `city` VARCHAR(50) NOT NULL) ;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
INSERT INTO sakila.city_1 SELECT city FROM sakila.city;
# 打乱排序
UPDATE city_1 SET city =(SELECT city FROM city ORDER BY RAND() LIMIT 1);


#通过取前缀索引来划分相关的基数
ALTER TABLE sakila.city_1 ADD key (city(1));
ALTER TABLE sakila.city_1 ADD key (city(2));
ALTER TABLE sakila.city_1 ADD key (city(3));
ALTER TABLE sakila.city_1 ADD key (city(4));
ALTER TABLE sakila.city_1 ADD key (city(5));
ALTER TABLE sakila.city_1 ADD key (city(6));
ALTER TABLE sakila.city_1 ADD key (city(7));
ALTER TABLE sakila.city_1 ADD key (city(8));

SHOW INDEX FROM city_1
```

![image-20210901161152550](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/gawfzdjZroSep2h.png)

### 重新计数

> analyze table 可以重新统计索引信息重新统计索引信息时，会重新计算索引的基数

```mysql
analyze table city_1;
```

### 强制使用某个索引

> 关键字: force index('xxx')

例子

```mysql
SELECT * FROM city_1 FORCE INDEX ('xxx') where xxx
```

## count() 计数优化

MySQL count()函数用来统计结果集中不为 null 的数据个数

1. 首先存储引擎查询出结果集
2. server 层逐个结果判断是否为 null，不为 null 则加 1

**理论上：count(非索引字段) < count(索引字段) < count(1) < count(\*)**

### count(非索引字段)

count(非索引字段)时，server 层需要判断每个数据是否为 null

### count(索引字段)

count(索引字段)，可以覆盖，依然需要每次判断字段是否为 null，count(主键)，同理

### count(1)

count(1)只有扫描索引树，没有解析数据行的过程，理论更快，但 Server 层依然每次需要判断“1 是否为 null"

### count(\*)

`count(*)`一般用来返回数据表行数
MylSAM 的`count(*)`直接返回数据库中记录的数据表行数，由于 InnoDB 支持事务，数据库中不记录数据表行数
MySQL 专门优化了 count(\*)函数直接返回索引树中数据的个数

## order by 优化

### ORDER BY 步骤原理

```mysql
SELECT * FROM `film` WHERE film_id > 80 ORDER BY title;
#执行步骤
#1、查询where 语句
SELECT * FROM `film` WHERE film_id > 80
#2、进行order排序
ORDER BY title
#3、回表生成完整结果集（若需要)
```

### 优化 order by 中间结果集

> 原理：中间表较小时,会直接防止内存中，较大 **sort_buffer_size** 时 放在硬盘中。

优化内存占用 :减少 sort_buffer_size 减少内存 直接走硬盘数据(不推荐)

增大 sort_buffer_size (推荐)

### 优化 order by 回表生成完整结果集

> 当行小于 max_length_for_sort_data 时，生成全字段中间表

大于阈值时，只生成排序字段＋主键中间表，需要回表，调大阈值并不一定改善效率，因为太大的结果集排序效率低

### order by 进行索引覆盖

通过对中间进行索引

```mysql
#ORDER字段需要有索引(或在联合索引左侧)\其他相关字段(条件、输出)均在上述的索引中
SELECT film_id, title FROM `film` ORDER BY title;

#如果需要添加where 只能对索引进行where 处理
SELECT film_id, title FROM`film` where title like 'M%' ORDER BY title
```

## order by rand() 优化(随机取法进行优化)

### ORDER BY RAND()原理

```mysql
SELECT title, description FROM `film`ORDER BY RAND()LIMIT 1;
# 执行顺序
1.创建一个临时表，临时表的字段为rand . title、description

2.从表中取出一行，调用RAND()，将结果和数据放入临时表，以此类推

3.针对临时表，将rand字段+行位置（主键)放入sort buffer
```

执行顺序

![image-20210901175007507](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/4MeCskRzG7bcyIF.png)

![image-20210901175017031](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/mtKfisCzeRYONVI.png)

![image-20210901175052299](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/UxFpEtMRC2vP5Iq.png)

![image-20210901175208423](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/ahtgmer4YiQFcEN.png)

### 为什么会慢?

SQL 执行过程中出现了两次中间结果，都是全长度的、仅需要一个随机结果，缺经历了不必要的排序（虽然优化过)，调用了很多次 RAND()。

### 解决方法-临时优化方法

```mysql
select max(film_id),min(film_id) into @M,@N from film ;
set @X= floor((@M-@N+1)*rand() +@N);
select title, description from film where film_id >= @X limit 1;
```

### 解决方法-业务方案（推荐）

解决方法-业务方案
查询数据表总数 total（总数）
total 范围内，随机选取一个数字 r 执行以下 SQL:

```mysql
select count(*) from film;
# 业务层进行随机取值，然后在执行相关语句
select title, description from film limit r, 1
```

## 优化联合查询

### 索引下推（Version<=5.6）

用下列方式建表:

```mysql
CREATE TABLE `inventory_3`(
    `inventory_id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `film_id` SMALLINT UNSIGNED NOT NULL,
    `store_id` TINYINT UNSIGNED NOT NULL,
    `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`inventory_id`),
    KEY `idx_store_id_film_id` (`store_id`, `film_id`)
)ENGINE=INNODB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
INSERT INTO inventory_3 SELECT * FROM inventory
#索引下推SELECT
# 先查询的 store_id 结果是乱序的
# 再执行  film_id 去查询  (因为之前已经查询了store_id  就可以根据 film_id 来查询 而不是再去走inventory_id)
SELECT * FROM`inventory_3` WHERE store_id in (1, 2) and film_id = 3;
```

![image-20210916145631423](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/image-20210916145631423.png)

## 索引左侧用法

### 联合索引

使用两个或以上字段生成的索引，联合索引也可以加速“最左前缀”的查询联合索引可以代替最左侧字段的单独索引

> 非常重要： “带头大哥不能死，中间兄弟不能丢。”（必须要全查或者只查左边的值）

```mysql
参考有：A\B\C 联合索引三个字段，进行`where`查询时

where 查询 A
where 查询 A|B
where 查询 A|B|C
```

### 字符串前缀索引

如果需要查询的字段太长导致索引查询也会变慢，如果数据都有某些相同的特性可以使用前缀索引

> 某些业务场景下可以使用前缀索引（某县城的身份证查询业务）
> 取邮箱字段的前 6 位

```mysql
alter table user add index index2(email(6))
```

字符串的前缀索引
如果前缀区分度太小，可以考虑两种变通方法:

#### 倒序存储

新建一个 hash_crc 字段代替原本字段进行查询 ，该 hash 字段需要索引

通过倒序来存储相关字段

```mysql
SELECT REVERSE('http://www.mysql.com');
#参考实现
select * from table_test where hash_crc = REVERSE('123123@qq.com');
#或者业务层实现
```

#### 新增 hash 字段（推荐）

新增 hash crc 字段用来校验相关参数

```mysql
SELECT crc32('http://www.mysql.com');
SELECT crc64('http://www.mysql.com');
#参考实现
select * from table_test where hash_crc = crc32('178989123123');
#或者业务层实现
```

### 字符串 like 只支持右模糊

会使索引失效

```mysql
like %关键字% and like %关键字
```

右模糊才可以使用索引

```mysql
like 关键字%
```

## IS NULL 优化

```mysql
SELECT ename FROM t_emp WHERE comm IS NULL; #不使用索引
SELECT ename FROM t_emp WHERE comm =-1;
```

## 尽量少用 != 运算符

```mysql
SELECT ename FROM t_emp WHERE deptno!=20; #不使用索引
SELECT ename FROM t_emp WHERE deptno<20 AND deptno>20;
```

## 尽量少用 IN 和 NOT IN 运算符

```mysql
SELECT ename FROM t_emp WHERE deptno IN (20,30); #不使用索引
SELECT ename FROM t_emp WHERE deptno=20
UNION ALL
SELECT ename FROM t_emp WHERE deptno=30;
```

## 在表达式左侧使用运算符和函数都会让索引失效

```mysql
#不使用索引
SELECT ename FROM t_emp WHERE salary*12>=100000;

SELECT ename FROM t_emp WHERE salary>=100000/12;
#不使用索引
SELECT ename FROM t_emp WHERE year(hiredate)>=2000;
SELECT ename FROM t_emp
WHERE hiredate>='2000-01-01 00:00:00';
```

### 为什么扫描行数非常少?

MySQL5.6 之前，需要先使用索引查询 store_id in (1,2)再全部回表验证 film_id = 3，MySQL5.6 之后，如果索引中可以判断，直接使用索引过滤。

### 松散索引扫描（MySql 8.0 才支持）

Mysql 8.0 才支持

```mysql
#全表扫描
SELECT * FROM `inventory_3` WHERE film_id = 3;
#松散索引扫描
```

## 索引失效，不走索引

### 字段进行了函数操作

```mysql
SELECT * FROM`inventory` WHERE film_id+1 =100;
```

### 时间函数

使用 month()函数后，无法使用索引

```mysql
EXPLAIN SELECT * FROM `rental` WHERE MONTH(rental_date)= 5
```

解决方案：需要去掉 month()函数，换成 between

```mysql
SELECT * FROM `rental` WHERE rental_date BETWEEN '2005-5-1' AND '2005-6-1' OR rental_date BETWEEN '2006-5-1'AND '2006-6-1'
```

### 字符串与数字比较

MySQL 中若出现字符串与数字比较，会将字符串转换为数字。**字符 数字转字符、数字 字符转数字**，也会出现无法通过索引来查找.

参考

```mysql
select * from t1 where f1=6;
#如果t1表中f1字段为varchar类型，则此SQL相当于:
select* from t1 where CAST(f1 AS signed int)=6;
```

### 隐式字符编码转换

MySQL 中,utf8 与 utf8mb4 字段比较时，会把 utf8 转为 utf8mb4 上一页的 SQL 相当于:

```mysql
select t2.* from t1, t2 where t1.f1=CONVERT(t2.f1 USING utf8mb4) and t1.f2=6;
#解决方法:将查询条件转换为索引字段的编码
select t2.* from t1, t2 where cONVERT(t1.f1 USING utf8)= t2.f1 and t1.f2=6;
```

## 分页查询优化

### 偏移量大时，效率低

执行顺序

```mysql
SELECT film_id, title, description FROM `film` ORDER BY title LIMIT 900,10;
#执行索引
# 1、
SELECT film_id, title, description FROM `film` ORDER BY title;
# 2、
LIMIT 900,10;
```

### 优化 SQL

```mysql
得到所需数据的主键
SELECT film_id FROM`film`ORDER BY title LIMIT 900,10;
原表与上面的结果连表，获取最终结果
SELECT f.film_id, f.title, f.description FROM`film`f
INNER JOIN (SELECT film_id FROM `film`ORDER BY title LIMIT 900,10 ) m ON f.film_id = m.film_id;
```

排序偏移量大时，会丢弃大量无用数据，导致效率低下，可以采取先索引覆盖，再用最终 ID 回表的方法，优化效率

### 要不要使用子查询

因为 MyBatis 等持久层框架开启了缓存功能，其中一级缓存就会保存子查询的结果，所以可以可放心使用子查询。

#### 结论

SQL 控制台不要使用子查询，在持久层框架中则可以使用

#### 如何代替子查询

from 子查询 代替 where 子查询

> from 子查询只执行一次

推荐使用：

```mysql
select * from temp t
join (temp_1) t_1 on t_1.aa> t.aa;
```

不推荐使用

```mysql
select * from temp t, temp_1 t_1
where t.aa> t_1.aa ;
```
