import {Content} from 'layout/';
import {Service} from 'views/';

export default {
	path: 'clientServiceCXB',
	name: 'clientServiceCXB',
	meta:{
		name: '客户服务',
		permission: 'iprp_customer_service'
	},
	component: Content,
	//redirect: '/service/tmApply/list',
	children: [{
		path: 'list',
		name: 'clientServiceListCXB',
		meta:{
			name: '全部工单',
			permission: 'iprp_customer_service'
		},
		component: Service.clientServiceCXB.List
	}, {
		path: 'list?throughState=1',
		name: 'throughState1',
		meta:{
			name: '待反馈',
			permission: 'iprp_customer_service'
		},
		component: Service.clientServiceCXB.List
	}, {
		path: 'list?payState=0&throughState=2',
		name: 'payState0',
		meta:{
			name: '待付款',
			permission: 'iprp_customer_service'
		},
		component: Service.clientServiceCXB.List
	}, {
		path: 'list?waitReport=1',
		name: 'waitReport1',
		meta:{
			name: '待上报',
			permission: 'iprp_customer_service'
		},
		component: Service.clientServiceCXB.List
	}, {
		path: 'detail/:id/:state',
		name: 'workDetailCXB',
		hidden: true,
		meta:{
			name: '工单详情',
			permission: 'iprp_customer_service'
		},
		component: Service.clientServiceCXB.Detail
	}, {
		path: 'serviceDetail/:orderSn',
		name: 'serviceDetail',
		hidden: true,
		meta:{
			name: '服务单详情',
			permission: 'iprp_customer_service'
		},
		component: Service.clientServiceCXB.serviceDetail
	}
	]
};
