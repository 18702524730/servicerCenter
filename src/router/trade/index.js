import {Home, Content, TasHome} from 'layout/';

import myOrder from './myOrder.js';
import afterSale from './afterSale.js';

export default {
	path: '/trade',
	name: '交易',
	meta:{
		name: '交易',
		permission: 'iprp_trade'
	},
	component: Home,
	//redirect: '/service/myServiceOrder',
	children: [myOrder, afterSale]
};
