<template>
	<div class="service_type_list" v-loading="loading">
		<p>我的服务类目</p>
		<!-- 服务信息 -->
		<div class="service_info">
			<div class="info_tit clearfix">
				<p class="tit_left fl">服务范围</p>
				<p class="tit_left fl">服务类别</p>
				<p class="fl">服务名称</p>
			</div>
			<div class="info_list clearfix" v-if="serviceTypeData.length" v-for="data in serviceTypeData">
				<div class="list_left">
					<p>{{data.bs_class_parent_name}}</p>
				</div>
				<div class="list_left list_middle">
					<p>{{data.bs_class_name}}</p>
				</div>
				<div class="list_right">
					<p v-for="item in data.bs_names">{{item || '--'}}</p>
				</div>
			</div>
			<div class="empty_ic" v-if="!loading && !serviceTypeData.length"><span>暂无信息</span></div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {store} from 'utils/';
	export default {
  	components: {
    },
    data() {
      return {
      	serviceTypeData: [],
      	loading:false
      }
    },
    methods: {
    	// service  info
    	serviceInfo(){
    		this.loading = true;
    		this.$http.get('./api/findSpBusinessesBySpId')
    		.then((resp) => {
    			this.loading = false;
    			console.log(resp.data)
    			this.serviceTypeData = resp.data.elements;
	    	})
	    	.catch((err) => {
	    		this.loading = false;
	    		// this.search();
	    	});
    	}
    },
    mounted() {
    	this.serviceInfo()
    },
  }
</script>
<style lang='less'>
	.service_type_list{
		min-height: 400px;
		>p{font-size: 14px;color: #223344;padding:20px 0 0 20px;}
		.service_info{padding:20px;
			.info_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
				p{font-size: 13px;color: #223344;line-height:50px;padding-left:20px;}
				.tit_left{width:200px;height:50px;border-right: 1px solid #DFE2E5;}
			}
			.info_list{border: 1px solid #DFE2E5;border-top:0;position: relative;vertical-align: middle;width:100%;overflow-x: hidden;border-bottom:0;
				.list_left{width:200px;border-right: 1px solid #DFE2E5;height:100%;display:inline-block;height: 100%;position: absolute;overflow:hidden;vertical-align: middle;vertical-align: middle;border-bottom:1px solid #DFE2E5;
					p{position: absolute; top: 50%; left: 20px; transform: translateY(-50%);font-size: 13px;color: #223344;-ms-transform: translateY(-50%);-moz-transform: translateY(-50%);-o-transform: translateY(-50%);-webkit-transform: translateY(-50%);}
				}
				.list_middle{position: absolute;left: 200px;}
				.list_right{display:inline-block;margin-left: 400px;font-size: 13px;color: #223344;width:100%;
					p{width:100%;line-height:50px;border-bottom:1px solid #DFE2E5;padding-left:20px;}
				}
			}
		}
		.empty_ic {border: 1px solid #DFE2E5;border-top:0;height: 200px;text-align: center;padding-top: 83px;
		    span {display: inline-block;height: 34px;line-height: 34px;padding-left: 40px;background: transparent url("~assets/img/nulldata.png") 0 center no-repeat;color: #A8AFB5;
				}
		}
		// .upload_wrap_photo .file-uploader .img-wrap{width:92px;height:92px;border:1px solid #DFE2E5;border-radius:50%;}
	}
</style>
