<template>
	<div class="after_basic">
		<div class="basic_lists">
			<p>基本信息</p>
			<div class="basic_category clearfix">
				<ul class="fl">
					<li>
						<p class="tit">服务单号</p>
						<p class="txt">{{infoData.refund_sn}}</p>
					</li>
					<li>
						<p class="tit">服务状态</p>
						<p class="txt">{{infoData.orderDTO.order_feedback_state}}</p>
					</li>
					<li>
						<p class="tit">支付订单</p>
						<p class="txt">{{infoData.orderPayDTO.payment_sn}}</p>
					</li>
					<li>
						<p class="tit">支付方式</p>
						<p class="txt">{{infoData.orderPayDTO.payment_name}}</p>
					</li>
				</ul>
				<ul class="fl">
					<li>
						<p class="tit">商标分类</p>
						<p class="txt">{{infoData.bs_class_name}}</p>
					</li>
					<li>
						<p class="tit">商标名称</p>
						<p class="txt">{{infoData.bs_name}}</p>
					</li>
					<li>
						<p class="tit">金额</p>
						<p class="txt">{{infoData.amount}}</p>
					</li>
					<li>
						<p class="tit">支付时间</p>
						<p class="txt">{{infoData.orderPayDTO.update_time | dateFormat}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="basic_lists">
			<p>退款信息</p>
			<div class="basic_category clearfix">
				<ul class="fl category_left">
					<li>
						<p class="tit">退款单号</p>
						<p class="txt">{{infoData.refund_sn}}</p>
					</li>
					<li>
						<p class="tit">退款金额</p>
						<p class="txt">{{infoData.amount_user}}</p>
					</li>
					<li>
						<p class="tit">申请时间</p>
						<p class="txt">{{infoData.create_time | dateFormat}}</p>
					</li>
					<li style="width:200%">
						<p class="tit" style="width:12.5%">描述原因</p>
						<p class="txt" style="width:76%">{{infoData.audit_message}}</p>
					</li>
				</ul>
				<ul class="fl category_left">
					<li>
						<p class="tit">售后状态</p>
						<p class="txt">{{infoData.refund_state | refundState}}</p>
					</li>
					<li>
						<p class="tit">实退金额</p>
						<p class="txt">{{infoData.amount}}</p>
					</li>
					<li>
						<p class="tit">退款原因</p>
						<p class="txt">{{infoData.message}}</p>
					</li>
				</ul>
				<div class="basic_img fl clearfix">
					<div class="fl mr30" v-if="infoData.refund_images[0]">
						<img :src="infoData.refund_images[0]" alt="">
						<p @click="preview(infoData.refund_images)">退款申请</p>
					</div>
					<div class="fl mr30" v-if="infoData.refund_images[1]">
						<img :src="infoData.refund_images[1]" alt="">
						<p @click="preview(infoData.refund_images)">退款申请</p>
					</div>
					<div class="fl" v-if="infoData.refund_images[2]">
						<img :src="infoData.refund_images[2]" alt="">
						<p @click="preview(infoData.refund_images)">退款申请</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 售后信息 -->
		<div class="basic_lists">
			<p>售后信息</p>
			<div class="basic_after clearfix">
				<ul class="fl category_left">
					<li>
						<p class="tit">当前退款状态</p>
						<p class="txt">{{infoData.refund_state_description}}</p>
					</li>
					<li>
						<p class="tit">退款方式</p>
						<p class="txt">{{infoData.type | moneyType}}</p>
					</li>
					<li>
						<p class="tit">退款备注</p>
						<p class="txt">{{infoData.refund_return_message}}</p>
					</li>
				</ul>
				<div class="basic_img fl clearfix">
					<div class="fl mr30" v-if="infoData.refund_images[0]">
						<img :src="infoData.refund_images[0]" alt="">
						<p @click="preview(infoData.refund_images)">退款申请</p>
					</div>
					<div class="fl mr30" v-if="infoData.refund_images[1]">
						<img :src="infoData.refund_images[1]" alt="">
						<p @click="preview(infoData.refund_images)">退款申请</p>
					</div>
					<div class="fl" v-if="infoData.refund_images[2]">
						<img :src="infoData.refund_images[2]" alt="">
						<p @click="preview(infoData.refund_images)">退款申请</p>
					</div>
				</div>
			</div>
		</div>
		<div class="service">
			<p class="service_tit">售后记录</p>
			<div class="service_table">
				<ul class="table_tit clearfix">
					<li class="fl tb01" style="padding-left:20px;">操作时间</li>
					<li class="fl tb02">操作类型</li>
					<li class="fl tb03">操作后状态</li>
					<li class="fl tb04" style="text-align:right;margin-right:7%;">退款金额</li>
					<li class="fl tb05">操作人</li>
					<li class="fl tb06">备注</li>
				</ul>
				<ul class="table_list clearfix" v-for="item in infoData.refundDtoList">
					<li class="fl tb01" style="padding-left:20px;"><p>{{item.operating_time | dateFormat}}</p></li>
					<li class="fl tb02"><p>{{item.operating_state_description}}</p></li>
					<li class="fl tb03"><p>{{item.operating_end_state_description}}</p></li>
					<li class="fl tb04" style="text-align:right;margin-right:7%;"><p>{{item.refund_amount}}</p></li>
					<li class="fl tb05"><p>{{item.operator}}</p></li>
					<li class="fl tb06" style="padding-right:20px;"><p>{{item.refund_return_message}}</p></li>
				</ul>
			</div>
		</div>
		<!-- 图片预览 -->
		<el-dialog
		  :visible.sync="dialogVisible"
		  size="tiny" class="img_preview" :modal-append-to-body="true">
		  <img src="~assets/logo-sm.png" alt="">
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Filters from 'utils/filters/'
	const refundsUrl = './api/serviceRefunds'
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
      	infoData:{}
      }
    },
    methods: {
      preview(src){
      	this.dialogVisible = true;
      },
      info(){
      	console.log(11111)
      	var self = this;
      	self.$http.get(refundsUrl+'/'+this.$route.params.id).then((resp) => {
	    		self.infoData = resp.data;
	    		console.log(self.infoData)
	    	}).catch((error) => {
	        console.log(error);
	      });
      }
    },
    mounted() {
    	this.info();
    	// this.status = this.$router.query.status;
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      payStatusformat: Filters.payStatusformat,
      sex:Filters.sex,
      formatApplySbj:Filters.subjectTypeFormat,
      // 退款状态
      moneyType:function(input){
				var ret = ''
		    switch (input+''){
		      case '0':
		        ret = "线下";
		        break;
		      case '1':
		        ret = "线上";
		        break;
		    }
		    return ret;
      },
      // 售后状态
      refundState:function(input){
				var ret = ''
		    switch (input+''){
		      case '0':
		        ret = "待退款";
		        break;
		      case '1':
		        ret = "退款中";
		        break;
		      case '2':
		        ret = "已退款";
		        break;
		      case '3':
		        ret = "退款失败";
		        break;
		    }
		    return ret;
      },
    }
  }
