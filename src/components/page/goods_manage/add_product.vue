<!-- add_product 添加产品 -->
<template>
	<div>
		
		<h1>{{$store.state.count}}</h1>
		<h2>{{count}}</h2>
		<h2>{{$store.getters.showNum}}</h2>
		<h2>{{showNum}}</h2>
		<div>
			<el-button @click="btnHandler4">一秒后-n</el-button>
			<el-button @click="btnHandler3">一秒后+1</el-button>
			<el-button @click="btnHandler2">-n</el-button>
			<el-button @click="btnHandler1">函数-1</el-button>
			<el-button @click="btnHandler">+n</el-button>
			<el-button @click="$store.commit('add')">+1</el-button>
			<el-button @click="$store.commit('jian')">-1</el-button>
		</div>
		
		
		<div @click="gopage()">
			<el-button type="primary">查看</el-button>
		</div>
	</div>
	
</template>

<script>
	import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'
	import { fetchData } from '../../../api/index';
	export default {
		name: 'basetable',
		computed:{
			...mapState(['count']),  //显示state的数据
			...mapGetters(['showNum']) //显示Getters的数据
		},
		data() {
			return {
				}
		},
		created() {
		},
		methods: {
			//调用mutations中的函数使得可以直接在页面中用this.xxx()来调用
			...mapMutations(['sub','subN']),
			//调用actions中的函数使得可以直接在页面中用this.xxx()来调用
			...mapActions(['addAsync','subNAsync']),
			btnHandler1(){
				this.sub()
			},
			btnHandler2(){
				this.subN(3)
			},
			btnHandler3(){
				//dispatch的作用，触发actions的方式
				this.$store.dispatch('addAsync')
			},
			btnHandler4(){
				//携带参数的方法与commit的方式一样
				this.$store.dispatch('subNAsync',5)
			},
			btnHandler(){
				//commit的作用，就是调用某个mutation函数
				this.$store.commit('addN',3)
			},
			gopage(){
				this.$router.go(-1)
			}
		}
	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 200px;
		display: inline-block;
	}

	.pick-input {
		width: 100px;
		display: inline-block;
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>
