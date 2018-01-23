/**		zcool-validator.js v0.35
**		Copyright (c) 2017 Huang Xiaodong, 316282999@qq.com
**		Date:2017-03-10
*
		常用验证：输入框、下拉框、上传、radio、chekcbox、textarea、验证码

		方法
		参数
		回调

**/
(function($){
	$.extend($.fn, {
		zcoolvalidate: function( options ) {
			var _self = this;

			var defaults = {
				messages:{												//提示信息
					required		: "输入不能为空",
					email			: "请输入有效的电子邮件地址",
					url				: "请输入有效的网址",
					date			: "请输入有效的日期",
					idcard			: "请输入有效的身份证号码",
					maxlength		: "最多可以输入 {0} 个字符",
					minlength		: "最少要输入 {0} 个字符",
					max				: "请输入不大于 {0} 的数值",
					min				: "请输入不小于 {0} 的数值"
				},
				messageTag			: ".zv-msg",						//信息显示的标签
				addToParentClass	: true,								//验证后的class是否添加到当前验证元素的父标签上
				errorClass			: "error",							//验证失败class
				disableClass		: "disabled",						//验证成功前，提交按钮禁用样式
				submitBtn			: $(_self).find("[validate-btn]"),	//Form提交按钮

				//以下是内部工具
				valitags			: $(_self).find("[validate-type]"),
				firstClass			: "zv-first"						//初始化class，第一次触发后删除

			}
			var options = $.extend(defaults,options);					//参数合并

			this.each(init);
			//初始化
			function init(){
				setFromFirst();											//设置每个元素初始化状态
				setFormStatus(false);									//设置Form状态为失败
				initListener();											//给每个元素绑定初始化事件
			}

			//给每个元素绑定初始化事件
			function initListener(){
				options.valitags.each(function(index, el) {
					switch($(this).attr("validate-type")){
						case "int": 					//正整数
							intInit(this);
						break;
						case "noint": 					//非负整数
							nointInit(this);
						break;
						case "string": 					//字符串
							stringInit(this);
						break;
						case "sms": 					//6位短信验证码

						break;
						case "verification": 			//图形验证码
							verificationInit(this);
						break;
						case "mobile": 					//11位手机
							mobileInit(this);
						break;
						case "qq": 						//QQ，大于5位小于11位的正整数
							qqInit(this);
						break;
						case "email": 					//邮箱
							emailInit(this);
						break;
						case "idcard": 					//15或18位身份证
							idcardInit(this);
						break;
						case "time": 					//时间
							timeInit(this);
						break;
						case "select": 					//下拉框
							selectInit(this);
						break;
						default: 						//默认字符串
						break;
					}
				});
			}

			//下拉框
			function selectInit(dom){
				$(dom).on("change",function(){
					var result = !hasAttr($(dom).find("option:selected"),"isdefault");
					setTagStatus(result,dom);
				});
			}

			//时间
			function timeInit(dom){
				$(dom).on("change",function(){
					var result = checkValue($(dom).val(),"time");
					setTagStatus(result,dom);
				});
			}

			//手机
			function mobileInit(dom){
				$(dom).on("keyup change blur",function(){
					var result = checkValue($(dom).val(),"mobile");
					setTagStatus(result,dom);
				});
			}
			//qq
			function qqInit(dom){
				$(dom).on("keyup change blur",function(){
					var result = checkValue($(dom).val(),"qq");
					setTagStatus(result,dom);
				});
			}
			//email
			function emailInit(dom){
				$(dom).on("keyup change blur",function(){
					var result = checkValue($(dom).val(),"email");
					setTagStatus(result,dom);
				});
			}
			//身份证
			function idcardInit(dom){
				$(dom).on("keyup change blur",function(){
					var result = checkValue($(dom).val(),"idcard");
					setTagStatus(result,dom);
				});
			}

			//正整数
			function intInit(dom){
				$(dom).on("keyup change blur",function(){
					var result = checkValue($(dom).val(),"int");
					if(result){ //验证成功
						var min = $(dom).attr("minlength");
						if($(dom).val().length<min){
							result = false;
						}
					}
					setTagStatus(result,dom);
				});
			}
			//非负整数
			function nointInit(dom){
				$(dom).on("keyup change blur",function(){
					var result = checkValue($(dom).val(),"noint");
					if(result){ //验证成功
						var min = $(dom).attr("minlength");
						if($(dom).val().length<min){
							result = false;
						}
					}
					setTagStatus(result,dom);
				});
			}
			//字符串
			function stringInit(dom){
				$(dom).on("keyup change blur",function(){
					var result = !checkValue($(dom).val(),"string");
					if(result){ //验证成功
						var min = $(dom).attr("minlength");
						if($(dom).val().length<min){
							result = false;
						}
					}
					setTagStatus(result,dom);
				});
			}
			//图形验证码
			function verificationInit(dom){
				$(dom).on("keyup change blur",function(){
					var verificationCode = $(_self).find("[verification-code]").attr("verification-code");
					var result = ($(dom).val()==verificationCode)?true:false;
					setTagStatus(result,dom);
				});
			}

			//设置单个元素的状态
			function setTagStatus(res,dom){
				$(dom).removeClass(options.firstClass);
				if(res){	//成功
					if(options.addToParentClass){ //是否加在父标签
						$(dom).parent().removeClass(options.errorClass)
					}else{
						$(dom).removeClass(options.errorClass)
					}
				}else{	//失败
					if(options.addToParentClass){ //是否加在父标签
						$(dom).parent().addClass(options.errorClass)
					}else{
						$(dom).addClass(options.errorClass)
					}
				}
				var status = _self.checkFormStatus();
			}


			//设置每个元素初始化状态
			function setFromFirst(){
				options.valitags.addClass(options.firstClass);
			}

			//检查Form状态
			_self.checkFormStatus = function(){
				var status = true;
				options.valitags.each(function(index, el) {
					if($(this).hasClass(options.firstClass)){
						status = false;
					}
					if(options.addToParentClass){ //是否加在父标签
						if($(this).parent().hasClass(options.errorClass)){
							status = false;
						}
					}else{
						if($(this).hasClass(options.errorClass)){
							status = false;
						}
					}
				});

				if(status){
					options.submitBtn.removeClass(options.disableClass);
				}else{
					options.submitBtn.addClass(options.disableClass);
				}
				setFormStatus(status);
				return status;
			}


			//获取Form验证状态
			function getFormstatus(){
				return $(_self).attr("validate");
			}

			//设置整个Form验证状态
			function setFormStatus(bool){
				if(bool){
					$(_self).attr("validate",true);
					options.submitBtn.removeClass(options.disableClass);
				}else{
					$(_self).attr("validate",false);
					options.submitBtn.addClass(options.disableClass);  //禁用提交按钮
				}
			}


			//验证值和类型
			function checkValue(value,type){
				var regular = "";
				switch(type){
					case "int": 			//正整数
						regular = /^[0-9]*[1-9][0-9]*$/;
					break;
					case "noint": 			//非负整数
						regular = /^(0|[1-9]\d*)$/;
					break;
					case "string": 			//字符串
						regular = /^\s*$/g;
					break;
					case "sms": 	//6位验证码
						regular = /^\d{6}$/;
					break;
					case "time": 			//时间 0000-00-00
						regular = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/;
					break;
					case "qq": 				//qq
						regular = /^\d{5,11}$/;
					break;
					case "mobile": 			//手机号码
						regular = /^1[34578]\d{9}$/;
					break;
					case "email": 			//邮箱
						regular = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
					break;
					case "idcard": 			//15/18位身份证
						regular = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
					break;
					case "username": 		//4-15位数字和英文混合的用户名
						regular = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
					break;
				}
				return regular.test(value);
			}

			//是否有某个属性
			function hasAttr(obj,attr){
				if(typeof($(obj).attr(attr))!="undefined"){
					return true;
				}else{
					return false;
				}
			}

			//用法：formatMessage("请输入大于 {0} 小于 {1} 的数值",1,4));
			function formatMessage( source, params ) {
				if ( params === undefined ) {   									//如果只有source一个参数，直接返回source的值
					return source;
				}
				if ( arguments.length > 2 && params.constructor !== Array  ) {		//多个params合并成数组
					params = $.makeArray(arguments).slice(1);
				}
				if ( params.constructor !== Array ) {								//1个params也转为数组
					params = [ params ];
				}
				$.each( params, function( i, n ) {									//遍历数组  替换模板文字
					source = source.replace(new RegExp( "\\{" + i + "\\}", "g" ), function() {
						return n;
					} );
				} );
				return source;
			}

			return _self;
		}
	});

})(jQuery);