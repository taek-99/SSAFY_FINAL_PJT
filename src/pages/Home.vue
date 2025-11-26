<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination } from 'swiper/modules'
const modules = [Navigation, Pagination]

</script>


<template>
    <div class="bg-white mt-5 max-w-md mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-bold border-2 border-blue-500">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-30 w-auto dark:hidden" src="../assets/main_logo.png" alt="Your Company" />
      <img class="mx-auto h-30 w-auto not-dark:hidden" src="../assets/main_logo.png" alt="Your Company" />
    </div>
     <div class="mt-5 text-center">
     <h1 class="mb-4">응급실 구조 시스템에 오신걸 환영합니다.</h1>

        <Swiper
        :modules="modules"
        navigation
        pagination
        class="w-full max-w-xl mx-auto"
        >
        <SwiperSlide>
            <img src="../assets/guide/image.png" alt="설명서1" class="w-full rounded-md" />
        </SwiperSlide>

        <SwiperSlide>
            <img src="../assets/guide/image1.png" alt="설명서2" class="w-full rounded-md" />
        </SwiperSlide>

        <SwiperSlide>
            <img src="../assets/guide/image2.png" alt="설명서3" class="w-full rounded-md" />
        </SwiperSlide>
        </Swiper>
    </div>
    <div class="text-red-500 text-center"> 설명서 볼시간에 빨리 시작하쇼 </div>
    <button
      class="mt-5 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
    <a href="/login">
      시작하기
    </a>
    </button>

    </div>

</template>

<style scoped>

</style>