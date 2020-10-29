<!-- refund_list 退款记录列表 -->
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
				<el-table-column prop="applyId" label="申请ID" width="100" align="center"></el-table-column>
				<el-table-column prop="orderId" label="订单ID" width="100" align="center"></el-table-column>
				<el-table-column prop="waresId" label="商品ID" width="100" align="center"></el-table-column>
				<el-table-column prop="refundTime" label="退款时间" width="300"></el-table-column>
				<el-table-column label="退款金额" width="100">
					<template slot-scope="scope">￥{{scope.row.refundMoney}}</template>
				</el-table-column>
				<el-table-column label="退款状态" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.refundStatus == 1">成功</span>
						<span v-if="scope.row.refundStatus == 2">失败</span>
					</template>
				</el-table-column>
				<el-table-column label="退款类型" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.refundType == 1">退款</span>
						<span v-if="scope.row.refundType == 2">退货</span>
						<span v-if="scope.row.refundType == 3">换货</span>
						<span v-if="scope.row.refundType == 4">退货退款</span>
					</template>
				</el-table-column>
				<el-table-column label="理由类型" width="100" align="center">
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
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next"
				 :page-count="pageTotal" :page-size="10" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		listShopReturnedPurchaseDetailed
	} from '../../../api/index';
	import { mapState } from 'vuex'
	import {
		dateFormat
	} from '../../../utils/utils';
	export default {
		name: 'Inventory_change',
		computed:{
		     ...mapState(['accountId']),  //显示state的数据
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
				value1: [],
				page:1,
				pageTotal: 0,
				
				dialogVisible: false,
				dialogImageUrl:'',
				tableData: [],
				multipleSelection: [],
				delList: [],
				
				idx: -1,
				id: -1,
				
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
			refundStatusCil(data){
				this.refundStatus = data;
			},
			applyTypeCil(data){
				this.applyType = data;
			},
			reasonTypeCil(data){
				this.reasonType = data;
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
				listShopReturnedPurchaseDetailed(query).then(res => {
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

