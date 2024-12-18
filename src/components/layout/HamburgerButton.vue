<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <button
    class="relative w-8 h-8 flex flex-col justify-center items-center"
    aria-label="Toggle menu"
  >
    <span
      class="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300"
      :class="{
        'rotate-45 translate-y-1': isOpen,
        '-translate-y-1': !isOpen
      }"
    />
    <span
      class="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mt-1 transition-all duration-300"
      :class="{
        'opacity-0': isOpen,
        'opacity-100': !isOpen
      }"
    />
    <span
      class="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mt-1 transition-all duration-300"
      :class="{
        '-rotate-45 -translate-y-1': isOpen,
        'translate-y-1': !isOpen
      }"
    />
  </button>
</template>