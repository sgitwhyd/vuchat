<template>
    <RoomList />
    <ChatWindow v-if="isChatWindowOpen" :room-id="roomId" />
    <div v-else class="no-room-selected">
        <img src="@/assets/chat_empty.webp" alt="no room selected">
        <p>
            Select a room to start chatting
        </p>
    </div>

</template>

<script setup lang="ts">
import ChatWindow from '@/components/ChatWindow.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat_store'
import { useRoomStore } from '@/stores/room_store'
import { rooms as roomsData } from '@/data/rooms'
import RoomList from '@/components/RoomList.vue'


const isChatWindowOpen = ref(false)
const route = useRoute()
const roomId = ref<string | null>(null)
const roomStore = useRoomStore()
const chatStore = useChatStore()

watch(
    () => route.params.roomId,
    (newRoomId) => {
        isChatWindowOpen.value = !!newRoomId
        if (newRoomId) {
            roomId.value = newRoomId as string
        }
    },
    { immediate: true }
)

const updateRoomLastMessage = (messages: any[]) => {
    const rooms = roomsData.customer_rooms.map((room) => {
        const roomMessages = messages.filter((message) => message.room_id === room.room_id)
        // sorting by created_at
        const lastMessage = roomMessages.sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0]

        return {
            ...room,
            last_comment_text: lastMessage?.message || ''
        }
    })
    roomStore.setRooms(rooms)
}

onMounted(() => {
    chatStore.setMessage()
    updateRoomLastMessage(chatStore.messages)
})

// Watch for changes in messages
watch(() => chatStore.messages, (newMessages) => {
    updateRoomLastMessage(newMessages)
}, { deep: true })

</script>

<style>
.no-room-selected img {
    width: 80%;
}


.no-room-selected {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>