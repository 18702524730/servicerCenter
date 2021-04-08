<template>
	<div class="commonDetail bs_order_detail" v-loading="loading">
		<div v-if="!loading">
			<!-- 服务信息，显示规则：非国内商标注册或者是国内商标且是历史数据或店铺下单的服务单都有-->
			<div class="basic_lists" v-if="(detailData && detailData.order_bs_code=='sbfw_gnsb_zs' && order == 1) || (detailData && detailData.order_bs_code!='sbfw_gnsb_zs') || (detailData && detailData.order_distribute_from == 2)">
				<p>服务信息</p>
				<div class="table_list clearfix">
					<p class="mb10">当前服务状态：{{detailData.order_feedback_state}}</p>
					<table class="ll">
						<thead>
							<tr>
								<th>操作时间</th>
								<th>操作前状态</th>
								<th>操作后状态</th>
								<th>操作人</th>
								<th>备注</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="serviceInfo in detailData.feedbacks">
								<td>{{serviceInfo.operating_time | dateFormat}}</td>
								<td>{{serviceInfo.operating_satrt_state || '--'}}</td>
								<td>{{serviceInfo.operating_end_state || '--'}}</td>
								<td>{{serviceInfo.operator || '--'}}</td>
								<td><p>{{serviceInfo.memo || '--'}}</p></td>
							</tr>
							<tr v-if="!detailData.feedbacks || !detailData.feedbacks.length">
								<td colspan="5">
									<div class="lc no_data">
										<img src="~assets/img/nulldata.png" alt=""><span>暂无信息</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<el-button size="small" type="primary" class="mt10" @click="serviceType" v-if="detailData.stage && detailData.stage>0 && detailData.stage<90">设置服务状态</el-button>
					<!-- <p class="service_btn" @click="serviceType" v-if="detailData.stage && detailData.stage>0 && detailData.stage<90">设置服务状态</p> -->
				</div>
			</div>

			<!-- 验收信息 -->
			<div class="basic_lists" v-if="detailData">
				<p>验收信息</p>
				<div class="table_list clearfix">
					<table class="ll">
						<thead>
							<tr>
								<th>操作时间</th>
								<th>操作前状态</th>
								<th>操作后状态</th>
								<th>操作人</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in detailData.orderRecordDTOs">
								<td>{{item.create_time | dateFormat}}</td>
								<td>{{item.pre_status || '--'}}</td>
								<td>{{item.end_status || '--'}}</td>
								<td>{{item.operator_name || '--'}}</td>
							</tr>
							<tr v-if="!detailData.orderRecordDTOs || !detailData.orderRecordDTOs.length">
								<td colspan="4">
									<div class="lc no_data">
										<img src="~assets/img/nulldata.png" alt=""><span>暂无信息</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- 待服务和服务中 -->
					<el-button size="small" type="primary" class="mt10" @click="serviceCheck" v-if="detailData.order_check_accept == 1">发起服务验收</el-button>
				</div>
			</div>

			<div class="basic_lists" v-if="detailData">
				<p>基本信息</p>
				<div class="basic_category clearfix" v-if="detailData.ifChannelOrder==0">
					<ul>
						<li>
							<p class="tit">服务单号</p>
							<p class="txt">{{detailData.order_sn}}</p>
						</li>
						<li v-if="detailData.order_service_state">
							<p class="tit">服务状态</p>
							<p class="txt">{{detailData.order_service_state | orderStatus}}</p>
						</li>
						<li>
							<p class="tit">服务类目</p>
							<p class="txt">{{detailData.bs_class_name}}</p>
						</li>
						<li>
							<p class="tit">服务名称</p>
							<p class="txt">{{detailData.bs_name}}</p>
						</li>
						<li>
							<p class="tit">商品编号</p>
							<p class="txt">{{detailData.bs_number}}</p>
						</li>
						<li>
							<p class="tit">下单时间</p>
							<p class="txt">{{detailData.create_time | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">支付状态</p>
							<p class="txt" :class="{'topay':detailData.payment_state == 1,'nopay':!detailData.payment_state}">{{detailData.payment_state | payStatusformat}}</p>
						</li>
						<li>
							<p class="tit">实付金额</p>
							<p class="txt">{{detailData.payment_amount | priceformat}}</p>
						</li>
						<li>
							<p class="tit">支付方式</p>
							<p class="txt">{{detailData.payment_name}}</p>
						</li>
						<li>
							<p class="tit">支付时间</p>
							<p class="txt">{{detailData.payment_time | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">来源</p>
							<p class="txt">{{detailData.order_distribute_from == 1 ? '拾贝分单' : '店铺下单'}}</p>
						</li>
						<li v-if="detailData.salesman">
							<p class="tit">业务专员</p>
							<p class="txt">{{detailData.salesman}}</p>
						</li>
						<li v-if="detailData.agentName">
							<p class="tit">完成专员</p>
							<p class="txt">{{detailData.agentName}}</p>
						</li>
						<li v-if="detailData.selectDocument">
							<p class="tit">流程专员</p>
							<p class="txt">{{detailData.selectDocument}}</p>
						</li>
						<!--
						<li>
							<p class="tit">办理状态</p>
							<p class="txt">{{detailData.order_feedback_state}}</p>
						</li>
						<li>
							<p class="tit">售后状态</p>
							<p class="txt">{{detailData.refund_state | refundState}}</p>
						</li>
						 -->
					</ul>
				</div>
				<div class="otherorigin clearfix" v-if="detailData.ifChannelOrder==1">
					<ul class="clearfix otherlist">
						<li v-if="detailData.order_sn">
							<p class="tit">服务单号</p>
							<p class="txt">{{detailData.order_sn}}</p>
						</li>
						<li v-if="detailData.order_service_state">
							<p class="tit">服务状态</p>
							<p class="txt">{{detailData.order_service_state | orderStatus}}</p>
						</li>
						<li v-if="detailData.bs_class_name">
							<p class="tit">服务类目</p>
							<p class="txt">{{detailData.bs_class_name}}</p>
						</li>
						<li v-if="detailData.bs_name">
							<p class="tit">服务名称</p>
							<p class="txt">{{detailData.bs_name}}</p>
						</li>
						<li v-if="detailData.bs_number">
							<p class="tit">商品编号</p>
							<p class="txt">{{detailData.bs_number}}</p>
						</li>
						<li v-if="detailData.create_time">
							<p class="tit">下单时间</p>
							<p class="txt">{{detailData.create_time | dateFormat}}</p>
						</li>

						<li v-if="detailData.orderOrigin">
							<p class="tit">订单来源</p>
							<p class="txt">{{detailData.orderOrigin}}</p>
						</li>
						<li v-if="detailData.custPlatform">
							<p class="tit">客户平台</p>
							<p class="txt">{{detailData.custPlatform}}</p>
						</li>
						<li v-if="detailData.markSn&&(detailData.orderOrigin=='淘宝服务市场'||detailData.orderOrigin=='天猫')">
							<p class="tit">平台订单号</p>
							<p class="txt">{{detailData.markSn}}</p>
						</li>
						<li v-if="detailData.nickname&&(detailData.orderOrigin=='淘宝服务市场'||detailData.orderOrigin=='天猫')">
							<p class="tit">昵称/旺旺</p>
							<p class="txt">{{detailData.nickname}}</p>
						</li>
						<li v-if="detailData.orderAmount">
							<p class="tit">订单金额</p>
							<p class="txt">{{detailData.orderAmount |priceformat}}</p>
						</li>
						<li v-if="detailData.unitPrice">
							<p class="tit">单价</p>
							<p class="txt">{{detailData.unitPrice |priceformat}}</p>
						</li>
						<li v-if="detailData.discountPrice">
							<p class="tit">折后价格</p>
							<p class="txt">{{detailData.discountPrice |priceformat}}</p>
						</li>
						<li v-if="detailData.quantity">
							<p class="tit">商标数量</p>
							<p class="txt">{{detailData.quantity}}</p>
						</li>
						<li v-if="detailData.payTime">
							<p class="tit">付款时间</p>
							<p class="txt">{{detailData.payTime | dateFormat}}</p>
						</li>
						<li v-if="detailData.deliveryTime&&detailData.orderOrigin=='天猫'">
							<p class="tit">发货</p>
							<p class="txt">{{detailData.deliveryTime | dateFormat}}</p>
						</li>
						<li v-if="detailData.salesman">
							<p class="tit">业务专员</p>
							<p class="txt">{{detailData.salesman}}</p>
						</li>
						<li v-if="detailData.agentName">
							<p class="tit">完成专员</p>
							<p class="txt">{{detailData.agentName}}</p>
						</li>
						<li v-if="detailData.selectDocument">
							<p class="tit">流程专员</p>
							<p class="txt">{{detailData.selectDocument}}</p>
						</li>
						<li v-if="detailData.remark">
							<p class="tit">备注</p>
							<p class="txt">{{detailData.remark}}</p>
						</li>
					</ul>
					<div class="voucherbox" @click="preview(voucherUrlImg)" v-if="voucherUrlImg">
						<img :src="voucherUrlImg" alt="">
						<p>支付凭证</p>
					</div>
				</div>
			</div>

			<div class="basic_lists" v-if="detailData">
				<p>客户信息</p>
				<div class="basic_category clearfix">
					<ul>
						<li>
							<p class="tit">联系人</p>
							<p class="txt">{{detailData.contactName || '--'}}</p>
						</li>
						<li>
							<p class="tit">联系电话</p>
							<p class="txt">{{detailData.contactPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">邮箱</p>
							<p class="txt">{{detailData.contactEmail || '--'}}</p>
						</li>
						<li>
							<p class="tit">用户昵称</p>
							<p class="txt">{{detailData.memberDTO.nickname || '--'}}</p>
						</li>
						<li>
							<p class="tit">姓名</p>
							<p class="txt">{{detailData.memberDTO.truename || '--'}}</p>
						</li>
						<li>
							<p class="tit">注册手机号</p>
							<p class="txt">{{detailData.memberDTO.phone || '--'}}</p>
						</li>
						<li>
							<p class="tit">性别</p>
							<p class="txt">{{detailData.memberDTO.sex | sex}}</p>
						</li>
						<li>
							<p class="tit">所属行业</p>
							<p class="txt">{{detailData.memberDTO.industryName || '--'}}</p>
						</li>
						<li>
							<p class="tit">QQ</p>
							<p class="txt">{{detailData.memberDTO.member_qq || '--'}}</p>
						</li>
						<!-- <li>
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.memberDTO.member_wechat || '--'}}</p>
						</li> -->
					</ul>
				</div>
			</div>

			<!-- 非店铺下单才有 -->
			<div class="pay_inform" v-if="detailData && detailData.order_bs_code=='sbfw_gnsb_zs' && order != 1 && detailData.order_distribute_from != 2">
				<p>支付信息</p>
				<div>
					<ul class="clearfix">
						<li class="fl clearfix">
							<p class="fl">服务总价</p>
							<p class="pay_right fl">{{detailData.payment_amount + detailData.itemPrice | priceformat}}</p>
						</li>
						<li class="fl clearfix">
							<p class="fl">基础服务费</p>
							<p class="pay_right fl">{{detailData.payment_amount | priceformat}}<span :class="{'topay':detailData.payment_state == 1,'nopay':!detailData.payment_state}">（{{detailData.payment_state | payStatusformat}}）</span></p>
						</li>
						<li class="fl clearfix">
							<p class="fl">补小项费用</p>
							<p class="pay_right fl">{{detailData.itemPrice | priceformat}}<span class="topay" v-if="detailData.itemPrice > 0">（{{detailData.itemState | payStatusformat}}）</span></p>
						</li>
					</ul>
				</div>
			</div>

			<div class="basic_lists" v-if="detailData.memberApplySubject && detailData.order_bs_code=='sbfw_gnsb_zs' && order != 1">
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
						<div class="fl" v-if="usinessLicense[0] && detailData.memberApplySubject.applyType!=2">
							<a :href="detailData.memberApplySubject.standby2" target="_blank">
								<img :src="usinessLicense[0]" alt="">
	            	<p :title="detailData.memberApplySubject.applyType | licenseName">{{detailData.memberApplySubject.applyType | licenseName}}</p>
	            </a>
						</div>
		        <div class="fl ml20" v-if="detailData.memberApplySubject.standby1">
		        	<a :href="detailData.memberApplySubject.standby1" target="_blank">
			          <img :src="cardImg[0]" alt="">
			          <p :title="detailData.memberApplySubject.applyType | fileName">{{detailData.memberApplySubject.applyType | fileName}}</p>
		          </a>
		        </div>
					</div>
				</div>
			</div>

			<!-- 非店铺下单才有 -->
			<div class="basic_lists" v-if="detailData && detailData.order_bs_code=='sbfw_gnsb_zs' && order != 1 && detailData.order_distribute_from != 2">
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
							<p class="tit">群组官方编号</p>
							<p class="txt">{{detailData.niceGroupGovernNums || '--'}}</p>
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

			<div class="basic_lists" v-if="detailData.invoice">
				<p>开票信息</p>
				<div class="basic_category clearfix" style="border-bottom:0;">
					<ul v-if="!detailData.invoice || !detailData.invoice.invoiceType">
						<li>
							<p class="tit">未申请开票</p>
						</li>
					</ul>
					<ul v-if="detailData.invoice && detailData.invoice.invoiceType">
						<li>
							<p class="tit">发票类型</p>
							<p class="txt">{{detailData.invoice.invoiceType | invoiceTypeFormat}}</p>
						</li>
						<li>
							<p class="tit">发票抬头</p>
							<p class="txt">{{detailData.invoice.invoiceTitle || '--'}}</p>
						</li>
						<li>
							<p class="tit">纳税人识别号</p>
							<p class="txt">{{detailData.invoice.invoiceCode || '--'}}</p>
						</li>
						<li v-if="detailData.invoice.invoiceTime">
							<p class="tit">开票日期</p>
							<p class="txt">{{detailData.invoice.invoiceTime | datesFormat}}</p>
						</li>
						<li v-if="detailData.invoice.peInvocieNo">
							<p class="tit">官费发票号</p>
							<p class="txt">{{detailData.invoice.peInvocieNo || '--'}}</p>
						</li>
						<li v-if="detailData.invoice.spInvocieNo">
							<p class="tit">服务费发票号</p>
							<p class="txt">{{detailData.invoice.spInvocieNo || '--'}}</p>
						</li>
						<template v-if="detailData.memberApplySubject">
							<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
								<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}联系电话</p>
								<p class="txt">{{detailData.invoice.registPhone || '--'}}</p>
							</li>
							<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
								<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}注册地址</p>
								<p class="txt">{{detailData.invoice.areaInfo + detailData.invoice.address || '--'}}</p>
							</li>
							<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
								<p class="tit">开户行</p>
								<p class="txt">{{detailData.invoice.accountBank || '--'}}</p>
							</li>
							<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
								<p class="tit">银行账号</p>
								<p class="txt">{{detailData.invoice.accountNumber || '--'}}</p>
							</li>
						</template>
					</ul>
				</div>
			</div>

			<div class="basic_lists" v-if="detailData.orderAdress">
				<p>收件地址</p>
				<div class="basic_category clearfix">
					<ul>
						<li>
							<p class="tit">收件人姓名</p>
							<p class="txt">{{detailData.orderAdress.true_name}}</p>
						</li>
						<li>
							<p class="tit">收件人电话</p>
							<p class="txt">{{detailData.orderAdress.tel_phone || detailData.orderAdress.mob_phone || '--'}}</p>
						</li>
						<li>
							<p class="tit">收件人邮箱</p>
							<p class="txt">{{detailData.orderAdress.email || '--'}}</p>
						</li>
						<li>
							<p class="tit">收件地址</p>
							<p class="txt">{{detailData.orderAdress.area_info+detailData.orderAdress.address}}</p>
						</li>
						<li>
							<p class="tit">收件人邮编</p>
							<p class="txt">{{detailData.orderAdress.zip_code || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>

			<!-- 代理顾问分配记录 -->
			<div class="basic_lists" v-if="detailData.agentDistributeRecords">
				<p>代理顾问分配记录</p>
				<div class="table_list clearfix">
					<table class="ll">
						<thead>
							<tr>
								<th>代理顾问</th>
								<th>分配时间</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="agentItem in detailData.agentDistributeRecords">
								<td>{{agentItem.operatorName || '--'}}</td>
								<td>{{agentItem.agentDistributeTime | dateFormat}}</td>
							</tr>
							<tr v-if="!detailData.agentDistributeRecords || !detailData.agentDistributeRecords.length">
								<td colspan="2">
									<div class="lc no_data">
										<img src="~assets/img/nulldata.png" alt=""><span>暂无信息</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
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
			    <el-radio class="ml15" v-for="item in radioState" :key="item.code" :label="item.code">{{item.name}}</el-radio>
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
  const detailUrl = './api/findBsOrderDetailById';
  const stateUrl = './api/setOrderFeedback';
  const pdfUrl = './api/preview';
	export default {
		//props:['detailData'],
  	components: {
    },
    props:['order_id'],
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
		  voucherUrlImg:'',
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
    	serviceCheck(){
    		const h = this.$createElement;
    		this.$msgbox({
    			title: '发起确认',
          message: h('p', null, [
            h('span', null, '确定发起用户验收？ '),
            h('br', null, ''),
            h('span', null, '用户验收通过后该服务单将纳入当期结算金额。')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.$http.post('./api/startServiceAccept', {
        		order_id: this.order_id
        	})
	        .then((response) => {
	          this.$message.success('操作成功！');
	          this.infoDetail();
	        })
	        .catch((error) => {
	        	this.$message.error(error.msg);
	        });
        }).catch(() => {
        });
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
      // 初始化
    	infoDetail(){
				var self = this;
	      self.loading = true;
	    	this.$http.get(detailUrl+'?order_id=' + this.order_id)
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
				if(this.detailData.inputChannelOrder.voucherUrl){
					this.$http.get('./api/preview?pdf_url='+this.detailData.inputChannelOrder.voucherUrl)
					.then((response) => {
					this.voucherUrlImg = response.data.urls[0];
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
      		let data = resp.data;
      		if (data.code == 1) {
      			this.$message.error(data.message);
      			return;
      		}
	        self.infoDetail();
	    	}).catch((error) => {
	    		self.dialogState = false;
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
	  datesFormat:Filters.formatDate.dateFormatYMD,
      mainBodeSbj:Filters.mainBodeSbj,
      mainBodeNumber:Filters.mainBodeNumber,
      invoiceTypeFormat:Filters.invoiceTypeFormat,
      fileName: Filters.fileName,
      licenseName: Filters.licenseName,
    }
  }
</script>
<style lang='less'>
	.bs_order_detail{background-color:#fff;padding:0px 20px 20px;min-height: 500px;border-top:0;position: relative;
		.img_preview{
			img{
				max-width: 100%;
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
		.basic_lists{
			p{font-size:14px;}
			.otherorigin{
				border-bottom: 1px solid #dfe2e5;
    			padding-bottom: 10px;
				.otherlist{
					float: left;
					width: 80%;
					.tit{
						float: left;
						width: 120px;
						font-size: 13px;
						color: #556677;
					}
					.txt{
						float: left;
						line-height: 18px;
						margin-bottom: 10px;
						font-size: 13px;
						color: #7f8fa4;
						margin-left: 10px;
						word-break: break-all;
					}
					li{
						float: left;
						width: 50%;
						overflow: hidden;
					}
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
		}
	}
</style>
