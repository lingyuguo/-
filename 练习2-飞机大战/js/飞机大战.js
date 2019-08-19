//随机参数
function randomNumber(min, max){
	return parseInt(Math.random() * (max-min) + min);
}
//背景运动
var jsBg1 = document.getElementById("bg1")
var jsBg2 = document.getElementById("bg2")
var timerBg = setInterval(function(){
	jsBg1.style.top = jsBg1.offsetTop + 1 +"px"
	jsBg2.style.top = jsBg2.offsetTop + 1 +"px"
	
	if (jsBg1.offsetTop >= 640){
		jsBg1.style.top = "-640px"
	}
	if (jsBg2.offsetTop >= 640){
		jsBg2.style.top = "-640px"
	}
},10)

//飞机运动(拖拽)
var airplane = document.getElementById("airplane")
var mainscreen = document.getElementById("mainscreen")
airplane.addEventListener("mousedown",funcMove,false);
function funcMove(e){ 
	var ev = e || window.event;
	basex = ev.pageX
	basey = ev.pageY
	movex = 0
	moveY = 0
	//主屏幕添加鼠标移动
	mainscreen.addEventListener("mouseover",function(e){
		var en = e || window.event;
		movex = en.pageX - basex
		basex = en.pageX
		movey = en.pageY - basey
		basey = en.pageY
		airplane.style.left = airplane.offsetLeft + movex + "px" 
		airplane.style.top = airplane.offsetTop + movey + "px" 
	},false)
}

//发射子弹
var timerBullent = setInterval(function(){
	//创建子弹
	var bullent = document.createElement("div")
	mainscreen.appendChild(bullent)
	bullent.className = "bullent"
	bullent.style.left = airplane.offsetLeft + 52 + "px"
	bullent.style.top = airplane.offsetTop - 10  + "px"
	
	//让子弹飞
	var timerBullentFly = setInterval(function(){
		bullent.style.top = bullent.offsetTop - 10 + "px"
		if (bullent.offsetTop <= -20){
			clearInterval(timerBullentFly)
			mainscreen.removeChild(bullent)
		}
	},100)
	bullent.timer = timerBullentFly
},1000)


//下落坦克
var timertank = setInterval(function(){
	//创建子弹
	var tank = document.createElement("div")
	mainscreen.appendChild(tank)
	tank.className = "tank"
	tank.style.left = randomNumber(0,384) + "px"
	tank.style.top = "0px"
	
	//让子弹飞
	var timerTankFly = setInterval(function(){
		tank.style.top = tank.offsetTop + 10 + "px"
		if (tank.offsetTop >= 680){
			clearInterval(timerTankFly)
			mainscreen.removeChild(tank)
		}
	},100)
	tank.timer = timerTankFly
	
},1000)



//子弹消除坦克
var timePZJC = setInterval(function(){
	var allTanks = document.getElementsByClassName("tank")
	var allBullents = document.getElementsByClassName("bullent")
	for (var i = 0; i < allBullents.length; i++){
		for (var j = 0; j < allTanks.length; j++){
			var b = allBullents[i]
			var t = allTanks[j]
			
			if (pzjcFunc(b,t)){
				clearInterval(b.timer)
				clearInterval(t.timer)
				mainscreen.removeChild(b)
				mainscreen.removeChild(t)
				break
			}
		}
	}
})

//死亡检测
var timerDie = setInterval(function(){
	var allTanks = document.getElementsByClassName("tank")
	for (var i = 0; i < allTanks.length; i++){
		if (pzjcFunc(allTanks[i],airplane)){
			for (var j = 0;j < 100;j ++){
				clearInterval(j)
			}
			break
		}	
	}
},false)


function pzjcFunc(obj1, obj2){
	var obj1Left = obj1.offsetLeft;
	var obj1Width = obj1Left + obj1.offsetWidth;
	var obj1Top = obj1.offsetTop;
	var obj1Height = obj1Top; + obj1.offsetHeigth;

	var obj2Left = obj2.offsetLeft;
	var obj2Width = obj2Left + obj2.offsetWidth;
	var obj2Top = obj2.offsetTop;
	var obj2Height = obj2Top; + obj2.offsetHeigth;

	if ( !(obj1Left > obj2Width || obj1Width < 
		obj2Left || obj1Top > obj2Height || 
		obj1Height < obj2Top) ) {
		return true;
		} else {
		return false;
		}
}



