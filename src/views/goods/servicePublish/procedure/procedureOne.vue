<template>
	<div class="procedure_box">
		<div class="s_content">
			<p class="title">请选择服务范围:</p>
			<div class="s_range">
				<div class="title_box">
					<span class="text level_one">一级服务类目</span>
					<span class="text level_two">二级服务类目</span>
					<span class="text level_three" style="width:299px;">三级服务类目</span>
				</div>
				<div class="list_box">
					<div class="item level_one">
						<p class="line" v-for="item in serviceListOne" :key="item.bs_class_id" :class="{'active': item.bs_class_id===first_category}" @click="serviceOne(item)">{{ item.name }}</p>
					</div>
					<div class="item level_two">
						<p class="line" v-for="item in serviceListTwo" :key="item.id" :class="{'active': item.id===second_category}" @click="serviceTwo(item)">{{ item.name }}</p>
					</div>
					<div class="item level_three mt10" style="width:295px;border-right:0;height:220px;">
						<el-radio-group v-for="item in serviceListThree" :key="item.id" v-model="third_category" @change="serviceThree(item)">
					    <el-radio :label="item.id">{{ item.name }}</el-radio>
					  </el-radio-group>
					</div>
				</div>
			</div>
			<el-button size="medium" type="primary" class="submit_btn" @click="nextTo">下一步</el-button>
		</div>
	</div>
</template>


<script>
	const codeImgUrl = CONFIG.rootUrl+'/servlet/captchaCode?t=';
	const loginUrl = './api/login';
	import merge from 'webpack-merge'
	import {store} from 'utils/';
	const productOneUrl = './api/businesses_classes';
	const productTwoUrl = './api/product';
	import qs from 'qs';
	export default{
		props:['prodectOneInfo'],
		data(){
			return{
				indexUrl: CONFIG.indexUrl,
				check: true,
				serviceListOne: [],  //一级服务类目
				serviceListTwo: [],  //二级服务类目
				serviceListThree: [],  //三级服务类目
				first_category:'',
				second_category:'',
				third_category:'',
				clsName:[],
				codes:''
			}
		},
		methods:{
			serviceOne(item){//点击一级类目
				if(this.first_category != item.bs_class_id){
					this.first_category = item.bs_class_id;
					this.getProductType(1,item.bs_class_id);
					this.clsName[0] = item.name;
					this.third_category = '';
					this.serviceListThree = [];
				}
			},
			serviceTwo(item){//点击二级类目
				if(this.second_category != item.id){
					this.second_category = item.id;
					this.getProductType(2,item.id);
					this.clsName[1] = item.name;
				}
			},
			serviceThree(item){
				this.clsName[2] = item.name;
				this.codes = item.code;
			},
			getProductType(type,id){
				if(!type){//获取商品一级分类
					this.$http.get(productOneUrl, {params: {bs_parent_id: 0}})
					.then((resp) => {
						var data = resp.data;
						this.serviceListOne = data.elements;
					})
					.catch((err) => {
						console.log(err.data.msg);
					});
				}else if(type==1){//获取商品二级分类
					this.$http.get(productTwoUrl, {
						params: {
							type:type,
							parent_id: id
						}
					})
					.then((resp) => {
						var data = resp.data;
						this.serviceListTwo = data;
					})
					.catch((err) => {
						console.log(err.data.msg);
					});
				}else if(type==2){//获取商品三级分类
					this.$http.get(productTwoUrl, {
						params: {
							type:type,
							parent_id: id
						}
					})
					.then((resp) => {
						var data = resp.data;
						this.serviceListThree = data;
					})
					.catch((err) => {
						console.log(err.data.msg);
					});
				}
			},
			nextTo(){//首先校验该商家是否支持该服务
				console.log(this.clsName.join(" "))
				let self = this;

				if(this.first_category&&this.second_category&&this.third_category){
					this.$http.post('./api/validateSpBs',{third_category:this.third_category})
					.then((resp)=>{
						this.toNext();
						return;
					})
					.catch((err)=>{
						this.$message({
		          showClose: true,
		          message: err.msg,
		          type: 'warning'
		        });
						return;
					})
				}else{
					this.$message({
	          message: '请选择服务范围',
	          type: 'warning'
	        });
				}
			},
			toNext(){
				let self = this;
				let data = {
					first_category:this.first_category,
					second_category:this.second_category,
					third_category:this.third_category,
					category:this.clsName.join(" "),
					codes:this.codes
				}
      	self.$emit('prodectone',data)
			}
		},
		mounted(){
			console.log(this.prodectOneInfo)
			let self = this;
			this.getProductType();
			if(this.prodectOneInfo.first_category){//如果有赋值，显示赋值内容
				this.first_category = this.prodectOneInfo.first_category;
				this.second_category = this.prodectOneInfo.second_category;
				this.third_category = this.prodectOneInfo.third_category;
				this.getProductType(1,this.first_category);
				this.getProductType(2,this.second_category);
			}else{
				if(!self.$route.params.id){//没有id则是新增页面，不请求接口
					return;
				}
				self.$http.get('/api/storeService',{params: {service_id: self.$route.params.id}})
				.then((resp)=>{
					console.log(resp)
					// 第一步资料
					this.first_category = resp.data.first_category,
					this.second_category=resp.data.second_category,
					this.third_category=resp.data.third_category
					this.getProductType(1,this.first_category);
					this.getProductType(2,this.second_category);
					console.log(self.prodectOneInfo,8888)
				})
				.catch((error)=>{

				})
			}
		}
	}
