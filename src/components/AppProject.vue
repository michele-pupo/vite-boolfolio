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

    <div class="container py-5">
        <div class="card text-center">
            <img :src="this.baseApiUrl + projectImage" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold fs-1">{{ projectName }}</h5>

                <div class="desc-container">
                    <p class="card-text">{{ projectDescription }}</p>
                </div>

                <div class="card-date">{{ formatDate(projectDate) }}</div>
                <div class="card-link text-info">{{ projectLink }}</div>
                <div class="card-tech text-danger" v-for="tech in projectTechnolgies">{{ tech.title }}</div>
                <div class="card-type text-success">{{ projectType }}</div>
                <router-link :to="{name: 'single-project', params: {slug: project.slug}}" class="btn btn-primary">Visualizza</router-link>
            </div>
        </div>
    </div>


</template>

<style lang="scss">


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
    }
}

</style>