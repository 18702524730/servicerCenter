import {Content} from 'layout/';

import {Other} from 'views/';

export default {
	path: 'activity',
	name: 'activity',
	meta:{
		name: '最新活动',
		permission: 'true'
	},
	component: Content,
	redirect: '/other/activity/list',
	children: [{
		path: 'list',
		name: 'activityList',
		meta:{
			name: '活动列表',
			permission: 'true'
		},
		component: Other.Activity.List
	},{
		path: 'detail/:id',
		name: 'activityDetail',
		hidden: true,
		meta:{
			name: '活动详情',
			permission: 'true'
		},
		component: Other.Activity.Detail
	}]
};
