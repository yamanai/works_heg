<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
			<div slot="title" class="title">Recharge Program</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="top"></div>
			<div class="section1">
				<ul>
					<li class="flex content-start">
						<img :src="require('../../assets/images/recharge/icon-1.png')" alt="">
						<p>Valid from
							<span class="yellow">30 Aug 2017</span>
						</p>
					</li>
					<li class="flex content-start">
						<img :src="require('../../assets/images/recharge/icon-2.png')" alt="">
						<p>Applicable on
							<span class="yellow"> Domestic Flights</span>
						</p>
					</li>
					<li class="flex content-start">
						<img :src="require('../../assets/images/recharge/icon-3.png')" alt="">
						<p>Applicable to
							<span class="yellow">PC Site &amp; Moble Site</span>
						</p>
					</li>
					<li class="flex content-start align-items-center">
						<img :src="require('../../assets/images/recharge/icon-4.png')" alt="">
						<p>Valid till
							<span class="yellow">30 Oct 2017</span>
						</p>
					</li>
				</ul>
			</div>
			<div class="section2">
				<h2 class="yellow">Happy Gold Top-up Reward</h2>
				<p>
					Once you top up no less than
					<span class="sp-span">
						<span class="rs">Rs.</span>
						<strong>5000</strong>
					</span> to your Happy Gold account at HappyEasyGo in a single transaction, you’ll receive
					<span class="sp-span">
						<strong>extra 1%</strong>
					</span> of the total amount you recharged as a reward. There is no upper limit on the amount you can top up – The more you top up, the more reward amount you get for free.
				</p>
				<p>
					After the completion of your payment, the amount recharged and the 1% extra top-up reward will be available in your Happy Gold account.
				</p>
				<p>
					All Happy Gold e-cash balance can be redeemed when you book any flights via happyeasygo.com.
				</p>
				<div class="btn flex content-center">
					<a class="rn-btn" href="javascript:" @click="$router.push('/recharge')">Top-up Now</a>
				</div>
			</div>
			<div class="section3">
				<h2 class="sp">About the top up</h2>
				<div class="topUp">
					<h4>
						How to top up your Happy Gold account and get your 1% reward
					</h4>
					<div class="list flex flex-start align-items-center">
						<div class="ico">
							<img :src="require('../../assets/images/recharge/icon-6.png')" alt="">
						</div>
						<div class="text">
							<p>
								Sign up/sign in your account on Happyeasygo.com.
							</p>
						</div>
					</div>
					<div class="list flex flex-start align-items-center">
						<div class="ico">
							<img :src="require('../../assets/images/recharge/icon-7.png')" alt="">
						</div>
						<div class="text">
							<p>
								Choose Happy Wallet in your Account Center and select Happy Gold. </p>
						</div>
					</div>
					<div class="list flex flex-start align-items-center">
						<div class="ico">
							<img :src="require('../../assets/images/recharge/icon-8.png')" alt="">
						</div>
						<div class="text">
							<p>
								Click on Top-up Button and transfer money here.
							</p>
						</div>
					</div>
					<div class="list flex flex-start align-items-center">
						<div class="ico">
							<img :src="require('../../assets/images/recharge/icon-9.png')" alt="">
						</div>
						<div class="text">
							<p>
								Finish the payment process as it guides.
							</p>
						</div>
					</div>
					<div class="list flex flex-start align-items-center">
						<div class="ico">
							<img :src="require('../../assets/images/recharge/icon-10.png')" alt="">
						</div>
						<div class="text">
							<p>
								The reward credits will be added into your Happy Gold Account around 1 hour automatically after you successfully top up your account.
							</p>
						</div>
					</div>
					<div class="list flex flex-start align-items-center">
						<div class="ico">
							<img :src="require('../../assets/images/recharge/icon-15.png')" alt="">
						</div>
						<div class="text">
							<p>
								You’ll receive an email from our system when the above process is completed. </p>
						</div>
					</div>
					<div class="line"></div>
				</div>
			</div>
		</div>

		<div class="section4">
			<h2>Total Amount of Reward</h2>
			<p>
				There is no upper limit on the total amount of your reward as it only depends on the amount of money you top-upped. </p>
			<p>
				<strong>For example:</strong>if you top up 5,000 e-cash into your Happy Gold account, you will receive the reward of 50 e-cash. So if you top up 500,000 e-cash and you will receive 5000 e-cash of reward.
			</p>
		</div>
		<div class="section5">
			<h2 class="sp">FAQS</h2>
			<div class="list">
				<h2>What is Happy Gold?</h2>
				<div class="text">
					<p>
						Happy Gold is one kind of e-cash under our Happy Wallet program and it has no usage limits or expiry date. Know more.
					</p>
				</div>
			</div>
			<div class="list">
				<h2>What is the Happy Gold Top-up Reward?</h2>
				<div class="text">
					<p>
						The Happy Gold Top-up Reward is an award scheme run by HappyEasyGo in order to reward our users who top-up their account at HappyEasyGo.com. This scheme starts from 30 Aug 2017 to 30 Sep 2017
					</p>
				</div>
			</div>
			<div class="list">
				<h2> How can I get the top-up reward?</h2>
				<div class="text">
					<p>
						Once you top up your account through Happy Gold and you’ll get 1% extra points automatically recharged into your Happy Gold Account.
					</p>
				</div>
			</div>
			<div class="list">
				<h2>How can I use the top-up reward?</h2>
				<div class="text">
					<p>
						Your top-up reward has been included in your balance of Happy Gold account. The reward is used just as your own credits when you book any flights via Happyeasygo.com.
					</p>
				</div>
			</div>
			<div class="list">
				<h2>When will the top-up reward be due?</h2>
				<div class="text">
					<p>
						It will never expire until you use it up.
					</p>
				</div>
			</div>
			<div class="list">
				<h2> Why doesn’t the money I recharged show in my account ?</h2>
				<div class="text">
					<p>
						Because there is some time difference on your bank transferring the money to HappyEasyGo bank account. Once HappyEasyGo bank account receives your money and we’re in sure of your payment, we will send you the confirmation email immediately. Therefore, the total value of your account will show up in no more than 1 hour.
					</p>
				</div>
			</div>
		</div>

		<div class="terms">
			<h2 class="sp">Terms and Conditions</h2>
			<div class="list">
				<div class="text">
					<p>
						The Happy Gold Top-up Reward Program is an award scheme run by HappyEasyGo in order to reward those who top-ups their Happy Gold Account at HappyEasyGo.com. This scheme starts from 30th Aug 2017 to 30th Sep 2017. </p>
				</div>
			</div>
			<div class="list">
				<div class="text">
					<p>
						Happy Gold is applicable for HappyEasyGo Registered Users only. It is mandatory to login through your Facebook account (or fill the sign-up form) to book the flight or top-up your account. Of course, your personal details would be absolutely safe with HappyEasyGo. </p>
				</div>
			</div>
			<div class="list">
				<div class="text">
					<p>
						If you are not a HappyEasyGo user, you will need to create an account by signing up
						<span @click="$router.push('/login')">
							<strong class="yellow">here</strong>
						</span>. </p>
				</div>
			</div>
			<div class="list">
				<div class="text">
					<p>
						Top-up Reward will be given against each unique registered user only when he/she has recharged his/her account. </p>
				</div>
			</div>
			<div class="list">
				<div class="text">
					<p>
						HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of these terms and conditions, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice. </p>
				</div>
			</div>
			<div class="list">
				<div class="text">
					<p>
						HappyEasyGo has the sole right to decide on the amount of top-up Reward and the eligibility for the HappyEasyGo Happy Gold top-up Rewards Program, the sole right to alter and/or amend the terms and conditions of the HappyEasyGo Happy Gold top-up Rewards Program and reward amount at any time and also reserves the right to cancel a reward in case booking details are found to be fraudulent. </p>
				</div>
			</div>
			<div class="list">
				<div class="text">
					<p>
						HappyEasyGo may contact you for promotional activities or to get your feedback during the course of the Happy Gold Top-up Reward Program. </p>
				</div>
			</div>
			<div class="list">
				<div class="text">
					<p>
						All other standard terms and conditions available at HappyEasyGo.com shall apply. </p>
				</div>
			</div>
			<div class="list">
				<div class="text">
					<p>
						Any disputes arising out of this offer shall be subject to the exclusive jurisdiction of competent courts in Gurgaon, Haryana, India. </p>
				</div>
			</div>
		</div>
		<div class="share" v-show='false'>
			<h2 class="yellow">Share this Offer</h2>
			<div class="ico flex space-between">
				<img :src="require('../../assets/images/cashback/icon-12.png')" alt="">
				<img :src="require('../../assets/images/cashback/icon-13.png')" alt="">
				<img :src="require('../../assets/images/cashback/icon-14.png')" alt="">
			</div>
			<div class="input-group">
				<div class="list flex space-between">
					<input type="text" placeholder="Enter your email">
					<a href="javascript:">Send</a>
				</div>
				<div class="list flex space-between">
					<input type="text" placeholder="https://www.happyeasygo.com/">
					<a href="javascript:">Copy</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue'
