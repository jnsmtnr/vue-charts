import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const HomeView = () => import('../views/HomeView.vue')
const ColumnView = () => import('../views/ColumnView.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/column',
    name: 'column',
    component: ColumnView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
