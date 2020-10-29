<template>
	<div class="pick_goods">
		<div class="goods_a">
			<div class="item">
				<div class="flex flex_item_mid">
					<div class="title">
						<div class="xian"></div>
						可选收付费项目
					</div>
				</div>

				<el-table ref="multipleTable" :data="goodsAList.data" border tooltip-effect="dark" style="width: 100%" height="400"
				 row-key="date" @selection-change="handleSelectionChange1">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="id" label="收付费项目ID" width="120">
					</el-table-column>
					<el-table-column prop="name" label="收付费项目名称" width="150">
					</el-table-column>
					<el-table-column label="价格" width="80">
						<template slot-scope="scope">
							<span>¥{{ scope.row.price }}</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="total, prev, pager, next" :page-count="pageTotal" :page-size="10"
					 @current-change="handlePageChange"></el-pagination>
				</div>
			</div>
			<div class="btn">
				<el-button-group>
					<el-button @click="left" icon="el-icon-arrow-left"></el-button>
					<el-button @click="right" icon="el-icon-arrow-right"></el-button>
				</el-button-group>
			</div>
			<div class="item">
				<div class="title">
					<div class="xian"></div>
					已选收付费项目
				</div>
				<el-table ref="multipleTable" :data="goodsAData" border tooltip-effect="dark" style="width: 100%" height="400"
				 row-key="date" @selection-change="handleSelectionChange2">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="id" label="收付费项目ID" width="120">
					</el-table-column>
					<el-table-column prop="name" label="收付费项目名称" width="150">
					</el-table-column>
					<el-table-column label="价格" width="80">
						<template slot-scope="scope">
							<span>¥{{ scope.row.price }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		listShopExpenseItem
	} from '../../../api/index';
	import { mapState } from 'vuex'
	export default {
		name: 'shuttle',
		props: ['num'],
		computed:{
		     ...mapState(['accountId']),  //显示state的数据
		    },
		data() {
			return {
				page: 1,
				pageTotal: 0,
				goodsAList: [],
				goodsAData: [],
				multipleSelection1: '',
				multipleSelection2: '',
			};
		},
		created() {
			this.getData();
		},
		methods: {
			// 分页导航
			handlePageChange(val) {
				this.page = val;
				this.getData();
			},
			getData() {
				this.goodsAList = [];
				this.goodsAData = [];
				var query = {
					data: {
						accountId:localStorage.getItem('account_id'),
						// accountId: this.accountId,
						name: '',
						type: 0,
						sort: 0,
						expenseType: 0,
						showType: 0,
						nowPage: this.page,
						pageCount: 9,
					}
				};
				listShopExpenseItem(query).then(res => {
					if (res.code == 1) {
						// console.log(res)
						this.goodsAList = res;
						this.pageTotal = res.allPage;
					}
				});
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
				// console.log('从2到1')
			},
			right() {
				let arr = this.multipleSelection1;
				this.goodsAList.data = this.goodsAList.data.filter(t => !arr.some(s => s.id === t.id))
				for (var i = 0; i < arr.length; i++) {
					this.goodsAData.push(arr[i])
				}
				// console.log('从1到2' + this.goodsAData)
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
		width: 80px;
	}
</style>
