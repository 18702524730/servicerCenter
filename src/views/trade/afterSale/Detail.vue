<template>
	<div class="commonDetail afterSaleDetail" v-loading="loading">
		<div v-if="!loading">
			<div class="basic_lists" v-if="infoData">
				<p>订单信息</p>
				<div class="basic_category clearfix">
					<ul>
						<li>
							<p class="tit">服务单号</p>
							<p class="txt">{{infoData.order_sn}}</p>
						</li>
						<li>
							<p class="tit">服务状态</p>
							<p class="txt">{{infoData.orderDTO.order_feedback_state}}</p>
						</li>
						<li>
							<p class="tit">服务类目</p>
							<p class="txt">{{infoData.bs_class_name}}</p>
						</li>
						<li>
							<p class="tit">服务名称</p>
							<p class="txt">{{infoData.bs_name}}</p>
						</li>
						<li>
							<p class="tit">商品编号</p>
							<p class="txt">{{infoData.orderDTO.orderBs && infoData.orderDTO.orderBs.bs_number}}</p>
						</li>
						<li>
							<p class="tit">下单时间</p>
							<p class="txt">{{infoData.orderDTO.create_time | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">支付状态</p>
							<p class="txt">{{infoData.orderDTO.payment_state | paymentState}}</p>
						</li>
						<li>
							<p class="tit">支付金额</p>
							<p class="txt">{{infoData.amount_user | priceformat}}</p>
						</li>
						<li>
							<p class="tit">支付方式</p>
							<p class="txt">{{infoData.orderDTO.payment_name}}</p>
						</li>
						<li>
							<p class="tit">支付时间</p>
							<p class="txt">{{infoData.orderDTO.update_time | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">来源</p>
							<p class="txt">{{infoData.orderDTO.orderDistributeFrom == 2 ? '店铺下单' : '拾贝分单' }}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="infoData">
				<p>基本信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">退款单号</p>
							<p class="txt">{{infoData.refund_sn}}</p>
						</li>
						<li>
							<p class="tit">退款金额</p>
							<p class="txt">{{infoData.amount_user | priceformat}}</p>
						</li>
						<li>
							<p class="tit">申请时间</p>
							<p class="txt">{{infoData.create_time | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">退款原因</p>
							<p class="txt">{{infoData.refund_reason_type_name}}</p>
						</li>
						<li>
							<p class="tit">退款说明</p>
							<p class="txt" style="width:80%">{{infoData.message}}</p>
						</li>
						<li>
							<p class="tit">售后状态</p>
							<p class="txt">{{infoData.audit_state | refundState}}</p>
						</li>
						<!-- <li>
							<p class="tit">实退金额</p>
							<p class="txt">{{infoData.amount | priceformat}}</p>
						</li> -->
					</ul>
					<div class="basic_img fl clearfix" v-if="infoData.refund_images">
						<div class="fl mr30 mt5" v-if="infoData.refund_images[0]">
							<img :src="infoData.refund_images[0]" alt="">
							<p @click="preview(infoData.refund_images[0])" title="退款申请">退款申请</p>
						</div>
						<div class="fl mr30 mt5" v-if="infoData.refund_images[1]">
							<img :src="infoData.refund_images[1]" alt="">
							<p @click="preview(infoData.refund_images[1])" title="退款申请">退款申请</p>
						</div>
						<div class="fl mt5" v-if="infoData.refund_images[2]">
							<img :src="infoData.refund_images[2]" alt="">
							<p @click="preview(infoData.refund_images[2])" title="退款申请">退款申请</p>
						</div>
					</div>
				</div>
			</div>
			<div class="basic_lists" v-if="infoData && infoData.member">
				<p>客户信息</p>
				<div class="basic_category clearfix">
					<ul>
						<li>
							<p class="tit">用户昵称</p>
							<p class="txt">{{infoData.member.nickname || '--'}}</p>
						</li>
						<li>
							<p class="tit">姓名</p>
							<p class="txt">{{infoData.member.truename || '--'}}</p>
						</li>
						<li>
							<p class="tit">手机号码</p>
							<p class="txt">{{infoData.member.phone || '--'}}</p>
						</li>
						<li>
							<p class="tit">性别</p>
							<p class="txt">{{infoData.member.sex | sex}}</p>
						</li>
						<li>
							<p class="tit">所属行业</p>
							<p class="txt">{{infoData.member.industryName || '--'}}</p>
						</li>
						<li>
							<p class="tit">QQ</p>
							<p class="txt">{{infoData.member.member_qq || '--'}}</p>
						</li>
						<!-- <li>
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.member.member_wechat || '--'}}</p>
						</li> -->
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="infoData">
				<p class="service_tit" style="margin-bottom: 20px;">售后记录
					<el-button v-if="infoData.audit_state == '0' && trade_refund_audit" size="small" type="primary" class="ml20" @click="refundVisible=true">退款</el-button>
				</p>
				<div class="service_table">
					<ul class="table_tit clearfix">
						<li class="fl tb01" style="padding-left:20px;">操作时间</li>
						<li class="fl tb02">操作类型</li>
						<li class="fl tb03">操作后状态</li>
						<li class="fl tb04" style="text-align:right;margin-right:6%;">退款金额</li>
						<li class="fl tb05">操作人</li>
						<li class="fl tb06">备注</li>
					</ul>
					<ul class="table_list clearfix" v-for="item in infoData.refundDtoList">
						<li class="fl tb01" style="padding-left:20px;"><p>{{item.operating_time | dateFormat}}</p></li>
						<li class="fl tb02"><p>{{item.operating_state_description}}</p></li>
						<li class="fl tb03"><p>{{item.operating_end_state_description}}</p></li>
						<li class="fl tb04" style="text-align:right;margin-right:6%;"><p>{{item.refund_amount | priceformat}}</p></li>
						<li class="fl tb05"><p>{{item.operator}}</p></li>
						<li class="fl tb06" style="padding-right:20px;"><p>{{item.refund_return_message || '--'}}</p></li>
					</ul>
				</div>
			</div>
			<!-- 退款信息 -->
			<div class="basic_lists" v-if="infoData.audit_state != 0">
				<p>退款信息</p>
				<div class="basic_category no_boder clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">当前售后状态</p>
							<p class="txt">{{infoData.audit_state |refundState}}</p>
						</li>
						<li v-if="infoData.audit_state != 2">
							<p class="tit">退款方式</p>
							<p class="txt">{{infoData.type | moneyType}}</p>
						</li>
						<li v-if="infoData.audit_state != 2">
							<p class="tit">退款金额</p>
							<p class="txt">{{infoData.amount | priceformat}}</p>
						</li>
						<li v-if="infoData.audit_state == 2">
							<p class="tit">驳回原因</p>
							<p class="txt">{{infoData.refund_reason_type_name}}</p>
						</li>
						<li>
							<p class="tit">退款备注</p>
							<p class="txt">{{infoData.audit_message || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fr clearfix" v-if="infoData.refund_evidence">
						<div class="fl mr30 mt5">
							<img :src="infoData.refund_evidence" alt="">
							<p @click="preview(infoData.refund_evidence)" title="退款回执">退款回执</p>
						</div>
					</div>
				</div>
			</div>
			<div class="detail_null" v-if="!infoData">
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

		<!-- 退款 -->
		<el-dialog title="设置退款状态"
		  :visible.sync="refundVisible" :close-on-click-modal="false" custom-class="refundDialog" :modal-append-to-body="true">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ipt_form">
			  <el-form-item label="退款审核：" prop="audit_state">
			    <el-radio-group v-model="ruleForm.audit_state">
			      <el-radio label="1">通过</el-radio>
			      <el-radio label="2">驳回</el-radio>
			    </el-radio-group>
			  </el-form-item>
			  <el-form-item label="退款金额：" prop="refund_child_real_sp_amount" v-if="ruleForm.audit_state == 1">
			    <el-input v-model="ruleForm.refund_child_real_sp_amount" placeholder="请填写退款金额" style="width:180px"></el-input> <span> 不允许超出用户实付金额{{infoData.amount_user | priceformat}}</span>
			  </el-form-item>
			  <el-form-item label="驳回原因：" prop="refund_reject_reason_type_id" v-if="ruleForm.audit_state == 2">
			    <el-select v-model="ruleForm.refund_reject_reason_type_id" placeholder="请选择驳回原因" style="width:180px" @change="refundReject">
			      <el-option :label="item.refund_name" :value="item.refund_reason_type_id" :key="item.refund_reason_type_id" v-for="(item, index) in refundReasonsData"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="备注：" prop="audit_message">
			    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="ruleForm.audit_message" placeholder="请填写备注"  :maxlength="200" style="width:335px"></el-input>
			  </el-form-item>
		  	<div class="lc mt20">
		  		<el-button size="small" @click="refundVisible=false">取消</el-button>
		  		<el-button size="small" type="primary" @click="setRefund('ruleForm')">提交</el-button>
		  	</div>
		  </el-form>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	const refundsUrl = './api/serviceRefunds'
	const setRefundUrl = './api/offline/refund'
	const refundReasonsUrl = './api/listRefundsReasonType'
	export default {
  	components: {
    },
    data() {
    	//退款金额验证
			let checkAmount = (rule, value, callback) => {
				let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
				if (!value) {
						return callback(new Error('请填写退款金额'));
				}
				setTimeout(() => {
						if (!reg.test(value)) {
							callback(new Error('请填写正确的退款金额'));
						} else if(value > this.infoData.amount_user){
							callback(new Error('退款金额不允许超出用户实付金额'));
						} else {
							callback();
						}
				}, 50);
			};
      return {
      	trade_refund_audit:false,//退款审核权限
      	textarea:'',
      	dialogState:false,
      	dialogVisible:false,
      	imgsrc:'',
      	infoData:{
      		orderDTO:{},
      		dataDTOs:{},
      		orderDTO:{},
      		refundChildDTOs:[],
      		refundDtoList:[]
      	},
      	isSubmitted: false,
      	loading:false,
      	refundVisible: false,
      	ruleForm: {
      		refund_id: '',
      		audit_state: '1',
      		refund_child_real_sp_amount: '',
      		refund_reject_reason_type_id: '',
      		audit_message: '',
      		refund_reject_reason_type_name:''
      	},
      	rules: {
      		audit_state:[
						{ required: true, message: '请审核退款状态', trigger: 'change' },
					],
      		refund_child_real_sp_amount:[
						{ required: true, validator:checkAmount, trigger: 'blur' },
					],
      		refund_reject_reason_type_id:[
						{ required: true, type:'number', message: '请选择驳回原因', trigger: 'change' }
					],
					audit_message:[
						{ required: true, message: '请填写备注', trigger: 'blur' },
					],
      	},
      	refundReasonsData:[]
      }
    },
    methods: {
    	refundReject(item){
    		for(let r in this.refundReasonsData){//赋值接口新增字段
    			if(this.refundReasonsData[r].refund_reason_type_id == item){
    				this.ruleForm.refund_reject_reason_type_name = this.refundReasonsData[r].refund_name;
    				return;
    			}
    		}
    	},
    	setRefund(formName){
    		this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.isSubmited) {
							return;
						}
						this.isSubmited = true;
						this.ruleForm.refund_id = this.$route.params.id;
						this.ruleForm.refund_reject_reason_type_name = this.ruleForm.refund_reject_reason_type_id
						this.$http.post(setRefundUrl, this.ruleForm)
		      	.then((resp) => {
		      		this.isSubmited = false;
		      		this.refundVisible = false;
		      		this.$message.success('设置成功');
		      		this.info();
			    	})
			    	.catch((error) => {
			    		this.isSubmited = false;
			    		this.$message.error(error.msg);
			        console.log(error);
			      });
					}
				});
    	},
    	// 预览
      preview(src){
      	this.imgsrc = src;
      	this.dialogVisible = true;
      },
      info(){
      	var self = this;
      	self.loading=true;
      	self.$http.get(refundsUrl+'/'+this.$route.params.id).then((resp) => {
	    		self.infoData = resp.data;
	    		self.loading=false;
	    	}).catch((error) => {
	    		self.infoData='';
	    		self.loading=false;
	        console.log(error);
	      });
      },
      getRefundReason() {
      	this.$http.get(refundReasonsUrl)
      	.then((resp) => {
      		this.refundReasonsData = resp.data.elements;
	    	})
	    	.catch((error) => {
	        console.log(error);
	      });
      }
    },
    mounted() {
    	this.trade_refund_audit = store.get('permission').indexOf('iprp_trade_refund_audit') !== -1;
    	this.info();
    	// this.status = this.$router.query.status;
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      payStatusformat: Filters.payStatusformat,
      priceformat: Filters.priceformat,
      sex:Filters.sex,
      formatApplySbj:Filters.subjectTypeFormat,
      moneyType:Filters.moneyType,
      refundState:Filters.refundStateFilter,
      paymentState:Filters.paymentState,
    },
    watch: {
    	refundVisible(){
    		if (this.refundVisible) {
    			this.$nextTick(() => {
	    			this.$refs.ruleForm.resetFields();
	    		});
    			this.getRefundReason();
    		}
    	},
    	'ruleForm.audit_state': function(){
    		this.$refs.ruleForm.clearValidate();
    	}
    }
  }
</script>
<style lang="scss">
	.afterSaleDetail{
		background-color:#fff;padding:0px 20px 20px;min-height:500px;
		// 服务信息
		.basic_lists{padding-top: 20px;
			.service_tit{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.service_table{margin-top: 10px;
				.tb01{width:23%;}
				.tb02{width:12%;}
				.tb03{width:12%;}
				.tb04{width:10%;}
				.tb05{width:18%;}
				.tb06{width:15%;}
				ul{
					li{text-align:left;padding:10px 0;}
				}
				.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
					li{font-size: 13px;color: #223344;}
				}
				.table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;border-bottom:1px solid #DFE2E5;
					li{
						p{line-height: 20px;text-overflow: ellipsis;font-size: 13px;color: #556677;word-wrap:break-word;word-break:break-all;}
					}
				}
			}
		}
		// 预览
		// 预览
		.img_preview{
			.el-dialog--tiny{width:940px;
				img{width:900px;}
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
		.detail_null{text-align:center;width:100%;height:500px;padding-top: 250px;
			span{vertical-align: middle;display: inline-block;line-height:34px;vertical-align: top;font-size:13px;color: #A8AFB5;}
		}
		.refundDialog{
			width: 550px;
			.ipt_form{

			}
		}
	}
</style>
