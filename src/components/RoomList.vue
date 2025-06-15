<template>
  <div class="home-container">
    <div class="header">
      <h1 class="page-title">Chats</h1>
    </div>
    <div class="rooms-grid">
      <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RoomCard from '@/components/RoomCard.vue'
import { useRoomStore } from '@/stores/room_store'
import { computed } from 'vue'

const roomStore = useRoomStore()

const rooms = computed(() => roomStore.rooms)
</script>

<style scoped>
.home-container {
  width: 540px;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-title {
  font-size: 2rem;
  color: #333;
  margin: 0;
  padding: 2rem;
  z-index: 1;
}

.rooms-grid {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f5f5f5;
}

@media (max-width: 768px) {
  .home-container {
    padding: 0;
  }

  .page-title {
    padding: 1rem;
    font-size: 1.5rem;
  }
}
</style>
