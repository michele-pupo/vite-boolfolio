<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <header class="top-header">
    <div class="container">
      <div class="header-inner">
        <!-- Logo / Brand -->
        <div class="brand">
          <router-link to="/" class="brand-link">HOME</router-link>
        </div>
        <!-- Menu di navigazione -->
        <nav class="nav-menu">
          <ul class="menu-list">
            <li class="project">
              <router-link :to="{ name: 'project' }">Progetti</router-link>
            </li>
            <li>
              <router-link to="/about" class="menu-link">Chi sono</router-link>
            </li>
          </ul>
        </nav>
        <!-- Titolo centrale -->
        <div class="header-title">
          <h1>
            <span class="subtitle">Web Developer:</span>
            <span class="main-title">Michele Fabio Pupo</span>
          </h1>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.top-header {
  width: 100%;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #03346E;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.brand {
  .brand-link {
    font-size: 1.8rem;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: #f0f0f0;
    }
  }
}
.nav-menu {
  .menu-list {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
    align-items: center;
    li {
      position: relative;

      a {
        color: #fff;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease;
      }
      .menu-link {
        color: #fff;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease;
      }
    }
  }
}
.header-title {
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
  h1 {
    margin: 0;
    font-size: 1.2rem;
    color: #fff;
    .subtitle {
      font-weight: 300;
      margin-right: 0.5rem;
      color: #ccc;
    }
    .main-title {
      font-weight: 700;
    }
  }
}
@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
  }
  .nav-menu {
    margin: 0.5rem 0;
  }
  .header-title {
    h1 {
      font-size: 1rem;
    }
  }
  .brand {
    .brand-link {
      font-size: 1.5rem;
    }
  }
}
@media (max-width: 480px) {
  .menu-list {
    gap: 1rem;
  }
  .header-title {
    h1 {
      font-size: 0.9rem;
    }
  }
  .brand {
    .brand-link {
      font-size: 1.3rem;
    }
  }
}
</style>