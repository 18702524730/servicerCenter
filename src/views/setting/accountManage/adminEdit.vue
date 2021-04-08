<template>
  <div class="accountEdit">
  	<h3>{{title}}</h3>
    <el-form label-width="102px"
      :model="form_data"
      :rules="form_rules"
      ref='refForm' class="refForm">
			<el-form-item label="注册手机号" prop='phone' style="position: relative;">
        <el-input size="small" placeholder="请输入拾贝网注册手机号" v-model="form_data.phone" :disabled="!!adminInfoData.phone" :maxlength="11"></el-input>
				<el-button class="memberBtn" size="small" @click.prevent="check(form_data.phone)" v-if="!adminInfoData.phone">会员验证</el-button>
				<el-button class="memberBtn grayBtn" size="small" @click.prevent="removeBind()" v-if="adminInfoData.phone">解除绑定</el-button>
				<p class="tip" v-if="!adminInfoData.phone">提示：请填写拾贝网注册手机号；若未注册，请登录<a target="_blank" :href="userUrl + '/iprp/#/register'">拾贝网用户注册页面</a>完成注册</p>
      </el-form-item>
      <!-- <el-form-item label="账号" prop='name'>
        <el-input size="small" v-model="form_data.name" :maxlength="30" :disabled="isEdit"></el-input>
      </el-form-item> -->
      <el-form-item label="姓名" prop='trueName'>
        <el-input size="small" placeholder="请输入姓名" v-model="form_data.trueName" :maxlength="12"></el-input>
      </el-form-item>

      <el-form-item label="功能组" prop='fg_id'>
        <el-select v-model="form_data.fg_id" placeholder="请选择功能组">
          <el-option v-for="item in functionGroupsData" :value="item.fg_id" :label="item.name" :key="item.fg_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务组" prop='dg_id'>
        <el-select v-model="form_data.dg_id" placeholder="请选择业务组">
          <el-option v-for="item in dataGroupsData" :value="item.dg_id" :label="item.name" :key="item.dg_id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="密码" prop='password'>
        <el-input type="password" size="small" v-model="form_data.password" :maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop='r_password'>
        <el-input type="password" size="small" v-model="form_data.r_password" :maxlength="18"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="状态" prop='operatorState' v-if="operator_id != '0'">
        <el-select v-model="form_data.operatorState" placeholder="请选择状态">
        	<el-option :value='1' label="启用"></el-option>
          <el-option :value='0' label="禁用"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="备注" prop='remark'>
        <el-input style="position:relative;" type="textarea" size="small" v-model="form_data.remark" :maxlength="100"></el-input>
				<span class="remarkNum" style="position:absolute;bottom: -2px;right: 5px;font-size: 12px;color: #666;">{{form_data.remark.length}}/100</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click='onSubmit("refForm")'>{{adminInfoData.phone ? '保存' : '确认绑定'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { gbs } from 'config/settings.js';
  const adminUrl = './api/admins';
  const userUrl = CONFIG.userUrl;
  const functionGroupsUrl = './api/functionGroups';
  const dataGroupsUrl = './api/dataGroups';
  const checkUrl = './api/admin/operationInvitation'
  const removeBindUrl = './api/untieOperator'
  const passwordReg = /^[a-zA-Z0-9\-~`!@#\$%\^&\*\(\)_\+-=\{\}\|\[\]\\:”;’<>,\.\/]{6,18}$/;
  export default {
    name: 'edit-order',
    data() {
    	let checkPassword = (rule, value, callback) =>{
		    if (!value) {
		      return callback(new Error('请输入英文字母、数字或特殊符号'));
		    }
		    setTimeout(() => {
		      if (!passwordReg.test(value)) {
		        callback(new Error('密码为6~18位英文字母、数字或特殊符号'));
		      } else {
		        callback();
		      }
		    }, 100);
		  };
    	let checkRPassword = (rule, value, callback) =>{
		    if (!value) {
		      return callback(new Error('请再次确认密码'));
		    }
		    if (value !== this.form_data.password) {
		      return callback(new Error('两次输入的密码不一致，请重新输入'));
		    }
		    setTimeout(() => {
		      if (!passwordReg.test(value)) {
		        callback(new Error('密码为6~18位英文字母、数字或特殊符号'));
		      } else {
		        callback();
		      }
		    }, 100);
		  };
      return {
      	userUrl: userUrl,
      	title:'新增账号',
      	operator_id:'',
      	isClicked: false,
      	isEdit: false,
      	checkPassword:checkPassword,
      	checkRPassword:checkRPassword,
      	adminInfoData: {},
      	functionGroupsData:[],
				dataGroupsData: [],
        form_data: {
        	operator_id:'',
          //name: '',
          trueName:'',
          phone:'',
          dg_id:'',
          fg_id:'',
          //password:'',
          //r_password:'',
          operatorState:'',
          remark:''
        },
        form_rules: {
          name: [
          	{required: true, message: '请输入账号', trigger: 'blur'},
						{ pattern: /^[a-zA-Z0-9]{2,30}$/, message: '请填写2-30位数字或大小写英文', trigger: 'blur' }
					],
          trueName: [
          	{required: true,message: '请输入姓名',trigger: 'blur'},
          	{pattern: /^\S{1,12}$/, message: '姓名长度为12字以内', trigger: 'blur'}
          ],
          phone: [
          	{required: true,message: '请输入手机号',trigger: 'blur'},
          	{pattern: /^[1][0-9]{10}$/, message: '请输入正确的手机号码', trigger: 'blur'}
          ],
          dg_id: [{required: true,type: 'number',message: '请选择业务组',trigger: 'change'}],
          fg_id: [{required: true,type: 'number',message: '请选择功能组',trigger: 'change'}],
          password: [
          	{required: true,validator:checkPassword,trigger: 'blur'}
          ],
          r_password: [{required: true,validator:checkRPassword,trigger: 'blur'}],//两次输入的密码不一致，请重新输入
        }
      }
    },
    methods: {
    	check(phone){
    		if (!phone) {
    			this.$refs['refForm'].validateField('phone');
    			return;
    		}
    		this.$http.get(checkUrl, {
    			params: {
    				phone,
    			}
    		})
      	.then((resp) => {
      		var data = resp.data;
      		this.$message.success('验证通过')
      	})
      	.catch((err) => {
      		this.$message.error(err)
      	});
    	},
    	removeBind(){
    		this.$http.post(removeBindUrl, {
    			operatorPhone: this.form_data.phone
    		})
      	.then((resp) => {
      		var data = resp.data;
      		this.getAdminInfo();
      		this.$message.success('解绑成功！');
      	})
      	.catch((err) => {
      		console.log(err);
      	});
    	},
    	setProperty(o, newO){
    		for (var p in o) {
	        if (o.hasOwnProperty(p)) {
	        	o[p] = newO[p];
	        }
		    }
    	},
    	getAdminInfo(){
    		var operator_id = this.operator_id;
    		if (operator_id == '0') {
    			this.title = '绑定子账号'
    			this.$route.meta.name = '绑定子账号';
    			return;
    		}
    		this.title = '编辑子账号';
    		this.$route.meta.name = '编辑子账号';
      	this.$http.get(adminUrl + '/' + this.operator_id)
      	.then((resp) => {
      		var data = resp.data;
      		this.adminInfoData = data;
      		this.setProperty(this.form_data, this.adminInfoData);
      		this.form_data.password = '';
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
    	getFunctionGroups(data){
      	data = data || {
      		pg_count: 999,
      	};
      	this.$http.get(functionGroupsUrl, {
					params: data
				})
      	.then((resp) => {
      		var data = resp.data;
      		var dataList = data.elements;
      		this.functionGroupsData = dataList;
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
      getDataGroups(data){
      	data = data || {
      		pg_count: 999,
      	};
      	this.$http.get(dataGroupsUrl, {
					params: data
				})
      	.then((resp) => {
      		var data = resp.data;
      		var dataList = data.elements;
      		this.dataGroupsData = dataList;
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
      /**
       * 提交表单
       * @param  {string} formName 表单名称
       */
      onSubmit(formName) {
      	var data = this.form_data;
      	var newAdminUrl = adminUrl;
      	var method = 'put';
      	if (!this.isEdit) {
      		method = 'post';
      		data.operatorState = 1;
      	}else{
      		newAdminUrl = newAdminUrl + '/' + this.operator_id
      	}
        var ref = this.$refs[formName];
        ref.validate((valid) => {
          if (valid) {
          	if (this.isClicked) {
		      		return;
		      	}
		      	this.isClicked = true;
            this.$http[method](newAdminUrl, this.form_data)
		      	.then((resp) => {
		      		this.isClicked = false;
		      		var data = resp.data;
		      		this.$message.success('提交成功！')
		      		this.$router.push({name:'allAccount'});
		      	})
		      	.catch((err) => {
		      		this.isClicked = false;
		      		this.$message.error(err.msg)
		      	});
          }
        });
      },
      reset_form(form) {
        this.$refs[form].resetFields();
      },
      initEditRule(){
      	if (this.isEdit) {
    			if (this.form_data.password || this.form_data.r_password) {
	    			if (this.form_rules.password.length && this.form_rules.r_password.length) {return;}
	      		this.form_rules.r_password = [{validator:this.checkRPassword,trigger: 'blur'}];
					  this.form_rules.password = [{validator:this.checkPassword,trigger: 'blur'}];
				  }else{
				  	this.form_rules.r_password = [];
					  this.form_rules.password = [];
					  this.$refs['refForm'].validateField('r_password', (errorMessage) => {
	      			console.log(errorMessage)
	      		});
	      		this.$refs['refForm'].validateField('password', (errorMessage) => {
	      			console.log(errorMessage)
	      		});
				  }
      	}
      }
    },
    created() {},
    mounted() {
    	this.operator_id = this.$route.params.operator_id;
    	this.getAdminInfo();
    	this.getFunctionGroups();
    	this.getDataGroups();
    	if (this.operator_id != '0') {
    		this.isEdit = true;
    		this.form_data.operator_id = this.operator_id
    		this.form_rules.password = [];
    		this.form_rules.r_password = [];
    	}else{
    		this.form_data.operator_id = null;
    	}
    },
    watch:{
    	/*'form_data.password'(){
    		this.initEditRule();
    	},
    	'form_data.r_password'(){
    		this.initEditRule();
    	}*/
    }
  }
</script>
<style lang='less'>
	.accountEdit{
		.el-form-item__label{line-height: 30px;}
		padding:30px;
		h3{font-size: 14px;color: #223344;font-weight: normal;}
		.el-form{
			padding-top: 20px;
			.memberBtn{position:absolute; top: 0px;right: -110px;}
			.grayBtn{
				border-color: #DFE2E5;
				color:#556677;
				&:hover{background-color: #fff;}
			}
			.el-form-item{
				font-size: 13px;margin-bottom:20px;
				.el-form-item__label{font-size: 13px;padding: 0;text-align: left;line-height: 30px;}
				.el-form-item__content{
					width: 250px;line-height: 30px;
					.el-select{width: 100%;
						.el-input__inner{height: 30px;line-height: 30px;}
					}
				}
				input,textarea{font-size: 13px;border-radius: 2px;border: 1px solid #DFE2E5;}
				.tip{
					height: 24px;line-height: 18px;padding-top: 6px;color: #A8AFB5;width: 600px;
					a{color: #479CFF;padding: 0 3px;}
				}
			}
		}
    .el-textarea{
      textarea{height:80px;}
    }
	}
  .accountEdit .el-form .el-form-item input{color:#556677 !important}
</style>
