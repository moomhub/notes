<template><h1 id="mycat-学习" tabindex="-1"><a class="header-anchor" href="#mycat-学习" aria-hidden="true">#</a> MyCat 学习</h1>
<h2 id="mycat-安装和配置" tabindex="-1"><a class="header-anchor" href="#mycat-安装和配置" aria-hidden="true">#</a> MyCat 安装和配置</h2>
<blockquote>
<p>Mycat集群解决方案</p>
</blockquote>
<p><img src="https://i.loli.net/2020/09/24/QtrzJfdehqGElxb.png" alt="image-20200924104156260"></p>
<h3 id="_1、mycat-安装-linux" tabindex="-1"><a class="header-anchor" href="#_1、mycat-安装-linux" aria-hidden="true">#</a> 1、MyCat 安装（Linux）</h3>
<h4 id="_1-1、java-环境安装" tabindex="-1"><a class="header-anchor" href="#_1-1、java-环境安装" aria-hidden="true">#</a> 1.1、Java 环境安装</h4>
<p>Linux 软件下载地址：链接:   http://caiyun.feixin.10086.cn/dl/105CpmHq3NuN8    提取码:B7JT</p>
<ol>
<li>
<p>创建 JAVA 目录</p>
<p>在<code>/usr/local</code>目录下创建<code>java</code>目录，</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /usr/local/java
<span class="token builtin class-name">cd</span> /usr/local/java
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>把下载的文件放在/usr/local/java/目录下，然后解压。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> -zxvf jdk-8u151-linux-x64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ol>
<h4 id="_1-2、mycat-安装" tabindex="-1"><a class="header-anchor" href="#_1-2、mycat-安装" aria-hidden="true">#</a> 1.2、MyCat 安装</h4>
<p>创建 JAVA 目录</p>
<p>上传文件到<code>/usr/local</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 解压文件</span>
<span class="token function">tar</span> -zxvf 安装包名称
<span class="token comment"># 新增用户</span>
adduser mycat
<span class="token comment"># 修改文件夹的所属用户</span>
<span class="token function">chown</span> mycat:mycat -R mycat
<span class="token comment"># 切换用户</span>
<span class="token function">su</span> - mycat
<span class="token comment"># 查看文件夹的所属用户</span>
<span class="token function">ls</span> -lh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="_1-3、mycat-和java-环境配置" tabindex="-1"><a class="header-anchor" href="#_1-3、mycat-和java-环境配置" aria-hidden="true">#</a> 1.3、MyCat 和java 环境配置</h4>
<p>修改 <strong>vi /etc/profile</strong></p>
<p>在 profile 文件中添加如下内容并保存：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># JAVA_HOME</span>
<span class="token builtin class-name">set</span> java environment
<span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/local/java/jdk1.8  
<span class="token assign-left variable">JRE_HOME</span><span class="token operator">=</span>/usr/local/java/jdk1.8/jre     
<span class="token assign-left variable">CLASS_PATH</span><span class="token operator">=</span>.:<span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar:<span class="token variable">$JRE_HOME</span>/lib
<span class="token builtin class-name">export</span> JAVA_HOME JRE_HOME CLASS_PATH <span class="token environment constant">PATH</span>
<span class="token comment">#Mycat_HOME</span>
<span class="token assign-left variable">MYCAT_HOME</span><span class="token operator">=</span>/usr/local/mycat
<span class="token builtin class-name">export</span> MYCAT_HOME
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$JRE_HOME</span>/bin:<span class="token variable">$MYCAT_HOME</span>/bin

