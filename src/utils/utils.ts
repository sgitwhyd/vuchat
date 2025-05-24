import { rooms } from "@/data/rooms"

export interface Chat {
    id: number
    room_id: string
    message: string
    is_sender: boolean
    user_id: string | null,
    user_avatar_url: string | null,
    created_at: string
}

export const generateDummyChat = () => {
    const roomsData = rooms.customer_rooms
    const dummyChat: Chat[] = []

    for (const room of roomsData) {
        const baseTime = new Date().getTime()
        
        // First message (from receiver)
        dummyChat.push({
            id: baseTime,
            room_id: room.room_id,
            message: "Hello from room " + room.room_id,
            is_sender: false,
            user_id: room.user_id,
            user_avatar_url: room.user_avatar_url,
            created_at: new Date(baseTime).toISOString(),
        })

        // Second message (from sender) - 1 second later
        dummyChat.push({
            id: baseTime + 1,
            room_id: room.room_id,
            message: room.last_comment_text,
            is_sender: true,
            user_id: room.user_id,
            user_avatar_url: null,
            created_at: new Date(baseTime + 1000).toISOString()
        })
    }

    return dummyChat
}