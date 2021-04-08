<template>
	<div class="right_content" :style="{'width':$store.state.rightContent.width}" :class="{'right_content_toggle_close':!$store.state.rightContent.menu_flag}">
		<div class="right_content_in" id="right_content_in">
			<div class="divssion notice">
				<h4>最新公告</h4>
				<p class="txt" v-for="(info,index) in noticeList">
					<router-link :to="jumpNoticeUrl+info.id">{{info.title}}</router-link>
				</p>
				<!--<p class="txt"><a href="">8.31 关于调整服务务商商时说</a></p>
				<p class="txt"><a href="">8.31 关于调整服务务商商时说</a></p>-->
			</div>
			<div class="divssion activty">
				<h4>最新活动</h4>
				<el-carousel height="100px" arrow="never" class="img_swipe">
		        <el-carousel-item v-for="item in activityList.length" :key="item" v-if="item">
		        <router-link :to="jumpAcyivityUrl+activityList[item-1].id"><img :src="activityList[item-1].imgUrl" :key="activityList[item-1].id" width="180" height="100"></router-link>
		      </el-carousel-item>
		    </el-carousel>
				<!-- <img class="actimg" src="http://sebe360test.oss-cn-beijing.aliyuncs.com/B6D57E3A24A407100265911B94032EB0.jpg" width="180" height="100"> -->
				<el-popover
				  ref="wechatsp"
				  placement="left"
				  width="270"
				  trigger="hover">
					<div class="assistant">
						<img src="../../assets/img/layout/assistant.png" width="90" height="90" alt="">
						<p>微信扫描左侧二维码<br>打开推单助手小程序</p>
					</div>
				</el-popover>
				<div v-popover:wechatsp class="weixin assistants">
					<img src="../../assets/img/layout/plane.png">
					<h4>推单助手</h4>
					<p>你的促单好帮手</p>
				</div>
				<div class="att">
					<router-link :to="jumpProductUrl + myId"><img src="../../assets/img/layout/att.png"></router-link>
				</div>
				<el-popover
				  ref="wechatsp"
				  placement="left"
				  width="270"
				  trigger="hover">
					<div class="sebesp">
						<img src="../../assets/img/layout/wechatSp.png" alt="">
						<p>微信扫描左侧二维码<br>关注“拾贝服务商”<br>或搜索微信号：<span>sebesp</span></p>
					</div>
				</el-popover>
				<div v-popover:wechatsp class="weixin mb5">
					<img src="../../assets/img/layout/GroupLogo.png">
					<h4>微信接单</h4>
					<p>微信号：sebesp</p>
				</div>
				<div class="att" style="height:100px;">
					<a href="https://sebe360test.oss-cn-beijing.aliyuncs.com/ChromeSetup.exe"><img src="../../assets/img/nice/downExplorer.png"></a>
				</div>

				<!-- <img class="actimg" src="../../assets/img/rightwx.png" width="180" height="74"> -->
			</div>
			<div class="divssion publish">
				<h4>产品发布</h4>
				<p class="txt" v-for="(info,index) in productList">
					<router-link :to="jumpProductUrl+info.id">{{info.title}}</router-link>
				</p>
				<!--<p class="txt"><a href="">8.31 关于调整服务务商商时说</a></p>
				<p class="txt"><a href="">8.31 关于调整服务务商商时说</a></p>-->
			</div>
			<div class="divssion help" v-if="false">
				<h4>帮助与服务</h4>
				<el-popover
				  ref="spwechat"
				  placement="left"
				  width="270"
				  trigger="hover">
					<div class="spsebe">
						<img src="../../assets/img/layout/wechatCode.jpg" alt="">
						<p>微信联系产品经理<br>帮助我们不断完善产品</p>
					</div>
				</el-popover>
				<div class="box" v-popover:spwechat>
					<img src="~assets/img/layout/photo.png" width="54" height="54">
					<div>
						<h5>产品经理三月</h5>
						<p>有问题请联系我</p>
					</div>
				</div>
			</div>
			<div class="divssion clearfix feedback">
				<h4>意见反馈</h4>
				<textarea class="box_area" v-model="feedbackContent" maxlength="200" placeholder="欢迎来吐槽，帮我们一起优化产品！" autocomplete="off"></textarea>
				<div class="err_tip">{{err_tip}}</div>
				<button @click="feedback">提交</button>
			</div>
		</div>
		<div class="toggle-menu" :style="{top:vHeight/2+'px', right:$store.state.rightContent.width.slice(0, -2)+'px'}" :class="{'toggle-menu-close':!$store.state.rightContent.menu_flag}" @click="toggle" ref="rToggleMenu"></div>
	</div>
</template>

