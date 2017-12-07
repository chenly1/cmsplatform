<template>
    <section class="form-section">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
            <el-form-item label="消息模版" prop="notify">
                <el-select v-model="ruleForm.notify" filterable placeholder="请选择" @change="changeMessageModel" :loading="loading1">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-col :span="24"> -->
                <el-form-item label="是否推送">
                    <el-checkbox v-model="ruleForm.isCheck" @change="changeAgree"></el-checkbox>
                </el-form-item>
            <!-- </el-col> -->
            <!-- <el-col :span="6"> -->
                <el-form-item label="推送通知内容是否一致">
                    <el-checkbox v-model="ruleForm.agree" @change="changeOnOff" :disabled='agreeValidate'></el-checkbox>
                </el-form-item>
            <!-- </el-col> -->
            <el-form-item label="通知模版" prop="message" :required="reqMessage">
                <el-select v-model="ruleForm.message" filterable placeholder="请选择" :disabled="disabled" :loading="loading2">
                    <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源地址" prop="sourceUrl">
                <el-input v-model="ruleForm.sourceUrl" class="login-form-input">
                </el-input>
            </el-form-item>
            <el-form-item label="触发方式" prop="triggerType">
                <el-radio-group v-model="ruleForm.triggerType" @change="changeTime">
                    <el-radio label="immediate">立即</el-radio>
                    <el-radio label="clocked">定时</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="定时时间" prop="triggerTime" :required="reqTime">
                <el-date-picker v-model="ruleForm.triggerTime" type="datetime" placeholder="选择日期时间" :disabled="triggerValidate" clearable>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click.native="cancelClick">返回</el-button>
            </el-form-item>
            <el-form-item label="消息模板内容">
                <el-input type="textarea" v-model="ruleForm.desc" :rows="7" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="发送消息内容">
                <el-input type="textarea" v-model="ruleForm.trueDesc" :rows="7" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
