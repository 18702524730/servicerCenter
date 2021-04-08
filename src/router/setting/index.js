import {Home, Content, TasHome} from 'layout/';

import accountManage from './accountManage.js';
import safeCenter from './safeCenter.js';
import sellerManage from './sellerManage';
// import subAccountManage from './subAccountManage';

export default {
	path: '/setting',
	name: '设置',
	meta:{
		name: '设置',
		permission: 'iprp_account_config'
	},
	component: Home,
	//redirect: '/setting/accountManage',
	children: [sellerManage, accountManage, ]
};
