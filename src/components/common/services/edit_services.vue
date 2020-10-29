<template>
	<div class="add_p">
		<div>
			<el-form ref="ruleForm" label-width="100px" class="demo-ruleForm flex">
				<div class="form-box">
					<el-form-item label="服务名称" class="big-input">
						<el-input v-model="name" placeholder="请输入服务名称"></el-input>
					</el-form-item>

					<el-form-item label="服务大类">
						<el-select v-model="contractOne" @change="selectOne" placeholder="请选择">
							<el-option v-for="(item,index) in contractOneList" :key="item.id" :label="item.name" :value="index">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="服务二类">
						<el-select v-model="contractTwo" @change="selectTwo" placeholder="请选择">
							<el-option v-for="(item,index) in contractTwoList" :key="item.id" :label="item.name" :value="index">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="服务三类">
						<el-select v-model="contractThree" @change="selectThree" placeholder="请选择">
							<el-option v-for="(item,index) in contractThreeList" :key="item.id" :label="item.name" :value="index">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="服务图片">
						<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:300*300像素，最多1张</div>
						<el-upload :action="imgStr" :data="query" list-type="picture-card" :limit="1" :on-success="productSuccess"
						 :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-preview="handleProductPreview" :on-remove="productRemove"
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
						<el-input v-model="brandName" placeholder="请输入品牌名称"></el-input>
					</el-form-item>
					<el-form-item label="收费单位">
						<el-input v-model="unit" placeholder="请输入收费单位"></el-input>
					</el-form-item>
					<el-form-item label="服务时间" class="big-input">
						<div class="block">
							<el-date-picker v-model="value1" type="daterange" @change="sendDate" range-separator="至" start-placeholder="开始日期"
							 end-placeholder="结束日期">
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="服务地址" class="big-input">
						<el-input type="textarea" v-model="detail"></el-input>
					</el-form-item>
					<el-form-item label="服务方式">
						<el-select v-model="serviceTypeStr" placeholder="默认" @change="serviceTypeCil">
							<el-option label="到店服务" value="1"></el-option>
							<el-option label="上门服务" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="服务描述" class="big-input">
						<el-input type="textarea" v-model="serviceDescribe"></el-input>
					</el-form-item>
					<el-form-item label="服务清单" class="big-input">
						<el-input type="textarea" v-model="serviceList"></el-input>
					</el-form-item>
					<el-form-item label="服务协议" class="big-input">
						<el-input type="textarea" v-model="contract"></el-input>
					</el-form-item>
					<el-form-item label="服务人员" class="big-input">
						<el-input type="number" v-model="personNumber"></el-input>
					</el-form-item>

					<el-form-item class="add_btn">
						<el-button type="primary" @click="submitForm">保存</el-button>
						<el-button @click="resetForm">取消</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		selShopService,
		getMerchandiseCategories,
		updShopService,
		delImg
	} from '../../../api/index.js';
	import select from '../../../../public/select.json'
	import {
		mapState
	} from 'vuex'
	import city from '../../../../public/city.json'
	import {
		dateFormat,
		formatterDate
	} from '../../../utils/utils';
	export default {
		name: 'info',
		computed: {
			...mapState(['imgUrl', 'accountId', 'imgStr']), //显示state的数据
		},
		props: ['shopProductId', 'editProduct'],
		data() {
			return {
				city: city.options,
				value1: [],

				productImg: '', //预览产品图片路径
				productUrl: '', //后台返回的产品图片路径
				productList: [],
				showProductImg: false, //是否显示产品图片预览

				brandImg: '', //预览品牌图片路径
				brandUrl: '', //后台返回的品牌图片路径
				brandList: [],
				showBrandImg: false, //是否显示品牌图片预览

				query: { //上传图片固定参数
					data: "{'flag': '3'}"
				},
				ruleForm: {
					name: '',
					region: '',
					type: [],
					resource: '',
					desc: ''
				},
				name: '',
				categoryId: 0,
				contractOne: '',
				contractOneList: [],
				contractTwo: '',
				contractTwoList: [],
				contractThree: '',
				contractThreeList: [],
				serviceTime: [],
				brandName: '',
				unit: '', //单位
				unitList: select.unitList, //单位列表
				// address:'',
				detail: '',
				serviceType: 0,
				serviceTypeStr: '',
				serviceDescribe: '',
				serviceList: '',
				contract: '',
				personNumber: '',
			};
		},
		created() {
			this.productCategory()
			this.getProduct(this.shopProductId)
		},
		methods: {
			// 获取产品详情
			getProduct(id) {
				this.productImg = ''; //预览产品图片路径
				this.productUrl = ''; //后台返回的产品图片路径
				this.productList = [];

				this.brandImg = ''; //预览品牌图片路径
				this.brandUrl = ''; //后台返回的品牌图片路径
				this.brandList = [];
				this.name = '';
				this.categoryId = 0;
				this.contractOne = '';
				this.contractTwo = '';
				this.contractTwoList = [];
				this.contractThree = '';
				this.contractThreeList = [];

				this.serviceTime = [];
				this.brandName = '';
				this.unit = '';
				this.detail = '';
				this.serviceType = 0;
				this.serviceTypeStr = '';
				this.serviceDescribe = '';
				this.serviceList = '';
				this.contract = '';
				this.personNumber = '';
				var query = {
					data: {
						serviceId: id
					}
				};
				selShopService(query).then(res => {
					if (res.code == 1) {
						this.name = res.data.name;
						if (res.data.serviceTime != '') {
							var list = res.data.serviceTime.split(',');
							var timeArr = [];
							list.map((item) => {
								timeArr.push(formatterDate(item))
							})
							this.value1 = timeArr;
							this.serviceTime = res.data.serviceTime;
						}
						this.brandName = res.data.brandName;
						this.unit = res.data.unit;
						this.detail = res.data.address;
						this.serviceType = res.data.serviceType;
						if (res.data.serviceType == 1) {
							this.serviceTypeStr = '到店服务';
						}
						if (res.data.serviceType == 2) {
							this.serviceTypeStr = '上门服务';
						}
						this.serviceDescribe = res.data.serviceDescribe;
						this.serviceList = res.data.serviceList;
						this.contract = res.data.contract;
						this.personNumber = res.data.personNumber;

						var str = res.data.categoryId;
						var arr = res.data.categoryIds.split(',');
						if (arr.length > 1) {
							this.contractOneList.map(item => {
								if (item.id == arr[0]) {
									this.categoryId = item.id;
									this.contractOne = item.name;
									this.contractTwoList = item.kidList;
									this.contractTwoList.map((i) => {
										if (i.id == arr[1]) {
											this.categoryId = i.id;
											this.contractTwo = i.name;
											this.contractThreeList = i.kidList;
											this.contractThreeList.map((j) => {
												if (j.id == str) {
													this.categoryId = j.id;
													this.contractThree = j.name;
												}
											})
										}
									})
								}
							})
						}
						//产品图片
						if (res.data.serviceImg) {
							this.productUrl = res.data.serviceImg;
							var urlStr = res.data.serviceImg.split(',');
							urlStr.forEach(item => {
								let obj = new Object();
								obj.url = this.imgUrl + item;
								this.productList.push(obj);
							});
						}

						//品牌图片
						if (res.data.brandImg) {
							this.brandUrl = res.data.brandImg;
							var urlStr = res.data.brandImg.split(',');
							urlStr.forEach(item => {
								let obj = new Object();
								obj.url = this.imgUrl + item;
								this.brandList.push(obj);
							});
						}

					}
				});
			},
			// 获取产品分类
			productCategory() {
				this.productList = [];
				this.brandList = [];
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
			selectOne(index) {
				//选择一级
				this.categoryId = this.contractOneList[index].id;
				this.contractTwoList = this.contractOneList[index].kidList;
				this.contractTwo = '';
				this.contractThree = '';
				this.contractThreeList = [];
				// console.log(this.categoryId)
			},
			selectTwo(index) {
				//选择二级
				this.categoryId = this.contractTwoList[index].id;
				this.contractThreeList = this.contractTwoList[index].kidList;
				this.contractThree = '';
				// console.log(this.categoryId)
			},
			selectThree(index) {
				//选择三级
				this.categoryId = this.contractThreeList[index].id;
				// console.log(this.categoryId)
			},
			//选择时间
			sendDate(e) {
				e.map((item, index) => {
					this.serviceTime.push(dateFormat("YYYY-mm-dd HH:MM:SS", item))
				})
			},
			handleChange(e) {
				//选择地址
				// console.log(e)
			},
			serviceTypeCil(e) {
				//选择服务类型
				this.serviceType = e;
				// console.log(this.serviceType)
			},


			submitForm() { //确认修改
				if (this.name == '') {
					this.$message.error('服务名称不能为空');
					return;
				}
				if (this.contractOne == '') {
					this.$message.error('服务大类不能为空');
					return;
				}
				if (this.contractTwo == '') {
					this.$message.error('服务二类不能为空');
					return;
				}
				if (this.contractThree == '') {
					this.$message.error('服务三类不能为空');
					return;
				}
				if (this.productUrl == '') {
					this.$message.error('服务图片不能为空');
					return;
				}
				if (this.personNumber < 0) {
					this.$message.error('服务人员不能为负数');
					return;
				}
				if (this.serviceTime != '') {
					var time = this.serviceTime.toString()
				} else {
					var time = '';
				}
				var query = {
					data: {
						id: this.shopProductId, //创建用户编号
						name: this.name,
						categoryId: this.categoryId,
						chargeMethodId: 0,
						serviceDescribe: this.serviceDescribe,
						serviceType: this.serviceType,
						address: this.detail,
						longitudeLatitude: '',
						materielId: '',
						duration: '',
						personNumber: this.personNumber,
						companyId: '',
						tel: '',
						serviceTime: time,
						contract: this.contract,
						serviceImg: this.productUrl,
						contractId: 0,
						serviceList: this.serviceList,
						brandImg: this.brandUrl,
						brandName: this.brandName,
						unit: this.unit,
					}
				};
				updShopService(query).then(res => {
					if (res.code == 1) {
						this.productImg = ''; //预览产品图片路径
						this.productUrl = ''; //后台返回的产品图片路径
						this.productList = [];

						this.brandImg = ''; //预览品牌图片路径
						this.brandUrl = ''; //后台返回的品牌图片路径
						this.brandList = [];
						this.name = '';
						this.categoryId = 0;
						this.contractOne = '';
						this.contractTwo = '';
						this.contractTwoList = [];
						this.contractThree = '';
						this.contractThreeList = [];
						this.serviceTime = [];
						this.brandName = '';
						this.unit = '';
						this.address = '';
						this.detail = '';
						this.serviceType = 0;
						this.serviceTypeStr = '';
						this.serviceDescribe = '';
						this.serviceList = '';
						this.contractId = '';
						this.personNumber = '';
						var data = {
							type: "成功",
							editProduct: this.editProduct
						}
						this.$emit('editProductCil', data);
					}
				});
			},

			resetForm() {
				var data = {
					type: "取消",
					editProduct: this.editProduct
				}
				this.$emit('editProductCil', data);
			},
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

			},

			brandSuccess(res, file) { //品牌图片上传成功
				this.brandUrl = res.data;
			},
			handleBrandPreview(file) { //品牌图片预览
				this.brandImg = file.url;
				this.showBrandImg = true;
			},
			brandRemove(file, fileList) { //品牌图片删除
				var query = {
					data: {
						imgPath: file.response.data
					}
				};
				delImg(query).then(res => {
					this.brandUrl = '';
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
