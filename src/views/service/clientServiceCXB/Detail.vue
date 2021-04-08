<template>
	<div class="client_basic_cxb" v-loading="loading" element-loading-text="拼命加载中">
		<div v-if="!loading">
			<div class="basic_lists" v-if="detailData.workOrder">
				<p>基本信息</p>
				<div class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">工单状态</p>
							<p class="txt">{{detailData.workOrder.cxbStatus | cxbStatus}}</p>
						</li>
						<li>
							<p class="tit">服务号</p>
							<p class="txt">{{detailData.workOrder.serviceId}}</p>
						</li>
						<li>
							<p class="tit">服务名称</p>
							<p class="txt">{{detailData.workOrder.bs_name}}</p>
						</li>
						<li>
							<p class="tit">下单时间</p>
							<p class="txt">{{detailData.workOrder.createTime | dateFormat}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">任务号</p>
							<p class="txt">{{detailData.workOrder.taskId}}</p>
						</li>
						<li>
							<p class="tit">服务分类</p>
							<p class="txt">{{detailData.workOrder.bs_class_name}}</p>
						</li>
						<li>
							<p class="tit">金额</p>
							<p class="txt">{{detailData.workOrder.orderAmount | priceformat}}</p>
						</li>
						<li>
							<p class="tit">支付时间</p>
							<p class="txt">{{detailData.workOrder.payTime | dateFormat}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 拾贝网账户信息 -->
			<div class="basic_lists">
				<p>拾贝网账户信息</p>
				<div v-if="detailData.memberinfo" class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">用户昵称</p>
							<p class="txt">{{detailData.memberinfo.nickname}}</p>
						</li>
						<li>
							<p class="tit">手机号码</p>
							<p class="txt">{{detailData.memberinfo.phone}}</p>
						</li>
						<li>
							<p class="tit">所属行业</p>
							<p class="txt">{{detailData.memberinfo.industryName}}</p>
						</li>
						<li>
							<p class="tit">QQ</p>
							<p class="txt">{{detailData.memberinfo.member_qq || '--'}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">姓名</p>
							<p class="txt">{{detailData.memberinfo.truename}}</p>
						</li>
						<li>
							<p class="tit">性别</p>
							<p class="txt">{{detailData.memberinfo.sex | sex}}</p>
						</li>
						<li>
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.memberinfo.member_wechat || '--'}}</p>
						</li>
					</ul>
				</div>
				<div v-else class="basic_category clearfix">
					<ul class="fl">
						<li>
							<p class="tit">未绑定拾贝网账号</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 申请主体 -->
			<div class="basic_lists" v-if="detailData.trademarkSubject">
				<p>申请主体</p>
				<!-- 国内个人 -->
				<div v-if="detailData.trademarkSubject.applyType == 1" class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.trademarkSubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">申请人姓名</p>
							<p class="txt">{{detailData.trademarkSubject.applyName}}</p>
						</li>
						<li>
							<p class="tit">申请人电话</p>
							<p class="txt">{{detailData.trademarkSubject.applyPhone}}</p>
						</li>
						<li>
							<p class="tit">申请人邮箱</p>
							<p class="txt">{{detailData.trademarkSubject.applyEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人传真</p>
							<p class="txt">{{detailData.trademarkSubject.applyFax || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人地址</p>
							<p class="txt">{{detailData.trademarkSubject.applyAreaInfo + detailData.trademarkSubject.applyAddress}}</p>
						</li>
						<li>
							<p class="tit">申请人邮编</p>
							<p class="txt">{{detailData.trademarkSubject.applyZipCode}}</p>
						</li>
						<li>
							<p class="tit">申请人身份证号</p>
							<p class="txt">{{detailData.trademarkSubject.applyNumber}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.trademarkSubject.standby1"><!--  @click="certificatePreview(usinessLicense)" -->
							<a :href="detailData.trademarkSubject.standby1" target="_blank">
								<img :src="usinessLicense[0]" alt="">
	            	<p>{{detailData.trademarkSubject.applyType | fileName}}</p>
	            </a>
						</div>
						<div class="fl mr30" v-if="detailData.trademarkSubject.standby2"><!--  @click="certificatePreview(licenseName)" -->
							<a :href="detailData.trademarkSubject.standby2" target="_blank">
								<img :src="licenseName[0]" alt="">
	            	<p>{{detailData.trademarkSubject.applyType | licenseName}}</p>
            	</a>
						</div>
					</div>
				</div>
				<!-- 国内企业 -->
				<div v-if="detailData.trademarkSubject.applyType == 2" class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.trademarkSubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">申请企业名称</p>
							<p class="txt">{{detailData.trademarkSubject.applyName}}</p>
						</li>
						<li>
							<p class="tit">企业营业执照号</p>
							<p class="txt">{{detailData.trademarkSubject.applyNumber}}</p>
						</li>
						<li>
							<p class="tit">企业联系电话</p>
							<p class="txt">{{detailData.trademarkSubject.applyPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业邮箱</p>
							<p class="txt">{{detailData.trademarkSubject.applyEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业地址</p>
							<p class="txt">{{detailData.trademarkSubject.applyAreaInfo + detailData.trademarkSubject.applyAddress}}</p>
						</li>
						<li>
							<p class="tit">企业邮编</p>
							<p class="txt">{{detailData.trademarkSubject.applyZipCode}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.trademarkSubject.standby1" @click="certificatePreview(usinessLicense)">
							<img :src="usinessLicense[0]" alt="">
            	<p>{{detailData.trademarkSubject.applyType | fileName}}</p>
						</div>
						<div class="fl mr30" v-if="detailData.trademarkSubject.standby2" @click="certificatePreview(licenseName)">
							<img :src="licenseName[0]" alt="">
            	<p>{{detailData.trademarkSubject.applyType | licenseName}}</p>
						</div>
					</div>
				</div>
				<!-- 境外个人 -->
				<div v-if="detailData.trademarkSubject.applyType == 3" class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.trademarkSubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">申请人姓名（英文）</p>
							<p class="txt">{{detailData.trademarkSubject.applyNameEn}}</p>
						</li>
						<li>
							<p class="tit">申请人姓名（中文）</p>
							<p class="txt">{{detailData.trademarkSubject.applyName}}</p>
						</li>
						<li>
							<p class="tit">申请人护照号</p>
							<p class="txt">{{detailData.trademarkSubject.applyNumber}}</p>
						</li>
						<li>
							<p class="tit">申请人联系电话</p>
							<p class="txt">{{detailData.trademarkSubject.applyPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人邮箱</p>
							<p class="txt">{{detailData.trademarkSubject.applyEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人传真</p>
							<p class="txt">{{detailData.trademarkSubject.applyFax || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人地址</p>
							<p class="txt">{{detailData.trademarkSubject.applyAreaInfo + detailData.trademarkSubject.applyAddress}}</p>
						</li>
						<li>
							<p class="tit">申请人邮编</p>
							<p class="txt">{{detailData.trademarkSubject.applyZipCode}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.trademarkSubject.standby1" @click="certificatePreview(usinessLicense)">
							<img :src="usinessLicense[0]" alt="">
            	<p>{{detailData.trademarkSubject.applyType | fileName}}</p>
						</div>
						<div class="fl mr30" v-if="detailData.trademarkSubject.standby2" @click="certificatePreview(licenseName)">
							<img :src="licenseName[0]" alt="">
            	<p>{{detailData.trademarkSubject.applyType | licenseName}}</p>
						</div>
					</div>
				</div>
				<!-- 境外企业 -->
				<div v-if="detailData.trademarkSubject.applyType == 4" class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.trademarkSubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">企业名称（英文）</p>
							<p class="txt">{{detailData.trademarkSubject.applyNameEn || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业名称（中文）</p>
							<p class="txt">{{detailData.trademarkSubject.applyName}}</p>
						</li>
						<li>
							<p class="tit">企业联系电话</p>
							<p class="txt">{{detailData.trademarkSubject.applyPhone}}</p>
						</li>
						<li>
							<p class="tit">企业邮箱</p>
							<p class="txt">{{detailData.trademarkSubject.applyEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业传真</p>
							<p class="txt">{{detailData.trademarkSubject.applyFax || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业注册地址</p>
							<p class="txt">{{detailData.trademarkSubject.applyAreaInfo + detailData.trademarkSubject.applyAddress}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.trademarkSubject.standby1" @click="certificatePreview(usinessLicense)">
							<img :src="usinessLicense[0]" alt="">
            	<p>{{detailData.trademarkSubject.applyType | fileName}}</p>
						</div>
						<div class="fl mr30" v-if="detailData.trademarkSubject.standby2" @click="certificatePreview(licenseName)">
							<img :src="licenseName[0]" alt="">
            	<p>{{detailData.trademarkSubject.applyType | licenseName}}</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 联系人信息 -->
			<div class="basic_lists" v-if="detailData.trademarkContact">
				<p>联系人信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">联系人姓名</p>
							<p class="txt">{{detailData.trademarkContact.contactName}}</p>
						</li>
						<li>
							<p class="tit">联系人电话</p>
							<p class="txt">{{detailData.trademarkContact.contactPhone}}</p>
						</li>
						<li>
							<p class="tit">联系人邮箱</p>
							<p class="txt">{{detailData.trademarkContact.contactEmail}}</p>
						</li>
						<li>
							<p class="tit">联系人邮编</p>
							<p class="txt">{{detailData.trademarkContact.contactZipCode || '--'}}</p>
						</li>
						<li>
							<p class="tit">联系人地址</p>
							<p class="txt">{{(detailData.trademarkContact.contactAreaInfo || '') + (detailData.trademarkContact.contactAddress || '')}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 开票信息 -->
			<div class="basic_lists">
				<p>开票信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left" v-if="!detailData.invoice">
						<li>
							<p class="tit">未申请开票</p>
						</li>
					</ul>
					<template v-if="detailData.invoice">
					<!-- 客户下单资料未上报 -->
						<ul class="fl category_left">
							<li>
								<p class="tit">发票抬头</p>
								<p v-if="detailData.trademarkSubject.applyType == 1 || detailData.trademarkSubject.applyType == 3" class="txt">{{detailData.invoice.invoiceTitle || '--'}}（非企业）</p>
								<p v-if="detailData.trademarkSubject.applyType == 2 || detailData.trademarkSubject.applyType == 4" class="txt">{{detailData.invoice.invoiceTitle || '--'}}（企业）</p>
							</li>
							<li>
								<p class="tit">收件地址</p>
								<p class="txt">{{detailData.invoice.areaInfo + detailData.invoice.address || '--'}}</p>
							</li>
						<!-- 下单且提交开票信息 -->
						<!-- 增值税专用发票 -->
							<li v-if="detailData.invoice.invoiceType">
							<!-- 可以有三种：普通增值税个人和企业，专用增值税发票 -->
								<p class="tit">开票类型</p>
								<p class="txt">{{detailData.invoice.invoiceType == 1 ? '增值税普通发票' : detailData.invoice.invoiceType == 2 ? '增值税专用发票' : ''}}</p>
							</li>
							<li v-if="(detailData.invoice.invoiceCode && detailData.trademarkSubject.applyType == 2) || (detailData.invoice.invoiceCode && detailData.trademarkSubject.applyType == 4)" >
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
							<li v-if="detailData.invoice.invoiceType == 2">
								<p class="tit">收件地址</p>
								<p class="txt">{{detailData.invoice.sendProvinceId + detailData.invoice.sendCityId + detailData.invoice.sendAreaId + detailData.invoice.sendAreaInfo + detailData.invoice.sendAddress}}</p>
							</li>
						</ul>
					</template>
				</div>
			</div>
			<!-- 注册商标信息 -->
			<div class="basic_lists">
				<p>注册商标信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li v-if="detailData.trademark">
							<p class="tit">商标名称</p>
							<p class="txt">{{detailData.trademark.trademarkName || '--'}}</p>
						</li>
						<li v-if="detailData.trademark">
							<p class="tit">商标描述</p>
							<p class="txt">{{detailData.trademark.trademarkDesc || '--'}}</p>
						</li>
						<li v-if="detailData.confirmBook && detailData.confirmBook.contractState">
							<p class="tit">合同书</p>
							<p v-if="!detailData.confirmBook.contractState || detailData.confirmBook.contractState<=1" class="txt">{{detailData.confirmBook.contractState | cxbDownTxt}}</p>
							<a @click="refreshInfo(detailData.confirmBook.contractState)" v-if="detailData.confirmBook.contractState && detailData.confirmBook.contractState>1" :href="rootUrl+'/api/downThreeBook?workOrderId='+workOrderId+'&type=1&url='+detailData.confirmBook.contract+'&access_token='+token+'&cxb_status='+cxb_status" class="txt txt_color">{{detailData.confirmBook.contractState | cxbDownTxt}}</a>
						</li>
						<li v-if="detailData.confirmBook && detailData.confirmBook.proxyState">
							<p class="tit">委托书</p>
							<p v-if="!detailData.confirmBook.proxyState || detailData.confirmBook.proxyState<=1" class="txt">{{detailData.confirmBook.proxyState | cxbDownTxt}}</p>
							<a @click="refreshInfo(detailData.confirmBook.proxyState)" v-if="detailData.confirmBook.proxyState && detailData.confirmBook.proxyState>1" :href="rootUrl+'/api/downThreeBook?workOrderId='+workOrderId+'&type=3&url='+detailData.confirmBook.proxy+'&access_token='+token+'&cxb_status='+cxb_status" class="txt txt_color">{{detailData.confirmBook.proxyState | cxbDownTxt}}</a>
						</li>
						<li v-if="detailData.confirmBook && detailData.confirmBook.confirmState">
							<p class="tit">确认书</p>
							<p v-if="!detailData.confirmBook.confirmState || detailData.confirmBook.confirmState<=1" class="txt">{{detailData.confirmBook.confirmState | cxbDownTxt}}</p>
							<a @click="refreshInfo(detailData.confirmBook.confirmState)" v-if="detailData.confirmBook.confirmState && detailData.confirmBook.confirmState>1" :href="rootUrl+'/api/downThreeBook?workOrderId='+workOrderId+'&type=2&url='+detailData.confirmBook.confirm+'&access_token='+token+'&cxb_status='+cxb_status" class="txt txt_color">{{detailData.confirmBook.confirmState | cxbDownTxt}}</a>
						</li>
					</ul>
					<div class="basic_img fl clearfix" v-if="detailData.trademark">
						<div class="fl mr30" v-if="detailData.trademark.proxyUrl" @click="preview(detailData.trademark.proxyUrl)">
							<img :src="detailData.trademark.proxyUrl" alt="">
							<p title="委托书">委托书</p>
						</div>
						<div class="fl mr30" v-if="detailData.trademark.blackWhitePicUrl" @click="preview(detailData.trademark.blackWhitePicUrl)">
							<img :src="detailData.trademark.blackWhitePicUrl" alt="">
							<p title="黑白色">黑白色</p>
						</div>
						<div class="fl" v-if="detailData.trademark.specifyPicUrl" @click="preview(detailData.trademark.specifyPicUrl)">
							<img :src="detailData.trademark.specifyPicUrl" alt="">
							<p title="黑白色">指定色</p>
						</div>
					</div>
				</div>
			</div>

			<div class="service">
				<p class="service_tit">商标类别</p>
				<div class="service_table">
					<!-- <p>当前服务状态：待服务</p> -->
					<ul class="table_tit clearfix">
						<li class="fl tb_01" style="padding-left:20px;">序号</li>
						<li class="fl tb_02">服务单号</li>
						<li class="fl tb_03" style="padding-left:25px;">商标类别</li>
						<li class="fl tb_04">办理状态</li>
						<li class="fl tb_05">小项信息</li>
						<li class="fl tb_06">操作</li>
					</ul>
					<ul class="table_list clearfix" v-for="item in detailData.trademarkClass">
						<li class="fl tb_01" style="padding-left:20px;"><p>{{item.number}}</p></li>
						<li class="fl tb_02"><p>{{item.orderSn}}</p></li>
						<li class="fl tb_03"><p :class="{'ml20':!item.recommend}"><img v-if="item.recommend" class="mr5" src="~assets/img/cxb/recom.png" alt="">{{item.className}}</p></li>
						<li class="fl tb_04"><p>{{item.applyState || '--'}}</p></li>
						<li class="fl tb_05"><p style="max-width: 400px;">{{item.minName || '--'}}</p></li>
						<li class="fl tb_06"><p style="color:#479cff;cursor:pointer" @click="toDetail(item)">查看详情</p></li>
					</ul>
				</div>
			</div>
			<div class="service_state" v-if="detailData.operatorRecord && detailData.operatorRecord.length">
				<p class="service_tit">操作记录</p>
				<div class="service_table">
					<!-- <p>当前服务状态：待服务</p> -->
					<ul class="table_tit clearfix">
						<li class="fl tb01" style="padding-left:20px;">操作时间</li>
						<!-- <li class="fl tb02">操作类型</li> -->
						<li class="fl tb02">操作动作</li>
						<li class="fl tb03">操作人</li>
					</ul>
					<div class="record">
						<ul class="table_list clearfix" v-for="(item , $index) in detailData.operatorRecord">
							<li class="fl tb01" style="padding-left:20px;">
								<p class="listL fl" :class="{'listL':$index}">
									<i class="listBgc"></i>
								</p>
								<p class="fl">{{item.createTime | dateFormat}}</p>
							</li>
							<!-- <li class="fl tb02"><p>{{item.recordContentService}}</p></li> -->
							<li class="fl tb02"><p>{{item.recordContentService}}</p></li>
							<li class="fl tb03"><p>{{item.operatorName}}</p></li>
						</ul>
					</div>
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
	</div>
</template>
<script>
	import Vue from 'vue'
  import VueCookie from 'vue-cookie'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
  const rootUrl = CONFIG.rootUrl;
	const workOrderDetailUrl = './api/findCxbWorkOrderDetail';
	export default {
  	components: {
    },
    data() {
      return {
      	cxb_status:'',
        rootUrl:rootUrl,
      	textarea:'',
      	radio:'1',
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
      	cateIdData: intClsData.cateIdData,
      	token:''
      }
    },
    methods: {
    	// 跳转详情页
    	toDetail(item){
				this.$router.push({name: 'serviceDetail', params: {orderSn: item.orderSn}})
    	},
    	refreshInfo(state){//刷新页面数据
    		var self = this;
    		if(state != 3){
					setTimeout(function(){
	    			self.search();
		      },1000)
    		}
    	},
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
	    	this.workOrderId = this.$route.params.id;
	    	self.loading = true;
	    	this.$http.get(workOrderDetailUrl +'?workOrderId=' + this.workOrderId + '&cxb_status=' + this.$route.params.state)
	    	.then((resp) => {
	        self.loading = false;
	    		self.detailData = resp.data;
	    		// 证件
		      if(self.detailData.trademarkSubject.standby1){
		        self.imgUrl(self.detailData.trademarkSubject.standby1);
		      }
		      // 执照
		      if(self.detailData.trademarkSubject.standby2){
		        self.licenseUrl(self.detailData.trademarkSubject.standby2);
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
    	this.cxb_status = this.$route.params.state;
    	this.token = VueCookie.get('service_token');
    },
    filters: {
    	priceformat: Filters.priceformat,
      dateFormat: Filters.formatDate.dateFormat,
      sex:Filters.sex,
      cxbDownTxt:Filters.cxbDownTxt,
      formatApplySbj:Filters.subjectTypeFormat,
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
		  },
		  cxbStatus: function(data){
		  	var ret = ''
		    switch (data+''){
		      case '1':
		        ret = "待材料评审";
		        break;
		      case '2':
		        ret = "评审不通过";
		        break;
		      case '3':
		        ret = "已评审待确认";
		        break;
		      case '4':
		        ret = "已确认待上报";
		        break;
		      case '5':
		        ret = "已上报待审核";
		        break;
		      case '6':
		        ret = "申报中";
		        break;
		      case '7':
		        ret = "审核不通过";
		        break;
		      case '8':
		        ret = "申报结束";
		        break;
		    }
		    return ret;
		  }
    },
  }
</script>
<style lang='less'>
	.client_basic_cxb{background-color:#fff;padding:0px 20px 20px;min-height: 500px;
		.basic_lists{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.basic_category{text-align:left;border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
				.category_left{width:60%;}
				ul{width:50%;
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;word-wrap: break-word;}
						a{text-decoration:none;}
						// 已支付
						p.topay{color:#36af47;}
						.tit{width:120px;font-size:13px;color:#556677;}
						.txt{font-size:13px;color:#7f8fa4;max-width:70%;margin-left: 10px;word-break:break-all;}
						.txt.txt_color{color: #479CFF;}
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
				.tb01{width:10%;text-align:left;}
				.tb02{width:20%;text-align:left;}
				.tb03{width:20%;text-align:left;}
				.tb04{width:50%;text-align:left;}
				// 商标类别列表宽度
				.tb_01{width:10%;}
				.tb_02{width:20%;}
				.tb_03{width:20%;}
				.tb_04{width:15%;}
				.tb_05{width:25%;}
				.tb_06{width:10%;text-align: center;}
				ul{
					li{line-height: 40px;height: 40px;text-align:left;}
				}
				.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
					li{font-size: 13px;color: #223344;}
				}
				.table_list{border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;border-bottom:1px solid #DFE2E5;
					li{
						padding:0 5px;
						p{line-height:18px;line-height: 40px;height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size: 13px;color: #556677;font-size: 13px;
							img{vertical-align: middle;}
						}
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
				.tb01{width:25%;text-align:left;}
				.tb02{width:50%;text-align:left;}
				.tb03{width:25%;text-align:left;}
				ul{
					li{line-height: 40px;height: 40px;}
				}
				.table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
					li{font-size: 13px;color: #223344;}
				}
				.record{border-bottom:1px solid #DFE2E5;border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;padding-bottom:15px;
					.table_list{padding-top:15px;
						li{line-height:18px;height: 18px;
							p{text-overflow: ellipsis;white-space: nowrap;color: #556677;font-size: 13px;
								i{height:10px;width:10px;background-color:#d8d8d8;display:inline-block;border-radius:100%;position: absolute;top:23px;left:-5px;}
								.listBgc{background: #09BB07;left:-4px;}
							}
							.listL{position: relative;height:25px;margin-top: -20px;width:15px;}
							.list_l{border-left:1px dashed #ddd;position: relative;height:25px;margin-top: -20px;width:15px;}
						}
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
