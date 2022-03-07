<template><h1 id="spring-boot-注解" tabindex="-1"><a class="header-anchor" href="#spring-boot-注解" aria-hidden="true">#</a> Spring Boot 注解</h1>
<h1 id="一、注解-annotations-列表" tabindex="-1"><a class="header-anchor" href="#一、注解-annotations-列表" aria-hidden="true">#</a> 一、注解(annotations)列表</h1>
<h2 id="_1、-springbootapplication" tabindex="-1"><a class="header-anchor" href="#_1、-springbootapplication" aria-hidden="true">#</a> 1、@SpringBootApplication</h2>
<p>包含了@ComponentScan、@Configuration和@EnableAutoConfiguration注解。 其中@ComponentScan让Spring Boot扫描到Configuration类并把它加入到程序上下文。</p>
<h2 id="_2、-componentscan" tabindex="-1"><a class="header-anchor" href="#_2、-componentscan" aria-hidden="true">#</a> 2、@ComponentScan</h2>
<p>组件扫描，可自动发现和装配一些Bean。</p>
<h2 id="_3、-configuration" tabindex="-1"><a class="header-anchor" href="#_3、-configuration" aria-hidden="true">#</a> 3、@Configuration</h2>
<p>等同于Spring的XML配置文件；使用Java代码可以检查类型安全。</p>
<h2 id="_4、-enableautoconfiguration" tabindex="-1"><a class="header-anchor" href="#_4、-enableautoconfiguration" aria-hidden="true">#</a> 4、@EnableAutoConfiguration</h2>
<p>自动配置</p>
<h2 id="_5、-restcontroller" tabindex="-1"><a class="header-anchor" href="#_5、-restcontroller" aria-hidden="true">#</a> 5、@RestController</h2>
<p>该注解是@Controller和@ResponseBody的合集,表示这是个控制器Bean,并且是将函数的返回值直接填入HTTP响应体中,是REST风格的控制器。</p>
<h2 id="_6、-autowired" tabindex="-1"><a class="header-anchor" href="#_6、-autowired" aria-hidden="true">#</a> 6、@Autowired</h2>
<p>自动导入。</p>
<h2 id="_7、-pathvariable" tabindex="-1"><a class="header-anchor" href="#_7、-pathvariable" aria-hidden="true">#</a> 7、@PathVariable</h2>
<p>获取参数。</p>
<h2 id="_8、-jsonbackreference" tabindex="-1"><a class="header-anchor" href="#_8、-jsonbackreference" aria-hidden="true">#</a> 8、@JsonBackReference</h2>
<p>解决嵌套外链问题。</p>
<h2 id="_9、-repositoryrestresourcepublic" tabindex="-1"><a class="header-anchor" href="#_9、-repositoryrestresourcepublic" aria-hidden="true">#</a> 9、@RepositoryRestResourcepublic</h2>
<p>配合spring-boot-starter-data-rest使用。</p>
<h1 id="二、注解-annotations-详解" tabindex="-1"><a class="header-anchor" href="#二、注解-annotations-详解" aria-hidden="true">#</a> 二、注解(annotations)详解</h1>
<h2 id="_1、-springbootapplication-1" tabindex="-1"><a class="header-anchor" href="#_1、-springbootapplication-1" aria-hidden="true">#</a> 1、@SpringBootApplication</h2>
<p>@SpringBootApplication：申明让Spring Boot自动给程序进行必要的配置，这个配置等同于：@Configuration ，@EnableAutoConfiguration 和 @ComponentScan 三个配置。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span><span class="token punctuation">;</span>
<span class="token annotation punctuation">@SpringBootApplication</span> 
<span class="token comment">// same as @Configuration @EnableAutoConfiguration @ComponentScan</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Application</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Application</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_2、-responsebody" tabindex="-1"><a class="header-anchor" href="#_2、-responsebody" aria-hidden="true">#</a> 2、@ResponseBody</h2>
<p>@ResponseBody：表示该方法的返回结果直接写入HTTP Response Body中，一般在异步获取数据时使用，用于构建RESTful的api。
在使用@RequestMapping后，返回值通常解析为跳转路径，加上@ResponseBody后返回结果不会被解析为跳转路径，而是直接写入HTTP Response Body中。
比如异步获取json数据，加上@ResponseBody后，会直接返回json数据。
该注解一般会配合@RequestMapping一起使用。
示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>“<span class="token operator">/</span>test”<span class="token punctuation">)</span>
<span class="token annotation punctuation">@ResponseBody</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> ”ok”<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="_3、-controller" tabindex="-1"><a class="header-anchor" href="#_3、-controller" aria-hidden="true">#</a> 3、@Controller</h2>
<p>@Controller：用于定义控制器类，在spring 项目中由控制器负责将用户发来的URL请求转发到对应的服务接口（service层）
一般这个注解在类中，通常方法需要配合注解@RequestMapping。
示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>“<span class="token operator">/</span>demoInfo”<span class="token punctuation">)</span>
publicclass <span class="token class-name">DemoController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">DemoInfoService</span> demoInfoService<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/hello"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token class-name">Map</span> map<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"DemoController.hello()"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">,</span><span class="token string">"from TemplateController.helloHtml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 会使用hello.html或者hello.ftl模板进行渲染显示.</span>
        <span class="token keyword">return</span><span class="token string">"/hello"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="_4、-restcontroller" tabindex="-1"><a class="header-anchor" href="#_4、-restcontroller" aria-hidden="true">#</a> 4、@RestController</h2>
