import { DiscountItem } from "../../discountitem/DiscountItem.js";
import { UnionDiscountItem } from "../../discountitem/UnionDiscountItem.js";
import { RoundTripDiscountResult } from "../../discountresult/RoundTripDiscountResult.js";
import { RoundTripDiscountPolicy } from "../RoundTripDiscountPolicy.js";

export class RoundTripUnionDiscountPolicy extends RoundTripDiscountPolicy {
  // static getUnionDiscountItemList (unionItemJson, departItemJson, returnItemJson) {
  // 	let discountList = []

  // 	for (let key in unionItemJson) {
  // 		let value = unionItemJson[key]

  // 		let keys = key.split('\/')
  // 		if (!Object.is(keys.length, 2)) {
  // 			throw new Error('Wrong lenth.')
  // 		}
  // 		let departFlightNumber = keys[0]
  // 		let returnFlightNumber = keys[1]

  // 		let departDiscountPrice = Math.floor(value / 2)
  // 		let returnDiscountPrice = value - departDiscountPrice

  // 		let item = new UnionDiscountItem(new DiscountItem(departFlightNumber, departDiscountPrice),
  // 			new DiscountItem(returnFlightNumber, returnDiscountPrice))
  // 		discountList.push(item)
  // 	}

  // 	for (let departFlightNumber in departItemJson) {
  // 		let departAirlineShortname = departFlightNumber.substr(0, 2)
  // 		let departDiscountPrice = departItemJson[departFlightNumber]
  //            discountList.push(new UnionDiscountItem(new DiscountItem(departFlightNumber, departDiscountPrice), null))// this is only for condition which only one side can fit
  //        }

  //        for (let returnFlightNumber in returnItemJson) {
  //            let returnAirlineShortname = returnFlightNumber.substr(0, 2)
  //            let returnDiscountPrice = returnItemJson[returnFlightNumber]
  //            discountList.push(new UnionDiscountItem(null, new DiscountItem(returnFlightNumber, returnDiscountPrice)))// this is only for condition which only one side can fit
  //        }
  // 	return discountList
  // }

  constructor(rtd) {
    super();
    this.deaprtDiscountPrice = 0;
    this.returnDiscountPrice = 0;
    this.rtd = rtd;
    // this.unionDiscountItemList = unionDiscountItemList
  }

  checkIfAvaliable(departFilgt, retrunFlight) {
    return true;
  }

  /**
     * 
     * @param {String} departFlightNumber
     * @param {String} returnFlightNumber
     * @returns {UnionDiscountItem}
     */
  //    getItemInDiscountItemList(departFlightNumber, returnFlightNumber) {

  //        let departRep = departFlightNumber.substr(0, 2)
  //        let returnRep = returnFlightNumber.substr(0, 2)

  //        if (!Object.is(departRep,returnRep)) {
  //            return null
  //        }

  //        /**
  //         * @type {[UnionDiscountItem]} departSideConditions
  //         */
  //        let departSideConditions = []
  //        /**
  //         * @type {[UnionDiscountItem]} returnSideConditions
  //         */
  //        let returnSideConditions = []

  //        for (let item of this.unionDiscountItemList) {
  //            if (Object.is(item.departDiscountItem, null)) {
  //                returnSideConditions.push(item)
  //            } else if (Object.is(item.returnDiscountItem, null)) {
  //                departSideConditions.push(item)
  //            } else if (Object.is(item.departDiscountItem.flightNumber, departFlightNumber)
  //                && Object.is(item.returnDiscountItem.flightNumber, returnFlightNumber)) {
  //                return item
  //            }
  //        }

  //        /**
  //         * @type {UnionDiscountItem} sideItem
  //         */
  //        let sideItem = null

  //        for (let item of departSideConditions) {
  //            if (Object.is(item.departDiscountItem.flightNumber, departFlightNumber)) {
  //                if (Object.is(sideItem, null)) {
  //                    sideItem = item
  //                } else {
  //                    sideItem.departDiscountItem = item.departDiscountItem
  //                }
  //            }
  //        }
  //        for (let item of returnSideConditions) {
  //            if (Object.is(item.returnDiscountItem.flightNumber, returnFlightNumber)) {
  //                if (Object.is(sideItem, null)) {
  //                    sideItem = item
  //                } else {
  //                    sideItem.returnDiscountItem = item.returnDiscountItem
  //                }
  //            }
  //        }

  //        return sideItem
  // }

  calculateDiscount(DFlight, RFlight) {
    let dfd = 0,
      rfd = 0;
    let rtd = this.rtd;
    if (DFlight.airline.shortname == RFlight.airline.shortname) {
      // return dfd,rfd discount , fn: fligth number
      DFlight.disFn = DFlight.flightNumber.replace(/\//g, "");
      RFlight.disFn = RFlight.flightNumber.replace(/\//g, "");
      if (rtd && rtd.or[DFlight.disFn + "/" + RFlight.disFn]) {
        dfd = Math.floor(rtd.or[DFlight.disFn + "/" + RFlight.disFn] / 2);
        rfd = rtd.or[DFlight.disFn + "/" + RFlight.disFn] - dfd;
      } else if (rtd) {
        if (rtd.o[DFlight.disFn]) {
          dfd = rtd.o[DFlight.disFn];
        }
        if (rtd.r[RFlight.disFn]) {
          rfd = rtd.r[RFlight.disFn];
        }
      }
    }
    DFlight.commonDiscount = DFlight.commonDiscount + dfd;
    RFlight.commonDiscount = RFlight.commonDiscount + rfd;
    DFlight.airlineDIS = dfd;
    RFlight.airlineDIS = rfd;
  }
}
