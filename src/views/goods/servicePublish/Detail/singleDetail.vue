<template>
	<div class="service_detail">
		<div class="service_detail_tab">
			<ul class="clearfix">
        <li class="fl sele_border">基本资料</li>
			</ul>
		</div>
		<div class="service_detail_con">
			<single-basic :service_id="service_id"></single-basic>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import SingleBasic from './Basic.vue'
const detailUrl = './api/findBsOrderDetailById';
	export default {
  	components: {
      SingleBasic
    },
    data() {
      return {
      	service_id: '',
      }
    },
    methods: {
    },
    created() {
    	this.service_id = this.$route.params.id;
    }
  }
</script>
<style lang='less'>
	.service_detail{background-color: #f5f5f5;position: relative;width: 100%;
		.service_detail_tab{
			position: relative;background-color: #eaecf1;box-sizing: content-box;width: 100%;
			ul{
				li{height:40px;text-align: center;font-size:14px;color:#556677;cursor:pointer;padding:13px 12px 0;line-height: 100%;}
				.sele_border{box-sizing:border-box;background-color:#fff;}
			}
		}
	}
</style>
