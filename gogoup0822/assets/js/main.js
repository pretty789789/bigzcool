var zc ={
    hasGo:false,
    rotateGo:function(){
        if(zc.hasGo){ 
            alert("你已经抽过奖了~不要贪心哦~") ;
            return;
        }
        var rotateList = [
            {rotate:0,msg:"提示1"},
            {rotate:50,msg:"提示2"},
            {rotate:105,msg:"提示3"},
            {rotate:155,msg:"提示4"},
            {rotate:200,msg:"提示5"},
            {rotate:245,msg:"提示6"},
        ];
        var n = parseInt(Math.random()*6);
        //最好服务器随机
        zc.rotateFunc(n,rotateList[n].rotate,rotateList[n].msg);
    },
    rotateFunc:function(awards,angles,text){  //awards:奖项，angle:奖项对应的角度
        
        $('#turnBtn').stopRotate();
         $("#turnBtn").rotate({
            angle:0, 
            duration: 10000, 
            animateTo: 2160 + angles,
            callback:function(){
                alert(text);
                zc.hasGo = true;
            }
        }); 
    },
floorInit:function(){
        var defaults = {  //默认属性
              dom:"[floornav]",
              domtag:"li",
              speed:500,
              activeclass:"active",
              fixtop:220
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
              if ($goto.length > 0) {
                isClickScroll = true;
                $body.stop().animate({
                  scrollTop: $goto.offset().top - 100
                  }, _self.options.speed, function () {
                  isClickScroll = false;
                });
              }
          });

          var $gotoAttr = $("[goto]");
          var arrGotoTop = [];
          for(var i=0;i<$gotoAttr.length;i++){
            arrGotoTop.push($gotoAttr.eq(i).offset().top);
          }

         if($(_self.options.dom).hasClass('inside')){
            $(_self.options.dom).show();
         }


          $(window).on("scroll", function () {
              var _top = $(window).scrollTop()+100;

              if(_top>_self.options.fixtop){
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
    }
}
$(function(){
    zc.floorInit();
    var mySwiperBanner = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        loop:true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        normalizeSlideIndex:false,
        autoplayDisableOnInteraction: false
    });

 });