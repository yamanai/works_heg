<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="iconfont icon-back" @click="$router.push('/')"></i>
			<span slot="title" class="title">Sign in</span>
			<img class="placeholder" slot="right" alt="">
		</head-top>

		<div class="container-login flex content-center">
			<div class="login">
				<div class="logo">
					<a v-show="false" id="facebook" @click="signinWithFacebookAccount"></a>
					<!-- <a id="twitter"></a> -->
				</div>
				<div class="top-content">
					<div class="text">
						<p>There are lots of Cashback Rewards and Discount after you sign in</p>
					</div>
					<div class="avatar">
						<img src="../../assets/images/profile/before.png" alt="">
					</div>
				</div>
				<div class="user">
					<div class="form-group">
						<i class="iconfont icon-user"></i>
						<input type="text" v-model="username" placeholder="Enter your email address">
					</div>
					<div class="form-group">
						<i class="iconfont icon-password"></i>
						<input type="password" v-model="password" placeholder="Enter your password">
					</div>
				</div>
				<div class="refer">
					<div class="signin">
						<a @click="sign">Sign in</a>
					</div>
					<div class="register">
						<router-link to="/register">Sign up</router-link>
					</div>
				</div>
				<div class="forgot">
					<span @click="$router.push('/forgotpassworduser')">Forgot Password?</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import Toast from 'mint-ui/lib/toast';
import { Indicator } from 'mint-ui'
import { TimeFormatUtil, GetFlightOrderUtil } from '../../models/utils'
import { FaceBookApi, authories, loginStatus } from '../../models/facebookapi'
import { User } from '../../models/user'
import { CookieUtil } from '../../models/utils'
import { loginUserInfo } from '../../vuex/models/user/XUser.js'
import { DomainManager } from '../../config/DomainManager.js'
import { Silver, Gold } from '../../models/discount'
import * as types from '../../vuex/types/types.js'
import * as XUser from '../../vuex/models/user/XUser.js'

var _fb = new FaceBookApi()



