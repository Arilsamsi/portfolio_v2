<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default defineComponent({
  name: 'GoogleForm',
  setup() {
    // Data form
    const formData = reactive({
      name: '',
      email: '',
      message: '',
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzJDT95PG2UD_u2mNZifQbh-ZSXcQtUtS1Z6UImE812mmoA_6UIcx9qvyvsuOfs4w_n4w/exec'; 

    const submitForm = async () => {
      try {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('message', formData.message);

        const response = await fetch(scriptURL, {
          method: 'POST',
          body: form,
        });

        if (response.ok) {
          console.log('Success!', await response.text());
          Swal.fire({
            title: 'Success!',
            text: 'Form submitted successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          // Reset form data after success
          formData.name = '';
          formData.email = '';
          formData.message = '';
        } else {
          console.error('Error!', response.statusText);
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue submitting the form. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error: any) {
        console.error('Error!', error.message);
        Swal.fire({
          title: 'Error!',
          text: 'An unexpected error occurred. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        submitForm();
      }
    };

    return {
      formData,
      submitForm,
    };
  },
});
</script>



<template>
  <div class="max-w-2xl mx-auto">
    <form @keydown.enter.prevent="submitForm" name="submit-to-google-sheet" @submit.prevent="submitForm" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium mb-2">Name</label>
        <input
          v-model="formData.name"
          id="name"
          type="text"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary"
        >
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium mb-2">Email</label>
        <input
          v-model="formData.email"
          id="email"
          type="email"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary"
        >
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium mb-2">Message</label>
        <textarea
          v-model="formData.message"
          id="message"
          required
          rows="4"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      <button
        @click="submitForm"
        type="submit"
        class="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors duration-300 disabled:opacity-50"
      >
        <span>Send Message</span>
      </button>

      <!-- <div
        class="text-green-600 text-center animate-fade-in"
      >
        Message sent successfully!
      </div> -->
    </form>
  </div>
</template>