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
            <el-form-item label="备注：">
              <el-input type="text" v-model="addData.remarks" placeholder="请填备注" ></el-input>
            </el-form-item>
            <el-form-item label="业务类型：">
              <el-input type="text" v-model="addData.businessType" placeholder="请填写业务类型" ></el-input>
            </el-form-item>
            <el-form-item label="分案时间：" class="spec">
              <el-date-picker
                v-model="addData.divisionTime"
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
            <el-form-item label="涉案平台：">
              <el-input type="text" v-model="addData.involvedPlatform" placeholder="请填写涉案平台" ></el-input>
            </el-form-item>
            <el-form-item label="涉案产品店铺：">
              <el-input type="text" v-model="addData.involvedShop" placeholder="请填写涉案产品店铺"></el-input>
            </el-form-item>
            <el-form-item label="涉案产品名称：">
              <el-input type="text" v-model="addData.involvedProductName" placeholder="请填写涉案产品名称"></el-input>
            </el-form-item>
            <el-form-item label="涉案产品型号及参数：">
              <el-input type="text" v-model="addData.involvedProductModel" placeholder="请填写涉案产品型号及参数"></el-input>
            </el-form-item>
            <el-form-item label="涉案产品链接：">
              <el-input type="text" v-model="addData.involvedProductLink" placeholder="请填写涉案产品链接"></el-input>
            </el-form-item>
            
            <el-form-item label="涉案专利权人：">
              <el-input type="text" v-model="addData.involvedPatentPerson" placeholder="请填写涉案专利权人" ></el-input>
            </el-form-item>
            <el-form-item label="涉案专利名称：">
              <el-input type="text" v-model="addData.involvedPatentName" placeholder="请填写涉案专利名称" ></el-input>
            </el-form-item>
            <el-form-item label="涉案专利申请日：" class="spec">
              <el-date-picker
                v-model="addData.involvedPatentApplyDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="涉案专利申请号：">
              <el-input type="text" v-model="addData.involvedPatentApplyNo" placeholder="请填写涉案专利申请号"></el-input>
            </el-form-item>
            <el-form-item label="涉案专利法律状态：">
              <el-input type="text" v-model="addData.involvedPatentLawStatus" placeholder="请填写涉案专利法律状态" ></el-input>
            </el-form-item>
            <el-form-item label="是否处于无效请求阶段：">
              <el-radio v-model="addData.whetherInvalid" label="是">是</el-radio>
              <el-radio v-model="addData.whetherInvalid" label="否">否</el-radio> 
            </el-form-item>
            <el-form-item label="是否收到人民法院诉讼资料：">
              <el-radio v-model="addData.whetherCourt" label="是">是</el-radio>
              <el-radio v-model="addData.whetherCourt" label="否">否</el-radio> 
            </el-form-item>
            <el-form-item label="是否收到行政机关调处资料：" prop="remitter">
              <el-radio v-model="addData.whetherOffice" label="是">是</el-radio>
              <el-radio v-model="addData.whetherOffice" label="否">否</el-radio> 
            </el-form-item>
            <el-form-item label="案件编号：">
              <el-input type="text" v-model="addData.caseNo" placeholder="请填写案件编号"></el-input>
            </el-form-item>
            <el-form-item label="代理人：">
              <el-input type="text" v-model="addData.agent" placeholder="请填写代理人" ></el-input>
            </el-form-item>
            <el-form-item label="侵权判定结果：">
              <el-input type="text" v-model="addData.tortResult" placeholder="请填写侵权判定结果" ></el-input>
            </el-form-item>
            
            <el-form-item  label="报告提交时间：" class="spec">
              <el-date-picker
                v-model="addData.submitTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="报告出具时间：" class="spec">
              <el-date-picker
                v-model="addData.provideTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=6&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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
import qs from 'qs'
import {store} from 'utils/';
import pasuploader from 'cps/pasuploader/uploader.vue'
import VueCookie from "vue-cookie";
import Filters from 'utils/filters/filters.js'
const delOtherMaterialUrl = './api/deleteFile'

const initdata = {
  "remarks": '',
  "businessType": "",
  "divisionTime": '',
  "salesman": "",
  "customerName": '',
  "involvedPlatform": '',
  "involvedShop": "",
  "involvedProductName": "",
  "involvedProductModel": '',
  "involvedPatentPerson": "",
  "involvedPatentName": "",
  "involvedPatentApplyDate": '',
  "involvedPatentApplyNo": "",
  "involvedPatentLawStatus": "",
  "whetherInvalid": '',
  "whetherCourt": '',
  "whetherOffice": '',
  "caseNo": "",
  "agent": "",
  "tortResult": "",
  "submitTime": '',
  "provideTime": '',
  "involvedProductLink": ""
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createTort'
const detailUrl = './api/selectTortAll'
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
          let sd = res.data;
          this.addData = sd
          console.log(res.data)
        })
      }
    },
    methods:{
      getcailiao(){
        let data = {
          offlineType:6,
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
          subdata.divisionTime = this.totimestamp(this.addData.divisionTime);
          subdata.involvedPatentApplyDate = this.totimestamp(this.addData.involvedPatentApplyDate);
          subdata.submitTime = this.totimestamp(this.addData.submitTime);
          subdata.provideTime = this.totimestamp(this.addData.provideTime);
          
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