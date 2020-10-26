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
				<div class="image_box">
					<div class="title">
						<div style="color: #7B7979; font-size: 14px;">
							<i class="el-icon-lx-info"></i>
							<span>
								商品ID|商品名称|选择规格|入库批次ID
							</span>
						</div>
					</div>
					<div class="img">
						 <el-image
						      style="width: 220px; height: 220px"
						      :src="qrUrl"
						      fit="fill"></el-image>
					</div>
					<div style="color: #7B7979; font-size: 14px;">
						<span>
							{{goodsInfo.id}} |{{goodsInfo.waresName}} |
							<span v-for="item in selectArr">
								{{item.name}},
								<span v-if="item.children != ''">
									<span v-for="dd in item.children">
										{{dd.name}},
									</span>
								</span>
							</span>
						 |<span v-for="item in arrTitle">
							{{item}},
						</span>
						</span>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		getShopWares,
		selShopWarehousingByProductId,
		addShopHousing,
		getWaresQrCode
	} from '../../../api/index';
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'info',
		computed: {
			...mapState(['URL','imgUrl', 'accountId']), //显示state的数据
		},
		props: ['id'],
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
				},
				qrUrl:'',
			};
		},
		created() {
			this.getData(this.id)
		},
		methods: {
			handleCheckChange() {
				this.selectArr = this.$refs.tree.getCheckedNodes(true,true);
				this.WaresQrCode()
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
						this.WaresQrCode()
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
						this.WaresQrCode()
					}
				});
			},
			WaresQrCode() {
				
				if(this.selectArr != ''){
					var spec = this.selectArr;  //规格
					var arr = [];
					for (let index in spec) {
						arr.push(spec[index].name)
					}
				}else{
					var arr = [];
				}
				var idBatch = this.arrTitle.toString();
				var data = {
					id:this.goodsInfo.id,
					name:this.goodsInfo.waresName,
					spec:arr.toString(),
					warehousingBatch:idBatch,
				}
				var str = '商品ID:'+data.id+'商品名称:'+data.name+'规格:'+data.spec+'批次ID:'+data.warehousingBatch;
				var qrCode = {
					qrCode:str
				}
				this.qrUrl = this.URL+'/api/merchant/get_wares_qr_code?data='+JSON.stringify(qrCode);
				console.log(this.qrUrl)
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
	.image_box{
		text-align: center;
		padding-top: 50px;
	}
</style>
