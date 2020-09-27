<template>
	<div class="spec">
		<div class="head_t">
			{{specList.title}}
		</div>
		<div class="middle_s flex flex_wrap" v-if="specList.attr">
			<div class="tab" v-for="item in specList.attr" :class="{'active':subIndex==item.data}">
				<span @click="sub1(1,item)">{{item.data}}</span>
			</div>
		</div>
		<div v-if="specChild">
			<div class="head_t">
				{{specChild.title}}
			</div>
			<div class="middle_s flex flex_wrap" v-if="specChild.attr">
				<div class="tab" v-for="item in specChild.attr" :class="{'active':subIndex2==item.data}">
					<span @click="sub1(2,item)">{{item.data}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'info',
		props: ['specList', 'specTitle'],
		data() {
			return {
				selectArr: [], //存放被选中的值
				subIndex: '', //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
				subIndex2: '', //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
				specChild: ''
			};
		},
		created() {
		},
		methods: {
			sub1(type,data) {
				var item = {};
				item.sub = [
					{
						tittle: this.specList.title,
					}
				]
				if(type == 1){
					this.subIndex = data.data;
					this.subIndex2 = '';
					var items = {
						tt:data.data
					}
					// item.sub[0].push(items)
					Object.assign(item.sub[0],items);
					this.$emit('transferUser',item);
					// this.ferUser(item)
					if (data.child) {
						this.specChild = data.child
					} else {
						this.specChild = '';
					}
				}else if(type == 2){
					this.subIndex2 = data.data;
					var items = {
						tt:this.subIndex
					}
					Object.assign(item.sub[0],items);
					var itemss = {
						datas:[{
							ss:data.data
						}]
					}
					Object.assign(item.sub[0],itemss);
					this.$emit('transferUser',item);
					// this.ferUser(item)	
				}
			},
			// ferUser(data) {
			// 	console.log(JSON.stringify(data.sub[0].tittle))
			// 	var narA = this.selectArr;
			// 	console.log(JSON.stringify(this.selectArr))
			// 	narA.map((item, index) => {
			// 		if (item.tittle == data.sub[0].tittle) {
			// 			alert("重复")
			// 			narA.splice(index, 1)
			// 		}
			// 	})
			// 	narA.push(data.sub[0])
			// 	this.$emit('transferUser',narA);
				
			// },
		}
	}
</script>

<style>
	.spec .head_t{
		color: #000000;
		font-size: 1em;
		font-family: Source Han Sans CN;
		font-weight: bold;
		padding: 0.8em 0;
	}
	.spec .middle_s .tab{
		background: #F5F5F5;
		border-radius: 0.5em;
		margin-right: 0.8em;
		color: #000000;
		padding: 0.2em 0.6em;
		font-size: 0.8em;
		cursor: pointer;
	}
	.active{
		color: #17C158 !important;
		border: 1px solid #17C158;
	}
</style>
