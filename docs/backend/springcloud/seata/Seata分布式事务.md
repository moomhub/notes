# Seata 分布式事务

## Docker 运行Seata

自定义配置文件需要通过挂载文件的方式实现，将宿主机上的 `registry.conf` 和 `file.conf` 挂载到容器中相应的目录

```bash
docker run --name seata-server \
-p 8091:8091 \
-e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
-v /User/seata/config:/root/seata-config \
seataio/seata-server
```


## 容器命令行及查看日志

```bash
$ docker exec -it seata-server sh
$ docker logs -f seata-server
```


## Seata 数据库文件

```mysql
-- the table to store GlobalSession data
drop table if exists `global_table`;
create table `global_table` (
  `xid` varchar(128)  not null,
  `transaction_id` bigint,
  `status` tinyint not null,
  `application_id` varchar(32),
  `transaction_service_group` varchar(32),
  `transaction_name` varchar(128),
  `timeout` int,
  `begin_time` bigint,
  `application_data` varchar(2000),
  `gmt_create` datetime,
  `gmt_modified` datetime,
  primary key (`xid`),
  key `idx_gmt_modified_status` (`gmt_modified`, `status`),
  key `idx_transaction_id` (`transaction_id`)
);

-- the table to store BranchSession data
drop table if exists `branch_table`;
create table `branch_table` (
  `branch_id` bigint not null,
  `xid` varchar(128) not null,
  `transaction_id` bigint ,
  `resource_group_id` varchar(32),
  `resource_id` varchar(256) ,
  `lock_key` varchar(128) ,
  `branch_type` varchar(8) ,
  `status` tinyint,
  `client_id` varchar(64),
  `application_data` varchar(2000),
  `gmt_create` datetime,
  `gmt_modified` datetime,
  primary key (`branch_id`),
  key `idx_xid` (`xid`)
);

-- the table to store lock data
drop table if exists `lock_table`;
create table `lock_table` (
  `row_key` varchar(128) not null,
  `xid` varchar(96),
  `transaction_id` long ,
  `branch_id` long,
  `resource_id` varchar(256) ,
  `table_name` varchar(32) ,
  `pk` varchar(36) ,
  `gmt_create` datetime ,
  `gmt_modified` datetime,
  primary key(`row_key`)
);
```


## Seata 说明

分布式事务处理过程的简单来说就是：**一个全局的事务ID和三个组件** 

一个全局的事务ID ：XID

**TC (Transaction Coordinator) - 事务协调者** 

维护全局和分支事务的状态，驱动全局事务提交或回滚。

**TM (Transaction Manager) - 事务管理器** 

定义全局事务的范围：开始全局事务、提交或回滚全局事务。

**RM (Resource Manager) - 资源管理器** 

管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

## 调用过程

> [@GlobalTransactional ](/GlobalTransactional) 添加到入口处<br />本地@Transactional全局[@GlobalTransactional ](/GlobalTransactional)


TM向TC申请开启一个全局事务，全局事务创建成功并生成一个全局唯一的XID;

XID在微服务调用链路的上下文中传播;

RM向TC注册分支事务，将其纳入XID对应全局事务的管辖;

TM向TC发起针对XID的全局提交或回滚决议;

TC调度XID下管辖的全部分支事务完或提交或回滚请求。

## 配置文件说明

file.conf 事务日志保存方式  默认是文件的方式保存

registry.conf 注册配置，设置注册中心

Seata Client 配置文件

## Client 配置文件说明：

### pom.xml

```纯文本
    <dependency>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
            <version>1.4.2</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
            <version>2.2.1.RELEASE</version>
            <exclusions>
                <exclusion>
                    <groupId>io.seata</groupId>
                    <artifactId>seata-spring-boot-starter</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```


### application.yml

