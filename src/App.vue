<script>


// import AppMain from './components/AppMain.vue';
import AppProject from './components/AppProject.vue';



import axios from 'axios';

export default {
   components: { 
      // AppMain,
      AppProject,
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
   <div class="container d-flex">
      <AppProject 
         v-for="currentProject in projects"
         :projectName="currentProject.name"
         :projectDescription="currentProject.description"
         :projectImage="currentProject.project_image"
         :projectDate="currentProject.project_date"
         :projectLink="currentProject.link_github"
      >
      </AppProject>

   </div>


</template>

<style lang="scss">

</style>
