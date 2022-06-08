import{_ as s,o as n,c as a,a as e}from"./app.4a9c1875.js";const t={},i=e(`<h1 id="dockers-\u547D\u4EE4\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#dockers-\u547D\u4EE4\u8BF4\u660E" aria-hidden="true">#</a> Dockers \u547D\u4EE4\u8BF4\u660E</h1><h2 id="\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> \u5E38\u7528\u547D\u4EE4</h2><p>\u542F\u52A8\u3001\u505C\u6B62\u3001\u91CD\u542F\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> start <span class="token punctuation">[</span>NAMe<span class="token punctuation">]</span>
<span class="token function">docker</span> stop	 <span class="token punctuation">[</span>NAMe<span class="token punctuation">]</span>
<span class="token function">docker</span> restart <span class="token punctuation">[</span>NAMe<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FDB\u5165\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it <span class="token punctuation">[</span>NAME<span class="token punctuation">]</span> /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>root\u8EAB\u4EFD\u8FDB\u5165\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> -ti -u root <span class="token punctuation">[</span>NAME<span class="token punctuation">]</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u8BE2\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5220\u9664\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token function">docker</span> rmi <span class="token punctuation">[</span>IMAGES<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u8BE2\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5220\u9664\u5BB9\u5668</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> -f <span class="token punctuation">[</span>NAME<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u8BE2\u8FD0\u884C\u65E5\u5FD7</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> logs -t -f <span class="token punctuation">[</span>name<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5217\u51FA\u6240\u6709\u7684\u6570\u636E\u5377</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5220\u9664\u6240\u6709\u672A\u88AB\u4F7F\u7528\u7684\u5377</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">rm</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> volume <span class="token function">ls</span> -qf <span class="token assign-left variable">dangling</span><span class="token operator">=</span>true<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8F93\u51FA\u6240\u6709\u5BB9\u5668</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker rmi -f $(docker images -aq)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u62F7\u8D1D\u5BB9\u5668\u5185\u7684\u6587\u4EF6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker exec -it ps cat /etc/my.cnf &gt; /opt/docker/percona-server/conf/my.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-\u547D\u4EE4" aria-hidden="true">#</a> Docker \u547D\u4EE4</h2><h3 id="docker-\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#docker-\u65E5\u5FD7" aria-hidden="true">#</a> Docker \u65E5\u5FD7</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker logs [Option] [NAME]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Options\u8BF4\u660E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Options:
--details \u663E\u793A\u66F4\u591A\u7684\u4FE1\u606F
-f, --follow \u8DDF\u8E2A\u5B9E\u65F6\u65E5\u5FD7
--since string \u663E\u793A\u81EA\u67D0\u4E2Atimestamp\u4E4B\u540E\u7684\u65E5\u5FD7\uFF0C\u6216\u76F8\u5BF9\u65F6\u95F4\uFF0C\u598240m\uFF08\u537340\u5206\u949F\uFF09
--tail string \u4ECE\u65E5\u5FD7\u672B\u5C3E\u663E\u793A\u591A\u5C11\u884C\u65E5\u5FD7\uFF0C \u9ED8\u8BA4\u662Fall
-t, --timestamps \u663E\u793A\u65F6\u95F4\u6233
--until string \u663E\u793A\u81EA\u67D0\u4E2Atimestamp\u4E4B\u524D\u7684\u65E5\u5FD7\uFF0C\u6216\u76F8\u5BF9\u65F6\u95F4\uFF0C\u598240m\uFF08\u537340\u5206\u949F\uFF09
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F8B\u5B50</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u4F8B\uFF1A\u5B9E\u65F6\u67E5\u770Bdocker\u5BB9\u5668\u540D\u4E3ALogs\u7684\u6700\u540E10\u884C\u65E5\u5FD7
<span class="token function">docker</span> logs -f -t --tail <span class="token number">10</span> Logs
\u4F8B\uFF1A\u67E5\u770B\u6307\u5B9A\u65F6\u95F4\u540E\u7684\u65E5\u5FD7\uFF0C\u53EA\u663E\u793A\u6700\u540E100\u884C\uFF1A
<span class="token function">docker</span> logs -f -t --since<span class="token operator">=</span><span class="token string">&quot;2018-02-08&quot;</span> --tail<span class="token operator">=</span><span class="token number">100</span> Logs
\u4F8B\uFF1A\u67E5\u770B\u6700\u8FD130\u5206\u949F\u7684\u65E5\u5FD7:
<span class="token function">docker</span> logs --since 30m Logs
\u4F8B\uFF1A\u67E5\u770B\u67D0\u65F6\u95F4\u4E4B\u540E\u7684\u65E5\u5FD7\uFF1A
<span class="token function">docker</span> logs -t --since<span class="token operator">=</span><span class="token string">&quot;2018-02-08T13:23:37&quot;</span> Logs
\u4F8B\uFF1A\u67E5\u770B\u67D0\u65F6\u95F4\u6BB5\u65E5\u5FD7\uFF1A
<span class="token function">docker</span> logs -t --since<span class="token operator">=</span><span class="token string">&quot;2018-02-08T13:23:37&quot;</span> --until <span class="token string">&quot;2018-02-09T12:23:37&quot;</span> Logs
\u4F8B\uFF1A\u5C06\u9519\u8BEF\u65E5\u5FD7\u5199\u5165\u6587\u4EF6\uFF1A
<span class="token function">docker</span> logs -f -t --since<span class="token operator">=</span><span class="token string">&quot;2018-02-18&quot;</span> Logs <span class="token operator">|</span> <span class="token function">grep</span> error <span class="token operator">&gt;&gt;</span> logs_error.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-\u5377" tabindex="-1"><a class="header-anchor" href="#docker-\u5377" aria-hidden="true">#</a> Docker \u5377</h3><p>\u5217\u51FA\u6240\u6709\u7684\u6570\u636E\u5377</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4F7F\u7528--filter dangling=true \u8FC7\u6EE4 \u4E0D\u5728\u4F7F\u7528\u7684\u6570\u636E\u5377</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>   --filter <span class="token assign-left variable">dangling</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2\u3001\u521B\u5EFA\u4E00\u4E2A\u6570\u636E\u5377\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\uFF0C--name\uFF0C--path\uFF0C--mode\u3002 \u4E5F\u53EF\u4EE5\u4E0D\u7528</p><p>\u62E5\u6709\u4E00\u5207\u81EA\u52A8\u751F\u6210\u7684\u53C2\u6570</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> volume create
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3\u3001\u5220\u9664\u4E00\u4E2A\u6570\u636E\u5377</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">rm</span> <span class="token operator">&lt;</span>volume name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4\u3001\u5BB9\u5668\u6B63\u5728\u4F7F\u7528\u7684\u6570\u636E\u5377\u4E0D\u80FD\u5220\u9664\uFF0C\u7ED1\u5B9A\u6302\u8F7D\u7684\u65E0\u6CD5\u5220\u9664\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> volume <span class="token function">ls</span>   --filter <span class="token assign-left variable">dangling</span><span class="token operator">=</span>true
<span class="token function">docker</span> volume <span class="token function">ls</span>   --filter <span class="token assign-left variable">dangling</span><span class="token operator">=</span>true <span class="token operator">|</span> <span class="token function">grep</span> <span class="token builtin class-name">local</span> <span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token operator">|</span><span class="token function">xargs</span> <span class="token function">docker</span> volume <span class="token function">rm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="run-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#run-\u547D\u4EE4" aria-hidden="true">#</a> RUN \u547D\u4EE4</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> IMAGE <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span> <span class="token punctuation">[</span>ARG<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E</p><table><thead><tr><th>\u53C2\u6570</th><th>\u8BF4\u660E</th><th style="text-align:left;">\u53C2\u6570</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>-a</td><td>\u6307\u5B9A\u6807\u51C6\u8F93\u5165\u8F93\u51FA\u5185\u5BB9\u7C7B\u578B\uFF0C\u53EF\u9009 STDIN/STDOUT/STDERR \u4E09\u9879\u3002</td><td style="text-align:left;">-d</td><td>\u540E\u53F0\u8FD0\u884C\u5BB9\u5668\uFF0C\u5E76\u8FD4\u56DE\u5BB9\u5668ID</td></tr><tr><td>-e</td><td>\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF</td><td style="text-align:left;">-h</td><td>\u6307\u5B9A\u5BB9\u5668\u7684hostname</td></tr><tr><td>-i</td><td>\u4EE5\u4EA4\u4E92\u6A21\u5F0F\u8FD0\u884C\u5BB9\u5668\uFF0C\u901A\u5E38\u4E0E -t \u540C\u65F6\u4F7F\u7528</td><td style="text-align:left;">-t</td><td>\u4E3A\u5BB9\u5668\u91CD\u65B0\u5206\u914D\u4E00\u4E2A\u4F2A\u8F93\u5165\u7EC8\u7AEF\uFF0C\u901A\u5E38\u4E0E -i \u540C\u65F6\u4F7F\u7528</td></tr><tr><td>-m</td><td>\u8BBE\u7F6E\u5BB9\u5668\u4F7F\u7528\u5185\u5B58\u6700\u5927\u503C</td><td style="text-align:left;">-p</td><td>\u968F\u673A\u7AEF\u53E3\u6620\u5C04\uFF0C\u5BB9\u5668\u5185\u90E8\u7AEF\u53E3\u968F\u673A\u6620\u5C04\u5230\u4E3B\u673A\u7684\u7AEF\u53E3</td></tr><tr><td>-v</td><td>\u7ED1\u5B9A\u4E00\u4E2A\u5377</td><td style="text-align:left;">--cpuset</td><td>\u7ED1\u5B9A\u5BB9\u5668\u5230\u6307\u5B9ACPU\u8FD0\u884C</td></tr><tr><td>--dns</td><td>\u6307\u5B9A\u5BB9\u5668\u4F7F\u7528\u7684DNS\u670D\u52A1\u5668\uFF0C\u9ED8\u8BA4\u548C\u5BBF\u4E3B\u4E00\u81F4</td><td style="text-align:left;">--dns-search</td><td>\u6307\u5B9A\u5BB9\u5668DNS\u641C\u7D22\u57DF\u540D\uFF0C\u9ED8\u8BA4\u548C\u5BBF\u4E3B\u4E00\u81F4</td></tr><tr><td>--env-file</td><td>\u4ECE\u6307\u5B9A\u6587\u4EF6\u8BFB\u5165\u73AF\u5883\u53D8\u91CF</td><td style="text-align:left;">--expose</td><td>\u5F00\u653E\u4E00\u4E2A\u7AEF\u53E3\u6216\u4E00\u7EC4\u7AEF\u53E3</td></tr><tr><td>--link</td><td>\u6DFB\u52A0\u94FE\u63A5\u5230\u53E6\u4E00\u4E2A\u5BB9\u5668</td><td style="text-align:left;">--name</td><td>\u4E3A\u5BB9\u5668\u6307\u5B9A\u4E00\u4E2A\u540D\u79F0</td></tr><tr><td>--net</td><td>\u6307\u5B9A\u5BB9\u5668\u7684\u7F51\u7EDC\u8FDE\u63A5\u7C7B\u578B</td><td style="text-align:left;"></td><td></td></tr></tbody></table><p>\u4F8B\u5B50\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run --name some <span class="token punctuation">\\</span>
-v /opt/docker/pxc-server/data:/var/lib/mysql <span class="token punctuation">\\</span>
-e <span class="token assign-left variable">INIT_ROCKDB</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
-e <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
--privileged<span class="token operator">=</span>true <span class="token punctuation">\\</span>
--restart<span class="token operator">=</span>always <span class="token punctuation">\\</span>
-d -i -t -p <span class="token number">3306</span>:3306 percona/percona-server:8.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run --name ps \\
-e MYSQL_ROOT_PASSWORD=123456 \\
--privileged=true \\
--restart=always \\
-d -i -t -p 3306:3306 percona/percona-server:latest

docker exec -it ps cat /etc/my.cnf &gt; /opt/docker/percona-server/conf/my.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,52),l=[i];function d(c,o){return n(),a("div",null,l)}var p=s(t,[["render",d],["__file","Docker\u547D\u4EE4\u8BF4\u660E.html.vue"]]);export{p as default};
