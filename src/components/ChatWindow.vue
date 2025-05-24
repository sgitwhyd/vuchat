<template>
    <div class="chat-window">
        <div class="chat-header">
            <img :src="room?.user_avatar_url" alt="user avatar" class="chat-header-avatar">
            <h2>
                {{ room?.name }}
            </h2>
        </div>

        <div class="messages" ref="messagesContainer">
            <div v-for="message in messages" :key="message.id"
                :class="['message', message.is_sender ? 'sent' : 'received']">
                <div class="message-content">
                    <div class="message-text">
                        <div v-if="lastMessageContainFile(message.message)">
                            <img :src="removeFileTypeMsg(message.message)" alt="file">
                        </div>
                        <div v-else>
                            {{ message.message }}
                        </div>
                        <div class="message-time">{{ formatTime(message.created_at) }}</div>
                    </div>
                </div>
            </div>
        </div>

        <InputMessage />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { useChatStore } from '@/stores/chat_store'
import { useRoomStore } from '@/stores/room_store'
import type { Chat } from '@/utils/utils'
import { rooms } from '@/data/rooms'
import InputMessage from '@/components/InputMessage.vue'

const props = defineProps<{
    roomId: string | null
}>()

const chatStore = useChatStore()
const messagesContainer = ref<HTMLElement | null>(null)
const messages = ref<Chat[]>([])
const roomStore = useRoomStore()

const room = computed(() => {
    if (roomStore.getRoom) {
        return roomStore.getRoom
    }

    const room = rooms.customer_rooms.find((room) => room.room_id === props.roomId)

    roomStore.setRoom({
        id: room?.room_id || '',
        name: room?.name || '',
        user_avatar_url: room?.user_avatar_url || ''
    })

    return roomStore.getRoom
})

// Watch for roomId changes and fetch messages
watch(() => props.roomId, (newRoomId) => {
    if (newRoomId) {
        messages.value = chatStore.getMessage(newRoomId)
    }
}, { immediate: true })

// Watch for changes in chat store messages
watch(() => chatStore.messages, (newMessages) => {
    if (props.roomId) {
        messages.value = chatStore.getMessage(props.roomId)
        nextTick(() => scrollToBottom())
    }
}, { deep: true })

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString()
}

onMounted(() => {
    scrollToBottom()
})

const lastMessageContainFile = (message: string) => {
    return message.includes('[file]') && message.includes('[/file]')
}

const removeFileTypeMsg = (msg: string) => {
    return msg.replace(/\[file\](.*?)\[\/file\]/g, '$1')
}

</script>

<style scoped>
.chat-window {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 100%;
    width: 100%;
}

.chat-header {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.chat-header-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.message {
    max-width: 70%;
    margin: 0.5rem 0;
}

.sent {
    color: #f5f5f5;
    align-self: flex-end;
}

.received {
    color: #000;
    align-self: flex-start;
}

.message-content {
    padding: 0.8rem;
    border-radius: 1rem;
    background-color: #e9ecef;
}

.message.sent .message-content {
    background-color: #007bff;
    color: white;
}

.message-text {
    font-size: 1rem;
    margin-bottom: 0.3rem;
}

.message-time {
    font-size: 0.8rem;
    margin-top: 0.3rem;
}

.message-input {
    padding: 1rem;
    border-top: 1px solid #ddd;
}

.message-input-container {
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
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin: 0;
}

/* Scrollbar styling */
.messages::-webkit-scrollbar {
    width: 6px;
}

.messages::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.messages::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.messages::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>