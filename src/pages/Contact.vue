<script lang="ts">
import ContactForm from '../components/ContactForm.vue';
// import Footer from '../components/layout/Footer.vue';
// import Header from '../components/layout/Header.vue';

export default {
    name: 'Contact',
    components: {
        ContactForm,
        // Header,
        // Footer,
    }
}
</script>

<template>
    <!-- <Header /> -->
     <!-- Contact Section -->
    <section id="contact" class="section-container mt-[70px] md:h-full mt-[10px]">
      <h2 class="section-title">Contact Me</h2>
      <ContactForm />
    </section>
    <!-- <Footer /> -->
</template>

<style scoped>

</style>