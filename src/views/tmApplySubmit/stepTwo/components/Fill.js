import Vue from 'vue'
import qs from 'qs'
import uploader from 'cps/uploader/uploader.vue'
import FauxPlaceholder from 'utils/ie9Placeholder.js'
import SebeOption from 'cps/select/sebeOption.vue'
import Filters from 'utils/filters/'
const userUrl = CONFIG.userUrl;
//查询详情
const infoConfirmQueryUrl = './api/info_confirm_query';
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
const saveDraftUrl = './api/save_draft';
//省、市、区
const addressUrl = userUrl + '/api/areas';
//国家
const countryUrl = userUrl + '/api/country';
//删除主体模板
const delSubjectUrl = './api/deleteSubjectByOperator';
//删除发票模板
const delInvoiceUrl = './api/deleteInvoiceByOperator';
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
	province_id:'',//省id
	city_id:'',//市id
	area_id:'',//区id
	address:'',
	account_bank:'',
	account_number:''
}
export default {
	components: {
		uploader,
		SebeOption
	},
	data() {
		return {
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
			member_id:'', //工单中的客户id
			apply_type: 1,//主体类型，默认为1大陆个体
			ruleForm: Object.assign({}, RuleForm),//主体表单
			standby1:'',//每类主体的文件url
			standby2:'',
			standby1_name:'',//每类主体的文件name
			standby2_name:'',
			invoice_type:1,//发票类型 1为增值税普通发票 2为增值税专用发票
			invoiceForm: Object.assign({}, InvoiceForm),//发票表单
			needInvoice: false,//是否需要开票
			rules:subjectRules.dlgtRules,
			invoiceRules:invoiceRules.invoiceNormRules,

			work_order_sn: '', //工单id
			confirm_step: 2, //步骤num
			infoDetailData:{},//详情数据

			memberSubjectTData:[],//客户主体模板列表数据
			memberInvoiceTData:[],//客户发票模板列表数据
			spSubjectTData:[],//服务商主体模板列表数据
			spInvoiceTData:[],//服务商发票模板列表数据
		}
	},
	mounted() {
		this.rules = subjectRules.dlgtRules;
		this.confirm_step = this.$route.query.confirm_step;
		this.work_order_sn = this.$route.query.work_order_sn;
		this.reffer = this.$route.query.reffer || 1;
		this.queryDetail();
		//默认apply_type=1，大陆个体
		this.initProvince();
	},
	methods: {
		querySearch(queryString, cb){//企业名称匹配
			console.log(queryString)
			let results = []
			if(queryString.length >= 4){
				this.$http.get('./api/selectCompanyInfoName?companyName='+queryString)
				.then((resp)=>{
					results = resp.data.data;
					results.forEach((item)=>{
						item.value = item.ENTNAME;
					})
					cb(results);
				})
			}else{
				// results = queryString;
				cb(results);
			}
		},
		handleSelect(item){//点击匹配企业名称时候触发
			console.log(item);
		},
		fillAddress(formName, copyFormName, selfPrevfix, copyPrevfix, hackPrevfix){
			this[formName][selfPrevfix + 'province_id'] = this[copyFormName][copyPrevfix + 'province_id'];
			this[formName][selfPrevfix + 'city_id'] = this[copyFormName][copyPrevfix + 'city_id'];
			this[formName][selfPrevfix + 'area_id'] = this[copyFormName][copyPrevfix + 'area_id'];
			this._triggerChange(this[copyFormName][copyPrevfix + 'province_id'], (hackPrevfix ? hackPrevfix : selfPrevfix) + 'cityData');
			this._triggerChange(this[copyFormName][copyPrevfix + 'city_id'], (hackPrevfix ? hackPrevfix : selfPrevfix) + 'areaData');
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

			var data = {
				work_order_sn: this.work_order_sn,
				confirm_step: this.confirm_step,
				trademark_subject: this.ruleForm,
				work_order_invoice: this.invoiceForm
			};
    	if (isNext) {
    		data.draft_state = 0
    	}else{
    		data.draft_state = 1
    	}
			this.$http.post(saveDraftUrl, data)
			.then((resp) => {
				var data = resp.data;
				if (!isNext) {
					this.$message.success('保存草稿成功！');
				}else{
					this.$router.push({name: 'stepThree', query: Object.assign({}, this.$route.query, {confirm_step: 3}) })
				}
			})
			.catch((err) => {
				if (err && err.msg) {
					this.$message.error(err.msg);
				}
			});
		},
		//点击下一步
		nextTo(){
			var ruleForm = this.ruleForm;
			ruleForm.apply_type = this.apply_type;
			ruleForm.standby1 = this.standby1;
			ruleForm.standby2 = this.standby2;
			ruleForm.area_info = this.getAreaInfo(ruleForm);
			this.$refs['ruleForm'].validate((valid) => {
				 // && this.checkUploadFile()   文件校验
				if (valid) {
					this.$refs['invoiceForm'].validate((valid) => {
						if (valid) {
							this.next();
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				} else {
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
			this.$router.push({name: 'stepOne', query: Object.assign({}, this.$route.query, {confirm_step: 1})})
		},
		//获取详情数据
		queryDetail(){
			this.loading = true;
			this.$http.get(infoConfirmQueryUrl, {
				params: {
					work_order_sn: this.work_order_sn,
					confirm_step: this.confirm_step,
					is_submit: this.$route.query.is_submit,
				}
			})
			.then((resp) => {
				this.loading = false;
				var data = resp.data;
				this.infoDetailData = data;
				this.member_id = data.member_id;
				if (data && data.trademark_subject && data.trademark_subject.apply_type){
					// 1为默认值，不会触发apply_type的watch
					if (data.trademark_subject.apply_type == 1) {
						this.setForm();
					}else{
						this.apply_type = data.trademark_subject.apply_type;
					}
				}else{ // 新单子主体数据不存在时
					this.querySubjectT();
				}
			})
			.catch((err) => {
				this.loading = false;
				console.log(err);
			});
		},
		//获取主体模板列表数据
		querySubjectT(){
			this.queryMemberSubjectT();
			this.querySpSubjectT();
		},
		//获取发票模板列表数据
		queryInvoiceT(){
			this.queryMemberInvoiceT();
			this.querySpInvoiceT();
		},
		//设置整个页面表单数据
		setForm(){
			var trademarkSubjectData = this.infoDetailData.trademark_subject;
			var work_order_invoice = this.infoDetailData.work_order_invoice;
			var ruleForm = this.ruleForm;
			var invoiceForm = this.invoiceForm;
			if (trademarkSubjectData && trademarkSubjectData.apply_type) {
				//如果当前主体类型和详情数据中的主体类型相同，这儿需要主动去取主体模板
				if (this.apply_type == trademarkSubjectData.apply_type) {
					this.querySubjectT();
				}
				this.apply_type = trademarkSubjectData.apply_type;
				for (var prop in this.ruleForm) {
					if(this.ruleForm.hasOwnProperty(prop)) {
						this.ruleForm[prop] = trademarkSubjectData[prop]
					}
				}
				this.standby1 = this.ruleForm.standby1;
				this.standby2 = this.ruleForm.standby2;
				this.standby1_name = this.ruleForm.standby1_name;
				this.standby2_name = this.ruleForm.standby2_name;
				if (this.apply_type == 1 || this.apply_type == 2) {
					this._triggerChange(this.ruleForm.province_id, 'cityData');
					this._triggerChange(this.ruleForm.city_id, 'areaData');
				}
			}else{
				this.querySubjectT();
			}
			if (work_order_invoice && work_order_invoice.invoice_type) {
				this.needInvoice = true;
				this.invoice_type = this.apply_type == 2 ? work_order_invoice.invoice_type : 1;
				for (var p in invoiceForm) {
					if(invoiceForm.hasOwnProperty(p) && work_order_invoice[p]) {
						invoiceForm[p] = work_order_invoice[p]
					}
				}
				if (this.invoice_type == 2) {
					this.invoiceRules = invoiceRules.invoiceSpecRules;
					this._triggerChange(invoiceForm.province_id, 'invoice_cityData');
					this._triggerChange(invoiceForm.city_id, 'invoice_areaData');
				}
			}
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
				//  && this.checkUploadFile()文件暂不做校验
				if (valid) {
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
				console.log(error);
			});
		},
		//更改省
		changeProvince(formName, provinceCode, prevfix){
			this[formName].area_id = '';
			this[formName].city_id = '';
			this._triggerChange(provinceCode,  (prevfix ? prevfix : '') + 'cityData');
		},
		//更改市
		changeCity(formName, cityCode, prevfix){
			this[formName].area_id = '';
			this._triggerChange(cityCode, (prevfix ? prevfix : '') + 'areaData');
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
			var area_id = data.area_id;
			if (apply_type == 1 || apply_type == 2) {
				var province_id = data.province_id;
				var city_id = data.city_id;
				return [this.getSelectName(province_id, 'provinceData'), this.getSelectName(city_id, (prevfix ? prevfix : '') + 'cityData'), this.getSelectName(area_id, (prevfix ? prevfix : '') + 'areaData')].join(' ');
			}else{
				return [this.getSelectName(area_id, (prevfix ? prevfix : '') + 'areaData')].join(' ');
			}
		},
		//选中模板设置主体表单
		setCurSubject(item, idxName, index){
			this.ruleForm = Object.assign({}, item);
			this._triggerChange(this.ruleForm.province_id, 'cityData');
			this._triggerChange(this.ruleForm.city_id, 'areaData');
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
			this.invoiceForm = Object.assign({}, item);
			this._triggerChange(this.invoiceForm.province_id, 'invoice_cityData');
			this._triggerChange(this.invoiceForm.city_id, 'invoice_areaData');
			this.invoice_type = item.invoice_type;
			this.initInvoiceIdx();
			this[idxName] = index;
			/*this.$nextTick(() => {
				this.invoiceForm.city_id = item.city_id;
				this.$nextTick(() => {
					this.invoiceForm.area_id = item.area_id;
				});
      });*/
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
		},
		invoiceTypeChange(){
			//使用watch
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
			if (infoDetailData && infoDetailData.trademark_subject && infoDetailData.trademark_subject.apply_type == apply_type) {
				this.setForm();
				return;
			}

			//否则清空表单
			this.resetRuleForm();
			this.resetInvoiceForm();

			setTimeout(() => {
				this.$refs['ruleForm'].resetFields();
			}, 0)

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
			}else if(this.invoice_type == 2){
				this.invoiceRules = invoiceRules.invoiceSpecRules;
				this.invoiceForm.invoice_code = this.ruleForm.apply_number;
				this.invoiceForm.regist_phone = this.ruleForm.apply_phone;
				this.fillAddress('invoiceForm', 'ruleForm', '', '', 'invoice_');
			}
			this.$nextTick(() => {
				this.$refs.invoiceForm.clearValidate();
      });
		},
	}
}
