<template>
	<div class="wrapper">
		<head-top>
			<i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
			<div slot="title" class="title">Payment Confirm</div>
			<img slot="right" :src="require('../../assets/images/flight-prev.png')" class="placeholder">
		</head-top>
		<div class="container">
			<div class="content">
				<div class="fare">
					<h2 class="title">Fare break up</h2>
					<div class="list-wrapper">
						<div class="fare-cont">
							<div class="list flex space-between">
								<span>Base Fare</span>
								<span>
									<i class="rs">Rs.</i>{{travelFee | formatDate}}</span>
							</div>
							<div class="list flex space-between">
								<span>Taxes&amp;Fees</span>
								<span>
									<i class="rs">Rs.</i> {{taxFee | formatDate}}</span>
							</div>
							<div class="list flex space-between">
								<span id>Customer Prom.</span>
								<span v-if="ifCashback">
									<i class="rs">Rs.</i>0
								</span>
								<span v-else>
									<i class="rs">Rs.</i>-{{discount | formatDate}}
								</span>
							</div>
							<div class="list flex space-between">
								<span>Convenience Fee</span>
								<span>
									<i class="rs">Rs.</i> {{flightOrder.serviceFee | formatDate}}</span>
							</div>
							<div class="total flex space-between">
								<span>Grand Total</span>
								<!-- <span v-if="ifCashback" class="price">
																																																																																																																														<i class="rs">Rs.</i> {{totalCount - goldVal | formatDate}}
																																																																																																																													</span>
																																																																																																																													<span v-else class="price">
																																																																																																																														<i class="rs">Rs.</i> {{totalCount - discount - goldVal | formatDate}}
																																																																																																																													</span> -->
								<span class="price">
									<i class="rs">Rs.</i> {{grandTotal() | formatDate}}
								</span>
							</div>
						</div>
						<p>By booking with Happy Easy go,you agreen to our
							<span @click="$router.push('/agreement')">T&amp;C</span>
						</p>
						<div class="cashback-tips" v-if="ifCashback">
							<div class="top-line">
								<div class="line">
									<img src="../../assets/images/roundtrip/cashback.png" alt="cashback-icon">
								</div>
							</div>
							<p>
								1.Invoice will be issued as per the displayed price of
								<span class="rs">Rs.</span>
								<span>{{totaltips}}</span> for your convenience.</p>
							<p>2.Cashback amount will be transferred to your wallet instantly.</p>
							<p>3.Cashback amount will be deducted if you cancel your order.</p>
							<!-- <i class="co iconfont icon-prompt"></i>Happy Gold can be used on your booking at our site, there is no validity and limitation</p> -->
							<p>4.Cashback validity is limitless and can be used any time during purchase of your tickets.</p>
						</div>
						<div class="offers-group" v-if="isLogin">
							<div class="radio-group-sp align-items-center" @click="radio3">
								<!-- <a class="recharge-tips" @click="$router.push('/recharge')">Top up now and get extra 1% discount</a> -->
								<div class="ug flex content-start align-items-center" v-if="this.sesessionStorageUser.payPassword != ''">
									<div class="round1">
										<div :class="{round2:isSelect}"></div>
									</div>
									<p :class="{yellow:isSelect}">Use my Happy Gold
										<span>Rs.{{goldTotal}}</span>
									</p>
								</div>
								<div class="log" v-else>
									<p>you need to
										<a href="javascript:;" @click="$router.push('/security')">reset</a>your payPassword</p>
								</div>

							</div>
							<div class="input-group flex content-start align-items-center" v-show="isSelect">
								<input type="number" ref="gold" v-model.number="goldVal">
								<p>Please input happygold amount here</p>
							</div>
							<div class="input-group flex content-start align-items-center" v-show="isSelect">
								<input type="password" placeholder="Payment password" v-model="password">
							</div>
							<p v-show="isSelect">Know more about Happy Gold</p>
							<span class="fp" v-show="isSelect" @click="$router.push('/forgotpay')">forgot password?</span>
						</div>

						<div class="otp-info" v-show="isSelect&&!needOtp2rd">
							<div class="phone flex space-between">
								<input type="number" placeholder="your phone number" v-model.number="rePhone" v-if="!hasPhone">
								<span v-else>Tel: {{userPhone}}
								</span>
								<a class="send" href="javascript:;" @click="getOtp()">
									{{submit}}
								</a>
							</div>
							<div class="form-group">
								<input type="text" placeholder="please input Otp code" v-model="otp">
							</div>
						</div>

						<div class="done">
							<button class="btn" id="validatInfo" @click="validatInfo">Make payment</button>
							<mt-button class="btn" id="creditPay" type="primary" v-show='false'>Make Payment</mt-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import { FlightOrder, OnewayOrder, RoundTripOrder } from '../../models/flightorder'
