<#include "security.ftl">
<#import "login.ftl" as log>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <a href="/" class="navbar-brand">
        <img src="https://getbootstrap.com/docs/4.1/assets/img/favicons/favicon-32x32.png" alt="logo">
      </a>
      <button class="navbar-toggler" type="button" data-toggl="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a href="/" class="nav-link">Главная</a>
          </li>
          <#if isActive>
          <li class="nav-item">
            <a href="/main" class="nav-link">Пользователи</a>
          </li>
          <li class="nav-item">
            <a href="/rooms" class="nav-link">Комнаты</a>
          </li>
          </#if>
          <#if !isActive>
          <li class="nav-item">
            <a href="/login" class="nav-link">Войти</a>
          </li>
          <li class="nav-item">
            <a href="/registration" class="nav-link">Регистрация</a>
          </li> 
          </#if>         
        </ul>
        
        <div class="navbar-text mr-3">${name}</div>
		<@log.logout />
      </div>
    </nav>