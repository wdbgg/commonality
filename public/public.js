//获取非行内元素样式值
function getStyle(obj,attr){
   if( window.getComputedStyle ){
       return window.getComputedStyle(obj,false)[attr];
   }else{
       return obj.currentStyle[attr];
   }
}

//编写一个函数，功能判断任意一个数是否是素数，如果是素数，返回true，否则返回false
function isPrimerNumber(num){
	for( var i = 2 ; i < num ; i++ ){
		if( num%i == 0 ){ //说明不是素数
			return false;//函数遇到return  直接退出函数
		}
	}
	return true;//说明是素数
}

//函数的作用 就是 根据给定的id查找页面元素 
function $id(id){
	return document.getElementById(id);
}

//获取任意区间值函数
function rand(min,max){
    return Math.round( Math.random()*(max-min) ) + min;
}

//获取随机颜色值
function getColor(){
	// 0-9  a-f    随机取出 6个字符 拼接  "#"
	var str = "0123456789abcdef";// 0--15
	var color = "#";  
	for( var i = 1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );//根据随机下标得到对应的字符 然后进行拼接
	}
	return color;
}

function dateToString(d){
	var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var _y = d.getFullYear();
	var _m = d.getMonth()+1;
	var _d = d.getDate();
	var _h = toTwo( d.getHours() );
	var _mi =toTwo( d.getMinutes() );
	var _s =toTwo( d.getSeconds() );
	var str = _y + "年" + _m + "月" + _d + "日" + " ";
		str += _h + ":" + _mi + ":" + _s;
		str += " " + arr[ d.getDay() ]
		return str;
}
//判断时间如果小于10 前面拼接0
function toTwo(v){
	return v < 10 ? "0" + v : v;
}
//将字符串转成日期对象
function stringToDate(str){
	return new Date(str);
}
//时间差函数  返回秒
function diff(start,end){
	return (end.getTime() - start.getTime())/1000;
}
//动态创建元素
function create(ele){
	return document.createElement(ele);
}

//碰撞检测
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop + obj1.offsetHeight;
	
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj2.offsetWidth;
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop + obj2.offsetHeight;
	
	if( R1<L2||L1>R2||B1<T2||T1>B2 ){ //碰不上的条件
		return false;
	}else{
		return true;
	}
}
