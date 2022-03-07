# Java8 新特性

Stream

##### stream & parallelStream

每个 Stream 都有两种模式: 顺序执行和并行执行。
11
顺序流:

```java
List <Person> people = list.getStream.collect(Collectors.toList());
```

并行流:

```java
List <Person> people = list.getStream.parallel().collect(Collectors.toList());
```

顾名思义，当使用顺序方式去遍历时，每个 item 读完后再读下一个 item。而使用并行去遍历时，数组会被分成多个段，其中每一个都在不同的线程中处理，然后将结果一起输出。

### Optional 类深度解析

#### Optional 类包含的方法

###### of

为非 null 的值创建一个 Optional。

of 方法通过工厂方法创建 Optional 类。需要注意的是，创建对象时传入的参数不能为 null。如果传入参数为 null，则抛出 NullPointerException 。

```java
//调用工厂方法创建Optional实例
Optional<String> name = Optional.of("Sanaulla");
//传入参数为null，抛出NullPointerException.
Optional<String> someNull = Optional.of(null);
```

##### ofNullable

为指定的值创建一个 Optional，如果指定的值为 null，则返回一个空的 Optional。

ofNullable 与 of 方法相似，唯一的区别是可以接受参数为 null 的情况。示例如下:

```java
//下面创建了一个不包含任何值的Optional实例
//例如，值为'null'
Optional empty = Optional.ofNullable(null);
```

###### isPresent

非常容易理解:如果值存在返回 true，否则返回 false。

类似下面的代码:

```java
//isPresent方法用来检查Optional实例中是否包含值
if (name.isPresent()) {
  //在Optional实例内调用get()返回已存在的值
  System.out.println(name.get());//输出Sanaulla
}
```

##### get

如果 Optional 有值则将其返回，否则抛出 NoSuchElementException。

上面的示例中，get 方法用来得到 Optional 实例中的值。下面我们看一个抛出 NoSuchElementException 的例子:

```java
//执行下面的代码会输出: No value present
try {
  //在空的Optional实例上调用get()，抛出NoSuchElementException
  System.out.println(empty.get());
} catch (NoSuchElementException ex) {
  System.out.println(ex.getMessage());
}
```

##### ifPresent

如果 Optional 实例有值则为其调用 consumer，否则不做处理

要理解 ifPresent 方法，首先需要了解 Consumer 类。简答地说，Consumer 类包含一个抽象方法。该抽象方法对传入的值进行处理，但没有返回值。Java8 支持不用接口直接通过 lambda 表达式传入参数。

如果 Optional 实例有值，调用 ifPresent()可以接受接口段或 lambda 表达式。类似下面的代码:

```java
//ifPresent方法接受lambda表达式作为参数。
//lambda表达式对Optional的值调用consumer进行处理。
name.ifPresent((value) -> {
  System.out.println("The length of the value is: " + value.length());
});
```

##### orElse

如果有值则将其返回，否则返回指定的其它值。

如果 Optional 实例有值则将其返回，否则返回 orElse 方法传入的参数。示例如下:

```java
//如果值不为null，orElse方法返回Optional实例的值。
//如果为null，返回传入的消息。
//输出: There is no value present!
System.out.println(empty.orElse("There is no value present!"));
//输出: Sanaulla
System.out.println(name.orElse("There is some value!"));
```

##### orElseGet

orElseGet 与 orElse 方法类似，区别在于得到的默认值。orElse 方法将传入的字符串作为默认值，orElseGet 方法可以接受 Supplier 接口的实现用来生成默认值。示例如下:

```java
//orElseGet与orElse方法类似，区别在于orElse传入的是默认值，
//orElseGet可以接受一个lambda表达式生成默认值。
//输出: Default Value
System.out.println(empty.orElseGet(() -> "Default Value"));
//输出: Sanaulla
System.out.println(name.orElseGet(() -> "Default Value"));
```

##### orElseThrow

如果有值则将其返回，否则抛出 supplier 接口创建的异常。

在 orElseGet 方法中，我们传入一个 Supplier 接口。然而，在 orElseThrow 中我们可以传入一个 lambda 表达式或方法，如果值不存在来抛出异常。示例如下:

```java
try {
  //orElseThrow与orElse方法类似。与返回默认值不同，
  //orElseThrow会抛出lambda表达式或方法生成的异常

  empty.orElseThrow(ValueAbsentException::new);
} catch (Throwable ex) {
  //输出: No value present in the Optional instance
  System.out.println(ex.getMessage());
}
```

