<template>
	<div class="real_name_identification">
		<div class="content_box">
			<div class="pub_back_tit">
        <router-link class="back_box fl" to="/fillData/welcome">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
          <span class="text" >返回</span>
        </router-link>
	      <span>个人实名认证</span>
			</div>
			<p class="tips">为了您的信息安全及存证的合法性，请填写您的个人信息，进行银联四要素实名验证。实名验证后，信息不可修改。</p>
			<div class="i_content">
				<ul class="steps slearfix" >
          <li v-for="(item, index) in stepsData" :class="{cur: step === (index+1), 'done': (index+1)<step}">
            <p class="num_box"><span class="num">{{ index+1 }}</span></p>
            <p class="step_name">{{ item }}</p>
          </li>
        </ul>
   			<!-- 第一步 -->
				<el-form :model="stepOneForm" :rules="rules1" ref="stepOneForm" label-width="150px" label-position="left" class="demo-ruleForm" v-if="step==1">
				  <el-form-item label="姓名" prop="name">
				    <el-input v-model="stepOneForm.name" placeholder="姓名"></el-input>
				  </el-form-item>
					<el-form-item label="身份证号" prop="idCardNo">
				    <el-input v-model="stepOneForm.idCardNo" placeholder="身份证号"></el-input>
				  </el-form-item>
				  <el-form-item label="银行卡号" prop="bankCardNo">
				    <el-input v-model="stepOneForm.bankCardNo" placeholder="银行卡号"></el-input>
				  </el-form-item>
				  <el-form-item label="银行卡预留手机号" prop="phone" >
				    <el-input v-model="stepOneForm.phone" placeholder="银行卡预留手机号" :maxlength="11"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="saveFirstFn('stepOneForm')">下一步</el-button>
				  </el-form-item>
				</el-form>
				<!-- 第二步 -->
				<el-form :model="stepTwoForm" :rules="rules2" ref="stepTwoForm" label-width="150px" label-position="left" class="demo-ruleForm" v-if="step==2">
				  <el-form-item label="银行卡预留手机号" >
				    <el-input v-model="stepOneForm.phoneStar" class="no_border" disabled></el-input>
				  </el-form-item>
					<el-form-item label="验证码" prop="code" class="input_code">
				    <el-input v-model="stepTwoForm.code" placeholder="请输入验证码"></el-input>
				    <span class="getCode" :class="{disabled: preventCode}" @click.prevent="getCode" :maxlength="6">{{codeText}}</span>
				  </el-form-item>
				  <el-form-item label="" style="position: relative;margin-bottom: 10px;">
	          <el-checkbox v-model="checked">我已阅读并同意<a :href="cartUrl + '/shop/pages/enterAgreement.html?name='+ stepOneForm.name" target="_blank">《拾贝网商家入驻合作协议》</a></el-checkbox>
	        </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="saveSecondFn('stepTwoForm')">下一步</el-button>
				  </el-form-item>
				</el-form>
				<!-- 第3步 完成 -->
        <div class="step_over" v-if="step === 3">
          <img src="~assets/img/icon/find_success.png">
          <p>实名认证成功!</p>
          <el-button size="medium" type="primary" class="submit_btn" @click.prevent="backFn">返回</el-button>
        </div>
			</div>
		</div>

	</div>
</template>

