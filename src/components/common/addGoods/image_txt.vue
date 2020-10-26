<template>
    <div>
        <div class="imageTxt">
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
            <!-- <el-button class="editor-btn" type="primary" @click="submit">提交</el-button> -->
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
	import { mapState } from 'vuex'
	import {
		uploadImg
	} from '../../../api/index';
	import axios from 'axios';
    export default {
       name: 'imageTxt',
       props: ['num'],
	   computed:{
	   	...mapState(['imgUrl','accountId','imgStr']),  //显示state的数据
	   },
        data: function(){
            return {
                content:'',
                html:'',
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
				var query = { //上传图片固定参数
					data: "{'flag': '3'}"
				};
                var formdata = new FormData();
                formdata.append('data', query.data);
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                axios({
                    url: this.imgStr,
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((res) => {
                    this.$refs.md.$img2Url(pos, this.imgUrl+res.data.data);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
				this.value = value;
            },

        }
    }
</script>
<style scoped>
	.imageTxt{
		padding: 40px 0;
	}
    .editor-btn{
        margin-top: 20px;
    }
</style>