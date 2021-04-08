import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'xiamensebe',
    name: 'xiamensebe',
    meta:{
        name:'厦门拾贝',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'xiamenlist',
            name:'xiamenlist',
            component: Dataview.others.xiamenlist,
            meta:{
                name:'H1-厦门拾贝商标注册(2017-2018)',
                permission: 'true'
            }
        },
        {
            path:'xiamenadd/:id',
            name:'xiamenadd',
            component: Dataview.others.xiamenadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'xiamenlisto',
            name:'xiamenlisto',
            component: Dataview.others.xiamenlisto,
            meta:{
                name:'H2-厦门拾贝商标其他业务',
                permission: 'true'
            }
        },
        {
            path:'xiamenaddo/:id',
            name:'xiamenaddo',
            component: Dataview.others.xiamenaddo,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        }
    ]
}