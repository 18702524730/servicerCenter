<template>
	<div class="commonList servicePublish">
		<div class="commonListHead myServiceOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
				<el-tab-pane label="全部" name="all"></el-tab-pane>
				<el-tab-pane label="上架" name="toService"></el-tab-pane>
				<el-tab-pane label="下架" name="servicing"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.product_num" placeholder="商品编号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.service_name" placeholder="服务名称"></el-input></div>
			<div class="form_control">
				<el-select v-model="dataObj.first_category" clearable placeholder="一级类目选择"  @change="bs_type_change(1, dataObj.first_category)">
					<el-option
						v-for="item in firTypeData"
						:key="item.bs_class_id"
						:label="item.name"
						:value="item.bs_class_id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.second_category" clearable placeholder="二级类目选择"  @change="bs_type_change(2, dataObj.second_category)">
					<el-option
						v-for="item in secTypeData"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.third_category" clearable placeholder="三级类目选择"  @change="bs_type_change(3,dataObj.third_category)">
					<el-option
						v-for="item in thiTypeData"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.ground_status" clearable placeholder="上架状态">
					<el-option
						v-for="item in groundStatus"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.verify_status" clearable placeholder="审核状态">
					<el-option
						v-for="item in verifyStatus"
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
					start-placeholder="发布时间开始"
		      end-placeholder="结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="finished_time"
					type="daterange"
					align="right"
					start-placeholder="最后编辑时间开始"
		      end-placeholder="结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.stick" clearable placeholder="选择置顶情况">
					<el-option
						v-for="item in stickOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search('first')">搜索</button>
				<button class="reset" @click="reset()">重置</button>
			</div>
		</div>
		<div class="result">
			<div class="table_handle">
				<div class="all">
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange"></el-checkbox>
				</div>
				<div class="table_handle_btn batch" @click="batch">上架</div>|
				<!-- <div class="table_handle_btn infoSubmit" @click="infoSubmit">下架</div>| -->
				<div class="table_handle_btn batchDistribute" @click="moveData">删除</div>
				<div class="publish_service">
					<el-button size="small" type="primary" @click="toProcedure">发布服务</el-button>
				</div>
			</div>
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th width="56"></th>
						<th width="140" style="padding-left: 0">商品编号</th>
						<th class="50">封面</th>
						<th width="110">服务名称</th>
						<th class="minWidth alignr">类目</th>
						<th class="alignr">服务售价</th>
						<th class="minWidth alignr">折扣价格</th>
						<th class="minWidth alignr">销售量</th>
						<th width="100" style="padding-left:10px;">发布时间</th>
						<th width="90">最后编辑</th>
						<th class="minWidth">上架状态</th>
						<th class="minWidth">审核状态</th>
						<th style="border-right:1px solid #DFE2E5" width="80">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td class="check_wrap"><el-checkbox v-model="item.checked" @change="handleCheckChange(item)"></el-checkbox></td>
						<td style="padding-left: 0">
							004502558855544
            </td>
						<td><img src="https://img04.sogoucdn.com/net/a/04/link?url=https%3A%2F%2Fi04piccdn.sogoucdn.com%2F3c919fcb744f0cc9&appid=122" alt=""></td>
						<td>服务名称：冯绍峰实得分实得分是</td>
						<td class="alignr">中国专利奖</td>
						<td class="alignr">898.00</td>
						<td class="alignr">898.00</td>
						<td class="alignr">123</td>
						<td style="padding-left:10px;">2018-06-13 15:55:03</td>
						<td>2018-06-13 15:55:03</td>
						<td>--</td>
						<td>审核不通过</td>
						<td class="alignl action">
							<a href="#" class="view" @click.prevent="view(item)">取消置顶</a><br>
							<a href="#" class="view" @click.prevent="view(item)">编辑</a>
						</td>
					</tr>
					<tr class="empty" v-show="!loading && !dataList.length">
						<td colspan="13" class="norecord">
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
		<!-- <el-dialog title="分配" :visible.sync="distributeVisible" :modal-append-to-body="true" top="50%" class="distributeDialog">
			<div class="title_in distribute_in">
				<h5>请选择代理顾问：</h5>
				<div class="dialog_con_box" v-loading="distributeLoading">
					<el-radio-group v-model="operator_id">
						<el-radio class="radio" v-for="(item, index) in operatorData" :label="item.operator_id" :key="item.operator_id">{{item.trueName}}</el-radio>
					</el-radio-group>
				</div>
				<p><a href="" class="button no" @click.prevent="distributeVisible = false">取消</a><a href="" class="button yes" @click.prevent="distribute">确定</a></p>
			</div>
		</el-dialog> -->
	</div>
