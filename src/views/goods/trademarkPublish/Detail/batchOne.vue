<template>
	<div class="batch_one" v-loading="loading">
    <div class="to_old mb10">
      <p @click="toOld">返回</p>
    </div>
		<p class="tit mb5">表格一键发布</p>
		<span class="mt5">请按照模板格式填写商标数据，平台将自动读取商标信息。读取完成后，将同步国家商标局数据</span>
		<div class="step mt20">
			<span class="num">1</span>
			<span class="txt ml10">下载模板表格</span>
			<a class="down ml15" :href="rootUrl+'/api/seller/downloadTmTemplate'" target="_blank"><img src="~assets/img/goods/down-icon.png" alt="">&nbsp;&nbsp;拾贝交易平台-表格一键发布模板</a>
		</div>
		<div class="step mt20">
			<span class="num">2</span>
			<span class="txt ml10">按模板格式填写商标资料</span>
		</div>
		<div class="step mt20">
			<span class="num">3</span>
			<span class="txt ml10 mr15">上传表格文件</span>
			<el-upload
			  class="upload-demo"
			  :action="rootUrl+'/api/seller/uploadTmInfo'"
			  :headers="token"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  name="filedata"
			  :multiple="false"
			  accept="xls"
			  :on-success="handleSuccess"
			  :file-list="fileList">
			  <el-button v-if="synStatus.status" size="small" type="primary" :disabled="synStatus.status!=2" @click="moveFileList">上传表格</el-button>
			  <el-button v-if="!synStatus.status" size="small" type="primary" :disabled="synStatus.status>0" @click="moveFileList">上传表格</el-button>
			</el-upload>
		</div>

		<p class="readering mt20" v-if="synStatus.status==1">数据正在读取中<img src="~assets/img/goods/loading.gif" alt=""></p>
		<p class="reminder mt15" v-if="synStatus.status<2">提示：为保障商标的同步效率，导入的商标数量建议不可超过10000条。</p>
		<p class="reminder mt15" v-if="synStatus.status==2">提示：本页面可自行关闭。</p>
		<div class="consequence mt20" v-if="synStatus.status>=1">
			<span>导入结果：</span>
			<p class="mt10">已导入：{{leadStatus.excelTotalNum}}</p>
			<p class="mt10">导入成功：{{leadStatus.excelSucNum}}</p>
			<p class="mt10">导入失败：{{leadStatus.excelFailNum}}</p>
		</div>
		<button class="mt20" v-if="synStatus.status==1">读取中...</button>
		<button class="mt20" v-if="synStatus.status==2" @click="SynCheckStatus">同步商标局数据</button>
		<button class="mt20" v-if="synStatus.status==3" @click="lookStatus">同步中...</button>
		<button class="mt20" v-if="synStatus.status==4" @click="lookStatus">查看同步结果</button>
		<!-- 提示 -->
		<el-dialog
		  title="同步提示"
		  :visible.sync="dialogVisible"
		  size="tiny"
		  custom-class="batch_info">
		  <span>系统将正在同步国家商标局数据库，请耐心等待...</span>
		   <p class="mt15">同步进度：{{synStatus.synSuccessNum+synStatus.synfailNum}}/{{synStatus.synTotalNum}}</p>
		  <p class="mt10">同步成功：{{synStatus.synSuccessNum}}条</p>
		  <p class="mt10">同步失败：{{synStatus.synfailNum}}条</p>
		  <!-- <p class="mt15">同步进度：230/{{synStatus}}</p>
		  <p class="mt10">同步成功：89条</p>
		  <p class="mt10">同步失败：0条</p> -->
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="toOver" v-if="synStatus.status==4">确 认</el-button>
		    <el-button type="primary" @click="dialogVisible = false" v-if="synStatus.status==3">关 闭</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import VueCookie from 'vue-cookie'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
	import uploader from 'cps/uploader/uploader.vue'
	// const token = VueCookie.get('user_token');
	const rootUrl = CONFIG.rootUrl;
	const SynResult = './api/seller/getCacheTmSynStatusResult';
	const SynCheck = './api/seller/synCheckTrademarkStatus';
  const pdfUrl = './api/preview';
	export default {

		props:['status'],
    data() {
      return {
      	rootUrl:rootUrl,
      	dialogVisible:false,
      	loading:false,
      	fileList:[],
        token:{},
        synStatus:{
        	status:0
        },//导入状态
        readTimer:'',
        leadStatus:{},
        typeBol:false,//禁止重复点击
      }
    },
    beforeDestroy(){
      console.log('beforeRouteUpdate')
      clearInterval(this.readTimer)
    },
    destroyed: function () {
      console.log('销毁')
    	clearInterval(this.readTimer)
    },
    methods: {
    	lookStatus(){//查看同步结果
    		this.TmSynResult();
    		this.dialogVisible=true;
    	},
    	SynCheckStatus(){//提交同步
    		if(this.typeBol){return;}
				this.typeBol = true;
    		this.$http.post(SynCheck)
				.then((resp) => {
    			this.readInterval();
				})
				.catch((err) => {
					// this.search()
				});
    	},
			TmSynResult(){//查询导入状态
				this.$http.post(SynResult)
				.then((resp) => {
					this.synStatus = resp.data;
					this.leadStatus = resp.data;
					console.log(this.synStatus)
					if(this.synStatus.status >= 4){
						clearInterval(this.readTimer);
						this.typeBol = false;
						// this.synStatus.status = this.synStatus;
					}else{
						// this.leadStatus = {}
					}
				})
				.catch((err) => {
					// this.search()
				});
			},
    	handleSuccess(){
    		this.TmSynResult();
    	},
    	moveFileList(){
    		this.fileList=[];
    	},
    	toOld(){
    		this.$router.go(-1);
    	},
    	handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    	readInterval(item){
    		let self = this;
    		this.readTimer = setInterval(function(){
    			self.TmSynResult();
    		},3000);
    	},
    	toOver(){
    		this.dialogVisible = false;
    		this.$emit('TmResult')
    	}
    },
    mounted() {
    	this.token = {
    		Authorization:VueCookie.get('service_token')
    	}
    	this.synStatus.status = this.status || 0;
    	console.log(this.synStatus.status)
    	this.TmSynResult();
    	if(this.synStatus.status >= 2){
    		this.readInterval(true)
    	}else{
    		clearInterval(this.readTimer)
    	}
    	console.log(this.token)
    },
    watch:{
    }
  }
