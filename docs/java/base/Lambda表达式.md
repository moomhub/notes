# Lambda表达式简介

## 1.Java8 引入函数式编程风格

函数式编程：定义函数作为一等公民，可以赋值给变量作为参数或者返回值进行传递，而Lambda表达式就是Java引入的函数式编程的一次革命性的尝试，突破了只有类作为头等公民的设计，将函数作为参数进行传递，在编程方式上提供了很大的便捷

原因：在Java之后，JVM平台出现很多其他的编程语言，如Scala或者Kotlin，这种多范式的编程语言，相对来说，Java完全面向对象的编程就有些死板了，为了更适应开发者的需要，Java8开启了探索之路，而Lambda就是一次伟大的革命性的尝试

2.可以理解为一种匿名函数的代替
3.通过行为参数化传递代码



替代匿名内部类

```java
	 @Test
    public void oldRunable() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("The old runable now is using!");
            }
        }).start();
    }
	/*Lambda 表达式*/
	@Test
    public void runable() {
        new Thread(() -> System.out.println("It's a lambda function!")).start();
    }
```

## 2、Lambda表达式的形式



1.(parameters) -> expression

2.(parameters) -> { statement;}



```
形式一：没有参数
	() -> System.out.println("Hello world!");
形式二：只有一个参数
	name -> System.out.println( "Hello World from" + name + " !");
形式三：没有参数，逻辑复杂
	() -> {
			System.out.println(" Hello");
			System.out.println("World");
		}
形式四：包含两个参数的方法
	BinaryOperator<Long> functionAdd = (x, y) -> x + y;
	Long result = functionAdd.apply(1L, 2L);
形式五：对参数显示声明
	BinaryOperator<Long> functionAdd = (Long x, Long y) -> x + y;
	Long result = functionAdd.apply(1L, 2L);
```



## 3、函数式接口

1.接口中只有一个抽象方法

2.Java8 的函数式接口注解：[@FunctionInterface ]()

3.函数式接口的抽象方法签名：函数描述符



```java
	@FunctionalInterface
    public interface  FuncTest {
        void handleMessage();
    }

    public interface  FuncInterface {
        void handleMessage();
        void getMessageType();
    }

    @FunctionalInterface
    public interface  Func extends FuncInterface {
        void  getName();

        @Override
        default void handleMessage() {

        }

        @Override
        default void getMessageType() {

        }
    }

	public static void main(String[] args) {
        Predicate<String> predicate = (str) -> {return str.isEmpty();};
        System.out.println(predicate.test("123"));
        FuncTest f = ()->{
            System.out.println("处理消息");
        };
        f.handleMessage();
    }
```



## 4、lambda表达式对集合进行迭代



```java
	@Test
    public void iterTest() {
        List<String> languages = Arrays.asList("java","scala","python");
        //before java8
        for(String each:languages) {
            System.out.println(each);
        }
        //after java8
        languages.forEach(x -> System.out.println(x));
        languages.forEach(System.out::println);
    }	
```





## 5、高级函数式接口

**java.util.function**下可以找到具体的相关的函数式接口

Predicate ：boolean test(T t)   用于判别一个对象，比如求一个人是否为男性                    
Consumer ：void accept(T t)   用于接收一个对象进行处理但没有返回，比如接受一个人并打印他的名字 
Function<T,R>  R apply(T t)     转换一个对象为不同类型的对象                                 
Supplier   T get();     提供一个对象                                                 
UnaryOperator      T    get(T t)        接收对象并返回同类型的对象                                   
BinaryOpeartor    T get (T,T)       接收两个同类型的对象，并返回一个原类型的对象
BiFunction ：R apply(T t, U u);接受两个参数，返回一个值，代表一个二元函数；
DoubleFunction ：R apply(double value);只处理double类型的一元函数；
IntFunction ：R apply(int value);只处理int参数的一元函数；
LongFunction ：R apply(long value);只处理long参数的一元函数；
ToDoubleFunction：double applyAsDouble(T value);返回double的一元函数；
ToDoubleBiFunction：double applyAsDouble(T t, U u);返回double的二元函数；
ToIntFunction：int applyAsInt(T value);返回int的一元函数；
ToIntBiFunction：int applyAsInt(T t, U u);返回int的二元函数；
ToLongFunction：long applyAsLong(T value);返回long的一元函数；
ToLongBiFunction：long applyAsLong(T t, U u);返回long的二元函数；
DoubleToIntFunction：int applyAsInt(double value);接受double返回int的一元函数；
DoubleToLongFunction：long applyAsLong(double value);接受double返回long的一元函数；
IntToDoubleFunction：double applyAsDouble(int value);接受int返回double的一元函数；
IntToLongFunction：long applyAsLong(int value);接受int返回long的一元函数；
LongToDoubleFunction：double applyAsDouble(long value);接受long返回double的一元函数；
LongToIntFunction：int applyAsInt(long value);接受long返回int的一元函数；

## 6、方法引用

调用特定方法的Lambda表达式的一种快捷写法，可以让你重复使用现有的方法定义，并像Lambda表达式一样传递他们

```java
  Sku			::			getSkuPrice
  目标引用		双冒号分隔符		  方法名

指向静态方法的方法引用：	
	//(args) -> ClassName.staticMethod(args);  
	//ClassName::staticMethod
	public void test1(){
		Consumer<String> consumer1 = (String number) -> Integer.parseInt(number);

		Consumer<String> consumer2 = Integer::parseInt;
	}

指向任意实例方法的方法引用：
	//(args) -> ClassName.instanceMethod();
	//ClassName::instanceMethod
	public void test2(){
		Consumer<String> consumer1 = (String str) -> str.length();

		Consumer<String> consumer2 = String::length;
	}

指向现有对象的实例方法的方法引用：
	//(args) -> object.instanceMethod(args)
	//object::instanceMethod
	public void test3(){
		StringBuilder sb = new StringBuilder();
		Consumer<String> consumer1 = (String str) -> sb.append(str);

		Consumer<String> consumer2 = sb::append;
	}
```

