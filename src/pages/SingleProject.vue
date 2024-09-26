<script>

import axios from 'axios';
import { router } from '../router'

export default{
    name:'SingleProject',
     
    data(){
        return{
            project: null,
            projectId: null,

            apiBaseUrl: 'http://127.0.0.1:8000/api',

            apiImageUrl: 'http://127.0.0.1:8000/storage/',
        }
    },

    mounted() {
        // recuperiamo il parametro dell'id del project dall'url
        console.log(this.$route.params.slug);
        this.projectSlug = this.$route.params.slug;

        axios.get(this.apiBaseUrl + '/projects/' + this.projectSlug).then(res => {
            console.log(res);

            if (res.data.success) {
                // se troviamo il project lo salviamo
                this.project = res.data.result;
            } else {
                // torniamo indietro alla home
                this.$router.push({ name: 'home' });
            }
        });
    }
}

</script>



<template>

    <div class="container py-5 my_project">
        <div class="text-center" v-if="project">
            <h2 class="display-2 fw-bold pt-5">{{ project.name }}</h2>
            <img :src="this.apiImageUrl + project.project_image" class="card-img-top w-100" alt="{{ project.name }}">
            <p class="py-5 fs-3">{{ project.description }}</p>
            <div class="tech py-3">
                <span 
                    v-for="tech in project.technologies" 
                    class="badge rounded-pill text-black text-uppercase fw-bold fs-4 tech-badge me-3" 
                    :style="{ backgroundColor: tech.color }">
                    {{ tech.title }}
                </span>
            </div>
            <button class="btn btn-custom mt-5 fs-1">
                <a class="text-info" :href="project.link_github" target="_blank">Sito progetto</a>
            </button>
            <div class="pt-5">
                <router-link to="/" class="btn btn-secondary">Indietro</router-link>
            </div>
            
        </div>
        <div v-else>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    
</template>



<style lang="scss" scoped>
    .my_project{
        height: 1900px;
        background-color: #1A4870;

        .btn-custom {
            background-color: #28a745; /* Verde */
            color: white; /* Colore del testo */
            transition: transform 0.2s; /* Transizione per l'animazione */

            &:hover {
                animation: pulse 1s infinite; /* Aggiungi animazione al passaggio del mouse */
            }
        }

        @keyframes pulse {
            0% {
                transform: scale(1); /* Dimensione normale */
            }
            50% {
                transform: scale(1.1); /* Dimensione ingrandita */
            }
            100% {
                transform: scale(1); /* Dimensione normale */
            }
        }

        a{
            text-decoration: none;
        }
    }

</style>