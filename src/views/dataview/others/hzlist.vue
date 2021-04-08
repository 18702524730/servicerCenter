<template>
  <div class="commonList clientServiceOrder">
	  <div class="condition clearfix">
      <div class="form_control">
        <el-input v-model="dataObj.businessType" placeholder="业务类型"></el-input>
      </div>
      <div class="form_control">
        <el-input v-model="dataObj.applicant" placeholder="申请人"></el-input>
      </div>
      <div class="form_control">
        <el-input v-model="dataObj.inventName" placeholder="发明名称"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.applicationNo" placeholder="申请号"></el-input></div>
      
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
            <th class="comWidth" v-show="ziduan.indexOf(1)>-1">业务类型</th>
            <th class="comWidth" v-show="ziduan.indexOf(2)>-1">提交时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(3)>-1">申请人</th>
            <th class="comWidth" v-show="ziduan.indexOf(4)>-1">发明名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(5)>-1">发文日</th>
            <th class="comWidth" v-show="ziduan.indexOf(6)>-1">申请号</th>
            <th class="comWidth" v-show="ziduan.indexOf(7)>-1">手续合格时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(8)>-1">其他文件时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(9)>-1">初审合格.进入公布</th>
            <th class="comWidth" v-show="ziduan.indexOf(10)>-1">进入实质审查时间</th>

            <th class="comWidth" v-show="ziduan.indexOf(11)>-1">审查意见.补正</th>
            <th class="comWidth" v-show="ziduan.indexOf(12)>-1">授权公告日</th>
            <th class="comWidth" v-show="ziduan.indexOf(13)>-1">办理登记手续通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(14)>-1">证书收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(15)>-1">寄件时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(16)>-1">快递单号</th>
            <th class="comWidth" v-show="ziduan.indexOf(17)>-1">收件人</th>
            <th class="comWidth" v-show="ziduan.indexOf(18)>-1">收件人电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(19)>-1">收件人地址</th>
            <th class="comWidth" v-show="ziduan.indexOf(20)>-1">年费</th>

            <th class="comWidth" v-show="ziduan.indexOf(21)>-1">备注</th>
            
            <th class="comWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="index">
            <td>{{item.seqNum}}</td>
            <td v-show="ziduan.indexOf(1)>-1">{{item.businessType}}</td>
            <td v-show="ziduan.indexOf(2)>-1">{{item.submitTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(3)>-1">{{item.applicant}}</td>
            <td v-show="ziduan.indexOf(4)>-1">{{item.inventName}}</td>
            <td v-show="ziduan.indexOf(5)>-1">{{item.postDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(6)>-1">{{item.applicationNo}}</td>
            <td v-show="ziduan.indexOf(7)>-1">{{item.processQualifiedTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(8)>-1">{{item.otherFileTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(9)>-1">{{item.firstQualified|dateFormat}}</td>
            <td v-show="ziduan.indexOf(10)>-1">{{item.enterCheckTime|dateFormat}}</td>

            <td v-show="ziduan.indexOf(11)>-1">{{item.checkIdeaUpdate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(12)>-1">{{item.authNoticeDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(13)>-1">{{item.handleRegisterNotice|dateFormat}}</td>
            <td v-show="ziduan.indexOf(14)>-1">{{item.certificateReceiptDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(15)>-1">{{item.postTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(16)>-1">{{item.expressNo}}</td>
            <td v-show="ziduan.indexOf(17)>-1">{{item.receiver}}</td>
            <td v-show="ziduan.indexOf(18)>-1">{{item.receiverPhone}}</td>
            <td v-show="ziduan.indexOf(19)>-1">{{item.receiverAddress}}</td>
            <td v-show="ziduan.indexOf(20)>-1">{{item.annualFee}}</td>

            <td v-show="ziduan.indexOf(21)>-1">{{item.remarks}}</td>
           
            <td class="onlyone">
              <a href="#" class="view"  @click.prevent="edit(item)">详情</a>
              <a href="#" v-if="isdelete" class="edit"  @click.prevent="remove(item.id)">删除</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="23" class="norecord">
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
  
  const delUrl = './api/deleteHuazhongById';
  const listUrl = './api/selectHuazhong'
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');

	const dataObj = {//条件数据
    businessType: null,
    applicant: null,
    inventName: null,
    applicationNo:null
	};
  const ziduandata =[
	{key:1,label:'业务类型'},
	{key:2,label:'提交时间'},
	{key:3,label:'申请人'},
	{key:4,label:'发明名称'},
	{key:5,label:'发文日'},
	{key:6,label:'申请号'},
	{key:7,label:'手续合格时间'},
	{key:8,label:'其他文件时间'},
	{key:9,label:'初审合格.进入公布'},
  {key:10,label:'进入实质审查时间'},
  
	{key:11,label:'审查意见.补正'},
  {key:12,label:'授权公告日'},
  {key:13,label:'办理登记手续通知书'},
	{key:14,label:'证书收文日期'},
	{key:15,label:'寄件时间'},
	{key:16,label:'快递单号'},
	{key:17,label:'收件人'},
	{key:18,label:'收件人电话'},
	{key:19,label:'收件人地址'},
  {key:20,label:'年费'},
  
	{key:21,label:'备注'},
  
]
  export default {
    name: 'hzlistocps',
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
      let getlist = store.get('userdefaulthzlist')||this.ziduan;
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
        window.open(this.rootUrl+'/api/exportHuazhong?'+$.param(obj)+'&access_token='+this.token)
      },
      setlist(){
        store.set('userdefaulthzlist',this.ziduan)
      },
      
      showtransfer(){
        this.showtrans = !this.showtrans;
      },
      toaddrecord() {
        this.$router.push({name:'hzadd',params:{id:0}});
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
        this.$router.push({name:'hzadd',params:{id:item.id}});
      },
      edit(item){
        this.$router.push({name:'hzadd',params:{id:item.id}});
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
