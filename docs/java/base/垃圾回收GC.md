# 垃圾回收GC

## 1、垃圾回收(GC)的特点

- 垃圾回收机制只负责回收堆内存资源，不会回收任何 物理资源
- 程序无法 精确控制 垃圾回收动作的具体发生时间

- 在垃圾回收之前，总会先调用它的 finalize 方法

## 2、常见需手动释放的物理资源

- 文件/流资源
- 套接字资源(Socket)

- 数据库连接资源



## 3、try - with - resource (TWR)简介

- Java7引入的新特性
- 优雅关闭资源

- 一种Java语法糖



## 4、try - with - resource 使用

- 多资源自动关闭
- 待关闭资源必须 实现AutoCloseable接口 （如FileInputStream继承InputStream类，InputStream实现Closeable接口，Closeable接口继承AutoCloseable)

- 避免异常屏蔽(会采用追加的方式将底层异常追加到最外层异常上)

## 5、资源关闭顺序问题

- 先开后关原则
- 从外到内原则

- 底层资源单独声明原则



## 6、资源关闭特殊情况

资源对象被return的情况下，由调用方关闭

- ByteArrayInputStream等 不需要 检查关闭的资源对象
- 使用Socket获取的InputStream和OutputStream对象不需要关闭，当Socket关闭时会自动关闭

-   正确的方法是调用Socket的shutdownInput和shutdownOutput方法关闭，它只会关闭基于Socket的输入流，而不会关闭整个Socket连接
- 

```
private void rendFile{
	//readFile
    
    try{
        // 定义各种读写流的操作和声明
        ...
    }catch{
    	... 
    }finaly{
    	// 这里来添加关闭流的操作
    }
    
    
    //推荐
    try（// 定义各种读写流的操作和声明）{
        ...
    }catch{
    	... 
    }finaly{
    	// 这里来添加关闭流的操作
    }
    
}
```



资源关闭特殊情况

◆资源对象被return的情况下,由调用方关闭

◆ByteArrayInputStream等不需要检查关闭的资源对象

◆>使用Socket获取的InputStream和OutputStream对象不需要关闭