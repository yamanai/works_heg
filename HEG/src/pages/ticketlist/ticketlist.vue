<template>
    <div class="wrapper">
        <head-top class="header">
            <i slot="left" class="iconfont icon-back" @click="$router.go(-1)" alt=""></i>
            <span slot="title" class="title">
                {{flightOrder.departAirport.iataCode}} - {{flightOrder.destinationAirport.iataCode}}
            </span>
            <i slot="right" class="sp iconfont icon-back"></i>
        </head-top>
        <div class="container">
            <div class="info-content">
                <div class="ticket-info">
                    <div class="ticket">
                        <div class="info-top flex space-between">
                            <div class="flight-title flex content-start align-items-center">
                                <img class="go" src="../../assets/images/ticketlist/go.png" alt="go">
                                <img class="icon" :src="flightOrder.departFlight.airline.iconPath" alt="icon">
                                <span>
                                    {{flightOrder.departFlight.airline.name}} {{flightOrder.departFlight.stops[0].flightNumber}}
                                </span>
                            </div>
                            <div class="flight-title flex content-end align-items-center">
                                <span class="date">
                                    {{TimeFormatUtil.getBookDetailDate(new Date(flightOrder.departDate))}}
                                </span>
                            </div>
                        </div>
                        <div class="info-middle flex content-center">
                            <span class="depart">
                                {{flightOrder.departFlight.stops[0].departDate.split(' ')[1]}}
                            </span>
                            <div class="split flex space-between align-items-center">
                                <div class="line-l"></div>
                                <span class="last">
                                    {{flightOrder.departFlight.stops[0].waitTime}}
                                </span>
                                <div class="line-r"></div>
                            </div>
                            <span class="return">
                                {{flightOrder.departFlight.stops[0].returnDate.split(' ')[1]}}
                            </span>
                        </div>
                        <div class="info-bottom flex content-center">
                            <span class="depart">
                                {{flightOrder.departFlight.stops[0].departAirportName}}
                            </span>
                            <span class="last">

                            </span>
                            <span class="return">
                                {{flightOrder.departFlight.stops[0].arrivalAirportName}}
                            </span>
                        </div>
                        <div class="info-bottom-b flex space-between">
                            <div class="da">
                                {{flightOrder.departFlight.stops[0].departAirport.replace(/_/g,' ')}}
                            </div>
                            <div class="split"></div>
                            <div class="aa">
                                {{flightOrder.departFlight.stops[0].arrivalAirport.replace(/_/g,' ')}}
                            </div>
                        </div>
                    </div>
                    <div class="line-stop flex space-between align-items-center" v-if="flightOrder.departFlight.stops[1]">
                        <div class="line">
                        </div>
                        <span class="laytime">
                            layover : {{flightOrder.departFlight.flightInfoBack.stopByFlightArray[1].wt}}
                        </span>
                        <div class="line">
                        </div>
                    </div>
                    <div class="stops" v-if="flightOrder.departFlight.stops[1]">
                        <div class="info-top flex space-between">
                            <div class="flight-title flex content-start align-items-center">
                                <img class="icon" :src="flightOrder.departFlight.airline.iconPath" alt="icon">
                                <span>
                                    {{flightOrder.departFlight.airline.name}} {{flightOrder.departFlight.stops[1].flightNumber}}
                                </span>
                            </div>
                            <div class="flight-title flex content-end align-items-center">
                                <span class="date">
                                    {{TimeFormatUtil.getBookDetailDate(new Date(flightOrder.departDate))}}
                                </span>
                            </div>
                        </div>
                        <div class="info-middle flex content-center">
                            <span class="depart">
                                {{flightOrder.departFlight.stops[1].departDate.split(' ')[1]}}
                            </span>
                            <div class="split flex space-between align-items-center">
                                <div class="line-l"></div>
                                <span class="last">
                                    {{flightOrder.departFlight.stops[1].waitTime}}
                                </span>
                                <div class="line-r"></div>
                            </div>
                            <span class="return">
                                {{flightOrder.departFlight.stops[1].returnDate.split(' ')[1]}}
                            </span>
                        </div>
                        <div class="info-bottom flex content-center">
                            <span class="depart">
                                {{flightOrder.departFlight.stops[1].departAirportName}}
                            </span>
                            <span class="last">

                            </span>
                            <span class="return">
                                {{flightOrder.departFlight.stops[1].arrivalAirportName}}
                            </span>
                        </div>
                        <div class="info-bottom-b flex space-between">
                            <div class="da">
                                {{flightOrder.departFlight.stops[1].departAirport.replace(/_/g,' ')}}
                            </div>
                            <div class="split"></div>
                            <div class="aa">
                                {{flightOrder.departFlight.stops[1].arrivalAirport.replace(/_/g,' ')}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ticket-info" v-if="flightOrder.returnFlight">
                    <div class="ticket">
                        <div class="info-top flex space-between">
                            <div class="flight-title flex content-start align-items-center">
                                <img class="back" src="../../assets/images/ticketlist/back.png" alt="back">
                                <img class="icon" :src="flightOrder.returnFlight.airline.iconPath" alt="icon">
                                <span>
                                    {{flightOrder.returnFlight.airline.name}} {{flightOrder.returnFlight.stops[0].flightNumber}}
                                </span>
                            </div>
                            <div class="flight-title flex content-end align-items-center">
                                <span class="date">
                                    {{TimeFormatUtil.getBookDetailDate(new Date(flightOrder.returnDate))}}
                                </span>
                            </div>
                        </div>
                        <div class="info-middle flex content-center">
                            <span class="depart">
                                {{flightOrder.returnFlight.stops[0].departDate.split(' ')[1]}}
                            </span>
                            <div class="split flex space-between align-items-center">
                                <div class="line-l"></div>
                                <span class="last">
                                    {{flightOrder.returnFlight.stops[0].waitTime}}
                                </span>
                                <div class="line-r"></div>
                            </div>
                            <span class="return">
                                {{flightOrder.returnFlight.stops[0].returnDate.split(' ')[1]}}
                            </span>
                        </div>
                        <div class="info-bottom flex content-center">
                            <span class="depart">
                                {{flightOrder.returnFlight.stops[0].departAirportName}}
                            </span>
                            <span class="last">

                            </span>
                            <span class="return">
                                {{flightOrder.returnFlight.stops[0].arrivalAirportName}}
                            </span>
                        </div>
                        <div class="info-bottom-b flex space-between">
                            <div class="da">
                                {{flightOrder.returnFlight.stops[0].departAirport.replace(/_/g,' ')}}
                            </div>
                            <div class="split"></div>
                            <div class="aa">
                                {{flightOrder.returnFlight.stops[0].arrivalAirport.replace(/_/g,' ')}}
                            </div>
                        </div>
                    </div>
                    <div class="line-stop flex space-between align-items-center" v-if="flightOrder.returnFlight.stops[1]">
                        <div class="line">
                        </div>
                        <span class="laytime">
                            layover : {{flightOrder.returnFlight.flightInfoBack.stopByFlightArray[1].wt}}
                        </span>
                        <div class="line">
                        </div>
                    </div>
                    <div class="stops" v-if="flightOrder.returnFlight.stops[1]">
                        <div class="info-top flex space-between">
                            <div class="flight-title flex content-start align-items-center">
                                <img class="icon" :src="flightOrder.returnFlight.airline.iconPath" alt="icon">
                                <span>
                                    {{flightOrder.returnFlight.airline.name}} {{flightOrder.returnFlight.stops[1].flightNumber}}
                                </span>
                            </div>
                            <div class="flight-title flex content-end align-items-center">
                                <span class="date">
                                    {{TimeFormatUtil.getBookDetailDate(new Date(flightOrder.returnDate))}}
                                </span>
                            </div>
                        </div>
                        <div class="info-middle flex content-center">
                            <span class="depart">
                                {{flightOrder.returnFlight.stops[1].departDate.split(' ')[1]}}
                            </span>
                            <div class="split flex space-between align-items-center">
                                <div class="line-l"></div>
                                <span class="last">
                                    {{flightOrder.returnFlight.stops[1].waitTime}}
                                </span>
                                <div class="line-r"></div>
                            </div>
                            <span class="return">
                                {{flightOrder.returnFlight.stops[1].returnDate.split(' ')[1]}}
                            </span>
                        </div>
                        <div class="info-bottom flex content-center">
                            <span class="depart">
                                {{flightOrder.returnFlight.stops[1].departAirportName}}
                            </span>
                            <span class="last">

                            </span>
                            <span class="return">
                                {{flightOrder.returnFlight.stops[1].arrivalAirportName}}
                            </span>
                        </div>
                        <div class="info-bottom-b flex space-between">
                            <div class="da">
                                {{flightOrder.returnFlight.stops[1].departAirport.replace(/_/g,' ')}}
                            </div>
                            <div class="split"></div>
                            <div class="aa">
                                {{flightOrder.returnFlight.stops[1].arrivalAirport.replace(/_/g,' ')}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ticket-list-content">
                <div class="title flex space-between align-items-center">
                    <div class="line"></div>
                    <span>Product Options</span>
                    <div class="line"></div>
                </div>
                <div class="ticket-list">
                    <div class="list-group" v-for="(item,index) in flightOrder.departFlight.flightInfoBack.fee.fees">
                        <div class="top-content flex content-start align-items-center">
                            <img v-if="item.type == 3 || item.type == 4" class="cash-tag" src="../../assets/images/ticketlist/business.png" alt="tag">
                            <img v-else-if="item.type == 2" class="cash-tag" src="../../assets/images/ticketlist/member.png" alt="tag">
                            <img v-else src="../../assets/images/ticketlist/discount.png">
                            <div class="title-wrap">
                                <span class="title">
                                    {{item.title}}
                                </span>
                            </div>

                        </div>
                        <div class="middle-content">
                            <div class="tips flex space-between align-items-center">
                                <div class="tips-info" v-if="item.type == 4">
                                    <span class="des">Total Earn </span>
                                    <div class="flex content-start align-items-center">
                                        <span class="rs price">.Rs</span>
                                        <span class="price" v-if="flightOrder.returnFlight">
                                            <!-- {{Math.round(((flightOrder.departFlight.flightInfoBack.fee.fees[0].dis + flightOrder.returnFlight.flightInfoBack.fee.fees[0].dis + flightOrder.departFlight.airlineDIS + flightOrder.returnFlight.airlineDIS)*cbaPer + flightOrder.departFlight.flightInfoBack.fee.fees[index].n/2 + flightOrder.returnFlight.flightInfoBack.fee.fees[index].n/2)/numberOfPeople)}} -->
                                            <!-- {{Math.round(Math.round(flightOrder.returnFlight.flightInfoBack.fee.fees[0].dis + flightOrder.returnFlight.airlineDIS) * cbaPer + flightOrder.returnFlight.flightInfoBack.fee.fees[index].n/2}} -->
                                            {{(Math.round((flightOrder.departFlight.flightInfoBack.fee.fees[0].dis + flightOrder.departFlight.airlineDIS) * cbaPer) + flightOrder.departFlight.flightInfoBack.fee.fees[index].n/2 + Math.round((flightOrder.returnFlight.flightInfoBack.fee.fees[0].dis + flightOrder.returnFlight.airlineDIS) * cbaPer + flightOrder.returnFlight.flightInfoBack.fee.fees[index].n/2))/numberOfPeople}}
                                        </span>
                                        <span class="price" v-else>
                                            {{Math.round(flightOrder.departFlight.flightInfoBack.fee.fees[index].cba/numberOfPeople)}}
                                        </span>
                                    </div>
                                </div>

                                <div class="tips-info" v-if="item.type == 3">
                                    <span class="des">Total Earn </span>
                                    <div class="flex content-start align-items-center">
                                        <span class="rs price">.Rs</span>
                                        <span class="price" v-if="flightOrder.returnFlight">
                                            <!-- {{Math.round((flightOrder.departFlight.flightInfoBack.fee.fees[0].dis + flightOrder.returnFlight.flightInfoBack.fee.fees[0].dis + flightOrder.departFlight.airlineDIS + flightOrder.returnFlight.airlineDIS)*cbaPer/numberOfPeople)}}
                                                         -->
                                            {{typeThree()/numberOfPeople}}
                                        </span>
                                        <span class="price" v-else>
                                            {{Math.round(flightOrder.departFlight.flightInfoBack.fee.fees[index].cba/numberOfPeople)}}
                                        </span>
                                    </div>
                                </div>

                                <!--silver  -->
                                <div class="tips-info" v-else-if="item.type == 2">
                                    <span class="des">Total Discount</span>
                                    <div class="flex content-start align-items-center">
                                        <span class="rs price">.Rs</span>
                                        <span class="price" v-if="flightOrder.returnFlight">
                                            {{totalSilver(index)}}
                                        </span>

                                        <span class="price" v-else>
                                            {{totalSilver(index)}}
                                        </span>
                                    </div>

                                </div>

                                <div class="tips-info" v-else-if="item.type == 1">
                                    <span class="des">Total Discount</span>
                                    <div class="flex content-start align-items-center">
                                        <span class="rs price">.Rs</span>
                                        <span class="price" v-if="flightOrder.returnFlight">
                                            {{Math.round((flightOrder.departFlight.obfp + flightOrder.departFlight.ogst - flightOrder.departFlight.bfp - flightOrder.departFlight.gst + flightOrder.returnFlight.obfp + flightOrder.returnFlight.ogst - flightOrder.returnFlight.bfp - flightOrder.returnFlight.gst + flightOrder.departFlight.airlineDIS + flightOrder.returnFlight.airlineDIS)/numberOfPeople)}}
                                        </span>
                                        <span class="price" v-else>
                                            {{Math.round((flightOrder.departFlight.obfp + flightOrder.departFlight.ogst - flightOrder.departFlight.bfp - flightOrder.departFlight.gst )/numberOfPeople)}}
                                        </span>
                                    </div>
                                </div>

                                <div class="price-info flex content-start">
                                    <span class="rs">.Rs</span>
                                    <span>
                                        {{ticketPrice(item,index)}}
                                    </span>
                                </div>

                                <a href="javascript:;" @click="bookTicket(index)">Book</a>

                            </div>
                            <!-- <div class="old-info flex content-end" v-if="item.cba == 0">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <span class="rs">.Rs</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <del>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                {{oldPrice()}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </del>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div> -->
                            <!-- <div class="booking flex content-end">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div> -->
                        </div>
                        <div class="bottom-content flex space-between" v-show="item.cba > 0 || item.type == 2" @click="showTips(item,index)">
                            <div class="tag-list flex content-start align-items-center">
                                <img v-if="item.cba>0" src="./../../assets/images/ticketlist/cashback.png" alt="cashback">
                                <img v-if="item.sid" src="./../../assets/images/ticketlist/change.png" alt="change">
                                <img v-if="item.type == 2" src="./../../assets/images/ticketlist/member_tag.png" alt="">
                            </div>
                            <div class="tac flex align-items-center">
                                <span>T&C</span>
                                <img src="../../assets/images/ticketlist/arrow_g.png" alt="arrow">
                            </div>
                        </div>
                        <div class="tips-info-fold" ref="tipsFold">
                            <div class="tips-content" v-if="item.type == 2">
                                <div class="text">
                                    <h4>Terms & Conditions:</h4>
                                    <ol class="list">
                                        <li>
                                            <p>
                                                The total discount amount of Member Price
                                                <span class="rs">RS.</span>
                                                <span class="rs-price">{{totalSilver(index)}}</span> should be paid by Happy Silver only.
                                            </p>
                                        </li>
                                        <li>
                                            <p>Invoice will be issued as per the displayed price of
                                                <span class="rs">RS.</span>
                                                <span class="rs-price" v-if="flightOrder.returnFlight">
                                                    {{Math.round((item.bfp + item.gst + flightOrder.returnFlight.flightInfoBack.fee.fees[index].bfp + flightOrder.returnFlight.flightInfoBack.fee.fees[index].gst)/numberOfPeople)}}
                                                </span>
                                                <span class="rs-price" v-else>{{Math.round((item.bfp + item.gst)/numberOfPeople)}}</span>
                                            </p>
                                        </li>
                                        <li v-show="ifLogin">
                                            <p>
                                                You still have
                                                <span class="rs">RS.</span>
                                                <span class="rs-price">{{silverAcount}}</span> Happy Silver in your Happy Wallet Account
                                            </p>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <div class="tips-content" v-else>
                                <div class="text">
                                    <h4>Terms & Conditions:</h4>
                                    <ol class="list">
                                        <li>
                                            <p>
                                                <span class="rs">RS.</span>
                                                <span class="rs-price" v-if="flightOrder.returnFlight">{{Math.round((flightOrder.departFlight.flightInfoBack.fee.fees[index].cba*cbaPer + flightOrder.returnFlight.flightInfoBack.fee.fees[index].cba*cbaPer)/numberOfPeople)}}</span>
                                                <span class="rs-price" v-else>{{Math.round(item.cba/numberOfPeople)}}</span> will be transferred to your wallet instantly and will be activated after your flight
                                            </p>
                                        </li>
                                        <li>
                                            <p>Invoice will be issued as per the displayed price of
                                                <span class="rs">RS.</span>
                                                <span class="rs-price" v-if="flightOrder.returnFlight">
                                                    {{Math.round((item.bfp + item.gst + flightOrder.returnFlight.flightInfoBack.fee.fees[index].bfp + flightOrder.returnFlight.flightInfoBack.fee.fees[index].gst)/numberOfPeople)}}
                                                </span>
                                                <span class="rs-price" v-else>{{Math.round((item.bfp + item.gst)/numberOfPeople)}}</span>
                                            </p>
                                        </li>
                                        <li v-show="item.sid">
                                            <p>You can free to change your flight one time
                                            </p>
                                        </li>
                                        <li>
                                            <p>Cashback amount will be deducted if you cancel your order</p>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import headTop from "../../components/head/head"
import { GetFlightOrderUtil, TimeFormatUtil } from "../../models/utils"
import { Toast, Indicator, Button, Popup } from 'mint-ui';
import { CookieUtil } from '../../models/utils'
import { OnewayOrder, RoundTripOrder } from '../../models/flightorder'
import { Flight, FlightFactory } from '../../models/flight'
import * as XFlight from '../../vuex/models/flight/XFlight'
import * as OrderMutaionNames from '../../vuex/models/flightorder/MutationName.js'

import {
    DiscountItem, RoundTripDiscountManager, RoundTripCompanyDiscountPolicy, RoundTripUnionDiscountPolicy,
    RoundTripLadderPolicy
} from '../../models/aboutdiscount/'


export default {
    components: {
        headTop
    },
    data() {
        return {
            TimeFormatUtil,
            tipsFold: false,
            rtdPrice: 0,
            cbaPer: 0
        }
    },
    computed: {
        numberOfPeople() {
            let o = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);
            return o.adults.length + o.children.length + o.infants.length;

        },
        flightOrder: function() {
            return GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
        },
        // totalSilver() {
        //     if (this.flightOrder.returnFlight) {
        //         return Math.round(((-this.flightOrder.departFlight.flightInfoBack.fee.fees[1].sdis) + (-this.flightOrder.returnFlight.flightInfoBack.fee.fees[1].sdis) + this.flightOrder.departFlight.obfp + this.flightOrder.departFlight.ogst - this.flightOrder.departFlight.bfp - this.flightOrder.departFlight.gst + this.flightOrder.returnFlight.obfp + this.flightOrder.returnFlight.ogst - this.flightOrder.returnFlight.bfp - this.flightOrder.returnFlight.gst + this.flightOrder.departFlight.airlineDIS + this.flightOrder.returnFlight.airlineDIS) / this.numberOfPeople);
        //     } else {
        //         return Math.round(((-this.flightOrder.departFlight.flightInfoBack.fee.fees[1].sdis) + this.flightOrder.departFlight.obfp + this.flightOrder.departFlight.ogst - this.flightOrder.departFlight.bfp - this.flightOrder.departFlight.gst) / this.numberOfPeople);
        //     }
        // },
        ifLogin() {
            let cu = new CookieUtil(document);
            return cu.hasItem('uuid') ? true : false
        },
        silverAcount() {
            return sessionStorage.silver ? JSON.parse(sessionStorage.silver).happySilverBalance : 0
        }

    },
    methods: {
        typeThree(index) {
            var departP = Math.round((this.flightOrder.departFlight.flightInfoBack.fee.fees[0].dis + this.flightOrder.departFlight.airlineDIS) * this.cbaPer);
            var returnP = Math.round((this.flightOrder.returnFlight.flightInfoBack.fee.fees[0].dis + this.flightOrder.returnFlight.airlineDIS) * this.cbaPer);
            return departP + returnP;
        },
        totalSilver(index) {
            if (this.flightOrder.returnFlight) {
                return Math.round(((-this.flightOrder.departFlight.flightInfoBack.fee.fees[index].sdis) + (-this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].sdis) + this.flightOrder.departFlight.obfp + this.flightOrder.departFlight.ogst - this.flightOrder.departFlight.bfp - this.flightOrder.departFlight.gst + this.flightOrder.returnFlight.obfp + this.flightOrder.returnFlight.ogst - this.flightOrder.returnFlight.bfp - this.flightOrder.returnFlight.gst + this.flightOrder.departFlight.airlineDIS + this.flightOrder.returnFlight.airlineDIS) / this.numberOfPeople);
            } else {
                return Math.round(((-this.flightOrder.departFlight.flightInfoBack.fee.fees[index].sdis) + this.flightOrder.departFlight.obfp + this.flightOrder.departFlight.ogst - this.flightOrder.departFlight.bfp - this.flightOrder.departFlight.gst) / this.numberOfPeople);
            }
        },
        ticketPrice(item, index) {
            let price = 0;
            if (this.flightOrder.returnFlight) {
                if (this.flightOrder.departFlight.airlineDIS != 0 || this.flightOrder.returnFlight.airlineDIS != 0) {
                    if (this.flightOrder.departFlight.flightInfoBack.fee.fees[index].sdis || this.flightOrder.departFlight.flightInfoBack.fee.fees[index].cba == 0) {
                        price = Math.round((item.bfp + item.gst + this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].bfp + this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].gst - this.flightOrder.departFlight.airlineDIS - this.flightOrder.returnFlight.airlineDIS) / this.numberOfPeople);
                    } else {
                        price = Math.round((item.bfp + item.gst + this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].bfp + this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].gst) / this.numberOfPeople);
                    }
                } else {
                    price = Math.round((item.bfp + item.gst + this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].bfp + this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].gst) / this.numberOfPeople);
                }

            } else {
                price = Math.round((item.bfp + item.gst) / this.numberOfPeople);
            }
            this.rtdPrice = price;
            return price;
        },
        oldPrice() {
            let old = 0;
            if (this.flightOrder.returnFlight) {
                old = Math.round((this.flightOrder.departFlight.showPrice + this.flightOrder.returnFlight.showPrice) / this.numberOfPeople);
            } else {
                old = Math.round((this.flightOrder.departFlight.showPrice) / this.numberOfPeople);
            }
            return old;
        },
        showTips(item, index) {
            let allFlod = this.$refs.tipsFold;
            let tipsFlod = this.$refs.tipsFold[index];

            if (tipsFlod.style.display == 'block') {
                tipsFlod.style.display = 'none';
            } else {
                for (var i = 0; i < allFlod.length; i++) {
                    allFlod[i].style.display = 'none';
                }

                if (item.type == 1) {
                    return false;
                } else {
                    tipsFlod.style.display = 'block';
                }
            }
        },
        //checkPrice
        getResult(vueComp, token) {
            var self = this;
            var i = 0;
            if (i > 15) {
                return false;
            } else {
                vueComp.$store.getters.flightOrder.getCheckResult(vueComp, token).then(
                    function(res) {
                        if (res.code == 0 || res.code == 1) {
                            Indicator.close();
                            self.$router.push('/book')
                        } else {
                            i++;
                            setTimeout(function() {
                                self.getLoop(token)
                            }, 1500);
                        }
                    }
                )
            }

        },
        getLoop(token) {
            this.getResult(this, token)
        },
        saveParm(index) {
            let fee = this.flightOrder.departFlight.flightInfoBack.fee;
            let oRtd = this.flightOrder.departFlight.airlineDIS;
            let count = -(fee.obfp + fee.ogst - fee.bfp - fee.gst);

            if (fee.fees[index].type == 3 || fee.fees[index].type == 4) {

                this.flightOrder.returnCash = true;
                sessionStorage.returnCash = true;

                var feeO = {
                    obfp: fee.fees[index].bfp,
                    ogst: fee.fees[index].gst,
                    bfp: fee.fees[index].bfp - fee.fees[index].cba,
                    gst: fee.fees[index].gst,
                    intervalDiscount: fee.dType ? count : null,
                    policyDiscount: fee.dType ? null : count,
                    airCompanyDiscount: oRtd ? -oRtd : null
                }

            } else {
                var feeO = {
                    obfp: fee.obfp,
                    ogst: fee.ogst,
                    bfp: fee.fees[index].bfp,
                    gst: fee.fees[index].gst,
                    intervalDiscount: fee.dType ? count : null,
                    policyDiscount: fee.dType ? null : count,
                    airCompanyDiscount: oRtd ? -oRtd : null
                }
            }

            if (feeO.intervalDiscount != null) {
                fee.intervalDiscount = feeO.intervalDiscount;
            }
            if (feeO.policyDiscount != null) {
                fee.policyDiscount = feeO.policyDiscount;
            }
            if (feeO.airCompanyDiscount != null) {
                fee.airCompanyDiscount = feeO.airCompanyDiscount;
                this.flightOrder.departFlight.airCD = feeO.airCompanyDiscount;
            } else {
                this.flightOrder.departFlight.airCD = 0;
            }

            this.flightOrder.departFlight.flightInfoBack.feeO = feeO;

            this.flightOrder.departFlight.flightInfoBack.feee.feeStrings = [this.flightOrder.departFlight.stringsArr[index]];
            // this.flightOrder.departFlight.flightInfoBack.feee.feeStrings = [this.flightOrder.departFlight.flightInfoBack.feee.feeStrings[index]];

            this.flightOrder.departFlight.price = fee.fees[index].bfp + fee.fees[index].gst;

            if (this.flightOrder.returnFlight) {
                let feeR = this.flightOrder.returnFlight.flightInfoBack.fee;
                let rRtd = this.flightOrder.returnFlight.airlineDIS;
                let count = -(feeR.obfp + feeR.ogst - feeR.bfp - feeR.gst);
                if (feeR.fees[index].type == 3 || feeR.fees[index].type == 4) {
                    var feeO = {
                        obfp: feeR.fees[index].bfp,
                        ogst: feeR.fees[index].gst,
                        bfp: feeR.fees[index].bfp - feeR.fees[index].cba,
                        gst: feeR.fees[index].gst,
                        intervalDiscount: feeR.dType ? count : null,
                        policyDiscount: feeR.dType ? null : count,
                        airCompanyDiscount: oRtd ? -oRtd : null
                    }
                } else {
                    var feeO = {
                        obfp: feeR.obfp,
                        ogst: feeR.ogst,
                        bfp: feeR.fees[index].bfp,
                        gst: feeR.fees[index].gst,
                        intervalDiscount: feeR.dType ? count : null,
                        policyDiscount: feeR.dType ? null : count,
                        airCompanyDiscount: rRtd ? -rRtd : null
                    }
                }

                if (feeO.intervalDiscount != null) {
                    fee.intervalDiscount = feeO.intervalDiscount;
                }
                if (feeO.policyDiscount != null) {
                    fee.policyDiscount = feeO.policyDiscount;
                }
                if (feeO.airCompanyDiscount != null) {
                    fee.airCompanyDiscount = feeO.airCompanyDiscount;
                    this.flightOrder.returnFlight.airCD = feeO.airCompanyDiscount;
                } else {
                    this.flightOrder.returnFlight.airCD = 0;
                }

                this.flightOrder.returnFlight.flightInfoBack.feeO = feeO;
                // this.flightOrder.returnFlight.flightInfoBack.feee.feeStringsArr = this.flightOrder.returnFlight.flightInfoBack.feee.feeStrings;
                this.flightOrder.returnFlight.flightInfoBack.feee.feeStrings = [this.flightOrder.returnFlight.stringsArr[index]];

                this.flightOrder.returnFlight.price = feeR.fees[index].bfp + feeR.fees[index].gst;

                let dn = this.flightOrder.departFlight.flightNumber;
                let rn = this.flightOrder.returnFlight.flightNumber;
                this.flightOrder.rtd = {
                    o: {},
                    r: {}
                }
                this.flightOrder.rtd.o[dn] = oRtd;
                this.flightOrder.rtd.r[rn] = rRtd;
            }

            GetFlightOrderUtil.setOrderIntoSession(this.flightOrder, sessionStorage)
            this.$store.commit(OrderMutaionNames.setupOrder, this.flightOrder);
            Indicator.close();
        },
        bookTicket(index) {
            let flightCba = this.flightOrder.departFlight.flightInfoBack.fee.fees[index].cba;
            if (flightCba > 0 || index == 1) {
                let cu = new CookieUtil(document);
                if (!cu.hasItem('uuid')) {
                    this.$router.push('/login');
                    return false;
                }
            }
            sessionStorage.setItem('isSilver', false)

            if (index == 1) {
                // sessionStorage.setItem('isSilver', true)
                if (this.silverAcount < this.totalSilver(index)) {
                    Toast('you don\'t have enough HappySilver')
                    return false;
                }

            }
            // Indicator.open({
            //     spinnerType: 'fading-circle'
            // });
            let self = this;
            this.flightOrder.returnCash = false;
            sessionStorage.returnCash = false;
            // this.saveParm(index);
            var fd = this.flightOrder.departFligh;
            var fr = this.flightOrder.returnFlight;
            this.flightOrder.departFlight.flightInfoBack.sid = this.flightOrder.departFlight.flightInfoBack.fee.fees[index].sid;
            if (this.flightOrder.returnFlight) {
                this.flightOrder.returnFlight.flightInfoBack.sid = this.flightOrder.returnFlight.flightInfoBack.fee.fees[index].sid;
            }

            self.saveParm(index);

            self.$router.push('/book');

            // this.flightOrder.checkPrice(this)
            //     .then(function(res) {
            //         var token = 'token=' + res.token;
            //         if (res.code == 0 || res.code == 1) {
            //             if (index == 1) {
            //                 var info = {
            //                     tradeType: 2,
            //                     tradeAmount: self.totalSilver
            //                 };
            //                 sessionStorage.setItem('silverInfo', JSON.stringify(info));
            //             }
            //             self.$router.push('/book');
            //         }
            //         let order = self.$store.getters.flightOrder;
            //         let orderJson = order.toJSON()
            //         let orderStr = JSON.stringify(orderJson)
            //         sessionStorage.order = orderStr

            //     }).catch(function(err) {
            //         Indicator.close();

            //         console.log(err)
            //     })
        },
        cleanParm() {
            sessionStorage.removeItem('silverInfo');
        }
    },
    created() {
        let ifReload = this.$store.state.flihgt.allFlight;
        // var self = this;
        if (!ifReload) {
            Toast({
                message: 'infomation expired',
                duration: 2000
            })
            setTimeout(() => {
                this.$router.push('/home');
            }, 2000)
        }

        var order = this.flightOrder;
        if (order == 'undefined') {
            Toast({
                message: 'infomation expired',
                duration: 2000
            })
            setTimeout(function() {
                _self.$router.push('/home')
            }, 2000)
        }
        if (order.returnFlight) {
            if (order.departFlight.airlineDIS != 0 || order.returnFlight.airlineDIS != 0) {
                order.ifRTD = true;
                var tdCash = (order.departFlight.flightInfoBack.fee.obfp - order.departFlight.flightInfoBack.fee.bfp + order.departFlight.airlineDIS) * 0.82;
                var dfeeList = order.departFlight.flightInfoBack.fee.fees;
                dfeeList[1].cba = tdCash;
                dfeeList[2].cba = tdCash;
                if (dfeeList[3]) {
                    dfeeList[3].cba = tdCash + Math.round(dfeeList[3].n / 2);
                }

                var rtCash = (order.returnFlight.flightInfoBack.fee.obfp - order.returnFlight.flightInfoBack.fee.bfp + order.returnFlight.airlineDIS) * 0.82;
                var rfeeList = order.returnFlight.flightInfoBack.fee.fees;
                rfeeList[1].cba = rtCash;
                rfeeList[2].cba = rtCash;
                if (rfeeList[3]) {
                    rfeeList[3].cba = rtCash + Math.round(rfeeList[3].n / 2);
                }
            } else {
                order.ifRTD = false;
            }
            GetFlightOrderUtil.setOrderIntoSession(order, sessionStorage);
            this.$store.commit(OrderMutaionNames.setupOrder, order);

            // 计算往返cbd
            this.cbaPer = this.flightOrder.departFlight.flightInfoBack.fee.cbd;
        }

    },
    mounted() {
        console.log(this.flightOrder)
        this.cleanParm();
    }
}
</script>
<style lang="less" scoped>
.header {
    background: #0b9d78;
    i {
        display: block;
        color: #fff;
        font-size: 0.8rem;
    }
    .title {
        font-size: 0.768rem;
    }
    .sp {
        opacity: 0;
    }
}

