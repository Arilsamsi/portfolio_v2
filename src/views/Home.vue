<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, onUnmounted } from "vue";
import ProjectCard from '../components/ProjectCard.vue'
import ContactForm from '../components/ContactForm.vue'
import PopUp from '../components/PopUp.vue';

const projects = ref([
  {
    title: 'Project 1',
    description: 'My first Portfolio',
    image: '/projects/projects_1.png',
    tags: ['HTML', 'CSS', 'Javascript'],
    link: 'https://arilsamsi.vercel.app/',
    repo: 'https://github.com/Arilsamsi/proyek'
  },
  {
    title: 'Project 2',
    description: 'First Projects In class X',
    image: '/projects/projects_2.png',
    tags: ['HTML', 'CSS', 'Javascript'],
    link: 'https://rplsmklimboto.vercel.app/',
    repo: 'https://github.com/Arilsamsi/proyek'
  },
  {
    title: 'Project 3',
    description: 'A website make QRCODE',
    image: '/projects/projects_3.png',
    tags: ['HTML', 'CSS', 'Javascript'],
    link: 'https://pembuat-qr.vercel.app/',
    repo: 'https://github.com/Arilsamsi/proyek'
  },
  {
    title: 'Project 4',
    description: 'Website todo list',
    image: '/projects/projects_4.png',
    tags: ['Vue JS'],
    link: 'https://daftartugas.vercel.app/',
    repo: 'https://github.com/Arilsamsi/todo-list'
  },
  {
    title: 'Project 5',
    description: 'Wesbite movie',
    image: '/projects/projects_5.png',
    tags: ['Vue JS'],
    link: 'https://maniacmovie.vercel.app/',
    repo: 'https://github.com/Arilsamsi/movie-maniac_v2',
  }
])

const skills = ref([
  { name: 'HTML', icon: '/skils/html.png', class: 'hover:bg-red-200' },
  { name: 'CSS', icon: '/skils/css.png' },
  { name: 'JavaScript', icon: '/skils/js.png' },
  { name: 'PHP', icon: '/skils/php.png' },
  { name: 'Laravel', icon: '/skils/laravel.png' },
  { name: 'Vue JS', icon: '/skils/vuejs.png' },
  { name: 'Python', icon: '/skils/python.png' },
  { name: 'My SQL', icon: '/skils/mysql.png' },
]);

const isPausedSkill = ref(false);

const pauseAnimationSkill = () => {
  isPausedSkill.value = true;
};

const resumeAnimationSkill = () => {
  isPausedSkill.value = false;
};

const texts = ["Full Stack Developer", "Gamers",];
const displayedText = ref<string>("");
let index = 0;
let charIndex = 0;
let isDeleting = false;
let typingInterval: number | undefined;

const type = () => {
  const currentText = texts[index];
  if (isDeleting) {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }
  } else {
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
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

<template>
  <main>
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div class="text-center animate-fade-in">
        <h1 class="text-5xl font-bold mb-6 dark:text-white">Ahmad Aril Samsi</h1>
        <div class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-8">
          <span>{{ displayedText }}</span>
        </div>
        <a href="https://wa.me/6282393426013" class="bg-[#128c7e] text-white px-8 py-3 rounded-full hover:bg-[#25d366] transition-colors duration-300">
          <font-awesome-icon :icon="['fab', 'whatsapp']" />
          WhatsApp
        </a>
        <!-- <div class="mt-6 space-x-4">
          <a href="https://github.com/arilsamsi/" class="text-gray-400 hover:text-gray-500">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100076206191055" class="text-gray-400 hover:text-blue-600">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.tiktok.com/@deyissmyluvvv?is_from_webapp=1&sender_device=pc" class="text-gray-400 hover:text-black">
            <i class="fab fa-tiktok"></i>
          </a>
          <a href="https://www.instagram.com/arilsamsi/?igsh=aHB5dXY1NTN6N2Q4" class="text-gray-400 hover:text-pink-600">
            <i class="fab fa-instagram"></i>
          </a>
        </div> -->
        <div class="social-links">
          <div class="overflow-hidden relative w-full h-10 mt-5">
            <div
              class="links flex space-x-4 absolute w-auto animate-scroll"
              :class="{ 'paused': isPaused }"
              @mouseenter="pauseAnimation"
              @mouseleave="resumeAnimation"
              >
              <a
                v-for="(link, index) in [ ...links, ...links, ...links]"
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

    <!-- About Section -->
    <section id="about" class="section-container flex flex-col md:flex-row items-center justify-between py-12">
      <!-- Profil Image -->
      <div class="w-full md:w-1/3 flex justify-center mb-8 md:mb-0">
        <img src="../assets/profile/ande.png" alt="Aril Samsi" class="object-cover border-2 border-gray-300 dark:border-gray-700" width="300px" height="300px">
      </div>
    
      <!-- About Me Section -->
      <div class="w-full md:w-2/3 px-4 md:px-8">
        <h2 class="section-title text-3xl font-bold text-gray-800 dark:text-white mb-4">About Me</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Hai, nama saya Aril Samsi. Saya sekolah di SMKN 1 Limboto, dan mengambil jurusan PPLG (Pengembangan perangkat lunak & GIM).
          Alasan saya masuk ke SMKN 1 Limboto adalah saya sangat ingin sekali belajar CODING.
          Hobi saya hanya nonton Anime dan bermain game, dan saya juga suka dengan Sepak bola.
        </p>
      
        <!-- Skills Section -->
         <!-- <h2 class="section-title text-3xl font-bold text-gray-800 dark:text-white">Skills</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
            <div v-for="skill in skills" :key="skill.name" class="card p-4 bg-gray-100 dark:bg-gray-800 text-center rounded-lg shadow-lg flex flex-col items-center hover:scale-110">
              <img :src="skill.icon" :alt="skill.name" class="w-15 h-12 mb-2">
              <div v-html="skill.icon"></div>
              <p class="text-sm font-semibold text-gray-800 dark:text-white">{{ skill.name }}</p>
            </div>
          </div> -->
          <h2 class="section-title text-3xl font-bold text-gray-800 dark:text-white skill">Skills</h2>
          <div class="skills-container overflow-hidden relative">
            <div
              class="skills-track flex space-x-6 absolute w-max animate-scroll"
              @mouseenter="pauseAnimationSkill"
              @mouseleave="resumeAnimationSkill"
              :class="{ 'pausedSkill': isPausedSkill }"
              >
              <div
                v-for="(skill, index) in [...skills, ...skills, ...skills]"
                :key="index"
                :class="skill.class"
                class="card p-4 bg-gray-100 dark:bg-gray-800 text-center rounded-lg shadow-lg flex flex-col items-center hover:scale-110 cursor-pointer"
                >
                  <img :src="skill.icon" :alt="skill.name" class="w-15 h-12 mb-2" />
                  <p class="text-sm font-semibold text-gray-800 dark:text-white">{{ skill.name }}</p>
              </div> 
            </div>
          </div>
          <PopUp />
      </div>
    </section>


    <!-- Projects Section -->
    <section id="projects" class="section-container bg-gray-50 dark:bg-gray-800">
      <h2 class="section-title">My Projects</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in projects"
          :key="project.title"
          v-bind="project"
        />
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section-container">
      <h2 class="section-title">Contact Me</h2>
      <ContactForm />
    </section>
  </main>
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
  .social-links{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .relative{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
  }
  .links{
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
.skill{
  margin-bottom: 7px;
}
</style>