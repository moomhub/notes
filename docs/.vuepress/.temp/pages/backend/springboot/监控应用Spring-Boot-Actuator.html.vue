<template><h1 id="spring-boot-监控应用-spring-boot-actuator" tabindex="-1"><a class="header-anchor" href="#spring-boot-监控应用-spring-boot-actuator" aria-hidden="true">#</a> Spring Boot 监控应用 Spring-Boot-Actuator</h1>
<p>Spring Boot提供了良好的服务监控模块，只需要通过简单的配置便可以完成服务监控和管理。但是服务监控这块内容往往是最容易被忽略的一块内容，今天我们一起来学习一下使用<code>spring-boot-actuator</code>进行服务监控。<code>spring-boot-actuator</code>提供了监控端点，这些端点直接返回<code>JSON字符串</code>，通过这些端点可以查询服务运行状况，为了防止端点直接暴露，一般情况下会使用安全框架，如Spring Security来管理这些端点的安全性。</p>
<h2 id="一-常用的端点" tabindex="-1"><a class="header-anchor" href="#一-常用的端点" aria-hidden="true">#</a> 一 常用的端点</h2>
<blockquote>
<p>默认情况下，除了<code>shutdown</code>，其他端点都是启动状态。</p>
</blockquote>
<table>
<thead>
<tr>
<th>端点地址</th>
<th>描述</th>
<th>默认启用</th>
</tr>
</thead>
<tbody>
<tr>
<td>auditevents</td>
<td>获取当前应用暴露的审计事件信息</td>
<td>是</td>
</tr>
<tr>
<td>beans</td>
<td>获取应用中所有的bean的完整关系列表</td>
<td>是</td>
</tr>
<tr>
<td>caches</td>
<td>获取公开可以用的缓存</td>
<td>是</td>
</tr>
<tr>
<td>conditions</td>
<td>获取自动配置条件信息，记录哪些自动配置条件通过和没通过的原因</td>
<td>是</td>
</tr>
<tr>
<td>configprops</td>
<td>获取所有配置属性，包括默认配置，显示一个所有 @ConfigurationProperties 的整理列版本</td>
<td>是</td>
</tr>
<tr>
<td>env</td>
<td>获取所有环境变量</td>
<td>是</td>
</tr>
<tr>
<td>flyway</td>
<td>获取已应用的所有Flyway数据库迁移信息，需要一个或多个 Flyway Bean</td>
<td>是</td>
</tr>
<tr>
<td>health</td>
<td>获取应用程序健康指标（运行状况信息）</td>
<td>是</td>
</tr>
<tr>
<td>httptrace</td>
<td>获取HTTP跟踪信息（默认情况下，最近100个HTTP请求-响应交换）。需要 HttpTraceRepository Bean</td>
<td>是</td>
</tr>
<tr>
<td>info</td>
<td>获取应用程序信息</td>
<td>是</td>
</tr>
<tr>
<td>integrationgraph</td>
<td>显示 Spring Integration 图。需要依赖 spring-integration-core</td>
<td>是</td>
</tr>
<tr>
<td>loggers</td>
<td>显示和修改应用程序中日志的配置</td>
<td>是</td>
</tr>
<tr>
<td>liquibase</td>
<td>获取应用的所有Liquibase数据库迁移。需要一个或多个 Liquibase Bean</td>
<td>是</td>
</tr>
<tr>
<td>metrics</td>
<td>获取系统度量指标信息</td>
<td>是</td>
</tr>
<tr>
<td>mappings</td>
<td>显示所有@RequestMapping路径的整理列表</td>
<td>是</td>
</tr>
<tr>
<td>scheduledtasks</td>
<td>显示应用程序中的计划任务</td>
<td>是</td>
</tr>
<tr>
<td>sessions</td>
<td>允许从Spring Session支持的会话存储中检索和删除用户会话。需要使用Spring Session的基于Servlet的Web应用程序</td>
<td>是</td>
</tr>
<tr>
<td>shutdown</td>
<td>关闭应用</td>
<td>否</td>
</tr>
<tr>
<td>threaddump</td>
<td>获取系统线程转储信息</td>
<td>是</td>
</tr>
</tbody>
</table>
<h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h3>
<p>pom.xml 文件设置</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>访问使用</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>/actuator/端点地址
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>例如想要访问health端点，则访问  <a href="http://ip:port/actuator/health%EF%BC%9B" target="_blank" rel="noopener noreferrer">http://ip:port/actuator/health；<ExternalLinkIcon/></a></p>
<h3 id="端点开启-关闭" tabindex="-1"><a class="header-anchor" href="#端点开启-关闭" aria-hidden="true">#</a> 端点开启/关闭</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>management:
  endpoint:
   # 开启shutdown端点
    shutdown:
      enabled: true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>启用/禁用所有端点</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>management:
  endpoints:
    enabled-by-default: true
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="端点暴露" tabindex="-1"><a class="header-anchor" href="#端点暴露" aria-hidden="true">#</a> 端点暴露</h3>
<p>默认情况下，只有<code>health</code>和<code>info</code>暴露了http端口，这些端点支持通过<code>http</code>和<code>JMX</code>访问，如果需要访问具体的端点则需要配置暴露。</p>
<p>暴露<code>http</code>端点</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>management:
  endpoints:
    web:
      exposure:
        include: health,info
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>暴露<code>JMX</code>端点</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>management:
  endpoints:
    jmx:
      exposure:
        include: health,info
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="二-常用端点解析" tabindex="-1"><a class="header-anchor" href="#二-常用端点解析" aria-hidden="true">#</a> 二 常用端点解析</h2>
<h3 id="health" tabindex="-1"><a class="header-anchor" href="#health" aria-hidden="true">#</a> health</h3>
<p><code>health</code>包含的健康检查项有<code>DataSourceHealthIndicator</code>，<code>DiskSpaceHealthIndicator</code>，<code>MongoHealthIndicator</code>，<code>ReidsHealthIndicator</code>，<code>CassandraHealthIndicator</code>。</p>
<p>关闭特定的检查项配置如下，关闭redis检查项：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>management:
  health:
    redis:
      enabled: false
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>默认情况下health只是简单的展示了<code>UP</code>和<code>DOWN</code>两种状态，如果想要看详细信息，则需要配置</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>management:
  endpoint:
    health:
      show-details: always
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="metrics" tabindex="-1"><a class="header-anchor" href="#metrics" aria-hidden="true">#</a> metrics</h3>
<p><code>metrics</code>可以使用带PathVariable参数，参数为具体的度量值，如查看cpu大小，<a href="http://localhost:8080/actuator/metrics/system.cpu.count%EF%BC%9B" target="_blank" rel="noopener noreferrer">http://localhost:8080/actuator/metrics/system.cpu.count；<ExternalLinkIcon/></a></p>
<h3 id="info" tabindex="-1"><a class="header-anchor" href="#info" aria-hidden="true">#</a> info</h3>
<p><code>info</code>使用的时候需要在配置文件中自定义信息，自定义信息以<code>info</code>开头。</p>
<p>例如在配置文件中增加如下内容：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>info:
  person:
    name: Java
    age: 18
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>访问<code>info</code>端点显示的是去掉info的一个JSON串：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>person:
  name: Java
  age: 18
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>Spring-Boot-acturator</code>使用起来很方便，但是缺点也很明显，就是没有图形化界面。使用起来也不是很友好。</p>
</template>
