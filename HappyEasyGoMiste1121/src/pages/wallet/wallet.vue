<template>
	<div class="wrapper" ref="viewbox">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
			<div slot="title" class="title">Wallet</div>
			<i slot="right" alt="" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="top"></div>
			<div class="top-text">
				<p>
					Happy Wallet is your personal travel wallet (e-cash account) provided by HappyEasyGo. Any e-cashpoint earned by our registered members through participating promotional campaigns will be credited into the Happy Wallet account. You will save big on flights booking if you join in our marketing programs.
				</p>
				<p>Happy Wallet is composed of Happy Gold and Happy Silver</p>

			</div>

			<div class="msg">
				<img src="../../assets/images/wallet/msg.jpg" alt="">
			</div>

			<div class="amount" v-if="isLogin">
				<div class="amount-wrap flex space-between">
					<div class="left">
						<div class="silver flex space-between align-items-center">
							<span class="title">Happy Silver</span>
							<span class="value flex content-start">
								<i class="red">Rs.</i>
								</p>{{silver}}</span>
						</div>
						<div class="gold flex space-between align-items-center">
							<span class="title">Happy Gold</span>
							<span class="value flex content-start">
								<i class="red">Rs.</i>
								</p>{{gold}}</span>
						</div>
					</div>
					<div class="right flex align-items-center content-center">
						<div class="total">
							<span class="value flex content-center">
								<i class="red">Rs.</i>
								</p>{{silver + gold}}</span>
							<span class="title">Total Amount</span>
						</div>
					</div>
				</div>
			</div>

			<div class="section1">
				<div class="silver">
					<div class="title">Happy Silver</div>
					<div class="text">
						<p>
							Happy Silver can be used to save your payment when you book your Domestic Flight as an instant discount cash.
						</p>
					</div>
				</div>
				<div class="gold">
					<div class="title">Happy Gold</div>
					<div class="text">
						<!-- <p>
																																																																																																							Happy Gold can be used to pay for your order and 
																																																																																																							withdraw as well. Just like your own cash. 
																																																																																																						</p> -->
					</div>
				</div>
			</div>
			<div class="section2">
				<div class="text">
					<p>
						There are several ways to earn more Happy Wallet Cash.
					</p>
					<p>Let's take a look and get start step by step.</p>
				</div>
				<div class="box box1">
					<h2>Get Happy Wallet Cash by Signing up</h2>
					<p>
						Earn Happy Silver
						<span class="yellow">Rs.</span>
						<span class="green">2000</span> <br>Just for new user
					</p>
					<a href="javascript:" @click="$router.push('/register')">Sign up</a>
					<div class="num"></div>
				</div>

				<div class="box box-add1">
					<h2>Hope to get more Happy Wallet Cash?</h2>
					<p>Invite your friends to earn Happy Silver Cash</p>
					<p>together with you</p>
					<span>Happy Gold</span>
					<p>When your friend books with us you</p>
					<p>earn Happy Gold
						<i class="green">Rs.</i>50</p>
					<span>Happy Silver</span>
					<p>
						Friend first signs up you
					</p>
					<p>earn Happy Silver
						<i class="green">Rs.</i>500</p>
					<a href="javascript:" @click="$router.push('/register')">Know More</a>
					<div class="num"></div>
				</div>

				<div class="box box2">
					<h2>If you are a Business Flyer, it's easy for you to earn more Happy Wallet cash</h2>
					<p>
						Book Your Business Flight &amp; Earn<br> your own Happy Gold Cash.
					</p>
					<a href="javascript:" @click="$router.push('/cashback')">Know More</a>
					<div class="num"></div>
				</div>
				<div class="box box3">
					<h2>Now you have chance to get even more</h2>
					<!-- <p>
																																																																																																					Recharge your Happy Gold Account You will be given additional Cash Reward
																																																																																																				</p> -->
					<a href="javascript:">Know More</a>
					<div class="num"></div>
				</div>
				<div class="box box4">
					<h2>Focus on our Social Media or Email Info</h2>
					<p>
						We will send some coupon on special day, you can exchange Happy Wallet Cash by using it.
					</p>
					<div class="coupon flex content-end align-items-center">
						<input type="text" placeholder="Coupon Code">
						<a href="javascript:">Apply code</a>
					</div>
					<div class="aside flex content-end">
						<img :src="require('../../assets/images/cashback/icon-12.png')" alt="">
						<img :src="require('../../assets/images/cashback/icon-13.png')" alt="">
						<img :src="require('../../assets/images/cashback/icon-14.png')" alt="">
					</div>
					<div class="num"></div>
				</div>
			</div>
			<div class="foot flex content-center">
				<a href="javascript:" @click="$router.push('wallet/rules')">Click here for Terms &amp; Conditions</a>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import rules from './child/rules.vue'
import { CookieUtil } from '../../models/utils';

export default {
	components: {
		headTop,
		rules
	},
	data() {
		return {
			scrollTop: document.body.scrollTop,
			silver: 0,
			gold: 0
		}
	},
	computed: {
		isLogin() {
			var cu = new CookieUtil();
			return cu.hasItem('uuid') ? true : false
		}
	},
	created() {
		if (sessionStorage.silver) {
			this.silver = JSON.parse(sessionStorage.silver).happySilverBalance;
		}

		if (sessionStorage.gold) {
			this.gold = JSON.parse(sessionStorage.gold).happyGoldBalance;
		}
	}
}
</script>
<style lang='less' scoped>
.red {
	color: #f04545;
}

.wrapper {
	font-family: "PingFangSC";
}

.header {
	background: #17a27f;
	.title {
		font-size: 0.768rem;
		color: #fff;
	}
	.sp {
		opacity: 0;
	}
}

