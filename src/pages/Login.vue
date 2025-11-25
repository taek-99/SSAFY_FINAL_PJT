<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { API_BASE_URL } from '../config'

const router = useRouter()

const useremail = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = async () => {
  try {
    await axios.post(`${API_BASE_URL}accounts/login/`,{
      username: useremail.value,
      password: password.value,
    })
    router.push('/main')
  }catch (err){
    errorMsg.value = '로그인 실패'
    console.error(err)
  }
}

const kakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_KEY
  const REDIRECT_URI = encodeURIComponent(import.meta.env.VITE_KAKAO_REDIRECT_URI)
  
  const url =
    'https://kauth.kakao.com/oauth/authorize' +
    `?client_id=${REST_API_KEY}` +
    `&redirect_uri=${REDIRECT_URI}` +
    '&response_type=code'

  console.log('kakao url:', url) // 한 번 찍어보고
  window.location.href = url
};




const naverLogin = () => {
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID
  const redirectUri = encodeURIComponent(import.meta.env.VITE_NAVER_REDIRECT_URI)
  const state = crypto.randomUUID()   // CSRF 방지용 (네이버 권장)


  const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`


  window.location.href = url
}


</script>

<template>
  <div class="mt-20 max-w-md mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-bold border-2 border-green-500">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-30 w-auto dark:hidden" src="../assets/main_logo.png" alt="Your Company" />
      <img class="mx-auto h-30 w-auto not-dark:hidden" src="../assets/main_logo.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">로그인 바람</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Email address</label>
          <div class="mt-2">
            <input 
              type="email" 
              autocomplete="email" 
              required="" 
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
              v-model = "useremail"
              />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Password</label>
            <div class="text-sm">
              <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input 
              type="password" 
              autocomplete="current-password" 
              required="" 
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
              v-model = "password"
              />
          </div>
        </div>
        <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
            로그인하기
          </button>
        </div>
      </form>
      <button 
        @click="kakaoLogin"
        class="mt-1 w-full max-w-sm relative bg-[#FEE500] rounded-md px-4 py-2 flex justify-center items-center"
      >
        <!-- 아이콘: 왼쪽 고정 배치 -->
        <svg 
          class="absolute left-6"
          width="24" height="24" viewBox="0 0 24 24" fill="#000000"
        >
          <path d="M12 2C6.48 2 2 5.58 2 10c0 2.54 1.64 4.79 4.11 6.24L5 22l5.17-3.02c.58.1 1.18.16 
                  1.83.16 5.52 0 10-3.58 10-8s-4.48-9-10-9z"/>
        </svg>

        <!-- 중앙 텍스트 -->
        <span class="text-black font-medium text-sm font-semibold">
          카카오 로그인
        </span>
      </button>

      <button 
        @click="naverLogin"
        class="mt-1 w-full max-w-sm relative bg-[#03C75A] rounded-md px-4 py-2 flex justify-center items-center"
      >
        <!-- 네이버 로고 아이콘 (N 로고) -->
        <svg 
          class="absolute left-6"
          width="22" height="22" viewBox="0 0 24 24" fill="white"
        >
          <path d="M4 4h5.4l4.6 6.4V4H20v16h-5.4l-4.6-6.4V20H4V4z"/>
        </svg>

        <!-- 중앙 텍스트 -->
        <span class="text-white font-medium text-sm">
          네이버 로그인
        </span>
      </button>


      <p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
        회원이 아니신가요?
      </p>  
        <router-link
          to="/signup"
          class="block text-center text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
        >
          회원가입 하러 가기
        </router-link>
      
    </div>
  </div>


</template>


<style scoped>


</style>