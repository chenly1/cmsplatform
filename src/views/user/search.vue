<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="query">
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="query.mobilePhone" placeholder="注册用户"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="query.BRXM" placeholder="儿童姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="query.JZKH" placeholder="儿童卡号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="query.orderBy" placeholder="排序">
                        <el-option v-for="item in orderBy" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-form-item>
                    <el-button v-on:click="getListData" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form v-if="props.row.children.length>0" label-position="left" inline class="demo-table-expand">
                        <template v-for="(firstValue,firstKey) in props.row.children">
                            <el-form-item label="儿童名称">
                                <span>{{ firstValue.BRXM }}</span>
                            </el-form-item>
                            <el-form-item label="儿童卡号">
                                <span>{{ firstValue.JZKH }}</span>
                            </el-form-item>
                            <el-form-item label="出生日期">
                                <span>{{ firstValue.CSNY }}</span>
                            </el-form-item>
                            <!-- <el-button size="small" icon="edit">编辑</el-button> -->
                        </template>
                    </el-form>
                    <el-form v-else label-position="left" inline class="demo-table-expand">
                        <el-form-item label="无绑定儿童"></el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column label="注册用户" prop="mobilePhone" sortable>
            </el-table-column>
            <el-table-column label="注册日期" prop="created" sortable>
            </el-table-column>
            <el-table-column label="是否绑定儿童">
                <template scope="props">
                    <template v-if='props.row.children.length>0'>已绑定</template>
                    <template v-else>未绑定</template>
                </template>
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
import { findUser } from '@/api/cros'

export default {
    data() {
        return {
            listLoading: false,
            sels: [],// 列表选中列
            query: {
                mobilePhone: '',
                BRXM: '',
                JZKH: '',
                orderBy: '1'
            },
            forbidden: false,
            page: {
                total: 0,
                pageCount: 5,
                pageNum: 1
            },
            orderBy: [
                {
                    value: "1",
                    label: "注册时间倒序"
                },
                {
                    value: "0",
                    label: "注册时间顺序"
                }
            ],
            tableData: [],
            tableData2: [
                {
                    mobilePhone: '13500000001',
                    created: '2017-10-01',
                    children: [{
                        BRXM: '何青哲',
                        JZKH: '0000000001'
                    }, {
                        BRXM: '王希宇',
                        JZKH: '0000000002'
                    }, {
                        BRXM: '高思敏',
                        JZKH: '0000000003'
                    }],
                    desc: '111'
                }, {
                    mobilePhone: '13500000002',
                    created: '2017-10-01',
                    children: [{
                        BRXM: '李永欣',
                        JZKH: '0000000004'
                    }],
                    desc: '112'
                }, {
                    mobilePhone: '13500000003',
                    created: '2017-10-01',
                    children: [{
                        BRXM: '艾云尼',
                        JZKH: '0000000005'
                    }],
                    desc: '113'
                }, {
                    mobilePhone: '13500000004',
                    created: '2017-10-01',
                    children: [],
                    desc: '113'
                }]
        }
    },
    methods: {
        // 获取table列表数据
        getListData() {
            // debugger;
            this.listLoading = true;
            var that_ = this;
            var param_search = 'pageNum=' + this.page.pageNum
                + '&pageCount=' + this.page.pageCount
                + '&BRXM=' + this.query.BRXM
                + '&JZKH=' + this.query.JZKH
                + '&mobilePhone=' + this.query.mobilePhone
                + '&orderBy=' + this.query.orderBy;
            // debugger;
            findUser(param_search).then(function(response) {
                // debugger;
                that_.tableData = response.data.tableData;
                that_.page.total = response.data.total;
                that_.listLoading = false;
            }).catch(function(error) {
                console.log(error);
            });
            // that_.listLoading = false;
        },
        // 是否绑定儿童
        // changeOnOff() {
        //     if (this.query.children === false) {
        //         // 开启重复提醒功能，给表单验证添加相应规则，并添加红色星号。
        //         this.forbidden = true;
        //         this.query.JZKH = '';
        //         this.query.BRXM = '';
        //     } else {
        //         // 关闭重复提醒功能，将表单验证中的相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
        //         this.forbidden = false;
        //     }
        // },
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
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    /* border: 1px solid red; */
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
}

.toolbar .el-select {
    /* border: 1px solid red; */
    margin-right: 10px;
    margin-bottom: 0;
}
</style>