<!-- store_info  店铺信息 -->
<template>
	<div class="container">
		<el-row :gutter="20">
			<el-col :span="10">
				<div class="info">
					<div class="item">
						<div class="title">
							店铺ID：
						</div>
						<div class="txt">
							<span>4545</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店铺名称：
						</div>
						<div class="txt">
							<span>皇陵茶园</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店铺状态：
						</div>
						<div class="txt">
							<span>资料待完善/营业中/盘点中/已关闭/整改中</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店铺类别：
						</div>
						<div class="txt">
							<span>服务类/农产品类/综合类</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店主账号：
						</div>
						<div class="txt">
							<span>18654694896</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店主昵称：
						</div>
						<div class="txt">
							<span>妙龄茶妹</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							经营范围：
						</div>
						<div class="txt">
							<span>水果、粮食、干货、水产、手工艺品、木材</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							创建时间：
						</div>
						<div class="txt">
							<span>2020-06-12 06:08:16</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							合作社ID：
						</div>
						<div class="txt">
							<span>89787544</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							合作社名称：
						</div>
						<div class="txt">
							<span>婺源簧岭综合合作社</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							联系电话：
						</div>
						<div class="txt">
							<span>18956487985</span>
							<span>0795-25614568</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							联系人名：
						</div>
						<div class="txt">
							<span>王翠花</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							联系邮箱：
						</div>
						<div class="txt">
							<span>xxXxxxx@163.com</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							客服ID号：
						</div>
						<div class="txt">
							<span>56886456</span>
							<span>56984578</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店铺评级：
						</div>
						<div class="txt">
							<el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}">
							</el-rate>
						</div>
					</div>
					<div class="item">
						<div class="title">
							关注人数：
						</div>
						<div class="txt">
							<span>2051人</span>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="info">
					<div class="item">
						<div class="tittle">
							店铺Logo：
						</div>
						<div class="txt">
							<el-image fit="contain" style="width: 80px; height: 80px" :src="url" :preview-src-list="srcList">
							</el-image>
						</div>
					</div>
					<div class="item">
						<div class="tittle">
							营业执照：
						</div>
						<div class="txt">
							<el-image style="width: 100px; height: 160px" :src="url" :preview-src-list="srcList">
							</el-image>
						</div>
					</div>
					<div class="item">
						<div class="tittle">
							合作社法人身份证正反面：
						</div>
						<div class="txt">
							<el-image style="width: 100px; height: 160px" :src="url" :preview-src-list="srcList">
							</el-image>
							<el-image style="width: 100px; height: 160px" :src="url" :preview-src-list="srcList">
							</el-image>
						</div>
					</div>
					<div class="item">
						<div class="tittle">
							实体店址：
						</div>
						<div class="txt">
							<p>江西省上饶市婺源县刘家村</p>
							<div style="width: 500px;">
								<my-map :arriveCoor="arriveCoor"></my-map>
							</div>
						</div>
					</div>

				</div>
			</el-col>
			<el-col :span="2">
				<div>
					<el-button type="primary" @click="addInfo()">完善店铺资料</el-button>
				</div>
			</el-col>
		</el-row>
		
		
		<el-dialog title="添加产品" :visible.sync="isShow" width="80%">
			<add-store ref="cliss" :datainfo="info"></add-store>
		</el-dialog>

		
	</div>
</template>

<script>
	import seachMap from '../../common/map/seach_map.vue'
	import myMap from '../../common/map/map.vue'
	import addStore from '../../common/addStore/add_store.vue'
	export default {
		name: 'basetable',
		components: {
			seachMap,
			myMap,
			addStore
		},
		data() {
			return {
				value: 3.7,
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				srcList: [
					'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
					'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
				],
				arriveCoor: [115.956583,28.654441],
				isShow:false,
				info:''
			}
		},
		methods: {
			// 获取地址信息
			getPosition(data) {
				console.log(data)
			},
			addInfo(){
				this.isShow = true;
			}
		},
		created() {}

	};
</script>

<style scoped>
	.info .item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 25px;
	}

	.info .item .title {
		width: 90px;
		cursor: pointer;
		font-size: 15px;
		font-weight: 600;
		color: #303133;
		text-align: end;
	}
	.info .item .tittle {
		width: 200px;
		cursor: pointer;
		font-size: 15px;
		font-weight: 600;
		color: #303133;
		text-align: end;
	}

	.info .item .txt {
		margin-top: 3px;
		cursor: pointer;
		font-size: 13px;
		color: #303133;
	}
	.info .item .txt .el-image{
		margin-right: 20px;
	}
</style>
