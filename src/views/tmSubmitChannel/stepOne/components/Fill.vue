<template>
	<div class="stepOneFillCh" v-loading="loading" element-loading-text="拼命加载中">
		<div class="notPassReason" v-if="infoDetailData.auditingReasons">申报资料审核不通过，请重新提交；不通过原因：{{infoDetailData.auditingReasons}}</div>

		<!-- 订单信息 -->
    <div class="common_c baseInfo">
	    <p class="mb20">订单信息</p>
		<el-form class="common_c_form basic_info" ref="tmForm" :model="contactInfo" :rules="tmFormRules" :inline="true" auto-complete="off" label-width="140px" v-if="!loading" style="width: 1200px">
	      <el-form-item label="订单来源" class="wider" prop="orderOriginId">
	      	<el-radio-group v-model="contactInfo.orderOriginId">
	        	<el-radio class="radio" v-for="item in orderOriginOptions" :key="item.id" :label="item.id">{{item.name}}</el-radio>
				<!-- 1线下 2淘宝 3版信通 4神州 5信拾贝 6上海单茂 7福州信和 8联盟 9天猫 -->
	        </el-radio-group>
	      </el-form-item>
	      <el-form-item label="客户平台" class="wider">
	      	<el-radio-group v-model="contactInfo.custPlatformId">
	        	<el-radio class="radio" v-for="item in custPlatformOptions" :key="item.id" :label="item.id">{{item.name}}</el-radio>
	        </el-radio-group>
	      </el-form-item>
	      <el-form-item class="custName" label="客户姓名" prop="custName">
	        <el-input type="text" v-model="contactInfo.custName" placeholder="请填写客户姓名" :maxlength="20"></el-input>
	      </el-form-item>
	      <el-form-item class="custPhone hasintr" label="客户手机号" prop="custPhone">
	        <el-input type="text" v-model="contactInfo.custPhone" placeholder="请填写客户手机号" :maxlength="11"></el-input>
			<p class="addintr red">注：服务进度消息将通过此手机号通知客户，请仔细核对是否输入正确！</p>
	      </el-form-item>
			<!-- 天猫订单字段 -->
		  <el-form-item class="markSn hasintr" label="平台订单号" prop="markSn" v-if="contactInfo.orderOriginId==2||contactInfo.orderOriginId==9">
	        <el-input type="text" v-model="contactInfo.markSn" placeholder="请填写标记单号" :maxlength="30"></el-input>
			<p class="addintr red">注：平台订单号是后续财务对账的重要凭证，请仔细核对是否输入正确！</p>
	      </el-form-item>
	      <el-form-item class="contractSn" label="昵称/旺旺" prop="nickname" v-if="contactInfo.orderOriginId==2||contactInfo.orderOriginId==9">
	        <el-input type="text" v-model="contactInfo.nickname" placeholder="请填写昵称/旺旺" :maxlength="50"></el-input>
	      </el-form-item>
		  <el-form-item class="email hasintr" label="邮箱" prop="email">
	        <el-input type="text" v-model="contactInfo.email" placeholder="请填写邮箱地址" :maxlength="30"></el-input>
			<p class="addintr red">注：官文将通过此邮箱发送给客户，请仔细核对是否输入正确！</p>
	      </el-form-item>
	      <el-form-item class="orderAmount hasintr" label="订单金额" prop="orderAmount">
	        <el-input type="text" v-model="contactInfo.orderAmount" placeholder="请填写订单金额" :maxlength="13"></el-input>
			<p class="addintr">注：支付凭证对应金额</p>
	      </el-form-item>
	      <el-form-item class="unitPrice hasintr" label="单价">
	        <el-input type="text" v-model="contactInfo.unitPrice" placeholder="请填写单价" :maxlength="20"></el-input>
			<p class="addintr">注：单件商标价格</p>
	      </el-form-item>
		  <el-form-item class="discountPrice hasintr" label="折后单价" prop="discountPrice">
	        <el-input type="text" v-model="contactInfo.discountPrice" placeholder="请填写折后价格" :maxlength="20"></el-input>
			<p class="addintr red">注：折后单件商标价格，不包含小项费用</p>
	      </el-form-item>
		  <el-form-item class="quantity hasintr" label="商标数量" :class="{'hasRequire':contactInfo.orderOriginId!=9}">
	        <el-input type="text" v-model="contactInfo.quantity" placeholder="请填写商标数量" :maxlength="20"></el-input>
			<p class="addintr">注：该笔订单对应的商标数量</p>
	      </el-form-item>
		  <el-form-item class="orderTime" label="下单时间" :class="{'hasRequire':contactInfo.orderOriginId==2}">
	        <el-date-picker
			      v-model="contactInfo.orderTime"
			      type="datetime"
			      placeholder="请选择下单时间" style="width: 470px">
			    </el-date-picker>
	      </el-form-item>
		  <el-form-item class="payTime" label="付款时间" :class="{'hasRequire':contactInfo.orderOriginId==2||contactInfo.orderOriginId==9}">
	        <el-date-picker
			      v-model="contactInfo.payTime"
			      type="datetime"
			      placeholder="请选择付款时间" style="width: 470px">
			    </el-date-picker>
	      </el-form-item>
		  <el-form-item class="hasRequire deliveryTime" label="发货时间"  v-if="contactInfo.orderOriginId==9">
	        <el-date-picker
			      v-model="contactInfo.deliveryTime"
			      type="datetime"
			      placeholder="请选择发货时间" style="width: 470px">
			    </el-date-picker>
	      </el-form-item>
		  <el-form-item label="支付凭证" v-if="contactInfo.orderOriginId!=9" class="hasRequire">
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'voucherUrl'" :postAction="'iprp_servicer/api/file/allUpload'" :url="voucherUrl" :fileName="voucherName" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传支付凭证</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby1_user" style="padding-top:8px;"><a target="_blank" :href="standby1_user"><img src="~assets/img/action-icon.png" alt="">下载支付凭证</a></p>
	        		</div>
	        	</div>
	        </el-form-item> 
	    	<el-form-item label="业务专员" class="hasRequire">
				<el-input type="text" v-model.trim="salesman" placeholder="请填写业务专员" ></el-input>
		  </el-form-item>
		  <el-form-item label="完成专员" class="hasRequire">
			  <el-input type="text" v-model.trim="agentName" placeholder="请填写流程专员" ></el-input>
		  </el-form-item>
		  <el-form-item label="流程专员" class="hasRequire">
			  <el-input type="text" v-model.trim="selectDocument" placeholder="请填写完成专员" ></el-input>
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
		  <el-form-item class="remitter" label="备注">
	        <el-input type="text" v-model="contactInfo.remark" placeholder="请填写备注" :maxlength="200"></el-input>
	      </el-form-item>
		  
		  </el-form>
		  <!-- <el-form-item class="markSn" label="标记单号" prop="markSn">
	        <el-input type="text" v-model="contactInfo.markSn" placeholder="请填写标记单号" :maxlength="30"></el-input>
	      </el-form-item>
	      <el-form-item class="contractSn" label="合同号" prop="contractSn">
	        <el-input type="text" v-model="contactInfo.contractSn" placeholder="请填写合同号" :maxlength="30"></el-input>
	      </el-form-item>
	      <el-form-item class="orderAmount" label="订单金额" prop="orderAmount">
	        <el-input type="text" v-model="contactInfo.orderAmount" placeholder="请填写订单金额" :maxlength="13"></el-input>
	      </el-form-item>
	      <el-form-item class="remitter" label="汇款人" prop="remitter">
	        <el-input type="text" v-model="contactInfo.remitter" placeholder="请填写汇款人" :maxlength="20"></el-input>
	      </el-form-item>
	      <el-form-item class="payTime" label="支付时间" prop="payTime">
	        <el-date-picker
			      v-model="contactInfo.payTime"
			      type="datetime"
			      placeholder="请选择支付时间" style="width: 470px">
			    </el-date-picker>
	      </el-form-item>-->
	      <!-- <el-form-item label="支付方式">
	        <el-radio class="radio" v-model="contactInfo.payType" :label="1">支付宝</el-radio>
	  			<el-radio class="radio" v-model="contactInfo.payType" :label="2">对公打款</el-radio>
	  			<el-radio class="radio" v-model="contactInfo.payType" :label="3">其他</el-radio>
				  <el-radio class="radio" v-model="contactInfo.payType" :label="4">周期结算</el-radio>
	      </el-form-item> -->
	      
    </div>

		<!-- 主体信息 -->
		<div class="common_c main_body" v-if="!loading" id="main_body">
			<p class="mb20">主体信息</p>
			<el-form class="common_c_form main_body_form" ref="ruleForm" :model="ruleForm" :rules="rules" :inline="true" auto-complete="off" label-width="140px" >
				<!-- <el-form-item label="主体类型" v-if="workOrderSn && apply_type" class="apply_type">
						<el-radio class="radio" v-if="apply_type==1" v-model="apply_type" :label="1">大陆个体</el-radio>
						<el-radio class="radio" v-if="apply_type==2" v-model="apply_type" :label="2">大陆企业</el-radio> -->
						<!-- <el-radio class="radio" v-if="apply_type==3" v-model="apply_type" :label="3">港澳台及境外个人</el-radio>
						<el-radio class="radio" v-if="apply_type==4" v-model="apply_type" :label="4">港澳台及境外企业</el-radio> -->
				<!-- </el-form-item> -->
				<el-form-item label="主体类型" class="apply_type">
					<el-radio class="radio" v-model="apply_type" :label="2">大陆企业</el-radio>
					<el-radio class="radio" v-model="apply_type" :label="1">大陆个体</el-radio>
					<el-radio class="radio"  v-model="apply_type" :label="3">港澳台及境外个人</el-radio>
					<el-radio class="radio"  v-model="apply_type" :label="4">港澳台及境外企业</el-radio>
				</el-form-item>
	      <div v-if="apply_type==1" key="1">
		      <el-form-item label="申请人姓名" prop="apply_name">
		        <el-input size="small" v-model="ruleForm.apply_name" :maxlength="20" placeholder="请填写申请人姓名，与身份证信息保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人身份证号码" prop="apply_number">
		        <el-input size="small" v-model="ruleForm.apply_number" :maxlength="18" placeholder="请填写申请人身份证号码，与身份证信息保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人联系电话">
		        <el-input size="small" v-model="ruleForm.apply_phone" :maxlength="13" placeholder="请填写申请人手机或固话，固话前请加区号"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人地址" prop="address">
	          <el-form-item class="form-ipt-sm" prop="province_id">
	            <el-select v-model="ruleForm.province_id" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('ruleForm', ruleForm.province_id)">
	              <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item class="form-ipt-sm" prop="city_id">
	            <el-select v-model="ruleForm.city_id" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('ruleForm', ruleForm.city_id)">
	              <SebeOption v-for="item in cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item class="form-ipt-sm form-ipt-last" prop="area_id">
	            <el-select v-model="ruleForm.area_id" clearable filterable default-first-option placeholder="请选择区">
	              <SebeOption v-for="item in areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item prop="address" style="margin-top:20px;margin-bottom:0;">
	            <el-input v-model="ruleForm.address" :maxlength="80" placeholder="请填写具体地址" auto-complete="off" class="form-ipt"></el-input>
	          </el-form-item>
	          <!-- <el-input v-model="ruleForm.address" :maxlength="100" placeholder="请填写具体地址" auto-complete="off" class="form-ipt"></el-input> -->
	        </el-form-item>
		      <el-form-item label="邮政编码" prop="zip_code">
		        <el-input size="small" v-model="ruleForm.zip_code" :maxlength="6" placeholder="请填写具体地址的邮政编码"></el-input>
		      </el-form-item>
	        <el-form-item label="申请人身份证正反面复印件（需签名）">
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedDataPerson"  @resetUploader="resetUploader" :postAction="'./iprp_servicer/api/uploadFileIdentify?imgType=1'" :valueName="'standby1'" :url="standby1" :fileName="standby1_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
						<p style="color:red;margin-bottom:5px;">支持证件智能识别</p>
	        			<p>请上传申请人身份证正反面复印件，并签署申请人签名</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby1_user" style="padding-top:8px;"><a target="_blank" :href="standby1_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的身份证复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	        <el-form-item label="个体工商户营业执照副本复印件（需签名）" >
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData"  @resetUploader="resetUploader" :valueName="'standby2'" :url="standby2" :fileName="standby2_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传个体工商户营业执照副本复印件，并签署申请人签名</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby2_user" style="padding-top:8px;"><a target="_blank" :href="standby2_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的个体工商户营业执照副本复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	      </div>
				<div v-if="apply_type==2" key="2" v-loading.lock.fullscreen='shibieloading' element-loading-text="数据查询中">
					<el-form-item label="申请人企业名称" prop="apply_name" class="shibieqiye">
						<el-input size="small" v-model="ruleForm.apply_name" :maxlength="60" placeholder="请填写申请人企业名称，与企业营业执照信息保持一致"></el-input>
						<span class="shibiebtn" @click="getcompanyinfo">自动识别</span>
					</el-form-item>
					<el-form-item label="统一社会信用代码" prop="apply_number">
						<el-input size="small" v-model="ruleForm.apply_number" :maxlength="18" placeholder="请填写统一社会信用代码"></el-input>
					</el-form-item>
					<el-form-item label="企业联系电话" prop="apply_phone">
						<el-input size="small" v-model="ruleForm.apply_phone" :maxlength="13" placeholder="请填写企业联系电话，固话前请加区号"></el-input>
					</el-form-item>
					<el-form-item label="企业注册地址" prop="address">
						<el-form-item class="form-ipt-sm" prop="province_id">
							<el-select v-model="ruleForm.province_id" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('ruleForm', ruleForm.province_id)">
							<SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
							</el-select>
						</el-form-item>
						<el-form-item class="form-ipt-sm" prop="city_id">
							<el-select v-model="ruleForm.city_id" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('ruleForm', ruleForm.city_id)">
							<SebeOption v-for="item in cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
							</el-select>
						</el-form-item>
						<el-form-item class="form-ipt-sm form-ipt-last" prop="area_id">
							<el-select v-model="ruleForm.area_id" clearable filterable default-first-option placeholder="请选择区">
							<SebeOption v-for="item in areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
							</el-select>
						</el-form-item>
						<el-form-item prop="address" style="margin-top:20px;margin-bottom:0;">
							<el-input v-model="ruleForm.address" :maxlength="80" placeholder="请填写申请企业地址" auto-complete="off" class="form-ipt"></el-input>
						</el-form-item>
					</el-form-item>
					<el-form-item label="邮政编码" prop="zip_code">
						<el-input size="small" v-model="ruleForm.zip_code" :maxlength="6" placeholder="请填写具体地址的邮政编码"></el-input>
					</el-form-item>
					<el-form-item label="企业营业执照副本复印件（加盖公章）">
						<div class="upload_component">
							<uploader @complete="setUploadedDataCompany"  @resetUploader="resetUploader" :valueName="'standby1'" :url="standby1" :fileName="standby1_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
							<div class="upload_tip">
								<p>请上传企业营业执照副本复印件，并加盖企业公章</p>
								<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
								<p v-if="standby1_user" style="padding-top:8px;"><a target="_blank" :href="standby1_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的企业营业执照副本复印件</a></p>
							</div>
						</div>
					</el-form-item>
				</div>
	      <div v-if="apply_type==3" key='3'>
		      <el-form-item label="申请人姓名（英文）" prop="name_en">
		        <el-input size="small" v-model="ruleForm.name_en" :maxlength="60" placeholder="请填写申请人英文姓名，应与能够证明其身份的有效证件保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人姓名（中文）" prop="apply_name">
		        <el-input size="small" v-model="ruleForm.apply_name" :maxlength="60" placeholder="请填写申请人中文姓名，应与能够证明其身份的有效证件保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人护照号" prop="apply_number">
		        <el-input size="small" v-model="ruleForm.apply_number" :maxlength="30" placeholder="请填写申请人护照号"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人联系电话" >
		        <el-input size="small" v-model="ruleForm.apply_phone" :maxlength="30" placeholder="请填写申请人联系电话，电话前请加国家代码"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人地址" required>
	          <el-form-item class="form-ipt-country" prop="area_id">
	            <el-select v-model="ruleForm.area_id" clearable filterable default-first-option placeholder="请选择国家或地区">
	              <SebeOption v-for="item in areaData" :label="item.zh_name" :filterLabel="item.zh_name+(item.countryPinYin || '')+(item.countryPinYinAbbr || '')+(item.en_name || '')" :value="item.country_id" :key="item.country_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item prop="address" style="margin-top:20px;margin-bottom:0;">
	            <el-input v-model="ruleForm.address" :maxlength="80" placeholder="请填写申请人详细地址" auto-complete="off" class="form-ipt"></el-input>
	          </el-form-item>
	        </el-form-item>
	        <el-form-item label="邮政编码" prop="zip_code">
		        <el-input size="small" v-model="ruleForm.zip_code" :maxlength="6" placeholder="请填写6位邮政编码"></el-input>
		      </el-form-item>
	        <el-form-item label="申请人护照">
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby1'" :url="standby1" :fileName="standby1_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传申请人护照复印件，并签署申请人签名</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby1_user" style="padding-top:8px;"><a target="_blank" :href="standby1_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的企业营业执照副本复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	        <el-form-item label="中文护照译本">
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby2'" :url="standby2" :fileName="standby2_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传中文护照译本复印件，并签署申请人签名</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby2_user" style="padding-top:8px;"><a target="_blank" :href="standby2_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的中文护照译本复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	      </div>
			<!-- <div v-if="apply_type==4">
					<div style="min-height: 630px;">
				<el-form-item label="企业名称（英文）" prop="name_en">
					<el-input size="small" v-model="ruleForm.name_en" :maxlength="60" placeholder="请填写英文版企业名称，应与能够证明其主体的有效证件保持一致"></el-input>
				</el-form-item>
				<el-form-item label="企业名称（中文）" prop="apply_name">
					<el-input size="small" v-model="ruleForm.apply_name" :maxlength="60" placeholder="请填写中文版企业名称"></el-input>
				</el-form-item>
				<el-form-item label="企业联系电话" prop="apply_phone">
					<el-input size="small" v-model="ruleForm.apply_phone" :maxlength="30" placeholder="请填写企业联系电话，电话前请加国家代码"></el-input>
				</el-form-item>
				<el-form-item label="企业注册地址" required>
				<el-form-item class="form-ipt-country" prop="area_id">
					<el-select v-model="ruleForm.area_id" clearable filterable default-first-option placeholder="请选择国家或地区">
					<SebeOption v-for="item in areaData" :label="item.zh_name" :filterLabel="item.zh_name+(item.countryPinYin || '')+(item.countryPinYinAbbr || '')+(item.en_name || '')" :value="item.country_id" :key="item.country_id"></SebeOption>
					</el-select>
				</el-form-item>
				<el-form-item prop="address" style="margin-top:20px;margin-bottom:0;">
					<el-input v-model="ruleForm.address" :maxlength="80" placeholder="请填写企业注册地址，与企业登记证件保持一致" auto-complete="off" class="form-ipt"></el-input>
				</el-form-item>
				</el-form-item>
					<el-form-item label="邮政编码" prop="zip_code">
					<el-input size="small" v-model="ruleForm.zip_code" :maxlength="6" placeholder="请填写6位邮政编码"></el-input>
				</el-form-item>
				<el-form-item label="企业登记证件">
					<div class="upload_component">
						<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby1'" :url="standby1" :fileName="standby1_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
						<div class="upload_tip">
							<p>请上传企业登记证件复印件，并加盖企业公章</p>
							<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
							<p v-if="standby1_user" style="padding-top:8px;"><a target="_blank" :href="standby1_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的企业登记证件复印件</a></p>
						</div>
					</div>
				</el-form-item>
				<el-form-item label="企业登记证件译本">
					<div class="upload_component">
						<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby2'" :url="standby2" :fileName="standby2_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
						<div class="upload_tip">
							<p>请上传企业登记证件译本复印件，并加盖企业公章</p>
							<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
							<p v-if="standby2_user" style="padding-top:8px;"><a target="_blank" :href="standby2_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的企业登记证件译本复印件</a></p>
						</div>
					</div>
				</el-form-item>
					</div>
			</div> -->
	      <div v-if="apply_type==4" key="4">

					  
		      <el-form-item label="企业名称（英文）" prop="name_en">
		        <el-input size="small" v-model="ruleForm.name_en" :maxlength="60" placeholder="请填写英文版企业名称，应与能够证明其主体的有效证件保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="企业名称（中文）" prop="apply_name">
		        <el-input size="small" v-model="ruleForm.apply_name" :maxlength="60" placeholder="请填写中文版企业名称"></el-input>
		      </el-form-item>
		      <el-form-item label="企业联系电话" >
		        <el-input size="small" v-model="ruleForm.apply_phone" :maxlength="30" placeholder="请填写企业联系电话，电话前请加国家代码"></el-input>
		      </el-form-item>
		      <el-form-item label="企业注册地址" required>
	          <el-form-item class="form-ipt-country" prop="area_id">
	            <el-select v-model="ruleForm.area_id" clearable filterable default-first-option placeholder="请选择国家或地区">
	              <SebeOption v-for="item in areaData" :label="item.zh_name" :filterLabel="item.zh_name+(item.countryPinYin || '')+(item.countryPinYinAbbr || '')+(item.en_name || '')" :value="item.country_id" :key="item.country_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item prop="address" style="margin-top:20px;margin-bottom:0;">
	            <el-input v-model="ruleForm.address" :maxlength="80" placeholder="请填写企业注册地址，与企业登记证件保持一致" auto-complete="off" class="form-ipt"></el-input>
	          </el-form-item>
	        </el-form-item>
	        <el-form-item label="邮政编码" prop="zip_code">
		        <el-input size="small" v-model="ruleForm.zip_code" :maxlength="6" placeholder="请填写6位邮政编码"></el-input>
		      </el-form-item>
	        <el-form-item label="企业登记证件">
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby1'" :url="standby1" :fileName="standby1_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传企业登记证件复印件，并加盖企业公章</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby1_user" style="padding-top:8px;"><a target="_blank" :href="standby1_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的企业登记证件复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	        <el-form-item label="企业登记证件译本">
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby2'" :url="standby2" :fileName="standby2_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传企业登记证件译本复印件，并加盖企业公章</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby2_user" style="padding-top:8px;"><a target="_blank" :href="standby2_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的企业登记证件译本复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	      </div>

	      <el-form-item class="btn_wrap" label=" " style="margin-top:10px;">
        	<button class="reset" type="button" @click.prevent="resetRuleForm">重置</button>
        	<button class="saveT" type="button" @click.prevent="saveT('ruleForm')" v-show="spSubjectTData.length<5">存新模板</button>
        	<button class="saveT" type="button" @click.prevent="saveT('ruleForm', true)" v-if="isTemplateEdit">保存修改</button>
        </el-form-item>

	      <!-- 图片上传暂时预留，待开发配套插件 -->
	    </el-form>

	    <div class="common_c_template main_body_template">
	    	<div class="common_c_template_in">
		    	<h4>请选择主体信息模板</h4>
		    	<!--
		    	<div class="template_c custom">
			    	<p>客户保存的：</p>
			    	<ul class="custom_list">
			    		<li :class="{cur: memberSubjectIdx === index}" v-for="(item, index) in memberSubjectTData" @click="setCurSubject(item, 'memberSubjectIdx', index)">
			    			<span class="name">{{item.apply_type|subjectTypeFormat}} | {{item.apply_name}}</span>
			    		</li>
			    		<li v-if="!memberSubjectTData.length">暂无</li>
			    	</ul>
		    	</div>
		    	-->
		    	<div class="template_c my">
			    	<p>我保存的：(客户不可见，且不超过5件)</p>
			    	<ul class="my_list">
			    		<li :class="{cur: spSubjectIdx === index}" v-for="(item, index) in spSubjectTData" @click="setCurSubject(item, 'spSubjectIdx', index)" :key="index">
			    			<span class="name">{{item.apply_type|subjectTypeFormat}} | {{item.apply_name}}</span>
			    			<el-popover placement="bottom" width="125" trigger="click" class="del">
								  <p class="popover_til">是否删除该模板？</p>
	                <div class="popover_btn">
	                  <button type="button" class="cancel_btn" @click="hidePop">否</button><button type="button" class="confirm_btn" @click.stop="delTemplate(item.apply_id)">是</button>
	                </div>
								  <span class="el-icon-delete"  slot="reference" @click.stop=""></span>

								</el-popover>
			    		</li>
			    		<li v-if="!spSubjectTData.length">暂无</li>
			    	</ul>
		    	</div>
	    	</div>
	    </div>
    </div>

    

    <!-- 开票信息 -->
		<div class="common_c invoice_info" v-if="!loading">
			<p class="mb20">开票信息</p>
			<el-form class="common_c_form" ref="invoiceForm" :model="invoiceForm" :rules="invoiceRules" :inline="true" auto-complete="off" label-width="140px">
				<el-form-item label="是否需要开票" prop="name" style="margin-bottom:10px;">
	        <el-checkbox label="1" name="type" v-model="needInvoice">需要开票</el-checkbox>
	      </el-form-item>
	      <template v-if="apply_type!=2 && needInvoice" style="margin-bottom:10px;">
	      	<el-form-item label="开票类型" prop="name">
		        <div class="input_text">增值税普通发票</div>
		      </el-form-item>
		      <el-form-item label="发票抬头">
		        <div class="input_text">
		        	<p class="apply_name" v-if="apply_type == 1">{{ruleForm.apply_name}}</p>
		        	<p class="apply_name" v-if="apply_type == 3 || apply_type == 4">{{isEnTitle ? ruleForm.name_en : ruleForm.apply_name}} <span @click="isEnTitle=!isEnTitle" class="name_toggle" v-show="ruleForm.apply_name"> 切换为{{isEnTitle ? '中文':'英文'}}申请人</span></p>
		        	<p class="tip">发票抬头与申请主体一致，不可修改</p>
		        </div>
		      </el-form-item>
		      <el-form-item label="是否寄送" style="margin-bottom:10px;">
		        <el-radio class="radio" v-model="invoiceForm.send_state" :label="1">寄送</el-radio>
		  			<el-radio class="radio" v-model="invoiceForm.send_state" :label="2">不寄送</el-radio>
		      </el-form-item>
		      <el-form-item label="收件地址" v-if="invoiceForm.send_state==1">
	          <el-form-item class="form-ipt-sm" prop="send_province_id" style="display:inline-block;width:150px;">
	            <el-select v-model="invoiceForm.send_province_id" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('invoiceForm', invoiceForm.send_province_id, 'send_')">
	              <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item class="form-ipt-sm" prop="send_city_id" style="display:inline-block;width:150px;">
	            <el-select v-model="invoiceForm.send_city_id" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('invoiceForm', invoiceForm.send_city_id, 'send_')">
	              <SebeOption v-for="item in send_cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item class="form-ipt-sm form-ipt-last" prop="send_area_id" style="display:inline-block;width:150px;">
	            <el-select v-model="invoiceForm.send_area_id" clearable filterable default-first-option placeholder="请选择区">
	              <SebeOption v-for="item in send_areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
	            </el-select>
	          </el-form-item>
	          <el-form-item prop="send_address" style="margin-top:20px;margin-bottom:0;">
	            <el-input v-model="invoiceForm.send_address" :maxlength="80" placeholder="请填写具体地址" auto-complete="off" class="form-ipt"></el-input>
	          </el-form-item>
	          <a class="fill_address" v-if="apply_type==1" @click="fillAddress('invoiceForm', 'ruleForm', 'send_', '')">复用联系人地址</a>
	        </el-form-item>
	      </template>


	      <template v-if="apply_type==2 && needInvoice">
		      <el-form-item label="开票类型" style="margin-bottom:10px;">
		        <el-radio class="radio" v-model="invoice_type" :label="1">增值税普通发票</el-radio>
		  			<el-radio class="radio" v-model="invoice_type" :label="2"> 增值税专用发票</el-radio>
		      </el-form-item>

		      <div v-if="invoice_type==1">
						<el-form-item label="发票抬头">
							<div class="input_text">
								<p class="apply_name">{{ruleForm.apply_name}}</p>
			        	<p class="tip">发票抬头与申请主体一致，不可修改</p>
			        </div>
			      </el-form-item>
			      <el-form-item label="纳税人识别号" prop="invoice_code">
			        <el-input size="small" v-model="invoiceForm.invoice_code" :maxlength="20" placeholder="请填写纳税人识别号"></el-input>
			      </el-form-item>

			      <el-form-item label="是否寄送" style="margin-bottom:10px;">
			        <el-radio class="radio" v-model="invoiceForm.send_state" :label="1">寄送</el-radio>
			  			<el-radio class="radio" v-model="invoiceForm.send_state" :label="2">不寄送</el-radio>
			      </el-form-item>
			      <el-form-item label="收件地址" v-if="invoiceForm.send_state==1">
		          <el-form-item class="form-ipt-sm" prop="send_province_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.send_province_id" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('invoiceForm', invoiceForm.send_province_id, 'send_')">
		              <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item class="form-ipt-sm" prop="send_city_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.send_city_id" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('invoiceForm', invoiceForm.send_city_id, 'send_')">
		              <SebeOption v-for="item in send_cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item class="form-ipt-sm form-ipt-last" prop="send_area_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.send_area_id" clearable filterable default-first-option placeholder="请选择区">
		              <SebeOption v-for="item in send_areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item prop="send_address" style="margin-top:20px;margin-bottom:0;">
		            <el-input v-model="invoiceForm.send_address" :maxlength="80" placeholder="请填写具体地址" auto-complete="off" class="form-ipt"></el-input>
		          </el-form-item>
		          <a class="fill_address" @click="fillAddress('invoiceForm', 'ruleForm', 'send_', '')">复用联系地址</a>
		        </el-form-item>
			    </div>

		      <div v-if="invoice_type==2">
						<el-form-item label="发票抬头">
			        <div class="input_text">
			        	<p class="apply_name">{{ruleForm.apply_name}}</p>
			        	<p class="tip">发票抬头与申请主体一致，不可修改</p>
			        </div>
			      </el-form-item>
			      <el-form-item label="纳税人识别号" prop="invoice_code">
			        <el-input size="small" v-model="invoiceForm.invoice_code" :maxlength="20" placeholder="请填写纳税人识别号"></el-input>
			      </el-form-item>
			      <el-form-item label="注册电话" prop="regist_phone">
			        <el-input size="small" v-model="invoiceForm.regist_phone" :maxlength="13" placeholder="请填写注册电话号码"></el-input>
			      </el-form-item>
			      <el-form-item label="注册地址">
		          <el-form-item class="form-ipt-sm" prop="invoice_province_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.invoice_province_id" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('invoiceForm', invoiceForm.invoice_province_id, 'invoice_')">
		              <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item class="form-ipt-sm" prop="invoice_city_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.invoice_city_id" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('invoiceForm', invoiceForm.invoice_city_id, 'invoice_')">
		              <SebeOption v-for="item in invoice_cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item class="form-ipt-sm form-ipt-last" prop="invoice_area_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.invoice_area_id" clearable filterable default-first-option placeholder="请选择区">
		              <SebeOption v-for="item in invoice_areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item prop="invoice_address" style="margin-top:20px;margin-bottom:0;">
		            <el-input v-model="invoiceForm.invoice_address" :maxlength="80" placeholder="请填写企业注册地址，与企业登记证件保持一致" auto-complete="off" class="form-ipt"></el-input>
		          </el-form-item>
		          <a class="fill_address" @click="fillAddress('invoiceForm', 'ruleForm', 'invoice_', '')">复用主体地址</a>
		        </el-form-item>

			      <el-form-item label="开户行名称" prop="account_bank">
			        <el-input size="small" v-model="invoiceForm.account_bank" :maxlength="30" placeholder="请填写对公账户的开户行名称"></el-input>
			      </el-form-item>
			      <el-form-item label="银行账号" prop="account_number">
			        <el-input size="small" v-model="invoiceForm.account_number" :maxlength="20" placeholder="请填写对公账户的银行账号"></el-input>
			      </el-form-item>

			      <el-form-item label="是否寄送" style="margin-bottom:10px;">
			        <el-radio class="radio" v-model="invoiceForm.send_state" :label="1">寄送</el-radio>
			  			<el-radio class="radio" v-model="invoiceForm.send_state" :label="2">不寄送</el-radio>
			      </el-form-item>
			      <el-form-item label="收件地址" v-if="invoiceForm.send_state==1">
		          <el-form-item class="form-ipt-sm" prop="send_province_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.send_province_id" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('invoiceForm', invoiceForm.send_province_id, 'send_')">
		              <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item class="form-ipt-sm" prop="send_city_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.send_city_id" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('invoiceForm', invoiceForm.send_city_id, 'send_')">
		              <SebeOption v-for="item in send_cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item class="form-ipt-sm form-ipt-last" prop="send_area_id" style="display:inline-block;width:150px;">
		            <el-select v-model="invoiceForm.send_area_id" clearable filterable default-first-option placeholder="请选择区">
		              <SebeOption v-for="item in send_areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
		            </el-select>
		          </el-form-item>
		          <el-form-item prop="send_address" style="margin-top:20px;margin-bottom:0;">
		            <el-input v-model="invoiceForm.send_address" :maxlength="80" placeholder="请填写具体地址" auto-complete="off" class="form-ipt"></el-input>
		          </el-form-item>
		          <!-- <a class="fill_address" @click="fillAddress('invoiceForm', 'ruleForm', 'send_', '')">复用联系人地址</a> -->
		        </el-form-item>
		      </div>

		      <el-form-item class="btn_wrap" label=" " style="margin-top:10px;">
	        	<button type="button" class="reset" @click.prevent="resetInvoiceForm()">重置</button>
	        	<!-- <button type="button" class="saveT" @click.prevent="saveT('invoiceForm')" v-show="spInvoiceTData.length<5">存新模板</button>
	        	<button type="button" class="saveT" @click.prevent="saveT('invoiceForm', true)" v-if="isInvoiceTplEdit">保存修改</button> -->
	        </el-form-item>
        </template>
	    </el-form>
	    <!-- <div class="common_c_template invoice_template" v-show="apply_type==2 && needInvoice">
	    	<div class="common_c_template_in">
		    	<h4>请选择开票信息模板</h4>
		    	<div class="template_c custom">
			    	<p>客户保存的：</p>
			    	<ul class="custom_list">
			    		<li :class="{cur: memberInvoiceIdx === index}" v-for="(item, index) in memberInvoiceTData" @click="setCurInvoice(item, 'memberInvoiceIdx', index)">
			    			<span class="name">{{item.invoice_type|invoiceTypeFormat}} | {{item.invoice_title}}</span>
			    		</li>
			    		<li v-if="!memberInvoiceTData.length">暂无</li>
			    	</ul>
		    	</div>
		    	<div class="template_c my">
			    	<p>我保存的：(客户不可见，且不超过5件)</p>
			    	<ul class="my_list">
			    		<li :class="{cur: spInvoiceIdx === index}" v-for="(item, index) in spInvoiceTData" @click="setCurInvoice(item, 'spInvoiceIdx', index)">
			    			<span class="name">{{item.invoice_type|invoiceTypeFormat}} | {{item.invoice_title}}</span>
			    			<el-popover placement="bottom" width="125" trigger="click" class="del">
								  <p class="popover_til">是否删除该模板？</p>
	                <div class="popover_btn">
	                  <button type="button" class="cancel_btn" @click="hidePop">否</button><button type="button" class="confirm_btn" @click.stop="delInvoiceTemplate(item.member_invoiceId)">是</button>
	                </div>
								  <span class="el-icon-delete" slot="reference" @click.stop></span>
								</el-popover>
			    		</li>
			    		<li v-if="!spInvoiceTData.length">暂无</li>
			    	</ul>
		    	</div>
	    	</div>
	    </div> -->
		</div>

		<!-- 底部按钮 -->
    	<div class="confirm_btn clearfix" v-if="!loading">
			<p class="fl" @click="saveDraft()">保存</p>
			<p class="fl ml20 mr20" @click="prev">返回</p>
			<p class="fl btn_bg" @click="nextTo">下一步</p>
		</div>
		
	</div>
