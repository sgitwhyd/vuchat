<template>
  <div class="not-found-container">
    <img src="@/assets/chat_empty.webp" alt="no room selected" />
    <p>Chat not found</p>
    <button @click="goHome">Go to home</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.not-found-container img {
  width: 40%;
  height: 40%;
  object-fit: contain;
}

.not-found-container p {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.not-found-container button {
  margin-top: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
}
</style>
