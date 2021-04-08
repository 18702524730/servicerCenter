<template>
  <div class="normalPage invalid">
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
	  		<img src="~assets/img/invalid.png">
	  		<p>登录超时，<b>{{time}}</b>秒后自动<a class="reLogin" :href="userUrl + '/iprp/#/access/login'">重新登录</a></p>
	  	</span>
	  </div>
  </div>
</template>

<script>
	const userUrl = CONFIG.userUrl;
  export default {
    data() {
      return {
      	indexUrl: CONFIG.indexUrl,
      	userUrl: userUrl,
      	time: 3
      }
    },
    mounted() {
    	var timer = setInterval(() => {
    		this.time = this.time - 1
    		if (this.time <= 0) {
    			clearInterval(timer);
    			location.href = userUrl + '/iprp/#/access/login?return_url=' + this.indexUrl;
    		}
    	}, 1000);
    },
    methods: {
    },
  }
</script>
<style lang='less'>
.invalid{
	//公用404页面（notFound.vue）
	.mid_wrap{
		p{
			b{color: #F64744;}
			.reLogin{color: #479CFF;}
		}
	}
}
</style>
