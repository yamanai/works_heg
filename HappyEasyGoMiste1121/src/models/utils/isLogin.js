import { CookieUtil } from "../../models/utils";
export let isLogin = {
  hasUuid: function() {
    let cu = new CookieUtil();
    cu.hasItem("uuid");
  }
};
