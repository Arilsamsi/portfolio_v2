<script setup lang="ts">
// import { useWindowScroll, } from '@vueuse/core'
// import { computed, ref, watch } from 'vue'
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import ChatBot from "./components/ChatBot.vue";
// import BotGemini from './components/BotGemini.vue'
</script>

<template>
  <Header />
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <ChatBot />
  <Footer />
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

<!-- <style scoped>
.Home-enter-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.Home-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.About-enter-active {
  transition: transform 1s ease, opacity 1s ease;
}
.About-enter-from {
  transform: scale(2);
  opacity: 0;
}

.Projects-enter-active {
  transition: transform 0.5s ease-in, opacity 1s ease-in;
}
.Projects-enter-from {
  transform: translateX(50%);
  opacity: 0;
}

.Contact-enter-active {
  transition: transform 1s ease-out, opacity 1s ease-out;
}
.Contact-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
</style> -->
