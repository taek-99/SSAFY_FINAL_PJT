<script setup>
import { onMounted, ref } from 'vue'

const mapDiv = ref(null)
const myLat = ref('-')
const myLng = ref('-')
const myAddress = ref('')
let map = null
let marker = null

const CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_NAVER_MAP_CLIENT_SECRET


// 접속 하자마자 위치 가져오는 로직
onMounted(() => {
  if (!window.naver || !window.naver.maps) {
    console.error('네이버 지도 스크립트가 로드되지 않았습니다.')
    return
  }

  // 초기 지도
  const startPos = new window.naver.maps.LatLng(37.3595704, 127.105399)
  map = new window.naver.maps.Map(mapDiv.value, {
    center: startPos,
    zoom: 10,
  })

  marker = new window.naver.maps.Marker({
    position: startPos,
    map,
  })

  // 내 위치 가져오기
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords

        myLat.value = latitude.toFixed(6)
        myLng.value = longitude.toFixed(6)

        getAddressFromCoords(myLat.value, myLng.value)
        const myPos = new window.naver.maps.LatLng(latitude, longitude)

        // 지도/마커 업데이트
        map.setCenter(myPos)
        marker.setPosition(myPos)

      },
      (err) => {
        console.error(err)
        alert('위치 권한을 허용해야 현재 위치를 표시할 수 있습니다.')
      }
    )
  } else {
    alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.')
  }

})

// 위도+경도를 주소로 변환
async function getAddressFromCoords(lat, lng) {
  const url = `/naver/map-reversegeocode/v2/gc?coords=${lng},${lat}&orders=roadaddr&output=json`

    const res = await fetch(url, {
    headers: {
        'x-ncp-apigw-api-key-id': CLIENT_ID,
        'x-ncp-apigw-api-key': CLIENT_SECRET,
    },
    })


  const data = await res.json()
  const result = data.results[0]
  const region = result.region
  const land = result.land

  myAddress.value =
    `${region.area1.name} ${region.area2.name} ${region.area3.name} ` +
    `${land?.number1 || ''} ${land?.number2 ? '-' + land.number2 : ''}`

}



</script>

<template>
  <div
    class="bg-white mt-5 max-w-md mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-bold border-2 border-blue-500"
  >
    <h1 class="text-center">지도 표시</h1>

    <div class="text-center">
      <div
        class="mt-5"
        ref="mapDiv"
        style="width: 100%; height: 400px"
      ></div>

      <div>
        <h3 class="mt-2">현재 위치 정보</h3>
        <p>{{ myAddress }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
