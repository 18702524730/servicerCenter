import {Content} from 'layout/';

import {Other} from 'views/';

export default {
	path: 'msg',
	name: 'msg',
	meta:{
		name: '消息管理',
		permission: 'true'
	},
	component: Content,
	redirect: '/other/msg/list',
	children: [{
		path: 'list',
		name: 'msgList',
		meta:{
			name: '消息列表',
			permission: 'true'
		},
		icon: 'reorder',
		component: Other.Msg.List
	},{
		path: 'detail/:id',
		name: 'msgDetail',
		hidden: true,
		meta:{
			name: '消息详情',
			permission: 'true'
		},
		component: Other.Msg.Detail
	}]
};
