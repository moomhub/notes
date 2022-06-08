import{_ as e,o as n,c as s,a}from"./app.4a9c1875.js";const i={},d=a(`<h1 id="docker-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#docker-\u5B89\u88C5" aria-hidden="true">#</a> Docker \u5B89\u88C5</h1><h2 id="docker-linux\u5E73\u53F0\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#docker-linux\u5E73\u53F0\u5B89\u88C5" aria-hidden="true">#</a> Docker-Linux\u5E73\u53F0\u5B89\u88C5</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> -fsSL https://get.docker.com <span class="token operator">|</span> <span class="token function">bash</span> -s <span class="token function">docker</span> --mirror Aliyun
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="ubuntu-14-04-16-04-\u4F7F\u7528apt-get\u8FDB\u884C\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#ubuntu-14-04-16-04-\u4F7F\u7528apt-get\u8FDB\u884C\u5B89\u88C5" aria-hidden="true">#</a> Ubuntu 14.04 16.04 (\u4F7F\u7528apt-get\u8FDB\u884C\u5B89\u88C5)</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># step 1: \u5B89\u88C5\u5FC5\u8981\u7684\u4E00\u4E9B\u7CFB\u7EDF\u5DE5\u5177</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> -y <span class="token function">install</span> apt-transport-https ca-certificates <span class="token function">curl</span> software-properties-common
<span class="token comment"># step 2: \u5B89\u88C5GPG\u8BC1\u4E66</span>
<span class="token function">curl</span> -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token comment"># Step 3: \u5199\u5165\u8F6F\u4EF6\u6E90\u4FE1\u606F</span>
<span class="token function">sudo</span> add-apt-repository <span class="token string">&quot;deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu <span class="token variable"><span class="token variable">$(</span>lsb_release -cs<span class="token variable">)</span></span> stable&quot;</span>
<span class="token comment"># Step 4: \u66F4\u65B0\u5E76\u5B89\u88C5 Docker-CE</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> -y update
<span class="token function">sudo</span> <span class="token function">apt-get</span> -y <span class="token function">install</span> docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="centos-7-\u4F7F\u7528yum\u8FDB\u884C\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#centos-7-\u4F7F\u7528yum\u8FDB\u884C\u5B89\u88C5" aria-hidden="true">#</a> CentOS 7 (\u4F7F\u7528yum\u8FDB\u884C\u5B89\u88C5)</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># step 1: \u5B89\u88C5\u5FC5\u8981\u7684\u4E00\u4E9B\u7CFB\u7EDF\u5DE5\u5177</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> -y yum-utils device-mapper-persistent-data lvm2
<span class="token comment"># Step 2: \u6DFB\u52A0\u8F6F\u4EF6\u6E90\u4FE1\u606F</span>
<span class="token function">sudo</span> yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
<span class="token comment"># Step 3: \u66F4\u65B0\u5E76\u5B89\u88C5 Docker-CE</span>
<span class="token function">sudo</span> yum makecache fast
<span class="token function">sudo</span> yum -y <span class="token function">install</span> docker-ce
<span class="token comment"># Step 4: \u5F00\u542FDocker\u670D\u52A1</span>
<span class="token function">sudo</span> <span class="token function">service</span> <span class="token function">docker</span> start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-\u547D\u4EE4\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#docker-\u547D\u4EE4\u8BF4\u660E" aria-hidden="true">#</a> Docker \u547D\u4EE4\u8BF4\u660E</h2><h3 id="docker\u57FA\u7840\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker\u57FA\u7840\u547D\u4EE4" aria-hidden="true">#</a> docker\u57FA\u7840\u547D\u4EE4</h3><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>
systemctl start  docker
systemctl stop  docker
systemctl status  docker
docker version  #\u67E5\u67E5\u7248\u672C
docker info     #\u67E5\u770Binfo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-\u8BBE\u7F6E\u5F00\u673A\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#docker-\u8BBE\u7F6E\u5F00\u673A\u542F\u52A8" aria-hidden="true">#</a> Docker \u8BBE\u7F6E\u5F00\u673A\u542F\u52A8</h3><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>systemctl stop  docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u4FEE\u6539docker\u955C\u50CF\u52A0\u901F" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539docker\u955C\u50CF\u52A0\u901F" aria-hidden="true">#</a> \u4FEE\u6539docker\u955C\u50CF\u52A0\u901F</h3><p>\u4FEE\u6539\u4E3A\u7F51\u6613\u3001\u963F\u91CC\u3001daocloud\u52A0\u901F</p><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>  vi /etc/docker/daemon.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>	<span class="token punctuation">{</span>
 <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
     <span class="token string">&quot;http://hub-mirror.c.163.com&quot;</span><span class="token punctuation">,</span>
     <span class="token string">&quot;https://yuj65s1u.mirror.aliyuncs.com&quot;</span><span class="token punctuation">,</span>
     <span class="token string">&quot;http://f1361db2.m.daocloud.io&quot;</span>
 <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>    systemctl restart  docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker-\u5378\u8F7D" tabindex="-1"><a class="header-anchor" href="#docker-\u5378\u8F7D" aria-hidden="true">#</a> Docker \u5378\u8F7D</h2><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>apt-get autoremove docker docker-ce docker-engine  docker.io  containerd runc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u67E5\u770B\u662F\u5426\u5B8C\u5168\u5220\u9664" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u662F\u5426\u5B8C\u5168\u5220\u9664" aria-hidden="true">#</a> \u67E5\u770B\u662F\u5426\u5B8C\u5168\u5220\u9664</h3><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>dpkg -l | grep docker
dpkg -l |grep ^rc|awk &#39;{print $2}&#39; |sudo xargs dpkg -P # \u5220\u9664\u65E0\u7528\u7684\u76F8\u5173\u7684\u914D\u7F6E\u6587\u4EF6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5220\u9664\u76F8\u5173\u9879" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u76F8\u5173\u9879" aria-hidden="true">#</a> \u5220\u9664\u76F8\u5173\u9879</h3><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>apt-get autoremove docker-ce-*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5220\u9664docker\u7684\u76F8\u5173\u914D\u7F6E-\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664docker\u7684\u76F8\u5173\u914D\u7F6E-\u76EE\u5F55" aria-hidden="true">#</a> \u5220\u9664docker\u7684\u76F8\u5173\u914D\u7F6E&amp;\u76EE\u5F55</h3><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>rm -rf /etc/systemd/system/docker.service.d
rm -rf /var/lib/docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-\u52A0\u901F" tabindex="-1"><a class="header-anchor" href="#docker-\u52A0\u901F" aria-hidden="true">#</a> docker \u52A0\u901F</h2><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code>sudo mkdir -p /etc/docker

vim /etc/docker/daemon.json
{
  &quot;registry-mirrors&quot;: [
      &quot;https://yuj65s1u.mirror.aliyuncs.com&quot;,
      &quot;https://docker.mirrors.ustc.edu.cn&quot;,
      &quot;https://hub-mirror.c.163.com&quot;
      ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
docker \u66B4\u9732\u7AEF\u53E32375
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker\u5F00\u542F2375-\u7AEF\u53E3" tabindex="-1"><a class="header-anchor" href="#docker\u5F00\u542F2375-\u7AEF\u53E3" aria-hidden="true">#</a> docker\u5F00\u542F2375 \u7AEF\u53E3</h2><p>\u5F00\u542F2375\u7AEF\u53E3\u5B9E\u73B0\u8FDC\u7A0B\u8FDE\u63A5</p><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre class="language-PowerShell"><code># \u4FEE\u6539\u914D\u7F6E\u6587\u4EF6
vim /lib/systemd/system/docker.service
# \u6CE8\u91CA\u539F\u6709\u7684 ExecStart \u6DFB\u52A0\u4EE5\u4E0B\u5185\u5BB9
#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375
# \u91CD\u65B0\u52A0\u8F7D\u914D\u7F6E
systemctl daemon-reload
# \u91CD\u542F Dcoker
systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,30),r=[d];function c(l,o){return n(),s("div",null,r)}var u=e(i,[["render",c],["__file","Docker\u5B89\u88C5.html.vue"]]);export{u as default};
