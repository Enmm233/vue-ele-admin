<!-- goods_list 商品列表 -->
<template>
	<div>
		<div class="goods_list">
			<div class="container">
				<div class="flex flex_item_between">
					<el-form ref="form" class="flex flex_wrap" label-width="80px">
						<el-form-item label="商品">
							<el-input v-model="waresName" placeholder="输入商品名称/ID" class="handle-input mr10"></el-input>
						</el-form-item>
						<el-form-item label="产品分类" v-if="waresType == 1 || waresType == 0">
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
						<el-form-item label="服务分类" v-if="waresType == 2">
							<el-select v-model="contractOne" @change="selectOneb" placeholder="请选择" class="handle-select mr10">
								<el-option v-for="(item,index) in contractOneList" :key="item.id" :label="item.name" :value="index">
								</el-option>
							</el-select>
							<el-select v-model="contractTwo" @change="selectTwob" placeholder="请选择" class="handle-select mr10">
								<el-option v-for="(item,index) in contractTwoList" :key="item.id" :label="item.name" :value="index">
								</el-option>
							</el-select>
							<el-select v-model="contractThree" @change="selectThreeb" placeholder="请选择" class="handle-select mr10">
								<el-option v-for="(item,index) in contractThreeList" :key="item.id" :label="item.name" :value="index">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="货架状态">
							<div class="flex flex_wrap">
								<el-select v-model="saleStateStr" placeholder="默认" @change="selectFour" class="handle-select mr10">
									<el-option v-for="(item,index) in saleList" :key="item.type" :label="item.val" :value="index">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
					</el-form>
					<div>
						<el-button type="primary" @click="handleSearch">搜索</el-button>
					</div>
				</div>
				<div class="">
					<el-form ref="form" class="flex flex_wrap" label-width="80px">
						<el-form-item label="产品/服务">
							<el-input v-model="serviceName" placeholder="输入产品名称/ID" class="handle-input mr10"></el-input>
						</el-form-item>
						<el-form-item label="商品性质">
							<div class="flex flex_wrap">
								<el-select v-model="waresTypeStr" placeholder="默认" @change="selectFive" class="handle-select mr10">
									<el-option v-for="(item,index) in waresTypeList" :key="item.type" :label="item.val" :value="index">
									</el-option>
								</el-select>
							</div>
						</el-form-item>

					</el-form>
				</div>
				<div class="handle-box paddingB15 paddingT15">
					<el-button type="primary" @click="open">添加</el-button>
					<el-button type="success" @click="refreshData">刷新列表</el-button>
					<!-- <el-button type="success">上架</el-button> -->
					<!-- <el-button type="warning">下架</el-button> -->
					<!-- <el-button type="info">删除</el-button> -->
				</div>
				<el-table :data="tableData.data" class="table" :row-class-name="tableRowClassName" border height="481" ref="multipleTable"
				 header-cell-class-name="table-header" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" align="center"></el-table-column>
					<el-table-column prop="id" label="商品ID" width="80" align="center"></el-table-column>
					<el-table-column prop="waresName" label="商品名称" align="center"></el-table-column>
					<el-table-column label="商品图片" align="center">
						<template slot-scope="scope">
							<el-image class="table-td-thumb" :src="imgUrl+scope.row.waresFirstImg" @click.stop="handleClickItem"
							 :preview-src-list="scope.row.waresImg"></el-image>
						</template>
					</el-table-column>
					<el-table-column prop="categoryName" label="商品分类" align="center"></el-table-column>
					<el-table-column label="性质" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.waresType == 1">物品</span>
							<span v-if="scope.row.waresType == 2">服务</span>
						</template>
					</el-table-column>
					<el-table-column prop="waresCompany" label="单位" width="80"></el-table-column>
					<el-table-column label="产品/服务名称">
						<template slot-scope="scope">
							<p class="overflow-ellipsis">
								{{scope.row.serviceName}}
							</p>
						</template>
					</el-table-column>
					<el-table-column label="销售价" width="80">
						<template slot-scope="scope">￥{{scope.row.price}}</template>
					</el-table-column>
					<el-table-column label="售出量" width="80">
						<template slot-scope="scope">{{scope.row.saleNumber}}</template>
					</el-table-column>

					<el-table-column label="货架状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.saleState == 1">已上架</span>
							<span v-if="scope.row.saleState == 2">未上架</span>
							<span v-if="scope.row.saleState == 3">待审核</span>
						</template>
					</el-table-column>

					<el-table-column prop="createTime" label="操作时间" align="center"></el-table-column>
					<el-table-column prop="waresSort" label="排序" width="50" align="center"></el-table-column>
					<el-table-column label="操作" width="300">
						<template slot-scope="scope">
							<el-button class="ssmall_btn" style="background-color: #409EFF;" @click="handleExamine(scope.$index, scope.row)">查看</el-button>
							<el-button class="ssmall_btn" style="background-color: #D500F9;" @click="handleEvaluate(scope.$index, scope.row)">评论</el-button>
							<el-button class="ssmall_btn" style="background-color: #3B50F7;" v-if="scope.row.saleState == 1" @click="soldOut(scope.$index, scope.row)">下架</el-button>
							<el-button class="ssmall_btn" style="background-color: #3B50F7;" v-if="scope.row.saleState == 2" @click="putaway(scope.$index, scope.row)">上架</el-button>
							<el-button class="ssmall_btn" style="background-color: #30BB40;" v-if="scope.row.saleState != 1" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button class="ssmall_btn" style="background-color: #F76262;" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							<!-- <el-button class="ssmall_btn" style="background-color: #FFEA00;" @click="headlePutStorage(scope.$index, scope.row)">入库</el-button> -->
							<!-- <el-button class="ssmall_btn" style="background-color: #1DE9B6;" @click="handleQR(scope.$index, scope.row)">生成二维码</el-button> -->
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10"
					 @current-change="handlePageChange"></el-pagination>
				</div>
			</div>

			<!-- 编辑弹出框 -->
			<el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="editVisible" width="30%">
				<el-form ref="form" :model="form" label-width="70px">
					<el-form-item label="用户名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 评论弹出框 -->
			<el-dialog :close-on-click-modal="false" title="评论列表" :visible.sync="editVisible1" width="80%">
				<evaluate-list ref="child" :id="goodsId"></evaluate-list>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editVisible1 = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 查看弹出框 -->
			<el-dialog :close-on-click-modal="false" title="商品详情" :visible.sync="editVisible2" width="70%">
				<goods-detail :id="goodsId"></goods-detail>
			</el-dialog>


			<!-- 入库弹出框 -->
			<el-dialog :close-on-click-modal="false" title="商品入库" :visible.sync="editVisible3" width="50%">
				<goods-warehousing ref="childput" :id="goodsId"></goods-warehousing>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editVisible3 = false">取 消</el-button>
					<el-button type="primary" @click="putStorage">确 定</el-button>
				</span>
			</el-dialog>

			<!-- 二维码弹出框 -->
			<el-dialog :close-on-click-modal="false" title="商品入库" :visible.sync="editVisible4" width="50%">
				<goods-qr ref="childqr" :id="goodsId"></goods-qr>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editVisible4 = false">取 消</el-button>
					<el-button type="primary" @click="print">打 印</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import {
		shopProductCategoryt,
		getShopWaresInfo,
		ceaseSale,
		sale,
		delShopWares,
		addShopHousing,
		getMerchandiseCategories
	} from '../../../api/index';
	import select from '../../../../public/select.json'
	import goodsDetail from '../../common/addGoods/goods_detail.vue';
	import evaluateList from '../../common/evaluate/evaluate_list.vue';
	import goodsWarehousing from '../../common/addGoods/goods_warehousing.vue';
	import goodsQr from '../../common/addGoods/goods_qr.vue';
	import {
		mapState
	} from 'vuex'
	import util from '../../../utils/util.js'
	import {
		getNowFormatDate
	} from '../../../utils/utils.js'
	export default {
		name: 'goodsList',
		computed: {
			...mapState(['URL', 'imgUrl', 'accountId', 'msUsername']), //显示state的数据
		},
		components: {
			goodsDetail,
			evaluateList,
			goodsWarehousing,
			goodsQr
		},
		data() {
			return {
				classifyId: 0, //分类ID
				classifyOne: [{"id": 0,"name": "全部"}], //分类一
				classifyOneName: '',
				classifyTwo: [{"id": 0,"name": "全部"}], //分类二
				classifyTwoName: '',
				classifyThree: [{"id": 0,"name": "全部"}], //分类三
				classifyThreeName: '',

				categoryId: 0,
				contractOne: '',
				contractOneList: [{"id": 0,"name": "全部"}],
				contractTwo: '',
				contractTwoList: [{"id": 0,"name": "全部"}],
				contractThree: '',
				contractThreeList: [{"id": 0,"name": "全部"}],


				waresName: '', //商品名称
				saleStateStr: '', //上架状态
				saleState: 0, //上架状态
				saleList: [{
						"type": 0,
						"val": "全部"
					},
					{
						"type": 1,
						"val": "已上架"
					},
					{
						"type": 2,
						"val": "未上架"
					},
					{
						"type": 3,
						"val": "待审核"
					}
				], //上架状态
				serviceName: '', //产品服务名称

				waresTypeStr: '', //物品类型名称
				waresType: 1, //物品类型ID
				waresTypeList: [{
						"type": 0,
						"val": "全部"
					},
					{
						"type": 1,
						"val": "物品"
					},
					{
						"type": 2,
						"val": "服务"
					}
				], //物品类型

				page: 1,
				pageTotal: 0,

				goodsId: '',

				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10
				},
				tableData: [],
				multipleSelection: [],
				delList: [],
				editVisible: false,
				editVisible1: false,
				editVisible2: false,
				editVisible3: false,
				editVisible4: false,
				form: {},
				idx: -1,
				id: -1,
			};
		},
		watch: {
			'$route.path': function(newVal, oldVal) {
				if (this.$route.query.status == 1) {
					this.getData();
				}
			}
		},
		created() {
			this.getData();
			this.productCategory();
			this.productCategoryb();
		},
		methods: {
			// 获取产品分类
			productCategoryb() {
				var query = {
					data: {
						waresType: 2
					}
				};
				this.contractOneList = [{"id": 0,"name": "全部"}];
				getMerchandiseCategories(query).then(res => {
					if (res.code == 1) {
						res.data.map((item, index) => {
							this.contractOneList.push(item)
						})
					}
				});
			},
			selectOneb(index) {
				//选择一级
				if(this.contractOneList[index].id != 0){
					this.classifyId = this.contractOneList[index].id;
					
					this.contractOneList[index].kidList.map((item, index) => {
						this.contractTwoList.push(item)
					})
				}
			},
			selectTwob(index) {
				//选择二级
				if(this.contractTwoList[index].id != 0){
					this.classifyId = this.contractTwoList[index].id;
					
					this.contractTwoList[index].kidList.map((item, index) => {
						this.contractThreeList.push(item)
					})
				}
			},
			selectThreeb(index) {
				//选择三级
				this.classifyId = this.contractThreeList[index].id;
				// console.log(this.categoryId)
			},
			refreshData() {
				//刷新列表
				this.classifyId = 0;
				this.classifyOne = [{"id": 0,"name": "全部"}];
				this.classifyOneName = '';
				this.classifyTwo = [{"id": 0,"name": "全部"}];
				this.classifyTwoName = '';
				this.classifyThree = [{"id": 0,"name": "全部"}];
				this.classifyThreeName = '';

				this.contractOne = '';
				this.contractOneList = [{"id": 0,"name": "全部"}];
				this.contractTwo = '';
				this.contractTwoList = [{"id": 0,"name": "全部"}];
				this.contractThree = '';
				this.contractThreeList = [{"id": 0,"name": "全部"}];


				this.waresName = '';
				this.saleStateStr = '';
				this.saleState = 0;
				this.serviceName = '';
				this.waresTypeStr = '';
				this.waresType = 0;
				this.page = 1;
				this.pageTotal = 0;
				this.getData();
				this.productCategory();
			},
			handleClickItem() {
				// 获取遮罩层dom
				var domImageMask = '';
				var time = setTimeout(function() {
					domImageMask = document.querySelector(".el-image-viewer__mask");
					if (!domImageMask) {
						return;
					}
					domImageMask.addEventListener("click", () => {
						// 点击遮罩层时调用关闭按钮的 click 事件
						document.querySelector(".el-image-viewer__close").click();
						clearTimeout(time);
					});
				}, 100)
			},
			// 获取产品分类
			productCategory() {
				var query = {
					data: {
						parentId: 0
					}
				};
				this.classifyOne = [{"id": 0,"name": "全部"}];
				shopProductCategoryt(query).then(res => {
					if (res.code == 1) {
						res.data.map((item, index) => {
							this.classifyOne.push(item)
						})
					}
				});
			},
			selectOne(e) {
				if(this.classifyOne[e].id != 0){
					var query = {
						data: {
							parentId: this.classifyOne[e].id
						}
					};
					this.classifyTwo = [{"id": 0,"name": "全部"}];
					shopProductCategoryt(query).then(res => {
						// console.log(res)
						if (res.code == 1) {
							this.classifyId = this.classifyOne[e].id;
							res.data.map((item, index) => {
								this.classifyTwo.push(item)
							})
						} else {
							this.classifyTwo = [{"id": 0,"name": "全部"}]; //分类二
							this.classifyTwoName = '';
							this.classifyThree = [{"id": 0,"name": "全部"}]; //分类三
							this.classifyThreeName = '';
						}
					
					});
				}
			},
			selectTwo(e) {
				if(this.classifyTwo[e].id != 0){
					var query = {
						data: {
							parentId: this.classifyTwo[e].id
						}
					};
					this.classifyThree = [{"id": 0,"name": "全部"}];
					shopProductCategoryt(query).then(res => {
						// console.log(res)
						if (res.code == 1) {
							this.classifyId = this.classifyTwo[e].id;
							res.data.map((item, index) => {
								this.classifyThree.push(item)
							})
							// this.classifyThree = res.data
						} else {
							this.classifyThree = [{"id": 0,"name": "全部"}]; //分类三
							this.classifyThreeName = '';
						}
					});
				}
			},
			selectThree(e) {
				this.classifyId = this.classifyThree[e].id;
			},
			selectFour(e) {
				this.saleState = this.saleList[e].type;
			},
			selectFive(e) {
				this.waresType = this.waresTypeList[e].type;
				if(this.waresType == 1 || this.waresType == 0){
					this.classifyId = 0;
					this.contractOneList = [{"id": 0,"name": "全部"}];
					this.contractTwo = '';
					this.contractTwoList = [{"id": 0,"name": "全部"}];
					this.contractThree = '';
					this.contractThreeList = [{"id": 0,"name": "全部"}];
					this.productCategory();
				}else{
					this.classifyId = 0;
					this.classifyOne = [{"id": 0,"name": "全部"}];
					this.classifyOneName = '';
					this.classifyTwo = [{"id": 0,"name": "全部"}];
					this.classifyTwoName = '';
					this.classifyThree = [{"id": 0,"name": "全部"}];
					this.classifyThreeName = '';
					this.productCategoryb();
				}
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				var query = {
					data: {
						accountId:localStorage.getItem('account_id'),
						// accountId: this.accountId,
						waresName: this.waresName,
						categoryId: this.classifyId,
						saleState: this.saleState,
						serviceName: this.serviceName,
						waresType: this.waresType,
						nowPage: this.page,
						pageCount: 6,
					}
				};
				getShopWaresInfo(query).then(res => {

					if (res.code == 1) {
						// this.$message.success('加载成功');
						var arr = [];
						for (var i = 0; i < res.data.length; i++) {
							res.data[i].waresImg = res.data[i].waresImg.split(',');
						}
						res.data.map(item => {
							var val = item.waresImg;
							val.map((i, index) => {
								val[index] = this.imgUrl + i;
							})
						})
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
			// 分页导航
			handlePageChange(val) {
				this.page = val;
				this.getData();
			},
			// 触发搜索按钮
			handleSearch() {
				this.page = 1;
				this.getData();
			},

			tableRowClassName({ //行变色
				row,
				rowIndex
			}) {
				if (row.waresType === 2) {
					return 'success-row';
				}
				return '';
			},

			open() {
				util.$emit('demo', 'msg');
				this.$router.push({
					path: '/add_goods',
					query: {
						type: 1
					}
				})
			},
			//显示入库
			headlePutStorage(index, row) {
				this.goodsId = row.id;
				this.editVisible3 = true;
				if (this.$refs.childput) {
					this.$refs.childput.getData(row.id);
				}
			},
			//显示二维码
			handleQR(index, row) {
				this.goodsId = row.id;
				this.editVisible4 = true;
				if (this.$refs.childqr) {
					this.$refs.childqr.getData(row.id);
				}
			},
			print() {
				//打印
			},
			//入库
			putStorage() {
				if (this.$refs.childput) {
					if (this.$refs.childput.selectArr == "") {
						this.$message.error('请选择规格');
						return
					}
					if (this.$refs.childput.inventory == "") {
						this.$message.error('请输入库存数');
						return
					}
					var spec = this.$refs.childput.selectArr;
					var arr = [];
					for (let index in spec) {
						arr.push(spec[index].name)
					}
					if (this.$refs.childput.arrTitle != '') {
						var warehousingBatch = this.$refs.childput.arrTitle.toString();
					} else {
						var warehousingBatch = '';
					}
					if (this.$refs.childput.inventory != '') {
						var inventory = this.$refs.childput.inventory;
					} else {
						var inventory = 0;
					}
					var query = {
						data: {
							waresId: this.$refs.childput.goodsInfo.id,
							specifications: arr.toString(),
							warehousingBatch: warehousingBatch,
							waresName: this.$refs.childput.goodsInfo.waresName,
							waresUnit: this.$refs.childput.goodsInfo.waresCompany,
							warehousingNum: inventory,
							warehousingAccount: this.msUsername,
							accountId: localStorage.getItem('account_id'),
						}
					};
					addShopHousing(query).then(res => {
						if (res.code == 1) {
							this.editVisible3 = false;
							this.$message.success("入库成功");
						}
					});
				}
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
								waresId: row.id
							}
						};
						delShopWares(query).then(res => {
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
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 编辑操作
			handleEdit(index, row) {
				util.$emit('demo', 'msg');
				this.$router.push({
					path: '/add_goods',
					query: {
						type: 2,
						id: row.id
					}
				})
			},
			// 评论操作
			handleEvaluate(index, row) {
				this.goodsId = row.id;
				this.editVisible1 = true;
				if (this.$refs.child) {
					this.$refs.child.getData(row.id);
				}
			},
			// 查看操作
			handleExamine(index, row) {
				this.goodsId = row.id;
				this.editVisible2 = true;
			},
			// 保存编辑
			saveEdit() {
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				this.$set(this.tableData, this.idx, this.form);
			},
			//下架
			soldOut(index, row) {
				this.$confirm('确定要下架吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var query = {
							data: {
								waresId: row.id,
							}
						};
						ceaseSale(query).then(res => {
							if (res.code == 1) {
								this.$message.success("下架成功");
								this.getData();
							}
						});
					})
					.catch(() => {});
			},
			//上架
			putaway(index, row) {
				this.$confirm('确定要上架吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var query = {
							data: {
								waresId: row.id,
								saleTime: getNowFormatDate(),
								saleDuration: 0
							}
						};
						sale(query).then(res => {
							if (res.code == 1) {
								this.$message.success("上架成功");
								this.getData();
							}
						});
					})
					.catch(() => {});

			},

		}
	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 10px;
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

	.mr10 {
		margin-right: 10px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}

	.handle-box {
		margin-bottom: 20px;
	}

	.big-input {
		width: 600px;
		display: inline-block;
	}

	.pick-input {
		width: 100px;
		display: inline-block;
	}
</style>
