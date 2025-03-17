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
        projectType: String,
        project: Object,
        nonClickable: {
            type: Boolean,
            default: false
        }
    },
    
    data() {
        return {
            baseApiUrl: 'http://127.0.0.1:8000/storage/',
            imageLoaded: false,
            imageError: false
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
        }
    },
}
</script>

<template>
    <div class="project-card">
        <div class="card">
            <!-- Card Header -->
            <div class="card-header">
                <h2 class="card-title text-black fw-bold">{{ projectName }}</h2>
                <div class="card-type">{{ projectType }}</div>
            </div>
            
            <!-- Card Image con overlay di caricamento -->
            <div class="card-image-container">
                <div v-if="!imageLoaded && !imageError" class="image-placeholder">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <img 
                    :src="baseApiUrl + projectImage" 
                    class="card-img-top" 
                    :alt="projectName"
                    @load="handleImageLoad"
                    @error="handleImageError"
                    :class="{ 'non-clickable': nonClickable }"
                >
                <div v-if="imageError" class="image-error">
                    <i class="fas fa-image"></i>
                    <p>Immagine non disponibile</p>
                </div>
            </div>
            
            <!-- Card Body -->
            <div class="card-body">
                <!-- Data progetto -->
                <div class="card-date">
                    <i class="fas fa-calendar-alt"></i>
                    {{ formatDate(projectDate) }}
                </div>
                
                <!-- Descrizione breve -->
                <div class="card-description" :class="{ 'non-clickable': nonClickable }">
                    {{ projectDescription.length > 100 ? projectDescription.substring(0, 100) + '...' : projectDescription }}
                </div>
                
                <!-- Tecnologie utilizzate -->
                <div class="card-technologies">
                    <span 
                        v-for="tech in projectTechnolgies" 
                        :key="tech.id"
                        class="technology-badge" 
                        :style="{ backgroundColor: tech.color }"
                        :class="{ 'non-clickable': nonClickable }"
                    >
                        {{ tech.title }}
                    </span>
                </div>
                
                <!-- Pulsanti azione -->
                <div class="card-actions">
                    <router-link 
                        :to="{name: 'single-project', params: {slug: project.slug}}" 
                        class="btn btn-details"
                    >
                        <i class="fas fa-info-circle"></i> Dettagli
                    </router-link>
                    
                    <a 
                        :href="projectLink" 
                        target="_blank" 
                        class="btn btn-visit" 
                        rel="noopener noreferrer"
                    >
                        <i class="fas fa-external-link-alt"></i> Visita
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.project-card {
    width: 100%;
    max-width: 400px;
    transition: transform 0.3s ease;
    margin-bottom: 20px;
    
    &:hover {
        transform: translateY(-5px);
    }
}

.card {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    background-color: #F9DBBA;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .card-header {
        background-color: rgba(0, 0, 0, 0.03);
        padding: 15px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        
        .card-title {
            margin-bottom: 5px;
            font-size: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .card-type {
            font-weight: 600;
            color: #28a745;
            font-size: 1.1rem;
        }
    }
    
    .card-image-container {
        position: relative;
        height: 200px;
        overflow: hidden;
        
        .card-img-top {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
            
            &:hover:not(.non-clickable) {
                transform: scale(1.05);
            }
            
            &.non-clickable {
                pointer-events: none;
                user-select: none;
            }
        }
        
        .image-placeholder, .image-error {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        .image-error {
            color: #6c757d;
            
            i {
                font-size: 2rem;
                margin-bottom: 10px;
            }
            
            p {
                margin: 0;
            }
        }
    }
    
    .card-body {
        padding: 20px;
        flex-grow: 1;
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
            font-size: 0.95rem;
            line-height: 1.5;
            
            &.non-clickable {
                user-select: none;
            }
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
                
                &.non-clickable {
                    user-select: none;
                    pointer-events: none;
                }
            }
        }
        
        .card-actions {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: auto;
            
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
                
                &.btn-details {
                    background-color: #007bff;
                    color: white;
                    
                    &:hover {
                        background-color: #0069d9;
                    }
                }
                
                &.btn-visit {
                    background-color: #fd7e14;
                    color: white;
                    
                    &:hover {
                        background-color: #e67212;
                    }
                }
            }
        }
    }
}

// Classe per impedire la selezione del testo
.non-clickable {
    user-select: none;
    pointer-events: none;
}
</style>