import Vue from 'vue'
import App from './App.vue'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import './assets/app.css'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import VCalendar from 'v-calendar'
import {Global} from './assets/Global'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

Vue.prototype.$global = Global

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
