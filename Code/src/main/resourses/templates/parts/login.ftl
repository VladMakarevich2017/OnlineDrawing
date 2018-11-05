<#macro login path isRegisterForm>
<div class="container py-2">
    <div class="row">
        <div class="col-md-9">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="card border-secondary">
                        <div class="card-header">
                            <h3 class="mb-0 my-2"><#if isRegisterForm>Добавить пользователя<#else>Войти</#if></h3>
                        </div>
                        <div class="card-body">
                            <form class="mt-2" action="${path}" method="post">
                                <#if isRegisterForm>
                                <div class="form-group">
                                    <label for="inputLogin">Login</label>
                                    <input type="text" name="login" d="inputLogin" class="form-control" placeholder="Логин" required=""/>
                                </div>
                                </#if>
                                <div class="form-group">
                                    <label for="inputName">Name</label>
                                    <input type="text" name="username" d="inputName" class="form-control" placeholder="Имя" required=""/>
                                </div>
                                <#if isRegisterForm>
                                <div class="form-group">
                                    <label for="inputEmail3">Email</label>
                                    <input type="email" name="email" class="form-control" id="inputEmail3" placeholder="Email" required=""/>
                                </div>
                                </#if>
                                <div class="form-group">
                                    <label for="inputPassword3">Password</label>
                                    <input type="password" id="inputPassword3" name="password" class="form-control" placeholder="Пароль" title="At least 6 characters with letters and numbers" required=""/>
                                </div>
                                <input type="hidden" name="_csrf" value="${_csrf.token}" />
                                <div class="form-group">   
                                    <button сlass="btn btn-success btn-lg float-right" name="btn" type="submit"><#if isRegisterForm>Создать<#else>Войти</#if></button>
    								<#if !isRegisterForm><a class="ml-1" href="/registration">Зарегистрироваться</a></#if>                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!--/row-->

        </div>
        <!--/col-->
    </div>
    <!--/row-->
</div>
</#macro>

<#macro logout>
		<form action="/logout" method="post">
			<button type="submit" class="btn btn-light">Выйти</button>
            <input type="hidden" name="_csrf" value="${_csrf.token}" />
        </form>
</#macro>