
<template>
  <div class="general_wrap">
  	<div class="info">
  		<a href="#/setting/sellerManage/basicInfo"><img :src="avatar" width="90" height="90"></a>
			<div class="name_wrap">
				<el-tooltip  placement="top-start" class="manager-popover" content="管理员" v-if="userInfo.is_admin"><i class="manager"></i></el-tooltip><i class="jg" v-if="userInfo.spType == 1"></i><i class="presonal" v-if="userInfo.spType == 2"></i>
				<span class="name">{{userInfo.nickName || userInfo.name}}</span><span class="type">| {{userInfo.spType == 2 ? '个人商家' : '机构商家'}}</span>
			</div>
			<p>
				{{userInfo.sp_name}}
				<el-popover
					v-for="(item, index) in userInfo.tagsList" :key="index"
				  placement="top-start"
				  trigger="hover" popper-class="shop_icon_popper">
				  <div class="code_tip">
				  	<p>{{item.name}}{{item.openState ? '：已开通': '：未开通'}}</p>
				  	<p v-if="!item.openState">请致电0571-28253756获取开通规则</p>
				  </div>
				  <img slot="reference" class="shop_icon" :src="item.openState ? item.iconUrl : item.iconDisableUrl">
				</el-popover>
			</p>
			<div class="mt5 other">
				<a :href="shareUrl" target="_blank">查看自营店铺</a><a href="javascript:;" class="ml10 share" :data-clipboard-text="shareUrl">分享店铺</a>
			</div>
  	</div>
  	<div class="serviceHall">
  		<h3>订单概况</h3>
  		<div class="data_wrap">
  			<ul class="data clearfix">
  				<li class="spec">
  					<router-link :to="'/trade/myOrder/list'">
	  					<span>{{staticticsData.allorder||0}}</span>
	  					<p :class="{hight: staticticsData.allorder>0}">全部订单</p>
  					</router-link>
  				</li>
  				<li class="spec">
	  				<router-link :to="'/trade/myOrder/list?finished_start_time='+ this.finished_start_time + '&finished_end_time=' + this.finished_end_time">
	  					<span>{{staticticsData.yesterdayorder||0}}</span>
	  					<p :class="{hight: staticticsData.yesterdayorder>0}">昨日订单</p>
  					</router-link>
  				</li>
  				<li class="spec">
	  				<router-link :to="'/trade/myOrder/list?order_state=0&order_tasking_state='">
	  					<span>{{staticticsData.waitpay||0}}</span>
	  					<p :class="{hight: staticticsData.waitpay>0}">待付款订单</p>
	  				</router-link>
  				</li>
  			</ul>
  		</div>
  	</div>
  	<div class="serviceHall clearfix">
  		<h3>服务概况</h3>
  		<div class="fl serviceHall row50 sebeHall">
	  		<h4>拾贝网平台</h4>
	  		<div class="data_wrap">
	  			<ul class="data clearfix">
	  				<li>
	  					<router-link :to="'/service/myServiceOrder/list?order_service_state=1'">
		  					<span>{{staticticsData.waitservice||0}}</span>
		  					<p :class="{hight: staticticsData.waitservice>0}">待服务</p>
	  					</router-link>
	  				</li>
	  				<li>
		  				<router-link :to="'/service/myServiceOrder/list?order_state=&order_tasking_state=1'">
		  					<span>{{staticticsData.waitsumbit||0}}</span>
		  					<p :class="{hight: staticticsData.waitsumbit>0}">待提交</p>
		  				</router-link>
	  				</li>
	  				<li>
		  				<router-link :to="'/service/clientService/list?status=2'">
		  					<span>{{staticticsData.confirmedwaitpay||0}}</span>
		  					<p :class="{hight: staticticsData.confirmedwaitpay>0}">加项待付款</p>
	  					</router-link>
	  				</li>
	  			</ul>
	  		</div>
	  	</div>
	  	<div class="fr serviceHall row50 cxbHall">
	  		<h4>创新保平台</h4>
	  		<div class="data_wrap">
	  			<ul class="data clearfix"  v-if="userInfo.is_relate_cxb && (userInfo.is_admin || cxbIsAllowed)">
	  				<li>
	  					<router-link :to="'/service/clientServiceCXB/list?throughState=1'">
		  					<span>{{cxbstaticticsData.cxbwaitthrough || 0}}</span>
		  					<p :class="{hight: cxbstaticticsData.cxbwaitthrough>0}">待反馈</p>
	  					</router-link>
	  				</li>
	  				<li>
		  				<router-link :to="'/service/clientServiceCXB/list?throughState=2&payState=0'">
		  					<span>{{cxbstaticticsData.cxbwaitpay || 0}}</span>
		  					<p :class="{hight: cxbstaticticsData.cxbwaitpay>0}">待付款</p>
		  				</router-link>
	  				</li>
	  				<li>
		  				<router-link :to="'/service/clientServiceCXB/list?waitReport=1'">
		  					<span>{{cxbstaticticsData.cxbwaitreport || 0}}</span>
		  					<p :class="{hight: cxbstaticticsData.cxbwaitreport>0}">待上报</p>
		  				</router-link>
	  				</li>
	  			</ul>
	  			<p v-else>
	  				很抱歉您暂无创新保业务能力或暂无权限<br>
	  				如需获取创新保业务能力请致电0571-28253756。
	  			</p>
	  		</div>
	  	</div>
	  	<div>
	  	</div>
  	</div>
  </div>
