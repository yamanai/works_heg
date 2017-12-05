import {SerializableObject} from '../serializable/SerializableObject.js'


export class Airport extends SerializableObject {
	static getInstanceFromJson(jsonObject) {
  			let airport = new Airport(jsonObject.airport, jsonObject.city, jsonObject.cn, jsonObject.cc, jsonObject.iata, jsonObject.mixn)
  			return airport
	}

	constructor(name, cityName, countryName, countryCode, iataCode, anotherNames){
		super()
		this.name = name
		this.cityName = cityName
		this.countryName = countryName
		this.countryCode = countryCode
		this.iataCode = iataCode
		this.anotherNames = anotherNames
	}

	getCityName(){
		return this.cityName;
	}

	getIataCode(){
		return this.iataCode;
	}

	getJsonPropertis(i,object){
		
		if(i=="name"){
			object.name = this.name
		}else if(i=="cityName"){
			object.cityName = this.cityName
		}else if(i=="countryName"){
			object.countryName = this.countryName
		}else if(i=="countryCode"){
			object.countryCode = this.countryCode
		}else if(i=="iataCode"){
			object.iataCode = this.iataCode
		}else if(i=="anotherNames"){
			object.anotherNames = this.anotherNames
		}
	}


	setJsonToObjPropertis(i,object){
		if(i=="name"){
			this.name=object.name 
		}else if(i=="cityName"){
		    this.cityName=object.cityName
		}else if(i=="countryName"){
			this.countryName=object.countryName
		}else if(i=="countryCode"){
			this.countryCode=object.countryCode
		}else if(i=="iataCode"){
			this.iataCode=object.iataCode
		}else if(i=="anotherNames"){
			this.anotherNames=object.anotherNames
		}
	}
}