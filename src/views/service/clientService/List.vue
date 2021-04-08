<template>
	<div class="commonList clientServiceOrder">
		<div class="commonListHead clientServiceOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
				<el-tab-pane v-for="(active, idx) in serviceStatusOptions" :label="active.label" :key="idx" :name="active.name" ></el-tab-pane>
			</el-tabs>
		</div>
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.trademarkSubjectName" placeholder="主体名称"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.regInfo" placeholder="注册信息"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.memberName" placeholder="客户姓名"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.memberPhone" placeholder="注册手机号"></el-input></div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="confirmTime"
					type="daterange"
					align="right"
					start-placeholder="确认时间开始"
					end-placeholder="结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<!-- <div class="form_control">
							<el-select v-model="dataObj.status" clearable placeholder="服务状态">
								<el-option
									v-for="item in serviceStatusOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div> -->
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
		</div>

		<div class="result result_no_check">
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th>服务类型</th>
						<th class="minWidth">主体名称</th>
						<th>注册信息</th>
						<th class="minWidth">客户姓名</th>
						<th>注册手机号</th>
						<th class="minWidth confirmTime">确认时间</th>
						<th class="minWidth">服务状态</th>
						<th class="alignr minWidth">商标类数</th>
						<th class="alignr minWidth">追加项数</th>
						<th class="alignc minWidth" width="80">加项支付</th>
						<th class="minWidth" width="100"></th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td>{{item.bsName}}</td>
						<td><span class="break_all" :title="item.trademarkSubjectName">{{item.trademarkSubjectName|titleLengthFormat(12)}}</span></td>
						<td><span class="min_break_all" :title="item.regInfo">{{item.regInfo|titleLengthFormat(45)}}</span></td>
						<td>{{item.memberName}}</td>
						<td>{{item.memberPhone}}</td>
						<td>{{item.confirmTime|dateFormat}}</td>
						<td>{{item.status|statusLabel}}</td>
						<td class="alignr">{{item.registClassNumber}}</td>
						<td class="alignr">{{item.additionItem}}</td>
						<td class="alignc">{{item.additionItemPay | additionItemPayStatus}}</td>
						<td class="action">
							<a href="#" class="view" @click.prevent="view(item)">详情</a>
							<a href="#" class="edit" :class="{disabled: item.status>1}" @click.prevent="edit(item)">修改</a>
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
		<el-dialog title="提示" :visible.sync="confirmVisible" class="confirmD" top="40%">
			<div class="confirm_tip">
				<p>当前有未提交的草稿信息，确认进行加载?</p>
				<a href="" class="button no" @click.prevent="goto(false)">否</a><a href="" class="button yes" @click.prevent="goto(true)">是</a>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import qs from 'qs'
	import $ from 'jquery'
	import Filters from 'utils/filters/'
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
	const workOrderListUrl = './api/findWorkOrdersList';
	const businessesClassesUrl = './api/businesses_classes';
	const productUrl = './api/product';
	const serviceStatusUrl = './api/getBsFeedbackListByBsId';
	const receiveOrderUrl = './api/receiveOrder';
	const infoSubmitUrl = './api/info_confirm';
	const defferUrl = './api/is_differ';
	// 检查标签是否支持该属性
	function ElementSupportAttribute(elm, attr) {
		var test = document.createElement(elm);
		return attr in test;
	}
	// 粗略判断，因为只要兼容ie9+
	const isIE9 = !ElementSupportAttribute('input','placeholder');
	const serviceStatusOptions = [
		{
			value: '',
			name: 'all',
			label: '全部'
		}, {
			value: '0',
			name: '0',
			label: '待提交'
		}, {
			value: '1',
			name: '1',
			label: '已提交待确认'
		}, {
			value: '2',
			name: '2',
			label: '加项待付款'
		}, {
			value: '3',
			name: '3',
			label: '待审核'
		}, {
			value: '4',
			name: '4',
			label: '已审核'
		}
	];

	const dataObj = {//条件数据
		regInfo:'',
		//status:'',
		memberName: '',
		memberPhone:'',
		trademarkSubjectName:''
	};

	export default {
		name: 'work-order-list',
		data() {
			return {
				confirmVisible:false,
				queryObj: {},
				activeName:'all',
				dataObj: Object.assign({}, dataObj),

				status:'',
				order_tasking_state:'',

				confirmTime: '',
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
				serviceStatusOptions: serviceStatusOptions,
				dataList:[],
				currentPage: 1,
				pg_index: 1,
				pg_count: 15,
				total:0,


				dialogVisible:false,
				allotVisible: false,
				content:'', //备注
				loading: false
			}
		},
		mounted() {
			this.recoverQueryData()
			this.search();
			this.formatTabName();
			setTimeout(function(){
				FauxPlaceholder();
			},300);
		},
		methods: {
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				for (var n in dataObj){
					if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
				}
				this.confirmTime = queryObj.confirmTimeStart && [new Date(queryObj.confirmTimeStart-0), new Date(queryObj.confirmTimeEnd-86390000)];

				this.status = queryObj.status;
				this.pg_index = queryObj.pg_index ? queryObj.pg_index-0 : 1;
			},
			search(extra){
				var ret = {}
				if (this.confirmTime) {
					ret.confirmTimeStart = this.confirmTime[0] ? new Date(this.confirmTime[0]).getTime() : null;
					ret.confirmTimeEnd = this.confirmTime[1] ? new Date(this.confirmTime[1]).getTime() + 86390000 : null;
				}

				ret.status = this.status;

				ret.pg_index = extra ? 1 : this.pg_index;
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				//console.log(data)
				this.getOrderList(data);
				this.$router.replace({query: Object.assign({}, data, {selfChange: true})});
				console.log(this.$route.query)
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
				this.confirmTime = '';
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search();
			},
			formatTabName(){
				var queryObj = this.queryObj = this.$route.query;
				var status = this.status = queryObj.status;
				this.activeName = status ? status : 'all';
			},
			tabClick(tab, event) {
				if(tab.name == 'all'){
					this.status = ''
				}else{
					this.status = tab.name ? tab.name : '';
				}
				this.search();
			},
			getOrderList(data){
				data = data || {};
				this.loading = true;
				this.$http.get(workOrderListUrl, {params: data})
				.then((resp) => {
					this.loading = false;
					var data = resp.data;
					var dataList = data.elements;
					/*dataList.forEach((item, i) => {
						var arr = this.selectedItems;
						var idx = this.inArrayOf(arr, item, 'order_sn');
						item.checked = idx != -1;
					});*/
					this.dataList = dataList;
					this.total = data.total_elements;
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
			},
			view(item){
				this.$router.push({name: 'workDetail', params: {id: item.workOrderSn}})
			},
			edit(item){
				//1、当工单状态处于待提交时，点击编辑，页面停留在上次编辑页面；
				//2、当工单处于已提交待确认时，点击编辑跳转到信息确认的步骤一阶段；
				//3、当工单已被确认（包含未支付补小项费状态下），不可在点击修改
				var status = item.status;
				if (status > 1) {return;}
				var confirmStep = item.confirmStep;
				if (!confirmStep) {return;}
				confirmStep = status == 1 ? 1 : item.confirmStep
				var stepName = confirmStep == 1 ? 'stepOne' : confirmStep == 2 ? 'stepTwo' : confirmStep == 3 ? 'stepThree' : confirmStep == 4 ? 'stepFour' : '';
				this.$router.push({name: stepName, query: {
					work_order_sn: item.workOrderSn,
					confirm_step: confirmStep,
					is_submit: 0, //0取草稿数据，1取已提交的数据
					reffer: 2
				}});
				/*
				this.stepName = stepName;
				this.confirmStep = confirmStep;
				this.workOrderId = item.workOrderId;

				this.$http.get(defferUrl, {params: {work_order_id: item.workOrderId}})
				.then((resp) => {
					var data = resp.data;
					var differ_state = data.differ_state;
					var query = {
						work_order_id: item.workOrderId,
						confirm_step: confirmStep,
						is_submit: 0, //0取草稿数据，1取已提交的数据
						reffer: 2
					}
					// differ_state 1: 表示草稿和已提交的数据不相同，0表示只有草稿，2表示相同
					if (differ_state == 1) {
						this.confirmVisible = true;
					}else{
						this.$router.push({name: stepName, query: query});
					}
				})
				.catch((err) => {
					if (err && err.msg) {
						this.$message.error(err.msg);
					}
				});
				*/
			},
			goto(is){
				var query = {
					work_order_id: this.workOrderId,
					confirm_step: this.confirmStep,
					is_submit: 0, //0取草稿数据，1取已提交的数据
					reffer: 2
				}
				if (!is) {
					query.is_submit = 1;
				}
				this.$router.push({name: this.stepName, query: query});
			}
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
			orderStatusformat: Filters.orderStatusformat,
			payStatusformat: Filters.payStatusformat,
			priceformat:Filters.priceformat,
			additionItemPayStatus:Filters.additionItemPayStatus,
			titleLengthFormat:Filters.titleLengthFormat,
			statusLabel:Filters.statusLabel
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
.clientServiceOrder{
	.result{
		thead{
			tr{
				th.confirmTime{min-width: 150px;}
			}
		}
		tbody{
			tr{
			}
		}
	}
	.confirmD{
		// 弹框公用样式继承自common.css
		.el-dialog{
			width: 310px;
			.el-dialog__body{
				.confirm_tip{
					text-align: right;
					p{text-align: left;font-size: 14px;color: #556677;padding-bottom: 20px;line-height: 20px;}
				}
			}
		}
	}
}
</style>
