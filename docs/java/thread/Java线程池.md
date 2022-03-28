# Java 线程池

## 传统单线程的缺点

- 每次 new Thread 新建对象，性能差
- 线程缺乏统一管理，可能无限制的新建线程，相互竞争，有可能占用过多系统资源导致死机或 OOM

- 缺少更多功能，如更多执行、定期执行、线程中断

## 线程池的好处

- 重用存在的线程，减少对象创建、消亡的开销，性能佳
- 可有效控制最大并发线程数，提高系统资源利用率，同时可以避免过多资源竞争，避免阻塞

- 提供定时执行、定期执行、单线程、并发数控制等功能

## 线程池-ThreadPoolExecutor

### 参数说明

corePoolSize：核心线程数量

maximumPoolSize：线程最大线程数

workQueue：阻塞队列，存储等待执行的任务，很重要，会对线程池运行过程产生重大影响

keepAliveTime：线程没有任务执行时最多保持多久时间终止

unit：keepAliveTime 的时间单位

threadFactory：线程工厂，用来创建线程

rejectHandler:当拒绝处理任务时的策略

### 线程池运行图

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1608690292663-2a4a6ee2-fb47-4b09-a866-1319f1361c2e.png)

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1608630719122-9ca95ba8-edcd-499c-8a01-fd5cbf841878.png)

### 方法

execute（)：提交任务，交给线程池执行

submit（）：提交任务，能够返回执行结果 execute+Future

shutdown（）：关闭线程池，等待任务都执行完

shutdownNow（)：关闭线程池，不等待任务执行完

### 监控方法

getTaskCount()：线程池已执行和未执行的任务总数

getCompleted TaskCount():已完成的任务数量

getPoolSize()：线程池当前的线程数量

getActiveCount():当前线程池中正在执行任务的线程数量

### 线程池- Executor 框架接口

Executors.newCachedThreadPool

创建一个缓存的线程池

Executors.newFixedThreadPool

创建一个可以指定线程数的线程池

Executors.newScheduledThreadPool

创建一个单线程线程池

Executors.newSingleThreadExecutor

创建一个单线程线程池

### 死锁-必要条件

互斥条件

请求和保持条件

不剥夺条件

环路条件
