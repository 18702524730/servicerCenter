import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'tradedata',
    name: 'tradedata',
    meta:{
        name:'商标业务全流程表',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'tmlist',
            name:'tmlist',
            component: Dataview.trademarks.trademarklist,
            meta:{
                name:'商标注册申报—2018-2019',
                permission: 'true'
            }
        },
        {
            path:'interlist',
            name:'interlist',
            component: Dataview.trademarks.interlist,
            meta:{
                name:'E-国际商标申报表',
                permission: 'true'
            }
        },
        {
            path:'otherlist',
            name:'otherlist',
            component: Dataview.trademarks.otherlist,
            meta:{
                name:'2018-2019年商标其它业务',
                permission: 'true'
            }
        },
        {
            path:'tmadd/:id',
            name:'tmadd',
            component: Dataview.trademarks.trademarkadd,
            hidden: true,
            meta:{
                name:'新增工单',
                permission: 'true'
            }
        },
        {
            path:'recordpage/:id',
            name:'trademarkRecord',
            component: Dataview.trademarks.recordpage,
            hidden: true,
            meta:{
                name:'办理记录',
                permission: 'true'
            }
        },
        {
            path:'interadd/:id',
            name:'interadd',
            component: Dataview.trademarks.interadd,
            hidden: true,
            meta:{
                name:'新增工单',
                permission: 'true'
            }
        },
        {
            path:'otheradd/:id',
            name:'otheradd',
            component: Dataview.trademarks.otheradd,
            hidden: true,
            meta:{
                name:'新增工单',
                permission: 'true'
            }
        },
    ]
}