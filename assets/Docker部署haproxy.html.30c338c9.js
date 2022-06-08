import{_ as n,o as a,c as s,a as e}from"./app.4a9c1875.js";const t={},l=e(`<h1 id="docker\u90E8\u7F72haproxy" tabindex="-1"><a class="header-anchor" href="#docker\u90E8\u7F72haproxy" aria-hidden="true">#</a> Docker\u90E8\u7F72haproxy</h1><h2 id="docker-\u62C9\u53D6\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#docker-\u62C9\u53D6\u955C\u50CF" aria-hidden="true">#</a> docker \u62C9\u53D6\u955C\u50CF</h2><p>haproxy \u7248\u672C</p><p>https://registry.hub.docker.com/_/haproxy?tab=tags</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> pull haproxy:latest

<span class="token function">docker</span> run -d --name mycat1 <span class="token punctuation">\\</span>
-p <span class="token number">8200</span>:8066 <span class="token punctuation">\\</span>
-p <span class="token number">8201</span>:9066 <span class="token punctuation">\\</span>
-v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.101 <span class="token punctuation">\\</span>
mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name mycat2 <span class="token punctuation">\\</span>
-p <span class="token number">8202</span>:8066 <span class="token punctuation">\\</span>
-p <span class="token number">8203</span>:9066 <span class="token punctuation">\\</span>
-v /opt/docker/mycats/mycat2/conf:/usr/local/mycat/conf <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.102 <span class="token punctuation">\\</span>
mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name haproxy1 <span class="token punctuation">\\</span>
-v /opt/docker/haproxys/haproxy1/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro <span class="token punctuation">\\</span>
-p <span class="token number">9999</span>:9999 <span class="token punctuation">\\</span>
-p <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span>
--privileged <span class="token punctuation">\\</span>
--dns <span class="token number">8.8</span>.8.8 --dns <span class="token number">114.114</span>.114.114 <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.199 <span class="token punctuation">\\</span>
haproxy:latest

<span class="token function">docker</span> run -d --name keepalived1 <span class="token punctuation">\\</span>
--detach <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.110 <span class="token punctuation">\\</span>
osixia/keepalived:latest

<span class="token function">docker</span> run -d --name keepalived2 <span class="token punctuation">\\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/keepaliveds/keepalived1/keepalived.conf,dst<span class="token operator">=</span>/container/service/keepalived/assets/keepalived.conf <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.110 <span class="token punctuation">\\</span>
--privileged <span class="token punctuation">\\</span>
--detach osixia/keepalived:latest --copy-service

<span class="token function">docker</span> run -d --name hk1 <span class="token punctuation">\\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/keepaliveds/keepalived1/keepalived.conf,dst<span class="token operator">=</span>/etc/keepalived/keepalived.conf <span class="token punctuation">\\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxys/haproxy1/haproxy.cfg,dst<span class="token operator">=</span>/etc/haproxy.cfg <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.111 <span class="token punctuation">\\</span>
-p <span class="token number">8999</span>:8999 <span class="token punctuation">\\</span>
-p <span class="token number">5678</span>:5678 <span class="token punctuation">\\</span>
-p <span class="token number">8001</span>:8001 <span class="token punctuation">\\</span>
--privileged <span class="token punctuation">\\</span>
instantlinux/haproxy-keepalived:latest

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="haproxy-\u9ED8\u8BA4\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#haproxy-\u9ED8\u8BA4\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> Haproxy \u9ED8\u8BA4\u914D\u7F6E\u6587\u4EF6</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run -d --name mycat2 <span class="token punctuation">\\</span>
-p <span class="token number">8202</span>:8066 <span class="token punctuation">\\</span>
-p <span class="token number">8203</span>:9066 <span class="token punctuation">\\</span>
-v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.102 <span class="token punctuation">\\</span>
mycat-1.6.7.4:latest

    <span class="token function">docker</span> run -d --name mycat1 <span class="token punctuation">\\</span>
    -p <span class="token number">8200</span>:8066 <span class="token punctuation">\\</span>
    -p <span class="token number">8201</span>:9066 <span class="token punctuation">\\</span>
    -v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf <span class="token punctuation">\\</span>
    --network mynetwork --ip <span class="token number">172.18</span>.0.101 <span class="token punctuation">\\</span>
    mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name mycat2 <span class="token punctuation">\\</span>
-p <span class="token number">8202</span>:8066 <span class="token punctuation">\\</span>
-p <span class="token number">8203</span>:9066 <span class="token punctuation">\\</span>
-v /opt/docker/mycats/mycat2/conf:/usr/local/mycat/conf <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.102 <span class="token punctuation">\\</span>
mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name hk1 <span class="token punctuation">\\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxy-keepalived/hk1/keepalived.conf,dst<span class="token operator">=</span>/etc/keepalived/keepalived.conf <span class="token punctuation">\\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxy-keepalived/hk1/haproxys.cfg,dst<span class="token operator">=</span>/etc/haproxy.cfg <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.111 <span class="token punctuation">\\</span>
-p <span class="token number">18999</span>:8999 <span class="token punctuation">\\</span>
-p <span class="token number">13306</span>:3306 <span class="token punctuation">\\</span>
--privileged <span class="token punctuation">\\</span>
instantlinux/haproxy-keepalived:latest

<span class="token function">docker</span> run -d --name hk2 <span class="token punctuation">\\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxy-keepalived/hk2/keepalived.conf,dst<span class="token operator">=</span>/etc/keepalived/keepalived.conf <span class="token punctuation">\\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxy-keepalived/hk2/haproxys.cfg,dst<span class="token operator">=</span>/etc/haproxy.cfg <span class="token punctuation">\\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.112 <span class="token punctuation">\\</span>
-p <span class="token number">28999</span>:8999 <span class="token punctuation">\\</span>
-p <span class="token number">23306</span>:3306 <span class="token punctuation">\\</span>
--privileged <span class="token punctuation">\\</span>
instantlinux/haproxy-keepalived:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-properties ext-properties line-numbers-mode"><pre class="language-properties"><code>global
<span class="token key attr-name">    log</span> <span class="token value attr-value">127.0.0.1 local0 info  # \u65E5\u5FD7\u5B58\u50A8\u5230127.0.0.1,\u4EE5local0\u8F93\u5165info\u7EA7\u522B</span>
<span class="token key attr-name">    maxconn</span> <span class="token value attr-value">4096 # \u6700\u5927\u8FDE\u63A5\u6570,\u8981\u8003\u8651\u5230ulimit -n\u7684\u5927\u5C0F\u9650\u5236</span>
    daemon
<span class="token key attr-name">    nbproc</span> <span class="token value attr-value">2 # \u8FDB\u7A0B\u6570</span>
   

defaults
<span class="token key attr-name">    log</span> <span class="token value attr-value">global</span>
<span class="token key attr-name">    mode</span> <span class="token value attr-value">tcp # \u4F7F\u7528tcp4\u5C42\u4EE3\u7406\u6A21\u5F0F</span>
<span class="token key attr-name">    option</span> <span class="token value attr-value">tcplog</span>
<span class="token key attr-name">    option</span> <span class="token value attr-value">dontlognull</span>
<span class="token key attr-name">    retries</span> <span class="token value attr-value">3</span>
<span class="token comment">    # \u5728\u4F7F\u7528\u57FA\u4E8Ecookie\u5B9A\u5411\u65F6\uFF0C\u4E00\u65E6\u540E\u7AEF\u67D0\u4E00server\u5B95\u673A\u65F6\uFF0C\u4F1A\u5C06\u4F1A\u8BDD\u91CD\u65B0\u5B9A\u5411\u81F3\u67D0\u4E00\u4E0A\u6E38\u670D\u52A1\u5668\uFF0C\u5FC5\u987B\u4F7F\u7528\u7684\u9009\u9879</span>
<span class="token key attr-name">    option</span> <span class="token value attr-value">redispatch</span>
<span class="token key attr-name">    maxconn</span> <span class="token value attr-value">4096</span>
<span class="token key attr-name">    timeout</span> <span class="token value attr-value">connect 5s</span>
<span class="token key attr-name">    timeout</span> <span class="token value attr-value">client 60s #\u5BA2\u6237\u7AEF\u7A7A\u95F2\u8D85\u65F6\u65F6\u95F4</span>
<span class="token key attr-name">    timeout</span> <span class="token value attr-value">server 15s #\u670D\u52A1\u7AEF\u8D85\u65F6\u65F6\u95F4</span>

<span class="token key attr-name">listen</span> <span class="token value attr-value">rabbitmq_cluster</span>
<span class="token key attr-name">    bind</span> <span class="token value attr-value">0.0.0.0:5678</span>
<span class="token key attr-name">    mode</span> <span class="token value attr-value">tcp</span>
<span class="token key attr-name">    balance</span> <span class="token value attr-value">roundrobin #\u91C7\u7528\u8F6E\u8BE2\u673A\u5236,\u8FD8\u53EF\u4EE5\u662F\u5176\u4ED6\u7684\u8D1F\u8F7D\u5747\u8861\u65B9\u5F0F</span>
<span class="token comment">        #rabbitmq\u96C6\u7FA4\u8282\u70B9\u914D\u7F6E,inter\u6BCF\u96943\u79D2\u5BF9MQ\u96C6\u7FA4\u505A\u5065\u5EB7\u68C0\u67E5,</span>
<span class="token key attr-name">    server</span> <span class="token value attr-value">rabbit1 192.168.1.181:5672 check inter 3000 rise 2 fall 2</span>
<span class="token key attr-name">    server</span> <span class="token value attr-value">rabbit2 192.168.1.182:5672 check inter 3000 rise 2 fall 2</span>
    
<span class="token comment">#\u914D\u7F6Ehaproxy web\u76D1\u63A7,\u67E5\u770B\u7EDF\u8BA1\u4FE1\u606F</span>
<span class="token key attr-name">listen</span> <span class="token value attr-value">stats</span>
<span class="token key attr-name">    bind</span> <span class="token value attr-value">0.0.0.0:8999 #\u8FD9\u91CC\u5F97\u914D\u7F6E\u5185\u7F51IP\uFF0C\u7136\u540E\u7528\u5916\u7F51IP\u8BBF\u95EE\u5373\u53EF</span>
<span class="token key attr-name">    mode</span> <span class="token value attr-value">http</span>
<span class="token key attr-name">    option</span> <span class="token value attr-value">httplog</span>
<span class="token key attr-name">    stats</span> <span class="token value attr-value">enable</span>
<span class="token comment">    #\u8BBE\u7F6Ehaproxy\u76D1\u63A7\u5730\u5740\u4E3Ahttp://39.101.209.123:8999/rabbitmq-stats</span>
<span class="token key attr-name">    stats</span> <span class="token value attr-value">uri /</span>
<span class="token key attr-name">    stats</span> <span class="token value attr-value">refresh 3s</span>
    
<span class="token key attr-name">listen</span> <span class="token value attr-value">rabbitmq_admin</span>
<span class="token key attr-name">    bind</span> <span class="token value attr-value">0.0.0.0:8001</span>
<span class="token key attr-name">    server</span> <span class="token value attr-value">rabbit1 192.168.1.181:15672</span>
<span class="token key attr-name">    server</span> <span class="token value attr-value">rabbit2 192.168.1.182:15672</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="haproxy\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#haproxy\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> Haproxy\u914D\u7F6E\u6587\u4EF6</h2><div class="language-properties ext-properties line-numbers-mode"><pre class="language-properties"><code><span class="token key attr-name">listen</span> <span class="token value attr-value">admin_stats</span>
<span class="token key attr-name">bind</span> <span class="token value attr-value">0.0.0.0:4001</span>
<span class="token comment">#\u76D1\u63A7\u754C\u9762\u7684\u8BBF\u95EE\u7684IP\u548C\u7AEF\u53E3</span>
<span class="token key attr-name">mode</span> <span class="token value attr-value">http</span>
<span class="token comment">#\u8BBF\u95EE\u534F\u8BAE</span>
<span class="token key attr-name">stats</span> <span class="token value attr-value">uri /dbs#URI\u76F8\u5BF9\u5730\u5740</span>
<span class="token key attr-name">stats</span> <span class="token value attr-value">realm Globall statistics#\u7EDF\u8BA1\u62A5\u544A\u683C\u5F0F</span>
<span class="token key attr-name">stats</span> <span class="token value attr-value">authadmin:abc123456#\u767B\u9646\u5E10\u6237\u4FE1\u606F</span>

<span class="token key attr-name">listen</span> <span class="token value attr-value">proxy-mysql</span>
<span class="token key attr-name">bind0.0.0.0</span><span class="token punctuation">:</span><span class="token value attr-value">3306</span>
<span class="token key attr-name">mode</span> <span class="token value attr-value">tcp</span>
<span class="token key attr-name">balance</span> <span class="token value attr-value">roundrobin</span>
<span class="token key attr-name">option</span> <span class="token value attr-value">tcplog #\u65E5\u5FD7\u683C\u5F0F</span>
<span class="token key attr-name">server</span> <span class="token value attr-value">mycat_1 192.168.99.131:8066 check port 8066 weight 1 maxconn 200o</span>
<span class="token key attr-name">server</span> <span class="token value attr-value">mycat_2 192.168.99.132:8066 check port 8066 weight 1 maxconn 2000</span>
<span class="token key attr-name">option</span> <span class="token value attr-value">tcpka #\u4F7F\u7528keepalive\u68C0\u6D4B\u6B7B\u94FE</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="keepalived\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#keepalived\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> keepalived\u914D\u7F6E\u6587\u4EF6</h2><div class="language-nginx ext-nginx line-numbers-mode"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">vrrp_instance</span> VI_1</span> <span class="token punctuation">{</span>
  <span class="token comment"># \u7F51\u5361\u540D\u79F0</span>
  <span class="token directive"><span class="token keyword">interface</span> eth0
  <span class="token comment"># \u89C4\u5219</span>
  state MASTER
  virtual_router_id <span class="token number">51</span>
  <span class="token comment">#\u4F18\u5148\u7EA7</span>
  priority <span class="token number">100</span>
  advert_int <span class="token number">1</span>

  virtual_ipaddress</span> <span class="token punctuation">{</span>
    172.18.0.240
  <span class="token punctuation">}</span>

  <span class="token directive"><span class="token keyword">authentication</span></span> <span class="token punctuation">{</span>
    auth_type PASS
    auth_pass 123456
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),i=[l];function p(c,o){return a(),s("div",null,i)}var d=n(t,[["render",p],["__file","Docker\u90E8\u7F72haproxy.html.vue"]]);export{d as default};
