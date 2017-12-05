<template>
    <div class="wrapper">
        <head-top class="header">
            <i slot="left" class="iconfont icon-back" @click="$router.go(-1)"></i>
            <span slot="title">{{heads.title}}</span>
            <img class="placeholder" slot="right" :src="heads.img" alt="">
        </head-top>
        <mt-popup v-model="showPopup" popup-transition="popup-fade" modal="true" closeOnClickModal="false">
            <failure>
                <div slot="head">birthday information is invalid</div>
                <div slot="content">
                    <p>1.Adult's date of birth has to be above 12 years at the time of travel.</p>
                    <p>2.Child's date of birth has to be under 12 years at the time of travel.</p>
                    <p>3.Infant's date of birth has to be under 2 years at the time of travel.</p>
                </div>
                <mt-button @click="showPopup=false" slot="btn" class="btn" type="default">Ok</mt-button>
            </failure>
        </mt-popup>
        <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
            <router-view class="animated"></router-view>
        </transition>
        <div class="container">
            <div class="page-1">
                <div class="title flex content-start align-items-center">
                    <span class="title-icon"></span>
                    <span>Review your booking</span>
                </div>
                <div v-for="(info, index) in flightInfos" :key="info.id" :class="tripClass(index)">
                    <div class="trip-wrapper">
                        <div class="trip-cont">
                            <div v-for="(item,i) in info.flight.stops" :key="item.id">
                                <div class="trip-num">
                                    <span class="title-img">
                                        <img :src="item.airline.iconPath" />
                                    </span>
                                    <span>{{item.airline.name}}&nbsp;&nbsp;&nbsp;{{item.flightNumber}}</span>
                                </div>
                                <div class="time-info flex space-between">
                                    <div class="from-time">
                                        <h2>
                                            <span>{{item.departAirportName}}</span>
                                            <span>{{TimeFormatUtil.getDisplayHourAndMinute(new Date(item.departDate))}}</span>
                                        </h2>
                                        <div>
                                            <span>{{TimeFormatUtil.getBookDetailDate(new Date(item.departDate))}}</span>
                                        </div>
                                        <div>
                                            <span>{{item.departAirport.replace(/_/g,' ')}}</span>
                                        </div>
                                    </div>
                                    <div class="distance">
                                        <span>{{item.waitTime}}</span>
                                    </div>
                                    <div class="to-time from-time">
                                        <h2>
                                            <span>{{item.arrivalAirportName}}</span>
                                            <span>{{TimeFormatUtil.getDisplayHourAndMinute(new Date(item.returnDate))}}
                                                <i v-show="info.flight.durationDays!=0">&nbsp;+{{info.flight.durationDays}}</i>
                                            </span>
                                        </h2>
                                        <div>
                                            <span>{{TimeFormatUtil.getBookDetailDate(new Date(item.returnDate))}}</span>
                                        </div>
                                        <div>
                                            <span>{{item.arrivalAirport.replace(/_/g,' ')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="trip-attach sp">
                                <div class="rules flex space-between">
                                    <span>{{flightOrder.departFlight.refundable? 'Refundable' : 'Non-Refundable'}}</span>
                                    <a @click='fareRule(index)' v-show='info.flight.refundable'>Fare Rules</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="trip-attach" v-if="flightOrder!=null">
                    <div class="baggage-tit">
                        <span>Baggage info</span>
                    </div>
                    <div class="baggage-info" v-for="info in flightOrder.baggageinfo" :key="info.id">
                        <h2>{{info.flightNumber}}</h2>
                        <div class="flex space-between">
                            <span>Check in</span>
                            <span>{{info.ch}} kg</span>
                        </div>
                        <div class="flex space-between">
                            <span>Cabin</span>
                            <span>{{info.ca}} kg</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-2">
                <div class="title flex content-start align-items-center">
                    <span class="title-icon"></span>
                    <span class="title-info">Traveller Details</span>
                </div>
                <div class="traveller-wrapper">
                    <div class="traveller-info" v-if="flightOrder!=null">
                        <div class="traveller-tips flex space-between">
                            <span class="traveller-tips-title">Traveller Information</span>
                            <div class="traveller-tips-total">
                                <span v-if="flightOrder.adults.length > 1">
                                    {{flightOrder.adults.length}}Adults
                                </span>
                                <span v-else>
                                    {{flightOrder.adults.length}}Adult
                                </span>
                                <span v-if="flightOrder.children.length > 1">
                                    {{flightOrder.children.length}}Children
                                </span>
                                <span v-else>
                                    {{flightOrder.children.length}}Child
                                </span>
                                <span v-if="flightOrder.infants.length > 1">
                                    {{flightOrder.infants.length}}Infants
                                </span>
                                <span v-else>
                                    {{flightOrder.infants.length}}Infant
                                </span>
                            </div>
                        </div>
                        <span class="traveller-title" v-if="flightOrder.adults.length > 1">Adults</span>
                        <span class="traveller-title" v-else>Adult</span>
                        <div class="traveller-form" ref="adults" v-for="(item,index) in flightOrder.adults" :key="item.id">
                            <div class="passenger-from flex space-between align-items-center">
                                <span class="group-title">Name</span>
                                <input class="sp ot" type="text" v-model="adultsFormDetail[index].firstname" placeholder="First name">
                                <input class="ot" type="text" v-model="adultsFormDetail[index].lastname" placeholder="Last name">
                                <span class="title-wrap ot">
                                    {{adultsFormDetail[index].title}}
                                    <select name="sex" v-model="adultsFormDetail[index].title" class="passager-detail-sex">
                                        <option v-for="item in passengerSex" :key='item.id' :value="item">
                                            {{item}}
                                        </option>
                                    </select>
                                </span>

                            </div>
                            <div class="date-form" v-if="needDate">
                                <div class="form-group flex space-between align-items-center">
                                    <label for="date-pick">Birthday
                                    </label>
                                    <span class="ot">
                                        <!-- {{showAdultsBirthDate||'choose your birthday'}} -->
                                        {{adultsFormDetail[index].birthday||'Day/Month/Year'}}
                                        <input v-model="adultsFormDetail[index].birthday" class="date-pick" type="date">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="traveller-info" v-if="flightOrder!=null && flightOrder.children.length > 0">
                        <span class="traveller-title" v-if="flightOrder.children.length > 1">Children</span>
                        <span class="traveller-title" v-else>child</span>
                        <div class="traveller-form" ref="children" v-for="(item,index) in flightOrder.children" :key="item.id">
                            <div class="passenger-from flex space-between align-items-center">
                                <span class="group-title">Name</span>
                                <input class="ot" type="text" v-model="childrenFormDetail[index].firstname" placeholder="First name">
                                <input class="ot" type="text" v-model="childrenFormDetail[index].lastname" placeholder="Last name">
                                <span class="title-wrap ot">
                                    {{childrenFormDetail[index].title}}
                                    <select name="sex" v-model="childrenFormDetail[index].title" class="passager-detail-sex">
                                        <option v-for="item in passengerSex" :key='item.id' :value="item">
                                            {{item}}
                                        </option>
                                    </select>
                                </span>
                            </div>
                            <div class="date-form">
                                <div class="form-group flex space-between align-items-center">
                                    <label for="date-pick" class="group-title">Birthday
                                    </label>
                                    <span class="ot">
                                        {{childrenFormDetail[index].birthday||'Day/Month/Year'}}
                                        <input class="date-pick" type="date" v-model="childrenFormDetail[index].birthday">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="traveller-info" v-if="flightOrder!=null && flightOrder.infants.length > 0">
                        <span class="traveller-title" v-if="flightOrder.infants.length > 1">Infants</span>
                        <span class="traveller-title" v-else>Infant</span>
                        <div class="traveller-form" ref="infants" v-for="(item,index) in flightOrder.infants" :key="item.id">
                            <div class="passenger-from flex space-between align-items-center">
                                <span class="group-title">Name</span>
                                <input class="ot" type="text" v-model="infantsFormDetail[index].firstname" placeholder="First name">
                                <input class="ot" type="text" v-model="infantsFormDetail[index].lastname" placeholder="Last name">
                                <span class="title-wrap ot">
                                    {{infantsFormDetail[index].title}}
                                    <select name="sex" v-model="infantsFormDetail[index].title" class="passager-detail-sex">
                                        <option v-for="item in passengerSex" :key='item.id' :value="item">
                                            {{item}}
                                        </option>
                                    </select>
                                </span>
                            </div>
                            <div class="date-form">
                                <div class="form-group flex space-between align-items-center">
                                    <label for="date-pick" class="group-title">Birthday
                                    </label>
                                    <span class="ot">
                                        {{infantsFormDetail[index].birthday||'Day/Month/Year'}}
                                        <input class="date-pick" type="date" v-model="infantsFormDetail[index].birthday">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>Contact Information</h2>
                    <div class="contact-info">
                        <ul>
                            <li class="flex content-start align-items-center">
                                <!-- <select name="" id="cS" v-model="contactSex">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <option v-for="item in contactSexList" :key="item.id" :value="item">{{item}}</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </select> -->
                                <input class="ot" type="text" placeholder="Contact Name" v-model="contactName" name="contactName" id="contactName">
                            </li>
                            <li class="flex content-start align-items-center">
                                <input class="ot" type="text" placeholder="Email Address" v-model="email" name="email" id="email">
                            </li>
                            <li class="flex content-start align-items-center">
                                <input class="ot" type="text" placeholder='Mobile Number' v-model.number="mobile" name="mobile" id="mobile">
                            </li>
                        </ul>
                    </div>
                    <p class="tips">Your Ticket Info will be sent through Email or Mobile</p>
                </div>

            </div>
            <div class="page-3" v-if="allowGST">
                <div class="title flex content-start align-items-center">
                    <span class="icon-title"></span>
                    <span class="icon-info">GST Information</span>
                </div>
                <div class="form-group sp" @click="gstOpen">
                    <!-- <input @click="gstOpen" type="checkbox" id="check"> -->
                    <div class="round1">
                        <div :class="{round2:isGST}"></div>
                    </div>
                    <label :class="{changeC:isGST}" class="checkinfo" for="check">I have a GST number(optional)</label>
                </div>
                <div class="container" v-show="isGST">
                    <form action="">
                        <div class="form-group">
                            <input type="text" placeholder="GST Number" v-model="ordersGSTInfo.registrationNumber">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Company Name" v-model="ordersGSTInfo.registeredCompanyName">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Bussiness Email ID" v-model="ordersGSTInfo.email">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Company Address" v-model="ordersGSTInfo.registeredCompanyAddress">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Phone Number" v-model="ordersGSTInfo.phone">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="India" v-model="ordersGSTInfo.country">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Haryana" v-model="ordersGSTInfo.state">
                        </div>
                    </form>
                </div>
            </div>
            <div class="page-4">
                <div class="offers">
                    <div class="title flex content-start align-items-center">
                        <span class="icon-title"></span>
                        <span class="icon-info">Happy Easy Go Offers</span>
                    </div>
                    <div class="offers-wrapper">
                        <div class="offers-group">
                            <div class="radio-group flex content-start align-items-center" @click="radio1">
                                <div class="round1">
                                    <div :class="{round2:isSelecA}"></div>
                                </div>
                                <p :class="{yellow:isSelecA}">Get Instant Discount with Coupon</p>
                            </div>
                            <div class="input-group flex content-start">
                                <input type="text" ref="coupon" v-model="couponCode" :class="{yellowborder:isSelecA}">
                                <a :class="{cheked:isSelecA,disabel:!isSelecA}" href="javascript:" @click="applyCode">Apply code</a>
                            </div>
                        </div>
                        <div class="offers-group" v-show="false">
                            <div class="radio-group flex content-start align-items-center" @click="radio2">
                                <div class="round1">
                                    <div :class="{round2:isSelecB}"></div>
                                </div>
                                <p :class="{yellow:isSelecB}">Get Instant Discount with Happy Silver Rs. 0</p>
                            </div>
                        </div>
                        <div class="offers-group" v-show="false">
                            <div class="radio-group flex content-start align-items-center" @click="radio3">
                                <div class="round1">
                                    <div :class="{round2:isSelecC}"></div>
                                </div>
                                <p :class="{yellow:isSelecC}">Use my Happy Gold
                                    <span>Rs.</span>
                                </p>
                            </div>
                            <div class="input-group flex content-start align-items-center">
                                <!-- <input type="text" ref="gold" v-model="useGold" disabled="true" :class="{yellowborder:isSelecC}"> -->
                                <a :class="{cheked:isSelecC,disabel:!isSelecC}" href="javascript:">Submit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-5">
                <div class="title flex content-start align-items-center">
                    <span class="icon-title"></span>
                    <span class="icon-info">Grand Total</span>
                </div>
                <div class="price-info">
                    <div class="total-price" v-if="ifCashback">
                        <span class="price">
                            <span class="rs">RS.</span>{{fullPrice}}
                        </span>
                    </div>
                    <div class="total-price" v-else>
                        <span class="price">
                            <span class="rs">RS.</span>{{payPrice}}
                        </span>
                        <span class="old-price">
                            <del>
                                <span class="rs">RS.</span>{{fullPrice}}
                            </del>
                        </span>
                    </div>
                    <div class="otp-info" v-show="needOtp">
                        <div class="phone flex space-between">
                            <span>Tel: {{userPhone}}
                            </span>
                            <a class="send" href="javascript:;" @click="getOtp()">
                                {{submit}}
                            </a>
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="please input Otp code" v-model="otp">
                        </div>
                    </div>
                    <div class="agreement flex content-start align-items-center">
                        <input type="checkbox" checked="checked" v-model="agreeTC" @click="agreeTC=!agreeTC">
                        <span> I agree with the
                            <span class="link" @click="$router.push('/agreement')">Terms& Conditions</span>of Happy Easy Go</span>
                    </div>
                    <a class="confirm" @click="confirmBook" href="javascript:">Confirm</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import { TimeFormatUtil, GetFlightOrderUtil } from '../../models/utils'
// import Toast from 'mint-ui/lib/toast';
import { Toast, Popup, Indicator } from 'mint-ui';
import { mapMutations } from 'vuex'
import { mutaionNames } from '../../vuex'
import { FlightOrder, OnewayOrder, RoundTripOrder } from '../../models/flightorder'
import { Coupon } from '../../models/discount'
import * as mutationNames from '../../vuex/models/flightorder/MutationName.js'
import * as OrderMutaionNames from '../../vuex/models/flightorder/MutationName.js'
import { DomainManager } from '../../config/DomainManager.js'
import { CookieUtil } from '../../models/utils'
import failure from 'pages/failure/failure.vue'

export default {
    components: {
        headTop,
        failure
    },
    data() {
        return {
            //page1
            showFare: false,
            isSelecA: false,
            isSelecB: false,
            isSelecC: false,
            heads: {
                img: require('../../assets/images/flight-prev.png'),
                title: 'Book',
                img2: require('../../assets/images/book/p.png')
            },
            forms: [
                {
                    title: 'Name',
                    placeholder: 'Enter your name',
                    type: 'text'
                },
                {
                    title: 'Mobile',
                    placeholder: 'Enter your Mobile',
                    type: 'text'
                },
                {
                    title: 'Email',
                    placeholder: 'Enter your emails',
                    type: 'text'
                }
            ],
            durationDays: 0,
            couponCode: '',
            isChange: false,
            TimeFormatUtil,
            //page2
            mobile: "",
            email: "",
            contactName: "",
            contactSex: 'Title',
            contactSexList: ['Title', 'Male', 'Female'],
            showPopup: false,
            errorMassages: "",
            passengerType: {
                adults: 'adults',
                children: 'children',
                infants: 'infants'
            },
            passengerSex: ['Gender', 'Male', 'Female'],
            datePick: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate()
            },
            adultsFormDetail: [],
            childrenFormDetail: [],
            infantsFormDetail: [],
            //page3
            isGST: false,
            isSelectGST: false,
            ordersGSTInfo: {
                country: "India",
                email: '',
                phone: '',
                registeredCompanyAddress: '',
                registeredCompanyName: '',
                registrationNumber: '',
                state: "Haryana"
            },
            needDate: false,
            ifCashback: false,
            ifChecked: false,
            agreeTC: true,
            allowGST: true,
            allow: true,
            needOtp: false,
            userPhone: '',
            otp: '',
            submit: 'Send'
        }
    },
    created: function() {
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
        let order = this.flightOrder;
        for (let i = 0; i < order.adults.length; i++) {
            let item = { firstname: '', lastname: '', title: 'Gender', birthday: null };
            this.adultsFormDetail.push(item);
        }

        for (let i = 0; i < order.children.length; i++) {
            let item = { firstname: '', lastname: '', title: 'Gender', birthday: null };
            this.childrenFormDetail.push(item);
        }

        for (let i = 0; i < order.infants.length; i++) {
            let item = { firstname: '', lastname: '', title: 'Gender', birthday: null };
            this.infantsFormDetail.push(item);
        }

        if (JSON.parse(sessionStorage.returnCash)) {
            this.ifCashback = true;
        } else {
            this.ifCashback = false;
        }

        if (sessionStorage.isSilver) {
            this.needOtp = JSON.parse(sessionStorage.isSilver);
        }

        if (sessionStorage.user) {
            this.userPhone = JSON.parse(sessionStorage.user).cellphone;
        }

        sessionStorage.setItem('needOtp', true);
    },
    computed: {
        //page1
        ifCash() {
            let se = sessionStorage.returnCash;
            return se;
        },
        flightOrder() {
            let order = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
            return order
        },
        travellerNum() {
            let order = this.flightOrder
            if (order != null) {
                let adultNum = this.flightOrder.adults.length
                let childNum = this.flightOrder.children.length
                let infantsNum = this.flightOrder.infants.length
                return (adultNum + childNum + infantsNum)
            } else {
                return 0
            }
        },
        flightInfos() {
            let res = []
            let order = this.flightOrder
            if (order != null) {
                res.push({
                    flight: order.departFlight,
                    departAirport: order.departAirport,
                    destinationAirport: order.destinationAirport
                })
                if (this.flightOrder instanceof RoundTripOrder) {
                    res.push({
                        flight: order.returnFlight,
                        departAirport: order.destinationAirport,
                        destinationAirport: order.departAirport
                    })
                }
            }
            return res
        },
        travellersDescriptionStr() {
            let adultsNum = this.flightOrder.adults.length
            let childrenNum = this.flightOrder.children.length
            let infantsNum = this.flightOrder.infants.length

            let adultsDes = adultsNum == 0 ? '' : adultsNum + ' adult(s) '
            let childrenDes = ''
            if (childrenNum != 0) {
                if (childrenNum == 1) {
                    childrenDes = 1 + ' child '
                } else {
                    childrenDes = childrenNum + ' children '
                }
            }
            let infantsDes = infantsNum == 0 ? '' : infantsNum + 'infant(s)'

            return adultsDes + childrenDes + infantsDes
        },
        payPrice() {
            var d = this.flightOrder.departFlight.flightInfoBack.fee;
            if (sessionStorage.flightType == 'one') {
                return this.isSelecA ? d.bfp + d.gst - this.flightOrder.departFlight.couponDiscount : d.bfp + d.gst;
            } else {
                var r = this.flightOrder.returnFlight.flightInfoBack.fee;

                if (this.flightOrder.ifRTD) {
                    if (!this.flightOrder.returnCash) {
                        return this.isSelecA ? d.bfp + d.gst + r.bfp + r.gst - this.flightOrder.departFlight.couponDiscount - this.flightOrder.returnFlight.couponDiscount - this.flightOrder.departFlight.airlineDIS - this.flightOrder.returnFlight.airlineDIS : d.bfp + d.gst + r.bfp + r.gst - this.flightOrder.departFlight.airlineDIS - this.flightOrder.returnFlight.airlineDIS;
                    }
                } else {
                    return this.isSelecA ? d.bfp + d.gst + r.bfp + r.gst - this.flightOrder.departFlight.couponDiscount - this.flightOrder.returnFlight.couponDiscount : d.bfp + d.gst + r.bfp + r.gst;
                }
            }


        },
        fullPrice() {
            if (sessionStorage.flightType == 'one') {
                return this.isSelecA ? this.flightOrder.departFlight.flightInfoBack.fee.obfp + this.flightOrder.departFlight.flightInfoBack.fee.ogst - this.flightOrder.departFlight.couponDiscount : this.flightOrder.departFlight.flightInfoBack.fee.obfp + this.flightOrder.departFlight.flightInfoBack.fee.ogst;
            } else {
                return this.isSelecA ? this.flightOrder.departFlight.flightInfoBack.fee.obfp + this.flightOrder.departFlight.flightInfoBack.fee.ogst + this.flightOrder.returnFlight.flightInfoBack.fee.obfp + this.flightOrder.returnFlight.flightInfoBack.fee.ogst - this.flightOrder.departFlight.couponDiscount - this.flightOrder.returnFlight.couponDiscount : this.flightOrder.departFlight.flightInfoBack.fee.obfp + this.flightOrder.departFlight.flightInfoBack.fee.ogst + this.flightOrder.returnFlight.flightInfoBack.fee.obfp + this.flightOrder.returnFlight.flightInfoBack.fee.ogst;
            }
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
        totalCount: {
            get: function() {
                let order = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
                let totalPrice = this.travelFee + this.taxFee;
                totalPrice += order.serviceFee;
                order.totalPrice = totalPrice;

                return this.ifCashback ? totalPrice : totalPrice - this.discount;;
            }
        }
    },
    watch: {
        waitCheck() {
            return this.ifChecked ? true : false;
        }
    },
    methods: {
        scrollTopforForm() {
            var formList = document.getElementsByClassName('ot');
            var top = document.getElementsByClassName('container')[0];
            var title = document.querySelector('.page-1 .title');

            var $mval = this.mobile;
            var $eval = this.email;
            var $nval = this.contactName;
            // var nreg = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;
            var nreg = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;
            var ereg = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/;
            for (var i of formList) {
                //不要删空格 会筛选不到 
                if (i.innerText == 'Day/Month/Year ') {
                    top.scrollTop = i.offsetTop - title.offsetTop - 5;
                    Toast({
                        message: 'Please choose the passenger‘s brithday',
                        duration: 2000
                    })
                    break;
                } else if (i.innerText == 'Gender ') {
                    top.scrollTop = i.offsetTop - title.offsetTop - 5;
                    Toast({
                        message: 'Please choose the passenger‘s gender',
                        duration: 2000
                    })
                    break;
                } else if (i.placeholder == 'First name') {
                    top.scrollTop = i.offsetTop - title.offsetTop - 5;
                    if (!nreg.test(i.value)) {

                        break;
                    }
                } else if (i.placeholder == 'Last name') {
                    top.scrollTop = i.offsetTop - title.offsetTop - 5;
                    if (!nreg.test(i.value)) {

                        break;
                    }
                } else if (i.id == 'contactName') {
                    top.scrollTop = i.offsetTop - title.offsetTop - 5;
                    if (i.value == '') {
                        Toast({
                            message: 'Please enter Contact Name',
                            duration: 2000
                        });
                        break;
                    }
                    if (!nreg.test($nval)) {
                        console.log(nreg.test($nval))
                        Toast({
                            message: 'Please enter correct Contact Name',
                            duration: 2000
                        });
                        break;
                    }

                } else if (i.id == 'email' && !ereg.test($eval)) {
                    top.scrollTop = i.offsetTop - title.offsetTop - 5;
                    if (i.value == '') {
                        Toast({
                            message: 'Please enter email address',
                            duration: 2000
                        })
                        break;
                    }
                    if (!ereg.test($eval)) {
                        Toast({
                            message: 'Please enter a valid email address',
                            duration: 2000
                        })
                        break;
                    }
                } else if (i.id == 'mobile') {
                    top.scrollTop = i.offsetTop - title.offsetTop - 5;
                    if (i.value == '') {
                        Toast({
                            message: 'Please enter the mobile number',
                            duration: 2000
                        })
                        break;
                    }
                    var ml = this.mobile + '';
                    if (ml.length != 10) {
                        Toast({
                            message: 'Please enter a valid mobile number ( 10 digital number allowed )',
                            duration: 2000
                        })
                        break;
                    }
                    // Toast({
                    //     message: 'Please enter a valid cell phone number',
                    //     duration: 2000
                    // })
                    // break;
                } else if (i.value == '') {
                    top.scrollTop = i.offsetTop - title.offsetTop - 5;
                    Toast({
                        message: 'Please complete the passenger information',
                        duration: 2000
                    })
                    break;
                }
            }
        },
        getOtp() {
            var self = this;
            if (self.submit != 'Send') {
                return false;
            }

            var btn = document.querySelector('.send');
            btn.style.backgroundColor = '#ccc';
            if (self.submit == 'Send') {
                self.submit = 60
            }

            this.flightOrder.getGSOtp(this).then(res => {
                if (res.success) {
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
        makeOrder() {
            let self = this;
            let flightOrder = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage);

            flightOrder.saveOrder(self).then((res) => {
                if (res.success) {
                    let flightOrder = GetFlightOrderUtil.getOrderFromSession(self, sessionStorage)
                    if (res.code == 0) {

                        sessionStorage.setItem('needOtp', res.hasVerifiedOtp);
                        sessionStorage.setItem('hasPhone', res.hasPhone);

                        flightOrder.orderNumber = res.orderId;
                        //Monitor code start
                        let oFlight = JSON.parse(sessionStorage.getItem('order'));
                        let arr = [];
                        for (let o in oFlight) {
                            let quantity = oFlight.adults.length + oFlight.children.length + oFlight.infants.length;
                            switch (o) {
                                case "departFlight":
                                case "returnFlight":
                                    let airportInfo = oFlight[o].stops[0].departAirportName;
                                    for (let el of oFlight[o].stops) {
                                        airportInfo += ('-' + el.arrivalAirportName);
                                    }
                                    if (oFlight[o].flightInfoBack.feeO.airCompanyDiscount) {
                                        var airDIS = -oFlight[o].flightInfoBack.feeO.airCompanyDiscount;
                                    } else {
                                        var airDIS = 0;
                                    }

                                    arr.push({
                                        'sku': oFlight[o].stops[0].flightNumber + "-" + oFlight[o].stops[0].departDate,
                                        'name': airportInfo,
                                        'category': oFlight[o].stops[0].flightNumber.slice(0, 2),
                                        'price': oFlight[o].price / quantity - airDIS,
                                        'quantity': quantity
                                    })
                                    break;
                            }
                        }
                        window.dataLayer.push({
                            'transactionId': flightOrder.orderNumber,
                            'transactionTotal': self.totalCount,
                            'transactionTax': self.taxFee,
                            'transactionShipping': flightOrder.serviceFee,
                            'transactionProducts': arr
                        })
                    } else if (res.code == 7) {
                        if (sessionStorage.flightType != '') {
                            Toast('Your session has expired.')
                            var type = sessionStorage.flightType;
                            type == 'one' ? self.$router.push('/oneway') : self.$router.push('/roundtrip');
                        } else {
                            Toast('Your session has expired.')
                            self.$router.push('/')
                        }
                    }
                    Indicator.close()
                    self.$router.push("/payment")
                } else {
                    if (res.code == 7) {
                        Indicator.close();
                        if (sessionStorage.flightType != '') {
                            Toast('Your session has expired.')
                            var type = sessionStorage.flightType;
                            type == 'one' ? self.$router.push('/oneway') : self.$router.push('/roundtrip');
                        } else {
                            Toast('Your session has expired.')
                            self.$router.push('/')
                        }
                    }
                }
            }).catch(err => {
                Indicator.close()
                Toast({
                    message: err.msg,
                    duration: 2000
                })
            })
        },
        confirmBook() {
            let order = this.flightOrder;
            let adults = order.adults;
            let children = order.children;
            let infants = order.infants;

            this.scrollTopforForm();

            if (!this.agreeTC) {
                Toast('Please agree to the terms.')
                return false;
            }

            if (this.needOtp) {
                if (this.otp == '') {
                    Toast('Please input Otp code')
                    return false;
                }
            }

            if (!this.allow) {
                Toast({
                    message: 'International flights are not allowed',
                    duration: 2500
                })
                return false;
            }

            if (this.isGST) {
                if (this.ordersGSTInfo.registrationNumber != "" &&
                    this.ordersGSTInfo.registeredCompanyName != "" &&
                    this.ordersGSTInfo.email != "" &&
                    this.ordersGSTInfo.registeredCompanyAddress != "" &&
                    this.ordersGSTInfo.registeredCompanyAddress != "" &&
                    this.ordersGSTInfo.phone != ""
                ) {
                    order.ordersGSTInfo = this.ordersGSTInfo;
                } else {
                    Toast('Please complete the GST information');
                    return false;
                }
            }
            for (let v in adults) {
                adults[v] = this.adultsFormDetail[v];
            }
            for (let v in children) {
                children[v] = this.childrenFormDetail[v];
            }
            for (let v in infants) {
                infants[v] = this.infantsFormDetail[v];
            }
            var nreg = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;

            for (let i = 0; i < adults.length; i++) {
                if (typeof (adults[i].firstname) == "undefined" || typeof (adults[i].lastname) == "undefined" || adults[i].firstname.trim() == "" || adults[i].lastname.trim() == "" || adults[i].title == 'Gender') {
                    // Toast({
                    //     message: 'Please complete the passenger information',
                    //     duration: 2000
                    // })
                    return
                }

                if (!nreg.test(adults[i].firstname)) {
                    Toast({
                        message: 'Please enter correct First Name',
                        duration: 2000
                    });
                    return false;
                }

                if (!nreg.test(adults[i].lastname)) {
                    debugger
                    Toast({
                        message: 'Please enter correct Last Name',
                        duration: 2000
                    });
                    return false;
                }

                if (adults[i].birthday == null && this.needDate) {
                    // Toast({
                    //     message: 'Please complete the passenger brithday',
                    //     duration: 2000
                    // })
                    return;
                }

                adults[i].firstname = this.adultsFormDetail[i].firstname;
                adults[i].lastname = this.adultsFormDetail[i].lastname;
                adults[i].symbel = "adult_" + i;
            }
            for (let i = 0; i < children.length; i++) {
                if (typeof (children[i].firstname) == "undefined" || typeof (children[i].lastname) == "undefined" || children[i].firstname.trim() == "" || children[i].lastname.trim() == "" || children[i].title == 'Gender') {
                    // Toast({
                    //     message: 'Please complete the passenger information',
                    //     duration: 2000
                    // })
                    return;
                }

                if (!nreg.test(children[i].firstname) || !nreg.test(children[i].lastname)) {
                    Toast({
                        message: 'Please enter correct Name',
                        duration: 2000
                    });
                    return false;
                }

                children[i].symbel = "child_" + i;
            }
            for (let i = 0; i < infants.length; i++) {
                if (typeof (infants[i].firstname) == "undefined" || typeof (infants[i].lastname) == "undefined" || infants[i].firstname.trim() == "" || infants[i].lastname.trim() == "" || infants[i].title == 'Gender') {
                    // Toast({
                    //     message: 'Please complete the passenger information',
                    //     duration: 2000
                    // });
                    return;
                }

                if (!nreg.test(infants[i].firstname) || !nreg.test(infants[i].lastname)) {
                    Toast({
                        message: 'Please enter correct Name',
                        duration: 2000
                    });
                    return false;
                }

                infants[i].symbel = "infants_" + i;
            }

            var $mval = this.mobile;
            var $eval = this.email;
            var $nval = this.contactName;


            var nregw = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;
            var ereg = /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/;
            // if (this.contactName.trim() == '') {
            //     Toast({
            //         message: 'Please enter correct Contact Name',
            //         duration: 1000
            //     });
            //     return
            // } else if (this.contactSex == 'Gender') {
            //     Toast({
            //         message: 'Please enter correct ContactTitle'
            //     })
            //     return
            // } else if (this.mobile.length < 10) {
            //     Toast({
            //         message: 'Mobile number is invalld',
            //         duration: 1000
            //     });
            //     return false
            // } else if (!mreg.test($mval)) {
            //     Toast({
            //         message: '',
            //         duration: 1000
            //     });
            //     return
            // } else if (!ereg.test($eval)) {
            //     Toast({
            //         message: 'Please enter correct Email Adress',
            //         duration: 1000
            //     });
            //     return

            var mlw = this.mobile + '';
            if (!nregw.test($nval)) {
                return false
            } else if (mlw.length != 10) {
                return false
            } else {
                let self = this;
                let contactInfo = order.contactInfo;

                contactInfo.cellphone = this.mobile;
                contactInfo.email = this.email;
                contactInfo.name = this.contactName;
                GetFlightOrderUtil.setOrderIntoSession(order, sessionStorage)
                Indicator.open({
                    spinnerType: 'fading-circle',
                    text: 'Checking the fare',
                });

                order.otp = self.otp;
                if (self.needDate || order.children.length != 0 || order.infants.length != 0) {
                    order.checkPassengerAge(self).then(res => {
                        if (!res.success) {
                            Indicator.close();
                            Toast({
                                message: 'age is wrong',
                                duration: 2500
                            })
                            return;
                        } else {
                            var stop = setInterval(function() {
                                var s = self.ifChecked;
                                if (self.ifChecked) {
                                    clearInterval(stop);
                                    self.makeOrder();
                                }
                            }, 1000)
                        }
                    }).catch(err => {

                    })
                } else {
                    var stop = setInterval(function() {
                        var s = self.ifChecked;
                        if (self.ifChecked) {
                            clearInterval(stop);
                            self.makeOrder();
                        }
                    }, 1000)
                }
            }
            GetFlightOrderUtil.setOrderIntoSession(order, sessionStorage);
        },
        //page1
        ...mapMutations([
            mutaionNames.setBaggageInfo
        ]),
        goBack() {
            let trip = sessionStorage.flightType;
            switch (trip) {
                case 'one':
                    this.$router.push('/oneway');
                    break;
                case 'two':
                    this.$router.push('/roundtrip');
                    break;
            }
        },
        tripClass(index) {
            return "trip-info"
        },
        fareRule(index) {
            let arr = this.flightInfos[index].flight;
            let traverllNum = this.travellerNum;
            let averagePrice = Math.round(arr.realPrice / traverllNum);
            this.$router.push({ path: '/book/fare', query: { flightNo: arr.flightNumber, departTimeStamp: arr.departTimeStamp, averagePrice: averagePrice } });
        },
        submitBook() {
            this.$router.push("/traveller")
        },
        radio1() {
            if (this.ifCashback) {
                Toast({
                    message: 'Sorry,if you choose Cashback Price,no coupons are allowed',
                    duration: 2000
                })
                return false;
            }
            this.isSelecA = !this.isSelecA;
            if (this.isSelecA && this.isSelecB) {
                this.isSelecB = false;
            }
            if (!this.isSelecA) {
                this.$refs.coupon.disabled = true;
            } else {
                this.$refs.coupon.disabled = false;
            }
        },
        radio2() {
            this.isSelecB = !this.isSelecB;
            if (this.isSelecA && this.isSelecB) {
                this.isSelecA = false;
                this.$refs.coupon.disabled = true;
            }
            if (this.isSelecC && this.isSelecB) {
                this.isSelecC = false;
                this.$refs.gold.disabled = true;
            }
        },
        radio3() {
            this.isSelecC = !this.isSelecC;
            if (this.isSelecC && this.isSelecB) {
                this.isSelecB = false;
            }
            if (!this.isSelecC) {
                this.$refs.gold.disabled = true;
            } else {
                this.$refs.gold.disabled = false;
            }
        },
        getFlightNumber(key) {
            return this.$store.getters.flightOrder[key].flightNumber.split('/');
        },
        getCoupon(flight) {
            let self = this;
            let arr = [];
            if (this.isSelecA && this.couponCode != '') {
                Coupon.getCoupon(self, self.couponCode)
                    .then(res => {
                        self.coupon = Coupon.buildCoupon(res);
                        if (!self.isChange) {
                            self.coupon.getDiscountPrice(self, flight)
                            let FlightType = sessionStorage.flightType;

                            if (FlightType == 'two') {
                                let departFlightArr = this.$store.getters.flightofall;
                                self.coupon.getDiscountPrice(self, departFlightArr);
                            }

                            self.coupon.buildDiscount(self);
                            if (self.coupon.valid) {
                                Toast({
                                    message: 'Price has changed',
                                    duration: 1000
                                });
                            } else {
                                Toast({
                                    message: 'The coupon is invalid',
                                    duration: 1000
                                })
                            }

                            self.isChange = true;
                            this.$store.commit(OrderMutaionNames.setupOrder, this.flightOrder);

                            sessionStorage.setItem("couponCode", self.couponCode);
                        }
                    }).catch(err => {
                        Toast({
                            message: 'Sorry,coupon not found',
                            duration: 1000
                        });
                        console.log(err);
                    })
            }
        },
        applyCode() {
            if (this.isSelecA && this.couponCode != '') {
                let coupon = this.$store.getters.coupon;
                let oldCouponCode = '';
                if (coupon) {
                    for (let i in coupon) {
                        oldCouponCode = coupon[i].config.k1
                    }
                } else {
                    oldCouponCode = '';
                }
                let reg = new RegExp('^' + oldCouponCode + '&', 'ig')
                if (this.couponCode == oldCouponCode) {
                    Toast({
                        message: 'Price has changed',
                        duration: 1000
                    });
                } else {
                    let flightType = sessionStorage.flightType;
                    let flightArr = null;
                    switch (flightType) {
                        case "one":
                            flightArr = this.$store.getters.flightofall;
                            break;
                        case "two":
                            flightArr = this.$store.getters.returnflightofall;
                            break;
                    }
                    this.getCoupon(flightArr);
                }
            }
        },
        //page2
        getTraveller(index, humanType) {
            this.$router.push({ path: '/detail', query: { index: index, humanType: humanType } });
        },
        //page3
        gstOpen() {
            this.isGST = !this.isGST;
        },
        getResult(vueComp, token) {
            var self = this;
            this.flightOrder.getCheckResult(vueComp, token).then(
                function(res) {
                    let flightOrder = GetFlightOrderUtil.getOrderFromSession(self, sessionStorage)
                    if (res.code == 0) {
                        self.ifChecked = true;
                    } else if (res.code == 1) {
                        let queryString = "token=" + res.token;
                        // let queryString = res.token;
                        
                        self.getFlights(queryString);
                        self.ifChecked = true;
                    } else if (res.code == 2) {
                        clearTimeout(stop);
                        Indicator.close();
                        Toast({
                            message: 'International flights are not allowed',
                            duration: 2500
                        })
                        this.allow = false;
                    } else if (res.code == 7) {
                        clearTimeout(stop);
                        Indicator.close();
                        if (sessionStorage.flightType != '') {
                            Toast('Your session has expired.')
                            var type = sessionStorage.flightType;
                            type == 'one' ? self.$router.push('/oneway') : self.$router.push('/roundtrip');
                        } else {
                            Toast('Your session has expired.')
                            self.$router.push('/')
                        }
                    } else if (res.code == 8) {
                        clearTimeout(stop);
                        Indicator.close();
                        Toast({
                            message: 'the flight does not exist,please try again',
                            duration: 2500
                        })
                    } else {
                        if (window.location.href.split('/')[3] != 'book') {
                            clearTimeout(stop);
                        } else {
                            var stop = setTimeout(function() {
                                // self.getLoop(token)
                                self.getResult(self, token)
                            }, 2000);
                        }
                    }
                }
            )
        },
        getLoop(token) {
            this.getResult(this, token)
        },
        changeFlightsData(json, orderInfo) {
            var od = orderInfo.departFlight.flightInfoBack.fee;
            var jd = json.departFlight.fee;
            debugger
            if (orderInfo.returnFlight) {
                var or = orderInfo.returnFlight.flightInfoBack.fee;
                var jr = json.returnFlight.fee;
            }

            if (orderInfo.returnCash) {
                od.obfp = jd.obfp;
                od.ogst = jd.ogst;
                od.bfp = jd.bfp;
                od.gst = jd.gst;
                orderInfo.departFlight.price = jd.obfp + jd.ogst;
                if (orderInfo.returnFlight) {
                    or.obfp = jr.obfp;
                    or.ogst = jr.ogst;
                    or.bfp = jr.bfp;
                    or.gst = jr.gst;
                    orderInfo.returnFlight.price = jr.obfp + jr.ogst;
                }

            } else {
                od.obfp = jd.obfp;
                od.ogst = jd.ogst;
                od.bfp = jd.bfp;
                od.gst = jd.gst;
                orderInfo.departFlight.price = jd.bfp + jd.gst;
                if (orderInfo.returnFlight) {
                    or.obfp = jr.obfp;
                    or.ogst = jr.ogst;
                    or.bfp = jr.bfp;
                    or.gst = jr.gst;
                    orderInfo.returnFlight.price = jr.bfp + jr.gst;
                }
            }
            this.$store.commit(OrderMutaionNames.setupOrder, orderInfo);
            GetFlightOrderUtil.setOrderIntoSession(orderInfo, sessionStorage);

        },
        getFlights(queryString) {
            let orderInfo = this.flightOrder
            let dNumber = this.getFlightNumber('departFlight');
            let rNumber = [];

            let url = DomainManager.getFlights(queryString);
            this.$http.get(url).then(function(res) {
                debugger
                let json = JSON.parse(res.bodyText).flights;
                let baginfo = this.$store.getters.flightOrder.baggageinfo;
                this.changeFlightsData(json, orderInfo);
                baginfo.length = 0;
                json.allowGST ? self.allowGST = true : self.allowGST = false;

                json.birthdateRequired ? this.needDate = true : this.needDate = false;

                json.departFlight.stopByFlightArray.forEach((el) => {
                    baginfo.push(el.baggageInfo);
                })

                if (json.returnFlight) {
                    rNumber = this.getFlightNumber('returnFlight');
                    json.returnFlight.stopByFlightArray.forEach((el) => {
                        baginfo.push(el.baggageInfo);
                    })
                }
                let fNumber = dNumber.concat(rNumber);

                if (json.returnFlight) {
                    orderInfo.serviceFee = json.departFlight.fee.cf + json.returnFlight.fee.cf;
                } else {
                    orderInfo.serviceFee = json.departFlight.fee.cf;
                }

                for (var i = 0; i < baginfo.length; i++) {
                    baginfo[i].flightNumber = fNumber[i]
                }

                this.$store.commit(OrderMutaionNames.setupOrder, orderInfo);
                GetFlightOrderUtil.setOrderIntoSession(orderInfo, sessionStorage);
            })

            this.flightInfos.forEach((el) => {
                let d = el.flight.departDate;
                let r = el.flight.returnDate;
                el.durationDays = r.getDate() - d.getDate();
            })
            // this.$store.commit(OrderMutaionNames.setupOrder, orderInfo);

            // GetFlightOrderUtil.setOrderIntoSession(orderInfo, sessionStorage);
        },
        aboradFlights(order) {
            var dsArr = order.departFlight.flightInfoBack.stopByFlightArray;

            var flightsArr = JSON.parse(sessionStorage.airports);
            for (let i of dsArr) {
                i.acc = flightsArr[i.as].c;
                i.dcc = flightsArr[i.ds].c;
            }

            if (order.returnFlight) {
                var rsArr = order.returnFlight.flightInfoBack.stopByFlightArray;
                for (let i of rsArr) {
                    i.acc = flightsArr[i.as].c;
                    i.dcc = flightsArr[i.ds].c;
                }
            }
        }
    },
    mounted() {
        let _self = this;
        if (!sessionStorage.order) {
            Toast({
                message: 'infomation expired',
                duration: 2000
            })
            setTimeout(function() {
                _self.$router.push('/home')
            }, 2000)
        } else {
            //page1
            let self = this;
            let orderInfo = self.flightOrder
            let orderToken = orderInfo.token;
            let flightData = JSON.parse(sessionStorage.order);

            this.aboradFlights(orderInfo);

            orderInfo.check(self).then(function(res) {
                if (res.code == 7) {
                    if (sessionStorage.flightType != '') {
                        Toast('Your session has expired.')
                        var type = sessionStorage.flightType;
                        type == 'one' ? self.$router.push('/oneway') : self.$router.push('/roundtrip');
                    } else {
                        Toast('Your session has expired.')
                        self.$router.push('/')
                    }
                    return false;
                }
                let token = 'token=' + res.token;
                orderInfo.getFlights(self, token).then(res => {
                    if (res.code == 0) {
                        let json = res;
                        let baginfo = self.$store.getters.flightOrder.baggageinfo;
                        self.changeFlightsData(json, orderInfo);
                        baginfo.length = 0;

                        json.birthdateRequired ? self.needDate = true : self.needDate = false;

                        json.departFlight.stopByFlightArray.forEach((el) => {
                            baginfo.push(el.baggageInfo);
                        })

                        if (json.returnFlight) {
                            rNumber = self.getFlightNumber('returnFlight');
                            json.returnFlight.stopByFlightArray.forEach((el) => {
                                baginfo.push(el.baggageInfo);
                            })
                        }
                        let dNumber = self.getFlightNumber('departFlight');
                        let rNumber = [];
                        let fNumber = dNumber.concat(rNumber);

                        orderInfo.departFlight.fee = json.departFlight.fee;
                        if (orderInfo.returnFlight) {
                            orderInfo.returnFlight.fee = json.returnFlight.fee;
                        }

                        if (json.returnFlight) {
                            orderInfo.serviceFee = json.departFlight.fee.cf + json.returnFlight.fee.cf;
                        } else {
                            orderInfo.serviceFee = json.departFlight.fee.cf;
                        }
                        for (var i = 0; i < baginfo.length; i++) {
                            baginfo[i].flightNumber = fNumber[i]
                        }

                        self.flightInfos.forEach((el) => {
                            let d = el.flight.departDate;
                            let r = el.flight.returnDate;
                            el.durationDays = r.getDate() - d.getDate();
                        })

                        // self.flightOrder.departFlight.flightInfoBack.fee = json.departFlight.fee;
                        // if (self.flightOrder.returnFlight) {
                        //     self.flightOrder.returnFlight.flightInfoBack.fee = json.returnFlight.fee;
                        // }

                        GetFlightOrderUtil.setOrderIntoSession(orderInfo, sessionStorage)
                        self.$store.commit(OrderMutaionNames.setupOrder, orderInfo);

                        orderInfo.checkPrice(self)
                            .then(function(res) {
                                if (res.code == 7) {
                                    if (sessionStorage.flightType != '') {
                                        Toast('Your session has expired.')
                                        var type = sessionStorage.flightType;
                                        type == 'one' ? self.$router.push('/oneway') : self.$router.push('/roundtrip');
                                    } else {
                                        Toast('Your session has expired.')
                                        self.$router.push('/')
                                    }
                                }
                                var token = 'token=' + res.token;
                                self.getResult(self, token)
                            }).catch(function(err) {
                                console.log(err)
                            })
                    } else if (res.code == 7) {
                        if (sessionStorage.flightType != '') {
                            Toast('Your session has expired.')
                            var type = sessionStorage.flightType;
                            type == 'one' ? self.$router.push('/oneway') : self.$router.push('/roundtrip');
                        } else {
                            Toast('Your session has expired.')
                            self.$router.push('/')
                        }
                    }
                })

                if (self.ifCashback) {
                    if (flightData.orderType == 'one') {
                        var dataPrice = flightData.departFlight.price
                    } else {
                        var dataPrice = flightData.departFlight.price + flightData.returnFlight.price

                    }
                } else {
                    if (flightData.orderType == 'one') {
                        var dataPrice = flightData.departFlight.realPrice;
                    } else {
                        var dataPrice = flightData.departFlight.realPrice + flightData.returnFlight.price - flightData.returnFlight.commonDiscount
                    }
                }
                dataLayer.push({
                    'google_tag_params': {
                        'flight_originid': orderInfo.departAirport.iataCode,//航班始发地三字代码
                        'flight_destid': orderInfo.destinationAirport.iataCode,//航班目的地三字代码
                        'flight_startdate': orderInfo.departAirport.departTime,//航班去程日期
                        'flight_enddate': orderInfo.destinationAirport.returnTime || null,//航班回程日期
                        'page_type': 'Book',//页面类型
                        'flight_totalvalue': dataPrice,//航班价格
                    }
                })

                if (!orderToken) {
                    self.isShow = !self.isShow;
                    Toast({
                        message: 'infomation expired',
                        duration: 2000
                    })
                    setTimeout(function() {
                        self.$router.push('/home')
                    }, 2000)
                }

                if (orderInfo.checkPriceCode == 1) {
                    if (self.ifCashback) {
                        Toast({
                            message: 'Fare Changed Alert: Your fare has changed from ' + orderInfo.disPrice + ' to ' + self.fullPrice,
                            duration: 3500
                        })
                    } else {
                        Toast({
                            message: 'Fare Changed Alert: Your fare has changed from ' + orderInfo.disPrice + ' to ' + self.payPrice,
                            duration: 3500
                        })
                    }
                }

                let coupon = self.$store.getters.coupon;
                if (coupon) {
                    for (let i in coupon) {
                        self.couponCode = coupon[i].config.k1;
                    }
                } else {
                    self.couponCode = '';
                }
                //page2
                let order = self.flightOrder;
                if (order.contactInfo != null) {
                    let contactInfo = order.contactInfo;
                    if (typeof (contactInfo.cellphone) != "undefined") self.mobile = contactInfo.cellphone;
                    if (typeof (contactInfo.email) != "undefined") self.email = contactInfo.email;
                    if (typeof (contactInfo.name) != "undefined") self.contactName = contactInfo.name;
                }
            })
        }

    }
}
</script>
<style lang="less" scoped>
.selected {
    border-color: #ffad3d!important;
    background: #ffad3d url('../../assets/images/sure.png') center no-repeat;
    background-size: contain;
}

::-webkit-scrollbar {
    display: none;
}

::-webkit-input-placeholder {
    color: #ccc;
}

::-moz-placeholder {
    color: #ccc;
}

:-moz-placeholder {
    color: #ccc;
}

.header {
    background: #0b9d78;
    box-sizing: border-box;
    .head-ico {
        padding: 0 0.64rem;
    }
    span {
        color: #fff;
        font-size: 0.768rem;
    }
    .placeholder {
        opacity: 0;
    }
}

.container {
    overflow: scroll;
    background: #ebebeb;
    .page-1 {
        padding-top: 2.04rem;
        background: #fff;
        margin-bottom: 0.21rem;
        .trip-wrapper {
            padding: 0 0.64rem;
        }
        .title {
            text-align: left;
            font-size: 0.682rem;
            padding: 0.55rem 0.64rem;
            border-bottom: 1px solid #d6d6d6;
            span {
                display: block;
            }
            .title-icon {
                background: url('../../assets/images/book/title_1.png') left center no-repeat;
                background-size: 100%;
                width: 0.8rem;
                height: 0.8rem;
                vertical-align: middle;
                margin-right: 0.2rem;
            }
        }
        .trip-info {
            .trip-cont {
                background-color: #fff;
                border-radius: 0.4rem;
                .trip-num {
                    height: 2.14rem;
                    line-height: 2.14rem;
                    text-align: left;
                    span {
                        font-size: 0.68rem;
                        color: #666;
                    }
                    .title-img {
                        width: 0.68rem;
                        height: 2.14rem;
                        img {
                            width: 0.68rem;
                        }
                        margin-right:0.5rem;
                    }
                }
                .time-info {
                    padding-bottom: 1rem;
                    span {
                        display: block;
                    }
                    h2 {
                        font-size: 0.768rem;
                        line-height: 1.2rem;
                        color: #333;
                    }
                    div {
                        color: #ccc;
                        font-size: 0.56rem;
                        line-height: 0.68rem;
                    }
                }
                .from-time {
                    width: 5rem;
                    span {
                        display: block;
                    }
                    h2 {
                        text-align: right;
                    }
                    div {
                        text-align: right;
                    }
                }
                .to-time {
                    width: 5rem;
                    h2 {
                        text-align: left;
                        i {
                            font-size: 0.52rem;
                        }
                    }
                    div {
                        text-align: left;
                    }
                }
                .distance {
                    span {
                        font-size: 0.5rem;
                        color: #666;
                        width: 3rem;
                        height: 1.1rem;
                        line-height: 1.1rem;
                        text-align: center;
                        background: url('../../assets/images/book/icon-.png') center bottom no-repeat;
                        background-size: 2rem;
                    }
                }
            }
        }
        .sp {
            padding: 0!important;
        }
        .trip-attach {
            background-color: #fff;
            border-radius: 0.4rem;
            padding: 0.32rem 0.64rem;
            .rules {
                height: 1.8rem;
                line-height: 1.8rem;
                border-bottom: 1px solid #eee;
                border-top: 1px solid #eee;
                span,
                a {
                    font-size: 0.56rem;
                    color: #666;
                }
                a {
                    display: block;
                    color: #0b9d78;
                }
            }
            .baggage-tit {
                font-size: 0.6rem;
                color: #333;
                text-align: left;
                padding: 0.2rem 0;
            }
            .baggage-info {
                h2 {
                    font-size: 0.68rem;
                    color: #666;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    text-align: center;
                }
                div {
                    span {
                        display: block;
                        font-size: 0.6rem;
                        color: #ccc;
                        line-height: 1.45rem;
                    }
                }
            }
        }
        .contact-info {
            h2 {
                font-size: 0.68rem;
                color: #333;
                text-align: left;
                line-height: 1.45rem;
                padding-left: 0.4rem;
            }
            #cS {
                display: block;
                padding: 0.2rem;
            }
            .contact-cont {
                padding: 0 0.4rem;
                background-color: #fff;
                padding-bottom: 0.6rem;
                border-radius: 0.4rem;
                .forms {
                    text-align: left;
                    span {
                        font-size: 0.68rem;
                        color: #666;
                        width: 2.05rem;
                        margin-right: 0.2rem;
                        line-height: 1.45rem;
                    }
                    input {
                        font-size: 0.5rem;
                        padding-left: 0.2rem;
                        color: #666;
                        border-bottom: 1px solid #ccc;
                        line-height: 1rem;
                        text-indent: 0;
                        border-radius: 0;
                    }
                }

                p {
                    font-size: 0.6rem;
                    color: #ccc;
                    padding-left: 2.4rem;
                    line-height: 0.768rem;
                }
            }
        }

        .fare {
            h2 {
                font-size: 0.68rem;
                color: #333;
                text-align: left;
                line-height: 1.45rem;
                padding-left: 0.4rem;
            }
        }

        .term {
            margin-top: 1rem;
        }

        p {
            font-size: 0.5rem;
            color: #ccc;
            text-align: left;
            padding-left: 0.6rem;
            line-height: 0.768rem;
            .round {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                border: 1px solid #ccc;
                margin-top: 0.4rem;
                margin-right: 0.2rem;
                display: inline-block;
            }
        }

        p::before {
            display: table;
            content: "";
        }

        .payment {
            width: 100%;
            padding: 0.4rem 0 1rem;
            .submitBook {
                width: 100%;
                font-size: 0.768rem;
                color: #fff;
                height: 2rem;
                background-color: #ffad3d;
                border-radius: 0.3rem;
                cursor: pointer;
            }
        }
    }
    .page-2 {
        background: #fff;
        margin-bottom: 0.21rem;
        .tips {
            padding: 0.768rem 0.64rem;
        }
        .title {
            padding: 0.55rem 0.64rem;
            text-align: left;
            border-bottom: 1px solid #d6d6d6;
            span {
                display: block;
            }
            .title-info {
                font-size: 0.68rem;
                color: #666;
                font-weight: normal;
                text-align: left;
            }
            .title-icon {
                background: url('../../assets/images/book/title_2.png') left center no-repeat;
                background-size: 100%;
                width: 0.8rem;
                height: 0.8rem;
                vertical-align: middle;
                margin-right: 0.2rem;
            }
        }
        .traveller-wrapper {
            padding: 0.64rem;
            .traveller-info,
            .contact-info {
                background-color: #fff;
                border-radius: 0.4rem;

                li {
                    box-sizing: border-box;
                    font-size: 0.68rem;
                    color: #999;
                    width: 100%;
                    border-bottom: 1px solid #eee;
                    padding: 0.1rem 0.68rem;
                    cursor: pointer;
                    span:nth-of-type(2) {
                        font-size: 0.52rem;
                    }
                    span {
                        display: block;
                    }
                    .sel {
                        width: 0.7rem;
                        display: inline-block; // background: url('../../../assets/images/book/detail_next.png') center no-repeat;
                        background-size: 0.6rem;
                        transform: rotateZ(-90deg);
                        -webkit-transform: rotateZ(-90deg);
                    }
                    label {
                        padding-right: 0.2rem;
                    }
                }
            }
            h2 {
                font-size: 0.64rem;
                text-align: left;
                padding: 0.5rem;
            }
            .traveller-info {
                .traveller-tips {
                    padding-bottom: 0.5rem;
                    .traveller-tips-title {
                        font-size: 0.64rem;
                        display: block;
                    }
                    .traveller-tips-total {
                        font-size: 0.512rem;
                        color: #ccc;
                        display: block;
                    }
                }
                .traveller-title {
                    text-align: center;
                    padding: 0 0.2rem 0.2rem;
                    border-bottom: 1px solid #ddd;
                    margin-bottom: 0.3rem;
                    font-size: 0.64rem;
                    color: #5c5c5c;
                }
                .traveller-form {
                    // padding: 0.3rem 0.68rem;
                    // border: 1px solid #dddddd;
                    width: 100%;
                    border-radius: 2px;
                    margin-bottom: 0.3rem;
                    .passenger-from {
                        font-size: 0.64rem;
                        width: 100%;
                        line-height: 1.68rem;
                        border: 1px solid #dddddd;
                        border-top-left-radius: 4px;
                        border-top-right-radius: 4px;
                        .group-title {
                            display: block;
                            height: 100%;
                            width: 20%;
                            text-align: center;
                            border-right: 1px solid #ddd; // font-size: 0.512rem;
                            font-size: 0.64rem;
                        }
                        select,
                        input {
                            font-size: 0.68rem;
                            border-right: 1px solid #ddd;
                            padding: 4px 0;
                            display: block;
                            text-align: center;
                            margin-bottom: 1px;
                            border-radius: 0; // font-size: 0.512rem;
                            font-size: 0.64rem;
                        }
                        input {
                            box-sizing: border-box;
                            width: 27.5%; // font-size: 0.512rem;
                            font-size: 0.64rem;
                        }
                        input:-moz-placeholder,
                        input::-moz-placeholder {
                            color: #b9b9b9
                        }
                        span {
                            box-sizing: border-box;
                            font-size: 0.68rem;
                            display: block;
                        }
                        .passager-detail-sex {
                            display: block;
                        }
                        .title-wrap {
                            display: block;
                            width: 25%;
                            position: relative; // font-size: 0.512rem;
                            font-size: 0.64rem;
                            text-align: left;
                            text-indent: 0.4rem;
                            background: url('../../assets/images/book/arrow_down_empty.png') 94% center no-repeat;
                            background-size: 14%;
                        }
                        .passager-detail-sex {
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            opacity: 0;
                        }
                    }
                }
                .date-form {
                    border: 1px solid #ddd;
                    border-top: none;
                    line-height: 1.68rem;
                    width: 100%;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                    .form-group {
                        font-size: 0.68rem;
                        label {
                            width: 20%;
                            text-align: center;
                            display: block;
                            font-size: 0.64rem;

                            border-right: 1px solid #ddd;
                            box-sizing: border-box;
                        }
                        span {
                            display: block;
                            width: 80%;
                            height: 100%;
                            text-align: center;
                            font-size: 0.64rem;
                            position: relative;
                            font-size: 0.68rem;
                            input {
                                width: 100%;
                                height: 100%;
                                font-size: 0.68rem;
                                box-sizing: border-box;
                                text-align: right;
                                position: absolute;
                                top: 0;
                                left: 0;
                                opacity: 0;
                            }
                        }
                    }
                }
            }

            .contact-info {
                li {
                    height: 1.7rem;
                    text-align: left;
                    label {
                        width: 20%;
                        text-align: left;
                        font-size: 0.68rem;
                    }
                    input {
                        padding: 0.2rem;
                        text-indent: 0;
                        width: 100%;
                        font-size: 0.68rem;
                        box-sizing: border-box;
                    }
                    select {
                        width: 30%;
                        font-size: 0.64rem;
                        padding: 0.2rem; // background: url('../../assets/images/book/arrow_down_full.png') 97% 55% no-repeat;
                        // background-size: 20%;
                    }
                }
            }

            p {
                font-size: 0.52rem;
                color: #666;
                text-align: left;
                padding: .6rem .68rem 0 .68rem;
            }

            .done {
                .btn {
                    width: 100%;
                    font-size: 0.768rem;
                    color: #fff;
                    height: 1.87rem;
                    margin-top: 2rem;
                    border-radius: 6px;
                    background-color: #ffad3d;
                    display: inline-block;
                    cursor: pointer;
                }
            }
        }
    }
    .page-3 {
        background: #fff;
        margin-bottom: 0.21rem;
        width: 100%;
        box-sizing: border-box;
        .title {
            padding: 0.55rem 0.64rem;
            text-align: left;
            border-bottom: 1px solid #d6d6d6;
            span {
                display: block;
            }
            .icon-info {
                font-size: 0.68rem;
                text-align: left;
            }
            .icon-title {
                background: url('../../assets/images/book/title_3.png') left center no-repeat;
                background-size: 100%;
                width: 0.8rem;
                height: 0.8rem;
                vertical-align: middle;
                margin-right: 0.2rem;
            }
        }
        .form-group {
            margin-top: 0.23rem;
            #check {
                margin-bottom: 0.2rem;
            }
            .round1 {
                width: 0.6rem;
                height: 0.6rem;
                border: 1px solid #ccc;
                position: relative;
                .round2 {
                    width: 0.4rem;
                    height: 0.4rem;
                    background-color: #ffa033;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateY(-50%) translateX(-50%);
                    -webkit-transform: translateY(-50%) translateX(-50%);
                }
            }
            .changeC {
                color: #ffad3d;
            }
            input {
                width: 100%;
                text-indent: 0;
                box-sizing: border-box;
                padding: 0.2rem 0.3rem;
                border: 1px solid #ccc;
            }
            input:focus {
                border: 1px solid #ffad3d;
            }
            input:checked {
                color: #ffad3d;
                background: #ffad3d;
            }
            #check {
                display: table-cell;
                vertical-align: middle;
                width: 0.6rem;
                height: 0.6rem;
            }
            .checkinfo {
                display: table-cell;
                vertical-align: middle;
                font-size: 0.64rem;
            }
        }
        .sp {
            box-sizing: border-box;
            display: table;
            vertical-align: middle;
            padding: 0.64rem;
            width: 100%;
            text-align: left;
        }
        .container {
            background: #fff;
            padding: 0 0.64rem 0.64rem 0.64rem;
            .form-group {
                margin-top: 0.23rem;
                input {
                    font-size: 0.512rem;
                    width: 100%;
                    text-indent: 0;
                    box-sizing: border-box;
                    padding: 0.2rem 0.3rem;
                    border: 1px solid #ccc;
                }
                input:focus {
                    border: 1px solid #ffad3d;
                }
                input:checked {
                    color: #ffad3d;
                    background: #ffad3d;
                }
                #check {
                    display: table-cell;
                    vertical-align: middle;
                    width: 0.8rem;
                    height: 0.8rem;
                }
                .checkinfo {
                    display: table-cell;
                    vertical-align: middle;
                    font-size: 0.74rem;
                }
            }
            .sp {
                display: table;
                vertical-align: middle;
            }
        }
    }
    .page-4 {
        margin-bottom: 0.21rem;
        .offers {
            background-color: #fff;
            padding-bottom: 1.1rem;
            .title {
                padding: 0.55rem 0.64rem;
                text-align: left;
                border-bottom: 1px solid #d6d6d6;
                span {
                    display: block;
                }
                .icon-info {
                    font-size: 0.68rem;
                    color: #333;
                    text-align: left;
                }
                .icon-title {
                    background: url('../../assets/images/book/title_4.png') left center no-repeat;
                    background-size: 100%;
                    width: 0.8rem;
                    height: 0.8rem;
                    vertical-align: middle;
                    margin-right: 0.2rem;
                }
            }
            .offers-wrapper {
                padding: 0 0.64rem;
                width: 100%;
                box-sizing: border-box;
                .offers-group {
                    font-size: 0.6rem;
                    color: #ccc;
                    text-align: left;
                    background-color: #fff;
                    border-radius: 0.2rem;
                    .radio-group {
                        padding: 0.426rem 0;
                        .round1 {
                            width: 0.6rem;
                            height: 0.6rem;
                            border: 1px solid #ccc;
                            position: relative;
                            margin-right: 0.3rem;
                            .round2 {
                                width: 0.4rem;
                                height: 0.4rem;
                                background-color: #ffa033;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translateY(-50%) translateX(-50%);
                                -webkit-transform: translateY(-50%) translateX(-50%);
                            }
                        }
                    }
                    .input-group {
                        width: 100%;
                        input {
                            display: block;
                            box-sizing: border-box;
                            height: 1.2rem;
                            width: 75%;
                            font-size: 0.68rem;
                            padding: 0.3rem 0.3rem;
                            border: 1px solid #ccc;
                            border-right: 0;
                            border-radius: 0;
                            text-indent: 0;
                        }
                        .yellowborder {
                            border: 1px solid #ffa033;
                        }
                        a {
                            box-sizing: border-box;
                            height: 1.2rem;
                            line-height: 1.2rem;
                            width: 25%;
                            font-size: 0.68rem;
                            /*padding:0.3rem 0;*/
                            text-align: center;
                            color: #fff;
                            display: block;
                        }
                        .cheked {
                            background-color: #ffa033;
                        }
                        .disabel {
                            background-color: #ccc;
                        }
                    }
                }
            }
        }
    }
    .page-5 {
        background: #fff;
        .title {
            padding: 0.55rem 0.64rem;
            text-align: left;
            border-bottom: 1px solid #d6d6d6;
            span {
                display: block;
            }
            .icon-info {
                font-size: 0.683rem;
                text-align: left;
            }
            .icon-title {
                background: url('../../assets/images/book/title_5.png') left center no-repeat;
                background-size: 100%;
                width: 0.8rem;
                height: 0.8rem;
                vertical-align: middle;
                margin-right: 0.2rem;
            }
        }
        .price-info {
            padding: 0 0.64rem 1.1rem;
            .total-price {
                text-align: right;
                padding: 0.64rem;
                .price,
                .old-price {
                    display: block;
                }
                .price {
                    color: #f65858;
                    font-size: 0.853rem;
                }
                .old-price {
                    color: #ddd;
                    font-size: 0.469rem;
                    padding-top: 0.15rem;
                }
            }
            .otp-info {
                padding: 0 0.64rem;
                .phone {
                    text-align: left;
                    margin-bottom: 0.64rem;
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
            .agreement {
                font-size: 0.427rem;
                padding-bottom: 0.64rem;
                .link {
                    color: #17a27f;
                }
                .input {
                    display: block;
                    line-height: 1rem;
                    width: 0.6rem;
                    height: 0.6rem;
                }
                span {
                    line-height: 1rem;
                }
            }
            .confirm {
                font-size: 0.78rem;
                display: block;
                margin: 0 0.64rem;
                height: 1.5rem;
                line-height: 1.5rem;
                color: #fff;
                background: #ffad3d;
                text-align: center;
                box-sizing: border-box;
                border-radius: 4px;
            }
        }
    }
}
</style>