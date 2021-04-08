import {Home, Content, TasHome} from 'layout/';

import welcome from './welcome.js';
import basicData from './basicData.js';
import companyAuth from './companyAuth.js';

import serviceManage from './serviceManage.js';
import realNameIdentification from './realNameIdentification.js';


export default {
	path: '/fillData',
	name: '首次进入商家中心',
	meta:{
		name: '首次进入商家中心',
		permission: 'true'
	},
	component: TasHome,
	hidden   : true,
	redirect: '/fillData/welcome',
	children: [welcome, basicData, companyAuth, serviceManage, realNameIdentification]
};
