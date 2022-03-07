export const themeData = {
  "logo": "/images/png/logo.png",
  "repo": "https://github.com/moomhub/Notes",
  "docsDir": "docs",
  "navbar": [
    {
      "text": "java",
      "children": [
        {
          "text": "Java 版本特性",
          "children": [
            {
              "text": "8-11",
              "link": "/java/版本特性"
            },
            {
              "text": "11-15",
              "link": "/java/版本特性"
            },
            {
              "text": "15-17",
              "link": "/java/版本特性"
            }
          ]
        },
        {
          "text": "Java 基础",
          "children": [
            {
              "text": "环境变量配置",
              "link": "/"
            }
          ]
        },
        {
          "text": "多线程",
          "children": [
            {
              "text": "多线程配置",
              "link": "/"
            }
          ]
        }
      ]
    },
    {
      "text": "后端文档",
      "children": [
        {
          "text": "Spring 系列",
          "children": [
            {
              "text": "Spring Boot",
              "link": "/backend/springboot/helloworld.md"
            },
            {
              "text": "Spring Cloud",
              "link": "/backend/springcloud/gateway/Spring-Gateway配置说明.md"
            },
            {
              "text": "Spring Cloud Alibaba",
              "link": "/backend/springcloud/gateway/Spring-Gateway配置说明.md"
            }
          ]
        }
      ]
    },
    {
      "text": "数据库",
      "children": [
        {
          "text": "Mysql",
          "link": "/database/mysql/Mysql核心-视图.md"
        },
        {
          "text": "Percona Xtradb Cluster",
          "link": "/database/pxc/安装Percona数据库.md"
        }
      ]
    },
    {
      "text": "其他",
      "children": [
        {
          "text": "Linux",
          "link": "/other/linux/Ubuntu设置国内镜像软件源.md"
        },
        {
          "text": "docker",
          "link": "/other/docker/Docker安装.md"
        }
      ]
    }
  ],
  "sidebar": {
    "/backend/springboot": [
      {
        "text": "Spring Boot基础",
        "collapsible": true,
        "children": [
          "/backend/springboot/helloworld.md",
          "/backend/springboot/SpringBoot注解.md",
          "/backend/springboot/错误处理.md",
          "/backend/springboot/SpringBoot使用Log4j2日志框架.md",
          "/backend/springboot/SpringBoot拦截器.md"
        ]
      },
      {
        "text": "Spring Boot 监控应用",
        "collapsible": true,
        "children": [
          "/backend/springboot/监控应用Spring-Boot-Actuator.md",
          "/backend/springboot/图形监控-Spring-Boot-Admin.md"
        ]
      },
      {
        "text": "Spring Boot 多样化运行",
        "collapsible": true,
        "children": [
          "/backend/springboot/SpringBoot项目Jar方式运行.md",
          "/backend/springboot/SpringBoot多样化构建Docker.md"
        ]
      }
    ],
    "/backend/springcloud": [
      {
        "text": "Gateway 网关服务",
        "collapsible": true,
        "children": [
          "/backend/springcloud/gateway/Spring-Gateway配置说明.md",
          "/backend/springcloud/gateway/Hystrixs-断路由使用.md"
        ]
      },
      {
        "text": "服务调用",
        "collapsible": true,
        "children": [
          "/backend/springcloud/openfeign/Loadbalancer负载均衡.md",
          "/backend/springcloud/openfeign/Ribbon负载均衡服务.md",
          "/backend/springcloud/openfeign/服务调用OpenFeign.md"
        ]
      },
      {
        "text": "Stream 消息驱动",
        "collapsible": true,
        "children": [
          "/backend/springcloud/stream/Spring-Cloud-Stream消息驱动配置.md",
          "/backend/springcloud/stream/Spring-Cloud-Stream消息驱动-消费异常处理机制.md",
          "/backend/springcloud/stream/Spring-Cloud-Stream消息驱动消息过滤的三种方式.md"
        ]
      },
      {
        "text": " 整合RockMQ",
        "collapsible": true,
        "children": [
          "/backend/springcloud/stream/Stream整合Rocketmq实现广播和顺序消息(一).md",
          "/backend/springcloud/stream/Stream整合Rocketmq实现延时消息(二).md",
          "/backend/springcloud/stream/Stream整合Rocketmq实现事务消息(三).md"
        ]
      },
      {
        "text": "分布式事务",
        "collapsible": true,
        "children": [
          "/backend/springcloud/seata/Seata分布式事务.md"
        ]
      },
      {
        "text": "链路追踪",
        "collapsible": true,
        "children": [
          "/backend/springcloud/链路追踪/Sleuth和Zipkin.md"
        ]
      }
    ],
    "/database/pxc": [
      {
        "text": "Percona Xtradb Cluster",
        "collapsible": true,
        "children": [
          "/database/pxc/安装Percona数据库.md",
          "/database/pxc/PXC集群主机安装.md"
        ]
      },
      {
        "text": "MyCat 数据库中间件",
        "collapsible": true,
        "children": [
          "/database/pxc/MyCat学习.md"
        ]
      },
      {
        "text": "高可用集群",
        "collapsible": true,
        "children": [
          "/database/pxc/双主高可用实现负载均衡.md"
        ]
      },
      {
        "text": "番外",
        "collapsible": true,
        "children": [
          "/database/pxc/番外.md"
        ]
      }
    ],
    "/database/mysql": [
      {
        "text": "Mysql基础",
        "collapsible": true,
        "children": [
          "/database/mysql/Mysql核心-视图.md",
          "/database/mysql/Mysql核心-索引.md"
        ]
      },
      {
        "text": "Mysql核心",
        "collapsible": true,
        "children": [
          "/database/mysql/Mysql核心-视图.md",
          "/database/mysql/Mysql核心-索引.md"
        ]
      },
      {
        "text": "Mysql查询优化",
        "collapsible": true,
        "children": [
          "/database/mysql/Mysql查询优化-语句优化.md",
          "/database/mysql/Mysql查询优化-数据库优化.md"
        ]
      },
      {
        "text": "Mysql工具",
        "collapsible": true,
        "children": [
          "/database/mysql/数据库的备份和恢复.md"
        ]
      },
      {
        "text": "数据库其他文档",
        "collapsible": true,
        "children": [
          "/database/mysql/MySql数据库相关概念.md",
          "/database/mysql/mysql数据日志.md",
          "/database/mysql/常用的Mysql命令.md",
          "/database/mysql/PerconaTookit工具.md",
          "/database/mysql/数据库的备份和恢复.md"
        ]
      },
      {
        "text": "数据库案例-新零售商城数据库设计",
        "collapsible": true,
        "children": [
          "/database/mysql/Mysql项目-新零售数据库设计.md"
        ]
      }
    ],
    "/other/linux": [
      {
        "text": "Linux 配置",
        "collapsible": true,
        "children": [
          "/other/linux/Ubuntu设置国内镜像软件源.md",
          "/other/linux/Ubuntu设置远程登陆.md",
          "/other/linux/Linux定时脚本.md",
          "/other/linux/Linux问题归档.md"
        ]
      }
    ],
    "/other/docker": [
      {
        "text": "Docker 基础",
        "collapsible": true,
        "children": [
          "/other/docker/Docker安装.md",
          "/other/docker/Docker运行设置IP.md",
          "/other/docker/Docker命令说明.md"
        ]
      },
      {
        "text": "Docker 安装应用",
        "collapsible": true,
        "children": [
          "/other/docker/Docker安装Web管理平台.md",
          "/other/docker/Docker安装Nacos.md",
          "/other/docker/Doker安装Redis.md",
          "/other/docker/Docker安装Mysql.md",
          "/other/docker/Docker部署haproxy.md"
        ]
      }
    ]
  },
  "editLinkText": "在 GitHub 上编辑此页",
  "lastUpdatedText": "上次更新",
  "contributorsText": "贡献者",
  "tip": "提示",
  "warning": "注意",
  "danger": "警告",
  "notFound": [
    "这里什么都没有",
    "我们怎么到这来了？",
    "这是一个 404 页面",
    "看起来我们进入了错误的链接"
  ],
  "backToHome": "返回首页",
  "openInNewWindow": "在新窗口打开",
  "toggleDarkMode": "切换夜间模式",
  "toggleSidebar": "切换侧边栏",
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLink": true,
  "lastUpdated": true,
  "contributors": true
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
