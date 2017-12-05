<template>
    <div class="wrapper">
        <head-top>
            <i slot="left" class="prev iconfont icon-back" @click="$router.push('/')"></i>
            <div slot="title" class="title">Payment</div>
            <img slot="right" :src="require('../../assets/images/flight-prev.png')" class="placeholder">
        </head-top>
        <div class="container">
        </div>
    </div>
</template>
<script>
import headTop from '../../components/head/head.vue'
import { FlightOrder, OnewayOrder, RoundTripOrder } from '../../models/flightorder'
import { Indicator } from 'mint-ui';
import { GetFlightOrderUtil, CookieUtil } from '../../models/utils';
export default {
    components: {
        headTop
    },
    data() {
        return {

        }
    },
    computed: {
        flightOrder() {
            return GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
        }
    },
    methods: {
        validatInfo(id) {
            let self = this;
            Indicator.open({ spinnerType: 'fading-circle' });
            let flightOrder = GetFlightOrderUtil.getOrderFromSession(this, sessionStorage)
            flightOrder.requestPaymentMakeUP(self, id).then((res) => {
                flightOrder.makePayment(window, res, sessionStorage);
                console.log(res);
            }, (err) => {
                console.log(err)
                Indicator.close()
            })
        }
    },
    mounted() {
        let id = window.location.href.split('=')[1];
        console.log(id)
        this.validatInfo(id)
    }
}
</script>
<style lang="less" scoped>
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
</style>
