<!-- addGoods 添加商品 -->
<template>
	<div>
		<div class="container">
			<div>
				<el-steps :active="active" finish-status="finish ">
					<el-step title="选择产品"></el-step>
					<el-step title="基础信息"></el-step>
					<el-step title="设置规格"></el-step>
					<el-step title="选择赠品"></el-step>
					<el-step title="附加收费"></el-step>
					<el-step title="图文介绍"></el-step>
					<el-step title="参加活动"></el-step>
					<el-step title="添加完成"></el-step>
				</el-steps>
			</div>
			<div>
				<goods ref="Goods_a" :num="active" v-show="active == 1"></goods>
				<goods-info ref="Goods_b" :num="active" v-show="active == 2"></goods-info>
				<set-spec ref="Goods_c" :info="gosInfo" :num="active" v-show="active == 3"></set-spec>
				<free ref="Goods_d" :num="active" v-show="active == 4"></free>
				<charges ref="Goods_e" :num="active" v-show="active == 5"></charges>
				<image-txt ref="Goods_f" :num="active" v-show="active == 6"></image-txt>
				<activity ref="Goods_g" :num="active" v-show="active == 7"></activity>
				<end ref="Goods_h" :num="active" v-show="active == 8"></end>
			</div>
			<div style="text-align: center;">
				<el-button v-if="active != 1 && active != 8" @click="last">上一步</el-button>
				<el-button v-if="active != 8" type="primary" @click="next">下一步</el-button>
				<el-button v-if="active == 8" type="success" @click="submit">完成</el-button>
			</div>
		</div>

	</div>

</template>

