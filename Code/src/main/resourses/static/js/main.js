'use strict';

!function(point){
	angular.module("pw.canvas-painter",[]),
	function(point){
		try{
			point=angular.module("pw.canvas-painter")
		}catch(t){
			point=angular.module("pw.canvas-painter",[])
		}
		point.run(["$templateCache",function(point){
			point.put("../templates/canvas.html",'<div class="pwCanvasPaint" style="position:relative"></div>')
		}])
	}(),
	function(point){
		try{
			point=angular.module("pw.canvas-painter")
		}catch(t){
			point=angular.module("pw.canvas-painter",[])
		}
		point.run(["$templateCache",function(point){
			point.put("../templates/color-selector.html",'<ul class="pwColorSelector"><li ng-repeat="color in colorList track by $index" class="pwColor" ng-class="{\'active\': (selectedColor === color)}" ng-style="{\'background-color\':color}" ng-click="setColor(color)"></li></ul>')
		}])
	}(),
	angular.module('pw.canvas-painter')
	  .directive('pwCanvas', function() {
	    return {
	      restrict: 'AE',
	      scope: {
	        options: '=',
	        version: '='
	      },
	      templateUrl: '../templates/canvas.html',
	      link: function postLink(scope, elm) {
	        var isTouch = !!('ontouchstart' in window);

	        var PAINT_START = isTouch ? 'touchstart' : 'mousedown';
	        var PAINT_MOVE = isTouch ? 'touchmove' : 'mousemove';
	        var PAINT_END = isTouch ? 'touchend' : 'mouseup';

	        //set default options
	        var options = scope.options;
	        options.canvasId = options.customCanvasId || 'pwCanvasMain';
	        options.tmpCanvasId = options.customCanvasId ? (options.canvasId + 'Tmp') : 'pwCanvasTmp';
	        options.width = options.width || 700;
	        options.height = options.height || 600;
	        options.backgroundColor = options.backgroundColor || '#fff';
	        options.color = options.color || '#000';
	        options.undoEnabled = options.undoEnabled || false;
	        options.opacity = options.opacity || 1;
	        options.lineWidth = options.lineWidth || 1;
	        options.undo = options.undo || false;
	        options.imageSrc = options.imageSrc || false;

	        // background image
	        if (options.imageSrc) {
	          var image = new Image();
	          image.onload = function() {
	            ctx.drawImage(this, 0, 0);
	          };
	          image.src = options.imageSrc;
	        }

	        //undo
	        if (options.undo) {
	          var undoCache = [];
	          scope.$watch(function() {
	            return undoCache.length;
	          }, function(newVal) {
	            scope.version = newVal;
	          });

	          scope.$watch('version', function(newVal) {
	            if (newVal < 0) {
	              scope.version = 0;
	              return;
	            }
	            if (newVal >= undoCache.length) {
	              scope.version = undoCache.length;
	              return;
	            }
	            undo(newVal);
	          });
	        }

	        //create canvas and context
	        var canvas = document.createElement('canvas');
	        canvas.id = options.canvasId;
	        var canvasTmp = document.createElement('canvas');
	        canvasTmp.id = options.tmpCanvasId;
	        angular.element(canvasTmp).css({
	          position: 'absolute',
	          top: 0,
	          left: 0
	        });
	        elm.find('div').append(canvas);
	        elm.find('div').append(canvasTmp);
	        var ctx = canvas.getContext('2d');
	        var ctxTmp = canvasTmp.getContext('2d');

	        //inti variables
	        var point = {
	          x: 0,
	          y: 0
	        };
	        var ppts = [];

	        //set canvas size
	        canvas.width = canvasTmp.width = options.width;
	        canvas.height = canvasTmp.height = options.height;

	        //set context style
	        ctx.fillStyle = options.backgroundColor;
	        ctx.fillRect(0, 0, canvas.width, canvas.height);
	        ctxTmp.globalAlpha = options.opacity;
	        ctxTmp.lineJoin = ctxTmp.lineCap = 'round';
	        ctxTmp.lineWidth = 3;
	        ctxTmp.strokeStyle = options.color;


	        //Watch options
	        scope.$watch('options.lineWidth', function(newValue) {
	          if (typeof newValue === 'string') {
	            newValue = parseInt(newValue, 10);
	          }
	          if (newValue && typeof newValue === 'number') {
	            ctxTmp.lineWidth = options.lineWidth = newValue;
	          }
	        });

	        scope.$watch('options.color', function(newValue) {
	          if (newValue) {
	            //ctx.fillStyle = newValue;
	            ctxTmp.strokeStyle = ctxTmp.fillStyle = newValue;
	          }
	        });

	        scope.$watch('options.opacity', function(newValue) {
	          if (newValue) {
	            ctxTmp.globalAlpha = newValue;
	          }
	        });

	        var getOffset = function(elem) {
	          var bbox = elem.getBoundingClientRect();
	          return {
	            left: bbox.left,
	            top: bbox.top
	          };
	        };

	        var setPointFromEvent = function(point, e) {
	          if (isTouch) {
	            point.x = e.changedTouches[0].pageX - getOffset(e.target).left;
	            point.y = e.changedTouches[0].pageY - getOffset(e.target).top;
	          } else {
	            point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
	            point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
	          }
	        };


	        var paint = function(e) {
	          if (e) {
	            e.preventDefault();
	            setPointFromEvent(point, e);
	          }

	          // Saving all the points in an array
	          ppts.push({
	            x: point.x,
	            y: point.y
	          });
	        	          
//	            var chatMessage = {
//	                    sender: username,
//	                    xCoordinate: point.x,
//	                    yCoordinate: point.y,
//	                    type: 'PAINT'
//                };
//                stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));

	          if (ppts.length === 3) {
	            var b = ppts[0];
	            ctxTmp.beginPath();
	            ctxTmp.arc(b.x, b.y, ctxTmp.lineWidth / 2, 0, Math.PI * 2, !0);
	            ctxTmp.fill();
	            ctxTmp.closePath();
	            return;
	          }

	          // Tmp canvas is always cleared up before drawing.
	          ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);
	          
	          ctxTmp.beginPath();
	          ctxTmp.moveTo(ppts[0].x, ppts[0].y);

	          for (var i = 1; i < ppts.length - 2; i++) {
	            var c = (ppts[i].x + ppts[i + 1].x) / 2;
	            var d = (ppts[i].y + ppts[i + 1].y) / 2;
	            ctxTmp.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
	          }

	          // For the last 2 points
	          ctxTmp.quadraticCurveTo(
	            ppts[i].x,
	            ppts[i].y,
	            ppts[i + 1].x,
	            ppts[i + 1].y
	          );
	          ctxTmp.stroke();
	        };
	        
	        var paintrequest = function(xPoint, yPoint, e) {
	        	
	        	ppts.push({
		            x: xPoint,
		            y: yPoint
		          });
	
		          if (ppts.length === 3) {
		            var b = ppts[0];
		            ctxTmp.beginPath();
		            ctxTmp.arc(b.x, b.y, ctxTmp.lineWidth / 2, 0, Math.PI * 2, !0);
		            ctxTmp.fill();
		            ctxTmp.closePath();
		            return;
		          }
	
		          // Tmp canvas is always cleared up before drawing.
		          ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);
	
		          ctxTmp.beginPath();
		          ctxTmp.moveTo(ppts[0].x, ppts[0].y);
	
		          for (var i = 1; i < ppts.length - 2; i++) {
		            var c = (ppts[i].x + ppts[i + 1].x) / 2;
		            var d = (ppts[i].y + ppts[i + 1].y) / 2;
		            ctxTmp.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		          }
	
		          // For the last 2 points
		          ctxTmp.quadraticCurveTo(
		            ppts[i].x,
		            ppts[i].y,
		            ppts[i + 1].x,
		            ppts[i + 1].y
		          );
		          ctxTmp.stroke();
	        }

	        var copyTmpImage = function() {
	          if (options.undo) {
	            scope.$apply(function() {
	              undoCache.push(ctx.getImageData(0, 0, canvasTmp.width, canvasTmp.height));
	              if (angular.isNumber(options.undo) && options.undo > 0) {
	                undoCache = undoCache.slice(-1 * options.undo);
	              }
	            });
	          }
	          canvasTmp.removeEventListener(PAINT_MOVE, paint, false);
	          ctx.drawImage(canvasTmp, 0, 0);
	            var chatMessage = {
	                    content: canvas.toDataURL(),
	                    type: 'PAINT'
                };
                stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
	          ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);
	          ppts = [];

	        };

	        var startTmpImage = function(e) {
	          e.preventDefault();
	          canvasTmp.addEventListener(PAINT_MOVE, paint, false);

	          setPointFromEvent(point, e);
	          ppts.push({
	            x: point.x,
	            y: point.y
	          });
                
	          ppts.push({
	            x: point.x,
	            y: point.y
	          });

	          paint();
	        };
	        

	        var initListeners = function() {
	          canvasTmp.addEventListener(PAINT_START, startTmpImage, false);
	          canvasTmp.addEventListener(PAINT_END, copyTmpImage, false);

	          if (!isTouch) {
	            var MOUSE_DOWN;

	            document.body.addEventListener('mousedown', mousedown);
	            document.body.addEventListener('mouseup', mouseup);

	            scope.$on('$destroy', removeEventListeners);

	            canvasTmp.addEventListener('mouseenter', mouseenter);
	            canvasTmp.addEventListener('mouseleave', mouseleave);
	          }

	          function mousedown() {
	            MOUSE_DOWN = true;
	          }

	          function mouseup() {
	            MOUSE_DOWN = false;
	          }

	          function removeEventListeners() {
	            document.body.removeEventListener('mousedown', mousedown);
	            document.body.removeEventListener('mouseup', mouseup);
	          }

	          function mouseenter(e) {
	            // If the mouse is down when it enters the canvas, start a path
	            if (MOUSE_DOWN) {
	              startTmpImage(e);
	            }
	          }

	          function mouseleave(e) {
	            // If the mouse is down when it leaves the canvas, end the path
	            if (MOUSE_DOWN) {
	              copyTmpImage(e);
	            }
	          }
	        };

	        var undo = function(version) {
	          if (undoCache.length > 0) {
	            ctx.putImageData(undoCache[version], 0, 0);
	            undoCache = undoCache.slice(0, version);
	          }
	        };
	        
	        
			  var usernamePage = document.querySelector('#username-page');
			  var chatPage = document.querySelector('#chat-page');
			  var usernameForm = document.querySelector('#usernameForm');
			  var messageForm = document.querySelector('#messageForm');
			  var messageInput = document.querySelector('#message');
			  var messageArea = document.querySelector('#messageArea');
			  var connectingElement = document.querySelector('.connecting');

			  var stompClient = null;
			  var username = null;

			  var colors = [
			      '#2196F3', '#32c787', '#00BCD4', '#ff5652',
			      '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
			  ];

			  function connect(event) {
			      //username = document.querySelector('#name').value.trim();
			      //if(username) {
			          //usernamePage.classList.add('hidden');
			          //chatPage.classList.remove('hidden');

//			          var socket = new SockJS('/ws');
//			          stompClient = Stomp.over(socket);
//
//			          stompClient.connect({}, onConnected, onError);
			      //}
			      event.preventDefault();
			  }


			  function onConnected() {
			      stompClient.subscribe('/topic/public', onMessageReceived);
			      stompClient.send("/app/chat.addUser",
			          {},
			          JSON.stringify({type: 'JOIN'})
			      )
			      //connectingElement.classList.add('hidden');
			  }


			  function onError(error) {
			      connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
			      connectingElement.style.color = 'red';
			  }


			  function sendMessage(event) {
			      var messageContent = messageInput.value.trim();
			      if(messageContent && stompClient) {
			          var chatMessage = {
			              content: messageInput.value,
			              type: 'PAINT'
			          };
			          stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
			          messageInput.value = '';
			      }
			      event.preventDefault();
			  }


			  function onMessageReceived(payload) {
			      var message = JSON.parse(payload.body);
//			      var messageElement = document.createElement('li');

			      if(message.type === 'JOIN') {
			    	  if(message.content != '') {
				    	  var img = new Image;
				    	  img.onload = function(){
				    	    ctx.drawImage(img,0,0); // Or at whatever offset you like
				    	  };
				    	  img.src = message.content;
			    	  }
			          messageElement.classList.add('event-message');
			          //message.content = message.sender + ' joined!';
			      } else if (message.type === 'LEAVE') {
			          messageElement.classList.add('event-message');
			          //message.content = message.sender + ' left!';
			      } else {
			    	  var img = new Image;
			    	  img.onload = function(){
			    	    ctx.drawImage(img,0,0); // Or at whatever offset you like
			    	  };
			    	  img.src = message.content;
			    	  //ctx.drawImage(message.content, 0, 0);
			    	  //paintrequest(message.xCoordinate, message.yCoordinate);
//			          messageElement.classList.add('chat-message');
//
//			          var avatarElement = document.createElement('i');
//			          var avatarText = document.createTextNode(message.sender[0]);
//			          avatarElement.appendChild(avatarText);
//			          avatarElement.style['background-color'] = getAvatarColor(message.sender);
//
//			          messageElement.appendChild(avatarElement);
//
//			          var usernameElement = document.createElement('span');
//			          var usernameText = document.createTextNode(message.sender);
//			          usernameElement.appendChild(usernameText);
//			          messageElement.appendChild(usernameElement);
			      }
//
//			      var textElement = document.createElement('p');
//			      var messageText = document.createTextNode(message.content);
//			      textElement.appendChild(messageText);
//
//			      messageElement.appendChild(textElement);
//
//			      messageArea.appendChild(messageElement);
//			      messageArea.scrollTop = messageArea.scrollHeight;
			  }


			  function getAvatarColor(messageSender) {
			      var hash = 0;
			      for (var i = 0; i < messageSender.length; i++) {
			          hash = 31 * hash + messageSender.charCodeAt(i);
			      }
			      var index = Math.abs(hash % colors.length);
			      return colors[index];
			  }

			  //usernameForm.addEventListener('submit', connect, true)
			  //messageForm.addEventListener('submit', sendMessage, true)
	          var socket = new SockJS('/ws');
	          stompClient = Stomp.over(socket);

	          stompClient.connect({}, onConnected, onError);
	        
	        initListeners();
	      }
	    };
	  }),
	angular.module("pw.canvas-painter").directive("pwColorSelector",
		function(){
			return{
				restrict:"AE",
				scope:{colorList:"=pwColorSelector",selectedColor:"=color"},
				templateUrl:"../templates/color-selector.html",
				link:function(point){
					point.setColor=function(t){
						point.selectedColor=t
					}
				}
			}
		})
}(this);