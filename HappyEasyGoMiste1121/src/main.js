import {
  Button,
  DatetimePicker,
  Field,
  Picker,
  Popup,
  Radio,
  Range
} from "mint-ui";
import Vue from "vue";
import resource from "vue-resource";

import App from "./App.vue";
import filters from "./filter/filter.js";
import { FontUtil } from "./models/utils";
import router from "./router";
import { store } from "./vuex";

// var _ = require("lodash");

// const FastClick = require("fastclick");
// FastClick.attach(document.documentElement);

Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component("mt-button", Button);
Vue.component("mt-range", Range);
Vue.component("mt-popup", Popup);
Vue.component("mt-radio", Radio);
Vue.component(Field.name, Field);
Vue.use(resource);
// Vue.use(Mint);
Vue.filter("formatDate", filters.formatDate);

var refurl = document.referrer;
if (refurl.indexOf("happyeasygo") == -1 || refurl == "") {
  document.cookie = "refurl=" + refurl;
}
// else {
//   var date = new Date();
//   date.setTime(date.getTime() - 10000);
//   document.cookie = "refurl" + "=a; expires=" + date.toGMTString();
// }

// router.beforeEach((to, from, next) => {
//   var toPath = to.path;
//   next => {
//     if (sessionStorage.routerToPath) {
//       if (toPath == sessionStorage.routerToPath) {
//         Indicator.close();
//         sessionStorage.setItem("routerToPath", toPath);
//       }
//     } else {
//       sessionStorage.setItem("routerToPath", toPath);
//     }
//   };
// });

FontUtil.init();
var vm = new Vue({
  el: "#app",
  store,
  router,
  store,
  methods: {
    onLoadFinish() {
      window.heg && window.heg.onViewShow();
    }
  },
  mounted() {
    this.onLoadFinish();
  },
  render: h => h(App)
});
