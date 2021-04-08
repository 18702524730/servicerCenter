import {Content} from 'layout/';

import {Setting} from 'views/';

export default {
	path: 'safeCenter',
	name: '安全中心',
	meta:{
		name: '安全中心',
		permission: 'iprp_security_manager'
	},
	component: Content,
	children: [{
		path: 'updatePwd',
		name: '修改密码',
		meta:{
			name: '修改密码',
			permission: 'iprp_password_manage'
		},
		component: Setting.safeCenter.updatePwd
	}, {
		path: 'bindaccount',
		name: '账号绑定',
		meta:{
			name: '账号绑定',
			permission: 'iprp_account_bind'
		},
		component: Setting.safeCenter.bindaccount
	}, {
		path: 'thelog',
		name: '账号日志',
		meta:{
			name: '账号日志',
			permission: 'iprp_log_manage'
		},
		component: Setting.safeCenter.thelog
	}]
};
