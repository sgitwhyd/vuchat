import { defineStore } from 'pinia'

export interface RoomStoreState {
  id: string
  name: string
  user_avatar_url: string
}

export interface Room {
  channel_id: number
  contact_id: number | null
  id: number
  is_calling: boolean
  is_handled_by_bot: boolean
  is_resolved: boolean
  is_waiting: boolean
  last_comment_sender: string
  last_comment_sender_type: string
  last_comment_text: string
  last_comment_timestamp: string
  last_customer_comment_text: string | null
  last_customer_timestamp: string
  name: string
  room_badge: string | null
  room_id: string
  room_type: string
  source: string
  user_avatar_url: string
  user_id: string
}

export const useRoomStore = defineStore('room', {
  state: () => ({
    room: null as RoomStoreState | null,
    rooms: [] as Room[],
  }),
  getters: {
    getRoom: (state) => state.room,
  },

  actions: {
    setRoom(room: RoomStoreState) {
      this.room = room
    },
    setRooms(rooms: Room[]) {
      this.rooms = rooms
    },
    clearRoom() {
      this.room = null
    },
  },
  persist: true,
})
