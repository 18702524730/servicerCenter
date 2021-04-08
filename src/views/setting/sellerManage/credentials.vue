<template>
	<div class="credentials" v-loading="loading" element-loading-text="拼命加载中">
		<h3 class="mb20">资质认证</h3>
		<el-form class="basic_info" label-position="left" ref="tmForm" :inline="true" auto-complete="off" label-width="164px" v-if="!loading">
			<el-form-item label="知识产权代理资质材料" style="width:100%">
      	<div class="upload_component">
      		<uploader @complete="patentProxyRegistrationUrl" @resetUploader="resetUploader" :fileName="patentProxyRegistration_name" :postAction="rootUrl+'/api/file/multiPic'" :url="patentProxyRegistration" :valueName="'patentProxyRegistration'" :size="5" :extensions="'jpg,jpeg,png,bmp'"></uploader>
      		<div class="upload_tip">
      			<p>专利代理机构注册证</p>
      			<p class="format">请上传jpg、jpeg、png、bmp格式的文件，大小限制5M以内</p>
      		</div>
      	</div>
      	<div class="upload_component mt20">
      		<uploader @complete="lawyerCertUrl" @resetUploader="resetUploader" :fileName="lawyerCert_name" :postAction="rootUrl+'/api/file/multiPic'" :url="lawyerCert" :valueName="'lawyerCert'" :size="5" :extensions="'jpg,jpeg,png,bmp'"></uploader>
      		<div class="upload_tip">
      			<p>律师执业资格证</p>
      			<p class="format">请上传jpg、jpeg、png、bmp格式的文件，大小限制5M以内</p>
      		</div>
      	</div>
      	<div class="upload_component mt20">
      		<uploader @complete="trademarkProxyCertUrl" @resetUploader="resetUploader" :fileName="trademarkProxyCert_name" :postAction="rootUrl+'/api/file/multiPic'" :url="trademarkProxyCert" :valueName="'trademarkProxyCert'" :size="5" :extensions="'jpg,jpeg,png,bmp'"></uploader>
      		<div class="upload_tip">
      			<p>商标代理资质(网站截图)</p>
      			<p class="format">请上传jpg、jpeg、png、bmp格式的文件，大小限制5M以内</p>
      		</div>
      	</div>
      </el-form-item>
			<el-form-item label=" " style="width:53%;">
				<el-button size="medium" type="primary" @click.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>
<script>
	import Vue from 'vue'
	import qs from 'qs'
	import {store} from 'utils/';
	import uploader from 'cps/uploader/uploader.vue';
	const rootUrl = CONFIG.rootUrl;
  const uploadUrl = rootUrl + '/api/file/uploadProxy';
  const InfoUrl = '';
	export default {
  	components: {
  		uploader,
    },
    data() {
      return {
        rootUrl:rootUrl,
      	loading: false,
      	userinfo: store.get('userinfo'),
      	patentProxyRegistration:'',
      	lawyerCert:'',
        trademarkProxyCert:'',
      	patentProxyRegistration_name:'',
      	lawyerCert_name:'',
        trademarkProxyCert_name:'',
      }
    },
    methods: {
    	resetUploader(valueName){//删除图片时候回调
        this[valueName] = "";
        this[valueName + '_name'] = '';
			},
    	uploaderErrCallback(data){
    		this.$alert(data.msg);
    	},
    	patentProxyRegistrationUrl(data){
    		var d = data.data;
    		if (d.url) {
	    		this.patentProxyRegistration = d.url;
	    		this.patentProxyRegistration_name= d.fileName;
    		}else{
    			this.uploaderErrCallback(d);
    		}
    	},
      lawyerCertUrl(data){
        var d = data.data;
        if (d.url) {
          this.lawyerCert = d.url;
          this.lawyerCert_name= d.fileName;
        }else{
          this.uploaderErrCallback(d);
        }
      },
      trademarkProxyCertUrl(data){
        var d = data.data;
        if (d.url) {
          this.trademarkProxyCert = d.url;
          this.trademarkProxyCert_name= d.fileName;
        }else{
          this.uploaderErrCallback(d);
        }
      },
    	// 保存
    	save(){
        let self = this;
        this.loading = true;
        let data = {
          patentProxyRegistration:this.patentProxyRegistration?this.patentProxyRegistration:null,
          lawyerCert:this.lawyerCert?this.lawyerCert:null,
          trademarkProxyCert:this.trademarkProxyCert?this.trademarkProxyCert:null
        }
        // 保存草稿接口
        self.$http.put('/api/service_info' , data)
        .then((resp) => {
          this.loading = false;
          this.search();
        })
        .catch((err) => {
          this.loading = false;
        });
    	},
      search(){
        this.loading = true;
        let self = this;
        this.$http.get('./api/service_info')
        .then((resp) => {
          this.loading = false;
          console.log(resp.data)
          this.patentProxyRegistration = resp.data.patentProxyRegistration;
          this.lawyerCert = resp.data.lawyerCert;
          this.trademarkProxyCert = resp.data.trademarkProxyCert;
          if(!resp.data.patentProxyRegistration || !resp.data.lawyerCert || !resp.data.trademarkProxyCert){//资质认证高亮
            let data = {
              qualification:true
            }
            self.$store.commit('SET_STATISTICS_REAL', data);
          }else{
            let data = {
              qualification:false
            }
            self.$store.commit('SET_STATISTICS_REAL', data);
          }
        })
        .catch((err)=>{
          this.loading = false;
        })
      }
    },
    mounted() {
      this.search();
    }
  }
</script>
<style lang='scss'>
	.credentials{padding:30px;background-color:#fff;min-height: 500px;
		.upload_component{
			position: relative;
			.upload_tip{
				position: absolute;left: 140px;bottom:0;width:220px;font-size: 12px;color: #556677;line-height: 16px;
				p.format{color: #A8AFB5;padding-top: 5px; }
			}
		}
	}



</style>

