<template>
	<div class="search" v-if="showSearch">
		<head-top class="header">
			<i slot="left" class="prev iconfont icon-back" @click="close"></i>
			<div slot="title" class="title">Search</div>
			<i slot="right" class="sp iconfont icon-back"></i>
		</head-top>
		<div class="search-cont">
			<div class="searchDepart" v-show="showDepart">
				<input v-focus="showDepart" type="text" ref="departInput" v-model="departAirportString" class="departInput" placeholder="Depart">
				<a v-show="departAirportString!=''" @click="departAirportString=''" id="to-close" href="javascript:"></a>
				<ul v-if='suitableDepartAirports.length != 0'>
					<li v-for="airport in suitableDepartAirports" @click="setDepartAirport(airport)">
						{{ getAirplineDescription(airport) }}
					</li>
				</ul>
			</div>
			<div class="searchArrive" v-show="!showDepart">
				<input type="text" v-focus="!showDepart" ref="arriveInput" v-model="destinationAirportString" placeholder="Destination">
				<a v-show="destinationAirportString!=''" @click="destinationAirportString=''" id="to-close" href="javascript:"></a>
				<ul v-if='suitableDestinamtionAirports.length != 0'>
					<li v-for="airport in suitableDestinamtionAirports" @click="setDestiantionAirport(airport)">
						{{ getAirplineDescription(airport) }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import headTop from '../../../../components/head/head.vue'
import localAirportJson from '../city.json'
import { Airport } from '../../../../models/airport'
import { AirportSearcher, CookieUtil, SHA2Util, GetFlightOrderUtil } from '../../../../models/utils'

function loadLocalStoragedAirorts() {
	let res = [];
	for (let a of localAirportJson) {
		res.push(Airport.getInstanceFromJson(a))
	}
	return res;
}

function getAirpotByAitaCode(code) {
	let des;
	for (let a of _airports) {
		if (a.iataCode == code) {
			des = a;
		}
	}
	return des
}
let _airports = loadLocalStoragedAirorts()
let _airportSearcher = new AirportSearcher(_airports)

export default {
	props: {
		showDepart: {
			type: Boolean
		},
		showSearch: {
			type: Boolean
		}
	},
	components: {
		headTop
	},
	data() {
		return {
			closeSearch: false,
			departAirportString: '',
			destinationAirportString: '',
		}
	},
	methods: {
		close() {
			this.$emit('closeS')
		},
		setDepartAirport(airport) {
			this.$emit("getDepartAirport", airport, this.closeSearch)
			this.departAirportString = '';
		},
		setDestiantionAirport(airport) {
			this.$emit("getArriveAirport", airport, this.closeSearch)
			this.destinationAirportString = '';
		},
		getAirplineDescription(airport) {
			return airport.iataCode + ', ' + airport.cityName + ', ' + airport.countryName
		},
	},
	computed: {
		suitableDepartAirports() {
			let res = _airportSearcher.getSuitableAirports(this.departAirportString)
			return res
		},
		suitableDestinamtionAirports() {
			return _airportSearcher.getSuitableAirports(this.destinationAirportString)
		},
	},
	directives: {
		focus: {
			inserted: function (el, { value }) {
				if (value) {
					el.focus();
				}
			}
		}
	}
}
</script>
<style lang='less' scoped>
.header {
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

.search-cont {
	padding: 0 0.52rem;
	position: relative;
	top: 2.4rem;
	.searchDepart,
	.searchArrive {
		width: 100%;
		position: relative;
		a {
			display: block!important;
			position: absolute;
			right: 0.52rem;
			top: 50%;
			margin-top: -0.32rem;
			background: url('../../../../assets/images/close.png') center no-repeat;
			background-size: cover;
			width: 0.68rem;
			height: 0.68rem;
			z-index: 20;
		}
	}
	input {
		box-sizing: border-box;
		width: 100%;
		padding: 0.4rem 1.2rem;
		font-size: 0.68rem;
		border: 1px solid #ccc;
		background-color: #eee;
		text-indent: 0;
	}
	ul {
		height: 12rem;
		position: absolute;
		top: 1.8rem;
		overflow: auto;
		li {
			border-bottom: 1px solid #eee;
			font-size: 0.68rem;
			color: #666;
			text-align: left;
			padding: 0.4rem 0 0.4rem 1.2rem;
		}
	}
}
</style>