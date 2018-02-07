var zc = {
	
	pageInit:function(){
		
	},
  gotoDiv:function(obj){
      var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
      $body.stop().animate({
          scrollTop:$(obj).offset().top
          },500, function () {
      });
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

          if(_top>$(".topbanner").height() + 56){
            $(_self.options.dom).addClass("fix");
          }else{
            $(_self.options.dom).removeClass("fix");
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

    $(window).on("scroll",function(){
        var t = $(window).scrollTop();
        if(t>$("#cb").offset().top){
          $('.classBg').addClass('fix')
        }else{
          $('.classBg').removeClass('fix')
        }
    });

});
    