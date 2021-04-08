<template>
	<div class="batch_threen" v-loading="loading">
		<p class="mb20">表格一键发布</p>
		<span>已进行同步{{synStatus.synTotalNum}}次，请确认同步结果：</span>
		<div class="table mt20">
			<p @click="synType(0)" :class="{'select':trademarStatus===0}">全部<i></i></p>
			<p class="ml5" :class="{'select':trademarStatus===1}" @click="synType(1)">同步成功<span>{{synStatus.synSuccessNum}}</span><i></i></p>
			<p class="ml5" :class="{'select':trademarStatus===2}" @click="synType(2)">同步失败<span>{{synStatus.synfailNum}}</span><i></i></p>
		</div>
		<div class="result mt20">
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th width="80" class="paddingL">商标图样</th>
						<th class="minWidth" width="110">商标分类</th>
						<th width="100">注册号</th>
						<th class="minWidth">商标名称</th>
						<th class="alignr">底价</th>
						<th class="minWidth alignr paddingL">平台售价</th>
						<th class="minWidth paddingL">价格类型</th>
						<th class="minWidth">商标组合</th>
						<th class="minWidth" width="180">适用项目</th>
						<th class="minWidth paddingL">同步结果</th>
						<th class="minWidth">失败原因</th>
						<th class="minWidth alignc paddingR" width="50">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<template v-for="item in trademarkList">
						<tr v-if="item.sync_status == trademarStatus || trademarStatus===0">
								<td class="paddingL">
									<img :src="item.picture" alt="">
		            </td>
								<td>{{getTmInfo(item.category)}}</td>
								<td>{{item.acceptmaterials}}</td>
								<td>{{item.trademark_name}}</td>
								<td class="alignr">{{item.reservePrice?item.reservePrice+'.00':'--'}}</td>
								<td class="alignr" style="padding-left:20px;">{{item.seller_price}}.00</td>
								<td class="paddingL">{{item.price_type | priceType}}</td>
								<td>{{item.comby | trademarkComby}}</td>
								<td>{{item.application}}</td>
								<td class="paddingL">{{item.sync_status == 1 ? '成功' : '失败'}}</td>
								<td>{{item.failreason || '--'}}</td>
								<td class="alignc action">
									<a class="view" @click="removeList(item)">删除</a>
								</td>
						</tr>
					</template>
					<tr class="empty" v-show="(!loading&&!trademarkList.length)||(trademarStatus==1&&!synStatus.synSuccessNum)||(trademarStatus==2&&!synStatus.synfailNum)">
						<td colspan="12" class="norecord">
							<div class="empty_ic"><span>暂无信息</span></div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="tb_pagination" v-if="!loading && trademarkList.length">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="pg_index"
					:page-size="10"
					layout="total, prev, pager, next"
					:total="total" class="fr">
				</el-pagination>
			</div>
			<button class="release mt20" @click="releaseAll">发布成功商标</button>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import intClsData from 'utils/intClsData.js'
	import Filters from 'utils/filters/'
	const SynResult = './api/seller/getCacheTmSynStatusResult';
	const getCacheTmList = './api/seller/getCacheTmList';
	const deleteSyn = './api/seller/deleteSynCachedTmById';
	const publishCache = './api/seller/publishCacheTm';

	export default {
		components: {
		},
    data() {
      return {
      	loading:false,
      	synStatus:{},
      	trademarkList:{},
      	pg_index:1,
      	pg_count:10,
      	total:0,
				cateIdData: intClsData.cateIdData,
      	trademarStatus:0
      }
    },
    methods: {
    	synType(index){
    		this.trademarStatus = index;
    		this.CacheList()
    	},
    	getTmInfo(item){// 大类过滤
    		if(item){
    			var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
        	return str;
    		}else{
    			var str = '--';
    			return str;
    		}
    	},
			removeList(item){
				let data = {
					id:item.id
				}
				this.loading = true;
				this.$http.post(deleteSyn,data)
				.then((resp) => {
					this.CacheList();
				this.loading = false;
				})
				.catch((err) => {
				this.loading = false;
				});
			},
			CacheList(){//查询同步完成列表
				this.$router.replace({query: {pg_index:this.pg_index}});
				let data = {
					pg_index:this.pg_index-1,
					pg_count:this.pg_count
				}
				if(this.trademarStatus){
					data.syncStatus = this.trademarStatus;
				}
				this.loading = true;
				this.$http.post(getCacheTmList,data)
				.then((resp) => {
					if (resp.data.total_elements == 0) {
						this.$emit('TmResult')
					}
					this.synStatus = resp.data;
					this.total = resp.data.total_elements ? resp.data.total_elements : 0;
					this.trademarkList = resp.data.elements ? resp.data.elements : [];
					this.loading = false;
				})
				.catch((err) => {
					this.loading = false;
				});
			},
    	handleCurrentChange(val) {
				this.pg_index = val;
				this.CacheList();
    	},
    	releaseAll(){
				this.loading = true;
    		this.$http.post(publishCache)
				.then((resp) => {
				this.loading = false;
					this.$router.push({name: 'trademarkPublishList'});
				})
				.catch((err) => {
				this.loading = false;
				});
    	}
    },
		filters: {
			priceType: Filters.priceType,
			trademarkComby: Filters.trademarkComby
		},
    mounted() {
    	this.CacheList();
    },
    watch:{

    }
  }
