import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
var mock = new MockAdapter(axios, { delayResponse: 200 });

console.log(mock)
//上传文件
mock.onPost('./EvidenceController/uploadData.do').reply(200, {
  "url":"http://sebe360test.oss-cn-beijing.aliyuncs.com/14C6DE9E2B5C8BA7B60D3FDC3FE06D48.png"
});

mock.onPost('http://localhost:8081/EvidenceController/uploadData.do').reply(200, {
  "url":"http://sebe360test.oss-cn-beijing.aliyuncs.com/14C6DE9E2B5C8BA7B60D3FDC3FE06D48.png"
});

// 权限
mock.onGet('./api/privilege').reply(200, /* http://testsp.ipsebe.com/iprp_servicer/api/privilege?access_token=iprp_operators_0810d3e742704fd68e0f3fc8ba9dc6bebe14b95a806f45b68befa998499a73a5 */
{
    "operator_id": 74,
    "name": "test004",
    "password": "73882ab1fa529d7273da0db6b49cc4f3",
    "newPassword": null,
    "phone": "14444444444",
    "trueName": "test004",
    "fg_id": 0,
    "fg_name": null,
    "token": "iprp_operators_0810d3e742704fd68e0f3fc8ba9dc6bebe14b95a806f45b68befa998499a73a5",
    "dg_id": 0,
    "dg_name": null,
    "target_id": 88,
    "sp_name": "test004",
    "sp_code": "test004",
    "target_type": 0,
    "is_admin": true,
    "last_login_time": 1506732239205,
    "remark": null,
    "purviews": [
        "iprp_account_config",
        "iprp_admin_manage",
        "iprp_gadmin_manage",
        "iprp_dataGroup_manage",
        "iprp_password_manage",
        "iprp_log_manage",
        "iprp_trade_config",
        "iprp_order_manage",
        "iprp_refund_manage",
        "iprp_servicer_config",
        "iprp_servicer_info_manage",
        "iprp_order_manage_fenpei",
        "iprp_servicer_idcode",
        "iprp_account_bind"
    ],
    "dataGroupDTO": null,
    "create_time": 1501492987000,
    "update_time": 1501492987000,
    "spType": 1,
    "wxAccountSpDTO": null,
    "isBindWxSpAccount": null
}
);


//服务单列表
mock.onGet('./api/findBsOrdersList').reply(200, {
  "pageNo" : 0,
  "pageSize" : 0,
  "total_pages" : 0,
  "total_elements" : 4416,
  "elements" : [ {
    "number" : 1,
    "order_id" : 7348,
    "order_sn" : "001d70929100000",
    "buyer_mobile" : "13646837907",
    "order_amount" : 1400.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506668362000,
    "order_types" : 1,
    "buyer_name" : "ceshi徐晓斐",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标续展",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "服务中",
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15066683616764395"
  }, {
    "number" : 2,
    "order_id" : 7346,
    "order_sn" : "001170929100000",
    "buyer_mobile" : "13601312187",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506656076000,
    "order_types" : 1,
    "buyer_name" : "罗水芳-测",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "服务商已确认商标注册信息",
    "refund_state" : 1,
    "refund_state_description" : "已退款",
    "order_payment_sn" : "15066560760400012"
  }, {
    "number" : 3,
    "order_id" : 7340,
    "order_sn" : "006270928100000",
    "buyer_mobile" : "18518796158",
    "order_amount" : 950.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506600170000,
    "order_types" : 1,
    "buyer_name" : "洪进",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 存证服务包-500次",
    "bs_class_name" : "套餐服务 存证包",
    "order_feedback_state" : "服务完成",
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15066001696808932"
  }, {
    "number" : 4,
    "order_id" : 7338,
    "order_sn" : "001170928100002",
    "buyer_mobile" : "13923092490",
    "order_amount" : 699.00,
    "order_state" : -1,
    "payment_state" : 0,
    "create_time" : 1506588318000,
    "order_types" : 1,
    "buyer_name" : "xmen",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : null,
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15065883174829661"
  }, {
    "number" : 5,
    "order_id" : 7334,
    "order_sn" : "001170928100001",
    "buyer_mobile" : "15167824640",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506569458000,
    "order_types" : 1,
    "buyer_name" : "su",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "待服务",
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15065694584546407"
  }, {
    "number" : 6,
    "order_id" : 7332,
    "order_sn" : "001170928100000",
    "buyer_mobile" : "15167824640",
    "order_amount" : 699.00,
    "order_state" : -1,
    "payment_state" : 0,
    "create_time" : 1506561678000,
    "order_types" : 1,
    "buyer_name" : "su",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : null,
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15065616780436017"
  }, {
    "number" : 7,
    "order_id" : 7328,
    "order_sn" : "001170927100008",
    "buyer_mobile" : "18258135465",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506494475000,
    "order_types" : 1,
    "buyer_name" : " 洪 凯 ",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "商标局已下发受理通知书",
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15064944746206160"
  }, {
    "number" : 8,
    "order_id" : 7326,
    "order_sn" : "001170927100007",
    "buyer_mobile" : "18758362533",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506486648000,
    "order_types" : 1,
    "buyer_name" : "产品部_谢作钱",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "商标局已下发受理通知书",
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15064866477408899"
  }, {
    "number" : 9,
    "order_id" : 7324,
    "order_sn" : "001170927100006",
    "buyer_mobile" : "18758362533",
    "order_amount" : 699.00,
    "order_state" : -1,
    "payment_state" : 0,
    "create_time" : 1506486597000,
    "order_types" : 1,
    "buyer_name" : "产品部_谢作钱",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : null,
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15064865969936713"
  }, {
    "number" : 10,
    "order_id" : 7322,
    "order_sn" : "001170927100005",
    "buyer_mobile" : "13646837907",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506482314000,
    "order_types" : 1,
    "buyer_name" : "ceshi徐晓斐",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "商标局已下发受理通知书",
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15064823135783244"
  }, {
    "number" : 11,
    "order_id" : 7321,
    "order_sn" : "001170927100004",
    "buyer_mobile" : "13646837907",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506482314000,
    "order_types" : 1,
    "buyer_name" : "ceshi徐晓斐",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "商标局已下发受理通知书",
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15064823135479357"
  }, {
    "number" : 12,
    "order_id" : 7320,
    "order_sn" : "001170927100003",
    "buyer_mobile" : "13646837907",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506482314000,
    "order_types" : 1,
    "buyer_name" : "ceshi徐晓斐",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "待服务",
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15064823135174163"
  }, {
    "number" : 13,
    "order_id" : 7319,
    "order_sn" : "001170927100002",
    "buyer_mobile" : "13646837907",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506482314000,
    "order_types" : 1,
    "buyer_name" : "ceshi徐晓斐",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "服务商已接单",
    "refund_state" : 1,
    "refund_state_description" : "已退款",
    "order_payment_sn" : "15064823134862282"
  }, {
    "number" : 14,
    "order_id" : 7318,
    "order_sn" : "001170927100001",
    "buyer_mobile" : "13646837907",
    "order_amount" : 699.00,
    "order_state" : 1,
    "payment_state" : 1,
    "create_time" : 1506482313000,
    "order_types" : 1,
    "buyer_name" : "ceshi徐晓斐",
    "sonOrderCount" : null,
    "order_apply_subject_id" : 429,
    "order_apply_subject_name" : "李锋",
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : "服务商已确认商标注册信息",
    "refund_state" : 0,
    "refund_state_description" : "退款审核中",
    "order_payment_sn" : "15064823134558744"
  }, {
    "number" : 15,
    "order_id" : 7316,
    "order_sn" : "001170927100000",
    "buyer_mobile" : "13646837907",
    "order_amount" : 699.00,
    "order_state" : -1,
    "payment_state" : 0,
    "create_time" : 1506482299000,
    "order_types" : 1,
    "buyer_name" : "ceshi徐晓斐",
    "sonOrderCount" : null,
    "order_apply_subject_id" : null,
    "order_apply_subject_name" : null,
    "bs_name" : " 国内商标注册申请",
    "bs_class_name" : "商标服务 国内商标",
    "order_feedback_state" : null,
    "refund_state" : null,
    "refund_state_description" : null,
    "order_payment_sn" : "15064822990111290"
  } ]
});

