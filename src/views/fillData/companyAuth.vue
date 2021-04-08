<template>
	<div class="welcome basicData">
		<div class="welcome_container">
      <h3>机构实名认证
        <router-link class="back_box fl" to="/fillData/welcome">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
          <span class="text">返回</span>
        </router-link>
      </h3>
      <el-form :model="companyForm" label-position="left"
      :rules="companyFormRules" ref="companyForm" label-width="140px" class="demo-ruleForm basicDataForm">
        <el-form-item label="机构类型" required prop="sp_type">
          <el-radio-group v-model="companyForm.sp_type">
            <!-- <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio> -->
            <el-radio :label="1">公司</el-radio>
            <el-radio :label="3">个体工商户</el-radio>
          </el-radio-group>

          <el-popover
            placement="right"
            width="200"
            trigger="hover"
            content="没有对公账户的个体户、事业单位、社会团体等请选择此项。">
            <i class="el-icon-info" slot="reference" style="padding-left: 5px;color:#A8AFB5;"></i>
          </el-popover>
        </el-form-item>
        <el-form-item label="机构名称" prop="name">
          <el-input type="text" v-model="companyForm.name" maxlength="30" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码" prop="businessLicenseNo" required >
          <el-input type="text" :maxlength="20" v-model="companyForm.businessLicenseNo" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="注册地址" required >
	          <el-form-item class="form-ipt-sm" prop="regProvinceId" >
	            <el-select v-model="companyForm.regProvinceId" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('companyForm', companyForm.regProvinceId)">
	              <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item class="form-ipt-sm" prop="regCityId">
	            <el-select v-model="companyForm.regCityId" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('companyForm', companyForm.regCityId)">
	            	<SebeOption v-for="item in cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item class="form-ipt-sm form-ipt-last" style="margin-right: 0px;" prop="regAreaId">
	            <el-select v-model="companyForm.regAreaId" clearable filterable default-first-option placeholder="请选择区">
	              <SebeOption v-for="item in areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item  style="margin-top:20px;margin-bottom:0;" prop="regAddress">
	            <el-input v-model="companyForm.regAddress" :maxlength="80" placeholder="请填写详细地址" auto-complete="off" class="form-ipt"></el-input>
	          </el-form-item>
        </el-form-item>
        <el-form-item  label="营业执照" required prop="businessLicenseUrl">
          <div class="upload_component" style="margin-bottom:20px;">
            <uploader
              @complete="setUploadedData"
              @resetUploader="resetUploader"
              :postAction="'iprp_servicer/api/file/allUpload'"
              :url="companyForm.businessLicenseUrl"
              :valueName="'businessLicenseUrl'"
              :size="2"
              :extensions="'jpg,jpeg,png,bmp'"></uploader>
            <div class="upload_tip">
              <p>营业执照复印件（加盖公章）</p>
              <p class="format">请上传jpg、png、bmp格式文件，大小限2M以内</p>
            </div>
          </div>
          <el-input v-model="companyForm.businessLicenseUrl" style="display: none;" placeholder=""></el-input>
        </el-form-item>
        <el-form-item  label="组织机构代码">
          <div class="upload_component" style="margin-bottom:20px;">
            <uploader
              @complete="setUploadedData"
              @resetUploader="resetUploader"
              :postAction="'iprp_servicer/api/file/allUpload'"
              :url="companyForm.orgCodeCert"
              :valueName="'orgCodeCert'"
              :size="2"
              :extensions="'jpg,jpeg,png,bmp'"></uploader>
            <div class="upload_tip">
              <p>组织机构代码证（加盖公章）</p>
              <p class="format">请上传jpg、png、bmp格式文件，大小限2M以内</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item  label="税务登记证">
          <div class="upload_component" style="margin-bottom:20px;">
            <uploader
              @complete="setUploadedData"
              @resetUploader="resetUploader"
              :postAction="'iprp_servicer/api/file/allUpload'"
              :url="companyForm.taxRegistrationCert"
              :valueName="'taxRegistrationCert'"
              :size="2"
              :extensions="'jpg,jpeg,png,bmp'"></uploader>
            <div class="upload_tip">
              <p>税务登记证（加盖公章）</p>
              <p class="format">请上传jpg、png、bmp格式文件，大小限2M以内</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="" style="position: relative;margin-bottom: 10px;">
          <el-checkbox v-model="checked">我已阅读并同意<a :href="cartUrl + '/shop/pages/enterAgreement.html?name='+ companyForm.name" target="_blank">《拾贝网商家入驻合作协议》</a></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="btnState" size="small" @click="submitForm('companyForm')">保存</el-button>
        </el-form-item>
          <p class="tips">温馨提示：所有资质证明文件需加盖公章的复印件或彩色扫描件。三证合一或五证合一的企业只需提供企业营业执照， 无需提供税务登记证和组织机构代码证</p>
      </el-form>
		</div>
	</div>
