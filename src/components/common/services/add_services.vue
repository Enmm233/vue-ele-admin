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
						<el-upload :action="imgStr" :data="query" list-type="picture-card" :limit="1"
						 :on-success="productSuccess" :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-preview="handleProductPreview"
						 :on-remove="productRemove" :file-list="productList">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="showProductImg" append-to-body>
							<img width="100%" :src="productImg" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="品牌图片">
						<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:300*300像素，最多1张</div>
						<el-upload :action="imgStr" :data="query" list-type="picture-card" :limit="1"
						 :on-success="brandSuccess" :before-upload="beforeAvatarUpload" :on-exceed="handleExceed" :on-preview="handleBrandPreview"
						 :on-remove="brandRemove" :file-list="brandList">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="showBrandImg" append-to-body>
							<img width="100%" :src="brandImg" alt="">
						</el-dialog>
					</el-form-item>
				
		<!-- 			<el-form-item label="服务图片">
						<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
						<el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="品牌图片">
						<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
						<el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item> -->
				</div>
				
				<div class="form-box add_form">
					<el-form-item label="品牌名称" class="big-input">
						<el-input v-model="brandName" placeholder="请输入产品名称"></el-input>
					</el-form-item>
					<el-form-item label="收费单位">
						<el-select v-model="unit" placeholder="选择产品单位">
							<el-option v-for="(item,index) in unitList" :key="item.name" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="服务时间" class="big-input">
						<div class="block">
							<el-date-picker 
							v-model="value1" 
							type="daterange" 
							@change="sendDate" 
							range-separator="至" 
							start-placeholder="开始日期"
							 end-placeholder="结束日期">
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="服务地址" class="big-input">
						<div class="block">
							<el-cascader v-model="address" :options="city" @change="handleChange"></el-cascader>
						</div>
					</el-form-item>
					<el-form-item label="详细地址" class="big-input">
						<el-input type="textarea" v-model="ruleForm.desc"></el-input>
					</el-form-item>
					<el-form-item label="服务方式">
						<el-select v-model="ruleForm.region" placeholder="默认">
							<el-option label="到店服务" value="shanghai"></el-option>
							<el-option label="上门服务" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="服务描述" class="big-input">
						<el-input type="textarea" v-model="ruleForm.desc"></el-input>
					</el-form-item>
					<el-form-item label="服务清单" class="big-input">
						<el-input type="textarea" v-model="ruleForm.desc"></el-input>
					</el-form-item>
					<el-form-item label="服务协议" class="big-input">
						<el-input type="textarea" v-model="ruleForm.desc"></el-input>
					</el-form-item>
					<el-form-item label="服务人员" class="big-input">
						<el-input type="textarea" v-model="ruleForm.desc"></el-input>
					</el-form-item>
	
					<el-form-item class="add_btn">
						<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
						<el-button @click="resetForm('ruleForm')">取消</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		addShopService,
		getMerchandiseCategories
	} from '../../../api/index.js';
	import select from '../../../../public/select.json'
	import { mapState } from 'vuex'
	import city from '../../../../public/city.json'
	import { dateFormat } from '../../../utils/utils';
	export default {
		name: 'info',
		computed:{
			...mapState(['imgUrl','accountId','imgStr']),  //显示state的数据
		},
		props: ['shopProductId','addProduct'],
		data() {
			return {
				city: city.options,
				value1: [],
				
				productImg: '', //预览产品图片路径
				productUrl: '', //后台返回的产品图片路径
				productList:[],
				showProductImg: false, //是否显示产品图片预览

				brandImg: '', //预览品牌图片路径
				brandUrl: '', //后台返回的品牌图片路径
				brandList:[],
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
				
				contractId:0,
				contractOne:'',
				contractOneList:[],
				contractTwo:'',
				contractTwoList:[],
				contractThree:'',
				contractThreeList:[],
				serviceTime:[],
				unit: '', //单位
				unitList: select.unitList, //单位列表
			};
		},
		created() {
			this.productCategory()
		},
		methods: {
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
			selectOne(index){
				//选择一级
				this.contractId = this.contractOneList[index].id;
				this.contractTwoList = this.contractOneList[index].kidList;
				console.log(this.contractId)
			},
			selectTwo(index){
				//选择二级
				this.contractId = this.contractTwoList[index].id;
				this.contractThreeList = this.contractTwoList[index].kidList;
				console.log(this.contractId)
			},
			selectThree(index){
				//选择三级
				this.contractId = this.contractThreeList[index].id;
				console.log(this.contractId)
			},
			
			sendDate(e) {
				e.map((item, index) => {
					this.serviceTime.push(dateFormat("YYYY-mm-dd HH:MM:SS", item))
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			productSuccess(res, file) { //产品图片上传成功
				this.productUrl = res.data;
			},
			handleProductPreview(file) { //产品图片预览
				this.productImg = file.url;
				this.showProductImg = true;
			},
			productRemove(file, fileList) { //产品图片删除
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
