<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
			<div slot="title" class="title">Referral Program</div>
			<i slot="right" alt="" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="top"></div>
			<div class="section1">
				<h2>Terms And Conditions</h2>
				<div class="line"></div>
				<p>
					&bull; The Referral Program is only valid on new users and sign ups on HappyEasyGo.com.
				</p>
				<p>
					&bull; The Email ID and/or phone number through which the friend signs up with HappyEasyGo.com, must not have been used for signing up earlier.
				</p>
				<p>
					&bull; The mobile phone number provided by the friend to receive the OTP must be an Indian mobile number as this program is not valid for users based out of India.
				</p>
				<p>
					&bull; You won’t get any rewards if your friends use someone else's referral link, even though you had referred them first. The last link used to register and book by your friend would be considered for the referral bonus.
				</p>
				<p>
					&bull; Total Rewards you earned through referral program will fall under our Happy Wallet Program.<br>
					<span class="yellow" @click="goWallet()">
						Know more about Happy Wallet Program. </span>
				</p>
				<!-- <p>
																																																																																					&bull; Happy Silver cash earned through referral program cannot 
																																																																																					   be withdrawn into any of the payment instruments like Bank 
																																																																																					   account, Credit Card, Debit Card etc.
																																																																																				</p> -->
			</div>
			<div class="section2">
				<p class="list" @click="showListA = !showListA">How many rewards can you earn through our Referral Program?</p>
				<ul v-show="showListA">
					<li>
						<p>&bull;
							<i class="rs">Rs.</i>500 Happy Silver will be credited into your Happy Wallet Account instantly for anyone who signs up on HappyEasyGo.com by your unique referral link.</p>
					</li>
					<li>
						<p>&bull;
							<i class="rs">Rs.</i>50 Happy Gold will be credited into your Happy Wallet Account When anyone that referred by you issues an order on HappyEasyGo.com and finished their flight. You won’t be credited if any cancellation before the travel date.</p>
					</li>
					<li>
						<p>&bull; There is no upper limits on total rewards of Happy Silver for Sign-up referring.</p>
					</li>
					<li>
						<p>&bull; There is no upper limits on total rewards of Happy Gold for Booking referring. But the total rewards from each person referrered is no more than
							<i class="rs">Rs.</i>300 Happy Gold.</p>
					</li>
				</ul>
				<p class="list" @click="showListB = !showListB">Validity and Conditions of Rewards</p>
				<ul v-show="showListB">
					<li>
						<p>&bull; Happy Wallet earned through Referral Program can be used on HappyEasyGo.com anytime.</p>
					</li>
					<li>
						<p>&bull; Validity of Happy Silver earned through Referral Program will be 90 days from the day it is credited.</p>
					</li>
					<li>
						<p>&bull; Usage of Happy Wallet T&Cs.
							<span class="fy" @click="$router.push('/happywallet')"> Click here</span>
						</p>
					</li>
					<li>
						<p>&bull; Usage conditions of Happy Wallet may be changed by HappyEasyGo at any point in time.</p>
					</li>
				</ul>
				<p class="list" @click="showListC = !showListC">Termination and change</p>
				<ul v-show="showListC">
					<li>
						<p>&bull; HappyEasyGo reserves all rights to change the amounts conferred under Referral Program at any time.</p>
					</li>
					<li>
						<p>&bull; HappyEasyGo may suspend or terminate the Referral Program or any user's ability to participate in the program at any time for any reason at their discretion.</p>
					</li>
					<li>
						<p>&bull; Happy Wallet earned as a result of fraudulent activities will be revoked and deemed invalid.</p>
					</li>
				</ul>
				<p class="list" @click="showListD = !showListD">Terms and Conditions Updating Pre-explaination</p>
				<ul v-show="showListD">
					<li>
						<p>&bull; HappyEasyGo reserves the right to amend these terms and conditions at any time without any prior notice.</p>
					</li>
					<li>
						<p>&bull; Modifications of these terms will be effective from the time they are updated in the Terms and Conditions section.</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import { CookieUtil } from '../../../models/utils'
export default {
	components: {
		headTop
	},
	data() {
		return {
			showListA: false,
			showListB: false,
			showListC: false,
			showListD: false
		}
	},
	methods: {
		goWallet() {
			var cu = new CookieUtil();
			if (!cu.hasItem('uuid')) {
				this.$router.push('/happywallet');
			} else {
				this.$router.push('/login');
			}
		}
	}
}
</script>
<style lang='less' scoped>
.wrapper {
	font-family: "PingFangSC";
	background: #ebebeb;
}

.header {
	// background: url("../../../assets/images/referral/info_head_top.png") top no-repeat;
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
	background: #fff url('../../../assets/images/referral/top_bg.png') top no-repeat;
	background-size: 100%;
}

.section1:before {
	content: '';
	display: table;
}

.section1,
.section2 {
	padding: 0.4rem 0.68rem;
	background-color: #fff;
	h2 {
		font-size: 0.597rem;
		height: 1.2rem;
		line-height: 1.2rem;
		color: #0b9d78;
	}
	.line {
		width: 12%;
		margin: 0 auto;
		border-bottom: 1px solid #0b9d78;
	}
	p {
		font-size: 0.512rem;
		color: #666;
		line-height: 0.769rem;
		text-align: left;
		padding: 0.4rem 0;
	}
	.fy {
		color: #ffad3d;
	}
}

.section1 {
	padding: 0 0.68rem 0.4rem 0.68rem;
}

.section2 {
	margin-top: 0.21rem;
	.list {
		background: url('../../../assets/images/referral/arrow_down.png') right center no-repeat; // background-size: 0.52rem;
		line-height: 1.2rem; // padding: 0.21rem 0;
		background-size: 0.5rem;
		border-bottom: 1px solid #d6d6d6;
	}
}
</style>