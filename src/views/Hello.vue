<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <div id="title">
        <span>帐号整体情况</span>
      </div>
    </el-col>
    <el-col :span="12" class="number" style="">
      <div class="text" style="" @click="toPith('user')">
        <span>注册人数</span>
        <i class="fa fa-angle-right"></i>
        <!-- <el-button type="text" @click="userManagement">注册人数
              <i class="fa fa-angle-right"></i>
            </el-button> -->
        <p>{{accountCount}}</p>
      </div>
    </el-col>
    <el-col :span="12" class="number" style="">
      <div class="text" style="" @click="toPith('children')">
        <span>绑定儿童数</span>
        <i class="fa fa-angle-right"></i>
        <p>{{memeberCount}}</p>
      </div>
    </el-col>
  </section>
</template>

<script>
import { getListData } from '../api/api'
export default {
  data() {
    return {
      memeberCount: '',
      accountCount: ''
    }
  },
  methods: {
    userManagement() {
      this.$router.push({ path: '/carouselMap/mangement' });
    },
    getData() {
      var _that = this;
      var url = '/manager/dashboard/account';
      getListData(url).then(function(response) {
        _that.memeberCount = response.data.data.memeberCount;
        _that.accountCount = response.data.data.accountCount;
      }).catch(() => {
      });
    },
    toPith(pathType) {
      // debugger;
      if (pathType == 'user') {
        this.$router.push('/user/search');
      } else if (pathType == 'children') {
        this.$router.push('/children/search');
      }

    }
  },
  mounted() {
    this.getData();
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
.text{
  /* border:1px solid red; */
  cursor:pointer;
}
</style>
