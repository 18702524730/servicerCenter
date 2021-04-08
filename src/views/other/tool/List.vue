<template>
	<div class="commonList afterSaleOrder">
		<div class="commonListHead afterSaleOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
				<el-tab-pane label="全部" name="all"></el-tab-pane>
				<el-tab-pane label="待审核" name="toCheck"></el-tab-pane>
				<el-tab-pane label="退款驳回" name="fail"></el-tab-pane>
				<el-tab-pane label="退款完成" name="success"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.refund_sn" placeholder="退款单号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.order_sn" placeholder="服务单号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.memberName" placeholder="客户姓名"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.memberPhone" placeholder="注册手机号"></el-input></div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="time"
					type="daterange"
					align="right"
					placeholder="申请退款时间开始 - 结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.state" placeholder="退款状态">
					<el-option
						v-for="item in refundStatusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search()">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
		</div>

		<div class="result">
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th>退款单号</th>
						<th>服务单号</th>
						<th>客户姓名</th>
						<th>注册手机号</th>
						<th>服务名称</th>
						<th>申请退款时间</th>
						<th class="minWidth">退款状态</th>
						<th class="alignc" width="140">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr class="hover" v-for="(item, index) in dataList">
						<td>{{item.refund_sn}}</td>
						<td>{{item.order_sn}}</td>
						<td>{{item.memberName}}</td>
						<td>{{item.memberPhone}}</td>
						<td>{{item.bs_name}}</td>
						<td>{{item.create_time|dateFormat}}</td>
						<td>{{item.state|refundStateFilter}}</td>
						<td class="action">
							<a :href="'#/service/afterSale/detail/'+item.refund_id" class="view">退款详情</a>
							<a :href="'#/service/myServiceOrder/detail/'+item.order_id" class="view">服务详情</a>
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
			<div class="tb_pagination" v-show="!loading && dataList.length">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
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
	import Filters from 'utils/filters/'
	const refundOrderListUrl = './api/serviceRefunds';
	const businessesClassesUrl = './api/businesses_classes';
	const productUrl = './api/product';
	const serviceStatusUrl = './api/getBsFeedbackListByBsId';
	const receiveOrderUrl = './api/receiveOrder';
	const infoSubmitUrl = './api/info_confirm';
	const refundStatusOptions = [
		{
			value: '0',
			label: '待审核'
		}, {
			value: '2',
			label: '退款完成'
		}, {
			value: '3',
			label: '退款驳回'
		}
	];
	const typeobj = {//商品筛选
		fir_id:'',
		sec_id:'',
		thi_id:'',
		fou_id:'',
	};
	const dataObj = {//条件数据
		refund_sn:'',
		order_sn:'',
		memberName: '',
		memberPhone:'',
		state:''
	};

	export default {
		name: 'order-list',
		data() {
			return {
				queryObj: {},
				activeName:'all',

				typeobj: Object.assign({}, typeobj),
				firTypeData:[],
				secTypeData:[],
				thiTypeData: [],
				fouTypeData:[],

				dataObj: Object.assign({}, dataObj),
				state:'',
				time: '',
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
				refundStatusOptions: refundStatusOptions,
				dataList:[],
				currentPage: 1,
				pg_index: 1,
				pg_count: 15,
				total:0,
				loading: false,

				dialogVisible:false,
				allotVisible: false,
				content:'' //备注
			}
		},
		mounted() {
			this.getProductType();
			this.recoverQueryData()
			this.search();
			this.formatTabName();
			console.log(this.$route)
		},
		methods: {
			view(item){
				this.$router.push({name: 'accountDetail', params: {id: item.order_id}})
			},
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				var typeobj = this.typeobj;
				for (var n in dataObj){
					dataObj[n] = this.queryObj[n];
				}
				/*for (var m in typeobj){
					typeobj[m] = this.queryObj[m];
				}*/
				this.time = queryObj.beginTime && [new Date(queryObj.beginTime-0), new Date(queryObj.endTime-86390000)];
				this.state = queryObj.state;
				//获取商品二级分类
				if (queryObj.fir_id) {
					this.bs_type_change(1, queryObj.fir_id, function(){
						this.typeobj.sec_id = queryObj.sec_id-0 || '';
					});
				}

				//获取商品三级分类
				if (queryObj.sec_id) {
					this.bs_type_change(2, queryObj.sec_id, function(){
						this.typeobj.thi_id = queryObj.thi_id-0 || '';
					});
				}

				//获取四级服务状态
				if (queryObj.thi_id) {
					this.bs_type_change(3, queryObj.thi_id, function(){
						this.typeobj.fou_id = queryObj.fou_id-0 || '';
					});
				}
			},
			search(extra){
				extra = extra || {};
				var ret = {}
				if (this.time) {
					ret.beginTime =  this.time[0] ? new Date(this.time[0]).getTime() : null;
					ret.endTime =  this.time[1] ? new Date(this.time[1]).getTime() + 86390000 : null;
				}

				//ret.bs_calss_id = this.typeobj.fou_id || this.typeobj.thi_id || this.typeobj.sec_id || this.typeobj.fir_id
				//ret.bs_calss_type = this.typeobj.fou_id ? 4 : this.typeobj.thi_id ? 3 : this.typeobj.sec_id ? 2 : this.typeobj.fir_id ? 1 : ''
				ret.state = this.state;

				ret.pg_index = this.pg_index;
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				this.getOrderList(data);
				this.$router.replace({query: Object.assign({}, data, this.typeobj)});
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
				this.typeobj = Object.assign({}, typeobj);
				this.time = '';
				this.secTypeData = [];
				this.thiTypeData = [];
				this.fouTypeData = [];
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.search();
			},
			formatTabName(){
				var queryObj = this.queryObj = this.$route.query;
				this.state = queryObj.state;
				var ret = 'all';
				if(this.state == '0'){
					ret = 'toCheck';
				}else if(this.state == '2'){
					ret = 'success';
				}else if(this.state == '3'){
					ret = 'fail';
				}
				this.activeName = ret;
			},
			tabClick(tab, event) {
				this.state = '';
				if(tab.name == 'toCheck'){
					this.state = '0';
				}else if(tab.name == 'fail'){
					this.state = '3';
				}else if(tab.name == 'success'){
					this.state = '2';
				}
				this.search();
			},
			getOrderList(data){
				data = data || {};
				this.loading = true;
				this.$http.get(refundOrderListUrl, {params: data})
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
					console.log(data);
				})
				.catch((err) => {
					this.loading = false;
					if (err && err.msg) {
						this.$message.error(err.msg);
					}
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

			//商品筛选切换
			bs_type_change (type, id, callback){
				if (id) {
					if (type == 3) {
						this.$http.get(serviceStatusUrl, {
							bsId: id
						})
						.then((resp) => {
							var data = resp.data;
							this.fouTypeData = data.data;
							if (callback) {
								callback();
							}else{
								this.typeobj.fou_id='';
							}
						})
						.catch((err) => {
							console.log(error.data.msg);
						});
					}else{
						this.$http.get(productUrl, {
							type:type,
							parent_id: id
						})
						.then((resp) => {
							var data = resp.data;
							if (type == 1) {
								this['secTypeData'] = data;
								if (callback) {
									callback();
								}else{
									this.typeobj.sec_id='';
									this.typeobj.thi_id='';
									this.typeobj.fou_id='';
									this['thiTypeData']=[];
									this['fouTypeData']=[];
								}
							}else if(type == 2){
								this['thiTypeData'] = data;
								if (callback) {
									callback();
								}else{
									this.typeobj.thi_id='';
									this.typeobj.fou_id='';
									this['fouTypeData']=[];
								}
							}
						})
						.catch((err) => {
							console.log(error.data.msg);
						});
					}
				}else{
					if (type == 1) {
						this.typeobj.sec_id='';
						this.typeobj.thi_id='';
						this.typeobj.fou_id='';
						this['secTypeData']=[];
						this['thiTypeData']=[];
						this['fouTypeData']=[];
					}else if(type == 2){
						this.typeobj.thi_id='';
						this.typeobj.fou_id='';
						this['thiTypeData']=[];
						this['fouTypeData']=[];
					}else if(type == 3){
						this.typeobj.fou_id='';
						this['fouTypeData']=[];
					}
				}
			},

			//获取商品一级分类
			getProductType(){
				this.$http.get(businessesClassesUrl, {})
				.then((resp) => {
					var data = resp.data;
					console.log(data)
					this.firTypeData = data.elements;
					this.typeobj.fir_id = this.queryObj.fir_id-0 || '';
				})
				.catch((err) => {
					console.log(err.data.msg);
				});
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
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
			orderStatusformat: Filters.orderStatusformat,
			refundStateFilter: Filters.refundStateFilter,
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
.afterSaleOrder{
	.result{
		thead{
			tr{
				th:first-child{padding-left: 20px;}
			}
		}
		tbody{
			tr{
				td:first-child{padding-left: 20px;}
				td.action{
					text-align: right;padding-right: 10px;
					a{margin-right: 10px;}
				}
			}
		}
	}
}
</style>
