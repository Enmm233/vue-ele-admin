<!-- 设置规格 -->
<template>
	<div class="spec_content">
		<el-row>
		  <el-col :span="12">
			<div>
				<previews></previews>
			</div>
		  </el-col>
		  <el-col :span="12">
			  <div>
				  <div class="spec">
				  	<div>
				  		<el-button @click="isShow = true" type="primary">添加主规格</el-button>
				  		<div class="spec_right">
				  			<div v-for="(item,index) in oneList">
				  				<div class="f_item flex flex_item_between">
				  					<div class="left">{{item.child.title}}</div>
				  					<div class="right" v-if="item.child.status == 1">
				  						<i class="el-icon-lx-add" @click="addSpec(1,index)"></i>
				  						<i class="el-icon-lx-delete" @click="delSpec(index)"></i>
				  					</div>
				  				</div>
				  				<block v-if="item.child.attr">
				  					<div v-for="(item2,index2) in item.child.attr">
				  						<div class="f_item flex flex_item_between">
				  							<div class="left paddingL15">{{item2.spec}}</div>
				  							<div class="right" v-if="item2.status == 1">
				  								<i class="el-icon-lx-add" @click="addSpec(2,index,index2)"></i>
				  								<i class="el-icon-lx-delete" @click="delSpec(index,index2)"></i>
				  							</div>
				  						</div>
				  						<block v-if="item2.child">
				  							<div v-for="(item3,index3) in item2.child.attr">
				  								<div class="f_item flex flex_item_between">
				  									<div class="left paddingL30">{{item3.spec}}</div>
				  									<div class="right">
				  										<i class="el-icon-lx-delete" @click="delSpec(index,index2,index3)"></i>
				  									</div>
				  								</div>
				  							</div>
				  						</block>
				  					</div>
				  				</block>
				  			</div>
				  		</div>
				  		
				  		<el-dialog title="添加一级规格标题" :visible.sync="isShow">
				  		 <el-input v-model="one_title" placeholder="请输入一级规格标题"></el-input>
				  		 <div slot="footer" class="dialog-footer">
				  		     <el-button @click="isShow = false">取 消</el-button>
				  		     <el-button type="primary" @click="addlist()">确 定</el-button>
				  		   </div>
				  		</el-dialog>
				  		
				  		<el-dialog title="添加规格" :visible.sync="isShow2">
				  			<div class="add_p">
				  				<div>
				  					<el-form ref="ruleForm" label-width="100px" class="demo-ruleForm flex">
				  						<div class="form-box">
				  							<el-form-item label="规格标题" v-if="number == 2">
				  								<el-input v-model="two_title" placeholder="请输入规格标题"></el-input>
				  							</el-form-item>
				  							<el-form-item label="规格名称">
				  								<el-input v-model="spec_name" placeholder="请输入规格名称"></el-input>
				  							</el-form-item>
				  							<el-form-item label="商品名称">
				  								<el-input v-model="product_name" placeholder="请输入商品名称"></el-input>
				  							</el-form-item>
				  							<el-form-item label="成本价格">
				  								<el-input v-model="cost" placeholder="请输入成本价格"></el-input>
				  							</el-form-item>
				  							<el-form-item label="销售价格">
				  								<el-input v-model="price" placeholder="请输入销售名称"></el-input>
				  							</el-form-item>
				  							<el-form-item label="商品单位">
				  								<el-input v-model="unit" placeholder="请输入商品单位"></el-input>
				  							</el-form-item>
				  							<el-form-item label="商品重量">
				  								<el-input v-model="weight" placeholder="请输入商品重量"></el-input>
				  							</el-form-item>
				  							<el-form-item label="商品尺寸">
				  								<el-input v-model="size" placeholder="请输入商品尺寸"></el-input>
				  							</el-form-item>
				  							<el-form-item label="库存数量">
				  								<el-input v-model="inventory" placeholder="请输入库存数量"></el-input>
				  							</el-form-item>
				  					
				  							<el-form-item label="产品图片" prop="region">
				  								<div>图片大小不能超过3M 建议尺寸：1080*900像素</div>
				  								<el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview"
				  								 :on-remove="handleRemove">
				  									<i class="el-icon-plus"></i>
				  								</el-upload>
				  								<el-dialog :visible.sync="dialogVisible">
				  									<img width="100%" :src="dialogImageUrl" alt="">
				  								</el-dialog>
				  							</el-form-item>
				  						</div>
				  					</el-form>
				  				</div>
				  			</div>
				  		 <div slot="footer" class="dialog-footer">
				  		     <el-button @click="isShow2 = false">取 消</el-button>
				  		     <el-button type="primary" @click="addlist2()">预 览</el-button>
				  		   </div>
				  		</el-dialog>
				  
				  	</div>
				  </div>
			  </div>
		  </el-col>
		</el-row>
		
		
	</div>

