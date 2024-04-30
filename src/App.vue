<script>

import AppMain from './components/AppMain.vue';

export default {
   components: {
      
      AppMain,
   } 
}

import AppMain from './components/AppMain.vue';

export default {
   components: {
      
      AppMain,
   } 
}

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

   <AppMain></AppMain>

</template>

<style lang="scss">

</style>
