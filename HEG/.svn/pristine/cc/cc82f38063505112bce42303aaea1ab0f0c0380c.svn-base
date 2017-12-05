import { DomainManager } from '../../config/DomainManager.js';

export class Register {
  constructor(email, otp, phoneNumber, password) {
    // this.firstname = firstname;
    // this.lastname = lastname;
    this.email = email;
    this.otp = otp;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }

  register(vueComp) {
    let paramMap = this.getRegisterMap();
    let queryParams = this.queryString(paramMap);
    let url = this.getRegisterUrl(queryParams);

    return vueComp.$http.post(url);
  }

  getRegisterMap() {
    let params = new Map();
    // let $action = "register";
    // params.set("action", $action);
    // params.set("firstName", this.firstname);
    // params.set("lastName", this.lastname);
    params.set("email", this.email);
    params.set("otp", this.otp);
    params.set("cellphone", this.phoneNumber);
    params.set("password", this.password);
    return params;
  }

  queryString(paramMap) {
    return DomainManager.getQueryString(paramMap);
  }

  getRegisterUrl(queryParams) {
    return DomainManager.getRegisterUrl(queryParams);
  }

  logout() {}
}
