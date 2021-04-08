import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'patentdata',
    name: 'patentdata',
    meta:{
        name:'专利许可申请台账管理表',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'plist',
            name:'plist',
            component: Dataview.patent.plist,
            meta:{
                name:'专利许可申请台账管理表',
                permission: 'true'
            }
        },
        {
            path:'padd/:id',
            name:'padd',
            component: Dataview.patent.padd,
            hidden: true,
            meta:{
                name:'新增工单',
                permission: 'true'
            }
        }
    ]
}