<template>
	<div class="state_type_cxb" v-loading="loading">
		<div class="service_table mb20">
      <p v-if="!registration">申请／注册号：<span>待商标局形式审查通过后显示</span></p>
      <p v-if="registration">申请／注册号：<span>{{registration  || '--'}}</span></p>
    </div>

    <div class="service_state mb20">
      <p class="service_tit">业务办理说明</p>
      <div class="service_table">
        <ul class="table_tit clearfix">
          <li class="fl tb01" style="padding-left:20px;">时间</li>
          <li class="fl tb02">备注人</li>
          <li class="fl tb03">说明类型</li>
          <li class="fl tb04">备注</li>
        </ul>
        <div class="record" v-if="handleRemark && handleRemark.length">
          <ul class="table_list clearfix" v-for="(item , $index) in handleRemark" key="item.type">
            <li class="fl tb01" style="padding-left:20px;"><p class="fl">{{item.createTime | dateFormat}}</p></li>
            <li class="fl tb02"><p>{{item.operator}}</p></li>
            <li class="fl tb03"><p>{{item.type == 1 ? '订单已退款' : item.type == 2 ? '订单已重新申报' : '其他'}}</p></li>
            <li class="fl tb04"><p>{{item.remark}}</p></li>
          </ul>
        </div>
        <div class="record" v-else>
          <ul class="table_list clearfix">
            <li class="fl tb01" style="padding-left:20px;"><p class="fl">暂无办理记录</p></li>
            <li class="fl tb02"></li>
            <li class="fl tb03"></li>
            <li class="fl tb04"></li>
          </ul>
        </div>
      </div>
    </div>
		<p class="bl_tit">办理记录</p>
    <p class="bl_tit bl_tit1">办理状态：{{allData.order_feedback_state||'--'}}</p>
    <div class="state">
			<!-- 服务单已生成 -->
			<div class="state_list" v-if="stateData[0]">
				<!-- 最大的圆 -->
				<!-- 存在当前数据时，渲染color -->
				<i class="max_round" :class="{'success_bg' : stateData[0]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[0],'success_color':stateData[0]}">
					<p>服务单已生成</p>
				</div>
				<!-- 详情部分，存在即显示 -->
				<div class="list_bot" :class="{'success_border' : stateData[0]}" v-if="stateData[0]" v-for="item in stateData[0]">
				<!-- 样式一部分 -->
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 已提交待确认 -->
			<div class="state_list" v-if="stateData[2]&&stateData[2].length">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[2]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[2],'success_color':stateData[2]}">
					<p>已提交待确认</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[2]}" v-if="stateData[2]">
					<template v-for="item in stateData[2]">
						<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
						<ul class="clearfix">
							<li class="fl clearfix list_l">
								<p class="tit fl">操作时间</p>
								<p class="txt fl">{{item.operating_time | dateFormat}}</p>
							</li>
							<li class="fl clearfix list_m">
								<p class="tit fl">操作人</p>
								<p class="txt operation fl">{{item.operator}}</p>
							</li>
						</ul>
					</template>
				</div>
			</div>
			<!-- 已确认待上报 -->
			<div class="state_list" v-if="stateData[5]&&stateData[5].length">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[5]}"></i>
				<div class="list_top" :class="{'success_border success_color' : stateData[5]}">
					<p>已确认待上报</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[5]}" v-if="stateData[5]">
					<template v-for="item in stateData[5]">
						<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
						<ul class="clearfix">
							<li class="fl clearfix list_l">
								<p class="tit fl">操作时间</p>
								<p class="txt fl">{{item.operating_time | dateFormat}}</p>
							</li>
							<li class="fl clearfix list_m">
								<p class="tit fl">操作人</p>
								<p class="txt operation fl">{{item.operator}}</p>
							</li>
						</ul>
					</template>
				</div>
			</div>
			<!-- 已上报待审核-->
			<div class="state_list" v-if="stateData[6]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[6]}"></i>
				<div class="list_top" :class="{'success_border success_color' : stateData[6]}">
					<p>已上报待审核</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[6]}" v-if="stateData[6]" v-for="item in stateData[6]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 已审核待申报 -->
			<div class="state_list" v-if="stateData[7]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[7]}"></i>
				<div class="list_top" :class="{'success_border success_color' : stateData[7]}">
					<p>已审核待申报</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[7]}" v-if="stateData[7]" v-for="item in stateData[7]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 已申报待商标局收文 -->
			<div class="state_list" v-if="stateData[9]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[9]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[9],'success_color':stateData[9]}">
					<p>已申报待商标局收文</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[9]}" v-if="stateData[9]" v-for="item in stateData[9]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 商标局已收文待形式审查 -->
			<div class="state_list" v-if="stateData[10]||!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[10]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[10],'success_color':stateData[10]}">
					<p>商标局已收文待形式审查</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[10]}" v-if="stateData[10]" v-for="item in stateData[10]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="item.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | fileStateName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 形式审查通过待实质审查 11 -->
			<div class="state_list" v-if="stateData[11]||!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[11]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[11],'success_color':stateData[11]}">
					<p>形式审查通过待实质审查</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[11]}" v-if="stateData[11]&&stateData[11].length" v-for="item in stateData[11]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | fileStateName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 实质审查不通过被驳回 -->
			<div class="state_list" v-if="stateData[14]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[14]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[14],'success_color':stateData[14]}">
					<p>实质审查不通过被驳回</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[14]}"  v-for="info in stateData[14]" v-if="stateData[14]">
					<p><span>_</span>{{info.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{info.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{info.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="info.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{info.type | fileStateName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+info.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(info.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{info.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{info.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 实质审查通过待初审公告 -->
			<div class="state_list" v-if="stateData[12]&&stateData[12].length">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[12]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[12],'success_color':stateData[12]}">
					<p>实质审查通过待初审公告</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[12]}" v-if="stateData[12]&&stateData[12].length" v-for="item in stateData[12]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | fileStateName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 初审公告不通过被异议 -->
			<div class="state_list" v-if="stateData[17]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[17]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[17],'success_color':stateData[17]}">
					<p>初审公告不通过被异议</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[17]}"  v-for="info in stateData[17]" v-if="stateData[17]">
					<p><span>_</span>{{info.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{info.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{info.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="info.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{info.type | fileStateName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+info.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(info.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{info.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{info.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 初审公告通过待发放注册证 -->
			<div class="state_list" v-if="stateData[15]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[15]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[15],'success_color':stateData[15]}">
					<p>初审公告通过待发放注册证</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[15]}" v-if="stateData[15]" v-for="item in stateData[15]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="item.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | fileStateName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 已发放注册证 -->
			<div class="state_list" v-if="!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[18]}"></i>
				<div class="list_end" :class="{'success_border' : stateData[18],'success_color':stateData[18]}">
					<p>已发放注册证</p>
				</div>
				<div class="list_bot_end" v-if="stateData[18]" v-for="item in stateData[18]">
					<p>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="item.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | fileStateName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 办理终止 -->
			<div class="state_list" v-if="stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[99]}"></i>
				<div class="list_end" :class="{'success_border' : stateData[99],'success_color':stateData[99]}">
					<p>办理终止</p>
				</div>
				<div class="list_bot_end" v-if="stateData[99]" v-for="item in stateData[99]">
					<p>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="item.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | fileStateName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 证书预览 -->
    <el-dialog
      :visible.sync="dialogImg"
      size="tiny" class="img_preview" :modal-append-to-body="true">
      <!-- <el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
        <el-carousel-item v-for="(imgSrc,$index) in proxyImg" :key="$index">
          <img :src="imgSrc" alt="">
        </el-carousel-item>
      </el-carousel> -->
      <div style="position:relative">
        <el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
        <el-carousel-item v-for="(imgSrc,$index) in proxyImg" :key="$index">
          <img :src="imgSrc" alt="">
        </el-carousel-item>
      </el-carousel>
      </div>
    </el-dialog>
	</div>
</template>
<script>
	import Vue from 'vue'
  import VueCookie from 'vue-cookie'
	import Filters from 'utils/filters/'
	const stateUrl = './api/findOrderFeedbacks';
  const rootUrl = CONFIG.rootUrl;
	export default {
    props:['order_id','registration'],
    data() {
      return {
        rootUrl:rootUrl,
      	// 当前进行的步骤
      	steps:0,
      	handleClose:'',
      	// 详情
      	allData: {},
      	stateData:[],
      	loading:false,
      	proxyImg:{},
      	dialogImg:false,
        token:'',
        handleRemark:[]
      }
    },
    methods: {
    // 状态图片预览
	  previewImg(url){
      this.loading = true;
	    this.$http.get('./api/previewCxb?pdf_url='+url)
	    .then((response) => {
        this.loading = false;
        this.proxyImg = response.data.urls;
        this.dialogImg = true;
	    })
	    .catch((error) => {
        this.loading = false;
	    });
	  }
    },
    mounted() {
    	var self = this;
    	self.loading = true;
    	this.$http.get(stateUrl+'?order_id=' + this.order_id)
    	.then((resp) => {
    		self.allData = resp.data;
    		self.stateData = resp.data.feedbacks;
        self.handleRemark = resp.data.handleRemark;
    		self.loading = false;
    	}).catch((error) => {
    		self.loading = false;
        console.log(error);
      });
    	// this.status = this.$router.query.status;
      this.token = VueCookie.get('service_token');
    },
    filters: {
    	format:	Filters.formatDate.dateFormat,
    	dateFormat:Filters.formatDate.dateFormat,
		  fileStateName:Filters.fileStateName
    }
  }
</script>
<style lang="less">
	.state_type_cxb{padding:20px;background-color:#fff;
		//完成该状态
		.state_list{position: relative;left: 5px;
      .list_end{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;z-index:1;
        p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
      }
			// 圆
			i{background-color:#DFE2E5;}
			// 颜色判断
			.success_bg{background-color:#36AF47;z-index:100;}

			.max_round{width:11px;height:11px;border-radius:50%;display:block;position: absolute;top: 0px;left:-5px;}
			.min_round{width:9px;height:9px;border-radius:50%;display:block;position: absolute;top: 38px;left:-4px;}
			.list_top{border-left:1px solid #dfe2e5;padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
				p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
			}
			.list_fotter{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
				p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
			}
			// 边框颜色判断
			div.success_border{border-color:#36AF47;}
			div.success_color >p{color:#36AF47;}
			.list_bot{padding-bottom: 20px;border-left:1px solid #dfe2e5;padding-left: 30px;z-index:1;margin-top: -5px;
				>p{font-size: 13px;color: #223344;line-height:100%;position: relative;margin-top:10px;
          span{position: absolute;left:-30px;top:-10px;color: #36AF47;font-size:20px;display:inline-block;}
          &:first-child{margin-top: 0;}
        }
				ul{padding-top: 10px;
					.list_l{width:30%;}
					.list_m{width:25%;}
					.list_r{width:45%;}
					li{
						.tit{text-align:left;color:#556677;}
						.txt{color: #7F8FA4;margin-left:30px;}
						.note_txt{max-width: 77%;min-width:100px;word-break:break-all;}
						.operation{max-width:70%;word-break:break-all;}
						.note_button{width:60px;text-align:center;height:24px;line-height:24px;background: #479CFF;color:#fff;font-size:13px;border-radius:2px;margin-left:10px;margin-top:-3px;cursor:pointer;}
					}
				}
			}
      .list_bot_end{padding-bottom: 20px;padding-left: 30px;z-index:1;margin-top: -5px;
      >p{font-size: 13px;color: #556677;line-height:100%;position: relative;
        span{position: absolute;left:-30px;top:-10px;color: #36AF47;font-size:20px;display:inline-block;}
      }
      ul{padding-top: 10px;
        .list_l{width:30%;}
        .list_m{width:25%;}
        .list_r{width:45%;
          a{text-decoration:none}
        }
        li{
          .tit{text-align:left;color:#556677;}
          .txt{color: #7F8FA4;margin-left:30px;word-break:break-all;}
          .note_txt{max-width: 77%;min-width:100px;}
          .operation{max-width:180px;}
          .note_button{width:60px;text-align:center;height:24px;line-height:24px;background: #479CFF;color:#fff;font-size:13px;border-radius:2px;margin-left:10px;margin-top:-3px;cursor:pointer;}
        }
      }
    }
		}

    .service_state{padding-top: 20px;
      .service_tit{font-size: 14px;color: #223344;height:20px;line-height:20px;margin-bottom:10px;}
      .service_btn{width:118px;height:30px;line-height:30px;text-align:center;border: 1px solid #479CFF;border-radius: 2px;color: #479CFF;cursor:pointer;}
      .service_table{margin-top: 10px;
        >p{font-size: 13px;color: #556677;margin-bottom:10px;}
        .tb01{width:25%;text-align:left;}
        .tb02{width:20%;text-align:left;}
        .tb03{width:25%;text-align:left;}
        .tb04{width:30%;text-align:left;}
        ul{
          li{line-height: 40px;height: 40px;}
        }
        .table_tit{background: #F5F5F5;border: 1px solid #DFE2E5;
          li{font-size: 13px;color: #223344;}
        }
        .record{border-bottom:1px solid #DFE2E5;border-left:1px solid #DFE2E5;border-right:1px solid #DFE2E5;padding-bottom:15px;
          .table_list{padding-top:15px;
            li{line-height:18px;height: 18px;
              p{text-overflow: ellipsis;white-space: nowrap;color: #556677;font-size: 13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding:0 5px;
                i{height:10px;width:10px;background-color:#d8d8d8;display:inline-block;border-radius:100%;position: absolute;top:23px;left:-5px;}
                .listBgc{background: #09BB07;left:-4px;}
              }
              .listL{position: relative;height:25px;margin-top: -20px;width:15px;}
              .list_l{border-left:1px dashed #ddd;position: relative;height:25px;margin-top: -20px;width:15px;}
            }
          }
        }
      }
    }
    .bl_tit{font-size: 14px;color: #223344;height: 20px;line-height: 20px;margin-bottom: 10px;}
    .bl_tit1{color:#7F8FA4;margin-bottom: 20px;}
		// 预览
    .img_preview{
      .el-dialog--tiny{width:940px;
        img{width:900px;}
      }
    }
    .img_preview{
      .el-carousel{margin:0 auto;width:900px;padding:0 40px;
        .el-carousel__container{margin:0 auto;height:650px;
          .el-carousel__arrow--right{right:-40px;}
          .el-carousel__arrow--left{left:-40px;}
          .el-carousel__item{text-align:center;width:820px;overflow-y: auto;
            img{width:820px;}
          }
        }
      }
    }
		.service_table{
			p{font-size: 13px;color: #223344;
				span{font-size: 13px;color: #7F8FA4;}
			}
		}
	}
</style>
