<template>
	<div class="detail_box">
		<div class="con_body">
			<el-row :gutter="24">
				<el-col :span="10">
					<div>
						<div class="title flex flex_item_mid">
							<div class="xian"></div>
							<div>商品明细</div>
						</div>
						<div class="list">
							<div class="item flex">
								<div class="left">商品ID：</div>
								<div class="right">{{goodsInfo.id}}</div>
							</div>
							<div class="item flex">
								<div class="left">商品名称：</div>
								<div class="right">{{goodsInfo.waresName}}</div>
							</div>
							<div class="item flex">
								<div class="left">缩略图片：</div>
								<div class="right flex flex_wrap">
									<el-image style="width: 100px; height: 100px" :src="imgUrl+goodsInfo.waresThumbnail" @click.stop="handleClickItem" :preview-src-list="[imgUrl+goodsInfo.waresThumbnail]">
									</el-image>
								</div>
							</div>
							<div class="item flex">
								<div class="left">商品图片：</div>
								<div class="right flex flex_wrap">
									<div class="marginR10 marginB10" v-for="item in srcList">
										<el-image style="width: 100px; height: 100px" :src="item" @click.stop="handleClickItem" :preview-src-list="srcList">
										</el-image>
									</div>
								</div>
							</div>
							<div class="item flex" v-if="waresLabel != ''">
								<div class="left">标签文字：</div>
								<div class="right">
									<el-tag v-for="item in waresLabel">{{item}}</el-tag>
								</div>
							</div>
							<div class="item flex">
								<div class="left">销售价格：</div>
								<div class="right">¥{{goodsInfo.price}}</div>
							</div>
							<div class="item flex">
								<div class="left">商品原价：</div>
								<div class="right">¥{{goodsInfo.price}}</div>
							</div>
							<div class="item flex">
								<div class="left">上架状态：</div>
								<div class="right" v-if="goodsInfo.saleState == 1">已上架</div>
								<div class="right" v-if="goodsInfo.saleState == 2">未上架</div>
								<div class="right" v-if="goodsInfo.saleState == 3">已下架</div>
							</div>
							<div class="item flex">
								<div class="left">销售数量：</div>
								<div class="right">{{goodsInfo.stockNumber}}</div>
							</div>
							<div class="item flex">
								<div class="left">商品分类：</div>
								<div class="right">{{goodsInfo.categoryName}}</div>
							</div>
							<div class="item flex">
								<div class="left">商品性质：</div>
								<div class="right" v-if="goodsInfo.waresType == 1">物品</div>
								<div class="right" v-if="goodsInfo.waresType == 2">服务</div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="7">
					<div>
						<div class="title flex flex_item_mid">
							<div class="xian"></div>
							<div>其他信息</div>
						</div>
						<div class="list">
	
							<div class="item flex">
								<div class="leftt">产品/服务名称：</div>
								<div class="rightt">{{goodsInfo.serviceName}}</div>
							</div>
						<!-- 	<div class="item flex">
								<div class="leftt">品牌名及图标：</div>
								<div class="rightt">乔家栅</div>
							</div> -->
						<!-- 	<div class="item flex">
								<div class="leftt">服务清单列表：</div>
								<div class="rightt">
									<p v-for="item in goodsInfo.shopExpenseItems">{{item.name}}</p>
								</div>
							</div> -->
							<div class="item flex">
								<div class="leftt">赠号名称：</div>
								<div class="rightt">
									<span v-for="item in goodsInfo.shopGifts">{{item.giftName}}、</span>
								</div>
							</div>
							<div class="item flex">
								<div class="leftt">附加收费：</div>
								<div class="rightt">
									<span v-for="item in goodsInfo.shopExpenseItems">{{item.name}}、</span>
								</div>
							</div>
							<div class="item flex">
								<div class="leftt">适用活动：</div>
								<div class="rightt">
									<span v-for="item in goodsInfo.shopActivity">{{item.activityTitle}}、</span>
								</div>
							</div>
							<div class="item flex">
								<div class="leftt">商品规格：</div>
								<div class="rightt">
									
								</div>
							</div>
							<div class="item flex">
									<div style="width: 100%;">
										<div class="conten spec">
											<div class="spec_right">
												<div v-for="(item,index) in goodsInfo.data">
													<div class="f_item flex flex_item_mid">
														<div class="left">{{item.shopWaresSpec.specName}}</div>
													</div>
													<div v-if="item.shopWaresSpec.shopWaresSpecItems != []">
														<div v-for="(item2,index2) in item.shopWaresSpec.shopWaresSpecItems">
															<div class="f_item flex flex_item_between">
																<div class="left paddingL15">{{item2.name}}</div>
															</div>
															<div v-if="item2.shopWaresSpecItemItems != []">
																<div v-for="(item3,index3) in item2.shopWaresSpecItemItems">
																	<div class="f_item flex flex_item_between">
																		<div class="left paddingL30">{{item3.name}}</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="7">
					<div class="img_txt">
						<div class="title flex flex_item_mid">
							<div class="xian"></div>
							<div>图文详情</div>
						</div>
						<div class="list describe overflow-scroll-y">
							<div v-html="goodsInfo.webDescribe"></div>
							<!-- {{goodsInfo.webDescribe}} -->
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		getShopWares
	} from '../../../api/index';
	import { mapState } from 'vuex'
	export default {
		name: 'goodsDetail',
		computed:{
		     ...mapState(['imgUrl','accountId']),  //显示state的数据
		    },
		props:["id"],
		data() {
			return {
				goodsInfo:'',
				// url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				srcList: [],
				waresLabel: []
			};
		},
		watch:{
			"id":function(){
				// console.log(this.id)
				this.getData()
			}
		},
		created() {
			// console.log(this.id)
			this.getData()
		},
		methods: {
			handleClickItem() {
				// 获取遮罩层dom
				var domImageMask = '';
				var time = setTimeout(function() {
					domImageMask = document.querySelector(".el-image-viewer__mask");
					if (!domImageMask) {
						return;
					}
					domImageMask.addEventListener("click", () => {
						// 点击遮罩层时调用关闭按钮的 click 事件
						document.querySelector(".el-image-viewer__close").click();
						clearTimeout(time);
					});
				}, 100)
			},
			getData() {
				this.srcList = [];
				var query = {
					data: {
						waresId: this.id,
					}
				};
				getShopWares(query).then(res => {
					if (res.code == 1) {
						this.goodsInfo = res.data; 
						var arr = res.data.waresImg.split(',');
						for(var i=0;i<arr.length;i++){
							this.srcList.push(this.imgUrl+arr[i])
						}
						this.waresLabel = res.data.waresLabel.split(',');
						
					}
				});
			},
			
		}
	};
</script>

<style>
	.el-tag {
		margin-right: 10px;
		margin-top: -5px;
	}
	.spec .spec_right {
		border: 1px solid #EBEEF5;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: #303133;
		margin-top: 0 !important;
		height: 400px !important;
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
	
	.goods_list .detail_box .con_body .list .item .left {
	    width: 100%;
	    text-align: start;
	    font-size: 15px;
	    font-weight: 600;
	}
	#s-desc img {
		width: 100%;
	}
	.goods_list .detail_box .con_body .describe p img{
		 width: 100% !important;
	}
	
</style>