import { Toast, Indicator } from 'mint-ui';
import { GetFlightOrderUtil, CookieUtil } from '../../models/utils';
import { User } from 'models/user';
import { DomainManager } from '../../config/DomainManager';
export default {
	components: {
		headTop
	},
	data() {
		return {
			isSelect: false,
			goldVal: 0,
			goldTotal: 0,
			password: '',
			ifCashback: false,
			needOtp: '',
			userPhone: '',
			needOtp2rd: false,
			otp: '',
			submit: 'Send',
			hasPhone: false,
			rePhone: ''
		}
	},
	methods: {
		getOtp() {
			var self = this;
			if (self.submit != 'Send') {
				return false;
			}
			var phone = '';

			if (!this.hasPhone) {
				phone = 'phone=' + this.rePhone;
				var pl = this.rePhone + '';
				if (pl.length < 10) {
					Toast('please input correct phone number');
					return false;
				}
			}

			this.flightOrder.getGSOtp(this, phone).then(res => {
				if (res.code == 2) {
					Toast({
						message: res.msg,
						duration: 2000
					})
					return false;
				}
				if (res.success) {
					var btn = document.querySelector('.send');
					btn.style.backgroundColor = '#ccc';
					if (self.submit == 'Send') {
						self.submit = 60
					}

					self.submit = res.lastSendTime;

					var stop = setInterval(function() {
						if (self.submit > 1) {
							self.submit--;
						} else {
							clearInterval(stop);
							btn.style.backgroundColor = '#ffa033';
							self.submit = 'Send';
						}
					}, 1000)
				} else {
					Toast('error')
				}
			})


		},
		validatInfo() {
			let self = this;
			let flightOrder = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)

			if (this.needOtp) {
				if (this.otp == '') {
					Toast('Please input Otp code')
					return false;
				}
			}

			if (this.isSelect && this.goldVal > 0) {
				if (self.password.length == 0) {
					Toast('please input your password');
					return false;
				} else {
					var info = {
						'4': {
							tradeType: 4,
							tradeAmount: self.goldVal,
							paymentPass: self.password,
						}
					};
					var jinfo = JSON.stringify(info);
					sessionStorage.setItem('goldInfo', jinfo);
					this.needOtp = true;
				}
			} else {
				sessionStorage.removeItem('goldInfo');
			}
			var pl = this.rePhone + '';
			if (this.isSelect && !this.hasPhone) {
				if (pl.length < 10) {
					Toast({
						message: 'Please input your correct phone number',
						duration: 2000
					})
					return false;
				}
			}

			Indicator.open({ spinnerType: 'fading-circle' });

			document.getElementById('creditPay').click();
			//Monitor code end
			sessionStorage.setItem("isPayment", true);
			flightOrder.otp = self.otp;
			self.hasPhone ? '' : flightOrder.phone = self.rePhone + '';
			flightOrder.requestPaymentOrderInfo(self).then((res) => {
				if (res.code == 0) {
					window.location.href = DomainManager.getSearchOrderResultPageUrl(flightOrder.orderNumber);
					sessionStorage.removeItem('goldInfo');
					sessionStorage.removeItem('silverInfo');
				} else if (res.code == 2) {
					Indicator.close();
					Toast(res.msg)
				} else if (res.code == 5) {
					Indicator.close();
					Toast({
						message: 'Sorry,the order has expired.',
						duration: 2000
					})
					this.$router.go(-1);
				} else {
					flightOrder.makePayment(window, res.msg, sessionStorage);
				}
				if (!res.success) {
					Indicator.close()
					// Toast('error')
				}
			}, (err) => {
				Indicator.close()
			})
		},
		radio3() {
			this.isSelect = !this.isSelect;
			if (this.isSelect) {
				if (this.grandTotalNoGold <= this.goldTotal) {
					this.goldVal = this.grandTotalNoGold;
				} else if (this.grandTotalNoGold > this.goldTotal) {
					this.goldVal = this.goldTotal;
				}
			}
		},
		grandTotal() {
			if (this.isSelect) {
				return this.ifCashback ? this.totalCount - this.goldVal : this.totalCount - this.discount - this.goldVal;
			} else {
				return this.ifCashback ? this.totalCount : this.totalCount - this.discount;
			}
		}
	},
	watch: {
		goldVal(val) {
			this.goldVal = Math.min.apply(null, [val, (this.totalCount - this.discount), this.goldTotal]);
		}
	},
	computed: {
		grandTotalNoGold() {
			return this.ifCashback ? this.totalCount : this.totalCount - this.discount;
		},
		isLogin() {
			return Boolean((new CookieUtil()).getItem('uuid'));
		},
		totalCount: {
			get: function() {
				let order = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
				let totalPrice = this.travelFee + this.taxFee;
				totalPrice += order.serviceFee;
				order.totalPrice = totalPrice;
				return totalPrice;
			}
		},
		travelFee() {
			let p = 0
			let f = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
			if (f instanceof (OnewayOrder)) {

				if (this.ifCashback) {
					p = f.departFlight.flightInfoBack.fee.obfp;
				} else {
					p = f.departFlight.flightInfoBack.fee.obfp;
				}
			} else if (f instanceof (RoundTripOrder)) {
				p = f.departFlight.flightInfoBack.fee.obfp + f.returnFlight.flightInfoBack.fee.obfp;
			}

			return p
		},
		taxFee() {
			let p = 0
			let f = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
			if (f instanceof (OnewayOrder)) {
				p = f.departFlight.ogst;
			} else if (f instanceof (RoundTripOrder)) {
				p = f.departFlight.ogst + f.returnFlight.ogst;
			}
			return p
		},
		discount() {
			let p = 0
			let f = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
			let dd = f.departFlight.obfp + f.departFlight.ogst - f.departFlight.bfp - f.departFlight.gst;

			if (f instanceof (OnewayOrder)) {
				if (this.ifCashback) {
					p = 0;
				} else {
					p = f.departFlight.flightInfoBack.fee.obfp + f.departFlight.flightInfoBack.fee.ogst - f.departFlight.flightInfoBack.fee.bfp - f.departFlight.flightInfoBack.fee.gst + f.departFlight.couponDiscount;
				}
			} else if (f instanceof (RoundTripOrder)) {
				if (this.ifCashback) {
					p = 0;
				} else {
					p = f.departFlight.flightInfoBack.fee.obfp + f.departFlight.flightInfoBack.fee.ogst - f.departFlight.flightInfoBack.fee.bfp - f.departFlight.flightInfoBack.fee.gst + f.returnFlight.flightInfoBack.fee.obfp + f.returnFlight.flightInfoBack.fee.ogst - f.returnFlight.flightInfoBack.fee.bfp - f.returnFlight.flightInfoBack.fee.gst + f.departFlight.couponDiscount + f.returnFlight.couponDiscount + f.departFlight.airlineDIS + f.returnFlight.airlineDIS;

				}
			}
			return p
		},
		discountCash() {
			let p = 0
			let f = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
			let dd = f.departFlight.obfp + f.departFlight.ogst - f.departFlight.bfp - f.departFlight.gst;
			if (f instanceof (OnewayOrder)) {
				p = f.departFlight.obfp + f.departFlight.ogst - f.departFlight.bfp - f.departFlight.gst + f.departFlight.couponDiscount + f.departFlight.airlineDIS;
			} else if (f instanceof (RoundTripOrder)) {
				p = f.departFlight.obfp + f.departFlight.ogst - f.departFlight.bfp - f.departFlight.gst + f.returnFlight.obfp + f.returnFlight.ogst - f.returnFlight.bfp - f.returnFlight.gst + f.departFlight.couponDiscount + f.returnFlight.couponDiscount + f.departFlight.airlineDIS + f.returnFlight.airlineDIS;
			}
			return p
		},
		flightOrder() {
			let order = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
			return order
		},
		cashtips() {
			if (!this.flightOrder.returnFlight) {
				return Math.round(this.flightOrder.departFlight.commonDiscount * 0.82)
			} else {
				return Math.round(this.flightOrder.departFlight.commonDiscount * 0.82 + this.flightOrder.returnFlight.commonDiscount * 0.82)
			}
		},
		totaltips() {
			if (this.ifCashback) {
				return this.totalCount
			} else {
				return this.totalCount - this.discount
			}
		},
		sesessionStorageUser() {
			if (sessionStorage.user) {
				return JSON.parse(sessionStorage.user);
			} else {
				return false;
			}
		}
	},
	mounted() {
		let self = this;
		let ifReload = this.$store.state;
		if (!sessionStorage.order || ifReload.flihgt.allFlight == undefined) {
			Toast({
				message: 'infomation expired',
			})
			setTimeout(function() {
				self.$router.push('/home')
			}, 2000)
		}
	},
	created() {
		let self = this;
		if (this.isLogin) {
			User.getGold(self).then(res => {
				self.goldTotal = Number(res.happyGoldBalance);
			}).catch(err => {

			})
		}


		if (sessionStorage.user) {
			this.userPhone = JSON.parse(sessionStorage.user).cellphone;
		}

		if (sessionStorage.needOtp) {
			this.needOtp2rd = JSON.parse(sessionStorage.needOtp);
		}

		if (sessionStorage.hasPhone) {
			this.hasPhone = JSON.parse(sessionStorage.hasPhone);
		}

		// if (JSON.parse(sessionStorage.returnCash)) {
		// 	this.ifCashback = true;
		// } else {
		// 	this.ifCashback = false;
		// }
		JSON.parse(sessionStorage.returnCash) ? this.ifCashback = true : this.ifCashback = false;


	}
}
</script>
<style lang="less" scoped>
@import "~assets/less/theme.less";
.selected {
	border-color: #ffad3d !important;
	background: #ffad3d url("../../assets/images/sure.png") center no-repeat;
	background-size: contain;
}