export default {
	components: {
		headTop
	}
}
</script>
<style lang='less' scoped>
.sp {
	color: #0b9d78;
}

.wrapper {
	font-family: "PingFangSC";
}

.header {
	background: #0b9d78;
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
	background: #fff url('../../assets/images/recharge/M-topup.png') center no-repeat;
	background-size: 100% 9.8rem;
}

.section1 {
	padding: 0.4rem 0.68rem 1rem;
	background-color: #fff;
	ul li {
		padding: 0.4rem 0;
		border-bottom: 1px solid #ccc;
		img {
			width: 0.769rem;
			height: 0.769rem;
		}
		p {
			font-size: 0.68rem;
			color: #999;
			padding-left: 0.4rem;
		}
	}
}

.section2 {
	padding: 0.68rem;
	margin-top: 0.4rem;
	background-color: #fff;
	h2 {
		font-size: 0.6rem;
	}
	p {
		font-size: 0.52rem;
		color: #999;
		text-align: left;
		line-height: 0.769rem;
		margin: 0.4rem 0;
	}
	.sp-span {

		color: #ffad3d;
	}

	.font-bold {
		font-weight: 700;
		color: #0b9d78;
	}
	.rn-btn {
		font-weight: 700;
	}
}

.section3 {
	position: relative;
	background-color: #fff;
	padding: 0.68rem;
	h2 {
		font-size: 0.6rem;
		padding: 0.6rem 0;
	}
	h4 {
		font-size: 0.6rem;
		color: #666;
		font-weight: normal;
		text-align: left;
		padding: 0.2rem 0;
	}
	.line {
		width: 1px;
		background-color: #ffa033;
		position: absolute;
		left: 0.66rem;
		top: 2rem;
		z-index: 1;
	}
	.topUp {
		position: relative;
		.line {
			height: 13.3rem;
		}
	}
	.rewards {
		position: relative;
		.line {
			height: 3rem;
		}
	}
	.list {
		padding: 0.4rem 0;
		.ico {
			z-index: 2;
			img {
				width: 1.32rem;
			}
		}
		.text {
			p {
				font-size: 0.52rem;
				color: #999;
				text-align: left;
				padding-left: 0.4rem;
				line-height: 0.769rem;
			}
		}
	}
}

