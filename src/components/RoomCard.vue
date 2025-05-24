<template>
    <div class="room-card" :class="{ active: roomStore.getRoom?.id === room.room_id }" @click="navigateToRoom">
        <div class="room-card-content">
            <img :src="room.user_avatar_url" :alt="room.name" class="room-icon">
            <div class="room-info">
                <h3 class="room-name">{{ room.name }}</h3>
                <p class="room-last-chat">{{ lastMessageContainFile ? 'File' : room.last_comment_text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useRoomStore, type Room, type RoomStoreState } from '@/stores/room_store'

const props = defineProps<{
    room: Room
}>()

const router = useRouter()
const roomStore = useRoomStore()

const navigateToRoom = () => {
    const roomPayload: RoomStoreState = {
        id: props.room.room_id,
        name: props.room.name,
        user_avatar_url: props.room.user_avatar_url
    }
    roomStore.setRoom(roomPayload)
    router.push(`/chat/${props.room.room_id}`)
}

const lastMessageContainFile = computed(() => {
    return props.room.last_comment_text.includes('[file]')
})

</script>

<style scoped>
.room-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.room-card.active {
    background-color: #f5f5f5;
}

.room-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.room-card-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.room-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

.room-info {
    flex: 1;
}

.room-name {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
}

.room-last-chat {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    color: #666;
}
</style>