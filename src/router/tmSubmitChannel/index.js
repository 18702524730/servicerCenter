import {Home, Content, TasHome} from 'layout/';

import stepOne from './stepOne.js';
import stepTwo from './stepTwo.js';
import stepThree from './stepThree.js';


export default {
	path: '/tmSubmitChannel',
	name: '渠道工单提交3步',
	meta:{
		name: '渠道工单提交3步',
		permission: 'true'
	},
	component: TasHome,
	hidden   : true,
	redirect: '/tmSubmitChannel/stepOne',
	children: [stepOne, stepTwo, stepThree]
};