export default {
	components: {
		headTop
	},
	data() {
		return {
			user: '',
			isLogin: false,
			username: '',
			password: ''
		}
	},
	methods: {
		goBack() {
			Indicator.close();
			this.$router.go(-1);
		},
		goWallet() {
			let self = this;
			Promise.all([
				Silver.getSilverPrice(this),
				Gold.getGoldPrice(this),
				Silver.getSilverRunning(this),
				Gold.getGoldRunning(this),
				User.searchCashBack(this)
			]).then((res) => {
				let silverState = {
					happySilverBalance: res[0].happySilverBalance,
					happySilverRunning: res[2]
				};
				let goldState = {
					happyGoldBalance: res[1].happyGoldBalance,
					happyGoldRunning: res[3]
				}
				let cashbackState = {
					total: res[4].data.amount,
					list: res[4].data.record
				}
				self.$store.commit(types.GET_SILVER, silverState);
				self.$store.commit(types.GET_GOLD, goldState);
				sessionStorage.setItem("silver", JSON.stringify(silverState));
				sessionStorage.setItem("gold", JSON.stringify(goldState));
				sessionStorage.setItem('cashback', JSON.stringify(cashbackState))
			}, (err) => {
				console.log(err);
			})
		},
		sign() {
			let self = this;
			if (Object.is(this.username.trim(), '')) {
				Toast({
					message: 'Please enter correct Email Adress',
					duration: 1000
				});
			} else if (Object.is(this.password, '')) {
				Toast({
					message: 'Plaese enter password',
					duration: 1000
				});
			} else {
				Indicator.open({
					spinnerType: 'fading-circle'
				});

				User.login(self, self.username, self.password, true).then(res => {
					res.json().then((jsonObj) => {
						if (jsonObj.success) {
							Indicator.close()
							let cu = new CookieUtil(document)
							if (cu.hasItem("uuid")) {
								User.loadUser(self)
									.then(user => {
										self.$nextTick(() => {
											self.user = user;
											self.$store.commit(loginUserInfo, user)
											sessionStorage.setItem("user", JSON.stringify(user));
										})
									})
									.catch(err => { console.log(err) })
							}
							this.goWallet()
							self.$router.push('/');
						} else {
							Indicator.close()
							Toast(jsonObj.msg);
						}
					}).catch(err => console.log(err));

				}).catch(err => {
					console.log(err);
					Indicator.close();
					Toast({
						message: 'Login failed',
						duration: 1000
					});
				});
			}
		},
		signinWithFacebookAccount() {
			_fb.getLoginStatus(response => {
				let status = response.status
				let athorObj = response.authResponse
				switch (status) {
					case loginStatus.CONNECTED:
						_fb.getUserInfo(res => {
							User.loginWithFacebookInfos(this, res.id, res.email, res.first_name, res.last_name)
						})
						break
					case loginStatus.AUTH_RESPONSE:
						_fb.getUserInfo(res => {
							User.loginWithFacebookInfos(this, res.id, res.email, res.first_name, res.last_name)
						})
						break
					default:
						_fb.login([authories.PUBLIC_PROFILE, authories.EMAIL], (res) => {
							_fb.getUserInfo(res => {
								User.loginWithFacebookInfos(this, res.id, res.email, res.first_name, res.last_name)
							})
						})
						break
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
// @import '../../../node_modules/mint-ui/lib/style.css';
.header {
	background: #0b9d78;
	position: absolute;
	top: 0;
	.title {
		font-size: 0.768rem;
	}
	i {
		display: block;
		height: 100%;
	}
}

.top-content {
	padding-top: 2.04rem;
	.text {
		font-size: 0.427rem;
		padding: 0.64rem 0rem;
	}
	.avatar {
		width: 4.05rem;
		height: 4.05rem;
		margin: 0 auto;
		border: 1px solid #ddd;
		border-radius: 50%;
		overflow: hidden;
		img {
			display: block;
			color: #999;
			width: 4rem;
			height: 4rem;
		}
	}
}

.container-login {
	width: 100%;
	height: 100%;
	.login {
		padding: 0 1.28rem;
		.logo {
			#facebook {
				width: 13.46rem;
				height: 1.8rem;
				margin-top: 0.6rem;
				display: block;
				background: url('../../assets/images/login/fbsignin.png') center no-repeat;
				background-size: cover;
				border-radius: 0.2rem;
			}
			#twitter {
				width: 13.46rem;
				height: 1.8rem;
				display: block;
				background: url('../../assets/images/login/twsignin.png') center no-repeat;
				background-size: cover;
				margin-top: 0.42rem;
				border-radius: 0.2rem;
			}
		}
	}
	.user {
		padding-top: 2rem;
		.form-group {
			display: table;
			width: 100%;
			box-sizing: border-box;
			margin-bottom: 0.4rem;
			border-radius: 4px;
			border: 1px solid #ddd;
			i {
				display: table-cell;
				color: #ddd;
				padding: 0 0.32rem;
			}
			input {
				display: table-cell;
				display: block;
				width: 100%;
				font-size: 0.64rem;
				padding: 0.45rem 0.45rem 0.45rem 0;
				box-sizing: border-box;
				background-size: 0.9rem;
			}
		}
	}

	::-webkit-input-placeholder {
		color: #ccc;
		font-size: 0.6rem;
	}

	::-moz-placeholder {
		color: #ccc;
		font-size: 0.6rem;
	}

	:-moz-placeholder {
		color: #ccc;
		font-size: 0.6rem;
	}

	.refer {
		input {
			width: 12.8rem;
			height: 1.8rem;
			border-radius: 0.2rem;
			color: #fff;
			font-size: 0.68rem;
		}
		.signin {
			margin: 2.85rem 0 0.4rem;
			a {
				background-color: #ffad3d;
				width: 100%;
				height: 1.8rem;
				line-height: 1.8rem;
				border-radius: 4px;
				color: #fff;
				font-size: 0.68rem;
				display: inline-block;
			}
		}
		.register {
			display: none;
			a {
				box-sizing: border-box;
				font-size: 0.768rem;
				width: 12.8rem;
				height: 2rem;
				line-height: 2rem;
				border-radius: 4px;
				background-color: #f0eff5;
				border: 1px solid #ffad3d;
				color: #ffad3d;
				display: inline-block;
			}
		}
	}
	.forgot {
		text-align: right;
		span {
			font-size: 0.512rem;
			color: #0b9d78;
			padding: 0.64rem 0 0.64rem 0.64rem;
		}
	}
}
</style>