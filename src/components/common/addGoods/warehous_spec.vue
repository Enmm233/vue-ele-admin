<template>
	<div class="spec">
		<div v-for="(item,index) in specList">
			<div class="f_item flex flex_item_mid">
				<div 
				class="left paddingL15" 
				:class="{'active':subIndex==item.spec}"
				@click="sub1(item)">{{item.spec}}</div>
			</div>
			<block v-if="item.child">
				<div v-for="(item2,index2) in item.child.attr">
					<div class="f_item flex flex_item_mid">
						<div
						 class="left paddingL30"
						 :class="{'active':subIndex2==item2.spec}"
						  @click="sub2(item.spec,item2)">{{item2.spec}}</div>
					</div>
				</div>
			</block>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'info',
		props: ['specList','specTitle'],
		data() {
			return {
				selectArr: [], //存放被选中的值
				subIndex:'', //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
				subIndex2:'', //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
			};
		},
		created(){
			
		},
		methods: {
			sub1(data){
				if(!data.child){
					this.subIndex = data.spec;
					var data = {
						sub:[{
							tittle:this.specTitle,
							tt:data.spec
						}]
					}
					this.$emit('transferUser',data)
				}
			},
			sub2(title,data){
				this.subIndex2 = data.spec;
				var data = {
					sub:[{
						tittle:this.specTitle,
						tt:title,
						data:[{
							ss:data.spec
						}]
					}]
				}
				this.$emit('transferUser',data);
			}
		}
	}
</script>

<style>
	.spec .spec_right {
		border: 1px solid #EBEEF5;
		cursor: pointer;
		font-size: 13px;
		font-weight: 500;
		color: #303133;
		margin-top: 15px;
		height: 450px;
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
	.active{
		color: #20A0FF;
	}
</style>
