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
								<div class="right">454812</div>
							</div>
							<div class="item flex">
								<div class="left">商品名称：</div>
								<div class="right">454812</div>
							</div>
							<div class="item flex">
								<div class="left">缩略图片：</div>
								<div class="right flex flex_wrap">
									<el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList">
									</el-image>
								</div>
							</div>
							<div class="item flex">
								<div class="left">商品图片：</div>
								<div class="right flex flex_wrap">
									<div class="marginR10 marginB10" v-for="item in srcList">
										<el-image style="width: 100px; height: 100px" :src="item" :preview-src-list="srcList">
										</el-image>
									</div>
	
								</div>
							</div>
							<div class="item flex">
								<div class="left">标签文字：</div>
								<div class="right">
									<el-tag>标签一</el-tag>
									<el-tag>标签一</el-tag>
									<el-tag>标签一</el-tag>
								</div>
							</div>
							<div class="item flex">
								<div class="left">销售价格：</div>
								<div class="right">¥59.00</div>
							</div>
							<div class="item flex">
								<div class="left">商品原价：</div>
								<div class="right">¥59.00</div>
							</div>
							<div class="item flex">
								<div class="left">上架状态：</div>
								<div class="right">已上架</div>
							</div>
							<div class="item flex">
								<div class="left">销售数量：</div>
								<div class="right">¥59.00</div>
							</div>
							<div class="item flex">
								<div class="left">商品分类：</div>
								<div class="right">加工食品--糕点--月饼</div>
							</div>
							<div class="item flex">
								<div class="left">商品性质：</div>
								<div class="right">产品</div>
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
								<div class="rightt">五香月饼</div>
							</div>
							<div class="item flex">
								<div class="leftt">品牌名及图标：</div>
								<div class="rightt">乔家栅</div>
							</div>
							<div class="item flex">
								<div class="leftt">服务清单列表：</div>
								<div class="rightt">
									<p>提供上门接送服务</p>
									<p>提供早中晚餐</p>
									<p>提供景点门票</p>
									<p>提供缆车接送</p>
									<p>提供游船船票</p>
								</div>
							</div>
							<div class="item flex">
								<div class="leftt">赠号名称：</div>
								<div class="rightt">
									精美包装袋、月饼切块工具、月饼
									托盘、手套三对
								</div>
							</div>
							<div class="item flex">
								<div class="leftt">附加收费：</div>
								<div class="rightt">
									运费险10元、南昌本地户口减5元、
									服务费3元
								</div>
							</div>
							<div class="item flex">
								<div class="leftt">适用活动：</div>
								<div class="rightt">
									中秋全民团圆全平台月饼8折优惠、
									乔家栅为回馈新老客户中秋节当天
									95折优惠、平台消费满500元减10
									元。
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
						<div class="list overflow-scroll-y">
							<section id="s-desc"><p><img src="//img.alicdn.com/imgextra/i2/2238534341/O1CN01xKeXzY1hwDsyYEEtj_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i4/2238534341/O1CN01PUv93s1hwDsvk3Jmg_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i1/2238534341/O1CN01txuVmj1hwDswuFukr_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i4/2238534341/O1CN011LAwU11hwDt2lz0Hk_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i2/2238534341/O1CN01RrdXkq1hwDsyYDpyE_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i3/2238534341/O1CN01NhuBko1hwDsyG7DIm_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i3/2238534341/O1CN01AkS5Oh1hwDsyG7Lb5_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i1/2238534341/O1CN01f83hYf1hwDsvk06BX_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i3/2238534341/O1CN01eI2eKF1hwDsz1U9a3_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i1/2238534341/O1CN01PEQBsz1hwDt2IuAw0_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img.alicdn.com/imgextra/i1/2238534341/O1CN01qPDlNU1hwDt2IxKMO_!!2238534341.gif" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i3/2238534341/O1CN01k82QCI1hwDswuEVRh_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i1/2238534341/O1CN01eCMxXH1hwDsz1UDjn_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i2/2238534341/O1CN01WRI6ff1hwDt0Kq28B_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i2/2238534341/O1CN01S7Pw3b1hwDt0Kq28N_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i1/2238534341/O1CN01YS0NcR1hwDswh6dDy_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i4/2238534341/O1CN01Qy20QQ1hwDt2lxfBf_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i3/2238534341/O1CN016sY9vD1hwDsz1Ss2x_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i1/2238534341/O1CN01yRz1Ro1hwDsvk2z1w_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i1/2238534341/O1CN019ztw921hwDt2IuVjl_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i1/2238534341/O1CN01HrazbU1hwDt1FUVoT_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i3/2238534341/O1CN01fNpHgH1hwDsyYE6eX_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i4/2238534341/O1CN01R3V3Lc1hwDsr5Z6tz_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i2/2238534341/O1CN019c7kaq1hwDt2lzfv0_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i1/2238534341/O1CN01TDE3uw1hwDsz1SnuS_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i4/2238534341/O1CN01JZwuNe1hwDswuEJ26_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i2/2238534341/O1CN01OgutBm1hwDt1nQNEI_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i1/2238534341/O1CN01BS9tKK1hwDsr5ZqcK_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i1/2238534341/O1CN01TsTrz81hwDsr5a34U_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i2/2238534341/O1CN01gS5tRV1hwDt2Iweon_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"><img src="//img-tmdetail.alicdn.com/tps/i3/T1BYd_XwFcXXb9RTPq-90-90.png" data-ks-lazyload="//img.alicdn.com/imgextra/i3/2238534341/O1CN01vApBOs1hwDsvk0Mrm_!!2238534341.jpg_2200x2200Q90s50.jpg_.webp" align="absmiddle"> </p></section>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'goodsDetail',
		data() {
			return {
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				srcList: [
					'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
					'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600082408744&di=35a973d1bf38730e0d08b05367920394&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fe07fa2634c6fb29339c3cd052fbaac078b50e6c1.jpg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600082367356&di=23c8d9e754e3f4eb5885a73ee894e8fa&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201711%2F01%2F20171101005017_mZvNJ.thumb.700_0.jpeg',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600082300057&di=3c051d850d2f2760976f76e25b19276f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F5%2F58622d9d7e5b5.jpg',
					'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1850043459,2555008889&fm=26&gp=0.jpg'
				]
			};
		},
		created() {
		},
		methods: {
			
		}
	};
</script>

<style>
	.el-tag {
		margin-right: 10px;
		margin-top: -5px;
	}
</style>
