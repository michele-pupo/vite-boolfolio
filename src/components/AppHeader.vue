<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <!-- Link per tornare alla Home -->
        <router-link to="/" class="navbar-brand">
          <span class="fw-bold">Home</span>
        </router-link>

        <!-- Bottone per il menu in versione mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Sezioni e Titolo -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto">
            <!-- Link Sezioni accanto a Home -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sezioni
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <router-link :to="{ name: 'project' }" class="dropdown-item">
                    Progetti
                  </router-link>
                </li>
                <!-- Aggiungi altre opzioni qui -->
              </ul>
            </li>
          </ul>

          <!-- Titolo della pagina, se desideri lasciarlo -->
          <div class="ms-3 d-none d-md-block">
            <h1 class="fs-5 text-white mb-0">
              <span class="text-muted">Web Developer:</span> <span class="fw-bold">Michele Fabio Pupo</span>
            </h1>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
.navbar {
  width: 100%;
  height: 60px;
  z-index: 10;
  position: fixed;
  top: 0;
  background-color: #03346E;
  padding: 0.5rem 1rem;

  .navbar-brand {
    font-size: 1.2rem;
  }

  .navbar-toggler {
    border-color: #fff;
  }

  .navbar-toggler-icon {
    background-color: #fff;
  }

  .navbar-nav {
    margin-left: auto;
  }

  .dropdown-menu {
    background-color: #03346E;
  }

  .navbar-collapse {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

h1 {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 400;
  span {
    color: #ccc;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1rem;
  }
}
</style>

