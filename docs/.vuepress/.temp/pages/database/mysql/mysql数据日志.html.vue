<template><h1 id="mysql-数据日志" tabindex="-1"><a class="header-anchor" href="#mysql-数据日志" aria-hidden="true">#</a> Mysql 数据日志</h1>
<h2 id="mysql-日志" tabindex="-1"><a class="header-anchor" href="#mysql-日志" aria-hidden="true">#</a> Mysql 日志</h2>
<p>数据库在更新时，会产生binlog、redo log、undo log
binlog: server层产生的逻辑日志
redo log: InnoDB产生的物理日志，保证持久化
undo log: InnoDB产生的逻辑日志，保证隔离性、原子性</p>
<p>Mysql  日志体系</p>
<p>MySQL为了满足主从复制、事务等，有复杂的日志体系Server层产生binlog，用来进行数据复制
InnoDB产生undo log.redo log，用来实现事务ACID
MySQL的日志体系不是主要不是用来看的，而是运行必要的</p>
<h2 id="binlog归档日志" tabindex="-1"><a class="header-anchor" href="#binlog归档日志" aria-hidden="true">#</a> binlog归档日志</h2>
<p>Binlog是server层产生的逻辑日志
用来进行数据复制和数据传送
Binlog完整记录了数据库每次的数据操作，可作为数据闪回手段</p>
<p>记录在专门的文件夹中</p>
<h2 id="undo-log回滚日志" tabindex="-1"><a class="header-anchor" href="#undo-log回滚日志" aria-hidden="true">#</a> undo log回滚日志</h2>
<p>lnnoDB自身产生的逻辑日志，用于事务回滚和展示旧版本
对任何数据（缓存)的更新，都先写undo log
undo log位于表空间的undo segment中
SQL: UPDATE name = 'b’→undo: UPDATE name = 'a'</p>
<h2 id="redo-log重做日志" tabindex="-1"><a class="header-anchor" href="#redo-log重做日志" aria-hidden="true">#</a> redo log重做日志</h2>
<p>重做日志重做日志</p>
<p>lnnoDB自身产生的物理日志，记录数据页的变化</p>
<p>lnnoDB “日志优先于数据”，记录redo log视为数据已经更新
内存中的数据更新后写重做日志，数据被写入硬盘后删除</p>
<p>binlog储存在4个1GB文件中，并且循环写入</p>
<p><img src="http://cdn.oboom.top/doc/image-20210906145624154.png" alt="image-20210906145624154"></p>
<h2 id="redo-log刷盘" tabindex="-1"><a class="header-anchor" href="#redo-log刷盘" aria-hidden="true">#</a> redo log刷盘</h2>
<p>innodb_flush_log_at_trx_commit参数控制redo log刷盘
0:异步每秒刷盘
1:每1个事务刷盘
N:每N个事务刷盘
建议设置为1，保证数据安全</p>
<h2 id="binlog刷盘" tabindex="-1"><a class="header-anchor" href="#binlog刷盘" aria-hidden="true">#</a> binlog刷盘</h2>
<p>sync_binlog 参数控制binlog刷盘
0∶自动控制刷盘
1:每1个事务刷盘
N:每N个事务刷盘
建议设置为1，保证数据安全</p>
<h2 id="持久化分析" tabindex="-1"><a class="header-anchor" href="#持久化分析" aria-hidden="true">#</a> 持久化分析</h2>
<p>redo log刷盘前系统崩溃:
数据丢失
redo log刷盘后系统崩溃:
重启时会对redo log进行重放、重写内存中数据页、重写binlog</p>
<h2 id="为什么redo-log在binlog之前" tabindex="-1"><a class="header-anchor" href="#为什么redo-log在binlog之前" aria-hidden="true">#</a> 为什么redo log在binlog之前</h2>
<p>redo log是系统关键节点，想到于“决断点”
binlog一旦写入无法撤回，因为可能已经被传送至备库</p>
<p>WAL</p>
<p>MySQL日志主要有binlog、undo log、redo log
MySQL实行日志优先的策略，日志刷盘，数据就不会丢失</p>
</template>
