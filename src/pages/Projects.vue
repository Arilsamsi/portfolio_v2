<script>
import { ref } from "vue";
import ProjectCard from "../components/ProjectCard.vue";

export default {
  name: "Projects",
  components: {
    ProjectCard,
  },
  setup() {
    const projects = ref([
      {
        title: "Portofolio",
        description: "My first Portfolio",
        image: "/projects/projects_1.png",
        tags: ["HTML", "CSS", "Javascript"],
        link: "https://arilsamsi.vercel.app/",
        repo: "https://github.com/Arilsamsi/proyek",
      },
      {
        title: "Website Kelas",
        description: "First Projects In class X",
        image: "/projects/projects_2.png",
        tags: ["HTML", "CSS", "Javascript"],
        link: "https://rplsmklimboto.vercel.app/",
        repo: "https://github.com/Arilsamsi/proyek",
      },
      {
        title: "QR Code Generator",
        description: "A website make QRCODE",
        image: "/projects/projects_3.png",
        tags: ["HTML", "CSS", "Javascript"],
        link: "https://pembuat-qr.vercel.app/",
        repo: "https://github.com/Arilsamsi/proyek",
      },
      {
        title: "Todo List",
        description: "Website todo list",
        image: "/projects/projects_4.png",
        tags: ["Vue JS"],
        link: "https://daftartugas.vercel.app/",
        repo: "https://github.com/Arilsamsi/todo-list",
      },
      {
        title: "Maniac Movie",
        description: "Website search movie",
        image: "/projects/projects_5.png",
        tags: ["Vue JS"],
        link: "https://maniacmovie.vercel.app/",
        repo: "https://github.com/Arilsamsi/movie-maniac_v2",
      },
      {
        title: "AnimeStrim",
        description: "AnimeStrim, website nonton Anime sub indo",
        image: "/projects/projects_6.png",
        tags: ["React JS", "Tailwind Css"],
        link: "https://animestrim.vercel.app/",
        repo: "https://github.com/Arilsamsi/web-anime_v2",
      },
    ]);

    return {
      projects,
    };
  },
};
</script>

<template>
  <section
    class="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 px-5 md:px-10"
  >
    <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-10">
      My Projects
    </h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-7xl"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.title"
        v-bind="project"
      />
    </div>
  </section>
</template>

<style scoped>
section {
  padding-bottom: 50px;
}
</style>
