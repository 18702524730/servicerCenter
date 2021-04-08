import {Content} from 'layout/';

import {Other} from 'views/';

export default {
	path: 'product',
	name: 'product',
	meta:{
		name: '产品发布',
		permission: 'true'
	},
	component: Content,
	redirect: '/other/product/list',
	children: [{
		path: 'list',
		name: 'productList',
		meta:{
			name: '发布列表',
			permission: 'true'
		},
		icon: 'reorder',
		component: Other.Product.List
	},{
		path: 'detail/:id',
		name: 'productDetail',
		hidden: true,
		meta:{
			name: '发布详情',
			permission: 'true'
		},
		component: Other.Product.Detail
	}]
};
