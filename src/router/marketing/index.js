import {Home, Content, TasHome} from 'layout/';

import marketCenter from './marketCenter.js';

export default {
	path: '/marketing',
	name: '营销',
	meta:{
		name: '营销',
		permission: 'iprp_servicer_config'
	},
	component: Home,
	//redirect: '/marketing/marketCenter/code',
	children: [marketCenter]
};
