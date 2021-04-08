<template>
  <div class="normalPage notFound">
		<header class="head-nav">
	    <div class="fl">
	    	<a class="logo" :href="indexUrl">商家中心</a>
	    </div>
	    <!-- <div class="fr rightCol">
	    		   <a :href="indexUrl" target="_blank" class="fr">首页</a>
	    </div> -->
	  </header>
	  <div class="my_content">
	  	<span class="mid_wrap">
	  		<img src="~assets/img/noPermission.png">
	  		<p class="content">{{ contentText }}</p>
	  		<a :href="wwwUrl+'/sebe/pages/facilitator.html#/'" target="_blank" v-if="$route.query.status==1"><el-button type="primary" size="small">入驻成为拾贝商家</el-button></a>
	  	</span>
	  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      	indexUrl: CONFIG.indexUrl,
        wwwUrl: CONFIG.wwwUrl,
      	contentText: '抱歉！您无权限访问',  //提示文字
      }
    },
    mounted() {
    	let status = this.$route.query.status;
    	if (status == 1) {   //还没入驻成为拾贝商家
    		this.contentText = '您还未入驻成为拾贝商家！';
    	}
    	else if (status == 2) {   //您提交的商家入驻申请正在审核中，请耐心等待。
				this.contentText = '您提交的商家入驻申请正在审核中，请耐心等待。';
    	}
    	else if (status == 3) {   //账户被禁用
				this.contentText = '抱歉，您的商家中心账号已被禁用。如有疑问，请联系平台管理员';
    	}
    },
    methods: {
    },
  }
</script>
<style lang='less'>
.notFound{
	//公用404页面（notFound.vue）
}
.content {margin-bottom:10px;}
</style>
