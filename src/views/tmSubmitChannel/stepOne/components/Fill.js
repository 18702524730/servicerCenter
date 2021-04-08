import Vue from 'vue'
import qs from 'qs'
import uploader from 'cps/uploader/moveuploader.vue'
import FauxPlaceholder from 'utils/ie9Placeholder.js'
import SebeOption from 'cps/select/sebeOption.vue'
import Filters from 'utils/filters/'
import {store} from 'utils/';

const userUrl = CONFIG.userUrl;
// 查询载入工单详情
const queryLoadInfoUrl = './api/queryLoadInfo'
// 智能识别图片数据
const shibieUrl = './api/companyIdentify'
//查询详情
const infoConfirmQueryUrl = './api/channelWorkOrderQuery';
//增加主体模板
const addSubjectUrl = './api/addSubjectByOperator';
//增加发票模板
const addInvoiceUrl = './api/addInvoiceByOperator';
//查询客户的主体模板
const queryMemberSubjectTUrl = './api/getMemberSubject';
//查询服务商的主体模板
const querySpSubjectTUrl = './api/getSpSubject';
//查询客户的发票模板
const queryMemberInvoiceTUrl = './api/getMemberInvoice';
//查询服务商的发票模板
const querySpInvoiceTUrl = './api/getSpInvoice';
//存草稿
const saveDraftUrl = './api/saveChannelWorkOrder';
//省、市、区
const addressUrl = userUrl + '/api/areas';
//国家
const countryUrl = userUrl + '/api/country';
//删除主体模板
const delSubjectUrl = './api/deleteSubjectByOperator';
//删除发票模板
const delInvoiceUrl = './api/deleteInvoiceByOperator';
//订单来源
const orderOriginUrl = './api/findOrderOriginAll';
//客户平台
const custPlatformUrl = './api/findCustPlatformAll'; 
// 业务员列表
const ywyUrl = './api/operatorList'
//主体校验规则
import subjectRules from 'utils/subjectRules.js'
//发票校验规则
import invoiceRules from 'utils/invoiceRules.js'
//用于主体默认值
const RuleForm = {
	apply_id:'',
	apply_type:'',//主体类型
	is_default:0, //是否默认主体
	apply_name:'',//姓名
	name_en:'',//英文名
	apply_number:'',//身份证号或证件号
	apply_phone:'',//手机号或电话
	apply_email:'',//邮箱
	province_id:'',//省id
	city_id:'',//市id
	area_id:'',//区id
	area_info:'', //省市县名称拼接以空格隔开，境外则国家名称以空格隔开
	address:'',//详细地址
	zip_code:'',//邮编
	apply_fax:'',
	standby1:'',
	standby2:'',
	standby1_name:'',
	standby2_name:''
}
//用于发票默认值
const InvoiceForm = {
	member_invoiceId:'',
	is_default:0,
	invoice_type: '',
	invoice_title:'',
	invoice_code:'',
	regist_phone:'',
	invoice_province_id:'',//省id
	invoice_city_id:'',//市id
	invoice_area_id:'',//区id
	invoice_address:'',
	account_bank:'',
	account_number:'',

	send_state: 2,
	send_province_id: '',
	send_city_id: '',
	send_area_id: '',
	send_area_info: '',
	send_address:''
}

