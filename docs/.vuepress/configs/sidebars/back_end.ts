const springboot = [
  {
    text: "Spring Boot基础",
    collapsible: true,
    children: [
      "/backend/springboot/helloworld.md",
      "/backend/springboot/SpringBoot注解.md",
      "/backend/springboot/错误处理.md",
      "/backend/springboot/SpringBoot使用Log4j2日志框架.md",
      "/backend/springboot/SpringBoot拦截器.md",
      "/backend/springboot/Spring Boot 使用 Junit5测试.md"
    ],
  },
  {
    text: "Spring Boot 监控应用",
    collapsible: true,
    children: [
      "/backend/springboot/监控应用Spring-Boot-Actuator.md",
      "/backend/springboot/图形监控-Spring-Boot-Admin.md",
    ],
  },
  {
    text: "Spring Boot 多样化运行",
    collapsible: true,
    children: [
      "/backend/springboot/SpringBoot项目Jar方式运行.md",
      "/backend/springboot/SpringBoot多样化构建Docker.md",
    ],
  },
];
const springcloud = [
  {
    text: "Gateway 网关服务",
    collapsible: true,
    children: [
      "/backend/springcloud/gateway/Spring-Gateway配置说明.md",
      "/backend/springcloud/gateway/Hystrixs-断路由使用.md",
    ],
  },
  {
    text: "服务调用",
    collapsible: true,
    children: [
      "/backend/springcloud/openfeign/Loadbalancer负载均衡.md",
      "/backend/springcloud/openfeign/Ribbon负载均衡服务.md",
      "/backend/springcloud/openfeign/服务调用OpenFeign.md",
    ],
  },
  {
    text: "Stream 消息驱动",
    collapsible: true,
    children: [
      "/backend/springcloud/stream/Spring-Cloud-Stream消息驱动配置.md",
      "/backend/springcloud/stream/Spring-Cloud-Stream消息驱动-消费异常处理机制.md",
      "/backend/springcloud/stream/Spring-Cloud-Stream消息驱动消息过滤的三种方式.md",
    ],
  },
  {
    text: " 整合RockMQ",
    collapsible: true,
    children: [
      "/backend/springcloud/stream/Stream整合Rocketmq实现广播和顺序消息(一).md",
      "/backend/springcloud/stream/Stream整合Rocketmq实现延时消息(二).md",
      "/backend/springcloud/stream/Stream整合Rocketmq实现事务消息(三).md",
    ],
  },
  {
    text: "分布式事务",
    collapsible: true,
    children: ["/backend/springcloud/seata/Seata分布式事务.md"],
  },
  {
    text: "链路追踪",
    collapsible: true,
    children: ["/backend/springcloud/链路追踪/Sleuth和Zipkin.md"],
  },
];

export { springboot, springcloud };
