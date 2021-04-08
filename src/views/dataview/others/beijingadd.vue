<template>
<div class="qinquan" >
  <div class="form" v-loading="dloading">
    <div class="dataviewtab" v-if="caseSysNo!=0">
      <span class="tabbtn" :class="{active:now==1}" @click="now=1">基本信息</span><span class="tabbtn" :class="{active:now==2}" @click="now=2">案件材料</span><span class="tabbtn backbtn" @click="toback">返回</span>
    </div>
    <div class="basic_lists revise" v-show="now==1" >
      <div class="basic_category clearfix">
        
        <div class="itembasic">
          <el-form ref="form1" label-width="270px">
            <el-form-item :label="`${item.name}：`" v-for="(item,index) in addData" :key="index" :class="{'spec':item.textboxType==1}">
              
              <el-date-picker
                v-if="item.textboxType==1"
                v-model="item.value"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
              <el-input type="text" v-if="item.textboxType==0" v-model="item.value" :placeholder="`请填写${item.name}`" ></el-input>
              <el-select v-model="item.value" v-if="item.textboxType==2">
                <el-option v-for="it in item.textboxDisplayArr" :key="it" :label="it" :value="it">{{it}}</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div> 
      </div>
      <div class="btnbox" v-show="!dloading">
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=126&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/saveCloudExcelData'
const detailUrl = './api/selectTradeMark'
export default {
    name:'tmaoaddcps',
    data(){
        return{
            addData:[],
            ziduandata: [],
            caseSysNo:'',
            dataUniqueNumber:'',
            ywyList:[],
            standby8:'',
            standby8_Data:[],
            standby8_name:'',
            token:'',
            proxyImg:[],
            dialogImg: false,
            rootUrl:CONFIG.rootUrl,
            nowurl: [],
            now: 1,
            dloading: false
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
      this.dataUniqueNumber = this.$route.params.fid;
      console.log('caseno:'+this.caseSysNo)
      console.log('uno:'+this.dataUniqueNumber)
      this.token = VueCookie.get('service_token');
      this.setzd()
    },
    methods:{
      async findzd(){
        let data = {
          tbName:'Beijing_Declare_Hangzhou_Case'
        }
        if(this.caseSysNo!=0){
          data.dataUniqueNumber = this.dataUniqueNumber
        }
        return await this.$http.get('./api/findCloudExcelData',{params:data})
      },
      async setzd(){
        this.dloading = true;
        let ret =await this.findzd()
        let ziduandata =[]
        const zddata = ret.data
        // this.ziduandata = zddata
        // zddata.forEach(item => {
        //   if(item.textboxType == 1) {
        //     item.value = item.value - 0
        //   }
        // })
        this.addData = [].concat(zddata)
        this.dloading = false
      },
      tosubmit(){
        let ret = [].concat(this.addData);
        let data = {}
        ret.forEach(item=>{
          if(item.textboxType==1){
            data[item.field] = this.totimestamp(item.value)
          }else{
            data[item.field] = item.value
          }
        })
        console.log(data)
        if(this.isNull(data)){
          this.$message({
            message:'请填写内容后再提交',
            type: 'warning'
          })
        }else{
          data.tbName = 'Beijing_Declare_Hangzhou_Case'
          if(this.dataUniqueNumber){
            data.dataUniqueNumber = this.dataUniqueNumber
          }
          this.$http.post('./api/saveCloudExcelData',data).then(res=>{
              this.$message.success('添加成功')
              // this.addData = [].concat(this.ziduandata)
              this.$router.go(-1)
            }).catch(err => {
              this.$message({
                message: err.response.data.msg,
                type: "warning"
              });
            });
        }
        
      },
      getcailiao(){
        let data = {
          offlineType:126,
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