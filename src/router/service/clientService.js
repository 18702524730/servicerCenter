import {Content} from 'layout/';
import {Service} from 'views/';

export default {
	path: 'clientService',
	name: '客户服务',
	meta:{
		name: '客户服务',
		permission: 'iprp_workorder_manager'
	},
	component: Content,
	//redirect: '/service/tmApply/list',
	children: [{
		path: 'list',
		name: 'clientServiceList',
		meta:{
			name: '全部工单',
			permission: 'iprp_workorder_manager'
		},
		icon: 'reorder',
		component: Service.clientService.List
	}, {
		path: 'list?status=1',
		name: '已提交待确认',
		meta:{
			name: '已提交待确认',
			permission: 'iprp_workorder_manager'
		},
		icon: 'edit',
		component: Service.clientService.List
	}, {
		path: 'list?status=2',
		name: '加项待付款',
		meta:{
			name: '加项待付款',
			permission: 'iprp_workorder_manager'
		},
		icon: 'edit',
		component: Service.clientService.List
	}, {
		path: 'detail/:id',
		name: 'workDetail',
		hidden: true,
		meta:{
			name: '工单详情',
			permission: 'iprp_workorder_manager'
		},
		icon: 'edit',
		component: Service.clientService.Detail
	}
	]
};
