<template>
	<div>
		<div class="">
			<el-table height="700" :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="id" label="用户ID" width="80" align="center"></el-table-column>
				<el-table-column width="120" prop="name" label="用户昵称"></el-table-column>
				<el-table-column width="120" label="评论时间">
					<template slot-scope="scope">{{scope.row.date}}</template>
				</el-table-column>
				<el-table-column width="80" label="评论图片" align="center">
					<template slot-scope="scope">
						<el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]"></el-image>
					</template>
				</el-table-column>
				<el-table-column width="55" prop="id" label="评分" align="center"></el-table-column>

				<el-table-column prop="date" label="评论内容"></el-table-column>
				<el-table-column label="操作" width="100" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize"
				 :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="innerVisible" width="20%" append-to-body>
			<div class="evaluate_reply">
				<div>
					<p class="title">用户评论内容：</p>
					<p class="txt">超喜欢这种少骨鲤鱼了，鲜嫩无比，煲的鱼汤乳白浓稠鲜美无比下次我们介绍更多的朋友来买。好东西要多宣传。</p>
				</div>
				<div>
					<p class="title">回复用户内容：</p>
					<div class="txt">
						<el-input
						  type="textarea"
						  :autosize="{ minRows: 4, maxRows: 10}"
						  placeholder="请输入内容"
						  v-model="textarea1">
						</el-input>
					</div>
				</div>
			</div>
			
			<span slot="footer" class="dialog-footer">
				<el-button @click="innerVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">发 送</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import { fetchData } from '../../../api/index.js';
	export default {
		name: 'evaluateList',
		data() {
			return {
				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10
				},
				tableData: [],
				multipleSelection: [],
				delList: [],
				innerVisible: false,
				pageTotal: 0,
				form: {},
				idx: -1,
				id: -1,
				textarea1:''
			}
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
			// 编辑操作
			handleEdit(index, row) {
				this.idx = index;
				this.form = row;
				this.innerVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.innerVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				this.$set(this.tableData, this.idx, this.form);
			},
			// 分页导航
			handlePageChange(val) {
				this.$set(this.query, 'pageIndex', val);
				this.getData();
			}
		},

	};
</script>

<style>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 300px;
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
	.evaluate_reply .title{
		font-size: 15px;
		font-weight: 600;
		padding: 10px 0;
	}
	.evaluate_reply .txt{
		padding-bottom: 20px;
	}
</style>
