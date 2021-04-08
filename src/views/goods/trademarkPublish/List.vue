<template>
  <div class="trademarkList myServiceOrder">
    <div class="condition clearfix">
      <div class="form_control"><el-input v-model="typeobj.acceptmaterials" placeholder="注册号"></el-input></div>
      <div class="form_control"><el-input v-model="typeobj.trademarkName" placeholder="商标名称"></el-input></div>
      <div class="form_control">
        <el-select v-model="typeobj.category" clearable placeholder="商标类别">
          <el-option
            v-for="item in cateIdData"
            :key="item.id"
            :label="getTmInfo(item.id)"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-select v-model="typeobj.priceType" clearable placeholder="价格类型">
          <el-option
            v-for="item in moneyType"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form_control data_picker">
        <el-date-picker
          v-model="finished_time"
          type="daterange"
          align="right"
          start-placeholder="注册时间开始"
          end-placeholder="结束"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="form_control data_picker">
        <el-date-picker
          v-model="payment_time"
          type="daterange"
          align="right"
          start-placeholder="发布时间开始"
          end-placeholder="结束"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="form_control">
        <el-select v-model="typeobj.saleStatus" clearable placeholder="销售状态">
          <el-option
            v-for="item in shopType"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-select v-model="typeobj.groundStatus" clearable placeholder="上架状态">
          <el-option
            v-for="item in putawayType"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-select v-model="typeobj.verifyStatus" clearable placeholder="审核状态">
          <el-option
            v-for="item in auditType"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-select v-model="typeobj.needTicket" clearable placeholder="是否开票">
          <el-option
            v-for="item in invioceType"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div class="form_money">
        <el-input v-model="typeobj.startReservePrice" placeholder="最低底价"></el-input><span class="ml5 mr5">-</span><el-input v-model="typeobj.endReservePrice" placeholder="最高底价"></el-input>
      </div>
      <div class="form_money">
        <el-input v-model="typeobj.startSellerPrice" placeholder="最低售价"></el-input><span class="ml5 mr5">-</span><el-input v-model="typeobj.endSellerPrice" placeholder="最高售价"></el-input>
      </div>
      <div class="form_submit">
        <button class="submit" @click="search()">搜索</button>
        <button class="reset" @click="reset()">重置</button>
      </div>
    </div>
    <div class="result">
      <div class="table_handle clearfix">
        <div class="all"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange"></el-checkbox></div>
        <div class="table_handle_btn batch" @click="putaway" v-if="bulk_updown">上架</div>|<div class="table_handle_btn infoSubmit" @click="soldOut" v-if="bulk_updown">下架</div>|
        <div class="btn_trademark fr">
          <button @click="handWork()" v-if="manual_publish">
            手工逐一发布
          </button>
          <button @click="batchLend" class="ml10 mr20" v-if="table_publish">表格一键发布
            <img v-if="synStatus.status == 1" src="~assets/img/goods/read.png" alt="">
            <img v-if="synStatus.status == 3" src="~assets/img/goods/sync.png" alt="">
            <img v-if="synStatus.status == 4" src="~assets/img/goods/issue.png" alt="">
          </button>
        </div>
      </div>
      <table class="result_type">
        <thead>
          <tr class="thead">
            <th width="56"></th>
            <th width="80">商标图样</th>
            <th class="minWidth">注册号</th>
            <th>商标名称</th>
            <th class="minWidth">商标类别</th>
            <th class="alignr">底价</th>
            <th class="alignr">平台售价</th>
            <th class="minWidth alignl" style="padding-left:20px;">是否开票</th>
            <th class="minWidth">价格类型</th>
            <th class="minWidth">销售状态</th>
            <th class="minWidth">上架状态</th>
            <th class="minWidth">审核状态</th>
            <th class="minWidth alignr paddingR">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
            <td class="check_wrap"><el-checkbox :disabled="item.sale_status==3||!item.trademark_status" v-model="item.checked" @change="handleCheckChange(item)"></el-checkbox></td>
            <td style="padding-left:0;">
              <img :src="item.picture" alt="">
            </td>
            <td>{{item.acceptmaterials}}</td>
            <td>{{item.trademark_name}}</td>
            <td>{{getTmInfo(item.category)}}</td>
            <td class="alignr">{{item.reservePrice | priceformat}}</td>
            <td class="alignr" v-if="item.seller_price">{{item.seller_price | priceformat}}</td>
            <td class="alignr" v-else>--</td>
            <td class="alignl" style="padding-left:20px;">{{item.need_ticket == 1 ? '可开票':'不可开票'}}</td>
            <td class="yijia">{{item.price_type | priceType}}</td>
            <td class="yikoujia">{{item.sale_status | saleStatus}}</td>
            <td>{{item.ground_status == 1 ? '已上架':'已下架'}}</td>
            <td>{{item.verify_status == 1 ? '通过':'不通过'}}</td>
            <td class="alignr action paddingR">
              <a href="#" class="view mr15" v-if="item.sale_status!=3&&item.sale_status!=5&&item.trademark_status" @click.prevent="priceStatus(item)">销售</a>
              <a href="#" class="view mr15" v-if="item.sale_status!=3 && trademark_edit" @click.prevent="handWork(item.id)">编辑</a>
              <a href="#" class="view mr15" @click.prevent="goDetail(item.id)">详情</a>
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="13" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="my_loading" v-show="loading" v-loading="loading">
      </div>
      <div class="tb_pagination" v-if="!loading && dataList.length">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pg_index"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total" class="fr">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="请设置销售状态" :visible.sync="shopVisible" :modal-append-to-body="true" top="50%" class="distributeDialog">
      <div class="title_in distribute_in">
        <el-radio-group v-model="radio">
          <el-radio class="radio" v-for="(item, index) in shopType" :label="item.id" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
        <span class="mt10 mb10" v-if="radio==3">注：商标设置为“已售”后，商标将自动下架并不可再编辑。</span>
        <p><a href="" class="button no" @click.prevent="shopVisible = false">取消</a><a href="" class="button yes" @click.prevent="setSaleStatus">确定</a></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  import $ from 'jquery'
  import Filters from 'utils/filters/'
  import {store} from 'utils/';
  import FauxPlaceholder from 'utils/ie9Placeholder.js'
  import intClsData from 'utils/intClsData.js'
  const bsOrderListUrl = './api/seller/getSellerTrademarkList';
  const batchUpAndDown = './api/seller/batchUpAndDownTrademark';
  const setTrademarkSaleStatus = './api/seller/setTrademarkSaleStatus';
  const SynResult = './api/seller/getCacheTmSynStatusResult';
  const typeobj = {//商品筛选
    acceptmaterials:'',
    trademarkName:'',
    category:'',
    priceType:'',
    saleStatus:'',
    groundStatus:'',
    verifyStatus:'',
    needTicket:'',
    startSellerPrice:'',
    endSellerPrice:'',
    startReservePrice:'',
    endReservePrice:'',
  };
  const moneyType = [
    {
      id:1,
      name:'一口价'
    },
    {
      id:2,
      name:'可议价'
    },
    {
      id:3,
      name:'面议'
    },
  ];
  const shopType = [
    {
      id:1,
      name:'待售'
    },
    {
      id:2,
      name:'预订'
    },
    {
      id:3,
      name:'已售'
    },
    {
      id:4,
      name:'不可出售'
    }
  ];
  const putawayType = [
    {
      id:1,
      name:'已上架'
    },
    {
      id:2,
      name:'已下架'
    }
  ];
  const auditType = [
    {
      id:1,
      name:'通过'
    },
    {
      id:2,
      name:'不通过'
    }
  ];
  const invioceType = [
    {
      id:1,
      name:'开票'
    },
    {
      id:2,
      name:'不开票'
    }
  ];
  const distributeMenuPermission = 'iprp_order_manage_fenpei';
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');
  export default {
    name: 'order-list',
    data() {
      return {
        radio:'',
        shopVisible:false,//销售状态
        moneyType:moneyType,//价格类型
        shopType:shopType,//销售状态
        putawayType:putawayType,//上架状态
        auditType:auditType,//审核状态
        invioceType:invioceType,//开票状态
        queryObj: {},
        typeobj: Object.assign({}, typeobj),
        payment_time: '',
        finished_time:'',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        selectedItems: [], //选中的
        checkAll: false,
        isIndeterminate: false,
        dataList:[],
        pg_index: 1,
        pg_count: 10,
        total:0,
        loading: false,
        cateIdData: intClsData.cateIdData,
        memberId:'',
        synStatus:{},
        manual_publish:false,//逐一发布权限
        table_publish:false,//一键发布权限
        bulk_updown:false,//上下架权限
        trademark_edit:false//编辑权限 
      }
    },
    mounted() {
      this.manual_publish = store.get('permission').indexOf('iprp_goods_manual_publish') !== -1;
      this.table_publish = store.get('permission').indexOf('iprp_goods_table_publish') !== -1;
      this.bulk_updown = store.get('permission').indexOf('iprp_goods_bulk_updown') !== -1;
      this.trademark_edit = store.get('permission').indexOf('iprp_goods_trademark_edit') !== -1;
      this.recoverQueryData();
      this.search();
      setTimeout(function(){
        FauxPlaceholder();
      },300)
    },
    methods: {
      putaway(){//上架
        console.log(this.selectedItems)
        let selectedItems = [];
        this.selectedItems.forEach((item,i)=>{
          selectedItems.push(item.id)
        })
        let data = {
          idsStr:selectedItems.toString(),
          groundStatus:1
        }
        console.log(selectedItems.toString())
        this.$http.post(batchUpAndDown, data)
        .then((resp) => {
          this.checkAll = false;
          this.handleAllCheckChange();
          this.search()
        })
        .catch((err) => {
          // this.shopVisible = false;
          this.search()
        });
      },
      soldOut(){//上架
        console.log(this.selectedItems)
        let selectedItems = [];
        this.selectedItems.forEach((item,i)=>{
          selectedItems.push(item.id)
        })
        let data = {
          idsStr:selectedItems.toString(),
          groundStatus:2
        }
        console.log(selectedItems.toString())
        this.$http.post(batchUpAndDown, data)
        .then((resp) => {
          this.checkAll = false;
          this.handleAllCheckChange();
          this.search()
        })
        .catch((err) => {
          // this.shopVisible = false;
          this.search()
        });
      },
      priceStatus(item){//销售状态
        this.memberId = item.id;
        this.radio = item.sale_status;
        this.shopVisible = true;
      },
      setSaleStatus(){//设置销售状态
        let data = {
          id:this.memberId,
          saleStatus:this.radio
        }
        this.$http.post(setTrademarkSaleStatus, data)
        .then((resp) => {
          this.shopVisible = false;
          this.search();
        })
        .catch((err) => {
          this.shopVisible = false;
          this.search();
          console.log(err);
        });
      },
      batchLend(){//批量输入
        this.$router.push({name: 'batchLend'})
      },
      handWork(id){//手工录入
        if(id){
          this.$router.push({name: 'handWorkLend',query:{id:id}});
        }else{
          this.$router.push({name: 'hendEnter',query:{}});
        }
        
      },
      goDetail(id){//详情
        this.$router.push({name: 'publishDetail',params:{id:id}});
      },
      getTmInfo(item){// 大类过滤
        if(item){
          var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
          return str;
        }else{
          var str = '--';
          return str;
        }
      },
      recoverQueryData(){//条件框赋值
        var queryObj = this.queryObj = this.$route.query;
        var typeobj = this.typeobj;
        for (var m in typeobj){
          if (typeobj.hasOwnProperty(m)) {
            typeobj[m] = queryObj[m] ? queryObj[m] - 0 : null;
          }
        }
        this.finished_time = queryObj.registryStartTime && [new Date(queryObj.registryStartTime-0), new Date(queryObj.registryEndTime-86390000)];
        this.payment_time = queryObj.commitStartTime && [new Date(queryObj.commitStartTime-0), new Date(queryObj.commitEndTime-86390000)];

        this.pg_index = queryObj.pg_index ? (queryObj.pg_index<=0 ? 1 : queryObj.pg_index++) : 1;
        console.log(this.pg_index,'当前页码',queryObj.pg_index)
      },
      search(){
        var ret = {}
        if (this.finished_time) {
          ret.registryStartTime = this.finished_time[0] ? new Date(this.finished_time[0]).getTime() : null;
          ret.registryEndTime = this.finished_time[1] ? new Date(this.finished_time[1]).getTime() + 86390000 : null;
        }
        if (this.payment_time) {
          ret.commitStartTime = this.payment_time[0] ? new Date(this.payment_time[0]).getTime() : null;
          ret.commitEndTime = this.payment_time[1] ? new Date(this.payment_time[1]).getTime() + 86390000 : null;
        }
        var data = Object.assign({}, this.typeobj, ret);
        for (var m in data){
          if (data.hasOwnProperty(m)) {
            data[m] = data[m] ? data[m] - 0 : null;//为空数据全部改为null
          }
        }
        ret.pg_index = this.pg_index-1 || 0;//页码从0开始，避免0被改为null
        ret.pg_count = this.pg_count;
        var data = Object.assign({}, this.typeobj, ret);
        this.getOrderList(data);
        this.$router.replace({query: Object.assign({}, data, {selfChange: true})});
      },
      reset(){
        this.typeobj = Object.assign({}, typeobj);
        this.payment_time = '';
        this.finished_time = '';
      },
      handleCurrentChange(val) {
        this.pg_index = val;
        this.search();
      },
      getOrderList(data){
        data = data || {};
        this.loading = true;
        console.log(data)
        this.$http.post(bsOrderListUrl, data)
        .then((resp) => {
          this.loading = false;
          var data = resp.data;
          var dataList = data.elements;
          dataList.forEach((item, i) => {
            var arr = this.selectedItems;
            var idx = this.inArrayOf(arr, item, 'acceptmaterials');
            item.checked = idx != -1;
          });
          this.dataList = dataList || [];
          this.total = data.total_elements;
          this.checkIsAll();
        })
        .catch((err) => {
          this.loading = false;
          this.dataList = [];
          console.log(err);
        });
      },
      view(item){
        this.$router.push({name: 'trademarkDetail', params: {id: item.order_id},query:{}})
      },
      getselectedItemsPropertyByName(name){
        var arr = [];
        var selectedItems = this.selectedItems;
        selectedItems.forEach((item, i) => {
          arr.push(item[name]);
        });
        return arr;
      },
      checkIsAllSelected(){
        var dataList = this.dataList;
        var temp = 0;
        dataList.forEach((item, i) => {
          if (item.checked) {
            temp += 1;
          }
        });
        return temp === dataList.length
      },
      inArrayOf(arr, sortItem, sortName){
        var ret = -1;
        arr.forEach((item, i) => {
          if (item[sortName] == sortItem[sortName]) {
            ret = i;
            return false;
          }
        });
        return ret;
      },
      handleCheckChange(item){
        var arr = this.selectedItems;
        var idx = this.inArrayOf(arr, item, 'acceptmaterials');
        console.log(item)
        if (idx != -1) {
          arr.splice(idx, 1);
        }else{
          arr.push(item);
        }
        if (!item.checked) {
          this.isIndeterminate = false;
        }else if(this.checkIsAllSelected()){
          this.isIndeterminate = false;
        }
        console.log(this.selectedItems)
      },
      checkIsAll(){
        var self = this;
        var arr = this.selectedItems;
        var dataList = this.dataList;
        var ret = true;
        self.isIndeterminate = false;
        self.checkAll = false;
        // 没有获取到数据的时候选择框不选中
        if(dataList.length){
          dataList.forEach((item, i) => {
            var idx = self.inArrayOf(arr, item, 'acceptmaterials');
            if (idx == -1) {
              ret = false;
              return false;
            }
          });
        }else{
          ret = false;
        }
        self.checkAll = ret;
      },
      handleAllCheckChange(){
        this.isIndeterminate = false;
        var self = this;
        var arr = this.selectedItems;
        var dataList = this.dataList;
        //处理选中的数据
        dataList.forEach((item, i) => {
          var idx = self.inArrayOf(arr, item, 'acceptmaterials');
          if (self.checkAll) {
            if(item.sale_status == 3 ||!item.trademark_status){
              item.checked = false;
            }else{
              item.checked = true;
            }
            if (idx == -1) {
              arr.push(item);
            }
          }else{
            item.checked = false;
            if (idx != -1) {
              arr.splice(idx, 1);
            }
          }
        });
      },
    },
    filters: {
      priceType: Filters.priceType,
      saleStatus: Filters.saleStatus,
      priceformat: Filters.priceformat,
    },
    watch:{
      $route(to, from) {
        if (to.query.selfChange) {
          return;
        }
        this.recoverQueryData()
        this.search();
      }
    }
  }
