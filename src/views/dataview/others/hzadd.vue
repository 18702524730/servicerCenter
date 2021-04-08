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
            <el-form-item label="业务类型：">
              <el-input type="text" v-model="addData.businessType" placeholder="请填写业务类型" ></el-input>
            </el-form-item>
            <el-form-item label="提交时间：" class="spec">
              <el-date-picker
                v-model="addData.submitTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="申请人：">
              <el-input type="text" v-model="addData.applicant" placeholder="请填写申请人" ></el-input>
            </el-form-item>
            <el-form-item label="发明名称：">
              <el-input type="text" v-model="addData.inventName" placeholder="请填商标名称" ></el-input>
            </el-form-item>
            <el-form-item label="发文日：" class="spec">
              <el-date-picker
                v-model="addData.postDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="申请号：">
              <el-input type="text" v-model="addData.applicationNo" placeholder="请填写申请号" ></el-input>
            </el-form-item>
            <el-form-item  label="手续合格时间：" class="spec">
              <el-date-picker
                v-model="addData.processQualifiedTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="其他文件时间：" class="spec">
              <el-date-picker
                v-model="addData.otherFileTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="初审合格.进入公布：" class="spec">
              <el-date-picker
                v-model="addData.firstQualified"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="进入实质审查时间：" class="spec">
              <el-date-picker
                v-model="addData.enterCheckTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item  label="审查意见.补正：" class="spec">
              <el-date-picker
                v-model="addData.checkIdeaUpdate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="授权公告日：" class="spec">
              <el-date-picker
                v-model="addData.authNoticeDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="办理登记手续通知书：" class="spec">
              <el-date-picker
                v-model="addData.handleRegisterNotice"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="证书收文日期：" class="spec">
              <el-date-picker
                v-model="addData.certificateReceiptDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item  label="寄件时间：" class="spec">
              <el-date-picker
                v-model="addData.postTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="快递单号：">
              <el-input type="text" v-model="addData.expressNo" placeholder="请填写快递单号" ></el-input>
            </el-form-item>
            <el-form-item label="收件人：">
              <el-input type="text" v-model="addData.receiver" placeholder="请填写收件人" ></el-input>
            </el-form-item>
            <el-form-item label="收件人电话：">
              <el-input type="text" v-model="addData.receiverPhone" placeholder="请填写收件人电话" ></el-input>
            </el-form-item>
            <el-form-item label="收件人地址：">
              <el-input type="text" v-model="addData.receiverAddress" placeholder="请填写收件人地址" ></el-input>
            </el-form-item>
            <el-form-item label="年费：">
              <el-input type="text" v-model="addData.annualFee" placeholder="请填写年费" ></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="text" v-model="addData.remarks" placeholder="请填写备注" ></el-input>
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=1011&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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
  "businessType": '',
  "submitTime": "",
  "applicant": '',
  "inventName": "",
  "postDate": '',
  "applicationNo": '',
  "processQualifiedTime": "",
  "otherFileTime": "",
  "firstQualified": '',
  "enterCheckTime": "",

  "checkIdeaUpdate": "",
  "authNoticeDate": '',
  "handleRegisterNotice": "",
  "certificateReceiptDate": "",
  "postTime": '',
  "expressNo": '',
  "receiver": '',
  "receiverPhone": "",
  "receiverAddress": "",
  "annualFee": "",

  "remarks": '',
  
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createHuazhong'
const detailUrl = './api/selectHuazhong'
export default {
    name:'hzaddcps',
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
          offlineType:1011,
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