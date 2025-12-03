<template>
  
  <h1 class="text-center">증상 선택하기</h1>
  <div ref="canvasContainer" class="mt-3 three-container"></div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const canvasContainer = ref(null)
let animationId = null  
let model = null
let renderer = null
let scene = null

let targetRotX = 0
let targetRotY = 0
let isDragging = false 

let camera = null
let zoomSpeed = 0.5

let isHeadSelected = false

// 부위 클릭용
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
let headHitbox = null


const handleWheel = (e) => {
  if (!camera) return

  // e.deltaY > 0 : 휠 내리기(축소)
  // e.deltaY < 0 : 휠 올리기(확대)
  camera.position.z += e.deltaY * 0.01 * zoomSpeed

  // 줌 한계 설정 (너무 가까워지거나 멀어지지 않게)
  camera.position.z = Math.min(Math.max(camera.position.z, 1.5), 5)
}

const handleMouseMove = (e) => {
  if (!isDragging) return 

  const rect = canvasContainer.value.getBoundingClientRect()

  const x = (e.clientX - rect.left) / rect.width  // 0 ~ 1
  const y = (e.clientY - rect.top) / rect.height // 0 ~ 1

  const nx = x * 2 - 1   // -1 ~ 1
  // const ny = y * 2 - 1   // -1 ~ 1 상하는 필요 없음

  // 마우스 좌우에 따라 Y축 회전, 상하에 따라 X축 회전
  const maxRot = Math.PI// 최대 45도까지만

  targetRotY = nx * maxRot    // 좌우 회전
  // targetRotX = -ny * maxRot   // 위아래 회전(뒤집히지 않도록 부호 반전)
}

const handleMouseDown = (e) => {
  isDragging = true
  handleMouseMove(e)   // 눌렀을 때도 한 번 반응하도록
}

const handleMouseUp = () => {
  isDragging = false
}

onMounted(() => {

  const width = canvasContainer.value.clientWidth 
  const height = canvasContainer.value.clientHeight 

  // 씬 생성
  scene = new THREE.Scene();

  // 카메라 생성
  camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
  camera.position.set(0, 0.25, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  canvasContainer.value.appendChild(renderer.domElement)

  // 조명 생성
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1)
  scene.add(light)

  // 배경
  scene.background = new THREE.Color('white');

  // glTF 로드
  const loader = new GLTFLoader();
  loader.load(
    '/mannequin/scene.gltf', 
    (gltf) => {
    model = gltf.scene
    model.position.set(0, 0, 0)

    scene.add(model);

    makeHeatbox()
    animate()
    const dom = renderer.domElement
    dom.addEventListener('wheel', handleWheel)
    dom.addEventListener('mousedown', handleMouseDown)
    dom.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    dom.addEventListener('click', onClickHead)
  },
  undefined,
  (error) => {
    console.error('GLTF load error:', error)
  }
);


const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (model) {
    // 부드럽게 보간
    model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, targetRotY, 0.1)
    model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, targetRotX, 0.1)
  }


  renderer.render(scene, camera)
}

})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)

  const dom = canvasContainer.value?.querySelector('canvas')
  if (dom) {
    dom.removeEventListener('mousedown', handleMouseDown)
    dom.removeEventListener('mousemove', handleMouseMove)
    dom.removeEventListener('wheel', handleWheel)
    dom.removeEventListener('click', onClickHead)
  }
  window.removeEventListener('mouseup', handleMouseUp)
})


const makeHeatbox = () => {

    const headGeo = new THREE.SphereGeometry(0.15, 16, 16)
    const headMat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
    headHitbox = new THREE.Mesh(headGeo, headMat)

    headHitbox.position.set(0, 0.8, 0)
    model.add(headHitbox)

}

const onClickHead = (event) => {
  if (!renderer || !camera || !headHitbox) return

  const rect = renderer.domElement.getBoundingClientRect()

  // 화면 좌표 → NDC(-1 ~ 1)
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  // headHitbox만 검사
  const intersects = raycaster.intersectObject(headHitbox, false)

  if (intersects.length > 0) {
    // 선택 상태 토글
    isHeadSelected = !isHeadSelected

    // 색 바꾸기: 선택되면 초록색, 해제되면 빨간색
    headHitbox.material.color.set(isHeadSelected ? 0x00ff00 : 0xff0000)

    // 필요하면 투명도도 같이 조정 가능
    // headHitbox.material.opacity = isHeadSelected ? 0.8 : 0.4

    console.log('머리 클릭됨! 현재 선택 상태:', isHeadSelected)
  }
}

</script>

<style scoped>
.three-container {
  width: 100%;
  height: 500px; /* 높이 안 주면 안 보일 수 있음 */
  border: 2px solid black;
}
</style>