//工单列表
mock.onGet('./api/findWorkOrdersList').reply(200, {
  "pageNo": 1,
  "pageSize": 10,
  "total_pages": 1,
  "total_elements": 3,
  "elements": [
      {
          "workOrderId": 1,
          "bsName": "国内商标注册申请",
          "regInfo": "淘宝(9/38/45)",
          "memberName": "张三",
          "memberPhone": "18758268175",
          "confirmTime": 1504244614000,
          "status": 1,
          "registClassNumber": 3,
          "additionItem": 2,
          "additionItemPay": 0
      },
      {
          "workOrderId": 2,
          "bsName": "国内商标注册申请",
          "regInfo": "拾贝(9/38/45)",
          "memberName": "张三",
          "memberPhone": "18758268176",
          "confirmTime": 1506318333000,
          "status": 1,
          "registClassNumber": 3,
          "additionItem": 2,
          "additionItemPay": 0
      },
      {
          "workOrderId": 16,
          "bsName": "国内商标注册申请",
          "regInfo": "狗皮膏药(狗皮膏药(1/19))",
          "memberName": "su",
          "memberPhone": "15167824640",
          "confirmTime": 1506325798000,
          "status": 1,
          "registClassNumber": 2,
          "additionItem": 0,
          "additionItemPay": 3
      }
  ]
});

