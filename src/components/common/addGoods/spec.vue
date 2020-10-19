<template>
	<div class="spec">
		<div class="head_t">
			{{specList.shopWaresSpec.specName}}
		</div>
		<div class="middle_s flex flex_wrap">
			<div class="tab" v-for="item in specList.shopWaresSpec.shopWaresSpecItems" :class="{'active':subIndex==item.name}">
				<span @click="sub1(1,item)">{{item.name}}</span>
			</div>
		</div>
		<div v-if="specChild != ''">
			<div class="head_t">
				{{specChild[0].type}}
			</div>
			<div class="middle_s flex flex_wrap">
				<div class="tab" v-for="item in specChild" :class="{'active':subIndex2==item.name}">
					<span @click="sub1(2,item)">{{item.name}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'info',
		props: ['specList'],
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
						tittle: this.specList.shopWaresSpec.specName,
					}
				]
				if(type == 1){
					// console.log(111)
					this.subIndex = data.name;
					// console.log(this.subIndex)
					this.subIndex2 = '';
					var items = {
						tt:data.name
					}
					// item.sub[0].push(items)
					Object.assign(item.sub[0],items);
					this.$emit('transferUser',item,data);
					// this.ferUser(item)
					if (data.shopWaresSpecItemItems) {
						this.specChild = data.shopWaresSpecItemItems
					} else {
						this.specChild = '';
					}
					// console.log(this.specChild)
				}else if(type == 2){
					this.subIndex2 = data.name;
					var items = {
						tt:this.subIndex
					}
					Object.assign(item.sub[0],items);
					var itemss = {
						datas:[{
							ss:data.name
						}]
					}
					Object.assign(item.sub[0],itemss);
					this.$emit('transferUser',item,data);
					// this.ferUser(item)	
				}
			}
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
