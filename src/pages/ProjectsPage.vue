<script>
import AppProject from '../components/AppProject.vue';
import axios from 'axios';

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
        window.addEventListener('resize', this.checkDeviceType);
        this.loadProjects();
        window.addEventListener('scroll', this.checkProjectVisibility);
    },
    
    beforeUnmount() {
        window.removeEventListener('resize', this.checkDeviceType);
        window.removeEventListener('scroll', this.checkProjectVisibility);
    },
    
    updated() {
        if (this.projects.length > 0 && this.visibleProjects.length === 0) {
            this.$nextTick(() => {
                this.setupIntersectionObserver();
            });
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
                if (res.data.success) {
                    this.isLoading = false;
                    this.projects = res.data.result.data;
                    this.apiLinks = res.data.result.links;
                    this.resetProjectVisibility();
                }
            }).catch(error => {
                console.error("Error fetching projects:", error);
                this.isLoading = false;
                this.error = "Si è verificato un errore durante il caricamento dei progetti.";
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
                if (res.data.success) {
                    this.isLoading = false;
                    this.projects = res.data.result;
                    this.resetProjectVisibility();
                    this.$nextTick(() => {
                        this.setupIntersectionObserver();
                    });
                }
            }).catch(error => {
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
            this.apiCall();
            document.querySelector('#projects-section').scrollIntoView({ behavior: 'smooth' });
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column my_home">
        <!-- HEADER -->
        <div class="header-section">
            <!-- Carousel visibile solo su desktop -->
            <div class="carousel-wrapper" v-if="!isMobile">
                <div class="carousel">
                    <!-- Esempio di immagini: sostituisci con le tue -->
                    <img src="/1_OrjCKmou1jT4It5so5gvOA_preview_rev_1.png" alt="Vue.js">
                    <img src="/bootstrap-tutorial.png" alt="Bootstrap">
                    <img src="/1698604163003.png" alt="Javascript">
                    <img src="/css.png" alt="Css">
                    <img src="/353261.png" alt="Php">
                    <img src="/eceb15684d4183c66f73c1a9bb777eef708b2b66.png" alt="Mysql">
                    <img src="/fposter,small,wall_texture,product,750x1000_preview_rev_1.png" alt="Vite">
                    <img src="/HTML5_logo_and_wordmark.svg.png" alt="Html5">
                    <img src="/laravel-featured_preview_rev_1.png" alt="Laravel">
                    <img src="/sass-icon-1024x1024-kn7u23pl.png" alt="Sass">
                    <!-- Duplico le immagini per effetto carousel continuo -->
                    <img src="/1_OrjCKmou1jT4It5so5gvOA_preview_rev_1.png" alt="Vue.js">
                    <img src="/bootstrap-tutorial.png" alt="Bootstrap">
                    <img src="/1698604163003.png" alt="Javascript">
                    <img src="/css.png" alt="Css">
                    <img src="/353261.png" alt="Php">
                    <img src="/eceb15684d4183c66f73c1a9bb777eef708b2b66.png" alt="Mysql">
                    <img src="/fposter,small,wall_texture,product,750x1000_preview_rev_1.png" alt="Vite">
                    <img src="/HTML5_logo_and_wordmark.svg.png" alt="Html5">
                    <img src="/laravel-featured_preview_rev_1.png" alt="Laravel">
                    <img src="/sass-icon-1024x1024-kn7u23pl.png" alt="Sass">
                    <!-- Duplico le immagini per effetto carousel continuo -->
                    <img src="/1_OrjCKmou1jT4It5so5gvOA_preview_rev_1.png" alt="Vue.js">
                    <img src="/bootstrap-tutorial.png" alt="Bootstrap">
                    <img src="/1698604163003.png" alt="Javascript">
                    <img src="/css.png" alt="Css">
                    <img src="/353261.png" alt="Php">
                    <img src="/eceb15684d4183c66f73c1a9bb777eef708b2b66.png" alt="Mysql">
                    <img src="/fposter,small,wall_texture,product,750x1000_preview_rev_1.png" alt="Vite">
                    <img src="/HTML5_logo_and_wordmark.svg.png" alt="Html5">
                    <img src="/laravel-featured_preview_rev_1.png" alt="Laravel">
                    <img src="/sass-icon-1024x1024-kn7u23pl.png" alt="Sass">
                    <!-- Duplico le immagini per effetto carousel continuo -->
                    <img src="/1_OrjCKmou1jT4It5so5gvOA_preview_rev_1.png" alt="Vue.js">
                    <img src="/bootstrap-tutorial.png" alt="Bootstrap">
                    <img src="/1698604163003.png" alt="Javascript">
                    <img src="/css.png" alt="Css">
                    <img src="/353261.png" alt="Php">
                    <img src="/eceb15684d4183c66f73c1a9bb777eef708b2b66.png" alt="Mysql">
                    <img src="/fposter,small,wall_texture,product,750x1000_preview_rev_1.png" alt="Vite">
                    <img src="/HTML5_logo_and_wordmark.svg.png" alt="Html5">
                    <img src="/laravel-featured_preview_rev_1.png" alt="Laravel">
                    <img src="/sass-icon-1024x1024-kn7u23pl.png" alt="Sass">
                    <!-- Duplico le immagini per effetto carousel continuo -->
                    <img src="/1_OrjCKmou1jT4It5so5gvOA_preview_rev_1.png" alt="Vue.js">
                    <img src="/bootstrap-tutorial.png" alt="Bootstrap">
                    <img src="/1698604163003.png" alt="Javascript">
                    <img src="/css.png" alt="Css">
                    <img src="/353261.png" alt="Php">
                    <img src="/eceb15684d4183c66f73c1a9bb777eef708b2b66.png" alt="Mysql">
                    <img src="/fposter,small,wall_texture,product,750x1000_preview_rev_1.png" alt="Vite">
                    <img src="/HTML5_logo_and_wordmark.svg.png" alt="Html5">
                    <img src="/laravel-featured_preview_rev_1.png" alt="Laravel">
                    <img src="/sass-icon-1024x1024-kn7u23pl.png" alt="Sass">
                    <!-- Duplico le immagini per effetto carousel continuo -->
                    <img src="/1_OrjCKmou1jT4It5so5gvOA_preview_rev_1.png" alt="Vue.js">
                    <img src="/bootstrap-tutorial.png" alt="Bootstrap">
                    <img src="/1698604163003.png" alt="Javascript">
                    <img src="/css.png" alt="Css">
                    <img src="/353261.png" alt="Php">
                    <img src="/eceb15684d4183c66f73c1a9bb777eef708b2b66.png" alt="Mysql">
                    <img src="/fposter,small,wall_texture,product,750x1000_preview_rev_1.png" alt="Vite">
                    <img src="/HTML5_logo_and_wordmark.svg.png" alt="Html5">
                    <img src="/laravel-featured_preview_rev_1.png" alt="Laravel">
                    <img src="/sass-icon-1024x1024-kn7u23pl.png" alt="Sass">
                </div>
            </div>
            <!-- Overlay sempre presente per titoli e sottotitoli -->
            <div class="header-overlay">
                <div class="container">
                    <h1 class="text-uppercase fw-bold display-3">I miei progetti</h1>
                    <p class="lead text-center mb-0">Scopri il mio portfolio di soluzioni web</p>
                </div>
            </div>
        </div>
        
        <!-- SEZIONE PROGETTI -->
        <section id="projects-section" class="projects-section">
            <div class="container">
                <div v-if="!isLoading && !error">
                    <div class="projects-container">
                        <div 
                            v-for="(currentProject, index) in projects"
                            :key="currentProject.slug"
                            :data-index="index"
                            :class="['project-item', ...projectAnimationClass(index)]"
                        >
                            <AppProject 
                                :project="currentProject"
                                :projectName="currentProject.name"
                                :projectDescription="currentProject.description"
                                :projectImage="currentProject.project_image"
                                :projectDate="currentProject.project_date"
                                :projectLink="currentProject.link_github"
                                :projectTechnolgies="currentProject.technologies"
                                :projectType="currentProject.type.title"
                                :nonClickable="true"
                            />
                        </div>
                    </div>

                    <!-- Nessun progetto -->
                    <div v-if="projects.length === 0" class="no-projects">
                        <p>Nessun progetto disponibile al momento.</p>
                    </div>

                    <!-- Paginazione (solo desktop) -->
                    <div v-if="!isMobile && apiLinks && apiLinks.length > 0" class="pagination-container">
                        <ul class="pagination">
                            <li 
                                v-html="apiLinks[0].label" 
                                :class="['page-item', apiPageNumber == 1 ? 'disabled' : '']"
                                @click="apiPageNumber != 1 && changeApiPage(apiLinks[0].label)">
                            </li>
                            <li 
                                v-for="link in apiLinks.slice(1, -1)"
                                :key="link.label"
                                v-html="link.label" 
                                @click="changeApiPage(link.label)" 
                                :class="['page-item', link.label == apiPageNumber ? 'active' : '']">
                            </li>
                            <li 
                                v-html="apiLinks[apiLinks.length - 1].label" 
                                :class="['page-item', apiPageNumber == apiLinks.length - 2 ? 'disabled' : '']"
                                @click="apiPageNumber != apiLinks.length - 2 && changeApiPage(apiLinks[apiLinks.length - 1].label)">
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Errore -->
                <div v-else-if="error" class="error-container">
                    <div class="alert alert-danger" role="alert">
                        {{ error }}
                        <button class="btn btn-outline-danger mt-3" @click="loadProjects">Riprova</button>
                    </div>
                </div>

                <!-- Loading -->
                <div v-else class="loading-container">
                    <div class="spinner-container">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <p class="mt-3">Caricamento progetti in corso...</p>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
/* ------------------------------------------------------
   STRUTTURA DI BASE
------------------------------------------------------ */
.my_home {
    width: 100%;
    min-height: 100vh;
    background-color: #f8f9fa; // sfondo chiaro generale
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 991px) {
        padding-bottom: 80px;
    }
}

/* ------------------------------------------------------
   HEADER
------------------------------------------------------ */
/* Header con gradiente più chiaro in alto, più scuro in basso */
.header-section {
    position: relative;
    margin-top: 110px;
    background: linear-gradient(135deg, #3F8EC2 20%, #1A4870 100%);
    /* Più percentuali: #3F8EC2 (azzurro) → #1A4870 (blu scuro) */
    color: #fff; 
    overflow: hidden; /* Nel caso ci siano elementi in overflow */
    
    /* Altezza minima per “hero” */
    min-height: 200px;
    
    @media (max-width: 768px) {
        min-height: 200px;
    }
}

/* Il carousel ora è trasparente, per non "impastare" i colori */
.carousel-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    
    @media (max-width: 768px) {
        display: none !important;
    }
}

/* Animazione orizzontale del carousel */
.carousel {
    display: flex;
    animation: scroll 90s linear infinite;
    align-items: center;
    height: auto;
    min-height: 100px;
    padding: 20px 0;
    position: relative;
    z-index: 1;
}

.carousel img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    object-fit: contain;
    filter: brightness(0.9);
    transition: filter 0.3s ease, transform 0.3s ease;
    
    &:hover {
        filter: brightness(1);
        transform: scale(1.05);
    }
}

