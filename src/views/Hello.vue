<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <div id="title">
        <span>帐号整体情况</span>
      </div>
    </el-col>
    <el-col :span="12" class="number" style="">
      <div class="text" style="">
        <el-button type="text" @click="userManagement">注册人数
          <i class="fa fa-angle-right"></i></el-button >
        <p>240</p>
      </div>
    </el-col>
    <el-col :span="12" class="number" style="">
      <div class="text" style="">
        <span>绑定人数</span>
          <i class="fa fa-angle-right"></i>
        <p>70</p>
      </div>
    </el-col>   
  </section>
  
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
    userManagement(){
       this.$router.push({ path: '/carouselMap/mangement'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#title {
  height: 50px;
}

#title span {
  font-size: 20px;
  line-height: 35px;
  padding-left: 20px;
}

.number {
  text-align: center;
  border: 0px solid red;
  height: 300px;
}

.number .text {
  padding-top: 10px;
}

.number span {
  color: #888888;
}

.number i {
  margin-left: 10px;
}

.number p {
  font-size: 80px;
}
</style>
