<!doctype html>
<html class="no-js" ng-app="pw.canvas-painter">
  <head>
    <meta charset="utf-8">
    <title>MyProject</title>
    <meta name="viewport" content="width=device-width, height=device-height">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="/css/paint.css" />
    <link rel="stylesheet" href="/css/style.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
  </head>
  <body>
  	  <#include "parts/navbar.ftl">
    <div class="container" ng-controller="MainController as ctrl">
      <div class="d-inline-block" id="room-name">
  		  <h2>${room.name}</h2>
      </div>
      <div class="d-inline-block">
	      <form id="rename-form" method="post" action="index">
	     	 <input type="hidden" name="_csrf" value="${_csrf.token}" />
	     	 <input class="hidden" id="room-name-field" type="text" name="room-name-field" value="${room.name}">
	     	 <input type="hidden" name="room-name" value="${room.name}">
	      	 <div class="control-panel mb-2">
	        	<button type="button" id="rename" name="rename" class="btn btn-default btn-sm">
		          <span class="credits credits-rename"></span>
		        </button>
	      	 </div>
	      </form>
      </div>
      <div pw-canvas
           version="ctrl.version"
           options="{undo: true, width: 700, height: 600, color: selectedColor, lineWidth: selectedLineWidth}"></div>
      <div class="mt-2" pw-color-selector="['#000', '#9CB199', '#CF3759', '#485247', '#fff']" color="selectedColor"></div>
      <input type="range" min="1" max="4" style="width: 700px;" ng-model="selectedLineWidth" class="lineWidthSelector">{{selectedLineWidth}}
    </div>
	
	<script src="/js/main.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
    <script type="text/javascript">
      angular.module('pw.canvas-painter').controller('MainController', function($scope){
        this.undo = function(){
          this.version--;
        };
      });
    </script>
    <script>
	    $(document).ready(function() {
		 $('#rename').click(function() {
		 if($('#room-name-field').css('display') == 'none'){ 
			   $("#room-name-field").css("display", "inline-block"); 
			   $(".control-panel").css("display", "inline-block"); 
			   $("#room-name h2").css("display", "none");
		  } else { 
		  		$("#rename-form").submit();
		  }
		 });
		});
	</script>
  </body>
</html>