<template><h1 id="docker-安装web管理平台" tabindex="-1"><a class="header-anchor" href="#docker-安装web管理平台" aria-hidden="true">#</a> Docker 安装Web管理平台</h1>
<blockquote></blockquote>
<h1 id="一、拉取相关镜像" tabindex="-1"><a class="header-anchor" href="#一、拉取相关镜像" aria-hidden="true">#</a> 一、拉取相关镜像</h1>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull rethinkdb
docker pull microbox/etcd
docker pull shipyard/docker-proxy
docker pull swarm
docker pull dockerclub/shipyard
docker images
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><img src="https://cdn.nlark.com/yuque/0/2021/png/395018/1609727399794-88a9447a-0ac3-4e07-9b63-c133b21d8191.png#align=left&amp;display=inline&amp;height=254&amp;margin=[object Object]&amp;originHeight=254&amp;originWidth=873&amp;size=0&amp;status=done&amp;style=none&amp;width=873" alt=""></p>
<p>将原先脚本修改为中文脚本</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>wget https://raw.githubusercontent.com/shipyard/shipyard-project.com/master/site/themes/shipyard/static/deploy
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>解决  raw.githubusercontent.com (raw.githubusercontent.com)|0.0.0.0|:443... 失败：拒绝连接。</p>
</blockquote>
<div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code>sudo vi /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-PowerShell ext-PowerShell line-numbers-mode"><pre v-pre class="language-PowerShell"><code># GitHub Start
52.74.223.119     github.com
192.30.253.119    gist.github.com
54.169.195.247    api.github.com
185.199.111.153   assets-cdn.github.com
151.101.76.133    raw.githubusercontent.com
151.101.108.133   user-images.githubusercontent.com
151.101.76.133    gist.githubusercontent.com
151.101.76.133    cloud.githubusercontent.com
151.101.76.133    camo.githubusercontent.com
151.101.76.133    avatars0.githubusercontent.com
151.101.76.133    avatars1.githubusercontent.com
151.101.76.133    avatars2.githubusercontent.com
151.101.76.133    avatars3.githubusercontent.com
151.101.76.133    avatars4.githubusercontent.com
151.101.76.133    avatars5.githubusercontent.com
151.101.76.133    avatars6.githubusercontent.com
151.101.76.133    avatars7.githubusercontent.com
151.101.76.133    avatars8.githubusercontent.com
# GitHub End
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h1 id="二、运行脚本" tabindex="-1"><a class="header-anchor" href="#二、运行脚本" aria-hidden="true">#</a> 二、运行脚本</h1>
<p>将官方脚本换成修改为中文版的脚本</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>grep -n shipyard:latest deploy
sed -i 's/shipyard\/shipyard:latest/dockerclub\/shipyard:latest/g' deploy
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>默认会用到8080端口和2375端口</p>
<p>如果不想使用这两个端口可以修改</p>
<p>这里我们改成18080与12375端口</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vim deploy
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://cdn.nlark.com/yuque/0/2021/png/395018/1609727399813-68696108-209c-4b5a-a83c-fc410882da7a.png#align=left&amp;display=inline&amp;height=278&amp;margin=[object Object]&amp;originHeight=278&amp;originWidth=385&amp;size=0&amp;status=done&amp;style=none&amp;width=385" alt=""></p>
<p>运行安装脚本</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sh deploy
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>卸载</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat deploy | ACTION=remove bash
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="https://cdn.nlark.com/yuque/0/2021/png/395018/1609727399795-4ef875c4-a34d-446a-bad2-9d583cdc7584.png#align=left&amp;display=inline&amp;height=419&amp;margin=[object Object]&amp;originHeight=419&amp;originWidth=636&amp;size=0&amp;status=done&amp;style=none&amp;width=636" alt=""></p>
<p>安装成功 Username: admin Password: shipyard</p>
<p>通过浏览器访问 本机ip:18080</p>
<p><img src="https://cdn.nlark.com/yuque/0/2021/png/395018/1609727399755-4ae946e6-36c2-4d99-8f11-59ef8cbb6bf1.png#align=left&amp;display=inline&amp;height=461&amp;margin=[object Object]&amp;originHeight=461&amp;originWidth=542&amp;size=0&amp;status=done&amp;style=none&amp;width=542" alt=""></p>
<p><img src="https://cdn.nlark.com/yuque/0/2021/png/395018/1609727399785-375f27c0-9fd2-44fc-8be8-dbd8d51e4df9.png#align=left&amp;display=inline&amp;height=770&amp;margin=[object Object]&amp;originHeight=770&amp;originWidth=1110&amp;size=0&amp;status=done&amp;style=none&amp;width=1110" alt=""></p>
<p>安装成功</p>
<h1 id="_2-集群管理" tabindex="-1"><a class="header-anchor" href="#_2-集群管理" aria-hidden="true">#</a> <strong>2.集群管理</strong></h1>
<p>增加docker集群节点,只需要在节点服务器运行如下语句即可</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sSL https://raw.githubusercontent.com/shipyard/shipyard-project.com/master/site/themes/shipyard/static/deploy | ACTION=n
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
