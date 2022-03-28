# Java 并发编程-AQS 并发容器同步组件

- CountDownLatch
- Semaphore

- CyclicBarrier
- ReentrantLock

- Condition
- FutureTask

## CountDownLatch

### 概念

countDownLatch 这个类使一个线程等待其他线程各自执行完毕后再执行。是通过一个计数器来实现的，计数器的初始值是线程的数量。每当一个线程执行完毕后，计数器的值就-1，当计数器的值为 0 时，表示所有线程都执行完毕，然后在闭锁上等待的线程就可以恢复工作了。

组件的使用场景：并行计算

### 实例代码

```java
public static void main(String[] args) throws InterruptedException {
    CountDownLatch countDownLatch = new CountDownLatch(1);
    new Thread(()->{
        System.out.println("----------");
        countDownLatch.countDown();
    }).start();
    countDownLatch.await();
    System.out.println("==========");
}
```

### 关键方法

- **CountDownLatch(count)**：创建时这个方法比较简单，就是维护了一个计数器：
- **await**()：调用 await()方法的线程会被挂起，它会等待直到 count 值为 0 才继续执行
- **countDown**()：调用的是 sync 类中的方法 releaseShared(arg)，注意这里固定传的是 1，因为调用一次 countDown()方法计数减 1。
- **await(long timeout, TimeUnit unit)**：和 await()类似，只不过等待一定的时间后 count 值还没变为 0 的话--就会继续执行()

## Semaphore

### 概念

Semaphore 是一个计数信号量，是并发包中提供的用于控制某资源同时被访问的个数，

```
Semaphore semaphore = new Semaphore(3)
// 表示并发访问中同时访问的格式
```

### 实例代码

```java
public class SemaphoreExample2 {

    private final static int threadCount = 20;
    public static void main(String[] args) throws Exception {

        ExecutorService exec = Executors.newCachedThreadPool();
        final Semaphore semaphore = new Semaphore(3);
        for (int i = 0; i < threadCount; i++) {
            final int threadNum = i;
            exec.execute(() -> {
                try {
                    semaphore.acquire(3); // 获取3个许可
                    //semaphore.acquire(); //获取一个许可
                    test(threadNum);
                    semaphore.release(3); // 释放多个许可
                } catch (Exception e) {
                    log.error("exception", e);
                }
            });
        }
        exec.shutdown();
    }

    private static void test(int threadNum) throws Exception {
        log.info("{}", threadNum);
        Thread.sleep(1000);
    }
}
```

### 关键方法

- **Semaphore(permits)** ：定义一次可以通过的许可数量 创建时初始化许可数量
- **acquire()**：从此信号量获取一个许可，在提供一个许可前一直将线程阻塞，否则线程被中断
- **release()**： 释放许可，将其返回给信号量
- **availablePermits()**：返回此信号量中当前可用的许可数。
- **hasQueuedThreads()**：查询是否有线程正在等待获取。
- **tryAcquire()**：尝试获得令牌，返回获取令牌成功或失败，不阻塞线程。
- **tryAcquire(long timeout, TimeUnit unit)**：尝试获得令牌，在超时时间内循环尝试获取，直到尝试获取成功或超时返回，不阻塞线程。

## CyclicBarrier

### 概念

CyclicBarrier 的字面意思是可循环使用（Cyclic）的屏障（Barrier）。它要做的事情是，让一 组线程到达一个屏障（也可以叫同步点）时被阻塞，直到最后一个线程到达屏障时，屏障才会 开门，所有被屏障拦截的线程才会继续运行。CyclicBarrier 可以用于多线程计算数据，最后合并计算结果的场景

**等待特定数量的线程都到达同步屏障后各线程才继续执行**

### 实例代码

```java
public class CyclicBarrierTest {

    // 等待4个线程到达同步屏障，全部到达后优先执行一个 Runnable
    private static CyclicBarrier cyclicBarrier = new CyclicBarrier(4,
    () -> System.out.println("全部到达同步屏障" + LocalDateTime.now()));
    public static void main(String[] args) throws InterruptedException, BrokenBarrierException {
        Runnable runnable = () -> {
            System.out.println("到达同步屏障" + LocalDateTime.now());
            try {
                cyclicBarrier.await();
            } catch (InterruptedException | BrokenBarrierException e) {
                e.printStackTrace();
            }
            System.out.println("继续执行");
        };
        List<Runnable> list = Arrays.asList(runnable, runnable, runnable);
        list.forEach(runnable1 -> new Thread(runnable1).start());
        Thread.sleep(1000);
        System.out.println("最后一个线程到达同步屏障");
        cyclicBarrier.await();
    }

}
```

