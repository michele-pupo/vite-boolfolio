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
            visibleProjects: [], // Track which projects are visible for animation
            lastScrollY: window.scrollY,
            scrollDirection: 'down'
        }
    },

    mounted() {
        // Check if device is mobile based on screen width
        this.checkDeviceType();
        
        // Add event listener for screen resize
        window.addEventListener('resize', this.checkDeviceType);
        
        // Initial API call based on device type
        this.loadProjects();
        
        // Add scroll event listener for animations
        window.addEventListener('scroll', this.checkProjectVisibility);
    },
    
    beforeUnmount() {
        // Remove event listeners when component is destroyed
        window.removeEventListener('resize', this.checkDeviceType);
        window.removeEventListener('scroll', this.checkProjectVisibility);
    },
    
    updated() {
        // Setup intersection observer after projects are loaded
        if (this.projects.length > 0 && this.visibleProjects.length === 0) {
            this.$nextTick(() => {
                this.setupIntersectionObserver();
            });
        }
    },

    methods: {
        checkDeviceType() {
            const wasAlreadyMobile = this.isMobile;
            // Changed from 768px back to 992px to ensure pagination appears on all tablets
            this.isMobile = window.innerWidth < 992;
            // Only reload if device type changed
            if (wasAlreadyMobile !== this.isMobile) {
                this.loadProjects();
                
                // Reset visibility when switching device types
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
                    // Initialize visibility array
                    this.resetProjectVisibility();
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
                    // Initialize visibility array for all projects
                    this.resetProjectVisibility();
                    
                    // Setup intersection observer after DOM update
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
        
        // Reset all projects to invisible state
        resetProjectVisibility() {
            this.visibleProjects = Array(this.projects.length).fill(false);
            // Force check visibility after reset
            this.$nextTick(() => {
                this.checkProjectVisibility();
            });
        },
        
        setupIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1 // Reduced threshold so animation starts sooner
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const index = parseInt(entry.target.dataset.index);
                    if (!isNaN(index)) {
                        if (entry.isIntersecting) {
                            // Add a slight delay based on index to create a cascading effect
                            setTimeout(() => {
                                this.visibleProjects[index] = true;
                            }, index * 150); // 150ms delay between each project
                        } else {
                            // Reset visibility when project is out of view
                            this.visibleProjects[index] = false;
                        }
                    }
                });
            }, options);
            
            // Observe all project elements
            document.querySelectorAll('.project-item').forEach(el => {
                observer.observe(el);
            });
        },
        
        checkProjectVisibility() {
            const currentScrollY = window.scrollY;
            // Update scroll direction
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

        // Restituisce le classi per animare in base al dispositivo e alla direzione dello scroll
        projectAnimationClass(index) {
            const base = 'project-animation';
            if (this.isMobile) {
                if (this.visibleProjects[index]) {
                    return [base, 'show'];
                } else {
                    // Se scroll verso l'alto, esce verso sinistra; altrimenti verso destra
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
            
            // Scroll to top of projects section
            document.querySelector('#projects-section').scrollIntoView({ behavior: 'smooth' });
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column my_home">
        <!-- Header section - with carousel only on desktop -->
        <div class="header-section">
            <!-- Carousel only shown on desktop -->
            <div class="carousel-wrapper" v-if="!isMobile">
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
                </div>
            </div>
            <!-- Header overlay always visible on all devices -->
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
    
    // On desktop, use flex layout to distribute elements vertically
    @media (min-width: 992px) {
        padding-bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    // On mobile, keep the bottom padding to prevent projects from being cut off
    @media (max-width: 991px) {
        padding-bottom: 80px;
    }
}

// Header section - adjusted for better appearance on all screen sizes
.header-section {
    position: relative;
    background-color: #1A4870;
    
    // Desktop header height
    @media (min-width: 992px) {
        height: 300px;
        margin-bottom: 50px;
    }
    
    // Tablet header height
    @media (max-width: 991px) and (min-width: 769px) {
        height: 250px;
        margin-bottom: 40px;
    }
    
    // Small tablet/large mobile header height
    @media (max-width: 768px) {
        height: 200px !important; // !important to override other styles
        min-height: 200px !important;
        margin-bottom: 30px;
    }
    
    // Small mobile devices
    @media (max-width: 576px) {
        height: 180px !important;
        min-height: 180px !important;
        margin-bottom: 25px;
    }
}

.carousel-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #1A4870;
    display: flex;
    align-items: center;
    justify-content: center;
    
    // Hide carousel on mobile
    @media (max-width: 768px) {
        display: none !important;
    }
}

.carousel {
    display: flex;
    animation: scroll 25s linear infinite;
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
    background-color: rgba(26, 72, 112, 0.9); // #1A4870 with opacity
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    padding: 0 20px;
    z-index: 10; // Increased z-index to ensure it's above everything
    
    h1 {
        margin-bottom: 15px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        
        // Ensure text is visible on smaller screens
        @media (max-width: 768px) {
            font-size: 2rem !important;
            margin-bottom: 10px;
            display: block !important;
            width: 100% !important;
            text-align: center !important;
        }
        
        @media (max-width: 576px) {
            font-size: 1.8rem !important;
            margin-bottom: 8px;
        }
    }
    
    p {
        font-size: 1.2rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        
        // Ensure subtitle is visible on smaller screens
        @media (max-width: 768px) {
            font-size: 1rem !important;
            display: block !important;
            width: 100% !important;
            text-align: center !important;
        }
        
        @media (max-width: 576px) {
            font-size: 0.9rem !important;
        }
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
    background-color: #f8f9fa;
    
    // On desktop, use flex layout with better vertical distribution
    @media (min-width: 992px) {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 40px 0;
        
        // Container should also flex to fill the space
        .container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
    
    // On tablet, keep the original padding
    @media (max-width: 991px) and (min-width: 769px) {
        padding: 40px 0;
        min-height: 60vh;
    }
    
    // On mobile, reduce padding for better space utilization
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
    
    // Adjusted for better spacing on desktop
    @media (min-width: 992px) {
        margin-bottom: 30px;
    }
    
    // Keep original margin for tablet view
    @media (max-width: 991px) and (min-width: 769px) {
        margin-bottom: 40px;
    }
    
    // Reduced margin for mobile view
    @media (max-width: 768px) {
        margin-bottom: 25px;
        gap: 20px;
    }
    
    // Even smaller margin for smallest screens
    @media (max-width: 576px) {
        margin-bottom: 20px;
        gap: 15px;
    }
}

// Project animation and hover effect
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
        filter: brightness(1.05);
    }
    
    &:focus,
    &:active {
      outline: none;
      border: none;
    }
}

// Add a parent hover effect to dim other projects
.projects-container:hover .project-animation:not(:hover) {
    filter: brightness(0.7);
    transform: scale(0.95);
}

// Mobile specific animations for project items
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
  /* Quando scrolli verso l'alto, nascondi con effetto da sinistra */
  .project-animation.hide-up {
    opacity: 0;
    transform: translateX(-100%) translateZ(0);
  }
  /* Quando scrolli verso il basso, nascondi con effetto da destra */
  .project-animation.hide-down {
    opacity: 0;
    transform: translateX(100%) translateZ(0);
  }
  .project-animation:hover {
    box-shadow: none;
  }
}

// Pagination styles
.pagination-container {
    display: flex;
    justify-content: center;
    
    // Adjust margin for desktop view
    @media (min-width: 992px) {
        margin: 30px 0;
    }
    
    // Keep original margin for tablet view
    @media (max-width: 991px) and (min-width: 769px) {
        margin: 30px 0 60px;
    }
    
    // Reduced margin for mobile view
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
        
        // Adjusted padding for smaller screens
        @media (max-width: 576px) {
            padding: 8px 12px;
            font-size: 14px;
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
    
    // Reduced padding on mobile
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
        
        // Slightly smaller on mobile
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

// Responsive styles - refined for different breakpoints
@media (max-width: 1200px) {
    // Large devices
    .projects-container {
        gap: 25px;
    }
}

@media (max-width: 991px) {
    // Medium devices (tablets, desktops)
    .projects-container {
        gap: 20px;
    }
}

@media (max-width: 768px) {
    // Small devices (portrait tablets and large phones)
    .projects-container {
        flex-direction: column;
        align-items: center;
    }
    
    // Optimize spacing for mobile
    .my_home {
        padding-bottom: 80px;
    }
    
    // Add negative margin to compensate for header margin if needed
    #projects-section {
        margin-top: -10px;
    }
}

@media (max-width: 576px) {
    // Extra small devices (phones)
    // Ensure projects have enough margin at the bottom
    .my_home {
        padding-bottom: 70px;
    }
}

</style>