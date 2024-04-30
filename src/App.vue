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

            baseApiUrl: 'http://127.0.0.1:8000/api',
        }
    },

    mounted() {

        axios.get(this.baseApiUrl + '/projects').then(res => {

            // console.log(res.data.result.data);

            this.projects = res.data.result.data;

        })
    },

    methods: {

    },
}
</script>

<template>

   <!-- <AppMain></AppMain> -->

   <ul>
      <li v-for="project in projects">
         {{ project.name }}
      </li>
   </ul>

</template>

<style lang="scss">

</style>
