<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
  <div class="home test">
    <head-nav v-if="isDone"></head-nav>
    <left-menu class="left-menu" v-if="isDone"></left-menu>
    <div class="main-content" :style="{'padding-left':$store.getters.leftMenuWidth}" v-if="isDone">
	    <div class="middle-content" :style="{right:$store.state.rightContent.width}">
	     	<div class='bread' v-if="$route.matched[0].path=='/other'">
			    <el-breadcrumb separator="/" class='el-bread'>
			   				<el-breadcrumb-item v-for='(item,index) in $route.matched' :key='index' v-if="index>0">{{item.meta.name}}</el-breadcrumb-item>
			    </el-breadcrumb>
		    </div>
	      <bread v-show="!store.get('breadHide')&&!store.get('breadOther')"></bread>
	      <div class="content">
	      	<div class="content-in" :style="{'min-height': ($store.state.rightContent.rightContentH + 50) > vHeight ? $store.state.rightContent.rightContentH - 100 + 'px' : vHeight- (!store.get('breadHide') ? 104 : 44) - 100 + 'px'}">
	        	<router-view></router-view>
	        </div>
	      </div>
			<footer>
			<img class="fl" src="~assets/img/layout/caasa1.png" height="27">
			<p class="fl">杭州拾贝知识产权服务有限公司为北京反侵权假冒创新战略联盟理事长单位<br> Anti-Infringement and Anti-Counterfeit Innovation Strategic Alliance</p>
			<div class="fr copyright">© 2018 拾贝公司 All Rights Reserved</div>
			</footer>

	    </div>
	    <right-content class="right-content"></right-content>
    </div>
    <!-- <div class="left-fixed-right-auto">
    </div> -->
  </div>
</template>
<script>
  import HeadNav from '../head-nav/HeadNav.vue';
	import LeftMenu from '../left-menu/LeftMenu.vue';
	import RightContent from '../right-content/RightContent.vue';
	import Bread from '../bread/Bread.vue';
	import {store} from 'utils/';

  export default {
    name: 'home',
    components:{
      HeadNav,LeftMenu,RightContent,Bread
    },
    data(){
    	return {
    		store: store,
    		isDone: false,
    		vHeight:500,
    	}
    },
    methods: {
      access() {
      	//console.log(this.axios.post)
      	store.set('permission', '');
      	store.set('userinfo', '');
      	this.axios.get('./api/privilege', {})
      	.then((resp) => {
      		this.isDone = true;
      		var data = resp.data;
      		store.set('userinfo', data);
      		store.set('permission', data.purviews);
      		store.set('avatar', data.avatar);
      		this.$store.commit('UPDATE_AVATAR', data.avatar);
      		console.log(store.get('permission'),store.get('userinfo'));
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
    },
    created() {
    },
    mounted() {
      // console.log(this.$store.state.user.userinfo.access);
      this.vHeight = window.innerHeight;
      this.access();
    },
  }
</script>
<style lang='less'>
	.home{
		min-width: 1280px;width: 100%;overflow: hidden;
		.left-fixed-right-auto{
			position: relative;
			min-height: 640px;
			height: 100%;
		}
		.actContent{position: relative;min-height: 700px;}
		.main-content{position: relative;padding-top: 50px;width: 100%;display: table;}
    .middle-content{
    	min-width: 793px;background-color: #eaecf1;display: table-cell;
    	.content{
    		padding:20px;width: 100%;position: relative;
    		.content-in{background-color: #fff;min-height: 560px;}
    	}
    }
    .right-content{
      display: table-cell;position: relative;width: 240px;background: #fff;border-left: 1px solid #EAECF1;z-index: 2;
    }

    footer{
    	/* position: absolute;left:0;bottom: 0; */width:100%; height: 60px;background-color: #fff;color: #A8AFB5;
    	img{margin-left: 20px;margin-top: 17px;}
    	p{padding-top:14px;line-height: 16px;padding-left: 10px;}
    	.copyright{line-height: 59px; padding-right: 20px;}
    }
  }
</style>
