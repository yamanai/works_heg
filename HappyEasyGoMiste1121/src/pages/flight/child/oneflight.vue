
<template>
	<div class="wrapper">
		<head-top class="header">
			<i slot="left" @click="$router.push('/')" class="iconfont icon-back"></i>
			<div slot="title" class="title">
				<div v-if="getFlightOrder!=null" class="title-detail">
					<span>{{getFlightOrder.departAirport.cityName}}</span>
					<span> - </span>
					<span>{{getFlightOrder.destinationAirport.cityName}}</span>
				</div>
				<div class="title-info">
					<span>{{flightTimeRangeString}}</span>
					<span>&bull;</span>
					<span>{{travellerNum}}Traveller</span>
				</div>
			</div>
			<div slot="right" class="next" v-show="true" @click="skipFilter">
				<i class="iconfont icon-filter"></i>
			</div>
		</head-top>
		<loading v-show="showLoad"></loading>
		<mt-popup v-model="showPopup" popup-transition="popup-fade" modal="true" closeOnClickModal="false">
			<failure>
				<div slot="head">Flight unavailable</div>
				<p slot="content">We've really sorry,but the flight you selected is no longer available.please select a different flight</p>
				<mt-button @click="goBack" slot="btn" class="btn" type="default">OK</mt-button>
			</failure>
		</mt-popup>
		<mt-popup v-model="showPopup2" popup-transition="popup-fade" modal="true" closeOnClickModal="false">
			<failure>
				<div slot="head">Flight unavailable</div>
				<p slot="content">We've really sorry,but the flight you selected is no longer available.please select a different flight</p>
				<mt-button @click="close" slot="btn" class="btn" type="default">OK</mt-button>
			</failure>
		</mt-popup>
		<transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
			<keep-alive>
				<router-view :filter="onewayFilter" class="animated"></router-view>
			</keep-alive>
		</transition>
		<div class="container">
			<div class="info-wrapper">
				<div class="con-title">
					<div class="span-wrap flex space-betweens">
						<div class="sort-form flex align-items-center content-center" v-for='(item,index) in titleList' :key="item.id" @click='sort(index)'>
							<div class="sort-wrap flex align-items-center content-center">
								<span :class='{active:sortType==index}'>{{item}}
								</span>
								<i :class='{active:sortType==index}' class="iconfont icon-arrow"></i>
							</div>

						</div>

					</div>
				</div>
			</div>
			<div class="flight-info" ref="flightInfoList">
				<ul>
					<li class="" :class="{active:this.idx==index}" v-for="(item,index) in displayedFlights" :key="item.id">
						<div class="flight-content flex space-between align-items-center" @click="onFlightItemClick(index)">
							<div class="flight-time">
								<div class="flight-time-ico">
									<img :src="item.airline.iconPath" />
								</div>
								<div class="fn">{{item.stops[0].flightNumber}}</div>

							</div>
							<div class="flight-time-info">
								<div class="margininfo">
									<div class="schedule flex space-between align-items-center">
										<span>{{TimeFormatUtil.getDisplayHourAndMinute(item.departDate)}}</span>
										<img src="../../../assets/images/common/rect.png" alt="rect">
										<span>{{TimeFormatUtil.getDisplayHourAndMinute(item.returnDate)}}</span>
									</div>
									<div class="time-cost flex space-between align-items-center">
										<span>{{(TimeFormatUtil.getDurationDescription(item))}}</span>
										<span>{{(item.stops.length-1==0 ? 'non-stop' : item.stops.length-1+'stop')}}</span>
									</div>

								</div>
								<div class="city-name flex space-between align-items-center">
									<div class="depart">
										{{getFlightOrder.destinationAirport.iataCode}}
									</div>
									<!-- <i class="iconfont icon-roundtrip"></i> -->
									<img class="gb" src="../../../assets/images/common/icon-goback.png" alt="">
									<div class="arrive">
										{{getFlightOrder.departAirport.iataCode}}
									</div>
								</div>
							</div>
							<div class="flight-price">
								<div class="flight-price-detail">
									<div class="price-show flex content-end align-items-center">
										<span class="rs">RS.</span>
										<span>{{Math.round((item.bfp+item.gst-50)/numberOfPeople) | formatDate}}</span>
										</h2>
									</div>
									<div class="cashback-detail flex content-end align-items-center">
										<span class="rs">RS.</span>
										<span>{{Math.round(item.flightInfoBack.fee.fees[item.flightInfoBack.fee.fees.length-1].cba/numberOfPeople)}}</span>
									</div>
								</div>
								<div class="cashback-icon flex content-end">
									<img src="../../../assets/images/ticketlist/cashback.png" alt="">
								</div>
							</div>
						</div>
						<div class="ad" v-if="showAD(displayedFlights, index)">
							<!-- <img src="../../../assets/images/roundtrip/ad_red1.png" alt="" @click="$router.push('/cashback')"> -->
							<img v-if="offers[0]&&offers[0].isUse == 1" :src="offers[0].url" alt="" @click="$router.push(offers[0].href)">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
