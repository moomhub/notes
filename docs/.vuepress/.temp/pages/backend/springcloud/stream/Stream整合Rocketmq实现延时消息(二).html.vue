<template><h1 id="stream-整合-rocketmq-实现延时消息-二" tabindex="-1"><a class="header-anchor" href="#stream-整合-rocketmq-实现延时消息-二" aria-hidden="true">#</a> Stream 整合 Rocketmq 实现延时消息（二）</h1>
<p>RocketMQ 暂时不支持任意的时间精度的延迟，而是固化了 18 个延迟级别。</p>
<blockquote>
<p>s：秒、m：分钟、h：小时、d：天</p>
</blockquote>
<h2 id="rocketmq内置的延时等级" tabindex="-1"><a class="header-anchor" href="#rocketmq内置的延时等级" aria-hidden="true">#</a> RocketMQ内置的延时等级</h2>
<p>内置的broker 18个等级</p>
<table>
<thead>
<tr>
<th>延迟级别</th>
<th>时间</th>
<th>延迟级别</th>
<th>时间</th>
<th>延迟级别</th>
<th>时间</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>1s</td>
<td>7m</td>
<td>3</td>
<td>13</td>
<td>9m</td>
</tr>
<tr>
<td>2</td>
<td>5s</td>
<td>8m</td>
<td>4</td>
<td>14</td>
<td>10m</td>
</tr>
<tr>
<td>3</td>
<td>10s</td>
<td>9m</td>
<td>5</td>
<td>15</td>
<td>20m</td>
</tr>
<tr>
<td>4</td>
<td>30s</td>
<td>10m</td>
<td>6</td>
<td>16</td>
<td>30m</td>
</tr>
<tr>
<td>5</td>
<td>1m</td>
<td>11m</td>
<td>7</td>
<td>17</td>
<td>1h</td>
</tr>
<tr>
<td>6</td>
<td>2m</td>
<td>12m</td>
<td>8</td>
<td>18</td>
<td>2h</td>
</tr>
</tbody>
</table>
<p>如果想修改相关的等级对应，可以修改 <strong>bronk.conf</strong>   内 messageDelayLevel 的内容。</p>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>#...
messageDelayLevel=1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
#...
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> Demo</h2>
<p>通过添加头MessageConst.PROPERTY_DELAY_TIME_LEVEL，设置消息的延迟级别，从而发送定时消息。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token class-name">Object</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">;</span>
  <span class="token class-name">MessageBuilder</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> builder <span class="token operator">=</span> <span class="token class-name">MessageBuilder</span><span class="token punctuation">.</span><span class="token function">withPayload</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
  headers<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">MessageConst</span><span class="token punctuation">.</span>PROPERTY_DELAY_TIME_LEVEL<span class="token punctuation">,</span><span class="token string">"3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  builder<span class="token punctuation">.</span><span class="token function">copyHeaders</span><span class="token punctuation">(</span>headers<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><blockquote>
<p>请注意添加消息头按正常异步模式发送消息，是不会正常发送延迟消息的<br />一定要设置 sync： true 开启同步发送消息才能实现延时消息</p>
</blockquote>
<p>消息生产者请在配置文件添加异步模式</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">stream</span><span class="token punctuation">:</span>
      <span class="token key atrule">rocketmq</span><span class="token punctuation">:</span>
        <span class="token key atrule">binder</span><span class="token punctuation">:</span>
          <span class="token key atrule">name-server</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">9876</span> <span class="token comment">#绑定namesever 地址，可以多个</span>
          <span class="token key atrule">enable-msg-trace</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
          <span class="token key atrule">delay_message_output</span><span class="token punctuation">:</span>
            <span class="token key atrule">producer</span><span class="token punctuation">:</span>
              <span class="token key atrule">sync</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 是否同步发送消息，默认为 false 异步。     </span>
      <span class="token key atrule">bindings</span><span class="token punctuation">:</span>
        <span class="token key atrule">delay_message_output</span><span class="token punctuation">:</span>
          <span class="token key atrule">destination</span><span class="token punctuation">:</span> message<span class="token punctuation">-</span>stream<span class="token punctuation">-</span>topic3 <span class="token comment"># 相当于 rocketmq 的 topic</span>
          <span class="token key atrule">content-type</span><span class="token punctuation">:</span> application/json <span class="token comment"># 设置消息类型，本次为对象json，如果是文本则设置“text/plain”</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></template>
