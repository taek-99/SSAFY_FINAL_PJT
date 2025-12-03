<template>
  
  <h1 class="text-center">증상 선택하기</h1>
  <div ref="canvasContainer" class="three-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const canvasContainer = ref(null)
let animationId = null  
let model = null

let targetRotX = 0
let targetRotY = 0
let isDragging = false 

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
  let scene = new THREE.Scene();

  // 카메라 생성
  let camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000);
  camera.position.set(0, 0.25, 5)

  let renderer = new THREE.WebGLRenderer({ antialias: true })
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

    animate()
    const dom = renderer.domElement
    dom.addEventListener('mousedown', handleMouseDown)
    dom.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
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
  }
  window.removeEventListener('mouseup', handleMouseUp)
})

</script>

<style scoped>
.three-container {
  width: 100%;
  height: 500px; /* 높이 안 주면 안 보일 수 있음 */
  border: 2px solid black;
}
</style>