</script>
<style lang='less'>
.trademarkList{
  width: 100%;overflow: hidden;padding-bottom: 20px;
  .condition{
    padding-left: 20px;padding-top: 20px;
    .form_control{float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;position: relative;}
    .form_money{
      float: left;width: 224px;display: inline-block;margin-right: 10px;margin-bottom: 10px;position: relative;
      >span{font-size:20px;vertical-align: bottom;line-height:30px;color:#7f8fa4;}
      .el-input{width:100px;
        span{position: absolute;top:5px;left:10px;color:#999}
      }
    }
    .data_picker{
      width: 230px;
      .el-date-editor--daterange.el-input{
        width: 230px;
      }
    }
    .form_submit{
      float: left;
      button{float: left;width: 88px;height: 30px;line-height: 30px;text-align:center;color:#fff;font-size:14px;border:1px solid #479CFF;background: #479CFF;border-radius: 2px;margin-right: 10px;}
      .reset{background-color: #fff;color:#479CFF;}
      .submit:hover{border-color: #479CFF;background-color: #479CFF;}
      .reset:hover{border-color: #479CFF;color: #479CFF;}
    }
  }
  .result{
    padding: 10px 20px 0 20px;
    .table_handle{
      height: 50px;background: #fff;border: 1px solid #eee;border-bottom:0;padding:14px 0 0;font-size: 16px;color:#eee;line-height: 20px;vertical-align: top;
      .all{
        margin-left: 20px;height: 20px;display: inline-block;
        .el-checkbox{height: 20px;vertical-align: top;}
      }
      .table_handle_btn{margin-left: 20px;margin-right: 20px;padding-left:24px;font-size: 14px;color:#479CFF;display: inline-block;display: inline-block;cursor: pointer;background-size: 16px 17px;}
      .batch {    background: transparent url(~assets/img/goods/putaway.png) 0 center no-repeat;}
      .infoSubmit {    background: transparent url(~assets/img/goods/sholdOut.png) 0 center no-repeat;}
      .btn_trademark{font-size:0;
        button{width:90px;height:28px;border: 1px solid #479CFF;font-size:12px;text-align:center;line-height:28px;color:#479CFF;border-radius:2px;margin-top:-4px;position: relative;
          img{width:32px;height:17px;position: absolute;right:-15px;top:-5px;}
        }
        button:hover{border-color: #479CFF;color: #479CFF;}
      }
    }
    .result_type{
      width:100%;background-color: #F5F5F5;border: 1px solid #eee;
      thead{
        height: 50px;overflow:hidden;border: 1px solid #eee;border-collapse: inherit;
        tr{
          height: 50px;overflow:hidden;
          th{text-align: left;font-size: 13px;color: #666;font-weight: normal;padding:5px 3px;} 
          th.minWidth{min-width: 60px;}
          th.alignc{text-align: center;}
          th.alignr{text-align: right;}
          th.paddingR{padding-right: 10px;}
          th.paddingL{padding-left: 10px;}
          th.minWidth.paddingR{min-width: 70px;}
          th.minWidth.paddingL{min-width: 70px;}
        }
      }
      tbody{
        tr{
          height: 50px;border: 1px solid #eee;background-color: #fff;
          td{
            min-height: 50px;font-size: 13px;color: #333;padding:5px 3px;
            .el-checkbox{position: relative;top: -1px;}
            img{width:50px;height:50px;border: 1px solid #f5f5f5;}
          }
          td.check_wrap{padding-left: 20px;padding-right: 20px;width: 16px;}
          td.minWidth{min-width: 60px;}
          td.alignc{text-align: center;}
          td.alignr{text-align: right;}
          td.paddingR{padding-right: 10px;}
          td.paddingL{padding-left: 10px;}
          td.yijia{color:#36AF47;}
          td.yikoujia{color:#479CFF;}
          td.action{
            a{color: #479CFF;}
            a:hover{text-decoration: none;color: #479CFF;}
          }
          td.pay{color: #36AF47;}
          td.nopay{color: #F64744;}
          td.memo{
            span{display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 78px;}
          }
        }
        tr:hover,tr.hover{
          background-color: #F9F9F9;
        }
        tr.empty{
          .empty_ic{
            height: 200px;text-align: center;padding-top:83px;
            span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; background: transparent url(~assets/img/nulldata.png) 0 center no-repeat;color: #A8AFB5}
          }
          &:hover{background-color: #fff;}
        }
      }
      tfoot{

      }
    }
    .my_loading{border: 1px solid #DFE2E5;height: 200px;margin-top: -1px;margin-bottom: 75px;}
    .tb_pagination{
      padding-top: 10px;
      .el-pagination{padding:0;}
    }
  }

  .distributeDialog{
    // 弹框公用样式继承自common.css
    .el-dialog{
      width: 400px;transform:translate(-50%,-50%);
      .distribute_in{
        h5{font-size: 14px;color: #666;font-weight: normal;}
        .dialog_con_box{
          padding-top: 10px;
          .el-radio-group{line-height: 18px;}
          .el-radio{width: 96px;overflow: hidden;margin-bottom: 8px;}
          .el-radio+.el-radio{margin-left: 0; }
          .el-radio__inner{width: 16px;height: 16px;}
        }
        .el-textarea{margin-top: 10px;}
        >p{text-align: right;padding-top: 10px;}
      }
    }
    .el-radio+.el-radio{margin-left: 40px;}
  }

  .memoDialog{
    .el-dialog{
      width: 500px;height: 256px;
      .el-dialog__title{font-size: 14px;font-weight: normal;color: #333;}
      .el-dialog__headerbtn{font-size: 14px;}
      .el-dialog__body{
        padding:10px 20px;
        h5{font-size: 14px;color: #666;font-weight: normal;}
        .el-textarea{margin-top: 10px;}
      }
    }
  }
  .el-select .el-input .el-input__icon{-ms-transform:translateY(-50%) rotate(180deg) !important;}
.el-pager{max-width:224px;}
}
.dialog_con_box .circular{width: 30px;height: 30px;}

.remark_icon_wrap{
  .remark_icon{
    display:inline-block;background: transparent url(~assets/img/remark.png) 0 center no-repeat;margin-left: 2px;width: 12px;
    &:hover{text-decoration:none;}
  }
}
.popper_remark_icon{
  min-height: 41px;width: 400px;height: 154px;
  p{margin-bottom: 0!important;word-break: break-all;}
}
.el-select-dropdown__item{color:#666}
.distribute_in{
  >span{font-size:12px;color:#999;display:block;}
}
</style>
