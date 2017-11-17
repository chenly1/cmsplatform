<template>
    <section class="form-section">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="主题" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" name="content" v-model="ruleForm.content" :autosize="{ minRows: 5, maxRows: 8}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click.native="cancelClick">返回</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                id: this.$route.query.id || '',
                name: this.$route.query.name || '',
                typeValue: this.$route.query.typeValue || '',
                typeName: this.$route.query.typeName || '',
                title: this.$route.query.title || '',
                content: this.$route.query.content || '',
                createTime: this.$route.query.createTime || ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入主题', trigger: 'blur' }, 
                ],
                title:[
                    { max: 10, message: "最长不超过10个字", trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请填写内容', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleCheckedChange(event) {
            var _that = this;
            var source = _that.ruleForm.source;
            if (event.target.checked) {
                source += event.target.value;
            }
            else {
                source = source.replace(event.target.value, '');
            }
            _that.ruleForm.source = source;
        },
        submitForm(formName) {
            // debugger;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        let para = Object.assign({}, this.ruleForm);
                        console.log(para);
                        this.$message({
                            message: "提交成功，请在控制台查看json!！",
                            type: 'success'
                        });
                    }).then(() => {
                        this.$router.push('/template/search');
                    }).catch(() => {

                    });
                } else {
                    return false;
                }
            });
        }, cancelClick() {
            this.$confirm('确认退出编辑吗？', '提示', {}).then(() => {
                this.$message({
                    message: "返回成功!",
                    type: 'success'
                });
            }).then(() => {
                this.$router.push('/template/search');
            }).catch(() => {

            });
        }
    },
    mounted() {
        console.log(this.$route.query);
    }
}
</script>
<style>
.form-section {
    padding: 10px;
    width: 500px;
}
</style>
