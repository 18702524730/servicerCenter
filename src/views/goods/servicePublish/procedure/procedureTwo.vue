<template>
	<div class="precedure_two">
		<el-form ref="product" :model="product" :rules="rules" label-width="140px">
		  <el-form-item label="服务名称" prop="service_name">
		    <el-input v-model="product.service_name" maxlength="35" placeholder="请输入服务名称"></el-input>
		    <span class="txt_num ml10">{{product.service_name.length}}/35</span>
		  </el-form-item>
		  <el-form-item label="服务描述" prop="product_introduce">
		    <el-input type="textarea" maxlength="100" :rows="5" v-model="product.product_introduce" placeholder="请填写服务描述"></el-input>
		    <span class="txt_num">{{product.product_introduce.length}}/100</span>
		  </el-form-item>
		  <el-form-item label="封面" prop="picture">
			  <div class="upload_component">
			  	<uploader @complete="setUploadedDataBlack" @resetUploader="resetUploader" :fileName="picture_name" :postAction="'iprp_servicer/api/file/uploadServicePic'" :url="product.picture" :valueName="'picture'" :size="2" :extensions="'jpg,jpeg,png'"></uploader>
          <div class="upload_tip">
            <p class="format">格式JPG、JPEG、PNG 大小2M以内；建议尺寸340PX*340PX</p>
          </div>
			  </div>
		  </el-form-item>
		  <el-form-item label="服务售价" prop="service_price" class="discounted" required>
		    <el-input type="text" :maxlength="7" v-model="product.service_price" placeholder="请填写服务售价"></el-input>
		    <span>元</span>
		  </el-form-item>
		  <el-form-item label="折扣价格">
		  	<el-checkbox v-model="product.use_sale_price">使用折扣价格</el-checkbox>
		  </el-form-item>
		  <el-form-item label="" class="discounted" prop="sale_price" v-if="product.use_sale_price&&product.use_sale_price!=2">
		    <el-input type="text" :maxlength="7" v-model="product.sale_price" placeholder="请填写折扣价格"></el-input>
		    <span>元</span>
		  </el-form-item>

		  <el-form-item label="服务详情-PC" required>
			  <div class="editor_elem">
			  	<div ref="editorElem" id="editorElem" style="text-align:left"></div>
    		</div>
		  </el-form-item>

		  <div class="popover mb10">
		  	<el-popover
				  placement="top"
				  width="220"
				  trigger="click"
				  v-model="addDemo">
				  <div class="addDemo" v-if="demoData.length<10">
				  	<p>设置新模板名称</p>
				  	<el-input type="text" maxlength="15" v-model="demoName" placeholder="模板名称"></el-input>
				  	<div class="mt10">
			  			<span @click="cancelDemo">取消</span>
			  			<span @click="saveDemo">保存</span>
			  		</div>
				  </div>
				  <el-button slot="reference" class="mb10 mr10"><i class="el-icon-plus"></i>存为模板</el-button>
				</el-popover>
				
				<div class="demo_lists mb10 mr10" v-for="(item,index) in demoData" :class="{'demo_check':index === demoIndex}" @click="pushEditor(item,index)">
			  	<div>
			  		<span class="name">{{item.templet_name}}</span>
			  		<el-popover
					  placement="bottom"
					  width="125"
					  trigger="click"
					  v-model="item.moveCheck">
					  	<div class="moveDemo">
					  		<p>是否删除该信息？</p>
					  		<div>
					  			<span @click.stop="item.moveCheck=false">否</span>
					  			<span @click.stop="moveDemo(item)">是</span>
					  		</div>
					  	</div>
						  <i class="el-icon-delete" slot="reference" @click.stop="item.moveCheck=true"></i>
						</el-popover>
			  	</div>
			  	<p>创建于：{{item.create_time|dateFormat}}</p>
			  </div>
		  </div>
		  <el-form-item label="是否支持开票" prop="need_ticket">
		  	<el-radio-group v-model="product.need_ticket">
			  	<el-radio label="1">支持开票</el-radio>
	  			<el-radio label="2">不支持开票</el-radio>
	  		</el-radio-group>
		  </el-form-item>
		  <el-form-item class="next_btn">
		    <el-button @click="lastTo">上一步</el-button>
		    <el-button type="primary" @click="nextTo">下一步</el-button>
		  </el-form-item>
		</el-form>
		
   <!-- <button @click="getContent">查看内容</button> -->
	</div>	
</template>

