import {Home, Content, TasHome} from 'layout/';

import msg from './msg.js';
import rule from './rule.js';
import notice from './notice.js';
import tool from './tool.js';
import product from './product.js';
import activity from './activity.js'
export default {
	path: '/other',
	name: 'other',
	hidden: true,
	meta:{
		name: '其它',
		permission: 'true'
	},
	component: Home,
	redirect: '/other/msg',
	children: [msg, rule, notice, tool,activity,product]
};