const SORT_BY_TIME = 0;
const SORT_BY_DURATION = 1;
const SORT_BY_PRICE = 2;
const SORT_BY_CASHBACK = 3;

import headTop from '../../../components/head/head.vue'
import loading from '../../../components/loading/loading.vue'
import filter from './filter.vue'
import failure from '../../failure/failure.vue'
import { TimeFormatUtil, CabinClassUtil, GetFlightOrderUtil } from '../../../models/utils'
import { Flight, FlightFactory } from '../../../models/flight'
import { bus } from '../../../main.js'
import { mapGetters } from 'vuex'
import { Toast, Indicator, Button, Popup } from 'mint-ui';
import { OnewayFilter } from '../../../models/filter'
import { OnewayOrder, RoundTripOrder } from '../../../models/flightorder'
import { CookieUtil } from '../../../models/utils'
import { User } from '../../../models/user'

import { Passenger, Adult, Child, Infant } from '../../../models/passenger'
import * as XFlight from '../../../vuex/models/flight/XFlight.js'
import * as OrderMutaionNames from '../../../vuex/models/flightorder/MutationName.js'
import * as mutationNames from '../../../vuex/models/flightorder/MutationName.js'
import { OnewayDiscountManager, DiscountItem, OnewayCompanyDiscountPolicy, OnewayLadderDiscountPolicy }
	from '../../../models/aboutdiscount'
import { Coupon } from '../../../models/discount'

var _discountManager = null

