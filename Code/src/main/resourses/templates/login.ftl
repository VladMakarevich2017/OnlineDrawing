<#import "parts/common.ftl" as c>
<#import "parts/login.ftl" as log>

<@c.page>
${user?ifExists}
<@log.login "/login" false/>
</@c.page>
