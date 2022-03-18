# Java8新特性-时间类

## Java8 时间和日期

java.time 包中的类是不可变且**线程安全**的。新的时间及日期 API 位于 java.time 包中，下面是里面的一些关键的类:

- **Instant**——它代表的是时间戳
- **LocalDate**——不包含具体时间的日期，比如 2014-01-14。它可以用来存储生日，周年纪念日，入职日期等。
- **LocalTime**——它代表的是不含日期的时间
- **LocalDateTime**——它包含了日期及时间，不过还是没有偏移信息或者说时区。
- **ZonedDateTime**——这是一个包含时区的完整的日期时间，偏移量是以 UTC/格林威治时间为基准的。

新的库还增加了 ZoneOffset 及 Zoned，可以为时区提供更好的支持。有了新的 DateTimeFormatter 之后日期的解析及格式化也变得焕然一新了。

### 方法概览

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

### 一些例子

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

### 其它语言时间

日期与时间处理 API，在各种语言中，可能都只是个不起眼的 API，如果你没有较复杂的时间处理需求，可能只是利用日期与时间处理 API 取得系统时间，简单做些显示罢了，然而如果认真看待日期与时间，其复杂程度可能会远超过你的想象，天文、地理、历史、政治、文化等因素，都会影响到你对时间的处理。所以在处理时间上，最好选用 JSR310(如果你用 java8 的话就实现 310 了)，或者 Joda-Time。

不止是 java 面临时间处理的尴尬，其他语言同样也遇到过类似的问题，比如

- Arrow: Python 中更好的日期与时间处理库
- Moment.js: JavaScript 中的日期库
- Noda-Time: .NET 阵营的 Joda-Time 的复制