<!-- salesReturn_list 申请退换货列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" class="flex flex_wrap" label-width="80px">
					<el-form-item label="订单ID">
						<el-input type="number" v-model="orderId" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="申请ID">
						<el-input type="number" v-model="applyId" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="申请状态">
						<div class="flex flex_wrap">
							<el-select v-model="refundStatusStr" @change="refundStatusCil" placeholder="默认" class="handle-select mr10">
								<el-option key="0" label="全部" value="0"></el-option>
								<el-option key="1" label="待处理" value="1"></el-option>
								<el-option key="2" label="顾客待发货" value="2"></el-option>
								<el-option key="3" label="商家待收货" value="3"></el-option>
								<el-option key="4" label="商家待发货" value="4"></el-option>
								<el-option key="5" label="顾客待收货" value="5"></el-option>
								<el-option key="6" label="待退款" value="6"></el-option>
								<el-option key="7" label="商家拒绝" value="7"></el-option>
								<el-option key="8" label="已完成" value="8"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="申请时间">
						<div class="block mr10">
							<el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
							 end-placeholder="结束日期">
							</el-date-picker>
						</div>
					</el-form-item>

					<el-form-item label="申请类型">
						<div class="flex flex_wrap">
							<el-select v-model="applyTypeStr" @change="applyTypeCil" placeholder="默认" class="handle-select mr10">
								<el-option key="0" label="全部" value="0"></el-option>
								<el-option key="1" label="退款" value="1"></el-option>
								<el-option key="2" label="退货" value="2"></el-option>
								<el-option key="3" label="换货" value="3"></el-option>
								<el-option key="4" label="退货退款" value="4"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="理由类型">
						<div class="flex flex_wrap">
							<el-select v-model="reasonTypeStr" @change="reasonTypeCil" placeholder="默认" class="handle-select mr10">
								<el-option key="0" label="全部" value="0"></el-option>
								<el-option key="1" label="生鲜质量变质" value="1"></el-option>
								<el-option key="2" label="无条件退货" value="2"></el-option>
								<el-option key="3" label="无条件换货" value="3"></el-option>
								<el-option key="4" label="保质期内损坏" value="4"></el-option>
								<el-option key="5" label="商家召回" value="5"></el-option>
								<el-option key="6" label="发错商品" value="6"></el-option>
								<el-option key="7" label="其它理由类型" value="7"></el-option>
							</el-select>
						</div>
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
				<el-table-column prop="id" label="申请ID" width="100" align="center"></el-table-column>
				<el-table-column prop="orderId" label="订单ID" width="100" align="center"></el-table-column>
				<el-table-column prop="waresId" label="商品ID" width="100" align="center"></el-table-column>
				<el-table-column prop="createTime" label="申请时间" width="180" align="center"></el-table-column>
				<el-table-column label="退款金额" width="80">
					<template slot-scope="scope">￥{{scope.row.refundMoney}}</template>
				</el-table-column>

				<el-table-column label="申请状态" width="80" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.applyStatus == 1">待处理</span>
						<span v-if="scope.row.applyStatus == 2">顾客待发货</span>
						<span v-if="scope.row.applyStatus == 3">商家待收货</span>
						<span v-if="scope.row.applyStatus == 4">商家待发货</span>
						<span v-if="scope.row.applyStatus == 5">顾客待收货</span>
						<span v-if="scope.row.applyStatus == 6">待退款</span>
						<span v-if="scope.row.applyStatus == 7">商家拒绝</span>
						<span v-if="scope.row.applyStatus == 8">已完成</span>
					</template>
				</el-table-column>

				<el-table-column label="申请图片" align="center" width="80">
					<template slot-scope="scope">
						<el-image class="table-td-thumb" :src="imgUrl+scope.row.applyImg" :preview-src-list="[imgUrl+scope.row.thumb]"></el-image>
					</template>
				</el-table-column>

				<el-table-column label="理由类型" align="center" width="110">
					<template slot-scope="scope">
						<span v-if="scope.row.reasonType == 1">生鲜质量变质</span>
						<span v-if="scope.row.reasonType == 2">无条件退货</span>
						<span v-if="scope.row.reasonType == 3">无条件换货</span>
						<span v-if="scope.row.reasonType == 4">保质期内损坏</span>
						<span v-if="scope.row.reasonType == 5">商家召回</span>
						<span v-if="scope.row.reasonType == 6">发错商品</span>
						<span v-if="scope.row.reasonType == 7">其它理由类型</span>
					</template>
				</el-table-column>

				<el-table-column prop="applyReason" label="申请理由" align="center"></el-table-column>
				<el-table-column prop="refuseReason" label="拒绝理由" align="center"></el-table-column>

				<el-table-column label="操作" align="center" width="180">
					<template slot-scope="scope">
						<el-button v-if="scope.row.applyStatus == 1" type="success" size="mini" @click="consent(scope.$index, scope.row)">同意</el-button>
						<el-button v-if="scope.row.applyStatus == 1" type="danger" size="mini" @click="refuse(scope.$index, scope.row)">拒绝</el-button>
						<el-button v-if="scope.row.applyStatus == 4" type="danger" size="mini" @click="shipments(scope.$index, scope.row)">发货</el-button>
						<el-button v-if="scope.row.applyStatus == 2 || scope.row.applyStatus == 3" type="success" size="mini" @click="receipt(scope.$index, scope.row)">收货</el-button>
						<el-button v-if="scope.row.applyStatus == 6" type="success" size="mini" @click="refund(scope.$index, scope.row)">退款</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<el-dialog :close-on-click-modal="false" title="订单发货" :visible.sync="shipmentsb" width="35%">
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
							<el-select v-model="shipmentsInfo.freightTypeStr" @change="freightTypeCil" placeholder="请选择运费支付方式(不选择默认是线上支付)" style="width: 100%;">
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
		listShopReturnedPurchaseRefund,
		addShopReturnedPurchaseDetailed,
		updShopReturnedPurchaseRefund,
		deliverGoods
	} from '../../../api/index';
	import {
		mapState
	} from 'vuex'
	import {
		dateFormat
	} from '../../../utils/utils';
	export default {
		name: 'Inventory_change',
		computed: {
			...mapState(['imgUrl','accountId']), //显示state的数据
		},
		data() {
			return {
				orderId: '',
				applyId: '',
				refundStatusStr: '',
				refundStatus: 0,
				applyTypeStr: '',
				applyType: 0,
				reasonTypeStr: '',
				reasonType: 0,
				page: 1,
				pageTotal: 0,

				tableData: [],
				value1: [],
				shipmentsb:false,
				shipmentsInfo: {
					receiveName:'',
					receivePhone:'',
					receiveAddress:'',
					logisticsCompany:'',
					sendName:'',
					sendPhone:'',
					sendAddress:'',
					logisticsId:'',
					freightType:2,
					freightTypeStr:'',
				},
				form:'',
			};
		},
		created() {
			this.getData();
		},
		methods: {
			refreshData(){
			   //刷新列表
			   this.orderId = '';
			   this.applyId = '';
			   this.refundStatusStr = '';
			   this.refundStatus = 0;
			   this.applyTypeStr = '';
			   this.applyType = 0;
			   this.reasonTypeStr = '';
			   this.reasonType = 0;
			   this.value1 = [];
			   this.page = 1;
			   this.pageTotal = 0;
			   this.getData();
			},
			deliver(){
				if(this.shipmentsInfo.logisticsCompany == ''){
					this.$message.error('物流公司名称不能为空');
					return;
				}
				if(this.shipmentsInfo.receiveAddress == ''){
					this.$message.error('收货地址不能为空');
					return;
				}
				if(this.shipmentsInfo.receiveName == ''){
					this.$message.error('收货人姓名不能为空');
					return;
				}
				if(this.shipmentsInfo.receivePhone == ''){
					this.$message.error('收货人电话不能为空');
					return;
				}
				if(this.shipmentsInfo.sendAddress == ''){
					this.$message.error('发货地址不能为空');
					return;
				}
				if(this.shipmentsInfo.sendName == ''){
					this.$message.error('发货人姓名不能为空');
					return;
				}
				if(this.shipmentsInfo.sendPhone == ''){
					this.$message.error('发货人电话不能为空');
					return;
				}
				if(this.shipmentsInfo.logisticsId == ''){
					this.$message.error('物流单号不能为空');
					return;
				}
				var query = {
					data: {
						orderId: this.form.orderId,
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
						this.shipmentsb = false;
						this.shipmentsInfo = {
							receiveName:'',
							receivePhone:'',
							receiveAddress:'',
							logisticsCompany:'',
							sendName:'',
							sendPhone:'',
							sendAddress:'',
							logisticsId:'',
							freightType:2,
							freightTypeStr:'',
						};
						var query = {
							data: {
								id: this.form.id,
								orderId: this.form.orderId,
								refundMoney: this.form.refundMoney,
								applyStatus: 5,
								applyType: this.form.applyType,
								applyImg: this.form.applyImg,
								reasonType: this.form.reasonType,
								applyReason: this.form.applyReason,
								refuseReason: this.form.refuseReason,
							}
						};
						updShopReturnedPurchaseRefund(query).then(res => {
							if (res.code == 1) {
								this.getData();
							}
						});
						// this.getData();
					}
				});
			},
			refundStatusCil(data){
				this.refundStatus = data;
			},
			applyTypeCil(data){
				this.applyType = data;
			},
			reasonTypeCil(data){
				this.reasonType = data;
			},
			freightTypeCil(data){
				this.shipmentsInfo.freightType = data;
			},
			getData() {
				if (this.value1 != '') {
					var arr = [];
					this.value1.map((item, index) => {
						arr.push(dateFormat("YYYY-mm-dd HH:MM:SS", item))
					})
					var startTime = arr[0];
					var endTime = arr[1];
				} else {
					var startTime = '';
					var endTime = '';
				}
				if (this.orderId == '') {
					var orderId = 0;
				} else {
					var orderId = this.orderId;
				}
				if (this.applyId == '') {
					var applyId = 0;
				} else {
					var applyId = this.applyId;
				}
				var query = {
					data: {
						accountId: localStorage.getItem('account_id'),
						orderId: orderId,
						applyId: applyId,
						refundStatus: this.refundStatus,
						startTime: startTime,
						endTime: endTime,
						applyType: this.applyType,
						reasonType: this.reasonType,
						nowPage: this.page,
						pageCount: 9,
					}
				};
				listShopReturnedPurchaseRefund(query).then(res => {
					if (res.code == 1) {
						// this.$message.success('加载成功');
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
			//同意
			consent(index, row) {
				var item = row;
				this.$confirm('是否同意用户申请退款？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var aS = 0;
						
						if(item.applyType == 1){
							aS = 6;
						}
						if(item.applyType != 1){
							aS = 3;
						}
						var query = {
							data: {
								id: item.id,
								orderId: item.orderId,
								refundMoney: item.refundMoney,
								applyStatus: aS,
								applyType: item.applyType,
								applyImg: item.applyImg,
								reasonType: item.reasonType,
								applyReason: item.applyReason,
								refuseReason: item.refuseReason,
							}
						};
						updShopReturnedPurchaseRefund(query).then(res => {
							// console.log(res)
							if (res.code == 1) {
								this.$message.success('已同意');
								this.getData();
							}
						});
					})
					.catch(() => {});
			},
			//拒绝
			refuse(index, row) {
				var item = row;
				this.$prompt('请输入拒绝理由', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({
					value
				}) => {
					var query = {
						data: {
							id: item.id,
							orderId: item.orderId,
							refundMoney: item.refundMoney,
							applyStatus: 7,
							applyType: item.applyType,
							applyImg: item.applyImg,
							reasonType: item.reasonType,
							applyReason: item.applyReason,
							refuseReason: value,
						}
					};
					updShopReturnedPurchaseRefund(query).then(res => {
						if (res.code == 1) {
							this.$message.success('已拒绝用户申请退款');
							this.addShopReturnedList(item, 2)
							this.getData();
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});

			},
			//发货
			shipments(index, row) {
				this.form = row;
				this.shipmentsb = true;
			},
			//收货
			receipt(index, row) {
				var item = row;
				this.$confirm('是否收到寄回的商品？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var aS = 0;
						if(item.applyType == 2){
							aS = 8;
						}
						if(item.applyType == 3){
							aS = 4;
						}
						if(item.applyType == 4){
							aS = 6;
						}
						var query = {
							data: {
								id: item.id,
								orderId: item.orderId,
								refundMoney: item.refundMoney,
								applyStatus: aS,
								applyType: item.applyType,
								applyImg: item.applyImg,
								reasonType: item.reasonType,
								applyReason: item.applyReason,
								refuseReason: item.refuseReason,
							}
						};
						updShopReturnedPurchaseRefund(query).then(res => {
							if (res.code == 1) {
								this.$message.success('确认收货成功');
								this.getData();
							}
						});
					})
					.catch(() => {});
			},
			//退款
			refund(index, row) {
				var item = row;
				this.$confirm('是否同意退款？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var query = {
							data: {
								id: item.id,
								orderId: item.orderId,
								refundMoney: item.refundMoney,
								applyStatus: 8,
								applyType: item.applyType,
								applyImg: item.applyImg,
								reasonType: item.reasonType,
								applyReason: item.applyReason,
							}
						};
						updShopReturnedPurchaseRefund(query).then(res => {
							if (res.code == 1) {
								this.$message.success('退款成功');
								this.addShopReturnedList(item, 1)
								this.getData();
							}
						});
					})
					.catch(() => {});
			},
			addShopReturnedList(item, type) {
				var query = {
					data: {
						applyId: item.applyId,
						orderId: item.orderId,
						refundMoney: item.refundMoney,
						refundStatus: type,
						refundType: item.applyType,
						reasonType: item.reasonType,
						applyReason: item.applyReason
					}
				};
				addShopReturnedPurchaseDetailed(query).then(res => {
					if (res.code == 1) {
						// this.$message.success('成功');
					}
				});
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
