<script lang="ts">
import { defineComponent, ref } from "vue";
// import ThemeSwitcher from "../ThemeSwitcher.vue";

export default defineComponent({
  name: "Popup",

  setup() {
    // State untuk mengatur visibilitas popup
    const isPopupVisible = ref(false);

    const togglePopup = () => {
      isPopupVisible.value = !isPopupVisible.value;
    };

    const closePopup = () => {
      isPopupVisible.value = false;
    };

    const skills = ref([
      {
        name: "HTML",
        icon: "/skils/html.png",
        class: "hover:bg-html-gradient",
      },
      { name: "CSS", icon: "/skils/css.png", class: "hover:bg-css-gradient" },
      {
        name: "JavaScript",
        icon: "/skils/js.png",
        class: "hover:bg-js-gradient",
      },
      { name: "PHP", icon: "/skils/php.png", class: "hover:bg-php-gradient" },
      {
        name: "Laravel",
        icon: "/skils/laravel.png",
        class: "hover:bg-laravel-gradient",
      },
      {
        name: "Vue JS",
        icon: "/skils/vuejs.png",
        class: "hover:bg-vue-gradient",
      },
      // { name: 'Python', icon: '/skils/python.png', class: 'hover:bg-python-gradient' },
      // {
      //   name: "My SQL",
      //   icon: "/skils/mysql.png",
      //   class: "hover:bg-mysql-gradient",
      // },
      // {
      //   name: "React JS",
      //   icon: "/skils/react.png",
      //   class: "hover:bg-react-gradient",
      // },
    ]);

    return {
      isPopupVisible,
      togglePopup,
      closePopup,
      skills,
    };
  },
});
</script>

<template>
  <div>
    <!-- Tombol untuk membuka popup -->
    <button
      @click="togglePopup"
      class="bg-blue-600 content-center justify-center flex-1 text-white px-4 py-2 rounded hover:bg-blue-800"
    >
      Show All
    </button>

    <!-- Overlay -->
    <div
      v-if="isPopupVisible"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="closePopup"
    ></div>

    <!-- Popup -->
    <div
      v-if="isPopupVisible"
      class="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 dark:bg-gray-800 dark:text-white"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-xl text-black font-bold dark:text-white">My Skills</h2>
        <button
          @click="closePopup"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          <i class="fa-solid fa-x"></i>
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
        <div
          v-for="skill in skills"
          :key="skill.name"
          :class="skill.class"
          class="card p-4 bg-gray-100 text-center rounded-lg shadow-lg flex flex-col items-center hover:scale-105 cursor-pointer"
        >
          <img :src="skill.icon" :alt="skill.name" class="w-15 h-12 mb-2" />
          <!-- <div v-html="skill.icon"></div> -->
          <p class="text-sm font-semibold text-gray-800 dark:text-white">
            {{ skill.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tidak perlu CSS tambahan karena menggunakan Tailwind */
</style>
