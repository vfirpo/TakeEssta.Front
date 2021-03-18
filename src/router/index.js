import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Pedidos from '../views/Pedidos.vue'
import verclientes from '../views/Clientes_VerClientes.vue'
import historialDeCaja from '../views/Ventas/Ventas_HistorialDeCaja.vue'
import aperturaDeCaja from '../views/Ventas/Ventas_AperturaCaja.vue'
import promotions from '../views/Ventas/Ventas_Promotions.vue'
import products from '../views/Products.vue'
import cashBox from '../views/CashBox.vue'



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
    path: '/Ventas_Promotions',
    name: 'promotions',
    component: promotions
  },
  {
    path: '/Products',
    name: 'products',
    component: products
  },
  {
    path: '/CashBox/:id',
    name: 'cashBox',
    component: cashBox
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated()){
    if (to.fullPath.startsWith('/toma_de_pedidos')){
      next();
    }
    else{
      next({ name: 'Login' })
    }
  } 
  else next()
})

function isAuthenticated(){
  if (sessionStorage.getItem('USER') && sessionStorage.getItem('USER') !== ''){
    return true;
  }
}

export default router
