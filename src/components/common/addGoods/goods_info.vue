<template>
	<div class="info">
		<div class="item">
			<div>
				<div class="">
					<el-form ref="form" :model="form" label-width="100px">
						<el-form-item label="商品名称">
							<el-input v-model="form.waresName" maxlength="30" class="big-input"></el-input>
							<div style="color: #7B7979; font-size: 14px;">
								<i class="el-icon-lx-info"></i>
								<span>
									可以包括品牌、名称、规格等内容，字数限30个汉字
								</span>
							</div>
						</el-form-item>

						<el-form-item label="产品分类" v-if="goodsType == '产品'">
							<div class="flex flex_wrap">
								<el-select v-model="form.classifyOneName" placeholder="请选择" @change="selectOne" class="handle-select mr10">
									<el-option v-for="(item,index) in form.classifyOne" :key="item.id" :label="item.name" :value="index">
									</el-option>
								</el-select>
								<el-select v-model="form.classifyTwoName" placeholder="请选择" @change="selectTwo" class="handle-select mr10">
									<el-option v-for="(item,index) in form.classifyTwo" :key="item.id" :label="item.name" :value="index">
									</el-option>
								</el-select>
								<el-select v-model="form.classifyThreeName" placeholder="请选择" @change="selectThree" class="handle-select mr10">
									<el-option v-for="(item,index) in form.classifyThree" :key="item.id" :label="item.name" :value="index">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item label="服务分类" v-if="goodsType == '服务'">
							<div class="flex flex_wrap">

								<el-select v-model="form.contractOne" @change="selectOneb" placeholder="请选择" class="handle-select mr10">
									<el-option v-for="(item,index) in form.contractOneList" :key="item.id" :label="item.name" :value="index">
									</el-option>
								</el-select>
								<el-select v-model="form.contractTwo" @change="selectTwob" placeholder="请选择" class="handle-select mr10">
									<el-option v-for="(item,index) in form.contractTwoList" :key="item.id" :label="item.name" :value="index">
									</el-option>
								</el-select>
								<el-select v-model="form.contractThree" @change="selectThreeb" placeholder="请选择" class="handle-select mr10">
									<el-option v-for="(item,index) in form.contractThreeList" :key="item.id" :label="item.name" :value="index">
									</el-option>
								</el-select>
							</div>
						</el-form-item>

						<el-form-item label="商品单位">
							<el-input v-model="form.waresCompany" placeholder="请输入单位名称" class="big-input"></el-input>
						</el-form-item>

						<el-form-item label="商品排序">
							<el-input type="number" v-model="form.waresSort" :min="0" :max="100" class="handle-input"></el-input>
							<div style="color: #7B7979; font-size: 14px;display: inline;margin-left: 10px;">
								<i class="el-icon-lx-info"></i>
								<span> 输入1,2,3.....,.默认按从小到大排序</span>
							</div>
						</el-form-item>
						<el-form-item label="缩略图片">
							<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:300*300像素，最多1张</div>
							<el-upload :action="imgStr" :data="query" list-type="picture-card" :limit="1" :on-success="breviarySuccess"
							 :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-preview="handleBreviaryPreview" :on-remove="breviaryRemove"
							 :file-list="form.breviaryFileList">
								<i class="el-icon-plus"></i>
							</el-upload>

							<el-dialog :visible.sync="form.showBreviaryImg" append-to-body>
								<img width="100%" :src="form.breviaryImg" alt="">
							</el-dialog>
						</el-form-item>

						<el-form-item label="轮播图">
							<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:1080*900像素，最多6张</div>
							<el-upload :action="imgStr" :data="query" list-type="picture-card" :limit="6" :on-success="bannerSuccess"
							 :on-preview="handleBannerPreview" :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-remove="bannerRemove"
							 :file-list="form.bannerFileList">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="form.showBannerImg" append-to-body>
								<img width="100%" v-for="item in form.bannerImg" :src="item" alt="">
							</el-dialog>
						</el-form-item>
						<el-form-item label="价格">
							<el-input type="number" v-model="form.waresPriceScope" placeholder="请输入商品价格" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="广告语">
							<el-input v-model="form.slogan" placeholder="请输入一句广告语" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="库存数">
							<el-input type="number" v-model="form.stockNumber" :min="0" :max="100" placeholder="请输入库存数" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="搜索关键字">
							<el-input v-model="form.reachKeywords" placeholder="输入多个关健字，用小写逗号分开，例:花生，多味，月饼" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="售后承诺">
							<el-input v-model="form.salePromise" placeholder="输入服务承诺。例:7天无理由退货，保质30天" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="商品标签">
							<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
								{{tag}}
							</el-tag>
							<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
							 @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
							</el-input>
							<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
							<div style="color: #7B7979; font-size: 14px;display: inline;margin-left: 10px;">
								<i class="el-icon-lx-info"></i>
								<span> 最多添加8个</span>
							</div>
						</el-form-item>
						<el-form-item label="商品海报" prop="region">
							<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:1080*1980像素，最多1张</div>
							<el-upload :action="imgStr" :data="query" list-type="picture-card" :limit="1" :on-success="posterSuccess"
							 :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-preview="handlePosterPreview" :on-remove="posterRemove"
							 :file-list="form.posterFileList">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="form.showPosterImg" append-to-body>
								<img width="100%" :src="form.posterImg" alt="">
							</el-dialog>
						</el-form-item>
					</el-form>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import {
		upLoadImg,
		shopProductCategoryt,
		delImg
	} from '../../../api/index.js';
	import {
		mapState
	} from 'vuex'
	import select from '../../../../public/select.json'
	export default {
		name: 'info',
		computed: {
			...mapState(['imgUrl', 'imgStr']), //显示state的数据
		},
		props: ['num'],
		data() {
			return {
				query: { //上传图片固定参数
					data: "{'flag': '3'}"
				},
				form: {
					waresName: '', //商品名称

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

					waresCompany: '', //单位
					unitList: select.unitList, //单位列表
					waresSort: '', //商品排序
					waresPriceScope: '', //价格范围
					slogan: '', //广告语
					stockNumber: '', //库存数量
					reachKeywords: '', //搜索关键字
					salePromise: '', //售后承诺
					waresLabel: '', //商品标签

					breviaryImg: '', //预览缩略图路径
					breviaryUrl: '', //后台返回的缩略图路径
					breviaryFileList: [],
					showBreviaryImg: false, //是否显示缩略图预览

					bannerImg: [], //预览轮播图路径
					bannerUrl: [], //后台返回的轮播图路径
					bannerFileList: [],
					showBannerImg: false, //是否显示轮播图预览

					posterImg: '', //预览海报路径
					posterUrl: '', //后台返回的海报路径
					posterFileList: [],
					showPosterImg: false, //是否显示海报预览
				},
				dialogImageUrl: '',
				dialogVisible: false,
				dynamicTags: [],
				inputVisible: false,
				inputValue: '',
				goodsType: '产品'
			};
		},
		created() {
			this.productCategory()
			// this.productCategoryb();
		},
		methods: {
			selectOneb(index) {
				//选择一级
				this.form.categoryId = this.form.contractOneList[index].id;
				this.form.contractOne = this.form.contractOneList[index].name;
				this.form.contractTwoList = this.form.contractOneList[index].kidList;
				// console.log(this.categoryId)
			},
			selectTwob(index) {
				//选择二级
				this.form.categoryId = this.form.contractTwoList[index].id;
				this.form.contractTwo = this.form.contractTwoList[index].name;
				this.form.contractThreeList = this.form.contractTwoList[index].kidList;
				// console.log(this.categoryId)
			},
			selectThreeb(index) {
				//选择三级
				this.form.categoryId = this.form.contractThreeList[index].id;
				this.form.contractThree = this.form.contractThreeList[index].name;
				// console.log(this.categoryId)
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
						this.form.classifyOne = res.data
					}
				});
			},
			selectOne(e) {
				var query = {
					data: {
						parentId: this.form.classifyOne[e].id
					}
				};
				shopProductCategoryt(query).then(res => {
					if (res.code == 1) {
						this.form.classifyId = this.form.classifyOne[e].id;
						this.form.classifyOneName = this.form.classifyOne[e].name;
						this.form.classifyTwo = res.data
					} else {
						this.form.classifyTwo = ''; //分类二
						this.form.classifyTwoName = '';
						this.form.classifyThree = ''; //分类三
						this.form.classifyThreeName = '';
					}
				});

			},
			selectTwo(e) {
				var query = {
					data: {
						parentId: this.form.classifyTwo[e].id
					}
				};
				shopProductCategoryt(query).then(res => {
					if (res.code == 1) {
						this.form.classifyId = this.form.classifyTwo[e].id;
						this.form.classifyTwoName = this.form.classifyTwo[e].name;

						this.form.classifyThree = res.data
					} else {
						this.form.classifyThree = ''; //分类三
						this.form.classifyThreeName = '';
					}
				});
			},
			selectThree(e) {
				this.form.classifyId = this.form.classifyThree[e].id;
				this.form.classifyThreeName = this.form.classifyThree[e].name;
			},
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
				this.form.waresLabel = this.dynamicTags.toString();
				// console.log(this.form.waresLabel)
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
					this.form.waresLabel = this.dynamicTags.toString();
				}
				this.inputVisible = false;
				this.inputValue = '';
			},

			breviarySuccess(res, file) { //缩略图片上传成功
				this.form.breviaryUrl = res.data;
				// console.log(this.form.breviaryUrl)
			},
			handleBreviaryPreview(file) { //缩略图片预览
				this.form.breviaryImg = file.url;
				this.form.showBreviaryImg = true;
			},
			breviaryRemove(file, fileList) { //缩略图片删除
				var query = {
					data: {
						imgPath: file.response.data
					}
				};
				delImg(query).then(res => {
					this.form.breviaryUrl = '';
				});

			},

			bannerSuccess(res, file) { //轮播图片上传成功
				this.form.bannerUrl.push(res.data);
			},
			handleBannerPreview(file) { //轮播图片预览
				this.form.bannerImg.push(file.url);
				this.form.showBannerImg = true;
			},
			bannerRemove(file, fileList) { //轮播图片删除
				var query = {
					data: {
						imgPath: file.response.data
					}
				};
				delImg(query).then(res => {
					this.form.bannerUrl = [];
					for (var i = 0; i < fileList.length; i++) {
						this.form.bannerUrl.push(fileList[i].response.data)
					}
				});
			},
			posterSuccess(res, file) { //海报图片上传成功
				this.form.posterUrl = res.data;
			},
			handlePosterPreview(file) { //海报图片预览
				this.form.posterImg = file.url;
				this.form.showPosterImg = true;
			},
			posterRemove(file, fileList) { //海报图片删除
				var query = {
					data: {
						imgPath: file.response.data
					}
				};
				delImg(query).then(res => {
					this.form.posterUrl = '';
				});
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
			onSubmit() {
				this.$message.success('提交成功！');
			}
		}
	}
</script>

<style>
	.info {
		padding: 50px 0;
	}

	.handle-select {
		width: 200px;
	}

	.handle-input {
		width: 200px;
		display: inline-block;
	}

	.big-input {
		width: 500px;
		display: inline-block;
	}

	.pick-input {
		width: 100px;
		display: inline-block;
	}

	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>