/* Overlay leggero per leggere meglio il testo */
.header-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); /* overlay più leggero */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    padding: 0 20px;
    z-index: 10;
    
    h1 {
        margin-bottom: 15px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        
        @media (max-width: 768px) {
            font-size: 2rem !important;
            margin-bottom: 10px;
        }
        
        @media (max-width: 576px) {
            font-size: 1.8rem !important;
            margin-bottom: 8px;
        }
    }
    
    p {
        font-size: 1.2rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        
        @media (max-width: 768px) {
            font-size: 1rem !important;
        }
        
        @media (max-width: 576px) {
            font-size: 0.9rem !important;
        }
    }
}

/* Animazione carousel */
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

/* ------------------------------------------------------
   SEZIONE PROGETTI
------------------------------------------------------ */
/* Sfondo bianco o grigio chiaro per contrastare con l’header */
.projects-section {
    background-color: #fff; 
    padding: 40px 0;
    
    @media (min-width: 992px) {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        .container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    
    @media (max-width: 991px) and (min-width: 769px) {
        padding: 40px 0;
        min-height: 60vh;
    }
    
    @media (max-width: 768px) {
        padding: 25px 0;
        min-height: 50vh;
    }
}

.projects-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    position: relative;
    
    @media (min-width: 992px) {
        margin-bottom: 30px;
    }
    
    @media (max-width: 991px) and (min-width: 769px) {
        margin-bottom: 40px;
    }
    
    @media (max-width: 768px) {
        margin-bottom: 25px;
        gap: 20px;
    }
    
    @media (max-width: 576px) {
        margin-bottom: 20px;
        gap: 15px;
    }
}

