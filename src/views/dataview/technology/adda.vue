<template>
<div class="qinquan">
  <div class="form">
    <div class="basic_lists revise">
          <div class="basic_category clearfix">
            
            <div class="itembasic">
              <el-form ref="form1" label-width="270px" :model="addData">
                <el-form-item label="铁军：">
                  <el-input type="text" v-model="addData.ironArmy" placeholder="请填写铁军"></el-input>
                </el-form-item>
                <el-form-item label="高新事业部：">
                  <el-input type="text" v-model="addData.hightechPerson" placeholder="请填写高新事业部" ></el-input>
                </el-form-item>
                <el-form-item label="企业：">
                  <el-input type="text" v-model="addData.company" placeholder="请填写企业" ></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                  <el-input type="text" v-model="addData.contacts" placeholder="请填写联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                  <el-input type="text" v-model="addData.contactsPhone" placeholder="请填写联系方式"></el-input>
                </el-form-item>
                <el-form-item label="注册时间：" class="spec">
                 <el-date-picker
                    v-model="addData.registerTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="所属地（区）：">
                  <el-input type="text" v-model="addData.area" placeholder="请填写所属地（区）"></el-input>
                </el-form-item>
                <el-form-item label="项目类别：">
                  <el-input type="text" v-model="addData.projectCategory" placeholder="请填写项目类别" ></el-input>
                </el-form-item>
                <el-form-item label="评估意见：">
                  <el-input type="text" v-model="addData.assessOpinions" placeholder="请填写评估意见"></el-input>
                </el-form-item>
                <el-form-item label="约定结果：">
                  <el-input type="text" v-model="addData.appointResult" placeholder="请填写约定结果" ></el-input>
                </el-form-item>
                <el-form-item label="合同金额：">
                  <el-input type="text" v-model="addData.contractMoney" placeholder="请填写合同金额" ></el-input>
                </el-form-item>
                <el-form-item label="到款时间：" class="spec">
                 <el-date-picker
                    v-model="addData.paymentTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
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
                <el-form-item label="进度情况：">
                  <el-input type="text" v-model="addData.speedSituation" placeholder="请填写进度情况"></el-input>
                </el-form-item>
                <el-form-item label="可延展项目：">
                  <el-input type="text" v-model="addData.extensionProject" placeholder="请填写可延展项目" ></el-input>
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
  </div>
  
</div>
  
</template>

<script>
import {store} from 'utils/';
const initdata = {
  "ironArmy": '',
  "hightechPerson": "",
  "company": '',
  "contacts": "",
  "contactsPhone": "",
  "registerTime": '',
  "area": "",
  "projectCategory": "",
  "assessOpinions": '',
  "appointResult": "",
  "contractMoney": "",
  "paymentTime": '',
  "appointCompleteTime": '',
  "preCompleteTime": '',
  "speedSituation": "",
  "extensionProject": "",
}
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/createProject'
const detailUrl = './api/selectProject'
export default {
    name:'techaddacomponent',
    data(){
        return{
            addData:Object.assign({},initdata),
            caseSysNo:'',
        }
    },
    mounted(){
      // store.remove('pas_patent_data')
      this.caseSysNo = this.$route.params.id;
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
          subdata.preCompleteTime = this.totimestamp(this.addData.preCompleteTime);
          subdata.appointCompleteTime = this.totimestamp(this.addData.appointCompleteTime);
          subdata.paymentTime = this.totimestamp(this.addData.paymentTime);
          subdata.registerTime = this.totimestamp(this.addData.registerTime);
          
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
        // this.$confirm('未保存的内容将会丢失', '确认离开此页吗？', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   this.$router.go(-1)
        // }).catch(() => {
        // });
        this.$router.go(-1)
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