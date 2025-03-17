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
        }
    },

    mounted() {
        // Check if device is mobile based on screen width
        this.checkDeviceType();
        
        // Add event listener for screen resize
        window.addEventListener('resize', this.checkDeviceType);
        
        // Initial API call based on device type
        this.loadProjects();
    },
    
    beforeUnmount() {
        // Remove event listener when component is destroyed
        window.removeEventListener('resize', this.checkDeviceType);
    },

    methods: {
        checkDeviceType() {
            const wasAlreadyMobile = this.isMobile;
            // Changed from 768px back to 992px to ensure pagination appears on all tablets
            this.isMobile = window.innerWidth < 992;
            // Only reload if device type changed
            if (wasAlreadyMobile !== this.isMobile) {
                this.loadProjects();
            }
        },
        
        loadProjects() {
            if (this.isMobile) {
                this.apiCallAll();
            } else {
                this.apiCall();
            }
        },
        
        // API call for desktop (with pagination)
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
                }
            }).catch(error => {
                console.error("Error fetching projects:", error);
                this.isLoading = false;
                this.error = "Si è verificato un errore durante il caricamento dei progetti.";
            });
        },

        // API call for mobile (loads all projects)
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
                }
            }).catch(error => {
                console.error("Error fetching all projects:", error);
                this.isLoading = false;
                this.error = "Si è verificato un errore durante il caricamento dei progetti.";
            });
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
            
            // Scroll to top of projects section
            document.querySelector('#projects-section').scrollIntoView({ behavior: 'smooth' });
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column my_home">
        <!-- Header section with carousel -->
        <div class="header-section">
            <div class="carousel-wrapper">
                <div class="carousel">
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
                    <!-- Duplicate images for continuous carousel -->
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
                    <!-- Duplicate images for continuous carousel -->
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
                    <!-- Duplicate images for continuous carousel -->
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
            <div class="header-overlay">
                <div class="container">
                    <h1 class="text-uppercase fw-bold display-3">I miei progetti</h1>
                    <p class="lead text-center mb-0">Scopri il mio portfolio di soluzioni web</p>
                </div>
            </div>
        </div>
        
        <!-- Projects section -->
        <section id="projects-section" class="projects-section">
            <div class="container">
                <div v-if="!isLoading && !error">
                    <!-- Projects container with responsive layout -->
                    <div class="projects-container">
                        <AppProject 
                            v-for="currentProject in projects"
                            :key="currentProject.slug"
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

                    <!-- No projects message -->
                    <div v-if="projects.length === 0" class="no-projects">
                        <p>Nessun progetto disponibile al momento.</p>
                    </div>

                    <!-- Modified pagination display logic -->
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

                <!-- Error message -->
                <div v-else-if="error" class="error-container">
                    <div class="alert alert-danger" role="alert">
                        {{ error }}
                        <button class="btn btn-outline-danger mt-3" @click="loadProjects">Riprova</button>
                    </div>
                </div>

                <!-- Loading indicator -->
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
.my_home {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 80px; /* Added padding at the bottom to prevent projects from being cut off */
}

// Header section
.header-section {
    position: relative;
    height: 300px;
    overflow: hidden;
    margin-bottom: 40px;
}

.carousel-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #1A4870;
}

.carousel {
    display: flex;
    animation: scroll 25s linear infinite;
    height: 100%;
    align-items: center;
}

.carousel img {
    width: 100px;
    height: auto;
    margin-right: 20px;
    object-fit: contain;
    filter: brightness(0.8);
    transition: filter 0.3s ease, transform 0.3s ease;
    
    &:hover {
        filter: brightness(1);
        transform: scale(1.05);
    }
}

.header-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    padding: 0 20px;
    
    h1 {
        margin-bottom: 15px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    p {
        font-size: 1.2rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

// Projects section
.projects-section {
    padding: 40px 0;
    background-color: #f8f9fa;
    min-height: 60vh; /* Ensure minimum height to give space for all content */
}

.projects-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-bottom: 40px; /* Space for pagination */
}

// Pagination styles improved
.pagination-container {
    display: flex;
    justify-content: center;
    margin: 30px 0 60px; /* Added bottom margin */
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
        font-size: 16px; /* Added explicit font size */
        
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
    }
}

// Loading and error states
.loading-container, .error-container, .no-projects {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    text-align: center;
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

// Responsive styles adjusted
@media (max-width: 1200px) {
    // Large devices
    .projects-container {
        gap: 20px;
    }
}

@media (max-width: 991px) {
    // Medium devices (tablets, desktops)
    .header-section {
        height: 350px;
    }
    
    .carousel img {
        width: 95px;
    }
    
    // Styles for projects on tablets
    .projects-container {
        gap: 15px;
    }
}

@media (max-width: 768px) {
    // Small devices (portrait tablets and large phones)
    .projects-container {
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
    }
    
    .header-section {
        height: 400px;
    }
    
    .header-overlay {
        h1 {
            font-size: 2rem;
        }
        
        p {
            font-size: 1rem;
        }
    }
    
    .carousel-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .carousel {
        position: relative;
        top: 0;
        height: auto;
    }
    
    // Ensure projects have enough margin at the bottom
    .my_home {
        padding-bottom: 100px;
    }
}

@media (max-width: 576px) {
    // Extra small devices (phones)
    .carousel {
        align-items: center;
    }
    
    .carousel img {
        width: 80px;
        margin-right: 15px;
    }
    
    .header-overlay {
        h1 {
            font-size: 1.8rem;
        }
    }
    
    // Ensure projects have enough margin at the bottom
    .my_home {
        padding-bottom: 120px;
    }
    
    // Reduce project container bottom margin
    .projects-container {
        margin-bottom: 20px;
    }
}
</style>