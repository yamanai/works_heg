<template>
  <div id="my_profile">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
      <div slot="title" class="title">My Profile</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="mp_container">
      <div class="mp_info ">
        <div class="mp_avatar flex content-center">
          <div class="avatar">
            <img :src="require('../../assets/images/profile/after.png')" alt="">
          </div>
        </div>
        <div class="info_text">
          <span class="name">{{username}}</span>
          </span>
        </div>

      </div>
      <div class="pro_info">
        <div class="title flex space-between align-items-center">
          <span>Personal Info</span>
          <div class="flex content-end">
            <!-- <a class="edit" :class="{colorPri: isActive, grayDark: !isActive}" @click="cancelInfo" v-if="edit">Cancel</a> -->
            <a class="edit" :class="{colorPri: isActive, grayDark: !isActive}" @click="changeInfo" v-if="edit">Save</a>
            <img class="edit_begin" src="../../assets/images/profile/edit.png" alt="edit" v-else @click="editBegin">
          </div>
        </div>
        <div class="pro_list" v-show="edit">
          <div class="mint-cell mint-field sexBox">
            <div class="mint-cell-wrapper flex align-items-center">
              <div class="mint-cell-title">
                <div class="mint-cell-text">
                  First Name
                </div>
              </div>
              <div class="form-group">
                <input type="text" name="name" v-model="profile.firstName" placeholder="Input your First Name" disabled="disabled">
              </div>
            </div>
          </div>

          <div class="mint-cell mint-field sexBox">
            <div class="mint-cell-wrapper flex align-items-center">
              <div class="mint-cell-title">
                <div class="mint-cell-text">
                  Last Name
                </div>
              </div>
              <div class="form-group">
                <input type="text" name="name" v-model="profile.lastName" placeholder="Input your Last Name" disabled="disabled">
              </div>
            </div>
          </div>

          <div class="mint-cell mint-field sexBox">
            <div class="mint-cell-wrapper flex align-items-center">
              <div class="mint-cell-title">
                <div class="mint-cell-text">
                  Gender
                </div>
              </div>
              <div class="sex">
                <input type="radio" name="sex" value="0" v-model="profile.sex" disabled="disabled"> Male
                <input type="radio" name="sex" value="1" v-model="profile.sex" disabled="disabled"> Female
              </div>
            </div>
          </div>

          <div class="mint-cell mint-field sexBox">
            <div class="mint-cell-wrapper flex align-items-center">
              <div class="mint-cell-title">
                <div class="mint-cell-text">
                  Email
                </div>
              </div>
              <div class="form-group">
                <span class="info-email"> {{profile.email}}
                </span>
              </div>
            </div>
          </div>

          <div class="mint-cell mint-field sexBox">
            <div class="mint-cell-wrapper flex align-items-center">
              <div class="mint-cell-title">
                <div class="mint-cell-text">
                  Telephone Number
                </div>
              </div>
              <div class="form-group flex align-items-center">
                <!-- <span>
                                                {{profile.cellphone}}
                                              </span> -->
                <input type="text" name="phone" v-model="profile.cellphone" placeholder="Input your Phone Number" disabled="disabled">
              </div>
            </div>
          </div>

          <div class="mint-cell mint-field sexBox">
            <div class="mint-cell-wrapper flex align-items-center">
              <div class="mint-cell-title">
                <div class="mint-cell-text">
                  Date of birth
                </div>
              </div>
              <div class="form-group">
                <span class="birth-wrap">
                  {{profile.birthDate||"Input your BirthDate"}}
                  <input class="birth" type="date" name="birth" v-model="profile.birthDate" placeholder="Input your Date of birth" disabled="disabled">
                </span>
              </div>
            </div>
          </div>

          <div class="mint-cell mint-field sexBox">
            <div class="mint-cell-wrapper flex align-items-center">
              <div class="mint-cell-title">
                <div class="mint-cell-text">
                  Address
                </div>
              </div>
              <div class="form-group">
                <input type="input" name="userid" rows="4" v-model="profile.address" placeholder="Input your Address" disabled="disabled">
              </div>
            </div>
          </div>
        </div>

        <div class="pro_list_show" v-show="!edit">
          <div class="info-group sp flex space-between">
            <span class="info-name">
              {{profile.firstName + " " + profile.lastName}}
            </span>
            <span class="info-title">
              {{sexShow||''}}
            </span>
          </div>
          <div class="info-group" v-if="profile.email">
            <!-- <span class="info-label">E-mail address</span> -->
            <span class="info-email">
              {{profile.email||''}}
            </span>
          </div>
          <div class="info-group" v-if="profile.cellphone">
            <!-- <span class="info-label">Telephone Number</span> -->
            <span class="info-email">
              {{profile.cellphone||''}}
            </span>
          </div>
          <div class="info-group" v-if="profile.birthDate">
            <!-- <span class="info-label">Date of birth</span> -->
            <span class="info-email">
              {{profile.birthDate||''}}
            </span>
          </div>
          <div class="info-group" v-if="profile.address">
            <!-- <span class="info-label">Address</span> -->
            <span class="info-email">
              {{profile.address||''}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '../../components/head/head.vue'
import { CookieUtil } from '../../models/utils'
import { User } from '../../models/user'
import { loginUserInfo } from '../../vuex/models/user/XUser.js'
import { DomainManager } from '../../config/DomainManager.js'
import { Toast, Indicator } from 'mint-ui';

export default {
  components: {
    headTop
  },
  data() {
    return {
      user: Object,
      showPro: false,
      edit: false,
      userPW: {
        password: '',
        newPassword: ''
      },
      newPasswordRP: '',
      infoArr: Array,
    }
  },
  computed: {
    username() {
      if (this.user.firstName == null && this.user.lastName == null) {
        return this.user.email;
      } else {
        return this.user.firstName + " " + this.user.lastName
      }
    },
    profile() {
      return this.user;
    },
    sexShow() {
      var sex;
      if (this.profile.sex == null) {
        sex = 'Gender'
      } else {
        this.profile.sex == 0 ? sex = 'Male' : sex = 'Female'
      }
      return sex;
    }
  },
  watch: {
    profile(val) {
      this.isActive = true;
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    editBegin() {
      var allform = document.getElementsByTagName('input');
      if (!this.edit) {
        for (var i = 0; i < allform.length; i++) {
          allform[i].disabled = '';
        }
      } else {
        for (var i = 0; i < allform.length; i++) {
          allform[i].disabled = 'disabled';
        }
      }
      this.edit = !this.edit;
    },
    getUser() {
      let cu = new CookieUtil(document)
      let self = this;
      if (cu.hasItem("uuid")) {
        User.loadUser(self)
          .then(user => {
            self.$nextTick(() => {
              self.user = user;
              self.$store.commit(loginUserInfo, user)
            })
          })
          .catch(err => { console.log(err) })
      } else {
        console.log('error');
      }
    },
    changeInfo() {
      var nreg = /^[A-Za-z\s\'\-\.]*[A-Za-z]+[A-Za-z\s\'\-\.]*$/;

      if (!this.isActive) return;

      if (this.profile.cellphone.length != 10) {
        Toast({
          message: 'Please enter a valid cell phone number',
          duration: 2000
        })
        return false;
      }

      if (this.profile.firstName == '' || this.profile.lastName == '') {
        Toast({
          message: 'Please input your first/last name',
          duration: 2000
        })
        return false;
      }

      if (!nreg.test(this.profile.firstName) || !nreg.test(this.profile.lastName)) {
        Toast({
          message: 'Please input your correct first/last name',
          duration: 2000
        })
        return false;
      }

      let self = this;
      let infoString = '';
      for (let v in this.profile) {
        if (this.profile[v] != undefined) {
          infoString += v + '=' + this.profile[v] + '&';
        }
      }

      User.changeUserInfo(this, infoString).then(function(res) {
        if (res.success) {
          Toast({
            message: 'success',
            duration: 1500
          })
        } else {
          Toast({
            message: res.msg,
            duration: 1500
          })
        }
      });
      this.editBegin();
    },
    cancelInfo() {
      this.edit = !this.edit;
    }

  },
  mounted() {
    console.log(this.profile.sex)
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/theme.less";
#my_profile {
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
  .mp_container {
    // padding: 0 1.28rem;
    // height: 10rem;
    // background: url("../../assets/images/profile/user-bg2.png") 0 0 no-repeat;
    background-size: cover;
    .mp_info {
      padding-top: 2rem; // background-color: @primary-color;
      background: url('../../assets/images/profile/bg.png') center bottom no-repeat;
      background-size: 100%;
      .mp_avatar {
        padding-top: 0.6rem;
        padding-bottom: 0.34rem;
        .avatar {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          img {
            width: 100%;
          }
        }
      }
      .info_text {
        padding: .4rem 0 2rem;
        span {
          display: block;
          line-height: 1.5;
          height: 1rem;
          color: #ffffff;
          font-size: 0.64rem;
        }
        .id {
          font-size: 0.512rem;
        }
        .tel {
          font-size: 0.512rem;
        }
      }
      .change_info {
        a {
          display: inline-block;
          padding: 0 0.2rem;
          img {
            display: inline-block;
            width: 0.7rem;
            height: 0.7rem;
          }
        }
      }
    }
    .wave-img {
      width: 100%;
      height: 1rem;
    }
    .pro_info {
      // padding-top:1.5rem;
      .title {
        text-align: left;
        font-size: 0.64rem;
        height: 1.7rem;
        line-height: 1.7rem;
        border-top: 1px solid @gray-light;
        border-bottom: 1px solid @gray-light;
        padding: 0 0.64rem;
        .edit {
          display: block;
          margin-left: 1.28rem;
        }
        .edit_begin {
          display: block;
          width: 0.8rem;
          height: 0.8rem;
          padding: 0.3rem;
        }
      }
      .pro_list {
        padding: 0 0.64rem 1rem 0.64rem;
        text-align: left;
         ::-webkit-input-placeholder {
          color: #adadad;
        }
         :-moz-placeholder {
          color: #adadad;
        }
         ::-moz-placeholder {
          color: #adadad;
        }
         :-ms-input-placeholder {
          color: #adadad;
        }
        .mint-cell {
          min-height: 1.7rem;
          font-size: 16px;
          .mint-cell-wrapper {
            width: 100%;
            .mint-cell-title {
              width: 40%;
              .mint-cell-text {
                font-size: 0.6rem;
                height: 1.7rem;
                line-height: 1.7rem;
                padding-left: 0.32rem;
              }
            }
            .sexBox {
              display: flex;
              justify-content: flex-start;
            }
            .sex {
              padding: .3rem;
            }
            .form-group {
              height: 1.3rem;
              width: 100%;
              span {
                padding-left: 0.3rem;
              }
              input {
                font-size: 0.6rem;
                display: block;
                width: 100%;
                box-sizing: border-box;
                padding: 0.3rem;
              }
              .info-email {
                display: block;
                padding: 0.3rem;
              }
              .birth-wrap {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
                box-sizing: border-box;
                padding: .3rem;
                margin-top: 0.05rem;
                font-size: 0.6rem;
                .birth {
                  opacity: 0;
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                }
              }
            }
          }
        }
      }

      .pro_list_show {
        padding: 0 0.64rem;

        .info-group {
          width: 100%;
          font-size: 0.6rem;
          height: 1.7rem;
          line-height: 1.7rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
          span {
            padding-left: 0.32rem;
          }
          &.sp {
            border: none;
          }
          .info-name,
          .info-title {
            width: 48%;
            border-bottom: 1px solid #ddd;
            padding-left: 0.32rem;
            box-sizing: border-box;
            height: 1.7rem;
          }
          .info-name {
            margin-right: 0.3rem;
          }

          .info-label {
            width: 40%;
            box-sizing: border-box;
            padding-left: 0.32rem;
          }
        }
      }
    }
  }
}

.mint-cell-wrapper {
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  background-image: none;
  border-bottom: 1px solid #d6d6d6;
}

.mint-cell {
  background-image: none;
}
</style>
