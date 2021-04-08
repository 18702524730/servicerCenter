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
            <el-form-item label="填报日期：" class="spec">
              <el-date-picker
                v-model="addData.fillDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="销售易订单号：">
              <el-input type="text" v-model="addData.xsyOderNo" placeholder="请填写销售易订单号" ></el-input>
            </el-form-item>
            <el-form-item label="业务员：">
              <el-input type="text" v-model="addData.salesman" placeholder="请填写业务员" ></el-input>
            </el-form-item>
            <el-form-item label="业务类型：">
              <el-radio v-model="addData.businessType" label="软件著作权">软件著作权</el-radio>
              <el-radio v-model="addData.businessType" label="作品著作权">作品著作权</el-radio>
              <el-radio v-model="addData.businessType" label="软著材料撰写">软著材料撰写</el-radio>  
            </el-form-item>
            
            <el-form-item label="业务名称：">
              <el-input type="text" v-model="addData.businessName" placeholder="请填申请业务名称" ></el-input>
            </el-form-item>
            <el-form-item label="业务来源（客户类型）：">
              <el-input type="text" v-model="addData.businessSource" placeholder="请填写业务来源（客户类型）" ></el-input>
            </el-form-item>
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="addData.customerName" placeholder="请填写客户名称" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input type="text" v-model="addData.contacts" placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input type="text" v-model="addData.contactsPhone" placeholder="请填写联系方式"></el-input>
            </el-form-item>
            <el-form-item label="微信号：">
              <el-input type="text" v-model="addData.wechat" placeholder="请填写微信号"></el-input>
            </el-form-item>

            <el-form-item label="买家旺旺：">
              <el-input type="text" v-model="addData.buyerWang" placeholder="请填写买家旺旺"></el-input>
            </el-form-item>
            <el-form-item label="客户地址：">
              <el-input type="text" v-model="addData.customerAddress" placeholder="请填写客户地址" ></el-input>
            </el-form-item>
            <el-form-item label="合同金额（元）：">
              <el-input type="text" v-model="addData.contractMoney" placeholder="请填写合同金额" ></el-input>
            </el-form-item>
            <el-form-item label="服务费（元）：">
              <el-input type="text" v-model="addData.serviceCharge" placeholder="请填写服务费" ></el-input>
            </el-form-item>
            <el-form-item label="到账时间：" class="spec">
              <el-date-picker
                v-model="addData.paymentTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="官费（元）：">
              <el-input type="text" v-model="addData.officialFees" placeholder="请填写官费"></el-input>
            </el-form-item>
            <el-form-item label="跨部门激励：">
              <el-input type="text" v-model="addData.transDepartmentEncourage" placeholder="请填写评估意见"></el-input>
            </el-form-item>
            <el-form-item label="代理人：">
              <el-input type="text" v-model="addData.agent" placeholder="请填写代理人" ></el-input>
            </el-form-item>
            <el-form-item label="代理完成费用（元）:">
              <el-input type="text" v-model="addData.agencyCompleteMoney" placeholder="请填写代理完成费用"></el-input>
            </el-form-item>
            <el-form-item label="计提额：">
              <el-input type="text" v-model="addData.jitie" placeholder="请填写计提额"></el-input>
            </el-form-item>

            <el-form-item label="流水号（申请号）：">
              <el-input type="text" v-model="addData.applicantNo" placeholder="请填写流水号（申请号）"></el-input>
            </el-form-item>
            <el-form-item label="网上申报日期（申请时间）：" class="spec">
              <el-date-picker
                v-model="addData.onlineApplyDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="订单编号：">
              <el-input type="text" v-model="addData.orderNo" placeholder="请填写订单编号"></el-input>
            </el-form-item>
            <el-form-item label="需求编号：">
              <el-input type="text" v-model="addData.requirementNo" placeholder="请填写需求编号" ></el-input>
            </el-form-item>
            <el-form-item label="公司注册地址：">
              <el-input type="text" v-model="addData.companyRegisterAddress" placeholder="请填写公司注册地址" ></el-input>
            </el-form-item>
            <el-form-item label="纳税识人别号：">
              <el-input type="text" v-model="addData.taxpayerNumber" placeholder="请填写纳税人识别号" ></el-input>
            </el-form-item>
            <el-form-item label="客户财务电话：">
              <el-input type="text" v-model="addData.customerFinancePhone" placeholder="请填写客户财务电话" ></el-input>
            </el-form-item>
            <el-form-item label="开户银行：">
              <el-input type="text" v-model="addData.openBank" placeholder="请填写开户银行" ></el-input>
            </el-form-item>
            <el-form-item label="开户银行账户：">
              <el-input type="text" v-model="addData.openBankAccount" placeholder="请填写开户银行账户" ></el-input>
            </el-form-item>
            <el-form-item label="发票类型：">
              <el-radio v-model="addData.invoiceType" label="普票">普票</el-radio>
              <el-radio v-model="addData.invoiceType" label="专票">专票</el-radio> 
            </el-form-item>
            
            <el-form-item label="业务完成时限（工作日）：">
              <el-input type="text" v-model="addData.businessCompleteLimit" placeholder="请填写业务完成时限（工作日）" ></el-input>
            </el-form-item>
            <el-form-item label="渠道联系人：">
              <el-input type="text" v-model="addData.channelContacts" placeholder="请填写渠道联系人" ></el-input>
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
            <el-form-item label="服务商代码：">
              <el-input type="text" v-model="addData.serviceNo" placeholder="请填写服务商代码" ></el-input>
            </el-form-item>
            <el-form-item label="业务状态：">
              <el-radio v-model="addData.businessStatus" label="网上申报">网上申报</el-radio>
              <el-radio v-model="addData.businessStatus" label="纸质申报">纸质申报</el-radio>
              <el-radio v-model="addData.businessStatus" label="已缴费">已缴费</el-radio>
              <el-radio v-model="addData.businessStatus" label="已下证">已下证</el-radio>  
            </el-form-item>
            <el-form-item label="缴费日期：" class="spec">
              <el-date-picker
                v-model="addData.payTime"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="缴纳官费金额（元）：">
              <el-input type="text" v-model="addData.officialFeesMoney" placeholder="请填写缴纳官费金额" ></el-input>
            </el-form-item>
            <el-form-item label="缴纳代理费金额（元）：">
              <el-input type="text" v-model="addData.agentMoney" placeholder="请填写缴纳代理费金额" ></el-input>
            </el-form-item>

            <el-form-item label="缴纳邮寄费金额（元）：">
              <el-input type="text" v-model="addData.postMoney" placeholder="请填写缴纳邮寄费金额" ></el-input>
            </el-form-item>
            <el-form-item label="开票日期：" class="spec" v-if="caseSysNo!=0">
              <el-date-picker
                v-model="addData.billingDate"
                disabled
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="官费票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.officialFeesNo" placeholder="请填写官费票号" disabled></el-input>
            </el-form-item>
            <el-form-item label="服务费票号：" v-if="caseSysNo!=0">
              <el-input type="text" v-model="addData.serviceMoneyNo" placeholder="请填写服务费票号" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮寄地址：">
              <el-input type="text" v-model="addData.postAddressOne" placeholder="请填写邮寄地址" ></el-input>
            </el-form-item>
            <el-form-item label="邮寄联系人：">
              <el-input type="text" v-model="addData.postContactsOne" placeholder="请填写邮寄联系人" ></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input type="text" v-model="addData.contactsPhoneOne" placeholder="请填写联系方式" ></el-input>
            </el-form-item>
            <el-form-item label="快递公司：">
              <el-input type="text" v-model="addData.expressCompanyOne" placeholder="请填写快递公司" ></el-input>
            </el-form-item>
            <el-form-item label="快递单号：">
              <el-input type="text" v-model="addData.mailExpressNumberOne" placeholder="请填写快递单号" ></el-input>
            </el-form-item>
            <el-form-item label="发证日期：" class="spec">
              <el-date-picker
                v-model="addData.issueDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            
            <el-form-item label="证件编号：">
              <el-input type="text" v-model="addData.certificatesNo" placeholder="请填写证件编号" ></el-input>
            </el-form-item>
            <el-form-item label="证书收文日期：">
              <el-input type="text" v-model="addData.certificatesRejectDate" placeholder="请填写证书收文日期" ></el-input>
              <!-- <el-date-picker
                v-model="addData.certificatesRejectDate"
                type="date"
                placeholder="选择日期时间">
              </el-date-picker> -->
            </el-form-item>
            <el-form-item label="邮寄地址：">
              <el-input type="text" v-model="addData.postAddressTwo" placeholder="请填写邮寄地址" ></el-input>
            </el-form-item>
            <el-form-item label="邮寄联系人：">
              <el-input type="text" v-model="addData.postContactsTwo" placeholder="请填写邮寄联系人" ></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input type="text" v-model="addData.contactsPhoneTwo" placeholder="请填写联系方式" ></el-input>
            </el-form-item>
            <el-form-item label="快递公司：">
              <el-input type="text" v-model="addData.expressCompanyTwo" placeholder="请填写快递公司" ></el-input>
            </el-form-item>
            <el-form-item label="快递单号：">
              <el-input type="text" v-model="addData.mailExpressNumberTwo" placeholder="请填写快递单号" ></el-input>
            </el-form-item>

            <el-form-item label="备注：">
              <el-input type="text" v-model="addData.remarks" placeholder="请填写备注" ></el-input>
            </el-form-item>
            <el-form-item label="申请材料：">
              <div class="upload_component">
                <uploader @complete="setUploadedData"  @resetUploader="resetUploader" :canPreview="false" :postAction="'iprp_servicer/api/file/allUpload'" :valueName="'standby1'" :url="standby1" :fileName="standby1_name" :size="5" ></uploader>
                <div class="upload_tip">
                  <p>软著申请电子材料</p>
                </div>
              </div>
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
            <pasuploader @complete="setUploadedMaterial" @resetUploader="resetUploader" :fileName="standby8_name" :canPreview="false" :postAction="'iprp_servicer/api/uploadFile?offlineType=4&offlineId='+caseSysNo+'&access_token='+token" :url="standby8" :valueName="'standby8'"  :size="10"></pasuploader>
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

