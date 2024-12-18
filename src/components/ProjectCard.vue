<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}>()
</script>

<template>
  <article class="card group hover:scale-105 transition-transform duration-300">
    <img :src="image" :alt="title" class="w-full h-48 object-cover rounded-lg mb-4">
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
    <a
      :href="link"
      class="inline-block text-primary hover:text-secondary transition-colors duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      View Project →
    </a>
  </article>
</template>