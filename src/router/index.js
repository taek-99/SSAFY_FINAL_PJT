import { createRouter, createWebHistory } from 'vue-router'

import Home from "../pages/Home.vue";
import Login from "../pages/Auth/Login.vue";
import Signup from '../pages/Auth/Signup.vue';
import Main from '../pages/Main.vue';
import ForgetPassword from '../pages/Auth/ForgetPassword.vue';
import KakaoCallback from '../components/KakaoCallback.vue';
import NaverCallback from '../components/NaverCallback.vue';
import NotAuthenticated from '../pages/NotAuthenticated.vue';
import ResetPassword from '../pages/Auth/ResetPassword.vue';


const routes = [
    { path: '/', name: 'home', component: Home},
    { path: '/login', name: 'login', component: Login},
    { path: '/signup', name: 'signup', component: Signup},
    { path: '/main', name: 'main', component: Main, meta: {requiresAuth: true} },
    { path: '/resetpassword', name: 'resetpassword', component: ResetPassword},
    { path: '/notauthenticated', name: 'notauthenticated', component: NotAuthenticated},

    { path: '/forgetpassword', 
      name: 'forgetpassword', 
      component: ForgetPassword,
      beforeEnter: (to, from, next) => {
      if (from.name === 'resetPassword') {
          next()
      } else {
          next({ name: 'notauthenticated' })
      }
      },
    },

    {
        path: '/auth/kakao/callback',
        name: 'KakaoCallback',
        component: KakaoCallback ,
        }, 
    {
        path: '/auth/naver/callback',
        name: 'NaverCallback',
        component: NaverCallback ,
        }, 
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotAuthenticated,
  },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')

  if (to.meta.requiresAuth && !token) {
    return next('/notauthenticated')      // 로그인 안됐으면 로그인 창으로 이동
  }

  next() // 통과
})

export default router