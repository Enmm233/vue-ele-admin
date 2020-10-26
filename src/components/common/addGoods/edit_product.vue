<template>
	<div class="add_p">
		<div>
			<el-form :model="ruleForm" label-width="100px" class="demo-ruleForm flex">
				<div class="form-box">
					<el-form-item label="产品名称" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入产品名称"></el-input>
					</el-form-item>
					<el-form-item label="产品大类">
						<el-select v-model="ruleForm.classifyOneName" @change="selectOne" placeholder="请选择">
							<el-option v-for="(item,index) in ruleForm.classifyOne" :key="item.id" :label="item.name" :value="index">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品二类">
						<el-select v-model="ruleForm.classifyTwoName" @change="selectTwo" placeholder="请选择">
							<el-option v-for="(item,index) in ruleForm.classifyTwo" :key="item.id" :label="item.name" :value="index">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品三类">
						<el-select v-model="ruleForm.classifyThreeName" @change="selectThree" placeholder="请选择">
							<el-option v-for="(item,index) in ruleForm.classifyThree" :key="item.id" :label="item.name" :value="index">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="产品图片">
						<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:300*300像素，最多1张</div>
						<el-upload 
						:action="imgStr" 
						:data="query" 
						list-type="picture-card" 
						:limit="1" 
						:on-success="productSuccess"
						 :before-upload="beforeAvatarUpload" 
						 :on-exceed="handleExceed" 
						 :on-preview="handleProductPreview" 
						 :on-remove="productRemove"
						 :file-list="productList">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="showProductImg" append-to-body>
							<img width="100%" :src="productImg" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="品牌图片">
						<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:300*300像素，最多1张</div>
						<el-upload :action="imgStr" :data="query" list-type="picture-card" :limit="1" :on-success="brandSuccess"
						 :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-preview="handleBrandPreview" :on-remove="brandRemove"
						 :file-list="brandList">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="showBrandImg" append-to-body>
							<img width="100%" :src="brandImg" alt="">
						</el-dialog>
					</el-form-item>

				</div>

				<div class="form-box add_form">

					<el-form-item label="品牌名称" class="big-input">
						<el-input v-model="ruleForm.brand" placeholder="请输入品牌名称"></el-input>
					</el-form-item>
					<el-form-item label="产品单位">
						<el-input v-model="ruleForm.unit" placeholder="输入产品单位"></el-input>
					</el-form-item>
					<el-form-item label="质保时长" class="big-input">
						<el-input v-model="ruleForm.validityTerm" placeholder="请输入质保时长"></el-input>
					</el-form-item>
					<el-form-item label="产地" class="big-input">
						<el-input v-model="ruleForm.placeOrigin" placeholder="请输入产地名称"></el-input>
					</el-form-item>
					<el-form-item label="适合人群" class="big-input">
						<el-input type="textarea" v-model="ruleForm.crowdSuits"></el-input>
					</el-form-item>
					<el-form-item label="储藏环境" class="big-input">
						<el-input type="textarea" v-model="ruleForm.useEnvironment"></el-input>
					</el-form-item>
					<el-form-item label="使用/食用方法" class="big-input">
						<el-input type="textarea" v-model="ruleForm.instructions"></el-input>
					</el-form-item>
					<el-form-item label="产品成分" class="big-input">
						<el-input type="textarea" v-model="ruleForm.composition"></el-input>
					</el-form-item>
					<el-form-item label="注意事项" class="big-input">
						<el-input type="textarea" v-model="ruleForm.dangerAlert"></el-input>
					</el-form-item>
					<el-form-item class="add_btn">
						<el-button type="primary" @click="submitForm()">保存</el-button>
						<el-button @click="resetForm()">取消</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		shopProductCategoryt,
		upLoadImg,
		getShopProduct,
		updShopProduct
	} from '../../../api/index.js';
	import select from '../../../../public/select.json'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'info',
		computed: {
			...mapState(['imgUrl', 'accountId', 'imgStr']), //显示state的数据
		},
		props: ['shopProductId', 'editProduct'],
		data() {
			return {
				productImg: '', //预览产品图片路径
				productUrl: '', //后台返回的产品图片路径
				productList: [],
				showProductImg: false, //是否显示产品图片预览

				brandImg: '', //预览品牌图片路径
				brandUrl: '', //后台返回的品牌图片路径
				brandList: [],
				showBrandImg: false, //是否显示品牌图片预览
				
				delImgs:[],
				query: { //上传图片固定参数
					data: "{'flag': '3'}"
				},

				ruleForm: {
					name: '', //产品名称
					classifyId: 0, //分类ID
					classifyOne: '', //分类一
					classifyOneName: '',
					classifyTwo: '', //分类二
					classifyTwoName: '',
					classifyThree: '', //分类三
					classifyThreeName: '',
					brand: '', //品牌名称
					unit: '', //单位
					validityTerm: '', //质保时长
					placeOrigin: '', //产地
					crowdSuits: '', //适合人群
					useEnvironment: '', //储藏环境
					instructions: '', //使用说明
					composition: '', //产品成分
					dangerAlert: '', //注意事项
				}
			};
		},
		mounted() {
			this.productCategory()
			this.getProduct(this.shopProductId)
			
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
				this.delImgs.push(file.url)
				this.productUrl = '';
			},

			brandSuccess(res, file) { //品牌图片上传成功
				this.brandUrl = res.data;
			},
			handleBrandPreview(file) { //品牌图片预览
				this.brandImg = file.url;
				this.showBrandImg = true;
			},
			brandRemove(file, fileList) { //品牌图片删除
				this.delImgs.push(file.url)
				this.brandUrl = '';
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
			submitForm() { //确认修改
				// console.log(this.ruleForm)
				var form = this.ruleForm;
				var query = {
					data: {
						id:this.shopProductId,
						name: form.name, //产品名称
						brand: form.brand, //品牌
						categoryId: form.classifyId, //分类ID
						image: this.productUrl, //产品图片
						brandLogo: this.brandUrl, //品牌图片
						thumbnail: '', //缩略图
						unit: form.unit, //单位
						material: '', //制作材料
						composition: form.composition, //产品成分
						manufacturer: '', //制造商
						placeOrigin: form.placeOrigin, //产地
						productionDate: '', //出厂日期
						validityTerm: form.validityTerm, //质保时长
						expirationDate: '', //有效截止日期
						crowdSuits: form.crowdSuits, //适合人群
						useEnvironment: form.useEnvironment, //储藏环境
						instructions: form.instructions, //使用说明
						dangerAlert: form.dangerAlert, //注意事项
						delImgs: this.delImgs.toString(), //注意事项
					}
				};
				updShopProduct(query).then(res => {
					if (res.code == 1) {
						var data = {
							type: "成功",
							editProduct: this.editProduct
						}
						this.$emit('editProductCil', data);
					}
				});
			},
			resetForm() { //取消添加
				this.productImg = ''; //预览产品图片路径
				this.productUrl = ''; //后台返回的产品图片路径
				this.productList = []; //后台返回的产品图片路径
				this.showProductImg = false; //是否显示产品图片预览
				this.brandImg = ''; //预览品牌图片路径
				this.brandUrl = ''; //后台返回的品牌图片路径
				this.brandList = []; //后台返回的品牌图片路径
				this.delImgs = [];
				this.showBrandImg = false; //是否显示品牌图片预览
				this.ruleForm.name = '';
				this.ruleForm.classifyId = 0;
				this.ruleForm.classifyOne = '';
				this.ruleForm.classifyOneName = '';
				this.ruleForm.classifyTwo = '';
				this.ruleForm.classifyTwoName = '';
				this.ruleForm.classifyThree = '';
				this.ruleForm.classifyThreeName = '';
				this.ruleForm.brand = '';
				this.ruleForm.unit = '';
				this.ruleForm.validityTerm = '';
				this.ruleForm.placeOrigin = '';
				this.ruleForm.crowdSuits = '';
				this.ruleForm.useEnvironment = '';
				this.ruleForm.instructions = '';
				this.ruleForm.composition = '';
				this.ruleForm.dangerAlert = '';
				var data = {
					type: "取消",
					editProduct: this.editProduct
				}
				this.$emit('editProductCil', data);
			},
			// 获取产品详情
			getProduct(id) {
				this.productList = []; //后台返回的产品图片路径
				this.brandList = []; //后台返回的品牌图片路径
				this.delImgs = [];
				this.ruleForm.name = '';
				this.ruleForm.classifyId = 0;
				this.ruleForm.classifyOne = '';
				this.ruleForm.classifyOneName = '';
				this.ruleForm.classifyTwo = '';
				this.ruleForm.classifyTwoName = '';
				this.ruleForm.classifyThree = '';
				this.ruleForm.classifyThreeName = '';
				this.ruleForm.brand = '';
				this.ruleForm.unit = '';
				this.ruleForm.validityTerm = '';
				this.ruleForm.placeOrigin = '';
				this.ruleForm.crowdSuits = '';
				this.ruleForm.useEnvironment = '';
				this.ruleForm.instructions = '';
				this.ruleForm.composition = '';
				this.ruleForm.dangerAlert = '';
				var query = {
					data: {
						shopProductId: id
					}
				};
				getShopProduct(query).then(res => {
					if (res.code == 1) {
							this.ruleForm.name = res.data.name; //产品名称
							this.ruleForm.brand = res.data.brand; //品牌名称
							this.ruleForm.unit = res.data.unit; //单位
							this.ruleForm.validityTerm = res.data.validityTerm; //质保时长
							this.ruleForm.placeOrigin = res.data.placeOrigin; //产地
							this.ruleForm.crowdSuits = res.data.crowdSuits; //适合人群
							this.ruleForm.useEnvironment = res.data.useEnvironment; //储藏环境
							this.ruleForm.instructions = res.data.instructions; //使用说明
							this.ruleForm.composition = res.data.composition; //产品成分
							this.ruleForm.dangerAlert = res.data.dangerAlert; //注意事项
						//一二级产品类型
						if(!res.data.categoryIds && typeof(res.data.categoryIds)!='undefined' && res.data.categoryIds!=0){
								this.productCategoryO("一级",res.data.categoryId,0);
						}else{
							var str = res.data.categoryId;
							var arr = res.data.categoryIds.split(',');
							
							if(arr[0] == "0" && str != ''){
								this.productCategoryO("一级",res.data.categoryId,0);
							}
							if(arr.length > 1){
								this.productCategoryO("一级",arr[0],0);
								this.productCategoryO("二级",arr[1],arr[0]);
								if(str != ''){
									this.productCategoryO("三级",res.data.categoryId,arr[1])
								}
							}
						}
						//产品图片
						this.productUrl = res.data.brandLogo;
						var urlStr = res.data.brandLogo.split(',');
						urlStr.forEach(item => {
							let obj = new Object();
							obj.url = this.imgUrl+item;
							this.productList.push(obj);
						});
						//品牌图片
						if (res.data.image) {
							this.brandUrl = res.data.image;
							var urlStr = res.data.image.split(',');
							urlStr.forEach(item => {
								let obj = new Object();
								obj.url = this.imgUrl+item;
								this.brandList.push(obj);
							});
						}

					}
				});
			},

			// 获取产品分类
			productCategoryO(type, screen, id) {
				this.ruleForm.classifyId = 0;
				this.ruleForm.classifyOne = '';
				this.ruleForm.classifyOneName = '';
				this.ruleForm.classifyTwo = '';
				this.ruleForm.classifyTwoName = '';
				this.ruleForm.classifyThree = '';
				this.ruleForm.classifyThreeName = '';
				var query = {
					data: {
						parentId: id
					}
				};
				shopProductCategoryt(query).then(res => {
					
					if (res.code == 1) {
						// console.log(res)
						if (type == "一级") {
							this.ruleForm.classifyOne = res.data
							for (var i = 0; i < res.data.length; i++) {
								if (res.data[i].id == screen) {
									this.ruleForm.classifyOneName = res.data.[i].name;
									this.ruleForm.classifyId = screen;
								}
							}
						} else if (type == "二级") {
							this.ruleForm.classifyTwo = res.data;
							for (var i = 0; i < res.data.length; i++) {
								if (res.data[i].id == screen) {
									// console.log(res.data.[i])
									this.ruleForm.classifyId = screen;
									this.ruleForm.classifyTwoName = res.data.[i].name;
								}
							}
						} else if (type == "三级") {
							this.ruleForm.classifyThree = res.data;
							for (var i = 0; i < res.data.length; i++) {
								if (res.data[i].id == screen) {
									// console.log(res.data.[i])
									this.ruleForm.classifyId = screen;
									this.ruleForm.classifyThreeName = res.data.[i].name;
								}
							}
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
					if (res.code == 1) {
						this.ruleForm.classifyOne = res.data
					}
				});
			},
			selectOne(e) {
				var query = {
					data: {
						parentId: this.ruleForm.classifyOne[e].id
					}
				};
				shopProductCategoryt(query).then(res => {
					this.ruleForm.classifyId = this.ruleForm.classifyOne[e].id;
					if (res.code == 1) {
						this.ruleForm.classifyTwo = res.data
					}
				});
			},
			selectTwo(e) {
				console.log(this.ruleForm.classifyTwo[e].id)
				var query = {
					data: {
						parentId: this.ruleForm.classifyTwo[e].id
					}
				};
				shopProductCategoryt(query).then(res => {
					this.ruleForm.classifyId = this.ruleForm.classifyTwo[e].id;
					if (res.code == 1) {
						this.ruleForm.classifyThree = res.data
					}
				});
			},
			selectThree(e) {
				this.ruleForm.classifyId = this.ruleForm.classifyThree[e].id;
			},
		}
	}
</script>

<style>
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
</style>
