import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexPersist = new VuexPersistence({
  key: 'vuex',
  storage: window.sessionStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCashBox: false,
  },
  
  plugins: [vuexPersist.plugin],

  mutations: {
    changeCashBox(state, xcurrentCashBox){

    state.currentCashBox = xcurrentCashBox
    },
  },
  actions: {
  },
  modules: {
  },
  getters:{
    currentCashBox(state){
      return state.currentCashBox;
    }
  }
})
