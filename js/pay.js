window.vm = new Vue({
	el:'#pay',
	data:{
		money10:'1000',
		money5:'500',
		money20:'2000',
		pay10:'970',
		pay5:'485',
		pay20:'1940',
		show10:true,
		show5:false,
		show20:false,
		msgShow:false //错误信息是否显示
	},
	methods:{
		//错误信息提示事件
		wrongMsg: function(){
			var _this = this;
			_this.msgShow = true;
			setTimeout(
				function(){
					_this.msgShow = false;
				},2000);	
		},
		confirm:function(){
			if ( !$('#cardNum').val().length ) {
				$('div.wrongmsg').html('请输入充值卡号！');
				this.wrongMsg();
			}
			return true;
		}
	}
})