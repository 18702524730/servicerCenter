import {Content} from 'layout/';

import {Other} from 'views/';

export default {
	path: 'tool',
	name: 'tool',
	meta:{
		name: '工具管理',
		permission: 'true'
	},
	component: Content,
	redirect: '/other/tool/list',
	children: [{
		path: 'list',
		name: 'toolList',
		meta:{
			name: '工具列表',
			permission: 'true'
		},
		icon: 'reorder',
		component: Other.Tool.List
	},{
		path: 'detail/:id',
		name: 'toolDetail',
		hidden: true,
		meta:{
			name: '工具详情',
			permission: 'true'
		},
		component: Other.Tool.Detail
	}]
};
