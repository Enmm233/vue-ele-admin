<template>
	<div class="detail_box">
		<div class="con_body">
			<el-row :gutter="24">
				<el-col :span="7">
					<div class="border_box">
						<div class="title flex flex_item_mid">
							<div class="xian"></div>
							<div class="txt">订单信息</div>
						</div>
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">订单ID：</div>
								<div class="right">{{orderInfo.id}}</div>
							</div>
						</div>
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">下单时间：</div>
								<div class="right">{{orderInfo.createTime}}</div>
							</div>
						</div>
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">订单状态：</div>
								<div class="right" v-if="orderInfo.status == 1">待付款</div>
								<div class="right" v-if="orderInfo.status == 2">待发货</div>
								<div class="right" v-if="orderInfo.status == 3">待收货</div>
								<div class="right" v-if="orderInfo.status == 4">待评价</div>
								<div class="right" v-if="orderInfo.status == 5">已取消</div>
								<div class="right" v-if="orderInfo.status == 6">已失效</div>
								<div class="right" v-if="orderInfo.status == 7">退款</div>
								<div class="right" v-if="orderInfo.status == 8">退货退款</div>
								<div class="right" v-if="orderInfo.status == 9">交易成功</div>
							</div>
						</div>
						<!-- <div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">发货单号：</div>
								<div class="right">{{orderInfo.id}}快递单号</div>
							</div>
						</div> -->
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">订单金额：</div>
								<div class="right">{{orderInfo.payAmount}}</div>
							</div>
						</div>
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">商品数量：</div>
								<div class="right">{{orderInfo.waresCount}}</div>
							</div>
						</div>
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">送货方式：</div>
								<div class="right" v-if="orderInfo.freightType == 1">货到付款</div>
								<div class="right" v-if="orderInfo.freightType == 2">线上支付</div>
							</div>
						</div>
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">收货人名：</div>
								<div class="right">{{orderInfo.receiveName}}</div>
							</div>
						</div>
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">联系电话：</div>
								<div class="right">{{orderInfo.receivePhone}}</div>
							</div>
						</div>
						<div class="info_txt">
							<div class="info flex">
								<div class="left">收货地址：</div>
								<div class="right">{{orderInfo.receiveAddress}}</div>
							</div>
						</div>
						<div class="info_txt">
							<div class="info flex flex_item_mid">
								<div class="left">用户备注：</div>
								<div class="right">{{orderInfo.userRemark}}</div>
							</div>
						</div>
					</div>

				</el-col>
				<el-col :span="11">
					<div class="border_box">
						<div class="title flex flex_item_mid">
							<div class="xian"></div>
							<div class="txt">商品清单</div>
						</div>
						<div class="tabl marginB20">
							<el-table :data="orderInfo.shopWaresOrderItemList" border class="table" header-cell-class-name="table-header">
								<el-table-column prop="waresId " label="商品ID" width="100" align="center"></el-table-column>
								<el-table-column prop="waresName " label="商品名称"></el-table-column>
								<el-table-column width="100" label="价格">
									<template slot-scope="scope">{{scope.row.price}}</template>
								</el-table-column>

								<el-table-column width="80" prop="waresNumber " label="数量" align="center"></el-table-column>

								<el-table-column prop="waresSpec " label="规格明细"></el-table-column>

							</el-table>
						</div>
						<div class="title flex flex_item_mid">
							<div class="xian"></div>
							<div class="txt">费用清单</div>
						</div>
						<div class="tabl">
							<el-table :data="orderInfo.shopOrderMoneyItems" border class="table" header-cell-class-name="table-header">
								<el-table-column prop="name " label="费用名称" align="center"></el-table-column>
								<el-table-column width="120" prop="id" label="附加项目ID"></el-table-column>
								<el-table-column width="120" label="类型">
									<template slot-scope="scope">
										<span v-if="scope.row.reduceType == 1">会员折扣</span>
										<span v-if="scope.row.reduceType == 2">活动折扣</span>
										<span v-if="scope.row.reduceType == 3">优惠券折扣</span>
										<span v-if="scope.row.reduceType == 4">满减</span>
										<span v-if="scope.row.reduceType == 5">红包</span>
										<span v-if="scope.row.reduceType == 6">店铺折扣</span>
										<span v-if="scope.row.reduceType == 7">直减</span>
									</template>
								</el-table-column>
								<el-table-column width="120" prop="linkId" label="券ID"></el-table-column>
								<el-table-column width="120" label="金额">
									<template slot-scope="scope" v-if="scope.row.type == 1">+{{scope.row.price}}</template>
									<template slot-scope="scope" v-if="scope.row.type == 2">-{{scope.row.price}}</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="total flex flex_item_mid">
							<div class="left">订单总金额：</div>
							<div class="right">¥ {{orderInfo.payAmount}}</div>
						</div>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="border_box">
						<div class="title flex flex_item_mid">
							<div class="xian"></div>
							<div class="txt">物流清单</div>
						</div>
						<div>
						<!-- 	<el-timeline>
								<el-timeline-item v-for="(activity, index) in activities" :key="index" :type="activity.type" color="#0bbd87"
								 :size="activity.size" :timestamp="activity.timestamp">
									{{activity.content}}
								</el-timeline-item>
							</el-timeline> -->
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		waresOrderDetails
	} from '../../../api/index';
	export default {
		name: 'goodsDetail',
		props: ["id"],
		data() {
			return {
				tableData: [],
				orderInfo: '',
				activities: [{
					content: '已完成',
					timestamp: '2018-04-12 20:46',
					size: 'large',
					type: 'primary',
				}, {
					content: '已签收',
					timestamp: '2018-04-03 20:46',
					color: '#0bbd87'
				}, {
					content: '派送中',
					timestamp: '2018-04-03 20:46',
					size: 'large'
				}, {
					content: '已发货',
					timestamp: '2018-04-03 20:46'
				}]
			};
		},
		watch: {
			"id": function() {
				this.getData()
			}
		},
		created() {
			this.getData()
		},
		methods: {

			getData() {
				var query = {
					data: {
						orderId: this.id,
					}
				};
				waresOrderDetails(query).then(res => {
					if (res.code == 1) {
						this.orderInfo = res.data;
					}
				});
			},

		}
	};
</script>

<style>
	.border_box {
		border: 1px solid #F5F7FA;
		padding: 20px;
		min-height: 500px;
	}

	.border_box .title {
		margin-bottom: 20px;
		font-size: 16px;
		font-weight: bold;
		color: #101010;
	}

	.border_box .title .xian {
		width: 4px;
		height: 20px;
		background: #2FB740;
		margin-right: 10px;
	}

	.border_box .info_txt .info {
		padding: 0;
		margin-bottom: 20px;
	}

	.border_box .info_txt .info .left {
		width: 28%;
		text-align: end;
		font-size: 14px;
		font-weight: bold;
		color: #101010;
	}

	.border_box .info_txt .info .right {
		width: 75%;
		font-size: 14px;
	}

	.border_box .total {
		justify-content: flex-end;
		margin-top: 10px;
	}

	.border_box .total .left {
		font-size: 14px;
		font-weight: bold;
		color: #101010;
		margin-right: 10px;
	}
</style>
