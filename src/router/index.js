import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/login/login'
import Admin from '../pages/admin/admin'
import Home from '../pages/home/home'
import Category from '../pages/category/category'
import Product from '../pages/product/product'
import Role from '../pages/role/role'
import User from '../pages/user/user'
import Bar from '../pages/charts/bar/bar'
import Line from '../pages/charts/line/line'
import Pie from '../pages/charts/pie/pie'
import NotFound from '..//pages/not-found/not-found'
import Order from '..//pages/order/order'

Vue.use(VueRouter)
// const Login = () => import('../pages/login/login')

const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: '/admin',
        redirect: '/admin/home'
      },
      {
        path: '/admin/home',
        name: 'home',
        component: Home,
        meta: { requireAuth: true }
      },
      {
        path: '/admin/category',
        name: 'category',
        component: Category,
        meta: { requireAuth: true }
      },
      {
        path: '/admin/product',
        name: 'product',
        component: Product,
        meta: { requireAuth: true }
      },
      {
        path: '/admin/user',
        name: 'user',
        component: User,
        meta: { requireAuth: true }
      },
      {
        path: '/admin/role',
        name: 'role',
        component: Role,
        meta: { requireAuth: true }
      },
      {
        path: '/admin/order',
        name: 'order',
        component: Order,
        meta: { requireAuth: true }
      },
      {
        path: '/admin/charts/bar',
        component: Bar,
        meta: { requireAuth: true }
      },
      {
        path: '/admin/charts/pie',
        component: Pie,
        meta: { requireAuth: true }
      },
      {
        path: '/admin/charts/line',
        component: Line,
        meta: { requireAuth: true }
      },
      {
        path: '/*',
        component: NotFound,
        meta: { requireAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

export default router
