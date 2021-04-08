<template>
	<div class="confirm_self" v-loading="loading" element-loading-text="拼命加载中">
		<div class="confirm_tit" v-if="!loading" style="margin-bottom: 10px;">
			<p>客户信息</p>
			<ul>
				<li class="clearfix">
					<p class="tit fl hasrequired">联系人</p>
					<p class="txt fl"><el-input v-model="contactName" placeholder="请输入联系人" /></p>
				</li>
				<li class="clearfix">
					<p class="tit fl hasrequired">联系电话</p>
					<p class="txt fl"><el-input v-model="contactPhone" maxlength="11" placeholder="请输入联系电话" /></p>
				</li>
				<li class="clearfix">
					<p class="tit fl hasrequired">邮箱</p>
					<p class="txt fl"><el-input v-model="contactEmail" placeholder="请输入邮箱" /></p>
				</li>
			</ul>
		</div>
		<div class="confirm_tit" v-if="!loading">
			<p>服务人员信息</p>
			<ul>
				<li class="clearfix">
					<p class="tit fl hasrequired">业务专员</p>
					<p class="txt fl">
						<!-- {{infoDetailData.salesman}} -->
						<el-input v-model="salesman" placeholder="请输入业务专员" disabled/>
					</p>
				</li>
				<li class="clearfix">
					<p class="tit fl hasrequired">完成专员</p>
					<p class="txt fl"><el-input v-model.trim="agentName" placeholder="请输入完成专员" /></p>
				</li>
				<li class="clearfix">
					<p class="tit fl hasrequired">流程专员</p>
					<p class="txt fl"><el-input v-model.trim="selectDocument" placeholder="请输入流程专员" /></p>
				</li>
			</ul>
		</div>
		<div class="confirm_tab" v-if="!loading">
			<p class="tab_tit">服务单信息</p>
			<p class="tab_txt">1.请确保以下商标服务单的申报主体、商标名称、商标描述、商标图样一致；</p>
			<p class="tab_txt">2.您最多可以批量操作45个商标。</p>
			<div class="tab_r">
				<el-popover
				  ref="popover"
				  placement="bottom-start"
				  width="260"
				  trigger="hover">
				  <p class="conditions">服务单的添加条件：</p>
				  <p class="conditions">1.属于同一用户的国内商标注册申请服务；</p>
				  <p class="conditions">2.服务商已接单但未对其进行办理；</p>
				  <p class="conditions">3.服务单不处于退款过程中或已完成退款。</p>
				</el-popover>
				<span><i class="el-icon-information" v-popover:popover></i></span>
				<span>满足添加条件的服务单数：</span><span style="color: #479CFF;">{{(newInfo.length?newInfo.length:0)+(oldInfo.length?oldInfo.length:0)}}</span>
				<button v-if="!newInfo.length&&!oldInfo.length" class="unlist"><span>+</span>添加</button>
				<button v-else class="list" @click="addOrderList"><span>+</span>添加</button>
			</div>
			<div class="tab_list">
				<div class="list_tit clearfix">
					<p class="fl td_1">序号</p>
					<p class="fl td_2">服务单号</p>
					<p class="fl td_3">客户姓名</p>
					<p class="fl td_4">服务状态</p>
					<p class="fl td_5">操作</p>
				</div>
				<template v-if="infoDetailData.service_order_list">
					<div class="clearfix" v-for="(item, index) in infoDetailData.service_order_list" :class="{'newClass':item.bs_feedback_name==='服务商已接单'}">
						<p class="fl td_1">{{(index+1)>9 ? index+1 : '0'+(index+1)}}</p>
						<p class="fl td_2">
							{{item.order_sn}}
							<el-popover placement="top" width="400" trigger="hover" class="remark_icon_wrap" popper-class="popper_remark_icon" v-if="item.isAsistantremarks" @show="getRemark(item)">
                <p>{{remark}}</p>
                <a href="javascript:;" slot="reference" class="remark_icon">&nbsp;&nbsp;</a>
              </el-popover>
						</p>
						<p class="fl td_3">{{item.member_truename || '--'}}</p>
						<p class="fl td_4">{{item.bs_feedback_name}}</p>
						<p class="fl td_5" style="cursor:pointer;">
							<el-popover placement="bottom" width="140" trigger="click" class="popover">
                <p>是否移除该服务单？</p>
							  <div style="text-align: right; margin: 0">
							    <span class="error" size="mini" type="text" @click="hidePop">否</span>
							    <span class="move" type="primary" size="mini" @click="del(item,index)">是</span>
							  </div>
                <a href="javascript:;" slot="reference">移除</a>
              </el-popover>

						</p>
					</div>
				</template>
			</div>
		</div>
		<div class="confirm_btn clearfix" v-if="!loading">
			<p class="fl" @click="saveDraft()">存草稿</p>
			<p class="fl ml10 mr10" @click="back">返回</p>
			<p class="fl btn_bg" @click="next">下一步</p>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {store} from 'utils/'
	const infoConfirmQueryUrl = './api/info_confirm_query';
	const saveDraftUrl = './api/save_draft';
	const findAsistantRemarkUrl = './api/findAsistantRemark';
	export default {
  	components: {
    },
    data() {
      return {
      	remark: '', // popover 备注
      	reffer:1,
      	confirm_step: 1,
      	work_order_sn:'',
      	loading: false,
		  infoDetailData: {},
		  contactName:'',
		  contactPhone:'',
		  contactEmail:'',
		  salesman:'',
		  agentName:'',
		  selectDocument:'',
      	id_list_delete: [],
      	// 获取到的新数据
      	newInfo:[],
      	// 被删除的旧数据
      	oldInfo:[],
        order_sn_list_add:[]
      }
    },
    methods: {
    	getRemark(item){
				this.remark = '';
				this.$http.get(findAsistantRemarkUrl + '?orderSn=' + item.order_sn)
				.then((resp) => {
					var data = resp.data;
					this.remark = data.remarks;
				})
				.catch((err) => {
					console.log(err);
				});
			},
    	addOrderList(){
    		var self = this;
    		// 存证老数据，优先添加旧数据
    		if(self.oldInfo&&self.oldInfo.length){
    			self.infoDetailData.service_order_list.unshift(self.oldInfo[0]);//旧数据添加在头部
    			if(self.id_list_delete.length){//判断是否有删除过旧数据
    				for(var i=0;i<self.id_list_delete.length;i++){//遍历删除的旧数据
    					if(self.id_list_delete[i]==self.oldInfo[0].id){//将添加的旧数据从已删除的数组中删除（回滚）
    						self.id_list_delete.splice(i,1);
    						self.oldInfo.splice(0,1);//添加完成，添加的数据
    					}
    				}
    			}else{
    				self.oldInfo.splice(0,1);
    			}
    			return;
    		}
    		if(self.newInfo&&self.newInfo.length){
    			self.infoDetailData.service_order_list.push(self.newInfo[0]);
          self.order_sn_list_add.push(self.newInfo[0].order_sn);
    			self.newInfo.splice(0,1);
    			return;
    		}
    	},
      queryDetail(isSilent){
      	if (!isSilent) {
      		this.loading = true;
      	}
      	//每次初始化一下
      	this.order_sn_list_add = [];
      	this.$http.get(infoConfirmQueryUrl, {
      		params: {
	      		work_order_sn: this.work_order_sn,
	      		confirm_step: this.confirm_step,
	      		is_submit: this.$route.query.is_submit,
	      	}
      	})
      	.then((resp) => {
      		this.loading = false;
      		var data = resp.data;
			  this.infoDetailData = data;
			  this.contactName = data.contactName|| data.member_truename;
			  this.contactPhone = data.contactPhone||data.phone;
			  this.contactEmail = data.contactEmail;
			  if(data.salesman){
				  this.salesman = data.salesman
			  }
			  if(data.agentName){
				  this.agentName = data.agentName
			  }
			  if(data.selectDocument){
				  this.selectDocument = data.selectDocument
			  }
			  
          if(data.add_service_order_list){
            this.newInfo = data.add_service_order_list;
          }
      		console.log(data)
      	})
      	.catch((err) => {
      		this.loading = false;
      		this.$message.error('参数不正确');
      	});
      },
      del(data,index){
      	var service_order_list = this.infoDetailData.service_order_list;
      	if (service_order_list.length === 1) {
      		this.$message.error('服务单不能清空');
      		this.hidePop();
      		return;
      	}
      	// 列表老数据
      	if(data.bs_feedback_name=="已接单待提交" || data.bs_feedback_name=="已提交待确认"){
      		this.id_list_delete.push(service_order_list[index].id);//id添加到id_list_delete
      		this.oldInfo.push(data);//将删除的数据添加到oldInfo
      		console.log(this.oldInfo)
      	}else{
      		//添加列表中相应删除
      		var idx = this.order_sn_list_add.indexOf(data.order_sn);
      		if (idx !== -1) {
      			this.order_sn_list_add.splice(idx, 1);
      		}
      		this.newInfo.push(data);//删除新数据不做处理，只做回滚
      		console.log(this.newInfo)
      	}
      	service_order_list.splice(index, 1);
      	this.hidePop();
      },
      //删除无效的单子
      delInvalidOrder(originArr, invalidArr){
      	var len = originArr.length;
      	if (!len) {
      		return;
      	}
      	for (var i = len-1; i >= 0; i--) {
      		var item = originArr[i], idx = -1;
      		var val = item.order_sn ? item.order_sn : item;
    			console.log(idx)
    			if ( invalidArr.indexOf(val) !== -1) {
      			originArr.splice(i, 1);
      		}
      	}
      },
      //隐藏浮框
      hidePop(){
        document.getElementById('app').click();
      },
      saveDraft(isNext){
      	var data = {
      		work_order_sn: this.work_order_sn,
      		confirm_step: this.confirm_step,
      		id_list_delete: this.id_list_delete,
		  order_sn_list_add: this.order_sn_list_add,
		  contactName:this.contactName,
		  contactPhone:this.contactPhone,
		  contactEmail:this.contactEmail,
		  salesman:this.salesman,
		  agentName: this.agentName,
		  selectDocument: this.selectDocument
      	};
      	if (isNext) {
			let reg = /^1[0-9]{10}$/
			if(!this.contactName){
				this.$message.warning('请输入联系人');
				return
			}
			if(!this.contactPhone){
				this.$message.warning('请输入联系电话');
				return
			}
			if(!reg.test(this.contactPhone)){
				this.$message.warning('请输入正确的联系电话');
				return
			}
			if(!this.contactEmail){
				this.$message.warning('请输入邮箱');
				return
			}
			let pat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
			if(!pat.test(this.contactEmail)){
				this.$message.warning('请输入正确的邮箱');
				return
			}
			// if(!this.infoDetailData.salesman){
			// 	this.$message.warning('请输入业务专员');
			// 	return
			// }
			if(!this.agentName){
				this.$message.warning('请输入完成专员');
				return
			}
			if(!this.selectDocument){
				this.$message.warning('请输入流程专员');
				return
			}
			data.draft_state = 0
      	}else{
			
      		data.draft_state = 1
      	}
      	this.$http.post(saveDraftUrl, data)
      	.then((resp) => {
      		//var data = resp.data;
      		//if (data.work_order_sn) {
      			//this.next();
      			if (!isNext) {
      				this.$message.success('保存草稿成功！');
      				this.queryDetail(true);
      			}else{
      				this.$router.push({name: 'stepTwo', query: Object.assign({}, this.$route.query, {confirm_step: 2})})
      			}
      		//}
      	})
      	.catch((err) => {
      		if (err && err.msg) {
						this.$message.error(err.msg);
						this.queryDetail(true);
					}
      	});
      },
      next(){
      	this.saveDraft(true);
      },
      back(){
      	var routerName = 'myServiceOrderList'; //我的服务列表
    		if (this.reffer == 2) {
    			routerName = 'clientServiceList'; //工单列表
    		}
    		this.$router.push({name: routerName})
      }
    },
    mounted() {
    	this.work_order_sn = this.$route.query.work_order_sn;
    	this.confirm_step = this.$route.query.confirm_step;
		this.reffer = this.$route.query.reffer || 1;
		let userinfo = store.get('userinfo')
		this.salesman= userinfo.employee
		this.agentName= userinfo.employee
    	this.queryDetail();
    }
  }

