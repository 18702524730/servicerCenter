<template>
	<div class="code">
		<div class="prompt">
			<p>
				<i class="el-icon-information"></i>
				用户购买时输入服务商识别码、点击邀请链接或微信扫码下单，即成为绑定客户。该客户的同类业务订单将全部分配至当前服务商。
			</p>
		</div>
		<div class="service_code mt15 clearfix">
			<p class="fl br" style="width:140px;">服务商识别码</p>
			<p class="fl pc">{{codeData.idCode}}</p>
			<button class="fr mr10 btn" :data-clipboard-text="codeData.idCode" @click="copy">复制</button>
			<!-- <button class="fr mr10">复制</button> -->
		</div>
		<div class="code_down clearfix mt10">
			<div class="code_left fl">
				<p>国内商标注册邀请</p>
			</div>
			<div class="code_right">
				<div class="top">
					<p class="fl">链接： {{service_url}}</p>
					<button class="fr mr10 btn" :data-clipboard-text="service_url" @click="copy">复制</button>
				</div>
				<div class="bottom">
					<p class="fl">二维码：</p>
					<qrcode class="fl mt10" :val="qrcodeVal" :size="90"></qrcode>
					<!-- <canvas id="canvas"></canvas> -->
					<!-- <button class="fr mr10 mt" @click="downImg(codeData.idCode)">下载</button> -->
					<a :href="downUrl" target="_blank" class="fr mr10 mt">下载</a>
				</div>
			</div>
		</div>
		<p class="mt15">注：目前仅允许生成国内商标注册申请业务，后续将陆续开放其他业务，感谢您的支持。</p>
	</div>
</template>
<script>
import Vue from 'vue'
import Clipboard from 'clipboard';
import qrcode from 'cps/qrcode/qrcode.vue'

const wwwUrl = CONFIG.wwwUrl;
const wxUrl = CONFIG.wxUrl;
const rootUrl = CONFIG.rootUrl;
const clipboard = new Clipboard('.btn');
export default {
	components: {
		qrcode
  },
  data () {
    return {
    	codes:'',
    	codeData:{},
    	service_url:'',
    	downUrl:'',
    	rootUrl:rootUrl,
    	qrcodeVal:''
    }
  },
  methods:{
  	codeInfo(){
  		this.$http.get('./api/service_info')
  		.then((resp) => {
  			this.codeData = resp.data;
  			this.service_url = wwwUrl + '/products/1.htm?idcode='+resp.data.idCode;
  			this.soceImg(resp.data.idCode)
  			this.downUrl = this.rootUrl + '/api/downloadidcode?idCode=' + resp.data.idCode;
	      console.log(resp)
    	}).catch((error) => {
	      console.log(error);
	    })
  	},
  	soceImg(id){
  		this.$http.get(wxUrl+'/weixin/wechat/getShortUrl?idcode='+id)
  		.then((resp) => {
	      console.log(resp)
	      this.qrcodeVal = resp.data.shortUrl;
    	}).catch((error) => {
	      console.log(error);
	    })
  	},
  	copy(){
  		var self = this;
  		//复制成功执行的回调，可选
	    clipboard.on('success', function(e){
	      self.$message({
	        message: '内容复制成功',
	        type: 'success'
	      });
	    })
  	}
  },
  mounted() {
    this.codeInfo();
  }
}
</script>
<style lang="less">
	.code{padding: 20px;min-width: 786px;
		.prompt{min-height: 40px;line-height: 40px;background: #F8FCFF;border: 1px solid #B4DFFF;box-sizing: border-box;
			i{font-size: 20px;color:#f7ba2a;margin-right: 8px;}
			p{font-size: 13px;color: #556677;display: inline-block;line-height:38px;vertical-align: top;min-width:730px;max-width: 100%;line-height:20px;margin-top:9px;margin-bottom:9px;padding-left:20px;padding-right: 10px;}
		}
		.service_code{border: 1px solid #DFE2E5;border-radius: 2px;
			>p{font-size: 13px;color: #556677;line-height:48px;padding-left: 20px;}
			.pc{color: #7F8FA4;}
			.br{border-right: 1px solid #DFE2E5;}
			.code_img{line-height:160px;}
			button{background: #479CFF;border:1px solid #479CFF;border-radius: 2px;width:88px;height:30px;color:#fff;text-align: center;font-size:14px;margin-top: 9px;}
			button:hover{border-color: #408CE6;background-color: #408CE6;}
		}
		.code_down{border: 1px solid #DFE2E5;border-radius: 2px;display:table;width:100%;
			.code_left{height:161px;width:140px;border-right:1px solid #DFE2E5;
				p{line-height:161px;font-size: 13px;color: #556677;padding-left: 20px;}
			}
			.code_right{width:100%;display:table-cell;
				button,a{background: #479CFF;border-radius: 2px;border:1px solid #479CFF;width:88px;height:30px;color:#fff;text-align: center;font-size:14px;margin-top: 9px;line-height:30px;display:inline-block;}
				button:hover,a:hover{border-color: #408CE6;background-color: #408CE6;}
				a{text-decoration:none;lissne-height:30px;}
				.mt{margin-top: 38px;}
				.top{height:50px;vertical-align: top;line-height:50px;}
				.bottom{height:110px;border-top: 1px solid #DFE2E5;
					p{vertical-align: middle;line-height:110px;}
				}

				p{font-size: 13px;color: #7F8FA4;padding-left: 20px;}
			}
		}
		p{font-size: 12px;color: #A8AFB5;}
	}
</style>