<script>
	const cartUrl = CONFIG.cartUrl;
	let authUrl = CONFIG.userUrl+'/api/member/auth';  //个人资质认证
	let getCodeUrl = CONFIG.userUrl + '/api/member/authCode';  //发送资质认证短信
	let authSucUrl = CONFIG.userUrl + '/api/member/authSuc';  //和人实名认证成功
	if (location.host.indexOf('localhost') === 0) {
		getCodeUrl = 'https://testuser.ipsebe.com/api/member/authCode';
		authUrl = 'https://testuser.ipsebe.com/api/member/auth';
	}

	import {store} from 'utils/';
	import qs from 'qs';

	export default{
		name:'wechar_bind',
		data(){
			var validatePhone = (rule, value, callback) => {
        if (!/^1[0-9]{10}$/.test(value) || value.length!=11) {
          callback(new Error('请输入格式争取的手机号码'));
        } else {
          callback();
        };
      }
      let validateCaptcha = (rule, value, callback) => {
        if (!/^\w{6}$/.test(value)) {
          callback(new Error('请输入6位数字或字母的验证码'));
        } else {
          callback();
        };
      }
			return{
				cartUrl: cartUrl,
    		checked: false,
				indexUrl: CONFIG.indexUrl,
				check: true,
				textarea3: '',
				stepsData:['填写实名认证', '手机验证', '完成'],
				step: 1,
				codeText:'发送验证码',
				preventCode: false,
				stepOneForm: {
          name: '',
          idCardNo: '',
          bankCardNo: '',
          phone: ''
        },
        stepTwoForm: {
        	code: ''
        },
        rules1: {
          name: [
            { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
          ],
          idCardNo: [
            { required: true, message: '请输入身份证号', trigger: 'change' }
          ],
          bankCardNo: [
            { required: true, message: '请输入银行卡号', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入银行预留手机号', trigger: 'change' },
            { validator: validatePhone, trigger: 'blur'}
          ]
        },
        rules2: {
        	code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { validator: validateCaptcha, trigger: 'blur'}
          ],
        },
        identificationData: {},  //认证数据
        store: store,
			}
		},
		methods:{
			// 返回
			backFn () {
				this.$router.go(-1);
			},
			//获取手机验证码
      getCode(){
        var self = this;
        if (self.preventCode) {
          return;
        }
        self.preventCode = true;
        self.$http.get(getCodeUrl, {params: {phone: self.stepOneForm.phone}})
        .then((response) => {
          console.log(response.data)
          var data = response.data;
          self.$message('验证码已发送，30分钟内有效。');
          self.timeout();
        })
        .catch((error) => {
          var data = error.response.data;
          self.ver_tip = data.msg;
          self.$message(data.msg);
          //self.submitDisabled = false;
          //self.$message(data.msg)
        });
      },
      timeout(){
        var self = this;
        var second = 60, timer;
        self.preventCode = true;
        timer = setInterval(function(){
          if(second<=0){
            clearInterval(timer);
            second = 60;
            self.codeText = "重发验证码";
            self.preventCode = false;
          }else{
            self.codeText = second + "s后可重发";
            self.preventCode = true;
            second--;
          }
        }, 1000);
      },
      // 第一个下一步
      saveFirstFn (formName) {
      	let self = this;
      	self.$refs[formName].validate( (valid) => {
      		if (valid) {
      			self.identificationData = self.stepOneForm;
      			let parmas = {
      				name: self.identificationData.name,
      				phone: self.identificationData.phone,
      				bankCardNo: self.identificationData.bankCardNo,
      				idCardNo: self.identificationData.idCardNo,
      				operatorId: store.get('userinfo').operator_id   //子账号ID
      			}
      			self.$http.post(authUrl, parmas)
      			.then( (resp) => {
      				if (resp.data.true) {
		      			self.step = 2;  //第二步
				      	self.stepOneForm.phoneStar = self.stepOneForm.phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2')
      				}
      				else{
      					self.$message('信息错误，实名认证失败');
      				}
      			})
      		}
      	})
      },
      // 第二个下一步
      saveSecondFn (formName) {
      	let self = this;
      	console.log(this);
      	self.$refs[formName].validate( (valid) => {
      		if (valid) {
      			if (!this.checked) {
	        		this.$message.error('请阅读并同意《拾贝网商家入驻合作协议》');
	        		return;
	        	}
      			self.identificationData.code = self.stepTwoForm.code;
      			self.identificationData.phoneStar = null;
      			let parmas = {
      				name: self.identificationData.name,
      				phone: self.identificationData.phone,
      				bankCardNo: self.identificationData.bankCardNo,
      				idCardNo: self.identificationData.idCardNo,
      				code: self.identificationData.code,
      				operatorId: store.get('userinfo').operator_id   //子账号ID
      			}
      			self.$http.post(authSucUrl, parmas)
      			.then( (resp) => {
      				if (resp.data.true) {
      					self.step = 3;  //第二步
      				}
      				else{
      					self.$message('信息错误，实名认证失败');
      				}
      			})
      		}
      	})
      },
			// 查询一级服务类目
			getServiceList () {

			}
		},
		mounted(){

		}
	}
</script>

<style lang="less" >
	.real_name_identification{
		min-height: 762px;
	  background: #fff;
	  .content_box	{
	 		width: 1080px; height: auto; margin:0 auto; padding: 90px 0;
			.tips {width: 100%; height: 40px; line-height: 40px; margin-top: 40px; background: #FFF5E5; text-align: center; color: #AD710E; font-size: 14px; }
			.i_content {
				width: 400px; margin: 0 auto; padding-top: 40px;
	      /* 步骤条 */
		    .steps{
		      width: 540px; margin:0 auto 40px auto; height:60px; font-size:16px;
		      li{
		        box-sizing: content-box;
		        width:115px;
		        height:58px;
		        line-height: 58px;
		        padding-left:20px;
		        position: relative;
		        margin-bottom: -1px;
		        display: inline-block;
		        .num_box {
		          width: 100%; text-align:center; height: 30px; line-height: 30px; margin-bottom: 10px;
		          .num {
		            width: 30px; height: 30px; line-height: 30px; display: inline-block; background: #eee; text-align: center; font-size: 14px; color: #999; border-radius:50%; position: relative;
		            &:before {content:''; position:absolute; right:30px; top:15px; width: 60px; height:1px; background: #E6E6E6; }
		            &:after {content:''; position:absolute; left:30px; top:15px; width: 60px; height:1px; background: #E6E6E6; }
		          }
		        }
		        .step_name {width: 100%; text-align: center; font-size: 14px; color: #999; line-height: 20px;}
		        &:first-child {
		          .num_box {
		            .num {
		              &:before {width:0;}
		            }
		          }
		        }
		        &:last-child {
		          .num_box {
		            .num {
		              &:after {width:0;}
		            }
		          }
		        }
		      }
		      li.cur{
		        .step_name {color:#3db1fa; }
		        .num_box {
		          .num {
		            background-color: #3db1fa; color:#fff;
		            &:before {background-color: #3db1fa;}
		            &:after {background-color: #3db1fa;}
		          }
		        }
		      }
		      li.done {
		        .step_name {color:#333; }
		        .num_box {
		          .num {
		            background-color: #3db1fa; color:#fff;
		            &:before {background-color: #3db1fa;}
		            &:after {background-color: #3db1fa;}
		          }
		        }
		      }
		      li:last-child{
		        width:95px;
		        padding-left:40px;
		      }
		    }
		    .no_border {
		    	.el-input__inner {border: none; background-color: #fff !important;}
		    }
		    .input_code {
		    	position: relative;
					.getCode {position: absolute; right: 15px; top: 0; color: #3DB1FA; cursor: pointer;}
					.disabled {color: #999;}
		    }
		    .step_over{
		      width:300px; margin:0 auto; padding-top: 43px; text-align: center;
		      img {width:40px; height:40px;}
		      p{;font-size:16px; margin: 10px auto 20px auto; color: #333; font-size: 18px; text-align: center;}
		    }
			}
		}
	}


</style>
