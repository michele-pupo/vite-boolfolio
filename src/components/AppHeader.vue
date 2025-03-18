<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <header class="top-header">
    <div class="container">
      <div class="header-content">
        <!-- Link Home -->
        <div class="brand">
          <router-link to="/" class="brand-link">
            <span class="fw-bold">Home</span>
          </router-link>
        </div>
        <!-- Menu di navigazione -->
        <nav class="menu">
          <ul class="menu-list">
            <li>
              <router-link :to="{ name: 'project' }">Progetti</router-link>
            </li>
            <!-- Aggiungi altre opzioni qui se necessario -->
          </ul>
        </nav>
        <!-- Titolo dell'header -->
        <div class="header-title">
          <h1>
            <span class="text-muted">Web Developer:</span>
            <span class="fw-bold">Michele Fabio Pupo</span>
          </h1>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.top-header {
  width: 100%;
  padding: 1.5rem 0;
  position: fixed;
  top: 0;
  background-color: #03346E;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Aumentato per assicurarsi che sia sempre sopra gli altri elementi */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

/* Stile per il link Home */
.brand-link {
  font-size: 1.2rem;
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

/* Stile per il menu */
.menu-list {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
  
  li a {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-2px);
    }
  }
}

/* Stile per il titolo */
.header-title {
  h1 {
    font-size: 1.2rem;
    color: white;
    font-weight: 400;
    margin: 0;
    span {
      color: #ccc;
    }
  }
}

/* Responsive: per schermi piccoli, il contenuto è centrato e disposto a colonna */
@media (max-width: 768px) {
  .top-header {
    padding: 1rem 0;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }
  
  .header-title h1 {
    font-size: 1rem;
  }
}
</style>

