<template>
	<div class="commonList functionList">
		<div class="result">
			<div class="btn_action">
				<button class="add" @click="addAccount">+新增组</button>
			</div>
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th>组名称</th>
						<th>创建时间</th>
						<th style="text-align: right;padding-right:20px;">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr v-for="(item, index) in dataList">
						<td>{{item.name}}</td>
						<td>{{item.create_time | dateFormat}}</td>

						<td class="action">
							<a href="javascript:;" class="view" @click="editFunction(item)">编辑</a>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="tb_pagination">
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
	const functionListUrl = './api/functionGroups';
	import Filters from 'utils/filters/'
	export default {
		name: 'function-list',
		data() {
			return {
				activeName:'all',
				dataList:[],
				currentPage: 1,
				pg_index: 1,
				pg_count: 15,
				total:0,
			}
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
		},
		mounted() {
			this.getAdminsList();
		},
		methods: {
			view(item){
				this.$router.push({name: 'accountDetail', params: {id: item.order_id}})
			},
			handleCurrentChange(val) {
				this.pg_index = val;
				this.getAdminsList({
					pg_index: this.pg_index
				});
			},
			tabClick(tab, event) {
				this.order_state = '';
				this.order_tasking_state = '';
				if(tab.name == 'toService'){
					this.order_state = 1;
					this.order_tasking_state = 0;
				}else if(tab.name == 'toPay'){
					this.order_state = 0;
					this.order_tasking_state = '';
				}else if(tab.name == 'toSubmit'){
					this.order_state = '';
					this.order_tasking_state = 1;
				}
				this.search();
			},
			getAdminsList(data){
				data = data || {};
				this.$http.get(functionListUrl, {
					params: data
				})
				.then((resp) => {
					var data = resp.data;
					var dataList = data.elements;
					this.dataList = dataList;
					this.total = data.total_elements;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			//增加账号
			addAccount(){
				this.$router.push({name: 'functionEdit', params: {operator_id: 0}});
			},
			//编辑账号
			editFunction(item){
//    	console.log(item)
				this.$router.push({name: 'functionEdit', params: {operator_id: item.fg_id}});
			},
		},
		'$route' (to, from) {

		}
	}
</script>
<style lang='less'>
.functionList{
	.result{
		.btn_action{
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
						text-align: right;padding-right: 10px;
						a{margin-right: 10px;}
					}
				}
			}
		}
	}
}
</style>
