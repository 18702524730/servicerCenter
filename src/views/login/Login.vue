<template>
<div class="home_login">
  <div class="login">
  <!-- 头部 -->
    <div class="header" :class="{'header_bg':titbg}">
      <div class="clearfix">
        <img v-if="!titbg" src="~assets/img/login/logo01.png" alt="">
        <img v-if="titbg" src="~assets/img/login/logo02.png" alt="">
        <p class="ml5">商家中心
          <span class="ml10">阿里巴巴 · 创新保唯一指定合作伙伴</span>
        </p>
        <a :href="wwwUrl" target="_blank" class="fr">首页</a>
      </div>
    </div>
    <!-- 登录部分 -->
    <div class="login_info">
      <div class="bg_top">
        <div class="clearfix">
          <div style="position:relative">
            <img class="logo_left" src="~assets/img/login/txtlogo.png" alt="">
            <div class="reg_login_box">
              <p>
              登录商家中心
              <!-- 清除二维码 -->
              <span class="fr" v-if="isWeChat" @click="moveChat">返回账号登录</span>
              </p>
              <form v-if="!isWeChat">
                <div class="ipt-wrap" :class="{'inputfocus':postData.name ||　iptphone}" @click="phoneclick()">
                  <input type="text" class="ipt" v-model="postData.name" ref="name" :maxlength="30" @focus="iptphone=true" @blur="iptphone=false" @keyup.13="submit">
                  <label class="name label-name">请输入账号</label>
                </div>
                <div class="ipt-wrap" :class="{'inputfocus':postData.password ||　iptpass}" @click="passclick()">
                  <input type="password" class="ipt" ref="pass" v-model="postData.password" :maxlength="18" @focus="iptpass=true" @blur="iptpass=false" @keyup.13="submit">
                  <label class="name label-name">请输入密码</label>
                </div>
                <div v-if="errLoginCount>3" class="ipt-wrap captcha-wrap" :class="{'inputfocus':postData.captcha || iptcap}" @click="iptcapClick">
                  <input type="text" class="ipt" v-model="postData.captcha"  :maxlength="4" @focus="iptcap=true" ref="captcha" @blur="iptcap=false" @keyup.13="submit">
                  <label class="name label-name">请输入校验码</label>
                  <span>
                    <img :src="imageCode" @click="imgCode" alt="">
                  </span>
                </div>
              </form>
              <span class="reminder">
                <label>{{errPrompt}}</label>
              </span>
              <!-- 二维码部分 -->
              <div class="webchat" v-if="isWeChat">
                <div>
                  <img width="190px" height="190px" v-if="weixinurl" :src="weixinurl" alt="">
                  <p v-else><img style="margin-top:45px;" width="100px" height="100px" src="~assets/img/login/Spinner.gif" alt=""></p>
                </div>
                <p v-if="refresh">
                  <span>请使用微信扫描上方二维码登录</span>
                </p>
                <p v-else>
                  二维码失效<br/>请点击<a @click="refreshbtn">刷新二维码</a>
                </p>
              </div>
              <button class="mt10" @click="submit" v-if="!isWeChat">登录</button>
              <div class="wechat" v-if="!isWeChat">
                <a href="javascript:;" @click="wechat">
                  <span class="clre">————</span>
                  <img src="~assets/img/login/WeChat.png" alt="">
                  <span>微信登录</span>
                  <span class="clre">————</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg_btm"></div>
    </div>
    <!-- 优势 -->
    <div class="adv clearfix">
      <div class="fl mr30">
        <img src="~assets/img/login/features01.png" alt="">
        <p class="tit">平台智能派单</p>
        <p class="txt">平台订单全量分发，解决获客难题，自主设计订单智能分派算法，确保订单分配合理、高效、及时</p>
      </div>
      <div class="fl mr30">
        <img src="~assets/img/login/features02.png" alt="">
        <p class="tit">全流程服务管理</p>
        <p class="txt">创造性研发行业软件，帮助服务商完成售前客服、客户管理、子账号管理、财务结算、售后管理等工作</p>
      </div>
      <div class="fl mr30">
        <img src="~assets/img/login/features03.png" alt="">
        <p class="tit">丰厚服务佣金</p>
        <p class="txt">根据服务商服务交付情况提供丰厚佣金，轻松获客的同时，享有高比例利润分成</p>
      </div>
      <div class="fl">
        <img src="~assets/img/login/features04.png" alt="">
        <p class="tit">全网营销支持</p>
        <p class="txt">每年拾贝投入大量的资金、资源支撑平台营销，保障服务商享有稳定的客户来源</p>
      </div>
    </div>
    <!-- 数据 -->
    <div class="data_info">
      <div class="data_top">
        <p>平台数据</p>
      </div>
      <div class="data_txt clearfix">
        <div class="fl">
          <img src="~assets/img/login/number01.png" alt="">
          <p class="info_tit">150家</p>
          <p class="info_txt">优质服务商入驻</p>
        </div>
        <div class="fl mmd">
          <img src="~assets/img/login/number02.png" alt="">
          <p class="info_tit">1000万</p>
          <p class="info_txt">覆盖客户数</p>
        </div>
        <div class="fl">
          <img src="~assets/img/login/number03.png" alt="">
          <p class="info_tit">100万</p>
          <p class="info_txt">优质服务（次）</p>
        </div>
      </div>
    </div>
    <!-- 合作伙伴 -->
    <div class="cooperation">
      <div>
        <p class="mb40">合作伙伴</p>
        <div class="core_list clearfix">
          <div class="fl">
            <img src="~assets/img/login/caasa.png" alt="">
            <p class="core_name mb10 mt20">中国产学研合作促进会反侵权假冒创新战略联盟</p>
            <p class="core_txt">系中国产学研合作促进会反侵权假冒创新战略联盟理事长单位《中国反侵权战略假冒年度报告》编辑单位</p>
          </div>
          <div class="fl" style="margin:0 180px;">
            <img src="~assets/img/login/albb.png" alt="">
            <p class="core_name mb10 mt20">阿里巴巴知识产权保护平台</p>
            <p class="core_txt">与阿里巴巴集团签署战略合作协议，独家承接千万平台商家的确权服务</p>
          </div>
          <div class="fl">
            <img src="~assets/img/login/Bitmap.png" alt="">
            <p class="core_name mb10 mt20">浙江清华长三角研究院</p>
            <p class="core_txt">系长三院杭州分院知识产权中心，全面负责知识产权研究工作</p>
          </div>
        </div>
        <div class="other_list clearfix mt40">
          <div class="fl mr30" style="padding-top:12px">
            <img src="~assets/img/login/360.png" alt="">
          </div>
          <div class="fl mr30" style="padding-top:14px">
            <img src="~assets/img/login/jingdong.png" alt="">
          </div>
          <div class="fl mr30" style="padding-top:15px">
            <img src="~assets/img/login/hw.png" alt="">
          </div>
          <div class="fl mr30" style="padding-top:14px">
            <img src="~assets/img/login/bd.png" alt="">
          </div>
          <div class="fl" style="padding-top:13px">
            <img src="~assets/img/login/hc.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 加盟 -->
    <div class="joinin">
      <div class="clearfix">
        <p>加盟我们</p>
        <i></i>
        <div class="join_list fl">
          <div>
            <img src="~assets/img/login/joinin02.png" alt="">
          </div>
          <p class="join_tit mt20">提交申请资料</p>
          <p class="join_txt mt5">提交入驻申请，工作人员进行审核</p>
        </div>
        <div class="join_list fl" style="margin:-50px 270px 0">
          <div>
            <img src="~assets/img/login/joinin03.png" alt="">
          </div>
          <p class="join_tit mt20">确认合作意向</p>
          <p class="join_txt mt5">审核通过，签订入驻平台协议</p>
        </div>
        <div class="join_list fl">
          <div>
            <img src="~assets/img/login/joinin01.png" alt="">
          </div>
          <p class="join_tit mt20">入驻成功</p>
          <p class="join_txt mt5">立即开通，成为服务商</p>
        </div>
        <button class="mt40" @click="dialogFormVisible = false">申请入驻</button>
      </div>

    </div>
    <!-- 底部 -->
    <div class="footer">
      <p>© 2018 拾贝 All rights reserved 浙ICP备15042618号 | 浙公网安备 33010402003197号杭州拾贝知识产权服务有限公司</p>
    </div>
    <!-- 加盟弹框 -->
    <el-dialog title="入驻申请" :visible.sync="dialogFormVisible" class="info_data">
      <el-form :model="infoData" :rules="rules" ref="infoData">
        <el-form-item label="申请类型" required>
          <el-radio-group v-model="infoData.applyType">
            <el-radio :label="1">机构服务商</el-radio>
            <el-radio :label="0">个人服务商</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公司名称" label-width="80px" prop="company" v-if="infoData.applyType==1">
          <el-input v-model="infoData.company" :maxlength='30' placeholder="请填写公司名称" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="您的姓名" label-width="80px" prop="name">
          <el-input v-model="infoData.name" :maxlength='20' placeholder="请填写姓名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="80px" prop="phone">
          <el-input v-model="infoData.phone" :maxlength='11' placeholder="请填写联系方式" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" label-width="80px" prop="code">
          <el-input v-model="infoData.code" class="slot" :maxlength="6" placeholder="请输入验证码" auto-complete="off">
            <template slot="append">
              <span v-if="codeTxt" @click="phonecode">{{codeTxt}}</span>
              <span v-if="!codeTxt">重新发送({{codeNull}})</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注信息" label-width="80px" class="memo" prop="memo">
          <el-input type="textarea" :rows="4" :maxlength="200" placeholder="请填写备注信息，如公司简介或合作意愿" v-model="infoData.memo" auto-complete="off"></el-input>
          <span>{{infoData.memo.length}}/200字</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('infoData')">取 消</el-button>
        <el-button type="primary" @click="inApply('infoData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</div>

