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
            <el-form-item label="创建日期：" class="spec">
              <el-date-picker
                v-model="addData.createTimeOne"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="会员编号：">
              <el-input type="text" v-model="addData.memberNo" placeholder="请填会员编号" ></el-input>
            </el-form-item>
            <el-form-item label="单位名称：">
              <el-input type="text" v-model="addData.companyName" placeholder="请填写单位名称" ></el-input>
            </el-form-item>
            
            <el-form-item label="纳税人识别号：">
              <el-input type="text" v-model="addData.taxpayerNumber" placeholder="纳税人识别号" ></el-input>
            </el-form-item>
            <el-form-item label="开票地址：">
              <el-input type="text" v-model="addData.billingAddress" placeholder="请填写开票地址" ></el-input>
            </el-form-item>
            <el-form-item label="开票银行及账号：">
              <el-input type="text" v-model="addData.billingBankAccount" placeholder="请填写开票银行及账号" ></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名：">
              <el-input type="text" v-model="addData.contactsName" placeholder="请填写联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话：">
              <el-input type="text" v-model="addData.contactsPhoneOne" placeholder="请填写联系人电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input type="text" v-model="addData.email" placeholder="请填写邮箱"></el-input>
            </el-form-item>
            <el-form-item label="收货人：">
              <el-input type="text" v-model="addData.recevier" placeholder="请填写收货人"></el-input>
            </el-form-item>
            
            <el-form-item label="联系人电话：">
              <el-input type="text" v-model="addData.contactsPhoneTwo" placeholder="请填写联系人电话" ></el-input>
            </el-form-item>
            <el-form-item label="联系人地址：">
              <el-input type="text" v-model="addData.contactsAddress" placeholder="请填写联系人地址" ></el-input>
            </el-form-item>
            <el-form-item label="和解金：">
              <el-input type="text" v-model="addData.compromiseMoney" placeholder="请填写和解金"></el-input>
            </el-form-item>
            
            <el-form-item label="购买日期：">
              <el-input type="text" v-model="addData.buyDate" placeholder="请填写购买日期" ></el-input>
              <!-- <el-date-picker
                v-model="addData.buyDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker> -->
            </el-form-item>
            <el-form-item label="购买枚数：">
              <el-input type="text" v-model="addData.buyNum" placeholder="请填写购买枚数" ></el-input>
            </el-form-item>
            <el-form-item label="购买金额：">
              <el-input type="text" v-model="addData.buyMoney" placeholder="请填写购买金额"></el-input>
            </el-form-item>
            <el-form-item label="到账金额：">
              <el-input type="text" v-model="addData.amountReceived" placeholder="请填写到账金额" ></el-input>
            </el-form-item>
            <el-form-item  label="到账时间：">
              <el-input type="text" v-model="addData.receivedTime" placeholder="请填写到账时间" ></el-input>
              <!-- <el-date-picker
                v-model="addData.receivedTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker> -->
            </el-form-item>
            <el-form-item label="到账确认人：">
              <el-input type="text" v-model="addData.receivedConfirm" placeholder="请填写到账确认人" ></el-input>
            </el-form-item>
            <el-form-item label="赠送枚数：">
              <el-input type="text" v-model="addData.presentNum" placeholder="请填写赠送枚数" ></el-input>
            </el-form-item>
            <el-form-item label="标签字段：">
              <el-input type="text" v-model="addData.labelField" placeholder="请填写标签字段" ></el-input>
            </el-form-item>
            <el-form-item label="共计页数：">
              <el-input type="text" v-model="addData.totalPage" placeholder="请填写共计页数" ></el-input>
            </el-form-item>
            <el-form-item label="共计枚数：">
              <el-input type="text" v-model="addData.totalNum" placeholder="请填写共计枚数" ></el-input>
            </el-form-item>
            <el-form-item label="发票号码：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.invoiceNum" disabled placeholder="请填写发票号码" ></el-input>
            </el-form-item>
            <el-form-item label="出货前校验人：">
              <el-input type="text" v-model="addData.sellCheck" placeholder="请填写出货前校验人" ></el-input>
            </el-form-item>

            <el-form-item label="邮寄时间：">
              <el-input type="text" v-model="addData.postTime" placeholder="请填写邮寄时间" ></el-input>
              <!-- <el-date-picker
                v-model="addData.postTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker> -->
            </el-form-item>
            <el-form-item label="邮寄单号：">
              <el-input type="text" v-model="addData.mailExpressNumber" placeholder="请填写邮寄单号" ></el-input>
            </el-form-item>
            <el-form-item label="网销数量：">
              <el-input type="text" v-model="addData.onlineNum" placeholder="请填写网销数量" ></el-input>
            </el-form-item>
            <el-form-item label="差额：">
              <el-input type="text" v-model="addData.difference" placeholder="请填写差额" ></el-input>
            </el-form-item>
            <el-form-item label="结算商家名称：">
              <el-input type="text" v-model="addData.settleBusiness" placeholder="请填写结算商家名称" ></el-input>
            </el-form-item>
            <el-form-item label="结算金额：">
              <el-input type="text" v-model="addData.settleMoney" placeholder="请填写结算金额" ></el-input>
            </el-form-item>
            <el-form-item label="结算时段：">
              <el-input type="text" v-model="addData.settleTimeInterval" placeholder="请填写结算时段" ></el-input>
            </el-form-item>
            <el-form-item label="备注信息：">
              <el-input type="text" v-model="addData.remarks" placeholder="请填写备注信息" ></el-input>
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=7&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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
  "createTimeOne": '',
  "memberNo": "",
  "companyName": '',
  "taxpayerNumber": "",
  "billingAddress": '',
  "billingBankAccount": '',
  "contactsName": "",
  "contactsPhoneOne": "",
  "email": '',
  "recevier": "",
  "contactsPhoneTwo": "",
  "contactsAddress": '',
  "compromiseMoney": "",
  "buyDate": "",
  "buyNum": '',
  "buyMoney": '',
  "amountReceived": '',
  "receivedTime": "",
  "receivedConfirm": "",
  "presentNum": "",
  "labelField": '',
  "totalPage": '',
  "totalNum": "",
  "invoiceNum": "",
  "sellCheck": "",
  "postTime": '',
  "mailExpressNumber": "",
  "onlineNum": "",
  "difference": '',
  "settleBusiness": '',
  "settleMoney": '',
  "settleTimeInterval": "",
  "remarks": "",
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createPatentBook'
const detailUrl = './api/selectPatentBook'
export default {
    name:'paddcomponent',
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
          let sd = res.data;
          this.addData = sd
          console.log(res.data)
        })
      }
    },
    methods:{
      getcailiao(){
        let data = {
          offlineType:7,
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
          subdata.createTimeOne = this.totimestamp(this.addData.createTimeOne);
          // subdata.buyDate = this.totimestamp(this.addData.buyDate);
          // subdata.receivedTime = this.totimestamp(this.addData.receivedTime);
          // subdata.postTime = this.totimestamp(this.addData.postTime);
          
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