<template><h1 id="数据库优化" tabindex="-1"><a class="header-anchor" href="#数据库优化" aria-hidden="true">#</a> 数据库优化</h1>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<p>[TOC]</p>
<h2 id="优化mysql最大连接数" tabindex="-1"><a class="header-anchor" href="#优化mysql最大连接数" aria-hidden="true">#</a> 优化Mysql最大连接数</h2>
<p><strong>max_connections</strong>是MySQL最大并发连接数，默认值151</p>
<p>MySQL允许的最大连接数上限是16384</p>
<p>实际连接数是最大连接数的85%较为合适（13926）</p>
<h2 id="优化mysql请求堆栈的大小" tabindex="-1"><a class="header-anchor" href="#优化mysql请求堆栈的大小" aria-hidden="true">#</a> 优化Mysql请求堆栈的大小</h2>
<p>back_log是存放执行请求的堆栈大小，默认值是50</p>
<p>一般堆栈大小设置成最大连接数的1/3</p>
<h2 id="优化mysql并发线程数" tabindex="-1"><a class="header-anchor" href="#优化mysql并发线程数" aria-hidden="true">#</a> 优化Mysql并发线程数</h2>
<p>innodb_thread_concurrency代表并发线程数，默认是0</p>
<p>并发线程数应该设置为CPU核心数的两倍</p>
<h2 id="优化mysql连接超时时间" tabindex="-1"><a class="header-anchor" href="#优化mysql连接超时时间" aria-hidden="true">#</a> 优化Mysql连接超时时间</h2>
<p>wait-timeout是超时时间，单位是秒,连接默认超时为8小时，连接长期不用又不销毁，浪费资源</p>
<h2 id="优化mysql数据缓存" tabindex="-1"><a class="header-anchor" href="#优化mysql数据缓存" aria-hidden="true">#</a> 优化Mysql数据缓存</h2>
<p>innodb_buffer_pool_size是InnoDB的缓存容量，默认是128M</p>
<p>InnoDB缓存的大小可以设置为主机内存的70%~80%</p>
<h2 id="优化每页数据量" tabindex="-1"><a class="header-anchor" href="#优化每页数据量" aria-hidden="true">#</a> 优化每页数据量</h2>
<p>尽量做到冷热数据分离，减小表的宽度优先选择符合存储需要</p>
<h2 id="避免行溢出" tabindex="-1"><a class="header-anchor" href="#避免行溢出" aria-hidden="true">#</a> 避免行溢出</h2>
<p>把BLOB或是TEXT列分离到单独的扩展表中，禁止在数据库中存储图片，文件等大的二进制数据的最小的数</p>
<h2 id="控制b-树高度" tabindex="-1"><a class="header-anchor" href="#控制b-树高度" aria-hidden="true">#</a> 控制B+树高度</h2>
<p>尽量控制单表数据量的大小，建议控制在<strong>500万</strong>以内据类型</p>
</template>
