<template>
  <div class="wrapper">
    <head-top class="header">
      <i slot="left" class="prev iconfont icon-back" @click="$router.go(-1)"></i>
      <div slot="title" class="title">Withdraw</div>
      <i slot="right" class="sp iconfont icon-back"></i>
    </head-top>
    <div class="container">
      <div class="mask" v-if="showTips"></div>
      <div class="amount-tips" v-if="showTips">
        <div class="text-area">
          <p>Your request was accepted successfully.</p>
          <p>
            <i class="rs">Rs.</i> {{cf}}was charged as a transaction fee and
            <i class="rs">Rs.</i> {{ia}}will be transferred into you Bank account in 15 working days.</p>
          <a @click="$router.push('/happywallet')">OK</a>
        </div>

      </div>
      <div class="content">
        <div class="text">
          <h2>Terms & Conditions</h2>
          <p>1. According to the policy of Reserve Bank of India, we need to verify your personal identity at the 1st time you withdraw on our website.</p>
          <p>2. The maximum accumulated amount you can withdraw is
            <i class="rs">Rs.</i>10,000 in the past 30 days.</p>
          <p>3. 3% of withdrawal amount or
            <i class="rs">Rs.</i>30 will be charged (inclusive of GST) for your transaction fee each time whichever is higher. </p>
          <p>4. The transaction fee will be deducted from the withdrawal amount that you applied.</p>
          <p>5. The minimum withdrawal amount should be no less than
            <i class="rs">Rs.</i>100 each time.</p>
          <p>6. The withdrawal amount (less fees and tax) will be transferred into your bank account in 15 working days.</p>
        </div>
        <div class="line"></div>
        <div class="form-group">
          <label for="card">Beneficiary Credit Card No</label>
          <div class="fw">
            <input type="text" id="card" v-model="info.cardNo">
          </div>
        </div>

        <div class="form-group">
          <label for="account">Re-Enter Beneficiary Account No / Credit Card No:</label>
          <div class="fw">
            <input type="text" id="account" v-model="rcardNo">
          </div>
        </div>

        <div class="form-group">
          <label for="account">Beneficiary account type:</label>
          <div class="fw">
            <select name="type" id="" v-model="info.accountType">
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
              <option value="Overdraft">Overdraft</option>
              <option value="Cash Credit">Cash Credit</option>
              <option value="Loan Account">Loan Account</option>
              <option value="NRE">NRE</option>
              <option value="Card Payment">Card Payment</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="">IFSC Code:</label>
          <div class="fw">
            <input type="text" id="" v-model.trim="info.ifscCode">
          </div>
        </div>

        <div class="form-group">
          <label for="">Bank Name:</label>
          <div class="fw">
            <input type="text" id="" v-model.trim="info.bankName">
          </div>
        </div>

        <div class="form-group">
          <label for="">Branch Name:</label>
          <div class="fw">
            <input type="text" id="" v-model.trim="info.openBank">
          </div>
        </div>

        <div class="form-group">
          <label for="">Bank Branch Address:</label>
          <div class="fw">
            <input type="text" id="" v-model.trim="info.openBankAddress">
          </div>
        </div>

        <div class="form-group">
          <label for="">Beneficiary Name</label>
          <div class="fw">
            <input type="text" id="" v-model.trim="info.cardName">
          </div>
        </div>

        <div class="form-group">
          <label for="">Email ID</label>
          <div class="fw">
            <input type="email" id="" v-model.trim="info.email">
          </div>
        </div>

        <div class="form-group">
          <div class="spfg">
            <span>Amount available:
              <i class="rs">Rs.</i> {{limitAmount}}
            </span>

            <span>
              Balance:
              <i class="rs">Rs.</i>{{goldTotal}}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="">Withdrawal Amount</label>
          <div class="spfg flex space-between align-items-center">
            <input type="number" id="" v-model.number.trim="info.cashAmount">
          </div>
        </div>

        <div class="form-group">
          <div class="tips flex space-between align-items-center">
            <div class="flex content-start align-items-center">
              <span>Convinience Fee:</span>
              <i class="rs">Rs.</i>
              <span>{{cfAmount}}
              </span>
            </div>
            <div class="flex content-start align-items-center">
              <span>Income Amount:</span>
              <i class="rs">Rs.</i>
              <span>{{aiAmount}}
              </span>
            </div>
          </div>
        </div>

        <button class="btn" @click="submit()">Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '../../../components/head/head.vue'
import { User } from '../../../models/user'
import { Toast, Indicator } from 'mint-ui'

