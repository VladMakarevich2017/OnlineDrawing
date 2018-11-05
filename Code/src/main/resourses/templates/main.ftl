<#import "parts/common.ftl" as c>
<#import "parts/login.ftl" as log>

<@c.page>
	<form method="post">
	<input type="hidden" name="_csrf" value="${_csrf.token}" />
    <div class="control-panel pl-2 pt-2">
      <div class="btn-toolbar mb-1 mx-auto" role="toolbar" aria-label="Toolbar with buttons">
        <button type="submit" name="lock" class="btn btn-default btn-lg" disabled>
          <span class="credits credits-lock"></span>
        </button>
        <button type="submit" name="unlock" class="btn btn-default btn-lg ml-1" disabled>
          <span class="credits credits-unlock"></span>
        </button>
        <button type="submit" name="trash" class="btn btn-default btn-lg ml-3" disabled>
          <span class="credits credits-trash"></span>
        </button>
      </div>
      </form>

      <div class="users">
        <table class="table table-hover table-dark table-bordered w-50">
          <thead>
            <tr class="text-center">
              <th scope="col" style="width: auto">
                <div class="form-check form-check-inline">
                  <input class="form-check-input ml-3" type="checkbox" id="select_all">
                </div>
              </th>
              <th scope="col" style="width: 40%">Имя</th>
              <th scope="col" style="width: 40%">Логин</th>
              <th scope="col" style="width: 10%">Статус</th>
            </tr>
          </thead>
          <tbody>
              <#list users as user>
                  <tr>
		              <th class="text-center" scope="row">
		                <div class="form-check form-check-inline">
		                  <input class="form-check-input ml-3" type="checkbox" name="inlineCheckbox" id="inlineCheckbox${user.id}" value="${user.id}">
		                </div>
		              </th>
		              <td>${user.username}</td>
		              <td>${user.login?ifExists}</td>
		              <td><#if user.isLockStatus()><span class="block ml-2"></span><#else><span class="active ml-2"></span></#if></td>
		            </tr>
				</#list>
          </tbody>
        </table>
      </div>
    </div>
    </form>

    <script>
		$('#select_all').change(function() {
		    var checkboxes = $(this).closest('form').find(':checkbox');
		    checkboxes.prop('checked', $(this).is(':checked'));
		});
		$(".users input[type='checkbox']").change(function() {
			var send = true;
			$('input[name=inlineCheckbox]').each(function(){
			    if($(this).prop('checked')){
			       send = false;
			    }
			});
			if(!send) {
			 	$(".control-panel button[type=submit]").removeAttr("disabled");  
			} 
			else {
				$('.control-panel button[type=submit]').attr('disabled','disabled');
			}
		});
	</script>
</@c.page>

