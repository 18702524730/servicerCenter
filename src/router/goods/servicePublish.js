import {Content} from 'layout/';

import {Goods} from 'views/';
import {addCommodity} from 'views/';


export default {
	path: 'servicePublish',
	name: '服务发布',
	meta:{
		name: '服务发布',
		permission: 'iprp_goods_service_publish'
	},
	component: Content,
	//redirect: '/service/myServiceOrder/list',
	children: [{
		path: 'list',
		name: 'PublishList',
		meta:{
			name: '已发布服务',
			permission: 'iprp_goods_service_publish'
		},
		component: Goods.servicePublish.List
	}, {
		path: 'list?ground_status=1',
		name: 'putaway',
		meta:{
			name: '已上架',
			permission: 'iprp_goods_service_publish'
		},
		component: Goods.servicePublish.List
	}, {
		path: 'detail/:id',
		name: 'servicePublishDetail',
		hidden: true,
		meta:{
			name: '查看服务',
			permission: 'iprp_goods_service_publish'
		},
		component: Goods.servicePublish.Detail
	}, {
		path: 'addCommodity',
		name: 'addCommodity',
		hidden: true,
		meta:{
			name: '发布服务',
			permission: 'iprp_goods_publish_service'
		},
		component: Goods.servicePublish.addEditProcedure
	}, {
		path: 'redactProduct/:id',
		name: 'redactProduct',
		hidden: true,
		meta:{
			name: '编辑服务',
			permission: 'iprp_goods_edit'
		},
		component: Goods.servicePublish.addEditProcedure
	}]

};
