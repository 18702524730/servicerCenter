<template>
	<div class="welcome" :style="{'height': height + 'px', 'min-height': '622px','padding-top': (height - 430) / 2 > 90 ? (height - 430) / 2 + 'px' : '90px'}">
		<div class="welcome_container">
			<h2>欢迎加入拾贝商家中心！</h2>
			<p>请完善以下资料后，店铺将自动开通</p>
			<ul class="clearfix">
				<li>
					<p>填写基本资料</p>
					<router-link class="el-button el-button--default el-button--small" to="/fillData/basicData">{{!basicInfo.basicStatus ? '立即填写' : '修改'}}</router-link>
				</li>
				<li class="person_authent">
					<p>{{basicInfo.spType == 2 ? '个人实名认证' : '机构实名认证'}}</p>
					<!-- /fillData/companyAuth -->
					<router-link v-if=" basicInfo.nameStatus == 2 || !basicInfo.nameStatus" class="el-button el-button--default el-button--small"
					:to="basicInfo.spType == 2 ? '/fillData/realNameIdentification' : '/fillData/companyAuth'">{{ !basicInfo.nameStatus ? '立即认证' : '修改'}}</router-link>
					<el-button v-else disabled size="small">立即认证</el-button>
					<label class="success" v-if="basicInfo.nameStatus==3"><i class="el-icon-success"></i>审核通过</label>
					<label class="error" v-if="basicInfo.nameStatus==2"><i class="el-icon-error"></i>审核不通过</label>
					<label class="info" v-if="basicInfo.nameStatus==1"><i class="el-icon-info"></i>审核中</label>
				</li>
				<li>
					<p>填写服务范围</p>
					<router-link class="el-button el-button--default el-button--small" to="/fillData/serviceManage">{{!basicInfo.rangeContent ? '立即填写' : '修改'}}</router-link>
				</li>
			</ul>
			<el-button :disabled="!goOpenMall" size="small" @click="goIndexFn">开通店铺</el-button>
		</div>

	</div>
</template>

<script>
	const codeImgUrl = CONFIG.rootUrl+'/servlet/captchaCode?t=';
	const loginUrl = './api/login';
	import {store} from 'utils/';
	import qs from 'qs';
	export default{
		name: 'wechar_bind',
		data() {
			return {
				indexUrl: CONFIG.indexUrl,
				height: '622',
				imageCode:'',
				basicInfo: '',
				errMsg:'',
				formData:{
					account:'',
					pwd:'',
					code:''
				},
				wxInfo:{},
				goOpenMall: false, //开通店铺
			}
		},
		methods:{
			imgCode(){
		      this.imageCode = codeImgUrl+Math.random();
		    },
		    bindLogin(){
		    	if(this.formData.account.trim()==''||this.formData.account==null)
		    	{
		    		this.errMsg='商家账号不能为空';
		    		return false;
		    	}
		    	if(this.formData.pwd.trim()==''||this.formData.pwd.length<6||this.formData.pwd.length>20)
		    	{
		    		this.errMsg='密码不能为空且长度在6到20';
		    		return false;
		    	}
		    	if(this.formData.code.trim()=='')
		    	{
		    		this.errMsg='验证码不能为空';
		    		return false;
		    	}
		    	var postData={};
		    	postData.captcha=this.formData.code;
		    	postData.name=this.formData.account;
		    	postData.password=this.formData.pwd;
		    	postData.openid=this.wxInfo.openid;
		    	this.$http.post(loginUrl, postData)
			      .then((resp) => {
			        this.$router.push({name: 'index'});
			      })
			      .catch((err) => {
			        this.errMsg = err.msg;
			        this.imgCode();
			      });
		    },
				search () {
					this.$http.get('./api/service_info')
					.then((resp) => {
						this.basicInfo = resp.data;
						if (this.basicInfo.basicStatus && this.basicInfo.nameStatus==3 && this.basicInfo.rangeContent) {
							this.goOpenMall = true;
						}
						else{
							this.goOpenMall = false;
						}
					})
					.catch((err) => {
						console.log(err.data.msg);
					});
				},
				// 开通店铺
				goIndexFn () {
					if (this.goOpenMall) {
						this.$router.push({path: '/shop/shopManage/basicinfo'});  //去店铺首页
					}
				}
		},
		mounted(){
			this.wxInfo=store.get('wxInfo');
			this.height = document.documentElement.clientHeight - 52 - 40 - 60 -50
			this.imgCode();
			this.search();
		}
	}
</script>

<style lang="less">
 .welcome{
	 min-height: 622px;
	 background: #fff;
	.welcome_container{
		width: 990px;
		margin: 0 auto;
		text-align: center;
		h2{font-size: 20px;line-height: 26px;}
		>p{font-size: 14px;line-height: 20px;padding: 10px 0 50px;color: #7F8FA4;}
		>ul{
			padding-bottom: 30px;
			li{float: left;margin: 0 15px;width: 300px;height: 260px;border:1px solid rgba(223,226,229,1);
				a{color: #3DB1FA;
					&:hover{text-decoration: none;}
				}
				p{color: #234;font-size: 16px;line-height: 22px;padding: 90px 0 15px;font-weight: 600;}
				&.person_authent{position: relative;
					label{padding: 3px 4px;line-height: 12px;font-size: 12px;top: 30px;left: 110px;position: absolute;border: 1px solid #eee;border-radius: 10px;
						i{padding-right: 2px;}
						&.success{color: #36AF47;border: 1px solid #36AF47;background:rgba(232,255,235,1);}
						&.error{color: #F64744; background:rgba(255,237,237,1);border: 1px solid #F64744;left: 105px;}
						&.info{color: #F5A623;background-color: rgba(255,245,229,1);border: 1px solid #F5A623;left: 115px;}
					}
				}
			}
		}
	}
 }


</style>
