function Enemy(type){
	this.init = function(){ //敌机创建
		this.body = create("div");
		switch( type ){
			case "small":{
				this.body.className = "enemy-small";
				this.hp = 1;
				this.speed = 6;
				this.imgs = ["plain1_die1.png","plain1_die2.png","plain1_die3.png"];//存放敌机爆炸图片
				new GameEngine().append(this);
				this.left( rand(0, new GameEngine().width() - this.width() ) );
				this.top( -this.height() );
				break;
			}
			case "middle":{
				this.speed = 4;
				this.imgs = ["plain2_die1.png","plain2_die2.png","plain2_die3.png","plain2_die4.png"];//存放敌机爆炸图片
				this.hp = 3;
				this.body.className = "enemy-middle";
				new GameEngine().append(this);
				this.left( rand(0, new GameEngine().width() - this.width() ) );
				this.top( -this.height() );
				break;
			}
			case "large":{
				this.imgs = ["plain3_die1.png","plain3_die2.png","plain3_die3.png","plain3_die4.png","plain3_die5.png","plain3_die6.png"];//存放敌机爆炸图片
				this.body.className = "enemy-large";
				this.hp = 5;
				new GameEngine().append(this);
				this.speed = 2;
				this.left( rand(0, new GameEngine().width() - this.width() ) );
				this.top( -this.height() );
				break;
			}
		}
		
		return this;
	}
	this.move = function(){
		this.timer = setInterval(function(){
			this.top( this.top() + this.speed );
			if( this.top() > new GameEngine().height() ){
				this.body.remove();
				clearInterval(this.timer);
			}
		}.bind(this),30)
		
		return this;
	}
	this.hurt = function(){//敌机受伤方法
		//如果血值变成0  就爆炸
		--this.hp == 0 ? this.explode() : "";
	}
	this.explode = function(){//飞机爆炸
		//this.body.remove();
		//飞机爆炸后  停止运动  
		clearInterval( this.timer );
		//如果飞机中弹后 爆炸，后面的子弹再次和该飞机碰撞后，  子弹可以继续前进，不需要再和爆炸的敌机进行碰撞检测了
		//将集合中爆炸的敌机删除
		new GameEngine().enemes.delete( this );
		var time = setInterval(function(){
			if( this.imgs.length == 0 ){
				this.body.remove();
				return;
			}
			this.body.style.backgroundImage ="url(images/"+ this.imgs.shift() +")";
		}.bind(this),300)
	}
	this.left = function(val){
		if( val || val == 0 ){
			this.body.style.left = val +"px";
		}
		return this.body.offsetLeft;
	}
	this.top = function(val){
		if( val || val == 0 ){
			this.body.style.top = val +"px";
		}
		return this.body.offsetTop;
	}
	this.width = function(){
		return this.body.offsetWidth;
	}
	this.height = function(){
		return this.body.offsetHeight;
	}
}
