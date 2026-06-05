<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <header class="app-header">
    <div class="header-container">

      <!-- Logo -->
      <router-link to="/" class="logo">
        <div class="logo-dot"></div>
        <div class="logo-text">
          <span class="name">Michele Fabio Pupo</span>
        </div>
      </router-link>

      <!-- Menu -->
      <nav class="nav-menu">
        <router-link
          to="/"
          class="nav-link"
          :class="{ active: $route.name === 'home' }"
        >
          Home
        </router-link>

        <router-link
          :to="{ name: 'project' }"
          class="nav-link"
          :class="{ active: $route.name === 'project' }"
        >
          Projects
        </router-link>
      </nav>

      <!-- CTA -->
      <a
        href="mailto:fabiomichelepupo@gmail.com"
        class="contact-btn"
      >
        Let's Talk
      </a>

    </div>
  </header>
</template>

<style lang="scss">

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 85px;
  z-index: 9999;

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  background: rgba(7, 11, 20, 0.75);

  border-bottom: 1px solid rgba(255,255,255,0.08);

  box-shadow:
    0 10px 40px rgba(0,0,0,0.35);
}

.header-container {
  max-width: 1400px;
  margin: auto;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 2rem;
}

/* =====================================
   LOGO
===================================== */

.logo {
  display: flex;
  align-items: center;
  gap: 14px;

  text-decoration: none;
}

.logo-dot {
  width: 14px;
  height: 14px;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #8b5cf6,
    #2563eb
  );

  box-shadow:
    0 0 25px rgba(139,92,246,.8);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.name {
  color: white;

  font-size: 1rem;
  font-weight: 700;

  letter-spacing: .5px;
}

/* =====================================
   MENU
===================================== */

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  position: relative;

  text-decoration: none;

  color: #CBD5E1;

  font-size: .95rem;
  font-weight: 500;

  transition: .3s;
}

.nav-link:hover {
  color: white;
}

.nav-link.active {
  color: white;
}

.nav-link.active::after {
  content: '';

  position: absolute;

  left: 0;
  bottom: -8px;

  width: 100%;
  height: 2px;

  background: linear-gradient(
    90deg,
    #8b5cf6,
    #2563eb
  );
}

/* =====================================
   BUTTON
===================================== */

.contact-btn {
  text-decoration: none;

  color: white;

  font-weight: 600;

  padding: .9rem 1.4rem;

  border-radius: 999px;

  background: linear-gradient(
    135deg,
    #8b5cf6,
    #2563eb
  );

  transition: .3s;
}

.contact-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 10px 30px rgba(99,102,241,.4);
}

/* =====================================
   TABLET
===================================== */

@media (max-width: 900px) {

  .header-container {
    padding: 0 1.2rem;
  }

  .nav-menu {
    gap: 1rem;
  }

  .name {
    font-size: .9rem;
  }

  .role {
    font-size: .7rem;
  }

  .contact-btn {
    padding: .8rem 1rem;
    font-size: .85rem;
  }
}

/* =====================================
   MOBILE
===================================== */

@media (max-width: 768px) {

  .app-header {
    height: 75px;
  }

  .contact-btn {
    display: none;
  }

  .nav-menu {
    gap: .8rem;
  }

  .nav-link {
    font-size: .85rem;
  }

  .name {
    max-width: 150px;
    line-height: 1.2;
  }
}

@media (max-width: 480px) {

  .header-container {
    padding: 0 .8rem;
  }

  .name {
    font-size: .8rem;
  }

  .nav-link {
    font-size: .8rem;
  }

  .nav-menu {
    gap: .6rem;
  }
}

</style>