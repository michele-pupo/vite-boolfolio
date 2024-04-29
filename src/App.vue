<script>

import axios from 'axios';

export default {
    data() {
        return {
            projects: [],

            baseApiUrl: 'http://127.0.0.1:800/api',
        }
    },

    mounted() {

        axios.get(this.baseApiUrl + '/projects').then(res => {

            console.log(res);

            this.projects = res.data.results;

        })
    },

    methods: {

    },
}
</script>

<template>
 <div class="container py-4"> 
    <h1>I nostri progetti</h1>

    <ul>
        <li v-for="project in projects">
            {{ project.title }}
        </li>
    </ul>

 </div>
</template>

<style lang="scss">

</style>