export default {
	components: {
		uploader,
		SebeOption
	},
	data() {
		return {
			shibieloading:false,
			checkList: ['选中且禁用','复选框A'],
			isSecRender: false, //是否第一次渲染
			salesman:'',
			agentName:'',
			selectDocument:'',
			contactInfo: {
				orderOriginId:'',
				custPlatformId:'',
				custName:'',
				custPhone:'',
				email:'',
				nickname: '',
				orderAmount: '',
				unitPrice:'',
				discountPrice:'',
				quantity: '',
				orderTime: '',
				payTime:'',
				deliveryTime:'',
				provinceId: '',
				cityId: '',
				areaId:'',
				receiveAddress:'',
				remark: '',
				markSn:'',
				// payType:'',
				salesman:'',
				agentName:'',
				selectDocument:''
			},
			tmFormRules: {
				orderOriginId:[
					{ required: true, message: '请选择订单来源', trigger: 'change' }
				],
				// custPlatformId:[
				// 	{ required: true, message: '请选择客户平台', trigger: 'change' }
				// ],
				custName:[
					{ required: true, message: '请输入客户姓名', trigger: 'blur' }
				],
				custPhone:[
					{ required: true, message: '请输入客户手机号', trigger: 'blur' },
					{ pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号', trigger: 'blur'}
				],
				markSn:[
					{ required: true, message: '请输入平台订单号', trigger: 'blur' }
				],
				nickname:[
					{ required: true, message: '请输入昵称/旺旺', trigger: 'blur' }
				],
				discountPrice:[
					{ required: true, message: '请输入折后价', trigger: 'blur' }
				],
				email:[
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
					{ pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: '请输入有效的邮箱地址', trigger: 'blur'}
				],
				orderAmount:[
					{ required: true, message: '请输入订单金额', trigger: 'blur' },
					{ pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '订单金额应为整数或小数', trigger: 'blur'}
				],
				salesman:[
					{ required: true, message: '请填写业务专员', trigger: 'blur' }
				],
				selectDocument:[
					{ required: true, message: '请填写流程专员', trigger: 'blur' }
				],
				agentName:[
					{ required: true, message: '请填写完成专员', trigger: 'blur' }
				],
				// orderTime:[
				// 	{ required: true, message: '请输入下单时间', trigger: 'blur' }
				// ],
				/*contact_zip_code:[
					{ required: true, message: '请输入邮政编码', trigger: 'blur'},
					{ pattern: /^\d{6}$/, message: '邮政编码仅限6位数字', trigger: 'blur'}
				]*/
			},
			link:'',//载入工单的key
			work_order_service:[],
			trademark:{
				trademarkName:'',
				black_white_pic_url:'',
			},
			reffer:1,//用于步骤条上的返回列表的来源 1：我的服务单列表 2：工单列表
			isTemplateEdit:false,//是否是修改主体模板
			isInvoiceTplEdit:false,//是否是修改发票模板
			isEnTitle: false,//发票抬头是否是英文姓名
			memberSubjectIdx:'',//客户主体模板当前高亮索引
			spSubjectIdx:'',//服务商主体模板当前高亮索引
			spInvoiceIdx:'',//服务商发票模板当前高亮索引
			memberInvoiceIdx:'',//客户发票模板当前高亮索引
			loading:false,//初始loading
			provinceData:[],//主体省数据
			cityData:[],//市数据
			areaData:[],//区数据
			invoice_cityData:[],//发票城市数据
			invoice_areaData:[],//发票区数据
			send_cityData:[],//收发票城市数据
			send_areaData:[],//收发票区数据
			contact_cityData:[],//联系人城市数据
			contact_areaData:[],//联系人区数据
			member_id:'', //工单中的客户id
			apply_type: 2,//主体类型，默认为1大陆个体
			ruleForm: Object.assign({}, RuleForm),//主体表单
			standby1:'',//每类主体的文件url
			standby2:'',
			standby1_name:'',//每类主体的文件name
			standby2_name:'',
			standby1_user:'',//用户提交的
			standby2_user:'',
			invoice_type:1,//发票类型 1为增值税普通发票 2为增值税专用发票
			invoiceForm: Object.assign({}, InvoiceForm),//发票表单
			needInvoice: false,//是否需要开票
			rules:subjectRules.dlqyRules,
			invoiceRules:invoiceRules.invoiceNormRules,

			voucherUrl: '', //支付凭证
			voucherName: '', //支付凭证名称

			work_order_id: '', //工单id
			work_order_sn: '', //工单sn
			workOrderSn:'',
			saveworkOrderSn:'',//存草稿后的sn
			step: 2, //步骤num
			infoDetailData:{},//详情数据

			memberSubjectTData:[],//客户主体模板列表数据
			memberInvoiceTData:[],//客户发票模板列表数据
			spSubjectTData:[],//服务商主体模板列表数据
			spInvoiceTData:[],//服务商发票模板列表数据
			orderOriginOptions: [],//订单来源下拉框数据
			  custPlatformOptions: [],//客户平台下拉框数据
			  shibieloading:false,
			  ywyList:[]
		}
	},
	mounted() {
		this.rules = subjectRules.dlqyRules;
		this.step = this.$route.query.step || 1;
		this.workOrderSn = this.$route.query.workOrderSn || null;
		this.link = this.$route.query.link || null
		this.reffer = this.$route.query.reffer || 1;
		if(!this.workOrderSn&&!this.link){
			let userinfo = store.get('userinfo')
			console.log(userinfo)
			let nowname = userinfo.employee
			this.salesman = nowname;
			this.agentName = nowname;
		}
		
		//获取主体模板
		this.querySpSubjectT();

		this.initProvince();
		//获取订单来源下拉框数据
		this.findOrderOriginAll();
		//获取客户平台下拉框数据
		this.findCustPlatformAll();
		// this.findywy()
		if(this.link){
			this.queryDetailnice();
		}
		if(this.workOrderSn){
			this.queryDetail();
		}
		
		// this.contactInfo.selectDocument= nowname;
	},
	methods: {
		cons(){
			console.log(this.contactInfo.ywy)
		},
		findywy(){
			this.$http.get(ywyUrl).then(res=>{
				this.ywyList = res.data||[];
				
				// this.contactInfo.selectDocumentId = opid;
			})
		},
		findOrderOriginAll() {
        this.$http.get(orderOriginUrl)
        .then((resp) => {
          var data = resp.data;
		  this.orderOriginOptions = data;
		  this.contactInfo.orderOriginId = data[1]['id']
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
		fillAddress(formName, copyFormName, selfPrevfix, copyPrevfix){
			console.log(1111)
			this[formName][selfPrevfix + 'province_id'] = this[copyFormName][copyPrevfix + 'province_id'];
			this[formName][selfPrevfix + 'city_id'] = this[copyFormName][copyPrevfix + 'city_id'];
			this[formName][selfPrevfix + 'area_id'] = this[copyFormName][copyPrevfix + 'area_id'];
			this._triggerChange(this[formName][selfPrevfix + 'province_id'], selfPrevfix + 'cityData');
			this._triggerChange(this[formName][selfPrevfix + 'city_id'], selfPrevfix + 'areaData');
			this[formName][selfPrevfix + 'address'] = this[copyFormName][copyPrevfix + 'address'];
			if (this[copyFormName][copyPrevfix + 'zip_code']) {
				this[formName][selfPrevfix + 'zip_code'] = this[copyFormName][copyPrevfix + 'zip_code']; 
			}
		},
		//reset上传组件
		resetUploader(valueName){
			this[valueName] = '';
			this[valueName+'_name'] = '';
		},
		//上传成功后设置数据
		setUploadedData(data){
			this[data.valueName]= data.data.url;
			this[data.valueName+'_name']= data.data.fileName
		},
		getpicmessage(data,type){
			let info = data ||{};
			if(info.applyName){
				this.ruleForm.apply_name =this.ruleForm.apply_name|| info.applyName;
			}
			if(info.applyNumber){
				this.ruleForm.apply_number = this.ruleForm.apply_number||info.applyNumber;
				if(type==2){
					this.invoiceForm.invoice_code = info.applyNumber
				}
			}
			if(info.zipCode){
				this.ruleForm.zip_code =this.ruleForm.zip_code|| info.zipCode;
			}
			if(info.provinceId){
				this._triggerChange(info.provinceId,  'cityData');
				this.ruleForm.province_id = this.ruleForm.province_id||info.provinceId;
			}
			if(info.cityId){
				this._triggerChange(info.cityId,  'areaData');
				this.ruleForm.city_id = this.ruleForm.city_id||info.cityId;
			}
			if(info.areaId){
				this.ruleForm.area_id =this.ruleForm.area_id|| info.areaId;
			}
			if(info.address){
				this.ruleForm.address =this.ruleForm.address|| info.address;
			}
			if(info.url){
				this.standby1 =info.url;
				this.standby1_name =info.fileName;
			}
			this.$message.warning('识别数据可能有误差，请认真核对')
		},
		setUploadedDataPerson(data){
			if(this[data.valueName]== data.data.url){
				return false
			}else{
				this[data.valueName]= data.data.url;
				this[data.valueName+'_name']= data.data.fileName
				this.getpicmessage(data.data,1)
			}
		},
		setUploadedDataCompany(data){
			if(this[data.valueName]== data.data.url){
				return false
			}else{
				this[data.valueName]= data.data.url;
				this[data.valueName+'_name']= data.data.fileName
				// this.getpicmessage(data.data,2)
			}
		},
		setcompanyinfo(data){
			let info = data ||{};
			if(info.applyName){
				this.ruleForm.apply_name =this.ruleForm.apply_name|| info.applyName;
			}
			if(info.zipCode){
				this.ruleForm.zip_code =this.ruleForm.zip_code|| info.zipCode;
			}
			if(info.address){
				this.ruleForm.address =this.ruleForm.address|| info.address;
			}
			this.$message.warning('识别数据可能有误差，请认真核对')
		},
		getcompanyinfo(){
			if(!this.ruleForm.apply_name){
				this.$message.error("请先输入公司名称再识别")
				return;
			}
			let data = qs.stringify({
				companyName: this.ruleForm.apply_name
			})
			this.shibieloading = true;
			this.$http.post(shibieUrl, data).then(res=>{
				this.getpicmessage(res.data,2)
				this.shibieloading = false;
			}).catch(err=>{
				this.shibieloading = false;
				this.$message.error(err.response.data.msg||'未识别出相关信息')
			})
		},
		//获取当前的发票抬头
		getInvoiceTitle(){
			var ret = this.ruleForm.apply_name;
			var apply_type = this.apply_type;
			if ((apply_type == 3 || apply_type == 4) && this.isEnTitle) {
				ret = this.ruleForm.name_en;
			}
			return ret;
		},
		//保存草稿
		saveDraft(isNext){

			if (this.needInvoice) {
				this.invoiceForm.invoice_type = this.invoice_type;
				this.invoiceForm.invoice_title = this.getInvoiceTitle();
			}
			this.ruleForm.apply_type = this.apply_type;
			this.ruleForm.standby1 = this.standby1;
			this.ruleForm.standby2 = this.standby2;
			this.ruleForm.standby1_name = this.standby1_name;
			this.ruleForm.standby2_name = this.standby2_name;
			
			var datas = {
				workOrderSn: this.saveworkOrderSn|| this.workOrderSn,
				confirmStep: 1,
				trademarkSubject: this.ruleForm,
				workOrderInvoice: Object.assign({}, this.invoiceForm),
				trademark: this.trademark,
				workOrderServiceList: this.work_order_service
			};
			let data = Object.assign({}, datas, this.contactInfo);
			data.salesman = this.salesman;
			data.agentName = this.agentName;
			data.selectDocument = this.selectDocument;
			data.payTime = data.payTime ? new Date(data.payTime).getTime() : null;
			data.orderTime = data.orderTime ? new Date(data.orderTime).getTime() : null;
			data.deliveryTime = data.deliveryTime ? new Date(data.deliveryTime).getTime() : null;
			data.voucherUrl = this.voucherUrl
			if(this.contactInfo.orderOriginId==1||this.contactInfo.orderOriginId==4){
				delete data.markSn
				delete data.nickname
				delete data.deliveryTime
			}
			if(this.contactInfo.orderOriginId==2){
				delete data.deliveryTime
			}
			if(this.contactInfo.orderOriginId==9){
				delete data.voucherUrl
			}
			// data.voucherUrl = this.voucherUrl || null;
			console.log('data---:', data)
			data.trademarkSubject.area_info = this.getAreaInfo(this.ruleForm);

			var workOrderInvoice = data.workOrderInvoice;
			workOrderInvoice.province_id = workOrderInvoice.invoice_province_id;
			workOrderInvoice.city_id = workOrderInvoice.invoice_city_id;
			workOrderInvoice.area_id = workOrderInvoice.invoice_area_id;
			workOrderInvoice.address = workOrderInvoice.invoice_address;
			delete workOrderInvoice.invoice_province_id;
			delete workOrderInvoice.invoice_city_id;
			delete workOrderInvoice.invoice_area_id;
			delete workOrderInvoice.invoice_address;

    	if (isNext) {
    		data.draft_state = 0
    	}else{
    		data.draft_state = 1
    	}
			this.$http.post(saveDraftUrl, data)
			.then((resp) => {
				var data = resp.data;
				let workOrderSn = data.workOrderSn
				let workOrderId = data.workOrderId
				if (!isNext) {
					this.saveworkOrderSn = workOrderSn;
					this.$message.success('保存成功！');
				}else{
					this.$router.push({name: 'stepTwoCh', query: Object.assign({}, this.$route.query, {confirmStep: 2,workOrderSn,workOrderId}) })
				}
			})
			.catch((err) => {
				if (err && err.msg) {
					this.$message.error(err.msg);
				}
			});
		},
		custormAnchor(anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if(anchorElement) { anchorElement.scrollIntoView({
        behavior: 'smooth',
        block:'start'
      }); }
    },
		//点击下一步
		nextTo(){
			var ruleForm = this.ruleForm;
			ruleForm.apply_type = this.apply_type;
			ruleForm.standby1 = this.standby1;
			ruleForm.standby2 = this.standby2;
			ruleForm.area_info = this.getAreaInfo(ruleForm);
			this.$refs['tmForm'].validate((valid) => {
				if (valid) {
					if(this.contactInfo.orderOriginId==1||this.contactInfo.orderOriginId==4){
						if(!this.contactInfo.orderAmount){
							this.$message.warning('请填写订单金额');
							return
						}
						if(!this.contactInfo.quantity){
							this.$message.warning('请填写商标数量');
							return
						}
						if(!this.voucherUrl){
							this.$message.warning('请上传支付凭证');
							return
						}
					}
					if(this.contactInfo.orderOriginId==2){
						if(!this.contactInfo.orderAmount){
							this.$message.warning('请填写订单金额');
							return
						}
						if(!this.contactInfo.quantity){
							this.$message.warning('请填写商标数量');
							return
						}
						if(!this.contactInfo.orderTime){
							this.$message.warning('请填写下单时间');
							return
						}
						if(!this.contactInfo.payTime){
							this.$message.warning('请填写付款时间');
							return
						}
						if(!this.voucherUrl){
							this.$message.warning('请上传支付凭证');
							return
						}
					}
					if(this.contactInfo.orderOriginId==9){
						if(!this.contactInfo.orderAmount){
							this.$message.warning('请填写订单金额');
							return
						}
						if(!this.contactInfo.deliveryTime){
							this.$message.warning('请填写发货时间');
							return
						}
					}
					if(!this.salesman){
						this.$message.warning('请填写业务专员');
						return
					}
					if(!this.agentName){
						this.$message.warning('请填写完成专员');
						return
					}
					if(!this.selectDocument){
						this.$message.warning('请填写流程专员');
						return
					}
					this.$refs['ruleForm'].validate((valid) => {
						if (valid){
							if(!this.ruleForm.zip_code){
								this.$message.warning('请填写邮政编码')
								return false;
							}
							this.$refs['invoiceForm'].validate((valid) => {
								if (valid) {
									this.next();
								} else {
									console.log('error submit!!');
									return false;
								}
							});
						} else {
							this.custormAnchor('main_body')
						}
					});
				} else {
					this.custormAnchor('app')
					console.log('error submit!!');
					return false;
				}
			});
		},
		//点击下一步校验成功后存草稿
		next(){
			var tips = '';
			if (!this.ruleForm.area_id) {
				tips = this.ruleForm.apply_type == 1 ? '申请人地址' : '企业注册地址';
				tips += '还未完整是否仍前往下一步？';
				this.$msgbox({
				title: '提示',
				message: tips,
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消'
				}).then(action => {
				this.saveDraft(true);
				});
			}else{
				this.saveDraft(true); 
			}
		},
		//上一步
		prev(){
			this.$router.go(-1);
		},
		//获取详情数据
		queryDetail(){
			this.loading = true;
			this.$http.get(infoConfirmQueryUrl, {
				params: {
					workOrderSn: this.workOrderSn,
					confirmStep: 1,
				}
			})
			.then((resp) => {
				this.loading = false;
				var data = resp.data;
				this.infoDetailData = data;
				this.contactInfo = {
					orderOriginId: data.orderOriginId,
					custPlatformId:data.custPlatformId,
					custName:data.custName,
					custPhone:data.custPhone,
					email:data.email,
					nickname: data.nickname,
					orderAmount: data.orderAmount,
					unitPrice:data.unitPrice,
					discountPrice:data.discountPrice,
					quantity: data.quantity,
					orderTime: data.orderTime,
					payTime:data.payTime,
					deliveryTime:data.deliveryTime,
					provinceId: data.provinceId,
					cityId: data.cityId,
					areaId:data.areaId,
					address:data.address,
					remark: data.remark,
					markSn:data.markSn,
				};
				let userinfo = store.get('userinfo')
				console.log(userinfo)
				let nowname = userinfo.employee
				this.salesman = nowname;
				this.agentName = nowname;
				if(data.salesman){
					this.salesman = data.salesman;
				}
				if(data.agentName){
					this.agentName = data.agentName;
				}
				if(data.selectDocument){
					this.selectDocument = data.selectDocument;
				}
				this.trademark = data.trademark;
				this.workOrderServiceList = data.workOrderServiceList;
				if(data.provinceId){
					this._triggerChange(this.contactInfo.provinceId, 'contact_cityData');
				}
				if(data.cityId){
					this._triggerChange(this.contactInfo.cityId, 'contact_areaData');
				}
				
				//this.contactInfo.payTime = data.payTime && [new Date(data.payTime-0)];
				this.voucherUrl= data.voucherUrl || null,
				this.member_id = data.member_id;
				if (data && data.trademarkSubject && data.trademarkSubject.apply_type){
					// 1为默认值，不会触发apply_type的watch
					this.apply_type =  data.trademarkSubject.apply_type;
					// this.setForm();
					if (data.trademarkSubject.apply_type == 2) {
						this.setForm();
					}else{
						this.apply_type = data.trademarkSubject.apply_type;
					}
				}
			})
			.catch((err) => {
				this.loading = false;
				console.log(err);
			});
		},
		// 获取载入工单详情
		queryDetailnice(){
			this.loading = true;
			this.$http.get(queryLoadInfoUrl+'/'+this.link)
			.then((resp) => {
				this.loading = false;
				var data = resp.data;
				this.infoDetailData = data;
				this.contactInfo = {
					orderOriginId: data.orderOriginId,
					custPlatformId:data.custPlatformId,
					custName:data.custName,
					custPhone:data.custPhone,
					email:data.email,
					nickname: data.nickname,
					orderAmount: data.orderAmount,
					unitPrice:data.unitPrice,
					discountPrice:data.discountPrice,
					quantity: data.quantity,
					orderTime: data.orderTime,
					payTime:data.payTime,
					deliveryTime:data.deliveryTime,
					provinceId: data.provinceId,
					cityId: data.cityId,
					areaId:data.areaId,
					address:data.address,
					remark: data.remark,
					markSn:data.markSn,
				};
				let userinfo = store.get('userinfo')
				console.log(userinfo)
				let nowname = userinfo.employee
				this.salesman = nowname;
				this.agentName = nowname;
				if(data.salesman){
					this.salesman = data.salesman;
				}
				if(data.agentName){
					this.agentName = data.agentName;
				}
				if(data.selectDocument){
					this.selectDocument = data.selectDocument;
				}
				if(data.provinceId){
					this._triggerChange(this.contactInfo.provinceId, 'contact_cityData');
				}
				if(data.cityId){
					this._triggerChange(this.contactInfo.cityId, 'contact_areaData');
				}
				this.trademark.trademark_name = data.trademarkName;
				this.trademark.black_white_pic_url = data.trademarkUrl;
				let worklist = data.work_order_service;
				let arrservice = [];
				// if(worklist.length<1){
				// 	this.$message.warning('请添加商标类别')
				// 	return false;
				// }
				worklist.forEach(item=>{
					let mindata = item.service_nice_min;
					// if(mindata.length<1){
					// 	this.$message.warning('请完善小项信息')
					// 	return false
					// }
					mindata.forEach(it=>{
						it.class_id = item.class_id
					})
					arrservice.push(item)
				})
				this.workOrderServiceList = arrservice
				//this.contactInfo.payTime = data.payTime && [new Date(data.payTime-0)];
				this.voucherUrl= data.voucherUrl || null,
				this.member_id = data.member_id;
				this.trademarkName = data.trademarkName;
				this.work_order_service = data.work_order_service;
				this.black_white_pic_url=data.trademarkUrl
				if (data && data.trademarkSubject && data.trademarkSubject.apply_type){
					// 1为默认值，不会触发apply_type的watch
					this.apply_type =  data.trademarkSubject.apply_type;
					// this.setForm();
					if (data.trademarkSubject.apply_type == 1) {
						this.setForm();
					}else{
						this.apply_type = data.trademarkSubject.apply_type;
					}
				}
			})
			.catch((err) => {
				this.loading = false;
				console.log(err);
			});
		},
		//获取主体模板列表数据
		querySubjectT(){
			// this.queryMemberSubjectT();
			this.querySpSubjectT();
		},
		//获取发票模板列表数据
		queryInvoiceT(){
			// this.queryMemberInvoiceT();
			this.querySpInvoiceT();
		},
		//设置整个页面表单数据
		setForm(){
			if (this.isSecRender) {
				return;
			}
			this.isSecRender = true;
			var trademarkSubjectData = this.infoDetailData.trademarkSubject;
			var workOrderInvoice = this.infoDetailData.workOrderInvoice;
			var ruleForm = this.ruleForm;
			var invoiceForm = this.invoiceForm;
			if (trademarkSubjectData && trademarkSubjectData.apply_type) {
				//如果当前主体类型和详情数据中的主体类型相同，这儿需要主动去取主体模板
				if (this.apply_type == trademarkSubjectData.apply_type && this.infoDetailData.member_id) {
					this.querySubjectT();
				}
				if(this.apply_type==3|| this.apply_type==4){
					this.initCountry()
				}
				this.apply_type = trademarkSubjectData.apply_type;
				for (var prop in ruleForm) {
					if(ruleForm.hasOwnProperty(prop)) {
						ruleForm[prop] = trademarkSubjectData[prop]
					}
				}
				if (ruleForm.standby1&&ruleForm.standby1.indexOf('pdf')!=-1) {
					this.standby1 = ruleForm.standby1;
					this.standby1_name = ruleForm.standby1_name;
				}
				if (ruleForm.standby2&&ruleForm.standby2.indexOf('pdf')!=-1) {
					this.standby2 = ruleForm.standby2;
					this.standby2_name = ruleForm.standby2_name;
				}
				this.standby1_user = trademarkSubjectData.standby1_user;
				this.standby2_user = trademarkSubjectData.standby2_user;

				if (this.apply_type == 1 || this.apply_type == 2) {
					this._triggerChange(ruleForm.province_id, 'cityData');
					this._triggerChange(ruleForm.city_id, 'areaData');
				}
				
			}else if(this.infoDetailData.member_id){
				this.querySubjectT();
			}
			if (workOrderInvoice && workOrderInvoice.invoice_type) {
				this.needInvoice = true;
				this.invoice_type = this.apply_type == 2 ? workOrderInvoice.invoice_type : 1;
				for (var p in invoiceForm) {
					if(invoiceForm.hasOwnProperty(p) && workOrderInvoice[p]) {
						invoiceForm[p] = workOrderInvoice[p]
					}
				}
				invoiceForm['invoice_province_id'] = workOrderInvoice.province_id;
				invoiceForm['invoice_city_id'] = workOrderInvoice.city_id;
				invoiceForm['invoice_area_id'] = workOrderInvoice.area_id;
				invoiceForm['invoice_address'] = workOrderInvoice.address;
				delete invoiceForm.province_id;
				delete invoiceForm.city_id;
				delete invoiceForm.area_id;
				delete invoiceForm.address;
				if (this.invoice_type == 2) {
					this._triggerChange(invoiceForm.invoice_province_id, 'invoice_cityData');
					this._triggerChange(invoiceForm.invoice_city_id, 'invoice_areaData');
				}

				if (invoiceForm.send_state == 1) {
					this._triggerChange(invoiceForm.send_province_id, 'send_cityData');
					this._triggerChange(invoiceForm.send_city_id, 'send_areaData');
				}
			}
			// 设置联系人信息
			this.contactInfo = Object.assign({}, this.contactInfo, this.infoDetailData.trademark_contact);
			this._triggerChange(this.contactInfo.contact_province_id, 'contact_cityData');
			this._triggerChange(this.contactInfo.contact_city_id, 'contact_areaData');
			//this.contactInfo.contact_address = this.contactInfo.contact_area_info + this.contactInfo.contact_address;
			//this.contactInfo.contact_area_info = '';
			//console.log(this.contactInfo)
		},
		//获取客户发票模板列表
		queryMemberInvoiceT(){
			this.$http.get(queryMemberInvoiceTUrl, {
				params:{
					member_id: this.member_id,
					apply_type: this.invoice_type
				}
			})
			.then((resp) => {
				var data = resp.data;
				this.memberInvoiceTData = data.elements;
			})
			.catch((err) => {
				console.log(err);
			});
		},
		//获取客户主体模板列表
		queryMemberSubjectT(){
			this.$http.get(queryMemberSubjectTUrl, {
				params:{
					member_id: this.member_id,
					apply_type: this.apply_type,
				}
			})
			.then((resp) => {
				var data = resp.data;
				this.memberSubjectTData = data.elements;
			})
			.catch((err) => {
				console.log(err);
			});
		},
		//获取服务商主体模板列表
		querySpSubjectT(){
			this.$http.get(querySpSubjectTUrl, {
				params:{
					member_id: this.member_id,
					apply_type: this.apply_type,
				}
			})
			.then((resp) => {
				var data = resp.data;
				this.spSubjectTData = data.elements;
			})
			.catch((err) => {
				console.log(err);
			});
		},
		//获取服务商发票模板列表
		querySpInvoiceT(){
			this.$http.get(querySpInvoiceTUrl, {
				params:{
					member_id: this.member_id,
					apply_type: this.invoice_type
				}
			})
			.then((resp) => {
				var data = resp.data;
				this.spInvoiceTData = data.elements;
			})
			.catch((err) => {
				console.log(err);
			});
		},
		//隐藏浮框
		hidePop(){
			document.getElementById('app').click();
		},
		//删除主体模板
		delTemplate(apply_id){
			var self = this;
			self.$http.delete(delSubjectUrl+'/'+apply_id)
			.then((response) => {
				var data = response.data;
				this.$message.success('删除成功！');
				this.hidePop();
				this.querySubjectT();
			})
			.catch((error) => {
			});
		},
		//删除发票模板
		delInvoiceTemplate(apply_id){
			var self = this;
			self.$http.delete(delInvoiceUrl+'/'+apply_id)
			.then((response) => {
				var data = response.data;
				this.$message.success('删除成功！');
				this.hidePop();
				this.queryInvoiceT();
			})
			.catch((error) => {
			});
		},
		//检查上传文件的完整性
		checkUploadFile(){
			var apply_type = this.apply_type;
			var ret = true;
			if (apply_type == 1) {
				if (!this.standby1) {
					this.$message.warning('请上传申请人身份证正反面复印件');
					ret = false;
				}
				if (!this.standby2) {
					this.$message.warning('请上传个体工商户营业执照副本复印件');
					ret = false;
				}
			}else if(apply_type == 2){
				if (!this.standby1) {
					this.$message.warning('请上传企业营业执照副本复印件');
					ret = false;
				}
			}else if(apply_type == 3){
				if (!this.standby1) {
					this.$message.warning('请上传申请人护照');
					ret = false;
				}
				if (!this.standby2) {
					this.$message.warning('请上传中文护照译本');
					ret = false;
				}
			}else if(apply_type == 4){
				if (!this.standby1) {
					this.$message.warning('请上传企业登记证件');
					ret = false;
				}
				if (!this.standby2) {
					this.$message.warning('请上传企业登记证件译本');
					ret = false;
				}
			}
			return ret;
		},
		//保存和修改主体模板
		saveSubjectT(formName, isEdit){
			var ruleForm = this.ruleForm;
			ruleForm.apply_type = this.apply_type;
			ruleForm.standby1 = this.standby1;
			ruleForm.standby2 = this.standby2;
			ruleForm.standby1_name = this.standby1_name;
			ruleForm.standby2_name = this.standby2_name;
			ruleForm.area_info = this.getAreaInfo(ruleForm);
			ruleForm.member_id = this.member_id;
			var data = Object.assign({}, ruleForm);
			if (!isEdit) {data.apply_id = ''}
			this.$refs[formName].validate((valid) => {
				if (valid && this.checkUploadFile()) {
					this.$http.put(addSubjectUrl, data)
					.then((response) => {
						var data = response.data;
						this.$message.success(!isEdit ? '保存成功！' : '修改成功！');
						this.querySubjectT();
						this.spSubjectIdx = 0;
					})
					.catch((error) => {
						this.$message.error(error.msg);
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//保存和修改发票模板
		saveInvoiceT(formName, isEdit){
			//var ruleForm = this.ruleForm;
			//ruleForm.apply_type = this.apply_type;
			if (!this.ruleForm.apply_name) {
				this.$message('请先填写主体名称');
				return;
			}
			if (this.apply_type != 2) {return;}
			this.invoiceForm.invoice_type = this.invoice_type;
			this.invoiceForm.invoice_title = this.ruleForm.apply_name;
			this.invoiceForm.member_id = this.member_id;
			if (this.invoice_type == 2){
				this.invoiceForm.area_info = this.getAreaInfo(this.invoiceForm, 'invoice_');
			}
			if (this.invoiceForm.send_state == 1){
				this.invoiceForm.send_area_info = this.getAreaInfo(this.invoiceForm, 'send_');
			}else{
				this.invoiceForm.send_area_info = '';
			}
			this.invoiceForm.invoice_title = this.ruleForm.apply_name;
			var data = Object.assign({}, this.invoiceForm);
			if (!isEdit) {
				data.member_invoiceId = null
				if (this.invoice_type == 1) {
					data.province_id = null;
					data.city_id = null;
					data.area_id = null;
				}
			}
			data.province_id = data.invoice_province_id || null;
			data.city_id = data.invoice_city_id || null;
			data.area_id = data.invoice_area_id || null;
			data.address = data.invoice_address || null;
			delete data.invoice_province_id;
			delete data.invoice_city_id;
			delete data.invoice_area_id;
			delete data.invoice_address;

			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$http.put(addInvoiceUrl, data)
					.then((response) => {
						var data = response.data;
						this.$message.success(!isEdit ? '保存成功！' : '修改成功！');
						this.queryInvoiceT();
						this.spInvoiceIdx = 0;
					})
					.catch((error) => {
						this.$message.error(error.msg);
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		//reset主体表单
		resetRuleForm(){
			this.ruleForm = Object.assign({}, RuleForm);
			this.standby1 = '';
			this.standby2 = '';
			this.standby1_name = '';
			this.standby2_name = '';
			this.cityData = [];
			this.areaData = [];
			this.isTemplateEdit = false;
		},
		//reset发票表单
		resetInvoiceForm(){
			this.invoiceForm = Object.assign({}, InvoiceForm);
			this.invoice_cityData = [];
			this.invoice_areaData = [];
		},
		//保存模板
		saveT(formName, isEdit){
			if (formName == 'ruleForm') {
				this.saveSubjectT(formName, isEdit);
			}else if(formName == 'invoiceForm') {
				this.saveInvoiceT(formName, isEdit);
			}
		},
		//初始化国家
		initCountry(){
			var self = this;
			this.$http.get(countryUrl).then(function(resp){
				self.areaData = resp.data;
			})
			.catch((error) => {
				console.error(error);
			});
		},
		// 初始化省份
		initProvince(){
			var self = this;
			this.$http.get(addressUrl+'?pId=0')
			.then(function(resp){
				resp = resp.data;
				if(resp.elements){
					self.provinceData = resp.elements;
				}else {
					console.error(resp.msg);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		},
		// 省份切换渲染城市 城市切换渲染区
		_triggerChange (code, dataName, callback){
			var self = this;
			self[dataName] = [];
			if(!code){
				return;
			}
			this.$http.get(addressUrl+'?pId='+ code)
			.then(function(resp){
				resp = resp.data;
				if(resp.elements){
					self[dataName] = resp.elements;
					callback && callback();
				}else {
					console.error(resp.msg);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		},
		//更改省
		changeProvince(formName, provinceCode, prevfix){
			if(prevfix=='contact_'){
				var areaIdName = 'areaId';
				var cityIdName = 'cityId';
				this[formName][areaIdName] = '';
				this[formName][cityIdName] = '';
				this._triggerChange(provinceCode,  'contact_cityData');
			}else{
				var areaIdName = (prevfix ? prevfix : '') + 'area_id';
				var cityIdName = (prevfix ? prevfix : '') + 'city_id';
				this[formName][areaIdName] = '';
				this[formName][cityIdName] = '';
				this._triggerChange(provinceCode,  (prevfix ? prevfix : '') + 'cityData');
			}
			
		},
		//更改市
		changeCity(formName, cityCode, prevfix){
			if(prevfix=='contact_'){
				var areaIdName ='areaId';
				this[formName][areaIdName] = '';
				this._triggerChange(cityCode, 'contact_areaData');
			}else{
				var areaIdName = (prevfix ? prevfix : '') + 'area_id';
				this[formName][areaIdName] = '';
				this._triggerChange(cityCode, (prevfix ? prevfix : '') + 'areaData');
			}
			
		},
		//获取选中的省市区对应的中文名称
		getSelectName (code, dataName){
			var self = this;
			var apply_type = this.apply_type;
			var data = self[dataName];
			var ret = '';
			if (apply_type == 1 || apply_type == 2) {
				data.forEach((item, i) => {
					if (item.area_id == code) {
						ret = item.name;
						return false;
					}
				});
			}else{
				data.forEach((item, i) => {
					if (item.country_id == code) {
						ret = item.zh_name;
						return false;
					}
				});
			}
			return ret;
		},
		//地址拼接area_info
		getAreaInfo(data, prevfix){
			var apply_type = this.apply_type;

			var area_id = data[(prevfix ? prevfix : '') + 'area_id'];
			if (apply_type == 1 || apply_type == 2) {
				var province_id = data[(prevfix ? prevfix : '') + 'province_id'];
				var city_id = data[(prevfix ? prevfix : '') + 'city_id'];
				var arr = [this.getSelectName(province_id, 'provinceData'), this.getSelectName(city_id, (prevfix ? prevfix : '') + 'cityData')];
				if (area_id) {
					arr.push(this.getSelectName(area_id, (prevfix ? prevfix : '') + 'areaData'));
				}
				return arr.join(' ');
			}else{
				return [this.getSelectName(area_id, (prevfix ? prevfix : '') + 'areaData')].join(' ');
			}
		},
		//选中模板设置主体表单
		setCurSubject(item, idxName, index){
			this.ruleForm = Object.assign({}, item);
			this._triggerChange(this.ruleForm.province_id, 'cityData');
			this._triggerChange(this.ruleForm.city_id, 'areaData');
			this.initCountry()
			this.apply_type = item.apply_type;
			this.standby1 = item.standby1;
			this.standby2 = item.standby2;
			this.standby1_name = item.standby1_name;
			this.standby2_name = item.standby2_name;
			this.initSubjectIdx();
			this[idxName] = index;
			/*this.$nextTick(() => {
				this.ruleForm.city_id = item.city_id;
				this.$nextTick(() => {
					this.ruleForm.area_id = item.area_id;
				});
      });*/
			//this.$refs.ruleForm.validate();
		},
		//选中模板设置发票表单
		setCurInvoice(item, idxName, index){
			if (item.invoice_title != this.ruleForm.apply_name) {
				this.$message.error('主体的企业名称与发票抬头不一致');
				return;
			}
			let invoiceForm = this.invoiceForm = Object.assign({}, InvoiceForm, item);
			invoiceForm.invoice_province_id = item.province_id;
			invoiceForm.invoice_address = item.address;

			this.invoice_type = item.invoice_type;
			this.initInvoiceIdx();
			this[idxName] = index;

			if (this.invoice_type == 2) {
				/*this.$nextTick(() => {
					this.invoiceForm.invoice_city_id = item.city_id;
					this.$nextTick(() => {
						this.invoiceForm.invoice_area_id = item.area_id;
						delete invoiceForm.province_id;
						delete invoiceForm.city_id;
						delete invoiceForm.area_id;
						delete invoiceForm.address;
					});
	      });*/
	      let pre = 'invoice_';
	      this.invoiceForm.invoice_city_id = item.city_id;
	      this.invoiceForm.invoice_area_id = item.area_id;
				delete invoiceForm.province_id;
				delete invoiceForm.city_id;
				delete invoiceForm.area_id;
				delete invoiceForm.address;
	      this._triggerChange(this.invoiceForm[pre + 'province_id'], pre + 'cityData');
				this._triggerChange(this.invoiceForm[pre + 'city_id'], pre + 'areaData');
      }
      if (item.send_state == 1) {
      	/*this.$nextTick(() => {
					this.invoiceForm.send_city_id = item.send_city_id;
					this.$nextTick(() => {
						this.invoiceForm.send_area_id = item.send_area_id;
					});
	      });*/
	      let pre = 'send_';
	      this.invoiceForm.send_city_id = item.send_city_id;
	      this.invoiceForm.send_area_id = item.send_area_id;
	      this._triggerChange(this.invoiceForm[pre + 'province_id'], pre + 'cityData');
				this._triggerChange(this.invoiceForm[pre + 'city_id'], pre + 'areaData');
      }
			//this.$refs.invoiceForm.validate();
		},
		//切换主体类型，更换主体表单的校验规则
		changeRules(){
			var apply_type = this.apply_type;
			
			if (apply_type == 1) {
				this.rules = subjectRules.dlgtRules;
			}else if(apply_type == 2){
				this.rules = subjectRules.dlqyRules;
			}else if(apply_type == 3){
				this.rules = subjectRules.gatgrRules;
			}else if(apply_type == 4){
				this.rules = subjectRules.gatqyRules;
			}
		},
		//初始化选中右侧主体模板的索引
		initSubjectIdx(){
			this.memberSubjectIdx = '';
			this.spSubjectIdx = '';
		},
		//初始化选中右侧发票模板的索引
		initInvoiceIdx(){
			this.memberInvoiceIdx = '';
			this.spInvoiceIdx = '';
		}
	},
	filters: {
		dateFormat: Filters.formatDate.dateFormat,
		orderStatusformat: Filters.orderStatusformat,
		payStatusformat: Filters.payStatusformat,
		subjectTypeFormat:Filters.subjectTypeFormat,
		invoiceTypeFormat:Filters.invoiceTypeFormat,
	},
	watch: {
		//监控主体类型切换
		apply_type(){
			var apply_type = this.apply_type;
			if (apply_type == 3 || apply_type == 4) {
				this.initCountry();
			}else if ((apply_type == 1 || apply_type == 2) && !this.provinceData.length) {
				this.initProvince();
			}
			//更换校验规则
			this.changeRules();

			//初始化选中右侧主体模板的索引
			this.initSubjectIdx();
			//初始化选中右侧发票模板的索引
			this.initInvoiceIdx();
			//加载相应的主体模板
			this.querySubjectT();

			//存在已有数据时，直接填充表单
			var infoDetailData = this.infoDetailData;
			if (infoDetailData && infoDetailData.trademarkSubject && infoDetailData.trademarkSubject.apply_type==apply_type) {
				this.setForm();
				return;
			}

			
			//否则清空表单
			this.resetRuleForm();
			this.resetInvoiceForm();
			setTimeout(() => {
				this.$refs['ruleForm'].resetFields();
			}, 100)

		},
		//监控主体是否有apply_id，有则为修改主体模板，否则是新增主体模板
		'ruleForm.apply_id': function(){
			if (this.ruleForm.apply_id) {
				this.isTemplateEdit = true
			}else{
				this.isTemplateEdit = false
			}
		},
		//监控发票是否有id，有则为修改发票模板，否则是新增发票模板
		'invoiceForm.member_invoiceId': function(){
			if (this.invoiceForm.member_invoiceId) {
				this.isInvoiceTplEdit = true
			}else{
				this.isInvoiceTplEdit = false
			}
		},
		//监控是否需要开票
		needInvoice(){
			if (this.needInvoice && this.apply_type==2) {
				this.queryInvoiceT();
			}
			if (!this.needInvoice) {
				this.resetInvoiceForm();
			}
		},
		//监控发票类型切换
		invoice_type(){
			this.initInvoiceIdx();
			if (this.needInvoice && this.apply_type==2) {
				this.queryInvoiceT();
			}
			if (this.invoice_type == 1) {
				this.invoiceRules = invoiceRules.invoiceNormRules;
				if (this.invoiceForm.send_state == 1) {
					this.invoiceRules = Object.assign({}, this.invoiceRules, invoiceRules.invoiceSendRules);
				}else{
					this.invoiceRules = Object.assign({}, this.invoiceRules);
				}
			}else if(this.invoice_type == 2){
				this.invoiceRules = invoiceRules.invoiceSpecRules;
				if (this.invoiceForm.send_state == 1) {
					this.invoiceRules = Object.assign({}, this.invoiceRules, invoiceRules.invoiceSendRules);
				}else{
					this.invoiceRules = Object.assign({}, this.invoiceRules);
				}
			}
		},
		//是否需要寄送
		'invoiceForm.send_state': function(){
			var _invoiceRules = this.invoice_type == 1 ? invoiceRules.invoiceNormRules : invoiceRules.invoiceSpecRules;
			if (this.invoiceForm.send_state == 1) {
				this.invoiceRules = Object.assign({}, _invoiceRules, invoiceRules.invoiceSendRules);
				console.log(this.invoiceRules)
			}else if(this.invoiceForm.send_state == 2){
				this.invoiceRules = Object.assign({}, _invoiceRules);
			}
		},
	}
}
