<script>
import AppProject from '../components/AppProject.vue';
import axios from 'axios';
import emitter from '../plugins/mitt';

export default {
    name: 'HomePage',

    components: { 
        AppProject,
    },

    data() {
        return {
            projects: [],
            apiLinks: [],
            apiPageNumber: 1,
            isLoading: true,
            baseApiUrl: 'http://127.0.0.1:8000/api',
            isMobile: false,
            error: null,
            visibleProjects: [],
            lastScrollY: window.scrollY,
            scrollDirection: 'down'
        }
    },

    mounted() {
        window.scrollTo(0, 0);
        this.checkDeviceType();
        
        // Usa mitt invece di addEventListener
        emitter.on('resize', this.checkDeviceType);
        emitter.on('scroll', this.checkProjectVisibility);
        
        // Aggiungi i listener nativi che emettono eventi mitt
        window.addEventListener('resize', () => emitter.emit('resize'));
        window.addEventListener('scroll', () => emitter.emit('scroll'));
        
        // Il resto del codice rimane invariato
        if (this.$route.query.page) {
            this.apiPageNumber = this.$route.query.page;
        } else {
            const savedPage = localStorage.getItem('currentPage');
            if (savedPage) {
                this.apiPageNumber = savedPage;
            }
        }
        
        this.loadProjects();
    },
    
    beforeUnmount() {
        // Rimuovi i listener di mitt
        emitter.off('resize', this.checkDeviceType);
        emitter.off('scroll', this.checkProjectVisibility);
        
        // Rimuovi i listener nativi
        window.removeEventListener('resize', () => emitter.emit('resize'));
        window.removeEventListener('scroll', () => emitter.emit('scroll'));
    },
    
    updated() {
        if (this.projects.length > 0 && this.visibleProjects.length === 0) {
            this.$nextTick(() => {
                this.setupIntersectionObserver();
            });
        }
    },

    computed: {

      uniqueTechnologies() {

          const techs = [];

          this.projects.forEach(project => {

              if (project.technologies) {

                  project.technologies.forEach(tech => {

                      techs.push(tech.title);

                  });

              }

          });

          return [...new Set(techs)].length;
      }

    },

    methods: {
        checkDeviceType() {
            const wasAlreadyMobile = this.isMobile;
            this.isMobile = window.innerWidth < 992;
            if (wasAlreadyMobile !== this.isMobile) {
                this.loadProjects();
                this.resetProjectVisibility();
            }
        },
        
        loadProjects() {
            if (this.isMobile) {
                this.apiCallAll();
            } else {
                this.apiCall();
            }
        },
        
        apiCall() {
            this.isLoading = true;
            this.error = null;
            axios.get(`${this.baseApiUrl}/projects`, {
                params: {
                page: this.apiPageNumber,
                }
            }).then(res => {
                console.log('API Response:', res); // Log completo risposta
                if (res.data.success) {
                this.isLoading = false;
                this.projects = res.data.result.data;
                this.apiLinks = res.data.result.links;
                this.resetProjectVisibility();
                }
            }).catch(error => {
                console.error('Detailed Error:', error);
                console.error('Error Response:', error.response);
                console.error('Error Request:', error.request);
                this.isLoading = false;
                this.error = error.message || "Errore di connessione";
            });
        },

        apiCallAll() {
            this.isLoading = true;
            this.error = null;
            axios.get(`${this.baseApiUrl}/projects`, {
                params: {
                    all: true,
                }
            }).then(res => {
                console.log('Response:', res.data);
                if (res.data.success) {
                    this.isLoading = false;
                    this.projects = res.data.result;
                    this.resetProjectVisibility();
                    this.$nextTick(() => {
                        this.setupIntersectionObserver();
                    });
                }
            }).catch(error => {
                console.error('Axios Error:', error);
                console.error("Error fetching all projects:", error);
                this.isLoading = false;
                this.error = "Si è verificato un errore durante il caricamento dei progetti.";
            });
        },
        
        resetProjectVisibility() {
            this.visibleProjects = Array(this.projects.length).fill(false);
            this.$nextTick(() => {
                this.checkProjectVisibility();
            });
        },
        
        setupIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const index = parseInt(entry.target.dataset.index);
                    if (!isNaN(index)) {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                this.visibleProjects[index] = true;
                            }, index * 150);
                        } else {
                            this.visibleProjects[index] = false;
                        }
                    }
                });
            }, options);
            
            document.querySelectorAll('.project-item').forEach(el => {
                observer.observe(el);
            });
        },
        
        checkProjectVisibility() {
            const currentScrollY = window.scrollY;
            this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
            this.lastScrollY = currentScrollY;

            const projectElements = document.querySelectorAll('.project-item');
            projectElements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top <= windowHeight * 0.8) {
                    setTimeout(() => {
                        this.visibleProjects[index] = true;
                    }, index * 150);
                } else {
                    this.visibleProjects[index] = false;
                }
            });
        },

        projectAnimationClass(index) {
            const base = 'project-animation';
            if (this.isMobile) {
                if (this.visibleProjects[index]) {
                    return [base, 'show'];
                } else {
                    return [base, this.scrollDirection === 'up' ? 'hide-up' : 'hide-down'];
                }
            } else {
                return [base, this.visibleProjects[index] ? 'show' : ''];
            }
        },

        changeApiPage(pageNumber) {
            if (pageNumber === '&laquo; Previous') {
                this.apiPageNumber = Number(this.apiPageNumber) - 1;
            } else if (pageNumber === 'Next &raquo;') {
                this.apiPageNumber = Number(this.apiPageNumber) + 1;
            } else {
                this.apiPageNumber = pageNumber;
            }
            
            // Salva la pagina corrente nel localStorage
            localStorage.setItem('currentPage', this.apiPageNumber);
            
            this.apiCall();
            
        }
    }
}
</script>

