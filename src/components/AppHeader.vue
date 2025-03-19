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

/* Responsive: per schermi piccoli, modifica il layout invece di nascondere completamente */
@media (max-width: 768px) {
  .top-header {
    padding: 0.8rem 0;
    position: fixed;
  }
  
  .header-content {
    flex-direction: row; /* Mantenuto in riga per ottimizzare lo spazio */
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .brand, .menu {
    flex-basis: 50%; /* Utilizza metà dello spazio disponibile */
  }
  
  .brand {
    text-align: left;
  }
  
  .menu {
    text-align: right;
  }
  
  .header-title {
    flex-basis: 100%; /* Occupa l'intera larghezza */
    text-align: center;
    margin-top: 0.5rem;
    
    h1 {
      font-size: 0.9rem;
    }
  }
  
  /* Stile per il menu ridotto */
  .menu-list {
    justify-content: flex-end;
    gap: 0.8rem;
  }
}

/* Aggiustamenti per schermi molto piccoli */
@media (max-width: 480px) {
  .header-content {
    gap: 0.3rem;
  }
  
  .brand-link, .menu-list li a {
    font-size: 0.9rem;
  }
  
  .header-title h1 {
    font-size: 0.8rem;
  }
}

/* Compensare lo spazio occupato dall'header nelle altre sezioni */
body {
  padding-top: 0; /* Rimuoviamo padding che potrebbe essere presente */
}

/* Aggiunta di spazio per l'header per il contenuto principale su desktop */
@media (min-width: 769px) {
  .my_home, main, .header-section {
    padding-top: 5rem; /* Aggiungiamo spazio per l'header fisso */
  }
}
</style>

