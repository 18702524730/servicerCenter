<template>
	<div class="commonList myOrder">
		<div class="commonListHead myServiceOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
				<el-tab-pane label="全部" name="all"></el-tab-pane>
				<el-tab-pane label="待付款" name="toPay"></el-tab-pane>
				<el-tab-pane label="已付款" name="paid"></el-tab-pane>
				<el-tab-pane label="已关闭" name="close"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.pay_order_sn" placeholder="订单号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.truename" placeholder="客户姓名"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.phone" placeholder="注册手机号"></el-input></div>
			<!-- <div class="form_control"><el-input v-model="dataObj.order_payment_sn" placeholder="商户订单号"></el-input></div> -->
			<div class="form_control">
				<el-select v-model="dataObj.payment_state" clearable placeholder="支付状态">
					<el-option
						v-for="item in payStatusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="finished_time"
					type="daterange"
					align="right"
					start-placeholder="下单时间开始"
					end-placeholder="结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="payment_time"
					type="daterange"
					align="right"
					start-placeholder="支付时间开始"
					end-placeholder="结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<!--
			<div class="form_control">
				<el-select v-model="typeobj.fir_id" clearable placeholder="请选择商品大类" @change="bs_type_change(1, typeobj.fir_id)">
					<el-option
						v-for="item in firTypeData"
						:key="item.bs_class_id"
						:label="item.name"
						:value="item.bs_class_id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.sec_id" :disabled="!secTypeData.length" clearable placeholder="请选择商品类别" @change="bs_type_change(2, typeobj.sec_id)">
					<el-option
						v-for="item in secTypeData"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.thi_id" :disabled="!thiTypeData.length" clearable placeholder="请选择商品名称" @change="bs_type_change(3, typeobj.thi_id)">
					<el-option
						v-for="item in thiTypeData"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.fou_id" :disabled="!fouTypeData.length" clearable placeholder="请选择服务状态" @change="bs_type_change(4)">
					<el-option
						v-for="item in fouTypeData"
						:key="item.bs_feedback_id "
						:label="item.name"
						:value="item.bs_feedback_id ">
					</el-option>
				</el-select>
			</div>
			<div class="form_control" v-if="userInfo.is_admin && userInfo.spType != 2">
				<el-select v-model="dataObj.operator_id" clearable placeholder="请选择代理顾问">
					<el-option
						 v-for="(item, index) in allOperatorData" :label="item.name" :value="item.operator_id " :key="item.operator_id">
					</el-option>
				</el-select>
			</div>
			 -->
			<div class="form_control">
				<el-select v-model="dataObj.order_bussiness_type" clearable placeholder="订单类型">
					<el-option
						 v-for="(item, index) in orderTypeData" :label="item.name" :value="item.id " :key="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search('first')">搜索</button>
				<button class="reset" @click="reset()">重置</button>
			</div>
		</div>
		<div class="result result_no_check">
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th width="140">订单号</th>
						<th class="minWidth">订单类型</th>
						<th class="minWidth">下单时间</th>
						<th class="minWidth">客户姓名</th>
						<th>客户手机号</th>
						<th class="minWidth">服务数量</th>
						<th class="minWidth">总金额</th>
						<th class="minWidth">支付状态</th>
						<th class="minWidth">订单状态</th>
						<th style="border-right:1px solid #DFE2E5" width="60">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td>{{item.order_sn}}</td>
						<td>{{item.order_bussiness_type == 1 ? '服务订单' : '商品订单'}}</td>
						<td>{{item.create_time|dateFormat}}</td>
						<td>{{item.buyer_name}}</td>
						<td>{{item.buyer_mobile}}</td>
						<td>{{item.sonOrderCount}}</td>
						<td>{{item.order_amount|priceformat}}</td>
						<td :class="{pay:true, nopay: item.payment_state === 0}">{{item.payment_state === 0 ? '未支付' : '已支付'}}</td>
						<td >{{item.order_state|orderStatusformat}}</td>
						<td class="alignc action">
							<a href="#" class="view" @click.prevent="view(item)">查看</a>
						</td>
					</tr>
					<tr class="empty" v-show="!loading && !dataList.length">
						<td colspan="11" class="norecord">
							<div class="empty_ic"><span>暂无信息</span></div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="my_loading" v-show="loading" v-loading="loading">
			</div>
			<div class="tb_pagination" v-if="!loading && dataList.length">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="pg_index"
					:page-size="15"
					layout="total, prev, pager, next"
					:total="total" class="fr">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from 'qs'
	import $ from 'jquery'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
	const orderListUrl = './api/findOrdersList';
	const businessesClassesUrl = './api/businesses_classes';
	const productUrl = './api/product';
	const serviceStatusUrl = './api/getBsFeedbackListByBsId';
	const receiveOrderUrl = './api/receiveOrder';
	const infoSubmitUrl = './api/info_confirm';
	const statisticsUrl = './api/tas/orders/statistics';
	const findAsistantRemarkUrl = './api/findAsistantRemark';
	const payStatusOptions = [
		{
			value: '0',
			label: '未支付'
		}, {
			value: '1',
			label: '已支付'
		}
	];
	const orderTypeData = [
		{
			name: '服务订单',
			id: 1
		},
		{
			name: '商品订单',
			id: 2
		},
	]
	const typeobj = {//商品筛选
		fir_id:'',
		sec_id:'',
		thi_id:'',
		fou_id:'',
	};
	const dataObj = {//条件数据
		bs_order_sn:'',
		truename:'',
		phone: '',
		payment_state:'',
		operator_id:''
	};
	const distributeMenuPermission = 'iprp_order_manage_fenpei';
	// 检查标签是否支持该属性
	function ElementSupportAttribute(elm, attr) {
	  var test = document.createElement(elm);
	  return attr in test;
	}
	// 粗略判断，因为只要兼容ie9+
	const isIE9 = !ElementSupportAttribute('input','placeholder');
	export default {
		name: 'order-list',
		data() {
			return {
				orderTypeData: orderTypeData,
				remark: '', // popover 备注
				notFirst: false,//用于判定是否第一次用于记忆query参数
				distributeIsAllowed: false,
				queryObj: {},
				activeName:'all',
				firTypeData:[],
				secTypeData:[],
				thiTypeData: [],
				fouTypeData:[],
				dataObj: Object.assign({}, dataObj),
				order_state:'',
				payment_time: '',
				finished_time:'',
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				selectedItems: [], //选中的
				checkAll: false,
				isIndeterminate: false,
				payStatusOptions: payStatusOptions,
				dataList:[],
				//currentPage: 1,
				pg_index: 1,
				pg_count: 15,
				total:0,
				dialogVisible:false,
				allotVisible: false,
				distributeVisible: false,
				operator_id:'',//代理顾问id
				operatorData: [],
				allOperatorData:[],
				content:'', //备注,
				loading: false,
				userInfo:{},
				distributeLoading: false
			}
		},
		mounted() {
			this.userInfo = store.get('userinfo');
			this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
			if (this.userInfo.is_admin && this.userInfo.spType != 2) {
				//this.getAllOperatorData();
			}
			this.recoverQueryData();
			this.search();
			this.formatTabName();
			//console.log(this.$route)
			setTimeout(function(){
				FauxPlaceholder();
			},300)

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
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				for (var n in dataObj){
					if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
				}
				this.finished_time = queryObj.finished_start_time && [new Date(queryObj.finished_start_time-0), new Date(queryObj.finished_end_time-86390000)];
				this.payment_time = queryObj.payment_start_time && [new Date(queryObj.payment_start_time-0), new Date(queryObj.payment_end_time-86390000)];

				this.order_state = queryObj.order_state;

				this.pg_index = queryObj.pg_index;
			},
			search(p){
				if (p != 'noClear') {
					this.selectedItems = [];
				}
				var ret = {}
				if (this.finished_time) {
					ret.finished_start_time = this.finished_time[0] ? new Date(this.finished_time[0]).getTime() : null;
					ret.finished_end_time = this.finished_time[1] ? new Date(this.finished_time[1]).getTime() + 86390000 : null;
				}
				if (this.payment_time) {
					ret.payment_start_time = this.payment_time[0] ? new Date(this.payment_time[0]).getTime() : null;
					ret.payment_end_time = this.payment_time[1] ? new Date(this.payment_time[1]).getTime() + 86390000 : null;
				}
				//ret.bs_calss_id = this.typeobj.fou_id || this.typeobj.thi_id || this.typeobj.sec_id || this.typeobj.fir_id
				//ret.bs_calss_type = this.typeobj.fou_id ? 4 : this.typeobj.thi_id ? 3 : this.typeobj.sec_id ? 2 : this.typeobj.fir_id ? 1 : ''
				ret.order_state = this.order_state;

				ret.pg_index = p === 'first' ? 1 : this.pg_index;
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				//console.log(data)
				this.getOrderList(data);
				this.$router.replace({query: Object.assign({}, data, {selfChange: true})});
				//console.log(this.$route.query)
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
				this.payment_time = '';
				this.finished_time = '';
				this.secTypeData = [];
				this.thiTypeData = [];
				this.fouTypeData = [];
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search('noClear');
			},
			formatTabName(){
				var queryObj = this.queryObj = this.$route.query;
				this.order_state = queryObj.order_state;
				var ret = 'all';
				if(this.order_state == '0'){
					ret = 'toPay';
				}else if(this.order_state == '1'){
					ret = 'paid';
				}else if(this.order_state == '-1'){
					ret = 'close';
				}
				this.activeName = ret;
			},
			tabClick(tab, event) {
				this.order_state = null;
				if(tab.name == 'toPay'){
					this.order_state = 0;
				}else if(tab.name == 'paid'){
					this.order_state = 1;
				}else if(tab.name == 'close'){
					this.order_state = -1;
				}
				this.search();
			},
			getOrderList(data){
				data = data || {};
				this.loading = true;
				this.$http.get(orderListUrl, {params: data})
				.then((resp) => {
					this.notFirst = true;
					this.loading = false;
					var data = resp.data;
					var dataList = data.elements;
					/*dataList.forEach((item, i) => {
						var arr = this.selectedItems;
						var idx = this.inArrayOf(arr, item, 'order_sn');
						item.checked = idx != -1;
					});*/
					this.dataList = dataList;
					this.pg_index = data.pageNo || 1;
					this.total = data.total_elements;
					//this.checkIsAll();
				})
				.catch((err) => {
					this.loading = false;
					this.$message.error(err.msg);
					console.log(err);
				});
			},
			view(item){
				this.$router.push({name: 'orderDetail', params: {order_id: item.order_id, order_bussiness_type: item.order_bussiness_type}})
			},
			updateMenuNum(){
      	this.$http.get(statisticsUrl)
      	.then((resp) => {
      		var data = resp.data;
      		this.$store.commit('SET_STATISTICS_DATA', data);
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
			//批量接单
			batch(){
				if (!this.selectedItems.length) {
					this.$message('请选择服务单');
					return;
				}
				this.$http.post(receiveOrderUrl, {
					orderIds: this.getselectedItemsPropertyByName('order_id')
				})
				.then((resp) => {
					var data = resp.data;
					this.$message.success('批量接单成功');
					this.search();
					this.updateMenuNum();
				})
				.catch((err) => {
					//console.log(err);
					/*this.$message({
						type:'success',
						message:err.msg,
						duration:0
					});*/
					this.$message.error(err.msg);
				});
			},
			//信息提交
			infoSubmit(){
				if (!this.selectedItems.length) {
					this.$message('请选择服务单');
					return;
				}
				this.$http.put(infoSubmitUrl, {
					order_sn_list: this.getselectedItemsPropertyByName('order_sn')
				})
				.then((resp) => {
					var data = resp.data;
					if (data.work_order_id) {
						this.$router.push({name: 'stepOne', query: {work_order_sn: data.work_order_sn, confirm_step: data.confirm_step, reffer: 1, is_submit: 0}})
					}
				})
				.catch((err) => {
					//console.log(err);
					this.$message.error(err.msg);
				});
			},
			getselectedItemsPropertyByName(name){
				var arr = [];
				var selectedItems = this.selectedItems;
				selectedItems.forEach((item, i) => {
					arr.push(item[name]);
				});
				return arr;
			},
			memo(){
				this.content = '';
				this.dialogVisible = true;
			},

			checkIsAllSelected(){
				var dataList = this.dataList;
				var temp = 0;
				dataList.forEach((item, i) => {
					if (item.checked) {
						temp += 1;
					}
				});
				return temp === dataList.length
			},
			inArrayOf(arr, sortItem, sortName){
				var ret = -1;
				arr.forEach((item, i) => {
					if (item[sortName] == sortItem[sortName]) {
						ret = i;
						return false;
					}
				});
				return ret;
			},
			handleCheckChange(item){
				var arr = this.selectedItems;
				var idx = this.inArrayOf(arr, item, 'order_sn');
				if (idx != -1) {
					arr.splice(idx, 1);
				}else{
					arr.push(item);
				}
				if (!item.checked) {
					this.isIndeterminate = true;
				}else if(this.checkIsAllSelected()){
					this.isIndeterminate = false;
				}
			},
			checkIsAll(){
				var self = this;
				var arr = this.selectedItems;
				var dataList = this.dataList;
				var ret = true;
				self.isIndeterminate = false;
				self.checkAll = false;
				// 没有获取到数据的时候选择框不选中
				if(dataList.length){
					dataList.forEach((item, i) => {
						var idx = self.inArrayOf(arr, item, 'order_sn');
						if (idx == -1) {
							ret = false;
							return false;
						}
					});
				}else{
					ret = false;
				}
				self.checkAll = ret;
			},
			handleAllCheckChange(){
				this.isIndeterminate = false;
				var self = this;
				var arr = this.selectedItems;
				var dataList = this.dataList;
				//处理选中的数据
				dataList.forEach((item, i) => {
					var idx = self.inArrayOf(arr, item, 'order_sn');
					if (self.checkAll) {
						item.checked = true;
						if (idx == -1) {
							arr.push(item);
						}
					}else{
						item.checked = false;
						if (idx != -1) {
							arr.splice(idx, 1);
						}
					}
				});
			},
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
			orderStatusformat: Filters.orderStatusformat,
			payStatusformat: Filters.payStatusformat,
			priceformat:Filters.priceformat,
			titleLengthFormat:Filters.titleLengthFormat
		},
		watch:{
			$route(to, from) {
				if (to.query.selfChange) {
					return;
				}
				this.formatTabName();
				this.recoverQueryData()
				this.search();
			}
		}
	}
</script>
<style lang='less'>
.myOrder{
	.distributeDialog{
		// 弹框公用样式继承自common.css
		.el-dialog{
			width: 330px;transform:translate(-50%,-50%);
			.distribute_in{
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-radio-group{line-height: 18px;}
					.el-radio{width: 96px;overflow: hidden;margin-bottom: 8px;}
					.el-radio+.el-radio{margin-left: 0; }
					.el-radio__inner{width: 16px;height: 16px;}
				}
				.el-textarea{margin-top: 10px;}
				>p{text-align: right;padding-top: 12px;}
			}
		}
	}

	.memoDialog{
		.el-dialog{
			width: 500px;height: 256px;
			.el-dialog__title{font-size: 14px;font-weight: normal;color: #223344;}
			.el-dialog__headerbtn{font-size: 14px;}
			.el-dialog__body{
				padding:10px 20px;
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.el-textarea{margin-top: 10px;}
			}
		}
	}
	.el-select .el-input .el-input__icon{-ms-transform:translateY(-50%) rotate(180deg) !important;}
}
.dialog_con_box .circular{width: 30px;height: 30px;}

.remark_icon_wrap{
	.remark_icon{
		display:inline-block;background: transparent url(~assets/img/remark.png) 0 center no-repeat;margin-left: 2px;width: 12px;
		&:hover{text-decoration:none;}
	}
}
.popper_remark_icon{
	min-height: 41px;width: 400px;height: 154px;
	p{margin-bottom: 0!important;word-break: break-all;}
}
</style>
