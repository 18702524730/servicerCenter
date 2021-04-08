<template>
  <div class="ruleList">
  	
	  <div class="result">
  	 	<table class="result_type">
        <tbody class="tr-color">
          <tr @click="view(info)" v-for="(info,index) in dataList">
            <td>{{info.title}}</td>
            <td class="action">
            {{info.publishDate |  dateFormat                                                                                                                                                  }}
            </td>
          </tr>
         
          <!--<tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="11" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>-->
        </tbody>
	    </table>
	    <div class="my_loading" v-show="loading" v-loading="loading">
	    </div>
	    <!--<div class="tb_pagination" v-show="!loading && dataList.length">
	    	<el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="15"
		      layout="total, prev, pager, next"
		      :total="total" class="fr">
		    </el-pagination>
	    </div>-->

	  </div>
  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	const indexUrl=CONFIG.otherUrl;
	const listUrl = '/cms/api/directive/contentList?categoryIds=23&pageIndex=1&count=15';
  const serviceInfoUrl = './api/service_info';  //查询商家信息

  export default {
    name: 'order-list',
    data() {
      return {
	      dataList:[],
	      currentPage: 1,
	      pg_index: 1,
	      pg_count: 15,
	      total:0,
	      loading: false,

      }
    },
    mounted() {
    	this.getDataList();
    },
    methods: {
      view(item){
        this.$router.push({name: 'ruleDetail', params: {id: item.id}})
      },
      handleCurrentChange(val) {
    		this.pg_index = val;
    		this.search();
      },
      getDataList(){
      	this.$http.get(indexUrl+listUrl).then((resp) => {
	    		var jsonData = resp.data.page;
	    		this.dataList = jsonData.list;
      		this.total = jsonData.totalCount;
	    	}).catch((error) => {
	        console.log(error);
	      });
      }
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
    },
    watch:{
    	$route(to, from) {
    		if (to.query.selfChange) {
    			return;
    		}
    		this.getDataList();
      }
	  }
  }
</script>
<style lang='less' scoped>
.ruleList{
	.result{padding:20px;
		.result_type{	width: 100%;background-color: #f5f5f5;border: 1px solid #dfe2e5;}
		tbody{
			tr{
				color: #556677;
				height:40px;border: 1px solid #dfe2e5;
				cursor: pointer;background-color: #fff;
				td:first-child{padding-left: 20px;}
				td.action{
					text-align: right;padding-right: 10px;
					a{margin-right: 10px;}
				}
			}
			tr:hover{background:#F9F9F9;}
		}
	}
}
</style>
