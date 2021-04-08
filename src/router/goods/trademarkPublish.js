import {Content} from 'layout/';
import {Goods} from 'views/';

export default {
	path: 'trademarkPublish',
	name: '商标发布',
	meta:{
		name: '商标发布',
		permission: 'iprp_goods_trademark_publish'
	},
	component: Content,
	//redirect: '/service/tmApply/list',
	children: [{
		path: 'list',
		name: 'trademarkPublishList',
		meta:{
			name: '已发布商标',
			permission: 'iprp_goods_trademark_publish'
		},
		component: Goods.trademarkPublish.List
	}, {
		path: 'list?saleStatus=2',
		name: 'trademarkPublishSale',
		meta:{
			name: '预订',
			permission: 'iprp_goods_trademark_publish'
		},
		component: Goods.trademarkPublish.List
	}, {
		path: 'detail/:id',
		name: 'publishDetail',
		hidden: true,
		meta:{
			name: '工单详情',
			permission: 'iprp_goods_trademark_publish'
		},
		icon: 'edit',
		component: Goods.trademarkPublish.Detail
	}, {
		path: 'hendEnter',
		name: 'hendEnter',
		hidden: true,
		meta:{
			name: '手工逐一发布',
			permission: 'iprp_goods_manual_publish'
		},
		icon: 'edit',
		component: Goods.trademarkPublish.hendEntering
	}, {
		path: 'handWorkLend',
		name: 'handWorkLend',
		hidden: true,
		meta:{
			name: '编辑',
			permission: 'iprp_goods_trademark_edit'
		},
		icon: 'edit',
		component: Goods.trademarkPublish.handWorkLend
	} , {
		path: 'batchLend',
		name: 'batchLend',
		hidden: true,
		meta:{
			name: '表格一键发布',
			permission: 'iprp_goods_table_publish'
		},
		icon: 'edit',
		component: Goods.trademarkPublish.batchLend
	} 
	
	]
};
