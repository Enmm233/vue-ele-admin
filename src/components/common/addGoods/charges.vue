<template>
	<div class="pick_goods">
		<div class="goods_a">
			<div class="item">
				<div class="flex flex_item_mid">
					<div class="title">
						<div class="xian"></div>
						可选收付费项目
					</div>
					<!-- 	<div class="tit_select">
						<el-select placeholder="请选择产品分类" class="handle-select mr10">
							<el-option key="bbk" label="步步高" value="bbk"></el-option>
							<el-option key="xtc" label="小天才" value="xtc"></el-option>
							<el-option key="imoo" label="imoo" value="imoo"></el-option>
						</el-select>
					</div> -->
				</div>

				<el-table ref="multipleTable" :data="goodsAList" border tooltip-effect="dark" style="width: 100%" height="400"
				 row-key="date" @selection-change="handleSelectionChange1">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="date" label="收付费项目ID" width="180">
					</el-table-column>
					<el-table-column prop="name" label="收付费项目名称" width="250">
					</el-table-column>
					<el-table-column label="价格" width="100">
						<template slot-scope="scope">
							<span>{{ scope.row.address }}</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize"
					 :total="pageTotal" @current-change="handlePageChange"></el-pagination>
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
					<el-table-column prop="date" label="收付费项目ID" width="180">
					</el-table-column>
					<el-table-column prop="name" label="收付费项目名称" width="250">
					</el-table-column>
					<el-table-column label="价格" width="100">
						<template slot-scope="scope">
							<span>{{ scope.row.address }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作类型" width="100">
						<template slot-scope="scope">
							<el-select placeholder="默认" class="handle-select mr10">
								<el-option key="bbk" label="开关" value="bbk"></el-option>
								<el-option key="xtc" label="数量" value="xtc"></el-option>
							</el-select>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shuttle',
		props: ['num'],
		data() {
			return {
				query: {
					pageIndex: 1,
					pageSize: 10
				},
				pageTotal: 10,
				goodsAList: [{
					date: '1',
					name: '王小虎',
					address: '100'
				}, {
					date: '2',
					name: '王小虎',
					address: '120'
				}, {
					date: '3',
					name: '王小虎',
					address: '300'
				}, {
					date: '4',
					name: '王小虎',
					address: '1517'
				}, {
					date: '5',
					name: '王小虎',
					address: '1519'
				}],
				goodsAData: [],
				multipleSelection1: '',
				multipleSelection2: '',
			};
		},
		methods: {
			// 分页导航
			handlePageChange(val) {
				console.log(val)
			},
			handleSelectionChange1(val) {
				this.multipleSelection1 = val;
			},
			handleSelectionChange2(val) {
				this.multipleSelection2 = val;
			},
			left() {
				let arr = this.multipleSelection2;
				this.goodsAData = this.goodsAData.filter(t => !arr.some(s => s.date === t.date))
				for (var i = 0; i < arr.length; i++) {
					this.goodsAList.push(arr[i])
				}
				console.log('从2到1')
			},
			right() {
				let arr = this.multipleSelection1;
				this.goodsAList = this.goodsAList.filter(t => !arr.some(s => s.date === t.date))
				for (var i = 0; i < arr.length; i++) {
					this.goodsAData.push(arr[i])
				}
				console.log('从1到2' + this.goodsAData)
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
