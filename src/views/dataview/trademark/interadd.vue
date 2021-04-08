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
            
            <el-form-item label="合同号：">
              <el-input type="text" v-model="addData.contractNo" placeholder="请填写业合同号" ></el-input>
            </el-form-item>
            <el-form-item label="业务来源：">
              <el-input type="text" v-model="addData.orderSource" placeholder="请填业务来源" ></el-input>
            </el-form-item>
            <el-form-item label="业务员：">
              <el-input type="text" v-model="addData.salesman" placeholder="请填写业务员" ></el-input>
            </el-form-item>
            <el-form-item label="注册类型：">
              <el-input type="text" v-model="addData.registerType" placeholder="请填写注册类型" ></el-input>
            </el-form-item>
            <el-form-item label="注册国家：">
              <el-input type="text" v-model="addData.registrCountry" placeholder="请填写注册国家" ></el-input>
            </el-form-item>
            <el-form-item label="申请人（中文）：">
              <el-input type="text" v-model="addData.applierCn" placeholder="请填写申请人（中文）" ></el-input>
            </el-form-item>
            <el-form-item label="申请人（英文）：">
              <el-input type="text" v-model="addData.applierEn" placeholder="请填写申请人（英文）" ></el-input>
            </el-form-item>
            <el-form-item label="申请人地址（中文）：">
              <el-input type="text" v-model="addData.applierAddressCn" placeholder="请填写申请人地址（中文）" ></el-input>
            </el-form-item>
            <el-form-item label="申请人地址（英文）：">
              <el-input type="text" v-model="addData.applierAddressEn" placeholder="请填写申请人地址（英文）" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input type="text" v-model="addData.contacts" placeholder="请填写联系人"></el-input>
            </el-form-item>

            <el-form-item label="联系电话：">
              <el-input type="text" v-model="addData.contactsPhone" placeholder="请填写联系号码"></el-input>
            </el-form-item>
            <el-form-item label="商标名称：">
              <el-input type="text" v-model="addData.trademarkName" placeholder="请填写商标名称" ></el-input>
            </el-form-item>
            <el-form-item label="类别：">
              <el-input type="text" v-model="addData.category" placeholder="请填写类别" ></el-input>
            </el-form-item>
            <el-form-item label="小项个数：">
              <el-input type="text" v-model="addData.minNum" placeholder="请填写小项个数" ></el-input>
            </el-form-item>
            <el-form-item label="加项个数：">
              <el-input type="text" v-model="addData.additionNum" placeholder="请填写加项个数"></el-input>
            </el-form-item>
            <el-form-item label="代理专员：">
              <el-input type="text" v-model="addData.agentCommissioner" placeholder="请填写代理专员"></el-input>
            </el-form-item>
            <el-form-item label="支付金额：">
              <el-input type="text" v-model="addData.payAmount" placeholder="请填写支付金额"></el-input>
            </el-form-item>
            <el-form-item label="成本费：">
              <el-input type="text" v-model="addData.cost" placeholder="请填写收成本费"></el-input>
            </el-form-item>
            <el-form-item label="实际成本（元）：">
              <el-input type="text" v-model="addData.actualCost" placeholder="请填写实际成本"></el-input>
            </el-form-item>
            <el-form-item label="代理费（元）：">
              <el-input type="text" v-model="addData.agencyFee" placeholder="请填写代理费"></el-input>
            </el-form-item>

            <el-form-item label="支付时间：" class="spec">
              <el-date-picker
                v-model="addData.payTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="收款人：">
              <el-input type="text" v-model="addData.collectionPeople" placeholder="请填写收款人" ></el-input>
            </el-form-item>
            <el-form-item label="收款账号：">
              <el-input type="text" v-model="addData.collectionNo" placeholder="请填写收款账号" ></el-input>
            </el-form-item>
            <el-form-item label="收款时间：" class="spec">
              <el-date-picker
                v-model="addData.collectionTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="收款金额（元）：">
              <el-input type="text" v-model="addData.amountCollected" placeholder="请填写需求编号" ></el-input>
            </el-form-item>
            <el-form-item  label="申报日期：" class="spec">
              <el-date-picker
                v-model="addData.reportTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="国际商标受理发文日期" class="spec">
              <el-date-picker
                v-model="addData.internationalReademarkDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="申请号：">
              <el-input type="text" v-model="addData.applicationNo" placeholder="请填写申请号" ></el-input>
            </el-form-item>
            <el-form-item label="社会统一信用代码或身份证号：">
              <el-input type="text" v-model="addData.idNumber" placeholder="请填写社会统一信用代码或身份证号" ></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号：">
              <el-input type="text" v-model="addData.taxpayerNumber" placeholder="请填写纳税人识别号" ></el-input>
            </el-form-item>
            <el-form-item label="官费发票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.officialFeesInvoiceNumber" placeholder="请填写官费发票号" disabled></el-input>
            </el-form-item>

            <el-form-item label="服务费发票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.serviceChargeInvoiceNumber" placeholder="请填写服务费发票号" disabled></el-input>
            </el-form-item>
            <el-form-item  label="开票时间：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.billingDate" placeholder="请填写开票时间" disabled></el-input>
            </el-form-item>
            <el-form-item label="发票收件人：">
              <el-input type="text" v-model="addData.invoiceRevicer" placeholder="请填写发票收件人"></el-input>
            </el-form-item>
            <el-form-item label="收件电话：">
              <el-input type="text" v-model="addData.recevierPhone" placeholder="请填写收件电话"></el-input>
            </el-form-item>
            <el-form-item label="收件地址：">
              <el-input type="text" v-model="addData.recevierAddress" placeholder="请填写收件地址"></el-input>
            </el-form-item>
            <el-form-item label="快递单号：">
              <el-input type="text" v-model="addData.mailExpressNumber" placeholder="请填写加项"></el-input>
            </el-form-item>
            <el-form-item label="退款：">
              <el-input type="text" v-model="addData.refund" placeholder="请填写退款"></el-input>
            </el-form-item>
            <el-form-item label="退款原因：">
              <el-input type="text" v-model="addData.refundReason" placeholder="请填写退款原因"></el-input>
            </el-form-item>
            <el-form-item label="马德里-准予撤回通知书收文日期：">
              <el-input type="text" v-model="addData.madGrantRecallDate" placeholder="请填写马德里-准予撤回通知书收文日期"></el-input>
            </el-form-item>
            <el-form-item label="马德里-不予受理收文日期：">
              <el-input type="text" v-model="addData.madNotReceiptDate" placeholder="请填写马德里-不予受理收文日期"></el-input>
            </el-form-item>

            <el-form-item label="马德里-收费通知书收文日期：">
              <el-input type="text" v-model="addData.madChargeNoticeDate" placeholder="请填写马德里-收费通知书收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="马德里-收费通知书二次收文日期：">
              <el-input type="text" v-model="addData.madChargeNoticeSecdate" placeholder="请填写马德里-收费通知书二次收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="马德里-受理通知书收文日期：">
              <el-input type="text" v-model="addData.madAcceptNoticeDate" placeholder="请填写马德里-受理通知书收文日期" ></el-input>
            </el-form-item>
            <el-form-item  label="马德里商标国际注册补正通知收文日期：" class="spec">
              <el-date-picker
                v-model="addData.madTrademarkCorrectionDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="马德里商标国际注册二次补正通知收文日期：" class="spec toolong">
              <el-date-picker
                v-model="addData.madTrademarkSecdate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="驳回收文日期：">
              <el-input type="text" v-model="addData.rejectReceiptDate" placeholder="请填写驳回收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="驳回二次收文日期：">
              <el-input type="text" v-model="addData.rejectSecondReceiptDate" placeholder="请填写驳回二次收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="马德里-商标注册证（非最终）收文日期：" class="toolong">
              <el-input type="text" v-model="addData.madTrademarkRegisterNotfdate" placeholder="请填写马德里-商标注册证（非最终）收文日期" ></el-input>
            </el-form-item>
            <el-form-item label="国际注册号：">
              <el-input type="text" v-model="addData.internationalRegisterNo" placeholder="请填写国际注册号" ></el-input>
            </el-form-item>
            <el-form-item  label="公告收文日期" class="spec">
              <el-date-picker
                v-model="addData.noticeReceiptDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item  label="国际注册证收文日期：" class="spec">
              <el-date-picker
                v-model="addData.internationalRegisterReceiptDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=2&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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
  "contractNo": '',
  "orderSource": '',
  "salesman": "",
  "registerType": '',
  "registrCountry": '',
  "applierCn": "",
  "applierEn": "",
  "applierAddressCn": '',
  "applierAddressEn": "",
  "contacts": "",

  "contactsPhone": '',
  "trademarkName": "",
  "category": "",
  "minNum": '',
  "additionNum": '',
  "agentCommissioner": '',
  "payAmount": "",
  "cost": "",
  "actualCost": "",
  "agencyFee": '',

  "payTime": '',
  "collectionPeople": "",
  "collectionNo": "",
  "collectionTime": '',
  "amountCollected": "",
  "reportTime": '',

  "internationalReademarkDate":'',

  "applicationNo": "",
  "idNumber": "",
  "taxpayerNumber": '',
  "officialFeesInvoiceNumber": "",

  "serviceChargeInvoiceNumber": "",
  "billingDate": '',
  "invoiceRevicer": "",
  "recevierPhone": "",
  "recevierAddress": '',
  "mailExpressNumber": '',
  "refund": '',
  "refundReason": "",
  "madGrantRecallDate": "",
  "madNotReceiptDate": "",

  "madChargeNoticeDate": '',
  "madChargeNoticeSecdate": '',
  "madAcceptNoticeDate": "",
  "madTrademarkCorrectionDate": "",
  "madTrademarkSecdate": '',
  "rejectReceiptDate": "",
  "rejectSecondReceiptDate": '',
  "madTrademarkRegisterNotfdate":'',
  "internationalRegisterNo":'',
  "noticeReceiptDate": '',
  
  "internationalRegisterReceiptDate": "",
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
const addurl = './api/createTrademarkInternational'
const detailUrl = './api/selectTrademarkInternational'

