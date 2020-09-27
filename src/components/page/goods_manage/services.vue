<!-- services  服务列表 -->
<template>
	<div>
		<div class="container">
			<div class="handle-box flex flex_item_between">
				<el-form ref="form" :model="form" class="flex flex-wrap" label-width="80px">
					<el-form-item label="服务名称">
						<el-input v-model="form.name" class="handle-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="服务分类">
						<div class="flex flex-wrap">
							<el-select v-model="form.one" placeholder="一类" class="handle-select mr10">
								<el-option key="bbk" label="步步高" value="bbk"></el-option>
								<el-option key="xtc" label="小天才" value="xtc"></el-option>
								<el-option key="imoo" label="imoo" value="imoo"></el-option>
							</el-select>
							<el-select v-model="form.two" placeholder="二类" class="handle-select mr10">
								<el-option key="1" label="广东省" value="广东省"></el-option>
								<el-option key="2" label="湖南省" value="湖南省"></el-option>
							</el-select>
							<el-select v-model="form.three" placeholder="三类" class="handle-select mr10">
								<el-option key="1" label="广东省" value="广东省"></el-option>
								<el-option key="2" label="湖南省" value="湖南省"></el-option>
							</el-select>
							<el-select v-model="form.four" placeholder="四类" class="handle-select mr10">
								<el-option key="1" label="广东省" value="广东省"></el-option>
								<el-option key="2" label="湖南省" value="湖南省"></el-option>
							</el-select>
						</div>

					</el-form-item>
					<el-form-item label="品牌" label-width="50px">
						<el-input v-model="form.name" class="pick-input mr10"></el-input>
					</el-form-item>
					<el-form-item label="产地" label-width="50px">
						<el-input v-model="form.name" class="pick-input mr10"></el-input>
					</el-form-item>
				</el-form>
				<block>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</block>
			</div>
			<div class="handle-box">
				<el-button type="primary" @click="open">添加</el-button>
				<el-button type="info" @click="toPage">删除</el-button>
				<!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button> -->
			</div>

			<el-table height="555" :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="服务ID" width="100" align="center"></el-table-column>
				<el-table-column prop="name" label="服务名称" width="200"></el-table-column>
				<el-table-column label="创建账号" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column label="创建时间" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column label="服务类别" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column label="服务图片" width="120" align="center">
					<template slot-scope="scope">
						<el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]"></el-image>
					</template>
				</el-table-column>
				<el-table-column label="品牌名称" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column label="收费单位" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column label="服务地址" width="120" align="center">
					<template slot-scope="scope">￥{{scope.row.money}}</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
						<el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize"
				 :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加弹出框 -->
		<el-dialog title="添加服务" :visible.sync="addProduct" width="80%">
			<div class="add_p">
				<div>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm flex">
						<div class="form-box">
							<el-form-item label="服务名称" prop="name" class="big-input">
								<el-input v-model="ruleForm.name" placeholder="请输入服务名称"></el-input>
							</el-form-item>
							<el-form-item label="服务大类" prop="region">
								<el-select v-model="ruleForm.region" placeholder="养殖">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="服务二类" prop="region">
								<el-select v-model="ruleForm.region" placeholder="养殖">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="服务三类" prop="region">
								<el-select v-model="ruleForm.region" placeholder="养殖">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="服务四类">
								<el-select v-model="ruleForm.region" placeholder="养殖">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="服务图片" prop="region">
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
							</el-form-item>
							<el-form-item label="品牌名称" class="big-input">
								<el-input v-model="ruleForm.name" placeholder="请输入产品名称"></el-input>
							</el-form-item>
							<el-form-item label="收费单位">
								<el-select v-model="ruleForm.region" placeholder="斤">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="服务时间" class="big-input">
								<div class="block">
									<el-date-picker v-model="value1" type="daterange" @change="sendDate" range-separator="至" start-placeholder="开始日期"
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

						</div>
						<div class="form-box add_form">
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
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		fetchData
	} from '../../../api/index';
	import city from '../../../../public/city.json'
	export default {
		name: 'services',
		computed: {
			...mapState(['count'])
		},
		data() {
			return {
				city: city.options,
				dialogImageUrl: '',
				dialogVisible: false,
				query: {
					address: '',
					name: '',
					pageIndex: 1,
					pageSize: 10
				},
				tableData: [],
				value1: '',
				address: [],
				multipleSelection: [],
				delList: [],
				editVisible: false,
				addProduct: false,
				pageTotal: 0,
				form: {},
				idx: -1,
				id: -1,
				ruleForm: {
					name: '',
					region: '',
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入服务名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			console.log(this.city)
			this.getData();
		},
		methods: {
			handleChange(value) {
				console.log(label);
			},
			sendDate() {
				console.log(this.value1)
			},
			toPage() {
				this.$router.push({
					path: '/add_product'
				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
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
			open() {
				this.addProduct = true;
			},
			indexMethod(index) {
				return index + 1;
			},
			// 获取 easy-mock 的模拟数据
			getData() {
				fetchData(this.query).then(res => {
					console.log(res);
					this.tableData = res.list;
					this.pageTotal = res.pageTotal || 50;
				});
			},
			// 触发搜索按钮
			handleSearch() {
				this.$set(this.query, 'pageIndex', 1);
				this.getData();
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						this.$message.success('删除成功');
						this.tableData.splice(index, 1);
					})
					.catch(() => {});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAllSelection() {
				const length = this.multipleSelection.length;
				let str = '';
				this.delList = this.delList.concat(this.multipleSelection);
				for (let i = 0; i < length; i++) {
					str += this.multipleSelection[i].name + ' ';
				}
				this.$message.error(`删除了${str}`);
				this.multipleSelection = [];
			},
			// 编辑操作
			handleEdit(index, row) {
				this.idx = index;
				this.form = row;
				this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				this.$set(this.tableData, this.idx, this.form);
			},
			// 分页导航
			handlePageChange(val) {
				this.$set(this.query, 'pageIndex', val);
				this.getData();
			}
		}
	};
</script>

<style scoped>
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

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

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

	.big-input {
		width: 600px;
		display: inline-block;
	}

	.pick-input {
		width: 100px;
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
