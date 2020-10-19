<template>
	<div style="width:100%">
		<div id="iCenter"></div>
	</div>
</template>

<script>
	const AMap = window.AMap;
	var map, marker;
	export default {
		props: ['arriveCoor'],
		data() {
			return {
				arrive: "", //位置信息
			};
		},
		// mounted() {
		// 	var that = this;
		// 	var time = setTimeout(function(){
		// 		that.init()
		// 	},100)
		// },
		// methods:{
		// 	init(){
		// 		console.log(this.arriveCoor)
		// 	        map = new AMap.Map('iCenter', {
		// 	          center:this.arriveCoor,
		// 	          resizeEnable: true,
		// 	          zoom: 10
		// 	        })
		// 	        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
		// 	          map.addControl(new AMap.ToolBar())
		// 	          map.addControl(new AMap.Scale())
		// 	        })
		// 	      }
		// }
		mounted() {
			// var that = this;
			// var time = setTimeout(function(){
			// 	that.mapDraw(that.arriveCoor),
			// 	that.mapCoor(that.arriveCoor)
			// },100)
			
		},
		methods: {
			mapDraw(arriveCoor) {
				map = new AMap.Map('iCenter', { //map-location是嵌地图div的id
					resizeEnable: true, //是否监控地图容器尺寸变化
					zoom: 16, //初始化地图层级
					center: arriveCoor //初始化地图中心点
				});
				AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
					map.addControl(new AMap.ToolBar())
					map.addControl(new AMap.Scale())
				})
				// 定位点
				this.addMarker(arriveCoor);
			},
			// 实例化点标记
			addMarker(arriveCoor) {
				var _this = this;
				marker = new AMap.Marker({
					icon: "", //图片ip
					imageSize: "20px",
					position: arriveCoor,
					offset: new AMap.Pixel(-13, -30),
					// 设置是否可以拖拽
					draggable: true,
					cursor: 'move',
					// 设置拖拽效果
					raiseOnDrag: true
				});
				marker.setMap(map);
			},
			mapCoor(lnglatXY) {
				var _this = this;
				AMap.service('AMap.Geocoder', function() { //回调函数
					var geocoder = new AMap.Geocoder({});
					geocoder.getAddress(lnglatXY, function(status, result) {
						if (status === 'complete' && result.info === 'OK') {
							//获得了有效的地址信息:
							_this.arrive = result.regeocode.formattedAddress;
						} else {
							_this.arrive = "暂无位置";
						}
					});
				})
			},
		},
	};
</script>

<style scoped>
	#iCenter {
		height: 300px;
		position: relative;
		display: flex;
		flex: 1;
		margin-top: 20px;
	}
</style>
