import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'zhuanli',
    name: 'zhuanli',
    meta:{
        name:'专利业务全流程表',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'zllist',
            name:'zlqtlist',
            component: Dataview.others.zlqtlist,
            meta:{
                name:'2018-2019专利其他业务全流程表',
                permission: 'true'
            }
        },
        {
            path:'pctlist',
            name:'zlpctlist',
            component: Dataview.others.zlpctlist,
            meta:{
                name:'PCT专利流程表',
                permission: 'true'
            }
        },
        {
            path:'yllist',
            name:'zlyllist',
            component: Dataview.others.zlyllist,
            meta:{
                name:'遗留案件',
                permission: 'true'
            }
        },
        

        {
            path:'zladd/:id/:fid',
            name:'zlqtadd',
            component: Dataview.others.zlqtadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'pctadd/:id/:fid',
            name:'zlpctadd',
            component: Dataview.others.zlpctadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'yladd/:id/:fid',
            name:'zlyladd',
            component: Dataview.others.zlyladd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },

    ]
}