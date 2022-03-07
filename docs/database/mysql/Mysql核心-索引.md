# 数据的表的优化

## 索引组织表(Index Organized Table)

- 索引组织表不是一种“组织表”
- 索引组织表是由索引“组织起来的”表
- lnnoDB中，表都是根据**主键顺序**组织存放的

## 索引(Index)

说明:

- 索引是数据库中对某一列或多个列的值进行预排序的数据结构

- 参考目录

- 主键是一种特殊的索引

<hr style="height:1px;border:none;border-top:1px dashed #0066CC;" /> 

从逻辑角度

- 普通索引
  - index :加速查找
- 唯一索引
  - 主键索引：primary key ：加速查找+约束（不为空且唯一）
  - 唯一索引：unique：加速查找+约束 （唯一）
- 联合索引
  - primary key(id,name):联合主键索引
  - unique(id,name):联合唯一索引
  - index(id,name):联合普通索引
- 全文索引fulltext :用于搜索很长一篇文章的时候，效果最好。
- 空间索引spatial :了解就好，几乎不用

### 建表时创建

> 说明：
>
> **UNIQUE**:可选。列值不能重复；即索引列值必须是唯一的，但**可以是空值**。
> **FULLTEXT**:可选。表示索引为全文索引。
> **SPATIAL**:可选。表示索引为空间索引。
> **INDEX和KEY**:用于指定字段为索引，两者选择其中之一就可以了，作用是    一样的。
> **索引名**:可选。给创建的索引取一个新名称。
> **字段名1**:指定索引对应的字段的名称，该字段必须是前面定义好的字段。
> **长度**:可选。指索引的长度，必须是字符串类型才可以使用。
> **ASC**:可选。表示升序排列。
> **DESC**:可选。表示降序排列。

```cjiamysql
CREATE TABLE 表名(
	字段名 数据类型 [完整性约束条件],
     .....,
	#[UNIQUE | FULLTEXT | SPATIAL] INDEX | KEY [索引名] (字段名1 [(长度)] [ASC | DESC]) [USING 索引方法]
);
```

### 在建表之后创建

```
ALTER TABLE 表名 ADD [UNIQUE | FULLTEXT | SPATIAL]  INDEX | KEY  [索引名] (字段名1 [(长度)] [ASC | DESC]) [USING 索引方法]；

CREATE  [UNIQUE | FULLTEXT | SPATIAL]  INDEX  索引名 ON  表名(字段名) [USING 索引方法]；
```

### 主键(Primary Key) 特殊的索引

**MyISAM**：允许没有任何索引和主键的表存在，索引都是保存行的地址。
**InnoDB**：如果没有设定主键或者非空唯一索引，就会自动生成一个6字节的主键。

### 常用索引操作

```mysql
#建表时创建索引
CREATE TABLE `inventory_1` (
  `inventory_id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `film_id` SMALLINT UNSIGNED NOT NULL,
  `store_id` TINYINT UNSIGNED NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  KEY `idx_fk_film_id` (`film_id`)
) ENGINE=INNODB AUTO_INCREMENT=4582 DEFAULT CHARSET=utf8;

#新增索引
ALTER TABLE inventory_0001 ADD INDEX `idx_fk_last` (`last_update`);
#删除索引
DROP INDEX idx_fk_last ON inventory_0001;
#删除索引
ALTER TABLE inventory_0001 DROP INDEX idx_fk_last;
# 重命名索引
ALTER INDEX idx_fk_last RENAME TO idx_fk_lasts;
```



## 索引的左侧用法 

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
> 取邮箱字段的前6位

```mysql
alter table user add index index2(email(6))
```

字符串的前缀索引
如果前缀区分度太小，可以考虑两种变通方法:

#### 倒序存储

新建一个 hash_crc 字段代替原本字段进行查询 ，该hash字段需要索引 

通过倒序来存储相关字段

```mysql
SELECT REVERSE('http://www.mysql.com');
#参考实现
select * from table_test where hash_crc = REVERSE('123123@qq.com');
#或者业务层实现
```

#### 新增hash字段

新增hash crc 字段用来校验相关参数

```mysql
SELECT crc32('http://www.mysql.com');
SELECT crc64('http://www.mysql.com');
#参考实现
select * from table_test where hash_crc = crc32('178989123123');
#或者业务层实现
```

### 字符串like只支持右模糊

会使索引失效

```mysql
like %关键字% and like %关键字
```

右模糊才可以使用索引

```mysql
like 关键字%  
```

