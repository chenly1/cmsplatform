<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      config: {
        type: Object
      },
      id: {
        type: String
      }
    },
    mounted() {     
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
