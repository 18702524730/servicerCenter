 <template>
	<div class="handwork_dateil" v-loading="loading">
		<!-- <div class="to_old">
			<p @click="toOld">返回</p>
		</div> -->
		<div>
			<p class="handwork">编辑</p>
			<div class="basic_lists">
				<p>官方信息</p>
				<div class="basic_category clearfix border_b">
					<ul class="fl category_left">
						<li class="mb10 clearfix">
							<p class="tit">注册号</p>
							<p class="txt">
							{{WorkLendData.acceptmaterials}}
							</p>
						</li>
						<li class="clearfix mb10">
							<p class="tit">商标类别</p>
							<p class="txt">
							{{getTmInfo(WorkLendData.category)}}
						  </p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit">商标名称</p>
							<p class="txt">{{WorkLendData.trademarkName||'--'}}</p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit">商标状态</p>
							<p class="txt">{{WorkLendData.trademarkStatus|trademarkStatus}}</p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit">类似群组</p>
							<p class="txt">{{WorkLendData.similarGroup|| '--'}}</p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit">申请人</p>
							<p class="txt">{{WorkLendData.applyName|| '--'}}</p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit">注册时间</p>
							<p class="txt">{{WorkLendData.registTrialDate | dateFormatYMD}}</p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit">到期时间</p>
							<p class="txt">{{WorkLendData.deathDate | dateFormatYMD}}</p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit">适用项目</p>
							<p class="txt">{{WorkLendData.application|| '--'}}</p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit fl">注册图样</p>
							<div class="img_handwork fl ml10" v-if="WorkLendData.picture">
								<img :src="WorkLendData.picture" alt="">
	            	<p>注册图样</p>
							</div>
							<p class="txt" v-else>--</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists">
				<p>卖品信息</p>
				<div class="basic_category clearfix border_b">
					<ul class="fl category_left">
						<li class="mb20 clearfix">
							<p class="tit lh_30">商标组合</p>
							<p class="txt price clearfix">
								<el-select v-model="WorkLendData.comby" placeholder="请选择商标组合" class="fl">
							    <el-option
							      v-for="item in assembly"
							      :key="item.id"
							      :label="item.name"
							      :value="item.id">
							    </el-option>
							  </el-select>
							  <!-- <span class="fl ml5">平台将自动推荐商标的组合类型，如与实际不符，请手动调整</span> -->
						  </p>
						</li>
						<li class="clearfix">
							<p class="tit fl">包装图样</p>
							<div class="upload_component fl clearfix ml10" style="margin-bottom:10px;">
								<uploader @complete="setUploadedDataSpecify" @resetUploader="resetUploader" :fileName="standby_name" :postAction="'iprp_servicer/api/seller/file/upload'" :url="standby" :valueName="'standby'" :size="1" :extensions="'jpg,png,bmp'"></uploader>
								<div class="upload_tip fl ml15">
									<p class="format">提示：推荐图样大小为260*260px，采用白色背景；<br> 支持jpg、png、bmp、pdf格式，大小限制1M以内； <br>若未上传包装图样，在平台则默认展示商标的注册图样。</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists">
				<p>售价信息</p>
				<div class="basic_category clearfix border_b">
					<ul class="fl category_left">
						<li class="mb20 clearfix">
							<p class="tit">价格类型</p>
							<p class="txt">
							 	<el-radio-group v-model="WorkLendData.priceType">
									<el-radio class="radio" :label="1">一口价</el-radio>
									<el-radio class="radio" :label="2">可议价</el-radio>
	  							<el-radio class="radio" :label="3">面议</el-radio>
	  						</el-radio-group>
								<span class="err_txt" v-if="typeBol">请选择价格类型</span>
							</p>
						</li>
						<li class="mb20 clearfix" v-if="WorkLendData.priceType!=3">
							<p class="tit lh_30">平台售价</p>
							<p class="txt price">
								<el-input class="handwork_num" :disabled="WorkLendData.priceType==3" v-model="WorkLendData.sellerPrice" placeholder="请输入内容"></el-input>
								<span>（不含开票费用）</span>
								<span class="err_txt" v-if="sellerBol">请输入1-1000000之间的数字</span>
							</p>
						</li>
						<li class="mb10 clearfix">
							<p class="tit">可否开票
								<el-popover
								  ref="popover"
								  placement="right"
								  title=""
								  width="264"
								  trigger="hover"
								  content="平台将承担开票费用，了解具体详情请联系平台客服。">
								</el-popover>
								<el-button v-popover:popover class="popover"><img src="~assets/img/goods/el-icon-information.png" width="14px" height="14px" alt=""></el-button>
							</p>
							<p class="txt">
								<el-radio-group v-model="WorkLendData.needTicket">
									<el-radio class="radio" :label="1">可开票</el-radio>
	  							<el-radio class="radio" :label="2">不可开票</el-radio>
	  						</el-radio-group>
								<span class="err_txt" v-if="ticketBol">请选择是否开票</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists">
				<p>辅助信息<span>（选填，仅限本人可见）</span></p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li class="mb20 clearfix">
							<p class="tit">商标来源</p>
							<p class="txt">
							 	<el-radio-group v-model="WorkLendData.trademarkFrom">
									<el-radio class="radio" :label="1">自己</el-radio>
									<el-radio class="radio" :label="2">他人</el-radio>
	  						</el-radio-group>
							</p>
						</li>
						<li class="mb20 clearfix">
							<p class="tit lh_30">底价</p>
							<p class="txt price">
								<el-input class="handwork_num" v-model="WorkLendData.reservePrice" placeholder="请输入内容"></el-input>
								<!-- <span>（选填，仅限本人可见）</span> -->
								<span class="err_txt" v-if="reserveBol">{{floorPrice}}</span>
							</p>
						</li>
						<li class="mb20 clearfix">
							<p class="tit lh_30">商标说明</p>
							<p class="txt">
								<el-input class="handwork_num" :maxlength="100" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="WorkLendData.trademarkRemark" placeholder="请填写商标说明"></el-input>
								<!-- <span class="err_txt">该价格限本人可见</span> -->
								<span class="textarea_txt">（{{WorkLendData.trademarkRemark?WorkLendData.trademarkRemark.length:0}}/100）</span>
								<!-- <span class="optional">（选填，仅限本人可见）</span> -->
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="handWork_btn">
				<button class="btn_r" @click="addTrademark">保存</button>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
	import uploader from 'cps/uploader/uploader.vue'
  const detailUrl = './api/seller/getTrademarkDetail';
  const synTrademark = './api/seller/synTrademark';
  const addTrademarkUrl = './api/seller/editTrademark';
  
  const assembly = [
  	{
  		id:1,
  		name:'中文'
  	},
  	{
  		id:2,
  		name:'字母'
  	},
  	{
  		id:3,
  		name:'图形'
  	},
  	{
  		id:4,
  		name:'数字'
  	},
  	{
  		id:5,
  		name:'组合'
  	}
  ]
	export default {
		components: {
			uploader
		},
    data() {
      return {
      	trademarkState:'',
      	lowPrice:'',
      	rate:'',
      	assembly:assembly,
      	rateType:'',
      	invioce:'',
				standby:'',
				standby_name:'',
      	cls:'',
      	number:'',
        loading:false,
        // 大类过滤
        cateIdData: intClsData.cateIdData,
        WorkLendData:{
        	priceType:1,
        	trademarkRemark:''
        },
        sellerBol:false,
        reserveBol:false,
        typeBol:false,
        ticketBol:false,
        floorPrice:'请输入1-1000000之间的数字'
      }
    },
    methods: {
    	toOld(){
    		this.$router.go(-1);
    	},
    	resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
				
			},
    	setUploadedDataSpecify(data){
				var d = data.data;
				if (d.url) {
					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					console.log(d)
				}else{
					this.uploaderErrCallback(d);
				}
			},
	    getTmInfo(item){// 大类过滤
	    	item = Number(item);
	  		if(item){
	  			var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
	      	return str;
	  		}else{
	  			var str = '--';
	  			return str;
	  		}
	    },
    	detailsWorkLend(){
    		let data = {
    			id:Number(this.$route.query.id)
    		}
    		this.$http.post(detailUrl,data)
    		.then((resp) => {
    			this.WorkLendData = resp.data;
    			this.standby = resp.data.packagePicture;
    		})
				.catch((err) => {
					console.log(err);
				});
    	},
    	addTrademark(){//保存修改
    		let self = this;
    		var rge = /^[0-9]*[1-9][0-9]*$/; // 创建正则表达式模式。
    		if(!this.WorkLendData.priceType){
    			this.typeBol = true;
    			return;
    		}else{
    			this.typeBol = false;
    		}
    		if(this.WorkLendData.priceType!=3){//面议时候平台售价不能输入
    			if(!this.WorkLendData.sellerPrice || !rge.test(this.WorkLendData.sellerPrice) || this.WorkLendData.sellerPrice > 1000000){
	    			this.sellerBol = true;
	    			return;
	    		}else{
	    			this.sellerBol = false;
	    		}
    		}else{
    			this.WorkLendData.sellerPrice = null;
    		}
    		 
    		if(!this.WorkLendData.needTicket){
    			this.ticketBol = true;
    			return;
    		}else{
    			this.ticketBol = false;
    		}
    		if(this.WorkLendData.priceType!=3){//面议时候底价可输入可不输入售价不能输入
    			if(!self.WorkLendData.reservePrice){
    				self.WorkLendData.reservePrice = null;
    				self.reserveBol = false;
    			}else if(self.WorkLendData.reservePrice){
    				if(!rge.test(self.WorkLendData.reservePrice) || self.WorkLendData.reservePrice > 1000000){
		    			self.reserveBol = true;
		    			self.floorPrice = '请输入1-1000000之间的数字';
		    			return;
		    		}
    			}
    		}else{//面议-底价存在时候校验，不存在不校验
    			if(self.WorkLendData.reservePrice &&( !rge.test(self.WorkLendData.reservePrice) || self.WorkLendData.reservePrice > 1000000)){
	    			self.reserveBol = true;
	    			self.floorPrice = '请输入1-1000000之间的数字';
	    			return;
	    		}else{
	    			self.WorkLendData.reservePrice = self.WorkLendData.reservePrice?self.WorkLendData.reservePrice:null;
	    			self.reserveBol = false;
	    		}
    		}
    		if(this.WorkLendData.priceType!=3){//面议时候底价校验
    			if(this.WorkLendData.reservePrice > this.WorkLendData.sellerPrice){
	    			this.floorPrice = '底价应小于平台售价';
	    			this.reserveBol = true;
	    			return;
	    		}else{
	    			this.reserveBol = false;
	    		}
    		}
    		let ret = {
    			packagePicture:this.standby
    		}
    		let data = Object.assign({}, this.WorkLendData,ret);
    		this.$http.post(addTrademarkUrl,data)
    		.then((resp) => {
    			this.$router.push({name: 'trademarkPublishList'});
    		}) 
				.catch((err) => {
					console.log(err);
				});
    	}
    },
		filters: {
			trademarkStatus: Filters.trademarkStatus,
			dateFormat: Filters.formatDate.dateFormat,
			dateFormatYMD: Filters.formatDate.dateFormatYMD,
		},
    mounted() {
    	console.log(this.$route.query.id)
    	if(this.$route.query.id){
    		this.detailsWorkLend()
    	}
    }
  }
