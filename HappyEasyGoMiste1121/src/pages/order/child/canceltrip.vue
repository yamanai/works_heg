<template>
	<div class="wrapper">
		<head-top class="head">
			<i slot="left" class="iconfont icon-back" @click="$router.go(-1)"></i>
			<div slot="title" class="title">
				Cancel
			</div>
			<i class="sp iconfont icon-back" slot="right"></i>
		</head-top>
		<div class="container">
			<div class="modal" v-show="showOTP"></div>
			<div class="otp-option" v-show="showOTP">
				<div class="content">
					<div class="top flex content-end">
						<div class="close" @click="showOTP=!showOTP">
							<img src="../../../assets/images/cancel/close.jpg" alt="">
						</div>
					</div>
					<div class="text">
						<p>Your booking will be cancelled and the refundable amount is 0/per passenger. Our system will cancel your booking automatically regardless of the refundable amount. Are you sure to proceed?</p>
					</div>
					<div class="otp">
						<div class="msg flex space-between">
							<span>Mobile: {{orders[orderIndex].contactMob}}
							</span>
							<a class="send" @click="getOTP()">{{submit}}</a>
						</div>
						<div class="form-group">
							<input type="text" placeholder="Enter your OTP code" v-model="otp">
						</div>
					</div>
					<a class="btn" @click="Cancellation()">OK</a>
				</div>
			</div>
			<div class="fi-wrapper">
				<div class="flightInfo" v-for="(item,index) in orders ">
					<div class="tripID ">
						<h3>Trip ID: {{item.id}}</h3>
					</div>
					<div class="flight-detail ">
						<div v-for="(obj,i) in item.voyageinfo ">
							<div class="status " :class="{upcoming:item.ticketsinfo[0][0].status==105, notpay:item.ticketsinfo[0][0].status==107} ">
								{{getOrderDetail(item.ticketsinfo[0][0].status)}}
							</div>
							<div class="title flex content-start " :class="{pt:i>0}">
								<img :src="ico[obj.fn.slice(0,2)]" alt="">
								<h2>{{obj.an}} {{obj.fn.slice(0,2)}} {{obj.fn.slice(2)}}</h2>
							</div>
							<div class="flight-date flex space-between">
								<div class="from">
									<h2>
										<span class="city">{{obj.ds}}</span>
									</h2>
									<h2>
										{{obj.dt.split(' ')[1]}}
									</h2>
									<h2>{{getDRTime(obj.dt)}}</h2>
									<h1>
									</h1>
								</div>
								<div class="duration space-between">
									<img class="arrow" src="../../../assets/images/payment/pay-arrow.png" alt="arrow">
									<div class="time">
										<span class="timeinfo">{{obj.wdt}}</span>
									</div>
								</div>
								<div class="to">
									<h2>
										<span class="city">{{obj.as}}</span>
									</h2>
									<h2>
										{{obj.at.split(' ')[1]}}
									</h2>
									<h2>{{getDRTime(obj.at)}}</h2>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

			<div class="line"></div>
			<div class="options">
				<div class="title">Choose reason for cancellation</div>
				<div class="optionDetail">
					<ul>
						<li class="flex content-start align-items-center">
							<label for=""></label>
							<input type="radio" name="reason" id="" value="0" v-model="reason" checked>My plan changed
						</li>
						<li class="flex content-start align-items-center">
							<label for=""></label>
							<input type="radio" name="reason" id="" value="1" v-model="reason">I cancelled directly with airline
						</li>
						<li class="flex content-start align-items-center">
							<label for=""></label>
							<input type="radio" name="reason" id="" value="2" v-model="reason">Flight was cancelled by airline
						</li>
						<li class="flex content-start align-items-center">
							<label for=""></label>
							<input type="radio" name="reason" id="" value="3" v-model="reason">Flight was rescheduled by airline
						</li>
					</ul>
				</div>
			</div>
			<div class="line"></div>
			<div class="passengers">
				<div class="title">Select passengers to see refund amount</div>
				<div class="nav">
					<ul class="flex space-between align-items-center">
						<li>Name</li>
						<li>PNR</li>
						<li>Status</li>
						<li>Total paid</li>
					</ul>
				</div>
				<ul>
					<li class="passengersDetial " v-for="(item,index) in orders[orderIndex].travellerinfo" :key="item.travellerId">
						<ul class='flex space-between align-items-center' v-show="item.status == 1">
							<li class="sp"> <input type="checkbox" :value="orders[orderIndex].travellerinfo[index].travellerId" id="" v-model="checkList">{{item.name}}</li>
							<li class="op" v-if="!item.pNR">
								null
							</li>
							<li v-else>
								{{item.pNR}}
							</li>
							<li>Refundable</li>
							<li>
								<span class="rs ">Rs.</span>{{Math.round(pricePer)}}</li>
						</ul>
					</li>

				</ul>
			</div>
			<div class="line"></div>
			<div class="amount">
				<div class="title">Select passengers to see refund amount</div>
				<div class="nav">
					<ul class="flex space-between align-items-center">
						<li>Your paid(Total)</li>
						<li>Cancellation fee(Total)</li>
					</ul>
				</div>
				<ul class="amountDetail flex space-between align-items-center">
					<li>
						<span class="rs ">Rs.</span>{{Math.round(pricePer * checkList.length)}}</li>
					<li v-if="checkList.length==0">
						<span class="rs ">Rs.</span>0</li>
					<li v-else>
						<span class="rs ">Rs.</span>{{Math.round(pricePer * checkList.length - cf* checkList.length)}}</li>
				</ul>
			</div>
			<div class="total">
				<div class="title">Refund Amount(Total)</div>
				<div class="price">
					<span class="rs ">Rs.</span>{{cf* checkList.length}}</div>
			</div>
			<div class="tips">
				<ul>
					<li>
						<p>The refund amount is indicative and is calculated on the basis of the fare rules & restrictions and flight booking policy.</p>
					</li>
					<li>
						<p>The final amount refunded to your account may vary.</p>
					</li>
				</ul>
			</div>
			<div class="button">
				<a @click="showPoup()">Submit</a>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import flightInfo from './base/flightInfo.vue'