</script>
<style lang='less'>
.confirm_self{padding:60px 90px 90px;background-color:#fff;min-height: 500px;
	.confirm_tit{border-bottom:1px solid #dfe2e5;padding-bottom: 10px;
		>p{font-size:14px;color:#223344;margin-bottom: 10px;}
		ul{
			li{margin-bottom: 10px;
				p{font-size: 13px;}
				.tit{width:75px;margin-right: 55px;color:#556677;line-height: 30px;}
				.txt{color: #7F8FA4;}
			}
		}
		.hasrequired:before{
			content: '*';
			color:red;
		}
	}
	.confirm_tab{padding-top: 20px;position: relative;
		.tab_tit{font-size:14px;color:#223344;margin-bottom: 10px;}
		.tab_txt{font-size: 13px;color:#7f8fa4;}
		.tab_r{position: absolute;right:0;top: 65px;
			span{font-size:14px;color:#556677;vertical-align: top;
				i{color:#D2D9E0;cursor: pointer;margin-right:5px;}
				i:hover{color:#289CF4;}
			}
			.unlist{width:60px;height:24px;line-height:22px;border-radius: 2px;font-size:12px;margin-left: 15px;border: 1px solid #A8AFB5;color:#A8AFB5;cursor:default;
				span{color:#A8AFB5;}
			}
			.list{width:60px;height:24px;line-height:22px;border-radius: 2px;border: 1px solid #479CFF;color:#479CFF;font-size:12px;margin-left: 15px;
				span{color:#479CFF;}
			}
		}
		.td_1{width:15%;}
		.td_2{width:20%;}
		.td_3{width:20%;}
		.td_4{width:30%;}
		.td_5{width:15%;text-align: right;padding-right: 30px;}
		.tab_list{border:1px solid #dfe2e5;margin-top: 20px;border-bottom:0;
			>div{height:40px;line-height:40px;border-bottom:1px solid #dfe2e5;
				p{padding-left: 20px;color:#556677;
					a{color:#479cff;text-decoration:none;}
					a:hover{color:#408CE6;}
				}
			}
			.list_tit{background-color:#f5f5f5;
				p{color:#223344;}
			}
		}
		.newClass{background-color:#F7FCFF;}
	}
	.confirm_btn{width:315px;margin:60px auto 0;
		p{padding:0 30px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height:30px;cursor: pointer;}
		p:hover{border-color: #408CE6;color: #408CE6;}
		.btn_bg{background-color:#479CFF;color:#fff;}
		.btn_bg:hover{border-color: #408CE6;background-color: #408CE6;color:#fff;}
	}
	.remark_icon_wrap{
		position: relative;top: 13px;
		.remark_icon{
			display:inline-block;background: transparent url(~assets/img/remark.png) 0 center no-repeat;margin-left: 2px;width: 12px;height: 16px;
			&:hover{text-decoration:none;}
		}
	}
}

.el-popover{
	.conditions{font-size: 12px;color: #556677;margin-bottom:0px;}
	p{margin-bottom:10px;}
	span{cursor:pointer;}
	.error{font-size:13px;color: #A8AFB5;}
	.move{font-size: 13px;color: #479CFF;margin-left: 15px;}
}
</style>
