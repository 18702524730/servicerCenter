<template>
	<div class="step3_fill_cxb" v-loading="loading" element-loading-text="拼命加载中">
		<div class="notPassReason" v-if="infoDetailData.auditingReasons">申报资料审核不通过，请重新提交；不通过原因：{{infoDetailData.auditingReasons}}</div>
		<p class="mb20">商标基本信息</p>
		<el-form class="basic_info" ref="tmForm" :model="trademarkData" :rules="tmFormRules" :inline="true" auto-complete="off" label-width="120px" v-if="!loading">
			<el-form-item class="addAddress" label="商标类型：" style="width:53%" required>
				<template>
					<el-radio class="radio" v-model="trademarkData.trademark_type" :label="1">文字商标</el-radio>
					<el-radio class="radio" v-model="trademarkData.trademark_type" :label="2">图形商标</el-radio>
				</template>
			</el-form-item>

			<el-form-item class="addAddress" label="商标名称：" prop="trademark_name" style="width:53%">
				<el-input size="small" v-model="trademarkData.trademark_name" placeholder="请输入商标名称" :maxlength="30"></el-input>
			</el-form-item>

			<el-form-item class="addAddress" label="商标说明：" prop="trademark_desc" style="width:53%">
				<el-input type="textarea" v-model="trademarkData.trademark_desc" :autosize="{ minRows: 4, maxRows: 6}" size="small" placeholder="请输入商标说明，限90个汉字" :maxlength="90"></el-input>
			</el-form-item>

			<el-form-item class="addAddress" label="图样类型：" prop="pic_type" style="width:53%" required>
				<template>
					<el-radio class="radio" v-model="trademarkData.pic_type" label="1">黑白色</el-radio>
					<el-radio class="radio" v-model="trademarkData.pic_type" label="2">指定色</el-radio>
				</template>
			</el-form-item>
			<el-form-item label="上传图样：" style="width:80%" required>
				<div class="upload_component" v-if="trademarkData.pic_type == 2" style="margin-bottom:20px;">
					<uploader @complete="setUploadedDataSpecify" @resetUploader="resetUploader" :fileName="standby2_name" :postAction="'iprp_servicer/api/file/uploadPic'" :url="standby2" :valueName="'standby2'" :size="0.2" :extensions="'jpg,jpeg'" v-if="isIE"></uploader>
					<!-- 裁切组件 -->
          <myCropper :option="optionSpecify" :size="0.2" :extensionsType="1" :valueName="'standby2'" :url="standby2" :uploadedFileData="uploadedFileDataSpecify" :minWidth="400" :minHeight="400" :maxWidth="1500" :maxHeight="1500" :postAction="'/api/file/uploadPic'" @resetUploader="resetUploader"  @showStatus="showStatus2Fn" @submitFn="setUploadedDataSpecify" @update="update2Fn" v-if="!isIE"></myCropper>
					<div class="upload_tip">
						<p>指定色图片</p>
						<p class="format">格式说明：格式为jpg，图形应清晰，图样文件大小应小于200KB且图形像素介于“400×400”－“1500×1500”之间。</p>
						<p style="padding-top:8px;"><a target="_blank" :href="trademarkData.black_white_pic_url_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的商标图样</a></p>
					</div>
				</div>
				<div class="upload_component">
					<uploader @complete="setUploadedDataBlack" @resetUploader="resetUploader" :fileName="standby1_name" :postAction="'iprp_servicer/api/file/uploadPic'" :url="standby1" :valueName="'standby1'" :size="0.2" :extensions="'jpg,jpeg'" v-if="isIE"></uploader>
					<!-- 裁切组件 -->
          <myCropper :option="optionBlack" :size="0.2" :extensionsType="1" :valueName="'standby1'" :url="standby1" :uploadedFileData="uploadedFileDataBlack" :minWidth="400" :minHeight="400" :maxWidth="1500" :maxHeight="1500" :postAction="'/api/file/uploadPic'" @resetUploader="resetUploader"  @showStatus="showStatus0Fn" @submitFn="setUploadedDataBlack" @update="update0Fn" v-if="!isIE"></myCropper>
					<div class="upload_tip">
						<p>黑白色图片<span v-if="trademarkData.pic_type == 2">(可选填)</span></p>
						<p class="format">格式说明：格式为jpg，图形应清晰，图样文件大小应小于200KB且图形像素介于“400×400”－“1500×1500”之间。</p>
						<p v-if="trademarkData.pic_type==1" style="padding-top:8px;"><a target="_blank" :href="trademarkData.black_white_pic_url_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的商标图样</a></p>
					</div>
				</div>
			</el-form-item>

			<el-form-item label="上传委托书：" style="width:80%" required>
				<div class="upload_component">
					<uploader @complete="setUploadedDataProxy" @resetUploader="resetUploader" :fileName="standby3_name" :postAction="'iprp_servicer/api/file/uploadProxy'" :url="standby3" :valueName="'standby3'" :size="2" :extensions="'jpg,jpeg'" v-if="isIE"></uploader>
					<!-- 裁切组件 -->
          <myCropper :option="optionProxy" :size="2" :extensionsType="1" :valueName="'standby3'" :url="standby3" :uploadedFileData="uploadedFileDataProxy" :minWidth="600" :minHeight="600" :maxWidth="4000" :maxHeight="4000" :postAction="'/api/file/uploadProxy'" @resetUploader="resetUploader"  @showStatus="showStatusFn" @submitFn="setUploadedDataProxy" @update="updateFn" v-if="!isIE"></myCropper>
					<div class="upload_tip">
						<p>被委托单位：{{userinfo.entrustedUnit}}</p>
						<p class="format">格式说明：委托书格式应为jpg，图形应清晰，图片大小应小于2M且图形像素介于“600×600”－“4000×4000”之间。</p>
						<p v-if="trademarkData.proxy_url_user" style="padding-top:8px;"><a target="_blank" :href="trademarkData.proxy_url_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的委托书</a></p>
					</div>
				</div>
			</el-form-item>

			<el-form-item label="上传合同书：" style="width:80%" required>
				<div class="upload_component" style="margin-bottom:20px;">
					<uploader @complete="setUploadedContract" @resetUploader="resetUploader" :fileName="standby4_name" :canPreview="false" :postAction="'iprp_servicer/api/file/allUpload'" :url="standby4" :valueName="'standby4'" :size="5" :extensions="'rar,zip,pdf,jpg,jpeg,bmp,png'"></uploader>
					<div class="upload_tip">
						<p v-if="trademarkData.contract_url_user && !standby4">客户已上传</p>
						<p v-if="standby4_name">已上传：{{standby4_name}}</p>
						<p class="format">系统已上传客户提交的合同书。若需修改，请上传修正资料。<br>格式说明：格式为RAR、ZIP、PDF、JPG、BMP、PNG，大小限5M以内；</p>
						<p v-if="trademarkData.contract_url_user" style="padding-top:8px;"><a target="_blank" :href="trademarkData.contract_url_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的合同书</a></p>
					</div>
				</div>
			</el-form-item>

			<el-form-item label="上传商标确认书：" style="width:80%" required>
				<div class="upload_component" style="margin-bottom:20px;">
					<uploader @complete="setUploadedConfirm" @resetUploader="resetUploader" :fileName="standby5_name" :canPreview="false" :postAction="'iprp_servicer/api/file/allUpload'" :url="standby5" :valueName="'standby5'" :size="5" :extensions="'rar,zip,pdf,jpg,jpeg,bmp,png'"></uploader>
					<div class="upload_tip">
						<p v-if="trademarkData.confirm_url_user && !standby5">客户已上传</p>
						<p v-if="standby5_name">已上传：{{standby5_name}}</p>
						<p class="format">系统已上传客户提交的商标确认书。若需修改，请上传修正提交。格式说明：格式为RAR、ZIP、PDF、JPG、BMP、PNG，大小限5M以内；</p>
						<p v-if="trademarkData.confirm_url_user" style="padding-top:8px;"><a target="_blank" :href="trademarkData.confirm_url_user"><img src="~assets/img/action-icon.png" alt="">下载客户提交的商标确认书</a></p>
					</div>
				</div>
			</el-form-item>
			<!-- <el-form-item class="btn_wrap" label=" " style="margin-top:10px;width:53%;">
				<button class="reset" @click.prevent="resetForm">重置</button>
				<button class="saveT">保存模板</button>
			</el-form-item> -->
		</el-form>


		<div class="fill_state" v-if="!loading">
			<p class="mb20">商标分类信息</p>
			<div class="state" v-for="(info,$draftIndex) in draftInfo">
				<div class="state_list" :class="{'bgc':$draftIndex === draftIndex}">
					<!-- 点击收缩时候先保存入allEvents，然后初始化 -->
					<!-- 展开 -->
					<img class="unwrap" src="~assets/img/release.png" alt="" v-if="info.PackUp" @click="openCurOrder($draftIndex,info)">
					<!-- 收缩 -->
					<img src="~assets/img/shrinkage.png" alt="" v-if="!info.PackUp" @click="closeCurOrder(info)">
					<div class="list_tit clearfix">
						<p class="fl serial">{{$draftIndex+1>9 ? $draftIndex+1 : '0'+($draftIndex+1)}}</p>
						<p class="fl order">服务单号</p>
						<p class="fl">
							{{info.order_sn}}
							<el-popover placement="top" width="400" trigger="hover" class="remark_icon_wrap" popper-class="popper_remark_icon" v-if="info.isAsistantremarks" @show="getRemark(info)">
								<p>{{remark}}</p>
								<a href="javascript:;" slot="reference" class="remark_icon">&nbsp;&nbsp;</a>
							</el-popover>
						</p>
					</div>
					<p class="mt10" v-if="!info.class_name&&info.PackUp" @click="openCurOrder($draftIndex,info)">请完善商标注册信息</p>

					<!-- 收缩后显示的内容 -->
					<ul class="mt10 clearfix"  v-if="info.PackUp && info.class_name">
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.class_name}">{{info.class_name}}</p>
							<p class="state_txt fl" :class="{'msgColor':!info.service_nice_min || !info.service_nice_min.length}">
								共{{info.service_nice_min && info.service_nice_min.length || 0}}个小项
								<template v-if="info.service_nice_min && info.service_nice_min.length">
								（<span v-for="item in info.service_nice_min">{{item.min_name + '；'}}</span>）
								</template>
							</p>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.similar_trademark}">在线近似商标</p>
							<p class="state_txt fl">{{info.similar_trademark || '--'}}</p>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.register_pass_rate}">注册通过率</p>
							<p class="state_txt fl">{{info.register_pass_rate || 0}}%</p>
						</li>
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.risk_desc_register_advice}">风险说明及注册建议</p>
							<p class="state_txt fl">{{info.risk_desc_register_advice || '--'}}</p>
						</li>
					</ul>

					<div class="add mt20" v-if="$draftIndex === draftIndex&&!info.PackUp">
						<p>请选择分类及小项：</p>
						<!-- 45大类 -->
						<ul class="clearfix mt15">
							<li v-for="(item,$index) in bigState" :class="{'click_li':$index+1 == index, 'notChoose': allSelectedBigData.indexOf($index+1) != -1 && $index+1 != index}" class="fl mr10 mb10" @click="selected(item, info)">{{item.class_name}}</li>
						</ul>
						<div class="events clearfix mt10" style="padding-right:10px;" v-show="selectedBigItem.class_name">
							<div class="events_left fl">
								<div class="head clearfix">
								<!-- 选中名称 -->
									<p>{{selectedBigItem.class_name}}</p>
									<!-- <button class="fr" @click="DataFuzzyQuery(searchEvents)">搜索</button> -->
									<input type="text" v-model="searchEvents" class="fr" placeholder="请输入小项名称、编号或关键词" @keyup="DataFuzzyQuery(searchEvents)" @focus="DataFuzzyQuery(searchEvents)" @blur="blurclick">
									<span class="fr mr20 min_clip" @click="showMinClipboard=!showMinClipboard">小项剪切板</span>
									<ul class="fuzzyqueryList" v-if="FuzzyQueryData.length">
										<li v-for="item in FuzzyQueryData" @click="FuzzyQueryClick(item.min_id)" v-html="item.min_name"></li>
									</ul>
									<img src="~assets/img/Searchicon.png" alt="">
								</div>
								<div class="min_lipboard_wrap" v-show="showMinClipboard">
									<el-input
									  type="textarea"
									  :rows="12"
									  placeholder="请粘贴您所需的小项信息，小项间使用中文逗号区分。"
									  v-model="textareaV" class="textarea">
									</el-input>
									<div class="confirm_tip">
								  	<a href="" class="button no" @click.prevent="showMinClipboard = false">取消</a><a href="" class="button yes" @click.prevent="fillMin()">确定</a>
								  </div>
								</div>
								<!-- {{curSelectedSmallIdList}} -->
								<div class="list_over" v-loading="smallLoading">
									<div class="events_list" v-for="(item,$index) in niceEventsData">
										<!-- 小项头部 -->
										<div class="list_state clearfix" :class="{'mt20':$index !=0}" @click="toggleSmallNav(item)">
											<p class="list_name fl">
												<i class="el-icon-caret-bottom" v-show="!item.shrinkage" style="background-color:#f5f5f5"></i>
												<i class="el-icon-caret-right" v-show="item.shrinkage" style="background-color:#f5f5f5"></i>
												{{item.group_name}}
											</p>
											<p class="state_num fr">{{item.min_data.length}}项</p>
										</div>
										<!-- 小项 -->
										<div class="mt15 pl10" v-if="item.shrinkage">
											<template>
												<el-checkbox-group @change="selectSmallChange(curSelectedSmallIdList,info)" v-model="curSelectedSmallIdList">
													<el-checkbox v-for="(eventsName,eventsindex) in item.min_data" :label="eventsName.min_id" :key="eventsindex">{{eventsName.min_name}}</el-checkbox>
												</el-checkbox-group>
											</template>
										</div>
									</div>
								</div>
								</div>
								<div class="events_right fl">
								<p class="right_tit">小项确认</p>
								<div class="right_num clearfix">
									<p class="right_txt fl">最多选择{{info.min_number<10? 10 : info.min_number}}项，已选<span class="cy">{{curSelectedSmallList.length}}</span>项</p>
									<p class="right_btn fr" @click="resetEvent">重置</p>
								</div>
								<div class="right_list">
									<ul>
										<li v-for="events in curSelectedSmallList" style="text-align:left" class="mb10">
											<i class="el-icon-circle-close" @click="moveSmall(events.min_id)"></i>
											{{events.min_name}}
										</li>
									</ul>
									<!-- <div class="add_cost">
										<p>加项费用(元）
											<el-tooltip placement="top-end" width="140" trigger="hover" popper-class="smallFeePopover" :disabled="curSelectedSmallList.length<11" v-model="showMoreSmallTip">
												<p slot="content" class="smallFee">已超出{{curSelectedSmallList.length-10}}个小项<br>追加费用30x{{curSelectedSmallList.length-10}}元</p>
												<span class="cy">￥{{curSelectedSmallList.length && curSelectedSmallList.length>10 ? (curSelectedSmallList.length-10)*30 : '0'}}.00</span>
											</el-tooltip>
										</p>
									</div> -->
								</div>
							</div>
						</div>
						<div class="footer_inform">
							<p>通过率反馈：<span>(该信息用户不可见)</span></p>
							<el-form ref="ruleForm" :inline="true" auto-complete="off" label-width="110px">
								<el-form-item class="percentage_txt" label="注册通过率" prop="name" style="width:53%">
									<input type="text" v-model="info.register_pass_rate" name="exchangeamount" id="exchangeamount" size="5" maxlength="3" @blur="check_register_pass_rate(info)"/>
									<p class="percentage">%</p>
									<span class="prompt">限0-100之间</span>
								</el-form-item>

								<el-form-item class="addAddress" label="在先近似商标" prop="name" style="width:53%">
									<el-input type="textarea" v-model="info.similar_trademark" :autosize="{ minRows: 4, maxRows: 6}" size="small" placeholder="请填写在先近似商标信息" :maxlength="200"></el-input>
								</el-form-item>

								<el-form-item class="addAddress" label="风险信息及建议" prop="name" style="width:53%">
									<el-input type="textarea" v-model="info.risk_desc_register_advice" :autosize="{ minRows: 4, maxRows: 6}" size="small" placeholder="请填风险信息，如商标的显著性、近似商标情况，并提供注册建议。该信息用户不可见" :maxlength="200"></el-input>
								</el-form-item>

							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="confirm_btn clearfix" v-if="!loading">
			<p class="fl" @click="saveDraft()">存草稿</p>
			<p class="fl ml10 mr10" @click="prev">上一步</p>
			<p class="fl btn_bg" @click="nextStep">下一步</p>
		</div>
		<el-dialog title="提示"
			:visible.sync="dialogVisible" class="state_preview" :modal-append-to-body="true" :lock-scroll="false">
			<div class="confirm_tip">
				<p>更换商标类别将重置已选小项，确定更换？</p>
				<a href="" class="button no" @click.prevent="dialogVisible = false">取消</a><a href="" class="button yes" @click.prevent="changeBig()">确定</a>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {store} from 'utils/';
	import uploader from 'cps/uploader/uploader.vue';
	import myCropper from 'cps/uploader/cropper.vue';  //引入封装好的裁切组件
	const rootUrl = CONFIG.rootUrl;
	const niceUrl= './api/getNiceClass';
	const niceEventsUrl = './api/getNiceGroupByClassId';
	const InfoUrl = './api/info_confirm_query';
	const draftUrl = './api/cxb_save_draft';
	const submitUrl = './api/submit';
	const downProxyTemplateUrl = './api/downProxyTemplate';
	const findAsistantRemarkUrl = './api/findAsistantRemark';
	export default {
		components: {
			uploader,
			myCropper
		},
		data() {
			return {
				// 黑白色
        optionBlack: {
          show: false,
          update: false,
          img: '',
          size: 1,
          full: false,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 400,
          autoCropHeight: 400,
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true
        },
				// 指定色
        optionSpecify: {
          show: false,
          update: false,
          img: '',
          size: 1,
          full: false,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 400,
          autoCropHeight: 400,
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true
        },
        // 委托书
        optionProxy: {
          show: false,
          update: false,
          img: '',
          size: 1,
          full: false,
          outputType: 'jpeg',
          canScale: true,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 1000,
          autoCropHeight: 1000,
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true
        },
        // 黑白色
        uploadedFileDataBlack: {
          url:'',
          fileName:''
        },
        // 指定色
        uploadedFileDataSpecify: {
          url:'',
          fileName:''
        },
        // 委托书
        uploadedFileDataProxy: {
          url:'',
          fileName:''
        },
				textareaV:'',//小项剪切板文本框数据
      	showMinClipboard: false, //小项剪切板
				infoDetailData: {},
				remark: '', // popover 备注
				timer: null,
				showMoreSmallTip: false,
				userinfo: store.get('userinfo'),
				reffer:1,
				tmFormRules:{
					trademark_name:[
						{ required: true, message: '请输入商标名称', trigger: 'blur' }
					],
					trademark_desc: [
						{ required: true, message: '请输入商标说明', trigger: 'blur' }
					],
				},
				step:'',
				work_order_id:'',
				work_order_sn:'',
				// 上传图片地址
				imgUrl:'',
				loading:false,
				standby1:'',
				standby2:'',
				standby3:'',
				standby4:'',
				standby5:'',
				standby1_name:'',
				standby2_name:'',
				standby3_name:'',
				standby4_name:'',
				standby5_name:'',
				// 查询的草稿信息 work_order_service
				draftInfo:[],
				// 当前展开的服务单的索引
				draftIndex:'',
				dialogVisible:false,
				// 总体输入内容
				trademarkData:{
					"trademark_type": 1,
					"trademark_name": null,
					"trademark_desc": null,
					"pic_type": '1',
					"proxy_url": null,
					"proxy_file_name": null,
					"specify_pic_url": null,
					"specify_pic_file_name": null,
					"black_white_pic_url": null,
					"black_white_pic_file_name": null,
					"entrusted_unit": null
				},
				// 当前选中的小项id列表
				curSelectedSmallIdList:[],
				// 当前选中的小项列表[{}]
				curSelectedSmallList: [],
				// 搜索小项
				searchEvents:'',
				// 提交时候的所有内容
				results:[],
				// 所有选中的小项和分类
				allEvents: {
					work_order_id:'',
					confirm_step:3
				},
				// 是否选中
				selectedState:true,
				//当前选中的大项的索引，index这儿是个极差的命名，
				index:'',
				//当前服务单对应的index
				serviceIndex:'',
				// 查询到的小项
				niceEventsData:{},
				// 小项加载loading
				smallLoading: false,
				//该商标下所有服务单信息
				work_order_service_list:[],
				// 查询出的大类
				bigState:[],
				// 当前选中的大类
				selectedBigItem:{},
				// 当前临时选中的大类,用于二次确认
				tempSelectedBigItem:{},
				// 模糊查询的结果
				FuzzyQueryData:[],
				// 各服务单已选中的大类
				allSelectedBigData:[],
				// 当前选中的服务单数据
				curOrderInfo:{},
				isIE: false,  //判断浏览器是不是小于等于9的IE
				niceMinPrice:30,//小项超出费用
			}
		},
		methods: {
			// 委托书
			updateFn (data) {
    		this.optionProxy.update = data;
    	},
			update0Fn (data) {
    		this.optionBlack.update = data;
    	},
			update2Fn (data) {
    		this.optionSpecify.update = data;
    	},
    	// 委托书
    	showStatusFn (data) {
        this.optionProxy.show = data;
      },
    	showStatus0Fn (data) {
      	this.optionBlack.show = data;
      },
			showStatus2Fn (data) {
      	this.optionSpecify.show = data;
      },
			// 模糊查询
      getMatchMin(str){
      	var self = this;
      	var arr = [];
      	if (!str) {return arr;}
      	for(var i=0;i<self.niceEventsData.length;i++){
      		for(var h=0;h<self.niceEventsData[i].min_data.length;h++){
      			var min_name = self.niceEventsData[i].min_data[h].min_name
      			if(min_name == str){
      				arr.push(self.niceEventsData[i].min_data[h].min_id);
      				break;
      			}
      		}
      	}
      	return arr;
      },
    	fillMin(){
    		if (!this.textareaV.trim()) {
    			this.$message.warning('请粘贴您所需的小项信息，小项间使用中文逗号区分。');
    			return;
    		}
    		let arr = this.textareaV.split('，');
    		let tempArr = [];
    		let sArr = [];
    		arr.forEach((str) => {
    			let t = this.getMatchMin(str);
    			if (!t.length) {
    				sArr.push(str);
    			}else{
    				tempArr = tempArr.concat(t);
    			}
    		});
    		let curSelectedSmallIdList = Array.from(new Set([...this.curSelectedSmallIdList, ...tempArr]));
    		this.selectSmallChange(curSelectedSmallIdList);
    		this.curSelectedSmallIdList = curSelectedSmallIdList;
    		if (sArr.length) {
    			this.$alert('添加成功'+(arr.length-sArr.length) +'项，'+ sArr.length +'项未能正确匹配，请检查：'+ sArr.join(), '提示');
    		}else{
    			this.$message.success('全部添加成功！');
    			this.textareaV = '';
    		}
    	},
			getRemark(item){
				this.remark = '';
				this.$http.get(findAsistantRemarkUrl + '?orderSn=' + item.order_sn)
				.then((resp) => {
					var data = resp.data;
					this.remark = data.remarks;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			check_register_pass_rate(info){
				var reg = /(^[1-9][0-9]?$)|100/;
				var txt = info.register_pass_rate;
				if (txt) {
					txt = txt.replace('.', '');
				}
				if (!reg.test(txt)) {
					this.$message.error('注册通过率限1-100之间');
					info.register_pass_rate = ''
				}else{
					info.register_pass_rate = txt;
				}
			},
			resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
				if (valueName == 'standby1') {
					this.trademarkData.black_white_pic_url = '';
					this.uploadedFileDataBlack.url = '';
					this.optionBlack.update = false;
				}
				if (valueName == 'standby2') {
					this.trademarkData.specify_pic_url = '';
					this.uploadedFileDataSpecify.url = '';
					this.optionSpecify.update = false;
				}
				if (valueName == 'standby3') {   //委托书
          this.trademarkData.proxy_url = '';
          this.uploadedFileDataProxy.url = '';
          this.optionProxy.update = false;
        }
			},
			resetForm(){
				this.trademarkData.trademark_type = 1;
				this.trademarkData.trademark_desc = '';
				this.trademarkData.trademark_name = '';
				this.standby1 = '';
				this.standby2 = '';
				this.standby3 = '';
				this.standby1_name = '';
				this.standby2_name = '';
				this.standby3_name = '';
			},
			uploaderErrCallback(data){
				this.$alert(data.msg);
			},
			// 上传图片部分
			setUploadedDataBlack(data){
				var d = data.data;
				this.uploadedFileDataBlack = d;
				if (d.url) {
					this.standby1 = d.url;
	    		this.standby1_name= d.fileName;
					this.trademarkData.black_white_pic_url = d.url;
				}else{
					this.uploaderErrCallback(d);
				}
			},
			setUploadedDataSpecify(data){
				var d = data.data;
				this.uploadedFileDataSpecify = d;
				if (d.url) {
					this.standby2 = d.url;
    			this.standby2_name = d.fileName;
					this.trademarkData.specify_pic_url = d.url;
				}else{
					this.uploaderErrCallback(d);
				}
			},
			setUploadedDataProxy(data){
				var d = data.data;
				this.uploadedFileDataProxy = d;
				if (d.url) {
					this.standby3 = d.url;
    			this.standby3_name = d.fileName;
					this.trademarkData.proxy_url = d.url;
				}else{
					this.uploaderErrCallback(d);
				}
			},
			setUploadedContract(data){
				var d = data.data;
				if (d.url) {
					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
				}
			},
			setUploadedConfirm(data){
				var d = data.data;
				if (d.url) {
					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					this.trademarkData.confirm_url = d.url;
				}else{
					this.uploaderErrCallback(d);
				}
			},
			// 搜索框初始化
			blurclick(){
				setTimeout(()=>{
					this.FuzzyQueryData = [];
					this.searchEvents = '';
				},200);
			},
			// 获取尼斯分类
			obtainNice(){
				var self = this;
				self.$http.get(niceUrl+"?pg_count=45").then(function(resp){
					self.bigState = resp.data.elements;
				})
				.catch((error) => {
				});
			},
			// 获取草稿信息
			info(){
				var self = this;
				self.loading = true;
				this.$http.get(InfoUrl, {
					params: {
						work_order_sn: this.work_order_sn,
						confirm_step: 4,
						is_submit: 1, //this.$route.query.is_submit,
					}
				})
				.then(function(resp){
					self.loading = false;
					for(var i=0;i<resp.data.work_order_service.length;i++){
						resp.data.work_order_service[i].PackUp = true;
					}
    			self.niceMinPrice = resp.data.niceMinPrice;
					// 输入框部分内容
					self.infoDetailData = resp.data;
					self.trademarkData = resp.data.trademark;
					self.trademarkData.pic_type = self.trademarkData.pic_type ? self.trademarkData.pic_type + '' : '1';
					self.standby1 = self.trademarkData.black_white_pic_url;
					self.standby2 = self.trademarkData.specify_pic_url;
					self.standby3 = self.trademarkData.proxy_url;
					self.standby4 = self.trademarkData.contract_url;
					self.standby5 = self.trademarkData.confirm_url;
					self.standby1_name = self.trademarkData.black_white_pic_file_name;
					self.standby2_name = self.trademarkData.specify_pic_file_name;
					self.standby3_name = self.trademarkData.proxy_file_name;
					self.standby4_name = self.trademarkData.contract_file_name;
					self.standby5_name = self.trademarkData.confirm_file_name;

					//服务单部分
					self.draftInfo = resp.data.work_order_service;

					self.work_order_id = resp.data.work_order_id;

					//选中的大类id list
					self.allSelectedBigData = (function(){
						var arr = [];
						self.draftInfo.forEach((item, index) => {
							arr.push(item.class_id);
						});
						return arr;
					})();
				})
				.catch((err) => {
					self.loading = false;
					if (err && err.msg) {
						this.$message.error(err.msg);
					}
				});
			},
			// 保存草稿
			saveDraft(isNext){
				var self = this;
				self.allEvents.trademark = {
					trademark_type:self.trademarkData.trademark_type,
					trademark_name:self.trademarkData.trademark_name,
					trademark_desc:self.trademarkData.trademark_desc,
					pic_type:self.trademarkData.pic_type,
					//委托单位暂无
					entrusted_unit:self.trademarkData.entrusted_unit,
					// 黑白照
					black_white_pic_url:this.trademarkData.black_white_pic_url,
					// 指定色
					specify_pic_url:this.trademarkData.specify_pic_url,
					// 委托书
					proxy_url:this.trademarkData.proxy_url,
					contract_url:self.trademarkData.contract_url,
					confirm_url:self.trademarkData.confirm_url,
				};
				self.allEvents.work_order_id = self.work_order_id;
				self.allEvents.work_order_service = self.draftInfo;
				if (isNext) {
					self.allEvents.draft_state = 0
				}else{
					self.allEvents.draft_state = 1
				}
				self.allEvents.confirm_step = 2;
				// 保存草稿接口
				this.$http.post(draftUrl , self.allEvents)
				.then((resp) => {
					if (!isNext) {
						self.$message.success('保存草稿成功！');
					}else{
						self.$router.push({name: 'stepThreeCXB', query: Object.assign({}, this.$route.query, {step: 3})});
					}
				})
				.catch((err) => {
					if (err && err.msg) {
						this.$message.error(err.msg);
					}
				});
			},
			// 打开当前列表
			openCurOrder(orderindex, info){
				var self = this;
				this.showMinClipboard = false;
				self.draftIndex = orderindex;

				//展开当前的
				var draftInfo = self.draftInfo;
				draftInfo.forEach((it, index) => {
					it.PackUp = true;//true为折叠
				})
				info.PackUp = false;

				// 设置当前选中的大类
				self.selectedBigItem = info.class_id ? self.bigState[info.class_id-1] : {}
				self.index = info.class_id || '';

				self.curOrderInfo = info;

				//右侧选中的小项
				self.curSelectedSmallList = info.service_nice_min || [];
				self.curSelectedSmallIdList = self.getSmallIdList();

				//如果有大类，则查询小项
				if (info.class_id) {
					self.niceEvents(info.class_id);
				}
			},
			// 保存，初始化
			closeCurOrder(item){
				this.draftIndex = '';
				item.PackUp = true;
			},

			// 删除选中的小项
			moveSmall(min_id){
				var self = this;
				var curSelectedSmallList = self.curSelectedSmallList;
				var curSelectedSmallIdList = self.curSelectedSmallIdList;
				var copy = [].concat(curSelectedSmallList);
				var copy1 = [].concat(curSelectedSmallIdList);
				for(var i=0; i<copy.length; i++) {
					var small = copy[i];
					if(small.min_id == min_id) {
						// 右侧选中的小项
						curSelectedSmallList.splice(i,1);
						break;
					}
				}
				for(var j=0; j<copy1.length; j++) {
					var id = copy1[j];
					if(id == min_id) {
						// 左侧选中的小项
						curSelectedSmallIdList.splice(j,1);
						break;
					}
				}
				this.showMoreSmallTip = curSelectedSmallList.length>10;
				this.hideMoreSmallTip();
			},
			// 重置选中的小项
			resetEvent(data){
				this.curSelectedSmallList = [];
				this.curSelectedSmallIdList = [];
				this.curOrderInfo.service_nice_min = [];
			},
			// 点击选中查询的内容
			FuzzyQueryClick(id){
				var curSelectedSmallIdList = this.curSelectedSmallIdList;
				if (curSelectedSmallIdList.indexOf(id) === -1) {
					curSelectedSmallIdList.push(id);
				}else{
					this.$message('该小项已添加');
				}
				this.selectSmallChange(curSelectedSmallIdList);
				this.FuzzyQueryData = [];
				this.searchEvents = '';
			},
			// 根据右侧小项的数据，获得左侧选中的数据
			getSmallIdList(){
				var curSelectedSmallList = this.curSelectedSmallList;
				var arr = [];
				curSelectedSmallList.forEach((item, i) => {
					if (item.min_id) {
						arr.push(item.min_id);
					}
				});
				return arr;
			},
			// 根据小项id,从大类下所有小项数据中取得单条小项数据
			getSmallItem(id){
				var niceEventsData = this.niceEventsData;
				var ret = {
					class_id:'',
					group_id:'',
					min_id:'',
					min_name:''
				};
				niceEventsData.some((item, i) => {
					var min_data = item.min_data;
					min_data.some((it, j) => {
						if (it.min_id == id) {
							Object.keys(ret).forEach((name) => {
								ret[name] = it[name];
							});
							return true;
						}
					});
					if (ret.min_id) {return true;}
				});
				if (!ret.min_id) {
					ret = ''
				}
				return ret;
			},
			// 点击左侧小项触发
			selectSmallChange(idList){
				let max = this.curOrderInfo.min_number < 10 ? 10 : this.curOrderInfo.min_number;
				if (idList.length > max) {
					idList.pop();
					this.$message.warning(`该服务单小项最多可选择${max}项`);
					return;
				}
				var self = this;
				var niceEventsData = this.niceEventsData;
				this.curSelectedSmallList = (function(){
					var arr = [];
					idList.forEach((id, i) => {
						var smallItem = self.getSmallItem(id);
						if (smallItem) {
							arr.push(smallItem);
						}
					});
					return arr;
				})();
				this.curOrderInfo.service_nice_min = this.curSelectedSmallList;
				//this.showMoreSmallTip = this.curSelectedSmallList.length>10;
				//this.hideMoreSmallTip();
			},
			//点击45大类选中
			selected(item){
				var self = this;
				// 如果是当前的或禁用的，则直接返回
				if (self.index == item.class_id || self.isInAllSelectedBigData(item.class_id)) {
					return;
				}
				// 如果有小项数据，给出提示
				if (self.curSelectedSmallList.length) {
					self.tempSelectedBigItem = item;
					self.dialogVisible = true;
					return;
				}else{
					// 没有小项数据则直接切换
					// 先更新选中的大类Id LIST
					self.updateAllSelectedBigData(self.index, item.class_id);
					self.index = item.class_id;
					self.selectedBigItem = item;
					self.setSelectedInfo(item);
					//查询小项数据
					self.niceEvents(item.class_id)
				}
			},
			//设置当前展开订单的大类名和id
			setSelectedInfo(item){
				this.curOrderInfo.class_name = item.class_name;
				this.curOrderInfo.class_id = item.class_id;
			},
			//是否在已选中的大类集合中，用于判断是否禁用大类
			isInAllSelectedBigData(bigNum){
				return this.allSelectedBigData.indexOf(bigNum) === -1 ? false : true;
			},
			//切换大类后更新已选中的大类集合
			updateAllSelectedBigData(oldBigNum, bigNum){
				var allSelectedBigData = this.allSelectedBigData;
				var idx = allSelectedBigData.indexOf(oldBigNum);
				if (idx !== -1) {
					allSelectedBigData.splice(idx, 1);
				}
				allSelectedBigData.push(bigNum);
			},
			// 查询小项
			niceEvents(class_id){
				var self = this;
				self.smallLoading = true;
				self.$http.get(niceEventsUrl+"/"+ class_id)
				.then((resp) => {
					self.smallLoading = false;
					for(var i=0;i<resp.data.elements.length;i++){
						// 添加用来识别小项收缩和展开
						resp.data.elements[i].shrinkage = false;
					}
					self.niceEventsData = resp.data.elements;
				})
				.catch((error) => {
					self.smallLoading = false;
				});
			},
			// 确认后变更大类
			changeBig(){
				// 选中的小项初始化
				this.resetEvent();
				this.dialogVisible = false;
				this.selected(this.tempSelectedBigItem);
			},
			// 小项展开收缩切换
			toggleSmallNav(item){
				item.shrinkage = !item.shrinkage
			},
			//检查所有上传文件
			checkUploadFile(){
				var pic_type = this.trademarkData.pic_type;
				if (pic_type == 1 && !this.standby1) {
					this.$message.warning('请上传黑白色图片');
					return false;
				}
				if(pic_type == 2){
					if (!this.standby2) {
						this.$message.warning('请上传指定色图片');
						return false;
					}
				}
				if (!this.standby3) {
					this.$message.warning('请上传委托书');
					return false;
				}
				return true;
			},
			//检查所有服务单
			checkAllOrders(){
				var ret = true;
				var self = this;
				var draftInfo = self.draftInfo;
				for(var i=0;i<draftInfo.length;i++){
					var info = draftInfo[i];
					if(!info.class_id || !info.service_nice_min.length || !info.similar_trademark || !info.register_pass_rate || !info.risk_desc_register_advice){
						self.$message({
							message: '请完善商标注册信息',
							type: 'warning'
						});
						ret = false;
						break;
					}
				}
				return ret;
			},
			// 下一步
			nextStep(){
				this.$refs['tmForm'].validate((valid) => {
					if (valid && this.checkUploadFile() && this.checkAllOrders()) {
						this.saveDraft(true);
					} else {
						console.log('error submit!!');
					}
				});
			},
			// 上一步
			prev(){
				this.$router.push({name: 'stepOneCXB', query: Object.assign({}, this.$route.query, {step: 1})})
			},
			// 模糊查询
			DataFuzzyQuery(data){
				var self = this;
				data = data.toUpperCase();
				self.FuzzyQueryData = [];
				if (!data) {return;}
				for(var i=0;i<self.niceEventsData.length;i++){
					for(var h=0;h<self.niceEventsData[i].min_data.length;h++){
						var min_name = self.niceEventsData[i].min_data[h].min_name
						var idx1 = min_name.indexOf(data);
      			var idx2 = min_name.indexOf(data.toLowerCase());
      			var index = idx1 != -1 ? idx1 : idx2 != -1 ? idx2 : -1;
      			if(index != -1){
      				var ret = Object.assign({}, self.niceEventsData[i].min_data[h]);
      				ret.min_name = min_name.slice(0, index) + '<b>'+ data + '</b>' + min_name.slice(index+data.length);
      				self.FuzzyQueryData.push(ret);
      				//console.log(self.FuzzyQueryData)
      				if(self.FuzzyQueryData.length>=30){
      					return false;
      				}
      			}
					}
				}
			},
			//下载委托书模板
			download(){
				this.$http.post(downProxyTemplateUrl, {
					work_order_id: this.work_order_id,
					confirm_step: 3,
					is_submit: this.$route.query.is_submit,
					trademark: {trademark_name: this.trademarkData.trademark_name}
				})
				.then((resp) => {
					var data = resp.data;
					if (data.url) {
						location.href = rootUrl + '/api/downProxyTemplateFile?url=' + data.url;
					}
				})
				.catch((err) => {
					this.$message.error(err.msg);
				});
			},
			hideMoreSmallTip(){
				if (this.showMoreSmallTip) {
					var timer = this.timer;
					timer && clearTimeout(timer);
					this.timer = setTimeout(() => {
						this.showMoreSmallTip = false;
					}, 3000)
				}
			},
			// 判断浏览器
      judegBroswerFn () {
				function getExplore() {
				    var sys = {},
				        ua = navigator.userAgent.toLowerCase(),
				        s;
				    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
				        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
				        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
				        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
				        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
				        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
				        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
				    // 根据关系进行判断
				    if (sys.ie) return ('IE: ' + sys.ie)
				    if (sys.edge) return ('EDGE: ' + sys.edge)
				    if (sys.firefox) return ('Firefox: ' + sys.firefox)
				    if (sys.chrome) return ('Chrome: ' + sys.chrome)
				    if (sys.opera) return ('Opera: ' + sys.opera)
				    if (sys.safari) return ('Safari: ' + sys.safari)
				    return 'Unkonwn'
				}
				// 判断浏览器低于IE9时提示用户升级
				var browser = getExplore(), browserName, browserNum;
			      browserName = browser.slice(0, browser.indexOf(':'));
			      browserNum = parseInt(browser.slice(browser.indexOf(':')+1));
			   console.log(browserName)
			  if (browserName === 'IE' && browserNum<=9) {
			  	// this.$alert('温馨提醒:您当前的浏览器版本过低,为了跟高的体验, 请使用谷歌浏览器或者使用浏览器的高速模式！')
			  	this.isIE = true;
			  }
      }
		},
		mounted() {
			this.judegBroswerFn();  //判断浏览器
			this.step = this.$route.query.step;
			this.work_order_sn = this.$route.query.work_order_sn;
			//获取详情数据
			this.info();
			//获取45大类数据
			this.obtainNice();
		}
	}
</script>
<style lang='less'>
	.step3_fill_cxb{padding:60px 60px;background-color:#fff;min-height: 500px;
		.notPassReason{top:-40px;}
		// 字体淡黄色
		.cy{color: #F5A623;}
		// msg color
		.msgColor{color: #F64744 !important;}
		// 上传图片
		.upload_component{position: relative;
			.upload_tip{
				position: absolute;left: 140px;bottom:0;width:340px;font-size: 12px;color: #556677;line-height: 16px;
				p.format{color: #A8AFB5;padding-top: 5px; }
			}
		}
		.updown{font-size: 13px;color: #479CFF;width:110px;line-height:100%;cursor:pointer;
			.download{cursor: pointer;}
			img{vertical-align: top;}
		}
		.btn_wrap{
			button{font-size: 14px;color: #479CFF;border: 1px solid #479CFF;border-radius: 2px;line-height: 30px;margin-right: 10px;background-color:#fff;margin-left: 0;width:88px;}
			button:hover{border-color:#408CE6;color:#408CE6;}
		}
		label{text-align:left;}
		>p{font-size: 16px;color: #223344;}
		.fill_state{
			>p{font-size: 16px;color: #223344;}
			.state{border: 1px solid #DFE2E5;padding:0px;margin-top: -1px;}
			.shadow{box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);background: #F9F9F9;}
			div.state_list{padding:22px 0 20px;position: relative;
				>p{font-size: 14px;color: #479CFF;cursor:pointer;margin-left: 58px;width:126px;}
				>img{
					position: absolute;top:22px;right:22px;width:26px;
					&:hover{cursor: pointer;}
				}
				.list_tit{padding:0 22px;
					>p{font-size: 14px;color: #556677;line-height:20px;text-align:left;}
					.serial{width:38px;}
					.order{width:128px;}
				}
				// 详情
				ul{padding-left:58px;padding-right: 50px;
					li{
						// 数据为空，高亮
						.errNull{color: #F64744;}
						p{font-size: 13px;color: #7F8FA4;line-height:18px;}
						.state_name{width:128px;}
						.state_txt{width:82%;word-break: break-all;}
					}
				}
				// 小项
				.add{border-top:1px solid #DFE2E5;padding-top:20px;padding-right: 44px;margin-left: 58px;
					>p{font-size: 14px;color: #556677;font-weight: 600;}
					ul{padding-left:0;padding-right:0;
						li{border: 1px solid #DFE2E5;border-radius: 2px;width:116px;height:30px;line-height:30px;text-align:center;font-size: 13px;color: #556677;cursor:pointer;background-color:#fff;}
						.click_li{border: 1px solid #479CFF;color: #479CFF;background: #F8FCFF;}
						.notChoose{background: #F5F5F5;color: #A8AFB5;cursor:text;}
					}
				// 小项选择
				.events{
					>div{border: 1px solid #DFE2E5;}
					.events_left{height:450px;width:72%;background-color:#fff;padding:20px;position: relative;
						.head{position: relative;
							.min_clip{height: 30px;line-height: 30px;font-size: 14px;color: #479CFF;cursor: pointer;}
							p{width:116px;height:30px;line-height:30px;border: 1px solid #479CFF;border-radius: 2px;font-size: 13px;color: #479CFF;text-align:center;display:inline-block;background: #F8FCFF;}
						}
						input{width:300px;height:30px;border: 1px solid #DFE2E5;border-radius: 2px;padding-left:30px;}
						.fuzzyqueryList{position: absolute;top:35px;right:0;max-height: 300px;overflow-y: auto;z-index: 10;width:300px;border-radius:3px;border:1px solid #DFE2E5;background-color: #fff;
							li{width:100%;border: 0;text-align:left;padding-left:10px;line-height:30px;font-size:13px;color:#556677;box-sizing: border-box;
								b{font-weight: normal;color:#F5A623;}
							}
							li:hover{background-color: #f5f5f5;}
						}
						button{background: #479CFF;border-radius: 2px;font-size: 14px;color: #FFFFFF;height:30px;line-height:30px;display:inline-block;width:60px;vertical-align: top;}
						img{width:14px;height:14px;position: absolute;right:278px;top:8px;}
						.min_lipboard_wrap{
							position: absolute;top: 68px;left: 0;width: 100%;height:380px;background-color: #fff;z-index: 3;padding:10px 20px;
							.textarea{
							}
							.confirm_tip{
								margin-top: 20px;text-align: right;
								a.button{display: inline-block;width: 88px;height: 30px;line-height: 30px;text-align: center;background-color: #479CFF;color: #fff;font-size: 14px;border:1px solid #479CFF;border-radius: 2px;cursor: pointer;}
								a.button:hover{text-decoration:none;background-color: #387CCC;border-color: #387CCC}
								a.no{color: #479CFF; background-color: #fff;margin-right: 30px;}
								a.no:hover{background-color: #fff;color: #387CCC;}
							}
						}
						.list_over{overflow: auto;height:380px;margin-top: 18px;}
						// 小项部分
						.events_list{
							.list_state{width:100%;height:30px;opacity: 0.9;background: #F5F5F5;padding-left:27px;padding-right: 10px;position: relative;cursor: pointer;
								p{font-size: 13px;color: #556677;line-height:30px;}
								i{position: absolute;top:9px;width:14px;height:14px;left:8px;}
							}
						}
					}
					.events_right{width:28%;border-left:0;background-color:#f6f6f6;
						.right_tit{font-size: 16px;color: #556677;padding:20px 30px 0;}
						.right_num{margin-top:10px;margin-bottom: 10px;padding:0px 30px;
							.right_txt{font-size: 13px;color: #7F8FA4;line-height:24px;}
							.right_btn{border: 1px solid #F5A623;border-radius: 2px;font-size: 12px;color: #F5A623;width:60px;height:24px;line-height: 22px;text-align:center;cursor:pointer;}
						}
						.right_list{
							ul{height:360px;box-sizing: border-box;padding:0px 30px;overflow-y: auto;
								li{border:0;width:100%;text-overflow: ellipsis;white-space: normal;white-space: nowrap;overflow: hidden;position: relative;line-height:16px;height:16px;cursor:default;background: rgba(0,0,0,0);
									i{background:rgba(0,0,0,0);color:#DFE2E5;font-size: 1.1em;vertical-align:top;margin-right:5px;margin-top:1px;cursor:pointer;margin-left: 1px;}
								}
								li:hover{
									i{color: #F5A623;}
								}
							}
							.add_cost{background: #FFFFFF;border-top: 1px solid #DFE2E5;height:30px;
								p{
									font-size: 13px;color: #556677;line-height:30px;text-align:right;padding-right: 10px;
									.cy{padding-right: 20px;cursor: default;}
								}
							}
						}
					}
				}
				.footer_inform{
					>p{font-size: 14px;color: #556677;padding:20px 0;font-weight: 600;
						span{font-size: 14px;color: #999;font-weight: normal;}
					}
				}
				}
			}
			.bgc{background-color:#F9F9F9;}
			div.state_list:hover{background: #F9F9F9;box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);}
		}
		.confirm_btn{width:327px;margin:60px auto 0;
			p{padding:0 30px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height:30px;text-align:center;cursor:pointer;}
			p:hover{border-color: #408CE6;color: #408CE6;}
			.btn_bg{background-color:#479CFF;color:#fff;}
			.btn_bg:hover{border-color: #408CE6;background-color: #408CE6;color:#fff;}
		}
		.pl10{padding-left:10px;}
		// 对插件样式的修改
		.percentage_txt{position: relative;
			input{width:120px;height:30px;padding: 3px 25px 3px 10px;transition: border-color .2s cubic-bezier(.645,.045,.355,1);border-radius:2px;border: 1px solid #bfcbd9;line-height:30px;text-align: left;}
			.percentage{position: absolute;left:100px;top:2px;font-size: 14px;color: #556677;line-height:30px;}
			.prompt{font-size: 13px;color: #7F8FA4;line-height:14px;display:inline-block;vertical-align: middle;margin-left: 5px;}
		}
		.el-form-item__content{width:65%;}
		.el-checkbox{vertical-align: top;margin-right:30px;margin-top: 10px;}
		.el-checkbox .el-checkbox__label{font-size: 12px;color: #556677;width:130px;display:inline-block;word-wrap:break-word;word-break:break-all; white-space:pre-wrap;vertical-align: top;padding-left: 10px;}
		.el-checkbox+.el-checkbox{margin-left: 0;}
		.el-input__inner,.el-textarea__inner{font-size: 13px;border-radius:2px;}
		// 弹框公用样式继承自common.css
		.state_preview{
			.el-dialog{
				width:310px;
				.confirm_tip{
					text-align: right;
					p{text-align: left;font-size: 14px;color: #556677;padding-bottom: 20px;line-height: 20px;}
				}
			}
		}
		// 小项选中时候的字体颜色
		.ptc{
			.el-checkbox__label{color: #479CFF;}
		}
		// 基本信息部分样式
		.basic_info{
			.el-form-item{margin-bottom:20px;}
			.el-form-item__label{height:30px;line-height: 30px;padding:0;}
		}

		// .el-form-item.is-required .el-form-item__label:before{content:'';}

	}
	.my-autocomplete{
		li{line-height:30px;height:30px;font-size: 13px;color: #556677;}
		.el-autocomplete-suggestion__wrap{padding:0;}
	}
	.events_list .el-checkbox__input.is-checked .el-checkbox__inner {
		background-color: #20a0ff !important;
		border-color: #0190fe !important;
	}
	.smallFeePopover{
		background: #F5A623!important;border-color: #F5A623!important;padding: 10px!important;
	 .smallFee{margin-bottom: 0;color: #fff;text-align: left;line-height: 18px;font-size: 13px;}
	 .popper__arrow, .popper__arrow::after{border-top-color: #F5A623!important;}
	}
</style>