.project-animation {
    opacity: 0;
    transform: translateY(20px) translateZ(0);
    transition: opacity 0.8s ease, transform 0.8s ease, box-shadow 0.4s ease, filter 0.4s ease;
    position: relative;
    background-color: none;
    border: none;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    
    &.show {
        opacity: 1;
        transform: translateY(0) translateZ(0);
    }
    
    &:hover {
        filter: brightness(1.03);
    }
    
    &:focus,
    &:active {
      outline: none;
      border: none;
    }
}

/* Dim sulle altre card quando se ne passa sopra una */
.projects-container:hover .project-animation:not(:hover) {
    filter: brightness(0.9);
    transform: scale(0.98);
}

/* Mobile: animazioni da destra/sinistra */
@media (max-width: 768px) {
  .project-animation {
    opacity: 0;
    transform: translateX(100%) translateZ(0);
    transition: transform 0.8s ease, opacity 0.8s ease;
  }
  .project-animation.show {
    opacity: 1;
    transform: translateX(0) translateZ(0);
  }
  .project-animation.hide-up {
    opacity: 0;
    transform: translateX(-100%) translateZ(0);
  }
  .project-animation.hide-down {
    opacity: 0;
    transform: translateX(100%) translateZ(0);
  }
  .project-animation:hover {
    box-shadow: none;
  }
}

