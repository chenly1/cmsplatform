<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="query">
                <el-form-item>
                    <el-input v-model="query.name" placeholder="主题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getListData">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd('notify')">新增通知模版</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd('message')">新增消息模版</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="datas" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index" width="40">
            </el-table-column>
            <el-table-column prop="name" label="主题" min-width="130" sortable>
            </el-table-column>
            <el-table-column prop="typeName" label="类型" width="100" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="150" sortable>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                    <el-button icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <!-- <el-button type="info" size="small" @click="previewEvent( scope.row)">详细</el-button>
                        <el-button v-if="!scope.row.releaseTime" type="danger" size="small" @click="handleDel( scope.row)">删除</el-button>
                        <el-button v-if="!scope.row.releaseTime" type="success" size="small" @click="releaseEvent( scope.row)">发布</el-button>
                        <el-button v-if="scope.row.releaseTime" type="warning" size="small" @click="withdrawalEvent( scope.row)">撤回</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!--底部工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-size="page.pageSize" :total="page.total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>


<script>
import { getPageListData } from '../../api/api'

export default {
    data() {
        return {
            query: {
                name: ''
            },
            datas: [
                {
                    id: '',
                    name: '生日通知',
                    typeValue: 'notify',
                    typeName: "通知",
                    title: '您有一个生日消息！',
                    content: '生日快乐！',
                    createTime: '2017-11-01'
                },
                {
                    id: '',
                    name: '生日消息',
                    typeValue: 'message',
                    typeName: "消息",
                    title: 'HappyBirthday',
                    content: '生日快乐！',
                    createTime: '2017-11-01'
                }
            ],
            page: {
                total: 0,// 总数
                pageSize: 10,
                pageNum: 1
            },
            listLoading: false,
            sels: [],// 列表选中列

        }
    },
    methods: {
        // 获取table列表数据
        getListData() {
            let para = {
                page: this.page,
                title: this.query.title
            };
            // this.listLoading = true;
            // getPageListData().then((res) => {
            //     this.total = res.data.body.length; // 数量
            //     this.datas = res.data.body; // 数据
            // this.listLoading = false;
            // });
            // this.$http.get('/manager/article').then(function(response) {
            //         //this.$set('tableData', response.data);
            //         this.datas = response.data.data;
            //         this.total = response.data.data.length;
            //         this.listLoading = false;
            // });

        },
        // 分页
        handleCurrentChange(val) {
            this.page.pageNum = val;
            this.getListData();
        },
        // 新增界面
        handleAdd: function(typeValue) {
            if (typeValue == 'notify') {
                this.$router.push({ path: '/template/notifyEdit', query: { type: 'add' } });
            } else if (typeValue == 'message') {
                this.$router.push({ path: '/template/messageEdit', query: { type: 'add' } });
            }
        },
        // 编辑界面
        handleEdit(row) {
            var queryValue = {
                id: row.id,
                name: row.name,
                typeValue: row.typeValue,
                typeName: row.typeName,
                title: row.title,
                content: row.content,
                createTime: row.createTime
            };
            // var queryValue = row;
            queryValue.type = 'edit';
            // debugger;
            if (row.typeValue == 'notify') {
                this.$router.push({ path: '/template/notifyEdit', query: queryValue });
            } else if (row.typeValue == 'message') {
                this.$router.push({ path: '/template/messageEdit', query: queryValue });
            }
        },
        // 删除
        handleDel: function(index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = { id: row.pid };
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
        },
        // 批量选择
        selsChange: function(sels) {
            this.sels = sels;
        },
        // 批量删除
        batchRemove: function() {
            var ids = this.sels.map(item => item.pid).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = { ids: ids };
                // batchRemoveUser(para).then((res) => {
                //     this.listLoading = false;
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.getListData();
                // });
            }).catch(() => {

            });
        },
        // 发布
        releaseEvent: function(index, row) {
            this.$confirm('确认发布该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = { id: row.pid };
                // removeUser(para).then((res) => {
                this.listLoading = false;
                this.$message({
                    message: '发布成功',
                    type: 'success'
                });
                this.getListData();
                // });
            }).catch(() => {

            });
        },
        // 撤回
        withdrawalEvent: function(index, row) {
            this.$confirm('确认撤回该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = { id: row.pid };
                // removeUser(para).then((res) => {
                this.listLoading = false;
                this.$message({
                    message: '撤回成功',
                    type: 'success'
                });
                this.getListData();
                // });
            }).catch(() => {

            });
        },
        // 预览
        previewEvent: function(index, row) {
            this.$message({
                message: '页面即将跳转',
                type: 'info'
            });
        }
    },
    mounted() {
        this.getListData();
    }
}
</script>


<style scoped>

</style>