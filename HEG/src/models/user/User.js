import { DomainManager } from "../../config/DomainManager";
import { TimeFormatUtil } from "../utils";

export class User {
  /**
   * 
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} emailAddress
   * @param {string} phoneNumber
   */
  constructor(
    firstName,
    lastName,
    middleName,
    email,
    cellphone,
    sex,
    address,
    birthDate,
    userId,
    userName,
    payPassword
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.email = email;
    this.cellphone = cellphone;
    this.sex = sex;
    this.address = address;
    this.birthDate = birthDate;
    this.userId = userId;
    this.userName = userName;
    this.payPassword = payPassword;
  }

  /**
   * 
   * @param {any} vueComp
   * @param {string} username
   * @param {string} password
   * @param {boolean} ifRememberme
   */
  static login(vueComp, username, password, ifRememberme) {
    let params = new Map();
    params.set("userName", username);
    params.set("password", password);
    params.set("rememberMe", ifRememberme);

    let queryParams = DomainManager.getQueryString(params);
    let url = DomainManager.getSearchLoginURLStirng(queryParams);
    //{ credentials: true, headers: { "x-Device": "mobile" } }
    let result = vueComp.$http.get(url, {
      withCredentials: true,
      headers: { "x-Device": "mobile" }
    });

    return result;
    //return vueComp.$http.get(url);
  }

  /**
   * 
   * @param {any} vueComp
   * @param {string} facebookid
   * @param {string} email
   * @param {string} name
   */
  static loginWithFacebookInfos(
    vueComp,
    facebookid,
    email,
    firstName,
    lastName
  ) {
    let parmsMap = new Map();

    parmsMap.set("id", facebookid);
    parmsMap.set("first_name", firstName);
    parmsMap.set("last_name", lastName);
    parmsMap.set("email", email);

    let qs = DomainManager.getQueryString(parmsMap);
    let urlString = DomainManager.getLoginWithFaceBookAccountUrlString(qs);

    vueComp.$http
      .get(urlString)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getUserOrders(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.getUserOrdersUrlString(), { withCredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  static loadUser(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.getUserInfoUrlString(), { withCredentials: true })
        .then(res => {
          res.json().then(json => {
            let {
              firstName,
              lastName,
              middleName,
              email,
              cellphone,
              sex,
              address,
              birthDate,
              userId,
              userName,
              payPassword
            } = json;
            resolve(
              new User(
                firstName,
                lastName,
                middleName,
                email,
                cellphone,
                sex,
                address,
                birthDate,
                userId,
                userName,
                payPassword
              )
            );
          });
        })
        .catch(err => reject(err));
    });
  }

  static changeUserInfo(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.changeUserInfo(String), {
          withCredentials: true,
          Header: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.getPassword(String))
        .then(res => {
          res.json().then(json => resolve(json));
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static changeUserPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.changeUserPassword(String), {
          withCredentials: true
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static resetPayPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.get(DomainManager.resetPayPassword(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static setPayPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.setPayPassword(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static settoPayPassword(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.settoPayPassword(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static checkAuthen(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.checkAuthen(), { withcredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static sendAuthenOTP(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.sendAuthenOTP(), { withcredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareRegister(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareRegister(), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareByEmail(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareByEmail(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareBySMS(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareBySMS(String), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static shareUrl(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.shareUrl(), {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static idcardUpload(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.idcardUpload(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static pushFeedback(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.feedback(String))
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static getGold(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.balanceOfGold(), { withcredentials: true })
        .then(
          res => {
            resolve(res.body);
          },
          res => {
            reject(res);
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  }

  static getRechargeConfig(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.getRechargeConfig(), { withcredentials: true })
        .then(
          res => {
            resolve(res.body);
          },
          res => {
            reject(res);
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  }

  static sendRegisterOTP(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.sendRegisterOTP(String))
        .then(res => {
          res.json().then(json => {
            resolve(json);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static applyResetPass(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.applyResetPass(String))
        .then(res => {
          res.json().then(json => {
            resolve(json);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static resetPayPasswordNew(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.resetPayPasswordNew(String))
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static getCheckWay(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.getCheckWay(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static resetPassNew(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.resetPassNew(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static setPayPasswordNew(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.setPayPasswordNew(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static refundsJson(tarvellerId, otp, reasonType) {
    return {
      flightPsrIds: tarvellerId,
      otp: otp,
      reasonType: reasonType
    };
  }

  // tui piao
  static refunds(vueComp, tarvellerId, otp, reasonType) {
    let json = this.refundsJson(tarvellerId, otp, reasonType);
    let jsonStr = JSON.stringify(json);
    let url = DomainManager.getRefundsUrl();
    return new Promise((resolve, reject) => {
      vueComp.$http.post(url, jsonStr).then(res => {
        res
          .json()
          .then(jsonObj => {
            resolve(jsonObj);
          })
          .catch(err => {
            reject(jsonObj);
          });
      });
    });
  }

  static getChangeSignJson(tarvellerId, flightNo, date) {
    return (
      "{" +
      '"map":{"' +
      tarvellerId +
      '":' +
      this.getChangeSignMapInfo(flightNo, date) +
      "}}"
    );
  }

  //change sign
  static changeSign(tarvellerId, flightNo, date, vueComp) {
    let dateStr = TimeFormatUtil.getYearMonthDateString(date);
    let jsonStr = this.getChangeSignJson(tarvellerId, flightNo, dateStr);

    let url = DomainManager.getChangeSignUrl();
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(url, jsonStr)
        .then(req => {
          req
            .json()
            .then(json => {
              if (json.success) {
                resolve(json);
              } else {
                let err = new Error("Flight information is incorrect");
                reject(err);
              }
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => reject(err));
    });
  }
  static rechargeWallet(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.rechargeWallet(String), { withCredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static searchCashBack(vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.searchCashBack(), { withCredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static getRefundAmount(vueComp, String) {
    return new Promise((reslove, reject) => {
      vueComp.$http.get(DomainManager.getRefundAmount(String)).then(res => {
        res
          .json()
          .then(json => {
            reslove(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static getCashConfig(vueComp) {
    return new Promise((reslove, reject) => {
      vueComp.$http
        .get(DomainManager.getCashConfig(), { withCredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              reslove(json);
            })
            .catch(err => {
              reject(err);
            });
        });
    });
  }

  static getRefundOTP(vueComp, String) {
    return new Promise((reslove, reject) => {
      vueComp.$http.get(DomainManager.getRefundOTP(String)).then(res => {
        res
          .json()
          .then(json => {
            reslove(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  //get offer & ad list
  static advList(vueComp, String) {
    return new Promise((reslove, reject) => {
      vueComp.$http.get(DomainManager.advList(String)).then(res => {
        res
          .json()
          .then(json => {
            reslove(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  static getGSOtp(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http
        .get(DomainManager.getGSOtp(String), { withcredentials: true })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => reject);
        });
    });
  }

  static getWebsiteInfo(vueComp) {
    return new Promise((reslove, reject) => {
      vueComp.$http.get(DomainManager.getWebsiteInfo()).then(res => {
        res
          .json()
          .then(json => {
            reslove(json);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }
}