<script>
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
	const feedbackUrl = './api/feedback';
	const indexUrl=CONFIG.otherUrl;
	const contentListUrl = '/cms/api/directive/contentList';
	export default {
		name: 'left-menu',
    data() {
      return {
      	myId:'',
      	err_tip:'',
      	vHeight:700,
      	feedbackContent:'',
      	isSubmited: false,
      	noticeList:[],
      	activityList:[],
      	productList:[],
      	jumpNoticeUrl:'/other/notice/detail/',
      	jumpAcyivityUrl:'/other/activity/detail/',
      	jumpProductUrl:'/other/product/detail/',
      }
    },
    methods: {
    	getMyId(){
    		this.$http.get(indexUrl+contentListUrl+"?categoryIds=27&pageIndex=1&count=3").then((resp) => {
	    		var jsonData = resp.data.page;
	    		this.myId = jsonData.list[0].id;
	    	}).catch((error) => {
	        console.log(error);
	      });
    	},
    	feedback(){
    		var isSubmited = this.isSubmited;
    		this.err_tip = '';
    		if (isSubmited) {return;}
    		if (!this.feedbackContent) {
    			this.err_tip = '意见不能为空'
    			return;
    		}
    		this.isSubmited = true;
    		this.axios.post(feedbackUrl, {
    			feedbackContent: this.feedbackContent
    		})
      	.then((resp) => {
      		this.isSubmited = false;
      		this.feedbackContent = '';
      		this.$message.success('提交成功！')
      	})
      	.catch((err) => {
      		this.isSubmited = false;
      		if (err && err.msg) {
						this.$message.error(err.msg);
					}
      	});
    	},
      toggle() {

    	console.log(this.$store.state.rightContent.width)

        this.$store.dispatch(this.$store.state.rightContent.menu_flag ? 'set_r_menu_close' : 'set_r_menu_open');
      },
      getNotice(){
      	this.$http.get(indexUrl+contentListUrl+"?categoryIds=20&pageIndex=1&count=3").then((resp) => {
	    		var jsonData = resp.data.page;
	    		this.noticeList = jsonData.list;
	    		this.$nextTick(() => {
		    		this.updateRightContentH();
		    	});
	    	}).catch((error) => {
	        console.log(error);
	      });
      },
      getActivity(){
      	this.$http.get(indexUrl+contentListUrl+"?categoryIds=21&pageIndex=1&count=3")
      	.then((resp) => {
		    	var jsonData = resp.data.page;
		    	this.activityList=[];
		    	for(var i=0;i<jsonData.list.length;i++)
		    	{
		    		var list={};
		    		list.imgUrl=indexUrl+"/cms/webfile/"+jsonData.list[i].cover;
		    		list.id=jsonData.list[i].id;
		    		this.activityList.push(list)
		    	}
		    	this.$nextTick(() => {
		    		this.updateRightContentH();
		    	});
	    	})
	    	.catch((error) => {
	        console.log(error);
	      });
      },
      getproduct(){
      	this.$http.get(indexUrl+contentListUrl+"?categoryIds=22&pageIndex=1&count=3").then((resp) => {
	    		var jsonData = resp.data.page;
	    		this.productList = jsonData.list;
	    	}).catch((error) => {
	        console.log(error);
	      });
      },
      updateRightContentH(){
      	setTimeout(() => {
	      	this.$store.commit('UPDATE_RIGHT_CONTENT_H', document.getElementById('right_content_in').offsetHeight);
	      }, 500);
      }
    },
    mounted(){
      this.getNotice();
  		this.getproduct();
	  	this.getActivity();
	  	this.getMyId();
    	var self = this;
    	this.vHeight = window.innerHeight;
    	var closeMenu = function(){
    		if (window.innerWidth < 1300) {
    			self.$store.dispatch('set_r_menu_close');
    			self.$refs.rToggleMenu.style.position = 'absolute';
    			self.$refs.rToggleMenu.style.marginTop = '-60px';
    		}else{
    			self.$refs.rToggleMenu.style.position = 'fixed';
    			self.$refs.rToggleMenu.style.marginTop = '0';
    		}
    	}
    	closeMenu();
    	window.addEventListener('resize', function(e){
			setTimeout(()=>{
				closeMenu();
			},50)
    		// closeMenu();
    	});
    	setTimeout(function(){
				FauxPlaceholder();
			},300)
    }
	};
</script>

