<template>
    <div class="wrapper">
        <head-top class="header">
            <i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
            <div slot="title" class="title">Diwali Program</div>
            <i slot="right" class="sp iconfont icon-back"></i>
        </head-top>
        <div class="container">
            <div class="top"></div>
            <div class="section1">
                <ul>
                    <li class="flex content-start">
                        <img :src="require('../../../assets/images/cashback/icon-1.png')" alt="">
                        <p>Valid from
                        </p>
                        <span class="yellow">18 Oct 2017</span>
                    </li>
                    <li class="flex content-start">
                        <img :src="require('../../../assets/images/cashback/icon-1.png')" alt="">
                        <p>Applicable on
                        </p>
                        <span class="yellow"> Domestic Flights</span>
                    </li>
                    <li class="flex content-start">
                        <img :src="require('../../../assets/images/cashback/icon-1.png')" alt="">
                        <p>Applicable to
                        </p>
                        <span class="yellow">PC Site &amp; Moble Site</span>
                    </li>
                    <li class="flex content-start align-items-center">
                        <img :src="require('../../../assets/images/cashback/icon-1.png')" alt="">
                        <p>Valid till
                        </p>
                        <span class="yellow">23 Oct 2017</span>
                    </li>
                </ul>
            </div>
            <div class="section2">
                <h2 class="yellow">Happy Diwali Special Offer</h2>
                <h4>Let's celebrate Diwali Festival together!</h4>
                <p>
                    On such special occasion, HappyEasyGo gifts every loyal customer
                    <strong>extra ₹100 discount</strong> for every order booked on www.happyeasygo.com. You can apply the coupon code:
                    <span class="sp font-bold">HappyDiwali2017</span> and get the extra ₹100 discount.
                </p>

                <p class="tac">
                    It begins from 18 Oct 2017 and ends on 23 Oct 2017
                </p>

                <p class="tac">HappyEasyGo Team wishes you A Happy Diwali!</p>

            </div>
            <div class="terms">
                <h2 class="sp">Terms and Conditions</h2>
                <div class="list">
                    <div class="text">
                        <p>
                            The Happy Diwali promotion is launched by HappyEasyGo to provide ₹100 discount to those who book flights through HappyEasyGo.com during Diwali Festival. This promotion starts from Oct.18th, 2017 and ends on Oct.23th, 2017. </p>
                    </div>
                </div>
                <div class="list">
                    <div class="text">
                        <p>This coupon code can be applied with Instant Discount, Cashback, Happy Sliver, or any other offers and discount extended by HappyEasyGo.
                        </p>
                    </div>
                </div>
                <div class="list">
                    <div class="text">
                        <p>
                            In case of any cancellation/refund (by airline or provider) happens out of the validity of this campaign, your coupon will be voided.</p>
                    </div>
                </div>
                <div class="list">
                    <div class="text">
                        <p>
                            HappyEasyGo may contact you for promotional activities or to get your feedback during the course of Happy Diwali promotion.</p>
                    </div>
                </div>
                <div class="list">
                    <div class="text">
                        <p>
                            HappyEasyGo has the sole right to decide on the amount of coupon and the eligibility for Happy Diwali promotion, the sole right to alter and/or amend the terms and conditions of the Happy Diwali promotion, coupon amount and values at any time and also reserves the right to invalid this coupon code in case booking details are found to be fraudulent. </p>
                    </div>
                </div>
                <div class="list">
                    <div class="text">
                        <p>
                            HappyEasyGo Travel Pvt. Ltd. ("HappyEasyGo") reserves the right to add, alter, modify all or any of Happy Diwali promotion, or replace wholly or in part, this offer by any other offer, whether similar to this offer or not, without prior notice.</p>
                    </div>
                </div>
                <div class="list">
                    <div class="text">
                        <p>
                            All other standard terms and conditions available at HappyEasyGo.com shall apply.</p>
                    </div>
                </div>
                <div class="list">
                    <div class="text">
                        <p>
                            Any disputes arising out of this offer shall be subject to the exclusive jurisdiction of competent courts in Gurgaon, Haryana, India.</p>
                    </div>
                </div>
            </div>
            <div class="share" v-show='false'>
                <h2 class="yellow">Share this Offer</h2>
                <div class="ico flex space-between">
                    <img :src="require('../../../assets/images/cashback/icon-12.png')" alt="">
                    <img :src="require('../../../assets/images/cashback/icon-13.png')" alt="">
                    <img :src="require('../../../assets/images/cashback/icon-14.png')" alt="">
                </div>
                <div class="input-group">
                    <div class="list flex space-between">
                        <input type="text" placeholder="Enter your email">
                        <a href="javascript:">Send</a>
                    </div>
                    <div class="list flex space-between">
                        <input type="text" placeholder="https://www.happyeasygo.com/">
                        <a href="javascript:">Copy</a>
                    </div>
                </div>
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
    methods: {
        LoginAndGoWallet() {
            let cu = new CookieUtil(document);
            if (!cu.hasItem('uuid')) {
                this.$router.push('/login')
            } else {
                this.$router.push('/happywallet')
            }
        }
    }
}
</script>
<style lang='less' scoped>
.wrapper {
    font-family: "PingFangSC";
}

