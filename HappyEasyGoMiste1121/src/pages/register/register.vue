<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="ico iconfont icon-back" @click="back()"></i>
			<div slot="title" class="head-title">sign up</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="form-list">
				<div class="form-group">
					<input type="text" v-model="email" placeholder="E-mail address">
				</div>
				<div class="form-group hb  flex space-between align-items-center">
					<input class="sp nb" type="text" v-model="mobile" placeholder="Mobile Number">
					<a class="send" @click="sendOTP">{{submit}}</a>
				</div>
				<div class="form-group">
					<input type="text" v-model="otp" placeholder="Verification Code">
				</div>
				<div class="form-group">
					<input type="password" v-model="password" placeholder="Password">
				</div>
				<div class="statement clear">
					<span class="selected" :class="{choose:isSelec}" @click="isSelec=!isSelec"></span>
					<p>By signing up,you agree to Happy easy go's
						<span @click="$router.push('/agreement')">terms &amp; conditions</span>
					</p>
				</div>
				<div class="register">
					<a class="reg" @click="validate">Sign in</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import { Toast, Indicator } from 'mint-ui'
import { Register } from '../../models/user/Register.js'
import { User } from '../../models/user/User.js'
import { CookieUtil } from '../../models/utils'
export default {
	components: {
		headTop
	},
	data() {
		return {
			isSelec: true,
			email: '',
			otp: '',
			mobile: '',
			password: '',
			submit: 'Submit'
		}
	},
	methods: {
		sendOTP() {
			var self = this;

			if (this.submit != 'Submit') {
				return false;
			}

			let parm = 'phone=' + self.mobile
			var pl = this.mobile + '';
			var btn = document.querySelector('.send');

			if (self.mobile == '') {
				Toast('Please enter correct phone number')
			} else if (pl.length != 10) {
				Toast('Please enter correct phone number ( 10 digital number allowed )')
			} else {
				// if (this.submit == 'Submit') {
				// 	this.submit = 60
				// }
				User.sendRegisterOTP(self, parm).then(res => {
					// if (this.submit == 'Submit') {
					// 	this.submit = 60
					// }
					if (res.success) {
						Toast('success');
						btn.style.backgroundColor = '#ccc';
						self.submit = res.lastSendTime;

						var stop = setInterval(function() {
							if (self.submit > 1) {
								self.submit--;
							} else {
								clearInterval(stop);
								btn.style.backgroundColor = '#0b9d78';
								self.submit = 'Submit';
							}
						}, 1000)
					} else {
						Toast({
							message: res.msg,
							duration: 2000
						})
					}
				})
			}
		},
		validate() {
			if (this.email.trim() == "" || !/@/g.test(this.email)) {
				Toast({
					message: 'Please enter correct Email Adress',
					duration: 2000
				});
			} else if (this.otp.trim() == "") {
				Toast({
					message: 'Please enter correct OTP',
					duration: 2000
				});
			} else if (this.mobile.trim() == "" || !/\d/g.test(this.mobile)) {
				Toast({
					message: 'Please enter correct Phone number',
					duration: 2000
				});
			} else if (this.password.length < 6) {
				Toast({
					message: 'Plaese enter correct password (6 digital allowed)',
					duration: 2000
				});
			} else if (!this.isSelec) {
				Toast({
					message: 'Please agree to the terms',
					duration: 2000
				});
			} else {
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				let register = new Register(this.email, this.otp, this.mobile, this.password);
				register.register(this).then((res) => {
					res.json().then((jsonObj) => {
						if (jsonObj.success) {
							Indicator.close();
							Toast({
								message: 'registration success,please verify your email',
								duration: 3000
							});
							let cu = new CookieUtil()
							if (cu.hasItem("uuid")) {
								User.loadUser(this)
									.then(user => {
										this.$nextTick(() => {
											this.user = user;
											sessionStorage.setItem("user", JSON.stringify(user));
										})
									})
									.catch(err => { reject(err) })
							}
							this.$router.push("/");
						} else {
							Indicator.close();
							Toast(jsonObj.msg)
						}
					}).catch((err) => {
						Indicator.close();
						console.log(err)
					});

				}).catch((err) => {
					Indicator.close();
					console.log(err)
					Toast({
						message: 'network anomaly',
						duration: 2000
					});
				});
			}
		},
		back() {
			this.email = '';
			this.otp = '';
			this.password = '';
			this.mobile = '';
			this.$router.push('/');
		}
	}
}
</script>
<style lang='less' scoped>
.header {
	background: #0b9d78;
	.head-title {
		font-size: 0.768rem!important;
		line-height: 2.04rem;
		color: #fff;
	}
	.sp {
		opacity: 0;
	}
}

.container {
	padding: 0 0.68rem;
	overflow: auto;
	.form-list {
		padding-top: 2.68rem;
		.form-group {
			width: 100%;
			margin-bottom: 0.64rem;
			box-sizing: border-box;
			border-radius: 4px;
			input {
				border: 1px solid #ddd;
				box-sizing: border-box;
				width: 100%;
				padding: 0.44rem;
				font-size: 0.64rem;
			}
			.sp {
				width: 80%;
				border-right: none;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				padding: 0 0.44rem;
				line-height: 1.7rem;
				box-sizing: border-box;
			}
			.nb {
				border: none;
			}
			a {
				display: block;
				width: 20%;
				line-height: 1.7rem;
				font-size: 0.64rem;
				color: #fff;
				background: #0b9d78;
			}
		}
		.hb {
			border: 1px solid #ddd;
		}
		.register {
			margin-top: 2rem;
			a {
				width: 100%;
				background-color: #ffad3d;
				height: 1.8rem;
				font-size: 0.768rem;
				color: #fff;
				line-height: 1.8rem;
				display: block;
				border-radius: 4px;
			}
		}
		.statement {
			text-align: left;
			.selected {
				float: left;
				width: 0.68rem;
				height: 0.68rem;
				background: url('../../assets/images/common/select-gray.png') center no-repeat;
				background-size: 0.68rem;
				margin-top: 0.05rem;
			}
			.choose {
				background: url('../../assets/images/common/select-green.png') center no-repeat;
				background-size: 0.68rem; // border-color: #f56600!important;
			}
			p {
				color: #999;
				font-size: 0.6rem;
				margin-left: 1rem;
				line-height: 0.8rem;
				span {
					color: #0db88f;
				}
			}
		}
	}
}
</style>