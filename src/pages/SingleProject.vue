<script>

import axios from 'axios';

export default{
    name:'SingleProject',

    data(){
        return{
            project:null,

            apiBaseUrl: 'http://127.0.0.1:8000/api/'
        }
    },

    mounted(){
        axios.get(this.apiBaseUrl + 'projects/1').then(res =>{

            console.log(res)

            this.project = res.data.result

        })
    }
}

</script>



<template>

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

</template>



<style lang="scss" scoped>


</style>