<script>

import axios from 'axios';
import { router } from '../router'

export default{
    name:'SingleProject',
     
    data(){
        return{
            project: null,
            projectId: null,

            apiBaseUrl: 'http://127.0.0.1:8000/api',

            apiImageUrl: 'http://127.0.0.1:8000/storage/',
        }
    },

    mounted(){

        // recuperiamo il parametro dell'id del project dall'url
        console.log(this.$route.params.slug);

        // lo assegnamo alla variabile projectId
        this.projectSlug = this.$route.params.slug;

        axios.get(this.apiBaseUrl + '/projects/' + this.projectSlug).then(res =>{

            console.log(res)

            if(res.data.success){

                // se troviamo il project lo salviamo
                this.project = res.data.result
            
            } else {

                // torniamo indietro alla home
                this.$router.push({name: 'home'})
            }
        })
    }
}

</script>



<template>

    <div class="container py-5">
        <div class="text-center" v-if="project">

            <img :src="this.apiImageUrl + project.project_image" class="card-img-top" alt="...">

            <h2>
                {{ project.name }}
            </h2>
            <p>
                {{ project.description }}
            </p>
            
            <ul>
                <li v-for="tech in project.technologies">
                    {{ tech.title }}
                </li>
            </ul>
            
            <div>
                <small>{{ project.type.title }}</small>
            </div>

            <router-link to="/" class="btn btn-secondary">Indietro</router-link>
        </div>
        <div v-else>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    
</template>



<style lang="scss" scoped>


</style>