// 服务单详情
mock.onGet('./api/findBsOrderDetailById').reply(200, {
  "order_id" : 7966,
  "order_sn" : "001170808100040",
  "payment_sn" : "06708206264",
  "bs_name" : " 国内商标注册申请",
  "bs_class_name" : "商标服务 国内商标",
  "order_state" : 0,
  "payment_state" : 0,
  "payment_code" : null,
  "payment_name" : null,
  "payment_amount" : 699.00,
  "order_payment_sn" : null,
  "create_time" : 1502172344000,
  "payment_time" : null,
  "order_feedback_state_code" : null,
  "order_feedback_state" : "服务商已接单",
  "order_feedback_state_xuhao" : 2,
  "next_order_feedback_state" : "服已确认商标注册信息",
  "next_order_feedback_state_xuhao" : 3,
  "refund_state" : 1,
  "refund_state_description" : "已退款",
  "refunds" : [ {
    "refund_id" : 359,
    "refund_data_id" : null,
    "order_id" : 7966,
    "operating_time" : 1503452585000,
    "operating_state_description" : "申请退款",
    "operating_end_state" : 0,
    "operating_end_state_description" : "退款审核中",
    "operator" : "客户",
    "refund_amount" : 699.00,
    "refund_message" : "4354353454535",
    "refund_reason_type_name" : "不想做了",
    "refund_return_message" : "",
    "refund_images" : null,
    "refund_reject_reason_name" : null,
    "refund_evidence" : null
  } ],
  "feedbacks" : [ {
    "order_feedback_id" : 3105,
    "operating_time" : 1501744335000,
    "operating_satrt_state" : "无",
    "operating_end_state" : "服务商已接单",
    "operator" : "caocao",
    "memo" : "",
    "feedback_stage" : 2,
    "feedback_code" : "sbfw_gnsb_zs_ing",
    "type" : 1,
    "state_update_time" : 1507519476000,
    "url" : "http://www.baidu.com"
  } ],
  "memberApplySubject" : {
    "trademarkSubjectId" : 7,
    "memberId" : 3,
    "operatorId" : 19,
    "applyType" : 1,
    "applyAuthor" : 0,
    "applyName" : "严正",
    "applyNameEn" : null,
    "applyNumber" : "330721198711132223",
    "applyPhone" : "18758288823",
    "applyEmail" : null,
    "applyProvinceId" : 6,
    "applyCityId" : 108,
    "applyAreaId" : 1535,
    "applyAreaInfo" : "辽宁省 大连市 普兰店市",
    "applyAddress" : "万虎路182号",
    "applyZipCode" : null,
    "applyFax" : null,
    "createTime" : 1506758528000,
    "updateTime" : 1506758528000,
    "standby1" : "http://www.baidu.com",
    "standby2" : "http://www.sina.com"
  },
  "memberDTO" : {
    "member_id" : 80,
    "member_sn" : "170803005859",
    "email" : null,
    "phone" : "18758268175",
    "password" : "8e543c87d9be7869f666befc9f678e19",
    "new_password" : null,
    "token" : null,
    "nickname" : null,
    "truename" : "曹操",
    "avatar" : null,
    "sex" : 1,
    "birthday" : null,
    "memberIdentificationCard" : null,
    "member_industry" : "",
    "industryName" : null,
    "login_num" : 6,
    "login_time" : 1502172321000,
    "old_login_time" : 1502172321000,
    "login_ip" : "127.0.0.1",
    "old_login_ip" : null,
    "area_id" : null,
    "city_id" : null,
    "province_id" : null,
    "area_info" : null,
    "type" : 0,
    "memberApplication" : null,
    "organization" : {
      "organization_id" : 0,
      "name" : null,
      "remark" : null,
      "parent" : null,
      "childs" : null,
      "create_time" : null,
      "update_time" : null,
      "business" : null
    },
    "memberOrganizationId" : 0,
    "grade_id" : 0,
    "remind" : 0,
    "status" : 1,
    "state_remark" : null,
    "remind_email" : null,
    "remind_phone" : null,
    "member_address" : "",
    "parent" : {
      "member_id" : 0,
      "member_sn" : null,
      "email" : null,
      "phone" : null,
      "password" : null,
      "new_password" : null,
      "token" : null,
      "nickname" : null,
      "truename" : null,
      "avatar" : null,
      "sex" : null,
      "birthday" : null,
      "memberIdentificationCard" : null,
      "member_industry" : null,
      "industryName" : null,
      "login_num" : null,
      "login_time" : null,
      "old_login_time" : null,
      "login_ip" : null,
      "old_login_ip" : null,
      "area_id" : null,
      "city_id" : null,
      "province_id" : null,
      "area_info" : null,
      "type" : null,
      "memberApplication" : null,
      "organization" : null,
      "memberOrganizationId" : null,
      "grade_id" : null,
      "remind" : null,
      "status" : null,
      "state_remark" : null,
      "remind_email" : null,
      "remind_phone" : null,
      "member_address" : null,
      "parent" : null,
      "firstChannel" : null,
      "create_time" : null,
      "update_time" : null,
      "relationId" : null,
      "relationMembers" : null,
      "member_wechat" : null,
      "member_qq" : null,
      "default_apply_subject_type" : null,
      "default_apply_subject_name" : null,
      "isIENine" : false,
      "vipName" : null,
      "wxAccount" : null,
      "openid" : null,
      "wxNickName" : null,
      "isBindWxAccount" : 0,
      "memberLinkman" : null,
      "memberLinkmanMemo" : null,
      "registFrom" : null,
      "resourceType" : null
    },
    "firstChannel" : {
      "channel_id" : 1,
      "code" : "sebe",
      "name" : "拾贝",
      "member_code" : null,
      "member_name" : null,
      "member_info" : null,
      "create_time" : null,
      "update_time" : null
    },
    "create_time" : 1501743129000,
    "update_time" : 1501743138000,
    "relationId" : null,
    "relationMembers" : null,
    "member_wechat" : null,
    "member_qq" : null,
    "default_apply_subject_type" : null,
    "default_apply_subject_name" : null,
    "isIENine" : false,
    "vipName" : null,
    "wxAccount" : null,
    "openid" : null,
    "wxNickName" : null,
    "isBindWxAccount" : 0,
    "memberLinkman" : null,
    "memberLinkmanMemo" : null,
    "registFrom" : 1,
    "resourceType" : null
  },
  "invoice" : {
    "id" : 1,
    "invoiceType" : 1,
    "registPhone" : null,
    "provinceId" : 6,
    "cityId" : 108,
    "areaId" : 1535,
    "areaInfo" : "辽宁省 大连市 普兰店市",
    "address" : "万虎路182号",
    "accountBank" : null,
    "accountNumber" : null,
    "createTime" : 1506758528000,
    "updateTime" : 1506758528000,
    "workOrderId" : 16,
    "invoiceTitle" : "严正",
    "invoiceCode" : null
  },
  "stage" : 2,
  "agentDistributeRecords" : null,
  "isModifyMemo" : 1,
  "orderRemarks" : [ {
    "remark_id" : 1,
    "order_id" : 7966,
    "operator_id" : 1,
    "operator_name" : "罗水芳",
    "content" : "备注测试",
    "create_time" : 1506409311000,
    "update_time" : 1506409314000
  } ],
  "tradeMarkName" : "狗皮膏药",
  "intCls" : 1,
  "group" : "无水氨 010066;无水氨 010066;桌面;",
  "similarTrademark" : "测试商标",
  "registerPassRate" : 23,
  "riskDescRegisterAdvice" : "通不过",
  "itemPrice" : 699.00,
  "itemState" : 0,
  "pic_type" : 2,
  "proxy_url" : "http://www.renren.com",
  "specify_pic_url" : "http://www.qq.com",
  "black_white_pic_url" : "http://www.tengxun.com"
});
// 服务单备注
mock.onGet('./api/OrdersRemarks').reply(200,
    [
    {
        "remark_id": 1,
        "order_id": null,
        "operator_id": null,
        "operator_name": "罗水芳",
        "content": "备注测试",
        "create_time": 1506409311000,
        "update_time": null
    },
    {
        "remark_id": 2,
        "order_id": null,
        "operator_id": null,
        "operator_name": "罗水芳",
        "content": "备注测试",
        "create_time": 1506409532000,
        "update_time": null
    }
]
);
// 服务状态
mock.onGet('./api/findOrderFeedback').reply(200, [ {
"bs_feedback_id" : 506,
"bs_id" : 81,
"name" : "服务完成",
"code" : "bgfw_fxbg_hyfx_finis",
"time" : null,
"create_time" : 1500880576000,
"update_time" : 1500880576000,
"sp_commission_type" : null,
"sp_commission_rate" : null,
"sp_bill_time_type" : null,
"sp_bill_times" : null,
"pe_bill_time_type" : null,
"pe_bill_times" : null,
"bsFeedbackType" : 1,
"refundState" : 1,
"stage" : 3,
"smsPoint" : "server_finished",
"source" : "3"
}, {
"bs_feedback_id" : 508,
"bs_id" : 81,
"name" : "服务中",
"code" : "bgfw_fxbg_hyfx_ing",
"time" : null,
"create_time" : 1500880576000,
"update_time" : 1500880576000,
"sp_commission_type" : null,
"sp_commission_rate" : null,
"sp_bill_time_type" : null,
"sp_bill_times" : null,
"pe_bill_time_type" : null,
"pe_bill_times" : null,
"bsFeedbackType" : 1,
"refundState" : 0,
"stage" : 2,
"smsPoint" : "server_ing",
"source" : "3"
} ]
);
// 尼斯分类
mock.onGet('./api/getNiceClass').reply(200,{
  "pageCount" : 1,
  "total_elements" : 45,
  "elements" : [ {
    "class_id" : 1,
    "class_name" : "01工业化学品"
  }, {
    "class_id" : 2,
    "class_name" : "02颜料油漆"
  }, {
    "class_id" : 3,
    "class_name" : "03日用化学品"
  }, {
    "class_id" : 4,
    "class_name" : "04工业用油"
  }, {
    "class_id" : 5,
    "class_name" : "05医药制剂"
  }, {
    "class_id" : 6,
    "class_name" : "06五金器具"
  }, {
    "class_id" : 7,
    "class_name" : "07机械设备"
  }, {
    "class_id" : 8,
    "class_name" : "08手工用具"
  }, {
    "class_id" : 9,
    "class_name" : "09电子产品"
  }, {
    "class_id" : 10,
    "class_name" : "10医疗用品"
  }, {
    "class_id" : 11,
    "class_name" : "11家用电器"
  }, {
    "class_id" : 12,
    "class_name" : "12运载工具"
  }, {
    "class_id" : 13,
    "class_name" : "13军火烟花"
  }, {
    "class_id" : 14,
    "class_name" : "14珠宝首饰"
  }, {
    "class_id" : 15,
    "class_name" : "15乐器"
  }, {
    "class_id" : 16,
    "class_name" : "16文具用品"
  }, {
    "class_id" : 17,
    "class_name" : "17绝缘材料"
  }, {
    "class_id" : 18,
    "class_name" : "18皮革皮具"
  }, {
    "class_id" : 19,
    "class_name" : "19建筑材料"
  }, {
    "class_id" : 20,
    "class_name" : "20家具工艺"
  }, {
    "class_id" : 21,
    "class_name" : "21日用器具"
  }, {
    "class_id" : 22,
    "class_name" : "22缆绳帐篷"
  }, {
    "class_id" : 23,
    "class_name" : "23纺织纺线"
  }, {
    "class_id" : 24,
    "class_name" : "24床上用品"
  }, {
    "class_id" : 25,
    "class_name" : "25服装鞋帽"
  }, {
    "class_id" : 26,
    "class_name" : "26饰品编带"
  }, {
    "class_id" : 27,
    "class_name" : "27地席墙帷"
  }, {
    "class_id" : 28,
    "class_name" : "28娱乐器械"
  }, {
    "class_id" : 29,
    "class_name" : "29食品调料"
  }, {
    "class_id" : 30,
    "class_name" : "30副食调料"
  }, {
    "class_id" : 31,
    "class_name" : "31林业农业"
  }, {
    "class_id" : 32,
    "class_name" : "32啤酒饮料"
  }, {
    "class_id" : 33,
    "class_name" : "33酒精饮料"
  }, {
    "class_id" : 34,
    "class_name" : "34烟草烟具"
  }, {
    "class_id" : 35,
    "class_name" : "35广告销售"
  }, {
    "class_id" : 36,
    "class_name" : "36金融地产"
  }, {
    "class_id" : 37,
    "class_name" : "37建筑维修"
  }, {
    "class_id" : 38,
    "class_name" : "38通讯服务"
  }, {
    "class_id" : 39,
    "class_name" : "39运输旅游"
  }, {
    "class_id" : 40,
    "class_name" : "40材料处理"
  }, {
    "class_id" : 41,
    "class_name" : "41教育娱乐"
  }, {
    "class_id" : 42,
    "class_name" : "42设计研发"
  }, {
    "class_id" : 43,
    "class_name" : "43餐饮住宿"
  }, {
    "class_id" : 44,
    "class_name" : "44医疗美容"
  }, {
    "class_id" : 45,
    "class_name" : "45法律服务"
  } ]
});
// 小项
mock.onGet('./api/getNiceGroupByClassId').reply(200,{
    "elements": [
        {
            "groupId": "1",
            "groupName": "0101 工业气体，单质",
            "minData": [
                {
                    "groupName": "0102 工业气体，单质",
                    "classId": 1,
                    "classGovenName": "化工产品",
                    "groupId": 1,
                    "minName": "氨*010061",
                    "minId": 1
                },
]
},
{
            "groupId": "群组ID",
            "groupName": "群组名称",
            "minData": [
                {
                    "groupName": "0101 工业气体，单质",
                    "classId": 1,
                    "classGovenName": "化工产品",
                    "groupId": 1,
                    "minName": "小项名称",
                    "minId": "小项ID"
                },
]
}

]
});
// 商标信息
mock.onGet('./api/info_confirm_query').reply(200,{
  "phone" : "13601312187",
  "work_order_id" : 19,
  "confirm_step" : 3,
  "member_truename" : "罗水芳-测试",
  "member_id" : 2,
  "service_order_list" : [ {
    "seq" : "01",
    "id" : 38,
    "order_sn" : "001170719100000",
    "member_truename" : "罗水芳-测试",
    "bs_feedback_name" : "待服务"
  }, {
    "seq" : "02",
    "id" : 39,
    "order_sn" : "001170619100000",
    "member_truename" : "罗水芳-测试",
    "bs_feedback_name" : "待服务"
  } ],
  "trademark_subject" : {
    "apply_type" : 1,
    "apply_name" : "名字",
    "name_en" : "1",
    "apply_number" : "1",
    "apply_phone" : "1",
    "province_id" : null,
    "city_id" : null,
    "area_id" : null,
    "area_info" : "",
    "address" : null,
    "apply_zip_code" : null,
    "standby1" : "http://sebe360test.oss-cn-beijing.aliyuncs.com/F28314DED98F70164412E8B393F3203B.bmp",
    "standby1_file_name" : null,
    "standby2" : "http://sebe360test.oss-cn-beijing.aliyuncs.com/13FCC001B2B04FFDBF9302B279F520E8.pdf",
    "standby2_file_name" : "运维唐园园.pdf"
  },
  "work_order_invoice" : {
    "invoice_type" : null,
    "regist_phone" : null,
    "province_id" : null,
    "city_id" : null,
    "area_id" : null,
    "area_info" : null,
    "address" : null,
    "account_bank" : null,
    "account_number" : null,
    "invoice_title" : null,
    "invoice_code" : null
  },
  "trademark" : {
    "trademark_name" : "淘宝",
    "trademark_desc" : "淘宝商标描述",
    "pic_type" : 1,
    "proxy_url" : "http://sebe360test.oss-cn-beijing.aliyuncs.com/8A4C4D93EA097A07333EC5566539BD0A.jpg",
    "proxy_file_name" : null,
    "specify_pic_url" : "",
    "specify_pic_file_name" : null,
    "black_white_pic_url" : "http://sebe360test.oss-cn-beijing.aliyuncs.com/2971ECBF3FA38CA1429C9C4F2EB0D45C.jpg",
    "black_white_pic_file_name" : null,
    "entrusted_unit" : "杭州拾贝知识产权有限公司"
  },
  "work_order_service" : [ {
    "id" : 38,
    "order_sn" : "001170719100000",
    "similar_trademark" : null,
    "register_pass_rate" : null,
    "risk_desc_register_advice" : null,
    "addition_fee" : null,
    "min_number" : null,
    "class_name" : "01工业化学品",
    "service_nice_min" : [ {
      "min_id" : 1,
      "group_id" : 1,
      "class_id" : 1,
      "min_name" : "无水氨 010066"
    } ]
  }, {
    "id" : 39,
    "order_sn" : "001170619100000",
    "similar_trademark" : null,
    "register_pass_rate" : null,
    "risk_desc_register_advice" : null,
    "addition_fee" : null,
    "min_number" : null,
    "class_name" : "01工业化学品",
    "service_nice_min" : [ {
      "min_id" : 1,
      "group_id" : 1,
      "class_id" : 1,
      "min_name" : "无水氨 010066"
    } ]
  } ]
})
// 填写商标信息
mock.onGet('./api/save_draft').reply(200,{
"work_order_id":16,
"confirm_step":3,
"trademark":{
  "trademark_name":"狗皮膏药",
  "trademark_desc":"治疗跌打损伤，立即见效",
  "pic_type":2,
  "entrusted_unit":"杭州拾贝知识产权有限公司",
  "black_white_pic_url":"http://www.tengxun.com",
  "specify_pic_url":"http://www.qq.com",
  "proxy_url":"http://www.renren.com"},
  "work_order_service_list":[
    {
    "order_sn":"001170822100016",
    "class_name":"草稿中的45大类名",
    "id":28,
    "similar_trademark":"膏药，正宗贴膏",
    "register_pass_rate":95,
    "risk_desc_register_advice":"建议换个商标名称",
    "addition_fee":60,
    "service_nice_min_list":[{"min_id":8998,"group_id":250,"class_id":19,"min_name":"栖木"},{"min_id":9317,"group_id":261,"class_id":20,"min_name":"藤"}]
    },
    {
    "order_sn":"001170822100018",
    "class_name":"草稿中的45大类名",
    "id":29,
    "similar_trademark":"测试商标",
    "register_pass_rate":23,
    "risk_desc_register_advice":"通不过",
    "addition_fee":0,
    "service_nice_min_list":[{"min_id":9417,"group_id":267,"class_id":20,"min_name":"桌面"}]
  }]
});