</template>

<script>
	import qs from 'qs'
	import $ from 'jquery'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
	const bsOrderListUrl = './api/findBsOrdersList';
	const businessesClassesUrl = './api/businesses_classes';
	const productUrl = './api/product';
	const serviceStatusUrl = './api/getBsFeedbackListByBsId';
	const receiveOrderUrl = './api/receiveOrder';
	const infoSubmitUrl = './api/info_confirm';
	const getOperatorsUrl = './api/distributionManFromOrderList';
	const batchDistributeUrl = './api/addOperatorToOrderList';
	const allOperatorUrl = './api/admins';
	const statisticsUrl = './api/tas/orders/statistics';
	const findAsistantRemarkUrl = './api/findAsistantRemark';
	const verifyStatus = [
		{
			value: '1',
			label: '审核通过'
		}, {
			value: '2',
			label: '审核未通过'
		}
	];
	const stickOptions = [
		{
			value: '1',
			label: '是'
		}, {
			value: '2',
			label: '不是'
		}
	];
	const groundStatus = [
		{
			value: '1',
			label: '已上架'
		}, {
			value: '2',
			label: '未上架'
		}, {
			value: '3',
			label: '已下架'
		}
	];
	const typeobj = {//商品筛选
		third_category:'',
		sec_id:'',
		second_category:'',
		fou_id:'',
	};
	const dataObj = {//条件数据
		product_num:'',
		service_name:'',
		first_category: '',
		second_category:'',
		third_category:'',
		ground_status:'',
		verify_status:'',
		stick:'',
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
				// remark: '', // popover 备注
				notFirst: false,//用于判定是否第一次用于记忆query参数
				distributeIsAllowed: false,
				queryObj: {},
				activeName:'all',
				typeobj: Object.assign({}, typeobj),
				firTypeData:[],
				secTypeData:[],
				thiTypeData: [],
				fouTypeData:[],
				dataObj: Object.assign({}, dataObj),
				// order_state:'',
				// order_tasking_state:'',
				// order_service_state:'',
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
				stickOptions: stickOptions,
				groundStatus:groundStatus,
				verifyStatus:verifyStatus,
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
				// allOperatorData:[],
				// content:'', //备注,
				loading: false,
				// userInfo:{},
				distributeLoading: false
			}
		},
		mounted() {
			// this.userInfo = store.get('userinfo');
			// this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
			// if (this.userInfo.is_admin && this.userInfo.spType != 2) {
			// 	this.getAllOperatorData();
			// }
			this.recoverQueryData();
			this.getProductType();
			this.search();
			// this.formatTabName();
			//console.log(this.$route)
			setTimeout(function(){
				// FauxPlaceholder();
			},300)

		},
		methods: {
			toProcedure(){
				this.$router.push({name: 'addCommodity'})
			},
			// getRemark(item){
			// 	this.remark = '';
			// 	this.$http.get(findAsistantRemarkUrl + '?orderSn=' + item.order_sn)
			// 	.then((resp) => {
			// 		var data = resp.data;
			// 		this.remark = data.remarks;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
			// },
			// getAllOperatorData(){
			// 	this.$http.get(allOperatorUrl)
			// 	.then((resp) => {
			// 		var data = resp.data;
			// 		this.allOperatorData = data.elements;
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
			// },
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				var typeobj = this.typeobj;
				for (var n in dataObj){
					if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
				}
				for (var m in typeobj){
					if (typeobj.hasOwnProperty(m)) {
						typeobj[m] = queryObj[m] ? queryObj[m] - 0 : '';
					}
				}
				this.finished_time = queryObj.finished_start_time && [new Date(queryObj.finished_start_time-0), new Date(queryObj.finished_end_time-86390000)];
				this.payment_time = queryObj.payment_start_time && [new Date(queryObj.payment_start_time-0), new Date(queryObj.payment_end_time-86390000)];

				// this.order_service_state = queryObj.order_service_state;
				// this.order_state = queryObj.order_state;
				// this.order_tasking_state = queryObj.order_tasking_state;

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
				ret.bs_calss_id = this.typeobj.fou_id || this.typeobj.third_category || this.typeobj.second_category || this.typeobj.third_category
				ret.bs_calss_type = this.typeobj.fou_id ? 4 : this.typeobj.third_category ? 3 : this.typeobj.second_category ? 2 : this.typeobj.third_category ? 1 : ''
				// ret.order_service_state = this.order_service_state;
				// ret.order_state = this.order_state;
				// ret.order_tasking_state = this.order_tasking_state;

				ret.pg_index = p === 'first' ? 1 : this.pg_index;
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				console.log(data)
				this.getOrderList(data);
				this.$router.replace({query: Object.assign({}, data, this.typeobj, {selfChange: true})});
				//console.log(this.$route.query)
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
				this.typeobj = Object.assign({}, typeobj);
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
			tabClick(tab, event) {
				this.order_service_state = '';
				if(tab.name == 'toService'){
					this.order_service_state = 1;
				}else if(tab.name == 'servicing'){
					this.order_service_state = 2;
				}else if(tab.name == 'serviceComplete'){
					this.order_service_state = 3;
				}else if(tab.name == 'serviceClose'){
					this.order_service_state = 4;
				}
				this.search();
			},
			getOrderList(data){
				data = data || {};
				this.loading = true;
				this.$http.get(bsOrderListUrl, {params: data})
				.then((resp) => {
					this.notFirst = true;
					this.loading = false;
					var data = resp.data;
					var dataList = data.elements;
					dataList.forEach((item, i) => {
						var arr = this.selectedItems;
						var idx = this.inArrayOf(arr, item, 'order_sn');
						item.checked = idx != -1;
					});
					this.dataList = dataList;
					this.pg_index = data.pageNo || 1;
					this.total = data.total_elements;
					this.checkIsAll();
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
			},
			view(item){
				this.$router.push({name: 'bsOrderDetail', params: {id: item.order_id}})
			},
			moveData(){
				
			},
			//商品筛选切换
			bs_type_change (type, id, callback){
				//用于判定是否第一次用于记忆query参数
				var notFirst = this.notFirst;
				if (id) {
					if (type == 3) {
						this.$http.get(serviceStatusUrl, {
							params: {
								bsId: id
							}
						})
						.then((resp) => {
							var data = resp.data;
							this.fouTypeData = data.data;
							if (callback) {
								callback();
							}else{
								// this.dataObj.first_category = notFirst ? '' : this.dataObj.first_category || '';
							}
						})
						.catch((err) => {
							console.log(error.data.msg);
						});
					}else{
						this.$http.get(productUrl, {
							params: {
								type:type,
								parent_id: id
							}
						})
						.then((resp) => {
							var data = resp.data;
							if (type == 1) {
								this['secTypeData'] = data;
								if (callback) {
									callback();
								}else{

									this.dataObj.first_category = notFirst ? '' : this.dataObj.first_category || '';
									// this.dataObj.second_category = notFirst ? '' : this.dataObj.second_category || '';
									// this.dataObj.fou_id = notFirst ? '' : this.dataObj.fou_id || '';
									if (!this.dataObj.second_category || notFirst) {
										this['thiTypeData']= [];
									}
									// if (!this.dataObj.fou_id || notFirst) {
									// 	this['fouTypeData']= [];
									// }
								}
							}else if(type == 2){
								this['thiTypeData'] = data;
								if (callback) {
									callback();
								}else{
									// this.dataObj.second_category = notFirst ? '' : this.dataObj.second_category || '';
									// this.dataObj.fou_id = notFirst ? '' : this.dataObj.fou_id || '';
									// if (!this.dataObj.fou_id || notFirst) {
									// 	this['fouTypeData']= [];
									// }
								}
							}
						})
						.catch((err) => {
							console.log(error.data.msg);
						});
					}
				}
			},
			// distribute(){
			// 	if (!this.operator_id) {
			// 		this.$message('请选择代理顾问');
			// 		return;
			// 	}
			// 	this.$http.post(batchDistributeUrl, qs.stringify({
			// 		operator_id: this.operator_id,
			// 		order_message: '',
			// 		order_id_list: this.getselectedItemsPropertyByName('order_id').join()
			// 	}))
			// 	.then((resp) => {
			// 		this.distributeVisible = false;
			// 		this.operator_id = '';
			// 		this.selectedItems = [];
			// 		this.$message.success('批量分配成功');
			// 		this.search();
			// 	})
			// 	.catch((err) => {
			// 		//console.log(err);
			// 		this.$message.error(err.msg);
			// 	});
			// },
			// updateMenuNum(){
   //    	this.$http.get(statisticsUrl)
   //    	.then((resp) => {
   //    		var data = resp.data;
   //    		this.$store.commit('SET_STATISTICS_DATA', data);
   //    	})
   //    	.catch((err) => {
   //    		console.log(err);
   //    	});
   //    },
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
			// infoSubmit(){
			// 	if (!this.selectedItems.length) {
			// 		this.$message('请选择服务单');
			// 		return;
			// 	}
			// 	this.$http.put(infoSubmitUrl, {
			// 		order_sn_list: this.getselectedItemsPropertyByName('order_sn')
			// 	})
			// 	.then((resp) => {
			// 		var data = resp.data;
			// 		if (data.work_order_id) {
			// 			this.$router.push({name: 'stepOne', query: {work_order_sn: data.work_order_sn, confirm_step: data.confirm_step, reffer: 1, is_submit: 0}})
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		//console.log(err);
			// 		this.$message.error(err.msg);
			// 	});
			// },
			// getselectedItemsPropertyByName(name){
			// 	var arr = [];
			// 	var selectedItems = this.selectedItems;
			// 	selectedItems.forEach((item, i) => {
			// 		arr.push(item[name]);
			// 	});
			// 	return arr;
			// },
			
			getProductType(){//获取商品一级分类
				this.$http.get(businessesClassesUrl, {params: {bs_parent_id: 0}})
				.then((resp) => {
					var data = resp.data;
					console.log(data,'一级类目')
					this.firTypeData = data.elements;
				})
				.catch((err) => {
					console.log(err.data.msg);
				});
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
				// this.formatTabName();
				// this.recoverQueryData()
				this.search();
			}
		}
	}
</script>
<style lang='less'>
.servicePublish{
	.table_handle{position: relative;
		.publish_service{position: absolute;right:20px;top:10px;}
	}
	.el-select .el-input .el-input__icon{-ms-transform:translateY(-50%) rotate(180deg) !important;}
	// 列表部分背景图片修改
	.result .table_handle div.batch {    background: transparent url(~assets/img/goods/putaway.png) 0 center no-repeat;}
	.result .table_handle div.infoSubmit {    background: transparent url(~assets/img/goods/sholdOut.png) 0 center no-repeat;}
	.result .table_handle div.batchDistribute {    background: transparent url(~assets/img/goods/remove.png) 0 center no-repeat;}
}
// 列表图片部分
.commonList .result .result_type tbody tr td img{width:50px;height:50px;}
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
