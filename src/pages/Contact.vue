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
    <section id="contact" class="section-container min-h-screen mb-1 mt-[10px] md:mt-[10px] mb-1">
      <h2 class="section-title">Contact Me</h2>
      <ContactForm />
    </section>
    <!-- <Footer /> -->
</template>

<style scoped>

</style>