<template>
    <section class="form-section">
        <el-form id="myForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="模版标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="启用">
                <el-checkbox v-model="ruleForm.logoffCheck"></el-checkbox>
            </el-form-item>
            <el-form-item v-if="checkEvent()" label="上传图片" prop="fileList">
                <!-- <input type="file" name="file" id="imageFile" class="element" accept="image/*">
                            </input> -->
                <el-upload class="upload-demo" ref="upload" action="/static/img" :on-change="changeEvent" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :file-list="ruleForm.fileList" :auto-upload="false" :multiple="false">
                    <el-button slot="trigger" size="small" type="primary" @click="clearUploadedImage">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="显示顺序" prop="sort">
                <el-input v-model.number="ruleForm.sort"></el-input>
            </el-form-item>
            <el-form-item label="来源地址" prop="link">
                <el-input v-model="ruleForm.link">
                    <!-- <template slot="prepend"> Http://</template> -->
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
import { submit, update, getListData } from '../../api/api'
export default {
    data() {
        var checkNum = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入显示顺序'));
            }
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字1-99'));
            } else if (value < 1 || value > 99) {
                callback(new Error('请输入数字1-99'));
            } else {
                callback();
            }
        };
        var checkImg = (rule, value, callback) => {
            debugger;
            if (value.length == 0) {
                return callback(new Error('请上传图片'));
            } else {
                callback();
            }
        };
        var checkLink = (rule, value, callback) => {
            // debugger;
            //下面的代码中应用了转义字符"\"输出一个字符"/"
            var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
            var objExp = new RegExp(Expression);
            if (objExp.test(value) == true) {
                callback();
            } else {
                return callback(new Error('请输入正确的地址'));
            }
        }
        return {
            ruleForm: {
                title: '',
                fileList: [],
                sort: '',
                link: '',
                logoffCheck: false
            },
            rules: {
                title: [
                    { required: true, message: '请输入模版标题', trigger: 'blur' }
                ],
                sort: [
                    { required: true, trigger: 'blur', validator: checkNum }
                ],
                fileList: [
                    { required: true, trigger: 'blur', validator: checkImg }
                ],
                link: [
                    { required: true, trigger: 'blur', validator: checkLink }
                ]
            },
        };
    },
    methods: {
        // 判断新增还是修改
        checkEvent() {
            let checkData = this.$route.query.type === 'add';
            return checkData;
        },
        // 修改时获取数据放入form中
        getData() {
            if (this.$route.query.type === 'edit') {
                var _that = this;
                var url = '/manager/banner/' + this.$route.query.id;
                getListData(url).then(function(response) {
                    _that.ruleForm = response.data.data;
                    if (response.data.data.logoff === 1) _that.ruleForm.logoffCheck = false;
                    else if (response.data.data.logoff === 2) _that.ruleForm.logoffCheck = true;
                }).catch(() => {
                });
            }
        },
        // 提交事件
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        let para = Object.assign({}, this.ruleForm);
                        var _that = this;
                        debugger;
                        if (this.$route.query.type === 'add') {//新增
                            debugger;
                            // formData.append('imageUrl',document.getElementById('imageFile').files[0]);
                            var formData = new FormData();
                            formData.append('id', para.id);
                            formData.append('title', para.title);
                            formData.append('link', para.link);
                            formData.append('sort', para.sort);
                            formData.append('file', para.fileList.raw);
                            if (para.logoffCheck == true) formData.append('logoff', 2);
                            else formData.append('logoff', 1);
                            var url = '/manager/banner';
                            debugger;
                            submit(url, formData).then(function(response) {
                                if (response.data.flag === true) {
                                    // _that.listLoading = false;
                                    _that.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    _that.$router.push('/carouselMap/mangement');
                                } else {
                                    _that.$message({
                                        showClose: true,
                                        duration: 0,
                                        message: '提交失败，' + response.data.message,
                                        type: 'error'
                                    });
                                }
                            }).catch(() => {

                            });
                        } else {//修改
                            if (para.logoffCheck == true) para.logoff = 2;
                            else para.logoff = 1;
                            var url = '/manager/banner/' + para.id;
                            update(url, para).then(function(response) {
                                if (response.data.flag === true) {
                                    // _that.listLoading = false;
                                    _that.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    _that.$router.push('/carouselMap/mangement');
                                } else {
                                    _that.$message({
                                        showClose: true,
                                        duration: 0,
                                        message: '提交失败，' + response.data.message,
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
        },
        // 退出事件
        cancelClick() {
            this.$confirm('确认退出编辑吗？', '提示', {}).then(() => {
                this.$message({
                    message: "返回成功!",
                    type: 'success'
                });
            }).then(() => {
                this.$router.push('/carouselMap/mangement');
            }).catch(() => {

            });
        },
        handleRemove(file, fileList) {
            this.ruleForm.fileList = [];
        },
        handlePreview(file) {
            console.log(file);
        },
        changeEvent(file, fileList) {
            var suffixName = file.name.split('.')[file.name.split('.').length - 1];//取文件名
            const isJPG = suffixName === 'jpeg' || suffixName === 'png' || suffixName === 'jpg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message({
                    showClose: true,
                    duration: 0,
                    message: '上传图片只能是 JPG 或 PNG 格式!',
                    type: 'error'
                });
            }
            if (!isLt2M) {
                this.$message({
                    showClose: true,
                    duration: 0,
                    message: '上传图片大小不能超过 2MB!',
                    type: 'error'
                });
            }
            if (isJPG && isLt2M) {
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
        clearUploadedImage() {
            this.$refs.upload.clearFiles();
            this.ruleForm.fileList = [];
        }
    },
    mounted() {
        this.getData();
    }
}
</script>
<style>
.form-section {
    padding: 10px;
    width: 500px;
}
</style>
