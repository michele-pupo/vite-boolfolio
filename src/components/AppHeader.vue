<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <header class="top-header">
    <div class="container">
      <div class="header-inner">
        <!-- Home -->
        <div v-if="$route.name !== 'home'" class="brand">
          <router-link to="/" class="brand-link">HOME</router-link>
        </div>
        
        <!-- Titolo centrale -->
        <div :class="{'header-title': true, 'align-right': $route.name === 'project'}">
          <h1>
            <span class="subtitle">Web Developer:</span>
            <span class="main-title">Michele Fabio Pupo</span>
          </h1>
        </div>
        
        <!-- Menu di navigazione -->
        <nav class="nav-menu">
          <ul class="menu-list">
            <li class="project-item" v-if="$route.name !== 'project'">
              <router-link :to="{ name: 'project' }" class="project-link">PROGETTI</router-link>
            </li>
          </ul>
        </nav>
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
    margin: 0;
    padding: 0;
    align-items: center;
    
    .project-item {
      position: relative;
      
      .project-link {
        color: #fff;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 700;
        text-transform: uppercase;
        background-color: #FF6B00;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        transition: all 0.3s ease;
        letter-spacing: 0.5px;
        
        &:hover {
          background-color: #FF8C33;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        &.router-link-active {
          background-color: #FF8C33;
        }
      }
    }
  }
}

.header-title {
  text-align: center;
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

.align-right {
  text-align: right;
  margin-left: auto;
}

/* Media queries per la responsività */
@media (max-width: 768px) {
  .header-inner {
    justify-content: center;
    gap: 1rem;
  }
  
  .nav-menu {
    order: 3;
    width: 100%;
    margin-top: 0.8rem;
    
    .menu-list {
      justify-content: center;
    }
  }
  
  .header-title {
    order: 2;
    h1 {
      font-size: 1rem;
    }
  }
  
  .brand {
    order: 1;
    .brand-link {
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
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
  
  .nav-menu {
    .menu-list {
      .project-item {
        .project-link {
          padding: 0.4rem 1.2rem;
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>