</template>
<script>
import SebeOption from 'cps/select/sebeOption.vue'
import uploader from 'cps/uploader/uploader.vue'
const userUrl = CONFIG.userUrl;
const cartUrl = CONFIG.cartUrl;
// import {city} from '@/mixins/city'
const addressUrl = userUrl + '/api/areas'
export default{
  components: {
    SebeOption, uploader
  },
  // mixins: [city],
  data () {
      //大陆个体固定电话验证
    let dlqy_checkPhone = (rule, value, callback) => {
      let reg = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
      if (!value) {
          return callback(new Error('请填写联系电话'));
      }
      setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('请填写正确的联系电话，固话前请加区号和-'));
          } else {
            callback();
          }
      }, 50);
    };
    	//大陆企业营业执照
    let dlqy_checkNumber = (rule, value, callback) =>{
      // let reg = /(^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$)|([0-9A-Za-z]{15})/;
      let reg = /^[0-9A-Za-z]{15,20}$/;  // 限制输入15、18或20位数字或字母
      if (!value) {
          return callback(new Error('请填写营业执照号码'));
      }
      setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('请输入正确的营业执照号码'));
          } else {
            callback();
          }
      }, 50);
    };
    let dlqy_checkEmail = (rule, value, callback) =>{
      let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!value) {
          return callback(new Error('联系邮箱不能为空'));
      }
      if (value.length > 30) {
          return callback(new Error('邮箱不能超过30个字符'));
      }
      setTimeout(() => {
          if (!emailReg.test(value)) {
            callback(new Error('邮箱格式错误'));
          } else {
            callback();
          }
      }, 50);
    };

    return {
    	cartUrl: cartUrl,
    	checked: false,
      companyForm: { sp_type: '1', name: '', businessLicenseNo: '', regProvinceId: '', regCityId: '', regAreaId: '', regAddress: '', businessLicenseUrl: '', orgCodeCert: '', taxRegistrationCert: '' },
      companyFormRules: {
        sp_type: [
          { required: true, message: '请选择机构类型', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入机构名称', trigger: ['blur', 'change'] }
        ],
        businessLicenseNo: [
          {  validator: dlqy_checkNumber, trigger: ['change', 'blur'] }
        ],
        regProvinceId: [
          { required: true, message: '请选择省', trigger: ['change', 'blur'] }
        ],
        regCityId: [
          { required: true, message: '请选择市', trigger: ['change', 'blur'] }
        ],
        regAreaId: [
          { required: true, message: '请选择区', trigger: ['change', 'blur'] }
        ],
        regAddress: [
          { required: true, message: '请填写详细地址', trigger: ['change', 'blur'] }
        ],
        businessLicenseUrl: [
          { required: true, message: '请上传营业执照', trigger: ['blur', 'change'] }
        ]
      },
      provinceData:[],//主体省数据
      cityData:[],//市数据
      areaData:[],//区数据
      btnState: false,
      loading: false
    }
  },
  mounted () {
    this.initProvince()
    this.search()
  },
  methods: {
		// 初始化省份
		initProvince () {
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
		//更改省
		changeProvince(formName, provinceCode, prevfix){
			this[formName].regAreaId = '';
			this[formName].regCityId = '';
			this._triggerChange(provinceCode,  (prevfix ? prevfix : '') + 'cityData');
    },
		//更改市
		changeCity(formName, cityCode, prevfix){
			this[formName].regAreaId = '';
			this._triggerChange(cityCode, (prevfix ? prevfix : '') + 'areaData');
    },
		// 省份切换渲染城市 城市切换渲染区
		_triggerChange (code, dataName, callback){
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
		//地址拼接area_info
		getAreaInfo(data, prevfix){
			var area_id = data.area_id || data.regAreaId;
			var province_id = data.province_id || data.regProvinceId;
			var city_id = data.city_id || data.regCityId;
			return [this.getSelectName(province_id, 'provinceData'), this.getSelectName(city_id, (prevfix ? prevfix : '') + 'cityData'), this.getSelectName(area_id, (prevfix ? prevfix : '') + 'areaData')].join(' ');
		},
    search () {
      this.loading = true
      this.$http.get('./api/service_info').then((resp) => {
        this.loading = false
        resp.data.sp_type = resp.data.spType
        this.companyForm = resp.data
        delete this.companyForm.subDTOs
        if (resp.data.regProvinceId) {
          this._triggerChange(resp.data.regProvinceId, 'cityData');
          this._triggerChange(resp.data.regCityId, 'areaData');
        }
        this.companyForm.regPhone = resp.data.phone;
        this.$nextTick(() => {
					this.$refs.companyForm.clearValidate();
	      });
        console.log(this.companyForm)
      })
      .catch((err) => {
        this.loading = false
        console.log(err.data.msg);
      });
    },
    //reset上传组件
		resetUploader(valueName){
			this.companyForm[valueName] = '';
			// this[valueName+'_name'] = '';
		},
		//上传成功后设置数据
		setUploadedData (data) {
      this.companyForm[data.valueName]= data.data.url;
      console.log('companyForm', this.companyForm)
			// this[data.valueName+'_name']= data.data.fileName
		},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        	if (!this.checked) {
        		this.$message.error('请阅读并同意《拾贝网商家入驻合作协议》');
        		return;
        	}
          console.log(this.companyForm)
          this.btnState = true
          this.companyForm.spType = this.companyForm.sp_type
          // this.companyForm.regAddress = this.companyForm.address;
          // this.companyForm.regCityId = this.companyForm.cityId;
          // this.companyForm.regProvinceId = this.companyForm.provinceId;
          // this.companyForm.regAreaId = this.companyForm.areaId;
          this.companyForm.regAreaInfo = this.getAreaInfo(this.companyForm)
          this.$http.put('./api/service_info', this.companyForm).then((resp) => {
            this.$message.success('保存成功！');
            this.$router.push('/fillData/welcome')
            // this.search();
            this.btnState = false;
          }).catch((err) => {
            console.log(err)
            this.btnState = false;
            if (err.response.data) {
              this.$message.error(err.response.data.msg);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style lang="less">
.basicData{
  min-height: 830px;
  h3{font-size: 18px;color:#234;line-height: 24px;padding:90px 0 20px;border-bottom: 1px solid #DFE2E5;}
  .welcome_container{width: 1080px;font-size: 14px;
    .basicDataForm{width: 520px;margin: 0 auto;text-align: left;padding-top: 40px;color: #567;
      .el-form-item__label{line-height: 30px;}
      .form-ipt-sm{width: 120px;float: left;margin:0 10px 20px 0;
      }
    }
  }
  .upload_component{
    position: relative;
    .upload_tip{
      position: absolute;left: 140px;bottom:0;width:220px;font-size: 12px;color: #556677;line-height: 16px;
      p.format{color: #A8AFB5;padding-top: 5px; }
    }
  }
  .tips{color:#A8AFB5;font-size: 12px;line-height: 16px;width: 380px;margin-left: 140px;padding-bottom: 168px;}
}
</style>