ValueAbsentException 定义如下:

```java
class ValueAbsentException extends Throwable {

  public ValueAbsentException() {
    super();
  }

  public ValueAbsentException(String msg) {
    super(msg);
  }

  @Override
  public String getMessage() {
    return "No value present in the Optional instance";
  }
}
```

##### map

map 方法文档说明如下:

如果有值，则对其执行调用 mapping 函数得到返回值。如果返回值不为 null，则创建包含 mapping 返回值的 Optional 作为 map 方法返回值，否则返回空 Optional。

map 方法用来对 Optional 实例的值执行一系列操作。通过一组实现了 Function 接口的 lambda 表达式传入操作。如果你不熟悉 Function 接口，可以参考我的这篇博客。map 方法示例如下:

```java
//map方法执行传入的lambda表达式参数对Optional实例的值进行修改。
//为lambda表达式的返回值创建新的Optional实例作为map方法的返回值。
Optional<String> upperName = name.map((value) -> value.toUpperCase());
System.out.println(upperName.orElse("No value found"));
```

##### flatMap

如果有值，为其执行 mapping 函数返回 Optional 类型返回值，否则返回空 Optional。flatMap 与 map(Funtion)方法类似，区别在于 flatMap 中的 mapper 返回值必须是 Optional。调用结束时，flatMap 不会对结果用 Optional 封装。

flatMap 方法与 map 方法类似，区别在于 mapping 函数的返回值不同。map 方法的 mapping 函数返回值可以是任何类型 T，而 flatMap 方法的 mapping 函数必须是 Optional。

参照 map 函数，使用 flatMap 重写的示例如下:

```java
//flatMap与map(Function)非常类似，区别在于传入方法的lambda表达式的返回类型。
//map方法中的lambda表达式返回值可以是任意类型，在map函数返回之前会包装为Optional。
//但flatMap方法中的lambda表达式返回值必须是Optionl实例。
upperName = name.flatMap((value) -> Optional.of(value.toUpperCase()));
System.out.println(upperName.orElse("No value found"));//输出SANAULLA
```

##### filter

filter 个方法通过传入限定条件对 Optional 实例的值进行过滤。文档描述如下:

如果有值并且满足断言条件返回包含该值的 Optional，否则返回空 Optional。

读到这里，可能你已经知道如何为 filter 方法传入一段代码。是的，这里可以传入一个 lambda 表达式。对于 filter 函数我们应该传入实现了 Predicate 接口的 lambda 表达式。如果你不熟悉 Predicate 接口，可以参考这篇文章。

现在我来看看 filter 的各种用法，下面的示例介绍了满足限定条件和不满足两种情况:

```java
//filter方法检查给定的Option值是否满足某些条件。
//如果满足则返回同一个Option实例，否则返回空Optional。
Optional<String> longName = name.filter((value) -> value.length() > 6);
System.out.println(longName.orElse("The name is less than 6 characters"));//输出Sanaulla

//另一个例子是Optional值不满足filter指定的条件。
Optional<String> anotherName = Optional.of("Sana");
Optional<String> shortName = anotherName.filter((value) -> value.length() > 6);
//输出: name长度不足6字符
System.out.println(shortName.orElse("The name is less than 6 characters"));
```

##### 一些例子

- 一个综合例子

