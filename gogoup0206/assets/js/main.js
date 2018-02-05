//ajax获取到的对错答案
var data = [
	{id:0,rightID:"b",message:{
		a:"2018年站酷CUBE都3岁啦！",
		b:"站酷成立于2006年8月，属狗的狮子座哦！",
		c:"4不4sa？"
	}},
	{id:1,rightID:"a",message:{
		a:"Bingo!",
		b:"emmmmm……？",
		c:"请开始你的表演！"
	}},
	{id:2,rightID:"a",message:{
		a:"一个汉堡的价格就可以避免巨额的版权纠纷赔偿风险",
		b:"看小抄都错，也是666",
		c:"BOOK思议，看小抄的你都能答错！"
	}},
	{id:3,rightID:"a",message:{
		a:"约合当时的310000RMB，由华为在《全世界看你的-华为EMUI第二届全球手机主题设计大赛》活动中送出",
		b:"万万没想到，这居然不是正确答案",
		c:"目标不小啊！"
	}},
	{id:4,rightID:"c",message:{
		a:"请看清题干，这个必须可以有！",
		b:"请看清题干，这个必须可以有！",
		c:"看来，你是个正经的吃货。",
		d:"请看清题干，这个必须可以有！"
	}},
	{id:5,rightID:"c",message:{
		a:"Are you OK?",
		b:"咋不上天呢？",
		c:"来自2017年4月腾讯发布的海外职位：UI/UX Artist"
	}},
	{id:6,rightID:"a",message:{
		a:"老哥，稳！",
		b:"旋转跳跃，这道题是不是闭眼答的？",
		c:"扎心了，老铁！"
	}},
	{id:7,rightID:"c",message:{
		a:"再好好想想",
		b:"再再好好想想",
		c:"Get到一项新技能"
	}},
	{id:8,rightID:"a",message:{
		a:"2017站酷CUBE是由Cube Talk论坛、Cube Fair市集和ZCOOL Awards站酷奖组成的。您答对啦！",
		b:"你可能走错片场了",
		c:"还有第四部分、第五部分……"
	}},
	{id:9,rightID:"a",message:{
		a:"为大师们打call",
		b:"皮皮虾，我们走！"
	}},
	{id:10,rightID:"d",message:{
		a:"《设计中的逻辑》、《画语辑》、《手绘的门道》，都是站酷出品的哦！",
		b:"《设计中的逻辑》、《画语辑》、《手绘的门道》，都是站酷出品的哦！",
		c:"《设计中的逻辑》、《画语辑》、《手绘的门道》，都是站酷出品的哦！",
		d:"《设计中的逻辑》、《画语辑》、《手绘的门道》，都是站酷出品的哦！"
	}},
	{id:11,rightID:"c",message:{
		a:"站酷认证帐号，通过认证申请并通过审核后就可以获得此图标～",
		b:"这可是首页推荐级别哟～",
		c:"一看你就是内行",
		d:"这是海洛供图者认证图标哦～"
	}}
]


