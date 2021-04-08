<template>
	<div class="steptwo_fill_nice" v-loading="loading" element-loading-text="拼命加载中">
    	<p>尼斯推荐</p>
    <div class="fill_state" v-if="draftInfo.length && draftInfo[0].class_id">
    	<div class="tm_info_btn">
    		<button class="creat_url" @click="bigClassVisible=true"><span>+</span>添加商标类别</button>
    	</div>
    	<div class="state" v-for="(info,$draftIndex) in draftInfo">
    		<div class="state_list" :class="{'bgc':$draftIndex === draftIndex}">
    			<!-- 点击收缩时候先保存入allEvents，然后初始化 -->
          <!-- 展开 -->
    			<img class="unwrap" src="~assets/img/release.png" alt="" v-if="info.PackUp" @click="openCurOrder($draftIndex,info)">
          <!-- 收缩 -->
    			<img src="~assets/img/shrinkage.png" alt="" v-if="!info.PackUp" @click="closeCurOrder(info)">
	    		<div class="list_tit clearfix">
	    			<p class="fl serial">{{$draftIndex+1>9 ? $draftIndex+1 : '0'+($draftIndex+1)}}</p>
						<p class="fl order">商标类别</p>
						<p class="fl big_name" :class="{isRecommend: info.recommend}">{{info.class_name}}</p>
	    		</div>
	    		<p class="mt10" v-if="!hasSomething(info)&&info.PackUp" @click="openCurOrder($draftIndex,info)">请完善商标注册信息</p>

          <!-- 收缩后显示的内容 -->
					<ul class="mt10 clearfix"  v-if="info.PackUp && hasSomething(info)">
						<li class="clearfix mb10">
							<p class="state_name fl" :class="{'msgColor':!info.service_nice_min || !info.service_nice_min.length}">小项信息</p>
							<p class="state_txt fl" :class="{'msgColor':!info.service_nice_min || !info.service_nice_min.length}">
								共{{info.service_nice_min && info.service_nice_min.length || 0}}个小项
								<template v-if="info.service_nice_min && info.service_nice_min.length">
								（<span v-for="item in info.service_nice_min">{{item.min_name + '，'}}</span>）
								</template>
							</p>
						</li>
					</ul>

					<div class="add mt20" v-if="$draftIndex === draftIndex&&!info.PackUp">
						<p>请选择商标小项：</p>
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
									<p class="right_txt fl">10项内免费，已选<span class="cy">{{curSelectedSmallList.length}}</span>项</p>
									<p class="right_btn fr" @click="resetEvent">重置</p>
								</div>
								<div class="right_list">
									<ul>
										<li v-for="events in curSelectedSmallList" style="text-align:left" class="mb10">
											<i class="el-icon-circle-close" @click="moveSmall(events.min_id)"></i>
											{{events.min_name}}
										</li>
									</ul>
									<div class="add_cost">
										<p>加项费用(元）
											<el-tooltip placement="top-end" width="140" trigger="hover" popper-class="smallFeePopover" :disabled="curSelectedSmallList.length<11" v-model="showMoreSmallTip">
				                <p slot="content" class="smallFee">已超出{{curSelectedSmallList.length-10}}个小项<br>追加费用60x{{curSelectedSmallList.length-10}}元</p>
											  <span class="cy">￥{{curSelectedSmallList.length && curSelectedSmallList.length>10 ? (curSelectedSmallList.length-10)*60 : '0'}}.00</span>
				              </el-tooltip>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<a href="#" class="del" :class="{disabled: draftInfo && draftInfo.length == 1}" @click.prevent="askDelete($draftIndex)">删除</a>
				</div>
    	</div>
	    <div class="confirm_btn clearfix" v-if="!loading">
	    	<button class="creat_url" @click="makeUrl">生成小项推荐链接</button>
			</div>
			<div class="confirm_url mt20" v-if="userCenter">
				<p><span>{{userCenter}}</span><button class="ml15 copy_url" :data-clipboard-text="userCenter">{{copyTxt}}</button></p>
			</div>
    </div>
    <div class="draft_null" v-if="(!draftInfo.length || !draftInfo[0].class_id) && !loading">
    	<img src="~assets/img/nice/draftInfoNull.png" alt="">
    	<p>尼斯没有收到商标类别指令，无法推荐哦，快去添加商标类别吧！</p>
    	<button @click="bigClassVisible=true">添加商标类别</button>
    </div>

		<el-dialog title="提示"
		  :visible.sync="dialogVisible" class="state_preview" :modal-append-to-body="true" :lock-scroll="false">
			<div class="confirm_tip">
		  	<p>更换商标类别将重置已选小项，确定更换？</p>
		  	<a href="" class="button no" @click.prevent="dialogVisible = false">取消</a><a href="" class="button yes" @click.prevent="changeBig()">确定</a>
		  </div>
		</el-dialog>
		<!-- 删除前确认 -->
    <el-dialog title="提示" :visible.sync="confirmVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="state_preview" top="40%">
		  <div class="confirm_tip">
		  	<p>确定删除该商标类别？</p>
		  	<a href="" class="button no" @click.prevent="confirmVisible=false">取消</a><a href="" class="button yes" @click.prevent="deleteBig()">确定</a>
		  </div>
		</el-dialog>

		<!-- 请选择商标类别 -->
    <el-dialog title="请选择商标类别" v-if="bigClassVisible" :visible.sync="bigClassVisible" :close-on-click-modal="false" :close-on-press-escape="false" class="confirmD bigClassSelect" top="50%">
			<div class="bigClasses">
				<el-checkbox-group v-model="checkedBigList">
					<ul>
						<li v-for="(item, idx) in bigState" :key="item.class_id"><el-checkbox :label="item.class_id" :disabled="allSelectedBigData.indexOf(idx+1) != -1">{{idx+1 < 10 ? '0' + (idx+1) : (idx+1)}}{{item.class_govern_name}}</el-checkbox></li>
					</ul>
				</el-checkbox-group>
			</div>
		  <div class="confirm_tip">
		  	<a href="" class="button no" @click.prevent="bigClassVisible=false">取消</a><a href="" class="button yes" @click.prevent="addBig()">确定</a>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
  import qs from 'qs'
	import $ from 'jquery'
	import VueCookie from 'vue-cookie'
	import {store} from 'utils/';
	import Clipboard from 'clipboard';
	import uploader from 'cps/uploader/uploader.vue';
	const userUrl = CONFIG.userUrl;
	const niceUrl= './api/getNiceClass';
	const niceEventsUrl = './api/getCxbNiceGroupByClassId';
  const createClassUrl = '/iprp_servicer/api/createClassLink';  //生成小项推荐链接
	export default {
  	components: {
  		uploader
    },
    data() {
      return {
        order_sn:'',
      	loading:false,
      	textareaV:'',//小项剪切板文本框数据
      	showMinClipboard: false, //小项剪切板
      	// copyed: false,
      	orignBigsData: {}, // 保存原有的大类
      	checkedBigList:[],
      	bigClassVisible: false,
      	confirmVisible: false,
      	showMoreSmallTip: false,
      	draftInfo:[],
      	// 当前展开的服务单的索引
      	draftIndex:'',
      	dialogVisible:false,

      	// 当前选中的小项id列表
      	curSelectedSmallIdList:[],
      	// 当前选中的小项列表[{}]
      	curSelectedSmallList: [],
      	// 搜索小项
      	searchEvents:'',
      	// 是否选中
      	selectedState:true,
      	//当前选中的大项的索引，index这儿是个极差的命名，
      	index:'',
      	//当前服务单对应的index
      	// serviceIndex:'',
      	// 查询到的小项
      	niceEventsData:{},
      	// 小项加载loading
      	smallLoading: false,
      	//该商标下所有服务单信息
      	// work_order_service_list:[],
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
      	userUrl:userUrl,
      	userCenter:'',
      	copyTxt:'复制',
      	clipboard:''
      }
    },
    methods: {
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
    	//生成小项链接
    	makeUrl(){
    		this.loading = true;
    		let data = {
    			class_info:this.draftInfo
    		}
    		for(let r in data.class_info){
    			// delete data.class_info[r].PackUp;
    			if(!data.class_info[r].service_nice_min || !data.class_info[r].service_nice_min.length){
    				delete data.class_info[r].service_nice_min;
    			}
    		}
    		this.$http.post('./api/createRecLink',data)
    		.then((resp)=>{
    			this.userCenter=userUrl+'/iprp/#/recommendNiceLink'+resp.data
    			console.log(this.draftInfo)
    			this.loading = false;
          window.localStorage.removeItem(this.order_sn);
    		})
    		.catch((err)=>{
    			console.log(err)
    			this.loading = false;
    		})
    	},
    	//判断所有字段是否都填写完整
    	hasSomething(info){
    		return info.service_nice_min && info.service_nice_min.length
    	},
    	//添加大类
    	addBig(){
				var arr = [];
				this.checkedBigList.forEach((item, index) => {
					var data = {
				    service_nice_min: [],
				    PackUp:true
					};
					data.class_id = item;
					data.class_name = '第'+ (item < 10 ? '0' + item : item) + '类-' + this.bigState[item-1].class_govern_name;
          console.log(item)
					this.allSelectedBigData.push(item);
					// 如果在原有的大类数据中，则不打推荐标志
					if(this.orignBigsData && this.orignBigsData.length){
						this.orignBigsData.forEach((it, idx) => {
							if (it.class_id == item) {
								data.recommend = false;
								data.isAsistantremarks = it.isAsistantremarks;
								data.order_sn = it.order_sn;
							}
						});
					}
					console.log(data)
					arr.push(data);
				});
				// 当步骤3没有选择大类时，这儿置空
				if (this.draftInfo.length && !this.draftInfo[0].class_id) {
					this.draftInfo = []
				}
    		this.draftInfo = this.draftInfo.concat(arr);
    		this.checkedBigList = [];
    		this.bigClassVisible = false;
        console.log(this.allSelectedBigData)
    	},
    	//删除二次确认
    	askDelete(index){
    		if (this.draftInfo.length === 1) {
    			return;
    		}
    		//收缩展开的大类
    		if (this.draftInfo[index].PackUp) {
	    		this.draftInfo.forEach((item) => {
	    			item.PackUp = true;
	    		})
    		}
    		this.confirmVisible = true;
    		this.draftIndex = index;
    	},
    	deleteBig(){
    		// 删除黑名单中的大类id
    		var curItem = this.draftInfo[this.draftIndex];
    		var allSelectedBigData = this.allSelectedBigData;
    		var idx = allSelectedBigData.indexOf(curItem.class_id);
    		if (idx !== -1) {
    			allSelectedBigData.splice(idx, 1);
    		}
    		this.draftInfo.splice(this.draftIndex, 1);
    		this.confirmVisible = false;
    	},

      resetMaterialReportUploader(valueName, index){
      	this.draftIndex = index;
      	let obj = this.draftInfo[this.draftIndex];
      	obj[valueName] = '';
      	obj[valueName+'_name'] = '';
      	this.$set(this.draftInfo, index, obj);
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
			  // this.hideMoreSmallTip();
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
					group_id:'',
					min_id:'',
					min_name:'',
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
      	this.showMoreSmallTip = this.curSelectedSmallList.length>10;
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
      // 模糊查询
      DataFuzzyQuery(data){
      	var self = this;
      	data = data.toUpperCase();
      	self.FuzzyQueryData = [];
      	if (!data) {return;}
      	for(var i=0;i<self.niceEventsData.length;i++){
      		for(var h=0;h<self.niceEventsData[i].min_data.length;h++){
      			var min_name = self.niceEventsData[i].min_data[h].min_name;
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
      }
    },
    mounted() {
    	//获取45大类数据
    	let self = this;
    	this.obtainNice();
    	this.order_sn = this.$route.query.order_sn;
    	if(this.order_sn){
        let data = qs.parse(window.localStorage.getItem(this.order_sn));
        if(data.class_info){
          for(let r in data.class_info){
            data.class_info[r].PackUp = true;
            self.allSelectedBigData.push(Number(data.class_info[r].class_id));
          }
          self.draftInfo = data.class_info;
        }
    	}
    	this.clipboard = new Clipboard('.copy_url');
    	this.clipboard.on('success', (e) => {
    		self.copyTxt = "复制成功";
	      self.$message({
	        message: '推荐链接已复制到剪切板',
	        type: 'success'
	      });
	    });
      this.addBig();
    }
  }
</script>
<style lang='less'>
	.steptwo_fill_nice{
		// 字体淡黄色
		.cy{color: #F5A623;}
    // msg color
    .msgColor{color: #F64744 !important;}
		// 上传图片
		.upload_component{position: relative;
			.upload_tip{
				position: absolute;left: 140px;bottom:0;width:220px;font-size: 12px;color: #556677;line-height: 16px;
				p.format{color: #A8AFB5;padding-top: 5px; }
				p.autofill{font-size: 14px;color: #479CFF;line-height: 19px;cursor: pointer;}
			}
		}
		>p{font-size: 16px;color: #556677;height:60px;line-height:60px;padding-left:20px;border:1px solid #DFE2E5;background:#F5F5F5;border-bottom: 0;}
		.fill_state{padding:30px 90px;background-color:#fff;min-height: 500px;border:1px solid #DFE2E5;
			>p{font-size: 16px;color: #223344;}
			.tm_info_btn{
				padding:0px 0 25px;
				button{height:30px;padding:0 15px;line-height:28px;border-radius: 2px;border: 1px solid #479CFF;color:#479CFF;font-size:13px;}
				.add_big{
					background: #479CFF;color: #fff;
					span{color:#fff;}
				}
				// .creat_url{margin-left: 10px;}
			}
			.state{border: 1px solid #DFE2E5;padding:0px;margin-top: -1px;}
			// .shadow{box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);background: #F9F9F9;}
			div.state_list{padding:22px 0 20px;position: relative;
				>p{font-size: 14px;color: #479CFF;cursor:pointer;margin-left: 58px;width:126px;}
				>img{
					position: absolute;top:22px;right:22px;width:26px;
					&:hover{cursor: pointer;}
				}
				.list_tit{padding:0 22px;
					>p{font-size: 14px;color: #556677;line-height:40px;text-align:left;}
					.serial{width:38px;}
					.order{width:128px;}
					.big_name{padding-left: 22px;}
					.isRecommend{background: transparent url(~assets/img/tmApplySubmit/jian.png) 0 0 no-repeat;}
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
					>p{
						font-size: 14px;color: #556677;font-weight: 600;
						span{font-size: 12px;color: #A8AFB5;font-weight: 400;}
					}
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
								ul{height:330px;box-sizing: border-box;padding:0px 30px;overflow-y: auto;
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
				}
				.del{
					position: absolute;right: 20px;bottom: 10px;font-size: 13px;color: #7F8FA4;
					&:hover{color: #479CFF;}
				}
				a.disabled{
					color: #ccc;
					&:hover{text-decoration: none;color: #ccc;cursor: default;}
				}
			}
      .bgc{background-color:#F9F9F9;}
      div.state_list:hover{background: #F9F9F9;box-shadow: 0 1px 4px 0 rgba(0,0,0,0.08);}
		}
		.draft_null{padding-top:214px;min-height:800px;background-color:#fff;text-align: center;border:1px solid #DFE2E5;
			>p{font-size:13px;color:#999;line-height:18px;padding-top:13px;}
			>button{margin-top:48px;width:120px;height:32px;border-radius:3px;color:#479cff;font-size:14px;line-height:32px;text-align:center;border:1px solid #479cff;}
		}
		.confirm_btn{width:136px;margin:60px auto 0;
			p{padding:0 30px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height:30px;text-align:center;cursor:pointer;}
			p:hover{border-color: #408CE6;color: #408CE6;}
			.btn_bg{background-color:#479CFF;color:#fff;}
			.btn_bg:hover{border-color: #408CE6;background-color: #408CE6;color:#fff;}
			button{height:30px;padding:0 15px;line-height:28px;border-radius: 2px;border: 1px solid #479CFF;color:#479CFF;font-size:13px;}
		}
		.confirm_url{text-align:center;
			p{text-align:center;font-size:13px;
				span{color:#334455;vertical-align: middle;}
				button{height:30px;padding:0 15px;line-height:28px;border-radius: 2px;border: 1px solid #479CFF;color:#479CFF;font-size:13px;}
			}
		}
		.pos_bt{
			margin-top: 145px;
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

	.bigClassSelect{
		.el-dialog{
			width: 650px;margin-top: -238px;
			.el-dialog__body{
				padding-top: 15px;
				.bigClasses{
					width: 610px;height: 354px;padding: 20px;background: #F9F9F9;
					ul{
						width: 100%;height: 314px;
						li{
							float: left;width: 20%;height: 18px;line-height: 18px;margin-bottom: 19px;padding:0 5px;
							.el-checkbox{
								margin-top: 0;margin-right: 0;
								.el-checkbox__label{width: auto;font-size: 13px;color: #556677;}
							}
						}
					}
				}
				.confirm_tip{
					text-align: center;padding-top: 20px;
					p{text-align: left;font-size: 14px;color: #556677;padding-bottom: 20px;line-height: 20px;}
				}
			}
		}
	}
</style>
