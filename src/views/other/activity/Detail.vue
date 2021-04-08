<template>
	<div class="content_detail">
		<p @click="returnView" class="return_last"><span class="return_icn"><i class="el-icon-arrow-left"></i></span><span class="return_text">返回</span></p>
		<div class="content_details">
			<h3>{{detailInfo.title}}</h3>
			<p>日期：{{detailInfo.publishDate | dateFormat}}</p>
			<p v-html="detailInfo.text"></p>

		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Filters from 'utils/filters/'
	const detailUrl = '/cms/api/directive/contentAttribute'
	const indexUrl=CONFIG.otherUrl;
	export default {
  	components: {
    },
    data() {
      return {
      	detailInfo:{}
      }
    },
    methods: {
      returnView(){
        this.$router.push({name: 'activity', params: {}})
      },
      info(){
      	var self = this;
      	self.$http.get(indexUrl+detailUrl+"?id="+this.$route.params.id).then((resp) => {
	    		var data= resp.data;
	    		this.detailInfo=data.object;
	    	}).catch((error) => {
	        console.log(error);
	      });
      }
    },
    mounted() {

    	this.info();
    	// this.status = this.$router.query.status;
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat,
    },
     watch:{
    	$route(to, from) {
	    	this.info();
      }
	}
  }
</script>
<style lang="less">
	.content_detail{background-color:#fff;padding:30px;
		.return_last{
			.return_icn{display: inline-block;height: 22px; width: 22px; background-color: #DFE2E5;border-radius: 50%;
			text-align: center;color: #fff; font-size: 13px;vertical-align: top;margin-right: 10px;cursor: pointer;}
			.return_text{color:#556677;font-size: 14px;cursor: pointer;}

		}
		.content_details{
			width: 80%;margin-top: 20px;
			h3{font-size: 16px;color:#223344;margin-bottom: 10px;}
			p{color:#7f8fa4;margin-bottom: 10px;font-size:14px;}
		}

	}
</style>
