<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-col :span="6" v-for="(o, index) in total" :key="o" :offset="1" style="padding-top: 20px;">
            <el-card :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span class="title" style="line-height: 36px;">{{ datas[o-1].name }}</span>
                </div>
                <div class="image">
                    <img v-if="datas[o-1].imgsrc" v-bind:src="datas[o-1].imgsrc" />
                    <img v-else :src="imgsrc" />
                </div>
                <div style="padding: 14px;">
                    <div class="bottom clearfix">
                        <span class="updateTime">更新于：{{ datas[o-1].updateDate }}</span>
                        <br/>
                        <br/>
                        <el-dropdown style="float: right">
                            <el-button type="primary">
                                点击操作
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="handleEdit(datas[o-1].pid,datas[o-1].name,datas[o-1].content)">编辑</el-dropdown-item>
                                <el-dropdown-item divided @click.native="handleDel()">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-card>
        </el-col>
        <!--底部工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--新增界面-->
        <el-dialog title="新增" size="large" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="components-container">
                <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。支持页面内多次调用。</div>
                <button @click="getUEContent()">获取内容</button>
                <div class="editor-container">
                    <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog title="编辑" size="large" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="components-container">
                <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。支持页面内多次调用。</div>
                <button @click="getUEContent()">获取内容</button>
                <div class="editor-container">
                    <UE :defaultMsg=editdefaultMsg :config=editconfig :id=ueeditue ref="ue"></UE>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getMaterialData } from '../../api/api'
import UE from '../../components/ue/ue.vue';
export default {
    components: { UE },
    data() {
        return {
            filters: {
                name: ''
            },
            total: 0, // 总数
            page: 1,
            datas: [],
            // updateDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
            imgsrc: require('../../assets/xijing.jpg'),
            addFormVisible: false,// 新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ]
            },
            // 新增界面数据
            addForm: {
                pid: '',
                name: ''
            },
            defaultMsg: '',// ueditor默认文本
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            },
            ue1: "ue1",
            editFormVisible: false,// 编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ]
            },
            // 编辑界面数据
            editForm: {
                pid: '',
                name: ''
            },
            editdefaultMsg: '',// ueditor默认文本
            editconfig: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            },
            ueeditue: "ueeditue"
        }
    },
    methods: {
        // 获取table列表数据
        getListData() {
            let para = {
                page: this.page,
                name: this.filters.name
            };
            getMaterialData().then((res) => {
                this.total = res.data.body.length; // 数量
                this.datas = res.data.body; // 数据
                // debugger;
            });
        },
        // 分页
        handleCurrentChange(val) {
            this.page = val;
            this.getListData();
        },
        // 获取ue内容
        getUEContent() {
            let content = this.$refs.ue.getUEContent(); // 调用子组件方法
            this.$notify({
                title: '获取成功，可在控制台查看！',
                message: content,
                type: 'success'
            });
            console.log(content)
        },
        // 显示新增界面
        handleAdd: function() {
            this.addFormVisible = true;
            this.addForm = {
            };
        },
        // 新增
        addSubmit: function() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        let para = Object.assign({}, this.addForm);
                        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
                        // addUser(para).then((res) => {
                        this.addLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        // this.$refs['addForm'].resetFields(); // 重置form
                        this.addFormVisible = false;
                        // debugger;
                        this.$refs.ue.clear(); // 调用子组件方法
                        this.getListData();
                        // });
                        console.log('add success');
                        console.log(para);
                        console.log(content);
                    });
                }
            });
        },
        // 新增close按钮
        // closeDialog(done){
        // 　　this.$confirm('确认关闭？', '提示', {})
        // 　　.then(_ => {
        //         done();
        //         this.$refs['addForm'].resetFields();
        //         this.addFormVisible = false;
        //     })
        //     .catch(_ => { });
        // },
        // 显示编辑界面
        handleEdit: function(pid, name, content) {
            this.editFormVisible = true;
            this.editForm.pid = pid;
            this.editForm.name = name;
            // debugger;
            // this.$refs.ue.setUEContent(content); // 调用子组件方法
            this.editdefaultMsg = content;
        },
        // 编辑
        editSubmit: function() {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        let para = Object.assign({}, this.editForm);
                        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
                        // editUser(para).then((res) => {
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.$refs.ue.clear(); // 调用子组件方法
                        // this.$refs['editForm'].resetFields(); // 重置form
                        this.editFormVisible = false;
                        this.getListData();
                        // });
                        console.log('edit success');
                        console.log(para);
                        console.log(content);
                    });
                }
            });
        },
        // 删除
        handleDel: function(index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                // let para = { id: row.pid };
                // removeUser(para).then((res) => {
                this.listLoading = false;
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.getListData();
                // });
            }).catch(() => {

            });
        }
    },
    mounted() {
        this.getListData();
    }
}

// Date.prototype.format = function(format) {
//     var args = {
//         "M+": this.getMonth() + 1,
//         "d+": this.getDate(),
//         "h+": this.getHours(),
//         "m+": this.getMinutes(),
//         "s+": this.getSeconds(),
//         "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
//         "S": this.getMilliseconds()
//     };
//     if (/(y+)/.test(format))
//         format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var i in args) {
//         var n = args[i];
//         if (new RegExp("(" + i + ")").test(format))
//             format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
//     }
//     return format;
// };
</script>

<style scoped>
.title {
    font-size: 18px;
    color: #28333c;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
    min-width: 100px;
    height: 230px;
    text-align: center;
    background-color: #e8ecef;
    border-top: 2px solid #e8ecef;
    border-bottom: 2px solid #e8ecef;
}

.image img {
    /* max-height: 250px; max-width: 100%;vertical-align:middle; */
    height: 100%;
    width: 100%;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.updateTime {
    font-size: 13px;
    line-height: 15px;
    color: #999;
}
</style>