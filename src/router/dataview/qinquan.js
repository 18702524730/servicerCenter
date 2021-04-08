import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'pdata',
    name: 'pdata',
    meta:{
        name:'知识产权侵权判定',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'qlist',
            name:'qlist',
            component: Dataview.qinquan.qlist,
            meta:{
                name:'知识产权侵权判定',
                permission: 'true'
            }
        },
        {
            path:'qadd/:id',
            name:'qadd',
            component: Dataview.qinquan.qadd,
            hidden: true,
            meta:{
                name:'新增工单',
                permission: 'true'
            }
        }
    ]
}