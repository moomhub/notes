# Java8新特性-Optional

## Optional 类包含的方法

### of

为非 null 的值创建一个 Optional。

of 方法通过工厂方法创建 Optional 类。需要注意的是，创建对象时传入的参数不能为 null。如果传入参数为 null，则抛出 NullPointerException 。

```java
//调用工厂方法创建Optional实例
Optional<String> name = Optional.of("Sanaulla");
//传入参数为null，抛出NullPointerException.
Optional<String> someNull = Optional.of(null);
```

### ofNullable

为指定的值创建一个 Optional，如果指定的值为 null，则返回一个空的 Optional。

ofNullable 与 of 方法相似，唯一的区别是可以接受参数为 null 的情况。示例如下:

```java
//下面创建了一个不包含任何值的Optional实例
//例如，值为'null'
Optional empty = Optional.ofNullable(null);
```

### isPresent

非常容易理解:如果值存在返回 true，否则返回 false。

类似下面的代码:

```java
//isPresent方法用来检查Optional实例中是否包含值
if (name.isPresent()) {
  //在Optional实例内调用get()返回已存在的值
  System.out.println(name.get());//输出Sanaulla
}
```

### get

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

### ifPresent

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

### orElse

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

### orElseGet

orElseGet 与 orElse 方法类似，区别在于得到的默认值。orElse 方法将传入的字符串作为默认值，orElseGet 方法可以接受 Supplier 接口的实现用来生成默认值。示例如下:

```java
//orElseGet与orElse方法类似，区别在于orElse传入的是默认值，
//orElseGet可以接受一个lambda表达式生成默认值。
//输出: Default Value
System.out.println(empty.orElseGet(() -> "Default Value"));
//输出: Sanaulla
System.out.println(name.orElseGet(() -> "Default Value"));
```

### orElseT3hrow

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

### map

map 方法文档说明如下:

如果有值，则对其执行调用 mapping 函数得到返回值。如果返回值不为 null，则创建包含 mapping 返回值的 Optional 作为 map 方法返回值，否则返回空 Optional。

map 方法用来对 Optional 实例的值执行一系列操作。通过一组实现了 Function 接口的 lambda 表达式传入操作。如果你不熟悉 Function 接口，可以参考我的这篇博客。map 方法示例如下:

```java
//map方法执行传入的lambda表达式参数对Optional实例的值进行修改。
//为lambda表达式的返回值创建新的Optional实例作为map方法的返回值。
Optional<String> upperName = name.map((value) -> value.toUpperCase());
System.out.println(upperName.orElse("No value found"));
```

### flatMap

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

### filter

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

### 一些例子

#### 一个综合例子

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

```bash
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

#### 在 Java 8 中提高 Null 的安全性

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