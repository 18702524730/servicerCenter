<template>
	<div class="basic_manage" v-loading="loading">
		<h3>基本资料</h3>
		<el-form label-width="130px" :model="basicInfo" ref="basicInfo" :rules="rules"  class="service_list" v-loading="loading">
			<el-popover
			  placement="right-start"
			  width="330"
			  trigger="hover">
			  <div class="photo_tip clearfix">
			  	<img class="fl" src="~assets/img/example.png">
			  	<h4 class="fl ml10">参考样例</h4>
			  	<p class="fl ml10 mt5">上传说明：请上传个人正装照片<br>格式要求：支持jpg/jpeg/png/gif格式，图片大小限2M以内</p>
			  </div>
			  <div slot="reference" class="photo_wrap" style="width: 90px;">
			  	<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'avatar'" :url="avatar" :size="2" :extensions="'jpg,jpeg,png,gif'" class="photo"></uploader>
			  </div>
			</el-popover>
		  <el-form-item label="拾贝网注册手机号">
		    <el-input :disabled="true" v-model="basicInfo.account"></el-input>
		  </el-form-item>
		  <el-form-item label="主体类型">
		  	<p>{{basicInfo.spType == 1 ? '机构(公司)' : basicInfo.spType == 2 ? '个人' : basicInfo.spType == 3 ? '机构(个体工商户)' : '--'}}</p>
		  </el-form-item>
		  <el-form-item label="商家类型">
		  	<p>{{sp_type}}</p>
		  </el-form-item>

		  <el-form-item label="机构名称">
		    <el-input :disabled="true" v-model="basicInfo.name"></el-input>
		  </el-form-item>

		  <el-form-item label="联系人姓名" prop="sp_contacts">
		    <el-input :disabled="disabledBool" maxlength="20" v-model="basicInfo.sp_contacts"></el-input>
		  </el-form-item>
			<el-form-item label="旺旺" prop="spWw">
		    <el-input :disabled="disabledBool" maxlength="20" v-model="basicInfo.spWw"></el-input>
		  </el-form-item>
      <el-form-item label="联系电话" prop="phone" required>
        <el-input :disabled="disabledBool" maxlength="13" v-model="basicInfo.phone"></el-input>
      </el-form-item>

		  <el-form-item label="联系地址" required>
        <el-form-item class="form-ipt-sm" prop="provinceId">
          <el-select v-model="basicInfo.provinceId" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('basicInfo', basicInfo.provinceId)" :disabled="disabledBool">
            <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
          </el-select>
        </el-form-item>
        <el-form-item class="form-ipt-sm" prop="cityId">
          <el-select v-model="basicInfo.cityId" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('basicInfo', basicInfo.cityId)" :disabled="disabledBool">
          	<SebeOption v-for="item in cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
          </el-select>
        </el-form-item>
        <el-form-item class="form-ipt-sm form-ipt-last" style="margin-right: 0px;" prop="areaId">
          <el-select v-model="basicInfo.areaId" clearable filterable default-first-option placeholder="请选择区" :disabled="disabledBool">
            <SebeOption v-for="item in areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="" prop="address">
      	<el-input :disabled="disabledBool" placeholder="请输入详细地址" maxlength="30" v-model="basicInfo.address"></el-input>
      </el-form-item>
		  <el-form-item label="联系邮箱" prop="email">
		    <el-input :disabled="disabledBool" maxlength="50" v-model="basicInfo.email"></el-input>
		  </el-form-item>

		  <el-form-item label="机构简介" prop="remark">
		    <el-input :disabled="disabledBool" maxlength="200" :autosize="{ minRows: 5, maxRows: 7}" type="textarea" v-model="basicInfo.remark"></el-input>
		    <span class="remark_length">{{basicInfo.remark?basicInfo.remark.length:0}}/200字</span>
		  </el-form-item>

		</el-form>
		<button @click="changeClick" v-if="baseInfoModify">{{btnName}}</button>
	</div>
