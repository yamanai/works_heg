import * as types from './types.js'
import getters from './getters'

const state = {
	isone:''
}

const mutations = {
	BOOK_INFO(state,isOne){
		state.isone=isOne;
	}
}

export default{
	mutations,
	state,
	getters
}