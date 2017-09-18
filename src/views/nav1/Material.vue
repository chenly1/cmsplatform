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
        <el-col :span="6" v-for="(o, index) in total" :key="o" :offset="1" style="padding-top: 20px;">
            <el-card :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                    <span class="title" style="line-height: 36px;">{{ datas[o-1].name }}</span>
                </div>
                <div class="image">
                    <img v-if="datas[o-1].imgsrc"  v-bind:src="datas[o-1].imgsrc"/>
                    <img v-else :src="imgsrc"/>
                </div>
                <div style="padding: 14px;">
                    <div class="bottom clearfix">
                        <span class="updateTime">更新于：{{ datas[o-1].updateDate }}</span>
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
        <!--底部工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>


	</section>
</template>

<script>
    import { getMaterialData } from '../../api/api'

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                total: 0, // 总数
                page: 1, 
                datas:[],
                updateDate: new Date().format("yyyy-MM-dd hh:mm:ss"),
                imgsrc: require('../../assets/xijing.jpg')
            }
        },
        methods: {
            // 获取table列表数据
            getListData() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                getMaterialData().then((res) => {
                    this.total = res.data.body.length; // 数量
                    this.datas = res.data.body; // 数据
                    // debugger;
                });
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getListData();
            }
        },
        mounted() {
            this.getListData();
        }
    }
    
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
</script>

<style scoped>
  .title {
    font-size: 18px;
    color: #28333c;
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
    min-width: 100px;
    height: 250px;
    text-align: center;
    background-color: #e8ecef;
    border-top: 2px solid #e8ecef;
    border-bottom: 2px solid #e8ecef;
  }
  .image img {
    max-height: 250px; max-width: 100%;vertical-align:middle;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .updateTime{
    font-size: 13px;
    line-height: 15px;
    color: #999;
  }

</style>