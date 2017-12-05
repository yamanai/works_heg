import { CookieUtil } from "models/utils/CookieUtil.js";
import Vue from "vue";
import Router from "vue-router";
import { Indicator } from "mint-ui";

const offers = resolve => require(["../pages/home/child/offers.vue"], resolve);
const Home = resolve => require(["../pages/home/home.vue"], resolve);
const Flight = resolve => require(["../pages/flight/flight.vue"], resolve);
const Order = resolve => require(["../pages/order/order.vue"], resolve);
const Payment = resolve => require(["../pages/payment/payment.vue"], resolve);
const Register = resolve =>
  require(["../pages/register/register.vue"], resolve);
const Book = resolve => require(["../pages/book/book.vue"], resolve);
const Search = resolve => require(["../pages/home/child/Search.vue"], resolve);
const OneWay = resolve =>
  require(["../pages/flight/child/oneflight.vue"], resolve);
const Filter = resolve =>
  require(["../pages/flight/child/filter.vue"], resolve);
const FilterB = resolve =>
  require(["../pages/flight/child/filterB.vue"], resolve);
const Roundtrip = resolve =>
  require(["../pages/flight/child/roundtrip.vue"], resolve);
const Detail = resolve =>
  require(["../pages/passengers/child/detail.vue"], resolve);
const Menu = resolve => require(["../pages/menu/menu.vue"], resolve);
const Sign = resolve => require(["../pages/book/child/signin.vue"], resolve);
const Passenger = resolve =>
  require(["../pages/passengers/passenger.vue"], resolve);
const Feedback = resolve =>
  require(["../pages/feedback/feedback.vue"], resolve);
const Contact = resolve => require(["../pages/contact/contact.vue"], resolve);
const Offer = resolve => require(["../pages/offer/offer.vue"], resolve);
const Fare = resolve => require(["../pages/book/child/fare.vue"], resolve);
const OrderDetail = resolve => require(["../pages/order/detail.vue"], resolve);
const Trip = resolve => require(["../pages/trip/trip.vue"], resolve);
const Ticket = resolve => require(["../pages/ticket/ticket.vue"], resolve);
const loading = resolve =>
  require(["../components/loading/loading.vue"], resolve);
const account = resolve => require(["../pages/account/account.vue"], resolve);
const Traveller = resolve =>
  require(["../pages/book/child/traveller.vue"], resolve);
const payfailure = resolve =>
  require(["../pages/payment/child/failure.vue"], resolve);
const paysuccess = resolve =>
  require(["../pages/payment/child/success.vue"], resolve);
const payresults = resolve =>
  require(["../pages/payment/payresults.vue"], resolve);
const agreement = resolve =>
  require(["../pages/agreement/agreement.vue"], resolve);
const nopay = resolve => require(["../pages/order/child/nopay.vue"], resolve);
const complete = resolve =>
  require(["../pages/order/child/complete.vue"], resolve);
const refund = resolve => require(["../pages/order/child/refund.vue"], resolve);
const upcoming = resolve =>
  require(["../pages/order/child/upcoming.vue"], resolve);
const canceltrip = resolve =>
  require(["../pages/order/child/canceltrip.vue"], resolve);
const changetrip = resolve =>
  require(["../pages/order/child/changetrip.vue"], resolve);
const wallet = resolve => require(["../pages/wallet/wallet.vue"], resolve);
const about = resolve => require(["../pages/about/about.vue"], resolve);
const withdraw = resolve =>
  require(["../pages/happywallet/child/withdraw.vue"], resolve);
const rules = resolve => require(["../pages/wallet/child/rules.vue"], resolve);
const referral = resolve =>
  require(["../pages/referral/referral.vue"], resolve);
const referrerInfo = resolve =>
  require(["../pages/referral/child/referralInfo.vue"], resolve);
const cashback = resolve =>
  require(["../pages/cashback/cashback.vue"], resolve);
const diwali = resolve => require(["../pages/offer/child/diwali.vue"], resolve);
const recharge = resolve =>
  require(["../pages/recharge/recharge.vue"], resolve);
const rechargeint = resolve =>
  require(["../pages/recharge/rechargeint.vue"], resolve);
const happywallet = resolve =>
  require(["../pages/happywallet/happywallet.vue"], resolve);
const privacy = resolve => require(["../pages/privacy/privacy.vue"], resolve);
const profile = resolve => require(["../pages/profile/profile.vue"], resolve);
const security = resolve =>
  require(["../pages/security/security.vue"], resolve);
const forgotpassword = resolve =>
  require(["pages/forgotpassword/forgotpassword.vue"], resolve);
