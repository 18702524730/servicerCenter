var gbs={
	host: '/iprp_servicer', //接口根地址。
	db_prefix: 'sebe_sp_', //本地存储的key

	//状态码字段
	api_status_key_field:'status',
	//状态码value
	api_status_value_field:200,

	//存放数据的字段
	api_data_field:'data',

	api_custom:{
		404:function (res) {
			this.$store.dispatch('remove_userinfo').then(() => {
				this.$alert(res.status + ',' + res.msg + '！', '登录错误', {
					confirmButtonText: '确定',
					callback: action => {
					}
				});
			});
		}
	}
};

import VueCookie from 'vue-cookie';
var cbs={
	/**
	 * ajax请求成功，返回的状态码不是200时调用
	 * @param  {object} err 返回的对象，包含错误码和错误信息
	 */
	statusError(err) {
		var self = spVue;
		if (err.status == 401) {
			let phone = VueCookie.get('phone');
			if (phone) {
				self.$http.get(`${CONFIG.userUrl}/api/member/phone/${phone}/exists`)
				.then( (resp) => {
					let data = resp.data;
					if (data.invitedAccepted) {   //子账号
						//去统一登录页面
						location.href = CONFIG.userUrl+'/iprp/#/access/login?return_url=' + decodeURIComponent(location.href);
					}
					else{  //主账号
						if (!data.applyExist && !data.spExists) {
							console.log('您还未入驻成为拾贝商家！')
							self.$router.replace({path: '/noPermission', query:{status: 1}});  //没权限页面
							return
						}
						else if (data.applyExist && !data.spExists) {
							console.log('您提交的商家入驻申请正在审核中，请耐心等待。')
							self.$router.replace({path: '/noPermission', query:{status: 2}});  //没权限页面
							return
						}
						else{
							//去统一登录页面
							location.href = CONFIG.userUrl+'/iprp/#/access/login?return_url=' + decodeURIComponent(location.href);
						}
					}
				})
			}
			else{
				//去统一登录页面
				location.href = CONFIG.userUrl+'/iprp/#/access/login?return_url=' + decodeURIComponent(location.href);
			}

			// 还不是商家用户,去商家入驻页面
			// if (self.$route.query.isBusinessUser === 'false') {
			// 	self.$router.push({name: 'general'});  //这种情况是还不是商家用户，具体在哪个阶段还不知道，所以默认跳转首页，在公共头部有判断到底是哪种状态
			// 					// 本地环境
			// 	// if (location.host.indexOf('localhost') === 0 || /^\d{1,3}\.[^]*/.test(location.host)) {
			// 	// 	location.href = 'http://localhost:9002/sebe/pages/facilitator.html';
			// 	// }
			// 	// else{  //其他环境
			// 	// 	location.href = CONFIG.wwwUrl+'/sebe/pages/facilitator.html';
			// 	// }
			// }
			// else {   //去统一登录页面
			// 	// 本地环境
			// 	if (location.host.indexOf('localhost') === 0 || /^\d{1,3}\.[^]*/.test(location.host)) {
			// 		location.href = 'http://localhost:9002/iprp_portal/iprp/#/access/login?return_url=' + decodeURIComponent(location.href);
			// 	}
			// 	else{
			// 		location.href = CONFIG.userUrl+'/iprp/#/access/login?return_url=' + decodeURIComponent(location.href);
			// 	}
			// }
			// // self.$router.push('/invalid');
			// return;

		}else if(err.status == 403){
			self.$router.push('/noPermission');
			return;
		}
		return Promise.reject(err);
	},

	/**
	 * ajax请求网络出错时调用
	 */
	requestError(err) {
		this.$message({
			showClose: true,
			message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
			type: 'error'
		});
	}
};

export {
	gbs,
	cbs
};
