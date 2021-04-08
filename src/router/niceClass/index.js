import {Home, Content, TasHome} from 'layout/';

import recommendNice from './recommendNice.js';


export default {
	path: '/nickClass',
	name: '尼斯推荐',
	meta:{
		name: '尼斯推荐',
		permission: 'true'
	},
	component: TasHome,
	hidden   : true,
	redirect: '/nickClass/recommendNice',
	children: [recommendNice]
};
