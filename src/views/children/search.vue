<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-col :span="4">
                    <el-form-item>
                        <el-input v-model="filters.childrenName" placeholder="儿童姓名"></el-input>
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
                    <el-button v-on:click="getListData" icon="search">查询</el-button>
                </el-col>
            </el-form>
        </el-col>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="45">
            </el-table-column>
            <el-table-column label="儿童姓名" prop="childrenName" sortable min-width="90">
            </el-table-column>
            <el-table-column label="儿童卡号" prop="cardNumber" sortable min-width="100">
            </el-table-column>
            <el-table-column label="类型" prop="typeName" sortable>
            </el-table-column>
            <el-table-column label="注册用户" prop="phoneNumber" sortable min-width="100">
            </el-table-column>
            <el-table-column label="注册日期" prop="date" sortable min-width="100">
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
                type: '',
                childrenName: '',
                cardNumber: ''
            },
            forbidden: false,
            page: {
                total: 0,
                pageSize: 10,
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
            tableData: [{
                phoneNumber: '13500000001',
                date: '2017-10-01',
                childrenName: '何青哲',
                cardNumber: '0000000001',
                type: 'member',
                typeName: '会员',
                desc: '111',
            }, {
                phoneNumber: '13500000002',
                date: '2017-10-01',
                childrenName: '李永欣',
                cardNumber: '0000000004',
                type: 'consumer',
                typeName: '普通用户',
                desc: '112',
            }, {
                phoneNumber: '13500000003',
                date: '2017-10-01',
                childrenName: '艾云尼',
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
            console.log(this.filters);
        },
        // 是否绑定儿童
        changeOnOff() {
            if (this.filters.type === false) {
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
.toolbar .el-button {
    /* border: 1px solid red; */
    margin-left: 10px;
    margin-bottom: 0;
}
</style>