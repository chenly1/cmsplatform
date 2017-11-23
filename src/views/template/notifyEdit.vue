<template>
    <section class="form-section">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="主题" prop="name">
                <el-input placeholder="必填" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input placeholder="必填" type="textarea" name="content"  v-model="ruleForm.content" :autosize="{ minRows: 5, maxRows: 8}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click.native="cancelClick">返回</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
import { update, getListData, submit } from '../../api/api'

export default {
    data() {
        return {
            getDataUrl: '/manager/messagetemplate/',
            ruleForm: {
                type: this.$route.query.type || '',
                id: '',
                name: '',
                title: '',
                content: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入主题', trigger: 'blur' },
                    { max: 50, message: "最长不超过50个字", trigger: 'blur' }
                ],
                title:[
                    { max: 10, message: "最长不超过10个字", trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请填写内容', trigger: 'blur' },
                    { max: 50, message: "最长不超过50个字", trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 查询
        getListData() {
            this.listLoading = true;
            var _that = this;
            var url = this.getDataUrl + this.$route.query.rowid;
            // debugger;
            getListData(url).then(function(response) {
                // debugger;
                _that.ruleForm.id = response.data.data.id;// 数据
                _that.ruleForm.title = response.data.data.title;// 数据
                _that.ruleForm.name = response.data.data.name;// 数据
                _that.ruleForm.content = response.data.data.content;// 数据
                _that.listLoading = false;
            }).catch(() => { });
        },
        // 提交
        submitForm(formName) {
            // debugger;
            var _that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        let para = Object.assign({}, this.ruleForm);
                        if (this.$route.query.pageType == 'add') {
                            // debugger;
                            submit(_that.getDataUrl, para).then(function(res) {
                                // debugger;
                                if (res.data.flag === true) {
                                    _that.$message({
                                        message: '提交成功',
                                        // type: 'success'
                                    });
                                    _that.$router.push('/template/search');
                                } else {
                                    _that.$message({
                                        showClose: true,
                                        duration: 0,
                                        message: '提交失败，' + res.data.message,
                                        type: 'error'
                                    });
                                }
                            }).catch(() => {
                            });
                        } else if (this.$route.query.pageType == 'edit') {
                            // debugger;
                            let url = _that.getDataUrl + para.id;
                            update(url, para).then(function(res) {
                                // debugger;
                                if (res.data.flag === true) {
                                    _that.$message({
                                        message: '提交成功',
                                        // type: 'success'
                                    });
                                    _that.$router.push('/template/search');
                                } else {
                                    _that.$message({
                                        showClose: true,
                                        duration: 0,
                                        message: '提交失败，' + res.data.message,
                                        type: 'error'
                                    });
                                }
                            }).catch(() => {
                            });
                        }
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
        // console.log(this.$route.query);
        // debugger;
        if (this.$route.query.pageType == 'edit') {
            this.getListData();
        }
    }
}
</script>
<style scope>
.form-section {
    padding: 10px;
    width: 500px;
}
</style>