//商品筛选一级
mock.onGet('./api/businesses_classes').reply(200,
{
  "total_elements" : 13,
  "elements" : [ {
    "bs_class_id" : 1,
    "name" : "商标服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 5,
    "name" : "专利服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 10,
    "name" : "版权服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 13,
    "name" : "其他服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 15,
    "name" : "科技服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 17,
    "name" : "存证服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 19,
    "name" : "广义",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 20,
    "name" : "维权服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 26,
    "name" : "项目申报",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 27,
    "name" : "支付订单",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 29,
    "name" : "报告服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 31,
    "name" : "增值服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  }, {
    "bs_class_id" : 33,
    "name" : "套餐服务",
    "pic" : null,
    "sort" : null,
    "commission_rate" : null,
    "parent_id" : 0
  } ]
});

//商品筛选二级\三级
mock.onGet('./api/product').reply(200, [
	{
	  "name" : "国内商标",
	  "id" : 2
	}, {
	  "name" : "国际商标",
	  "id" : 3
	}, {
	  "name" : "疑难商标",
	  "id" : 4
	}
]);

//商品筛选四级
mock.onGet('./api/getBsFeedbackListByBsId').reply(200,
{
  "code" : 0,
  "data" : [ {
    "bs_feedback_id" : 227,
    "bs_id" : 2,
    "name" : "待服务",
    "code" : "sbfw_gnsb_xzs_wait",
    "time" : null,
    "create_time" : 1500880576000,
    "update_time" : 1500880576000,
    "sp_commission_type" : null,
    "sp_commission_rate" : null,
    "sp_bill_time_type" : null,
    "sp_bill_times" : null,
    "pe_bill_time_type" : null,
    "pe_bill_times" : null,
    "bsFeedbackType" : 1,
    "refundState" : 1,
    "stage" : 1,
    "smsPoint" : null,
    "source" : "0"
  }, {
    "bs_feedback_id" : 228,
    "bs_id" : 2,
    "name" : "服务中",
    "code" : "sbfw_gnsb_xzs_ing",
    "time" : null,
    "create_time" : 1500880576000,
    "update_time" : 1500880576000,
    "sp_commission_type" : null,
    "sp_commission_rate" : null,
    "sp_bill_time_type" : null,
    "sp_bill_times" : null,
    "pe_bill_time_type" : null,
    "pe_bill_times" : null,
    "bsFeedbackType" : 1,
    "refundState" : 1,
    "stage" : 2,
    "smsPoint" : "server_ing",
    "source" : "3"
  }, {
    "bs_feedback_id" : 226,
    "bs_id" : 2,
    "name" : "服务完成",
    "code" : "sbfw_gnsb_xzs_finish",
    "time" : null,
    "create_time" : 1500880576000,
    "update_time" : 1500880576000,
    "sp_commission_type" : null,
    "sp_commission_rate" : null,
    "sp_bill_time_type" : null,
    "sp_bill_times" : null,
    "pe_bill_time_type" : null,
    "pe_bill_times" : null,
    "bsFeedbackType" : 1,
    "refundState" : 1,
    "stage" : 98,
    "smsPoint" : "server_finished",
    "source" : "3"
  }, {
    "bs_feedback_id" : 229,
    "bs_id" : 2,
    "name" : "服务关闭",
    "code" : "sbfw_gnsb_xzs_closed",
    "time" : null,
    "create_time" : 1500880576000,
    "update_time" : 1500880576000,
    "sp_commission_type" : null,
    "sp_commission_rate" : null,
    "sp_bill_time_type" : null,
    "sp_bill_times" : null,
    "pe_bill_time_type" : null,
    "pe_bill_times" : null,
    "bsFeedbackType" : 1,
    "refundState" : 1,
    "stage" : 99,
    "smsPoint" : "closed_remind",
    "source" : "2"
  } ]
});

