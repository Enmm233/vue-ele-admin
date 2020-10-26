<!-- comment_list 评论列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" :model="form" class="flex flex_wrap" label-width="80px">
					<el-form-item label="商品">
						<el-input v-model="form.waresName" placeholder="输入商品名称" class="handle-input"></el-input>
					</el-form-item>
					<el-form-item label="产品">
						<el-input v-model="form.productName" placeholder="输入产品名称" class="handle-input"></el-input>
					</el-form-item>
					<el-form-item label="评分">
						<div class="flex flex_wrap">
							<el-select v-model="form.starRatingStr" @change="starRatingSelect" placeholder="默认" class="handle-select">
								<el-option key="0" label="全部" value="0"></el-option>
								<el-option key="1" label="1" value="1"></el-option>
								<el-option key="2" label="2" value="2"></el-option>
								<el-option key="3" label="3" value="3"></el-option>
								<el-option key="4" label="4" value="4"></el-option>
								<el-option key="5" label="5" value="5"></el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="回复状态">
						<div class="flex flex_wrap">
							<el-select v-model="form.replyStr" @change="replySelect"  placeholder="默认" class="handle-select">
								<el-option key="0" label="全部" value="0"></el-option>
								<el-option key="1" label="已回复" value="1"></el-option>
								<el-option key="2" label="未回复" value="2"></el-option>
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
				<div>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</div>
			</div>
			<div class="handle-box">
			    <el-button type="success" @click="refreshData">刷新列表</el-button>
			</div>
			<el-table height="600" :data="tableData.data" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column prop="waresId" label="商品ID" width="100" align="center"></el-table-column>
				<el-table-column prop="waresName" label="商品名称" width="300"></el-table-column>
				<el-table-column prop="serviceName" label="商品规格" align="center" width="200"></el-table-column>
				<el-table-column prop="userId" label="用户ID" align="center" width="200"></el-table-column>
				<el-table-column prop="id" label="用户昵称" align="center" width="200"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" width="150"></el-table-column>
				<el-table-column label="商品图片" align="center">
					<template slot-scope="scope">
						<!-- <el-image class="table-td-thumb" :src="imgUrl+scope.row.image" :preview-src-list="[scope.row.thumb]"></el-image> -->
						<el-image class="table-td-thumb" :src="imgUrl+scope.row.image"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="starRating" label="评分" align="center" width="100"></el-table-column>
				<el-table-column prop="content" label="评论内容" align="center" width="150"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="danger" size="mini" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
					</template>
				</el-table-column>
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
		listShopWaresComment,
		insertShopWaresCommenreply
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
				
				form: {
					waresName:'',
					productName:'',
					starRating:0,
					starRatingStr:'',
					reply:0,
					replyStr:'',
					startTime:'',
					endTime:'',
				},
				content:'',
				replyTxt:'', 
				idx: -1,
				id: -1,
				value1: [],
			};
		},
		created() {
			this.getData();
		},
		methods: {
			refreshData(){
			   //刷新列表
			   this.form.waresName = '';
			   this.form.productName = '';
			   this.form.starRating = 0;
			   this.form.starRatingStr = '';
			   this.form.reply = 0;
			   this.form.replyStr = '';
			   this.form.startTime = '';
			   this.form.endTime = '';
			   this.value1 = [];
			   this.page = 1;
			   this.pageTotal = 0;
			   this.getData();
			},
			//回复评论
			saveEdit(){
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
					// console.log(res)
					if (res.code == 1) {
						this.$message.success('回复成功');
						this.dialogVisible = false;
						this.replyTxt = '';
						// this.tableData.data.splice(index, 1);
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
				if(this.value1 != ''){
					var arr = [];
					this.value1.map((item, index) => {
						arr.push(dateFormat("YYYY-mm-dd HH:MM:SS", item))
					})
					var startTime = arr[0]
					var endTime = arr[1]
				}else{
					var startTime = '';
					var endTime = '';
				};
				
				var query = {
					data: {
						accountId: this.accountId,
						waresName: this.form.waresName,
						productName: this.form.productName,
						starRating: this.form.starRating,
						reply:this.form.reply,
						startTime:startTime,
						endTime:endTime,
						
						nowPage: this.page,
						pageCount: 6,
					}
				};
				listShopWaresComment(query).then(res => {
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
		width: 120px !important;
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