<template>
  <div class="projects-page">

    <!-- HERO -->

    <section class="projects-hero">

      <div class="hero-glow"></div>

      <div class="hero-content">

        <span class="hero-badge">
          Portfolio
        </span>

        <h1 class="hero-title">
          My Projects
        </h1>

        <p class="hero-description">
          Una raccolta di applicazioni web sviluppate con Laravel,
          Vue.js, MySQL e tecnologie moderne orientate a performance,
          scalabilità ed esperienza utente.
        </p>

        <div class="hero-stats">

          <div class="stat-card">
            <span class="stat-number">
              {{ projects.length }}
            </span>
            <span class="stat-label">
              Projects
            </span>
          </div>

          <div class="stat-card">

            <span class="stat-number">
              {{ uniqueTechnologies }}
            </span>

            <span class="stat-label">
              Technologies
            </span>

          </div>

          <div class="stat-card">
            <span class="stat-number">
              Full Stack
            </span>
            <span class="stat-label">
              Development
            </span>
          </div>

        </div>

      </div>

    </section>

    <!-- PROJECTS -->

    <section
      id="projects-section"
      class="projects-section"
    >

      <div class="projects-wrapper">

        <div v-if="!isLoading && !error">

          <div class="projects-grid">

            <div
              v-for="(currentProject, index) in projects"
              :key="currentProject.slug"
              :data-index="index"
              :class="[
                'project-item',
                ...projectAnimationClass(index)
              ]"
            >

              <AppProject
                :project="currentProject"
                :projectName="currentProject.name"
                :projectDescription="currentProject.description"
                :projectImage="currentProject.project_image"
                :projectDate="currentProject.project_date"
                :projectLink="currentProject.link_github"
                :projectTechnolgies="currentProject.technologies"
                :projectType="currentProject.types && currentProject.types.length > 0
                  ? currentProject.types.map(type => type.title).join(', ')
                  : 'No type'"
                :nonClickable="true"
              />

            </div>

          </div>

          <!-- PAGINATION -->

          <div
            v-if="!isMobile && apiLinks && apiLinks.length > 0"
            class="pagination-container"
          >

            <ul class="pagination">

              <li
                v-html="apiLinks[0].label"
                :class="[
                  'page-item',
                  apiPageNumber == 1 ? 'disabled' : ''
                ]"
                @click="apiPageNumber != 1 && changeApiPage(apiLinks[0].label)"
              ></li>

              <li
                v-for="link in apiLinks.slice(1, -1)"
                :key="link.label"
                v-html="link.label"
                @click="changeApiPage(link.label)"
                :class="[
                  'page-item',
                  link.label == apiPageNumber ? 'active' : ''
                ]"
              ></li>

              <li
                v-html="apiLinks[apiLinks.length - 1].label"
                :class="[
                  'page-item',
                  apiPageNumber == apiLinks.length - 2
                    ? 'disabled'
                    : ''
                ]"
                @click="apiPageNumber != apiLinks.length - 2 &&
                changeApiPage(apiLinks[apiLinks.length - 1].label)"
              ></li>

            </ul>

          </div>

          <div
            v-if="projects.length === 0"
            class="no-projects"
          >
            Nessun progetto disponibile.
          </div>

        </div>

        <!-- ERROR -->

        <div
          v-else-if="error"
          class="error-container"
        >

          <div class="error-card">

            <h3>Oops...</h3>

            <p>{{ error }}</p>

            <button
              class="retry-btn"
              @click="loadProjects"
            >
              Riprova
            </button>

          </div>

        </div>

        <!-- LOADING -->

        <div
          v-else
          class="loading-container"
        >

          <div class="spinner-border"></div>

          <p>
            Caricamento progetti...
          </p>

        </div>

      </div>

    </section>

  </div>
</template>

<style lang="scss">

/* ==========================================
   PAGE
========================================== */

.projects-page {

  min-height: 100vh;

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

  color: white;

  overflow-x: hidden;
}

/* ==========================================
   HERO
========================================== */

