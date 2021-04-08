<template>
	<div class="basic_info_shop" v-loading="loading">
		<p>基本信息</p>
		<el-form label-width="120px" class="service_list" :model="shopInfo" :rules="rules" ref="shopInfo">
		  <el-form-item class="shop_name" label="店铺名称" prop="store_name">
		    <el-input v-model="shopInfo.store_name" placeholder="请输入店铺名称" maxlength="20"></el-input>
		    <span class="name_length">{{shopInfo.store_name?shopInfo.store_name.length:0}}/20</span>
		  </el-form-item>
			
			<el-form-item label="店铺logo" prop="store_logo" required>
        <div class="upload_component">
          <uploader
            @complete="setUploadedData"
            @resetUploader="resetUploader"
            :postAction="'iprp_servicer/api/file/allUpload'"
            :url="shopInfo.store_logo"
            :valueName="'store_logo'"
            :size="0.08"
            :extensions="'jpg,jpeg,png,bmp'"></uploader>
          <div class="upload_tip">
            <p class="format">用于标识店铺，格式JPG、JPEG、PNG 大小80KB以内 建议尺寸100PX*100PX</p>
          </div>
        </div>
      </el-form-item>

		  <el-form-item label="店铺联系电话" prop="store_phone" required>
		    <el-input v-model="shopInfo.store_phone" placeholder="请输入店铺联系电话" maxlength="13"></el-input>
		  </el-form-item>
		  <el-form-item label="店铺邮箱" prop="store_email">
		    <el-input v-model="shopInfo.store_email" placeholder="请输入店铺邮箱" maxlength="50"></el-input>
		  </el-form-item>
		  <el-form-item label="客服QQ" prop="store_qq" required>
		    <el-input v-model="shopInfo.store_qq" placeholder="请输入客服QQ" maxlength="12"></el-input>
		    <span class="placeholder">推荐使用营销QQ或腾讯企点账号；若使用普通QQ，请查看<a @click="QQset = true">设置规则</a></span>
		  </el-form-item>

		  <el-form-item label="店铺工作时间" required>
		  	<template v-for="(item,index) in weekLists">
		  		<div class="week_list mb10" v-if="item.checkBol">
			    	<el-select v-model="item.weekFirst" placeholder="请选择">
					    <el-option
					      v-for="info in weekOptions"
					      :key="info.label"
					      :label="info.value"
					      :value="info.label">
					    </el-option>
					  </el-select>
					  <span>-</span>
						<el-select v-model="item.weekNext" placeholder="请选择">
					    <el-option
					      v-for="info in weekOptions"
					      :key="info.label"
					      :label="info.value"
					      :value="info.label"
					      :disabled="item.weekFirst>=info.label">
					    </el-option>
					  </el-select>
					  <el-time-select
					  	class="ml5"
					    placeholder="起始时间"
					    v-model="item.workTime[0]"
					    :picker-options="{
					      start: '00:00',
					      step: '00:05',
					      end: '24:00'
					    }">
					  </el-time-select>
					  <span>-</span>
					  <el-time-select
					    placeholder="结束时间"
					    v-model="item.workTime[1]"
					    :picker-options="{
					      start: '00:00',
					      step: '00:05',
					      end: '24:00'
					    }">
					  </el-time-select>
					  <span v-if="index > 0" class="move_week_time ml5" @click="moveWeek(item)"><i class="el-icon-minus"></i></span>
					  <p class="err_time">{{item.errTime}}</p>
			    </div>
		  	</template>
				<p class="plus_week" @click="addWeeks" v-if="weekListNum<3"><i class="el-icon-plus"></i></p>
		  </el-form-item>
		</el-form>
		<button @click="submitForm('shopInfo')">保存</button>
		<el-dialog title="客服QQ设置规则" width="510px" :visible.sync="QQset" :close-on-click-modal="false" :append-to-body="true">
			<div class="set_list mb15">
				<p>
					<span>1</span>
					登录QQ推广平台，确认免费开通通讯组件，
					<a href="http://shang.qq.com/v3/widget.html" target="_blank">点击跳转</a>
				</p>
				<img class="mt10 ml20" src="~assets/img/shop/qqSet1.png" alt="">
			</div>
			<div class="set_list mb15">
				<p>
					<span>2</span>
					点击推广工具->设置栏
				</p>
				<img class="mt10 ml20" src="~assets/img/shop/qqSet2.png" alt="">
			</div>
			<div class="set_list mb15">
				<p>
					<span>3</span>
					在下方的会话能力中，勾选“通过已申请体验版营销QQ代收WPA会话消息”
				</p>
				<img class="mt10 ml20" src="~assets/img/shop/qqSet3.png" alt="">
			</div>
			<div class="set_list">
				<p>
					<span>4</span>
					点击保存，设置完成。客户可通过客服QQ与您联系
				</p>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {store} from 'utils/';
	import uploader from 'cps/uploader/uploader.vue'
	import photo from 'assets/img/index/photo.png';
	const weekOptions = [
		{
			label:1,
			value:'周一'
		},
		{
			label:2,
			value:'周二'
		},
		{
			label:3,
			value:'周三'
		},
		{
			label:4,
			value:'周四'
		},
		{
			label:5,
			value:'周五'
		},
		{
			label:6,
			value:'周六'
		},
		{
			label:7,
			value:'周日'
		}
	];
	const weekLists = [
		{
			weekFirst:'',
			weekNext:'',
			workTime:['08:00', "18:00"],
			checkBol:true,
			errTime:''
		},
		{
			weekFirst:'',
			weekNext:'',
			workTime:['08:00', "18:00"],
			checkBol:false,
			errTime:''
		},
		{
			weekFirst:'',
			weekNext:'',
			workTime:['08:00', "18:00"],
			checkBol:false,
			errTime:''
		}
	]
	export default {
  	components: {
  		uploader
    },
    data() {
    	let dlqy_checkPhone = (rule, value, callback) => {
	      let reg = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
	      if (!value) {
	          return callback(new Error('请填写店铺联系电话'));
	      }
	      setTimeout(() => {
	          if (!reg.test(value)) {
	            callback(new Error('请填写正确的联系电话，固话前请加区号和-'));
	          } else {
	            callback();
	          }
	      }, 50);
	    };
	    let dlqy_checkQQ = (rule, value, callback) => {
	      let reg = /[1-9][0-9]{4,}/;
	      if (!value) {
	          return callback(new Error('请填写客服QQ'));
	      }
	      setTimeout(() => {
	          if (!reg.test(value)) {
	            callback(new Error('请填写正确的客服QQ'));
	          } else {
	            callback();
	          }
	      }, 50);
	    };
	    
      return {
      	QQset:false,//qq设置规则
      	weekOptions:weekOptions,
      	weekLists:weekLists,
      	weekListNum:1,//当前店铺添加的时间数量
      	shopInfo:{
      		store_name:'',
      		store_phone:'',
      		store_email:'',
      		store_qq:'',
      		store_logo:'',
      	},
      	loading:false,

      	rules: {
      		store_name:[
      			 { required: true, message: '店铺名称不能为空', trigger: ['change', 'blur'] }
      		],
      		store_phone:[
      			{ validator: dlqy_checkPhone, trigger: ['change', 'blur'] }
      		],
      		store_email:[
      			 { required: true, message: '店铺邮箱不能为空', trigger: 'blur' },
      			 {type: 'email', message: '店铺邮箱格式错误', trigger: 'blur'}
      		],
      		store_qq:[
      			{ validator: dlqy_checkQQ, trigger: ['change', 'blur'] }
      		],
      		store_logo:[
      			 { required: true, message: '请上传店铺logo', trigger: 'blur' }
      		]

      	}
      }
    },
    methods: {
    	addWeeks(){//添加店铺工作时间表
    		let self = this;
    		this.weekListNum = 1;
    		console.log(this.weekLists)
    		this.weekLists.forEach((item)=>{//判断是否已经存在三个
    			if(item.checkBol){
    				self.weekListNum = self.weekListNum + 1;
    			}
    		})
    		for(let r in this.weekLists){
    			if(!self.weekLists[r].checkBol){
    				self.weekLists[r].checkBol = true;
    				return;
    			}
    		}
    	},
    	
    	weeksAddBtn(){// 初始化的时候是否显示添加时间按钮
    		let self = this;
    		this.weekListNum = 0;
    		console.log(this.weekLists)
    		this.weekLists.forEach((item)=>{//判断是否已经存在三个
    			if(item.checkBol){
    				self.weekListNum = self.weekListNum + 1;
    			}
    		})
    	},
    	moveWeek(item){//删除当前工作时间
    		item.checkBol = false;
    		item.workTime = ['08:00', "18:00"];
    		item.weekNext = '';
    		item.weekFirst = '';
    		let self = this;
    		this.weekListNum = 0;
    		console.log(this.weekLists)
    		this.weekLists.forEach((item)=>{//判断是否已经存在三个
    			if(item.checkBol){
    				self.weekListNum = self.weekListNum + 1;
    			}
    		})
    	},
    	submitForm(formName) {//表单校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.verifyTime();
          } else {
            console.log(this.weekLists)
            // this.verifyTime();
            return false;
          }
        });
      },
			resetUploader(valueName){//reset上传组件
				console.log(valueName)
				this.shopInfo[valueName] = '';
			},
			setUploadedData(data){//上传成功后设置数据
				this.shopInfo[data.valueName]= data.data.url;
				console.log('companyForm', this.shopInfo)
			},
    	search(){//获取初始化数据
    		this.loading = true;
    		this.$http.get('./api/store')
    		.then((resp) => {
    			this.loading = false;
    			if(resp.data[0]){
    				this.shopInfo = resp.data[0];
	    			let workTime = resp.data[0].store_work_time;
	    			this.timeSplit(workTime);
    			}
    			// console.log(resp.data[0])
	    	})
	    	.catch((err) => {
	    		this.loading = false;
	    		// console.log(err.data.msg);
	    	});
    	},
    	timeSplit(info){//工作时间是字符串，需要处理成需要的数组
    		let self = this;
    		let data = info.split(',');//拆分工作时间数量
    		for(let r in data){
    			this.weekLists[r].checkBol = true;
    			console.log(data[r],'一次拆分，拆分时间和日期')
    			let timeWeek = data[r].split('：')
    			console.log(timeWeek,'二次拆分，日期拆分')
    			this.weekLists[r].weekFirst = this.workDate(timeWeek[0].split('至')[0]);
    			this.weekLists[r].weekNext = this.workDate(timeWeek[0].split('至')[1]);
    			// 时间转单独的数组
    			let timeData = [];
    			console.log(data[r])
    			timeData.push(timeWeek[1].split('-')[0]);
    			timeData.push(timeWeek[1].split('-')[1]);
    			this.weekLists[r].workTime = timeData;
    		}
    		this.weeksAddBtn();
    	},
    	workDate(data){//将获取的日期转换为数字
    		var ret = 0;
				switch (data){
					case '周一':
						ret = 1;
						break;
					case '周二':
						ret = 2;
						break;
					case '周三':
						ret = 3;
						break;
					case '周四':
						ret = 4;
						break;
					case '周五':
						ret = 5;
						break;
					case '周六':
						ret = 6;
						break;
					case '周日':
						ret = 7;
						break;
				}
				return ret;
    	},
    	verifyTime(){//工作时间校验
    		this.weekLists.forEach((item)=>{//错误提示初始化
    			item.errTime = '';
    		})
    		for(let r in this.weekLists){
    			if(this.weekLists[r].checkBol){
    				if(!this.weekLists[r].weekFirst || !this.weekLists[r].weekNext || !this.weekLists[r].workTime[0] || !this.weekLists[r].workTime[1]){
	    				this.weekLists[r].errTime = "请选择工作时间";
	    				return;
	    			}
    			}
    		}
    		this.jointTime();
    	},
    	weekDate(data) {//日期过滤
				var ret = ''
				switch (data+''){
					case '1':
						ret = "周一";
						break;
					case '2':
						ret = "周二";
						break;
					case '3':
						ret = "周三";
						break;
					case '4':
						ret = "周四";
						break;
					case '5':
						ret = "周五";
						break;
					case '6':
						ret = "周六";
						break;
					case '7':
						ret = "周日";
						break;
				}
				return ret;
			},
		  jointTime(){//工作时间拼接
    		let timeArr = []
				this.weekLists.forEach((item)=>{//错误提示初始化
    			if(item.checkBol){
    				let timeData = [
    					this.weekDate(item.weekFirst),
    					this.weekDate(item.weekNext),
    					item.workTime.join('-')
    				]
    				let timeDatas = timeData[0]+"至"+timeData[1]+"："+timeData[2]
    				timeArr.push(timeDatas)
    			}
    		})
    		this.saveInfo(timeArr)
    	},
    	saveInfo(info){//保存
    		let data = {}
    		this.shopInfo.store_work_time = info.join(',');
    		// console.log(data)
    		data = Object.assign(data,this.shopInfo);
    		// console.log(this.shopInfo,'最终结果')
    		if(this.shopInfo.store_id){//有id为编辑
					this.$http.put('./api/store',data)
	    		.then((resp) => {
	    			this.$message.success('修改成功！');
	    			this.search();
	    			// this.btnName = '修改'
		    	})
		    	.catch((err) => {
		    		if (err && err.msg) {
		    			this.$message.error(err.msg);
		    		}
		    	});
    		}else{//没有id为新增
    			this.$http.post('./api/store',data)
	    		.then((resp) => {
	    			this.$message.success('新增成功！');
	    			this.search();
	    			// this.btnName = '修改'
		    	})
		    	.catch((err) => {
		    		if (err && err.msg) {
		    			this.$message.error(err.msg);
		    		}
		    	});
    		}
    		
    	},
    },
    mounted() {
    	this.search();
    },
  }
