# Spring Boot 使用 Junit5测试

## Junit5注解

| 注解                     | 描述                                                         |
| :----------------------- | :----------------------------------------------------------- |
| @Test                  | 表示方法是测试方法。与 JUnit 4 的注释不同，此注释不声明任何属性，因为 JUnit Jupiter 中的测试扩展基于其自己的专用注释进行操作。除非*重写这些*方法，否则将继承这些*方法。*@Test |
| @ParameterizedTest     | 表示方法是[参数化测试](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-parameterized-tests)。除非*重写这些*方法，否则将继承这些*方法。* |
| @RepeatedTest          | 表示方法是重复测试的[测试](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-repeated-tests)模板。除非*重写这些*方法，否则将继承这些*方法。* |
| @TestFactory           | 表示方法是[用于动态](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-dynamic-tests)测试的测试工厂。除非*重写这些*方法，否则将继承这些*方法。* |
| @TestTemplate          | 表示方法是测试[用例的模板](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-test-templates)，设计为根据已注册的[提供程序](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#extensions-test-templates)返回的调用上下文数多次调用。除非*重写这些*方法，否则将继承这些*方法。* |
| @TestMethodOrder       | 用于为带注释的测试类配置测试[方法执行顺序](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-test-execution-order);类似于 JUnit 4 的 .此类批注是*继承的*。@FixMethodOrder |
| @TestInstance          | 用于为带批注的测试类配置测试[实例生命周期](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-test-instance-lifecycle)。此类批注是*继承的*。 |
| @DisplayName           | 声明测试类或测试方法的自定义[显示名称](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-display-names)。此类批注不会*被继承*。 |
| @DisplayNameGeneration | 声明测试类的自定义[显示名称生成器](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-display-name-generator)。此类批注是*继承的*。 |
| @BeforeEach            | 表示带注释的方法应在当前类中的每个 、 、 或方法*之前*执行;类似于 JUnit 4 的 .除非*重写这些*方法，否则将继承这些*方法。*@Test@RepeatedTest@ParameterizedTest@TestFactory@Before |
| @AfterEach             | 表示带注释的方法应在当前类中的每个 、 、 或方法*之后*执行;类似于 JUnit 4 的 .除非*重写这些*方法，否则将继承这些*方法。*@Test@RepeatedTest@ParameterizedTest@TestFactory@After |
| @BeforeAll             | 表示带注释的方法应在当前类中的所有 、 、 和方法*之前*执行;类似于 JUnit 4 的 .此类方法是*继承的*（除非它们被*隐藏*或*重写*），并且必须继承（除非使用“每类”[测试实例生命周期](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-test-instance-lifecycle)）。@Test@RepeatedTest@ParameterizedTest@TestFactory@BeforeClassstatic |
| @AfterAll              | 表示带注释的方法应在当前类中的所有 、 、 和方法*之后*执行;类似于 JUnit 4 的 .此类方法是*继承的*（除非它们被*隐藏*或*重写*），并且必须继承（除非使用“每类”[测试实例生命周期](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-test-instance-lifecycle)）。@Test@RepeatedTest@ParameterizedTest@TestFactory@AfterClassstatic |
| @Nested                | 表示带批注的类是非静态[嵌套测试类](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-nested)。 和方法不能直接在测试类中使用，除非使用“每类”[测试实例生命周期](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-test-instance-lifecycle)。此类批注不会*被继承*。@BeforeAll@AfterAll@Nested |
| @Tag                   | 用于在类或方法级别声明[用于筛选测试的标记](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-tagging-and-filtering);类似于 TestNG 中的测试组或 JUnit 4 中的类别。此类批注在类级别*继承*，但不在方法级别继承。 |
| @Disabled              | 用于[禁用](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-disabling)测试类或测试方法;类似于 JUnit 4 的 .此类批注不会*被继承*。@Ignore |
| @Timeout               | 用于在测试、测试工厂、测试模板或生命周期方法的执行超过给定持续时间时使其失败。此类批注是*继承的*。 |
| @ExtendWith            | 用于以[声明方式注册扩展](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#extensions-registration-declarative)。此类批注是*继承的*。 |
| @RegisterExtension     | 用于通过字段[以编程方式注册扩展](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#extensions-registration-programmatic)。除非这些字段*被阴影*显示，否则将继承这些字段。 |
| @TempDir               | 用于在生命周期方法或测试方法中通过现场注入或参数注入提供[临时目录](https://junit.org/junit5/docs/5.8.0-M1/user-guide/#writing-tests-built-in-extensions-TempDirectory);位于包中。org.junit.jupiter.api.io |

### Junit 4过渡junit5

| 被废弃的注解 |    新的继任者     |
| :----------: | :---------------: |
|    Before    |    BeforeEach     |
|    After     |     AfterEach     |
| BeforeClass  |     BeforeAll     |
|  AfterClass  |     AfterAll      |
|   Category   |        Tag        |
|   RunWith    |    ExtendWith     |
|     Rule     |    ExtendWith     |
|  ClassRule   | RegisterExtension |


## 常用的JUnit5注解(SpringBoot环境)

注意，接下来提到的测试方法，是指当前class中所有被@Test、@RepeatedTest、@ParameterizedTest、@TestFactory修饰的方法；

|        注解        | 解释                                                         |
| :----------------: | :----------------------------------------------------------- |
|    @ExtendWith     | 这是用来取代旧版本中的RunWith注解，不过在SpringBoot环境如果没有特别要求无需额外配置，因为SpringBootTest中已经有了 |
|       @Test        | 被该注解修饰的就是测试方法                                   |
|     @BeforeAll     | 被该注解修饰的必须是静态方法，会在所有测试方法之前执行，会被子类继承，取代低版本的BeforeClass； |
|     @AfterAll      | 被该注解修饰的必须是静态方法，会在所有测试方法执行之后才被执行，会被子类继承，取代低版本的AfterClass； |
|    @BeforeEach     | 被该注解修饰的方法会在每个测试方法执行前被执行一次，会被子类继承，取代低版本的Before |
|     @AfterEach     | 被该注解修饰的方法会在每个测试方法执行后被执行一次，会被子类继承，取代低版本的Before； |
|    @DisplayName    | 测试方法的展现名称，在测试框架中展示，支持emoji；            |
|      @Timeout      | 超时时长，被修饰的方法如果超时则会导致测试不通过             |
|     @Disabled      | 不执行的测试方法                                             |
|   @RepeatedTest    | 重复测试，重复测试10次 @RepeatedTest(10)                     |
| @ParameterizedTest | 参数测试，需和@ValueSource进行绑定 @ValueSource支持属性 short byte int long float double char boolean java.lang.String java.lang.Class |



## Spring boot Test



> 具体详细文档参考：[官网Test 使用更稳定](https://docs.spring.io/spring-boot/docs/2.2.x/reference/html/spring-boot-features.html#boot-features-testing)



导入Spring Boot 的测试包

> 2.2.x已经支持junit5

```groovy
testImplementation "org.springframework.boot:spring-boot-starter-test"
// 支持junint5的套件测试
testImplementation "org.junit.platform:junit-platform-suite:1.8.2"
```



### @SpringBootTest 属性说明

对service等Component做测试。

### Service 层测试

webEnvironment = SpringBootTest.WebEnvironment.NONE 不启动容器，但是加载需要的测试类 TestService.class

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE, classes = TestService.class)
public class SpringComponentDemoTest {
    @MockBean
    private FileTagQueryServiceImpl fileTagQueryService;
    @Autowired
    TestService testService;

    @Test
    void exampleTest() {
        List<TagInfoAndCardinalityDto> list = new ArrayList<>();
        TagInfoAndCardinalityDto dto = new TagInfoAndCardinalityDto();
        dto.setName("sdfa");
        list.add(dto);
        given(fileTagQueryService.allTagInfoAndCardinality()).willReturn(list);
        List<TagInfoAndCardinalityDto> hello = testService.hello();
        assertThat(hello.get(0).getName()).isEqualTo("sdfa");
    }
}
```

### Dao层测试

首先要写一个测试配置类，专门用来做测试的

```java
@Data
@Slf4j
@Configuration
@MapperScan(basePackages = {"xxx"}, sqlSessionFactoryRef = "mysqlSessionFactory")
public class MysqlConfigTest {

    private String driverClassName="com.mysql.cj.jdbc.Driver";
    private String url="xxxx?serverTimezone=Asia/Chongqing&useUnicode=true&characterEncoding=utf8&characterSetResults=utf8&useSSL=false&verifyServerCertificate=false&autoReconnct=true&autoReconnectForPools=true&allowMultiQueries=true";
    private String username="xxx";
    private String password="xxx";
    
    @Bean
    public DataSource mysqlDataSource() {
        DruidDataSource datasource = new DruidDataSource();
        datasource.setUrl(url);
        datasource.setDriverClassName(driverClassName);
        datasource.setUsername(username);
        datasource.setPassword(password);
        log.debug(datasource.toString());
        log.info("mysql数据源加载成功");
        return datasource;
    }
    
    @Bean(name = "mysqlSessionFactory")
    public SqlSessionFactory mysqlSessionFactory() throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(mysqlDataSource());
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath*:mapper/mysql/*.xml"));
        return bean.getObject();
    }
    
    @Bean(name = "mysqlTransactionManager")
    public DataSourceTransactionManager mysqlTransactionManager() {
        return new DataSourceTransactionManager(mysqlDataSource());
    }
    
    @Bean(name = "mysqlSessionTemplate")
    public SqlSessionTemplate mysqlSessionTemplate() throws Exception {
        return new SqlSessionTemplate(mysqlSessionFactory());
    }

}
```

接着测试类需要加载这个配置测试类，然后编写测试案例

```java
@ContextConfiguration(classes = MysqlConfigTest.class)
@ExtendWith(SpringExtension.class)
public abstract class MysqlBaseTest {

}

public class TagInfoMapperTest extends MysqlBaseTest {
    @Autowired
    TagInfoMapper tagInfoMapper;

    @Test
    public void test() {
        assertThat(tagInfoMapper).isNotNull();
    }
}
```



#### webEnvironment：环境设置


| 参数           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| MOCK（默认值） | 加载 Web 并提供模拟 Web 环境。使用此批注时，不会启动嵌入式服务器。如果类路径上的 Web 环境不可用，则此模式将透明地回退到创建常规非 Web 。它可以与[@AutoConfigureMockMvc或@AutoConfigureWebTestClient](https://docs.spring.io/spring-boot/docs/2.2.x/reference/html/spring-boot-features.html#boot-features-testing-spring-boot-applications-testing-with-mock-environment)结合使用，以对Web应用程序进行基于模拟的测试 |
| RANDOM_PORT    | 加载并提供真实的 Web 环境。嵌入式服务器启动并在随机端口上侦听 |
| DEFINED_PORT   | 加载并提供真实的 Web 环境。嵌入式服务器启动并侦听程序本身的端口 |
| NONE           | 通过使用加载 ，但不提供*任何* Web 环境（模拟或其他）。ApplicationContextSpringApplication |

#### args 注入运行参数

args 注入参数

```java
@SpringBootTest(args = "--app.test=one")
public class SpringTest {
    @Test
    void applicationArgumentsPopulated(@Autowired ApplicationArguments args) {
        assertThat(args.getOptionNames()).containsOnly("app.test");
        assertThat(args.getOptionValues("app.test")).containsOnly("one");
    }
}
```



## Web服务测试

### 使用@WebMvcTest开启测试

@WebMvcTest 注解主要用于controller层测试，只覆盖应用程序的controller层，HTTP请求和响应是Mock出来的，因此不会创建真正的连接。因此需要创建 MockMvc bean进行模拟接口调用

支持MockMvc和WebTestClient使用

> 推荐使用webTestClient


如果只想关注 web 层而不启动完整的 web 层，请考虑[改用 @WebMvcTest](https://docs.spring.io/spring-boot/docs/2.2.x/reference/html/spring-boot-features.html#boot-features-testing-spring-boot-applications-testing-autoconfigured-mvc-tests)

```java
  	@Test
    void exampleTest(@Autowired WebTestClient webClient) {
        webClient.get().uri("/").exchange().expectStatus().isOk()
            .expectBody(String.class).isEqualTo("Hello World");
    }
```




### 自动配置的弹簧 MVC 测试

```
@WebMvcTest
包含了如下的配置
@WebMvcTest
@Controller
@ControllerAdvice
@JsonComponent
@Component
@ConfigurationProperties
@WebMvcTest
t@EnableConfigurationProperties
@ConfigurationProperties
```

### 测试单一接口

```java
@WebMvcTest(UserVehicleController.class)
class MyControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserVehicleService userVehicleService;

    @Test
    void testExample() throws Exception {
        given(this.userVehicleService.getVehicleDetails("sboot"))
                .willReturn(new VehicleDetails("Honda", "Civic"));
        this.mvc.perform(get("/sboot/vehicle").accept(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk()).andExpect(content().string("Honda Civic"));
    }

}
```



## webflux服务测试

使用额相关配置文件来开启webflux测试

```java
@SpringBootTest(properties = "spring.main.web-application-type=reactive")
class MyWebFluxTests { ... }
```

### 使用@WebFluxTest

参考@WebMvcTest



## JDBC 测试

### 自动配置的 JDBC 测试

> @Rollback 表示事务执行完回滚，支持传入一个参数value，默认true即回滚，false不回滚。

JDBC 测试是事务性的，并在每个测试结束时回滚

> 如果您希望测试针对真实数据库运行，则可以采用与 实际数据库相同的方式使用批注。

```java
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@JdbcTest
// 事务回滚 不会将数据插入到数据库中
@Transactional(propagation = Propagation.NOT_SUPPORTED)
class ExampleNonTransactionalTests {

}
```

### 自动配置的数据 JDBC 测试

`@DataJdbcTest`与使用Spring Data JDBC存储库的测试类似。默认情况下，它配置内存中嵌入式数据库、和 Spring Data JDBC 存储库。使用批注时，不会扫描常规和 Bean。 可用于包括豆类。
