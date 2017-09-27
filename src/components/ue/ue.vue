<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: 'UE',
  data() {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    },
    id: {
      type: String
    },
  },
  mounted() {
    debugger;
    const _this = this;
    UE.delEditor(this.id);
    this.editor = UE.getEditor(this.id, this.config); // 初始化UE
    //_this.$emit("aaa");
    this.editor.addListener("ready", function() {
      debugger;
      _this.$emit("aaa");
     // _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    });
    // this.editor.ready(function(editor) {
    //   debugger;
    //    _this.$emit("aaa");
    //   //_this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    // });
  },
  methods: {
    getUEContent() { // 获取内容方法
      //_this.editor.execCommand( 'cleardoc' );
      return this.editor.getContent()
    },
    setUEContent(msg){
      this.editor.setContent(msg); // 确保UE加载完成后，放入内容。
    },
    clear() {
      this.editor.setContent('')
    }
  },
  destroyed() {
    this.editor.destroy()
  }
}
</script>
