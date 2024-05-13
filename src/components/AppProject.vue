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

    <div class="container p-5 gradient-bg">
        <div class="card text-center">
            <h2 class="card-title fw-bold fs-1">{{ projectName }}</h2>
            <img :src="this.baseApiUrl + projectImage" class="card-img-top px-3" alt="{{ projectName }}">
            <div class="card-body">
                
                <div class="card-date">{{ formatDate(projectDate) }}</div>
                <div class="card-tech text-danger" v-for="tech in projectTechnolgies">{{ tech.title }}</div>
                <div class="card-type text-success mb-3">{{ projectType }}</div>
                <div class="card-link d-flex gap-3 justify-content-center">
                    <button class="btn btn-primary"><a :href="projectLink" target="_blank">Link progetto</a></button>
                    <router-link :to="{name: 'single-project', params: {slug: project.slug}}" class="btn btn-info">Specifiche progetto</router-link>
                </div>
                
            </div>
        </div>
    </div>

</template>

<style lang="scss">

.gradient-bg {
    background: linear-gradient(to bottom, #87CEEB, #D8BFD8);
}


.card {

    .card-body{

        .desc-container {
            height: 200px;
            overflow: hidden;

            .card-text{
                height: 100%;
                overflow-y: auto;
            }
        }

        .card-link{
            a{
                text-decoration: none;
            }
        }
    }
}

</style>