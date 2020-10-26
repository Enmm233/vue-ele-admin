<template>
	<div class="pick_goods">
		<div class="goods_a">
			<div class="item">
				<div class="flex flex_item_mid">
					<div class="title" v-if="goodsType == '产品'">
						<div class="xian"></div>
						可选产品
					</div>
					<div class="title" v-if="goodsType == '服务'">
						<div class="xian"></div>
						可选服务
					</div>
					<div class="tit_select flex">
						<el-select v-model="goodsType" @change="selectType" placeholder="默认" class="handle-select mr10">
							<el-option key="1" label="产品" value="产品"></el-option>
							<el-option key="2" label="服务" value="服务"></el-option>
						</el-select>

						<div class="flex flex_wrap" v-if="goodsType == '产品'">
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

						<div class="flex flex_wrap" v-if="goodsType == '服务'">
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
						</div>
					</div>
				</div>

				<el-table v-if="goodsType == '产品'" ref="multipleTable" :data="goodsAList.data" border tooltip-effect="dark" style="width: 100%" height="411"
				 row-key="date" @selection-change="handleSelectionChange1">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="id" label="产品ID" width="180">
					</el-table-column>
					<el-table-column prop="name" label="产品名称" width="250">
					</el-table-column>
				</el-table>
				<el-table v-if="goodsType == '服务'" ref="multipleTable" :data="goodsAList.data" border tooltip-effect="dark" style="width: 100%" height="411"
				 row-key="date" @selection-change="handleSelectionChange1">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="id" label="服务ID" width="180">
					</el-table-column>
					<el-table-column prop="name" label="服务名称" width="250">
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10"
					 @current-change="handlePageChange"></el-pagination>
				</div>
				<div style="color: #7B7979; font-size: 14px;">
					<i class="el-icon-lx-info"></i>
					<span>可以选择一个产品上架销售，也可以多个产品打包成一个商品上架销售</span>
				</div>
			</div>
			<div class="btn">
				<el-button-group>
					<el-button @click="left" icon="el-icon-arrow-left"></el-button>
					<el-button @click="right" icon="el-icon-arrow-right"></el-button>
				</el-button-group>
			</div>
			<div class="item">
				<div class="title" v-if="goodsType == '产品'">
					<div class="xian"></div>
					已选产品
				</div>
				<div class="title" v-if="goodsType == '服务'">
					<div class="xian"></div>
					已选服务
				</div>
				<el-table v-if="goodsType == '产品'" ref="multipleTable" :data="goodsAData" border tooltip-effect="dark" style="width: 100%" height="411"
				 row-key="date" @selection-change="handleSelectionChange2">
					<el-table-column type="selection" width="55">
					</el-table-column>
		
					<el-table-column prop="id" label="产品ID" width="180">
					</el-table-column>
					<el-table-column prop="name" label="产品名称" width="250">
					</el-table-column>
				</el-table>
				<el-table v-if="goodsType == '服务'" ref="multipleTable" :data="goodsAData" border tooltip-effect="dark" style="width: 100%" height="411"
				 row-key="date" @selection-change="handleSelectionChange2">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="id" label="服务ID" width="180">
					</el-table-column>
					<el-table-column prop="name" label="服务名称" width="250">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		shopProductCategoryt,
		getShopProductList,
		getMerchandiseCategories,
		listShopService
	} from '../../../api/index';
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'shuttle',
		props: ['num'],
		computed: {
			...mapState(['accountId']), //显示state的数据
		},
		data() {
			return {
				goodsType: "产品",
				classifyId: 0, //分类ID
				classifyOne: '', //分类一
				classifyOneName: '',
				classifyTwo: '', //分类二
				classifyTwoName: '',
				classifyThree: '', //分类三
				classifyThreeName: '',

				categoryId: 0,
				contractOne: '',
				contractOneList: [],
				contractTwo: '',
				contractTwoList: [],
				contractThree: '',
				contractThreeList: [],

				page: 1,
				pageTotal: 0,

				goodsAList: [],
				goodsAData: [],
				multipleSelection1: '',
				multipleSelection2: '',
			};
		},
		created() {
			this.goodsAData = []
			if (this.goodsType == "产品") {
				this.getData();
				this.productCategory();
			}
		},
		methods: {
			selectType(e) {
				this.goodsAData = [];
				this.goodsAList = [];
				this.page = 1;
				this.pageTotal = 0;
				if (e == "产品") {
					this.getData()
				}
				if (e == "服务") {
					this.getDatab();
					this.productCategoryb();
				}
			},
			getDatab() {
				var query = {
					data: {
						accountId: this.accountId,
						serviceName: '',
						categoryId: this.categoryId,
						brandName: '',
						address: '',
						nowPage: this.page,
						pageCount: 9,
					}
				};
				listShopService(query).then(res => {
					if (res.code == 1) {
						// this.$message.success('加载成功');
						this.goodsAList = res;
						this.pageTotal = res.allPage;
					}else if(res.code == 2){
						if(res.data.length > 0){
							this.goodsAList = res;
							this.pageTotal = res.allPage;
						}else{
							this.goodsAList = [];
							this.pageTotal = 0;
						}
					}
				});
			},
			// 获取产品分类
			productCategoryb() {
				var query = {
					data: {
						waresType: 2
					}
				};
				getMerchandiseCategories(query).then(res => {
					if (res.code == 1) {
						this.contractOneList = res.data
					}
				});
			},
			selectOneb(index){
				//选择一级
				this.categoryId = this.contractOneList[index].id;
				this.contractTwoList = this.contractOneList[index].kidList;
				this.getDatab()
				// console.log(this.categoryId)
			},
			selectTwob(index){
				//选择二级
				this.categoryId = this.contractTwoList[index].id;
				this.contractThreeList = this.contractTwoList[index].kidList;
				this.getDatab()
				// console.log(this.categoryId)
			},
			selectThreeb(index){
				//选择三级
				this.categoryId = this.contractThreeList[index].id;
				this.getDatab()
				// console.log(this.categoryId)
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				this.goodsAList = [];
				this.goodsAData = [];
				var query = {
					data: {
						accountId: this.accountId,
						productName: '',
						brand: '',
						placeOrigin: '',
						categoryId: this.classifyId,
						nowPage: this.page,
						pageCount: 9,
					}
				};
				getShopProductList(query).then(res => {
					if (res.code == 1) {
						// console.log(res)
						this.goodsAList = res;
						this.pageTotal = res.allPage;
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
					// console.log(res)
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
					if (res.code == 1) {
						this.classifyId = this.classifyOne[e].id;
						this.classifyTwo = res.data;
						this.getData()
					} else {
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
					if (res.code == 1) {
						this.classifyId = this.classifyTwo[e].id;
						this.classifyThree = res.data;
						this.getData()
					} else {
						this.classifyThree = ''; //分类三
						this.classifyThreeName = '';
					}
				});
			},
			selectThree(e) {
				this.classifyId = this.classifyThree[e].id;
				this.getData()
			},

			// 分页导航
			handlePageChange(val) {
				this.page = val;
				this.getData();
			},
			handleSelectionChange1(val) {
				this.multipleSelection1 = val;
			},
			handleSelectionChange2(val) {
				this.multipleSelection2 = val;
			},
			left() {
				let arr = this.multipleSelection2;
				this.goodsAData = this.goodsAData.filter(t => !arr.some(s => s.id === t.id))
				for (var i = 0; i < arr.length; i++) {
					this.goodsAList.data.push(arr[i])
				}
			},
			right() {
				let arr = this.multipleSelection1;
				this.goodsAList.data = this.goodsAList.data.filter(t => !arr.some(s => s.id === t.id))
				for (var i = 0; i < arr.length; i++) {
					this.goodsAData.push(arr[i])
				}
			}
		}
	}
</script>

<style>
	.pick_goods {
		padding: 50px 0;
	}

	.pick_goods .goods_a {
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	.pick_goods .goods_a .btn {
		margin: 0 50px;
		margin-top: 200px;
	}

	.pick_goods .goods_a .item .title {
		display: flex;
		align-items: center;
		font-size: 14px;
		padding: 20px 0;
		color: #606266;
	}

	.pick_goods .goods_a .item .tit_select {
		margin-left: 30px;
	}

	.pick_goods .goods_a .item .title .xian {
		background: #409EFF;
		height: 15px;
		width: 3px;
		margin-right: 10px;
	}

	.handle-select {
		width: 80px !important;
		margin-right: 15px;
	}
</style>
