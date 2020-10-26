<template>
	<div class="add_p">
		<div>
			<el-form :model="storeInfo" ref="storeInfo" label-width="100px" class="demo-ruleForm flex">
				<div class="form-box">
					<el-form-item label="店铺名称" class="big-input">
						<el-input v-model="storeInfo.name" placeholder="请输入店铺名称"></el-input>
					</el-form-item>
					<el-form-item label="店铺状态">
						<el-select v-model="storeStatusName" placeholder="默认" @change="selectTwo">
							<el-option key="0" label="资料待完善" value="0"></el-option>
							<el-option key="1" label="营业中" value="1"></el-option>
							<el-option key="2" label="整改中" value="2"></el-option>
							<el-option key="3" label="盘点中" value="3"></el-option>
							<el-option key="4" label="已关闭" value="4"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="店铺类别">
						<el-select v-model="shopStoreCategoryName" placeholder="请选择" @change="selectOne">
							<el-option v-for="(item,index) in shopStoreCategory" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="合作社ID" class="big-input">
						<el-input v-model="storeInfo.name" placeholder="请输入合作社ID"></el-input>
					</el-form-item>
					<el-form-item label="合作社名称" class="big-input">
						<el-input v-model="storeInfo.cooperativeName" placeholder="请输入合作社名称"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" class="big-input">
						<el-input type="number" v-model="storeInfo.contactsTel" maxlength="11" placeholder="请输入联系电话"></el-input>
					</el-form-item>
					<el-form-item label="联系人" class="big-input">
						<el-input v-model="storeInfo.contactsName" placeholder="请输入联系人名称"></el-input>
					</el-form-item>
				<!-- 	<el-form-item label="联系邮箱" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入联系邮箱"></el-input>
					</el-form-item> -->
					<el-form-item label="客服ID号" class="big-input">
						<el-input v-model="storeInfo.chatId" placeholder="请输入客服ID号"></el-input>
					</el-form-item>
					<el-form-item label="法人身份证正反面">
						<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
						<el-upload 
						:action="imgStr" 
						:data="query" 
						list-type="picture-card" 
						:limit="2" 
						:before-upload="beforeAvatarUpload" 
						:on-exceed="handleExceed" 
						:on-success="bannerSuccess" 
						:on-preview="handleBannerPreview"
						:on-remove="bannerRemove" 
						:file-list="bannerFileList">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="showBannerImg" append-to-body>
							<img width="100%" v-for="item in bannerImg" :src="imgUrl+item" alt="">
						</el-dialog>
					</el-form-item>
				</div>
				<div class="form-box add_form">
					<el-form-item label="店铺Logo">
						<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
						<el-upload 
						:action="imgStr" 
						:data="query" 
						:limit="1" 
						list-type="picture-card" 
						:before-upload="beforeAvatarUpload"
						:on-exceed="handleExceed" 
						:on-success="breviarySuccess" 
						:on-preview="handleBreviaryPreview" 
						:on-remove="breviaryRemove" 
						:file-list="breviaryFileList">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="showBreviaryImg" append-to-body>
							<img width="100%" :src="imgUrl+breviaryImg" alt="">
						</el-dialog>
					</el-form-item>
					
					<el-form-item label="营业执照">
						<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
						<el-upload 
						:action="imgStr" 
						:data="query" 
						:limit="1" 
						list-type="picture-card" 
						:before-upload="beforeAvatarUpload"
						:on-exceed="handleExceed" 
						:on-success="posterSuccess" 
						:on-preview="handlePosterPreview"
						:on-remove="posterRemove" 
						:file-list="posterFileList">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="showPosterImg" append-to-body>
							<img width="100%" :src="imgUrl+posterImg" alt="">
						</el-dialog>
					</el-form-item>
								
					
					<el-form-item label="实体店地址" class="big-input">
						<seach-map :infoAddress="storeInfo.contactsAddress" :infolonlat="storeInfo.longitudeLatitude" ref="map"></seach-map>
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
		getStoreByUserId,
		getShopStoreCategory,
		updStore
	} from '../../../api/index';
	import seachMap from '../map/seach_map.vue'
	import { mapState } from 'vuex'
	export default {
		name: "addStore",
		components: {
			seachMap
		},
		computed:{
		     ...mapState(['accountId','imgUrl','imgStr']),  //显示state的数据
		    },
		data() {
			return {
				query: { //上传图片固定参数
					data: "{'flag': '3'}"
				},
				// dialogImageUrl: '',
				// dialogVisible: false,
				storeInfo:'',
				ruleForm: {
					name: '',
					region: '',
					type: [],
					resource: '',
					desc: ''
				},
				shopStoreCategory:[],
				shopStoreCategoryId:'',
				shopStoreCategoryName:'',
				storeStatus:'',
				storeStatusName:'',
				visible: false,
				
				bannerImg: [], //预览身份证路径
				bannerUrl: [], //后台返回的身份证路径
				bannerFileList:[],
				showBannerImg: false, //是否显示身份证预览
				
				breviaryImg: '', //预览店铺Logo路径
				breviaryUrl: '', //后台返回的店铺Logo路径
				breviaryFileList:[],
				showBreviaryImg: false, //是否显示店铺Logo预览
				
				posterImg: '', //预览营业执照路径
				posterUrl: '', //后台返回的营业执照路径
				posterFileList:[],
				showPosterImg: false, //是否显示营业执照预览
			}
		},
		created(){
			this.getData();
			this.storeCategory()
		},
		methods: {
			// 获取 easy-mock 的模拟数据
			getData() {
				var query = {
					data: {
						accountId: this.accountId,
					}
				};
				getStoreByUserId(query).then(res => {
					if (res.code == 1) {
						this.storeInfo = res.data;
						//身份证回显
						if(!res.data.corporateIdentityCard && typeof(res.data.corporateIdentityCard)!='undefined' && res.data.corporateIdentityCard!=0){
							// console.log(res.data.waresImg)
						}else{
							this.bannerUrl = res.data.corporateIdentityCard.split(',');
							var urlStr2 = res.data.corporateIdentityCard.split(',');
							 urlStr2.forEach(item => {
								let obj = new Object();
								obj.url = this.imgUrl+item;
								this.bannerFileList.push(obj);
							  });
						}
						//店铺logo回显
						if(!res.data.logoImg && typeof(res.data.logoImg)!='undefined' && res.data.logoImg!=0){
							// console.log(res.data.waresImg)
						}else{
							this.breviaryUrl = res.data.logoImg;
							var urlStr2 = res.data.logoImg.split(',');
							 urlStr2.forEach(item => {
								let obj = new Object();
								obj.url = this.imgUrl+item;
								this.breviaryFileList.push(obj);
							  });
						}
						//营业执照回显
						if(!res.data.businessLicense && typeof(res.data.businessLicense)!='undefined' && res.data.businessLicense!=0){
							// console.log(res.data.waresImg)
						}else{
							this.posterUrl = res.data.businessLicense;
							var urlStr2 = res.data.businessLicense.split(',');
							 urlStr2.forEach(item => {
								let obj = new Object();
								obj.url = this.imgUrl+item;
								this.posterFileList.push(obj);
							  });
						}
						
						
						//营业执照回显
						if(!res.data.storeStatus && typeof(res.data.storeStatus)!='undefined' && res.data.storeStatus!=0){
							// console.log(res.data.waresImg)
						}else{
							// console.log(res.data.storeStatus)
							this.storeStatus = res.data.storeStatus;
							if(res.data.storeStatus == 0){
								this.storeStatusName = '资料待完善';
							}
							if(res.data.storeStatus == 1){
								this.storeStatusName = '营业中';
							}
							if(res.data.storeStatus == 2){
								this.storeStatusName = '整改中';
							}
							if(res.data.storeStatus == 3){
								this.storeStatusName = '盘点中';
							}
							if(res.data.storeStatus == 4){
								this.storeStatusName = '已关闭';
							}
						}
						
						//营业执照回显
						if(!res.data.categoryId && typeof(res.data.categoryId)!='undefined' && res.data.categoryId!=0){
							// console.log(res.data.waresImg)
						}else{
							// console.log(res.data.storeStatus)
							this.shopStoreCategoryId = res.data.categoryId;
							this.shopStoreCategoryName = res.data.categoryName;
						}
						this.$refs.map.mapinfo.map = res.data.longitudeLatitude;
						this.$refs.map.mapinfo.address = res.data.contactsAddress;
						
						
					}
				});
			},
			submitForm() {
				var mapa = this.$refs.map.mapinfo;
				if(this.shopStoreCategoryId == ''){
					var categoryId = 0;
				}else{
					var categoryId = this.shopStoreCategoryId;
				}
				if(this.storeInfo.chatId == ''){
					var chatId = 0;
				}else{
					var chatId = this.storeInfo.chatId;
				}
				var query = {
					data: {
						id: this.storeInfo.id,
						name: this.storeInfo.name,
						storeStatus: this.storeStatus,
						categoryId: categoryId,
						logoImg: this.breviaryUrl,
						createAccountId: this.accountId,
						contactsName: this.storeInfo.contactsName,
						contactsTel: this.storeInfo.contactsTel,
						contactsAddress: mapa.address,
						longitudeLatitude: mapa.map.toString(),
						contactsIdCard:this.storeInfo.contactsIdCard,
						webDescribe:this.storeInfo.webDescribe,
						chatId: chatId,
						businessScope: this.storeInfo.businessScope,
						corporateIdentityCard: this.bannerUrl.toString(),
						businessLicense: this.posterUrl,
						cooperative:this.storeInfo.cooperative,
						cooperativeName:this.storeInfo.cooperativeName,
					}
				};
				updStore(query).then(res => {
					if (res.code == 1) {
						this.$emit('cancel');
						this.$emit('addaucceed');
					}
				});
			},
	
			
			posterSuccess(res, file) { //海报图片上传成功
				this.posterUrl = res.data;
			},
			handlePosterPreview(file) { //海报图片预览
				this.posterImg = file.url;
				this.showPosterImg = true;
			},
			posterRemove(file, fileList) { //海报图片删除
				this.posterUrl = '';
			},
			
			breviarySuccess(res, file) { //缩略图片上传成功
				this.breviaryUrl = res.data;
				// console.log(this.form.breviaryUrl)
			},
			handleBreviaryPreview(file) { //缩略图片预览
				this.breviaryImg = file.url;
				this.showBreviaryImg = true;
			},
			breviaryRemove(file, fileList) { //缩略图片删除
				this.breviaryUrl = '';
			},
			
			bannerSuccess(res, file) { //轮播图片上传成功
				
				this.bannerUrl.push(res.data);
				console.log(this.bannerUrl)
			},
			handleBannerPreview(file) { //轮播图片预览
				this.bannerImg.push(file.url);
				this.showBannerImg = true;
			},
			bannerRemove(file, fileList) { //轮播图片删除
				this.bannerUrl = [];
				for(var i=0;i<fileList.length;i++){
					this.bannerUrl.push(fileList[i].response.data)
				}
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
			selectOne(e) {
				this.shopStoreCategoryId = e;
			},
			selectTwo(e) {
				this.storeStatus = e;
			},
			// 获取店铺类别
			storeCategory() {
				var query = {
					data: ''
				};
				getShopStoreCategory(query).then(res => {
					if (res.code == 1) {
						this.shopStoreCategory = res.data;
					}
				});
			},
			
			// handleRemove(file, fileList) {
			// 	console.log(file, fileList);
			// },
			// handlePictureCardPreview(file) {
			// 	this.dialogImageUrl = file.url;
			// 	this.dialogVisible = true;
			// },
			resetForm() {
				this.$emit('cancel');
			}
		}
	}
</script>

<style>
	.add_btn{
		position: absolute;
		bottom: 0;
		right: 5%;
	}
	
</style>