</template>
<script>
	import FillJs from './Fill.js';
	export default FillJs;
</script>
<style lang='less'>
.hasRequire{
	.el-form-item__label:before{
		content: '*';
	color: #FF3939;
	float: left;;
	width: 6px;
	padding-top: 2px;
	font-size: 14px;
	}
	
}
	//公用
	.notPassReason{display: inline-block;font-size: 12px;height: 26px;line-height: 26px;background: #F64744;border-radius: 100px;color: #FFFFFF;padding:0 40px;position: relative;left:50%;transform:translateX(-50%); }
	.stepOneFillCh{
		padding:60px 90px;background-color:#fff;min-height: 500px;
		.notPassReason{top:-40px;}
		// 字体淡黄色
		.cy{color: #F5A623;}
		label{text-align:left;}
		.shibieqiye{
			position: relative;
			.shibiebtn{
				position: absolute;
				width: 80px;
				height: 30px;
				right: -80px;
				top: 0;
				line-height: 30px;
				cursor: pointer;
				background-color: #379dea;
				color: #fff;
				text-align: center;
			}
		}
		//上下两部分共用
		.common_c{
			margin:0 auto;overflow:hidden;width: 1200px;position: relative;
			>p{font-size: 16px;color: #223344;}
			//表单 上下两部分共用
			.common_c_form{
				float: left;width:830px;padding-bottom:2000px;margin-bottom:-2000px;background-color: #fff;
				.el-form-item{margin-bottom: 20px;
					.el-form-item__label{padding:5px 12px 5px 0;line-height: 20px;text-align:left;}
					.el-form-item__label:before{margin-right:0;}
					.el-form-item__content{width:470px;line-height: 30px;
						.el-input{height: 30px;
							input{color:#556677}
						}
						.fill_address{width: 100px;position: absolute;top: 0;right: -110px;cursor: pointer;color:#479CFF;text-decoration: none;}
					}
					.upload_component{
						position: relative;
						.upload_tip{
							position: absolute;left: 140px;bottom:0;width:240px;font-size: 12px;color: #556677;line-height: 16px;
							p.format{color: #A8AFB5;padding-top: 5px; }
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
				.btn_wrap{
					.el-form-item__content{font-size:0;}
					button{font-size: 14px;color: #479CFF;border: 1px solid #479CFF;border-radius: 2px;line-height: 30px;padding:0 30px;margin-right: 10px;}
					button:hover{border-color:#408CE6;color:#408CE6;}
				}
				.form-ipt-country{
					width: 470px;margin-bottom: 0;
					.el-select{width: 470px;}
				}
				.el-radio__inner{width: 16px;height: 16px;}
				.el-radio+.el-radio{margin-left: 12px;
					.el-radio__label{color:#556677;}
				}
				.el-radio{
					margin-right: 0;
					.el-radio__label{color:#556677;}
				}
				.el-input__inner{height: 30px;}
				.el-input__inner,.el-textarea__inner{font-size: 13px;border-radius:2px;}
				.el-checkbox__inner{width: 16px;height: 16px;border-radius: 2px;}
				.el-checkbox__inner::after{left: 5px;top: 2px;}
				.payTime,.orderTime,.deliveryTime{
					.el-input .el-input__inner{padding-left: 30px;}
					.el-input__icon{line-height: 30px;}
				}
				.apply_type{
					.el-form-item__content{min-width:600px;line-height: 30px;}
				}
			}
			//模板 上下两部分共用
			.common_c_template{
				position: absolute; width:320px; top: 30px; right: 170px;background: #FFFFFF;padding-bottom:2000px;margin-bottom:-2000px;
				.common_c_template_in{
					border: 1px solid #DFE2E5;box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);border-radius: 2px;padding:18px 20px 15px;
					h4{font-size: 16px;color: #556677;font-weight: normal;line-height: 22px;}
					.template_c{
						margin-top: 15px;
						p{font-size: 13px;color: #7F8FA4;}
						ul{
							padding-top: 10px;
							li{
								width: 280px;height: 30px;background: #F9F9F9;line-height: 28px;border-radius: 2px;font-size: 13px;color: #7F8FA4;margin-bottom: 5px;padding:0 10px;border: 1px solid #F9F9F9;cursor: pointer;
								&:hover{background-color: #F8FCFF;border: 1px solid #B4DFFF;}
								&.cur{background-color: #F8FCFF;color: #479CFF;border: 1px solid #B4DFFF;}
								.name{display: inline-block;width: 240px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
								.del{float: right;font-size: 13px;color:#D2D9E0;
									.del_icon{width: 12px; height: 14px;display: inline-block;
									// background: transparent url(~assets/img/tmApplySubmit/del.png) 0 center no-repeat;
									}
									// &:hover{background: transparent url(~assets/img/tmApplySubmit/del.png) 0 center no-repeat;}
								}
								.del:hover{color: #479CFF;}
							}
						}
					}
				}
			}
		}
		//主体
		.main_body{
			padding-bottom: 35px;border-top: 1px solid #DFE2E5;padding-top: 30px;
		}

		//联系人信息
		.baseInfo{
			padding-bottom: 35px;
			.longw{
				.el-select{
					width:100%;
				}
			}
			.addAddress{
				> .el-form-item__content{
					width: 470px;
					.form-ipt-sm {
				    width: 150px;
				    margin-right: 6px;
				    margin-bottom: 0;
					}
					.form-ipt-last {
				    margin-right: 0;
				    float: right;
					}
					.address{
						margin-top:20px;margin-bottom:0;width: 470px;
						> .el-form-item__content{
							width: 100%;
						}
					}
				}
			}
			.discountPrice{
				.el-form-item__label{
					color: red;
				}
			}
			.hasintr{
				.el-form-item__content{
					position: relative;
				}
				.addintr{
					position: absolute;
					left:480px;
					top: 0;
					width: 400px;
					line-height: 30px;
					font-size: 12px;
					height: 30px;
				}
				.red{
					color:red;
				}
			}
		}

		//开票信息
		.invoice_info{border-top: 1px solid #DFE2E5;padding-top: 30px;
			.input_text{
				font-size: 14px;color: #556677;
				p.apply_name{
					line-height: 21px;min-height: 8px;word-break: break-all;
					.name_toggle{padding-left: 10px;cursor: pointer;}
					.name_toggle:hover{color: #479CFF}
				}
				p.tip{color: #A8AFB5;line-height: 14px;}
			}
			.invoice_template{top: 30px;}
		}

		.confirm_btn{width:310px;margin:40px auto 0;
			p{padding:0 30px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height:30px;text-align:center;cursor: pointer;}
			p:hover{border-color: #408CE6;color: #408CE6;}
			.btn_bg{background-color:#479CFF;color:#fff;}
			.btn_bg:hover{border-color: #408CE6;background-color: #408CE6;color:#fff;}
		}

		/* .el-checkbox{vertical-align: top;margin-right:30px;margin-top: 10px;}
		.el-checkbox .el-checkbox__label{font-size: 12px;color: #556677;width:130px;display:inline-block;word-wrap:break-word;word-break:break-all; white-space:pre-wrap;vertical-align: top;padding-left: 10px;}
		.el-checkbox+.el-checkbox{margin-left: 0;} */
		.el-select .el-input .el-input__icon{-ms-transform:translateY(-50%) rotate(180deg) !important;}
		.is-checked.el-radio__input .el-radio__inner::after{-ms-transform:translate(-50%, -50%) scale(1) !important;}
	}
	.el-popover{
		font-size: 13px;min-width:130px;box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);
		.popover_til{
			text-align: center;color: #556677;line-height: 17px;margin-bottom: 6px;
		}
		.popover_btn{
			text-align: right;
			.confirm_btn{color: #479CFF;}
			.cancel_btn{margin-right: 15px;}
		}
	}
</style>
