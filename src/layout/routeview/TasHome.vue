<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
  <div class="tas_home" v-if="isDone">
    <head-nav></head-nav>
    <div class="tas_content">
    	<div class="tas_content_in">
      	<router-view></router-view>
      </div>
    </div>
    <footer>
    	<div class="footer_in">
				<img class="fl" src="~assets/img/layout/caasa1.png"  height="27">
				<p class="fl">杭州拾贝知识产权服务有限公司为中国产学研合作促进会反侵权假冒创新战略联盟理事长单位<br> Anti-Infringement and Anti-Counterfeit Innovation Strategic Alliance</p>
				<div class="fr copyright">© 2018 拾贝公司 All Rights Reserved</div>
			</div>
    </footer>
  </div>
</template>
<script>
  import HeadNav from '../head-nav/HeadNav.vue';
	import {store} from 'utils/';

  export default {
    name: 'home',
    components:{
      HeadNav,
    },
    data(){
    	return {
    		isDone: false
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
      		console.log(store.get('permission'));
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
      this.access();
    },
  }
</script>
<style lang='less'>
	.tas_home{
		height: 100%;
		.head-nav{z-index: 1000;}
    .tas_content{
      position: relative;top: 50px;min-width: 1280px;width:100%;background: #EAECF1;
      .tas_content_in{
				height: 100%;min-width: 1280px;max-width: 1420px;margin:0 auto;padding-top: 40px;
      }
    }

    footer{
    	/* position: absolute;left:0;bottom: 0; */position: relative;top: 100px;width:100%; height: 60px;background-color: #fff;color: #A8AFB5;border-top: 1px solid #DFE2E5;
    	.footer_in{
	    	height: 100%;min-width: 1280px;max-width: 1420px;margin:0 auto;
	    	img{margin-left: 20px;margin-top: 17px;}
	    	p{padding-top:14px;line-height: 16px;padding-left: 10px;}
	    	.copyright{line-height: 60px; padding-right: 20px;}
    	}
    }
  }
</style>
