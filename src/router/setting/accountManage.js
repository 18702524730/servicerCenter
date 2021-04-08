import {Content} from 'layout/';

import {Setting} from 'views/';

export default {
	path: 'accountManage',
	name: '子账号管理',
	meta:{
		name: '子账号管理',
		permission: 'iprp_account_manager'
	},
	component: Content,
	//redirect: '/setting/accountManage/adminList',
	children: [{
		path: 'adminList',
		name: 'allAccount',
		meta:{
			name: '全部子账号',
			permission: 'iprp_admin_manage'
		},
		component: Setting.accountManage.adminList
	}, {
		path: 'adminEdit/:operator_id',
		name: 'accountEdit',
		meta:{
			name: '新增账号',
			permission: 'iprp_admin_manage'
		},
		hidden: true,
		component: Setting.accountManage.adminEdit
	}, {
		path: 'functionList',
		name: '功能组管理',
		meta:{
			name: '功能组管理',
			permission: 'iprp_gadmin_manage'
		},
		component: Setting.accountManage.functionList
	}, {
		path: 'functionEdit/:operator_id',
		name: 'functionEdit',
		meta:{
			name: '功能组管理',
			permission: 'iprp_gadmin_manage'
		},
		hidden: true,
		component: Setting.accountManage.functionEdit
	}, {
		path: 'dataList',
		name: 'dataList',
		meta:{
			name: '业务组管理',
			permission: 'iprp_dataGroup_manage'
		},
		component: Setting.accountManage.dataList
	}, {
		path: 'dataEdit/:operator_id',
		name: 'dataEdit',
		meta:{
			name: '业务组管理',
			permission: 'iprp_dataGroup_manage'
		},
		hidden: true,
		component: Setting.accountManage.dataEdit
	}]
};
