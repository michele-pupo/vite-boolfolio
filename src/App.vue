<script>

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default {
   components: { 
      AppHeader,
      AppFooter,
   },

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {

    },
}
</script>

<template>

   <AppHeader></AppHeader>
   
   <div class="container d-flex">
      
    <router-view></router-view>

   </div>

   <AppFooter></AppFooter>


</template>

<style lang="scss">

</style>