//获取操作员（分配代理人）
mock.onGet('./api/distributionManFromOrderList').reply(200,
[
    {
        "operator_id": 19,
        "name": "hongkai",
        "password": "21218cca77804d2ba1922c33e0151105",
        "newPassword": null,
        "phone": "18388888888",
        "trueName": "hongkai",
        "fg_id": 72,
        "fg_name": "洪凯功能组",
        "token": null,
        "dg_id": 28,
        "dg_name": "洪凯业务组",
        "target_id": 129,
        "sp_name": null,
        "sp_code": null,
        "target_type": 0,
        "is_admin": true,
        "last_login_time": 1507685694000,
        "remark": null,
        "purviews": [],
        "dataGroupDTO": null,
        "create_time": 1480396911000,
        "update_time": 1480396911000,
        "spType": null,
        "wxAccountSpDTO": null,
        "isBindWxSpAccount": null
    },
    {
        "operator_id": 18,
        "name": "hongkai",
        "password": "21218cca77804d2ba1922c33e0151105",
        "newPassword": null,
        "phone": "18388888888",
        "trueName": "hongkai1",
        "fg_id": 72,
        "fg_name": "洪凯功能组",
        "token": null,
        "dg_id": 28,
        "dg_name": "洪凯业务组",
        "target_id": 129,
        "sp_name": null,
        "sp_code": null,
        "target_type": 0,
        "is_admin": true,
        "last_login_time": 1507685694000,
        "remark": null,
        "purviews": [],
        "dataGroupDTO": null,
        "create_time": 1480396911000,
        "update_time": 1480396911000,
        "spType": null,
        "wxAccountSpDTO": null,
        "isBindWxSpAccount": null
    }
]
);