.projects-hero {

  position: relative;

  padding-top: 180px;
  padding-bottom: 100px;

  text-align: center;

  overflow: hidden;
}

.hero-glow {

  position: absolute;

  width: 700px;
  height: 700px;

  left: 50%;
  top: -250px;

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

.hero-content {

  position: relative;

  z-index: 2;

  max-width: 900px;

  margin: auto;

  padding: 0 2rem;
}

.hero-badge {

  display: inline-block;

  padding: .8rem 1.2rem;

  border-radius: 999px;

  background: rgba(255,255,255,.05);

  border: 1px solid rgba(255,255,255,.08);

  color: #CBD5E1;

  margin-bottom: 1.5rem;
}

.hero-title {

  font-size: clamp(3rem, 7vw, 5rem);

  font-weight: 800;

  margin-bottom: 1.5rem;

  background:
    linear-gradient(
      135deg,
      white,
      #CBD5E1
    );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {

  max-width: 700px;

  margin: auto;

  color: #94A3B8;

  font-size: 1.15rem;

  line-height: 1.8;
}

/* ==========================================
   STATS
========================================== */

.hero-stats {

  margin-top: 3rem;

  display: grid;

  grid-template-columns:
    repeat(auto-fit,minmax(180px,1fr));

  gap: 1rem;
}

.stat-card {

  background: rgba(255,255,255,.04);

  border: 1px solid rgba(255,255,255,.08);

  backdrop-filter: blur(20px);

  border-radius: 20px;

  padding: 1.5rem;

  transition: .3s;
}

.stat-card:hover {

  transform: translateY(-5px);

  border-color:
    rgba(139,92,246,.35);
}

.stat-number {

  display: block;

  font-size: 1.8rem;

  font-weight: 700;

  color: white;
}

.stat-label {

  color: #94A3B8;

  font-size: .9rem;
}

/* ==========================================
   PROJECTS
========================================== */

.projects-section {

  padding: 0 0 80px;
}

.projects-wrapper {

  max-width: 1400px;

  margin: auto;

  padding: 0 2rem;
}

.projects-grid {

  display: grid;

  grid-template-columns:
    repeat(auto-fit,minmax(360px,1fr));

  gap: 2rem;
}

/* ==========================================
   ANIMATIONS
========================================== */

.project-animation {

  opacity: 0;

  transform:
    translateY(40px);

  transition:
    opacity .8s ease,
    transform .8s ease;
}

.project-animation.show {

  opacity: 1;

  transform:
    translateY(0);
}

.project-item {

  transition: .3s;
}

.project-item:hover {

  transform:
    translateY(-8px);
}

.projects-grid:hover
.project-item:not(:hover) {

  opacity: .75;
}

/* ==========================================
   PAGINATION
========================================== */

.pagination-container {

  display: flex;

  justify-content: center;

  margin-top: 4rem;
}

.pagination {

  display: flex;

  gap: .6rem;

  list-style: none;

  padding: 0;
}

.page-item {

  min-width: 45px;

  height: 45px;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  border-radius: 12px;

  background:
    rgba(255,255,255,.04);

  border:
    1px solid rgba(255,255,255,.08);

  color: white;

  transition: .3s;
}

.page-item:hover:not(.active):not(.disabled) {

  background:
    rgba(139,92,246,.18);
}

.page-item.active {

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );

  border: none;
}

.page-item.disabled {

  opacity: .4;

  cursor: not-allowed;
}

/* ==========================================
   LOADING
========================================== */

.loading-container {

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  min-height: 400px;

  color: white;
}

.spinner-border {

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

/* ==========================================
   ERROR
========================================== */

.error-container {

  display: flex;

  justify-content: center;

  padding: 80px 0;
}

.error-card {

  max-width: 500px;

  text-align: center;

  background:
    rgba(255,255,255,.04);

  border:
    1px solid rgba(255,255,255,.08);

  border-radius: 24px;

  padding: 2rem;
}

.error-card h3 {

  margin-bottom: 1rem;
}

.error-card p {

  color: #94A3B8;
}

.retry-btn {

  margin-top: 1rem;

  border: none;

  color: white;

  padding: 1rem 1.5rem;

  border-radius: 999px;

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );

  cursor: pointer;
}

/* ==========================================
   NO PROJECTS
========================================== */

.no-projects {

  text-align: center;

  padding: 80px 0;

  color: #94A3B8;
}

/* ==========================================
   MOBILE
========================================== */

@media (max-width: 768px) {

  .projects-hero {

    padding-top: 140px;
    padding-bottom: 70px;
  }

  .projects-wrapper {

    padding: 0 1rem;
  }

  .projects-grid {

    grid-template-columns: 1fr;

    gap: 1.5rem;
  }

  .hero-description {

    font-size: 1rem;
  }

  .hero-stats {

    grid-template-columns: 1fr;
  }

  .project-animation {

    transform:
      translateX(100%);
  }

  .project-animation.show {

    transform:
      translateX(0);
  }
}

</style>