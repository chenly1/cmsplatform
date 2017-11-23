<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="query">
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="query.name" placeholder="主题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="query.triggerType" placeholder="触发方式" clearable>
                        <el-option v-for="item in triggerType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-form-item>
                    <el-button v-on:click="getListData" icon="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="plus" @click="handleAdd('notify')">新增</el-button>
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
            <el-table-column prop="triggerName" label="触发方式" width="130" sortable>
            </el-table-column>
            <el-table-column prop="clockedTime" label="定时时间" width="120" sortable>
            </el-table-column>
            <el-table-column prop="isExecute" label="是否执行" width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isExecute==='否'" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button v-if="scope.row.isExecute==='否'" icon="delete" type="danger" size="small" @click="handleDel( scope.row)">删除</el-button>
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
                name: '',
                triggerType:''
            },
            page: {
                total: 0,// 总数
                pageSize: 10,
                pageNum: 1
            },
            listLoading: false,
            sels: [],// 列表选中列
            triggerType:[
                {
                    value: "immediate",
                    label: "立即"
                },
                {
                    value: "clocked",
                    label: "定时"
                }
            ],
            datas: [
                {
                    id: '',
                    name: '生日通知',
                    triggerType: 'immediate',
                    triggerName: "立即",
                    title: '您有一个生日消息！',
                    content: '生日快乐！',
                    clockedTime: '',
                    isExecute: '是'
                },
                {
                    id: '',
                    name: '生日消息',
                    triggerType: 'clocked',
                    triggerName: "定时",
                    title: 'HappyBirthday',
                    content: '生日快乐！',
                    clockedTime: '2017-12-01',
                    isExecute: '否'
                }
            ]

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
            this.$router.push({ path: '/news/edit', query: { type: 'add' } });
            
        },
        // 编辑界面
        handleEdit(row) {
            var queryValue = {
                id: row.id,
                name: row.name,
                typeValue: row.typeValue,
                typeName: row.typeName,
                title: row.title,
                content: row.content
            };
            // var queryValue = row;
            queryValue.type = 'edit';
            // debugger;
            this.$router.push({ path: '/template/messageEdit', query: queryValue });
            
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

.toolbar .el-select {
    /* border: 1px solid red; */
    margin-right: 10px;
    margin-bottom: 0;
}
</style>