# 数据库设计

线上+线下=新零售

# 数据表设计

### SPU

产品表

### SKU

商品信息

SKU(Stock Keeping Unit)是库存进出计量的单位，SKU是物理上不可分割的最小存货单元。



## 商品（SKU）与权重

新零售平台主要是B2C的，所以修改SKU对权重的影响不大。但是B2B的平台，修改SKU对商品权重影响很大。



## 商品（SKU） 参数绑定



商品品类和参数的关系



![image-20210913135002982](http://cdn.oboom.top/doc/image-20210913135002982.png)

相关联系

![image-20210913135041629](http://cdn.oboom.top/doc/image-20210913135041629.png)



品类表和参数表



```mysql
create database neti;


CREATE TABLE t_spec_group(
 `id` VARCHAR(32) PRIMARY KEY COMMENT "主键",
 `spg_id` VARCHAR(32) NOT NULL COMMENT "品类编号",
 `name` VARCHAR(200) NOT NULL COMMENT "名称",
 UNIQUE KEY unq_spg_id(spg_id),
 UNIQUE KEY unq_spg_name(`name`),
 INDEX idx_spg_id(spg_id)
)COMMENT="品类表"

CREATE TABLE t_spec_param(
id VARCHAR(32) PRIMARY KEY  COMMENT "主键", 
spg_id VARCHAR(32) NOT NULL COMMENT "品类编号",
spp_id VARCHAR(32) NOT NULL COMMENT "参数编号",
`name` VARCHAR( 280) NOT NULL COMMENT "参数名称",
`numeric` BOOLEAN NOT NULL COMMENT "是否为数字参数",
unit VARCHAR(200) COMMENT "单位(量词)",
generic BOOLEAN NOT NULL COMMENT "是否为通用参数",
searching BOOLEAN NOT NULL COMMENT "是否用于通用搜索",
segements VARCHAR( 508) COMMENT"参数值",
INDEX idx_spg_id(spg_id),
INDEX idx_spp_id(spp_id)
)COMMENT="参数表";

CREATE TABLE `t_brand` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `name` varchar(280) NOT NULL COMMENT '名称',
  `image` varchar(500) DEFAULT NULL COMMENT '图片网址',
  `letter` char(1) NOT NULL COMMENT '品牌首字母',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_name` (`name`),
  KEY `idx_letter` (`letter`)
) COMMENT='品牌表'


CREATE TABLE t_category(
id VARCHAR(32) PRIMARY KEY  COMMENT "主键", 	
`name` VARCHAR( 280) NOT NULL COMMENT "分类名称",
parent_id VARCHAR(32) COMMENT "上级分类菜单",
if_parent BOOLEAN NOT NULL COMMENT "是否含有下级分类",
sort INT UNSIGNED NOT NULL COMMENT "排名指数",
INDEX idx_parent_id(parent_id),
INDEX idx_sort(sort)
)COMMENT="商品分类表";



CREATE TABLE t_category_brand(
category_id VARCHAR(32) COMMENT "分类",
brand_id VARCHAR(32)  COMMENT "主键",
PRIMARY KEY (category_id,brand_id)
)COMMENT="品牌与分类关联表";


CREATE TABLE t_spu(
	id varchar(32) PRIMARY KEY COMMENT'主键',
    title VARCHAR( 200) NOT NULL COMMENT '标题',
    sub_title VARCHAR( 200) COMMENT'副标题',
    category_id INT UNSIGNED NOT NULL COMMENT '分类ID',
    brand_id INT UNSIGNED COMMENT '品牌ID',
    spg_id INT UNSIGNED NOT NULL COMMENT '品类ID',
    saleable BOOLEAN NOT NULL COMMENT '是否上架',
    valid BOOLEAN NOT NULL COMMENT '是否有效',
    create_time TIMESTAMP NOT NULL DEFAULT NOW() COMMENT '添加时间',
    last_update_time TIMESTAMP NOT NULL DEFAULT NOw() COMMENT '最后修改时间',
    INDEX idx_brand_id(brand_id),
    INDEX idx_category_id(category_id),
    INDEX idx_spg_id(spg_id),
    INDEX idx_saleable(saleable),
    INDEX idx_valid(valid)
)COMMENT="产品表";



```







# 商品秒杀业务

## 库存超售

怎么预防数据库超售现象?

### 使用事务隔离

设置数据库事务的隔离级别Serializable

![image-20210914110223115](http://cdn.oboom.top/doc/image-20210914110223115.png)

### 使用乐观锁实现

![image-20210914110358000](http://cdn.oboom.top/doc/image-20210914110358000.png)

### 使用redis 库存

#### Redis中的超售现象

因为Redis的单线程是非阻塞执行的，所以并发修改数据容易产生超售的结果

#### Redis避免超售现象

Redis引入了事务机制(批处理)，一次性把多条命令传递给Redis执行，这就避免了其他客户端中间插队，出现超售的现象。
![image-20210914112149311](http://cdn.oboom.top/doc/image-20210914112149311.png)


#### 如何保持redis事务一致性?

为了保证事务的一致性，在开启事务之前必须要用WATCH命令监视要操作的记录。
redis > WATCH kill_num kill_user

```
开启事务
MULTI
如何开启事务?
利用MULTI命令可以开启一个事务
redis > MULTI
开启事务后的所有操作都不会立即执行，只有执行EXEC命令的时候才会批处理执行
redis > DECR kill_num
redis > RPUSH kill_user 9502
redis > EXEC
```

#### Spring boot 实现Redis 事务

```java
List<Object> txResults = redisTemplate.execute(new SessionCallback<List<Object>>() {
  public List<Object> execute(RedisOperations operations) throws DataAccessException {
    operations.multi();
    operations.opsForSet().add("key", "value1");
    // This will contain the results of all ops in the transaction
    return operations.exec();
  }
});
```

# 数据库解决购物纠纷



## 如何避免篡改商品信息?

B2B电商平台，通常采用保存历次商品修改信息、降低搜索排名
B2C电商平台，只需要保存历次商品修改信息即可

新增SPU和SKU old老数据库记录在案



# 订单号和流水号

订单号和流水号的区别

- 订单号既是订单的唯一编号， 而且经常被用来检索，所以应当是数字类型的主键
- 流水号是打印在购物单据上的字符串，便于阅读，但是不用做查询



![image-20210913175450421](http://cdn.oboom.top/doc/image-20210913175450421.png)



