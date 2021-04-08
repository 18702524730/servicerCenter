
import {Content} from 'layout/';

import {Shop} from 'views/';

export default {
	path: 'shopManage',
	name: '店铺管理',
	meta:{
		name: '店铺管理',
		permission: 'iprp_store'
	},
	component: Content,
	children: [{
		path: 'basicinfo',
		name: 'basicinfo',
		meta:{
			name: '基本设置',
			permission: 'iprp_store_basic_setting'
		},
		component: Shop.shopManage.basicinfo
	}, {
		path: 'coverInfo',
		name: 'coverInfo',
		meta:{
			name: '店招与首页',
			permission: 'iprp_store_home'
		},
		component: Shop.shopManage.coverInfo
	}]
};
