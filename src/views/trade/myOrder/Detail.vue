<template>
	<div class="commonDetail myOrderDetail" v-loading="loading">
		<div class="basic_lists" v-if="detailData">
			<p>基本信息</p>
			<div class="basic_category clearfix">
				<ul>
					<li>
						<p class="tit">订单号</p>
						<p class="txt">{{detailData.order_sn}}</p>
					</li>
					<li>
						<p class="tit">下单时间</p>
						<p class="txt">{{detailData.create_time | dateFormat}}</p>
					</li>
					<li>
						<p class="tit">订单状态</p>
						<p class="txt">{{detailData.order_state | orderStatusformat}}</p>
					</li>
					<li>
						<p class="tit">订单类型</p>
						<p class="txt">{{detailData.order_bussiness_type == 1 ? '服务订单' : '商品订单'}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="basic_lists" v-if="detailData">
			<p>付款信息</p>
			<div class="basic_category clearfix">
				<ul>
					<li>
						<p class="tit">金额</p>
						<p class="txt">{{detailData.payment_amount | priceformat}}</p>
					</li>
					<li>
						<p class="tit">支付时间</p>
						<p class="txt">{{detailData.payment_time | dateFormat}}</p>
					</li>
					<li>
						<p class="tit">支付方式</p>
						<p class="txt">{{detailData.payment_name || '--'}}</p>
					</li>
					<li>
						<p class="tit">支付状态</p>
						<p class="txt" :class="{'topay':detailData.payment_state == 1,'nopay':!detailData.payment_state}">{{detailData.payment_state | payStatusformat}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="basic_lists" v-if="detailData.member">
			<p>客户信息</p>
			<div class="basic_category clearfix">
				<ul>
					<li>
						<p class="tit">用户昵称</p>
						<p class="txt">{{detailData.member.nickname || '--'}}</p>
					</li>
					<li>
						<p class="tit">姓名</p>
						<p class="txt">{{detailData.member.truename || '--'}}</p>
					</li>
					<li>
						<p class="tit">手机号码</p>
						<p class="txt">{{detailData.member.phone || '--'}}</p>
					</li>
					<li>
						<p class="tit">性别</p>
						<p class="txt">{{detailData.member.sex | sex}}</p>
					</li>
					<li>
						<p class="tit">所属行业</p>
						<p class="txt">{{detailData.member.industryName || '--'}}</p>
					</li>
					<li>
						<p class="tit">QQ</p>
						<p class="txt">{{detailData.member.memberQQ || '--'}}</p>
					</li>
					<!-- <li>
						<p class="tit">微信号</p>
						<p class="txt">{{detailData.member.member_wechat || '--'}}</p>
					</li> -->
				</ul>
			</div>
		</div>
		<div class="basic_lists" v-if="detailData.order_bussiness_type == 1">
			<p>服务信息</p>
			<div class="table_list clearfix">
				<table class="lc">
					<thead>
						<tr>
							<th>服务单号</th>
							<th>服务信息</th>
							<th>需支付价格</th>
							<th>实付</th>
							<th>用户确认</th>
							<th>服务状态</th>
							<th>售后状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in detailData.bsOrderVos">
							<td>{{item.order_sn}}</td>
							<td>
								<img :src="item.order_bs_image" width="60" height="60"><span>{{item.bs_name}}</span>
							</td>
							<td>{{item.order_amount | priceformat}}</td>
							<td>{{item.payment_amount | priceformat}}</td>
							<td>{{item.order_check_accept | orderCheckAcceptFilter}}</td>
							<td>{{item.order_feedback_state || '--'}}</td>
							<td>{{item.refund_state_description || '--'}}</td>
							<td>
								<a class="mr10" v-if="detailData.payment_state == 0 && trade_modify_price" @click.prevent="curItem=item,editPriceVisible=true">修改价格</a>
								<router-link :to="'/service/myServiceOrder/detail/'+ item.order_id">查看详情</router-link>
							</td>
						</tr>
						<tr v-if="!detailData.bsOrderVos || !detailData.bsOrderVos.length">
							<td colspan="8">
								<div class="no_data">
									<img src="~assets/img/nulldata.png" alt=""><span>暂无信息</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="basic_lists" v-if="detailData.invoice">
			<p>开票信息</p>
			<div class="basic_category clearfix">
				<ul v-if="detailData.invoice.type">
					<li>
						<p class="tit">发票类型</p>
						<p class="txt">{{detailData.invoice.type | invoiceTypeFormat}}</p>
					</li>
					<li>
						<p class="tit">发票抬头</p>
						<p class="txt">{{detailData.invoice.title || '--'}}</p>
					</li>
					<li>
						<p class="tit">纳税人识别号</p>
						<p class="txt">{{detailData.invoice.code || '--'}}</p>
					</li>
					<li v-if="detailData.invoice.type == 2">
						<p class="tit">注册电话</p>
						<p class="txt">{{detailData.invoice.reg_phone || '--'}}</p>
					</li>
					<li v-if="detailData.invoice.type == 2">
						<p class="tit">注册地址</p>
						<p class="txt">{{detailData.invoice.reg_addr || '--'}}</p>
					</li>
					<li v-if="detailData.invoice.type == 2">
						<p class="tit">开户行</p>
						<p class="txt">{{detailData.invoice.reg_bname || '--'}}</p>
					</li>
					<li v-if="detailData.invoice.type == 2">
						<p class="tit">银行账号</p>
						<p class="txt">{{detailData.invoice.reg_baccount || '--'}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="basic_lists" v-if="detailData.order_bussiness_type == 2 && detailData.trademarkVo">
			<p>商品信息</p>
			<div class="basic_category clearfix">
				<ul class="fl category_left">
					<li>
						<p class="tit">商标名称</p>
						<p class="txt">{{detailData.trademarkVo.trademarkName || '--'}}</p>
					</li>
					<li>
						<p class="tit">注册申请号</p>
						<p class="txt">{{detailData.trademarkVo.acceptmaterials}}</p>
					</li>
					<li>
						<p class="tit">商标类别</p>
						<p class="txt">{{getTmInfo(detailData.trademarkVo.category)}}</p>
					</li>
					<li>
						<p class="tit">转让手续</p>
						<p class="txt">{{detailData.trademarkVo.tmLeaseType == 1 ? '平台办理' : '自行办理'}}</p>
					</li>
					<li>
						<p class="tit">办理费用</p>
						<p class="txt">{{detailData.trademarkVo.commissionCharge | priceformat}}</p>
					</li>
					<li>
						<p class="tit">卖方开票</p>
						<p class="txt">{{detailData.trademarkVo.needTicket == 1 ? '开票' : '不开票'}}</p>
					</li>
					<li>
						<p class="tit">订单总额</p>
						<p class="txt">{{detailData.trademarkVo.orderMoney | priceformat}}</p>
					</li>
				</ul>
				<div class="basic_img fl clearfix">
					<div class="fl" @click="preview(detailData.trademarkVo.picture)">
						<img :src="detailData.trademarkVo.picture" alt="">
          	<p>商品图样</p>
					</div>
				</div>
			</div>
		</div>
		<div class="basic_lists" v-if="detailData.address">
			<p>收件地址</p>
			<div class="basic_category clearfix">
				<ul>
					<li>
						<p class="tit">收件人姓名</p>
						<p class="txt">{{detailData.address.true_name}}</p>
					</li>
					<li>
						<p class="tit">收件人电话</p>
						<p class="txt">{{detailData.address.tel_phone || '--'}}</p>
					</li>
					<li>
						<p class="tit">收件人邮箱</p>
						<p class="txt">{{detailData.address.email || '--'}}</p>
					</li>
					<li>
						<p class="tit">收件地址</p>
						<p class="txt">{{detailData.address.area_info+detailData.address.address}}</p>
					</li>
					<li>
						<p class="tit">收件人邮编</p>
						<p class="txt">{{detailData.address.zip_code || '--'}}</p>
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
		<!-- 图片预览 -->
		<el-dialog
		  :visible.sync="dialogVisible"
		  size="tiny" class="img_preview" :modal-append-to-body="true">
		  <img :src="imgsrc" alt="">
		</el-dialog>

		<!-- 修改价格 -->
		<el-dialog title="修改价格"
		  :visible.sync="editPriceVisible" :close-on-click-modal="false" custom-class="editPriceDialog" :modal-append-to-body="true">
		  <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="ipt_form">
		  	<p><label>服务单号：</label><span>{{curItem.order_sn}}</span></p>
		  	<p><label>商品编号：</label><span>{{curItem.order_bs_number}}</span></p>
		  	<p><label>服务名称：</label><span style="width: 390px;">{{curItem.bs_name}}</span></p>
		  	<p><label>服务售价：</label><span>{{curItem.order_amount|priceformat}}</span></p>
		  	<p><label>应付价格：</label><span>{{curItem.order_amount|priceformat}}</span></p>
  			<el-form-item label="修改价格：" prop="amount">
			    <el-input v-model="ruleForm.amount" style="width:120px;"></el-input> <span> <b v-if="/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(ruleForm.amount)">减免金额：{{(curItem.order_amount - ruleForm.amount) | priceformat}}</b></span>
			  </el-form-item>
		  	<div class="lc mt30">
		  		<el-button size="small" @click="editPriceVisible=false">取消</el-button>
		  		<el-button size="small" type="primary" @click="submit('ruleForm')">提交</el-button>
		  	</div>
		  </el-form>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
  const detailUrl = './api/findOrderDetailById';
  const editPriceUrl = './api/editBsOrderPrice';
  const pdfUrl = './api/preview';
	import {store} from 'utils/';
	export default {
		//props:['detailData'],
  	components: {
    },
    data() {
    	//退款金额验证
			let checkAmount = (rule, value, callback) => {
				let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
				if (!value) {
						return callback(new Error('请修改价格'));
				}
				setTimeout(() => {
						if (!reg.test(value)) {
							callback(new Error('请填写正确的金额'));
						} else if(value > this.curItem.order_amount){
							callback(new Error('金额不允许超过服务售价'));
						} else {
							callback();
						}
				}, 50);
			};
      return {
      	trade_modify_price:false,//修改价格权限
      	isSubmited: false,
      	ruleForm: {
      		amount: '',
      	},
      	rules: {
      		amount:[
						{ required: true, validator:checkAmount, trigger: 'blur' },
					],
      	},
      	curItem: {}, //当前服务订单
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
        order:'',
        editPriceVisible: false,
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
	    	this.$http.get(detailUrl, {
	    		params: {
	    			order_id: this.order_id,
	    			order_bussiness_type: this.order_bussiness_type
	    		}
	    	})
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
      submit(formName){
      	this.$refs[formName].validate((valid) => {
					if (valid) {
						this.editPrice();
					}
				});
      },
      // 修改价格
      editPrice(){
      	if (this.isSubmited) {
      		return;
      	}
      	this.isSubmited = true;
      	this.$http.post(editPriceUrl, {
      		order_sn: this.curItem.order_sn,
      		discount_amount: (this.curItem.order_amount - this.ruleForm.amount).toFixed(2),
      	}).then((resp) => {
      		this.ruleForm.amount = '';
      		this.editPriceVisible = false;
      		this.isSubmited = false;
	        this.infoDetail();
	    	}).catch((error) => {
	    		this.isSubmited = false;
	        this.$message.error(error.msg);
	      });
      },
      //订单下的服务状态
      serviceType(){
      	var self = this;
      	this.radio = '';
      	this.$http.get('./api/findOrderFeedback?order_id='+this.order_id)
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
    	this.trade_modify_price = store.get('permission').indexOf('iprp_trade_modify_price') !== -1;
    	this.order_id = this.$route.params.order_id;
    	this.order_bussiness_type = this.$route.params.order_bussiness_type;
    	this.infoDetail();
    },
    filters: {
      orderStatusformat: Filters.orderStatusformat,
      orderStatus: Filters.orderStatus, //服务状态
      sex: Filters.sex,
      priceformat: Filters.priceformat,
      formatApplySbj: Filters.subjectTypeFormat,
      payStatusformat:Filters.payStatusformat,
      refundState:Filters.refundState,
      dateFormat:Filters.formatDate.dateFormat,
      mainBodeSbj:Filters.mainBodeSbj,
      mainBodeNumber:Filters.mainBodeNumber,
      invoiceTypeFormat:Filters.invoiceTypeFormat,
      trademarkStatus: Filters.trademarkStatus,
      fileName: Filters.fileName,
      licenseName: Filters.licenseName,
      downFileName: Filters.downFileName,
      trademarkComby: Filters.trademarkComby,
      orderCheckAcceptFilter: Filters.orderCheckAcceptFilter
    },
    watch: {
    	editPriceVisible(){
    		if (this.editPriceVisible) {
    			this.$nextTick(() => {
	    			this.$refs.ruleForm.resetFields();
	    		});
    		}
    	}
    }
  }
</script>
<style lang='scss'>
	.myOrderDetail{
		.table_list{
			tr{
				td{
					padding: 10px 0;
					img{display: inline-block;vertical-align: middle;}
				}
			}
		}
		.editPriceDialog{
			width:500px;
			.ipt_form{
				.el-form-item.is-required .el-form-item__label{padding-right: 0;}
				.el-form-item.is-required .el-form-item__label:before{display: none;}
				b{font-weight: normal;}
				p{
					vertical-align: top;padding-bottom: 10px;line-height: 20px;
					label{display: inline-block;vertical-align: top;}
					span{
						display: inline-block;vertical-align: top;
						.el-input{
							display: inline-block;width: 120px;vertical-align: top;
						}
					}
				}
				.el-button{
					//span{line-height: 18px;height:18px;display: inline-block;}
				}
			}
		}
	}
</style>
