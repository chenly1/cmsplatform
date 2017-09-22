<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="主题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getListData">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="datas" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="title" label="主题" width="130" sortable>
            </el-table-column>
            <el-table-column prop="imageUrl" label="略缩图" min-width="150">
                <template scope="scope">
                    <img :src="scope.row.imageUrl" style=" height:100px;padding-top:5px;" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="显示顺序" width="120" sortable>
            </el-table-column>
            <el-table-column prop="logoff" label="状态" width="120" sortable>
                <template scope="scope">
                    <template>
                        <span v-if="scope.row.logoff===2">已启用</span>
                        <span v-else-if="scope.row.logoff===1">未启用</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button v-if="scope.row.logoff===1" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button v-if="scope.row.logoff===1" type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    <el-button v-if="scope.row.logoff===1" type="success" size="small" @click="releaseEvent(scope.$index, scope.row)">启用</el-button>
                    <el-button v-if="scope.row.logoff!==1" type="warning" size="small" @click="withdrawalEvent(scope.$index, scope.row)">停用</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>


<script>
import { getPageListData, getListData } from '../../api/api'

export default {
    data() {
        return {
            filters: {
                title: ''
            },
            datas: [],
            total: 0,
            pageSize: 10,
            pageNum: 1,
            listLoading: false,
            sels: [],// 列表选中列

        }
    },
    methods: {
        // 获取table列表数据
        getListData() {
            let para = {
                pageNum: this.pageNum,
                // title: this.filters.title,
                pageSize: 10
            };
            this.listLoading = true;
            getPageListData().then((res) => {
                this.total = res.data.body.length; // 数量
                this.datas = res.data.body; // 数据
                this.listLoading = false;
            });
            // var _that = this;
            // getListData('/manager/banner?num=' + this.pageNum + '&size=' + this.pageSize).then(function(response) {
            //     debugger;
            //     //this.$set('tableData', response.data);
            //     _that.total = response.data.total;
            //     _that.datas = response.data.data;
            //     _that.listLoading = false;
            // });

        },
        // 分页
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getListData();
        },
        // 新增
        handleAdd: function() {
            // this.addFormVisible = true;
            // this.addForm = {
            // };
            this.$router.push({ path: '/carouselMapEdit', query: { type: 'add' } });
        },
        // 编辑
        handleEdit: function(index, row) {
            // this.editFormVisible = true;
            // this.editForm = Object.assign({}, row);
            this.$router.push({ path: '/carouselMapEdit', query: { type: 'edit', title: row.title } });
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
        // 启用
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
        // 停用
        withdrawalEvent: function(index, row) {
            this.$confirm('确认停用该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = { id: row.pid };
                // removeUser(para).then((res) => {
                this.listLoading = false;
                this.$message({
                    message: '停用成功',
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
</script>


<style scoped>

</style>