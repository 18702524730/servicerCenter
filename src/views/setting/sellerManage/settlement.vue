<template>
	<div class="settle">
		<h3 class="mb20">结算信息</h3>
		<el-form label-width="73px" :model="settleInfo" :rules="rules" ref="settleInfo" v-loading="loading">
		  <el-form-item label="开户银行" prop="bank">
		    <el-input :disabled="disabledStatus" v-model="settleInfo.bank" :maxlength="30"></el-input>
		  </el-form-item>

		  <el-form-item label="开户人" prop="account_holder">
		    <el-input :disabled="disabledStatus" v-model="settleInfo.account_holder" :maxlength="60"></el-input>
		  </el-form-item>

		  <el-form-item label="银行账号" prop="account_number">
		    <el-input :disabled="disabledStatus" v-model="settleInfo.account_number" :maxlength="20"></el-input>
		  </el-form-item>

      <el-form-item label="开户地址" required>
        <el-form-item class="form-ipt-sm" prop="provinceId" >
          <el-select :disabled="disabledStatus" v-model="settleInfo.provinceId" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('settleInfo', settleInfo.provinceId)">
            <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
          </el-select>
        </el-form-item>
        <el-form-item class="form-ipt-sm" prop="cityId">
          <el-select :disabled="disabledStatus"  v-model="settleInfo.cityId" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('settleInfo', settleInfo.cityId)">
          	<SebeOption v-for="item in cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
          </el-select>
        </el-form-item>
        <el-form-item class="form-ipt-sm form-ipt-last" style="margin-right: 0px;" prop="areaId">
          <el-select :disabled="disabledStatus"  v-model="settleInfo.areaId" clearable filterable default-first-option placeholder="请选择区">
            <SebeOption v-for="item in areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
          </el-select>
        </el-form-item>
      </el-form-item>

		  <el-form-item label="详细地址" prop="account_address">
		    <el-input :disabled="disabledStatus" v-model="settleInfo.account_address" class="address" :maxlength="80"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <!-- <el-button type="primary" size="small" v-show="disabledStatus">{{disabledStatus ? '修改' : '保存'}}</el-button> -->
		    <el-button type="primary" size="small" @click="submitForm('settleInfo')">{{disabledStatus ? '修改' : '保存'}}</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
	import SebeOption from 'cps/select/sebeOption.vue'
	const userUrl = CONFIG.userUrl
	const addressUrl = userUrl + '/api/areas'
	import {city} from '@/mixins/city'
	import Vue from 'vue'
	export default {
  	components: {
			SebeOption
		},
		mixins: [city],
    data() {
      return {
				settleInfo:{},
				disabledStatus: true,
				loading: false,
				settleInfo:{
					bank:'',
					account_number:'',
					account_holder:'',
					provinceId:'',
					cityId:'',
					areaId:'',
					account_address:''
				},
				rules: {
					bank:[
						{ required: true, message: '请填写开户银行', trigger: 'blur' }
					],
					account_number:[
						{ required: true, message: '请填写银行账号', trigger: 'blur' },
						{ pattern: /^[1-9]{1}\d{8,19}$/, message: '请输入正确的银行账号', trigger: 'blur' }
					],
					account_holder:[
						{ required: true, message: '请填写开户人', trigger: 'blur' },
					],
					provinceId: [
						{type: 'integer', required: true, message: '请选择省份', trigger: 'change' }
					],
					cityId: [
						{type: 'integer', required: true, message: '请选择城市', trigger: 'change' }
					],
					areaId: [
						{type: 'integer', required: true, message: '请选择区', trigger: 'change' }
					],
					account_address: [
						{ required: true, message: '请填写详细地址', trigger: 'blur' },
					]
				}
      }
    },
    methods: {
    	search(){
				this.loading = true
    		this.$http.get('./api/service_info')
    		.then((resp) => {
					this.loading = false
					this.settleInfo = resp.data;
					if (resp.data.provinceId) {
						this._triggerChange(resp.data.provinceId, 'cityData');
						this._triggerChange(resp.data.cityId, 'areaData');
					}
	    	})
	    	.catch((err) => {
					this.loading = false
	    		if (err && err.msg) {
						this.$message.error(err.msg);
					}
	    	});
			},
			update(){
				this.settleInfo.areaInfo = this.getAreaInfo(this.settleInfo);
				this.$http.put('./api/service_info',  this.settleInfo)
    		.then((resp) => {
					this.search();
	    	})
	    	.catch((err) => {
	    		if (err && err.msg) {
						this.$message.error(err.msg);
					}
	    	});
			},
			submitForm(formName) {
				if (this.disabledStatus) {
					this.disabledStatus = !this.disabledStatus
					return
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.update();
						console.log(11)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
    },
    mounted() {
			this.initProvince();
    	this.search();
    },
  }
</script>
<style lang="less">
	.settle{padding:30px;
		>h3{font-size: 14px;color: #223344;}
		.el-input{
			input{width:380px;}
		}
		.address{
			>input{width:380px;}
		}
		.el-form-item{
			label{font-size:13px;color:#556677;text-align:left;}
		}
		.form-ipt-sm{width: 120px;float: left;margin:0 10px 0px 0;
			input{width: 120px;}
		}
		.form-ipt{width: 380px;
			input{width: 380px;}
		}
    .el-form-item__label{padding:0;}
	}
</style>
