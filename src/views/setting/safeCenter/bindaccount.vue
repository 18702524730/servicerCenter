<template>
	<div class="bind_account">
		<div class="bind_tit clearfix">
			<p class="fl tb01">登录方式</p>
			<p class="fl tb02">昵称</p>
			<p class="fl tb03 ml10">绑定状态</p>
			<p class="fl tb04">绑定时间</p>
		</div>
		<div class="bind_operation clearfix">
			<p class="fl tb01">微信扫码</p>
			<p class="fl tb02">
				<span v-if="wechatData.wxAccountSpDTO">{{wechatData.wxAccountSpDTO.nickname}}</span>
        <span v-if="!wechatData.wxAccountSpDTO">--</span>
			</p>
			<p class="fl tb03" style="margin-left:10px;">{{bindstate[wechatData.isBindWxSpAccount]}}</p>
			<p class="fl tb04" v-if="wechatData.wxAccountSpDTO">{{wechatData.wxAccountSpDTO.updateTime | dateFormat}}</p>
      <p class="fl tb04" v-if="!wechatData.wxAccountSpDTO">--</p>
			<div class="fr clearfix">
				<p class="mr20 fl" @click="removeBind" v-if="wechatData.isBindWxSpAccount">解绑</p>
				<p class="fl" @click="changeBind" v-if="wechatData.isBindWxSpAccount">更换</p>
				<p class="fl" @click="addBind" v-if="!wechatData.isBindWxSpAccount">添加绑定</p>
			</div>
		</div>
		<!-- 解绑 -->
		<el-dialog
		  title="提示"
		  :visible.sync="moveBind"
		  size="tiny" class="movebind">
		  <span>解除绑定后，原微信账号不再支持扫码登录。确认是否继续？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="moveBind = false">取 消</el-button>
		    <el-button type="primary" @click="moveBindWechat">确 定</el-button>
		  </span>
		</el-dialog>
		<!-- 更换 -->
		<el-dialog
		  :title="bindName"
		  :visible.sync="BindWeChat"
		  size="tiny" top="30%" class="bind_wechat">
		  <p class="wechat_tit" v-if="BindType">当前绑定账号：{{wechatData.wxAccountSpDTO.nickname}}</p>
		  <div class="webchat">
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
		</el-dialog>
	</div>
</template>
<script>
import Filters from 'utils/filters/'
import {store} from 'utils/';
import axios from 'axios'

import qs from 'qs'
const wxUrl = CONFIG.wxUrl;
export default {
  data() {
    return {
    	weixinurl:'',
    	refresh:true,//二维码刷新
    	moveBind:false,
    	BindWeChat:false,
    	bindName:'',
    	BindType:false,
    	operator_id:'',
    	// 查询的绑定信息
    	wechatData:{
    		wxAccountSpDTO:{
    			nickname:''
    		}
    	},
    	bindstate:["未绑定","已绑定"],
    	wxUrl:wxUrl,
    	weixinurl:'',
    	sbid:'',
    	timer:''
    }
  },
  methods: {
    // 初始化
  	wechat(){
      console.log(2,this.operator_id)
  		this.$http.get('./api/adminsBind/'+this.operator_id)
  		.then((response) => {
      	this.wechatData = response.data;
      })
      .catch((error) => {
      });
  	},
  	// 解绑
  	removeBind(){
  		this.moveBind = true;
  	},
  	moveBindWechat(){
      var self = this;
      this.moveBind = false;
  		this.$http.get('./api/unbindWxSpAccount?sbid='+this.wechatData.wxAccountSpDTO.sessionid)
  		.then((response) => {
      	self.$confirm('解除绑定成功！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        });
        self.wechat();
      })
      .catch((error) => {
      });
  	},
  	// 更换
  	changeBind(){
  		this.BindType = true;
  		this.bindName = '更换绑定';
  		this.BindWeChat = true;
  		this.bindWechat(2);
  	},
  	// 绑定
  	addBind(){
  		this.BindType = false;
  		this.bindName = '微信绑定';
  		this.BindWeChat = true;
  		this.bindWechat(1);
  	},
  	// 获取二维码
  	bindWechat(type){
      var self = this;
      self.isWeChat = true;
      // self.$http.get(wxUrl+'/weixin/serviceWechat/getWxQRUrl')
      axios({
          method: 'get',
          url:wxUrl+'/weixin/serviceWechat/getWxQRUrl',
          withCredentials: false
        })
      .then((response) => {
        self.weixinurl = response.data.wxQRUrl;
        self.sbid = response.data.sbid;
        if(self.weixinurl){
          self.getPaystatus(type);
        }
      })
      .catch((error) => {
      });
    },
  	// 轮询获取扫描状态
    getPaystatus(type){
      var self = this;
      var i=0;
      self.timer = setInterval(function(){
        self.$http.get('./api/bindWxSpAccount?sbid='+self.sbid+'&bindType='+type+'&t='+Math.random())
        .then((response) => {
          i++;
          if (i > 300) {
            self.refresh = false;
            clearInterval(self.timer);
            return;
          }
          if(response.data.code>0){
            self.BindWeChat = false;
            clearInterval(self.timer);
            if(response.data.code==200){
              self.wechat();
            }
          }
        })
        .catch((error) => {
          self.$message({
            message: error.msg,
            type: 'warning'
          });
          self.BindWeChat = false;
        	clearInterval(self.timer);
        	self.wechat();
        });
      }, 1000);
    }
  },
  mounted() {
    var info = store.get('userinfo');
  	this.operator_id = info.operator_id;
    this.wechat();

  },
  filters: {
    dateFormat: Filters.formatDate.dateFormat,
  },
  watch:{
  	BindWeChat:{
	    handler:function(val,oldval){
        if(!val){
        	clearInterval(this.timer);
        }
	    },
	    deep:true
	   }
  }
}
</script>
<style lang="less">
	.bind_account{padding: 20px;
		.tb01{width: 14%}
		.tb02{width: 15%}
		.tb03{width: 15%}
		.tb04{width: 20%}
		.bind_tit{background: #F5F5F5;border: 1px solid #DFE2E5;height: 50px;box-sizing: border-box;padding-left:20px;padding-right: 20px;border-bottom:0px;
			p{line-height: 50px;font-size: 13px;color:#223344;text-align: left;}
		}
		.bind_operation{border: 1px solid #DFE2E5;box-sizing: border-box;padding-left:20px;padding-right: 20px;
			>p{line-height: 20px;font-size: 13px;color:#556677;text-align: left;margin: 15px 0;}
			div{
				p{color: #479CFF;cursor:pointer;line-height:50px;font-size:13px;}
				p:hover{color: #387CCC;}
			}
		}
		// 更换，绑定
		.bind_wechat{
			.webchat{text-align:center;margin-bottom: 20px;
        div{border:1px solid #ddd;padding:10px;width:210px;height:210px;margin:20px auto 0;
          p{margin:auto;}
        }
        p{color:#999;font-size:14px;margin-top:25px;
          a{color:#f54845;text-decoration:none;cursor:pointer;background:url(~assets/img/login/RestartIcon.png) no-repeat right;padding-right: 14px;}
        }
      }
			.el-dialog{width:340px;}
			.wechat_tit{font-size: 14px;color: #223344;width:210px;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;margin:0 auto;}
		}

		// 弹框按钮
		.el-dialog__footer{
			.el-button{padding: 7px 23px;border-radius:3px;}
		}
		// 弹框头部
		.el-dialog__title{font-weight: normal;}
		.el-dialog__body{padding-top:10px;}
    .el-dialog{-ms-transform:translateX(-50%);}
	}
</style>
