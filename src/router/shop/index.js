import {Home, Content, TasHome} from 'layout/';

import shopManage from './shopManage.js';

export default {
	path: '/shop',
	name: '店铺',
	meta:{
		name: '店铺',
		permission: 'iprp_store'
	},
	component: Home,
	//redirect: '/setting/accountManage',
	children: [shopManage]
};
