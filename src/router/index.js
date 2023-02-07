import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TheWelcome from '@/components/TheWelcome.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import Register from '@/views/Register.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Cart from '@/views/Cart.vue'

import App from '@/App.vue'
import AppSubmenu from '@/AppSubmenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: App,
      children: [
        {
            path: '',
            name: 'home',
            component: HomeView
        },
    ]

    },

    {
      path: '/page_with_sidebar',
      name: 'page_with_sidebar',
      // meta:{
      //     requiresStudentLogin: true
      // },
      component: App,

      children: [
          {
              path: '',
              name: 'student_home',
              component: TheWelcome
          },
      ]

    },

    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Logout
    },

    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Register
    },

    // routes with no sidebar
    {
      path: '/pages',
      name: 'pages',
      component: AppSubmenu,
      children: [
        {
          path: 'product_description',
          name: 'product_description',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: ProductDetail
        },
        {
          path: 'cart',
          name: 'cart',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Cart
        },
      ]
    },
  ]
})

export default router
