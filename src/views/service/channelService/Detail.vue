<template>
	<div class="client_basic_cxb" v-loading="loading" element-loading-text="拼命加载中">
		<div v-if="!loading">
			<div class="basic_lists" v-if="detailData.inputChannelOrder">
				<p>工单信息</p>
				<div class="basic_category clearfix">
					<ul class="fl hasvoucherfw">
						<li v-if="detailData.inputChannelOrder.status">
							<p class="tit">工单状态：</p>
							<p class="txt">{{detailData.inputChannelOrder.status|workOrderStatusformat}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.orderOrigin">
							<p class="tit">订单来源</p>
							<p class="txt">{{detailData.inputChannelOrder.orderOrigin}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.custPlatform">
							<p class="tit">客户平台</p>
							<p class="txt">{{detailData.inputChannelOrder.custPlatform}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.memberName">
							<p class="tit">客户姓名</p>
							<p class="txt"><span>{{detailData.inputChannelOrder.memberName}}</span><span v-if="isenalbeUpdate" class="xiugaibtn" @click="showauditbox">修改</span></p>
						</li>
						<li v-if="detailData.inputChannelOrder.memberPhone">
							<p class="tit">客户手机号</p>
							<p class="txt">{{detailData.inputChannelOrder.memberPhone}}<span v-if="isenalbeUpdate" class="xiugaibtn" @click="showauditbox">修改</span></p>
						</li>
						<li v-if="detailData.inputChannelOrder.email">
							<p class="tit">邮箱</p>
							<p class="txt">{{detailData.inputChannelOrder.email}}<span v-if="isenalbeUpdate" class="xiugaibtn" @click="showauditbox">修改</span></p>
						</li>
						<li v-if="detailData.inputChannelOrder.markSn">
							<p class="tit">平台订单号</p>
							<p class="txt">{{detailData.inputChannelOrder.markSn}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.nickname">
							<p class="tit">昵称旺旺</p>
							<p class="txt">{{detailData.inputChannelOrder.nickname}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.orderAmount">
							<p class="tit">订单金额</p>
							<p class="txt">{{detailData.inputChannelOrder.orderAmount | priceformat}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.unitPrice">
							<p class="tit">单价</p>
							<p class="txt">{{detailData.inputChannelOrder.unitPrice}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.discountPrice">
							<p class="tit">单件折后价格</p>
							<p class="txt">{{detailData.inputChannelOrder.discountPrice | priceformat}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.quantity">
							<p class="tit">商标数量</p>
							<p class="txt">{{detailData.inputChannelOrder.quantity}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.orderTime">
							<p class="tit">下单时间</p>
							<p class="txt">{{detailData.inputChannelOrder.orderTime | datesFormat}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.payTime">
							<p class="tit">付款时间</p>
							<p class="txt">{{detailData.inputChannelOrder.payTime | datesFormat}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.deliveryTime">
							<p class="tit">发货时间</p>
							<p class="txt">{{detailData.inputChannelOrder.deliveryTime | datesFormat}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.salesman">
							<p class="tit">业务专员</p>
							<p class="txt">{{detailData.inputChannelOrder.salesman}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.agentName">
							<p class="tit">完成专员</p>
							<p class="txt">{{detailData.inputChannelOrder.agentName}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.selectDocument">
							<p class="tit">流程专员</p>
							<p class="txt">{{detailData.inputChannelOrder.selectDocument}}</p>
						</li>
						<li v-if="detailData.inputChannelOrder.receiveAddress">
							<p class="tit">收件地址</p>
							<p class="txt">{{detailData.inputChannelOrder.receiveAddress}}<span v-if="isenalbeUpdate" class="xiugaibtn" @click="showauditbox">修改</span></p>
						</li>
						<li v-if="detailData.inputChannelOrder.remark">
							<p class="tit">备注</p>
							<p class="txt">{{detailData.inputChannelOrder.remark}}</p>
						</li>
					</ul>
					<div class="voucherbox" @click="preview(voucherUrlImg)" v-if="voucherUrlImg">
						<img :src="voucherUrlImg" alt="">
						<p>支付凭证</p>
					</div>
				</div>
			</div>
			<!-- 主体信息 -->
			<div class="basic_lists" v-if="detailData.memberApplySubject">
				<p>主体信息</p>
				<!-- 国内个人 -->
				<div v-if="detailData.memberApplySubject.applyType == 1" class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.memberApplySubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">申请人姓名</p>
							<p class="txt">{{detailData.memberApplySubject.applyName}}</p>
						</li>
						<li>
							<p class="tit">申请人电话</p>
							<p class="txt">{{detailData.memberApplySubject.applyPhone}}</p>
						</li>
						<li>
							<p class="tit">申请人邮箱</p>
							<p class="txt">{{detailData.memberApplySubject.applyEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人传真</p>
							<p class="txt">{{detailData.memberApplySubject.applyFax || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人地址</p>
							<p class="txt">{{detailData.memberApplySubject.applyAreaInfo + detailData.memberApplySubject.applyAddress}}</p>
						</li>
						<li>
							<p class="tit">申请人邮编</p>
							<p class="txt">{{detailData.memberApplySubject.applyZipCode}}</p>
						</li>
						<li>
							<p class="tit">申请人身份证号</p>
							<p class="txt">{{detailData.memberApplySubject.applyNumber}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby1"><!--  @click="certificatePreview(usinessLicense)" -->
							<a :href="detailData.memberApplySubject.standby1" target="_blank">
								<img :src="usinessLicense[0]" alt="">
								<p>{{detailData.memberApplySubject.applyType | fileName}}</p>
							</a>
						</div>
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby2"><!--  @click="certificatePreview(licenseName)" -->
							<a :href="detailData.memberApplySubject.standby2" target="_blank">
								<img :src="licenseName[0]" alt="">
								<p>{{detailData.memberApplySubject.applyType | licenseName}}</p>
							</a>
						</div>
					</div>
				</div>
				<!-- 国内企业 -->
				<div v-if="detailData.memberApplySubject.applyType == 2" class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.memberApplySubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">申请企业名称</p>
							<p class="txt">{{detailData.memberApplySubject.applyName}}</p>
						</li>
						<li>
							<p class="tit">企业营业执照号</p>
							<p class="txt">{{detailData.memberApplySubject.applyNumber}}</p>
						</li>
						<li>
							<p class="tit">企业联系电话</p>
							<p class="txt">{{detailData.memberApplySubject.applyPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业邮箱</p>
							<p class="txt">{{detailData.memberApplySubject.applyEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业地址</p>
							<p class="txt">{{detailData.memberApplySubject.applyAreaInfo + detailData.memberApplySubject.applyAddress}}</p>
						</li>
						<li>
							<p class="tit">企业邮编</p>
							<p class="txt">{{detailData.memberApplySubject.applyZipCode}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby1" @click="certificatePreview(usinessLicense)">
							<img :src="usinessLicense[0]" alt="">
            				<p>{{detailData.memberApplySubject.applyType | fileName}}</p>
						</div>
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby2" @click="certificatePreview(licenseName)">
							<img :src="licenseName[0]" alt="">
            				<p>{{detailData.memberApplySubject.applyType | licenseName}}</p>
						</div>
					</div>
				</div>
				<!-- 境外个人 -->
				<div v-if="detailData.memberApplySubject.applyType == 3" class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.memberApplySubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">申请人姓名（英文）</p>
							<p class="txt">{{detailData.memberApplySubject.applyNameEn}}</p>
						</li>
						<li>
							<p class="tit">申请人姓名（中文）</p>
							<p class="txt">{{detailData.memberApplySubject.applyName}}</p>
						</li>
						<li>
							<p class="tit">申请人护照号</p>
							<p class="txt">{{detailData.memberApplySubject.applyNumber}}</p>
						</li>
						<li>
							<p class="tit">申请人联系电话</p>
							<p class="txt">{{detailData.memberApplySubject.applyPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人邮箱</p>
							<p class="txt">{{detailData.memberApplySubject.applyEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人传真</p>
							<p class="txt">{{detailData.memberApplySubject.applyFax || '--'}}</p>
						</li>
						<li>
							<p class="tit">申请人地址</p>
							<p class="txt">{{detailData.memberApplySubject.applyAreaInfo + detailData.memberApplySubject.applyAddress}}</p>
						</li>
						<li>
							<p class="tit">申请人邮编</p>
							<p class="txt">{{detailData.memberApplySubject.applyZipCode}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby1" @click="certificatePreview(usinessLicense)">
							<img :src="usinessLicense[0]" alt="">
            	<p>{{detailData.memberApplySubject.applyType | fileName}}</p>
						</div>
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby2" @click="certificatePreview(licenseName)">
							<img :src="licenseName[0]" alt="">
            	<p>{{detailData.memberApplySubject.applyType | licenseName}}</p>
						</div>
					</div>
				</div>
				<!-- 境外企业 -->
				<div v-if="detailData.memberApplySubject.applyType == 4" class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.memberApplySubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">企业名称（英文）</p>
							<p class="txt">{{detailData.memberApplySubject.applyNameEn || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业名称（中文）</p>
							<p class="txt">{{detailData.memberApplySubject.applyName}}</p>
						</li>
						<li>
							<p class="tit">企业联系电话</p>
							<p class="txt">{{detailData.memberApplySubject.applyPhone}}</p>
						</li>
						<li>
							<p class="tit">企业邮箱</p>
							<p class="txt">{{detailData.memberApplySubject.applyEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业传真</p>
							<p class="txt">{{detailData.memberApplySubject.applyFax || '--'}}</p>
						</li>
						<li>
							<p class="tit">企业注册地址</p>
							<p class="txt">{{detailData.memberApplySubject.applyAreaInfo + detailData.memberApplySubject.applyAddress}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby1" @click="certificatePreview(usinessLicense)">
							<img :src="usinessLicense[0]" alt="">
            	<p>{{detailData.memberApplySubject.applyType | fileName}}</p>
						</div>
						<div class="fl mr30" v-if="detailData.memberApplySubject.standby2" @click="certificatePreview(licenseName)">
							<img :src="licenseName[0]" alt="">
            	<p>{{detailData.memberApplySubject.applyType | licenseName}}</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 联系人信息 -->
			<!-- <div class="basic_lists" v-if="detailData.trademarkContact">
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
			</div> -->
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
								<p v-if="detailData.memberApplySubject.applyType == 1 || detailData.memberApplySubject.applyType == 3" class="txt">{{detailData.invoice.invoiceTitle || '--'}}（非企业）</p>
								<p v-if="detailData.memberApplySubject.applyType == 2 || detailData.memberApplySubject.applyType == 4" class="txt">{{detailData.invoice.invoiceTitle || '--'}}（企业）</p>
							</li>
							<!-- 下单且提交开票信息 -->
							<!-- 增值税专用发票 -->
							<li v-if="detailData.invoice.invoiceType">
							<!-- 可以有三种：普通增值税个人和企业，专用增值税发票 -->
								<p class="tit">开票类型</p>
								<p class="txt">{{detailData.invoice.invoiceType == 1 ? '增值税普通发票' : detailData.invoice.invoiceType == 2 ? '增值税专用发票' : ''}}</p>
							</li>
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
								<p class="txt">{{detailData.invoice.areaInfo + detailData.invoice.address}}</p>
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
							<!-- <li>
								<p class="tit">收件地址</p>
								<p class="txt">{{detailData.invoice.sendAreaInfo + detailData.invoice.sendAddress}}</p>
							</li> -->
						</ul>
					</template>
				</div>
			</div>
			<!-- 注册商标信息 -->
			<div class="basic_lists">
				<p>注册商标信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li v-if="detailData.information">
							<p class="tit">商标名称</p>
							<p class="txt">{{detailData.information.trademarkName || '--'}}</p>
						</li>
						<li v-if="detailData.information">
							<p class="tit">图样类型</p>
							<p class="txt">{{detailData.information.picType == 1 ? '黑白色' : '指定色'}}</p>
						</li>
						<li v-if="detailData.information">
							<p class="tit">商标描述</p>
							<p class="txt">{{detailData.information.trademarkDesc || '--'}}</p>
						</li>
						<!-- <li v-if="detailData.information && detailData.information.contractUrl">
							<p class="tit">合同书</p>
							<a @click="refreshInfo(detailData.confirmBook.contractState)" :href="rootUrl+'/api/downThreeBook?workOrderSn='+workOrderSn+'&type=1&url='+detailData.confirmBook.contract+'&access_token='+token+'&cxb_status='+cxb_status" class="txt txt_color">{{detailData.confirmBook.contractState | cxbDownTxt}}</a>
						</li>
						<li v-if="detailData.confirmBook && detailData.confirmBook.proxyState">
							<p class="tit">委托书</p>
							<p v-if="!detailData.confirmBook.proxyState || detailData.confirmBook.proxyState<=1" class="txt">{{detailData.confirmBook.proxyState | cxbDownTxt}}</p>
							<a @click="refreshInfo(detailData.confirmBook.proxyState)" v-if="detailData.confirmBook.proxyState && detailData.confirmBook.proxyState>1" :href="rootUrl+'/api/downThreeBook?workOrderSn='+workOrderSn+'&type=3&url='+detailData.confirmBook.proxy+'&access_token='+token+'&cxb_status='+cxb_status" class="txt txt_color">{{detailData.confirmBook.proxyState | cxbDownTxt}}</a>
						</li>
						<li v-if="detailData.confirmBook && detailData.confirmBook.confirmState">
							<p class="tit">确认书</p>
							<p v-if="!detailData.confirmBook.confirmState || detailData.confirmBook.confirmState<=1" class="txt">{{detailData.confirmBook.confirmState | cxbDownTxt}}</p>
							<a @click="refreshInfo(detailData.confirmBook.confirmState)" v-if="detailData.confirmBook.confirmState && detailData.confirmBook.confirmState>1" :href="rootUrl+'/api/downThreeBook?workOrderSn='+workOrderSn+'&type=2&url='+detailData.confirmBook.confirm+'&access_token='+token+'&cxb_status='+cxb_status" class="txt txt_color">{{detailData.confirmBook.confirmState | cxbDownTxt}}</a>
						</li> -->
					</ul>
					<div class="basic_img fl clearfix" v-if="detailData.information">
						<div class="fl mr30" v-if="detailData.information.proxyUrl" @click="preview(detailData.information.proxyUrl)">
							<img :src="detailData.information.proxyUrl" alt="">
							<p title="委托书">委托书</p>
						</div>
						<div class="fl mr30" v-if="detailData.information.blackWhitePicUrl" @click="preview(detailData.information.blackWhitePicUrl)">
							<img :src="detailData.information.blackWhitePicUrl" alt="">
							<p title="黑白色">黑白色</p>
						</div>
						<div class="fl" v-if="detailData.information.specifyPicUrl" @click="preview(detailData.information.specifyPicUrl)">
							<img :src="detailData.information.specifyPicUrl" alt="">
							<p title="指定色">指定色</p>
						</div>
					</div>
				</div>
			</div>

			<div class="service">
				<p class="service_tit">服务信息</p>
				<div class="service_table">
					<!-- <p>当前服务状态：待服务</p> -->
					<ul class="table_tit clearfix">
						<li class="fl tb_01" style="padding-left:20px;">序号</li>
						<li class="fl tb_02">服务单号</li>
						<li class="fl tb_03" style="padding-left:25px;">商标类别</li>
						<li class="fl tb_04"></li>
						<li class="fl tb_05">小项数</li>
					</ul>
					<ul class="table_list clearfix" v-for="item in detailData.orderInformation">
						<li class="fl tb_01" style="padding-left:20px;"><p>{{item.seqNo}}</p></li>
						<li class="fl tb_02"><p>{{item.orderSn}}</p></li>
						<li class="fl tb_03"><p :class="{'ml20':!item.recommend}"><img v-if="item.recommend" class="mr5" src="~assets/img/cxb/recom.png" alt="">{{goodsname(item.intCls)}}</p></li>
						<li class="fl tb_04"><p> </p></li>
						<li class="fl tb_05"><p style="max-width: 400px;">{{item.minNumber || '--'}}</p></li>
					</ul>
				</div>
			</div>
			<div class="service_state" v-if="detailData.workOrderRecords && detailData.workOrderRecords.length">
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
						<ul class="table_list clearfix" v-for="(item , $index) in detailData.workOrderRecords">
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
		  <img :src="imgsrc" alt="" style="max-width: 100%;">
		</el-dialog>
		<!-- 证书预览 -->
		<el-dialog
		  :visible.sync="dialogImg"
		  size="tiny" class="img_preview" :modal-append-to-body="true">
		   <el-carousel :interval="5000" arrow="always" :autoplay='false' trigger="click">
		    <el-carousel-item v-for="(item,$index) in proxyImg" :key="$index">
		      <img :src="item" alt="" style="max-width: 100%;">
		    </el-carousel-item>
		  </el-carousel>
		</el-dialog>
		<el-dialog :visible.sync="auditshow" width="800px">
			<div class="auditdialog">
				<el-form ref="tmForms" :model="contactInfo" :rules="tmFormRules" :inline="true" auto-complete="off" label-width="140px" style="width: 700px">
					<el-form-item class="custName" label="客户姓名" prop="custName">
						<el-input type="text" v-model="contactInfo.custName" placeholder="请填写客户姓名" :maxlength="20"></el-input>
					</el-form-item>
					<el-form-item class="custPhone hasintr" label="客户手机号" prop="custPhone">
						<el-input type="text" v-model="contactInfo.custPhone" placeholder="请填写客户手机号" :maxlength="11"></el-input>
					</el-form-item>
					<el-form-item class="email hasintr" label="邮箱" prop="email">
						<el-input type="text" v-model="contactInfo.email" placeholder="请填写邮箱地址" :maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="收件地址">
						<el-form-item class="form-ipt-sm" prop="province_id">
							<el-select v-model="contactInfo.provinceId" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('contactInfo', contactInfo.provinceId,'contact_')">
							<SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
							</el-select>
						</el-form-item>
						<el-form-item class="form-ipt-sm" prop="city_id">
							<el-select v-model="contactInfo.cityId" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('contactInfo', contactInfo.cityId,'contact_')">
							<SebeOption v-for="item in contact_cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
							</el-select>
						</el-form-item>
						<el-form-item class="form-ipt-sm form-ipt-last" prop="area_id">
							<el-select v-model="contactInfo.areaId" clearable filterable default-first-option placeholder="请选择区">
							<SebeOption v-for="item in contact_areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
							</el-select>
						</el-form-item>
						<el-form-item prop="address" style="margin-top:20px;margin-bottom:0;">
							<el-input v-model="contactInfo.address" :maxlength="80" placeholder="请填写收件地址" auto-complete="off" class="form-ipt"></el-input>
						</el-form-item>
					</el-form-item>
				</el-form>
				<div class="btnsbox">
					<span class="qr" @click="queren">确定</span>
					<span class="qx" @click="auditshow=false">取消</span>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
  import VueCookie from 'vue-cookie'
	import intClsData from 'utils/intClsData.js'
	import { store } from 'utils/'
	import SebeOption from 'cps/select/sebeOption.vue'
	import Filters from 'utils/filters/'
  const rootUrl = CONFIG.rootUrl;
  const userUrl = CONFIG.userUrl;
  const addressUrl = userUrl + '/api/areas';
	const workOrderDetailUrl = './api/findChannelWorkOrderDetail';
	export default {
  	components: {
		SebeOption
    },
    data() {
      return {
		  auditshow: false,
      	cxb_status:'',
        rootUrl:rootUrl,
      	textarea:'',
      	radio:'1',
      	dialogVisible:false,
      	imgsrc:'',
      	loading:false,
      	detailData:{},
		  dialogImg:false,
		  voucherUrlImg:'',
      	proxyImg:'',
      	// 个人证件
      	usinessLicense:[],
		powerAttorney:[],
		provinceData:[],//主体省数据
		contact_cityData:[],//联系人城市数据
		contact_areaData:[],//联系人区数据
      	// 个人执照
		  licenseName:[],
		  tmFormRules: {
				custName:[
					{ required: true, message: '请输入客户姓名', trigger: 'blur' }
				],
				custPhone:[
					{ required: true, message: '请输入客户手机号', trigger: 'blur' },
					{ pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号', trigger: 'blur'}
				],
				email:[
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
					{ pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: '请输入有效的邮箱地址', trigger: 'blur'}
				],
			},
			contactInfo: {
				custName:'',
				custPhone:'',
				email:'',
				provinceId: '',
				cityId: '',
				areaId:'',
				address:'',
			},
      	cateIdData: intClsData.cateIdData,
      	token:''
      }
    },
	computed: {
		isenalbeUpdate() {
			const isok = store.get('userinfo').enalbeUpdate
			return !!isok
		}
	},
    methods: {
			goodsname(item){
				if(item){
					var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
					return str;
				}else{
					var str = '--';
					return str;
				}
			},
			queren() {
				const data = Object.assign({}, this.contactInfo)
				data.id = this.detailData.inputChannelOrder.id
				this.$refs['tmForms'].validate((valid) => {
					if(valid) {
						this.$http.post('/api/updateChannelInfo', data).then(res => {
							this.$message.success('修改成功')
							this.auditshow = false
							this.search()
						}).catch(err => {
							this.$message.error(err.response.data.msg || '操作失败')
						})
					} else {
						this.$message.warning('请完善信息后提交')
					}
				})
			},
			showauditbox() {
				const data = this.detailData.inputChannelOrder
				this.contactInfo = {
					custName: data.memberName,
					custPhone: data.memberPhone,
					email: data.email,
					provinceId: data.provinceId,
					cityId: data.cityId,
					areaId: data.areaId,
					address: data.address,
				}
				
				if(data.provinceId){
					this._triggerChange(this.contactInfo.provinceId, 'contact_cityData');
				}
				if(data.cityId){
					this._triggerChange(this.contactInfo.cityId, 'contact_areaData');
				}
				this.auditshow = true;
			},
		initProvince(){
			var self = this;
			this.$http.get(addressUrl+'?pId=0')
			.then(function(resp){
				resp = resp.data;
				if(resp.elements){
					self.provinceData = resp.elements;
				}else {
					console.error(resp.msg);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		},
		// 省份切换渲染城市 城市切换渲染区
		_triggerChange (code, dataName, callback){
			var self = this;
			self[dataName] = [];
			if(!code){
				return;
			}
			this.$http.get(addressUrl+'?pId='+ code)
			.then(function(resp){
				resp = resp.data;
				if(resp.elements){
					self[dataName] = resp.elements;
					callback && callback();
				}else {
					console.error(resp.msg);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		},
		//更改省
		changeProvince(formName, provinceCode, prevfix){
			var areaIdName = 'areaId';
			var cityIdName = 'cityId';
			this[formName][areaIdName] = '';
			this[formName][cityIdName] = '';
			this._triggerChange(provinceCode,  'contact_cityData');
			
		},
		//更改市
		changeCity(formName, cityCode, prevfix){
			var areaIdName ='areaId';
			this[formName][areaIdName] = '';
			this._triggerChange(cityCode, 'contact_areaData');
			
		},
		//获取选中的省市区对应的中文名称
		getSelectName (code, dataName){
			var self = this;
			var apply_type = this.apply_type;
			var data = self[dataName];
			var ret = '';
			data.forEach((item, i) => {
				if (item.area_id == code) {
					ret = item.name;
					return false;
				}
			});
			return ret;
		},
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
		  voucherUrls(url){
		    this.$http.get('./api/preview?pdf_url='+url)
		    .then((response) => {
		      this.voucherUrlImg = response.data.urls[0];
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
	    	this.workOrderSn = this.$route.params.workOrderSn;
	    	self.loading = true;
	    	this.$http.get(workOrderDetailUrl +'/' + this.workOrderSn)
	    	.then((resp) => {
	        self.loading = false;
				self.detailData = resp.data;
				if(self.detailData.inputChannelOrder.voucherUrl){
					self.voucherUrls(self.detailData.inputChannelOrder.voucherUrl);
				}
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
    	this.cxb_status = this.$route.params.state;
		this.token = VueCookie.get('service_token');
		this.initProvince();
    },
    filters: {
    	priceformat: Filters.priceformat,
	  dateFormat: Filters.formatDate.dateFormat,
	  datesFormat: Filters.formatDate.dateFormatYMD,
      sex:Filters.sex,
      cxbDownTxt:Filters.cxbDownTxt,
      formatApplySbj:Filters.subjectTypeFormat,
			workOrderStatusformat: Filters.workOrderStatusformat,
			payTypeFormat: Filters.payTypeFormat,
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
		  channelStatus: function(data){
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
			},
			
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
				.xiugaibtn {
					color: #379dea;
					margin-left: 20px;
					cursor: pointer;
				}
				.hasvoucherfw{
					width: 80%;
					padding-right: 10px;
					li{
						float: left;
						width: 50%;
					}
				}
				.voucherbox{
					float: left;
					position: relative;
					widows: 100px;
					height: 120px;
					border:1px solid #dfe2e5;
					cursor: pointer;
					img{width:98px;height:118px;}
					p{width:100px;text-align:center;background: rgba(0,0,0,0.6);color:#fff;line-height:26px;font-size:13px;position: absolute;bottom:0;cursor:pointer;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;left:-1px;}
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
		.auditdialog {
			padding: 30px 40px;
			.btnsbox{
				padding: 10px 70px;
				font-size: 0;
				text-align: right;
				> span {
					box-sizing: border-box;
					display: inline-block;
					width: 100px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					cursor: pointer;
					border-radius: 2px;
					font-size: 14px;
					margin-left: 20px;
					&.qr {
						background-color: #379dea;
						color: #fff;
					}
					&.qx {
						border: 1px solid #ccc;
						color: #666;
					}
				}
			}
			.el-form-item{margin-bottom: 20px;
					.el-form-item__label{padding:5px 12px 5px 0;line-height: 20px;text-align:left;}
					.el-form-item__label:before{margin-right:0;}
					.el-form-item__content{width:470px;line-height: 30px;
						.el-input{height: 30px;
							input{color:#556677}
						}
					}
				}
				.wider{
					.el-form-item__content{min-width:1050px;line-height: 30px;}
				}
				// .el-form-item.is-required .el-form-item__label:before{content: ''}
				.form-ipt-sm{
					width:150px;margin-right: 6px;margin-bottom: 0;
					.el-form-item__content{width:100%;}
					&:last-child{margin-right: 0;}
				}
				.form-ipt-last{margin-right: 0;float: right;}
		}
	}
</style>
