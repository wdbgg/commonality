//缓冲--多物体
//obj  要操作的元素
//target  目标值
//attr  要操作的属性
function startMove(obj,target,attr){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var current =parseInt( getStyle(obj,attr) ) ;
		var speed = (target-current)/10;
		speed = speed>0?Math.ceil(speed) : Math.floor(speed);
		if( current == target ){
			clearInterval(obj.timer);
		}else{
			obj.style[attr] = current + speed + "px";
		}
	},30)
}
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}