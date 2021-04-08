import {Home,Content} from 'layout/';

import {Other} from 'views/';

export default {
	path: 'notice',
	name: 'notice',
	meta:{
		name: '平台公告',
		permission: 'true'
	},
	component: Content,
	redirect: '/other/notice/list',
	children: [{
		path: 'list',
		name: 'noticeList',
		meta:{
			name: '公告列表',
			permission: 'true'
		},
		icon: 'reorder',
		component: Other.Notice.List
	},{
		path: 'detail/:id',
		name: 'noticeDetail',
		hidden: true,
		meta:{
			name: '公告详情',
			permission: 'true'
		},
		component: Other.Notice.Detail
	}]
};
