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
              <el-form-item label="提交日期：" class="spec">
              <el-date-picker
                v-model="addData.submitTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="序号：">
              <el-input type="text" v-model="addData.seqNo" placeholder="请填写序号" ></el-input>
            </el-form-item>
            <el-form-item label="服务号：">
              <el-input type="text" v-model="addData.serviceNumber" placeholder="请填写服务号" ></el-input>
            </el-form-item>
            <el-form-item label="充值金额：">
              <el-input type="text" v-model="addData.rechargeAmount" placeholder="请填写充值金额" ></el-input>
            </el-form-item>
            <el-form-item label="充值手机号：">
              <el-input type="text" v-model="addData.rechargePhone" placeholder="请填写充值手机号" ></el-input>
            </el-form-item>
            <el-form-item label="商标名称：">
              <el-input type="text" v-model="addData.trademarkName" placeholder="请填商标名称" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input type="text" v-model="addData.contacts" placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系人号码：">
              <el-input type="text" v-model="addData.contactsPhone" placeholder="请填写联系人号码"></el-input>
            </el-form-item>
            <el-form-item label="申请人：">
              <el-input type="text" v-model="addData.applicant" placeholder="请填写申请人" ></el-input>
            </el-form-item>
            <el-form-item label="通过率(%)：">
              <el-input type="text" v-model="addData.passRate" placeholder="请填写通过率百分比" ></el-input>
            </el-form-item>

            <el-form-item label="抽检员通过率：">
              <el-input type="text" v-model="addData.checkPassRate" placeholder="请填写抽检员通过率" ></el-input>
            </el-form-item>
            <el-form-item label="服务商：">
              <el-input type="text" v-model="addData.serviceProvider" placeholder="请填写服务商" ></el-input>
            </el-form-item>
            <el-form-item label="代理专员：">
              <el-input type="text" v-model="addData.agentCommissioner" placeholder="请填写代理专员"></el-input>
            </el-form-item>
            <el-form-item label="代理文员：">
              <el-input type="text" v-model="addData.selectDocument" placeholder="请填写代理文书"></el-input>
            </el-form-item>
            <el-form-item label="类别：">
              <el-input type="text" v-model="addData.type" placeholder="请填写类别"></el-input>
            </el-form-item>
            <el-form-item label="加项：">
              <el-input type="text" v-model="addData.addition" placeholder="请填写加项"></el-input>
            </el-form-item>
            <el-form-item label="官费：">
              <el-input type="text" v-model="addData.officialFees" placeholder="请填写官费"></el-input>
            </el-form-item>
            <el-form-item label="服务费：">
              <el-input type="text" v-model="addData.serviceCharge" placeholder="请填写服务费"></el-input>
            </el-form-item>
            <el-form-item label="总金额：">
              <el-input type="text" v-model="addData.totalMoney" placeholder="请填写总金额"></el-input>
            </el-form-item>
            <!-- <el-form-item label="下单时间：" class="spec">
              <el-date-picker
                v-model="addData.orderTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item> -->

            <el-form-item label="付款日期：" class="spec">
              <el-date-picker
                v-model="addData.payTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-input type="text" v-model="addData.payType" placeholder="请填写付款方式"></el-input>
            </el-form-item>
            <el-form-item label="商户订单号：">
              <el-input type="text" v-model="addData.businessOrderNo" placeholder="请填写商户订单号"></el-input>
            </el-form-item>
            <el-form-item label="财务收款：">
              <el-input type="text" v-model="addData.financialCollection" placeholder="请填写财务收款"></el-input>
            </el-form-item>
            <el-form-item  label="申报日期：" class="spec">
              <el-date-picker
                v-model="addData.reportDate"
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
            <el-form-item label="审核：">
              <el-input type="text" v-model="addData.check" placeholder="请填写审核" ></el-input>
            </el-form-item>
            <el-form-item label="充值操作员：">
              <el-input type="text" v-model="addData.rechargeOperator" placeholder="请填写充值操作员" ></el-input>
            </el-form-item>
            <el-form-item  label="充值日期：" class="spec">
              <el-date-picker
                v-model="addData.rechargeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            
            <el-form-item label="纳税人识别号：">
              <el-input type="text" v-model="addData.taxpayerNumber" placeholder="请填写纳税人识别号" ></el-input>
            </el-form-item>
            <el-form-item label="官费发票号："  v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.officialFeesInvoiceNumber" placeholder="请填写官费发票号" disabled></el-input>
            </el-form-item>
            <el-form-item label="服务费发票号："  v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.serviceChargeInvoiceNumber" placeholder="请填写服务费发票号" disabled></el-input>
            </el-form-item>
            <el-form-item  label="开票时间：" class="spec"  v-if="caseSysNo!=0">
              <el-date-picker
                v-model="addData.billingDate"
                type="date"
                disabled
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="快递单号：">
              <el-input type="text" v-model="addData.expressNumber" placeholder="请填写发票快递单号" ></el-input>
            </el-form-item>
            <el-form-item label="邮寄时间：" class="spec">
              <el-date-picker
                v-model="addData.mailDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="收件人：">
              <el-input type="text" v-model="addData.recevier" placeholder="请填写发票收件人" ></el-input>
            </el-form-item>
            <el-form-item label="收件电话：">
              <el-input type="text" v-model="addData.receviePhone" placeholder="请填写发票收件电话" ></el-input>
            </el-form-item>
            <el-form-item label="收件地址：">
              <el-input type="text" v-model="addData.recevieAddress" placeholder="请填写发票收件地址" ></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="text" v-model="addData.remarks" placeholder="请填写备注" ></el-input>
            </el-form-item>

            
            <el-form-item label="不予受理收文：">
              <el-input type="text" v-model="addData.dismissReceipt" placeholder="请填写不予受理收文" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="准予注册决定书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.permissionRegisterReceipt"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="不予注册决定书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.refuseRegisterDecisionDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="补正通知书收文：" >
              <el-input type="text" v-model="addData.updateNoticeReceipt" placeholder="请填写补正通知书收文" ></el-input>
            </el-form-item>
            <el-form-item label="异议决定书收文:" >
              <el-input type="text" v-model="addData.dissentDecisionReject" placeholder="请填写异议决定书收文" ></el-input>
            </el-form-item>
            <el-form-item label="受通是否收文：" class="spec">
              <el-date-picker
                v-model="addData.acceptWhetherReceipt"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="受通是否上传：" >
              <el-input type="text" v-model="addData.acceptWhetherUpload" placeholder="请填写受通是否上传" ></el-input>
            </el-form-item>
            <el-form-item label="受通短信通知：" class="spec">
              <el-date-picker
                v-model="addData.acceptMessageNotice"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="驳回是否收文：">
              <el-input type="text" v-model="addData.rejectWhetherReceipt" placeholder="请填写驳回是否收文" ></el-input>
            </el-form-item>
            <el-form-item label="驳回短信通知：" class="spec">
              <el-date-picker
                v-model="addData.rejectMessageNotice"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否驳回复审：">
              <el-input type="text" v-model="addData.whetherRejectReview" placeholder="请填写是否驳回复审" ></el-input>
            </el-form-item>

            <el-form-item label="初审是否收文：" >
              <el-input type="text" v-model="addData.firstcheckWhetherReceipt" placeholder="请填写初审是否收文" ></el-input>
            </el-form-item>
            <el-form-item label="初审是否上传：" >
              <el-input type="text" v-model="addData.firstcheckWhetherUpload" placeholder="请填写初审是否上传" ></el-input>
            </el-form-item>
            <el-form-item label="初审短信通知：" class="spec">
              <el-date-picker
                v-model="addData.firstcheckMessageNotice"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="异议答辩通知书收文：" class="spec">
              <el-date-picker
                v-model="addData.dissentDefenceNotice"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否异议答辩：">
              <el-input type="text" v-model="addData.whetherDissentDefence" placeholder="请填写是否异议答辩" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="异议答辩决定书：">
              <el-input type="text" v-model="addData.dissentDefenceDecision" placeholder="请填写异议答辩决定书" ></el-input>
            </el-form-item> -->
            <el-form-item label="商标证是否收文：">
              <el-input type="text" v-model="addData.trademarkWhetherReceipt" placeholder="请填写商标证是否收文" ></el-input>
            </el-form-item>
            <el-form-item label="商标证二次收文：">
              <el-input type="text" v-model="addData.trademarkWhetherSecReceipt" placeholder="请填写商标证二次收文" ></el-input>
            </el-form-item>
            <el-form-item label="商标证是否上传：" >
              <el-input type="text" v-model="addData.trademarkWhetherUpload" placeholder="请填写初审是否上传" ></el-input>
            </el-form-item>
            <el-form-item label="商标证短信通知：" class="spec">
              <el-date-picker
                v-model="addData.trademarkMessageNotice"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商标转让需求：">
              <el-input type="text" v-model="addData.trademarkTransDemand" placeholder="请填写商标转让需求" ></el-input>
            </el-form-item>

            <el-form-item label="官文收件人：">
              <el-input type="text" v-model="addData.officialReceiver" placeholder="请填写官文收件人" ></el-input>
            </el-form-item>
            <el-form-item label="收件人电话：">
              <el-input type="text" v-model="addData.receiverPhone" placeholder="请填写收件人电话" ></el-input>
            </el-form-item>
            <el-form-item label="收件人地址：">
              <el-input type="text" v-model="addData.recevierAddress" placeholder="请填写收件人地址" ></el-input>
            </el-form-item>
            <el-form-item label="确认客户收件/回执：">
              <el-input type="text" v-model="addData.confirmConsumerReceive" placeholder="请填写确认客户收件/回执" ></el-input>
            </el-form-item>
            <el-form-item label="寄件快递单号：">
              <el-input type="text" v-model="addData.mailExpressNumber" placeholder="请填写寄件快递单号" ></el-input>
            </el-form-item>
            <el-form-item label="寄件日期：" class="spec">
              <el-date-picker
                v-model="addData.expressTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="快递公司：">
              <el-input type="text" v-model="addData.expressCompany" placeholder="请填写快递公司" ></el-input>
            </el-form-item>
            
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=103&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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
  "submitTime": '',
  "seqNo": "",
  "serviceNumber": '',
  "rechargeAmount": "",
  "rechargePhone": '',
  "trademarkName": '',
  "contacts": "",
  "contactsPhone": "",
  "applicant": '',
  "passRate": "",

  "checkPassRate": "",
  "serviceProvider": '',
  "agentCommissioner": "",
  "selectDocument": "",
  "type": '',
  "addition": '',
  "officialFees": '',
  "serviceCharge": "",
  "totalMoney": "",
  // "orderTime": "",

  "payTime": '',
  "payType": '',
  "businessOrderNo": "",
  "financialCollection": "",
  "reportDate": '',
  "reporter": "",
  "applicationNo": '',
  "check": '',
  "rechargeOperator": "",
  "rechargeDate": "",

  "taxpayerNumber": '',
  "officialFeesInvoiceNumber": "",
  "serviceChargeInvoiceNumber": "",
  "billingDate": '',
  "expressNumber": "",
  "mailDate": "",
  "recevier": '',
  "receviePhone": '',
  "recevieAddress": '',
  "remarks": "",

  "dismissReceipt": "",
  // "permissionRegisterReceipt": "",
  "refuseRegisterDecisionDate": '',
  "updateNoticeReceipt": '',
  "dissentDecisionReject":'',
  "acceptWhetherReceipt": "",
  "acceptWhetherUpload": "",
  "acceptMessageNotice": '',
  "samedayApplyNotice": "",
  "samedayConsultNotice": '',
  "samedayDrawNotice": '',
  
  "rejectWhetherReceipt": "",
  "rejectMessageNotice": "",
  "whetherRejectReview": '',
  "firstcheckWhetherReceipt": '',
  "firstcheckWhetherUpload":'',
  "firstcheckMessageNotice": "",
  "dissentDefenceNotice": "",
  "whetherDissentDefence": '',
  // "dissentDefenceDecision": "",
  "trademarkWhetherReceipt": '',

  "trademarkWhetherSecReceipt": '',
  "trademarkWhetherUpload": "",
  "trademarkMessageNotice": "",
  "trademarkTransDemand": '',
  "officialReceiver": '',
  "receiverPhone": "",
  "recevierAddress": "",
  "confirmConsumerReceive": '',
  "mailExpressNumber": "",
  "expressTime": '',

  "expressCompany": '',
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createDeclareyq'
const detailUrl = './api/selectDeclareyq'
export default {
    name:'trademarkaddcps',
    data(){
        return{
            addData:Object.assign({},initdata),
            caseSysNo:'',
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
          this.addData = subdata
          console.log(res.data)
        })
      }
    },
    methods:{
      getcailiao(){
        let data = {
          offlineType:103,
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