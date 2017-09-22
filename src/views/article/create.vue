<template>
  <div>
    <create ref="create"></create>
    <div class="components-container">
      <div class="editor-container">
        <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
      </div>
    </div>
    <el-button type="primary" @click="submit" class="button">提交</el-button>
  </div>
</template>
<style>
.button {
  margin: 10px;
  float: right;
}
</style>
<script>
import UE from '../../components/ue/ue.vue';
import create from '../../components/form/create.vue';
export default {
  components: { create, UE },
  data() {
    return {
      defaultMsg: '',
      config: {
        toolbars: [
          ['fullscreen', 'simpleupload', 'insertimage', 'insertvideo', 'source', 'undo', 'redo', 'bold']
        ],
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: "ue1"
    }
  },
  methods: {
    submit() {
      debugger;
      let content = this.$refs.ue.getUEContent(); // 调用子组件方法
      var form = this.$refs.create.onSubmit('/manager/article', content, this.$route.params.purposeType);
    }
  }
}

</script>