import { createRouter, createWebHistory } from 'vue-router'

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Signup from '../pages/Signup.vue';
import Main from '../pages/Main.vue';
import ForgetPassword from '../pages/ForgetPassword.vue';
import KakaoCallback from '../components/KakaoCallback.vue';
import NaverCallback from '../components/NaverCallback.vue';


const routes = [
    { path: '/', name: 'home', component: Home},
    { path: '/login', name: 'login', component: Login},
    { path: '/signup', name: 'signup', component: Signup},
    { path: '/main', name: 'main', component: Main },
    { path: '/forgetpassword', name: 'forgetpassword', component: ForgetPassword},
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
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router