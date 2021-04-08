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
            <el-form-item label="业务类型：">
              <el-input type="text" v-model="addData.businessType" placeholder="请填写业务类型" ></el-input>
            </el-form-item>
            <el-form-item label="业务名称：">
              <el-input type="text" v-model="addData.businessName" placeholder="请填业务名称" ></el-input>
            </el-form-item>
            <el-form-item label="客户类型：">
              <el-radio v-model="addData.customerType" label="新客户">新客户</el-radio>
              <el-radio v-model="addData.customerType" label="老客户">老客户</el-radio>
              <el-radio v-model="addData.customerType" label="公司分配/交办业务">公司分配/交办业务</el-radio> 
            </el-form-item>
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="addData.customerName" placeholder="请填写客户名称" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input type="text" v-model="addData.contacts" placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系号码：">
              <el-input type="text" v-model="addData.contactsPhone" placeholder="请填写联系号码"></el-input>
            </el-form-item>
            <el-form-item label="微信号：">
              <el-input type="text" v-model="addData.wechat" placeholder="请填写微信号" ></el-input>
            </el-form-item>
            <el-form-item label="买家旺旺：">
              <el-input type="text" v-model="addData.buyerWang" placeholder="请填写买家旺旺" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input type="text" v-model="addData.email" placeholder="请填写邮箱" ></el-input>
            </el-form-item>

            <el-form-item label="合同额（元）：">
              <el-input type="text" v-model="addData.contractAmount" placeholder="请填写合同额"></el-input>
            </el-form-item>
            <el-form-item label="服务费（元）：">
              <el-input type="text" v-model="addData.serviceCharge" placeholder="请填写服务费"></el-input>
            </el-form-item>
            <el-form-item label="收款金额（元）：">
              <el-input type="text" v-model="addData.amountCollected" placeholder="请填写收款金额"></el-input>
            </el-form-item>
            <el-form-item label="确认收款日期：" class="spec">
              <el-date-picker
                v-model="addData.confirmCollectionDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="提交日期：" class="spec">
              <el-date-picker
                v-model="addData.submitDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="订单来源：">
              <el-select v-model="addData.orderSource">
                <el-option v-for="item in orderSourcearr" :key="item.id" :label="item.label" :value="item.label">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单编号：">
              <el-input type="text" v-model="addData.orderNo" placeholder="请填写订单编号" ></el-input>
            </el-form-item>
            <el-form-item label="服务单号：">
              <el-input type="text" v-model="addData.serviceNo" placeholder="请填写服务单号" ></el-input>
            </el-form-item>
            <el-form-item label="需求编号：">
              <el-input type="text" v-model="addData.requirementNo" placeholder="请填写需求编号" ></el-input>
            </el-form-item>
            <el-form-item label="申请人：">
              <el-input type="text" v-model="addData.applicant" placeholder="请填写申请人" ></el-input>
            </el-form-item>

            <el-form-item label="通过率%：">
              <el-input type="text" v-model="addData.passRate" placeholder="请填写通过率百分比" ></el-input>
            </el-form-item>
            <el-form-item label="抽检员通过率：">
              <el-input type="text" v-model="addData.passCheckRate" placeholder="请填写抽检员通过率" ></el-input>
            </el-form-item>
            <el-form-item label="服务商：">
              <el-input type="text" v-model="addData.serviceProvider" placeholder="请填写服务商" ></el-input>
            </el-form-item>
            <el-form-item label="代理专员：">
              <el-input type="text" v-model="addData.agentCommissioner" placeholder="请填写代理专员"></el-input>
            </el-form-item>
            <el-form-item label="查询专员：">
              <el-input type="text" v-model="addData.selectCommissioner" placeholder="请填写查询专员"></el-input>
            </el-form-item>
            <el-form-item label="代理文书：">
              <el-input type="text" v-model="addData.selectDocument" placeholder="请填写代理文书"></el-input>
            </el-form-item>
            <el-form-item label="申报类别：">
              <el-input type="text" v-model="addData.declarationCategory" placeholder="请填写申报类别"></el-input>
            </el-form-item>
            <el-form-item label="加项：">
              <el-input type="text" v-model="addData.addition" placeholder="请填写加项"></el-input>
            </el-form-item>
            <el-form-item label="官费（元）：">
              <el-input type="text" v-model="addData.officialFees" placeholder="请填写官费"></el-input>
            </el-form-item>
            <el-form-item label="跨部门激励：">
              <el-input type="text" v-model="addData.transDepartmentEncourage" placeholder="请填写跨部门激励"></el-input>
            </el-form-item>

            <el-form-item label="优惠金额（元）：">
              <el-input type="text" v-model="addData.discountAmount" placeholder="请填写优惠金额"></el-input>
            </el-form-item>
            <el-form-item label="实际支付金额：">
              <el-input type="text" v-model="addData.actualPayAmount" placeholder="请填写实际支付金额"></el-input>
            </el-form-item>
            <el-form-item label="付款日期：" class="spec">
              <el-date-picker
                v-model="addData.payTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-select v-model="addData.payType">
                <el-option v-for="item in payTypearr" :key="item.id" :label="item.label" :value="item.label">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收款账户：">
              <el-select v-model="addData.collectionAccount">
                <el-option v-for="item in acount" :key="item.id" :label="item.label" :value="item.label">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="确认收款人：">
              <el-input type="text" v-model="addData.confirmPayee" placeholder="请填写确认收款人" ></el-input>
            </el-form-item>
            <el-form-item label="汇款人（渠道填写）：">
              <el-input type="text" v-model="addData.remitterChannel" placeholder="请填写汇款人" ></el-input>
            </el-form-item>
            <el-form-item label="计提额：">
              <el-input type="text" v-model="addData.jitie" placeholder="请填写计提额" ></el-input>
            </el-form-item>
            <el-form-item label="拾贝结算渠道金额（渠道填写）：">
              <el-input type="text" v-model="addData.sebeSettleChannel" placeholder="请填写拾贝结算渠道金额" ></el-input>
            </el-form-item>
            <el-form-item label="渠道结算拾贝金额（渠道填写）：">
              <el-input type="text" v-model="addData.channelSettleSebe" placeholder="请填写渠道结算拾贝金额" ></el-input>
            </el-form-item>

            <el-form-item  label="规定完成日期：" class="spec">
              <el-date-picker
                v-model="addData.setCompletionDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="上传（交付）日期：" class="spec">
              <el-date-picker
                v-model="addData.updateDeliverDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="客户验收日期：" class="spec">
              <el-date-picker
                v-model="addData.customerCheckDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="申请号：">
              <el-input type="text" v-model="addData.applicationNo" placeholder="请填写申请号" ></el-input>
            </el-form-item>
            <el-form-item  label="申报时间：" class="spec">
              <el-date-picker
                v-model="addData.reportTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="申报员：">
              <el-input type="text" v-model="addData.reporter" placeholder="请填写申报员" ></el-input>
            </el-form-item>
            <el-form-item  label="申请号回执单收文：" class="spec">
              <el-date-picker
                v-model="addData.applicationNoReceipt"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="准予注册决定书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.permitRegisterDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="准予撤回收文日期：" class="spec">
              <el-date-picker
                v-model="addData.permitRecallDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="更正商标核准通知书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.updateTrademarkDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="核账人：">
              <el-input type="text" v-model="addData.auditor" placeholder="请填写核账人" ></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号：">
              <el-input type="text" v-model="addData.taxpayerNumber" placeholder="请填写纳税人识别号" ></el-input>
            </el-form-item>
            <el-form-item  label="开票日期：" class="spec"  v-if="caseSysNo!=0">
              <el-date-picker
                v-model="addData.billingDate"
                type="date"
                disabled
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="官费发票号："  v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.officialFeesInvoiceNumber" placeholder="请填写官费发票号" disabled></el-input>
            </el-form-item>
            <el-form-item label="服务费发票号："  v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.serviceChargeInvoiceNumber" placeholder="请填写服务费发票号" disabled></el-input>
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
            <el-form-item label="发票是否邮寄：">
              <el-input type="text" v-model="addData.invoiceWhetherPost" placeholder="请填写发票是否邮寄" ></el-input>
            </el-form-item>
            <el-form-item label="发票快递单号：">
              <el-input type="text" v-model="addData.invoiceExpressNumber" placeholder="请填写发票快递单号" ></el-input>
            </el-form-item>

            <el-form-item label="发票寄件时间：" class="spec">
              <el-date-picker
                v-model="addData.invoicePostTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="不予受理收文日期：" class="spec">
              <el-date-picker
                v-model="addData.dismissReceiptDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="不予受理收文通知日期：" class="spec">
              <el-date-picker
                v-model="addData.dismissReceiptNoticeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="补正收文日期：" >
              <el-input type="text" v-model="addData.updateReceiptDate" placeholder="请填写补正收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="受通收文日期：" >
              <el-input type="text" v-model="addData.acceptReceiptDate" placeholder="请填写受通收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="缴费通知书：" >
              <el-input type="text" v-model="addData.payNotice" placeholder="请填写缴费通知书" ></el-input>
            </el-form-item>
            <el-form-item label="受通通知日期：" class="spec">
              <el-date-picker
                v-model="addData.acceptNoticeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商标审查意见通知书：">
              <el-input type="text" v-model="addData.trademarkCheckNotice" placeholder="请填写商标审查意见通知书" ></el-input>
            </el-form-item>
            <el-form-item label="同日申请补送证据收文日期：" class="spec">
              <el-date-picker
                v-model="addData.samedaySuppleEvidenceDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="同日申请抽签通知书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.samedayDrawNoticeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="同日申请协商通知书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.samedayConsultNoticeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="驳回收文日期：">
              <el-input type="text" v-model="addData.rejectReceiptDate" placeholder="请填写驳回收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="驳回通知日期：" class="spec">
              <el-date-picker
                v-model="addData.rejectNoticeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="初审收文日期：" >
              <el-input type="text" v-model="addData.firstcheckRejectDate" placeholder="请填写初审收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="异议答辩收文日期：">
              <el-input type="text" v-model="addData.dissentDefenceRejectDate" placeholder="请填写异议答辩收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="异议决定书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.dissentDecisionRejectDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="不予注册决定收文日期：" class="spec">
              <el-date-picker
                v-model="addData.refuseRegisterDecisionDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商标证收文日期：">
              <el-input type="text" v-model="addData.trademarkCertificateRejectDate" placeholder="请填写商标证收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="商标证二次收文：">
              <el-input type="text" v-model="addData.trademarkCertificateSecondDate" placeholder="请填写商标证二次收文" ></el-input>
            </el-form-item>
            <el-form-item label="收件人：">
              <el-input type="text" v-model="addData.recevier" placeholder="请填写收件人" ></el-input>
            </el-form-item>

            <el-form-item label="收件人电话：">
              <el-input type="text" v-model="addData.recevierPhone" placeholder="请填写收件人电话" ></el-input>
            </el-form-item>
            <el-form-item label="收件人地址：">
              <el-input type="text" v-model="addData.recevierAddress" placeholder="请填写收件人地址" ></el-input>
            </el-form-item>
            <el-form-item label="寄件快递单号：">
              <el-input type="text" v-model="addData.mailExpressNumber" placeholder="请填写寄件快递单号" ></el-input>
            </el-form-item>
            <el-form-item label="寄件日期：" class="spec">
              <el-date-picker
                v-model="addData.mailDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="快递公司：">
              <el-input type="text" v-model="addData.expressCompany" placeholder="请填写快递公司" ></el-input>
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=1&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
            <div class="upload_tip">
              <p v-if="standby8_name">已上传：{{decodeURIComponent(standby8_name)}}</p>
            </div>
          </div>
          <ul class="otherdata" v-if='standby8_Data.length>0'>
            <li v-for="(file,index) in standby8_Data" :key="index">
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
  "businessType": "商标注册",
  "businessName": '',
  "customerType": "",
  "customerName": '',
  "contacts": '',
  "contactsPhone": "",
  "wechat": "",
  "buyerWang": '',
  "email": "",

  "contractAmount": "",
  "serviceCharge": '',
  "amountCollected": "",
  "confirmCollectionDate": "",
  "submitDate": '',
  "orderSource": '',
  "orderNo": '',
  "serviceNo": "",
  "requirementNo": "",
  "applicant": "",

  "passRate": '',
  "passCheckRate": '',
  "serviceProvider": "",
  "agentCommissioner": "",
  "selectCommissioner": '',
  "selectDocument": "",
  "declarationCategory": '',
  "addition": '',
  "officialFees": "",
  "transDepartmentEncourage": "",

  "discountAmount": '',
  "actualPayAmount": "",
  "payTime": "",
  "payType": '',
  "collectionAccount": "",
  "confirmPayee": "",
  "remitterChannel": '',
  "jitie": '',
  "sebeSettleChannel": '',
  "channelSettleSebe": "",

  "setCompletionDate": "",
  "updateDeliverDate": "",
  "customerCheckDate": '',
  "applicationNo": '',
  "reportTime": "",
  "reporter": "",
  "applicationNoReceipt": '',
  "permitRegisterDate": "",
  "permitRecallDate": '',
  "updateTrademarkDate": '',
  
  "auditor": "",
  "taxpayerNumber": "",
  "billingDate": '',
  "officialFeesInvoiceNumber": '',
  "serviceChargeInvoiceNumber":'',
  "invoiceRevicer": "",
  "invoiceRevicerPhone": "",
  "invoiceRevicerAddress": '',
  "invoiceWhetherPost": "",
  "invoiceExpressNumber": '',

  "invoicePostTime": '',
  "dismissReceiptDate": "",
  "dismissReceiptNoticeDate": "",
  "updateReceiptDate": '',
  "acceptReceiptDate": '',
  "payNotice": "",
  "acceptNoticeDate": "",
  "trademarkCheckNotice": '',
  "samedaySuppleEvidenceDate": "",
  "samedayDrawNoticeDate": '',

  "samedayConsultNoticeDate": '',
  "rejectReceiptDate": "",
  "rejectNoticeDate": "",
  "firstcheckRejectDate": '',
  "dissentDefenceRejectDate": '',
  "dissentDecisionRejectDate": "",
  "refuseRegisterDecisionDate": "",
  "trademarkCertificateRejectDate": '',
  "trademarkCertificateSecondDate": "",
  "recevier": '',

  "recevierPhone": '',
  "recevierAddress": "",
  "mailExpressNumber": "",
  "mailDate": '',
  "expressCompany": "",
  "businessPlatform": "",
  "remarks": '',
  "involvePeople": '',
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createTradeMark'
const detailUrl = './api/selectTradeMark'
const orderSourcearr = [
  {id:1,label:'创新保'},
  {id:2,label:'线下'},
  {id:3,label:'拾贝网'},
  {id:4,label:'淘宝服务市场'},
  {id:5,label:'版信通'},
  {id:6,label:'厦门拾贝'},
  {id:7,label:'河南拾贝'},
  {id:8,label:'神州顺利办'},
  {id:9,label:'致胜和'},
  {id:10,label:'拾贝宝'},
  {id:11,label:'易企记'},
  {id:12,label:'瑞富'},
  {id:13,label:'玉养'},
  {id:14,label:'国贝'},
  {id:15,label:'协会'},
  {id:16,label:'信拾贝'},
  {id:17,label:'几美文化'},
  {id:18,label:'临沂彤诺'},
  {id:19,label:'上海单茂'},
  {id:20,label:'福州四叶草'},
  {id:21,label:'郴州百屹'},
  {id:22,label:'侵权伪劣创新联盟'},
  {id:23,label:'福州信和'},
  {id:24,label:'北斗'},
  {id:25,label:'霍尔果斯宝岗分公司'},
  {id:26,label:'山东专利工程总公司'},
  {id:27,label:'内蒙古橙诺'},
  {id:28,label:'港通财务'},
  {id:29,label:'天猫'},
  {id:30,label:'墨烯财税'},
  {id:31,label:'霍尔果斯黄山分公司'},
  {id:32,label:'邓立斌'},
  {id:33,label:'杭州首席财务管理咨询'}
]
const acount = [
  {id:1,label:'中国银行杭州九堡支行'},
  {id:2,label:'浙商银行'},
  {id:3,label:'拾贝支付宝'},
  {id:4,label:'拾贝保支付宝'}
]
const payTypearr = [
  {id:1,label:'网银支付'},
  {id:2,label:'支付宝'},
  {id:3,label:'微信支付'},
  {id:4,label:'公司账户'},
  {id:5,label:'网上银行'},
  {id:6,label:'对公转账'},
  {id:7,label:'对公网银支付'},
  {id:8,label:'电汇'},
  {id:9,label:'个人银行'},
  {id:10,label:'企业银行'},
  {id:11,label:'创新保支付'},
  {id:12,label:'存证包抵扣'},
  {id:13,label:'微信wap支付'},
  {id:14,label:'微信公众号支付'},
  {id:15,label:'微信小程序支付'},
  {id:16,label:'浙商支付'},
  {id:17,label:'渠道订单支付'},
  {id:18,label:'银联'},

]
export default {
    name:'trademarkaddcps',
    data(){
        return{
            addData:Object.assign({},initdata),
            caseSysNo:'',
            orderSourcearr: orderSourcearr,
            acount: acount,
            payTypearr: payTypearr,
            ywyList:[],
            standby8:'',
            standby8_Data:[],
            standby8_name:'',
            token:'',
            proxyImg:[],
            dialogImg: false,
            rootUrl:CONFIG.rootUrl,
            nowurl: [],
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
      // this.findywy()
      this.caseSysNo = this.$route.params.id;
      this.token = VueCookie.get('service_token');
      if(this.caseSysNo!=0){
        let data = {
          id: this.caseSysNo
        }
        this.$http.get(detailUrl,{params: data}).then(res=>{
          this.addData = res.data;
          let subdata = Object.assign({},this.addData);
          subdata.confirmCollectionDate = this.totimestamp(this.addData.confirmCollectionDate);
          subdata.submitDate = this.totimestamp(this.addData.submitDate);
          subdata.payTime = this.totimestamp(this.addData.payTime);
          subdata.setCompletionDate = this.totimestamp(this.addData.setCompletionDate);
          subdata.updateDeliverDate = this.totimestamp(this.addData.updateDeliverDate);
          subdata.customerCheckDate = this.totimestamp(this.addData.customerCheckDate);

          subdata.reportTime = this.totimestamp(this.addData.reportTime);
          subdata.applicationNoReceipt = this.totimestamp(this.addData.applicationNoReceipt);
          subdata.permitRegisterDate = this.totimestamp(this.addData.permitRegisterDate);
          subdata.permitRecallDate = this.totimestamp(this.addData.permitRecallDate);
          subdata.updateTrademarkDate = this.totimestamp(this.addData.updateTrademarkDate);
          subdata.billingDate = this.totimestamp(this.addData.billingDate);

          subdata.invoicePostTime = this.totimestamp(this.addData.invoicePostTime);
          subdata.dismissReceiptDate = this.totimestamp(this.addData.dismissReceiptDate);
          subdata.dismissReceiptNoticeDate = this.totimestamp(this.addData.dismissReceiptNoticeDate);
          subdata.acceptNoticeDate = this.totimestamp(this.addData.acceptNoticeDate);
          
          subdata.samedaySuppleEvidenceDate = this.totimestamp(this.addData.samedaySuppleEvidenceDate);

          subdata.samedayDrawNoticeDate = this.totimestamp(this.addData.samedayDrawNoticeDate);
          subdata.samedayConsultNoticeDate = this.totimestamp(this.addData.samedayConsultNoticeDate);
          subdata.rejectNoticeDate = this.totimestamp(this.addData.rejectNoticeDate);

          subdata.dissentDecisionRejectDate = this.totimestamp(this.addData.dissentDecisionRejectDate);
          subdata.refuseRegisterDecisionDate = this.totimestamp(this.addData.refuseRegisterDecisionDate);
          subdata.mailDate = this.totimestamp(this.addData.mailDate);
          this.addData = subdata
          console.log(res.data)
        })
      }
    },
    methods:{
      getcailiao(){
        let data = {
          offlineType:1,
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
        //  for(let i=0;i<md.length;i++){
        //    if(d.url == md[i]['url']){
        //      isrepeat = true;
        //      break;
        //    }
        //  }
        //  if(!isrepeat){
        //    md.unshift(d)
        // }
        
        // this.nowurl.push(d)
        // if(this.nowurl.length==2){
        //   md.unshift(d);
        //   this.nowurl = []
        // }
				if (d.url) {

					this[data.valueName]= d.url;
          this[data.valueName+'_name']= d.fileName;
          md.unshift(d)
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
      findywy(){
        this.$http.get('./api/operatorList').then(res=>{
          this.ywyList = res.data||[]
        })
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
          subdata.confirmCollectionDate = this.totimestamp(this.addData.confirmCollectionDate);
          subdata.submitDate = this.totimestamp(this.addData.submitDate);
          subdata.payTime = this.totimestamp(this.addData.payTime);
          subdata.setCompletionDate = this.totimestamp(this.addData.setCompletionDate);
          subdata.updateDeliverDate = this.totimestamp(this.addData.updateDeliverDate);
          subdata.customerCheckDate = this.totimestamp(this.addData.customerCheckDate);

          subdata.reportTime = this.totimestamp(this.addData.reportTime);
          subdata.applicationNoReceipt = this.totimestamp(this.addData.applicationNoReceipt);
          subdata.permitRegisterDate = this.totimestamp(this.addData.permitRegisterDate);
          subdata.permitRecallDate = this.totimestamp(this.addData.permitRecallDate);
          subdata.updateTrademarkDate = this.totimestamp(this.addData.updateTrademarkDate);
          subdata.billingDate = this.totimestamp(this.addData.billingDate);

          subdata.invoicePostTime = this.totimestamp(this.addData.invoicePostTime);
          subdata.dismissReceiptDate = this.totimestamp(this.addData.dismissReceiptDate);
          subdata.dismissReceiptNoticeDate = this.totimestamp(this.addData.dismissReceiptNoticeDate);
          subdata.acceptNoticeDate = this.totimestamp(this.addData.acceptNoticeDate);
          
          subdata.samedaySuppleEvidenceDate = this.totimestamp(this.addData.samedaySuppleEvidenceDate);

          subdata.samedayDrawNoticeDate = this.totimestamp(this.addData.samedayDrawNoticeDate);
          subdata.samedayConsultNoticeDate = this.totimestamp(this.addData.samedayConsultNoticeDate);
          subdata.rejectNoticeDate = this.totimestamp(this.addData.rejectNoticeDate);

          subdata.dissentDecisionRejectDate = this.totimestamp(this.addData.dissentDecisionRejectDate);
          subdata.refuseRegisterDecisionDate = this.totimestamp(this.addData.refuseRegisterDecisionDate);
          subdata.mailDate = this.totimestamp(this.addData.mailDate);
          
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