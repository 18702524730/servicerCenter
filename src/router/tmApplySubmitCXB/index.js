import {Home, Content, TasHome} from 'layout/';

import stepOne from './stepOne.js';
import stepTwo from './stepTwo.js';
import stepThree from './stepThree.js';


export default {
	path: '/tmApplySubmitCXB',
	name: '国内商标注册提交4步',
	meta:{
		name: '国内商标注册提交4步',
		permission: 'true'
	},
	component: TasHome,
	hidden   : true,
	redirect: '/tmApplySubmitCXB/stepOne',
	children: [stepOne, stepTwo, stepThree]
};
