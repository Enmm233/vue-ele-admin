<!-- client_list 顾客列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" class="flex flex_wrap">
					<el-form-item label="顾客" label-width="50px">
						<el-input v-model="orderId" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="手机号" label-width="80px">
						<el-input v-model="loginId" placeholder="输入手机号" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="订单数大于" label-width="100px">
						<el-input v-model="totalAmount" placeholder="输入订单数" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="消费总金额大于" label-width="120px">
						<el-input v-model="orderCount" placeholder="输入消费总金额" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="售后数大于" label-width="100px">
						<el-input v-model="refundCount" placeholder="输入售后数" class="handle-input mr10"></el-input>
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
				<el-table-column prop="accountId" label="顾客ID" width="100" align="center"></el-table-column>
				<el-table-column prop="nickName" label="昵称" width="100" align="center"></el-table-column>
				<el-table-column prop="userName" label="姓名" width="100" align="center"></el-table-column>
				<el-table-column label="头像" align="center" width="80">
					<template slot-scope="scope">
						<el-image class="table-td-thumb" :src="imgUrl+scope.row.avatar" :preview-src-list="[imgUrl+scope.row.avatar]"></el-image>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="id" label="头像" width="100" align="center"></el-table-column> -->
				<el-table-column prop="loginId" label="电话" width="100" align="center"></el-table-column>
				<el-table-column prop="homeAddress" label="地址"></el-table-column>
				<el-table-column prop="orderCount" label="订单数" align="center" width="100"></el-table-column>
				<el-table-column prop="waresNum" label="订购商品数" align="center" width="100"></el-table-column>
				<el-table-column label="消费总金额" width="100">
					<template slot-scope="scope">￥{{scope.row.totalAmount}}</template>
				</el-table-column>
				<el-table-column prop="refundCount" label="售后次数" align="center"></el-table-column>
			<!-- 	<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">发送消息</el-button>
					</template>
				</el-table-column> -->
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
		listUserList,
		uploadLocation
	} from '../../../api/index';
	import { mapState } from 'vuex'
	export default {
		name: 'Inventory_change',
		computed:{
		     ...mapState(['imgUrl','accountId']),  //显示state的数据
		    },
		data() {
			return {
				orderId:'',
				loginId:'',
				totalAmount:'',
				orderCount:'',
				refundCount:'',
				tableData: [],
				page:1,
				pageTotal: 0,
			};
		},
		created() {
			this.getData();
			// this.getDataa();
		},
		methods: {
			refreshData(){
			   //刷新列表
			   this.orderId = '';
			   this.loginId = '';
			   this.totalAmount = '';
			   this.orderCount = '';
			   this.refundCount = '';
			   this.page = 1;
			   this.pageTotal = 0;
			   this.getData();
			  },
			// 获取 easy-mock 的模拟数据
			getData() {
				if (this.orderId == '') {
					var orderId = 0;
				} else {
					var orderId = this.orderId;
				}
				if (this.totalAmount == '') {
					var totalAmount = -1;
				} else {
					var totalAmount = this.totalAmount;
				}
				if (this.orderCount == '') {
					var orderCount = -1;
				} else {
					var orderCount = this.orderCount;
				}
				if (this.refundCount == '') {
					var refundCount = -1;
				} else {
					var refundCount = this.refundCount;
				}
				
				var query = {
					data: {
						accountId: localStorage.getItem('account_id'),
						orderId: orderId,
						loginId: this.loginId,
						totalAmount: totalAmount,
						orderCount: orderCount,
						refundCount: refundCount,
						nowPage: this.page,
						pageCount: 9,
					}
				};
				listUserList(query).then(res => {
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
			// handleEdit(index, row) {
			// 	this.dialogVisible = true;
			// },
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

