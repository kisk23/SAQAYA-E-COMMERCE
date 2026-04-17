<template>
  <div class="contact-form">
    <form @submit.prevent="submitForm">
      <div class="contact-form__row">
        <div class="contact-form__field">
          <input
            v-model="form.name"
            type="text"
            placeholder="Your Name *"
            class="contact-form__input"
            data-test="name-input"
          />
          <span v-if="errors.name" class="contact-form__error" data-test="name-error">
            {{ errors.name }}
          </span>
        </div>

        <div class="contact-form__field">
          <input
            v-model="form.email"
            type="email"
            placeholder="Your Email *"
            class="contact-form__input"
            data-test="email-input"
          />
          <span v-if="errors.email" class="contact-form__error" data-test="email-error">
            {{ errors.email }}
          </span>
        </div>
      </div>

      <div class="contact-form__field">
        <textarea
          v-model="form.message"
          placeholder="Your Message *"
          class="contact-form__textarea"
          data-test="message-input"
        ></textarea>
        <span v-if="errors.message" class="contact-form__error" data-test="message-error">
          {{ errors.message }}
        </span>
      </div>

      <div class="contact-form__actions">
        <button class="contact-form__button" type="submit" data-test="submit-button">
          Send Message
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { validateContactForm } from '@/services/validation.service'
import type { ValidationErrors } from '@/types/validation'

export default Vue.extend({
  name: 'ContactForm',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      errors: {} as ValidationErrors,
    }
  },
  methods: {
    submitForm() {
      const { isValid, errors } = validateContactForm(this.form)

      this.errors = errors

      if (!isValid) return

      alert('Form submitted!')

      this.form = {
        name: '',
        email: '',
        message: '',
      }
      this.errors = {}
    },
  },
})
</script>

<style lang="scss" scoped>
.contact-form {
  background: #fff;
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

.contact-form__field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.contact-form__error {
  color: red;
  font-size: 11px;
  margin-top: 4px;
}
@media (max-width: 768px) {
  .contact-form__row {
    flex-direction: column;
  }
}
</style>
