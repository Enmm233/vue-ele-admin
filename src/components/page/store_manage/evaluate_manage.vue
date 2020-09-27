<!-- evaluate_manage  评论管理 -->
<template>
	<div class="container">
		<evaluate-list></evaluate-list>
	</div>
</template>

<script>
	import evaluateList from '../../common/evaluate/evaluate_list.vue'
	export default {
		name: 'evaluate_manage',
		components: {
			evaluateList,
		},
		data() {
			return {
			}
		},
		methods: {
			
		},
		created() {}

	};
</script>

<style scoped>
	.container{
		height: 92%;
	}
</style>
