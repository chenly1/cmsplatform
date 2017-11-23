<template>
    <section class="form-section">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="消息模版" prop="notify">
                <el-select v-model="ruleForm.notify" filterable placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-col :span="24"> -->
                <el-form-item label="是否推送">
                    <el-checkbox v-model="ruleForm.isCheck" @change="changeAgree"></el-checkbox>
                </el-form-item>
            <!-- </el-col> -->
            <!-- <el-col :span="6"> -->
                <el-form-item label="推送通知内容是否一致">
                    <el-checkbox v-model="ruleForm.agree" @change="changeOnOff" :disabled='agreeValidate'></el-checkbox>
                </el-form-item>
            <!-- </el-col> -->
            <el-form-item label="通知模版" prop="message" :required="reqMessage">
                <el-select v-model="ruleForm.message" filterable placeholder="请选择" :disabled="disabled">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源地址" prop="sourceUrl">
                <el-input v-model="ruleForm.sourceUrl" class="login-form-input">
                </el-input>
            </el-form-item>
            <el-form-item label="触发方式" prop="triggerType">
                <el-radio-group v-model="ruleForm.triggerType" @change="changeTime">
                    <el-radio label="immediate">立即</el-radio>
                    <el-radio label="clocked">定时</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="定时时间" prop="triggerTime" :required="reqTime">
                <el-date-picker v-model="ruleForm.triggerTime" type="datetime" placeholder="选择日期时间" :disabled="triggerValidate" clearable>
                </el-date-picker>
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
            disabled: true,
            agreeValidate:true,
            triggerValidate:true,
            reqMessage: false,
            reqTime:false,
            ruleForm: {
                isCheck: false,
                agree: true,
                message: '',
                notify: '',
                sourceUrl: '',
                triggerType: '',
                triggerTime:''
            },
            rules: {
                notify: [
                    { required: true, message: '请输入主题', trigger: 'blur' },
                ],
                message: [
                    { max: 15, message: "最长不超过15个字", trigger: 'blur' }
                ],
                triggerType: [
                    { required: true, message: '请选择触发方式', trigger: 'change' },
                ],
                content: [
                    { required: true, message: '请填写内容', trigger: 'blur' },
                    { max: 100, message: "最长不超过100个字", trigger: 'blur' }
                ]
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }],
            options2: [{
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
        };
    },
    methods: {
        // 是否推送
        changeAgree() {
            // debugger;
            if (this.ruleForm.isCheck === true) {
                // 不选择通知模版，给表单验证添加相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
                this.agreeValidate = false;
                this.reqMessage = false;
            } else {
                // 选择通知模版，表单验证中的相应规则，并添加红色星号。
                this.agreeValidate = true;
                this.ruleForm.agree = true;
                this.disabled = true;
            }
        },
        // 是否选择通知模版
        changeOnOff() {
            // debugger;
            if (this.ruleForm.agree === true) {
                // 不选择通知模版，给表单验证添加相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
                this.disabled = true;
                this.ruleForm.message = '';
                this.reqMessage = false;
            } else {
                // 选择通知模版，表单验证中的相应规则，并添加红色星号。
                this.disabled = false;
                this.reqMessage = true;
            }
        },
        // 是否选择定时时间
        changeTime() {
            // debugger;
            if (this.ruleForm.triggerType !== 'clocked') {
                // 不选择定时时间，给表单验证添加相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
                this.triggerValidate = true;
                this.ruleForm.triggerTime = '';
                this.reqTime = false;
            } else {
                // 选择定时时间，表单验证中的相应规则，并添加红色星号。
                this.triggerValidate = false;
                this.reqTime = true;
            }
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
                        this.$router.push('/news/search');
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
                this.$router.push('/news/search');
            }).catch(() => {

            });
        }
    },
    mounted() {
        // console.log(this.$route.query);
    }
}
</script>
<style>
.form-section {
    padding: 10px;
    width: 500px;
}

.login-form-input .el-input__inner {
    border: 0 none;
    border-bottom: 1px solid #ccc;
    border-radius: 0px;
}
</style>
