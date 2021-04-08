<template>
	<div class="precedure_threen">
		<i class="el-icon-success mb15"></i>
		<p>发布成功！</p>
		<div class="mt25">
			<el-button @click="toLists">返回列表</el-button>
		  <el-button type="primary" @click="goOn">继续发布</el-button>
		</div>
	</div>	
</template>

<script>
	import {store} from 'utils/';
	import qs from 'qs';
	export default{
		name:'wechar_bind',
		data(){
			return{
			}
		},
		methods:{
			goOn () {
				this.$emit('initialization')
				this.$router.push('/goods/servicePublish/addCommodity')
			},
			toLists(){
				this.$router.push({name: 'PublishList'})
			}
		},
		mounted(){

		}
	}
</script>

<style lang="less" >
.precedure_threen {
	text-align:center;padding-top:90px;
	i{font-size: 40px;color:#36af47;}
	p{font-size:18px;color:#223344;line-height:25px;}
}
</style>