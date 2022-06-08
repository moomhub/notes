import{_ as n,o as s,c as a,a as e}from"./app.4a9c1875.js";const t={},l=e(`<h1 id="seata-\u5206\u5E03\u5F0F\u4E8B\u52A1" tabindex="-1"><a class="header-anchor" href="#seata-\u5206\u5E03\u5F0F\u4E8B\u52A1" aria-hidden="true">#</a> Seata \u5206\u5E03\u5F0F\u4E8B\u52A1</h1><h2 id="docker-\u8FD0\u884Cseata" tabindex="-1"><a class="header-anchor" href="#docker-\u8FD0\u884Cseata" aria-hidden="true">#</a> Docker \u8FD0\u884CSeata</h2><p>\u81EA\u5B9A\u4E49\u914D\u7F6E\u6587\u4EF6\u9700\u8981\u901A\u8FC7\u6302\u8F7D\u6587\u4EF6\u7684\u65B9\u5F0F\u5B9E\u73B0\uFF0C\u5C06\u5BBF\u4E3B\u673A\u4E0A\u7684 <code>registry.conf</code> \u548C <code>file.conf</code> \u6302\u8F7D\u5230\u5BB9\u5668\u4E2D\u76F8\u5E94\u7684\u76EE\u5F55</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run --name seata-server <span class="token punctuation">\\</span>
-p <span class="token number">8091</span>:8091 <span class="token punctuation">\\</span>
-e <span class="token assign-left variable">SEATA_CONFIG_NAME</span><span class="token operator">=</span>file:/root/seata-config/registry <span class="token punctuation">\\</span>
-v /User/seata/config:/root/seata-config <span class="token punctuation">\\</span>
seataio/seata-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5BB9\u5668\u547D\u4EE4\u884C\u53CA\u67E5\u770B\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668\u547D\u4EE4\u884C\u53CA\u67E5\u770B\u65E5\u5FD7" aria-hidden="true">#</a> \u5BB9\u5668\u547D\u4EE4\u884C\u53CA\u67E5\u770B\u65E5\u5FD7</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> -it seata-server <span class="token function">sh</span>
$ <span class="token function">docker</span> logs -f seata-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="seata-\u6570\u636E\u5E93\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#seata-\u6570\u636E\u5E93\u6587\u4EF6" aria-hidden="true">#</a> Seata \u6570\u636E\u5E93\u6587\u4EF6</h2><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>-- the table to store GlobalSession data
drop table if exists \`global_table\`;
create table \`global_table\` (
  \`xid\` varchar(128)  not null,
  \`transaction_id\` bigint,
  \`status\` tinyint not null,
  \`application_id\` varchar(32),
  \`transaction_service_group\` varchar(32),
  \`transaction_name\` varchar(128),
  \`timeout\` int,
  \`begin_time\` bigint,
  \`application_data\` varchar(2000),
  \`gmt_create\` datetime,
  \`gmt_modified\` datetime,
  primary key (\`xid\`),
  key \`idx_gmt_modified_status\` (\`gmt_modified\`, \`status\`),
  key \`idx_transaction_id\` (\`transaction_id\`)
);

-- the table to store BranchSession data
drop table if exists \`branch_table\`;
create table \`branch_table\` (
  \`branch_id\` bigint not null,
  \`xid\` varchar(128) not null,
  \`transaction_id\` bigint ,
  \`resource_group_id\` varchar(32),
  \`resource_id\` varchar(256) ,
  \`lock_key\` varchar(128) ,
  \`branch_type\` varchar(8) ,
  \`status\` tinyint,
  \`client_id\` varchar(64),
  \`application_data\` varchar(2000),
  \`gmt_create\` datetime,
  \`gmt_modified\` datetime,
  primary key (\`branch_id\`),
  key \`idx_xid\` (\`xid\`)
);

-- the table to store lock data
drop table if exists \`lock_table\`;
create table \`lock_table\` (
  \`row_key\` varchar(128) not null,
  \`xid\` varchar(96),
  \`transaction_id\` long ,
  \`branch_id\` long,
  \`resource_id\` varchar(256) ,
  \`table_name\` varchar(32) ,
  \`pk\` varchar(36) ,
  \`gmt_create\` datetime ,
  \`gmt_modified\` datetime,
  primary key(\`row_key\`)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="seata-\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#seata-\u8BF4\u660E" aria-hidden="true">#</a> Seata \u8BF4\u660E</h2><p>\u5206\u5E03\u5F0F\u4E8B\u52A1\u5904\u7406\u8FC7\u7A0B\u7684\u7B80\u5355\u6765\u8BF4\u5C31\u662F\uFF1A<strong>\u4E00\u4E2A\u5168\u5C40\u7684\u4E8B\u52A1ID\u548C\u4E09\u4E2A\u7EC4\u4EF6</strong></p><p>\u4E00\u4E2A\u5168\u5C40\u7684\u4E8B\u52A1ID \uFF1AXID</p><p><strong>TC (Transaction Coordinator) - \u4E8B\u52A1\u534F\u8C03\u8005</strong></p><p>\u7EF4\u62A4\u5168\u5C40\u548C\u5206\u652F\u4E8B\u52A1\u7684\u72B6\u6001\uFF0C\u9A71\u52A8\u5168\u5C40\u4E8B\u52A1\u63D0\u4EA4\u6216\u56DE\u6EDA\u3002</p><p><strong>TM (Transaction Manager) - \u4E8B\u52A1\u7BA1\u7406\u5668</strong></p><p>\u5B9A\u4E49\u5168\u5C40\u4E8B\u52A1\u7684\u8303\u56F4\uFF1A\u5F00\u59CB\u5168\u5C40\u4E8B\u52A1\u3001\u63D0\u4EA4\u6216\u56DE\u6EDA\u5168\u5C40\u4E8B\u52A1\u3002</p><p><strong>RM (Resource Manager) - \u8D44\u6E90\u7BA1\u7406\u5668</strong></p><p>\u7BA1\u7406\u5206\u652F\u4E8B\u52A1\u5904\u7406\u7684\u8D44\u6E90\uFF0C\u4E0ETC\u4EA4\u8C08\u4EE5\u6CE8\u518C\u5206\u652F\u4E8B\u52A1\u548C\u62A5\u544A\u5206\u652F\u4E8B\u52A1\u7684\u72B6\u6001\uFF0C\u5E76\u9A71\u52A8\u5206\u652F\u4E8B\u52A1\u63D0\u4EA4\u6216\u56DE\u6EDA\u3002</p><h2 id="\u8C03\u7528\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u8C03\u7528\u8FC7\u7A0B" aria-hidden="true">#</a> \u8C03\u7528\u8FC7\u7A0B</h2><blockquote><p><a href="/GlobalTransactional">@GlobalTransactional </a> \u6DFB\u52A0\u5230\u5165\u53E3\u5904<br>\u672C\u5730@Transactional\u5168\u5C40<a href="/GlobalTransactional">@GlobalTransactional </a></p></blockquote><p>TM\u5411TC\u7533\u8BF7\u5F00\u542F\u4E00\u4E2A\u5168\u5C40\u4E8B\u52A1\uFF0C\u5168\u5C40\u4E8B\u52A1\u521B\u5EFA\u6210\u529F\u5E76\u751F\u6210\u4E00\u4E2A\u5168\u5C40\u552F\u4E00\u7684XID;</p><p>XID\u5728\u5FAE\u670D\u52A1\u8C03\u7528\u94FE\u8DEF\u7684\u4E0A\u4E0B\u6587\u4E2D\u4F20\u64AD;</p><p>RM\u5411TC\u6CE8\u518C\u5206\u652F\u4E8B\u52A1\uFF0C\u5C06\u5176\u7EB3\u5165XID\u5BF9\u5E94\u5168\u5C40\u4E8B\u52A1\u7684\u7BA1\u8F96;</p><p>TM\u5411TC\u53D1\u8D77\u9488\u5BF9XID\u7684\u5168\u5C40\u63D0\u4EA4\u6216\u56DE\u6EDA\u51B3\u8BAE;</p><p>TC\u8C03\u5EA6XID\u4E0B\u7BA1\u8F96\u7684\u5168\u90E8\u5206\u652F\u4E8B\u52A1\u5B8C\u6216\u63D0\u4EA4\u6216\u56DE\u6EDA\u8BF7\u6C42\u3002</p><h2 id="\u914D\u7F6E\u6587\u4EF6\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6\u8BF4\u660E" aria-hidden="true">#</a> \u914D\u7F6E\u6587\u4EF6\u8BF4\u660E</h2><p>file.conf \u4E8B\u52A1\u65E5\u5FD7\u4FDD\u5B58\u65B9\u5F0F \xA0\u9ED8\u8BA4\u662F\u6587\u4EF6\u7684\u65B9\u5F0F\u4FDD\u5B58</p><p>registry.conf \u6CE8\u518C\u914D\u7F6E\uFF0C\u8BBE\u7F6E\u6CE8\u518C\u4E2D\u5FC3</p><p>Seata Client \u914D\u7F6E\u6587\u4EF6</p><h2 id="client-\u914D\u7F6E\u6587\u4EF6\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#client-\u914D\u7F6E\u6587\u4EF6\u8BF4\u660E" aria-hidden="true">#</a> Client \u914D\u7F6E\u6587\u4EF6\u8BF4\u660E\uFF1A</h2><h3 id="pom-xml" tabindex="-1"><a class="header-anchor" href="#pom-xml" aria-hidden="true">#</a> pom.xml</h3><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>seata-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.4.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-alibaba-seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.2.1.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>seata-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="application-yml" tabindex="-1"><a class="header-anchor" href="#application-yml" aria-hidden="true">#</a> application.yml</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u662F\u5426\u5F00\u542Fspring-boot\u81EA\u52A8\u88C5\u914D  \u9ED8\u8BA4true</span>
  <span class="token key atrule">enable-auto-data-source-proxy</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#\u662F\u5426\u5F00\u542F\u6570\u636E\u6E90\u81EA\u52A8\u4EE3\u7406 (\u591A\u6570\u636E\u6E90) \u9ED8\u8BA4 true</span>
  <span class="token key atrule">application-id</span><span class="token punctuation">:</span> business<span class="token punctuation">-</span>seata<span class="token punctuation">-</span>example
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> business<span class="token punctuation">-</span>service<span class="token punctuation">-</span>seata<span class="token punctuation">-</span>service<span class="token punctuation">-</span>group <span class="token comment"># \u4E8B\u52A1\u7FA4\u7EC4\uFF08\u53EF\u4EE5\u6BCF\u4E2A\u5E94\u7528\u72EC\u7ACB\u53D6\u540D\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u76F8\u540C\u7684\u540D\u5B57\uFF09</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">rm-report-success-enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">rm-table-meta-check-enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u81EA\u52A8\u5237\u65B0\u7F13\u5B58\u4E2D\u7684\u8868\u7ED3\u6784\uFF08\u9ED8\u8BA4false\uFF09</span>
    <span class="token key atrule">rm-report-retry-count</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment"># \u4E00\u9636\u6BB5\u7ED3\u679C\u4E0A\u62A5TC\u91CD\u8BD5\u6B21\u6570\uFF08\u9ED8\u8BA45\uFF09</span>
    <span class="token key atrule">rm-async-commit-buffer-limit</span><span class="token punctuation">:</span> <span class="token number">10000</span> <span class="token comment"># \u5F02\u6B65\u63D0\u4EA4\u7F13\u5B58\u961F\u5217\u957F\u5EA6\uFF08\u9ED8\u8BA410000\uFF09</span>
    <span class="token key atrule">rm</span><span class="token punctuation">:</span>
      <span class="token key atrule">lock</span><span class="token punctuation">:</span>
        <span class="token key atrule">lock-retry-internal</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># \u6821\u9A8C\u6216\u5360\u7528\u5168\u5C40\u9501\u91CD\u8BD5\u95F4\u9694\uFF08\u9ED8\u8BA410ms\uFF09</span>
        <span class="token key atrule">lock-retry-times</span><span class="token punctuation">:</span>    <span class="token number">30</span> <span class="token comment"># \u6821\u9A8C\u6216\u5360\u7528\u5168\u5C40\u9501\u91CD\u8BD5\u6B21\u6570\uFF08\u9ED8\u8BA430\uFF09</span>
        <span class="token key atrule">lock-retry-policy-branch-rollback-on-conflict</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u5206\u652F\u4E8B\u52A1\u4E0E\u5176\u5B83\u5168\u5C40\u56DE\u6EDA\u4E8B\u52A1\u51B2\u7A81\u65F6\u9501\u7B56\u7565\uFF08\u4F18\u5148\u91CA\u653E\u672C\u5730\u9501\u8BA9\u56DE\u6EDA\u6210\u529F\uFF09</span>
    <span class="token key atrule">tm-commit-retry-count</span><span class="token punctuation">:</span>   <span class="token number">3</span> <span class="token comment"># \u4E00\u9636\u6BB5\u5168\u5C40\u63D0\u4EA4\u7ED3\u679C\u4E0A\u62A5TC\u91CD\u8BD5\u6B21\u6570\uFF08\u9ED8\u8BA41\u6B21\uFF0C\u5EFA\u8BAE\u5927\u4E8E1\uFF09</span>
    <span class="token key atrule">tm-rollback-retry-count</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment"># \u4E00\u9636\u6BB5\u5168\u5C40\u56DE\u6EDA\u7ED3\u679C\u4E0A\u62A5TC\u91CD\u8BD5\u6B21\u6570\uFF08\u9ED8\u8BA41\u6B21\uFF0C\u5EFA\u8BAE\u5927\u4E8E1\uFF09</span>
    <span class="token key atrule">undo</span><span class="token punctuation">:</span>
      <span class="token key atrule">undo-data-validation</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u4E8C\u9636\u6BB5\u56DE\u6EDA\u955C\u50CF\u6821\u9A8C\uFF08\u9ED8\u8BA4true\u5F00\u542F\uFF09</span>
      <span class="token key atrule">undo-log-serialization</span><span class="token punctuation">:</span> jackson <span class="token comment"># undo\u5E8F\u5217\u5316\u65B9\u5F0F\uFF08\u9ED8\u8BA4jackson\uFF09</span>
      <span class="token key atrule">undo-log-table</span><span class="token punctuation">:</span> undo_log  <span class="token comment"># \u81EA\u5B9A\u4E49undo\u8868\u540D\uFF08\u9ED8\u8BA4undo_log\uFF09</span>
    <span class="token key atrule">log</span><span class="token punctuation">:</span>
      <span class="token key atrule">exceptionRate</span><span class="token punctuation">:</span> <span class="token number">100</span> <span class="token comment"># \u65E5\u5FD7\u5F02\u5E38\u8F93\u51FA\u6982\u7387\uFF08\u9ED8\u8BA4100\uFF09</span>
    <span class="token key atrule">support</span><span class="token punctuation">:</span>
      <span class="token key atrule">spring</span><span class="token punctuation">:</span>
        <span class="token key atrule">datasource-autoproxy</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
      <span class="token key atrule">my_test_tx_group</span><span class="token punctuation">:</span> default <span class="token comment"># TC \u96C6\u7FA4\uFF08\u5FC5\u987B\u4E0Eseata-server\u4FDD\u6301\u4E00\u81F4\uFF09</span>
    <span class="token key atrule">enable-degrade</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u964D\u7EA7\u5F00\u5173</span>
    <span class="token key atrule">disable-global-transaction</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u7981\u7528\u5168\u5C40\u4E8B\u52A1\uFF08\u9ED8\u8BA4false\uFF09</span>
    <span class="token key atrule">grouplist</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">8091</span>
  <span class="token key atrule">transport</span><span class="token punctuation">:</span>
    <span class="token key atrule">shutdown</span><span class="token punctuation">:</span>
      <span class="token key atrule">wait</span><span class="token punctuation">:</span> <span class="token number">3</span>
    <span class="token key atrule">thread-factory</span><span class="token punctuation">:</span>
      <span class="token key atrule">boss-thread-prefix</span><span class="token punctuation">:</span> NettyBoss
      <span class="token key atrule">worker-thread-prefix</span><span class="token punctuation">:</span> NettyServerNIOWorker
      <span class="token key atrule">server-executor-thread-prefix</span><span class="token punctuation">:</span> NettyServerBizHandler
      <span class="token key atrule">share-boss-worker</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">client-selector-thread-prefix</span><span class="token punctuation">:</span> NettyClientSelector
      <span class="token key atrule">client-selector-thread-size</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">client-worker-thread-prefix</span><span class="token punctuation">:</span> NettyClientWorkerThread
    <span class="token key atrule">type</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">server</span><span class="token punctuation">:</span> NIO
    <span class="token key atrule">heartbeat</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">serialization</span><span class="token punctuation">:</span> seata
    <span class="token key atrule">compressor</span><span class="token punctuation">:</span> none
    <span class="token key atrule">enable-client-batch-send-request</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u5BA2\u6237\u7AEF\u4E8B\u52A1\u6D88\u606F\u8BF7\u6C42\u662F\u5426\u6279\u91CF\u5408\u5E76\u53D1\u9001\uFF08\u9ED8\u8BA4true\uFF09</span>
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">file</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> file.conf
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
      <span class="token key atrule">cluster</span><span class="token punctuation">:</span> default
  <span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">file</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> file.conf
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Client \u7AEF\u4F7F\u7528\u7684\u914D\u7F6E\u6587\u4EF6</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u662F\u5426\u5F00\u542Fspring-boot\u81EA\u52A8\u88C5\u914D</span>
  <span class="token key atrule">application-id</span><span class="token punctuation">:</span>  xxxx <span class="token comment"># \u5E94\u7528ID</span>
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> XXXX <span class="token comment"># \u4E8B\u52A1\u7FA4\u7EC4\uFF08\u53EF\u4EE5\u6BCF\u4E2A\u5E94\u7528\u72EC\u7ACB\u53D6\u540D\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u76F8\u540C\u7684\u540D\u5B57\uFF09</span>
  <span class="token key atrule">enable-auto-data-source-proxy</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u662F\u5426\u5F00\u542F\u6570\u636E\u6E90\u81EA\u52A8\u4EE3\u7406</span>
  <span class="token key atrule">data-source-proxy-mode</span><span class="token punctuation">:</span> AT <span class="token comment"># \u6570\u636E\u4EE3\u7406\u65B9\u5F0F</span>
  <span class="token key atrule">use-jdk-proxy</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u4F7F\u7528JDK\u8FDB\u884C\u4EE3\u7406</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">rm</span><span class="token punctuation">:</span>
      <span class="token key atrule">report-success-enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u662F\u5426\u4E0A\u62A5\u4E00\u9636\u6BB5\u6210\u529F \u9ED8\u8BA4 false</span>
      <span class="token key atrule">table-meta-check-enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u81EA\u52A8\u5237\u65B0\u7F13\u5B58\u4E2D\u7684\u8868\u7ED3\u6784\uFF08\u9ED8\u8BA4false\uFF09</span>
      <span class="token key atrule">table-meta-checker-interval</span><span class="token punctuation">:</span> <span class="token number">60000</span>
      <span class="token key atrule">report-retry-count</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment"># \u4E00\u9636\u6BB5\u7ED3\u679C\u4E0A\u62A5TC\u91CD\u8BD5\u6B21\u6570\uFF08\u9ED8\u8BA45\uFF09</span>
      <span class="token key atrule">async-commit-buffer-limit</span><span class="token punctuation">:</span> <span class="token number">10000</span> <span class="token comment"># \u5F02\u6B65\u63D0\u4EA4\u7F13\u5B58\u961F\u5217\u957F\u5EA6\uFF08\u9ED8\u8BA410000</span>
      <span class="token comment"># sage -\u72B6\u6001\u5904\u7406</span>
      <span class="token key atrule">saga-branch-register-enable</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">saga-compensate-persist-mode-update</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">saga-json-parser</span><span class="token punctuation">:</span> fastjson
      <span class="token key atrule">saga-retry-persist-mode-update</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">lock</span><span class="token punctuation">:</span>
        <span class="token key atrule">retry-interval</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># \u6821\u9A8C\u6216\u5360\u7528\u5168\u5C40\u9501\u91CD\u8BD5\u95F4\u9694\uFF08\u9ED8\u8BA410ms\uFF09</span>
        <span class="token key atrule">retry-times</span><span class="token punctuation">:</span> <span class="token number">30</span>  <span class="token comment"># \u6821\u9A8C\u6216\u5360\u7528\u5168\u5C40\u9501\u91CD\u8BD5\u6B21\u6570\uFF08\u9ED8\u8BA430\uFF09</span>
        <span class="token key atrule">retry-policy-branch-rollback-on-conflict</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u5206\u652F\u4E8B\u52A1\u4E0E\u5176\u5B83\u5168\u5C40\u56DE\u6EDA\u4E8B\u52A1\u51B2\u7A81\u65F6\u9501\u7B56\u7565\uFF08\u4F18\u5148\u91CA\u653E\u672C\u5730\u9501\u8BA9\u56DE\u6EDA\u6210\u529F\uFF09</span>
    <span class="token key atrule">tm</span><span class="token punctuation">:</span>
      <span class="token key atrule">commit-retry-count</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment"># \u4E00\u9636\u6BB5\u5168\u5C40\u63D0\u4EA4\u7ED3\u679C\u4E0A\u62A5TC\u91CD\u8BD5\u6B21\u6570</span>
      <span class="token key atrule">rollback-retry-count</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment"># \u4E00\u9636\u6BB5\u5168\u5C40\u56DE\u6EDA\u7ED3\u679C\u4E0A\u62A5TC\u91CD\u8BD5\u6B21\u6570</span>
      <span class="token key atrule">default-global-transaction-timeout</span><span class="token punctuation">:</span> <span class="token number">60000</span> <span class="token comment"># \u9ED8\u8BA4\u4E8B\u52A1\u7BA1\u7406\u8D85\u65F6\u95F4</span>
      <span class="token key atrule">degrade-check</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u964D\u7EA7\u5F00\u5173</span>
      <span class="token key atrule">degrade-check-allow-times</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># \u5347\u964D\u7EA7\u8FBE\u6807\u9608\u503C</span>
      <span class="token key atrule">degrade-check-period</span><span class="token punctuation">:</span> <span class="token number">2000</span> <span class="token comment"># \u670D\u52A1\u81EA\u68C0\u5468\u671F \u5355\u4F4Dms</span>
    <span class="token key atrule">undo</span><span class="token punctuation">:</span>
      <span class="token key atrule">compress</span><span class="token punctuation">:</span>
        <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> zip
        <span class="token key atrule">threshold</span><span class="token punctuation">:</span> 64k
      <span class="token key atrule">data-validation</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u4E8C\u9636\u6BB5\u56DE\u6EDA\u955C\u50CF\u6821\u9A8C\uFF08\u9ED8\u8BA4true\u5F00\u542F\uFF09</span>
      <span class="token key atrule">log-serialization</span><span class="token punctuation">:</span> jackson <span class="token comment"># undo\u5E8F\u5217\u5316\u65B9\u5F0F\uFF08\u9ED8\u8BA4jackson\uFF09</span>
      <span class="token key atrule">log-table</span><span class="token punctuation">:</span> undo_log  <span class="token comment"># \u81EA\u5B9A\u4E49undo\u8868\u540D\uFF08\u9ED8\u8BA4undo_log\uFF09</span>
      <span class="token key atrule">only-care-update-columns</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">load-balance</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> RandomLoadBalance
      <span class="token key atrule">virtual-nodes</span><span class="token punctuation">:</span> <span class="token number">10</span> 
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">disable-global-transaction</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u7981\u7528\u5168\u5C40\u4E8B\u52A1\uFF08\u9ED8\u8BA4false\uFF09</span>
    <span class="token key atrule">enable-degrade</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># \u964D\u7EA7\u5F00\u5173</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
    <span class="token key atrule">grouplist</span><span class="token punctuation">:</span>
  <span class="token key atrule">transport</span><span class="token punctuation">:</span> 
    <span class="token key atrule">compressor</span><span class="token punctuation">:</span> none <span class="token comment"># client\u548Cserver\u901A\u4FE1\u6570\u636E\u538B\u7F29\u65B9\u5F0F none\u3001gzip\uFF0C\u9ED8\u8BA4none</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> tcp
    <span class="token key atrule">heartbeat</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># client\u548Cserver\u901A\u4FE1\u5FC3\u8DF3\u68C0\u6D4B\u5F00\u5173 </span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> NIO
    <span class="token key atrule">serialization</span><span class="token punctuation">:</span> seata <span class="token comment">#client\u548Cserver\u901A\u4FE1\u7F16\u89E3\u7801\u65B9\u5F0F \u9ED8\u8BA4 seata - seata(ByteBuf)\u3001protobuf\u3001kryo\u3001hession\u3001fst</span>
    <span class="token key atrule">enable-client-batch-send-request</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u5BA2\u6237\u7AEF\u4E8B\u52A1\u6D88\u606F\u8BF7\u6C42\u662F\u5426\u6279\u91CF\u5408\u5E76\u53D1\u9001\uFF08\u9ED8\u8BA4true\uFF09</span>
    <span class="token key atrule">shutdown</span><span class="token punctuation">:</span>
      <span class="token key atrule">wait</span><span class="token punctuation">:</span> <span class="token number">3</span>
    <span class="token key atrule">thread-factory</span><span class="token punctuation">:</span>
      <span class="token key atrule">boss-thread-prefix</span><span class="token punctuation">:</span> NettyBoss
      <span class="token key atrule">worker-thread-prefix</span><span class="token punctuation">:</span> NettyServerNIOWorker
      <span class="token key atrule">server-executor-thread-prefix</span><span class="token punctuation">:</span> NettyServerBizHandler
      <span class="token key atrule">share-boss-worker</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">client-selector-thread-prefix</span><span class="token punctuation">:</span> NettyClientSelector
      <span class="token key atrule">client-selector-thread-size</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">client-worker-thread-prefix</span><span class="token punctuation">:</span> NettyClientWorkerThread
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">file</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> file.conf
    <span class="token key atrule">type</span><span class="token punctuation">:</span> nacos
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">application</span><span class="token punctuation">:</span> seata<span class="token punctuation">-</span>server
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
      <span class="token key atrule">group</span><span class="token punctuation">:</span> SEATA_GROUP
      <span class="token key atrule">cluster</span><span class="token punctuation">:</span> default
      <span class="token key atrule">username</span><span class="token punctuation">:</span> xxx
      <span class="token key atrule">password</span><span class="token punctuation">:</span> xxx
  <span class="token key atrule">config</span><span class="token punctuation">:</span>
    <span class="token key atrule">file</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> file.conf
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">namespace</span><span class="token punctuation">:</span>
      <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),p=[l];function c(i,o){return s(),a("div",null,p)}var r=n(t,[["render",c],["__file","Seata\u5206\u5E03\u5F0F\u4E8B\u52A1.html.vue"]]);export{r as default};
