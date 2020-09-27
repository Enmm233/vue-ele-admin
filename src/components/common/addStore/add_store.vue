<template>
	<div class="add_p">
		<div>
			<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm flex">
				<div class="form-box">
					<el-form-item label="店铺名称" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入店铺名称"></el-input>
					</el-form-item>
					<el-form-item label="店铺状态">
						<el-select v-model="ruleForm.region" placeholder="默认">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="店铺类别">
						<el-select v-model="ruleForm.region" placeholder="养殖">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="合作社ID" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入合作社ID"></el-input>
					</el-form-item>
					<el-form-item label="合作社名称" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入合作社名称"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入联系电话"></el-input>
					</el-form-item>
					<el-form-item label="联系人" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入联系人名称"></el-input>
					</el-form-item>
					<el-form-item label="联系邮箱" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入联系邮箱"></el-input>
					</el-form-item>
					<el-form-item label="客服ID号" class="big-input">
						<el-input v-model="ruleForm.name" placeholder="请输入客服ID号"></el-input>
					</el-form-item>
					<el-form-item label="法人身份证正反面">
						<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
						<el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
				</div>
				<div class="form-box add_form">
					<el-form-item label="店铺Logo">
						<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
						<el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="营业执照">
						<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
						<el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="实体店地址" class="big-input">
						<seach-map ref="map"></seach-map>

					</el-form-item>

					<el-form-item class="add_btn">
						<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
						<el-button @click="resetForm()">取消</el-button>
					</el-form-item>
				</div>

			</el-form>
		</div>
	</div>
</template>

<script>
	import seachMap from '../map/seach_map.vue'
	export default {
		name: "addStore",
		props: ['datainfo'],
		components: {
			seachMap
		},
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				ruleForm: {
					name: '',
					region: '',
					type: [],
					resource: '',
					desc: ''
				},
				visible: false,
			}
		},
		methods: {
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			submitForm(formName) {
				console.log(this.$refs.map.mapinfo)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {

			}
		}
	}
</script>

<style>
</style>
