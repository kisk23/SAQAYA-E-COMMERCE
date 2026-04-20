<template>
  <div class="contact-info" data-test="contact-info">
    <div class="contact-info__block" data-test="call-block">
      <div class="contact-info__header">
        <div class="contact-info__icon">
          <img src="@/assets/icons/phone.svg" alt="Phone" />
        </div>

        <h4 class="contact-info__title" data-test="call-title">Call us</h4>
      </div>

      <div class="contact-info__content">
        <p class="contact-info__text" data-test="call-description">
          We are available 24/7, 7 days a week.
        </p>
        <p class="contact-info__text" data-test="call-phone">Phone: +8801611112222</p>
      </div>
    </div>

    <hr class="contact-info__divider" data-test="divider" />

    <div class="contact-info__block" data-test="email-block">
      <div class="contact-info__header">
        <div class="contact-info__icon">
          <img src="@/assets/icons/envelope.svg" alt="Email" />
        </div>

        <h4 class="contact-info__title" data-test="email-title">Write To US</h4>
      </div>

      <div class="contact-info__content">
        <p class="contact-info__text" data-test="email-description">
          Fill out our form and we will contact you within 24 hours.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.contact-info {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 24px;
}

.contact-info__block {
  display: flex;
  flex-direction: column;
}

.contact-info__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.contact-info__icon {
  width: 40px;
  height: 40px;
  background: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-info__icon img {
  width: 18px;
  height: 18px;
}

.contact-info__title {
  font-size: 14px;
  font-weight: 600;
}

.contact-info__content {
  padding-left: 52px;
}

.contact-info__text {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

.contact-info__divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #eee;
}
</style>
