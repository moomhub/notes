<template><p>这一条更新来自： JEP 356: Enhanced Pseudo-Random Number Generators ，相比之下，这一条实用多了。</p>
<p>我们都用过随机数，不过一般情况下我们很少去认真的对待随机数的具体结果，就好像它是真的随机一样。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var random = ``new` `Random(System.currentTimeMillis());``for` `(``int` `i = ``0``; i &lt; ``10``; i++) {``  ``System.out.println(random.nextInt());``}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><strong>除了 <code>Random </code>类，JDK 当中还提供了另外几个随机数的成员：</strong></p>
<ul>
<li><code>ThreadLocalRandom</code>：顾名思义，提供线程间独立的随机序列。它只有一个实例，多个线程用到这个实例，也会在线程内部各自更新状态。它同时也是 <code>Random </code>的子类，不过它几乎把所有 <code>Random </code>的方法又实现了一遍。</li>
<li><code>SplittableRandom</code>：非线程安全，但可以 <code>fork </code>的随机序列实现，适用于拆分子任务的场景。</li>
</ul>
<p><code>ThreadLocalRandom </code>继承自 <code>Random</code>，而 <code>SplittableRandom </code>与它俩则没什么实际的关系，因此如果我们在代码当中想要动态切换 <code>Random </code>和 <code>SplittableRandom </code>就只能定义两个成员，并且在用到的地方做判断：</p>
<p><strong>Java 16</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>SplittableRandom splittableRandom = ...;``Random random = ...;` `boolean` `useSplittableRandom = ``false``;` `...``  ` `if` `(useSplittableRandom) {``  ``nextInt = splittableRandom.nextInt();``} ``else` `{``  ``nextInt = random.nextInt();``}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>而且如果想要自己扩展随机数的算法，也只能自己去实现，原有的定义方式缺乏一个统一的接口。</p>
<p><strong>Java 17 为了解决这个问题，定义了几个接口：</strong></p>
<p><img src="https://img.jbzj.com/file_images/article/202109/2021928103549801.png?2021828103613" alt="img"></p>
<p>这样我们就可以面向接口编程啦~</p>
<p>另外，尽管各个实现的细节不太一样，但思路基本上一致，因此老版本当中的几个随机数的类当中存在大量重复或者相似的代码。连 JDK 都存在 CV 代码的情况，那我们为了快速实现需求 CV 代码也不丢人，对不。</p>
<p><img src="https://img.jbzj.com/file_images/article/202109/2021928103648421.jpg?202182810378" alt="img"></p>
<p>Java 17 把这些高度相似的逻辑抽了出来，搞了一个新的类：<code>RandomSupport</code>，又一个 3000 行的 Java 文件。</p>
</template>