export default {
	components: {
		headTop,
		loading,
		failure
	},
	data() {
		return {
			indexConfirm: '',
			showCashbackInfo: false,
			cashbackTips: 0,
			originalPrice: 0,
			isCrash: false,
			sortType: SORT_BY_PRICE,
			idx: '-1',
			showFilte: false,
			showLoad: false,
			showPopup: false,
			showPopup2: false,
			isPrice: true,
			isTime: true,
			isSort: true,
			isDuration: true,
			isCashback: true,
			imgs: require('../../../assets/images/ic-btn-one1.png'),
			heads: {
				img1: require('../../../assets/images/flight-prev.png'),
				img2: require('../../../assets/images/ic-loudou.png'),
				fromCity: 'New Delhi',
				toCity: 'Mumbai',
				time: '18Mar-31Mar',
				traveller: '1'
			},
			titleList: [
				"Time",
				"Duration",
				"Price",
				"Cashback"
			],
			/**
			 @type {OnewayFilter} onewayFilter
			*/
			onewayFilter: null,
			TimeFormatUtil,
			flightInfoBack: null,
			offers: []
		}
	},
	methods: {
		showAD(displayedFlights, index) {
			if (displayedFlights.length > 3) {
				return index == 2;
			} else if (displayedFlights.length <= 3) {
				return index == displayedFlights.length - 1;
			}
		},
		showPay(index, item) {
			var arr = this.$refs.payoption;
			var el = this.$refs.payoption[index];
			if (el.style.display == 'block') {
				el.style.display = 'none';
				if (this.indexConfirm == index) {
					this.showCashbackInfo = false;
				}
			} else {
				arr.forEach(function(item, index) {
					item.style.display = 'none';
				})
				el.style.display = 'block';
				this.indexConfirm = index;
				this.showCashbackInfo = true;
			}
			this.cashbackTips = Math.round(item.commonDiscount * 0.82);
			this.originalPrice = item.obfp + item.ogst;
		},
		goBack() {
			Indicator.close();
			this.$router.push('/');
		},
		close() {
			Indicator.close();
			this.showPopup2 = false;
		},
		getFlight() {
			return this.$store.getters.selectflightofall;
		},
		skipFilter() {
			this.$router.push('/oneway/filter');
		},
		ico(item) {
			return item.airline.iconPath;
		},
		sort(index) {
			this.sortItem = index;
			var con_img = document.querySelectorAll('.con-title i')[index];
			if (this.isSort) {
				con_img.style.transition = '.3s';
				con_img.style.transform = 'rotateX(0deg)';
				con_img.style.webkitTransform = 'rotateX(0deg)';
			} else {
				con_img.style.transition = '.3s';
				con_img.style.transform = 'rotateX(180deg)';
				con_img.style.webkitTransform = 'rotateX(180deg)';
			}
		},
		onFlightItemCrashClick(index) {
			let cu = new CookieUtil(document);
			if (!cu.hasItem('uuid')) {
				this.$router.push('/login')
				return false;
				Indicator.open({
					spinnerType: 'fading-circle'
				});
			} else {
				Indicator.open({
					spinnerType: 'fading-circle'
				});
				let self = this
				this.$store.getters.flightOrder.setDepartFlight(this, this.getFlight()[index])
				this.$store.getters.flightOrder.setAirportFullName(this.getFlight()[index])
				this.$store.getters.flightOrder.returnCash = true;
				sessionStorage.returnCash = true;
				this.$store.getters.flightOrder.checkPrice(this)
					.then(function(res) {
						Indicator.close();
						let order = self.$store.getters.flightOrder;
						let orderJson = order.toJSON()
						let orderStr = JSON.stringify(orderJson)
						sessionStorage.order = orderStr
						self.$router.push('/book')
					}).catch(function(err) {
						Indicator.close();
						self.$router.push('/book')
						console.log(err)
					})
			}
		},
		onFlightItemClick(index) {
			let self = this
			this.$store.getters.flightOrder.setDepartFlight(this, this.getFlight()[index])
			this.$store.getters.flightOrder.setAirportFullName(this.getFlight()[index])
			this.$store.getters.flightOrder.returnCash = false;
			this.$store.getters.flightOrder.index = index;
			this.$store.getters.flightOrder.flightInfoBack = this.getFlight()[index]
			let order = this.$store.getters.flightOrder;
			this.$store.commit(OrderMutaionNames.setupOrder, order);

			sessionStorage.setItem('order', JSON.stringify(order));
			this.$router.push('/ticketlist');
		},
		sortDate(sortType) {
			switch (sortType) {
				case SORT_BY_TIME:
					this.isTime = !this.isTime;
					this.getFlight().sort((o1, o2) => {
						if (this.isTime) {
							this.isSort = true;
							return o1.departDate.getTime() - o2.departDate.getTime();
						} else {
							this.isSort = false;
							return o2.departDate.getTime() - o1.departDate.getTime();
						}
					});
					break;
				case SORT_BY_DURATION:
					this.isDuration = !this.isDuration;
					this.getFlight().sort((o1, o2) => {
						if (this.isDuration) {
							this.isSort = true;
							return o1.getDurationInMinute() - o2.getDurationInMinute();
						} else {
							this.isSort = false;
							return o2.getDurationInMinute() - o1.getDurationInMinute();
						}
					})

					break;
				case SORT_BY_PRICE:
					this.isPrice = !this.isPrice;
					this.getFlight().sort((o1, o2) => {
						if (this.isPrice) {
							this.isSort = true;
							return o1.getPrice() - o2.getPrice();
						} else {
							this.isSort = false;
							return o2.getPrice() - o1.getPrice();
						}
					})
					break;
				case SORT_BY_CASHBACK:
					this.isCashback = !this.isCashback;
					this.getFlight().sort((o1, o2) => {
						if (this.isCashback) {
							this.isSort = true;
							// return o1.flightInfoBack.fee.fees[2].cba - o2.flightInfoBack.fee.fees[2].cba;
						} else {
							this.isSort = false;
							// return o2.flightInfoBack.fee.fees[2].cba - o1.flightInfoBack.fee.fees[2].cba;
						}
					})
					break
			}
		},
		refreshFlightDates(datas) {
			//jie ti yan jia de policys
			let props = datas.x.props;
			let flightDiscountItems = []
			let fac = new FlightFactory(datas.departFlightArray)
			let allFlight = fac.build((flight, discount) => {
				flightDiscountItems.push(new DiscountItem(flight.flightNumber, Number(discount)))
			})
			this.$store.commit(XFlight.getAllFlight, allFlight)
			//GetFlightOrderUtil.setDepartOrReturnFlightIntoSession(allFlight,sessionStorage,"flight")
			sessionStorage.flightType = "one"

			this.$store.commit(XFlight.selsectAllFlight, allFlight)

			//let a =this.getFlight();
			// let policys = [[
			// 	new OnewayLadderDiscountPolicy(props),
			// 	new OnewayCompanyDiscountPolicy(flightDiscountItems)
			// ]]
			// _discountManager = new OnewayDiscountManager(policys)

			// for (let f of this.getFlight()) {
			// 	_discountManager.calculateDiscount(f)
			// }
			this.getFlight().sort((o1, o2) => {
				this.isSort = true;
				return o1.getPrice() - o2.getPrice();
			})
			this.getFlight().forEach((el) => {
				let d = el.departDate;
				let r = el.returnDate;
				el.durationDays = r.getDate() - d.getDate();
			})
		},
		flightDurationDes: (flight) => {
			return this.TimeFormatUtil.getDurationDescription(flight)
		},
		hourAndMinuteDescription: (date) => {
			return this.TimeFormatUtil.getDisplayHourAndMinute(date)
		},
		calculateDiscount(flight) {

		},
		getFlightData(index) {

			this.idx = index;
		},
		filter(filterOptions) {

			this.filterOptions = filterOptions;
		},
		saveFN(fn) {
			var airports = fn.x.airports;
			sessionStorage.setItem('airports', JSON.stringify(airports));
		}
	},
	computed: {
		numberOfPeople() {
			let o = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
			return o.adults.length + o.children.length + o.infants.length;
		},
		getFlightOrder() {
			return GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
		},
		flightTimeRangeString() {

			if (this.$store.getters.flightOrder != null) {
				let d = this.$store.getters.flightOrder.departDate
				return TimeFormatUtil.getMonthDescription(d.getMonth()) + d.getDate();
			}

		},
		travellerNum() {
			let order = this.$store.getters.flightOrder
			if (order != null) {
				let adultNum = order.adults.length
				let childNum = order.children.length
				let infantsNum = order.infants.length
				return (adultNum + childNum + infantsNum)
			}

		},
		iconPath(item) {

			return item.airline.iconPath;
		},
		sortItem: {
			set: function(index) {

				this.sortType = index;
				this.sortDate(this.sortType);
			},
			get: function() {

				return this.sortType;
			}
		},
		displayedFlights() {
			return this.getFlight()
		}
	},
	created() {
		var parm = 'type=12&device=0';
		User.advList(this, parm).then(res => {
			this.offers = res.list;
		})
	},
	beforeMount() {
	},
	mounted() {

		if (!sessionStorage.order) {
			Toast({
				message: 'infomation expired',
				duration: 2000
			})
			setTimeout(
				"window.location.href = 'https://m.happyeasygo.com/'", 2000
			)
		}
		else {
			this.$store.commit(XFlight.getAllFlight, null)
			this.$store.commit(XFlight.selsectAllFlight, null)
			let opraOrder = this.getFlightOrder
			this.showLoad = true;
			this.showPopup = false;

			opraOrder.searchSuitableFlights(this).then((jsonObect) => {
				this.showLoad = false;
				Indicator.close();
				this.refreshFlightDates(jsonObect);
				this.flightInfoBack = jsonObect.departFlightArray;
				this.$store.state.flightOrder.order.token = jsonObect.token
				this.onewayFilter = new OnewayFilter(this.getFlight())

				this.saveFN(jsonObect);
			}).catch((res) => {
				this.showPopup = true;
				Indicator.close();
			})
		}
	}
}


