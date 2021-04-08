<template>
	<div class="left" :style="{'width':$store.getters.leftMenuWidth}" id='admin-left'>
		<!-- 一级菜单 -->
		<div class="fl main_menu" :class="{'main_menu_open':$store.state.leftmenu.menu_flag}" :style="{'width':$store.state.leftmenu.mainMenuW}">
			<div class="toggle-menu" @click="toggleMmenu"></div>
			<ul class="main_menu_in">
				<li v-for="(route,index) in menusData" v-if='route.isAllowed' :class="classObj(route,index)" @click="changeMainMenu(route)" :key="index">
					<el-tooltip :disabled="$store.state.leftmenu.menu_flag" :content="route.name" placement="right" class="menu-popover">
			      <span class="preholder"></span>
			    </el-tooltip>
			    <span class="name">{{route.name}}</span>
				</li>
				 <!-- :class="{cur:$route.matched.length && $route.matched[0].path===route.path}" -->
			</ul>
			<el-popover placement="right" width="54" height="30" trigger="hover" content="概况"></el-popover>
		</div>
		<!-- 二级和三级菜单 -->
		<div class="fl child_menu" v-if="cMenusData.length">
			<template v-if='isServiceModule'>
				<div v-if="sebePlatform" class="channelName">拾贝网平台<img class="ml5" src="~assets/img/nice/logoSebe.png" alt=""></div>
				<div class="child_menu_list" v-for="(route,index) in cMenusData" v-if='route.isAllowed && index < (cMenusData.length-2)' :key="index">
					<h3>{{route.name}}</h3>
					<ul class="child_menu_ul" v-if="route.children">
						<li v-for="(r, idx) in route.children" v-if="r.isAllowed&&r.name != '已提交待确认'" :class="{cur: activeIndex===(index+':'+idx)}" @click="navTo(r)" :key="idx">
							<div v-if="r.name == '待付款'">{{r.name}}<span>{{$store.state.leftmenu.statistics_data.waitpay|statisticsFormat}}</span></div>
							<div v-else-if="r.name == '待接单'">{{r.name}}<span>{{$store.state.leftmenu.statistics_data.waitserver|statisticsFormat}}</span></div>
							<div v-else-if="r.name == '已接单待提交'">{{r.name}}<span>{{$store.state.leftmenu.statistics_data.waitsumbit|statisticsFormat}}</span></div>
							<!-- <div v-else-if="r.name == '已提交待确认'">{{r.name}}111<span>{{$store.state.leftmenu.statistics_data.waitconfirm|statisticsFormat}}</span></div> -->
							<div v-else-if="r.name == '加项待付款'">{{r.name}}<span>{{$store.state.leftmenu.statistics_data.confirmedwaitpay|statisticsFormat}}</span></div>
							<div v-else>{{r.name}}</div>
						</li>
					</ul>
				</div>
				<div class="channelName" v-if='hasCXB'>创新保平台<img class="ml5" src="~assets/img/cxb/alibaba.png" alt=""></div>
				<div class="child_menu_list" v-for="(route,index) in cMenusData" v-if='hasCXB && route.isAllowed && index == (cMenusData.length-2)' :key="route.name">
					<h3>{{route.name}}</h3>
					<ul class="child_menu_ul" v-if="route.children">
						<li v-for="(r, idx) in route.children" v-if='r.isAllowed' :class="{cur: activeIndex===(index+':'+idx)}" @click="navTo(r)" :key="idx">
							<div v-if="r.name == '待付款'">{{r.name}}<span>{{$store.state.leftmenu.cxbstatistics_data && $store.state.leftmenu.cxbstatistics_data.cxbwaitpay|statisticsFormat}}</span></div>
							<div v-else-if="r.name == '待反馈'">{{r.name}}<span>{{$store.state.leftmenu.cxbstatistics_data && $store.state.leftmenu.cxbstatistics_data.cxbwaitthrough|statisticsFormat}}</span></div>
							<div v-else-if="r.name == '待上报'">{{r.name}}<span>{{$store.state.leftmenu.cxbstatistics_data && $store.state.leftmenu.cxbstatistics_data.cxbwaitreport|statisticsFormat}}</span></div>
							<div v-else>{{r.name}}</div>
						</li>
					</ul>
				</div>
				<div class="channelName" v-if='enableChannelOrder'>渠道</div>
				<div class="child_menu_list" v-for="(route,index) in cMenusData" v-if='enableChannelOrder && route.isAllowed && index == (cMenusData.length-1)' :key="route.name">
					<h3>{{route.name}}</h3>
					<ul class="child_menu_ul" v-if="route.children">
						<li v-for="(r, idx) in route.children" v-if='r.isAllowed' :class="{cur: activeIndex===(index+':'+idx)}" @click="navTo(r)" :key="idx"> 
						<div v-if="r.name == '待付款'">{{r.name}}<span>{{$store.state.leftmenu.cxbstatistics_data && $store.state.leftmenu.cxbstatistics_data.cxbwaitpay|statisticsFormat}}</span></div>
						<div v-else>{{r.name}}</div>
						</li>
					</ul>
				</div>
			</template>
			<template v-else>
				<div class="child_menu_list" v-for="(route,index) in cMenusData" v-if='route.isAllowed' :key="index">
					<h3>{{route.name}}</h3>
					<ul class="child_menu_ul" v-if="route.children">
						<li v-for="(r, idx) in route.children" v-if='r.isAllowed' :class="{cur: activeIndex===(index+':'+idx)}" @click="navTo(r)" :key="idx">
							<div>
								{{r.name}}
								<i v-if="r.name == '资质认证'&& $store.state.leftmenu.statistics_real && $store.state.leftmenu.statistics_real.qualification"></i>
							</div>
						</li>
					</ul>
				</div>
			</template>
		</div>
		<div v-if="cMenusData.length" class="toggle-cmenu" :class="{'toggle-cmenu-close':!$store.state.leftmenu.c_menu_flag}" @click="toggleCmenu"></div>
	</div>
