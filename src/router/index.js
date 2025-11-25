import { createRouter, createWebHistory } from 'vue-router'

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Signup from '../pages/Signup.vue';
import Main from '../pages/Main.vue';
import KakaoCallback from '../pages/KakaoCallback.vue';


const routes = [
    { path: '/', name: 'home', component: Home},
    { path: '/login', name: 'login', component: Login},
    { path: '/signup', name: 'signup', component: Signup},
    { path: '/main', name: 'main', component: Main },
    {
        path: '/auth/kakao/callback',
        name: 'KakaoCallback',
        component: KakaoCallback ,
        }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router