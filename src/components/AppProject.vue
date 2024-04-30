<script>

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
    },

    data() {
        return {
            baseApiUrl: 'http://127.0.0.1:8000/storage/',
        }
    },


}

</script>

<template>

    <div class="container py-5">
        <div class="card" style="width: 18rem;">
            <img :src="this.baseApiUrl + projectImage" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ projectName }}</h5>
                <p class="card-text">{{ projectDescription }}</p>
                <div class="card-date">{{ projectDate }}</div>
                <div class="card-link text-info">{{ projectLink }}</div>
                <div class="card-tech text-danger" v-for="tech in projectTechnolgies">{{ tech.title }}</div>
                <div class="card-type text-success">{{ projectType }}</div>
                <div class="btn btn-primary">Visualizza</div>
            </div>
        </div>
    </div>

</template>

<style lang="scss">

</style>