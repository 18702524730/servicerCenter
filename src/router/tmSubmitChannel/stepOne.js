import {TmSubmitChannel} from 'views/';

export default {
	path: 'stepOne',
	name: 'stepOneCh',
	meta:{
		name: '确认申请主体、联系人及发票信息',
		permission: 'true'
	},
	icon: 'inbox',
	component: TmSubmitChannel.stepOne
};