</script>

<style lang="less" >
.procedure_box{width: 100%; overflow-x: auto;padding: 0 50px;position: relative;height:610px;}
.s_content {
	width: 1000px; height: auto; padding: 30px 50px 200px;text-align:center;position: absolute;left:50%;margin-left:-500px;
	.title {
		width: 100%; text-align: left; color: #556677; text-align: left; margin-bottom: 10px;  font-size: 14px;
		.red {color: #F64744; }
	}
	.s_range {
		width: 100%; box-sizing: border-box; border: 1px solid #DFE2E5; margin-bottom: 10px;
		.title_box {
			width: 900px; height: 40px; line-height: 40px;
			.text {background: #F9F9F9; width: 300px; display: inline-block; box-sizing:border-box; float: left; text-align: center; border-right: 1px solid #DFE2E5; border-bottom: 1px solid #DFE2E5; color: #A8AFB5; font-size: 13px;}
			.level_three {width: 300px;}
		}
		.list_box {
			width: 900px; height: 240px; overflow: hidden;
			.el-radio-group{
				display:block;line-height:20px;margin-left: 15px;margin-top:15px;
			}
			.item {
				background: #fff; width: 300px; float: left; height: 100%; box-sizing:border-box; border-right: 1px solid #DFE2E5; text-align: left; overflow-y: auto; cursor: pointer;
				&::-webkit-scrollbar { width: 4px; }
				&::-webkit-scrollbar-track {
				  background-color: #DFE2E5;
				} /* 滚动条的滑轨背景颜色 */
				&::-webkit-scrollbar-thumb {
				    background-color: #A8AFB5; border-radius: 4px;
				} /* 滑块颜色 */
				&::-webkit-scrollbar-button {
				    background-color: #eee; display:none;
				} /* 滑轨两头的监听按钮颜色 */
				&::-webkit-scrollbar-corner {
				    background-color: black;
				}
				.line {
					padding-left: 20px; height: 40px; line-height: 40px; color: #556677; font-size: 14px; background: #fff;
					&:hover {background: #F9F9F9;};
				}
			}
			.level_one {
				.line {
					&.active {color: #fff; background: #479CFF; opacity: 0.8;}
				}
			}
			.level_two {
				.line {
					&.active {color: #fff; background: #479CFF; }
				}
			}
		}
	}
	.submit_btn{margin-top: 20px;}
}
</style>
