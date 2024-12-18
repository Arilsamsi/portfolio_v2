<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  submitSuccess.value = true
  isSubmitting.value = false
  form.value = { name: '', email: '', message: '' }
  setTimeout(() => {
    submitSuccess.value = false
  }, 3000)
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium mb-2">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary"
        >
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium mb-2">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary"
        >
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium mb-2">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="4"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors duration-300 disabled:opacity-50"
      >
        <span v-if="isSubmitting">Sending...</span>
        <span v-else>Send Message</span>
      </button>

      <div
        v-if="submitSuccess"
        class="text-green-600 text-center animate-fade-in"
      >
        Message sent successfully!
      </div>
    </form>
  </div>
</template>