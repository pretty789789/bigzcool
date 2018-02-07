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
    
  },
  floorInit:function(){
    var defaults = {  //默认属性
          dom:"[floornav]",
          domtag:"li",
          speed:500,
          activeclass:"active",
          fixtop:0
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
  }

}
$(function(){
  zc.floorInit();
  var mycount = new countdown({
    dom:$("#timeZone"),
    enddate:"2018/02/26 00:00:00",
    endhanlder:function(){
      //到期后 回调函数

    }
  });
});