```java
public class OptionalDemo {

  public static void main(String[] args) {
    //创建Optional实例，也可以通过方法返回值得到。
    Optional<String> name = Optional.of("Sanaulla");

    //创建没有值的Optional实例，例如值为'null'
    Optional empty = Optional.ofNullable(null);

    //isPresent方法用来检查Optional实例是否有值。
    if (name.isPresent()) {
      //调用get()返回Optional值。
      System.out.println(name.get());
    }

    try {
      //在Optional实例上调用get()抛出NoSuchElementException。
      System.out.println(empty.get());
    } catch (NoSuchElementException ex) {
      System.out.println(ex.getMessage());
    }

    //ifPresent方法接受lambda表达式参数。
    //如果Optional值不为空，lambda表达式会处理并在其上执行操作。
    name.ifPresent((value) -> {
      System.out.println("The length of the value is: " + value.length());
    });

    //如果有值orElse方法会返回Optional实例，否则返回传入的错误信息。
    System.out.println(empty.orElse("There is no value present!"));
    System.out.println(name.orElse("There is some value!"));

    //orElseGet与orElse类似，区别在于传入的默认值。
    //orElseGet接受lambda表达式生成默认值。
    System.out.println(empty.orElseGet(() -> "Default Value"));
    System.out.println(name.orElseGet(() -> "Default Value"));

    try {
      //orElseThrow与orElse方法类似，区别在于返回值。
      //orElseThrow抛出由传入的lambda表达式/方法生成异常。
      empty.orElseThrow(ValueAbsentException::new);
    } catch (Throwable ex) {
      System.out.println(ex.getMessage());
    }

    //map方法通过传入的lambda表达式修改Optonal实例默认值。
    //lambda表达式返回值会包装为Optional实例。
    Optional<String> upperName = name.map((value) -> value.toUpperCase());
    System.out.println(upperName.orElse("No value found"));

    //flatMap与map(Funtion)非常相似，区别在于lambda表达式的返回值。
    //map方法的lambda表达式返回值可以是任何类型，但是返回值会包装成Optional实例。
    //但是flatMap方法的lambda返回值总是Optional类型。
    upperName = name.flatMap((value) -> Optional.of(value.toUpperCase()));
    System.out.println(upperName.orElse("No value found"));

    //filter方法检查Optiona值是否满足给定条件。
    //如果满足返回Optional实例值，否则返回空Optional。
    Optional<String> longName = name.filter((value) -> value.length() > 6);
    System.out.println(longName.orElse("The name is less than 6 characters"));

    //另一个示例，Optional值不满足给定条件。
    Optional<String> anotherName = Optional.of("Sana");
    Optional<String> shortName = anotherName.filter((value) -> value.length() > 6);
    System.out.println(shortName.orElse("The name is less than 6 characters"));

  }
}
```

上述代码输出如下:

```java
Sanaulla
No value present
The length of the value is: 8
There is no value present!
Sanaulla
Default Value
Sanaulla
No value present in the Optional instance
SANAULLA
SANAULLA
Sanaulla
The name is less than 6 characters
```

- 在 Java 8 中提高 Null 的安全性

假设我们有一个像这样的类层次结构:

```java
class Outer {
    Nested nested;
    Nested getNested() {
        return nested;
    }
}
class Nested {
    Inner inner;
    Inner getInner() {
        return inner;
    }
}
class Inner {
    String foo;
    String getFoo() {
        return foo;
    }
}
```

解决这种结构的深层嵌套路径是有点麻烦的。我们必须编写一堆 null 检查来确保不会导致一个 NullPointerException:

```java
Outer outer = new Outer();
if (outer != null && outer.nested != null && outer.nested.inner != null) {
    System.out.println(outer.nested.inner.foo);
}
```

我们可以通过利用 Java 8 的 Optional 类型来摆脱所有这些 null 检查。map 方法接收一个 Function 类型的 lambda 表达式，并自动将每个 function 的结果包装成一个 Optional 对象。这使我们能够在一行中进行多个 map 操作。Null 检查是在底层自动处理的。

```java
Optional.of(new Outer())
    .map(Outer::getNested)
    .map(Nested::getInner)
    .map(Inner::getFoo)
    .ifPresent(System.out::println);
```

还有一种实现相同作用的方式就是通过利用一个 supplier 函数来解决嵌套路径的问题:

```java
Outer obj = new Outer();
resolve(() -> obj.getNested().getInner().getFoo());
    .ifPresent(System.out::println);
```

调用 obj.getNested().getInner().getFoo()) 可能会抛出一个 NullPointerException 异常。在这种情况下，该异常将会被捕获，而该方法会返回 Optional.empty()。

```java
public static <T> Optional<T> resolve(Supplier<T> resolver) {
    try {
        T result = resolver.get();
        return Optional.ofNullable(result);
    }
    catch (NullPointerException e) {
        return Optional.empty();
    }
}
```

请记住，这两个解决方案可能没有传统 null 检查那么高的性能。不过在大多数情况下不会有太大问题。

翻译: ImportNew.com - 高俊阳 译文链接: <http://www.importnew.com/6675.html>

### default 方法解析

#### 什么是默认方法，为什么要有默认方法

##### 先上例子

一个接口 A，Clazz 类实现了接口 A。

```java
public interface A {
    default void foo(){
       System.out.println("Calling A.foo()");
    }
}

public class Clazz implements A {
    public static void main(String[] args){
       Clazz clazz = new Clazz();
       clazz.foo();//调用A.foo()
    }
}
```

代码是可以编译的，即使 Clazz 类并没有实现 foo()方法。在接口 A 中提供了 foo()方法的默认实现。

#### 什么是默认方法

