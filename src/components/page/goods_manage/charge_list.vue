<!-- charge_list 收费项目列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="searchForm" :model="searchForm" class="flex flex_wrap" label-width="80px">
					<el-form-item label="项目">
						<el-input v-model="searchForm.name" placeholder="输入产品名称/ID" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="项目类型">
						<div class="flex flex_wrap">
							<el-select v-model="searchForm.typeStr" placeholder="默认" @change="typeCil" class="handle-select mr10">
								<el-option
								  v-for="(item,index) in searchForm.typeList"
								  :key="item.type"
								  :label="item.val"
								  :value="index">
								</el-option>
							</el-select>
							<el-select v-model="searchForm.sortStr" placeholder="默认" @change="sortCil" class="handle-select mr10">
								<el-option
								  v-for="(item,index) in searchForm.sortList"
								  :key="item.type"
								  :label="item.val"
								  :value="item.type">
								</el-option>
							</el-select>
						</div>
					</el-form-item>
					<el-form-item label="费用类型">
						<div class="flex flex_wrap">
							<el-select v-model="searchForm.expenseTypeStr" @change="expenseTypeCil" placeholder="默认" class="handle-select mr10">
								<el-option key="1" label="增加" value="1"></el-option>
								<el-option key="2" label="减少" value="2"></el-option>
							</el-select>
						</div>

					</el-form-item>
					<el-form-item label="展示类型">
						<div class="flex flex_wrap">
							<el-select v-model="searchForm.showTypeStr" placeholder="默认" @change="showTypeCil" class="handle-select mr10">
								<el-option key="1" label="数量型" value="1"></el-option>
								<el-option key="2" label="开头型" value="2"></el-option>
							</el-select>
						</div>
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
			<el-table height="550" :data="tableData.data" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="项目ID" width="100" align="center"></el-table-column>
				<el-table-column prop="name" label="项目名称" width="300"></el-table-column>
				<el-table-column label="项目类型" width="200" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.type == 1">保险</span>
						<span v-if="scope.row.type == 2">服务</span>
						<span v-if="scope.row.type == 3">附件</span>
						<span v-if="scope.row.type == 4">耗材</span>
						<span v-if="scope.row.type == 5">配套</span>
						<span v-if="scope.row.type == 6">其他</span>
						<span v-if="scope.row.sort == 1">/伤害险</span>
						<span v-if="scope.row.sort == 2">/商品破损险</span>
						<span v-if="scope.row.sort == 3">/意外险</span>
						<span v-if="scope.row.sort == 4">/运费险</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" width="170"></el-table-column>
				<el-table-column label="项目费用" width="100">
					<template slot-scope="scope">￥{{scope.row.price}}</template>
				</el-table-column>
				<el-table-column label="费用类型" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.expenseType == 1">增加</span>
						<span v-if="scope.row.expenseType == 2">减少</span>
					</template>
				</el-table-column>
				<el-table-column label="关联商品数量" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.linkNum == 1">是</span>
						<span v-if="scope.row.linkNum == 2">否</span>
					</template>
				</el-table-column>
				<el-table-column label="展示类型" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.showType == 1">数量类</span>
						<span v-if="scope.row.showType == 2">开关类</span>
					</template>
				</el-table-column>
				

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

		<el-dialog :close-on-click-modal="false" title="添加项目" :visible.sync="dialogVisible" width="30%">
			<div>
				<div class="handle-box">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="项目名称">
							<el-input v-model="form.name" placeholder="输入项目名称"></el-input>
						</el-form-item>
						<el-form-item label="项目类型">
							<div>
								<el-select v-model="form.typeStr" placeholder="默认" @change="addTypeCil" class="handle-select mr10">
									<el-option
									  v-for="(item,index) in form.typeList"
									  :key="item.type"
									  :label="item.val"
									  :value="index">
									</el-option>
								</el-select>
								<el-select v-model="form.sortStr" placeholder="默认" @change="addSortCil" class="handle-select mr10">
									<el-option
									  v-for="(item,index) in form.sortList"
									  :key="item.type"
									  :label="item.val"
									  :value="item.type">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item label="项目费用">
							<el-input type="number" v-model="form.price" placeholder="输入项目费用"></el-input>
						</el-form-item>
						<el-form-item label="费用类型">
							<div>
								<el-select v-model="form.expenseTypeStr" @change="addExpenseTypeCil" placeholder="默认" class="handle-select mr10">
									<el-option key="1" label="增加" value="1"></el-option>
									<el-option key="2" label="减少" value="2"></el-option>
								</el-select>
							</div>
							<div style="color: #7B7979; font-size: 14px;">
								<i class="el-icon-lx-info"></i>
								<span>订单总金额上增加或减少金额</span>
							</div>
						</el-form-item>
						<el-form-item label="关联数量">
							<div>
								<el-radio v-model="form.linkNum" label="1" @change="radioCli">是</el-radio>
								<el-radio v-model="form.linkNum" label="2" @change="radioCli">否</el-radio>
							 </div>
							 <div style="color: #7B7979; font-size: 14px;">
							 	<i class="el-icon-lx-info"></i>
							 	<span>附加费用=项目费用X购买商品数量</span>
							 </div>
						</el-form-item>
						<el-form-item label="展示类型">
							<div>
								<el-select v-model="form.showTypeStr" placeholder="默认" @change="addShowTypeCil" class="handle-select mr10">
									<el-option key="1" label="数量型" value="1"></el-option>
									<el-option key="2" label="开头型" value="2"></el-option>
								</el-select>
							</div>
							<div style="color: #7B7979; font-size: 14px;">
								<i class="el-icon-lx-info"></i>
								<span>APP购物选择规格时项目费用显示方式</span>
							</div>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submit">提 交</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		fetchData,
		listShopExpenseItem,
		delShopExpenseItem,
		selShopExpenseItem,
		addShopExpenseItem,
		updShopExpenseItem
	} from '../../../api/index';
	import select from '../../../../public/select.json'
	import { mapState } from 'vuex'
	export default {
		name: 'Inventory_change',
		computed:{
		     ...mapState(['accountId']),  //显示state的数据
		    },
		data() {
			return {
				page:1,
				pageTotal: 0,
				tableData: [],
				searchForm:{
					// accountId:localStorage.getItem('account_id'),
					// accountId:this.accountId,
					name:'',
					type:0,
					typeStr:'',
					typeList:select.chargeTypeList,
					sortNum:0,
					sortStr:'',
					sortList:'',
					expenseType:0,
					expenseTypeStr:'',
					showType:0,
					showTypeStr:'',
				},
				form:{
					status:'',
					shopExpenseItemId:'',
					// accountId:localStorage.getItem('account_id'),
					// accountId:this.accountId,
					name:'',
					type:0,
					typeStr:'',
					typeList:select.chargeTypeList,
					sortNum:0,
					sortStr:'',
					sortList:'',
					price:'',
					expenseType:0,
					expenseTypeStr:'',
					linkNum:0,
					showType:0,
					showTypeStr:'',
				},
				
				
				radio: 0,
				dialogVisible: false,
				dialogImageUrl:'',
				multipleSelection: [],
				delList: [],
				idx: -1,
				id: -1,
				value1: [],
			};
		},
		created() {
			this.getData();
		},
		methods: {
			//点发送
			submit(){
				if(this.form.status == 1){
					//添加
					this.addCharge()
				}else if(this.form.status == 2){
					//编辑
					this.editCharge()
				}
			},
			//添加请求
			addCharge(){
				var item = this.form;
				if(item.name == ''){
					this.$message.error('请输入项目名称');
					return
				}
				if(item.type == 0){
					this.$message.error('请选择项目类型');
					return
				}
				if(item.price == ''){
					this.$message.error('请输入项目费用');
					return
				}
				if(item.expenseType == 0){
					this.$message.error('请选择费用类型');
					return
				}
				if(item.linkNum == 0){
					this.$message.error('请选择是否关联数量');
					return
				}
				if(item.showType == 0){
					this.$message.error('请选择展示类型');
					return
				}
				if(item.sortNum < 0 || item.price < 0){
					this.$message.error("禁止输入负数");
					return;
				}
				var query = {
					data:{
						// accountId:localStorage.getItem('account_id'),
						accountId:this.accountId,
						name:item.name,
						type:item.type,
						sort:item.sortNum,
						price:item.price,
						expenseType:item.expenseType,
						linkNum:item.linkNum,
						showType:item.showType,
					}
				};
				addShopExpenseItem(query).then(res => {
					if(res.code == 1){
						this.dialogVisible = false;
						this.$message.success('添加成功');
						this.getData()
					}
				});
			},
			//编辑请求
			editCharge(){
				if(item.sortNum < 0 || item.price < 0){
					this.$message.error("禁止输入负数");
					return;
				}
				var item = this.form;
				var query = {
					data:{
						id:item.shopExpenseItemId,
						name:item.name,
						type:item.type,
						sort:item.sortNum,
						price:item.price,
						expenseType:item.expenseType,
						linkNum:item.linkNum,
						showType:item.showType,
					}
				};
				updShopExpenseItem(query).then(res => {
					if(res.code == 1){
						this.dialogVisible = false;
						this.$message.success('修改成功');
						this.getData()
					}
				});
			},
			//点击添加
			handleAdd(){
				this.dialogVisible = true;
				// 单个赠品详情
				this.form = {
					status:1,  
					shopExpenseItemId:'',
					name:'',
					type:0,
					typeStr:'',
					typeList:select.chargeTypeList,
					sortNum:0,
					sortStr:'',
					sortList:'',
					price:'',
					expenseType:0,
					expenseTypeStr:'',
					linkNum:0,
					showType:0,
					showTypeStr:'',
				};
			},
			//编辑
			handleEdit(index, row) {
				this.dialogVisible = true;
				var query = {
					data:{
						shopExpenseItemId:row.id
					}
				};
				selShopExpenseItem(query).then(res => {
					if(res.code == 1){
						var expenseTypeStr = ';'
						if(res.data.expenseType == 1){
							expenseTypeStr = '收费'
						}else if(res.data.expenseType == 2){
							expenseTypeStr = '减免'
						}
						var showTypeStr = ';'
						if(res.data.showType == 1){
							showTypeStr = '数量型'
						}else if(res.data.showType == 2){
							showTypeStr = '开关型'
						}
						var list = '';
						var listStr = '';
						if(res.data.sort != 0){
							list = select.chargeTypeList[res.data.type - 1].data;
							listStr = list[res.data.sort - 1].val;
						}
						this.form = {
							status:2,  
							shopExpenseItemId:row.id,
							name:res.data.name,  
							type:res.data.type,   
							typeStr:select.chargeTypeList[res.data.type - 1].val, 
							typeList:select.chargeTypeList,
							sort:res.data.sort,   
							sortStr:listStr,   
							sortList:list,
							price:res.data.price,
							expenseType:res.data.expenseType,
							expenseTypeStr:expenseTypeStr,
							linkNum:JSON.stringify(res.data.linkNum),
							showType:res.data.showType,
							showTypeStr:showTypeStr,
						};
					}
				});
			},
			//编辑数量相关
			radioCli(e){
				this.form.linkNum = e;
			},
			//编辑收费类型
			addTypeCil(e){
				this.form.type = this.form.typeList[e].type;
				this.form.sortNum = 0;
				this.form.sortStr = '';
				if(this.form.typeList[e].data){
					this.form.sortList = this.form.typeList[e].data;
				}else{
					this.form.sortList = '';
				}
			},
			//编辑收费类型分类
			addSortCil(e){
				this.form.sortNum = e;
			},
			//编辑费用类型
			addExpenseTypeCil(e){
				this.form.expenseType = e;
			},
			//编辑展示类型
			addShowTypeCil(e){
				this.form.showType = e;
			},
			//收费类型
			typeCil(e){
				this.searchForm.type = this.searchForm.typeList[e].type;
				this.searchForm.sortNum = 0;
				this.searchForm.sortStr = '';
				if(this.searchForm.typeList[e].data){
					this.searchForm.sortList = this.searchForm.typeList[e].data;
				}else{
					this.searchForm.sortList = '';
				}
			},
			//收费类型分类
			sortCil(e){
				this.searchForm.sortNum = e;
			},
			//费用类型
			expenseTypeCil(e){
				this.searchForm.expenseType = e;
			},
			//展示类型
			showTypeCil(e){
				this.searchForm.showType = e;
			},
			
			// 获取 easy-mock 的模拟数据
			getData() {
				var item = this.searchForm;
				var query = {
					data:{
						accountId:this.accountId,
						name:item.name,
						type:item.type,
						sort:item.sortNum,  		 
						expenseType:item.expenseType,  	 
						showType:item.showType,	 
						nowPage:this.page,
						pageCount:9,
					}
				};
				listShopExpenseItem(query).then(res => {
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
								shopExpenseItemId:row.id
							}
						};
						delShopExpenseItem(query).then(res => {
							if(res.code == 1){
								this.$message.success('删除成功');
								this.getData();
								// this.tableData.data.splice(index, 1);
							}
						});
					})
					.catch(() => {});
			},

			// 分页导航
			handlePageChange(val) {
				this.page = val;
				this.getData();
			}
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