import { TimeFormatUtil, OrderStatusUtil, CookieUtil, GetFlightOrderUtil } from './../../../models/utils'
import { Popup, Toast, Indicator } from 'mint-ui'
import { User } from '../../../models/user'
import { DomainManager } from '../../../config/DomainManager'


export default {
	components: {
		headTop,
		flightInfo,
		Popup,
		GetFlightOrderUtil
	},
	data() {
		return {
			orders: [],
			fee: '',
			ifPay: '',
			ico: {
				"G8": require("../../../assets/images/G8.png"),
				"SG": require("../../../assets/images/SG.png"),
				"UK": require("../../../assets/images/UK.png"),
				"AI": require("../../../assets/images/IX.png"),
				"9W": require("../../../assets/images/9W.png"),
				"6E": require("../../../assets/images/6E.png"),
				"I5": require("../../../assets/images/I5.png")
			},
			orderIndex: 0,
			showOTP: false,
			checkList: [],
			checkArr: [],
			cf: '',
			reason: 0,
			otp: '',
			submit: 'Submit'
		}
	},
	methods: {
		Cancellation() {
			Indicator.open({ spinnerType: 'fading-circle' });

			let id = 'tripId=' + this.orders[this.orderIndex].id;
			let tarvellerId = this.checkList;
			let type = this.reason;
			let otp = this.otp;
			if (this.otp.length == 0) {
				Toast('Please enter the OTP Code');
				return false;
			} else {
				User.refunds(this, tarvellerId, otp, type).then(res => {
					console.log(res)
					let parm = 'orderId=' + this.orders[this.orderIndex].id;
					if (res.success) {
						Toast('success')
						Indicator.close();
						window.location.href = DomainManager.getSearchOrderResultUrl() + parm;
					} else {
						Toast('error')
						Indicator.close();
					}
				})
			}

		},
		getOTP() {
			var self = this;
			if (self.submit != 'Submit') {
				return false;
			}
			let parm = 'tripId=' + self.orders[this.orderIndex].id;
			var btn = document.querySelector('.send');
			btn.style.backgroundColor = '#ccc';
			if (self.submit == 'Submit') {
				self.submit = 60
			}
			User.getRefundOTP(self, parm).then(res => {
				self.submit = res.lastSendTime;
			})
			var stop = setInterval(function() {
				if (self.submit > 1) {
					self.submit--;
				} else {
					clearInterval(stop);
					btn.style.backgroundColor = '#0b9d78';
					self.submit = 'Submit';
				}
			}, 1000)
		},
		showPoup() {
			if (this.checkList.length == 0) {
				Toast('Please choose at least 1 passenger')
				return false
			}
			this.showOTP = true;
		},
		getDRTime(time) {
			return TimeFormatUtil.getOrderDetailDate(time);
		},
		getOrderDetail(status) {
			return OrderStatusUtil.getOrderStatus(status);
		}
	},
	computed: {
		pricePer() {
			return this.orders[this.orderIndex].price / this.orders[this.orderIndex].travellerinfo.length;
		},
		expirationTime() {
			let creatTime = null;
			if (this.orders.length > 0) {
				creatTime = new Date(this.orders[0].creatTime);
				let year = creatTime.getFullYear();
				let month = creatTime.getMonth() + 1;
				let date = creatTime.getDate();
				let hour = creatTime.getHours();
				let minute = creatTime.getMinutes() + 15;

				let second = creatTime.getSeconds();
				if (minute > 59) {
					minute -= 59;
					hour += 1;
					if (hour > 24) {
						hour = 0;
					}
				}
				return (date + '/' + month + '/' + year + ',' + hour + ':' + minute + ':' + second)
			}
		}
	},
	created() {
		// this.orders = this.$store.getters.orderDetail;
		// if (!this.orders) {
		// 	this.orders = JSON.parse(sessionStorage.getItem('orders'));
		// }

		this.orders = JSON.parse(sessionStorage.getItem('orders'));
		this.fee = JSON.parse(sessionStorage.getItem('orderFee')).fee;
		this.orderIndex = JSON.parse(sessionStorage.cancelType);
		for (var i = 0; i < this.orders[this.orderIndex].travellerinfo.length; i++) {
			var item = '';
			this.checkArr.push(item);
		}
	},
	mounted() {
		console.log(this.orders[this.orderIndex].travellerinfo)
		let parm = 'tripId=' + this.orders[this.orderIndex].id;
		User.getRefundAmount(this, parm).then(res => {
			this.cf = res;
		})
	}
}
</script>
<style lang="less" scoped>
.head {
	background: #0b9d78!important;
	.title {
		font-size: 0.768rem;
		color: #fff;
	}
	.sp {
		opacity: 0;
	}
}

