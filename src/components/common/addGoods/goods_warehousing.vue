<!-- //商品入库 -->
<template>
	<div class="warehous">
		<el-row>
			<el-col :span="12">
				<div>
					<div class="title">
						<span class="xian"></span>
						<span>商品规格</span>
						<!-- 	<div v-for="item in selectArr" class="flex">
							{{item.tt}}
							<block v-if="item.data" class="flex">
								<div v-for="dd in item.data">
									{{dd.ss}}
								</div>
							</block>
						</div> -->
					</div>
					<div class="conten spec">
						<div class="spec_right">
							<div v-for="(item,index) in list">
								<div class="f_item flex flex_item_mid">
									<div class="left">{{item.child.title}}</div>
								</div>
								<block v-if="item.child.attr">
									<warehousSpec :specList="item.child.attr" :specTitle="item.child.title" @transferUser="ferUser"></warehousSpec>
								</block>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="form">
					<el-form ref="form" :model="form" label-width="120px">
						<el-form-item label="商品名称">
							<span>豆浆</span>
						</el-form-item>
						<el-form-item label="选中规格">
							<el-input v-if="selectArr == ''" disabled="true" placeholder="请选择规格" class="pick-input mr10"></el-input>
							<block v-else class="flex">
								<div v-for="item in selectArr" class="flex">
									{{item.tt}},
									<block v-if="item.data" class="flex">
										<div v-for="dd in item.data">
											{{dd.ss}},
										</div>
									</block>
								</div>
							</block>
						</el-form-item>
						<el-form-item label="商品批次">
							<el-input v-model="form.name" placeholder="输入商品批次" class="pick-input mr10"></el-input>
						</el-form-item>
						<el-form-item label="入库数量">
							<div class="flex">
								<el-input v-model="form.name" placeholder="按单位输入数量" class="pick-input mr10"></el-input>
								<span>只</span>
							</div>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import warehousSpec from './warehous_spec.vue'
	export default {
		name: 'info',
		props: ['warehous'],
		components: {
			warehousSpec
		},
		data() {
			return {
				selectArr: [], //存放被选中的值
				form: {},
				list: [{
					"child": {
						"title": "尺寸",
						"status": 1,
						"attr": [{
							"spec": "36码",
							"status": 1,
							"child": {
								"title": "颜色",
								"attr": [{
									"spec": "红色",
									"status": 0
								}, {
									"spec": "绿色",
									"status": 0
								}, {
									"spec": "蓝色",
									"status": 0
								}]
							}
						}, {
							"spec": "38码",
							"status": 1,
							"child": {
								"title": "颜色",
								"attr": [{
									"spec": "白色",
									"status": 0
								}, {
									"spec": "黄色",
									"status": 0
								}]
							}
						}]
					}
				}, {
					"child": {
						"title": "单位",
						"status": 1,
						"attr": [{
							"spec": "个",
							"status": 1,
							"child": {
								"title": "数量",
								"attr": [{
									"spec": "1个",
									"status": 0
								}, {
									"spec": "2个",
									"status": 0
								}]
							}
						}]
					}
				}, {
					"child": {
						"title": "地区",
						"status": 1,
						"attr": [{
							"spec": "南昌",
							"status": 1,
						}]
					}
				}],
				arrTitle: []
			};
		},
		created() {

		},
		methods: {
			ferUser(data) {
				var narA = this.selectArr;
				narA.map((item, index) => {
					if (item.tittle == data.sub[0].tittle) {
						narA.splice(index, 1)
					}
				})
				narA.push(data.sub[0])
			},
		}
	}
</script>

<style>
	.spec .spec_right {
		border: 1px solid #EBEEF5;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: #303133;
		margin-top: 15px;
		height: 450px;
		overflow: hidden;
		overflow-y: scroll;
	}

	.spec .spec_right .f_item {
		padding: 10px 20px;
		border-bottom: 1px solid #EBEEF5;
	}

	.spec .spec_right .f_item .right i {
		margin-left: 10px;
	}

	.pick-input {
		width: 90%;
		display: inline-block;
	}
</style>
