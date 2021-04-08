<template>
	<div class="client_basic" v-loading="loading" element-loading-text="拼命加载中">
		<div v-if="!loading">
			<div class="basic_lists" v-if="detailData.memberinfo">
				<p>客户信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">联系人</p>
							<p class="txt">{{detailData.contactName}}</p>
						</li>
						<li>
							<p class="tit">客户昵称</p>
							<p class="txt">{{detailData.memberinfo.nickname}}</p>
						</li>
						<li>
							<p class="tit">姓名</p>
							<p class="txt">{{detailData.memberinfo.truename}}</p>
						</li>
						<li>
							<p class="tit">性别</p>
							<p class="txt">{{detailData.memberinfo.sex | sex}}</p>
						</li>
						<li>
							<p class="tit">注册手机号</p>
							<p class="txt">{{detailData.memberinfo.phone}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">联系电话</p>
							<p class="txt">{{detailData.contactPhone}}</p>
						</li>
						<li>
							<p class="tit">所属行业</p>
							<p class="txt">{{detailData.memberinfo.industryName}}</p>
						</li>
						<li>
							<p class="tit">QQ</p>
							<p class="txt">{{detailData.memberinfo.member_qq || '--'}}</p>
						</li>
						<li>
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.memberinfo.member_wechat || '--'}}</p>
						</li>
						<li>
							<p class="tit">邮箱</p>
							<p class="txt">{{detailData.contactEmail || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData.memberApplySubject && detailData.memberApplySubject.applyType">
				<p>申请主体</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.memberApplySubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}名称</p>
							<p class="txt">{{detailData.memberApplySubject.applyName}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType!=4">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeNumber}}</p>
							<p class="txt">{{detailData.memberApplySubject.applyNumber}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.memberApplySubject.applyPhone}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}注册地址</p>
							<p class="txt">{{detailData.memberApplySubject.applyAreaInfo + detailData.memberApplySubject.applyAddress}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby1">
							<a :href="detailData.memberApplySubject.standby1" target="_blank"><!--  @click="certificatePreview(usinessLicense)" -->
								<img :src="usinessLicense[0]" alt="">
	            	<p :title="detailData.memberApplySubject.applyType | fileName">{{detailData.memberApplySubject.applyType | fileName}}</p>
	            </a>
						</div>
						<div class="fl" v-if="detailData.memberApplySubject.standby2 && detailData.memberApplySubject.applyType != 2">
							<a :href="detailData.memberApplySubject.standby2" target="_blank"><!--  @click="certificatePreview(licenseName)" -->
								<img :src="licenseName[0]" alt="">
	            	<p :title="detailData.memberApplySubject.applyType | licenseName">{{detailData.memberApplySubject.applyType | licenseName}}</p>
            	</a>
						</div>
					</div>
				</div>
			</div>
			<div class="basic_lists">
				<p>开票信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left" v-if="!detailData.invoice || !detailData.invoice.invoiceType">
						<li>
							<p class="tit">未申请开票</p>
						</li>
					</ul>
					<ul class="fl category_left" v-if="detailData.invoice && detailData.invoice.invoiceType">
						<li>
							<p class="tit">发票类型</p>
							<p class="txt">{{detailData.invoice.invoiceType | invoiceTypeFormat}}</p>
						</li>
						<li>
							<p class="tit">发票抬头</p>
							<p class="txt">{{detailData.invoice.invoiceTitle || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2">
							<p class="tit">纳税人识别号</p>
							<p class="txt">{{detailData.invoice.invoiceCode || '--'}}</p>
						</li>
						<!-- <li>
							<p class="tit">开票时间</p>
							<p class="txt">{{detailData.invoice.invoiceType | invoiceTypeFormat}}</p>
						</li>
						<li>
							<p class="tit">官费发票号</p>
							<p class="txt">{{detailData.invoice.invoiceTitle || '--'}}</p>
						</li>
						<li>
							<p class="tit">服务费发票号</p>
							<p class="txt">{{detailData.invoice.invoiceType | invoiceTypeFormat}}</p>
						</li> -->
						<li v-if="detailData.memberApplySubject.applyType == 2&&detailData.invoice.invoiceType==2">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.invoice.registPhone || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2&&detailData.invoice.invoiceType==2">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}注册地址</p>
							<p class="txt">{{detailData.invoice.areaInfo + detailData.invoice.address || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2&&detailData.invoice.invoiceType==2">
							<p class="tit">开户行</p>
							<p class="txt">{{detailData.invoice.accountBank || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2&&detailData.invoice.invoiceType==2">
							<p class="tit">银行账号</p>
							<p class="txt">{{detailData.invoice.accountNumber || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData.information && detailData.information.trademarkName">
				<p>注册商标信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">{{detailData.information.trademarkName}}</p>
						</li>
						<li>
							<p class="tit">图样类型</p>
							<p class="txt">{{detailData.information.picType | picType}}</p>
						</li>
						<li>
							<p class="tit">商标描述</p>
							<p class="txt">{{detailData.information.trademarkDesc}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="powerAttorney[0]">
							<img :src="powerAttorney[0]" alt="">
            	<p @click="certificatePreview(powerAttorney)" title="委托书">委托书</p>
						</div>
						<div class="fl mr30" v-if="detailData.information.specifyPicUrl">
							<img :src="detailData.information.specifyPicUrl" alt="">
							<p @click="preview(detailData.information.specifyPicUrl)" title="指定色">指定色</p>
						</div>
						<div class="fl" v-if="detailData.information.blackWhitePicUrl">
							<img :src="detailData.information.blackWhitePicUrl" alt="">
							<p @click="preview(detailData.information.blackWhitePicUrl)" title="黑白色">黑白色</p>
						</div>
					</div>
				</div>
			</div>

			<div class="service" v-if="detailData.orderInformation">
				<p class="service_tit">服务单信息</p>
				<div class="service_table">
					<!-- <p>当前服务状态：待服务</p> -->
					<ul class="table_tit clearfix">
						<li class="fl tb01" style="padding-left:20px;">序号</li>
						<li class="fl tb02">服务单号</li>
						<li class="fl tb03">商标分类</li>
						<li class="fl tb04">加项数</li>
						<li class="fl tb05">补小项费用</li>
						<li class="fl tb06">小项支付状态</li>
						<li class="fl tb07">办理状态</li>
					</ul>
					<ul class="table_list clearfix" v-for="(item, idx) in detailData.orderInformation">
						<li class="fl tb01" style="padding-left:20px;"><p>{{idx+1}}</p></li>
						<li class="fl tb02"><p>{{item.orderSn}}</p></li>
						<li class="fl tb03"><p>{{getTmInfo(item.intCls)}}</p></li>
						<li class="fl tb04"><p>{{item.addMinNumber}}</p></li>
						<li class="fl tb05"><p>{{item.additionfee | priceformat}}</p></li>
						<li class="fl tb06"><p>{{item.itemSate|payStatusformat}}</p></li>
						<li class="fl tb07"><p>{{item.order_feedback_state}}</p></li>
						<li class="fr tb08"><a :href="'#/service/myServiceOrder/detail/'+item.orderId">查看详情</a></li>
					</ul>
				</div>
			</div>
			<div class="basic_lists">
				<p>服务人员信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">业务专员</p>
							<p class="txt">{{detailData.salesman}}</p>
						</li>
						<li>
							<p class="tit">完成专员</p>
							<p class="txt">{{detailData.agentName}}</p>
						</li>
						<li>
							<p class="tit">流程专员</p>
							<p class="txt">{{detailData.selectDocument}}</p>
						</li>
					</ul>
				</div>
			</div>

			<div class="service_state">
				<p class="service_tit">操作记录</p>
				<div class="service_table">
					<!-- <p>当前服务状态：待服务</p> -->
					<ul class="table_tit clearfix">
						<li class="fl tb01" style="padding-left:20px;">操作时间</li>
						<li class="fl tb02">操作类型</li>
						<li class="fl tb03">操作人</li>
					</ul>
					<ul class="table_list clearfix" v-for="(item, idx) in detailData.workOrderRecords" >
						<li class="fl tb01" style="padding-left:20px;"><p>{{item.updateTime|dateFormat}}</p></li>
						<li class="fl tb02"><p>{{item.recordContentService}}</p></li>
						<li class="fl tb03"><p>{{item.operatorName}}</p></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 图片预览 -->
		<el-dialog
		  :visible.sync="dialogVisible"
		  size="tiny" class="img_preview" :modal-append-to-body="true">
		  <img :src="imgsrc" alt="">
		</el-dialog>
		<!-- 证书预览 -->
		<el-dialog
		  :visible.sync="dialogImg"
		  size="tiny" class="img_preview" :modal-append-to-body="true">
		   <el-carousel :interval="5000" arrow="always" :autoplay='false' trigger="click">
		    <el-carousel-item v-for="(item,$index) in proxyImg" :key="$index">
		      <img :src="item" alt="">
		    </el-carousel-item>
		  </el-carousel>
		</el-dialog>
		<!-- 服务状态 -->
		<el-dialog title="设置服务状态"
		  :visible.sync="dialogState" class="state_preview" :modal-append-to-body="true">
		  <template>
		  	<span class="state_radio">请选择服务状态：</span>
			  <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
			  <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
			</template>
			<p class="mt10 mb10">备注：</p>
			<el-input class="service_note"
			  type="textarea"
			  :rows="5"
			  v-model="textarea" maxlength="100">
			</el-input>
			<span class="service_limit">{{textarea.length}}-100字</span>
			<div class="set_btn clearfix mt15">
				<p class="right_btn fr">确认</p>
				<p class="left_btn fr mr10">取消</p>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
	const workOrderDetailUrl = './api/findWorkOrderDetailByWorkOrderSn';
	export default {
  	components: {
    },
    data() {
      return {
      	textarea:'',
      	radio:'1',
      	dialogState:false,
      	dialogVisible:false,
      	imgsrc:'',
      	loading:false,
      	detailData:{},
      	dialogImg:false,
      	proxyImg:'',
      	// 个人证件
      	usinessLicense:[],
      	powerAttorney:[],
      	// 个人执照
      	licenseName:[],
      	cateIdData: intClsData.cateIdData
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
      // 预览
      preview(src){
      	this.imgsrc = src;
      	this.dialogVisible = true;
      },
      // 预览
      proxy(src){
	    	var self = this;
	    	this.$http.get(pdfUrl+'?pdf_url='+src).then((resp) => {
	    		self.proxyImg = resp.data;
	    	}).catch((error) => {
	        console.log(error);
	      });
	    },
	    // 执照
		  licenseUrl(url){
		    this.$http.get('./api/preview?pdf_url='+url)
		    .then((response) => {
		      this.licenseName = response.data.urls;
		    })
		    .catch((error) => {
		      console.log(error)
		    });
		  },
	    // 证件
		  imgUrl(url){
		    this.$http.get('./api/preview?pdf_url='+url)
		    .then((response) => {
		      this.usinessLicense = response.data.urls;
		    })
		    .catch((error) => {
		      console.log(error)
		    });
		  },
		  // 委托书
		  certificateImgUrl(url){
		    var self = this;
		    this.$http.get('./api/preview?pdf_url='+url)
		    .then((response) => {
		      self.powerAttorney = response.data.urls;
		    })
		    .catch((error) => {
		      console.log(error)
		    });
		  },
		  // 状态部分pdf查看
		  certificatePreview(url){
		    this.proxyImg = url;
		    this.dialogImg = true;
		  },
		  // 初始化
	    search(){
	    	var self = this;
	    	this.workOrderSn = this.$route.params.id;
	    	self.loading = true;
	    	this.$http.get(workOrderDetailUrl +'?workOrderSn=' + this.workOrderSn)
	    	.then((resp) => {
	        self.loading = false;
	    		self.detailData = resp.data;
	    		// 证件
		      if(self.detailData.memberApplySubject.standby1){
		        self.imgUrl(self.detailData.memberApplySubject.standby1);
		      }
		      // 执照
		      if(self.detailData.memberApplySubject.standby2){
		        self.licenseUrl(self.detailData.memberApplySubject.standby2);
		      }
		      // 委托书
		      if(self.detailData.information.proxyUrl){
		        self.certificateImgUrl(self.detailData.information.proxyUrl);
		      }
	    	}).catch((error) => {
	        self.loading = false;
	        console.log(error);
	      });
	    }
    },
    mounted() {
    	this.search();
    	// this.status = this.$router.query.status;
    },
    filters: {
    	priceformat: Filters.priceformat,
      dateFormat: Filters.formatDate.dateFormat,
      payStatusformat: Filters.payStatusformat,
      sex:Filters.sex,
      additionItemPayStatus:Filters.additionItemPayStatus,
      formatApplySbj:Filters.subjectTypeFormat,
      mainBodeSbj:Filters.mainBodeSbj,
      mainBodeNumber:Filters.mainBodeNumber,
      invoiceTypeFormat:Filters.invoiceTypeFormat,
      picType: function (input) {
		    var ret = ''
		    switch (input+''){
		      case '1':
		        ret = "黑白色";
		        break;
		      case '2':
		        ret = "指定色";
		        break;
		    }
		    return ret;
		  },
		  fileName: function(data){
		  	var ret = ''
		    switch (data+''){
		      case '1':
		        ret = "申请人身份证";
		        break;
		      case '2':
		        ret = "企业营业执照副本复印件";
		        break;
		      case '3':
		        ret = "申请人护照";
		        break;
		      case '4':
		        ret = "企业登记证件";
		        break;
		    }
		    return ret;
		  },
		  licenseName: function(data){
		  	var ret = ''
		    switch (data+''){
		      case '1':
		        ret = "个人营业执照";
		        break;
		      case '2':
		        ret = "";
		        break;
		      case '3':
		        ret = "中文护照译本";
		        break;
		      case '4':
		        ret = "企业登记证件译本";
		        break;
		    }
		    return ret;
		  }
    },
  }
</script>
<style lang='less'>
	.client_basic{background-color:#fff;padding:0px 20px 20px;min-height: 500px;
		.basic_lists{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.basic_category{text-align:left;border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
				.category_left{width:60%;}
				ul{width:50%;
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;}
						// 已支付
						p.topay{color:#36af47;}
						.tit{width:120px;font-size:13px;color:#556677;}

						.txt{font-size:13px;color:#7f8fa4;max-width:70%;margin-left: 10px;word-break:break-all;}
					}
				}
				//右侧图片预览定位
				.basic_img{width:40%;text-align:left;
					div{position: relative;width:100px;height:120px;border:1px solid #dfe2e5;
						img{width:98px;height:118px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;cursor:pointer;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;left:-1px;}
					}

				}
			}
		}
		.pay_inform{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			>div{border: 1px solid #DFE2E5;border-radius: 2px;
				ul{padding-left: 20px;
					li{box-sizing:border-box;margin-right:90px;
						p{font-size: 13px;color: #556677;line-height:40px;
							.topay{color:#36af47;}
						}
						.pay_right{margin-left: 20px;}
					}
				}
			}
		}
		// 服务信息
		.service{padding-top: 20px;
			.service_tit{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.service_btn{width:118px;height:30px;line-height:30px;text-align:center;border: 1px solid #479CFF;border-radius: 2px;font-size: 13px;color: #479CFF;cursor:pointer;}
			.service_table{margin-top: 10px;
				>p{font-size: 13px;color: #556677;margin-bottom:10px;}
				.tb01{width:9%;text-align:left;}
				.tb02{width:18%;text-align:left;}
				.tb03{width:14%;text-align:left;}
				.tb04{width:40px;text-align:right;}
				.tb05{width:12%;text-align:right;}
				.tb06{width:13%;text-align:right;}
				.tb07{width:18%;text-align:center;padding:0 20px;}
				.tb08{margin-right:20px;
					a{text-decoration:none;}
					a:hover{color:#408ce6;}
				}
				ul{
					li{line-height: 40px;height: 40px;}
				}
				.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
					li{font-size: 13px;color: #223344;}
				}
				.table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;border-bottom:1px solid #DFE2E5;
					li{
						padding:0 5px;
						p{line-height:18px;line-height: 40px;height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;color: #556677;font-size: 13px;}
					}
				}
			}
		}
		// 工单状态
		.service_state{padding-top: 20px;
			.service_tit{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.service_btn{width:118px;height:30px;line-height:30px;text-align:center;border: 1px solid #479CFF;border-radius: 2px;color: #479CFF;cursor:pointer;}
			.service_table{margin-top: 10px;
				>p{font-size: 13px;color: #556677;margin-bottom:10px;}
				.tb01{width:33.3%;text-align:left;}
				.tb02{width:33.3%;text-align:left;}
				.tb03{width:33.3%;text-align:left;}
				ul{
					li{line-height: 40px;height: 40px;}
				}
				.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
					li{font-size: 13px;color: #223344;}
				}
				.table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;border-bottom:1px solid #DFE2E5;
					li{
						p{line-height:18px;line-height: 40px;height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #556677;font-size: 13px;}
					}
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
	    .el-carousel{margin:0 auto;width:835px;
	      .el-carousel__container{margin:0 auto;height:650px;
	        .el-carousel__arrow{position: fixed;}
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
			.state_radio{margin-right:10px;}
			.set_btn{
				p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
				.right_btn{background: #479CFF;color:#fff;}
				.left_btn{background: #FFFFFF;border: 1px solid #479CFF;color:#479CFF}
			}
			.service_limit{position: absolute;bottom:85px;right: 30px;color:#999;font-size:13px;}
		}
	}
</style>
