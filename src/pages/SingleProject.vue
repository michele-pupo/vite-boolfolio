<script>

import axios from 'axios';

export default{
    name:'SingleProject',

    data(){
        return{
            project: null,
            projectId: null,

            apiBaseUrl: 'http://127.0.0.1:8000/api'
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
            <h2>
                {{ project.name }}
            </h2>
            <p>
                {{ project.description }}
            </p>
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