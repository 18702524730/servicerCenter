<template>
  <div class="authenticationContainer">
    <h3>实名认证</h3>
    <div class="person" v-if="realInfo.spType==2">
      <p><label>姓名</label><span>{{authInfo.name}}</span><a href="javascript:void(0)" class="label">已认证</a></p>
      <p><label>身份证号</label><span>{{authInfo.idCardNo|replaceCode}}</span></p>
      <p><label>银行卡号</label><span>{{authInfo.bankCardNo|replaceBank}}</span></p>
      <p><label>手机号</label><span>{{authInfo.phone|replacePhone}}</span></p>
    </div>
    <div class="gov" v-else>
      <p><label>机构名称</label><span>{{realInfo.name}}</span><a href="javascript:void(0)" class="label">已认证</a></p>
      <p><label>营业执照号码</label><span>{{realInfo.businessLicenseNo||'--'}}</span></p>
      <p><label>注册地址</label><span>{{realInfo.regAreaInfo}}{{realInfo.regAddress}}</span></p>
      <p class="fz0 clearfix">
        <label class="fl">营业执照</label>
        <a :href="realInfo.businessLicenseUrl" class="imgContainer fl" target="_blank">
          <img :src="realInfo.businessLicenseUrl" alt="">
          <p>营业执照复印件</p>
        </a>
        <b>营业执照复印件（加盖公章）</b>
      </p>
      <p class="fz0 clearfix">
        <label class="fl">组织机构代码</label>
        <a :href="realInfo.orgCodeCert" class="imgContainer fl" target="_blank"><img  :src="realInfo.orgCodeCert"><p>组织机构代码</p></a>
        <b>组织机构代码证（加盖公章）</b>
      </p>
      <p class="fz0 clearfix">
        <label class="fl">税务登记证</label>
        <a :href="realInfo.taxRegistrationCert" class="imgContainer fl" target="_blank"><img  :src="realInfo.taxRegistrationCert" alt=""><p>税务登记证</p></a>
        <b>税务登记证（加盖公章）</b>
      </p>
    </div>
    <!-- <div class="person" v-else>未进行实名认证</div> -->
  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'

  import {store} from 'utils/';
	const adminListUrl = './api/admins';
	const updateUrl = './api/frozenAdmin';

  export default {
    data() {
      return {
        realInfo:{
          spType:''
        },
        authInfo:{
          name:'',
          idCardNo:'',
          bankCardNo:'',
          phone:''
        }
      }
    },
    mounted() {
      this.sp_type = store.get('sp_type');
      this.search();
      console.log(store.get('sp_type'))
    },
    methods: {
      search(){
        let self = this;
        this.$http.get('./api/service_info')
        .then((resp)=>{
          this.realInfo = resp.data;
          if(this.realInfo.spType==2){//后台把个人的参数放在了另一个接口，改出需要加判断，当内容是个人的时候需要另外请求接口
            self.searchAuthInfo();
          }
          console.log(resp.data)
        })
        .catch((err)=>{

        })
      },
      searchAuthInfo(){
        this.$http.get('./api/'+store.get('userinfo').operator_id+'/nameAuthInfo')
        .then((resp)=>{
          this.authInfo = resp.data;
        })
        .catch((err)=>{

        })
      }
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      orderStatusformat: Filters.orderStatusformat,
      payStatusformat: Filters.payStatusformat,
      priceformat:Filters.priceformat,
      titleLengthFormat:Filters.titleLengthFormat,
      replaceBank:Filters.replaceBank,
      replaceCode:Filters.replaceCode,
      replacePhone:Filters.replacePhone,
    },
  }
</script>
<style lang='less'>
.authenticationContainer{
  .fz0{font-size: 0;}
  padding: 30px;
  .label{font-size: 12px;line-height: 12px;color: #36AF47;padding: 1px 10px; border: 1px solid #36AF47;border-radius: 10px;text-decoration: none;margin-left: 10px;}
  .person, .gov{
    padding-top: 20px;
    >p{line-height: 18px;font-size: 13px;margin-bottom: 11px;color: #7F8FA4;position: relative;
      .imgContainer{display: block;position: relative;width: 100px;height: 120px;border: 1px solid #def2e5;
        img{width: 100px;height: 118px;}
        p{width: 100px;text-align: center;background: rgba(0, 0, 0, 0.6);color: #fff;line-height: 26px;font-size: 13px; position: absolute;
          bottom: 0;cursor: pointer;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;left: 0px;}
        &:hover{
          &::after{content: '';position: absolute;width: 100px;height: 120px;top: 0px;left: 0px;background:rgba(0,0,0,0.5) url(~assets/img/bigIcon.png) no-repeat center center;}
        }
      }
      b{font-weight: 500;position: absolute;bottom: 0;left: 238px;}
      label{vertical-align: top;color: #567;width: 128px;display: inline-block;}
      // img{width: 100px;height: 120px;padding-bottom: 20px;}
      span{}
    }
  }
}
</style>
