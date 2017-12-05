<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
			<div slot="title" class="title">Referral Program</div>
			<i slot="right" alt="" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="top"></div>
			<div class="share">
				<h2 class="green">Share Your Refferal Link</h2>
				<div class="line"></div>
				<div class="share-list">
					<h2>
						<span class="fc">By Email </span>
					</h2>
					<div class="form-group flex space-between">
						<input type="text" id="email" placeholder="Enter Friend's Email" v-model="email">
						<a href="javascript:" @click="shareEmail()">Invite</a>
					</div>
				</div>
				<div class="share-list">
					<h2>
						<span class="fc">By SMS</span>
					</h2>
					<div class="form-group flex space-between">
						<input type="text" id="sms" placeholder="Enter Friend's Mobile No." v-model="sms">
						<a href="javascript:" @click="shareSMS()">Invite</a>
					</div>
				</div>
				<div class="share-list">
					<h2>
						<span class="fc">By URL</span> (Copy your unique url)
					</h2>
					<div class="form-group flex space-between">
						<input type="text" id="url" placeholder="https://www.happeasygo.com/" v-model="url">
						<a href="javascript:" @click="shareUrl()">Copy</a>
					</div>
				</div>
			</div>
			<div class="media-share">
				<h2 class="green">Share on your Social Media</h2>
				<div class="line"></div>

				<div class="share-list flex content-center">
					<a class="fb" href="javascript:">
						<img src="../../assets/images/referral/facebook.jpg" alt="">
					</a>
					<a id="tw" href="javascript:">
						<img src="../../assets/images/referral/twitter.jpg" alt="">
					</a>
					<a id="sms" href="javascript:">
						<img src="../../assets/images/referral/unkonw.jpg" alt="">
					</a>
				</div>
			</div>
			<div class="section1">
				<h2 class="green">How It Works?</h2>
				<div class="line"></div>
				<p>
					&bull; Sign in / Sign on HappyEasyGo.com and join in our Referral Program.
				</p>
				<p>
					&bull; Share with your friends by provided social Media, Email or SMS.
				</p>
				<p>
					&bull; You will earn Rs.500 Happy Silver when your friend signs up on HappyEasyGo.com by your referral links.
				</p>
				<p>
					&bull; You will earn Rs.50 Happy Gold when your referred friends issue their order on HappyEasyGo.com.
				</p>
				<p>
					The total rewards of each person is no more than
					<i class="rs">Rs.</i>300 Happy Gold.
				</p>
			</div>
			<div class="foot flex content-center">
				<a href="javascript:" @click="$router.push('/referrerInfo')">Click here for Terms &amp; Conditions</a>
			</div>
		</div>
		<div class="mask" v-show="showTips"></div>
		<div class="tips" v-show="showTips">
			<div class="close"></div>
			<div class="title">
				<h2>
					{{title}}
				</h2>
			</div>
			<div class="text">
				<p class="sp">{{text}}</p>
				<p v-show="ifSucc">
					<i class="rs">Rs.</i>500 Happy Silver will be credited into your account instantly once the recipient signs up with your referral link.</p>
			</div>
			<div class="btn">
				<a href="javascript:;" @click="toggleTips()">Close</a>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import { User } from '../../models/user'
