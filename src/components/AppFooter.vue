<script>
export default {
  name: 'AppFooter',
}
</script>

<template>
  <footer class="top-footer">
    <div class="container">
      <div class="footer-content">
        <div class="social-links">
          <ul class="social-list">
            <li>
              <a href="https://github.com/michele-pupo" target="_blank" aria-label="GitHub">
                <img src="/public/github-logo.png" alt="GitHub" class="social-icon">
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/michele-fabio-pupo-727738308/" target="_blank" aria-label="LinkedIn">
                <img src="/public/25-removebg-preview.png" alt="LinkedIn" class="social-icon">
              </a>
            </li>
            <li>
              <a href="https://wa.me/3899928860" target="_blank" aria-label="WhatsApp">
                <img src="/pngtree-whatsapp-icon-png-image_3584845.png" alt="WhatsApp" class="social-icon">
              </a>
            </li>
          </ul>
        </div>
        <div class="copyright">
          <p>© 2025 Michele Fabio Pupo | Web Developer</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.top-footer {
  width: 100%;
  height: auto;
  padding: 1.5rem 0;
  position: fixed;
  bottom: 0;
  background-color: #03346E;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Aumentato per assicurarsi che sia in primo piano */
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.social-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 1.5rem;
}

.social-icon {
  width: 42px;
  height: 42px;
  transition: all 0.3s ease;
  filter: brightness(0.95);
  
  &:hover {
    transform: translateY(-5px);
    filter: brightness(1.1);
  }
}

.copyright {
  color: white;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  font-weight: 300;
  text-align: right;
}

@media (max-width: 768px) {
  .top-footer {
    padding: 1rem 0; /* Ridotto il padding per dispositivi mobili */
  }
  
  .footer-content {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }
  
  .copyright {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.8rem; /* Testo leggermente più piccolo */
  }
  
  .social-list {
    justify-content: center;
    gap: 1.2rem; /* Spazio ridotto tra le icone */
  }
  
  .social-icon {
    width: 36px; /* Icone leggermente più piccole su mobile */
    height: 36px;
  }
}
</style>