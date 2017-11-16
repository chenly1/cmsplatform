<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="filters.phoneNumber" placeholder="用户手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="绑定儿童">
                        <el-checkbox v-model="filters.bind" @change="changeOnOff"></el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="filters.childrenName" :disabled="forbidden" placeholder="儿童姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="filters.cardNumber" :disabled="forbidden" placeholder="儿童卡号"></el-input>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button v-on:click="getListData" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <template v-for="(firstValue,firstKey) in props.row.bind">
                            <el-form-item label="儿童名称">
                                <span>{{ firstValue.childrenName }}</span>
                            </el-form-item>
                            <el-form-item label="儿童卡号">
                                <span>{{ firstValue.cardNumber }}</span>
                            </el-form-item>
                            <!-- <el-button size="small" icon="edit">编辑</el-button> -->
                        </template>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column label="注册用户" prop="phoneNumber" sortable>
            </el-table-column>
            <el-table-column label="注册日期" prop="date" sortable>
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
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page.pageNum" :page-size="page.pageSize" :total="page.total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
export default {
    data() {
        return {
            filters: {
                phoneNumber: '',
                bind: true,
                childrenName: '',
                cardNumber: ''
            },
            forbidden: false,
            page: {
                total: 0,
                pageSize: 10,
                pageNum: 1
            },
            tableData: [{
                phoneNumber: '13500000001',
                date: '2017-10-01',
                bind: [{
                    childrenName: '何青哲',
                    cardNumber: '0000000001'
                }, {
                    childrenName: '王希宇',
                    cardNumber: '0000000002'
                }, {
                    childrenName: '高思敏',
                    cardNumber: '0000000003'
                },],
                desc: '111',
            }, {
                phoneNumber: '13500000002',
                date: '2017-10-01',
                bind: [{
                    childrenName: '李永欣',
                    cardNumber: '0000000004'
                },],
                desc: '112',
            }, {
                phoneNumber: '13500000003',
                date: '2017-10-01',
                bind: [{
                    childrenName: '艾云尼',
                    cardNumber: '0000000005'
                },],
                desc: '113',
            }]
        }
    },
    methods: {
        // 获取table列表数据
        getListData() {
            console.log(this.filters);
        },
        // 是否绑定儿童
        changeOnOff() {
            if (this.filters.bind === false) {
                // 开启重复提醒功能，给表单验证添加相应规则，并添加红色星号。
                this.forbidden = true;
                this.filters.cardNumber = '';
                this.filters.childrenName = '';
            } else {
                // 关闭重复提醒功能，将表单验证中的相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
                this.forbidden = false;
            }
        },
        // 分页
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getListData();
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
    width: 40%;
}
</style>