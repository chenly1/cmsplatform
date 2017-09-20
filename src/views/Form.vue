<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-row>
			<el-col :span="12">
				<el-form-item label= "标题">
					<el-input v-model="form.title" placeholder="（必填）" class="login-form-input"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label= "副标题">
					<el-input v-model="form.subtitle" class="login-form-input"></el-input>
				</el-form-item>
			</el-col>
		 </el-row>
		<el-row>
			<el-col :span="12">	
				<el-form-item label= "责任编辑">
					<el-input v-model="form.editor" placeholder="（必填）" class="login-form-input"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="原创">
					<el-switch on-color="#13ce66" off-color="#ff4949" v-model="form.original" :change="switchChange()"></el-switch>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">	
				<el-form-item label= "来源">
					<el-input v-model="form.source" :disabled="true" class="input"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label= "原作者">
					<el-input v-model="form.author" :disabled="true" class="input"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item label= "来源地址">
			<el-input v-model="form.sourceurl" :disabled="true" class="input">
				 <template slot="prepend">Http://</template>
			</el-input>
		</el-form-item>
    <div class="components-container">  
			<div class="editor-container">
				<UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
			</div>
  	</div>
		<el-form-item>
			<el-button type="primary" @click.native="onSubmit">提交</el-button>			
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>
<style>
    .login-form-input .el-input__inner {
        border: 0 none;
        border-bottom: 1px solid #ccc;
        border-radius: 0px;
		}
		.input .el-input__inner {
        border: 0 none;
        border-bottom: 1px solid #ccc;
        border-radius: 0px;
		}
		.info {
			border-radius: 10px;
			line-height: 20px;
			padding: 10px;
			margin: 10px;
			background-color: #ffffff;
  	}
</style>
<script>
  import UE from '../components/ue/ue.vue';
	export default {
		components: {UE},
		data() {
			return {
				form: {
					title: '',
					subtitle: '',
					editor: '',
					source: '',
					sourceurl: '',
					original: true,
					author: '',
					mainbody: ''
				},
				config: {
					toolbars: [
    				['fullscreen', 'simpleupload', 'insertimage', 'insertvideo','source', 'undo', 'redo', 'bold']
					],
					initialFrameWidth: null,
					initialFrameHeight: 350
				},			
				ue1: "ue1"
			}
		},
		methods: {
			switchChange: function () {
				debugger;
				if(this.form.original === false)
				{						
					const input = document.querySelector(".input .el-input__inner");
          input.disabled = false;
				}
			},
			onSubmit: function() {  
				debugger;
				let content = this.$refs.ue.getUEContent();
				this.form.mainbody = content;
				let para = Object.assign({}, this.form);
         
        this.$http.post('/path/to', para).then((response) => {

        }, (response) => {

        });
				console.log('submit!');
			}
		}
	}

</script>