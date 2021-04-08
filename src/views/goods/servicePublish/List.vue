<template>
	<div class="commonList servicePublish">
		<div class="commonListHead myServiceOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
				<el-tab-pane label="全部" name="all"></el-tab-pane>
				<el-tab-pane label="上架" name="putAway"></el-tab-pane>
				<el-tab-pane label="下架" name="soldOut"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.product_num" placeholder="商品编号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.service_name" placeholder="服务名称"></el-input></div>

			<div class="form_control">
				<el-select v-model="typeobj.first_category" clearable placeholder="一级类目选择" @change="bs_type_change(1, typeobj.first_category)">
					<el-option
						v-for="item in firTypeData"
						:key="item.bs_class_id"
						:label="item.name"
						:value="item.bs_class_id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.second_category" :disabled="!secTypeData.length" clearable placeholder="二级类目选择" @change="bs_type_change(2, typeobj.second_category)">
					<el-option
						v-for="item in secTypeData"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="typeobj.third_category" :disabled="!thiTypeData.length" clearable placeholder="三级类目选择" @change="bs_type_change(3, typeobj.third_category)">
					<el-option
						v-for="item in thiTypeData"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="create_time"
					type="daterange"
					align="right"
					start-placeholder="发布时间开始"
		      end-placeholder="结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
					v-model="updata_time"
					type="daterange"
					align="right"
					start-placeholder="最后编辑时间开始"
		      end-placeholder="结束"
					:picker-options="pickerOptions">
				</el-date-picker>
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
				<div class="all"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange"></el-checkbox></div><div class="table_handle_btn batch" @click="putAwayslodOutOrMove(1)">上架</div>|<div class="table_handle_btn infoSubmit" @click="putAwayslodOutOrMove(3)">下架</div>|
				<div class="table_handle_btn batchDistribute" @click="putAwayslodOutOrMove(2)">删除</div>
				<div class="publish_service">
					<el-button class="publish_btn" size="small" type="primary" @click="toProcedure" v-if="goods_publish_service">发布服务</el-button>
				</div>
			</div>
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th width="56"></th>
						<th width="70" style="padding-left: 0">商品编号</th>
						<th class="50">封面</th>
						<th width="100">服务名称</th>
						<th class="alignl" width="120">类目</th>
						<th class="minWidth alignr">服务售价</th>
						<th class="minWidth alignr">折扣价格</th>
						<th class="alignc" width="70">销售量</th>
						<th width="100" style="padding-left:10px;">发布时间</th>
						<th width="100">最后编辑</th>
						<th class="minWidth">上架状态</th>
						<th class="minWidth">审核状态</th>
						<th style="border-right:1px solid #DFE2E5" width="80">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
						<td class="check_wrap"><el-checkbox v-model="item.checked" @change="handleCheckChange(item)"></el-checkbox></td>
						<td style="padding-left: 0">{{item.product_num}}</td>
						<td style="font-size:0;"><img :src="item.picture" alt=""></td>
						<td>{{item.service_name}}</td>
						<td class="alignl">{{item.codes_descriptions}}</td>
						<td class="alignr">{{item.service_price | priceformat}}</td>
						<td class="alignr">{{item.sale_price | priceformat}}</td>
						<td class="alignc">{{item.sale_num}}</td>
						<td style="padding-left:10px;">{{item.create_time|dateFormat}}</td>
						<td>{{item.update_time|dateFormat}}</td>
						<td>{{item.ground_status|groundStatus}}</td>
						<td>{{item.verify_status|verifyStatus}}</td>
						<td class="alignl action">
							<a href="#" class="view" @click.prevent="stickTop(item)" v-if="goods_settop">{{item.stick==1?'取消置顶':'置顶'}}</a>
							<a href="#" class="view" @click.prevent="view(item)" v-if="goods_edit">编辑</a>
							<a href="#" class="view" @click.prevent="lookDetail(item)">查看</a>
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
					:page-size="10"
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
	const bsOrderListUrl = './api/storeService';
	const businessesClassesUrl = './api/businesses_classes';
	const productUrl = './api/product';
	const serviceStatusUrl = './api/getBsFeedbackListByBsId';
	const receiveOrderUrl = './api/ground';
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
		}, 
		// {
		// 	value: '2',
		// 	label: '未上架'
		// }, 
		{
			value: '3',
			label: '已下架'
		}
	];
	const typeobj = {//商品筛选
		first_category:'',
		second_category:'',
		third_category:'',
		fou_id:'',
	};
	const dataObj = {//条件数据
		verify_status:'',
		ground_status:'',
		stick: '',
		service_name:'',
		product_num:''
	};
	// const distributeMenuPermission = 'iprp_order_manage_fenpei';
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
				goods_publish_service:false,//发布服务权限
				goods_edit:false,//编辑权限
				goods_settop:false,//指定权限
				notFirst: false,//用于判定是否第一次用于记忆query参数
				queryObj: {},
				activeName:'all',
				typeobj: Object.assign({}, typeobj),
				firTypeData:[],
				secTypeData:[],
				thiTypeData: [],
				fouTypeData:[],
				dataObj: Object.assign({}, dataObj),
				order_state:'',
				create_time: '',
				updata_time:'',
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
				pg_index: 1,
				pg_count: 10,
				total:0,
				loading: false,
			}
		},
		mounted() {
			this.goods_publish_service = store.get('permission').indexOf('iprp_goods_publish_service') !== -1;
			this.goods_edit = store.get('permission').indexOf('iprp_goods_edit') !== -1;
			this.goods_settop = store.get('permission').indexOf('iprp_goods_settop') !== -1;
			this.recoverQueryData();
			this.getProductType();
			this.search();
			setTimeout(function(){
				FauxPlaceholder();
			},300)

		},
		methods: {
			lookDetail(item){
				this.$router.push({name: 'servicePublishDetail',params:{id:item.service_id}})
			},
			toProcedure(){//发布服务
				this.$router.push({name: 'addCommodity'})
			},
			stickTop(item){//置顶
				let data = {
					service_id:item.service_id,
					stick:item.stick == 1 ? 2 : 1
				}
				this.$http.post('/api/stickStatus',data)
				.then((resp)=>{
					this.search();
				})
				.catch((err)=>{

				})
			},
			recoverQueryData(){//时间处理
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
				this.updata_time = queryObj.update_time_start && [new Date(queryObj.update_time_start-0), new Date(queryObj.update_time_end-86390000)];
				this.create_time = queryObj.create_time_start && [new Date(queryObj.create_time_start-0), new Date(queryObj.create_time_end-86390000)];

				// this.order_service_state = queryObj.order_service_state;
				this.order_state = queryObj.order_state;
				// this.order_tasking_state = queryObj.order_tasking_state;

				this.pg_index = queryObj.pg_index || 0;
			},
			search(p){//初次请求，路由渲染
				if (p != 'noClear') {
					this.selectedItems = [];
				}
				console.log(this.dataObj.ground_status)
				var ret = {}
				if (this.updata_time) {//编辑时间
					ret.update_time_start = this.updata_time[0] ? new Date(this.updata_time[0]).getTime() : null;
					ret.update_time_end = this.updata_time[1] ? new Date(this.updata_time[1]).getTime() + 86390000 : null;
				}
				if (this.create_time) {
					ret.create_time_start = this.create_time[0] ? new Date(this.create_time[0]).getTime() : null;
					ret.create_time_end = this.create_time[1] ? new Date(this.create_time[1]).getTime() + 86390000 : null;
				}
				ret.first_category = this.typeobj.first_category || '';//一大类
				ret.second_category = this.typeobj.second_category || '';
				ret.third_category = this.typeobj.third_category || '';

				ret.pg_index = p === 'first' ? 1 : Number(this.pg_index);
				ret.pg_count = this.pg_count;
				var data = Object.assign({}, this.dataObj, ret);
				this.getOrderList(data);
				this.$router.replace({query: Object.assign({}, data, this.typeobj, {selfChange: true})});
			},
			reset(){//重置
				this.dataObj = Object.assign({}, dataObj);
				this.typeobj = Object.assign({}, typeobj);
				this.create_time = '';
				this.updata_time = '';
				this.secTypeData = [];
				this.thiTypeData = [];
				this.fouTypeData = [];
				this.pg_index = 0;
			},
			handleCurrentChange(val) {//分页
				console.log(val)
				this.pg_index = Number(val);
				this.search('noClear');
			},
			tabClick(tab, event) {
				if(tab.name == 'all'){
					this.dataObj.ground_status = '';
				}else if(tab.name == 'putAway'){
					this.dataObj.ground_status = '1';
				}else if(tab.name == 'soldOut'){
					this.dataObj.ground_status = '3';
				}
				this.search();
			},
			getOrderList(data){
				data = data || {};
				this.loading = true;
				this.$http.post(bsOrderListUrl, data)
				.then((resp) => {
					this.notFirst = true;
					this.loading = false;
					var data = resp.data;
					var dataList = resp.data.elements;
					dataList.forEach((item, i) => {
						if(item){
							var arr = this.selectedItems;
							var idx = this.inArrayOf(arr, item, 'service_id');
							item.checked = idx != -1;
						}
					});
					this.dataList = dataList;
					this.total = data.total_elements;
					this.checkIsAll();
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
			},
			view(item){
				this.$router.push({name: 'redactProduct', params: {id: item.service_id}})
			},
			putAwayslodOutOrMove(index){//批量上下架，删除
				let self = this;
				if (!this.selectedItems.length) {
					this.$message('请选择服务单');
					return;
				}
				if(index==1||index==3){
					this.$http.post(receiveOrderUrl, {
						id_list: this.getselectedItemsPropertyByName('service_id'),
						ground_status:index
					})
					.then((resp) => {
						if(index == 3){
							this.$message.success('批量下架成功');
						}else{
							this.$message.success('批量上架成功');
						}
						this.search();
					})
					.catch((err) => {
						this.$message.error(err.msg);
					});
				}else{
					this.$confirm('是否确认删除?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          let data = {id_list: self.getselectedItemsPropertyByName('service_id')};
						console.log(data)
						self.$http.delete(bsOrderListUrl,{data:data})
						.then((resp) => {
							var data = resp.data;
							self.$message.success('批量删除成功');
							self.search();
						})
						.catch((err) => {
							self.$message.error(err.msg);
						});
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
					
				}
				
			},
			getselectedItemsPropertyByName(name){//服务id集合
				var arr = [];
				var selectedItems = this.selectedItems;
				selectedItems.forEach((item, i) => {
					arr.push(item[name]);
				});
				return arr;
			},
			bs_type_change (type, id, callback){//商品筛选切换
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
								// this.typeobj.fou_id = notFirst ? '' : this.typeobj.fou_id || '';
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

									this.typeobj.second_category = notFirst ? '' : this.typeobj.second_category || '';
									this.typeobj.third_category = notFirst ? '' : this.typeobj.third_category || '';
									// this.typeobj.fou_id = notFirst ? '' : this.typeobj.fou_id || '';
									if (!this.typeobj.third_category || notFirst) {
										this['thiTypeData']= [];
									}
									// if (!this.typeobj.fou_id || notFirst) {
									// 	this['fouTypeData']= [];
									// }
								}
							}else if(type == 2){
								this['thiTypeData'] = data;
								if (callback) {
									callback();
								}else{
									this.typeobj.third_category = notFirst ? '' : this.typeobj.third_category || '';
									// this.typeobj.fou_id = notFirst ? '' : this.typeobj.fou_id || '';
									// if (!this.typeobj.fou_id || notFirst) {
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
			getProductType(){//获取商品一级分类
				this.$http.get(businessesClassesUrl, {params: {bs_parent_id: 0}})
				.then((resp) => {
					var data = resp.data;
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
				var idx = this.inArrayOf(arr, item, 'service_id');
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
				console.log(this.selectedItems)
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
						var idx = self.inArrayOf(arr, item, 'service_id');
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
					var idx = self.inArrayOf(arr, item, 'service_id');
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
			titleLengthFormat:Filters.titleLengthFormat,
			groundStatus:Filters.groundStatus,
			verifyStatus:Filters.verifyStatus,
		},
		watch:{
			$route(to, from) {
				if (to.query.selfChange) {
					return;
				}
				// this.formatTabName();
				this.recoverQueryData()
				this.search();
			}
		}
	}
</script>
<style lang='scss'>
.servicePublish{
	.table_handle{position: relative;
		.publish_service{position: absolute;right:20px;top:10px;
			.el-button--small{width:66px;padding:8px;font-size:12px;}
		}
	}
	.el-select .el-input .el-input__icon{-ms-transform:translateY(-50%) rotate(180deg) !important;}
	.result{
		tbody{
			tr{
				td.action{
					a{display:block;}
				}
			}
		}
	}
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