const forgotpassworduser = resolve =>
  require(["pages/forgotpassword/forgotpassworduser.vue"], resolve);
const login = resolve => require(["pages/login/login.vue"], resolve);
const forgotpay = resolve =>
  require(["pages/forgotpassword/forgotpay.vue"], resolve);
const ticketlist = resolve =>
  require(["pages/ticketlist/ticketlist.vue"], resolve);
const guaranteed = resolve =>
  require(["pages/homeoffer/guaranteed.vue"], resolve);
const pay = resolve => require(["pages/payment/pay.vue"], resolve);
const verification = resolve =>
  require(["pages/verification/verification.vue"], resolve);
const rp = resolve => require(["pages/rp/rp.vue"], resolve);

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
      meta: { keepAlive: true }
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/about",
      component: about
    },
    {
      path: "/privacy",
      component: privacy
    },
    {
      path: "/profile",
      component: profile
    },
    {
      path: "/wallet",
      component: wallet
    },
    {
      path: "/withdraw",
      component: withdraw
    },
    {
      path: "/account",
      component: account
    },
    {
      path: "/security",
      component: security
    },
    {
      path: "/offers",
      component: offers
    },
    {
      path: "/guaranteed",
      component: guaranteed
    },
    {
      path: "/happywallet",
      component: happywallet
    },
    {
      path: "/cashback",
      component: cashback
    },
    {
      path: "/happydiwali",
      component: diwali
    },
    {
      path: "/ticketlist",
      component: ticketlist
    },
    {
      path: "/referral",
      component: referral
    },
    {
      path: "/referrerInfo",
      component: referrerInfo
    },
    {
      path: "/recharge",
      component: recharge
    },
    {
      path: "/rechargeint",
      component: rechargeint
    },
    {
      path: "/wallet/rules",
      component: rules
    },
    {
      path: "/loading",
      component: loading
    },
    {
      path: "/agreement",
      component: agreement
    },
    {
      path: "/traveller",
      component: Traveller,
      meta: { keepAlive: true },
      children: [
        {
          path: "detail"
        }
      ]
    },
    {
      path: "/menu",
      component: Menu
    },
    {
      path: "/verification",
      component: verification
    },
    {
      path: "/search",
      component: Search,
      meta: { keepAlive: true }
    },
    {
      path: "/flight",
      component: Flight,
      redirect: "/oneway",
      children: [
        {
          path: "/oneway",
          component: OneWay,
          meta: { keepAlive: false },
          children: [
            {
              path: "filter",
              component: Filter
            }
          ]
        },
        {
          path: "/roundtrip",
          component: Roundtrip,
          meta: { keepAlive: false },
          children: [
            {
              path: "filter",
              component: Filter
            },
            {
              path: "filterB",
              component: FilterB
            }
          ]
        }
      ]
    },
    {
      path: "/order",
      component: Order,
      redirect: "/search",
      children: [
        {
          path: "nopay",
          component: nopay
        },
        {
          path: "complete",
          component: complete
        },
        {
          path: "refund",
          component: refund
        },
        {
          path: "upcoming",
          component: upcoming
        },
        {
          path: "cancel",
          component: canceltrip
        },
        {
          path: "change",
          component: changetrip
        }
      ]
    },
    {
      path: "/orderdetail",
      component: OrderDetail
    },
    {
      path: "/payment",
      component: Payment
    },
    {
      path: "/pay",
      component: pay
    },
    {
      path: "/payresults",
      component: payresults,
      children: [
        {
          path: "payfailure",
          component: payfailure
        },
        {
          path: "paysuccess",
          component: paysuccess
        }
      ]
    },
    {
      path: "/register",
      component: Register,
      meta: { keepAlive: true }
    },
    {
      path: "/book",
      component: Book,
      children: [
        {
          path: "fare",
          component: Fare
        }
      ]
    },
    {
      path: "/detail",
      component: Detail,
      meta: { keepAlive: false }
    },
    {
      path: "/sign",
      component: Sign
    },
    {
      path: "/feedback",
      component: Feedback
    },
    {
      path: "/offer",
      component: Offer
    },
    {
      path: "/ticket",
      component: Ticket
    },
    {
      path: "/trip",
      component: Trip
    },
    {
      path: "/contact",
      component: Contact
    },
    {
      path: "*",
      component: Home
    },
    {
      path: "/forgotpassword",
      component: forgotpassword
    },
    {
      path: "/forgotpassworduser",
      component: forgotpassworduser
    },
    {
      path: "/forgotpay",
      component: forgotpay
    },
    {
      path: "/rp",
      component: rp
    }
  ]
});

export default router;