.header {
	background: #17a27f;
	.title {
		line-height: 2.04rem;
		font-size: 0.768rem;
		color: #fff;
	}
	.placeholder {
		opacity: 0;
	}
}

.content {
	padding-top: 2.04rem;
	.list-wrapper {
		padding: 0 0.64rem;
	}
}

.fare {
	.title {
		font-size: 0.768rem;
		color: #666;
		text-align: left;
		padding: 0.64rem;
		border-bottom: 1px solid #ccc;
	}
	.fare-cont {
		background-color: #fff;
		border-radius: 0.4rem;
		padding: 0.4rem;
		.list {
			border-bottom: 1px solid #ccc;
		}
		.list,
		.total {
			font-size: 0.6rem;
			color: #666;
			height: 1.4rem;
			line-height: 1.4rem;
			span {
				display: block;
				text-align: left;
			}
		}
		.total {
			font-size: 0.85rem;
			color: #333;
			padding: 0.2rem 0rem;
			.price {
				color: red;
				font-size: 0.85rem;
			}
		}
	}
}

.cashback-tips {
	text-align: left;
	margin-top: 0.5rem;
	border-bottom: 1px solid #ccc;
	padding-bottom: 0.5rem;
	.top-line {
		margin: 0.7rem 0;
		.line {
			border-top: 1px solid #ccc;
			position: relative;
			width: 100%;
			img {
				display: block;
				position: absolute;
				top: -0.52rem;
				height: 1rem;
				right: 50%;
				margin-right: -1.65rem;
			}
		}
	}
	.co {
		color: #ffad3d;
	}
}

