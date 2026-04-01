<template>
  <section class="contact">
    <h2>Contact Us</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="contact.name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="contact.email" required />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" v-model="contact.message" required></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.contact)
    },
  },
}
</script>
