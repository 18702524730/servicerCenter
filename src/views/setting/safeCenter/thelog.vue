<template>
	<div class="the_log">
		<div class="search_list mb20">
			<div class="fl">
				<el-input v-model="dataObj.operator_name" placeholder="账号"></el-input>
			</div>
			<div class="fl mr20">
				<el-input class="ml10" v-model="dataObj.content" placeholder="内容"></el-input>
			</div>

			<el-date-picker
	      v-model="logTime"
	      type="daterange"
	      placeholder="时间开始 - 结束">
	    </el-date-picker>

	    <button class="btn_left ml10" @click="search">搜索</button>
	    <button class="btn_right ml10" @click="Initialize">重置</button>
		</div>
		<div>
			<div class="list clearfix">
				<p class="td01 fl">账号</p>
				<p class="td02 fl">日志内容</p>
				<p class="td03 fl">IP</p>
				<p class="td04 fl">时间</p>
			</div>
			<div class="list_data clearfix" v-for="item in thelogInfo">
				<p class="td01 fl">{{item.operator_name}}</p>
				<p class="td02 fl">{{item.content}}</p>
				<p class="td03 fl">{{item.ip}}</p>
				<p class="td04 fl">{{item.create_time | dateFormat}}</p>
			</div>
			<div class="mt20 clearfix" v-show="thelogInfo.length">
				<el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="15"
		      layout="total, prev, pager, next"
		      :total="total" class="fr">
		    </el-pagination>
		  </div>
		</div>
		<div class="null_info" v-if="!thelogInfo.length">
			<img src="~assets/img/nulldata.png" alt="">
			<span>暂无信息</span>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import $ from 'jquery'
	const dataObj = {//条件数据
		beginTime:'',
		content:'',
		endTime: '',
		operator_name:'',
		pg_index:1
	};
// 检查标签是否支持该属性
  function ElementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
  }
  // 粗略判断，因为只要兼容ie9+
  const isIE9 = !ElementSupportAttribute('input','placeholder');
  export default {
    name: 'work-order-list',
    data() {
      return {
      	queryObj:{},
      	pg_index:1,
      	dataObj: Object.assign({}, dataObj),
      	logTime:'',
      	operator_name:'',
      	content:'',
      	thelogInfo:{},
      	total:0,
      	pg_index:1,
      	currentPage:1
      }
    },
    mounted() {
    	this.recoverQueryData();
    	this.search();
    	var FauxPlaceholder = function(){
	      if(!ElementSupportAttribute('input','placeholder')) {
	        $("[placeholder]")
	          .focus(function() {
	            var input = $(this);
	            input.next().hide();
	          })
	          .blur(function() {
	            var input = $(this);
	            if (input.val() == "") {
	              input.next().show();
	            }
	          }).after('<span class="placeholder"></span>');
	          $(".placeholder").click(function(){
	            var input = $(this).prev().focus();
	          }).html(function(){
	            return $(this).prev().attr('placeholder');
	          });
	      }
	    };
	    setTimeout(function(){
	      FauxPlaceholder();
	    },300);
    },
    methods: {
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			dataObj[n] = this.queryObj[n];
    		}
    		this.logTime = queryObj.beginTime && [new Date(queryObj.beginTime-0), new Date(queryObj.endTime-86390000)];

		  },
		  Initialize(){
		  	this.dataObj = {};
		  	this.logTime = "";
		  	this.search();
		  },
    	search(){
    		var ret = {}
    		if (this.logTime) {
	    		ret.beginTime = this.logTime[0] ? new Date(this.logTime[0]).getTime() : null;
	    		ret.endTime = this.logTime[1] ? new Date(this.logTime[1]).getTime() + 86390000 : null;
    		}
    		ret.operator_name = this.dataObj.operator_name;
    		ret.content = this.dataObj.content;
    		ret.pg_index = this.pg_index;
    		ret.pg_count = 15;
    		var data = Object.assign({}, this.dataObj, ret);
    		console.log(data)
    		this.$router.push({query: Object.assign({}, data)});
    		this.$http.get('./api/logs', {params: data})
    		.then((resp) => {
    			this.thelogInfo = resp.data.elements;
    			this.total = resp.data.total_elements;
	      })
	      .catch((err) => {
	        console.log(err);
	      });
    	},
    	handleCurrentChange(val) {
    		this.pg_index = val;
    		this.search();
      }
    },
    filters: {
      dateFormat: Filters.formatDate.dateFormat
    },
    watch:{
	  }
  }
</script>
<style lang="less">
	.the_log{padding:20px;
		.td01{width: 20%;}
		.td02{width: 40%;}
		.td03{width: 20%;}
		.td04{width: 20%;}
		.list{background: #F5F5F5;border: 1px solid #DFE2E5;height:50px;
			p{padding-left:20px;font-size: 13px;color: #223344;text-align:left;line-height:50px;}
		}
		.list_data{padding:15px 0;border: 1px solid #DFE2E5;border-top:0;
			p{padding-left:20px;font-size: 13px;color: #556677;text-align:left;line-height:20px;}
		}
		.search_list{font-size:0;
			>div{width: 150px;}
			>input{width: 150px;padding:6px 10px;}
			button{width: 88px;height:30px;text-align:center;line-height:30px;font-size:14px;border-radius: 2px;vertical-align: top;}
			button:hover{border-color: #387CCC;background-color: #387CCC;}
			.btn_right:hover{border-color: #387CCC;color: #387CCC;background-color: #fff;}
			.btn_left{color:#fff;background: #479CFF;}
			.btn_right{color:#479CFF;border:1px solid #479CFF;}
		}
		.el-input{
			.el-input__inner{height:30px;border-radius: 2px;border: 1px solid #DFE2E5;}
		}
		.el-date-editor--daterange.el-input{width: 220px;}
		.null_info{text-align: center;line-height:50px;height:50px;border: 1px solid #DFE2E5;border-top: 0;
			img{margin-top: 8px;}
			span{vertical-align: top;font-size: 13px;color: #556677;}
		}
	}
</style>
