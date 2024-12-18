<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import Header from './components/layout/Header.vue'

const { y } = useWindowScroll()
const showScrollTop = computed(() => y.value > 300)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Header />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>

  <button
    v-show="showScrollTop"
    @click="scrollToTop"
    class="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary transition-colors duration-300"
    aria-label="Scroll to top"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</template>