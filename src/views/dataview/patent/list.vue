<template>
  <div class="commonList clientServiceOrder">
	  <div class="condition clearfix">
      <div class="form_control">
        <el-input v-model="dataObj.companyName" placeholder="单位名称"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.contacts" placeholder="联系人姓名"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.contactsPhoneOne" placeholder="联系人电话"></el-input></div>
      
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
            <th class="comWidth" v-show="ziduan.indexOf(1)>-1">创建日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(2)>-1">会员编号</th>
            <th class="comWidth" v-show="ziduan.indexOf(3)>-1">单位名称</th>
            <th class="minWidth" v-show="ziduan.indexOf(4)>-1">纳税人识别号</th>
            <th class="minWidth" v-show="ziduan.indexOf(5)>-1">开票地址</th>
            <th class="minWidth" v-show="ziduan.indexOf(6)>-1">开票银行及账号</th>
            <th class="comWidth" v-show="ziduan.indexOf(7)>-1">联系人姓名</th>
            <th class="comWidth" v-show="ziduan.indexOf(8)>-1">联系人电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(9)>-1">邮箱</th>
            <th class="comWidth" v-show="ziduan.indexOf(10)>-1">收货人</th>
            <th class="comWidth" v-show="ziduan.indexOf(11)>-1">联系人电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(12)>-1">联系人地址</th>
            <th class="comWidth" v-show="ziduan.indexOf(13)>-1">和解金</th>
            <th class="comWidth" v-show="ziduan.indexOf(14)>-1">购买日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(15)>-1">购买枚数</th>
            <th class="minWidth" v-show="ziduan.indexOf(16)>-1">购买金额</th>
            <th class="minWidth" v-show="ziduan.indexOf(17)>-1">到账金额</th>
            <th class="minWidth" v-show="ziduan.indexOf(18)>-1">到账时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(19)>-1">到账确认人</th>
            <th class="minWidth" v-show="ziduan.indexOf(20)>-1">赠送枚数</th>
            <th class="comWidth" v-show="ziduan.indexOf(21)>-1">标签字段</th>
            <th class="comWidth" v-show="ziduan.indexOf(22)>-1">共计页数</th>
            <th class="comWidth" v-show="ziduan.indexOf(23)>-1">共计枚数</th>
            <th class="minWidth" v-show="ziduan.indexOf(24)>-1">发票号码</th>
            <th class="minWidth" v-show="ziduan.indexOf(25)>-1">出货前校验人</th>
            <th class="minWidth" v-show="ziduan.indexOf(26)>-1">邮寄时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(27)>-1">邮寄单号</th>
            <th class="comWidth" v-show="ziduan.indexOf(28)>-1">网销数量</th>
            <th class="comWidth" v-show="ziduan.indexOf(29)>-1">差额</th>
            <th class="comWidth" v-show="ziduan.indexOf(30)>-1">结算商家名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(31)>-1">结算金额</th>
            <th class="comWidth" v-show="ziduan.indexOf(32)>-1">结算时段</th>
            <th class="comWidth" v-show="ziduan.indexOf(33)>-1">备注信息</th>
            <th class="comWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="item.seqNo">
            <td>{{item.seqNo}}</td>
            <td v-show="ziduan.indexOf(1)>-1">{{item.createTimeOne|dateFormat}}</td>
            <td v-show="ziduan.indexOf(2)>-1">{{item.memberNo}}</td>
            <td v-show="ziduan.indexOf(3)>-1">{{item.companyName}}</td>
            <td v-show="ziduan.indexOf(4)>-1">{{item.taxpayerNumber}}</td>
            <td v-show="ziduan.indexOf(5)>-1">{{item.billingAddress}}</td>
            <td v-show="ziduan.indexOf(6)>-1">{{item.billingBankAccount}}</td>
            <td v-show="ziduan.indexOf(7)>-1">{{item.contactsName}}</td>
            <td v-show="ziduan.indexOf(8)>-1">{{item.contactsPhoneOne}}</td>
            <td v-show="ziduan.indexOf(9)>-1">{{item.email}}</td>
            <td v-show="ziduan.indexOf(10)>-1">{{item.recevier}}</td>
            <td v-show="ziduan.indexOf(11)>-1">{{item.contactsPhoneTwo}}</td>
            <td v-show="ziduan.indexOf(12)>-1">{{item.contactsAddress}}</td>
            <td v-show="ziduan.indexOf(13)>-1">{{item.compromiseMoney}}</td>
            <td v-show="ziduan.indexOf(14)>-1">{{item.buyDate}}</td>
            <td v-show="ziduan.indexOf(15)>-1">{{item.buyNum}}</td>
            <td v-show="ziduan.indexOf(16)>-1">{{item.buyMoney}}</td>
            <td v-show="ziduan.indexOf(17)>-1">{{item.amountReceived}}</td>
            <td v-show="ziduan.indexOf(18)>-1">{{item.receivedTime}}</td>
            <td v-show="ziduan.indexOf(19)>-1">{{item.receivedConfirm}}</td>
            <td v-show="ziduan.indexOf(20)>-1">{{item.presentNum}}</td>
            <td v-show="ziduan.indexOf(21)>-1">{{item.labelField}}</td>
            <td v-show="ziduan.indexOf(22)>-1">{{item.totalPage}}</td>
            <td v-show="ziduan.indexOf(23)>-1">{{item.totalNum}}</td>
            <td v-show="ziduan.indexOf(24)>-1">{{item.invoiceNum}}</td>
            <td v-show="ziduan.indexOf(25)>-1">{{item.sellCheck}}</td>
            <td v-show="ziduan.indexOf(26)>-1">{{item.postTime}}</td>
            <td v-show="ziduan.indexOf(27)>-1">{{item.mailExpressNumber}}</td>
            <td v-show="ziduan.indexOf(28)>-1">{{item.onlineNum}}</td>
            <td v-show="ziduan.indexOf(29)>-1">{{item.difference}}</td>
            <td v-show="ziduan.indexOf(30)>-1">{{item.settleBusiness}}</td>
            <td v-show="ziduan.indexOf(31)>-1">{{item.settleMoney}}</td>
            <td v-show="ziduan.indexOf(32)>-1">{{item.settleTimeInterval}}</td>
            <td v-show="ziduan.indexOf(33)>-1">{{item.remarks}}</td>
            <td class="onlyone">
              <a href="#" class="view"  @click.prevent="edit(item)">详情</a>
              <a href="#" v-if="isdelete" class="edit"  @click.prevent="remove(item.id)">删除</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="35" class="norecord">
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
  
  const delUrl = './api/delPatentBookById';
  const listUrl = './api/selectPatentBook'
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');

	const dataObj = {//条件数据
    contacts: null,
    contactsPhoneOne: null,
    companyName:null,
	};
  const ziduandata =[
	{key:1,label:'创建日期'},
	{key:2,label:'会员编号'},
	{key:3,label:'单位名称'},
	{key:4,label:'纳税人识别号'},
	{key:5,label:'开票地址'},
	{key:6,label:'开票银行及账号'},
	{key:7,label:'联系人姓名'},
	{key:8,label:'联系人电话'},
	{key:9,label:'邮箱'},
	{key:10,label:'收货人'},
	{key:11,label:'联系人电话2'},
	{key:12,label:'联系人地址'},
  {key:13,label:'和解金'},
  {key:14,label:'购买日期'},
	{key:15,label:'购买枚数'},
	{key:16,label:'购买金额'},
	{key:17,label:'到账金额'},
	{key:18,label:'到账时间'},
	{key:19,label:'到账确认人'},
	{key:20,label:'增送枚数'},
	{key:21,label:'标签字段'},
	{key:22,label:'共计页数'},
  {key:23,label:'共计枚数'},
  {key:24,label:'发票号码'},
	{key:25,label:'出货前校验人'},
  {key:26,label:'邮寄时间'},
  {key:27,label:'邮寄单号'},
	{key:28,label:'网销数量'},
	{key:29,label:'差额'},
	{key:30,label:'结算商家名称'},
	{key:31,label:'结算金额'},
	{key:32,label:'结算时段'},
	{key:33,label:'备注信息'},
	
]
  export default {
    name: 'plistcomponent',
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
        window.open(this.rootUrl+'/api/exportExcelPatentBook?'+$.param(obj)+'&access_token='+this.token)
      },
      setlist(){
        store.set('userdefaultpatentlist',this.ziduan)
      },
      
      showtransfer(){
        this.showtrans = !this.showtrans;
      },
      toaddrecord() {
        this.$router.push({name:'padd',params:{id:0}});
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
        this.$router.push({name:'padd',params:{id:item.id}});
      },
      edit(item){
        this.$router.push({name:'padd',params:{id:item.id}});
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
