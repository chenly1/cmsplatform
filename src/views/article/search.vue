<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
      <el-select v-model="purpose" placeholder="用途">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="search" @click="getDataList()">查询</el-button>
      <el-button type="primary" @click="createData()">新建</el-button>
    </el-col>
    <el-table :data="tableData" v-loading="listLoading" border style="width: 100%">
      <el-table-column label="标题" width="260" prop="title">
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
      <el-table-column label="原创" width="180" prop="original">
        <template scope="scope">
          <span v-if="scope.row.original===1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="180" prop="releaseTime">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button v-if="scope.row.logoff===1" size="small" @click="handleEdit(scope.$index, scope.row)" icon="edit">编辑</el-button>
          <el-button v-if="scope.row.logoff===1" size="small" @click="release(scope.$index, scope.row)">发布</el-button>
          <el-button v-if="scope.row.logoff===2" size="small" type="danger" @click="unrelease(scope.$index, scope.row)">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getListData,stateUpdate } from '../../api/api'
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
      debugger;
      this.$router.push({ path: '/article/create/' });
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
      debugger;
      this.$router.push({ path: '/article/edit/' + row.id });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    release(index, row) {
      var _that = this;
      var url = this.url + '/release/' + row.id;
      stateUpdate(url)
        .then(function(response) {
          _that.getDataList();
        }).catch(() => {
        });
    },
    unrelease(index, row) {
      var _that = this;
      var url = this.url + '/unrelease/' + row.id;
      stateUpdate(url)
        .then(function(response) {
          _that.getDataList();
        }).catch(() => {
        });
    },
    getDataList() {
      debugger;
      this.listLoading = true;
      var _that = this;
      var url = this.url + '?num=' + this.pageNum + '&size=' + this.pageSize + '&purpose=' + this.purpose;
      getListData(url)
        .then(function(response) {
          debugger;
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