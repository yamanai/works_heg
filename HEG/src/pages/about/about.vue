<template>
    <div class="wrapper">
        <head-top class="header">
            <i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
            <div slot="title" class="title">About us</div>
            <i slot="right" class="sp iconfont icon-back"></i>
        </head-top>
        <div class="container">
            <div class="content-top">
                <div class="text_list">
                    <div class="item flex content-start align-items-center">
                        <div class="cyclo">
                            <img class="face" src="../../assets/images/aboutus/face@2x.png" alt="face-icon">
                        </div>
                        <div class="text">
                            <span class="title">HAPPY</span>
                            <span class="content">Enjoy happy moment when you booking</span>
                        </div>
                    </div>
                    <div class="item flex content-start align-items-center">
                        <div class="cyclo">
                            <img class="shield" src="../../assets/images/aboutus/shield@2x_11.png" alt="shield-icon">
                        </div>
                        <div class="text">
                            <span class="title">SECURITY</span>
                            <span class="content">Ensure the safety of your payment</span>
                        </div>

                    </div>
                    <div class="item flex content-start align-items-center">
                        <div class="cyclo">
                            <img class="point" src="../../assets/images/aboutus/point@2x_8.png" alt="point-icon">
                        </div>
                        <div class="text">
                            <span class="title">CONVENIENCE</span>
                            <span class="content">Easy way to find your cheap ticket</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-bottom">
                <div class="text">
                    <p>From going to the Travel Shop for Air Tickets, Hotel Booking &amb; Travel Package to the days of making enquiry on the land line phone or a mobile phone to a travel shop and moving to the fax era &amb; finally, landing on the internet platform. Travel industry has gone through a tremendous technical advance. We developed Happy Easy Go, because we are just like you who have long become online shoppers and always enjoyed discounting.
                    </p>
                    <p class="sp">With a proprietary airfare booking engine, Happy Easy Go is dedicate to provide the best fares available in the marketplace. Our team consists of the most experienced and customer centric travel experts that will ensure a happy and easy experience for our customers.
                    </p>
                </div>
                <div class="text">
                    <div class="item">
                        <h3>Join Us</h3>
                        <p>Come with us to make more Happy Easy travel.</p>
                    </div>
                    <div class="item">
                        <h3>Feedback Us</h3>
                        <p>Help us to improve the happy experience for you and more people.
                        </p>
                    </div>
                    <div class="item">
                        <h3>Contact Us</h3>
                        <p class="sp">Need a Happy Cooperate with Us? Feel free to contact us.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from '../../components/head/head.vue'
export default {
    components: {
        headTop
    },
    data() {
        return {

        }
    },
    methods: {
        operate() {
            try {
                window.heg.back();
            } catch (e) {

            }
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less" scoped>
.header {
    background-color: #0b9d78;
    .title {
        color: #fff;
        font-size: 0.769rem;
    }
    .sp {
        opacity: 0;
    }
}

.container {
    background-color: #f4f4f4;
    .content-top {
        background: #fff;
        height: 9.6rem;
        padding: 2.04rem 0.64rem 0.64rem 0.64rem;
        .text_list {
            width: 100%;
            padding-top: 1.07rem;

            .item {
                font-size: 0.64rem;
                padding-bottom: 1.408rem;

                .cyclo {
                    height: 1.39rem;
                    width: 1.39rem;
                    border-radius: 50%;
                    margin-right: 0.68rem;
                    background-color: #ffffff;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        display: block;
                        width: 1.2rem;
                        height: 1.2rem;
                    }
                    .shield {
                        height: 1.2rem;
                    }
                }
                .text {
                    float: left;
                    text-align: left;
                    margin-top: 0.1rem;
                }
                .title {
                    font-size: 0.568rem;
                    display: block;
                    color: #000;
                }
                .content {
                    font-size: 0.568rem;
                    display: block;
                    color: #ccc;
                }
                span {
                    padding: 0.15rem 0;
                }
            }
        }
    }
    .content-bottom {
        margin-bottom: 0.64rem;
        .text {
            text-align: left;
            padding: 0.85rem 0.81rem 0.81rem 0.81rem;
            margin-top: 0.2rem;
            background-color: #ffffff;
            .sp {
                padding-bottom: 0;
            }
            h3 {
                font-size: 0.512rem;
                font-weight: bold;
            }
            p {
                padding-bottom: 1.07rem;
                text-align: left;
                font-size: 0.512rem;
                line-height: 1.5;
            }
        }
    }
}
</style>
