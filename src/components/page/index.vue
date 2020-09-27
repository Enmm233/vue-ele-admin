<template>
	<div>
		<div id="chartColumn" style="width: 100%; height: 400px;">
		</div>
	</div>
</template>

<script>
	import Schart from 'vue-schart';
	import bus from '../common/bus';
	import echarts from 'echarts'
	export default {
		name: 'index',
		data() {
			return {
				chartColumn: null
			};
		},
		components: {},
		computed: {

		},
		mounted() {
			this.drawLine();
		},
		methods: {
			drawLine() {
				this.chartColumn = echarts.init(document.getElementById('chartColumn'));

				this.chartColumn.setOption({
					title: {
						text: 'Column Chart'
					},
					tooltip: {},
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line'
					}]
				});
			}

		}
	};
</script>


<style scoped>

</style>