## 锁机制

### ReentrantLock

ReentrantLock 与 Lock 锁有区别

#### 代码实例

ReentrantLock 和 ReentrantReadWriteLock

```java
  private final ReentrantReadWriteLock locks = new ReentrantReadWriteLock();
  private final Lock readLock = locks.readLock();
  private final Lock writeLock = locks.writeLock();
  private final ReentrantLock lock = new ReentrantLock();

//...
lock.lock();
try{
    //操作数据
}finally {
    lock.unlock
}

//...
readLock.lock();
try{
    //读取值
}finally {
    readLock.unlock
}
//...

//...
writeLock.lock();
try{
    //写入值
}finally {
    writeLock.unlock
}
//...
```

（1）Synchronized 是在 JVM 层面上实现的，可以通过一些监控工具监控 synchronized 的锁定，当代码执行时出现异常，JVM 会自动释放锁定。当只有少量竞争者的时候，synchronized 是一个很好的通用的锁实现。Synchronized 的锁是针对一个对象的。

（2）ReentrantLock、ReentrantReadWriteLock,、StampedLock 都是代码块层面的锁定，要保证锁定一定会被释放，就必须将 unLock()放到 finally}中。

（3）ReentrantLock 是一个很好的通用的锁实现，使用于比较简单的加锁、解锁的业务逻辑，如果实现复杂的锁机制，当线程增长能够预估时也是可以的。

（4）ReentrantReadWriteLock 对 Lock 又进行了扩展，引入了 read 和 write 阻塞和并发机制，相对于 ReentrantLock，它可以实现更复杂的锁机制，且并发性也更高些。

（5）StampedLock 又在 Lock 的基础上，实现了可以满足乐观锁和悲观锁等一些在读线程越来越多的业务场景，对吞吐量有巨大的改进，但并不是说要替代之前的 Lock，毕竟它还是有些应用场景的。

（6）StampedLock 有一个复杂的 API 相对于前面两种 Lock 锁，对于加锁操作，很容易误用其他方法，如果理解不深入也更容易出现死锁和不必要的麻烦。

（7）推荐如果不是业务非得需要，建议使用 ReentrantLock 和 ReentrantReadWriteLock 即可满足大部分业务场景的需要。

### Condition

#### 概念

有点类似于监视器方法,类似于等待信号来响应

Condition 中的`await()`方法相当于 Object 的`wait()`方法，

Condition 中的`signal()`方法相当于 Object 的`notify()`方法，

Condition 中的`signalAll()`相当于 Object 的`notifyAll()`方法。

不同的是，

Object 中的`wait(),notify(),notifyAll()`方法是和`"同步锁"`(synchronized 关键字)捆绑使用的；

而 Condition 是需要与`"互斥锁"/"共享锁"`捆绑使用的。

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1608629547727-cfd44e4c-031d-402e-9bc2-13917ff0a26e.png)

