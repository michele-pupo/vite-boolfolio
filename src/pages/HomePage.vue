<script>
// import AppMain from './components/AppMain.vue';
import AppProject from '../components/AppProject.vue';

import axios from 'axios';

export default {
    name: 'HomePage',

    components: { 
        // AppMain,
        AppProject,
    },

    data() {
        return {
            projects: [],

            // link ai vari endpoint dell'api per vedere le varie pagine dei post
            apiLinks: [],

            // variabile che tiene traccia della pagina corrente
            // per la chiamata api
            apiPageNumber: 1,

            // variabile per il loader
            isLoading: true,

            baseApiUrl: 'http://127.0.0.1:8000/api',
        }
    },

    mounted() {
        this.apiCall();
    },

    methods: {
        apiCall() {
            // implementiamo il loader
            // impostiamo la variabile isLoading a true
            this.isLoading = true;

            axios.get(this.baseApiUrl + '/projects', {
                params: {
                    page: this.apiPageNumber, 
                } 
            }).then(res => {
                // solo quando riceviamo una risposta di successo
                if(res.data.success) {
                    // impostiamo isLoading a false
                    this.isLoading = false;
                }

                this.projects = res.data.result.data;
                this.apiLinks = res.data.result.links;
            })
        },

        changeApiPage(pageNumber) {
            if(pageNumber == '&laquo; Previous') {
                this.apiPageNumber = Number(this.apiPageNumber) - 1;
            } else if(pageNumber == 'Next &raquo;') {
                this.apiPageNumber = Number(this.apiPageNumber) + 1;
            } else {
                this.apiPageNumber = pageNumber;
            }
            this.apiCall();
        },
    },
}
</script>

<template>

        <div class="d-flex flex-column container py-5">
            <div class="carousel-wrapper">
                <div class="carousel">
                    <img src="/1_OrjCKmou1jT4It5so5gvOA_preview_rev_1.png" alt="Vue.js">
                    <img src="/1698604163003.png" alt="Javascript">
                    <img src="/css.png" alt="Css">
                    <img src="/353261.png" alt="Php">
                    <img src="/eceb15684d4183c66f73c1a9bb777eef708b2b66.png" alt="Mysql">
                    <img src="/fposter,small,wall_texture,product,750x1000_preview_rev_1.png" alt="Vite">
                    <img src="/HTML5_logo_and_wordmark.svg.png" alt="Html5">
                    <img src="/laravel-featured_preview_rev_1.png" alt="Laravel">
                    <img src="/sass-icon-1024x1024-kn7u23pl.png" alt="Sass">
                    <!-- Duplicazione delle immagini per un carosello continuo -->
                    <img src="/1_OrjCKmou1jT4It5so5gvOA_preview_rev_1.png" alt="Vue.js">
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
            <h1 class="text-center text-uppercase fw-bold py-5">Progetti</h1>

            <div v-if="!isLoading">
                <div class="container d-flex justify-content-center">
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
                    >
                    </AppProject>
                </div>

                <div class="pages d-flex justify-content-center pt-5">
                    <ul class="">
                        <li v-html="apiLinks[0].label" 
                            :class="apiPageNumber == 1 ? 'none' : ''"
                            @click="changeApiPage(apiLinks[0].label)"
                        ></li>
                        <li 
                            v-for="link in apiLinks.slice(1, -1)"
                            v-html="link.label" 
                            @click="changeApiPage(link.label)" 
                            v-bind:class="{ 'active' : link.label == apiPageNumber }"
                        ></li>
                        <li v-html="apiLinks[apiLinks.length - 1].label" 
                            :class="apiPageNumber == apiLinks.length - 2 ? 'none' : ''"
                            @click="changeApiPage(apiLinks[apiLinks.length - 1].label)"
                        ></li>
                    </ul>
                </div>
            </div>

            <div v-else class="centered">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
</template>

<style lang="scss">

.carousel-wrapper {
  width: 100%; /* Larghezza del carosello */
  overflow: hidden; /* Nasconde le immagini che escono dal bordo */
  background-color: #f0f0f0;
}

.carousel {
  display: flex;
  animation: scroll 30s linear infinite; /* Animazione infinita */
}

.carousel img {
  width: 150px; /* Larghezza delle immagini */
  height: auto; /* Mantiene le proporzioni */
  margin-right: 20px; /* Spazio tra le immagini */
  object-fit: contain; /* Garantisce che l'immagine non venga deformata */
}

@keyframes scroll {
  0% {
    transform: translateX(0); /* Inizio senza scorrimento */
  }
  100% {
    transform: translateX(-50%); /* Scorrere esattamente metà della lunghezza totale per mantenere l'effetto continuo */
  }

  0% {
    transform: translateX(0); /* Inizio senza scorrimento */
  }
}

.pages {
    ul {
        display: flex;
        gap: 10px;
        list-style-type: none;

        li {
            padding: 8px;
            transition: all .3s ease;
            cursor: pointer;
            &:hover, &.active{
                background-color: rgba(255, 255, 255, 0.4);
            }

            &.none {
                display: none;
            }
        }
    }
}

.centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
