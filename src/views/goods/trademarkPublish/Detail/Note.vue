<template>
	<div class="note_memo" v-loading="loading">
		 <div class="note_table">
		 	<p>备注信息</p>
			<div class="note_list clearfix">
				<p class="td_1 fl">备注人</p>
				<p class="td_2 fl">备注时间</p>
				<p class="td_3 fl">备注</p>
			</div>
			<!-- 暂时未加条件判断 -->
			<div class="note_tab clearfix" v-for="item in noteData" v-if="noteData&&noteData.length">
				<p class="td_1 fl">{{item.operatorName || '--'}}</p>
				<p class="td_2 fl">{{item.remarkTime | dateFormat}}</p>
				<p class="td_3 fl">{{item.remark}}</p>
			</div>
			<!-- 没有数据时候内容显示 -->
			<div class="note_null" v-if="!noteData||!noteData.length">
				<img src="~assets/img/nulldata.png" alt="">
				<span>暂无信息</span>
			</div>
			<p class="add_note mt20" @click="preview">添加备注</p>
		 </div>
		 <!-- 服务状态 -->
		<el-dialog title="添加备注"
		  :visible.sync="serviceState" class="state_preview" :modal-append-to-body="true">
			<el-form :model="note" :rules="rules" ref="note">
				<el-form-item prop="textarea">
					<textarea v-model="note.textarea" maxlength="100" class="service_note" rows="5" onchange="this.value=this.value.substring(0, 100)" onkeydown="this.value=this.value.substring(0, 100)" onkeyup="this.value=this.value.substring(0, 100)"></textarea>
				</el-form-item>
			</el-form>
			<span class="service_limit">{{note.textarea.length}}-100字</span>
			<div class="set_btn clearfix mt15">
				<p class="right_btn fr" @click="addNote('note')">确认</p>
				<p class="left_btn fr mr10" @click="serviceState=false,note.textarea=''">取消</p>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Filters from 'utils/filters/'
	import {store} from 'utils/'
	const indexUrl = CONFIG.indexUrl; 
	const noteUrl = '/api/seller/getTmRemarkList';
	const addNoteUrl = '/api/seller/addTrademarkRemark';
	export default {
  	components: {
    },
    props:['order_id'],
    data() {
      return {
      	note:{
      		textarea:''
      	},
      	radio:'1',
      	serviceState:false,
      	imgsrc:'',
      	noteData:[],
      	loading:false,
      	rules:{
      		textarea: [
            { required: true, message: '备注信息不能为空', trigger: 'blur' }
          ]
      	}
      }
    },
    methods: {
    	info(){
    		var self = this;
	    	self.loading = true;
	    	let data = {
	    		trademarkId:Number(this.order_id)
	    	}
	    	this.$http.post(noteUrl,data)
	    	.then((resp) => {
	    		self.noteData = resp.data.list;
	    		self.loading = false;
	    	}).catch((error) => {
	    		self.loading = false;
	        console.log(error);
	      });
    	},
      preview(){
      	this.note.textarea = "";
      	this.serviceState = true;
      },
      addNote(formName){
      	var self = this;
      	this.$refs[formName].validate((valid) => {
          if (valid) {
            self.loading = true;
		      	this.serviceState = false;
		      	this.$http.post(addNoteUrl,{
		      		trademarkId:Number(self.order_id),
		      		remark:self.note.textarea
		      	}).then((resp) => {
		      		self.loading = false;
		      		self.$message({
			          message: '添加备注成功',
			          type: 'success'
			        });
		      		self.info();
			    	}).catch((error) => {
			    		self.loading = false;
			        console.log(error);
			      });
          } else {
            return false;
          }
        });
      	
      }
    },
    mounted() {
    	this.info();
    	// this.status = this.$router.query.status;
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
  	}
  }
</script>
<style lang="less">
	.note_memo{background-color:#fff;padding:20px;
		.service_note{width:460px;padding:0 10px;border:1px solid #DFE2E5;border-radius:3px}
		.note_table{
			>p{font-size: 14px;color: #333;height:20px;line-height:20px;margin-bottom:10px;}
			.td_1{width:16%;}
			.td_2{width:20%;}
			.td_3{width:64%;}
			.note_list{border-box:box-sizing;border: 1px solid #eee;background-color:#f5f5f5;
				p{padding-left:20px;font-size:13px;color:#333;line-height:40px;height:40px;} 
			}
			.note_tab{border-box:box-sizing;border-left: 1px solid #eee;border-right: 1px solid #eee;border-bottom: 1px solid #eee;background-color:#fff;padding-top:10px;padding-bottom:10px;
				p{padding-left:20px;font-size:13px;color:#666;line-height:20px;}
			}
			.note_null{height:200px;text-align:center;padding:80px 0;line-height:35px;border-left: 1px solid #eee;border-right: 1px solid #eee;border-bottom: 1px solid #eee;
				img{width:35px;}
				span{ont-size: 13px;color: #999;margin-left: 5px;vertical-align: middle;display: inline-block;vertical-align: top;}
			}
			.add_note{border: 1px solid #479cff;border-radius: 2px;text-align:center;line-height:30px;height:30px;width:92px;font-size: 13px;color: #479cff;cursor:pointer;}
		}
		// 弹框样式
		.state_preview{
			.el-dialog__title{font-size: 14px;color: #333;font-weight: normal;}
			.el-dialog__body{padding-top:10px;}
			.el-dialog{width:500px;-ms-transform:translateX(-50%);}
			.radio,.state_radio,p{font-size: 14px;color: #666;}
			.state_radio{margin-right:10px;}
			.set_btn{
				p{width:88px;height:30px;line-height:30px;text-align:center;border-radius: 2px;cursor:pointer;}
				.right_btn{background: #479cff;color:#fff;}
				.left_btn{background: #FFFFFF;border: 1px solid #479cff;color:#479cff}
			}
			.service_limit{position: absolute;bottom:85px;right: 45px;color:#999;font-size:13px;}
		}
		.el-textarea__inner:hover {border-color: #408CE6;}
	}
</style>
