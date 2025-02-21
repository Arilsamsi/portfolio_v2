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
    class="card group hover:scale-105 transition-transform duration-300 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg"
  >
    <div class="relative cursor-pointer" @click="isPopupOpen = true">
      <img
        :src="image"
        :alt="title"
        class="w-full h-56 object-cover rounded-lg"
      />
      <div
        class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold"
      >
        Click to View
      </div>
    </div>
    <h3 class="text-xl font-semibold mt-4">{{ title }}</h3>
    <p class="text-gray-600 dark:text-gray-300 mt-2">{{ description }}</p>
    <div class="flex flex-wrap gap-2 mt-3">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
      >
        {{ tag }}
      </span>
    </div>
    <div class="flex justify-between items-center mt-5">
      <a
        :href="link"
        class="text-primary hover:text-secondary transition-colors duration-300 font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Project →
      </a>
      <a
        :href="repo"
        class="text-primary hover:text-secondary transition-colors duration-300 font-medium"
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
      class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4"
      @click.self="isPopupOpen = false"
    >
      <div
        class="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <button
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-2xl"
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