</template>

<script>
	import previews from './previews.vue'
	export default {
		name: 'setSpec',
		props: ['num'],
		components: {
			previews,
		},
		data() {
			return {
				one_title: '',  //一级规格名称
				two_title: '',  //二级规格名称
				spec_name: '',  //规格名称
				product_name: '',  //商品名称
				cost:'',   //成本价格
				price:'',   //销售价格
				unit:'',   //商品单位
				weight:'',   //商品重量
				size:'',   //商品尺寸
				inventory:'',   //库存数量
				dialogImageUrl:'',   //规格图标
				oneList: [],
				number: '',
				ind: '',
				ind2: '',
				ind3: '',
				isShow: false,
				isShow2: false,
			}
		},
		methods: {
			delSpec(index,index2,index3){
				console.log(index)
				console.log(index2)
				console.log(index3)
				if(index >= 0){
					if(typeof(index2) === "undefined" && typeof(index3) === "undefined"){
						console.log(1)
						if(index == 0){
							this.oneList = [];
						}else if(index > 0){
							this.oneList.splice(index,1)
							console.log(JSON.stringify(this.oneList))
						}
					}else if(index2 >= 0){
						if(typeof(index3) === "undefined"){
							console.log(2)
							if(index2 == 0){
								this.oneList[index].child.attr = [];
							}else if(index2 > 0){
								this.oneList[index].child.attr.splice(index2,1)
								console.log(JSON.stringify(this.oneList))
							}
						}if(index3 >= 0){
							if(index3 == 0){
								this.oneList[index].child.attr[index2].child = {title: "",attr: []};
								console.log(JSON.stringify(this.oneList))
							}else if(index3 > 0){
								this.oneList[index].child.attr[index2].child.attr.splice(index3,1)
								console.log(JSON.stringify(this.oneList))
							}
						}
						
					}
					
					
				}
			},
			addSpec(number, index, index2) {
				this.two_title = '';
				this.spec_name = '';
				this.isShow2 = true;
				this.number = number;
				this.ind = index;
				this.ind2 = index2;
			},
			addlist2() {
				this.isShow2 = false;
				if (this.number == 1) {
					var data = {
						spec: this.spec_name,
						status: 1,
						child: {
							title: "",
							attr: []
						}
					}
					var list = this.oneList
					list[this.ind].child.attr.push(data)
					this.oneList = list;
					console.log(JSON.stringify(this.oneList))
				} else if (this.number == 2) {
					if (this.oneList[this.ind].child.attr[this.ind2].child.title == '' && this.oneList[this.ind].child.attr[this.ind2]
						.child.attr == '') {
						this.oneList[this.ind].child.attr[this.ind2].child.title = this.two_title;
						var data = {
							spec: this.spec_name,
							status: 0
						}
						var list = this.oneList
						this.oneList[this.ind].child.attr[this.ind2].child.attr.push(data)
						this.oneList = list;
						console.log(JSON.stringify(this.oneList))
					} else {
						var data = {
							spec: this.spec_name,
							status: 0
						}
						
						var list = this.oneList
						this.oneList[this.ind].child.attr[this.ind2].child.attr.push(data)
						this.oneList = list;
						console.log(JSON.stringify(this.oneList))
					}
				}
			},
			addlist() {
				if (this.one_title != '') {
					var data = {
						child: {
							title: this.one_title,
							status: 1,
							attr: []
						}
					}
					this.oneList.push(data);
					this.isShow = false;
					this.one_title = '';
				} else {
					this.$message('还未输入');
				}
			}
		}

	}
</script>

<style>
	.spec_content{
		padding: 40px 0;
	}
	.spec {
		width: 400px;
	}

	.spec .spec_right {
		border: 1px solid #EBEEF5;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: #303133;
		margin-top: 15px;
		height: 450px;
	}

	.spec .spec_right .f_item {
		padding: 10px 20px;
		border-bottom: 1px solid #EBEEF5;
	}

	.spec .spec_right .f_item .right i {
		margin-left: 10px;
	}
</style>

