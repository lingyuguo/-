var jsBox = document.getElementById("box")
var jsPic = document.getElementById("pic")
var jsLeft = document.getElementById("left")
var jsRight = document.getElementById("right")
var jsLisArr = document.getElementsByTagName("li")

//第一个li为红色
jsLisArr[0].style.backgroundColor = "red"
//启动定时器更换图片
var currentPage = 1
var timer = setInterval(startloop,1000)
function startloop(){
	currentPage++
	changePage()
}
function changePage(){
	if (currentPage == 5){
		currentPage = 1
	}
	else if(currentPage == 0){
		currentPage = 4
	}
	jsPic.src = "img/" + currentPage + ".jpg"
	
	for (var i = 0; i< jsLisArr.length; i++){
		jsLisArr[i].style.backgroundColor = "#aaa"
	}
	jsLisArr[currentPage - 1].style.backgroundColor = "red"
}

//进入box暂停画面
jsBox.addEventListener("mousemove",overFunc,false)
function overFunc(){
	clearInterval(timer)
	//显示左右按钮
	jsLeft.style.display = "block"
	jsRight.style.display = "block"
}
//出来box开始画面
jsBox.addEventListener("mouseout",outFunc,false)
function outFunc(){
	timer =setInterval(startloop,1000)
	jsLeft.style.display = "none"
	jsRight.style.display = "none"
}

//点击左右
jsLeft.addEventListener("mouseover",deep,false)
jsRight.addEventListener("mouseover",deep,false)
function deep(){
	this.style.backgroundColor = "rgba(0,0,0,0.6)"
}
jsLeft.addEventListener("mouseout",nodeep,false)
jsRight.addEventListener("mouseout",nodeep,false)
function nodeep(){
	this.style.backgroundColor = "rgba(0,0,0,0.2)"
}
jsRight.addEventListener("click",function(){
	currentPage++
	changePage()
},false)
jsLeft.addEventListener("click",function(){
	currentPage--
	changePage()
},false)

//进入小圆点
for(var i= 0; i < jsLisArr.length; i++ ){
	jsLisArr[i].index = i + 1 
	jsLisArr[i].addEventListener("mouseover",function(){
		currentPage = this.index
		changePage()
	},false)}