</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import qs from 'qs'
import axios from 'axios'
const wxUrl = CONFIG.wxUrl;
const loginUrl = './api/login'
const rootUrl = CONFIG.rootUrl;
const adminUrl = CONFIG.adminUrl;
const wwwUrl = CONFIG.wwwUrl;

const codeImgUrl = rootUrl+'/servlet/captchaCode?t=';
const passwordReg = /^[a-zA-Z0-9\-~`!@#\$%\^&\*\(\)_\+-=\{\}\|\[\]\\:”;’<>,\.\/]{6,18}$/;
import {store} from 'utils/';
export default {
  components: {
  },
  validator: null,
  data(){
    let checkPhone = (rule, value, callback) => {
      let reg = /^1\d{10}$/;
      if (!value) {
        return callback(new Error('请填写联系人手机号'));
      }
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('手机号格式错误'));
        } else {
          callback();
        }
      }, 200);
    };
    return{
    	errLoginCount:0,
      wwwUrl:wwwUrl,
      codeTxt:'发送验证码',
      infoData:{
      	applyType:1,
       	company:'',
       	name:'',
       	phone:'',
       	code:'',
       	memo:''
      },
      dialogFormVisible:false,
      imageCode:'',
      showCode: false,//是否显示验证码
      iptphone:false,
      iptpass:false,
      iptcap:false,
      postData:{
        name:'',
        password:'',
        beforeLoginCode:'',
        captcha:''
      },
      errPrompt:'',
      scroll:'',
      // 头部交互
      titbg:false,
      rules:{
        company:[
          {required: true, message: '请输入公司名称', trigger: 'blur'},
          { min: 2, max: 30, message: '公司名称限2-30位', trigger: 'blur' }
        ],
        name:[
          {required: true, message: '请输入联系人', trigger: 'blur'},
          { min: 2, max: 20, message: '联系人长度限2-20位', trigger: 'blur' }
        ],
        phone:[
          { type: "string",validator:checkPhone, required: true,trigger: 'blur' }
        ],
        code:[
          {required: true, message: '请输入验证码', trigger: 'blur'},
          { min: 6, message: '验证码长度限6位', trigger: 'blur' }
        ],
        memo:[
          {required: true, message: '请输入备注信息', trigger: 'blur'}
        ]
      },
      codeNull:60,
      // 微信扫码部分
      isWeChat: false,
      wxUrl:wxUrl,
      weixinurl:'',
      sbid:'',
      type:'',
      refresh:true,//二维码刷新
      return_url:'',
      timer: ''
    }
  },
  methods:{
    submit(){
      this.errPrompt = '';
      var data = this.postData;
      if(!data.name){
        this.errPrompt = '请输入用户名';
        return false;
      }else if(!data.password){
        this.errPrompt = '请输入密码';
        return false;
      }else if(!(passwordReg.test(data.password))){
        this.errPrompt = '密码为6~18位英文字母、数字或特殊符号';
        return false;
      }

      if (this.errLoginCount>3) {
      	if(!data.captcha){
	        this.errPrompt = '请输入验证码';
	        return false;
	      }else if(!(/^[a-zA-Z0-9_-]{4}$/.test(data.captcha))){
	        this.errPrompt = '验证码由4位数字或字母组成';
	        return false;
	      }
      }
      this.$http.post(loginUrl, {
        captcha: data.captcha,
        name: data.name,
        password: data.password,

      })
      .then((resp) => {
        this.$router.push({name: 'index'});
      })
      .catch((err) => {
        if(err.msg){
          this.errPrompt = err.msg;
          this.errLoginCount = err.errLoginCount || 0;
        }else{
          this.$message({
            message: '系统繁忙，请稍后再试',
            type: 'warning'
          });
        }

        this.imgCode();
      });
    },
    imgCode(){
      this.imageCode = codeImgUrl+Math.random();
    },
    phoneclick(){
      this.iptphone = true;
      this.$refs['name'].focus();
    },
    passclick(){
      this.iptpass = true;
      this.$refs['pass'].focus();
    },
    iptcapClick(){
      this.iptcap = true;
      this.$refs['captcha'].focus();
    },
    capRefresh(){
      this.random = Math.random();
    },
    // 鼠标滚动
    menu() {
      this.scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(this.scroll>0){
        this.titbg = true;
      }else if(this.scroll == 0){
        this.titbg = false;
      }
    },
    // 手机验证码信息
    phonecode(){
      if(this.infoData.phone){
        this.$http.post('./api/service/apply/capcha',qs.stringify({account:this.infoData.phone}))
        .then((resp) => {
          console.log(resp)
          this.codeTxt = "";
          this.codeTime();
        })
        .catch((err) => {
          this.$message({
            message: err.msg,
            type: 'warning'
          });
          console.log(err);
        });
      }
    },
    // 验证码倒计时
    codeTime(){
      var self = this;
      var index = 60;
      var timer = setInterval(function(){
        index --;
        self.codeNull = index;
        if(index < 0){
          clearInterval(timer);
          self.codeNull = 60;
          self.codeTxt = "重新发送";
        }
      },1000);
    },
    inApply(infoData){
      var self = this;
      this.$refs[infoData].validate((valid) => {
        if (valid) {
          self.$http.post('./api/service/apply',{
          	applyType:self.infoData.applyType,
            companyName:self.infoData.company,
            name:self.infoData.name,
            phone:self.infoData.phone,
            code:self.infoData.code,
            remark:self.infoData.memo
          })
          .then((resp) => {
            self.$message({
              message: '您的申请已提交成功！',
              type: 'success'
            });
            self.dialogFormVisible = false;
          })
          .catch((err) => {
            self.$message({
              message: err.msg,
              type: 'warning'
            });
            console.log(err);
          });
        } else {
          return false;
        }
      });
    },
    // 微信扫码部分
    refreshbtn(){//点击刷新二维码
      this.wechat();
      this.refresh = true;
    },
    //获取二维码
    wechat(){
      var self = this;
      self.isWeChat = true;
      axios({
        method: 'post',
        url:wxUrl+'/weixin/serviceWechat/getWxQRUrl',
        withCredentials: false
      })
      // self.$http.post(wxUrl+'/weixin/serviceWechat/getWxQRUrl')
      .then((response) => {
        self.weixinurl = response.data.wxQRUrl;
        self.sbid = response.data.sbid;
        if(self.weixinurl){
          self.getPaystatus();
        }
      })
      .catch((error) => {
      });
    },
    // 轮询获取扫描状态
    getPaystatus(){
      var self = this;
      var i=0;
      self.timer = setInterval(function(){
        self.$http.post('api/wxLogin',qs.stringify({sbid: self.sbid,bindType:1}))
        .then((response) => {
          i++;
          if (i > 300) {
            self.refresh = false;
              clearInterval(self.timer);
              return;
          }

          if(response.data.code>0){
            clearInterval(self.timer);

            if(response.data.code==1){
            	store.set('wxInfo',response.data.data);
            	self.$router.push({name: 'wecharBind'});

            }else if(response.data.code==2){
              self.$router.push({name: 'index'});
            }

          }
        })
        .catch((error) => {
          self.$message({
            message: error.msg,
            type: 'warning'
          });
          self.refresh = false;
          clearInterval(self.timer);
        });
      }, 1000);
    },
    moveChat(){
      this.isWeChat = false;
      clearInterval(this.timer);
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    }
  },
  mounted(){
    this.imgCode();
    window.addEventListener('scroll', this.menu);
  },
  filters: {
  },
  watch:{
    dialogFormVisible:function(now,val){
      //关闭弹框
      if(this.dialogFormVisible){
        setTimeout(() => {
      		this.infoData={
	        	applyType:1,
	          company:'',
	          name:'',
	          phone:'',
	          code:'',
	          memo:''
	        }
      		this.$refs['infoData'].resetFields();
      	}, 200);
      }
    }
  }
}
</script>

<style lang='less'>
.home_login{background-color:#F5F6F9;width:100%;height:100%;}
.login{min-width:1170px;background-color: #F5F6F9;
  div.header_bg{background-color:#fff;padding:19px 0;height:60px;transition:all 0.5s ease;box-shadow: 0 6px 20px 0 rgba(190,190,207,0.50);
    >div{
      p{color:#223344;
        span{color: #556677;transition:all 0.5s ease;}
      }
      a{color: #223344;transition:all 0.5s ease;}
    }
  }
  .header{position: fixed;top:0;width:100%;padding:25px 0;height:73px;z-index:10;transition:all 0.5s ease;
    >div{margin: 0 auto;width:1170px;
      img{height:21px;}
      p{font-size: 22px;color: #FFFFFF;display:inline-block;vertical-align: top;line-height:100%;margin-top: -2px;
        span{font-size: 14px;color: #FFFFFF;}
      }
      a{text-decoration: none;color:#fff;font-size:14px;vertical-align: middle;display:inline-block;line-height:100%;margin-top: 5px;}
    }
  }
  .login_info{
    .bg_top{background: url(~assets/img/login/banner001.jpg) no-repeat;width:100%;height:522px;background-size: cover;
      >div{width:1170px;margin:0 auto;
        >p{font-size: 34px;color: #FFFFFF;line-height:522px;}
        .err{height:20px;line-height:20px;}
        .logo_left{margin-top: 230px;}
        .reg_login_box{
          >p{font-size: 20px;color: #223344;
            >span{font-size:14px;margin-top: 13px;line-height:100%;cursor:pointer;}
          }
          button{width:300px;height:40px;text-align:center;line-height:40px;background-color: #1A8AFF;background-image: linear-gradient(-90deg, #1A8AFF 6%, #08A5FF 98%);border-radius: 3px;font-size: 16px;color: #FFFFFF;}
          .wechat_img{    border: 1px solid #ddd;padding: 10px;width: 200px;height: 200px;margin: 30px auto 0;text-align: center;box-sizing: border-box;margin-top: 40px;}
          .wechat_prompt {font-size: 14px;color: #999;text-align: center;line-height: 100%;}
          .webchat{text-align:center;margin-bottom: 40px;
            div{border:1px solid #ddd;padding:10px;width:210px;height:210px;margin:30px auto 0;
              p{margin:auto;}
            }
            p{color:#999;font-size:14px;margin-top:25px;
              a{color:#f54845;text-decoration:none;cursor:pointer;background:url(~assets/img/login/RestartIcon.png) no-repeat right;padding-right: 14px;}
            }
          }
        }
      }
    }
    .bg_btm{background: url(~assets/img/login/banner01.png) scroll center top no-repeat;;width:100%;height:31px;margin-top: -29px;}
  }
  .adv{width:1170px;margin:0 auto;height:520px;padding-top:140px;
    >div{width:270px;height:303px;background-color:#fff;border-radius: 3px;text-align:center;padding-top:65px;transition:all 0.3s;
      img{margin-left: 5px;}
      p{width:210px;margin:15px auto 0;}
      .tit{font-size: 18px;color: #223344;line-height:25px;}
      .txt{color:#556677}
    }
    >div:hover{box-shadow: 0 6px 20px 0 rgba(190,190,207,0.50);margin-top: -10px;transition:all 0.3s;}
  }
  .data_info{height:460px;background-color:#fff;width:100%;
    .data_top{background: url(~assets/img/login/banner002.jpg) no-repeat;width:100%;height:375px;background-size: cover;
      >p{text-align:center;font-size: 28px;color: #FFFFFF;line-height:100%;padding-top: 60px;}
    }
    .data_txt{width:1170px;height:253px;margin:-197px auto 0;background-color:#fff;box-shadow: 0 6px 20px 0 rgba(190,190,207,0.50);padding:60px 140px 0;
      .mmd{margin:0 250px 0}
      >div{width:130px;background-color:#fff;text-align:center;}
      p{margin:5px auto 0;}
      .info_tit{font-size: 36px;color: #479CFF;line-height:50px;}
      .info_txt{font-size: 16px;color: #223344;}
    }
  }
  .cooperation{height:400px;background-color:#fff;width:100%;padding-top:25px;
    >div{margin:0 auto;width:1170px;text-align:center;
      >p{font-size: 28px;color: #223344;}
      .core_list{text-align:center;
        >div{width:270px;}
        .core_name{font-size: 16px;color: #223344;line-height:22px;}
        .core_txt{font-size: 14px;color: #556677;line-height:21px;}
      }
      .other_list{
        >div{width:210px;height:60px;border: 1px solid #DFE2E5;
        }
      }
    }
  }
  .joinin{height:448px;background-color:#F5F6F9;
    >div{width:1170px;margin:0 auto;text-align:center;padding:60px 0;
      >p{font-size: 28px;color: #223344;}
      i{border-bottom:1px dashed #DFE2E5;width:900px;display:block;margin: 90px auto 0;}
      .join_list{width:210px;margin-top: -50px;
        >div{border-radius:50%;border:1px solid #479CFF;width:100px;height:100px;text-align:center;background-color:#F5F6F9;margin:0 auto;
          img{margin-top: 34px;}
        }
        .join_tit{font-size: 16px;color: #223344;line-height:22px;}
        .join_txt{font-size: 14px;color: #556677;line-height:20px;}
      }
      button{width:200px;height:40px;text-align:center;line-height:40px;background-color: #1A8AFF;background-image: linear-gradient(-90deg, #1A8AFF 6%, #08A5FF 98%);border-radius: 3px;font-size: 14px;color: #FFFFFF;}
      button:hover{background-color: #1A8AFF;background-image: linear-gradient(-90deg, #177be6 6%, #0793e6 98%);}
    }
  }
  .footer{background: #F5F6F9;border-top: 1px solid #DFE2E5;width:100%;height:72px;padding-top:20px;
    p{width:478px;font-size: 12px;color: #999999;line-height:16px;text-align:center;margin:0 auto;}
  }
  // 加盟弹框
  .info_data{
    .el-dialog__footer{padding-top:0;}
    .el-dialog{width:450px;padding:0 10px 15px;
      .el-dialog__body{padding-bottom:0;padding-top:15px;
        .memo{position: relative;
          span{display:inline-block;position: absolute;bottom:0;right:25px;font-size: 12px;color: #7B8B9B;}
        }
        .el-form-item{
          label{font-size: 14px;color: #556677;text-align:left;}
          input{width:310px;height:34px;font-size:14px;}
          textarea{width:310px;font-size:14px;padding-bottom:30px;}
          .slot{
            input{width:219px;}
            .el-input-group__append{cursor:pointer;padding:0;width:100px;text-align:center;}
          }
          .el-radio-group{line-height: 36px;}
        }
      }
      .dialog-footer{
        button{width:80px;height:34px;}
      }
    }
  }
}
</style>
<style lang="less">
/*登录 注册 界面 CSS */
.login{position: relative;}

.reg_login_box{background: #FFFFFF;box-shadow: 0 1px 4px 0 rgba(0,0,0,0.20);border-radius: 3px;width: 380px;padding:40px 40px 40px;position: absolute;top:103px;right:0;}
.reg_login_box a{color: #3db1fa;}
.reg_login_box .ipt-wrap{position: relative;border-bottom: 1px solid #DFE2E5;;margin-top:32px;}
.reg_login_box .ipt-wrap input{width:100%;height: 30px;line-height: 30px;border:1px solid #fff; padding-left: 3px;font-size: 14px;}
.reg_login_box .ipt-wrap input:focus{outline: 0;}

.reg_login_box .wechat{text-align:center;margin-top:22px;}
.reg_login_box .wechat a{font-size: 16px;color:#666;text-decoration:none;margin:0 auto;text-align:center;}
.reg_login_box .wechat a span , .reg_login_box .wechat a img{vertical-align:middle;}
.reg_login_box .wechat a .clre{color:#eee;}
.reg_login_box .wechat-title{overflow:hidden}
.reg_login_box .wechat-title span{font-size:20px;}
.reg_login_box .wechat-title a{font-size:14px;margin-top:10px;color:#333;text-decoration:none;cursor:pointer;}
.reg_login_box .wechat-title a:hover{color:#3db1fa}


.captcha-wrap,.code-wrap{margin-top: 25px;}
.code-wrap span{position: absolute;right: 0;top:25px;}
form .captcha-wrap span{position: absolute;right: 0;top:-4px;}
.captcha-wrap span img{margin-top:3px;}

.login{
  .reminder{height: 22px;display: block;line-height:22px;}
  .reminder label{color: red;font-size: 14px;}
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: #fff !important;;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
  }
  .name{font-size: 14px;color: #556677;position:absolute;top:0px;left:3px;transition: top 0.2s ease;cursor: text;font-weight: normal;}
  .inputfocus{
    .label-name{top:-20px;}
  }
  form .inputfocus::after{-webkit-transform: translate3d(0, 0, 0);transform: translate3d(0, 0, 0);}
  .ipt-wrap::after{position: absolute;top:20px;right: 0;bottom: 0;left: 0;overflow: hidden;height: 10px;-webkit-transition: -webkit-transform 0.3s ease;transition: transform 0.3s ease;-webkit-transform: translate3d(-101%, 0, 0);transform: translate3d(-101%, 0, 0);border-bottom: 1px solid #3db1fa;    content: '';}
  // form{overflow: hidden;}
}
.reg_login_box{
  form{overflow: hidden;}
}
</style>
