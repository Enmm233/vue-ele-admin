<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">后台管理系统</div>

			<el-tabs v-model="activeName" @tab-click="handleClick">
				<!-- <el-tab-pane label="账号登录" name="first">

					<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
						<el-form-item prop="username">
							<el-input v-model="param.username" placeholder="username">
								<el-button slot="prepend" icon="el-icon-lx-people"></el-button>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
								<el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
							</el-input>
						</el-form-item>
						<div class="login-btn">
							<el-button type="primary" @click="submitForm()">登录</el-button>
						</div>
					</el-form>
				</el-tab-pane> -->
				<el-tab-pane label="验证码登录" name="second">

					<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
						<el-form-item prop="login_id">
							<el-input v-model="param.login_id" placeholder="请输入手机号">
								<el-button slot="prepend" icon="el-icon-lx-people"></el-button>
							</el-input>
						</el-form-item>
						<el-form-item prop="verification_code" class="code">
							<el-input v-model="param.verification_code" placeholder="请输入验证码" @keyup.enter.native="subCodeLon()"></el-input>
							<el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==false">发送验证码
							</el-button>
							<el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==true">{{btntxt}}
							</el-button>
						</el-form-item>
						<!-- <el-form-item prop="verification_code">
							<el-input placeholder="请输入验证码" v-model="param.verification_code" @keyup.enter.native="submitForm()">
								<el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
							</el-input>
						</el-form-item> -->
						<div class="login-btn">
							<el-button type="primary" @click="subCodeLon()">登录</el-button>
						</div>
					</el-form>
				</el-tab-pane>
			</el-tabs>


		</div>
	</div>
</template>

<script>
	import { doSendCode,codeLogin } from '../../api/index';
	import { mapState } from 'vuex'
	export default {
		data: function() {
			return {
				disabled: false,
				time: 0,
				btntxt: "重新发送",
				param: {
					username: '',
					password: '',
					login_id: '',
					verification_code: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					login_id: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}],
					verification_code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
				},
				activeName: 'second'
			};
		},
		methods: {
			//手机验证发送验证码
			sendcode() {
				const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
				if (this.param.login_id == '') {
					this.$message({
						message: '手机号不能为空',
						center: true
					})
					return
				}
				if (!reg.test(this.param.login_id)) {
					this.$message({
						message: '请输入正确的手机号',
						center: true
					})
					return
				} else {
					var query = {
						data:{
							login_id:this.param.login_id,
							platform:5
						}
					};
					doSendCode(query).then(res => {
						if(res.code == 1){
							this.$message({
								message: '发送成功',
								type: 'success',
								center: true
							});
						}
					});
					
					this.time = 60;
					this.disabled = true;
					this.timer();
				}
			},
			//验证码登录
			subCodeLon(){
				if (this.param.verification_code == '') {
					this.$message({
						message: '验证码不能为空',
						center: true
					})
					return
				}
				var query = {
					data:{
						login_id:this.param.login_id,
						verification_code:this.param.verification_code,
						platform:5,
						MEID:'',
						invicode:'',
						platformType:1
					}
				};
				codeLogin(query).then(res => {
					if(res.code == 1){
						this.$message.success('登录成功');
						localStorage.setItem('ms_username', res.data.userAccount.nickName);
						localStorage.setItem('account_id', res.data.userAccount.id);
						localStorage.setItem('login_id', res.data.userAccount.loginId);
						// alert(1)
						this.$router.push('/product_list');
					}
				});
			},
			//60S倒计时
			timer() {
				if (this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s后重新获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
				}
			},
			handleClick(tab, event) {
				// console.log(tab, event);
			},
			submitForm() {
				this.$refs.login.validate(valid => {
					if (valid) {
						this.$message.success('登录成功');
						localStorage.setItem('ms_username', this.param.username);
						this.$router.push('/');
					} else {
						this.$message.error('请输入账号和密码');
						// console.log('error submit!!');
						return false;
					}
				});
			},
		},
	};
</script>

<style scoped>
	.login-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url(../../assets/img/login-bg.jpg);
		background-size: 100%;
	}

	.ms-title {
		width: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: #fff;
	}

	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 350px;
		margin: -190px 0 0 -175px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.3);
		overflow: hidden;
	}

	.ms-content {
		padding: 30px 30px;
	}

	.login-btn {
		text-align: center;
	}

	.login-btn button {
		width: 100%;
		height: 36px;
		margin-bottom: 10px;
	}

	.login-tips {
		font-size: 12px;
		line-height: 30px;
		color: #fff;
	}

	.code .el-input {
		width: 55%;
		border-radius: 0px;
		float: left;
		display: inline-block;
	}

	.code .el-button {
		width: 45%;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		border-left: 0px;
		float: left;
		display: inline-block;
	}

</style>
