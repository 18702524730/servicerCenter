<template>
	<div class="basic_dateil" v-loading="loading">
		<div v-if="!loading">
			<div class="basic_lists" v-if="detailData">
				<p>基本信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">服务单号</p>
							<p class="txt">{{detailData.order_sn}}</p>
						</li>
						<li>
							<p class="tit">办理状态</p>
							<p class="txt">{{detailData.order_feedback_state}}</p>
						</li>
						<li>
							<p class="tit">金额</p>
							<p class="txt">{{detailData.payment_amount | priceformat}}</p>
						</li>
						<li>
							<p class="tit">支付状态</p>
							<p class="txt" :class="{'topay':detailData.payment_state == 1,'nopay':!detailData.payment_state}">{{detailData.payment_state | payStatusformat}}</p>
						</li>
						<li>
							<p class="tit">支付时间</p>
							<p class="txt">{{detailData.payment_time | dateFormat}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">服务分类</p>
							<p class="txt">{{detailData.bs_class_name}}</p>
						</li>
						<li v-if="detailData.order_service_state">
							<p class="tit">服务状态</p>
							<p class="txt">{{detailData.order_service_state | orderStatus}}</p>
						</li>
						<li>
							<p class="tit">服务名称</p>
							<p class="txt">{{detailData.bs_name}}</p>
						</li>
						<li>
							<p class="tit">售后状态</p>
							<p class="txt">{{detailData.refund_state | refundState}}</p>
						</li>
						<li>
							<p class="tit">下单时间</p>
							<p class="txt">{{detailData.create_time | dateFormat}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData.memberinfo">
				<p>拾贝网账户信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">用户昵称</p>
							<p class="txt">{{detailData.memberinfo.nickname || '--'}}</p>
						</li>
						<li>
							<p class="tit">姓名</p>
							<p class="txt">{{detailData.memberinfo.truename || '--'}}</p>
						</li>
						<li>
							<p class="tit">性别</p>
							<p class="txt">{{detailData.memberinfo.sex | sex}}</p>
						</li>
						<li>
							<p class="tit">手机号码</p>
							<p class="txt">{{detailData.memberinfo.phone || '--'}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">所属行业</p>
							<p class="txt">{{detailData.memberinfo.industryName || '--'}}</p>
						</li>
						<li>
							<p class="tit">QQ</p>
							<p class="txt">{{detailData.memberinfo.member_qq || '--'}}</p>
						</li>
						<li>
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.memberinfo.member_wecha || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData.memberDTO">
				<p>客户信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">用户昵称</p>
							<p class="txt">{{detailData.memberDTO.nickname || '--'}}</p>
						</li>
						<li>
							<p class="tit">姓名</p>
							<p class="txt">{{detailData.memberDTO.truename || '--'}}</p>
						</li>
						<li>
							<p class="tit">性别</p>
							<p class="txt">{{detailData.memberDTO.sex | sex}}</p>
						</li>
						<li>
							<p class="tit">手机号码</p>
							<p class="txt">{{detailData.memberDTO.phone || '--'}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">所属行业</p>
							<p class="txt">{{detailData.memberDTO.industryName || '--'}}</p>
						</li>
						<li>
							<p class="tit">QQ</p>
							<p class="txt">{{detailData.memberDTO.member_qq || '--'}}</p>
						</li>
						<li>
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.memberDTO.member_wechat || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData.memberApplySubject">
				<p>申请主体</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.memberApplySubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}名称</p>
							<p class="txt">{{detailData.memberApplySubject.applyName || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType!=4">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeNumber}}</p>
							<p class="txt">{{detailData.memberApplySubject.applyNumber || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.memberApplySubject.applyPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}注册地址</p>
							<p class="txt">{{detailData.memberApplySubject.applyAreaInfo + detailData.memberApplySubject.applyAddress || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl" v-if="usinessLicense[0] && detailData.memberApplySubject.applyType!=2"><!--  @click="certificatePreview(usinessLicense)" -->
							<a :href="detailData.memberApplySubject.standby2" target="_blank">
								<img :src="usinessLicense[0]" alt="">
	            	<p :title="detailData.memberApplySubject.applyType | licenseName">{{detailData.memberApplySubject.applyType | licenseName}}</p>
	            </a>
						</div>
		        <div class="fl ml20" v-if="detailData.memberApplySubject.standby1"><!--  @click="certificatePreview(cardImg)" -->
		        	<a :href="detailData.memberApplySubject.standby1" target="_blank">
			          <img :src="cardImg[0]" alt="">
			          <p :title="detailData.memberApplySubject.applyType | fileName">{{detailData.memberApplySubject.applyType | fileName}}</p>
		          </a>
		        </div>
					</div>
				</div>
			</div>
			<div class="basic_lists">
				<p>开票信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left" v-if="detailData.invoice">
						<li>
							<p class="tit">发票抬头</p>
							<p v-if="detailData.memberApplySubject.applyType == 1 || detailData.memberApplySubject.applyType == 3" class="txt">{{detailData.invoice.invoiceTitle || '--'}}（非企业）</p>
							<p v-if="detailData.memberApplySubject.applyType == 2 || detailData.memberApplySubject.applyType == 4" class="txt">{{detailData.invoice.invoiceTitle || '--'}}（企业）</p>
						</li>
						<!-- 增值税专用发票 -->
						<li v-if="detailData.invoice.invoiceType">
						<!-- 可以有三种：普通增值税个人和企业，专用增值税发票 -->
							<p class="tit">开票类型</p>
							<p class="txt">{{detailData.invoice.invoiceType == 1 ? '增值税普通发票' : detailData.invoice.invoiceType == 2 ? '增值税专用发票' : ''}}</p>
						</li>
						<li>
							<p class="tit">收件地址</p>
							<p class="txt">{{detailData.invoice.sendAddress || '--'}}</p>
						</li>
						<!-- 下单且提交开票信息 -->
						<li v-if="(detailData.invoice.invoiceCode && detailData.memberApplySubject.applyType == 2) || (detailData.invoice.invoiceCode && detailData.memberApplySubject.applyType == 4)" >
							<p class="tit">纳税人识别号</p>
							<p class="txt">{{detailData.invoice.invoiceCode || "--"}}</p>
						</li>
						<li v-if="detailData.invoice.invoiceType == 2">
							<p class="tit">企业联系电话</p>
							<p class="txt">{{detailData.invoice.registPhone || "--"}}</p>
						</li>
						<li v-if="detailData.invoice.invoiceType == 2">
							<p class="tit">企业注册地址</p>
							<p class="txt">{{detailData.invoice.provinceId + detailData.invoice.cityId + detailData.invoice.areaId + detailData.invoice.areaInfo + detailData.invoice.address}}</p>
						</li>
						<li v-if="detailData.invoice.invoiceType == 2">
							<p class="tit">开户行</p>
							<p class="txt">{{detailData.invoice.accountBank || "--"}}</p>
						</li>
						<li v-if="detailData.invoice.invoiceType == 2">
							<p class="tit">银行账号</p>
							<p class="txt">{{detailData.invoice.accountNumber || "--"}}</p>
						</li>
						<li v-if="detailData.invoice.invoiceType == 2">
							<p class="tit">是否寄送</p>
							<p class="txt">{{detailData.invoice.sendState == 1 ? '寄送' : detailData.invoice.sendState == 2 ? '不寄送' : ''}}</p>
						</li>
					</ul>
					<ul class="fl category_left" v-else>
						<li>
							<p class="tit">未申请开票</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData">
				<p>注册商标信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">{{detailData.tradeMarkName || '--'}}</p>
						</li>
						<li>
							<p class="tit">商标分类</p>
							<p class="txt">{{getTmInfo(detailData.intCls)}}</p>
						</li>
						<li>
							<p class="tit">小项类目</p>
							<p class="txt">{{detailData.group || '--'}}</p>
						</li>
						<li>
							<p class="tit">在先近似商标</p>
							<p class="txt">{{detailData.similarTrademark || '--'}}</p>
						</li>
						<li>
							<p class="tit">注册通过率</p>
							<p class="txt" v-if="detailData.registerPassRate">{{detailData.registerPassRate}}%</p>
							<p class="txt" v-else>--</p>
						</li>
						<!-- <li>
							<p class="tit">开户行</p>
							<p class="txt">{{detailData.invoice && detailData.invoice.accountBank || '--'}}</p>
						</li> -->
						<li>
							<p class="tit">风险说明及注册建议</p>
							<p class="txt">{{detailData.riskDescRegisterAdvice || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30 mb20" v-if="powerAttorney[0]" @click="certificatePreview(powerAttorney)">
	            <img :src="powerAttorney[0]" alt="">
	            <p title="委托书">委托书</p>
						</div>
						<div class="fl mr30 mb20" v-if="detailData.specify_pic_url" @click="preview(detailData.specify_pic_url)">
							<img :src="detailData.specify_pic_url" alt="">
							<p title="指定色">指定色</p>
						</div>
						<div class="fl mb20" v-if="detailData.black_white_pic_url" @click="preview(detailData.black_white_pic_url)">
							<img :src="detailData.black_white_pic_url" alt="">
							<p title="黑白色">黑白色</p>
						</div>
					</div>
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
		  <img :src="imgsrc" alt="">
		</el-dialog>
		<!-- 证书预览 -->
		<el-dialog
		  :visible.sync="dialogImg"
		  size="tiny" class="img_preview" :modal-append-to-body="true">
		  <div style="position:relative">
		  	<el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
		    <el-carousel-item v-for="(item,$index) in proxyImg" :key="$index">
		      <img :src="item" alt="">
		    </el-carousel-item>
		  </el-carousel>
		  </div>
		</el-dialog>
		<!-- 服务状态 -->
		<el-dialog title="设置服务状态"
		  :visible.sync="dialogState" class="state_preview" :modal-append-to-body="true">
		  <template>
		  	<span class="state_radio">请选择服务状态：</span>
		  	<el-radio-group v-model="radio">
			    <el-radio class="mt15 ml15" v-for="item in radioState" :key="item" :label="item.code">{{item.name}}</el-radio>
			  </el-radio-group>
			</template>
			<p class="mt10 mb10">备注：</p>
			<el-input class="service_note"
			  type="textarea"
			  :rows="5"
			  v-model="textarea" :maxlength="100">
			</el-input>
			<span class="service_limit">{{textarea.length}}-100字</span>
			<div class="set_btn clearfix mt15">
				<p class="right_btn fr" @click="setState">确认</p>
				<p class="left_btn fr mr10" @click="dialogState = false">取消</p>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
  const detailUrl = './api/findCXbBsOrderDetailById';
  const stateUrl = './api/setOrderFeedback';
  const pdfUrl = './api/preview';
	export default {
		//props:['detailData'],
  	components: {
    },
    props:['order_sn'],
    data() {
      return {
      	// 备注
      	textarea:'',
      	// 预览部分
      	dialogState:false,
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
        // 服务状态
        radioState:{},
        radio:'',
        // 大类过滤
        cateIdData: intClsData.cateIdData,
        // 老旧数据判定
        order:''
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
	      self.loading = true;
	    	this.$http.get(detailUrl+'?order_sn=' + this.order_sn)
	    	.then((resp) => {
	        self.loading = false;
	    		self.detailData = resp.data;
	    		self.order = resp.data.order_is_history;
	    		if(self.detailData.memberApplySubject.standby1){
	    		 	self.$http.get('./api/preview?pdf_url='+self.detailData.memberApplySubject.standby1)
		        .then((response) => {
		          self.cardImg = response.data.urls;
		        })
		        .catch((error) => {
		          console.log(error)
		        });
	    		}
	    		// 营业执照
		      if(self.detailData.memberApplySubject.standby2){
		  			self.$http.get('./api/preview?pdf_url='+self.detailData.memberApplySubject.standby2)
				    .then((response) => {
				      self.usinessLicense = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      };
		      // 委托书
		      if(self.detailData.proxy_url){
		        this.$http.get('./api/preview?pdf_url='+self.detailData.proxy_url)
				    .then((response) => {
				      self.powerAttorney = response.data.urls;
				    })
				    .catch((error) => {
				      console.log(error)
				    });
		      }
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
      // 设置服务状态
      setState(){
      	var self = this;
      	self.$http.post(stateUrl,qs.stringify({
      		code:self.radio,
      		memo:self.textarea,
      		order_id:self.order_id
      	})).then((resp) => {
      		self.dialogState = false;
	        self.loading = false;
	        self.infoDetail();
	    	}).catch((error) => {
	    		self.dialogState = false;
	        self.loading = false;
	        this.$message({
	          message: error.msg,
	          type: 'warning'
	        });
	      });
      },
      //订单下的服务状态
      serviceType(){
      	var self = this;
      	this.radio = '';
      	this.$http.get('./api/findOrderFeedback?order_sn='+this.order_sn)
      	.then((resp) => {
      		self.dialogState = true;
      		if(resp.data.data){
      			self.radioState = resp.data.data;
      		}else{
      			self.$message({
		          message: resp.data.msg,
		          type: 'warning'
		        });
      		}

	    	}).catch((error) => {
	    		this.$message({
	          message: '系统繁忙，请稍后再试',
	          type: 'warning'
	        });
	        console.log(error);
	      });
      }
    },
    mounted() {
    	this.infoDetail();
    	// this.status = this.$router.query.status;
    },
    filters: {
      orderStatusformat: Filters.orderStatusformat,
      orderStatus: Filters.orderStatus,
      sex: Filters.sex,
      priceformat: Filters.priceformat,
      formatApplySbj: Filters.subjectTypeFormat,
      payStatusformat:Filters.payStatusformat,
      refundState:Filters.refundState,
      dateFormat:Filters.formatDate.dateFormat,
      mainBodeSbj:Filters.mainBodeSbj,
      mainBodeNumber:Filters.mainBodeNumber,
      invoiceTypeFormat:Filters.invoiceTypeFormat,
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
            ret = "个体工商户营业执照";
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
      },
      downFileName: function(data){
        var ret = ''
        switch (data+''){
          case '1':
            ret = "不予受理通知书";
            break;
          case '2':
            ret = "受理通知书";
            break;
          case '3':
            ret = "不予受理通知书";
            break;
          case '4':
            ret = "注册公告";
            break;
          case '5':
            ret = "注册证";
            break;
        }
        return ret;
      }
    }
  }
</script>
<style lang='less'>
	.basic_dateil{background-color:#fff;padding:0px 20px 20px;min-height: 500px;border-top:0;position: relative;
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
						p.nopay{color:#F64744}
						.tit{width:120px;font-size:13px;color:#556677;}
						.txt{font-size:13px;color:#7f8fa4;max-width:69%;margin-left: 10px;word-break:break-all;}
					}
				}
				//右侧图片预览定位
				.basic_img{width:40%;text-align:left;
					div{position: relative;width:100px;height:120px;border:1px solid #dfe2e5;border-radius:2px;cursor: pointer;
						img{width:98px;height:118px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;cursor:pointer;left:-1px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
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
							.nopay{color:#F64744}
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
				.tb01{width:24%;}
				.tb02{width:22%;}
				.tb03{width:18%;}
				.tb04{width:14%;}
				.tb05{width:22%;}
				ul{
					li{text-align:left;line-height: 40px;height: 40px;}
				}
				.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
					li{font-size: 13px;color: #223344;}
				}
				.table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;
					li{border-bottom:1px solid #DFE2E5;
						p{line-height:18px;line-height: 40px;height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;color: #556677;}
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

		.detail_null{text-align:center;position: absolute;top:50%;width:100%;
			span{vertical-align: middle;display: inline-block;line-height:34px;vertical-align: top;font-size:13px;color: #A8AFB5;}
		}

		.note_table{
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.td_1{width:30%;}
			.td_2{width:70%;}
			.note_list{border-box:box-sizing;border: 1px solid #dfe2e5;background-color:#f5f5f5;
				p{padding-left:20px;font-size:13px;color:#223344;line-height:40px;height:40px;}
			}
			.note_tab{border-box:box-sizing;border-left: 1px solid #dfe2e5;border-right: 1px solid #dfe2e5;border-bottom: 1px solid #dfe2e5;background-color:#fff;
				p{padding-left:20px;font-size:13px;color:#556677;line-height:40px;height:40px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
			}
			.note_null{height:60px;text-align:center;padding:10px 0;line-height:35px;border-left: 1px solid #dfe2e5;border-right: 1px solid #dfe2e5;border-bottom: 1px solid #dfe2e5;
				img{width:35px;}
				span{ont-size: 13px;color: #A8AFB5;margin-left: 5px;vertical-align: middle;display: inline-block;vertical-align: top;}
			}
			.add_note{border: 1px solid #479CFF;border-radius: 2px;text-align:center;line-height:30px;height:30px;width:92px;font-size: 13px;color: #479CFF;cursor:pointer;}
		}
	}
</style>
