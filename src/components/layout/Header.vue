<script setup lang="ts">
import { useMenu } from '../../composables/useMenu'
import ThemeSwitcher from '../ThemeSwitcher.vue'
import MobileMenu from './MobileMenu.vue'
import HamburgerButton from './HamburgerButton.vue'

const { isMenuOpen, toggleMenu, closeMenu } = useMenu()

const menuItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]
</script>

<template>
  <header 
    class="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800"
  >
    <nav class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <a 
          href="/" 
          class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Portfolio
        </a>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="item in menuItems"
            :key="item.name"
            :href="item.href"
            class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
          >
            {{ item.name }}
          </a>
          <ThemeSwitcher />
        </div>

        <!-- Mobile Menu Controls -->
        <div class="flex items-center gap-4 md:hidden">
          <ThemeSwitcher />
          <HamburgerButton
            :is-open="isMenuOpen"
            @click="toggleMenu"
          />
        </div>
      </div>

      <!-- Mobile Menu -->
      <MobileMenu
        :is-open="isMenuOpen"
        :menu-items="menuItems"
        @close="closeMenu"
      />
    </nav>
  </header>
</template>