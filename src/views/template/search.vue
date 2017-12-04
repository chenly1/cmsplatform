<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="query">
                <!-- <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="query.name" placeholder="主题"></el-input>
                    </el-form-item>
                </el-col> -->
                <el-col :span="4">
                    <el-select v-model="query.type" placeholder="类型" clearable>
                        <el-option v-for="item in typeValue" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-form-item>
                    <el-button v-on:click="getListData" icon="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="handleAdd('notify')">新增通知模版</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="handleAdd('message')">新增消息模版</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="index" width="40">
            </el-table-column>
            <el-table-column prop="name" label="主题" min-width="130" sortable>
            </el-table-column>
            <el-table-column prop="type" label="类型" min-width="100" sortable>
                <template slot-scope="props">
                    <template v-if='props.row.type=="message"'>消息</template>
                    <template v-else>通知</template>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button v-if="!scope.row.releaseTime" type="danger" size="small" icon="delete" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page.pageNum" :page-size="page.pageSize" :page-sizes="[10, 20, 50, 100]" :total="page.total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>


<script>
import { getListData, deleteData } from "../../api/api";

export default {
    data() {
        return {
            query: {
                // name: '',
                type: ''
            },
            page: {
                total: 0,// 总数
                pageSize: 10,
                pageNum: 1
            },
            listLoading: false,// 加载动画
            url: "/manager/messagetemplate", // 连接url
            sels: [],// 列表选中列
            typeValue: [
                {
                    value: "notify",
                    label: "通知"
                },
                {
                    value: "message",
                    label: "消息"
                }
            ],
            tableData: [],
            datas2: [
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
            ]

        }
    },
    methods: {
        // 获取table列表数据
        getListData() {
            this.listLoading = true;
            var _that = this;
            var url = this.url + "?num=" + this.page.pageNum + "&size=" + this.page.pageSize +
                "&type=" + this.query.type;
            // debugger;
            getListData(url).then(function(response) {
                // debugger;
                _that.page.total = response.data.total;// 数量
                _that.tableData = response.data.data;// 数据
                _that.listLoading = false;
            }).catch(() => { });
        },
        // 新增界面
        handleAdd: function(typeValue) {
            if (typeValue == 'notify') {
                this.$router.push({ path: '/template/notifyEdit', query: { pageType: 'add', type: 'notify' } });
            } else if (typeValue == 'message') {
                this.$router.push({ path: '/template/messageEdit', query: { pageType: 'add', type: 'message' } });
            }
        },
        // 编辑界面
        handleEdit(row) {
            var queryValue = {
                rowid: row.id,
                pageType: 'edit'
            };
            if (row.type == 'notify') {
                queryValue.type = 'notify';
                this.$router.push({ path: '/template/notifyEdit', query: queryValue });
            } else if (row.type == 'message') {
                queryValue.type = 'message';
                this.$router.push({ path: '/template/messageEdit', query: queryValue });
            }
        },
        // 删除
        handleDel: function(row) {
            var _that = this;
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                _that.listLoading = true;
                var url = this.url + "/" + row.id;
                // debugger;
                deleteData(url).then((res) => {
                    // debugger;
                    if (res.data.flag === true) {
                        _that.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        _that.$message({
                            showClose: true,
                            duration: 0,
                            message: '删除失败，' + res.data.message,
                            type: 'error'
                        });
                    }
                    _that.listLoading = false;
                    _that.getListData();
                }).catch(() => {
                });
            }).catch(() => {
            });
        },
        // 分页
        handleCurrentChange(val) {
            this.page.pageNum = val;
            this.getListData();
        },
        // 页码大小
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.getListData();
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