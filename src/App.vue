<script>


import AppMain from './components/AppMain.vue';



import axios from 'axios';

export default {
   components: {
      
      AppMain,
   },

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

   <AppMain></AppMain>

</template>

<style lang="scss">

</style>
