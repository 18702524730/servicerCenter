<template>
	<div class="updata_pwd">
		<p class="mb20">修改密码</p>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="原密码" prop="password" label-width="80px">
		    <el-input type="password" v-model="ruleForm.password" placeholder="请输入原密码" :maxlength="32"></el-input>
		  </el-form-item>

		  <el-form-item label="新密码" prop="newpassword" label-width="80px">
		    <el-input type="password" v-model="ruleForm.newpassword" placeholder="请输入新密码" :maxlength="32"></el-input>
		    <span class="prpt ml5">密码由6-32位字符组成，请注意区分大小写</span>
		  </el-form-item>

		  <el-form-item label="确认密码" prop="confirmpassword" label-width="80px">
		    <el-input type="password" v-model="ruleForm.confirmpassword" placeholder="请再次输入密码" :maxlength="32"></el-input>
		    <span class="prpt ml5">密码由6-32位字符组成，请注意区分大小写</span>
		  </el-form-item>
		</el-form>
		<button class="save_btn" @click="submitForm('ruleForm')">保存</button>
	</div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import Filters from 'utils/filters/'
const wwwUrl = CONFIG.wwwUrl;
const wxUrl = CONFIG.wxUrl;
const rootUrl = CONFIG.rootUrl;
const passwordReg = /^[a-zA-Z0-9\-~`!@#\$%\^&\*\(\)_\+-=\{\}\|\[\]\\:”;’<>,\.\/]{6,32}$/;
// 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');
export default {
	components: {
  },
  data () {
  	var newpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.confirmpassword !== '') {
          this.$refs.ruleForm.validateField('confirmpassword');
        }
        callback();
      }
    };
  	var confirmpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let pwd = (rule, value, callback) =>{
      if (!value) {
          return callback(new Error('请输入密码'));
      }
      setTimeout(() => {
        if (!passwordReg.test(value)) {
          callback(new Error('密码为6~32位英文字母、数字或特殊符号'));
        } else {
          callback();
        }
      }, 200);
    };
    let apwd = (rule, value, callback) =>{
      if (!value) {
          return callback(new Error('请再次输入密码'));
      }
      setTimeout(() => {
        if (!passwordReg.test(value)) {
          callback(new Error('密码为6~32位英文字母、数字或特殊符号'));
        } else {
          callback();
        }
      }, 200);
    };
    return {
    	ruleForm:{
    		password:'',
    		newpassword:'',
    		confirmpassword:''
    	},
    	rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 32, message: '密码为6~32位英文字母、数字或特殊符号', trigger: 'blur' }
        ],
        newpassword: [
          { type: "string",validator:pwd, required: true,trigger: 'blur' },
        	{ min: 6, max: 32, message: '密码为6~32位英文字母、数字或特殊符号', trigger: 'blur' },
          { validator: newpassword, trigger: 'blur' }
        ],
        confirmpassword: [
        	{ type: "string",validator:apwd, required: true,trigger: 'blur' },
        	{ min: 6, max: 32, message: '密码为6~32位英文字母、数字或特殊符号', trigger: 'blur' },
          { validator: confirmpassword, trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
		submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put('./api/update_password',{
          	newPassword:this.ruleForm.newpassword,
          	password:this.ruleForm.password
          })
          .then((resp) => {
		        this.$router.push({name: 'login'});
		      })
		      .catch((err) => {
		      	this.$message.error(err.msg);
		        console.log(err);
		      });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    var FauxPlaceholder = function(){
      if(!ElementSupportAttribute('input','placeholder')) {
        $("[placeholder]")
          .focus(function() {
            var input = $(this);
            input.next().hide();
          })
          .blur(function() {
            var input = $(this);
            if (input.val() == "") {
              input.next().show();
            }
          }).after('<span class="placeholder"></span>');
          $(".placeholder").click(function(){
            var input = $(this).prev().focus();
          }).html(function(){
            return $(this).prev().attr('placeholder');
          });
      }
    };
    setTimeout(function(){
      FauxPlaceholder();
    },300);
  }
}
</script>
<style lang='less'>
	.updata_pwd{padding:20px;
		>p{font-size: 14px;color: #223344;}


		.demo-ruleForm{text-align:left;
			label{text-align:left;}
			.el-input{width: 240px;
      }
			.prpt{font-size: 13px;color: #A8AFB5;}
		}
		.save_btn{width:88px;height:30px;line-height:30px;text-align:center;color:#fff;background-color:#479CFF;border-radius: 2px;margin-left: 80px;}
		.save_btn:hover{border-color: #387CCC;background-color: #387CCC;}
		.el-form-item__content{height: 30px;}
		.el-form-item__label{padding-top: 8px;padding-bottom: 8px;}
	}
  .el-input{position: relative;
    .placeholder{position: absolute;top:0px;left:10px;color:#999}
  }
</style>
