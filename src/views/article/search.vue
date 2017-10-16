<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
      <el-select v-model="purpose" placeholder="用途">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button icon="search" @click="getDataList()">查询</el-button>
      <el-button type="primary" icon="plus" @click="createData()">新建</el-button>
    </el-col>
    <el-table :data="tableData" v-loading="listLoading" style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column label="标题" min-width="260" prop="title" sortable>
        <template scope="scope">
          <template v-if="scope.row.logoff===2">
            <a :href="'/api/article/show/' +scope.row.id" target=_blank>
              <span>{{scope.row.title}}</span>
            </a>
          </template>
          <template v-else>
            <a :href="'/manager/article/preview/' +scope.row.id" target=_blank>
              <span>{{scope.row.title}}</span>
            </a>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="原创" width="130" prop="original" sortable>
        <template scope="scope">
          <span v-if="scope.row.original===1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="150" prop="releaseTime" sortable>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template scope="scope">
          <el-button v-if="scope.row.logoff===1" size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-if="scope.row.logoff===1" size="small" icon="check" type="success" @click="release(scope.$index, scope.row)">发布</el-button>
          <el-button v-if="scope.row.logoff===1" size="small" icon="delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button v-if="scope.row.logoff===2" size="small" icon="circle-cross" type="warning" @click="unrelease(scope.$index, scope.row)">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--底部工具条-->
    <el-col :span="24" class="toolbar">
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageSizes" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total" style="float:right;">
        </el-pagination>
      </div>
    </el-col>
  </section>
</template>
<script>
import { getListData, stateUpdate,deleteData } from '../../api/api'
export default {
  data() {
    return {
      options: [{
        value: 'edu',
        label: '健康教育'
      }, {
        value: 'news',
        label: '新闻'
      }],
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      pageSizes: [10, 20, 50, 100],
      listLoading: false,
      url: '/manager/article',
      purpose: 'edu'
    }
  },


  methods: {
    createData() {
      this.$router.push({ path: '/article/edit/0' });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getDataList();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getDataList();
    },
    handleEdit(index, row) {
     
      this.$router.push({ path: '/article/edit/' + row.id });
    },
    handleDelete(index, row) {
       debugger;
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        var _that = this;
        var url = this.url +'/' + row.id;
        deleteData(url,row)
          .then(function(response) {
            debugger;
            if (response.data.flag === true) {
            // _that.listLoading = false;
            _that.$message({
              message: '删除成功'
              // type: 'success'
            });
            _that.getDataList();
          } else {
            _that.$message({
              message: '删除失败，' + response.data.message,
              type: 'error'
            });
            _that.getDataList();
          }
          }).catch(() => {
          });
      }).catch(() => {

      });
    },
    release(index, row) {
      this.$confirm('确认发布该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        var _that = this;
        var url = this.url + '/release/' + row.id;
        stateUpdate(url)
          .then(function(response) {
            if (response.data.flag === true) {
            // _that.listLoading = false;
            _that.$message({
              message: '发布成功'
              // type: 'success'
            });
            _that.getDataList();
          } else {
            _that.$message({
              message: '发布失败，' + response.data.message,
              type: 'error'
            });
            _that.getDataList();
          }
          }).catch(() => {
          });
      }).catch(() => {

      });
    },
    unrelease(index, row) {
      this.$confirm('确认撤销该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        var _that = this;
        var url = this.url + '/unrelease/' + row.id;
        stateUpdate(url).then(function(response) {
          if (response.data.flag === true) {
            // _that.listLoading = false;
            _that.$message({
              message: '撤销成功'
              // type: 'success'
            });
            _that.getDataList();
          } else {
            _that.$message({
              message: '撤销失败，' + response.data.message,
              type: 'error'
            });
            _that.getDataList();
          }
        }).catch(() => {
        });
      }).catch(() => {

      });
    },
    getDataList() {
      this.listLoading = true;
      var _that = this;
      var url = this.url + '?num=' + this.pageNum + '&size=' + this.pageSize + '&purpose=' + this.purpose;
      getListData(url)
        .then(function(response) {
          _that.total = response.data.total;
          _that.tableData = response.data.data;
          _that.listLoading = false;
        }).catch(() => {
        });

    }
  },
  mounted() {
    this.getDataList();
  }
}
</script>


<style scoped>
a:link {
  font-size: 14px;
  color: #399999;
  text-decoration: none;
}

a:visited {
  font-size: 14px;
  color: #399999;
  text-decoration: none;
}

a:hover {
  font-size: 14px;
  color: #71c6ef;
  text-decoration: underline;
}
</style>