<template>
  <div class="commonList clientServiceOrder">
	  <div class="condition clearfix">
      <div class="form_control">
        <!-- <el-select v-model="dataObj.salesmanId" clearable filterable placeholder="业务员">
				  <el-option v-for="item in ywyList" :key="item.operator_id" :label="item.name" :value="item.operator_id"></el-option>
			  </el-select> -->
        <el-input v-model="dataObj.salesman" placeholder="业务员"></el-input>
      </div>
      <div class="form_control">
        <!-- <el-select v-model="dataObj.agentCommissionerId" clearable filterable placeholder="代理专员">
				  <el-option v-for="item in ywyList" :key="item.operator_id" :label="item.name" :value="item.operator_id"></el-option>
			  </el-select> -->
        <el-input v-model="dataObj.agentCommissioner" placeholder="代理专员"></el-input>
      </div>
      <div class="form_control">
        <!-- <el-select v-model="dataObj.selectDocumentId" clearable filterable placeholder="代理文书">
				  <el-option v-for="item in ywyList" :key="item.operator_id" :label="item.name" :value="item.operator_id"></el-option>
			  </el-select> -->
        <el-input v-model="dataObj.selectDocument" placeholder="代理文书"></el-input>
      </div>
      
      <div class="form_control">
        <!-- <el-input v-model="dataObj.orderSource" placeholder="订单来源"></el-input> -->
        <el-select v-model="dataObj.orderSource" placeholder="订单来源">
          <el-option v-for="item in orderSourcearr" :key="item.id" :label="item.label" :value="item.label">{{item.label}}</el-option>
        </el-select>
      </div>
      <div class="form_control">
        <el-input v-model="dataObj.businessName" placeholder="业务名称"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.contacts" placeholder="联系人"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.contactsPhone" placeholder="联系号码"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.orderNo" placeholder="订单编号"></el-input></div>
      <div class="form_control">
        <el-input v-model="dataObj.serviceNo" placeholder="服务单号"></el-input>
      </div>
      <div class="form_control"><el-input v-model="dataObj.applicant" placeholder="申请人"></el-input></div>
      <div class="form_control"><el-input v-model="dataObj.applicationNo" placeholder="申请号"></el-input></div>
      
			<!-- <div class="form_control data_picker">
				<el-date-picker
		      v-model="createTime"
		      type="daterange"
		      align="right"
		      start-placeholder="添加时间开始"
		      end-placeholder="结束"
		      :picker-options="pickerOptions">
		    </el-date-picker>
	    </div> -->
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset">重置</button>
			</div>
	  </div>

	  <div class="result result_no_check">
      <div class="gongdan">
        <!-- <span  class="eachexportbtn" @click="toaddrecord">新增</span> -->
        <span  class="eachexportbtn" @click.stop="showtransfer">字段显示</span>
        <span  class="eachexportbtn" @click="exportlist" v-if="isexport">导出</span>
        <div v-show="showtrans" class="transer" @click.stop>
          <el-transfer v-model="ziduan" :data="ziduandata" :titles="transtitle" @change="setlist"></el-transfer>
        </div>
      </div>
      <div class="qinquanres" :style="{width: contw+'px'}">
      <table class="result_type">
        <thead>
          <tr class="thead">
            <th>序号</th>
            <th class="comWidth" v-show="ziduan.indexOf(1)>-1">业务员</th>
            <th class="minWidth" v-show="ziduan.indexOf(2)>-1">业务类型</th>
            <th class="comWidth" v-show="ziduan.indexOf(3)>-1">业务名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(4)>-1">客户类型</th>
            <th class="comWidth" v-show="ziduan.indexOf(5)>-1">客户名称</th>
            <th class="comWidth" v-show="ziduan.indexOf(6)>-1">联系人</th>
            <th class="minWidth" v-show="ziduan.indexOf(7)>-1">联系号码</th>
            <th class="minWidth" v-show="ziduan.indexOf(8)>-1">微信号</th>
            <th class="minWidth" v-show="ziduan.indexOf(9)>-1">买家旺旺</th>
            <th class="comWidth" v-show="ziduan.indexOf(10)>-1">邮箱</th>

            <th class="comWidth" v-show="ziduan.indexOf(11)>-1">合同额</th>
            <th class="comWidth" v-show="ziduan.indexOf(12)>-1">服务费</th>
            <th class="maxWidth" v-show="ziduan.indexOf(13)>-1">收款金额</th>
            <th class="comWidth" v-show="ziduan.indexOf(14)>-1">确认收款日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(15)>-1">提交日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(16)>-1">订单来源</th>
            <th class="comWidth" v-show="ziduan.indexOf(17)>-1">订单编号</th>
            <th class="comWidth" v-show="ziduan.indexOf(18)>-1">服务单号</th>
            <th class="minWidth" v-show="ziduan.indexOf(19)>-1">需求编号</th>
            <th class="minWidth" v-show="ziduan.indexOf(20)>-1">申请人</th>

            <th class="minWidth" v-show="ziduan.indexOf(21)>-1">通过率%</th>
            <th class="comWidth" v-show="ziduan.indexOf(22)>-1">抽检员通过率</th>
            <th class="minWidth" v-show="ziduan.indexOf(23)>-1">服务商</th>
            <th class="comWidth" v-show="ziduan.indexOf(24)>-1">代理专员</th>
            <th class="comWidth" v-show="ziduan.indexOf(25)>-1">查询专员</th>
            <th class="comWidth" v-show="ziduan.indexOf(26)>-1">代理文书</th>
            <th class="comWidth" v-show="ziduan.indexOf(27)>-1">申报类别</th>
            <th class="comWidth" v-show="ziduan.indexOf(28)>-1">加项</th>
            <th class="comWidth" v-show="ziduan.indexOf(29)>-1">官费</th>
            <th class="comWidth" v-show="ziduan.indexOf(30)>-1">跨部门激励</th>

            <th class="comWidth" v-show="ziduan.indexOf(31)>-1">优惠金额</th>
            <th class="comWidth" v-show="ziduan.indexOf(32)>-1">实际支付金额</th>
            <th class="comWidth" v-show="ziduan.indexOf(33)>-1">付款日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(34)>-1">付款方式</th>
            <th class="comWidth" v-show="ziduan.indexOf(35)>-1">收款账户</th>
            <th class="comWidth" v-show="ziduan.indexOf(36)>-1">确认收款人</th>
            <th class="comWidth" v-show="ziduan.indexOf(37)>-1">汇款人</th>
            <th class="comWidth" v-show="ziduan.indexOf(38)>-1">计提额</th>
            <th class="comWidth" v-show="ziduan.indexOf(39)>-1">拾贝结算渠道金额</th>
            <th class="comWidth" v-show="ziduan.indexOf(40)>-1">渠道结算拾贝金额</th>

            <th class="comWidth" v-show="ziduan.indexOf(41)>-1">规定完成日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(42)>-1">上传（交付）日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(43)>-1">客户验收日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(44)>-1">申请号</th>
            <th class="comWidth" v-show="ziduan.indexOf(45)>-1">申报时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(46)>-1">申报员</th>
            <th class="comWidth" v-show="ziduan.indexOf(47)>-1">申请号回执单收文</th>
            <th class="comWidth" v-show="ziduan.indexOf(48)>-1">准予注册决定书收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(49)>-1">准予撤回收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(50)>-1">更正商标核准通知书收文日期</th>

            <th class="comWidth" v-show="ziduan.indexOf(51)>-1">核账人</th>
            <th class="comWidth" v-show="ziduan.indexOf(52)>-1">纳税人识别号</th>
            <th class="comWidth" v-show="ziduan.indexOf(53)>-1">开票日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(54)>-1">官费发票号</th>
            <th class="comWidth" v-show="ziduan.indexOf(55)>-1">服务费发票号</th>
            <th class="comWidth" v-show="ziduan.indexOf(56)>-1">发票收件人</th>
            <th class="comWidth" v-show="ziduan.indexOf(57)>-1">发票收件电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(58)>-1">发票收件地址</th>
            <th class="comWidth" v-show="ziduan.indexOf(59)>-1">发票是否邮寄</th>
            <th class="comWidth" v-show="ziduan.indexOf(60)>-1">发票快递单号</th>

            <th class="comWidth" v-show="ziduan.indexOf(61)>-1">发票寄件时间</th>
            <th class="comWidth" v-show="ziduan.indexOf(62)>-1">不予受理收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(63)>-1">不予受理收文通知日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(64)>-1">补正收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(65)>-1">受通收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(66)>-1">缴费通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(67)>-1">受通通知日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(68)>-1">商标审查意见通知书</th>
            <th class="comWidth" v-show="ziduan.indexOf(69)>-1">同日申请补送证据收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(70)>-1">同日申请抽签通知书收文日期</th>

            <th class="comWidth" v-show="ziduan.indexOf(71)>-1">同日申请协商通知书收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(72)>-1">驳回收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(73)>-1">驳回通知日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(74)>-1">初审收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(75)>-1">异议答辩收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(76)>-1">异议决定书收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(77)>-1">不予注册决定收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(78)>-1">商标证收文日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(79)>-1">商标证二次收文</th>
            <th class="comWidth" v-show="ziduan.indexOf(80)>-1">收件人</th>

            <th class="comWidth" v-show="ziduan.indexOf(81)>-1">收件人电话</th>
            <th class="comWidth" v-show="ziduan.indexOf(82)>-1">收件人地址</th>
            <th class="comWidth" v-show="ziduan.indexOf(83)>-1">寄件快递单号</th>
            <th class="comWidth" v-show="ziduan.indexOf(84)>-1">寄件日期</th>
            <th class="comWidth" v-show="ziduan.indexOf(85)>-1">快递公司</th>
            <th class="comWidth" v-show="ziduan.indexOf(86)>-1">经营平台</th>
            <th class="minWidth" v-show="ziduan.indexOf(87)>-1">备注</th>
            <!-- <th class="comWidth" v-show="ziduan.indexOf(88)>-1">涉及人员（业务员+代理专员）</th> -->
            <th class="comWidth alignc">操作</th>
          </tr>
        </thead>
        <tbody class="tr-color">
          <tr v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="index">
            <td>{{item.seqNo}}</td>
            <td v-show="ziduan.indexOf(1)>-1">{{item.salesman}}</td>
            <td v-show="ziduan.indexOf(2)>-1">{{item.businessType}}</td>
            <td v-show="ziduan.indexOf(3)>-1">{{item.businessName}}</td>
            <td v-show="ziduan.indexOf(4)>-1">{{item.customerType}}</td>
            <td v-show="ziduan.indexOf(5)>-1">{{item.customerName}}</td>
            <td v-show="ziduan.indexOf(6)>-1">{{item.contacts}}</td>
            <td v-show="ziduan.indexOf(7)>-1">{{item.contactsPhone}}</td>
            <td v-show="ziduan.indexOf(8)>-1">{{item.wechat}}</td>
            <td v-show="ziduan.indexOf(9)>-1">{{item.buyerWang}}</td>
            <td v-show="ziduan.indexOf(10)>-1">{{item.email}}</td>

            <td v-show="ziduan.indexOf(11)>-1">{{item.contractAmount}}</td>
            <td v-show="ziduan.indexOf(12)>-1">{{item.serviceCharge}}</td>
            <td v-show="ziduan.indexOf(13)>-1">{{item.amountCollected}}</td>
            <td v-show="ziduan.indexOf(14)>-1">{{item.confirmCollectionDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(15)>-1">{{item.submitDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(16)>-1">{{item.orderSource}}</td>
            <td v-show="ziduan.indexOf(17)>-1">{{item.orderNo}}</td>
            <td v-show="ziduan.indexOf(18)>-1">{{item.serviceNo}}</td>
            <td v-show="ziduan.indexOf(19)>-1">{{item.requirementNo}}</td>
            <td v-show="ziduan.indexOf(20)>-1">{{item.applicant}}</td>

            <td v-show="ziduan.indexOf(21)>-1">{{item.passRate}}</td>
            <td v-show="ziduan.indexOf(22)>-1">{{item.passCheckRate}}</td>
            <td v-show="ziduan.indexOf(23)>-1">{{item.serviceProvider}}</td>
            <td v-show="ziduan.indexOf(24)>-1">{{item.agentCommissioner}}</td>
            <td v-show="ziduan.indexOf(25)>-1">{{item.selectCommissioner}}</td>
            <td v-show="ziduan.indexOf(26)>-1">{{item.selectDocument}}</td>
            <td v-show="ziduan.indexOf(27)>-1">{{item.declarationCategory}}</td>
            <td v-show="ziduan.indexOf(28)>-1">{{item.addition}}</td>
            <td v-show="ziduan.indexOf(29)>-1">{{item.officialFees}}</td>
            <td v-show="ziduan.indexOf(30)>-1">{{item.transDepartmentEncourage}}</td>

            <td v-show="ziduan.indexOf(31)>-1">{{item.discountAmount}}</td>
            <td v-show="ziduan.indexOf(32)>-1">{{item.actualPayAmount}}</td>
            <td v-show="ziduan.indexOf(33)>-1">{{item.payTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(34)>-1">{{item.payType}}</td>
            <td v-show="ziduan.indexOf(35)>-1">{{item.collectionAccount}}</td>
            <td v-show="ziduan.indexOf(36)>-1">{{item.confirmPayee}}</td>
            <td v-show="ziduan.indexOf(37)>-1">{{item.remitterChannel}}</td>
            <td v-show="ziduan.indexOf(38)>-1">{{item.jitie}}</td>
            <td v-show="ziduan.indexOf(39)>-1">{{item.sebeSettleChannel}}</td>
            <td v-show="ziduan.indexOf(40)>-1">{{item.channelSettleSebe}}</td>

            <td v-show="ziduan.indexOf(41)>-1">{{item.setCompletionDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(42)>-1">{{item.updateDeliverDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(43)>-1">{{item.customerCheckDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(44)>-1">{{item.applicationNo}}</td>
            <td v-show="ziduan.indexOf(45)>-1">{{item.reportTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(46)>-1">{{item.reporter}}</td>
            <td v-show="ziduan.indexOf(47)>-1">{{item.applicationNoReceipt|dateFormat}}</td>
            <td v-show="ziduan.indexOf(48)>-1">{{item.permitRegisterDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(49)>-1">{{item.permitRecallDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(50)>-1">{{item.updateTrademarkDate|dateFormat}}</td>

            <td v-show="ziduan.indexOf(51)>-1">{{item.auditor}}</td>
            <td v-show="ziduan.indexOf(52)>-1">{{item.taxpayerNumber}}</td>
            <td v-show="ziduan.indexOf(53)>-1">{{item.billingDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(54)>-1">{{item.officialFeesInvoiceNumber}}</td>
            <td v-show="ziduan.indexOf(55)>-1">{{item.serviceChargeInvoiceNumber}}</td>
            <td v-show="ziduan.indexOf(56)>-1">{{item.invoiceRevicer}}</td>
            <td v-show="ziduan.indexOf(57)>-1">{{item.invoiceRevicerPhone}}</td>
            <td v-show="ziduan.indexOf(58)>-1">{{item.invoiceRevicerAddress}}</td>
            <td v-show="ziduan.indexOf(59)>-1">{{item.invoiceWhetherPost}}</td>
            <td v-show="ziduan.indexOf(60)>-1">{{item.invoiceExpressNumber}}</td>

            <td v-show="ziduan.indexOf(61)>-1">{{item.invoicePostTime|dateFormat}}</td>
            <td v-show="ziduan.indexOf(62)>-1">{{item.dismissReceiptDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(63)>-1">{{item.dismissReceiptNoticeDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(64)>-1">{{item.updateReceiptDate}}</td>
            <td v-show="ziduan.indexOf(65)>-1">{{item.acceptReceiptDate}}</td>
            <td v-show="ziduan.indexOf(66)>-1">{{item.payNotice}}</td>
            <td v-show="ziduan.indexOf(67)>-1">{{item.acceptNoticeDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(68)>-1">{{item.trademarkCheckNotice}}</td>
            <td v-show="ziduan.indexOf(69)>-1">{{item.samedaySuppleEvidenceDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(70)>-1">{{item.samedayDrawNoticeDate|dateFormat}}</td>

            <td v-show="ziduan.indexOf(71)>-1">{{item.samedayConsultNoticeDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(72)>-1">{{item.rejectReceiptDate}}</td>
            <td v-show="ziduan.indexOf(73)>-1">{{item.rejectNoticeDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(74)>-1">{{item.firstcheckRejectDate}}</td>
            <td v-show="ziduan.indexOf(75)>-1">{{item.dissentDefenceRejectDate}}</td>
            <td v-show="ziduan.indexOf(76)>-1">{{item.dissentDecisionRejectDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(77)>-1">{{item.refuseRegisterDecisionDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(78)>-1">{{item.trademarkCertificateRejectDate}}</td>
            <td v-show="ziduan.indexOf(79)>-1">{{item.trademarkCertificateSecondDate}}</td>
            <td v-show="ziduan.indexOf(80)>-1">{{item.recevier}}</td>

            <td v-show="ziduan.indexOf(81)>-1">{{item.recevierPhone}}</td>
            <td v-show="ziduan.indexOf(82)>-1">{{item.recevierAddress}}</td>
            <td v-show="ziduan.indexOf(83)>-1">{{item.mailExpressNumber}}</td>
            <td v-show="ziduan.indexOf(84)>-1">{{item.mailDate|dateFormat}}</td>
            <td v-show="ziduan.indexOf(85)>-1">{{item.expressCompany}}</td>
            <td v-show="ziduan.indexOf(86)>-1">{{item.businessPlatform}}</td>
            <td v-show="ziduan.indexOf(87)>-1">{{item.remarks}}</td>
            <!-- <td v-show="ziduan.indexOf(88)>-1">{{item.involvePeople}}</td> -->
            <td class="onlyone">
              <a href="#" class="view"  @click.prevent="edit(item)">详情</a>
              <a href="#" v-if="item.ifOrderFeedbacks" class="view"  @click.prevent="torecord(item.orderId)">办理记录</a>
              <a href="#" v-if="isdelete" class="edit"  @click.prevent="remove(item.id)">删除</a>
              <!-- <a href="#" class="infos"  @click.prevent="edit(item)">详情</a> -->
            </td>
          </tr>
          <tr class="empty" v-show="!loading && !dataList.length">
            <td colspan="90" class="norecord">
              <div class="empty_ic"><span>暂无信息</span></div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="my_loading" v-show="loading" v-loading="loading">
      </div>
      <div class="tb_pagination" v-if="!loading && total>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pgIndex"
          :page-size="pgCount"
          layout="total, prev, pager, next"
          :total="total" class="fr">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
	import qs from 'qs'
  import $ from 'jquery'
  import VueCookie from 'vue-cookie'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	import FauxPlaceholder from 'utils/ie9Placeholder.js'
  const rootUrl = CONFIG.rootUrl;
  
  const delUrl = './api/delTradeMarkById';
  const listUrl = './api/selectTradeMark'
  // 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');

	const dataObj = {//条件数据
    applicationNo: null,
    salesman: null,
    agentCommissioner: null,
    selectDocument:null,
    applicant: null,
    orderNo: null,
    orderSource: null,
    contacts: null,
    contactsPhone: null,
    businessName:null,
    serviceNo:null,
  };
  const orderSourcearr = [
  {id:1,label:'创新保'},
  {id:2,label:'线下'},
  {id:3,label:'拾贝网'},
  {id:4,label:'淘宝服务市场'},
  {id:5,label:'版信通'},
  {id:6,label:'厦门拾贝'},
  {id:7,label:'河南拾贝'},
  {id:8,label:'神州顺利办'},
  {id:9,label:'致胜和'},
  {id:10,label:'拾贝宝'},
  {id:11,label:'易企记'},
  {id:12,label:'瑞富'},
  {id:13,label:'玉养'},
  {id:14,label:'国贝'},
  {id:15,label:'协会'},
  {id:16,label:'信拾贝'},
  {id:17,label:'几美文化'},
  {id:18,label:'临沂彤诺'},
  {id:19,label:'上海单茂'},
  {id:20,label:'福州四叶草'},
  {id:21,label:'郴州百屹'},
  {id:22,label:'侵权伪劣创新联盟'},
  {id:23,label:'福州信和'},
  {id:24,label:'北斗'},
  {id:25,label:'霍尔果斯宝岗分公司'},
  {id:26,label:'山东专利工程总公司'},
  {id:27,label:'内蒙古橙诺'},
  {id:28,label:'港通财务'},
  {id:29,label:'天猫'},
  {id:30,label:'墨烯财税'},
  {id:31,label:'霍尔果斯黄山分公司'},
  {id:32,label:'邓立斌'},
  {id:33,label:'杭州首席财务管理咨询'}
]
  const ziduandata =[
	{key:1,label:'业务员'},
	{key:2,label:'业务类型'},
	{key:3,label:'业务名称'},
	{key:4,label:'客户类型'},
	{key:5,label:'客户名称'},
	{key:6,label:'联系人'},
	{key:7,label:'联系号码'},
	{key:8,label:'微信号'},
	{key:9,label:'买家旺旺'},
  {key:10,label:'邮箱'},
  
	{key:11,label:'合同额'},
  {key:12,label:'服务费'},
  {key:13,label:'收款金额'},
	{key:14,label:'确认收款日期'},
	{key:15,label:'提交日期'},
	{key:16,label:'订单来源'},
	{key:17,label:'订单编号'},
	{key:18,label:'服务单号'},
	{key:19,label:'需求编号'},
  {key:20,label:'申请人'},
  
	{key:21,label:'通过率%'},
  {key:22,label:'抽检员通过率'},
  {key:23,label:'服务商'},
	{key:24,label:'代理专员'},
	{key:25,label:'查询专员'},
	{key:26,label:'代理文书'},
	{key:27,label:'申报类别'},
	{key:28,label:'加项'},
	{key:29,label:'官费'},
  {key:30,label:'跨部门激励'},
  
	{key:31,label:'优惠金额'},
	{key:32,label:'实际支付金额'},
	{key:33,label:'付款日期'},
	{key:34,label:'付款方式'},
  {key:35,label:'收款账户'},
  {key:36,label:'确认收款人'},
	{key:37,label:'汇款人'},
	{key:38,label:'计提额'},
	{key:39,label:'拾贝结算渠道金额'},
  {key:40,label:'渠道结算拾贝金额'},
  
	{key:41,label:'规定完成日期'},
	{key:42,label:'上传（交付）日期'},
	{key:43,label:'客户验收日期'},
	{key:44,label:'申请号'},
  {key:45,label:'申报时间'},
  {key:46,label:'申报员'},
	{key:47,label:'申请号回执单收文'},
	{key:48,label:'准予注册决定书收文日期'},
	{key:49,label:'准予撤回收文日期'},
  {key:50,label:'更正商标核准通知书收文日期'},
  
	{key:51,label:'核账人'},
	{key:52,label:'纳税人识别号'},
	{key:53,label:'开票日期'},
	{key:54,label:'官费发票号'},
	{key:55,label:'服务费发票号'},
	{key:56,label:'发票收件人'},
	{key:57,label:'发票收件电话'},
  {key:58,label:'发票收件地址'},
  {key:59,label:'发票是否邮寄'},
  {key:60,label:'发票快递单号'},
  
  {key:61,label:'发票寄件时间'},
	{key:62,label:'不予受理收文日期'},
	{key:63,label:'不予受理收文通知日期'},
	{key:64,label:'补正收文日期'},
	{key:65,label:'受通收文日期'},
	{key:66,label:'缴费通知书'},
	{key:67,label:'受通通知日期'},
	{key:68,label:'商标审查意见通知书'},
	{key:69,label:'同日申请补送证据收文日期'},
  {key:70,label:'同日申请抽签通知书收文日期'},

  {key:71,label:'同日申请协商通知书收文日期'},
	{key:72,label:'驳回收文日期'},
	{key:73,label:'驳回通知日期'},
	{key:74,label:'初审收文日期'},
	{key:75,label:'异议答辩收文日期'},
	{key:76,label:'异议决定书收文日期'},
	{key:77,label:'不予注册决定收文日期'},
	{key:78,label:'商标证收文日期'},
	{key:79,label:'商标证二次收文'},
  {key:80,label:'收件人'},

  {key:81,label:'收件人电话'},
	{key:82,label:'收件人地址'},
	{key:83,label:'寄件快递单号'},
	{key:84,label:'寄件日期'},
	{key:85,label:'快递公司'},
	{key:86,label:'经营平台'},
	{key:87,label:'备注'},
  // {key:88,label:'涉及人员（业务员+代理专员）'},
  
	
]
  export default {
    name: 'trademarklistcps',
    data() {
      return {
        ziduandata:ziduandata,
        transtitle:['未显示','已显示'],
        ziduan:[1,2,3,4,5,6,7,8,9,10],
        showtrans: false,
      	queryObj: {},
      	dataObj: Object.assign({}, dataObj),
        ywyList:[],
        orderSourcearr: orderSourcearr,
        createTime: '',
        rootUrl: CONFIG.rootUrl,
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
	      dataList:[],
	      pgIndex: 1,
	      pgCount: 10,
	      total:0,
	      loading: false,
        token:'',
      }
    },
    computed:{
      contw(){
        let self = this;
        let lw = self.$store.state.leftmenu.mainMenuW.slice(0,-2)-0 + (self.$store.state.leftmenu.childMenuW.slice(0,-2)-0)
        let rw = self.$store.state.rightContent.width.slice(0,-2)-0
        let cw = window.innerWidth-lw-rw-98;
        console.log(cw)
        return cw
      },
      isexport(){
				return !!store.get('userinfo').enableExport
      },
      isdelete(){
        return !!store.get('userinfo').enableDeletePrivilege 
      }
    },
    mounted() {
      let that = this;
      let getlist = store.get('userdefaulttmlist')||this.ziduan;
      this.ziduan = getlist;
      let el = document.body||document.documentElement;
      el.onclick = function(){
        that.showtrans = false
      }
      // this.findywy()
    	this.recoverQueryData()
    	this.search();
      this.token = VueCookie.get('service_token');

      // let self = this;
      // let lw = self.$store.state.leftmenu.mainMenuW.slice(0,-2)-0 + (self.$store.state.leftmenu.childMenuW.slice(0,-2)-0)
      // let rw = self.$store.state.rightContent.width.slice(0,-2)-0
      // let cw = window.innerWidth-lw-rw-60;
      
      setTimeout(function(){
        
        FauxPlaceholder();
      },300);
      if (location.host.indexOf('sp') === 0) {
      	this.cxbUrl = cxbUrlO;
      }
    },
    methods: {
      torecord(id){
        this.$router.push({name: 'trademarkRecord', params: {id: id}})
      },
      exportlist(){
        let datas = {
          pgIndex: this.pgIndex,
          pgCount: this.pgCount,
        }
        let ret = Object.assign({},this.dataObj,datas)
        let obj = {}
        for(var k in ret){
          if(ret[k]){
            obj[k]=ret[k]
          }
        }
        console.log(obj)
        window.open(this.rootUrl+'/api/exportExcelTradeMark?'+$.param(obj)+'&access_token='+this.token)
      },
      setlist(){
        store.set('userdefaulttmlist',this.ziduan)
      },
      
      showtransfer(){
        this.showtrans = !this.showtrans;
      },
      toaddrecord() {
        this.$router.push({name:'tmadd',params:{id:0}});
      },
      findOrderOriginAll() {
        this.$http.get(orderOriginUrl)
        .then((resp) => {
          var data = resp.data;
          this.orderOriginOptions = data;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      findCustPlatformAll() {
        this.$http.get(custPlatformUrl)
        .then((resp) => {
          var data = resp.data;
          this.custPlatformOptions = data;
        })
        .catch((err) => {
          console.log(err);
        });
      },
      formatTabName(){
        var queryObj = this.queryObj = this.$route.query;
        this.status = queryObj.status;
        var ret = 'all';
        if(this.status == '10'){
          ret = 'toSubmit';
        }else if(this.status == '12'){
          ret = 'platform';
        }else if(this.status == '11'){
          ret = 'finance';
        }else if(this.status == '13'){
          ret = 'pass';
        }
        this.activeName = ret;
      },
      tabClick(tab, event) {
        this.status = '';
        if(tab.name == 'toSubmit'){
          this.status = '10';
        }else if(tab.name == 'platform'){
          this.status = '12';
        }else if(tab.name == 'finance'){
          this.status = '11';
        }else if(tab.name == 'pass'){
          this.status = '13';
        }
        this.search();
      },
    	
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
    		}
    		// this.createTime = queryObj.createTimeStart && [new Date(queryObj.createTimeStart-0), new Date(queryObj.createTimeEnd-86390000)];
    		this.pgIndex = queryObj.pgIndex ? queryObj.pgIndex-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		if (this.createTime) {
	    		ret.createTimeStart = this.createTime[0] ? new Date(this.createTime[0]).getTime() : null;
	    		ret.createTimeEnd = this.createTime[1] ? new Date(this.createTime[1]).getTime() + 86390000 : null;
        }
    		ret.pgIndex = extra ? 1 : this.pgIndex;
    		ret.pgCount = this.pgCount;
        var data = Object.assign({}, this.dataObj, ret);
    		this.getOrderList(data);
    		this.$router.replace({query: Object.assign({}, data)});
    	},
    	reset(){
        this.dataObj = Object.assign({}, dataObj);
        this.orderOriginId = [];
        this.custPlatformId = [];
    		this.createTime = '';
    	},
    	handleCurrentChange(val) {
    		this.pgIndex = val;
    		this.search();
      },
      getOrderList(data){
      	data = data || {};
      	this.loading = true;
      	this.$http.get(listUrl, {params: data})
      	.then((resp) => {
      		this.loading = false;
      		var data = resp.data;
      		var dataList = data.elements;
					/*dataList.forEach((item, i) => {
						var arr = this.selectedItems;
						var idx = this.inArrayOf(arr, item, 'order_sn');
						item.checked = idx != -1;
					});*/
      		this.dataList = dataList;
      		this.total = data.totalElements;
      	})
      	.catch((err) => {
      		this.loading = false;
          this.dataList = [];
          this.$message.error(err.response && err.response.data && err.response.data.msg || '系统繁忙，请稍候再试。')
      		console.log(err);
      	});
      },
      view(item){
        this.$router.push({name:'tmadd',params:{id:item.id}});
      },
      edit(item){
        this.$router.push({name:'tmadd',params:{id:item.id}});
      },
      remove(id){
        let datas = ['确定删除此条数据？','此条数据相关的所有案件材料也将删除。']
        let newdatas = []
        const h = this.$createElement
        datas.forEach(item=> {
          newdatas.push(h('div',null,item))
        })
        this.$confirm('提示', {
          title:'删除提示',
          message: h('div', null, newdatas),
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            id: id
          }
          this.$http.get(delUrl,{params:data})
          .then((resp) => {
            this.$message.success('删除成功!');
            this.search();
          })
          .catch((err) => {
            this.$message.error(err.msg);
          });
        }).catch(() => {
        });
        
      },
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormatYMD,
    },
  }
</script>
<style lang='less'>
.gongdan{
  position:relative;
  padding-top:10px;
  padding-bottom:10px;
  .transer{
    position:absolute; 
    left:0px;
    top: 50px;
    background-color:#fff;
    z-index:999;
  }
  .eachexportbtn{
		display: inline-block;
		width: 88px;
		height: 36px;
		background-color: #20a0ff;
		color: #fff;
		font-size: 14px;
		margin-right: 10px;
		border-radius: 4px;
		text-align: center;
		line-height: 36px;
		cursor: pointer;
		vertical-align: middle;
	}
}

.onlyone{
  text-align: center;
  .infos{
    color:#479CFF
  }
}
.clientServiceOrder{
  .qinquanres{

    max-width: 1526px;
    overflow-x: scroll;
  }
	.result{
		thead{
			tr{
				th:first-child{padding-left: 20px;min-width: 80px;}
				th.createTime{min-width: 150px;}
			}
		}
		tbody{
			tr{
				td:first-child{padding-left: 20px;min-width: 80px;}
				td.action{
					text-align: right;padding-right: 10px;
					a{margin-right: 10px;white-space:nowrap;}
					a:hover{text-decoration: none;color: #387CCC;}
					a.disabled{color: #A8AFB5;}
					a.disabled:hover{cursor: default;text-decoration: none;color: #A8AFB5;}
				}
        td{
          img{width:50px;height: 50px;}
          span{display:inline-block;}
          p{word-break:break-all;}
        }
        // 支付状态
        .noPay{color: #F64744;}
        .payOver{color: #36AF47;}
        // 下载
        .noDown{color: #A8AFB5;}
        .downSuces{color: #479CFF;cursor: pointer;}

				.regInfo{word-break: break-all;display: inline-block;min-width: 100px;}
				.subjectName{word-break: break-all;}
			}
		}
	}
	.confirmD{
		// 弹框公用样式继承自common.css
		.el-dialog{
			width: 500px;transform: translate(-50%, -50%);
      .confirm_data{border: 1px solid #dfe2e5;
        >div{padding: 10px;
          .tit{width:66px;font-size: 13px;color: #223344;}
          .txt{width:345px;font-size: 13px;color: #556677;}
        }
        .confirm_bottom{
        	border-top: 1px solid #dfe2e5;
        	.txt{word-wrap: break-word;}
        }
      }
      p{font-size: 13px;color: #A8AFB5;
        a{color:#479CFF;}
      }
		}
	}
  .confirmC{
    .el-dialog{width: 900px;transform: translate(-50%, -50%);
      .confirm_through{max-height:536px;overflow: auto;
        .tit{background: #F5F5F5;border: 1px solid #DFE2E5;height:40px;overflow: hidden;box-sizing: border-box;
          >div{float: left;line-height: 40px;padding-left: 10px;}
        }
        .txt_lists{
        	width: 100%;
          tr{border:1px solid #DFE2E5;border-top:0;
            td{padding:10px;font-size: 13px;color: #556677;}
          }
        }
        td{word-break: break-all;}
        .td01{width:115px;}
        .td02{width:100px;}
        .td03{width:170px;
          span{display:inline-block;word-wrap: break-word;width:115px;vertical-align: middle;}
          a{display:inline-block;width:20px;vertical-align: middle;}
        }
        .td04{width:100px;}
        .td05{width:100px;text-align:center;}
        .td06{min-width:250px;}
      }
    }
  }
  .confirmB{
    .el-dialog{width: 400px;
      .book_tit{background: #F5F5F5;border: 1px solid #DFE2E5;height:40px;line-height:40px;
        p{width:50%;font-size: 13px;color: #223344;}
        .tit_l{padding-left: 20px;}
        .tit_r{text-align:center;}
      }
      .book_txt{border: 1px solid #DFE2E5;height:40px;line-height:40px;border-top:0;
        >p{width:50%;font-size: 13px;color: #223344;}
        .tit_l{padding-left: 20px;color: #556677;}
        .tit_r{text-align:center;color: #479CFF;
          a{color: #479CFF;text-decoration:none;}
          span{color:#999;display:inline-block;}
        }
      }
    }
  }
  .distributeDialog{
		// 弹框公用样式继承自common.css
		.el-dialog{
			width: 530px;transform:translate(-50%,-50%);min-height: 196px;
			.distribute_in{
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-radio-group{line-height: 18px;}
					.el-radio{width: 144px;overflow: hidden;margin-bottom: 8px; margin-right: 10px;}
					.el-radio+.el-radio{margin-left: 0; }
					.el-radio__inner{width: 16px;height: 16px;}
				}
				.el-textarea{margin-top: 10px;}
				>p{text-align: right;padding-top: 12px;}
			}
		}
	}
}
.commonList .result .result_type tbody tr td.downSuces{color: #479CFF;cursor: pointer;}
</style>
