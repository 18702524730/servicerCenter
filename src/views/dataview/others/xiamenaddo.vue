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
            <el-form-item label="提交日期：">
              <el-input type="text" v-model="addData.submitDate" placeholder="请填写提交日期" ></el-input>
            </el-form-item>
            <el-form-item label="序号：">
              <el-input type="text" v-model="addData.seqNo" placeholder="请填写序号" ></el-input>
            </el-form-item>
            <el-form-item label="订单号：">
              <el-input type="text" v-model="addData.orderNo" placeholder="请填写订单号" ></el-input>
            </el-form-item>
            <el-form-item label="申请人：">
              <el-input type="text" v-model="addData.applicant" placeholder="请填写申请人" ></el-input>
            </el-form-item>
            <el-form-item label="商标名称：">
              <el-input type="text" v-model="addData.trademarkName" placeholder="请填商标名称" ></el-input>
            </el-form-item>
            <el-form-item label="业务类型：">
              <el-input type="text" v-model="addData.businessType" placeholder="请填写业务类型"></el-input>
            </el-form-item>
            <el-form-item label="代理专员：">
              <el-input type="text" v-model="addData.agentCommissioner" placeholder="请填写代理专员"></el-input>
            </el-form-item>
            <el-form-item label="申报类别：">
              <el-input type="text" v-model="addData.reportType" placeholder="请填写申报类型"></el-input>
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
              <el-input type="text" v-model="addData.totalMoney" placeholder="请填写总金额"></el-input>
            </el-form-item>
            <el-form-item label="收款日期：">
              <el-input type="text" v-model="addData.collectionDate" placeholder="请填写收款日期"></el-input>
            </el-form-item>
            <el-form-item label="申报日期：">
              <el-input type="text" v-model="addData.reportDate" placeholder="请填写申报日期"></el-input>
            </el-form-item>
            <el-form-item label="准予注册收文日期：" class="spec">
              <el-date-picker
                v-model="addData.permitRegisterDate"
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
            <el-form-item label="杭州拾贝收-代报费：">
              <el-input type="text" v-model="addData.sebeCollection" placeholder="请填写杭州拾贝收-代报费" ></el-input>
            </el-form-item>
            <el-form-item label="官费发票号：">
              <el-input type="text" v-model="addData.officialFeesInvoiceNumber" placeholder="请填写官费发票号" ></el-input>
            </el-form-item>
            <el-form-item label="服务费发票号：">
              <el-input type="text" v-model="addData.serviceChargeInvoiceNumber" placeholder="请填写服务费发票号" ></el-input>
            </el-form-item>

            <el-form-item label="收件人：">
              <el-input type="text" v-model="addData.invoiceRevicer" placeholder="请填写收件人" ></el-input>
            </el-form-item>
            <el-form-item label="收件电话：">
              <el-input type="text" v-model="addData.receviePhone" placeholder="请填写收件电话" ></el-input>
            </el-form-item>
            <el-form-item label="收到受理通知书：">
              <el-input type="text" v-model="addData.getAcceptNotice" placeholder="请填写收到受理通知书" ></el-input>
            </el-form-item>
            <el-form-item label="补正通知书：">
              <el-input type="text" v-model="addData.updateNotice" placeholder="请填写补正通知书" ></el-input>
            </el-form-item>
            <el-form-item label="不予核准通知书收文日期：">
              <el-input type="text" v-model="addData.refuseCheckNoticeDate" placeholder="请填写不予受理收文" ></el-input>
            </el-form-item>
            <el-form-item label="注册证：" >
              <el-input type="text" v-model="addData.registration" placeholder="请填写补正通知书收文" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="创建人：">
              <el-input type="text" v-model="addData.creator" placeholder="请填写创建人" ></el-input>
            </el-form-item>
            <el-form-item label="创建时间：" class="spec">
              <el-date-picker
                v-model="addData.createTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="修改人">
              <el-input type="text" v-model="addData.updatePerson" placeholder="请填写备注" ></el-input>
            </el-form-item>
            <el-form-item label="修改时间：" class="spec">
              <el-date-picker
                v-model="addData.mailDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="最后活动时间：" class="spec">
              <el-date-picker
                v-model="addData.updateTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=1010&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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
  "submitDate": '',
  "seqNo": "",
  "orderNo": '',
  "applicant": "",
  "trademarkName": '',
  "businessType": '',
  "agentCommissioner": "",
  "reportType": "",
  "registerNo": '',
  "officialFees": "",

  "serviceCharge": "",
  "totalMoney": '',
  "collectionDate": "",
  "reportDate": "",
  "permitRegisterDate": '',
  "reporter": '',
  "applicationNo": '',
  "sebeCollection": "",
  "officialFeesInvoiceNumber": "",
  "serviceChargeInvoiceNumber": "",

  "invoiceRevicer": '',
  "receviePhone": '',
  "getAcceptNotice": "",
  "updateNotice": "",
  "refuseCheckNoticeDate": '',
  "registration": "",
  
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createXiamenTrademarkOther'
const detailUrl = './api/selectXiamenTrademarkOther'
export default {
    name:'xiamenaddocps',
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
          offlineType:1010,
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