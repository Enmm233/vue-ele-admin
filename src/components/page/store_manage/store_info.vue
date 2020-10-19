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
							<span>{{storeInfo.id}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店铺名称：
						</div>
						<div class="txt">
							<span>{{storeInfo.name}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店铺状态：
						</div>
						<div class="txt">
							<span v-if="storeInfo.storeStatus == 0">资料待完善</span>
							<span v-if="storeInfo.storeStatus == 1">营业中</span>
							<span v-if="storeInfo.storeStatus == 2">整改中</span>
							<span v-if="storeInfo.storeStatus == 3">盘点中</span>
							<span v-if="storeInfo.storeStatus == 4">已关闭</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店铺类别：
						</div>
						<div class="txt">
							<span>{{storeInfo.categoryName}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店主账号：
						</div>
						<div class="txt">
							<span>{{storeInfo.createAccountId}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							店主昵称：
						</div>
						<div class="txt">
							<span>{{storeInfo.nickName}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							经营范围：
						</div>
						<div class="txt">
							<span>{{storeInfo.businessScope}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							创建时间：
						</div>
						<div class="txt">
							<span>{{storeInfo.createTime}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							合作社ID：
						</div>
						<div class="txt">
							<span>{{storeInfo.cooperative}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							合作社名称：
						</div>
						<div class="txt">
							<span>{{storeInfo.cooperativeName}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							联系电话：
						</div>
						<div class="txt">
							<span>{{storeInfo.contactsTel}}</span>
						</div>
					</div>
					<div class="item">
						<div class="title">
							联系人名：
						</div>
						<div class="txt">
							<span>{{storeInfo.contactsName}}</span>
						</div>
					</div>
	<!-- 				<div class="item">
						<div class="title">
							联系邮箱：
						</div>
						<div class="txt">
							<span>{{storeInfo.contactsName}}</span>
						</div>
					</div> -->
					<div class="item">
						<div class="title">
							客服ID号：
						</div>
						<div class="txt">
							<span>{{storeInfo.chatId}}</span>
							<!-- <span>56984578</span> -->
						</div>
					</div>
					<div class="item">
						<div class="title">
							店铺评级：
						</div>
						<div class="txt" v-if="!storeInfo.starRating">
							<el-rate v-model="star" disabled text-color="#ff9900">
							</el-rate>
						</div>
						<div class="txt" v-else>
							<el-rate v-model="storeInfo.starRating" disabled text-color="#ff9900">
							</el-rate>
						</div>
					</div>
					<div class="item">
						<div class="title">
							关注人数：
						</div>
						<div class="txt">
							<span>{{storeInfo.fansNumber}}人</span>
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
							<el-image 
							fit="contain" 
							style="width: 80px; height: 80px" 
							:src="imgUrl+storeInfo.logoImg" 
							@click.stop="handleClickItem" 
							:preview-src-list="logoImgList">
							</el-image>
						</div>
					</div>
					<div class="item">
						<div class="tittle">
							营业执照：
						</div>
						<div class="txt">
							<el-image 
							fit="contain" 
							style="width: 100px; height: 160px" 
							:src="imgUrl+storeInfo.businessLicense" 
							@click.stop="handleClickItem" 
							:preview-src-list="businessList">
							</el-image>
						</div>
					</div>
					<div class="item">
						<div class="tittle">
							合作社法人身份证正反面：
						</div>
						<div class="txt">
							<el-image 
							fit="contain" 
							style="width: 100px; height: 160px" 
							v-for="item in identityList" 
							:src="item" 
							@click.stop="handleClickItem" 
							:preview-src-list="identityList">
							</el-image>
						</div>
					</div>
					<div class="item">
						<div class="tittle">
							实体店址：
						</div>
						<div class="txt">
							<p>{{storeInfo.contactsAddress}}</p>
							<div style="width: 500px;">
								<my-map ref="refreshMap" :arriveCoor="arriveCoor"></my-map>
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
		
		
		<el-dialog :close-on-click-modal="false" title="添加产品" :visible.sync="isShow" width="80%">
			<add-store @addaucceed="getData" @cancel="cancel"></add-store>
		</el-dialog>

		
	</div>
</template>

<script>
	import {
		getStoreByUserId
	} from '../../../api/index';
	import { mapState } from 'vuex'
	import seachMap from '../../common/map/seach_map.vue'
	import myMap from '../../common/map/map.vue'
	import addStore from '../../common/addStore/add_store.vue'
	export default {
		name: 'basetable',
		computed:{
		     ...mapState(['accountId','imgUrl']),  //显示state的数据
		    },
		components: {
			seachMap,
			myMap,
			addStore
		},
		data() {
			return {
				star:0,
				storeInfo:'',
				identityList: [],
				businessList: [],
				logoImgList: [],
				arriveCoor: [],
				isShow:false,
			}
		},
		methods: {
			cancel(data){
				this.isShow = !this.isShow;
			},
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
			// 获取 easy-mock 的模拟数据
			getData() {
				this.identityList = [];
				var that = this;
				var query = {
					data: {
						accountId: that.accountId,
					}
				};
				getStoreByUserId(query).then(res => {
					if (res.code == 1) {
						that.storeInfo = res.data;
						if(!res.data.corporateIdentityCard && typeof(res.data.corporateIdentityCard)!='undefined' && res.data.corporateIdentityCard!=0){
						}else{
							var urlStr2 = res.data.corporateIdentityCard.split(',');
							 urlStr2.forEach(item => {
								that.identityList.push(that.imgUrl+item);
							  });
							  // console.log(this.identityList)
						}
						if(!res.data.businessLicense && typeof(res.data.businessLicense)!='undefined' && res.data.businessLicense!=0){
						}else{
							var urlStr3 = res.data.businessLicense.split(',');
							 urlStr3.forEach(item => {
								that.businessList.push(that.imgUrl+item);
							  });
							  // console.log(this.businessList)
						}
						if(!res.data.logoImg && typeof(res.data.logoImg)!='undefined' && res.data.logoImg!=0){
						}else{
							var urlStr = res.data.logoImg.split(',');
							 urlStr.forEach(item => {
								that.logoImgList.push(that.imgUrl+item);
							  });
							  // console.log(this.logoImgList)
						}
						var arr = [];
						arr = res.data.longitudeLatitude.split(',')
						arr.forEach(item => {
								that.arriveCoor.push(parseFloat(item));
						 });
						 that.$refs.refreshMap.mapDraw(that.arriveCoor);
						 that.$refs.refreshMap.mapCoor(that.arriveCoor);
						 
						 // console.log(this.arriveCoor)
						
						
					}
				});
			},
			// 获取地址信息
			getPosition(data) {
				console.log(data)
			},
			addInfo(){
				this.isShow = true;
			}
		},
		created() {
			this.getData()
		}

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
