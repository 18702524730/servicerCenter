import {Home, Content, TasHome} from 'layout/';

import stepTwo from './stepTwo.js';
import stepOne from './stepOne.js';

export default {
	path: '/tmFeedback',
	name: '创新保国内商标注册材料反馈',
	meta:{
		name: '创新保国内商标注册材料反馈',
		permission: 'true'
	},
	component: TasHome,
	hidden   : true,
	redirect: '/tmFeedback/stepOne',
	children: [stepOne, stepTwo]
};
