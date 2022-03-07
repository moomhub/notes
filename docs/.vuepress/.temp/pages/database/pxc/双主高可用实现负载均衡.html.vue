<template><h2 id="四、安装haproxy和keepalived" tabindex="-1"><a class="header-anchor" href="#四、安装haproxy和keepalived" aria-hidden="true">#</a> 四、安装haproxy和keepalived</h2>
<h3 id="_1、linux-安装" tabindex="-1"><a class="header-anchor" href="#_1、linux-安装" aria-hidden="true">#</a> 1、Linux 安装</h3>
<p>参考链接：</p>
<h3 id="_2、docker安装" tabindex="-1"><a class="header-anchor" href="#_2、docker安装" aria-hidden="true">#</a> 2、Docker安装</h3>
<h4 id="_1、拉取镜像文件" tabindex="-1"><a class="header-anchor" href="#_1、拉取镜像文件" aria-hidden="true">#</a> 1、拉取镜像文件</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull haproxy:latest
<span class="token function">docker</span> pull instantlinux/haproxy-keepalived:latest
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="_2、编写haproxy和keepalived的配置文件" tabindex="-1"><a class="header-anchor" href="#_2、编写haproxy和keepalived的配置文件" aria-hidden="true">#</a> 2、编写haproxy和keepalived的配置文件</h4>
<p>haproxy的配置文件</p>
<blockquote>
<p>192.168.100.3:8200  这个是宿主机的IP 端口也是Mcyat开放的端口</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>global
    log 127.0.0.1 local0 info  # 日志存储到127.0.0.1,以local0输入info级别
    maxconn 4096 # 最大连接数,要考虑到ulimit -n的大小限制
    daemon
    nbproc 2 # 进程数
   

defaults
    log global
    mode tcp # 使用tcp4层代理模式
    option tcplog
    option dontlognull
    retries 3
    # 在使用基于cookie定向时，一旦后端某一server宕机时，会将会话重新定向至某一上游服务器，必须使用的选项
    option redispatch
    maxconn 4096
    timeout connect 5s
    timeout client 60s #客户端空闲超时时间
    timeout server 15s #服务端超时时间

listen mycat_cluster
    bind 0.0.0.0:3306
    mode tcp
    option tcplog
    balance roundrobin
    #采用轮询机制,还可以是其他的负载均衡方式
    #Mycat集群节点配置,inter每隔3秒对MQ集群做健康检查,
    server mycat1 192.168.100.3:8200 check port 8200 weight 1 maxconn 2000
    server mycat2 192.168.100.3:8802 check port 8202 weight 1 maxconn 2000
    option tcpka
    
#配置haproxy web监控,查看统计信息
listen stats
    bind 0.0.0.0:8999 #这里得配置内网IP，然后用外网IP访问即可
    mode http
    option httplog
    stats enable
    stats uri /
    stats refresh 3s	
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><p>keepalived配置文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>global_defs {
  default_interface eth0
}

vrrp_instance VI_1 {
  # 网卡名称
  interface eth0
  # 规则
  state MASTER
  virtual_router_id 51
  #优先级
  priority 100
  advert_int 1

  virtual_ipaddress {
    # 虚拟IP 必须是同一个网段
    172.18.0.20
  }
  # 用于心跳加检测的密码
  authentication {
    auth_type PASS
    auth_pass 123456
  }

}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h4 id="_3、开启docker服务" tabindex="-1"><a class="header-anchor" href="#_3、开启docker服务" aria-hidden="true">#</a> 3、开启docker服务</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span> -r /opt/docker/haproxy-keepalived/hk1/* /opt/docker/haproxy-keepalived/hk2

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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h1>
</template>
