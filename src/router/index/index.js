import {Home, Content, TasHome} from 'layout/';
import {Index, Button} from 'views/';

export default {
	path: '/index',
	name: 'index',
	meta:{
		name: '首页',
		permission: 'true'
	},
	component: Home,
	redirect: '/index/general',
	children: [
		{
			path: 'general',
			name: 'general',
			meta:{
				name: '首页',
				permission: 'true'
			},
			component: Index
		},
		{
			path     : 'button',
			name     : 'button',
			meta:{
				name: '样式'
			},
			hidden   : true,
			component: Button
		},
	]
};