export default {
  components: {
    headTop
  },
  data() {
    return {
      info: {
        cardNo: '',
        accountType: 'Savings',
        ifscCode: '',
        bankName: '',
        openBank: '',
        openBankAddress: '',
        cardName: '',
        email: '',
        cashAmount: 0
      },
      rcardNo: '',
      goldTotal: 0,
      limitAmount: '',
      cf: 0,
      ia: 0,
      showTips: false,
      verifySign: false
    }
  },
  methods: {
    verify(item) {
      if (item.length == 0) {
        Toast('Please fill in the form completely.')
        return false
      }
    },
    submit() {
      if (this.info.cardNo.length == 0) {
        Toast('Please fill in the form completely.')
      } else if (this.info.ifscCode.length == 0) {
        Toast('Please fill in the form completely.')
      } else if (this.info.bankName.length == 0) {
        Toast('Please fill in the form completely.')
      } else if (this.info.openBank.length == 0) {
        Toast('Please fill in the form completely.')
      } else if (this.info.openBankAddress.length == 0) {
        Toast('Please fill in the form completely.')
      } else if (this.info.cardName.length == 0) {
        Toast('Please fill in the form completely.')
      } else if (this.info.email.length == 0) {
        Toast('Please fill in the form completely.')
      } else if (this.info.cardNo != this.rcardNo) {
        Toast('Please check your card number')
      } else if (this.info.cashAmount < 100) {
        Toast('Please enter the corret balance,at least 100')
      } else {
        Indicator.open({ spinnerType: 'fading-circle' });

        var parm = '';
        for (var x in this.info) {
          parm += x + '=' + this.info[x] + '&'
        }
        User.applyWalletCash(this, parm).then(res => {
          if (res.success) {
            Indicator.close();
            this.showTips = true
          } else {
            Toast('error')
            Indicator.close();
          }
        })
      }
    }
  },
  computed: {
    amount() {
      return this.info.cashAmount;
    },
    cfAmount() {
      if (this.info.cashAmount == 0) {
        return 0
      }
      this.cf = Math.ceil(this.info.cashAmount * 0.03) >= 30 ? Math.ceil(this.info.cashAmount * 0.03) : 30;
      return this.cf;
    },
    aiAmount() {
      if (this.info.cashAmount == 0) {
        return 0
      }
      this.ia = (this.info.cashAmount - this.cf) > 0 ? this.info.cashAmount - this.cf : 0;
      return this.ia;
    }
  },
  watch: {
    amount(newValue) {
      // if (newValue < 100) {
      //   newValue = 100;
      // }
      this.info.cashAmount = Math.min.apply(null, [Number.parseInt(newValue), this.limitAmount, this.goldTotal]);
    }
  },
  created() {
    var self = this;
    User.getGold(self).then(res => {
      self.goldTotal = Number(res.happyGoldBalance);
    })

    User.getCashConfig(self).then(res => {
      console.log(res.data.maxCashAmount)
      this.limitAmount = res.data.maxCashAmount;
    })
  },
  mounted() {

  }
}
</script>
<style lang='less' scoped>
.header {
  background: #0b9d78;
  .sp {
    opacity: 0;
  }
  .title {
    line-height: 2.04rem;
    font-size: 0.768rem;
    color: #fff;
  }
}

.container {
  background-color: #fff;
  padding: 0.427rem;
  padding-top: 2.467rem; // position: relative;
  .mask {
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 10;
  }
  .amount-tips {
    position: fixed;
    width: 12.16rem;
    height: 8.32rem;
    background: #fff;
    top: 50%;
    margin-left: -6.08rem;
    left: 50%;
    margin-top: -4.16rem;
    z-index: 99;
    .text-area {
      padding: 1.06rem 0.64rem;
      p {
        font-size: 0.64rem;
        text-align: left;
        padding-bottom: 0.21rem;
      }
      a {
        width: 10.88rem;
        height: 1.49rem;
        line-height: 1.49rem;
        display: block;
        background: #ffad3d;
        color: #fff;
        font-size: 0.64rem;
        margin: 0 auto;
        margin-top: 0.8rem;
        border-radius: 4px;
      }
    }
  }
  .content {
    background-color: #ffffff;
    padding: 0 0.64rem 0.64rem 0.64rem;
    .text {
      text-align: left;
      padding: 0 0.64rem 0 0.64rem;
      h2 {
        font-size: 0.64rem;
        margin-bottom: 0.853rem;
        color: #333333;
      }
      p {
        font-size: 0.512rem;
        margin-bottom: 0.768rem;
        color: #333333;
      }
    }
    .line {
      height: 1px;
      width: 100%;
      border-bottom: 1px solid #ddd;
      margin: 0.64rem 0;
    }
    .form-group {
      box-sizing: border-box;
      padding: 0 0.64rem;
      text-align: left;
      padding-bottom: 0.64rem;
      width: 100%;
      margin: 0 auto;
      label {
        display: inline-block;
        font-size: 0.64rem;
        padding-bottom: 0.43rem;
      }
      .tips {
        span,
        i {
          color: #f65858;
          font-size: 0.469rem;
          display: block;
        }
        i {
          margin-top: 0.1rem;
        }
      }
      input {
        width: 100%;
        padding: 0.3rem;
        outline: none;
        text-indent: 0;
        border-radius: 0;
        display: inline-block;
        box-sizing: border-box;
      }
      .fw {
        display: table;
        width: 100%;
        border: 1px #ccc solid;
        border-radius: 3px;
        overflow: hidden;
        input,
        span {
          font-size: 0.64rem;
          display: table-cell;
          vertical-align: middle;
          box-sizing: border-box;
        }
        select {
          font-size: 0.64rem;
          width: 100%;
          padding: 0.3rem;
        }
        #card:after {
          width: 100%;
          height: 100%;
          color: red;
        }
        span {
          display: block;
          width: 3rem;
          text-align: center;
          a {
            display: inline-block;
            width: 3.45rem;
            height: 100%;
            color: #ffffff;
          }
        }
      }
      .spfg {
        width: 100%;
        border-radius: 3px;
        input {
          font-size: 0.64rem;
          width: 100%;
          border: 1px #ccc solid;
        }
        span {
          display: block;
          font-size: 0.64rem;
          padding-top: 0.32rem;
        }
      }
      #card {
        display: block;
        width: 100%;
        font-size: 0.64rem;
        outline: none;
        padding: 0.3rem;
      }
    }
    .sp {
      padding-bottom: 3.24rem;
    }
    .info {
      font-size: 0.64rem;
      color: #cccccc;
      padding-bottom: 0.6rem;
      text-align: left;
    }
    .btn {
      width: 100%;
      height: 1.7rem;
      line-height: 1.7rem;
      display: block;
      font-size: 0.64rem;
      border-radius: 5px;
      color: #ffffff;
      background-color: #ffad3d;
      margin-bottom: 1.5rem;
    }
  }
}
</style>