# Spring Boot 多样化构建 Docker 镜像

伴随着技术的不断更新，基于 Spring Boot 构建 Docker 镜像的方式也是五花八门，大致分为以下几种：

## Idea 构建

Cloud Native Buildpacks（Spring Boot 2.3+ ）版本开始支持

Google 的 jib-maven-plugin

fabric8 和 spotify 的 docker-maven-plugin

## 简单的Spring-Boot-Docker 项目

先准备一个简单的基于 Maven 的 Spring Boot 项目，方便实践。

### pom

添加 spring-boot-starter-web 依赖。

```纯文本
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```


### 配置文件

配置文件无需添加任何内容，基于约定优于配置，使用默认配置即可。

### 启动类

```java
@SpringBootApplication
public class SpringBootDockerApplication {

  public static void main(String[] args) {
      SpringApplication.run(SpringBootDockerApplication.class, args);
  }
}
```


### 控制层

```java
@RestController
public class DockerController {

  @RequestMapping("/")
  public String index() {
      return "Hello Spring Boot Docker!";
  }
}
```


### 启动访问

启动项目，浏览器访问：[http://localhost:8080/，页面返回：Hello](http://localhost:8080/，页面返回：Hello) Spring Boot Docker!，说明项目OK，准备工作已完成。

## Idea 本地推送到指定的docker

### Dockerfile

```Docker
FROM openjdk:8u212-jre
ADD target/spring-logging-0.0.1.jar app.jar
#VOLUME /logs
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
```


### idae 配置

1. 如下图红框所示，创建一个配置：

2. 创建一个Dockerfile配置，如下所示：

3. Dockerfile配置详情如下图所示，请按照图中的说明进行设置，确保每个红框中都会执行到：

4. 上图中最下面的那个"Run Maven Goal"点击后，会弹出一个小窗口 ，用来输入要执行的maven命令，这里输入

**clean package -U -DskipTests** ，表示每次在构建镜像之前，都会将当前工程清理掉并且重新编译构建：

1. 设置完成后，点击下图红框中的绿色三角按钮，执行此配置：

2. 运行结果如下所示，项目构建成功后，在Docker上部署镜像成功，然后运行容器成功：

## SpringBoot 原生自带的配置

使用Spring Boot 2.3.X + 自带的Docker工具进行构建Docker

```纯文本
mvn spring-boot:build-images
```


### pom文件

完整配置如下：

### 私有容器配置

```xml
<build>
    <plugins>
        <!-- spring-boot-maven-plugin -->
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
        <!-- fabric8 的 docker-maven-plugin -->
        <plugin>
            <groupId>io.fabric8</groupId>
            <artifactId>docker-maven-plugin</artifactId>
            <version>0.34.1</version>
            <!-- 全局配置 -->
            <configuration>
                <!-- 配置远程 Docker 守护进程 url -->
                <dockerHost>http://192.168.10.10:2375</dockerHost>
                <!-- 镜像相关配置，支持多镜像 -->
                <images>
                    <!-- 单个镜像配置 -->
                    <image>
                        <!-- 镜像名:版本号 -->
                        <name>${project.artifactId}:${project.version}</name>
                        <!--
                            镜像仓库（公共仓库、阿里云仓库、私有自建仓库）配置，用于推送/拉取镜像
                            如果不想推送至镜像仓库则无需配置
                        -->
                        <registry>192.168.10.10:5000</registry>
                        <!-- 镜像 build 相关配置 -->
                        <build>
                            <!-- 使用 Dockerfile 文件，默认地址是 src/main/docker -->
                            <dockerFile>Dockerfile</dockerFile>
                            <!-- 或者指定地址例如：从项目根路径开始找 项目名/docker -->
                            <!--<dockerFile>${project.basedir}/docker/Dockerfile</dockerFile>-->
                            <!--
                                配置构建镜像时所需要的资源
                                配置项说明：http://maven.fabric8.io/#build-assembly-descriptor
                            -->
                            <assembly>
                                <descriptorRef>artifact</descriptorRef>
                            </assembly>
                        </build>
                    </image>
                </images>
                <!-- 认证配置，用于镜像仓库认证 -->
                <!--
                <authConfig>
                    <username>用户名</username>
                    <password>密码</password>
                </authConfig>
                -->
            </configuration>
        </plugin>
    </plugins>
</build>
```

### 阿里云容器配置

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <!-- 分层配置 -->
                <layers>
                    <enabled>true</enabled>
                </layers>
                <!-- Docker 配置 -->
                <docker>
                    <!-- 推送至 Docker 服务器，配置远程 Docker 守护进程 url -->
                    <!-- 选择不同的方式进行 docker 设置 http 还是 tcp-->
                    <host>tcp://192.168.101.10:2375</host>
                    <!-- 是否启用 TLS 校验 -->
                    <tlsVerify>false</tlsVerify>
                    <!-- 开启 TLS 校验需要设置证书地址 -->
                    <!--<certPath>/home/user/.minikube/certs</certPath>-->
                    <!-- 推送至指定镜像仓库（公共仓库、阿里云仓库、私有仓库等） -->
                    <publishRegistry>
                        <username>xxx</username>
                        <password>xxxx</password>
                        <url>registry.cn-chengdu.aliyuncs.com</url>
                    </publishRegistry>
                </docker>
                <!-- 镜像配置 -->
                <image>
                    <!-- 镜像名:版本号  参考阿里云容器服务 -->
                    <name>registry.cn-chengdu.aliyuncs.com/moom/moom-auth:0.0.2</name>
                    <!-- 执行完 build 自动 push -->
                    <publish>true</publish>
                    <!-- 拉取镜像的策略，可选的值：ALWAYS, NEVER, IF_NOT_PRESENT -->
                    <pullPolicy>IF_NOT_PRESENT</pullPolicy>
                </image>
            </configuration>
        </plugin>
    </plugins>
</build>
```


执行以下命令进行镜像构建和推送：

> 或者点击Idea 中 spring-boot：build-images


```纯文本
mvn spring-boot:build-image -Dmaven.test.skip=true
```


## jib-maven-plugin

### 简介

Jib 是 Google 开发的可以直接构建 Java 应用程序的 Docker 和 OCI 镜像的类库，以 Maven 和 Gradle 插件形式提供。

通过 Jib，Java 开发者可以使用他们熟悉的 Java 工具来构建容器。Jib 是一个快速而简单的容器镜像构建工具，它负责处理将应用程序打包到容器镜像中所需的所有步骤。它不需要你编写 Dockerfile 或安装 Docker，而且可以直接集成到 Maven 和 Gradle 中 —— 只需将插件添加到构建中，就可以立即将 Java 应用程序容器化。

Spring Boot 项目添加 jib-maven-plugin 插件。添加相关依赖。

```xml
<dependency>
    <groupId>com.google.cloud.tools</groupId>
    <artifactId>jib-maven-plugin</artifactId>
    <version>2.8.0</version>
</dependency>
```


### pom文件

> Jib 可以快速将 Java 应用程序构建为 Docker 镜像推送至指定远程仓库：<br />DockerHub 官方公共仓库（DockerHub 官方公共仓库国内访问速度堪忧，不推荐）<br />阿里云镜像仓库（需要在阿里云登录账号自行创建仓库）<br />自建私有镜像仓库（本文演示方案）私有镜像仓库搭建请参考：Docker 私有镜像仓库的搭建及认证


### 私有仓库配置

完整配置如下：

```xml
<build>
	<plugins>
		<plugin>
			<groupId>
				com.google.cloud.tools
			</groupId>
			<artifactId>
				jib-maven-plugin
			</artifactId>
			<version>
				2.8.0
			</version>
			<configuration>
				<!-- 拉取所需的基础镜像 -->
				<from>
					<!-- 默认从官方公共仓库拉取镜像，速度较慢 -->
					<image>
						openjdk:alpine
					</image>
					<!-- 从指定仓库拉取镜像提速（需提前将镜像 push 至仓库） -->
					<!-- <image>192.168.10.10:5000/openjdk:alpine</image> -->
				</from>
				<!-- push 到哪个镜像仓库（公共仓库、阿里云仓库、私有自建仓库等） -->
				<to>
					<!-- 使用 DockerHub 的官方公共仓库：仓库地址/用户名/镜像名 -->
					<!-- <image>registry.hub.docker.com/mrhelloworld/${project.name}</image> -->
					<!-- 使用自建的私有仓库：仓库地址/镜像名 -->
					<image>
						192.168.10.10:5000/${project.artifactId}
					</image>
					<!-- 镜像版本号 -->
					<tags>
						<tag>
							${project.version}
						</tag>
					</tags>
					<!-- 连接仓库的账号密码 -->
					<auth>
						<username>
							用户名
						</username>
						<password>
							密码
						</password>
					</auth>
				</to>
				<!-- 使 jib 插件支持 http 协议连接镜像仓库(安全起见，默认是关闭的) -->
				<allowInsecureRegistries>
					true
				</allowInsecureRegistries>
				<container>
					<!-- 启动类 -->
					<mainClass>
						org.example.SpringBootDockerApplication
					</mainClass>
				</container>
			</configuration>
		</plugin>
	</plugins>
</build>

```


### 阿里云容器配置

```xml
<build>
	<plugins>
		<plugin>
			<groupId>
				com.google.cloud.tools
			</groupId>
			<artifactId>
				jib-maven-plugin
			</artifactId>
			<version>
				2.8.0
			</version>
			<configuration>
				<!-- 拉取所需的基础镜像 -->
				<from>
					<!-- 默认从官方公共仓库拉取镜像，速度较慢 -->
					<image>
						openjdk:8u212-jre
					</image>
					<!-- 从指定仓库拉取镜像提速（需提前将镜像 push 至仓库） -->
					<!-- <image>192.168.10.10:5000/openjdk:alpine</image> -->
				</from>
				<!-- push 到哪个镜像仓库（公共仓库、阿里云仓库、私有自建仓库等） -->
				<to>
					<!-- 使用 DockerHub 的官方公共仓库：仓库地址/用户名/镜像名 -->
					<!-- <image>registry.hub.docker.com/mrhelloworld/${project.name}</image> -->
					<!-- 使用自建的私有仓库：仓库地址/镜像名 -->
					<image>
						registry.cn-chengdu.aliyuncs.com/moom/moom-auth
					</image>
					<!-- 镜像版本号 -->
					<tags>
						<tag>
							${project.version}
						</tag>
					</tags>
					<!-- 连接仓库的账号密码 -->
					<auth>
						<username>
							xxxx
						</username>
						<password>
							xxxx
						</password>
					</auth>
				</to>
				<!-- 使 jib 插件支持 http 协议连接镜像仓库(安全起见，默认是关闭的) -->
				<allowInsecureRegistries>
					true
				</allowInsecureRegistries>
				<container>
					<!-- 启动类 -->
					<mainClass>
						org.example.logging.LoggingApplication8080
					</mainClass>
				</container>
			</configuration>
		</plugin>
	</plugins>
</build>

```


## docker-maven-plugin

使用这种方式就需要我们自己维护 Dockerfile 了，这也是之前传统的构建方式，分为两个版本：

fabric8：开源的集成开发平台，为基于 Kubernetes、Docker 和 Jenkins 的微服务提供持续发布<br />spotify：Spotify（声田）一个正版流媒体音乐服务平台内部团队开发的插件

### fabric8

#### pom文件

#### 私有仓库配置

```xml
<build>
	<plugins>
		<!-- spring-boot-maven-plugin -->
		<plugin>
			<groupId>
				org.springframework.boot
			</groupId>
			<artifactId>
				spring-boot-maven-plugin
			</artifactId>
		</plugin>
		<!-- fabric8 的 docker-maven-plugin -->
		<plugin>
			<groupId>
				io.fabric8
			</groupId>
			<artifactId>
				docker-maven-plugin
			</artifactId>
			<version>
				0.34.1
			</version>
			<!-- 全局配置 -->
			<configuration>
				<!-- 配置远程 Docker 守护进程 url -->
				<dockerHost>
					http://192.168.10.10:2375
				</dockerHost>
				<!-- 镜像相关配置，支持多镜像 -->
				<images>
					<!-- 单个镜像配置 -->
					<image>
						<!-- 镜像名:版本号 -->
						<name>
							${project.artifactId}:${project.version}
						</name>
						<!-- 镜像仓库（公共仓库、阿里云仓库、私有自建仓库）配置，用于推送/拉取镜像                            如果不想推送至镜像仓库则无需配置 -->
						<registry>
							192.168.10.10:5000
						</registry>
						<!-- 镜像 build 相关配置 -->
						<build>
							<!-- 使用 Dockerfile 文件，默认地址是 src/main/docker -->
							<dockerFile>
								Dockerfile
							</dockerFile>
							<!-- 或者指定地址例如：从项目根路径开始找 项目名/docker -->
							<!-- <dockerFile>${project.basedir}/docker/Dockerfile</dockerFile> -->
							<!-- 配置构建镜像时所需要的资源                                配置项说明：http://maven.fabric8.io/#build  -assembly-descriptor -->
							<assembly>
								<descriptorRef>
									artifact
								</descriptorRef>
							</assembly>
						</build>
					</image>
				</images>
				<!-- 认证配置，用于镜像仓库认证 -->
				<!-- <authConfig>                    <username>用户名</username>                    <password>密码</password>                </authConfig> -->
			</configuration>
		</plugin>
	</plugins>
</build>

```


#### 阿里云容器配置

```xml
<build>
	<plugins>
		<!-- spring-boot-maven-plugin -->
		<plugin>
			<groupId>
				org.springframework.boot
			</groupId>
			<artifactId>
				spring-boot-maven-plugin
			</artifactId>
		</plugin>
		<!-- fabric8 的 docker-maven-plugin -->
		<plugin>
			<groupId>
				io.fabric8
			</groupId>
			<artifactId>
				docker-maven-plugin
			</artifactId>
			<version>
				0.34.1
			</version>
			<!-- 全局配置 -->
			<configuration>
				<!-- 配置远程 Docker 守护进程 url -->
				<dockerHost>
					http://192.168.10.10:2375
				</dockerHost>
				<!-- 镜像相关配置，支持多镜像 -->
				<images>
					<!-- 单个镜像配置 -->
					<image>
						<!-- 镜像名:版本号 -->
						<name>
							registry.cn-chengdu.aliyuncs.com/moom/moom-auth:0.0.2
						</name>
						<!-- 镜像仓库（公共仓库、阿里云仓库、私有自建仓库）配置，用于推送/拉取镜像                            如果不想推送至镜像仓库则无需配置 -->
						<registry>
							registry.cn-chengdu.aliyuncs.com
						</registry>
						<!-- 镜像 build 相关配置 -->
						<build>
							<!-- 使用 Dockerfile 文件，默认地址是 src/main/docker -->
							<dockerFile>
								Dockerfile
							</dockerFile>
							<!-- 或者指定地址例如：从项目根路径开始找 项目名/docker -->
							<!-- <dockerFile>${project.basedir}/docker/Dockerfile</dockerFile> -->
							<!-- 配置构建镜像时所需要的资源                                配置项说明：http://maven.fabric8.io/#build  -assembly-descriptor -->
							<assembly>
								<descriptorRef>
									artifact
								</descriptorRef>
							</assembly>
						</build>
					</image>
				</images>
				<!-- 认证配置，用于镜像仓库认证 -->
				<authConfig>
					<username>
						xxx
					</username>
					<password>
						xxx
					</password>
				</authConfig>
			</configuration>
		</plugin>
	</plugins>
</build>

```


#### Dockerfile

在项目 src/main/docker 目录下添加 Dockerfile 文件，添加以下内容。

```纯文本
# 基础镜像FROM openjdk:8u212-jre# 容器开放端口EXPOSE 8080# 将 target/docker 目录（打包以后 Dockerfile 和 jar 包在同一目录下）的 jar 包拷贝到 docker 中，并重命名为 xxx.jarADD log.jar /app.jar# 容器启动执行命令ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
```


#### 打包并推送

执行以下命令进行镜像构建并推送至 Docker 服务：

```纯文本
mvn clean package docker:build -Dmaven.test.skip=true
```


执行以下命令进行镜像构建并推送至仓库（默认推送公共仓库，除非配置了阿里云仓库或者私有自建仓库）：

```纯文本
mvn clean package docker:build docker:push -Dmaven.test.skip=true
```


## 通过私有镜像仓库启动容器

docker run -di --name spring-boot-docker -p 8080:8080 192.168.10.10:5000/spring-boot-docker:1.0-SNAPSHOT<br />浏览器访问：[http://192.168.10.10:8080/](http://192.168.10.10:8080/)，页面返回：Hello Spring Boot Docker!，表示一切 OK。