<span class="token comment"># By default, we want umask to get set. This sets it for login shell</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>注意：其中 JAVA_HOME， JRE_HOME 和MYCAT_HOME 请根据自己的实际安装路径及 JDK 版本配置。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 让修改生效</span>
<span class="token builtin class-name">source</span> /etc/profile
<span class="token comment"># 验证是否安装</span>
java -version
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_2、mycat安装-docker" tabindex="-1"><a class="header-anchor" href="#_2、mycat安装-docker" aria-hidden="true">#</a> 2、MyCat安装（Docker）</h3>
<h4 id="_1、编写dockerfile-构建mycat镜像" tabindex="-1"><a class="header-anchor" href="#_1、编写dockerfile-构建mycat镜像" aria-hidden="true">#</a> 1、编写Dockerfile 构建Mycat镜像</h4>
<p>下载Mycat 安装包和拉取openjdk 8的环境然后编写下面的内容</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull openjdk:8
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8</span>
<span class="token instruction"><span class="token keyword">ADD</span> Mycat-1.6.7.4.tar.gz /usr/local</span>
<span class="token instruction"><span class="token keyword">VOLUME</span> /usr/local/mycat/conf</span>
<span class="token instruction"><span class="token keyword">ENV</span> MYCAT_HOME=/usr/local/mycat</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8066 9066</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"/usr/local/mycat/bin/mycat"</span>, <span class="token string">"console"</span>,<span class="token string">"&amp;"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后在Linux命令行中输入</p>
<blockquote>
<p>后面有一个点不要忘记了</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build -t mycat-1.6.7.4 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="_2、运行docker-容器" tabindex="-1"><a class="header-anchor" href="#_2、运行docker-容器" aria-hidden="true">#</a> 2、运行docker 容器</h4>
<p>把Mycat包conf文件目录下载复制到本地将要映射的文件，不然会启动失败</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name mycat1 <span class="token punctuation">\</span>
-p <span class="token number">8200</span>:8066 <span class="token punctuation">\</span>
-p <span class="token number">8201</span>:9066 <span class="token punctuation">\</span>
-v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.21 <span class="token punctuation">\</span>
mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name mycat2 <span class="token punctuation">\</span>
-p <span class="token number">8202</span>:8066 <span class="token punctuation">\</span>
-p <span class="token number">8203</span>:9066 <span class="token punctuation">\</span>
-v /opt/docker/mycats/mycat2/conf:/usr/local/mycat/conf <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.22 <span class="token punctuation">\</span>
mycat-1.6.7.4:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>然后修改配置完成对PXC 的配置</p>
<h3 id="_3、可能会遇见的问题的" tabindex="-1"><a class="header-anchor" href="#_3、可能会遇见的问题的" aria-hidden="true">#</a> 3、可能会遇见的问题的</h3>
<p>mycat 运行失败 可能是内存不足的原因停掉某些不必要的docker 服务</p>
<p>修改<strong>Server.xml</strong>文件</p>
<h2 id="mycat初始配置" tabindex="-1"><a class="header-anchor" href="#mycat初始配置" aria-hidden="true">#</a> Mycat初始配置</h2>
<p>修改conf/wrapper.conf文件</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code>vi conf/wrapper.conf

<span class="token comment"># Java Application </span>
wrapper.java.command-/usr/local/java/idk1.8/bin/iava <span class="token comment"># 设置为Java 路径下的地址</span>
wrapper.working.dir=..

