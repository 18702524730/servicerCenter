<template>
<div class="qinquans">
  <div class="form">
    <div class="dataviewtab" v-if="caseSysNo!=0">
      <span class="tabbtn" :class="{active:now==1}" @click="now=1">基本信息</span><span class="tabbtn" :class="{active:now==2}" @click="now=2">案件材料</span><span class="tabbtn backbtn" @click="toback">返回</span>
    </div>
    <div class="basic_lists revise" v-show="now==1">
      <div class="basic_category clearfix">
        
        <div class="itembasic">
          <el-form ref="form1" label-width="270px" :model="addData">
            <el-form-item label="填报日期：" class="spec">
              <el-date-picker
                v-model="addData.fillDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务员：">
              <el-input type="text" v-model="addData.salesman" placeholder="请填写业务员" ></el-input>
            </el-form-item>
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="addData.customerName" placeholder="请填写客户名称" ></el-input>
            </el-form-item>
            <el-form-item label="申请业务名称：">
              <el-input type="text" v-model="addData.applyBusinessName" placeholder="请填申请业务名称" ></el-input>
            </el-form-item>
            <el-form-item label="业务类型：">
              <el-input type="text" v-model="addData.businessType" placeholder="请填写业务类型" ></el-input>
            </el-form-item>
            <el-form-item label="收件地址：">
              <el-input type="text" v-model="addData.recevierAddress" placeholder="请填写收件地址" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input type="text" v-model="addData.contacts" placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input type="text" v-model="addData.contactsPhone" placeholder="请填写联系电话"></el-input>
            </el-form-item>
            <el-form-item label="合同总额：">
              <el-input type="text" v-model="addData.contractTotalMoney" placeholder="请填写合同总额"></el-input>
            </el-form-item>
            <el-form-item label="预付款金额：">
              <el-input type="text" v-model="addData.preMoney" placeholder="请填写预付款金额"></el-input>
            </el-form-item>
            <el-form-item label="收款日期：" class="spec">
              <el-date-picker
                v-model="addData.preMoneyDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="第二期金额：">
              <el-input type="text" v-model="addData.secondMoney" placeholder="请填写第二期金额" ></el-input>
            </el-form-item>
            <el-form-item label="收款日期：" class="spec">
              <el-date-picker
                v-model="addData.secondMoneyDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="尾款金额：">
              <el-input type="text" v-model="addData.lastMoney" placeholder="请填写尾款金额" ></el-input>
            </el-form-item>
            <el-form-item label="收款日期：" class="spec">
              <el-date-picker
                v-model="addData.lastMoneyDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="高新事务部人员：">
              <el-input type="text" v-model="addData.hightechPerson" placeholder="请填写高新事务部人员" ></el-input>
            </el-form-item>
            
            <el-form-item label="评估意见：">
              <el-input type="text" v-model="addData.assessOpinions" placeholder="请填写评估意见"></el-input>
            </el-form-item>
            <el-form-item label="约定结果：">
              <el-input type="text" v-model="addData.appointResult" placeholder="请填写约定结果" ></el-input>
            </el-form-item>
            <el-form-item label="约定完成时间：" class="spec">
              <el-date-picker
                v-model="addData.appointCompleteTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预计完成时间：" class="spec">
              <el-date-picker
                v-model="addData.preCompleteTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="是否处于无效申请阶段：">
              <el-radio v-model="addData.whetherInvalid" label="是">是</el-radio>
              <el-radio v-model="addData.whetherInvalid" label="否">否</el-radio> 
            </el-form-item> -->
            <el-form-item label="进度情况：">
              <el-input type="text" v-model="addData.speedSituation" placeholder="请填写进度情况"></el-input>
            </el-form-item>
            <el-form-item label="立项文件下发日期：">
              <el-input type="text" v-model="addData.topicDate" placeholder="请填写立项文件下发日期" ></el-input>
              <!-- <el-date-picker
                v-model="addData.topicDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker> -->
            </el-form-item>
            <el-form-item label="可延展项目：">
              <el-input type="text" v-model="addData.extensionProject" placeholder="请填写可延展项目" ></el-input>
            </el-form-item>
            <el-form-item label="发票抬头：">
              <el-input type="text" v-model="addData.invoiceTitle" placeholder="请填写发票抬头" ></el-input>
            </el-form-item>
            <el-form-item label="公司注册地址：">
              <el-input type="text" v-model="addData.companyRegisterAddress" placeholder="请填写公司注册地址" ></el-input>
            </el-form-item>
            <el-form-item label="付款人纳税识别号：">
              <el-input type="text" v-model="addData.taxpayerNumber" placeholder="请填写付款人纳税识别号" ></el-input>
            </el-form-item>
            <el-form-item label="财务电话：">
              <el-input type="text" v-model="addData.financePhone" placeholder="请填写财务电话" ></el-input>
            </el-form-item>
            <el-form-item label="开户银行：">
              <el-input type="text" v-model="addData.openBank" placeholder="请填写开户银行" ></el-input>
            </el-form-item>
            <el-form-item label="开户银行账户：">
              <el-input type="text" v-model="addData.openBankAccount" placeholder="请填写开户银行账户" ></el-input>
            </el-form-item>
            <el-form-item label="发票类型：">
              <el-input type="text" v-model="addData.invoiceType" placeholder="请填写发票类型" ></el-input>
            </el-form-item>
            <el-form-item label="渠道对接人：">
              <el-input type="text" v-model="addData.channelDock" placeholder="请填写渠道对接人" ></el-input>
            </el-form-item>
            <el-form-item label="服务商编号：" >
              <!-- <span class="taitou">sebe</span> -->
              <el-input type="text" v-model="addData.servicerNo" placeholder="请填写服务商编号"></el-input>
            </el-form-item>
            <el-form-item label="预付款发票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.preInvoiceNo" disabled placeholder="请填写预付款发票号" ></el-input>
            </el-form-item>
            <el-form-item  label="开票时间：" class="spec" v-if="caseSysNo!=0">
              <el-date-picker
                v-model="addData.preInvoiceDate"
                disabled
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发票收件（领票）人：">
              <el-input type="text" v-model="addData.preInvoiceReceiver" placeholder="请填写发票收件（领票）人" ></el-input>
            </el-form-item>
            <el-form-item label="邮寄（领票）时间：" class="spec">
              <el-date-picker
                v-model="addData.prePostGetDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="邮寄（取票）方式：">
              <el-input type="text" v-model="addData.postGetType" placeholder="请填写邮寄（取票）方式" ></el-input>
            </el-form-item>
            <el-form-item label="邮件地址：">
              <el-input type="text" v-model="addData.postAddress" placeholder="请填写邮件地址" ></el-input>
            </el-form-item>
            <el-form-item label="快递公司：">
              <el-input type="text" v-model="addData.expressCompany" placeholder="请填写快递公司" ></el-input>
            </el-form-item>
            <el-form-item label="快递单号：">
              <el-input type="text" v-model="addData.mailExpressNumber" placeholder="请填写快递单号" ></el-input>
            </el-form-item>
            <el-form-item label="提交时间：" class="spec">
              <el-date-picker
                v-model="addData.submitDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务状态：">
              <el-input type="text" v-model="addData.businessState" placeholder="请填写业务状态" ></el-input>
            </el-form-item>
            <el-form-item label="第二期发票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.secondInvoiceNo" disabled placeholder="请填写第二期发票号" ></el-input>
            </el-form-item>
            <el-form-item label="开票时间：" class="spec" v-if="caseSysNo!=0">
              <el-date-picker
                v-model="addData.secondInvoiceDate"
                type="date"
                disabled
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发票收件（领票）人：">
              <el-input type="text" v-model="addData.secondInvoiceReceiver" placeholder="请填写发票收件（领票）人" ></el-input>
            </el-form-item>
            <el-form-item label="发票寄件（领票）时间：" class="spec">
              <el-date-picker
                v-model="addData.secondPostGetDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="尾款发票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.lastInvoiceNo" disabled placeholder="请填写尾款发票号" ></el-input>
            </el-form-item>
            <el-form-item label="开票时间：" class="spec" v-if="caseSysNo!=0">
              <el-date-picker
                v-model="addData.lastInvoiceDate"
                type="date"
                disabled
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="领票人：">
              <el-input type="text" v-model="addData.invoiceReceiver" placeholder="请填写领票人" ></el-input>
            </el-form-item>
            <el-form-item label="领票时间：" class="spec">
              <el-date-picker
                v-model="addData.invoiceReceiveTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结案档案员：">
              <el-input type="text" v-model="addData.closeArchivesPerson" placeholder="请填写结案档案员" ></el-input>
            </el-form-item>
            <el-form-item label="结案时间：">
              <el-input type="text" v-model="addData.closeArchivesTime" placeholder="请填写结案时间" ></el-input>
              <!-- <el-date-picker
                v-model="addData.closeArchivesTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker> -->
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="text" v-model="addData.remarks" placeholder="请填写备注" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="创建人：">
              <el-input type="text" v-model="addData.creatorOne" placeholder="请填写创建人" ></el-input>
            </el-form-item>
            <el-form-item label="创建时间：" class="spec">
              <el-date-picker
                v-model="addData.createTimeOne"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="修改人：">
              <el-input type="text" v-model="addData.updatePersonOne" placeholder="请填写修改人" ></el-input>
            </el-form-item>
            <el-form-item label="修改时间：" class="spec">
              <el-date-picker
                v-model="addData.updateTimeOne"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item> -->
            <!-- <el-form-item label="最后活动时间：" class="spec">
              <el-date-picker
                v-model="addData.provideTime"
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=5&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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
  "fillDate": '',
  "salesman": "",
  "customerName": '',
  "applyBusinessName": "",
  "businessType": '',
  "recevierAddress": '',
  "contacts": "",
  "contactsPhone": "",
  "contractTotalMoney": '',
  "preMoney": "",
  "preMoneyDate": "",
  "secondMoney": '',
  "secondMoneyDate": "",
  "lastMoney": "",
  "lastMoneyDate": '',
  "hightechPerson": '',
  "assessOpinions": '',
  "appointResult": "",
  "appointCompleteTime": "",
  "preCompleteTime": "",
  "speedSituation": '',
  "topicDate": '',
  "extensionProject": "",
  "invoiceTitle": "",
  "companyRegisterAddress": '',
  "taxpayerNumber": "",
  "financePhone": '',
  "openBank": '',
  "openBankAccount": "",
  "invoiceType": "",
  "channelDock": '',
  "servicerNo": "",
  "preInvoiceNo": "",
  "preInvoiceDate": '',
  "preInvoiceReceiver": "",
  "prePostGetDate": "",
  "postGetType": '',
  "postAddress": '',
  "expressCompany": '',
  "mailExpressNumber": "",
  "submitDate": "",
  "businessState": "",
  "secondInvoiceNo": '',
  "secondInvoiceDate": '',
  "secondInvoiceReceiver": "",
  "secondPostGetDate": "",
  "lastInvoiceNo": '',
  "lastInvoiceDate": "",
  "invoiceReceiver": '',
  "invoiceReceiveTime": '',
  "closeArchivesPerson": "",
  "closeArchivesTime": "",
  "remarks": '',
  // "creatorOne": "",
  // "createTimeOne": "",
  // "updatePersonOne": '',
  // "updateTimeOne": "",
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createTech'
const detailUrl = './api/selectTech'
export default {
    name:'qaddcomponent',
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
          console.log(res.data)
        })
      }
    },
    methods:{
      getcailiao(){
        let data = {
          offlineType:5,
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
        return str?new Date(str).getTime():null
      },
      tosubmit(){
        if(this.isNull(this.addData)){
          this.$message({
            message:'请填写内容后再提交',
            type: 'warning'
          })
        }else{
          let subdata = Object.assign({},this.addData);
          subdata.fillDate = this.totimestamp(this.addData.fillDate);
          subdata.preMoneyDate = this.totimestamp(this.addData.preMoneyDate);
          subdata.secondMoneyDate = this.totimestamp(this.addData.secondMoneyDate);
          subdata.lastMoneyDate = this.totimestamp(this.addData.lastMoneyDate);
          subdata.appointCompleteTime = this.totimestamp(this.addData.appointCompleteTime);
          subdata.preCompleteTime = this.totimestamp(this.addData.preCompleteTime);
          subdata.preInvoiceDate = this.totimestamp(this.addData.preInvoiceDate);
          subdata.prePostGetDate = this.totimestamp(this.addData.prePostGetDate);
          subdata.submitDate = this.totimestamp(this.addData.submitDate);
          subdata.secondInvoiceDate = this.totimestamp(this.addData.secondInvoiceDate);
          subdata.secondPostGetDate = this.totimestamp(this.addData.secondPostGetDate);
          subdata.lastInvoiceDate = this.totimestamp(this.addData.lastInvoiceDate);
          subdata.invoiceReceiveTime = this.totimestamp(this.addData.invoiceReceiveTime);
          subdata.createTimeOne = this.totimestamp(this.addData.createTimeOne);

          subdata.updateTimeOne = this.totimestamp(this.addData.updateTimeOne);
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
.qinquans{
  .form {
    .revise{
      padding:30px 0;
      input{
        width: 530px;
      }
      .taitou{
        float: left;
        width: 40px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
      }
      .fuwubh{
        float: right;
        width: 490px;
        input{
          width:490px;
        }
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
      // padding-left: 30px;
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