.section4 {
	padding: 0.6rem;
	background-color: #fff;
	h2 {
		font-size: 0.68rem;
		color: #666;
		text-align: left;
		padding: 0.4rem 0;
	}
	p {
		font-size: 0.52rem;
		color: #999;
		line-height: 0.769rem;
		margin: 0.4rem 0;
		text-align: left;
	}
}

.section5 {
	padding: 0 0.68rem 0.68rem;
	background-color: #fff;
	margin-top: 0.4rem;
	h2 {
		font-size: 0.6rem;
		padding: 0.68rem 0;
	}
	.list {
		h2 {
			text-align: left;
			padding: 0.4rem 0 0.4rem 1rem;
			color: #666;
			background: url('../../assets/images/recharge/icon-11.png') left center no-repeat;
			background-size: 0.8rem;
		}
		.text {
			padding: 0.68rem;
			background-color: #fbfbfb;
			p {
				font-size: 0.52rem;
				color: #999;
				line-height: 0.769rem;
				text-align: left;
			}
		}
	}
}

.btn {
	background-color: #fff;
	padding: 1rem 0;
	a {
		height: 1.2rem;
		line-height: 1.2rem;
		border: 1px solid #ffa234;
		font-size: 0.52rem;
		color: #ffa234;
		text-align: center;
		border-radius: 0.2rem;
		padding: 0 0.2rem;
	}
}

.terms {
	margin-top: 0.4rem;
	padding: 0 0.68rem;
	background-color: #fff;
	h2 {
		font-size: 0.6rem;
		height: 2rem;
		line-height: 2rem;
		background: url('../../assets/images/recharge/Cashback-app_39.png') right center no-repeat;
		background-size: 0.68rem;
	}
	.list {
		h2 {
			text-align: left;
			padding: 0.4rem 0 0.4rem 1rem;
			color: #666;
			background: url('../../assets/images/recharge/icon-11.png') left center no-repeat;
			background-size: 0.8rem;
		}
		.text {
			padding: 0.68rem;
			background-color: #fbfbfb;
			p {
				font-size: 0.52rem;
				color: #999;
				line-height: 0.769rem;
				text-align: left;
			}
		}
	}
}

.share {
	padding: 0.68rem;
	margin-top: 0.4rem;
	background-color: #fff;
	h2 {
		font-size: 0.6rem;
		height: 2rem;
		line-height: 2rem;
	}
	.ico {
		padding: 0 2rem;
		img {
			width: 1.6rem;
			height: 1.6rem;
		}
	}
	.input-group {
		padding: 0.6rem 0 1rem;
		.list {
			margin-top: 0.4rem;
			input {
				width: 80%;
				text-indent: 0.4rem;
				height: 1.2rem;
				line-height: 1.2rem;
				font-size: 0.6rem;
				border: 1px solid #eee;
			}
			a {
				display: block;
				width: 20%;
				height: 1.2rem;
				line-height: 1.2rem;
				text-align: center;
				background-color: #ffa033;
				color: #fff;
				font-size: 0.6rem;
			}
		}
	}
}

::-webkit-input-placeholder {
	color: #ccc;
	font-size: 0.6rem;
	padding-left: 0.2rem
}

::-moz-placeholder {
	color: #ccc;
	font-size: 0.6rem;
	padding-left: 0.2rem
}

:-moz-placeholder {
	color: #ccc;
	font-size: 0.6rem;
	padding-left: 0.2rem
}
</style>