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

<style scoped>
.contact {
  max-width: 1200px;
  margin: auto;
  margin-block: 40px;
}

.contact__container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin: 20px 0px;
}

.contact__image {
  flex: 0 0 400px;
}

.contact__right {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 564px;
}

.contact-info {
  background: #fff;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 24px;
}

.contact-form {
  background: #fff;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 24px;
}
.contact__breadcrumbs {
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>
