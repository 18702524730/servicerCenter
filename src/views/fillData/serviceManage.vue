<template>
	<div class="service_rangge">
		<div class="content_box">
			<div class="pub_back_tit">
				<router-link class="back_box fl" to="/fillData/welcome">
	        <i class="fa fa-angle-left" aria-hidden="true"></i>
	        <span class="text" >返回</span>
	      </router-link>
	      <span class="title">填写服务范围</span>
			</div>
			<div class="s_content">
				<p class="title"><span class="red">*</span>请选择服务范围:</p>
				<div class="s_range">
					<div class="title_box">
						<span class="text level_one">一级服务类目</span>
						<span class="text level_two">二级服务类目</span>
						<span class="text level_three">三级服务类目</span>
					</div>
					<div class="list_box">
						<div class="item level_one">
							<p class="line" v-for="item in servieListOne" :class="{'active': item.active}" @click="selectStepOneFn(item)">{{ item.name }}</p>
						</div>
						<div class="item level_two">
							<p class="line" v-for="item in servieListTwo" :class="{'active': item.active}" @click="selectStepTwoFn(item)" v-if="showStepTwo">{{ item.name }}</p>
						</div>
						<div class="item level_three" >
							<el-checkbox v-for="item in servieListThree" :key="item.name" v-model="item.isSelect" class="checkbox" v-if="showStepThree" @change="selectStepThreeFn(item)">{{ item.name }}</el-checkbox>
						</div>
					</div>
				</div>
				<p class="title">已选服务:</p>
				<div class="select_list clearfix" v-if="selectList.length">
					<div class="line clearfix" v-for="(item, index_) in selectList" >
						<p class="lef">{{ item.typeOne.name }} > {{ item.typeTwo.name }} </p>
						<div class="rig rig_box">
							<p class="item" v-for="(info, index) in item.typeThree">
								<span class="text">{{ info.name }}</span>
								<span class="img" @click="deleteFn(info, index, item, index_)"></span>
							</p>
						</div>
					</div>
				</div>
				<p class="title">其它服务范围：</p>
				<el-input
				  type="textarea"
				  maxlength="200"
				  :autosize="{ minRows: 3, maxRows: 8}"
				  placeholder="您可填写除上述列表中以外的其他业务范围"
				  v-model="serviceInfo.rangeRemark"
				  >
				</el-input>
				<span class="text_num">({{ serviceInfo.rangeRemark && serviceInfo.rangeRemark.length || 0 }}/200)</span>
				<div class="cl"></div>
				<el-button size="medium" type="primary" class="submit_btn" @click="submitFn">提交</el-button>
			</div>
		</div>

	</div>
</template>

<script>
	const codeImgUrl = CONFIG.rootUrl+'/servlet/captchaCode?t=';
	const serviceUrl = CONFIG.rootUrl + '/api//product';  //查询一级服务类目
	const serviceInfoUrl = CONFIG.rootUrl + '/api/service_info';  //查询和编辑卖家信息


	import {store} from 'utils/';
	import qs from 'qs';
	export default{
		name:'wechar_bind',
		data(){
			return{
				indexUrl: CONFIG.indexUrl,
				check: true,
				servieListOne: [],  //一级服务类目
				servieListTwo: [],  //二级服务类目
				servieListThree: [],  //三级服务类目
				selectOne: {},  //选择的一级服务
				selectTwo: {},  //选择的二级服务
				showStepTwo: false,  //展示第二步
				showStepThree: false,  //展示第三步
				selectList: [], //已选服务列表
				serviceInfo: {
					rangeRemark: ''
				},  //卖家信息
			}
		},
		methods:{
			// 删除三级类目
			deleteFn (info, index, item, index_) {
				item.typeThree.splice(index, 1);
				if (!item.typeThree.length) {
					this.selectList.splice(index_, 1);
				}
				this.servieListThree.forEach( (part) => {
					if (part.id == info.id) {
						part.isSelect = false;  //取消选择
					}
				})
			},
			// 查询一级服务类目
			getServiceList () {
				this.$http.get(serviceUrl)
				.then( (resp) => {
					this.servieListOne = resp.data;
				})
			},
			// 选择一级服务
			selectStepOneFn (item) {
				this.selectOne = item;
		    this.servieListOne.forEach(function(info) {
		      info.active = false;
		    });
		    item.active = true; //高亮
		    this.showStepTwo = true; //展示第二步
		    this.showStepThree = false; //隐藏第三步
		    this.$http.get(serviceUrl, {params: {parent_id: item.id, type: 1}})
				.then( (resp) => {
					this.servieListTwo = resp.data;
				})
			},
			// 选择第二步
			selectStepTwoFn (item) {
				let self = this;
				self.selectTwo = item;
				self.servieListTwo.forEach(function(info) {
		      info.active = false;
		    });
		    item.active = true; //高亮
		    self.showStepThree = true; //展示第三步
		    self.$http.get(serviceUrl, {params: {parent_id: item.id, type: 2}})
				.then( (resp) => {
					self.servieListThree = resp.data;
					// 如果已经存在已选服务列表，高亮已选的服务列表
					if (self.selectList.length) {
						self.selectList.forEach( (item) => {
							if (item.typeOne.id == self.selectOne.id && item.typeTwo.id == self.selectTwo.id) {
								self.servieListThree.forEach( (info) => {
									item.typeThree.forEach( (obj) => {
										if(info.id == obj.id){
											info.isSelect = true;
										}
									})
								})
							}
						})
					}
				})
			},
			// 选择第三步
			selectStepThreeFn (item) {
				let self = this;
				function getIndex () {
					for (var i = 0; i < self.selectList.length; i++) {
						let info = self.selectList[i];
						if (info.typeOne.id == self.selectOne.id && info.typeTwo.id == self.selectTwo.id) {
							return i
						}
					}
					return -1
				}
				if (item.isSelect) {
					if (self.selectList.length) {
						let index_ = getIndex();
						if (index_ >= 0) {
							self.selectList[index_].typeOne = self.selectOne;
							self.selectList[index_].typeTwo = self.selectTwo;
							self.selectList[index_].typeThree.push(item);
						}
						else{
							self.selectList.push({
			          typeOne: self.selectOne,
			          typeTwo: self.selectTwo,
			          typeThree: [].concat(item)
			        });
						}
					}
					else{
						self.selectList.push({
		          typeOne: self.selectOne,
		          typeTwo: self.selectTwo,
		          typeThree: [].concat(item)
		        });
					}
				}
				else{
					let index__ = -1;
					for (var j = 0; j < self.selectList[getIndex()].typeThree.length; j++) {
						let info = self.selectList[getIndex()].typeThree[j];
						if (info.id == item.id) {
							index__ = j;
							break
						}
					}
					self.selectList[getIndex()].typeThree.splice(index__, 1);
					//第三极分类为空的时候
					if (!self.selectList[getIndex()].typeThree.length) {
		        self.selectList.splice(getIndex(), 1);
		      }
				}
				console.log(self.selectList);
			}, 
			// 查询卖家信息
			getServiceInfoUrl () {
				this.$http.get(serviceInfoUrl)
				.then( (resp) => {
					this.serviceInfo = resp.data;
					if (this.serviceInfo.rangeContent) {
						this.selectList = JSON.parse(this.serviceInfo.rangeContent);
					}
				})
			},
			// 提交
			submitFn () {
				let str_ = JSON.stringify(this.selectList);
				this.serviceInfo.rangeContent = str_;  //已选服务
				if(!this.selectList.length){
					this.$message('请选择您的服务范围');
					return;
				}
				console.log(this.selectList,'测试')
				this.$http.put(serviceInfoUrl, this.serviceInfo)
				.then ( (resp) => {
					this.$message('提交成功');
					this.$router.go(-1);  //回到确认页面
				})
			}
		},
		mounted(){
			this.getServiceList();   //查询一级服务类目
			this.getServiceInfoUrl();  //查询卖家信息
		}
	}
