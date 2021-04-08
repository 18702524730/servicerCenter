<template>
	<div class="service_detail_con">
		<div class="basic_dateil" v-loading="loading">
			<div v-if="!loading">
				<div class="basic_lists" v-if="detailData">
					<p>官方信息</p>
					<div class="basic_category clearfix border_b">
						<ul class="fl category_left">
							<li>
								<p class="tit">注册申请号</p>
								<p class="txt">{{detailData.acceptmaterials}}</p>
							</li>
							<li>
								<p class="tit">商标类别</p>
								<p class="txt">{{getTmInfo(detailData.category)}}</p>
							</li>
							<li>
								<p class="tit">商标名称</p>
								<p class="txt">{{detailData.trademarkName || '--'}}</p>
							</li>
							<li>
								<p class="tit">法律状态</p>
								<p class="txt">{{detailData.trademarkStatus | trademarkStatus}}</p>
							</li>
							<li>
								<p class="tit">商标组合</p>
								<p class="txt">{{detailData.comby | trademarkComby}}</p>
							</li>
							<li>
								<p class="tit">类似群组</p>
								<p class="txt">{{detailData.similarGroup || '--'}}</p>
							</li>
							<li>
								<p class="tit">申请人</p>
								<p class="txt">{{detailData.applyName || '--'}}</p>
							</li>
							<li>
								<p class="tit">注册时间</p>
								<p class="txt">{{detailData.registTrialDate | dateFormatYMD}}</p>
							</li>
							<li>
								<p class="tit">到期时间</p>
								<p class="txt">{{detailData.deathDate | dateFormatYMD}}</p>
							</li>
							<li>
								<p class="tit">适用项目</p>
								<p class="txt">{{detailData.application}}</p>
							</li>
						</ul>
						<div class="basic_img clearfix">
							<div class="fl" @click="preview(detailData.picture)">
								<img :src="detailData.picture" alt="">
	            	<p>注册图样</p>
							</div>
						</div>
					</div>
				</div>
				<div class="basic_lists" v-if="detailData">
					<p>交易信息</p>
					<div class="basic_category clearfix border_b">
						<ul class="fl category_left">
							<li>
								<p class="tit">商标提交时间</p>
								<p class="txt">{{detailData.commitTime | dateFormat}}</p>
							</li>
							<li>
								<p class="tit">价格类型</p>
								<p class="txt">{{detailData.priceType | priceType}}</p>
							</li>
							<li>
								<p class="tit">建议售价</p>
								<p class="txt">{{detailData.sellerPrice | priceformat}}</p>
							</li>
							<li>
								<p class="tit">是否开票</p>
								<p class="txt">{{detailData.needTicket == 1 ? '可开票' : '不可开票'}}</p>
							</li>
							<li>
								<p class="tit">销售状态</p>
								<p class="txt">{{detailData.saleStatus | saleStatus}}</p>
							</li>
							<li>
								<p class="tit">上架状态</p>
								<p class="txt">{{detailData.groundStatus == 1 ? '已上架' : '已下架'}}</p>
							</li>
						</ul>
						<div class="basic_img clearfix" v-if="detailData.packagePicture">
							<div class="fl mb20" @click="preview(detailData.packagePicture)">
		            <img :src="detailData.packagePicture" alt="">
		            <p title="包装图样">包装图样</p>
							</div>
						</div>
					</div>
				</div>
				<div class="basic_lists" v-if="detailData">
					<p>辅助信息</p>
					<div class="basic_category clearfix">
						<ul class="fl category_left">
							<li>
								<p class="tit">底价</p>
								<p class="txt">{{detailData.reservePrice | priceformat}}（仅限卖家可见）</p>
							</li>
							<li>
								<p class="tit">商标来源</p>
								<p class="txt">{{detailData.trademarkFrom ==1 ?'自己':detailData.trademarkFrom == 2 ? '他人':'--'}}</p>
							</li>
							<li>
								<p class="tit">商标说明</p>
								<p class="txt">{{detailData.trademarkRemark || '--'}}</p>
							</li>
						</ul>
					</div>
				</div>

				<div class="detail_null" v-if="!detailData">
					<div>
						<img src="~assets/img/nulldata.png" alt="">
						<span class="ml5">系统繁忙，请稍后再试</span>
					</div>
				</div>
			</div>
			<!-- 图片预览 -->
			<el-dialog
			  :visible.sync="dialogVisible"
			  size="tiny" class="img_preview" :modal-append-to-body="true">
			  <img :src="imgsrc" width="260px" alt="">
			</el-dialog>
		</div>
	</div>
	
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
  const detailUrl = './api/seller/getTrademarkDetail';
	export default {
    data() {
      return {
      	status:1,
      	// 预览部分
      	dialogVisible:false,
      	dialogImg:false,
      	imgsrc:'',
      	detailData:'',
      	// 营业执照
		    usinessLicense:[],
		    // 委托书
		    powerAttorney:[],
		    //身份证
        cardImg:[],
        loading:false,
        // 证书图片地址集合
        proxyImg:{},
        // 大类过滤
        cateIdData: intClsData.cateIdData,
        id:''
      }
    },
    methods: {
    	// 大类过滤
    	getTmInfo(item){
    		if(item){
    			var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
        	return str;
    		}else{
    			var str = '--';
    			return str;
    		}
      },
      // 初始化
    	infoDetail(){
				var self = this;
				console.log(1111)
	      self.loading = true;
	      let data = {
	      	id:Number(this.id)
	      }
	    	this.$http.post(detailUrl, data)
	    	.then((resp) => {
	        self.loading = false;
	    		self.detailData = resp.data;
	    		self.order = resp.data.order_is_history;
	    	}).catch((error) => {
	        self.loading = false;
	        console.log(error);
	      });
	    },
		  // 状态部分pdf查看
		  certificatePreview(url){
		    this.proxyImg = url;
		    this.dialogImg = true;
		  },
		  // 预览
      preview(src){
      	this.imgsrc = src;
      	this.dialogVisible = true;
      },
    },
		filters: {
			priceType: Filters.priceType,
			saleStatus: Filters.saleStatus,
			trademarkStatus: Filters.trademarkStatus,
			trademarkComby: Filters.trademarkComby,
			dateFormat: Filters.formatDate.dateFormat,
			dateFormatSFM:Filters.formatDate.dateFormatSFM,
			priceformat: Filters.priceformat,
			dateFormatYMD: Filters.formatDate.dateFormatYMD,
			
		},
    mounted() {
    	this.id = this.$route.params.id;
    	this.infoDetail();
    	// this.status = this.$router.query.status;
    }
  }
