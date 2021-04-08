import {Home} from 'layout/'
import trademarkdata from './trademark.js'
import cservicedata from './cservice.js'
import techdata from './technology.js'
import patentdata from './patent.js'
import qinquandata from './qinquan.js'
import others from './others.js'
import henan from './henan.js'
import xiamen from './xiamen.js'
import huazhong from './huazhong.js'
import beijing from './beijing.js'
import zhuanli from './zhuanli.js'
export default {
    path:'/dataview',
    name:'dataview',
    component: Home,
    meta:{
        name:'数据',
        permission: 'true'
    },
    children:[
        
        trademarkdata,
        zhuanli,
        cservicedata,
        techdata,
        qinquandata,
        patentdata,
        others,
        henan,
        xiamen,
        huazhong,
        beijing,
        
    ]
}