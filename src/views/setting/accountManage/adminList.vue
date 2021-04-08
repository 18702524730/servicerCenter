<template>
  <div class="commonList adminsList">
  	<div class="commonListHead adminsListHead">
			<el-tabs v-model="activeName" @tab-click="tabClick">
		    <el-tab-pane label="全部" name="all"></el-tab-pane>
		    <el-tab-pane label="启用" name="1"></el-tab-pane>
		    <el-tab-pane label="禁用" name="0"></el-tab-pane>
		  </el-tabs>
	  </div>

	  <div class="result result_no_check">
	  	<div class="btn_action">
	  		<!-- <el-button size="small" type="primary" v-if="total > 0 && total < 21" @click="addAccount">绑定子账号</el-button> -->
	  		<el-button size="small" type="primary" @click="addAccount">绑定子账号</el-button>
	  		<div class="fr" style="font-size: 13px;" v-if="allData.bindStatusNumber">已绑定 {{allData.bindStatusNumber}}/{{allData.total_elements}}</div>
	  	</div>
  	 	<table class="result_type" v-show="!loading">
        <thead>
          <tr class="thead">
						<th>姓名</th>
          	<!-- <th>用户名</th> -->
            <th>注册手机号</th>
            <th>功能组</th>
            <th>业务组</th>
            <th>绑定状态</th>
            <th>绑定时间</th>
            <th>最后登录时间</th>
            <th style="text-align: center;">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="item in dataList" :key="item.operator_id">
						<td>{{item.trueName}}</td>
            <!-- <td>{{item.name}}</td> -->
            <td>{{item.phone}}</td>
            <td>{{item.fg_name}}</td>
            <td>{{item.dg_name}}</td>
            <td>{{item.bindStatus == 1 ? '绑定中' : item.bindStatus == 2 ? '已绑定' : '待绑定'}}</td>
            <td>{{item.bindTime|dateFormat}}</td>
            <td>{{item.last_login_time|dateFormat}}</td>
            <td class="action">
            	<a href="javascript:;" class="view" @click="editAccount(item)" v-if="!item.is_admin">编辑</a><el-popover placement="bottom" width="140" trigger="click" class="popover" v-if="!item.is_admin && item.operatorState == 0">
                <p>是否启用该账号？</p>
							  <div style="text-align: right; margin: 0">
							    <span class="error" size="mini" type="text" @click="hidePop">否</span>
							    <span class="move" type="primary" size="mini" @click="update(item.operator_id, 1)">是</span>
							  </div>
                <a href="javascript:;" slot="reference" class="view">启用</a>
              </el-popover><el-popover placement="bottom" width="140" trigger="click" class="popover" v-if="!item.is_admin && item.operatorState == 1">
                <p>是否禁用该账号？</p>
							  <div style="text-align: right; margin: 0">
							    <span class="error" size="mini" type="text" @click="hidePop">否</span>
							    <span class="move" type="primary" size="mini" @click="update(item.operator_id, 0)">是</span>
							  </div>
                <a href="javascript:;" slot="reference" class="view">禁用</a>
              </el-popover>
            </td>
          </tr>
          <tr class="empty" v-show="!dataList.length">
            <td colspan="12" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
	    </table>
			<div class="my_loading" v-show="loading" v-loading="loading"></div>
			<div class="tb_pagination" v-if="dataList.length">
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
	import Filters from 'utils/filters/'
	const adminListUrl = './api/admins';
	const updateUrl = './api/frozenAdmin';

  export default {
    name: 'admins-list',
    data() {
      return {
      	allData: {},
      	operatorState:'',
      	activeName:'all',
	      dataList:[],
	      currentPage: 1,
	      pg_index: 1,
	      pg_count: 15,
				total:0,
				loading: false
      }
    },
    mounted() {
    	this.formatTabName();
    	this.search();
    },
    methods: {
      view(item){
        this.$router.push({name: 'accountDetail', params: {id: item.order_id}})
      },
    	handleCurrentChange(val) {
    		this.pg_index = val;
    		this.search();
      },
      formatTabName(){
      	var queryObj = this.queryObj = this.$route.query;
    		this.operatorState = queryObj.operatorState;
      	var ret = 'all';
      	if(this.operatorState === '0'){
    			ret = '0';
    		}else if(this.operatorState == '1'){
    			ret = '1';
    		}
    		this.activeName = ret;
      },
    	tabClick(tab, event) {
    		this.operatorState = '';
    		if(tab.name === '0'){
    			this.operatorState = '0';
    		}else if(tab.name === '1'){
    			this.operatorState = '1';
    		}
    		this.search();
      },
      search(extra){
    		extra = extra || {};
    		var ret = {}
    		ret.operatorState = this.operatorState;

    		ret.pg_index = this.pg_index;
    		ret.pg_count = this.pg_count;
    		var data = Object.assign({}, ret);
    		this.getAdminsList(data);
    		this.$router.replace({query: data});
    	},
      getAdminsList(data){
				this.loading = true
      	this.$http.get(adminListUrl, {params: data})
      	.then((resp) => {
					this.loading = false
      		var data = resp.data;
      		var dataList = data.elements;
      		this.allData = data;
					this.dataList = dataList;
					console.log('datalist', this.dataList)
      		this.total = data.total_elements;
      	})
      	.catch((err) => {
					this.loading = false
      		console.log(err);
      	});
      },
      //增加账号
      addAccount(){
      	this.$router.push({name: 'accountEdit', params: {operator_id: 0}});
      },
      //编辑账号
      editAccount(item){
      	this.$router.push({name: 'accountEdit', params: {operator_id: item.operator_id}});
      },
      update(operator_id, open){
      	this.$http.get(updateUrl, {
      		params: {
      			admin_ids: operator_id,
      			operatorState: open
					}
				})
      	.then((resp) => {
      		var data = resp.data;
      		this.$message.success('设置成功！');
      		this.search();
      	})
      	.catch((err) => {
      		this.$message.error(err.msg);
      	});
      	this.hidePop();
      },
      //隐藏浮框
      hidePop(){
        document.getElementById('app').click();
      },
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
      orderStatusformat: Filters.orderStatusformat,
      payStatusformat: Filters.payStatusformat,
      priceformat:Filters.priceformat,
      titleLengthFormat:Filters.titleLengthFormat
    },
  }
</script>
<style lang='scss'>
.adminsList{
	.result{
		.btn_action{
			height: 50px;
			padding:10px 0 10px;
			.add{width: 88px;height: 30px;line-height: 30px;text-align: center;color: #fff;font-size: 14px;background: #479CFF;border-radius: 2px;}
			.add:hover{border-color: #387CCC;background-color: #387CCC;}
		}
		.result_type{
			thead{
				tr{
					th:first-child{padding-left: 20px;}
				}
			}
			tbody{
				tr{
					td:first-child{padding-left: 20px;}
					td.action{
						text-align: center;padding-right: 10px;
						a{margin-right: 5px;margin-left: 5px;}
					}
				}
			}
		}
	}
}
</style>
