import { domainJson } from "./domain.js";

export class DomainManager {
  static gitDominJson() {
    let domainJsonObj = {};
    if (typeof domainJson == "undefined") {
      let domainJsonStr = sessionStorage.domainJsonStre;
      domainJsonObj = domainJsonStr && JSON.parse(domainJsonStr);
    } else {
      domainJsonObj = domainJson;
    }

    return domainJsonObj;
  }

  static getCommonURLStringWithQueryString(path, queryString) {
    return (
      (this.gitDominJson().domain
        ? this.gitDominJson().protcal +
          "://" +
          this.gitDominJson().domain +
          ":" +
          this.gitDominJson().port
        : "") +
      path +
      "?" +
      queryString
    );
  }

  static getCommonURLString(path) {
    return (
      (this.gitDominJson().domain
        ? this.gitDominJson().protcal +
          "://" +
          this.gitDominJson().domain +
          ":" +
          this.gitDominJson().port
        : "") + path
    );
  }

  static getFlights(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getFlights,
      queryString
    );
  }

  static getSearchFlightsURLStirng(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().searchFlightPath,
      queryString
    );
  }
  static getSearchLoginURLStirng(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().loginPath,
      queryString
    );
  }

  static shareByEmail(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().shareByEmail,
      queryString
    );
  }

  static shareBySMS(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().shareBySMS,
      queryString
    );
  }

  static shareUrl() {
    return DomainManager.getCommonURLString(this.gitDominJson().shareUrl);
  }

  static getRegisterUrl(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().registerPath,
      queryString
    );
  }
  // this is for flight object to load more infomations
  static getLoadMoreInfoUrlString(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().loadMoreInfoPath,
      queryString
    );
  }

  static getRefundUrl(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().refund,
      queryString
    );
  }

  static getGSOtp(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getGSOtp,
      queryString
    );
  }

  static getPriceCheckUrlString() {
    return DomainManager.getCommonURLString(this.gitDominJson().checkPricePath);
  }

  static getRechargeConfig() {
    return DomainManager.getCommonURLString(
      this.gitDominJson().getRechargeConfig
    );
  }

  static sendRegisterOTP(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().sendRegisterOTP,
      queryString
    );
  }

  static applyResetPass(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().applyResetPass,
      queryString
    );
  }

  static idcardUpload(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().idcardUpload,
      queryString
    );
  }

  static resetPayPasswordNew(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().resetPayPasswordNew,
      queryString
    );
  }

  static getCheckWay(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getCheckWay,
      queryString
    );
  }

  static resetPassNew(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().resetPassNew,
      queryString
    );
  }

  static setPayPasswordNew(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().setPayPasswordNew,
      queryString
    );
  }

  static checkAuthen() {
    return DomainManager.getCommonURLString(this.gitDominJson().checkAuthen);
  }

  static shareRegister() {
    return DomainManager.getCommonURLString(this.gitDominJson().shareRegister);
  }

  static sendAuthenOTP() {
    return DomainManager.getCommonURLString(this.gitDominJson().sendAuthenOTP);
  }

  static getCheckUrlString() {
    return DomainManager.getCommonURLString(this.gitDominJson().check);
  }

  static getSaveOrderUrl() {
    return DomainManager.getCommonURLString(this.gitDominJson().saveOrderPath);
  }

  static getBaggageInfoUrlString() {
    return DomainManager.getCommonURLString(this.gitDominJson().getBaggageInfo);
  }
  static getChangeSignUrl() {
    return DomainManager.getCommonURLString(this.gitDominJson().changeSignPath);
  }

  static getRefundsUrl(queryString) {
    return DomainManager.getCommonURLString(
      this.gitDominJson().refunds,
      queryString
    );
  }

  static getRefundAmount(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getRefundAmount,
      queryString
    );
  }

  static getRefundOTP(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getRefundOTP,
      queryString
    );
  }

  static getCashConfig() {
    return DomainManager.getCommonURLString(this.gitDominJson().getCashConfig);
  }

  /**
     * @param {string} queryString
     * @returns string
     */
  static getLoginWithFaceBookAccountUrlString(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().loginxPath,
      queryString
    );
  }

  static getPaymentInfoUrlString() {
    return DomainManager.getCommonURLString(this.gitDominJson().getPaymentInfo);
  }

  static searchFlightOrderUrlString(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().searchOrder,
      queryString
    );
  }

  static getCouponURLString(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getCoupon,
      queryString
    );
  }

  static getUserOrdersUrlString() {
    return DomainManager.getCommonURLString(this.gitDominJson().getUserOders);
  }

  static getUserInfoUrlString() {
    return DomainManager.getCommonURLString(this.gitDominJson().searchUserInfo);
  }

  static getIfOrderPaiedUrlString(queryStr) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().ifOrderPaied,
      queryStr
    );
  }
  static getSearchOrderResultPageUrl(orderNumber) {
    let returnUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      "/search?" +
      "orderId=" +
      orderNumber;
    return returnUrl;
  }

  static getSearchOrderResultUrl(orderNumber) {
    let returnUrl =
      window.location.protocol + "//" + window.location.host + "/search?";
    return returnUrl;
  }

  static getFareRuleUrl(param) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getFareRulesPath,
      DomainManager.getQueryString(param)
    );
  }
  // get check passenger and children age
  static getCheckPassengerUrl() {
    return DomainManager.getCommonURLString(
      this.gitDominJson().getCheckPassengerPath
    );
  }

  static getHappySilver() {
    return DomainManager.getCommonURLString(this.gitDominJson().happySilver);
  }

  static getHappyGold() {
    return DomainManager.getCommonURLString(this.gitDominJson().happyGold);
  }

  static balanceOfSilver() {
    return DomainManager.getCommonURLString(
      this.gitDominJson().balanceOfSilver
    );
  }

  static balanceOfGold() {
    return DomainManager.getCommonURLString(this.gitDominJson().balanceOfGold);
  }

  static changeUserInfo(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().changeUserInfo,
      queryString
    );
  }

  static changeUserPassword(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().changeUserPassword,
      queryString
    );
  }

  static feedback(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().feedback,
      queryString
    );
  }

  static getQueryString(parmsMap) {
    let strBuffer = "";
    let isFirst = true;
    parmsMap.forEach((value, key, map) => {
      if (isFirst) {
        isFirst = false;
      } else {
        strBuffer += "&";
      }
      strBuffer += key + "=" + value;
    }, this);

    return strBuffer;
  }

  static getPassword(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getPassword,
      queryString
    );
  }

  static resetPayPassword(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().resetPayPassword,
      queryString
    );
  }

  static setPayPassword(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().setPayPassword,
      queryString
    );
  }

  static settoPayPassword(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().settoPayPassword,
      queryString
    );
  }

  static rechargeWallet(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().rechargeWallet,
      queryString
    );
  }

  static paymentMakeUp() {
    return DomainManager.getCommonURLString(this.gitDominJson().paymentMakeUp);
  }

  static searchCashBack() {
    return DomainManager.getCommonURLString(this.gitDominJson().searchCashBack);
  }

  static getCheckResult(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().getCheckResult,
      queryString
    );
  }

  // offer and ad list // put into User.js
  static advList(queryString) {
    return DomainManager.getCommonURLStringWithQueryString(
      this.gitDominJson().advList,
      queryString
    );
  }

  static getWebsiteInfo() {
    return DomainManager.getCommonURLString(this.gitDominJson().getWebsiteInfo);
  }
}