<span class="token comment"># .....</span>
<span class="token comment"># 设置运行内存 默认的可能会导致内存不足而无法启动</span>
wrapper.java.additional.10=-Xmx256M
wrapper.java.additional.11=-Xms256M
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="mycat-设置为开机启动" tabindex="-1"><a class="header-anchor" href="#mycat-设置为开机启动" aria-hidden="true">#</a> Mycat 设置为开机启动</h3>
<p>制作 /etc/init.d/mycat</p>
<h3 id="设置mycat软路由" tabindex="-1"><a class="header-anchor" href="#设置mycat软路由" aria-hidden="true">#</a> 设置Mycat软路由</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">ln</span> -s /usr/local/mycat/bin/mycat /etc/init.d/mycat
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>成功后就可以使用命令参考：<strong>service mycat start | stop | restart |  console</strong></p>
<p>service mycat start 启动查看效果，结果能正常启动了</p>
<p><img src="https://img-blog.csdnimg.cn/20191116121127936.png" alt="img"></p>
<h3 id="设置开机自启" tabindex="-1"><a class="header-anchor" href="#设置开机自启" aria-hidden="true">#</a> 设置开机自启</h3>
<p>chkconfig --add mycat 加入开机服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chkconfig</span> --add mycat
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>重启查看效果</p>
<p><img src="https://img-blog.csdnimg.cn/20191116121143883.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zODg2MDU2NQ==,size_16,color_FFFFFF,t_70" alt="img"></p>
<h3 id="脚本开机启动" tabindex="-1"><a class="header-anchor" href="#脚本开机启动" aria-hidden="true">#</a> 脚本开机启动</h3>
<ol>
<li>修改脚本文件rc.local：vim /etc/rc.d/rc.local</li>
</ol>
<p>这个脚本是使用者自定的开机启动程序，可以在里面添加想在系统启动之后执行的脚本或者脚本执行命令</p>
<ol start="2">
<li>
<p>添加如下内容：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/java/jdk1.7.0_80              //java路径根据自己实际情况填写
/usr/local/mycat/bin/mycat start
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>esc 退出编辑，:wq 保存修改</p>
</li>
<li>
<p>将rc.local修改为可执行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">777</span> /etc/rc.d/rc.local
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ol>
<h2 id="mycat-连接-sql-8-默认的是5" tabindex="-1"><a class="header-anchor" href="#mycat-连接-sql-8-默认的是5" aria-hidden="true">#</a> Mycat 连接 SQL 8(默认的是5)</h2>
<p>修改Mycat 中的连接数据库的jar包</p>
<p>jar 包下载地址 https://mvnrepository.com/artifact/mysql/mysql-connector-java</p>
<p>把  mysql-connector-java-5.1.35.jar 替换成mysql 8的安装包</p>
<p>同时 <strong>schema.xml</strong> 中连接方式要变成如下配置</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>schema</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>USERDB<span class="token punctuation">"</span></span> <span class="token attr-name">checkSQLschema</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">sqlMaxLimit</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span> <span class="token attr-name">dataNode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dn1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>schema</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dataNode</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dn1<span class="token punctuation">"</span></span> <span class="token attr-name">dataHost</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>db1<span class="token punctuation">"</span></span> <span class="token attr-name">database</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user_db<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dataHost</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>db1<span class="token punctuation">"</span></span> <span class="token attr-name">maxCon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1000<span class="token punctuation">"</span></span> <span class="token attr-name">minCon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>10<span class="token punctuation">"</span></span> <span class="token attr-name">balance</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span>
			<span class="token attr-name">writeType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">dbType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mysql<span class="token punctuation">"</span></span> <span class="token attr-name">dbDriver</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc<span class="token punctuation">"</span></span> <span class="token attr-name">switchType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span>  <span class="token attr-name">slaveThreshold</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>heartbeat</span><span class="token punctuation">></span></span>select user()<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>heartbeat</span><span class="token punctuation">></span></span>
	<span class="token comment">&lt;!-- can have multi write hosts --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>writeHost</span> <span class="token attr-name">host</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>172.17.0.9<span class="token punctuation">"</span></span> <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql://172.17.0.9:3306?useSSL=false<span class="token entity named-entity" title="&amp;">&amp;amp;</span>useUnicode=true<span class="token entity named-entity" title="&amp;">&amp;amp;</span>characterEncoding=UTF8<span class="token entity named-entity" title="&amp;">&amp;amp;</span>serverTimezone=UTC<span class="token entity named-entity" title="&amp;">&amp;amp;</span>allowPublicKeyRetrieval=true<span class="token punctuation">"</span></span> <span class="token attr-name">user</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span> <span class="token attr-name">password</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>123456<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>readHost</span> <span class="token attr-name">host</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>172.17.0.10<span class="token punctuation">"</span></span> <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbc:mysql://172.17.0.10:3306?useSSL=false<span class="token entity named-entity" title="&amp;">&amp;amp;</span>useUnicode=true<span class="token entity named-entity" title="&amp;">&amp;amp;</span>characterEncoding=UTF8<span class="token entity named-entity" title="&amp;">&amp;amp;</span>serverTimezone=UTC<span class="token entity named-entity" title="&amp;">&amp;amp;</span>allowPublicKeyRetrieval=true<span class="token punctuation">"</span></span> <span class="token attr-name">user</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span> <span class="token attr-name">password</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>123456<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>writeHost</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!-- &lt;writeHost host="hostM2" url="localhost:3316" user="root" password="123456"/> --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dataHost</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="mycat-配置文件解析" tabindex="-1"><a class="header-anchor" href="#mycat-配置文件解析" aria-hidden="true">#</a> MyCat 配置文件解析</h2>