</template>

<script>
	import qs from 'qs';
	import {store} from 'utils/';
	const statisticsUrl = './api/tas/orders/statistics';
	const cxbstatisticsUrl = './api/cxb/general/statistics';
	const classObject = [
		{
			name: 'index',
			path: 'index'
		},
		{
			name: 'service',
			path: 'service'
		},
		{
			name: 'client',
			path: 'client'
		},
		{
			name: 'data',
			path: 'data'
		},
		{
			name: 'trade',
			path: 'trade'
		},
		{
			name: 'goods',
			path: 'goods'
		},
		{
			name: 'shop',
			path: 'shop'
		},
		{
			name: 'property',
			path: 'property'
		},
		{
			name: 'marketing',
			path: 'marketing'
		},
		{
			name: 'setting',
			path: 'setting'
		},
		{
			name: 'dataview',
			path: 'dataview'
		}
	];
	export default {
    name: 'left-menu',
    data() {
      return {
      	sebePlatform:false,//拾贝网平台，权限
      	hasCXB: false, // 是否有创新保
      	isServiceModule: false, // 是否是服务模块
      	activeIndex: '0:0',
      	menusData: [],
      	cMenusData: [],
      	toggleMmenuSwitch: false,
        menu_list: [],
        win_size: {
          height: '',
		},
      }
    },
    computed: {
      // 渠道工单控制权限
      enableChannelOrder() {
		return !!store.get('userinfo').enableChannelOrder
	  },
	  datashow() {
		const userinfo = store.get('userinfo');
		return (!!userinfo.enableDomesticTrademark)||(!!userinfo.enableInternationalTrademark)||(!!userinfo.enableOtherTrademark)||(!!userinfo.enableCopyright)||(!!userinfo.enableTechProject)||(!!userinfo.enablePatentJudgement)||(!!userinfo.enablePatentPermit)||(!!userinfo.enableRemainCase)||(!!userinfo.enablePatentOther)||(!!userinfo.enablePatentPct)||(!!userinfo.enableTaobaoMarket)||(!!userinfo.enableACxbSp)||(!!userinfo.enableACxbSebe)||(!!userinfo.enableACxbWuzhou)||(!!userinfo.enableACxb2017)||(!!userinfo.enableACxb201808)||(!!userinfo.enableBSebe2017)||(!!userinfo.enableBSebe201808)||(!!userinfo.enableD1Other2016)||(!!userinfo.enableD1Other2017)||(!!userinfo.enableD2Offline2016)||(!!userinfo.enableD2Offline2017)||(!!userinfo.enableGChannel201808)||(!!userinfo.enableHenanSebe)||(!!userinfo.enableH1XiamenTrademark)||(!!userinfo.enableH2XiamenOther)||(!!userinfo.enableSebePatentStatistic)||(!!userinfo.enableBeijingDeclareHangzhouCase)
	  },
	  othershow(){
		const userinfo = store.get('userinfo');
		return (!!userinfo.enableTaobaoMarket)||(!!userinfo.enableACxbSp)||(!!userinfo.enableACxbSebe)||(!!userinfo.enableACxbWuzhou)||(!!userinfo.enableACxb2017)||(!!userinfo.enableACxb201808)||(!!userinfo.enableBSebe2017)||(!!userinfo.enableBSebe201808)||(!!userinfo.enableD1Other2016)||(!!userinfo.enableD1Other2017)||(!!userinfo.enableD2Offline2016)||(!!userinfo.enableD2Offline2017)||(!!userinfo.enableGChannel201808)
	  }
    },
    methods: {
    	//一级菜单切换
    	changeMainMenu(r){
      	console.log(this.cMenusData,8888888888888)
    		this.$router.push({path:r.access});
    	},
    	//获取菜单上的path配置，取？前的字符
    	getPath(r){
    		return r.access.split('?')[0];
    	},
    	//获取菜单上的path配置，取？后的query参数
    	getPathQuery(r){
    		var path = r.path;
    		var idx = path.indexOf('?');
    		var queryObj = {}
    		if (idx !== -1) {
    			queryObj = qs.parse(path.slice(idx+1))
    		}else{
    			queryObj = '';
    		}
    		return queryObj;
    	},
    	//是否是空对象
    	isEmptyObject(o) {
		    for (var p in o) {
	        if (p !== undefined) {
	          return false;
	        }
		    }
		    return true;
			},
			//一级菜单html结构上的class类名
    	classObj: function (route,index) {
		  	var ret = {};
		  	ret.cur = this.$route.matched.length && this.$route.matched[0].path === route.path;
		  	var path = route.path.slice(1);

		  	var idx = 0;
		  	classObject.forEach((item, i) => {
		  		if (item.path == path) {
		  			idx = i;
		  			return false;
		  		}
		  	})
		  	ret[classObject[idx]['name']] = true;
		    return ret;
		  },
		  //三级菜单点击路由跳转
		  navTo(r){
			  console.log(r)
			  if(r.path=='/datatonice'){
				this.$router.push({path:'/service/channelService/recommendNice'});
			  }else if(r.path=='/datatoall'){
				this.$router.push({path:'/service/channelService/list'});
			  }else{
				  this.$router.push({path:this.getPath(r), query: this.getPathQuery(r)});
			  }
		  	
		  },
		  //匹配路由，高亮左侧导航菜单
      matchRoute(){
      	var self = this;
        var route = this.$route;
        var path = route.path;
        var query = route.query;
        var cMenusData = this.cMenusData;
    		cMenusData.forEach((item, i) => {
    			if (route.matched[0].path + item.path == route.matched[1].path) {
	    			var c = item.children;
	    			for (var j = c.length - 1; j >= 0; j--) {
						var queryObj = self.getPathQuery(c[j]);
	    				if (queryObj) {
							
		    				var ret = true;
								for (var p in queryObj) {
					        if (queryObj.hasOwnProperty(p)) {
					        	if (queryObj[p] != query[p]) {
					        		ret = false;
					        		break;
					        	}
					        }
						    }
						    if (ret) {
						    	self.activeIndex = i+':'+j;
						    	break;
							}
							
						  }else{
						  	if (route.matched[2].path == c[j].access) {
						  		self.activeIndex = i+':'+j;
						    	break;
						  	}
						  }
		    		}
	    		}
    		});
      },
      //设置视窗大小
      setSize() {
        this.win_size.height = this.$$lib_$(window).height() + "px";
      },
      //一级菜单展开和收缩
      toggleMmenu() {
        this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open');
      },
      //二三级菜单展开和收缩
      toggleCmenu() {
        this.$store.dispatch(this.$store.state.leftmenu.c_menu_flag ? 'set_c_menu_close' : 'set_c_menu_open');
      },
      //暂时无用
      updateCurMenu(route) {
        var route = route || this.$route;
        if (route.matched.length) {
          var rootPath = route.matched[0].path,
            fullPath = route.path;
          this.$store.dispatch('set_cur_route', {
            rootPath,
            fullPath
          });
          var routes = this.$router.options.routes;
          for (var i = 0; i < routes.length; i++) {
            if (routes[i].path === rootPath && !routes[i].hidden) {
              this.menu_list = routes[i].children;
              break;
            }
          }
        } else {
          this.$router.push('/404');
        }
      },
      //更新三级菜单上的统计数据
      updateMenuNum(){
      	this.$http.get(statisticsUrl + '?t=' + new Date().getTime())
      	.then((resp) => {
      		var data = resp.data;
      		this.$store.commit('SET_STATISTICS_DATA', data);
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      	this.$http.get(cxbstatisticsUrl + '?t=' + new Date().getTime())
      	.then((resp) => {
      		var data = resp.data;
      		this.$store.commit('SET_CXBSTATISTICS_DATA', data);
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
      // 初始化组装路由,只返回有权限的菜单和路由
			initRouters(){
				var routes = this.$router.options.routes;
				var permission = store.get('permission');
				var userinfo = store.get('userinfo');
				var arr = [];

				for (var i = 0; i < routes.length; i++) {
					if (routes[i].hidden !== true) {
						var tempObj      = {},
							module       = routes[i],
							menus        = module.children || [];
						tempObj.name     = module.meta.name;
						tempObj.path     = module.path;
						tempObj.access   = module.path;
						tempObj.isAllowed = module.meta.permission === 'true' || permission.indexOf(module.meta.permission) !== -1;
						if(tempObj.path=='/dataview'){
							tempObj.isAllowed = this.datashow
						}
						tempObj.children = [];
						if(tempObj.isAllowed){
							for (var j = 0; j < menus.length; j++) {
								if (menus[j].hidden !== true && menus[j].children && menus[j].children.length) {
									var tempChildObj      = {},
										menu              = menus[j],
										pages             = menu.children;
									tempChildObj.name     = menu.meta.name;
									tempChildObj.path     = '/' + menu.path;
									tempChildObj.access   = tempObj.path + '/' + menu.path;
									tempChildObj.isAllowed = menu.meta.permission === 'true' || permission.indexOf(menu.meta.permission) !== -1;
									tempChildObj.children = [];
									if(tempObj.path=='/dataview'){
										if(tempChildObj.path=='/tradedata'){
											tempChildObj.isAllowed=(!!userinfo.enableDomesticTrademark)||(!!userinfo.enableInternationalTrademark)||(!!userinfo.enableOtherTrademark)
										}
										if(tempChildObj.path=='/cservice'){
											tempChildObj.isAllowed = !!userinfo.enableCopyright
										}
										if(tempChildObj.path=='/techdata'){
											tempChildObj.isAllowed = !!userinfo.enableTechProject
										}
										if(tempChildObj.path=='/pdata'){
											tempChildObj.isAllowed = !!userinfo.enablePatentJudgement
										}
										if(tempChildObj.path=='/patentdata'){
											tempChildObj.isAllowed = !!userinfo.enablePatentPermit
										}

										if(tempChildObj.path=='/zhuanli'){
											tempChildObj.isAllowed=(!!userinfo.enablePatentOther)||(!!userinfo.enablePatentPct)||(!!userinfo.enableRemainCase)
										}
										if(tempChildObj.path=='/otherscase'){
											tempChildObj.isAllowed= this.othershow
										}
										if(tempChildObj.path=='/henansebe'){
											tempChildObj.isAllowed = !!userinfo.enableHenanSebe
										}
										if(tempChildObj.path=='/xiamensebe'){
											tempChildObj.isAllowed = (!!userinfo.enableH1XiamenTrademark) ||(!!userinfo.enableH2XiamenOther)
										}
										if(tempChildObj.path=='/huazhong'){
											tempChildObj.isAllowed = !!userinfo.enableSebePatentStatistic
										}
										if(tempChildObj.path=='/beijing'){
											tempChildObj.isAllowed = !!userinfo.enableBeijingDeclareHangzhouCase
										}
									}
									if(tempChildObj.isAllowed){
										for (var k = 0; k < pages.length; k++) {
											if (pages[k].hidden !== true) {
												var tempPageObj    = {},
													page           = pages[k];
												tempPageObj.name   = page.meta.name;
												tempPageObj.path   = '/' + page.path;
												tempPageObj.access = tempObj.path + '/' + menu.path + '/' + page.path;
												tempPageObj.isAllowed = page.meta.permission === 'true' || permission.indexOf(page.meta.permission) !== -1;
												if(tempObj.path=='/dataview'){
													if(tempPageObj.path=='/tmlist'){
														let isshow = userinfo.enableDomesticTrademark
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/interlist'){
														let isshow = userinfo.enableInternationalTrademark
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/otherlist'){
														let isshow = userinfo.enableOtherTrademark
														tempPageObj.isAllowed=!!isshow
													}

													if(tempPageObj.path=='/taobaolist'){
														let isshow = userinfo.enableTaobaoMarket
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/acxblist'){
														let isshow = userinfo.enableACxb201808
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/acxblists'){
														let isshow = userinfo.enableACxb2017
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/acxbsebelist'){
														let isshow = userinfo.enableACxbSebe
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/acxbfwlist'){
														let isshow = userinfo.enableACxbSp
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/acxbwzlist'){
														let isshow = userinfo.enableACxbWuzhou
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/bsebelist'){
														let isshow = userinfo.enableBSebe201808
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/bsebelistx'){
														let isshow = userinfo.enableBSebe2017
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/cqudaolist'){
														let isshow = userinfo.enableGChannel201808
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/dofflinelist'){
														let isshow = userinfo.enableD2Offline2017
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/dofflinelistx'){
														let isshow = userinfo.enableD2Offline2016
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/dotherlist'){
														let isshow = userinfo.enableD1Other2017
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/dotherlistx'){
														let isshow = userinfo.enableD1Other2016
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/xiamenlist'){
														let isshow = userinfo.enableH1XiamenTrademark
														tempPageObj.isAllowed=!!isshow
													}
													if(tempPageObj.path=='/xiamenlisto'){
														let isshow = userinfo.enableH2XiamenOther
														tempPageObj.isAllowed=!!isshow
													}
												
												}
													if (tempPageObj.isAllowed) {
														tempChildObj.children.push(tempPageObj);
													}
											}
										}
									}
									if (tempChildObj.isAllowed) {
										tempObj.children.push(tempChildObj);
									}
								}
							}
						}
						if (tempObj.isAllowed) {
							arr.push(tempObj);
						}
					}
				}
				//console.log('menusData', arr);
				this.menusData = [].concat(arr);
			},
			// 初始化当前一级菜单下的二级级菜单数据
			initCurMenusData(){
				this.hasCXB = false;
				this.isServiceModule = this.$route.matched[0].path === '/service';
				var menusData = this.menusData;
				menusData.forEach((item, i) => {
					if (item.path === this.$route.matched[0].path) {
						this.cMenusData = item.children;
						return false;
					}
				});
				this.cMenusData.forEach((item, i) => {
					// 控制显示权限
						if (item.path.indexOf('clientServiceCXB') !== -1 && store.get('permission').indexOf('iprp_cxb_platform') !== -1 && store.get('userinfo').is_relate_cxb ==1) {
							this.hasCXB = true;
						}
					});

				if (!this.cMenusData.length) {
					this.$store.dispatch('set_c_menu_close');
					store.set('breadHide', true);
					if(this.$route.matched[0].path!=="/other"){
						store.set('breadOther', false);
					}else{
						store.set('breadOther', true);
					}
				}else{
					if(this.$route.matched[0].path==="/other"){
						this.$store.dispatch('set_c_menu_close');
						store.set('breadOther', true);
						store.set('breadHide', false);
					}else{
						this.$store.dispatch('set_c_menu_open');
						store.set('breadOther', false);
						store.set('breadHide', false);
					}
				}
	 		},
    },
    created() {
      this.setSize();
      this.$$lib_$(window).resize(() => {
          this.setSize();
      });
      //this.updateCurMenu();
			//this.updateMenuNum();

    },
    mounted() {
    	this.sebePlatform = store.get('permission').indexOf('iprp_shibei_platform') !== -1;
      this.initRouters();
      this.initCurMenusData();
      //自动跳转到第一个菜单
      if (this.cMenusData.length && this.$route.matched.length < 3) {
	    	this.$router.replace(this.cMenusData[0].children[0].access);
	    	return;
	    }
	  this.matchRoute();
	},
		filters: {
			statisticsFormat(input){
				if (!input) {return ''}
				if (input > 99) {return '99+'}
				return input;
			}
		},
    watch: {
    	isServiceModule(){
    		if (this.isServiceModule) {
    			this.updateMenuNum();
    		}
    	},
      $route(to, from) {
	      this.initCurMenusData();
	      //约定：当路由为一级主路由时，自动切换到子集第一个三级路由; 当路由为二级主路由时，自动切换到子集第一个三级路由
	      if (this.cMenusData.length && this.$route.matched.length < 3) {
	      	let len = to.matched.length;
	      	if (len == 1) {
	      		this.$router.replace(this.cMenusData[0].children[0].access);
	      	}else if(len == 2){
      			this.cMenusData.some(item => {
      				if (item.access == to.path) {
      					this.$router.replace(item.children[0].access);
      					return true;
      				}
      			});
	      	}
		    	return;
		    }
	      this.matchRoute();
        //this.updateCurMenu(to);
      }
    }
	}
</script>

<style lang='less'>
	#admin-left{
		position: fixed;left: 0;top: 0;padding-top:50px;height: 100%;z-index: 1998;background-color: #fff;
		.main_menu{
			width: 70px;height: 100%;
			background: #223344;
			.main_menu_in{
				li:hover{background-color: #324252;}
				li{
					height: 44px;line-height: 44px;padding-left: 58px;color: #DFE2E5;font-size: 14px;cursor: pointer;position: relative;
					background: transparent url(~assets/img/layout/index.png) 26px 14px no-repeat;
					span.name{opacity: 0}
					span.preholder{position: absolute;left:0;top:0;width: 45px;height: 44px;display: inline-block;}
				}
				li.cur{background-color: #479CFF;}
				li.index{background-image: url(~assets/img/layout/index.png);}
				li.trade{background-image: url(~assets/img/layout/trade.png);}
				li.service{background-image: url(~assets/img/layout/service.png);}
				li.goods{background-image: url(~assets/img/layout/goods.png);}
				li.shop{background-image: url(~assets/img/layout/shop.png);}
				li.setting{background-image: url(~assets/img/layout/setting.png);}
				li.dataview{background-image: url(~assets/img/layout/dataview.png);}
				/* li.data{background-image: url(~assets/img/layout/Group 6.png);}
				li.property{background-image: url(~assets/img/layout/Group 7.png);}
				li.marketing{background-image: url(~assets/img/layout/Group 8.png);} */
			}
			.toggle-menu {
				width: 100%;
		    height: 30px;
		    cursor: pointer;
		    line-height: 30px;
		    text-align: center;
		    color: #fff;
		    font-size: 14px;
		    opacity: 0.4;
		    transition: opacity .3s ease-out;
		    background: transparent url(~assets/img/layout/main_m_close.png) center center no-repeat;
		    &:hover {
		      opacity: 1;
		    }
			}
		}
		.main_menu_open{
			width: 116px;
			.main_menu_in{
				li{
					span.name{opacity: 1}
				}
			}
			.toggle-menu {background: transparent url(~assets/img/layout/main_m_open.png) center center no-repeat;}
		}
		.child_menu{
			padding:20px 0;width: 160px;height: 100%;position: relative;border-right: 1px solid #EAECF1;overflow-y: auto;overflow-x: hidden;
			.channelName{height: 44px;line-height: 44px;font-size: 14px;color: #223344;background: #F5F5F5;padding-left: 20px;margin-top:-1px;}
			.channelName:first-child{margin-top:-20px;}

			.child_menu_list {
				padding:0 20px;width: 160px;

				h3{font-size: 14px;color: #223344;line-height: 20px;margin-top: 20px;font-weight: 600;}
				.child_menu_ul{
					padding-top: 15px;padding-bottom: 8px;border-bottom: 1px solid #DFE2E5;
					li{
						line-height: 18px;font-size: 13px;color: #556677;margin-bottom: 12px;cursor: pointer;
						span{margin-left: 5px;color: #f64744;}
						i{margin-left: 10px;display:inline-block;width:5px;height:5px;background-color:#F64744;border-radius:5px;margin-left: 5px;margin-top:-5px;vertical-align: middle;}
					}
					li.cur,li:hover{color: #479CFF;}
				}
			}
			.child_menu_list:last-child .child_menu_ul{border: 0;}
			
		}
		.child_menu::-webkit-scrollbar{
				width: 4px;
			}
			.child_menu::-webkit-scrollbar-thumb{
				width: 4px;
				background: #eaecf1;
			}
		.toggle-cmenu {
			position: absolute;right: -15px;top: 50%;z-index: 9001;
			width: 16px;
			height: 50px;
			cursor: pointer;
			line-height: 50px;
			text-align: center;
			color: #DFE2E5;
			background: #F9F9F9 url(~assets/img/layout/toleft.png) center center no-repeat;
			border: 1px solid #DFE2E5;
			border-radius: 0 4px 4px 0;
			border-left:0;
			opacity: 0.6;
			transition: opacity .3s ease-out;
			&:hover {
			  opacity: 1;
			  background-color: #fff;
			}
		}
		.toggle-cmenu-close{
			right: -16px;
			//background-color: #fff;
			background-image: url(~assets/img/layout/toright.png);
			border-radius: 0 4px 4px 0;
		}
	}
</style>
