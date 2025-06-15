<template>
  <main class="container">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoomStore } from './stores/room_store'

const router = useRouter()
const roomStore = useRoomStore()

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    roomStore.clearRoom()
    router.push('/')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
