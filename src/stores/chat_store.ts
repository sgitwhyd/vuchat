import { generateDummyChat } from '@/utils/utils'
import { defineStore } from 'pinia'
import {type Chat} from '@/utils/utils'


interface User {
  id: number
  name: string
  avatar: string
}

const CHAT_STORAGE_KEY = 'chats'
import router from '@/router'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Chat[],
    isLoading: false,
  }),

  getters: {
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    setMessage() {
      if (localStorage.getItem(CHAT_STORAGE_KEY)) {
        this.messages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]')
      } else {
        const dummyChat = generateDummyChat()
        this.messages = dummyChat
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(dummyChat))
      }
    },

    getMessage(roomId: string) {
      const messages = this.messages.filter((message) => message.room_id === roomId)
      return messages
    },

    addMessage(content: string, roomId: string, userId: string | null) {

      const newMessage: Chat = {
        id: new Date().getTime(),
        room_id: roomId,
        message: content,
        is_sender: true,
        user_id: userId,
        user_avatar_url: null,
        created_at: new Date().toISOString()
      }
      this.messages.push(newMessage)
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages))
    }
  }
}) 