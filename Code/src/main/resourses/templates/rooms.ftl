<#import "parts/common.ftl" as c>
<#import "parts/login.ftl" as log>

<@c.page>
	  <form method="post">
	  	<input type="hidden" name="_csrf" value="${_csrf.token}" />
	  	<div class="control-panel pl-2 pt-2">
  	      <div class="btn-toolbar mb-1 mx-auto" role="toolbar" aria-label="Toolbar with buttons">
	        <button type="submit" name="add" class="btn btn-default btn-lg">
	          <span class="credits credits-add"></span>
	        </button>
	        <button type="submit" name="trash" class="btn btn-default btn-lg ml-3" disabled>
	          <span class="credits credits-trash"></span>
	        </button>
	       </div>
        </div>
      
      <div class="rooms w-25 ml-2">
        <table class="table table-hover table-bordered">
          <thead>
            <tr class="text-center">
    		  <th scope="col" style="width: auto">
                <div class="form-check form-check-inline">
                  <input class="form-check-input ml-3" type="checkbox" id="select_all">
                </div>
              </th>
              <th scope="col" style="width: 70%;">Имя</th>
              <th scope="col" style="width: 20%;"></th>
            </tr>
          </thead>
          <tbody>
              <#list rooms as room>
                  <tr>
		              <th class="text-center" scope="row">
 		                <div class="form-check form-check-inline">
		                  <input class="form-check-input ml-3" type="checkbox" name="inlineCheckbox" id="inlineCheckbox${room.id}" value="${room.id}">
		                </div>
		              </th>
		              <td>${room.name?ifExists}</td>
		              <td>
	                      <button type="submit" name="connect" class="btn btn-default btn-sm" value="${room.id}">
					        <span class="credits credits-connect"></span>
					      </button>
					  </td>
		            </tr>
			  </#list>
          </tbody>
        </table>
      </div>
      </form>
    </div>
    
    <script>
		$('#select_all').change(function() {
		    var checkboxes = $(this).closest('form').find(':checkbox');
		    checkboxes.prop('checked', $(this).is(':checked'));
		});
		$(".rooms input[type='checkbox']").change(function() {
			var send = true;
			$('input[name=inlineCheckbox]').each(function(){
			    if($(this).prop('checked')){
			       send = false;
			    }
			});
			if(!send) {
			 	$(".control-panel button[name=trash]").removeAttr("disabled");  
			} 
			else {
				$('.control-panel button[name=trash]').attr('disabled','disabled');
			}
		});
	</script>
</@c.page>

