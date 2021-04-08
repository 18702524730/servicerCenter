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
	  		<img src="~assets/img/notFound.png">
	  		<p>抱歉！您访问的页面失联啦</p>
	  		<a class="my_btn" href="#" @click.prevent="$router.go(-1)">返回上级</a>
	  	</span>
	  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      	indexUrl: CONFIG.indexUrl,
      }
    },
    mounted() {
    },
    methods: {
    },
  }
</script>
<style lang='less'>
.normalPage{
	//.head-nav{position: relative;}
	.my_content{
		.mid_wrap{
			text-align:center;
			position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);
			p{font-size: 16px;color: #556677;padding-top: 30px;line-height: 22px;}
			a.my_btn{
				width: 116px;height: 30px;line-height: 30px;margin-top:20px; background: #479CFF;border-radius: 2px;display: inline-block;color: #fff;text-align: center;color: #FFFFFF;font-size: 14px;
				&:hover{text-decoration: none;};
			}
		}
	}
}
</style>
