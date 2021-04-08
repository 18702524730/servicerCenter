import {TmApplySubmit} from 'views/';

export default {
	path: 'stepTwo',
	name: 'stepTwo',
	meta:{
		name: '确认申请主体及发票信息',
		permission: 'true'
	},
	icon: 'inbox',
	component: TmApplySubmit.stepTwo,
};
