<template>
    <div class="imageTxt">
		<quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
		<!-- <el-button class="editor-btn" type="primary" @click="submit">提交</el-button> -->
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'imageTxt',
		props: ['num'],
        data: function(){
            return {
                content: '',
                editorOption: {
                    placeholder: 'Hello World'
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            }
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