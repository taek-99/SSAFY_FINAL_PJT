<script setup>
console.log("SETUP OK")
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

// Router
const router = useRouter()

// 상태
const username = ref('')
const password = ref('')
const errorMsg = ref('')

// 기본 API
const api = axios.create({
  baseURL: 'http://172.31.16.191',
})

// 로그인 로직
const handleLogin = async () => {
  errorMsg.value = ''
  console.log("gdgd")

  try {
    const res = await api.post('/accounts/login/', {
      username: username.value,
      password: password.value,
    })
    console.log(res.data)
  } catch (err) {
    errorMsg.value = '로그인 실패'
    console.error(err)
    console.log('실패')
  }
}
</script>


<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    
    <form @submit.prevent="handleLogin" class="space-y-6">

      <div>
        <label class="block text-sm font-medium">Email</label>
        <input
          v-model="username"
          type="text"
          class="block w-full rounded-md px-3 py-1.5 text-base text-black border border-black"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Password</label>
        <input
          v-model="password"
          type="password"
          class="block w-full rounded-md px-3 py-1.5 text-base text-black border border-black"
        />
      </div>

      <p v-if="errorMsg" class="text-red-500 text-sm">
        {{ errorMsg }}
      </p>

      <button
        type="submit"
        class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
      >
        Sign in
      </button>

    </form>

  </div>
</template>

<style scoped>
@import "tailwindcss";
</style>
