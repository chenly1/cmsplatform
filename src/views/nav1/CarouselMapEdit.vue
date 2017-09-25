<template>
    <section class="form-section">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="模版标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="启用">
                <el-checkbox v-model="ruleForm.original"></el-checkbox>
            </el-form-item>
            <el-form-item label="上传图片" prop="fileList">
                <el-upload class="upload-demo" ref="upload" action="/static/img" 
                :before-upload="beforeAvatarUpload" :on-change="changeEvent" 
                :on-preview="handlePreview" :on-remove="handleRemove" 
                :file-list="ruleForm.fileList" :auto-upload="false" 
                :multiple="false">
                    <el-button slot="trigger" size="small" type="primary" @click="clearUploadedImage">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="显示顺序" prop="sort">
                <el-input v-model.number="ruleForm.sort"></el-input>
            </el-form-item>
            <el-form-item label="来源地址">
                <el-input v-model="ruleForm.sourceUrl" :disabled="false" class="login-form-input">
                    <template slot="prepend"> Http://</template>
                </el-input>
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
        var checkNum = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入显示顺序'));
            }
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };
        var checkImg = (rule, value, callback) => {
            if (value.length==0) {
                return callback(new Error('请上传图片'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                title: this.$route.query.title || '',
                fileList: [],
                sort: this.$route.query.sort || '',
                link: this.$route.query.link || ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入模版标题', trigger: 'blur' }
                ],
                sort: [
                    { trigger: 'blur', required: true, validator: checkNum }
                ],
                fileList: [
                    { required: true, message: '请上传图片', trigger: 'blur', validator: checkImg }
                ]
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        let para = Object.assign({}, this.ruleForm);
                        console.log(para);
                        this.$message({
                            message: "提交成功，请在控制台查看json!！",
                            type: 'success'
                        });
                        this.$router.push('/carouselMap');
                    }).catch(() => {

                    });
                } else {
                    return false;
                }
            });
        }, 
        cancelClick() {
            this.$confirm('确认退出编辑吗？', '提示', {}).then(() => {
                this.$message({
                    message: "返回成功!",
                    type: 'success'
                });
            }).then(() => {
                this.$router.push('/carouselMap');
            }).catch(() => {

            });
        },
        handleRemove(file, fileList) {
            this.ruleForm.fileList=[];
        },
        handlePreview(file) {
            console.log(file);
        },
        changeEvent(file, fileList) {
            var suffixName = file.name.split('.')[file.name.split('.').length-1];//取文件名
            const isJPG = suffixName === 'jpeg' || suffixName === 'png'|| suffixName === 'jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            if(isJPG && isLt2M){
                this.ruleForm.fileList.uid = file.uid;
                this.ruleForm.fileList.name = file.name;
                this.ruleForm.fileList.size = file.size;
                this.ruleForm.fileList.url = file.url;
                this.ruleForm.fileList.percentage = file.percentage;
                this.ruleForm.fileList.raw = file.raw;
                this.ruleForm.fileList.status = file.status;
                this.ruleForm.fileList.length = 1;
            }
            return isJPG && isLt2M;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        clearUploadedImage() {
            this.$refs.upload.clearFiles();
            this.ruleForm.fileList=[];
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
