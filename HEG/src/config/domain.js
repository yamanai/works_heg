import { getJsonUtil } from "../models/utils/getJsonUtil.js";

getJsonUtil.domainJson().then(
  res => {
    let session = sessionStorage;

    domainJson = res;
    let resStr = JSON.stringify(res);
    sessionStorage.domainJsonStre = resStr;
  },
  error => {
    console.error(error);
  }
);

export var domainJson;
//mode  PROD || TEST
export class CashfreeConfig {
  static setConfig() {
    var config = {};
    config.layout = { view: "popup", width: "500" };
    config.mode = "PROD";
    return config;
  }
}
