//缓冲--多物体
//obj  要操作的元素
//json  {attr : target}
//callback 回调函数
function startMove(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//定时器中 定义一个开关变量 值为true时  可以停止运动
		var current = 0;
		for( var attr in json ){  //target: json[attr]
			if( attr == "opacity" ){
				current = parseFloat( getStyle(obj,attr) ) * 100;
			}else{
				current =parseInt( getStyle(obj,attr) ) ;
			}
			var speed = (json[attr]-current)/10;
			speed = speed>0?Math.ceil(speed) : Math.floor(speed);
			if( current != json[attr] ){ //没有达到目标值
				flag = false;
			}
			//继续设置attr的值
			if( attr == "opacity" ){
			
				obj.style[attr] = (current + speed) / 100;
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
		
		//循环执行后  判断flag值如果为true  就停止定时器
		if( flag ){
			clearInterval(obj.timer);
			//上一个动作完成 进入到下一个动作
			if( callback ){
				callback(); 
			}
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