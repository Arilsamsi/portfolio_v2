<script lang="ts">
import { ref } from 'vue';
import ProjectCard from '../components/ProjectCard.vue';
// import Header from '../components/layout/Header.vue';
// import Footer from '../components/layout/Footer.vue';


export default {
    name: 'Projects',
    components: {
        ProjectCard,
        // Header,
        // Footer,
    },
    data() {
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
        ]);

        return {
            projects,
        }
    }
    
}
</script>

<template>
    <!-- <Header /> -->
    <!-- Projects Section -->
    <section class="flex items-center justify-center flex-col bg-gray-50 dark:bg-gray-800 min-w-screen mt-[70px] md:mt-[89px] mb-5">
        <h2 class="section-title mb-0">My Projects</h2>
        <div class="grid md:grid-cols-3 col-gap-20 lg:grid-cols-4 col-gap-y-1 xl:grid-cols-5 gap-5">
            <ProjectCard
                v-for="project in projects"
                :key="project.title"
                v-bind="project"
            />
        </div>
    </section>
    <!-- <Footer /> -->
</template>

<style scoped>
    .section-container{
        width: 100%;
    }
</style>