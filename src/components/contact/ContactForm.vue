<template>
  <div class="contact-form">
    <form @submit.prevent="submitForm">
      <div class="contact-form__row">
        <input type="text" placeholder="Your Name *" class="contact-form__input" />
        <input type="email" placeholder="Your Email *" class="contact-form__input" />
      </div>

      <textarea placeholder="Your Message" class="contact-form__textarea"></textarea>

      <div class="contact-form__actions">
        <button class="contact-form__button" type="submit">Send Message</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ContactForm',
  methods: {
    submitForm() {
      alert('Form submitted!')
    },
  },
})
</script>

<style scoped>
.contact-form {
  background: #fff;
  padding: 20px;
}

.contact-form__row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.contact-form__input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 3px;
  background-color: #f5f5f5;
}

.contact-form__textarea {
  width: 100%;
  height: 120px;
  padding: 10px;
  border: none;
  border-radius: 3px;

  margin-bottom: 10px;
  background-color: #f5f5f5;
}

.contact-form__button {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
}
.contact-form__actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .contact-form__row {
    flex-direction: column;
  }
}
</style>
