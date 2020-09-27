<!-- comment_list 评论列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" :model="form" class="flex flex-wrap" label-width="80px">
					<el-form-item label="商品">
						<el-input v-model="form.name" placeholder="输入商品名称" class="handle-input"></el-input>
					</el-form-item>
					<el-form-item label="用户">
						<el-input v-model="form.name" placeholder="输入用户名称" class="handle-input"></el-input>
					</el-form-item>
					<el-form-item label="评分">
						<div class="flex flex-wrap">
							<el-select v-model="form.one" placeholder="默认" class="handle-select">
								<el-option key="bbk" label="步步高" value="bbk"></el-option>
								<el-option key="xtc" label="小天才" value="xtc"></el-option>
								<el-option key="imoo" label="imoo" value="imoo"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="回复状态">
						<div class="flex flex-wrap">
							<el-select v-model="form.one" placeholder="默认" class="handle-select">
								<el-option key="bbk" label="步步高" value="bbk"></el-option>
								<el-option key="xtc" label="小天才" value="xtc"></el-option>
								<el-option key="imoo" label="imoo" value="imoo"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="评论时间">
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
				</el-form>
				<block>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</block>
			</div>
			<el-table height="600" :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="id" label="商品ID" width="100" align="center"></el-table-column>
				<el-table-column prop="name" label="商品名称" width="300"></el-table-column>
				<el-table-column prop="id" label="商品规格" align="center" width="200"></el-table-column>
				<el-table-column prop="id" label="用户ID" align="center" width="200"></el-table-column>
				<el-table-column prop="id" label="用户昵称" align="center" width="200"></el-table-column>
				<el-table-column prop="date" label="创建时间" align="center" width="150"></el-table-column>
				<el-table-column label="商品图片" align="center">
					<template slot-scope="scope">
						<el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="id" label="评分" align="center" width="100"></el-table-column>
				<el-table-column prop="id" label="评论内容" align="center" width="150"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">回复</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize"
				 :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<el-dialog title="添加项目" :visible.sync="dialogVisible" width="30%">
			<div>
				<div class="handle-box">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="项目名称">
							<el-input v-model="form.name" placeholder="输入项目名称"></el-input>
						</el-form-item>
						<el-form-item label="项目类型">
							<div>
								<el-select v-model="form.one" placeholder="默认" class="handle-select mr10">
									<el-option key="bbk" label="步步高" value="bbk"></el-option>
									<el-option key="xtc" label="小天才" value="xtc"></el-option>
									<el-option key="imoo" label="imoo" value="imoo"></el-option>
								</el-select>
								<el-select v-model="form.one" placeholder="默认" class="handle-select mr10">
									<el-option key="bbk" label="步步高" value="bbk"></el-option>
									<el-option key="xtc" label="小天才" value="xtc"></el-option>
									<el-option key="imoo" label="imoo" value="imoo"></el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item label="项目费用">
							<el-input v-model="form.name" placeholder="输入项目费用"></el-input>
						</el-form-item>
						<el-form-item label="费用类型">
							<div>
								<el-select v-model="form.one" placeholder="默认">
									<el-option key="bbk" label="步步高" value="bbk"></el-option>
									<el-option key="xtc" label="小天才" value="xtc"></el-option>
									<el-option key="imoo" label="imoo" value="imoo"></el-option>
								</el-select>
							</div>
							<div style="color: #7B7979; font-size: 14px;">
								<i class="el-icon-lx-info"></i>
								<span>订单总金额上增加或减少金额</span>
							</div>
						</el-form-item>
						<el-form-item label="关联数量">
							<div>
								<el-radio v-model="radio" label="1">是</el-radio>
								<el-radio v-model="radio" label="2">否</el-radio>
							 </div>
							 <div style="color: #7B7979; font-size: 14px;">
							 	<i class="el-icon-lx-info"></i>
							 	<span>附加费用=项目费用X购买商品数量</span>
							 </div>
						</el-form-item>
						<el-form-item label="展示类型">
							<div>
								<el-select v-model="form.one" placeholder="默认">
									<el-option key="bbk" label="步步高" value="bbk"></el-option>
									<el-option key="xtc" label="小天才" value="xtc"></el-option>
									<el-option key="imoo" label="imoo" value="imoo"></el-option>
								</el-select>
							</div>
							<div style="color: #7B7979; font-size: 14px;">
								<i class="el-icon-lx-info"></i>
								<span>APP购物选择规格时项目费用显示方式</span>
							</div>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">发 送</el-button>
			</span>
		</el-dialog>

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
				radio: '1',
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
		width: 200px;
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