简单说，就是接口可以有实现方法，而且不需要实现类去实现其方法。只需在方法名前面加个 default 关键字即可。

#### 为什么出现默认方法

为什么要有这个特性? 首先，之前的接口是个双刃剑，好处是面向抽象而不是面向具体编程，缺陷是，当需要修改接口时候，需要修改全部实现该接口的类，目前的 java 8 之前的集合框架没有 foreach 方法，通常能想到的解决办法是在 JDK 里给相关的接口添加新的方法及实现。然而，对于已经发布的版本，是没法在给接口添加新方法的同时不影响已有的实现。所以引进的默认方法。他们的目的是为了解决接口的修改与现有的实现不兼容的问题。

### LocalDate/LocalDateTime

#### Java8 之前的 Date 有哪些槽点

Tiago Fernandez 做过一次投票，选举最烂的 JAVA API，排第一的 EJB2.X，第二的就是日期 API。

#### 槽点一

最开始的时候，Date 既要承载日期信息，又要做日期之间的转换，还要做不同日期格式的显示，职责较繁杂(不懂单一职责，你妈妈知道吗? 纯属恶搞~哈哈)

后来从 JDK 1.1 开始，这三项职责分开了:

```java
使用Calendar类实现日期和时间字段之间转换；
使用DateFormat类来格式化和分析日期字符串；
而Date只用来承载日期和时间信息。
```

原有 Date 中的相应方法已废弃。不过，无论是 Date，还是 Calendar，都用着太不方便了，这是 API 没有设计好的地方。

#### 槽点二

坑爹的 year 和 month

```java
Date date = new Date(2012,1,1);
System.out.println(date);
输出Thu Feb 01 00:00:00 CST 3912
```

观察输出结果，year 是 2012+1900，而 month，月份参数我不是给了 1 吗? 怎么输出二月(Feb)了?

应该曾有人告诉你，如果你要设置日期，应该使用 java.util.Calendar，像这样…

```java
Calendar calendar = Calendar.getInstance();
calendar.set(2013, 8, 2);
```

这样写又不对了，calendar 的 month 也是从 0 开始的，表达 8 月份应该用 7 这个数字，要么就干脆用枚举

```java
calendar.set(2013, Calendar.AUGUST, 2);
```

注意上面的代码，Calendar 年份的传值不需要减去 1900(当然月份的定义和 Date 还是一样)，这种不一致真是让人抓狂！

有些人可能知道，Calendar 相关的 API 是 IBM 捐出去的，所以才导致不一致。

#### 槽点三

java.util.Date 与 java.util.Calendar 中的所有属性都是可变的

下面的代码，计算两个日期之间的天数….

```java
public static void main(String[] args) {
    Calendar birth = Calendar.getInstance();
    birth.set(1975, Calendar.MAY, 26);
    Calendar now = Calendar.getInstance();
    System.out.println(daysBetween(birth, now));
    System.out.println(daysBetween(birth, now)); // 显示 0?
 }

public static long daysBetween(Calendar begin, Calendar end) {
    long daysBetween = 0;
    while(begin.before(end)) {
        begin.add(Calendar.DAY_OF_MONTH, 1);
        daysBetween++;
    }
    return daysBetween;
}
```

daysBetween 有点问题，如果连续计算两个 Date 实例的话，第二次会取得 0，因为 Calendar 状态是可变的，考虑到重复计算的场合，最好复制一个新的 Calendar

```java
public static long daysBetween(Calendar begin, Calendar end) {
    Calendar calendar = (Calendar) begin.clone(); // 复制
    long daysBetween = 0;
    while(calendar.before(end)) {
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        daysBetween++;
    }
    return daysBetween;
}
```

#### 槽点四

SimpleDateTimeFormat 是非线程安全的。

##### Java8 时间和日期

##### 类概览

Java 8 仍然延用了 ISO 的日历体系，并且与它的前辈们不同，java.time 包中的类是不可变且线程安全的。新的时间及日期 API 位于 java.time 包中，下面是里面的一些关键的类:

- Instant——它代表的是时间戳
- LocalDate——不包含具体时间的日期，比如 2014-01-14。它可以用来存储生日，周年纪念日，入职日期等。
- LocalTime——它代表的是不含日期的时间
- LocalDateTime——它包含了日期及时间，不过还是没有偏移信息或者说时区。
- ZonedDateTime——这是一个包含时区的完整的日期时间，偏移量是以 UTC/格林威治时间为基准的。