//分配操作员（分配代理人）
mock.onGet('./api/addOperatorToOrderList').reply(200,
[
    {
        "order_id": 8231,
        "order_sn": "001170823100000",
        "payment_sn": "15034481966495748",
        "channel_id": 1,
        "channel_code": "sebe",
        "channel_name": "拾贝",
        "sp_id": 129,
        "operator_id": 19,
        "operator_name": null,
        "sp_code": "129",
        "sp_name": "129",
        "buyer_id": 5,
        "buyer_mobile": "13646837907",
        "buyer_email": "12@12.com",
        "payment_code": null,
        "payment_time": null,
        "finnshed_time": null,
        "goods_amount": 699,
        "order_amount": 699,
        "payment_amount": 699,
        "pe_amount": 300,
        "sp_amount": 399,
        "sp_num": 1,
        "state": 0,
        "sub_state": "0",
        "sub_state_description": "未付款",
        "from": "1",
        "message": "设置",
        "distribute_type": 1,
        "deposit_sn": null,
        "deposit_amount": null,
        "promotion": 0,
        "promotion_code": null,
        "payment_pe_amount": 300,
        "payment_sp_amount": 399,
        "payment_description": "国内商标注册申请（极速版）商品支付单",
        "channel_order_sn": null,
        "order_closed": 0,
        "order_refunded": 0,
        "order_bs": null,
        "invoice": null,
        "create_time": 1503448197000,
        "update_time": 1503448199000,
        "is_rebuild_sp": null,
        "orderPayDTOs": null,
        "orderPayIsProductService": null,
        "refund_amount": null,
        "pay_pe_amount": null,
        "pay_sp_amount": null,
        "sp_bill_template_id": null,
        "order_types": 1,
        "order_fictitious_sn": "06800704908",
        "order_apply_subject_id": null,
        "order_apply_subject": null,
        "order_apply_subject_name": null,
        "buyer_name": null,
        "sonOrderCount": null,
        "order_feedback_state": null,
        "refund_state": null,
        "refund_state_description": null,
        "payment_state": null,
        "renewalSn": null,
        "orderBussinessType": 1,
        "stage": null,
        "is_contact": null,
        "memo": null,
        "agentDistributeTime": 1507694032893,
        "orderTaskingState": null
    }
]
);

