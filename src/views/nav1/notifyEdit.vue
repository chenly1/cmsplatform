<template>
    <section class="form-section">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="模版标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="提醒方式">
                <el-checkbox-group v-model="ruleForm.way">
                    <el-checkbox label="短信" @change="handleCheckedChange"></el-checkbox>
                    <el-checkbox label="电话" @change="handleCheckedChange"></el-checkbox>
                    <el-checkbox label="邮件" @change="handleCheckedChange"></el-checkbox>
                    <el-checkbox label="微信" @change="handleCheckedChange"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="提醒时间">
                <el-row>
                    <el-form-item prop="date">
                        <el-time-picker type="fixed-time" placeholder="选择提醒时间" v-model="ruleForm.date" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                </el-row>
            </el-form-item>
            <el-form-item label="详细内容" prop="source">
                <el-input type="textarea" name="source"  v-model="ruleForm.source" :autosize="{ minRows: 5, maxRows: 8}"></el-input>
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
                title: this.$route.query.title || '',
                way: [],
                date: '',
                source: '',
            },
            rules: {
                title: [
                    { required: true, message: '请输入模版标题', trigger: 'blur' }
                ],
                // way: [
                //     { type: 'array', required: true, message: '请至少选择一个提醒方式', trigger: 'change' }
                // ],
                // date: [
                //     { type: 'date', required: true, message: '请选择提醒时间', trigger: 'change' }
                // ],
                source: [
                    { required: true, message: '请填写详细内容', trigger: 'blur' }
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
    }
}
</script>
<style>
.form-section {
    padding: 10px;
    width: 500px;
}
</style>