import { getListData,submit } from "../../api/api";
import { findUser } from '@/api/cros';
import mustache from 'mustache';
export default {
    data() {
        return {
            loading1:false,
            loading2:false,
            disabled: true,
            agreeValidate:true,
            triggerValidate:true,
            reqMessage: false,
            reqTime:false,
            url:"/manager/messagetemplate",
            submitUrl:"manager/push/",
            ruleForm: {
                isCheck: false,
                agree: true,
                message: '',
                notify: '',
                sourceUrl: '',
                triggerType: '',
                triggerTime:'',
                desc:"目前只提供JZKH(就诊卡号),BRXM(病人姓名),CSNY(出生年月),XZMC(建档类型),JDSJ(建党时间),mobilePhone(注册用户手机号),created(注册时间)这几个参数,查看示例请先选择消息模板",
                trueDesc:""
            },
            rules: {
                notify: [
                    { required: true, message: '请输入主题', trigger: 'blur' },
                ],
                message: [
                    { max:100, message: "最长不超过100个字", trigger: 'blur' }
                ],
                triggerType: [
                    { required: true, message: '请选择触发方式', trigger: 'change' },
                ],
                content: [
                    { required: true, message: '请填写内容', trigger: 'blur' },
                    { max:100, message: "最长不超过100个字", trigger: 'blur' }
                ]
            },
            options: "",
            options2:"",
            hyphenated : ['欧阳','太史','端木','上官','司马','东方','独孤','南宫','万俟','闻人','夏侯','诸葛','尉迟','公羊','赫连','澹台','皇甫',  
        '宗政','濮阳','公冶','太叔','申屠','公孙','慕容','仲孙','钟离','长孙','宇文','城池','司徒','鲜于','司空','汝嫣','闾丘','子车','亓官',  
        '司寇','巫马','公西','颛孙','壤驷','公良','漆雕','乐正','宰父','谷梁','拓跋','夹谷','轩辕','令狐','段干','百里','呼延','东郭','南门',  
        '羊舌','微生','公户','公玉','公仪','梁丘','公仲','公上','公门','公山','公坚','左丘','公伯','西门','公祖','第五','公乘','贯丘','公皙',  
        '南荣','东里','东宫','仲长','子书','子桑','即墨','达奚','褚师']
        };
    },
    methods: {
        getListData(){
            debugger
            this.loading1=true;
            this.loading2=true;
            var _that = this;
            var messageUrl = this.url+"?type=message";
            var notifyUrl=this.url+"?type=notify";
            getListData(messageUrl).then(function(response) {
                _that.loading1 = false;
                _that.options=response.data.data;//获取消息模板
            }).catch(() => { });

            getListData(notifyUrl).then(function(response) {
                
                _that.loading2 = false;
                _that.options2=response.data.data;//获取通知模板
            }).catch(() => { });
        },
        //更改消息模板
        changeMessageModel(){
            
           var getMessage='/manager/messagetemplate/'+this.ruleForm.notify;
           var _that=this;
           getListData(getMessage).then(function(response){
               
               let Message=response.data.data;
             _that.ruleForm.desc=Message.content;
             _that.ruleForm.trueDesc=mustache.render(Message.content,_that.$route.params.children[0]);
           }).catch(() => { });

        },
        // 是否推送
        changeAgree() {
            // 
            if (this.ruleForm.isCheck === true) {
                // 不选择通知模版，给表单验证添加相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
                this.agreeValidate = false;
                this.reqMessage = false;
            } else {
                // 选择通知模版，表单验证中的相应规则，并添加红色星号。
                this.agreeValidate = true;
                this.ruleForm.agree = true;
                this.disabled = true;
            }
        },
        // 是否选择通知模版
        changeOnOff() {
            // 
            if (this.ruleForm.agree === true) {
                // 不选择通知模版，给表单验证添加相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
                this.disabled = true;
                this.ruleForm.message = '';
                this.reqMessage = false;
            } else {
                // 选择通知模版，表单验证中的相应规则，并添加红色星号。
                this.disabled = false;
                this.reqMessage = true;
            }
        },
        // 是否选择定时时间
        changeTime() {
            // 
            if (this.ruleForm.triggerType !== 'clocked') {
                // 不选择定时时间，给表单验证添加相应规则，替换为空，并移除红色星号。不能删除相关规则，否则无法重新验证了，残留表单验证信息。
                this.triggerValidate = true;
                this.ruleForm.triggerTime = '';
                this.reqTime = false;
            } else {
                // 选择定时时间，表单验证中的相应规则，并添加红色星号。
                this.triggerValidate = false;
                this.reqTime = true;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        var _that=this;
                        let para = Object.assign({}, this.ruleForm);
                        let submitUrl= this.submitUrl;
                        let children=this.$route.params.children;
                        let hyphenated=this.hyphenated;
                        let messageId=this.ruleForm.notify;
                        let notifyId=this.ruleForm.message;
                        let sourceUrl=this.ruleForm.sourceUrl;
                        var getMessage='/manager/messagetemplate/'+messageId;
                       //获取消息的内容和标题
                      getListData(getMessage).then(function(response){
                          
                      //接受message 
                       let message=response.data.data;
                       if(para.isCheck){//如果推送通知的话获取通知对象
                       if(para.agree){//如果与消息模板保持一致则通知模板就是消息模板
                       var getNotify='/manager/messagetemplate/'+messageId;
                       }else{
                       var getNotify='/manager/messagetemplate/'+notifyId;
                       }
                       getListData(getNotify).then(function(response){
                       let notify=response.data.data
                    children.forEach (function(child) { 
                  var sendMessage={};
                 sendMessage.title=message.title;
                 sendMessage.content=message.content;
                sendMessage.content=mustache.render(sendMessage.content,child);
                let BRXM=child.BRXM.substr(0,1)+new Array(child.BRXM.length).join('*');
               for(var i=0;i<hyphenated.length;i++){
                   if(child.BRXM.indexOf(hyphenated[i])==0){
                   BRXM=child.BRXM.substr(0,2)+new Array(child.BRXM.length-1).join('*');
                    }}

                child.BRXM=BRXM;
                var sendNotify={};
                sendNotify.title=notify.title;
                sendNotify.content=notify.content
                 sendNotify.content=mustache.render(sendNotify.content,child);
                 var accountId=child.accountId;
                 let buildMessageUrl='/manager/message/message';
                 let buildNotifyUrl='/manager/message/notify';
                 let buildMessagePara={title:sendMessage.title,
                                       content:sendMessage.content,
                                       link:sourceUrl};
                 let buildNotifyPara={title:sendNotify,
                                      content:sendNotify.content};
                       //创建消息
                      submit(buildMessageUrl,buildMessagePara).then(function(response){
                        
                      let messageId=response.data.data.id;

                     //创建通知
                     submit(buildNotifyUrl,buildNotifyPara).then(function(response){
                     let notifyId=response.data.data.id;
                      

                      //发送消息
                      var sumbitMessageUrl=submitUrl+'withnotify';
                      para.notifyId=notifyId;
                      para.accountId=accountId;
                      para.messageId=messageId;
                      if(para.triggerType=='immediate'){
                          para.triggerTime=new Date()
                      };
                     para.triggerTime=para.triggerTime.Format('yyyy-MM-dd hh:mm:ss')

                      submit(sumbitMessageUrl,para).then(function(response){
                            _that.$message({
                            message: "提交成功！",
                            type: 'success'
                        });
 
                      }).catch(()=>{})
                      }).catch(()=>{})
                      }).catch(()=>{})
                      }
                    )
                      

                      }).catch(()=>{})
                       
                       }else{//没有通知的情况     
               children.forEach(function (child) {
                 var accountId=child.accountId
                 let buildMessageUrl='/manager/message/message';
                 var sendMessage={};

                 sendMessage.title=message.title;
                 sendMessage.content=message.content;
                 sendMessage.content=mustache.render(sendMessage.content,child);
                 let buildMessagePara={title:sendMessage.title,
                                       content:sendMessage.content,
                                       link:sourceUrl}
                       //创建消息
                       submit(buildMessageUrl,buildMessagePara).then(function(response){
                      let messageId=response.data.data.id;
                      if(para.triggerType=='immediate'){
                          para.triggerTime=new Date()
                      };
                     para.triggerTime=para.triggerTime.Format('yyyy-MM-dd hh:mm:ss')
                      //发送消息
                      var sumbitMessageUrl=submitUrl+'withoutnotify';
                      para.accountId=accountId;
                      para.messageId=messageId;
                      submit(sumbitMessageUrl,para).then(function(response){
                           
                           _that.$message({
                            message: "提交成功！",
                            type: 'success'
                        });
 
                      }).catch(()=>{

                      })
                    }).catch(()=>{

                    })
            }  
               )
                       }
                       

               
                 
}).catch(()=>{})

                //        if(para.notify==null||para.notify==""){
                //           submitUrl=submitUrl+'withoutnotify'
                //           para.accountId=this.$router.params.children.name
                //        }else{
                //            submitUrl=submitUrl+'withnotify'
                //        }

                       
                // submit(submitUrl).then(function(response) {
                // 
                // _that.options=response.data.data;//获取消息模板
                //  }).catch(() => { });
                //         console.log(para);
                    }).then(() => {
                        this.$router.push('/news/search');
                    }).catch(() => {});
                } else {
                    return false;
                }
            });
        }, cancelClick() {
            this.$confirm('确认退出编辑吗？', '提示', {}).then(() => {
                this.$message({
                    message: "返回成功!",
                    type: 'success'
                });
            }).then(() => {
                this.$router.push('/news/search');
            }).catch(() => {

            });
        }
    },
    mounted() {
    Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
        
        // console.log(this.$route.query);
        this.getListData()
    }
}
</script>
<style>
.form-section {
    padding: 10px;
    width: 500px;
}

.login-form-input .el-input__inner {
    border: 0 none;
    border-bottom: 1px solid #ccc;
    border-radius: 0px;
}
</style>