<script>
	import goods from '../../common/addGoods/goods.vue'
	import goodsInfo from '../../common/addGoods/goods_info.vue'
	import setSpec from '../../common/addGoods/set_spec.vue'
	import free from '../../common/addGoods/free.vue'
	import charges from '../../common/addGoods/charges.vue'
	import activity from '../../common/addGoods/activity.vue'
	import imageTxt from '../../common/addGoods/image_txt.vue'
	import end from '../../common/addGoods/end.vue'
	import {
		addShopWaresInfo,
		getShopWares,
		updShopWaresInfo,
		shopProductCategoryt,
		getMerchandiseCategories 
	} from '../../../api/index';
	import {
		mapState
	} from 'vuex'
	import {
		Compress,
		Decompress
	} from '../../../utils/utils.js'
	//先导入pako
	import pako from 'pako'
	export default {
		name: 'basetable',
		computed: {
			...mapState(['imgUrl', 'accountId']), //显示state的数据
		},
		components: {
			goods,
			free,
			charges,
			activity,
			goodsInfo,
			setSpec,
			imageTxt,
			end
		},
		data() {
			return {
				active: 1,
				id: '',
				webDescribe: '',
				waresId: '',
				giftId: '',
				expenseId: '',
				promotionId: '',
				gosInfo: '',
				specDate: ''
			}
		},
		methods: {
			submit() {
				this.$message({
					message: '操作成功',
					type: 'success'
				});
				this.$router.push({
					path: '/goods_list',
					query: {
						status: 1
					}
				})
				this.active = 1;
				this.webDescribe = '';
				this.waresId = '';
				this.giftId = '';
				this.expenseId = '';
				this.promotionId = '';
				this.gosInfo = '';
				this.specDate = '';
				this.$refs.Goods_c.productUrl = '',
				this.$refs.Goods_c.productRemove()
				// this.$router.push('/goods_list')
				// this.$message.error('错了哦，这是一条错误消息');
			},
			//添加商品
			addGoodsInfo() {
				// var arr = [];
				// arr[0] = this.specDate;
				var banner = [];
				if (this.gosInfo.bannerUrl != '') {
					banner = this.gosInfo.bannerUrl;
				}
				//商品分类
				var waresType = 0;
				if (this.$refs.Goods_a.goodsType == "产品") {
					waresType = 1;
				} else if (this.$refs.Goods_a.goodsType == "服务") {
					waresType = 2;
				}
				//商品排序
				if (this.gosInfo.waresSort == '') {
					var waresSort = 0;
				} else {
					var waresSort = this.gosInfo.waresSort
				}
				//库存数量
				if (this.gosInfo.stockNumber == '') {
					var stockNumber = 0;
				} else {
					var stockNumber = this.gosInfo.stockNumber;
				}
				//分类ID
				if (this.gosInfo.classifyId == 0 && this.gosInfo.categoryId != 0) {
					var categoryId = this.gosInfo.categoryId;
				} else if (this.gosInfo.classifyId != 0 && this.gosInfo.categoryId == 0) {
					var categoryId = this.gosInfo.classifyId;
				}
				//价格
				if (this.gosInfo.waresPriceScope == '') {
					var waresPriceScope = 0;
				} else {
					var waresPriceScope = this.gosInfo.waresPriceScope;
				}
				var query = {
					data: {
						//创建商品账号ID
						createAccountId:localStorage.getItem('account_id'),
						// createAccountId: this.accountId,
						//产品/服务ID
						waresId: this.waresId,
						//商品名称
						waresName: this.gosInfo.waresName,
						//单位
						waresCompany: this.gosInfo.waresCompany,
						//商品轮播图图片
						waresImg: banner.toString(),
						//缩略图片
						waresThumbnail: this.gosInfo.breviaryUrl,
						//海报图片
						posterImg: this.gosInfo.posterUrl,
						//商品价格范围
						waresPriceScope: waresPriceScope,
						//广告语
						slogan: this.gosInfo.slogan,
						//销售价格
						price: 0,
						//商品排序
						waresSort: waresSort,
						//库存数量
						stockNumber: stockNumber,
						//销售数量
						saleNumber: 0,
						//搜索关键字
						reachKeywords: this.gosInfo.reachKeywords,
						//售后承诺
						salePromise: this.gosInfo.salePromise,
						//商品标签
						waresLabel: this.gosInfo.waresLabel,
						//销售时长
						saleDuration: 0,
						//商品种类
						waresType: waresType,
						//赠品ID
						giftId: this.giftId,
						//活动ID
						promotionId: this.promotionId,
						//附加收费ID
						expenseId: this.expenseId,
						//产品分类
						categoryId: categoryId,
						//规格列表
						data: this.specDate,
						//商品图文介绍
						webDescribe: this.webDescribe,
					}
				};
				addShopWaresInfo(query).then(res => {
					if (res.code == 1) {
						this.active = 8;
					}
				});
			},
			//修改商品
			changeGoodsInfo() {
				// var arr = [];
				// arr[0] = this.specDate;
				var banner = [];
				if (this.gosInfo.bannerUrl != '') {
					banner = this.gosInfo.bannerUrl;
				}
				//商品分类
				var waresType = 0;
				if (this.$refs.Goods_a.goodsType == "产品") {
					waresType = 1;
				} else if (this.$refs.Goods_a.goodsType == "服务") {
					waresType = 2;
				}
				//商品排序
				if (this.gosInfo.waresSort == '') {
					var waresSort = 0;
				} else {
					var waresSort = this.gosInfo.waresSort
				}
				//库存数量
				if (this.gosInfo.stockNumber == '') {
					var stockNumber = 0;
				} else {
					var stockNumber = this.gosInfo.stockNumber;
				}
				//分类ID
				if (this.gosInfo.classifyId == 0 && this.gosInfo.categoryId != 0) {
					var categoryId = this.gosInfo.categoryId;
				} else if (this.gosInfo.classifyId != 0 && this.gosInfo.categoryId == 0) {
					var categoryId = this.gosInfo.classifyId;
				}
				//价格
				if (this.gosInfo.waresPriceScope == '') {
					var waresPriceScope = 0;
				} else {
					var waresPriceScope = this.gosInfo.waresPriceScope;
				}
				var query = {
					data: {
						//商品ID
						id: this.id,
						//产品/服务ID
						waresId: this.waresId,
						//商品名称
						waresName: this.gosInfo.waresName,
						//单位
						waresCompany: this.gosInfo.waresCompany,
						//商品轮播图片
						waresImg: banner.toString(),
						//缩略图片
						waresThumbnail: this.gosInfo.breviaryUrl,
						//海报图片
						posterImg: this.gosInfo.posterUrl,
						//商品价格范围
						waresPriceScope: waresPriceScope,
						//广告语
						slogan: this.gosInfo.slogan,
						//销售价格
						price: 0,
						//商品排序
						waresSort: waresSort,
						//库存数量
						stockNumber: stockNumber,
						//销售数量
						saleNumber: 0,
						//搜索关键字
						reachKeywords: this.reachKeywords,
						//售后承诺
						salePromise: this.salePromise,
						//商品标签
						waresLabel: this.gosInfo.waresLabel,
						//销售时长
						saleDuration: 0,
						//商品种类
						waresType: waresType,
						//赠品ID
						giftId: this.giftId,
						//活动ID
						promotionId: this.promotionId,
						//附加收费ID
						expenseId: this.expenseId,
						//产品分类
						categoryId: categoryId,
						//规格列表
						data: this.specDate,
						//商品图文介绍
						webDescribe: this.webDescribe,
					}
				};
				updShopWaresInfo(query).then(res => {
					if (res.code == 1) {
						this.active = 8;
					}
				});
			},
			next() {
				if (this.active == 1) {
					//产品信息
					if (this.$refs.Goods_a.goodsAData == '') {
						this.$message.error("请选择商品");
						return;
					}
					let goos_list = this.$refs.Goods_a.goodsAData;
					this.$refs.Goods_b.goodsType = this.$refs.Goods_a.goodsType;
					this.$refs.Goods_b.form.contractOneList = this.$refs.Goods_a.contractOneList;
					var narA = goos_list;
					var arrB = [];
					narA.map((item, index) => {
						arrB.push(item.id)
					})
					this.waresId = arrB.toString()
				}
				if (this.active == 2) {
					//商品信息
					this.gosInfo = this.$refs.Goods_b.form;
					if (this.gosInfo.waresSort < 0 || this.gosInfo.stockNumber < 0) {
						this.$message.error("禁止输入负数");
						return;
					}
					if (this.$refs.Goods_b.goodsType == "产品") {
						if (this.gosInfo.classifyOneName == '') {
							this.$message.error("请选择分类");
							return;
						}
						if (this.gosInfo.classifyTwoName == '') {
							this.$message.error("请选择分类");
							return;
						}
						if (this.gosInfo.classifyThreeName == '') {
							this.$message.error("请选择分类");
							return;
						}
					} else if (this.$refs.Goods_b.goodsType == "服务") {
						if (this.gosInfo.contractOne == '') {
							this.$message.error("请选择分类");
							return;
						}
						if (this.gosInfo.contractTwo == '') {
							this.$message.error("请选择分类");
							return;
						}
						if (this.gosInfo.contractThree == '') {
							this.$message.error("请选择分类");
							return;
						}
					}
				}
				if (this.active == 3) {
					//规格信息
					this.specDate = this.$refs.Goods_c.oneList;
				}
				if (this.active == 4) {
					//赠品信息
					let goos_list = this.$refs.Goods_d.goodsAData;
					var narA = goos_list;
					var arrB = [];
					narA.map((item, index) => {
						arrB.push(item.giftId)
					})
					this.giftId = arrB.toString()
					// console.log(this.giftId)
				}
				if (this.active == 5) {
					//附加收费信息
					let goos_list = this.$refs.Goods_e.goodsAData;
					var narA = goos_list;
					var arrB = [];
					narA.map((item, index) => {
						arrB.push(item.id)
					})
					this.expenseId = arrB.toString()
					// console.log(this.expenseId)
				}
				if (this.active == 6) {
					//图文信息
					this.webDescribe = this.$refs.Goods_f.html;
				}

				if (this.active == 7) {
					//参加活动信息
					let goos_list = this.$refs.Goods_g.goodsAData;
					var narA = goos_list;
					var arrB = [];
					narA.map((item, index) => {
						arrB.push(item.activityId)
					})
					this.promotionId = arrB.toString()
					if (this.$route.query.type == 1 || !this.$route.query.type) {
						// alert("新增")
						this.addGoodsInfo()
					} else if (this.$route.query.type == 2) {
						// alert("编辑")
						this.changeGoodsInfo()
					}
				}
				if (this.active++ >= 7) {
					this.active = 7;
				};
			},
			last() {
				if (this.active-- < 2) this.active = 1;
			},
			// 获取产品分类
			productCategory(type, screen, id) {
				var query = {
					data: {
						parentId: id
					}
				};
				shopProductCategoryt(query).then(res => {
					if (res.code == 1) {
						// console.log(res)
						if (type == "一级") {
							this.$refs.Goods_b.form.classifyOne = res.data;
							for (var i = 0; i < res.data.length; i++) {
								if (res.data[i].id == screen) {
									// console.log(res.data.[i])
									this.$refs.Goods_b.form.classifyId = screen;
									this.$refs.Goods_b.form.classifyOneName = res.data. [i].name;
								}
							}
						} else if (type == "二级") {
							this.$refs.Goods_b.form.classifyTwo = res.data;
							for (var i = 0; i < res.data.length; i++) {
								if (res.data[i].id == screen) {
									// console.log(res.data.[i])
									this.$refs.Goods_b.form.classifyId = screen;
									this.$refs.Goods_b.form.classifyTwoName = res.data. [i].name;
								}
							}
						} else if (type == "三级") {
							this.$refs.Goods_b.form.classifyThree = res.data;
							for (var i = 0; i < res.data.length; i++) {
								if (res.data[i].id == screen) {
									// console.log(res.data.[i])
									this.$refs.Goods_b.form.classifyId = screen;
									this.$refs.Goods_b.form.classifyThreeName = res.data. [i].name;
								}
							}
						}
					}
				});
			},
			//编辑商品详情
			getData() {
				var query = {
					data: {
						waresId: this.id,
					}
				};
				getShopWares(query).then(res => {
					if (res.code == 1) {
						//产品列表
						this.$refs.Goods_a.goodsAData = res.data.shopProducts;
						if (res.data.waresType == 1) {
							this.$refs.Goods_a.goodsType = '产品';
						}
						if (res.data.waresType == 2) {
							this.$refs.Goods_a.goodsType = '服务';
						}
						//商品信息
						//商品名称
						this.$refs.Goods_b.form.waresName = res.data.waresName;


						//一二级产品类型
						// console.log(res.data.waresType)
						if (res.data.waresType == 1) {
							if (!res.data.categoryIds && typeof(res.data.categoryIds) != 'undefined' && res.data.categoryIds != 0) {} else {

								var arr = res.data.categoryIds.split(',');
								var str = res.data.categoryId;
								if (arr[0] == "0" && str != '') {
									this.productCategory("一级", res.data.categoryId, 0);
								}
								if (arr.length > 1) {
									this.productCategory("一级", arr[0], 0);
									this.productCategory("二级", arr[1], arr[0]);
									if (str != '') {
										this.productCategory("三级", res.data.categoryId, arr[1]);
									}
								}
							}
						}
						if (res.data.waresType == 2) {
							
							var query = {
								data: {
									waresType: 2
								}
							};
							getMerchandiseCategories(query).then(item => {
								if (item.code == 1) {
									this.$refs.Goods_a.contractOneList = item.data;
									if (!res.data.categoryIds && typeof(res.data.categoryIds) != 'undefined' && res.data.categoryIds != 0) {} else {
										var str = res.data.categoryId;
										var arr = res.data.categoryIds.split(',');
										if (arr.length > 1) {
											item.data.map(item => {
												if (item.id == arr[0]) {
													this.$refs.Goods_b.form.categoryId = item.id;
													this.$refs.Goods_b.form.contractOne = item.name;
													this.$refs.Goods_b.form.contractTwoList = item.kidList;
													this.$refs.Goods_b.form.contractTwoList.map((i) => {
														if (i.id == arr[1]) {
															this.$refs.Goods_b.form.categoryId = i.id;
															this.$refs.Goods_b.form.contractTwo = i.name;
															this.$refs.Goods_b.form.contractThreeList = i.kidList;
															this.$refs.Goods_b.form.contractThreeList.map((j) => {
																if (j.id == str) {
																	this.$refs.Goods_b.form.categoryId = j.id;
																	this.$refs.Goods_b.form.contractThree = j.name;
																}
															})
														}
													})
												}
											})
										}
									}
								}
							});
						}

						//单位
						this.$refs.Goods_b.form.waresCompany = res.data.waresCompany;
						//商品排序
						this.$refs.Goods_b.form.waresSort = res.data.waresSort;
						//价格范围
						this.$refs.Goods_b.form.waresPriceScope = res.data.waresPriceScope;
						//广告语
						this.$refs.Goods_b.form.slogan = res.data.slogan;
						//库存数量
						this.$refs.Goods_b.form.stockNumber = res.data.stockNumber;
						//搜索关键字
						this.$refs.Goods_b.form.reachKeywords = res.data.reachKeywords;
						//售后承诺
						this.$refs.Goods_b.form.salePromise = res.data.salePromise;
						// console.log(this.$refs.Goods_b.form)
						//商品标签
						if (!res.data.waresLabel && typeof(res.data.waresLabel) != 'undefined' && res.data.waresLabel != 0) {
							// console.log(res.data.waresLabel)
						} else {
							if (res.data.waresLabel != '') {
								this.$refs.Goods_b.dynamicTags = res.data.waresLabel.split(',');
							}

						}
						// console.log(this.$refs.Goods_b.form)
						//后台返回的缩略图路径
						if (!res.data.waresThumbnail && typeof(res.data.waresThumbnail) != 'undefined' && res.data.waresThumbnail != 0) {
							// console.log(res.data.waresThumbnail)
						} else {
							this.$refs.Goods_b.form.breviaryUrl = res.data.waresThumbnail;
							if (res.data.waresThumbnail != '') {
								var urlStr = res.data.waresThumbnail.split(',');
								urlStr.forEach(item => {
									let obj = new Object();
									obj.url = this.imgUrl + item;
									this.$refs.Goods_b.form.breviaryFileList.push(obj);
								});
							} else {
								this.$refs.Goods_b.form.breviaryFileList = [];
							}
						}

						// console.log(res.data.waresThumbnail)
						// console.log(this.$refs.Goods_b.form.breviaryFileList)

						//后台返回的轮播图路径
						if (!res.data.waresImg && typeof(res.data.waresImg) != 'undefined' && res.data.waresImg != 0) {
							// console.log(res.data.waresImg)
						} else {
							this.$refs.Goods_b.form.bannerUrl = res.data.waresImg.split(',');
							if (res.data.waresImg != '') {
								var urlStr2 = res.data.waresImg.split(',');
								urlStr2.forEach(item => {
									let obj = new Object();
									obj.url = this.imgUrl + item;
									this.$refs.Goods_b.form.bannerFileList.push(obj);
								});
							} else {
								this.$refs.Goods_b.form.bannerFileList = [];
							}

						}
						//后台返回的海报路径
						if (!res.data.posterImg && typeof(res.data.posterImg) != 'undefined' && res.data.posterImg != 0) {
							// console.log(res.data.posterImg)
						} else {
							this.$refs.Goods_b.form.posterUrl = res.data.posterImg;
							if (res.data.posterImg != '') {
								var urlStr3 = res.data.posterImg.split(',');
								urlStr3.forEach(item => {
									let obj = new Object();
									obj.url = this.imgUrl + item;
									this.$refs.Goods_b.form.posterFileList.push(obj);
								});
							} else {
								this.$refs.Goods_b.form.posterFileList = [];
							}
						}

						//规格信息
						this.$refs.Goods_c.oneList = res.data.data;
						//赠品信息
						this.$refs.Goods_d.goodsAData = res.data.shopGifts;
						//附加收费信息
						this.$refs.Goods_e.goodsAData = res.data.shopExpenseItems;
						//图文信息
						this.$refs.Goods_f.content = res.data.webDescribe;

						//参加活动信息
						this.$refs.Goods_g.goodsAData = res.data.shopActivity;

					}
				});
			},
			// unzip(b64Data) {
			//   var strData = atob(b64Data)
			//   // Convert binary string to character-number array
			//   var charData = strData.split('').map(function(x) { return x.charCodeAt(0) })
			//   // Turn number array into byte-array
			//   var binData = new Uint8Array(charData)
			//   // // unzip
			//   var data = pako.inflate(binData)
			//   // Convert gunzipped byteArray back to ascii string:
			//   strData = String.fromCharCode.apply(null, new Uint16Array(data))
			//   return strData
			// }
		},
		watch: {
			'$route.path': function(newVal, oldVal) {
				
				//产品列表
				this.$refs.Goods_a.goodsAData = [];
				//商品信息
				//商品名称
				this.$refs.Goods_b.form.waresName = '';
				this.$refs.Goods_b.form.classifyId = 0;
				this.$refs.Goods_b.form.classifyOne = '';
				this.$refs.Goods_b.form.classifyOneName = '';
				this.$refs.Goods_b.form.classifyTwo = '';
				this.$refs.Goods_b.form.classifyTwoName = '';
				this.$refs.Goods_b.form.classifyThree = '';
				this.$refs.Goods_b.form.classifyThreeName = '';
				//单位
				this.$refs.Goods_b.form.waresCompany = '';
				//商品排序
				this.$refs.Goods_b.form.waresSort = '';
				//价格范围
				this.$refs.Goods_b.form.waresPriceScope = '';
				//广告语
				this.$refs.Goods_b.form.slogan = '';
				//库存数量
				this.$refs.Goods_b.form.stockNumber = '';
				//搜索关键字
				this.$refs.Goods_b.form.reachKeywords = ';'
				//售后承诺
				this.$refs.Goods_b.form.salePromise = '';
				// console.log(this.$refs.Goods_b.form)
				//商品标签
				this.$refs.Goods_b.dynamicTags = [];
				// console.log(this.$refs.Goods_b.form)
				//后台返回的缩略图路径
				this.$refs.Goods_b.form.breviaryUrl = '';
				this.$refs.Goods_b.form.breviaryFileList = [];

				//后台返回的轮播图路径
				this.$refs.Goods_b.form.bannerUrl = [];
				this.$refs.Goods_b.form.bannerFileList = [];
				//后台返回的海报路径
				this.$refs.Goods_b.form.posterUrl = '';
				this.$refs.Goods_b.form.posterFileList = [];

				//规格信息
				this.$refs.Goods_c.oneList = [];
				//赠品信息
				this.$refs.Goods_d.goodsAData = [];
				//附加收费信息
				this.$refs.Goods_e.goodsAData = [];
				//图文信息
				this.$refs.Goods_f.content = '';
				//参加活动信息
				this.$refs.Goods_g.goodsAData = [];
				if (this.$route.query.type == 1) {
					// alert("新增")

				} else if (this.$route.query.type == 2) {
					// alert("编辑1")
					this.id = this.$route.query.id;
					this.getData()
				}
			}
		},
		created() {
			this.active = 1;
			this.webDescribe = '';
			this.waresId = '';
			this.giftId = '';
			this.expenseId = '';
			this.promotionId = '';
			this.gosInfo = '';
			this.specDate = '';
			if (this.$route.query.type) {
				if (this.$route.query.type == 2) {
					// alert("编辑2")
					this.id = this.$route.query.id;
					this.getData()
				}
			}

		}

	};
</script>

<style scoped>

</style>