/* ------------------------------------------------------
   PAGINAZIONE
------------------------------------------------------ */
.pagination-container {
    display: flex;
    justify-content: center;
    
    @media (min-width: 992px) {
        margin: 30px 0;
    }
    
    @media (max-width: 991px) and (min-width: 769px) {
        margin: 30px 0 60px;
    }
    
    @media (max-width: 768px) {
        margin: 20px 0 50px;
    }
}

.pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    
    .page-item {
        padding: 10px 15px;
        background-color: white;
        color: #1A4870;
        cursor: pointer;
        transition: all 0.3s ease;
        border-right: 1px solid #e9ecef;
        user-select: none;
        font-size: 16px;
        
        &:last-child {
            border-right: none;
        }
        
        &:hover:not(.active):not(.disabled) {
            background-color: #e9ecef;
        }
        
        &.active {
            background-color: #1A4870;
            color: white;
            font-weight: bold;
        }
        
        &.disabled {
            color: #6c757d;
            cursor: not-allowed;
            background-color: #f8f9fa;
        }
        
        @media (max-width: 576px) {
            padding: 8px 12px;
            font-size: 14px;
        }
    }
}

/* ------------------------------------------------------
   STATI DI CARICAMENTO / ERRORE
------------------------------------------------------ */
.loading-container, .error-container, .no-projects {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    text-align: center;
    
    @media (max-width: 768px) {
        padding: 30px 0;
    }
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    
    .spinner-border {
        width: 3rem;
        height: 3rem;
        color: #1A4870;
        
        @media (max-width: 576px) {
            width: 2.5rem;
            height: 2.5rem;
        }
    }
}

.error-container {
    max-width: 500px;
    margin: 0 auto;
    
    .alert {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>