.offers-group {
	font-size: 0.6rem;
	color: #ccc;
	text-align: left;
	background-color: #fff;
	border-radius: 0.2rem;
	padding: 0.426rem;
	.radio-group-sp {
		.recharge-tips {
			text-align: center;
			margin-bottom: 0.3rem;
			display: block;
			padding: 0.3rem;
			background: #17a27f;
			color: #fff;
			border-radius: 4px;
		}
		.ug {
			.round1 {
				width: 0.6rem;
				height: 0.6rem;
				border: 1px solid #ccc;
				position: relative;
				margin-right: 0.3rem;
				.round2 {
					width: 70%;
					height: 70%;
					background-color: #ffa033;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translateY(-50%) translateX(-50%);
					-webkit-transform: translateY(-50%) translateX(-50%);
				}
			}
		}
		.log {
			width: 100%;
			text-align: center;
			p {
				a {
					color: #17a27f;
					padding-right: 0.15rem;
				}
			}
		}
	}
	.input-group {
		margin-bottom: 0.3rem;
		input {
			display: block;
			box-sizing: border-box;
			height: 1.75rem;
			width: 50%;
			font-size: 0.68rem;
			padding: 0.3rem 0.3rem;
			border: 1px solid #ccc;
			border-radius: 0;
			text-indent: 0;
		}
		p {
			width: 50%;
			padding-left: 0.5rem;
			box-sizing: border-box;
		}
		.yellowborder {
			border: 1px solid #ffa033;
		}
		a {
			box-sizing: border-box;
			height: 1.75rem;
			line-height: 1.75rem;
			width: 4.05rem;
			font-size: 0.68rem;
			/*padding:0.3rem 0;*/
			text-align: center;
			color: #fff;
			display: block;
		}
		.cheked {
			background-color: #ffa033;
		}
		.disable {
			background-color: #ccc;
		}
	}
	.fp {
		color: #17a27f;
	}
}

