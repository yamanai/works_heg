import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import mutations from './mutations.js'
import actions from './actions.js'
import * as getters from './getters.js'

export default new Vuex.Store({
	modules:{
		mutations
	},
	actions,
	getters
})