</template>
<script>
	import Vue from 'vue'
	import SebeOption from 'cps/select/sebeOption.vue'
	import {store} from 'utils/';
	import uploader from 'cps/uploader/headPhoto.vue'
	import photo from 'assets/img/index/photo.png';
	const userUrl = CONFIG.userUrl
	const addressUrl = userUrl + '/api/areas';
	export default {
  	components: {
  		SebeOption,
  		uploader
    },
    data() {
    	let dlqy_checkPhone = (rule, value, callback) => {
	      let reg = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
	      if (!value) {
	          return callback(new Error('请填写店铺联系电话'));
	      }
	      setTimeout(() => {
	          if (!reg.test(value)) {
	            callback(new Error('请填写正确的联系电话，固话前请加区号和-'));
	          } else {
	            callback();
	          }
	      }, 50);
	    };
      return {
      	baseInfoModify:false,//修改按钮权限
      	avatar:'',
      	disabledBool:true,
      	btnName:'修改',
      	sp_type:'',
      	loading: false,
      	basicInfo:{provinceId: '', cityId: '', areaId: '',sp_contacts:'',phone:'',email:'',avatar:'',spWw:''},

				provinceData:[],//主体省数据
				cityData:[],//市数据
	      areaData:[],//区数据

	      rules: {
      		sp_contacts:[
      			 { required: true, message: '店铺名称不能为空', trigger: 'blur' }
      		],
      		phone:[
      			{ validator: dlqy_checkPhone, trigger: ['change', 'blur'] }
			  ],
			  spWw:[
      			 { required: true, message: '请填写旺旺', trigger: 'blur' }
      		],
      		address:[
      			 { required: true, message: '请填写详细地址', trigger: 'blur' }
      		],
      		remark:[
      			 { required: true, message: '请填写机构简介', trigger: 'blur' }
      		],
      		email:[
      			{required: true, message: '请填写店铺邮箱', trigger: 'blur' },
      			{type: 'email', message: '店铺邮箱格式错误', trigger: 'blur'}
      	  ],
      		provinceId:[
      			{ required: true, message: '请选择省', trigger: ['change', 'blur']}
      		],
      		cityId:[
      			{ required: true, message: '请选择市', trigger: ['change', 'blur']}
      		],
      		areaId:[
      			{ required: true, message: '请选择区', trigger: ['change', 'blur']}
      		]
      	}
      }
    },
    methods: {
			//地址拼接area_info
			getAreaInfo(data, prevfix){
				var area_id = data.area_id || data.areaId;
				var province_id = data.province_id || data.provinceId;
				var city_id = data.city_id || data.cityId;
				return [this.getSelectName(province_id, 'provinceData'), this.getSelectName(city_id, (prevfix ? prevfix : '') + 'cityData'), this.getSelectName(area_id, (prevfix ? prevfix : '') + 'areaData')].join(' ');
			},
						//获取选中的省市区对应的中文名称
			getSelectName (code, dataName){
				var self = this;
				var data = self[dataName];
				var ret = '';
				data.some((item, i) => {
					if (item.area_id == code) {
						ret = item.name;
						return true;
					}
				});
				return ret;
			},
    	resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
			},
			setUploadedData(data){
				console.log(data.data,'测试')
				this[data.valueName]= data.data.url;
				this[data.valueName+'_name']= data.data.fileName
				this.disabledBool = false;
			},
    	search(){
    		this.loading = true;
    		this.$http.get('./api/service_info')
    		.then((resp) => {
    			this.loading = false;
    			this.basicInfo = resp.data;
    			this.avatar = resp.data.avatar || photo;
    			if(this.basicInfo.manageType == 1){
    				this.sp_type = '自营商家';
    			}else if(this.basicInfo.manageType == 2){
    				this.sp_type = '普通商家';
    			}else{
    				this.sp_type = '--';
    			}
    			store.set('sp_type', this.basicInfo.sp_type);
    			if (resp.data.provinceId) {
	          this._triggerChange(resp.data.provinceId, 'cityData');
	          this._triggerChange(resp.data.cityId, 'areaData');
	        }
    			this.basicInfo.entrusted_unit = this.basicInfo.entrusted_unit + (this.basicInfo.entrusted_unit_short ? " 简称:" + this.basicInfo.entrusted_unit_short : '');
    			if(!resp.data.patentProxyRegistration || !resp.data.lawyerCert || !resp.data.trademarkProxyCert){//资质认证高亮
			    	let data = {
			    		qualification:true
			    	}
			    	this.$store.commit('SET_STATISTICS_REAL', data);
    			}else{
            let data = {
              qualification:false
            }
            this.$store.commit('SET_STATISTICS_REAL', data);
          }
	    	})
	    	.catch((err) => {
	    		this.loading = false;
	    		console.log(err.data.msg);
	    	});
    	},
    	changeClick(){
    		if(this.disabledBool){
    			this.disabledBool = false;
    			this.btnName = '保存';
    		}else{
    			this.saveInfo();
    		}
    	},
    	saveInfo(){
    		console.log(this.avatar)
    		let self = this;
    		this.$refs['basicInfo'].validate((valid) => {
          if (valid) {
						self.basicInfo.avatar = this.avatar;
						this.basicInfo.areaInfo = this.getAreaInfo(this.basicInfo)
            self.$http.put('./api/service_info',self.basicInfo)
		    		.then((resp) => {

		    			self.disabledBool = true;
		    			self.btnName = '修改';
		    			self.$message.success('修改成功！');
		    			self.search();
		    			self.disabledBool = true;
		    			self.btnName = '修改'
			    	})
			    	.catch((err) => {
			    		if (err && err.msg) {
			    			this.$message.error(err.msg);
			    		}
			    	});
          } else {
            console.log(this.weekLists)
            // this.verifyTime();
            return false;
          }
        });

    	},
			initProvince () {// 初始化省份
				this.$http.get(addressUrl+'?pId=0').then((resp) =>{
					resp = resp.data;

					if(resp.elements){
						this.provinceData = resp.elements;
					}else {
						console.error(resp.msg);
					}
				})
				.catch((error) => {
					console.error(error);
				});
	    },
			changeProvince(formName, provinceCode, prevfix){//更改省
				this[formName].areaId = '';
				this[formName].cityId = '';
				this._triggerChange(provinceCode,  (prevfix ? prevfix : '') + 'cityData');
	    },
			changeCity(formName, cityCode, prevfix){//更改市
				this[formName].areaId = '';
				this._triggerChange(cityCode, (prevfix ? prevfix : '') + 'areaData');
	    },
			_triggerChange (code, dataName, callback){// 省份切换渲染城市 城市切换渲染区
				var self = this;
				self[dataName] = [];
				if(!code){
					return;
				}
				this.$http.get(addressUrl+'?pId='+ code)
				.then(function(resp){
					resp = resp.data;
					if(resp.elements){
						self[dataName] = resp.elements;
						callback && callback();
					}else {
						console.error(resp.msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
	    },
    },
    mounted() {
    	this.baseInfoModify = store.get('permission').indexOf('iprp_base_info_modify') !== -1;
    	this.search();
    	this.initProvince()
    },
  }
</script>
<style lang='scss'>
	.basic_manage{
		>h3{font-size: 14px;color: #223344;padding:30px 0 0 30px;}
		.service_list{
			padding:30px 30px 0px 30px;
			.photo{margin-bottom:20px; }
		}
		.el-form-item{margin-bottom:20px;
			label{font-size: 13px;text-align:left;}
			.el-input{position: relative;
				input{height: 30px;width:380px;}
			}
			.form-ipt-sm{width: 120px;float: left;margin:0 10px 0px 0;
				input{width: 120px;}
			}
			.el-form-item__content{width:380px;}
			.remark_length{font-size:12px;color:#999;position: absolute;right:10px;bottom:0;}
		}
		button{width:88px;height:30px;line-height:30px;border-radius:2px;background: #479CFF;font-size: 14px;color: #FFFFFF;margin-left: 160px;}
		button:hover{border-color: #387CCC;background-color: #387CCC;}
	}
		.photo_tip{
			h4{color:#223344;margin-top:7px;font-size:14px;}
			p{color:#7F8FA4;font-size:12px;width:200px;line-height:17px;}
		}
</style>
