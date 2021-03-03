import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: null,
    products: null,
  },
  mutations: {
    changeUser(state, loginUser){
      state.loginUser = loginUser
    },
    changeProducts(state, products){
      state.products = products
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    loginUser: state => state.loginUser,
    products: state => state.products
  }
})
