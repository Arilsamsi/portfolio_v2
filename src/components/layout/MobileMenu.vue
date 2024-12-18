<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  menuItems: Array<{ name: string; href: string }>
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Handle body scroll
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('menu-open')
  } else {
    document.body.classList.remove('menu-open')
  }
})

// Close menu on escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

// Close menu on click outside
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.mobile-menu') && !target.closest('button') && props.isOpen) {
    emit('close')
  }
}

// Close menu on navigation
const handleNavigation = () => {
  emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.removeEventListener('click', handleClickOutside)
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <div
    class="mobile-menu md:hidden"
    :class="{ 'pointer-events-none': !isOpen }"
  >
    <div
      class="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 transform border-t border-gray-200 dark:border-gray-800"
      :class="{
        'translate-y-0 opacity-100': isOpen,
        '-translate-y-4 opacity-0 pointer-events-none': !isOpen
      }"
    >
      <div class="p-4 space-y-2">
        <a
          v-for="item in menuItems"
          :key="item.name"
          :href="item.href"
          class="block py-3 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary transition-all duration-200"
          @click="handleNavigation"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>