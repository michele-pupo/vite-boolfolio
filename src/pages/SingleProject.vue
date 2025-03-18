<script>
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/it';

export default {
  name: 'SingleProject',
  data() {
    return {
      project: null,
      projectSlug: null,
      apiBaseUrl: 'http://127.0.0.1:8000/api',
      apiImageUrl: 'http://127.0.0.1:8000/storage/',
    }
  },
  computed: {
    // Se il progetto è caricato, imposta come background l'immagine del progetto
    // con un overlay bianco semitrasparente, altrimenti usa un background bianco
    backgroundStyle() {
      if (this.project && this.project.project_image) {
        return {
          background: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${this.apiImageUrl + this.project.project_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }
      }
      return { backgroundColor: '#ffffff' }
    }
  },
  mounted() {
    this.projectSlug = this.$route.params.slug;
    axios.get(this.apiBaseUrl + '/projects/' + this.projectSlug).then(res => {
      if (res.data.success) {
        this.project = res.data.result;
      } else {
        this.$router.push({ name: 'home' });
      }
    });
  },
  methods: {
    formatDate(date) {
      dayjs.locale('it');
      return dayjs(date).format('DD/MM/YYYY');
    }
  }
}
</script>

<template>
  <!-- Contiene tutto il contenuto principale con background -->
  <div class="page-wrapper" :style="backgroundStyle">
    <!-- Contenitore principale per il progetto -->
    <div class="project-container">
      <div v-if="project" class="project-card">
        <!-- Card Header -->
        <div class="card-header">
          <h2 class="card-title">{{ project.name }}</h2>
          <div v-if="project.type" class="card-type">{{ project.type.title }}</div>
        </div>
        
        <!-- Card Image -->
        <div class="card-image-container">
          <img :src="apiImageUrl + project.project_image" class="card-img-top" :alt="project.name">
        </div>
        
        <!-- Card Body -->
        <div class="card-body">
          <div v-if="project.project_date" class="card-date">
            <i class="fas fa-calendar-alt"></i> {{ formatDate(project.project_date) }}
          </div>
          <div class="card-description">
            {{ project.description }}
          </div>
          <div class="card-technologies">
            <span 
              v-for="tech in project.technologies" 
              :key="tech.id"
              class="technology-badge" 
              :style="{ backgroundColor: tech.color }">
              {{ tech.title }}
            </span>
          </div>
          <div class="card-actions">
            <a :href="project.link_github" target="_blank" class="btn btn-visit" rel="noopener noreferrer">
              <i class="fas fa-external-link-alt"></i> Sito progetto
            </a>
            <router-link to="/project" class="btn btn-details">
              <i class="fas fa-arrow-left"></i> Indietro
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="loading-container">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
  box-sizing: border-box;
  /* Compensazione per header e footer fissi */
  padding-top: 80px; /* Spazio per l'header */
  padding-bottom: 100px; /* Spazio per il footer */
}

.project-container {
  width: 100%;
  /* Altezza regolata per tenere conto di header e footer */
  min-height: calc(100vh - 180px); /* 100vh - (header + footer) */
  padding: 30px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-card {
  width: 100%;
  height: auto;
  max-width: 800px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #F9DBBA;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin: 20px auto; /* Aggiunto un margine minimo */
  
  .card-header {
    background-color: rgba(0, 0, 0, 0.03);
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    
    .card-title {
      margin-bottom: 5px;
      font-size: 2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #000;
    }
    
    .card-type {
      font-weight: 600;
      color: #28a745;
      font-size: 1.2rem;
    }
  }
  
  .card-image-container {
    position: relative;
    height: 300px;
    overflow: hidden;
    
    .card-img-top {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  
  .card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    
    .card-date {
      color: #dc3545;
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 0.9rem;
      
      i {
        margin-right: 5px;
      }
    }
    
    .card-description {
      margin-bottom: 15px;
      color: #343a40;
      font-size: 1rem;
      line-height: 1.5;
    }
    
    .card-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 20px;
      
      .technology-badge {
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
    
    .card-actions {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      
      .btn {
        flex: 1;
        padding: 10px;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s ease;
        text-align: center;
        text-decoration: none;
        
        i {
          margin-right: 5px;
        }
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      }
      
      .btn-visit {
        background-color: #fd7e14;
        color: white;
        
        &:hover {
          background-color: #e67212;
        }
      }
      
      .btn-details {
        background-color: #007bff;
        color: white;
        
        &:hover {
          background-color: #0069d9;
        }
      }
    }
  }
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

/* Stili per dispositivi di piccole dimensioni */
@media (max-width: 576px) {
  .page-wrapper {
    padding-top: 120px; /* Più spazio per l'header su mobile */
    padding-bottom: 120px; /* Più spazio per il footer su mobile */
  }

  .project-container {
    min-height: calc(100vh - 240px); /* 100vh - (header + footer su mobile) */
    padding: 15px 10px;
  }
  
  .project-card {
    margin: 10px auto;
    
    .card-header {
      padding: 10px 15px;
      
      .card-title {
        font-size: 1.5rem;
      }
      
      .card-type {
        font-size: 1rem;
      }
    }
    
    .card-image-container {
      height: 200px;
    }
    
    .card-body {
      padding: 15px;
      
      .card-actions {
        flex-direction: column;
        
        .btn {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

/* Stili per dispositivi di medie dimensioni */
@media (min-width: 577px) and (max-width: 768px) {
  .page-wrapper {
    padding-top: 110px; /* Spazio per l'header su tablet */
    padding-bottom: 110px; /* Spazio per il footer su tablet */
  }

  .project-container {
    min-height: calc(100vh - 220px); /* 100vh - (header + footer su tablet) */
    padding: 20px 15px;
  }
  
  .project-card {
    margin: 15px auto;
    
    .card-header {
      .card-title {
        font-size: 1.8rem;
      }
    }
    
    .card-image-container {
      height: 250px;
    }
  }
}

/* Stili per dispositivi di grandi dimensioni */
@media (min-width: 769px) {
  .project-container {
    padding: 30px;
  }
  
  .project-card {
    margin: 20px auto;
  }
}

</style>


