<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__column">
        <h3 class="footer__title">Exclusive</h3>
        <p class="footer__subtitle">Subscribe</p>
        <p class="footer__text">Get 10% off your first order</p>

        <div class="footer__input-box">
          <input type="email" placeholder="Enter your email" class="footer__input" />
          <img src="@/assets/images/icon-send.svg" class="footer__input-btn" alt="Send email" />
        </div>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Support</h3>
        <p class="footer__text">
          111 Bijoy sarani, Dhaka,<br />
          DH 1515, Bangladesh.
        </p>
        <p class="footer__text">exclusive@gmail.com</p>
        <p class="footer__text">+88015-88888-9999</p>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Account</h3>
        <ul class="footer__list">
          <li><a href="#" class="footer__link">My Account</a></li>
          <li><a href="#" class="footer__link">Login / Register</a></li>
          <li><a href="#" class="footer__link">Cart</a></li>
          <li><a href="#" class="footer__link">Wishlist</a></li>
          <li><a href="#" class="footer__link">Shop</a></li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Quick Link</h3>
        <ul class="footer__list">
          <li><a href="#" class="footer__link">Privacy Policy</a></li>
          <li><a href="#" class="footer__link">Terms Of Use</a></li>
          <li><a href="#" class="footer__link">FAQ</a></li>
          <li><a href="#" class="footer__link">Contact</a></li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Download App</h3>
        <p class="footer__small">Save $3 with App New User Only</p>

        <div class="footer__app">
          <img src="@/assets/images/Qr Code.svg" class="footer__qr" alt="QR code to download app" />

          <div class="footer__stores">
            <img
              src="@/assets/images/AppStore.svg"
              class="footer__store-img"
              alt="Download on the App Store"
            />
            <img
              src="@/assets/images/googlePlay.svg"
              class="footer__store-img"
              alt="Get it on Google Play"
            />
          </div>
        </div>

        <div class="footer__socials">
          <a href="#" class="footer__social-link" aria-label="Facebook">
            <i class="footer__icon fab fa-facebook-f" aria-hidden="true"></i>
          </a>
          <a href="#" class="footer__social-link" aria-label="Twitter">
            <i class="footer__icon fab fa-twitter" aria-hidden="true"></i>
          </a>
          <a href="#" class="footer__social-link" aria-label="Instagram">
            <i class="footer__icon fab fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="#" class="footer__social-link" aria-label="LinkedIn">
            <i class="footer__icon fab fa-linkedin-in" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">© Copyright Rimel 2022. All right reserved</div>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'FooterSection',
}
</script>

<style scoped>
.footer {
  background: #000;
  color: #fff;
  padding: 60px 0 20px;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.footer__column {
  flex: 1 1 180px;
  min-width: 160px;
}

.footer__title {
  font-size: 18px;
  margin-bottom: 16px;
}

.footer__subtitle {
  font-weight: 600;
  margin-bottom: 8px;
}

.footer__text {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 8px;
  line-height: 1.5;
}

.footer__small {
  font-size: 12px;
  color: #aaa;
  margin-bottom: 10px;
}

.footer__list {
  list-style: none;
  padding: 0;
}

.footer__link {
  display: block;
  color: #ccc;
  font-size: 14px;
  margin-bottom: 8px;
  text-decoration: none;
}

.footer__link:hover {
  color: #fff;
}

.footer__input-box {
  display: flex;
  align-items: center;
  border: 1px solid #555;
  padding: 6px 10px;
  margin-top: 10px;
  max-width: 220px;
}

.footer__input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  min-width: 24px;
}

.footer__input::placeholder {
  color: #888;
}

.footer__input-btn {
  width: 18px;
  cursor: pointer;
}

.footer__app {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.footer__qr {
  width: 80px;
}

.footer__stores {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer__store-img {
  width: 110px;
}

.footer__socials {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer__social-link {
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.footer__social-link:hover {
  color: #ddd;
}

.footer__icon {
  margin-right: 0;
  cursor: pointer;
}

.footer__bottom {
  border-top: 1px solid #222;
  margin-top: 40px;
  padding-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #777;
}

@media (max-width: 1024px) {
  .footer__column {
    flex: 1 1 30%;
  }
}

@media (max-width: 768px) {
  .footer__column {
    flex: 1 1 45%;
  }
}

@media (max-width: 480px) {
  .footer__column {
    flex: 1 1 100%;
  }

  .footer {
    padding: 40px 0 20px;
  }
}
</style>