新的库还增加了 ZoneOffset 及 Zoned，可以为时区提供更好的支持。有了新的 DateTimeFormatter 之后日期的解析及格式化也变得焕然一新了。

#### 方法概览

该包的 API 提供了大量相关的方法，这些方法一般有一致的方法前缀:

- of: 静态工厂方法。
- parse: 静态工厂方法，关注于解析。
- get: 获取某些东西的值。
- is: 检查某些东西的是否是 true。
- with: 不可变的 setter 等价物。
- plus: 加一些量到某个对象。
- minus: 从某个对象减去一些量。
- to: 转换到另一个类型。
- at: 把这个对象与另一个对象组合起来，例如: date.atTime(time)。

#### 一些例子

```java
public class TimeIntroduction {
    public static void testClock() throws InterruptedException {
        //时钟提供给我们用于访问某个特定 时区的 瞬时时间、日期 和 时间的。
        Clock c1 = Clock.systemUTC(); //系统默认UTC时钟(当前瞬时时间 System.currentTimeMillis())
        System.out.println(c1.millis()); //每次调用将返回当前瞬时时间(UTC)
        Clock c2 = Clock.systemDefaultZone(); //系统默认时区时钟(当前瞬时时间)
        Clock c31 = Clock.system(ZoneId.of("Europe/Paris")); //巴黎时区
        System.out.println(c31.millis()); //每次调用将返回当前瞬时时间(UTC)
        Clock c32 = Clock.system(ZoneId.of("Asia/Shanghai"));//上海时区
        System.out.println(c32.millis());//每次调用将返回当前瞬时时间(UTC)
        Clock c4 = Clock.fixed(Instant.now(), ZoneId.of("Asia/Shanghai"));//固定上海时区时钟
        System.out.println(c4.millis());
        Thread.sleep(1000);
        System.out.println(c4.millis()); //不变 即时钟时钟在那一个点不动
        Clock c5 = Clock.offset(c1, Duration.ofSeconds(2)); //相对于系统默认时钟两秒的时钟
        System.out.println(c1.millis());
        System.out.println(c5.millis());
    }
    public static void testInstant() {
        //瞬时时间 相当于以前的System.currentTimeMillis()
        Instant instant1 = Instant.now();
        System.out.println(instant1.getEpochSecond());//精确到秒 得到相对于1970-01-01 00:00:00 UTC的一个时间
        System.out.println(instant1.toEpochMilli()); //精确到毫秒
        Clock clock1 = Clock.systemUTC(); //获取系统UTC默认时钟
        Instant instant2 = Instant.now(clock1);//得到时钟的瞬时时间
        System.out.println(instant2.toEpochMilli());
        Clock clock2 = Clock.fixed(instant1, ZoneId.systemDefault()); //固定瞬时时间时钟
        Instant instant3 = Instant.now(clock2);//得到时钟的瞬时时间
        System.out.println(instant3.toEpochMilli());//equals instant1
    }
    public static void testLocalDateTime() {
        //使用默认时区时钟瞬时时间创建 Clock.systemDefaultZone() -->即相对于 ZoneId.systemDefault()默认时区
        LocalDateTime now = LocalDateTime.now();
        System.out.println(now);
  //自定义时区
        LocalDateTime now2 = LocalDateTime.now(ZoneId.of("Europe/Paris"));
        System.out.println(now2);//会以相应的时区显示日期
  //自定义时钟
        Clock clock = Clock.system(ZoneId.of("Asia/Dhaka"));
        LocalDateTime now3 = LocalDateTime.now(clock);
        System.out.println(now3);//会以相应的时区显示日期
  //不需要写什么相对时间 如java.util.Date 年是相对于1900 月是从0开始
  //2013-12-31 23:59

        LocalDateTime d1 = LocalDateTime.of(2013, 12, 31, 23, 59);
  //年月日 时分秒 纳秒
        LocalDateTime d2 = LocalDateTime.of(2013, 12, 31, 23, 59, 59, 11);
  //使用瞬时时间 + 时区
        Instant instant = Instant.now();
        LocalDateTime d3 = LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault());
        System.out.println(d3);

  //解析String--->LocalDateTime
        LocalDateTime d4 = LocalDateTime.parse("2013-12-31T23:59");
        System.out.println(d4);
        LocalDateTime d5 = LocalDateTime.parse("2013-12-31T23:59:59.999");//999毫秒 等价于999000000纳秒
        System.out.println(d5);

  //使用DateTimeFormatter API 解析 和 格式化
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime d6 = LocalDateTime.parse("2013/12/31 23:59:59", formatter);
        System.out.println(formatter.format(d6));

  //时间获取
        System.out.println(d6.getYear());
        System.out.println(d6.getMonth());
        System.out.println(d6.getDayOfYear());
        System.out.println(d6.getDayOfMonth());
        System.out.println(d6.getDayOfWeek());
        System.out.println(d6.getHour());
        System.out.println(d6.getMinute());
        System.out.println(d6.getSecond());
        System.out.println(d6.getNano());

  //时间增减
        LocalDateTime d7 = d6.minusDays(1);
        LocalDateTime d8 = d7.plus(1, IsoFields.QUARTER_YEARS);
  //LocalDate 即年月日 无时分秒
  //LocalTime即时分秒 无年月日
  //API和LocalDateTime类似就不演示了

  // 两个日期是否相等
  System.out.println(d1.equals(d2));

  // MonthDay - 用来检查生日
  LocalDate dateOfBirth = LocalDate.of(2010, 01, 14);
  MonthDay birthday = MonthDay.of(dateOfBirth.getMonth(), dateOfBirth.getDayOfMonth());
  MonthDay currentMonthDay = MonthDay.from(today);
  System.out.println(currentMonthDay.equals(birthday));

  // YearMonth - 用来检查信用卡过期
  YearMonth currentYearMonth = YearMonth.now(); System.out.printf("Days in month year %s: %d%n", currentYearMonth, currentYearMonth.lengthOfMonth());
  YearMonth creditCardExpiry = YearMonth.of(2018, Month.FEBRUARY);
  System.out.printf("Your credit card expires on %s %n", creditCardExpiry);

  // 判断闰年 - LocalDate类有一个isLeapYear()的方法
  System.out.println(dateOfBirth.isLeapYear());
    }
    public static void testZonedDateTime() {
        //即带有时区的date-time 存储纳秒、时区和时差(避免与本地date-time歧义)。
  //API和LocalDateTime类似，只是多了时差(如2013-12-20T10:35:50.711+08:00[Asia/Shanghai])
        ZonedDateTime now = ZonedDateTime.now();
        System.out.println(now);
        ZonedDateTime now2 = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
        System.out.println(now2);
  //其他的用法也是类似的 就不介绍了
        ZonedDateTime z1 = ZonedDateTime.parse("2013-12-31T23:59:59Z[Europe/Paris]");
        System.out.println(z1);
    }
    public static void testDuration() {
        //表示两个瞬时时间的时间段
        Duration d1 = Duration.between(Instant.ofEpochMilli(System.currentTimeMillis() - 12323123), Instant.now());
  //得到相应的时差
        System.out.println(d1.toDays());
        System.out.println(d1.toHours());
        System.out.println(d1.toMinutes());
        System.out.println(d1.toMillis());
        System.out.println(d1.toNanos());
  //1天时差 类似的还有如ofHours()
        Duration d2 = Duration.ofDays(1);
        System.out.println(d2.toDays());
    }
    public static void testChronology() {
        //提供对java.util.Calendar的替换，提供对年历系统的支持
        Chronology c = HijrahChronology.INSTANCE;
        ChronoLocalDateTime d = c.localDateTime(LocalDateTime.now());
        System.out.println(d);
    }
    /**
     * 新旧日期转换
     */
    public static void testNewOldDateConversion(){
        Instant instant=new Date().toInstant();
        Date date=Date.from(instant);
        System.out.println(instant);
        System.out.println(date);
    }
    public static void main(String[] args) throws InterruptedException {
        testClock();
        testInstant();
        testLocalDateTime();
        testZonedDateTime();
        testDuration();
        testChronology();
        testNewOldDateConversion();
    }
}
```

#### 其它语言时间

日期与时间处理 API，在各种语言中，可能都只是个不起眼的 API，如果你没有较复杂的时间处理需求，可能只是利用日期与时间处理 API 取得系统时间，简单做些显示罢了，然而如果认真看待日期与时间，其复杂程度可能会远超过你的想象，天文、地理、历史、政治、文化等因素，都会影响到你对时间的处理。所以在处理时间上，最好选用 JSR310(如果你用 java8 的话就实现 310 了)，或者 Joda-Time。

不止是 java 面临时间处理的尴尬，其他语言同样也遇到过类似的问题，比如

- Arrow: Python 中更好的日期与时间处理库
- Moment.js: JavaScript 中的日期库
- Noda-Time: .NET 阵营的 Joda-Time 的复制
