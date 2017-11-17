<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="filters.BRXM" placeholder="儿童姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="filters.cardNumber" :disabled="forbidden" placeholder="儿童卡号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="filters.type" placeholder="类型" clearable>
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="filters.orderBy" placeholder="排序">
                        <el-option v-for="item in orderBy" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button v-on:click="getListData" icon="search">查询</el-button>
                </el-col>
            </el-form>
        </el-col>
        <el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="45">
            </el-table-column>
            <el-table-column label="儿童姓名" prop="BRXM" sortable min-width="90">
            </el-table-column>
            <el-table-column label="儿童卡号" prop="cardNumber" sortable min-width="100">
            </el-table-column>
            <el-table-column label="类型" prop="typeName" sortable>
            </el-table-column>
            <el-table-column label="注册用户" prop="mobilePhone" sortable min-width="100">
            </el-table-column>
            <el-table-column label="注册日期" prop="created" sortable min-width="100">
            </el-table-column>
            <el-table-column label="描述" prop="desc">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" icon="edit">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量操作</el-button>
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-size="page.pageCount" :total="page.total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
export default {
    data() {
        return {
            listLoading: false,
            sels: [],// 列表选中列
            filters: {
                mobilePhone: '',
                type: '',
                BRXM: '',
                cardNumber: '',
                orderBy:'created desc'
            },
            forbidden: false,
            page: {
                total: 0,
                pageCount: 10,
                pageNum: 1
            },
            options: [
                {
                    value: "consumer",
                    label: "普通用户"
                },
                {
                    value: "member",
                    label: "会员"
                }
            ],
            orderBy: [
                {
                    value: "created desc",
                    label: "注册时间倒序"
                },
                {
                    value: "created asc",
                    label: "注册时间顺序"

                },
                {
                    value: "CSNY desc",
                    label: "出生日期倒序"

                },
                {
                    value: "CSNY asc",
                    label: "出生日期顺序"

                }
            ],
            tableData: [{
                mobilePhone: '13500000001',
                created: '2017-10-01',
                BRXM: '何青哲',
                cardNumber: '0000000001',
                type: 'member',
                typeName: '会员',
                desc: '111',
            }, {
                mobilePhone: '13500000002',
                created: '2017-10-01',
                BRXM: '李永欣',
                cardNumber: '0000000004',
                type: 'consumer',
                typeName: '普通用户',
                desc: '112',
            }, {
                mobilePhone: '13500000003',
                created: '2017-10-01',
                BRXM: '艾云尼',
                cardNumber: '0000000005',
                type: 'consumer',
                typeName: '普通用户',
                desc: '113',
            }]
        }
    },
    methods: {
        // 获取table列表数据
        getListData() {
            this.listLoading = true;
            var that_ = this;
            var param_search = 'pageNum=' + this.page.pageNum 
            + '&pageCount=' + this.page.pageCount
            + '&BRXM='+this.query.BRXM
            + '&orderBy='+this.query.orderBy;
            // debugger;
            // findUser(param_search).then(function(response) {
            //     // debugger;
            //     that_.tableData = response.data.tableData;
            //     that_.page.total = response.data.total;
            //     that_.listLoading = false;
            // }).catch(function(error) {
            //     console.log(error);
            // });
        },
        // 是否绑定儿童
        changeOnOff() {
            if (this.filters.type === false) {
                // 开启重复提醒功能，给表单验证添加相应规则，并添加红色星号。
                this.forbidden = true;
                this.filters.cardNumber = '';
                this.filters.BRXM = '';
            } else {
                // 关闭重复提醒功能，将表单验证中的相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
                this.forbidden = false;
            }
        },
        // 分页
        handleCurrentChange(val) {
            this.page.pageNum = val;
            this.getListData();
        },
        // 批量选择
        selsChange: function(sels) {
            this.sels = sels;
        },
        // 批量操作事件
        batchRemove: function() {
            console.log(this.sels);
            // var ids = this.sels.map(item => item.pid).toString();
            // this.$confirm('确认删除选中记录吗？', '提示', {
            //     type: 'warning'
            // }).then(() => {
            //     this.listLoading = true;
            //     let para = { ids: ids };
            //     // batchRemoveUser(para).then((res) => {
            //     //     this.listLoading = false;
            //     this.$message({
            //         message: '删除成功',
            //         type: 'success'
            //     });
            //     this.getListData();
            //     // });
            // }).catch(() => {

            // });
        },
    },
    mounted() {
        this.getListData();
    }
}
</script>

<style>
.toolbar .el-select {
    /* border: 1px solid red; */
    margin-right: 10px;
    margin-bottom: 0;
}
</style>