//批量接单
mock.onGet('./api/receiveOrder').reply(200, {}
);

//信息提交
mock.onGet('./api/info_confirm').reply(200, {
  "work_order_id" : 14,
  "confirm_step" : 1
});


//信息提交查询详情
mock.onGet('./api/info_confirm_query').reply(200, {
  "work_order_id" : 14,
  "member_id" : 15,
  "confirm_step" : 1,
  "member_truename" : "su",
  "phone" : "15167824640",
  "service_order_list" : [ {
    "seq" : "01",
    "order_sn" : "001170822100016",
    "member_truename" : "su",
    "bs_feedback_name" : "商标局已下发受理通知书",
    "id" : 24
  }, {
    "seq" : "02",
    "order_sn" : "001170822100018",
    "member_truename" : "su",
    "bs_feedback_name" : "待服务",
    "id" : 25
  } ],
  "trademark": {},
  "work_order_service": {},
  "service_nice_min": {},
	"trademark_subject": {},
	"work_order_invoice": {}
}
);

//存草稿
mock.onPost('./api/save_draft').reply(200, {
	"work_order_id": 14
}
);


//生成电子存证订单
mock.onPost('./EvidenceController/addAttestations.do').reply(200, {
  "code": "0",
  "data": {
    "id": 175,
    "clientType": 1,
    "name": "1",
    "mobile": "1",
    "email": "1",
    "identificationCard": "1",
    "identificationCardCorrect": "1",
    "identificationCardOppsite": "1",
    "source": 2,
    "notarizationType": 1,
    "memberId": 31,
    "orderSn": "00o270412100005",
    "updateTime": "Apr 12, 2017 1:47:33 PM",
    "createTime": "Apr 12, 2017 1:47:33 PM",
    "fileData": [
      "http://sebe360test.oss-cn-beijing.aliyuncs.com/14C6DE9E2B5C8BA7B60D3FDC3FE06D48.png"
    ],
    "notarizationFee": {
      "natorizationMainId": 175,
      "size": 1,
      "fee": 2,
      "orderSn": "00o270412100005",
      "paymentSn": "1491976053406",
      "createTime": "Apr 12, 2017 1:47:33 PM"
    }
  }
}
);

//查询主体列表
mock.onPost('./EvidenceController/findAllByApplyType.do').reply(200, {
  "code": "0",
  "data": [
    {
      "apply_id": 49,
      "member_id": 33,
      "apply_type": 1,
      "is_default": "0",
      "apply_name": "测试1",
      "apply_number": "2",
      "apply_phone": "13",
      "apply_email": "12@12.cn",
      "province_id": "15",
      "city_id": "226",
      "area_id": "2546",
      "area_info": "3",
      "zip_code": "2",
      "create_time": 1494380685000,
      "update_time": 1494381167000
    },
    {
      "apply_id": 50,
      "member_id": 33,
      "apply_type": 1,
      "is_default": "0",
      "apply_name": "测试2",
      "apply_number": "2",
      "apply_phone": "13",
      "apply_email": "12@12.cn",
      "province_id": "15",
      "city_id": "226",
      "area_id": "2546",
      "area_info": "3",
      "zip_code": "2",
      "create_time": 1494380685000,
      "update_time": 1494381167000
    },
    {
      "apply_id": 51,
      "member_id": 33,
      "apply_type": 1,
      "is_default": "0",
      "apply_name": "测试3",
      "apply_number": "2",
      "apply_phone": "13",
      "apply_email": "12@12.cn",
      "province_id": "15",
      "city_id": "226",
      "area_id": "2546",
      "area_info": "3",
      "zip_code": "2",
      "create_time": 1494380685000,
      "update_time": 1494381167000
    }
  ]
});

//支付成功回调
mock.onPost('./EvidenceController/addBaoQuan.do').reply(200, {
  "code":"0"
}
);