<p>@RestController：用于标注控制层组件(如struts中的action)，@ResponseBody和@Controller的合集。
示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span><span class="token punctuation">;</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>“<span class="token operator">/</span>demoInfo2”<span class="token punctuation">)</span>
publicclass <span class="token class-name">DemoController2</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/test"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token string">"ok"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="_5、-requestmapping" tabindex="-1"><a class="header-anchor" href="#_5、-requestmapping" aria-hidden="true">#</a> 5、@RequestMapping</h2>
<p>@RequestMapping：提供路由信息，负责URL到Controller中的具体函数的映射。</p>
<h2 id="_6、-enableautoconfiguration" tabindex="-1"><a class="header-anchor" href="#_6、-enableautoconfiguration" aria-hidden="true">#</a> 6、@EnableAutoConfiguration</h2>
<p>@EnableAutoConfiguration：Spring Boot自动配置（auto-configuration）：尝试根据你添加的jar依赖自动配置你的Spring应用。
例如，如果你的classpath下存在HSQLDB，并且你没有手动配置任何数据库连接beans，那么我们将自动配置一个内存型（in-memory）数据库”。
你可以将@EnableAutoConfiguration或者@SpringBootApplication注解添加到一个@Configuration类上来选择自动配置。
如果发现应用了你不想要的特定自动配置类，你可以使用@EnableAutoConfiguration注解的排除属性来禁用它们。</p>
<h2 id="_7、-componentscan" tabindex="-1"><a class="header-anchor" href="#_7、-componentscan" aria-hidden="true">#</a> 7、@ComponentScan</h2>
<p>@ComponentScan：表示将该类自动发现扫描组件。
个人理解相当于，如果扫描到有@Component、@Controller、@Service等这些注解的类，并注册为Bean，可以自动收集所有的Spring组件，包括@Configuration类。
我们经常使用@ComponentScan注解搜索beans，并结合@Autowired注解导入。可以自动收集所有的Spring组件，包括@Configuration类。
如果没有配置的话，Spring Boot会扫描启动类所在包下以及子包下的使用了@Service、@Repository等注解的类。</p>
<h2 id="_8、-configuration" tabindex="-1"><a class="header-anchor" href="#_8、-configuration" aria-hidden="true">#</a> 8、@Configuration</h2>
<p>相当于传统的xml配置文件，如果有些第三方库需要用到xml文件，建议仍然通过@Configuration类作为项目的配置主类——可以使用@ImportResource注解加载xml配置文件。</p>
<h2 id="_9、-import" tabindex="-1"><a class="header-anchor" href="#_9、-import" aria-hidden="true">#</a> 9、@Import</h2>
<p>用来导入其他配置类。</p>
<h2 id="_10、-importresource" tabindex="-1"><a class="header-anchor" href="#_10、-importresource" aria-hidden="true">#</a> 10、@ImportResource</h2>
<p>用来加载xml配置文件。</p>
<h2 id="_11、-autowired" tabindex="-1"><a class="header-anchor" href="#_11、-autowired" aria-hidden="true">#</a> 11、@Autowired</h2>
<p>自动导入依赖的bean</p>
<h2 id="_12、-service" tabindex="-1"><a class="header-anchor" href="#_12、-service" aria-hidden="true">#</a> 12、@Service</h2>
<p>一般用于修饰service层的组件</p>
<h2 id="_13、-repository" tabindex="-1"><a class="header-anchor" href="#_13、-repository" aria-hidden="true">#</a> 13、@Repository</h2>
<p>使用@Repository注解可以确保DAO或者repositories提供异常转译，这个注解修饰的DAO或者repositories类会被ComponetScan发现并配置，同时也不需要为它们提供XML配置项。</p>
<h2 id="_14、-bean" tabindex="-1"><a class="header-anchor" href="#_14、-bean" aria-hidden="true">#</a> 14、@Bean</h2>
<p>用@Bean标注方法等价于XML中配置的bean。</p>
<h2 id="_15、-value" tabindex="-1"><a class="header-anchor" href="#_15、-value" aria-hidden="true">#</a> 15、@Value</h2>
<p>注入Spring boot application.properties配置的属性的值。示例代码：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span>value <span class="token operator">=</span> “#<span class="token punctuation">{</span>message<span class="token punctuation">}</span>”<span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_16、-inject" tabindex="-1"><a class="header-anchor" href="#_16、-inject" aria-hidden="true">#</a> 16、@Inject</h2>
<p>等价于默认的@Autowired，只是没有required属性；</p>
<h2 id="_17、-component" tabindex="-1"><a class="header-anchor" href="#_17、-component" aria-hidden="true">#</a> 17、@Component</h2>
<p>泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。</p>
<h2 id="_18、-bean" tabindex="-1"><a class="header-anchor" href="#_18、-bean" aria-hidden="true">#</a> 18、@Bean</h2>
<p>相当于XML中的,放在方法的上面，而不是类，意思是产生一个bean,并交给spring管理。</p>
<h2 id="_19、-autowired" tabindex="-1"><a class="header-anchor" href="#_19、-autowired" aria-hidden="true">#</a> 19、@AutoWired</h2>
<p>自动导入依赖的bean。byType方式。把配置好的Bean拿来用，完成属性、方法的组装，它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作。当加上（required=false）时，就算找不到bean也不报错。</p>
<h2 id="_20、-qualifier" tabindex="-1"><a class="header-anchor" href="#_20、-qualifier" aria-hidden="true">#</a> 20、@Qualifier</h2>
<p>当有多个同一类型的Bean时，可以用@Qualifier(“name”)来指定。与@Autowired配合使用。@Qualifier限定描述符除了能根据名字进行注入，但能进行更细粒度的控制如何选择候选者，具体使用方式如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span>value <span class="token operator">=</span> “demoInfoService”<span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">DemoInfoService</span> demoInfoService<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_21、-resource-name-name-type-type" tabindex="-1"><a class="header-anchor" href="#_21、-resource-name-name-type-type" aria-hidden="true">#</a> 21、@Resource(name=”name”,type=”type”)</h2>
<p>没有括号内内容的话，默认byName。与@Autowired干类似的事。</p>
<h1 id="三、jpa注解" tabindex="-1"><a class="header-anchor" href="#三、jpa注解" aria-hidden="true">#</a> 三、JPA注解</h1>
<h2 id="_1、-entity-table-name" tabindex="-1"><a class="header-anchor" href="#_1、-entity-table-name" aria-hidden="true">#</a> 1、@Entity：@Table(name=”“)</h2>
<p>表明这是一个实体类。一般用于jpa这两个注解一般一块使用，但是如果表名和实体类名相同的话，@Table可以省略。</p>
<h2 id="_2、-mappedsuperclass" tabindex="-1"><a class="header-anchor" href="#_2、-mappedsuperclass" aria-hidden="true">#</a> 2、@MappedSuperClass</h2>
<p>用在确定是父类的entity上。父类的属性子类可以继承。</p>
<h2 id="_3、-norepositorybean" tabindex="-1"><a class="header-anchor" href="#_3、-norepositorybean" aria-hidden="true">#</a> 3、@NoRepositoryBean</h2>
<p>一般用作父类的repository，有这个注解，Spring不会去实例化该repository。</p>
<h2 id="_4、-column" tabindex="-1"><a class="header-anchor" href="#_4、-column" aria-hidden="true">#</a> 4、@Column</h2>
<p>如果字段名与列名相同，则可以省略。</p>
<h2 id="_5、-id" tabindex="-1"><a class="header-anchor" href="#_5、-id" aria-hidden="true">#</a> 5、@Id</h2>
<p>表示该属性为主键。</p>
<h2 id="_6、-generatedvalue-strategy-generationtype-sequence-generator-repair-seq" tabindex="-1"><a class="header-anchor" href="#_6、-generatedvalue-strategy-generationtype-sequence-generator-repair-seq" aria-hidden="true">#</a> 6、@GeneratedValue(strategy=GenerationType.SEQUENCE,generator= “repair_seq”)</h2>
<p>表示主键生成策略是sequence（可以为Auto、IDENTITY、native等，Auto表示可在多个数据库间切换），指定sequence的名字是repair_seq。</p>
<h2 id="_7、-sequencegeneretor-name-repair-seq-sequencename-seq-repair-allocationsize-1" tabindex="-1"><a class="header-anchor" href="#_7、-sequencegeneretor-name-repair-seq-sequencename-seq-repair-allocationsize-1" aria-hidden="true">#</a> 7、@SequenceGeneretor(name = “repair_seq”, sequenceName = “seq_repair”, allocationSize = 1)</h2>
<p>name为sequence的名称，以便使用，sequenceName为数据库的sequence名称，两个名称可以一致。</p>
<h2 id="_8、-transient" tabindex="-1"><a class="header-anchor" href="#_8、-transient" aria-hidden="true">#</a> 8、@Transient</h2>
<p>表示该属性并非一个到数据库表的字段的映射,ORM框架将忽略该属性。
如果一个属性并非数据库表的字段映射,就务必将其标示为@Transient,否则,ORM框架默认其注解为@Basic。</p>
<h2 id="_9、-basic-fetch-fetchtype-lazy" tabindex="-1"><a class="header-anchor" href="#_9、-basic-fetch-fetchtype-lazy" aria-hidden="true">#</a> 9、@Basic(fetch=FetchType.LAZY)</h2>
<p>标记可以指定实体属性的加载方式。</p>
<h2 id="_10、-jsonignore" tabindex="-1"><a class="header-anchor" href="#_10、-jsonignore" aria-hidden="true">#</a> 10、@JsonIgnore</h2>
<p>作用是json序列化时将Java bean中的一些属性忽略掉,序列化和反序列化都受影响。</p>
<h2 id="_11、-joincolumn-name-loginid" tabindex="-1"><a class="header-anchor" href="#_11、-joincolumn-name-loginid" aria-hidden="true">#</a> 11、@JoinColumn（name=”loginId”）</h2>
<p>一对一：本表中指向另一个表的外键。一对多：另一个表指向本表的外键。</p>
<h2 id="_12、-onetoone、-onetomany、-manytoone" tabindex="-1"><a class="header-anchor" href="#_12、-onetoone、-onetomany、-manytoone" aria-hidden="true">#</a> 12、@OneToOne、@OneToMany、@ManyToOne</h2>
<p>对应hibernate配置文件中的一对一，一对多，多对一。</p>
<h1 id="四、springmvc相关注解" tabindex="-1"><a class="header-anchor" href="#四、springmvc相关注解" aria-hidden="true">#</a> 四、SpringMVC相关注解</h1>
<h2 id="_1、-requestmapping" tabindex="-1"><a class="header-anchor" href="#_1、-requestmapping" aria-hidden="true">#</a> 1、@RequestMapping</h2>
<p>@RequestMapping(“/path”)表示该控制器处理所有“/path”的UR L请求。
RequestMapping是一个用来处理请求地址映射的注解，可用于类或方法上。
用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。该注解有六个属性：</p>
<ul>
<li>
<p>params:指定request中必须包含某些参数值是，才让该方法处理。</p>
</li>
<li>
<p>headers:指定request中必须包含某些指定的header值，才能让该方法处理请求。</p>
</li>
<li>
<p>value:指定请求的实际地址，指定的地址可以是URI Template 模式</p>
</li>
<li>
<p>method:指定请求的method类型， GET、POST、PUT、DELETE等</p>
</li>
<li>
<p>consumes:指定处理请求的提交内容类型（Content-Type），如application/json,text/html;</p>
</li>
<li>
<p>produces:指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。</p>
</li>
</ul>
<h2 id="_2、-requestparam" tabindex="-1"><a class="header-anchor" href="#_2、-requestparam" aria-hidden="true">#</a> 2、@RequestParam</h2>
<p>用在方法的参数前面。</p>
<h2 id="_3、-pathvariable" tabindex="-1"><a class="header-anchor" href="#_3、-pathvariable" aria-hidden="true">#</a> 3、@PathVariable</h2>
<p>路径变量。如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>“user<span class="token operator">/</span>get<span class="token operator">/</span><span class="token punctuation">{</span>macAddress<span class="token punctuation">}</span>”<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getByMacAddress</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span> <span class="token class-name">String</span> macAddress<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//do something;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>RequestMapping(“user/get/{macAddress}”)</p>
<p>public String getByMacAddress(@PathVariable String macAddress){</p>
<p>    //do something;</p>
<p>}</p>
<p>参数与大括号里的名字一样要相同。</p>
<h1 id="五、全局异常处理" tabindex="-1"><a class="header-anchor" href="#五、全局异常处理" aria-hidden="true">#</a> 五、全局异常处理</h1>
<h2 id="_1、-controlleradvice" tabindex="-1"><a class="header-anchor" href="#_1、-controlleradvice" aria-hidden="true">#</a> 1、@ControllerAdvice：</h2>
<p>包含@Component。可以被扫描到。统一处理异常。</p>
<h2 id="_2、-exceptionhandler-exception-class" tabindex="-1"><a class="header-anchor" href="#_2、-exceptionhandler-exception-class" aria-hidden="true">#</a> 2、@ExceptionHandler（Exception.class）</h2>
<p>用在方法上面表示遇到这个异常就执行以下方法。</p>
</template>
