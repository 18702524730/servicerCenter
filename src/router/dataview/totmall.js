import {Content} from 'layout/';
export default {
    path: 'totmall',
    name: 'totmall',
    meta:{
        name:'天猫/渠道工单',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'datatonice',
            name:'datatonice',
            meta:{
                name:'天猫尼斯推荐',
                permission: 'true'
            }
        },
        {
            path:'datatoall',
            name:'datatoall',
            meta:{
                name:'全部工单',
                permission: 'true'
            }
        }
    ]
}