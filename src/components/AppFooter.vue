<script>
export default {
  name: 'AppFooter',
}
</script>

<template>
  <footer class="app-footer">

    <div class="footer-glow"></div>

    <div class="footer-container">

      <div class="footer-top">

        <h2>Ready to work together?</h2>

        <p>
          Have a project in mind? Let's build something amazing.
        </p>

        <router-link
          :to="{ name: 'contact-me' }"
          class="footer-cta"
        >
          Contact Me
        </router-link>

      </div>

      <div class="footer-socials">

        <a
          href="https://github.com/michele-pupo"
          target="_blank"
          aria-label="Github"
        >
          <i class="fab fa-github"></i>
        </a>

        <a
          href="https://www.linkedin.com/in/michele-fabio-pupo-727738308/"
          target="_blank"
          aria-label="Linkedin"
        >
          <i class="fab fa-linkedin-in"></i>
        </a>

        <router-link
          :to="{ name: 'contact-me' }"
          aria-label="Email"
        >
          <i class="fas fa-envelope"></i>
        </router-link>

        <a
          href="https://wa.me/3899928860"
          target="_blank"
          aria-label="Whatsapp"
        >
          <i class="fab fa-whatsapp"></i>
        </a>

      </div>

      <div class="footer-bottom">

        <span>
          © 2026 Michele Fabio Pupo
        </span>

        <span>
          Full Stack Developer
        </span>

      </div>

    </div>

  </footer>
</template>

<style lang="scss">

.app-footer {

  position: relative;

  width: 100%;

  background: #070B14;

  border-top: 1px solid rgba(255,255,255,.08);

  overflow: hidden;

  margin-top: 0;
}

.footer-glow {

  position: absolute;

  top: -100px;
  left: 50%;

  transform: translateX(-50%);

  width: 600px;
  height: 200px;

  background: radial-gradient(
    circle,
    rgba(139,92,246,.35),
    rgba(37,99,235,.15),
    transparent
  );

  filter: blur(80px);

  pointer-events: none;
}

.footer-container {

  position: relative;

  z-index: 2;

  max-width: 1200px;

  margin: auto;

  padding: 4rem 2rem;
}

.footer-top {

  text-align: center;

  margin-bottom: 3rem;
}

.footer-top h2 {

  color: white;

  font-size: 2rem;

  font-weight: 700;

  margin-bottom: 1rem;
}

.footer-top p {

  max-width: 650px;

  margin: auto;

  color: #94A3B8;

  line-height: 1.8;
}

.footer-cta {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  margin-top: 1.5rem;

  padding: 1rem 2rem;

  border-radius: 14px;

  text-decoration: none;

  font-weight: 600;

  color: white;

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );

  transition: .35s ease;

  box-shadow:
    0 10px 30px rgba(99,102,241,.25);
}

.footer-cta:hover {

  transform:
    translateY(-4px);

  box-shadow:
    0 15px 40px rgba(99,102,241,.35);
}

.footer-socials {

  display: flex;

  justify-content: center;

  gap: 1.5rem;

  margin-bottom: 3rem;
}

.footer-socials a {

  width: 58px;
  height: 58px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  text-decoration: none;

  color: white;

  font-size: 1.3rem;

  background: rgba(255,255,255,.04);

  border: 1px solid rgba(255,255,255,.08);

  backdrop-filter: blur(12px);

  transition: .35s ease;
}

.footer-socials a:hover {

  transform:
    translateY(-6px)
    scale(1.08);

  background: linear-gradient(
    135deg,
    #8B5CF6,
    #2563EB
  );

  box-shadow:
    0 10px 25px rgba(99,102,241,.35);
}

.footer-bottom {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding-top: 2rem;

  border-top: 1px solid rgba(255,255,255,.08);

  color: #64748B;

  font-size: .9rem;
}

@media (max-width: 768px) {

  .footer-container {
    padding: 3rem 1.2rem;
  }

  .footer-top h2 {
    font-size: 1.6rem;
  }

  .footer-socials {

    gap: 1rem;

    flex-wrap: wrap;
  }

  .footer-socials a {

    width: 50px;
    height: 50px;

    font-size: 1.1rem;
  }

  .footer-bottom {

    flex-direction: column;

    gap: .8rem;

    text-align: center;
  }
}

</style>