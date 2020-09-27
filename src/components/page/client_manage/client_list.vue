<!-- client_list 顾客列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" :model="form" class="flex flex-wrap">
					<el-form-item label="顾客" label-width="50px">
						<el-input v-model="form.name" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="手机号" label-width="80px">
						<el-input v-model="form.name" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="订单数大于" label-width="100px">
						<el-input v-model="form.name" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="消费总金额大于" label-width="120px">
						<el-input v-model="form.name" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="售后数大于" label-width="100px">
						<el-input v-model="form.name" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
				</el-form>
				<block>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</block>
			</div>
			
			<el-table height="600" :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="id" label="顾客ID" width="100" align="center"></el-table-column>
				<el-table-column prop="id" label="昵称" width="100" align="center"></el-table-column>
				<el-table-column prop="id" label="姓名" width="100" align="center"></el-table-column>
				<el-table-column prop="id" label="头像" width="100" align="center"></el-table-column>
				<el-table-column prop="id" label="电话" width="100" align="center"></el-table-column>
				<el-table-column prop="name" label="地址" width="300"></el-table-column>
				<el-table-column prop="id" label="订单数" align="center" width="100"></el-table-column>
				<el-table-column prop="date" label="订购商品数" align="center" width="100"></el-table-column>
				<el-table-column label="消费总金额" width="100">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column prop="id" label="售后次数" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">发送消息</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize"
				 :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		fetchData
	} from '../../../api/index';
	export default {
		name: 'Inventory_change',
		data() {
			return {
				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10
				},
				dialogVisible: false,
				dialogImageUrl:'',
				tableData: [],
				multipleSelection: [],
				delList: [],
				pageTotal: 0,
				form: {},
				idx: -1,
				id: -1,
				value1: [],
			};
		},
		created() {
			this.getData();
		},
		methods: {
			// 获取 easy-mock 的模拟数据
			getData() {
				fetchData(this.query).then(res => {
					console.log(res);
					this.tableData = res.list;
					this.pageTotal = res.pageTotal || 50;
				});
			},
			handleEdit(index, row) {
				this.dialogVisible = true;
			},
			// 触发搜索按钮
			handleSearch() {
				this.$set(this.query, 'pageIndex', 1);
				this.getData();
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						this.$message.success('删除成功');
						this.tableData.splice(index, 1);
					})
					.catch(() => {});
			},

			// 分页导航
			handlePageChange(val) {
				this.$set(this.query, 'pageIndex', val);
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

