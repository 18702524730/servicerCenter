<template>
<div class="qinquan">
  <div class="form">
    <div class="dataviewtab" v-if="caseSysNo!=0">
      <span class="tabbtn" :class="{active:now==1}" @click="now=1">基本信息</span><span class="tabbtn" :class="{active:now==2}" @click="now=2">案件材料</span><span class="tabbtn backbtn" @click="toback">返回</span>
    </div>
    <div class="basic_lists revise" v-show="now==1">
      <div class="basic_category clearfix">
        
        <div class="itembasic">
          <el-form ref="form1" label-width="270px" :model="addData">
            <el-form-item label="业务员：">
              <el-input type="text" v-model="addData.salesman" placeholder="请填写业务员" ></el-input>
            </el-form-item>
            <el-form-item label="提交日期：" class="spec">
              <el-date-picker
                v-model="addData.submitDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="订单来源：">
              <el-input type="text" v-model="addData.orderSource" placeholder="请填订单来源" ></el-input>
            </el-form-item>
            <el-form-item label="业务类型：">
              <el-select v-model="addData.businessType">
                <el-option v-for="item in businessTypearr" :key="item.id" :label="item.label" :value="item.label">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单编号：">
              <el-input type="text" v-model="addData.orderNo" placeholder="请填写订单编号" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input type="text" v-model="addData.email" placeholder="请填写邮箱" ></el-input>
            </el-form-item>
            <el-form-item label="申请人：">
              <el-input type="text" v-model="addData.applicant" placeholder="请填写申请人" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input type="text" v-model="addData.contacts" placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系号码：">
              <el-input type="text" v-model="addData.contactsPhone" placeholder="请填写联系号码"></el-input>
            </el-form-item>
            <el-form-item label="代理专员：">
              <el-input type="text" v-model="addData.agentCommissioner" placeholder="请填写代理专员"></el-input>
            </el-form-item>

            <el-form-item label="商标名称：">
              <el-input type="text" v-model="addData.trademarkName" placeholder="请填写商标名称" ></el-input>
            </el-form-item>
            <el-form-item label="类别：">
              <el-input type="text" v-model="addData.category" placeholder="请填写类别" ></el-input>
            </el-form-item>
            <el-form-item label="注册号：">
              <el-input type="text" v-model="addData.registerNo" placeholder="请填写注册号"></el-input>
            </el-form-item>
            <el-form-item label="官费：">
              <el-input type="text" v-model="addData.officialFees" placeholder="请填写官费"></el-input>
            </el-form-item>
            <el-form-item label="服务费：">
              <el-input type="text" v-model="addData.serviceCharge" placeholder="请填写服务费"></el-input>
            </el-form-item>
            <el-form-item label="总金额：">
              <el-input type="text" v-model="addData.totalAmount" placeholder="请填写总金额"></el-input>
            </el-form-item>
            <el-form-item label="付款人：">
              <el-input type="text" v-model="addData.payer" placeholder="请填写付款人" ></el-input>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-select v-model="addData.payType">
                <el-option v-for="item in payTypearr" :key="item.id" :label="item.label" :value="item.label">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款日期：" class="spec">
              <el-date-picker
                v-model="addData.payTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="账务确认收款金额：">
              <el-input type="text" v-model="addData.confirmAmountCollected" placeholder="请填写账务确认收款金额" ></el-input>
            </el-form-item>

            <el-form-item label="确认收款日期：" class="spec">
              <el-date-picker
                v-model="addData.confirmAmountDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="确认收款人员：">
              <el-input type="text" v-model="addData.confirmAmountPeople" placeholder="请填写确认收款人员" ></el-input>
            </el-form-item>
            <el-form-item label="业务审核：">
              <el-input type="text" v-model="addData.businessCheck" placeholder="请填写业务审核" ></el-input>
            </el-form-item>
            <el-form-item label="汇款人（渠道填写）：">
              <el-input type="text" v-model="addData.remitterChannel" placeholder="请填写汇款人" ></el-input>
            </el-form-item>
            <el-form-item label="拾贝结算渠道金额（渠道填写）：">
              <el-input type="text" v-model="addData.sebeSettleChannel" placeholder="请填写拾贝结算渠道金额" ></el-input>
            </el-form-item>
            <el-form-item label="渠道结算拾贝金额（渠道填写）：">
              <el-input type="text" v-model="addData.channelSettleSebe" placeholder="请填写渠道结算拾贝金额" ></el-input>
            </el-form-item>
            <el-form-item label="开票抬头：">
              <el-input type="text" v-model="addData.invoiceTitle" placeholder="请填写开票抬头" ></el-input>
            </el-form-item>
            <el-form-item label="发票类型：">
              <el-radio v-model="addData.invoiceType" label="普票">普票</el-radio>
              <el-radio v-model="addData.invoiceType" label="专票">专票</el-radio>
            </el-form-item>
            <el-form-item label="社会统一信用代码或身份证号：">
              <el-input type="text" v-model="addData.idNumber" placeholder="请填写社会统一信用代码或身份证号" ></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号：">
              <el-input type="text" v-model="addData.taxpayerNumber" placeholder="请填写纳税人识别号" ></el-input>
            </el-form-item>

            <el-form-item label="申报日期：" class="spec">
              <el-date-picker
                v-model="addData.reportTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="申报员：">
              <el-input type="text" v-model="addData.reporter" placeholder="请填写申报员" ></el-input>
            </el-form-item>
            <el-form-item label="申请号：">
              <el-input type="text" v-model="addData.applicationNo" placeholder="请填写申请号" ></el-input>
            </el-form-item>
            <el-form-item label="报送方式（纸报/网报）：">
              <el-radio v-model="addData.submissionMethod" label="纸报">纸报</el-radio>
              <el-radio v-model="addData.submissionMethod" label="网报">网报</el-radio>
            </el-form-item>
            <el-form-item label="服务费发票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.serviceChargeInvoiceNumber" placeholder="请填写服务费发票号" disabled></el-input>
            </el-form-item>
            <el-form-item label="官费发票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.officialFeesInvoiceNumber" placeholder="请填写官费发票号" disabled></el-input>
            </el-form-item>
            <el-form-item label="开票日期：" class="spec" v-if="caseSysNo!=0" >
              <el-date-picker
                v-model="addData.billingDate"
                type="date"
                disabled
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发票收件人：">
              <el-input type="text" v-model="addData.invoiceRevicer" placeholder="请填写发票收件人" ></el-input>
            </el-form-item>
            <el-form-item label="发票收件电话：">
              <el-input type="text" v-model="addData.invoiceRevicerPhone" placeholder="请填写发票收件电话" ></el-input>
            </el-form-item>
            <el-form-item label="发票收件地址：">
              <el-input type="text" v-model="addData.invoiceRevicerAddress" placeholder="请填写发票收件地址" ></el-input>
            </el-form-item>

            <el-form-item label="发票快递单号：">
              <el-input type="text" v-model="addData.invoiceExpressNumber" placeholder="请填写发票快递单号" ></el-input>
            </el-form-item>
            <el-form-item label="发票邮寄方式：">
              <el-input type="text" v-model="addData.invoicePostType" placeholder="请填写发票邮寄方式" ></el-input>
            </el-form-item>
            <el-form-item label="发票邮寄日期：" class="spec">
              <el-date-picker
                v-model="addData.invoicePostTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="缴费通知书：">
              <el-input type="text" v-model="addData.payNotice" placeholder="请填写缴费通知书"></el-input>
            </el-form-item>
            <el-form-item  label="准予注册决定书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.permitRegisterDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="补正收文日期：" class="spec">
              <el-date-picker
                v-model="addData.updateReceiptDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="补正二次收文：">
              <el-input type="text" v-model="addData.updateReceiptSecondDate" placeholder="请填写补正二次收文"></el-input>
            </el-form-item>
            <el-form-item  label="不予受理收文日期：" class="spec">
              <el-date-picker
                v-model="addData.dismissReceiptDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="不予核准收文日期：" class="spec">
              <el-date-picker
                v-model="addData.dismissCheckReceiptDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="不予注册收文日期：">
              <el-input type="text" v-model="addData.forbidRegisterDate" placeholder="请填写不予注册收文日期"></el-input>
            </el-form-item>

            <el-form-item label="受通收文日期：">
              <el-input type="text" v-model="addData.acceptReceiptDate" placeholder="请填写受通收文日期"></el-input>
            </el-form-item>
            <el-form-item  label="驳回通知日期：" class="spec">
              <el-date-picker
                v-model="addData.rejectNoticeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="初审收文日期：">
              <el-input type="text" v-model="addData.firstcheckRejectDate" placeholder="请填写初审收文日期"></el-input>
            </el-form-item>
            <el-form-item  label="异议申请受通收文日期：" class="spec">
              <el-date-picker
                v-model="addData.objectionApplyDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="异议材料补正通知收文日期：" class="spec">
              <el-date-picker
                v-model="addData.objectionStaffDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="准予撤回收文日期：">
              <el-input type="text" v-model="addData.grantRecallReceiptDate" placeholder="请填写准予撤回收文日期" ></el-input>
            </el-form-item>
            <el-form-item  label="变更、更正商标申请/注册事项申请核准通知书收文日期：" class="spec toolong">
              <el-date-picker
                v-model="addData.updateTrademarkNoticeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="案件评审意见书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.caseReviewDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="变更证明收文日期：" class="spec">
              <el-date-picker
                v-model="addData.changeProveDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="续展证明收文日期：" class="spec">
              <el-date-picker
                v-model="addData.extensionProveDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="商标证收文：">
              <el-input type="text" v-model="addData.trademarkErtificateReceipt" placeholder="请填写商标证收文" ></el-input>
            </el-form-item>
            <el-form-item  label="转让证明收文日期：" class="spec">
              <el-date-picker
                v-model="addData.transferProveDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="补发注册证收文日期：" class="spec">
              <el-date-picker
                v-model="addData.reissueRegisterDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商标评审申请受通通知书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.trademarkReviewApplyDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商标评审案件证据交换通知书：" class="spec">
              <el-date-picker
                v-model="addData.trademarkReviewProveDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="驳回复审决定书收文日期：" >
              <el-input type="text" v-model="addData.rejectReviewDate" placeholder="请填写驳回复审决定书收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="评审案件结案通知书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.reviewCaseDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商标使用许可备案通知收文日期：" >
              <el-input type="text" v-model="addData.trademarkUseDate" placeholder="请填写商标使用许可备案通知收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="提供注册商标使用证据的通知收文日期：" class="spec">
              <el-date-picker
                v-model="addData.provideRegisterDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="异议决定书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.disDecisionDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="异议撤回结案通知：">
              <el-input type="text" v-model="addData.disRecallNotice" placeholder="请填写异议撤回结案通知" ></el-input>
            </el-form-item>
            <el-form-item label="撤三决定书收文日期：">
              <el-input type="text" v-model="addData.recallThreeDate" placeholder="请填写撤三决定书收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="视为放弃通知书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.asGiveupDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="核准注销通知书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.checkCancellationDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="无效宣告请求裁定书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.nullificationDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="变更商标申请人名义/地址核准通知书收文日期：" class="spec toolong">
              <el-date-picker
                v-model="addData.changeApplyerDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="撤三申请结案通知：" class="spec">
              <el-date-picker
                v-model="addData.recallThreeCloseDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="官文收件人：" >
              <el-input type="text" v-model="addData.officialRecevier" placeholder="请填写官文收件人" ></el-input>
            </el-form-item>
            <el-form-item label="官文收件人电话：">
              <el-input type="text" v-model="addData.officialRecevierPhone" placeholder="请填写官文收件人电话" ></el-input>
            </el-form-item>
            <el-form-item label="官文收件地址：">
              <el-input type="text" v-model="addData.officialRecevierAddress" placeholder="请填写官文收件地址" ></el-input>
            </el-form-item>

            <el-form-item label="官文快递单号：">
              <el-input type="text" v-model="addData.officialExpressNo" placeholder="请填写官文快递单号" ></el-input>
            </el-form-item>
            <el-form-item label="官文寄件时间：" class="spec">
              <el-date-picker
                v-model="addData.officialPostDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="官文邮寄方式：">
              <el-input type="text" v-model="addData.officialPostType" placeholder="请填写官文邮寄方式" ></el-input>
            </el-form-item>
            <el-form-item label="经营平台：">
              <el-input type="text" v-model="addData.businessPlatform" placeholder="请填写经营平台" ></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="text" v-model="addData.remarks" placeholder="请填写备注" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="涉及人员（业务员+代理专员）：">
              <el-input type="text" v-model="addData.involvePeople" placeholder="请填写涉及人员" ></el-input>
            </el-form-item> -->
          </el-form>
        </div> 
      </div>
      <div class="btnbox">
        <el-button size="large" type="primary" @click="tosubmit">确定</el-button>
        <span style="padding-left:100px;"></span>
        <el-button size="large" type="default" @click="toback">返回</el-button>
      </div>
    </div>
    <div v-show="now==2">
      <div class="basic_lists materialbox">
          <div class="basictitle">
            <h3>案件材料</h3>
          </div>
          <!-- <div>
            <el-button type="primary">上传</el-button>
            <span class="tips">备注：请以压缩包形式上传，压缩包格式支持rar/zip两种</span>
          </div> -->
          <div class="upload_component" style="margin-bottom:20px;">
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=3&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
            <div class="upload_tip">
              <p v-if="standby8_name">已上传：{{decodeURIComponent(standby8_name)}}</p>
            </div>
          </div>
          <ul class="otherdata" v-if='standby8_Data.length>0'>
            <li v-for="(file,index) in standby8_Data" :key="file.id">
              <div>
                <span class="mr20">上传日期：{{file.createTime|dateFormat}}</span>
                <span class="mr20">操作人：{{file.operatorName}}</span>
                <span>
                  <span>材料：</span>
                  <span class="ziliao">{{decodeURIComponent(file.fileName)}}</span>
                  <span class="downloadbtn" @click="preview(file.url)">预览</span>
                  <a :href="rootUrl+'/api/downFile?access_token='+token+'&url='+file.url" target="_blank"  class="downloadbtn">下载</a>
                  <span class="downloadbtn" @click="otherDel('standby8',file)">删除</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
    </div>
    <el-dialog
      :visible.sync="dialogImg"
      size="tiny"
      :modal-append-to-body="true"
      class="dataview_img_preview"
    >
      <el-carousel :interval="5000" arrow="always" :autoplay="false" trigger="click">
        <el-carousel-item v-for="(item,$index) in proxyImg" :key="$index">
          <img :src="item" alt />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
  
