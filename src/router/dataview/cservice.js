import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'cservice',
    name: 'cservice',
    meta:{
        name:'版权业务全流程表',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'clist',
            name:'clist',
            component: Dataview.copyright.clist,
            meta:{
                name:'著作权全流程表',
                permission: 'true'
            }
        },
        {
            path:'cadd/:id',
            name:'cadd',
            component: Dataview.copyright.cadd,
            hidden: true,
            meta:{
                name:'新增工单',
                permission: 'true'
            }
        }
    ]
}