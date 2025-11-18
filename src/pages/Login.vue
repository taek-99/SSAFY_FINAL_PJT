<script>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = async () => {
  errorMsg.value = ''

  try {
    const res = await axios.post('http://127.0.0.1:8000/login/', {
      username: username.value,
      password: password.value,
    })
    console.log(res.data)
    router.push('/')   // 로그인 성공 → Home으로 이동
  } catch (err) {
    errorMsg.value = '로그인 실패'
    console.error(err)
  }
}

</script>

<template>
 
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" 
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
      />
      <h2 class="mt-10 text-center text-2xl font-bold text-black">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- 🚀 form 하나만 유지하고 handleLogin 연결 -->
      <form class="space-y-6" @submit.prevent="handleLogin">

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

        <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>

        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          Sign in
        </button>

      </form>
    </div>
  </div>
</template>



<style>
@import "tailwindcss";
</style>