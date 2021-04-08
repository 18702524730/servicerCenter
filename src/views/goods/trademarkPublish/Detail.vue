<template>
	<div class="service_detail">
		<div class="service_detail_tab">
			<ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}" @click="status=1">基本资料</li>
				<li class="fl" :class="{'sele_border':status == 2}" @click="status=2">我的备注</li>
			</ul>
		</div>
		<div class="service_detail_con">
			<!-- :detailData = "stateData" -->
			<single-basic v-if="status == 1"></single-basic>
			<single-note :order_id="order_id" v-if="status == 2"></single-note>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import SingleBasic from './Detail/Basic.vue'
import SingleNote from './Detail/Note.vue'
// import SingleState from '../Detail/State.vue'
const detailUrl = './api/findBsOrderDetailById';
	export default {
  	components: {
      SingleBasic,
      SingleNote,
      // SingleState
    },
    data() {
      return {
      	registration:'',
      	order_id: '',
				status:1,
				state_data:{},
				infoState:'',
				order:''
      }
    },
    methods: {
    },
    created() {
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
