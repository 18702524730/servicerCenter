<template>
  <div class="commonList clientServiceOrder">
	  <div class="condition clearfix">
	  	<div class="form_control"><el-input v-model="dataObj.workOrderSn" placeholder="单号"></el-input></div>
	  	<div class="form_control"><el-input v-model="dataObj.trademarkName" placeholder="商标名称"></el-input></div>

      <div class="form_control">
        <el-select v-model="dataObj.payState" placeholder="支付状态" clearable>
          <el-option
            v-for="item in serviceStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-select v-model="dataObj.throughState" placeholder="材料评审状态" clearable>
          <el-option
            v-for="item in reviewStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- <div class="form_control">
        <el-select v-model="dataObj.applyState" placeholder="申请状态" clearable>
          <el-option
            v-for="item in applyStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> -->
      <div class="form_control">
        <el-select v-model="dataObj.cxbState" placeholder="工单状态" clearable>
          <el-option
            v-for="item in cxbStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="form_control"><el-input v-model="dataObj.taskId" placeholder="任务号"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.serviceId" placeholder="服务号"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.applyName" placeholder="申请人"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.contactName" placeholder="联系人"></el-input></div>

			<div class="form_control data_picker">
				<el-date-picker
		      v-model="confirmTime"
		      type="daterange"
		      align="right"
		      start-placeholder="申请时间开始"
		      end-placeholder="结束"
		      :picker-options="pickerOptions">
		    </el-date-picker>
	    </div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
	  </div>

	  <div class="result">
	  	<div class="table_handle">
				<div class="all"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange"></el-checkbox></div><div class="table_handle_btn batchDistribute" @click="getOperators" v-if="distributeIsAllowed">分配</div>
			</div>
  	 	<table class="result_type">
        <thead>
          <tr class="thead">
          	<th width="30" style="min-width:30px;"></th>
          	<th>单号</th>
            <th class="minWidth">商标图样</th>
            <th class="minWidth">商标名称</th>
            <th class="minWidth">联系人</th>
            <th class="minWidth confirmTime">申请时间</th>
            <th class="alignr">费用</th>
            <th class="alignr minWidth">支付状态</th>
            <th class="alignr minWidth">材料评审</th>
            <th class="alignr minWidth">工单状态</th>
            <th class="alignr minWidth">代理顾问</th>
            <th class="alignc minWidth" width="80">资料下载</th>
            <th class="minWidth" width="100" style="padding-right:20px;text-align: right;">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
          	<td class="check_wrap" style="width: 30px;min-width:30px;"><el-checkbox v-model="item.checked" @change="handleCheckChange(item)"></el-checkbox></td>
            <td>{{item.workOrderSn}}</td>
            <td style="font-size:0;"><img :src="item.blackWhitePicUrl" alt=""></td>
            <td><p>{{item.trademarkName}}</p></td>
            <td>{{item.contactName}}</td>
            <td>{{item.applyTime|dateFormat}}</td>
            <td class="alignr">{{item.orderAmount | priceformat}}</td>
            <td class="alignr"><span :class="{'payOver':item.payState,'noPay':!item.payState}">{{item.payState | cxbPayStatus}}</span></td>
            <td class="alignr" :class="{'downSuces':item.throughState>1}" @click="throughClick(item)">{{item.throughState | cxbReview}}</td>
            <td class="alignr">{{item.cxbState | cxbState}}</td>
            <td class="alignr"><p>{{item.operatorName}}</p></td>
            <td class="alignc">
              <span :class="{'downSuces':item.applyState>=3,'noDown':item.applyState<3}" @click="downBook(item)">下载三书</span>
              <span :class="{'downSuces':item.applyState>=4,'noDown':item.applyState<4}" @click="downOff(item)">下载官文</span>
            </td>
            <td class="action">
              <a v-if="item.throughState==1 && feedbackIsAllowed" href="#" class="edit" @click.prevent="feedback(item)">反馈</a>
              <a v-if="item.cxbState==4 || item.cxbState==7" href="#" class="edit" @click.prevent="report(item)">上报</a>
              <router-link :to="'/service/clientServiceCXB/detail/'+item.workOrderId+'/'+item.cxbState">查看</router-link>
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
    <!-- 不通过 -->
	  <el-dialog title="材料评审不通过" :visible.sync="confirmVisible" class="confirmD" top="50%">
		  <div class="confirm_data" v-loading="feedbackLoading" v-if="!feedbackLoading">
        <div class="clearfix">
          <p class="tit fl">商标类别</p>
          <p class="txt fr">{{feedbackData.materialReviewUnpass && feedbackData.materialReviewUnpass.thrademarkClass}}</p>
        </div>
        <div class="confirm_bottom clearfix">
          <p class="tit fl">不通过原因</p>
          <p class="txt fr">{{feedbackData.materialReviewUnpass && feedbackData.materialReviewUnpass.notPassReason}}</p>
        </div>
      </div>
      <!-- <p class="mt10">您的订单材料评审不通过，建议重新提交商标注册信息；</p>
      <p>拾贝网当前不支持处理创新保订单，<a :href="cxbUrl" target="_blank">请前往阿里巴巴创新保平台</a>完成操作。</p> -->
		</el-dialog>
    <el-dialog title="材料评审通过" :visible.sync="throughVisible" class="confirmC" top="50%">
      <div class="confirm_through" v-loading="feedbackLoading">
        <div class="tit">
          <div class="td01">类别</div>
          <div class="td02">在先近似商标</div>
          <div class="td03">上传文件（.pdf）</div>
          <div class="td04">注册建议</div>
          <div class="td05">通过率（%）</div>
          <div class="td06">已选小项</div>
        </div>
        <table class="txt_lists" v-if="feedbackData.registerPassRateList">
          <tr v-for="(item, index) in feedbackData.registerPassRateList">
            <td class="td01">{{item.category}}</td>
            <td class="td02">{{item.similarTrademark}}</td>
            <td class="td03">
              <span>{{item.reviewReportName}}</span>
              <a class="ml10" :href="rootUrl+'/api/downNetFile?url='+item.reviewReportUrl+'&access_token='+token"><img src="~assets/img/cxb/down.png" alt=""></a>
            </td>
            <td class="td04">{{item.registerAdvice}}</td>
            <td class="td05">{{item.registerPassRate}}%</td>
            <td class="td06">{{item.selectedMinItems}}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
    <!-- 三书 -->
    <el-dialog title="下载三书" :visible.sync="bookVisible" class="confirmB" top="40%">
    	<div v-loading="loadLoading" element-loading-text="加载中...">
	      <div class="book_tit clearfix">
	        <p class="tit_l fl">申报资料</p>
	        <p class="tit_r fr">状态</p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">商标确认书</p>
	        <p class="tit_r fr">
	          <a @click="refreshBook" :href="rootUrl+'/api/downThreeBook?workOrderId='+workOrderId+'&type=2&url='+bookDownUrl.confirm+'&access_token='+token+'&cxb_status='+cxbState">{{bookDownUrl.confirmState | cxbDownTxt}}</a>
	        </p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">合同书</p>
	        <p class="tit_r fr">
	          <a @click="refreshBook" :href="rootUrl+'/api/downThreeBook?workOrderId='+workOrderId+'&type=1&url='+bookDownUrl.contract+'&access_token='+token+'&cxb_status='+cxbState">{{bookDownUrl.contractState | cxbDownTxt}}</a>
	        </p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">委托书</p>
	        <p class="tit_r fr">
	          <a @click="refreshBook" :href="rootUrl+'/api/downThreeBook?workOrderId='+workOrderId+'&type=3&url='+bookDownUrl.proxy+'&access_token='+token+'&cxb_status='+cxbState">{{bookDownUrl.proxyState | cxbDownTxt}}</a>
	        </p>
	      </div>
      </div>
    </el-dialog>
    <!-- 官文 -->
    <el-dialog title="下载官文" :visible.sync="offVisible" class="confirmB" top="40%">
    	<div v-loading="loadLoading" element-loading-text="加载中...">
	      <div class="book_tit clearfix">
	        <p class="tit_l fl">官文资料</p>
	        <p class="tit_r fr">操作</p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">申请号回执单</p>
	        <p class="tit_r fr">
	          <a v-if="acceptDownUrl.acceptNum" :href="rootUrl+'/api/downNetFile?url='+encodeURIComponent(acceptDownUrl.acceptNum)+'&access_token='+token">下载</a>
	          <span v-if="!acceptDownUrl.acceptNum">下载</span>
	        </p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">受理通知书</p>
	        <p class="tit_r fr">
	          <a v-if="acceptDownUrl.acceptManual" :href="rootUrl+'/api/downNetFile?url='+encodeURIComponent(acceptDownUrl.acceptManual)+'&access_token='+token">下载</a>
	          <span v-if="!acceptDownUrl.acceptManual">下载</span>
	        </p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">初步审核通知</p>
	        <p class="tit_r fr">
	          <a v-if="acceptDownUrl.affiche" :href="rootUrl+'/api/downNetFile?url='+encodeURIComponent(acceptDownUrl.affiche)+'&access_token='+token">下载</a>
	          <span v-if="!acceptDownUrl.affiche">下载</span>
	        </p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">初步审核公告</p>
	        <p class="tit_r fr">
	          <a v-if="acceptDownUrl.approveNotice" :href="rootUrl+'/api/downNetFile?url='+encodeURIComponent(acceptDownUrl.approveNotice)+'&access_token='+token">下载</a>
	          <span v-if="!acceptDownUrl.approveNotice">下载</span>
	        </p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">核准注册通知</p>
	        <p class="tit_r fr">
	          <a v-if="acceptDownUrl.registAn" :href="rootUrl+'/api/downNetFile?url='+encodeURIComponent(acceptDownUrl.registAn)+'&access_token='+token">下载</a>
	          <span v-if="!acceptDownUrl.registAn">下载</span>
	        </p>
	      </div>
	      <div class="book_txt clearfix">
	        <p class="tit_l fl">注册证</p>
	        <p class="tit_r fr">
	          <a v-if="acceptDownUrl.registerNum" :href="rootUrl+'/api/downNetFile?url='+encodeURIComponent(acceptDownUrl.registerNum)+'&access_token='+token">下载</a>
	          <span v-if="!acceptDownUrl.registerNum">下载</span>
	        </p>
	      </div>
      </div>
    </el-dialog>

		<!-- 分配 -->
    <el-dialog title="分配" :visible.sync="distributeVisible" :modal-append-to-body="true" top="50%" class="distributeDialog">
			<div class="title_in distribute_in">
				<h5>请选择代理顾问：</h5>
				<div class="dialog_con_box" v-loading="distributeLoading">
					<el-radio-group v-model="operator_id">
						<el-radio class="radio" v-for="(item, index) in operatorData" :label="item.operator_id" :key="item.operator_id">{{item.name}}</el-radio>
					</el-radio-group>
				</div>
				<p><a href="" class="button no" @click.prevent="distributeVisible = false">取消</a><a href="" class="button yes" @click.prevent="distribute">确定</a></p>
			</div>
		</el-dialog>
  </div>