import { Toast } from 'mint-ui'
import { CookieUtil } from '../../models/utils'
export default {
	components: {
		headTop
	},
	data() {
		return {
			email: '',
			sms: '',
			url: '',
			mask: false,
			title: '',
			text: '',
			showTips: false,
			ifSucc: true,
			ifLogin: false
		}
	},
	methods: {
		goLogin() {
			if (!this.ifLogin) {
				this.$router.push('/login')
			}
		},
		toggleTips() {
			this.showTips = !this.showTips;
		},
		shareUrl() {
			if (!this.ifLogin) {
				this.$router.push('/login')
			} else {
				if (this.url == '') {
					Toast('Something wrong with the referral program,please try later')
				} else {
					this.toggleTips();
					this.title = 'Copy Url';
					this.text = 'Your referral Link has been copied, you can start to invite now';
					var url = document.getElementById("url");
					url.focus();
					url.setSelectionRange(0, url.value.length);
					var isCopy = document.execCommand('copy', true);
					User.shareUrl(this).catch(err => {

					});
					if (isCopy) {
						Toast('Copy url suceess!')
					} else {
						Toast('Please try it again.')
					}
				}
			}
		},
		shareEmail() {
			if (!this.ifLogin) {
				this.$router.push('/login')
			} else {
				let ereg = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/;

				if (!ereg.test(this.email)) {
					Toast('please input correct email address')
					return false;
				}
				var parm = 'email=' + this.email;
				// var parm = this.email;
				User.shareByEmail(this, parm).then(res => {
					if (res.success) {
						this.title = 'Email Invitation';
						this.text = 'Your invitation has been sent to ' + this.email;
						this.toggleTips();
					} else {
						this.ifSucc = false;
						this.title = 'Invitation Failed';
						this.text = 'Your invitation hasn\'t been sent successfully. Please try again.';
					}
				})
			}
		},
		shareSMS() {
			if (!this.ifLogin) {
				this.$router.push('/login')
			} else {
				if (this.sms.length < 10) {
					Toast('please input correct phone number')
					return false;
				}
				var parm = 'phone=' + this.sms;
				User.shareBySMS(this, parm).then(res => {
					if (res.success) {
						this.title = 'SMS Invitation';
						this.text = 'Your invitation has been sent to ' + this.sms;
						this.toggleTips();
					} else {
						this.ifSucc = false;
						this.title = 'Invitation Failed'
						this.text = 'Your invitation hasn\'t been sent successfully. Please try again.';
					}
				})
			}
		}
	},
	created() {
		var cu = new CookieUtil();
		cu.hasItem('uuid') ? this.ifLogin = true : this.ifLogin = false;

		if (!this.ifLogin) {
			Toast({
				message: 'You need to log in before you can use the sharing feature',
				duration: 2000
			})
		} else {
			User.shareRegister(this).then(res => {
				if (res.success) {
					this.url = res.url;
				}
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>
<style lang='less' scoped>
.wrapper {
	font-family: "PingFangSC";
	background: #f4f4f4;
}

.container {
	position: relative;
}

.tips {
	width: 12.16rem; // height: 8.4rem;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -4.2rem;
	margin-left: -6.08rem;
	z-index: 19;
	background: #fff;
	padding: 0 0.64rem;
	box-sizing: border-box;
	font-size: 0.512rem;
	.title {
		padding-top: 1.152rem;
		text-align: center;
		h2 {
			font-weight: bold;
		}
	}
	.text {
		padding-top: 0.32rem;
		text-align: left;
		p {
			line-height: 1.5;
		}
		.sp {
			padding-bottom: 0.15rem;
		}
	}
	.btn {
		padding-top: 0.32rem;
		a {
			display: block;
			width: 10.88rem;
			height: 1.49rem;
			line-height: 1.49rem;
			background: #ffad3d;
			color: #fff;
			border-radius: 4px;
			margin-bottom: 0.64rem;
		}
	}
}

.mask {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: #000;
	opacity: 0.5;
	z-index: 10;
}

.header {
	// background: url('../../assets/images/referral/head_top.jpg') center no-repeat;
	background: #0b9d78;
	.title {
		line-height: 2.04rem;
		font-size: 0.768rem;
		color: #fff;
	}
	.sp {
		opacity: 0;
	}
}

.top {
	margin-top: 1.8rem;
	height: 10rem;
	background: url('../../assets/images/referral/top_bg.png') center no-repeat;
	background-size: 100%;
	background-color: #fff;
}

.share {
	background-color: #fff;
	padding: 0 0.64rem 0.64rem 0.64rem;
	h2 {
		font-size: 0.597rem;
		height: 1.2rem;
		line-height: 1.2rem;
	}
	.line {
		width: 12%;
		margin: 0 auto;
		border-bottom: 1px solid #0b9d78;
	}
	.share-list {
		text-align: left;
		margin: 0.2rem 0;
		h2 {
			color: #999;
			.fc {
				color: #666;
			}
		}
		div {
			padding: 0.4rem 0;
		}
		.form-group {
			height: 1.7rem;
			input {
				width: 78%;
				height: 100%;
				line-height: 1.7rem;
				font-size: 0.6rem;
				box-sizing: border-box;
				padding: 0.32rem;
				border: 1px solid #ddd;
				border-right: 0;
				border-top-left-radius: 2px;
				border-bottom-left-radius: 2px;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
			a {
				display: inline-block;
				width: 22%;
				height: 100%;
				line-height: 1.7rem;
				font-size: 0.512rem;
				color: #fff;
				background-color: #ffa033;
				text-align: center;
				border-top-right-radius: 2px;
				border-bottom-right-radius: 2px;
			}
		}

		#fac {
			width: 1.36rem;
			height: 1.36rem;
			background: url('../../assets/images/referral/facebook-icon.png') center no-repeat;
			background-size: 7.2rem 1.36rem;
			display: block;
			margin-left: 0.4rem;
		}
	}
}

.media-share {
	display: none;
	background-color: #fff;
	margin-top: 0.21rem; // display: none;
	h2 {
		font-size: 0.597rem;
		height: 1.2rem;
		line-height: 1.2rem;
	}
	.line {
		width: 12%;
		margin: 0 auto;
		border-bottom: 1px solid #0b9d78;
	}
	.share-list {
		text-align: left;
		padding: 1.7rem 0;
		h2 {
			color: #999;
			.fc {
				color: #666;
			}
		}
		div {
			padding: 0.4rem 0;
		}
		.form-group {
			height: 1.7rem;
			input {
				width: 78%;
				height: 100%;
				line-height: 1.7rem;
				font-size: 0.6rem;
				box-sizing: border-box;
				padding: 0.32rem;
				border: 1px solid #ddd;
				border-right: 0;
				border-top-left-radius: 2px;
				border-bottom-left-radius: 2px;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
			a {
				display: inline-block;
				width: 22%;
				height: 100%;
				line-height: 1.7rem;
				font-size: 0.512rem;
				color: #fff;
				background-color: #ffa033;
				text-align: center;
				border-top-right-radius: 2px;
				border-bottom-right-radius: 2px;
			}
		}

		a {
			width: 1.7rem;
			height: 1.7rem;
			color: #000;
			background: lightblue;
			text-align: center;
			display: block;
			border-radius: 4px;
			margin: 0 1.06rem;
			img {
				display: block;
				width: 1.7rem;
				height: 1.7rem;
			}
		}
	}
}

.section1 {
	padding: 0.68rem;
	background-color: #fff;
	margin-top: 0.21rem;
	.line {
		width: 12%;
		margin: 0 auto;
		border-bottom: 1px solid #0b9d78;
	}
	h2 {
		font-size: 0.597rem;
		height: 1.2rem;
		line-height: 1.2rem;
	}
	p {
		font-size: 0.512rem;
		text-align: left;
		color: #666;
		line-height: 0.769rem;
		margin-top: 0.4rem;
	}
}

.foot {
	background-color: #fff;
	padding: 1rem 0;
	a {
		width: 10.68rem;
		height: 1.2rem;
		line-height: 1.2rem;
		border: 1px solid #ffa234;
		font-size: 0.6rem;
		color: #ffa234;
		text-align: center;
		border-radius: 0.2rem;
	}
}

::-webkit-input-placeholder {
	color: #adadad;
	font-size: 0.6rem;
}

::-moz-placeholder {
	color: #adadad;
	font-size: 0.6rem;
}

:-moz-placeholder {
	color: #adadad;
	font-size: 0.6rem;
}
</style>