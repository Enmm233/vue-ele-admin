<template>
	<div class="info">
		<div class="item">
			<div>
				<div class="">
					<el-form ref="form" :model="form" label-width="100px">
						<el-form-item label="商品名称">
							<el-input v-model="form.name" maxlength="30" class="big-input"></el-input>
							<div style="color: #7B7979; font-size: 14px;">
								<i class="el-icon-lx-info"></i>
								<span>
									可以包括品牌、名称、规格等内容，字数限30个汉字
								</span>
							</div>
						</el-form-item>

						<el-form-item label="商品单位">
							<el-select v-model="form.region" placeholder="请选择" class="handle-input">
								<el-option key="bbk" label="步步高"></el-option>
								<el-option key="xtc" label="小天才"></el-option>
								<el-option key="imoo" label="imoo"></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="商品排序">
							<el-input v-model="form.name" maxlength="30" class="handle-input"></el-input>
							<div style="color: #7B7979; font-size: 14px;display: inline;margin-left: 10px;">
								<i class="el-icon-lx-info"></i>
								<span> 输入1,2,3.....,.默认按从小到大排序</span>
							</div>
						</el-form-item>
						<el-form-item label="缩略图" prop="region">
							<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:300*300像素，最多1张</div>
							<el-upload action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" :http-request="uploadFile"
							 list-type="picture-card" :limit="1" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</el-form-item>
						<el-form-item label="轮播图" prop="region">
							<div style="color: #7B7979; font-size: 14px;">图片大小不能超过3M建议尺寸:1080*900像素，最多6张</div>
							<el-upload action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" :http-request="uploadFile"
							 list-type="picture-card" multiple :limit="6" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview"
							 :on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</el-form-item>
						<el-form-item label="价格范围">
							<el-input v-model="form.name" placeholder="请输入价格范围" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="广告语">
							<el-input v-model="form.name" placeholder="请输入一句广告语" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="库存数">
							<el-input v-model="form.name" placeholder="请输入库存数" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="搜索关键字">
							<el-input v-model="form.name" placeholder="输入多个关健字，用小写逗号分开，例:花生，多味，月饼" class="big-input"></el-input>
						</el-form-item>
						<el-form-item label="售后承诺">
							<el-input v-model="form.name" placeholder="输入服务承诺。例:7天无理由退货，保质30天" class="big-input"></el-input>
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
							<el-upload action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" :http-request="uploadFile"
							 list-type="picture-card" multiple :limit="1" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview"
							 :on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</el-form-item>
					</el-form>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'info',
		props: ['num'],
		data() {
			return {
				form: {
					name: '',
					region: '',
				},
				dialogImageUrl: '',
				dialogVisible: false,
				dynamicTags: [],
				inputVisible: false,
				inputValue: ''
			};
		},
		methods: {
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			handleExceed(files, fileList) {
				this.$message.warning(`上传文件超出限制`);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				console.log(file)
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
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