</script>
<style lang='less'>
.batch_threen{background-color:#fff;padding:20px;
	>p{font-size:14px;color:#333;line-height:20px;}
	>span{font-size:14px;line-height:17px;color:#333;}
	.table{border-bottom:1px solid #eee;width:100%;
		p{display:inline-block;font-size:14px;padding:0 6px 10px;border-bottom:2px solid #fff;cursor: pointer;color:#333;position: relative;
			span{color:#479CFF;margin-left:5px;}
			i{width:100%;height:2px;display:block;position: absolute;bottom:-3px;left:0;}
		}
		p:hover{
			i{background-color:#479CFF;}
		}
		.select{
			i{background-color:#479CFF;}
		}
	}
	.result{
		.result_type{
			width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;
			thead{
				height: 50px;overflow:hidden;border: 1px solid #DFE2E5;border-collapse: inherit;
				tr{
					height: 50px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;} 
					th.minWidth{min-width: 60px;}
					th.alignc{text-align: center;}
					th.alignr{text-align: right;}
					th.paddingR{padding-right: 10px;}
					th.paddingL{padding-left: 10px;}
					th.minWidth.paddingR{min-width: 70px;}
					th.minWidth.paddingL{min-width: 70px;}
				}
			}
			tbody{
				tr{
					height: 50px;border: 1px solid #DFE2E5;background-color: #fff;
					td{
						min-height: 50px;font-size: 13px;color: #556677;padding:5px 3px;
						.el-checkbox{position: relative;top: -1px;}
						img{width:50px;height:50px;border: 1px solid #f5f5f5;}
					}
					td.check_wrap{padding-left: 20px;padding-right: 20px;width: 16px;}
					td.minWidth{min-width: 60px;}
					td.alignc{text-align: center;
						a{cursor: pointer;}
					}
					td.alignr{text-align: right;}
					td.paddingR{padding-right: 10px;}
					td.paddingL{padding-left: 10px;}
					td.yijia{color:#36AF47;}
					td.yikoujia{color:#479CFF;}
					td.action{
						a{color: #479CFF;}
						a:hover{text-decoration: none;color: #479CFF;}
					}
					td.pay{color: #36AF47;}
					td.nopay{color: #F64744;}
					td.memo{
						span{display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 78px;}
					}
				}
				tr:hover,tr.hover{
					background-color: #F9F9F9;
				}
				tr.empty{
					.empty_ic{
						height: 200px;text-align: center;padding-top:83px;
						span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; background: transparent url(~assets/img/nulldata.png) 0 center no-repeat;color: #A8AFB5}
					}
					&:hover{background-color: #fff;}
				}
			}
			tfoot{

			}
		}
		.my_loading{border: 1px solid #DFE2E5;height: 200px;margin-top: -1px;margin-bottom: 75px;}
		.tb_pagination{
			padding-top: 10px;
			.el-pagination{padding:0;}
		}
	}
	.release{width:144px;height:36px;background-color:#479CFF;font-size:14px;color:#fff;text-align:center;line-height:36px;border-radius:2px;}
}
 // #app .el-button--primary:hover {background-color:#479CFF;border-color:#479CFF;}
 // #app .el-button--primary{background-color:#479CFF;border-color:#479CFF;}

</style>
