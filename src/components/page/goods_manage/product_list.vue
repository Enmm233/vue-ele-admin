<!-- product_list 产品列表-->
<template>
	<div>
		<div class="container">
			<div class="flex flex_item_between">
				<el-form class="flex flex_wrap" label-width="80px">
					<el-form-item label="产品名称">
						<el-input v-model="productName" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="产品分类">
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
						<el-input v-model="brand" class="pick-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="产地" label-width="50px">
						<el-input v-model="origin" class="pick-input mr10"></el-input>
					</el-form-item>
				</el-form>
				<div>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</div>
			</div>
			<div class="handle-box">
				<el-button type="primary" @click="open">添加</el-button>
				<el-button type="success" @click="refreshData">刷新列表</el-button>
				<!-- <el-button type="info" @click="toPage">删除</el-button> -->
			</div>

			<el-table height="555" :data="tableData.data" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="产品ID" width="100" align="center"></el-table-column>
				<el-table-column prop="name" label="产品名称" width="150"></el-table-column>
				<el-table-column label="创建账号" width="120" align="center">
					<template slot-scope="scope">{{scope.row.createUserId}}</template>
				</el-table-column>
				<el-table-column label="创建时间" width="160" align="center">
					<template slot-scope="scope">{{scope.row.createTime}}</template>
				</el-table-column>
				<el-table-column label="产品类别" width="120" align="center">
					<template slot-scope="scope">{{scope.row.categoryName}}</template>
				</el-table-column>
				<el-table-column label="产品图片" width="120" align="center">
					<template slot-scope="scope">			
						<el-image 
						class="table-td-thumb" 
						:src="imgUrl+scope.row.image" 
						@click.stop="handleClickItem" 
						:preview-src-list="[imgUrl+scope.row.image]"></el-image>
					</template>
				</el-table-column>
				<el-table-column label="品牌名称" width="120" align="center">
					<template slot-scope="scope">{{scope.row.brand}}</template>
				</el-table-column>
				<el-table-column label="产品单位" width="120" align="center">
					<template slot-scope="scope">{{scope.row.unit}}</template>
				</el-table-column>
				<el-table-column label="产品产地" width="180" align="center">
					<template slot-scope="scope">{{scope.row.placeOrigin}}</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button v-if="scope.row.flag == 0" type="primary" size="mini" @click="headlePutStorage(scope.$index, scope.row)">入库</el-button>
						<el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出 -->
		<el-dialog title="编辑产品" :close-on-click-modal="false" :visible.sync="editProduct" width="80%">
			<edit-product ref="child" :shopProductId="shopProductId" :editProduct="editProduct" @editProductCil="editProductCil"></edit-product>
		</el-dialog>
		<!-- 添加弹出框 -->
		<el-dialog title="添加产品" :close-on-click-modal="false" :visible.sync="addProduct" width="80%">
			<add-product ref="addChild" :addProduct="addProduct" @addProductCil="addProductCil"></add-product>
		</el-dialog>


		<!-- 入库弹出框 -->
		<el-dialog title="产品入库" :close-on-click-modal="false" :visible.sync="editVisible3" width="20%">
			<el-form label-width="70px">
				<el-form-item label="产品名称">
					<span>{{form.name}}</span>
				</el-form-item>
				<el-form-item label="商品批次">
					<span>{{batch}}</span>
				</el-form-item>
				<el-form-item label="入库数量">
					<el-input type="number" v-model="putStorageNum"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible3 = false">取 消</el-button>
				<el-button type="primary" @click="putStorage">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		fetchData,
		shopProductCategoryt,
		getShopProductList,
		delShopProduct,
		addShopWarehousing
	} from '../../../api/index';
	import addProduct from '../../common/addGoods/add_product.vue'
	import editProduct from '../../common/addGoods/edit_product.vue'
	export default {
		name: 'basetable',
		computed:{
		     ...mapState(['accountId','imgUrl','msUsername']),  //显示state的数据
		    },
		components: {
			addProduct,
			editProduct
		},
		data() {
			return {
				productName: '', //产品名称
				brand: '', //品牌
				origin: '', //产地
				classifyId: 0, //分类ID
				classifyOne: '', //分类一
				classifyOneName: '',
				classifyTwo: '', //分类二
				classifyTwoName: '',
				classifyThree: '', //分类三
				classifyThreeName: '',
				page: 1,
				pageTotal: 0,
				form: '',
				batch:'', //批次
				putStorageNum:'', //入库数量
				tableData: '',
				multipleSelection: [],
				delList: [],
				editProduct: false,
				editVisible3: false,
				addProduct: false,
				shopProductId: '',
				idx: -1,
				id: -1,
			};
		},
		watch: {
			'$route.path': function(newVal, oldVal) {
				this.productName = '';
				this.brand = '';
				this.origin = '';
				this.classifyId = 0;
				this.classifyOne = '';
				this.classifyOneName = '';
				this.classifyTwo = '';
				this.classifyTwoName = '';
				this.classifyThree = '';
				this.classifyThreeName = '';
				this.page = 1;
				this.pageTotal = 0;
			}
		},
		created() {
			this.getData();
			this.productCategory();
		},
		methods: {
			refreshData(){
				//刷新列表
				this.productName = '';
				this.brand = '';
				this.origin = '';
				this.classifyId = 0;
				this.classifyOne = '';
				this.classifyOneName = '';
				this.classifyTwo = '';
				this.classifyTwoName = '';
				this.classifyThree = '';
				this.classifyThreeName = '';
				this.page = 1;
				this.pageTotal = 0;
				this.getData();
				this.productCategory();
			},
			handleClickItem() {
				// 获取遮罩层dom
				var domImageMask = '';
				var time = setTimeout(function(){
					domImageMask = document.querySelector(".el-image-viewer__mask");
					if (!domImageMask) {
						return;
					}
					domImageMask.addEventListener("click", () => {
						// 点击遮罩层时调用关闭按钮的 click 事件
						document.querySelector(".el-image-viewer__close").click();
						clearTimeout(time);
					});
				},100)
			},
			addProductCil(data) { //添加
				this.addProduct = !data.addProduct;
				if (data.type == "成功") {
					this.productName = '';
					this.brand = '';
					this.origin = '';
					this.classifyId = 0;
					this.$message.success('添加成功');
					this.getData();
				}
			},
			editProductCil(data) { //编辑
				this.editProduct = !data.editProduct;
				if (data.type == "成功") {
					this.productName = '';
					this.brand = '';
					this.origin = '';
					this.classifyId = 0;
					this.$message.success('修改成功');
					this.getData();
				}
			},
			//显示入库
			headlePutStorage(index, row) {
				this.form = row;
				this.batch = Date.parse(new Date());
				// putStorageNum
				this.editVisible3 = true;
			},
			//入库
			putStorage() {
				if(this.putStorageNum == ''){
					this.$message.error("请输入入库数量");
					return
				}
				if(this.putStorageNum < 0){
					this.$message.error("入库数量不能为负数");
					return
				}
				var query = {
					data: {
						productId: this.form.id,
						productName: this.form.name,
						productUnit: this.form.unit,
						warehousingNum: this.putStorageNum,
						warehousingBatch: this.batch,
						warehousingAccount: this.msUsername,
						accountId: localStorage.getItem('account_id'),
					}
				};
				addShopWarehousing(query).then(res => {
					if (res.code == 1) {
						this.editVisible3 = false;
						this.putStorageNum = '';
						this.$message.success("入库成功");
						this.getData();
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
			// 获取 easy-mock 的模拟数据
			getData() {
				var query = {
					data: {
						// accountId:localStorage.getItem('account_id'),
						accountId: localStorage.getItem('account_id'),
						productName: this.productName,
						brand: this.brand,
						placeOrigin: this.origin,
						categoryId: this.classifyId,
						nowPage: this.page,
						pageCount: 9,
					}
				};
				getShopProductList(query).then(res => {
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
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var query = {
							data: {
								shopProductId: row.id
							}
						};
						delShopProduct(query).then(res => {
							// console.log(res)
							if (res.code == 1) {
								this.$message.success('删除成功');
								this.tableData.data.splice(index, 1);
								this.getData();
							}
						});

					})
					.catch(() => {});
			},

			open() {
				this.addProduct = true;
				if(this.$refs.addChild){
					this.$refs.addChild.productCategory();
				}
			},
			indexMethod(index) {
				return index + 1;
			},

			// 触发搜索按钮
			handleSearch() {
				this.page = 1;
				this.getData();
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
				this.shopProductId = row.id;
				this.idx = index;
				// this.form = row;
				this.editProduct = true;
				if(this.$refs.child){
					this.$refs.child.getProduct(row.id);
				}
				
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
		width: 100% !important;
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
