<template>
  <footer class="bg-gray-800 text-white py-6">
    <div class="container mx-auto text-center">
      <!-- Copyright -->
      <p>&copy; 2025 My Portfolio Website. All rights reserved.</p>

      <!-- Social Media Links -->
      <div class="social-links mt-3">
        <div class="overflow-hidden relative w-full">
          <div
            class="links flex space-x-8 animate-scroll absolute"
            :class="{ 'paused': isPaused }"
            @mouseenter="pauseAnimation"
            @mouseleave="resumeAnimation"
            >
            <a
              v-for="(link, index) in [ ...links, ...links, ...links ]"
              :key="index"
              :href="link.href"
              :class="link.class"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:scale-110 transition-transform text-2xl"
              >
              <i :class="link.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: "Footer",
  setup() {
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

    return { links, isPaused, pauseAnimation, resumeAnimation };
  },
};
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.5%);
  }
}

.animate-scroll {
  animation: scroll 5s linear infinite;
}

.paused {
  animation-play-state: paused;
}

.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.overflow-hidden {
  position: relative;
  width: 100%;
  height: 30px; 
}

.relative {
  position: relative;
  width: 100px;
}

.linkssss {
  display: flex;
  justify-content: space-between;
  /* min-width: 100%; Ensure width for all items to fit */
}

.text-2xl {
  font-size: 1.5rem;
}
</style>
