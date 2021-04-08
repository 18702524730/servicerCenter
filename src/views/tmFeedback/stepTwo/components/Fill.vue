<template>
	<div class="steptwo_fill_cxb_f" v-loading="loading" element-loading-text="拼命加载中">
		<p class="mb20">材料评审</p>
		<el-form class="basic_info" ref="resultForm" :model="resultData" :rules="resultFormRules" :inline="true" auto-complete="off" label-width="140px" v-if="!loading">
			<el-form-item class="addAddress" label="评审结果" style="width:53%" required>
        <template>
				  <el-radio class="radio" v-model="through_state" :label="2">通过</el-radio>
				  <el-radio class="radio" v-model="through_state" :label="3">不通过</el-radio>
				</template>
      </el-form-item>
      <el-form-item class="addAddress" label="不通过原因" prop="not_pass_reason" style="width:53%" v-if="through_state==3">
        <el-input type="textarea" v-model="resultData.not_pass_reason" :autosize="{ minRows: 4, maxRows: 6}" size="small" placeholder="请填写审核不通过原因" :maxlength="100"></el-input>
        <span class="remain">({{resultData.not_pass_reason && resultData.not_pass_reason.length || 0}}/100字)</span>
      </el-form-item>
		</el-form>
    <div class="fill_state" v-if="!loading && through_state==2">

    	<div class="customer_type_wrap" v-if="needShowCusType" v-loading="customer_type_loading">
	    	<p>客户类型<span>（支持多选）</span></p>
	    	<div class="customer_type_list">
	    		<el-checkbox-group @change="customerTypeChange(selCustomerTypeList)" v-model="selCustomerTypeList">
		    		<div class="clearfix single" v-for="(type, index) in customerTypeData">
		    			<h3>{{type.name}}</h3>
		    			<div class="typelist">
								<el-checkbox v-for="(item, idx) in type.childes" :label="item" :key="idx">{{item.name}}</el-checkbox>
							</div>
		    		</div>
	    		</el-checkbox-group>
	    	</div>
    	</div>

    	<p>商标信息</p>
    	<div class="tm_info_btn">
    		<button class="add_big" @click="bigClassVisible=true"><span>+</span>添加商标类别</button>
    		<button v-if="!userConfirmed" class="creat_url" :data-clipboard-text="customerUrl" @click="copyUrl">生成小项推荐链接</button>
    		<button v-if="userConfirmed" class="ml10" @click="viewConfirmInfo">查看确认注册信息</button>
    	</div>
    	<div class="state" v-for="(info,$draftIndex) in draftInfo">
    		<div class="state_list" :class="{'bgc':$draftIndex === draftIndex}">
    			<!-- 点击收缩时候先保存入allEvents，然后初始化 -->
          <!-- 展开 -->
    			<img class="unwrap" src="~assets/img/release.png" alt="" v-if="info.PackUp" @click="openCurOrder($draftIndex,info)">
          <!-- 收缩 -->
    			<img src="~assets/img/shrinkage.png" alt="" v-if="!info.PackUp" @click="closeCurOrder(info)">
	    		<div class="list_tit clearfix">
	    			<p class="fl serial">{{$draftIndex+1>9 ? $draftIndex+1 : '0'+($draftIndex+1)}}</p>
						<p class="fl order">商标类别</p>
						<p class="fl big_name" :class="{isRecommend: info.recommend}">{{info.class_name}}</p>
	    		</div>
	    		<p class="mt10" v-if="!hasSomething(info)&&info.PackUp" @click="openCurOrder($draftIndex,info)">请完善商标注册信息</p>

          <!-- 收缩后显示的内容 -->
					<ul class="mt10 clearfix"  v-if="info.PackUp && hasSomething(info)">
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.service_nice_min || !info.service_nice_min.length}">小项信息</p>
							<p class="state_txt fl" :class="{'msgColor':!info.service_nice_min || !info.service_nice_min.length}">
								共{{info.service_nice_min && info.service_nice_min.length || 0}}个小项
								<template v-if="info.service_nice_min && info.service_nice_min.length">
								（<span v-for="item in info.service_nice_min">{{item.min_name + '，'}}</span>）
								</template>
							</p>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.similar_trademark}">在先近似商标</p>
							<p class="state_txt fl">{{info.similar_trademark || '--'}}</p>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.register_pass_rate}">注册通过率</p>
							<p class="state_txt fl">{{info.register_pass_rate || 0}}%</p>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.risk_desc_register_advice}">风险说明及注册建议</p>
							<p class="state_txt fl">{{info.risk_desc_register_advice || '--'}}</p>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.risk_desc_register_advice}">材料评审报告</p>
							<div class="fl upload_component" style="width: 50%;">
			      		<uploader @complete="setUploadedDataMaterialReport" @resetUploader="resetMaterialReportUploader" :fileName="audit_material_report_name" :postAction="'iprp_servicer/api/file/uploadAudit'" :url.sync="info.audit_material_report" :valueName="'audit_material_report'" :size="5" :extensions="'pdf'" :indexkey="$draftIndex"></uploader>
			      		<div class="upload_tip">
			      			<p class="format">格式说明：仅支持PDF格式文件且大小限制在5M以内</p>
			      		</div>
			      	</div>
						</li>
					</ul>

					<div class="add mt20" v-if="$draftIndex === draftIndex&&!info.PackUp">
						<p>请选择商标小项：<span>（阿里巴巴创新保平台当前使用的尼斯分类为2017年3月版，上传申报材料时请使用最新版）</span></p>
            <!-- 45大类 -->
						<!-- <ul class="clearfix mt15">
							<li v-for="(item,$index) in bigState" :class="{'click_li':$index+1 == index, 'notChoose': allSelectedBigData.indexOf($index+1) != -1 && $index+1 != index}" class="fl mr10 mb10" @click="selected(item, info)">{{$index+1 < 10 ? '0' + ($index+1) : ($index+1)}}{{item.class_govern_name}}</li>
						</ul> -->
						<div class="events clearfix mt10" style="padding-right:10px;" v-show="selectedBigItem.class_name">
							<div class="events_left fl">
								<div class="head clearfix">
                <!-- 选中名称 -->
									<p>{{selectedBigItem.class_name}}</p>
									<!-- <button class="fr" @click="DataFuzzyQuery(searchEvents)">搜索</button> -->
									<input type="text" v-model="searchEvents" class="fr" placeholder="请输入小项名称、编号或关键词" @keyup="DataFuzzyQuery(searchEvents)" @focus="DataFuzzyQuery(searchEvents)" @blur="blurclick">
									<span class="fr mr20 min_clip" @click="showMinClipboard=!showMinClipboard">小项剪切板</span>
									<ul class="fuzzyqueryList" v-if="FuzzyQueryData.length">
										<li v-for="item in FuzzyQueryData" @click="FuzzyQueryClick(item.min_id)" v-html="item.min_name"></li>
									</ul>
									<img src="~assets/img/Searchicon.png" alt="">
								</div>
								<div class="min_lipboard_wrap" v-show="showMinClipboard">
									<el-input
									  type="textarea"
									  :rows="12"
									  placeholder="请粘贴您所需的小项信息，小项间使用中文逗号区分。"
									  v-model="textareaV" class="textarea">
									</el-input>
									<div class="confirm_tip">
								  	<a href="" class="button no" @click.prevent="showMinClipboard = false">取消</a><a href="" class="button yes" @click.prevent="fillMin()">确定</a>
								  </div>
								</div>
								<!-- {{curSelectedSmallIdList}} -->
								<div class="list_over" v-loading="smallLoading">
									<div class="events_list" v-for="(item,$index) in niceEventsData">
                  	<!-- 小项头部 -->
										<div class="list_state clearfix" :class="{'mt20':$index !=0}" @click="toggleSmallNav(item)">
											<p class="list_name fl">
												<i class="el-icon-caret-bottom" v-show="!item.shrinkage" style="background-color:#f5f5f5"></i>
												<i class="el-icon-caret-right" v-show="item.shrinkage" style="background-color:#f5f5f5"></i>
												{{item.group_name}}
											</p>
											<p class="state_num fr">{{item.min_data.length}}项</p>
										</div>
                    <!-- 小项 -->
										<div class="mt15 pl10" v-if="item.shrinkage">
											<template>
												<el-checkbox-group @change="selectSmallChange(curSelectedSmallIdList,info)" v-model="curSelectedSmallIdList">
												  <el-checkbox v-for="(eventsName,eventsindex) in item.min_data" :label="eventsName.min_id" :key="eventsindex">{{eventsName.min_name}}</el-checkbox>
												</el-checkbox-group>
											</template>
										</div>
									</div>
								</div>
								</div>
								<div class="events_right fl">
								<p class="right_tit">小项确认</p>
								<div class="right_num clearfix">
									<p class="right_txt fl">10项内免费，已选<span class="cy">{{curSelectedSmallList.length}}</span>项</p>
									<p class="right_btn fr" @click="resetEvent">重置</p>
								</div>
								<div class="right_list">
									<ul>
										<li v-for="events in curSelectedSmallList" style="text-align:left" class="mb10">
											<i class="el-icon-circle-close" @click="moveSmall(events.min_id)"></i>
											{{events.min_name}}
										</li>
									</ul>
									<div class="add_cost">
										<p>加项费用(元）
											<el-tooltip placement="top-end" width="140" trigger="hover" popper-class="smallFeePopover" :disabled="curSelectedSmallList.length<11" v-model="showMoreSmallTip">
				                <p slot="content" class="smallFee">已超出{{curSelectedSmallList.length-10}}个小项<br>追加费用{{niceMinPrice}}x{{curSelectedSmallList.length-10}}元</p>
											  <span class="cy">￥{{curSelectedSmallList.length && curSelectedSmallList.length>10 ? (curSelectedSmallList.length-10)*niceMinPrice : '0'}}.00</span>
				              </el-tooltip>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="footer_inform">
							<p>通过率反馈：<!-- <span>(该信息用户不可见)</span> --></p>
							<el-form ref="ruleForm" :inline="true" auto-complete="off" label-width="110px">
					      <el-form-item class="percentage_txt" label="注册通过率" style="width:53%">
					        <input type="text" v-model="info.register_pass_rate" name="exchangeamount" id="exchangeamount" size="5" maxlength="3" @blur="check_register_pass_rate(info)"/>
					        <p class="percentage">%</p>
					        <span class="prompt">限1-100之间</span>
					      </el-form-item>

					      <el-form-item class="addAddress" label="在先近似商标" style="width:53%">
					        <el-input type="textarea" v-model="info.similar_trademark" :autosize="{ minRows: 4, maxRows: 6}" size="small" placeholder="请填写在先近似商标信息" :maxlength="200" @blur="check_register_pass_similar(info.similar_trademark)"></el-input>
					      </el-form-item>

					      <el-form-item class="addAddress" label="风险说明及注册建议" style="width:53%">
					        <el-input type="textarea" v-model="info.risk_desc_register_advice" :autosize="{ minRows: 4, maxRows: 6}" size="small" placeholder="请填风险信息，如商标的显著性、近似商标情况，并提供注册建议。" :maxlength="200" @blur="check_register_pass_risk(info.risk_desc_register_advice)"></el-input>
					      </el-form-item>
					      <el-form-item label="材料评审报告" style="width:53%">
					      	<div class="upload_component">
					      		<uploader @complete="setUploadedDataMaterialReport" @resetUploader="resetMaterialReportUploader" :fileName="audit_material_report_name" :postAction="'iprp_servicer/api/file/uploadAudit'" :url.sync="info.audit_material_report" :valueName="'audit_material_report'" :size="5" :extensions="'pdf'" :indexkey="$draftIndex"></uploader>
					      		<div class="upload_tip">
					      			<p class="format">格式说明：仅支持PDF格式文件且大小限制在5M以内</p>
					      		</div>
					      	</div>
					      </el-form-item>

					    </el-form>
						</div>
					</div>

					<a href="#" class="del" :class="{disabled: draftInfo && draftInfo.length == 1}" @click.prevent="askDelete($draftIndex)">删除</a>
				</div>
    	</div>
    </div>

    <!-- 委托书信息 -->
    <div class="entrustInfo" v-if="!loading && through_state==2">
	    <p class="mb20">委托书信息</p>
			<el-form class="basic_info" ref="tmForm" :model="proxy_info" :rules="tmFormRules" :inline="true" auto-complete="off" label-width="100px" v-if="!loading">
				<el-form-item class="addAddress" label="商标名称" prop="trademark_name" style="width:53%">
	        <el-input type="text" v-model="proxy_info.trademark_name" placeholder="请填写商标名称" :maxlength="40"></el-input>
	      </el-form-item>
				<el-form-item class="addAddress" label="服务商名称" prop="service_name" style="width:53%">
	        <el-input type="text" v-model="proxy_info.service_name" placeholder="请填写服务商名称" :maxlength="40"></el-input>
	      </el-form-item>
	      <el-form-item class="addAddress" label="联系人姓名" prop="contact_name" style="width:53%">
	        <el-input type="text" v-model="proxy_info.contact_name" placeholder="请填写联系人姓名" :maxlength="20"></el-input>
	      </el-form-item>
	      <el-form-item class="addAddress" label="联系人电话" prop="contact_phone" style="width:53%">
	        <el-input type="text" v-model="proxy_info.contact_phone" placeholder="请填写联系人电话" :maxlength="13"></el-input>
	      </el-form-item>
	      <el-form-item class="addAddress" label="委托地址" prop="proxy_address" style="width:53%">
	        <el-input type="text" v-model="proxy_info.proxy_address" placeholder="请填写委托地址" :maxlength="80"></el-input>
	      </el-form-item>
	      <el-form-item class="addAddress" label="邮政编码" prop="zip_code" style="width:53%">
	        <el-input type="text" v-model="proxy_info.zip_code" placeholder="请填邮政编码" :maxlength="6"></el-input>
	      </el-form-item>
	      <el-form-item label="上传委托书" style="width:53%" required>
	      	<div class="upload_component">
	      		<uploader @complete="setUploadedDataProxy" @resetUploader="resetUploader" :fileName="standby3_name" :postAction="'iprp_servicer/api/file/uploadAudit'" :url="standby3" :valueName="'standby3'" :size="5" :extensions="'pdf'"></uploader>
	      		<div class="upload_tip">
	      			<p class="autofill" @click="autoFillProxyT">自动生成委托书</p>
	      			<!-- <p>被委托单位：{{userinfo.entrustedUnit}}</p> -->
	      			<p class="format">格式说明：仅支持PDF格式文件且大小限制在5M以内</p>
	      			<p v-if="standby3" style="padding-top:8px;"><a :href="standby3" target="_blank"><img src="~assets/img/action-icon.png" alt="">下载委托书</a></p>
	      		</div>
	      	</div>
	    		<!--
	    		<p class="updown mt10">
	    			<label class="download" @click.prevent="download"><img src="~assets/img/action-icon.png" alt="">下载委托书模板</label>
					</p>
					 -->
	      </el-form-item>
				<el-form-item class="btn_wrap" label=" " style="width:53%;">
	      	<button class="reset" @click.prevent="resetForm">重置</button>
	      </el-form-item>
	    </el-form>
    </div>


    <div class="confirm_btn clearfix" :class="{pos_bt:through_state==3}" v-if="!loading">
			<p class="fl ml10 mr10" @click="prev">上一步</p>
			<p class="fl btn_bg" @click="checkAndConfirm">提交</p>
		</div>

		<el-dialog title="提示"
		  :visible.sync="dialogVisible" class="state_preview" :modal-append-to-body="true" :lock-scroll="false">
			<div class="confirm_tip">
		  	<p>更换商标类别将重置已选小项，确定更换？</p>
		  	<a href="" class="button no" @click.prevent="dialogVisible = false">取消</a><a href="" class="button yes" @click.prevent="changeBig()">确定</a>
		  </div>
		</el-dialog>
		<!-- 删除前确认 -->
    <el-dialog title="提示" :visible.sync="confirmVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="state_preview" top="40%">
		  <div class="confirm_tip">
		  	<p>确定删除该商标类别？</p>
		  	<a href="" class="button no" @click.prevent="confirmVisible=false">取消</a><a href="" class="button yes" @click.prevent="deleteBig()">确定</a>
		  </div>
		</el-dialog>

		<!-- 不通过提交前确认 -->
    <el-dialog title="提示" :visible.sync="submitConfirmVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="state_preview" top="40%">
		  <div class="confirm_tip">
		  	<p>材料评审结果提交后不可修改，确定提交？</p>
		  	<a href="" class="button no" @click.prevent="submitConfirmVisible=false">取消</a><a href="" class="button yes" @click.prevent="commitResult">确定</a>
		  </div>
		</el-dialog>

		<!-- 通过时提交前确认 -->
    <el-dialog title="提示" :visible.sync="submitConfirmVisible2" :close-on-click-modal="false" :close-on-press-escape="false" class="state_preview sub_confirm" top="40%">
		  <div class="confirm_tip2">
		  	<p>您的国内商标注册材料反馈如下，确定提交？</p>
		  	<table>
		  		<tr>
		  			<th>商标类数</th><th>小项总数</th><th>费用</th>
		  		</tr>
		  		<tr>
		  			<td>{{tmAllData.length}}</td><td>{{tmAllData.allnum}}</td><td>{{tmAllData.fee+'.00'}}</td>
		  		</tr>
		  	</table>
		  	<a v-if="tmConfirmBookUrl" :href="tmConfirmBookUrl" target="_blank" class="tm_confirm">点击下载商标确认书</a>
		  	<div v-if="tmConfirmBookUrl" class="tip" style="margin-bottom: 10px;">商标注册实际费用请以客户支付金额为准</div>
		  	<a v-if="tmContractUrl" :href="tmContractUrl" target="_blank" class="tm_confirm">点击下载合同书</a>
		  	<div v-if="tmContractUrl" class="tip" style="margin-bottom:0">注册服务合同以实际签署合同为准</div>
		  	<el-button size="small" href="" class="mt20" @click.prevent="submitConfirmVisible2=false">取消</el-button><el-button size="small" type="primary" href="" class="mt20" @click.prevent="commitResult">确定</el-button>
		  </div>
		</el-dialog>

		<!-- 请选择商标类别 -->
    <el-dialog title="请选择商标类别" v-if="bigClassVisible" :visible.sync="bigClassVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="confirmD bigClassSelect" top="50%">
			<div class="bigClasses">
				<el-checkbox-group v-model="checkedBigList">
					<ul>
						<li v-for="(item, idx) in bigState" key="idx"><el-checkbox :label="item.class_id" :disabled="allSelectedBigData.indexOf(idx+1) != -1">{{idx+1 < 10 ? '0' + (idx+1) : (idx+1)}}{{item.class_govern_name}}</el-checkbox></li>
					</ul>
				</el-checkbox-group>
			</div>
		  <div class="confirm_tip">
		  	<a href="" class="button no" @click.prevent="bigClassVisible=false">取消</a><a href="" class="button yes" @click.prevent="addBig()">确定</a>
		  </div>
		</el-dialog>


		<!-- 查看客户提交的商标注册信息 -->
    <el-dialog title="查看客户提交的商标注册信息" v-if="customerInfoVisible" :visible.sync="customerInfoVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="confirmD bigClassSelect customerInfo" top="50%">
			<div class="customer_info_table" v-loading="customer_info_loading">
				<table class="result_type">
	        <thead>
	          <tr class="thead">
	          	<th>序号</th>
	            <th class="minWidth">商标类别</th>
	            <th class="minWidth">小项信息</th>
	          </tr>
	        </thead>
	        <tbody class="tr-color">
	          <tr v-for="(item, index) in customerInfoList" v-show="!loading && customerInfoList.length">
	            <td>{{item.number}}</td>
	            <td>{{item.class_name}}</td>
	            <td><p>{{item.min_info}}</p></td>
	          </tr>
	          <tr class="empty" v-show="!loading && !customerInfoList.length">
	            <td colspan="11" class="norecord">
	              <div class="empty_ic"><span>暂无信息</span></div>
	            </td>
	          </tr>
	        </tbody>
		    </table>
			</div>
		  <div class="confirm_tip">
		  	<el-button size="small" class="ml10 mr10" href="" @click.prevent="customerInfoVisible=false">取消</el-button><el-button size="small" type="primary" href=""  class="ml10 mr10" @click.prevent="fastFill()">一键填充</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import $ from 'jquery'
	import VueCookie from 'vue-cookie'
	import {store} from 'utils/';
	import uploader from 'cps/uploader/uploader.vue'
	import Clipboard from 'clipboard';
	const rootUrl = CONFIG.rootUrl;
	const userUrl = CONFIG.userUrl;
	const niceUrl= './api/getNiceClass';
	const niceEventsUrl = './api/getCxbNiceGroupByClassId';
	const InfoUrl = './api/info_confirm_query';
  const submitUrl = './api/throughRateCxbWorkOrder';
  const downProxyTemplateUrl = './api/downProxyTemplate';
  const customerTypeUrl = './api/findCustomerType'; //获取客户类型信息
  const createClassUrl = '/iprp_servicer/api/createClassLink';  //生成小项推荐链接
  const findWorkOrderNiceConfirmUrl = './api/findWorkOrderNiceConfirm'; //服务商查看确认注册信息
  const preCustomerUrl = userUrl + '/iprp/#/feedback';
  const getTmConfirmBookUrl = './api/autoCreateConfirm'; //生成商标确认书链接
  const getTmContractUrl =  './api/downCXBContractTemplate';//生成商标合同书链接
	export default {
  	components: {
  		uploader
    },
    data() {
      return {
      	rootUrl: rootUrl,
      	textareaV:'',//小项剪切板文本框数据
      	showMinClipboard: false, //小项剪切板
      	copyed: false,
      	clipboard: '', //生成小项链接按钮
      	tmContractUrl: '',//合同书链接地址
      	tmConfirmBookUrl:'', //商标确认书链接地址
      	tmAllData:{}, //大类小项的汇总数据
      	needShowCusType: false, //是否需要显示客户类型
      	userConfirmed: false, //用户是否确认
      	customer_info_loading: false,
      	customer_type_loading: false,
      	customerUrl: '',
      	customerInfoVisible: false,
      	selCustomerTypeList:[], // 选中的客户类型
      	customerTypeData: [], //客户类型信息
				customerInfoList:[], //用户确认的商标注册信息
      	orignBigsData: {}, // 保存原有的大类
      	through_state:2, // 通过2，不通过3
      	checkedBigList:[],
      	bigClassVisible: false,
      	confirmVisible: false,
      	submitConfirmVisible: false,
      	submitConfirmVisible2: false,
      	timer: null,
      	showMoreSmallTip: false,
      	userinfo: store.get('userinfo'),
      	reffer:1,
      	resultData: {"not_pass_reason": null},
      	// 总体输入内容
      	proxy_info:{
      		"trademark_name": '',
      		"service_name": '杭州拾贝知识产权服务有限公司',
					"contact_name": '',
					"contact_phone": '0571-28253800',
					"proxy_address": null,
					"zip_code": '310000',
					"proxy":null
      	},
      	resultFormRules:{
      		not_pass_reason:[
      			{ required: true, message: '请输入不通过原因', trigger: 'blur' }
      		]
      	},
      	tmFormRules:{
      		trademark_name:[
						{ required: true, message: '请输入商标名称', trigger: 'blur' }
					],
					service_name:[
						{ required: true, message: '请输入服务商名称', trigger: 'blur' }
					],
					contact_name: [
						{ required: true, message: '请输入联系人姓名', trigger: 'blur' }
					],
					contact_phone: [
						{ required: true, message: '请输入联系电话', trigger: 'blur' },
						{ pattern: /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/, message: '请填写正确的手机号码，固话前请加区号和-', trigger: 'blur' }
					],
					proxy_address: [
						{ required: true, message: '请输入委托地址', trigger: 'blur' }
					],
					zip_code: [
						{ required: true, message: '请输入邮政编码', trigger: 'blur' },
						{ pattern: /^[0-9]{6}$/, message: '请输入6位数字', trigger: 'blur' },
					]
      	},
        confirm_step:'',
        work_order_id:'',
        work_order_sn:'',
      	// 上传图片地址
      	imgUrl:'',
      	loading:false,
        standby3:'',
        standby3_name:'',
        audit_material_report:'',
        audit_material_report_name:'',
      	// 查询的草稿信息 work_order_service
      	draftInfo:[],
      	// 当前展开的服务单的索引
      	draftIndex:'',
      	dialogVisible:false,

      	// 当前选中的小项id列表
      	curSelectedSmallIdList:[],
      	// 当前选中的小项列表[{}]
      	curSelectedSmallList: [],
      	// 搜索小项
      	searchEvents:'',
      	// 提交时候的所有内容
      	results:[],
      	// 所有选中的小项和分类
      	allEvents: {
          work_order_id:'',
          confirm_step:3
        },
      	// 是否选中
      	selectedState:true,
      	//当前选中的大项的索引，index这儿是个极差的命名，
      	index:'',
      	//当前服务单对应的index
      	serviceIndex:'',
      	// 查询到的小项
      	niceEventsData:{},
      	// 小项加载loading
      	smallLoading: false,
      	//该商标下所有服务单信息
      	work_order_service_list:[],
      	// 查询出的大类
      	bigState:[],
      	// 当前选中的大类
      	selectedBigItem:{},
      	// 当前临时选中的大类,用于二次确认
      	tempSelectedBigItem:{},
      	// 模糊查询的结果
      	FuzzyQueryData:[],
      	// 各服务单已选中的大类
      	allSelectedBigData:[],
      	// 当前选中的服务单数据
      	curOrderInfo:{},
      	isSubmit: false,
      	readTimer:'',
      	niceMinPrice:30//小项超出费用
      }
    },
    methods: {
    	// 模糊查询
      getMatchMin(str){
      	var self = this;
      	var arr = [];
      	if (!str) {return arr;}
      	for(var i=0;i<self.niceEventsData.length;i++){
      		for(var h=0;h<self.niceEventsData[i].min_data.length;h++){
      			var min_name = self.niceEventsData[i].min_data[h].min_name
      			if(min_name == str){
      				arr.push(self.niceEventsData[i].min_data[h].min_id);
      				break;
      			}
      		}
      	}
      	return arr;
      },
    	fillMin(){
    		if (!this.textareaV.trim()) {
    			this.$message.warning('请粘贴您所需的小项信息，小项间使用中文逗号区分。');
    			return;
    		}
    		let arr = this.textareaV.split('，');
    		let tempArr = [];
    		let sArr = [];
    		arr.forEach((str) => {
    			let t = this.getMatchMin(str);
    			if (!t.length) {
    				sArr.push(str);
    			}else{
    				tempArr = tempArr.concat(t);
    			}
    		});
    		let curSelectedSmallIdList = Array.from(new Set([...this.curSelectedSmallIdList, ...tempArr]));
    		this.selectSmallChange(curSelectedSmallIdList);
    		this.curSelectedSmallIdList = curSelectedSmallIdList;
    		if (sArr.length) {
    			this.$alert('添加成功'+(arr.length-sArr.length) +'项，'+ sArr.length +'项未能正确匹配，请检查：'+ sArr.join(), '提示');
    		}else{
    			this.$message.success('全部添加成功！');
    			this.textareaV = '';
    		}
    	},
    	//复制url
    	copyUrl(){
    		//this.creatUrl();
    	},
    	//生成小项推荐链接
    	creatUrl(cb){
    		if (this.userConfirmed) {
    			return;
    		}
    		let arr = this.draftInfo || [];
    		/*this.draftInfo.forEach((item) => {
    			arr.push({
    				classId: item.class_id,
    				className: item.class_name,
    				recommend: item.recommend || false,
    			});
    		});*/
    		if (this.copyed) {
    			return;
    		}
    		this.copyed = true;
    		var self = this;
    		//使用jquery ajax的同步方式
    		$.ajax({
    			url: createClassUrl+ '?access_token=' + VueCookie.get('service_token'),
    			type: 'post',
    			dataType: 'html',
    			contentType: 'application/json',
    			data: JSON.stringify({
	    			work_order_id: this.work_order_id,
	    			class_info: arr
	    		}),
	    		async: false,
	    		success: function(res){
	    			self.copyed = false;
	    			self.customerUrl = preCustomerUrl + res;
	    		},
	    		error: function(err){
	    			self.copyed = false;
	    		}
    		})
    		/*this.$http.post(createClassUrl, {
    			work_order_id: this.work_order_id,
    			classInfo: arr
    		})
    		.then((resp) => {
    			this.copyed = false;
    			this.customerUrl = preCustomerUrl + resp.data;
    			cb && cb(this.customerUrl);
    			resolve(this.customerUrl);
	      })
	      .catch((error) => {
	      	this.copyed = false;
	      	reject(error);
	      });*/
    	},
    	// 查看用户确认的商标信息
    	viewConfirmInfo(){
    		this.customerInfoVisible = true;
    		this.customer_info_loading = true;
    		this.$http.get(findWorkOrderNiceConfirmUrl + '?work_order_id=' + this.work_order_id)
    		.then((resp) => {
    			this.customer_info_loading = false;
    			this.customerInfoList = resp.data.work_order_service;
	      })
	      .catch((error) => {
	      	this.customer_info_loading = false;
	      });
    	},
    	// 一键填充用户确认的小项信息
    	fastFill(){
    		this.customerInfoList.forEach((item, idx) => {
    			let ret = this.draftInfo.some((it, index) => {
    				if (item.class_id === it.class_id) {
    					it.service_nice_min = item.service_nice_min;
    					return true;
    				}
    			});
    			if (!ret) {
						let data = {
							recommend:true,
							PackUp:true,
					    id: '',
					    order_sn: '',
					    similar_trademark: '',
					    register_pass_rate: '',
					    risk_desc_register_advice: '',
					    audit_material_report: '',
					    addition_fee: 0,
					    min_number: item.service_nice_min.length,
					    class_name: item.class_name,
					    class_id: item.class_id,
					    service_nice_min: item.service_nice_min
						};
						// 如果在原有的大类数据中，则不打推荐标志
						this.orignBigsData.forEach((it, idx) => {
							if (it.class_id == item.class_id) {
								data.recommend = false;
								data.id = it.id;
								data.isAsistantremarks = it.isAsistantremarks;
								data.order_sn = it.order_sn;
							}
						});
						this.allSelectedBigData.push(item.class_id);
		    		this.draftInfo.push(data);
    			}
    		});
    		if (this.draftInfo[this.draftIndex]) {
    			this.curSelectedSmallList = this.draftInfo[this.draftIndex].service_nice_min;
    		}
    		this.curSelectedSmallIdList = this.getSmallIdList();
    		this.customerInfoVisible = false;
    		this.$message.success('填充成功')
    	},
    	//选择客户类型
    	customerTypeChange(){},
    	getCustomerType(){
    		this.customer_type_loading = true;
    		this.$http.get(customerTypeUrl)
    		.then((resp) => {
    			this.customer_type_loading = false;
    			this.customerTypeData = resp.data || []
	      })
	      .catch((error) => {
	      	this.customer_type_loading = false;
	      });
    	},
    	//判断所有字段是否都填写完整
    	hasSomething(info){
    		return info.service_nice_min && info.service_nice_min.length || info.similar_trademark || info.register_pass_rate || info.risk_desc_register_advice || info.audit_material_report
    	},
    	//添加大类
    	addBig(){
				var arr = [];
				this.checkedBigList.forEach((item, index) => {
					var data = {
						recommend: true,
						PackUp: true,
				    id: '',
				    order_sn: '',
				    similar_trademark: '',
				    register_pass_rate: '',
				    risk_desc_register_advice: '',
				    audit_material_report: '',
				    addition_fee: 0,
				    min_number: 0,
				    class_name: '',
				    class_id: '',
				    service_nice_min: []
					};
					data.class_id = item;
					data.class_name = '第'+ (item < 10 ? '0' + item : item) + '类-' + this.bigState[item-1].class_govern_name;
					this.allSelectedBigData.push(item);
					// 如果在原有的大类数据中，则不打推荐标志
					this.orignBigsData.forEach((it, idx) => {
						if (it.class_id == item) {
							data.recommend = false;
							data.id = it.id;
							data.isAsistantremarks = it.isAsistantremarks;
							data.order_sn = it.order_sn;
						}
					});
					arr.push(data);
				});
    		this.draftInfo = this.draftInfo.concat(arr);
    		this.checkedBigList = [];
    		this.bigClassVisible = false;
    		//重新生成url
    		//this.creatUrl();
    	},
    	//删除二次确认
    	askDelete(index){
    		if (this.draftInfo.length === 1) {
    			return;
    		}
    		//收缩展开的大类
    		if (this.draftInfo[index].PackUp) {
	    		this.draftInfo.forEach((item) => {
	    			item.PackUp = true;
	    		})
    		}
    		this.confirmVisible = true;
    		this.draftIndex = index;
    	},
    	deleteBig(){
    		// 删除黑名单中的大类id
    		var curItem = this.draftInfo[this.draftIndex];
    		var allSelectedBigData = this.allSelectedBigData;
    		var idx = allSelectedBigData.indexOf(curItem.class_id);
    		if (idx !== -1) {
    			allSelectedBigData.splice(idx, 1);
    		}
    		this.draftInfo.splice(this.draftIndex, 1);
    		this.confirmVisible = false;
    		//重新生成url
    		//this.creatUrl();
    	},
    	check_register_pass_rate(info){
    		var reg = /^([0-9]|[0-9]\d|100)$/;
    		var txt = info.register_pass_rate;
    		if (txt) {
    			txt = txt.replace('.', '');
    		}
    		if (!reg.test(txt)) {
    			this.$message.error('注册通过率限0-100之间');
    			info.register_pass_rate = ''
    		}else{
    			info.register_pass_rate = txt;
    		}
    	},
    	check_register_pass_risk(info){
    		if(!info){
    			this.$message.error('请输入风险信息及建议');
    		}
    	},
    	check_register_pass_similar(info){
    		if(!info){
    			this.$message.error('请输入在先近似商标');
    		}
    	},
    	resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
			},
    	resetForm(){
    		this.proxy_info = {
    			"trademark_name": this.proxy_info.trademark_name,
      		"service_name": null,
					"contact_name": null,
					"contact_phone": null,
					"proxy_address": null,
					"zip_code": null,
					"proxy":null
      	},
    		this.standby3 = '';
    		this.standby3_name = '';
    	},
    	uploaderErrCallback(data){
    		this.$alert(data.msg);
    	},
      // 上传图片部分
    	setUploadedDataBlack(data){
    		var d = data.data;
    		if (d.url) {
	    		this[data.valueName]= d.url;
	    		this[data.valueName+'_name']= d.fileName;
	    		this.trademarkData.black_white_pic_url = d.url;
    		}else{
    			this.uploaderErrCallback(d);
    		}
    	},
      setUploadedDataSpecify(data){
      	var d = data.data;
    		if (d.url) {
    			this[data.valueName]= d.url;
    			this[data.valueName+'_name']= d.fileName;
        	this.trademarkData.specify_pic_url = d.url;
        }else{
    			this.uploaderErrCallback(d);
    		}
      },
      //上传委托书
      setUploadedDataProxy(data){
      	var d = data.data;
    		if (d.url) {
    			this[data.valueName]= d.url;
    			this[data.valueName+'_name']= d.fileName;
        	this.proxy_info.proxy = d.url;
        }else{
    			this.uploaderErrCallback(d);
    		}
      },
      //上传材料评审报告
      setUploadedDataMaterialReport(data){
      	this.draftIndex = data.indexkey;
      	var d = data.data;
    		if (d.url) {
    			// this.draftInfo[index][data.valueName]= d.url;
    			// this.draftInfo[this.draftIndex][data.valueName+'_name']= d.fileName;
    			let obj = this.draftInfo[this.draftIndex];
	      	obj.audit_material_report = d.url;
	      	this.$set(this.draftInfo, this.draftIndex, obj);
        	//this.draftInfo[this.draftIndex].audit_material_report = d.url;
        }else{
    			this.uploaderErrCallback(d);
    		}
      },

      resetMaterialReportUploader(valueName, index){
      	this.draftIndex = index;
      	let obj = this.draftInfo[this.draftIndex];
      	obj[valueName] = '';
      	obj[valueName+'_name'] = '';
      	this.$set(this.draftInfo, index, obj);
			},

      // 搜索框初始化
    	blurclick(){
    		setTimeout(()=>{
    			this.FuzzyQueryData = [];
    			this.searchEvents = '';
    		},200);
    	},
    	// 获取尼斯分类
    	obtainNice(){
    		var self = this;
    		self.$http.get(niceUrl+"?pg_count=45").then(function(resp){
          self.bigState = resp.data.elements;
	      })
	      .catch((error) => {
	      });
    	},
    	// 获取草稿信息
    	info(){
    		var self = this;
    		self.loading = true;
    		this.$http.get(InfoUrl, {
					params: {
						work_order_sn: this.work_order_sn,
						confirm_step: this.confirm_step,
						is_submit: this.$route.query.is_submit,
					}
				})
    		.then(function(resp){
    			self.loading = false;
    			for(var i=0;i<resp.data.work_order_service.length;i++){
    				resp.data.work_order_service[i].PackUp = true;
    			}
    			self.niceMinPrice = resp.data.niceMinPrice;
    			self.allEvents = resp.data;
          // 输入框部分内容
    			self.trademarkData = resp.data.trademark;
    			self.trademarkData.pic_type = self.trademarkData.pic_type ? self.trademarkData.pic_type + '' : '1';
    			self.standby3 = self.trademarkData.proxy_url;
    			self.standby3_name = self.trademarkData.proxy_file_name;

    			resp.data.work_order_service.forEach((item, idx) => {
    				item.audit_material_report = '';
    			});

    			self.work_order_id = resp.data.work_order_id;

    			//获取本地大类的数据
    			var saveDraft = localStorage.getItem(self.work_order_id);
    			saveDraft = saveDraft && JSON.parse(saveDraft);

    			//服务单部分
    			self.draftInfo = saveDraft && saveDraft.length ?  saveDraft : resp.data.work_order_service;
    			//存储原有的大类
    			self.orignBigsData = JSON.parse(JSON.stringify(resp.data.work_order_service));

    			self.proxy_info.contact_name = resp.data.trademark_contact && resp.data.trademark_contact.contact_name;
    			self.proxy_info.trademark_name = resp.data.trademark.trademark_name;

    			//选中的大类id list
    			self.allSelectedBigData = (function(){
    				var arr = [];
    				self.draftInfo.forEach((item, index) => {
    					arr.push(item.class_id);
    				});
    				return arr;
    			})();

    			// 获取客户类型
    			self.needShowCusType = resp.data.needShowCusType;
    			if (resp.data.needShowCusType) {
    				self.getCustomerType();
    			}

    			self.userConfirmed = resp.data.userConfirmed;
    			//生成小项推荐链接
    			//self.creatUrl();
	      })
	      .catch((err) => {
	      	self.loading = false;
	        if (err && err.msg) {
						this.$message.error(err.msg);
					}
	      });
    	},
    	// 材料评审提交
    	commitResult(){
        var self = this;
        var data = {};
        if (this.isSubmit) {
        	return;
        }
        this.isSubmit = true;
        if (this.through_state === 3) {
        	data = {
						confirm_step: 3,
						draft_state: 1,
						work_order_id: self.work_order_id,
						through_state: this.through_state,
						not_pass_reason: self.resultData.not_pass_reason
					}
        }else{
	        self.allEvents.proxy_info = self.proxy_info;
	        //如果商标名称有修改，也要同步修改商标信息中的商标名称字段
	        self.allEvents.trademark.trademark_name = self.proxy_info.trademark_name;
	        self.allEvents.through_state = 2;
	        self.allEvents.draft_state = 1;
	        self.allEvents.work_order_id = self.work_order_id;
	        self.allEvents.work_order_service = self.draftInfo;
	        data = self.allEvents;

	        let idsArr = [];
	        let nameArr = [];
	        this.selCustomerTypeList.forEach((item) => {
	        	if (item.customer_type_id) {
	        		nameArr.push(item.name);
	        		idsArr.push(item.customer_type_id);
	        	}
	        })
	        data.customer_type_id = idsArr.join();
	        data.customer_type_name = nameArr.join();
        }
        this.$http.post(submitUrl , data)
        .then((resp) => {
        	this.isSubmit = false;
        	var data = resp.data;
        	if (data.status > 200 && data.msg) {
        		self.$message.error(data.msg);
        		return;
        	}
        	self.clearAutoSave();
        	self.$message.success('提交成功！');
    			self.$router.push({name: "clientServiceListCXB"});
        })
        .catch((err) => {
        	this.isSubmit = false;
        	if (err && err.msg) {
						this.$message.error(err.msg);
					}
        });
    	},
    	// 打开当前列表
    	openCurOrder(orderindex, info){
    		var self = this;
    		this.showMinClipboard = false;
        self.draftIndex = orderindex;

        //展开当前的
        var draftInfo = self.draftInfo;
        draftInfo.forEach((it, index) => {
        	it.PackUp = true;//true为折叠
        })
    		info.PackUp = false;

    		// 设置当前选中的大类
    		self.selectedBigItem = info.class_id ? self.bigState[info.class_id-1] : {}
    		self.index = info.class_id || '';

    		self.curOrderInfo = info;

    		//右侧选中的小项
        self.curSelectedSmallList = info.service_nice_min || [];
        self.curSelectedSmallIdList = self.getSmallIdList();

        //如果有大类，则查询小项
        if (info.class_id) {
        	self.niceEvents(info.class_id);
        }
    	},
    	// 保存，初始化
    	closeCurOrder(item){
        // this.draftIndex = '';
        item.PackUp = true;
    	},

    	// 删除选中的小项
    	moveSmall(min_id){
    		var self = this;
    		var curSelectedSmallList = self.curSelectedSmallList;
    		var curSelectedSmallIdList = self.curSelectedSmallIdList;
    		var copy = [].concat(curSelectedSmallList);
    		var copy1 = [].concat(curSelectedSmallIdList);
    		for(var i=0; i<copy.length; i++) {
    			var small = copy[i];
			    if(small.min_id == min_id) {
            // 右侧选中的小项
			      curSelectedSmallList.splice(i,1);
			      break;
			    }
			  }
			  for(var j=0; j<copy1.length; j++) {
    			var id = copy1[j];
			    if(id == min_id) {
            // 左侧选中的小项
			      curSelectedSmallIdList.splice(j,1);
			      break;
			    }
			  }
			  this.showMoreSmallTip = curSelectedSmallList.length>10;
			  this.hideMoreSmallTip();
    	},
    	// 重置选中的小项
    	resetEvent(data){
    		this.curSelectedSmallList = [];
    		this.curSelectedSmallIdList = [];
    		this.curOrderInfo.service_nice_min = [];
    	},
    	// 点击选中查询的内容
    	FuzzyQueryClick(id){
    		var curSelectedSmallIdList = this.curSelectedSmallIdList;
    		if (curSelectedSmallIdList.indexOf(id) === -1) {
    			curSelectedSmallIdList.push(id);
    		}else{
    			this.$message('该小项已添加');
    		}
    		this.selectSmallChange(curSelectedSmallIdList);
    		this.FuzzyQueryData = [];
    		this.searchEvents = '';
    	},
    	// 根据右侧小项的数据，获得左侧选中的数据
    	getSmallIdList(){
    		var curSelectedSmallList = this.curSelectedSmallList;
    		var arr = [];
    		curSelectedSmallList.forEach((item, i) => {
    			if (item.min_id) {
    				arr.push(item.min_id);
    			}
    		});
    		return arr;
    	},
    	// 根据小项id,从大类下所有小项数据中取得单条小项数据
    	getSmallItem(id){
    		var niceEventsData = this.niceEventsData;
    		var ret = {
					class_id:'',
					group_id:'',
					min_id:'',
					min_name:'',
					ali_id:'',
					cxb_id: ''
				};
    		niceEventsData.some((item, i) => {
    			var min_data = item.min_data;
    			min_data.some((it, j) => {
    				if (it.min_id == id) {
    					Object.keys(ret).forEach((name) => {
    						ret[name] = it[name];
    					});
    					return true;
    				}
    			});
    			if (ret.min_id) {return true;}
    		});
    		if (!ret.min_id) {
    			ret = ''
    		}
    		return ret;
    	},
      // 点击左侧小项触发
    	selectSmallChange(idList){
      	var self = this;
      	var niceEventsData = this.niceEventsData;
      	this.curSelectedSmallList = (function(){
      		var arr = [];
      		idList.forEach((id, i) => {
      			var smallItem = self.getSmallItem(id);
      			if (smallItem) {
      				arr.push(smallItem);
      			}
      		});
      		return arr;
      	})();
      	this.curOrderInfo.service_nice_min = this.curSelectedSmallList;
      	this.showMoreSmallTip = this.curSelectedSmallList.length>10;
      	this.hideMoreSmallTip();
    	},
    	//点击45大类选中
    	selected(item){
        var self = this;
    		// 如果是当前的或禁用的，则直接返回
        if (self.index == item.class_id || self.isInAllSelectedBigData(item.class_id)) {
        	return;
        }
        // 如果有小项数据，给出提示
        if (self.curSelectedSmallList.length) {
        	self.tempSelectedBigItem = item;
        	self.dialogVisible = true;
        	return;
        }else{
        	// 没有小项数据则直接切换
        	// 先更新选中的大类Id LIST
        	self.updateAllSelectedBigData(self.index, item.class_id);
        	self.index = item.class_id;
	    		self.selectedBigItem = item;
	    		self.setSelectedInfo(item);
	    		//查询小项数据
        	self.niceEvents(item.class_id)
        }
    	},
    	//设置当前展开订单的大类名和id
    	setSelectedInfo(item){
    		this.curOrderInfo.class_name = item.class_name;
    		this.curOrderInfo.class_id = item.class_id;
    	},
    	//是否在已选中的大类集合中，用于判断是否禁用大类
    	isInAllSelectedBigData(bigNum){
    		return this.allSelectedBigData.indexOf(bigNum) === -1 ? false : true;
    	},
    	//切换大类后更新已选中的大类集合
    	updateAllSelectedBigData(oldBigNum, bigNum){
    		var allSelectedBigData = this.allSelectedBigData;
    		var idx = allSelectedBigData.indexOf(oldBigNum);
    		if (idx !== -1) {
    			allSelectedBigData.splice(idx, 1);
    		}
    		allSelectedBigData.push(bigNum);
    	},
    	// 查询小项
    	niceEvents(class_id){
    		var self = this;
    		self.smallLoading = true;
    		self.$http.get(niceEventsUrl+"/"+ class_id)
    		.then((resp) => {
    			self.smallLoading = false;
  				for(var i=0;i<resp.data.elements.length;i++){
            // 添加用来识别小项收缩和展开
  					resp.data.elements[i].shrinkage = false;
  				}
  				self.niceEventsData = resp.data.elements;
	      })
	      .catch((error) => {
	      	self.smallLoading = false;
	      });
    	},
    	// 确认后变更大类
    	changeBig(){
    		// 选中的小项初始化
    		this.resetEvent();
    		this.dialogVisible = false;
    		this.selected(this.tempSelectedBigItem);
    	},
      // 小项展开收缩切换
    	toggleSmallNav(item){
    		item.shrinkage = !item.shrinkage
    	},
    	//检查所有上传文件
    	checkUploadFile(){
    		if (this.needShowCusType && !this.selCustomerTypeList.length) {
          this.$message.warning('请选择客户类型');
          return false;
        }
	      if (!this.standby3) {
          this.$message.warning('请上传委托书');
          return false;
        }
    		return true;
    	},
    	//检查所有服务单
    	checkAllOrders(){
    		var ret = true;
    		var self = this;
    		var draftInfo = self.draftInfo;
    		for(var i=0;i<draftInfo.length;i++){
					var info = draftInfo[i];
          if(!info.class_id || (info.service_nice_min && !info.service_nice_min.length) || !info.similar_trademark || !info.register_pass_rate || !info.risk_desc_register_advice || !info.audit_material_report){
            self.$message({
              message: '请完善商标注册信息',
              type: 'warning'
            });
            ret = false;
            break;
          }
        }
        return ret;
    	},
			// 确认提交
      checkAndConfirm(){
      	// 不通过
      	if (this.through_state == 3) {
      		this.$refs['resultForm'].validate((valid) => {
	      		if (valid) {
	      			this.submitConfirmVisible = true;
	          } else {
	            console.log('error submit!!');
	          }
	        });
      	}else{ // 通过
	      	this.$refs['tmForm'].validate((valid) => {
	      		console.log(valid)
	      		if (valid && this.checkUploadFile() && this.checkAllOrders()) {
	      			this.submitConfirmVisible2 = true;
	      			this.getTmAllData();
	      			this.getTmConfirmBook();
	      			this.getTmContract();
	          } else {
	            console.log('error submit!!');
	          }
	        });
        }
      },
      // 获取商标小项总数据
      getTmAllData(){
      	var allnum = 0,
      			fee = 0;
      	let price = (this.allEvents.bs_price - 0) || 0;
      	this.draftInfo.forEach((item) => {
      		let nice_min = item.service_nice_min;
      		if (nice_min) {
      			let len = nice_min.length;
      			allnum += len;
      			if (len > 10) {
      				fee += (300+(len-10)*30);
      			}else{
      				fee += 300;
      			}
      			fee += price;
      		}
      	});
      	this.tmAllData = {
      		length: this.draftInfo.length,
      		allnum: allnum,
      		fee: fee
      	};
      },
      // 获取商标确认书链接
      getTmConfirmBook(){
      	this.$http.post(getTmConfirmBookUrl, {
      		work_order_id: this.work_order_id,
      		trademark: this.allEvents.trademark,
      		trademark_subject: this.allEvents.trademark_subject,
      		trademark_contact: this.allEvents.trademark_contact,
      		work_order_service: this.draftInfo
      	})
      	.then((resp) => {
      		var data = resp.data;
      		if (data.url) {
      			this.tmConfirmBookUrl = data.url;
      		}
      	})
      	.catch((err) => {
      		this.$message.error(err.msg);
      	});
      },
      // 获取商标合同书链接
      getTmContract(){
      	this.$http.post(getTmContractUrl, {
      		work_order_sn: this.work_order_sn,
      		trademark: this.allEvents.trademark,
      		trademark_subject: this.allEvents.trademark_subject,
      		trademark_contact: this.allEvents.trademark_contact,
      		work_order_service: this.draftInfo
      	})
      	.then((resp) => {
      		var data = resp.data;
      		if (data.url) {
      			this.tmContractUrl = data.url;
      		}
      	})
      	.catch((err) => {
      		this.$message.error(err.msg);
      	});
      },
      // 上一步
      prev(){
        this.$router.push({name: 'stepOneFD', query: Object.assign({}, this.$route.query, {confirm_step: 1})})
      },
      // 模糊查询
      DataFuzzyQuery(data){
      	var self = this;
      	data = data.toUpperCase();
      	self.FuzzyQueryData = [];
      	if (!data) {return;}
      	for(var i=0;i<self.niceEventsData.length;i++){
      		for(var h=0;h<self.niceEventsData[i].min_data.length;h++){
      			var min_name = self.niceEventsData[i].min_data[h].min_name;
      			var idx1 = min_name.indexOf(data);
      			var idx2 = min_name.indexOf(data.toLowerCase());
      			var index = idx1 != -1 ? idx1 : idx2 != -1 ? idx2 : -1;
      			if(index != -1){
      				var ret = Object.assign({}, self.niceEventsData[i].min_data[h]);
      				ret.min_name = min_name.slice(0, index) + '<b>'+ data + '</b>' + min_name.slice(index+data.length);
      				self.FuzzyQueryData.push(ret);
      				//console.log(self.FuzzyQueryData)
      				if(self.FuzzyQueryData.length>=30){
      					return false;
      				}
      			}
      		}
      	}
      },
      //自动生成委托书
      autoFillProxyT(){
      	this.$http.post(downProxyTemplateUrl, {
      		work_order_id: this.work_order_id,
      		is_submit: 2, //this.$route.query.is_submit,
      		proxy_info: this.proxy_info,
      		confirm_step:3,
      	})
      	.then((resp) => {
      		var data = resp.data;
      		if (data.url) {
      			this.standby3 = data.url;
	    			this.standby3_name = data.fileName;
	        	this.proxy_info.proxy = data.url;
      		}
      	})
      	.catch((err) => {
      		this.$message.error(err.msg);
      	});
      },
      hideMoreSmallTip(){
      	if (this.showMoreSmallTip) {
    			var timer = this.timer;
    			timer && clearTimeout(timer);
    			this.timer = setTimeout(() => {
    				this.showMoreSmallTip = false;
    			}, 3000)
    		}
      },
      autoSave(){
      	this.timer && clearInterval(this.timer);
      	this.timer = setInterval(() => {
      		localStorage.setItem(this.work_order_id, JSON.stringify(this.draftInfo));
      		//this.$message.success('自动保存成功！');
      	}, 5000);
      },
      stopAutoSave(){
      	this.timer && clearInterval(this.timer);
      },
      clearAutoSave(){
      	this.stopAutoSave();
      	localStorage.removeItem(this.work_order_id);
      },
    },
    beforeDestroy(){
      //需要主动销毁，不然会重复注册事件
      this.clipboard.destroy();
    },
    mounted() {
      this.confirm_step = this.$route.query.confirm_step;
      this.work_order_sn = this.$route.query.work_order_sn;
      //获取详情数据
    	this.info();
    	//获取45大类数据
    	this.obtainNice();
    	var self = this;
    	this.clipboard = new Clipboard('.creat_url', {
        text() {
        	self.creatUrl();
          return self.customerUrl;
        }
	    });
    	this.clipboard.on('success', (e) => {
	      this.$message({
	        message: '推荐链接已复制到剪切板',
	        type: 'success'
	      });
	    });

	    //自动存储大类小项数据
	    this.autoSave();
    }
  }