<p>MYCAT的关键配置文件</p>
<ol>
<li>schema.xml用于配置逻辑库表及数据节点</li>
<li>rule.xml用于配置表的分片规则</li>
<li>server.xml用于配置服务器权限</li>
</ol>
<h3 id="schema-xml" tabindex="-1"><a class="header-anchor" href="#schema-xml" aria-hidden="true">#</a> schema.xml</h3>
<p>定义逻辑库表</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>schema</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>schema</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>定义数据节点</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dataNode</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dataNode</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>定义数据节点的物理数据源</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dataHost</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dataHost</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="rule-xml" tabindex="-1"><a class="header-anchor" href="#rule-xml" aria-hidden="true">#</a> rule.xml</h3>
<p>定义表使用的分片规则</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tableRule</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tableRule</span><span class="token punctuation">></span></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>定义分片算法</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>function</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>function</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="server-xml" tabindex="-1"><a class="header-anchor" href="#server-xml" aria-hidden="true">#</a> server.xml</h3>
<p>用于定义系统配置</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>system</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span> <span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>system</span><span class="token punctuation">></span></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>用于定义连接MyCAT的用户</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>user</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>user</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>Mycat Server使用</p>
<h2 id="mycat数据切分" tabindex="-1"><a class="header-anchor" href="#mycat数据切分" aria-hidden="true">#</a> Mycat数据切分</h2>
<p>数据切分算法</p>
<table>
<thead>
<tr>
<th>切分算法</th>
<th>适用场合</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>主键求模切分</td>
<td>数据增长速度慢，难于增加分片</td>
<td>有明确主键值</td>
</tr>
<tr>
<td>枚举值切分</td>
<td>归类存储数据，适合大多数业务</td>
<td></td>
</tr>
<tr>
<td>主键范围切分</td>
<td>数据快速增长，容易增加分片</td>
<td>有明确主键值</td>
</tr>
<tr>
<td>日期切分</td>
<td>数据快速增长，容易增加分片</td>
<td></td>
</tr>
</tbody>
</table>
<p>主键求模切分
求模切分适合用在初始数据很大，但是数据增长不快的场景
行政企业  地图产品  数据数据</p>
<p>主键求模切分 （可以根据主键来进行不同数据来进行分片保持）
求模切分的弊病在于扩展新分片难度大，迁移的数据太多</p>
<p>PXC1  121 122 123   （分片一）     PXC2    151 159 215 （分片二）</p>
<p><img src="https://i.loli.net/2020/09/24/uKvUxtDn7mWyC6M.png" alt="image-20200924102323872"></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>schema</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>test<span class="token punctuation">"</span></span> <span class="token attr-name">checksQLschema</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span> <span class="token attr-name">sqlMaxLimit</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>t_user<span class="token punctuation">"</span></span> <span class="token attr-name">dataNode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dn1 ,dn2<span class="token punctuation">"</span></span> <span class="token attr-name">rule</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mod-long<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>t_customer<span class="token punctuation">"</span></span> <span class="token attr-name">dataNode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dn1 ,dn2<span class="token punctuation">"</span></span> <span class="token attr-name">rule</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sharding-customer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>childTable</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>t_orders<span class="token punctuation">"</span></span> <span class="token attr-name">primaryKey</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ID<span class="token punctuation">"</span></span> <span class="token attr-name">joinKey</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>customer_id<span class="token punctuation">"</span></span> <span class="token attr-name">parentKey</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
			<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>childTabie</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span>
