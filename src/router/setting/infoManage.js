
import {Content} from 'layout/';

import {Setting} from 'views/';

export default {
	path: 'infoManage',
	name: '资料管理',
	meta:{
		name: '资料管理',
		permission: 'iprp_datum_manager'
	},
	component: Content,
	children: [{
		path: 'basicinfo',
		name: 'basicinfo',
		meta:{
			name: '基本资料',
			permission: 'iprp_balance_info'
		},
		component: Setting.infoManage.basicinfo
	}, {
		path: 'serviceInfo',
		name: 'serviceInfo',
		meta:{
			name: '服务能力',
			permission: 'iprp_servicer_info_manage'
		},
		component: Setting.infoManage.serviceInfo
	}/*, {
		path: 'settlement',
		name: 'settlement',
		meta:{
			name: '结算信息',
			permission: 'iprp_balance_info'
		},
		component: Setting.infoManage.settlement
	}*/]
};
