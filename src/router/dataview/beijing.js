import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'beijing',
    name: 'beijing',
    meta:{
        name:'北京申报',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'bjlist',
            name:'bjlist',
            component: Dataview.others.beijinglist,
            meta:{
                name:'北京申报杭州案件',
                permission: 'true'
            }
        },
        {
            path:'bjadd/:fid/:id',
            name:'bjadd',
            component: Dataview.others.beijingadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        }
    ]
}