<template>
	<div class="end_basic" v-loading="loading" element-loading-text="拼命加载中">
		<div v-if="!loading">
			<div class="basic_lists">
				<p>客户联系信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">联系人</p>
							<p class="txt">{{infoDetailData.contactName}}</p>
						</li>
						<li>
							<p class="tit">联系电话</p>
							<p class="txt">{{infoDetailData.contactPhone}}</p>
						</li>
						<li>
							<p class="tit">邮箱</p>
							<p class="txt">{{infoDetailData.contactEmail}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists">
				<p>申请主体</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{trademark_subject.apply_type|subjectTypeFormat}}</p>
						</li>
						<li v-if="trademark_subject.apply_type != 4">
							<p class="tit">{{trademark_subject.apply_type | mainBodeNumber}}</p>
							<p class="txt">{{trademark_subject.apply_number}}</p>
						</li>
						<li>
							<p class="tit">{{trademark_subject.apply_type | mainBodeSbj}}地址</p>
							<p class="txt">{{trademark_subject.area_info}}{{trademark_subject.address}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">{{trademark_subject.apply_type | mainBodeSbj}}名称</p>
							<p class="txt">{{trademark_subject.apply_name}}</p>
						</li>
						<li>
							<p class="tit">{{trademark_subject.apply_type | mainBodeSbj}}联系电话</p>
							<p class="txt">{{trademark_subject.apply_phone}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="trademark_subject.standby1"><!--  @click="pdfPreview(standby1_data)" -->
							<a :href="trademark_subject.standby1" target="_blank">
								<img :src="standby1_data[0]" alt="">
								<p :title="trademark_subject.apply_type == 1 ? '身份证复印件' : trademark_subject.apply_type == 2 ? '营业执照' : trademark_subject.apply_type == 3 ? '护照' : trademark_subject.apply_type == 4 ? '企业登记证' : ''">{{trademark_subject.apply_type == 1 ? '身份证复印件' : trademark_subject.apply_type == 2 ? '营业执照' : trademark_subject.apply_type == 3 ? '护照' : trademark_subject.apply_type == 4 ? '企业登记证' : ''}}</p>
							</a>
						</div>
						<div class="fl" v-if="trademark_subject.standby2"><!--  @click="pdfPreview(standby2_data)" -->
							<a :href="trademark_subject.standby2" target="_blank">
								<img :src="standby2_data[0]" alt="">
								<p :title="trademark_subject.apply_type == 1 ? '营业执照' : trademark_subject.apply_type == 2 ? '' : trademark_subject.apply_type == 3 ? '中文护照译本' : trademark_subject.apply_type == 4 ? '企业登记证件译本' : ''">{{trademark_subject.apply_type == 1 ? '营业执照' : trademark_subject.apply_type == 2 ? '' : trademark_subject.apply_type == 3 ? '中文护照译本' : trademark_subject.apply_type == 4 ? '企业登记证件译本' : ''}}</p>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="basic_lists">
				<p>开票信息</p>
				<div class="basic_category kpl">
					<ul class="clearfix" style="width:100%;">
						<li class="fl" v-if="!work_order_invoice.invoice_title">
							<p class="tit">未申请开票</p>
						</li>
						<li class="fl" v-if="work_order_invoice.invoice_type">
							<p class="tit">发票类型</p>
							<p class="txt">{{work_order_invoice.invoice_type | invoiceTypeFormat}}</p>
						</li>
						<li class="fl" v-if="work_order_invoice.invoice_title">
							<p class="tit">发票抬头</p>
							<p class="txt">{{work_order_invoice.invoice_title || '--'}}</p>
						</li>
						<li class="fl" v-if="work_order_invoice.invoice_type==2 && work_order_invoice.area_info && work_order_invoice.address">
							<p class="tit">企业地址</p>
							<p class="txt">{{work_order_invoice.area_info}}{{work_order_invoice.address}}</p>
						</li>
					<!-- </ul>
					<ul class="fl"> -->
						<li class="fl" v-if="work_order_invoice.invoice_code">
							<p class="tit">纳税人识别号</p>
							<p class="txt">{{work_order_invoice.invoice_code}}</p>
						</li>
						<li class="fl" v-if="work_order_invoice.account_bank">
							<p class="tit">开户行名称</p>
							<p class="txt">{{work_order_invoice.account_bank}}</p>
						</li>
					<!-- </ul>
					<ul class="fl"> -->
						<li class="fl" v-if="work_order_invoice.regist_phone">
							<p class="tit">企业电话</p>
							<p class="txt">{{work_order_invoice.regist_phone}}</p>
						</li>
						<li class="fl" v-if="work_order_invoice.account_number">
							<p class="tit">银行账户</p>
							<p class="txt">{{work_order_invoice.account_number}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists">
				<p>商标注册信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">{{trademark.trademark_name}}</p>
						</li>
						<li>
							<p class="tit">商标图样</p>
							<p class="txt">{{trademark.pic_type==1 ? '黑白色':'指定色'}}</p>
						</li>
						<li>
							<p class="tit">商标描述</p>
							<p class="txt">{{trademark.trademark_desc}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix" style="margin-top: -18px;">
						<div class="fl mr30" v-if="trademark.specify_pic_url" @click="preview(trademark.specify_pic_url)">
							<img :src="trademark.specify_pic_url" alt="">
							<p title="指定色商标图样">指定色商标图样</p>
						</div>
						<div class="fl mr30" v-if="trademark.black_white_pic_url" @click="preview(trademark.black_white_pic_url)">
							<img :src="trademark.black_white_pic_url" alt="">
							<p title="黑白色商标图样">黑白色商标图样</p>
						</div>
						<div class="fl" v-if="trademark.proxy_url" @click="pdfPreview(proxy_url_data)">
							<img :src="proxy_url_data[0]" alt="">
							<p title="委托书">委托书</p>
						</div>
					</div>
				</div>
			</div>
			<div class="service_data">
				<p>服务单信息</p>
				<div class="service_tab">
					<div class="tab_tit">
						<ul class="clearfix">
							<li class="fl tb01">序号</li>
							<li class="fl tb02">服务单号</li>
							<li class="fl tb03">商标类型</li>
							<li class="fl tb04 tar">小项数</li>
							<li class="fl tb05 tar">补小项费用</li>
							<li class="fl tb06 tar">操作</li>
						</ul>
					</div>
					<div class="tab_list">
						<ul class="clearfix" v-for="(item, index) in work_order_service">
							<li class="fl tb01">{{index+1 < 10 ? '0'+(index+1) : index+1}}</li>
							<li class="fl tb02">
								{{item.order_sn}}
								<el-popover placement="top" width="400" trigger="hover" class="remark_icon_wrap" popper-class="popper_remark_icon" v-if="item.isAsistantremarks" @show="getRemark(item)">
	                <p>{{remark}}</p>
	                <a href="javascript:;" slot="reference" class="remark_icon">&nbsp;&nbsp;</a>
	              </el-popover>
							</li>
							<li class="fl tb03">{{item.class_name}}</li>
							<li class="fl tb04 tar">{{item.service_nice_min&&item.service_nice_min.length || '--'}}</li>
							<li class="fl tb05 tar">{{(item.addition_fee && item.addition_fee.toFixed(2)) || '0.00'}}</li>
							<li class="fl tb06 tar">
								<el-popover placement="bottom" width="140" trigger="click" class="popover">
	                <p>是否移除该服务单？</p>
								  <div style="text-align: right; margin: 0">
								    <span class="error" size="mini" type="text" @click="hidePop">否</span>
								    <span class="move" type="primary" size="mini" @click="del(index)">是</span>
								  </div>
	                <a href="javascript:;" slot="reference">移除</a>
	              </el-popover>
							</li>
						</ul>

					</div>
				</div>
			</div>
			<div class="basic_lists">
				<p>服务人员信息</p>
				<div class="basic_category kpl">
					<ul class="clearfix" style="width:100%;">
						<li class="fl">
							<p class="tit">业务专员</p>
							<p class="txt">{{infoDetailData.salesman}}</p>
						</li>
						<li class="fl">
							<p class="tit">完成专员</p>
							<p class="txt">{{infoDetailData.agentName}}</p>
						</li>
						<li class="fl">
							<p class="tit">流程专员</p>
							<p class="txt">{{infoDetailData.selectDocument}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="service_footer" v-if="extraMinMum">
				<p>支付信息</p>
				<div class="footer clearfix">
					<p class="fl"><img src="~assets/img/el-icon-information.png" alt="">向该用户推送小项订单</p>
					<div class="fr clearfix">
						<p class="name fl mr20">需支付小项费用</p>
						<p class="txt fl">{{(extraMinMum*niceMinPrice).toFixed(2)}}元</p>
					</div>
					<div class="fr clearfix mr40">
						<p class="name fl mr20">共超出小项目数</p>
						<p class="txt fl">{{extraMinMum}}个</p>
					</div>
				</div>
			</div>
			<div class="confirm_btn clearfix">
				<p class="fl" @click="saveDraft()">存草稿</p>
				<p class="fl ml10 mr10" @click="prev">上一步</p>
				<p class="fl btn_bg" @click="confirmVisible=true">提交</p>
			</div>
		</div>
		<!-- 图片预览 -->
		<el-dialog v-model="pdfDialogVisible" :custom-class="imgArr.length && imgArr.length>1 ? 'previewDialog previewDialog_trans' : 'previewDialog'" :modal-append-to-body="true" :lock-scroll="true" :append-to-body="true" :top="imgArr.length && imgArr.length>1 ? '50vh' : '15vh'">
      <el-carousel :interval="5000" arrow="always" :autoplay='false' trigger="click" v-if="imgArr.length && imgArr.length>1" indicator-position="none">
		    <el-carousel-item v-for="(item,$index) in imgArr" :key="$index">
		      <div class="img_wrap"><img :src="item" alt=""></div>
		    </el-carousel-item>
		  </el-carousel>
		  <img v-else width="100%" :src="previewImg" alt="">
    </el-dialog>
    <!-- 提交前确认 -->
    <el-dialog title="提示" :visible.sync="confirmVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="confirmD" top="40%">
		  <div class="confirm_tip">
		  	<p>商标注册材料提交后一经用户确认（同步签订协议）则不可修改；若平台审核不通过，将作退款处理，请仔细核对。确定提交吗？</p>
		  	<a href="" class="button no" @click.prevent="confirmVisible=false">取消</a><a href="" class="button yes" @click.prevent="submit()">确定</a>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Filters from 'utils/filters/'
	const infoConfirmQueryUrl = './api/info_confirm_query';
	const saveDraftUrl = './api/save_draft';
	const submitUrl = './api/submit';
	const pdfToImgUrl = './api/preview';
	const findAsistantRemarkUrl = './api/findAsistantRemark';
	export default {
  	components: {
    },
    data() {
      return {
      	remark: '', // popover 备注
      	confirmVisible: false,
      	reffer:1,
      	loading: false,
      	previewImg:'',
      	pdfDialogVisible: false,
      	confirm_step:4,
      	work_order_sn: '',
      	extraMinMum: 0,
      	infoDetailData:{}, //总的数据集合
      	trademark:{
      		proxy_url:''
      	},//商标
      	trademark_subject:{
      		standby1:'',
      		standby2:'',
      	},//主体
      	service_nice_min:{},//小项
      	work_order_invoice:{},//发票
      	work_order_service:{},//服务单
		    standby1_data:[],
		    standby2_data:[],
		    // 委托书
		    proxy_url_data:[],
		    imgArr: [],
		    id_list_delete:[],
		    niceMinPrice:60//小项价格
      }
    },
    mounted() {
    	this.work_order_sn = this.$route.query.work_order_sn;
    	this.reffer = this.$route.query.reffer || 1;
    	this.queryDetail();
    },
    watch: {
    	'trademark.proxy_url'(){
    		this.getPreviewImg(this.trademark.proxy_url, 'proxy_url_data');
    	},
    	'trademark_subject.standby1'(){
    		this.getPreviewImg(this.trademark_subject.standby1, 'standby1_data');
    	},
    	'trademark_subject.standby2'(){
    		this.getPreviewImg(this.trademark_subject.standby2, 'standby2_data');
    	}
    },
    methods: {
    	getRemark(item){
				this.remark = '';
				this.$http.get(findAsistantRemarkUrl + '?orderSn=' + item.order_sn)
				.then((resp) => {
					var data = resp.data;
					this.remark = data.remarks;
				})
				.catch((err) => {
					console.log(err);
				});
			},
    	getPreviewImg(pdf_url, dataName){
    		this.$http.get(pdfToImgUrl + '?pdf_url='+pdf_url)
		    .then((response) => {
		      this[dataName] = response.data.urls;
		    })
		    .catch((error) => {
		      console.log(error)
		    });
    	},
    	pdfPreview(arr){
    		if (arr.length === 1) {
    			this.preview(arr[0]);
    			return;
    		}
    		this.pdfDialogVisible = true;
    		this.imgArr = arr;
    	},
      preview(src){
      	this.pdfDialogVisible = true;
      	this.imgArr = [];
      	this.previewImg = src;
      },
      submit(){
      	this.infoDetailData.draft_state = 0;
      	if(!this.infoDetailData.trademark_subject.standby1){
      		this.infoDetailData.trademark_subject.standby1 = null;
      	}
      	if(!this.infoDetailData.trademark_subject.standby2){
      		this.infoDetailData.trademark_subject.standby2 = null;
      	}
      	this.$http.post(submitUrl, this.infoDetailData)
      	.then((resp) => {
      		var data = resp.data;
      		this.confirmVisible=false;
      		this.$message.success('提交成功！');
					this.$router.push({name: 'clientServiceList'})
      	})
      	.catch((err) => {
      		this.confirmVisible=false;
      		if (err && err.msg) {
						this.$message.error(err.msg);
					}
      	});
      },
      saveDraft(){
      	this.infoDetailData.draft_state = 1;
      	this.$http.post(saveDraftUrl, this.infoDetailData)
      	.then((resp) => {
      		this.$message.success('保存草稿成功！');
      	})
      	.catch((err) => {
      		if (err && err.msg) {
						this.$message.error(err.msg);
					}
      	});
      },
      prev(){
      	this.$router.push({name: 'stepThree', query: Object.assign({}, this.$route.query, {confirm_step: 3})})
      },
      queryDetail(){
      	this.loading = true;
      	this.$http.get(infoConfirmQueryUrl, {
      		params: {
	      		work_order_sn: this.work_order_sn,
	      		confirm_step: this.confirm_step,
	      		is_submit: this.$route.query.is_submit,
	      	}
	      })
      	.then((resp) => {
      		this.loading = false;
      		var data = resp.data;
      		this.niceMinPrice = data.niceMinPrice;
      		this.infoDetailData = data;
      		this.member_id = data.member_id;
      		this.trademark = this.infoDetailData.trademark;
      		this.work_order_service = this.infoDetailData.work_order_service;
      		this.service_nice_min = this.infoDetailData.service_nice_min;
      		this.trademark_subject = this.infoDetailData.trademark_subject;
      		this.work_order_invoice = this.infoDetailData.work_order_invoice;
      		this.extraMinMum = this.getExtraMinMum();
      		console.log(data)
      	})
      	.catch((err) => {
      		this.loading = false;
      		console.log(err);
      	});
      },
      del(index){
      	if (this.work_order_service.length == 1) {
      		this.$message.error('服务单不能为空');
      		this.hidePop();
      		return;
      	}
      	this.id_list_delete.push(this.work_order_service[index].id);
      	this.infoDetailData.id_list_delete = this.id_list_delete;
      	this.work_order_service.splice(index, 1);
      	this.extraMinMum = this.getExtraMinMum();
      	this.hidePop();
      },
      //隐藏浮框
      hidePop(){
        document.getElementById('app').click();
      },
      getExtraMinMum(){
      	var work_order_service = this.work_order_service;
      	var num = 0;
      	work_order_service.forEach((item, i) => {
      		if (item.min_number > 10) {
      			num += item.min_number - 10;
      		}
      	})
      	return num;
      }
    },
    filters:{
    	subjectTypeFormat:Filters.subjectTypeFormat,
    	mainBodeNumber:Filters.mainBodeNumber,
    	mainBodeSbj:Filters.mainBodeSbj,
    	invoiceTypeFormat:Filters.invoiceTypeFormat
    }
  }
</script>
<style lang='less'>
	.end_basic{background-color:#fff;padding:30px;border-radius: 0 2px 2px 2px;min-height: 500px;
		.basic_lists{padding-top: 20px;
			.kpl{
				li{width:33%;}
			}
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.basic_category{text-align:left;border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
				.category_left{width:66%;}
				ul{width:33%;
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;}
						// 已支付
						p.topay{color:#36af47;}
						.tit{width:120px;font-size:13px;color:#556677;}
						.txt{font-size:13px;color:#7f8fa4;max-width:66%;margin-left: 10px;word-break:break-all;}
					}
				}
				//右侧图片预览定位
				.basic_img{width:32%;text-align:left;
					div{position: relative;width:100px;height:120px;border:1px solid #dfe2e5;cursor:pointer;
						a{display: block;width:100%;height:100%;}
						img{width:98px;height:118px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;left:-1px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
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
		// 预览
		.img_preview{
			.el-dialog--tiny{width:940px;
				img{width:900px;}
			}
		}
		.previewDialog{
    	width: 900px;min-height: 600px;
    	.el-carousel{
    		.el-carousel__container{
    			height: 490px;
	    		.el-carousel__item{
	    			.img_wrap{overflow-y: auto;height: 100%;width: 86%;margin:0 auto;}
	    			img{width: 100%;}
	    		}
    		}
    	}
    }
    .previewDialog_trans{
    	transform: translate(-50%, -50%);
    }
		.service_data{padding-top: 20px;
			.tal{text-align:left;}
			.tar{text-align:right;}
			.tb01{width:15%;padding-left:20px;}
			.tb02{width:23%;}
			.tb03{width:12%;}
			.tb04{width:10%;min-width: 40px;}
			.tb05{width:20%;}
			.tb06{
				width:20%;padding-right: 30px;
				a{color: #479cff;text-decoration: none;}
			}
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.service_tab{border: 1px solid #DFE2E5;
				.tab_tit{background: #F5F5F5;line-height:40px;font-size:13px;color:#223344;
				}
				.tab_list{line-height:40px;font-size:13px;color:#223344;
					ul{border-top: 1px solid #DFE2E5;}
				}
			}
		}
		.service_footer{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			.footer{background: #F8FCFF;border: 1px solid #B4DFFF;border-radius: 2px;line-height:40px;padding-left:20px;
				>p{font-size: 13px;color: #556677;}
				>div{padding-right: 20px;
					.name{font-size: 13px;color: #556677;}
					.txt{font-size: 13px;color: #F64744;}
				}
				img{margin-right: 8px;vertical-align: middle;padding-bottom:4px;}
			}
		}
		.confirm_btn{width:315px;margin:60px auto 0;
			p{padding:0 30px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height:30px;cursor: pointer;}
			p:hover{border-color: #408CE6;color: #408CE6;}
			.btn_bg{background-color:#479CFF;color:#fff;}
			.btn_bg:hover{border-color: #408CE6;background-color: #408CE6;color:#fff;}
		}
		.hov{color: #479CFF;}

		.confirmD{
			// 弹框公用样式继承自common.css
			.el-dialog{
				width: 450px;
				.el-dialog__body{
					.confirm_tip{
						text-align: right;
						p{text-align: left;font-size: 14px;color: #556677;padding-bottom: 20px;line-height: 21px;}
					}
				}
			}
		}
		.remark_icon_wrap{
			position: relative;top: 12px;
			.remark_icon{
				display:inline-block;background: transparent url(~assets/img/remark.png) 0 center no-repeat;margin-left: 2px;width: 12px;height: 16px;
				&:hover{text-decoration:none;}
			}
		}
	}
	.el-dialog{z-index: 3000;}
</style>
