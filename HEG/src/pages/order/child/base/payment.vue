<template>
	<div class="payment" :class="{timeout:!ispasetime}">
		<div class="content flex space-between">
			<div class="total">
				<span class="ta">Total booking amount</span>
				<!-- <div class="amount"> -->
				<span class="rs cl">Rs.</span>
				<span class="cl">{{fee.pp - goldVal}}</span>
				<!-- </div> -->
			</div>
			<div class="makePayment">
				<a class="btn" id="creditPay" v-show="ispasetime" @click="payment">Make payment</a>
				<a class="btn" v-show="!ispasetime">Make payment</a>
			</div>
		</div>
	</div>
</template>
<script>
import { FlightOrder } from '../../../../models/flightorder'
import { Toast, Indicator } from 'mint-ui';
import { DomainManager } from '../../../../config/DomainManager'

export default {
	props: {
		orders: {
			type: Array
		},
		ispasetime: {
			type: Boolean,
			default: true
		},
		isSelect: {
			type: Boolean,
			default: false
		},
		goldVal: {
			type: Number,
			default: 0
		},
		fee: { type: Object },
		password: {
		},
		otp: {
			type: [String, Number]
		},
		phone: {
			type: [String, Number]
		},
		orderDetail: {
			type: Object
		}
	},
	data() {
		return {
			ifPay: '',
			test: false
		}
	},
	computed: {
		total() {
			let count = 0;
			if (this.orders != null) {
				for (let el of this.orders) {
					count += el.price;
				}
			}
			return count;
		},
		showPay() {
			return this.ifPay == 107 ? true : false;
		}
	},
	methods: {
		payment() {
			var pl = this.phone + '';
			if (this.isSelect && this.goldVal > 0) {
				if (this.password.length == 0) {
					Toast('please input your password')
					return false;
				} else if (this.otp == '') {
					Toast('please input your otp code')
					return false
				} else if (!this.orderDetail.hasPhone) {
					if (pl.length < 10) {
						Toast('please input your correct phone number')
						return false
					}
				} else {
					var info = {
						'4': {
							tradeType: 4,
							tradeAmount: this.goldVal,
							paymentPass: this.password,
						}
					};
					var Ginfo = JSON.stringify(info);
					sessionStorage.setItem('goldInfo', Ginfo);
				}
			} else {
				sessionStorage.removeItem('goldInfo');
			}

			Indicator.open({
				spinnerType: 'fading-circle'
			});
			let flightOrder = new FlightOrder();
			flightOrder.orderNumber = sessionStorage.getItem('orderId');
			flightOrder.otp = this.otp;
			this.orderDetail.hasPhone ? '' : flightOrder.phone = this.phone + '';
			flightOrder.requestPaymentOrderInfo(this).then((res) => {
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
					return false
				} else {
					flightOrder.makePayment(window, res.msg, sessionStorage);
				}
				if (!res.success) {
					Indicator.close()
					Toast(res.msg)
					debugger
				}
			}, (err) => {
				console.log(err)

				Indicator.close()
			})
		}
	},
	mounted() {
		this.ifPay = this.orders[0].ticketsinfo[0][0].status;
	}
}
</script>
<style lang="less" scoped>
.payment {
	width: 100%;
	background-color: #0b9d78; // padding:0.4rem 0.2rem;
	box-sizing: border-box;
	.content {
		padding: 0.3rem 0.4rem;
		justify-content: space-between;
		align-items: center;
	}
	.total {
		// line-height: 1.5;
		text-align: left;
		span {
			font-size: 0.52rem;
			color: #fff;
		}
		.ta {
			display: block;
		}
		.cl {
			margin: 0;
			color: #ffad3d;
			font-size: 0.85rem;
		}
		.amount {
			font-size: 0.68rem;
			font-weight: bold;
			color: #ffad3d;
			text-align: left;
			margin-top: 0.1rem;
			span {
				color: #ffad3d;
			}
		}
	}
	.makePayment {
		.btn {
			display: block;
			font-size: 0.6rem;
			color: #fff;
			padding: 0.4rem 0.4rem 0.4rem 1.2rem;
			border-radius: 2px;
			background: #ffad3d url('../../../../assets/images/order/paid_07.png') 0.4rem center no-repeat;
			background-size: 0.68rem;
		}
	}
}

.timeout {
	background-color: #999!important;
	display: none;
}
</style>