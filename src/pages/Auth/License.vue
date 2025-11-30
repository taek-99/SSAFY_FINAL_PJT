<script setup>
import { ref } from 'vue';
import { API_BASE_URL } from '../../config';
import axios from 'axios'
import router from '../../router';


const affiliation_code = ref('')
const name = ref('')
const phonenumber = ref('')
const access = localStorage.getItem('access_token')

const handleLogin= async () =>{

  try {
    await axios.post(`${API_BASE_URL}accounts/paramedic/apply/`,{
      affiliation_code: affiliation_code.value,
      name: name.value,
      phonenumber: phonenumber.value,
    },{
    headers: {
      Authorization: `Bearer ${access}`
    }
  })
      router.push('/main')
  }catch (err){
    console.error(err)
  }
}

</script>

<template>
    <div class="bg-white mt-5 max-w-md mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-bold border-2 border-blue-500">
    <div class="text-center mb-6">
      <h1 class="text-xl font-semibold">응급 요원 권한 발급</h1>
    </div>
    
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
        <label for="hospiter" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">소속 코드</label>
          <div class="mt-2">
            <input 
              type="hospiter" 
              autocomplete="hospiter" 
              required="" 
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
              v-model = "affiliation_code"
              />
          </div>
          </div>

          <div>
          <label for="user_code" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">이름</label>
          <div class="mt-2">
            <input 
              type="user_code" 
              autocomplete="user_code" 
              required="" 
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
              v-model = "name"
              />
          </div>
          </div>

          <div>
          <label for="user_code" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">전화번호</label>
          <div class="mt-2">
            <input 
              type="tel" 
              pattern="[0-9]*"
              inputmode="numeric"
              autocomplete="tel" 
              required
              placeholder=" - 빼고 숫자만 입력하세요"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500" 
              v-model = "phonenumber"
              />
          </div>
          </div>

          <div>
          <button type="submit" class="mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">
            요청하기
          </button>
          </div>

        </form>
    </div>

    </div>

</template>

<style scoped>

</style>