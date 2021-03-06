"use strict";

!function(e){
	angular.module("pw.canvas-painter",[]),
	function(e){
		try{
			e=angular.module("pw.canvas-painter")
		}catch(t){
			e=angular.module("pw.canvas-painter",[])
		}
		e.run(["$templateCache",function(e){
			e.put("../templates/canvas.html",'<div class="pwCanvasPaint" style="position:relative"></div>')
		}])
	}(),
	function(e){
		try{
			e=angular.module("pw.canvas-painter")
		}catch(t){
			e=angular.module("pw.canvas-painter",[])
		}
		e.run(["$templateCache",function(e){
			e.put("../templates/color-selector.html",'<ul class="pwColorSelector"><li ng-repeat="color in colorList track by $index" class="pwColor" ng-class="{\'active\': (selectedColor === color)}" ng-style="{\'background-color\':color}" ng-click="setColor(color)"></li></ul>')
		}])
	}(),
	angular.module("pw.canvas-painter").directive("pwCanvas",function(){
		return{
			restrict:"AE",scope:{
				options:"=",version:"="
			},templateUrl:"../templates/canvas.html",
			link:function(t,n){
				var o=!!("ontouchstart"in e),
				a=o?"touchstart":"mousedown",
				i=o?"touchmove":"mousemove",
				r=o?"touchend":"mouseup",
				c=t.options;if(c.canvasId=c.customCanvasId||"pwCanvasMain",
					c.tmpCanvasId=c.customCanvasId?c.canvasId+"Tmp":"pwCanvasTmp",
					c.width=c.width||400,c.height=c.height||300,
					c.backgroundColor=c.backgroundColor||"#fff",
					c.color=c.color||"#000",
					c.undoEnabled=c.undoEnabled||!1,
					c.opacity=c.opacity||.9,
					c.lineWidth=c.lineWidth||1,
					c.undo=c.undo||!1,
					c.imageSrc=c.imageSrc||!1,
					c.imageSrc){
					var l=new Image;
					l.onload=function(){
						p.drawImage(this,0,0)
					},
					l.src=c.imageSrc
				}if(c.undo){
					var u=[];t.$watch(function(){
						return u.length
					},
					function(e){
						t.version=e
					}),
					t.$watch("version",function(e){
						return 0>e?(t.version=0,void 0):e>=u.length?(t.version=u.length,void 0):(b(e),
							void 0)})}var s=document.createElement("canvas");
					s.id=c.canvasId;
					var d=document.createElement("canvas");
					d.id=c.tmpCanvasId,
					angular.element(d).css({
						position:"absolute",top:0,left:0
					}),
					n.find("div").append(s),
					n.find("div").append(d);
					var p=s.getContext("2d"),
					v=d.getContext("2d"),
					h={x:0,y:0},f=[];
					s.width=d.width=c.width,s.height=d.height=c.height,
					p.fillStyle=c.backgroundColor,
					p.fillRect(0,0,s.width,s.height),
					v.globalAlpha=c.opacity,
					v.lineJoin=v.lineCap="round",
					v.lineWidth=10,
					v.strokeStyle=c.color,
					t.$watch("options.lineWidth",function(e){
						"string"==typeof e&&(e=parseInt(e,10)),
						e&&"number"==typeof e&&(v.lineWidth=c.lineWidth=e)
					}),
					t.$watch("options.color",function(e){
						e&&(v.strokeStyle=v.fillStyle=e)
					}),
					t.$watch("options.opacity",function(e){
						e&&(v.globalAlpha=e)
					});
					var m=function(e){
						var t=e.getBoundingClientRect();
						return{left:t.left,top:t.top}
					},
					g=function(e,t){
						o?(e.x=t.changedTouches[0].pageX-m(t.target).left,e.y=t.changedTouches[0].pageY-m(t.target).top):(e.x=void 0!==t.offsetX?t.offsetX:t.layerX,
							e.y=void 0!==t.offsetY?t.offsetY:t.layerY)
					},
					y=function(e){
						if(e&&(e.preventDefault(),g(h,e)),f.push({x:h.x,y:h.y}),3===f.length){
							var t=f[0];
							return v.beginPath(),v.arc(t.x,t.y,v.lineWidth/2,0,2*Math.PI,!0),
							v.fill(),
							v.closePath(),
							void 0
						}v.clearRect(0,0,d.width,d.height),
						v.beginPath(),
						v.moveTo(f[0].x,f[0].y);
						for(var n=1;n<f.length-2;n++){
							var o=(f[n].x+f[n+1].x)/2,
							a=(f[n].y+f[n+1].y)/2;
							v.quadraticCurveTo(f[n].x,f[n].y,o,a)
						}
						v.quadraticCurveTo(f[n].x,f[n].y,f[n+1].x,f[n+1].y),
						v.stroke()
					},
					w=function(){
						c.undo&&t.$apply(function(){
							u.push(p.getImageData(0,0,d.width,d.height)),
							angular.isNumber(c.undo)&&c.undo>0&&(u=u.slice(-1*c.undo))
						}),
						d.removeEventListener(i,y,!1),
						p.drawImage(d,0,0),
						v.clearRect(0,0,d.width,d.height),
						f=[]
					},
					C=function(e){
						e.preventDefault(),
						d.addEventListener(i,y,!1),
						g(h,e),
						f.push({x:h.x,y:h.y}),
						f.push({x:h.x,y:h.y}),
						y()
					},
					x=function(){
						function e(){
							u=!0
						}
						function n(){
							u=!1
						}
						function i(){
							document.body.removeEventListener("mousedown",e),
							document.body.removeEventListener("mouseup",n)
						}
						function c(e){
							u&&C(e)
						}function l(e){
							u&&w(e)
						}
						if(d.addEventListener(a,C,!1),d.addEventListener(r,w,!1),!o){
							var u;
							document.body.addEventListener("mousedown",e),
							document.body.addEventListener("mouseup",n),
							t.$on("$destroy",i),
							d.addEventListener("mouseenter",c),
							d.addEventListener("mouseleave",l)
						}
					},
					b=function(e){
						u.length>0&&(p.putImageData(u[e],0,0),u=u.slice(0,e))
					};
					x()
				}
			}
		}),
		angular.module("pw.canvas-painter").directive("pwColorSelector",
			function(){
				return{
					restrict:"AE",
					scope:{colorList:"=pwColorSelector",selectedColor:"=color"},
					templateUrl:"../templates/color-selector.html",
					link:function(e){
						e.setColor=function(t){
							e.selectedColor=t
						}
					}
				}
			})
	}(this);