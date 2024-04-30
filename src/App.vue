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

            // link ai vari endpoint dell'api per vedere le varie pagine dei post
            apiLinks: [],

            baseApiUrl: 'http://127.0.0.1:8000/api',
        }
    },

    mounted() {

        axios.get(this.baseApiUrl + '/projects').then(res => {

            // console.log(res.data.result.links);

            this.projects = res.data.result.data;

            this.apiLinks = res.data.result.links;

        })
    },

    methods: {

    },
}
</script>

<template>

   <!-- <AppMain></AppMain> -->
   <div class="container">
      <div class="projects d-flex justify-content-between">
         <AppProject 
            v-for="currentProject in projects"
            :projectName="currentProject.name"
            :projectDescription="currentProject.description"
            :projectImage="currentProject.project_image"
            :projectDate="currentProject.project_date"
            :projectLink="currentProject.link_github"
            :projectTechnolgies="currentProject.technologies"
            :projectType="currentProject.type.title"
         >
         </AppProject>
      </div>

      <div class="pages">
         <ul class="d-flex gap-3">
            <li v-for="link in apiLinks">
               <a href="" v-html="link.label"></a>
            </li>
         </ul>
      </div>

   </div>


</template>

<style lang="scss">

.pages {
   ul {
      list-style-type: none;
   }
}

</style>
