import { DomainManager } from "../../config/DomainManager.js";
import { Airport } from "../airport";
import { BaggageInfo } from "../baggageinfo";
import { Business, Economy, First, PremiumEconomy } from "../cabinclass";
import { Flight } from "../flight";
import { Adult, Child, ContactInfo, Infant } from "../passenger";
import { SerializableObject } from "../serializable";
import { CabinClassUtil, TimeFormatUtil } from "../utils";
import { Toast } from "mint-ui";
import { CashfreeConfig } from "../../config/domain";

export const ERROR_TYPE_PRICE_OUT_OF_DATE = Symbol("price ot of date");

export class FlightOrder extends SerializableObject {
  constructor(
    departAirport,
    destinationAirport,
    departDate,
    adults = [],
    children = [],
    infants = [],
    cabinClass,
    contactInfo,
    baggageinfo = [],
    serviceFee,
    orderNumber,
    token,
    returnCash,
    ordersGSTInfo,
    otp
  ) {
    super();
    this.departAirport = departAirport;
    this.destinationAirport = destinationAirport;
    this.departDate = departDate;
    this.cabinClass = cabinClass;
    this.adults = adults;
    this.children = children;
    this.infants = infants;
    this.serviceFee = 0;
    this.contactInfo = contactInfo;
    this.baggageinfo = baggageinfo;
    this.orderNumber = "";
    this.token = token;
    this.returnCash = returnCash;
    this.ordersGSTInfo = ordersGSTInfo;
    this.otp = otp;
    this.goldInfo = null;
    this.isUseCash = false;
  }

  getSearchQueryMap() {
    let params = new Map();
    params.set("from", this.departAirport.iataCode);
    params.set("to", this.destinationAirport.iataCode);
    params.set("adults", this.adults.length);
    params.set("childs", this.children.length);
    params.set("baby", this.infants.length);
    params.set("cabinClass", CabinClassUtil.getClassString(this.cabinClass));
    params.set("airline", "");
    params.set("carrier", "");

    return params;
  }

  getSaveOrderFlight() {
    let saveOrderObj = {};

    let flightPsrList = [];

    flightPsrList = this.getFlightPsrList(flightPsrList, this.adults, 1);
    if (this.children.length > 0) {
      flightPsrList = this.getFlightPsrList(flightPsrList, this.children, 2);
    }
    if (this.infants.length > 0) {
      flightPsrList = this.getFlightPsrList(flightPsrList, this.infants, 3);
    }
    // if(this.contactInfo.length>0){
    // 	flightPsrList = this.getFlightPsrList(flightPsrList,this.contactInfo,"3");
    // }
    saveOrderObj.insurance = 0;
    saveOrderObj.suppliedId = 0;
    saveOrderObj.contactMob = this.contactInfo.cellphone;
    saveOrderObj.contactEmail = this.contactInfo.email;
    saveOrderObj.contactName = this.contactInfo.name;
    saveOrderObj.flightPsrList = flightPsrList;
    return saveOrderObj;
  }

  getFlightPsrList(flightPsrList, obj, passengerType) {
    for (let i = 0; i < obj.length; i++) {
      let passengerInfo = {};
      if (obj[i].title == "Male") {
        passengerInfo.sex = 0;
      } else {
        passengerInfo.sex = 1;
      }
      passengerInfo.passengerFirstName = obj[i].firstname;
      passengerInfo.passengerLastName = obj[i].lastname;
      // if (
      //   this.departFlight.airline.shortname.trim() != "I5" &&
      //   passengerType == "1"
      // ) {
      //   passengerInfo.birthDate = "";
      // } else {
      if (passengerType == "1" && passengerInfo.birthDate == "") {
        passengerInfo.birthDate = "";
      }
      // passengerInfo.birthDate = TimeFormatUtil.getYearMonthDateStringSpe(
      //   obj[i].birthday
      // );
      if (obj[i].birthday == null) {
        var birthDateFormart = "";
      } else {
        var birthStr = obj[i].birthday.split("-");

        var birthDateFormart =
          birthStr[2] + "-" + birthStr[1] + "-" + birthStr[0];
      }
      passengerInfo.birthDate = birthDateFormart;
      // }

      passengerInfo.passengerType = passengerType;
      flightPsrList.push(passengerInfo);
    }

    return flightPsrList;
  }

  getSearchQueryString() {
    return DomainManager.getQueryString(this.getSearchQueryMap());
  }

