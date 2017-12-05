<template>
    <div class="wrapper">
        <head-top class="header">
            <i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
            <div slot="title" class="title">Forgot Passoword</div>
            <i slot="right" class="sp iconfont icon-back"></i>
        </head-top>
        <div class="content">
            <div class="form">
                <div class="form-group">
                    <input class="user" type="text" v-model="email" placeholder="User Name">
                    <a class="btn" @click="ifUser()" href="javascript:">Send</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from 'components/head/head.vue';
import { CookieUtil } from 'models/utils';
import { Toast, Indicator } from 'mint-ui';
import { User } from 'models/user';
export default {
    components: {
        headTop
    },
    data() {
        return {
            email: ''
        }
    },
    methods: {
        ifUser() {
            if (this.email.trim() != '') {
                let parm = 'userName=' + this.email
                console.log(parm)
                User.getCheckWay(this, parm).then(res => {
                    if (res.success) {
                        sessionStorage.setItem('findUserPw', res.data);
                        this.$router.push('/forgotpassword')
                    } else {
                        Toast({
                            message: res.msg,
                            duration: 2000
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                Toast({
                    message: 'Please enter your user name',
                    duration: 2000
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.wrapper {
    .header {
        background: #0b9d78;
        i {
            padding: 0 0.64rem;
        }
        .title {
            font-size: 0.768rem;
        }
        .sp {
            opacity: 0;
        }
    }
    .content {
        padding: 0 1.28rem; // width: 100%;
        height: 100%;
        .form {
            padding-top: 2.44rem;
            .form-group {
                margin: 0.64rem 0;
                display: table;
                width: 100%;
                input {
                    height: 2rem;
                    display: table-cell;
                    box-sizing: border-box;
                    padding: 0.64rem;
                    width: 100%;
                    font-size: 0.64rem;
                    border: 1px solid #ddd;

                    border-radius: 0;
                }
                .email {
                    border-right: none;
                }
                .btn {
                    width: 2.3rem;
                    display: table-cell;
                    font-size: 0.64rem;
                    color: #fff;
                    background: #0b9d78;
                    padding: 0.64rem;
                }
            }
            .tc {
                font-size: 0.512rem;
                .gotc {
                    color: #0b9d78;
                }
                .select {
                    width: 0.7rem;
                    height: 0.7rem;
                    margin: 0.01rem 0.3rem 0 0;
                    background: url('~assets/images/common/select-green.png') center no-repeat;
                    background-size: 100%;
                }
                .noselect {
                    background: url('~assets/images/common/select-gray.png') center no-repeat;
                    background-size: 100%;
                }
            }
            .btnsp {
                margin: 0.64rem 0;
                display: block;
                width: 100%;
                line-height: 2rem;
                background: #ffad3d;
                color: #fff;
                font-size: 0.768rem;
            }
        }
    }
}
</style>