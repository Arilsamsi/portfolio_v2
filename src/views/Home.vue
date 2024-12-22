<script setup lang="ts">
import { ref } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import ContactForm from '../components/ContactForm.vue'

const projects = ref([
  {
    title: 'Project 1',
    description: 'My first Portfolio',
    image: '/projects/projects_1.png',
    tags: ['HTML', 'CSS', 'Javascript'],
    link: 'https://arilsamsi.vercel.app/'
  },
  {
    title: 'Project 2',
    description: 'First Projects In class X',
    image: '/projects/projects_2.png',
    tags: ['HTML', 'CSS', 'Javascript'],
    link: 'https://rplsmklimboto.vercel.app/'
  },
  {
    title: 'Project 3',
    description: 'A website make QRCODE',
    image: '/projects/projects_3.png',
    tags: ['HTML', 'CSS', 'Javascript'],
    link: 'https://pembuat-qr.vercel.app/'
  },
  {
    title: 'Project 4',
    description: 'Website todo list',
    image: '/projects/projects_4.png',
    tags: ['Vue JS'],
    link: 'https://daftartugas.vercel.app/'
  },
  {
    title: 'Project 5',
    description: 'Wesbite movie',
    image: '/projects/projects_5.png',
    tags: ['Vue JS'],
    link: 'https://maniacmovie.vercel.app/'
  }
])

const skills = ref([
  { name: 'HTML', icon: '/skils/html.png' },
  { name: 'CSS', icon: '/skils/css.png' },
  { name: 'JavaScript', icon: '/skils/js.png' },
  { name: 'PHP', icon: '/skils/php.png' },
  { name: 'Laravel', icon: '/skils/laravel.png' },
  { name: 'Vue JS', icon: '/skils/vuejs.png' },
  { name: 'Python', icon: '/skils/python.png' },
  { name: 'My SQL', icon: '/skils/mysql.png' },
])
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div class="text-center animate-fade-in">
        <h1 class="text-5xl font-bold mb-6 ml-10">Ahmad Aril Samsi</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">Full Stack Developer</p>
        <a href="#contact" class="bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition-colors duration-300">
          Contact Me
        </a>
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
         <h2 class="section-title text-3xl font-bold text-gray-800 dark:text-white">Skills</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
          <div v-for="skill in skills" :key="skill.name" class="card p-4 bg-gray-100 dark:bg-gray-800 text-center rounded-lg shadow-lg flex flex-col items-center">
            <img :src="skill.icon" :alt="skill.name" class="w-15 h-12 mb-2">
            <!-- <div v-html="skill.icon"></div> -->
            <p class="text-sm font-semibold text-gray-800 dark:text-white">{{ skill.name }}</p>
          </div>
        </div>
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
