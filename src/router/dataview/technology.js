import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'techdata',
    name: 'techdata',
    meta:{
        name:'科技项目全流程表',
        permission: 'true'
    },
    component: Content,
    children:[
        // {
        //     path:'listall',
        //     name:'techlista',
        //     component: Dataview.technology.techlista,
        //     meta:{
        //         name:'项目汇总',
        //         permission: 'iprp_trade_config'
        //     }
        // },
        {
            path:'techlist',
            name:'techlist',
            component: Dataview.technology.techlist,
            meta:{
                name:'科技项目、监测、维权等业务全流程表201706',
                permission: 'true'
            }
        },
        {
            path:'techadd/:id',
            name:'techadd',
            component: Dataview.technology.techadd,
            hidden: true,
            meta:{
                name:'新增工单',
                permission: 'true'
            }
        },
        // {
        //     path:'techadda/:id',
        //     name:'techadda',
        //     component: Dataview.technology.techadda,
        //     hidden: true,
        //     meta:{
        //         name:'新增工单',
        //         permission: true
        //     }
        // }
    ]
}