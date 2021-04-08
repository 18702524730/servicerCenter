import {Content} from 'layout/';

import {Service} from 'views/';

export default {
	path: 'myServiceOrder',
	name: '我的服务单',
	meta:{
		name: '我的服务单',
		permission: 'iprp_order_manage'
	},
	component: Content,
	//redirect: '/service/myServiceOrder/list',
	children: [{
		path: 'list',
		name: 'myServiceOrderList',
		meta:{
			name: '全部服务单',
			permission: 'iprp_order_manage'
		},
		component: Service.myServiceOrder.List
	}, {
		path: 'list?order_state=0&order_tasking_state=',
		name: '待付款',
		meta:{
			name: '待付款',
			permission: 'iprp_order_manage'
		},
		component: Service.myServiceOrder.List
	}, {
		path: 'list?order_state=1&order_tasking_state=0',
		name: 'toService',
		meta:{
			name: '待接单',
			permission: 'iprp_order_manage'
		},
		component: Service.myServiceOrder.List
	}, {
		path: 'list?order_state=&order_tasking_state=1',
		name: '已接单待提交',
		meta:{
			name: '已接单待提交',
			permission: 'iprp_order_manage'
		},
		component: Service.myServiceOrder.List
	}, {
		path: 'detail/:id',
		name: 'bsOrderDetail',
		hidden: true,
		meta:{
			name: '服务单详情',
			permission: 'iprp_order_manage'
		},
		component: Service.myServiceOrder.Detail
	}]
};
