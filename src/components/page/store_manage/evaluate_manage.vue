<!-- evaluate_manage  评论管理 -->
<!-- comment_list 评论列表 -->
<template>
	<div>
		
		<div class="container">
			<div class="handle-box">
				<el-button type="success" @click="refreshData">刷新列表</el-button>
			</div>
			<el-table height="600" :data="tableData.data" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="userId" label="用户ID" align="center" width="200"></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" align="center" width="200"></el-table-column>
				<el-table-column prop="commentTime" label="评论时间" align="center" width="150"></el-table-column>
				<el-table-column label="评论图片" align="center">
					<template slot-scope="scope">
						<!-- <el-image class="table-td-thumb" :src="imgUrl+scope.row.image" :preview-src-list="[scope.row.thumb]"></el-image> -->
						<el-image class="table-td-thumb" :src="imgUrl+scope.row.images"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="starRating" label="评分" align="center" width="100"></el-table-column>
				<el-table-column prop="content" label="评论内容" align="center"></el-table-column>
				<!-- <el-table-column label="操作" align="center" width="150">
					<template slot-scope="scope">
						<el-button type="danger" size="mini" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10"
				 @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<el-dialog :close-on-click-modal="false" title="添加项目" :visible.sync="dialogVisible" width="30%" append-to-body>
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
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">发 送</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		insertShopWaresCommenreply,
		listStoreComment
	} from '../../../api/index';
	import { mapState } from 'vuex'
	import { dateFormat } from '../../../utils/utils.js'
	export default {
		name: 'Inventory_change',
		computed:{
		     ...mapState(['accountId','imgUrl']),  //显示state的数据
		    },
		data() {
			return {
				page: 1,
				pageTotal: 0,
				radio: '1',
				dialogVisible: false,
				dialogImageUrl:'',
				tableData: [],
				multipleSelection: [],
				delList: [],
				content:'',
				replyTxt:'', 
			};
		},
		created() {
			this.getData();
		},
		methods: {
			refreshData(){
			   //刷新列表
			   this.page = 1;
			   this.pageTotal = 0;
			   this.getData();
			  },
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
						commentReplyUserId: this.accountId,
						replyContent: this.replyTxt,
						replyImg: '',
					}
				};
				insertShopWaresCommenreply(query).then(res => {
					if (res.code == 1) {
						this.$message.success('回复成功');
						this.dialogVisible = false;
						this.replyTxt = '';
						this.getData();
					}
				});
			},
			//评分选择
			starRatingSelect(data){
				this.form.starRating = data;
			},
			//是否回复选择
			replySelect(data){
				this.form.reply = data;
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				var query = {
					data: {
						accountId: this.accountId,
						nowPage: this.page,
						pageCount: 6,
					}
				};
				listStoreComment(query).then(res => {
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
			handleEdit(index, row) {
				this.content = row;
				this.dialogVisible = true;
			},
			// 触发搜索按钮
			handleSearch() {
				this.getData();
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
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
	.evaluate_reply .title{
		font-size: 15px;
		font-weight: 600;
		padding: 10px 0;
	}
	.evaluate_reply .txt{
		padding-bottom: 20px;
	}
</style>

