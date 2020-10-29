<!-- 设置规格 -->
<template>
	<div class="spec_content">
		<el-row>
			<el-col :span="12">
				<div class="flex flex_item_center">
					<previews :info="info" :list="oneList"></previews>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="flex flex_item_center">
					<div class="spec" style="width: 400px;">
						<div>
							<el-button style="margin-bottom: 20px;" @click="isShow = true" type="primary">添加主规格</el-button>
							<div class="spec_right">
								<div v-for="(item,index) in oneList">
									<div class="f_item flex flex_item_between">
										<div class="left">{{item.shopWaresSpec.specName}}</div>
										<div class="right">
											<i class="el-icon-lx-add" @click="addSpec(1,index)"></i>
											<i class="el-icon-lx-delete" @click="delSpec(index)"></i>
										</div>
									</div>
									<div v-if="item.shopWaresSpec.shopWaresSpecItems != []">
										<div v-for="(item2,index2) in item.shopWaresSpec.shopWaresSpecItems">
											<div class="f_item flex flex_item_between">
												<div class="left paddingL15">{{item2.name}}</div>
												<div class="right">
													<i class="el-icon-lx-add" @click="addSpec(2,index,index2)"></i>
													<i class="el-icon-lx-delete" @click="delSpec(index,index2)"></i>
												</div>
											</div>
											<div v-if="item2.shopWaresSpecItemItems != []">
												<div v-for="(item3,index3) in item2.shopWaresSpecItemItems">
													<div class="f_item flex flex_item_between">
														<div class="left paddingL30">{{item3.name}}</div>
														<div class="right">
															<i class="el-icon-lx-delete" @click="delSpec(index,index2,index3)"></i>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<el-dialog :close-on-click-modal="false" title="添加一级规格标题" :visible.sync="isShow">
								<el-input v-model="one_title" placeholder="请输入一级规格标题" maxlength="10"></el-input>
								<div slot="footer" class="dialog-footer">
									<el-button @click="isShow = false">取 消</el-button>
									<el-button type="primary" @click="addlist()">确 定</el-button>
								</div>
							</el-dialog>
							<el-dialog :close-on-click-modal="false" title="添加规格" :visible.sync="isShow2">
								<div class="add_p">
									<div>
										<el-form ref="ruleForm" label-width="100px" class="demo-ruleForm flex">
											<div class="form-box">
												<el-form-item label="规格标题" v-if="number == 2 && oneList[ind].shopWaresSpec.shopWaresSpecItems[ind2].itemName == ''">
													<el-input maxlength="10" v-model="two_title" placeholder="请输入规格标题"></el-input>
												</el-form-item>
												<el-form-item label="规格名称">
													<el-input maxlength="10" v-model="spec_name" placeholder="请输入规格名称"></el-input>
												</el-form-item>
												<el-form-item label="商品名称">
													<el-input v-model="product_name" placeholder="请输入商品名称"></el-input>
												</el-form-item>
												<el-form-item label="成本价格">
													<el-input type="number" v-model="cost" placeholder="请输入成本价格"></el-input>
												</el-form-item>
												<el-form-item label="销售价格">
													<el-input type="number" v-model="price" placeholder="请输入销售价格"></el-input>
												</el-form-item>
												<el-form-item label="商品单位">
													<el-input v-model="unit" placeholder="请输入商品单位"></el-input>
												</el-form-item>
												<el-form-item label="商品重量">
													<el-input v-model="weight" placeholder="请输入商品重量"></el-input>
												</el-form-item>
												<el-form-item label="商品尺寸">
													<el-input v-model="size" placeholder="请输入商品尺寸"></el-input>
												</el-form-item>
												<el-form-item label="库存数量">
													<el-input type="number" v-model="inventory" placeholder="请输入库存数量"></el-input>
												</el-form-item>
												<el-form-item label="产品图片">
													<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:300*300像素，最多1张</div>
													<el-upload :action="imgStr" :data="query" list-type="picture-card" :limit="1" :on-success="productSuccess"
													 :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-preview="handleProductPreview"
													 :on-remove="productRemove">
														<i class="el-icon-plus"></i>
													</el-upload>
													<el-dialog :visible.sync="showProductImg" append-to-body>
														<img width="100%" :src="productImg" alt="">
													</el-dialog>
												</el-form-item>
											</div>
										</el-form>
									</div>
								</div>
								<div slot="footer" class="dialog-footer">
									<el-button @click="isShow2 = false">取 消</el-button>
									<el-button type="primary" @click="addlist2()">预 览</el-button>
								</div>
							</el-dialog>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	import {
		upLoadImg,
		delImg
	} from '../../../api/index.js';
	import previews from './previews.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'setSpec',
		computed: {
			...mapState(['imgUrl', 'imgStr']), //显示state的数据
		},
		props: ['info', 'num'],
		components: {
			previews,
		},
		data() {
			return {
				productImg: '', //预览产品图片路径
				productUrl: '', //后台返回的产品图片路径
				showProductImg: false, //是否显示产品图片预览
				query: { //上传图片固定参数
					data: "{'flag': '3'}"
				},
				one_title: '', //一级规格名称
				two_title: '', //二级规格名称
				spec_name: '', //规格名称
				product_name: '', //商品名称
				cost: '', //成本价格
				price: '', //销售价格
				unit: '', //商品单位
				weight: '', //商品重量
				size: '', //商品尺寸
				inventory: 0, //库存数量
				oneList: [],
				number: '',
				ind: '',
				ind2: '',
				ind3: '',
				isShow: false,
				isShow2: false,
			}
		},
		methods: {
			productSuccess(res, file) { //产品图片上传成功
				this.productUrl = res.data;
			},
			handleProductPreview(file) { //产品图片预览
				this.productImg = file.url;
				this.showProductImg = true;
			},
			productRemove(file, fileList) { //产品图片删除
				var query = {
					data: {
						imgPath: file.response.data
					}
				};
				delImg(query).then(res => {
					this.productUrl = '';
				});
				// this.productUrl = '';
			},
			beforeAvatarUpload(file) {
				const isLt3M = file.size / 1024 / 1024 < 3;

				if (!isLt3M) {
					this.$message.error('上传头像图片大小不能超过 3MB!');
				}
				return isLt3M;
			},
			handleExceed(files, fileList) {
				this.$message.warning(`上传文件超出限制`);
			},
			//添加一级规格
			addlist() {
				if (this.one_title != '') {
					var data = {
						shopWaresSpec: {
							specName: this.one_title,
							hint: "",
							shopWaresSpecItems: []
						}
					}
					this.oneList.push(data);
					this.isShow = false;
					this.one_title = '';
				} else {
					this.$message('还未输入');
				}
			},

			addSpec(number, index, index2) {
				this.two_title = '';
				this.spec_name = '';
				this.product_name = '';
				this.price = '';
				this.cost = '';
				this.inventory = 0;
				this.size = '';
				this.unit = '';
				this.weight = '';
				this.isShow2 = true;
				this.number = number;
				this.ind = index;
				this.ind2 = index2;
			},
			addlist2() {
				this.isShow2 = false;
				if (this.number == 1) {
					var data = {
						name: this.spec_name,
						waresName: this.product_name,
						price: this.price,
						costPrice: this.cost,
						waresImg: this.productUrl,
						stockNumber: this.inventory,
						type: 4,
						itemName: "",
						waresCompany: this.unit,
						waresSize: this.size,
						waresWeight: this.weight,
						shopWaresSpecItemItems: []
					}
					var list = this.oneList;
					list[this.ind].shopWaresSpec.shopWaresSpecItems.push(data)
					this.oneList = list;
				} else if (this.number == 2) {
					if (this.oneList[this.ind].shopWaresSpec.shopWaresSpecItems[this.ind2].itemName == '' && this.oneList[this.ind].shopWaresSpec
						.shopWaresSpecItems[this.ind2].shopWaresSpecItemItems == '') {
						this.oneList[this.ind].shopWaresSpec.shopWaresSpecItems[this.ind2].itemName = this.two_title;
						if (this.spec_name != '') {
							var data = {
								name: this.spec_name,
								waresName: this.product_name,
								price: this.price,
								costPrice: this.cost,
								waresImg: this.productUrl,
								stockNumber: this.inventory,
								waresCompany: this.unit,
								waresSize: this.size,
								waresWeight: this.weight,
								type: this.two_title
							}
							var list = this.oneList
							this.oneList[this.ind].shopWaresSpec.shopWaresSpecItems[this.ind2].shopWaresSpecItemItems.push(data)
							this.oneList = list;
						}

					} else {
						if (this.spec_name != '') {
							var data = {
								name: this.spec_name,
								waresName: this.product_name,
								price: this.price,
								costPrice: this.cost,
								waresImg: this.productUrl,
								stockNumber: this.inventory,
								waresCompany: this.unit,
								waresSize: this.size,
								waresWeight: this.weight,
								type: this.oneList[this.ind].shopWaresSpec.shopWaresSpecItems[this.ind2].itemName
							}
							var list = this.oneList
							this.oneList[this.ind].shopWaresSpec.shopWaresSpecItems[this.ind2].shopWaresSpecItemItems.push(data)
							this.oneList = list;
						}
					}
				}
			},

			delSpec(index, index2, index3) {
				if (index >= 0) {
					if (typeof(index2) === "undefined" && typeof(index3) === "undefined") {
						if (this.oneList.length > 0) {
							this.oneList.splice(index, 1)
						} else {
							this.oneList = [];
						}
					} else if (index2 >= 0) {
						if (typeof(index3) === "undefined") {
							if (this.oneList[index].shopWaresSpec.shopWaresSpecItems.length > 0) {
								this.oneList[index].shopWaresSpec.shopWaresSpecItems.splice(index2, 1)
							} else {
								this.oneList[index].shopWaresSpec.shopWaresSpecItems = [];
							}
						}
						if (index3 >= 0) {
							if (this.oneList[index].shopWaresSpec.shopWaresSpecItems[index2].shopWaresSpecItemItems.length > 0) {
								this.oneList[index].shopWaresSpec.shopWaresSpecItems[index2].shopWaresSpecItemItems.splice(index3, 1);
							} else {
								this.oneList[index].shopWaresSpec.shopWaresSpecItems[index2].shopWaresSpecItemItems = [];
							}
						}
					}
				}
			}
		}

	}
</script>

<style>
	.spec_content {
		padding: 40px 0;
	}

	.spec .spec_right {
		border: 1px solid #EBEEF5;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: #303133;
		margin-top: 15px;
		height: 450px;
	}

	.spec .spec_right .f_item {
		padding: 10px 20px;
		border-bottom: 1px solid #EBEEF5;
	}

	.spec .spec_right .f_item .right i {
		margin-left: 10px;
	}
</style>