</script>
<style lang='less' scoped>
.rs {
	margin-right: 0!important;
}

.prev {
	width: 0.9rem;
}

::-webkit-scrollbar {
	display: none;
}

.yellow {
	color: #ffad3d;
}

.header {
	background: #0b9d78;
	i {
		display: block;
		color: #fff;
		font-size: 0.8rem;
	}
	.next {
		display: block;
		img {
			width: 0.8rem;
			padding: 0.64rem;
		}
	}
}

.title {
	line-height: 1.5;
	.title-detail {
		font-size: 0.8rem;
		color: #fff;
	}
	.title-detail-ico {
		width: 0.64rem;
		height: 0.64rem;
		display: inline-block;
		background: url('../../../assets/images/ic-btn-one3.png') center no-repeat;
		background-size: 0.64rem;
	}
	.title-info {
		font-size: 0.56rem;
		color: #fff;
	}
}

.tips {
	display: none;
	text-align: left;
	.tips-list {
		padding: 0.3rem 0.64rem;
		line-height: 1.5;
		li {
			font-size: 0.43rem;
		}
	}
}


.info-wrapper {
	margin-top: 2.04rem;
	.con-title {
		width: 100%;
		font-size: 0.512rem;
		color: #c2c2c2;
		.span-wrap {
			border-top: 1px solid #d6d6d6;
			border-bottom: 1px solid #d6d6d6;
			i {
				display: inline-block;
			}
			span {
				text-align: center;
			}
			.sort-form {
				width: 25%;
				box-sizing: border-box;
				line-height: 1.7rem;
				border-right: 0;
				.sort-wrap {
					width: 100%;
					height: 80%;
					border-right: 1px solid #d6d6d6;
				}
				span {
					display: inline-block;
				}

				.con_img {
					transition: .3s;
					-webkit-transition: .3;
				}
				.img-up {
					transform: 'rotateX(0deg)';
					-webkit-transform: 'rotateX(0deg)';
				}
				.img-down {
					transform: 'rotateX(180deg)';
					-webkit-transform: 'rotateX(180deg)';
				}
				.active {
					color: #ffad3d;
					i {
						color: #ffad3d;
					}
				}
				i {
					color: #fff;
					img {
						width: 0.3rem;
					}
				}
			}
			.sort-form:nth-child(4) {
				.sort-wrap {
					border-right: 0;
				}
			}
		}
	}
	.cashback-info {
		font-size: 0.512rem;
		text-align: left;
		line-height: 1.2;
		padding: 0rem 1.28rem 0.15rem 1.28rem;
		.rs,
		.rs-price {
			color: #0b9d78;
		}
	}
}


