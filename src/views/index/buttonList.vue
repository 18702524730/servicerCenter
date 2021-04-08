<template>
	<div class="style_box">
		<div class="outScale animated" :class="{'rotateIn': isIn, 'rotateOut': isOut}" @mouseenter="do1">
     	<div class="innerRotate animated" :class="{'zoomIn': isIn, 'zoomOut': isOut}">
        <img v-if="isOk && !isIn" src="https://sebe360test.oss-cn-beijing.aliyuncs.com/91CE1289E5D91BEDAB7BA6B88127591C.jpg" alt="暂无图片" width="1200" height="600" />
        <img v-if="isOk && !isOut" class="next" src="https://sebe360test.oss-cn-beijing.aliyuncs.com/56A8A174B43381D4918D2D97F35E013F.jpg" alt="暂无图片" width="1200" height="600" />
      </div>
		</div>
		<h1>公用组件样式，主要是element-UI的样式继承和覆盖, <a target="_blank" href="http://element-cn.eleme.io/2.4/#/zh-CN/component/installation">element-ui链接</a></h1>
		<section class="buton_home">
			<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=476157901&amp;site=qq&amp;menu=yes" id="right_pic_qq">
				<img border="0" src="~assets/img/icon/link.png" alt="有事点这里">QQ客服</a>
			<el-row>
			  <el-button type="primary">默认按钮44px</el-button>
			  <el-button size="medium" type="primary">中等按钮36px</el-button>
			  <el-button size="small" type="primary">小型按钮30px</el-button>
			  <el-button size="mini" type="primary">超小按钮24px</el-button>
			</el-row>
			<el-row>
			  <el-button>默认按钮44px</el-button>
			  <el-button size="medium">中等按钮42px</el-button>
			  <el-button size="small">小型按钮30px</el-button>
			  <el-button size="mini">超小按钮24px</el-button>
			</el-row>
			<el-row>
			  <el-button round>默认按钮44px</el-button>
			  <el-button size="medium" round>中等按钮42px</el-button>
			  <el-button size="small" round>小型按钮30px</el-button>
			  <el-button size="mini" round>超小按钮24px</el-button>
			</el-row>
			<el-row>
			  <el-button size="medium" type="primary" disabled>禁用按钮</el-button>
			  <el-button size="medium" disabled>禁用按钮</el-button>
			</el-row>
			<a href="https://www.ipsebe.com/" target="_blank"><el-button size="small" type="primary">超链接跳转</el-button></a>
			<el-checkbox-group v-model="checkList">
		    <el-checkbox label="复选框 A"></el-checkbox>
		    <el-checkbox label="复选框 B"></el-checkbox>
		    <el-checkbox label="复选框 C"></el-checkbox>
		    <el-checkbox label="禁用" disabled></el-checkbox>
		    <el-checkbox label="选中且禁用" disabled></el-checkbox>
		  </el-checkbox-group>
		  <div class="box">
			  <el-radio v-model="radio1" label="备选项">备选项</el-radio>
			  <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
	  		<el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
  		</div>
  		<div class="input-group box">
	  		<el-input placeholder="默认大小40px" v-model="input" disabled clearable></el-input>
				<el-input placeholder="默认大小40px" v-model="input" clearable></el-input>
				<el-input placeholder="中等36px" v-model="input" size="medium" clearable></el-input>
				<el-input placeholder="小型32px" v-model="input" size="small" clearable></el-input>
				<el-input placeholder="超小28px" v-model="input" size="mini" clearable></el-input>
			</div>
			<div class="box">
			  <el-select v-model="value" placeholder="默认大小40px">
			    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			  </el-select>
			  <el-select v-model="value" placeholder="中等36px" size="medium">
			    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			  </el-select>
			  <el-select v-model="value" placeholder="小型32px" size="small">
			    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			  </el-select>
			  <el-select v-model="value" placeholder="超小28px" size="mini">
			    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			  </el-select>
		  </div>
		  <div class="box">
		    <span class="demonstration">完整功能</span>
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage4"
		      :page-sizes="[100, 200, 300, 400]"
		      :page-size="100"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="400"
		      background>
		    </el-pagination>
		  </div>
		  <div class="box">
		    <el-button :plain="true" @click="open2">成功消息</el-button>
			  <el-button :plain="true" @click="open3">警告消息</el-button>
			  <el-button :plain="true" @click="open">消息消息</el-button>
			  <el-button :plain="true" @click="open4">错误消息</el-button>
			  <el-button :plain="true" @click="open5">可关闭消息</el-button>
		  </div>

		  <el-button @click="giveUp=true">弹出框内容居中</el-button>
		  <el-button @click="giveUp1=true">弹出框内容居右</el-button>
		  <!-- 撤消出证 -->
			<el-dialog title="提示" width="400px" :visible.sync="giveUp" :close-on-click-modal="false" :append-to-body="true">
				<p class="lc">您确定要撤销出证吗？</p>
				<div class="lc mt20">
					<el-button size="small" type="primary" @click="giveUp=false">取消</el-button><el-button size="small" type="primary" class="sub" @click="giveUp=false">确定</el-button>
				</div>
			</el-dialog>
			<el-dialog title="提示" width="400px" :visible.sync="giveUp1" :close-on-click-modal="false" :append-to-body="true">
				<p>您确定要撤销出证吗？</p>
				<div class="lr mt20">
					<el-button size="small" type="primary" @click="giveUp1=false">取消</el-button><el-button size="small" type="primary" class="sub" @click="giveUp1=false">确定</el-button>
				</div>
			</el-dialog>
			<el-popover placement="bottom" width="170" trigger="click" popper-class="xxx">
        <p class="lc">是否取消该订单？</p>
        <div class="lc mt10">
          <el-button size="mini" type="primary" @click="giveUp1=false">是</el-button><el-button size="mini" type="primary" class="sub" @click="giveUp1=false">否</el-button>
        </div>
        <a href="javascript:;" class="cancel_order" slot="reference">默认popover</a>
      </el-popover>
      <!-- <el-popover placement="bottom" width="170" trigger="click" popper-class="dark-popover xxx">
        <p class="lc">是否取消该订单？</p>
        <div class="lc mt20">
          <el-button size="mini" type="primary" @click="giveUp1=false">是</el-button><el-button size="mini" type="primary" class="sub" @click="giveUp1=false">否</el-button>
        </div>
        <a href="javascript:;" class="cancel_order" slot="reference">深色popover</a>
      </el-popover> -->
		</section>



		<h1>列表公用样式（不可多选），包括列表tab，筛选条件框，表格table, 翻页组件，参考<router-link to="/service/myServiceOrder/list">服务-全部服务单</router-link></h1>
		<div class="commonList XXX">
			<div class="commonListHead myServiceOrderHead">
				<el-tabs v-model="activeName" @tab-click="tabClick">
					<el-tab-pane label="全部" name="all"></el-tab-pane>
					<el-tab-pane label="待付款" name="toPay"></el-tab-pane>
					<el-tab-pane label="已付款" name="paid"></el-tab-pane>
					<el-tab-pane label="已关闭" name="close"></el-tab-pane>
				</el-tabs>
			</div>
			<div class="condition clearfix">
				<div class="form_control"><el-input v-model="dataObj.bs_order_sn" placeholder="订单号"></el-input></div>
				<div class="form_control"><el-input v-model="dataObj.truename" placeholder="客户姓名"></el-input></div>
				<div class="form_control"><el-input v-model="dataObj.phone" placeholder="注册手机号"></el-input></div>
				<div class="form_control"><el-input v-model="dataObj.phone" placeholder="商户订单号"></el-input></div>
				<div class="form_control">
					<el-select v-model="dataObj.payment_state" clearable placeholder="支付状态">
						<el-option
							v-for="item in payStatusOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="form_submit">
					<button class="submit" @click="search('first')">搜索</button>
					<button class="reset" @click="reset()">重置</button>
				</div>
			</div>
			<div class="result result_no_check">
				<table class="result_type">
					<thead>
						<tr class="thead">
							<th width="140">订单号</th>
							<th class="minWidth">订单类型</th>
							<th>下单时间</th>
							<th class="minWidth">客户姓名</th>
							<th>客户手机号</th>
							<th class="minWidth">服务数量</th>
							<th class="minWidth">总金额</th>
							<th class="minWidth">支付状态</th>
							<th class="minWidth">订单状态</th>
							<th style="border-right:1px solid #DFE2E5" width="60">操作</th>
						</tr>
					</thead>
					<tbody class="tr-color">
						<tr v-for="(item, index) in dataList" v-show="!loading && dataList.length">
							<td>{{item.order_sn}}</td>
							<td>{{item.buyer_name}}</td>
							<td>{{item.create_time|dateFormat}}</td>
							<td>{{item.buyer_mobile}}</td>
							<td>{{item.bs_name}}</td>
							<td>{{item.create_time|dateFormat}}</td>
							<td :class="{pay:true, nopay: item.payment_state === 0}">{{item.payment_state === 0 ? '未支付' : '已支付'}}</td>
							<!-- <td>{{item.order_tasking_state === 0 ? '未接单' : '已接单'}}</td> -->
							<td>{{item.order_feedback_state}}</td>
							<td :class="{pay:true, nopay: item.payment_state === 0}">{{item.payment_state === 0 ? '未支付' : '已支付'}}</td>
							<td class="alignc action">
								<a href="#" class="view" @click.prevent="view(item)">查看</a>
							</td>
						</tr>
						<tr class="empty" v-show="!loading && !dataList.length">
							<td colspan="11" class="norecord">
								<div class="empty_ic"><span>暂无信息</span></div>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="my_loading" v-show="loading" v-loading="loading">
				</div>
				<div class="tb_pagination" v-if="!loading && dataList.length">
					<el-pagination
						@current-change="handleCurrentChange"
						:current-page.sync="pg_index"
						:page-size="15"
						layout="total, prev, pager, next"
						:total="total" class="fr">
					</el-pagination>
				</div>
			</div>
		</div>



		<h1>列表公用样式（可多选），包括列表tab，筛选条件框，表格table, 翻页组件， 参考<router-link to="/service/clientService/list">服务-全部工单</router-link></h1>
		<div class="commonList XXX">
			<div class="commonListHead myServiceOrderHead">
				<el-tabs v-model="activeName" @tab-click="tabClick">
					<el-tab-pane label="全部" name="all"></el-tab-pane>
					<el-tab-pane label="待付款" name="toPay"></el-tab-pane>
					<el-tab-pane label="已付款" name="paid"></el-tab-pane>
					<el-tab-pane label="已关闭" name="close"></el-tab-pane>
				</el-tabs>
			</div>
			<div class="condition clearfix">
				<div class="form_control"><el-input v-model="dataObj.bs_order_sn" placeholder="订单号"></el-input></div>
				<div class="form_control"><el-input v-model="dataObj.truename" placeholder="客户姓名"></el-input></div>
				<div class="form_control"><el-input v-model="dataObj.phone" placeholder="注册手机号"></el-input></div>
				<div class="form_control"><el-input v-model="dataObj.phone" placeholder="商户订单号"></el-input></div>
				<div class="form_control">
					<el-select v-model="dataObj.payment_state" clearable placeholder="支付状态">
						<el-option
							v-for="item in payStatusOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="form_submit">
					<button class="submit" @click="search('first')">搜索</button>
					<button class="reset" @click="reset()">重置</button>
				</div>
			</div>
			<div class="result">
				<div class="table_handle">
					<div class="all"><el-checkbox :indeterminate="isIndeterminate"></el-checkbox></div><div class="table_handle_btn batch">接单</div>|<div class="table_handle_btn infoSubmit">办理</div>|<div class="table_handle_btn batchDistribute">分配</div>
					<el-button size="small" type="primary" class="abs_r">右侧操作</el-button>
				</div>
				<table class="result_type">
					<thead>
						<tr class="thead">
							<th width="56"></th>
							<th width="140" style="padding-left: 0">服务单号</th>
							<th class="minWidth">客户姓名</th>
							<th>注册手机号</th>
							<th class="minWidth">服务名称</th>
							<th>下单时间</th>
							<th class="minWidth">支付状态</th>
							<!-- <th class="minWidth">接单状态</th> -->
							<th class="minWidth">办理状态</th>
							<th class="minWidth">代理顾问</th>
							<th style="border-right:1px solid #DFE2E5" width="60"></th>
						</tr>
					</thead>
					<tbody class="tr-color">
						<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length">
							<td class="check_wrap"><el-checkbox v-model="item.checked" @change="handleCheckChange(item)"></el-checkbox></td>
							<td style="padding-left: 0">
								{{item.order_sn}}
								<el-popover placement="top" width="400" trigger="hover" class="remark_icon_wrap" popper-class="popper_remark_icon" v-if="item.isAsistantremarks" @show="getRemark(item)">
	                <p>{{remark}}</p>
	                <a href="javascript:;" slot="reference" class="remark_icon">&nbsp;&nbsp;</a>
	              </el-popover>
	            </td>
							<td>{{item.buyer_name}}</td>
							<td>{{item.buyer_mobile}}</td>
							<td>{{item.bs_name}}</td>
							<td>{{item.create_time|dateFormat}}</td>
							<td :class="{pay:true, nopay: item.payment_state === 0}">{{item.payment_state === 0 ? '未支付' : '已支付'}}</td>
							<!-- <td>{{item.order_tasking_state === 0 ? '未接单' : '已接单'}}</td> -->
							<td>{{item.order_feedback_state}}</td>
							<td>{{item.operator_name}}</td>
							<td class="alignc action">
								<a href="#" class="view" @click.prevent="view(item)">查看</a>
							</td>
						</tr>
						<tr class="empty" v-show="!loading && !dataList.length">
							<td colspan="11" class="norecord">
								<div class="empty_ic"><span>暂无信息</span></div>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="my_loading" v-show="loading" v-loading="loading">
				</div>
				<div class="tb_pagination" v-if="!loading && dataList.length">
					<el-pagination
						@current-change="handleCurrentChange"
						:current-page.sync="pg_index"
						:page-size="15"
						layout="total, prev, pager, next"
						:total="total" class="fr">
					</el-pagination>
				</div>
			</div>
		</div>



		<h1>详情页公用样式，参考<router-link to="/service/myServiceOrder/detail/349077">详情1</router-link>、<router-link to="/service/myServiceOrder/detail/349216">详情2</router-link></h1>
		<div class="commonDetail xxx">
			<div class="basic_lists" v-if="detailData">
				<p>基本信息</p>
				<div class="basic_category clearfix">
					<ul>
						<li>
							<p class="tit">服务单号</p>
							<p class="txt">{{detailData.order_sn}}</p>
						</li>
						<li>
							<p class="tit">办理状态</p>
							<p class="txt">{{detailData.order_feedback_state}}</p>
						</li>
						<li>
							<p class="tit">金额</p>
							<p class="txt">{{detailData.payment_amount | priceformat}}</p>
						</li>
						<li>
							<p class="tit">支付状态</p>
							<p class="txt" :class="{'topay':detailData.payment_state == 1,'nopay':!detailData.payment_state}">{{detailData.payment_state | payStatusformat}}</p>
						</li>
						<li>
							<p class="tit">支付方式</p>
							<p class="txt">{{detailData.payment_name}}</p>
						</li>
						<li>
							<p class="tit">支付时间</p>
							<p class="txt">{{detailData.payment_time | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">服务分类</p>
							<p class="txt">{{detailData.bs_class_name}}</p>
						</li>
						<li v-if="detailData.order_service_state">
							<p class="tit">服务状态</p>
							<p class="txt">{{detailData.order_service_state | orderStatus}}</p>
						</li>
						<li>
							<p class="tit">服务名称</p>
							<p class="txt">{{detailData.bs_name}}</p>
						</li>
						<li>
							<p class="tit">售后状态</p>
							<p class="txt">{{detailData.refund_state | refundState}}</p>
						</li>
						<li>
							<p class="tit">下单时间</p>
							<p class="txt">{{detailData.create_time | dateFormat}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData">
				<p>客户信息</p>
				<div class="basic_category clearfix">
					<ul>
						<li>
							<p class="tit">用户昵称</p>
							<p class="txt">{{detailData.memberDTO.nickname || '--'}}</p>
						</li>
						<li>
							<p class="tit">姓名</p>
							<p class="txt">{{detailData.memberDTO.truename || '--'}}</p>
						</li>
						<li>
							<p class="tit">性别</p>
							<p class="txt">{{detailData.memberDTO.sex | sex}}</p>
						</li>
						<li>
							<p class="tit">手机号码</p>
							<p class="txt">{{detailData.memberDTO.phone || '--'}}</p>
						</li>
						<li>
							<p class="tit">所属行业</p>
							<p class="txt">{{detailData.memberDTO.industryName || '--'}}</p>
						</li>
						<li>
							<p class="tit">QQ</p>
							<p class="txt">{{detailData.memberDTO.member_qq || '--'}}</p>
						</li>
						<li>
							<p class="tit">微信号</p>
							<p class="txt">{{detailData.memberDTO.member_wechat || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData.memberApplySubject">
				<p>申请主体</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">主体类型</p>
							<p class="txt">{{detailData.memberApplySubject.applyType | formatApplySbj}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}名称</p>
							<p class="txt">{{detailData.memberApplySubject.applyName || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType!=4">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeNumber}}</p>
							<p class="txt">{{detailData.memberApplySubject.applyNumber || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.memberApplySubject.applyPhone || '--'}}</p>
						</li>
						<li>
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}注册地址</p>
							<p class="txt">{{detailData.memberApplySubject.applyAreaInfo + detailData.memberApplySubject.applyAddress || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr20" v-if="usinessLicense[0] && detailData.memberApplySubject.applyType!=2"><!--  @click="certificatePreview(usinessLicense)" -->
							<a :href="detailData.memberApplySubject.standby2" target="_blank">
								<img :src="usinessLicense[0]" alt="">
	            	<p :title="detailData.memberApplySubject.applyType | licenseName">{{detailData.memberApplySubject.applyType | licenseName}}</p>
	            </a>
						</div>
		        <div class="fl" v-if="detailData.memberApplySubject.standby1"><!--  @click="certificatePreview(cardImg)" -->
		        	<a :href="detailData.memberApplySubject.standby1" target="_blank">
			          <img :src="cardImg[0]" alt="">
			          <p :title="detailData.memberApplySubject.applyType | fileName">{{detailData.memberApplySubject.applyType | fileName}}</p>
		          </a>
		        </div>
					</div>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData.invoice">
				<p>开票信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left" v-if="!detailData.invoice || !detailData.invoice.invoiceType">
						<li>
							<p class="tit">未申请开票</p>
						</li>
					</ul>
					<ul class="fl category_left" v-if="detailData.invoice && detailData.invoice.invoiceType">
						<li>
							<p class="tit">发票类型</p>
							<p class="txt">{{detailData.invoice.invoiceType | invoiceTypeFormat}}</p>
						</li>
						<li>
							<p class="tit">发票抬头</p>
							<p class="txt">{{detailData.invoice.invoiceTitle || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2">
							<p class="tit">纳税人识别号</p>
							<p class="txt">{{detailData.invoice.invoiceCode || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}联系电话</p>
							<p class="txt">{{detailData.invoice.registPhone || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
							<p class="tit">{{detailData.memberApplySubject.applyType | mainBodeSbj}}注册地址</p>
							<p class="txt">{{detailData.invoice.areaInfo + detailData.invoice.address || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
							<p class="tit">开户行</p>
							<p class="txt">{{detailData.invoice.accountBank || '--'}}</p>
						</li>
						<li v-if="detailData.memberApplySubject.applyType == 2 && detailData.invoice.invoiceType == 2">
							<p class="tit">银行账号</p>
							<p class="txt">{{detailData.invoice.accountNumber || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData && detailData.order_bs_code=='sbfw_gnsb_zs'">
				<p>注册商标信息</p>
				<div class="basic_category clearfix">
					<ul class="fl category_left">
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">{{detailData.tradeMarkName || '--'}}</p>
						</li>
						<li>
							<p class="tit">商标分类</p>
							<p class="txt">{{getTmInfo(detailData.intCls)}}</p>
						</li>
						<li>
							<p class="tit">小项类目</p>
							<p class="txt">{{detailData.group || '--'}}</p>
						</li>
						<li>
							<p class="tit">在先近似商标</p>
							<p class="txt">{{detailData.similarTrademark || '--'}}</p>
						</li>
						<li>
							<p class="tit">注册通过率</p>
							<p class="txt" v-if="detailData.registerPassRate">{{detailData.registerPassRate}}%</p>
							<p class="txt" v-else>--</p>
						</li>
						<!-- <li>
							<p class="tit">开户行</p>
							<p class="txt">{{detailData.invoice && detailData.invoice.accountBank || '--'}}</p>
						</li> -->
						<li>
							<p class="tit">风险说明及注册建议</p>
							<p class="txt">{{detailData.riskDescRegisterAdvice || '--'}}</p>
						</li>
					</ul>
					<div class="basic_img fl clearfix">
						<div class="fl mr30 mb20" v-if="powerAttorney[0]" @click="certificatePreview(powerAttorney)">
	            <img :src="powerAttorney[0]" alt="">
	            <p title="委托书">委托书</p>
						</div>
						<div class="fl mr30 mb20" v-if="detailData.specify_pic_url" @click="preview(detailData.specify_pic_url)">
							<img :src="detailData.specify_pic_url" alt="">
							<p title="指定色">指定色</p>
						</div>
						<div class="fl mb20" v-if="detailData.black_white_pic_url" @click="preview(detailData.black_white_pic_url)">
							<img :src="detailData.black_white_pic_url" alt="">
							<p title="黑白色">黑白色</p>
						</div>
					</div>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData">
				<p>服务信息</p>
				<div class="table_list clearfix">
					<table class="lc">
						<thead>
							<tr>
								<th>服务单号</th>
								<th>服务信息</th>
								<th>需支付价格</th>
								<th>实付</th>
								<th>用户确认</th>
								<th>服务状态</th>
								<th>售后状态</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>004280625100028</td>
								<td>004280625100028</td>
								<td>799.00</td>
								<td>799.00</td>
								<td>已确认</td>
								<td>服务中</td>
								<td>--</td>
								<td><a href="">查看详情</a></td>
							</tr>
							<tr>
								<td colspan="8" class="lc">
									<div class="no_data">
										<img src="~assets/img/nulldata.png" alt=""><span>暂无信息</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="basic_lists" v-if="detailData">
				<p>服务信息</p>
				<div class="table_list clearfix">
					<table class="ll">
						<thead>
							<tr>
								<th>服务单号</th>
								<th>服务信息</th>
								<th>售后状态</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>004280625100028</td>
								<td>服务中</td>
								<td>--</td>
								<td><a href="">查看详情</a></td>
							</tr>
							<tr>
								<td colspan="4" class="lc">
									<div class="no_data">
										<img src="~assets/img/nulldata.png" alt=""><span>暂无信息</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="detail_null" v-if="!detailData">
				<div>
					<img src="~assets/img/nulldata.png" alt="">
					<span class="ml5">系统繁忙，请稍后再试</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Filters from 'utils/filters/'
	export default {
		data () {
      return {
      	isOk: true,
      	isIn: false,
      	isOut: false,
      	powerAttorney:[],
      	usinessLicense:[],
      	cardImg:[],
      	isIndeterminate: false,
      	detailData: {
				  "order_id" : 349216,
				  "order_sn" : "006280707100000",
				  "payment_sn" : "10003907507",
				  "bs_name" : " 存证服务包-1次",
				  "bs_class_name" : "套餐服务 存证包",
				  "order_state" : 1,
				  "payment_state" : 1,
				  "payment_code" : "wx_pub_qr",
				  "payment_name" : "微信支付",
				  "payment_amount" : 2.00,
				  "order_payment_sn" : "15309466499550962",
				  "create_time" : 1530946650000,
				  "order_is_history" : 0,
				  "payment_time" : 1530946678000,
				  "order_feedback_state_code" : null,
				  "order_feedback_state" : "服务完成",
				  "order_feedback_state_xuhao" : 3,
				  "next_order_feedback_state" : "服务关闭",
				  "next_order_feedback_state_xuhao" : 4,
				  "refund_state" : null,
				  "refund_state_description" : null,
				  "refunds" : [ ],
				  "feedbacks" : [ {
				    "order_feedback_id" : 359023,
				    "operating_time" : 1530946677000,
				    "operating_satrt_state" : "无",
				    "operating_end_state" : "服务完成",
				    "operator" : "徐光宇",
				    "memo" : null,
				    "feedback_stage" : 98,
				    "feedback_code" : "tcfw_czb_wuba_finish",
				    "bs_feedback_operate" : null,
				    "type" : null,
				    "state_update_time" : null,
				    "url" : null
				  } ],
				  "memberApplySubject" : {
				    "trademarkSubjectId" : 177870,
				    "memberId" : 4083,
				    "operatorId" : 228,
				    "applyType" : 2,
				    "applyAuthor" : 0,
				    "applyName" : "仲召远测试企业",
				    "applyNameEn" : null,
				    "applyNumber" : "222222222222222222",
				    "applyPhone" : "13063751650",
				    "applyEmail" : "790518131@qq.com",
				    "applyProvinceId" : 2,
				    "applyCityId" : 40,
				    "applyAreaId" : 56,
				    "applyAreaInfo" : "天津市 天津市 河东区",
				    "applyAddress" : "222222222222222222222222222222222222222222",
				    "applyZipCode" : "222222",
				    "applyFax" : null,
				    "createTime" : 1530673273000,
				    "updateTime" : 1530673273000,
				    "standby1" : "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/2C224842C02CFA4FEB4DB60D38F0A44D.pdf",
				    "standby1FileName" : "材料评审报告.pdf",
				    "standby2" : null,
				    "standby2FileName" : null,
				    "standby1User" : null,
				    "standby2User" : null,
				    "taobaoUserNick" : null,
				    "customerTypeId" : null,
				    "customerTypeName" : null
				  },
				  "memberDTO" : {
				    "member_id" : 4159,
				    "member_sn" : "180426000514",
				    "email" : null,
				    "phone" : "15721224944",
				    "password" : "",
				    "new_password" : null,
				    "token" : null,
				    "nickname" : null,
				    "truename" : "徐光宇",
				    "avatar" : null,
				    "sex" : 1,
				    "birthday" : null,
				    "memberIdentificationCard" : null,
				    "member_industry" : "",
				    "industryName" : null,
				    "login_num" : 68,
				    "login_time" : 1531029965000,
				    "old_login_time" : 1531029965000,
				    "login_ip" : "61.149.177.98",
				    "old_login_ip" : null,
				    "area_id" : null,
				    "city_id" : null,
				    "province_id" : null,
				    "area_info" : null,
				    "type" : 0,
				    "memberApplication" : null,
				    "organization" : {
				      "organization_id" : 0,
				      "name" : null,
				      "remark" : null,
				      "parent" : null,
				      "childs" : null,
				      "create_time" : null,
				      "update_time" : null,
				      "business" : null
				    },
				    "memberOrganizationId" : 0,
				    "grade_id" : 0,
				    "remind" : 0,
				    "status" : 1,
				    "state_remark" : null,
				    "remind_email" : null,
				    "remind_phone" : null,
				    "member_address" : "",
				    "parent" : {
				      "member_id" : 0,
				      "member_sn" : null,
				      "email" : null,
				      "phone" : null,
				      "password" : null,
				      "new_password" : null,
				      "token" : null,
				      "nickname" : null,
				      "truename" : null,
				      "avatar" : null,
				      "sex" : null,
				      "birthday" : null,
				      "memberIdentificationCard" : null,
				      "member_industry" : null,
				      "industryName" : null,
				      "login_num" : null,
				      "login_time" : null,
				      "old_login_time" : null,
				      "login_ip" : null,
				      "old_login_ip" : null,
				      "area_id" : null,
				      "city_id" : null,
				      "province_id" : null,
				      "area_info" : null,
				      "type" : null,
				      "memberApplication" : null,
				      "organization" : null,
				      "memberOrganizationId" : null,
				      "grade_id" : null,
				      "remind" : null,
				      "status" : null,
				      "state_remark" : null,
				      "remind_email" : null,
				      "remind_phone" : null,
				      "member_address" : null,
				      "parent" : null,
				      "firstChannel" : null,
				      "create_time" : null,
				      "update_time" : null,
				      "relationId" : null,
				      "relationMembers" : null,
				      "member_wechat" : null,
				      "member_qq" : null,
				      "default_apply_subject_type" : null,
				      "default_apply_subject_name" : null,
				      "isIENine" : false,
				      "vipName" : null,
				      "wxAccount" : null,
				      "openid" : null,
				      "wxNickName" : null,
				      "isBindWxAccount" : 0,
				      "isBindTbAccount" : 0,
				      "memberLinkman" : null,
				      "memberLinkmanMemo" : null,
				      "registFrom" : null,
				      "resourceType" : null,
				      "taobaoAccount" : null,
				      "type_code" : null,
				      "isCxbOrder" : null
				    },
				    "firstChannel" : {
				      "channel_id" : 1,
				      "code" : "sebe",
				      "name" : "拾贝",
				      "member_code" : null,
				      "member_name" : null,
				      "member_info" : null,
				      "create_time" : null,
				      "update_time" : null
				    },
				    "create_time" : 1524721508000,
				    "update_time" : 1530946523000,
				    "relationId" : null,
				    "relationMembers" : null,
				    "member_wechat" : null,
				    "member_qq" : null,
				    "default_apply_subject_type" : null,
				    "default_apply_subject_name" : null,
				    "isIENine" : false,
				    "vipName" : null,
				    "wxAccount" : null,
				    "openid" : null,
				    "wxNickName" : null,
				    "isBindWxAccount" : 0,
				    "isBindTbAccount" : 0,
				    "memberLinkman" : null,
				    "memberLinkmanMemo" : null,
				    "registFrom" : 1,
				    "resourceType" : null,
				    "taobaoAccount" : null,
				    "type_code" : null,
				    "isCxbOrder" : null
				  },
				  "invoice" : null,
				  "stage" : 98,
				  "agentDistributeRecords" : null,
				  "isModifyMemo" : 0,
				  "orderRemarks" : [ ],
				  "tradeMarkName" : "测试一下看下是否可以多次修改",
				  "intCls" : 1,
				  "group" : "碱土金属 010039;硅 010483;三氧化硫 C010002;氩 010082;锝 010516;氪 010372;溴;准金属 010390;化学用硫华 010299;硫（非金属元素）;石墨烯 010715;无水氨 010066;",
				  "similarTrademark" : "额鹅鹅鹅鹅鹅鹅",
				  "registerPassRate" : 23,
				  "riskDescRegisterAdvice" : "若柔柔弱弱柔柔弱弱",
				  "itemPrice" : 120.00,
				  "itemState" : -1,
				  "pic_type" : 1,
				  "proxy_url" : "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/C9E44BCFFC2F3BD52655C27E440EF918.jpg",
				  "specify_pic_url" : null,
				  "black_white_pic_url" : "https://hzsebetest.oss-cn-hangzhou.aliyuncs.com/3CEC65872E14A3B824927DD21101A924.jpg",
				  "acceptMaterials" : null,
				  "order_service_state" : 2,
				  "order_bs_code" : "sbfw_gnsb_zs"
				},
				loading: false,
				activeName:'',
				dataObj:{},
				payStatusOptions:[],
				pickerOptions:[],
				dataList: [{
			    "number" : 16,
			    "order_id" : 349216,
			    "order_sn" : "006280707100000",
			    "buyer_mobile" : "15721224944",
			    "order_amount" : 2.00,
			    "order_state" : 1,
			    "payment_state" : 1,
			    "create_time" : 1530946650000,
			    "order_types" : 1,
			    "buyer_name" : "徐光宇",
			    "sonOrderCount" : null,
			    "order_apply_subject_id" : null,
			    "order_apply_subject_name" : null,
			    "stage" : null,
			    "bs_name" : " 存证服务包-1次",
			    "bs_class_name" : "套餐服务 存证包",
			    "order_feedback_state" : null,
			    "refund_state" : null,
			    "refund_state_description" : null,
			    "order_payment_sn" : "15309466499550962",
			    "operator_id" : null,
			    "operator_name" : null,
			    "payment_time" : 1530946678000,
			    "order_tasking_state" : 1,
			    "order_service_state" : 2,
			    "asistantPhone" : null,
			    "isAsistantremarks" : 0
			  }],
			  pg_index:1,
			  total:1,
        checkList: ['选中且禁用','复选框 A'],
        radio1: '备选项',
        input:'',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        currentPage4: 4,
        giveUp: false,
        giveUp1: false
      };
    },
    methods: {
    	do1(){
    		if (this.isIn) {return}
    		this.isOk = true;
    		this.isOut = true;
    		setTimeout(() => {
    			this.isOut = false;
    			this.isIn = true;
    			setTimeout(() => {
	    			//this.isIn = false;
	    			//this.isOut = false;
	    		}, 8000)
    		}, 8000)
    	},
    	// 大类过滤
    	getTmInfo(item){
    		if(item){
    			var str = '第'+ item + '类-';
        	return str;
    		}else{
    			var str = '--';
    			return str;
    		}
      },
    	tabClick(){},//参照全部服务单列表
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      open() {
        this.$message('这是一条消息提示');
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success',
          duration: 0,
          showClose: true,
        });
      },
      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },
      open4() {
        this.$message.error('错了哦，这是一条错误消息');
      },
      open5() {
        this.$message.error({
        	message: '错了哦，这是一条错误消息',
          showClose: true,
        });
      }
    },
    filters: {
      orderStatusformat: Filters.orderStatusformat,
      orderStatus: Filters.orderStatus,
      sex: Filters.sex,
      priceformat: Filters.priceformat,
      formatApplySbj: Filters.subjectTypeFormat,
      payStatusformat:Filters.payStatusformat,
      refundState:Filters.refundState,
      dateFormat:Filters.formatDate.dateFormat,
      mainBodeSbj:Filters.mainBodeSbj,
      mainBodeNumber:Filters.mainBodeNumber,
      invoiceTypeFormat:Filters.invoiceTypeFormat,
      fileName:Filters.fileName,
    }
	}
</script>
<style lang="scss">
.style_box{
	h1{
		padding: 20px; border-bottom: 2px solid #FF9639;color: #FF9639;
		a{color: #479CFF;}
	}
	.buton_home{
			width:100%;background-color: #fff;position: relative;z-index: 1;padding:20px;
			button{margin-bottom: 10px; }
			.box{padding-top:10px;}
			.input-group{
				.el-input{width: 180px;}
			}
	}
	@keyframes zoomIn {
    0% {
    	transform: scale3d(0.1,.1,.1);
    	opacity: 0;
		}

		50% {
		    opacity: 0.5;
		    transform: scale3d(.3,.3,.3);
		}
		100% {
		    opacity: 1;
		}
  }
	@keyframes zoomOut {
    0% {
    	opacity: 1;
		}

		50% {
		    opacity: 0.5;
		    transform: scale3d(0.3,.3,.3);
		}
		100% {
			transform: scale3d(0.1,.1,.1);
		    opacity: 0;
		}
  }
  @keyframes rotateIn {
    0% {
	    transform-origin: center;
	    opacity: 0;
		}

		100% {
		    transform-origin: center;
		    transform: rotate(360deg);
		    opacity: 1;
		}
  }
  @keyframes rotateOut {
    0% {
	    transform-origin: center;
	    transform: rotate(360deg);
	    opacity: 1;
		}

		100% {
		    transform-origin: center;
		    opacity: 0;
		}
  }
  .animated {
    animation-duration: 10s;
    animation-fill-mode: both;
	}
	.outScale{
		width: 1200px;height: 600px;overflow: hidden;position: relative;
		//animation-name: rotateIn;
		img{
			position: absolute;left: 0;top:0;z-index: 2;
		}
		.next{z-index: 1;}
    /* &:hover{
      animation-name: rotateOut;
    } */
	}
	.innerRotate{
		//animation-name: zoomIn;
		/* &:hover{
		      animation-name: zoomOut;
		    } */
	}
	.zoomOut{
    animation-name: zoomOut;
  }
  .zoomIn{
    animation-name: zoomIn;
  }
  .rotateOut{
    animation-name: rotateOut;
  }
  .rotateIn{
    animation-name: rotateIn;
  }
}
</style>
