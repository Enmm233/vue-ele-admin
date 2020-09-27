<!-- addGoods 添加商品 -->
<template>
	<div>
		<div class="container">
			<div>
				<el-steps :active="active" finish-status="finish ">
					<el-step title="选择产品"></el-step>
					<el-step title="基础信息"></el-step>
					<el-step title="设置规格"></el-step>
					<el-step title="选择赠品"></el-step>
					<el-step title="附加收费"></el-step>
					<el-step title="图文介绍"></el-step>
					<el-step title="参加活动"></el-step>
					<el-step title="添加完成"></el-step>
				</el-steps>
			</div>
			<div>
				<goods ref="Goods_a" :num="active" v-show="active == 1"></goods>
				<goods-info ref="Goods_b" :num="active" v-show="active == 2"></goods-info>
				<set-spec ref="Goods_c" :num="active" v-show="active == 3"></set-spec>
				<free ref="Goods_d" :num="active" v-show="active == 4"></free>
				<charges ref="Goods_e" :num="active" v-show="active == 5"></charges>
				<image-txt ref="Goods_f" :num="active" v-show="active == 6"></image-txt>
				<activity ref="Goods_g" :num="active" v-show="active == 7"></activity>
				<end ref="Goods_h" :num="active" v-show="active == 8"></end>
			</div>
			<div style="text-align: center;">
				<el-button v-if="active != 1 && active != 8" @click="last">上一步</el-button>
				<el-button v-if="active != 8" type="primary" @click="next">下一步</el-button>
				<el-button v-if="active == 8" type="success" @click="submit">完成</el-button>
			</div>
		</div>

	</div>

</template>

<script>
	import goods from '../../common/addGoods/goods.vue'
	import goodsInfo from '../../common/addGoods/goods_info.vue'
	import setSpec from '../../common/addGoods/set_spec.vue'
	import free from '../../common/addGoods/free.vue'
	import charges from '../../common/addGoods/charges.vue'
	import activity from '../../common/addGoods/activity.vue'
	import imageTxt from '../../common/addGoods/image_txt.vue'
	import end from '../../common/addGoods/end.vue'
	export default {
		name: 'basetable',
		components: {
			goods,
			free,
			charges,
			activity,
			goodsInfo,
			setSpec,
			imageTxt,
			end
		},
		data() {
			return {
				active: 3,
				txt_content: ''
			}
		},
		methods: {
			submit() {
				this.$message({
					message: '商品添加完成',
					type: 'success'
				});
				// this.$message.error('错了哦，这是一条错误消息');
			},
			next() {
				if (this.active == 1) {
					this.goos_list = this.$refs.Goods_a.goodsAData;
					console.log(this.goos_list)
				}
				if (this.active == 6) {
					this.txt_content = this.$refs.Goods_f.content;
					console.log(this.txt_content)
				}
				if (this.active++ > 8) this.active = 8;

			},
			last() {
				if (this.active-- < 2) this.active = 1;
			}
		},
		created() {}

	};
</script>

<style scoped>

</style>
