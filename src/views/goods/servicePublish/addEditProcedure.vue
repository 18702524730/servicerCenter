<template>
	<div class="procedure">
		<div class="procedure_heade clearfix">
			<div class="procedure01 fl" :class="{'procedure_state':procedureStatus>=1}">
				<p>1</p>
				<span class="mt10">选择服务类目</span>
			</div>
			<div class="procedure02 fl" :class="{'procedure_state':procedureStatus>=2}">
				<p @click="prodecttwo">2</p>
				<span class="mt10">填写服务信息</span>
			</div>
			<div class="procedure03 fl" :class="{'procedure_state':procedureStatus>=3}">
				<p>3</p>
				<span class="mt10">发布成功</span>
			</div>
		</div>
		<procedureOne v-if="procedureStatus==1" @prodectone="prodectone" :prodectOneInfo="prodectOneInfo"></procedureOne>
		<procedureTwo v-if="procedureStatus==2" @prodecttwo="prodecttwo" @lastTo="lastTo"></procedureTwo>
		<procedureThreen v-if="procedureStatus==3" @initialization="initialization"></procedureThreen>
	</div>
</template>

<script>
	const codeImgUrl = CONFIG.rootUrl+'/servlet/captchaCode?t=';
	const loginUrl = './api/login';

	import {store} from 'utils/';
	import merge from 'webpack-merge'
	import qs from 'qs';
	import procedureOne from './procedure/procedureOne.vue'
	import procedureTwo from './procedure/procedureTwo.vue' 
	import procedureThreen from './procedure/procedureThreen.vue'
	export default{
		name:'wechar_bind',
		data(){
			
			return{
				indexUrl: CONFIG.indexUrl,
				check: true,
				textarea3: '',
				procedureStatus:1,
				prodectOneInfo:{},
				prodectTwoInfo:{}
			}
		},
		components:{
			procedureOne,
			procedureTwo,
			procedureThreen
		},
		methods:{
			initialization(){//继续发布
				this.prodectOneInfo = {};
				this.prodectTwoInfo = {};
				this.procedureStatus = 1;
			},
			lastTo(){//返回上一步
				this.procedureStatus = this.procedureStatus - 1;
			},
			prodectone(data){
				this.prodectOneInfo = data;
				this.procedureStatus = 2;
				console.log(data)
			},
			prodecttwo(data){
				let self = this;
				this.prodectTwoInfo = data;
				self.prodectTwoInfo.need_ticket = Number(self.prodectTwoInfo.need_ticket);
				if(!this.prodectOneInfo){
					this.$message({
	          message: '请选择服务类目',
	          type: 'warning'
	        });
	        return;
				}
				if(this.$route.params.id){//编辑
					let dataInfo = {
						service_id:this.$route.params.id
					}
					if(!this.prodectOneInfo){
						if(!this.prodectOneInfo){
							this.$message({
			          message: '请返回上一步选择服务类别',
			          type: 'warning'
			        });
						}
					}
					let info = Object.assign({},dataInfo, this.prodectOneInfo, this.prodectTwoInfo);
					console.log("编辑",info)
					this.$http.put("/api/storeService",info)
					.then((resp)=>{
						self.procedureStatus = 3;
					})
					.catch((error)=>{

					})
				}else{//新增
					let info = Object.assign({}, this.prodectOneInfo, this.prodectTwoInfo);
					this.$http.post("/api/addStoreService",info)
					.then((resp)=>{
						self.procedureStatus = 3;
					})
					.catch((error)=>{

					})
				}
			},
			infoOne(){//获取第一步数据
				this.$http.get('/api/storeService',{params: {service_id: this.$route.params.id}})
				.then((resp)=>{
					console.log(resp)
					// 第一步资料
					this.prodectOneInfo = {
						first_category:resp.data.first_category,
						second_category:resp.data.second_category,
						third_category:resp.data.third_category,
					}
					console.log(this.prodectOneInfo,8888)
				})
				.catch((error)=>{

				})
			}
		},
		mounted(){
			if(this.$route.params.id){//如果有id则是编辑
				this.infoOne();
			}
		},
		watch: {
		}
	}
</script>

<style lang="less" >
.procedure{padding-top:80px;
	.procedure_heade{width:450px;margin:0 auto;
		>div{width:150px;text-align:center;position: relative;
			&:after{content:'';width:60px;height:1px;background-color:#dfe2e5;position: absolute;top: 15px;}
		}
		p{width:30px;height:30px;font-size:14px;border-radius:100%;color:#fff;background-color:#dfe2e5;text-align:center;line-height:30px;margin:0 auto;}
		span{font-size:14px;color:#A8AFB5;display:inline-block;}
		div.procedure_state{
			p,&:after,&:before{background-color:#479CFF;}
			span{color:#479CFF;}
		}
		.procedure01{
			&:after{left:90px;}
		}
		.procedure02{
			&:before{content:'';width:60px;height:1px;background-color:#dfe2e5;position: absolute;top: 15px;left:0;}
			&:after{left:90px;}
		}
		.procedure03{
			&:after{right:90px;}
		}
	}
}
</style>