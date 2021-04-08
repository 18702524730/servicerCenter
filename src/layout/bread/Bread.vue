<template>
  <div class='bread'>
    <!-- <el-breadcrumb separator="/" class='el-bread'>
      <el-breadcrumb-item>我的服务单</el-breadcrumb-item>
      <el-breadcrumb-item>服务单详情</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-breadcrumb separator="/" class='el-bread'>
      <el-breadcrumb-item v-for='(item,index) in $route.matched' :key='index' :to="index<$route.matched.length-1 ? item.path : {'path': $route.path, 'query': $route.query, 'params': $route.params}">{{item.meta.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'bread',
    data () {
      return {
          strong:''
      }
    },
    methods:{
      getPageText(name){
          return name=name.replace('编辑',this.$route.query.id ? '修改' : '添加');
      }
    },
    mounted(){

    },
    created(){
      /*if (this.$route.matched.length) {
          var name=this.$route.matched[this.$route.matched.length-1].name;
          this.strong=this.getPageText(name);
      }*/
    },
    watch:{
      $route(to,from){
          this.strong=this.getPageText(to.name);
      }
    }
  }
</script>

<style lang='less'>
  .bread{
    height: 44px;
    line-height: 46px;
    padding-left: 20px;
    background-color: #fff;
    border-bottom: 1px solid #EAECF1;
    .el-bread{
        display: inline-block;
        float: float;
        text-align: right;
        line-height: 14px;
        padding-left: 10px;border-left: 2px solid #479CFF;
        .el-breadcrumb__item__inner, .el-breadcrumb__item__inner a{color: #556677;}
        .el-breadcrumb__item:last-child .el-breadcrumb__item__inner, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__item__inner:hover{color: #479CFF;}
        .el-breadcrumb__item{
        	.el-breadcrumb__inner,.el-breadcrumb__separator{font-weight: normal;}
          .el-breadcrumb__item__inner{cursor:default;}
        }
    }
    strong{font-size: 14px;}
  }
</style>
