import {Content} from 'layout/';

import {Trade} from 'views/';

export default {
	path: 'afterSale',
	name: '退款单',
	meta:{
		name: '退款单',
		permission: 'iprp_trade_refund'
	},
	icon: 'inbox',
	component: Content,
	//redirect: '/service/afterSale/list',
	children: [{
		path: 'list',
		name: '全部退款单',
		meta:{
			name: '全部退款单',
			permission: 'iprp_trade_refund'
		},
		icon: 'reorder',
		component: Trade.afterSale.List
	}, {
		path: 'list?state=0',
		name: '待审核',
		meta:{
			name: '待审核',
			permission: 'iprp_trade_refund'
		},
		component: Trade.afterSale.List
	},{
		path: 'detail/:id',
		name: 'afterSaleDetail',
		hidden: true,
		meta:{
			name: '退款单详情',
			permission: 'iprp_trade_refund'
		},
		icon: 'reorder',
		component: Trade.afterSale.Detail
	}]
};
