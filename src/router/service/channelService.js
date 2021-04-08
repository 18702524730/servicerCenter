import {Content} from 'layout/';
import {Service} from 'views/';

export default {
	path: 'channelService',
	name: 'channelService',
	meta:{
		name: '渠道工单',
		permission: 'iprp_customer_service'
	},
	component: Content,
	//redirect: '/service/tmApply/list',
	children: [{
		path: 'recommendNice',
		name: 'NiceList',
		meta:{
			name: '天猫尼斯推荐',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.NiceList
	},
	{
		path: 'list',
		name: 'channelServiceList',
		meta:{
			name: '全部工单',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.List
	}, {
		path: 'list?status=10',
		name: 'channelServiceList2',
		meta:{
			name: '待提交',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.List
	}, 
	{
		path: 'recommendNiceAdd/:orderKey',
		name: 'NiceAdd',
		hidden: true,
		meta:{
			name: '天猫尼斯推荐',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.NiceAdd
	},{
		path: 'list?payState=0&throughState=2',
		name: 'payState0',
		hidden: true,
		meta:{
			name: '平台审核',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.List
	}, {
		path: 'list?waitReport=1',
		name: 'waitReport1',
		hidden: true,
		meta:{
			name: '财务审核',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.List
	}, {
		path: 'list?waitReport=1',
		name: 'waitReport1',
		hidden: true,
		meta:{
			name: '审核通过',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.List
	}, {
		path: 'detail/:workOrderSn',
		name: 'workDetailCh',
		hidden: true,
		meta:{
			name: '工单详情',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.Detail
	}, {
		path: 'serviceDetail/:orderSn',
		name: 'serviceDetail',
		hidden: true,
		meta:{
			name: '服务单详情',
			permission: 'iprp_customer_service'
		},
		component: Service.channelService.serviceDetail
	}
	]
};
