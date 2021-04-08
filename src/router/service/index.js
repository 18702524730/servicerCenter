import {Home, Content, TasHome} from 'layout/';

import myServiceOrder from './myServiceOrder.js';
import clientService from './clientService.js';
import clientServiceCXB from './clientServiceCXB.js';
import channelService from './channelService.js';

export default {
	path: '/service',
	name: '服务',
	meta:{
		name: '服务',
		permission: 'iprp_trade_config'
	},
	component: Home,
	//redirect: '/service/myServiceOrder',
	children: [myServiceOrder, clientService, clientServiceCXB, channelService]
};
