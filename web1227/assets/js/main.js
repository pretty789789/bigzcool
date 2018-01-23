var zc = {
	maxChoose:3,
	nowChoose:0,
	tpInit:function(){
		$(".tpBtn").on('click',function(event) {
			var check = $(this).children(':checkbox');
			if(check.is(":checked")){
				check.prop("checked",false);
				$(this).removeClass("active");
				zc.nowChoose--;
			}else{
				if(zc.nowChoose==3){
					$('.pops').show();
					return;
				}
				check.prop("checked",true);
				$(this).addClass("active");
				zc.nowChoose++;
			}
			if(zc.nowChoose>0){
				$(".tjSub").removeClass("disabled")
			}else{
				$(".tjSub").addClass("disabled")
			}
		});
		// $(document).on('click', ".tjSub:not('.disabled')", function(event) {
		// 	$("#pops").show();
		// });
		// $(document).on('click', ".tmsgBtn:not('.disabled')", function(event) {
		// 	$("#pops").hide();
		// 	$("#popsuccess").show();
		// });
	}
}

$(function(){
	// $(".senseWP").zcoolvalidate();
	zc.tpInit();
});