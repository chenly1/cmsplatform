<template>
  <div class="components-container">
    <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。支持页面内多次调用。</div>
    <button @click="getUEContent()">获取内容</button>
    <div class="editor-container">
      <UE :config=config :id=ue1 ref="ue"></UE> 
    </div>
  </div>
</template>
<style>
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
</style>
<script>
  import UE from '../../components/ue/ue.vue';
  export default {
    components: {UE},
    data() {
      return {
        config: {
          toolbars: [[
            'simpleupload', //单图上传
            'insertimage', //多图上传
            'spechars', //特殊字符
            'insertvideo', //视频
            'undo', //撤销
            'redo', //重做
            'bold'//加粗            
           ]
          ],
          // autoHeightEnabled: true,
          // autoFloatEnabled: true,
          initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent:true,
          initialFrameWidth: null,
          initialFrameHeight: 380,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },
        ue1: "ue1",       
        addFormVisible: false

      }
    },
    methods: {
      openWindow: function(){
            this.addFormVisible = true;
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      }
    }
  };
</script>



