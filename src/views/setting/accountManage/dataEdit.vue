<template>
  <div class="accDataEdit">
  	<h3>{{title}}</h3>
    <el-form label-width="102px"
      :model="form_data"
      :rules="form_rules"
      ref='refForm' class="refForm">
      <el-form-item label="业务组名称" prop='name'>
        <el-input size="small" :maxlength="10" placeholder="请输入业务组名称" v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item label="权限设置" prop='name'>
         <div class="set-pannel">
       		<el-tree
					  :data="dataGroupsData"
					  node-key="bs_class_id"
					  ref="tree"
					  :default-expanded-keys="[101]"
					  :props="defaultProps"
					  @node-click="nodeClick">
					</el-tree>
       </div>
       <div class="tableList">
       	<ul>
       		<li class="header-table">
       			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
       				<span class="classify">服务分类</span>
       				<span class="service-name">服务</span>
       			</el-checkbox>
       		</li>
       		<li v-for="(info,index) in services" :label="info.bs_id" :key="info.bs_id">
       				<el-checkbox v-model="info.checked" @change="chxChange(info)">
	       				<span class="classify">{{info.bs_class_name}}</span>
	       				<span class="service-name">{{info.name}}</span>
       				</el-checkbox>
       		</li>

       	</ul>
       </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click='onSubmit("refForm")'>{{form_data.id ? '修改' : '保存'}}</el-button>
        <!-- <el-button @click='reset_form("refForm")'>重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { gbs } from 'config/settings.js';
  const dataGroupsUrl = './api/businesses_class_designated';
  const getcheckedUrl='./api/dataGroups'
  export default {
    name: 'edit-order',
    data() {
      return {
      	title:'新增业务组',
      	operator_id:'',
      	adminInfoData: {},
      	dataGroupsData: [],
      	checkAll: false,
      	isIndeterminate: false,
      	checkedids:[],
      	checkedId:[],
      	services:[],
        form_data: {
          name: ''
        },
        form_rules: {
          name: [{
            required: true,
            message: '不能为空！',
            trigger: 'blur'
          }]
        },
        defaultProps: {
          children: 'childes',
          label: 'name'
        },
      }
    },
    methods: {
    	setProperty(o, newO){
    		for (var p in o) {
	        if (o.hasOwnProperty(p)) {
	        	o[p] = newO[p];
	        }
		    }
    	},
    	handleCheckAllChange(val) {
    		if(this.checkAll)//全选
    		{
    			for(var i=0;i<this.services.length;i++)
    			{
    				this.services[i].checked=true;
    			}
    			this.checkedids=this.checkedId;
    		}else{
    			for(var i=0;i<this.services.length;i++)
    			{
    				this.services[i].checked=false;
    			}
    			this.checkedids = []
    		}
      },
      chxChange(item){
//    	console.log(item.checked);
      	if(item.checked)
      	{
      		this.checkedids.push(item.bs_id);
      	}
      	else
      	{
      		for(var i=0;i<this.checkedids.length;i++)
      		{
      			if(item.bs_id==this.checkedids[i])
      			{
      				this.checkedids.splice(i,1);
      			}
      		}
      	}
//    	if(this.checkedids.length==this.checkedId.length)
//	  		{
//	  			this.checkAll=true;
//	  		}
//	  		else
//	  		{
	  			this.checkAll=false;
//	  		}
      },

      getDataGroups(data){
      	data = data || {};
      	this.$http.get(dataGroupsUrl, data)
      	.then((resp) => {
      		var dataList = resp.data;
      		for(var i=0;i<dataList.length;i++)
      		{
      			 var info=dataList[i];
      			 for(var j=0;j<info.childes.length;j++)
      			 {
      			 	  info.childes[j].childes=[];
      			 }
      		}
      		this.dataGroupsData = dataList;
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
      /**
       * 提交表单
       * @param  {string} formName 表单名称
       */
      onSubmit(formName) {
        var ref = this.$refs[formName];
        ref.validate((valid) => {
          if (valid) {
          	if(this.checkedids.length==0)
          	{
          		this.$message.error("权限设置不能为空");
          	}
          	else
          	{
          		var router=this.$router;
	          	var subData={};
	          	subData.name=this.form_data.name;
	          	subData.limits=this.checkedids;
	          	if(this.operator_id!=0)//更新
	          	{
	          		subData.dg_id=this.operator_id;
	          		this.$http.put(getcheckedUrl+"/"+this.operator_id, subData)
				      	.then((resp) => {
				      		var data = resp.data;
				      		this.$message.success('提交成功！')
				      		router.push({name:'dataList'});
				      	})
				      	.catch((err) => {
				      		this.$message.error(err.msg)
				      	});
	          	}
	          	else//添加
	          	{
	          		this.$http.post(getcheckedUrl,subData)
				      	.then((resp) => {
				      		var data = resp.data;
				      		this.$message.success('提交成功！')
				      		this.$router.push({name:'dataList'});
				      	})
				      	.catch((err) => {
				      		this.$message.error(err.msg)
				      	});
	          	}
          	}
          }
        });
      },
      reset_form(form) {
        this.$refs[form].resetFields();
      },
      nodeClick(data){
      	var id=data.bs_class_id;
      	var pid=data.parent_id;
      	this.getAuthDetail(id);
      },
      getAuthDetail(id)
      {
      	 var posturl="/api/businesses_designated";
      	 var subData={};
      	 subData.pg_count=999;
      	 subData.pg_index=0;
      	 this.$http.get(posturl+'?bs_class_id=' + id)
		      	.then((resp) => {
		      		var data = resp.data;
		      		this.checkedId=[];
		      		for(var i=0;i<data.elements.length;i++)
		      		{
		      			if(this.operator_id!=0&&this.checkedids.length!=0)
		      			{
		      				if(this.checkedids.indexOf(data.elements[i].bs_id)==-1)
		      				{
		      					data.elements[i].checked=false;
		      				}
		      				else
		      				{
		      					data.elements[i].checked=true;
		      				}
		      			}
		      			else
		      			{
		      				data.elements[i].checked=false;
		      			}
		      			this.checkedId.push(data.elements[i].bs_id);
		      		}
		      		if(this.checkedids.length==this.checkedId.length)
		      		{
		      			this.checkAll=true;
		      		}
		      		this.services=data.elements;

		      	})
		      	.catch((err) => {
		      		this.$message.error(err.msg)
		      	});
      },
      getCheckedData(){
      	this.$http.get(getcheckedUrl+"/"+this.operator_id,null)
		      	.then((resp) => {
		      		var data = resp.data;
		      		this.checkedids=data.limits;
		      		this.form_data.name=data.name;
		      	})
		      	.catch((err) => {
		      		this.$message.error(err.msg)
		      	});
      },

    },
    created() {},
    mounted() {
    	this.operator_id = this.$route.params.operator_id;
    	if(this.operator_id!=0)
    	{
    		this.title = '编辑业务组';
    		this.$route.meta.name = '编辑业务组';
    		this.getCheckedData();
    	}
    	this.getDataGroups();
    }
  }
</script>
<style lang='scss'>
	.accDataEdit{
		padding:30px;
		h3{font-size: 14px;color: #223344;font-weight: normal;}
		.el-form{
			padding-top: 20px;
			.el-form-item__label{line-height: 30px;}
			.el-form-item{
				font-size: 13px;margin-bottom:20px;
				.el-form-item__label{font-size: 13px;padding:0;text-align: left;color:#252A00;line-height: 30px;}
				.el-form-item__content{
					line-height: 30px;
					.el-select{width: 100%;
						.el-input__inner{height: 30px;line-height: 30px;}
					}
				}
				input{font-size: 13px;border-radius: 2px;border: 1px solid #DFE2E5;color:#252A00;width: 240px;}
				.set-pannel{min-width: 130px;float: left;width: 20%;
					.el-tree{
						height: 418px; overflow: auto;border: 1px solid #DFE2E5;padding: 5px 0;
						.is-current{
							>.el-tree-node__content {background-color: #f5f7fa;}
						}
					}
				}
				.tableList{min-width: 480px;height: 418px;overflow: auto;float:left;border: 1px solid #dfe2e5;border-left: 0;padding-left: 20px;
					color: #7f8fa4;width: 70%;background: #F9F9F9;
					.el-checkbox__inner{height: 16px;width: 16px;}
					.classify{display: inline-block;min-width: 220px;}
					.service-name{display: inline-block;}
					.el-checkbox{width: 100%;position: relative;padding-left: 36px;
						.el-checkbox__input{position: absolute;top: 10px;left: 0;}
						.el-checkbox__label{display: inline-block;line-height: 36px;min-width: 540px;border-bottom: 1px dashed #dfe2e5;color: #7f8fa4;width: 100%;}
					}

					.header-table{font-weight: 600!important;margin-left:-20px;padding-left: 20px;border-bottom: 1px solid #dfe2e5;
						.el-checkbox__label{border-bottom: 0;width: 540px;}
					}
					.el-checkbox__input.is-checked .el-checkbox__inner{background-color: #36af47;border-color: #36af47;}
					.el-checkbox__inner:hover,.el-checkbox__input.is-focus .el-checkbox__inner{border-color: #36af47;}
				}
			}
		}
    .el-checkbox__inner::after{left:5px;top:1px;}
	}
</style>
