import { generateDummyChat, type Chat } from '@/utils/utils'
import { defineStore } from 'pinia'

const CHAT_STORAGE_KEY = 'chats'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Chat[],
    isLoading: true,
  }),

  getters: {
    getIsLoading: (state) => state.isLoading,
  },

  actions: {
    setMessage() {
      try {
        if (localStorage.getItem(CHAT_STORAGE_KEY)) {
          this.messages = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]')
        } else {
          const dummyChat = generateDummyChat()
          this.messages = dummyChat
          localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(dummyChat))
        }
      } finally {
        setTimeout(() => {
          this.setIsLoading(false)
        }, 800)
      }
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading
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
        created_at: new Date().toISOString(),
      }
      this.messages.push(newMessage)
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages))
    },
  },
})
