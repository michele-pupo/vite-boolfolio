<script>
export default {
  name: 'AppFooter',
}
</script>

<template>
  <footer class="top-footer pt-3">
    <div class="container">
      <div class="d-flex justify-content-center justify-content-md-between align-items-center">
        <div class="links">
          <ul class="d-flex gap-4">
            <li>
              <a id="git-hub" href="https://github.com/michele-pupo" target="_blank">
                <img src="/public/github-logo.png" alt="GitHub" class="social-icon">
              </a>
            </li>
            <li>
              <a id="linkedin" href="https://www.linkedin.com/in/michele-fabio-pupo-727738308/" target="_blank">
                <img src="/public/25-removebg-preview.png" alt="Linkedin" class="social-icon">
              </a>
            </li>
            <li>
              <a id="contact-me" href="https://wa.me/3899928860" target="_blank">
                <img src="/pngtree-whatsapp-icon-png-image_3584845.png" alt="WhatsApp" class="social-icon">
              </a>
            </li>
          </ul>
        </div>
        <!-- Aggiungi eventualmente un testo o una piccola descrizione qui -->
        <div class="footer-text text-center text-md-end">
          <p class="text-white mb-0">© 2025 MFP</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.top-footer {
  width: 100%;
  height: 120px;
  position: fixed;
  bottom: 0;
  background-color: #03346E;
  z-index: 10;
  padding: 20px 0;
}

.social-icon {
  width: 80px;
  height: 80px;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.3);
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-right: 15px;
}

.footer-text {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .top-footer {
    padding: 15px 0;
  }

  .social-icon {
    width: 60px;
    height: 60px;
  }
}
</style>