</template>

<script>
	import {store} from 'utils/';
	import Clipboard from 'clipboard';
	import photo from 'assets/img/index/photo.png';
	const wwwUrl = CONFIG.wwwUrl;
	const indexUrl = CONFIG.indexUrl;
	const generalStatisticsUrl = './api/tas/general/statistics';
	const cxbgeneralStatisticsUrl = './api/cxb/general/statistics';
	const customer_service_priv = 'iprp_customer_service';
	const serviceInfoUrl = './api/service_info';  //查询商家信息

  export default {
    data() {
      return {
      	finished_start_time:'',
      	finished_end_time:'',
      	shareUrl: '#',
      	cxbIsAllowed: false,
      	avatar: photo,
      	userInfo: {},
      	staticticsData:'',
      	cxbstaticticsData:''
      }
    },
    mounted() {
    	this.getYestodayTimeRange();
    	this.userInfo = store.get('userinfo') || {};
    	this.avatar = store.get('avatar') || photo;
    	this.shareUrl = `${wwwUrl}/store/${this.userInfo.shopCode}.htm`;
    	this.cxbIsAllowed = store.get('permission').indexOf(customer_service_priv) !== -1;
    	this.getStaticticsData();  //查询数据
    	let clipboard = new Clipboard('.share');
    	clipboard.on('success', (e) => {
	      this.$message({
	        message: '店铺链接已复制到剪切板',
	        type: 'success'
	      });
	    });
    },
    methods: {
    	getYestodayTimeRange(){
    		let today = new Date();
    		let yestoday = new Date(new Date().getTime()-24*60*60*1000);
    		this.finished_start_time = new Date(yestoday.getFullYear(), yestoday.getMonth(), yestoday.getDate()).getTime();
    		this.finished_end_time = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    	},
      view(item){
        this.$router.push({name: 'accountDetail'})
      },
      getStaticticsData(){
      	this.$http.get(generalStatisticsUrl)
      	.then((resp) => {
      		var data = resp.data;
      		this.staticticsData = data;
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      	// 有创新保账号才发请求
      	if (this.userInfo.is_relate_cxb && (this.userInfo.is_admin || this.cxbIsAllowed)) {
      		this.$http.get(cxbgeneralStatisticsUrl)
	      	.then((resp) => {
	      		var data = resp.data;
	      		this.cxbstaticticsData = data;
	      	})
	      	.catch((err) => {
	      		console.log(err);
	      	});
      	}
      }
    },
    '$route' (to, from) {

    }
  }
</script>
<style lang='scss'>
.general_wrap{
	padding:30px;
	.info{
		position: relative;height: 100px;padding-left: 110px;padding-bottom: 8px;font-size: 14px;
		>a{
			position: absolute;left: 0;top:0;width: 92px;height: 92px;border-radius: 50%;display: inline-block;border-radius:50%;border:1px solid #DFE2E5;
			img{width: 90px;height: 90px;border-radius: 50%;}
		}
		.name_wrap{
			height: 36px;line-height: 24px;padding-top: 12px;
			i{display: inline-block;height: 24px;width: 24px;margin-right: 4px;background: transparent url(~assets/img/index/jg.png) center center no-repeat;}
			i.manager{background-image: url(~assets/img/index/manager.png);}
			i.jg{background-image: url(~assets/img/index/jg.png);}
			i.presonal{background-image: url(~assets/img/index/presonal.png);}
			span{display: inline-block;vertical-align: top;}
			span.name{font-size: 18px;color: #223344;padding-right: 10px;}
			span.type{color: #7F8FA4;font-size: 14px;position: relative;top: 2px;}
		}
		p{
			line-height: 20px;font-size: 14px;color: #556677;padding-top: 8px;
			i.seven{display: inline-block;width: 18px;height:23px;color: #fff;font-style: normal;text-align: center;line-height: 23px;font-size: 12px;background: transparent url(~assets/img/index/7_gray.png) 0 0 no-repeat;margin-left: 5px;cursor: default;
				&.hight{
					background-image: url(~assets/img/index/7.png);
				}
			}
			>span{display: inline-block;height: 25px;vertical-align: middle;}
			.shop_icon{height: 20px;width:20px;display: inline-block;vertical-align: middle;margin-right: 5px;}
		}
		.other{
			line-height: 20px;
			a{
				color: #479CFF;
				&:hover{text-decoration: none;}
			}
		}
		.code_wrap{
			padding-top: 5px;height: 25px;line-height: 20px;font-size: 14px;color: #556677;
			span{color:#289CF4;}
			i{display: inline-block;width: 14px;height: 14px;border-radius: 50%;background-color: #ccc;color: #fff;font-style: normal;text-align: center;line-height: 14px;font-size: 12px;cursor: pointer;
				&:hover,&:active,&:visited{background-color: #289CF4;}
			}
		}
	}
	.serviceHall{
		padding-top: 30px;
		h3{height: 22px;line-height: 22px;font-size: 15px;color: #223344;}
		h4{height: 20px;line-height: 20px;font-size: 14px;color: #223344;font-weight: normal;margin-bottom: -10px;}
		.data_wrap{
			min-height: 110px;margin-top: 20px;background: #F5F5F5;border-radius: 2px;
			ul.data{
				padding:0 0 30px 30px;background: #F5F5F5;
				li{
					float: left;height: 50px;margin-top: 30px;margin-right: 9%;margin-left: 9%;font-size: 24px;color: #223344;text-align: center;
					a{
						span{font-family: Arial;line-height: 27px;display: block;width: 100%;}
						p{
							font-size: 13px;color: #556677;line-height: 14px;padding-top: 10px;vertical-align: top;display: inline-block;width: 100%;
						}
						.hight{
							&::before{
								font-size: 14px;
								content:'●';
								color: #479CFF;
								padding-right:3px;
							}
						}
						&:hover{
							text-decoration: none;
							p{color:#289CF4; }
						}
					}
				}
				li.spec{margin-right: 4%;margin-left: 4%;}
			}
			>p{font-size:13px;color:#a8afb5;text-align:center;padding-top:35px;}
		}
	}
	.row50{width: 49%;}
	.sebeHall{
		padding-bottom: 0;padding-top: 20px;
		h4{width: 150px;background: #fff url(~assets/img/index/sebe.png) right center no-repeat;}
	}
	.cxbHall{
		padding-top: 20px;
		h4{width: 150px;background: #fff url(~assets/img/index/ali.png) right center no-repeat;}
	}
	.contact{
		padding-top: 30px;
		h3{height: 22px;line-height: 22px;font-size: 16px;color: #223344;font-weight: normal;}
		>p{font-size: 13px;color: #7F8FA4;margin-top: 14px;line-height: 30px;
			label{margin-right: 23px;color: #556677;}
		}
		div.tip{font-size: 12px;color: #7F8FA4;padding-top: 6px;}
	}
}
.shop_icon_popper{
	min-width:80px!important;padding: 10px;
	.code_tip{
		p{font-size: 12px;color: #556677;line-height: 16px;margin-bottom: 0}
		a{color:#289CF4;text-decoration:none;}
	}
}
</style>
