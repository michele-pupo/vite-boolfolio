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
    },

    getPreviousPage() {
      // Recupera la pagina precedente dal localStorage
      return localStorage.getItem('currentPage') || 1;
    }
  }
}
</script>

<template>

  <div class="single-project-page">

    <div class="background-glow"></div>

    <div v-if="project" class="project-wrapper">

      <div class="project-card">

        <div class="project-image-container">

          <img
            :src="apiImageUrl + project.project_image"
            :alt="project.name"
            class="project-image"
          >

          <div class="image-overlay"></div>

        </div>

        <div class="project-content">

          <div class="project-header">

            <span
              v-if="project.type"
              class="project-type"
            >
              {{ project.type.title }}
            </span>

            <h1 class="project-title">
              {{ project.name }}
            </h1>

            <div
              v-if="project.project_date"
              class="project-date"
            >
              <i class="fas fa-calendar-alt"></i>
              {{ formatDate(project.project_date) }}
            </div>

          </div>

          <div class="project-description">

            {{ project.description }}

          </div>

          <div class="technologies-container">

            <span
              v-for="tech in project.technologies"
              :key="tech.id"
              class="technology-badge"
              :style="{ backgroundColor: tech.color }"
            >
              {{ tech.title }}
            </span>

          </div>

          <div class="project-actions">

            <a
              :href="project.link_github"
              target="_blank"
              rel="noopener noreferrer"
              class="visit-btn"
            >
              <i class="fas fa-arrow-up-right-from-square"></i>
              Visit Project
            </a>

            <router-link
              :to="{ name: 'project', query: { page: getPreviousPage() } }"
              class="back-btn"
            >
              <i class="fas fa-arrow-left"></i>
              Back
            </router-link>

          </div>

        </div>

      </div>

    </div>

    <div
      v-else
      class="loading-container"
    >
      <div class="spinner"></div>
    </div>

  </div>

</template>

<style lang="scss" scoped>

.single-project-page {

  min-height: 100vh;

  padding-top: 140px;
  padding-bottom: 100px;

  background:
    radial-gradient(
      circle at top,
      rgba(139,92,246,.18),
      transparent 40%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(37,99,235,.12),
      transparent 35%
    ),
    #070B14;

  position: relative;

  overflow: hidden;
}

.background-glow {

  position: absolute;

  width: 800px;
  height: 800px;

  top: -250px;
  left: 50%;

  transform: translateX(-50%);

  background:
    radial-gradient(
      circle,
      rgba(139,92,246,.25),
      rgba(37,99,235,.15),
      transparent
    );

  filter: blur(120px);

  pointer-events: none;
}

.project-wrapper {

  max-width: 1200px;

  margin: auto;

  padding: 0 2rem;

  position: relative;

  z-index: 2;
}

.project-card {

  background:
    rgba(255,255,255,.04);

  border:
    1px solid rgba(255,255,255,.08);

  backdrop-filter: blur(20px);

  border-radius: 30px;

  overflow: hidden;

  box-shadow:
    0 25px 60px rgba(0,0,0,.25);
}

.project-image-container {

  position: relative;

  height: 500px;

  overflow: hidden;
}

.project-image {

  width: 100%;
  height: 100%;

  object-fit: cover;
}

.image-overlay {

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      to top,
      #070B14,
      transparent 60%
    );
}

.project-content {

  padding: 3rem;
}

.project-type {

  display: inline-block;

  padding: .6rem 1rem;

  border-radius: 999px;

  background:
    rgba(139,92,246,.15);

  color:
    #C4B5FD;

  border:
    1px solid rgba(139,92,246,.25);

  margin-bottom: 1rem;

  font-size: .85rem;

  font-weight: 600;
}

.project-title {

  color: white;

  font-size: clamp(2rem,5vw,4rem);

  font-weight: 800;

  margin-bottom: 1rem;
}

.project-date {

  color: #94A3B8;

  margin-bottom: 2rem;
}

.project-description {

  color: #CBD5E1;

  font-size: 1.05rem;

  line-height: 1.9;

  margin-bottom: 2rem;
}

.technologies-container {

  display: flex;

  flex-wrap: wrap;

  gap: .7rem;

  margin-bottom: 2.5rem;
}

.technology-badge {

  color: white;

  padding: .6rem 1rem;

  border-radius: 999px;

  font-size: .8rem;

  font-weight: 600;
}

.project-actions {

  display: flex;

  gap: 1rem;
}

.visit-btn,
.back-btn {

  flex: 1;

  text-align: center;

  text-decoration: none;

  padding: 1rem;

  border-radius: 14px;

  font-weight: 600;

  transition: .3s;
}

.visit-btn {

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );

  color: white;
}

.visit-btn:hover {

  transform:
    translateY(-3px);
}

.back-btn {

  background:
    rgba(255,255,255,.05);

  border:
    1px solid rgba(255,255,255,.08);

  color: white;
}

.back-btn:hover {

  background:
    rgba(255,255,255,.1);
}

.loading-container {

  min-height: 70vh;

  display: flex;

  justify-content: center;

  align-items: center;
}

.spinner {

  width: 60px;
  height: 60px;

  border-radius: 50%;

  border:
    4px solid rgba(255,255,255,.1);

  border-top:
    4px solid #8B5CF6;

  animation:
    spin 1s linear infinite;
}

@keyframes spin {

  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {

  .project-image-container {

    height: 280px;
  }

  .project-content {

    padding: 1.5rem;
  }

  .project-actions {

    flex-direction: column;
  }
}

</style>