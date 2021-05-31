import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import jq from 'jquery'
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
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
// name is optional
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

Vue.prototype.$global = Global
Vue.prototype.$ = jq

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