<script>
	const codeImgUrl = CONFIG.rootUrl+'/servlet/captchaCode?t=';
	const loginUrl = './api/login';

	import {store} from 'utils/';
	import qs from 'qs';
	import Editor from 'wangeditor'
	import uploader from 'cps/uploader/uploader.vue';
	import Filters from 'utils/filters/'
	import merge from 'webpack-merge'
 	const userUrl = CONFIG.userUrl;
 	const uploadUrl = userUrl + '/api/file/upload';
	export default{
		props:['prodectTwoInfo'],
		data(){
			let servicePrice = (rule, value, callback) => {
	      let reg = /[1-9]\d{0,7}$/;
	      if (!value) {
	          return callback(new Error('请填写服务售价'));
	      }
	      setTimeout(() => {
	          if (!reg.test(value)) {
	            callback(new Error('请填写1000000以内的整数数字'));
	          } else {
	            callback();
	          }
	      }, 50);
	    };
	    let salePrice = (rule, value, callback) => {
	      let reg = /[1-9]\d{0,7}$/;
	      if (!value) {
	          return callback(new Error('请填写折扣价格'));
	      }
	      setTimeout(() => {
	          if (!reg.test(value)) {
	            callback(new Error('请填写1000000以内的整数数字'));
	          } else {
	            callback();
	          }
	      }, 50);
	    };
			return{
				demoIndex:null,
				addDemo:false,
				addDemo01:false,
				demoName:'',//模板名
				invoiceType:0,//是否支持发票
        editorContent: '',
        product: {
          service_name: '',
          product_introduce: '',
          picture: '',
          service_price: '',
          sale_price: '',
          use_sale_price: false,
          descriptions: '',
          need_ticket: '',
        },
        picture_name:'',
        picture:'',
        rules: {
        	need_ticket:[
        		{ required: true, message: '请选择是否开票', trigger: 'blur' }
        	],
        	service_name:[
        		{ required: true, message: '请输入服务名称', trigger: 'blur' }
        	],
        	picture:[
        		{ required: true, message: '请输入上传封面', trigger: 'blur' }
        	],
        	product_introduce:[
        		{ required: true, message: '请输入服务描述', trigger: 'blur' }
        	],
        	service_price:[
        		{ validator: servicePrice, trigger: ['change', 'blur'] }
        	],
        	sale_price:[
        		{ validator: salePrice, trigger: ['change', 'blur'] }
        	],
        },

        demoData:[],//模板数量
        editor:null,
        serviceId:''
			}
		},
		components:{
			uploader
		},
		methods:{
			pushEditor(data,index){//当前选中的模板，渲染到富文本框
				this.demoIndex = index;
				this.editor.txt.html(data.templet_content);//添加内容到富文本
				this.product.descriptions = data.templet_content;
			},
			moveDemo(item){//删除模板
				this.$http.delete('/api/delTemplet?templet_id='+item.templet_id)
				.then((resp)=>{
					item.moveCheck = false;
					this.queryTemplet();//重新调取模板接口
				})
				.catch((error)=>{

				})
				this.demoData.splice(index,1);
			},
			cancelDemo(){//取消保存
				this.addDemo = false;
				this.demoName = '';
			},
			saveDemo(){//保存模板
				if(!this.editorContent){
					this.$message({
	          message: '请填写服务详情',
	          type: 'warning'
	        });
	        return;
				}
				if(!this.demoName){
					this.$message({
	          message: '请输入模板名称',
	          type: 'warning'
	        });
	        return;
				}
				let data = {
					templet_name:this.demoName,
					templet_content:this.editorContent,
					moveCheck:false
				}
				this.addDemoUrl(data);
				console.log(this.editorContent)
			},
			addDemoUrl(data){//添加模板信息
				this.$http.post('/api/addTemplet',data)
				.then((resp)=>{
					this.queryTemplet();//重新调取模板接口
					//初始化
					this.demoName = '';
					// this.editor.txt.html('');//富文本编辑框初始化
					this.addDemo = false;
				})
				.catch((error)=>{

				})
			},
			setUploadedDataBlack(data){//上传图片错误回调
				this.product[data.valueName]= data.data.url;
    		console.log(data)
				if(data.data.status == '601'){
					this.$message.error(data.data.msg);
				}
    	},
    	resetUploader(name){
    		this.form[valueName] = '';
    		console.log(name)
    	},
      nextTo() {//下一步
      	let self = this;
      	this.$refs["product"].validate((valid) => {
          if (valid) {
          	console.log(this.product)
          	self.product.use_sale_price = self.product.use_sale_price?1:2;
          	if(!self.editorContent&&!this.product.descriptions){
          		self.$message({
			          message: '请填写服务详情',
			          type: 'warning'
			        });
          	}else{
          		console.log(self.product.need_ticket)
          		if(this.$route.params.id){
          			self.product.descriptions = self.editorContent?self.editorContent+'':self.product.descriptions;
          		}else{
          			self.product.descriptions = self.product.descriptions?self.product.descriptions:self.editorContent+'';
          		}
	          	
	          	self.$emit('prodecttwo',self.product)
          	}
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        console.log('submit!');
      },
      lastTo(){//上一步
				this.$emit('lastTo')
      },
      judegBroswerFn () {// 判断浏览器
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
			  if (browserName === 'IE' && browserNum<=10) {
			  // if(browserName=='Chrome'){
			  	this.$alert('温馨提醒:您当前的浏览器版本过低,富文本编辑器可能无法正常使用, 请使用谷歌浏览器或者使用浏览器的高速模式！')			  
			  }
      },
      queryTemplet(){//查询模板信息
      	this.$http.get('/api/findTemplet')
      	.then((resp)=>{
      		this.demoData = resp.data;
      	})
      	.catch((error)=>{
      	})
      }
		},
		mounted(){
			let self = this;
			this.judegBroswerFn();
			// 富文本编辑框配置
			this.editor = new Editor(this.$refs.editorElem)
			this.editor.customConfig.uploadImgServer = 'iprp_servicer/api/file/multiPic';//富文本上传图片地址
			this.editor.customConfig.uploadImgMaxLength = 1;//一次上传数量
			this.editor.customConfig.uploadFileName = 'fileData';//上传文件name，用于后台配置
			// this.editor.customConfig.debug = true;//上传图片时候的debug配置
			this.editor.customConfig.uploadImgHooks = {//上传文件返回值不是指定格式时候使用的方法
				customInsert: function (insertImg, result, editor) {
					var url = result.url
					insertImg(url)
				}
			}
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      this.editor.create();
      this.serviceId = this.$route.params.id;
      this.queryTemplet();
			if(this.$route.params.id){//页面刷新数据判断是否是编辑
				this.$http.get('/api/storeService',{params: {service_id: this.serviceId}})
				.then((resp)=>{
					// 第二步资料
					this.product = {
						service_name:resp.data.service_name,
						picture:resp.data.picture,
						service_price:resp.data.service_price,
						sale_price:resp.data.sale_price,
						product_introduce:resp.data.product_introduce,
						need_ticket:resp.data.need_ticket?resp.data.need_ticket+'':'',
						descriptions:resp.data.descriptions,
						use_sale_price:resp.data.use_sale_price==1?true:false,
					}
					this.editor.txt.html(resp.data.descriptions);
				})
				.catch((error)=>{

				})
			}
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
		}
	}
</script>

<style lang="less" >
.precedure_two{margin:30px auto 0;
	// width:1200px;left: 0; padding-left:45px;right: 0;margin-left: auto;margin-right: auto;
	.el-form{max-width: 1200px;margin:0 auto;padding:20px;
		.next_btn{
			.el-form-item__content{text-align:center;}
		}
	}
	.upload_component{
    position: relative;
    .upload_tip{
      position: absolute;left: 140px;bottom:0;width:220px;font-size: 12px;color: #556677;line-height: 16px;
      p.format{color: #A8AFB5;padding-top: 5px; }
    }
  }
	.popover{padding-left:140px;font-size:0;margin-top:-10px;
		.el-button{width:190px;height:52px;font-size:14px;}
	}
	.demo_lists{display:inline-block;vertical-align: bottom;border-radius:3px;padding:10px;font-size:0;cursor: pointer;
		width:190px;height:52px;font-size:14px;border:1px solid #DFE2E5;background-color:#f9f9f9;
		div{font-size:0;
			.name{width:150px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
			span{font-size:14px;color:#556677;display:inline-block;line-height:14px;}
			i{font-size:14px;cursor: pointer;}
		}
		p{font-size:12px;color:#a8afb5;line-height:14px;margin-top:4px;}
		&:hover{
			border:1px solid #479CFF;background-color:#fff;
		}
		.el-icon-delete{
			&:hover{color:#479CFF}
		}
		>p{width:172px;}
	}
	div.demo_check{
		border:1px solid #479CFF;background-color:#fff;
	}


	.discounted{
		.el-input{width:190px;}
	}
	.el-input,.el-textarea{width:380px;}
	.el-form-item__label{text-align:left;}
	
		#editorElem{border-radius:3px;width:970px;position: absolute;}
	.editor_elem{position: relative;height:360px;overflow:auto;z-index: 1;}
	.el-form-item__content{position: relative;
		>.txt_num{font-size:14px;color:#999;position: absolute;left:330px;bottom:0;}
	}
}
.addDemo{
	>div{
		text-align:right;
		span{font-size:12px;color:#a8afb5;margin-left:15px;
			&:hover{color:#479CFF;}
		}
	}
}
.moveDemo{//删除模板
	p{font-size:12px;color:#556677;}
	>div{
		text-align:right;
		span{font-size:13px;color:#a8afb5;margin-left:15px;
			&:hover{color:#479CFF;}
		}
	}
}
.el-popper[x-placement^="top"]{z-index: 10000!important;}
</style>