//查看订单详情
mock.onPost('./EvidenceController/findEvidenceByOrderSn.do').reply(200, {
  "code": "0",
  "data": {
    "id": 163,
    "clientType": 2,
    "name": "tom",
    "mobile": "18301375890",
    "email": "1",
    "identificationCard": "411522199503056019",
    "identificationCardCorrect": "1",
    "identificationCardOppsite": "1",
    "source": 1,
    "notarizationType": 1,
    "memberId": 33,
    "orderSn": "004270410100011",
    "updateTime": "Apr 10, 2017 4:50:38 PM",
    "createTime": "Apr 10, 2017 4:50:38 PM",
    "notarizationRefList": [
      {
        "id": 168,
        "notarizationMainId": 163,
        "url": "http://sebe360test.oss-cn-beijing.aliyuncs.com/14C6DE9E2B5C8BA7B60D3FDC3FE06D48.png",
        "fileId": "E19B4F23D27343A0A12E456D230D74EE",
        "createTime": "Apr 10, 2017 4:50:38 PM"
      }
    ],
    "notarizationFee": {
      "id": 115,
      "natorizationMainId": 163,
      "size": 1,
      "fee": 10,
      "orderSn": "004270410100011",
      "paymentSn": "1491814238344",
      "payStatus": 0,
      "createTime": "Apr 10, 2017 4:50:38 PM"
    }
  }
});


// 用户订单列表
mock.onPost('./EvidenceController/findAttestations.do').reply(200, {
  "code": "0",
  "data": [
    {
      "id": 121,
      "clientType": 2,
      "name": "tom",
      "mobile": "18301375890",
      "email": "1",
      "identificationCard": "411522199503056019",
      "identificationCardCorrect": "1",
      "identificationCardOppsite": "1",
      "notarizationType": 1,
      "memberId": 33,
      "czyUserId": 4950542,
      "finishTime": "Apr 10, 2017 3:43:02 PM",
      "orderSn": "000b70410100000",
      "czurlCookie": "123",
      "czh": "123",
      "updateTime": "Apr 10, 2017 3:33:41 PM",
      "createTime": "Apr 10, 2017 3:33:45 PM",
      "notarizationRefList": [
        {
          "id": 126,
          "notarizationMainId": 121,
          "url": "http://sebe360test.oss-cn-beijing.aliyuncs.com/14C6DE9E2B5C8BA7B60D3FDC3FE06D48.png",
          "fileId": "asdasda",
          "updateTime": "Apr 10, 2017 3:45:24 PM",
          "createTime": "Apr 10, 2017 3:11:10 PM"
        }
      ]
    },
    {
      "id": 122,
      "clientType": 2,
      "name": "tom",
      "mobile": "18301375890",
      "email": "1",
      "identificationCard": "411522199503056019",
      "identificationCardCorrect": "1",
      "identificationCardOppsite": "1",
      "notarizationType": 1,
      "memberId": 33,
      "orderSn": "000b70410100001",
      "updateTime": "Apr 10, 2017 3:33:41 PM",
      "createTime": "Apr 10, 2017 3:33:41 PM",
      "notarizationRefList": [
        {
          "id": 127,
          "notarizationMainId": 122,
          "url": "http://sebe360test.oss-cn-beijing.aliyuncs.com/14C6DE9E2B5C8BA7B60D3FDC3FE06D48.png",
          "createTime": "Apr 10, 2017 3:11:54 PM"
        }
      ]
    }
  ]
});

// 省市区
mock.onPost('./EvidenceController/areas.do').reply(200, {
  "is_first": true,
  "is_last": true,
  "has_previous": false,
  "has_next": false,
  "index": 0,
  "size": 9999,
  "total_pages": 1,
  "total_elements": 17,
  "elements": [
    {
      "area_id": 37,
      "name": "浙江省",
      "sort": 0,
      "deep": 3,
      "parent": null,
      "childs": null,
      "create_time": 1445235949000,
      "update_time": 1445235949000
    },
    {
      "area_id": 37,
      "name": "杭州",
      "sort": 0,
      "deep": 3,
      "parent": null,
      "childs": null,
      "create_time": 1445235949000,
      "update_time": 1445235949000
    },
    {
      "area_id": 37,
      "name": "西湖区",
      "sort": 0,
      "deep": 3,
      "parent": null,
      "childs": null,
      "create_time": 1445235949000,
      "update_time": 1445235949000
    }

  ]
});


// 申请出证
mock.onPost('./cunnar/applyCunnar.do').reply(200, {
    "code": "0",
    "desc": null,
    "data": true
});


// 支付数据
mock.onPost('./publicinterface/topay.do').reply(200, {
  "msg": "请前台组装Channel，再发起支付请求!",
  "code": "success",
  "data": {
      "order_sn": "000b70410100000",//订单编号
      "payment_sn": "1491808270348",//支付单号
      "channel": "channel",//渠道
      "client_ip": "192.168.1.150",//客户端IP
      "subject": "存证订单",
      "body": "存证订单描述",
      "success_url": "中心平台回调存证前台url地址",
      "timestamp": "1492052062409",//时间戳
      "sign": "be38dc134c75f65737e0329b6121b428",//签名
      "standardPrice": "0.00",//标准价格
      "depositPrice": "0",//定金价格
      "preferentialPrice": "0",
      "payMoney": "0.00",//应付价格
      "createTime": "2017-04-10 15:11:10",
      "payTime": "2017-04-13 10:54:22",
      "paymentsList": [
          {
              "payment_id": 2,
              "code": "alipay_pc_direct",
              "name": "支付宝",
              "config": "",
              "state": 1,
              "create_time": 1472659200000,
              "update_time": 1489568777000
          },
          {
              "payment_id": 3,
              "code": "wx_pub_qr",
              "name": "微信",
              "config": "",
              "state": 1,
              "create_time": 1472659200000,
              "update_time": 1489568785000
          },
          {
              "payment_id": 4,
              "code": "upacp_pc",
              "name": "银联",
              "config": "",
              "state": 1,
              "create_time": 1472659200000,
              "update_time": 1484791537000
          }
      ]
  }
});