.container:before {
	display: table;
	content: "";
}



.flight-info {
	padding: 0 0.64rem;
	position: absolute;
	top: 3.95rem;
	left: 0;
	right: 0;
	bottom: 0;
	ul {
		overflow: auto;
		height: 100%;
		background-color: #fff;
		.ad {
			margin-bottom: 0.341rem;
			img {
				display: block;
				width: 14.72rem;
			}
		}
		.flight-content {
			margin: 0;
			padding: .32rem .6rem 0 0.6rem;
			border: 1px solid #dddddd;
			margin-bottom: 0.341rem;
			border-top-left-radius: 0.2rem;
			border-top-right-radius: 0.2rem;
			.flight-time {
				width: 25%;
				height: 2.8rem;
				position: relative;
				.flight-time-ico {
					height: 1.8rem;
					img {
						width: 1.536rem;
						display: block; // margin: 0 auto;
					}
				}
				.fn {
					text-align: left;
					font-size: 0.47rem;
					display: block; // margin-top: 0.3rem;
					color: #adadad;
				}
			}
			.flight-time-info {
				width: 50%;
				height: 2.8rem;
				.margininfo {
					width: 5.2rem;
					margin: 0 auto;
					height: 1.8rem;
					.schedule,
					.time-cost,
					.city-name {}
					.schedule {
						font-size: 0.768rem;
						span {
							display: block;
						}
						img {
							height: 1px;
							display: block;
						}
					}
					.time-cost {
						padding-top: 0.1rem;
						margin-left: 0.05rem;
						color: #adadad;

						span {
							font-size: 0.47rem;
							display: block;
						}
					}
					h2 {
						width: 5.8rem;
						font-size: 0.56rem;
						font-weight: bold;
						line-height: 1rem;
						text-align: center;
						i {
							font-size: 0.52rem;
						}
					}
					p {
						width: 5.8rem;
						font-size: 0.4rem;
						line-height: 0.8rem;
						text-align: justify;
					}
				}
				.city-name {
					font-size: 0.47rem;
					width: 5.2rem;
					color: #adadad;
					margin: 0 auto;
					.depart,
					.arrive {
						font-size: 0.47rem;
					}
					i {
						font-size: 0.47rem;
						margin-left: -0.1rem;
					}
					.gb {
						display: block;
						height: 0.512rem;
					}
				}
			}
			.flight-price {
				width: 25%;
				height: 2.8rem;
				position: relative;
				.flight-price-detail {
					// .present-price {
					// 	padding-bottom: 0.3rem;
					// 	width: 3rem;
					// 	font-size: 0.768rem;
					// 	text-align: right;
					// 	color: #ffad3d;
					// 	line-height: 0.8rem; 
					// 	font-weight: bold;
					// }
					height: 1.8rem;
					.price-show {
						font-size: 0.768rem;
						width: 100%;
						text-align: right;
						color: #333;
						.rs {
							margin-top: 0.1rem;
							margin-right: 0.2rem!important;
						}
					}
					.past-price {
						width: 3rem;
						font-size: 0.5rem;
						color: #ccc;
						text-align: left;
						line-height: 0.8rem;
						span {
							text-decoration: line-through;
						}
					}
					.cash-icon {
						// position: absolute;
						// right: 0;
						// bottom: 0.5rem;
						float: right;
						display: none;
						height: 0.512rem;
					}
					.set-icon {
						color: #ccc;
					}
					.cashback-detail {
						font-size: 0.64rem;
						text-align: right;
						color: #0b9d78;
						span {
							display: block;
						}
						.rs {
							margin-top: 0.2rem;
							margin-right: 0.1rem!important;
						}
					}
				}
				.cashback-icon {
					img {
						height: 0.6rem;
						display: block;
					}
				}
				.flight-next {
					width: 0.6rem;
					background: url('../../../assets/images/ic-btn-one.png') center no-repeat;
					background-size: 0.5rem;
				}
			}
		}
		.select-pay {
			display: none;
			border: 1px solid #dddddd;
			border-top: none;
			background: #f5f5f5;
			.lower-price,
			.cashback {
				height: 2.5rem;
				text-align: left;
				padding: 0 0.32rem;
				width: 100%;
				box-sizing: border-box;
				.title,
				.price,
				.back-price {
					height: 1.664rem;
					line-height: 1.664rem;
					font-size: 0.6rem;
					.rs {
						margin-top: 0.05rem;
					}
				}
				.back-price-sp {
					text-decoration: line-through;
					margin-right: 0.2rem;
				}
				i {
					display: block;
				}
				.title {
					width: 38%;
					display: block;
				}
				.price {
					display: block;
					width: 20%;
					color: #f65858;
					text-align: center;
				}
				.price-color {
					color: #0b9d78;
					margin-left: 0.1rem;
				}
				.cash-icon {
					height: 0.7rem;
					display: block;
				}
				.back-price {
					width: 38%;
				}
				.sp {
					width: 38%;
					opacity: 0;
				}
			}
			.lower-price {
				border-bottom: 1px solid #dddddd;
			}
		}
	}
}
</style>
