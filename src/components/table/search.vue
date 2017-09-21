<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="标题" width="180" prop="title"></el-table-column>
      <el-table-column label="作者" width="180" prop="editor">
      </el-table-column>
      <el-table-column label="发布时间" width="180" prop="releaseTime">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { getListData } from '../../api/api'
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      pageSizes: [10, 20, 50, 100],
      url: ''
    }
  },


  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getDataList(this.url);
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getDataList(this.url);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    getDataList(url) {
      debugger;
      var _that = this;
      this.url = url;      
      url = url + '?num=' + this.pageNum + '&size=' + this.pageSize;
      getListData(url)
        .then(function(response) {
          debugger;
          _that.total = response.data.total;
          _that.tableData = response.data.data;
        });
    }
  }
}
</script>