.header {
    background: #0b9d78;
    .title {
        font-size: 0.768rem;
        color: #fff;
    }
    .sp {
        opacity: 0;
    }
}

.top {
    margin-top: 2rem;
    height: 9.8rem;
    background: #fff url('../../../assets/images/offer/diwali_top.png') center no-repeat;
    background-size: 100% 9.8rem;
}

.section1 {
    padding: 0.4rem 0.68rem 1rem;
    background-color: #fff;
    ul li {
        padding: 0.4rem 0;
        border-bottom: 1px solid #ccc;
        text-align: left;
        img {
            width: 0.769rem;
            height: 0.769rem;
        }
        p,
        span {
            font-size: 0.68rem;
            color: #999;
            padding-left: 1rem;
            strong {
                color: #000;
                font-weight: 400;
            }
        }
        p {
            width: 30%;
        }
        .title {
            font-size: 0.68rem;
            color: #999;
            padding-left: 1rem;
        }
    }
}

.section2 {
    padding: 0.68rem;
    margin-top: 0.4rem;
    background-color: #fff;
    .tac {
        text-align: center;
    }
    h2 {
        font-size: 0.6rem;
    }
    h3 {
        font-size: 0.6rem;
        color: #0b9d78;
    }
    h4 {
        font-size: 0.6rem;
        color: #999;
        text-align: center;
        font-weight: normal;
        margin-top: 0.4rem;
    }
    p {
        font-size: 0.52rem;
        color: #999;
        text-align: left;
        line-height: 0.769rem;
        margin: 0.4rem 0;
    }
    .cp {
        height: 1.5rem;
        background: #eee;
        img {
            display: block;
            height: 0.64rem;
            margin: 0 0.5rem;
        }
        span {
            display: block;
        }
        .red {
            color: #f65858;
            font-size: 0.64rem;
        }
        .green {
            color: #0b9d78;
            font-size: 0.512rem;
        }
    }
    .yellow {
        font-weight: bold;
    }
    .font-bold {
        font-weight: bold;
        color: #0b9d78;
    }
    .sp {
        color: #0b9d78;
    }
    .icon-info {
        width: 0.56rem;
    }
    .font-yellow {
        font-weight: bold;
        color: #ffad3d;
    }
    .ly {
        color: #ffad3d;
    }
}

.sp {
    color: #0b9d78;
}