&lt;/ schema>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="mycat-默认文件内容" tabindex="-1"><a class="header-anchor" href="#mycat-默认文件内容" aria-hidden="true">#</a> Mycat 默认文件内容</h2>
<h3 id="server-xml-1" tabindex="-1"><a class="header-anchor" href="#server-xml-1" aria-hidden="true">#</a> Server.xml</h3>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">mycat:server</span> <span class="token name">SYSTEM</span> <span class="token string">"server.dtd"</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">mycat:</span>server</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>mycat</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://io.mycat/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>system</span><span class="token punctuation">></span></span>
     <span class="token comment">&lt;!-- 0为需要密码登陆、1为不需要密码登陆 ,默认为0，设置为1则需要指定默认账户--></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>nonePasswordLogin<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span> 
     <span class="token comment">&lt;!-- 0遇上没有实现的报文(Unknown command:),就会报错、1为忽略该报文，返回ok报文。
	在某些mysql客户端存在客户端已经登录的时候还会继续发送登录报文,mycat会报错,该设置可以绕过这个错误--></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ignoreUnknownCommand<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>useHandshakeV10<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>removeGraveAccent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>useSqlStat<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>  <span class="token comment">&lt;!-- 1为开启实时统计、0为关闭 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>useGlobleTableCheck<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>  <span class="token comment">&lt;!-- 1为开启全加班一致性检测、0为关闭 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sqlExecuteTimeout<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>300<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>  <span class="token comment">&lt;!-- SQL 执行超时 单位:秒--></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sequenceHandlerType<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token comment">&lt;!--&lt;property name="sequnceHandlerPattern">(?:(\s*next\s+value\s+for\s*MYCATSEQ_(\w+))(,|\)|\s)*)+&lt;/property>
	INSERT INTO `travelrecord` (`id`,user_id) VALUES ('next value for MYCATSEQ_GLOBAL',"xxx");
	--></span>
	<span class="token comment">&lt;!--必须带有MYCATSEQ_或者 mycatseq_进入序列匹配流程 注意MYCATSEQ_有空格的情况--></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sequnceHandlerPattern<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>(?:(\s*next\s+value\s+for\s*MYCATSEQ_(\w+))(,|\)|\s)*)+<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>subqueryRelationshipCheck<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- 子查询中存在关联查询的情况下,检查关联字段中是否有分片字段 .默认 false --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sequenceHanlderClass<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>io.mycat.route.sequence.handler.HttpIncrSequenceHandler<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!--  &lt;property name="useCompression">1&lt;/property>--></span> <span class="token comment">&lt;!--1为开启mysql压缩协议--></span>
        <span class="token comment">&lt;!--  &lt;property name="fakeMySQLVersion">5.6.20&lt;/property>--></span> <span class="token comment">&lt;!--设置模拟的MySQL版本号--></span>
	<span class="token comment">&lt;!-- &lt;property name="processorBufferChunk">40960&lt;/property> --></span>
	<span class="token comment">&lt;!-- 
	&lt;property name="processors">1&lt;/property> //mycat进程数量
	&lt;property name="processorExecutor">32&lt;/property> 
	 --></span>
        <span class="token comment">&lt;!--默认为type 0: DirectByteBufferPool | type 1 ByteBufferArena | type 2 NettyBufferPool --></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>processorBufferPoolType<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--默认是65535 64K 用于sql解析时最大文本长度 --></span>
		<span class="token comment">&lt;!--&lt;property name="maxStringLiteralLength">65535&lt;/property>--></span>
		<span class="token comment">&lt;!--&lt;property name="sequenceHandlerType">0&lt;/property>--></span>
		<span class="token comment">&lt;!--&lt;property name="backSocketNoDelay">1&lt;/property>--></span>
		<span class="token comment">&lt;!--&lt;property name="frontSocketNoDelay">1&lt;/property>--></span>
		<span class="token comment">&lt;!--&lt;property name="processorExecutor">16&lt;/property>--></span>
		<span class="token comment">&lt;!--
			&lt;property name="serverPort">8066&lt;/property>
			&lt;property name="managerPort">9066&lt;/property> 
			&lt;property name="idleTimeout">300000&lt;/property> // 连接mysql超时(毫秒)
			&lt;property name="bindIp">0.0.0.0&lt;/property> //监听IP
			&lt;property name="dataNodeIdleCheckPeriod">300000&lt;/property>//5 * 60 * 1000L; //连接空闲检查
			&lt;property name="frontWriteQueueSize">4096&lt;/property> // 前端写队列的大小
			&lt;property name="processors">32&lt;/property> --></span>
		<span class="token comment">&lt;!--分布式事务开关，0为不过滤分布式事务，1为过滤分布式事务（如果分布式事务内只涉及全局表，则不过滤），2为不过滤分布式事务,但是记录分布式事务日志--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleDistributedTransactions<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--off heap for merge/order/group/limit      1开启   0关闭--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>useOffHeapForMerge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--单位为m--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>memoryPageSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>64k<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--单位为k--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>spillsFileBufferSize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1k<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>useStreamOutput<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--单位为m--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>systemReserveMemorySize<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>384m<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--是否采用zookeeper协调切换  --></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>useZKSwitch<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>

		<span class="token comment">&lt;!-- XA Recovery Log日志路径 --></span>
		<span class="token comment">&lt;!--&lt;property name="XARecoveryLogBaseDir">./&lt;/property>--></span>

		<span class="token comment">&lt;!-- XA Recovery Log日志名称 --></span>
		<span class="token comment">&lt;!--&lt;property name="XARecoveryLogBaseName">tmlog&lt;/property>--></span>
		<span class="token comment">&lt;!--如果为 true的话 严格遵守隔离级别,不会在仅仅只有select语句的时候在事务中切换连接--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>strictTxIsolation<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--如果为0的话,涉及多个DataNode的catlet任务不会跨线程执行--></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>parallExecute<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>system</span><span class="token punctuation">></span></span>
	
	<span class="token comment">&lt;!-- 全局SQL防火墙设置 --></span>
	<span class="token comment">&lt;!--白名单可以使用通配符%或着*--></span>
	<span class="token comment">&lt;!--例如&lt;host host="127.0.0.*" user="root"/>--></span>
	<span class="token comment">&lt;!--例如&lt;host host="127.0.*" user="root"/>--></span>
	<span class="token comment">&lt;!--例如&lt;host host="127.*" user="root"/>--></span>
	<span class="token comment">&lt;!--例如&lt;host host="1*7.*" user="root"/>--></span>
	<span class="token comment">&lt;!--这些配置情况下对于127.0.0.1都能以root账户登录--></span>
	<span class="token comment">&lt;!--
	&lt;firewall>
	   &lt;whitehost>
	      &lt;host host="1*7.0.0.*" user="root"/>
	   &lt;/whitehost>
       &lt;blacklist check="false">
       &lt;/blacklist>
	&lt;/firewall>
	--></span>

	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>user</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>root<span class="token punctuation">"</span></span> <span class="token attr-name">defaultAccount</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>123456<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>schemas<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>TESTDB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>defaultSchema<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>TESTDB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token comment">&lt;!--No MyCAT Database selected 错误前会尝试使用该schema作为schema，不设置则为null,报错 --></span>
		
		<span class="token comment">&lt;!-- 表级 DML 权限设置 --></span>
		<span class="token comment">&lt;!-- 		
		&lt;privileges check="false">
			&lt;schema name="TESTDB" dml="0110" >
				&lt;table name="tb01" dml="0000">&lt;/table>
				&lt;table name="tb02" dml="1111">&lt;/table>
			&lt;/schema>
		&lt;/privileges>		
		 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>user</span><span class="token punctuation">></span></span>

	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>user</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>user<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>schemas<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>TESTDB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>readOnly<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>defaultSchema<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>TESTDB<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>user</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">mycat:</span>server</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br></div></div></template>
