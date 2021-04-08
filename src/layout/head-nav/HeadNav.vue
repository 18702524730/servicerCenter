<template>
  <header class="head-nav">
    <div class="fl">
    	<a class="logo" :href="indexUrl" v-if="showTool">商家中心</a>
    	<a class="logo" v-if="!showTool">商家中心</a>
    </div>
    <div class="fr rightCol">
	    <div class="menu_wrap">
	    	<ul class="menu">
	    		<!--<li>消息</li>-->
	    		<template v-if="showTool">
		    		<router-link tag="li" to="/other/rule/list">规则</router-link>
		    		<router-link tag="li" to="/other/notice/list">公告</router-link>
		    		<li class="tools" @mouseover="noticeDrop=true" @mouseout="noticeDrop=false">工具
			    		<div v-show="noticeDrop" class="noticeDropdown">
			    			<ul>
			    				<li><a target="_blank" href="http://wsjs.saic.gov.cn/">商标查询</a></li>
			    				<li><a target="_blank" href="http://sbgg.saic.gov.cn:9080/tmann/annInfoView/homePage.html">商标公告</a></li>
			    				<li><a target="_blank" href="#/nickClass/recommendNice">尼斯推荐</a></li>
			    			</ul>
			    		</div>
		    		</li>
	    		</template>
	    		<li><a :href="wwwUrl" target="_blank">拾贝首页</a></li>
	    	</ul>
	    </div>
	    <div class="fr userinfo" @click="visible2=true">
	    	<span class='username'>
	    		<a href="#/setting/sellerManage/basicInfo">{{userinfo.nickName || userinfo.name}}</a>
	      </span>
		    <el-tooltip placement="bottom-end" class="userinfo-popover">
		    	<div slot="content" class="userinfo_pop">
			      <h3>{{userinfo.sp_name}}</h3>
			      <p>{{userinfo.spType == 2 ? '个人商家' : '机构商家'}}</p>
			      <span class="logout" @click='logout'>退出 <i class="fa fa-sign-out logout"></i></span>
		      </div>
		      <a class="photo" href="#/setting/sellerManage/basicInfo"><img :src="avatar"></a>
		    </el-tooltip>
	    </div>
    </div>
  </header>
</template>

<script>
	//import HeadNavJs from './HeadNav.js';
	const indexUrl = CONFIG.indexUrl;
	const userUrl = CONFIG.userUrl;
	const wwwUrl = CONFIG.wwwUrl;
	const serviceInfoUrl = './api/service_info';  //查询商家信息

	import photo from 'assets/img/index/photo.png';
	import VueCookie from 'vue-cookie'
	import {store} from 'utils/';
	export default {
    name: 'head-nav',
    data() {
      return {
      	indexUrl: indexUrl,
      	wwwUrl: wwwUrl,
      	toolsUrl: CONFIG.toolsUrl,
      	userinfo: {},
      	noticeDrop:false,
      	showTool: true,  //展示规则工具等顶部导航
      }
    },
    mounted() {
    	this.userinfo = store.get('userinfo');
    	this.defaultCheckFn();  //默认查询入驻资格等商家信息
      // this.setDialogInfo('access');
      // this.onGetSetting();
    },
    computed: {
		  avatar () {
		    return this.$store.state.user.avatar || photo;
		  }
		},
    methods: {
			defaultCheckFn (){
				let phone = VueCookie.get('phone');
				this.$http.get(`${userUrl}/api/member/phone/${phone}/exists`)
				.then( (resp) => {
					let data = resp.data;
					if (data.invitedAccepted) {   //子账号
						this.search();  //判断账户是否被禁用
					}
					else{  //主账号
						// 已经成功入驻，直接跳转商家中心首页
						if (data.spExists && data.applyExist) {
							console.log('已经成功入驻')
							this.search();  //查看是否将入驻资料填写完成
							return
						}
						if (data.applyExist && !data.spExists) {
							console.log('您提交的商家入驻申请正在审核中，请耐心等待。')
							this.$router.replace({path: '/noPermission', query:{status: 2}});  //没权限页面
							return
						}
						if (!data.applyExist && !data.spExists) {
							console.log('您还未入驻成为拾贝商家！')
							this.$router.replace({path: '/noPermission', query:{status: 1}});  //没权限页面
							return
						}
					}
				})
			},
    	search () {
				this.$http.get(serviceInfoUrl)
				.then((resp) => {
					console.log(resp)
					this.basicInfo = resp.data;
					if (this.basicInfo.state == 1) {   //账户没被禁用
						if (this.basicInfo.basicStatus === 1 && this.basicInfo.nameStatus === 3 && this.basicInfo.rangeContent) {
							this.showTool = true;  //展示
						}
						else{
							this.showTool = false;  //不展示
							this.$router.replace({name: 'welcome'});  //填写资料页面
						}
					}
					else if (this.basicInfo.state == 2) {   //账户被禁用
						this.$router.replace({path: '/noPermission', query:{status: 3}});  //没权限页面（账户被禁用）
					}
				})
				.catch((err) => {
					console.log(err.data.msg);
				});
			},
      /**
       * 退出登录
       */
      logout() {
        /*this.$confirm('你确定退出登录么?', '确认退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        });*/
        this.$http.put('./api/logout?access_token=' + VueCookie.get('service_token'))
        .then(() => {
        	this.$store.dispatch('remove_userinfo').then(() => {//去统一登录页面
						// 本地环境
						if (location.host.indexOf('localhost') === 0 || /^\d{1,3}\.[^]*/.test(location.host)) {
							location.href = 'http://localhost:9002/iprp_portal/iprp/#/access/login?return_url=' + decodeURIComponent(location.href);
						}
						else{
							location.href = userUrl+'/iprp/#/access/login?return_url=' + decodeURIComponent(location.href);
						}
	        });
        })
        .catch(() => {
        });
      },



      /**
       * 获取系统设置信息
       */
      onGetSetting() {
        //获取系统设置信息
        if (this.$store.state.user.userinfo.pid == 0) {
          this.$$api_system_getSetting({
            fn:data=>{
							if (data.setting_info.disabled_update_pass) {
								data.setting_info.disabled_update_pass = data.setting_info.disabled_update_pass.split(',');
							} else {
								data.setting_info.disabled_update_pass = [];
							}
							data.setting_info.login_style = data.setting_info.login_style + '';

							this.dialog.set_info = data.setting_info;
            }
          });
        } else {
           this.$message.error('只有管理员才能操作！');
        }
      },

      /**
       * 修改系统设置信息
       */
      onUpdateSetting() {
        // console.log(this.dialog.set_info.login_style);
        // console.log(this.dialog.set_info.disabled_update_pass);
        // console.log(this.dialog.set_info.id);

        this.$$api_system_updateSetting({
          data:{
						id: this.dialog.set_info.id,
						login_style: this.dialog.set_info.login_style,
						disabled_update_pass: this.dialog.set_info.disabled_update_pass && this.dialog.set_info.disabled_update_pass.length ? this.dialog.set_info.disabled_update_pass.join(',') : ''
	        },
	        fn:data=>{
						this.dialog.show_set = false;
	        }
        });
      }
    }
	}
