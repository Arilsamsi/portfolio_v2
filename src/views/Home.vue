<script setup lang="ts">
import { ref } from "vue";
import { onMounted, onUnmounted } from "vue";
// import ContactForm from '../components/ContactForm.vue'
// import Header from '../components/layout/Header.vue';
// import Footer from '../components/layout/Footer.vue';

const texts = ["Web Developer ", "Kultivator "];
const displayedText = ref<string>("");
let index = 0;
let charIndex = 0;
let isDeleting = false;
let typingInterval: number | undefined;

const type = () => {
  const currentText = texts[index];

  if (isDeleting) {
    charIndex--;
    if (charIndex <= 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }
  } else {
    charIndex++;
    if (charIndex === currentText.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 2000);
      return;
    }
  }

  displayedText.value = currentText.substring(0, charIndex);

  const delay = isDeleting ? 300 : 200;
  if (charIndex === currentText.length && !isDeleting) {
    typingInterval = window.setTimeout(type, 5000);
  } else {
    typingInterval = window.setTimeout(type, delay);
  }
};

onMounted(() => {
  type();
});

onUnmounted(() => {
  clearTimeout(typingInterval);
});

const links = [
  {
    href: "https://github.com/arilsamsi/",
    icon: "fab fa-github",
    class: "hover:text-gray-500",
  },
  {
    href: "https://www.facebook.com/profile.php?id=100076206191055",
    icon: "fab fa-facebook-f",
    class: "hover:text-blue-600",
  },
  {
    href: "https://www.tiktok.com/@deyissmyluvvv?is_from_webapp=1&sender_device=pc",
    icon: "fab fa-tiktok",
    class: "hover:text-black",
  },
  {
    href: "https://www.instagram.com/arilsamsi/?igsh=aHB5dXY1NTN6N2Q4",
    icon: "fab fa-instagram",
    class: "hover:text-pink-600",
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

<template>
  <!-- <Header /> -->
  <!-- Hero Section -->
  <section
    class="h-[100vh] min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10"
  >
    <div class="text-center animate-fade-in">
      <h1 class="text-5xl font-bold mb-6 dark:text-white">Ahmad Aril Samsi</h1>
      <div
        class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-8"
      >
        <span>{{ displayedText }}</span>
      </div>
      <a
        href="https://wa.me/6282393426013"
        class="bg-[#128c7e] text-white px-8 py-3 rounded-full hover:bg-[#129e7a] transition-colors duration-300"
      >
        <font-awesome-icon :icon="['fab', 'whatsapp']" />
        WhatsApp
      </a>
      <div class="social-links">
        <div class="overflow-hidden relative w-full h-10 mt-5">
          <div
            class="links flex space-x-4 absolute w-auto animate-scroll"
            :class="{ paused: isPaused }"
            @mouseenter="pauseAnimation"
            @mouseleave="resumeAnimation"
          >
            <a
              v-for="(link, index) in [...links, ...links, ...links]"
              :key="index"
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
      </div>
    </div>
  </section>
  <!-- <Footer /> -->
</template>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.6%);
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
  align-items: center;
  justify-content: center;
}
.relative {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
}
.links {
  font-weight: bold;
  font-size: 1.5rem;
}

@keyframes scrolls {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.6%);
  }
}

.skills-container {
  width: 100%;
  height: 150px; /* Adjust height based on card size */
  position: relative;
  overflow: hidden;
}

.skills-track {
  display: flex;
  animation: scrolls 15s linear infinite;
  width: max-content;
}

.pausedSkill {
  animation-play-state: paused;
}

.card {
  min-width: 120px; /* Adjust card size */
}
.skill {
  margin-bottom: 7px;
}
</style>
