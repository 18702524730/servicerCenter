<template>
	<div class="cover_info_manage" v-loading="loading">
		<p>店招与首页</p>
		<div class="cover_info">
			<el-form label-position="left" ref="tmForm" :inline="true" auto-complete="off" label-width="79px" v-if="!loading">
				<el-form-item label="店招" style="width:100%" required>
	      	<div class="upload_component">
	      		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :fileName="store_cover_name" :postAction="'iprp_servicerapi/file/allUpload'" :url="store_cover" :valueName="'store_cover'" :size="5" :extensions="'jpg,jpeg,png'"></uploader>
	      		<div class="upload_tip">
	      			<p class="format">用于标识店铺，格式JPG、JPEG、PNG大小5M以内；建议尺寸1920*110</p>
	      		</div>
	      	</div>
	      	<p class="h mt10">范例展示如下：</p>
	      	<img style="display: block" src="~assets/img/shop/p_01.png" width="500" height="120">
	      </el-form-item>
	      <el-form-item label="店铺首页" style="width:100%" required>
	      	<div class="upload_component">
	      		<uploader @complete="setUploadedData" @resetUploader="resetUploader" :fileName="store_banner_name" :postAction="'iprp_servicerapi/file/allUpload'" :url="store_banner" :valueName="'store_banner'" :size="5" :extensions="'jpg,jpeg,png'"></uploader>
	      		<div class="upload_tip">
	      			<p class="format">用于店铺首页展示，格式JPG、JPEG、PNG大小5M以内；建议尺寸1200*1200以上</p>
	      		</div>
	      	</div>
	      	<p class="h mt10">范例展示如下：</p>
	      	<img style="display: block" src="~assets/img/shop/p_02.png" width="500" height="250">
	      </el-form-item>
				<el-form-item label=" " style="width:53%;">
					<el-button size="medium" type="primary" @click.prevent="save">保存</el-button><el-button class="ml10" size="medium" @click.prevent="preview">预览</el-button>
	      </el-form-item>
	    </el-form>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {store} from 'utils/';
	import uploader from 'cps/uploader/uploader.vue';
	export default {
  	components: {
  		uploader,
    },
    data() {
      return {
      	shopData: {},
      	isSubmited: false,
      	loading:false,
      	store_banner_name:'',
      	store_banner:'',
      	store_cover_name:'',
      	store_cover:'',
      }
    },
    methods: {
    	setUploadedData(data){
    		this[data.valueName] = data.data.url;
    		this[data.valueName + '_name'] = data.data.fileName;
    	},
    	resetUploader(valueName){
    		this[valueName] = '';
    	},
    	getShopInfo(){
    		this.loading = true;
    		this.$http.get('./api/store')
    		.then((resp) => {
    			this.loading = false;
    			this.shopData = resp.data[0] || {};
    			this.store_banner = this.shopData.store_banner;
    			this.store_cover = this.shopData.store_cover;
	    	})
	    	.catch((err) => {
	    		this.loading = false;
	    		this.$message.error(err.msg);
	    	});
    	},
    	preview(){
    		if (!this.store_banner) {
    			this.$message.error('请上传店招');
    			return;
    		}
    		if (!this.store_cover) {
    			this.$message.error('请上传店铺首页');
    			return;
    		}
    		if (this.isSubmited) {
    			return;
    		}
    		this.isSubmited = true;
    		var newPage = window.open()
    		this.$http.post('./api/storePreview', {
    			store_id: this.shopData.store_id,
    			store_cover_preview: this.store_cover,
    			store_banner_preview: this.store_banner
    		})
    		.then((resp) => {
    			this.isSubmited = false;
    			newPage.location.href = resp.data
    			//window.open(resp.data;, '_blank')
	    	})
	    	.catch((err) => {
	    		this.isSubmited = false;
	    		this.$message.error(err.msg);
	    	});
    	},
    	save(){
    		if (!this.store_banner) {
    			this.$message.error('请上传店铺首页');
    			return;
    		}
    		if (!this.store_cover) {
    			this.$message.error('请上传店招');
    			return;
    		}
    		if (this.isSubmited) {
    			return;
    		}
    		this.isSubmited = true;
    		this.$http.put('./api/editStoreCover', {
    			store_id: this.shopData.store_id,
    			store_cover: this.store_cover,
    			store_banner: this.store_banner
    		})
    		.then((resp) => {
    			this.isSubmited = false;
    			this.$message.success('保存成功！');
	    	})
	    	.catch((err) => {
	    		this.isSubmited = false;
	    		this.$message.error(err.msg);
	    	});
    	}
    },
    mounted() {
    	this.getShopInfo()
    },
  }
</script>
<style lang='scss'>
	.cover_info_manage{
		min-height: 500px;
		.upload_component{
	    position: relative;
	    .upload_tip{
	      position: absolute;left: 140px;bottom:0;width:320px;font-size: 12px;color: #556677;line-height: 16px;
	      p.format{color: #A8AFB5;padding-top: 5px; }
	    }
	  }
		>p{font-size: 14px;color: #223344;padding:20px 0 0 20px;}
		.cover_info{
			padding:20px;
			.el-form--inline .el-form-item{min-height:274px;}
			.h{color: #F64744;line-height:1;margin-bottom: 6px;}
		}
	}
</style>
