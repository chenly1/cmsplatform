<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-button v-on:click="getListData" icon="search">刷新</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd()" icon="plus">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="datas" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" style="width: 20%;">
            </el-table-column>
            <el-table-column prop="videoName" label="视频名称" style="width: 30%;">
                <template scope="scope">  
                    <img :src="scope.row.cover" style=" height:100px;padding-top:5px;" alt="">                
                    <span>{{scope.row.videoName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="连接地址" style="width: 40%;">
                <template scope="scope">                  
                    <span>{{scope.row.url}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="imageUrl" label="略缩图" min-width="150">
                <template scope="scope">
                    <img :src="scope.row.imageUrl" style=" height:100px;padding-top:5px;" alt="">
                </template>
            </el-table-column> 
            <el-table-column prop="logoff" label="状态" width="120" sortable>
                <template scope="scope">
                    <span v-if="scope.row.logoff===2">已启用</span>
                    <span v-else-if="scope.row.logoff===1">未启用</span>
                </template>
            </el-table-column>-->
            <el-table-column label="操作" style="width: 10%;">
                <template scope="scope">
                    <el-button type="danger" size="small" icon="close" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>


<script>
import { getPageListData, getListData, stateUpdate,deleteData } from "../../api/api";

export default {
  data() {
    return {
      filters: {},
      datas: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      listLoading: false,
      sels: [] // 列表选中列
    };
  },
  methods: {
    // 获取table列表数据
    getListData() {
      let para = {
        pageNum: this.pageNum,
        pageSize: 10
      };
      this.listLoading = true;

      var _that = this;
      //查询
      getListData(
        "/manager/video?num=" + this.pageNum + "&size=" + this.pageSize
      ).then(function(response) {
        // debugger;
        _that.total = response.data.total;
        _that.datas = response.data.data;
        _that.listLoading = false;
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getListData();
    },
    // 新增
    handleAdd() {
      var query = {
        type: "add"
      };
      this.$router.push({ path: "/video/create", query: query });
    },
    //删除
    handleDel(index, row) {
      // debugger;
      this.$confirm("确认删除该条视频吗?", "提示", {
        type: "warning"
      }).then(() => {
          var _that = this;
          var url = "/manager/video/" + row.id;
          deleteData(url, row)
            .then(function(response) {
              // debugger;
              if (response.data.flag === true) {
                _that.$message({
                  message: "删除成功"
                });
                _that.getListData();
              } else {
                _that.$message({
                  message: "删除失败，" + response.data.message,
                  type: "error"
                });
                _that.getListData();
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getListData();
  }
};
</script>


<style scoped>
a:link {
  font-size: 15px;
  color: #000000;
  text-decoration: none;
}
a:visited {
  font-size: 15px;
  color: #399999;
  text-decoration: none;
}
a:hover {
  font-size: 15px;
  color: #71c6ef;
  text-decoration: underline;
}
</style>