# Java 环境变量配置

1、新建 JAVA_HOME：C:\Program Files\Java\jdk1.8.0_161（jdk 安装路径）

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/ION9wE6xFDlGiKv.png)

2、找到 Path，没有的话新建 Path：

```
%JAVA_HOME%\bin;%PATH%
```

> 注意：如果是 Windows10 系统，要写 jdk 和 jre 的绝对路径

Path

```
C:\Program Files\Java\jre1.8.0_161\bin;C:\Program Files\Java\jdk1.8.0_161\bin
```

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/tXEd3GoeDQnO7fh.png)

3、新建 CLASSPATH：

```
.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar
```

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/JpyMVsRPuoneZh7.png)

配置完成。