</div>
  
</template>

<script>
import {store} from 'utils/';
import pasuploader from 'cps/pasuploader/uploader.vue'
import VueCookie from "vue-cookie";
import Filters from 'utils/filters/filters.js'
const delOtherMaterialUrl = './api/deleteFile'

const initdata = {
  "salesman": '',
  "submitDate": "",
  "orderSource": '',
  "businessType": "",
  "orderNo": '',
  "email": '',
  "applicant": "",
  "contacts": "",
  "contactsPhone": '',
  "agentCommissioner": "",

  "trademarkName": "",
  "category": '',
  "registerNo": "",
  "officialFees": "",
  "serviceCharge": '',
  "totalAmount": '',
  "payer": '',
  "payType": "",
  "payTime": "",
  "confirmAmountCollected": "",

  "confirmAmountDate": '',
  "confirmAmountPeople": '',
  "businessCheck": "",
  "remitterChannel": "",
  "sebeSettleChannel": '',
  "channelSettleSebe": "",
  "invoiceTitle": '',
  "invoiceType": '',
  "idNumber": "",
  "taxpayerNumber": "",

  "reportTime": '',
  "reporter": "",
  "applicationNo": "",
  "submissionMethod": '',
  "serviceChargeInvoiceNumber": "",
  "officialFeesInvoiceNumber": "",
  "billingDate": '',
  "invoiceRevicer": '',
  "invoiceRevicerPhone": '',
  "invoiceRevicerAddress": "",

  "invoiceExpressNumber": "",
  "invoicePostType": "",
  "invoicePostTime": '',
  "payNotice": '',
  "permitRegisterDate": "",
  "updateReceiptDate": "",
  "updateReceiptSecondDate": '',
  "dismissReceiptDate": "",
  "dismissCheckReceiptDate": '',
  "forbidRegisterDate": '',
  
  "acceptReceiptDate": "",
  "rejectNoticeDate": "",
  "firstcheckRejectDate": '',
  "objectionApplyDate": '',
  "objectionStaffDate":'',
  "grantRecallReceiptDate": "",
  "updateTrademarkNoticeDate": "",
  "caseReviewDate": '',
  "changeProveDate": "",
  "extensionProveDate": '',

  "trademarkErtificateReceipt": '',
  "transferProveDate": "",
  "reissueRegisterDate": "",
  "trademarkReviewApplyDate": '',
  "trademarkReviewProveDate": '',
  "rejectReviewDate": "",
  "reviewCaseDate": "",
  "trademarkUseDate": '',
  "provideRegisterDate": "",
  "disDecisionDate": '',

  "disRecallNotice": '',
  "recallThreeDate": "",
  "asGiveupDate": "",
  "checkCancellationDate": '',
  "nullificationDate": '',
  "changeApplyerDate": '',
  "recallThreeCloseDate": "",
  "officialRecevier": "",
  "officialRecevierPhone": '',
  "officialRecevierAddress": "",

  "officialExpressNo": '',
  "officialPostDate": "",
  "officialPostType": "",
  "businessPlatform": "",
  "remarks": '',
  // "involvePeople": '',
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createTradeMarkOther'
const detailUrl = './api/selectTradeMarkOther'
const businessTypearr = [
  {id:1,label:'驳回复审'},
  {id:2,label:'变更'},
  {id:3,label:'补证'},
  {id:4,label:'更正'},
  {id:5,label:'转让'},
  {id:6,label:'续展'},
  {id:7,label:'异议申请'},
  {id:8,label:'撤三答辩'},
  {id:9,label:'商标撤回'},
  {id:10,label:'无效宣告'},
  {id:11,label:'商标异议'},
  {id:12,label:'许可备案'},
  {id:13,label:'撤销三年不使用'},
  {id:14,label:'异议答辩'},
  {id:15,label:'商标设计'},
  {id:16,label:'营业执照办理'},
  {id:17,label:'商标交易'},
  {id:18,label:'疑难代理'},
  {id:19,label:'受通加急'},
  {id:20,label:'变更加急'},
  {id:21,label:'补正'},
  {id:22,label:'宽展'},
  {id:23,label:'品牌风险检索及报告分析'},
  {id:24,label:'同日申请使用证据整理'},
  {id:25,label:'品牌维权'},
  {id:26,label:'商标驳回审查意见答辩'},
  {id:27,label:'条形码'},
  {id:28,label:'注销'},
  {id:29,label:'无效宣告答辩'},
  {id:30,label:'诉讼'},
  {id:31,label:'暂缓审查意见书书面申请'},
  {id:32,label:'海关备案'},
  {id:33,label:'无效宣告质证'},
]
const payTypearr = [
  {id:1,label:'拾贝网'},
  {id:2,label:'转账'},
  {id:3,label:'支付宝'},
  {id:4,label:'不予受理重新申报'},
  {id:5,label:'对公转账'},
  {id:6,label:'对公'},
  {id:7,label:'月结'},
  {id:8,label:'拾贝网支付宝'},
  {id:9,label:'扣除SCN0044当月服务费'},
  {id:10,label:'微信'},
  {id:11,label:'网银'},
]
export default {
    name:'othertrademarkaddcps',
    data(){
        return{
            addData:Object.assign({},initdata),
            caseSysNo:'',
            businessTypearr: businessTypearr,
            payTypearr: payTypearr,
            ywyList:[],

            standby8:'',
            standby8_Data:[],
            standby8_name:'',
            token:'',
            proxyImg:[],
            dialogImg: false,
            rootUrl:CONFIG.rootUrl,
            nowurl:[],
            now: 1
        }
    },
    components:{
      pasuploader
    },
    filters:{
      dateFormat: Filters.formatDate.dateFormat
    },
    watch:{
      now(){
        if(this.now==2){
          this.getcailiao()
        }
      }
    },
    mounted(){
      // store.remove('pas_patent_data')
      this.caseSysNo = this.$route.params.id;
      this.token = VueCookie.get('service_token');
      // this.findywy()
      if(this.caseSysNo!=0){
        let data = {
          id: this.caseSysNo
        }
        this.$http.get(detailUrl,{params: data}).then(res=>{
          this.addData = res.data;
        //   let subdata = Object.assign({},this.addData);
        //   this.addData = subdata
          console.log(res.data)
        })
      }
    },
    methods:{
      getcailiao(){
        let data = {
          offlineType:3,
          offlineId: this.caseSysNo  
        }
        this.$http.get('./api/selectFile',{params:data}).then(res=>{
          this.standby8_Data = res.data.elements.reverse()||[]
        })
      },
      setUploadedMaterial(data){
        var dat = data.data;
        let d = Object.assign({},dat)
        // let isrepeat= false;
        let md= this[data.valueName+'_Data'];
        //  for(let i=0;i<md.length;i++){
        //    if(d.url == md[i]['url']){
        //      isrepeat = true;
        //      break;
        //    }
        //  }
        //  if(!isrepeat){
        //     md.unshift(d)
        //   }
        // this.nowurl.push(d)
        // if(this.nowurl.length==2){
        //   md.unshift(d);
        //   this.nowurl = []
        // }
				if (d.url) {

					this[data.valueName]= d.url;
          this[data.valueName+'_name']= d.fileName;
          md.unshift(d);
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
        }
        console.log(data)
      },
      resetUploader(valueName){
          this[valueName] = '';
          this[valueName+'_name'] = '';
      },
      uploaderErrCallback(data){
          this.$alert(data.msg);
      },
      certificatePreview(url) {
        this.proxyImg = url;
        this.dialogImg = true;
      },
      preview(src) {
        this.$http.get("./api/preview?pdf_url=" + src)
          .then(response => {
            let urls = response.data.urls;
            if(urls){
              this.certificatePreview(urls)
            }else{
              this.$message.warning('预览失败')
            }
          })
          .catch(error => {
            this.$message({
              message: "该文件无法预览",
              type: "error"
            });
          });
        // this.imgsrc = src;
        // this.dialogVisible = true;
      },
      commonDel(aName,it){
        let datas = this[aName+'_Data'];
        for(let i=0;i<datas.length;i++){
          if(it.id ==datas[i]['id']){
            datas.splice(i,1);
            if(it.url==this[aName]){
              this.resetUploader(aName)
            }
            break;
          }
        }
        if(this[aName+'_Data'].length==0){
            this.resetUploader(aName)
        }
      },
      otherDel(nm,item){
        this.$confirm('您确定要删除吗？','提示',{
          confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
        }).then(res=>{
          this.$http.get(delOtherMaterialUrl+'?id='+item.id).then(res=>{
            this.commonDel(nm,item)
          })
          // this.commonDel(nm,item)
        })
        
      },
      findywy(){
        this.$http.get('./api/operatorList').then(res=>{
          this.ywyList = res.data||[]
        })
      },
      isNull(obj){
        let isnull = true;
        for( var key in obj){
          if(obj.hasOwnProperty(key)){
             if(obj[key]){
              isnull = false
            }
          }
         
        }
        return isnull
      },
      totimestamp(str) {
        return str?new Date(str-0).getTime():null
      },
      tosubmit(){
        if(this.isNull(this.addData)){
          this.$message({
            message:'请填写内容后再提交',
            type: 'warning'
          })
        }else{
          let subdata = Object.assign({},this.addData);
          subdata.submitDate = this.totimestamp(this.addData.submitDate);
          subdata.payTime = this.totimestamp(this.addData.payTime);
          subdata.confirmAmountDate = this.totimestamp(this.addData.confirmAmountDate);
          subdata.reportTime = this.totimestamp(this.addData.reportTime);
          subdata.billingDate = this.totimestamp(this.addData.billingDate);
          subdata.invoicePostTime = this.totimestamp(this.addData.invoicePostTime);

          subdata.permitRegisterDate = this.totimestamp(this.addData.permitRegisterDate);
          subdata.updateReceiptDate = this.totimestamp(this.addData.updateReceiptDate);
          subdata.dismissReceiptDate = this.totimestamp(this.addData.dismissReceiptDate);
          subdata.dismissCheckReceiptDate = this.totimestamp(this.addData.dismissCheckReceiptDate);
          subdata.forbidRegisterDate = this.totimestamp(this.addData.forbidRegisterDate);
          subdata.rejectNoticeDate = this.totimestamp(this.addData.rejectNoticeDate);

          subdata.objectionApplyDate = this.totimestamp(this.addData.objectionApplyDate);
          subdata.objectionStaffDate = this.totimestamp(this.addData.objectionStaffDate);
          subdata.caseReviewDate = this.totimestamp(this.addData.caseReviewDate);
          subdata.changeProveDate = this.totimestamp(this.addData.changeProveDate);
          subdata.extensionProveDate = this.totimestamp(this.addData.extensionProveDate);

          subdata.transferProveDate = this.totimestamp(this.addData.transferProveDate);
          subdata.reissueRegisterDate = this.totimestamp(this.addData.reissueRegisterDate);
          subdata.trademarkReviewApplyDate = this.totimestamp(this.addData.trademarkReviewApplyDate);

          subdata.trademarkReviewProveDate = this.totimestamp(this.addData.trademarkReviewProveDate);
          subdata.reviewCaseDate = this.totimestamp(this.addData.reviewCaseDate);
          subdata.provideRegisterDate = this.totimestamp(this.addData.provideRegisterDate);
          subdata.updateTrademarkNoticeDate = this.totimestamp(this.addData.updateTrademarkNoticeDate);

          subdata.disDecisionDate = this.totimestamp(this.addData.disDecisionDate);
          subdata.asGiveupDate = this.totimestamp(this.addData.asGiveupDate);
          subdata.checkCancellationDate = this.totimestamp(this.addData.checkCancellationDate);
          subdata.nullificationDate = this.totimestamp(this.addData.nullificationDate);
          subdata.changeApplyerDate = this.totimestamp(this.addData.changeApplyerDate);

          subdata.recallThreeCloseDate = this.totimestamp(this.addData.recallThreeCloseDate);
          subdata.officialPostDate = this.totimestamp(this.addData.officialPostDate);
          
          if(!this.caseSysNo){
            this.$http.post(addurl,subdata).then(res=>{
              this.$message.success('添加成功')
              this.addData = Object.assign({},initdata)
              this.$router.go(-1)
            }).catch(err => {
              this.$message({
                message: err.response.data.msg,
                type: "warning"
              });
            });
          }else{
            subdata.id = this.caseSysNo
            this.$http.post(addurl,subdata).then(res=>{
              this.$message.success('修改成功');
              this.$router.go(-1)
            }).catch(err => {
              this.$message({
                message: err.response.data.msg,
                type: "warning"
              });
            });
          }
          
        }
        
      },
      toback(){
        if(this.caseSysNo==0){
          this.$confirm('未保存的内容将会丢失', '确认离开此页吗？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.go(-1)
          }).catch(() => {
          });
        }else{
          this.$router.go(-1)
        }
      }
    }
}
</script>

