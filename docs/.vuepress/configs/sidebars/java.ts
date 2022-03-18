const newApi = [
  {
    text: "8-17新特性",
    collapsible: false,
    children: ["/java/newApi/8-17新特性API.md"],
  },
  {
    text: "各版本特性预览",
    collapsible: false,
    children: [
      "/java/newApi/Java8新特性-Stream流式编程.md",
      "/java/newApi/Java8新特性-Optional.md",
      "/java/newApi/Java8新特性-时间类.md",
      "/java/newApi/Java9新特性.md",
      "/java/newApi/Java10新特性.md",
    ],
  },
];

const base = [
  {
    text: "基础",
    collapsible: false,
    children: [
      "/java/base/Java环境变量配置.md",
      "/java/base/Lambda表达式.md",
      "/java/base/垃圾回收GC.md",
    ],
  },
];

const thread = [
  {
    text: "Thread 线程",
    collapsible: false,
    children: [
      "/java/thread/线程基本概念.md",
      "/java/thread/实现线程的几种方式.md",
      "/java/thread/线程的生命周期.md",
      "/java/thread/线程安全.md",
      "/java/thread/等待唤醒机制.md",
      "/java/thread/指令重排.md",
    ],
  },
  {
    text: "多线程: JUC",
    collapsible: false,
    children: [
      "/java/thread/Java线程池.md",
      "/java/thread/Java并发编程-AQS并发容器同步组件.md",
    ],
  },
];

export { newApi, base, thread };
