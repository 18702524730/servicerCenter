<template>
  <div class="functionEdit">
  	<h3>{{title}}</h3>
    <el-form label-width="90px"
      :model="form_data"
      :rules="form_rules"
      ref='refForm' class="refForm">
      <el-form-item label="功能组名称" prop='name'>
        <el-input size="small" placeholder="请输入功能组名称" :maxlength="10" v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item label="权限设置" prop='name'>
       <div class="set-pannel">
       		<p><el-checkbox  v-model="allChecked" @change="checkAll">全选</el-checkbox></p>
       		<el-tree
					  :data="dataGroupsData"
					  show-checkbox
					  node-key="fp_id"
					  ref="tree"
					  default-expand-all
					  :default-checked-keys="defultChecked"
					  :props="defaultProps"
					  @check-change="handleCheckChange">
					</el-tree>
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
  const functionGroupsUrl = './api/functionGroups';
  const dataGroupsUrl = './api/functionPurviews';

  export default {
    name: 'edit-function',
    data() {
      return {
      	title:'新增功能组',
      	operator_id:'',
      	functionInfo:{},
      	dataGroupsData: [],
      	allChecked:false,
      	allId:[],
      	defultChecked:[],
      	checkedLeghth:0,
        form_data: {
          name: '',
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
        }
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
    	handleCheckChange(data, checked, indeterminate) {
    		if(!checked)
    		{
    			if(this.allChecked)
    			{
    				this.allChecked=false;
    			}
    		}
    		else
    		{
  			var a=this.$refs.tree.getCheckedKeys();
    			if(this.checkedLeghth==a.length)
    			{
    				this.allChecked=true;
    			}
    		}

      },

    	getFunctionGroups(data){
      	data = data || {};
      	this.$http.get(functionGroupsUrl+ '/' + this.operator_id, data)
      	.then((resp) => {
      		this.functionInfo = resp.data;
      		this.setProperty(this.form_data, this.functionInfo);
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
      getDataGroups(data){
      	data = data || {};
      	var postUrl=dataGroupsUrl;
      	if(this.operator_id!=0)
      	{
      		postUrl=dataGroupsUrl+"/"+this.operator_id;
      	}
      	this.$http.get(postUrl, data)
      	.then((resp) => {
      		var dataList = resp.data;
      		var checkall=[];
      		for(var i=0;i<dataList.length;i++)
      		{
      			this.checkedLeghth++;
      			this.allId.push(dataList[i].fp_id);
      			if(dataList[i].checked)
      			{
      				checkall.push(dataList[i].fp_id);
      			}
						this.getDefultCheck(dataList[i]);
      		}
      		if(checkall.length==dataList.length)
      		{
      			this.allChecked=true;
      		}
      		this.dataGroupsData = dataList;
      	})
      	.catch((err) => {
      		console.log(err);
      	});
      },
      getDefultCheck(list)
      {
      	if(list.checked && !list.childes.length)
      	{
      		this.defultChecked.push(list.fp_id);
      	}
	  		for(var i=0;i<list.childes.length;i++)
	  		{
	  			this.checkedLeghth++;
	  			var item=list.childes[i];
					if(item.checked && !item.childes.length)
					{
						this.defultChecked.push(item.fp_id);
					}
					if(item.childes.length>0)
					{
						this.getDefultCheck(item);
					}
	  		}
      },
      getParentNode(fp_id){
      	var ret = {};
      	var dataGroupsData = this.dataGroupsData;
      	var assitant = (data, fp_id) => {
      		if (data.childes && data.childes.length) {
	      		data.childes.some((item, i) => {
		      		if (item.fp_id == fp_id) {
		      			ret = data;
		      			return true;
		      		}else{
		      			assitant(item, fp_id);
		      		}
		      	});
	      	}
      	}
      	dataGroupsData.some((item, i) => {
      		if (item.fp_id == fp_id) {
      			return true;
      		}else{
      			assitant(item, fp_id)
      		}
      	});
      	return ret;
      },
      getCheckedIds(){
      	var limits = this.$refs.tree.getCheckedKeys();
      	var limitsNode = this.$refs.tree.getCheckedNodes();
      	var checkParentAssitant = (d) => {
      		if (d.fp_id) {
    				if (limits.indexOf(d.fp_id) === -1) {
    					limits.push(d.fp_id);
    				}
    				var parNode = this.getParentNode(d.fp_id);
    				checkParentAssitant(parNode);
	      	}
      	}
      	limitsNode.forEach((item, i) => {
      		checkParentAssitant(item);
      	});
      	return limits;
      },
      /**
       * 提交表单
       * @param  {string} formName 表单名称
       */
      onSubmit(formName) {

        var ref = this.$refs[formName];
        ref.validate((valid) => {
          if (valid) {

          var checkarr=this.$refs.tree.getCheckedKeys();
	      	if(checkarr.length==0)
	      	{
	      		this.$message.error("权限设置不能为空");
	      	}
	      	else
	      	{
	      		var submitdata={};
          	submitdata.name=this.form_data.name;
		      	submitdata.limits=this.getCheckedIds();
          	submitdata.target_id=null;
          	submitdata.target_type=null;
          	var router=this.$router;
          	if(this.operator_id!=0)
          	{

          		submitdata.fg_id=this.operator_id;
	            this.$http.put(functionGroupsUrl+ '/' + this.operator_id, submitdata)
			      	.then((resp) => {
			      		var data = resp.data;
			      		this.$message.success('提交成功！')
			      		router.push({name:'功能组管理'});
			      	})
			      	.catch((err) => {
			      		this.$message.error(err.msg)
			      	});
          	}
          	else
          	{
          		this.$http.post(functionGroupsUrl, submitdata)
			      	.then((resp) => {
			      		var data = resp.data;
			      		this.$message.success('提交成功！')
			      		router.push({name:'功能组管理'});
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
      checkAll(){
      	//console.log(this.$refs);
      	if(this.allChecked)
      	{
      		this.$refs.tree.setCheckedKeys(this.allId);
      	}
      	else
      	{
      		this.$refs.tree.setCheckedKeys([]);
      	}
      }
    },
    created() {},
    mounted() {
    	this.operator_id = this.$route.params.operator_id;
    	if(this.operator_id!=0)
    	{
    		this.title = '编辑功能组';
  			this.$route.meta.name = '编辑功能组';
    		this.getFunctionGroups();
    	}

    	this.getDataGroups();
    	//console.log(this.defultChecked);
    }
  }
</script>
<style lang='scss'>
	.functionEdit{
		padding:30px;
		h3{font-size: 14px;color: #223344;font-weight: normal;}
		.el-form{
			padding-top: 20px;
			.el-form-item{
				font-size: 13px;margin-bottom:20px;
				.el-form-item__label{font-size: 13px;padding:0;text-align: left;color:#252A00;}
				.el-form-item__content{
					width: 240px;line-height: 30px;
					.el-select{width: 100%;
						.el-input__inner{height: 30px;line-height: 30px;}
					}
				}
				input{font-size: 13px;border-radius: 2px;border: 1px solid #DFE2E5;color:#252A00}
				.set-pannel{width: 440px;border: 1px solid #eee;padding-bottom: 10px;
					.el-tree{padding-top: 5px;}
					.el-checkbox__input.is-checked .el-checkbox__inner{background-color: #36af47;border-color: #36af47;}
					.el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color: #36af47;border-color: #36af47;}
					.el-checkbox__inner:hover,.el-checkbox__input.is-focus .el-checkbox__inner{border-color: #36af47;border-color: #36af47;}
				}
				.set-pannel p{height: 40px;line-height: 40px;padding-left: 20px;background-color: #f5f5f5;}

			}
		}
	}
</style>
