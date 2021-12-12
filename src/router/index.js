import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Menu.vue')
  },
  {
    path: '/clientes',
    component: () => import('../views/Clientes/Clientes.vue')
  },
  {
    path: '/produtos',
    component: () => import('../views/Produtos/Produtos.vue')
  },
  {
    path: '/vendas',
    component: () => import('../views/Vendas/Vendas.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
