# Java环境变量配置

1、新建JAVA_HOME：C:\Program Files\Java\jdk1.8.0_161（jdk安装路径）

![img](https://gitee.com/moomhub/img/raw/master/ION9wE6xFDlGiKv.png)

2、找到Path，没有的话新建Path：

```
%JAVA_HOME%\bin;%PATH%
```

> 注意：如果是Windows10系统，要写jdk和jre的绝对路径

Path

```
C:\Program Files\Java\jre1.8.0_161\bin;C:\Program Files\Java\jdk1.8.0_161\bin
```

![img](https://gitee.com/moomhub/img/raw/master/tXEd3GoeDQnO7fh.png)

3、新建 CLASSPATH：

```
.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar
```

 ![img](https://gitee.com/moomhub/img/raw/master/JpyMVsRPuoneZh7.png)

配置完成。