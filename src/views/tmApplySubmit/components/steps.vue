<template>
	<div class="applysubmitSteps">
		<div class="sub_tit">
			<p>国内商标注册办理</p>
			<a href="#" @click.prevent="back">返回列表</a>
		</div>
		<div class="sub_steps clearfix">
			<div class="fl" :class="{'steps_bg_01':steps == 4,'steps_bg_02':steps == 3,'steps_bg_03':steps == 2,'steps_bg_04':steps == 1}">
				<p>
					<span>1</span>
					确认服务单
				</p>
			</div>
			<div class="fl" :class="{'steps_bg_02':steps == 4,'steps_bg_03':steps == 3,'steps_bg_04':steps == 2}">
				<i :class="{'steps_bg_01':steps == 4,'steps_bg_02':steps == 3,'steps_bg_03':steps == 2,'steps_bg_04':steps == 1}"></i>
				<p>
					<span>2</span>
					确认申请主体及开票信息
				</p>
			</div>
			<div class="fl" :class="{'steps_bg_03':steps == 4,'steps_bg_04':steps == 3}">
				<i :class="{'steps_bg_02':steps == 4,'steps_bg_03':steps == 3,'steps_bg_04':steps == 2}"></i>
				<p>
					<span>3</span>
					填写商标信息
				</p>
			</div>
			<div class="fl" :class="{'steps_bg_04':steps == 4}">
				<i :class="{'steps_bg_03':steps == 4,'steps_bg_04':steps == 3}"></i>
				<p>
					<span>4</span>
					确认订单
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
  	components: {
    },
    props:{
    	steps: {
        type: Number,
        default: 1
      },
    },
    data() {
      return {
      	reffer: 1
      }
    },
    methods: {
    	back(){
    		var routerName = 'myServiceOrderList'; //我的服务列表
    		if (this.reffer == 2) {
    			routerName = 'clientServiceList'; //工单列表
    		}
    		this.$router.push({name: routerName})
    	}
    },
    mounted() {
    	this.reffer = this.$route.query.reffer || 1;
    }
  }
</script>
<style lang='less'>
	.applysubmitSteps{
		.sub_tit{height: 60px;padding-left: 20px;position: relative;background-color:#f8f8f8;
			p{font-size: 16px;color:#556677;line-height: 60px;}
			a{position: absolute;top: 0;right: 20px;height: 60px;line-height: 60px;font-size: 14px;color: #3db1fa;text-decoration:none;}
			a:hover{text-decoration: none;color: #408CE6;}
		}
		.sub_steps{
			>div{width: 25%;position: relative;height:50px;background-color:#fff;border:1px solid #DFE2E5;overflow: hidden;border-left:0;border-right:0;
				i{width:50px;height:50px;-ms-transform:rotate(-45deg) !important;-moz-transform:rotate(-45deg);-webkit-transform: rotate(-45deg);-o-transform:rotate(-45deg);border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5;position: absolute;left: -36px;top: -1px;}
				p{font-size:14px;line-height:50px;text-align:center;color:#7F8FA4;padding-left:25px;
					span{display: inline-block;width:26px;height:26px;line-height:26px;border-radius:50%;background-color:#DFE2E5;text-align:center;color:#fff;margin-right:5px;}
				}
			}
			.steps_bg_01,.steps_bg_02,.steps_bg_03,.steps_bg_04{
				p{color:#fff;
					span{color: #479CFF;background-color:#fff;}
				}
			}
			.steps_bg_01{background: #87BFFF;border:0;}
			.steps_bg_02{background: #72B3FF;border:0;}
			.steps_bg_03{background: #59A5FF;border:0;}
			.steps_bg_04{background: #479CFF;border:0;}
		}
	}
</style>
