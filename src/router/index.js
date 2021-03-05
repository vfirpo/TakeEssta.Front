import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Pedidos from '../views/Pedidos.vue'
import verclientes from '../views/Clientes_VerClientes.vue'
import historialDeCaja from '../views/Ventas_HistorialDeCaja.vue'
import aperturaDeCaja from '../views/Ventas_AperturaCaja.vue'
import products from '../views/Products.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/toma_de_pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
  {
    path: '/Clientes_VerClientes',
    name: 'Clientes_VerClientes',
    component: verclientes
  },
  {
    path: '/Ventas_HistorialDeCaja',
    name: 'historialDeCaja',
    component: historialDeCaja
  },
  {
    path: '/Ventas_AperturaDeCaja',
    name: 'aperturaDeCaja',
    component: aperturaDeCaja
  },
  {
    path: '/Products',
    name: 'products',
    component: products
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated()) next({ name: 'Login' })
  else next()
})

function isAuthenticated(){
  if (sessionStorage.getItem('User') && sessionStorage.getItem('User') !== ''){
    return true;
  }
}

export default router
