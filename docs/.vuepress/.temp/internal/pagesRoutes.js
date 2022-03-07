import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"首页"},["/index.html","/README.md"]],
  ["v-0a87e671","/java/%E9%9A%8F%E6%9C%BA%E6%95%B0.html",{"title":""},["/java/随机数.html","/java/%E9%9A%8F%E6%9C%BA%E6%95%B0","/java/随机数.md","/java/%E9%9A%8F%E6%9C%BA%E6%95%B0.md"]],
  ["v-53d61c5d","/backend/springboot/helloworld.html",{"title":"Spring Boot 入门"},["/backend/springboot/helloworld","/backend/springboot/helloworld.md"]],
  ["v-3ac44ccc","/backend/springboot/SpringBoot%E4%BD%BF%E7%94%A8Log4j2%E6%97%A5%E5%BF%97%E6%A1%86%E6%9E%B6.html",{"title":"Spring Boot 使用Log4j2 日志框架"},["/backend/springboot/SpringBoot使用Log4j2日志框架.html","/backend/springboot/SpringBoot%E4%BD%BF%E7%94%A8Log4j2%E6%97%A5%E5%BF%97%E6%A1%86%E6%9E%B6","/backend/springboot/SpringBoot使用Log4j2日志框架.md","/backend/springboot/SpringBoot%E4%BD%BF%E7%94%A8Log4j2%E6%97%A5%E5%BF%97%E6%A1%86%E6%9E%B6.md"]],
  ["v-5fabb491","/backend/springboot/SpringBoot%E5%A4%9A%E6%A0%B7%E5%8C%96%E6%9E%84%E5%BB%BADocker.html",{"title":"Spring Boot 多样化构建 Docker 镜像"},["/backend/springboot/SpringBoot多样化构建Docker.html","/backend/springboot/SpringBoot%E5%A4%9A%E6%A0%B7%E5%8C%96%E6%9E%84%E5%BB%BADocker","/backend/springboot/SpringBoot多样化构建Docker.md","/backend/springboot/SpringBoot%E5%A4%9A%E6%A0%B7%E5%8C%96%E6%9E%84%E5%BB%BADocker.md"]],
  ["v-50e0f13d","/backend/springboot/SpringBoot%E6%8B%A6%E6%88%AA%E5%99%A8.html",{"title":"Spring Boot 拦截器"},["/backend/springboot/SpringBoot拦截器.html","/backend/springboot/SpringBoot%E6%8B%A6%E6%88%AA%E5%99%A8","/backend/springboot/SpringBoot拦截器.md","/backend/springboot/SpringBoot%E6%8B%A6%E6%88%AA%E5%99%A8.md"]],
  ["v-42b79ec6","/backend/springboot/SpringBoot%E6%B3%A8%E8%A7%A3.html",{"title":"Spring Boot 注解"},["/backend/springboot/SpringBoot注解.html","/backend/springboot/SpringBoot%E6%B3%A8%E8%A7%A3","/backend/springboot/SpringBoot注解.md","/backend/springboot/SpringBoot%E6%B3%A8%E8%A7%A3.md"]],
  ["v-376cb531","/backend/springboot/SpringBoot%E9%A1%B9%E7%9B%AEJar%E6%96%B9%E5%BC%8F%E8%BF%90%E8%A1%8C.html",{"title":"Spring boot 项目 Jar 方式运行"},["/backend/springboot/SpringBoot项目Jar方式运行.html","/backend/springboot/SpringBoot%E9%A1%B9%E7%9B%AEJar%E6%96%B9%E5%BC%8F%E8%BF%90%E8%A1%8C","/backend/springboot/SpringBoot项目Jar方式运行.md","/backend/springboot/SpringBoot%E9%A1%B9%E7%9B%AEJar%E6%96%B9%E5%BC%8F%E8%BF%90%E8%A1%8C.md"]],
  ["v-97eb7d30","/backend/springboot/%E5%9B%BE%E5%BD%A2%E7%9B%91%E6%8E%A7-Spring-Boot-Admin.html",{"title":"Spring Boot 带图形界面的监控-Spring Boot Admin"},["/backend/springboot/图形监控-Spring-Boot-Admin.html","/backend/springboot/%E5%9B%BE%E5%BD%A2%E7%9B%91%E6%8E%A7-Spring-Boot-Admin","/backend/springboot/图形监控-Spring-Boot-Admin.md","/backend/springboot/%E5%9B%BE%E5%BD%A2%E7%9B%91%E6%8E%A7-Spring-Boot-Admin.md"]],
  ["v-356ce94e","/backend/springboot/%E7%9B%91%E6%8E%A7%E5%BA%94%E7%94%A8Spring-Boot-Actuator.html",{"title":"Spring Boot 监控应用 Spring-Boot-Actuator"},["/backend/springboot/监控应用Spring-Boot-Actuator.html","/backend/springboot/%E7%9B%91%E6%8E%A7%E5%BA%94%E7%94%A8Spring-Boot-Actuator","/backend/springboot/监控应用Spring-Boot-Actuator.md","/backend/springboot/%E7%9B%91%E6%8E%A7%E5%BA%94%E7%94%A8Spring-Boot-Actuator.md"]],
  ["v-c7cee9ba","/backend/springboot/%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86.html",{"title":"SpringBoot默认的错误处理机制"},["/backend/springboot/错误处理.html","/backend/springboot/%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86","/backend/springboot/错误处理.md","/backend/springboot/%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86.md"]],
  ["v-330ad30a","/database/mysql/MySql%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9B%B8%E5%85%B3%E6%A6%82%E5%BF%B5.html",{"title":"MySql 数据库"},["/database/mysql/MySql数据库相关概念.html","/database/mysql/MySql%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9B%B8%E5%85%B3%E6%A6%82%E5%BF%B5","/database/mysql/MySql数据库相关概念.md","/database/mysql/MySql%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9B%B8%E5%85%B3%E6%A6%82%E5%BF%B5.md"]],
  ["v-446a28f6","/database/mysql/mysql%E6%95%B0%E6%8D%AE%E6%97%A5%E5%BF%97.html",{"title":"Mysql 数据日志"},["/database/mysql/mysql数据日志.html","/database/mysql/mysql%E6%95%B0%E6%8D%AE%E6%97%A5%E5%BF%97","/database/mysql/mysql数据日志.md","/database/mysql/mysql%E6%95%B0%E6%8D%AE%E6%97%A5%E5%BF%97.md"]],
  ["v-43866fde","/database/mysql/Mysql%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96-%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BC%98%E5%8C%96.html",{"title":"数据库优化"},["/database/mysql/Mysql查询优化-数据库优化.html","/database/mysql/Mysql%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96-%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BC%98%E5%8C%96","/database/mysql/Mysql查询优化-数据库优化.md","/database/mysql/Mysql%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96-%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BC%98%E5%8C%96.md"]],
  ["v-61018508","/database/mysql/Mysql%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96-%E8%AF%AD%E5%8F%A5%E4%BC%98%E5%8C%96.html",{"title":"Mysql 语句优化"},["/database/mysql/Mysql查询优化-语句优化.html","/database/mysql/Mysql%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96-%E8%AF%AD%E5%8F%A5%E4%BC%98%E5%8C%96","/database/mysql/Mysql查询优化-语句优化.md","/database/mysql/Mysql%E6%9F%A5%E8%AF%A2%E4%BC%98%E5%8C%96-%E8%AF%AD%E5%8F%A5%E4%BC%98%E5%8C%96.md"]],
  ["v-573a647b","/database/mysql/Mysql%E6%A0%B8%E5%BF%83-%E7%B4%A2%E5%BC%95.html",{"title":"数据的表的优化"},["/database/mysql/Mysql核心-索引.html","/database/mysql/Mysql%E6%A0%B8%E5%BF%83-%E7%B4%A2%E5%BC%95","/database/mysql/Mysql核心-索引.md","/database/mysql/Mysql%E6%A0%B8%E5%BF%83-%E7%B4%A2%E5%BC%95.md"]],
  ["v-29b7b0e6","/database/mysql/Mysql%E6%A0%B8%E5%BF%83-%E8%A7%86%E5%9B%BE.html",{"title":"视图"},["/database/mysql/Mysql核心-视图.html","/database/mysql/Mysql%E6%A0%B8%E5%BF%83-%E8%A7%86%E5%9B%BE","/database/mysql/Mysql核心-视图.md","/database/mysql/Mysql%E6%A0%B8%E5%BF%83-%E8%A7%86%E5%9B%BE.md"]],
  ["v-2ea3e27b","/database/mysql/Mysql%E9%A1%B9%E7%9B%AE-%E6%96%B0%E9%9B%B6%E5%94%AE%E5%95%86%E5%9F%8E.html",{"title":"数据库设计"},["/database/mysql/Mysql项目-新零售商城.html","/database/mysql/Mysql%E9%A1%B9%E7%9B%AE-%E6%96%B0%E9%9B%B6%E5%94%AE%E5%95%86%E5%9F%8E","/database/mysql/Mysql项目-新零售商城.md","/database/mysql/Mysql%E9%A1%B9%E7%9B%AE-%E6%96%B0%E9%9B%B6%E5%94%AE%E5%95%86%E5%9F%8E.md"]],
  ["v-57603dbc","/database/mysql/Mysql%E9%A1%B9%E7%9B%AE-%E6%96%B0%E9%9B%B6%E5%94%AE%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1.html",{"title":"Mysql 数据库设计"},["/database/mysql/Mysql项目-新零售数据库设计.html","/database/mysql/Mysql%E9%A1%B9%E7%9B%AE-%E6%96%B0%E9%9B%B6%E5%94%AE%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1","/database/mysql/Mysql项目-新零售数据库设计.md","/database/mysql/Mysql%E9%A1%B9%E7%9B%AE-%E6%96%B0%E9%9B%B6%E5%94%AE%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1.md"]],
  ["v-143e962c","/database/mysql/PerconaTookit%E5%B7%A5%E5%85%B7.html",{"title":"PerconaTookit工具"},["/database/mysql/PerconaTookit工具.html","/database/mysql/PerconaTookit%E5%B7%A5%E5%85%B7","/database/mysql/PerconaTookit工具.md","/database/mysql/PerconaTookit%E5%B7%A5%E5%85%B7.md"]],
  ["v-71196034","/database/mysql/%E5%B8%B8%E7%94%A8%E7%9A%84Mysql%E5%91%BD%E4%BB%A4.html",{"title":"常用的Mysql操作命令"},["/database/mysql/常用的Mysql命令.html","/database/mysql/%E5%B8%B8%E7%94%A8%E7%9A%84Mysql%E5%91%BD%E4%BB%A4","/database/mysql/常用的Mysql命令.md","/database/mysql/%E5%B8%B8%E7%94%A8%E7%9A%84Mysql%E5%91%BD%E4%BB%A4.md"]],
  ["v-35b1feb0","/database/mysql/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E5%A4%87%E4%BB%BD%E5%92%8C%E6%81%A2%E5%A4%8D.html",{"title":"数据库的备份和恢复（热备份）"},["/database/mysql/数据库的备份和恢复.html","/database/mysql/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E5%A4%87%E4%BB%BD%E5%92%8C%E6%81%A2%E5%A4%8D","/database/mysql/数据库的备份和恢复.md","/database/mysql/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E5%A4%87%E4%BB%BD%E5%92%8C%E6%81%A2%E5%A4%8D.md"]],
  ["v-e361688e","/database/pxc/MyCat%E5%AD%A6%E4%B9%A0.html",{"title":"MyCat 学习"},["/database/pxc/MyCat学习.html","/database/pxc/MyCat%E5%AD%A6%E4%B9%A0","/database/pxc/MyCat学习.md","/database/pxc/MyCat%E5%AD%A6%E4%B9%A0.md"]],
  ["v-3ca8eb76","/database/pxc/PXC%E9%9B%86%E7%BE%A4%E4%B8%BB%E6%9C%BA%E5%AE%89%E8%A3%85.html",{"title":"PXC集群安装"},["/database/pxc/PXC集群主机安装.html","/database/pxc/PXC%E9%9B%86%E7%BE%A4%E4%B8%BB%E6%9C%BA%E5%AE%89%E8%A3%85","/database/pxc/PXC集群主机安装.md","/database/pxc/PXC%E9%9B%86%E7%BE%A4%E4%B8%BB%E6%9C%BA%E5%AE%89%E8%A3%85.md"]],
  ["v-0cc49f4d","/database/pxc/_sidebar.html",{"title":""},["/database/pxc/_sidebar","/database/pxc/_sidebar.md"]],
  ["v-61dbe447","/database/pxc/%E5%8F%8C%E4%B8%BB%E9%AB%98%E5%8F%AF%E7%94%A8%E5%AE%9E%E7%8E%B0%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.html",{"title":""},["/database/pxc/双主高可用实现负载均衡.html","/database/pxc/%E5%8F%8C%E4%B8%BB%E9%AB%98%E5%8F%AF%E7%94%A8%E5%AE%9E%E7%8E%B0%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1","/database/pxc/双主高可用实现负载均衡.md","/database/pxc/%E5%8F%8C%E4%B8%BB%E9%AB%98%E5%8F%AF%E7%94%A8%E5%AE%9E%E7%8E%B0%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.md"]],
  ["v-6d3de96b","/database/pxc/%E5%AE%89%E8%A3%85Percona%E6%95%B0%E6%8D%AE%E5%BA%93.html",{"title":"安装Percona数据库"},["/database/pxc/安装Percona数据库.html","/database/pxc/%E5%AE%89%E8%A3%85Percona%E6%95%B0%E6%8D%AE%E5%BA%93","/database/pxc/安装Percona数据库.md","/database/pxc/%E5%AE%89%E8%A3%85Percona%E6%95%B0%E6%8D%AE%E5%BA%93.md"]],
  ["v-6611b206","/database/pxc/%E7%95%AA%E5%A4%96.html",{"title":"番外"},["/database/pxc/番外.html","/database/pxc/%E7%95%AA%E5%A4%96","/database/pxc/番外.md","/database/pxc/%E7%95%AA%E5%A4%96.md"]],
  ["v-283e0d68","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java10%E6%96%B0%E7%89%B9%E6%80%A7.html",{"title":""},["/java/版本特性/Java10新特性.html","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java10%E6%96%B0%E7%89%B9%E6%80%A7","/java/版本特性/Java10新特性.md","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java10%E6%96%B0%E7%89%B9%E6%80%A7.md"]],
  ["v-16c7ca85","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java8%E6%96%B0%E7%89%B9%E6%80%A7.html",{"title":"Java8 新特性"},["/java/版本特性/Java8新特性.html","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java8%E6%96%B0%E7%89%B9%E6%80%A7","/java/版本特性/Java8新特性.md","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java8%E6%96%B0%E7%89%B9%E6%80%A7.md"]],
  ["v-d6c0f2f4","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java9%E6%96%B0%E7%89%B9%E6%80%A7.html",{"title":""},["/java/版本特性/Java9新特性.html","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java9%E6%96%B0%E7%89%B9%E6%80%A7","/java/版本特性/Java9新特性.md","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/Java9%E6%96%B0%E7%89%B9%E6%80%A7.md"]],
  ["v-1f9cdddc","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/",{"title":"JDK版本特性"},["/java/版本特性/","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/index.html","/java/版本特性/README.md","/java/%E7%89%88%E6%9C%AC%E7%89%B9%E6%80%A7/README.md"]],
  ["v-1aa43b4a","/other/docker/Docker%E5%91%BD%E4%BB%A4%E8%AF%B4%E6%98%8E.html",{"title":"Dockers 命令说明"},["/other/docker/Docker命令说明.html","/other/docker/Docker%E5%91%BD%E4%BB%A4%E8%AF%B4%E6%98%8E","/other/docker/Docker命令说明.md","/other/docker/Docker%E5%91%BD%E4%BB%A4%E8%AF%B4%E6%98%8E.md"]],
  ["v-15bad991","/other/docker/Docker%E5%AE%89%E8%A3%85.html",{"title":"Docker 安装"},["/other/docker/Docker安装.html","/other/docker/Docker%E5%AE%89%E8%A3%85","/other/docker/Docker安装.md","/other/docker/Docker%E5%AE%89%E8%A3%85.md"]],
  ["v-e516e842","/other/docker/Docker%E5%AE%89%E8%A3%85Mysql.html",{"title":"docker 安装mysql"},["/other/docker/Docker安装Mysql.html","/other/docker/Docker%E5%AE%89%E8%A3%85Mysql","/other/docker/Docker安装Mysql.md","/other/docker/Docker%E5%AE%89%E8%A3%85Mysql.md"]],
  ["v-81338666","/other/docker/Docker%E5%AE%89%E8%A3%85Nacos.html",{"title":"Docker 安装Nacos"},["/other/docker/Docker安装Nacos.html","/other/docker/Docker%E5%AE%89%E8%A3%85Nacos","/other/docker/Docker安装Nacos.md","/other/docker/Docker%E5%AE%89%E8%A3%85Nacos.md"]],
  ["v-0b08fea8","/other/docker/Docker%E5%AE%89%E8%A3%85Web%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0.html",{"title":"Docker 安装Web管理平台"},["/other/docker/Docker安装Web管理平台.html","/other/docker/Docker%E5%AE%89%E8%A3%85Web%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0","/other/docker/Docker安装Web管理平台.md","/other/docker/Docker%E5%AE%89%E8%A3%85Web%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0.md"]],
  ["v-3f496f11","/other/docker/Docker%E8%BF%90%E8%A1%8C%E8%AE%BE%E7%BD%AEIP.html",{"title":"Docker运行设置IP"},["/other/docker/Docker运行设置IP.html","/other/docker/Docker%E8%BF%90%E8%A1%8C%E8%AE%BE%E7%BD%AEIP","/other/docker/Docker运行设置IP.md","/other/docker/Docker%E8%BF%90%E8%A1%8C%E8%AE%BE%E7%BD%AEIP.md"]],
  ["v-30ced1eb","/other/docker/Docker%E9%83%A8%E7%BD%B2haproxy.html",{"title":""},["/other/docker/Docker部署haproxy.html","/other/docker/Docker%E9%83%A8%E7%BD%B2haproxy","/other/docker/Docker部署haproxy.md","/other/docker/Docker%E9%83%A8%E7%BD%B2haproxy.md"]],
  ["v-0e1941e5","/other/docker/Doker%E5%AE%89%E8%A3%85Redis.html",{"title":"Doker安装Redis"},["/other/docker/Doker安装Redis.html","/other/docker/Doker%E5%AE%89%E8%A3%85Redis","/other/docker/Doker安装Redis.md","/other/docker/Doker%E5%AE%89%E8%A3%85Redis.md"]],
  ["v-db3622f6","/other/docker/_sidebar.html",{"title":""},["/other/docker/_sidebar","/other/docker/_sidebar.md"]],
  ["v-d58d040a","/other/linux/Linux%E5%AE%9A%E6%97%B6%E8%84%9A%E6%9C%AC.html",{"title":"Linux 定时脚本"},["/other/linux/Linux定时脚本.html","/other/linux/Linux%E5%AE%9A%E6%97%B6%E8%84%9A%E6%9C%AC","/other/linux/Linux定时脚本.md","/other/linux/Linux%E5%AE%9A%E6%97%B6%E8%84%9A%E6%9C%AC.md"]],
  ["v-5f7e17a4","/other/linux/Linux%E9%97%AE%E9%A2%98%E5%BD%92%E6%A1%A3.html",{"title":"Linux 问题归档"},["/other/linux/Linux问题归档.html","/other/linux/Linux%E9%97%AE%E9%A2%98%E5%BD%92%E6%A1%A3","/other/linux/Linux问题归档.md","/other/linux/Linux%E9%97%AE%E9%A2%98%E5%BD%92%E6%A1%A3.md"]],
  ["v-0dc9fe8a","/other/linux/Ubuntu%E8%AE%BE%E7%BD%AE%E5%9B%BD%E5%86%85%E9%95%9C%E5%83%8F%E8%BD%AF%E4%BB%B6%E6%BA%90.html",{"title":"Ubuntu 设置国内镜像软件源"},["/other/linux/Ubuntu设置国内镜像软件源.html","/other/linux/Ubuntu%E8%AE%BE%E7%BD%AE%E5%9B%BD%E5%86%85%E9%95%9C%E5%83%8F%E8%BD%AF%E4%BB%B6%E6%BA%90","/other/linux/Ubuntu设置国内镜像软件源.md","/other/linux/Ubuntu%E8%AE%BE%E7%BD%AE%E5%9B%BD%E5%86%85%E9%95%9C%E5%83%8F%E8%BD%AF%E4%BB%B6%E6%BA%90.md"]],
  ["v-46ffbb11","/other/linux/Ubuntu%E8%AE%BE%E7%BD%AE%E8%BF%9C%E7%A8%8B%E7%99%BB%E9%99%86.html",{"title":"Ubuntu 设置远程登陆"},["/other/linux/Ubuntu设置远程登陆.html","/other/linux/Ubuntu%E8%AE%BE%E7%BD%AE%E8%BF%9C%E7%A8%8B%E7%99%BB%E9%99%86","/other/linux/Ubuntu设置远程登陆.md","/other/linux/Ubuntu%E8%AE%BE%E7%BD%AE%E8%BF%9C%E7%A8%8B%E7%99%BB%E9%99%86.md"]],
  ["v-66f9cca9","/other/linux/_sidebar.html",{"title":""},["/other/linux/_sidebar","/other/linux/_sidebar.md"]],
  ["v-364066e0","/backend/springcloud/gateway/Hystrixs-%E6%96%AD%E8%B7%AF%E7%94%B1%E4%BD%BF%E7%94%A8.html",{"title":"Hystrixs（断路由）使用"},["/backend/springcloud/gateway/Hystrixs-断路由使用.html","/backend/springcloud/gateway/Hystrixs-%E6%96%AD%E8%B7%AF%E7%94%B1%E4%BD%BF%E7%94%A8","/backend/springcloud/gateway/Hystrixs-断路由使用.md","/backend/springcloud/gateway/Hystrixs-%E6%96%AD%E8%B7%AF%E7%94%B1%E4%BD%BF%E7%94%A8.md"]],
  ["v-5e88b202","/backend/springcloud/gateway/Spring-Gateway%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E.html",{"title":"Spring Gateway 配置说明"},["/backend/springcloud/gateway/Spring-Gateway配置说明.html","/backend/springcloud/gateway/Spring-Gateway%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E","/backend/springcloud/gateway/Spring-Gateway配置说明.md","/backend/springcloud/gateway/Spring-Gateway%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E.md"]],
  ["v-69d9f326","/backend/springcloud/openfeign/Loadbalancer%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.html",{"title":"Spring Cloud LoadBalancer"},["/backend/springcloud/openfeign/Loadbalancer负载均衡.html","/backend/springcloud/openfeign/Loadbalancer%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1","/backend/springcloud/openfeign/Loadbalancer负载均衡.md","/backend/springcloud/openfeign/Loadbalancer%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.md"]],
  ["v-3a6a5088","/backend/springcloud/openfeign/Ribbon%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%9C%8D%E5%8A%A1.html",{"title":"Ribbon负载均衡服务调用"},["/backend/springcloud/openfeign/Ribbon负载均衡服务.html","/backend/springcloud/openfeign/Ribbon%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%9C%8D%E5%8A%A1","/backend/springcloud/openfeign/Ribbon负载均衡服务.md","/backend/springcloud/openfeign/Ribbon%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%9C%8D%E5%8A%A1.md"]],
  ["v-a10236b2","/backend/springcloud/openfeign/%E6%9C%8D%E5%8A%A1%E8%B0%83%E7%94%A8OpenFeign.html",{"title":"OpenFeign负载均衡服务调用"},["/backend/springcloud/openfeign/服务调用OpenFeign.html","/backend/springcloud/openfeign/%E6%9C%8D%E5%8A%A1%E8%B0%83%E7%94%A8OpenFeign","/backend/springcloud/openfeign/服务调用OpenFeign.md","/backend/springcloud/openfeign/%E6%9C%8D%E5%8A%A1%E8%B0%83%E7%94%A8OpenFeign.md"]],
  ["v-690916ef","/backend/springcloud/seata/Seata%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1.html",{"title":"Seata 分布式事务"},["/backend/springcloud/seata/Seata分布式事务.html","/backend/springcloud/seata/Seata%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1","/backend/springcloud/seata/Seata分布式事务.md","/backend/springcloud/seata/Seata%E5%88%86%E5%B8%83%E5%BC%8F%E4%BA%8B%E5%8A%A1.md"]],
  ["v-3b30603a","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8-%E6%B6%88%E8%B4%B9%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86%E6%9C%BA%E5%88%B6.html",{"title":"Spring Cloud Stream 消息驱动-消费异常处理机制"},["/backend/springcloud/stream/Spring-Cloud-Stream消息驱动-消费异常处理机制.html","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8-%E6%B6%88%E8%B4%B9%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86%E6%9C%BA%E5%88%B6","/backend/springcloud/stream/Spring-Cloud-Stream消息驱动-消费异常处理机制.md","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8-%E6%B6%88%E8%B4%B9%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86%E6%9C%BA%E5%88%B6.md"]],
  ["v-2ed0ba3b","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8%E6%B6%88%E6%81%AF%E8%BF%87%E6%BB%A4%E7%9A%84%E4%B8%89%E7%A7%8D%E6%96%B9%E5%BC%8F.html",{"title":"Spring Cloud Stream实现消息过滤的三种主要方式"},["/backend/springcloud/stream/Spring-Cloud-Stream消息驱动消息过滤的三种方式.html","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8%E6%B6%88%E6%81%AF%E8%BF%87%E6%BB%A4%E7%9A%84%E4%B8%89%E7%A7%8D%E6%96%B9%E5%BC%8F","/backend/springcloud/stream/Spring-Cloud-Stream消息驱动消息过滤的三种方式.md","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8%E6%B6%88%E6%81%AF%E8%BF%87%E6%BB%A4%E7%9A%84%E4%B8%89%E7%A7%8D%E6%96%B9%E5%BC%8F.md"]],
  ["v-dba22b1e","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8%E9%85%8D%E7%BD%AE.html",{"title":"Spring Cloud Stream 配置说明"},["/backend/springcloud/stream/Spring-Cloud-Stream消息驱动配置.html","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8%E9%85%8D%E7%BD%AE","/backend/springcloud/stream/Spring-Cloud-Stream消息驱动配置.md","/backend/springcloud/stream/Spring-Cloud-Stream%E6%B6%88%E6%81%AF%E9%A9%B1%E5%8A%A8%E9%85%8D%E7%BD%AE.md"]],
  ["v-be8b3e06","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E4%BA%8B%E5%8A%A1%E6%B6%88%E6%81%AF(%E4%B8%89).html",{"title":"Stream 整合 Rocketmq 实现事务消息（三）"},["/backend/springcloud/stream/Stream整合Rocketmq实现事务消息(三).html","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E4%BA%8B%E5%8A%A1%E6%B6%88%E6%81%AF(%E4%B8%89)","/backend/springcloud/stream/Stream整合Rocketmq实现事务消息(三).md","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E4%BA%8B%E5%8A%A1%E6%B6%88%E6%81%AF(%E4%B8%89).md"]],
  ["v-26ca02ac","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E5%B9%BF%E6%92%AD%E5%92%8C%E9%A1%BA%E5%BA%8F%E6%B6%88%E6%81%AF(%E4%B8%80).html",{"title":"Stream 整合 Rocketmq 实现广播和顺序消息（一）"},["/backend/springcloud/stream/Stream整合Rocketmq实现广播和顺序消息(一).html","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E5%B9%BF%E6%92%AD%E5%92%8C%E9%A1%BA%E5%BA%8F%E6%B6%88%E6%81%AF(%E4%B8%80)","/backend/springcloud/stream/Stream整合Rocketmq实现广播和顺序消息(一).md","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E5%B9%BF%E6%92%AD%E5%92%8C%E9%A1%BA%E5%BA%8F%E6%B6%88%E6%81%AF(%E4%B8%80).md"]],
  ["v-d4f3c878","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E5%BB%B6%E6%97%B6%E6%B6%88%E6%81%AF(%E4%BA%8C).html",{"title":"Stream 整合 Rocketmq 实现延时消息（二）"},["/backend/springcloud/stream/Stream整合Rocketmq实现延时消息(二).html","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E5%BB%B6%E6%97%B6%E6%B6%88%E6%81%AF(%E4%BA%8C)","/backend/springcloud/stream/Stream整合Rocketmq实现延时消息(二).md","/backend/springcloud/stream/Stream%E6%95%B4%E5%90%88Rocketmq%E5%AE%9E%E7%8E%B0%E5%BB%B6%E6%97%B6%E6%B6%88%E6%81%AF(%E4%BA%8C).md"]],
  ["v-762ef762","/backend/springcloud/%E9%93%BE%E8%B7%AF%E8%BF%BD%E8%B8%AA/Sleuth%E5%92%8CZipkin.html",{"title":"Spring Cloud 链路追踪 - Sleuth和 zipkin"},["/backend/springcloud/链路追踪/Sleuth和Zipkin.html","/backend/springcloud/%E9%93%BE%E8%B7%AF%E8%BF%BD%E8%B8%AA/Sleuth%E5%92%8CZipkin","/backend/springcloud/链路追踪/Sleuth和Zipkin.md","/backend/springcloud/%E9%93%BE%E8%B7%AF%E8%BF%BD%E8%B8%AA/Sleuth%E5%92%8CZipkin.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)