</script>

<style lang='less'>
	.head-nav{
		position: fixed;top:0; left:0; height: 50px;width: 100%;z-index: 2050;
		background-color: #2B7FEE;background-image: linear-gradient(90deg, #2B7FEE 2%, #00ACF5 100%);
    .logo {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      width: 240px;
      padding-left: 140px;
      font-size: 16px;
      color: #fff;
      background: transparent url(~assets/img/layout/logo.png) 30px center no-repeat;
      &:hover{text-decoration: none;};
    }
    .rightCol{
    	position: relative;
	    .menu_wrap{
	    	position: absolute;right: 240px;top:0;width: 700px;
	    	height: 50px;
	      ul.menu{
	      	float: right;
	      	.noticeDropdown{
	      		position: absolute;background-color: #fff;color: #000;width: 90px;border: 1px solid #DFE2E5;box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);border-radius: 2px;opacity:1;border-top-left-radius: 0;border-top-right-radius: 0;
		      	li{font-size: 13px;height: 30px;line-height: 30px;color: #556677;
		      	a:hover{text-decoration: none;color: #556677;}}
		      	li:hover{cursor: pointer;background-color: #f5f5f5;}
	      	}
	      }
	      ul.menu>li{position: relative; float: left;height: 50px;line-height: 50px;color: #DDF1FF;font-size: 16px;width: 90px;text-align: center;}
	      ul.menu>li:hover, ul.menu>li.router-link-active{cursor: pointer;background-color: #2EACFF;color:#fff;}
	      ul.menu>li.tools:hover{cursor: default;}
	      ul.menu>li>a{position: relative; float: left;height: 50px;line-height: 50px;color: #DDF1FF;font-size: 16px;width: 90px;text-align: center; text-decoration: none;}
	    }
	    .userinfo{
	    	height: 50px;line-height: 36px;min-width: 125px;text-align: right;
	    	padding-top: 8px;padding-right: 30px;color: #fff;
	    	.username{display: inline-block;font-size: 14px;padding-right: 4px;vertical-align: top;
	    		a{color: #fff;text-overflow: ellipsis;display: inline-block;max-width: 150px;overflow: hidden;white-space:nowrap;}
	    		a:hover{text-decoration: none;}
	    	}
	    	.photo{
	    		display: inline-block;width: 36px;height: 36px;border-radius: 36px;vertical-align: top;
	    		img{width: 36px;height: 36px;border-radius: 36px;cursor: pointer;}
	    	}
	    }
    }
  }
  .el-tooltip__popper.is-dark{
  	background: #353C48;text-align: right;border-color: #353C48;border-radius: 2px;color: #fff;padding:7px;
  	.userinfo_pop{
	  	text-align: right;background: #353C48;min-width: 140px;
			h3{font-size: 14px;line-height: 20px;font-weight: normal;white-space:nowrap;}
			p{font-size: 12px;line-height: 18px;}
			span{
				display: inline-block;margin-top:5px;color: #478cff;cursor: pointer;
				.fa{font-size: 14px;}
			}
		}
  }
  .el-tooltip__popper[x-placement^=right] .popper__arrow,
  .el-tooltip__popper[x-placement^=right] .popper__arrow::after{border-right-color:#353C48;}
</style>
