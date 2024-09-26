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
    },

    data() {
        return {
            baseApiUrl: 'http://127.0.0.1:8000/storage/',
        }
    },

    methods: {
        formatDate(date) {
            dayjs.locale('it'); // Impostiamo il "locale" in italiano
            return dayjs(date).format('DD/MM/YYYY'); // formattazione italiana della data
        },
    },

}

</script>

<template>

    <div class="container">
        <div class="card text-center">
            <h2 class="card-title text-black fw-bold fs-1 pt-3">{{ projectName }}</h2>
            <img :src="this.baseApiUrl + projectImage" class="card-img-top px-3" alt="{{ projectName }}">
            <div class="card-body">
                
                <div class="card-date text-danger fw-bold pb-2">{{ formatDate(projectDate) }}</div>
                <div class="card-type text-success mb-3 fw-bold fs-3">{{ projectType }}</div>
                <span v-for="tech in projectTechnolgies" class="badge rounded-pill text-black text-uppercase fw-bold mb-3 me-2" :style="{ backgroundColor: tech.color }">
                    {{ tech.title }}
                </span>
                <div class="card-link d-flex gap-3 justify-content-center">
                    <router-link :to="{name: 'single-project', params: {slug: project.slug}}" class="btn btn-custom-info">Specifiche progetto</router-link>
                    <button class="btn btn-custom-primary">
                        <a class="text-black" :href="projectLink" target="_blank">Sito progetto</a>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss">

.card {

    background-color: #F9DBBA;

    .card-body{

        .card-text{
            height: 100%;
        }
        
        .card-link{

            .btn-custom-info {
                background-color: #007bff; /* Blu accattivante */
                color: white; /* Colore del testo */
                transition: transform 0.2s; /* Transizione per l'animazione */

                &:hover {
                    animation: pulse 1s infinite; /* Aggiungi animazione al passaggio del mouse */
                }
            }

            .btn-custom-primary {
                background-color: #fd7e14; /* Arancione accattivante */
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
    }
}

</style>