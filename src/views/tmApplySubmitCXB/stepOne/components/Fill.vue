<template>
	<div class="stepTwoFillCXB" v-loading="loading" element-loading-text="拼命加载中">
		<div class="notPassReason" v-if="infoDetailData.auditingReasons">申报资料审核不通过，请重新提交；不通过原因：{{infoDetailData.auditingReasons}}</div>
		<!-- 主体信息 -->
		<div class="common_c main_body" v-if="!loading">
			<p class="mb20">主体信息</p>
			<el-form class="common_c_form main_body_form" ref="ruleForm" :model="ruleForm" :rules="rules" :inline="true" auto-complete="off" label-width="140px">
				<el-form-item label="主体类型">
	        <el-radio class="radio" v-if="apply_type==1" v-model="apply_type" :label="1">大陆个体</el-radio>
	  			<el-radio class="radio" v-if="apply_type==2" v-model="apply_type" :label="2">大陆企业</el-radio>
	  			<el-radio class="radio" v-if="apply_type==3" v-model="apply_type" :label="3">港澳台及境外个人</el-radio>
	  			<el-radio class="radio" v-if="apply_type==4" v-model="apply_type" :label="4">港澳台及境外企业</el-radio>
	      </el-form-item>
	      <div v-if="apply_type==1">
		      <el-form-item label="申请人姓名" prop="apply_name">
		        <el-input size="small" v-model="ruleForm.apply_name" :maxlength="20" placeholder="请填写申请人姓名，与身份证信息保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人身份证号码" prop="apply_number">
		        <el-input size="small" v-model="ruleForm.apply_number" :maxlength="18" placeholder="请填写申请人身份证号码，与身份证信息保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人联系电话" prop="apply_phone">
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
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby1'" :url="standby1" :fileName="standby1_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传申请人身份证正反面复印件，并签署申请人签名</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby1_user" style="padding-top:8px;"><a target="_blank" :href="standby1_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的身份证复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	        <el-form-item label="个体工商户营业执照副本复印件（需签名）" >
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby2'" :url="standby2" :fileName="standby2_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传个体工商户营业执照副本复印件，并签署申请人签名</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby2_user" style="padding-top:8px;"><a target="_blank" :href="standby2_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的个体工商户营业执照副本复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	      </div>
	      <div v-if="apply_type==2">
		      <el-form-item label="申请人企业名称" prop="apply_name">
		        <el-input size="small" v-model="ruleForm.apply_name" :maxlength="60" placeholder="请填写申请人企业名称，与企业营业执照信息保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="统一社会信用代码" prop="apply_number">
		        <el-input size="small" v-model="ruleForm.apply_number" :maxlength="18" placeholder="请填写统一社会信用代码"></el-input>
		      </el-form-item>
		      <el-form-item label="企业联系电话" prop="apply_phone">
		        <el-input size="small" v-model="ruleForm.apply_phone" :maxlength="13" placeholder="请填写企业联系电话，固话前请加区号"></el-input>
		      </el-form-item>
		      <el-form-item label="企业注册地址" required>
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
		        <el-input size="small" v-model="ruleForm.zip_code" :maxlength="6" placeholder="请填写申请企业地址的邮政编码"></el-input>
		      </el-form-item>
	        <el-form-item label="企业营业执照副本复印件（加盖公章）">
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby1'" :url="standby1" :fileName="standby1_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传企业营业执照副本复印件，并加盖企业公章</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby1_user" style="padding-top:8px;"><a target="_blank" :href="standby1_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的企业营业执照副本复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item>
	      </div>

	      <div v-if="apply_type==3">
	      	<div style="min-height: 630px;">
		      <el-form-item label="申请人姓名（英文）" prop="name_en">
		        <el-input size="small" v-model="ruleForm.name_en" :maxlength="60" placeholder="请填写申请人英文姓名，应与能够证明其身份的有效证件保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人姓名（中文）" prop="apply_name">
		        <el-input size="small" v-model="ruleForm.apply_name" :maxlength="60" placeholder="请填写申请人中文姓名，应与能够证明其身份的有效证件保持一致"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人护照号" prop="apply_number">
		        <el-input size="small" v-model="ruleForm.apply_number" :maxlength="30" placeholder="请填写申请人护照号"></el-input>
		      </el-form-item>
		      <el-form-item label="申请人联系电话" prop="apply_phone">
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
	        <!-- <el-form-item label="中文护照译本">
	        	<div class="upload_component">
	        		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :valueName="'standby2'" :url="standby2" :fileName="standby2_name" :size="5" :extensions="'pdf,jpg,jpeg,bmp,png'"></uploader>
	        		<div class="upload_tip">
	        			<p>请上传中文护照译本复印件，并签署申请人签名</p>
	        			<p class="format">支持pdf/jpg/jpeg/bmp/png，文件大小限5MB以内</p>
	        			<p v-if="standby2_user" style="padding-top:8px;"><a target="_blank" :href="standby2_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的中文护照译本复印件</a></p>
	        		</div>
	        	</div>
	        </el-form-item> -->
	        </div>
	      </div>

	      <div v-if="apply_type==4">
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

	      <el-form-item class="btn_wrap" label=" " style="margin-top:10px;">
        	<button class="reset" @click.prevent="resetRuleForm">重置</button>
        	<button class="saveT" @click.prevent="saveT('ruleForm')" v-show="spSubjectTData.length<5">存新模板</button>
        	<button class="saveT" @click.prevent="saveT('ruleForm', true)" v-if="isTemplateEdit">保存修改</button>
        </el-form-item>

	      <!-- 图片上传暂时预留，待开发配套插件 -->
	    </el-form>

	    <div class="common_c_template main_body_template" v-if="infoDetailData.member_id">
	    	<div class="common_c_template_in">
		    	<h4>请选择主体信息模板</h4>
		    	<div class="template_c custom">
			    	<p>客户保存的：</p>
			    	<ul class="custom_list">
			    		<li :class="{cur: memberSubjectIdx === index}" v-for="(item, index) in memberSubjectTData" @click="setCurSubject(item, 'memberSubjectIdx', index)">
			    			<span class="name">{{item.apply_type|subjectTypeFormat}} | {{item.apply_name}}</span>
			    		</li>
			    		<li v-if="!memberSubjectTData.length">暂无</li>
			    	</ul>
		    	</div>
		    	<div class="template_c my">
			    	<p>我保存的：(客户不可见，且不超过5件)</p>
			    	<ul class="my_list">
			    		<li :class="{cur: spSubjectIdx === index}" v-for="(item, index) in spSubjectTData" @click="setCurSubject(item, 'spSubjectIdx', index)">
			    			<span class="name">{{item.apply_type|subjectTypeFormat}} | {{item.apply_name}}</span>
			    			<el-popover placement="bottom" width="125" trigger="click" class="del">
								  <p class="popover_til">是否删除该模板？</p>
	                <div class="popover_btn">
	                  <button class="cancel_btn" @click="hidePop">否</button><button class="confirm_btn" @click.stop="delTemplate(item.apply_id)">是</button>
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

    <!-- 联系人信息 -->
    <div class="common_c contactInfo">
	    <p class="mb20">联系人信息</p>
			<el-form class="common_c_form basic_info" ref="tmForm" :model="contactInfo" :rules="tmFormRules" :inline="true" auto-complete="off" label-width="140px" v-if="!loading" style="width: 700px">
	      <el-form-item class="addAddress" label="联系人姓名" prop="contact_name">
	        <el-input type="text" v-model="contactInfo.contact_name" placeholder="请填写联系人姓名" :maxlength="20"></el-input>
	      </el-form-item>
	      <el-form-item class="addAddress" label="联系人电话" prop="contact_phone">
	        <el-input type="text" v-model="contactInfo.contact_phone" placeholder="请填写联系人电话" :maxlength="13"></el-input>
	      </el-form-item>
	      <el-form-item class="addAddress" label="联系人邮箱" prop="contact_email">
	        <el-input type="text" v-model="contactInfo.contact_email" placeholder="请填写联系人电话" :maxlength="50"></el-input>
	      </el-form-item>
	      <el-form-item class="addAddress" label="联系人地址" required>
          <el-form-item class="form-ipt-sm" prop="contact_province_id">
            <el-select v-model="contactInfo.contact_province_id" clearable filterable default-first-option placeholder="请选择省" @change="changeProvince('contactInfo', contactInfo.contact_province_id, 'contact_')">
              <SebeOption v-for="item in provinceData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
            </el-select>
          </el-form-item>
          <el-form-item class="form-ipt-sm" prop="contact_city_id">
            <el-select v-model="contactInfo.contact_city_id" clearable filterable default-first-option placeholder="请选择市" @change="changeCity('contactInfo', contactInfo.contact_city_id, 'contact_')">
              <SebeOption v-for="item in contact_cityData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
            </el-select>
          </el-form-item>
          <el-form-item class="form-ipt-sm form-ipt-last" prop="contact_area_id">
            <el-select v-model="contactInfo.contact_area_id" clearable filterable default-first-option placeholder="请选择区">
              <SebeOption v-for="item in contact_areaData" :label="item.name" :filterLabel="item.name+(item.areaPinYin || '')+(item.areaPinYinAbbr || '')" :value="item.area_id" :key="item.area_id"></SebeOption>
            </el-select>
          </el-form-item>
          <el-form-item class="address" prop="contact_address">
            <el-input v-model="contactInfo.contact_address" :maxlength="80" placeholder="请填写具体地址" auto-complete="off" class="form-ipt"></el-input>
          </el-form-item>
          <a class="fill_address" @click="fillAddress('contactInfo', 'ruleForm', 'contact_', '')">复用主体地址</a>
        </el-form-item>
	      <el-form-item class="addAddress" label="邮政编码" prop="contact_zip_code">
	        <el-input type="text" v-model="contactInfo.contact_zip_code" placeholder="请填邮政编码" :maxlength="6"></el-input>
	      </el-form-item>
	    </el-form>
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
	          <a class="fill_address" @click="fillAddress('invoiceForm', 'contactInfo', 'send_', 'contact_')">复用联系人地址</a>
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
		          <a class="fill_address" @click="fillAddress('invoiceForm', 'contactInfo', 'send_', 'contact_')">复用联系地址</a>
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
		          <a class="fill_address" @click="fillAddress('invoiceForm', 'contactInfo', 'send_', 'contact_')">复用联系人地址</a>
		        </el-form-item>
		      </div>

		      <el-form-item class="btn_wrap" label=" " style="margin-top:10px;">
	        	<button class="reset" @click.prevent="resetInvoiceForm()">重置</button>
	        	<button class="saveT" @click.prevent="saveT('invoiceForm')" v-show="spInvoiceTData.length<5">存新模板</button>
	        	<button class="saveT" @click.prevent="saveT('invoiceForm', true)" v-if="isInvoiceTplEdit">保存修改</button>
	        </el-form-item>
        </template>
	    </el-form>
	    <div class="common_c_template invoice_template" v-show="apply_type==2 && needInvoice">
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
	                  <button class="cancel_btn" @click="hidePop">否</button><button class="confirm_btn" @click.stop="delInvoiceTemplate(item.member_invoiceId)">是</button>
	                </div>
								  <span class="el-icon-delete" slot="reference" @click.stop></span>
								</el-popover>
			    		</li>
			    		<li v-if="!spInvoiceTData.length">暂无</li>
			    	</ul>
		    	</div>
	    	</div>
	    </div>
		</div>

		<!-- 底部按钮 -->
    <div class="confirm_btn clearfix" v-if="!loading">
			<p class="fl" @click="saveDraft()">存草稿</p>
			<!-- <p class="fl mr10" @click="prev">上一步</p> -->
			<p class="fl ml10 btn_bg" @click="nextTo">下一步</p>
		</div>
	</div>
