<template>
  <div class="commonList recommendNiceOrder">
	  <div class="condition clearfix">
      <!-- <div class="form_control"><el-input v-model="dataObj.memberName" placeholder="客户姓名"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.memberPhone" placeholder="客户手机号"></el-input></div>
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
       -->
      <div class="form_control"><el-input v-model="dataObj.orderSn" placeholder="订单编号"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.trademarkName" placeholder="商标名称"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.wangwangSn" placeholder="旺旺号"></el-input></div>
      <div class="form_control">
        <el-select v-model="confirmStatus" placeholder="确认状态" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-select v-model="doStatus" placeholder="处理状态" clearable>
          <el-option
            v-for="item in dostatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-select v-model="loadState" placeholder="载入状态" clearable>
          <el-option
            v-for="item in loadstatusOptions"
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

	  <div class="result result_no_check">
      <div class="table_handle">
        <div class="table_handle_btn batchDistribute" @click="newOpen">新增尼斯推荐</div>
      </div>
      <table class="result_type">
        <thead>
          <tr class="thead">
            <th>订单编号</th>
            <th class="minWidth">旺旺号</th>
            <th class="minWidth">商标名称</th>
            <!-- <th class="minWidth">商标图片</th> -->
            <th class="minWidth">确认状态</th>
            <th>注册类别</th>
            <th class="minWidth">处理状态</th>
            <th  class="minWidth">下单时间</th>
            <th class="minWidth">确认时间</th>
            <th class="minWidth">处理时间</th>
            <th class="minWidth">载入状态</th>
            <th class="alignc minWidth">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color nicetbody">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="index">
            <td>{{item.orderSn}}</td>
            <td>{{item.wangwangSn}}</td>
            <td>{{item.trademarkName}}</td>
            <!-- <td><img :src="item.trademarkUrl" /></td> -->
            <td>{{item.status|statusFormat}}</td>
            <td>{{item.cls}}</td>
            <td>{{item.processStatus|dostatusFormat}}</td>
            <td>{{item.orderTime|dateFormat}}</td>
            <td>{{item.confirmTime|dateFormat}}</td>
            <td>{{item.processTime|dateFormat}}</td>
            <td>{{item.loadState|loadStateFormat}}</td>
            <td class="action">
              <!-- 工单状态:10,待提交;11,财务审核;12,平台审核;13,审核通过 -->
              <a href="#" class="edit"  @click.prevent="view(item)">查看</a>
              <a href="#" class="edit" v-if="item.processStatus==0"  @click.prevent="changestatus(item)">处理</a>
              <a href="#" class="edit" v-if="item.processStatus==1" @click.prevent="loadorder(item)">载入工单</a>
              <!-- <a href="#" class="edit"  @click.prevent="remove(item.link)">删除</a> -->
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
	const workOrderListUrl = './api/findChannelNiceList';
	const getOperatorsUrl = './api/findDistributionMan';
  const delUrl = './api/delChannelNiceRec';
  const changeUrl = './api/processChannelNiceRec'
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
      value: '0',
      name: '0',
      label: '待确认'
    },
    {
      value: 1,
      name: '1',
      label: '已确认'
    },
  ]
const loadstatusOptions = [
    {
      value: '0',
      name: '0',
      label: '未载入'
    },
    {
      value: '1',
      name: '1',
      label: '已载入'
    },
  ]
const dostatusOptions = [
    {
      value: '0',
      name: '0',
      label: '未处理'
    },
    {
      value: '1',
      name: '1',
      label: '已处理'
    },
  ]
    const dataObj = {//条件数据
        trademarkName:null,
        orderSn:null,
        wangwangSn:null,
	};

	const cxbUrl = 'http://59.110.11.116/manager_login_frame.html#/manager_login/'
	const cxbUrlO = 'http://www.cnsebe.com/manager_login_frame.html#/manager_login/'
  export default {
    name: 'work-order-list',
    data() {
      return {
        confirmStatus:null,
        doStatus:null,
        loadState:null,
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
        dostatusOptions: dostatusOptions,
        loadstatusOptions: loadstatusOptions,
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
    	this.recoverQueryData()
      this.search();
      window.scrollTo(0,0)
      this.token = VueCookie.get('service_token');
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
        this.$router.push({name:'NiceAdd',params:{orderKey:'add'}});
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
        this.confirmStatus = queryObj.status
        this.doStatus = queryObj.processStatus
        this.loadState = queryObj.loadState
		  },
    	search(extra){
    		var ret = {}
    	// 	if (this.createTime) {
	    // 		ret.createTimeStart = this.createTime[0] ? new Date(this.createTime[0]).getTime() : null;
	    // 		ret.createTimeEnd = this.createTime[1] ? new Date(this.createTime[1]).getTime() + 86390000 : null;
        // }
        // orderOriginIds: [],
        // custPlatformIds: [],
    		ret.pgIndex = extra ? 1 : this.pgIndex;
        ret.pgCount = this.pgCount;
        let statusobj = {}
        statusobj.status=this.confirmStatus
        statusobj.processStatus = this.doStatus
        statusobj.loadState = this.loadState
        let data = Object.assign({}, ret, this.dataObj,statusobj);
    		this.getOrderList(data);
    		this.$router.replace({query: Object.assign({}, data)});
    	},
    	reset(){
        this.dataObj = Object.assign({}, dataObj);
        this.confirmStatus = null;
        this.doStatus = null;
        this.loadState = null
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
      		var dataList = data.elements||[];
					/*dataList.forEach((item, i) => {
						var arr = this.selectedItems;
						var idx = this.inArrayOf(arr, item, 'order_sn');
						item.checked = idx != -1;
					});*/
      		this.dataList = dataList;
      		this.total = data.totalElements||0;
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
        this.$router.push({name: 'NiceAdd', params: {orderKey: item.link}})
      },
      remove(key){
        this.$confirm('确认删除该工单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let datas = {
            key: key
          }
          this.$http.delete(delUrl,{params:datas})
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
      changestatus(item){
        this.$confirm('确认处理该工单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let datas = {
            key: item.link
          }
          this.$http.delete(changeUrl,{params:datas})
          .then((resp) => {
            this.$message.success('操作成功!');
            this.search();
          })
          .catch((err) => {
            this.$message.error(err.msg);
          });
        })
      },
      loadorder(item){
        // this.$router.push('/tmSubmitChannel/stepOne');
        this.$router.push({name: 'stepOneCh', query: {
          link: item.link,
          confirmStep: 1,
          reffer: 2
        }});
        
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
      statusLabel:Filters.statusLabel,
      loadStateFormat:function(inputs){
        if(inputs==0){
          return '未载入'
        }
        if(inputs==1){
          return '已载入'
        }
        return ''
      },
      statusFormat: function(inputs){
        
        if(inputs==0){
          return '待确认'
        }
        if(inputs==1){
          return '已确认'
        }
        return ''
      },
      dostatusFormat: function(inputs){
        
        if(inputs==0){
          return '未处理'
        }
        if(inputs==1){
          return '已处理'
        }
        return ''
      }
    },
  }
</script>
<style lang='less'>
.recommendNiceOrder{
	.result{
		thead{
			tr{
				th:first-child{padding-left: 20px;min-width: 80px;}
				th.createTime{min-width: 150px;}
			}
    }
    .result_type .nicetbody tr td.action{
      text-align: center;
      a{
        margin-right: 0;
      }
      a.view{
        margin-right:10px;
      }
    }
		tbody{
			tr{
				td:first-child{padding-left: 20px;min-width: 80px;}
				td.action{
					text-align: right;padding-right: 10px;
					a{white-space:nowrap;}
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
