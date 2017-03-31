window.vm = new Vue({
	el:'#buyCard',
	data:{
		price:'485',
		num:'1',
		tranfee:'13',
		cityList: [
	      {
	      	"indexNum":"0",
	        "name":"成都市",
	        "areas":['金牛区','高新区','郫都区','青羊区','双流','龙泉驿区','武侯区']
	      },
	      {
	      	"indexNum":"1",
	        "name":"绵阳市",
	        "areas":['绵阳1','绵阳2','绵阳3','绵阳4','绵阳5','绵阳6','绵阳7']
	      },
	      {
	      	"indexNum":"2",
	        "name":"资阳市",
	        "areas":['资阳1','资阳2','资阳3','资阳4','资阳5','资阳6','资阳7']
	      },
	      {
	      	"indexNum":"3",
	        "name":"自贡市",
	        "areas":['自贡1','自贡2','自贡3','自贡4','自贡5','自贡6','自贡7']
	      },
	      {
	      	"indexNum":"4",
	        "name":"宜宾市",
	        "areas":['宜宾1','宜宾2','宜宾3','宜宾4','宜宾5','宜宾6','宜宾7']
	      }
	    ],
	    cityIndex:'0',
		city:'',
		area:'',
		addressDetail:'',
		isShow: true,//购卡主页和配送地址填写页面的切换
		msgShow: false,//错误信息是否显示
		isUserNameRight: /^[\u4E00-\u9FA5]{2,4}$/,//用户名判断格式，2-4个中文
		isPhoneNumRight: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ //手机号判断格式
	},
	computed:{   
		//   配送费用计算 
		countNum: function(){             
			return Number(this.price) * Number(this.num) + Number(this.tranfee)    
		}
	},
	methods:{
		//二级联动事件
		cityChange: function(){
			var $select = $('select');//获取城市下拉菜单
			this.cityIndex = $select[0].selectedIndex;//设置城市选中项对应index区下拉菜单
		},
		//错误信息提示事件
		wrongMsg: function(){
			var _this = this;
			_this.msgShow = true;
			setTimeout(
				function(){
					_this.msgShow = false;
				},2000);	
		},
		//完成，
		submit: function(){
			//获取地址信息
			var $select = $('select');//获取城市下拉菜单
			//验证
			//验证姓名是否为空，是否格式正确
			if ( !$('#userName').val().length || !this.isUserNameRight.test($('#userName').val())) {
				$('div.wrongmsg').html('请输入2-4个汉字！');
				this.wrongMsg();
			}else if( !$('#phoneNum').val().length || !this.isPhoneNumRight.test($('#phoneNum').val())){//验证手机号是否为空，是否格式正确
				$('div.wrongmsg').html('请输入正确的手机号！');
				this.wrongMsg();
			}else if( !$('#addressInfo').val().length ){
				$('div.wrongmsg').html('请输入详细地址！');
				this.wrongMsg();
			}else {
				//赋值
				this.city = $select[0][$select[0].selectedIndex].text;//赋值购卡首页的配送城市
				this.area = $select[1][$select[1].selectedIndex].text;//赋值购卡首页的配送区
				this.addressDetail = $('#addressInfo').val();//赋值购卡首页的详细地址
				this.isShow=!this.isShow;
			}
		},
		paySubmit: function(){
			if ( !$('#checkBox').get(0).checked ) {
				$('div.wrongmsg').html('请阅读办卡须知！');
				this.wrongMsg();
			}else if( this.addressDetail == "" ){
				$('div.wrongmsg').html('请填写配送地址！');
				this.wrongMsg();
			}else{
				return true;				
			}
		}
	},
	//监视下拉选择是否更改
	watch:{
		cityIndex: function(val, oldVal){
			this.cityChange();
		}
	}
})