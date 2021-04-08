<template>
	<div class="invitation" v-loading="loading">
		<div class="invitation_tit clearfix">
			<p class="td01 fl">会员姓名</p>
			<p class="td02 fl">注册手机号</p>
			<p class="td03 fl">绑定时间</p>
			<p class="td04 fl">邀请渠道</p>
		</div>
		<div class="invitation_list clearfix" v-if="infoData.length" v-for="item in infoData">
			<p class="td01 fl">{{item.memberName || '--'}}</p>
			<p class="td02 fl">{{item.phone || '--'}}</p>
			<p class="td03 fl">{{item.bindTime | dateFormat}}</p>
			<p class="td04 fl">{{item.invitedChannel|channel}}</p>
			<router-link :to="'/service/myServiceOrder/list?phone='+item.phone" class="fr mr20">查看全部服务单</router-link>
		</div>
		<div class="null_info" v-if="!infoData.length&&!loading">
			<img src="~assets/img/nulldata.png" alt="">
			<span>暂无信息</span>
		</div>
		<div class="tb_pagination" v-if="infoData.length">
    	<el-pagination
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-size="15"
	      layout="total, prev, pager, next"
	      :total="total" class="fr">
	    </el-pagination>
    </div>
	</div>
</template>
<script>
import Vue from 'vue'
import Filters from 'utils/filters/'
const wwwUrl = CONFIG.wwwUrl;
const wxUrl = CONFIG.wxUrl;
const rootUrl = CONFIG.rootUrl;
export default {
	components: {
  },
  data () {
    return {
    	loading:false,
    	pg_index:1,
    	currentPage:1,
    	total:0,
    	infoData:{}
    }
  },
  methods:{
  	search(){
  		this.loading = true;
  		this.$router.push({query: Object.assign({}, {pg_index:this.pg_index})});
  		this.$http.get('./api/service_idcodeinfo?pg_index='+this.pg_index+'&pg_count=15')
  		.then((resp) => {
    		var data = resp.data;
    		this.loading = false;
    		this.infoData = data.elements;
    		this.total = data.total_elements;
    		console.log(data)
    	})
    	.catch((err) => {
    		this.loading = false;
    		console.log(err.data.msg);
    	});
  	},
  	handleCurrentChange(val) {
  		this.pg_index = val;
  		this.search();
    },
  },
  mounted() {
  	if(this.$route.query.pg_index){
  		this.pg_index = this.$route.query.pg_index;
  	}
  	this.search();
  },
  filters: {
    dateFormat: Filters.formatDate.dateFormat,
     // 邀请渠道
    channel:function(input){
			var ret = ''
	    switch (input+''){
	      case '':
	        ret = "--";
	        break;
	      case '1':
	        ret = "PC输入识别码";
	        break;
	      case '2':
	        ret = "PC链接";
	        break;
	      case '3':
	        ret = "H5二维码";
	        break;
	      case '4':
	        ret = "平台指定";
	        break;
	      case '5':
	        ret = "H5识别码";
	        break;
	    }
	    return ret;
    },
  }
}
</script>
<style lang="less">
	.invitation{padding:20px 20px 40px;
		.td01{width: 15%;}
		.td02{width: 15%;}
		.td03{width: 24%;}
		.td04{width: 18%;}
		// .td05{width: 15%;}
		.invitation_tit{height:50px;border: 1px solid #DFE2E5;background-color:#f5f5f5;
			p{font-size: 13px;color: #223344;padding-left:20px;line-height: 48px;}
		}
		.invitation_list{height:50px;border: 1px solid #DFE2E5;border-top: 0;
			p{font-size: 13px;color: #556677;padding-left:20px;line-height: 48px;}
			a{color: #479CFF;line-height:100%;display: block;font-size: 13px;vertical-align: middle;margin-top: 17px;text-decoration: none;}
			a:hover{color:#408CE6}
		}
		.null_info{text-align: center;line-height:50px;height:50px;border: 1px solid #DFE2E5;border-top: 0;
			img{margin-top: 8px;}
			span{vertical-align: top;font-size: 13px;color: #556677;}
		}
		.tb_pagination{
			padding-top: 20px;
			.el-pagination{padding:0}
		}
	}
</style>
