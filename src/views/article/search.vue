<template>
  <div>
    <el-button type="primary" @click="getDataList" >查询</el-button>
    <search ref="search"></search>
  </div>
</template>

<script>
import search from '../../components/table/search.vue';
export default {
  components: { search },
  methods: {
    getDataList () {
      debugger;
      var form = this.$refs.search.getDataList('/manager/article');
    }
  }
}

</script>