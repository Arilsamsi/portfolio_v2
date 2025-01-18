<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'

// Terima prop offset dari komponen induk
const props = defineProps({
  offset: {
    type: Boolean,
    default: false,
  },
})

// Atur posisi tombol chatbot berdasarkan offset
const chatBotClass = computed(() => (props.offset ? 'bottom-[85px]' : 'bottom-8'))

interface Message {
  text: string
  isUser: boolean
  timestamp: Date
}

const messages = ref<Message[]>([
  {
    text: "Halo! Apa yang bisa saya bantu hari ini?",
    isUser: false,
    timestamp: new Date()
  }
])

const newMessage = ref('')
const isChatOpen = ref(false)
const userName = ref<string>('')
const hasAskedName = ref<boolean>(false)

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    text: newMessage.value,
    isUser: true,
    timestamp: new Date()
  })

setTimeout(() => {
  if (!userName.value && !hasAskedName.value) {
    messages.value.push({
      text: "Siapa nama kamu?",
      isUser: false,
      timestamp: new Date()
    });
    hasAskedName.value = true;
  } else if (!userName.value) {
    const inputName = newMessage.value.trim().toLowerCase();
    if (inputName) { 
      userName.value = inputName
      console.log('Nama yang dimasukkan:', inputName);

      if (["deyis", "dyis", "deis", "deyiss", "eyis", "eyiss", "eyisss", "eyissss"].includes(inputName)) {
        messages.value.push({
          text: `I love you sayanggggkuuu cintakuuu cantikkkuuu😍😘💗💗💗`,
          isUser: false,
          timestamp: new Date()
        });
      } else {
        messages.value.push({
          text: `Nice to meet you, ${inputName}!`,
          isUser: false,
          timestamp: new Date()
        });
      }
    } else {
      messages.value.push({
        text: "Tolong masukkan nama kamu.",
        isUser: false,
        timestamp: new Date()
      });
    }
  } else {
    messages.value.push({
      text: `Nice to meet you, ${userName.value}!`,
      isUser: false,
      timestamp: new Date()
    });
  }
  newMessage.value = ''; 
  }, 1000)
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

</script>

<template>
  <button 
    @click="toggleChat"
    class="fixed right-8 bg-transparent text-white p-3 rounded-full shadow-lg hover:bg-primary transition-all duration-300 ease-in-out"
    :class="[chatBotClass]"
    aria-label="ChatBot"
  >
    <!-- <i class="fa-brands fa-bots fa-xl"></i> -->
    <img 
        v-if="!isChatOpen"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdklEQVR4nO2WTWgTQRTHFwsKQlVsZWfT1A8Q0dRTRIqHQoUqSKJWRGmwUU9Jm9n05smPmxfxogjaeNCbJ09qFWkvIig2eigaW4kEP4qGQtsklbTQ9i9v7NTdsml3N2lA8MEfhpnJ+82b7Jv3FMWFxVUc1Bm+coYvXEWrUi3TNSR1DVjQYDXBryWYa3hVNXBMxWkJpvGqA+ObsYGrCJ6pLzxsXZ8GicY0d6EOtRUHdnvQyBkSOsMvijJUN4kdykshGovo/6z1xhvgrQhUV3Gea8gbPiZ01ufRVJMUorFxjWvIcYZzZUE5wxWjU0diuOw6Ut0t9C/8rCNobAsYXVm5YPqLol402I+W4a7RQXTvHMKnZhCKFJcV7elqmlt6gN4VgT0atsYZfFzDlMjR7fNov15AS2oMLSM2lRpD+7UC+LZ5CS50M+wh3yXBXENm8aQeIHA/Zx+4RMF7OeHDcO0ZW2C6NqOj5lQWB1LZkiBaa/5gXg+fnHEOPn4zb3Ky7tkn1PanS4I39qextm/ENHfsRt45+MiDSZOTnW++wfd2tCR4d3IUuwa/m+bIh2NwMGGOWIrgmwY+m+R7Z32gowkXEYe6ipbO9r/PYs2TYSiPPgrVPB4Wc1Z7Q9GiPXCPIZ0oldoGxi0d+od+gL3ICPmHflruaXs+LlNq5XSSJiqRBkT2zeLQ0wnHqXS4bwIR/6yM9M6iYydPJvcCnR3TOHF1Sjwmy4n2hDumxW/kk8kb4bENJqMHvty3OsYQdgSVpjNccl0gGC4qFWgEcg4qUvmNgDRqZ+gjka1PCSAVltuOyqBdo4ZOVxFY6ExukcRYRWBVmr3/9k/bb8ubQkFZZZVJAAAAAElFTkSuQmCC" alt="bot"
    >
    <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-[30px] w-[30px] dark:text-white text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
  </button>
  <!-- Chat Window -->
  <div
      v-show="isChatOpen"
      class="fixed top-[70px] right-6 w-[350px] md:w-[400px] bg-white rounded-lg shadow-xl overflow-hidden z-40 transition-all duration-300"
    >
      <!-- Header -->
      <div class="bg-blue-500 p-4 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <h1 class="text-white text-xl font-bold">AI Chat Assistant</h1>
      </div>

      <!-- Chat Messages -->
      <div class="h-[368px] overflow-y-auto p-4 space-y-4 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'max-w-[80%] p-3 rounded-lg',
            message.isUser ? 'ml-auto bg-gray-300 text-gray-900 dark:bg-green-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 dark:text-white' : 'bg-gray-300 text-gray-900 dark:bg-green-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 dark:text-white'
          ]"
          class=""
        >
          <p>{{ message.text }}</p>
          <span class="text-xs opacity-70">
            {{ new Date(message.timestamp).toLocaleTimeString() }}
          </span>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t p-4 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
          />
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-green-800"
          >
            Send
          </button>
        </form>
      </div>
    </div>
</template>
