<!-- 预览规格 -->
<template>
	<div class="preview">
		<div class="top flex">
			<div class="left">
				<div class="demo-image">
					<div class="block" v-if="infoItem != ''">
						<el-image 
						style="width: 150px; height: 100px;border: 1px solid #eee;" 
						:src="imgUrl+infoItem.waresImg"
						 fit="contain"></el-image>
					</div>
					<div class="block" v-else>
						<el-image 
						style="width: 150px; height: 100px;border: 1px solid #eee;" 
						 fit="contain"></el-image>
					</div>
				</div>
			</div>
			<div class="right flex_column flex_item_between">
				<div class="name" v-if="info.waresName">{{info.waresName}}</div>
				<div class="spec flex" v-if="selectArr != ''">
					<span>已选规格：</span>
					<div v-for="item in selectArr" class="flex">
						{{item.tt}};
						<div v-if="item.datas" class="flex">
							<div v-for="dd in item.datas">
								{{dd.ss}};
							</div>
						</div>
					</div>
				</div>
				<div class="num flex flex_item_between" v-if="infoItem">
					<span>库存数：{{infoItem.stocstockNumber}}{{infoItem.waresCompany}}</span>
					<span>¥{{infoItem.price}}</span>
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
	import { mapState } from 'vuex'
	export default { 
		name: 'previews',
		props: ['info','list'],
		computed:{
			...mapState(['imgUrl']),  //显示state的数据
		},
		components: {
			spec,
		},
		data() {
			return {
				selectArr: [],
				goodsAData: {
					// tit:'',
					name: ''
				},
				colorList: [],
				active: '',
				infoItem:'',

			};
		},
		created() {
		},
		methods: {
			clickLi(data,infoItem) {
				var narA = this.selectArr;
				narA.map((item, index) => {
					if (item.tittle == data.sub[0].tittle) {
						narA.splice(index, 1)
					}
				})
				narA.push(data.sub[0])
				this.infoItem = infoItem;
				// console.log(infoItem)
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
		width: 100%;
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
