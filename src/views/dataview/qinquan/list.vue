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
        <!-- <el-select v-model="dataObj.agentCommissionerId" clearable filterable placeholder="代理人">
				  <el-option v-for="item in ywyList" :key="item.operator_id" :label="item.name" :value="item.operator_id"></el-option>
			  </el-select> -->
        <el-input v-model="dataObj.agentCommissioner" placeholder="代理专员"></el-input>
      </div>
      
      <div class="form_control"><el-input v-model="dataObj.businessType" placeholder="业务类型"></el-input></div>
      <div class="form_control">
        <el-input v-model="dataObj.customerName" placeholder="客户名称"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.involvedPlatform" placeholder="涉案平台"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.involvedShop" placeholder="涉案产品店铺"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.involvedProductName" placeholder="涉案产品名称"></el-input></div>
      <div class="form_control">
        <el-input v-model="dataObj.involvedPatentPerson" placeholder="涉案专利权人"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.involvedPatentName" placeholder="涉案专利名称"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.involvedPatentApplyNo" placeholder="涉案专利申请号"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.caseNo" placeholder="案件编号"></el-input></div>
      
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
            <th class="minWidth" v-show="ziduan.indexOf(1)>-1">备注</th>
            <th class="comWidth" v-show="ziduan.indexOf(2)>-1">业务类型</th>
            <th class="comWidth" v-show="ziduan.indexOf(3)>-1">分案时间</th>
            <th class="minWidth" v-show="ziduan.indexOf(4)>-1">业务员</th>
            <th class="minWidth" v-show="ziduan.indexOf(5)>-1">客户名称</th>
            <th class="minWidth" v-show="ziduan.indexOf(6)>-1">涉案平台</th>
            <th class="comWidth" v-show="ziduan.indexOf(7)>-1">涉案产品店铺</th>
            <th class="comWidth" v-show="ziduan.indexOf(8)>-1">涉案产品名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(9)>-1">涉案产品型号及参数</th>
            <th class="maxWidth" v-show="ziduan.indexOf(10)>-1">涉案产品链接</th>
            <th class="comWidth" v-show="ziduan.indexOf(11)>-1">涉案专利权人</th>
            <th class="comWidth" v-show="ziduan.indexOf(12)>-1">涉案专利名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(13)>-1">涉案专利申请日</th>
            <th class="comWidth" v-show="ziduan.indexOf(14)>-1">涉案专利申请号</th>
            <th class="comWidth" v-show="ziduan.indexOf(15)>-1">涉案专利法律状态</th>
            <th class="minWidth" v-show="ziduan.indexOf(16)>-1">是否处于无效请求阶段</th>
            <th class="minWidth" v-show="ziduan.indexOf(17)>-1">是否收到人民法院诉讼资料</th>
            <th class="minWidth" v-show="ziduan.indexOf(18)>-1">是否收到行政机关调处资料</th>
            <th class="comWidth" v-show="ziduan.indexOf(19)>-1">案件编号</th>
            <th class="minWidth" v-show="ziduan.indexOf(20)>-1">代理人</th>
            <th class="comWidth" v-show="ziduan.indexOf(21)>-1">侵权判定结果</th>
            <th class="comWidth" v-show="ziduan.indexOf(22)>-1">报告提交时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(23)>-1">报告出具时间</th>
            <th class="comWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="item.seqNo">
            <td>{{item.seqNo}}</td>
            <td v-show="ziduan.indexOf(1)>-1">{{item.remarks}}</td>
            <td v-show="ziduan.indexOf(2)>-1">{{item.businessType}}</td>
            <td v-show="ziduan.indexOf(3)>-1">{{item.divisionTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(4)>-1">{{item.salesman}}</td>
            <td v-show="ziduan.indexOf(5)>-1">{{item.customerName}}</td>
            <td v-show="ziduan.indexOf(6)>-1">{{item.involvedPlatform}}</td>
            <td v-show="ziduan.indexOf(7)>-1">{{item.involvedShop}}</td>
            <td v-show="ziduan.indexOf(8)>-1">{{item.involvedProductName}}</td>
            <td v-show="ziduan.indexOf(9)>-1">{{item.involvedProductModel}}</td>
            <td v-show="ziduan.indexOf(10)>-1" class="maxWidth">{{item.involvedProductLink}}</td>
            <td v-show="ziduan.indexOf(11)>-1">{{item.involvedPatentName}}</td>
            <td v-show="ziduan.indexOf(12)>-1">{{item.involvedPatentApplyDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(13)>-1">{{item.involvedPatentApplyNo}}</td>
            <td v-show="ziduan.indexOf(14)>-1">{{item.trademarkSubjectName}}</td>
            <td v-show="ziduan.indexOf(15)>-1">{{item.involvedPatentLawStatus}}</td>
            <td v-show="ziduan.indexOf(16)>-1">{{item.whetherInvalid}}</td>
            <td v-show="ziduan.indexOf(17)>-1">{{item.whetherCourt}}</td>
            <td v-show="ziduan.indexOf(18)>-1">{{item.whetherOffice}}</td>
            <td v-show="ziduan.indexOf(19)>-1">{{item.caseNo}}</td>
            <td v-show="ziduan.indexOf(20)>-1">{{item.agent}}</td>
            <td v-show="ziduan.indexOf(21)>-1">{{item.tortResult}}</td>
            <td v-show="ziduan.indexOf(22)>-1">{{item.submitTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(23)>-1">{{item.provideTime|dateFormat}}</td>
            <td class="onlyone">
              <a href="#" class="view"  @click.prevent="edit(item)">详情</a>
              <a href="#" v-if="isdelete" class="edit"  @click.prevent="remove(item.id)">删除</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="25" class="norecord">
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
  
  const delUrl = './api/delTortById';
  const listUrl = './api/selectTortAll'
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');

	const dataObj = {//条件数据
    salesman: null,
    agentCommissioner: null,
    businessType: null,
    customerName:null,
    involvedPlatform: null,
    involvedShop: null,
    involvedProductName: null,
    involvedPatentPerson: null,
    involvedPatentName: null,
    involvedPatentApplyNo:null,
    caseNo:null,
	};
  const ziduandata =[
	{key:1,label:'备注'},
	{key:2,label:'业务类型'},
	{key:3,label:'分案时间'},
	{key:4,label:'业务员'},
	{key:5,label:'客户名称'},
	{key:6,label:'涉案平台'},
	{key:7,label:'涉案产品店铺'},
	{key:8,label:'涉案产品名称'},
	{key:9,label:'涉案产品型号及参数'},
	{key:10,label:'涉案产品链接'},
	{key:11,label:'涉案专利权人'},
	{key:12,label:'涉案专利名称'},
  {key:13,label:'涉案专利申请日'},
  {key:14,label:'涉案专利申请号'},
	{key:15,label:'涉案专利法律状态'},
	{key:16,label:'是否处于无效请求阶段'},
	{key:17,label:'是否收到人民法院苏诉讼资料'},
	{key:18,label:'是否收到行政接管调处资料'},
	{key:19,label:'案件编号'},
	{key:20,label:'代理人'},
	{key:21,label:'侵权判定结果'},
	{key:22,label:'报告提交时间'},
	{key:23,label:'报告出具时间'},
	
]
  export default {
    name: 'qlistcomponent',
    data() {
      return {
        ziduandata:ziduandata,
        transtitle:['未显示','已显示'],
        ziduan:[1,2,3,4,5,6,7,8,9,10],
        showtrans: false,
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
	      dataList:[],
	      pgIndex: 1,
	      pgCount: 10,
	      total:0,
	      loading: false,
        token:'',
        ywyList:[],
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
      let getlist = store.get('userdefaultqlist')||this.ziduan;
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
        window.open(this.rootUrl+'/api/exportTortExcel?'+$.param(obj)+'&access_token='+this.token)
      },
      setlist(){
        store.set('userdefaultqlist',this.ziduan)
      },
      
      showtransfer(){
        this.showtrans = !this.showtrans;
      },
      toaddrecord() {
        this.$router.push({name:'qadd',params:{id:0}});
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
        this.$router.push({name:'qadd',params:{id:item.id}});
      },
      edit(item){
        this.$router.push({name:'qadd',params:{id:item.id}});
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