import uploader from 'cps/uploader/uploader.vue'
import pasuploader from 'cps/pasuploader/uploader.vue'
import VueCookie from "vue-cookie";
import Filters from 'utils/filters/filters.js'
const delOtherMaterialUrl = './api/deleteFile'

const initdata = {
  "fillDate": '',
  "xsyOderNo": "",
  "salesman": '',
  "businessType": "",
  "businessName": '',
  "businessSource": '',
  "customerName": "",
  "contacts": "",
  "contactsPhone": '',
  "wechat": "",
  "buyerWang": "",
  "customerAddress": '',
  "contractMoney": "",
  "serviceCharge": "",
  "paymentTime": '',
  "officialFees": '',
  "transDepartmentEncourage": '',
  "agent": "",
  "agencyCompleteMoney": "",
  "jitie": "",
  "applicantNo": '',
  "onlineApplyDate":'',
  "orderNo": '',
  "requirementNo": "",
  "companyRegisterAddress": "",
  "taxpayerNumber": "",
  "customerFinancePhone": '',
  "openBank": '',
  "openBankAccount": "",
  "invoiceType": "",
  "businessCompleteLimit": '',
  "channelContacts": "",
  "remitterChannel":'',
  "sebeSettleChannel": "",
  "channelSettleSebe": '',
  "serviceNo": "",
  "businessStatus": "",
  "payTime": '',
  "officialFeesMoney": '',
  "agentMoney": '',
  "postMoney": "",
  "billingDate": "",
  "officialFeesNo": "",
  "serviceMoneyNo": '',
  "postAddressOne": '',
  "postContactsOne": "",
  "contactsPhoneOne": "",
  "expressCompanyOne": '',
  "mailExpressNumberOne": "",
  "issueDate": '',
  "certificatesNo": '',
  "certificatesRejectDate": "",
  "postAddressTwo": "",
  "postContactsTwo": '',
  "contactsPhoneTwo": "",
  "expressCompanyTwo": "",
  "mailExpressNumberTwo": '',
  "remarks": "",
  "applyStaff":''
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createSoftWare'
const detailUrl = './api/selectSoftWare'
export default {
    name:'caddcomponent',
    data(){
        return{
            addData:Object.assign({},initdata),
            caseSysNo:'',
            standby1:'',
            standby1_name:'',
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
      pasuploader,
      uploader
    },
    filters:{
      dateFormat: Filters.formatDate.dateFormat
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
          if(this.addData.applyStaff){
            this.standby1 = this.applyStaff
          }
          console.log(res.data)
        })
      }
    },
    watch:{
      now(){
        if(this.now==2){
          this.getcailiao()
        }
      }
    },
    methods:{
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
      getcailiao(){
        let data = {
          offlineType:4,
          offlineId: this.caseSysNo  
        }
        this.$http.get('./api/selectFile',{params:data}).then(res=>{
          this.standby8_Data = res.data.elements.reverse()||[]
        })
      },
      findywy(){
        this.$http.get('./api/operatorList').then(res=>{
          this.ywyList = res.data||[]
        })
      },
      resetUploader(valueName){
        this[valueName] = '';
        this[valueName+'_name'] = '';
      },
      //上传成功后设置数据
      setUploadedData(data){
        this[data.valueName]= data.data.url;
        this[data.valueName+'_name']= data.data.fileName
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
          subdata.paymentTime = this.totimestamp(this.addData.paymentTime);
          subdata.onlineApplyDate = this.totimestamp(this.addData.onlineApplyDate);
          subdata.payTime = this.totimestamp(this.addData.payTime);
          subdata.billingDate = this.totimestamp(this.addData.billingDate);
          subdata.issueDate = this.totimestamp(this.addData.issueDate);
          if(this.standby1){
            subdata.applyStaff = this.standby1;
          }
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