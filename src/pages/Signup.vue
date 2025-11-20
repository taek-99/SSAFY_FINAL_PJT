<script setup>
import { ref } from 'vue';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const errorMsg = ref('')
const successMsg = ref('') 
const phonenumber = ref('') 
const birth_date = ref('')
const user_unique_trueMsg = ref('')
const user_unique_falseMsg = ref('')


const checkEmail = async () => {
  try{
    const res = await axios.get(`${API_BASE_URL}accounts/signup/uu/`, {
        username: email.value
    })
    console.log(res.data)
    if(res.data.bool_uu == true){
        user_unique_trueMsg.value = '통과'
    }else{
        user_unique_falseMsg.value = '중복된 아이디가 있습니다.'
    }
    }catch (err){
        console.error(err)
    }
}

const handleSignup = async () => {
  if(user_unique_trueMsg === true){
    try {
    await axios.post(`${API_BASE_URL}accounts/signup/`,{
      username: email.value,
      password: password.value,
      name: name.value,
      phone_number: phonenumber.value,
      birth_date: birth_date.value,
    })
    router.push('/login')
  }catch (err){
    errorMsg.value = '회원가입 실패 실패'
    console.error(err)
  }
  }else{
    errorMsg.value = '중복검사부터 하쇼'
  }

}

    
</script>

<template>
  <div class="mt-20 max-w-md mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-bold border-2 border-green-500">
      <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900 mb-8">
        회원가입
      </h2>

      <form @submit.prevent="handleSignup" class="space-y-6">
    
        <!-- 이메일 -->
        <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
            이메일
        </label>

        <div class="flex gap-2">
            <!-- 이메일 입력 -->
            <input
            v-model="email"
            type="email"
            autocomplete="email"
            required
            class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="example@email.com"
            />

            <!-- 중복확인 버튼 -->
            <button
            type="button"
            @click="checkEmail"
            class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
            중복확인
            </button>
        </div>
        <div v-if="user_unique_falseMsg || user_unique_trueMsg" class="text-sm">
          <p v-if="user_unique_falseMsg" class="text-red-500">
            {{ user_unique_falseMsg }}
          </p>
          <p v-if="user_unique_trueMsg" class="text-red-500">
            {{ user_unique_trueMsg }}
          </p>
        </div>
        </div>



        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            비밀번호
          </label>
          <input
            v-model="password"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <!-- 비밀번호 확인 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            비밀번호 확인
          </label>
          <input
            v-model="password2"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            이름
          </label>
          <input
            v-model="name"
            type="text"
            autocomplete="name"
            required
            class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
            생년월일
        </label>
        <input
            v-model="birth_date"
            type="date"
            autocomplete="bday"
            required
            class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        </div>

        <!-- 회원 유형 -->
        <!-- <div>
        <span class="block text-sm font-medium text-gray-700 mb-1">
            회원 유형
        </span>

        <div class="flex gap-4">
            <label class="flex items-center gap-2 text-sm text-gray-800">
            <input
                type="radio"
                name="userType"
                value="doctor"
                v-model="userType"
                class="text-indigo-600 focus:ring-indigo-500"
            />
            <span>의료진</span>
            </label>

            <label class="flex items-center gap-2 text-sm text-gray-800">
            <input
                type="radio"
                name="userType"
                value="normal"
                v-model="userType"
                class="text-indigo-600 focus:ring-indigo-500"
            />
            <span>일반 회원</span>
            </label>
        </div>
        </div> -->

        <!-- 비밀번호 -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
            전화번호
            </label>
            <input
                v-model="phonenumber"
                type="tel"
                inputmode="numeric"
                pattern="[0-9]*"
                autocomplete="tel" 
                required
                class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="전화번호를 입력하세요"
            />
        </div>


    

        <!-- 에러 / 성공 메시지 -->
        <div v-if="errorMsg || successMsg" class="text-sm">
          <p v-if="errorMsg" class="text-red-500">
            {{ errorMsg }}
          </p>
          <p v-if="successMsg" class="text-green-600">
            {{ successMsg }}
          </p>
        </div>

        <!-- 버튼 -->
        <div>
          <button
            type="submit"
            class="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
          >
            회원가입 하기
          </button>
        </div>
      </form>

      <!-- 로그인 링크 -->
      <p class="mt-6 text-center text-xs text-gray-500">
        이미 회원이신가요?
        <router-link
          to="/login"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          로그인 하러가기
        </router-link>
      </p>
  </div>
</template>

<style scoped>

</style>