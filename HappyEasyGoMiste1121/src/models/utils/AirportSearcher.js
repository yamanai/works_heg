import defaultCity from '../../pages/home/child/defaultcity.json'
import { Airport } from '../../models/airport'

function loadLocalStoragedAirorts() {
    let res = [];
    for (let a of defaultCity) {
        res.push(Airport.getInstanceFromJson(a))
    }
    return res;
}

export class AirportSearcher {
	constructor(airports){
		this.airports = airports
		this.defaultCity = loadLocalStoragedAirorts();
	}

	getSuitableAirports(keywords) {
		if (keywords == '') {
			return this.defaultCity;
		} else {
			let reg = new RegExp(keywords, 'ig')
			let res = []
			for (let airport of this.airports){
				if(airport.iataCode.match(reg)){
					res.unshift(airport)
				}else if(airport.anotherNames.match(reg)||airport.countryName.match(reg)){
					res.push(airport)
				}
			}
			return res
		}
	}
} 