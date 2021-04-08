<template>
	<div class="end_basic_cxb_f" v-loading="loading" element-loading-text="拼命加载中">
		<div v-if="!loading">
			<div class="basic_lists">
				<p>申请主体</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{trademark_subject.apply_type|subjectTypeFormat}}</p>
						</li>
						<!-- 大陆 -->
						<li v-if="trademark_subject.apply_type == 1 || trademark_subject.apply_type == 2 || trademark_subject.apply_type == 5">
							<p class="tit" v-if="trademark_subject.apply_type == 1 || trademark_subject.apply_type == 5">申请人姓名</p>
							<p class="tit" v-if="trademark_subject.apply_type == 2">企业名称</p>
							<p class="txt">{{trademark_subject.apply_name}}</p>
						</li>
						<!-- 境外 -->
						<li v-if="trademark_subject.apply_type == 3 || trademark_subject.apply_type == 4">
							<p class="tit" v-if="trademark_subject.apply_type == 3">申请人姓名（中文）</p>
							<p class="tit" v-if="trademark_subject.apply_type == 4">企业名称（中文）</p>
							<p class="txt">{{trademark_subject.apply_name}}</p>
						</li>
						<!-- 英文名 -->
						<li v-if="trademark_subject.apply_type == 3">
							<p class="tit">申请人姓名（英文）</p>
							<p class="txt">{{trademark_subject.name_en}}</p>
						</li>

						<li v-if="trademark_subject.apply_type == 4">
							<p class="tit">企业名称（英文）</p>
							<p class="txt">{{trademark_subject.name_en}}</p>
						</li>

						<li v-if="trademark_subject.apply_type != 4">
							<p class="tit" v-if="trademark_subject.apply_type == 1 || trademark_subject.apply_type == 5">申请人身份证号</p>
							<p class="tit" v-if="trademark_subject.apply_type == 2">企业营业执照号</p>
							<p class="tit" v-if="trademark_subject.apply_type == 3">申请人护照号</p>
							<p class="txt">{{trademark_subject.apply_number}}</p>
						</li>
						<li>
							<p class="tit">{{trademark_subject.apply_type | mainBodeSbj}}联系电话</p>
							<p class="txt">{{trademark_subject.apply_phone}}</p>
						</li>
						<li>
							<p class="tit">{{trademark_subject.apply_type | mainBodeSbj}}邮箱</p>
							<p class="txt">{{trademark_subject.apply_email || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{trademark_subject.apply_type | mainBodeSbj}}传真</p>
							<p class="txt">{{trademark_subject.apply_fax || '--'}}</p>
						</li>
						<li>
							<p class="tit" v-if="trademark_subject.apply_type == 1 || trademark_subject.apply_type == 3 || trademark_subject.apply_type == 5">申请人地址</p>
							<p class="tit" v-if="trademark_subject.apply_type == 2 || trademark_subject.apply_type == 4">企业注册地址</p>
							<p class="txt">{{trademark_subject.area_info}}{{trademark_subject.address}}</p>
						</li>
						<li v-if="trademark_subject.apply_type != 4">
							<p class="tit">邮编</p>
							<p class="txt">{{trademark_subject.zip_code || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="trademark_subject.standby1" @click="pdfPreview(standby1_data)">
							<img :src="standby1_data[0]" alt="">
							<p :title="trademark_subject.apply_type == 1 ? '身份证复印件' : trademark_subject.apply_type == 2 ? '营业执照' : trademark_subject.apply_type == 3 ? '护照' : trademark_subject.apply_type == 4 ? '企业登记证' : ''">{{trademark_subject.apply_type == 1 ? '身份证复印件' : trademark_subject.apply_type == 2 ? '营业执照' : trademark_subject.apply_type == 3 ? '护照' : trademark_subject.apply_type == 4 ? '企业登记证' : ''}}</p>
						</div>
						<div class="fl" v-if="trademark_subject.standby2" @click="pdfPreview(standby2_data)">
							<img :src="standby2_data[0]" alt="">
							<p :title="trademark_subject.apply_type == 1 ? '营业执照' : trademark_subject.apply_type == 2 ? '' : trademark_subject.apply_type == 3 ? '中文护照译本' : trademark_subject.apply_type == 4 ? '企业登记证件译本' : ''">{{trademark_subject.apply_type == 1 ? '营业执照' : trademark_subject.apply_type == 2 ? '' : trademark_subject.apply_type == 3 ? '中文护照译本' : trademark_subject.apply_type == 4 ? '企业登记证件译本' : ''}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="basic_lists">
				<p>联系人信息</p>
				<div class="basic_category clearfix">
					<ul class="clearfix" style="width:50%;">
						<!-- <li class="fl" v-if="!trademark_contact.invoice_title">
							<p class="tit">未申请开票</p>
						</li> -->
						<li class="fl">
							<p class="tit">联系人姓名</p>
							<p class="txt">{{trademark_contact.contact_name}}</p>
						</li>
						<li class="fl">
							<p class="tit">联系人电话</p>
							<p class="txt">{{trademark_contact.contact_phone || '--'}}</p>
						</li>
						<li class="fl">
							<p class="tit">联系人邮箱</p>
							<p class="txt">{{trademark_contact.contact_email || '--'}}</p>
						</li>
						<li class="fl">
							<p class="tit">联系人地址</p>
							<p class="txt">{{trademark_contact.contact_area_info}}{{trademark_contact.contact_address}}</p>
						</li>
						<li class="fl">
							<p class="tit">联系人邮编</p>
							<p class="txt">{{trademark_contact.contact_zip_code || '--'}}</p>
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
							<p class="tit">商标类数</p>
							<p class="txt">{{trademark.class_num}}</p>
						</li>
						<li>
							<p class="tit">商标类别</p>
							<p class="txt">{{trademark.class_name}}</p>
						</li>
						<li>
							<p class="tit">商标描述</p>
							<p class="txt">{{trademark.trademark_desc}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix" style="margin-top: -18px;">
						<div class="fl mr30" v-if="trademark.black_white_pic_url" @click="preview(trademark.black_white_pic_url)">
							<img :src="trademark.black_white_pic_url" alt="">
							<p>商标图样</p>
						</div>
						<!-- <div class="fl mr30" v-if="trademark.black_white_pic_url" @click="preview(trademark.black_white_pic_url)">
							<img :src="trademark.black_white_pic_url" alt="">
							<p title="黑白色商标图样">黑白色商标图样</p>
						</div> -->
					</div>
				</div>
			</div>

			<div class="confirm_btn clearfix">
				<p class="fl" @click="back()">返回</p>
				<p class="fl ml10 btn_bg" @click="next">下一步</p>
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

	</div>
</template>
<script>
	import Vue from 'vue'
	import Filters from 'utils/filters/'
	const infoConfirmQueryUrl = './api/info_confirm_query';
	const pdfToImgUrl = './api/preview';
	export default {
  	components: {
    },
    data() {
      return {
      	loading: false,
      	previewImg:'',
      	pdfDialogVisible: false,
      	confirm_step:3, //创新保统一都是3，仿tas的第3步
      	work_order_sn: '',
      	infoDetailData:{}, //总的数据集合
      	trademark:{
      		proxy_url:''
      	},//商标
      	trademark_contact: {},
      	trademark_subject:{
      		standby1:'',
      		standby2:'',
      	},//主体
		    standby1_data:[],
		    standby2_data:[],
		    // 委托书
		    proxy_url_data:[],
		    imgArr: [],
      }
    },
    mounted() {
    	this.work_order_sn = this.$route.query.work_order_sn;
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
      back(){
    		var routerName = 'clientServiceListCXB'; //创新保工单
    		this.$router.push({name: routerName})
    	},
      next(){
      	//confirm_step创新保统一都是3，仿tas的第3步
      	this.$router.push({name: 'stepTwoFD', query: Object.assign({}, this.$route.query, {confirm_step: 3})})
      },
      queryDetail(){
      	this.loading = true;
      	this.$http.get(infoConfirmQueryUrl, {
      		params: {
	      		work_order_sn: this.work_order_sn,
	      		confirm_step: this.confirm_step,
	      		draft_state: 1, //是否为草稿状态 写死为1
	      	}
	      })
      	.then((resp) => {
      		this.loading = false;
      		var data = resp.data;
      		this.infoDetailData = data;
      		this.trademark = this.infoDetailData.trademark;
      		this.trademark_subject = this.infoDetailData.trademark_subject;
      		this.trademark_contact = this.infoDetailData.trademark_contact;
      		// console.log(data)
      	})
      	.catch((err) => {
      		this.loading = false;
      		console.log(err);
      	});
      },
    },
    filters:{
    	subjectTypeFormat:Filters.subjectTypeFormat,
    	mainBodeNumber:Filters.mainBodeNumber,
    	mainBodeSbj:Filters.mainBodeSbj,
    }
  }
</script>
<style lang='less'>
	.end_basic_cxb_f{background-color:#fff;padding:30px 90px 60px;border-radius: 0 2px 2px 2px;min-height: 500px;
		.basic_lists{padding-top: 20px;
			.kpl{
				li{width:33%;}
			}
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.basic_category{text-align:left;border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
				.category_left{width:66%;}
				ul{width:66%;
					li{overflow-x: hidden;width: 100%;
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
						img{width:98px;height:118px;}
						p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;left:-1px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
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
		.confirm_btn{width:204px;margin:40px auto 0;
			p{padding:0 30px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height:30px;cursor: pointer;}
			p:hover{border-color: #408CE6;color: #408CE6;}
			.btn_bg{background-color:#479CFF;color:#fff;}
			.btn_bg:hover{border-color: #408CE6;background-color: #408CE6;color:#fff;}
		}
		.hov{color: #479CFF;}
	}
	.el-dialog{z-index: 3000;}
</style>
