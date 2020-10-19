<!-- Inventory_change  库存变更记录 -->
<template>
    <div>
        <div class="container">
            <div class="handle-box flex flex_item_between">
            	<el-form ref="form" :model="form" class="flex flex_wrap" label-width="80px">
            		<el-form-item label="产品/服务">
            			<el-input v-model="form.productName" placeholder="输入产品名称/ID" class="handle-input mr10"></el-input>
            		</el-form-item>
					
					<el-form-item label="入库批次">
            			<el-input v-model="form.warehousingBatch" placeholder="输入产品名称/ID" class="handle-input mr10"></el-input>
            		</el-form-item>
					<el-form-item label="入库批次" class="mr10">
            			<div class="block">
            			    <el-date-picker
							  @change="time"
            			      v-model="value1"
            			      type="datetimerange"
            			      range-separator="至"
            			      start-placeholder="开始日期"
            			      end-placeholder="结束日期">
            			    </el-date-picker>
            			  </div>
            		</el-form-item>
            		
            	</el-form>
				<div>
					<el-button type="primary" @click="handleSearch">搜索</el-button>
				</div>
            </div>
            <el-table
				height="600"
                :data="tableData.data"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="warehousingId" label="记录ID" width="150" align="center"></el-table-column>
                <el-table-column prop="productId" label="产品ID" width="80" align="center"></el-table-column>
                <el-table-column prop="productName" label="产品名称"></el-table-column>
				<el-table-column prop="productUnit" label="商品单位" width="80" align="center"></el-table-column>
				<el-table-column prop="warehousingNum" label="入库数量" width="80" align="center"></el-table-column>
				<el-table-column prop="warehousingBatch" label="入库批次ID" align="center"></el-table-column>
				<el-table-column prop="warehousingAccount" label="入库账号昵称" align="center"></el-table-column>
				<el-table-column prop="warehousingTime" label="入库时间" align="center"></el-table-column>
            </el-table>
           <div class="pagination">
           	<el-pagination background layout="total, prev, pager, next"
           	 :page-count="pageTotal" :page-size="10" @current-change="handlePageChange"></el-pagination>
           </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchData,listShopWarehousing } from '../../../api/index';
import { dateFormat } from '../../../utils/utils';
export default {
    name: 'Inventory_change',
	computed:{
	     ...mapState(['accountId']),  //显示state的数据
	    },
    data() {
        return {
			form:{
				// account_id:this.accountId,
				productName:'',
				warehousingBatch:'',
			},
			startTime:'',
			endTime:'',
			page:1,
			pageTotal: 0,
            tableData: [],
            multipleSelection: [],
            delList: [],
            idx: -1,
            id: -1,
			value1:[],
        };
    },
    created() {
        this.getData();
    },
    methods: {
		time(e){
			var arr = [];
			e.map((item, index) => {
				arr.push(dateFormat("YYYY-mm-dd HH:MM:SS", item))
			})
			this.startTime = arr[0]
			this.endTime = arr[1]
		},
        // 获取 easy-mock 的模拟数据
        getData() {
			var item = this.form;
			// console.log(this.accountId)
			var query = {
				data:{
					accountId:this.accountId,
					productName:item.productName,
					warehousingBatch:item.warehousingBatch,
					startTime:'',  		 
					endTime:'',  	 
					nowPage:this.page,
					pageCount:9,
				}
			};
			listShopWarehousing(query).then(res => {
				if(res.code == 1){
					this.tableData = res;
					this.pageTotal = res.allPage;
				}
			});

        },
        // 触发搜索按钮
        handleSearch() {
            this.page = 1;
            this.getData();
        },

        // 分页导航
        handlePageChange(val) {
           this.page = val;
            this.getData();
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
