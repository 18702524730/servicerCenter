<template>
	<div class="batch_excel" v-loading="loading">
		<batchOne v-if="synStatus.status <= 3" :status="synStatus.status" @TmResult="TmResult"></batchOne>
    <batchTwo v-else @TmResult="TmResult"></batchTwo>
	</div>
</template>
<script>
	import Vue from 'vue';
	import qs from 'qs';
	import intClsData from 'utils/intClsData.js';
	import Filters from 'utils/filters/';
	import uploader from 'cps/uploader/uploader.vue';
	import batchOne from './Detail/batchOne.vue';
  import batchTwo from './Detail/batchTwo.vue';
  
  const SynResult = './api/seller/getCacheTmSynStatusResult';
	export default {
		components: {
			batchOne,batchTwo
		},
    data() {
      return {
      	loading:false,
      	fileList:[],
        synStatus:{
          status:0
        },
      }
    },
    methods: {
      TmResult(){//查询导入状态
        console.log(1111111)
        this.$http.post(SynResult)
        .then((resp) => {
          this.synStatus = resp.data;
        })
        .catch((err) => {
          this.search()
        });
      },
      toOld(){
        this.$router.go(-1);
      },
    	handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    	
    },
    mounted() {
      this.TmResult();
    },
    watch:{
      $route(to, from) {
        console.log(512222222222222222)
      }
    }
  }
</script>
<style lang='less'>
.batch_excel{background-color:#fff;}
.to_old{background-color:#fff;padding-top:20px;
  p{background: url(~assets/img/to-old.png) no-repeat;background-size:28px;height:28px;width:60px;padding-left:30px;line-height:28px;font-size:13px;color:#333;cursor: pointer;}
  p:hover{background: url(~assets/img/to-old-hover.png) no-repeat;background-size:28px;}
}
 // #app .el-button--primary:hover {background-color:#ff6439;border-color:#ff6439;}
 // #app .el-button--primary{background-color:#ff6439;border-color:#ff6439;}
</style>
