<template>
  <div class="commonList clientServiceOrder">
	  <div class="condition clearfix">
      <div class="form_control">
        <el-input v-model="dataObj.orderNo" placeholder="单号"></el-input>
      </div>
      <div class="form_control">
        <el-input v-model="dataObj.applicant" placeholder="申请人"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.contacts" placeholder="联系人"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.contactsPhone" placeholder="联系电话"></el-input></div>
      <div class="form_control">
        <el-input v-model="dataObj.trademarkName" placeholder="商标名称"></el-input>
      </div>
      
      <div class="form_control">
        <el-input v-model="dataObj.businessType" placeholder="业务类型"></el-input>
      </div>
      
      <div class="form_control"><el-input v-model="dataObj.agentCommissioner" placeholder="代理专员"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.applicationNo" placeholder="申请号"></el-input></div>
      
			<!-- <div class="form_control data_picker">
				<el-date-picker
		      v-model="createTime"
		      type="daterange"
		      align="right"
		      start-placeholder="添加时间开始"
		      end-placeholder="结束"
		      :picker-options="pickerOptions">
		    </el-date-picker>
	    </div> -->
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
	  </div>

	  <div class="result result_no_check">
      <div class="gongdan">
        <span  class="eachexportbtn" @click="toaddrecord">新增</span>
        <span  class="eachexportbtn" @click.stop="showtransfer">字段显示</span>
        <span  class="eachexportbtn" @click="exportlist" v-if="isexport">导出</span>
        <div v-show="showtrans" class="transer" @click.stop>
          <el-transfer v-model="ziduan" :data="ziduandata" :titles="transtitle" @change="setlist"></el-transfer>
        </div>
      </div>
      <div class="qinquanres" :style="{width: contw+'px'}">
      <table class="result_type">
        <thead>
          <tr class="thead">
            <th>序号</th>
            <th class="comWidth" v-show="ziduan.indexOf(1)>-1">提交日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(2)>-1">序号</th>
            <th class="comWidth" v-show="ziduan.indexOf(3)>-1">单号</th>
            <th class="comWidth" v-show="ziduan.indexOf(4)>-1">申请人</th>
            <th class="comWidth" v-show="ziduan.indexOf(5)>-1">联系人</th>
            <th class="comWidth" v-show="ziduan.indexOf(6)>-1">联系人电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(7)>-1">商标名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(8)>-1">业务类型</th>
            <th class="comWidth" v-show="ziduan.indexOf(9)>-1">代理专员</th>
            <th class="comWidth" v-show="ziduan.indexOf(10)>-1">申报类别</th>

            <th class="comWidth" v-show="ziduan.indexOf(11)>-1">注册号</th>
            <th class="comWidth" v-show="ziduan.indexOf(12)>-1">官费</th>
            <th class="maxWidth" v-show="ziduan.indexOf(13)>-1">服务费</th>
            <th class="comWidth" v-show="ziduan.indexOf(14)>-1">总金额</th>
            <th class="comWidth" v-show="ziduan.indexOf(15)>-1">付款人</th>
            <th class="comWidth" v-show="ziduan.indexOf(16)>-1">收款方式</th>
            <th class="comWidth" v-show="ziduan.indexOf(17)>-1">业务审核</th>
            <th class="comWidth" v-show="ziduan.indexOf(18)>-1">财务确认收款</th>
            <th class="comWidth" v-show="ziduan.indexOf(19)>-1">收款日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(20)>-1">申报日期</th>

            <th class="comWidth" v-show="ziduan.indexOf(21)>-1">申报员</th>
            <th class="comWidth" v-show="ziduan.indexOf(22)>-1">申请号</th>
            <th class="comWidth" v-show="ziduan.indexOf(23)>-1">发票抬头</th>
            <th class="comWidth" v-show="ziduan.indexOf(24)>-1">纳税人识别号</th>
            <th class="comWidth" v-show="ziduan.indexOf(25)>-1">官费发票号</th>
            <th class="comWidth" v-show="ziduan.indexOf(26)>-1">服务费发票号</th>
            <th class="comWidth" v-show="ziduan.indexOf(27)>-1">收件人</th>
            <th class="comWidth" v-show="ziduan.indexOf(28)>-1">收件电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(29)>-1">收件地址</th>
            <th class="comWidth" v-show="ziduan.indexOf(30)>-1">快递单号</th>

            <th class="comWidth" v-show="ziduan.indexOf(31)>-1">退款</th>
            <th class="comWidth" v-show="ziduan.indexOf(32)>-1">视为放弃通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(33)>-1">不予受理通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(34)>-1">收到受理通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(35)>-1">不予核准通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(36)>-1">补正通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(37)>-1">第二次补正通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(38)>-1">驳回通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(39)>-1">变更、更正商标申请/注册事项申请核准通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(40)>-1">变更证明</th>

            <th class="comWidth" v-show="ziduan.indexOf(41)>-1">续展证明</th>
            <th class="comWidth" v-show="ziduan.indexOf(42)>-1">转让证明</th>
            <th class="comWidth" v-show="ziduan.indexOf(43)>-1">初步审定公告</th>
            <th class="comWidth" v-show="ziduan.indexOf(44)>-1">异议答辩通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(45)>-1">核准注册</th>
            <th class="comWidth" v-show="ziduan.indexOf(46)>-1">注册证</th>
            <th class="comWidth" v-show="ziduan.indexOf(47)>-1">商标评审申请受通通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(48)>-1">驳回复审决定书</th>
            <th class="comWidth" v-show="ziduan.indexOf(49)>-1">异议决定书</th>
            <th class="comWidth" v-show="ziduan.indexOf(50)>-1">评审案件结案通知书</th>

            <th class="comWidth" v-show="ziduan.indexOf(51)>-1">撤三决定书</th>
            <th class="comWidth" v-show="ziduan.indexOf(52)>-1">无效宣告请求裁定书收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(53)>-1">官文收件人</th>
            <th class="comWidth" v-show="ziduan.indexOf(54)>-1">收件人电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(55)>-1">收件地址</th>
            <th class="comWidth" v-show="ziduan.indexOf(56)>-1">确认客户收件/回执</th>
            <th class="comWidth" v-show="ziduan.indexOf(57)>-1">快递单号</th>
            <th class="comWidth" v-show="ziduan.indexOf(58)>-1">寄件时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(59)>-1">邮寄方式</th>
            <th class="comWidth" v-show="ziduan.indexOf(60)>-1">备注</th>

            <th class="comWidth" v-show="ziduan.indexOf(61)>-1">纸报/网报</th>
            <th class="comWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="index">
            <td>{{item.seqNum}}</td>
            <td v-show="ziduan.indexOf(1)>-1">{{item.submitTime}}</td>
            <td v-show="ziduan.indexOf(2)>-1">{{item.seqNo}}</td>
            <td v-show="ziduan.indexOf(3)>-1">{{item.orderNo}}</td>
            <td v-show="ziduan.indexOf(4)>-1">{{item.applicant}}</td>
            <td v-show="ziduan.indexOf(5)>-1">{{item.contacts}}</td>
            <td v-show="ziduan.indexOf(6)>-1">{{item.contactsPhone}}</td>
            <td v-show="ziduan.indexOf(7)>-1">{{item.trademarkName}}</td>
            <td v-show="ziduan.indexOf(8)>-1">{{item.businessType}}</td>
            <td v-show="ziduan.indexOf(9)>-1">{{item.agentCommissioner}}</td>
            <td v-show="ziduan.indexOf(10)>-1">{{item.declareType}}</td>

            <td v-show="ziduan.indexOf(11)>-1">{{item.registerNo}}</td>
            <td v-show="ziduan.indexOf(12)>-1">{{item.officialFees}}</td>
            <td v-show="ziduan.indexOf(13)>-1">{{item.serviceCharge}}</td>
            <td v-show="ziduan.indexOf(14)>-1">{{item.totalMoney}}</td>
            <td v-show="ziduan.indexOf(15)>-1">{{item.payer}}</td>
            <td v-show="ziduan.indexOf(16)>-1">{{item.collectionType}}</td>
            <td v-show="ziduan.indexOf(17)>-1">{{item.businessCheck}}</td>
            <td v-show="ziduan.indexOf(18)>-1">{{item.financialConfirmCollection}}</td>
            <td v-show="ziduan.indexOf(19)>-1">{{item.collectionDate}}</td>
            <td v-show="ziduan.indexOf(20)>-1">{{item.reportDate|dateFormat}}</td>

            <td v-show="ziduan.indexOf(21)>-1">{{item.reporter}}</td>
            <td v-show="ziduan.indexOf(22)>-1">{{item.applicationNo}}</td>
            <td v-show="ziduan.indexOf(23)>-1">{{item.invoiceTitle}}</td>
            <td v-show="ziduan.indexOf(24)>-1">{{item.taxpayerNumber}}</td>
            <td v-show="ziduan.indexOf(25)>-1">{{item.officialFeesInvoiceNumber}}</td>
            <td v-show="ziduan.indexOf(26)>-1">{{item.serviceChargeInvoiceNumber}}</td>
            <td v-show="ziduan.indexOf(27)>-1">{{item.recevier}}</td>
            <td v-show="ziduan.indexOf(28)>-1">{{item.receviePhone}}</td>
            <td v-show="ziduan.indexOf(29)>-1">{{item.recevieAddress}}</td>
            <td v-show="ziduan.indexOf(30)>-1">{{item.expressNumber}}</td>

            <td v-show="ziduan.indexOf(31)>-1">{{item.refund}}</td>
            <td v-show="ziduan.indexOf(32)>-1">{{item.asAbandonNotice|dateFormat}}</td>
            <td v-show="ziduan.indexOf(33)>-1">{{item.dismissNotice}}</td>
            <td v-show="ziduan.indexOf(34)>-1">{{item.getAcceptNotice}}</td>
            <td v-show="ziduan.indexOf(35)>-1">{{item.notCheckNotice}}</td>
            <td v-show="ziduan.indexOf(36)>-1">{{item.updateNotice}}</td>
            <td v-show="ziduan.indexOf(37)>-1">{{item.secUpdateNotice|dateFormat}}</td>
            <td v-show="ziduan.indexOf(38)>-1">{{item.rejectNotice}}</td>
            <td v-show="ziduan.indexOf(39)>-1">{{item.updateTrademarkApply}}</td>
            <td v-show="ziduan.indexOf(40)>-1">{{item.changeEvidence}}</td>

            <td v-show="ziduan.indexOf(41)>-1">{{item.extensionEvidence}}</td>
            <td v-show="ziduan.indexOf(42)>-1">{{item.transExtension}}</td>
            <td v-show="ziduan.indexOf(43)>-1">{{item.firstCheckNotice}}</td>
            <td v-show="ziduan.indexOf(44)>-1">{{item.dissentDefenceNotice}}</td>
            <td v-show="ziduan.indexOf(45)>-1">{{item.checkRegister}}</td>
            <td v-show="ziduan.indexOf(46)>-1">{{item.registration}}</td>
            <td v-show="ziduan.indexOf(47)>-1">{{item.trademarkCheckNotice|dateFormat}}</td>
            <td v-show="ziduan.indexOf(48)>-1">{{item.rejectReviewDecision}}</td>
            <td v-show="ziduan.indexOf(49)>-1">{{item.objectionDecision}}</td>
            <td v-show="ziduan.indexOf(50)>-1">{{item.reviewCaseNotice}}</td>

            <td v-show="ziduan.indexOf(51)>-1">{{item.recallThreeDecision}}</td>
            <td v-show="ziduan.indexOf(52)>-1">{{item.invalidNoticeDate}}</td>
            <td v-show="ziduan.indexOf(53)>-1">{{item.officialRecevier}}</td>
            <td v-show="ziduan.indexOf(54)>-1">{{item.officialRecevierPhone}}</td>
            <td v-show="ziduan.indexOf(55)>-1">{{item.officialRecevierAddress}}</td>
            <td v-show="ziduan.indexOf(56)>-1">{{item.confirmConsumerReceive}}</td>
            <td v-show="ziduan.indexOf(57)>-1">{{item.emailExpressNumber}}</td>
            <td v-show="ziduan.indexOf(58)>-1">{{item.expressTime}}</td>
            <td v-show="ziduan.indexOf(59)>-1">{{item.emailType}}</td>
            <td v-show="ziduan.indexOf(60)>-1">{{item.remarks}}</td>

            <td v-show="ziduan.indexOf(61)>-1">{{item.submitType}}</td>
           
            <td class="onlyone">
              <a href="#" class="view"  @click.prevent="edit(item)">详情</a>
              <a href="#" v-if="isdelete" class="edit"  @click.prevent="remove(item.id)">删除</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="90" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="my_loading" v-show="loading" v-loading="loading">
      </div>
      <div class="tb_pagination" v-if="!loading && total>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pgIndex"
          :page-size="pgCount"
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
  import VueCookie from 'vue-cookie'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
  const rootUrl = CONFIG.rootUrl;
  
  const delUrl = './api/deleteOtherbusinessyqById';
  const listUrl = './api/selectOtherbusinessyq'
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');

	const dataObj = {//条件数据
    orderNo: null,
    applicant: null,
    contacts: null,
    contactsPhone:null,
    trademarkName: null,
    businessType: null,
    agentCommissioner: null,
    applicationNo: null
	};
  const ziduandata =[
	{key:1,label:'提交日期'},
	{key:2,label:'序号'},
	{key:3,label:'单号'},
	{key:4,label:'申请人'},
	{key:5,label:'联系人'},
	{key:6,label:'联系人电话'},
	{key:7,label:'商标名称'},
	{key:8,label:'业务类型'},
	{key:9,label:'代理专员'},
  {key:10,label:'申报类别'},
  
	{key:11,label:'注册号'},
  {key:12,label:'官费'},
  {key:13,label:'服务费'},
	{key:14,label:'总金额'},
	{key:15,label:'付款人'},
	{key:16,label:'收款方式'},
	{key:17,label:'业务审核'},
	{key:18,label:'财务确认收款'},
	{key:19,label:'收款日期'},
  {key:20,label:'申报日期'},
  
	{key:21,label:'申报员'},
  {key:22,label:'申请号'},
  {key:23,label:'发票抬头'},
	{key:24,label:'纳税人识别号'},
	{key:25,label:'官费发票号'},
	{key:26,label:'服务费发票号'},
	{key:27,label:'收件人'},
	{key:28,label:'收件电话'},
	{key:29,label:'收件地址'},
  {key:30,label:'快递单号'},
  
	{key:31,label:'退款'},
	{key:32,label:'视为放弃通知书'},
	{key:33,label:'不予受理通知书'},
	{key:34,label:'收到受理通知书'},
  {key:35,label:'不予核准通知书'},
  {key:36,label:'补正通知书'},
	{key:37,label:'第二次补正通知书'},
	{key:38,label:'驳回通知书'},
	{key:39,label:'变更、更正商标申请/注册事项申请核准通知书'},
  {key:40,label:'变更证明'},
  
	{key:41,label:'续展证明'},
	{key:42,label:'转让证明'},
	{key:43,label:'初步审定公告'},
	{key:44,label:'异议答辩通知书'},
  {key:45,label:'核准注册'},
  {key:46,label:'注册证'},
	{key:47,label:'商标评审申请受通通知书'},
	{key:48,label:'驳回复审决定书'},
	{key:49,label:'异议决定书'},
  {key:50,label:'评审案件结案通知书'},
  
	{key:51,label:'撤三决定书'},
	{key:52,label:'无效宣告请求裁定书收文日期'},
	{key:53,label:'官文收件人'},
	{key:54,label:'收件人电话'},
	{key:55,label:'收件地址'},
	{key:56,label:'确认客户收件/回执'},
	{key:57,label:'快递单号'},
  {key:58,label:'寄件时间'},
  {key:59,label:'邮寄方式'},
  {key:60,label:'备注'},
  
  {key:61,label:'纸报/网报'},
  
	
]
  export default {
    name: 'trademarklistcps',
    data() {
      return {
        ziduandata:ziduandata,
        transtitle:['未显示','已显示'],
        ziduan:[1,2,3,4,5,6,7,8,9,10],
        showtrans: false,
      	queryObj: {},
      	dataObj: Object.assign({}, dataObj),
        ywyList:[],
        createTime: '',
        rootUrl: CONFIG.rootUrl,
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
	      dataList:[],
	      pgIndex: 1,
	      pgCount: 10,
	      total:0,
	      loading: false,
        token:'',
      }
    },
    computed:{
      contw(){
        let self = this;
        let lw = self.$store.state.leftmenu.mainMenuW.slice(0,-2)-0 + (self.$store.state.leftmenu.childMenuW.slice(0,-2)-0)
        let rw = self.$store.state.rightContent.width.slice(0,-2)-0
        let cw = window.innerWidth-lw-rw-98;
        console.log(cw)
        return cw
      },
      isexport(){
				return !!store.get('userinfo').enableExport
			},
      isdelete(){
        return !!store.get('userinfo').enableDeletePrivilege 
      }
    },
    mounted() {
      let that = this;
      let getlist = store.get('userdefaultdotherlist')||this.ziduan;
      this.ziduan = getlist;
      let el = document.body||document.documentElement;
      el.onclick = function(){
        that.showtrans = false
      }
      // this.findywy()
    	this.recoverQueryData()
    	this.search();
      this.token = VueCookie.get('service_token');

      // let self = this;
      // let lw = self.$store.state.leftmenu.mainMenuW.slice(0,-2)-0 + (self.$store.state.leftmenu.childMenuW.slice(0,-2)-0)
      // let rw = self.$store.state.rightContent.width.slice(0,-2)-0
      // let cw = window.innerWidth-lw-rw-60;
      
      setTimeout(function(){
        
        FauxPlaceholder();
      },300);
      if (location.host.indexOf('sp') === 0) {
      	this.cxbUrl = cxbUrlO;
      }
    },
    methods: {
      findywy(){
        this.$http.get('./api/operatorList').then(res=>{
          this.ywyList = res.data||[]
        })
      },
      exportlist(){
        let datas = {
          pgIndex: this.pgIndex,
          pgCount: this.pgCount,
        }
        let ret = Object.assign({},this.dataObj,datas)
        let obj = {}
        for(var k in ret){
          if(ret[k]){
            obj[k]=ret[k]
          }
        }
        console.log(obj)
        window.open(this.rootUrl+'/api/exportOtherbusinessyq?'+$.param(obj)+'&access_token='+this.token)
      },
      setlist(){
        store.set('userdefaultdotherlist',this.ziduan)
      },
      
      showtransfer(){
        this.showtrans = !this.showtrans;
      },
      toaddrecord() {
        this.$router.push({name:'dotheradd',params:{id:0}});
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
    	
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
    		}
    		// this.createTime = queryObj.createTimeStart && [new Date(queryObj.createTimeStart-0), new Date(queryObj.createTimeEnd-86390000)];
    		this.pgIndex = queryObj.pgIndex ? queryObj.pgIndex-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		if (this.createTime) {
	    		ret.createTimeStart = this.createTime[0] ? new Date(this.createTime[0]).getTime() : null;
	    		ret.createTimeEnd = this.createTime[1] ? new Date(this.createTime[1]).getTime() + 86390000 : null;
        }
    		ret.pgIndex = extra ? 1 : this.pgIndex;
    		ret.pgCount = this.pgCount;
        var data = Object.assign({}, this.dataObj, ret);
    		this.getOrderList(data);
    		this.$router.replace({query: Object.assign({}, data)});
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
      	this.$http.get(listUrl, {params: data})
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
      view(item){
        this.$router.push({name:'dotheradd',params:{id:item.id}});
      },
      edit(item){
        this.$router.push({name:'dotheradd',params:{id:item.id}});
      },
      remove(id){
        let datas = ['确定删除此条数据？','此条数据相关的所有案件材料也将删除。']
        let newdatas = []
        const h = this.$createElement
        datas.forEach(item=> {
          newdatas.push(h('div',null,item))
        })
        this.$confirm('提示', {
          title:'删除提示',
          message: h('div', null, newdatas),
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: id
          }
          this.$http.get(delUrl,{params:data})
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
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormatYMD,
    },
  }
</script>
<style lang='less'>
.gongdan{
  position:relative;
  padding-top:10px;
  padding-bottom:10px;
  .transer{
    position:absolute; 
    left:0px;
    top: 50px;
    background-color:#fff;
    z-index:999;
  }
  .eachexportbtn{
		display: inline-block;
		width: 88px;
		height: 36px;
		background-color: #20a0ff;
		color: #fff;
		font-size: 14px;
		margin-right: 10px;
		border-radius: 4px;
		text-align: center;
		line-height: 36px;
		cursor: pointer;
		vertical-align: middle;
	}
}

.onlyone{
  text-align: center;
  .infos{
    color:#479CFF
  }
}
.clientServiceOrder{
  .qinquanres{

    max-width: 1526px;
    overflow-x: scroll;
  }
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
