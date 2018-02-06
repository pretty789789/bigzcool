
var zc = {
	timeMaxRun:50,
	timeRun:0,
	startCj:function(){
		var size = $("#cPimg li").length - 1;
		var inter = setInterval(function(){
			var nowIndex = Math.floor(Math.random()*size + 1) - 1;
			$("#cPimg li").removeClass("active");
			$("#cPimg li").eq(nowIndex).addClass("active");

			//console.log(zc.timeRun)
			if(zc.timeRun>zc.timeMaxRun){
				clearInterval(inter);
				zc.timeRun = 0;
				//alert("恭喜中奖！")
			}
			zc.timeRun ++;
		},100)
		
	}
}
$(function(){
	var mycount = new countdown({
		dom:$("#timeZone"),
		enddate:"2018/02/14 19:00:00",
		endhanlder:function(){
			//到期后 回调函数

		}
	});
});