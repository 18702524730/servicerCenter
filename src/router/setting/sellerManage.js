import {Content} from 'layout/';

import {Setting} from 'views/';
export default {
	path: 'sellerManage',
	name: '商家设置',
	meta:{
		name: '商家设置',
		permission: 'iprp_seller_setting'
	},
	component: Content,
	children: [{
		path: 'basicInfo',
		name: '基本资料',
		meta:{
			name: '基本资料',
			permission: 'iprp_servicer_info_manage'
		},
		component: Setting.sellerManage.basicInfo
	}, {
		path: 'realName',
		name: '实名认证',
		meta:{
			name: '实名认证',
			permission: 'iprp_real_name_auth'
		},
		component: Setting.sellerManage.realName
	}, {
		path: 'serviceTypeList',
		name: '服务类目',
		meta:{
			name: '服务类目',
			permission: 'iprp_service_category'
		},
		component: Setting.sellerManage.serviceInfo
	}, {
		path: 'credentials',
		name: '资质认证',
		meta:{
			name: '资质认证',
			permission: 'iprp_qualify_certificate'
		},
		component: Setting.sellerManage.credentials
	}, {
		path: 'settlement',
		name: '结算信息',
		meta:{
			name: '结算信息',
			permission: 'iprp_balance_info'
		},
		component: Setting.sellerManage.settlement
	}]
};
