<template><h2 id="docker部署haproxy" tabindex="-1"><a class="header-anchor" href="#docker部署haproxy" aria-hidden="true">#</a> Docker部署haproxy</h2>
<p>一、docker 拉取镜像</p>
<p>haproxy 版本</p>
<p>https://registry.hub.docker.com/_/haproxy?tab=tags</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull haproxy:latest

<span class="token function">docker</span> run -d --name mycat1 <span class="token punctuation">\</span>
-p <span class="token number">8200</span>:8066 <span class="token punctuation">\</span>
-p <span class="token number">8201</span>:9066 <span class="token punctuation">\</span>
-v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.101 <span class="token punctuation">\</span>
mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name mycat2 <span class="token punctuation">\</span>
-p <span class="token number">8202</span>:8066 <span class="token punctuation">\</span>
-p <span class="token number">8203</span>:9066 <span class="token punctuation">\</span>
-v /opt/docker/mycats/mycat2/conf:/usr/local/mycat/conf <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.102 <span class="token punctuation">\</span>
mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name haproxy1 <span class="token punctuation">\</span>
-v /opt/docker/haproxys/haproxy1/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro <span class="token punctuation">\</span>
-p <span class="token number">9999</span>:9999 <span class="token punctuation">\</span>
-p <span class="token number">3306</span>:3306 <span class="token punctuation">\</span>
--privileged <span class="token punctuation">\</span>
--dns <span class="token number">8.8</span>.8.8 --dns <span class="token number">114.114</span>.114.114 <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.199 <span class="token punctuation">\</span>
haproxy:latest

<span class="token function">docker</span> run -d --name keepalived1 <span class="token punctuation">\</span>
--detach <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.110 <span class="token punctuation">\</span>
osixia/keepalived:latest

<span class="token function">docker</span> run -d --name keepalived2 <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/keepaliveds/keepalived1/keepalived.conf,dst<span class="token operator">=</span>/container/service/keepalived/assets/keepalived.conf <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.110 <span class="token punctuation">\</span>
--privileged <span class="token punctuation">\</span>
--detach osixia/keepalived:latest --copy-service

<span class="token function">docker</span> run -d --name hk1 <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/keepaliveds/keepalived1/keepalived.conf,dst<span class="token operator">=</span>/etc/keepalived/keepalived.conf <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxys/haproxy1/haproxy.cfg,dst<span class="token operator">=</span>/etc/haproxy.cfg <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.111 <span class="token punctuation">\</span>
-p <span class="token number">8999</span>:8999 <span class="token punctuation">\</span>
-p <span class="token number">5678</span>:5678 <span class="token punctuation">\</span>
-p <span class="token number">8001</span>:8001 <span class="token punctuation">\</span>
--privileged <span class="token punctuation">\</span>
instantlinux/haproxy-keepalived:latest

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p>Haproxy 默认配置文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d --name mycat2 <span class="token punctuation">\</span>
-p <span class="token number">8202</span>:8066 <span class="token punctuation">\</span>
-p <span class="token number">8203</span>:9066 <span class="token punctuation">\</span>
-v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.102 <span class="token punctuation">\</span>
mycat-1.6.7.4:latest

    <span class="token function">docker</span> run -d --name mycat1 <span class="token punctuation">\</span>
    -p <span class="token number">8200</span>:8066 <span class="token punctuation">\</span>
    -p <span class="token number">8201</span>:9066 <span class="token punctuation">\</span>
    -v /opt/docker/mycats/mycat1/conf:/usr/local/mycat/conf <span class="token punctuation">\</span>
    --network mynetwork --ip <span class="token number">172.18</span>.0.101 <span class="token punctuation">\</span>
    mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name mycat2 <span class="token punctuation">\</span>
-p <span class="token number">8202</span>:8066 <span class="token punctuation">\</span>
-p <span class="token number">8203</span>:9066 <span class="token punctuation">\</span>
-v /opt/docker/mycats/mycat2/conf:/usr/local/mycat/conf <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.102 <span class="token punctuation">\</span>
mycat-1.6.7.4:latest

<span class="token function">docker</span> run -d --name hk1 <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxy-keepalived/hk1/keepalived.conf,dst<span class="token operator">=</span>/etc/keepalived/keepalived.conf <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxy-keepalived/hk1/haproxys.cfg,dst<span class="token operator">=</span>/etc/haproxy.cfg <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.111 <span class="token punctuation">\</span>
-p <span class="token number">18999</span>:8999 <span class="token punctuation">\</span>
-p <span class="token number">13306</span>:3306 <span class="token punctuation">\</span>
--privileged <span class="token punctuation">\</span>
instantlinux/haproxy-keepalived:latest

