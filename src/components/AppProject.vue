<script>
import dayjs from 'dayjs';
import 'dayjs/locale/it';

export default {
    name: 'AppProject',
    props: {
        projectName: String,
        projectDescription: String,
        projectImage: String,
        projectDate: String,
        projectLink: String,
        projectTechnolgies: Array,
        projectType: {
            type: String,
            required: false,
            default: 'No type'
        },
        project: Object,
        nonClickable: {
            type: Boolean,
            default: false
        }
    },
    
    data() {
        return {
            apiImageUrl: import.meta.env.VITE_STORAGE_URL, // Percorso relativo
            imageLoaded: false,
            imageError: false
        }
    },
    
    computed: {
        projectTypeArray() {
            // Divide la stringa delle tipologie in un array se contiene virgole
            if (this.projectType && this.projectType.includes(',')) {
                return this.projectType.split(',').map(type => type.trim());
            }
            return [this.projectType];
        }
    },
    
    methods: {
        formatDate(date) {
            dayjs.locale('it'); // Impostiamo il "locale" in italiano
            return dayjs(date).format('DD/MM/YYYY'); // formattazione italiana della data
        },
        
        handleImageLoad() {
            this.imageLoaded = true;
        },
        
        handleImageError() {
            this.imageError = true;
        },
        
        getTypeClass(type) {
            // Converti il tipo in minuscolo per standardizzare
            const typeKey = type.toLowerCase().trim();
            
            // Mappa dei tipi con le rispettive classi
            const typeClasses = {
                'front-end': 'type-frontend',    
                'back-end': 'type-backend',      
                'database': 'type-database', 
            };
            
            // Ritorna la classe corrispondente o default se non trovata
            return typeClasses[typeKey] || 'type-default';
        }
    },
}
</script>

<template>

  <div class="project-card">

    <div class="project-glow"></div>

    <div class="project-shell">

      <div class="card-image-container">

        <div
          v-if="!imageLoaded && !imageError"
          class="image-placeholder"
        >
          <div class="spinner-border"></div>
        </div>

        <img
          :src="`${baseApiUrl}/${projectImage}`"
          :alt="projectName"
          class="card-image"
          @load="handleImageLoad"
          @error="handleImageError"
        />

        <div
          v-if="imageError"
          class="image-error"
        >
          <i class="fas fa-image"></i>
          <span>Image unavailable</span>
        </div>

      </div>

      <div class="card-content">

        <div class="project-types">

          <span
            v-for="(type,index) in projectTypeArray"
            :key="index"
            class="project-type"
          >
            {{ type }}
          </span>

        </div>

        <h2 class="project-title">
          {{ projectName }}
        </h2>

        <div class="card-date">
          <i class="fas fa-calendar-alt"></i>
          {{ formatDate(projectDate) }}
        </div>

        <p class="project-description">

          {{
            projectDescription.length > 110
              ? projectDescription.substring(0,110) + '...'
              : projectDescription
          }}

        </p>

        <div class="card-technologies">

          <span
            v-for="tech in projectTechnolgies"
            :key="tech.id"
            class="technology-badge"
            :style="{ backgroundColor: tech.color }"
          >
            {{ tech.title }}
          </span>

        </div>

        <div class="card-actions">

          <router-link
            :to="{
              name:'single-project',
              params:{ slug: project.slug }
            }"
            class="btn-details"
          >
            Details
          </router-link>

          <a
            :href="projectLink"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-visit"
          >
            Visit
          </a>

        </div>

      </div>

    </div>

  </div>

</template>


<style lang="scss" scoped>

.project-card {

  position: relative;

  width: 100%;
}

.project-glow {

  position: absolute;

  inset: 0;

  background:
    radial-gradient(
      circle at top,
      rgba(139,92,246,.18),
      transparent 70%
    );

  filter: blur(40px);

  pointer-events: none;
}

.project-shell {

  position: relative;

  background:
    rgba(255,255,255,.04);

  border:
    1px solid rgba(255,255,255,.08);

  backdrop-filter: blur(20px);

  border-radius: 24px;

  overflow: hidden;

  transition: .35s ease;

  height: 100%;
}

.project-shell:hover {

  transform:
    translateY(-8px);

  border-color:
    rgba(139,92,246,.35);

  box-shadow:
    0 20px 40px rgba(0,0,0,.25);
}

/* IMAGE */

.card-image-container {

  position: relative;

  height: 240px;

  overflow: hidden;
}

.card-image {

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: .5s ease;
}

.project-shell:hover .card-image {

  transform: scale(1.08);
}

.image-placeholder,
.image-error {

  position: absolute;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  background:
    rgba(255,255,255,.03);
}

.image-error {

  color: #94A3B8;

  gap: .5rem;
}

.image-error i {

  font-size: 2rem;
}

.spinner-border {

  width: 45px;
  height: 45px;

  border-radius: 50%;

  border:
    4px solid rgba(255,255,255,.15);

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

/* CONTENT */

.card-content {

  padding: 1.6rem;
}

.project-types {

  display: flex;

  flex-wrap: wrap;

  gap: .5rem;

  margin-bottom: 1rem;
}

.project-type {

  padding: .4rem .8rem;

  border-radius: 999px;

  font-size: .75rem;

  font-weight: 600;

  background:
    rgba(139,92,246,.12);

  color:
    #C4B5FD;

  border:
    1px solid rgba(139,92,246,.2);
}

.project-title {

  color: white;

  font-size: 1.5rem;

  font-weight: 700;

  margin-bottom: .8rem;
}

.card-date {

  color: #94A3B8;

  margin-bottom: 1rem;

  font-size: .9rem;
}

.project-description {

  color: #CBD5E1;

  line-height: 1.7;

  margin-bottom: 1.4rem;

  min-height: 80px;
}

/* TECH */

.card-technologies {

  display: flex;

  flex-wrap: wrap;

  gap: .5rem;

  margin-bottom: 1.5rem;
}

.technology-badge {

  color: white;

  font-size: .75rem;

  font-weight: 600;

  padding: .45rem .8rem;

  border-radius: 999px;
}

/* ACTIONS */

.card-actions {

  display: flex;

  gap: .8rem;
}

.btn-details,
.btn-visit {

  flex: 1;

  text-align: center;

  text-decoration: none;

  padding: .9rem;

  border-radius: 12px;

  font-weight: 600;

  transition: .3s;
}

.btn-details {

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );

  color: white;
}

.btn-details:hover {

  transform:
    translateY(-2px);
}

.btn-visit {

  background:
    rgba(255,255,255,.05);

  border:
    1px solid rgba(255,255,255,.08);

  color: white;
}

.btn-visit:hover {

  background:
    rgba(255,255,255,.10);
}

/* MOBILE */

@media (max-width: 768px) {

  .card-image-container {

    height: 210px;
  }

  .project-title {

    font-size: 1.3rem;
  }

  .card-actions {

    flex-direction: column;
  }
}

</style>