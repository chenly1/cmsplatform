<template>
  <div>
    <span class="wrapper">
      <el-button type="info" @click="getDataList('edu')" >健康教育</el-button>
      <!-- <el-button type="warning" @click="getDataList('health')">健康讲堂</el-button> -->
      <el-button type="info" @click="getDataList('news')">新闻</el-button>
      <!-- <el-button type="info" @click="getDataList('announcement')">公告</el-button> -->
    </span>
    <el-button type="text" @click="createData" class="button">创建文章</el-button>
    <router-view></router-view>
  </div>
</template>
<style>
.button {
  margin: 10px;
  float: right;
}
</style>
<script>
export default {
  data() {
    return {
      purposeType: 'edu'
    }
  },
  methods: {
    getDataList(purposeType) {
      debugger;
      this.purposeType = purposeType;
      this.$router.push({ path: '/article/search' });
    },
    createData() {
      debugger;
      this.$router.push({ path: '/article/create/' + this.purposeType });
    }
  }
}

</script>