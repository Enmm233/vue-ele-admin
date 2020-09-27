<template>
    <div class="end">
		<i class="el-icon-lx-roundcheckfill"></i>
		<h1>添加商品完成</h1>
    </div>
</template>

<script>

    export default {
        name: 'end',
		props: ['num'],
        data: function(){
            return {
               
            }
        },
        methods: {
            
        }
    }
</script>
<style scoped>
	.end{
		padding: 120px 0 220px 0;
		color: #67C23A;
		text-align: center;
	}
	.el-icon-lx-roundcheckfill{
		font-size: 200px;
		display: block;
		margin-bottom: 40px;
	}
</style>