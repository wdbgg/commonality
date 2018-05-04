function GameEngine(){
	//单例模式
	if( !GameEngine.instance ){
		GameEngine.instance = {
			body : $id("main"),
			menus : $id("options"),
			enemes : new Set(),//属性作用存放敌机
			level : 0,//记录游戏等级
			start : function(){
				this.init();//入口方法  完成点击菜单
			},
			init : function(){ // 记录游戏等级
				this.menus.addEventListener("click",function(e){
					var e = e || event;
					var target = e.target || e.srcElement;
					if( target.nodeName == "LI" ){
						this.level = target.getAttribute("level");
						this.menus.remove();
						this.loading();//菜单消失后，引出游戏引擎动画
					}
				}.bind(this))
				
			},
			loading : function(){
				this.logo = create("div");
				this.logo.className = "logo";
				this.body.appendChild(this.logo);
				
				this.loading = create("div");//动画飞机
				this.loading.className = "loading";
				this.body.appendChild(this.loading);
				var timer = null;
				var index = 1;
				timer = setInterval(function(){
					this.loading.style.backgroundImage = "url(images/loading"+(++index)+".png)";
					if( index == 3 ){
						index = 0;
					}
				}.bind(this),600)
				
				//引擎背景移动动画
				var speedY = 0;
				setInterval(function(){
					this.body.style.backgroundPositionY = speedY++ + "px";
				}.bind(this),30)
				
				//3秒后  logo和loading消失   战斗机出场
				setTimeout(function(){
					this.logo.remove();
					this.loading.remove();
					clearInterval(timer);
					//战斗机出场
					this.gameStart();
				}.bind(this),3000)
			},
			gameStart : function(){
				//引出战斗机
				new MyPlane().show();
				
				this.fire();//开火  子弹出场
				
				this.autoCreateEnemy(); //敌机出场
			},
			append : function(obj){//将传递的对象添加到main容器中
				this.body.appendChild(obj.body);
			},
			width : function(){
				return this.body.offsetWidth;
			},
			height : function(){
				return this.body.offsetHeight;
			},
			left : function(){
				return this.body.offsetLeft;
			},
			fire : function(){
				//子弹出场
				setInterval(function(){
					new Bullet().init().move();
				}.bind(this),new GameEngine().level)
			},
			autoCreateEnemy : function(){
				//敌机出场
				setInterval(function(){
					if( Math.random()>0.2 ){
						//小飞机
						// 将new出来的敌机存入到set集合中   注意  move（）方法返回 this
						this.enemes.add( new Enemy("small").init().move() ) ;
					}
				}.bind(this),1000)
				setInterval(function(){
					if( Math.random() > 0.3 ){
						//中飞机
						this.enemes.add( new Enemy("middle").init().move() ) ;
					}
				}.bind(this),2000)
				setInterval(function(){
					if( Math.random() > 0.7 ){
						//大飞机
						this.enemes.add( new Enemy("large").init().move() ) ;
					}
				}.bind(this),4000)
			}
		}
	}
	return GameEngine.instance;
}