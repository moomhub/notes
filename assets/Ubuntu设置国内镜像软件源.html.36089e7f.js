import{_ as t,r as u,o as a,c as d,b as e,d as n,a as i,e as s}from"./app.4a9c1875.js";const c={},l=i(`<h1 id="ubuntu-\u8BBE\u7F6E\u56FD\u5185\u955C\u50CF\u8F6F\u4EF6\u6E90" tabindex="-1"><a class="header-anchor" href="#ubuntu-\u8BBE\u7F6E\u56FD\u5185\u955C\u50CF\u8F6F\u4EF6\u6E90" aria-hidden="true">#</a> Ubuntu \u8BBE\u7F6E\u56FD\u5185\u955C\u50CF\u8F6F\u4EF6\u6E90</h1><p>\u5907\u4EFD\u6E90\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cp</span> -ra /etc/apt/sources.list /etc/apt/sources.list.bak
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7684\u4E09\u4E2A\u957F\u671F\u7248\u672C\uFF1A</p><p>\u7248\u672C\u53F7 \u4EE3\u53F7 \u53D1\u5E03\u65F6\u95F4</p><table><thead><tr><th>\u7248\u672C\u53F7</th><th>\u4EE3\u53F7</th><th>\u53D1\u5E03\u65F6\u95F4</th></tr></thead><tbody><tr><td>16.04</td><td>Xenial Xerus\uFF08\u597D\u5BA2\u7684\u975E\u6D32\u5730\u9F20\uFF09</td><td>2016\u5E744\u6708\uFF08TLS\uFF09</td></tr><tr><td>18.04</td><td>Bionic Beaver \uFF08\u4EFF\u751F\u6D77\u72F8\uFF09</td><td>2018\u5E744\u6708\uFF08TLS\uFF09</td></tr><tr><td>20.04</td><td>Focal Fossa \uFF08\u7C7B\u4F3C\u732B\u7684\u98DF\u8089\u54FA\u4E73\u52A8\u7269\uFF09</td><td>2020\u5E744\u6708 (TLS)</td></tr></tbody></table><blockquote><p>\u8F6F\u4EF6\u6E90\u533A\u522B</p><p>#\u963F\u91CC\u6E90 \xA018.04 \u7248\u672C</p></blockquote>`,7),m=s("deb "),o={href:"http://mirrors.aliyun.com/ubuntu/",target:"_blank",rel:"noopener noreferrer"},v=s("http://mirrors.aliyun.com/ubuntu/"),b=s(" **bionic **main restricted universe multiverse"),p=e("blockquote",null,[e("p",null,"#\u963F\u91CC\u6E90 20.04\u7248\u672C")],-1),h=s("deb "),f={href:"http://mirrors.aliyun.com/ubuntu/",target:"_blank",rel:"noopener noreferrer"},_=s("http://mirrors.aliyun.com/ubuntu/"),g=s(" **focal **main restricted universe multiverse"),k=i(`<h2 id="\u963F\u91CC\u6E90" tabindex="-1"><a class="header-anchor" href="#\u963F\u91CC\u6E90" aria-hidden="true">#</a> \u963F\u91CC\u6E90</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u963F\u91CC\u6E90</span>
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7F51\u6613\u6E90" tabindex="-1"><a class="header-anchor" href="#\u7F51\u6613\u6E90" aria-hidden="true">#</a> \u7F51\u6613\u6E90</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u7F51\u6613\u6E90</span>
deb http://mirrors.163.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal-backports main restricted universe multiverse
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6E05\u534E\u6E90" tabindex="-1"><a class="header-anchor" href="#\u6E05\u534E\u6E90" aria-hidden="true">#</a> \u6E05\u534E\u6E90</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u6E05\u534E\u6E90</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse</span>
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse</span>

<span class="token comment"># \u9884\u53D1\u5E03\u8F6F\u4EF6\u6E90\uFF0C\u4E0D\u5EFA\u8BAE\u542F\u7528</span>
<span class="token comment"># deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse</span>
<span class="token comment"># deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse	</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E2D\u79D1\u5927\u6E90" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u79D1\u5927\u6E90" aria-hidden="true">#</a> \u4E2D\u79D1\u5927\u6E90</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">##\u4E2D\u79D1\u5927\u6E90</span>
deb https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-security main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
deb-src https://mirrors.ustc.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u66F4\u65B0\u8F6F\u4EF6\u6E90" tabindex="-1"><a class="header-anchor" href="#\u66F4\u65B0\u8F6F\u4EF6\u6E90" aria-hidden="true">#</a> \u66F4\u65B0\u8F6F\u4EF6\u6E90</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>apt update
apt upgrade
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function y(x,q){const r=u("ExternalLinkIcon");return a(),d("div",null,[l,e("blockquote",null,[e("p",null,[m,e("a",o,[v,n(r)]),b])]),p,e("blockquote",null,[e("p",null,[h,e("a",f,[_,n(r)]),g])]),k])}var L=t(c,[["render",y],["__file","Ubuntu\u8BBE\u7F6E\u56FD\u5185\u955C\u50CF\u8F6F\u4EF6\u6E90.html.vue"]]);export{L as default};