<span class="token function">docker</span> run -d --name hk2 <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxy-keepalived/hk2/keepalived.conf,dst<span class="token operator">=</span>/etc/keepalived/keepalived.conf <span class="token punctuation">\</span>
--mount <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span>/opt/docker/haproxy-keepalived/hk2/haproxys.cfg,dst<span class="token operator">=</span>/etc/haproxy.cfg <span class="token punctuation">\</span>
--network mynetwork --ip <span class="token number">172.18</span>.0.112 <span class="token punctuation">\</span>
-p <span class="token number">28999</span>:8999 <span class="token punctuation">\</span>
-p <span class="token number">23306</span>:3306 <span class="token punctuation">\</span>
--privileged <span class="token punctuation">\</span>
instantlinux/haproxy-keepalived:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>global
    log <span class="token number">127.0</span>.0.1 local0 info  <span class="token comment"># 日志存储到127.0.0.1,以local0输入info级别</span>
    maxconn <span class="token number">4096</span> <span class="token comment"># 最大连接数,要考虑到ulimit -n的大小限制</span>
    daemon
    nbproc <span class="token number">2</span> <span class="token comment"># 进程数</span>
   

defaults
    log global
    mode tcp <span class="token comment"># 使用tcp4层代理模式</span>
    option tcplog
    option dontlognull
    retries <span class="token number">3</span>
    <span class="token comment"># 在使用基于cookie定向时，一旦后端某一server宕机时，会将会话重新定向至某一上游服务器，必须使用的选项</span>
    option redispatch
    maxconn <span class="token number">4096</span>
    <span class="token function">timeout</span> connect 5s
    <span class="token function">timeout</span> client 60s <span class="token comment">#客户端空闲超时时间</span>
    <span class="token function">timeout</span> server 15s <span class="token comment">#服务端超时时间</span>

listen rabbitmq_cluster
    <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:5678
    mode tcp
    balance roundrobin <span class="token comment">#采用轮询机制,还可以是其他的负载均衡方式</span>
        <span class="token comment">#rabbitmq集群节点配置,inter每隔3秒对MQ集群做健康检查,</span>
    server rabbit1 <span class="token number">192.168</span>.1.181:5672 check inter <span class="token number">3000</span> rise <span class="token number">2</span> fall <span class="token number">2</span>
    server rabbit2 <span class="token number">192.168</span>.1.182:5672 check inter <span class="token number">3000</span> rise <span class="token number">2</span> fall <span class="token number">2</span>
    
<span class="token comment">#配置haproxy web监控,查看统计信息</span>
listen stats
    <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:8999 <span class="token comment">#这里得配置内网IP，然后用外网IP访问即可</span>
    mode http
    option httplog
    stats <span class="token builtin class-name">enable</span>
    <span class="token comment">#设置haproxy监控地址为http://39.101.209.123:8999/rabbitmq-stats</span>
    stats uri /
    stats refresh 3s
    
listen rabbitmq_admin
    <span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:8001
    server rabbit1 <span class="token number">192.168</span>.1.181:15672
    server rabbit2 <span class="token number">192.168</span>.1.182:15672
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>Haproxy配置文件（一)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>listen admin_stats
<span class="token builtin class-name">bind</span> <span class="token number">0.0</span>.0.0:4001
<span class="token comment">#监控界面的访问的IP和端口</span>
mode http
<span class="token comment">#访问协议</span>
stats uri /dbs<span class="token comment">#URI相对地址</span>
stats realm Globall statistics<span class="token comment">#统计报告格式</span>
stats authadmin:abc123456<span class="token comment">#登陆帐户信息</span>

listen proxy-mysql
bind0.0.0.0:3306
mode tcp
balance roundrobin
option tcplog <span class="token comment">#日志格式</span>
server mycat_1 <span class="token number">192.168</span>.99.131:8066 check port <span class="token number">8066</span> weight <span class="token number">1</span> maxconn 200o
server mycat_2 <span class="token number">192.168</span>.99.132:8066 check port <span class="token number">8066</span> weight <span class="token number">1</span> maxconn <span class="token number">2000</span>
option tcpka <span class="token comment">#使用keepalive检测死链</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>keepalived配置文件</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">vrrp_instance</span> VI_1</span> <span class="token punctuation">{</span>
  <span class="token comment"># 网卡名称</span>
  <span class="token directive"><span class="token keyword">interface</span> eth0
  <span class="token comment"># 规则</span>
  state MASTER
  virtual_router_id <span class="token number">51</span>
  <span class="token comment">#优先级</span>
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

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>什么是基准测试
辑，更加简单、直接、易于测试，不要求真实
基准测试是针对系统的一种压力测试，但基准测试不关心业务逻</p>
</template>
