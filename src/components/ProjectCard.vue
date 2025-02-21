<script setup>
import { ref } from "vue";

defineProps({
  title: String,
  description: String,
  image: String,
  tags: Array,
  link: String,
  repo: String,
});

const isPopupOpen = ref(false);
</script>

<template>
  <article
    class="card group hover:scale-105 transition-transform duration-300 w-[340px] md:w-[400px]"
  >
    <img
      :src="image"
      :alt="title"
      class="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
      @click="isPopupOpen = true"
    />
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-600 dark:text-gray-300 mb-4">{{ description }}</p>
    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
      >
        {{ tag }}
      </span>
    </div>
    <div class="flex flex-col gap-5">
      <a
        :href="link"
        class="inline-block text-primary hover:text-secondary transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Project →
      </a>
      <a
        :href="repo"
        class="inline-block text-primary hover:text-secondary transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Repo →
      </a>
    </div>
  </article>

  <!-- Popup -->
  <transition name="fade">
    <div
      v-if="isPopupOpen"
      class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50"
      @click.self="isPopupOpen = false"
    >
      <div
        class="relative bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-11/12 max-w-lg"
      >
        <button
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-xl"
          @click="isPopupOpen = false"
        >
          &times;
        </button>
        <img :src="image" :alt="title" class="w-full h-auto rounded-lg" />
      </div>
    </div>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
