import {Content} from 'layout/';

import {Other} from 'views/';

export default {
	path: 'rule',
	name: 'rule',
	meta:{
		name: '平台规则',
		permission: 'true'
	},
	component: Content,
	redirect: '/other/rule/list',
	children: [{
		path: 'list',
		name: 'ruleList',
		meta:{
			name: '规则列表',
			permission: 'true'
		},
		icon: 'reorder',
		component: Other.Rule.List
	},{
		path: 'detail/:id',
		name: 'ruleDetail',
		hidden: true,
		meta:{
			name: '规则详情',
			permission: 'true'
		},
		component: Other.Rule.Detail
	}]
};