<style lang='less'>
.right_content{
	padding:0 30px;border-left: 1px solid #EAECF1;vertical-align: top;color: #567;
	.divssion{//公用
		width: 180px;padding: 20px 0 22px;color: #567;border-bottom: 1px dotted #DFE2E5;
		h4{height: 20px;line-height: 20px;margin-bottom: 10px;padding-left: 25px;}
		img.actimg{
			margin-bottom: 10px;border-radius: 2px;
			&:last-child{margin-bottom: 0;}
		}
		p.txt{
			height: 17px;line-height: 17px;margin-bottom: 5px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
			&:last-child{margin-bottom: 0;}
			a{color: #567;text-decoration:none;}
			a:hover{color:#479cff;}
		}

		.box{position: relative;background: #F5F6F9;border: 1px solid #DFE2E5;border-radius: 2px;padding: 10px;}
	}
	.divssion:last-child{
		border-bottom: 0
	}
	.notice{
		h4{background: transparent url(~assets/img/layout/notice.png) 0 center no-repeat;}
	}
	.activty{
		h4{background: transparent url(~assets/img/layout/activty.png) 0 center no-repeat;}
		.img_swipe{
			margin-bottom: 5px;border-radius: 2px;
			.el-carousel__button{width: 8px;height: 8px;border-radius: 4px;}
		}
		.weixin{
			background-color: #439320;background-image: linear-gradient(-180deg, #439320 0%, #5EA641 100%);border-radius: 2px;width: 180px;height: 74px;padding:10px;position: relative;
			img{width: 46px;height: 46px;margin-top: 4px;margin-left: 4px;}
			h4{position: absolute;left: 74px;top: 15px;font-size: 14px;color: #FFFFFF;line-height: 20px;background: none;padding-left: 0;font-weight: normal;}
			p{position: absolute;left: 74px;top: 40px;font-size: 13px;color: #FFFFFF;line-height: 18px;}
		}
		.assistants{
			background-color: #0096FF;background-image: linear-gradient(147deg, #0096FF 0%, #198AFA 53%, #198AFA 53%, #198AFA 53%, #2F80F6 100%);margin-bottom: 5px;
		}
		.att{
			width: 180px;height: 74px;margin-bottom: 5px;
			img{border-radius: 2px;width:180px;}
		}
	}
	.publish{
		h4{background: transparent url(~assets/img/layout/publish.png) 0 center no-repeat;}
	}
	.feedback{
		position: relative;
		h4{background: transparent url(~assets/img/layout/feedback.png) 0 center no-repeat;}
		.err_tip{color: #ff4949;}
		button{float: right;width: 60px;height: 24px;margin-top:10px;color: #fff;background-color: #fff;background: #479CFF;border-radius: 2px;}
		button:hover{border-color: #387CCC;background-color: #387CCC;}
		.box_area{width: 180px;height: 58px;background: #F5F6F9;border: 1px solid #DFE2E5;border-radius: 2px;padding: 10px;resize: none;overflow-y: auto;}
		.placeholder{position: absolute; top: 58px;left: 10px;width: 160px;}
	}
	.help{
		h4{background: transparent url(~assets/img/layout/help.png) 0 center no-repeat;}
		.box{
			img{display: block;border-radius: 50%;}
			div{
				position: absolute; left:74px;top: 14px;
				h5{font-size: 14px;height: 20px;line-height: 20px;margin-bottom:4px;}
			}
		}
	}
	.toggle-menu {
		position: fixed;z-index: 9001;
		width: 16px;
		height: 50px;
		cursor: pointer;
		line-height: 50px;
		text-align: center;
		color: #DFE2E5;
		background: #F9F9F9 url(~assets/img/layout/toright.png) center center no-repeat;
		border: 1px solid #DFE2E5;
		border-radius: 4px 0 0 4px;
		border-right:0;
		opacity: 0.6;
		transition: opacity .3s ease-out;
		&:hover {
		  opacity: 1;
		  background-color: #fff;
		}
	}
	.toggle-menu-close{
		margin-right: 14px;
		background-image: url(~assets/img/layout/toleft.png);
		border-radius: 4px 0 0 4px;
	}
}
.right_content_toggle_close{
	padding:0;padding-left: 19px;
	.right_content_in{overflow: hidden;width: 0;}
}
.assistant{font-size:0;
	p{display:inline-block;width:140px;font-size: 13px;color: #7F8FA4;line-height:18px;vertical-align: top;margin-top: 26px;margin-left: 10px;
		span{font-size: 13px;color: #479CFF;}
	}
}
.sebesp{font-size:0;
	p{display:inline-block;width:140px;font-size: 13px;color: #7F8FA4;line-height:18px;vertical-align: top;margin-top: 18px;margin-left: 10px;
		span{font-size: 13px;color: #479CFF;}
	}
}
.spsebe{font-size:0;
	p{display:inline-block;width:140px;font-size: 13px;color: #7F8FA4;line-height:18px;vertical-align: top;margin-top: 27px;margin-left: 10px;}
}
</style>