</script>

<style lang="less" >
	.service_rangge{
		min-height: 700px;
	  background: #fff;
	  .content_box	{
	 		width: 1080px; height: auto; margin:0 auto; padding: 90px 0 0 0;
	 		.pub_back_tit {
	 			.title {margin-left: -54px;}
	 		}
			.s_content {
				width: 900px; height: auto; padding: 40px 0 200px 0; position: relative; margin: 0 auto; left:0;
				.title {
					width: 100%; text-align: left; color: #556677; text-align: left; margin-bottom: 10px;  font-size: 14px;
					.red {color: #F64744; }
				}
				.s_range {
					width: 100%; box-sizing: border-box; border: 1px solid #DFE2E5; margin-bottom: 10px;
					.title_box {
						width: 100%; height: 40px; line-height: 40px;
						.text {background: #F9F9F9; width: 33%; display: inline-block; box-sizing:border-box; float: left; text-align: center; border-right: 1px solid #DFE2E5; border-bottom: 1px solid #DFE2E5; color: #A8AFB5; font-size: 13px;}
						.level_three {width: 34%; border-right: none;}
					}
					.list_box {
						width: 100%; height: 240px; overflow: hidden;
						.item {
							background: #fff; width: 33%; float: left; height: 100%; box-sizing:border-box; border-right: 1px solid #DFE2E5; text-align: left; overflow-y: auto; cursor: pointer;
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
						.level_three {
							width: 34%; border-right: none;
							.checkbox {line-height: 40px; padding-left: 20px; width: 100%; margin-left: 0;}
						}
					}
				}
				.select_list {
					width: 100%; border: 1px solid #DFE2E5; margin-bottom: 20px;
					.line {
						line-height: 50px; width: 100%; border-bottom: 1px solid #DFE2E5; color: #556677; background: #F9F9F9; padding-bottom: 10px;
						&:last-child {border-bottom: none;};
						.lef {width: 250px; font-size: 14px; float: left; padding-left: 20px; text-align: left;}
						.rig {
							float: left; max-width: 500px;
							.item {
								height: 30px; line-height: 30px; background-size: #fff; border-radius: 2px; text-align: center; font-size: 13px; border: 1px solid #DFE2E5; padding: 0 10px; float: left; margin-right: 10px; margin-top: 10px; cursor: pointer; background: #fff;
								.text {float: left;}
								.img {
									width: 16px; height: 16px; float: left; margin-left: 6px; margin-top: 7px; background: url('~assets/img/icon/remove.png') no-repeat;
									&:hover {background: url('~assets/img/icon/remove_active.png') no-repeat;};
								}
							}
						}
					}
				}
				.el-textarea {float: left;}
				.text_num {float: left; margin-top: 50px; margin-left: -65px; font-size: 13px; color: #999;}
				.cl {clear: both;}
				.submit_btn {margin-top: 20px;}
			}
		}
	}


</style>
