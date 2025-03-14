<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <!-- Link per tornare alla Home -->
        <router-link to="/" class="navbar-brand">Home</router-link>
        
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
          <ul class="navbar-nav me-auto">
            <!-- Menù a tendina per le altre sezioni -->
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
                <!-- Aggiungi ulteriori opzioni qui se necessario -->
              </ul>
            </li>
          </ul>
          <!-- Titolo della pagina -->
          <div>
            <h1 class="fs-3">
              <span>Web Developer :</span> Michele Fabio Pupo
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
  height: 50px;
  z-index: 10;
  position: fixed;
  background-color: #03346E;
}
</style>