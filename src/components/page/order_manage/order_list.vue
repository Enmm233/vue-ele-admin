<!-- order_list 订单列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" :model="form" class="flex flex_wrap" label-width="80px">
					<el-form-item label="订单ID">
						<el-input v-model="form.orderId" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="订单状态">
						<div class="flex flex_wrap">
							<el-select v-model="form.orderStatusStr" placeholder="默认" class="handle-select mr10">
								<el-option key="0" label="全部" value="0"></el-option>
								<el-option key="1" label="待付款" value="1"></el-option>
								<el-option key="2" label="待发货" value="2"></el-option>
								<el-option key="3" label="待收货" value="3"></el-option>
								<el-option key="4" label="待评价" value="4"></el-option>
								<el-option key="5" label="已取消" value="5"></el-option>
								<el-option key="6" label="已失效" value="6"></el-option>
								<el-option key="7" label="退款" value="7"></el-option>
								<el-option key="8" label="退货退款" value="8"></el-option>
								<el-option key="9" label="交易成功" value="9"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="地区">
						<el-input v-model="form.address" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="下单时间">
						<div class="block mr10">
							<el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
							 end-placeholder="结束日期">
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="商品名称">
						<el-input v-model="form.waresName" placeholder="输入商品名称" class="handle-input mr10"></el-input>
					</el-form-item>
				</el-form>
				<div>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</div>
			</div>

			<div class="handle-box">
				<el-button type="success" @click="refreshData">刷新列表</el-button>
			</div>

			<el-table height="600" :data="tableData.data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="订单ID" width="100" align="center"></el-table-column>
				<el-table-column prop="createTime" label="下单时间" width="180"></el-table-column>
				<el-table-column label="总金额" width="100">
					<template slot-scope="scope">￥{{scope.row.totalAmount}}</template>
				</el-table-column>

				<el-table-column label="订单状态" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.status == 1">待付款</span>
						<span v-if="scope.row.status == 2">待发货</span>
						<span v-if="scope.row.status == 3">待收货</span>
						<span v-if="scope.row.status == 4">待评价</span>
						<span v-if="scope.row.status == 5">已取消</span>
						<span v-if="scope.row.status == 6">已失效</span>
						<span v-if="scope.row.status == 7">退款</span>
						<span v-if="scope.row.status == 8">退货退款</span>
						<span v-if="scope.row.status == 9">交易成功</span>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="date" label="下单平台" align="center" width="100"></el-table-column> -->
				<el-table-column prop="userRemark" label="用户备注" align="center" width="100"></el-table-column>
				<el-table-column prop="waresName" label="产品名称" align="center" width="100"></el-table-column>

				<el-table-column prop="waresSpec" label="已选规格" align="center" width="100"></el-table-column>
				<el-table-column prop="sendAddress" label="地区" align="center" width="100"></el-table-column>

				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
						<el-button v-if="scope.row.status == 2" type="success" size="mini" @click="handleShipments(scope.$index, scope.row)">发货</el-button>
						<!-- <el-button type="danger" size="mini" @click="handleEdit(scope.$index, scope.row)">备货</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<el-dialog :close-on-click-modal="false" title="订单详情" :visible.sync="dialogVisible" width="80%">
			<order-deatil :id="orderId"></order-deatil>
		</el-dialog>

		<el-dialog :close-on-click-modal="false" title="订单发货" :visible.sync="shipments" width="35%">
			<div>
				<el-form ref="shipmentsInfo" :model="shipmentsInfo" label-width="80px">
					<el-form-item label="收货人名">
						<el-input v-model="shipmentsInfo.receiveName" placeholder="输入收货人名"></el-input>
					</el-form-item>
					<el-form-item label="收货电话">
						<el-input type="number" v-model="shipmentsInfo.receivePhone" placeholder="输入收货电话"></el-input>
					</el-form-item>
					<el-form-item label="收货地址">
						<el-input v-model="shipmentsInfo.receiveAddress" placeholder="输入收货地址"></el-input>
					</el-form-item>
					<el-form-item label="物流公司">
						<el-input v-model="shipmentsInfo.logisticsCompany" placeholder="输入物流公司"></el-input>
					</el-form-item>
					<el-form-item label="发货人名">
						<el-input v-model="shipmentsInfo.sendName" placeholder="输入发货人名"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input type="number" v-model="shipmentsInfo.sendPhone" placeholder="输入联系电话"></el-input>
					</el-form-item>
					<el-form-item label="发货地址">
						<el-input v-model="shipmentsInfo.sendAddress" placeholder="输入发货地址"></el-input>
					</el-form-item>
					<el-form-item label="货运单号">
						<el-input v-model="shipmentsInfo.logisticsId" placeholder="输入货运单号"></el-input>
					</el-form-item>
					<el-form-item label="运费方式">
						<div class="flex flex_wrap">
							<el-select v-model="shipmentsInfo.freightTypeStr" @change="freightTypeCil" placeholder="请选择运费支付方式(不选择默认是线上支付)"
							 style="width: 100%;">
								<el-option key="1" label="货到付款" value="1"></el-option>
								<el-option key="2" label="线上支付" value="2"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<div class="flex flex_wrap">
						<el-button @click="deliver" type="success" style="width: 100%;height: 40px;">打单发货</el-button>
					</div>
				</el-form>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import {
		listWaresOrder,
		deliverGoods
	} from '../../../api/index';
	import {
		mapState
	} from 'vuex'
	import {
		dateFormat
	} from '../../../utils/utils.js'
	import orderDeatil from '../../common/order/order_detail.vue'
	export default {
		name: 'Inventory_change',
		computed: {
			...mapState(['accountId', 'imgUrl']), //显示state的数据
		},
		components: {
			orderDeatil,
		},
		data() {
			return {
				dialogVisible: false,
				shipments: false,
				dialogImageUrl: '',
				tableData: [],
				page: 1,
				pageTotal: 0,
				form: {
					orderId: '',
					orderStatus: 0,
					orderStatusStr: '',
					waresName: '',
					address: '',
				},
				shipmentsInfo: {
					receiveName: '',
					receivePhone: '',
					receiveAddress: '',
					logisticsCompany: '',
					sendName: '',
					sendPhone: '',
					sendAddress: '',
					logisticsId: '',
					freightType: 2,
					freightTypeStr: '',
				},
				orderId: '',
				orderInfo: '',
				value1: [],
			};
		},
		watch: {
			'$route.path': function(newVal, oldVal) {
				this.value1 = [];
				this.form = {
					orderId: '',
					orderStatus: 0,
					orderStatusStr: '',
					waresName: '',
					address: '',
				}
			}
		},
		created() {
			this.getData();
		},
		methods: {
			refreshData() {
				//刷新列表
				this.form.orderId = '';
				this.form.orderStatus = 0;
				this.form.orderStatusStr = '';
				this.form.waresName = '';
				this.form.address = '';
				this.value1 = [];
				this.page = 1;
				this.pageTotal = 0;
				this.getData();
			},
			deliver() {
				if (this.shipmentsInfo.logisticsCompany == '') {
					this.$message.error('物流公司名称不能为空');
					return;
				}
				if (this.shipmentsInfo.receiveAddress == '') {
					this.$message.error('收货地址不能为空');
					return;
				}
				if (this.shipmentsInfo.receiveName == '') {
					this.$message.error('收货人姓名不能为空');
					return;
				}
				if (this.shipmentsInfo.receivePhone == '') {
					this.$message.error('收货人电话不能为空');
					return;
				}
				if (this.shipmentsInfo.sendAddress == '') {
					this.$message.error('发货地址不能为空');
					return;
				}
				if (this.shipmentsInfo.sendName == '') {
					this.$message.error('发货人姓名不能为空');
					return;
				}
				if (this.shipmentsInfo.sendPhone == '') {
					this.$message.error('发货人电话不能为空');
					return;
				}
				if (this.shipmentsInfo.logisticsId == '') {
					this.$message.error('物流单号不能为空');
					return;
				}
				var query = {
					data: {
						orderId: this.orderId,
						logisticsId: this.shipmentsInfo.logisticsId,
						logisticsCompany: this.shipmentsInfo.logisticsCompany,
						receiveAddress: this.shipmentsInfo.receiveAddress,
						receiveName: this.shipmentsInfo.receiveName,
						receivePhone: this.shipmentsInfo.receivePhone,
						sendAddress: this.shipmentsInfo.sendAddress,
						sendName: this.shipmentsInfo.sendName,
						sendPhone: this.shipmentsInfo.sendPhone,
						freightType: this.shipmentsInfo.freightType,
						logisticsStatus: 1,
						remarks: '',
					}
				};
				deliverGoods(query).then(res => {
					if (res.code == 1) {
						this.$message.success('发货成功');
						this.shipments = false;
						this.shipmentsInfo = {
							receiveName: '',
							receivePhone: '',
							receiveAddress: '',
							logisticsCompany: '',
							sendName: '',
							sendPhone: '',
							sendAddress: '',
							logisticsId: '',
							freightType: 2,
							freightTypeStr: '',
						};
						this.getData();
					}
				});
			},

			freightTypeCil(data) {
				this.shipmentsInfo.freightType = data;
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				if (this.value1 != '') {
					var arr = [];
					this.value1.map((item, index) => {
						arr.push(dateFormat("YYYY-mm-dd HH:MM:SS", item))
					})
					var startTime = arr[0]
					var endTime = arr[1]
				} else {
					var startTime = '';
					var endTime = '';
				};
				if (this.form.orderId == '') {
					var orderId = 0;
				} else {
					var orderId = this.form.orderId;
				}
				var query = {
					data: {
						accountId: localStorage.getItem('account_id'),
						orderId: orderId,
						orderStatus: this.form.orderStatus,
						waresName: this.form.waresName,
						address: this.form.address,
						startTime: startTime,
						endTime: endTime,
						nowPage: this.page,
						pageCount: 9,
					}
				};

				listWaresOrder(query).then(res => {
					if (res.code == 1) {
						this.tableData = res;
						this.pageTotal = res.allPage;
					} else if (res.code == 2) {
						if (res.data.length > 0) {
							this.tableData = res;
							this.pageTotal = res.allPage;
						} else {
							this.tableData = [];
							this.pageTotal = 0;
						}
					}
				});
			},
			handleDetails(index, row) {
				this.orderId = row.id;
				this.dialogVisible = true;
			},
			handleShipments(index, row) {
				// this.orderInfo = row;
				this.shipmentsInfo.receiveAddress = row.sendAddress;
				this.shipmentsInfo.receiveName = row.sendName;
				this.shipmentsInfo.receivePhone = row.sendPhone;
				this.shipments = true;
			},

			// 触发搜索按钮
			handleSearch() {
				this.getData();
			},

			// 分页导航
			handlePageChange(val) {
				this.page = val;
				this.getData();
			}
		}
	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 100px;
		display: inline-block;
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>
