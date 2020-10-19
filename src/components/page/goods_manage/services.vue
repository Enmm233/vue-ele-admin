<!-- services  服务列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" class="flex flex_wrap" label-width="80px">
					<el-form-item label="服务名称">
						<el-input v-model="serviceName" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="服务分类">
						<div class="flex flex_wrap">
							<el-select v-model="classifyOneName" placeholder="请选择" @change="selectOne" class="handle-select mr10">
								<el-option v-for="(item,index) in classifyOne" :key="item.id" :label="item.name" :value="index">
								</el-option>
							</el-select>
							<el-select v-model="classifyTwoName" placeholder="请选择" @change="selectTwo" class="handle-select mr10">
								<el-option v-for="(item,index) in classifyTwo" :key="item.id" :label="item.name" :value="index">
								</el-option>
							</el-select>
							<el-select v-model="classifyThreeName" placeholder="请选择" @change="selectThree" class="handle-select mr10">
								<el-option v-for="(item,index) in classifyThree" :key="item.id" :label="item.name" :value="index">
								</el-option>
							</el-select>
						</div>

					</el-form-item>
					<el-form-item label="品牌" label-width="50px">
						<el-input v-model="brandName" class="pick-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="产地" label-width="50px">
						<el-input v-model="address" class="pick-input mr10"></el-input>
					</el-form-item>
				</el-form>
				<div>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</div>
			</div>
			<div class="handle-box">
				<el-button type="primary" @click="open">添加</el-button>
				<!-- <el-button type="info" @click="toPage">删除</el-button> -->
			</div>

			<el-table height="555" :data="tableData.data" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="服务ID" width="100" align="center"></el-table-column>
				<el-table-column prop="name" label="服务名称" width="200"></el-table-column>
				<el-table-column label="创建账号" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.createAccountId}}</template>
				</el-table-column>
				<el-table-column label="创建时间" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.createTime}}</template>
				</el-table-column>
				<el-table-column label="服务类别" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.categoryName}}</template>
				</el-table-column>
				<el-table-column label="服务图片" width="120" align="center">
					<template slot-scope="scope">
						<el-image class="table-td-thumb" :src="imgUrl+scope.row.serviceFirstImg" :preview-src-list="[imgUrl+scope.row.serviceFirstImg]"></el-image>
					</template>
				</el-table-column>
				<el-table-column label="品牌名称" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.brandName}}</template>
				</el-table-column>
				<el-table-column label="收费单位" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.unit}}</template>
				</el-table-column>
				<el-table-column label="服务地址" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.address}}</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="editVisible" width="30%">
		<!-- 	<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form> -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加弹出框 -->
		<el-dialog :close-on-click-modal="false" title="添加服务" :visible.sync="addProduct" width="80%">
			<div>
				<add-services></add-services>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		listShopService,
		delShopService
	} from '../../../api/index';
	import addServices from '../../common/services/add_services.vue'
	import editServices from '../../common/services/edit_services.vue'
	export default {
		name: 'services',
		components: {
			addServices,
			editServices
		},
		computed: {
			...mapState(['accountId','imgUrl'])
		},
		data() {
			return {
				serviceName:'', //服务名称
				categoryId:0, //服务分类ID
				classifyOne: '', //分类一
				classifyOneName: '',
				classifyTwo: '', //分类二
				classifyTwoName: '',
				classifyThree: '', //分类三
				classifyThreeName: '',
				brandName:'', //品牌名
				address:'', //地址
				page: 1,
				pageTotal: 0,
				addProduct:false,
				tableData: [],
				
				delList: [],
				editVisible: false,
				
				form: {},
				idx: -1,
				id: -1,
				
			};
		},
		created() {
			this.getData();
		},
		methods: {
			// 获取产品分类
			productCategory() {
				var query = {
					data: {
						parentId: 0
					}
				};
				shopProductCategoryt(query).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.classifyOne = res.data
					}
				});
			},
			selectOne(e) {
				var query = {
					data: {
						parentId: this.classifyOne[e].id
					}
				};
				shopProductCategoryt(query).then(res => {
					this.classifyId = this.classifyOne[e].id;
					if (res.code == 1) {
						this.classifyTwo = res.data
					}else{
						this.classifyTwo = ''; //分类二
						this.classifyTwoName = '';
						this.classifyThree = ''; //分类三
						this.classifyThreeName = '';
					}
				});
				
			},
			selectTwo(e) {
				var query = {
					data: {
						parentId: this.classifyTwo[e].id
					}
				};
				shopProductCategoryt(query).then(res => {
					this.classifyId = this.classifyTwo[e].id;
					if (res.code == 1) {
						this.classifyThree = res.data
					}else{
						this.classifyThree = ''; //分类三
						this.classifyThreeName = '';
					}
				});
			},
			selectThree(e) {
				this.classifyId = this.classifyThree[e].id;
			},
			handleChange(value) {
				console.log(label);
			},
			
			// toPage() {
			// 	this.$router.push({
			// 		path: '/add_product'
			// 	})
			// },
			
			open() {
				this.addProduct = true;
			},
			indexMethod(index) {
				return index + 1;
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				var query = {
					data: {
						accountId: this.accountId,
						serviceName: this.serviceName,
						categoryId: this.categoryId,
						brandName: this.brandName,
						address: this.address,
						nowPage: this.page,
						pageCount: 9,
					}
				};
				listShopService(query).then(res => {
					if (res.code == 1) {
						this.tableData = res;
						this.pageTotal = res.allPage;
					}
				});
			},
			// 触发搜索按钮
			handleSearch() {
				this.getData();
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var query = {
							data: {
								serviceId: row.id
							}
						};
						delShopService(query).then(res => {
							console.log(res)
							if (res.code == 1) {
								this.$message.success('删除成功');
								// this.tableData.data.splice(index, 1);
								this.getData();
							}
						});
				
					})
					.catch(() => {});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAllSelection() {
				const length = this.multipleSelection.length;
				let str = '';
				this.delList = this.delList.concat(this.multipleSelection);
				for (let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error(`删除了${str}`);
				this.multipleSelection = [];
			},
			// 编辑操作
			handleEdit(index, row) {
				this.idx = index;
				this.form = row;
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				this.$set(this.tableData, this.idx, this.form);
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
	.form-box {
		width: 45%;
	}

	.add_form {
		position: relative;
	}

	.add_btn {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

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

	.big-input {
		width: 100%;
		display: inline-block;
	}

	.pick-input {
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
