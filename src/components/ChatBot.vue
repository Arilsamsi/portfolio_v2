<script lang="ts">
import { defineComponent, onMounted, ref, computed, nextTick } from "vue";
import * as marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import geminiAvatar from "../assets/bot/gemini.svg";

interface Message {
  type: "user" | "bot";
  text: string;
  formattedText: string;
  isLoading?: boolean;
  isError?: boolean;
}

export default defineComponent({
  name: "Chatbot",
  props: {
    offset: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const chatHistory = ref<Message[]>([]);
    const userMessage = ref("");
    const isGeneratingResponse = ref(false);
    const showHeaderText = computed(() => chatHistory.value.length === 0);
    const chatContainer = ref<HTMLElement | null>(null);
    const theme = ref(localStorage.getItem("themeColor") || "dark_mode");
    const userAvatar =
      "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg";
    // const geminiAvatar = require('../assets/bot/gemini.svg');
    const suggestions = ref([
      "Berikan tips untuk membantu anak menyelesaikan pekerjaan rumahnya tepat waktu",
      "Bantu saya menulis email di luar kantor",
      "Beri saya frasa untuk belajar bahasa baru",
      "Tunjukkan pada saya cara membuat sesuatu dengan tangan",
    ]);
    const suggestionIcons = ref([
      "bx bx-stopwatch",
      "bx bx-edit-alt",
      "bx bx-compass",
      "bx bx-wrench",
    ]);
    const GOOGLE_API_KEY = ref("AIzaSyB9i0mUkXH14tPPDq0rZUPwGKKgNYnfLRU");
    const API_REQUEST_URL = computed(
      () =>
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY.value}`
    );
    const themeIcon = computed(() =>
      theme.value === "light_mode" ? "bx bx-moon" : "bx bx-sun"
    );

    const toggleTheme = () => {
      theme.value = theme.value === "light_mode" ? "dark_mode" : "light_mode";
      localStorage.setItem("themeColor", theme.value);
      document.body.classList.toggle("light_mode");
    };

    const scrollToBottom = async () => {
      await nextTick();
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    };

    const handleSendMessage = async () => {
      const messageText = userMessage.value.trim();
      if (!messageText || isGeneratingResponse.value) return;

      isGeneratingResponse.value = true;
      userMessage.value = "";

      chatHistory.value.push({
        type: "user",
        text: messageText,
        formattedText: messageText,
      });
      chatHistory.value.push({
        type: "bot",
        text: "",
        formattedText: "",
        isLoading: true,
      });
      scrollToBottom();

      try {
        const response = await fetch(API_REQUEST_URL.value, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: messageText }] }],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage =
            errorData.error?.message ||
            `HTTP error! status: ${response.status}`;
          throw new Error(errorMessage);
        }

        const responseData = await response.json();
        const botText =
          responseData.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Tidak ada respon yang diterima.";
        const formattedBotText = marked.parse(botText);

        chatHistory.value[chatHistory.value.length - 1] = {
          type: "bot",
          text: botText,
          formattedText: formattedBotText,
          isLoading: false,
        };
        hljs.highlightAll();
        scrollToBottom();
      } catch (error: any) {
        console.error("Kesalahan API:", error);
        chatHistory.value[chatHistory.value.length - 1] = {
          type: "bot",
          text: error.message,
          formattedText: `<span style="color: red;">${error.message}</span>`,
          isLoading: false,
          isError: true,
        };
        scrollToBottom();
      } finally {
        isGeneratingResponse.value = false;
      }
    };

    const handleSuggestionClick = (suggestion: string) => {
      userMessage.value = suggestion;
      handleSendMessage();
    };

    const clearChat = () => {
      if (confirm("Apakah Anda yakin ingin menghapus semua riwayat chat?")) {
        chatHistory.value = [];
        localStorage.removeItem("saved-api-chats");
      }
    };

    const copyMessageToClipboard = (text: string, event: Event) => {
      const target = event.target as HTMLElement;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          target.innerHTML = `<i class='bx bx-check'></i>`;
          setTimeout(
            () => (target.innerHTML = `<i class='bx bx-copy-alt'></i>`),
            1000
          );
        })
        .catch((err) => {
          console.error("Gagal menyalin:", err);
          alert("Tidak dapat menyalin teks!");
        });
    };

    onMounted(() => {
      document.body.classList.toggle(
        "light_mode",
        theme.value === "light_mode"
      );
      scrollToBottom();
    });

    const isChatOpen = ref(false);
    const toggleChat = () => {
      isChatOpen.value = !isChatOpen.value;
    };

    const chatBotClass = computed(() =>
      props.offset ? "bottom-[85px]" : "bottom-8"
    );

    return {
      chatHistory,
      userMessage,
      handleSendMessage,
      handleSuggestionClick,
      showHeaderText,
      themeIcon,
      toggleTheme,
      clearChat,
      suggestions,
      suggestionIcons,
      userAvatar,
      geminiAvatar,
      copyMessageToClipboard,
      toggleChat,
      chatBotClass,
      isChatOpen,
    };
  },
});
</script>

<template>
  <button
    @click="toggleChat"
    class="fixed right-8 bg-transparent text-white p-3 rounded-full w-[40px] h-[40px] shadow-lg hover:bg-primary transition-all duration-300 ease-in-out"
    :class="[chatBotClass]"
    aria-label="ChatBot"
    v-bind:class="$attrs"
  >
    <!-- <i class="fa-brands fa-bots fa-xl"></i> -->
    <img
      v-if="!isChatOpen"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdklEQVR4nO2WTWgTQRTHFwsKQlVsZWfT1A8Q0dRTRIqHQoUqSKJWRGmwUU9Jm9n05smPmxfxogjaeNCbJ09qFWkvIig2eigaW4kEP4qGQtsklbTQ9i9v7NTdsml3N2lA8MEfhpnJ+82b7Jv3FMWFxVUc1Bm+coYvXEWrUi3TNSR1DVjQYDXBryWYa3hVNXBMxWkJpvGqA+ObsYGrCJ6pLzxsXZ8GicY0d6EOtRUHdnvQyBkSOsMvijJUN4kdykshGovo/6z1xhvgrQhUV3Gea8gbPiZ01ufRVJMUorFxjWvIcYZzZUE5wxWjU0diuOw6Ut0t9C/8rCNobAsYXVm5YPqLol402I+W4a7RQXTvHMKnZhCKFJcV7elqmlt6gN4VgT0atsYZfFzDlMjR7fNov15AS2oMLSM2lRpD+7UC+LZ5CS50M+wh3yXBXENm8aQeIHA/Zx+4RMF7OeHDcO0ZW2C6NqOj5lQWB1LZkiBaa/5gXg+fnHEOPn4zb3Ky7tkn1PanS4I39qextm/ENHfsRt45+MiDSZOTnW++wfd2tCR4d3IUuwa/m+bIh2NwMGGOWIrgmwY+m+R7Z32gowkXEYe6ipbO9r/PYs2TYSiPPgrVPB4Wc1Z7Q9GiPXCPIZ0oldoGxi0d+od+gL3ICPmHflruaXs+LlNq5XSSJiqRBkT2zeLQ0wnHqXS4bwIR/6yM9M6iYydPJvcCnR3TOHF1Sjwmy4n2hDumxW/kk8kb4bENJqMHvty3OsYQdgSVpjNccl0gGC4qFWgEcg4qUvmNgDRqZ+gjka1PCSAVltuOyqBdo4ZOVxFY6ExukcRYRWBVmr3/9k/bb8ubQkFZZZVJAAAAAElFTkSuQmCC"
      alt="bot"
      height="40px"
      width="40px"
    />
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-[40px] w-[40px] dark:text-white text-black"
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
    class="chatbot-container fixed top-[70px] right-6 w-[350px] md:w-[400px] bg-white rounded-lg shadow-xl overflow-hidden z-40 transition-all duration-300"
  >
    <!-- Header -->
    <!-- <div class="bg-blue-500 p-4 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <h1 class="text-white text-xl font-bold">AI Chat Assistant</h1>
      </div> -->

    <!-- <div class="chatbot-container fixed top-[70px] right-6 w-[350px] md:w-[400px] bg-white rounded-lg shadow-xl overflow-hidden z-40 transition-all duration-300"
        v-show="isChatOpen"
        >   -->
    <!-- Header -->
    <div
      class="bg-blue-500 h-[50px] p-5 flex items-center justify-around p-4 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
    >
      <h1 class="text-white text-xl font-bold pl-10">AI Chat Assistant</h1>
    </div>

    <section
      class="chats h-[368px] overflow-y-auto p-4 space-y-4 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
      ref="chatContainer"
    >
      <div
        v-for="(message, index) in chatHistory"
        :key="index"
        :class="[
          'message',
          message.type === 'user' ? 'message--outgoing' : 'message--incoming',
          message.isLoading ? 'message--loading' : '',
          message.isError ? 'message--error' : '',
        ]"
      >
        <div class="message__content">
          <img
            class="message__avatar"
            :src="message.type === 'user' ? userAvatar : geminiAvatar"
            :alt="message.type + ' avatar'"
          />
          <p class="message__text" v-html="message.formattedText"></p>
          <div v-if="message.isLoading" class="message__loading-indicator">
            <div class="message__loading-bar"></div>
            <div class="message__loading-bar"></div>
            <div class="message__loading-bar"></div>
          </div>
        </div>
        <span
          v-if="!message.isLoading && message.type === 'bot'"
          @click="copyMessageToClipboard(message.text, $event)"
          class="message__icon"
          ><i class="bx bx-copy-alt"></i
        ></span>
      </div>
    </section>

    <section
      class="prompt text-white border-t border-t bg-blue-500 rounded md:w-[400px] dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
    >
      <form @submit.prevent="handleSendMessage" class="prompt__form">
        <div class="prompt__input-wrapper">
          <input
            type="text"
            v-model="userMessage"
            placeholder="Enter a prompt here"
            class="prompt__form-input w-[400px] md:w-[400px] text-white focus:border-blue-900 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
            required
          />
          <button type="submit" class="prompt__form-button" id="sendButton">
            <i class="bx bx-send"></i>
          </button>
          <button
            type="button"
            @click="clearChat"
            class="prompt__form-button"
            id="deleteButton"
          >
            <i class="bx bx-trash"></i>
          </button>
        </div>
      </form>
      <!-- <p class="prompt__disclaim">Gemini dapat membuat kesalahan, jadi periksa kembali responsnya</p> -->
    </section>
    <!-- </div> -->
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

:root {
  --primary-color: #131314;
  --secondary-color: #1e1f20;
  --secondary-hover-color: #333537;

  --focus-color: #282a2c;
  --focus-hover-color: #37393b;

  --button-hover-color: #2f3030;

  --text-color: #fff;
  --text-secondary-color: #d8d8d8;
  --heading-secondary-color: #444746;
  --placeholder-color: #abafb3;
}

.light_mode {
  --primary-color: #ffffff;
  --secondary-color: #f0f4f9;
  --secondary-hover-color: #dde3ea;

  --focus-color: #e9eef6;
  --focus-hover-color: #e1e6ed;

  --button-hover-color: #e9ecf1;

  --text-color: #000;
  --text-secondary-color: #4d4d4d;
  --heading-secondary-color: #c4c7c5;
  --placeholder-color: #717075;
}

body {
  background: var(--primary-color);
}

.header,
.chats .message,
.chats .message .message__content,
.prompt__form {
  margin: 0 auto;
  max-width: 824px;
}

body.hide-header .header {
  margin: 0;
  display: none;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.navbar__logo {
  color: var(--text-secondary-color);
  font-weight: 600;
}

.navbar__button {
  padding: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: none;
  background: var(--secondary-color);
  color: var(--text-color);
  cursor: pointer;
  transition: background 0.3s ease;
}

.navbar__button:hover {
  background: var(--secondary-hover-color);
}

.header {
  margin-top: 6vh;
}

.header__title h1 {
  width: fit-content;
  background: linear-gradient(to right, #4a90e2, #a355b9, #ff6b6b);
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  font-size: 3.25rem;
  font-weight: 600;
}

.header__title h2 {
  color: var(--heading-secondary-color);
  font-size: 3.25rem;
  font-weight: 600;
}

.suggests {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4.875rem;
  gap: 0.5rem;
}

.suggests__item {
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  padding: 1rem;
  height: 12.5rem;
  width: 12.5rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.3s ease;
}

.suggests__item:hover {
  background: var(--secondary-hover-color);
}

.suggests__item-text {
  font-weight: 500;
  line-height: 1.375rem;
}

.suggests__item-icon {
  text-align: right;
}

.suggests__item-icon i {
  font-size: 1.5rem;
  background: var(--primary-color);
  padding: 0.5rem;
  border-radius: 50%;
}

.prompt {
  position: fixed;
  /* background: var(--primary-color); */
  z-index: 1000;
  /* width: 100%; */
  /* left: 0;
    bottom: 0; */
  padding: 1rem;
  /* background: #1E1F20; */
  /* width: 350px; */
}

.prompt__input-wrapper {
  width: 100%;
  height: 4rem;
  display: flex;
  position: relative;
}

.prompt__form-input {
  height: 100%;
  width: 100%;
  border: none;
  resize: none;
  font-size: 1rem;
  color: var(--text-color);
  padding: 1rem 1.75rem;
  border-radius: 100px;
  background: var(--secondary-color);
  transition: background 0.3s ease;
  padding-right: 100px;
}

.prompt__form-input:focus {
  background: var(--focus-color);
}

.prompt__form-input:focus ~ .prompt__form-button:hover {
  background: var(--focus-hover-color);
}

.prompt__form-input::placeholder {
  color: var(--placeholder-color);
}

.prompt__form-button {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  background: transparent;
  transition: all 0.3s ease;
}

.prompt__form-button:hover {
  background: var(--button-hover-color);
}

.prompt__form-button#sendButton {
  transform: translateY(-50%) scale(0);
}

.prompt__form-input:valid ~ .prompt__form-button#sendButton {
  transform: translateY(-50%) scale(1);
}

.prompt__form-input:valid ~ #deleteButton {
  right: 3.5rem;
}

.prompt__disclaim {
  text-align: center;
  color: var(--placeholder-color);
  font-size: 0.85rem;
  margin-top: 1rem;
}

.chats {
  padding: 2rem 1rem 10rem;
  max-height: 100%;
  overflow-y: auto;
  scrollbar-color: #999 transparent;
  /* overflow: scroll; */
}

.chats .message--incoming {
  margin-top: 1.5rem;
}

.chats .message--outgoing:not(:first-child) {
  margin-top: 40px;
}

.chats .message__content {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
}

.chats .message__text {
  color: var(--text-color);
  white-space: pre-wrap;
  margin-top: 10px;
}

.hide {
  display: none !important;
}

.chats .message--error .message__text {
  color: #e55865;
}

.chats .message--loading .message__text {
  display: none;
}

.chats .message__avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  object-fit: top center;
}

.chats .message--loading .message__avatar {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.chats .message__icon {
  color: var(--text-color);
  cursor: pointer;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  font-size: 1.25rem;
  margin-left: 3.5rem;
  transition: background 0.3s ease;
}

.chats .message__icon:hover {
  background: var(--secondary-hover-color);
}

.chats .message__loading-indicator {
  display: none;
  gap: 0.6rem;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;
}

.chats .message--loading .message__loading-indicator {
  display: flex;
}

.chats .message__loading-indicator .message__loading-bar {
  height: 1rem;
  width: 100%;
  border-radius: 0.135rem;
  background-position: -800px 0;
  background: linear-gradient(
    to right,
    #2563eb60 30%,
    var(--primary-color) 60%,
    #2563eb60
  );
  animation: loading 3s linear infinite;
}

.chats .message__loading-indicator .message__loading-bar:first-child {
  width: 85%;
}

.chats .message__loading-indicator .message__loading-bar:last-child {
  width: 70%;
}

@keyframes loading {
  0% {
    background-position: -800px 0;
  }
  50% {
    background-position: 0px 0;
  }
  100% {
    background-position: 800px 0;
  }
}

.code__copy-btn {
  background-color: transparent;
  border: none;
  color: var(--text-color);
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 12px;
  z-index: 10;
  font-size: 18px;
}

p {
  margin-bottom: 10px;
}

ul {
  list-style: disc inside;
  margin-left: 20px;
}

ol {
  margin-left: 40px;
}

strong {
  font-weight: bold;
}

em {
  font-size: italic;
}

a {
  color: #1e90ff;
  text-decoration: none;
}

th,
td {
  border: 1px solid;
  text-align: left;
  padding: 10px;
}

pre {
  position: relative;
  background-color: var(--secondary-color);
  padding: 10px 0 0;
  font-family: monospace;
  font-size: 14px;
  border-radius: 10px;
  margin: 0;
  overflow-x: auto;
}

code {
  margin-top: 30px;
  border-radius: 5px;
  color: inherit;
}

.code__language-label {
  position: absolute;
  font-weight: bold;
  top: 10px;
  left: 12px;
  color: var(--placeholder-color);
  font-size: 14px;
  text-transform: capitalize;
}

.hljs {
  background-color: var(--secondary-color);
}

blockquote {
  padding-left: 60px;
  line-height: 2.5rem;
  color: var(--text-color);
}

@media screen and (max-width: 980px) {
  .header {
    padding: 0 2rem;
  }

  .header__title {
    line-height: 2.8rem;
  }

  .header__title h1 {
    font-size: 2.7rem;
  }

  .header__title h2 {
    font-size: 2.5rem;
  }

  .suggests {
    justify-content: center;
  }

  .suggests__item:nth-child(3),
  .suggests__item:nth-child(4) {
    display: none;
  }

  .message {
    padding: 0 1.5rem;
  }

  .prompt__disclaim {
    font-size: 0.8rem;
  }
}

@media only screen and (max-width: 480px) {
  .prompt {
    width: 350px;
  }
}
@media only screen and (max-width: 600px) {
  .prompt {
    width: 350px;
  }
}
@media only screen and (max-width: 768px) {
  .prompt {
    width: 350px;
  }
}
</style>
