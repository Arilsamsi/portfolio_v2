<script lang="ts">
import { ref } from 'vue';
// import { onMounted, onUnmounted } from "vue";
import PopUp from '../components/PopUp.vue';
// import Header from '../components/layout/Header.vue';
// import Footer from '../components/layout/Footer.vue';

export default {
    name: 'About',
    components: {
        PopUp,
        // Header,
        // Footer,
    },
    data() {
        const isPausedSkill = ref(false);

        const pauseAnimationSkill = () => {
            isPausedSkill.value = true;
        };

        const resumeAnimationSkill = () => {
            isPausedSkill.value = false;
        };

        const skills = ref([
            { name: 'HTML', icon: '/skils/html.png', class: 'hover:bg-html-gradient' },
            { name: 'CSS', icon: '/skils/css.png', class: 'hover:bg-css-gradient' },
            { name: 'JavaScript', icon: '/skils/js.png', class: 'hover:bg-js-gradient' },
            { name: 'PHP', icon: '/skils/php.png', class: 'hover:bg-php-gradient' },
            { name: 'Laravel', icon: '/skils/laravel.png', class: 'hover:bg-laravel-gradient' },
            { name: 'Vue JS', icon: '/skils/vuejs.png', class: 'hover:bg-vue-gradient' },
            { name: 'Python', icon: '/skils/python.png', class: 'hover:bg-python-gradient' },
            { name: 'My SQL', icon: '/skils/mysql.png', class: 'hover:bg-mysql-gradient' },
        ]);

        return {
            isPausedSkill,
            pauseAnimationSkill,
            resumeAnimationSkill,
            skills,
        }
    }
} 




</script>

<template>
    <!-- <Header /> -->
    <!-- About Section -->
    <section class="section-container flex flex-col mt-[30px] md:flex-row min-h-screen items-center justify-between py-12 md:mt-0">
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
          <h2 class="section-title text-3xl font-bold text-gray-800 dark:text-white skill">Skills</h2>
          <div class="skills-container overflow-hidden relative">
            <div
              class="skills-track flex space-x-6 absolute w-max animate-scroll"
              :class="{ 'pausedSkill': isPausedSkill }"
              @mouseenter="pauseAnimationSkill"
              @mouseleave="resumeAnimationSkill"
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
    <!-- <Footer /> -->
</template>

<style scoped>
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