  searchSuitableFlights(vueComp) {
    let queryString = this.getSearchQueryString();
    let url = DomainManager.getSearchFlightsURLStirng(queryString);

    return new Promise(function(resolve, reject) {
      vueComp.$http
        .jsonp(url)
        .then(req => {
          req
            .json()
            .then(json => {
              if (json.success) {
                resolve(json);
              } else {
                reject(json.msg);
              }
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  //save order
  saveOrder(vueComp) {
    let saveOrderJson = this.getCheckPriceJsonParm();
    let flightOrder = this.getSaveOrderFlight();
    let coupon = vueComp.$store.getters.coupon;

    //total count

    flightOrder.discountPrice = this.totalPrice - this.serviceFee;
    flightOrder.payTransactionMap = coupon;

    saveOrderJson.flightOrder = flightOrder;
    let jsonStr = JSON.stringify(saveOrderJson);
    let url = DomainManager.getSaveOrderUrl();
    // headers: { "x-Device": "mobile" }
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(url, jsonStr, {
          withcredentials: true,
          headers: { "x-Device": "mobile" }
        })
        .then(res => {
          res
            .json()
            .then(json => {
              resolve(json);
            })
            .catch(err => reject(err));
        });
    });
  }

  paymentMakeUp(vueComp, id) {
    let paramsMap = {
      orderId: id,
      returnUrl: DomainManager.getSearchOrderResultUrl()
    };
    let jsonStr = JSON.stringify(paramsMap);
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.paymentMakeUp(), jsonStr).then(res => {
        res.json().then(json => {
          resolve(json);
        });
      });
    });
  }

  getCheckPriceJsonParm() {
    return {
      requestFromClient: {
        from: this.departAirport.iataCode,
        to: this.destinationAirport.iataCode,
        adults: String(this.adults.length),
        childs: String(this.children.length),
        baby: String(this.infants.length),
        cabinClass: CabinClassUtil.getClassString(this.cabinClass),
        airline: "",
        carrier: ""
      },
      ordersGSTInfo: this.ordersGSTInfo,
      token: this.token,
      returnCash: this.returnCash,
      otp: this.otp
    };
  }

  getFlights(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.get(DomainManager.getFlights(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json.flights);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  checkPrice(vueComp) {
    let json = this.getCheckPriceJsonParm();
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.getPriceCheckUrlString(), json)
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

  check(vueComp) {
    let json = this.getCheckPriceJsonParm();
    return new Promise((resolve, reject) => {
      vueComp.$http
        .post(DomainManager.getCheckUrlString(), json)
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

  getCheckResult(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$http.post(DomainManager.getCheckResult(String)).then(res => {
        res
          .json()
          .then(json => {
            resolve(json);
          })
          .catch(err => reject);
      });
    });
  }

  getGSOtp(vueComp, String) {
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

  /**
     * 
     * @param {any} vueComp
     * @returns {Promise}
     *  {"msg":
            {
                "appId":"16798af3fc1f5233ed7e2e6761",
                "orderId":"501047955600572456",
                "orderAmount":"13875.00",
                "customerName":"ffdsaf",
                "customerEmail":"dsa@qq.csi",
                "customerPhone":"415616513151",
                "returnUrl":"https://project.lvbanx.net/indi_demo/index.html?orderId=501045855361564679",
                "notifyUrl":"https://project.lvbanx.net/indi_demo/PayNotify.do",
                "orderNote":"HappyEasyGo4679",
                "paymentToken":"crjvzpic5kqgEEffXXgAxQoYt7+fTWQiUFv0vK78ceM="
             },
        "success":true}
     */
  requestPaymentOrderInfo(vueComp) {
    let paramsMap = {
      orderId: this.orderNumber,
      returnUrl: DomainManager.getSearchOrderResultPageUrl(this.orderNumber),
      otp: this.otp,
      phone: this.phone
    };
    if (sessionStorage.goldInfo) {
      paramsMap.payTransactionMap = JSON.parse(sessionStorage.goldInfo);
    } else {
      if (paramsMap.payTransactionMap) {
        delete paramsMap.payTransactionMap;
      }
    }
    if (this.isUseCash) {
      Object.assign(paramsMap, this.goldInfo);
    }

    let jsonStr = JSON.stringify(paramsMap);
    return new Promise((reslove, reject) => {
      vueComp.$http
        .post(DomainManager.getPaymentInfoUrlString(), jsonStr)
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
  //make up a diff
  requestPaymentMakeUP(vueComp, id) {
    let paramsMap = {
      id: id,
      returnUrl: DomainManager.getSearchOrderResultUrl()
    };
    if (this.isUseCash) {
      Object.assign(paramsMap, this.goldInfo);
    }

    let jsonStr = JSON.stringify(paramsMap);
    return new Promise((reslove, reject) => {
      vueComp.$http.post(DomainManager.paymentMakeUp(), jsonStr).then(res => {
        res
          .json()
          .then(json => {
            reslove(json.msg);
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  makePayment(windowObj, data, sessionStorage) {
    let paymentCallback = event => {
      var eventName = event.name;
      switch (eventName) {
        case "PAYMENT_REQUEST":
          console.log(event.message);
          break;
        default:
          console.log(event.message);
      }
    };
    // PROD
    let res = windowObj.CashFree.init(CashfreeConfig.setConfig());
    if (res.status == "OK") {
      //sessionStorage.clear()
      windowObj.CashFree.makePayment(data, paymentCallback);
    } else {
      //handle error
      console.log(response.message);
    }
  }
  //checkPrice(vueComp) {

  //	let json = this.getCheckPriceJsonParm()
  //	let jsonStr = JSON.stringify(json)
  //	let self = this
  //	return  new Promise((resolve, reject) => {
  //		vueComp.$http.post(DomainManager.getPriceCheckUrlString(), jsonStr).then(req => {
  //			req.json().then(json => {
  //				if(json.success) {
  //					resolve(json.msg)
  //				} else {
  //					let err = new Error('')
  //					reject(err)
  //				}

  //			}).catch(err => {
  //				reject(err)
  //			})
  //		}).catch(err =>
  //			reject(err)
  //		)
  //	})
  //}
  //add flightNo to baggageinfo
  addFilghtNumber(order, resJson) {
    order.baggageinfo = [];
    for (let i in resJson) {
      order.baggageinfo.push(new BaggageInfo(i, resJson[i].ca, resJson[i].ch));
    }
  }

  loadBagageInfos(vueComp) {
    let url = DomainManager.getBaggageInfoUrlString();

    let pro = new Promise((res, rej) => {
      vueComp.$http
        .get(url)
        .then(res => {
          res
            .json()
            .then(res => {
              let baggageInfos = [];
              for (let info of res.baggageInfo) {
                for (let flightNumber in info) {
                  let item = info[flightNumber];
                  baggageInfos.push(
                    new BaggageInfo(flightNumber, item.ca, item.ch)
                  );
                }
              }
              this.baggageinfo = baggageInfos;
              res();
            })
            .catch(err => rej(err));
        })
        .catch(err => rej(err));
    });
    return pro;
  }

  static searchOrder(vueComp, orderId, phoneNo) {
    let paramsMap = new Map();
    paramsMap.set("orderId", orderId);

    if (!sessionStorage.isPayment || JSON.parse(!sessionStorage.isPayment)) {
      paramsMap.set("phoneNo", phoneNo);
    }

    return new Promise((reslove, reject) => {
      vueComp.$http
        .get(
          DomainManager.searchFlightOrderUrlString(
            DomainManager.getQueryString(paramsMap)
          )
        )
        .then(res => {
          res
            .json()
            .then(json => {
              reslove(json);
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

  static tripOrder(vueComp, orderId, phoneNo) {
    let paramsMap = new Map();
    paramsMap.set("orderId", orderId);
    if (!vueComp.needNo) {
      paramsMap.set("phoneNo", phoneNo);
    }

    return new Promise((reslove, reject) => {
      vueComp.$http
        .get(
          DomainManager.searchFlightOrderUrlString(
            DomainManager.getQueryString(paramsMap)
          )
        )
        .then(res => {
          res
            .json()
            .then(json => {
              reslove(json);
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

  static getChangeSignMapInfo(flightNo, date) {
    return '{"takeOffTime":"' + date + '","flightNo":"' + flightNo + '"}';
  }

  /**
     * @param {any} vueComp
     * @param {string} orderId
     */
  static isOrderPayed(vueComp, orderId) {
    return new Promise((resolve, reject) => {
      let params = new Map();
      params.set("orderId", orderId);

      let urlStr = DomainManager.getIfOrderPaiedUrlString(
        DomainManager.getQueryString(params)
      );
      vueComp.$http
        .get(urlStr)
        .then(res => {
          res
            .json()
            .then(json => {
              let status = Number(json.success);
              switch (status) {
                case 0:
                  reject("Still waitting for result");
                  vueComp.mark = "Still waitting for result";
                  break;
                case 1:
                  resolve("payment successful");
                  vueComp.mark = "payment successful";
                  break;
                case 2:
                  reject("Failed payment.");
                  vueComp.mark = "Failed payment.";
                  break;
                case 3:
                  reject("Can not find the order number.");
                  vueComp.mark = "Can not find the order number.";
                  break;
                default:
                  reject("Unknowed error.");
                  vueComp.mark = "Unknowed error.";
                  break;
              }
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

  static getFareRule(flightNo, timestamp, averagePrice, vueComp) {
    let param = new Map();
    param.set("flightNo", flightNo);
    param.set("departDateTime", timestamp);
    param.set("discountPrice", averagePrice);
    let url = DomainManager.getFareRuleUrl(param);

    return new Promise((resolve, reject) => {
      vueComp.$http.get(url).then(
        res => {
          res.json().then(jsonObj => {
            resolve(jsonObj);
          });
        },
        error => {
          error = new Error("network anomaly");
          reject(error);
        }
      );
    });
  }
  checkPassengerAge(vueComp) {
    let f = true;
    let getCheckPassengerJson = {};
    let personsJson = {};
    if (this.adults.length > 0) {
      for (let person of this.adults) {
        let symbelStr = person.symbel;
        let personJson = this.getFlightPsrsJson(person);

        personsJson[symbelStr] = personJson;
      }
    }
    if (this.children.length > 0) {
      for (let person of this.children) {
        let symbelStr = person.symbel;
        let personJson = this.getFlightPsrsJson(person);

        personsJson[symbelStr] = personJson;
      }
    }
    if (this.infants.length > 0) {
      for (let person of this.infants) {
        let symbelStr = person.symbel;
        let personJson = this.getFlightPsrsJson(person);
        personsJson[symbelStr] = personJson;
      }
    }
    getCheckPassengerJson.flightPsrs = personsJson;
    let flightDates = this.getFlightDateJson();

    getCheckPassengerJson.flightDates = flightDates;
    return this.getTpyeQequest(vueComp, getCheckPassengerJson);
  }

  getTpyeQequest(vueComp, getCheckPassengerJson) {
    let url = DomainManager.getCheckPassengerUrl();
    return new Promise((resolve, reject) => {
      vueComp.$http.post(url, getCheckPassengerJson).then(res => {
        res.json().then(jsonObj => {
          resolve(jsonObj);
        });
      });
    });
  }
  getFlightPsrsJson(person) {
    //Adult,Child,Infant
    let passengerType = 1;

    if (person.symbel) {
      let symbel = person.symbel.split("_")[0];
      if (symbel == "child") {
        passengerType = 2;
      } else if (symbel == "infants") {
        passengerType = 3;
      }
    }

    // let birthDate = TimeFormatUtil.getYearMonthDateString(person.birthday);
    let birthDate = person.birthday;
    if (birthDate == null) {
      birthDate = "";
    } else {
      let birthStr = birthDate.split("-");
      birthDate = birthStr[2] + "-" + birthStr[1] + "-" + birthStr[0];
    }
    return {
      birthDate: birthDate,
      passengerType: passengerType
    };
  }

  getFlightDateJson() {
    let arr = [];
    let departTime = this.departFlight.departDate;
    let departTimeStr = TimeFormatUtil.getYearMonthDateString(departTime);
    arr.push(departTimeStr);
    return arr;
  }
  //ser airport name from result of serach
  setAirportFullName(flight) {
    this.departAirport.name = flight.startAirportName;
    this.destinationAirport.name = flight.endAirportName;
  }
  //serializable
  //departAirport, destinationAirport, departDate, adults = [], children = [], infants = [], cabinClass, contactInfo,baggageinfo=[],serviceFee,orderNumber
  getJsonPropertis(i, object) {
    if (i == "departAirport") {
      let retObject = this.departAirport.toJSON();
      object.departAirport = retObject;
    } else if (i == "destinationAirport") {
      let retObject = this.destinationAirport.toJSON();
      object.destinationAirport = retObject;
    } else if (i == "departDate") {
      object.departDate = Date.parse(this.departDate);
    } else if (i == "adults") {
      let adultsArr = [];
      this.getArrObject(adultsArr, this.adults);
      object.adults = adultsArr;
    } else if (i == "children") {
      let childrenArr = [];
      this.getArrObject(childrenArr, this.children);
      object.children = childrenArr;
    } else if (i == "infants") {
      let infantsArr = [];
      this.getArrObject(infantsArr, this.infants);
      object.infants = infantsArr;
    } else if (i == "cabinClass") {
      let cabinclass = this.cabinClass;
      if (cabinclass instanceof Business) {
        object.cabinClass = "Business";
      } else if (cabinclass instanceof Economy) {
        object.cabinClass = "Economy";
      } else if (cabinclass instanceof First) {
        object.cabinClass = "First";
      } else if (cabinclass instanceof PremiumEconomy) {
        object.cabinClass = "PremiumEconomy";
      }
    } else if (i == "contactInfo") {
      object.contactInfo = this.contactInfo.toJSON();
    } else if (i == "baggageinfo") {
      let baggageinfoArr = [];

      if (this.baggageinfo == null) {
        object.baggageinfo = baggageinfoArr;
      } else {
        this.getArrObject(baggageinfoArr, this.baggageinfo);
        object.baggageinfo = baggageinfoArr;
      }
    } else if (i == "serviceFee") {
      object.serviceFee = this.serviceFee;
    } else if (i == "orderNumber") {
      object.orderNumber = this.orderNumber;
    } else if (i == "departFlight") {
      object.departFlight = this.departFlight.toJSON();
      object.departFlight.realPrice = this.departFlight.realPrice;
    }
  }

  getArrObject(Arr, objectArr) {
    for (let j = 0; j < objectArr.length; j++) {
      let retObject = objectArr[j];
      Arr.push(retObject);
    }
  }

  setJsonToObjPropertis(i, object) {
    if (i == "departAirport") {
      let departAirport = new Airport();
      departAirport.toObject(object.departAirport);
      this.departAirport = departAirport;
    } else if (i == "destinationAirport") {
      let destinationAirport = new Airport();
      destinationAirport.toObject(object.destinationAirport);
      this.destinationAirport = destinationAirport;
    } else if (i == "departDate") {
      this.departDate = new Date(object.departDate);
    } else if (i == "adults") {
      let adultsArr = [];
      this.setArrObject(adultsArr, object.adults, "adults");
      this.adults = adultsArr;
    } else if (i == "children") {
      let childrenArr = [];
      this.setArrObject(childrenArr, object.children, "children");
      this.children = childrenArr;
    } else if (i == "infants") {
      let infantsArr = [];
      this.setArrObject(infantsArr, object.infants, "infants");
      this.infants = infantsArr;
    } else if (i == "cabinClass") {
      if (object.cabinClass == "Business") {
        this.cabinClass = new Business();
      } else if (object.cabinClass == "Economy") {
        this.cabinClass = new Economy();
      } else if (object.cabinClass == "First") {
        this.cabinClass = new First();
      } else if (object.cabinClass == "PremiumEconomy") {
        this.cabinClass = new PremiumEconomy();
      }
    } else if (i == "contactInfo") {
      let contactObj = new ContactInfo();
      contactObj.toObject(object.contactInfo);

      this.contactInfo = contactObj;
    } else if (i == "baggageinfo") {
      let baggageinfoArr = [];
      this.setArrObject(baggageinfoArr, object.baggageinfo, "baggageinfo");
      this.baggageinfo = baggageinfoArr;
    } else if (i == "serviceFee") {
      this.serviceFee = object.serviceFee;
    } else if (i == "orderNumber") {
      this.orderNumber = object.orderNumber;
    } else if (i == "departFlight") {
      let flight = new Flight();
      flight.toObject(object.departFlight);
      this.departFlight = flight;
    }
  }

  setArrObject(arr, objArr, personType) {
    for (let i = 0; i < objArr.length; i++) {
      let personObj = null;
      if (personType == "adults") {
        personObj = new Adult();
      } else if (personType == "children") {
        personObj = new Child();
      } else if (personType == "infants") {
        personObj = new Infant();
      } else if (personType == "baggageinfo") {
        personObj = new BaggageInfo();
      }

      personObj.toObject(objArr[i]);

      arr.push(personObj);
    }
  }
}
