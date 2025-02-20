<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-center dark:text-white"
  >
    <h1
      class="text-9xl font-bold bg-gradient-to-r from-blue-500 via-black to-red-500 text-transparent bg-clip-text drop-shadow-lg"
    >
      404
    </h1>
    <p class="text-2xl mt-4">Oops! Halaman tidak ditemukan</p>
    <router-link
      to="/"
      class="mt-5 px-6 py-2 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
    >
      Kembali
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
