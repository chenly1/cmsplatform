<template>
	<section>
		<!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="标题"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" >新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!--列表-->
        <el-col :span="6" v-for="(o, index) in 7" :key="o" :offset="1" style="padding-top: 20px;">
            <el-card :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span class="time" style="line-height: 36px;">更新于：{{ modifyDate }}</span>
                </div>
                <img :src="imgsrc" style="width:100%;"/>
                <div style="padding: 14px;">
                    <div class="bottom clearfix">
                        <span class="main">9月9日周六下午3：30主题：哮喘主持人：马静琪</span>
                        <br/>
                        <br/>
                        <el-dropdown style="float: right">
                            <el-button type="primary" >
                                点击操作<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>编辑</el-dropdown-item>
                                <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-card>
        </el-col>



	</section>
</template>

<script>
    Date.prototype.format = function (format) {
           var args = {
               "M+": this.getMonth() + 1,
               "d+": this.getDate(),
               "h+": this.getHours(),
               "m+": this.getMinutes(),
               "s+": this.getSeconds(),
               "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
               "S": this.getMilliseconds()
           };
           if (/(y+)/.test(format))
               format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
           for (var i in args) {
               var n = args[i];
               if (new RegExp("(" + i + ")").test(format))
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
           }
           return format;
       };


export default {
    data() {
        return {
            filters: {
                name: ''
            },
            currentDate: new Date(),
            modifyDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
            imgsrc: require('../../assets/hamburger.png')
        }
    }
}


</script>

<style scoped>
  .time {
    font-size: 15px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .main{
    font-size: 13px;
    line-height: 15px;
    color: #999;
  }

</style>