<style lang='less'>
.dataviewtab{
  padding: 20px 30px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  .tabbtn{
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    background-color: #f5f5f5;
    color: #333;
    margin-right: 20px;
    cursor: pointer;
  }
  .backbtn{
    float: right;
  }
  .active{
    background-color:#379dea;
    color: #fff;
  }
}
.materialbox{
  padding: 30px;
  .basictitle{
    font-size: 14px;
    line-height: 30px;
  }
  .upload_component{
    position: relative;
    .upload_tip{
      position: absolute;left: 140px;bottom:0;max-width:600px;font-size: 12px;color: #556677;line-height: 16px;
      p{color: #A8AFB5; word-break: break-all;}
    }
  }
  .otherdata {
    padding: 20px 0;
    font-size: 14px;
    > li {
      margin-bottom: 10px;
    }
  }
  .ziliao {
    text-decoration: underline;
    margin-right: 20px;
  }
  .downloadbtn {
    color: #379dea;
    cursor: pointer;
    margin-right: 20px;
    white-space: nowrap;
  }
  .uploadbtn {
    font-size: 14px;
    color: #379dea;
    cursor: pointer;
  }
}
// 预览
.dataview_img_preview {
  .el-dialog--tiny {
    width: 940px;
    img {
      width: 900px;
    }
  }
}
.dataview_img_preview {
  .el-carousel {
    margin: 0 auto;
    width: 835px;
    .el-carousel__container {
      margin: 0 auto;
      height: 650px;
      .el-carousel__arrow {
        position: fixed;
      }
      .el-carousel__item {
        text-align: center;
        width: 810px;
        overflow-y: auto;
        img {
          width: 810px;
        }
      }
    }
  }
}
.qinquan{
  .form {
    .revise{
      padding:30px 0;
      input{
        width: 530px;
      }
      // textarea{
      //   width: 300px;
      // }
      .el-date-editor.el-input{
        width: 100%;
        
      }
      .spec{
        .el-input__inner{
          padding-left: 30px;
        }
      }
      .toolong{
          .el-form-item__label{
              line-height: 15px;
          }
      }
    }
    .itembasic{
      width:800px;
      padding-left: 30px;
      .el-input__icon {
        right:0;
        top: 0;
        line-height: 30px;
      }
      .el-form-item{
        margin-bottom: 15px;
      }
      .el-form-item__error{
        padding-top: 0;
      }
    }
    
  }
  .btnbox{
    padding-top: 30px;
    padding-left: 300px;
    text-align: left;
    .el-button--large{
      width: 150px;
    }
  }
}

</style>