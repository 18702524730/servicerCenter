<template>
  <div class="commonList clientServiceOrder">
	  <div class="condition clearfix">
      <div class="form_control">
        <!-- <el-select v-model="dataObj.salesmanId" clearable filterable placeholder="业务员">
				  <el-option v-for="item in ywyList" :key="item.operator_id" :label="item.name" :value="item.operator_id"></el-option>
			  </el-select> -->
        <el-input v-model="dataObj.salesman" placeholder="业务员"></el-input>
      </div>
      <div class="form_control">
        <el-input v-model="dataObj.customerName" placeholder="客户名称"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.applyBusinessName" placeholder="申请业务名称"></el-input></div>
      <div class="form_control">
        <el-input v-model="dataObj.businessType" placeholder="业务类型"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.contacts" placeholder="联系人"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.contactsPhone" placeholder="联系电话"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.hightechPerson" placeholder="高新事务部人员"></el-input></div>
      
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
            <th class="comWidth" v-show="ziduan.indexOf(1)>-1">填报日期</th>
            <th class="minWidth" v-show="ziduan.indexOf(2)>-1">业务员</th>
            <th class="comWidth" v-show="ziduan.indexOf(3)>-1">客户名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(4)>-1">申请业务名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(5)>-1">业务类型</th>
            <th class="comWidth" v-show="ziduan.indexOf(6)>-1">收件地址</th>
            <th class="minWidth" v-show="ziduan.indexOf(7)>-1">联系人</th>
            <th class="comWidth" v-show="ziduan.indexOf(8)>-1">联系电话</th>
            <th class="minWidth" v-show="ziduan.indexOf(9)>-1">合同总金额</th>
            <th class="comWidth" v-show="ziduan.indexOf(10)>-1">预付款金额</th>

            <th class="comWidth" v-show="ziduan.indexOf(11)>-1">预付款收款日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(12)>-1">第二期金额</th>
            <th class="maxWidth" v-show="ziduan.indexOf(13)>-1">第二期收款日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(14)>-1">尾款金额</th>
            <th class="comWidth" v-show="ziduan.indexOf(15)>-1">尾款收款日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(16)>-1">高新事务部人员</th>
            <th class="comWidth" v-show="ziduan.indexOf(17)>-1">评估意见</th>
            <th class="comWidth" v-show="ziduan.indexOf(18)>-1">约定结果</th>
            <th class="comWidth" v-show="ziduan.indexOf(19)>-1">约定完成时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(20)>-1">预计完成时间</th>

            <th class="comWidth" v-show="ziduan.indexOf(21)>-1">进度情况</th>
            <th class="comWidth" v-show="ziduan.indexOf(22)>-1">立项文件下发日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(23)>-1">可延展项目</th>
            <th class="comWidth" v-show="ziduan.indexOf(24)>-1">发票抬头</th>
            <th class="comWidth" v-show="ziduan.indexOf(25)>-1">公司注册地址</th>
            <th class="comWidth" v-show="ziduan.indexOf(26)>-1">付款人纳税识别号</th>
            <th class="comWidth" v-show="ziduan.indexOf(27)>-1">财务电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(28)>-1">开户银行</th>
            <th class="comWidth" v-show="ziduan.indexOf(29)>-1">开户银行账户</th>
            <th class="comWidth" v-show="ziduan.indexOf(30)>-1">发票类型</th>

            <th class="comWidth" v-show="ziduan.indexOf(31)>-1">渠道对接人</th>
            <th class="comWidth" v-show="ziduan.indexOf(32)>-1">服务商编号</th>
            <th class="comWidth" v-show="ziduan.indexOf(33)>-1">预付款发票号</th>
            <th class="comWidth" v-show="ziduan.indexOf(34)>-1">开票时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(35)>-1">发票收件（领票）人</th>
            <th class="comWidth" v-show="ziduan.indexOf(36)>-1">邮寄（领票）时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(37)>-1">邮寄（领票）方式</th>
            <th class="comWidth" v-show="ziduan.indexOf(38)>-1">邮件地址</th>
            <th class="comWidth" v-show="ziduan.indexOf(39)>-1">快递公司</th>
            <th class="comWidth" v-show="ziduan.indexOf(40)>-1">快递单号</th>

            <th class="comWidth" v-show="ziduan.indexOf(41)>-1">提交时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(42)>-1">业务状态</th>
            <th class="comWidth" v-show="ziduan.indexOf(43)>-1">第二期发票号</th>
            <th class="comWidth" v-show="ziduan.indexOf(44)>-1">第二期开票时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(45)>-1">发票收件（领票）人</th>
            <th class="comWidth" v-show="ziduan.indexOf(46)>-1">发票寄件（领票）时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(47)>-1">尾款发票号</th>
            <th class="comWidth" v-show="ziduan.indexOf(48)>-1">尾款开票时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(49)>-1">领票人</th>
            <th class="comWidth" v-show="ziduan.indexOf(50)>-1">领票时间</th>
            
            <th class="comWidth" v-show="ziduan.indexOf(51)>-1">结案档案员</th>
            <th class="comWidth" v-show="ziduan.indexOf(52)>-1">结案时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(53)>-1">备注</th>
            <!-- <th class="comWidth" v-show="ziduan.indexOf(54)>-1">创建人</th>
            <th class="comWidth" v-show="ziduan.indexOf(55)>-1">创建时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(56)>-1">修改人</th>
            <th class="comWidth" v-show="ziduan.indexOf(57)>-1">修改时间</th> -->
            <!-- <th class="comWidth" v-show="ziduan.indexOf(58)>-1">最后活动时间</th> -->
            <th class="comWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="item.seqNo">
            <td>{{item.seqNo}}</td>
            <td v-show="ziduan.indexOf(1)>-1">{{item.fillDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(2)>-1">{{item.salesman}}</td>
            <td v-show="ziduan.indexOf(3)>-1">{{item.customerName}}</td>
            <td v-show="ziduan.indexOf(4)>-1">{{item.applyBusinessName}}</td>
            <td v-show="ziduan.indexOf(5)>-1">{{item.businessType}}</td>
            <td v-show="ziduan.indexOf(6)>-1">{{item.recevierAddress}}</td>
            <td v-show="ziduan.indexOf(7)>-1">{{item.contacts}}</td>
            <td v-show="ziduan.indexOf(8)>-1">{{item.contactsPhone}}</td>
            <td v-show="ziduan.indexOf(9)>-1">{{item.contractTotalMoney}}</td>
            <td v-show="ziduan.indexOf(10)>-1">{{item.preMoney}}</td>

            <td v-show="ziduan.indexOf(11)>-1">{{item.preMoneyDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(12)>-1">{{item.secondMoney}}</td>
            <td v-show="ziduan.indexOf(13)>-1">{{item.secondMoneyDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(14)>-1">{{item.lastMoney}}</td>
            <td v-show="ziduan.indexOf(15)>-1">{{item.lastMoneyDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(16)>-1">{{item.hightechPerson}}</td>
            <td v-show="ziduan.indexOf(17)>-1">{{item.assessOpinions}}</td>
            <td v-show="ziduan.indexOf(18)>-1">{{item.appointResult}}</td>
            <td v-show="ziduan.indexOf(19)>-1">{{item.appointCompleteTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(20)>-1">{{item.preCompleteTime|dateFormat}}</td>

            <td v-show="ziduan.indexOf(21)>-1">{{item.speedSituation}}</td>
            <td v-show="ziduan.indexOf(22)>-1">{{item.topicDate}}</td>
            <td v-show="ziduan.indexOf(23)>-1">{{item.extensionProject}}</td>
            <td v-show="ziduan.indexOf(24)>-1">{{item.invoiceTitle}}</td>
            <td v-show="ziduan.indexOf(25)>-1">{{item.companyRegisterAddress}}</td>
            <td v-show="ziduan.indexOf(26)>-1">{{item.taxpayerNumber}}</td>
            <td v-show="ziduan.indexOf(27)>-1">{{item.financePhone}}</td>
            <td v-show="ziduan.indexOf(28)>-1">{{item.openBank}}</td>
            <td v-show="ziduan.indexOf(29)>-1">{{item.openBankAccount}}</td>
            <td v-show="ziduan.indexOf(30)>-1">{{item.invoiceType}}</td>

            <td v-show="ziduan.indexOf(31)>-1">{{item.channelDock}}</td>
            <td v-show="ziduan.indexOf(32)>-1">{{item.servicerNo}}</td>
            <td v-show="ziduan.indexOf(33)>-1">{{item.preInvoiceNo}}</td>
            <td v-show="ziduan.indexOf(34)>-1">{{item.preInvoiceDate}}</td>
            <td v-show="ziduan.indexOf(35)>-1">{{item.preInvoiceReceiver}}</td>
            <td v-show="ziduan.indexOf(36)>-1">{{item.prePostGetDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(37)>-1">{{item.postGetType}}</td>
            <td v-show="ziduan.indexOf(38)>-1">{{item.postAddress}}</td>
            <td v-show="ziduan.indexOf(39)>-1">{{item.expressCompany}}</td>
            <td v-show="ziduan.indexOf(40)>-1">{{item.mailExpressNumber}}</td>

            <td v-show="ziduan.indexOf(41)>-1">{{item.submitDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(42)>-1">{{item.businessState}}</td>
            <td v-show="ziduan.indexOf(43)>-1">{{item.secondInvoiceNo}}</td>
            <td v-show="ziduan.indexOf(44)>-1">{{item.secondInvoiceDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(45)>-1">{{item.secondInvoiceReceiver}}</td>
            <td v-show="ziduan.indexOf(46)>-1">{{item.secondPostGetDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(47)>-1">{{item.lastInvoiceNo}}</td>
            <td v-show="ziduan.indexOf(48)>-1">{{item.lastInvoiceDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(49)>-1">{{item.invoiceReceiver}}</td>
            <td v-show="ziduan.indexOf(50)>-1">{{item.invoiceReceiveTime|dateFormat}}</td>

            <td v-show="ziduan.indexOf(51)>-1">{{item.closeArchivesPerson}}</td>
            <td v-show="ziduan.indexOf(52)>-1">{{item.closeArchivesTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(53)>-1">{{item.remarks}}</td>
            <!-- <td v-show="ziduan.indexOf(54)>-1">{{item.creatorOne}}</td>
            <td v-show="ziduan.indexOf(55)>-1">{{item.createTimeOne|dateFormat}}</td>
            <td v-show="ziduan.indexOf(56)>-1">{{item.updatePersonOne}}</td>
            <td v-show="ziduan.indexOf(57)>-1">{{item.updateTimeOne|dateFormat}}</td> -->
            <!-- <td v-show="ziduan.indexOf(58)>-1">{{item.involvedPatentApplyDate|dateFormat}}</td> -->
            <td class="onlyone">
              <a href="#" class="view"  @click.prevent="edit(item)">详情</a>
              <a href="#" v-if="isdelete" class="edit"  @click.prevent="remove(item.id)">删除</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="55" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="my_loading" v-show="loading" v-loading="loading">
      </div>
      <div class="tb_pagination" v-if="!loading && dataList.length">
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
  
  const delUrl = './api/delTechById';
  const listUrl = './api/selectTech'
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');

	const dataObj = {//条件数据
    salesman: null,
    customerName: null,
    applyBusinessName:null,
    businessType: null,
    contacts: null,
    contactsPhone: null,
    hightechPerson: null
	};
  const ziduandata =[
	{key:1,label:'填报日期'},
	{key:2,label:'业务员'},
	{key:3,label:'客户名称'},
	{key:4,label:'申请业务名称'},
	{key:5,label:'业务类型'},
	{key:6,label:'收件地址'},
	{key:7,label:'联系人'},
	{key:8,label:'联系电话'},
	{key:9,label:'合同总金额'},
	{key:10,label:'预付款金额'},
	{key:11,label:'预付款收款日期'},
  {key:12,label:'第二期金额'},
  {key:13,label:'第二期收款日期'},
	{key:14,label:'尾款金额'},
	{key:15,label:'尾款收款日期'},
	{key:16,label:'高新事务部人员'},
	{key:17,label:'评估意见'},
	{key:18,label:'约定结果'},
	{key:19,label:'约定完成时间'},
	{key:20,label:'预计完成时间'},
	{key:21,label:'进度情况'},
  {key:22,label:'立项文件下发日期'},
  {key:23,label:'可延展项目'},
	{key:24,label:'发票抬头'},
	{key:25,label:'公司注册地址'},
	{key:26,label:'付款人纳税识别号'},
	{key:27,label:'财务电话'},
	{key:28,label:'开户银行'},
	{key:29,label:'开户银行账号'},
	{key:30,label:'发票类型'},
	{key:31,label:'渠道对接人'},
	{key:32,label:'服务商编号'},
	{key:33,label:'预付款发票号'},
	{key:34,label:'预付款开票时间'},
  {key:35,label:'发票收件（领票）人'},
  {key:36,label:'邮寄（领票）时间'},
	{key:37,label:'邮寄（取票）方式'},
	{key:38,label:'邮件地址'},
	{key:39,label:'快递公司'},
	{key:40,label:'快递单号'},
	{key:41,label:'提交时间'},
	{key:42,label:'业务状态'},
	{key:43,label:'第二期发票号'},
	{key:44,label:'第二期开票时间'},
  {key:45,label:'二期发票收件（领票）人'},
  {key:46,label:'发票寄件（领票）时间'},
	{key:47,label:'尾款发票号'},
	{key:48,label:'尾款开票时间'},
	{key:49,label:'领票人'},
	{key:50,label:'领票时间'},
	{key:51,label:'结案档案员'},
	{key:52,label:'结案时间'},
	{key:53,label:'备注'},
	// {key:54,label:'创建人'},
	// {key:55,label:'创建时间'},
	// {key:56,label:'修改人'},
	// {key:57,label:'修改时间'},
  // {key:58,label:'最后活动时间'},
	
]
  export default {
    name: 'techlistcomponent',
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
        rootUrl: CONFIG.rootUrl,
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
      // this.findywy()
      let getlist = store.get('userdefaulttechlist')||this.ziduan;
      this.ziduan = getlist;
      let el = document.body||document.documentElement;
      el.onclick = function(){
        that.showtrans = false
      }
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
        window.open(this.rootUrl+'/api/exportExcelTech?'+$.param(obj)+'&access_token='+this.token)
      },
      setlist(){
        store.set('userdefaulttechlist',this.ziduan)
      },
      
      showtransfer(){
        this.showtrans = !this.showtrans;
      },
      toaddrecord() {
        this.$router.push({name:'techadd',params:{id:0}});
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
        this.$router.push({name:'techadd',params:{id:item.id}});
      },
      edit(item){
        this.$router.push({name:'techadd',params:{id:item.id}});
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
