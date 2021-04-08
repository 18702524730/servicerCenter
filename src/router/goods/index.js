import {Home, Content, TasHome} from 'layout/';

import servicePublish from './servicePublish.js';
import trademarkPublish from './trademarkPublish.js';

export default {
	path: '/goods',
	name: '商品',
	meta:{
		name: '商品',
		permission: 'iprp_goods'
	},
	component: Home,
	//redirect: '/service/myServiceOrder',
	children: [
		servicePublish,
		trademarkPublish
	]
};