export default {
    name:'intertrademarkaddcps',
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
          subdata.payTime = this.totimestamp(this.addData.payTime);
          subdata.reportTime = this.totimestamp(this.addData.reportTime);
          subdata.collectionTime = this.totimestamp(this.addData.collectionTime);
          subdata.internationalRegisterReceiptDate = this.totimestamp(this.addData.internationalRegisterReceiptDate);
          subdata.noticeReceiptDate = this.totimestamp(this.addData.noticeReceiptDate);
          subdata.madTrademarkCorrectionDate = this.totimestamp(this.addData.madTrademarkCorrectionDate);
          subdata.madTrademarkSecdate = this.totimestamp(this.addData.madTrademarkSecdate);
          this.addData = subdata
          console.log(res.data)
        })
      }
    },
    methods:{
      getcailiao(){
        let data = {
          offlineType:2,
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
          subdata.payTime = this.totimestamp(this.addData.payTime);
          subdata.reportTime = this.totimestamp(this.addData.reportTime);
          subdata.collectionTime = this.totimestamp(this.addData.collectionTime);
          subdata.internationalRegisterReceiptDate = this.totimestamp(this.addData.internationalRegisterReceiptDate);
          subdata.noticeReceiptDate = this.totimestamp(this.addData.noticeReceiptDate);
          subdata.madTrademarkCorrectionDate = this.totimestamp(this.addData.madTrademarkCorrectionDate);
          subdata.madTrademarkSecdate = this.totimestamp(this.addData.madTrademarkSecdate);
          
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