</script>
<style lang="less">
	.after_basic{background-color:#fff;padding:10px 30px 30px;border: 1px solid #DFE2E5;border-radius: 0 2px 2px 2px;
		.basic_lists{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.basic_category{text-align:left;border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
				.category_left{width:33.3%;}
				ul{width:33.4%;
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;}
						// 已支付
						p.topay{color:#36af47;}
						.tit{min-width:80px;font-size:13px;color:#556677;width:25%;}
						.txt{font-size:13px;color:#7f8fa4;max-width:75%;padding-left: 10px;}
					}
				}
				//右侧图片预览定位
				.basic_img{width:33.4%;text-align:left;margin-top: -30px;
					div{position: relative;width:100px;height:120px;
						img{width:100px;height:120px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;cursor:pointer;}
					}
					
				}
			}
			.basic_after{text-align:left;border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
				.category_left{width:66.6%;}
				ul{width:33.4%;
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;}
						// 已支付
						p.topay{color:#36af47;}
						.tit{min-width:80px;font-size:13px;color:#556677;width:12.5%;}
						.txt{font-size:13px;color:#7f8fa4;max-width:75%;margin-left: 10px;}
					}
				}
				//右侧图片预览定位
				.basic_img{width:33.4%;text-align:left;margin-top: -30px;
					div{position: relative;width:100px;height:120px;
						img{width:100px;height:120px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;cursor:pointer;}
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
			.service_table{margin-top: 10px;
				.tb01{width:24%;}
				.tb02{width:14%;}
				.tb03{width:13%;}
				.tb04{width:6%;}
				.tb05{width:18%;}
				.tb06{width:18%;}
				ul{
					li{text-align:left;line-height: 40px;height: 40px;}
				}
				.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
					li{font-size: 13px;color: #223344;}
				}
				.table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;border-bottom:1px solid #DFE2E5;
					li{
						p{line-height:18px;line-height: 40px;height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;color: #556677;}
					}
				}
			}

		}
		// 预览
		.img_preview{
			.el-dialog--tiny{width:420px;height:560px;
				img{width:380px;height:460px;}
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