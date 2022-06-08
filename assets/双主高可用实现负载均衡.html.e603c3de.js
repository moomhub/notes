import{_ as n,o as e,c as s,a}from"./app.4a9c1875.js";const i={},l=a(`<h2 id="\u56DB\u3001\u5B89\u88C5haproxy\u548Ckeepalived" tabindex="-1"><a class="header-anchor" href="#\u56DB\u3001\u5B89\u88C5haproxy\u548Ckeepalived" aria-hidden="true">#</a> \u56DB\u3001\u5B89\u88C5haproxy\u548Ckeepalived</h2><h3 id="_1\u3001linux-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_1\u3001linux-\u5B89\u88C5" aria-hidden="true">#</a> 1\u3001Linux \u5B89\u88C5</h3><p>\u53C2\u8003\u94FE\u63A5\uFF1A</p><h3 id="_2\u3001docker\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2\u3001docker\u5B89\u88C5" aria-hidden="true">#</a> 2\u3001Docker\u5B89\u88C5</h3><h4 id="_1\u3001\u62C9\u53D6\u955C\u50CF\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u62C9\u53D6\u955C\u50CF\u6587\u4EF6" aria-hidden="true">#</a> 1\u3001\u62C9\u53D6\u955C\u50CF\u6587\u4EF6</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> pull haproxy:latest
<span class="token function">docker</span> pull instantlinux/haproxy-keepalived:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2\u3001\u7F16\u5199haproxy\u548Ckeepalived\u7684\u914D\u7F6E\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u7F16\u5199haproxy\u548Ckeepalived\u7684\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a> 2\u3001\u7F16\u5199haproxy\u548Ckeepalived\u7684\u914D\u7F6E\u6587\u4EF6</h4><p>haproxy\u7684\u914D\u7F6E\u6587\u4EF6</p><blockquote><p>192.168.100.3:8200 \u8FD9\u4E2A\u662F\u5BBF\u4E3B\u673A\u7684IP \u7AEF\u53E3\u4E5F\u662FMcyat\u5F00\u653E\u7684\u7AEF\u53E3</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>global
    log 127.0.0.1 local0 info  # \u65E5\u5FD7\u5B58\u50A8\u5230127.0.0.1,\u4EE5local0\u8F93\u5165info\u7EA7\u522B
    maxconn 4096 # \u6700\u5927\u8FDE\u63A5\u6570,\u8981\u8003\u8651\u5230ulimit -n\u7684\u5927\u5C0F\u9650\u5236
    daemon
    nbproc 2 # \u8FDB\u7A0B\u6570
   

defaults
    log global
    mode tcp # \u4F7F\u7528tcp4\u5C42\u4EE3\u7406\u6A21\u5F0F
    option tcplog
    option dontlognull
    retries 3
    # \u5728\u4F7F\u7528\u57FA\u4E8Ecookie\u5B9A\u5411\u65F6\uFF0C\u4E00\u65E6\u540E\u7AEF\u67D0\u4E00server\u5B95\u673A\u65F6\uFF0C\u4F1A\u5C06\u4F1A\u8BDD\u91CD\u65B0\u5B9A\u5411\u81F3\u67D0\u4E00\u4E0A\u6E38\u670D\u52A1\u5668\uFF0C\u5FC5\u987B\u4F7F\u7528\u7684\u9009\u9879
    option redispatch
    maxconn 4096
    timeout connect 5s
    timeout client 60s #\u5BA2\u6237\u7AEF\u7A7A\u95F2\u8D85\u65F6\u65F6\u95F4
    timeout server 15s #\u670D\u52A1\u7AEF\u8D85\u65F6\u65F6\u95F4

listen mycat_cluster
    bind 0.0.0.0:3306
    mode tcp
    option tcplog
    balance roundrobin
    #\u91C7\u7528\u8F6E\u8BE2\u673A\u5236,\u8FD8\u53EF\u4EE5\u662F\u5176\u4ED6\u7684\u8D1F\u8F7D\u5747\u8861\u65B9\u5F0F
    #Mycat\u96C6\u7FA4\u8282\u70B9\u914D\u7F6E,inter\u6BCF\u96943\u79D2\u5BF9MQ\u96C6\u7FA4\u505A\u5065\u5EB7\u68C0\u67E5,
    server mycat1 192.168.100.3:8200 check port 8200 weight 1 maxconn 2000
    server mycat2 192.168.100.3:8802 check port 8202 weight 1 maxconn 2000
    option tcpka
    
#\u914D\u7F6Ehaproxy web\u76D1\u63A7,\u67E5\u770B\u7EDF\u8BA1\u4FE1\u606F
listen stats
    bind 0.0.0.0:8999 #\u8FD9\u91CC\u5F97\u914D\u7F6E\u5185\u7F51IP\uFF0C\u7136\u540E\u7528\u5916\u7F51IP\u8BBF\u95EE\u5373\u53EF
    mode http
    option httplog
    stats enable
    stats uri /
    stats refresh 3s	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>keepalived\u914D\u7F6E\u6587\u4EF6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>global_defs {
  default_interface eth0
}

vrrp_instance VI_1 {
  # \u7F51\u5361\u540D\u79F0
  interface eth0
  # \u89C4\u5219
  state MASTER
  virtual_router_id 51
  #\u4F18\u5148\u7EA7
  priority 100
  advert_int 1

  virtual_ipaddress {
    # \u865A\u62DFIP \u5FC5\u987B\u662F\u540C\u4E00\u4E2A\u7F51\u6BB5
    172.18.0.20
  }
  # \u7528\u4E8E\u5FC3\u8DF3\u52A0\u68C0\u6D4B\u7684\u5BC6\u7801
  authentication {
    auth_type PASS
    auth_pass 123456
  }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3\u3001\u5F00\u542Fdocker\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u5F00\u542Fdocker\u670D\u52A1" aria-hidden="true">#</a> 3\u3001\u5F00\u542Fdocker\u670D\u52A1</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cp</span> -r /opt/docker/haproxy-keepalived/hk1/* /opt/docker/haproxy-keepalived/hk2

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1>`,15),d=[l];function r(c,t){return e(),s("div",null,d)}var v=n(i,[["render",r],["__file","\u53CC\u4E3B\u9AD8\u53EF\u7528\u5B9E\u73B0\u8D1F\u8F7D\u5747\u8861.html.vue"]]);export{v as default};