</script>
<style lang='less'>
	.basic_info_shop{
		>p{font-size: 14px;color: #223344;padding:20px 0 0 20px;}
		.service_list{
			padding:20px 20px 0px 20px;
			.shop_name{
				input{padding-right: 45px;}
			}
			.el-form-item__content{
				position: relative;
				.placeholder{font-size:12px;color:#A8AFB5;
					a{cursor: pointer;color:#479CFF;}
				}
				.name_length{position: absolute;left:380px;font-size:12px;color:#A8AFB5;top:0;}
			}
			.el-date-editor .el-range__close-icon{line-height: 24px;}
			.photo{margin-bottom:20px; }
			.upload_component{
		    position: relative;
		    .upload_tip{
		      position: absolute;left: 140px;bottom:0;width:220px;font-size: 12px;color: #556677;line-height: 16px;
		      p.format{color: #A8AFB5;padding-top: 5px; }
		    }
		  }
		  p.plus_week{width:20px;height:20px;border-radius:20px;border: 1px solid #479cff;color:#479cff;text-align:center;line-height:18px;font-size:12px;cursor: pointer;margin-top: -9px;}
		}
		.el-form-item{margin-bottom:20px;
			label{font-size: 13px;text-align:left;}
			.el-input{
				input{height: 30px;width:422px;}
			}

		  .week_list{
		  	.el-select{
		  		.el-input input{width:100px;}
		  	}
		  	.el-date-editor.el-input{width:100px;
		  		 input{width:100px;padding-left:30px;padding-right:20px;}
		  		 .el-input__prefix{top:1px;
		  		 	i{line-height:30px;}
		  		 }
		  	}
		  	.el-date-editor--timerange{
		  		height:30px;vertical-align: bottom;width:200px;
		  		.el-range-separator,.el-range__icon {line-height:24px;}
					.el-range-separator{padding:0;width:20px;color:#A8AFB5;}
		  	}
		  	.move_week_time{display:inline-block;width:20px;height:20px;border-radius:20px;border: 1px solid #479cff;color:#479cff;text-align:center;line-height:18px;font-size:12px;cursor: pointer;}
		  	.err_time{font-size:12px;color:#F64744;font-size:12px;line-height:1;padding-top:4px;}
		  }
		}
		>button{width:88px;height:30px;line-height:30px;border-radius:2px;background: #479CFF;font-size: 14px;color: #FFFFFF;margin-left: 140px;}
		>button:hover{border-color: #387CCC;background-color: #387CCC;}
	}
.set_list{
	p{
		font-size:13px;color:#556677;line-height:18px;
		span{display:inline-block;width:20px;height:20px;font-size:12px;color:#fff;background-color:#479CFF;text-align:center;line-height:20px;border-radius:100%;}
		a{color:#479CFF;}
	}			
}
</style>
