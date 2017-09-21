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

  </div>
</template>
<script>
import { getListData } from '../../api/api'
export default {
  data() {
    return {
      tableData: [      
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    getDataList(url) {
      debugger;
      var _that = this;
      getListData(url)
        .then(function(response) {
          debugger;
          //this.$set('tableData', response.data);
          _that.tableData = response.data.data;
        });
    }
  }
}
</script>