</template>

<script>
	import qs from 'qs'
  import $ from 'jquery'
  import VueCookie from 'vue-cookie'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
  const rootUrl = CONFIG.rootUrl;
	const workOrderListUrl = './api/listCxbWorkOrder';
	const getOperatorsUrl = './api/findDistributionMan';
	const batchDistributeUrl = './api/distributeDistributionMan';
	const distributeMenuPermission = 'iprp_cxb_distribute';
	const feedbackMenuPermission = 'iprp_material_review';
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');
	const serviceStatusOptions = [
		{
		  value: '0',
		  name: '0',
		  label: '未支付'
		}, {
      value: '1',
      name: '1',
      label: '已支付'
    }
	];
  const reviewStatusOptions = [
    {
      value: '1',
      name: '1',
      label: '待反馈'
    },
    {
      value: '2',
      name: '2',
      label: '通过'
    },
    {
      value: '3',
      name: '3',
      label: '不通过'
    }
  ];
  // 申请状态
  const applyStatusOptions = [
    {
      value: '0',
      name: '0',
      label: '全部'
    },
    {
      value: '1',
      name: '1',
      label: '通过率确认'
    },
    {
      value: '2',
      name: '1',
      label: '支付'
    },
    {
      value: '3',
      name: '3',
      label: '提交注册资料'
    },
    {
      value: '4',
      name: '4',
      label: '申请号回执单'
    },
    {
      value: '5',
      name: '5',
      label: '受理通知书'
    },
    {
      value: '6',
      name: '6',
      label: '初步审定通知'
    },
    {
      value: '7',
      name: '7',
      label: '初步审定公告'
    },
    {
      value: '8',
      name: '8',
      label: '核准注册公告'
    },
    {
      value: '9',
      name: '9',
      label: '核准注册通知'
    }
  ];
  // 工单状态
  const cxbStateOptions = [
    {
      value: '0',
      name: '0',
      label: '全部'
    },
    {
      value: '1',
      name: '1',
      label: '待材料评审'
    },
    {
      value: '2',
      name: '2',
      label: '评审不通过'
    },
    {
      value: '3',
      name: '3',
      label: '已评审待确认'
    },
    {
      value: '4',
      name: '4',
      label: '已确认待上报'
    },
    {
      value: '5',
      name: '5',
      label: '已上报待审核'
    },
    {
      value: '6',
      name: '6',
      label: '申报中'
    },
    {
      value: '7',
      name: '7',
      label: '审核不通过'
    },
    {
      value: '8',
      name: '8',
      label: '申报结束'
    }
  ]

	const dataObj = {//条件数据
		applyName:'',
    contactName:'',
    serviceId:'',
    workOrderSn:'',
    trademarkName:'',
    taskId:'',
    //applyState:'',
    waitReport:'',
    cxbState:'',
    throughState:'',
    payState:'',
    workOrderId:''
	};

	const cxbUrl = 'http://59.110.11.116/manager_login_frame.html#/manager_login/'
	const cxbUrlO = 'http://www.cnsebe.com/manager_login_frame.html#/manager_login/'
  export default {
    name: 'work-order-list',
    data() {
      return {
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
        reviewStatusOptions: reviewStatusOptions,
        applyStatusOptions: applyStatusOptions,
        cxbStateOptions: cxbStateOptions,
	      dataList:[],
	      pg_index: 1,
	      pg_count: 15,
	      total:0,

	      dialogVisible:false,
	      allotVisible: false,
	      loading: false,

        applyState:'',
        throughState:'',
        payState:'',
        bookDownUrl:{},
        acceptDownUrl:{},
        token:'',
        cxbState:'',
        isConfirmed:0//当前工单状态
      }
    },
    mounted() {
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
    	report(item){
    		//var throughState = item.throughState;
      	//if (throughState != 1) {return;}
      	this.$router.push({name: 'stepOneCXB', query: {
    			work_order_sn: item.workOrderSn
    		}});
    	},
    	feedback(item){
      	var throughState = item.throughState;
      	if (throughState != 1) {return;}
      	this.$router.push({name: 'stepOneFD', query: {
    			work_order_sn: item.workOrderSn
    		}});
    	},
      throughClick(state){//材料评审
      	if(state.throughState==1){
      		return;
      	}
        if(state.throughState==2){
          this.throughVisible = true;
        }else if(state.throughState==3){
          this.confirmVisible = true;
        }
        this.feedbackLoading = true;
        let isConfirmed = 0;
        if(state.cxbState >= 4){
          isConfirmed = 1;
        }else{
          isConfirmed = 0;
        }
        this.$http.get('./api/findCxbMaterialReview?workOrderId='+state.workOrderId+'&isConfirmed='+isConfirmed)
        .then((resp) => {
        	this.feedbackLoading = false;
          this.feedbackData = resp.data;
        })
        .catch((err) => {
        	this.feedbackLoading = false;
          console.log(err);
        });
      },
      refreshBook(){
        var self = this;
        setTimeout(function(){
          self.$http.get('./api/findCxbWorkOrderThreeBook?workOrderId='+self.workOrderId+'&isConfirmed='+self.isConfirmed)
          .then((resp) => {
            self.bookDownUrl = resp.data;
          })
          .catch((err) => {
            console.log(err);
          });
        },3000)
      },
      downBook(state){//下载三书
        this.workOrderId = state.workOrderId;
        let isConfirmed = 0;
        if(state.cxbState >= 4){
          isConfirmed = 1;
          this.isConfirmed = isConfirmed;
        }else{
          isConfirmed = 0;
          this.isConfirmed = isConfirmed;
        }
        this.cxbState = state.cxbState;
        if(state.applyState>=3){
          this.bookVisible = true;
          this.loadLoading = true;
          this.$http.get('./api/findCxbWorkOrderThreeBook?workOrderId='+state.workOrderId+'&isConfirmed='+isConfirmed)
          .then((resp) => {
            this.bookDownUrl = resp.data;
            this.loadLoading = false;
          })
          .catch((err) => {
          	this.loadLoading = false;
            console.log(err);
          });
        }
      },
      downOff(state){//下载官文
        this.workOrderId = state.workOrderId;
        let isConfirmed = 0;
        if(state.cxbState >= 4){
          isConfirmed = 1;
        }else{
          isConfirmed = 0;
        }
        if(state.applyState>=4){
          this.offVisible = true;
          this.loadLoading = true;
          this.$http.get('./api/findCxbWorkOrderGovenBook?workOrderId='+state.workOrderId+'&isConfirmed='+isConfirmed)
          .then((resp) => {
            this.acceptDownUrl = resp.data;
            this.loadLoading = false;
          })
          .catch((err) => {
          	this.loadLoading = false;
            console.log(err);
          });
        }
      },
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
    		}
    		this.confirmTime = queryObj.applyTimeStart && [new Date(queryObj.applyTimeStart-0), new Date(queryObj.applyTimeEnd-86390000)];
        if(queryObj.payState){
          this.payState = queryObj.payState;
        }
        if(queryObj.throughState){
          this.throughState = queryObj.throughState;
        }

    		this.pg_index = queryObj.pg_index ? queryObj.pg_index-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		if (this.confirmTime) {
	    		ret.applyTimeStart = this.confirmTime[0] ? new Date(this.confirmTime[0]).getTime() : null;
	    		ret.applyTimeEnd = this.confirmTime[1] ? new Date(this.confirmTime[1]).getTime() + 86390000 : null;
    		}

    		ret.pg_index = extra ? 1 : this.pg_index;
    		ret.pg_count = this.pg_count;
    		var data = Object.assign({}, this.dataObj, ret);
    		this.getOrderList(data);
    		this.$router.replace({query: Object.assign({}, data, {selfChange: true})});
    	},
    	reset(){
    		this.dataObj = Object.assign({}, dataObj);
    		this.confirmTime = '';
    	},
    	handleCurrentChange(val) {
    		this.pg_index = val;
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
					dataList.forEach((item, i) => {
						var arr = this.selectedItems;
						var idx = this.inArrayOf(arr, item, 'order_sn');
						item.checked = idx != -1;
					});
      		this.dataList = dataList;
      		this.total = data.total_elements;
      	})
      	.catch((err) => {
      		this.loading = false;
      		console.log(err);
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
						var idx = self.inArrayOf(arr, item, 'workOrderSn');
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
					var idx = self.inArrayOf(arr, item, 'workOrderSn');
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
			getselectedItemsPropertyByName(name){
				var arr = [];
				var selectedItems = this.selectedItems;
				selectedItems.forEach((item, i) => {
					arr.push(item[name]);
				});
				return arr;
			},
			getOperators(){
				if (!this.selectedItems.length) {
					this.$message('请选择至少一个工单');
					return;
				}
				this.distributeVisible = true;
				this.operator_id = '';
				this.distributeLoading = true;
				this.$http.get(getOperatorsUrl/*, {
					params: {
						order_id_list: this.getselectedItemsPropertyByName('order_id').join()
					}
				}*/)
				.then((resp) => {
					this.distributeLoading = false;
					var data = resp.data;
					this.operatorData = data;
				})
				.catch((err) => {
					this.distributeLoading = false;
					//console.log(err);
				});
			},
			distribute(){
				if (!this.operator_id) {
					this.$message('请选择代理顾问');
					return;
				}
				this.$http.post(batchDistributeUrl, {
					operatorId: this.operator_id,
					//order_message: '',
					workOrderSnList: this.getselectedItemsPropertyByName('workOrderSn')
				})
				.then((resp) => {
					this.distributeVisible = false;
					this.operator_id = '';
					this.selectedItems = [];
					this.$message.success('分配成功');
					this.search();
				})
				.catch((err) => {
					//console.log(err);
					this.$message.error(err.msg);
				});
			},
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      cxbReview: Filters.cxbReview,
      cxbDownTxt: Filters.cxbDownTxt,
      cxbPayStatus: Filters.cxbPayStatus,
      priceformat:Filters.priceformat,
      cxbApply:Filters.cxbApply,
      cxbState:Filters.cxbState
    },
    watch:{
    	$route(to, from) {
    		if (to.query.selfChange) {
    			return;
    		}
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
				th:first-child{padding-left: 20px;min-width: 80px;}
				th.confirmTime{min-width: 150px;}
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
