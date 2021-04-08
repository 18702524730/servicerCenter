<template>
  <div class="commonList afterSaleOrder">
  	<div class="commonListHead afterSaleOrderHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
		    <el-tab-pane label="全部" name="all"></el-tab-pane>
		    <el-tab-pane label="待审核" name="toCheck"></el-tab-pane>
		    <el-tab-pane label="商家驳回" name="fail"></el-tab-pane>
		    <el-tab-pane label="商家同意" name="agree"></el-tab-pane>
		    <el-tab-pane label="退款完成" name="success"></el-tab-pane>
		    <el-tab-pane label="先行赔付" name="first"></el-tab-pane>
		  </el-tabs>
	  </div>
	  <div class="condition clearfix">
	  	<div class="form_control"><el-input v-model="dataObj.refund_sn" placeholder="退款单号"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.memberName" placeholder="客户姓名"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.memberPhone" placeholder="注册手机号"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.order_sn" placeholder="服务单号"></el-input></div>
	  	<div class="form_control">
		  	<el-select v-model="state" placeholder="退款状态" clearable>
			    <el-option
			      v-for="item in refundStatusOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_control data_picker">
				<el-date-picker
		      v-model="time"
		      type="daterange"
		      align="right"
		      start-placeholder="申请退款时间开始"
		      end-placeholder="结束"
		      :picker-options="pickerOptions">
		    </el-date-picker>
	    </div>
			<div class="form_control">
		  	<el-select v-model="dataObj.order_distribute_from" placeholder="来源" clearable>
			    <el-option
			      v-for="item in sourceOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
	  </div>

	  <div class="result">
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th class="minWidth">退款单号</th>
          	<th class="minWidth">来源</th>
            <th class="minWidth">服务单号</th>
            <th class="minWidth">退款金额</th>
            <th class="minWidth">实退金额</th>
            <th class="minWidth">商品编号</th>
            <th class="minWidth">商品名称</th>
            <th class="minWidth">客户姓名</th>
            <th class="minWidth">注册手机号</th>
            <th class="minWidth">申请退款时间</th>
            <th class="minWidth">退款状态</th>
            <th class="alignc" style="min-width: 80px">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList">
            <td>{{item.refund_sn}}</td>
            <td>{{item.order_distribute_from == 1 ? '拾贝分单' : '店铺下单'}}</td>
            <td>{{item.order_sn}}</td>
            <td>{{item.amount_user|priceformat}}</td>
            <td>{{item.amount|priceformat}}</td>
            <td>{{item.order_bs_number}}</td>
            <td>{{item.bs_name}}</td>
            <td>{{item.memberName}}</td>
            <td>{{item.memberPhone}}</td>
            <td>{{item.create_time|dateFormat}}</td>
            <td>{{item.audit_state|refundStateFilter}}</td>
            <td class="action">
            	<router-link :to="'/trade/afterSale/detail/'+item.refund_id" class="view">退款详情</router-link>
            	<router-link :to="'/service/myServiceOrder/detail/'+item.order_id" class="view">服务详情</router-link>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="12" class="norecord">
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
  import $ from 'jquery'
	import Filters from 'utils/filters/'
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
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
		  value: '1',
		  label: '商家同意'
		}, {
		  value: '2',
		  label: '商家驳回'
		}, {
		  value: '3',
		  label: '退款完成'
		}, {
		  value: '4',
		  label: '先行赔付'
		}
	];
	const sourceOptions = [
		{
		  value: '1',
		  label: '拾贝分单'
		}, {
		  value: '2',
		  label: '店铺下单'
		},
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
		state:'',
		order_distribute_from:''
	};
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
				sourceOptions: sourceOptions,

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
    	this.recoverQueryData()
    	this.search();
    	this.formatTabName();
      setTimeout(function(){
        FauxPlaceholder();
      },300);
    },
    methods: {
      view(item){
        this.$router.push({name: 'accountDetail', params: {id: item.order_id}})
      },
      recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
    		}
    		this.time = queryObj.beginTime && [new Date(queryObj.beginTime-0), new Date(queryObj.endTime-86390000)];
    		this.state = queryObj.state;

		    this.pg_index = queryObj.pg_index ? queryObj.pg_index-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		if (this.time) {
	    		ret.beginTime =  this.time[0] ? new Date(this.time[0]).getTime() : null;
	    		ret.endTime =  this.time[1] ? new Date(this.time[1]).getTime() + 86390000 : null;
    		}
    		ret.state = this.state;
    		ret.pg_index = extra ? 1 : this.pg_index;
    		ret.pg_count = this.pg_count;
    		var data = Object.assign({}, this.dataObj, ret);
    		this.getRefundList(data);
    		this.$router.replace({query: Object.assign({}, data, {selfChange: true})});
    	},
    	reset(){
    		this.dataObj = Object.assign({}, dataObj);
    		this.typeobj = Object.assign({}, typeobj);
    		this.time = '';
    		this.state = '';
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
    		}else if(this.state == '1'){
    			ret = 'agree';
    		}else if(this.state == '2'){
    			ret = 'fail';
    		}else if(this.state == '3'){
    			ret = 'success';
    		}else if(this.state == '4'){
    			ret = 'first';
    		}
    		this.activeName = ret;
      },
    	tabClick(tab, event) {
    		this.state = '';
    		if(tab.name == 'toCheck'){
    			this.state = '0';
    		}else if(tab.name == 'agree'){
    			this.state = '1';
    		}else if(tab.name == 'fail'){
    			this.state = '2';
    		}else if(tab.name == 'success'){
    			this.state = '3';
    		}else if(tab.name == 'first'){
    			this.state = '4';
    		}
    		this.search(true);
      },
      getRefundList(data){
      	data = data || {};
      	this.loading = true;
      	this.dataList = [];
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
    	priceformat: Filters.priceformat,
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
    		this.search(true);
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
