<template>
	<section>
		<!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="标题"></el-input>
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
		<el-table :data="datas" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="pid" label="模板ID" width="120" sortable>
			</el-table-column>
			<el-table-column prop="name" label="标题" width="160" sortable>
			</el-table-column>
			<el-table-column prop="details" label="详细内容" min-width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

        <!--底部工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="标题" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="详细内容" prop="details">
					<el-input type="textarea" v-model="addForm.details" :autosize="{ minRows: 5, maxRows: 8}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="标题" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="详细内容" prop="details">
					<el-input type="textarea" v-model="editForm.details" :autosize="{ minRows: 5, maxRows: 8}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
    </section>
</template>


<script>
// import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api'
    import { getPageListData } from '../../api/api'

export default {
    data() {
        return {
            filters: {
                name: ''
            },
            datas: [],
            total: 0, // 总数
            page: 1, 
            listLoading: false,
            sels: [],// 列表选中列

            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                details: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            },
            //新增界面数据
            addForm: {
                pid: '',
                name: '',
                details: ''
            },

            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                details: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            },
            //编辑界面数据
            editForm: {
                pid: '',
                name: '',
                details: ''
            }
                	
	
        }
    },
    methods: {
        //获取table列表数据
        getListData() {
            let para = {
                page: this.page,
                name: this.filters.name
            };
            this.listLoading = true;
            //NProgress.start();
            getPageListData().then((res) => {
                this.total = res.data.body.length; // 数量
                this.datas = res.data.body; // 数据
                this.listLoading = false;
                //NProgress.done();
            });
        },
        // 分页
        handleCurrentChange(val) {
            this.page = val;
            this.getListData();
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
            };
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.addForm);
                        // addUser(para).then((res) => {
                        //     this.addLoading = false;
                        //     //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            // this.$refs['addForm'].resetFields(); // 重置form
                            this.addFormVisible = false;
                            this.getListData();
                        // });
                        console.log('success');
                        console.log(para);
                    });
                }
            });
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.editForm);
                        // editUser(para).then((res) => {
                        //     this.editLoading = false;
                        //     //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            // this.$refs['editForm'].resetFields(); // 重置form
                            this.editFormVisible = false;
                            this.getListData();
                        // });
                        console.log('success');
                        console.log(para);
                    });
                }
            });
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                debugger;
                let para = { id: row.pid };
                // removeUser(para).then((res) => {
                //     this.listLoading = false;
                //     //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getListData();
                // });
            }).catch(() => {

            });
        },
        // 列表选择
        selsChange: function (sels) {
            this.sels = sels;
        },
        //批量删除
        batchRemove: function () {
            debugger;
            var ids = this.sels.map(item => item.pid).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = { ids: ids };
                // batchRemoveUser(para).then((res) => {
                //     this.listLoading = false;
                    //NProgress.done();
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

</style>