var zc = {
	tmInit:function(){

		//每道题点击
		$(".tm li").each(function(index, el) {
			var _self = this;
			$(":radio",this).on("click",function(event) {
				var name = $(this).attr("name");
				var val = $(this).val();
				var obj;
				for(var n = 0; n<data.length; n++){
					if(name == "t" + (data[n].id + 1)){
						obj = data[n];
					}
				}

				//回答正确
				var rw;
				if(obj.rightID == val){
					rw = "right";
				}else{ //回答错误
					rw = "wrong";
				}

				var html = '';
				html+='<div class="tboxMsg">';
                html+='   <img src="assets/img/'+rw+'.png" alt="">';
                html+='   <div>'+obj.message[val]+'</div>';
                html+='</div>';

				$(_self).find(".tbox").html(html);
				//请自行统计得分，并判断是会否完成了12道题

			});
		});
	},
	    swipers:null,
    openPops:function(dom,index){
        $(dom).show();
        var swpierTree = new Swiper('#swpierTree .swiper-container', {
            nextButton: '#swpierTree .swiper-button-prev',
            prevButton: '#swpierTree .swiper-button-next',
            paginationClickable: true,
            // loop:true,
            initialSlide :index-1,
            centeredSlides: true,
            autoplay: 2500,
            normalizeSlideIndex:false,
            loop:true
        });
        //zc.swipers.slideTo(index);
    },
    closePops:function(dom){
        $(dom).hide();
        zc.swipers.destroy();
        zc.swipers = null;
    },
	pageInit:function(){

		zc.tmInit();
		var swpierOne = new Swiper('#swpierOne .swiper-container',{
			prevButton:'#swpierOne .swiper-button-prev',
			nextButton:'#swpierOne .swiper-button-next',
			slidesPerView:3,
			loop:true
		});
		var swpierTwo = new Swiper('#swpierTwo .swiper-container',{
			prevButton:'#swpierTwo .swiper-button-prev',
			nextButton:'#swpierTwo .swiper-button-next',
			slidesPerView:3,
			loop:true
		});
		// var swpierTwo = new Swiper('#swpierTree .swiper-container',{
		// 	prevButton:'#swpierTree .swiper-button-prev',
		// 	nextButton:'#swpierTree .swiper-button-next',
		// 	// slidesPerView:3,
		// 	loop:true
		// });
		zc.floorInit();
		//$('#audio').audioPlayer();
	},
	navscrollLayout:function(){
		var tc = $(window).scrollTop();
		if(tc>=10){
			$("#sidemenu").show();
		}else{
			$("#sidemenu").hide();
		}
	},
	floorInit:function(){
		var defaults = {  //默认属性
		      dom:"[floornav]",
		      domtag:"li",
		      speed:500,
		      activeclass:"active",
		      fixtop:10
		  }

		  var _self = {
		    options : defaults
		  };
		  var isClickScroll = false;
		  var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		  var $scrollNav = $(_self.options.dom);
		  var $li = $(_self.options.domtag, $scrollNav);

		  $li.on("click", function (e) {

		      var $this = $(this);
		      var $goto = $($this.data("goto"));

		      var fixed = parseInt($goto.attr("fixed"));

		      if ($goto.length > 0) {
		        isClickScroll = true;
		        $body.stop().animate({
		          scrollTop: $goto.offset().top + fixed
		          }, _self.options.speed, function () {
		          isClickScroll = false;
		        });
		      }
		  });
		  var $gotoAttr = $("[goto]");
		  var arrGotoTop = [];
		  for(var i=0;i<$gotoAttr.length;i++){
		  	var fixed = parseInt($gotoAttr.attr("fixed"));
		    arrGotoTop.push($gotoAttr.eq(i).offset().top + fixed - 160);
		  }

		  $(window).on("scroll", function () {
		      var _top = $(window).scrollTop();

		      if(_top > $(".headerWrapper").height() + 56){
		        $(_self.options.dom).show();
		      }else{
		        $(_self.options.dom).hide();
		      }
		      for(var i=0;i<arrGotoTop.length;i++){
		        if(i==arrGotoTop.length-1){ //最后一个
		          if(_top >=  arrGotoTop[i] || _top >= ($(document).height()-$(window).height())){
		            var sid = "#" + $gotoAttr.eq(i).attr("id");
		            $li.removeClass(_self.options.activeclass);
		            $("[data-goto='"+sid+"']").addClass(_self.options.activeclass);
		          }
		        }else{ //中间
		          if(_top<arrGotoTop[0]){
		            var sid = "#" + $gotoAttr.eq(0).attr("id"); //找到小于最低高度的id
		            $li.removeClass("active");
		            $("[data-goto='"+sid+"']").addClass(_self.options.activeclass);
		          }
		          if (_top >= arrGotoTop[i] && _top < arrGotoTop[i+1]) {
		            var sid = "#" + $gotoAttr.eq(i).attr("id");
		            $li.removeClass(_self.options.activeclass);
		            $("[data-goto='"+sid+"']").addClass(_self.options.activeclass);
		          }
		        }
		      }
		  });
	},
	openPop:function(obj){
		$(obj).css({
			display:"flex"
		});
	},
	closePop:function(obj){
		$(obj).hide();
	},
	timeMaxRun:50,
	timeRun:0,
	startCj:function(){
		var size = $("#sussList li").length - 1;
		var inter = setInterval(function(){
			var nowIndex = Math.floor(Math.random()*size + 1) - 1;
			$("#sussList li").removeClass("active");
			$("#sussList li").eq(nowIndex).addClass("active");

			//console.log(zc.timeRun)
			if(zc.timeRun>zc.timeMaxRun){
				clearInterval(inter);
				zc.timeRun = 0;
				//alert("恭喜中奖！")
			}
			zc.timeRun ++;
		},50)
		
	}
}
$(function(){
	zc.pageInit();
	zc.navscrollLayout();
	$("#validateForm").zcoolvalidate();
	$("[verification-code]").click(function(event) {
		var $nameFor = $("[name='"+ $(this).attr("for") +"']");
		if($(this).attr("verification-code") == $nameFor.val()){
			$nameFor.parent().removeClass("error");
		}else{
			$nameFor.parent().addClass("error");
		}
	});
});