</script>
<style lang='less'>
	.basic_dateil{background-color:#fff;padding:0px 20px 20px;min-height: 500px;border-top:0;position: relative;
		.basic_lists{padding-top: 20px;
			>p{font-size: 14px;color: #333;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.border_b{border-bottom:1px solid #eee;}
			.basic_category{text-align:left;padding-bottom: 10px;position: relative;
				.category_left{width:730px;}
				ul{width:730px;
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;}
						// 已支付
						p.topay{color:#36af47;}
						p.nopay{color:#F64744}
						.tit{width:120px;font-size:13px;color:#666;}
						.txt{font-size:13px;color:#999;width:50%;margin-left: 10px;word-break:break-all;}
					}
				}
				//右侧图片预览定位
				.basic_img{text-align:left;position: absolute;bottom:20px;right:100px;
					div{position: relative;width:100px;height:120px;border:1px solid #eee;border-radius:2px;cursor: pointer;
						img{width:98px;height:118px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;cursor:pointer;left:-1px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
					}
				}
			}
		}
		// 预览
		.img_preview{text-align:center;
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
			.el-dialog__title{font-size: 14px;color: #333;font-weight: normal;}
			.el-dialog__body{padding-top:10px;}
			.el-dialog{width:500px;}
			.radio,.state_radio,p{font-size: 14px;color: #666;}
			.el-dialog__body{
				.el-radio-group{margin-left: -15px;}
			}
			.set_btn{
				p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
				.right_btn{background: #479CFF;color:#fff;}
				.left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF}
			}
			.el-radio__label{color:#666;}
			.el-textarea__inner{border-color:#DFE2E5;border-radius:2px;}
		}

		.el-carousel__container{height:600px;}
		.el-carousel__button{background-color: #ff6439;}

		.detail_null{text-align:center;position: absolute;top:50%;width:100%;
			span{vertical-align: middle;display: inline-block;line-height:34px;vertical-align: top;font-size:13px;color: #A8AFB5;}
		}

	}
</style>
