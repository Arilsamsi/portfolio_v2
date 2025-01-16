<template>
    <div class="overflow-hidden relative w-full h-10">
      <div
        class="flex space-x-4 absolute w-auto animate-scroll"
        :class="{ 'paused': isPaused }"
        @mouseenter="pauseAnimation"
        @mouseleave="resumeAnimation"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :class="link.class"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:scale-110 transition-transform"
        >
          <i :class="link.icon"></i>
        </a>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const links = [
    {
      href: 'https://github.com/arilsamsi/',
      icon: 'fab fa-github',
      class: 'hover:text-gray-500',
    },
    {
      href: 'https://www.facebook.com/profile.php?id=100076206191055',
      icon: 'fab fa-facebook-f',
      class: 'hover:text-blue-600',
    },
    {
      href: 'https://www.tiktok.com/@deyissmyluvvv?is_from_webapp=1&sender_device=pc',
      icon: 'fab fa-tiktok',
      class: 'hover:text-black',
    },
    {
      href: 'https://www.instagram.com/arilsamsi/?igsh=aHB5dXY1NTN6N2Q4',
      icon: 'fab fa-instagram',
      class: 'hover:text-pink-600',
    },
  ];
  
  const isPaused = ref(false);
  
  const pauseAnimation = () => {
    isPaused.value = true;
  };
  
  const resumeAnimation = () => {
    isPaused.value = false;
  };
  </script>
  
  <style scoped>
  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  
  .animate-scroll {
    animation: scroll 10s linear infinite;
  }
  
  .paused {
    animation-play-state: paused;
  }
  </style>
  