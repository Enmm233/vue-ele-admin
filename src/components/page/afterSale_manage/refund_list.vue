<!-- refund_list 退款记录列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" :model="form" class="flex flex-wrap" label-width="80px">
					<el-form-item label="订单ID">
						<el-input v-model="form.name" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="申请ID">
						<el-input v-model="form.name" placeholder="输入订单ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="退款状态">
						<div class="flex flex-wrap">
							<el-select v-model="form.one" placeholder="默认" class="handle-select mr10">
								<el-option key="bbk" label="步步高" value="bbk"></el-option>
								<el-option key="xtc" label="小天才" value="xtc"></el-option>
								<el-option key="imoo" label="imoo" value="imoo"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="申请时间">
						<div class="block mr10">
						    <el-date-picker
						      v-model="value1"
						      type="datetimerange"
						      range-separator="至"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期">
						    </el-date-picker>
						  </div>
					</el-form-item>
					
					<el-form-item label="申请类型">
						<div class="flex flex-wrap">
							<el-select v-model="form.one" placeholder="默认" class="handle-select mr10">
								<el-option key="bbk" label="步步高" value="bbk"></el-option>
								<el-option key="xtc" label="小天才" value="xtc"></el-option>
								<el-option key="imoo" label="imoo" value="imoo"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="理由类型">
						<div class="flex flex-wrap">
							<el-select v-model="form.one" placeholder="默认" class="handle-select mr10">
								<el-option key="bbk" label="步步高" value="bbk"></el-option>
								<el-option key="xtc" label="小天才" value="xtc"></el-option>
								<el-option key="imoo" label="imoo" value="imoo"></el-option>
							</el-select>
						</div>
					</el-form-item>
				</el-form>
				<block>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</block>
			</div>
			
			<el-table height="600" :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="id" label="申请ID" width="100" align="center"></el-table-column>
				<el-table-column prop="id" label="订单ID" width="100" align="center"></el-table-column>
				<el-table-column prop="id" label="商品ID" width="100" align="center"></el-table-column>
				<el-table-column prop="name" label="退款时间" width="300"></el-table-column>
				<el-table-column label="退款金额" width="100">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column prop="id" label="退款状态" align="center" width="100"></el-table-column>
				<el-table-column prop="date" label="退款类型" align="center" width="100"></el-table-column>
				<el-table-column prop="date" label="理由类型" align="center" width="100"></el-table-column>
				<el-table-column prop="id" label="申请理由" align="center"></el-table-column>
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

