<template>
	<div class="winBind">
		<!--<head-nav></head-nav>-->
		 <header class="head-nav">
		    <div class="fl">
		    	<a class="logo" :href="indexUrl">商家中心</a>
		    </div>
		    <div class="fr rightCol">
			   <a :href="indexUrl" target="_blank" class="fr">首页</a>
		    </div>
		  </header>
		<div class="wechar_login">
			<h3>
				<img width="48px" height="48px" :src="wxInfo.headimgurl">
				<span>您好，{{wxInfo.nickname}}</span>
			</h3>
			<div class="loginForm">
				<ul>
					<li><input v-model="formData.account" type="text" placeholder="请输入服务商账号"></li>
					<li><input v-model="formData.pwd" type="password" placeholder="请输入登录密码"></li>
					<li>
						<input v-model="formData.code" type="text" class="verificationCode" placeholder="请输入校验码">
						<span class="imgcode">
	                    <img :src="imageCode" @click="imgCode" alt="">
	                    <img src="../../assets/img/login/gx.png" class="refresh" @click="imgCode">
	                  </span>
	                  <p class="err">{{errMsg}}</p>
					</li>
					<li><input type="submit" name="" id="" @click="bindLogin" value="绑定并登录" /></li>
					<li><a :href="indexUrl+loginUrl" class="returnLast">返回上一层</a></li>
				</ul>
			</div>
		</div>
		 <footer>
			<img class="fl" src="~assets/img/layout/caasa1.png" height="27">
			<p class="fl">杭州拾贝知识产权服务有限公司为中国产学研合作促进会反侵权假冒创新战略联盟理事长单位<br> Anti-Infringement and Anti-Counterfeit Innovation Strategic Alliance</p>
			<div class="fr copyright">© 2018 拾贝公司 All Rights Reserved</div>
	      </footer>
	</div>
</template>

<script>
	const codeImgUrl = CONFIG.rootUrl+'/servlet/captchaCode?t=';
	const loginUrl = './api/login';
	import {store} from 'utils/';
	import qs from 'qs';
	export default{
		name:'wechar_bind',
		data(){
			return{
				indexUrl: CONFIG.indexUrl,
				imageCode:'',
				errMsg:'',
				formData:{
					account:'',
					pwd:'',
					code:''
				},
				wxInfo:{},
				loginUrl:'/#/login'
				
			}
		},
		methods:{
			imgCode(){
		      this.imageCode = codeImgUrl+Math.random();
		    },
		    bindLogin(){
		    	if(this.formData.account.trim()==''||this.formData.account==null)
		    	{
		    		this.errMsg='服务商账号不能为空';
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
		
		},
		mounted(){
			this.wxInfo=store.get('wxInfo');
			this.imgCode();
		}
	}
</script>

<style lang="less" scoped>
 .winBind{
 	a.fr{line-height: 60px;color: #fff; font-size: 14px; margin-right: 200px;cursor: pointer;text-decoration: none;}
 	.wechar_login{
 		width: 1100px;height: 500px;background-color: #fff;text-align: center;margin: 120px auto;padding-top: 50px;
 		ul>li{position: relative; margin-bottom: 20px;
 			p.err{text-align: left;padding-left: 370px;color: #f54845;}
 		}
 		.loginForm{margin-top: 50px;
 			input[type="text"],input[type="password"]{ width: 360px;height: 40px;line-height: 40px;font-size: 14px;padding-left: 5px;}
 			input[type="submit"]{font-size: 16px;border-radius:3px ;height: 45px;width: 360px;background-color: #3db1fa;color: #fff;border: 0;}
 			input.verificationCode{padding-right: 110px;}
 			.returnLast{color: #999;font-size: 14px;}
 			.imgcode{position: absolute; left: 620px;top:6px}
 			.refresh{cursor: pointer;}
 		}
 	}
 	
 	 footer{
    	 position: fixed;left:0;bottom: 0; width:100%; height: 60px;background-color: #fff;color: #A8AFB5;border-top: 1px solid #DFE2E5;
    	img{margin-left: 20px;margin-top: 17px;}
    	p{padding-top:14px;line-height: 16px;padding-left: 10px;}
    	.copyright{line-height: 60px; padding-right: 20px;}
    }
 }

 
</style>