.container {
    .info-content {
        margin-top: 2.89rem;
        border-bottom: 0.21rem solid #ebebeb;
        .ticket-info {
            box-sizing: border-box;
            width: 14.72rem;
            margin: 0.426rem 0.64rem 0.85rem 0.64rem;
            border: 1px solid #666666;
            border-radius: 4px;
            .info-top,
            .info-middle,
            .info-bottom,
            .info-bottom-b {
                padding: 0 0.64rem;
            }
            .info-top {
                margin-top: 0.32rem;
                .flight-title {
                    width: 50%;
                    img,
                    span {
                        display: block;
                    }
                    img {
                        padding-right: 0.5rem;
                    }
                    span {
                        font-size: 0.512rem;
                    }
                    .date {
                        color: #999;
                    }
                    .icon {
                        width: 1.07rem;
                        height: 1.07rem;
                    }
                    .go,
                    .back {
                        width: 0.8rem;
                    }
                }
            }
            .info-middle {
                font-size: 1.536rem;
                padding-top: 0.32rem;
                .split {
                    width: 30%;
                    .last {
                        font-size: 0.512rem;
                    }
                    div {
                        margin: 0 0.2rem;
                        width: 1rem;
                        border-bottom: 1px dashed #787878;
                    }
                    .line-l {
                        margin-right: 0.1rem;
                    }
                    .line-r {
                        margin-left: 0.1rem;
                    }
                }
                span {
                    display: block;
                    color: #333;
                }
                .depart {
                    text-align: right;
                }
                .return {
                    text-align: left;
                }
            }
            .info-bottom {
                padding-top: 0.3rem;
                span {
                    width: 35%;
                    display: block;
                    font-size: 0.512rem;
                    color: #666;
                }
                .depart {
                    text-align: right;
                }
                .return {
                    text-align: left;
                }
                .last {
                    width: 30%;
                }
            }
            .info-bottom-b {
                padding-top: 0.3rem;
                padding-bottom: 0.512rem;
                .da,
                .aa {
                    font-size: 0.512rem;
                    width: 35%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #999;
                }
                .split {
                    width: 30%;
                }
                .da {
                    text-align: right;
                }
                .aa {
                    text-align: left;
                }
            }
            .line-stop {
                box-sizing: border-box;
                margin: 0 auto;
                width: 90%;
                height: 20px;
                .line {
                    width: 35%;
                    border-bottom: 1px solid #9dd8c9;
                }
                .laytime {
                    display: block;
                    width: 35%;
                    font-size: 0.512rem;
                }
            }
        }
    }
    .ticket-list-content {
        padding: 0.64rem;
        .title {
            padding-bottom: 0.64rem;
            span {
                display: block;
                font-size: 0.597rem;
            }
            .line {
                width: 4.9rem;
                border-bottom: 1px dashed #555555;
            }
        }
        .ticket-list {
            .list-group {
                box-sizing: border-box;
                position: relative; // overflow: hidden;
                width: 14.72rem; // height: 5.55rem;
                border: 1px solid #0b9d78;
                border-radius: 4px;
                margin-bottom: 0.426rem;
                .top-content {
                    height: 1.06rem;
                    border-bottom: 1px solid #0b9d78;
                    .title-wrap {
                        width: 65%;
                        text-align: center;
                        .title {
                            display: block;
                            font-size: 0.64rem;
                            padding-bottom: 0; // padding-left: 2.9rem;
                        }
                    }

                    img {
                        display: block;
                        width: 35%;
                        height: 1.25rem;
                        margin-left: -1px;
                        margin-top: -2px;
                    }
                }
                .middle-content {
                    padding-top: 0.768rem;
                    margin: 0.21rem;
                    .tips {
                        padding-bottom: 0.32rem;
                        .tips-info {
                            width: 28%;
                            padding-left: 0.64rem;
                            text-align: left;
                            .des {
                                font-size: 0.42rem;
                            }
                            .price {
                                font-size: 0.597rem;
                                color: #f65858;
                            }
                            .rs {
                                padding-left: 0.1rem;
                                margin-top: 0.15rem;
                            }
                            span {
                                display: block;
                                vertical-align: top;
                            }
                        }
                        .price-info {
                            font-size: 0.85rem;
                            padding-right: 0.64rem;
                            .rs {
                                margin-top: 0.1rem;
                            }
                        }
                        span {
                            display: block;
                        }
                        a {
                            display: block;
                            width: 2.56rem;
                            height: 1.06rem;
                            line-height: 1.06rem;
                            margin: 0 0.64rem 0 0;
                            background: #ffad3d;
                            border-radius: 2px;
                            color: #fff;
                            font-size: 0.512rem;
                            font-weight: bold;
                        }
                    }
                    .old-info {
                        font-size: 0.64rem;
                        padding-right: 0.64rem;
                        color: #999;
                        .rs {
                            margin-top: 0.05rem;
                        }
                    }
                    .booking {
                        padding-bottom: 0.64rem;
                        a {
                            display: block;
                            width: 2.56rem;
                            height: 1.06rem;
                            line-height: 1.06rem;
                            margin: 0.326rem 0.64rem 0 0;
                            background: #ffad3d;
                            border-radius: 2px;
                            color: #fff;
                            font-size: 0.512rem;
                            font-weight: bold;
                        }
                    }
                }
                .bottom-content {
                    height: 1.2rem;
                    margin: 0 0.21rem;
                    border-top: 1px dashed #0b9d78;
                    .tag-list {
                        height: 100%;
                        width: 60%;
                        padding-left: 0.64rem;
                        img {
                            // width: 2.56rem;
                            height: 0.7rem;
                            padding-right: 0.3rem;
                        }
                    }
                    .tac {
                        font-size: 0.555rem;
                        padding-right: 0.83rem;
                        img {
                            display: block;
                            width: 0.5rem;
                            padding-left: 0.1rem;
                        }
                    }
                }
                .tips-info-fold {
                    background: #f3faf8;
                    display: none;
                    .tips-content {
                        margin: 0 0.21rem;
                        font-size: 0.426rem;
                        border-top: 1px dashed #0b9d78;
                        .text {
                            padding: 0.32rem 0.64rem;
                            text-align: left;
                            line-height: 1.5;
                            .rs,
                            .rs-price {
                                color: red;
                            }
                            .list {
                                margin-left: 0.64rem;
                                list-style-type: disc;
                            }
                        }
                    }
                }
            } // .cash-tag {
            //     display: block;
            //     position: absolute;
            //     height: 1.06rem;
            //     top: -1px;
            //     left: -1px;
            // }
        }
    }
}
</style>
