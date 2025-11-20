<script setup>
</script>

<template>
  <div class="mt-20 max-w-md mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-bold border-2 border-green-500">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-30 w-auto dark:hidden" src="../assets/main_logo.png" alt="Your Company" />
      <img class="mx-auto h-30 w-auto not-dark:hidden" src="../assets/main_logo.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">당신의 용도는?</h2>
    </div>

    <div class="flex gap-6 mb-8 mt-12">
      <!-- 의료진으로 시작 -->
      <button
        class="w-50 h-56 bg-gray-200 flex items-center justify-center text-center font-semibold text-gray-900 hover:bg-gray-300 transition"
      >
        <span class="leading-tight">
          응급실을 찾아요
        </span>
      </button>

      <!-- 일반 회원으로 시작 -->
      <button
        class="w-50 h-56 bg-gray-200 flex items-center justify-center text-center font-semibold text-gray-900 hover:bg-gray-300 transition"
      >
        <span class="leading-tight">
          일반 병원을 찾아요

        </span>
      </button>
    </div>

  </div>


</template>

<script setup>
// 아직 특별한 로직 없으면 비워두면 됨
</script>



<style>

</style>