.top {
	margin-top: 2rem;
	height: 9.8rem;
	background: #fff url('../../assets/images/wallet/wallet-app-silver_01.png') center no-repeat;
	background-size: 100% 9.8rem;
}

.section1:before {
	display: table;
	content: '';
}

.top-text {
	padding: 0.4rem 0.68rem;
	text-align: left;
	color: #333;
	p {
		font-size: 0.554rem;
		line-height: 1.5;
	}
}

.msg {
	height: 2.77rem;
	margin: 0.32rem 0.64rem;
	border-top: 1px solid #ffad3d;
	border-bottom: 1px solid #ffad3d;
	img {
		height: 2.77rem;
	}
}

.amount {
	margin: 0.4rem 0.68rem;
	border: 1px solid #999;
	margin-bottom: 0;
	.left {
		height: 3.54rem;
		width: 60%;
		border-right: 1px solid #999;
		.silver,
		.gold {
			height: 50%;
			padding: 0.21rem 0.32rem;
			box-sizing: border-box;
			.title {
				font-size: 0.512rem;
			}
			.value {
				color: #f04545;
				font-size: 0.853rem;
			}
		}
		.silver {
			border-bottom: 1px solid #999;
		}
	}
	.right {
		width: 40%;
		height: 3.54rem;
		.total {
			.title {
				font-size: 0.512rem;
			}
			.value {
				color: #f04545;
				font-size: 1.06rem;
			}
		}
	}
}

.section1 {
	padding: 0.4rem 0.68rem;
	background-color: #fff;
	.silver,
	.gold {
		margin-top: 0.4rem;
		border: 1px solid #999;
		box-sizing: border-box;
		.title {
			font-size: 0.64rem;
			color: #999;
			height: 1.5rem;
			line-height: 1.5rem;
			text-align: left;
			text-indent: 0.4rem;
		}
		.text {
			padding: 0.4rem;
			p {
				font-size: 0.6rem;
				color: #999;
				line-height: 0.769rem;
				text-align: left;
			}
		}
	}
	.silver {
		margin-top: 0;
	}
	.silver .title {
		background: url('../../assets/images/wallet/HappySilver-bg.jpg') center no-repeat;
		background-size: 100% 1.5rem;
	}
	.gold .title {
		background: url('../../assets/images/wallet/HappyGold-bg.jpg') center no-repeat;
		background-size: 100% 1.5rem;
	}
}

.section2 {
	padding: 0.4rem 0.68rem;
	background-color: #fff;
	margin-top: 0.4rem;
	.text {
		padding: 0.4rem;
		p {
			font-size: 0.56rem;
			color: #ffa234;
			line-height: 0.769rem;
			text-align: center;
		}
	}
	.box {
		border: 1px #999 dashed;
		padding: 0.4rem 1rem;
		position: relative;
		margin-top: 0.4rem;
		h2 {
			font-size: 0.6rem;
			color: #333;
			line-height: 1rem;
		}
		p {
			font-size: 0.52rem;
			color: #999;
			line-height: 1rem;
		}
		a {
			display: inline-block;
			background-color: #ffa234;
			color: #fff;
			font-size: 0.52rem;
			width: 3.6rem;
			height: 1.1rem;
			line-height: 1.02rem;
			margin-top: 0.4rem;
			border-raius: 0.4rem;
			text-align: center;
		}
		.num {
			width: 1.36rem;
			height: 1.36rem;
			border-radius: 50%;
			border: 1px #999 dashed;
			position: absolute;
			top: 50%;
			margin-top: -0.68rem;
		}
	}
	.box1 {
		background: url('../../assets/images/wallet/sign-icon.png') right bottom no-repeat;
		background-size: 3.8rem;
		text-align: left;
		h2,
		p {
			text-align: left;
		}
		.num {
			left: -0.68rem;
			background: url('../../assets/images/wallet/01.png') center no-repeat;
			background-size: 100%;
		}
	}

	.box-add1 {
		background: url('../../assets/images/wallet/invite.png') -20% 105% no-repeat;
		background-size: 6.4rem;
		text-align: right;
		h2,
		p {
			text-align: right;
		}
		span {
			font-size: 0.52rem;
		}
		.num {
			right: -0.68rem;
			background: url('../../assets/images/wallet/02.png') center no-repeat;
			background-size: 100%;
		}
	}

	.box2 {
		background: url('../../assets/images/wallet/wallet-app_08.png') right bottom no-repeat;
		background-size: 3.8rem;
		text-align: left;
		h2,
		p {
			text-align: left;
		}

		.num {
			left: -0.68rem;
			background: url('../../assets/images/wallet/03.png') center no-repeat;
			background-size: 100%;
		}
	}
	.box3 {
		background: url('../../assets/images/wallet/wallet-app_12.png') right bottom no-repeat;
		background-size: 3.8rem;
		text-align: left;
		display: none;
		h2,
		p {
			text-align: left;
		}
		.num {
			left: -0.68rem;
			background: url('../../assets/images/wallet/03.png') center no-repeat;
			background-size: 100%;
		}
	}
	.box4 {
		background: url('../../assets/images/wallet/wallet-app_03.png') left bottom no-repeat;
		background-size: 3.8rem;
		text-align: right;
		h2,
		p {
			text-align: right;
		}
		.coupon {
			margin-top: 0.4rem;
			input {
				height: 1.02rem;
				width: 6rem;
				border: 1px solid #ccc;
				padding-left: 0.4rem;
				text-indent: 0;
			}
			a {
				margin-top: 0;
			}
		}
		.aside {
			img {
				width: 1.6rem;
				height: 1.6rem;
				margin-top: 0.8rem;
			}
		}
		.num {
			right: -0.68rem;
			background: url('../../assets/images/wallet/04.png') center no-repeat;
			background-size: 100%;
		}
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
</style>