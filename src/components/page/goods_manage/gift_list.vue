<!-- gift_list 赠品列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" class="flex flex_wrap" label-width="80px">
					<el-form-item label="赠品">
						<el-input v-model="giftName" placeholder="输入产品名称/ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="赠品类型">
						<div class="flex flex_wrap">
							<el-select v-model="giftTypeStr" placeholder="默认" @change="giftTypeCil" class="handle-select mr10">
								<el-option
								  v-for="(item,index) in giftTypeList"
								  :key="item.type"
								  :label="item.val"
								  :value="index">
								</el-option>
							</el-select>
							<el-select v-model="giftSortStr" placeholder="默认" @change="giftSortCil" class="handle-select mr10">
								<el-option
								  v-for="(item,index) in giftSortList"
								  :key="item.type"
								  :label="item.val"
								  :value="index">
								</el-option>
							</el-select>
							
						</div>
					</el-form-item>
					<el-form-item label="赠品来源">
						<div class="flex flex_wrap">
							<el-select v-model="giftSourceStr" placeholder="默认" @change="giftSourceCil" class="handle-select mr10">
								<el-option
								  v-for="(item,index) in giftSourceList"
								  :key="item.type"
								  :label="item.val"
								  :value="index">
								</el-option>
							</el-select>
						</div>

					</el-form-item>
					<el-form-item label="数量">
						<el-input type="number" v-model="giftNum" placeholder="输入库存数量" class="handle-input mr10"></el-input>
					</el-form-item>
				</el-form>
				<div>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</div>
			</div>
			<div class="handle-box">
				<el-button type="primary" @click="handleAdd">添加</el-button>
				<!-- <el-button type="info">删除</el-button> -->
			</div>
			<el-table height="555" :data="tableData.data" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="giftId" label="赠品ID" width="120" align="center"></el-table-column>
				<el-table-column prop="giftName" label="赠品名称" width="200"></el-table-column>
				<el-table-column label="赠品类型" width="200">
					<template slot-scope="scope">
						<span v-if="scope.row.giftType == 1">商品使用工具</span>
						<span v-if="scope.row.giftType == 2">券类</span>
						<span v-if="scope.row.giftType == 3">手工艺品</span>
						<span v-if="scope.row.giftType == 4">农产品</span>
						<span v-if="scope.row.giftType == 5">日用品</span>
						<span v-if="scope.row.giftType == 6">小礼品</span>
						<span v-if="scope.row.giftType == 7">其他</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" width="170"></el-table-column>
				<el-table-column label="赠品价值" width="100">
					<template slot-scope="scope">￥{{scope.row.giftPrice}}</template>
				</el-table-column>
				<el-table-column label="赠品图片" align="center" width="100">
					<template slot-scope="scope">
						<el-image 
						class="table-td-thumb" 
						:src="imgUrl+scope.row.giftImg" 
						@click.stop="handleClickItem" 
						:preview-src-list="[imgUrl+scope.row.giftImg]"></el-image>
					</template>
				</el-table-column>
				<el-table-column label="赠品来源" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.giftSource == 1">他人赠送</span>
						<span v-if="scope.row.giftSource == 2">货物抵扣</span>
						<span v-if="scope.row.giftSource == 3">手工艺品</span>
						<span v-if="scope.row.giftSource == 4">农产品</span>
						<span v-if="scope.row.giftSource == 5">日用品</span>
					</template>
				</el-table-column>
				<el-table-column label="赠品单位" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.giftCompany == 1">个</span>
						<span v-if="scope.row.giftCompany == 2">项</span>
						<span v-if="scope.row.giftCompany == 3">米</span>
						<span v-if="scope.row.giftCompany == 4">公里</span>
						<span v-if="scope.row.giftCompany == 5">斤</span>
						<span v-if="scope.row.giftCompany == 6">箱</span>
						<span v-if="scope.row.giftCompany == 7">套</span>
					</template>
				</el-table-column>
				<el-table-column prop="giftNum" label="赠品数量" align="center" width="100"></el-table-column>

				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next"
				 :page-count="pageTotal" :page-size="10" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<el-dialog :close-on-click-modal="false" title="添加赠品" :visible.sync="dialogVisible" width="30%">
			<div>
				<div class="handle-box">
					<el-form ref="giftItem" :model="giftItem" label-width="80px">
						<el-form-item label="赠品名称">
							<el-input v-model="giftItem.giftName" placeholder="输入赠品名称"></el-input>
						</el-form-item>
						<el-form-item label="赠品类型">
							<div>
								<el-select v-model="giftItem.giftTypeStr" placeholder="默认" @change="editGiftTypeCil" class="handle-select mr10">
									<el-option
									  v-for="(item,index) in giftItem.giftTypeList"
									  :key="item.type"
									  :label="item.val"
									  :value="index">
									</el-option>
								</el-select>
								<el-select v-model="giftItem.giftSortStr" placeholder="默认" @change="editGiftSortCil" class="handle-select mr10">
									<el-option
									  v-for="(item,index) in giftItem.giftSortList"
									  :key="item.type"
									  :label="item.val"
									  :value="index">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item label="赠品价值">
							<el-input type="number" v-model="giftItem.giftPrice" placeholder="输入赠品市场价"></el-input>
						</el-form-item>
						<el-form-item label="赠品来源">
							<div>
								<el-select v-model="giftItem.giftSourceStr" placeholder="默认" @change="editGiftSourceCil" class="handle-select mr10">
									<el-option
									  v-for="(item,index) in giftItem.giftSourceList"
									  :key="item.type"
									  :label="item.val"
									  :value="index">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item label="赠品单位">
							<div>
								<el-select v-model="giftItem.giftCompanyStr" placeholder="默认" @change="editGiftCompanyCil" class="handle-select mr10">
									<el-option
									  v-for="(item,index) in giftItem.giftCompanyList"
									  :key="item.type"
									  :label="item.val"
									  :value="index">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item label="赠品数量">
							<el-input type="number" v-model="giftItem.giftNum" placeholder="输入赠品数量"></el-input>
						</el-form-item>
						<el-form-item label="赠品图片" prop="region">
							<div>图片大小不能超过3M 建议尺寸：300*300像素，最多1张</div>
							<div class="flex">
							<!-- 	<el-image
									v-if="giftItem.giftImg != ''"
									style="width: 148px; height: 148px; margin-right: 10px;"
									:src="giftItem.giftImg" />
								</el-image> -->
								<el-upload 
								:action="imgStr" 
								:data="query" 
								list-type="picture-card" 
								:limit="1" 
								ref="my-upload" 
								:on-success="productSuccess" 
								:before-upload="beforeAvatarUpload" 
								:on-exceed="handleExceed" 
								:on-preview="handleProductPreview"
								:on-remove="productRemove"
								:file-list="giftImgList">
									<i class="el-icon-plus"></i>
								</el-upload>
							</div>
							<el-dialog :visible.sync="showProductImg" append-to-body>
								<img width="100%" :src="productImg" alt="">
							</el-dialog>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 认</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		fetchData,
		listShopGift,
		delShopGift,
		selShopGift,
		updShopGift,
		addShopGift
	} from '../../../api/index';
	import select from '../../../../public/select.json'
	import { mapState } from 'vuex'
	export default {
		name: 'giftList',
		computed:{
			...mapState(['imgUrl','accountId','imgStr']),  //显示state的数据
		},
		data() {
			return { 
				giftName:'',  //赠品名称
				giftType:0,   //赠品类型
				giftTypeStr:'',   //赠品类型文字
				giftTypeList:select.giftTypeList,
				
				giftSort:0,   //类型分类
				giftSortStr:'',   
				giftSortList:'',   
				
				giftSource:0,   //赠品来源
				giftSourceStr:'',   
				giftSourceList:select.giftSourceList,   
				giftNum:'',   //赠品数量
				page:1,
				pageTotal: 0,
				tableData: [],
				
				productImg: '', //预览产品图片路径
				productUrl: '', //后台返回的产品图片路径
				giftImgList:[],  //赠品图片
				showProductImg: false, //是否显示产品图片预览
				query: { //上传图片固定参数
					data: "{'flag': '3'}"
				},
				// 单个赠品详情
				giftItem:{
					giftId:'',  //赠品编号
					type:'',      //1是添加  2是编辑
					giftName:'',  //赠品名称
					giftType:0,   //赠品类型
					giftTypeStr:'',   //赠品类型文字
					giftTypeList:select.giftTypeList,
					
					giftSort:0,   //类型分类
					giftSortStr:'',   
					giftSortList:'',   
					
					giftSource:0,   //赠品来源
					giftSourceStr:'',   
					giftSourceList:select.giftSourceList,
					
					giftCompany:0,   //单位
					giftCompanyStr:'',   
					giftCompanyList:select.giftCompanyList,
					giftPrice:'',  //赠品单价
					giftNum:'',  //赠品数量
					giftImg:'',  //赠品图片
					storeId:''   //店铺ID
				},
				
				
				dialogVisible: false,
				dialogImageUrl:'',
				multipleSelection: [],
				delList: [],
				form: {},
				idx: -1,
				id: -1,
				value1: [],
			};
		},
		created() {
			this.getData();
		},
		methods: {
			handleClickItem() {
				// 获取遮罩层dom
				var domImageMask = '';
				var time = setTimeout(function(){
					domImageMask = document.querySelector(".el-image-viewer__mask");
					if (!domImageMask) {
						return;
					}
					domImageMask.addEventListener("click", () => {
						// 点击遮罩层时调用关闭按钮的 click 事件
						document.querySelector(".el-image-viewer__close").click();
						clearTimeout(time);
					});
				},100)
			},
			//点发送
			submit(){
				if(this.giftItem.type == 1){
					//添加
					this.addGift()
					// addShopGift
				}else if(this.giftItem.type == 2){
					//编辑
					this.editGift()
				}
			},
			//添加请求
			addGift(){
				var item = this.giftItem;
				if(item.giftName == ''){
					this.$message.error('请输入赠品名称');
					return
				}
				if(item.giftType == 0){
					this.$message.error('请选择赠品类型');
					return
				}
				if(item.giftPrice == ''){
					this.$message.error('请输入赠品价格');
					return
				}
				if(item.giftSource == 0){
					this.$message.error('请选择赠品来源');
					return
				}
				if(item.giftCompany == 0){
					this.$message.error('请选择赠品单位');
					return
				}
				if(item.giftNum == 0){
					this.$message.error('请输入赠品数量');
					return
				}
				if(item.giftPrice < 0 || item.giftNum < 0){
					this.$message.error("禁止输入负数");
					return;
				}
			
				var img = '';
				if(item.giftImg != ''){
					img = item.giftImg
				}else{
					img = this.productUrl
				}
				var query = {
					data:{
						accountId:this.accountId,
						giftName:item.giftName,
						giftType:item.giftType,
						giftSort:item.giftSort,
						giftPrice:item.giftPrice,
						giftSource:item.giftSource,
						giftCompany:item.giftCompany,
						giftNum:item.giftNum,
						giftImg:img,
					}
				};
				addShopGift(query).then(res => {
					if(res.code == 1){
						this.dialogVisible = false;
						this.$refs['my-upload'].clearFiles();
						this.productUrl = '';
						this.productImg = '';
						this.giftImgList = [];
						this.$message.success('添加成功');
						this.getData()
					}
				});
			},
			//编辑请求
			editGift(){
				var item = this.giftItem;
				if(item.giftName == ''){
					this.$message.error('请输入赠品名称');
					return
				}
				if(item.giftType == 0){
					this.$message.error('请选择赠品类型');
					return
				}
				if(item.giftPrice == ''){
					this.$message.error('请输入赠品价格');
					return
				}
				if(item.giftSource == 0){
					this.$message.error('请选择赠品来源');
					return
				}
				if(item.giftCompany == 0){
					this.$message.error('请选择赠品单位');
					return
				}
				if(item.giftNum == 0){
					this.$message.error('请输入赠品数量');
					return
				}
				if(item.giftPrice < 0 || item.giftNum < 0){
					this.$message.error("禁止输入负数");
					return;
				}
							
				var img = '';
				if(item.giftImg != ''){
					img = item.giftImg
				}else{
					img = this.productUrl
				}
				var query = {
					data:{
						giftId:item.giftId,
						giftName:item.giftName,
						giftType:item.giftType,
						giftSort:item.giftSort,
						giftPrice:item.giftPrice,
						giftSource:item.giftSource,
						giftCompany:item.giftCompany,
						giftNum:item.giftNum,
						giftImg:img,
						storeId:item.storeId,
					}
				};
				updShopGift(query).then(res => {
					if(res.code == 1){
						this.dialogVisible = false;
						this.$refs['my-upload'].clearFiles();
						this.productUrl = '';
						this.productImg = '';
						this.giftImgList = [];
						this.$message.success('修改成功');
						this.getData()
					}
				});
			},
			productSuccess(res, file) { //产品图片上传成功
				this.giftItem.giftImg = "";
				this.productUrl = res.data;
			},
			handleProductPreview(file) { //产品图片预览
				this.productImg = file.url;
				this.showProductImg = true;
			},
			productRemove(file, fileList) { //产品图片删除
				this.productUrl = '';
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
			//点击添加
			handleAdd(){
				this.dialogVisible = true;
				this.giftImgList = [];
				// 单个赠品详情
				this.giftItem = {
					giftId:'',  //赠品编号
					type:1,      //1是添加  2是编辑
					giftName:'',  //赠品名称
					giftType:0,   //赠品类型
					giftTypeStr:'',   //赠品类型文字
					giftTypeList:select.giftTypeList,
					
					giftSort:0,   //类型分类
					giftSortStr:'',   
					giftSortList:'',   
					
					giftSource:0,   //赠品来源
					giftSourceStr:'',   
					giftSourceList:select.giftSourceList,
					
					giftCompany:0,   //单位
					giftCompanyStr:'',   
					giftCompanyList:select.giftCompanyList,
					giftPrice:'',  //赠品单价
					giftNum:'',  //赠品数量
					giftImg:'',  //赠品图片
					storeId:''   //店铺ID
				};
			},
			//查看编辑
			handleEdit(index, row) {
				this.dialogVisible = true;
				var query = {
					data:{
						shopGiftId:row.giftId
					}
				};
				selShopGift(query).then(res => {
					if(res.code == 1){
						var list = '';
						var listStr = '';
						if(res.data.giftSort != 0){
							list = select.giftTypeList[res.data.giftType - 1].data;
							listStr = list[res.data.giftSort - 1].val
						}
						// 单个赠品详情
						this.giftItem = {
							type:2,  //赠品名称
							giftId:res.data.giftId,
							giftName:res.data.giftName,  //赠品名称
							giftType:res.data.giftType,   //赠品类型
							giftTypeStr:select.giftTypeList[res.data.giftType - 1].val,   //赠品类型文字
							giftTypeList:select.giftTypeList,
							
							giftSort:res.data.giftSort,   //类型分类
							giftSortStr:listStr,   
							giftSortList:list,   
							
							giftSource:res.data.giftSource,   //赠品来源
							giftSourceStr:select.giftSourceList[res.data.giftSource - 1].val,   
							giftSourceList:select.giftSourceList,
							
							giftCompany:res.data.giftCompany,   //单位
							giftCompanyStr:select.giftCompanyList[res.data.giftCompany-1].val,   
							giftCompanyList:select.giftCompanyList,
							
							giftPrice:res.data.giftPrice,  //赠品单价
							giftNum:res.data.giftNum,  //赠品数量
							giftImg:res.data.giftImg,  //赠品图片
							storeId:res.data.storeId   //店铺ID
						};
						//产品图片
						var urlStr = res.data.giftImg.split(',');
						urlStr.forEach(item => {
							let obj = new Object();
							obj.url = this.imgUrl+item;
							this.giftImgList.push(obj);
						});
					}
				});
			},
			//编辑赠品类型
			editGiftTypeCil(e){
				this.giftItem.giftType = this.giftItem.giftTypeList[e].type;
				this.giftItem.giftSort = 0;
				this.giftItem.giftSortStr = '';
				if(this.giftItem.giftTypeList[e].data){
					this.giftItem.giftSortList = this.giftItem.giftTypeList[e].data;
				}else{
					this.giftItem.giftSortList = '';
				}
			},
			//编辑赠品类型分类
			editGiftSortCil(e){
				this.giftItem.giftSort = this.giftItem.giftSortList[e].type;
			},
			//编辑赠品来源
			editGiftSourceCil(e){
				this.giftItem.giftSource = this.giftItem.giftSourceList[e].type;
			},
			//编辑赠品单位
			editGiftCompanyCil(e){
				this.giftItem.giftCompany = this.giftItem.giftCompanyList[e].type;
			},
			//搜索赠品类型
			giftTypeCil(e){
				this.giftType = this.giftTypeList[e].type;
				this.giftSort = 0;
				this.giftSortStr = '';
				if(this.giftTypeList[e].data){
					this.giftSortList = this.giftTypeList[e].data;
				}else{
					this.giftSortList = '';
				}
			},
			//搜索赠品类型分类
			giftSortCil(e){
				this.giftSort = this.giftSortList[e].type;
			},
			//搜索赠品来源
			giftSourceCil(e){
				this.giftSource = this.giftSourceList[e].type;
			},
			// 获取列表
			getData() {
				var query = {
					data:{
						// accountId:localStorage.getItem('account_id'),
						accountId:this.accountId,
						giftName:this.giftName,
						giftType:this.giftType,
						giftSort:this.giftSort,  		 
						giftSource:this.giftSource,  	 
						giftNum:this.giftNum ? this.giftNum : -1,  	 
						nowPage:this.page,
						pageCount:9,
					}
				};
				listShopGift(query).then(res => {
					if(res.code == 1){
						this.tableData = res;
						this.pageTotal = res.allPage;
					}
				});
			},
			// 触发搜索按钮
			handleSearch() {
				this.page = 1;
				this.getData();
			},
			// 分页导航
			handlePageChange(val) {
				this.page = val;
				this.getData();
			},
			
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var query = {
							data:{
								shopGiftId:row.giftId
							}
						};
						delShopGift(query).then(res => {
							if(res.code == 1){
								this.$message.success('删除成功');
								// this.tableData.data.splice(index, 1);
								this.getData();
							}
						});
					})
					.catch(() => {});
			},
		}
	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 200px;
		display: inline-block;
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>
