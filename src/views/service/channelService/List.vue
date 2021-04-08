<template>
  <div class="commonList clientServiceOrder">
    <div class="commonListHead myServiceOrderHead">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="待提交" name="toSubmit"></el-tab-pane>
        <el-tab-pane label="财务审核" name="finance"></el-tab-pane>
        <el-tab-pane label="平台审核" name="platform"></el-tab-pane>     
        <el-tab-pane label="审核通过" name="pass"></el-tab-pane>
      </el-tabs>
    </div>
	  <div class="condition clearfix">
      <div class="form_control">
        <el-select v-model="orderOriginId" clearable  collapse-tags multiple  placeholder="订单来源">
          <el-option
            v-for="item in orderOriginOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-select v-model="custPlatformId" clearable collapse-tags multiple  placeholder="客户平台">
          <el-option
            v-for="item in custPlatformOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form_control"><el-input v-model="dataObj.memberName" placeholder="客户姓名"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.memberPhone" placeholder="客户手机号"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.nickname" placeholder="旺旺号"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.trademarkSubjectName" placeholder="主体名称"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.regInfo" placeholder="注册信息(商标名称)"></el-input></div>
			<div class="form_control data_picker">
				<el-date-picker
		      v-model="createTime"
		      type="daterange"
		      align="right"
		      start-placeholder="添加时间开始"
		      end-placeholder="结束"
		      :picker-options="pickerOptions">
		    </el-date-picker>
	    </div>
      <div class="form_control">
        <el-select v-model="status" placeholder="工单状态" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- <el-input class="form_control"><el-input v-model="dataObj.markSn" placeholder="标记单号"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.contractSn" placeholder="合同号"></el-input></div> -->
      <div class="form_control"><el-input v-model="dataObj.markSn" placeholder="平台订单号"></el-input></div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
	  </div>

	  <div class="result result_no_check">
      <div class="table_handle">
        <div class="table_handle_btn batchDistribute" @click="newOpen">新增工单</div>
      </div>
      <table class="result_type">
        <thead>
          <tr class="thead">
            <!-- <th>服务类型</th> -->
            <th class="minWidth createTime">添加时间</th>
            <th class="minWidth">平台订单号</th>
            <th class="minWidth">订单来源</th>
            <!-- <th class="minWidth">客户平台</th> -->
            <th class="minWidth">客户姓名</th>
            <th>客户手机号</th>
            <th>旺旺号</th>
            <th class="minWidth">主体名称</th>
            <th>注册信息</th>
            <th class="alignc minWidth">商标类数</th>
            <th class="alignr minWidth">追加小项</th>
            <th class="alignc minWidth">金额</th>
            <th class="minWidth">工单状态</th>
            <th class="alignc minWidth">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
            <!-- <td>{{item.bsClassName}}</td> -->
            <td>{{item.createTime|dateFormat}}</td>
            <td>{{item.markSn}}</td>
            <!-- <td>{{item.custPlatform}}</td> -->
            <td>{{item.orderOrigin}}</td>
            <td>{{item.memberName}}</td>
            <td>{{item.memberPhone}}</td>
            <td>{{item.nickname}}</td>
            <td>{{item.trademarkSubjectName}}</td>
            <td>{{item.regInfo}}</td>
            <td class="alignc">{{item.registClassNumber}}</td>
            <td class="alignc">{{item.additionItem}}</td>
            <td class="alignc">{{item.orderAmount}}</td>
            <td class="alignl">{{item.status|workOrderStatusformat}}</td>
            <td class="action">
              <!-- 工单状态:10,待提交;11,财务审核;12,平台审核;13,审核通过 -->
              <a href="#" class="view" v-if="item.status>10" @click.prevent="view(item)">查看</a>
              <a href="#" class="edit" v-if="item.status==10" @click.prevent="remove(item.workOrderSn)">删除</a>
              <a href="#" class="edit" v-if="item.status==10" @click.prevent="edit(item)">编辑</a>
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
          :current-page.sync="pgIndex"
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
  import intClsData from 'utils/intClsData.js'
  import VueCookie from 'vue-cookie'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
  const rootUrl = CONFIG.rootUrl;
	const workOrderListUrl = './api/findChannelWorkOrderList';
	const getOperatorsUrl = './api/findDistributionMan';
	const delUrl = './api/deleteChannelWorkOrder';
  const orderOriginUrl = './api/findOrderOriginAll';
  const custPlatformUrl = './api/findCustPlatformAll';
	const distributeMenuPermission = 'iprp_cxb_distribute';
	const feedbackMenuPermission = 'iprp_material_review';
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');
  // 工单状态
  const statusOptions = [
    {
      value: '10',
      name: '10',
      label: '待提交'
    },
    {
      value: '11',
      name: '11',
      label: '财务审核'
    },
    {
      value: '12',
      name: '12',
      label: '平台审核'
    },
    {
      value: '13',
      name: '13',
      label: '审核通过'
    },
  ]

	const dataObj = {//条件数据
    contractSn: '',
    markSn: '',
    memberName: '',
    memberPhone: '',
    trademarkSubjectName: '',
    regInfo: '',
    status: '',
    createTimeStart: '',
    createTimeEnd: '',
    nickname:''
	};

	const cxbUrl = 'http://59.110.11.116/manager_login_frame.html#/manager_login/'
	const cxbUrlO = 'http://www.cnsebe.com/manager_login_frame.html#/manager_login/'
  export default {
    name: 'work-order-list',
    data() {
      return {
        orderOriginId: [],
        custPlatformId: [],
        cateIdData: intClsData.cateIdData,
      	loadLoading: false,
      	selectedItems: [], //选中的
				checkAll: false,
				isIndeterminate: false,
      	distributeLoading: false,
      	distributeVisible: false,
      	operator_id:'',//代理顾问id
				operatorData: [],
				feedbackIsAllowed: false,
      	distributeIsAllowed: false,
        workOrderId:'',
      	cxbUrl: cxbUrl,
        rootUrl:rootUrl,
        status:'',
        feedbackData:{},
        feedbackLoading: false,
      	confirmVisible:false,
        throughVisible:false,
        bookVisible:false,
        offVisible:false,
      	queryObj: {},
      	dataObj: Object.assign({}, dataObj),

      	createTime: '',
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
      	orderOriginOptions: [],
        custPlatformOptions: [],
        statusOptions: statusOptions,
	      dataList:[],
	      pgIndex: 1,
	      pgCount: 15,
	      total:0,

	      dialogVisible:false,
	      allotVisible: false,
	      loading: false,

        applyState:'',
        throughState:'',
        bookDownUrl:{},
        acceptDownUrl:{},
        token:'',
        isConfirmed:0,//当前工单状态
        activeName: 'all',
      }
    },
    mounted() {
      //获取订单来源下拉框数据
      this.findOrderOriginAll();
      //获取客户平台下拉框数据
      this.findCustPlatformAll();
      //tab高亮初始化
      this.formatTabName();

    	this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
    	this.feedbackIsAllowed = store.get('permission').indexOf(feedbackMenuPermission) !== -1;
    	this.recoverQueryData()
    	this.search();
      this.token = VueCookie.get('service_token');
      setTimeout(function(){
        FauxPlaceholder();
      },300);
      if (location.host.indexOf('sp') === 0) {
      	this.cxbUrl = cxbUrlO;
      }
    },
    methods: {
      goodsname(item){
				if(item){
					var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
					return str;
				}else{
					var str = '--';
					return str;
				}
			},
      newOpen() {
        this.$router.push('/tmSubmitChannel/stepOne');
      },
      findOrderOriginAll() {
        this.$http.get(orderOriginUrl)
        .then((resp) => {
          var data = resp.data;
          this.orderOriginOptions = data;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      findCustPlatformAll() {
        this.$http.get(custPlatformUrl)
        .then((resp) => {
          var data = resp.data;
          this.custPlatformOptions = data;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      formatTabName(){
        var queryObj = this.queryObj = this.$route.query;
        this.status = queryObj.status;
        var ret = 'all';
        if(this.status == '10'){
          ret = 'toSubmit';
        }else if(this.status == '12'){
          ret = 'platform';
        }else if(this.status == '11'){
          ret = 'finance';
        }else if(this.status == '13'){
          ret = 'pass';
        }
        this.activeName = ret;
      },
      tabClick(tab, event) {
        this.status = '';
        if(tab.name == 'toSubmit'){
          this.status = '10';
        }else if(tab.name == 'platform'){
          this.status = '12';
        }else if(tab.name == 'finance'){
          this.status = '11';
        }else if(tab.name == 'pass'){
          this.status = '13';
        }
        this.search();
      },
    	
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
    		}
    		this.createTime = queryObj.createTimeStart && [new Date(queryObj.createTimeStart-0), new Date(queryObj.createTimeEnd-86390000)];
        // 重置工单状态
        this.status = queryObj.status;
    		this.pgIndex = queryObj.pgIndex ? queryObj.pgIndex-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		if (this.createTime) {
	    		ret.createTimeStart = this.createTime[0] ? new Date(this.createTime[0]).getTime() : null;
	    		ret.createTimeEnd = this.createTime[1] ? new Date(this.createTime[1]).getTime() + 86390000 : null;
        }
        // orderOriginIds: [],
        // custPlatformIds: [],
        var origin = {}
        if(this.orderOriginId.length>0){
          for(let i=0;i<this.orderOriginId.length;i++){
            origin['orderOriginIds['+i+']'] = this.orderOriginId[i]
          }
        }
        var cust = {}
        if(this.custPlatformId.length>0){
          for(let i=0;i<this.custPlatformId.length;i++){
            cust['custPlatformIds['+i+']'] = this.custPlatformId[i]
          }
        }
        ret.status = this.status ? this.status : null;
    		ret.pgIndex = extra ? 1 : this.pgIndex;
    		ret.pgCount = this.pgCount;
        var data = Object.assign({}, this.dataObj, ret,origin,cust);
    		this.getOrderList(data);
    		this.$router.replace({query: Object.assign({}, data, {selfChange: true})});
    	},
    	reset(){
        this.dataObj = Object.assign({}, dataObj);
        this.orderOriginId = [];
        this.custPlatformId = [];
    		this.createTime = '';
    	},
    	handleCurrentChange(val) {
    		this.pgIndex = val;
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
      		this.total = data.totalElements;
      	})
      	.catch((err) => {
      		this.loading = false;
          this.dataList = [];
          this.$message.error(err.response && err.response.data && err.response.data.msg || '系统繁忙，请稍候再试。')
      		console.log(err);
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
      handleCheckChange(item){
				var arr = this.selectedItems;
				var idx = this.inArrayOf(arr, item, 'workOrderSn');
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
      view(item){
        this.$router.push({name: 'workDetailCh', params: {workOrderSn: item.workOrderSn}})
      },
      edit(item){
        //1、当工单状态处于待提交时，点击编辑，页面停留在上次编辑页面；
        //2、当工单处于已提交待确认时，点击编辑跳转到信息确认的步骤一阶段；
        //3、当工单已被确认（包含未支付补小项费状态下），不可在点击修改
        var status = item.status;
        if (status > 10) {return;}
        var confirmStep = item.confirmStep;
        if (!confirmStep) {return;}
        var stepName = confirmStep == 1 ? 'stepOneCh' : confirmStep == 2 ? 'stepTwoCh' : confirmStep == 3 ? 'stepThreeCh' : '';
        this.$router.push({name: stepName, query: {
          workOrderSn: item.workOrderSn,
          confirmStep: confirmStep,
        }});
      },
      remove(workOrderSn){
        this.$confirm('确认删除该工单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(delUrl + '/' + workOrderSn)
          .then((resp) => {
            this.$message.success('删除成功!');
            this.search();
          })
          .catch((err) => {
            this.$message.error(err.msg);
          });
        }).catch(() => {
        });
        
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
      workOrderStatusformat: Filters.workOrderStatusformat,
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
	    	this.recoverQueryData();
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
				th:first-child{padding-left: 20px;min-width: 80px;}
				th.createTime{min-width: 150px;}
			}
		}
		tbody{
			tr{
				td:first-child{padding-left: 20px;min-width: 80px;}
				td.action{
					text-align: right;padding-right: 10px;
					a{margin-right: 10px;white-space:nowrap;}
					a:hover{text-decoration: none;color: #387CCC;}
					a.disabled{color: #A8AFB5;}
					a.disabled:hover{cursor: default;text-decoration: none;color: #A8AFB5;}
				}
        td{
          img{width:50px;height: 50px;}
          span{display:inline-block;}
          p{word-break:break-all;}
        }
        // 支付状态
        .noPay{color: #F64744;}
        .payOver{color: #36AF47;}
        // 下载
        .noDown{color: #A8AFB5;}
        .downSuces{color: #479CFF;cursor: pointer;}

				.regInfo{word-break: break-all;display: inline-block;min-width: 100px;}
				.subjectName{word-break: break-all;}
			}
		}
	}
	.confirmD{
		// 弹框公用样式继承自common.css
		.el-dialog{
			width: 500px;transform: translate(-50%, -50%);
      .confirm_data{border: 1px solid #dfe2e5;
        >div{padding: 10px;
          .tit{width:66px;font-size: 13px;color: #223344;}
          .txt{width:345px;font-size: 13px;color: #556677;}
        }
        .confirm_bottom{
        	border-top: 1px solid #dfe2e5;
        	.txt{word-wrap: break-word;}
        }
      }
      p{font-size: 13px;color: #A8AFB5;
        a{color:#479CFF;}
      }
		}
	}
  .confirmC{
    .el-dialog{width: 900px;transform: translate(-50%, -50%);
      .confirm_through{max-height:536px;overflow: auto;
        .tit{background: #F5F5F5;border: 1px solid #DFE2E5;height:40px;overflow: hidden;box-sizing: border-box;
          >div{float: left;line-height: 40px;padding-left: 10px;}
        }
        .txt_lists{
        	width: 100%;
          tr{border:1px solid #DFE2E5;border-top:0;
            td{padding:10px;font-size: 13px;color: #556677;}
          }
        }
        td{word-break: break-all;}
        .td01{width:115px;}
        .td02{width:100px;}
        .td03{width:170px;
          span{display:inline-block;word-wrap: break-word;width:115px;vertical-align: middle;}
          a{display:inline-block;width:20px;vertical-align: middle;}
        }
        .td04{width:100px;}
        .td05{width:100px;text-align:center;}
        .td06{min-width:250px;}
      }
    }
  }
  .confirmB{
    .el-dialog{width: 400px;
      .book_tit{background: #F5F5F5;border: 1px solid #DFE2E5;height:40px;line-height:40px;
        p{width:50%;font-size: 13px;color: #223344;}
        .tit_l{padding-left: 20px;}
        .tit_r{text-align:center;}
      }
      .book_txt{border: 1px solid #DFE2E5;height:40px;line-height:40px;border-top:0;
        >p{width:50%;font-size: 13px;color: #223344;}
        .tit_l{padding-left: 20px;color: #556677;}
        .tit_r{text-align:center;color: #479CFF;
          a{color: #479CFF;text-decoration:none;}
          span{color:#999;display:inline-block;}
        }
      }
    }
  }
  .distributeDialog{
		// 弹框公用样式继承自common.css
		.el-dialog{
			width: 530px;transform:translate(-50%,-50%);min-height: 196px;
			.distribute_in{
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-radio-group{line-height: 18px;}
					.el-radio{width: 144px;overflow: hidden;margin-bottom: 8px; margin-right: 10px;}
					.el-radio+.el-radio{margin-left: 0; }
					.el-radio__inner{width: 16px;height: 16px;}
				}
				.el-textarea{margin-top: 10px;}
				>p{text-align: right;padding-top: 12px;}
			}
		}
	}
}
.commonList .result .result_type tbody tr td.downSuces{color: #479CFF;cursor: pointer;}
</style>
