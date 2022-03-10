const mysql = [
  {
    text: "Mysql基础",
    collapsible: true,
    children: [
      "/database/mysql/base/数据库和SQL概述.md",
      "/database/mysql/base/DDL数据库定义语言.md",
      "/database/mysql/base/DML数据处理之增删改.md",
      "/database/mysql/base/基本查询.md",
      "/database/mysql/base/条件查询.md",
      "/database/mysql/base/排序查询.md",
      "/database/mysql/base/联合查询.md",
      "/database/mysql/base/连接查询.md",
      "/database/mysql/base/分组函数.md",
      "/database/mysql/base/分组查询.md",
      "/database/mysql/base/分页查询.md",
      "/database/mysql/base/单行函数.md",
      "/database/mysql/base/数据事务.md",
      "/database/mysql/base/SQL练习-01.md",
    ],
  },
  {
    text: "Mysql核心",
    collapsible: true,
    children: [
      "/database/mysql/Mysql核心-视图.md",
      "/database/mysql/Mysql核心-索引.md",
    ],
  },
  {
    text: "Mysql查询优化",
    collapsible: true,
    children: [
      "/database/mysql/Mysql查询优化-语句优化.md",
      "/database/mysql/Mysql查询优化-数据库优化.md",
    ],
  },
  {
    text: "Mysql工具",
    collapsible: true,
    children: ["/database/mysql/数据库的备份和恢复.md"],
  },
  {
    text: "数据库其他文档",
    collapsible: true,
    children: [
      "/database/mysql/MySql数据库相关概念.md",
      "/database/mysql/mysql数据日志.md",
      "/database/mysql/常用的Mysql命令.md",
      "/database/mysql/PerconaTookit工具.md",
      "/database/mysql/数据库的备份和恢复.md",
    ],
  },
  {
    text: "数据库案例-新零售商城数据库设计",
    collapsible: true,
    children: ["/database/mysql/Mysql项目-新零售数据库设计.md"],
  },
];

const pxc = [
  {
    text: "Percona Xtradb Cluster",
    collapsible: true,
    children: [
      "/database/pxc/安装Percona数据库.md",
      "/database/pxc/PXC集群主机安装.md",
    ],
  },
  {
    text: "MyCat 数据库中间件",
    collapsible: true,
    children: ["/database/pxc/MyCat学习.md"],
  },
  {
    text: "高可用集群",
    collapsible: true,
    children: ["/database/pxc/双主高可用实现负载均衡.md"],
  },
  {
    text: "番外",
    collapsible: true,
    children: ["/database/pxc/番外.md"],
  },
];

export { mysql, pxc };
