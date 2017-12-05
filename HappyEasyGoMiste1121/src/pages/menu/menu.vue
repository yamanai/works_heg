<template>
	<div id="menu" class="menu" @touchstart="hideMenu" @touchmove="touchend">
		<div class="menu-cont">
			<div class="menu-user flex direction-column content-center align-items-center">
				<div class="user-img">
					<img v-if="!isLogin" :src="require('../../assets/images/profile/before.png')" alt="">
					<img v-else :src="require('../../assets/images/profile/after.png')" alt="">
				</div>
				<div class="user-login">
					<div class="user-LS flex space-between align-items-center" v-if="!isLogin">
						<span @click="gotoLogin()">Sign in</span>
						<span @click="gotoSignUp()">Sign up</span>
					</div>
					<span v-else-if="userInfoSe.email">{{userInfoSe.email}}</span>
					<span v-else>
						{{userInfoSe.firstname}}{{userInfoSe.lastname}}
					</span>
				</div>
			</div>
			<div class="menu-list">
				<ul>
					<li v-if="isLogin" class="flex space-between" @click="$router.push('/trip')">
						<span>My Trips</span>
						<span class="ico"></span>
					</li>
					<li v-else class="flex space-between" @click="$router.push('/search')">
						<span>My Trips</span>
						<span class="ico"></span>
					</li>
					<li v-if="isLogin" class="flex space-between" @click="$router.push('/happywallet')">
						<span>Happy Wallet</span>
						<div class="totalAmount">
							<span class="rs">.Rs</span>
							<span>
								{{amount}}
							</span>
						</div>

						<span class="ico"></span>
					</li>
					<li v-if="isLogin" class="flex space-between" @click="$router.push('/profile')">
						<span>My Profile</span>
						<span class="ico"></span>
					</li>
					<li class="flex space-between" @click="$router.push('/about')">
						<span>About Us</span>
						<span class="ico"></span>
					</li>
					<li class="flex space-between" @click="$router.push('/contact')">
						<span>Contact Us</span>
						<span class="ico"></span>
					</li>
					<li class="flex space-between" @click="$router.push('/feedback')">
						<span>Feedback</span>
						<span class="ico"></span>
					</li>
					<li v-if="isLogin" class="flex space-between" @click="$router.push('/security')">
						<span>Account Security</span>
						<span class="ico"></span>
					</li>
				</ul>
			</div>
			<div v-if="isLogin" class="sign-out">
				<span class="out" @click="signOut()">sign out</span>
			</div>
		</div>
	</div>
</template>
<script>
import login from '../login/login.vue'
import { CookieUtil } from '../../models/utils'
import { User } from '../../models/user'
import Toast from 'mint-ui/lib/toast';

export default {
	components: {
		login
	},
	data() {
		return {
			showMenu: false,
			showLogin: true,
			startX: 0,
			endX: 0,
			userInfoSe: {}
		}
	},
	computed: {
		userInfo() {
			return this.$store.getters.userInfo ? this.$store.getters.userInfo : '';
		},
		isLogin() {
			let cu = new CookieUtil(document);
			return cu.hasItem('uuid') ? true : false;
		},
		amount() {
			return JSON.parse(sessionStorage.silver).happySilverBalance + JSON.parse(sessionStorage.gold).happyGoldBalance;
		}

	},
	methods: {
		gotoLogin() {
			this.$router.push('/login')
			this.$emit('closeMenu', this.showMenu);
		},
		gotoSignUp() {
			this.$router.push('/register')
			this.$emit('closeMenu', this.showMenu);
		},
		hideMenu(e) {
			let touch = e.targetTouches[0];
			this.startX = touch.pageX;
			var menu_cout = document.getElementsByClassName('menu-cont')[0].offsetWidth;
			if (touch.pageX > menu_cout) {
				setTimeout(() => {
					this.$emit('closeMenu', this.showMenu);
				}, 20)
			}
		},
		touchend(e) {
			let touch = e.targetTouches[0];
			this.endX = touch.pageX;
			let abs = Math.abs(this.endX - this.startX);
			if (this.endX < this.startX && abs >= 30) {
				this.$emit('closeMenu', this.showMenu);
			}
		},
		login() {
			this.$emit('isLogin');
		},
		signOut() {
			let cu = new CookieUtil(document)
			if (cu.removeItem("uuid")) {
				Toast({
					message: 'sign out successful',
					duration: 1000
				});
				sessionStorage.removeItem('user');
				this.$emit('closeMenu', this.showMenu);
				this.$router.push("/")
			}
		}
	},
	created() {
		if (sessionStorage.user) {
			this.userInfoSe = JSON.parse(sessionStorage.user);
		}
	}
}
</script>
<style lang="less" scoped>
.menu {
	width: 100%;
	height: 100%;
	background-color: transparent;
	position: fixed;
	z-index: 20;
	.menu-cont {
		width: 70%;
		height: 100%;
		background-color: #2f2e42;
		padding-left: 0.68rem;
		.menu-user {
			padding-top: 2rem;
			.user-img {
				text-align: left;
				img {
					width: 3.2rem;
				}
			}
			.user-login {
				padding: 0.2rem 0;
				.user-LS {
					span {
						display: block;
						padding: 0.45rem 0.86rem;
						margin: 0 0.64rem;
						border-bottom: 1px solid #595868;
					}
				}
				span {
					color: #d5923e;
					font-size: 0.6rem;
				}
			}
		}
	}
	.menu-list {
		ul {
			padding-right: 0.68rem;
			li {
				text-align: left;
				font-size: 0.6rem;
				color: #fff;
				border-bottom: 1px solid #595868;
				.totalAmount {
					text-align: right;
					span {
						margin: 0;
						color: #0b9d78;
					}
				}
				a,
				span {
					display: inline-block;
					margin-left: 0.7rem;
					padding: 0.6rem 0;
					color: #fff;
				}
				.ico {
					width: 0.6rem;
					padding: 0.6rem 0;
					margin-right: 0.4rem;
					display: list-item;
					background: url('../../assets/images/ic-btn-one.png') center no-repeat;
					background-size: 0.4rem;
				}
			}
			.active {
				color: #0b9d78;
			}
		}
	}
	.sign-out {
		margin-top: 1rem;
		padding-right: 0.68rem;
		.out {
			color: #d5923e;
			font-size: 0.512rem;
			padding: 0.64rem;
		}
	}
}
</style>