</script>
<style lang='less'>
	.handwork_dateil{background-color:#fff;padding:0px 20px 20px;min-height: 500px;border-top:0;position: relative;
		.handwork{font-size:14px;color:#223344;line-height:20px;padding-top:20px;}
		.basic_lists{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;
				span{font-size:12px;color:#999;line-height:20px;}
			}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.border_b{border-bottom:1px solid #eee;}
			.basic_category{text-align:left;padding-bottom: 10px;position: relative;
				.category_left{width:730px;}
				ul{width:730px;
					li{
						.lh_30{line-height:30px;};
						>p{float: left;line-height:20px;}
						// 已支付
						p.topay{color:#36af47;}
						p.nopay{color:#F64744}
						.tit{width:148px;font-size:13px;color:#556677;
							span{font-size:12px;}
						}
						.txt{font-size:13px;color:#999;width:572px;margin-left: 10px;word-break:break-all;position: relative;
							input{width:300px;}
							.handwork_num{display:inline;}
							button{width:128px;height:30px;line-height:30px;text-align:center;background-color:#479cff;border-radius:2px;color:#fff;font-size:14px;}
							.el-radio__label{color:#556677;}
							>span{font-size:12px;color:#A8AFB5;line-height:30px;}
							.err_txt{font-size:12px;color:#F64744;line-height:16px;position: absolute;bottom:-16px;left:0;}
							.el-textarea .el-textarea__inner{width:360px;height:95px;border-radius:2px;font-size:13px;padding: 5px 7px 24px;}
							.textarea_txt{font-size:13px;color:#999;position: absolute;bottom:3px;right:225px;}
						}
						.txt.price{
							input{width:200px;}
						}
						.upload_component{width:470px;
							.upload_wrap{float:left;}
							.upload_tip{width:330px;
								.format{width:330px;font-size:12px;color:#A8AFB5;margin-top:72px;line-height:16px;}
							}
						}
					}
				}
				//右侧图片预览定位
				.img_handwork{position: relative;width:100px;height:120px;
					img{width:100px;height:120px;border:1px solid #eee;}
					p{position: absolute;bottom:0px;height:26px;line-height:26px;color:#fff;background:rgba(0,0,0,0.6);text-align:center;width:100px;cursor: pointer;}
				}
			}
		}
		// 预览
		.img_preview{
			.el-dialog--tiny{width:940px;
				img{width:900px;}
			}
		}
		.img_preview{
	    .el-carousel{margin:0 auto;width:900px;padding:45px;
	      .el-carousel__container{margin:0 auto;height:650px;
	        .el-carousel__arrow--right{right:-40px;}
			.el-carousel__arrow--left{left:-40px;}
	        .el-carousel__item{text-align:center;width:810px;overflow-y: auto;
	          img{width:810px;}
	        }
	      }
	    }
	  }
		// 弹框样式
		.state_preview{
			.el-dialog__title{font-size: 14px;color: #223344;font-weight: normal;}
			.el-dialog__body{padding-top:10px;}
			.el-dialog{width:500px;}
			.radio,.state_radio,p{font-size: 14px;color: #556677;}
			.el-dialog__body{
				.el-radio-group{margin-left: -15px;}
			}
			.set_btn{
				p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
				.right_btn{background: #479CFF;color:#fff;}
				.left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF}
			}
			.service_limit{position: absolute;bottom:85px;right: 30px;font-size: 14px;color: #A8AFB5;}
			.el-radio__label{color:#556677;}
			.el-textarea__inner{border-color:#DFE2E5;border-radius:2px;}
		}

		.el-carousel__container{height:600px;}
		.el-carousel__button{background-color: #3db1fa;}
		.handWork_btn{
			button{width:88px;height:36px;border-radius:2px;text-align:center;line-height:34px;border: 1px solid #479cff;font-size:14px;}
			.btn_l{color:#479cff;background-color:#fff;}
			.btn_r{color:#fff;background-color:#479cff;}
		}
		.popover{width:14px;height:14px;padding: 0;border: 0;vertical-align: sub;}
		// .to_old{background-color:#fff;padding-top:20px;padding-left:0;
		// 	p{background: url(~assets/img/to-old.png) no-repeat;background-size:28px;height:28px;width:60px;padding-left:30px;line-height:28px;font-size:13px;color:#333;cursor: pointer;}
		// 	p:hover{background: url(~assets/img/to-old-hover.png) no-repeat;background-size:28px;}
		// }
	}
</style>
