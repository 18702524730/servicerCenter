<template>
	<div class="publish_dateil" v-loading="loading">
		<div v-if="!loading">
			<div class="basic_lists" v-if="detailData">
				<p>基本信息</p>
				<div class="basic_category bor_btm clearfix">
					<ul class="fl">
						<li>
							<p class="tit">商品编号</p>
							<p class="txt">{{detailData.product_num}}</p>
						</li>
						<li>
							<p class="tit">服务名称</p>
							<p class="txt">{{detailData.service_name || '--'}}</p>
						</li>
						<li>
							<p class="tit">折扣价格</p>
							<p class="txt">{{detailData.sale_price | priceformat}}</p>
						</li>
					</ul>
					<ul class="fl">
						<li>
							<p class="tit">服务类目</p>
							<p class="txt">{{detailData.category || '--'}}</p>
						</li>
						<li>
							<p class="tit">服务售价</p>
							<p class="txt">{{detailData.service_price | priceformat}}</p>
						</li>
						<li>
							<p class="tit">是否开票</p>
							<p class="txt">{{detailData.need_ticket == 1 ? '开票' : '不开票'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData">
				<p>服务描述</p>
				<div class="basic_category bor_btm">
					<ul style="width:100%">
						<li>
							<p class="tit">服务描述</p>
							<p class="txt">{{detailData.product_introduce}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData">
				<p>服务封面-PC</p>
				<div class="basic_category">
					<img class="img_pc" :src="detailData.picture" alt="">
				</div>
			</div>
			<div class="basic_lists" v-if="detailData">
				<p>服务详情页</p>
				<div class="basic_category" v-html="detailData.descriptions">
					<!-- <img class="img_detail" :src="detailData.descriptions" alt=""> -->
					{{detailData.descriptions}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import Filters from 'utils/filters/'
  const detailUrl = './api/storeService';
	export default {
  	components: {
    },
    props:['service_id'],
    data() {
      return {
      	detailData:'',
      	loading:false
      }
    },
    methods: {
      // 初始化
    	infoDetail(){
				var self = this;
	      self.loading = true;
	    	this.$http.get(detailUrl+'?service_id=' + this.service_id)
	    	.then((resp) => {
	      	self.loading = false;
	    		console.log(resp.data)
	        self.detailData = resp.data;
	    	}).catch((error) => {
	      	self.loading = false;
	      });
	    },
    },
    mounted() {
    	this.infoDetail();
    	// this.status = this.$router.query.status;
    },
    filters: {
      orderStatusformat: Filters.orderStatusformat,
      orderStatus: Filters.orderStatus,
      priceformat: Filters.priceformat,
    }
  }
</script>
<style lang='less'>
	.publish_dateil{background-color:#fff;padding:0px 0px 20px;min-height: 1160px;border-top:0;position: relative;overflow-x: auto;
		>div{position: absolute;padding:0 50px;width:100%;}
		.basic_lists{padding-top: 20px;
			>p{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
			//左侧
			//公共部分，主要是间距，字体大小，颜色
			.bor_btm{border-bottom:1px solid #dfe2e5;}
			.basic_category{text-align:left;padding-bottom: 10px;
				.category_left{width:60%;}
				ul{width:50%;
					li{overflow-x: hidden;
						p{float: left;line-height:18px;margin-bottom: 10px;}
						.tit{width:120px;font-size:13px;color:#556677;}
						.txt{font-size:13px;color:#7f8fa4;max-width:69%;margin-left: 10px;word-break:break-all;}
					}
				}
				.img_pc{width:340px;height:340px;}
				.img_detail{width:970px;height:430px;}
			}
		}
		
	}
</style>
