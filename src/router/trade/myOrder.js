import {Content} from 'layout/';

import {Trade} from 'views/';

export default {
	path: 'myOrder',
	name: '我的订单',
	meta:{
		name: '我的订单',
		permission: 'iprp_trade_order'
	},
	component: Content,
	//redirect: '/Trade/myOrder/list',
	children: [{
		path: 'list',
		name: 'myOrderList',
		meta:{
			name: '全部订单',
			permission: 'iprp_trade_order'
		},
		component: Trade.myOrder.List
	}, {
		path: 'list?order_state=0',
		name: '待付款',
		meta:{
			name: '待付款',
			permission: 'iprp_trade_order'
		},
		component: Trade.myOrder.List
	}, {
		path: 'detail/:order_id/:order_bussiness_type',
		name: 'orderDetail',
		hidden: true,
		meta:{
			name: '订单详情',
			permission: 'iprp_trade_order'
		},
		component: Trade.myOrder.Detail
	}]
};
