import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'huazhong',
    name: 'huazhong',
    meta:{
        name:'华仲专利代报',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'hzlist',
            name:'hzlist',
            component: Dataview.others.hzlist,
            meta:{
                name:'拾贝代报专利统计表',
                permission: 'true'
            }
        },
        {
            path:'hzadd/:id',
            name:'hzadd',
            component: Dataview.others.hzadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        }
    ]
}