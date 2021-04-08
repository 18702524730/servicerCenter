import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import {Home, Content} from 'layout/';
//import {Login} from 'views/';
import {WecharBind} from 'views/';
import NotFound from 'views/other/notFound.vue';
import NoPermission from 'views/other/noPermission.vue';
import Invalid from 'views/other/invalid.vue';


import Marketing from './marketing/';
import Setting from './setting/';
import Trade from './trade/';
import Service from './service/';
import Goods from './goods/';
import Shop from './shop/';
import Index from './index/';
import Other from './other/';
import TmApplySubmit from './tmApplySubmit/';
import TmApplySubmitCXB from './tmApplySubmitCXB/';
import TmSubmitChannel from './tmSubmitChannel/';
import TmFeedback from './tmFeedback/';
import niceClass from './niceClass/';
import fillData from './fillData/';

import Dataview from './dataview/';


export default new Router({
	routes: [
		{
			path     : '/',
			name     : 'default',
			meta:{
				name: '默认首页',
			},
			hidden   : true,
			redirect: '/index/general',//概况页面
		},
		/*{
			path     : '/login',
			name     : 'login',
			meta:{
				name: '登录'
			},
			hidden   : true,
			component: Login
		},*/
		{
			path     : '/wecharBind',
			name     : 'wecharBind',
			meta:{
				name: '微信绑定'
			},
			hidden   : true,
			component: WecharBind
		},
		{
			path     : '/404',
			name     : 'notFound',
			meta:{
				name: '404页面'
			},
			hidden   : true,
			component: NotFound
		},
		{
			path     : '/invalid',
			name     : 'invalid',
			meta:{
				name: '登录失效'
			},
			hidden   : true,
			component: Invalid
		},
		{
			path     : '/noPermission',
			name     : 'noPermission',
			meta:{
				name: '无权限访问'
			},
			hidden   : true,
			component: NoPermission
		},
		Index,
		Trade,
		Service,
		
		Goods,
		Shop,
		TmApplySubmit,
		TmApplySubmitCXB,
		TmSubmitChannel,
		fillData,
		//Marketing,
		Setting,
		Other,
		TmFeedback,
		niceClass,
		Dataview,
    {
      path: '*',
      hidden: true,
      name: '404',
      redirect: { path: '/404' }
    }
	]
})
