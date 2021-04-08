<template>
	<div class="commonDetail my_note_memo" v-loading="loading">
		<div class="basic_lists">
			<p>备注信息</p>
			<div class="table_list clearfix">
				<table class="ll">
					<thead>
						<tr>
							<th width="200">备注人</th>
							<th width="200">备注时间</th>
							<th>备注</th>
						</tr>
					</thead>
					<tbody>
						<tr  v-for="item in noteData">
							<td>{{item.operator_name}}</td>
							<td>{{item.create_time | dateFormat}}</td>
							<td><p class="wordbreak" style="max-width: 500px">{{item.content}}</p></td>
						</tr>
						<tr v-if="!noteData || !noteData.length">
							<td colspan="3">
								<div class="lc no_data">
									<img src="~assets/img/nulldata.png" alt=""><span>暂无信息</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<el-button size="small" type="primary" class="mt20" @click="preview">添加备注</el-button>
			</div>
		</div>

		<!-- 服务状态 -->
		<el-dialog title="添加备注"
		  :visible.sync="serviceState" class="state_preview" :modal-append-to-body="true">
			<el-form :model="note" :rules="rules" ref="note">
				<el-form-item prop="textarea">
					<!-- <el-input class="service_note"
					  type="textarea"
					  :rows="5"
					  v-model="note.textarea" :maxlength="100">
					</el-input> -->
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
	const noteUrl = './api/OrdersRemarks';
	const addNoteUrl = './api/OrdersRemarks';
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
	    	this.$http.get(noteUrl+'/' + this.order_id)
	    	.then((resp) => {
	    		self.noteData = resp.data;
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
		      		order_id:self.order_id,
		      		content:self.note.textarea
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
<style lang="scss">
	.my_note_memo{background-color:#fff;padding:0 20px 20px;
		.service_note{width:460px;padding:0 10px;border:1px solid #DFE2E5;border-radius:3px}
		.el-textarea__inner:hover {border-color: #408CE6;}
	}
</style>