</script>
<style lang='less'>
.batch_one{padding:0 20px 20px;background-color:#fff;
	.tit{font-size:14px;color:#333;line-height:20px;}
	>button{width:116px;height:36px;border-radius:2px;background-color:#479CFF;color:#fff;font-size:14px;}
	>span{font-size:12px;line-height:17px;color:#666;}
	.reminder{font-size:12px;color:#999;}
	.readering{font-size:18px;color:#479CFF;line-height:25px;
		img{vertical-align: bottom;}
	}
	.step{font-size:0;
		span,a{font-size:14px;display: inline-block;}
		a{text-decoration:none;cursor: pointer;}
		.num{width: 24px;height: 24px;background:linear-gradient(180deg,#3db1fa,#479cff);color:#fff;border-radius: 12px;text-align: center;line-height:24px;}
		.txt{color:#333;}
		.down{color:#479CFF;}
		.upload-demo{width:96px;display:inline-block;vertical-align: top;			
			button{padding:7px 23px;font-size:12px;
				span{font-size:12px;}
			}
		}
	}
	.consequence{width:100%;height:144px;border: 1px solid #ffece6;background-color:#fffbfa;padding:20px;
		span{font-size:14px;color:#333;line-height:20px;}
		p{font-size:13px;color:#666;line-height:18px;}
	}
}
// .el-upload-list__item-name [class^=el-icon] {color:#ff6439;}
// .el-upload-list{margin-left:-133px;}
// .el-upload-list__item .el-icon-upload-success{color:#ff6439;}
// .el-upload-list__item:hover{background-color:#f5f5f5;}
// .el-upload-list__item.is-success .el-upload-list__item-name{text-decoration: none;}
// .el-upload-list__item.is-success .el-upload-list__item-name:hover{color:#ff6439;}
// .el-upload-list__item{}
// .el-upload-list__item.is-success .el-upload-list__item-status-label{display:none;}
.batch_info{width:360px;
	.el-dialog__body{
		>span{font-size:14px;color:#333;line-height:20px;}
		>p{font-size:13px;color:#666;line-height:18px;}
	}
	.el-dialog__footer{padding-top:0;text-align:center;}
}
.el-upload-list{width:300px;
	li{box-sizing: border-box;
		a{margin-top: 3px;}
	}
}
.el-upload-list__item .el-icon-close{
	top:10px;
}
.el-upload-list__item .el-progress__text {
    position: absolute;
    top: 0px;
    right: -25px;
}
</style>
