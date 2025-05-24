<template>
    <div class="message-input">
        <div class="message-input-container">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." type="text">
            <p class="error-message" v-if="errMsg">{{ errMsg }}</p>
        </div>
        <button @click="sendMessage">Send</button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chat_store'
import { useRoomStore } from '@/stores/room_store'

const chatStore = useChatStore()
const roomStore = useRoomStore()
const newMessage = ref('')

const roomId = computed(() => roomStore.getRoom?.id)
const errMsg = ref('')

const sendMessage = async () => {

    if (!newMessage.value.trim()) {
        errMsg.value = 'Message cannot be empty'
        return
    }

    if (!roomId.value) {
        errMsg.value = 'Room ID is required'
        return
    }
    chatStore.addMessage(newMessage.value, roomId.value, null)
    newMessage.value = ''
}
</script>

<style scoped>
.message-input {
    padding: 1rem;
    border-top: 1px solid #ddd;
    display: flex;
    gap: 0.5rem;
}

input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    height: fit-content;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    font-size: 0.875rem;
}

.message-input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    ;
    gap: 0.5rem;
}
</style>