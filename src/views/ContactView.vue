<template>
  <div class="contact">
    <div class="contact__breadcrumbs">
      <Breadcrumbs :items="breadcrumbs" />
    </div>

    <div class="contact__container">
      <div class="contact__image">
        <img src="@/assets/images/Contact.png" alt="contact" />
      </div>

      <div class="contact__right">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Breadcrumbs from '@/components/shared/BreadCrumbs.vue'
import ContactInfo from '@/components/contact/ContactInfo.vue'
import ContactForm from '@/components/contact/ContactForm.vue'

export default Vue.extend({
  name: 'ContactView',
  components: { Breadcrumbs, ContactInfo, ContactForm },

  data() {
    return {
      breadcrumbs: [{ label: 'Home', link: '/' }, { label: 'Contact' }],
    }
  },
})
</script>
<style lang="scss" scoped>
.contact {
  max-width: 1200px;
  margin: auto;
  margin-block: 40px;
  padding: 0 16px;
}

.contact__container {
  display: flex;
  gap: 24px;
}

.contact__image {
  flex: 1.2;
}

.contact__image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.contact__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact__breadcrumbs {
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .contact__image {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .contact {
    margin-block: 20px;
  }

  .contact__container {
    flex-direction: column;
    gap: 16px;
  }

  .contact__right {
    gap: 16px;
  }
}
</style>