</template>
<script>
	import FillJs from './Fill.js';
	export default FillJs;
</script>
<style lang='less'>
	//公用
	.notPassReason{display: inline-block;font-size: 12px;height: 26px;line-height: 26px;background: #F64744;border-radius: 100px;color: #FFFFFF;padding:0 40px;position: relative;left:50%;transform:translateX(-50%); }
	.stepTwoFillCXB{
		padding:60px 90px;background-color:#fff;min-height: 500px;
		.notPassReason{top:-40px;}
		// 字体淡黄色
		.cy{color: #F5A623;}
		label{text-align:left;}
		//上下两部分共用
		.common_c{
			margin:0 auto;overflow:hidden;width: 1200px;
			>p{font-size: 16px;color: #223344;}
			//表单 上下两部分共用
			.common_c_form{
				float: left;width:700px;padding-bottom:2000px;margin-bottom:-2000px;background-color: #fff;
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
					.el-radio__label{color:#556677;}
				}
				.el-input__inner{height: 30px;}
				.el-input__inner,.el-textarea__inner{font-size: 13px;border-radius:2px;}
				.el-checkbox__inner{width: 16px;height: 16px;border-radius: 2px;}
				.el-checkbox__inner::after{left: 4px;top: 0;}
			}
			//模板 上下两部分共用
			.common_c_template{
				float: right;width:320px; margin-right: 170px;margin-top: -43px;background: #FFFFFF;padding-bottom:2000px;margin-bottom:-2000px;
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
			padding-bottom: 35px;
		}

		//联系人信息
		.contactInfo{
			border-top: 1px solid #DFE2E5;padding-top: 30px;
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

		.confirm_btn{width:210px;margin:40px auto 0;
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
