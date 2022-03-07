<template><h1 id="seata-分布式事务" tabindex="-1"><a class="header-anchor" href="#seata-分布式事务" aria-hidden="true">#</a> Seata 分布式事务</h1>
<h2 id="docker-运行seata" tabindex="-1"><a class="header-anchor" href="#docker-运行seata" aria-hidden="true">#</a> Docker 运行Seata</h2>
<p>自定义配置文件需要通过挂载文件的方式实现，将宿主机上的 <code>registry.conf</code> 和 <code>file.conf</code> 挂载到容器中相应的目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run --name seata-server <span class="token punctuation">\</span>
-p <span class="token number">8091</span>:8091 <span class="token punctuation">\</span>
-e <span class="token assign-left variable">SEATA_CONFIG_NAME</span><span class="token operator">=</span>file:/root/seata-config/registry <span class="token punctuation">\</span>
-v /User/seata/config:/root/seata-config <span class="token punctuation">\</span>
seataio/seata-server
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="容器命令行及查看日志" tabindex="-1"><a class="header-anchor" href="#容器命令行及查看日志" aria-hidden="true">#</a> 容器命令行及查看日志</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it seata-server <span class="token function">sh</span>
$ <span class="token function">docker</span> logs -f seata-server
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="seata-数据库文件" tabindex="-1"><a class="header-anchor" href="#seata-数据库文件" aria-hidden="true">#</a> Seata 数据库文件</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>-- the table to store GlobalSession data
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><h2 id="seata-说明" tabindex="-1"><a class="header-anchor" href="#seata-说明" aria-hidden="true">#</a> Seata 说明</h2>
<p>分布式事务处理过程的简单来说就是：<strong>一个全局的事务ID和三个组件</strong></p>
<p>一个全局的事务ID ：XID</p>
<p><strong>TC (Transaction Coordinator) - 事务协调者</strong></p>
<p>维护全局和分支事务的状态，驱动全局事务提交或回滚。</p>
<p><strong>TM (Transaction Manager) - 事务管理器</strong></p>
<p>定义全局事务的范围：开始全局事务、提交或回滚全局事务。</p>
<p><strong>RM (Resource Manager) - 资源管理器</strong></p>
<p>管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。</p>
<h2 id="调用过程" tabindex="-1"><a class="header-anchor" href="#调用过程" aria-hidden="true">#</a> 调用过程</h2>
<blockquote>
<p><a href="/GlobalTransactional" target="_blank" rel="noopener noreferrer">@GlobalTransactional <ExternalLinkIcon/></a> 添加到入口处<br />本地@Transactional全局<a href="/GlobalTransactional" target="_blank" rel="noopener noreferrer">@GlobalTransactional <ExternalLinkIcon/></a></p>
</blockquote>
<p>TM向TC申请开启一个全局事务，全局事务创建成功并生成一个全局唯一的XID;</p>
<p>XID在微服务调用链路的上下文中传播;</p>
<p>RM向TC注册分支事务，将其纳入XID对应全局事务的管辖;</p>
<p>TM向TC发起针对XID的全局提交或回滚决议;</p>
<p>TC调度XID下管辖的全部分支事务完或提交或回滚请求。</p>
<h2 id="配置文件说明" tabindex="-1"><a class="header-anchor" href="#配置文件说明" aria-hidden="true">#</a> 配置文件说明</h2>
<p>file.conf 事务日志保存方式  默认是文件的方式保存</p>
<p>registry.conf 注册配置，设置注册中心</p>
<p>Seata Client 配置文件</p>
<h2 id="client-配置文件说明" tabindex="-1"><a class="header-anchor" href="#client-配置文件说明" aria-hidden="true">#</a> Client 配置文件说明：</h2>
<h3 id="pom-xml" tabindex="-1"><a class="header-anchor" href="#pom-xml" aria-hidden="true">#</a> pom.xml</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>    &lt;dependency>
            &lt;groupId>io.seata&lt;/groupId>
            &lt;artifactId>seata-spring-boot-starter&lt;/artifactId>
            &lt;version>1.4.2&lt;/version>
        &lt;/dependency>
        &lt;dependency>
            &lt;groupId>com.alibaba.cloud&lt;/groupId>
            &lt;artifactId>spring-cloud-starter-alibaba-seata&lt;/artifactId>
            &lt;version>2.2.1.RELEASE&lt;/version>
            &lt;exclusions>
                &lt;exclusion>
                    &lt;groupId>io.seata&lt;/groupId>
                    &lt;artifactId>seata-spring-boot-starter&lt;/artifactId>
                &lt;/exclusion>
            &lt;/exclusions>
        &lt;/dependency>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="application-yml" tabindex="-1"><a class="header-anchor" href="#application-yml" aria-hidden="true">#</a> application.yml</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否开启spring-boot自动装配  默认true</span>
  <span class="token key atrule">enable-auto-data-source-proxy</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#是否开启数据源自动代理 (多数据源) 默认 true</span>
  <span class="token key atrule">application-id</span><span class="token punctuation">:</span> business<span class="token punctuation">-</span>seata<span class="token punctuation">-</span>example
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> business<span class="token punctuation">-</span>service<span class="token punctuation">-</span>seata<span class="token punctuation">-</span>service<span class="token punctuation">-</span>group <span class="token comment"># 事务群组（可以每个应用独立取名，也可以使用相同的名字）</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">rm-report-success-enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">rm-table-meta-check-enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 自动刷新缓存中的表结构（默认false）</span>
    <span class="token key atrule">rm-report-retry-count</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment"># 一阶段结果上报TC重试次数（默认5）</span>
    <span class="token key atrule">rm-async-commit-buffer-limit</span><span class="token punctuation">:</span> <span class="token number">10000</span> <span class="token comment"># 异步提交缓存队列长度（默认10000）</span>
    <span class="token key atrule">rm</span><span class="token punctuation">:</span>
      <span class="token key atrule">lock</span><span class="token punctuation">:</span>
        <span class="token key atrule">lock-retry-internal</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># 校验或占用全局锁重试间隔（默认10ms）</span>
        <span class="token key atrule">lock-retry-times</span><span class="token punctuation">:</span>    <span class="token number">30</span> <span class="token comment"># 校验或占用全局锁重试次数（默认30）</span>
        <span class="token key atrule">lock-retry-policy-branch-rollback-on-conflict</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 分支事务与其它全局回滚事务冲突时锁策略（优先释放本地锁让回滚成功）</span>
    <span class="token key atrule">tm-commit-retry-count</span><span class="token punctuation">:</span>   <span class="token number">3</span> <span class="token comment"># 一阶段全局提交结果上报TC重试次数（默认1次，建议大于1）</span>
    <span class="token key atrule">tm-rollback-retry-count</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment"># 一阶段全局回滚结果上报TC重试次数（默认1次，建议大于1）</span>
    <span class="token key atrule">undo</span><span class="token punctuation">:</span>
      <span class="token key atrule">undo-data-validation</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 二阶段回滚镜像校验（默认true开启）</span>
      <span class="token key atrule">undo-log-serialization</span><span class="token punctuation">:</span> jackson <span class="token comment"># undo序列化方式（默认jackson）</span>
      <span class="token key atrule">undo-log-table</span><span class="token punctuation">:</span> undo_log  <span class="token comment"># 自定义undo表名（默认undo_log）</span>
    <span class="token key atrule">log</span><span class="token punctuation">:</span>
      <span class="token key atrule">exceptionRate</span><span class="token punctuation">:</span> <span class="token number">100</span> <span class="token comment"># 日志异常输出概率（默认100）</span>
    <span class="token key atrule">support</span><span class="token punctuation">:</span>
      <span class="token key atrule">spring</span><span class="token punctuation">:</span>
        <span class="token key atrule">datasource-autoproxy</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
      <span class="token key atrule">my_test_tx_group</span><span class="token punctuation">:</span> default <span class="token comment"># TC 集群（必须与seata-server保持一致）</span>
    <span class="token key atrule">enable-degrade</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 降级开关</span>
    <span class="token key atrule">disable-global-transaction</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 禁用全局事务（默认false）</span>
    <span class="token key atrule">grouplist</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">8091</span>
  <span class="token key atrule">transport</span><span class="token punctuation">:</span>
    <span class="token key atrule">shutdown</span><span class="token punctuation">:</span>
      <span class="token key atrule">wait</span><span class="token punctuation">:</span> <span class="token number">3</span>
    <span class="token key atrule">thread-factory</span><span class="token punctuation">:</span>
      <span class="token key atrule">boss-thread-prefix</span><span class="token punctuation">:</span> NettyBoss
      <span class="token key atrule">worker-thread-prefix</span><span class="token punctuation">:</span> NettyServerNIOWorker
      <span class="token key atrule">server-executor-thread-prefix</span><span class="token punctuation">:</span> NettyServerBizHandler
      <span class="token key atrule">share-boss-worker</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">client-selector-thread-prefix</span><span class="token punctuation">:</span> NettyClientSelector
      <span class="token key atrule">client-selector-thread-size</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">client-worker-thread-prefix</span><span class="token punctuation">:</span> NettyClientWorkerThread
    <span class="token key atrule">type</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">server</span><span class="token punctuation">:</span> NIO
    <span class="token key atrule">heartbeat</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">serialization</span><span class="token punctuation">:</span> seata
    <span class="token key atrule">compressor</span><span class="token punctuation">:</span> none
    <span class="token key atrule">enable-client-batch-send-request</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 客户端事务消息请求是否批量合并发送（默认true）</span>
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">file</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> file.conf
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
      <span class="token key atrule">cluster</span><span class="token punctuation">:</span> default
  <span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">file</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> file.conf
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><p>Client 端使用的配置文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否开启spring-boot自动装配</span>
  <span class="token key atrule">application-id</span><span class="token punctuation">:</span>  xxxx <span class="token comment"># 应用ID</span>
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> XXXX <span class="token comment"># 事务群组（可以每个应用独立取名，也可以使用相同的名字）</span>
  <span class="token key atrule">enable-auto-data-source-proxy</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否开启数据源自动代理</span>
  <span class="token key atrule">data-source-proxy-mode</span><span class="token punctuation">:</span> AT <span class="token comment"># 数据代理方式</span>
  <span class="token key atrule">use-jdk-proxy</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 使用JDK进行代理</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">rm</span><span class="token punctuation">:</span>
      <span class="token key atrule">report-success-enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 是否上报一阶段成功 默认 false</span>
      <span class="token key atrule">table-meta-check-enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 自动刷新缓存中的表结构（默认false）</span>
      <span class="token key atrule">table-meta-checker-interval</span><span class="token punctuation">:</span> <span class="token number">60000</span>
      <span class="token key atrule">report-retry-count</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment"># 一阶段结果上报TC重试次数（默认5）</span>
      <span class="token key atrule">async-commit-buffer-limit</span><span class="token punctuation">:</span> <span class="token number">10000</span> <span class="token comment"># 异步提交缓存队列长度（默认10000</span>
      <span class="token comment"># sage -状态处理</span>
      <span class="token key atrule">saga-branch-register-enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">saga-compensate-persist-mode-update</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">saga-json-parser</span><span class="token punctuation">:</span> fastjson
      <span class="token key atrule">saga-retry-persist-mode-update</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">lock</span><span class="token punctuation">:</span>
        <span class="token key atrule">retry-interval</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># 校验或占用全局锁重试间隔（默认10ms）</span>
        <span class="token key atrule">retry-times</span><span class="token punctuation">:</span> <span class="token number">30</span>  <span class="token comment"># 校验或占用全局锁重试次数（默认30）</span>
        <span class="token key atrule">retry-policy-branch-rollback-on-conflict</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 分支事务与其它全局回滚事务冲突时锁策略（优先释放本地锁让回滚成功）</span>
    <span class="token key atrule">tm</span><span class="token punctuation">:</span>
      <span class="token key atrule">commit-retry-count</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment"># 一阶段全局提交结果上报TC重试次数</span>
      <span class="token key atrule">rollback-retry-count</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment"># 一阶段全局回滚结果上报TC重试次数</span>
      <span class="token key atrule">default-global-transaction-timeout</span><span class="token punctuation">:</span> <span class="token number">60000</span> <span class="token comment"># 默认事务管理超时间</span>
      <span class="token key atrule">degrade-check</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 降级开关</span>
      <span class="token key atrule">degrade-check-allow-times</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># 升降级达标阈值</span>
      <span class="token key atrule">degrade-check-period</span><span class="token punctuation">:</span> <span class="token number">2000</span> <span class="token comment"># 服务自检周期 单位ms</span>
    <span class="token key atrule">undo</span><span class="token punctuation">:</span>
      <span class="token key atrule">compress</span><span class="token punctuation">:</span>
        <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> zip
        <span class="token key atrule">threshold</span><span class="token punctuation">:</span> 64k
      <span class="token key atrule">data-validation</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 二阶段回滚镜像校验（默认true开启）</span>
      <span class="token key atrule">log-serialization</span><span class="token punctuation">:</span> jackson <span class="token comment"># undo序列化方式（默认jackson）</span>
      <span class="token key atrule">log-table</span><span class="token punctuation">:</span> undo_log  <span class="token comment"># 自定义undo表名（默认undo_log）</span>
      <span class="token key atrule">only-care-update-columns</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">load-balance</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> RandomLoadBalance
      <span class="token key atrule">virtual-nodes</span><span class="token punctuation">:</span> <span class="token number">10</span> 
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">disable-global-transaction</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 禁用全局事务（默认false）</span>
    <span class="token key atrule">enable-degrade</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># 降级开关</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
    <span class="token key atrule">grouplist</span><span class="token punctuation">:</span>
  <span class="token key atrule">transport</span><span class="token punctuation">:</span> 
    <span class="token key atrule">compressor</span><span class="token punctuation">:</span> none <span class="token comment"># client和server通信数据压缩方式 none、gzip，默认none</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> tcp
    <span class="token key atrule">heartbeat</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># client和server通信心跳检测开关 </span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> NIO
    <span class="token key atrule">serialization</span><span class="token punctuation">:</span> seata <span class="token comment">#client和server通信编解码方式 默认 seata - seata(ByteBuf)、protobuf、kryo、hession、fst</span>
    <span class="token key atrule">enable-client-batch-send-request</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 客户端事务消息请求是否批量合并发送（默认true）</span>
    <span class="token key atrule">shutdown</span><span class="token punctuation">:</span>
      <span class="token key atrule">wait</span><span class="token punctuation">:</span> <span class="token number">3</span>
    <span class="token key atrule">thread-factory</span><span class="token punctuation">:</span>
      <span class="token key atrule">boss-thread-prefix</span><span class="token punctuation">:</span> NettyBoss
      <span class="token key atrule">worker-thread-prefix</span><span class="token punctuation">:</span> NettyServerNIOWorker
      <span class="token key atrule">server-executor-thread-prefix</span><span class="token punctuation">:</span> NettyServerBizHandler
      <span class="token key atrule">share-boss-worker</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">client-selector-thread-prefix</span><span class="token punctuation">:</span> NettyClientSelector
      <span class="token key atrule">client-selector-thread-size</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">client-worker-thread-prefix</span><span class="token punctuation">:</span> NettyClientWorkerThread
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">file</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> file.conf
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">application</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>server
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
      <span class="token key atrule">group</span><span class="token punctuation">:</span> SEATA_GROUP
      <span class="token key atrule">cluster</span><span class="token punctuation">:</span> default
      <span class="token key atrule">username</span><span class="token punctuation">:</span> xxx
      <span class="token key atrule">password</span><span class="token punctuation">:</span> xxx
  <span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">file</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> file.conf
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br></div></div></template>