</script>
<style lang='less'>
	.steptwo_fill_cxb_f{padding:60px 60px;background-color:#fff;min-height: 500px;
		// 字体淡黄色
		.cy{color: #F5A623;}
    // msg color
    .msgColor{color: #F64744 !important;}
		// 上传图片
		.upload_component{position: relative;
			.upload_tip{
				position: absolute;left: 140px;bottom:0;width:220px;font-size: 12px;color: #556677;line-height: 16px;
				p.format{color: #A8AFB5;padding-top: 5px; }
				p.autofill{font-size: 14px;color: #479CFF;line-height: 19px;cursor: pointer;}
			}
		}
		.updown{font-size: 13px;color: #479CFF;width:110px;line-height:100%;cursor:pointer;
			.download{cursor: pointer;}
			img{vertical-align: top;}
		}
		.btn_wrap{
			button{font-size: 14px;color: #479CFF;border: 1px solid #479CFF;border-radius: 2px;line-height: 30px;margin-right: 10px;background-color:#fff;margin-left: 0;width:88px;}
      button:hover{border-color:#408CE6;color:#408CE6;}
		}
		label{text-align:left;}
		label.el-radio{width: 70px;}
		>p{font-size: 16px;color: #223344;}
		.fill_state{
			.customer_type_wrap{
				>p{
					font-size: 16px;color: #223344;
					span{font-size: 12px;color: #A8AFB5;}
				}
				.customer_type_list{
					padding:5px 0 15px;
					.single{
						h3{float:left; width: 140px;font-size: 14px;height: 20px;line-height: 1;color: #556677;margin-top:15px;font-weight: normal;}
						.typelist{
							float:left; width: 1010px;
							label{
								width: 120px;margin-top:15px;font-size: 13px;color: #556677;
								.el-checkbox__label,.el-checkbox__input{vertical-align: top;}
							}
							.el-checkbox__inner{top:1px;}
							.el-checkbox__input.is-checked .el-checkbox__inner {
						    background-color: #20a0ff!important;
						    border-color: #0190fe!important;
							}
						}
					}
				}
			}
			>p{font-size: 16px;color: #223344;}
			.tm_info_btn{
				padding:15px 0;
				button{height:30px;padding:0 15px;line-height:28px;border-radius: 2px;border: 1px solid #479CFF;color:#479CFF;font-size:13px;}
				.add_big{
					background: #479CFF;color: #fff;
					span{color:#fff;}
				}
				.creat_url{margin-left: 10px;}
			}
			.state{border: 1px solid #DFE2E5;padding:0px;margin-top: -1px;}
			.shadow{box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);background: #F9F9F9;}
			div.state_list{padding:22px 0 20px;position: relative;
				>p{font-size: 14px;color: #479CFF;cursor:pointer;margin-left: 58px;width:126px;}
				>img{
					position: absolute;top:22px;right:22px;width:26px;
					&:hover{cursor: pointer;}
				}
				.list_tit{padding:0 22px;
					>p{font-size: 14px;color: #556677;line-height:20px;text-align:left;}
					.serial{width:38px;}
					.order{width:128px;}
					.big_name{padding-left: 22px;}
					.isRecommend{background: transparent url(~assets/img/tmApplySubmit/jian.png) 0 0 no-repeat;}
				}
				// 详情
				ul{padding-left:58px;padding-right: 50px;
					li{
            // 数据为空，高亮
            .errNull{color: #F64744;}
						p{font-size: 13px;color: #7F8FA4;line-height:18px;}
						.state_name{width:128px;}
						.state_txt{width:82%;word-break: break-all;}
					}
				}
				// 小项
				.add{border-top:1px solid #DFE2E5;padding-top:20px;padding-right: 44px;margin-left: 58px;
					>p{
						font-size: 14px;color: #556677;font-weight: 600;
						span{font-size: 12px;color: #A8AFB5;font-weight: 400;}
					}
					ul{padding-left:0;padding-right:0;
						li{border: 1px solid #DFE2E5;border-radius: 2px;width:116px;height:30px;line-height:30px;text-align:center;font-size: 13px;color: #556677;cursor:pointer;background-color:#fff;}
						.click_li{border: 1px solid #479CFF;color: #479CFF;background: #F8FCFF;}
						.notChoose{background: #F5F5F5;color: #A8AFB5;cursor:text;}
					}
					// 小项选择
					.events{
						>div{border: 1px solid #DFE2E5;}
						.events_left{height:450px;width:72%;background-color:#fff;padding:20px;position: relative;
							.head{position: relative;
								.min_clip{height: 30px;line-height: 30px;font-size: 14px;color: #479CFF;cursor: pointer;}
								p{width:116px;height:30px;line-height:30px;border: 1px solid #479CFF;border-radius: 2px;font-size: 13px;color: #479CFF;text-align:center;display:inline-block;background: #F8FCFF;}
							}
							input{width:300px;height:30px;border: 1px solid #DFE2E5;border-radius: 2px;padding-left:30px;}
							.fuzzyqueryList{position: absolute;top:35px;right:0;max-height: 300px;overflow-y: auto;z-index: 10;width:300px;border-radius:3px;border:1px solid #DFE2E5;background-color: #fff;
								li{width:100%;border: 0;text-align:left;padding-left:10px;line-height:30px;font-size:13px;color:#556677;box-sizing: border-box;
									b{font-weight: normal;color:#F5A623;}
								}
								li:hover{background-color: #f5f5f5;}
							}
							button{background: #479CFF;border-radius: 2px;font-size: 14px;color: #FFFFFF;height:30px;line-height:30px;display:inline-block;width:60px;vertical-align: top;}
							img{width:14px;height:14px;position: absolute;right:278px;top:8px;}
							.min_lipboard_wrap{
								position: absolute;top: 68px;left: 0;width: 100%;height:380px;background-color: #fff;z-index: 3;padding:10px 20px;
								.textarea{
								}
								.confirm_tip{
									margin-top: 20px;text-align: right;
									a.button{display: inline-block;width: 88px;height: 30px;line-height: 30px;text-align: center;background-color: #479CFF;color: #fff;font-size: 14px;border:1px solid #479CFF;border-radius: 2px;cursor: pointer;}
									a.button:hover{text-decoration:none;background-color: #387CCC;border-color: #387CCC}
									a.no{color: #479CFF; background-color: #fff;margin-right: 30px;}
									a.no:hover{background-color: #fff;color: #387CCC;}
								}
							}
							.list_over{overflow: auto;height:380px;margin-top: 18px;}
							// 小项部分
							.events_list{
								.list_state{width:100%;height:30px;opacity: 0.9;background: #F5F5F5;padding-left:27px;padding-right: 10px;position: relative;cursor: pointer;
									p{font-size: 13px;color: #556677;line-height:30px;}
									i{position: absolute;top:9px;width:14px;height:14px;left:8px;}
								}
							}
						}
						.events_right{width:28%;border-left:0;background-color:#f6f6f6;
							.right_tit{font-size: 16px;color: #556677;padding:20px 30px 0;}
							.right_num{margin-top:10px;margin-bottom: 10px;padding:0px 30px;
								.right_txt{font-size: 13px;color: #7F8FA4;line-height:24px;}
								.right_btn{border: 1px solid #F5A623;border-radius: 2px;font-size: 12px;color: #F5A623;width:60px;height:24px;line-height: 22px;text-align:center;cursor:pointer;}
							}
							.right_list{
								ul{height:330px;box-sizing: border-box;padding:0px 30px;overflow-y: auto;
									li{border:0;width:100%;text-overflow: ellipsis;white-space: normal;white-space: nowrap;overflow: hidden;position: relative;line-height:16px;height:16px;cursor:default;background: rgba(0,0,0,0);
										i{background:rgba(0,0,0,0);color:#DFE2E5;font-size: 1.1em;vertical-align:top;margin-right:5px;margin-top:1px;cursor:pointer;margin-left: 1px;}
									}
									li:hover{
										i{color: #F5A623;}
									}
								}
								.add_cost{background: #FFFFFF;border-top: 1px solid #DFE2E5;height:30px;
									p{
										font-size: 13px;color: #556677;line-height:30px;text-align:right;padding-right: 10px;
										.cy{padding-right: 20px;cursor: default;}
									}
								}
							}
						}
					}
					.footer_inform{
						>p{font-size: 14px;color: #556677;padding:20px 0;font-weight: 600;
							span{font-size: 12px;color: #A8AFB5;font-weight: normal;}
						}
					}
				}
				.del{
					position: absolute;right: 20px;bottom: 10px;font-size: 13px;color: #7F8FA4;
					&:hover{color: #479CFF;}
				}
				a.disabled{
					color: #ccc;
					&:hover{text-decoration: none;color: #ccc;cursor: default;}
				}
			}
      .bgc{background-color:#F9F9F9;}
      div.state_list:hover{background: #F9F9F9;box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);}
		}
		.entrustInfo{
			>p{font-size: 16px;color: #223344;padding-top: 20px;}
		}
		.confirm_btn{width:214px;margin:60px auto 0;
			p{padding:0 30px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height:30px;text-align:center;cursor:pointer;}
			p:hover{border-color: #408CE6;color: #408CE6;}
			.btn_bg{background-color:#479CFF;color:#fff;}
			.btn_bg:hover{border-color: #408CE6;background-color: #408CE6;color:#fff;}
		}
		.pos_bt{
			margin-top: 145px;
		}
		.pl10{padding-left:10px;}
		// 对插件样式的修改
		.percentage_txt{position: relative;
			input{width:120px;height:30px;padding: 3px 25px 3px 10px;transition: border-color .2s cubic-bezier(.645,.045,.355,1);border-radius:2px;border: 1px solid #bfcbd9;line-height:30px;text-align: left;}
			.percentage{position: absolute;left:100px;top:2px;font-size: 14px;color: #556677;line-height:30px;}
			.prompt{font-size: 13px;color: #7F8FA4;line-height:14px;display:inline-block;vertical-align: middle;margin-left: 5px;}
		}
		.el-form-item__content{width:65%;}
		.el-checkbox{vertical-align: top;margin-right:30px;margin-top: 10px;}
		.el-checkbox .el-checkbox__label{font-size: 12px;color: #556677;width:130px;display:inline-block;word-wrap:break-word;word-break:break-all; white-space:pre-wrap;vertical-align: top;padding-left: 10px;}
		.el-checkbox+.el-checkbox{margin-left: 0;}
		.el-input__inner,.el-textarea__inner{font-size: 13px;border-radius:2px;}
		// 弹框公用样式继承自common.css
		.state_preview{
			.el-dialog{
				width:310px;
				.confirm_tip{
					text-align: right;
					p{text-align: left;font-size: 14px;color: #556677;padding-bottom: 20px;line-height: 20px;}
				}
			}
		}
		// 小项选中时候的字体颜色
		.ptc{
			.el-checkbox__label{color: #479CFF;}
		}
    // 基本信息部分样式
    .basic_info{
      .el-form-item{margin-bottom:20px;}
      .el-form-item__label{height:30px;line-height: 30px;padding:0;}
      .remain{position: absolute;right: 5px;bottom: 0px;font-size: 13px;color: #A8AFB5;}
    }
		// .el-form-item.is-required .el-form-item__label:before{content:'';}

		.sub_confirm{
			.el-dialog{
				width:400px;min-height: 290px;top:50%!important;margin-top: -145px;
				.confirm_tip2{
					text-align: center;padding-top: 10px;min-height: 278px;
					table{
						width: 360px;
						th{background: #F5F5F5;border: 1px solid #EEEEEE;height: 40px;font-size: 13px;font-weight: normal;color: #223344;}
						td{border: 1px solid #EEEEEE;height: 40px;}
					}
					p{text-align: left;font-size: 14px;color: #556677;padding-bottom: 10px;line-height: 20px;}
					.tm_confirm{
						float: left;display: inline-block;margin-top: 10px;text-align: left;font-size: 14px;color: #223344;padding-left: 25px;background: #fff url(~assets/img/cxb/down.png) 0 center no-repeat;height: 20px;line-height: 20px;
						&:hover{color: #0190fe;}
					}
					.tip{clear: both;text-align: left;margin-top: 5px;margin-bottom: 20px;font-size: 12px;color: #999999;}
				}
			}
		}
	}
	.my-autocomplete{
		li{line-height:30px;height:30px;font-size: 13px;color: #556677;}
		.el-autocomplete-suggestion__wrap{padding:0;}
	}
  .events_list .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #20a0ff !important;
    border-color: #0190fe !important;
	}
	.smallFeePopover{
		background: #F5A623!important;border-color: #F5A623!important;padding: 10px!important;
	 .smallFee{margin-bottom: 0;color: #fff;text-align: left;line-height: 18px;font-size: 13px;}
	 .popper__arrow, .popper__arrow::after{border-top-color: #F5A623!important;}
	}

	.bigClassSelect{
		.el-dialog{
			width: 650px;margin-top: -238px;
			.el-dialog__body{
				padding-top: 15px;
				.bigClasses{
					width: 610px;height: 354px;padding: 20px;background: #F9F9F9;
					ul{
						width: 100%;height: 314px;
						li{
							float: left;width: 20%;height: 18px;line-height: 18px;margin-bottom: 19px;padding:0 5px;
							.el-checkbox{
								margin-top: 0;margin-right: 0;
								.el-checkbox__label{width: auto;font-size: 13px;color: #556677;}
							}
						}
					}
				}
				.confirm_tip{
					text-align: center;padding-top: 20px;
					p{text-align: left;font-size: 14px;color: #556677;padding-bottom: 20px;line-height: 20px;}
				}
			}
		}
	}

	.customerInfo{
		.result_type{
			width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;
			thead{
				height: 40px;overflow:hidden;border: 1px solid #DFE2E5;border-collapse: inherit;
				tr{
					height: 40px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 10px;}
					th.minWidth{min-width: 60px;}
					th.alignc{text-align: center;}
					th.alignr{text-align: right;}
					th.paddingR{padding-right: 10px;}
					th.paddingL{padding-left: 10px;}
					th.minWidth.paddingR{min-width: 70px;}
					th.minWidth.paddingL{min-width: 70px;}
				}
			}
			tbody{
				tr{
					height: 40px;border: 1px solid #DFE2E5;background-color: #fff;
					td{
						min-height: 40px;font-size: 13px;color: #556677;padding:10px;
						.el-checkbox{position: relative;top: -1px;}
					}
					td.check_wrap{padding-left: 20px;padding-right: 20px;width: 16px;}
					td.minWidth{min-width: 60px;}
					td.alignc{text-align: center;}
					td.alignr{text-align: right;}
					td.paddingR{padding-right: 10px;}
					td.paddingL{padding-left: 10px;}
					td.action{
						a{color: #479CFF;}
						a:hover{text-decoration: none;color: #408CE6;}
					}
					td.pay{color: #36AF47;}
					td.nopay{color: #F64744;}
					td.memo{
						span{display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 78px;}
					}
				}
				tr:hover,tr.hover{
					background-color: #F9F9F9;
				}
				tr.empty{
					.empty_ic{
						height: 200px;text-align: center;padding-top:83px;
						span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; background: transparent url(~assets/img/nulldata.png) 0 center no-repeat;color: #A8AFB5}
					}
					&:hover{background-color: #fff;}
				}
			}
			tfoot{

			}
		}
	}
</style>
