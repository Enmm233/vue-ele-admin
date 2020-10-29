<template>
	<div>
		<div class="">
			<el-table height="480" :data="tableData.data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="userId" label="用户ID" width="80" align="center"></el-table-column>
				<el-table-column width="120" prop="nickName" label="用户昵称"></el-table-column>
				<el-table-column width="120" label="评论时间">
					<template slot-scope="scope">{{scope.row.createTime}}</template>
				</el-table-column>
				<el-table-column width="80" label="评论图片" align="center">
					<template slot-scope="scope">
						<el-image class="table-td-thumb" :src="scope.row.image" :preview-src-list="[scope.row.image]"></el-image>
					</template>
				</el-table-column>
				<el-table-column width="55" prop="starRating" label="评分" align="center"></el-table-column>

				<el-table-column prop="content" label="评论内容"></el-table-column>
				<el-table-column label="操作" width="100" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10"
				 @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="innerVisible" width="20%" append-to-body>
			<div class="evaluate_reply">
				<div>
					<p class="title">用户评论内容：</p>
					<p class="txt">{{content.content}}</p>
				</div>
				<div>
					<p class="title">回复用户内容：</p>
					<div class="txt">
						<el-input
						  type="textarea"
						  :autosize="{ minRows: 4, maxRows: 10}"
						  placeholder="请输入内容"
						  v-model="replyTxt">
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
	import { listWaresCommentByWaresId,insertShopWaresCommenreply } from '../../../api/index.js';
	import { mapState } from 'vuex'
	export default {
		name: 'evaluateList',
		props:["id"],
		computed:{
		     ...mapState(['accountId']),  //显示state的数据
		    },
		data() {
			return {
				content:'',
				page: 1,
				pageTotal: 0,
				tableData: [],
				multipleSelection: [],
				delList: [],
				innerVisible: false,
				pageTotal: 0,
				form: {},
				idx: -1,
				id: -1,
				replyTxt:''
			}
		},
		created() {
			this.getData(this.id);
		},
		methods: {
			//回复评论
			saveEdit(){
				if(this.replyTxt == ""){
					this.$message.error('请输入回复内容');
					return
				}
				var query = {
					data: {
						commentId: this.content.id,
						commentUserId: this.content.userId,
						commentReplyUserId: localStorage.getItem('account_id'),
						replyContent: this.replyTxt,
						replyImg: '',
					}
				};
				insertShopWaresCommenreply(query).then(res => {
					// console.log(res)
					if (res.code == 1) {
						this.$message.success('回复成功');
						this.innerVisible = false;
						this.replyTxt = '';
						this.getData(this.id);
					}
				});
			},
			getData(id) {
				var query = {
					data: {
						waresId: id,
						nowPage: this.page,
						pageCount: 6,
					}
				};
				listWaresCommentByWaresId(query).then(res => {
					if (res.code == 1) {
						// this.$message.success('加载成功');
						this.tableData = res;
						this.pageTotal = res.allPage;
					}else if(res.code == 2){
						if(res.data.length > 0){
							this.tableData = res;
							this.pageTotal = res.allPage;
						}else{
							this.tableData = [];
							this.pageTotal = 0;
						}
					}
				});
			},
			// 分页导航
			handlePageChange(val) {
				this.page = val;
				this.getData();
			},
			// 编辑操作(回复)
			handleEdit(index, row) {
				this.content = row;
				this.innerVisible = true;
			},
			// 保存编辑
			// saveEdit() {
			// 	this.innerVisible = false;
			// 	this.$message.success(`修改第 ${this.idx + 1} 行成功`);
			// 	this.$set(this.tableData, this.idx, this.form);
			// },
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
