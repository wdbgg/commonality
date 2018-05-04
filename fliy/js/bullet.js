function Bullet(){
	this.init = function(){//子弹创建
		this.body = create("div");
		this.body.className = "bullet";
		new GameEngine().append( this );
		var mp = new MyPlane();
		this.body.style.left = mp.left()+mp.width()/2 - this.width()/2 + "px";
		this.body.style.top = mp.top() - this.height() + "px";
		
		return this;
	}
	this.move = function(){//子弹移动
		this.timer = setInterval(function(){
			//this.body.style.top = this.body.offsetTop - 3 + "px";
			this.top( this.top() - 3 );
			if( this.top() < -this.height() ){
				this.body.remove();//子弹移出可视区后，销毁子弹
				clearInterval(this.timer);
			}
			//在子弹移动的定时器中，以一个子弹为基准，遍历所有敌机  如果子弹和某个敌机有碰撞，  子弹爆炸销毁，敌机受伤
			//如何找到所有的敌机？？？？   
			//找到所有敌机方法 ：     1--在引擎中定义一个enemes属性，值是一个set集合
			//				2-- 在创建敌机时   将所有敌机存入enemes集合
			//扎到所有敌机后，遍历 所有敌机  
			//console.log( new GameEngine().enemes );
			var enemes = new GameEngine().enemes; // set集合
			for( var en of enemes ){
				if( pz(this.body,en.body) ){ //碰撞后
					this.explode();//子弹爆炸
					clearInterval(this.timer);//停止被碰撞后的子弹的定时器
					en.hurt();//敌机受伤了
				}
			}
		}.bind(this),30)
	}
	this.explode = function(){ //子弹爆炸
		this.body.className = "bullet_die";
		setTimeout(function(){
			this.body.remove();
		}.bind(this),200)
	}
	this.width = function(){
		return this.body.offsetWidth;
	}
	this.height = function(){
		return this.body.offsetHeight;
	}
	this.top = function(val){
		//如果val有值  设置  否则就获取
		if( val || val == 0 ){
			this.body.style.top = val + "px";
		}
		return this.body.offsetTop;
	}
}