![img](https://cdn.jsdelivr.net/gh/moomhub/notes_images01/images/1608629547815-76a68e07-1e04-4541-a260-ae459240e0b6.png)

## FutureTask 和 Future

### Future 接口

Future 接口是用来获取异步计算结果的，说白了就是对具体的 Runnable 或者 Callable 对象任务执行的结果进行获取(get()),取消(cancel()),判断是否完成等操作。我们看看 Future 接口的源码：

```java
    public interface Future<V> {
        boolean cancel(boolean mayInterruptIfRunning);
        boolean isCancelled();
        boolean isDone();
        V get() throws InterruptedException, ExecutionException;
        V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, 			TimeoutException;
    }
```

#### 概念

```java
public class FutureExample {

    static class MyCallable implements Callable<String> {
        @Override
        public String call() throws Exception {
            log.info("do something in callable");
            Thread.sleep(5000);
            return "Done";
        }
    }
    public static void main(String[] args) throws Exception {
        ExecutorService executorService = Executors.newCachedThreadPool();
        Future<String> future = executorService.submit(new MyCallable());
        log.info("do something in main");
        Thread.sleep(1000);
        String result = future.get();
        log.info("result：{}", result);
    }
}
```

#### 方法

- **V get()** ：获取异步执行的结果，如果没有结果可用，此方法会阻塞直到异步计算完成。
- **V get(Long timeout , TimeUnit unit)** ：获取异步执行结果，如果没有结果可用，此方法会阻塞，但是会有时间限制，如果阻塞时间超过设定的 timeout 时间，该方法将抛出异常。
- **boolean isDone()** ：如果任务执行结束，无论是正常结束或是中途取消还是发生异常，都返回 true。
- **boolean isCanceller()** ：如果任务完成前被取消，则返回 true。
- **boolean cancel(boolean mayInterruptRunning)** ：如果任务还没开始，执行 cancel(...)方法将返回 false；如果任务已经启动，执行 cancel(true)方法将以中断执行此任务线程的方式来试图停止任务，如果停止成功，返回 true；当任务已经启动，执行 cancel(false)方法将不会对正在执行的任务线程产生影响(让线程正常执行到完成)，此时返回 false；当任务已经完成，执行 cancel(...)方法将返回 false。mayInterruptRunning 参数表示是否中断执行中的线程。

通过方法分析我们也知道实际上 Future 提供了 3 种功能：

（1）能够中断执行中的任务（2）判断任务是否执行完成（3）获取任务执行完成后额结果。

但是我们必须明白 Future 只是一个接口，我们无法直接创建对象，因此就需要其实现类 FutureTask 登场啦

### FutureTask

#### 概念

FutureTask 一个可取消的异步计算，FutureTask 实现了 Future 的基本方法，提空 start cancel 操作，可以查询计算是否已经完成，并且可以获取计算的结果。结果只可以在计算完成之后获取，get 方法会阻塞当计算没有完成的时候，一旦计算已经完成，那么计算就不能再次启动或是取消。

一个 FutureTask 可以用来包装一个 Callable 或是一个 runnable 对象。因为 FurtureTask 实现了 Runnable 方法，所以一个 FutureTask 可以提交(submit)给一个 Excutor 执行(excution).

#### 使用场景

FutureTask 可用于异步获取执行结果或取消执行任务的场景。通过传入 Runnable 或者 Callable 的任务给 FutureTask，直接调用其 run 方法或者放入线程池执行，之后可以在外部通过 FutureTask 的 get 方法异步获取执行结果，因此，FutureTask 非常适合用于耗时的计算，主线程可以在完成自己的任务后，再去获取结果。另外，FutureTask 还可以确保即使调用了多次 run 方法，它都只会执行一次 Runnable 或者 Callable 任务，或者通过 cancel 取消 FutureTask 的执行等。

#### 实例

```java
public class FutureTaskExample {

    public static void main(String[] args) throws Exception {
        FutureTask<String> futureTask = new FutureTask<String>(new Callable<String>() {
            @Override
            public String call() throws Exception {
                log.info("子线程运行中");
                Thread.sleep(5000);
                return "Done";
            }
        });

        new Thread(futureTask).start();
        log.info("主线程执行其他操作");
        Thread.sleep(1000);
        if (futureTask.get()!=null){
            log.info("子线程执行完成，返回结果");
        }
        String result = futureTask.get();
        log.info("result：{}", result);
    }
}
```

### Fork/Join 框架

实例

```java
public class ForkJoinTaskExample extends RecursiveTask<Integer> {

    public static final int threshold = 2;
    private int start;
    private int end;

    public ForkJoinTaskExample(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    protected Integer compute() {
        int sum = 0;

        //如果任务足够小就计算任务
        boolean canCompute = (end - start) <= threshold;
        if (canCompute) {
            for (int i = start; i <= end; i++) {
                sum += i;
            }
        } else {
            // 如果任务大于阈值，就分裂成两个子任务计算
            int middle = (start + end) / 2;
            ForkJoinTaskExample leftTask = new ForkJoinTaskExample(start, middle);
            ForkJoinTaskExample rightTask = new ForkJoinTaskExample(middle + 1, end);

            // 执行子任务
            leftTask.fork();
            rightTask.fork();

            // 等待任务执行结束合并其结果
            int leftResult = leftTask.join();
            int rightResult = rightTask.join();

            // 合并子任务
            sum = leftResult + rightResult;
        }
        return sum;
    }

    public static void main(String[] args) {
        ForkJoinPool forkjoinPool = new ForkJoinPool();
        //生成一个计算任务，计算1+2+3+4
        ForkJoinTaskExample task = new ForkJoinTaskExample(1, 100);
        //执行一个任务
        Future<Integer> result = forkjoinPool.submit(task);
        try {
            log.info("result:{}", result.get());
        } catch (Exception e) {
            log.error("exception", e);
        }
    }
}
```