.otp-info {
	padding: 0 0.64rem;
	.phone {
		text-align: left;
		margin-bottom: 0.64rem;
		input {
			width: 100%;
			font-size: 0.68rem;
			line-height: 1.49rem;
			border: 1px solid #ddd;
			box-sizing: border-box;
			padding: 0 0.32rem;
			border-right: none;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
		span {
			width: 70%;
			font-size: 0.68rem;
			line-height: 1.49rem;
		}
		a {
			display: block;
			text-align: center;
			width: 30%;
			line-height: 1.49rem;
			background: #ffa033;
			color: #fff;
			font-size: 0.68rem;
		}
	}
	.form-group {
		height: 1.49rem;
		margin-bottom: 0.64rem;
		input {
			display: block;
			height: 1.49rem;
			line-height: 1.49rem;
			width: 100%;
			border: 1px solid #ddd;
			padding: 0 0.32rem;
			font-size: 0.68rem;
			box-sizing: border-box;
		}
	}
}

.payment-type {
	padding: 0 0.64rem;
	.form-group {
		input {
			border: 1px solid #ccc;
		}
	}
}

.radio-group {
	padding: 0.426rem 0;
	.round1 {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		border: 1px solid #ccc;
		position: relative;
		margin-right: 0.3rem;
		.round2 {
			width: 0.3rem;
			height: 0.3rem;
			border-radius: 50%;
			background-color: #ffa033;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateY(-50%) translateX(-50%);
			-webkit-transform: translateY(-50%) translateX(-50%);
		}
	}
}

p {
	font-size: 0.5rem;
	color: #666;
	line-height: 1rem;
	span {
		color: #0bb78f;
	}
}

.done {
	.btn {
		width: 100%;
		font-size: 0.768rem;
		color: #fff;
		line-height: 1.87rem;
		border-radius: 4px;
		background-color: #ffad3d;
		display: block;
		box-sizing: border-box;
		margin: 0.3rem 0;
	}
}
</style>
