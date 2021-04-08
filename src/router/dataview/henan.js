import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'henansebe',
    name: 'henansebe',
    meta:{
        name:'河南拾贝商标注册',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'henanlist',
            name:'henanlist',
            component: Dataview.others.henanlist,
            meta:{
                name:'河南拾贝（国内商标注册）',
                permission: 'true'
            }
        },
        {
            path:'henanadd/:id',
            name:'henanadd',
            component: Dataview.others.henanadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        }
    ]
}