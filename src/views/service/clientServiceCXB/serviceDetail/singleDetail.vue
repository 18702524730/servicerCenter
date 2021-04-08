<template>
	<div class="service_detail">
		<div class="service_detail_tab">
			<ul class="clearfix">
        <li class="fl" :class="{'sele_border':status == 1}" @click="status=1">基本资料</li>
				<li class="fl ml5 mr5" :class="{'sele_border':status == 2}" @click="status=2" v-if="(infoState=='sbfw_gnsb_zs' && order != 1) || (infoState=='sbfw_gnsb_zsjc' && order != 1) || (infoState=='sbfw_gnsb_zsdb' && order != 1)">办理记录</li>
				<li class="fl" :class="{'sele_border':status == 3}" @click="status=3">我的备注</li>
			</ul>
		</div>
		<div class="service_detail_con">
			<!-- :detailData = "stateData" -->
			<single-basic :order_sn="order_sn" v-if="status == 1"></single-basic>
			<single-state :order_id="order_id" :registration="registration" v-if="status == 2"></single-state>
			<single-note :order_id="order_id" v-if="status == 3"></single-note>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import SingleBasic from './Basic.vue'
import SingleNote from './Note.vue'
import SingleState from './State.vue'
const detailUrl = './api/findCXbBsOrderDetailById';
	export default {
  	components: {
      SingleBasic,
      SingleNote,
      SingleState
    },
    data() {
      return {
      	order_id:'',
      	registration:'',
      	order_sn: '',
				status:1,
				state_data:{},
				infoState:'',
				order:''
      }
    },
    methods: {
    	infoDetail(){
				var self = this;
	      self.loading = true;
	    	this.$http.get(detailUrl+'?order_sn=' + this.order_sn)
	    	.then((resp) => {
	    		self.order_id = resp.data.order_id;
	    		self.registration = resp.data.acceptMaterials;
	    		self.infoState = resp.data.order_bs_code;
	    		self.order = resp.data.order_is_history;
	    	}).catch((error) => {
	        console.log(error);
	      });
	    }
    },
    created() {
    	this.order_sn = this.$route.params.orderSn;
    	this.infoDetail();
    	// this.status = this.$router.query.status;
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
