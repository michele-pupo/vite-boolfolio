<script>

export default {

    name: 'AppProject',

    props: {
        projectName: String,
        projectDescription: String,
        projectImage: String,
        projectDate: String,
        projectLink: String,
    },


}

</script>

<template>

    <div class="container py-5">
        <div class="card" style="width: 18rem;">
            <img :src="projectImage" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ projectName }}</h5>
                <p class="card-text">{{ projectDescription }}</p>
                <!-- <p class="card-text">Tecnologie</p> -->
                <div class="card-date">{{ projectDate }}</div>
                <div class="card-link">{{ projectLink }}</div>
                <a href="#" class="btn btn-primary">Visualizza</a>
            </div>
        </div>
    </div>

</template>

<style lang="scss">

</style>