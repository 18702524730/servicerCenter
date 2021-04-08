import {Content} from 'layout/';

import {Marketing} from 'views/';

export default {
	path: 'marketCenter',
	name: '营销中心',
	meta:{
		name: '营销中心',
		permission: 'iprp_marketing_center'
	},
	component: Content,
	children: [{
		path: 'code',
		name: 'code',
		meta:{
			name: '识别码',
			permission: 'iprp_servicer_idcode'
		},
		component: Marketing.marketCenter.Code
	}, {
		path: 'invitation',
		name: '邀请记录',
		meta:{
			name: '邀请记录',
			permission: 'iprp_invite_record'
		},
		component: Marketing.marketCenter.Invitation
	}]
};
