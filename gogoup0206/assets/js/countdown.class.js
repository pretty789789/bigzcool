class countdown{
	constructor(parameter){
		this.dom = parameter.dom;
		this.enddate = parameter.enddate;
		this.endhanlder = parameter.endhanlder;
		this.interval = null;
		this._init();
	}

	_init(){
		this._setInterval();
	}

	_setInterval(){
		var _self = this;
		this.interval = setInterval(function(){

			var now 		= new Date();
			var enddate 	= new Date(_self.enddate);
			var leftTime 	= enddate - now;

			if(leftTime<0){
				_self._destroyInterval();
				return;
			}

			var leftsecond 	= parseInt(leftTime/1000);
			var day 		= Math.floor(leftsecond/(60*60*24));
			var hour 		= Math.floor((leftsecond-day*24*60*60)/3600);
			var minute 		= Math.floor((leftsecond-day*24*60*60-hour*3600)/60);
			var second 		= Math.floor(leftsecond-day*24*60*60-hour*3600-minute*60);

			var dayTenSpan,daySpan,hourTenSpan,hourSpan,minuteTenSpan,minuteSpan,secondTenSpan,secondSpan;

			if(day<10){
				dayTenSpan 		= 0;
				daySpan    		= day;
			}else{
				dayTenSpan 		= parseInt(day/10);
				daySpan    		= day%10;
			}

			if(hour<10){
				hourTenSpan 	= 0;
				hourSpan    	= hour;
			}else{
				hourTenSpan 	= parseInt(hour/10);
				hourSpan    	= hour%10;
			}

			if(minute<10){
				minuteTenSpan 	= 0;
				minuteSpan    	= minute;
			}else{
				minuteTenSpan 	= parseInt(minute/10);
				minuteSpan    	= minute%10;
			}

			if(second<10){
				secondTenSpan 	= 0;
				secondSpan    	= second;
			}else{
				secondTenSpan 	= parseInt(second/10);
				secondSpan    	= second%10;
			}

			_self._slideSpan("day",dayTenSpan,"first");
			_self._slideSpan("day",daySpan,"last");

			_self._slideSpan("hour",hourTenSpan,"first");
			_self._slideSpan("hour",hourSpan,"last");

			_self._slideSpan("minute",minuteTenSpan,"first");
			_self._slideSpan("minute",minuteSpan,"last");

			_self._slideSpan("second",secondTenSpan,"first");
			_self._slideSpan("second",secondSpan,"last");


		},1000);
	}


	_slideSpan(type,span,y){
		var _self = this;
		var $thisSpan = $(_self.dom).find("[numbertype='" +type+ "'] span:"+y);
		var nowSpanNumber = $thisSpan.children("b:first").html();

		if(span!=nowSpanNumber){
			$thisSpan.children("b:last").html(span);
			$thisSpan.stop().animate({
				top:"-90px"
			},500,function(){
				$thisSpan.css({
					top:0
				});
				$thisSpan.children("b:first").html(span);
			})
		}
	}
	_destroyInterval(){
		this.endhanlder();
		clearInterval(this.interval);

	}

}