<!-- //商品入库 -->
<template>
	<div class="warehous">
		<el-row>
			<el-col :span="12">
				<div>
					<div class="title">
						<span class="xian"></span>
						<span>商品规格</span>
					</div>
					<div class="conten spec">
						<div class="spec_right">
							<el-tree
							  :data="list"
							  show-checkbox
							  default-expand-all
							  node-key="id"
							  ref="tree"
							  highlight-current
							  @check-change="handleCheckChange"
							  :props="defaultProps">
							</el-tree>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="form">
					<el-form ref="form" label-width="120px">
						<el-form-item label="商品名称">
							<span>{{goodsInfo.waresName}}</span>
						</el-form-item>
						<el-form-item label="选中规格">
							<el-input v-if="selectArr == ''" :disabled="true" placeholder="请选择规格" class="pick-input mr10"></el-input>
							<span v-else class="flex">
								<span v-for="item in selectArr" class="flex">
									{{item.name}},
									<span v-if="item.children != ''" class="flex">
										<span v-for="dd in item.children">
											{{dd.name}},
										</span>
									</span>
								</span>
							</span>
						</el-form-item>
						<el-form-item label="商品批次">
							<el-input v-if="arrTitle == ''" :disabled="true" placeholder="商品批次为空" class="pick-input mr10"></el-input>
							<span v-else class="flex">
								<span v-for="item in arrTitle" class="flex">
									{{item}},
								</span>
							</span>
						</el-form-item>
						<el-form-item label="入库数量">
							<div class="flex">
								<el-input type="number" v-model="inventory" placeholder="按单位输入数量" class="pick-input mr10"></el-input>
							</div>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import warehousSpec from './warehous_spec.vue'
	import {
		getShopWares,
		selShopWarehousingByProductId,
		addShopHousing
	} from '../../../api/index';
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'info',
		computed: {
			...mapState(['imgUrl', 'accountId']), //显示state的数据
		},
		props: ['id'],
		components: {
			warehousSpec
		},
		data() {
			return {
				selectArr: [], //存放被选中的值
				list: [],
				goodsInfo: '',
				arrTitle: [],
				inventory:'',
				defaultProps: {
					children: 'children',
					label: 'name'
				}
			};
		},
		created() {
			this.getData(this.id)
		},
		methods: {
			handleCheckChange() {
				this.selectArr = this.$refs.tree.getCheckedNodes(true,true);
				// console.log(this.selectArr)
			},
			getData(id) {
				this.srcList = [];
				var query = {
					data: {
						waresId: id,
					}
				};
				getShopWares(query).then(res => {
					if (res.code == 1) {
						this.goodsInfo = res.data;
						var urlStr = this.goodsInfo.data;
						var arr = [];
						urlStr.forEach(item => {
							arr.push(item.shopWaresSpec);
						});
						let key = 'children'; //新的key值
						for (let index in arr) {
							arr[index][key] = arr[index]['shopWaresSpecItems']; //用新的key值替换旧的key值
							delete arr[index]['shopWaresSpecItems']; //删除旧的key值
							for (let jndex in arr[index].children) {
								arr[index].children[jndex][key] = arr[index].children[jndex]['shopWaresSpecItemItems']; //用新的key值替换旧的key值
								delete arr[index].children[jndex]['shopWaresSpecItemItems']; //删除旧的key值
							}
						}
						let keya = 'name';
						for (let index in arr) {
							arr[index][keya] = arr[index]['specName']; //用新的key值替换旧的key值
							delete arr[index]['specName']; //删除旧的key值
						}
						this.list = arr;
						for(let index in this.goodsInfo.shopProducts){
							this.ShopWarehousingByProductId(this.goodsInfo.shopProducts[index].id)
						}
					}
				});
			},
			ShopWarehousingByProductId(id) {
				this.arrTitle = [];
				var query = {
					data: {
						productId: id,
					}
				};
				selShopWarehousingByProductId(query).then(res => {
					if (res.code == 1) {
						this.arrTitle.push(res.data.warehousingBatch)
					}
				});
			},
		}
	}
</script>

<style>
	.spec .spec_right {
		border: 1px solid #EBEEF5;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: #303133;
		margin-top: 15px;
		height: 450px;
		overflow: hidden;
		overflow-y: scroll;
	}

	.spec .spec_right .f_item {
		padding: 10px 20px;
		border-bottom: 1px solid #EBEEF5;
	}

	.spec .spec_right .f_item .right i {
		margin-left: 10px;
	}

	.pick-input {
		width: 90%;
		display: inline-block;
	}
	.el-tree-node__content {
	    height: 30px !important;
	}
</style>
