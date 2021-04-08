<template>
	<div class="welcome basicData" :style="{'height': height + 'px', 'min-height': '830px'}">
		<div class="welcome_container">
      <h3>填写基本资料
        <router-link class="back_box fl" to="/fillData/welcome">
          <i class="fa fa-angle-left" aria-hidden="true"></i>
          <span class="text" >返回</span>
        </router-link>
      </h3>

      <el-form :model="basicDataForm" label-position="left" v-loading="loading"
      :rules="basicDataFormRules" ref="basicDataForm" label-width="140px" class="demo-ruleForm basicDataForm">
        <el-form-item label="商家类型">
          <!-- <p>{{basicDataForm.spType == 2 ? '个人商家' : basicDataForm.spType == 1 ? '机构商家' : ''}}</p> -->
          <p>{{basicDataForm.spType == 2 ? '个人商家' : '机构商家'}}</p>
        </el-form-item>
        <el-form-item label="拾贝网注册手机号" prop="regPhone">
          <el-input type="text" v-model="basicDataForm.regPhone" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="basicDataForm.spType == 1" label="机构名称" prop="name">
          <el-input type="text" :maxlength="30" v-model="basicDataForm.name" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="sp_contacts" required >
          <el-input type="text" :maxlength="20" placeholder="请填写联系人姓名" v-model="basicDataForm.sp_contacts"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" required >
          <el-input type="text" placeholder="请填写联系电话" v-model="basicDataForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="客服QQ" prop="qq" required>
          <el-input type="text" :minlength="5" :maxlength="15" placeholder="请填写客服QQ" v-model="basicDataForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" required >
	          <el-form-item class="form-ipt-sm" prop="provinceId" >
	            <el-select v-model="basicDataForm.provinceId" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('basicDataForm', basicDataForm.provinceId)">
	              <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item class="form-ipt-sm" prop="cityId">
	            <el-select v-model="basicDataForm.cityId" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('basicDataForm', basicDataForm.cityId)">
	            	<SebeOption v-for="item in cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item class="form-ipt-sm form-ipt-last" style="margin-right: 0px;" prop="areaId">
	            <el-select v-model="basicDataForm.areaId" clearable filterable default-first-option placeholder="请选择区">
	              <SebeOption v-for="item in areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item  style="margin-top:20px;margin-bottom:0;" prop="address">
	            <el-input v-model="basicDataForm.address" :maxlength="80" placeholder="请填写详细地址" auto-complete="off" class="form-ipt"></el-input>
	          </el-form-item>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email" required >
          <el-input type="email" placeholder="请填写联系邮箱" v-model="basicDataForm.email"></el-input>
        </el-form-item>
        <el-form-item label="机构简介" prop="remark" style="position: relative;margin-bottom: 15px;">
          <el-input type="textarea" placeholder="请填写机构简介" :maxlength="200" rows="3" v-model="basicDataForm.remark"></el-input>
          <span style="position: absolute;right: 5px;bottom: 0px;font-size:  12px;color:#999;">{{ basicDataForm.remark && basicDataForm.remark.length || 0 }}/200</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm('basicDataForm')">保存</el-button>
        </el-form-item>
        <!-- <div class="my_loading" v-show="loading" v-loading="loading"></div> -->
      </el-form>
		</div>
	</div>
</template>
<script>
import SebeOption from 'cps/select/sebeOption.vue'
const userUrl = CONFIG.userUrl;
import {store} from 'utils/'
import {city} from '@/mixins/city'
export default{
  components: {
    SebeOption
  },
  mixins: [city],
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
      height: '830',
      basicInfo: '',
      loading: false,
      basicDataForm: { regPhone: '', name: '', sp_contacts: '', qq: '', phone: '', provinceId: '', cityId: '', areaId: '', address: '', email: '', des: '', remark:'' },
      basicDataFormRules: {
        sp_contacts: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        qq: [
          { validator: (rule, value, callback) => {
            let qqReg = /^[1-9]\d{4,14}$/;
            if (!value) {
              return callback(new Error('请输入客服QQ'));
            }
            if (!qqReg.test(value)) {
              return callback(new Error('请输入5-15位数字QQ'));
            }
            callback()
          }, trigger: ['blur', 'change'] }
        ],
        phone: [
          { validator: dlqy_checkPhone, trigger: ['change', 'blur'] }
        ],
        provinceId: [
          { required: true, message: '请选择省', trigger: ['change', 'blur'] }
        ],
        cityId: [
          { required: true, message: '请选择市', trigger: ['change', 'blur'] }
        ],
        areaId: [
          { required: true, message: '请选择区', trigger: ['change', 'blur'] }
        ],
        address: [
          { required: true, message: '请填写详细地址', trigger: ['change', 'blur'] }
        ],
        email: [
          {  validator: dlqy_checkEmail, trigger: ['change', 'blur'] }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 50 - 60 -50 -42
    this.initProvince()
    this.search()
  },
  methods: {
    search () {
      this.loading = true
      this.$http.get('./api/service_info').then((resp) => {
        this.loading = false
        this.basicDataForm = resp.data
        if (resp.data.provinceId) {
          this._triggerChange(resp.data.provinceId, 'cityData');
          this._triggerChange(resp.data.cityId, 'areaData');
        }
        this.basicDataForm.regPhone = resp.data.account;
        this.$nextTick(() => {
					this.$refs.basicDataForm.clearValidate();
	      });
      })
      .catch((err) => {
        this.loading = false
        console.log(err.data.msg);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.basicDataForm.spType = this.basicDataForm.sp_type
          let provinceName = this.provinceData.find(item => (item.area_id == this.basicDataForm.provinceId))
          let cityName = this.cityData.find(item => (item.area_id == this.basicDataForm.cityId))
          let areaName = this.areaData.find(item => (item.area_id == this.basicDataForm.areaId))
          this.basicDataForm.areaInfo = provinceName.name + ' ' + cityName.name + ' ' + areaName.name
          this.$http.put('./api/service_info', this.basicDataForm).then((resp) => {
            this.$message.success('保存成功！');
            this.$router.push('/fillData/welcome')
            // this.search();
          }).catch((err) => {
            if (err && err.msg) {
              this.$message.error(err.msg);
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
      .form-ipt-sm{width: 120px;float: left;margin:0 10px 20px 0;}
      a{color:#479CFF;}
    }
  }
}
</style>