```yaml
seata:
  enabled: true # 是否开启spring-boot自动装配  默认true
  enable-auto-data-source-proxy: true #是否开启数据源自动代理 (多数据源) 默认 true
  application-id: business-seata-example
  tx-service-group: business-service-seata-service-group # 事务群组（可以每个应用独立取名，也可以使用相同的名字）
  client:
    rm-report-success-enable: true
    rm-table-meta-check-enable: false # 自动刷新缓存中的表结构（默认false）
    rm-report-retry-count: 5 # 一阶段结果上报TC重试次数（默认5）
    rm-async-commit-buffer-limit: 10000 # 异步提交缓存队列长度（默认10000）
    rm:
      lock:
        lock-retry-internal: 10 # 校验或占用全局锁重试间隔（默认10ms）
        lock-retry-times:    30 # 校验或占用全局锁重试次数（默认30）
        lock-retry-policy-branch-rollback-on-conflict: true # 分支事务与其它全局回滚事务冲突时锁策略（优先释放本地锁让回滚成功）
    tm-commit-retry-count:   3 # 一阶段全局提交结果上报TC重试次数（默认1次，建议大于1）
    tm-rollback-retry-count: 3 # 一阶段全局回滚结果上报TC重试次数（默认1次，建议大于1）
    undo:
      undo-data-validation: true # 二阶段回滚镜像校验（默认true开启）
      undo-log-serialization: jackson # undo序列化方式（默认jackson）
      undo-log-table: undo_log  # 自定义undo表名（默认undo_log）
    log:
      exceptionRate: 100 # 日志异常输出概率（默认100）
    support:
      spring:
        datasource-autoproxy: true
  service:
    vgroup-mapping:
      my_test_tx_group: default # TC 集群（必须与seata-server保持一致）
    enable-degrade: false # 降级开关
    disable-global-transaction: false # 禁用全局事务（默认false）
    grouplist:
      default: 127.0.0.1:8091
  transport:
    shutdown:
      wait: 3
    thread-factory:
      boss-thread-prefix: NettyBoss
      worker-thread-prefix: NettyServerNIOWorker
      server-executor-thread-prefix: NettyServerBizHandler
      share-boss-worker: false
      client-selector-thread-prefix: NettyClientSelector
      client-selector-thread-size: 1
      client-worker-thread-prefix: NettyClientWorkerThread
    type: TCP
    server: NIO
    heartbeat: true
    serialization: seata
    compressor: none
    enable-client-batch-send-request: true # 客户端事务消息请求是否批量合并发送（默认true）
  registry:
    file:
      name: file.conf
    type: nacos
    nacos:
      server-addr: localhost:8848
      namespace:
      cluster: default
  config:
    file:
      name: file.conf
    type: nacos
    nacos:
      namespace:
      server-addr: localhost:8848
```


Client 端使用的配置文件

```yaml
seata:
  enabled: true # 是否开启spring-boot自动装配
  application-id:  xxxx # 应用ID
  tx-service-group: XXXX # 事务群组（可以每个应用独立取名，也可以使用相同的名字）
  enable-auto-data-source-proxy: true # 是否开启数据源自动代理
  data-source-proxy-mode: AT # 数据代理方式
  use-jdk-proxy: false # 使用JDK进行代理
  client:
    rm:
      report-success-enable: false # 是否上报一阶段成功 默认 false
      table-meta-check-enable: false # 自动刷新缓存中的表结构（默认false）
      table-meta-checker-interval: 60000
      report-retry-count: 5 # 一阶段结果上报TC重试次数（默认5）
      async-commit-buffer-limit: 10000 # 异步提交缓存队列长度（默认10000
      # sage -状态处理
      saga-branch-register-enable: false
      saga-compensate-persist-mode-update: false
      saga-json-parser: fastjson
      saga-retry-persist-mode-update: false
      lock:
        retry-interval: 10 # 校验或占用全局锁重试间隔（默认10ms）
        retry-times: 30  # 校验或占用全局锁重试次数（默认30）
        retry-policy-branch-rollback-on-conflict: true # 分支事务与其它全局回滚事务冲突时锁策略（优先释放本地锁让回滚成功）
    tm:
      commit-retry-count: 5  # 一阶段全局提交结果上报TC重试次数
      rollback-retry-count: 5 # 一阶段全局回滚结果上报TC重试次数
      default-global-transaction-timeout: 60000 # 默认事务管理超时间
      degrade-check: false # 降级开关
      degrade-check-allow-times: 10 # 升降级达标阈值
      degrade-check-period: 2000 # 服务自检周期 单位ms
    undo:
      compress:
        enable: true
        type: zip
        threshold: 64k
      data-validation: true # 二阶段回滚镜像校验（默认true开启）
      log-serialization: jackson # undo序列化方式（默认jackson）
      log-table: undo_log  # 自定义undo表名（默认undo_log）
      only-care-update-columns: true
    load-balance:
      type: RandomLoadBalance
      virtual-nodes: 10 
  service:
    disable-global-transaction: false # 禁用全局事务（默认false）
    enable-degrade: false # 降级开关
    vgroup-mapping:
    grouplist:
  transport: 
    compressor: none # client和server通信数据压缩方式 none、gzip，默认none
    type: tcp
    heartbeat: true # client和server通信心跳检测开关 
    server: NIO
    serialization: seata #client和server通信编解码方式 默认 seata - seata(ByteBuf)、protobuf、kryo、hession、fst
    enable-client-batch-send-request: true # 客户端事务消息请求是否批量合并发送（默认true）
    shutdown:
      wait: 3
    thread-factory:
      boss-thread-prefix: NettyBoss
      worker-thread-prefix: NettyServerNIOWorker
      server-executor-thread-prefix: NettyServerBizHandler
      share-boss-worker: false
      client-selector-thread-prefix: NettyClientSelector
      client-selector-thread-size: 1
      client-worker-thread-prefix: NettyClientWorkerThread
  registry:
    file:
      name: file.conf
    type: nacos
    nacos:
      application: seata-server
      server-addr: localhost:8848
      group: SEATA_GROUP
      cluster: default
      username: xxx
      password: xxx
  config:
    file:
      name: file.conf
    nacos:
      namespace:
      server-addr: localhost:8848
```

