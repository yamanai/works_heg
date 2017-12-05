<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" class="iconfont icon-back" @click="$router.push('/')" alt=""></i>
			<span slot="title">{{heads.title}}</span>
			<i slot="right" alt="" class="right iconfont icon-back"></i>
		</head-top>
		<div class="container">
			<div class="search">
				<div class="search-cont">
					<div class="tripId">
						<input type="search" class="search" @keypress.13="searchOrder" v-model="orderNubmer" placeholder="Pleace Enter Tirp ID or Order ID" />
					</div>
					<div class="phoneNumber flex space-between">
						<input class="phone" type="text" placeholder="Phone Number" v-model="phoneNo" v-if="!isPay">
						<button type="button" @click="searchOrder">Submit</button>
					</div>
				</div>
			</div>

			<div class="searchResult">
				<keep-alive>
					<order-list :orders="orders"></order-list>
				</keep-alive>
				<div class="noResult" v-show="false">
					<h2>No record was found</h2>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import orderList from './base/orderList.vue'
import { FlightOrder } from '../../../models/flightorder'
import { Toast, Indicator } from 'mint-ui';
import { CookieUtil } from '../../../models/utils'

export default {
	components: {
		headTop,
		orderList
	},
	data() {
		return {
			orderNubmer: '',
			phoneNo: '',
			heads: {
				img: require('../../../assets/images/flight-prev.png'),
				title: 'My Trips'
			},
			orders: [],
			orderFee: '',
			isPay: false,
			needNo: false
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => vm.payType())
	},
	methods: {
		payType() {
			if (window.location.href.indexOf('order') >= 0) {
				this.isPay = true;
			} else {
				this.orderNubmer = '';
				this.phoneNo = '';
				this.orders = [];
				this.isPay = false;
			}
		},
		searchOrder() {
			if (this.orderNubmer.trim() == '') {
				Toast({
					message: 'Please input correct trip ID or order ID',
					duration: 1000
				});
			} else {
				let cu = new CookieUtil();
				if (!this.isPay) {
					if (!cu.hasItem('uuid')) {
						if (this.phoneNo.trim() == '') {
							Toast({
								message: 'Please input the Phone Number',
								duration: 2000
							})
							return false;
						}
					}
				}
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				// console.log(FlightOrder);
				FlightOrder.searchOrder(this, this.orderNubmer, this.phoneNo)
					.then(json => {
						this.orders = json.data.triplist;
						this.orderFee = json.data.order;
						if (this.orders.length == 0) {
							Toast({
								message: 'Please input correct Trip ID 、 Order ID or Phone Number',
								duration: 2000
							});
						}
						sessionStorage.removeItem('orders');
						sessionStorage.removeItem('orderId');
						sessionStorage.removeItem('orderFee');

						sessionStorage.setItem('orders', JSON.stringify(this.orders));
						sessionStorage.setItem('orderFee', JSON.stringify(this.orderFee));

						sessionStorage.setItem('orderId', this.orderNubmer);
						sessionStorage.setItem('isPayment', false);
						Indicator.close();
					})
					.catch(err => {
						Toast({
							message: 'Please input correct trip ID 、 order ID or Phone Number',
							duration: 1000
						});
						console.log(err)
						Indicator.close()
					})


			}
		}
	},
	mounted() {
		if (window.location.href.indexOf('order') >= 0) {
			this.isPay = true;
		} else {
			this.isPay = false;
		}
		if (location.search) {
			this.orderNubmer = location.search.replace(/\D/g, '');
			this.searchOrder();
		}
	}
}
</script>
<style lang='less' scoped>
.header {
	background: #0b9d78;
	span {
		color: #fff;
		font-size: 0.768rem;
	}
	.right {
		opacity: 0;
	}
}

.search {
	padding: 2.72rem 0.68rem 0.68rem;
	.search-cont {
		// position: relative;
		overflow: hidden;
		.tripId {
			margin-bottom: 0.32rem;
			.search {
				width: 100%;
				padding: 0.5rem;
				border: none;
				font-size: 0.6rem;
				border-radius: 2px; // background: #4fbc9f;
				// color: #ddd;
				border: 1px solid #ddd;
			}
		}
		.phoneNumber {
			.phone {
				width: 70%;
				padding: 0 0.5rem;
				font-size: 0.6rem;
				border-top-left-radius: 2px;
				border-bottom-left-radius: 2px;
				border-top-right-radius: 0;
				border-bottom-right-radius: 0; // background: #4fbc9f;
				// color: #ddd;
				border: 1px solid #ddd;
				border-right: 0;
			}
			button {
				width: 30%;
				height: 1.769rem; // background: url('../../../assets/images/search_ico.png') center no-repeat;
				background-size: 0.769rem;
				background: #4fbc9f;
				font-size: 0.6rem;
				color: #fff;
				border-top-right-radius: 2px;
				border-bottom-right-radius: 2px; // position: absolute;
				box-sizing: border-box; // right: 0.4rem;
				// top: 50%;
				// -webkit-transform: translateY(-50%);
				// transform: translateY(-50%);
			}
		}
	}
}

.searchResult {
	padding: 0 0.68rem;
	.noResult {
		padding-top: 10rem;
		background: url('../../../assets/images/pnr_03.jpg') center 2rem no-repeat;
		background-size: 7rem;
		h2 {
			font-size: 0.6rem;
		}
	}
}

::-webkit-input-placeholder {
	// color: #ddd;
	font-size: 0.6rem; // padding-left: 0.4rem;
}

::-moz-placeholder {
	// color: #ddd;
	font-size: 0.6rem; // padding-left: 0.4rem;
}

:-moz-placeholder {
	// color: #ddd;
	font-size: 0.6rem; // padding-left: 0.4rem;
}

.upcoming {
	background-color: #d4efe8;
}

.paid {
	background-color: #ffeac4;
}

.complete {
	background-color: #efefef;
}
</style>
