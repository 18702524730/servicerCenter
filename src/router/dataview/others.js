import {Content} from 'layout/';
import {Dataview} from 'views/';

export default {
    path: 'otherscase',
    name: 'otherscase',
    meta:{
        name:'2018年8月之前遗留业务',
        permission: 'true'
    },
    component: Content,
    children:[
        {
            path:'taobaolist',
            name:'taobaolist',
            component: Dataview.others.taobaolist,
            meta:{
                name:'2017年-2018年7月淘宝服务市场-国内商标',
                permission: 'true'
            }
        },
        {
            path:'acxblist',
            name:'acxblist',
            component: Dataview.others.acxblist,
            meta:{
                name:'A-创新保申报全流程表2018年8月前',
                permission: 'true'
            }
        },
        {
            path:'acxblists',
            name:'acxblists',
            component: Dataview.others.acxblists,
            meta:{
                name:'A-创新保申报全流程表2017年',
                permission: 'true'
            }
        },
        {
            path:'acxbsebelist',
            name:'acxbsebelist',
            component: Dataview.others.acxbsebelist,
            meta:{
                name:'A-2016年创新保(拾贝申报)',
                permission: 'true'
            }
        },
        {
            path:'acxbfwlist',
            name:'acxbfwlist',
            component: Dataview.others.acxbfwlist,
            meta:{
                name:'A-2016年创新保(服务商结算表)',
                permission: 'true'
            }
        },
        {
            path:'acxbwzlist',
            name:'acxbwzlist',
            component: Dataview.others.acxbwzlist,
            meta:{
                name:'A-创新保-五洲代报(2016年12月-2017年5月)',
                permission: 'true'
            }
        },
        {
            path:'bsebelist',
            name:'bsebelist',
            component: Dataview.others.bsebelist,
            meta:{
                name:'B-拾贝1.0申报表2018年8月前',
                permission: 'true'
            }
        },
        {
            path:'bsebelistx',
            name:'bsebelistx',
            component: Dataview.others.bsebelistx,
            meta:{
                name:'B-拾贝1.0申报表2017年',
                permission: 'true'
            }
        },
        {
            path:'cqudaolist',
            name:'cqudaolist',
            component: Dataview.others.cqudaolist,
            meta:{
                name:'G-渠道商标业务全流程表2018年8月前',
                permission: 'true'
            }
        },
        {
            path:'dofflinelist',
            name:'dofflinelist',
            component: Dataview.others.dofflinelist,
            meta:{
                name:'D2-2017线下商标注册',
                permission: 'true'
            }
        },
        {
            path:'dofflinelistx',
            name:'dofflinelistx',
            component: Dataview.others.dofflinelistx,
            meta:{
                name:'D2-2016线下商标注册',
                permission: 'true'
            }
        },
        {
            path:'dotherlist',
            name:'dotherlist',
            component: Dataview.others.dotherlist,
            meta:{
                name:'D1-2017其他业务',
                permission: 'true'
            }
        },
        {
            path:'dotherlistx',
            name:'dotherlistx',
            component: Dataview.others.dotherlistx,
            meta:{
                name:'D1-2016其他业务',
                permission: 'true'
            }
        },
        
        

        {
            path:'acxbadd/:id/:fid',
            name:'acxbadd',
            component: Dataview.others.acxbadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'acxbadds/:id/:fid',
            name:'acxbadds',
            component: Dataview.others.acxbadds,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'acxbsebeadd/:id/:fid',
            name:'acxbsebeadd',
            component: Dataview.others.acxbsebeadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'acxbfwadd/:id/:fid',
            name:'acxbfwadd',
            component: Dataview.others.acxbfwadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'acxbwzadd/:id/:fid',
            name:'acxbwzadd',
            component: Dataview.others.acxbwzadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'bsebeadd/:id',
            name:'bsebeadd',
            component: Dataview.others.bsebeadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'bsebeaddx/:id',
            name:'bsebeaddx',
            component: Dataview.others.bsebeaddx,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'cqudaoadd/:id',
            name:'cqudaoadd',
            component: Dataview.others.cqudaoadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'dofflineadd/:id',
            name:'dofflineadd',
            component: Dataview.others.dofflineadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'dofflineaddx/:id',
            name:'dofflineaddx',
            component: Dataview.others.dofflineaddx,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'dotheradd/:id',
            name:'dotheradd',
            component: Dataview.others.dotheradd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'dotheraddx/:id',
            name:'dotheraddx',
            component: Dataview.others.dotheraddx,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        {
            path:'taobaoadd/:id/:fid',
            name:'taobaoadd',
            component: Dataview.others.taobaoadd,
            hidden: true,
            meta:{
                name:'工单详情',
                permission: 'true'
            }
        },
        


    ]
}