.section3 {
    position: relative;
    background-color: #fff;
    margin-top: 0.4rem;
    padding: 0.68rem;
    h2 {
        font-size: 0.6rem;
        padding: 0.6rem 0;
    }
    h4 {
        font-size: 0.6rem;
        color: #666;
        font-weight: normal;
        text-align: left;
        padding: 0.2rem 0;
    }
    .line {
        width: 1px;
        height: 10.2rem;
        background-color: #ffa033;
        position: absolute;
        left: 1.36rem;
        top: 4.68rem;
        z-index: 1;
    }
    .list {
        padding: 0.4rem 0;
        .ico {
            z-index: 2;
            img {
                width: 1.32rem;
            }
        }
        .text {
            p {
                font-size: 0.52rem;
                color: #999;
                text-align: left;
                padding-left: 0.4rem;
                line-height: 0.769rem;
            }
        }
    }
}

.section4 {
    padding: 0.6rem;
    background-color: #fff;
    h2 {
        font-size: 0.68rem;
        color: #666;
        text-align: left;
        padding: 0.4rem 0;
    }
    p {
        font-size: 0.52rem;
        color: #999;
        line-height: 0.769rem;
        margin: 0.4rem 0;
        text-align: left;
    }
}

.section5 {
    padding: 0 0.68rem 0.68rem;
    background-color: #fff;
    margin-top: 0.4rem;
    h2 {
        font-size: 0.6rem;
        padding: 0.68rem 0;
    }
    .list {
        h2 {
            text-align: left;
            padding: 0.4rem 0 0.4rem 1rem;
            color: #666;
            background: url('../../../assets/images/cashback/icon-11.png') left center no-repeat;
            background-size: 0.8rem;
        }
        .text {
            padding: 0.68rem;
            background-color: #fbfbfb;
            p {
                font-size: 0.52rem;
                color: #999;
                line-height: 0.769rem;
                text-align: left;
            }
        }
    }
}

.btn {
    background-color: #fff;
    padding: 1rem 0;
    a {
        height: 1.2rem;
        line-height: 1.2rem;
        border: 1px solid #ffa234;
        font-size: 0.52rem;
        color: #ffa234;
        text-align: center;
        border-radius: 0.2rem;
        padding: 0 0.2rem;
    }
}

.terms {
    margin-top: 0.4rem;
    padding: 0 0.68rem;
    background-color: #fff;
    h2 {
        font-size: 0.6rem;
        height: 2rem;
        line-height: 2rem;
        background: url('../../../assets/images/cashback/Cashback-app_39.png') right center no-repeat;
        background-size: 0.68rem;
    }
    .list {
        h2 {
            text-align: left;
            padding: 0.4rem 0 0.4rem 1rem;
            color: #666;
            background: url('../../../assets/images/cashback/icon-11.png') left center no-repeat;
            background-size: 0.8rem;
        }
        .text {
            padding: 0.68rem;
            background-color: #fbfbfb;
            p {
                font-size: 0.52rem;
                color: #999;
                line-height: 0.769rem;
                text-align: left;
            }
        }
    }
}

.share {
    padding: 0.68rem;
    margin-top: 0.4rem;
    background-color: #fff;
    h2 {
        font-size: 0.6rem;
        height: 2rem;
        line-height: 2rem;
    }
    .ico {
        padding: 0 2rem;
        img {
            width: 1.6rem;
            height: 1.6rem;
        }
    }
    .input-group {
        padding: 0.6rem 0 1rem;
        .list {
            margin-top: 0.4rem;
            input {
                width: 80%;
                text-indent: 0.4rem;
                height: 1.2rem;
                line-height: 1.2rem;
                font-size: 0.6rem;
                border: 1px solid #eee;
            }
            a {
                display: block;
                width: 20%;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                background-color: #ffa033;
                color: #fff;
                font-size: 0.6rem;
            }
        }
    }
}

::-webkit-input-placeholder {
    color: #ccc;
    font-size: 0.6rem;
    padding-left: 0.2rem
}

::-moz-placeholder {
    color: #ccc;
    font-size: 0.6rem;
    padding-left: 0.2rem
}

:-moz-placeholder {
    color: #ccc;
    font-size: 0.6rem;
    padding-left: 0.2rem
}
</style>