.container {
	overflow: auto;
	position: relative;
	.otp-option {
		width: 12.16rem;
		position: fixed;
		top: 50%;
		margin-top: -6.4rem;
		left: 50%;
		margin-left: -6.08rem;
		z-index: 99;
		background: #fff;
		.content {
			width: 100%;
			height: 100%;
			padding: 1rem 0.85rem;
			box-sizing: border-box;
		}
		.top {
			margin-bottom: 0.512rem;
			.close {
				img {
					width: 0.682rem;
					display: block;
				}
			}
		}
		.text {
			margin-bottom: 1.45rem;
			p {
				font-size: 0.512rem;
				text-align: left;
			}
		}
		.otp {
			.msg {
				margin-bottom: 0.426rem;
				span,
				a {
					font-size: 0.469rem;
					display: block;
					line-height: 1.28rem;
				}
				a {
					width: 3.84rem;
					background: #0b9d78;
					color: #fff;
					border-radius: 4px;
				}
				span {
					text-align: left;
				}
			}
			.form-group {
				height: 1.28rem;
				margin-bottom: 1.06rem;
				border: 1px solid #ddd;
				border-radius: 2px;
				input {
					display: block;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 0 0.314rem;
				}
			}
		}
		.btn {
			margin: 0 0.64rem;
			display: block;
			line-height: 1.7rem;
			background: #ffad3d;
			color: #fff;
			font-size: 0.554rem;
			border-radius: 4px;
		}
	}
	.modal {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 11;
		background: #000;
		opacity: 0.5;
	}
	.line {
		width: 100%;
		height: 0.213rem;
		background: #ebebeb;
		margin-top: 0.64rem;
	}
	.fi-wrapper {
		padding: 2.8rem 0.68rem 0rem;
	}
	.flightInfo {
		margin-top: 0.3rem;
		.tripID {
			display: none;
			padding: 0.4rem;
			border-bottom: 1px solid #ddd;
			margin-bottom: 0.15rem;
			h3 {
				text-align: left;
				font-size: 0.6rem;
				color: #333;
				font-weight: normal;
			}
		}
		.flight-detail {
			border: 1px solid #ccc;
			background-color: #fff;
			border-radius: 2px;
			padding: 1.2rem 0.4rem 0.4rem;
			position: relative; // margin-bottom: 0.4rem;
			.status {
				position: absolute;
				top: 0;
				right: 0;
				border-top-right-radius: 2px;
				font-size: 0.52rem;
				padding: 0.2rem 0.4rem;
				background-color: #ceebe4;
				color: #0b9d78;
			}
			.tripid {
				position: absolute;
				top: -1rem;
				left: 0;
				padding: 0.2rem 0;
				font-size: 0.52rem;
			}
			.pt {
				padding-top: 0.6rem;
			}
			.title {
				height: 1rem;
				img {
					width: 0.8rem;
					height: auto;
				}
				h2 {
					font-size: 0.6rem;
					color: #333;
					text-align: left;
					line-height: 1rem;
					padding-left: 0.4rem;
				}
			}
			.flight-date {
				padding: 0.4rem 0;
				.from,
				.to {
					h2:nth-child(1) {
						.city {
							font-size: 1.38rem;
							color: #333;
						}
						.time {
							font-size: 0.52rem;
							color: #666;
						}
					}
					h2:nth-child(2) {
						font-size: 0.52rem;
						color: #ccc;
					}
					h2:nth-child(3) {
						font-size: 0.52rem;
						color: #ccc;
					}
				}
				.from {
					text-align: right;

					h2 {
						padding: 0.2rem 0;
					}
				}
				.to {
					text-align: left;
					h2 {
						padding: 0.2rem 0;
					}
				}
				.duration {
					position: relative;
					width: 5rem;
					img {
						display: block;
						margin: 0 auto;
						margin-top: 0.25rem;
					}
					.time {
						position: absolute; // bottom: 0;
						left: 0;
						right: 0;
						span {
							display: block;
							font-size: 0.6rem;
							color: #ccc;
							padding: 0.2rem 0.8rem; // margin-left: 0.6rem;
							background-size: 0.768rem;
						}
					}
					.line {
						width: 2rem;
						height: 1px;
						margin: 0 auto;
						border-top: 1px #000 solid;
						position: relative;
						top: 30%;
						.round {
							width: 6px;
							height: 6px;
							border-radius: 50%;
							border: 1px solid #ffad3d;
							background-color: #fff;
							position: absolute;
							left: 50%;
							transform: translateY(-50%) translateX(-50%);
							-webkit-transform: translateY(-50%) translateX(-50%);
							span {
								width: 4px;
								height: 4px;
								background-color: #ffad3d;
								border-radius: 50%;
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translateY(-50%) translateX(-50%);
								-webkit-transform: translateY(-50%) translateX(-50%);
							}
						}
					}
				}
			}
		}
	}
	.options {
		.title {
			font-size: 0.597rem;
			line-height: 1.7rem;
			text-align: left;
			border-bottom: 1px solid #ddd;
			padding: 0 0.64rem;
		}
		.optionDetail {
			padding: 0 0.64rem;
			ul {
				li {
					text-align: left;
					line-height: 1.28rem;
					font-size: 0.597rem;
					input {
						display: block;
					}
				}
			}
		}
	}
	.passengers {
		.title {
			font-size: 0.597rem;
			line-height: 1.7rem;
			text-align: left;
			border-bottom: 1px solid #ddd;
			padding: 0 0.64rem;
		}
		.nav {
			padding: 0 0.64rem;
			ul {
				width: 100%;
				border: 1px solid #ddd;
				border-radius: 4px;
				height: 1.7rem;
				margin-top: 0.64rem;
				li {
					width: 25%;
					font-size: 0.587rem;
					line-height: 1rem;
					border-right: 1px solid #ddd;
				}
				li:nth-child(4) {
					border-right: none;
				}
			}
		}
		.passengersDetial {
			padding: 0 0.64rem;
			li {
				width: 25%;
				font-size: 0.587rem;
				line-height: 1.7rem;
				height: 1.7rem;
				border-bottom: 1px solid #ddd;
			}
			.sp {
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.op {
				color: #fff;
			}
		}
	}
	.amount {
		.title {
			font-size: 0.597rem;
			line-height: 1.7rem;
			text-align: left;
			border-bottom: 1px solid #ddd;
			padding: 0 0.64rem;
		}
		.nav {
			padding: 0 0.64rem;
			ul {
				width: 100%;
				border: 1px solid #ddd;
				border-radius: 4px;
				height: 1.7rem;
				margin-top: 0.64rem;
				li {
					width: 50%;
					font-size: 0.597rem;
					line-height: 1rem;
					border-right: 1px solid #ddd;
				}
				li:nth-child(2) {
					border-right: none;
				}
			}
		}
		.amountDetail {
			padding: 0 0.64rem;
			li {
				width: 50%;
				font-size: 0.587rem;
				line-height: 1.7rem;
				border-bottom: 1px solid #ddd;
			}
		}
	}
	.total {
		margin-top: 1.7rem;
		padding: 0 0.64rem;
		.title {
			font-size: 0.597rem;
			text-align: right;
		}
		.price {
			margin-top: 0.64rem;
			font-size: 0.64rem;
			text-align: right;
		}
	}
	.tips {
		padding: 0 0.64rem;
		margin-top: 0.64rem;
		p {
			font-size: 0.512rem;
			text-align: left;
		}
	}
	.button {
		margin-top: 1.7rem;
		margin-bottom: 2.7rem;
		a {
			margin: 0 auto;
			display: block;
			line-height: 1.7rem;
			width: 14.72rem;
			background: #ffad3d;
			color: #fff;
			font-size: 0.554rem;
			border-radius: 4px;
		}
	}
}
</style>
