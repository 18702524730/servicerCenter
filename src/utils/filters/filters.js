
/**
 * 过滤器
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
	var len = len - (s + '').length;
	for (var i = 0; i < len; i++) { s = '0' + s; }
	return s;
};

export default {
	getQueryStringByName: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		var context = "";
		if (r != null)
				context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	},
	formatDate: {
		//日期转yyyy-mm-dd格式
		format: function (date, pattern) {
			pattern = pattern || DEFAULT_PATTERN;
			return pattern.replace(SIGN_REGEXP, function ($0) {
				switch ($0.charAt(0)) {
					case 'y': return padding(date.getFullYear(), $0.length);
					case 'M': return padding(date.getMonth() + 1, $0.length);
					case 'd': return padding(date.getDate(), $0.length);
					case 'w': return date.getDay() + 1;
					case 'h': return padding(date.getHours(), $0.length);
					case 'm': return padding(date.getMinutes(), $0.length);
					case 's': return padding(date.getSeconds(), $0.length);
				}
			});
		},
		parse: function (dateString, pattern) {
			var matchs1 = pattern.match(SIGN_REGEXP);
			var matchs2 = dateString.match(/(\d)+/g);
			if (matchs1.length == matchs2.length) {
					var _date = new Date(1970, 0, 1);
					for (var i = 0; i < matchs1.length; i++) {
							var _int = parseInt(matchs2[i]);
							var sign = matchs1[i];
							switch (sign.charAt(0)) {
									case 'y': _date.setFullYear(_int); break;
									case 'M': _date.setMonth(_int - 1); break;
									case 'd': _date.setDate(_int); break;
									case 'h': _date.setHours(_int); break;
									case 'm': _date.setMinutes(_int); break;
									case 's': _date.setSeconds(_int); break;
							}
					}
					return _date;
			}
			return null;
		},
		//日期转时间戳
		timeStamp:function(date){
			var timestamp = Date.parse(new Date(date));
			timestamp = timestamp / 1000;
			return timestamp
		},
		//日期格式转换
		dateFormat: function (input,type) {
			if(input == null || input=='' || typeof(input) == "undefined"){
					return "--";
			}
			var _date = new Date(input);
			var year = _date.getFullYear();
			var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
			var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
			var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
			var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
			var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
			if(type == "date"){
					return year + "-" + month + "-" + day;
			} else if(type == "time") {
					return hour + ":" + minutes + ":" + seconds;
			} else {
					return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
			}
			return "--";
		},
    dateFormatYMD: function (input,type) {
      if(input == null || input=='' || typeof(input) == "undefined"){
          return "--";
      }
      var _date = new Date(input-0);
      var year = _date.getFullYear();
      var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
      var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
      var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
      var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
      var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
      if(type == "date"){
          return year + "-" + month + "-" + day;
      } else if(type == "time") {
          return hour + ":" + minutes + ":" + seconds;
      } else {
          return year + "-" + month + "-" + day;
      }
      return "--";
    }
	},
	//订单状态
	orderStatusformat: function (input) {
		var ret = ''
		switch (input+''){
			case '-1':
				ret = "已关闭";
				break;
			case '0':
				ret = "待付款";
				break;
			case '1':
				ret = "已付款";
				break;
			case '2':
				ret = "已完成";
				break;
		}
		return ret;
	},
  //渠道工单状态
  workOrderStatusformat: function (input) {
    var ret = ''
    switch (input+''){
      case '10':
        ret = "待提交";
        break;
      case '11':
        ret = "财务审核";
        break;
      case '12':
        ret = "平台审核";
        break;
      case '13':
        ret = "审核通过";
        break;
    }
    return ret;
  },
	orderStatus: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "待服务";
				break;
			case '2':
				ret = "服务中";
				break;
			case '3':
				ret = "服务完成";
				break;
			case '4':
				ret = "服务关闭";
				break;
		}
		return ret;
	},
	//支付状态
	payStatusformat: function (input) {
		var ret = ''
		switch (input+''){
			case 'null':
				ret = "--";
				break;
			case '-1':
				ret = "已关闭";
				break;
			case '0':
				ret = "未支付";
				break;
			case '1':
				ret = "已支付";
				break;
			case '-2':
				ret = "--";
				break;
		}
		return ret;
  },
  //支付类型
  payTypeFormat: function(input){
    var ret = ''
		switch (input+''){
			case 'null':
				ret = "--";
				break;
			case '1':
				ret = "支付宝";
				break;
			case '2':
				ret = "对公打款";
				break;
			case '3':
				ret = "其他";
        break;
      case '4':
        ret = "周期结算";
        break;
		}
		return ret;
  },
  //性别
  sex: function (input) {
    var ret = ''
    switch (input+''){
      case '1':
        ret = "男";
        break;
      case '2':
        ret = "女";
        break;
    }
    return ret;
  },
	//价格保留两位小数
	priceformat: function (input) {
		var ret = '';
		// input 有可能是数字0
		if (input !== null && input !== undefined) {
			ret = input - 0 +'';
			if(ret === '0'){
				ret = '--';
			}else{
				ret ='￥' + (ret-0).toFixed(2);
			}
    }else{
      ret = '--';
    }
    return ret;
  },
  // 售后状态
  refundState: function(txt){
    var ret = '';
    // input 有可能是数字0
    switch (txt +''){
      case '0':
        ret = "待审核";
        break;
      case '1':
        ret = "商家同意";
        break;
      case '2':
        ret = "商家驳回";
        break;
      case '3':
        ret = "退款完成";
        break;
      case '4':
        ret = "先行赔付";
        break;
		}
		return ret;
	},
	//价格转换为万元
	priceUnitFilter(td){
		var ret = td/10000+'';
		if(ret.indexOf('.') !== -1){
			ret = (ret-0).toFixed(2);
			ret = ret.replace(/((\.0{1,2})|0)$/, '');
		}
		return ret;
	},
	refundStateFilter1(input){
		var ret = ''
		switch (input+''){
			case '0':
				ret = "待受理";
				break;
			case '1':
				ret = "退款中";
				break;
			case '2':
				ret = "已退款";
				break;
			case '3':
				ret = "已驳回";
				break;
		}
		return ret;
	},
	notarizationStatusformat(input){
		var ret = ''
		switch (input+''){
			case '0':
				ret = "待存证";
				break;
			case '1':
				ret = "存证中";
				break;
			case '2':
				ret = "存证失败";
				break;
			case '3':
				ret = "存证成功";
				break;
		}
		return ret;
	},
	notarizationUsesformat(input){
		var ret = ''
		switch (input+''){
			case '1':
				ret = "电商维权";
				break;
			case '2':
				ret = "自媒体内容维权";
				break;
			case '3':
				ret = "设计作品未经授权发布";
				break;
			case '4':
				ret = "文字创作存证";
				break;
			case '5':
				ret = "美术作品存证";
				break;
			case '6':
				ret = "音乐作品存证";
				break;
			case '7':
				ret = "影像摄影存证";
				break;
			case '8':
				ret = "其他";
				break;
		}
		return ret;
	},
	fileSizeFilter(v){
		if (!v) {
			return '';
		}
		var ret = v;
		if (v > 1024*1024) {
			ret = (ret/1024/1024).toFixed(1) + 'M';
		}else{
			var t = (ret/1024).toFixed(1);
			ret = (t === '0.0' ? '0.1' : t) + 'KB';
		}
		return ret;
	},
	formatPatent:{
		//专利类型转换
		format: function (input) {
			if(input == null || input=='' || typeof(input) == "undefined"){
				return "";
			}else{
				switch (input){
					case 1:
							return "发明专利";
					case 2:
							return "实用新型专利";
					case 3:
							return "外观设计专利";
				}
			}
		}
	},
	formatIPRClassify:{
		//知产分类转换
		format: function (input) {
			switch (input){
				case 0:
					return "商标";
				case 1:
					return "专利";
			}
		}
	},
	formatStatus:{
		//会员状态转换
		format: function (input) {
			switch (input){
				case false:
					return 0;
				case true:
					return 1;
			}
		}
	},
	//申请主体类型
	subjectTypeFormat(input) {
		switch (input){
			case 1:
				return "大陆个体";
			case 2:
				return "大陆企业";
			case 3:
				return "港澳台及境外个人";
			case 4:
				return "港澳台及境外企业";
		}
	},
	//申请主体类型
	invoiceTypeFormat(input) {
		switch (input){
			case 1:
				return "增值税普通发票";
			case 2:
				return "增值税专用发票";
		}
	},
	titleLengthFormat (input, num) {
		if (input && input.length>num+1) {
			return input.slice(0,num)+'...';
		}
		return input;
	},
	additionItemPayStatus(input) {
		switch (input){
			case 0:
				return "";
			case 1:
				return "待支付";
			case 2:
				return "已支付";
			case 3:
				return "--";
		}
	},
  //主体信息显示
  mainBodeSbj(input) {
    switch (input){
      case 1:
        return "申请人";
      case 2:
        return "企业";
      case 3:
        return "申请人";
      case 4:
        return "企业";
      case 5:
        return "申请人";
    }
  },
  // 开票信息
  mainBodeNumber(input) {
    switch (input){
      case 1:
        return "申请人身份证号";
      case 2:
        return "企业营业执照号";
      case 3:
        return "申请人护照号";
      case 4:
        return "";
      case 5:
        return "申请人身份证号";
    }
  },
  fileStateName: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "申请回执";
				break;
			case '2':
				ret = "受理通知书";
				break;
			case '3':
				ret = "不予受理通知书";
				break;
			case '4':
				ret = "初审公告书";
				break;
			case '5':
				ret = "部分驳回通知书";
				break;
			case '6':
				ret = "驳回通知书";
				break;
			case '7':
				ret = "注册公告";
				break;
			case '8':
				ret = "部分异议通知书";
				break;
			case '9':
				ret = "异议通知书";
				break;
			case '10':
				ret = "注册证";
				break;
			case '11':
				ret = "未办理驳回复审";
				break;
			case '12':
				ret = "驳回复审决定书";
				break;
			case '13':
				ret = "驳回复审不通过";
				break;
			case '14':
				ret = "未办理异议答辩";
				break;
			case '15':
				ret = "异议答辩通过";
				break;
			case '16':
				ret = "异议答辩不通过";
				break;
			case '17':
				ret = "初审公告书";
				break;
			case '18':
				ret = "退款告知函";
				break;
			case '99':
				ret = "办理终止";
				break;
		}
		return ret;
	},
  statusLabel(input) {
    switch (input){
      case 0:
        return "待提交";
      case 1:
        return "已提交待确认";
      case 2:
        return "加项待付款";
      case 3:
        return "待审核";
      case 4:
        return "已审核";
      case 5:
        return "审核不通过被驳回";
    }
  },
  // 创新保
  cxbPayStatus(input) {
    switch (input){
      case 0:
        return "未支付";
      case 1:
        return "已支付";
    }
  },
  cxbReview(input) {
    switch (input){
      case 1:
        return "待反馈";
      case 2:
        return "通过";
      case 3:
        return "不通过";
    }
  },
  cxbApply(input) {
    switch (input){
      case 1:
        return "通过率确认";
      case 2:
        return "支付";
      case 3:
        return "提交注册资料";
      case 4:
        return "申请号回执单";
      case 5:
        return "受理通知书";
      case 6:
        return "初步审定通知";
      case 7:
        return "初步审定公告";
      case 8:
        return "核准注册公告";
      case 9:
        return "核准注册通知";
    }
  },
  cxbState(input) {
    switch (input){
      case 1:
        return "待材料评审";
      case 2:
        return "评审不通过";
      case 3:
        return "已评审待确认";
      case 4:
        return "已确认待上报";
      case 5:
        return "已上报待审核";
      case 6:
        return "申报中";
      case 7:
        return "审核不通过";
      case 8:
        return "申报结束";
    }
  },
  cxbDownTxt(input) {
    switch (input){
    	case null:
        return "未上传";
      case 1:
        return "未上传";
      case 2:
        return "未下载";
      case 3:
        return "已下载";
    }
  },
  // 创新保工单状态
  cxbStatusF(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "待材料评审";
        break;
      case '2':
        ret = "评审不通过";
        break;
      case '3':
        ret = "已评审待确认";
        break;
      case '4':
        ret = "已确认待上报";
        break;
      case '5':
        ret = "已上报待审核";
        break;
      case '6':
        ret = "申报中";
        break;
      case '7':
        ret = "审核不通过";
        break;
      case '8':
        ret = "申报结束";
        break;
    }
    return ret;
  },
  fileName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "申请人身份证";
        break;
      case '2':
        ret = "企业营业执照副本复印件";
        break;
      case '3':
        ret = "申请人护照";
        break;
      case '4':
        ret = "企业登记证件";
        break;
    }
    return ret;
  },
  licenseName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "个体工商户营业执照";
        break;
      case '2':
        ret = "";
        break;
      case '3':
        ret = "中文护照译本";
        break;
      case '4':
        ret = "企业登记证件译本";
        break;
    }
    return ret;
  },
  downFileName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "不予受理通知书";
        break;
      case '2':
        ret = "受理通知书";
        break;
      case '3':
        ret = "不予受理通知书";
        break;
      case '4':
        ret = "注册公告";
        break;
      case '5':
        ret = "注册证";
        break;
    }
    return ret;
  },
  //
  moneyType:function(input){
		var ret = ''
    switch (input+''){
      case '0':
        ret = "线下";
        break;
      case '1':
        ret = "线上";
        break;
    }
    return ret;
  },
  // 退款状态
  refundStateFilter:function(input){
		var ret = ''
    switch (input+''){
      case '0':
        ret = "待审核";
        break;
      case '1':
        ret = "商家同意";
        break;
      case '2':
        ret = "商家驳回";
        break;
      case '3':
        ret = "退款完成";
        break;
      case '4':
        ret = "先行赔付";
        break;
    }
    return ret;
  },
  replaceBank:function(input){
  	var ret = '';
  	let num = input.slice(-14,15);
  	ret = input.replace(num,'**********');
  	return ret;
  },
  replaceCode:function(input){
  	var ret = '';
  	let num = input.slice(4,14);
  	ret = input.replace(num,'**********');
  	return ret;
  },
  replacePhone:function(input){
  	var ret = '';
  	let num = input.slice(3,7);
  	ret = input.replace(num,'****');
  	return ret;
  },
  orderCheckAcceptFilter(input){
		var ret = ''
    switch (input+''){
      case '0':
        ret = "未发起验收";
        break;
      case '1':
        ret = "服务验收中";
        break;
      case '2':
        ret = "服务已验收";
        break;
      case '3':
        ret = "验收不通过";
        break;
    }
    return ret;
  },
  groundStatus: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "已上架";
        break;
      case '2':
        ret = "未上架";
        break;
      case '3':
        ret = "已下架";
        break;
    }
    return ret;
  },
  verifyStatus: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "审核通过";
        break;
      case '2':
        ret = "审核未通过";
        break;
    }
    return ret;
  },
  priceType(data){// 售价类型
    var ret = ''
    switch (data+''){
      case '1':
        ret = "一口价";
        break;
      case '2':
        ret = "可议价";
        break;
      case '3':
        ret = "面议";
        break;
    }
    return ret;
  },
  saleStatus(data){// 销售状态
    var ret = ''
    switch (data+''){
      case '1':
        ret = "待售";
        break;
      case '2':
        ret = "预订";
        break;
      case '3':
        ret = "已售";
        break;
      case '4':
        ret = "不可出售";
        break;
      case '5':
        ret = "交易中";
        break;
    }
    return ret;
  },
  paymentState(data){// 交易部分销售状态
    var ret = ''
    switch (data+''){
      case '-1':
        ret = "已关闭";
        break;
      case '0':
        ret = "待付款";
        break;
      case '1':
        ret = "已付款";
        break;
      case '2':
        ret = "已完成";
        break;
    }
    return ret;
  },
  trademarkStatus(data){// 商标状态
    var ret = ''
    switch (data+''){
      case '0':
        ret = "销亡";
        break;
      case '1':
        ret = "待审中";
        break;
      case '2':
        ret = "已注册";
        break;
      case '3':
        ret = "已驳回";
        break;
      case '4':
        ret = "已初审";
        break;
    }
    return ret;
  },

  trademarkComby(data){// 商标组合
    var ret = ''
    switch (data+''){
      case '1':
        ret = "中文";
        break;
      case '2':
        ret = "字母";
        break;
      case '3':
        ret = "图形";
        break;
      case '4':
        ret = "数字";
        break;
      case '5':
        ret = "组合";
        break;
    }
    return ret;
  }
};

