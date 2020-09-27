<!-- 预览规格 -->
<template>
	<div class="preview">
		<div class="top flex">
			<div class="left">
				<div class="demo-image">
					<div class="block">
						<el-image style="width: 150px; height: 100px;border: 1px solid #eee;" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
						 fit="contain"></el-image>
					</div>
				</div>
			</div>
			<div class="right flex_column flex_item_between">
				<div class="name">商品名称</div>
				<div class="spec flex" v-if="selectArr != ''">
					<span>已选规格：</span>
					<div v-for="item in selectArr" class="flex">
						{{item.tt}};
						<block v-if="item.datas" class="flex">
							<div v-for="dd in item.datas">
								{{dd.ss}};
							</div>
						</block>
					</div>
				</div>
				<div class="num flex flex_item_between">
					<span>库存数：36个</span>
					<span>¥0.00</span>
				</div>
			</div>
		</div>
		<div class="spec_tag">
			<div v-for="(item,itemInd) in list">
				<spec :specList='item' @transferUser="clickLi"></spec>
			</div>
			
		</div>




	</div>
</template>

<script>
	import spec from './spec.vue'
	export default {
		name: 'previews',
		props: ['num'],
		components: {
			spec,
		},
		data() {
			return {
				selectArr:[],
				goodsAData: {
					// tit:'',
					name: ''
				},
				colorList: [],
				list: [{
						"title": "尺码",
						"attr": [{
								"id": 1,
								"data": "36码",
								"state": 1,
								"child": {
									"title": "颜色",
									"attr": [{
											"id": 11,
											"data": "黄色",
											"state": 1
										},
										{
											"id": 12,
											"data": "绿色",
											"state": 1
										},
										{
											"id": 13,
											"data": "白色",
											"state": 1
										}
									]
								}
							},
							{
								"id": 2,
								"data": "37码",
								"state": 1,
								"child": {
									"title": "颜色",
									"attr": [{
											"id": 11,
											"data": "红色",
											"state": 1
										},
										{
											"id": 12,
											"data": "绿色",
											"state": 1
										},
										{
											"id": 13,
											"data": "棕色",
											"state": 1
										}
									]
								}
							},
							{
								"id": 3,
								"data": "38码",
								"state": 1
							}
						]
					},
					{
						"title": "产地",
						"attr": [{
								"id": 4,
								"data": "南昌县",
								"state": 1,
								"child": {
									"title": "地址",
									"attr": [{
											"id": 11,
											"data": "哈哈",
											"state": 1
										},
										{
											"id": 12,
											"data": "呵呵",
											"state": 1
										},
										{
											"id": 13,
											"data": "嘻嘻",
											"state": 1
										}
									]
								}
							},
							{
								"id": 5,
								"data": "新建县",
								"state": 1
							},
							{
								"id": 6,
								"data": "安义县",
								"state": 1
							}
						]
					}
				],
				active: ''

			};
		},
		created() {

		},
		methods: {
			clickLi(data) {
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
	.productActive {
		border: 1px solid rgb(255, 61, 31) !important;
		color: #ffffff !important;
		background: rgb(255, 61, 31) !important;
	}

	.preview {
		width: 25.875rem;
		height: 28.125rem;
		overflow: hidden;
		overflow-y: scroll;
		border: 1px slategray solid;
		padding: 15px;
	}

	.preview::-webkit-scrollbar {
		display: none
	}

	.preview .left {
		margin-right: 20px;
	}

	.preview .right {
		width: 100%;
	}

	.preview .right .name {
		color: #333;
		font-size: 16px;
		font-weight: bold;
	}

	.preview .right .spec,
	.num {
		color: #333;
		font-size: 12px;
	}

	.preview .spec_tag {
		margin-top: 20px;
	}

	.preview .spec_tag .title {
		color: #333;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.preview .spec_tag .attr {
		margin-bottom: 20px;
	}

	/* .preview .spec_tag .attr span {
		display: inline-block;
		padding: 2px 10px;
		border: 1px silver solid;
		border-radius: 5px;
		margin-right: 10px;
	} */
	.Active {
		background: #20A0FF;
		color: #FFFFFF;
	}
</style>
